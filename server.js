// dependencies
const express = require("express");
const mongoose = require("mongoose");
const Stock = require("./models/stock.js");

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

// index
app.get("/stocks", (req, res) => {
  Stock.find({}, (err, arrayOfStocks) => {
    // find with empty query object returns all objects in array
    res.send(arrayOfStocks);
  });
});

// new
app.get("/stocks/new", (req, res) => {
  res.send("new");
});

// delete
app.delete("/stocks/:id", (req, res) => {
  Stock.findByIdAndDelete(req.params.id, (err, copyOfDeletedStock) => {
    res.send(copyOfDeletedStock);
  });
});

// update

// create
app.post("/stocks", (req, res) => {
  req.body.CurrentHolding = !!req.body.CurrentHolding;
  Stock.create(req.body, (err, addedStock) => {
    res.send(addedStock);
  });
});

// edit

// show
app.get("/stocks/:id", (req, res) => {
  Stock.findById(req.params.id, (err, foundStock) => {
    res.send(foundStock);
  });
});

// tell app to listen
const PORT = process.env.PORT; // set by us in dev, but heroku will assign when deployed in cloud

app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`);
});
