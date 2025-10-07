import React from "react";

export default function TopicList({ topics, onSelect }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>📚 Choose a Topic</h2>
      <ul>
        {topics.map((topic) => (
          <li
            key={topic}
            style={{
              margin: "10px 0",
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
            onClick={() => onSelect(topic)}
          >
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}
