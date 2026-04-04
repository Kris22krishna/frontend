import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../../../proportions.css';
import { useSessionLogger } from '@/hooks/useSessionLogger';

function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

// Receives: questionPool, sampleSize (default 10), title, color, onBack
export default function ProportionsAssessmentEngine({ questionPool, sampleSize = 10, title, color, onBack, nodeId }) {
    const { startSession, finishSession } = useSessionLogger();
    const isFinishedRef = useRef(false);

    const [questions] = useState(() => sample(questionPool, sampleSize));
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(sampleSize).fill(null));
    const [timeLeft, setTimeLeft] = useState(600); // 10-minute countdown
    const [finished, setFinished] = useState(false);

    const finish = useCallback(() => setFinished(true), []);

    useEffect(() => {
        if (!nodeId) return;
        startSession({ nodeId, sessionType: 'assessment' });
    }, [nodeId]);

    useEffect(() => {
        if (!finished || !nodeId || isFinishedRef.current) return;
        isFinishedRef.current = true;
        const payload = questions.map((q, i) => ({
            question_index: i,
            answer_json: { selected: answers[i] ?? null, correct_answer: q.correct ?? null },
            is_correct: answers[i] === q.correct,
            marks_awarded: answers[i] === q.correct ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0,
        }));
        finishSession({ answers_payload: payload });
    }, [finished]);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { finish(); return; }
        const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
        return () => clearInterval(t);
    }, [finished, timeLeft, finish]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSelect = (optIdx) => {
        if (finished) return;
        const next = [...answers];
        next[current] = optIdx;
        setAnswers(next);
    };

    const handleSubmit = () => {
        if (answers.includes(null)) {
            if (!window.confirm('You have unanswered questions. Submit anyway?')) return;
        }
        finish();
    };

    const q = questions[current];

    // ── RESULTS SCREEN ────────────────────────────────────────────────────────
    if (finished) {
        const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Excellent!' : pct >= 75 ? '🌟 Great Work!' : pct >= 50 ? '👍 Good Effort!' : '💪 Keep Practicing!';

        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px' }}>
                {/* Score header */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{title}</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
                        Assessment Complete ✅
                    </h2>
                    <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questions.length}</div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}% — {msg}</div>
                </div>

                {/* Answer review */}
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>📋 Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questions.map((q, i) => {
                        const userAns = answers[i];
                        const isCorrect = userAns === q.correct;
                        return (
                            <div key={i} style={{
                                background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)',
                                borderRadius: 16, padding: '20px 24px',
                                border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                            }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{ fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444' }}>
                                        {isCorrect ? '✅' : '❌'} Question {i + 1}
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.55 }}>{q.question}</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                                    <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>Correct Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{q.options[q.correct]}</div>
                                    </div>
                                    <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444', textTransform: 'uppercase', marginBottom: 4 }}>Your Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                                            {userAns !== null ? q.options[userAns] : '— Not Answered —'}
                                        </div>
                                    </div>
                                </div>
                                {q.explanation && (
                                    <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', lineHeight: 1.6, background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: 8 }}>
                                        <strong style={{ color: '#0369a1' }}>💡 </strong>{q.explanation}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ── ACTIVE ASSESSMENT ─────────────────────────────────────────────────────
    return (
        <div className="prop-assessment-layout">
            {/* ── LEFT Question Panel ──────────────────── */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{title}</div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="prop-quiz-card">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                        QUESTION {current + 1} OF {questions.length}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 20 }}>{q.question}</div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                        {q.options.map((opt, oi) => {
                            const isSelected = answers[current] === oi;
                            return (
                                <button key={oi} onClick={() => handleSelect(oi)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.06)'}`, background: isSelected ? `${color}06` : '#fff', cursor: 'pointer', fontSize: 15, color: isSelected ? color : '#0f172a', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: isSelected ? color : '#f1f5f9', flexShrink: 0 }} />
                                    <span>{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <button className="prop-btn-secondary" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
                        style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>
                    {current + 1 === questions.length ? (
                        <button className="prop-btn-primary" onClick={handleSubmit} style={{ background: '#ef4444' }}>
                            Submit Assessment
                        </button>
                    ) : (
                        <button className="prop-btn-primary" onClick={() => setCurrent(c => c + 1)} style={{ background: color }}>
                            Next →
                        </button>
                    )}
                </div>
            </div>

            {/* ── RIGHT Sidebar ─────────────────────────── */}
            <div className="prop-assessment-palette">
                {/* Timer */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px', borderRadius: 12, marginBottom: 20, fontWeight: 800, fontSize: 18,
                    background: timeLeft < 60 ? 'rgba(239,68,68,0.1)' : `${color}0D`,
                    color: timeLeft < 60 ? '#ef4444' : color
                }}>
                    ⏱️ {formatTime(timeLeft)}
                </div>

                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.5 }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                    {questions.map((_, i) => {
                        const isAnswered = answers[i] !== null;
                        const isCurrent = current === i;
                        return (
                            <button key={i} onClick={() => setCurrent(i)}
                                style={{
                                    aspectRatio: '1/1', borderRadius: 8, fontSize: 13, fontWeight: 700,
                                    background: isAnswered ? color : '#f1f5f9',
                                    color: isAnswered ? '#fff' : '#64748b',
                                    border: isCurrent ? `3px solid #0f172a` : '1px solid #e2e8f0',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}>
                                {i + 1}
                            </button>
                        );
                    })}
                </div>

                <div style={{ marginTop: 20, fontSize: 12, color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 10, height: 10, background: color, borderRadius: 3 }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 10, height: 10, background: '#f1f5f9', borderRadius: 3, border: '1px solid #e2e8f0' }} /> Pending
                    </div>
                </div>

                <button className="prop-btn-primary" onClick={handleSubmit}
                    style={{ background: '#ef4444', width: '100%', padding: '12px', marginTop: 24, fontSize: 13, boxShadow: 'none' }}>
                    Finish Now
                </button>
            </div>
        </div>
    );
}
