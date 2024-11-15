const express = require("express")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express()

app.listen(3000, () => {
    console.log("Connected to server!")
})

app.get("/", (req, res) => {
    res.send("Hello from Node API")
})

const db_username = process.env.MONGO_DB_USERNAME
const db_password = process.env.MONGO_DB_PASSWORD
const db_uri = `mongodb+srv://${db_username}:${db_password}@backend-service.a40ys.mongodb.net/?retryWrites=true&w=majority&appName=Backend-Service` 

const connectWithRetry = () => {
    mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to backend database!")
    })
    .catch((err) => {
        console.error("Failed to connect to backend database:", err)
        console.log("Retrying connection in 3 seconds...")
        setTimeout(connectWithRetry, 3000)
    })
}

connectWithRetry()