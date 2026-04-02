import React, { useState, useEffect, useCallback } from 'react';
import { LatexText } from '@/components/LatexText';
import styles from '../../../understanding_quadrilaterals.module.css';

function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function interleaved(pool, n) {
    const charted = shuffle(pool.filter((q) => q.chart));
    const plain = shuffle(pool.filter((q) => !q.chart));
    const result = [];
    let ci = 0;
    let pi = 0;

    while (result.length < n && (ci < charted.length || pi < plain.length)) {
        if (ci < charted.length && (result.length === 0 || result.length % 3 === 2)) {
            result.push(charted[ci++]);
        } else if (pi < plain.length) {
            result.push(plain[pi++]);
        } else {
            result.push(charted[ci++]);
        }
    }

    return result.slice(0, n);
}

export default function UnderstandingQuadrilateralsAssessmentEngine({ questionPool, sampleSize = 10, title, color, onBack }) {
    const safeQuestionPool = Array.isArray(questionPool) ? questionPool : [];
    const [questions] = useState(() => {
        const validQuestion = (q) =>
            Array.isArray(q?.options) && q.options.length > 0 &&
            Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length;
        const allowedType = (q) => !q.type || q.type === 'mcq' || q.type === 'multiStep' || q.type === 'truefalse';
        const mcqOnly = safeQuestionPool.filter((q) => allowedType(q) && validQuestion(q));
        const source = mcqOnly.length ? mcqOnly : safeQuestionPool.filter(validQuestion);
        return interleaved(source, Math.min(sampleSize, source.length));
    });
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [reviewed, setReviewed] = useState(Array(questions.length).fill(false));
    const [timeLeft, setTimeLeft] = useState(600);
    const [finished, setFinished] = useState(false);

    const finish = useCallback(() => setFinished(true), []);

    const toggleReview = () => {
        const next = [...reviewed];
        next[current] = !next[current];
        setReviewed(next);
    };

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { finish(); return; }
        const timer = setInterval(() => setTimeLeft((s) => s - 1), 1000);
        return () => clearInterval(timer);
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
        if (answers.slice(0, questions.length).includes(null)) {
            if (!window.confirm('You have unanswered questions. Submit anyway?')) return;
        }
        finish();
    };

    const q = questions[current] || null;
    const isTF = q && q.type === 'truefalse';
    const hasChart = !!(q?.chart);

    if (!questions.length) {
        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#1e293b', margin: '0 0 10px' }}>
                    No Assessment Questions Available
                </h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 20px' }}>
                    This skill currently has no valid multiple-choice questions for assessment.
                </p>
                <button className={styles['ccr-btn-secondary']} onClick={onBack}>Back to Skills</button>
            </div>
        );
    }

    if (finished) {
        const score = questions.reduce((acc, item, i) => acc + (answers[i] === item.correct ? 1 : 0), 0);
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? 'Excellent!' : pct >= 75 ? 'Great Work!' : pct >= 50 ? 'Good Effort!' : 'Keep Practicing!';

        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{title} — Assessment</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#1e293b', margin: '0 0 16px' }}>
                        Assessment Complete
                    </h2>
                    <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questions.length}</div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}% — {msg}</div>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', marginBottom: 16 }}>Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questions.map((item, i) => {
                        const userAns = answers[i];
                        const isCorrect = userAns === item.correct;
                        return (
                            <div
                                key={i}
                                style={{ background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)', borderRadius: 16, padding: '20px 24px', border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
                            >
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{ fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444', flexShrink: 0 }}>
                                        {isCorrect ? 'Correct' : 'Wrong'} Q{i + 1}
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                                        <LatexText text={item.question} />
                                    </div>
                                </div>

                                <div className={styles['ccr-quiz-options']}>
                                    <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>Correct Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}><LatexText text={item.options[item.correct]} /></div>
                                    </div>
                                    <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444', textTransform: 'uppercase', marginBottom: 4 }}>Your Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>
                                            {userAns !== null ? <LatexText text={item.options[userAns]} /> : '— Not Answered —'}
                                        </div>
                                    </div>
                                </div>

                                {item.explanation && (
                                    <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', lineHeight: 1.6, background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: 8, whiteSpace: 'pre-line' }}>
                                        <strong style={{ color }}>Explanation: </strong><LatexText text={item.explanation} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <button className={styles['ccr-btn-secondary']} onClick={onBack}>← Back to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['ccr-assessment-layout']}>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#1e293b' }}>{title}</div>
                    </div>
                    <button className={styles['ccr-btn-exit']} onClick={onBack}>
                        <span>✕</span> Exit
                    </button>
                </div>

                <div className={styles['ccr-quiz-card']}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 14 }}>
                        QUESTION {current + 1} OF {questions.length}
                    </div>

                    <div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', lineHeight: 1.65, marginBottom: 18, whiteSpace: 'pre-line' }}>
                        <LatexText text={q?.question || ''} />
                    </div>

                    {hasChart ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
                            <div>
                                <div className={styles['ccr-quiz-options']}>
                                    {(q?.options || []).map((opt, oi) => {
                                        const isSelected = answers[current] === oi;
                                        return (
                                            <button
                                                key={oi}
                                                onClick={() => handleSelect(oi)}
                                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.06)'}`, background: isSelected ? `${color}06` : '#fff', cursor: 'pointer', fontSize: 14, color: isSelected ? color : '#1e293b', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500, justifyContent: isTF ? 'center' : 'flex-start', fontFamily: 'Open Sans, sans-serif' }}
                                            >
                                                {!isTF && <div style={{ width: 8, height: 8, borderRadius: '50%', background: isSelected ? color : '#f1f5f9', flexShrink: 0 }} />}
                                                <span><LatexText text={opt} /></span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles['ccr-quiz-options']}>
                            {(q?.options || []).map((opt, oi) => {
                                const isSelected = answers[current] === oi;
                                return (
                                    <button
                                        key={oi}
                                        onClick={() => handleSelect(oi)}
                                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.06)'}`, background: isSelected ? `${color}06` : '#fff', cursor: 'pointer', fontSize: 15, color: isSelected ? color : '#1e293b', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500, justifyContent: isTF ? 'center' : 'flex-start', fontFamily: 'Open Sans, sans-serif' }}
                                    >
                                        {!isTF && <div style={{ width: 10, height: 10, borderRadius: '50%', background: isSelected ? color : '#f1f5f9', flexShrink: 0 }} />}
                                        <span><LatexText text={opt} /></span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <button className={styles['ccr-btn-secondary']} onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>

                    <button className={`${styles['ccr-btn-review']}${reviewed[current] ? ` ${styles['active']}` : ''}`} onClick={toggleReview}>
                        Mark for Review
                    </button>

                    {current + 1 === questions.length ? (
                        <button className={styles['ccr-btn-primary']} onClick={handleSubmit} style={{ background: '#ef4444' }}>Submit Assessment</button>
                    ) : (
                        <button className={styles['ccr-btn-primary']} onClick={() => setCurrent((c) => c + 1)} style={{ background: color }}>Next →</button>
                    )}
                </div>
            </div>

            <div className={styles['ccr-assessment-palette']}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, marginBottom: 20, fontWeight: 800, fontSize: 18, background: timeLeft < 60 ? 'rgba(239,68,68,0.1)' : `${color}0D`, color: timeLeft < 60 ? '#ef4444' : color }}>
                    {formatTime(timeLeft)}
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 0.5 }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                    {questions.map((_, i) => {
                        const isAnswered = answers[i] !== null;
                        const isCurrent = current === i;
                        const isMarked = reviewed[i];

                        let border = isCurrent ? '3px solid #1e293b' : '1px solid #e2e8f0';
                        if (!isCurrent && isMarked) border = '2.5px solid #f59e0b';

                        return (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                style={{ aspectRatio: '1/1', borderRadius: 8, fontSize: 13, fontWeight: 700, background: isAnswered ? color : '#f1f5f9', color: isAnswered ? '#fff' : '#64748b', border, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', position: 'relative' }}
                            >
                                {i + 1}
                                {isMarked && <div style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', border: '2.5px solid #fff' }} />}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: 20, fontSize: 12, color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 10, height: 10, background: color, borderRadius: 3 }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 10, height: 10, background: '#f1f5f9', borderRadius: 3, border: '1px solid #e2e8f0' }} /> Pending
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 10, height: 10, background: '#fffbeb', borderRadius: 3, border: '1.5px solid #f59e0b' }} /> Marked for Review
                    </div>
                </div>
                <button className={styles['ccr-btn-primary']} onClick={handleSubmit} style={{ background: '#ef4444', width: '100%', padding: '12px', marginTop: 24, fontSize: 13, boxShadow: 'none' }}>
                    Submit Assessment
                </button>
            </div>
        </div>
    );
}
