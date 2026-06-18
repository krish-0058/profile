const mongoose = require("mongoose")

const skillsSchema = mongoose.Schema({

    skillTitle : String,
    skillValue : String,

})


module.exports = mongoose.model("soft",skillsSchema)