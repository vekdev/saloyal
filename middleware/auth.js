module.exports = {
    ensureLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect("/user/login")
        }
    }
}