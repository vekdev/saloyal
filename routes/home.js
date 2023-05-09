const express = require("express")
const router = express.Router()
const homeController = require("../controllers/home")
const {ensureLoggedIn} = require("../middleware/auth")


router.get("/", ensureLoggedIn, homeController.getIndex)
router.get("/card", ensureLoggedIn, homeController.displayCard)
// router.get("/full-card", homeController.fullCard)
router.get("/count", homeController.count)

router.get("/destroy", (req, res) => {
    req.session.destroy((err) => {
        if (err)
          console.log("Error : Failed to destroy the session during logout.", err)
        res.redirect("/")
      })
})

module.exports = router