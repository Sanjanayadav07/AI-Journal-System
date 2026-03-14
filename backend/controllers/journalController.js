const Journal = require("../models/Journal");
const analyzeEmotion = require("../services/llmService");


// CREATE ENTRY
exports.createEntry = async (req, res) => {
  try {

    const { userId, ambience, text } = req.body;

    const analysis = await analyzeEmotion(text);

    console.log("AI RESULT:", analysis);

    const entry = new Journal({
      userId,
      ambience,
      text,
      emotion: analysis.emotion || "neutral",
      keywords: analysis.keywords || [],
      summary: analysis.summary || ""
    });

    await entry.save();

    res.json(entry);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Entry creation failed" });
  }
};

// GET ALL ENTRIES
exports.getEntries = async (req, res) => {
  try {

    const entries = await Journal.find({
      userId: req.params.userId
    });

    res.json(entries);

  } catch (error) {

    console.log("GET ENTRIES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch entries"
    });

  }
};



// ANALYZE TEXT ONLY
exports.analyze = async (req, res) => {
  try {

    const { text } = req.body;

    const result = await analyzeEmotion(text);

    res.json(result);

  } catch (error) {

    console.log("ANALYZE ERROR:", error);

    res.status(500).json({
      message: "Emotion analysis failed"
    });

  }
};



// GET INSIGHTS (FOR CHART)
exports.getInsights = async (req, res) => {
  try {

    const entries = await Journal.find({
      userId: req.params.userId
    });

    const totalEntries = entries.length;

    const emotionMap = {};
    const ambienceMap = {};

    entries.forEach(entry => {

      if (entry.emotion) {
        emotionMap[entry.emotion] =
          (emotionMap[entry.emotion] || 0) + 1;
      }

      if (entry.ambience) {
        ambienceMap[entry.ambience] =
          (ambienceMap[entry.ambience] || 0) + 1;
      }

    });


    // Convert emotionMap → chart data
    const emotionData = Object.keys(emotionMap).map(emotion => ({
      name: emotion,
      value: emotionMap[emotion]
    }));


    const topEmotion = Object.keys(emotionMap).sort(
      (a, b) => emotionMap[b] - emotionMap[a]
    )[0];


    const mostUsedAmbience = Object.keys(ambienceMap).sort(
      (a, b) => ambienceMap[b] - ambienceMap[a]
    )[0];


    const recentKeywords = entries
      .slice(-5)
      .flatMap(e => e.keywords || []);


    res.json({
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords,
      emotionData
    });

  } catch (error) {

    console.log("INSIGHTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch insights"
    });

  }
};