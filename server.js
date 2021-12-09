// dependencies
const express = require("express");
const mongoose = require("mongoose");

// initialize app
const app = express();

// configure settings
require("dotenv").config();

// connect and config mongoDB with mongoose

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

// setup mongoDB event listeners
db.on("connected", () => console.log("Connected to MongoDB"));
db.on("error", () => console.log("MongoDB Error:" + err.message));

// mount middleware
app.use(express.urlencoded({ extended: false })); // creates req.body, setting extended to false turns off unneeded express functionality

// mount routes
app.post("/stocks", (req, res) => {
    res.send(req.body);
})

// tell app to listen
const PORT = process.env.PORT; // set by us in dev, but heroku will assign when deployed in cloud

app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`);
});
