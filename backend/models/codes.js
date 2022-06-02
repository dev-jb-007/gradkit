const mongoose = require('mongoose');
// const findOrCreate = require('mongoose-find-or-create');

const codeSchema = new mongoose.Schema({
    code:{
        type:String,
    },
    email:{
        type:String
    },
    codeType:{
        type:String,
        enum:['verify', 'forget']
    }
})
// tagSchema.plugin(findOrCreate, {appendToArray: true})

module.exports = new mongoose.model('code', codeSchema)