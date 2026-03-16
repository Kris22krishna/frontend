import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKILLS } from './TrianglesSkillsData';
import '../../TrianglesBranch.css';
import MathRenderer from '../../../../../MathRenderer';

export default function TrianglesSkills() {
    const navigate = useNavigate();
    const [activeSkillId, setActiveSkillId] = useState(null);
    const [view, setView] = useState('list');
    const [mobileLearnDetailView, setMobileLearnDetailView] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view, activeSkillId]);

    const skill = SKILLS.find((item) => item.id === activeSkillId);

    if (view === 'list') {
        return (
            <div className="rn-page">
                <nav className="rn-nav">
                    <button className="rn-nav-back" onClick={() => navigate('/senior/grade/10/triangles')}>
                        ← Back to Dashboard
                    </button>
                    <div className="rn-nav-links">
                        <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/introduction')}>📐 Intro</button>
                        <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/terminology')}>📘 Terminology</button>
                        <button className="rn-nav-link active" onClick={() => setView('list')}>🎯 Skills</button>
                        <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/connectomics')}>🔗 Connectomics</button>
                    </div>
                </nav>

                <div className="rn-hero" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1d4ed8 100%)' }}>
                    <h1 className="rn-hero-title">Core <span style={{ color: '#7dd3fc' }}>Skills</span></h1>
                    <p className="rn-hero-sub">Choose a triangle skill and move through learn, practice, and assess.</p>
                </div>

                <div className="rn-skills-grid">
                    {SKILLS.map((item) => (
                        <div key={item.id} className="rn-skill-card" style={{ '--skill-color': item.color }}>
                            <div className="rn-skill-icon" style={{ background: `${item.color}15`, color: item.color }}>
                                {item.icon}
                            </div>
                            <div className="rn-skill-info">
                                <h3 className="rn-skill-title">{item.title}</h3>
                                <p className="rn-skill-desc"><MathRenderer text={item.desc} /></p>
                            </div>
                            <div className="rn-skill-actions">
                                <button className="rn-btn rn-btn-outline" onClick={() => { setActiveSkillId(item.id); setView('learn'); }}>Learn</button>
                                <button className="rn-btn rn-btn-outline" onClick={() => { setActiveSkillId(item.id); setView('practice'); }}>Practice</button>
                                <button className="rn-btn rn-btn-filled" style={{ '--skill-color': item.color }} onClick={() => { setActiveSkillId(item.id); setView('assess'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rn-page">
            <nav className="rn-nav">
                <button
                    className="rn-nav-back"
                    onClick={() => {
                        if (view === 'learn' && mobileLearnDetailView) {
                            setMobileLearnDetailView(false);
                        } else {
                            setView('list');
                            setActiveSkillId(null);
                            setMobileLearnDetailView(false);
                            setSelectedCategory(null);
                        }
                    }}
                >
                    ← {(view === 'learn' && mobileLearnDetailView) ? 'Back to Selection' : 'Back to Skills'}
                </button>
                <div className="rn-nav-links">
                    <button className={`rn-nav-link ${view === 'learn' ? 'active' : ''}`} onClick={() => setView('learn')}>📘 Learn</button>
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
                {view === 'practice' && <QuestionEngine skill={skill} questions={skill.practice} mode="practice" onDone={() => setView('assess')} doneLabel="Start Assessment →" />}
                {view === 'assess' && <QuestionEngine skill={skill} questions={skill.assessment} mode="assess" onDone={() => setView('list')} doneLabel="Return to Skills" />}
            </main>
        </div>
    );
}

function LearnView({ skill, onPractice, mobileLearnDetailView, setMobileLearnDetailView, selectedCategory, setSelectedCategory }) {
    const categories = [
        { id: 'concepts', title: 'Core Concepts', icon: '💡', desc: 'Understand the main idea' },
        { id: 'rules', title: 'Key Rules', icon: '📝', desc: 'Lock in the logic' },
        { id: 'examples', title: 'Quick Examples', icon: '✨', desc: 'See it in action' }
    ];

    return (
        <>
            <div className="rn-details-window skills-desktop-only">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{skill.icon}</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: skill.color, margin: 0 }}>{skill.learn.title}</h2>
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
                        {skill.learn.examples.map((example, idx) => (
                            <div key={idx} style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                                <div style={{ color: 'var(--rn-indigo)', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>Q: <MathRenderer text={example.q} /></div>
                                <div style={{ color: 'var(--rn-text)', fontSize: 15 }}>A: <MathRenderer text={example.a} /></div>
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

            <div className="skills-mobile-only">
                {!mobileLearnDetailView ? (
                    <div className="sl-selection-grid">
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <div style={{ width: 64, height: 64, borderRadius: 18, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 12px' }}>{skill.icon}</div>
                            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', margin: 0 }}>{skill.learn.title}</h2>
                        </div>
                        {categories.map((category) => (
                            <div key={category.id} className="sl-item-card" onClick={() => { setSelectedCategory(category.id); setMobileLearnDetailView(true); }}>
                                <div className="sl-item-icon" style={{ background: `${skill.color}15`, color: skill.color }}>{category.icon}</div>
                                <div className="sl-item-info">
                                    <div className="sl-item-title">{category.title}</div>
                                    <div className="sl-item-desc">{category.desc}</div>
                                </div>
                                <div>→</div>
                            </div>
                        ))}
                        <button className="rn-btn-filled" style={{ background: skill.color, width: '100%', marginTop: 20, padding: 16, borderRadius: 16 }} onClick={onPractice}>
                            Start Practice →
                        </button>
                    </div>
                ) : (
                    <div className="sl-detail-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                            <div style={{ padding: '8px 12px', borderRadius: 999, background: `${skill.color}15`, color: skill.color, fontWeight: 700 }}>
                                {categories.find((item) => item.id === selectedCategory)?.title}
                            </div>
                            <div style={{ fontSize: 24 }}>{skill.icon}</div>
                        </div>

                        {selectedCategory === 'concepts' && (
                            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                                <MathRenderer text={skill.learn.content} />
                            </p>
                        )}

                        {selectedCategory === 'rules' && (
                            <div>
                                {skill.learn.rules.map((rule, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: skill.color, color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</div>
                                        <p style={{ margin: 0, fontSize: 16, color: '#475569', lineHeight: 1.5 }}><MathRenderer text={rule} /></p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedCategory === 'examples' && (
                            <div>
                                {skill.learn.examples.map((example, idx) => (
                                    <div key={idx} className="sl-example-box" style={{ padding: 20, marginBottom: 16 }}>
                                        <div style={{ color: skill.color, fontWeight: 800, fontSize: 13, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Example {idx + 1}</div>
                                        <div style={{ color: '#1e293b', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Q: <MathRenderer text={example.q} /></div>
                                        <div style={{ color: '#475569', fontSize: 14, padding: 12, background: '#fff', borderRadius: 10, border: '1px solid #f1f5f9', fontWeight: 500 }}>A: <MathRenderer text={example.a} /></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="sl-detail-footer">
                            <button
                                className="sl-footer-btn"
                                onClick={() => {
                                    const nextIdx = (categories.findIndex((item) => item.id === selectedCategory) + 1) % categories.length;
                                    setSelectedCategory(categories[nextIdx].id);
                                    window.scrollTo(0, 0);
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

function QuestionEngine({ skill, questions, mode, onDone, doneLabel }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [responses, setResponses] = useState({});
    const [finished, setFinished] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [visited, setVisited] = useState({ 0: true });
    const question = questions[current];

    useEffect(() => {
        if (!finished) {
            const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
            return () => clearInterval(timer);
        }
        return undefined;
    }, [finished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelect = (optIdx) => {
        if (finished || (mode === 'practice' && selected !== null)) return;
        setSelected(optIdx);
        setResponses((prev) => ({
            ...prev,
            [current]: {
                selected: optIdx,
                isCorrect: optIdx === question.correct
            }
        }));
    };

    const navigateTo = (idx) => {
        setCurrent(idx);
        setSelected(responses[idx]?.selected ?? null);
        setVisited((prev) => ({ ...prev, [idx]: true }));
    };

    const handleNext = () => {
        if (current + 1 < questions.length) {
            navigateTo(current + 1);
        } else {
            setFinished(true);
        }
    };

    const handlePrev = () => {
        if (current > 0) {
            navigateTo(current - 1);
        }
    };

    const reset = () => {
        setCurrent(0);
        setSelected(null);
        setResponses({});
        setFinished(false);
        setTimeElapsed(0);
        setVisited({ 0: true });
    };

    if (finished) {
        const totalCorrect = Object.values(responses).filter((item) => item.isCorrect).length;
        const scorePct = Math.round((totalCorrect / questions.length) * 100);

        return (
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 25 }}>
                    <div style={{ fontSize: '48px', marginBottom: '5px' }}>{scorePct >= 80 ? '🏆' : '📘'}</div>
                    <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#31326F', margin: 0 }}>{mode === 'practice' ? 'Practice Report' : 'Assessment Report'}</h1>
                    <p style={{ fontSize: '16px', color: '#64748B', fontWeight: 500 }}>{skill.title}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                    <StatBox label="Score" value={`${scorePct}%`} bg="#EFF6FF" border="#DBEAFE" color="#1E3A8A" />
                    <StatBox label="Correct" value={`${totalCorrect}`} bg="#F0FDF4" border="#DCFCE7" color="#14532D" />
                    <StatBox label="Wrong" value={`${questions.length - totalCorrect}`} bg="#FEF2F2" border="#FEE2E2" color="#7F1D1D" />
                    <StatBox label="Time" value={formatTime(timeElapsed)} bg="#F8FAFC" border="#E2E8F0" color="#334155" />
                </div>

                <div>
                    {questions.map((item, idx) => {
                        const response = responses[idx];
                        const isCorrect = response?.isCorrect;
                        return (
                            <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: `2px solid ${isCorrect ? '#DCFCE7' : '#FEE2E2'}`, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: isCorrect ? '#22C55E' : '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>{idx + 1}</span>
                                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B' }}>
                                        <MathRenderer text={item.question} />
                                    </div>
                                </div>

                                <div className="rn-responsive-grid-2" style={{ marginBottom: '20px', marginLeft: '40px' }}>
                                    <div style={{ padding: '15px', borderRadius: '12px', background: isCorrect ? '#F0FDF4' : '#FEF2F2' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: isCorrect ? '#22C55E' : '#EF4444', display: 'block', marginBottom: '4px' }}>Your Answer</span>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: isCorrect ? '#14532D' : '#7F1D1D' }}>
                                            {response ? <MathRenderer text={item.options[response.selected]} /> : 'Skipped'}
                                        </div>
                                    </div>
                                    <div style={{ padding: '15px', borderRadius: '12px', background: '#F0FDF4', border: '1px solid #DCFCE7' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#22C55E', display: 'block', marginBottom: '4px' }}>Correct Answer</span>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#14532D' }}>
                                            <MathRenderer text={item.options[item.correct]} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginLeft: '40px', padding: '20px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                    <h4 style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solution Strategy</h4>
                                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                                        <MathRenderer text={item.explanation} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="rn-btn-outline" onClick={reset} style={{ padding: '12px 30px' }}>{mode === 'practice' ? 'Retry Practice' : 'Retake Test'}</button>
                    <button className="rn-btn-filled" onClick={onDone} style={{ '--skill-color': skill.color, padding: '12px 40px' }}>{doneLabel}</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: skill.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {mode === 'practice' ? 'Guided Practice' : 'Final Assessment'}
                    </span>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#1E293B' }}>{skill.title}</h2>
                </div>
                <div style={{ background: '#fff', padding: '6px 14px', borderRadius: '10px', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <span style={{ fontSize: '16px' }}>⏱️</span>
                    <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E293B' }}>{formatTime(timeElapsed)}</span>
                </div>
            </div>

            <div className="rn-assess-layout">
                <div className="rn-assess-main">
                    <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '6px', background: `${skill.color}15`, color: skill.color, fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
                        Question {current + 1} of {questions.length}
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', lineHeight: 1.4, marginBottom: '16px' }}>
                        <MathRenderer text={question.question} />
                    </h3>

                    <div className="rn-responsive-grid-2" style={{ marginBottom: '16px' }}>
                        {question.options.map((option, idx) => {
                            const isSelected = selected === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx)}
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: '12px',
                                        border: '2px solid',
                                        borderColor: isSelected ? skill.color : '#f1f5f9',
                                        background: isSelected ? `${skill.color}08` : '#fff',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: isSelected ? 800 : 600,
                                        color: isSelected ? skill.color : '#475569',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: `2px solid ${isSelected ? skill.color : '#CBD5E1'}`, background: isSelected ? skill.color : 'transparent', flexShrink: 0 }} />
                                    <MathRenderer text={option} />
                                </button>
                            );
                        })}
                    </div>

                    {mode === 'practice' && responses[current] && (
                        <div style={{ marginBottom: '16px', padding: '16px', borderRadius: '14px', background: responses[current].isCorrect ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${responses[current].isCorrect ? '#DCFCE7' : '#FEE2E2'}` }}>
                            <div style={{ fontWeight: 800, marginBottom: '6px', color: responses[current].isCorrect ? '#166534' : '#991b1b' }}>
                                {responses[current].isCorrect ? 'Correct' : 'Not quite'}
                            </div>
                            <div style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                                <MathRenderer text={question.explanation} />
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '2px dashed #f1f5f9' }}>
                        <button onClick={handlePrev} disabled={current === 0} style={{ padding: '8px 16px', borderRadius: '8px', border: '2px solid #E2E8F0', background: '#fff', color: '#64748B', fontWeight: 800, cursor: current === 0 ? 'not-allowed' : 'pointer', opacity: current === 0 ? 0.5 : 1 }}>
                            ← Previous
                        </button>

                        <button onClick={handleNext} style={{ padding: '8px 24px', borderRadius: '8px', border: 'none', background: skill.color, color: '#fff', fontWeight: 900, cursor: 'pointer' }}>
                            {current === questions.length - 1 ? (mode === 'practice' ? 'Finish Practice' : 'Finish Assessment') : 'Next Question →'}
                        </button>
                    </div>
                </div>

                <div className="rn-assess-sidebar">
                    <div className="rn-palette-window" style={{ position: 'sticky', top: '100px' }}>
                        <h4 style={{ margin: '0 0 15px', fontSize: '16px', fontWeight: 800, color: '#1E293B', textAlign: 'center' }}>Question Palette</h4>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = current === idx;
                                const isAnswered = responses[idx] !== undefined;
                                const isSkipped = visited[idx] && !isAnswered && idx !== current;

                                let bgColor = '#F8FAFC';
                                let borderColor = '#E2E8F0';
                                let textColor = '#64748B';

                                if (isCurrent) {
                                    bgColor = '#EFF6FF';
                                    borderColor = skill.color;
                                    textColor = skill.color;
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
                                        style={{ height: '36px', borderRadius: '8px', border: '2px solid', borderColor, background: bgColor, color: textColor, fontWeight: 900, cursor: 'pointer', fontSize: '13px' }}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px', fontSize: '10px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                            <Legend label="Answered" bg="#F0FDF4" border="#22C55E" />
                            <Legend label="Skipped" bg="#FFF7ED" border="#F97316" />
                            <Legend label="Not Visited" bg="#F8FAFC" border="#E2E8F0" />
                            <Legend label="Current" bg="#EFF6FF" border={skill.color} />
                        </div>

                        <button onClick={() => setFinished(true)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: '#EF4444', color: '#fff', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', fontSize: '13px' }}>
                            Submit {mode === 'practice' ? 'Practice' : 'Assessment'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value, bg, border, color }) {
    return (
        <div style={{ background: bg, border: `1px solid ${border}`, padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
            <span style={{ color, fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>{label}</span>
            <div style={{ fontSize: '24px', fontWeight: 900, color }}>{value}</div>
        </div>
    );
}

function Legend({ label, bg, border }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: bg, border: `1px solid ${border}` }} />
            <span style={{ color: '#475569', fontWeight: 700 }}>{label}</span>
        </div>
    );
}
