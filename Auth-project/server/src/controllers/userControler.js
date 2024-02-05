import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Users from "../model/usermodel.js"
import { CustomError } from "../utils/customError.js";
import bcrypt from "bcrypt"
import User from "../model/usermodel.js";

export const getAllUsers =asyncErrorHandler(async(req,res,next)=>{
    const users = await Users.find()
    res.status(200).json({
        data:{
            users,
            message:"success"
        }
    })
})

export const updateUser = asyncErrorHandler(async(req,res,next)=>{
    const userId = req.user.id
    const paramsId= req.params.id

    console.log(req.body)

    if(userId !== paramsId){
        const error = new CustomError('user id not matching',401)
        next(error)
    }

    if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password,10)
    }

    const updatedUser= await User.findByIdAndUpdate(
        paramsId,
        {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePictureUrl:req.body.profilePictureUrl
            }
        },{
            new:true
        }
    )
    res.status(201).json(updatedUser)
})
