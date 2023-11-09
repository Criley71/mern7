const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    //check all fields are entered
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }
    //check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {

        res.status(400)
        throw new Error('account exists')
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //make user document in mongo
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        
    })
    //return the result
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}) //post api/users

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    //check if email exists and compare the password and hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})//post api/users/login

//protects route via
const getUserData = asyncHandler(async (req, res) => {
   

    res.status(200).json(req.user)
})//Get /ap/user/id

//generate jwt
//id is payload
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
  }

module.exports = {
    registerUser,
    loginUser,
    getUserData
}