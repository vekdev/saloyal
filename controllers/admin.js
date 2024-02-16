const Visit = require("../models/Visit")
const User = require("../models/User")
const FullCard = require("../models/FullCard")
const { titleCase } = require("../models/typeFunctions")

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
        try {
            const count = await Visit.countDocuments({ user_id: user.id })
            const existingCard = await FullCard.findOne({ username: user.username })
            if (count < 9 && !existingCard) {
                await Visit.create({ name: user.username, user_id: user.id })
                user.$inc("lifetimeVisits", 1)
                await user.save()
            } else if (!existingCard) {
                await FullCard.create({
                    userID: user.id,
                    username: user.username,
                    name: user.name,
                    surname: user.surname,
                    date: Date.now()
                })
                user.$inc("lifetimeVisits", 1)
                await user.save()
                await Visit.deleteMany({ user_id: user.id })
            } else {
                console.log("use existing card first")
            }
            res.redirect("/admin")
        } catch {
            console.error(error)
        }
    }
}