const mongoose = require("mongoose")
const visitSchema = new mongoose.Schema({
    name: String,
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    user_id: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Visit", visitSchema)