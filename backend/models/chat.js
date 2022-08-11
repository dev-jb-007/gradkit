const mongoose = require('mongoose');

//Schema for notes
const chatSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    name:{
        type:String
    },
    messages:[
        {
            text:{
                type:String
            },
            sender:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'user'
            }
        }
    ]
}, {timestamps: true});

//Index to make text based search from title and description possible


module.exports = mongoose.model('chat', chatSchema);