const mongoose = require('mongoose')

// to create user schema 
const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    role:String,
    club:String,
    name:String,    
    phone:Number,
    regno:String,
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Clubinfo" }   
})

//
const UserModel = mongoose.model('users',userSchema)
 
//to use this schema in other file 
module.exports = UserModel
