import React, { useState, useEffect, useRef } from 'react';
import { useSessionLogger } from '../../../../../../../hooks/useSessionLogger';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import '../../../Patterns.css';
import MathRenderer from '../../../../../../MathRenderer';
import mascotImg from '../../../../../../../assets/mascot.png';

function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

export default function PatternsPracticeEngine({ questionPool, sampleSize = 10, title, color, onBack , nodeId}) {
    const [questions, setQuestions] = useState(() => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        return sample(pool, sampleSize);
    });
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const v4Answers = useRef([]);
    const v4Finished = useRef(false);
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    useEffect(() => {
        if (!nodeId) return;
        v4Answers.current = [];
        v4Finished.current = false;
        startSession({ nodeId, sessionType: 'practice' });
        return () => { if (!v4Finished.current) abandonSession(); };
    }, [nodeId]);

    // Reset explanation visibility when moving between questions
    useEffect(() => {
        setShowExplanation(false);
    }, [qIndex]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questions[qIndex];
    const currentAnswer = answers[qIndex];
    const isAnswered = !!currentAnswer;
    const progress = ((qIndex + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        if (isAnswered) return;
        const isRight = idx === q.correct;
        setAnswers(prev => ({ 
            ...prev, 
            [qIndex]: { selectedOption: idx, isCorrect: isRight } 
        }));
        if (!isRight) setShowExplanation(true);
        if (nodeId) {
            v4Answers.current.push({
                question_index: qIndex,
                answer_json: JSON.stringify({ selected: idx }),
                is_correct: idx === q.correct,
                marks_awarded: idx === q.correct ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: 0,
            });
        }
    };

    const handleNext = () => {
        if (qIndex + 1 >= questions.length) { 
            setFinished(true); 
        } else { 
            setQIndex(c => c + 1); 
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(c => c - 1);
        }
    };

    const handleRetry = () => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        setQuestions(sample(pool, sampleSize));
        setQIndex(0); setAnswers({}); setFinished(false); setTimeTaken(0);
        v4Answers.current = [];
        v4Finished.current = false;
        if (nodeId) startSession({ nodeId, sessionType: 'practice' });
    };

    if (finished) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        
        return (
            <div className="pt-results-container" style={{ textAlign: 'center', padding: '60px 0', maxWidth: 800, margin: '0 auto' }}>
                <div style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '8px solid #fff'
                }}>
                    <div style={{ width: 100, height: 100, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>of {questions.length}</div>
                    </div>
                </div>
                <div style={{ display: 'inline-block', padding: '6px 16px', background: `${color}15`, color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{msg}</h2>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
                    <button className="pt-btn-primary" onClick={handleRetry} style={{ background: color }}>🔀 Try Again</button>
                    <button className="pt-btn-secondary" onClick={onBack}>Back to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '10px 24px' }}>
            <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 2 }}>Practice Session</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color, fontWeight: 900, background: `${color}10`, padding: '4px 10px', borderRadius: 8, display: 'inline-block', marginBottom: 4 }}>⏱️ {formatTime(timeTaken)}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Question <span style={{ color }}>{qIndex + 1}</span> of {questions.length}</div>
                    </div>
                </div>
                <div style={{ background: '#e2e8f0', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            <div className="pt-quiz-card">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color, marginBottom: 16 }}>
                    QUESTION {qIndex + 1}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.5, marginBottom: 24 }}>
                    <MathRenderer text={q.question} />
                </div>

                {q.visualSequence && (
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 30, background: '#f8fafc', padding: '20px', borderRadius: 16, border: '1px dashed #cbd5e1' }}>
                        {q.visualSequence.map((icon, idx) => (
                            <React.Fragment key={idx}>
                                <div style={{ width: 50, height: 50, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                    {icon}
                                </div>
                                {idx < q.visualSequence.length - 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                                        <ChevronRight size={20} />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        <div style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                            <ChevronRight size={20} />
                        </div>
                        <div style={{ width: 50, height: 50, background: `${color}10`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, border: `2px dashed ${color}`, fontWeight: 900 }}>
                            ?
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.05)', bg = '#fff', dot = '#cbd5e1', txtColor = '#334155', weight = 500;
                        const selected = currentAnswer?.selectedOption === oi;

                        if (isAnswered) {
                            if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.04)'; dot = '#10b981'; txtColor = '#059669'; weight = 700; }
                            else if (selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.04)'; dot = '#ef4444'; txtColor = '#dc2626'; weight = 700; }
                        } else if (selected) { border = color; bg = `${color}05`; dot = color; weight = 700; }

                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={isAnswered}
                                style={{ 
                                    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', 
                                    borderRadius: 14, border: `3px solid ${border}`, background: bg, 
                                    cursor: isAnswered ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                    boxShadow: selected && !isAnswered ? `0 6px 16px ${color}10` : 'none'
                                }}>
                                <div style={{ 
                                    width: 12, height: 12, borderRadius: '50%', 
                                    border: `2px solid ${dot}`,
                                    background: selected || (isAnswered && oi === q.correct) ? dot : 'transparent', flexShrink: 0 
                                }} />
                                <span style={{ fontSize: 15, fontWeight: weight, color: txtColor, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    {React.isValidElement(opt) ? opt : <MathRenderer text={opt} />}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {(isAnswered || showExplanation) && (
                    <div style={{ marginTop: 24, padding: '20px', borderRadius: 16, background: '#f0f9ff', border: '1px solid #e0f2fe', display: 'flex', gap: 16 }}>
                        <div style={{ width: 44, height: 44, flexShrink: 0 }}>
                            <img src={mascotImg} alt="Mascot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#0369a1' }}>
                            <strong style={{ marginBottom: 4, color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Lightbulb size={16} /> Explanation
                            </strong>
                            <MathRenderer text={q.explanation} />
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                <button 
                    onClick={handlePrevious} 
                    disabled={qIndex === 0} 
                    className="pt-btn-secondary"
                    style={{ opacity: qIndex === 0 ? 0.5 : 1 }}
                >
                    <ChevronLeft size={20} /> Previous
                </button>

                <button 
                    onClick={handleNext} 
                    disabled={!isAnswered}
                    className="pt-btn-primary"
                    style={{ 
                        padding: '12px 48px', background: isAnswered ? color : '#cbd5e1', 
                        cursor: isAnswered ? 'pointer' : 'not-allowed', boxShadow: isAnswered ? `0 8px 20px ${color}20` : 'none'
                    }}
                >
                    {qIndex + 1 >= questions.length ? 'Finish Session' : 'Next Question'} <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
