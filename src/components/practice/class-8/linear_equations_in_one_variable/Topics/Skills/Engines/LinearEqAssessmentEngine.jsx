import React, { useState, useEffect, useRef } from 'react';
import { LatexText } from '../../../../../../LatexText';
import { useSessionLogger } from '@/hooks/useSessionLogger';

function sample(arr, n) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
}

const PALETTE_STATUS = { unanswered: '#e2e8f0', correct: '#10b981', wrong: '#ef4444', skipped: '#f59e0b' };

/**
 * LinearEqAssessmentEngine
 * Props: questionPool, title, color, onBack, questionCount (default 10), nodeId
 */
export default function LinearEqAssessmentEngine({ questionPool, title, color = '#7c3aed', onBack, questionCount = 10, nodeId }) {
    const [questions] = useState(() => sample(questionPool, questionCount));
    const [current, setCurrent] = useState(0);
    const [responses, setResponses] = useState(Array(questionCount).fill(null)); // selected option index or null
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10-minute countdown
    const [timeTaken, setTimeTaken] = useState(0);

    // v4 Logging
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const answersPayload = useRef([]);

    useEffect(() => {
        if (nodeId) {
            startSession(nodeId, 'assessment');
            answersPayload.current = Array(questions.length).fill(null);
        }
    }, [nodeId, questions]);

    // Countdown timer
    useEffect(() => {
        if (submitted) return;
        const t = setInterval(() => {
            setTimeLeft(s => {
                if (s <= 1) { clearInterval(t); setSubmitted(true); return 0; }
                return s - 1;
            });
            setTimeTaken(s => s + 1);
        }, 1000);
        return () => clearInterval(t);
    }, [submitted]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60), s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questions[current];

    const handleSelect = async (idx) => {
        if (submitted) return;
        const newResp = [...responses];
        newResp[current] = idx;
        setResponses(newResp);

        // v4 Log
        const answerData = {
            question: q.question,
            selectedAnswer: q.options[idx],
            correctAnswer: q.options[q.correct],
            isCorrect: idx === q.correct,
            timeSpent: 0
        };
        answersPayload.current[current] = answerData;
        await logAnswer(answerData);
    };

    const handleJump = (i) => setCurrent(i);
    const handleNext = () => { if (current + 1 < questionCount) setCurrent(c => c + 1); };
    const handlePrev = () => { if (current > 0) setCurrent(c => c - 1); };
    const handleFinalSubmit = async () => {
        // v4 Finish
        const finalPayload = answersPayload.current.filter(Boolean);
        await finishSession(finalPayload);
        setSubmitted(true);
    };

    // Score
    const score = questions.reduce((acc, q, i) => acc + (responses[i] === q.correct ? 1 : 0), 0);
    const pct = submitted ? Math.round((score / questionCount) * 100) : 0;

    // ── RESULTS SCREEN ───────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px' }}>
                {/* Summary header */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{title} — Assessment</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
                        Assessment Complete ✅
                    </h2>
                    <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questionCount}</div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}% — {pct >= 90 ? '🏆 Outstanding!' : pct >= 70 ? '🌟 Well Done!' : pct >= 50 ? '👍 Good Effort!' : '💪 Keep Practising!'}</div>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                        <span style={{ background: '#f0fdf4', color: '#059669', padding: '6px 16px', borderRadius: 50, fontSize: 13, fontWeight: 800 }}>
                            ✅ Correct: {score}
                        </span>
                        <span style={{ background: '#fef2f2', color: '#ef4444', padding: '6px 16px', borderRadius: 50, fontSize: 13, fontWeight: 800 }}>
                            ❌ Wrong: {questionCount - score}
                        </span>
                        <span style={{ background: `${color}15`, color, padding: '6px 16px', borderRadius: 50, fontSize: 13, fontWeight: 800 }}>
                            ⏱️ {formatTime(timeTaken)}
                        </span>
                    </div>
                </div>

                {/* Per-question review */}
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, marginBottom: 16, color: '#0f172a' }}>
                        Question Review
                    </h3>
                    {questions.map((ques, qi) => {
                        const isCorrect = responses[qi] === ques.correct;
                        const resp = responses[qi];
                        return (
                            <div key={qi} style={{
                                background: '#fff', border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                                borderRadius: 16, padding: '20px 24px', marginBottom: 16,
                                boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2 }}>
                                        Q{qi + 1}
                                    </div>
                                    <span style={{
                                        padding: '3px 12px', borderRadius: 50, fontSize: 12, fontWeight: 800,
                                        background: isCorrect ? '#f0fdf4' : '#fef2f2',
                                        color: isCorrect ? '#059669' : '#ef4444'
                                    }}>
                                        {isCorrect ? '✅ Correct' : '❌ Wrong'}
                                    </span>
                                </div>

                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 14, lineHeight: 1.5 }}>
                                    <LatexText text={ques.question} />
                                </div>

                                {/* Options */}
                                {ques.options.map((opt, oi) => {
                                    let bg = '#f8fafc', border = '#e2e8f0', col = '#64748b';
                                    if (oi === ques.correct) { bg = '#f0fdf4'; border = '#10b981'; col = '#059669'; }
                                    else if (oi === resp && !isCorrect) { bg = '#fef2f2'; border = '#ef4444'; col = '#ef4444'; }
                                    return (
                                        <div key={oi} style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            padding: '10px 14px', borderRadius: 10,
                                            border: `1.5px solid ${border}`, background: bg,
                                            marginBottom: 8, fontSize: 14, color: col, fontWeight: oi === ques.correct ? 700 : 400
                                        }}>
                                            <span>{oi === ques.correct ? '✓' : oi === resp ? '✗' : '·'}</span>
                                            <LatexText text={opt} />
                                        </div>
                                    );
                                })}

                                <div style={{
                                    marginTop: 12, padding: '12px 16px', borderRadius: 10,
                                    background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.1)',
                                    fontSize: 13, color: '#64748b', lineHeight: 1.6
                                }}>
                                    <strong style={{ color }}>💡 </strong>
                                    <LatexText text={ques.explanation} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ── ACTIVE ASSESSMENT ────────────────────────────────────────────────────
    const isSelected = responses[current] !== null;

    return (
        <div className="leq-assessment-layout">
            {/* ── MAIN QUESTION AREA ── */}
            <div style={{ flex: 1 }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{title}</div>
                    </div>
                </div>

                {/* Question card */}
                <div className="leq-quiz-card">
                    <div style={{
                        display: 'inline-flex', gap: 6, alignItems: 'center',
                        background: `${color}12`, padding: '4px 14px',
                        borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16
                    }}>QUESTION {current + 1} OF {questionCount}</div>

                    <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 24 }}>
                        <LatexText text={q.question} />
                    </div>

                    <div className="leq-quiz-options-grid">
                        {q.options.map((opt, oi) => {
                            const isChosen = responses[current] === oi;
                            let border = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a';

                            if (isChosen) {
                                border = color; bg = `${color}08`; txtColor = color;
                            }
                            return (
                                <button
                                    key={oi}
                                    onClick={() => handleSelect(oi)}
                                    disabled={submitted}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '14px 16px', borderRadius: 12,
                                        border: `2.5px solid ${border}`,
                                        background: bg, cursor: 'pointer',
                                        fontSize: 15, color: txtColor, textAlign: 'left',
                                        transition: 'all 0.2s', fontWeight: isChosen ? 700 : 400,
                                        fontFamily: 'Open Sans',
                                    }}
                                >
                                    <div style={{
                                        width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                                        background: isChosen ? color : '#f1f5f9',
                                    }} />
                                    <LatexText text={opt} />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <button className="leq-btn-secondary" onClick={handlePrev} disabled={current === 0}
                        style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>
                    {current + 1 === questionCount ? (
                        <button className="leq-btn-primary" onClick={handleFinalSubmit} style={{ background: '#ef4444' }}>
                            Finish Assessment
                        </button>
                    ) : (
                        <button className="leq-btn-primary" onClick={handleNext} style={{ background: color }}>
                            Next Question →
                        </button>
                    )}
                </div>
            </div>

            {/* ── RIGHT PALETTE ── */}
            <div className="leq-assessment-palette">
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 800, color, marginBottom: 12 }}>
                    {title}
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, fontWeight: 600 }}>
                    {responses.filter(r => r !== null).length} / {questionCount} answered
                </div>

                {/* Countdown */}
                <div style={{
                    padding: '8px 0', marginBottom: 16, textAlign: 'center',
                    fontSize: 22, fontWeight: 900, fontFamily: 'Outfit, sans-serif',
                    color: timeLeft < 60 ? '#ef4444' : color
                }}>
                    ⏱️ {formatTime(timeLeft)}
                </div>

                {/* Question palette */}
                <div className="leq-palette-grid">
                    {questions.map((_, i) => {
                        const isAnswered = responses[i] !== null;
                        return (
                            <button
                                key={i}
                                onClick={() => handleJump(i)}
                                style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    background: current === i ? color : (isAnswered ? color : PALETTE_STATUS.unanswered),
                                    color: current === i || isAnswered ? '#fff' : '#64748b',
                                    border: current === i ? `2px solid #0f172a` : '1.5px solid rgba(0,0,0,0.08)',
                                    fontSize: 13, fontWeight: 800,
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    opacity: isAnswered || current === i ? 1 : 0.6
                                }}
                            >{i + 1}</button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                        { color: color, label: 'Answered' },
                        { color: PALETTE_STATUS.unanswered, label: 'Not visited' },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#64748b' }}>
                            <div style={{ width: 12, height: 12, borderRadius: 4, background: item.color, flexShrink: 0 }} />
                            {item.label}
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleFinalSubmit}
                    className="leq-btn-primary"
                    style={{
                        marginTop: 24, width: '100%', padding: '12px',
                        background: '#ef4444', fontSize: 13, boxShadow: 'none'
                    }}
                >
                    Finish Now
                </button>
            </div>
        </div>
    );
}
