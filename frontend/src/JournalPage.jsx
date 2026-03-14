import { useState, useEffect } from "react";
import { API } from "./api";
import EmotionChart from "./components/EmotionChart";
import MoodTrendChart from "./components/MoodTrendChart";

export default function JournalPage() {

  const userId = "123";

  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await API.get(`/journal/${userId}`);
    setEntries(res.data);
  };

  const saveEntry = async () => {

    // 1️⃣ AI analysis
    const analysisRes = await API.post("/journal/analyze", {
      text
    });

    const emotion = analysisRes.data.emotion;
    const keywords = analysisRes.data.keywords || [];

    // 2️⃣ Save entry with emotion
    await API.post("/journal", {
      userId,
      ambience: "forest",
      text,
      emotion,
      keywords
    });

    setText("");
    setAnalysis(analysisRes.data);

    fetchEntries();
  };

  const analyze = async () => {
    const res = await API.post("/journal/analyze", { text });
    setAnalysis(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-4 text-center">
          AI Journal
        </h2>

        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={saveEntry}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
          >
            Save Entry
          </button>

          <button
            onClick={analyze}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Analyze
          </button>
        </div>

        {analysis && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">
              Emotion: {analysis.emotion}
            </h3>
            <p className="text-sm mt-1">{analysis.summary}</p>
          </div>
        )}

        <h3 className="mt-6 font-semibold">Previous Entries</h3>

        <div className="mt-2 space-y-2">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="p-3 border rounded-lg bg-gray-50"
            >
              {entry.text}
            </div>
          ))}
        </div>

        <h2 className="mt-6 text-lg font-semibold">Emotion Analytics</h2>

        <EmotionChart />

        <h2 className="mt-6 text-lg font-semibold">
          Mood Trend
        </h2>

        <MoodTrendChart />

      </div>

    </div>
  );
}