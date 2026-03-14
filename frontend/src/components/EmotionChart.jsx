import { useEffect, useState } from "react";
import { API } from "../api";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function EmotionChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    const res = await API.get("/journal/insights/123");
    console.log("INSIGHTS DATA:", res.data);
    setData(res.data.emotionData);
  };

  return (
    <div className="w-full h-64 mt-4">

      {data.length === 0 ? (
        <p>No emotion data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}