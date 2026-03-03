import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../../../MathRenderer';

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
            <div className="alg-quiz-finished" style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: 'var(--alg-text)' }}>Assessment Complete</h2>
                    <div style={{ fontSize: 48, fontWeight: 900, color }}>{score} / {questionSet.length}</div>
                    <div style={{ fontSize: 18, color: 'var(--alg-muted)', fontWeight: 600 }}>Score: {pct}%</div>
                    <button className="alg-btn-secondary" onClick={onBack} style={{ marginTop: 20, padding: '10px 20px' }}>Return to Skills</button>
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: 'var(--alg-text)' }}>Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questionSet.map((question, i) => {
                        const isCorrect = answers[i] === question.correct;
                        const correctOptText = question.options[question.correct];
                        const userOptText = answers[i] !== null ? question.options[answers[i]] : 'Not Answered';

                        return (
                            <div key={i} style={{
                                padding: 20, borderRadius: 12,
                                border: `2px solid ${isCorrect ? 'var(--alg-teal)' : 'var(--alg-red)'}`,
                                background: isCorrect ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'
                            }}>
                                <div style={{ fontWeight: 800, marginBottom: 8, color: isCorrect ? 'var(--alg-teal)' : 'var(--alg-red)' }}>Question {i + 1} - {isCorrect ? 'Correct' : 'Incorrect'}</div>
                                <div className="alg-quiz-question-text" style={{ fontSize: 16, marginBottom: 16, color: 'var(--alg-text)', fontWeight: 600 }}>
                                    <MathRenderer text={question.question} />
                                </div>
                                <div className="alg-summary-split">
                                    <div className="alg-summary-item">
                                        <strong style={{ color: 'var(--alg-teal)' }}>Correct Answer:</strong>
                                        <div style={{ marginTop: 6 }}><MathRenderer text={correctOptText.includes('$') || correctOptText.includes('^') ? (correctOptText.includes('$') ? correctOptText : `$${correctOptText}$`) : correctOptText} /></div>
                                    </div>
                                    <div className="alg-summary-item user-ans">
                                        <strong style={{ color: isCorrect ? 'var(--alg-teal)' : 'var(--alg-red)' }}>Your Answer:</strong>
                                        <div style={{ marginTop: 6 }}>{answers[i] === null ? 'Not Answered' : <MathRenderer text={userOptText.includes('$') || userOptText.includes('^') ? (userOptText.includes('$') ? userOptText : `$${userOptText}$`) : userOptText} />}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="alg-quiz-active alg-assessment-layout">
            {/* Left Main Question Area */}
            <div style={{ flex: 1 }} ref={topRef}>
                <div className="alg-score-header">
                    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--alg-text)' }}>{title}</h3>
                </div>

                <div className="alg-quiz-card">
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: `${color}15`, padding: '4px 12px', borderRadius: 8,
                        fontSize: 12, fontWeight: 800, color, marginBottom: 16
                    }}>
                        <span>QUESTION</span> {current + 1}
                    </div>
                    <div className="alg-quiz-question-text" style={{ fontSize: 18, fontWeight: 600, color: 'var(--alg-text)', lineHeight: 1.6, marginBottom: 24 }}>
                        <MathRenderer text={q.question} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                        {q.options.map((opt, oi) => {
                            const isSelected = answers[current] === oi;
                            return (
                                <button
                                    key={oi}
                                    onClick={() => handleSelect(oi)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '14px 16px', borderRadius: 12,
                                        border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.04)'}`,
                                        background: isSelected ? `${color}05` : '#fff',
                                        cursor: 'pointer', fontSize: 15, textAlign: 'left',
                                        transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500, color: 'var(--alg-text)'
                                    }}
                                >
                                    <div style={{
                                        width: 10, height: 10, borderRadius: '50%',
                                        background: isSelected ? color : '#f1f5f9', flexShrink: 0
                                    }} />
                                    <span>
                                        <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <button onClick={handlePrev} disabled={current === 0} className="alg-btn-secondary" style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>
                    {current + 1 === questionSet.length ? (
                        <button onClick={handleSubmit} className="alg-btn-primary" style={{ background: 'var(--alg-red)', border: 'none', color: '#fff' }}>Submit Assessment</button>
                    ) : (
                        <button onClick={handleNext} className="alg-btn-primary" style={{ background: color, border: 'none', color: '#fff' }}>Next →</button>
                    )}
                </div>
            </div>

            {/* Right Question Palette */}
            <div className="alg-assessment-palette">
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px', background: timeLeft < 60 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(8, 145, 178, 0.05)',
                    color: timeLeft < 60 ? 'var(--alg-red)' : 'var(--alg-text)',
                    borderRadius: 12, marginBottom: 24, fontWeight: 800, fontSize: 20
                }}>
                    ⏱️ {formatTime(timeLeft)}
                </div>

                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: 'var(--alg-text)' }}>Question Palette</div>
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
                                    color: isAnswered ? '#fff' : 'var(--alg-muted)',
                                    border: isCurrent ? `3px solid var(--alg-text)` : 'none',
                                    cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: 20, fontSize: 12, color: 'var(--alg-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><div style={{ width: 12, height: 12, background: color, borderRadius: 3 }} /> Answered</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><div style={{ width: 12, height: 12, background: '#f1f5f9', borderRadius: 3 }} /> Not Answered</div>
                </div>
                <button onClick={handleSubmit} style={{ marginTop: 24, width: '100%', padding: '12px', background: 'var(--alg-red)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Submit Assessment</button>
            </div>
        </div>
    );
}
