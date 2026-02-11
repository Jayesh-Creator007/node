const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const bcrypt = require('bcryptjs')

exports.store = async (req, res) => {
    try {
        const { email,password,name, status } = req.body

        const hash_pass = await bcrypt.hash(password,10)
        // console.log(hash_pass);
        
        await User.create({ email, password:hash_pass, name, status })
        res.json({
            status: true,
            message: "user added"
        })
    } catch (error) {
        console.log(error);
    }
}

exports.index = async (req, res) => {
    try {
        const { email, password } = req.body
        const records = await User.findOne({email: email})
        console.log(records);
        const match = bcrypt.compare(password,records.password)
        

        const payload ={
            id:records._id,
            name:records.name,
            role:records.role_id
        }
        console.log(payload);
        const token = jwt.sign(payload, 'mykey', { expiresIn: '1h' })
        res
            .header('token', token)
            .json(token)
        
    } catch (error) {
        console.log(err);
    }
}