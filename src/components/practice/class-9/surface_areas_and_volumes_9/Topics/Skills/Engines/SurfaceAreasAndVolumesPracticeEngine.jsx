import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../surface_areas_and_volumes_9.module.css';
import { LatexText } from '../../../../../../LatexText';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { generateQuestions } from './SurfaceAreasAndVolumesScenarioUtils';
import mascotImg from '@/assets/mascot.png';

export default function SurfaceAreasAndVolumesPracticeEngine({ skillId, color = "#0f4c81", onBack, nodeId }) {
    const TOTAL_QUESTIONS = 20;

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const pool = generateQuestions(skillId, TOTAL_QUESTIONS);
        setQuestions(pool);
    }, [skillId]);

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
        startSession({ nodeId: nodeId || `sav-9-skill-${skillId}`, sessionType: 'practice' });
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

    // State Restoration
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

        const isCorrect = selectedOpt === cq.correctIndex;
        if (isCorrect) setScore(s => s + 1);

        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOpt, isCorrect }
        }));

        logAnswer({
            question_index: qIndex,
            answer_json: {
                selected: selectedOpt,
                correct_answer: cq.correctIndex
            },
            is_correct: isCorrect,
            marks_awarded: isCorrect ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0,
        });

        setIsSubmitted(true);
    };

    const handlePrev = () => {
        if (qIndex > 0) setQIndex(qIndex - 1);
    };

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
        startSession({ nodeId: nodeId || `sav-9-skill-${skillId}`, sessionType: 'practice' });
        setQIndex(0);
        setAnswers({});
        setSelectedOpt(null);
        setIsSubmitted(false);
        setScore(0);
        setFinished(false);
        setTimeTaken(0);
    };

    if (questions.length === 0) return null;

    if (finished) {
        const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px', fontFamily: 'Outfit, sans-serif' }}>
                <div style={{ marginBottom: 40 }}>
                    <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Outfit, sans-serif' }}>
                        ← Back to Skills
                    </button>
                </div>

                <div style={{ width: 170, height: 170, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #e2e8f0 0deg)`, margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 150, height: 150, background: '#fdfbf7', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 56, fontWeight: 900, color: '#0f172a', lineHeight: 1, marginBottom: 4 }}>{score}</div>
                        <div style={{ fontSize: 15, color: '#64748b', fontWeight: 700 }}>out of {TOTAL_QUESTIONS}</div>
                    </div>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 24px', background: '#f1f5f9', color: '#334155', borderRadius: 50, fontSize: 16, fontWeight: 700, marginBottom: 40 }}>
                    <span style={{ fontSize: 18 }}>⏱️</span> Time Taken: {formatTime(timeTaken)}
                </div>

                <div style={{ fontSize: 60, marginBottom: 16, lineHeight: 1 }}>
                    {pct >= 85 ? '🏆' : pct >= 65 ? '🌟' : '💪'}
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                    {pct >= 85 ? 'Excellent!' : pct >= 65 ? 'Well done!' : 'Keep Learning!'}
                </h2>

                <p style={{ color: '#64748b', fontSize: 16, margin: '0 0 32px' }}>
                    {pct >= 85 ? 'You have mastered this skill. Great job!' : 'Review the concepts and try again for 100%.'}
                </p>

                <button onClick={onBack} style={{ padding: '14px 40px', background: '#fff', border: `2px solid ${color}`, color: color, borderRadius: 50, fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s' }}>
                    Back to Skills
                </button>
            </div>
        );
    }

    const cq = questions[qIndex];
    const progress = (qIndex / TOTAL_QUESTIONS) * 100;
    const past = answers[qIndex] || {};
    const canSubmit = selectedOpt !== null;

    return (
        <div className={styles['quiz-container']}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className={styles['score-header']}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Practice</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>Surface Areas & Volumes</h3>
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

                {/* SVG Visualizations */}
                {cq.svg && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                        {cq.svg}
                    </div>
                )}

                {/* MCQ Options */}
                <div className={styles['quiz-options']}>
                    {cq.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a', dot = '#f1f5f9';
                        if (isSubmitted) {
                            if (oi === cq.correctIndex) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; dot = '#10b981'; }
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

                {/* Feedback & Explanation */}
                {isSubmitted && (
                    <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 14, background: past.isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1.5px solid ${past.isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            {past.isCorrect && <img src={mascotImg} alt="Mascot" style={{ width: 40, height: 40, objectFit: 'contain' }} />}
                            {!past.isCorrect && <div style={{ fontSize: 24 }}>💡</div>}
                            <h4 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: past.isCorrect ? '#059669' : '#b91c1c' }}>
                                {past.isCorrect ? 'Excellent job!' : 'Not quite right.'}
                            </h4>
                        </div>

                        <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.65, marginTop: 12, paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                            <strong style={{ color: '#0f172a', display: 'block', marginBottom: 8 }}>Step-by-step Explanation:</strong>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                <LatexText text={cq.explanation} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingBottom: 60 }}>
                <button
                    onClick={handlePrev}
                    disabled={qIndex === 0}
                    style={{ padding: '14px 28px', borderRadius: 14, background: '#fff', border: '1px solid #e2e8f0', color: qIndex === 0 ? '#94a3b8' : '#334155', fontSize: 15, fontWeight: 700, cursor: qIndex === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: qIndex === 0 ? 0.5 : 1 }}
                >
                    Previous
                </button>

                {isSubmitted ? (
                    <button
                        onClick={handleNext}
                        style={{ padding: '14px 32px', borderRadius: 14, background: color, border: 'none', color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', boxShadow: `0 8px 20px ${color}40` }}
                    >
                        {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Practice' : 'Next Question'}
                    </button>
                ) : (
                    <button
                        onClick={handleCheckAnswer}
                        disabled={!canSubmit}
                        style={{ padding: '14px 32px', borderRadius: 14, background: canSubmit ? color : '#e2e8f0', border: 'none', color: canSubmit ? '#fff' : '#94a3b8', fontSize: 16, fontWeight: 800, cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: canSubmit ? `0 8px 20px ${color}40` : 'none' }}
                    >
                        Check Answer
                    </button>
                )}
            </div>
        </div>
    );
}
