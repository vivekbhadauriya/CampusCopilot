const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Chat with Copilot
export async function chatWithCopilot(message, user_id = "default") {
  const res = await fetch(`${BASE_URL}/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, user_id }),
  });
  return res.json();
}

// Reminders
export async function getReminders() {
  const res = await fetch(`${BASE_URL}/reminders/`);
  return res.json();
}

export async function addReminder(text, due_time) {
  const res = await fetch(`${BASE_URL}/reminders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, due_time }),
  });
  return res.json();
}

export async function deleteReminder(id) {
  const res = await fetch(`${BASE_URL}/reminders/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function toggleReminder(id) {
  const res = await fetch(`${BASE_URL}/reminders/${id}`, {
    method: "PATCH",
  });
  return res.json();
}

// Food Search
export async function searchFood(query) {
  const res = await fetch(`${BASE_URL}/food/?q=${encodeURIComponent(query)}`);
  return res.json();
}