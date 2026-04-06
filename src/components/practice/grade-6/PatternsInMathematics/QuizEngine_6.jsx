import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../MathRenderer';
import { useSessionLogger } from '../../../../hooks/useSessionLogger';

export default function QuizEngine({ questions, title, onBack, onSecondaryBack, color, prefix = 'alg', nodeId }) {
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);
    const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
    const [current, setCurrent] = useState(0);
    const [answersMap, setAnswersMap] = useState({}); // { [idx]: { selectedIdx?, textAnswer?, isCorrect } }
    const [finished, setFinished] = useState(false);
    const [draftTextAnswer, setDraftTextAnswer] = useState('');

    useEffect(() => {
        setQuestionSet(typeof questions === 'function' ? questions() : questions);
        setCurrent(0);
        setAnswersMap({});
        setFinished(false);
        setDraftTextAnswer('');
        answersPayload.current = [];
        isFinishedRef.current = false;
    }, [questions]);

    useEffect(() => {
        if (!nodeId) return;
        startSession({ nodeId, sessionType: 'practice' });
        return () => { if (!isFinishedRef.current) abandonSession(); };
    }, [nodeId]);

    // Timer — counts up while not finished
    const [timeTaken, setTimeTaken] = useState(0);
    useEffect(() => {
        if (finished) return;
        const timer = setInterval(() => setTimeTaken(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, [finished]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questionSet[current];
    const isAnswered = !!answersMap[current];
    const savedAnswer = answersMap[current] || {};

    // Restore draft when navigating back to a previously answered text question
    useEffect(() => {
        if (answersMap[current] && q.type === 'text') {
            setDraftTextAnswer(answersMap[current].textAnswer || '');
        } else if (!answersMap[current]) {
            setDraftTextAnswer('');
        }
    }, [current, q.type]);

    const progress = (Object.keys(answersMap).length / questionSet.length) * 100;

    // ── Handlers ──────────────────────────────────────────
    const handleSelect = (optIdx) => {
        if (isAnswered) return;
        const isCorrect = optIdx === q.correct || (q.options && q.options[optIdx] !== undefined && String(q.options[optIdx]) === String(q.correct));
        setAnswersMap(prev => ({ ...prev, [current]: { selectedIdx: optIdx, isCorrect } }));
        if (nodeId) {
            const entry = { question_index: current, answer_json: { selected: optIdx, correct_answer: q.correct }, is_correct: isCorrect, marks_awarded: isCorrect ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
            answersPayload.current[current] = entry;
            logAnswer(entry);
        }
    };

    const handleTextSubmit = () => {
        if (isAnswered || !draftTextAnswer.trim()) return;
        const isCorrect = draftTextAnswer.trim().toLowerCase() === String(q.answer).trim().toLowerCase();
        setAnswersMap(prev => ({ ...prev, [current]: { textAnswer: draftTextAnswer, isCorrect } }));
        if (nodeId) {
            const entry = { question_index: current, answer_json: { text: draftTextAnswer, correct_answer: q.answer }, is_correct: isCorrect, marks_awarded: isCorrect ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
            answersPayload.current[current] = entry;
            logAnswer(entry);
        }
    };

    const handleNext = async () => {
        if (current + 1 >= questionSet.length) {
            if (nodeId && !isFinishedRef.current) {
                isFinishedRef.current = true;
                await finishSession({ answers_payload: answersPayload.current.filter(Boolean) });
            }
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
        }
    };

    const handlePrev = () => {
        if (current > 0) setCurrent(c => c - 1);
    };

    // ── Finished screen ───────────────────────────────────
    if (finished) {
        const score = Object.values(answersMap).filter(a => a.isCorrect).length;
        const pct = Math.round((score / questionSet.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        const msgSub = pct >= 90 ? 'You have excellent control over this topic!' : 'Review the concepts and try again for 100%.';
        const avgTime = timeTaken / questionSet.length;
        const avgTimeStr = avgTime < 60 ? `${Math.round(avgTime)}s` : formatTime(Math.round(avgTime));

        return (
            <div className={`${prefix}-quiz-finished`} style={{
                maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '48px 32px',
                background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0',
                boxShadow: `0 20px 60px ${color}20`, position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />

                <div className={`${prefix}-quiz-score-circle`} style={{
                    width: 160, height: 160, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 10px 40px ${color}30`, border: '10px solid #fff'
                }}>
                    <div style={{ textAlign: 'center', background: '#fff', width: 120, height: 120, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 44, fontWeight: 900, color: color, lineHeight: 1 }}>{pct}%</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>Accuracy</div>
                    </div>
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>{msg}</h2>
                <p style={{ color: '#475569', fontSize: 16, margin: '0 0 36px', lineHeight: 1.6 }}>{msgSub}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Correct Answers</div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>{score} <span style={{ fontSize: 16, color: '#94a3b8' }}>/ {questionSet.length}</span></div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Total Time</div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>{formatTime(timeTaken)}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', gridColumn: 'span 2' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Time Per Question</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{avgTimeStr} <span style={{ fontSize: 15, color: '#94a3b8', fontWeight: 600 }}>avg.</span></div>
                    </div>
                </div>

                <div className={`${prefix}-quiz-finished-actions`} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        className={`${prefix}-btn-primary`}
                        onClick={() => {
                            if (typeof questions === 'function') setQuestionSet(questions());
                            setCurrent(0); setAnswersMap({}); setTimeTaken(0); setFinished(false);
                            answersPayload.current = []; isFinishedRef.current = false;
                            if (nodeId) startSession({ nodeId, sessionType: 'practice' });
                        }}
                        style={{ padding: '16px 32px', background: color, color: '#fff', border: 'none', borderRadius: 100, fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: `0 8px 24px ${color}40`, flex: 1, minWidth: 200 }}
                    >
                        Try Again
                    </button>
                    <button
                        className={`${prefix}-btn-secondary`}
                        onClick={onBack}
                        style={{ padding: '16px 32px', fontSize: 16, flex: 1, minWidth: 200, background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: 100, fontWeight: 800, cursor: 'pointer' }}
                    >
                        Return to Skills
                    </button>
                </div>
                {onSecondaryBack && (
                    <button
                        onClick={onSecondaryBack}
                        style={{ marginTop: 24, background: 'none', border: 'none', color: '#64748b', fontSize: 15, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Back to Chapter
                    </button>
                )}
            </div>
        );
    }

    // ── Active question ───────────────────────────────────
    return (
        <div className={`${prefix}-quiz-active ${prefix}-quiz-container`}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className={`${prefix}-score-header`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Skill Verification</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: `var(--${prefix}-text, #1e293b)`, margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: 13, color: color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block' }}>
                                ⏱️ {formatTime(timeTaken)}
                            </div>
                            <button
                                onClick={onBack}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    background: '#fee2e2', color: '#ef4444',
                                    border: '1px solid #fca5a5', padding: '4px 12px',
                                    borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                                    cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(239,68,68,0.1)'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.background = '#fecaca'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(239,68,68,0.15)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(239,68,68,0.1)'; }}
                            >
                                ✕ Exit
                            </button>
                        </div>
                        <div style={{ fontSize: 13, color: `var(--${prefix}-muted)`, fontWeight: 700 }}>
                            Question <span style={{ color: color }}>{current + 1}</span> / {questionSet.length}
                        </div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* Question Card */}
            <div className={`${prefix}-quiz-card`}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${color}15`, padding: '6px 16px', borderRadius: 10,
                    fontSize: 11, fontWeight: 900, color: color, marginBottom: 20,
                    textTransform: 'uppercase', letterSpacing: 1
                }}>
                    QUESTION {current + 1}
                </div>
                <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 18, fontWeight: 600, color: `var(--${prefix}-text, #1e293b)`, lineHeight: 1.6, marginBottom: 24 }}>
                    {q.image && (
                        <div style={{ marginBottom: 20, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <img src={q.image} alt="Problem Illustration" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    )}
                    {q.svg && (
                        <div style={{ marginBottom: 20, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />
                    )}
                    <MathRenderer text={q.question} />
                </div>

                {/* Options / Text Input */}
                {q.type === 'text' ? (
                    <div style={{ display: 'grid', gap: 12 }}>
                        <label style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: `var(--${prefix}-muted, #64748b)` }}>Type your answer</label>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <input
                                type="text"
                                value={draftTextAnswer}
                                onChange={(e) => !isAnswered && setDraftTextAnswer(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                                disabled={isAnswered}
                                placeholder="Enter your answer"
                                style={{
                                    flex: 1, padding: '14px 16px', borderRadius: 12,
                                    border: `2px solid ${isAnswered ? (savedAnswer.isCorrect ? `var(--${prefix}-teal)` : `var(--${prefix}-red)`) : 'rgba(0,0,0,0.08)'}`,
                                    background: '#fff', color: `var(--${prefix}-text, #1e293b)`,
                                    fontSize: 15, fontWeight: 600, outline: 'none'
                                }}
                            />
                            {!isAnswered && (
                                <button
                                    onClick={handleTextSubmit}
                                    disabled={!draftTextAnswer.trim()}
                                    style={{
                                        padding: '14px 24px', borderRadius: 12, border: 'none',
                                        background: draftTextAnswer.trim() ? color : '#e2e8f0',
                                        color: draftTextAnswer.trim() ? '#fff' : '#94a3b8',
                                        fontWeight: 700, cursor: draftTextAnswer.trim() ? 'pointer' : 'not-allowed'
                                    }}
                                >Check</button>
                            )}
                        </div>
                        {isAnswered && (
                            <div style={{ fontSize: 14, fontWeight: 700, color: savedAnswer.isCorrect ? `var(--${prefix}-teal)` : `var(--${prefix}-red)` }}>
                                {savedAnswer.isCorrect ? '✅ Correct!' : `❌ Incorrect. The correct answer is ${q.answer}.`}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={`${prefix}-quiz-options`}>
                        {(q.options || []).map((opt, oi) => {
                            let borderColor = 'rgba(0,0,0,0.04)';
                            let bgColor = '#fff';
                            let textColor = `var(--${prefix}-text)`;
                            let dotColor = '#f1f5f9';

                            if (isAnswered) {
                                if (oi === q.correct) {
                                    borderColor = `var(--${prefix}-teal)`;
                                    bgColor = 'rgba(16,185,129,0.05)';
                                    textColor = `var(--${prefix}-teal)`;
                                    dotColor = `var(--${prefix}-teal)`;
                                } else if (oi === savedAnswer.selectedIdx) {
                                    borderColor = `var(--${prefix}-red)`;
                                    bgColor = 'rgba(239,68,68,0.05)';
                                    textColor = `var(--${prefix}-red)`;
                                    dotColor = `var(--${prefix}-red)`;
                                }
                            }

                            return (
                                <button
                                    key={oi}
                                    onClick={() => handleSelect(oi)}
                                    disabled={isAnswered}
                                    className={`${prefix}-quiz-option`}
                                    style={{
                                        display: 'flex', alignItems: 'flex-start', gap: 12,
                                        padding: '14px 16px', borderRadius: 16,
                                        border: `2.5px solid ${borderColor}`,
                                        background: bgColor, cursor: isAnswered ? 'default' : 'pointer',
                                        fontSize: 14, color: textColor, textAlign: 'left',
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        fontWeight: isAnswered && oi === savedAnswer.selectedIdx ? 700 : 500,
                                        boxShadow: 'none', width: '100%', minHeight: 78, lineHeight: 1.55
                                    }}
                                >
                                    <div style={{
                                        width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0,
                                        transition: 'all 0.2s', marginTop: 6
                                    }} />
                                    <span style={{ display: 'block', minWidth: 0, maxWidth: '100%', fontSize: '1rem', lineHeight: 1.55, color: 'inherit' }}>
                                        <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Explanation */}
                {isAnswered && (
                    <div style={{
                        marginTop: 24, padding: '16px 20px', borderRadius: 12,
                        background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)',
                        color: `var(--${prefix}-muted)`, fontSize: 13.5, lineHeight: 1.6
                    }}>
                        <strong style={{ color: `var(--${prefix}-blue)` }}>💡 Explanation: </strong>
                        <MathRenderer text={q.explanation} />
                    </div>
                )}
            </div>

            {/* Navigation — Previous + Next */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={handlePrev}
                    disabled={current === 0}
                    style={{
                        padding: '12px 32px',
                        background: current > 0 ? '#fff' : '#f1f5f9',
                        color: current > 0 ? '#0f172a' : '#94a3b8',
                        border: current > 0 ? '1px solid #cbd5e1' : '1px solid #e2e8f0',
                        borderRadius: 100, fontSize: 15, fontWeight: 700,
                        cursor: current > 0 ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s'
                    }}
                >
                    ← Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`${prefix}-btn-primary`}
                    style={{
                        padding: '12px 40px',
                        background: isAnswered ? color : '#f1f5f9',
                        color: isAnswered ? '#fff' : '#94a3b8',
                        cursor: isAnswered ? 'pointer' : 'not-allowed',
                        border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800,
                        boxShadow: isAnswered ? `0 8px 20px ${color}30` : 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    {current + 1 >= questionSet.length ? 'See Final Score' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
