const mongoose = require("mongoose");

// Schema for Url Shortner
const URLSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    trim: true,
    required: true,
  },
  longUrl: {
    type: String,
    trim: true,
    required: true,
  },
  shortUrl: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", URLSchema);
