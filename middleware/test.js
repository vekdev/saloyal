module.exports = {

    testMiddleware: function(req, res, next) {
        console.log("reached the middleware")
        return next()
    }
}