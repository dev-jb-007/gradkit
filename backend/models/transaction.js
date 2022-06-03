const mongoose = require("mongoose");

//Schema for videos
const transactionModel = new mongoose.Schema(
  {
    orderId:{
        type:String
    },
   reciept:{
       type:String
   },
   course:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'course'
   },
   user:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'user'
   },
   amount:{
       type:Number
   },
   status:{
       type:String
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionModel);
