export default function ActionCard({ action, onExecute }) {
  return (
    <div style={{
      background: "#f9fafb",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      marginTop: "10px"
    }}>
      <h3>🚀 분석 결과</h3>
      <p><strong>Action Type:</strong> {action.action_type}</p>
      <p><strong>Task Type:</strong> {action.task_type}</p>

      <pre style={{
        background: "#111827",
        color: "#f3f4f6",
        padding: "10px",
        borderRadius: "8px",
        marginTop: "10px",
        fontSize: "0.85rem"
      }}>
{JSON.stringify(action.spec, null, 2)}
      </pre>

      <button
        onClick={() => onExecute(action)}
        style={{
          marginTop: "10px",
          background: "#10b981",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        이 작업 실행하기
      </button>
    </div>
  );
}
