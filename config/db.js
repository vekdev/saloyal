// const MongoClient = require("mongodb").MongoClient

// let db,
//     dbName = "points"

// const connectDB = () => {
//     const dbConnect = process.env.DB_STRING
//     MongoClient.connect(dbConnect, { useUnifiedTopology: true })
//         .then(client => {
//             console.log(`Successfully connected to ${dbName} database`)
//             db = client.db(dbName)
//         })
// }

// const dbUser = {
//     name: "kevin",
//     get getUser() {
//         return this.name
//     },
//     set changeUser(name) {
//         this.name = name
//     },
// }

const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING)
        console.log("Connected to database")
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}




// const manageDB = {
//     count: (user) => db.collection(user).countDocuments(),
//     insertOne: (user, data) => db.collection(user).insertOne(data),
//     find: (user) => db.collection(user).find().toArray(),
//     clear: (user) => db.collection(user).deleteMany({}),
//     addToCompleted: (data) => db.collection("completed").insertOne(data),
//     listUsers: async () => {
//         let users = []
//         const list = await db.listCollections().toArray()
//         list.forEach((i) => {
//             users.push(i.name)
//         })      
//         return users
//     }
// }

module.exports = {
    // dbUser: dbUser,
    connectDB: connectDB,
    // manageDB: manageDB
}