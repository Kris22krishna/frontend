import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LinesAndAngles.css';
import mascot from '@/assets/mascot.png';
import MathRenderer from '@/components/MathRenderer';
import { SKILL_LEARN_DATA, generateLinesAndAnglesQuestions } from './linesAndAnglesQuestions';
import { ArrowLeft } from 'lucide-react';

// ─── Shared Quiz Engine ────────────────────────────────────────────────────
function QuizEngine({ questions, title, onBack, color, isPractice }) {
    const [current, setCurrent] = useState(0);
    // answers[i] = null (unanswered) or the index of the selected option
    const [answers, setAnswers] = useState(() => Array(questions?.length || 0).fill(null));
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    if (!questions || questions.length === 0) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading questions...</div>;
    }

    const q = questions[current];
    const selected = answers[current];
    const answered = selected !== null;

    const handleSelect = (optIdx) => {
        if (answers[current] !== null) return; // already answered
        const newAnswers = [...answers];
        newAnswers[current] = optIdx;
        setAnswers(newAnswers);
        if (optIdx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
        }
    };

    const handlePrevious = () => {
        if (current > 0) {
            setCurrent(c => c - 1);
        }
    };

    const handleJump = (idx) => {
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
            <div className="la-quiz-finished" style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className="la-quiz-score-circle" style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '8px solid #fff'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: 'var(--la-text)', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: 'var(--la-muted)', fontWeight: 700 }}>out of {questions.length}</div>
                    </div>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: 'var(--la-text)', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: 'var(--la-muted)', fontSize: 15, margin: '0 0 32px' }}>{msgSub}</p>
                <div className="la-quiz-finished-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                        className="la-btn-primary"
                        onClick={() => { setCurrent(0); setAnswers(Array(questions.length).fill(null)); setScore(0); setFinished(false); setTimeLeft(15 * 60); }}
                        style={{ padding: '12px 24px', background: color }}
                    >
                        Try Again
                    </button>
                    <button
                        className="la-btn-secondary"
                        onClick={onBack}
                        style={{ padding: '12px 24px' }}
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
        <div className="la-quiz-active la-quiz-container" style={{
            background: '#F8FAFC',
            padding: '2rem',
            borderRadius: '24px',
            fontFamily: '"Outfit", sans-serif',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <style>{`
                .palette-btn {
                    height: 44px;
                    width: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.15s ease;
                    border: 1.5px solid #E2E8F0;
                    background: #F8FAFC;
                    color: #64748B;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
                }
                .palette-btn.current {
                    border: 2px solid ${color};
                    background: #fff;
                    color: ${color};
                    box-shadow: 0 0 0 2px ${color}20;
                }
                .palette-btn.answered {
                    background: ${color};
                    color: white;
                    border-color: ${color};
                    box-shadow: 0 2px 6px ${color}40;
                }
                .palette-btn:hover:not(.answered) {
                    border-color: ${color};
                    background: ${color}10;
                    color: ${color};
                    transform: translateY(-1px);
                }
                
                .quiz-layout-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 280px;
                    gap: 2rem;
                    align-items: start;
                }

                @media (max-width: 900px) {
                    .quiz-layout-grid {
                        grid-template-columns: 1fr;
                    }
                    .quiz-palette-container {
                        position: static !important;
                    }
                }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{title.split(':')[0]}</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--la-text)', margin: 0, textAlign: 'center', flex: 1 }}>{title.split(': ')[1] || title}</h3>
                <div style={{ width: '100px' }}></div> {/* Spacer for centering title */}
            </div>

            <div className="quiz-layout-grid">
                {/* Left Column: Question & Options */}
                <div className="quiz-left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Question Card */}
                    <div className="la-quiz-card" style={{
                        background: '#fff',
                        borderRadius: 24, padding: '2rem 2.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: `${color}15`, padding: '6px 16px', borderRadius: '999px',
                            fontSize: 13, fontWeight: 700, color: color, marginBottom: 20,
                            textTransform: 'uppercase', letterSpacing: '0.5px'
                        }}>
                            <span>QUESTION {current + 1}</span>
                        </div>

                        <div className="la-quiz-question-text" style={{ fontSize: 20, fontWeight: 600, color: '#1E293B', lineHeight: 1.6, marginBottom: 32 }}>
                            {q.question.includes('$') ? <MathRenderer text={q.question} /> : q.question}
                        </div>

                        {q.math && (
                            <div style={{
                                background: '#F8FAFC', border: `2px solid #E2E8F0`,
                                borderRadius: 16, padding: '24px', marginBottom: 32,
                                fontSize: 26, color: '#0F172A', textAlign: 'center', fontWeight: 600
                            }}>
                                <MathRenderer text={q.math.includes('$') ? q.math : `$$${q.math}$$`} />
                            </div>
                        )}

                        {/* Options */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                            {q.options.map((opt, oi) => {
                                // Handle styling based on practice mode and whether it's answered
                                const isSelected = selected === oi;
                                let borderColor = '#E2E8F0';
                                let bgColor = '#fff';
                                let textColor = '#475569';
                                let dotColor = '#E2E8F0';

                                if (isPractice && answered) {
                                    if (oi === q.correct) {
                                        borderColor = '#10B981'; // Green for correct
                                        bgColor = '#ECFDF5';
                                        textColor = '#047857';
                                        dotColor = '#10B981';
                                    } else if (isSelected && oi !== q.correct) {
                                        borderColor = '#EF4444'; // Red for wrong selection
                                        bgColor = '#FEF2F2';
                                        textColor = '#B91C1C';
                                        dotColor = '#EF4444';
                                    } else {
                                        // Other unselected options remain neutral but slightly faded
                                        textColor = '#94A3B8';
                                    }
                                } else {
                                    if (isSelected) {
                                        borderColor = color;
                                        bgColor = `${color}10`;
                                        textColor = color;
                                        dotColor = color;
                                    }
                                }

                                return (
                                    <button
                                        key={oi}
                                        onClick={() => handleSelect(oi)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 16,
                                            padding: '16px 20px', borderRadius: 16,
                                            border: `2px solid ${borderColor}`,
                                            background: bgColor, cursor: 'pointer',
                                            fontSize: 16, color: textColor, textAlign: 'left',
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            fontWeight: isSelected ? 700 : 500,
                                            boxShadow: isSelected ? `0 4px 12px ${color}20` : 'none',
                                            minHeight: '70px'
                                        }}
                                    >
                                        <div style={{
                                            width: 12, height: 12, borderRadius: '50%', background: dotColor, flexShrink: 0,
                                            transition: 'all 0.2s'
                                        }} />
                                        <span style={{ fontSize: '1.1rem', marginTop: '2px' }}>
                                            {typeof opt === 'string' && (opt.includes('$') || opt.includes('^') || opt.includes('=') || opt.includes('/')) ? (
                                                <MathRenderer text={opt.includes('$') ? opt : `$${opt}$`} />
                                            ) : (
                                                opt
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation Box for Practice Mode */}
                        {isPractice && answered && (
                            <div style={{
                                marginTop: 32, padding: '24px', borderRadius: 16,
                                background: selected === q.correct ? '#ECFDF5' : '#FEF2F2',
                                border: `2px solid ${selected === q.correct ? '#10B981' : '#EF4444'}`,
                                animation: 'fadeIn 0.3s ease'
                            }}>
                                <h4 style={{ margin: '0 0 12px', color: selected === q.correct ? '#047857' : '#B91C1C', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {selected === q.correct ? '✅ Correct!' : '❌ Incorrect'}
                                </h4>
                                <div style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#334155' }}>
                                    <span style={{ fontWeight: 700, color: '#1E293B', marginRight: 8 }}>Explanation:</span>
                                    {q.explanation && q.explanation.includes('$') ? (
                                        <MathRenderer text={q.explanation} />
                                    ) : (
                                        q.explanation
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Left Actions (Previous / Next Buttons) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', width: '100%' }}>
                        <button
                            onClick={handlePrevious}
                            disabled={current === 0}
                            style={{
                                padding: '14px 28px',
                                background: '#fff',
                                color: current === 0 ? '#CBD5E1' : '#1E293B',
                                border: '1px solid #E2E8F0',
                                borderRadius: '999px', fontSize: 16, fontWeight: 700,
                                cursor: current === 0 ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                        >
                            <span style={{ fontSize: '1.2em' }}>←</span> Previous
                        </button>
                        <button
                            onClick={handleNext}
                            style={{
                                padding: '14px 36px',
                                background: color,
                                color: '#fff',
                                cursor: 'pointer',
                                border: 'none', borderRadius: '999px', fontSize: 16, fontWeight: 700,
                                transition: 'all 0.3s ease',
                                boxShadow: `0 4px 12px ${color}50`,
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            Next <span style={{ fontSize: '1.2em' }}>→</span>
                        </button>
                    </div>

                </div>

                {/* Right Column: Sticky Palette */}
                <div className="quiz-palette-container" style={{
                    background: '#fff',
                    borderRadius: 24, padding: '2rem 1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'sticky', top: '2rem',
                    display: 'flex', flexDirection: 'column'
                }}>
                    {/* Timer Header */}
                    <div style={{
                        background: '#F8FAFC', borderRadius: 16, padding: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', marginBottom: '2rem'
                    }}>
                        ⏱ {formatTime(timeLeft)}
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', marginBottom: '1rem', letterSpacing: 0.5 }}>Question Palette</h4>

                    {/* Number Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 44px)', gap: '8px', marginBottom: '1.75rem' }}>
                        {questions.map((_, idx) => {
                            const isAnswered = answers[idx] !== null;
                            const isCurrent = current === idx;
                            let statusClass = '';
                            if (isCurrent) statusClass = 'current';
                            else if (isAnswered) statusClass = 'answered';

                            return (
                                <div
                                    key={idx}
                                    className={`palette-btn ${statusClass}`}
                                    onClick={() => handleJump(idx)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {idx + 1}
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#64748B', fontWeight: 600, marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: 16, height: 16, borderRadius: 5, background: color }} /> Answered
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: 16, height: 16, borderRadius: 5, background: '#F8FAFC', border: '1.5px solid #E2E8F0' }} /> Not Answered
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: 'auto' }}>
                        <button
                            onClick={() => { if (window.confirm('Are you sure you want to surrender your test and view the score?')) setFinished(true) }}
                            style={{
                                width: '100%', padding: '14px',
                                background: '#EF4444', color: '#fff',
                                border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                                cursor: 'pointer', transition: 'all 0.2s',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
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

const SKILLS = [
    { id: 'introduction', title: 'Introduction', subtitle: 'Skill 1 · Fundamental', desc: 'Basic building blocks of geometry.', icon: '📌', color: '#0891b2' },
    { id: 'line-segment-ray', title: 'Line, Segment & Ray', subtitle: 'Skill 2 · Drawing', desc: 'Points, paths, and directions.', icon: '↔️', color: '#10b981' },
    { id: 'line-types', title: 'Types of Lines', subtitle: 'Skill 3 · Configuration', desc: 'Parallel and intersecting paths.', icon: '🛤️', color: '#f59e0b' },
    { id: 'angle-types', title: 'Types of Angles', subtitle: 'Skill 4 · Measurement', desc: 'Acute, Obtuse, and more.', icon: '📐', color: '#ef4444' },
    { id: 'adjacent-angles', title: 'Adjacent Angles', subtitle: 'Skill 5 · Relationships', desc: 'Understanding neighbors.', icon: '🤝', color: '#6366f1' },
    { id: 'linear-pair', title: 'Linear Pair of Angles', subtitle: 'Skill 6 · Common Line', desc: 'Angles on a straight path.', icon: '➖', color: '#7c3aed' },
    { id: 'vertically-opposite', title: 'Vertically Opposite Angles', subtitle: 'Skill 7 · X-Cross', desc: 'Intersection properties.', icon: '❌', color: '#ec4899' },
    { id: 'transversal-angles', title: 'Angles formed by a Transversal', subtitle: 'Skill 8 · Parallel Cross', desc: 'Z and F shape angles.', icon: '⚡', color: '#3b82f6' },
    { id: 'angles-at-point', title: 'Angles at a Point', subtitle: 'Skill 9 · Full Turn', desc: 'The 360-degree rotation.', icon: '🔘', color: '#0d9488' },
    { id: 'real-life-examples', title: 'Real Life Examples', subtitle: 'Skill 10 · Application', desc: 'Math in the real world.', icon: '🌍', color: '#4f46e5' }
];

const SkillCard = ({ skill, onLearn, onPractice, onAssess }) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: '#fff', borderRadius: 18, padding: '24px 32px',
                border: `1.5px solid ${hover ? skill.color : '#E2E8F0'}`,
                boxShadow: hover ? `0 12px 28px ${skill.color}20` : '0 4px 12px rgba(0,0,0,0.02)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hover ? 'translateY(-2px)' : 'none',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: hover ? `${skill.color}15` : '#F8FAFC',
                    color: skill.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0
                }}>
                    {skill.icon}
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                        {skill.subtitle}
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 800, color: '#0F172A' }}>{skill.title}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#64748B', fontWeight: 500 }}>{skill.desc}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
                <button
                    onClick={() => onLearn(skill)}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: '1.5px solid #E2E8F0', background: '#fff', color: '#334155',
                        transition: '0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.color = skill.color; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#334155'; }}
                >
                    Learn
                </button>
                <button
                    onClick={() => onPractice(skill)}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: '1.5px solid #E2E8F0', background: '#fff', color: '#334155',
                        transition: '0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.color = skill.color; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#334155'; }}
                >
                    Practice
                </button>
                <button
                    onClick={() => onAssess(skill)}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: 'none', background: skill.color, color: '#fff',
                        transition: '0.2s', boxShadow: `0 4px 12px ${skill.color}30`
                    }}
                >
                    Assess
                </button>
            </div>
        </div>
    );
};

export default function LinesAndAnglesSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'learn' | 'practice' | 'assessment'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    // Memoize the generated questions so they don't shuffle on every render
    const quizQuestions = useMemo(() => {
        if (view === 'practice' || view === 'assessment') {
            return generateLinesAndAnglesQuestions(activeSkill.id, 10);
        }
        return [];
    }, [view, activeSkill]);

    const handleLearn = (skill) => {
        setActiveSkill(skill);
        setView('learn');
        setSelectedLearnIdx(0);
    };

    const handlePractice = (skill) => {
        setActiveSkill(skill);
        setView('practice');
    };

    const handleAssess = (skill) => {
        setActiveSkill(skill);
        setView('assessment');
    };

    const handleBackToList = () => {
        setView('list');
    };


    if (view === 'practice' || view === 'assessment') {
        const title = `${view === 'practice' ? 'Practice' : 'Assessment'}: ${activeSkill.title}`;
        return (
            <div className="la-lexicon-container" style={{ maxWidth: 1200, margin: '80px auto 40px', padding: '0 24px' }}>
                <QuizEngine
                    questions={quizQuestions}
                    title={title}
                    onBack={handleBackToList}
                    color={activeSkill.color}
                    isPractice={view === 'practice'}
                />
            </div>
        );
    }

    if (view === 'learn' && activeSkill) {
        const learnData = SKILL_LEARN_DATA[activeSkill.id];
        return (
            <div className="la-chapter-page" style={{ minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className="la-chapter-header" style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button className="la-back-btn" onClick={() => setView('list')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: '#64748B' }}>
                        <ArrowLeft size={18} /> Back to Skills
                    </button>
                    <h1 style={{ fontSize: '1.2rem', margin: 0, color: '#1E293B' }}>Learn: {activeSkill.title}</h1>
                </nav>

                <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, justifyContent: 'center' }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeSkill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{activeSkill.icon}</div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', margin: 0 }}>{activeSkill.title}</h1>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32 }}>
                        {/* Side Selector */}
                        <aside style={{
                            background: '#F8FAFC', padding: '20px', borderRadius: 24, border: '1px solid #E2E8F0',
                            display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '65vh', overflowY: 'auto'
                        }}>
                            {learnData && learnData.rules.map((rule, ri) => (
                                <button
                                    key={ri}
                                    onClick={() => setSelectedLearnIdx(ri)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderRadius: 16,
                                        border: '1px solid', borderColor: selectedLearnIdx === ri ? activeSkill.color : 'transparent',
                                        background: selectedLearnIdx === ri ? activeSkill.color : '#fff',
                                        color: selectedLearnIdx === ri ? '#fff' : '#334155',
                                        transition: '0.2s', cursor: 'pointer', textAlign: 'left',
                                        boxShadow: selectedLearnIdx === ri ? `0 8px 24px ${activeSkill.color}40` : '0 2px 8px rgba(0,0,0,0.02)'
                                    }}
                                >
                                    <div style={{
                                        width: 28, height: 28, borderRadius: 8,
                                        background: selectedLearnIdx === ri ? 'rgba(255,255,255,0.2)' : `${activeSkill.color}15`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 14, fontWeight: 900, flexShrink: 0
                                    }}>{ri + 1}</div>
                                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>{rule.title}</span>
                                </button>
                            ))}
                        </aside>

                        {/* Detailed Window */}
                        <main style={{
                            background: '#fff', borderRadius: 24, padding: '40px', border: `2px solid ${activeSkill.color}20`,
                            boxShadow: '0 12px 40px rgba(0,0,0,0.06)', minHeight: 500
                        }}>
                            {learnData && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 8px', fontSize: '2.2rem', fontWeight: 900, color: activeSkill.color }}>{learnData.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: '#64748B', letterSpacing: 1 }}>CONCEPT {selectedLearnIdx + 1} OF {learnData.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: '3rem' }}>{activeSkill.icon}</div>
                                    </div>

                                    <div style={{ background: `${activeSkill.color}05`, padding: '32px', borderRadius: 24, border: `2px solid ${activeSkill.color}15`, marginBottom: 40, textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: activeSkill.color }}>
                                            <MathRenderer text={`$$${learnData.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748B', marginBottom: 12 }}>Explanation</h4>
                                            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, margin: 0, color: '#1E293B' }}>{learnData.rules[selectedLearnIdx].d}</p>

                                            <div style={{ marginTop: 24, background: '#F0FDFA', padding: '20px', borderRadius: 16, border: '1px solid #CCFBF1' }}>
                                                <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.6, color: '#0F766E' }}>
                                                    <span style={{ fontWeight: 800 }}>🛡️ Pro Tip: </span>
                                                    {learnData.rules[selectedLearnIdx].tip}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: activeSkill.color, marginBottom: 12 }}>Example</h4>
                                            <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 20, border: '1px solid #E2E8F0', height: '100%' }}>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#334155' }}>{learnData.rules[selectedLearnIdx].ex}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button
                                            onClick={() => handlePractice(activeSkill)}
                                            style={{ padding: '16px 32px', background: activeSkill.color, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: `0 8px 20px ${activeSkill.color}40`, transition: '0.2s' }}
                                        >
                                            Start Practice →
                                        </button>
                                        <button
                                            onClick={() => {
                                                const nextIdx = (selectedLearnIdx + 1) % learnData.rules.length;
                                                setSelectedLearnIdx(nextIdx);
                                            }}
                                            style={{ padding: '16px 32px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', transition: '0.2s' }}
                                        >
                                            Read Next Concept
                                        </button>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="la-chapter-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav className="la-chapter-header" style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
                <button className="la-back-btn" onClick={() => navigate('/middle/grade/6/lines-and-angles/hub')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: '#64748B' }}>
                    <ArrowLeft size={18} /> Back to Chapter
                </button>
                <h1 style={{ fontSize: '1.2rem', margin: 0, color: '#1E293B', marginLeft: 'auto' }}>Applied Skills</h1>
            </nav>

            <div style={{ flex: 1, padding: '40px 24px', overflowY: 'auto', background: '#F8FAFC' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
                        <img src={mascot} alt="Mascot" style={{ width: 100, height: 'auto', marginBottom: 20 }} />
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#1E293B', margin: '0 0 8px' }}>
                            Lines and Angles <span style={{ color: '#0CA5E9' }}>Skills</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#64748B' }}>Master the geometric world with interactive practice modes.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {SKILLS.map((skill) => (
                            <SkillCard
                                key={skill.id}
                                skill={skill}
                                onLearn={() => handleLearn(skill)}
                                onPractice={() => handlePractice(skill)}
                                onAssess={() => handleAssess(skill)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

