import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken"
import User from "../model/usermodel.js"
import bcrypt from 'bcrypt'


const signToken = (newUserId)=>{
    return jwt.sign(
        {id:newUserId},
        process.env.SECRET_STR,
        {
            expiresIn:process.env.LOGIN_EXPIRES_IN
        }
    )
}

export const userSignup = asyncErrorHandler(async(req,res,next)=>{
    const {username, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password,10)
    const newUser = new User({username, email, password:hashedPassword})
    console.log(newUser)
    await newUser.save()
    res.status(201).json({
        status:"success",
        data:{
            message:"user created successfully"
        }
    })
})

export const userLogin = (req, res) => {
    res.json({ status: "success" });
};

