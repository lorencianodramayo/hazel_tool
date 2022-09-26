const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const CreativeSchema = new Schema({
    concept: String,
    name: String,
    size: String,
    version: String,
    possibleValues: Array,
    date: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model("CreativeModel", CreativeSchema);
