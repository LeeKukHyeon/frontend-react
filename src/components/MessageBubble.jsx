export default function MessageBubble({ text, sender }) {
  const isUser = sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        padding: "5px"
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          background: isUser ? "#4f46e5" : "#e5e7eb",
          color: isUser ? "white" : "black",
          padding: "10px 14px",
          borderRadius: "12px"
        }}
      >
        {text}
      </div>
    </div>
  );
}
