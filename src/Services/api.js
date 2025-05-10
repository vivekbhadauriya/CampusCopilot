const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Helper function for API calls
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

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
  return fetchWithErrorHandling(`${BASE_URL}/reminders/`);
}

export async function addReminder(reminderData) {
  return fetchWithErrorHandling(`${BASE_URL}/reminders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reminderData),
  });
}

export async function deleteReminder(id) {
  return fetchWithErrorHandling(`${BASE_URL}/reminders/${id}`, {
    method: "DELETE",
  });
}

export async function toggleReminder(id) {
  return fetchWithErrorHandling(`${BASE_URL}/reminders/${id}`, {
    method: "PATCH",
  });
}

// Food Search
export async function searchFood(query) {
  return fetchWithErrorHandling(`${BASE_URL}/food/?q=${encodeURIComponent(query)}`);
}