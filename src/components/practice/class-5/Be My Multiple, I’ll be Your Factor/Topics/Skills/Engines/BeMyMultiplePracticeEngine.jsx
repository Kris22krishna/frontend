import React, { useState, useEffect, useRef } from 'react';
import { useSessionLogger } from '../../../../../../../hooks/useSessionLogger';
import '../../../bemyfactor.css';
import { LatexText } from '@/components/LatexText';
import mascotImg from '../../../../../../../assets/mascot.png';

export default function BeMyMultiplePracticeEngine({ questionPool, sampleSize = 10, title, color, onBack , nodeId}) {
    const [questions, setQuestions] = useState([]);
    const [currIdx, setCurrIdx] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const v4Answers = useRef([]);
    const v4Finished = useRef(false);
    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        setQuestions(pool.slice(0, sampleSize).sort(() => 0.5 - Math.random()));
    }, [questionPool, sampleSize]);

    useEffect(() => {
        if (showResults || questions.length === 0) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [showResults, questions]);

    useEffect(() => {
        if (!nodeId) return;
        v4Answers.current = [];
        v4Finished.current = false;
        startSession({ nodeId, sessionType: 'practice' });
        return () => { if (!v4Finished.current) abandonSession(); };
    }, [nodeId]);

    const handleNext = () => {
        if (selectedOpt === questions[currIdx].correct) setScore(s => s + 1);
        
        if (currIdx < questions.length - 1) {
            setCurrIdx(currIdx + 1);
            setSelectedOpt(null);
            setIsSubmitted(false);
        } else {
            if (nodeId) {
                v4Answers.current.push({
                    question_index: currIdx,
                    answer_json: JSON.stringify({ selected: selectedOpt }),
                    is_correct: selectedOpt === questions[currIdx].correct,
                    marks_awarded: selectedOpt === questions[currIdx].correct ? 1 : 0,
                    marks_possible: 1,
                    time_taken_ms: 0,
                });
            }
            if (nodeId && !v4Finished.current) {
                v4Finished.current = true;
                finishSession({ answers_payload: v4Answers.current });
            }
            setShowResults(true);
        }
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (questions.length === 0) return <div className="ft-page"><div className="ft-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div></div>;

    if (showResults) {
        return (
            <div className="ft-page">
                <div className="ft-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div className="ft-quiz-card" style={{ textAlign: 'center', maxWidth: 500, width: '100%' }}>
                        <div style={{ fontSize: 64, marginBottom: 20 }}>{score > questions.length / 2 ? '🎉' : '💪'}</div>
                        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Practice Complete!</h2>
                        <p style={{ color: '#64748b', fontSize: 18, marginBottom: 12 }}>You scored <strong>{score}</strong> out of <strong>{questions.length}</strong></p>
                        <div style={{ background: `${color}15`, color: color, padding: '8px 16px', borderRadius: 100, display: 'inline-block', fontWeight: 700, marginBottom: 32 }}>⏱️ Time Taken: {formatTime(timeTaken)}</div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button className="ft-btn-primary" style={{ background: color }} onClick={() => window.location.reload()}>Try Again</button>
                            <button className="ft-btn-secondary" onClick={onBack}>Back to Hub</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const q = questions[currIdx];

    return (
        <div className="ft-page">
             <div className="ft-content" style={{ padding: '40px 20px' }}>
                <div className="ft-quiz-container">
                    <div className="ft-score-header">
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>{title}</div>
                            <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>Question {currIdx + 1} of {questions.length}</h2>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 12, fontWeight: 900, color: '#94a3b8' }}>TIMER</div>
                            <div style={{ fontSize: 24, fontWeight: 900, color }}>{formatTime(timeTaken)}</div>
                        </div>
                    </div>

                    <div className="ft-quiz-card">
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 32, lineHeight: 1.5 }}>
                            <LatexText text={q.question} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                            {q.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => !isSubmitted && setSelectedOpt(i)}
                                    style={{
                                        padding: '20px',
                                        borderRadius: 16,
                                        border: '2px solid',
                                        borderColor: isSubmitted ? (i === q.correct ? '#10b981' : (selectedOpt === i ? '#ef4444' : '#e2e8f0')) : (selectedOpt === i ? color : '#e2e8f0'),
                                        background: isSubmitted ? (i === q.correct ? '#f0fdf4' : (selectedOpt === i ? '#fef2f2' : '#fff')) : (selectedOpt === i ? `${color}08` : '#fff'),
                                        textAlign: 'left',
                                        fontSize: 16,
                                        fontWeight: 600,
                                        cursor: isSubmitted ? 'default' : 'pointer',
                                        transition: 'all 0.2s',
                                        color: isSubmitted ? (i === q.correct ? '#166534' : (selectedOpt === i ? '#991b1b' : '#64748b')) : (selectedOpt === i ? '#0f172a' : '#64748b'),
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span style={{ 
                                        display: 'inline-block', 
                                        width: 28, 
                                        height: 28, 
                                        borderRadius: 8, 
                                        background: isSubmitted ? (i === q.correct ? '#10b981' : (selectedOpt === i ? '#ef4444' : '#f1f5f9')) : (selectedOpt === i ? color : '#f1f5f9'),
                                        color: isSubmitted ? '#fff' : (selectedOpt === i ? '#fff' : '#94a3b8'),
                                        textAlign: 'center',
                                        lineHeight: '28px',
                                        marginRight: 12,
                                        fontSize: 14,
                                        fontWeight: 800,
                                        flexShrink: 0
                                    }}>{String.fromCharCode(65 + i)}</span>
                                    <LatexText text={opt} />
                                </button>
                            ))}
                        </div>

                        {isSubmitted && (
                            <div style={{ marginTop: 32, padding: 24, borderRadius: 16, background: selectedOpt === q.correct ? '#f0fdf4' : '#fef2f2', border: `1px solid ${selectedOpt === q.correct ? '#bbf7d0' : '#fecaca'}`, display: 'flex', gap: 20, alignItems: 'center' }}>
                                <img src={mascotImg} alt="Mascot" style={{ width: 60, height: 60, objectFit: 'contain' }} />
                                <div>
                                    <div style={{ fontWeight: 800, color: selectedOpt === q.correct ? '#166534' : '#991b1b', marginBottom: 4, fontSize: 18 }}>
                                        {selectedOpt === q.correct ? '✅ Correct! Brilliant!' : '❌ Not Quite Right!'}
                                    </div>
                                    <div style={{ fontSize: 14, color: selectedOpt === q.correct ? '#15803d' : '#b91c1c', lineHeight: 1.5 }}>
                                        <LatexText text={q.explanation} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'flex-end' }}>
                            {!isSubmitted ? (
                                <button 
                                    className="ft-btn-primary" 
                                    style={{ background: color, opacity: selectedOpt === null ? 0.5 : 1 }} 
                                    disabled={selectedOpt === null}
                                    onClick={() => setIsSubmitted(true)}
                                >Check Answer</button>
                            ) : (
                                <button className="ft-btn-primary" style={{ background: color }} onClick={handleNext}>
                                    {currIdx === questions.length - 1 ? 'See Results' : 'Next Question →'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
