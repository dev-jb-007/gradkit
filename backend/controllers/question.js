const findOrCreate = require('mongoose-find-or-create');
const Question = require('../models/question');
const Tag = require('../models/tag');
const Image=require('../models/image');
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
exports.askQuestion = catchAsync(async (req, res,next) => {
    try {
        let tagsArray = new Array;
        console.log(req.body.questionTags.split(" "));
        req.body.questionTags.split(" ").forEach(async (item) => {
            let temp = new Tag({
                tag: item
            });
            tagsArray.push(temp._id);
            await temp.save();
        });
        let img = req.files.image || undefined;
        console.log(img);
        let images = new Array;
        if (img) {
            img.forEach(async (item) => {
                let temp = new Image(({
                    imageBucket: item.bucket,
                    imageURL: item.location
                }));
                images.push(temp._id);
                await temp.save();
            })
        }
        console.log('----------------------------------------------------------------------------')
        console.log(images);
        console.log(tagsArray);
        const newQuestion = new Question({
            questionTitle: req.body.questionTitle,
            questionDesc: req.body.questionDesc,
            askedBy: req.user._id,
            image:images,
            tags: tagsArray
        });

        console.log(newQuestion);

        newQuestion.save();
        res.send(newQuestion);
    }
    catch (err) {
        next(err);
    }
    // res.redirect('/video/');
});

exports.listQuestions = (req, res) => {
    Question.find({ answerStatus: false }, { _id: 1, questionTitle: 1, questionDesc: 1 }, function (err, docs) {
        if (err) { res.json({ error: err }) }
        else {
            res.send(docs);
        }
    })
}