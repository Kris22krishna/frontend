import React, { useState, useEffect } from 'react';
import MathRenderer from '../../../../../../MathRenderer';

export default function QuizEngine({ questions, title, onBack, color }) {
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
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px', fontFamily: 'Outfit, sans-serif' }}>
                <div style={{ marginBottom: 40 }}>
                    <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Outfit, sans-serif' }}>
                        ← Back to Skills
                    </button>
                </div>

                <div style={{ width: 170, height: 170, borderRadius: '50%', background: `conic-gradient(#d97706 ${pct * 3.6}deg, #e2e8f0 0deg)`, margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 150, height: 150, background: '#fdfbf7', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 56, fontWeight: 900, color: '#0f172a', lineHeight: 1, marginBottom: 4 }}>{score}</div>
                        <div style={{ fontSize: 15, color: '#64748b', fontWeight: 700 }}>out of {questionSet.length}</div>
                    </div>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 24px', background: '#f1f5f9', color: '#334155', borderRadius: 50, fontSize: 16, fontWeight: 700, marginBottom: 40 }}>
                    <span style={{ fontSize: 18 }}>⏱️</span> Time Taken: {formatTime(timeTaken)}
                </div>

                <div style={{ fontSize: 60, marginBottom: 16, lineHeight: 1 }}>
                    {pct >= 85 ? '🏆' : pct >= 65 ? '🌟' : '💪'}
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                    {pct >= 85 ? 'Excellent!' : pct >= 65 ? 'Well done!' : 'Keep Learning!'}
                </h2>
                
                <p style={{ color: '#64748b', fontSize: 16, margin: '0 0 32px' }}>
                    {pct >= 85 ? 'You have mastered this skill. Great job!' : 'Review the concepts and try again for 100%.'}
                </p>

                <button onClick={onBack} style={{ padding: '14px 40px', background: '#fff', border: '2px solid #d97706', color: '#d97706', borderRadius: 50, fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s' }}>
                    Back to Skills
                </button>
            </div>
        );
    }

    return (
        <div className="ns-quiz-active ns-quiz-container">
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className="ns-score-header">
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Skill Verification</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color: color, fontWeight: 800, marginBottom: 4, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block' }}>
                            ⏱️ {formatTime(timeTaken)}
                        </div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>
                            Question <span style={{ color: color }}>{current + 1}</span> / {questionSet.length}
                        </div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* Question Card */}
            <div className="ns-quiz-card">
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${color}15`, padding: '4px 12px', borderRadius: 8,
                    fontSize: 12, fontWeight: 800, color: color, marginBottom: 16
                }}>
                    <span>QUESTION</span> {current + 1}
                </div>
                <div className="ns-quiz-question-text" style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 24 }}>
                    {q.image && (
                        <div style={{ marginBottom: 20, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <img src={q.image} alt="Problem Illustration" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    )}
                    <MathRenderer text={q.question} />
                </div>

                {/* Options */}
                <div className="ns-quiz-options">
                    {q.options.map((opt, oi) => {
                        const isCorrect = oi === q.correct;
                        const isWrong = oi === selected && !isCorrect;

                        return (
                            <button
                                key={oi}
                                onClick={() => handleSelect(oi)}
                                disabled={answered}
                                className={`ns-option-btn ${selected === oi ? 'selected' : ''}`}
                                style={{
                                    '--skill-color': color,
                                    borderColor: answered ? (isCorrect ? '#0d9488' : (isWrong ? '#e11d48' : '#f1f5f9')) : (selected === oi ? color : '#f1f5f9'),
                                    background: answered ? (isCorrect ? 'rgba(16,185,129,0.05)' : (isWrong ? 'rgba(239,68,68,0.05)' : '#fff')) : (selected === oi ? `${color}05` : '#fff'),
                                    color: answered ? (isCorrect ? '#0d9488' : (isWrong ? '#e11d48' : '#1e293b')) : (selected === oi ? color : '#1e293b'),
                                    opacity: answered && !isCorrect && !isWrong ? 0.7 : 1
                                }}
                            >
                                <div style={{
                                    width: 10, height: 10, borderRadius: '50%',
                                    background: answered ? (isCorrect ? '#0d9488' : (isWrong ? '#e11d48' : '#f1f5f9')) : (selected === oi ? color : '#f1f5f9'),
                                    flexShrink: 0, transition: 'all 0.2s'
                                }} />
                                <span style={{ fontSize: '1.1rem' }}>
                                    <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') || opt.includes('\\frac') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
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
                        color: '#64748b', fontSize: 13.5, lineHeight: 1.6
                    }}>
                        <strong style={{ color: '#0284c7' }}>💡 Explanation: </strong>
                        <MathRenderer text={q.explanation} />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleNext}
                    disabled={!answered}
                    className="ns-btn-primary"
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
