const mongoose  = require("mongoose");//import mongoose
//schema creation
const clubmemberSchema= new mongoose.Schema({
    name:String,
    rollNo:String,
    dept:String,
    contactNumber:Number,
    clubName:String,
    email:String
})
//model creation-used to call mongoose methods
const ClubMember=mongoose.model('enrolls',clubmemberSchema)

module.exports=ClubMember