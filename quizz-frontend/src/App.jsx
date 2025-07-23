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
import {
  Container,
  Navbar,
  Nav,
  Button,
  Badge,
  Spinner,
  Toast,
} from "react-bootstrap";
import {
  HouseDoorFill,
  BookHalf,
  CardChecklist,
  BoxArrowRight,
  Trophy,
} from "react-bootstrap-icons";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const userId = "student123"; // Replace with dynamic ID if available

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
    showToastMessage("Logged out successfully");
  };

  const handleShowResults = async () => {
    setLoadingResults(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/results/${userId}`
      );
      setQuizResults(res.data);
      setShowResultsModal(true);
    } catch (error) {
      showToastMessage("Failed to load results");
      console.error(error);
    } finally {
      setLoadingResults(false);
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {isLoggedIn && (
        <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand
              href="/"
              className="fw-bold d-flex align-items-center"
            >
              <Trophy className="me-2" size={24} />
              <span className="d-none d-sm-inline">SkillBridge</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="align-items-center">
                <Button
                  variant="outline-light"
                  className="me-2 d-flex align-items-center"
                  onClick={handleShowResults}
                  disabled={loadingResults}
                >
                  {loadingResults ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Loading...
                    </>
                  ) : (
                    <>
                      <CardChecklist className="me-1" /> My Results
                    </>
                  )}
                </Button>

                <Button
                  variant="outline-light"
                  className="d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <BoxArrowRight className="me-1" /> Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      <main className="flex-grow-1 py-4">
        <Container className="mt-3">
          <Routes>
            <Route
              path="/login"
              element={
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  showToastMessage={showToastMessage}
                />
              }
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
              element={
                isLoggedIn ? (
                  <QuizPage showToastMessage={showToastMessage} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/results/:moduleId"
              element={isLoggedIn ? <QuizResult /> : <Navigate to="/login" />}
            />
          </Routes>
        </Container>
      </main>

      <footer className="bg-dark text-white py-3 mt-auto">
        <Container className="text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} SkillBridge Learning Platform
            <br />
            <small>
              Built with <span className="text-danger">&hearts;</span> by
              Thuverakan Tharumakulasooriyan <br />
              <a href="www.thuve.me">www.thuve.me</a>
            </small>
          </p>
        </Container>
      </footer>

      <ResultsModal
        show={showResultsModal}
        handleClose={() => setShowResultsModal(false)}
        results={quizResults}
      />

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
        bg="dark"
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default App;
