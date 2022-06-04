const Form = require("../models/form");
const sendMail = require("../helpers/send_mail");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

exports.contact = catchAsync(async (req,res,next) => {
    const form = new Form({
        type: 'Contact Request',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    await form.save();
    sendMail(req.body.email,"Query Recieved","Thanks for your feedback, we will get back to you soon!!");
    sendMail("doubt.co923@gmail.com", "Contact Request", `A user has submitted a contact request. ${form._id}`);
    res.send("Submitted").status(200);
});