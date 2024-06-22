const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hashPassword = async (password) => {
    try {
        const saltgenerate = 10
        const hashPassword = await bcrypt.hash(password, saltgenerate)
        return hashPassword

    } catch (eror) {
        console.log(eror);
    }
}

const comparePassword = async (password, hashedpassword) => {
    return bcrypt.compare(password, hashedpassword)

}

//auth check

const AuthCheck = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send({
            message: "A token is required for authentication",
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

    } catch (error) {
        //console.log(error);
        return res.status(403).send({
            message: "Invalid token access",
        })
    }
    return next()

}

module.exports = {
    hashPassword,
    comparePassword,
    AuthCheck

}