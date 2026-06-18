const mongoose = require("mongoose")

const homeSchema = mongoose.Schema({
    greeting : String,
    naam : String,
    profession : String,
    description : String,

    image:String,

    experience : String,
    projects : String,
    clients : String,

    pdf : String 

})

module.exports = mongoose.model("home",homeSchema)