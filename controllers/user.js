const { dbUser, manageDB } = require("../config/db")
const passport = require("passport")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {
    login: (req, res) => {
        res.render("login")
    },
    userLoginProcess: passport.authenticate("local", {
        failureRedirect: "/user/login",
        successRedirect: "/card" }),
    register: (req, res) => {
        if (req.session.passport) {
            res.redirect("../card")
        } else {
            res.render("register")
        }
    },
    userRegister: async (req, res) => {

        // CHECK IF USER ALREADY EXISTS IN DATABASE
        const userExists = await User.findOne({username: req.body.username})

        // BCRYPT HASHING LOGIC HERE
        const securePassword = await bcrypt.hash(req.body.password, saltRounds)


        if (!userExists) {
            const newUser = await User.create({name: req.body.name, surname: req.body.surname, username: req.body.username, password: securePassword})
            req.login(newUser, (err) => {
                if (err) {res.redirect("register")}
                res.redirect("/card")
            })
        } else {
            res.redirect("login")
        }
    },
    logout: (req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
            req.session.destroy()
            req.user = null
            res.redirect('/user/login');
          });
    }
}