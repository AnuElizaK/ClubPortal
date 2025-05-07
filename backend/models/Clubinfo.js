const mongoose = require('mongoose')
const clubSchema = new mongoose.Schema({
    name: String,
    logo: String,
    description: String,
    mission: String,
    vision: String,
    leaders: Array,
    phone:Number,
    email: String,
    socials: Array,
    gallery: Array
  });

const Clubinfo = mongoose.model('clubinfos', clubSchema)
module.exports = Clubinfo