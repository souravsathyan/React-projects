import express from "express"
import authRouter  from "./src/routes/authRouter.js"
import userRouter from "./src/routes/userRouter.js"
import {CustomError} from "./src/utils/customError.js"
import {globalErrorHandler} from "./src/controllers/errorController.js"

export const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.all("*",(req,res,next)=>{
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404)
})

app.use(globalErrorHandler)