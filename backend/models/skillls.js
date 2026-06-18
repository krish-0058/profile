const mongoose = require("mongoose")

const skillsSchema = mongoose.Schema({

    skillTitle : String,
    skillDesp : String,
    projectsLink : String,
    githubLink : String,

})


module.exports = mongoose.model("skills",skillsSchema)