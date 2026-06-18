const mongoose = require("mongoose")
    
const linkSchema = mongoose.Schema({
    
    facebook : String,
    instagram : String,
    phone : String,
    whatsapp : String,
    viber : String,
    email : String,
    github : String,
    linkedin : String
    
})
    
module.exports = mongoose.model("links",linkSchema)