import React, { useState } from 'react';
import '../../../mappingyourway.css';
import MathRenderer from '../../../../../../MathRenderer';

function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

export default function MappingYourWayAssessmentEngine({ questions: rawQuestions, title, color, onBack, onSecondaryBack }) {
    const [questions] = useState(() => {
        const pool = typeof rawQuestions === 'function' ? rawQuestions() : rawQuestions;
        return sample(pool, Math.min(10, pool.length));
    });

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const q = questions[current];

    const isAllAnswered = answers.every(a => a !== null);
    const correctCount = answers.filter((a, i) => a === questions[i].correct).length;
    const isPassing = correctCount >= questions.length * 0.7;

    const handleSelect = (idx) => {
        if (submitted) return;
        const next = [...answers];
        next[current] = idx;
        setAnswers(next);
    };

    const handleNext = () => {
        if (current < questions.length - 1) setCurrent(c => c + 1);
        else if (isAllAnswered) setSubmitted(true);
    };

    const handlePrev = () => {
        if (current > 0) setCurrent(c => c - 1);
    };

    if (showSummary) {
        return (
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>Assessment Review</h2>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{title}</div>
                    </div>
                    <button className="myw-btn-secondary" onClick={() => setShowSummary(false)}>Back to Score</button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questions.map((qn, i) => {
                        const isCorrect = answers[i] === qn.correct;
                        return (
                            <div key={i} style={{ 
                                background: '#fff', padding: '24px 32px', borderRadius: 20, 
                                border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)' 
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <div style={{ 
                                        width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: isCorrect ? '#10b981' : '#ef4444', color: '#fff', fontSize: 13, fontWeight: 800
                                    }}>{i + 1}</div>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: isCorrect ? '#10b981' : '#ef4444', textTransform: 'uppercase', letterSpacing: 1 }}>
                                        {isCorrect ? 'Correct' : 'Incorrect'}
                                    </div>
                                </div>
                                
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 16, lineHeight: 1.5 }}>
                                    <MathRenderer text={qn.question} />
                                </div>
                                
                                <div className="myw-summary-split">
                                    <div className="myw-summary-item">
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Correct Answer</div>
                                        <div style={{ color: '#059669', fontWeight: 700 }}><MathRenderer text={qn.options[qn.correct].toString()} /></div>
                                    </div>
                                    {!isCorrect && answers[i] !== null && (
                                        <div className="myw-summary-item user-ans">
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Your Answer</div>
                                            <div style={{ color: '#dc2626', fontWeight: 600, textDecoration: 'line-through' }}><MathRenderer text={qn.options[answers[i]].toString()} /></div>
                                        </div>
                                    )}
                                </div>
                                
                                <div style={{ marginTop: 16, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, fontSize: 13, color: '#475569', lineHeight: 1.5, borderLeft: '3px solid #cbd5e1' }}>
                                    <strong style={{ color: '#0f172a' }}>Explanation: </strong> <MathRenderer text={qn.explanation} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0', maxWidth: 800, margin: '0 auto' }}>
                 <div style={{ fontSize: 72, marginBottom: 20, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}>
                    {isPassing ? '🎓' : '📚'}
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>
                    {isPassing ? 'Assessment Passed!' : 'Need More Practice'}
                </h2>
                <p style={{ color: '#64748b', fontSize: 16, margin: '0 0 32px', maxWidth: 400, marginInline: 'auto' }}>
                    {isPassing 
                        ? 'Excellent conceptual understanding of Maps and Scales.' 
                        : 'Review the explanations to understand where you went wrong.'}
                </p>

                <div style={{ display: 'inline-block', background: '#fff', padding: '32px 48px', borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: 32 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Final Score</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
                        <span style={{ fontFamily: 'Outfit', fontSize: 56, fontWeight: 900, color: isPassing ? '#10b981' : '#f59e0b', lineHeight: 1 }}>{correctCount}</span>
                        <span style={{ fontSize: 24, fontWeight: 700, color: '#94a3b8' }}>/{questions.length}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <button className="myw-btn-primary" onClick={() => setShowSummary(true)} style={{ background: color }}>📝 Review Answers</button>
                    <button className="myw-btn-secondary" onClick={onBack}>Return to Module</button>
                </div>
            </div>
        );
    }

    return (
        <div className="myw-assessment-layout">
            <aside className="myw-assessment-palette">
                <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2 }}>Question Palette</div>
                <div className="myw-palette-grid">
                    {questions.map((_, i) => {
                        let cls = 'myw-palette-btn';
                        if (i === current) cls += ' current';
                        else if (answers[i] !== null) cls += ' answered';
                        return (
                            <button key={i} className={cls} onClick={() => setCurrent(i)}>{i + 1}</button>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                        <div style={{ width: 12, height: 12, borderRadius: 3, background: '#166534' }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                        <div style={{ width: 12, height: 12, borderRadius: 3, background: '#f8fafc', border: '1px solid #e2e8f0' }} /> Not Answered
                    </div>
                </div>
            </aside>

            <main style={{ flex: 1 }}>
                <div className="myw-score-header">
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fee2e2', color: '#dc2626', padding: '6px 12px', borderRadius: 50, fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
                            <span style={{ fontSize: 16 }}>🎯</span> Assessment Mode
                        </div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <button 
                        className="myw-btn-primary"
                        onClick={() => setSubmitted(true)}
                        disabled={!isAllAnswered}
                        style={{ 
                            background: isAllAnswered ? '#10b981' : '#e2e8f0', 
                            color: isAllAnswered ? '#fff' : '#94a3b8',
                            boxShadow: isAllAnswered ? '0 8px 20px rgba(16,185,129,0.2)' : 'none',
                            padding: '10px 24px'
                        }}
                    >
                        Submit Assessment
                    </button>
                </div>

                <div className="myw-quiz-card">
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
                        Question {current + 1}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 32 }}>
                        <MathRenderer text={q.question} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {q.options.map((opt, oi) => {
                            const isSel = answers[current] === oi;
                            return (
                                <button key={oi} onClick={() => handleSelect(oi)}
                                    style={{ 
                                        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', 
                                        borderRadius: 16, border: `2px solid ${isSel ? color : '#e2e8f0'}`, 
                                        background: isSel ? `${color}08` : '#fff', cursor: 'pointer', textAlign: 'left', 
                                        transition: 'all 0.2s',
                                        boxShadow: isSel ? `0 4px 12px ${color}15` : 'none'
                                    }}>
                                    <div style={{ 
                                        width: 20, height: 20, borderRadius: '50%', border: `2px solid ${isSel ? color : '#cbd5e1'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                                    }}>
                                        {isSel && <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />}
                                    </div>
                                    <span style={{ fontSize: 15, fontWeight: isSel ? 700 : 500, color: isSel ? color : '#334155' }}>
                                        <MathRenderer text={opt.toString()} />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                    <button className="myw-btn-secondary" onClick={handlePrev} style={{ opacity: current === 0 ? 0.5 : 1, pointerEvents: current === 0 ? 'none' : 'auto' }}>← Previous</button>
                    <button className="myw-btn-secondary" onClick={handleNext} style={{ background: current === questions.length - 1 ? (isAllAnswered ? '#10b981' : '#f8fafc') : '#fff', color: current === questions.length - 1 && isAllAnswered ? '#fff' : 'inherit', border: current === questions.length - 1 && isAllAnswered ? 'none' : '' }}>
                        {current === questions.length - 1 ? (isAllAnswered ? 'Ready to Submit' : 'Finish Answering') : 'Next →'}
                    </button>
                </div>
            </main>
        </div>
    );
}
