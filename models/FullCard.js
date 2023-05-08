const mongoose = require("mongoose")

const fullCardSchema = new mongoose.Schema({
    userID: String,
    date: Date
})

module.exports = mongoose.model("fullCard", fullCardSchema)