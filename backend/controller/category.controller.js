const Category = require("../model/category.model")

exports.store = async (req, res) => {
  try {
      const { name, status } = req.body
      await Category.create({name,status})
      res.json({
          status:true,
          message:"Category added"
      })
  } catch (error) {
    console.log(err);
    
  }
}

exports.index = async (req, res) => {
    try {
        
        const records = await Category.find()
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
        const {id}= req.params
        const { name, status } = req.body
        await Category.findByIdAndUpdate(id,{ name, status })
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
        await Category.findByIdAndDelete(id)
        res.json({
            status: true,
            message: "Category deleted"
        })
    } catch (error) {
        console.log(err);

    }
}