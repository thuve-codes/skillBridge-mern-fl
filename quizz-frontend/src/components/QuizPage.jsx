import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuestions } from "../api";

function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [module, setModule] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchQuestions(moduleId)
      .then((data) => setModule(data))
      .catch(console.error);
  }, [moduleId]);

  if (!module) {
    return <div className="p-5 text-secondary text-center">Loading...</div>;
  }

  const questions = module.quiz;
  const currentQ = questions[current];

  const handleNext = () => {
    if (selected === currentQ.answer) setScore(score + 1);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      navigate(`/results/${module.id}`, {
        state: {
          score: selected === currentQ.answer ? score + 1 : score,
          total: questions.length,
        },
      });
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-primary fw-bold">
        {module.title} Quiz — Question {current + 1} of {questions.length}
      </h2>

      <div className="mb-4">
        <p className="h5 fw-semibold">{currentQ.question}</p>

        <div className="mt-3">
          {currentQ.options.map((opt, i) => (
            <div className="form-check mb-2" key={i}>
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id={`option-${i}`}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
              />
              <label className="form-check-label" htmlFor={`option-${i}`}>
                {opt}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className="btn btn-primary"
      >
        {current === questions.length - 1 ? "Submit Quiz" : "Next"}
      </button>
    </div>
  );
}

export default QuizPage;
