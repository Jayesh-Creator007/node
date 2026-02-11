const { Schema, model } = require("mongoose");

const user = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    status:{
        type:Boolean,
        require:true,
        default:true
    },
    role_id:{
        type:String,
        require:true,
        default:"user",
        enum:["admin","user"]
    }

},{timestamps:true})

const User = model('User',user)
module.exports = User