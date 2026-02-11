const { Schema, model } = require("mongoose");

const category = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    status:{
        type:Boolean,
        require:true,
        default:true
    }
},{timestamps:true})

const Category = model('category',category)
module.exports = Category