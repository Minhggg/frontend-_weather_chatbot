export async function askBot(message) {
  try {
    const response = await fetch("https://backend-weather-chatbot-3.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: message }),
    });

    if (!response.ok) {
      throw new Error("API lỗi: " + response.statusText);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    throw new Error("Có lỗi xảy ra: " + error.message);
  }
}
