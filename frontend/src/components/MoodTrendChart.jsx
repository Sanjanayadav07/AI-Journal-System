import { useEffect, useState } from "react";
import { API } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function MoodTrendChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {

    const res = await API.get("/journal/123");

    const formatted = res.data.map((entry) => ({
      date: new Date(entry.createdAt).toLocaleDateString(),
      emotion:
        entry.emotion === "excitement" ? 3 :
        entry.emotion === "happy" ? 2 :
        entry.emotion === "neutral" ? 1 : 0
    }));

    setData(formatted);
  };

  return (
    <div className="h-64 mt-6">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="emotion"
            stroke="#6366f1"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}