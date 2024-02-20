const { urlencoded, json } = require("express")
const express = require("express")
const app = express()
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")



require("dotenv").config({path: "./config/.env"})
require("./config/passport")(passport)

const PORT = process.env.PORT
const { connectDB } = require("./config/db")

const homeRoutes = require("./routes/home")
const userRoutes = require("./routes/userRoutes")
const cardRoutes = require("./routes/card")
const adminRoutes = require("./routes/admin")
const salonRoutes = require("./routes/salons")

connectDB("loyalty")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(urlencoded({extended: true}))
app.use(json())

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_STRING
        })
    })
)

app.use(passport.authenticate("session"))

app.use("/", homeRoutes)
app.use("/user", userRoutes)
app.use("/card", cardRoutes)
app.use("/admin", adminRoutes)
app.use("/salons", salonRoutes)

app.listen(PORT, _ => console.log("Server Running"))