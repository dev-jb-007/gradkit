const mongoose=require('mongoose');

const nonlogged=new  mongoose.Schema({
    id:{
        type:String,
        default:true
    },
    videos:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'solution'
        }
    ]
})

module.exports = mongoose.model('nonlogged',nonlogged);