"use client";

import { useState } from "react";

export default function PocClientComponentPage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", background: "#09090B", color: "#FAFAFA", minHeight: "100vh" }}>
      <h1 style={{ color: "#FFDF20" }}>POC: Client Component Island</h1>
      <p>Interactive state verification on client hydration.</p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        style={{
          background: "#FFDF20",
          color: "#09090B",
          fontWeight: 600,
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Clicks: {count}
      </button>
    </div>
  );
}

