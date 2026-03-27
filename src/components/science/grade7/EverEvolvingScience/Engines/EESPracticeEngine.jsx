import React, { useState, useEffect } from 'react';
import MathRenderer from '../../../../MathRenderer';
import styles from '../everevolvingscience.module.css';

// ── Shuffle helper ─────────────────────────────────────────────────────────
function shuffle(arr) {
    const c = [...arr];
    for (let i = c.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
}

export default function EESPracticeEngine({ questionPool, sampleSize = 20, title, color, onBack }) {
    const safePool = Array.isArray(questionPool) ? questionPool : [];
    const [questions, setQuestions] = useState(() => shuffle(safePool).slice(0, sampleSize));
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questions[current];
    const isTF = q?.type === 'truefalse';
    const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.correct) setScore((s) => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrent((c) => c + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    const handleRetry = () => {
        setQuestions(shuffle(safePool).slice(0, sampleSize));
        setCurrent(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setFinished(false);
        setTimeTaken(0);
    };

    // ── Finished screen ────────────────────────────────────────────────────
    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? 'Mastered!' : pct >= 75 ? 'Great Job!' : pct >= 50 ? 'Keep it up!' : 'Keep Learning!';
        const sub = pct >= 75 ? 'Excellent understanding!' : 'Review the concepts and try again.';
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
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
                    Time Taken: {formatTime(timeTaken)}
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px' }}>{sub}</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className={styles['wws-btn-primary']} onClick={handleRetry} style={{ background: color }}>New Questions</button>
                    <button className={styles['wws-btn-secondary']} onClick={onBack}>Return to Concepts</button>
                </div>
            </div>
        );
    }

    if (!q) return null;

    // ── Main render ────────────────────────────────────────────────────────
    return (
        <div className={styles['wws-quiz-container']}>
            {/* Progress bar header */}
            <div style={{ marginBottom: 20 }}>
                <div className={styles['wws-score-header']}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Practice</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block', marginBottom: 4 }}>{formatTime(timeTaken)}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color }}>{current + 1}</span> / {questions.length}</div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            <div className={styles['wws-quiz-card']}>
                {/* Question type badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 14 }}>
                    {q.type === 'truefalse' ? 'TRUE OR FALSE' : 'QUESTION'} {current + 1}
                </div>

                {/* Question text */}
                <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 18, whiteSpace: 'pre-line' }}>
                    <MathRenderer text={q.question} />
                </div>

                {/* Options */}
                <div className={styles['wws-quiz-options']}>
                    {(q.options || []).map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a', dot = '#f1f5f9';
                        if (answered) {
                            if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; dot = '#10b981'; }
                            else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txtColor = '#ef4444'; dot = '#ef4444'; }
                        } else if (selected === oi) {
                            border = color; bg = `${color}05`; dot = color;
                        }
                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: isTF ? '16px' : '12px 14px', borderRadius: 12,
                                    border: `2.5px solid ${border}`, background: bg,
                                    cursor: answered ? 'default' : 'pointer',
                                    fontSize: 14, color: txtColor, textAlign: 'left',
                                    transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500,
                                    justifyContent: isTF ? 'center' : 'flex-start',
                                    fontFamily: 'Open Sans, sans-serif', width: '100%'
                                }}>
                                {!isTF && <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />}
                                <span><MathRenderer text={opt} /></span>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {answered && q.explanation && (
                    <div style={{ marginTop: 20, padding: '14px 18px', borderRadius: 12, background: 'rgba(217,119,6,0.05)', border: '1px solid rgba(217,119,6,0.1)', color: '#64748b', fontSize: 13.5, lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                        <strong style={{ color }}>Explanation: </strong>
                        <MathRenderer text={q.explanation} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <button onClick={handleNext} disabled={!answered}
                    style={{ padding: '12px 40px', background: answered ? color : '#f1f5f9', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: answered ? `0 8px 20px ${color}30` : 'none', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                    {current + 1 >= questions.length ? 'See Final Score' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
