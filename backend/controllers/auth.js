const User = require("../models/user");
const Code = require("../models/codes");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

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
  let found=await User.findOne({email:req.body.email});
  if(found)
  {
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
  

  await user.save()

  // let token = await user.createAuthToken();
  // res.cookie("jwt", token, {
  //   expires: new Date(Date.now() + 5000000000),
  //   httpOnly: true,
  // });
  next();
  // next();
});

exports.verifySignUp = async (req, res, next) => {
  try {
    let code = req.params.code;
    let codeModel = await Code.findOne({ code });
    if (codeModel) {
      let email = codeModel.email;
      if (email) {
        let user = await User.findOne({ email: email });

        if (user.activationStatus !== "active") {
          user.activationStatus = "active";
          user.save();
        }
        await Code.findByIdAndDelete(codeModel._id);
        res.send({ status: "true", message: "Done" });
      }
    } else {
      res.send({ status: "false", message: "Invalid Code" });
    }
  } catch (err) {
    next(err);
  }
};

exports.jwtSignIn = catchAsync(async (req, res, next) => {
  const body = req.body;
  const user = await User.findOne({
    email: body.email,
  })
    .populate("courses")
    .populate({ path: "courses", populate: { path: "thumbnail" } });

  if (!user) {
    return next(new ErrorHandler("Enter valid Credantials", 403));
  } else {
    const salt = user.salt;
    const hash = user.hash;
    const found = validatePassword(body.password, salt, hash);

    if (found) {
      if (user.activationStatus === "active") {
        if (user.tokens.length >= 1&&user.role===0) {
          // throw new Error("Already Signed On Another Account");
          return next(
            new ErrorHandler("Already Signed On Another Account", 403)
          );
        }
        let token = await user.createAuthToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 5000000000),
          httpOnly: true,
        });

        res.status(200).json({ user });
      } else if (user.activationStatus !== "active") {
        // throw new Error("Please verify account through mail.");
        return next(
          new ErrorHandler("Please verify account through mail.", 403)
        );
      }
    } else {
      // throw new Error("Enter Valid Credantials");
      return next(new ErrorHandler("Enter Valid Credantials", 403));
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
  
})

exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("courses")
    .populate({ path: "courses", populate: { path: "thumbnail" } });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ user });
});
