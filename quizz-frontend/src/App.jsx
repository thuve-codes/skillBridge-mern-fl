import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import ModuleList from "./components/ModuleList";
import QuizPage from "./components/QuizPage";
import QuizResult from "./components/QuizResult";
import LoginPage from "./components/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar or header with Logout button */}
      {isLoggedIn && (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <span className="navbar-brand fw-bold text-primary">
              SkillBridge
            </span>
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
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
    </div>
  );
}

export default App;
