const express = require("express")
const router = express.Router()

require("dotenv").config({path: "./config/.env"})
const { connectDB } = require("../config/db")

router.get("/:salon", (req, res) => {
    res.send(req.params.salon)
    connectDB(req.params.salon)
})


module.exports = router