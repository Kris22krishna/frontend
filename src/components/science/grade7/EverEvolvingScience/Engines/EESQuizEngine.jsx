import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../../MathRenderer';
import styles from '../everevolvingscience.module.css';
import { useSessionLogger } from '@/hooks/useSessionLogger';

const normalizeQuestionKey = (question = {}) =>
    String(question.question ?? question.q ?? '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

const getUniqueQuestions = (questions = []) => {
    const seen = new Set();

    return (questions ?? []).filter((question) => {
        const key = normalizeQuestionKey(question);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

const resolveQuestions = (questions) =>
    getUniqueQuestions(typeof questions === 'function' ? questions() : questions);

export default function EESQuizEngine({ questions, title, onBack, onSecondaryBack, color, nodeId }) {
    // v4 Logging
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const isFinishedRef = useRef(false);
    const sessionStartedRef = useRef(false);

    const [questionSet, setQuestionSet] = useState(() => resolveQuestions(questions));
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        if (nodeId && !sessionStartedRef.current) {
            startSession({ nodeId, sessionType: 'practice' });
            sessionStartedRef.current = true;
        }
    }, [nodeId, startSession]);

    useEffect(() => {
        return () => {
            if (sessionStartedRef.current && !isFinishedRef.current) {
                abandonSession({ totalQuestions: questionSet.length });
            }
        };
    }, [abandonSession, questionSet.length]);

    useEffect(() => {
        setQuestionSet(resolveQuestions(questions));
        setCurrent(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setFinished(false);
        setTimeTaken(0);
    }, [questions]);

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
    const progress = ((current + (finished ? 1 : 0)) / questionSet.length) * 100;

    const handleSelect = (optIdx) => {
        if (answered) return;
        setSelected(optIdx);
        setAnswered(true);
        const correct = optIdx === q.correct;
        if (correct) setScore(s => s + 1);

        logAnswer({
            question_index: current + 1,
            answer_json: { selection: optIdx },
            is_correct: correct ? 1.0 : 0.0,
            marks_awarded: correct ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0
        });
    };

    const handleNext = () => {
        if (current + 1 >= questionSet.length) {
            setFinished(true);
            isFinishedRef.current = true;
            finishSession({
                totalQuestions: questionSet.length,
                totalScore: score + (selected === q.correct ? 1 : 0) // adjusted for the last answer if needed
            });
        } else {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    if (finished) {
        const pct = Math.round((score / questionSet.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        const msgSub = pct >= 75 ? 'Excellent understanding!' : 'Review the concepts and try again for 100%.';
        const avgTime = timeTaken / questionSet.length;
        const avgTimeStr = avgTime < 60 ? `${Math.round(avgTime)}s` : formatTime(Math.round(avgTime));

        return (
            <div style={{
                maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '48px 32px',
                background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0',
                boxShadow: `0 20px 60px ${color}20`, position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />

                <div style={{
                    width: 160, height: 160, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 10px 40px ${color}30`, border: '10px solid #fff'
                }}>
                    <div style={{ textAlign: 'center', background: '#fff', width: 120, height: 120, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 44, fontWeight: 900, color, lineHeight: 1 }}>{pct}%</div>
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

                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        className={styles['wws-btn-primary']}
                        onClick={() => {
                            if (typeof questions === 'function') setQuestionSet(questions());
                            setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setTimeTaken(0); setFinished(false);
                        }}
                        style={{ padding: '16px 32px', background: color, fontSize: 16, flex: 1, minWidth: 200 }}
                    >
                        Try Again
                    </button>
                    <button
                        className={styles['wws-btn-secondary']}
                        onClick={onBack}
                        style={{ padding: '16px 32px', fontSize: 16, flex: 1, minWidth: 200 }}
                    >
                        Return to Concepts
                    </button>
                </div>
                {onSecondaryBack && (
                    <button onClick={onSecondaryBack} style={{ marginTop: 24, background: 'none', border: 'none', color: '#64748b', fontSize: 15, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                        Back to Chapter
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={styles['wws-quiz-container']}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className={styles['wws-score-header']}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Skill Verification</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8 }}>
                                ⏱️ {formatTime(timeTaken)}
                            </div>
                            <button
                                onClick={onBack}
                                style={{ background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                            >
                                ✕ Exit
                            </button>
                        </div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>
                            Question <span style={{ color }}>{current + 1}</span> / {questionSet.length}
                        </div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden', marginTop: 12 }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* Question Card */}
            <div className={styles['wws-quiz-card']}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '6px 16px', borderRadius: 10, fontSize: 11, fontWeight: 900, color, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                    QUESTION {current + 1}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 24 }}>
                    {q.svg && (
                        <div style={{ marginBottom: 16, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />
                    )}
                    <MathRenderer text={q.question} />
                </div>

                {/* Options */}
                <div className={styles['wws-quiz-options']}>
                    {q.options.map((opt, oi) => {
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
                                    display: 'flex', alignItems: 'flex-start', gap: 12,
                                    padding: '14px 16px', borderRadius: 16,
                                    border: `2.5px solid ${border}`, background: bg,
                                    cursor: answered ? 'default' : 'pointer',
                                    fontSize: 14, color: txtColor, textAlign: 'left',
                                    transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500,
                                    width: '100%', minHeight: 56, lineHeight: 1.55
                                }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0, marginTop: 6, transition: 'all 0.2s' }} />
                                <span><MathRenderer text={opt} /></span>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {answered && q.explanation && (
                    <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(217,119,6,0.05)', border: '1px solid rgba(217,119,6,0.1)', color: '#64748b', fontSize: 13.5, lineHeight: 1.6 }}>
                        <strong style={{ color }}>💡 Explanation: </strong>
                        <MathRenderer text={q.explanation} />
                    </div>
                )}
            </div>

            {/* Next Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <button onClick={handleNext} disabled={!answered}
                    className={styles['wws-btn-primary']}
                    style={{ padding: '12px 40px', background: answered ? color : '#f1f5f9', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: answered ? `0 8px 20px ${color}30` : 'none' }}>
                    {current + 1 >= questionSet.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}
