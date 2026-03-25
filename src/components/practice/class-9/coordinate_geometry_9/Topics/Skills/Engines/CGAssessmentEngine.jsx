import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../../coordinate_geometry_9.module.css';
import { LatexText } from '../../../../../../LatexText';
import CGSvgGraph from './CGSvgGraph';

function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

export default function CGAssessmentEngine({ questionPool, sampleSize = 10, title, color, onBack, skillId }) {
    const safeQuestionPool = Array.isArray(questionPool) ? questionPool : [];
    const [questions] = useState(() => {
        // We allow mcq, mcq_graph, and plot for CG.
        const source = safeQuestionPool;
        return sample(source, Math.min(sampleSize, source.length));
    });

    const [current, setCurrent] = useState(0);
    // answers[i] will hold a number (for mcq) or an object {x, y} (for plot)
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [reviewMarks, setReviewMarks] = useState(Array(questions.length).fill(false));
    const [timeLeft, setTimeLeft] = useState(600); // 10-minute countdown
    const [finished, setFinished] = useState(false);

    const finish = useCallback(() => setFinished(true), []);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { finish(); return; }
        const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [finished, timeLeft, finish]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSelectOption = (optIdx) => {
        if (finished) return;
        const next = [...answers];
        next[current] = optIdx;
        setAnswers(next);
    };

    const handlePlotPoint = (pt) => {
        if (finished) return;
        const next = [...answers];
        next[current] = pt; // {x, y}
        setAnswers(next);
    };

    const handleToggleReview = () => {
        if (finished) return;
        const next = [...reviewMarks];
        next[current] = !next[current];
        setReviewMarks(next);
    };

    const handleSubmit = () => {
        if (answers.slice(0, questions.length).includes(null)) {
            if (!window.confirm('You have unanswered questions. Submit anyway?')) return;
        }
        finish();
    };

    if (!questions.length) {
        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>No Assessment Questions Available</h2>
                <button className={styles['btn-secondary']} onClick={onBack}>Back to Skills</button>
            </div>
        );
    }

    // ── RESULTS SCREEN ────────────────────────────────────────────────────────
    if (finished) {
        let score = 0;
        const results = questions.map((q, i) => {
            const userAns = answers[i];
            let isCorrect = false;

            if (q.type === 'plot') {
                if (userAns && typeof userAns === 'object') {
                    isCorrect = userAns.x === q.correctPoint.x && userAns.y === q.correctPoint.y;
                }
            } else {
                // mcq or mcq_graph
                isCorrect = userAns === q.correct;
            }

            if (isCorrect) score += 1;
            return { isCorrect, userAns };
        });

        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Excellent!' : pct >= 75 ? '🌟 Great Work!' : pct >= 50 ? '👍 Good Effort!' : '💪 Keep Practicing!';

        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{title} — Assessment</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>Assessment Complete ✅</h2>
                    <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questions.length}</div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}% — {msg}</div>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>📋 Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questions.map((q, i) => {
                        const { isCorrect, userAns } = results[i];
                        const isPlot = q.type === 'plot';

                        return (
                            <div key={i} style={{
                                background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)',
                                borderRadius: 16, padding: '20px 24px',
                                border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                            }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{ fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444' }}>
                                        {isCorrect ? '✅' : '❌'} Q{i + 1}
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                                        <LatexText text={q.question} />
                                    </div>
                                </div>

                                {/* Show the graph context if present */}
                                {q.type === 'mcq_graph' && q.graphPoint && (
                                    <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                                        <CGSvgGraph size={240} points={[q.graphPoint]} interactive={false} />
                                    </div>
                                )}

                                {!isPlot ? (
                                    <div className={styles['quiz-options']}>
                                        <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>Correct Answer</div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}><LatexText text={q.options[q.correct]} /></div>
                                        </div>
                                        <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '10px 14px', marginTop: 8 }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444', textTransform: 'uppercase', marginBottom: 4 }}>Your Answer</div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                                                {userAns !== null ? <LatexText text={q.options[userAns]} /> : '— Not Answered —'}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                                        <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: '10px 14px', flex: 1, minWidth: 200 }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>Correct Placement</div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>({q.correctPoint.x}, {q.correctPoint.y})</div>
                                            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
                                                <CGSvgGraph size={180} points={[{ x: q.correctPoint.x, y: q.correctPoint.y, color: '#059669', label: 'Correct' }]} />
                                            </div>
                                        </div>
                                        <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '10px 14px', flex: 1, minWidth: 200 }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444', textTransform: 'uppercase', marginBottom: 4 }}>Your Placement</div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                                                {userAns ? `(${userAns.x}, ${userAns.y})` : '— Not Answered —'}
                                            </div>
                                            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
                                                <CGSvgGraph 
                                                    size={180} 
                                                    userPoint={userAns} 
                                                    points={!isCorrect && userAns ? [{ x: q.correctPoint.x, y: q.correctPoint.y, color: '#10b981', label: '✓' }] : []}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {q.explanation && (
                                    <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', lineHeight: 1.6, background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: 8, whiteSpace: 'pre-line' }}>
                                        <strong style={{ color }}>💡 </strong><LatexText text={q.explanation} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <button className={styles['btn-secondary']} onClick={onBack}>← Back to Skills</button>
                </div>
            </div>
        );
    }

    // ── ACTIVE ASSESSMENT ─────────────────────────────────────────────────────
    const q = questions[current] || null;
    const isPlot = q?.type === 'plot';

    return (
        <div style={{ display: 'flex', gap: 24, paddingBottom: 40, flexWrap: 'wrap' }}>
            {/* ── LEFT Question Panel ──────────────────── */}
            <div style={{ flex: '1 1 400px', minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{title}</div>
                    </div>
                </div>

                <div className={styles['quiz-card']}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                        QUESTION {current + 1} OF {questions.length}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 20, whiteSpace: 'pre-line' }}>
                        <LatexText text={q?.question || ''} />
                    </div>

                    {q?.type === 'mcq_graph' && q.graphPoint && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                            <CGSvgGraph size={Math.min(window.innerWidth - 60, 320)} points={[q.graphPoint]} interactive={false} />
                        </div>
                    )}

                    {isPlot ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                            <CGSvgGraph
                                size={Math.min(window.innerWidth - 60, 320)}
                                interactive={true}
                                onPlot={handlePlotPoint}
                                userPoint={answers[current]}
                            />
                            <div style={{ fontSize: 13, color: '#64748b' }}>Click on the graph to place your point.</div>
                        </div>
                    ) : (
                        <div className={styles['quiz-options']}>
                            {(q?.options || []).map((opt, oi) => {
                                const isSelected = answers[current] === oi;
                                return (
                                    <button key={oi} onClick={() => handleSelectOption(oi)}
                                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.06)'}`, background: isSelected ? `${color}06` : '#fff', cursor: 'pointer', fontSize: 15, color: isSelected ? color : '#0f172a', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: isSelected ? color : '#f1f5f9', flexShrink: 0 }} />
                                        <span><LatexText text={opt} /></span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, flexWrap: 'wrap', gap: 12 }}>
                    <button className={styles['btn-secondary']} onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
                        style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>

                    <button onClick={handleToggleReview}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: reviewMarks[current] ? '#fffbeb' : '#f8fafc', border: `1.5px solid ${reviewMarks[current] ? '#f59e0b' : '#e2e8f0'}`, borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 700, color: reviewMarks[current] ? '#d97706' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {reviewMarks[current] ? '★ Marked' : '☆ Mark for Review'}
                    </button>

                    {current + 1 === questions.length ? (
                        <button className={styles['btn-primary']} onClick={handleSubmit} style={{ background: '#ef4444', border: 'none' }}>
                            Submit Assessment
                        </button>
                    ) : (
                        <button className={styles['btn-primary']} onClick={() => setCurrent((c) => c + 1)} style={{ background: color, border: 'none' }}>
                            Next →
                        </button>
                    )}
                </div>
            </div>

            {/* ── RIGHT Sidebar ─────────────────────────── */}
            <div style={{ width: 300, flexShrink: 0 }}>
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
                        const isMarked = reviewMarks[i];
                        
                        let bg = isAnswered ? color : '#f1f5f9';
                        let textColor = isAnswered ? '#fff' : '#64748b';
                        if (isMarked && !isAnswered) { bg = '#fef3c7'; textColor = '#d97706'; }

                        return (
                            <button key={i} onClick={() => setCurrent(i)}
                                style={{
                                    position: 'relative',
                                    aspectRatio: '1/1', borderRadius: 8, fontSize: 13, fontWeight: 700,
                                    background: bg,
                                    color: textColor,
                                    border: isCurrent ? '3px solid #0f172a' : (isMarked ? '1.5px solid #f59e0b' : '1px solid #e2e8f0'),
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}>
                                {i + 1}
                                {isMarked && (
                                    <div style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', border: '2px solid #fff' }} />
                                )}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: 24, padding: '16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 12, height: 12, background: color, borderRadius: 2 }}></div> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 12, height: 12, background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 2 }}></div> Not Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 12, height: 12, background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: 2, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: -3, right: -3, width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }}></div>
                        </div> Marked for Review
                    </div>
                </div>
            </div>
        </div>
    );
}
