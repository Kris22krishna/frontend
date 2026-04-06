import React, { useState, useEffect, useRef } from 'react';
import { useSessionLogger } from '@/hooks/useSessionLogger';

// Receives: questionPool (full array), sampleSize (default 10), title, color, onBack
export default function GraphsAssessmentEngine({ questionPool, sampleSize = 10, title, color, onBack, nodeId }) {
    const { startSession, finishSession } = useSessionLogger();
    const isFinishedRef = useRef(false);

    const [questions, setQuestions] = useState(() => sample(questionPool, sampleSize));
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(sampleSize).fill(null));
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(sampleSize * 60); // 1 min per question
    const topRef = useRef(null);

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

    // Reset when new pool comes in
    useEffect(() => {
        const qs = sample(questionPool, sampleSize);
        setQuestions(qs);
        setCurrent(0);
        setAnswers(Array(sampleSize).fill(null));
        setFinished(false);
        setTimeLeft(sampleSize * 60);
    }, [questionPool, sampleSize]);

    // Scroll to top when question changes
    useEffect(() => {
        if (topRef.current) {
            const y = topRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [current]);

    // Countdown timer
    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { setFinished(true); return; }
        const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, finished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questions[current];

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
        setFinished(true);
    };

    const handleRetry = () => {
        isFinishedRef.current = false;
        const qs = sample(questionPool, sampleSize);
        setQuestions(qs);
        setCurrent(0);
        setAnswers(Array(sampleSize).fill(null));
        setFinished(false);
        setTimeLeft(sampleSize * 60);
        if (nodeId) startSession({ nodeId, sessionType: 'assessment' });
    };

    // ── FINISHED / SUMMARY SCREEN ─────────────────────────────────────────────
    if (finished) {
        let score = 0;
        answers.forEach((a, i) => { if (a === questions[i].correct) score++; });
        const pct = Math.round((score / questions.length) * 100);

        return (
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '20px' }}>
                {/* Score header */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Assessment Complete ✅
                    </h2>
                    <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questions.length}</div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}%</div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
                        <button className="grph-btn-primary" onClick={handleRetry} style={{ background: color }}>🔀 New Assessment</button>
                        <button className="grph-btn-secondary" onClick={onBack}>Return to Skills</button>
                    </div>
                </div>

                {/* Summary report */}
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>📋 Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {questions.map((qs, i) => {
                        const isCorrect = answers[i] === qs.correct;
                        return (
                            <div key={i} style={{
                                padding: '18px 20px', borderRadius: 14,
                                border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                                background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)'
                            }}>
                                <div style={{ fontWeight: 800, marginBottom: 6, color: isCorrect ? '#059669' : '#ef4444' }}>
                                    {isCorrect ? '✅' : '❌'} Question {i + 1}
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>{qs.question}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>Correct Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{qs.options[qs.correct]}</div>
                                    </div>
                                    <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444', textTransform: 'uppercase', marginBottom: 4 }}>Your Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                                            {answers[i] !== null ? qs.options[answers[i]] : '— Not Answered —'}
                                        </div>
                                    </div>
                                </div>
                                {qs.explanation && (
                                    <div style={{ marginTop: 10, fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                                        <strong style={{ color: '#0369a1' }}>💡 </strong>{qs.explanation}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ── ACTIVE ASSESSMENT ──────────────────────────────────────────────────────
    return (
        <div className="grph-assessment-layout" ref={topRef}>
            {/* ── LEFT: Main Question Panel ──────────────────── */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div className="grph-score-header">
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                </div>

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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                        {q.options.map((opt, oi) => {
                            const isSelected = answers[current] === oi;
                            return (
                                <button
                                    key={oi}
                                    onClick={() => handleSelect(oi)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '14px 16px', borderRadius: 12,
                                        border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.06)'}`,
                                        background: isSelected ? `${color}06` : '#fff',
                                        cursor: 'pointer', fontSize: 15, color: '#0f172a', textAlign: 'left',
                                        transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500
                                    }}
                                >
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: isSelected ? color : '#f1f5f9', flexShrink: 0 }} />
                                    <span>{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Prev / Next */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <button
                        onClick={() => setCurrent(c => c - 1)}
                        disabled={current === 0}
                        className="grph-btn-secondary"
                        style={{ visibility: current === 0 ? 'hidden' : 'visible' }}
                    >← Previous</button>
                    {current + 1 === questions.length ? (
                        <button onClick={handleSubmit} className="grph-btn-primary" style={{ background: '#ef4444', border: 'none', color: '#fff' }}>
                            Submit Assessment
                        </button>
                    ) : (
                        <button onClick={() => setCurrent(c => c + 1)} className="grph-btn-primary" style={{ background: color, border: 'none', color: '#fff' }}>
                            Next →
                        </button>
                    )}
                </div>
            </div>

            {/* ── RIGHT: Palette Sidebar ─────────────────────── */}
            <div className="grph-assessment-palette">
                {/* Timer */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px', borderRadius: 12, marginBottom: 20, fontWeight: 800, fontSize: 20,
                    background: timeLeft < 60 ? 'rgba(239,68,68,0.1)' : `${color}0D`,
                    color: timeLeft < 60 ? '#ef4444' : color
                }}>
                    ⏱️ {formatTime(timeLeft)}
                </div>

                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: '#0f172a' }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                    {questions.map((_, i) => {
                        const isAnswered = answers[i] !== null;
                        const isCurrent = current === i;
                        return (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                style={{
                                    aspectRatio: '1/1', borderRadius: 8, fontSize: 13, fontWeight: 700,
                                    background: isAnswered ? color : '#f1f5f9',
                                    color: isAnswered ? '#fff' : '#64748b',
                                    border: isCurrent ? `3px solid #0f172a` : 'none',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >{i + 1}</button>
                        );
                    })}
                </div>

                <div style={{ marginTop: 16, fontSize: 12, color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 12, height: 12, background: color, borderRadius: 3 }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 12, height: 12, background: '#f1f5f9', borderRadius: 3 }} /> Not Answered
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    style={{
                        marginTop: 20, width: '100%', padding: '12px',
                        background: '#ef4444', color: '#fff', border: 'none',
                        borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14
                    }}
                >Submit Assessment</button>
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
