import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RelationsExams.css";
import { allExams } from "./relationsTestQuestions";

export default function RelationsExams() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Function to handle clicking a test
    const handleStartTest = (exam) => {
        // Send state to the global CBT Assessment UI
        navigate("/assessment", {
            state: {
                title: `Relations - ${exam.title}`,
                questions: exam.questions,
                subject: "Mathematics",
                minutes: 30 // Defaults to 30 mins
            }
        });
    };

    return (
        <div className="rel-exams-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="rel-intro-nav" style={{ padding: '' }}>
                <button
                    className="rel-intro-nav-back"
                    onClick={() => navigate("/senior/grade/12/relations")}
                >
                    ← Back to Relations HUB
                </button>
            </nav>

            <div className="rel-exams-hero">
                <h1 className="rel-exams-title">
                    Relations{" "}
                    <span
                        style={{
                            background: "linear-gradient(135deg, #ef4444, #f87171)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Chapter Tests
                    </span>
                </h1>
                <p className="rel-exams-subtitle">
                    Prepare for the real exam. Choose a test below to launch in the full CBT Assessment environment.
                </p>
            </div>

            <div className="rel-exams-grid">
                {allExams.map((exam, idx) => (
                    <div
                        key={idx}
                        className="rel-exam-card"
                        onClick={() => handleStartTest(exam)}
                    >
                        <div
                            className="rel-exam-strip"
                            style={{ background: exam.color }}
                        />
                        <div className="rel-exam-icon-wrap">
                            <div
                                className="rel-exam-icon"
                                style={{
                                    background: `${exam.color}15`,
                                    color: exam.color
                                }}
                            >
                                📝
                            </div>
                            <div className="rel-exam-info">
                                <h3 className="rel-exam-title">{exam.title}</h3>
                                <div
                                    className="rel-exam-subtitle"
                                    style={{ color: exam.color }}
                                >
                                    {exam.subtitle}
                                </div>
                            </div>
                        </div>

                        <div className="rel-exam-meta">
                            <span className="rel-exam-qcount">
                                📋 {exam.questions.length} questions
                            </span>
                            <span className="rel-exam-start">
                                Start Test →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
