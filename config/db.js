const mongoose = require("mongoose")

const connectDB = async (salon) => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING + salon)
        console.log("Connected to database")
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = {
    connectDB: connectDB,
}