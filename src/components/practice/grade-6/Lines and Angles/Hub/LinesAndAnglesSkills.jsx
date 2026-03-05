import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../linesAndAnglesHub.css';
import MathRenderer from '@/components/MathRenderer';
import mascot from '@/assets/mascot.png';
import { SKILL_LEARN_DATA, generateLinesAndAnglesQuestions } from '../LinesAndAnglesData';

// ─── Shared Quiz Engine ────────────────────────────────────────────────────
function QuizEngine({ questions, title, onBack, color, mode }) {
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const [showExplanation, setShowExplanation] = useState(false);

    const q = questions[current];
    const selected = answers[current];
    const answered = selected !== null;

    const handleSelect = (optIdx) => {
        if (answers[current] !== null) return;
        const newAnswers = [...answers];
        newAnswers[current] = optIdx;
        setAnswers(newAnswers);
        if (optIdx === q.correct) setScore(s => s + 1);

        // In Practice mode, show immediate feedback
        if (mode === 'practice') {
            setShowExplanation(true);
        }
    };

    const handleNext = () => {
        setShowExplanation(false);
        if (current + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
        }
    };

    const handlePrevious = () => {
        setShowExplanation(false);
        if (current > 0) {
            setCurrent(c => c - 1);
        }
    };

    const handleJump = (idx) => {
        setShowExplanation(false);
        setCurrent(idx);
    };

    useEffect(() => {
        if (finished) return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    setFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [finished]);

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        let msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        let msgSub = pct >= 90 ? 'You have excellent control over this topic!' : 'Review the concepts and try again for 100%.';

        return (
            <div className="int-quiz-finished" style={{ textAlign: 'center', padding: '40px 0' }}>
                <img src={mascot} alt="Mascot" style={{ width: 120, height: 'auto', marginBottom: 16 }} />
                <div className="int-quiz-score-circle" style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '8px solid #fff',
                    position: 'relative'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: 'var(--int-text)', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: 'var(--int-muted)', fontWeight: 700 }}>out of {questions.length}</div>
                    </div>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: 'var(--int-text)', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: 'var(--int-muted)', fontSize: 15, margin: '0 0 32px' }}>{msgSub}</p>
                <div className="int-quiz-finished-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                        className="int-btn-primary"
                        onClick={() => { setCurrent(0); setAnswers(Array(questions.length).fill(null)); setScore(0); setFinished(false); setTimeLeft(15 * 60); setShowExplanation(false); }}
                        style={{ padding: '12px 24px', background: color, border: 'none', color: '#fff', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}
                    >
                        Try Again
                    </button>
                    <button
                        className="int-btn-secondary"
                        onClick={onBack}
                        style={{ padding: '12px 24px', background: '#fff', border: '1.5px solid #e2e8f0', color: '#64748b', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}
                    >
                        Return to Skills
                    </button>
                </div>
            </div>
        );
    }

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="int-quiz-active int-quiz-container" style={{
            background: '#F8FAFC', padding: '24px', borderRadius: '24px',
            fontFamily: '"Outfit", sans-serif', maxWidth: '1200px', margin: '0 auto',
            height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
            <style>{`
                .palette-btn {
                    height: 44px; width: 44px; display: flex; align-items: center; justify-content: center;
                    border-radius: 10px; font-weight: 700; font-size: 0.9rem; cursor: pointer;
                    transition: all 0.15s ease; border: 1.5px solid #E2E8F0; background: #F8FAFC;
                    color: #64748B; box-shadow: 0 1px 3px rgba(0,0,0,0.04);
                }
                .palette-btn.current { border: 2px solid ${color}; background: #fff; color: ${color}; box-shadow: 0 0 0 2px ${color}20; }
                .palette-btn.answered { background: ${color}; color: white; border-color: ${color}; box-shadow: 0 2px 6px ${color}30; }
                .palette-btn:hover:not(.answered) { border-color: ${color}; background: ${color}05; color: ${color}; transform: translateY(-1px); }
                
                .quiz-layout-grid {
                    display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 2rem;
                    align-items: start; height: 100%; overflow: hidden;
                }

                @media (max-width: 900px) {
                    .quiz-layout-grid { grid-template-columns: 1fr; overflow-y: auto; }
                    .quiz-palette-container { position: static !important; }
                }
            `}</style>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: 1.5 }}>{mode === 'practice' ? 'PRACTICE' : 'ASSESSMENT'}</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#1E293B', margin: 0, textAlign: 'center', flex: 1 }}>{title}</h3>
                <div style={{ width: '100px' }}></div>
            </div>

            <div className="quiz-layout-grid">
                <div className="quiz-left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', overflow: 'hidden' }}>
                    <div className="int-quiz-card" style={{
                        background: '#fff', borderRadius: 20, padding: '1rem 1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)',
                        flex: 1, display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: `${color}10`, padding: '4px 10px', borderRadius: '999px',
                            fontSize: 10, fontWeight: 700, color: color, marginBottom: 10,
                            textTransform: 'uppercase', letterSpacing: '0.5px'
                        }}>
                            <span>QUESTION {current + 1}</span>
                        </div>

                        <div className="int-quiz-question-text" style={{ fontSize: 17, fontWeight: 600, color: '#1E293B', lineHeight: 1.4, marginBottom: 12 }}>
                            {q.question}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {q.options.map((opt, oi) => {
                                const isSelected = selected === oi;
                                const isCorrect = q.correct === oi;
                                let borderColor = '#E2E8F0';
                                let bgColor = '#fff';

                                if (isSelected) {
                                    if (mode === 'practice') {
                                        borderColor = isCorrect ? '#10b981' : '#ef4444';
                                        bgColor = isCorrect ? '#ecfdf5' : '#fef2f2';
                                    } else {
                                        borderColor = color;
                                        bgColor = `${color}05`;
                                    }
                                } else if (showExplanation && isCorrect) {
                                    borderColor = '#10b981';
                                    bgColor = '#ecfdf5';
                                }

                                return (
                                    <button
                                        key={oi}
                                        onClick={() => handleSelect(oi)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 12,
                                            padding: '10px 16px', borderRadius: 12,
                                            border: `2px solid ${borderColor}`,
                                            background: bgColor, cursor: answered ? 'default' : 'pointer',
                                            fontSize: 14, color: '#475569', textAlign: 'left',
                                            transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500,
                                            minHeight: '52px'
                                        }}
                                    >
                                        <div style={{
                                            width: 10, height: 10, borderRadius: '50%',
                                            background: isSelected ? (mode === 'practice' ? (isCorrect ? '#10b981' : '#ef4444') : color) : '#E2E8F0'
                                        }} />
                                        <span style={{ fontSize: '1rem' }}>
                                            <MathRenderer text={opt} />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {showExplanation && (
                            <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: '12px', borderLeft: `6px solid ${selected === q.correct ? '#10b981' : '#ef4444'}` }}>
                                <div style={{ fontWeight: 800, color: '#1E293B', marginBottom: '4px', fontSize: 13 }}>EXPLANATION</div>
                                <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.4 }}>
                                    {q.explanation}
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px', margin: '4px 0' }}>
                        <button
                            onClick={handlePrevious}
                            disabled={current === 0}
                            style={{
                                padding: '10px 24px', background: '#fff',
                                color: current === 0 ? '#CBD5E1' : '#1E293B',
                                border: '1px solid #E2E8F0', borderRadius: '999px', fontSize: 14, fontWeight: 700,
                                cursor: current === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!answered}
                            style={{
                                padding: '10px 32px', background: !answered ? '#E2E8F0' : color,
                                color: '#fff', cursor: !answered ? 'not-allowed' : 'pointer',
                                border: 'none', borderRadius: '999px', fontSize: 14, fontWeight: 700,
                                transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                boxShadow: answered ? `0 4px 12px ${color}30` : 'none'
                            }}
                        >
                            {current === questions.length - 1 ? 'Finish' : 'Next'} →
                        </button>
                    </div>
                </div>

                <div className="quiz-palette-container" style={{
                    background: '#fff', borderRadius: 24, padding: '1.25rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)',
                    position: 'sticky', top: 0, maxHeight: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}>
                    <div style={{
                        background: '#F8FAFC', borderRadius: 16, padding: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', marginBottom: '2rem'
                    }}>
                        ⏱ {formatTime(timeLeft)}
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', marginBottom: '1rem' }}>Question Palette</h4>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 44px)', gap: '8px', marginBottom: '1.75rem' }}>
                        {questions.map((_, idx) => (
                            <div
                                key={idx}
                                className={`palette-btn ${current === idx ? 'current' : ''} ${answers[idx] !== null ? 'answered' : ''}`}
                                onClick={() => handleJump(idx)}
                            >
                                {idx + 1}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: 16, height: 16, borderRadius: 5, background: color }} /> Answered
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: 16, height: 16, borderRadius: 5, background: '#F8FAFC', border: '1.5px solid #E2E8F0' }} /> Not Answered
                        </div>
                    </div>

                    <button
                        onClick={() => { if (window.confirm('Are you sure you want to finish the assessment?')) setFinished(true) }}
                        style={{
                            width: '100%', padding: '14px', background: '#EF4444', color: '#fff',
                            border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                            cursor: 'pointer', transition: 'all 0.2s', marginTop: '2rem',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        Submit Assessment
                    </button>
                </div>
            </div>
        </div >
    );
}

const SKILLS = [
    { id: 'intro', title: 'Introduction', subtitle: 'Skill 1 · Fundamental', desc: 'Basic building blocks of geometry.', icon: '📌', color: '#0891b2' },
    { id: 'lsr', title: 'Line, Segment & Ray', subtitle: 'Skill 2 · Drawing', desc: 'Points, paths, and directions.', icon: '↔️', color: '#10b981' },
    { id: 'lt', title: 'Types of Lines', subtitle: 'Skill 3 · Configuration', desc: 'Parallel and intersecting paths.', icon: '🛤️', color: '#f59e0b' },
    { id: 'at', title: 'Types of Angles', subtitle: 'Skill 4 · Measurement', desc: 'Acute, Obtuse, and more.', icon: '📐', color: '#ef4444' },
    { id: 'aa', title: 'Adjacent Angles', subtitle: 'Skill 5 · Relationships', desc: 'Understanding neighbors.', icon: '🤝', color: '#6366f1' },
    { id: 'lp', title: 'Linear Pair', subtitle: 'Skill 6 · Common Line', desc: 'Angles on a straight path.', icon: '➖', color: '#7c3aed' },
    { id: 'vo', title: 'Vertically Opposite', subtitle: 'Skill 7 · X-Cross', desc: 'Intersection properties.', icon: '❌', color: '#ec4899' },
    { id: 'trans', title: 'Transversal', subtitle: 'Skill 8 · Parallel Cross', desc: 'Z and F shape angles.', icon: '⚡', color: '#3b82f6' },
    { id: 'ap', title: 'Angles at a Point', subtitle: 'Skill 9 · Full Turn', desc: 'The 360-degree rotation.', icon: '🔘', color: '#0d9488' },
    { id: 'rl', title: 'Real Life Geometry', subtitle: 'Skill 10 · Application', desc: 'Math in the real world.', icon: '🌍', color: '#4f46e5' }
];

const SkillCard = ({ skill, idx, onLaunch }) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: '#fff', borderRadius: 18, padding: '24px 32px',
                border: `1.5px solid ${hover ? skill.color : 'rgba(0,0,0,0.06)'}`,
                boxShadow: hover ? `0 12px 28px ${skill.color}20` : '0 4px 12px rgba(0,0,0,0.02)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hover ? 'translateY(-2px)' : 'none'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: hover ? `${skill.color}15` : '#f8fafc',
                    color: skill.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0
                }}>
                    {skill.icon}
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                        {skill.subtitle}
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 800, color: '#0f172a' }}>{skill.title}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#64748b', fontWeight: 500 }}>{skill.desc}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => onLaunch(idx, 'learn')} style={{ padding: '10px 24px', fontSize: 13.5, fontWeight: 700, borderRadius: 999, border: '1.5px solid #e2e8f0', background: '#fff', color: '#334155', cursor: 'pointer' }}>Learn</button>
                <button onClick={() => onLaunch(idx, 'practice')} style={{ padding: '10px 24px', fontSize: 13.5, fontWeight: 700, borderRadius: 999, border: '1.5px solid #e2e8f0', background: '#fff', color: '#334155', cursor: 'pointer' }}>Practice</button>
                <button onClick={() => onLaunch(idx, 'assess')} style={{ padding: '10px 24px', fontSize: 13.5, fontWeight: 700, borderRadius: 999, border: 'none', background: skill.color, color: '#fff', cursor: 'pointer' }}>Assess</button>
            </div>
        </div>
    );
};

export default function LinesAndAnglesSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assess' | 'learn'
    const [activeIdx, setActiveIdx] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    // Force non-scrollable body when practicing or learning
    useEffect(() => {
        if (view !== 'list') {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [view]);

    const handleLaunch = (idx, mode) => {
        const skill = SKILLS[idx];
        if (mode === 'learn') {
            setActiveIdx(idx);
            setView('learn');
        } else {
            const qSet = generateLinesAndAnglesQuestions(skill.id, 10);
            setQuestions(qSet);
            setActiveIdx(idx);
            setView(mode);
        }
    };

    const activeSkill = activeIdx !== null ? SKILLS[activeIdx] : null;

    if (view !== 'list' && activeSkill) {
        return (
            <div className="skills-page" style={{
                background: '#f8fafc',
                position: 'fixed',
                top: 70, /* Below Global Header */
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10
            }}>
                <nav className="intro-nav" style={{ position: 'relative', top: 0, zIndex: 100, flexShrink: 0 }}>
                    <button className="intro-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className="intro-nav-links">
                        <button className="intro-nav-link" onClick={() => navigate('/middle/grade/6/lines-and-angles/introduction-hub')}>🌟 Intro</button>
                        <button className="intro-nav-link" onClick={() => navigate('/middle/grade/6/lines-and-angles/terminology')}>📖 Terminology</button>
                        <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ flex: 1, overflow: 'hidden', padding: '24px' }}>
                    {view === 'learn' ? (
                        <div className="int-lexicon-container" style={{ maxWidth: 1100, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center', flexShrink: 0 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeSkill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{activeSkill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', margin: 0 }}>Learn: {activeSkill.title}</h1>
                            </div>

                            {/* Learn Grid Layout */}
                            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, flex: 1, overflow: 'hidden' }}>
                                <aside style={{ background: '#fff', padding: 12, borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
                                    {SKILL_LEARN_DATA[activeSkill.id].rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12,
                                                border: '1px solid', borderColor: selectedLearnIdx === ri ? activeSkill.color : 'rgba(0,0,0,0.05)',
                                                background: selectedLearnIdx === ri ? activeSkill.color : '#fff',
                                                color: selectedLearnIdx === ri ? '#fff' : '#1E293B',
                                                transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left', flexShrink: 0
                                            }}
                                        >
                                            <div style={{ width: 24, height: 24, borderRadius: 6, background: selectedLearnIdx === ri ? 'rgba(255,255,255,0.2)' : `${activeSkill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900 }}>{ri + 1}</div>
                                            <span style={{ fontWeight: 700, fontSize: 15 }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                <main style={{ background: '#fff', borderRadius: 20, padding: '20px 28px', border: `2px solid ${activeSkill.color}15`, boxShadow: '0 8px 30px rgba(0,0,0,0.03)', overflow: 'hidden', maxHeight: '100%' }}>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: activeSkill.color }}>{SKILL_LEARN_DATA[activeSkill.id].rules[selectedLearnIdx].title}</h3>
                                    <div style={{ background: `${activeSkill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${activeSkill.color}15`, margin: '24px 0', textAlign: 'center' }}>
                                        <div style={{ fontSize: 42, fontWeight: 800, color: activeSkill.color }}>
                                            <MathRenderer text={`$$${SKILL_LEARN_DATA[activeSkill.id].rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, paddingBottom: 20 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, color: '#64748B', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, color: '#1E293B' }}>{SKILL_LEARN_DATA[activeSkill.id].rules[selectedLearnIdx].d}</p>
                                        </div>
                                        <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20 }}>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, color: activeSkill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <p style={{ fontSize: 16, fontWeight: 700, color: '#1E293B' }}>{SKILL_LEARN_DATA[activeSkill.id].rules[selectedLearnIdx].ex}</p>
                                            <div style={{ marginTop: 16, padding: 12, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, color: '#64748b' }}>
                                                💡 <b>Tip:</b> {SKILL_LEARN_DATA[activeSkill.id].rules[selectedLearnIdx].tip}
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : (
                        <QuizEngine
                            questions={questions}
                            title={activeSkill.title}
                            color={activeSkill.color}
                            mode={view}
                            onBack={() => setView('list')}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="int-page" style={{
            background: '#f8fafc',
            position: 'fixed',
            top: 70,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <nav className="intro-nav" style={{ flexShrink: 0 }}>
                <button className="intro-nav-back" onClick={() => navigate('/middle/grade/6/lines-and-angles/hub')}>← Back to Hub</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/middle/grade/6/lines-and-angles/introduction-hub')}>🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/middle/grade/6/lines-and-angles/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, overflow: 'hidden', padding: '0 24px' }}>
                <div className="int-lexicon-container" style={{ maxWidth: 1100, margin: '24px auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 32 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.4rem', fontWeight: 900, color: '#1E293B', margin: '0 0 6px' }}>
                            Lines and Angles <span style={{ background: 'linear-gradient(135deg, #0891b2, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                        </h1>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#64748B' }}>Master the geometric world with interactive practice.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: '40px' }}>
                        {SKILLS.map((skill, idx) => (
                            <SkillCard key={skill.id} skill={skill} idx={idx} onLaunch={handleLaunch} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
