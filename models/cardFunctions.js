// THIS WILL BE WHERE I PUT SOME FUNCTIONS TO REPLACE SOME REPETITIVE CODE WHEN ADDING STAMPS AND CREATING FULL CARDS
// NEED TO PASS IN THE USER TO THESE FUNCTIONS
// PASS IN WHETHER THE REFERRER IS ADMIN OR USER SO THAT THE FUNCTION CAN CHOOSE DIFFERENT THINGS DEPENDING

const { render } = require("ejs")
const FullCard = require("./FullCard")
const Visit = require("./Visit")
const Settings = require("../models/Setting")
const QRCode = require("qrcode")

const renderFullCard = async (user, res) => {
    const cardID = await FullCard.find({ userID: user.id })
    const url = `https://sisterlinskie.pl?${cardID[0].id}`
    res.render("full-card", {
        collection: user.name,
        qrcode: await QRCode.toDataURL(url, { scale: 10, margin: 1 })
    })
}

module.exports = {
    add: async (user, res, admin) => {
        try {
            const count = await Visit.countDocuments({ user_id: user.id })
            const existingCard = await FullCard.findOne({ username: user.username })
            const settings = await Settings.findOne()
            if (count < settings.numberOfStampsAvailable - 1 && !existingCard) {
                await Visit.create({
                    name: user.username,
                    user_id: user.id
                })
                user.$inc("lifetimeVisits", 1)
                await user.save()
                admin ? res.redirect("/admin") : res.redirect("/card")
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
                admin ? res.redirect("/admin") : renderFullCard(user, res)
            } else {
                console.log("USE EXISTING CARD FIRST")
                res.redirect(admin ? "/admin":"/card")
            }
        } catch (error) {
            console.error(error)
        }
    },
    use: async (user, res, admin) => {
        try {
            await FullCard.deleteMany({userID: user.id})
            user.$inc("lifetimeVisits", 1)
            await user.save()
            admin ? res.redirect("/admin"):res.redirect("/card")
        } catch (error) {
            console.error(error)
        }
    }
}