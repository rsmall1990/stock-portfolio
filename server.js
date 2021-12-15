// dependencies
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Stock = require("./models/stock.js");

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
app.use(express.urlencoded({ extended: true })); // creates req.body, setting extended to false turns off unneeded express functionality
app.use(express.static("public")); //use public folder for static assets
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

// Routes

// login
app.get("/", (req, res) => {
  // res.send("hello world")
  try{
    res.render("login.ejs")
  } catch(error) {
    console.log(error);
  }
});

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
    res.redirect("/stocks");
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
  if (req.body.CurrentHolding === "on") {
    req.body.CurrentHolding = true;
  } else {
    req.body.CurrentHolding = false;
  }
  Stock.create(req.body, (error, stock) => {
    res.redirect("/stocks");
  });
});

// Edits

// show
app.get("/stocks/:id", (req, res) => {
  Stock.findById(req.params.id, (err, foundStock) => {
    res.render("show.ejs", {
      stock: foundStock, // sending identified stock to stock variable for show page
    });
  });
});

// Research
app.get("/research", (req, res) => {
  res.render("research.ejs");
});

// tell app to listen
const PORT = process.env.PORT; // set by us in dev, but heroku will assign when deployed in cloud

app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`);
});
