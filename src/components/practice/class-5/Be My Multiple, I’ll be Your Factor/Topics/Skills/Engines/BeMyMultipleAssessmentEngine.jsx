import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSessionLogger } from '../../../../../../../hooks/useSessionLogger';
import '../../../bemyfactor.css';
import { LatexText } from '@/components/LatexText';

export default function BeMyMultipleAssessmentEngine({ questions: questionPool, sampleSize = 10, title, color, onBack, onSecondaryBack , nodeId}) {
    const [questions] = useState(() => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        return pool.slice(0, sampleSize);
    });
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [timeLeft, setTimeLeft] = useState(questions.length * 60); 
    const [finished, setFinished] = useState(false);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const v4IsFinished = useRef(false);

    const finish = useCallback(() => setFinished(true), []);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { finish(); return; }
        const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
        return () => clearInterval(t);
    }, [finished, timeLeft, finish]);
    useEffect(() => {
        if (!nodeId) return;
        v4IsFinished.current = false;
        startSession({ nodeId, sessionType: 'assessment' });
        return () => { if (!v4IsFinished.current) abandonSession(); };
    }, [nodeId]);

    useEffect(() => {
        if (!finished || !nodeId || v4IsFinished.current) return;
        v4IsFinished.current = true;
        const payload = questions.map((q, i) => ({
            question_index: i,
            answer_json: JSON.stringify({ selected: answers[i] }),
            is_correct: answers[i] === q.correct,
            marks_awarded: answers[i] === q.correct ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0,
        }));
        finishSession({ answers_payload: payload });
    }, [finished]);

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

    // Adaptive layout logic
    const longestOption = q.options.reduce((max, opt) => Math.max(max, opt.length), 0);
    const isOptionLong = longestOption > 25;
    const gridStyle = isOptionLong 
        ? { display: 'grid', gridTemplateColumns: '1fr', gap: 12 } 
        : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 };

    if (finished) {
        const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Progress!' : pct >= 50 ? '👍 Keep Going!' : '💪 More Practice Needed!';

        return (
            <div className="ft-page">
                <div className="ft-content" style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{title} Assessment</div>
                        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
                            Assessment Complete ✅
                        </h2>
                        <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questions.length}</div>
                        <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}% — {msg}</div>
                        
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                             <button className="ft-btn-primary" onClick={() => window.location.reload()} style={{ background: color }}>Retake</button>
                             <button className="ft-btn-secondary" onClick={onBack}>Back to Skills</button>
                             {onSecondaryBack && <button className="ft-btn-secondary" onClick={onSecondaryBack}>Chapter Home</button>}
                        </div>
                    </div>

                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>📋 Summary Report</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {questions.map((q, i) => {
                            const userAns = answers[i];
                            const isCorrect = userAns === q.correct;
                            return (
                                <div key={i} style={{
                                    background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)',
                                    borderRadius: 16, padding: '24px',
                                    border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                                        <div style={{ fontSize: 20 }}>{isCorrect ? '✅' : '❌'}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 12, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', textTransform: 'uppercase', marginBottom: 4 }}>Question {i + 1}</div>
                                            <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}><LatexText text={q.question} /></div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
                                        <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 12, padding: '12px 16px' }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 6 }}>Correct Answer</div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}><LatexText text={q.options[q.correct]} /></div>
                                        </div>
                                        <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 12, padding: '12px 16px' }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', textTransform: 'uppercase', marginBottom: 6 }}>Your Answer</div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>
                                                {userAns !== null ? <LatexText text={q.options[userAns]} /> : '— Not Answered —'}
                                            </div>
                                        </div>
                                    </div>
                                    {q.explanation && (
                                        <div style={{ marginTop: 16, fontSize: 14, color: '#64748b', lineHeight: 1.6, background: '#fff', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
                                            <strong style={{ color: '#0369a1' }}>💡 Explanation: </strong><LatexText text={q.explanation} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ft-page">
            <div className="ft-content" style={{ padding: '40px 24px' }}>
                <div className="ft-assessment-layout">
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5 }}>Assessment Mode</div>
                                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                            </div>
                        </div>

                        <div className="ft-quiz-card" style={{ padding: '32px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 800, color, marginBottom: 20 }}>
                                QUESTION {current + 1} OF {questions.length}
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', lineHeight: 1.5, marginBottom: 32 }}>
                                <LatexText text={q.question} />
                            </div>

                            <div style={gridStyle}>
                                {q.options.map((opt, oi) => {
                                    const isSelected = answers[current] === oi;
                                    return (
                                        <button key={oi} onClick={() => handleSelect(oi)}
                                            style={{ 
                                                display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', 
                                                borderRadius: 16, border: `3px solid ${isSelected ? color : 'rgba(0,0,0,0.05)'}`, 
                                                background: isSelected ? `${color}05` : '#fff', 
                                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                                boxShadow: isSelected ? `0 6px 16px ${color}10` : 'none'
                                            }}>
                                            <div style={{ 
                                                width: 14, height: 14, borderRadius: '50%', 
                                                border: `2px solid ${isSelected ? color : '#cbd5e1'}`,
                                                background: isSelected ? color : 'transparent', flexShrink: 0 
                                            }} />
                                            <span style={{ fontSize: 16, fontWeight: isSelected ? 700 : 500, color: isSelected ? color : '#334155' }}>
                                                <LatexText text={opt} />
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
                            <button className="ft-btn-secondary" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
                                style={{ opacity: current === 0 ? 0 : 1, padding: '12px 28px' }}>← Previous</button>
                            {current + 1 === questions.length ? (
                                <button className="ft-btn-primary" onClick={handleSubmit} style={{ background: '#ef4444', padding: '12px 36px' }}>
                                    Submit Assessment
                                </button>
                            ) : (
                                <button className="ft-btn-primary" onClick={() => setCurrent(c => c + 1)} style={{ background: color, padding: '12px 36px' }}>
                                    Next Question →
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="ft-assessment-palette">
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            padding: '16px', borderRadius: 12, marginBottom: 20, fontWeight: 900, fontSize: 20,
                            background: timeLeft < 60 ? 'rgba(239,68,68,0.1)' : `${color}0D`,
                            color: timeLeft < 60 ? '#ef4444' : color,
                            border: `1px solid ${timeLeft < 60 ? 'rgba(239,68,68,0.2)' : 'rgba(0,0,0,0.05)'}`
                        }}>
                            ⏱️ {formatTime(timeLeft)}
                        </div>

                        <div style={{ fontSize: 11, fontWeight: 900, marginBottom: 14, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2 }}>Navigator</div>
                        <div className="ft-palette-grid">
                            {questions.map((_, i) => {
                                const isAnswered = answers[i] !== null;
                                const isCurrent = current === i;
                                return (
                                    <button key={i} onClick={() => setCurrent(i)}
                                        className={`ft-palette-btn ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}`}
                                        style={isAnswered ? (isCurrent ? { background: color, borderColor: '#0f172a' } : { background: color, borderColor: color }) : (isCurrent ? { borderColor: '#0f172a'} : {})}>
                                        {i + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 700, color: '#64748b' }}>
                                <div style={{ width: 12, height: 12, background: color, borderRadius: 3 }} /> Answered
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 700, color: '#64748b' }}>
                                <div style={{ width: 12, height: 12, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 3 }} /> Pending
                            </div>
                        </div>

                        <button onClick={handleSubmit}
                            style={{ background: '#ef4444', width: '100%', padding: '14px', marginTop: 32, fontSize: 14, borderRadius: 12, color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>
                            Submit Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
