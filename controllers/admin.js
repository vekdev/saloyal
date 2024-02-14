const Visit = require("../models/Visit")
const User = require("../models/User")
const FullCard = require("../models/FullCard")
const {titleCase} = require("../models/typeFunctions")

module.exports = {
    default: async (req, res) => {
        const allUsersDetails = async () => {
            const details = []
            const allUsers = await User.find()
            for (const user of allUsers) {
                const count = await Visit.countDocuments({user_id: user.id})
                details.push({name: user.name, id: user.id, visits: user.lifetimeVisits, stamps: count})
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
        // IDEALLY I WILL WANT A USER TO CLICK A BUTTON THAT SENDS THE USERNAME TO EDIT TO A 
        // POPUP AND THEN ALLOWS THE USER TO EDIT THE DETAIOS AND SAVE WHICH WILL CLOSE THE 
        // POPUP AND UPDATE THE USER
        const userExists = await User.find({username: req.body.username})
        
        if (userExists.length === 1) {
            console.log("USER FOUND")
        }
        res.redirect("/admin")
    }
}