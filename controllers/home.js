const Visit = require("../models/Visit")
const FullCard = require("../models/FullCard")
const Setting = require("../models/Setting")
const QRCode = require("qrcode")
const { titleCase } = require("../models/typeFunctions")

module.exports = {
    getIndex: (req, res) => {
        res.redirect("card")
    },

    displayCard: async (req, res) => {
        const currentUser = req.user
        const number = await Visit.countDocuments({ user_id: currentUser.id })
        const fullCard = await FullCard.find({userID: currentUser.id})
        const settings = await Setting.findOne()
        if (fullCard.length === 0) {
            res.render("card", {
                number: number, 
                collection: currentUser.name, 
                lifetimeVisits: currentUser.lifetimeVisits,
                reward: settings.reward,
                numberOfStamps: settings.numberOfStampsAvailable
            })
        } else {
            const url = "https://sisterlinskie.pl?" + fullCard[0].id
            res.render("full-card", {
                collection: req.user.name,
                number: await Visit.count({user_id: req.user.id}),
                qrcode: await QRCode.toDataURL(url, {scale: 10, margin: 1})
            })

        }   
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