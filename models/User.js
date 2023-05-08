const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", userSchema)