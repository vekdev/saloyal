const express = require("express")
const {ensureAdmin} = require("../middleware/auth")
const router = express.Router()

router.get("/", ensureAdmin,(req, res) => {
    res.send("YOU MADE IT")
})

module.exports = router