import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../statistics_9.module.css';
import { LatexText } from '../../../../../../LatexText';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { StatisticsGraphMini } from '../../components/StatisticsGraphMini';
import mascotImg from '@/assets/mascot.png';

export default function StatisticsScenarioPracticeEngine({ scenarios = [], title, color = "#0f4c81", onBack, nodeId }) {
    const TOTAL_QUESTIONS = 20;

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        if (!scenarios || scenarios.length === 0) return;
        const pool = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            // ensuring we don't exceed scenarios length if it's <20, though utils generate exactly 20
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
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const isFinishedRef = useRef(false);

    // Initial load
    useEffect(() => {
        startSession({ nodeId: nodeId || 'stat9-skill-practice', sessionType: 'practice' });
    }, []); // eslint-disable-line

    // Timer
    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    // Modal Control (CRITICAL: decoupled to close automatically on new question)
    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    // Answer Persistence Restoration Hook
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

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleCheckAnswer = () => {
        if (isSubmitted) return;
        const cq = questions[qIndex];
        if (!cq || selectedOpt === null) return;

        const isCorrect = selectedOpt === cq.ans;

        if (isCorrect) setScore(s => s + 1);

        // State Storage
        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOpt, isCorrect }
        }));

        logAnswer({
            question_index: qIndex,
            answer_json: { 
                selected: selectedOpt, 
                correct_answer: cq.ans 
            },
            is_correct: isCorrect,
            marks_awarded: isCorrect ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0,
        });

        setIsSubmitted(true);
        setShowExplanationModal(true);
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            setQIndex(qIndex - 1);
        }
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
        startSession({ nodeId: nodeId || 'stat9-skill-practice', sessionType: 'practice' });
        setQIndex(0);
        setAnswers({});
        setSelectedOpt(null);
        setIsSubmitted(false);
        setScore(0);
        setFinished(false);
        setTimeTaken(0);
        setShowExplanationModal(false);
    };

    if (questions.length === 0) return null;
    
    // Final Report UI
    if (finished) {
        const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px', fontFamily: 'Outfit, sans-serif' }}>
                <div style={{ marginBottom: 40 }}>
                    <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        ← Back to Skills
                    </button>
                </div>

                <div style={{ width: 170, height: 170, borderRadius: '50%', background: `conic-gradient(#0f4c81 ${pct * 3.6}deg, #e2e8f0 0deg)`, margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ width: 150, height: 150, background: '#fdfbf7', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 56, fontWeight: 900, color: '#0f172a', lineHeight: 1, marginBottom: 4 }}>{score}</div>
                        <div style={{ fontSize: 15, color: '#64748b', fontWeight: 700 }}>out of {TOTAL_QUESTIONS}</div>
                    </div>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 24px', background: '#f1f5f9', color: '#334155', borderRadius: 50, fontSize: 16, fontWeight: 700, marginBottom: 40 }}>
                    <span style={{ fontSize: 18 }}>⏱️</span> Time Taken: {formatTime(timeTaken)}
                </div>

                <div style={{ fontSize: 60, marginBottom: 16, lineHeight: 1 }}>
                    {pct >= 85 ? '🏆' : pct >= 65 ? '🌟' : '💪'}
                </div>

                <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                    {pct >= 85 ? 'Excellent!' : pct >= 65 ? 'Well done!' : 'Keep Learning!'}
                </h2>
                
                <p style={{ color: '#64748b', fontSize: 16, margin: '0 0 32px' }}>
                    {pct >= 85 ? 'You have mastered this skill. Great job!' : 'Review the concepts and try again for 100%.'}
                </p>

                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <button onClick={handleRetry} style={{ padding: '14px 40px', background: '#fff', border: '2px solid #0f4c81', color: '#0f4c81', borderRadius: 50, fontSize: 16, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>
                        Try Again
                    </button>
                    <button onClick={onBack} style={{ padding: '14px 40px', background: '#0f4c81', border: '2px solid #0f4c81', color: '#fff', borderRadius: 50, fontSize: 16, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>
                        Back to Skills
                    </button>
                </div>
            </div>
        );
    }

    const cq = questions[qIndex];
    const progress = (qIndex / TOTAL_QUESTIONS) * 100;
    const past = answers[qIndex] || {};
    const canSubmit = selectedOpt !== null;

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 16 }}>
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

            {/* Question Card */}
            <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                    QUESTION {qIndex + 1} of {TOTAL_QUESTIONS}
                </div>

                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 24 }}>
                    <LatexText text={cq.q} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30, padding: 20, background: '#f8fafc', borderRadius: 20 }}>
                    <StatisticsGraphMini config={cq.svg} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {cq.opts.map((opt, oi) => {
                        let borderColor = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a', dot = '#f1f5f9';
                        if (isSubmitted) {
                            if (oi === cq.ans) { borderColor = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; dot = '#10b981'; }
                            else if (oi === selectedOpt) { borderColor = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txtColor = '#ef4444'; dot = '#ef4444'; }
                        } else if (selectedOpt === oi) { borderColor = color; bg = `${color}05`; dot = color; }

                        return (
                            <button 
                                key={oi} 
                                onClick={() => !isSubmitted && setSelectedOpt(oi)} 
                                disabled={isSubmitted}
                                style={{ 
                                    display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', 
                                    borderRadius: 16, border: `2.5px solid ${borderColor}`, background: bg, 
                                    cursor: isSubmitted ? 'default' : 'pointer', fontSize: 16, color: txtColor, 
                                    textAlign: 'left', transition: 'all 0.2s', fontWeight: selectedOpt === oi ? 700 : 500
                                }}
                            >
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                                <span><LatexText text={opt} /></span>
                            </button>
                        );
                    })}
                </div>

                {isSubmitted && showExplanationModal && (
                    <div style={{ marginTop: 24, padding: '20px', borderRadius: 16, background: past.isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1.5px solid ${past.isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`, display: 'flex', gap: 16, alignItems: 'center' }}>
                        <img src={mascotImg} alt="Mascot" style={{ width: 60, height: 60 }} />
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: past.isCorrect ? '#059669' : '#b91c1c' }}>
                                    {past.isCorrect ? 'Correct!' : 'Incorrect.'}
                                </h4>
                            </div>
                            <div style={{ fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                                <LatexText text={cq.expl} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
                <button 
                    onClick={handlePrev} 
                    disabled={qIndex === 0}
                    style={{ padding: '14px 24px', background: 'transparent', color: qIndex === 0 ? '#cbd5e1' : '#64748b', cursor: qIndex === 0 ? 'not-allowed' : 'pointer', border: `2px solid ${qIndex === 0 ? '#e2e8f0' : '#cbd5e1'}`, borderRadius: 100, fontSize: 15, fontWeight: 800, transition: 'all 0.2s' }}
                >
                    ← Previous
                </button>
                
                {!isSubmitted ? (
                    <button 
                        onClick={handleCheckAnswer} 
                        disabled={!canSubmit}
                        style={{ padding: '14px 48px', background: canSubmit ? color : '#f1f5f9', color: canSubmit ? '#fff' : '#94a3b8', cursor: canSubmit ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontSize: 16, fontWeight: 800, boxShadow: canSubmit ? `0 8px 20px ${color}40` : 'none', transition: 'all 0.2s' }}
                    >
                        Check Answer ✓
                    </button>
                ) : (
                    <button 
                        onClick={handleNext}
                        style={{ padding: '14px 48px', background: color, color: '#fff', cursor: 'pointer', border: 'none', borderRadius: 100, fontSize: 16, fontWeight: 800, boxShadow: `0 8px 20px ${color}40`, transition: 'all 0.2s' }}
                    >
                        {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Practice 🏁' : 'Next Question →'}
                    </button>
                )}
            </div>
        </div>
    );
}
