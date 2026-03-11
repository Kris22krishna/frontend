import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../../../MathRenderer';

export default function AssessmentEngine({ questions, title, onBack, onSecondaryBack, color, prefix = 'alg' }) {
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
            const yOffset = -100;
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
            setFinished(true);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, finished]);

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
            <div className={`${prefix}-quiz-finished`} style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: `var(--${prefix}-text, #1e293b)` }}>Assessment Complete</h2>
                    <div style={{ fontSize: 48, fontWeight: 900, color }}>{score} / {questionSet.length}</div>
                    <div style={{ fontSize: 18, color: `var(--${prefix}-muted)`, fontWeight: 600 }}>Score: {pct}%</div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
                        <button
                            className={`${prefix}-btn-primary`}
                            onClick={() => {
                                const newQs = typeof questions === 'function' ? questions() : questions;
                                setQuestionSet(newQs);
                                setCurrent(0);
                                setAnswers(Array(newQs.length).fill(null));
                                setTimeLeft(newQs.length * 60);
                                setFinished(false);
                            }}
                            style={{ padding: '10px 20px', background: color, border: 'none', color: '#fff', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                        >
                            Retake Assessment
                        </button>
                        <button className={`${prefix}-btn-secondary`} onClick={onBack} style={{ padding: '10px 20px' }}>Return to Skills</button>
                        {onSecondaryBack && (
                            <button className={`${prefix}-btn-secondary`} onClick={onSecondaryBack} style={{ padding: '10px 20px', background: '#f8fafc' }}>Back to Chapter</button>
                        )}
                    </div>
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: `var(--${prefix}-text, #1e293b)` }}>Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questionSet.map((question, i) => {
                        const isCorrect = answers[i] === question.correct;
                        const correctOptText = question.options[question.correct];
                        const userOptText = answers[i] !== null ? question.options[answers[i]] : 'Not Answered';

                        return (
                            <div key={i} style={{
                                padding: 20, borderRadius: 12,
                                border: `2px solid ${isCorrect ? `var(--${prefix}-teal)` : `var(--${prefix}-red)`}`,
                                background: isCorrect ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'
                            }}>
                                <div style={{ fontWeight: 800, marginBottom: 8, color: isCorrect ? `var(--${prefix}-teal)` : `var(--${prefix}-red)` }}>Question {i + 1} - {isCorrect ? 'Correct' : 'Incorrect'}</div>
                                <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 16, marginBottom: 16, color: `var(--${prefix}-text, #1e293b)`, fontWeight: 600 }}>
                                    <MathRenderer text={question.question} />
                                </div>
                                <div className={`${prefix}-summary-split`}>
                                    <div className={`${prefix}-summary-item`}>
                                        <strong style={{ color: `var(--${prefix}-teal)` }}>Correct Answer:</strong>
                                        <div style={{ marginTop: 6 }}><MathRenderer text={correctOptText.includes('$') || correctOptText.includes('^') ? (correctOptText.includes('$') ? correctOptText : `$${correctOptText}$`) : correctOptText} /></div>
                                    </div>
                                    <div className={`${prefix}-summary-item user-ans`}>
                                        <strong style={{ color: isCorrect ? `var(--${prefix}-teal)` : `var(--${prefix}-red)` }}>Your Answer:</strong>
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
        <div className={`${prefix}-quiz-active ${prefix}-assessment-layout`}>
            {/* Left Main Question Area */}
            <div style={{ flex: 1 }} ref={topRef}>
                <div className={`${prefix}-score-header`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, margin: 0, color: `var(--${prefix}-text, #1e293b)` }}>{title}</h3>
                    </div>
                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
                                onBack();
                            }
                        }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: '#fee2e2', color: '#ef4444',
                            border: '1px solid #fca5a5', padding: '6px 14px',
                            borderRadius: '8px', fontSize: '14px', fontWeight: '700',
                            cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(239,68,68,0.1)'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#fecaca'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(239,68,68,0.15)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(239,68,68,0.1)'; }}
                    >
                        ✕ Exit
                    </button>
                </div>

                <div className={`${prefix}-quiz-card`}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: `${color}15`, padding: '4px 12px', borderRadius: 8,
                        fontSize: 12, fontWeight: 800, color, marginBottom: 16
                    }}>
                        <span>QUESTION</span> {current + 1}
                    </div>
                    <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 18, fontWeight: 600, color: `var(--${prefix}-text, #1e293b)`, lineHeight: 1.6, marginBottom: 24 }}>
                        {q.svg && (
                            <div style={{ marginBottom: 16, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />
                        )}
                        <MathRenderer text={q.question} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
                                        transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500, color: `var(--${prefix}-text, #1e293b)`
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
                    <button onClick={handlePrev} disabled={current === 0} className={`${prefix}-btn-secondary`} style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>
                    {current + 1 === questionSet.length ? (
                        <button onClick={handleSubmit} className={`${prefix}-btn-primary`} style={{ background: `var(--${prefix}-red)`, border: 'none', color: '#fff' }}>Submit Assessment</button>
                    ) : (
                        <button onClick={handleNext} className={`${prefix}-btn-primary`} style={{ background: color, border: 'none', color: '#fff' }}>Next →</button>
                    )}
                </div>
            </div>

            {/* Right Question Palette */}
            <div className={`${prefix}-assessment-palette`}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    padding: '16px', background: timeLeft < 60 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(8, 145, 178, 0.05)',
                    color: timeLeft < 60 ? `var(--${prefix}-red)` : 'var(--ft-ocean, #0369a1)',
                    borderRadius: 16, marginBottom: 32, fontWeight: 900, fontSize: 24,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                    border: timeLeft < 60 ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(8,145,178,0.1)'
                }}>
                    <span style={{ fontSize: 28 }}>⏱️</span> {formatTime(timeLeft)}
                </div>

                <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 16, color: `var(--${prefix}-text)`, textTransform: 'uppercase', letterSpacing: 1.2, opacity: 0.8 }}>Question Palette</div>
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
                                    color: isAnswered ? '#fff' : `var(--${prefix}-muted)`,
                                    border: isCurrent ? `3px solid var(--${prefix}-text)` : 'none',
                                    cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: 20, fontSize: 12, color: `var(--${prefix}-muted)` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><div style={{ width: 12, height: 12, background: color, borderRadius: 3 }} /> Answered</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><div style={{ width: 12, height: 12, background: '#f1f5f9', borderRadius: 3 }} /> Not Answered</div>
                </div>
                <button onClick={handleSubmit} style={{ marginTop: 24, width: '100%', padding: '12px', background: `var(--${prefix}-red)`, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Submit Assessment</button>
            </div>
        </div>
    );
}
