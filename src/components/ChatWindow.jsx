import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ActionCard from "./ActionCard";
import { analyzeNaturalText, executeAction } from "../api/naturalApi";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(m => [...m, userMessage]);

    const response = await analyzeNaturalText(input);
    console.log("GPT 분석 결과:", response);

    const botMessage = {
      text: "분석이 완료되었습니다. 아래에서 확인하세요!",
      sender: "bot"
    };

    setMessages(m => [...m, botMessage]);
    setAnalysis(response);

    setInput("");
  }

  async function handleExecute(action) {
    const executeRes = await executeAction(action);

    setMessages(m => [
      ...m,
      { sender: "bot", text: `실행 완료: ${JSON.stringify(executeRes)}` }
    ]);

    setAnalysis(null); // 실행 후 분석 카드 제거
  }

  return (
    <div style={{
      width: "600px",
      margin: "0 auto",
      padding: "20px"
    }}>
      <div style={{
        height: "70vh",
        overflowY: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "10px"
      }}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} text={msg.text} sender={msg.sender} />
        ))}

        {analysis && (
          <ActionCard action={analysis} onExecute={handleExecute} />
        )}
      </div>

      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        <input
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "10px 16px",
            background: "#2563eb",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
        >
          보내기
        </button>
      </div>
    </div>
  );
}
