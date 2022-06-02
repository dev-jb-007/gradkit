const mongoose = require("mongoose");

//Schema for videos
const videoSchema = new mongoose.Schema(
  {
    // videoId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },

    videoBucket: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
    videoTitle: {
      type: String,
    },
    videoDescription: {
      type: String,
    },
    // uploadedBy: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "User",
    // },

    // comments: [{
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref: 'comment'
    // }],
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
