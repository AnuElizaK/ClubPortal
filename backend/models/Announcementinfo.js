const mongoose = require('mongoose')
const announcementSchema = new mongoose.Schema({
    club: String,
    clubId:String,
    message: String,
    date: String,
    time: String,
    category: String,
    contact: String
  });
  
  const Announcementinfo = mongoose.model("announcementinfos", announcementSchema);
  module.exports = Announcementinfo