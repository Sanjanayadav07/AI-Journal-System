const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema(
  {
    userId: String,
    ambience: String,
    text: String,
    emotion: String,
    keywords: [String],
    summary: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", JournalSchema);