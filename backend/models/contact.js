const mongoose = require("mongoose")

const contactsSchema = mongoose.Schema({

    clientName : String,
    clientEmail : String,
    clientMessage : String,

})

module.exports = mongoose.model("contacts",contactsSchema)