export async function askBot(message) {
  try {
    const response = await fetch("http://127.0.0.1:8000/ask", {
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
