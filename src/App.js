import React, { useState } from "react";

function App() {
  const [githubUrl, setGithubUrl] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!githubUrl || !message) return;
    setLoading(true);

    setChatHistory((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await fetch("http://localhost:8000/ci/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_url: githubUrl, message }),
      });
      const data = await res.json();
      setChatHistory((prev) => [...prev, { role: "gpt", content: data.message }]);
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("GPT 호출 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>K8s AI Manager GPT Chat</h1>

      <input
        type="text"
        placeholder="GitHub URL 입력"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <textarea
        placeholder="메시지 입력"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "8px" }}
      />
      <button onClick={sendMessage} style={{ marginTop: "10px", padding: "8px 16px" }}>
        {loading ? "전송 중..." : "전송"}
      </button>

      <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "10px", maxHeight: "500px", overflowY: "auto" }}>
        {chatHistory.map((chat, idx) => (
          <div key={idx} style={{ marginBottom: "12px" }}>
            <b>{chat.role === "user" ? "사용자" : "GPT"}:</b>
            <pre style={{ whiteSpace: "pre-wrap", background: "#f9f9f9", padding: "8px", borderRadius: "4px" }}>
              {chat.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
