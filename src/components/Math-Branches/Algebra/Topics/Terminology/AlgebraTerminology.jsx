import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../algebra.css';
import MathRenderer from '../../../../MathRenderer';

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

const TERMS = [
    {
        name: 'Constant',
        color: '#6366f1',
        icon: '🔢',
        def: 'A fixed number that never changes its value. It stands alone — no variable attached!',
        examples: ['3', '−7', '100', '0'],
        inUse: 'In 5x + 3, the number 3 is a constant.',
        memory: 'Think of it as something constant — like the number of days in a week: always 7!'
    },
    {
        name: 'Variable',
        color: '#0891b2',
        icon: '❓',
        def: 'A letter that represents an unknown or changing quantity. It\'s the mystery number!',
        examples: ['x', 'y', 'n', 'a'],
        inUse: 'In 5x + 3, the letter x is a variable — its value can change.',
        memory: 'Variable = Variable value — it can vary and change!'
    },
    {
        name: 'Term',
        color: '#f59e0b',
        icon: '🧩',
        def: 'A single piece of an expression — either a constant, a variable, or a combination using multiplication/division.',
        examples: ['5x', '−3y²', '7', 'ab'],
        inUse: 'In 5x + 3, we have two terms: 5x and 3.',
        memory: 'Terms are like puzzle pieces that combine to make an expression!'
    },
    {
        name: 'Coefficient',
        color: '#ec4899',
        icon: '✖️',
        def: 'The number in front of a variable in a term. It tells you how many times to take the variable.',
        examples: ['5 in 5x', '−3 in −3y', '1 in x'],
        inUse: 'In 5x + 3, the coefficient of x is 5.',
        memory: 'The "chef" who decides how many variables to use!'
    },
    {
        name: 'Power',
        color: '#7c3aed',
        icon: '⚡',
        def: 'The small raised number (exponent) that tells you how many times to multiply the base by itself.',
        examples: ['x² = x×x', 'y³ = y×y×y', '5² = 25'],
        inUse: 'In 3x², the power is 2 — so x is multiplied twice.',
        memory: 'Power = tiny number with SUPER strength!'
    },
    {
        name: 'Like Terms',
        color: '#10b981',
        icon: '🤝',
        def: 'Terms with EXACTLY the same variable and SAME power. They can be combined.',
        examples: ['3x and 5x', '−2y² and 7y²'],
        inUse: '3x + 5x = 8x. But 3x + 5y ≠ 8xy!',
        memory: 'They must share everything to join forces!'
    },
    {
        name: 'Unlike Terms',
        color: '#ef4444',
        icon: '❌',
        def: 'Terms with different variables OR different powers. They CANNOT be combined.',
        examples: ['3x and 3y', '5x² and 5x'],
        inUse: '3x + 5y² — these stay separate.',
        memory: 'Like apples and oranges — can\'t be added!'
    },
    {
        name: 'Expression',
        color: '#06b6d4',
        icon: '📝',
        def: 'A combination of terms joined by + or −. It has NO equals sign — it\'s just a phrase.',
        examples: ['5x + 3', '2a² − 4b + 7'],
        inUse: '5x + 3 is an expression — it describes something!',
        memory: 'Like a phrase: "the red ball" (not a full sentence yet)!'
    },
    {
        name: 'Equation',
        color: '#6366f1',
        icon: '⚖️',
        def: 'A statement that two expressions are EQUAL. It MUST have an equals sign (=).',
        examples: ['2x + 3 = 11', 'y − 5 = 0'],
        inUse: '2x + 3 = 11 is an equation. Balance it to find x!',
        memory: 'Like a balanced weighing scale!'
    },
];

const FIVE_RULES = [
    {
        num: 1,
        title: 'Building Terms',
        rule: 'Terms are created by sticking constants and variables together through multiplication.',
        emoji: '🏗️',
        color: '#6366f1',
        detail: 'A term is a single "chunk". You can multiply or divide anything inside it, but once you use + or −, you have started a new term!',
        examples: ['5x', '−2ab', 'x/4', '9'],
        tip: 'Terms are the bricks. Expressions are the walls!'
    },
    {
        num: 2,
        title: 'Variable Integrity',
        rule: 'Like terms must have the EXACT same variable AND the exact same power.',
        emoji: '♊',
        color: '#0891b2',
        detail: 'Close is not enough! x and x² are twins but not identical in power, so they are UNLIKE terms.',
        examples: ['3x² and 5x² (Like)', '3x and 3y (Unlike)', 'x² and x (Unlike)'],
        tip: 'Check the letter AND the power before you combine!'
    },
    {
        num: 3,
        title: 'Expression Flow',
        rule: 'Expressions are just mathematical phrases — they describe a value but don\'t state a fact.',
        emoji: '🌊',
        color: '#f59e0b',
        detail: 'An expression is a collection of terms. Crucially, it has NO equals sign. It\'s like saying "The blue sky" instead of "The sky is blue."',
        examples: ['x + 5', '2a² − 4b + 7'],
        tip: 'Think of an expression as a mathematical phrase.'
    },
    {
        num: 4,
        title: 'The Combine Rule',
        rule: 'You can only add or subtract Like Terms. Unlike terms must stay separate forever.',
        emoji: '🧪',
        color: '#10b981',
        detail: 'It\'s like nature — you can add 2 apples and 3 apples to get 5 apples. But 2 apples and 3 oranges just stay as they are!',
        examples: ['3x + 2x = 5x', '4y + 2z = (stays the same)'],
        tip: 'Don\'t force unlike terms together. Let them be!'
    },
    {
        num: 5,
        title: 'Golden Balance',
        rule: 'An Equation is a balanced scale. Whatever you do to one side, you MUST do to the other.',
        emoji: '⚖️',
        color: '#ec4899',
        detail: 'The equals sign (=) is the center point. If you add 5 to the left, the scale tips unless you add 5 to the right as well.',
        examples: ['x - 3 = 10 → add 3 to both → x = 13', '2x = 8 → divide both by 2 → x = 4'],
        tip: 'The equals sign is sacred. Keep the balance!'
    }
];

const VOCAB_QUIZ = [
    {
        question: "What do we call a fixed number that never changes its value?",
        options: ["Variable", "Constant", "Coefficient", "Term"],
        correct: 1,
        explanation: "A constant (like 7 or -3) is a fixed value that stands alone without a variable."
    },
    {
        question: "In the term 5x, what is the number 5 called?",
        options: ["Power", "Variable", "Coefficient", "Expression"],
        correct: 2,
        explanation: "The coefficient is the number in front of a variable. It tells you how many times to take that variable."
    },
    {
        question: "A letter like 'x' or 'y' that represents an unknown number is a...",
        options: ["Constant", "Coefficient", "Equation", "Variable"],
        correct: 3,
        explanation: "Variables are letters used to represent values that can change or are currently unknown."
    },
    {
        question: "Which of these are 'Like Terms'?",
        options: ["3x and 3y", "5x and 5x²", "4ab and -ab", "7 and 7x"],
        correct: 2,
        explanation: "Like terms must have the EXACT same variable and EXACT same power. 4ab and -ab both have 'ab'."
    },
    {
        question: "What is the main difference between an Expression and an Equation?",
        options: ["Equations have variables", "Expressions have no numbers", "Equations have an Equals Sign (=)", "Expressions are longer"],
        correct: 2,
        explanation: "An equation is a statement that two things are equal (=). An expression is just a mathematical phrase."
    },
    {
        question: "What is the small raised number in x³ called?",
        options: ["Base", "Coefficient", "Power", "Constant"],
        correct: 2,
        explanation: "The raised number is the Power (or Exponent). It tells you how many times to multiply the base by itself."
    },
    {
        question: "Can you simplify 3x + 4y into 7xy?",
        options: ["Yes, always", "No, they are unlike terms", "Only if x = y", "Yes, if you multiply them"],
        correct: 1,
        explanation: "No! You can only add or subtract LIKE terms. x and y are different variables, so they must stay separate."
    },
    {
        question: "How many terms are in the expression: 3x² + 5x - 8?",
        options: ["1", "2", "3", "6"],
        correct: 2,
        explanation: "There are 3 terms: 3x², 5x, and -8. Terms are separated by + or - signs."
    },
    {
        question: "In the term 'x', what is the actual coefficient?",
        options: ["0", "1", "x", "It doesn't have one"],
        correct: 1,
        explanation: "If no number is shown in front of a variable, the coefficient is always 1 (since 1 × x = x)."
    },
    {
        question: "If you add 5 to one side of an equation, what must you do to the other side?",
        options: ["Subtract 5", "Do nothing", "Add 5", "Multiply by 5"],
        correct: 2,
        explanation: "The Golden Rule of Equations: Whatever you do to one side, you MUST do to the other to keep it balanced."
    }
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function AlgebraTerminology() {
    const navigate = useNavigate();

    // Tabs state
    const [activeTab, setActiveTab] = useState('terms');

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizTotalScore(0);
        setQuizFinished(false);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        if (optIdx === activeQuiz.correct) {
            setQuizTotalScore(s => s + 1);
        }
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="terminology-page">
            <style>{`
                .details-window-anim {
                    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .term-btn-mini {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.06);
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: left;
                    font-family: 'Outfit', sans-serif;
                    position: relative;
                    overflow: hidden;
                }
                .term-btn-mini::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    z-index: 0;
                    transition: opacity 0.2s;
                    opacity: 1;
                }
                .term-btn-mini:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
                }
                .term-btn-mini:hover::before {
                    opacity: 0.9;
                }
                .term-btn-mini.active {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    z-index: 2;
                }
                .term-btn-mini.active::before {
                    opacity: 0;
                }
                .term-btn-mini > * {
                    position: relative;
                    z-index: 1;
                }
                
                @media (max-width: 1024px) {
                    .alg-lexicon-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .selector-container {
                        max-width: 600px;
                        margin: 0 auto 16px;
                    }
                }
            `}</style>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/algebra')}>← Back to Algebra</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/algebra/introduction')}>🌟 Introduction</button>
                    <button className="intro-nav-link intro-nav-link--active" onClick={() => navigate('/algebra/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/algebra/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="alg-lexicon-container" style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--alg-text)', margin: '0 0 8px' }}>
                        Algebra <span style={{ background: 'linear-gradient(135deg, var(--alg-teal), var(--alg-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--alg-muted)', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge with 10 interactive questions!' : `Select any ${activeTab === 'terms' ? 'term' : 'rule'} below to explore details.`}
                    </div>
                </div>

                {/* Sub Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <button className={`alg-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`alg-tab ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Golden Rules</button>
                    <button className={`alg-tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Test Prep</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Rules) ── */
                    <div className="alg-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: activeTab === 'terms' ? '1fr 1fr' : '1fr', gap: 10, backdropFilter: 'blur(10px)'
                        }}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}
                                            style={{
                                                background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`,
                                                borderColor: isActive ? term.color : `${term.color}20`,
                                                gridColumn: i === TERMS.length - 1 ? 'span 2' : 'span 1',
                                                justifyContent: i === TERMS.length - 1 ? 'center' : 'flex-start'
                                            }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? term.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: isActive ? 'none' : '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : 'var(--alg-text)' }}>{term.name}</span>
                                            {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${term.color}, ${term.color}dd)`, zIndex: 0 }} />}
                                        </button>
                                    );
                                })
                            ) : (
                                FIVE_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                            style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20`, padding: '12px 16px' }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: isActive ? '#fff' : rule.color, fontWeight: 900 }}>{rule.num}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : 'var(--alg-text)', lineHeight: 1 }}>Rule {rule.num}</span>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--alg-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{rule.title}</span>
                                            </div>
                                            {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="details-window-anim" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: '20px 28px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${(activeTab === 'terms' ? activeTerm : activeRule).color}15`, minHeight: 330
                        }}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--alg-text)', lineHeight: 1.6, margin: '0 0 24px' }}>{activeTerm.def}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeTerm.color, marginBottom: 10 }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 16, borderRadius: 16, border: `1px solid ${activeTerm.color}10` }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <code key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, color: activeTerm.color, padding: '4px 10px', borderRadius: 8, display: 'flex', alignItems: 'center' }}>
                                                            <MathRenderer text={ex.includes('^') || ex.includes('−') || ex.includes('/') ? `$${ex}$` : ex} />
                                                        </code>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 12, fontSize: 13, color: 'var(--alg-muted)', fontStyle: 'italic' }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: 'var(--alg-indigo)', marginBottom: 10 }}>Master Hint</h4>
                                            <div style={{ background: 'rgba(108,99,255,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(108,99,255,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: 'var(--alg-muted)', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: 'var(--alg-indigo)' }}>💡 Hint: </span>{activeTerm.memory}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '16px 20px', borderRadius: 12, borderLeft: `5px solid ${activeRule.color}`, marginBottom: 20 }}>
                                        <p style={{ fontSize: 18, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--alg-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeRule.detail} />
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeRule.color, marginBottom: 10 }}>Practical Examples</h4>
                                            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    {activeRule.examples.map((ex, j) => (
                                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeRule.color }} />
                                                            <span style={{ fontSize: 15, background: '#fff', padding: '3px 8px', borderRadius: 6, color: 'var(--alg-text)', fontWeight: 600 }}>
                                                                <MathRenderer text={ex.includes('^') || ex.includes('−') || ex.includes('/') || ex.includes('=') ? `$${ex}$` : ex} />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: 'var(--alg-teal)', marginBottom: 10 }}>Survival Tip</h4>
                                            <div style={{ background: 'rgba(20,184,166,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: 'var(--alg-muted)', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: 'var(--alg-teal)' }}>🛡️ Pro Tip: </span>{activeRule.tip}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── VOCABULARY TEST TAB ── */
                    <div className="details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '32px 40px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--alg-blue)', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--alg-text)', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 70, height: 70, borderRadius: '50%', border: '5px solid #f1f5f9', borderTopColor: 'var(--alg-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: 'var(--alg-blue)' }}>{quizIdx + 1}/10</div>
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--alg-text)', lineHeight: 1.5, marginBottom: 28 }}>
                                    <MathRenderer text={activeQuiz.question} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let bCol = 'rgba(0,0,0,0.05)';
                                        let bgCol = '#fff';
                                        let txtCol = 'var(--alg-text)';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) { bCol = 'var(--alg-teal)'; bgCol = 'rgba(20,184,166,0.05)'; txtCol = 'var(--alg-teal)'; }
                                            else if (oi === quizSelected) { bCol = 'var(--alg-red)'; bgCol = 'rgba(239,68,68,0.05)'; txtCol = 'var(--alg-red)'; }
                                        } else if (quizSelected === oi) { bCol = 'var(--alg-blue)'; bgCol = 'rgba(59,130,246,0.05)'; }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: '16px 24px', borderRadius: 14, border: `3px solid ${bCol}`, background: bgCol, color: txtCol, fontWeight: quizSelected === oi ? 800 : 600, fontSize: 17, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div style={{ background: 'rgba(59,130,246,0.05)', padding: 16, borderRadius: 12, border: '1px solid rgba(59,130,246,0.2)', marginBottom: 24 }}>
                                        <p style={{ margin: 0, fontSize: 14, color: 'var(--alg-muted)', lineHeight: 1.6 }}><strong style={{ color: 'var(--alg-blue)' }}>Solution: </strong><MathRenderer text={activeQuiz.explanation} /></p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered} className="alg-btn-primary" style={{ padding: '12px 40px', background: quizAnswered ? 'var(--alg-blue)' : '#f1f5f9', color: quizAnswered ? '#fff' : '#94a3b8', borderRadius: 100, border: 'none', cursor: quizAnswered ? 'pointer' : 'not-allowed' }}>{quizIdx + 1 === 10 ? 'Finish Test' : 'Next Question →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{quizTotalScore >= 8 ? '🏆' : quizTotalScore >= 5 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Test Complete!</h2>
                                <p style={{ color: 'var(--alg-muted)', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: 'var(--alg-blue)', fontWeight: 900 }}>{quizTotalScore} / 10</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button className="alg-btn-primary" onClick={resetQuiz}>Try Again</button>
                                    <button className="alg-btn-secondary" onClick={() => navigate('/algebra/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button className="alg-btn-primary" onClick={() => navigate('/algebra/skills')} style={{ padding: '10px 28px', fontSize: 13 }}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div>
    );
}
