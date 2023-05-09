const mongoose = require("mongoose")

const fullCardSchema = new mongoose.Schema({
    userID: String,
    name: String,
    date: Date
})

module.exports = mongoose.model("fullCard", fullCardSchema)