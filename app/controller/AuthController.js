const { hashPassword, comparePassword } = require('../middleware/Auth')
const User = require('../model/admin');
const jwt = require('jsonwebtoken');
const validator = require('validator');

class AuthContrtoller {

    register = async (req, res) => {
        try {
            const { name, email, password } = req.body
            if (!name) {
                return res.send({ message: "Name field is required" })
            }
            if (!email || !password) {
                return res.status(500).send({
                    success: false,
                    message: "Both email & password are required",
                })
            }
            if(!validator.isEmail(email)){
                return res.status(500).send({
                    success: false,
                    message: "Email id is not valid",
                })
            }
            if(!validator.isStrongPassword(password)){
                return res.status(500).send({
                    success: false,
                    message: "Password is not strong enough... It's unsafe!",
                })
            }

            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(400).send({
                    success: false,
                    message: "This Email id Already exist"
                })
            }

            const hashedPassword = await hashPassword(password)
            const userdata = new User({
                name,
                email,
                password: hashedPassword,
            })

            const result = await userdata.save()
            return res.status(201).send({
                success: true,
                message: "Register successfully",
                result
            })


        } catch (error) {
            console.log(error);
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(500).send({
                    success: false,
                    message: "Invalid email or password",
                })
            }
            //checking user
            const users = await User.findOne({ email })

            if (!users) {
                return res.status(500).send({
                    message: "Email is not Register",
                })
            }
            const match = await comparePassword(password, users.password)
            if (!match) {
                return res.status(500).send({
                    message: "Invalid password",
                })
            }
            const token = await jwt.sign({
                _id: users._id,
                name: users.name,
                email: users.email
            }, process.env.JWT_SECRET, { expiresIn: '12h' })

            return res.status(200).send({
                message: "login successfully",
                status: true,
                user: {
                    _id: users._id,
                    name: users.name,
                    email: users.email
                },
                token
            })

        } catch (error) {
            console.log(error);
        }
    };

}

module.exports = new AuthContrtoller()