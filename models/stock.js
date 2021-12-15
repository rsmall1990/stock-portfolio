// require dependencies
const mongoose = require("mongoose");

// define schema
const stockSchema  = new mongoose.Schema({
    Name: {type: String, required: true},
    Ticker: {type: String, required: true},
    CurrentPrice: {type: Number, required: true},
    CurrentHolding: Boolean,
    BuyDate: {type: Date, required: false},
    BuyPrice: {type: Number, required: false},
    Quantity: {type: Number, required: false},
}, { timestamps: true });

// export the model to be accessed in server.js
const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock