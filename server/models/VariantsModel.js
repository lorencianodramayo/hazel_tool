const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const VariantsSchema = new Schema({
    templateId: String,
    generation: Array,
    date: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model("VariantsModel", VariantsSchema);
