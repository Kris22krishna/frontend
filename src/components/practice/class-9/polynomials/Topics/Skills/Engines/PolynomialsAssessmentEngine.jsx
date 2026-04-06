import React, { useState, useEffect, useCallback } from 'react';
import '../../../polynomials_grade_9.css';
import { LatexText } from '../../../../../../LatexText';
import { useSessionLogger } from '@/hooks/useSessionLogger';

function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

// Assessment uses only MCQ questions (timed exam format)
// Receives: questionPool, sampleSize (default 10), title, color, onBack, nodeId
export default function PolynomialsAssessmentEngine({ questionPool, sampleSize = 10, title, color, onBack, nodeId }) {
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    
    // Filter to only MCQ for assessment (exclude fill questions)
    const safeQuestionPool = Array.isArray(questionPool) ? questionPool : [];
    const [questions] = useState(() => {
        const validQuestion = (q) =>
            Array.isArray(q?.options) &&
            q.options.length > 0 &&
            Number.isInteger(q.correct) &&
            q.correct >= 0 &&
            q.correct < q.options.length;
        const allowedType = (q) => !q.type || q.type === 'mcq' || q.type === 'multiStep' || q.type === 'truefalse';

        const mcqOnly = safeQuestionPool.filter((q) => allowedType(q) && validQuestion(q));
        const source = mcqOnly.length ? mcqOnly : safeQuestionPool.filter(validQuestion);
        return sample(source, Math.min(sampleSize, source.length));
    });
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [reviewMarks, setReviewMarks] = useState(Array(questions.length).fill(false));
    const [timeLeft, setTimeLeft] = useState(600); // 10-minute countdown
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        startSession({ nodeId, sessionType: 'assessment' });
    }, [nodeId, startSession]);

    const finish = useCallback(() => {
        const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
        const payload = questions.reduce((acc, q, i) => {
            acc[i] = { selectedOption: answers[i], isCorrect: answers[i] === q.correct };
            return acc;
        }, {});

        finishSession({
            totalQuestions: questions.length,
            questionsAnswered: answers.filter(a => a !== null).length,
            answersPayload: payload
        });
        setFinished(true);
    }, [questions, answers, finishSession]);

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

    const handleSelect = (optIdx) => {
        if (finished) return;
        const next = [...answers];
        next[current] = optIdx;
        setAnswers(next);

        // Log the answer immediately
        const q = questions[current];
        logAnswer({
            question_index: current,
            answer_json: {
                question_text: q.question,
                selected_option: q.options[optIdx],
                correct_answer: q.options[q.correct],
                difficulty: 'Medium'
            },
            is_correct: optIdx === q.correct ? 1 : 0
        });
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

    const q = questions[current] || null;
    const isTF = q && q.type === 'truefalse';

    if (!questions.length) {
        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                    No Assessment Questions Available
                </h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 20px' }}>
                    This skill currently has no valid multiple-choice questions for assessment.
                </p>
                <button className="poly-btn-secondary" onClick={onBack}>Back to Skills</button>
            </div>
        );
    }

    // ── RESULTS SCREEN ────────────────────────────────────────────────────────
    if (finished) {
        const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Excellent!' : pct >= 75 ? '🌟 Great Work!' : pct >= 50 ? '👍 Good Effort!' : '💪 Keep Practicing!';

        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{title} — Assessment</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
                        Assessment Complete ✅
                    </h2>
                    <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questions.length}</div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}% — {msg}</div>
                </div>

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
                                        {isCorrect ? '✅' : '❌'} Q{i + 1}
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                                        <LatexText text={q.question} />
                                    </div>
                                </div>
                                <div className="poly-quiz-options">
                                    <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>Correct Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}><LatexText text={q.options[q.correct]} /></div>
                                    </div>
                                    <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444', textTransform: 'uppercase', marginBottom: 4 }}>Your Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                                            {userAns !== null ? <LatexText text={q.options[userAns]} /> : '— Not Answered —'}
                                        </div>
                                    </div>
                                </div>
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
                    <button className="poly-btn-secondary" onClick={onBack}>← Back to Skills</button>
                </div>
            </div>
        );
    }

    // ── ACTIVE ASSESSMENT ─────────────────────────────────────────────────────
    return (
        <div className="poly-assessment-layout">
            {/* ── LEFT Question Panel ──────────────────── */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{title}</div>
                    </div>
                </div>

                <div className="poly-quiz-card">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                        QUESTION {current + 1} OF {questions.length}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 20, whiteSpace: 'pre-line' }}>
                        <LatexText text={q?.question || ''} />
                    </div>

                    <div className="poly-quiz-options">
                        {(q?.options || []).map((opt, oi) => {
                            const isSelected = answers[current] === oi;
                            return (
                                <button key={oi} onClick={() => handleSelect(oi)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.06)'}`, background: isSelected ? `${color}06` : '#fff', cursor: 'pointer', fontSize: 15, color: isSelected ? color : '#0f172a', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500, justifyContent: isTF ? 'center' : 'flex-start', fontFamily: 'Open Sans, sans-serif' }}>
                                    {!isTF && <div style={{ width: 10, height: 10, borderRadius: '50%', background: isSelected ? color : '#f1f5f9', flexShrink: 0 }} />}
                                    <span><LatexText text={opt} /></span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <button className="poly-btn-secondary" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
                        style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>

                    <button onClick={handleToggleReview}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: reviewMarks[current] ? '#fffbeb' : '#f8fafc', border: `1.5px solid ${reviewMarks[current] ? '#f59e0b' : '#e2e8f0'}`, borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 700, color: reviewMarks[current] ? '#d97706' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {reviewMarks[current] ? '★ Marked for Review' : '☆ Mark for Review'}
                    </button>

                    {current + 1 === questions.length ? (
                        <button className="poly-btn-primary" onClick={handleSubmit} style={{ background: '#ef4444' }}>
                            Submit Assessment
                        </button>
                    ) : (
                        <button className="poly-btn-primary" onClick={() => setCurrent((c) => c + 1)} style={{ background: color }}>
                            Next →
                        </button>
                    )}
                </div>
            </div>

            {/* ── RIGHT Sidebar ─────────────────────────── */}
            <div className="poly-assessment-palette">
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

                <div style={{ marginTop: 20, fontSize: 12, color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 10, height: 10, background: color, borderRadius: 3 }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 10, height: 10, background: '#f59e0b', borderRadius: '50%' }} /> Marked for Review
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 10, height: 10, background: '#f1f5f9', borderRadius: 3, border: '1px solid #e2e8f0' }} /> Pending
                    </div>
                </div>

                <button className="poly-btn-primary" onClick={handleSubmit}
                    style={{ background: '#ef4444', width: '100%', padding: '12px', marginTop: 24, fontSize: 13, boxShadow: 'none' }}>
                    Finish Now
                </button>
            </div>
        </div>
    );
}
