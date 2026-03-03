import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    BookOpen,
    Target,
    ChevronRight,
    Play,
    Book,
    Award,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Info,
    Gem,
    Plus,
    Calculator
} from 'lucide-react';
import '../../integers.css';
import MathRenderer from '../../../../MathRenderer';

// ─── DATA ──────────────────────────────────────────────────────────────────
const SKILLS_DATA = [
    {
        id: 'comparing',
        title: 'Comparing Integers',
        icon: <Target />,
        color: '#4f46e5',
        desc: 'Master greater than, less than, and number line logic.',
        path: '/middle/grade/6/the-other-side-of-zero/comparing-integers',
        learnContent: {
            title: "Comparing Signed Numbers",
            points: [
                {
                    h: "The Number Line Rule",
                    p: "Numbers to the right are always greater than numbers to the left.",
                    ex: "$5 > -10, \\quad -2 > -8$"
                }
            ]
        }
    },
    {
        id: 'absolute',
        title: 'Absolute Value',
        icon: <Gem />,
        color: '#8b5cf6',
        desc: 'Understand the distance of any number from zero.',
        path: '/middle/grade/6/the-other-side-of-zero/absolute-value',
        learnContent: {
            title: "Magnitude & Distance",
            points: [
                {
                    h: "Distance from Zero",
                    p: "Absolute value is a measure of distance, so it is always positive.",
                    ex: "$|-25| = 25, \\quad |0| = 0$"
                }
            ]
        }
    },
    {
        id: 'addition',
        title: 'Addition of Integers',
        icon: <Plus />,
        color: '#0d9488',
        desc: 'Add numbers with same or different signs.',
        path: '/middle/grade/6/the-other-side-of-zero/addition-of-integers',
        learnContent: {
            title: "Combining Integers",
            points: [
                {
                    h: "Additive Inverse",
                    p: "The sum of a number and its opposite is always zero.",
                    ex: "$(-7) + (+7) = 0$"
                }
            ]
        }
    },
    {
        id: 'subtraction',
        title: 'Subtraction of Integers',
        icon: <Calculator />,
        color: '#f59e0b',
        desc: 'Learn to subtract by adding the opposite.',
        path: '/middle/grade/6/the-other-side-of-zero/subtraction-of-integers',
        learnContent: {
            title: "Taking Away Integers",
            points: [
                {
                    h: "Adding the Opposite",
                    p: "To subtract an integer, add its additive inverse.",
                    ex: "$10 - (-5) = 10 + 5 = 15$"
                }
            ]
        }
    },
    {
        id: 'numberline',
        title: 'Number Line',
        icon: <ArrowRight />,
        color: '#ec4899',
        desc: 'Plot points and understand movement on the line.',
        path: '/middle/grade/6/the-other-side-of-zero/number-line-representation',
        learnContent: {
            title: "Visualizing Positions",
            points: [
                {
                    h: "Plotting Integers",
                    p: "Positive numbers go right of zero, negative numbers go left.",
                    ex: "$-3 \\text{ is 3 units left of } 0$"
                }
            ]
        }
    },
    {
        id: 'wordproblems',
        title: 'Word Problems',
        icon: <BookOpen />,
        color: '#06b6d4',
        desc: 'Solve real-life scenarios involving integers.',
        path: '/middle/grade/6/the-other-side-of-zero/word-problems',
        learnContent: {
            title: "Integers in Real Life",
            points: [
                {
                    h: "Context Clues",
                    p: "Look for words like 'below', 'debt', or 'loss' for negative values.",
                    ex: "$50m \\text{ below sea level } = -50$"
                }
            ]
        }
    }
];

// ─── COMPONENTS ────────────────────────────────────────────────────────────

function LearnView({ skill, onBack, onStartPractice }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="int-quiz-container"
        >
            <div className="int-quiz-card" style={{ borderTop: `6px solid ${skill.color}` }}>
                <button className="int-nav-link" onClick={onBack} style={{ marginBottom: '20px', paddingLeft: 0 }}>
                    ← Back to Skills
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '12px', borderRadius: '12px', background: `${skill.color}15`, color: skill.color }}>
                        {skill.icon}
                    </div>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: 900 }}>{skill.learnContent.title}</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {skill.learnContent.points.map((pt, i) => (
                        <div key={i} style={{ padding: '20px', borderRadius: '18px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: skill.color, marginBottom: '8px' }}>{pt.h}</h3>
                            <p style={{ fontSize: '15px', color: '#0f172a', lineHeight: 1.6, marginBottom: '16px' }}>{pt.p}</p>
                            <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '12px', border: `1px dashed ${skill.color}` }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase' }}>Example</span>
                                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#0f172a' }}>
                                    <MathRenderer text={pt.ex} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="int-cta-btn"
                    onClick={onStartPractice}
                    style={{ width: '100%', marginTop: '32px', background: skill.color, color: '#fff', height: '56px', fontSize: '16px' }}
                >
                    Check My Understanding →
                </button>
            </div>
        </motion.div>
    );
}

function QuizEngine({ skill, onBack }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = skill.questions[current];

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 < skill.questions.length) {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="int-quiz-container">
                <div className="int-quiz-card" style={{ textAlign: 'center', borderTop: `6px solid ${skill.color}` }}>
                    <Award size={64} color={skill.color} style={{ margin: '0 auto 20px' }} />
                    <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', color: '#0f172a' }}>Assessment Complete</h2>
                    <p style={{ color: '#1e293b', fontSize: '18px', marginBottom: '32px' }}>You scored {score} out of {skill.questions.length}</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button className="int-cta-btn" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}>Retry</button>
                        <button className="int-cta-btn" style={{ background: skill.color, color: '#fff' }} onClick={onBack}>Finish</button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="int-quiz-container">
            <div className="int-quiz-card" style={{ borderTop: `6px solid ${skill.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: skill.color }}>{skill.title.toUpperCase()}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{current + 1} / {skill.questions.length}</span>
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '32px', textAlign: 'center', lineHeight: 1.4, color: '#0f172a' }}>{q.question}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '32px' }}>
                    {q.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(i)}
                            style={{
                                padding: '20px',
                                borderRadius: '16px',
                                border: selected === i ? `2px solid ${skill.color}` : '2px solid #f1f5f9',
                                background: selected === i ? `${skill.color}05` : '#fff',
                                textAlign: 'left',
                                fontSize: '16px',
                                fontWeight: 700,
                                color: '#0f172a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                            disabled={answered}
                        >
                            <MathRenderer text={opt} />
                            {answered && i === q.correct && <CheckCircle2 size={20} className="text-emerald-500" />}
                            {answered && i === selected && i !== q.correct && <XCircle size={20} className="text-rose-500" />}
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {answered && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px', padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', gap: '8px', color: skill.color, marginBottom: '4px' }}>
                                <Info size={16} />
                                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>Explanation</span>
                            </div>
                            <p style={{ fontSize: '14px', color: '#0f172a', lineHeight: 1.6 }}>{q.explanation}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    className="int-cta-btn"
                    disabled={!answered}
                    onClick={handleNext}
                    style={{ width: '100%', background: answered ? skill.color : '#f1f5f9', color: answered ? '#fff' : '#475569' }}
                >
                    {current + 1 === skill.questions.length ? 'Finish' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

export default function IntegersSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // list, learn, quiz
    const [activeIdx, setActiveIdx] = useState(0);

    const activeSkill = SKILLS_DATA[activeIdx];

    return (
        <div className="int-page">
            <nav className="int-nav">
                <button className="int-nav-back" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/integers')}>
                    ← Back to Integers
                </button>
                <div className="int-nav-links">
                    <button className="int-nav-link" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/introduction')}>
                        <Sparkles size={16} style={{ marginRight: '6px' }} /> Introduction
                    </button>
                    <button className="int-nav-link" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/terminology')}>
                        <BookOpen size={16} style={{ marginRight: '6px' }} /> Terminology
                    </button>
                    <button className="int-nav-link int-nav-link--active">
                        <Target size={16} style={{ marginRight: '6px' }} /> Skills
                    </button>
                </div>
            </nav>

            <div className="int-hero">
                <div className="int-hero-deco int-hero-deco-a" />
                <div className="int-hero-deco int-hero-deco-b" />
                <h1 className="int-hero-title">Practice & <span className="int-hero-highlight">Assessment</span></h1>
                <p className="int-hero-sub">Step up from concepts to technical mastery ✨</p>
            </div>

            <div className="int-content">
                <AnimatePresence mode="wait">
                    {view === 'list' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="int-skills-list">
                            {SKILLS_DATA.map((skill, idx) => (
                                <div key={skill.id} className="int-skill-card">
                                    <div className="int-skill-info">
                                        <div className="int-skill-icon" style={{ background: `${skill.color}15`, color: skill.color }}>
                                            {skill.icon}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{skill.title}</h3>
                                            <p style={{ fontSize: '14px', color: '#1e293b' }}>{skill.desc}</p>
                                        </div>
                                    </div>
                                    <div className="int-skill-actions">
                                        <button
                                            className="int-nav-link"
                                            onClick={() => { setActiveIdx(idx); setView('learn'); }}
                                            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                                        >
                                            <Book size={16} style={{ marginRight: '6px' }} /> Learn
                                        </button>
                                        <button
                                            className="int-cta-btn"
                                            onClick={() => navigate(skill.path)}
                                            style={{ background: skill.color, color: '#fff', fontSize: '14px', height: '40px', padding: '0 20px' }}
                                        >
                                            Practice <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {view === 'learn' && (
                        <LearnView
                            skill={activeSkill}
                            onBack={() => setView('list')}
                            onStartPractice={() => navigate(activeSkill.path)}
                        />
                    )}

                    {view === 'quiz' && (
                        <QuizEngine
                            skill={activeSkill}
                            onBack={() => setView('list')}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
