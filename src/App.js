import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    setStatus("처리 중...");
    try {
      const res = await axios.post("http://k8s-ai-manager.default.svc.cluster.local:8000/natural/command", { text: input });
      setStatus(res.data.message || "배포 완료!");
    } catch (err) {
      setStatus("에러 발생: " + err.message);
    }
  };

  return (
    <div>
      <h1>CI/CD 자동 배포</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="깃허브 URL 또는 명령어를 입력하세요"
      />
      <button onClick={handleSubmit}>배포 시작</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
