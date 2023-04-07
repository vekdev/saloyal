const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")


router.get("/login", userController.login)
router.post("/login", userController.userLoginProcess)
router.get("/register", userController.register)
router.post("/register", userController.userRegister)
router.get("/logout", userController.logout)


// TESTING SETTING UP PASSPORT





// router.post("/new-login", (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) {
//             return next(err)
//         }
//         if (!user) {
//             // req.flash("errors", info)
//             return res.redirect("/login")
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 return next(err)
//             }

//             //   req.flash("success", { msg: "Success! You are logged in." })
//             res.redirect(req.session.returnTo || "/card")
//         })
//     })(req, res, next)
// })



module.exports = router