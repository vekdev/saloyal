const Visit = require("../models/Visit")
const FullCard = require("../models/FullCard")

module.exports = {
    addStamp: async (req, res) => {
        const currentUser = req.user
        try {
            const count = await Visit.countDocuments({user_id: currentUser.id})
            if (count < 9) {
                await Visit.create({
                    name: currentUser.name,
                    user_id: currentUser.id
                })
                res.redirect("/card")
            } else {
                await FullCard.create({
                    userID: currentUser.id,
                    date: Date.now()
                })
                const cardID = await FullCard.find()
                cardID.forEach((card) => {
                    console.log(`Card ID: ${card.id} | User: ${card.userID}`)
                })
                await Visit.deleteMany({user_id: currentUser.id})
                // await Visit.create({
                //     user: currentUser.name,
                //     user_id: currentUser.id
                // })
                res.redirect("/full-card")
                // HERE I WILL NEED TO USE A NEW SCHEMA FOR FULL CARDS AND ADD A RECORD TO THIS WITH THE DETAILS
            }
        } catch (error) {
            console.error(error)
        }
    }
}