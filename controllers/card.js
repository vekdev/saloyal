const FullCard = require("../models/FullCard")
const User = require("../models/User")
const {add, use} = require("../models/cardFunctions")

module.exports = {
    addStamp: async (req, res) => {
        // USING A FUNCTION SHARED WITH ADMIN THAT IS IMPORTED FROM CARD FUNCTIONS MODEL
        add(req.user, res, false)
    },
    useCard: async (req, res) => {
        use(req.user, res, false)
    }
}