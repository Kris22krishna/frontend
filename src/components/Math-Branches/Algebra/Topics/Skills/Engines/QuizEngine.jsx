import React, { useState, useEffect } from 'react';
import MathRenderer from '../../../../../MathRenderer';

export default function QuizEngine({ questions, title, onBack, color, prefix = 'alg' }) {
    const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setQuestionSet(typeof questions === 'function' ? questions() : questions);
        setCurrent(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setFinished(false);
    }, [questions]);

    // Timer state for Practice: Starts at 0, counts up
    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        if (finished) return;
        const timer = setInterval(() => {
            setTimeTaken(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [finished]);

    // Format time (MM:SS)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questionSet[current];
    const progress = ((current + (finished ? 1 : 0)) / questionSet.length) * 100;

    const handleSelect = (optIdx) => {
        if (answered) return;
        setSelected(optIdx);
        setAnswered(true);
        if (optIdx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questionSet.length) {
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    if (finished) {
        const pct = Math.round((score / questionSet.length) * 100);
        let msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        let msgSub = pct >= 90 ? 'You have excellent control over this topic!' : 'Review the concepts and try again for 100%.';

        return (
            <div className={`${prefix}-quiz-finished`} style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className={`${prefix}-quiz-score-circle`} style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '8px solid #fff'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: `var(--${prefix}-text)`, lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: `var(--${prefix}-muted)`, fontWeight: 700 }}>out of {questionSet.length}</div>
                    </div>
                </div>

                <div style={{
                    display: 'inline-block', padding: '6px 16px', background: `${color}15`,
                    color: color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16
                }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: `var(--${prefix}-text)`, margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: `var(--${prefix}-muted)`, fontSize: 15, margin: '0 0 32px' }}>{msgSub}</p>
                <div className={`${prefix}-quiz-finished-actions`} style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                        className={`${prefix}-btn-primary`}
                        onClick={() => {
                            if (typeof questions === 'function') { setQuestionSet(questions()); }
                            setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setTimeTaken(0); setFinished(false);
                        }}
                        style={{ padding: '12px 24px', background: color }}
                    >
                        Try Again
                    </button>
                    <button
                        className={`${prefix}-btn-secondary`}
                        onClick={onBack}
                        style={{ padding: '12px 24px' }}
                    >
                        Return to Skills
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${prefix}-quiz-active ${prefix}-quiz-container`}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className={`${prefix}-score-header`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Skill Verification</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: `var(--${prefix}-text, #1e293b)`, margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: 13, color: color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block' }}>
                                ⏱️ {formatTime(timeTaken)}
                            </div>
                            <button
                                onClick={onBack}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    background: '#fee2e2', color: '#ef4444',
                                    border: '1px solid #fca5a5', padding: '4px 12px',
                                    borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                                    cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(239,68,68,0.1)'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.background = '#fecaca'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(239,68,68,0.15)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(239,68,68,0.1)'; }}
                            >
                                ✕ Exit
                            </button>
                        </div>
                        <div style={{ fontSize: 13, color: `var(--${prefix}-muted)`, fontWeight: 700 }}>
                            Question <span style={{ color: color }}>{current + 1}</span> / {questionSet.length}
                        </div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* Question Card */}
            <div className={`${prefix}-quiz-card`}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${color}15`, padding: '4px 12px', borderRadius: 8,
                    fontSize: 12, fontWeight: 800, color: color, marginBottom: 16
                }}>
                    <span>QUESTION</span> {current + 1}
                </div>
                <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 18, fontWeight: 600, color: `var(--${prefix}-text, #1e293b)`, lineHeight: 1.6, marginBottom: 24 }}>
                    {q.image && (
                        <div style={{ marginBottom: 20, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <img src={q.image} alt="Problem Illustration" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    )}
                    {q.svg && (
                        <div style={{ marginBottom: 20, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />
                    )}
                    <MathRenderer text={q.question} />
                </div>

                {/* Options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {q.options.map((opt, oi) => {
                        let borderColor = 'rgba(0,0,0,0.04)';
                        let bgColor = '#fff';
                        let textColor = `var(--${prefix}-text)`;
                        let dotColor = '#f1f5f9';

                        if (answered) {
                            if (oi === q.correct) {
                                borderColor = `var(--${prefix}-teal)`;
                                bgColor = 'rgba(16,185,129,0.05)';
                                textColor = `var(--${prefix}-teal)`;
                                dotColor = `var(--${prefix}-teal)`;
                            }
                            else if (oi === selected) {
                                borderColor = `var(--${prefix}-red)`;
                                bgColor = 'rgba(239,68,68,0.05)';
                                textColor = `var(--${prefix}-red)`;
                                dotColor = `var(--${prefix}-red)`;
                            }
                        } else if (selected === oi) {
                            borderColor = color;
                            bgColor = `${color}05`;
                            dotColor = color;
                        }

                        return (
                            <button
                                key={oi}
                                onClick={() => handleSelect(oi)}
                                disabled={answered}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 16px', borderRadius: 12,
                                    border: `2.5px solid ${borderColor}`,
                                    background: bgColor, cursor: answered ? 'default' : 'pointer',
                                    fontSize: 15, color: textColor, textAlign: 'left',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: selected === oi ? 700 : 500,
                                    boxShadow: selected === oi && !answered ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >
                                <div style={{
                                    width: 10, height: 10, borderRadius: '50%', background: dotColor, flexShrink: 0,
                                    transition: 'all 0.2s'
                                }} />
                                <span style={{ fontSize: '1.1rem' }}>
                                    <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {answered && (
                    <div style={{
                        marginTop: 24, padding: '16px 20px', borderRadius: 12,
                        background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)',
                        color: `var(--${prefix}-muted)`, fontSize: 13.5, lineHeight: 1.6
                    }}>
                        <strong style={{ color: `var(--${prefix}-blue)` }}>💡 Explanation: </strong>
                        <MathRenderer text={q.explanation} />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleNext}
                    disabled={!answered}
                    className={`${prefix}-btn-primary`}
                    style={{
                        padding: '12px 40px',
                        background: answered ? color : '#f1f5f9',
                        color: answered ? '#fff' : '#94a3b8',
                        cursor: answered ? 'pointer' : 'not-allowed',
                        border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800,
                        boxShadow: answered ? `0 8px 20px ${color}30` : 'none'
                    }}
                >
                    {current + 1 >= questionSet.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}
