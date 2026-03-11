import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '../../../../../LatexText';
import '../../linear_equations.css';

/* ── KEY TERMS ─────────────────────────────────────────── */
const TERMS = [
    {
        id: 'linear-equation',
        icon: '⚖️',
        color: '#7c3aed',
        name: 'Linear Equation',
        def: 'An algebraic equation with <strong>one variable</strong> where the highest power of the variable is <strong>1</strong>.',
        example: '$2x - 3 = 7$, $\\dfrac{x}{3} + \\dfrac{5}{2} = -\\dfrac{3}{2}$',
        note: 'General form: $ax + b = c$ where $a \\neq 0$',
    },
    {
        id: 'variable',
        icon: '🔤',
        color: '#0891b2',
        name: 'Variable',
        def: 'An <strong>unknown quantity</strong> represented by a letter. Its value is what we solve for.',
        example: 'In $2x - 3 = 7$, the variable is $x$',
        note: 'Common variables: $x$, $y$, $z$, $t$, $n$, $m$',
    },
    {
        id: 'constant',
        icon: '🔢',
        color: '#059669',
        name: 'Constant',
        def: 'A <strong>fixed numerical value</strong> in an equation that does not change.',
        example: 'In $2x - 3 = 7$, the constants are $-3$ and $7$',
        note: 'Coefficients (like the $2$ in $2x$) are also constants',
    },
    {
        id: 'solution',
        icon: '✅',
        color: '#d97706',
        name: 'Solution / Root',
        def: 'The value of the variable that makes <strong>LHS = RHS</strong>. It "satisfies" the equation.',
        example: '$x = 5$ is the solution of $2x - 3 = 7$<br/>Check: $2(5) - 3 = 7$ ✓',
        note: 'Also called the "root" of the equation',
    },
    {
        id: 'lhs',
        icon: '◀️',
        color: '#dc2626',
        name: 'LHS',
        def: '<strong>Left Hand Side</strong> — the algebraic expression to the left of the equality sign.',
        example: 'In $2x - 3 = 7$,  LHS $= 2x - 3$',
        note: 'At the solution, LHS = RHS',
    },
    {
        id: 'rhs',
        icon: '▶️',
        color: '#0f766e',
        name: 'RHS',
        def: '<strong>Right Hand Side</strong> — the algebraic expression to the right of the equality sign.',
        example: 'In $2x - 3 = 7$, RHS $= 7$',
        note: 'Can also be an expression like $x + 2$',
    },
    {
        id: 'transposition',
        icon: '↔️',
        color: '#4f46e5',
        name: 'Transposition',
        def: 'Moving a term from one side of the equality to the other with a <strong>change of sign</strong>.',
        example: '$2y + 9 = 4$<br/>Transpose $9$: $2y = 4 - 9 = -5$',
        note: '$+$ becomes $-$, and $-$ becomes $+$ when transposing',
    },
    {
        id: 'cross-mult',
        icon: '✖️',
        color: '#7c3aed',
        name: 'Cross-Multiplication',
        def: 'For $\\dfrac{ax+b}{cx+d} = \\dfrac{p}{q}$, multiply to get $q(ax+b) = p(cx+d)$.',
        example: '$\\dfrac{x+1}{2x+3} = \\dfrac{3}{8}$<br/>$\\Rightarrow 8(x+1) = 3(2x+3)$',
        note: 'Used in §2.7 to solve equations reducible to linear form',
    },
];

/* ── KEY IDEAS ─────────────────────────────────────────── */
const IDEAS = [
    {
        id: 'balancing',
        icon: '⚖️',
        color: '#7c3aed',
        title: 'Balancing Method',
        section: '§2.2',
        tagline: 'What you do to one side, do to the other.',
        intro: 'We keep the equation balanced by performing the same mathematical operation on <strong>both sides</strong>. The balance is never disturbed.',
        rules: [
            {
                num: 1,
                title: 'Add the same number to both sides',
                math: '$2x - 3 = 7 \\xrightarrow{+3 \\text{ to both}} 2x = 10$',
            },
            {
                num: 2,
                title: 'Subtract the same number from both sides',
                math: '$x + 9 = 4 \\xrightarrow{-9 \\text{ from both}} x = -5$',
            },
            {
                num: 3,
                title: 'Multiply both sides by the same non-zero number',
                math: '$\\dfrac{x}{3} = -4 \\xrightarrow{\\times 3} x = -12$',
            },
            {
                num: 4,
                title: 'Divide both sides by the same non-zero number',
                math: '$6x = 12 \\xrightarrow{\\div 6} x = 2$',
            },
        ],
    },
    {
        id: 'transposition',
        icon: '↔️',
        color: '#059669',
        title: 'Transposition Method',
        section: '§2.2–§2.7',
        tagline: 'Move terms across = with a sign flip.',
        intro: 'We <strong>collect all variable terms on the LHS</strong> and all <strong>constants on the RHS</strong> by transposing, then solve.',
        rules: [
            {
                num: 1,
                title: 'When a positive term moves across =, it becomes negative',
                math: '$2x + 9 = 4 \\Rightarrow 2x = 4 - 9$',
            },
            {
                num: 2,
                title: 'When a negative term moves across =, it becomes positive',
                math: '$2x - 3 = 7 \\Rightarrow 2x = 7 + 3$',
            },
            {
                num: 3,
                title: 'When variable appears on both sides, transpose to collect on LHS',
                math: '$2x - 3 = x + 2 \\Rightarrow 2x - x = 2 + 3 \\Rightarrow x = 5$',
            },
            {
                num: 4,
                title: 'For fractions: multiply by LCM of all denominators first (§2.6)',
                math: '$\\dfrac{x}{2} - \\dfrac{1}{5} = \\dfrac{x}{3} + \\dfrac{1}{4}$ → multiply by LCM(2,5,3,4) = 60',
            },
        ],
    },
];

/* ── TEST PREP QUESTIONS ───────────────────────────────── */
const QUIZ_Qs = [
    {
        q: 'Which of the following is a linear equation in one variable?',
        opts: ['$x^2 + 1 = 5$', '$2x - 3 = 7$', '$2xy + 5 = 0$', '$y + y^2 = 1$'],
        correct: 1,
        explanation: 'A linear equation has one variable with highest power 1. $2x - 3 = 7$ satisfies both conditions.',
    },
    {
        q: 'The solution of $2x - 3 = 7$ is:',
        opts: ['$x = 2$', '$x = 5$', '$x = 7$', '$x = -5$'],
        correct: 1,
        explanation: 'Add 3 to both sides: $2x = 10$. Divide by 2: $x = 5$. Check: $2(5)-3 = 7$ ✓',
    },
    {
        q: 'When we transpose $+9$ to the other side of $=$, it becomes:',
        opts: ['$+9$', '$\\times 9$', '$-9$', '$\\divisionsymbol 9$'],
        correct: 2,
        explanation: 'Transposition changes the sign. $+9$ becomes $-9$ when moved across the equality sign.',
    },
    {
        q: 'In the equation $5x + \\dfrac{7}{2} = \\dfrac{3}{2}x - 14$, what operation clears the fractions?',
        opts: ['Multiply both sides by 2', 'Divide both sides by 2', 'Add $\\dfrac{7}{2}$ to both sides', 'Multiply both sides by 7'],
        correct: 0,
        explanation: 'The denominators are 2. Multiplying both sides by 2 clears all fractions, giving $10x + 7 = 3x - 28$.',
    },
    {
        q: 'Which method is used to solve $\\dfrac{6x+1}{3} + 1 = \\dfrac{x-3}{6}$?',
        opts: ['Simple balancing', 'LCM method (§2.6)', 'Cross-multiplication', 'Substitution'],
        correct: 1,
        explanation: 'When fractions exist on both sides, we multiply by LCM of denominators (here LCM of 3 and 6 is 6).',
    },
    {
        q: 'The sum of two numbers is 74. One is 10 more than the other. If the smaller is $x$, the equation is:',
        opts: ['$x + 10 = 74$', '$x + (x+10) = 74$', '$x - (x+10) = 74$', '$2x = 74$'],
        correct: 1,
        explanation: 'Smaller number = $x$, larger = $x + 10$. Their sum: $x + (x+10) = 74$, i.e., $2x + 10 = 74$.',
    },
    {
        q: 'To solve $2x - 3 = x + 2$, we first transpose $x$ to get:',
        opts: ['$2x - x = 2 + 3$', '$2x + x = 2 - 3$', '$2x - x = 2 - 3$', '$3x = 2 + 3$'],
        correct: 0,
        explanation: 'Move $x$ to LHS (sign becomes $-$) and $-3$ to RHS (sign becomes $+$): $2x - x = 2 + 3$.',
    },
    {
        q: 'Sahil\'s mother is 3 times his age. After 5 years their ages add to 66. Sahil\'s present age ($x$) equation:',
        opts: ['$3x + x = 66$', '$4x + 10 = 66$', '$3x + 5 = 66$', '$x + 3x + 5 = 66$'],
        correct: 1,
        explanation: 'Sahil now: $x$, mother: $3x$. After 5 years: $(x+5) + (3x+5) = 4x + 10 = 66$.',
    },
    {
        q: 'Cross-multiplication is applied when the equation has the form:',
        opts: ['$ax + b = c$', '$ax + b = cx + d$', '$\\dfrac{ax+b}{cx+d} = \\dfrac{p}{q}$', '$ax = b$'],
        correct: 2,
        explanation: 'Cross-multiplication (§2.7) is for equations of the form $\\dfrac{ax+b}{cx+d} = \\dfrac{p}{q}$, giving $q(ax+b) = p(cx+d)$.',
    },
    {
        q: 'If $\\dfrac{x+1}{2x+3} = \\dfrac{3}{8}$, applying cross-multiplication gives:',
        opts: ['$8(x+1) = 3(2x+3)$', '$3(x+1) = 8(2x+3)$', '$8x+1 = 3 \\times 2x+3$', '$x+1 = \\dfrac{3}{8}$'],
        correct: 0,
        explanation: 'Cross-multiply: $8 \\times (x+1) = 3 \\times (2x+3)$, giving $8x+8 = 6x+9$.',
    },
];

/* ── HELPER: sample ──────────────────────────────────────── */
function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function LinearEquationsTerminology() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('terms');
    const [activeTerm, setActiveTerm] = useState(TERMS[0]);
    const [activeIdea, setActiveIdea] = useState(IDEAS[0]);
    const [activeRule, setActiveRule] = useState(0);

    // Quiz state
    const [questions] = useState(() => sample(QUIZ_Qs, 10));
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === questions[current].correct) setScore(s => s + 1);
    };
    const handleNext = () => {
        if (current + 1 >= questions.length) { setFinished(true); return; }
        setCurrent(c => c + 1);
        setSelected(null);
        setAnswered(false);
    };
    const handleRetry = () => {
        setCurrent(0); setSelected(null); setAnswered(false);
        setScore(0); setFinished(false);
    };

    const q = questions[current];
    const pct = finished ? Math.round((score / questions.length) * 100) : 0;

    return (
        <div className="leq-page">
            {/* ── NAV ──────────────────────── */}
            <nav className="leq-nav">
                <button className="leq-nav-back" onClick={() => navigate('/senior/grade/8/linear-equations')}>
                    ← Linear Equations
                </button>
                <div className="leq-nav-links">
                    <button className="leq-nav-link" onClick={() => navigate('/senior/grade/8/linear-equations/introduction')}>🌟 Introduction</button>
                    <button className="leq-nav-link leq-nav-link--active">📖 Terminology</button>
                    <button className="leq-nav-link" onClick={() => navigate('/senior/grade/8/linear-equations/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                {/* ── HEADER ─────────────────────── */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Linear Equations <span style={{ color: '#7c3aed' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>
                        Master the language of variables, constants, and coefficients.
                    </div>
                </div>

                <div className="leq-module-tabs" style={{ marginBottom: 24 }}>
                    {[
                        { id: 'terms', label: '📚 Key Terms' },
                        { id: 'ideas', label: '💡 Key Ideas' },
                        { id: 'quiz', label: '✅ Test Prep' },
                    ].map(t => (
                        <button
                            key={t.id}
                            className={`leq-tab ${tab === t.id ? 'active' : ''}`}
                            onClick={() => setTab(t.id)}
                        >{t.label}</button>
                    ))}
                </div>

                {/* ══════════════════════ TERMS TAB ══════════════════════ */}
                {tab === 'terms' && (
                    <div className="leq-section">
                        <div className="leq-lexicon-container">
                            <div className="leq-learn-grid">
                                {/* Sidebar */}
                                <div className="leq-learn-sidebar">
                                    {TERMS.map((t, i) => (
                                        <button
                                            key={t.id}
                                            className={`leq-sidebar-btn ${activeTerm.id === t.id ? 'active' : ''}`}
                                            style={{ '--leq-btn-color': t.color }}
                                            onClick={() => setActiveTerm(t)}
                                        >
                                            <span className="leq-sidebar-btn-num">{i + 1}</span>
                                            <span className="leq-sidebar-btn-title">{t.icon} {t.name}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Detail panel */}
                                <div className="leq-details-window leq-details-anim" key={activeTerm.id}>
                                    <div className="leq-learn-header-row">
                                        <div>
                                            <div style={{ fontSize: 44, marginBottom: 8 }}>{activeTerm.icon}</div>
                                            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: '0 0 4px' }}>
                                                {activeTerm.name}
                                            </h2>
                                        </div>
                                        <div style={{
                                            background: `${activeTerm.color}15`, color: activeTerm.color,
                                            padding: '6px 14px', borderRadius: 50, fontSize: 12, fontWeight: 800
                                        }}>
                                            Key Term
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: 20 }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 8 }}>
                                            Definition
                                        </div>
                                        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#0f172a' }}>
                                            <LatexText text={activeTerm.def} />
                                        </p>
                                    </div>

                                    <div className="leq-term-example">
                                        <div className="leq-term-example-label">Example</div>
                                        <div className="leq-term-example-val">
                                            <LatexText text={activeTerm.example} />
                                        </div>
                                    </div>

                                    {activeTerm.note && (
                                        <div style={{
                                            marginTop: 16, padding: '12px 16px',
                                            background: 'rgba(124,58,237,0.05)',
                                            border: '1px solid rgba(124,58,237,0.12)',
                                            borderRadius: 10, fontSize: 14, color: '#64748b'
                                        }}>
                                            💡 <LatexText text={activeTerm.note} />
                                        </div>
                                    )}

                                    <div className="leq-learn-footer">
                                        <button className="leq-btn-primary" onClick={() => setTab('quiz')}>Ready for the Quiz? →</button>
                                        <button className="leq-btn-secondary" onClick={() => {
                                            const nextIdx = (TERMS.findIndex(x => x.id === activeTerm.id) + 1) % TERMS.length;
                                            setActiveTerm(TERMS[nextIdx]);
                                        }}>
                                            Next: {TERMS[(TERMS.findIndex(x => x.id === activeTerm.id) + 1) % TERMS.length].name}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ══════════════════════ IDEAS TAB ══════════════════════ */}
                {tab === 'ideas' && (
                    <div className="leq-section">
                        <div className="leq-lexicon-container">
                            <div className="leq-learn-grid">
                                {/* Idea selector */}
                                <div className="leq-learn-sidebar">
                                    {IDEAS.map((idea, i) => (
                                        <button
                                            key={idea.id}
                                            className={`leq-sidebar-btn ${activeIdea.id === idea.id ? 'active' : ''}`}
                                            onClick={() => { setActiveIdea(idea); setActiveRule(0); }}
                                        >
                                            <span className="leq-sidebar-btn-num">{i + 1}</span>
                                            <span className="leq-sidebar-btn-title">{idea.icon} {idea.title}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Idea detail */}
                                <div className="leq-details-window leq-details-anim" key={activeIdea.id}>
                                    <div className="leq-learn-header-row">
                                        <div>
                                            <div style={{ fontSize: 44, marginBottom: 8 }}>{activeIdea.icon}</div>
                                            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: activeIdea.color, margin: '0 0 4px' }}>
                                                {activeIdea.title}
                                            </h2>
                                            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{activeIdea.section}</p>
                                        </div>
                                        <div style={{
                                            background: `${activeIdea.color}15`, color: activeIdea.color,
                                            padding: '6px 14px', borderRadius: 50, fontSize: 12, fontWeight: 800
                                        }}>
                                            {activeIdea.tagline}
                                        </div>
                                    </div>

                                    <p style={{ fontSize: 15, lineHeight: 1.75, color: '#64748b', marginBottom: 24 }}>
                                        <LatexText text={activeIdea.intro} />
                                    </p>

                                    {/* Rule tabs */}
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                                        {activeIdea.rules.map((r, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveRule(i)}
                                                style={{
                                                    padding: '6px 14px', borderRadius: 50,
                                                    border: `1.5px solid ${activeRule === i ? activeIdea.color : '#e2e8f0'}`,
                                                    background: activeRule === i ? activeIdea.color : '#fff',
                                                    color: activeRule === i ? '#fff' : '#64748b',
                                                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                }}
                                            >Rule {r.num}</button>
                                        ))}
                                    </div>

                                    {/* Rule detail */}
                                    <div className="leq-rule-item">
                                        <div className="leq-rule-num" style={{ background: `linear-gradient(135deg, ${activeIdea.color}, ${activeIdea.color}cc)` }}>
                                            {activeIdea.rules[activeRule].num}
                                        </div>
                                        <div className="leq-rule-text">
                                            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>
                                                {activeIdea.rules[activeRule].title}
                                            </div>
                                            <div className="leq-math-block">
                                                <LatexText text={activeIdea.rules[activeRule].math} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="leq-learn-footer">
                                        <button className="leq-btn-primary" onClick={() => setTab('quiz')}>Ready for the Quiz? →</button>
                                        <button className="leq-btn-secondary" onClick={() => {
                                            const nextIdx = (IDEAS.findIndex(x => x.id === activeIdea.id) + 1) % IDEAS.length;
                                            setActiveIdea(IDEAS[nextIdx]);
                                            setActiveRule(0);
                                        }}>
                                            Next Idea: {IDEAS[(IDEAS.findIndex(x => x.id === activeIdea.id) + 1) % IDEAS.length].title}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ══════════════════════ QUIZ TAB ═══════════════════════ */}
                {tab === 'quiz' && (
                    <div className="leq-quiz-container">
                        {finished ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: 13, fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Quiz Complete</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>
                                    {pct >= 90 ? '🏆 Mastered!' : pct >= 70 ? '🌟 Great Job!' : '💪 Keep Practising!'}
                                </h2>

                                <div style={{ fontSize: 52, fontWeight: 900, color: '#7c3aed', lineHeight: 1, marginBottom: 8 }}>{score} / {questions.length}</div>
                                <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600, marginBottom: 32 }}>Score: {pct}%</div>

                                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px', maxWidth: 500, marginInline: 'auto' }}>
                                    {pct >= 70 ? 'You know your linear equation terminology! Great job.' : 'Review the terms and ideas, then try again to improve your score.'}
                                </p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button className="leq-btn-primary" onClick={handleRetry} style={{ minWidth: 160 }}>🔀 Try Again</button>
                                    <button className="leq-btn-secondary" onClick={() => setTab('terms')} style={{ minWidth: 160 }}>📚 Review Terms</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Progress header */}
                                <div style={{ marginBottom: 20 }}>
                                    <div className="leq-score-header">
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Test Prep</div>
                                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>Terminology Quiz</h3>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: 13, color: '#64748b', fontWeight: 700 }}>
                                            Q <span style={{ color: '#7c3aed' }}>{current + 1}</span> / {questions.length}
                                        </div>
                                    </div>
                                    <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${((current) / questions.length) * 100}%`,
                                            background: '#7c3aed', borderRadius: 10, transition: 'width 0.4s ease'
                                        }} />
                                    </div>
                                </div>

                                {/* Question card */}
                                <div className="leq-quiz-card">
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 6,
                                        background: 'rgba(124,58,237,0.1)', padding: '4px 12px',
                                        borderRadius: 8, fontSize: 12, fontWeight: 800, color: '#7c3aed', marginBottom: 16
                                    }}>QUESTION {current + 1}</div>

                                    <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 20 }}>
                                        <LatexText text={q.q} />
                                    </div>

                                    <div className="leq-quiz-options-grid">
                                        {q.opts.map((opt, oi) => {
                                            let border = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a';
                                            if (answered) {
                                                if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; }
                                                else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txtColor = '#ef4444'; }
                                            } else if (selected === oi) {
                                                border = '#7c3aed'; bg = 'rgba(124,58,237,0.04)';
                                            }
                                            return (
                                                <button
                                                    key={oi}
                                                    onClick={() => handleSelect(oi)}
                                                    disabled={answered}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: 12,
                                                        padding: '14px 16px', borderRadius: 12,
                                                        border: `2.5px solid ${border}`,
                                                        background: bg, cursor: answered ? 'default' : 'pointer',
                                                        fontSize: 15, color: txtColor, textAlign: 'left',
                                                        transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500,
                                                    }}
                                                >
                                                    <div style={{
                                                        width: 10, height: 10, borderRadius: '50%',
                                                        background: answered
                                                            ? (oi === q.correct ? '#10b981' : oi === selected ? '#ef4444' : '#f1f5f9')
                                                            : (selected === oi ? '#7c3aed' : '#f1f5f9'),
                                                        flexShrink: 0, transition: 'all 0.2s'
                                                    }} />
                                                    <span><LatexText text={opt} /></span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {answered && (
                                        <div style={{
                                            marginTop: 20, padding: '14px 18px', borderRadius: 12,
                                            background: 'rgba(124,58,237,0.05)',
                                            border: '1px solid rgba(124,58,237,0.1)',
                                            color: '#64748b', fontSize: 13.5, lineHeight: 1.6
                                        }}>
                                            <strong style={{ color: '#7c3aed' }}>💡 Explanation: </strong>
                                            <LatexText text={q.explanation} />
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                    <button
                                        onClick={handleNext}
                                        disabled={!answered}
                                        style={{
                                            padding: '12px 40px',
                                            background: answered ? '#7c3aed' : '#f1f5f9',
                                            color: answered ? '#fff' : '#94a3b8',
                                            cursor: answered ? 'pointer' : 'not-allowed',
                                            border: 'none', borderRadius: 100,
                                            fontSize: 15, fontWeight: 800,
                                            boxShadow: answered ? '0 8px 20px rgba(124,58,237,0.3)' : 'none',
                                            transition: 'all 0.2s',
                                            fontFamily: 'Open Sans, sans-serif'
                                        }}
                                    >
                                        {current + 1 >= questions.length ? '🏁 See Final Score' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
