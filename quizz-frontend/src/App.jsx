import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import ModuleList from "./components/ModuleList";
import QuizPage from "./components/QuizPage";
import QuizResult from "./components/QuizResult";
import LoginPage from "./components/LoginPage";
import ResultsModal from "./components/ResultsModal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const navigate = useNavigate();

  const userId = "student123"; // Replace with dynamic ID if available

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleShowResults = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/results/${userId}`
      );
      setQuizResults(res.data);
      setShowResultsModal(true);
    } catch (error) {
      alert("Failed to load results");
      console.error(error);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {isLoggedIn && (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container d-flex justify-content-between">
            <span className="navbar-brand fw-bold text-primary">
              SkillBridge
            </span>
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={handleShowResults}
              >
                My Results
              </button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      <div className="container py-4">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <Welcome /> : <Navigate to="/login" />}
          />
          <Route
            path="/modules"
            element={isLoggedIn ? <ModuleList /> : <Navigate to="/login" />}
          />
          <Route
            path="/quiz/:moduleId"
            element={isLoggedIn ? <QuizPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/results/:moduleId"
            element={isLoggedIn ? <QuizResult /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      <ResultsModal
        show={showResultsModal}
        handleClose={() => setShowResultsModal(false)}
        results={quizResults}
      />
    </div>
  );
}

export default App;
