const express = require("express")
const router = express.Router()
const { testMiddleware } = require("../middleware/test")
const initController = require("../controllers/initialise")

router.put("/initialise", testMiddleware, initController.init)

module.exports = router