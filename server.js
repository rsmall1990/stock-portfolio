// dependencies
const express = require("express");
const mongoose = require("mongoose");
const Stock = require("./models/stock.js");
const methodOverride = require("method-override");

// initialize app
const app = express();

// configure settings
require("dotenv").config();

// connect and config mongoDB with mongoose
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL);

// setup mongoDB event listeners
db.on("connected", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disconnected from MongoDB"));
db.on("error", () => console.log("MongoDB Error:" + err.message));

// Middleware
app.use(express.urlencoded({ extended: false })); // creates req.body, setting extended to false turns off unneeded express functionality

// Routes

// login
app.get("/", (req, res) => {
    res.render("login.ejs");
})

// index
app.get("/stocks", (req, res) => {
  //for (i = 0; i < Stock.length; i += 1) {
  //     let ytdGainLoss = (parseInt(Stock[i].CurrentPrice) - parseInt(Stock[i].buyPrice)*parseInt(Stock[i].quantity) + ytdGainLoss);
  //     console.log(Stock);
  //     }
  Stock.find({}, (err, arrayOfStocks) => {
    // find with empty query object returns all objects in array
    res.render("index.ejs", {
      stock: arrayOfStocks,
    });
  });
});

// new
app.get("/stocks/new", (req, res) => {
  res.render("new.ejs");
});

// delete
app.delete("/stocks/:id", (req, res) => {
  Stock.findByIdAndDelete(req.params.id, (err, copyOfDeletedStock) => {
    res.send(copyOfDeletedStock);
  });
});

// update
app.put("/stocks/:id", (req, res) => {
  Stock.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedStock) => {
      res.send(updatedStock);
    }
  );
});

// create
app.post("/stocks", (req, res) => {
  req.body.CurrentHolding = !!req.body.CurrentHolding;
  Stock.create(req.body, (err, addedStock) => {
    res.send(addedStock);
  });
});

// Edit


// show
app.get("/stocks/:id", (req, res) => {
  Stock.findById(req.params.id, (err, foundStock) => {
    res.render("show.ejs", {
      stock: foundStock, // sending identified stock to stock variable for show page
    });
  });
});

// tell app to listen
const PORT = process.env.PORT; // set by us in dev, but heroku will assign when deployed in cloud

app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`);
});
