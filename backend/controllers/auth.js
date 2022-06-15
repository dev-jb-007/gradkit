const User = require("../models/user");
const Code = require("../models/codes");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const decodeJwtResponse = require("../helpers/decode_jwt.js");

const {
  encryptPassword,
  validatePassword,
} = require("../helpers/password_methods");

exports.sessionSignUp = (req, res) => {
  const saltHash = encryptPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    salt: salt,
    hash: hash,
  });

  newUser.save();
  res.redirect("/auth/signin");
};

exports.jwtSignUp = catchAsync(async (req, res, next) => {
  let found = await User.findOne({ email: req.body.email });
  if (found) {
    return next(new ErrorHandler("Email Already Exist", 403));
  }
  const saltHash = encryptPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    salt: salt,
    hash: hash,
  });
  console.log(user);
  await user.save();
  // console.log("hello");
  // let token = await user.createAuthToken();
  // res.cookie("jwt", token, {
  //   expires: new Date(Date.now() + 5000000000),
  //   httpOnly: true,
  // });
  next();
  // next();
});

exports.verifySignUp = catchAsync(async (req, res, next) => {
  let code = req.params.code;
  let codeModel = await Code.findOne({ code });

  if (!codeModel) {
    return next(new ErrorHandler("Invalid Verificatiion Code", 404));
  }

  if (codeModel) {
    let email = codeModel.email;

    if (email) {
      let user = await User.findOne({ email: email });

      if (user.activationStatus === "active") {
        return next(new ErrorHandler("Account Already Verified", 403));
      }
      user.activationStatus = "active";
      user.save();
      await Code.findByIdAndDelete(codeModel._id);

      res.status(200).json({
        message: "Email Verified Successfully",
      });
    }
  } else {
    return next(new ErrorHandler("Invalid Code", 404));
  }
});

exports.jwtSignIn = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (req.body.credential) {
    const responsePayload = decodeJwtResponse(req.body.credential);
    body.email = responsePayload.email;
    body.name = responsePayload.name;

    const findUser = await User.findOne({
      email: body.email,
    }).populate("courses")
    .populate({ path: "courses", populate: { path: "thumbnail" } });

    if (!findUser) {
      const user = new User({
        email: body.email,
        name: body.name,
        activationStatus: "active",
      });

      let token = await user.createAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 5000000000),
        httpOnly: true,
      });

      await user.save();
      res.status(201).json({ user, message: "User created successfully" });
    } else {
      if (findUser.tokens.length >= 1 && findUser.role === 0) {
        return next(new ErrorHandler("Already Signed On Another Account", 403));
      } else {
        let token = await findUser.createAuthToken();

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 5000000000),
          httpOnly: true,
        });

        const user = await findUser;

        res.status(200).json({ user, message: "Logged In Successfully" });
      }
    }
  } else {
    const user = await User.findOne({
      email: body.email,
    })
      .populate("courses")
      .populate({ path: "courses", populate: { path: "thumbnail" } });

    if (!user || !user.salt) {
      return next(new ErrorHandler("Enter valid Credantials", 403));
    } else {
      const salt = user.salt;
      const hash = user.hash;
      const found = validatePassword(body.password, salt, hash);

      if (found) {
        if (user.activationStatus === "active") {
          if (user.tokens.length >= 1 && user.role === 0) {
            return next(
              new ErrorHandler("Already Signed On Another Account", 403)
            );
          }
          let token = await user.createAuthToken();
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 5000000000),
            httpOnly: true,
          });

          res.status(200).json({ user, message: "Logged In Successfully" });
        } else if (user.activationStatus !== "active") {
          return next(
            new ErrorHandler("Please verify account through mail.", 403)
          );
        }
      } else {
        return next(new ErrorHandler("Enter Valid Credantials", 403));
      }
    }
  }
});

exports.sessionSignIn = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect("/auth/signin");
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(req.session.returnTo || "/video");
      delete req.session.returnTo;
      return next();
    });
  })(req, res, next);
};

exports.signOut = catchAsync(async (req, res, next) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token;
  });
  // let z = schedule.scheduledJobs["job-1"];
  // if (z) {
  //   z.cancel();
  // }
  await req.user.save();
  res.status(200).json("Signout Successfully");
});

exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("courses")
    .populate({ path: "courses", populate: { path: "thumbnail" } });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ user, message: "User Authenticated" });
});

exports.signOutFromAllDevices = catchAsync(async (req, res) => {
  const body = req.body;

  if (req.body.credential) {
    const responsePayload = decodeJwtResponse(req.body.credential);
    body.email = responsePayload.email;

    const findUser = await User.findOne({
      email: body.email,
    });

    if (!findUser) {
      return next(new ErrorHandler("User not found", 404));
    } else {
      findUser.tokens = [];
      await findUser.save();
      res
        .status(200)
        .json({ message: "Successfully signed out from all devices" });
    }
  } else {
    const user = await User.findOne({
      email: body.email,
    });

    if (!user || !user.salt) {
      return next(new ErrorHandler("User not found", 404));
    } else {
      user.tokens = [];
      await user.save();
      res
        .status(200)
        .json({ message: "Successfully signed out from all devices" });
    }
  }
});
