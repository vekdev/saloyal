const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    },
    lifetimeVisits: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("User", userSchema)