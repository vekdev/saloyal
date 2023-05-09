const Visit = require("../models/Visit")
const FullCard = require("../models/FullCard")
const QRCode = require("qrcode")

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
                    name: currentUser.name,
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
                // res.redirect("/full-card")
                
                const url = "https://sisterlinskie.pl?" + req.user.id
                res.render("full-card", {
                    collection: req.user.name,
                    number: await Visit.count({user_id: req.user.id}),
                    qrcode: await QRCode.toDataURL(url, {scale: 10, margin: 1})
                })
                // HERE I WILL NEED TO USE A NEW SCHEMA FOR FULL CARDS AND ADD A RECORD TO THIS WITH THE DETAILS
            }
        } catch (error) {
            console.error(error)
        }
    },
    useCard: async (req, res) => {
        await FullCard.deleteMany({userID: req.user.id})
        res.redirect("/card")
    }
}