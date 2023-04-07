const { urlencoded, json } = require("express")
const express = require("express")
const app = express()
const passport = require("passport")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")



require("dotenv").config({path: "./config/.env"})
require("./config/passport")(passport)

const PORT = process.env.PORT
const { connectDB } = require("./config/db")

const homeRoutes = require("./routes/home")
const initRoutes = require("./routes/initialise")
const userRoutes = require("./routes/userRoutes")
const cardRoutes = require("./routes/card")

connectDB()

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
    
    
// app.use(passport.initialize())
// app.use(passport.session())
app.use(passport.authenticate("session"))

// app.use("/initialise", initRoutes)
app.use("/", homeRoutes)
app.use("/user", userRoutes)
app.use("/card", cardRoutes)

app.listen(PORT, _ => console.log("Server Running"))