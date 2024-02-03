import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken"
import User from "../model/usermodel.js"
import bcrypt from 'bcrypt'
import { CustomError } from "../utils/customError.js";


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
    const { password: hashedPassword, ...rest } = validUser._doc
    const expiryDate = new Date(Date.now() + 360000)//1hr

    res.cookie('access_token', token, { httpOnly: true, expires:expiryDate }).status(200).json(rest)
});

