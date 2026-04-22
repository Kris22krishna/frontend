import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../herons_formula_9.module.css'; // Standardized styles
import { LatexText } from '../../../../../../LatexText';
import { useSessionLogger } from '@/hooks/useSessionLogger';

export default function HeronsFormulaScenarioAssessmentEngine({ scenarios = [], title, color = "#0f4c81", onBack, nodeId }) {
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
    
    // Test states
    const [testFinished, setTestFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 mins
    const [score, setScore] = useState(0);
    const [showPalette, setShowPalette] = useState(false);

    const { startSession, logAnswersBatch, finishSession } = useSessionLogger();
    const isFinishedRef = useRef(false);

    useEffect(() => {
        startSession({ nodeId: nodeId || 'herons-9-assess', sessionType: 'assessment' });
    }, []); // eslint-disable-line

    useEffect(() => {
        if (testFinished) return;
        const t = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(t);
                    handleFinishTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [testFinished]); // eslint-disable-line

    const formatTimeLeft = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSelectOption = (oIdx) => {
        if (testFinished) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOpt: oIdx, time: Date.now() }
        }));
    };

    const handleNext = () => {
        if (qIndex < TOTAL_QUESTIONS - 1) setQIndex(q + 1);
    };

    const handlePrev = () => {
        if (qIndex > 0) setQIndex(q - 1);
    };

    const handleFinishTest = async () => {
        if (isFinishedRef.current) return;
        isFinishedRef.current = true;
        setTestFinished(true);

        let finalScore = 0;
        const logs = [];

        questions.forEach((cq, i) => {
            const past = answers[i];
            let isCorrect = false;
            let ansVal = null;
            
            if (past && past.selectedOpt !== undefined && past.selectedOpt !== null) {
                ansVal = past.selectedOpt;
                isCorrect = ansVal === cq.correctIndex;
            }

            if (isCorrect) finalScore++;

            logs.push({
                question_index: i,
                answer_json: { selected: ansVal, correct_answer: cq.correctIndex },
                is_correct: isCorrect,
                marks_awarded: isCorrect ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: 0,
            });
        });

        setScore(finalScore);
        await logAnswersBatch(logs);
        await finishSession();
    };

    if (questions.length === 0) return null;

    if (testFinished) {
        const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div style={{ padding: '20px', fontFamily: 'Outfit, sans-serif', maxWidth: 800, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ width: 150, height: 150, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #e2e8f0 0deg)`, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 130, height: 130, background: '#f8fafc', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontSize: 48, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                            <div style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>/ {TOTAL_QUESTIONS}</div>
                        </div>
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>Test Complete</h2>
                    <p style={{ color: '#64748b', fontSize: 16, margin: '0 0 24px' }}>You scored {pct}% on this assessment.</p>
                    <button onClick={onBack} style={{ padding: '12px 32px', background: 'transparent', border: `2px solid ${color}`, color, borderRadius: 50, fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
                        Back to Skills Hub
                    </button>
                </div>

                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 800, color: '#0f172a' }}>
                        Detailed Report
                    </div>
                    <div>
                        {questions.map((cq, i) => {
                            const past = answers[i] || {};
                            const isCorrect = past.selectedOpt === cq.correctIndex;
                            const isSkipped = past.selectedOpt === undefined || past.selectedOpt === null;

                            return (
                                <div key={i} style={{ padding: 24, borderBottom: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: isCorrect ? '#ecfdf5' : isSkipped ? '#fefce8' : '#fef2f2', color: isCorrect ? '#059669' : isSkipped ? '#ca8a04' : '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>
                                            {isCorrect ? '✓' : isSkipped ? '-' : '✗'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', marginBottom: 6 }}>QUESTION {i + 1} {isSkipped && <span style={{ color: '#ca8a04', marginLeft: 8 }}>(SKIPPED)</span>}</div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 12, lineHeight: 1.6 }}>
                                                <LatexText text={cq.question} />
                                            </div>
                                            
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                                                {cq.options.map((opt, oi) => {
                                                    const isUserChoice = past.selectedOpt === oi;
                                                    const isTrueCorrect = cq.correctIndex === oi;
                                                    
                                                    let bg = '#f8fafc', bc = '#e2e8f0', dot = '#cbd5e1';
                                                    if (isTrueCorrect) { bg = '#ecfdf5'; bc = '#10b981'; dot = '#10b981'; }
                                                    else if (isUserChoice) { bg = '#fef2f2'; bc = '#ef4444'; dot = '#ef4444'; }

                                                    return (
                                                        <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: bg, border: `1.5px solid ${bc}`, fontSize: 14, fontWeight: isUserChoice || isTrueCorrect ? 700 : 500, color: '#334155' }}>
                                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot }} />
                                                            <LatexText text={opt} />
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div style={{ marginTop: 16, padding: 12, background: '#f8fafc', borderRadius: 8, border: '1px dashed #cbd5e1', fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                                                <strong style={{ color: '#0f172a' }}>Explanation: </strong>
                                                <LatexText text={cq.explanation} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    const cq = questions[qIndex];
    const past = answers[qIndex] || {};
    const selectedOpt = past.selectedOpt !== undefined ? past.selectedOpt : null;

    return (
        <div className={styles['quiz-container']} style={{ display: 'flex', gap: 24, maxWidth: 1100, margin: '0 auto', alignItems: 'flex-start' }}>
            {/* Left: Question Area */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Assessment</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 18, color: timeLeft < 60 ? '#ef4444' : '#d97706', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                            ⏱️ {formatTimeLeft(timeLeft)}
                        </div>
                        <button className={styles['mobile-only']} onClick={() => setShowPalette(!showPalette)} style={{ padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: 8, fontWeight: 700, color: '#475569' }}>
                            Grid
                        </button>
                    </div>
                </div>

                <div className={styles['quiz-card']}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                        QUESTION {qIndex + 1}
                    </div>

                    <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 24 }}>
                        <LatexText text={cq.question} />
                    </div>

                    {cq.svg && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                            {cq.svg}
                        </div>
                    )}

                    <div className={styles['quiz-options']}>
                        {cq.options.map((opt, oi) => {
                            const isSel = selectedOpt === oi;
                            return (
                                <button key={oi} onClick={() => handleSelectOption(oi)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${isSel ? color : 'rgba(0,0,0,0.06)'}`, background: isSel ? `${color}05` : '#fff', cursor: 'pointer', fontSize: 15, color: '#0f172a', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSel ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: isSel ? color : '#f1f5f9', flexShrink: 0 }} />
                                    <span><LatexText text={opt} /></span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                    <button onClick={handlePrev} disabled={qIndex === 0}
                        style={{ padding: '12px 24px', background: 'transparent', color: qIndex === 0 ? '#cbd5e1' : '#64748b', cursor: qIndex === 0 ? 'not-allowed' : 'pointer', border: `2px solid ${qIndex === 0 ? '#e2e8f0' : '#cbd5e1'}`, borderRadius: 100, fontSize: 14, fontWeight: 800, transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                        ← Prev
                    </button>
                    
                    {qIndex === TOTAL_QUESTIONS - 1 ? (
                        <button onClick={handleFinishTest}
                            style={{ padding: '12px 32px', background: '#ef4444', color: '#fff', cursor: 'pointer', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: `0 8px 20px rgba(239,68,68,0.3)`, transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                            Submit Test
                        </button>
                    ) : (
                        <button onClick={handleNext}
                            style={{ padding: '12px 32px', background: '#0f172a', color: '#fff', cursor: 'pointer', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: `0 8px 20px rgba(15,23,42,0.2)`, transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                            Next →
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Palette */}
            <div className={`${styles['palette-sidebar']} ${showPalette ? styles['palette-show'] : ''}`} style={{ width: 280, flexShrink: 0, background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 1 }}>Question Grid</h4>
                    <button className={styles['mobile-only']} onClick={() => setShowPalette(false)} style={{ background: 'none', border: 'none', fontSize: 20, color: '#64748b' }}>×</button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
                    {questions.map((_, i) => {
                        const isAns = answers[i] && answers[i].selectedOpt !== null && answers[i].selectedOpt !== undefined;
                        const isCur = i === qIndex;
                        return (
                            <button key={i} onClick={() => setQIndex(i)}
                                style={{ aspectRatio: '1/1', borderRadius: 8, border: `2px solid ${isCur ? color : isAns ? '#10b981' : '#e2e8f0'}`, background: isCur ? color : isAns ? '#ecfdf5' : '#fff', color: isCur ? '#fff' : isAns ? '#059669' : '#64748b', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                                {i + 1}
                            </button>
                        );
                    })}
                </div>

                <div style={{ fontSize: 12, color: '#64748b', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 4, background: '#ecfdf5', border: '2px solid #10b981' }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 4, background: '#fff', border: '2px solid #e2e8f0' }} /> Not Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 4, background: color, border: `2px solid ${color}` }} /> Current
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 24, paddingTop: 24 }}>
                    <button onClick={handleFinishTest} style={{ width: '100%', padding: '12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                        Submit Test Now
                    </button>
                </div>
            </div>
        </div>
    );
}
