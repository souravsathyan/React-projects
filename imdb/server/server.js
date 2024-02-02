require("dotenv").config()
const express = require("express")
const app = express()
const dbConnect = require("./db.connect")
const router = require("./routes.js")
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use('/', router);

dbConnect()

const port  = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("server connected...")
})