import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import ModuleList from "./components/ModuleList";
import QuizPage from "./components/QuizPage";
import QuizResult from "./components/QuizResult";
import LoginPage from "./components/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
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
  );
}

export default App;
