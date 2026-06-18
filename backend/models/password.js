const mongoose = require("mongoose")

const passwordSchema = mongoose.Schema({

    password:String

})

module.exports = mongoose.model("settings",passwordSchema)