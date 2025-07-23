import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4 text-center">
            {/* Logo */}
            <img
              src="./src/assets/skillbridge.png"
              alt="SkillBridge Logo"
              style={{ width: "100px", marginBottom: "1rem" }}
            />

            {/* App name */}
            <h2 className="mb-4 fw-bold text-primary">
              <i className="bi bi-briefcase-fill me-2"></i>
              SkillBridge
            </h2>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="text-start">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
