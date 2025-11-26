import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId] = useState(uuidv4());
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const sendMessage = async (msg) => {
    if (!msg) return;
    setLoading(true);
    setChatHistory(prev => [...prev, { role: "user", content: msg }]);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/ci/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: msg }),
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: "gpt", content: data.message }]);
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

      <textarea
        placeholder="GitHub URL 포함하여 명령 입력 (예: 깃허브 URL은 https://github.com/user/repo 이고 배포해줘)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "8px" }}
      />
      <button
        onClick={() => sendMessage(message)}
        style={{ marginTop: "10px", padding: "8px 16px" }}
        disabled={loading}
      >
        {loading ? "전송 중..." : "전송"}
      </button>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ddd",
          padding: "10px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {chatHistory.map((chat, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: chat.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                background: chat.role === "user" ? "#dcf8c6" : "#f1f0f0",
                padding: "8px 12px",
                borderRadius: "10px",
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
              }}
            >
              {chat.content.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default App;
