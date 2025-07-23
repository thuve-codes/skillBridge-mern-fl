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
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center bg-light"
      style={{ minHeight: "100vh", padding: "3rem 1rem" }}
    >
      <h2 className="mb-4 display-5 fw-bold text-primary">
        {moduleId.toUpperCase()} - Quiz Results
      </h2>

      <div className="fs-4 text-secondary mb-2">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </div>

      <div
        className={`fs-2 fw-bold mb-5 ${
          percentage >= 45 ? "text-success" : "text-danger"
        }`}
      >
        {percentage}% {percentage >= 45 ? "✔️ Passed" : "❌ Try Again"}
      </div>

      {percentage < 45 && (
        <button
          onClick={() => navigate(`/quiz/${moduleId}`)}
          className="btn btn-danger btn-lg"
        >
          🔄 Retake Quiz
        </button>
      )}

      <button
        onClick={() => navigate("/modules")}
        className="btn btn-link mt-3 text-primary"
      >
        ← Back to Modules
      </button>
    </div>
  );
}

export default QuizResult;
