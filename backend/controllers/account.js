const uuid = require("uuid").v4;
const sendMail = require("../helpers/send_mail");
const Code = require("../models/codes");
const User = require("../models/user");
const { encryptPassword } = require("../helpers/password_methods");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

exports.generateVerificationMail = catchAsync(async (req, res, next) => {
  let email = req.body.email;
  let ucode = uuid();
  await sendMail(
    email,
    "Please Activate Your Doubt Account",
    `Click on the link below to activate your account - https://www.gradkit.in/verify-email/${ucode}`
  );

  let code = new Code({ code: ucode, email, codeType: "verify" });
  setTimeout(async () => {
    await Code.findByIdAndDelete(code._id);
    const user = await User.findOne({ email: email });
    if (user.activationStatus !== "active") {
      await User.findOneAndDelete({ email: email });
    }
  }, 3600000);
  await code.save();
  res.status(201).json({
    message: "Please Verify your Email",
  });
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  let code = req.params.code;
  let found = await Code.findOne({ code });
  if (found) {
    res.status(200).json({
      message: "Email Verified Successfully",
    });
    next();
  } else {
    return next(new ErrorHandler("Invalid Code", 404));
  }
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  let code = uuid();
  let found = await User.findOne({ email: req.body.email });
  if (found) {
    let Pcode = new Code({ code, email: req.body.email, codeType: "forget" });
    await Pcode.save();

    sendMail(
      req.body.email,
      "Password Changed",
      `Please follow this link to reset your password - https://www.gradkit.in/reset-password/${code}`
    );

    setTimeout(async () => {
      await Code.findByIdAndDelete(Pcode._id);
    }, 3600000);

    res.status(200).json({
      message: "Please check your email",
    });
  } else {
    return next(new ErrorHandler("Email not found", 404));
  }
});

exports.changePassword = catchAsync(async (req, res, next) => {
  let code = await Code.findOne({ code: req.params.code });

  if (!code) {
    return next(new ErrorHandler("Invalid Reset Password Link", 404));
  }
  let email = code.email;
  let user = await User.findOne({ email: email });

  if (user) {
    const saltHash = encryptPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    user.salt = salt;
    user.hash = hash;
    user.tokens = [];
    await user.save();
    await Code.findByIdAndDelete(code._id);

    res.status(200).json({
      message: "Password Changed Successfully",
    });
  } else {
    return next(new ErrorHandler("Email not found", 404));
  }
});
