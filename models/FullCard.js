const mongoose = require("mongoose")

const fullCardSchema = new mongoose.Schema({
    userID: String,
    username: String,
    name: String,
    surname: String,
    date: Date
})

module.exports = mongoose.model("fullCard", fullCardSchema)