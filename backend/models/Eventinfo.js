const mongoose=require('mongoose')
const eventinfoSchema =new mongoose.Schema({
    event_title:String,    
    event_club:String,
    event_date:Date,
    event_time:String,
    event_venue:String,
    event_description:String,
    event_image:String,
    

})
const Eventinfo =mongoose.model('eventsinfos',eventinfoSchema)
module.exports=Eventinfo