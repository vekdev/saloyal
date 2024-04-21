const Visit = require("../models/Visit")
const User = require("../models/User")
const FullCard = require("../models/FullCard")
const {add, use} = require("../models/cardFunctions")
// const { titleCase } = require("../models/typeFunctions")

module.exports = {
    default: async (req, res) => {
        const allUsersDetails = async () => {
            const details = []
            const allUsers = await User.find()
            for (const user of allUsers) {
                const count = await Visit.countDocuments({ user_id: user.id })
                details.push({ name: user.name, id: user.id, visits: user.lifetimeVisits, stamps: count })
            }
            return details
        }

        const fullCards = await FullCard.find()

        const currentUserDetails = req.user
        res.render("admin-dashboard", {
            user: currentUserDetails.name,
            allUsersDetails: await allUsersDetails(),
            cards: fullCards
        })
    },
    editUser: async (req, res) => {
        const userExists = await User.find({ username: req.body.username })
        if (userExists.length === 1) {
            userExists[0].lifetimeVisits = req.body.visits
            await userExists[0].save()
        }
        res.redirect("/admin")
    },
    addStamp: async (req, res) => {
        const user = await User.findById(req.params.id)
        add(user, res, true)
        console.log(user.id)
    },
    useCard: async (req, res) => {
        const user = await User.findById(req.params.id)
        use(user, res, true)
    }
}