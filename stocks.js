// require dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the schema
const bookSchema = new Schema({
    Name: {type: String, required: true},
    Ticker: {type: String, required: true},
    CurrentHolding: Boolean,
    BuyDate: {type: Date, required: true},
    BuyPrice: {type: Number, required: true},
    SellDate: {type: Date, required: true},
    SellPrice: {type: Number, required: true},
}, { timestamps: true });