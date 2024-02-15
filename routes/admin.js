const express = require("express")
const router = express.Router()

const adminControllers = require("../controllers/admin")
const {ensureAdmin} = require("../middleware/auth")

router.get("/", ensureAdmin, adminControllers.default)
router.post("/edit-user", ensureAdmin, adminControllers.editUser)
router.post("/add-stamp/:id", ensureAdmin, adminControllers.addStamp)







//TESTING FOR A FUTURE PRODUCT - DELETE WHEN NECESSARY
router.post("/testing-html", (req, res) => {
    // console.log(req.body.text)
    let template = req.body.text
    // template = '<p>' + template.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
    // template = '<p>' + template.replace(/\r\n{2,}/g, '</p><p>').replace(/\r\n/g, '<br>') + '</p>';
    template = '<p>' + template.replace(/\r\n\r\n/g, '</p><p>').replace("[b]", "<strong>").replace("[/b]", "</strong>") + '</p>';
    res.redirect("/admin")
    console.log(template)
})






module.exports = router