import React, { useState, useEffect } from 'react';

// Receives: questionPool (full array), sampleSize (default 20), title, color, onBack
export default function GraphsPracticeEngine({ questionPool, sampleSize = 20, title, color, onBack }) {

    const [questions, setQuestions] = useState(() => sample(questionPool, sampleSize));
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    // Count-up timer
    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questions[current];
    const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    const handleRetry = () => {
        // New random questions on retry
        setQuestions(sample(questionPool, sampleSize));
        setCurrent(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setFinished(false);
        setTimeTaken(0);
    };

    // ── FINISHED SCREEN ──────────────────────────────────────────────────────
    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        const sub = pct >= 90 ? 'Excellent understanding of graphs!' : 'Review the concepts and try again.';
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                {/* Score circle */}
                <div style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '8px solid #fff'
                }}>
                    <div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>out of {questions.length}</div>
                    </div>
                </div>

                {/* Time taken badge */}
                <div style={{
                    display: 'inline-block', padding: '6px 16px',
                    background: `${color}15`, color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16
                }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px' }}>{sub}</p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="grph-btn-primary" onClick={handleRetry} style={{ background: color }}>
                        🔀 New Questions
                    </button>
                    <button className="grph-btn-secondary" onClick={onBack}>Return to Skills</button>
                </div>
            </div>
        );
    }

    // ── ACTIVE QUIZ ──────────────────────────────────────────────────────────
    return (
        <div className="grph-quiz-container">
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className="grph-score-header">
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                            Practice
                        </div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block', marginBottom: 4 }}>
                            ⏱️ {formatTime(timeTaken)}
                        </div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>
                            Q <span style={{ color }}>{current + 1}</span> / {questions.length}
                        </div>
                    </div>
                </div>
                {/* Progress bar */}
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* Question card */}
            <div className="grph-quiz-card">
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${color}15`, padding: '4px 12px', borderRadius: 8,
                    fontSize: 12, fontWeight: 800, color, marginBottom: 16
                }}>
                    QUESTION {current + 1}
                </div>

                {/* Optional chart */}
                {q.chart && (
                    <div style={{ marginBottom: 16 }}>
                        <q.chart height={180} />
                    </div>
                )}

                <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 20 }}>
                    {q.question}
                </div>

                {/* Options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.06)';
                        let bg = '#fff';
                        let txtColor = '#0f172a';
                        let dot = '#f1f5f9';

                        if (answered) {
                            if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; dot = '#10b981'; }
                            else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txtColor = '#ef4444'; dot = '#ef4444'; }
                        } else if (selected === oi) {
                            border = color; bg = `${color}05`; dot = color;
                        }

                        return (
                            <button
                                key={oi}
                                onClick={() => handleSelect(oi)}
                                disabled={answered}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 16px', borderRadius: 12,
                                    border: `2.5px solid ${border}`,
                                    background: bg, cursor: answered ? 'default' : 'pointer',
                                    fontSize: 15, color: txtColor, textAlign: 'left',
                                    transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500,
                                    boxShadow: selected === oi && !answered ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dot, flexShrink: 0, transition: 'all 0.2s' }} />
                                <span>{opt}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {answered && (
                    <div style={{
                        marginTop: 20, padding: '14px 18px', borderRadius: 12,
                        background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)',
                        color: '#64748b', fontSize: 13.5, lineHeight: 1.6
                    }}>
                        <strong style={{ color: '#0369a1' }}>💡 Explanation: </strong>
                        {q.explanation}
                    </div>
                )}
            </div>

            {/* Next button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <button
                    onClick={handleNext}
                    disabled={!answered}
                    style={{
                        padding: '12px 40px',
                        background: answered ? color : '#f1f5f9',
                        color: answered ? '#fff' : '#94a3b8',
                        cursor: answered ? 'pointer' : 'not-allowed',
                        border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800,
                        boxShadow: answered ? `0 8px 20px ${color}30` : 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    {current + 1 >= questions.length ? '🏁 See Final Score' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}

// Fisher-Yates sample
function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}
