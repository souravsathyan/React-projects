import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Users from "../model/usermodel.js"

export const getAllUsers =asyncErrorHandler(async(req,res,next)=>{
    const users = await Users.find()
    res.status(200).json({
        data:{
            users,
            message:"success"
        }
    })
})

