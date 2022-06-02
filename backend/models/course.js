const mongoose = require("mongoose");
let courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    semister: {
      type: Number,
      required: true,
    },
    subjectCode: {
      type: Number,
      required: true,
      unique:true
    },
    videos: [
      {
        videoId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Video",
        },
        chapter: {
          type: Number,
        },
        index: {
          type: Number,
        },
      },
    ],
    thumbnail: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "image",
    },
    price: {
      type: Number,
      required: true,
    },
    enrolled: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);
