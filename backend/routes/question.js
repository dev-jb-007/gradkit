//Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');

const Question = require('../models/question');

const multer = require('multer');
const { upload, uploadImage } = require('../helpers/multer_connection');
//Controllers and Helpers
const { askQuestion, listQuestions } = require("../controllers/question");
const {auth} = require("../helpers/jwt-config");
const { isAuth } = require("../helpers/auth_middleware")
const { tagGenerator } = require("../helpers/tag_generator");
const { textSearch, getVideoById, uploadVideo, deleteVideo, uploadSolution } = require('../controllers/video');
//Routes
router.get('/ask', auth, (req,res) => {res.sendFile(path.join(__dirname,'..','/public/question.html'))});
router.post('/ask', auth,upload.fields([{name:'image',maxCount:4}]), askQuestion);
router.get('/list', listQuestions);
router.get('/listQuestions', (req,res) => {res.sendFile(path.join(__dirname,'..','/public/questionDisplay.html'))});

router.post('/getQuestionTitle', async(req,res) => {
    let id = req.body.id;

    let question = await Question.findById(id)
    res.json({title: question.questionTitle});

})
router.post('/:questionID/answer',upload.fields([{name:'video',maxCount:1}, {name:'image', maxCount:4},{name:'note',maxCount:3}]),uploadSolution); //Middleware uploads to S3 while controllers update DB
module.exports = router;