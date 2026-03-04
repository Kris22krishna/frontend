import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    Sparkles,
    BookOpen,
    Target,
    Search,
    Lightbulb,
    Book,
    Scale,
    Activity,
    ArrowRightLeft,
    Ruler,
    RefreshCw,
    Zap
} from 'lucide-react';
import '../../integers.css';
import MathRenderer from '@/components/MathRenderer';

const TERM_DATA = {
    lexicon: [
        {
            id: "pos",
            name: "Positive Integers",
            icon: <Activity className="text-emerald-500" />,
            def: "Numbers greater than zero. They represent gains, heights, and forward movement.",
            example: "$+1, +2, +3, +100...$",
            details: "On a number line, these are the numbers to the right of zero. We often write them without the '+' sign, like just '5' instead of '+5'.",
            color: "#10b981"
        },
        {
            id: "neg",
            name: "Negative Integers",
            icon: <Activity className="text-rose-500" />,
            def: "Numbers less than zero. They represent losses, depths, and backward movement.",
            example: "$-1, -2, -3, -100...$",
            details: "These MUST always have the '-' sign. On a number line, they are to the left of zero. They were once called 'fictitious' numbers!",
            color: "#ef4444"
        },
        {
            id: "zero",
            name: "Zero",
            icon: <Scale className="text-slate-500" />,
            def: "The center point that is neither positive nor negative. It represents neutrality.",
            example: "$0$",
            details: "Zero is the origin on the number line. It's the only integer that is its own opposite!",
            color: "#64748b"
        },
        {
            id: "opp",
            name: "Opposite Numbers",
            icon: <ArrowRightLeft className="text-indigo-500" />,
            def: "Two numbers that are the same distance from zero but on opposite sides.",
            example: "$+5 \\text{ and } -5 \\text{ are opposites.}$",
            details: "If you add two opposite numbers together, you always get zero. This is a core property of integers.",
            color: "#6366f1"
        },
        {
            id: "abs",
            name: "Absolute Value",
            icon: <Ruler className="text-violet-500" />,
            def: "The distance of a number from zero, regardless of its sign.",
            example: "$|-7| = 7, \\quad |+5| = 5$",
            details: "The absolute value is always positive (or zero). Think of it as 'how far' you traveled, not 'which direction'.",
            color: "#8b5cf6"
        },
        {
            id: "inv",
            name: "Additive Inverse",
            icon: <RefreshCw className="text-teal-500" />,
            def: "A number that, when added to another, results in zero.",
            example: "$a + (-a) = 0$",
            details: "The additive inverse is just another name for the 'opposite' of a number. It's a key concept in solving equations later!",
            color: "#14b8a6"
        }
    ],
    rules: [
        {
            id: "r1",
            name: "Rule of Signs: Addition",
            icon: <Zap className="text-amber-500" />,
            def: "When signs are same, add and keep sign. When different, subtract and keep sign of larger absolute value.",
            example: "$(-3) + (-5) = -8, \\quad (-10) + (+4) = -6$",
            details: "Think of it as 'battling' armies or 'balancing' a bank account.",
            color: "#f59e0b"
        }
    ]
};

const QUIZ_QUESTIONS = [
    {
        q: "What is the absolute value of $-15$?",
        options: ["$-15$", "$15$", "$0$", "$undefined$"],
        correct: 1,
        hint: "Distance is always positive!"
    },
    {
        q: "Two numbers are 'Opposites' if their sum is...",
        options: ["$1$", "The larger number", "$-1$", "$0$"],
        correct: 3,
        hint: "Think of the Additive Inverse."
    }
];

export default function IntegersTerminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('lexicon');
    const [selectedId, setSelectedId] = useState(TERM_DATA.lexicon[0].id);
    const [quizIdx, setQuizIdx] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const currentData = activeTab === 'lexicon' ? TERM_DATA.lexicon : TERM_DATA.rules;
    const selectedItem = currentData.find(i => i.id === selectedId) || currentData[0];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab !== 'quiz') {
            setSelectedId(TERM_DATA[tab][0].id);
        }
        setFeedback(null);
    };

    const handleQuizAnswer = (idx) => {
        if (idx === QUIZ_QUESTIONS[quizIdx].correct) {
            setFeedback('correct');
            setTimeout(() => {
                if (quizIdx < QUIZ_QUESTIONS.length - 1) {
                    setQuizIdx(quizIdx + 1);
                    setFeedback(null);
                    setShowHint(false);
                }
            }, 1500);
        } else {
            setFeedback('wrong');
        }
    };

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
                    <button className="int-nav-link int-nav-link--active">
                        <BookOpen size={16} style={{ marginRight: '6px' }} /> Terminology
                    </button>
                    <button className="int-nav-link" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/skills')}>
                        <Target size={16} style={{ marginRight: '6px' }} /> Skills
                    </button>
                </div>
            </nav>

            <div className="int-hero">
                <div className="int-hero-deco int-hero-deco-a" />
                <div className="int-hero-deco int-hero-deco-b" />
                <h1 className="int-hero-title">Master the <span className="int-hero-highlight">Language of Integers</span></h1>
                <p className="int-hero-sub">The building blocks for understanding signed numbers ✨</p>
            </div>

            <div className="int-lexicon-container">
                <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
                    <button
                        className={`int-tab ${activeTab === 'lexicon' ? 'active' : ''}`}
                        onClick={() => handleTabChange('lexicon')}
                    >
                        <Book size={20} /> Key Terms
                    </button>
                    <button
                        className={`int-tab ${activeTab === 'rules' ? 'active' : ''}`}
                        onClick={() => handleTabChange('rules')}
                    >
                        <Zap size={20} /> Rules
                    </button>
                    <button
                        className={`int-tab ${activeTab === 'quiz' ? 'active' : ''}`}
                        onClick={() => handleTabChange('quiz')}
                    >
                        <Target size={20} /> Vocab Quiz
                    </button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className="int-lexicon-grid">
                        <div className="int-skills-list">
                            {currentData.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={`term-btn-mini ${selectedId === item.id ? 'active' : ''}`}
                                    style={{
                                        borderLeft: selectedId === item.id ? `4px solid ${item.color}` : '1.5px solid rgba(0,0,0,0.06)',
                                        background: selectedId === item.id ? `${item.color}08` : '#fff'
                                    }}
                                >
                                    <div style={{ padding: '8px', borderRadius: '8px', background: `${item.color}15` }}>
                                        {item.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>{item.name}</div>
                                        <div style={{ fontSize: '11px', color: '#475569' }}>{selectedId === item.id ? 'Viewing Details' : 'Click to learn'}</div>
                                    </div>
                                    <ChevronRight size={18} style={{ opacity: selectedId === item.id ? 1 : 0.3 }} />
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="int-quiz-card details-window-anim"
                                style={{ borderTop: `6px solid ${selectedItem.color}` }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <div style={{ padding: '12px', borderRadius: '14px', background: `${selectedItem.color}15` }}>
                                        {selectedItem.icon}
                                    </div>
                                    <h2 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>{selectedItem.name}</h2>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.6 }}>{selectedItem.def}</p>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>Detailed Context</div>
                                        <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>{selectedItem.details}</p>
                                    </div>

                                    <div style={{
                                        background: `linear-gradient(135deg, ${selectedItem.color}05, ${selectedItem.color}15)`,
                                        padding: '20px',
                                        borderRadius: '16px',
                                        border: `1px solid ${selectedItem.color}20`
                                    }}>
                                        <div style={{ fontSize: '11px', fontWeight: 800, color: selectedItem.color, textTransform: 'uppercase', marginBottom: '8px' }}>Example</div>
                                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>
                                            <MathRenderer text={selectedItem.example} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="int-quiz-container"
                    >
                        <div className="int-quiz-card" style={{ borderTop: '6px solid var(--int-indigo)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--int-indigo)', textTransform: 'uppercase' }}>Terminology Quiz</span>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Question {quizIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                            </div>

                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', textAlign: 'center', color: '#0f172a' }}>
                                <MathRenderer text={QUIZ_QUESTIONS[quizIdx].q} />
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuizAnswer(i)}
                                        className="int-nav-link"
                                        style={{
                                            padding: '16px',
                                            borderRadius: '14px',
                                            border: '1.5px solid #e2e8f0',
                                            background: '#fff',
                                            textAlign: 'center',
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            color: '#0f172a'
                                        }}
                                    >
                                        <MathRenderer text={opt} />
                                    </button>
                                ))}
                            </div>

                            {feedback && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        marginTop: '20px',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        background: feedback === 'correct' ? '#ecfdf5' : '#fef2f2',
                                        color: feedback === 'correct' ? '#059669' : '#dc2626',
                                        fontWeight: 700
                                    }}
                                >
                                    {feedback === 'correct' ? '✅ Brillaint! That is correct.' : '❌ Try again!'}
                                </motion.div>
                            )}

                            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    style={{ fontSize: '13px', fontWeight: 700, color: 'var(--int-indigo)', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    {showHint ? 'Hide Hint' : 'Need a hint?'}
                                </button>
                            </div>

                            {showHint && (
                                <p style={{ marginTop: '12px', fontSize: '14px', color: '#1e1b4b', textAlign: 'center', fontWeight: 600, fontStyle: 'italic' }}>
                                    {QUIZ_QUESTIONS[quizIdx].hint}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}

                <div style={{ padding: '40px 0', borderTop: '1px solid #e2e8f0', marginTop: '40px' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="int-cta-strip"
                    >
                        <p className="int-cta-sub">Ready to apply these concepts in the practice gym?</p>
                        <button
                            className="int-cta-btn"
                            onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/skills')}
                            style={{ background: 'var(--int-rose)', color: '#fff' }}
                        >
                            Start Practicing Skills →
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
