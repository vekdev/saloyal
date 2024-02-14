const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = function (passport) {

    passport.use(new LocalStrategy(async function (username, password, done) {

        // FIND THE USER FIRST
        const user = await User.findOne({ username: username })
        
        if (!user) { return done(null, false), { message: "NO USER FOUND" } }

        // BCRYPT PASSWORD HERE TO CHECK IT
        const securePasswordCheck = await bcrypt.compare(password, user.password)
        if (!securePasswordCheck) { return done(null, false), {message: "INCORRECT PASSWORD"} }

        return done(null, user)
    })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        return done(null, user)
    })
}