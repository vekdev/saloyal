const Visit = require("../models/Visit")
const FullCard = require("../models/FullCard")
const User = require("../models/User")
const QRCode = require("qrcode")

module.exports = {
    addStamp: async (req, res) => {
        const currentUser = req.user
        try {
            const userAccount = await User.findById(currentUser.id)
            userAccount.$inc("lifetimeVisits", 1)
            await userAccount.save()
            const count = await Visit.countDocuments({user_id: currentUser.id})
            if (count < 9) {
                await Visit.create({
                    name: currentUser.username,
                    user_id: currentUser.id
                })
                res.redirect("/card")
            } else {
                await FullCard.create({
                    userID: currentUser.id,
                    username: currentUser.username,
                    name: currentUser.name,
                    surname: currentUser.surname,
                    date: Date.now()
                })

                // THIS SECTION IS PURELY FOR DEBUGGING. DELETE BEFORE PRODUCTION
                const allFullCards = await FullCard.find()
                allFullCards.forEach((card) => {
                    console.log(`Card ID: ${card.id} | User: ${card.userID}`)
                })
                // END OF DEBUGGING SECTION
                const cardID = await FullCard.find({userID: currentUser.id})
                await Visit.deleteMany({user_id: currentUser.id})
                const url = `https://sisterlinskie.pl?${cardID[0].id}`
                res.render("full-card", {
                    collection: req.user.name,
                    number: await Visit.count({user_id: req.user.id}),
                    qrcode: await QRCode.toDataURL(url, {scale: 10, margin: 1})
                })
            }
        } catch (error) {
            console.error(error)
        }
    },
    useCard: async (req, res) => {
        const userAccount = await User.findById(req.user.id)
        await FullCard.deleteMany({userID: req.user.id})
        userAccount.$inc("lifetimeVisits", 1)
        await userAccount.save()
        res.redirect("/card")
    }
}