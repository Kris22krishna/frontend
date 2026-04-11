import React, { useState, useEffect } from 'react';
import styles from '../../../coordinate_geometry_9.module.css';
import { LatexText } from '../../../../../../LatexText';
import CGSvgGraph from './CGSvgGraph';

// Fisher-Yates sample
function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

export default function CGPracticeEngine({ questionPool, sampleSize = 20, title, color, onBack, skillId }) {
    const [questions, setQuestions] = useState(() => sample(questionPool, sampleSize));
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);       // for mcq
    const [userPoint, setUserPoint] = useState(null);     // for plot
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [plotCorrect, setPlotCorrect] = useState(false);
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
    const isMCQ = q.type === 'mcq' || q.type === 'mcq_graph';
    const isPlot = q.type === 'plot';
    const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.correct) setScore((s) => s + 1);
    };

    const handlePlotSubmit = () => {
        if (answered || !userPoint) return;
        const correct = userPoint.x === q.correctPoint.x && userPoint.y === q.correctPoint.y;
        setPlotCorrect(correct);
        setAnswered(true);
        if (correct) setScore((s) => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) { setFinished(true); }
        else { 
            setCurrent((c) => c + 1); 
            setSelected(null); 
            setUserPoint(null); 
            setAnswered(false); 
            setPlotCorrect(false); 
        }
    };

    const handleRetry = () => {
        setQuestions(sample(questionPool, sampleSize));
        setCurrent(0); setSelected(null); setUserPoint(null); setAnswered(false); setPlotCorrect(false); setScore(0); setFinished(false); setTimeTaken(0);
    };
    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
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
                        <div style={{ fontSize: 15, color: '#64748b', fontWeight: 700 }}>out of {questions.length}</div>
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
        <div className={styles['quiz-container']}>
            <div style={{ marginBottom: 20 }}>
                <div className={styles['score-header']}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Practice</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block', marginBottom: 4 }}>⏱️ {formatTime(timeTaken)}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color }}>{current + 1}</span> / {questions.length}</div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            <div className={styles['quiz-card']}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                    {isPlot ? '📍 INTERACTIVE PLOT' : 'QUESTION'} {current + 1}
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 20, whiteSpace: 'pre-line' }}>
                    <LatexText text={q.question} />
                </div>

                {/* Optional Graph Display for mcq_graph */}
                {q.type === 'mcq_graph' && q.graphPoint && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                        <CGSvgGraph
                            size={Math.min(window.innerWidth - 60, 320)}
                            points={[q.graphPoint]}
                            interactive={false}
                        />
                    </div>
                )}

                {/* ── PLOT TYPE ── */}
                {isPlot && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                        <CGSvgGraph
                            size={Math.min(window.innerWidth - 60, 320)}
                            interactive={!answered}
                            onPlot={(pt) => { if (!answered) setUserPoint(pt); }}
                            userPoint={userPoint}
                        />
                        {!answered ? (
                            <button
                                onClick={handlePlotSubmit}
                                disabled={!userPoint}
                                style={{ padding: '12px 32px', background: color, color: '#fff', border: 'none', borderRadius: 50, fontSize: 15, fontWeight: 800, cursor: !userPoint ? 'not-allowed' : 'pointer', opacity: !userPoint ? 0.5 : 1, fontFamily: 'Open Sans, sans-serif' }}>
                                Submit Placement ✓
                            </button>
                        ) : (
                            <div style={{ width: '100%', padding: '14px 18px', borderRadius: 12, background: plotCorrect ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: `2px solid ${plotCorrect ? '#10b981' : '#ef4444'}`, fontSize: 15, fontWeight: 700, color: plotCorrect ? '#059669' : '#ef4444', textAlign: 'center' }}>
                                {plotCorrect ? `✅ Correct! You perfectly plotted (${q.correctPoint.x}, ${q.correctPoint.y}).` 
                                             : `❌ Incorrect. The correct location was (${q.correctPoint.x}, ${q.correctPoint.y}).`}
                            </div>
                        )}
                    </div>
                )}

                {/* ── MCQ ── */}
                {isMCQ && (
                    <div className={styles['quiz-options']}>
                        {q.options.map((opt, oi) => {
                            let border = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a', dot = '#f1f5f9';
                            if (answered) {
                                if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; dot = '#10b981'; }
                                else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txtColor = '#ef4444'; dot = '#ef4444'; }
                            } else if (selected === oi) { border = color; bg = `${color}05`; dot = color; }
                            return (
                                <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${border}`, background: bg, cursor: answered ? 'default' : 'pointer', fontSize: 15, color: txtColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                                    <span><LatexText text={opt} /></span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {answered && (
                    <div style={{ marginTop: 24, padding: '14px 18px', borderRadius: 12, background: 'rgba(15,76,129,0.05)', border: '1px solid rgba(15,76,129,0.1)', color: '#64748b', fontSize: 14, lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                        <strong style={{ color: '#0f4c81' }}>💡 Explanation: </strong><LatexText text={q.explanation} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <button onClick={handleNext} disabled={!answered}
                    style={{ padding: '12px 40px', background: answered ? color : '#f1f5f9', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: answered ? `0 8px 20px ${color}30` : 'none', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                    {current + 1 >= questions.length ? '🏁 See Final Score' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
