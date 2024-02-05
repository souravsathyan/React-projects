import jwt from "jsonwebtoken"
import { CustomError } from "./customError.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    console.log(token)

    if (!token) {
        const error = new CustomError('Access denied', 401)
        next(error)
    }

    jwt.verify(token, process.env.SECRET_STR, (err, user) => {
        if (err) {
            const error = new CustomError("Token is not valid", 401)
            next(error)
        }
        req.user = user
        next()
    })
}