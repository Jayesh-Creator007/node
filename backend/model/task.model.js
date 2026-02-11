const { Schema, model } = require("mongoose");
const Category = require("./category.model");

const task = new Schema({
    category_id:{
        type: Schema.Types.ObjectId,
        require: true,
        ref:Category
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    status: {
        type: Boolean,
        require: true,
        default: true
    }
}, { timestamps: true })

const Task = model('Task', task)
module.exports = Task