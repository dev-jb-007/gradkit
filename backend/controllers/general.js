const Form = require("../models/form");
const sendMail = require("../helpers/send_mail");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const Transactions = require("../models/transaction");
const User = require("../models/user");
const Course = require("../models/course");
exports.contact = catchAsync(async (req, res, next) => {
  const form = new Form({
    type: "Contact Request",
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  await form.save();
  sendMail(
    req.body.email,
    "Query Recieved",
    "Thanks for your feedback, we will get back to you soon!!"
  );
  sendMail(
    "doubt.co923@gmail.com",
    "Contact Request",
    `A user has submitted a contact request. ${form._id}`
  );
  res.status(200).json({
    status: "success",
    message: "Your message is submitted successfully",
  });
});

exports.queries = async (req, res, next) => {
  try {
    const course = await Course.findOne();
    console.log(course.noOfVideos);
    res.send(course);
  } catch (err) {
    next(err);
  }
};
exports.courses = async (req, res, next) => {
  try {
    console.log("Hello");
    let course = await Course.find({}, "enrolled title").populate(
      "enrolled",
      "email"
    );
    let obj = {};
    // obj.enrolled = course.enrolled;
    course.forEach((element) => {
      let temp = element.title;
      obj[temp] = element.enrolled.length;
      temp = temp + "User";
      obj[temp] = element.enrolled;
    });
    let temp = await User.find({ activationStatus: "active" }, "_id");
    obj.userCount = temp.length;
    console.log(obj);
    res.json(obj);
  } catch (err) {
    next(err);
  }
};
exports.searchUser = async (req, res, next) => {
  try {
    console.log(req.body.email);
    let user = await User.findOne(
      { email: req.body.email },
      "name email courses"
    ).populate("courses", "title");
    console.log(user);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
