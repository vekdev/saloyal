const mongoose = require("mongoose")

const settingSchema = new mongoose.Schema({
    reward: {
        type: String,
        default: "15% discount"
    },
    numberOfStampsAvailable: {
        type: Number,
        default: 10
    },
    dateChanged: Date
})

module.exports = mongoose.model("setting", settingSchema)