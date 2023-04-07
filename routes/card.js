const express = require("express")
const router = express.Router()
const cardController = require("../controllers/card")

router.get("/"), (req, res) => {
    res.send("HELLO CARD ROUTES")
}

router.post("/", cardController.addStamp)


module.exports = router