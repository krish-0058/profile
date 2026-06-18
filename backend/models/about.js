const mongoose = require("mongoose");

// Education Schema
const educationSchema = new mongoose.Schema({
    duration: String,
    title: String,
    description: String
});

// Experience Schema
const experienceSchema = new mongoose.Schema({
    duration: String,
    title: String,
    description: String
});

// Models
const Education = mongoose.model("Education", educationSchema);
const Experience = mongoose.model("Experience", experienceSchema);

module.exports = { Education, Experience };