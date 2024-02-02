const mongoose = require("mongoose")

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    mongoose.connection.on("connected",()=>{
        console.log("connected to DB")
    })

    mongoose.connection.on("error",(err)=>{
        console.log("error while conncecting to the DB : "+err)
    })

    mongoose.connection.on("disconnected",()=>{
        console.log('Db disconnected')
    })
}

module.exports = dbConnect