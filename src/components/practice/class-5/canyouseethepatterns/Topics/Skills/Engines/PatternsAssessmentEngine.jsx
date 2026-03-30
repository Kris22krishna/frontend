import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function PatternsAssessmentEngine({ questions: questionPool, sampleSize = 10, title, color, onBack, onSecondaryBack }) {
    const [questions] = useState(() => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        return sample(pool, sampleSize);
    });
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(sampleSize).fill(null));
    const [timeLeft, setTimeLeft] = useState(sampleSize * 60); 
    const [finished, setFinished] = useState(false);

    const finish = useCallback(() => setFinished(true), []);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { finish(); return; }
        const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
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
    };

    const handleSubmit = () => {
        if (answers.includes(null)) {
            if (!window.confirm('You have unanswered questions. Submit anyway?')) return;
        }
        finish();
    };

    const q = questions[current];

    if (finished) {
        const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Progress!' : pct >= 50 ? '👍 Keep Going!' : '💪 More Practice Needed!';

        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{title} Assessment</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
                        Assessment Complete ✅
                    </h2>
                    <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questions.length}</div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}% — {msg}</div>
                    
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                         <button className="pt-btn-primary" onClick={() => window.location.reload()} style={{ background: color }}>Retake</button>
                         <button className="pt-btn-secondary" onClick={onBack}>Back to Skills</button>
                         {onSecondaryBack && <button className="pt-btn-secondary" onClick={onSecondaryBack}>Chapter Home</button>}
                    </div>
                </div>

                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>📋 Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questions.map((q, i) => {
                        const userAns = answers[i];
                        const isCorrect = userAns === q.correct;
                        return (
                            <div key={i} style={{
                                background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)',
                                borderRadius: 16, padding: '24px',
                                border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                            }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div style={{ fontSize: 20 }}>{isCorrect ? '✅' : '❌'}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', textTransform: 'uppercase', marginBottom: 4 }}>Question {i + 1}</div>
                                        <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}><MathRenderer text={q.question} /></div>
                                    </div>
                                </div>

                                {q.visualSequence && (
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                                        {q.visualSequence.map((icon, idx) => (
                                            <div key={idx} style={{ padding: 8, background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex' }}>
                                                {icon}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
                                    <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 12, padding: '12px 16px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 6 }}>Correct Answer</div>
                                        <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>
                                            {React.isValidElement(q.options[q.correct]) ? q.options[q.correct] : <MathRenderer text={q.options[q.correct]} />}
                                        </div>
                                    </div>
                                    <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 12, padding: '12px 16px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', textTransform: 'uppercase', marginBottom: 6 }}>Your Answer</div>
                                        <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>
                                            {userAns !== null ? (React.isValidElement(q.options[userAns]) ? q.options[userAns] : <MathRenderer text={q.options[userAns]} />) : '— Not Answered —'}
                                        </div>
                                    </div>
                                </div>
                                {q.explanation && (
                                    <div style={{ marginTop: 16, padding: '16px', borderRadius: 12, background: '#fff', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: 12 }}>
                                        <img src={mascotImg} alt="Mascot" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                                        <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                                            <strong style={{ color: '#0369a1' }}>💡 Explanation: </strong><MathRenderer text={q.explanation} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="pt-assessment-layout" style={{ display: 'flex', gap: 24, padding: '20px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5 }}>Assessment Mode</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                </div>

                <div className="pt-quiz-card">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color, marginBottom: 16 }}>
                        QUESTION {current + 1} OF {questions.length}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.5, marginBottom: 20 }}>
                        <MathRenderer text={q.question} />
                    </div>

                    {q.visualSequence && (
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 30, background: '#f8fafc', padding: '20px', borderRadius: 16, border: '1px dashed #cbd5e1' }}>
                            {q.visualSequence.map((icon, idx) => (
                                <React.Fragment key={idx}>
                                    <div style={{ width: 50, height: 50, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                        {icon}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                                        <ChevronRight size={20} />
                                    </div>
                                </React.Fragment>
                            ))}
                            <div style={{ width: 50, height: 50, background: `${color}10`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, border: `2px dashed ${color}`, fontWeight: 900 }}>
                                ?
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {q.options.map((opt, oi) => {
                            const isSelected = answers[current] === oi;
                            return (
                                <button key={oi} onClick={() => handleSelect(oi)}
                                    style={{ 
                                        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', 
                                        borderRadius: 14, border: `3px solid ${isSelected ? color : 'rgba(0,0,0,0.05)'}`, 
                                        background: isSelected ? `${color}05` : '#fff', 
                                        cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                        boxShadow: isSelected ? `0 6px 16px ${color}10` : 'none'
                                    }}>
                                    <div style={{ 
                                        width: 12, height: 12, borderRadius: '50%', 
                                        border: `2px solid ${isSelected ? color : '#cbd5e1'}`,
                                        background: isSelected ? color : 'transparent', flexShrink: 0 
                                    }} />
                                    <span style={{ fontSize: 15, fontWeight: isSelected ? 700 : 500, color: isSelected ? color : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                        {React.isValidElement(opt) ? opt : <MathRenderer text={opt} />}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                    <button className="pt-btn-secondary" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
                        style={{ opacity: current === 0 ? 0 : 1 }}>← Previous</button>
                    {current + 1 === questions.length ? (
                        <button className="pt-btn-primary" onClick={handleSubmit} style={{ background: '#ef4444' }}>
                            Submit Assessment
                        </button>
                    ) : (
                        <button className="pt-btn-primary" onClick={() => setCurrent(c => c + 1)} style={{ background: color }}>
                            Next →
                        </button>
                    )}
                </div>
            </div>

            <aside style={{ width: 240, flexShrink: 0 }}>
                <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0', position: 'sticky', top: 20 }}>
                     <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        padding: '12px', borderRadius: 12, marginBottom: 16, fontWeight: 900, fontSize: 18,
                        background: timeLeft < 60 ? 'rgba(239,68,68,0.1)' : `${color}0D`,
                        color: timeLeft < 60 ? '#ef4444' : color,
                        border: `1px solid ${timeLeft < 60 ? 'rgba(239,68,68,0.2)' : 'rgba(0,0,0,0.05)'}`
                    }}>
                        ⏱️ {formatTime(timeLeft)}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                        {questions.map((_, i) => (
                            <button key={i} onClick={() => setCurrent(i)}
                                style={{
                                    aspectRatio: '1/1', borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: 'pointer',
                                    border: current === i ? `3px solid ${color}` : '1px solid #e2e8f0',
                                    background: answers[i] !== null ? color : '#f8fafc',
                                    color: answers[i] !== null ? '#fff' : '#0f172a'
                                }}>
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button onClick={handleSubmit}
                        style={{ background: '#ef4444', width: '100%', padding: '12px', marginTop: 24, fontSize: 13, borderRadius: 12, color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                        Submit Test
                    </button>
                </div>
            </aside>
        </div>
    );
}
