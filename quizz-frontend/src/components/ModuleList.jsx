import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchModules } from "../api";

function ModuleList() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules().then(setModules).catch(console.error);
  }, []);

  const firstRow = modules.slice(0, 3);
  const secondRow = modules.slice(3, 5);

  return (
    <div className="min-vh-100 bg-light py-5 px-3">
      <h2 className="display-5 fw-bold text-center text-primary mb-5">
        <span role="img" aria-label="brain">
          🧠
        </span>{" "}
        Choose an IT Module to Start
      </h2>

      <div className="row justify-content-center g-4 mb-4">
        {firstRow.map((module) => (
          <div key={module.id} className="col-12 col-sm-6 col-lg-4 d-flex">
            <ModuleCard module={module} navigate={navigate} />
          </div>
        ))}
      </div>

      <div className="row justify-content-center g-4">
        {secondRow.map((module) => (
          <div
            key={module.id}
            className="col-12 col-sm-6 d-flex justify-content-center"
          >
            <ModuleCard module={module} navigate={navigate} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ module, navigate }) {
  return (
    <div className="card border-primary shadow-sm flex-fill">
      <div className="card-body d-flex flex-column justify-content-between text-center">
        <div>
          <h3 className="card-title text-primary fw-bold">{module.title}</h3>
          <p className="card-text text-secondary">{module.description}</p>
        </div>
        <button
          onClick={() => navigate(`/quiz/${module.id}`)}
          className="btn btn-primary mt-3"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
}

export default ModuleList;
