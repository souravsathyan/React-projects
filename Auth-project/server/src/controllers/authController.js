import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken"
import User from "../model/usermodel.js"
import bcrypt from 'bcrypt'
import { CustomError } from "../utils/customError.js";
import ayncErrorHandler from "../utils/asyncErrorHandler.js";


const signToken = (newUserId) => {
    return jwt.sign(
        { id: newUserId },
        process.env.SECRET_STR
    )
}

export const userSignup = asyncErrorHandler(async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()
    res.status(201).json({
        status: "success",
        data: {
            message: "user created successfully"
        }
    })
})

export const userLogin = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    const validUser = await User.findOne({ email })
    if (!validUser) {
        const error = new CustomError('Invalid credentials', 404)
        next(error)
    }
    const validPassword = bcrypt.compareSync(password, validUser.password)
    if (!validPassword) {
        const error = new CustomError('Invalid credentials', 401)
        next(error)
    }
    const token = signToken(validUser._id)
    const expiryDate = new Date(Date.now() + 360000)//1hr

    res.cookie('access_token', token, { httpOnly: true, expires:expiryDate }).status(200).json(validUser)
});

export const googleAuth = ayncErrorHandler(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
        if(user){
            const token = signToken(user._id)
            const expiryDate = new Date(Date.now() + 360000)//1hr
            
            console.log("done")
            res.cookie('access_token', token, { httpOnly: true, expires:expiryDate }).status(200).json(user)
        }else{
            const generatePassword = Math.random().toString(36).slice(-8)
            const hashedPassword = bcrypt.hashSync(generatePassword,10)
            const generateUsername = req.body.username.split(' ').join('').toLowerCase() + Math.floor(Math.random()*1000).toString() 
            console.log(generatePassword)
            const newUser = new User({
                username:generateUsername,
                email:req.body.email,
                password:hashedPassword,
                profilePictureUrl:req.body.photo
            })
    
            await newUser.save()
    
            const token = signToken(newUser._id)
            const expiryDate = new Date(Date.now() + 360000)//1hr
            console.log("done")
            res.cookie('access_token', token, { httpOnly: true, expires:expiryDate }).status(200).json(newUser)
        }

})
