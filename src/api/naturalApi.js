export async function analyzeNaturalText(text) {
  const res = await fetch("/api/natural/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  return res.json();
}

export async function executeAction(actionSpec) {
  const res = await fetch("http://k8s-ai-manager.default.svc.cluster.local/natural/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action_spec: actionSpec })
  });

  return res.json();
}
