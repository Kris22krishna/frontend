import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../../../../MathRenderer';
import mascotImg from '../../../../../../../assets/mascot.png';
import '../../../NumberSystem.css';

export default function AssessmentEngine({ questions, title, onBack, color }) {
    const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
    const [finished, setFinished] = useState(false);
    const topRef = useRef(null);

    useEffect(() => {
        const newQs = typeof questions === 'function' ? questions() : questions;
        setQuestionSet(newQs);
        setCurrent(0);
        setAnswers(Array(newQs.length).fill(null));
        setFinished(false);
    }, [questions]);

    // Scroll to top when question changes (for mobile palette)
    useEffect(() => {
        if (topRef.current) {
            const yOffset = -100; // Account for sticky nav
            const element = topRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [current]);

    // Timer state: 1 minute per question
    const [timeLeft, setTimeLeft] = useState(questionSet.length * 60);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) {
            setFinished(true); // Auto-submit when time is up
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, finished]);

    // Format time (MM:SS)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questionSet[current];

    const handleSelect = (optIdx) => {
        if (finished) return;
        const newAns = [...answers];
        newAns[current] = optIdx;
        setAnswers(newAns);
    };

    const handleNext = () => {
        if (current + 1 < questionSet.length) setCurrent(c => c + 1);
    };

    const handlePrev = () => {
        if (current > 0) setCurrent(c => c - 1);
    };

    const handleSubmit = () => {
        if (answers.includes(null)) {
            if (!window.confirm("You have unanswered questions. Are you sure you want to submit?")) return;
        }
        setFinished(true);
    };

    if (finished) {
        let score = 0;
        answers.forEach((ans, i) => {
            if (ans === questionSet[i].correct) score++;
        });
        const pct = Math.round((score / questionSet.length) * 100);

        return (
            <div className="ns-quiz-finished" style={{ maxWidth: 900, margin: '40px auto', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <img
                        src={mascotImg}
                        alt="Mascot"
                        style={{
                            width: 120,
                            height: 'auto',
                            marginBottom: 20,
                            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
                        }}
                    />
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a' }}>Assessment Complete</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 24 }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 40, fontWeight: 900, color }}>{score} / {questionSet.length}</div>
                            <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>Score</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 40, fontWeight: 900, color: '#0d9488' }}>{pct}%</div>
                            <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>Accuracy</div>
                        </div>
                    </div>
                    <button className="ns-btn-secondary" onClick={onBack} style={{ marginTop: 32, padding: '10px 32px' }}>Return to Skills</button>
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: '#0f172a' }}>Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questionSet.map((question, i) => {
                        const isCorrect = answers[i] === question.correct;
                        const isSkipped = answers[i] === null;
                        const correctOptText = question.options[question.correct];
                        const userOptText = !isSkipped ? question.options[answers[i]] : 'Skipped';

                        const statusText = isCorrect ? 'Correct' : (isSkipped ? 'Skipped' : 'Incorrect');
                        const statusColor = isCorrect ? '#0d9488' : (isSkipped ? '#94a3b8' : '#e11d48');

                        return (
                            <div key={i} style={{
                                padding: 20, borderRadius: 12,
                                border: `2px solid ${statusColor}`,
                                background: isCorrect ? 'rgba(16,185,129,0.05)' : (isSkipped ? 'rgba(148,163,184,0.05)' : 'rgba(239,68,68,0.05)')
                            }}>
                                <div style={{ fontWeight: 800, marginBottom: 8, color: statusColor }}>Question {i + 1} - {statusText}</div>
                                <div className="ns-quiz-question-text" style={{ fontSize: 16, marginBottom: 16, color: '#0f172a', fontWeight: 600 }}>
                                    <MathRenderer text={question.question} />
                                </div>
                                <div className="ns-summary-split">
                                    <div className="ns-summary-item">
                                        <strong style={{ color: '#0d9488' }}>Correct Answer:</strong>
                                        <div style={{ marginTop: 6 }}><MathRenderer text={correctOptText.includes('$') || correctOptText.includes('^') || correctOptText.includes('/') || correctOptText.includes('\\frac') ? (correctOptText.includes('$') ? correctOptText : `$${correctOptText}$`) : correctOptText} /></div>
                                    </div>
                                    <div className="ns-summary-item user-ans">
                                        <strong style={{ color: statusColor }}>Your Answer:</strong>
                                        <div style={{ marginTop: 6 }}>{isSkipped ? 'Skipped' : <MathRenderer text={userOptText.includes('$') || userOptText.includes('^') || userOptText.includes('/') || userOptText.includes('\\frac') ? (userOptText.includes('$') ? userOptText : `$${userOptText}$`) : userOptText} />}</div>
                                    </div>
                                </div>
                                {question.explanation && (
                                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed #e2e8f0' }}>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: '#312e81', textTransform: 'uppercase', marginBottom: 4 }}>Solution</div>
                                        <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.5 }}><MathRenderer text={question.explanation} /></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="ns-quiz-active ns-assessment-layout">
            {/* Left Main Question Area */}
            <div style={{ flex: 1 }} ref={topRef}>
                <div className="ns-score-header">
                    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, margin: 0, color: '#0f172a' }}>{title}</h3>
                </div>

                <div className="ns-quiz-card">
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: `${color}15`, padding: '4px 12px', borderRadius: 8,
                        fontSize: 12, fontWeight: 800, color, marginBottom: 16
                    }}>
                        <span>QUESTION</span> {current + 1}
                    </div>
                    <div className="ns-quiz-question-text" style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 24 }}>
                        <MathRenderer text={q.question} />
                    </div>

                    <div className="ns-quiz-options">
                        {q.options.map((opt, oi) => {
                            const isSelected = answers[current] === oi;
                            return (
                                <button
                                    key={oi}
                                    onClick={() => handleSelect(oi)}
                                    className={`ns-option-btn ${isSelected ? 'selected' : ''}`}
                                    style={{ '--skill-color': color }}
                                >
                                    <div style={{
                                        width: 10, height: 10, borderRadius: '50%',
                                        background: isSelected ? color : '#f1f5f9', flexShrink: 0
                                    }} />
                                    <span>
                                        <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') || opt.includes('\\frac') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={handlePrev} disabled={current === 0} className="ns-btn-secondary" style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>
                        <button
                            onClick={handleNext}
                            disabled={current + 1 === questionSet.length}
                            className="ns-btn-secondary"
                            style={{
                                display: current + 1 === questionSet.length ? 'none' : 'block',
                                border: '1px solid #cbd5e1'
                            }}
                        >
                            Skip →
                        </button>
                    </div>
                    {current + 1 === questionSet.length ? (
                        <button onClick={handleSubmit} className="ns-btn-primary" style={{ background: '#e11d48', border: 'none', color: '#fff' }}>Submit Assessment</button>
                    ) : (
                        <button onClick={handleNext} className="ns-btn-primary" style={{ background: color, border: 'none', color: '#fff' }}>Next →</button>
                    )}
                </div>
            </div>

            {/* Right Question Palette */}
            <div className="ns-assessment-palette">
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px', background: timeLeft < 60 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(8, 145, 178, 0.05)',
                    color: timeLeft < 60 ? '#e11d48' : '#0f172a',
                    borderRadius: 12, marginBottom: 24, fontWeight: 800, fontSize: 20
                }}>
                    ⏱️ {formatTime(timeLeft)}
                </div>

                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: '#0f172a' }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                    {questionSet.map((_, i) => {
                        const isAnswered = answers[i] !== null;
                        const isCurrent = current === i;
                        return (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                style={{
                                    aspectRatio: '1/1', borderRadius: 8, fontSize: 14, fontWeight: 700,
                                    background: isAnswered ? color : '#f1f5f9',
                                    color: isAnswered ? '#fff' : '#64748b',
                                    border: isCurrent ? `3px solid #0f172a` : 'none',
                                    cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: 20, fontSize: 12, color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><div style={{ width: 12, height: 12, background: color, borderRadius: 3 }} /> Answered</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><div style={{ width: 12, height: 12, background: '#f1f5f9', borderRadius: 3 }} /> Not Answered</div>
                </div>
                <button onClick={handleSubmit} style={{ marginTop: 24, width: '100%', padding: '12px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Submit Assessment</button>
            </div>
        </div>
    );
}
