const uuid = require("uuid").v4;
const sendMail = require("../helpers/send_mail");
const Code = require("../models/codes");
const User = require("../models/user");
const {encryptPassword}=require("../helpers/password_methods");
exports.generateVerificationMail = async (req, res, next) => {
  try {
    let email = req.body.email;
    let ucode = uuid();
    console.log(email);
    await sendMail(
      email,
      "Please Activate Your Doubt Account",
      `Click on the link below to activate your account - https://www.gradkit.in/verify-email/${ucode}`
    );

    let code = new Code({ code: ucode, email, codeType: "verify" });
    setTimeout(async () => {
      await Code.findByIdAndDelete(code._id);
    }, 1000000);
    await code.save();
    res.send({ status: "Done" });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    let code = req.params.code;
    let found = await Code.findOne({ code });
    let status;
    if (found) {
      status = "Done";
      next();
    } else {
      status = "Fail";
      res.redirect("/auth/signup");
    }
  } catch (err) {
    next(err);
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
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
        await Pass.findByIdAndDelete(Pcode._id);
      }, 3600000);

      res.send({ status: "Check Your Email" });
    } else {
      res.send({ status: "You are not registered" });
    }
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    let code = await Code.findOne({ code: req.params.code });
    let email = code.email;
    console.log(email);
    let user = await User.findOne({ email: email });

    const saltHash = encryptPassword(req.body.password);
    console.log(saltHash);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    user.salt = salt;
    user.hash = hash;

    await user.save();
    await Code.findByIdAndDelete(code._id);
    res.send({ status: "Success" });
  } catch (err) {
    next(err);
  }
};
