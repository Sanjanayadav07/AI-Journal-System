const express = require("express");

const router = express.Router();

const {
  createEntry,
  getEntries,
  analyze,
  getInsights
} = require("../controllers/journalController");

router.post("/", createEntry);

router.get("/:userId", getEntries);

router.post("/analyze", analyze);

router.get("/insights/:userId", getInsights);

module.exports = router;