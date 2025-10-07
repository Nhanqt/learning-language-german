import React, { useState } from "react";

export default function Quiz({ topic, words, onBack }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState({});

  const handleChange = (vietnam, value) => {
    setAnswers({ ...answers, [vietnam]: value });
  };

  const checkAnswers = () => {
    const newResult = {};
    words.forEach(({ german, vietnam }) => {
      newResult[vietnam] =
        answers[vietnam]?.trim().toLowerCase() === german.trim().toLowerCase();
    });
    setResult(newResult);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>← Back to Topics</button>
      <h2>🗂️ Topic: {topic}</h2>
      {words.map(({ german, vietnam }) => (
        <div key={vietnam} style={{ margin: "10px 0" }}>
          <span style={{ marginRight: 10 }}>{vietnam}</span>
          <input
            placeholder="Type German word"
            value={answers[vietnam] || ""}
            onChange={(e) => handleChange(vietnam, e.target.value)}
          />
          {result[vietnam] !== undefined && (
            <span
              style={{
                marginLeft: 10,
                color: result[vietnam] ? "green" : "red",
              }}
            >
              {result[vietnam] ? "✅ Correct" : `❌ (${german})`}
            </span>
          )}
        </div>
      ))}
      <button onClick={checkAnswers} style={{ marginTop: 20 }}>
        Check Answers
      </button>
    </div>
  );
}
