import React, { useState, useEffect } from 'react';
import { LatexText } from '../../../../../../LatexText';

function sample(arr, n) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
}

/**
 * LinearEqPracticeEngine
 * Props: questionPool, sampleSize, title, color, onBack
 */
export default function LinearEqPracticeEngine({ questionPool, sampleSize = 10, title, color = '#7c3aed', onBack }) {
    const [questions, setQuestions] = useState(() => sample(questionPool, sampleSize));
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

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
        setQuestions(sample(questionPool, sampleSize));
        setCurrent(0); setSelected(null); setAnswered(false);
        setScore(0); setFinished(false); setTimeTaken(0);
    };

    // ── FINISHED SCREEN ──────────────────────────────────
    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Practice Complete</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>{msg}</h2>

                <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 8 }}>{score} / {questions.length}</div>
                <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600, marginBottom: 24 }}>Score: {pct}%</div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
                    <div style={{ background: `${color}10`, color, padding: '6px 16px', borderRadius: 50, fontSize: 13, fontWeight: 800 }}>
                        ⏱️ Time: {formatTime(timeTaken)}
                    </div>
                </div>

                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px', maxWidth: 500, marginInline: 'auto' }}>
                    {pct >= 70 ? 'You\'re handling these equations well! Great understanding of the concepts.' : 'Review the rules and try again to improve your accuracy.'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="leq-btn-primary" onClick={handleRetry} style={{ background: color, minWidth: 200 }}>
                        🔀 Try Again
                    </button>
                </div>
            </div>
        );
    }

    // ── ACTIVE QUIZ ───────────────────────────────────────
    return (
        <div className="leq-quiz-container">
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className="leq-score-header">
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
                    <div style={{
                        height: '100%',
                        width: `${((current + (finished ? 1 : 0)) / questions.length) * 100}%`,
                        background: color, borderRadius: 10, transition: 'width 0.4s ease'
                    }} />
                </div>
            </div>

            {/* Question card */}
            <div className="leq-quiz-card">
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${color}15`, padding: '4px 12px',
                    borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16
                }}>QUESTION {current + 1}</div>

                <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 20 }}>
                    <LatexText text={q.question} />
                </div>

                <div className="leq-quiz-options-grid">
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a';
                        if (answered) {
                            if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; }
                            else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txtColor = '#ef4444'; }
                        } else if (selected === oi) {
                            border = color; bg = `${color}08`;
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
                                }}
                            >
                                <div style={{
                                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                                    background: answered
                                        ? (oi === q.correct ? '#10b981' : oi === selected ? '#ef4444' : '#f1f5f9')
                                        : (selected === oi ? color : '#f1f5f9'),
                                    transition: 'all 0.2s'
                                }} />
                                <span><LatexText text={opt} /></span>
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div style={{
                        marginTop: 20, padding: '14px 18px', borderRadius: 12,
                        background: `${color}08`, border: `1px solid ${color}20`,
                        color: '#64748b', fontSize: 13.5, lineHeight: 1.6
                    }}>
                        <strong style={{ color }}>💡 Explanation: </strong>
                        <LatexText text={q.explanation} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <button
                    onClick={handleNext}
                    disabled={!answered}
                    style={{
                        padding: '12px 40px',
                        background: answered ? color : '#f1f5f9',
                        color: answered ? '#fff' : '#94a3b8',
                        cursor: answered ? 'pointer' : 'not-allowed',
                        border: 'none', borderRadius: 100,
                        fontSize: 15, fontWeight: 800,
                        boxShadow: answered ? `0 8px 20px ${color}40` : 'none',
                        transition: 'all 0.2s',
                        fontFamily: 'Open Sans, sans-serif'
                    }}
                >
                    {current + 1 >= questions.length ? '🏁 See Final Score' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
