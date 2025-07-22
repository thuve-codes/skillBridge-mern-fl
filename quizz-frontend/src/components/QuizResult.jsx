import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { submitResult } from "../api";

function QuizResult() {
  const { moduleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { score = 0, total = 0 } = location.state || {};
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    const userId = "student123"; // Replace with actual user logic later
    submitResult({
      userId,
      moduleId,
      score,
      totalQuestions: total,
      correctAnswers: score,
    }).catch(console.error);
  }, [moduleId, score, total]);

  return (
    <div className="p-10 bg-blue-50 min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">
        {moduleId.toUpperCase()} - Quiz Results
      </h2>
      <div className="text-xl text-gray-800 mb-2">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </div>
      <div
        className={`text-2xl font-bold ${
          percentage >= 45 ? "text-green-600" : "text-red-600"
        } mb-8`}
      >
        {percentage}% {percentage >= 45 ? "✔️ Passed" : "❌ Try Again"}
      </div>

      {percentage < 45 && (
        <button
          onClick={() => navigate(`/quiz/${moduleId}`)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md"
        >
          🔄 Retake Quiz
        </button>
      )}

      <button
        onClick={() => navigate("/modules")}
        className="mt-4 text-blue-700 underline hover:text-blue-900"
      >
        ← Back to Modules
      </button>
    </div>
  );
}

export default QuizResult;
