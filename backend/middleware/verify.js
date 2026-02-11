const jwt = require("jsonwebtoken")

exports.verifyuser = async (res, req, next) => {
    let token = req.header.authorization
    token = token.split(' ')[1]
    const verifyToken = jwt.verify(token, 'mykey')
    req.user = verifyToken
    next()
}

exports.verifyRole = (roles) => {
    return (req, res, next) => {
        // res.json(roles)

        const { role_id } = req.user
        if (roles.includes(role_id)) {
            next()
        }
    }
}