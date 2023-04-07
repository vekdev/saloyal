const { dbUser } = require("../config/db")

module.exports = {
    init: (req, res) => {
        if (req.body.name !== undefined) {
            dbUser.changeUser = req.body.name
            res.json(true)
        } else {
            res.json(false)
        }
    }
}