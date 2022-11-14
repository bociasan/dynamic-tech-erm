const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    count: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Counter", CounterSchema)