import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FunctionsExams.css";
import { allExams } from "./functionsTestQuestions";

export default function FunctionsExams() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartTest = (exam) => {
    navigate("/assessment", {
      state: {
        title: `Functions - ${exam.title}`,
        questions: exam.questions,
        subject: "Mathematics",
        minutes: 30,
      },
    });
  };

  return (
    <div className="rel-exams-page">
      <nav className="rel-intro-nav" style={{ padding: "" }}>
        <button className="rel-intro-nav-back" onClick={() => navigate("/senior/grade/12/functions")}>
          &larr; Back to Functions HUB
        </button>
      </nav>

      <div className="rel-exams-hero">
        <h1 className="rel-exams-title">
          Functions{" "}
          <span style={{ background: "linear-gradient(135deg, #ef4444, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Chapter Tests
          </span>
        </h1>
        <p className="rel-exams-subtitle">
          Prepare for the real exam. Choose a test below to launch in the full CBT Assessment environment.
        </p>
      </div>

      <div className="rel-exams-grid">
        {allExams.map((exam) => (
          <div key={exam.id} className="rel-exam-card" onClick={() => handleStartTest(exam)}>
            <div className="rel-exam-strip" style={{ background: exam.color }} />
            <div className="rel-exam-icon-wrap">
              <div className="rel-exam-icon" style={{ background: `${exam.color}15`, color: exam.color, fontSize: 14, fontWeight: 800 }}>
                TEST
              </div>
              <div className="rel-exam-info">
                <h3 className="rel-exam-title">{exam.title}</h3>
                <div className="rel-exam-subtitle" style={{ color: exam.color }}>
                  {exam.subtitle}
                </div>
              </div>
            </div>

            <div className="rel-exam-meta">
              <span className="rel-exam-qcount">Q {exam.questions.length} questions</span>
              <span className="rel-exam-start">Start Test -&gt;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
