const User = require("../Model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {expressjwt} = require("express-jwt");
// require("cookie-parser")


require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

exports.signup = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!(email && password)) {
            res.status(400).send("All input is required!")
        }
        const oldUser = await User.findOne({email})

        if (oldUser) {
            return res.status(409).send("User already exists. Please login.")
        }

        const encryptedPasword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email, password: encryptedPasword
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: "Please enter your email and password!"})
    }
}

exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.json({status: "error", error: "Invalid username/password."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (passwordCompare) {
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                JWT_SECRET, {
                    expiresIn: 3600 // 24 hours
                })
            return res.json({user, token: token})
        } else {
            return res.json({status: "error", error: "Check the password  again."})
        }
    } catch (error){
        console.log(error)
    }
}

exports.isSignedIn = expressjwt({
    secret: JWT_SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})