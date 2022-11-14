const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    productBarcode: {
        type: String,
    },
    skuBarcode: {
        type: String,
        unique: true
    },
    productId:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Stock", StockSchema)