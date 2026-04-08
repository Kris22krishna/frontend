import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../../coordinate_geometry_9/coordinate_geometry_9.module.css';
import { LatexText } from '../../../../../../LatexText';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { LEGraphMini } from '../../components/LEGraphMini';

export default function LEScenarioPracticeEngine({ scenarios = [], title, color = "#0f4c81", onBack, nodeId }) {
    const TOTAL_QUESTIONS = 20;

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        if (!scenarios || scenarios.length === 0) return;
        const pool = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            pool.push(scenarios[i % scenarios.length]);
        }
        setQuestions(pool);
    }, [scenarios]);

    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const isFinishedRef = useRef(false);

    useEffect(() => {
        startSession({ nodeId: nodeId || 'le9-skill-practice', sessionType: 'practice' });
    }, []); // eslint-disable-line

    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    useEffect(() => {
        const past = answers[qIndex];
        if (past) {
            setSelectedOpt(past.selectedOpt);
            setIsSubmitted(true);
        } else {
            setSelectedOpt(null);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    const handleCheckAnswer = () => {
        if (isSubmitted) return;
        const cq = questions[qIndex];
        if (!cq || selectedOpt === null) return;

        const isCorrect = selectedOpt === cq.ans;
        if (isCorrect) setScore(s => s + 1);

        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOpt, isCorrect }
        }));

        logAnswer({
            question_index: qIndex,
            answer_json: { selected: selectedOpt, correct_answer: cq.ans },
            is_correct: isCorrect,
            marks_awarded: isCorrect ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0,
        });

        setIsSubmitted(true);
    };

    const handlePrev = () => { if (qIndex > 0) setQIndex(qIndex - 1); };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(qIndex + 1);
        } else {
            isFinishedRef.current = true;
            await finishSession();
            setFinished(true);
        }
    };

    const handleRetry = () => {
        isFinishedRef.current = false;
        startSession({ nodeId: nodeId || 'le9-skill-practice', sessionType: 'practice' });
        setQIndex(0); setAnswers({}); setSelectedOpt(null);
        setIsSubmitted(false); setScore(0); setFinished(false); setTimeTaken(0);
    };

    if (questions.length === 0) return null;

    if (finished) {
        const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
        const msg = pct >= 85 ? '🏆 Excellent!' : pct >= 65 ? '🌟 Well done!' : '💪 Keep practising!';
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px', fontFamily: 'Open Sans, sans-serif' }}>
                <div style={{ width: 130, height: 130, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '7px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.07)' }}>
                    <div style={{ width: 94, height: 94, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>of {TOTAL_QUESTIONS}</div>
                    </div>
                </div>
                <div style={{ display: 'inline-block', padding: '6px 16px', background: `${color}15`, color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>⏱️ {formatTime(timeTaken)}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 24px' }}>Practice completed. Review the concepts or try taking the assessment!</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className={styles['btn-primary']} style={{ background: color, border: 'none' }} onClick={handleRetry}>🔀 Try Again</button>
                    <button className={styles['btn-secondary']} onClick={onBack}>Back to Skills</button>
                </div>
            </div>
        );
    }

    const cq = questions[qIndex];
    const progress = (qIndex / TOTAL_QUESTIONS) * 100;
    const past = answers[qIndex] || {};

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
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color, fontWeight: 900 }}>{qIndex + 1}</span> / {TOTAL_QUESTIONS}</div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${color}, #818cf8)`, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            <div className={styles['quiz-card']}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                    QUESTION {qIndex + 1} of {TOTAL_QUESTIONS}
                </div>

                <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 20 }}>
                    <LatexText text={cq.q} />
                </div>

                {cq.svg && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                        <LEGraphMini config={cq.svg} />
                    </div>
                )}

                <div className={styles['quiz-options']}>
                    {cq.opts.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a', dot = '#f1f5f9';
                        if (isSubmitted) {
                            if (oi === cq.ans) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; dot = '#10b981'; }
                            else if (oi === selectedOpt) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txtColor = '#ef4444'; dot = '#ef4444'; }
                        } else if (selectedOpt === oi) { border = color; bg = `${color}05`; dot = color; }
                        return (
                            <button key={oi} onClick={() => !isSubmitted && setSelectedOpt(oi)} disabled={isSubmitted}
                                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${border}`, background: bg, cursor: isSubmitted ? 'default' : 'pointer', fontSize: 15, color: txtColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: selectedOpt === oi ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                                <span><LatexText text={opt} /></span>
                            </button>
                        );
                    })}
                </div>

                {isSubmitted && (
                    <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 14, background: past.isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1.5px solid ${past.isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <div style={{ fontSize: 20 }}>{past.isCorrect ? '🌟' : '💡'}</div>
                            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: past.isCorrect ? '#059669' : '#b91c1c' }}>
                                {past.isCorrect ? 'Excellent job!' : 'Not quite right.'}
                            </h4>
                        </div>
                        <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.65, marginTop: 8, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                            <strong style={{ color: '#0f172a' }}>Explanation: </strong>
                            <LatexText text={cq.expl} />
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                <button onClick={handlePrev} disabled={qIndex === 0}
                    style={{ padding: '12px 24px', background: 'transparent', color: qIndex === 0 ? '#cbd5e1' : '#64748b', cursor: qIndex === 0 ? 'not-allowed' : 'pointer', border: `2px solid ${qIndex === 0 ? '#e2e8f0' : '#cbd5e1'}`, borderRadius: 100, fontSize: 14, fontWeight: 800, transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                    ← Prev
                </button>
                {!isSubmitted ? (
                    <button onClick={handleCheckAnswer} disabled={selectedOpt === null}
                        style={{ padding: '12px 40px', background: selectedOpt !== null ? color : '#f1f5f9', color: selectedOpt !== null ? '#fff' : '#94a3b8', cursor: selectedOpt !== null ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: selectedOpt !== null ? `0 8px 20px ${color}30` : 'none', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                        Check Answer ✓
                    </button>
                ) : (
                    <button onClick={handleNext}
                        style={{ padding: '12px 40px', background: color, color: '#fff', cursor: 'pointer', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: `0 8px 20px ${color}30`, transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                        {qIndex === TOTAL_QUESTIONS - 1 ? '🏁 See Final Score' : 'Next Question →'}
                    </button>
                )}
            </div>
        </div>
    );
}
