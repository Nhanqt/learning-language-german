import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function TopicQuiz({ topic, goBack }) {
  const [words, setWords] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch(`/data/${topic}.csv`);
        const text = await response.text();
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        setWords(result.data);
      } catch (err) {
        console.error("Error loading CSV:", err);
      }
    };
    loadCSV();
  }, [topic]);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResults = {};
    words.forEach((word, index) => {
      const correct = word.German.trim().toLowerCase();
      const userAnswer = (answers[index] || "").trim().toLowerCase();
      newResults[index] = userAnswer === correct;
    });
    setResults(newResults);
    setSubmitted(true);
  };

  if (words.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Đang tải từ vựng cho chủ đề “{topic}”...</h2>
        <button onClick={goBack}>⬅ Quay lại</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <button onClick={goBack} style={{ marginBottom: 20 }}>
        ⬅ Quay lại
      </button>

      <h2 style={{ textAlign: "center" }}>🗂 Chủ đề: {topic}</h2>
      <p style={{ textAlign: "center", fontSize: 18 }}>Nhập từ tiếng Đức cho từng từ tiếng Việt:</p>

      <form onSubmit={handleSubmit}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid #ddd", padding: 10 }}>#</th>
              <th style={{ borderBottom: "2px solid #ddd", padding: 10 }}>🇻🇳 Tiếng Việt</th>
              <th style={{ borderBottom: "2px solid #ddd", padding: 10 }}>🇩🇪 Tiếng Đức (bạn nhập)</th>
              <th style={{ borderBottom: "2px solid #ddd", padding: 10 }}>Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word, index) => (
              <tr key={index}>
                <td style={{ padding: 8, textAlign: "center" }}>{index + 1}</td>
                <td style={{ padding: 8 }}>{word.Vietnam}</td>
                <td style={{ padding: 8 }}>
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder="Nhập tiếng Đức..."
                    style={{
                      width: "100%",
                      padding: 6,
                      fontSize: 16,
                    }}
                  />
                </td>
                <td style={{ padding: 8, textAlign: "center" }}>
                  {submitted &&
                    (results[index] ? (
                      <span style={{ color: "green" }}>✅</span>
                    ) : (
                      <span style={{ color: "red" }}>
                        ❌ {words[index].German}
                      </span>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: 18,
              borderRadius: 6,
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
            }}
          >
            Kiểm tra tất cả
          </button>
        </div>
      </form>
    </div>
  );
}
