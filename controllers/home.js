const Visit = require("../models/Visit")
const QRCode = require("qrcode")
const { titleCase } = require("../models/typeFunctions")

module.exports = {
    getIndex: (req, res) => {
        res.redirect("card")
    },

    displayCard: async (req, res) => {
        const currentUser = req.user
        const number = await Visit.countDocuments({ user_id: currentUser.id })
        if (number < 10) {
            res.render("card", {
                number: number, collection: titleCase(currentUser.name)
            })
        } else {
            res.redirect("/full-card")
        }   
    },
    fullCard: async (req, res) => {
        const url = "https://sisterlinskie.pl?" + req.user.id
        res.render("full-card", {
            collection: req.user.name,
            number: await Visit.count({user_id: req.user.id}),
            qrcode: await QRCode.toDataURL(url, {scale: 10, margin: 1})
        })
    },
    count: async (req, res) => {
        const currentUser = req.user
        try {
            const count = await Visit.countDocuments({user_id: currentUser.id})
            res.json({
                number: count,
                name: currentUser.name
            })
        } catch (error) {
            console.error(error)
        }
    }
}