import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DiagnosisTest.css';

const DiagnosisResults = ({ score, total, grade, onRetake }) => {
    const navigate = useNavigate();
    const percentage = Math.round((score / total) * 100);

    return (
        <div className="diagnosis-runner">
            <div className="results-card">
                <div className="score-circle">
                    <span className="score-value">{score}/{total}</span>
                    <span className="score-label">{percentage}%</span>
                </div>

                <h1 className="text-3xl font-bold mb-4">Assessment Complete!</h1>
                <p className="text-slate-600 mb-8">
                    You've completed the Grade {grade} Diagnosis Test.
                    {percentage >= 80 ? " Excellent work!" : " Keep practicing to improve your score!"}
                </p>

                <div className="flex gap-4 justify-center">
                    <button
                        className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                        onClick={() => navigate('/diagnosis-test')}
                    >
                        Try Other Grade
                    </button>
                    <button
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all"
                        onClick={onRetake}
                    >
                        Retake Test
                    </button>
                    <button
                        className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold transition-all"
                        onClick={() => navigate('/')}
                    >
                        Back Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisResults;
