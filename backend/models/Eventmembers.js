const mongoose=require('mongoose')
const eventmemberSchema =new mongoose.Schema({
    name:String,    
    email:String,
    phone:String,
    reg:String,
    club:String,
    title:String

})
const Eventmembers =mongoose.model('eventsreg',eventmemberSchema)
module.exports=Eventmembers