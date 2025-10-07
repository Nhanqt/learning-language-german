import { useState, useEffect } from "react";
import TopicQuiz from "./TopicQuiz";

export default function App() {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    // Load all CSV files dynamically from public/data
    const files = import.meta.glob("/public/data/*.csv");

    // Extract topic names (remove path + .csv)
    const topicNames = Object.keys(files).map((path) => {
      const match = path.match(/\/([^/]+)\.csv$/);
      return match ? match[1] : null;
    }).filter(Boolean);

    setTopics(topicNames);
  }, []);

  if (topic) {
    return <TopicQuiz topic={topic} goBack={() => setTopic(null)} />;
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>🇩🇪 German Vocabulary Topics 🇻🇳</h1>
      <p>Chọn chủ đề để bắt đầu học:</p>

      {topics.length === 0 ? (
        <p>⏳ Đang tải danh sách chủ đề...</p>
      ) : (
        <ul>
          {topics.map((t) => (
            <li key={t} style={{ marginBottom: 10 }}>
              <button
                onClick={() => setTopic(t)}
                style={{ padding: "10px 20px", fontSize: 16 }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
