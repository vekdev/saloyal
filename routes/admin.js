const express = require("express")
const router = express.Router()

const adminControllers = require("../controllers/admin")
const {ensureAdmin} = require("../middleware/auth")

router.get("/", ensureAdmin, adminControllers.default)
router.post("/edit-user", ensureAdmin, adminControllers.editUser)
router.post("/add-stamp/:id", ensureAdmin, adminControllers.addStamp)
router.post("/use-card/:id", ensureAdmin,adminControllers.useCard)
router.get("/use-card/:id", ensureAdmin, adminControllers.useCard)

// TEMP FOR TESTING PURPOSES
const Setting = require("../models/Setting")
router.get("/settings-create", ensureAdmin, async (req, res) => {
    await Setting.deleteMany()
    await Setting.create({reward: "15% discount", numberOfStampsAvailable: 15, dateChanged: Date.now()})
    res.redirect("/admin")
})
// END OF TEMPORARY CODE

module.exports = router