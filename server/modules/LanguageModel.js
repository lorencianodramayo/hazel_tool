const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  name: String,
  content: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("LanguageModel", LanguageSchema);
