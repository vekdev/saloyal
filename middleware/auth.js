module.exports = {
    ensureLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect("/user/login")
        }
    },

    ensureAdmin: (req, res, next) => {
        if (req.user && req.user.admin === true) {
            next()
        } else {
            res.redirect("/card")
        }
    }
}