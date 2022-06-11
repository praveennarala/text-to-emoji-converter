const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textSchema = new Schema({
  text: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("text", textSchema);