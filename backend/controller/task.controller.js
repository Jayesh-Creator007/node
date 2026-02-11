const Task = require("../model/task.model");


exports.store = async (req, res) => {
    try {
        const { category_id,name, status } = req.body
        await Task.create({ category_id, name, status })
        res.json({
            status: true,
            message: "Category added"
        })
    } catch (error) {
        console.log(err);
    }
}

exports.index = async (req, res) => {
    try {

        const records = await Task.find()
        res.json({
            status: true,
            records
        })
    } catch (error) {
        console.log(err);
    }
}





exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { category_id,name, status } = req.body
        await Task.findByIdAndUpdate(id, { category_id,name, status })
        res.json({
            status: true,
            message: "Category Updated"
        })
    } catch (error) {
        console.log(err);
    }
}

exports.trash = async (req, res) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id)
        res.json({
            status: true,
            message: "Category deleted"
        })
    } catch (error) {
        console.log(err);
    }
}