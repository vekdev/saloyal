const Visit = require("../models/Visit")
const User = require("../models/User")
const {titleCase} = require("../models/typeFunctions")

module.exports = {
    default: async (req, res) => {
        const allUsers = await User.find()
        allUsers.forEach(async (user) => {
            const count = await Visit.countDocuments({user_id: user.id})
            console.log(`${user.name}: ${count} cards`)
        })

        const count = await Visit.countDocuments({user_id: req.user.id})
        console.log(count)
        res.send(`${titleCase(req.user.name)} has ${count} stamps`)
    }
}