import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKILLS } from './SetsSkillsData';
import '../../SetsBranch.css';
import MathRenderer from '../../../../MathRenderer';
import { ArrowLeft, BookOpen, Target, ShieldCheck, ChevronRight } from 'lucide-react';

export default function SetsSkills() {
    const navigate = useNavigate();
    const [activeSkillId, setActiveSkillId] = useState(null);
    const [view, setView] = useState('list'); // 'list' | 'learn' | 'practice' | 'assess'

    const skill = SKILLS.find(s => s.id === activeSkillId);

    /* ── Render Skills List ──────────────────────────────── */
    if (view === 'list') {
        return (
            <div className="sets-page">
                <nav className="sets-nav">
                    <button className="sets-nav-back" onClick={() => navigate('/senior/grade/11/maths/sets')}>
                        ← Back to Dashboard
                    </button>
                    <div className="sets-nav-links">
                        <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/introduction')}>🌟 Intro</button>
                        <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/terminology')}>📖 Terminology</button>
                        <button className="sets-nav-link active" onClick={() => setView('list')}>🎯 Skills</button>
                    </div>
                </nav>

                <div className="sets-hero">
                    <h1 className="sets-hero-title">Core <span style={{ color: '#818cf8' }}>Skills</span></h1>
                    <p className="sets-hero-sub">Practice makes perfect. Choose a skill to start your journey.</p>
                </div>

                <div className="sets-skills-grid">
                    {SKILLS.map(s => (
                        <div key={s.id} className="sets-skill-card" style={{ '--skill-color': s.color }}>
                            <div className="sets-skill-icon" style={{ background: `${s.color}15`, color: s.color }}>
                                {s.icon}
                            </div>
                            <div className="sets-skill-info">
                                <h3 className="sets-skill-title">{s.title}</h3>
                                <p className="sets-skill-desc">{s.desc}</p>
                            </div>
                            <div className="sets-skill-actions">
                                <button className="sets-btn sets-btn-outline" onClick={() => { setActiveSkillId(s.id); setView('learn'); }}>Learn</button>
                                <button className="sets-btn sets-btn-outline" onClick={() => { setActiveSkillId(s.id); setView('practice'); }}>Practice</button>
                                <button className="sets-btn sets-btn-filled" style={{ '--skill-color': s.color }} onClick={() => { setActiveSkillId(s.id); setView('assess'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    /* ── Render Individual Skill Views ───────────────────── */
    return (
        <div className="sets-page">
            <nav className="sets-nav">
                <button className="sets-nav-back" onClick={() => { setView('list'); setActiveSkillId(null); }}>
                    ← Back to Skills
                </button>
                <div className="sets-nav-links">
                    <button className={`sets-nav-link ${view === 'learn' ? 'active' : ''}`} onClick={() => setView('learn')}>📖 Learn</button>
                    <button className={`sets-nav-link ${view === 'practice' ? 'active' : ''}`} onClick={() => setView('practice')}>🎯 Practice</button>
                    <button className={`sets-nav-link ${view === 'assess' ? 'active' : ''}`} onClick={() => setView('assess')}>🏆 Assess</button>
                </div>
            </nav>

            <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }}>
                {view === 'learn' && <LearnView skill={skill} onPractice={() => setView('practice')} />}
                {view === 'practice' && <PracticeView skill={skill} onAssess={() => setView('assess')} />}
                {view === 'assess' && <AssessView skill={skill} onComplete={() => setView('list')} />}
            </main>
        </div>
    );
}

/* ── Learn View Component ─────────────────────────────── */
function LearnView({ skill, onPractice }) {
    return (
        <div className="sets-details-window">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{skill.icon}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: skill.color, margin: 0 }}>{skill.learn.title}</h2>
            </div>

            <div style={{ fontSize: 18, color: 'var(--sets-text)', lineHeight: 1.7, marginBottom: 32, whiteSpace: 'pre-line' }}>
                <MathRenderer text={skill.learn.content} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                <div>
                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 2, color: skill.color, marginBottom: 16, fontWeight: 800 }}>Key Rules</h4>
                    {skill.learn.rules.map((rule, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: skill.color, color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</div>
                            <p style={{ margin: 0, fontSize: 15, color: 'var(--sets-muted)' }}><MathRenderer text={rule} /></p>
                        </div>
                    ))}
                </div>
                <div>
                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 2, color: 'var(--sets-teal)', marginBottom: 16, fontWeight: 800 }}>Quick Examples</h4>
                    {skill.learn.examples.map((ex, idx) => (
                        <div key={idx} style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                            <div style={{ color: 'var(--sets-indigo)', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>Q: {ex.q}</div>
                            <div style={{ color: 'var(--sets-text)', fontSize: 15 }}>A: {ex.a}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: 40, textAlign: 'center' }}>
                <button className="sets-btn-filled" style={{ '--skill-color': skill.color, padding: '14px 40px' }} onClick={onPractice}>
                    Start Practice Problems →
                </button>
            </div>
        </div>
    );
}

/* ── Practice View Component ─────────────────────────── */
function PracticeView({ skill, onAssess }) {
    const [qIdx, setQIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = skill.practice[qIdx];

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.correct) setScore(s => s + 1);
    };

    const next = () => {
        if (qIdx + 1 < skill.practice.length) {
            setQIdx(i => i + 1);
            setSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return (
            <div className="sets-quiz-window" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Practice Complete!</h2>
                <p style={{ fontSize: 18, color: 'var(--sets-muted)', marginBottom: 40 }}>You got {score} out of {skill.practice.length} correct.</p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <button className="sets-btn-outline" onClick={() => { setQIdx(0); setScore(0); setFinished(false); setSelected(null); setAnswered(false); }}>Redo Practice</button>
                    <button className="sets-btn-filled" style={{ '--skill-color': skill.color }} onClick={onAssess}>Take Assessment🏆</button>
                </div>
            </div>
        );
    }

    return (
        <div className="sets-quiz-window">
            <div style={{ fontSize: 12, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Question {qIdx + 1} of {skill.practice.length}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--sets-text)', marginBottom: 32 }}>
                <MathRenderer text={q.question} />
            </div>
            <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                {q.options.map((opt, idx) => {
                    let status = '';
                    if (answered) {
                        if (idx === q.correct) status = 'correct';
                        else if (idx === selected) status = 'wrong';
                    }
                    return (
                        <button key={idx} className={`sets-quiz-option ${status}`} onClick={() => handleSelect(idx)} disabled={answered}>
                            <MathRenderer text={opt} />
                        </button>
                    );
                })}
            </div>
            {answered && (
                <div style={{ background: `${skill.color}08`, padding: 20, borderRadius: 14, border: `1px solid ${skill.color}20`, marginBottom: 32 }}>
                    <p style={{ margin: 0, fontSize: 15, color: 'var(--sets-muted)' }}>
                        <strong style={{ color: skill.color }}>Explain: </strong> {q.explanation}
                    </p>
                </div>
            )}
            <div style={{ textAlign: 'center' }}>
                <button className="sets-btn-filled" style={{ '--skill-color': skill.color, padding: '12px 40px', opacity: answered ? 1 : 0.5 }} disabled={!answered} onClick={next}>
                    {qIdx + 1 === skill.practice.length ? 'Finish' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

/* ── Assess View Component (Simplified) ──────────────── */
/* ── Assess View Component (Advanced) ───────────────── */
function AssessView({ skill, onComplete }) {
    const [qIdx, setQIdx] = useState(0);
    const [responses, setResponses] = useState({}); // { qIdx: { selectedOptions, textAnswer, submitted, isCorrect } }
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [testStartedAt] = useState(Date.now());

    const questions = skill.assessment;
    const q = questions[qIdx];
    const currentResponse = responses[qIdx] || { selectedOptions: [], textAnswer: '', submitted: false };

    // Timer Logic
    React.useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(Math.floor((Date.now() - testStartedAt) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults, testStartedAt]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionToggle = (idx) => {
        if (currentResponse.submitted) return;
        let newSelected = [...currentResponse.selectedOptions];
        if (q.type === 'mcq') {
            newSelected = [idx];
        } else if (q.type === 'msq') {
            newSelected = newSelected.includes(idx) 
                ? newSelected.filter(i => i !== idx) 
                : [...newSelected, idx];
        }
        setResponses(prev => ({
            ...prev,
            [qIdx]: { ...currentResponse, selectedOptions: newSelected }
        }));
    };

    const handleTextChange = (val) => {
        if (currentResponse.submitted) return;
        setResponses(prev => ({
            ...prev,
            [qIdx]: { ...currentResponse, textAnswer: val }
        }));
    };

    const handleSubmit = () => {
        if (currentResponse.submitted) return;
        
        let isCorrect = false;
        if (q.type === 'mcq') {
            isCorrect = currentResponse.selectedOptions[0] === q.correct;
        } else if (q.type === 'msq') {
            isCorrect = q.correct.length === currentResponse.selectedOptions.length && 
                        q.correct.every(val => currentResponse.selectedOptions.includes(val));
        } else {
            const cleanUser = currentResponse.textAnswer.trim().toLowerCase().replace(/\s/g, '');
            const cleanTarget = q.answer.trim().toLowerCase().replace(/\s/g, '');
            isCorrect = cleanUser === cleanTarget;
        }

        setResponses(prev => ({
            ...prev,
            [qIdx]: { ...currentResponse, submitted: true, isCorrect }
        }));
    };

    const handleNext = () => {
        if (qIdx + 1 < questions.length) {
            setQIdx(qIdx + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrev = () => {
        if (qIdx > 0) setQIdx(qIdx - 1);
    };

    if (showResults) {
        const correctCount = Object.values(responses).filter(r => r.isCorrect).length;
        const percentage = Math.round((correctCount / questions.length) * 100);
        
        return (
            <div className="sets-details-window" style={{ textAlign: 'center', padding: '60px 24px' }}>
                <div style={{ fontSize: 72, marginBottom: 24 }}>{percentage >= 70 ? '🎉' : '📚'}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Assessment Result</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 600, margin: '0 auto 40px' }}>
                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 20, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>Score</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--sets-indigo)' }}>{correctCount} / {questions.length}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 20, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>Accuracy</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#10b981' }}>{percentage}%</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 20, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>Time taken</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#f59e0b' }}>{formatTime(timeElapsed)}</div>
                    </div>
                </div>

                <p style={{ color: 'var(--sets-muted)', fontSize: 18, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
                    {percentage >= 90 ? 'Perfect Mastery! You are a Sets expert.' : 
                     percentage >= 70 ? 'Great job! You have a solid grasp of this skill.' : 
                     'A good start. Review the Learn section and try again to improve your score.'}
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <button className="sets-btn-outline" onClick={() => window.location.reload()}>Retake Test</button>
                    <button className="sets-btn-filled" style={{ '--skill-color': skill.color }} onClick={onComplete}>Back to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div className="sets-assess-layout">
            {/* Left: Question Area */}
            <div className="sets-details-window sets-assess-main">
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sets-indigo)', textTransform: 'uppercase', letterSpacing: 2 }}>
                            Question {qIdx + 1} of {questions.length}
                        </div>
                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: 'var(--sets-text)', margin: '4px 0 0' }}>{skill.title}</h2>
                    </div>
                    <div className="sets-timer-badge">
                        <span style={{ fontSize: 18 }}>⏱️</span> {formatTime(timeElapsed)}
                    </div>
                </div>

                <div style={{ background: '#f8fafc', padding: 32, borderRadius: 24, border: '1px solid #e2e8f0', marginBottom: 32, minHeight: 300 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--sets-text)', lineHeight: 1.6, marginBottom: 24 }}>
                        <MathRenderer text={q.question} />
                    </div>

                    {/* Question Input/Options */}
                    {(q.type === 'text' || !q.type) ? (
                        <input 
                            type="text" 
                            className="sets-input"
                            placeholder="Type your answer here..." 
                            value={currentResponse.textAnswer}
                            onChange={(e) => handleTextChange(e.target.value)}
                            style={{ padding: '16px 24px', borderRadius: 16, border: '1px solid #cbd5e1', fontSize: 18, width: '100%', outline: 'none' }}
                            disabled={currentResponse.submitted}
                        />
                    ) : (
                        <div style={{ display: 'grid', gap: 12 }}>
                            {q.options.map((opt, oi) => {
                                const isSelected = currentResponse.selectedOptions.includes(oi);
                                let borderCol = '#e2e8f0';
                                let bg = '#fff';
                                
                                if (currentResponse.submitted) {
                                    const isCorrect = q.type === 'mcq' ? oi === q.correct : q.correct.includes(oi);
                                    if (isCorrect) { borderCol = '#10b981'; bg = '#10b98108'; }
                                    else if (isSelected) { borderCol = '#ef4444'; bg = '#ef444408'; }
                                } else if (isSelected) {
                                    borderCol = 'var(--sets-indigo)'; bg = 'rgba(79, 70, 229, 0.02)';
                                }

                                return (
                                    <button 
                                        key={oi}
                                        onClick={() => handleOptionToggle(oi)}
                                        style={{
                                            padding: '16px 24px', borderRadius: '16px', border: `2px solid ${borderCol}`,
                                            background: bg, textAlign: 'left', fontSize: '17px', fontWeight: isSelected ? 800 : 500,
                                            cursor: currentResponse.submitted ? 'default' : 'pointer', transition: 'all 0.2s',
                                            display: 'flex', alignItems: 'center', gap: 16
                                        }}
                                    >
                                        <div style={{ 
                                            width: 24, height: 24, borderRadius: q.type === 'mcq' ? '50%' : '6px', 
                                            border: `2px solid ${isSelected ? 'var(--sets-indigo)' : '#cbd5e1'}`,
                                            background: isSelected ? 'var(--sets-indigo)' : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff'
                                        }}>
                                            {isSelected && (q.type === 'mcq' ? '●' : '✓')}
                                        </div>
                                        <MathRenderer text={opt} />
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {currentResponse.submitted && (
                        <div style={{ marginTop: 24, padding: 20, borderRadius: 16, background: 'rgba(79, 70, 229, 0.03)', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                            <div style={{ fontWeight: 800, color: 'var(--sets-indigo)', marginBottom: 4 }}>💡 Explanation</div>
                            <div style={{ color: '#334155', fontSize: 15, lineHeight: 1.6 }}>
                                <MathRenderer text={q.explanation} />
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="sets-btn-outline" style={{ padding: '12px 32px', fontWeight: 700 }} onClick={handlePrev} disabled={qIdx === 0}>
                        <span>←</span> Previous
                    </button>
                    {!currentResponse.submitted ? (
                        <button className="sets-btn-filled" style={{ '--skill-color': '#10b981', padding: '12px 60px' }} onClick={handleSubmit} disabled={q.type !== 'text' && currentResponse.selectedOptions.length === 0}>Submit</button>
                    ) : (
                        <button className="sets-btn-filled" style={{ '--skill-color': 'var(--sets-indigo)', padding: '12px 60px' }} onClick={handleNext}>
                            {qIdx + 1 === questions.length ? 'Finish Test' : 'Next Question →'}
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Question Palette */}
            <div className="sets-details-window sets-palette-window">
                <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 20, color: 'var(--sets-text)' }}>Question Palette</h3>
                <div className="sets-palette-grid">
                    {questions.map((_, idx) => {
                        const resp = responses[idx];
                        const isCurrent = qIdx === idx;
                        const isAnswered = resp?.submitted;
                        const isViewed = !!resp;

                        let statusClass = 'unvisited';
                        if (isCurrent) statusClass = 'current';
                        else if (isAnswered) statusClass = 'answered';
                        else if (isViewed) statusClass = 'viewed';

                        return (
                            <button 
                                key={idx}
                                onClick={() => setQIdx(idx)}
                                className={`sets-palette-btn ${statusClass}`}
                            >
                                {idx + 1}
                            </button>
                        );
                    })}
                </div>

                <div className="sets-palette-legend">
                    <div className="sets-legend-item">
                        <div className="sets-legend-dot" style={{ background: '#10b981' }} /> Answered
                    </div>
                    <div className="sets-legend-item">
                        <div className="sets-legend-dot" style={{ background: '#f59e0b20', border: '1px solid #f59e0b40' }} /> Viewed
                    </div>
                    <div className="sets-legend-item">
                        <div className="sets-legend-dot" style={{ background: '#f1f5f9' }} /> Not Visited
                    </div>
                </div>
            </div>
        </div>
    );
}
