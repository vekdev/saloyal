const Visit = require("../models/Visit")
const User = require("../models/User")
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
        
        const currentUserDetails = await User.findById(req.user.id)
        res.render("admin-dashboard", {
            user: currentUserDetails,
            allUsersDetails: await allUsersDetails()
        })
    }
}