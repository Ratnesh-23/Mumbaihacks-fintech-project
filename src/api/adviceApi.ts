import { API_BASE } from "./client";

export async function getAdvice(data) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return await res.json();
}
