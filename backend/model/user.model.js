const { Schema, model } = require("mongoose");

const user = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    role_id:{
        type:String,
        required:true,
        default:"user",
        enum:["admin","user"]
    }

},{timestamps:true})

const User = model('User',user)
module.exports = User