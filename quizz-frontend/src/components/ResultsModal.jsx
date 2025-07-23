import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

function ResultsModal({ show, handleClose, results }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>My Quiz Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Module</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id}>
                  <td>{result.moduleId}</td>
                  <td>{result.score}</td>
                  <td>{result.correctAnswers}</td>
                  <td>{result.totalQuestions}</td>
                  <td>{new Date(result.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultsModal;
