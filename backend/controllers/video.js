const Video = require("../models/video"); //import DB Schema for DB CRUD operations
const Solution = require("../models/solution");
const Question = require("../models/question");
const Note = require("../models/notes");
const Image = require("../models/image");
const { s3 } = require("../helpers/s3_config");
const question = require("../models/question");
const Course = require("../models/course");
const razorpay = require("razorpay");
const crypto = require("crypto");
const Transaction = require("../models/transaction");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
//Controller to delete video from S3 first and then from DB
// exports.deleteVideo = async (req, res) => {
//   await Video.find({ videoId: req.params.videoId }, (err, vid) => {
//     if (!err) {
//       var params = { Bucket: vid[0].videoBucket, Key: vid[0].videoId };

//       s3.deleteObject(params, (err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Deletion Successful");
//         }
//       });
//     }
//   })
//     .clone()
//     .exec();

//   Video.findOneAndDelete({ videoId: req.params.videoId }, (err) => {
//     if (!err) {
//       console.log("Deleted from DB");
//     } else {
//       console.log(err);
//     }
//   });
//   return res.json({ status: "OK" });
// };

exports.uploadSolution = async (req, res) => {
  try {
    let [vid] = req.files.video || undefined;
    let videoID;
    if (vid) {
      let newVideo = new Video({
        videoBucket: vid.bucket,
        videoURL: vid.location,
      });
      videoID = newVideo._id;
      await newVideo.save();
    }

    let img = req.files.image || undefined;
    let imagesArray = [];
    if (img) {
      img.forEach(async (image) => {
        let newImage = new Image({
          imageBucket: image.bucket,
          imageURL: image.location,
        });
        imagesArray.push(newImage._id);
        await newImage.save();
      });
    }

    let note = req.files.notes || undefined;
    let notesArray = [];
    if (note) {
      note.forEach(async (note) => {
        let newNote = new Image({
          imageBucket: note.bucket,
          imageURL: note.location,
        });
        notesArray.push(newNote._id);
        await newNote.save();
      });
    }

    let solution = new Solution({
      description: req.body.description,
      video: videoID,
      image: imagesArray,
      note: notesArray,
      // createdBy: req.user._id
    });
    // console.log(`%c${solution}`, "color:green");
    await solution.save();

    // console.log(req.params.questionID);
    const question = await Question.findById(req.params.questionID);
    // Question.findById(req.params.questionID, async (result) => {
    //     result.solutionId.push(solution._id);
    //     console.log(result);
    //     await result.save();
    // });
    // console.log(question);
    // question.solutionId.push(solution._id);
    // await question.save();
    // console.log(`%c${question}`, "color:red");
    res.send({ status: "Uploaded" });
  } catch (error) {
    res.send(error);
  }
};

// exports.uploadSolution =async (req,res,next)=>{
//   try{
//     if(req.query.type==="video")
//     {
//       let [vid]=req.files.video;
//       let note=req.files.note||undefined;
//       let img=req.files.image||undefined;
//       console.log(img);
//       let images=new Array;
//       if(img)
//       {
//         img.forEach(async (item)=>{
//           let temp=new Image(({
//             imageBucket:item.bucket,
//             imageURL:item.location
//           }));
//           await temp.save();
//           images.push(temp._id);
//         })
//       }
//       let noteVar=new Array;
//       if(note)
//       {
//         note.forEach(async(item)=>{
//           let temp=new Note({
//             noteBucket:item.bucket,
//             noteURL:item.location
//           });
//           await temp.save();
//           noteVar.push(temp._id);
//         })

//       }
//       let video=new Video({
//         videoBucket:vid.bucket,
//         videoURL:vid.location,
//         // thumbnail:thumb.location
//       });
//       await video.save();
//       let solution;
//         solution=new Solution({
//           title:req.body.title,
//           description:req.body.description,
//           video:video._id,
//           note:noteVar,
//           image:images,
//           createdBy:req.user._id
//         })
//         await solution.save();
//         let ques=await Question.findById(req.body.questionId);
//         ques.solutionId.push(solution._id);
//         await ques.save();
//       res.send({status:"Done"});
//     }
//   }
//   catch(err)
//   {
//     next(err);
//   }
// }
//Controller to add video to DB
exports.uploadVideo = catchAsync(async (req, res, next) => {
  // console.log(req.files);
  const [vid] = req.files.video;
  const [img] = req.files.image;

  var newVid = new Video({
    // videoId: vid.key,
    videoBucket: vid.bucket,
    videoURL: vid.location,
    // videoTitle: req.body.videoTitle,
    // videoDesc: req.body.videoDesc,
    uploadedBy: req.user._id,
    thumbnail: img.location,
  });

  if (newVid.videoId) {
    // let product = await Product.findById(req.params.productid);
    for (let i = 0; i < req.files.length; i++) {
      let buffer = await sharp(req.files[i].buffer)
        .resize({ width: 300, height: 300 })
        .png()
        .toBuffer();
      newVid.images.push(buffer);
    }
    res.send("Images saved successfully");
  } else {
    throw new Error("Please try again with valid product id");
  }
  await newVid.save();
  // res.redirect("/video/"
});

//Controller to find video by id
// exports.getVideoById = (req, res) => {
//   Video.find({ videoId: req.params.videoId }, (err, result) => {
//     if (!err) {
//       console.log(req.params);
//       console.log(result[0]);
//       res.send(result[0]);
//     } else {
//       console.log(err);
//     }
//   });
// };

//Controller for text based search
exports.textSearch = async (req, res) => {
  let words = req.query.searchText.split(" ");
  let result = ``;
  words.forEach((element) => {
    result += `(?=.*${element})`;
  });
  // Video.find({$text: {$search: searchText}}, {_id:0, videoTitle:1, videoDesc:1}).limit(10)
  // .exec(function(err, docs){
  //     if(!err){
  //         res.send(docs);
  //     }
  //     else{
  //         res.send(err);
  //     }
  // });
  let video1 = new Array();
  video1 = await Video.find(
    {
      $or: [
        { videoTitle: { $regex: `${result}`, $options: "i" } },
        { videoDesc: { $regex: `${result}`, $options: "i" } },
      ],
    },
    { _id: 1, videoTitle: 1, videoDesc: 1 }
  ).limit(10);
  result = ``;
  result += `(${words[0]})`;
  for (let i = 1; i < words.length; i++) {
    result += `|(${words[i]})`;
  }
  let video2 = new Array();
  video2 = await Video.find(
    {
      $or: [
        { videoTitle: { $regex: `${result}`, $options: "i" } },
        { videoDesc: { $regex: `${result}`, $options: "i" } },
      ],
    },
    { _id: 1, videoTitle: 1, videoDesc: 1 }
  ).limit(10);
  let indexes = new Array();
  video2.forEach((element, index) => {
    video1.forEach((item) => {
      if (item._id.toString() == element._id.toString()) {
        indexes.push(index);
      }
    });
  });
  for (let i = indexes.length - 1; i >= 0; i--) {
    video2.splice(indexes[i], 1);
  }
  const video = [...video1, ...video2];
  if (video.length > 0) {
    res.send(video);
  } else {
    res.send("Not Found");
  }
};

//Upload Courses
exports.uploadCourse = catchAsync(async (req, res, next) => {
  const [img] = req.files.image;
  req.body.thumbnail = img.location;
  let newImage = new Image({
    imageBucket: img.bucket,
    imageURL: img.location,
  });
  await newImage.save();
  let obj = {
    ...req.body,
    thumbnail: newImage._id,
  };
  const course = new Course(obj);
  await course.save();
  res.status(201).json({ course, message: "Course Uploaded" });
});

exports.uploadCourseVideos = catchAsync(async (req, res, next) => {
  console.log("HEllo");
  console.log(req.files);
  const [vid] = req.files.video;
  const [img] = req.files.image;
  console.log(img);
  console.log(vid);
  var newVid = new Video({
    // videoId: vid.key,
    videoBucket: vid.bucket,
    videoURL: vid.location,
    videoTitle: req.body.videoTitle,
    videoDescription: req.body.videoDescription,
    thumbnail: img.location,
  });

  await newVid.save();
  // console.log(newVid);
  // const courseid = req.query.id;

  const video = await Course.findOne({ subjectCode: req.body.code });

  if (!video) {
    return next(new ErrorResponse("Course Not Found", 404));
  }

  video.videos.push({
    videoId: newVid._id,
    chapter: req.body.chapter,
    index: req.body.index,
  });
  video.videos.sort(function (a, b) {
    if (a.chapter > b.chapter) {
      return 1;
    } else if (a.chapter == b.chapter) {
      if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  });
  // console.log(video.videos);
  await video.save();
  res.status(201).json({ video, message: "Video Uploaded" });
});

exports.getAllCourses = catchAsync(async (req, res, next) => {
  let courses = await Course.find({}).populate("thumbnail");
  res.send(courses);
});

exports.checkValidBuy = catchAsync(async (req, res, next) => {
  let course = await Course.findById(req.params.id).populate([
    {
      path: "videos",
      populate: { path: "videoId" },
    },
    {
      path: "featured",
      populate: { path: "videoId" },
    },
  ]);

  if (!course.enrolled.includes(req.user._id)) {
    let n = course.videos.length;

    if (n >= 4) {
      n = 4;
    }
    // course.videos = course.videos.slice(0, n);
    course.videos = course.featured;
    res.json(course);
  } else {
    res.send(course);
  }
});

exports.enrollCourse = catchAsync(async (req, res, next) => {
  let course = await Course.findById(req.body.id);
  course.enrolled.push(req.user._id);
  await course.save();
  res.send(course);
});

exports.getVideoById = catchAsync(async (req, res, next) => {
  let video = await Video.findById(req.params.id);
  let course = await Course.findById(req.params.cid);
  let index = -1;

  // for (let i = 0; i < course.videos.length; i++) {
  //   if (course.videos[i].videoId.toString() === video._id.toString()) {
  //     index = i;
  //     break;
  //   }
  // }
  // if (index >= 4 && !course.enrolled.includes(req.user._id)) {
  //   return next(
  //     new ErrorHandler("You are not authorized to view this course", 403)
  //   );

  let featured = course.featured.map((videos) => videos.videoId.toString());
  const videoId = video._id.toString();

  if (!course.enrolled.includes(req.user._id) && !featured.includes(videoId)) {
    return next(
      new ErrorHandler("You are not authorized to view this course", 403)
    );
  }
  res.send(video);
});

exports.generateOrderId = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.body.id);

  if (!course) {
    return next(new ErrorHandler("Course Not Found", 404));
  }

  if (course.enrolled.includes(req.user._id)) {
    return next(
      new ErrorHandler("You are already enrolled in this course", 403)
    );
  }

  const instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: course.price * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  let temp = new Transaction({
    reciept: options.receipt,
    course: course.id,
    user: req.user._id,
    amount: course.price,
    status: "Pending",
  });
 
  await instance.orders.create(options, async (err, order) => {
    if (err) {
      temp.status = "Failed";
      await temp.save();
    } else {
      temp.orderId = order.id;
      await temp.save();
      setTimeout(async()=>{
        let kritik=await Transaction.findById(temp._id);
        if(kritik.status==="Pending")
        {
          await Transaction.findByIdAndDelete(temp._id);
        }
      },3600000,)
      res.send(order);
    }
  });
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const temp = await Transaction.findOne({ orderId: razorpay_order_id });

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    temp.status = "Done";
    let course = await Course.findById(temp.course);
    course.enrolled.push(temp.user);
    let user = await User.findById(temp.user);
    user.courses.push(temp.course);
    await user.save();
    await temp.save();
    await course.save();
    res.status(200).json({ message: "Payment Successful" });
  } else {
    temp.status = "Fail";
    await temp.save();
    return next(new ErrorHandler("Payment Failed", 400));
  }
});

exports.sendSubjectCode = catchAsync(async (req, res, next) => {
  let temp = await Course.find({}, "subjectCode");
  res.send(temp);
});
