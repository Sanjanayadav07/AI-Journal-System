const axios = require("axios");

async function analyzeEmotion(text) {
  try {

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/SamLowe/roberta-base-go_emotions",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    const emotion = response.data[0][0].label;

    return {
      emotion,
      keywords: text.split(" ").slice(0, 3),
      summary: "User expressed emotional reflection during their ambience session."
    };

  } catch (error) {

    console.log("HF ERROR:", error.response?.data || error.message);

    return {
      emotion: "neutral",
      keywords: text.split(" ").slice(0, 3),
      summary: "Emotion analysis failed but entry was processed."
    };

  }
}

module.exports = analyzeEmotion;