import dotenv from "dotenv"
dotenv.config({path:"./.env"})
import {app} from "./app.js"
import mongoose from 'mongoose';


app.listen(3000,()=>{
    console.log('server started')
})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connected')
})