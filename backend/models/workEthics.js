const mongoose = require("mongoose")

const ethicsSchema = mongoose.Schema({

    ethicsTitle : String,
    ethicsValue : String,

})


module.exports = mongoose.model("workEthics",ethicsSchema)