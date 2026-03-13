import React, { useState, useEffect } from 'react';
import '../../../fishtale.css';
import MathRenderer from '../../../../../../MathRenderer';

function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

export default function FishTalePracticeEngine({ questionPool, sampleSize = 20, title, color, onBack }) {
    const [questions, setQuestions] = useState(() => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        return sample(pool, sampleSize);
    });
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
    const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) { setFinished(true); }
        else { setCurrent(c => c + 1); setSelected(null); setAnswered(false); }
    };

    const handleRetry = () => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        setQuestions(sample(pool, sampleSize));
        setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); setTimeTaken(0);
    };

    // Adaptive layout logic
    const longestOption = q.options.reduce((max, opt) => Math.max(max, opt.length), 0);
    const isOptionLong = longestOption > 25;
    const gridStyle = isOptionLong 
        ? { display: 'grid', gridTemplateColumns: '1fr', gap: 12 } 
        : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 };

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        return (
            <div style={{ textAlign: 'center', padding: '60px 0', maxWidth: 800, margin: '0 auto' }}>
                <div style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '8px solid #fff'
                }}>
                    <div style={{ width: 100, height: 100, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>of {questions.length}</div>
                    </div>
                </div>
                <div style={{ display: 'inline-block', padding: '6px 16px', background: `${color}15`, color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 16, margin: '0 0 32px' }}>Review your progress and keep diving into the world of large numbers!</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="ft-btn-primary" onClick={handleRetry} style={{ background: color }}>🔀 New Questions</button>
                    <button className="ft-btn-secondary" onClick={onBack}>Return to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
            <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Practice Session</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 15, color, fontWeight: 900, background: `${color}10`, padding: '6px 14px', borderRadius: 10, display: 'inline-block', marginBottom: 6 }}>⏱️ {formatTime(timeTaken)}</div>
                        <div style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>Question <span style={{ color }}>{current + 1}</span> of {questions.length}</div>
                    </div>
                </div>
                <div style={{ background: '#e2e8f0', borderRadius: 10, height: 8, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s cubic-bezier(0.1, 0.7, 1.0, 0.1)' }} />
                </div>
            </div>

            <div className="ft-quiz-card" style={{ padding: '32px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${color}15`, padding: '6px 14px', borderRadius: 10, fontSize: 12, fontWeight: 800, color, marginBottom: 24 }}>
                    QUESTION {current + 1}
                </div>
                <div style={{ fontSize: 19, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 32 }}>
                    <MathRenderer text={q.question} />
                </div>

                <div style={gridStyle}>
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.05)', bg = '#fff', dot = '#cbd5e1', txtColor = '#334155', weight = 500;
                        if (answered) {
                            if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.04)'; dot = '#10b981'; txtColor = '#059669'; weight = 700; }
                            else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.04)'; dot = '#ef4444'; txtColor = '#dc2626'; weight = 700; }
                        } else if (selected === oi) { border = color; bg = `${color}05`; dot = color; weight = 700; }

                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                style={{ 
                                    display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', 
                                    borderRadius: 16, border: `3px solid ${border}`, background: bg, 
                                    cursor: answered ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                    boxShadow: selected === oi && !answered ? `0 8px 20px ${color}15` : 'none'
                                }}>
                                <div style={{ 
                                    width: 14, height: 14, borderRadius: '50%', 
                                    border: `2px solid ${dot}`,
                                    background: selected === oi || (answered && oi === q.correct) ? dot : 'transparent', flexShrink: 0 
                                }} />
                                <span style={{ fontSize: 16, fontWeight: weight, color: txtColor }}>
                                    <MathRenderer text={opt} />
                                </span>
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div style={{ marginTop: 24, padding: '20px', borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', fontSize: 15, lineHeight: 1.6 }}>
                        <strong style={{ color: '#0369a1' }}>💡 Explanation: </strong><MathRenderer text={q.explanation} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                <button onClick={handleNext} disabled={!answered}
                    className="ft-btn-primary"
                    style={{ 
                        padding: '14px 60px', borderRadius: 100, fontSize: 16, background: answered ? color : '#cbd5e1', 
                        cursor: answered ? 'pointer' : 'not-allowed', boxShadow: answered ? `0 10px 25px ${color}30` : 'none'
                    }}>
                    {current + 1 >= questions.length ? 'Finish Session' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
