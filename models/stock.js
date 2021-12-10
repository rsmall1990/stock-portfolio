// require dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the schema
const stockSchema = new Schema({
    Name: {type: String, required: true},
    Ticker: {type: String, required: true},
    CurrentHolding: Boolean,
    BuyDate: {type: Date, required: false},
    BuyPrice: {type: Number, required: false},
    SellDate: {type: Date, required: false},
    SellPrice: {type: Number, required: false},
}, { timestamps: true });

// export the model to be accessed in server.js
module.exports = mongoose.model("Stock", stockSchema);