import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select: false
    },
    profilePictureUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz_hPrEDS3XE8LQIEQRNSSMzc8IryJhz_iXQ&usqp=CAU"
    }
}, {timestamps:true})

// userSchema.pre('save',async (next)=>{
//     if(!this.isModified('password')) return next()
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt)
//     next()
// })

// userSchema.methods.comparePasswordInDb = async (pwd, pwdInDb)=>{
//     return await bcrypt.compare(pwd,pwdInDb)
// }

const User = mongoose.model('User',userSchema)

export default User