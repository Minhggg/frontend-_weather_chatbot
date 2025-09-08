"use client";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askBackend = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("https://backend-weather-chatbot-3.onrender.com/get-weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer || "Không nhận được phản hồi từ backend.");
    } catch (error: any) {
      setAnswer("Có lỗi xảy ra: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        🌤️ Weather Chatbot
      </h1>

      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-lg">
        <textarea
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Hãy hỏi về thời tiết (ví dụ: Thời tiết ở Hà Nội thế nào?)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askBackend}
          disabled={loading}
          className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Hỏi Bot"}
        </button>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg min-h-[80px]">
          {answer ? (
            <p className="whitespace-pre-line">{answer}</p>
          ) : (
            <p className="text-gray-400 italic">Câu trả lời sẽ hiển thị ở đây...</p>
          )}
        </div>
      </div>
    </main>
  );
}
