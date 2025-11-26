import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");

    useEffect(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
  }, []);

  const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    const res = await fetch("/api/ci/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, user_id: userId })
    });
    const data = await res.json();
    setMessages([...newMessages, { role: "gpt", text: data.message }]);
    setInput("");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">CI/CD GPT 매니저</h1>
      <div className="border p-4 h-96 overflow-y-auto mb-4">
        {messages.map((m, idx) => (
          <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
            <p className={m.role === "user" ? "bg-blue-100 p-2 rounded inline-block" : "bg-gray-100 p-2 rounded inline-block"}>
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border flex-1 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: https://github.com/user/repo 배포해줘"
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={sendMessage}>
          전송
        </button>
      </div>
    </div>
  );
}
