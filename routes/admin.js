const express = require("express")
const router = express.Router()

const adminControllers = require("../controllers/admin")
const {ensureAdmin} = require("../middleware/auth")

router.get("/", ensureAdmin, adminControllers.default)
router.post("/edit-user", ensureAdmin, adminControllers.editUser)

module.exports = router