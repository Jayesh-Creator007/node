const {  mongoose } = require("mongoose")

exports.Configdb = () => {
    mongoose.connect(process.env.URL)
        .then(() => {
            console.log("db connected")

        })
        .catch((err) => console.log(err)
        )
}