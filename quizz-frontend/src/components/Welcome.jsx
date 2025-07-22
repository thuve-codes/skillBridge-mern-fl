import React from "react";
import { useNavigate } from "react-router-dom";
import skillbridgeLogo from "../assets/skillbridge.png"; // adjust path

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div
        className="bg-white rounded-4 shadow-lg p-5 p-md-6 text-center"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <div className="d-flex flex-column align-items-center gap-3">
          <div className="mb-3" style={{ width: "120px" }}>
            <img
              src={skillbridgeLogo}
              alt="SkillBridge Logo"
              className="img-fluid"
            />
          </div>

          <h1 className="display-4 fw-bold text-primary">
            Welcome to <span className="text-info">IT Quiz Forum</span>
          </h1>

          <p
            className="text-secondary fs-5 mx-auto"
            style={{ maxWidth: "480px" }}
          >
            Sharpen your skills with quizzes on Web Development, Networking,
            Cybersecurity, and more. Ready to challenge yourself?
          </p>

          <button
            onClick={() => navigate("/modules")}
            className="btn btn-info btn-lg mt-4 px-5 shadow-sm"
            style={{ fontWeight: "600", transition: "transform 0.3s ease" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            🚀 Start the Journey
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
