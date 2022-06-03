//Dependencies
const express = require("express");
const router = express.Router();
const path = require("path");
const { isAuth } = require("../helpers/auth_middleware");
const auth = require("../helpers/jwt-config");
const multer = require("multer");
// router.use(cookieParser());
//Import Controllers and Helpers for the routes
const Video = require("../models/video");
const {
  textSearch,
  getVideoById,
  uploadVideo,
  deleteVideo,
  uploadSolution,
  uploadCourse,
  uploadCourseVideos,
  getAllCourses,
  checkValidBuy,
  enrollCourse,
  generateOrderId,
  verifyPayment
} = require("../controllers/video");
// const { textSearch, getVideoById, uploadVideo, deleteVideo, uploadSolution } = require('../controllers/video');
const { reportSolution } = require("../controllers/solution");
const { upload, uploadImage } = require("../helpers/multer_connection"); //Multer upload middleware
const { getUserDetails } = require("../controllers/auth");
const cookieParser = require("cookie-parser");
// const { genWatermark } = require("../helpers/watermark-creator");

//Routes
router.get("/", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/upload.html"));
}); // Simply redirects to an html page for testing purposes
router.get("/home", async (req, res) => {
  const data = await Video.find({});
  // console.log(data);
  res.send(data);
});
router.get("/solution/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/upload2.html"));
});

// router.get('/delete/:videoId', deleteVideo);
router.get("/search", textSearch);
// router.get('/:videoId', getVideoById);
router.post(
  "/devpatel/uploadCourse",
  upload.fields([{ name: "image", maxCount: 1 }]),
  uploadCourse
); //Middleware uploads to S3 while controllers update DB
router.post(
  "/devpatel/uploadCourseVideo",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  uploadCourseVideos
);

router.get("/courses", getAllCourses);

router.get("/courses/:id", auth, checkValidBuy);

router.post("/report/:solutionId", auth, reportSolution);
module.exports = router;

router.post("/enrollCourse", auth, enrollCourse);

router.get("/:id", auth, getVideoById);
router.post("/orders",auth, generateOrderId);
router.post("/verify-payment", verifyPayment);
