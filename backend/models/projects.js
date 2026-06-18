const mongoose = require("mongoose")

const projectsSchema = mongoose.Schema({

    projectTitle : String,
    projectDesp : String,
    projectLink : String,
    githubLink : String,

    image:String

})

module.exports = mongoose.model("projects",projectsSchema)