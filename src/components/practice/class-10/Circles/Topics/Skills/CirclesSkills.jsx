import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKILLS } from './CirclesSkillsData';
import '../../CirclesBranch.css';
import MathRenderer from '../../../../../MathRenderer';

export default function CirclesSkills() {
    const navigate = useNavigate();
    const [activeSkillId, setActiveSkillId] = useState(null);
    const [view, setView] = useState('list'); // 'list' | 'learn' | 'practice' | 'assess'
    const [mobileLearnDetailView, setMobileLearnDetailView] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // 'concepts' | 'rules' | 'examples'

    // Scroll to top on view change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view, activeSkillId]);

    const skill = SKILLS.find(s => s.id === activeSkillId);

    /* ── Render Skills List ──────────────────────────────── */
    if (view === 'list') {
        return (
            <div className="rn-page">
                <nav className="rn-nav">
                    <button className="rn-nav-back" onClick={() => navigate('/senior/grade/10/circles')}>
                        ← Back to Dashboard
                    </button>
                    <div className="rn-nav-links">
                        <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/circles/introduction')}>⭕ Intro</button>
                        <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/circles/terminology')}>📘 Terminology</button>
                        <button className="rn-nav-link active" onClick={() => setView('list')}>🎯 Skills</button>
                        <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/circles/connectomics')}>🔗 Connectomics</button>
                    </div>
                </nav>

                <div className="rn-hero" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1d4ed8 100%)' }}>
                    <h1 className="rn-hero-title">Core <span style={{ color: '#7dd3fc' }}>Skills</span></h1>
                    <p className="rn-hero-sub">Practice makes perfect. Choose a skill to start your journey into Circles.</p>
                </div>

                <div className="rn-skills-grid">
                    {SKILLS.map(s => (
                        <div key={s.id} className="rn-skill-card" style={{ '--skill-color': s.color }}>
                            <div className="rn-skill-icon" style={{ background: `${s.color}15`, color: s.color }}>
                                {s.icon}
                            </div>
                            <div className="rn-skill-info">
                                <h3 className="rn-skill-title"><MathRenderer text={s.title} /></h3>
                                <p className="rn-skill-desc"><MathRenderer text={s.desc} /></p>
                            </div>
                            <div className="rn-skill-actions">
                                <button className="rn-btn rn-btn-outline" onClick={() => { setActiveSkillId(s.id); setView('learn'); }}>Learn</button>
                                <button className="rn-btn rn-btn-outline" onClick={() => { setActiveSkillId(s.id); setView('practice'); }}>Practice</button>
                                <button className="rn-btn rn-btn-filled" style={{ '--skill-color': s.color }} onClick={() => { setActiveSkillId(s.id); setView('assess'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    /* ── Render Individual Skill Views ───────────────────── */
    return (
        <div className="rn-page">
            <nav className="rn-nav">
                <button className="rn-nav-back" onClick={() => {
                    if (view === 'learn' && mobileLearnDetailView) {
                        setMobileLearnDetailView(false);
                    } else {
                        setView('list');
                        setActiveSkillId(null);
                        setMobileLearnDetailView(false);
                        setSelectedCategory(null);
                    }
                }}>
                    ← {(view === 'learn' && mobileLearnDetailView) ? 'Back to Selection' : 'Back to Skills'}
                </button>
                <div className="rn-nav-links">
                    <button className={`rn-nav-link ${view === 'learn' ? 'active' : ''}`} onClick={() => setView('learn')}>📖 Learn</button>
                    <button className={`rn-nav-link ${view === 'practice' ? 'active' : ''}`} onClick={() => setView('practice')}>🎯 Practice</button>
                    <button className={`rn-nav-link ${view === 'assess' ? 'active' : ''}`} onClick={() => setView('assess')}>🏆 Assess</button>
                </div>
            </nav>

            <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }}>
                {view === 'learn' && (
                    <LearnView 
                        skill={skill} 
                        onPractice={() => setView('practice')}
                        mobileLearnDetailView={mobileLearnDetailView}
                        setMobileLearnDetailView={setMobileLearnDetailView}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                )}
                {view === 'practice' && <PracticeView skill={skill} onAssess={() => setView('assess')} />}
                {view === 'assess' && <AssessView skill={skill} onComplete={() => setView('list')} />}
            </main>
        </div>
    );
}

/* ── Learn View Component ─────────────────────────────── */
function LearnView({ skill, onPractice, mobileLearnDetailView, setMobileLearnDetailView, selectedCategory, setSelectedCategory }) {
    const categories = [
        { id: 'concepts', title: 'Core Concepts', icon: '💡', desc: 'Understanding the fundamentals' },
        { id: 'rules', title: 'Key Rules', icon: '📝', desc: 'Essential logic and properties' },
        { id: 'examples', title: 'Quick Examples', icon: '✨', desc: 'See it in action' }
    ];

    return (
        <>
            {/* Desktop View */}
            <div className="rn-details-window skills-desktop-only">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{skill.icon}</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: skill.color, margin: 0 }}><MathRenderer text={skill.learn.title} /></h2>
                </div>

                <div style={{ fontSize: 18, color: 'var(--rn-text)', lineHeight: 1.7, marginBottom: 32, whiteSpace: 'pre-line' }}>
                    <MathRenderer text={skill.learn.content} />
                </div>

                <div className="rn-responsive-grid-2">
                    <div>
                        <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 2, color: skill.color, marginBottom: 16, fontWeight: 800 }}>Key Rules</h4>
                        {skill.learn.rules.map((rule, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                                <div style={{ width: 24, height: 24, borderRadius: '50%', background: skill.color, color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</div>
                                <p style={{ margin: 0, fontSize: 15, color: 'var(--rn-muted)' }}><MathRenderer text={rule} /></p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 2, color: 'var(--rn-teal)', marginBottom: 16, fontWeight: 800 }}>Quick Examples</h4>
                        {skill.learn.examples.map((ex, idx) => (
                            <div key={idx} style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                                <div style={{ color: 'var(--rn-indigo)', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>Q: <MathRenderer text={ex.q} /></div>
                                <div style={{ color: 'var(--rn-text)', fontSize: 15 }}>A: <MathRenderer text={ex.a} /></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button className="rn-btn-filled" style={{ '--skill-color': skill.color, padding: '14px 40px' }} onClick={onPractice}>
                        Start Practice Problems →
                    </button>
                </div>
            </div>

            {/* Mobile View */}
            <div className="skills-mobile-only">
                {!mobileLearnDetailView ? (
                    <div className="sl-selection-grid">
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 12px' }}>{skill.icon}</div>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: 0 }}><MathRenderer text={skill.learn.title} /></h2>
                        </div>
                        {categories.map((cat) => (
                            <div key={cat.id} className="sl-item-card" onClick={() => { setSelectedCategory(cat.id); setMobileLearnDetailView(true); }}>
                                <div className="sl-item-icon" style={{ background: `${skill.color}15`, color: skill.color }}>{cat.icon}</div>
                                <div className="sl-item-info">
                                    <div className="sl-item-title"><MathRenderer text={cat.title} /></div>
                                    <div className="sl-item-desc">{cat.desc}</div>
                                </div>
                                <div className="sl-item-arrow">→</div>
                            </div>
                        ))}
                        <button className="alg-btn-primary" style={{ background: skill.color, width: '100%', marginTop: '20px', padding: '16px', borderRadius: '16px' }} onClick={onPractice}>
                            Start Practice →
                        </button>
                    </div>
                ) : (
                    <div className="sl-detail-card">
                        <div className="sl-detail-header">
                            <div className="sl-detail-badge" style={{ background: `${skill.color}15`, color: skill.color }}>
                                {categories.find(c => c.id === selectedCategory).icon} <MathRenderer text={categories.find(c => c.id === selectedCategory).title} />
                            </div>
                            <div style={{ fontSize: '24px' }}>{skill.icon}</div>
                        </div>

                        {selectedCategory === 'concepts' && (
                            <div className="sl-detail-body">
                                <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                                    <MathRenderer text={skill.learn.content} />
                                </p>
                            </div>
                        )}

                        {selectedCategory === 'rules' && (
                            <div className="sl-detail-body">
                                {skill.learn.rules.map((rule, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: skill.color, color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</div>
                                        <p style={{ margin: 0, fontSize: 16, color: '#475569', lineHeight: 1.5 }}><MathRenderer text={rule} /></p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedCategory === 'examples' && (
                            <div className="sl-detail-body">
                                {skill.learn.examples.map((ex, idx) => (
                                    <div key={idx} className="sl-example-box" style={{ padding: 20, marginBottom: 16 }}>
                                        <div style={{ color: skill.color, fontWeight: 800, fontSize: 13, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Example {idx + 1}</div>
                                        <div style={{ color: '#1e293b', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
                                            Q: <MathRenderer text={ex.q} />
                                        </div>
                                        <div style={{ color: '#475569', fontSize: 14, padding: '12px', background: '#fff', borderRadius: '10px', border: '1px solid #f1f5f9', fontWeight: 500 }}>
                                            A: <MathRenderer text={ex.a} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="sl-detail-footer">
                            <button className="sl-footer-btn" 
                                onClick={() => {
                                    const nextIdx = (categories.findIndex(c => c.id === selectedCategory) + 1) % categories.length;
                                    setSelectedCategory(categories[nextIdx].id);
                                    window.scrollTo(0,0);
                                }}
                                style={{ background: `${skill.color}15`, color: skill.color }}
                            >
                                Next Section
                            </button>
                            <button className="sl-footer-btn" style={{ background: skill.color, color: '#fff' }} onClick={onPractice}>
                                Start Practice
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

/* ── Practice View Component (Aligned with Triangles) ── */
function PracticeView({ skill, onAssess }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [responses, setResponses] = useState({}); // { index: { selected: number, isCorrect: boolean } }
    const [finished, setFinished] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [visited, setVisited] = useState({ 0: true });

    const questions = skill.practice;
    const q = questions[current];
    const color = skill.color;

    // Timer logic
    useEffect(() => {
        if (!finished) {
            const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [finished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelect = (optIdx) => {
        if (finished || selected !== null) return; // Lock after selection in practice

        setSelected(optIdx);
        setResponses(prev => ({
            ...prev,
            [current]: {
                selected: optIdx,
                isCorrect: optIdx === q.correct
            }
        }));
    };

    const handleNext = () => {
        if (current + 1 < questions.length) {
            const nextIdx = current + 1;
            setCurrent(nextIdx);
            setSelected(responses[nextIdx]?.selected ?? null);
            setVisited(prev => ({ ...prev, [nextIdx]: true }));
        } else {
            setFinished(true);
        }
    };

    const handlePrev = () => {
        if (current > 0) {
            const prevIdx = current - 1;
            setCurrent(prevIdx);
            setSelected(responses[prevIdx]?.selected ?? null);
        }
    };

    const resetPractice = () => {
        setCurrent(0);
        setSelected(null);
        setResponses({});
        setFinished(false);
        setTimeElapsed(0);
        setVisited({ 0: true });
    };

    if (finished) {
        const totalCorrect = Object.values(responses).filter(r => r.isCorrect).length;
        const scorePct = Math.round((totalCorrect / questions.length) * 100);

        return (
            <div className="practice-report-card" style={{
                maxWidth: '500px', margin: '20px auto', padding: '24px', textAlign: 'center',
                background: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9'
            }}>
                {/* Circular Score */}
                <div style={{
                    width: '120px', height: '120px', margin: '0 auto 16px', borderRadius: '50%',
                    background: `conic-gradient(${color} ${scorePct}%, #f1f5f9 ${scorePct}%)`,
                    padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '100%', height: '100%', background: '#fff', borderRadius: '50%',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{totalCorrect}</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>out of {questions.length}</div>
                    </div>
                </div>

                {/* Time Taken Badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px',
                    background: `${color}10`, color: color, borderRadius: '50px',
                    fontSize: '12px', fontWeight: 800, marginBottom: '16px'
                }}>
                    ⏱️ Time: {formatTime(timeElapsed)}
                </div>

                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
                    {scorePct === 100 ? '🚀 Perfect Score!' : scorePct >= 70 ? '💪 Great Job!' : '✨ Keep Learning!'}
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>
                    {scorePct === 100 ? "You've mastered this skill perfectly!" : "Review the concepts and try again for 100%."}
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button className="rn-btn-outline" style={{ padding: '10px 24px', borderRadius: '12px', fontSize: '14px' }} onClick={resetPractice}>Try Again</button>
                    <button className="rn-btn-filled" style={{ '--skill-color': color, padding: '10px 24px', borderRadius: '12px', fontSize: '14px' }} onClick={onAssess}>Take Assessment🏆</button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-engine-practice" style={{ maxWidth: '900px', margin: '0 auto', padding: '10px 0' }}>
            <div className="rn-assess-main" style={{
                padding: 'clamp(16px, 4%, 30px)',
                minHeight: 'auto', display: 'flex', flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                        display: 'inline-block', padding: '3px 10px', borderRadius: '6px',
                        background: `${color}15`, color: color, fontSize: '10px', fontWeight: 800,
                        textTransform: 'uppercase', width: 'fit-content'
                    }}>
                        Practice: Question {current + 1} of {questions.length}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#64748B', fontFamily: 'Outfit, monospace' }}>
                        ⏱️ {formatTime(timeElapsed)}
                    </div>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', lineHeight: 1.4, marginBottom: '20px' }}>
                    <MathRenderer text={q.question} />
                </h3>

                <div className="rn-responsive-grid-2" style={{ marginBottom: '20px' }}>
                    {q.options.map((opt, i) => {
                        const isCorrect = i === q.correct;
                        const isSelected = selected === i;
                        const showFeedback = selected !== null;

                        let borderColor = '#f1f5f9';
                        let bgColor = '#fff';
                        let dotColor = '#CBD5E1';

                        if (showFeedback) {
                            if (isCorrect) {
                                borderColor = '#10b981';
                                bgColor = '#f0fdf4';
                                dotColor = '#10b981';
                            } else if (isSelected) {
                                borderColor = '#ef4444';
                                bgColor = '#fef2f2';
                                dotColor = '#ef4444';
                            }
                        } else if (isSelected) {
                            borderColor = color;
                            bgColor = `${color}05`;
                            dotColor = color;
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => handleSelect(i)}
                                disabled={showFeedback}
                                style={{
                                    padding: '12px 16px', borderRadius: '14px', border: '2px solid',
                                    borderColor, background: bgColor,
                                    textAlign: 'left', cursor: showFeedback ? 'default' : 'pointer', transition: 'all 0.2s',
                                    fontSize: '14px', fontWeight: isSelected ? 800 : 600,
                                    color: isSelected ? (showFeedback ? (isCorrect ? '#065f46' : '#991b1b') : color) : '#475569',
                                    display: 'flex', alignItems: 'center', gap: '10px'
                                }}
                            >
                                <div style={{
                                    width: '16px', height: '16px', borderRadius: '50%', border: '2px solid',
                                    borderColor: (isSelected || (showFeedback && isCorrect)) ? dotColor : '#CBD5E1',
                                    background: (isSelected || (showFeedback && isCorrect)) ? dotColor : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    {(isSelected || (showFeedback && isCorrect)) && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                                </div>
                                <MathRenderer text={opt} />
                            </button>
                        );
                    })}
                </div>

                {/* Explanation Bubble */}
                {selected !== null && (
                    <div style={{
                        marginTop: '5px', marginBottom: '20px', padding: '16px 20px', borderRadius: '16px',
                        background: '#F8FAFC', borderLeft: `5px solid ${color}`,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.02)', animation: 'rnScaleIn 0.3s ease'
                    }}>
                        <h4 style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>💡 Solution Strategy</h4>
                        <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
                            <MathRenderer text={q.explanation} />
                        </div>
                    </div>
                )}

                {/* Footer Controls */}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '2px dashed #f1f5f9' }}>
                    <button
                        onClick={handlePrev}
                        disabled={current === 0}
                        style={{
                            padding: '8px 20px', borderRadius: '10px', border: '2px solid #E2E8F0',
                            background: '#fff', color: '#64748B', fontWeight: 800, cursor: current === 0 ? 'not-allowed' : 'pointer',
                            opacity: current === 0 ? 0.5 : 1, transition: 'all 0.2s', fontSize: '13px'
                        }}
                    >
                        ← Previous
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={selected === null}
                        style={{
                            padding: '10px 30px', borderRadius: '10px', border: 'none',
                            background: color, color: '#fff', fontWeight: 900,
                            cursor: selected === null ? 'not-allowed' : 'pointer',
                            boxShadow: selected === null ? 'none' : `0 6px 15px ${color}30`, fontSize: '14px', transition: 'all 0.2s',
                            opacity: selected === null ? 0.6 : 1
                        }}
                    >
                        {current === questions.length - 1 ? 'Finish Practice' : 'Next Question →'}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Assess View Component (Aligned with Triangles) ── */
function AssessView({ skill, onComplete }) {
    const [qIdx, setQIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [responses, setResponses] = useState({}); // { qIdx: { selected: number, isCorrect: boolean } }
    const [finished, setFinished] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [visited, setVisited] = useState({ 0: true });

    const questions = skill.assessment;
    const q = questions[qIdx];
    const color = 'var(--rn-indigo)';

    // Timer logic
    useEffect(() => {
        if (!finished) {
            const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [finished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelect = (optIdx) => {
        if (finished) return;
        setSelected(optIdx);
        setResponses(prev => ({
            ...prev,
            [qIdx]: {
                selected: optIdx,
                isCorrect: optIdx === q.correct
            }
        }));
    };

    const handleNext = () => {
        if (qIdx + 1 < questions.length) {
            const nextIdx = qIdx + 1;
            setQIdx(nextIdx);
            setSelected(responses[nextIdx]?.selected ?? null);
            setVisited(prev => ({ ...prev, [nextIdx]: true }));
        } else {
            setFinished(true);
        }
    };

    const handlePrev = () => {
        if (qIdx > 0) {
            const prevIdx = qIdx - 1;
            setQIdx(prevIdx);
            setSelected(responses[prevIdx]?.selected ?? null);
        }
    };

    const navigateTo = (idx) => {
        setQIdx(idx);
        setSelected(responses[idx]?.selected ?? null);
        setVisited(prev => ({ ...prev, [idx]: true }));
    };

    if (finished) {
        const totalCorrect = Object.values(responses).filter(r => r.isCorrect).length;
        const scorePct = Math.round((totalCorrect / questions.length) * 100);

        return (
            <div className="exam-report-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                <div className="report-hero" style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '5px' }}>🏆</div>
                    <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#31326F', margin: '0' }}>{scorePct >= 80 ? 'Mastery Achieved!' : 'Assessment Report'}</h1>
                    <p style={{ fontSize: '16px', color: '#64748B', fontWeight: 500 }}>{skill.title}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                    <div className="report-stat-card" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE', padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                        <span style={{ color: '#3B82F6', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>Score</span>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#1E3A8A' }}>{scorePct}%</div>
                    </div>
                    <div className="report-stat-card" style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                        <span style={{ color: '#22C55E', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>Correct</span>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#14532D' }}>{totalCorrect}</div>
                    </div>
                    <div className="report-stat-card" style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                        <span style={{ color: '#EF4444', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>Wrong</span>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#7F1D1D' }}>{questions.length - totalCorrect}</div>
                    </div>
                    <div className="report-stat-card" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                        <span style={{ color: '#64748B', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>Time</span>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#334155' }}>{formatTime(timeElapsed)}</div>
                    </div>
                </div>

                <div className="detailed-review">
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1E293B', marginBottom: '20px' }}>Detailed Review</h2>
                    {questions.map((question, idx) => {
                        const resp = responses[idx];
                        const isCorrect = resp?.isCorrect;
                        return (
                            <div key={idx} style={{
                                background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '20px',
                                border: `2px solid ${isCorrect ? '#DCFCE730' : '#FEE2E230'}`,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                            }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                                    <span style={{
                                        width: '28px', height: '28px', borderRadius: '50%', background: isCorrect ? '#22C55E' : '#EF4444',
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0
                                    }}>{idx + 1}</span>
                                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B' }}>
                                        <MathRenderer text={question.question} />
                                    </div>
                                </div>

                                <div className="rn-responsive-grid-2" style={{ marginBottom: '20px', marginLeft: '40px' }}>
                                    <div style={{ padding: '15px', borderRadius: '12px', background: isCorrect ? '#F0FDF4' : '#FEF2F2' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: isCorrect ? '#22C55E' : '#EF4444', display: 'block', marginBottom: '4px' }}>Your Answer</span>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: isCorrect ? '#14532D' : '#7F1D1D' }}>
                                            {resp ? <MathRenderer text={question.options[resp.selected]} /> : 'Skipped'}
                                        </div>
                                    </div>
                                    <div style={{ padding: '15px', borderRadius: '12px', background: '#F0FDF4', border: '1px solid #DCFCE7' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#22C55E', display: 'block', marginBottom: '4px' }}>Correct Answer</span>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#14532D' }}>
                                            <MathRenderer text={question.options[question.correct]} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginLeft: '40px', padding: '20px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                    <h4 style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solution Strategy</h4>
                                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                                        <MathRenderer text={question.explanation} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button className="rn-btn-outline" onClick={() => window.location.reload()} style={{ padding: '12px 30px' }}>Retake Test</button>
                    <button className="rn-btn-filled" onClick={onComplete} style={{ '--skill-color': skill.color, padding: '12px 40px' }}>Return to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-engine-exam" style={{ maxWidth: '1300px', margin: '0 auto', padding: '10px 0' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: color, textTransform: 'uppercase', letterSpacing: '1px' }}>Final Assessment</span>
                    <h2 style={{ margin: '0', fontSize: '18px', fontWeight: 900, color: '#1E293B' }}><MathRenderer text={skill.title} /></h2>
                </div>
                <div style={{
                    background: '#fff', padding: '6px 14px', borderRadius: '10px', border: '2px solid #E2E8F0',
                    display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                }}>
                    <span style={{ fontSize: '16px' }}>⏱️</span>
                    <span style={{ fontSize: '16px', fontWeight: 900, fontFamily: 'Outfit, monospace', color: '#1E293B' }}>{formatTime(timeElapsed)}</span>
                </div>
            </div>

            {/* Layout */}
            <div className="rn-assess-layout">
                {/* Left Side */}
                <div className="rn-assess-main">
                    <div style={{
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{
                            display: 'inline-block', padding: '3px 10px', borderRadius: '6px',
                            background: `${color}15`, color: color, fontSize: '10px', fontWeight: 800,
                            textTransform: 'uppercase', marginBottom: '10px', width: 'fit-content'
                        }}>
                            Question {qIdx + 1} of {questions.length}
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', lineHeight: 1.4, marginBottom: '16px' }}>
                            <MathRenderer text={q.question} />
                        </h3>

                        <div className="rn-responsive-grid-2" style={{ marginBottom: '16px' }}>
                            {q.options.map((opt, i) => {
                                const isSelected = selected === i;
                                let borderColor = '#f1f5f9';
                                let bgColor = '#fff';
                                let dotColor = '#CBD5E1';

                                if (isSelected) {
                                    borderColor = color;
                                    bgColor = `${color}05`;
                                    dotColor = color;
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(i)}
                                        style={{
                                            padding: '10px 14px', borderRadius: '12px', border: '2px solid',
                                            borderColor, background: bgColor,
                                            textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                                            fontSize: '14px', fontWeight: isSelected ? 800 : 600,
                                            color: isSelected ? color : '#475569',
                                            display: 'flex', alignItems: 'center', gap: '8px'
                                        }}
                                    >
                                        <div style={{
                                            width: '14px', height: '14px', borderRadius: '50%', border: '2px solid',
                                            borderColor: isSelected ? dotColor : '#CBD5E1',
                                            background: isSelected ? dotColor : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                        }}>
                                            {isSelected && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }} />}
                                        </div>
                                        <MathRenderer text={opt} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '2px dashed #f1f5f9' }}>
                            <button
                                onClick={handlePrev}
                                disabled={qIdx === 0}
                                style={{
                                    padding: '8px 16px', borderRadius: '8px', border: '2px solid #E2E8F0',
                                    background: '#fff', color: '#64748B', fontWeight: 800, cursor: qIdx === 0 ? 'not-allowed' : 'pointer',
                                    opacity: qIdx === 0 ? 0.5 : 1, transition: 'all 0.2s', fontSize: '13px'
                                }}
                            >
                                ← Previous
                            </button>

                            <button
                                onClick={handleNext}
                                style={{
                                    padding: '8px 24px', borderRadius: '8px', border: 'none',
                                    background: color, color: '#fff', fontWeight: 900,
                                    cursor: 'pointer',
                                    boxShadow: `0 6px 15px ${color}30`, fontSize: '14px', transition: 'all 0.2s'
                                }}
                            >
                                {qIdx === questions.length - 1 ? 'Finish Assessment' : 'Next Question →'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side Palette */}
                <div className="rn-assess-sidebar">
                    <div className="rn-palette-window" style={{
                        position: 'sticky', top: '100px'
                    }}>
                        <h4 style={{ margin: '0 0 15px', fontSize: '16px', fontWeight: 800, color: '#1E293B', textAlign: 'center' }}>Question Palette</h4>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIdx === idx;
                                const isAnswered = responses[idx] !== undefined;
                                const isSkipped = visited[idx] && !isAnswered && idx !== qIdx;

                                let bgColor = '#F8FAFC';
                                let borderColor = '#E2E8F0';
                                let textColor = '#64748B';

                                if (isCurrent) {
                                    bgColor = '#EFF6FF';
                                    borderColor = color;
                                    textColor = color;
                                } else if (isAnswered) {
                                    bgColor = '#F0FDF4';
                                    borderColor = '#22C55E';
                                    textColor = '#166534';
                                } else if (isSkipped) {
                                    bgColor = '#FFF7ED';
                                    borderColor = '#F97316';
                                    textColor = '#9A3412';
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => navigateTo(idx)}
                                        style={{
                                            height: '36px', borderRadius: '8px', border: '2px solid',
                                            borderColor, background: bgColor, color: textColor,
                                            fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '13px'
                                        }}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px', fontSize: '10px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#F0FDF4', border: '1px solid #22C55E' }} />
                                <span style={{ color: '#475569', fontWeight: 700 }}>Answered</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#FFF7ED', border: '1px solid #F97316' }} />
                                <span style={{ color: '#475569', fontWeight: 700 }}>Skipped</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#F8FAFC', border: '1px solid #E2E8F0' }} />
                                <span style={{ color: '#475569', fontWeight: 700 }}>Unvisited</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#EFF6FF', border: `1px solid ${color}` }} />
                                <span style={{ color: '#475569', fontWeight: 700 }}>Current</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setFinished(true)}
                            style={{
                                width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${color}40`,
                                background: `${color}10`, color: color, fontWeight: 800, cursor: 'pointer',
                                transition: 'all 0.2s', fontSize: '13px'
                            }}
                        >
                            Submit Assessment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
