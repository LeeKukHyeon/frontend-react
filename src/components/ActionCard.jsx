export default function ActionCard({ action, onExecute }) {
  // GPT 응답의 action 값을 가져옵니다
  const actionType = action.action;

  return (
    <div style={{
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      padding: "12px",
      marginTop: "12px",
      background: "#f9fafb"
    }}>
      <p><strong>Action:</strong> {actionType}</p>
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <button
          onClick={() => onExecute(actionType)}
          style={{
            padding: "6px 12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          실행
        </button>

        <button
          onClick={() => onExecute("cancel")}
          style={{
            padding: "6px 12px",
            background: "#9ca3af",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}
