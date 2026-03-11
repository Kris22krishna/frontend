import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DiagnosisTest.css';

const DiagnosisLanding = () => {
    const navigate = useNavigate();
    const grades = Array.from({ length: 10 }, (_, i) => i + 1);

    const getGradeIcon = (grade) => {
        const icons = {
            1: "🍎", 2: "🎈", 3: "🎨", 4: "🚀", 5: "🔭",
            6: "🧬", 7: "📐", 8: "🧪", 9: "🏛️", 10: "🎓"
        };
        return icons[grade] || "📚";
    };

    return (
        <div className="diagnosis-container">
            <header className="diagnosis-header">
                <h1>Diagnosis Test</h1>
                <p>Assess your skills and identify areas for improvement.</p>
            </header>

            <div className="grade-grid">
                {grades.map((grade) => (
                    <div
                        key={grade}
                        className="grade-card"
                        onClick={() => navigate(`/diagnosis-test/${grade}`)}
                    >
                        <span className="grade-icon">{getGradeIcon(grade)}</span>
                        <h2>Grade {grade}</h2>
                        <p className="text-slate-500 text-sm">Comprehensive assessment covering key concepts.</p>
                        <button className="btn-start-test">Start Assessment</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiagnosisLanding;
