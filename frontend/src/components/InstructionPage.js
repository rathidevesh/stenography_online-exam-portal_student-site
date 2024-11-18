import React from 'react';
import './InstructionPage.css';
import { useNavigate } from 'react-router-dom';

const InstructionPage = () => {
  const navigate = useNavigate();
  const handleStartExam = () => {
    // Handle the logic to start the exam here
    console.log("Exam started!");
    // const navigate = useNavigate();
    navigate('/fetchquestions')
  };

  return (
    <div className="instruction-container">
      <h1 className="title">Exam Instructions</h1>
      <div className="instruction-card">
        <h2 className="section-title">Please read carefully before starting the exam</h2>
        <ol className="instructions-list">
          <li>Ensure that you have a stable internet connection throughout the exam.</li>
          <li>Once the exam starts, do not refresh the page or navigate away from the exam window.</li>
          <li>You will be provided with a set time to complete the exam. Ensure that you submit your answers before time runs out.</li>
          <li>If you encounter any issues, please reach out to the exam support team immediately.</li>
          <li>Do not attempt to open any unauthorized materials or use unfair means during the exam.</li>
          <li>Your progress will be saved automatically as you answer each question.</li>
          <li>You can only start the exam within the scheduled start time. Make sure you start within 5 minutes of the scheduled time.</li>
        </ol>
        <div className="action-container">
          <button className="start-exam-btn" onClick={handleStartExam}>Start Exam</button>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
