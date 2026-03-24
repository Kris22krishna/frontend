import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../polynomials_grade_9.css';
import { LatexText } from '../../../../../LatexText';

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const TERMS = [
    {
        name: 'Polynomial',
        icon: '🧊',
        color: '#0f4c81',
        def: 'An algebraic expression consisting of variables and constants, involving addition, subtraction, multiplication, and non-negative integer exponents of variables.',
        example: '$p(x) = 3x^2 - 5x + 2$ is a polynomial in one variable $x$.\nExpressions like $x^{-2}$ or $\\sqrt{x}$ are NOT polynomials because the exponents are not non-negative integers.',
        realWorld: 'Polynomial curves are used in computer graphics to draw smooth shapes and fonts (like the letters you are reading right now).',
    },
    {
        name: 'Terms & Coefficients',
        icon: '🧩',
        color: '#1a237e',
        def: 'TERMS are the individual parts of a polynomial separated by $+$ or $-$ signs.\nEach term has a COEFFICIENT, which is the constant number multiplying the variable(s) in that term.',
        example: 'In $p(x) = -5x^3 + 4x^2 - 7$:\nThe terms are $-5x^3$, $4x^2$, and $-7$.\nThe coefficient of $x^3$ is $-5$, the coefficient of $x^2$ is $4$, and the constant term is $-7$.',
        realWorld: 'Think of terms as ingredients in a recipe, and coefficients as the quantities of each ingredient.',
    },
    {
        name: 'Degree of a Polynomial',
        icon: '🎓',
        color: '#6a1b9a',
        def: 'The DEGREE is the highest power (exponent) of the variable in a polynomial with non-zero coefficients.\nDegree $1$ = Linear, Degree $2$ = Quadratic, Degree $3$ = Cubic.',
        example: 'In $p(y) = 5y^6 - 4y^2 - 6$, the highest power of $y$ is $6$.\nTherefore, the degree of the polynomial is $6$.',
        realWorld: 'In physics, the degree tells you the complexity of motion: degree 1 is constant velocity, degree 2 involves constant acceleration.',
    },
    {
        name: 'Zero of a Polynomial',
        icon: '🎯',
        color: '#b71c1c',
        def: 'A ZERO (or root) of a polynomial $p(x)$ is a number $c$ such that $p(c) = 0$.\nIt is the value of the variable that makes the whole expression equal to zero.',
        example: 'For $p(x) = x - 2$, if $x = 2$, then $p(2) = 2 - 2 = 0$.\nSo, $2$ is a zero of the polynomial $x - 2$.',
        realWorld: 'On a graph, the zeroes are the exact points where the curve crosses the x-axis (where the height or value is zero).',
    },
    {
        name: 'Constant & Zero Polynomials',
        icon: '🔢',
        color: '#e65100',
        def: 'A CONSTANT polynomial contains only a number (no variable), e.g., $7$, $-5$. Its degree is $0$.\nThe ZERO polynomial is just the number $0$. Its degree is NOT defined.',
        example: '$p(x) = 8$ is a constant polynomial because it can be written as $8x^0$. Degree is $0$.\n$p(x) = 0$ is the zero polynomial.',
        realWorld: 'A constant polynomial is like a flat road with no slope—it never changes height regardless of where you are.',
    },
    {
        name: 'Factor Theorem',
        icon: '✂️',
        color: '#0f766e',
        def: 'If $p(x)$ is a polynomial of degree $n \\ge 1$ and $a$ is any real number, then:\n1. $(x - a)$ is a factor of $p(x)$ if $p(a) = 0$.\n2. $p(a) = 0$ if $(x - a)$ is a factor of $p(x)$.',
        example: 'Let $p(x) = x^2 - 4$. Check if $(x - 2)$ is a factor:\nSubstitute $x = 2$. $p(2) = 2^2 - 4 = 0$.\nSince $p(2) = 0$, $(x - 2)$ is a factor of $p(x)$.',
        realWorld: 'Factoring is like breaking a complex machine into its simplest Lego blocks so you can understand how it works.',
    },
    {
        name: 'Algebraic Identities',
        icon: '🧬',
        color: '#455a64',
        def: 'An algebraic identity is an equation that is universally TRUE for all values of its variables.\nThey are shortcut formulas used to expand or factorise expressions quickly.',
        example: 'Identity I: $(x + y)^2 = x^2 + 2xy + y^2$\nExample: $(x + 3)^2 = x^2 + 2(x)(3) + 3^2 = x^2 + 6x + 9$.',
        realWorld: 'Identities are mathematical templates. Engineers use them to simplify long calculations without doing them step-by-step every time.',
    },
];

// ─── KEY IDEAS DATA ──────────────────────────────────────────────────────────
const KEY_IDEAS = [
    {
        title: 'Classifying Polynomials',
        icon: '🗂️',
        color: '#0f4c81',
        rules: [
            {
                title: 'By Number of Terms',
                f: '$\\text{Monomial (1 term), Binomial (2 terms), Trinomial (3 terms)}$',
                d: 'Polynomials are classified by how many terms they have separated by $+$ or $-$ signs.',
                ex: 'Monomial: $5x$, $-7y^2$, $12$\nBinomial: $2x + 5$, $y^2 - y$\nTrinomial: $x^2 + 3x + 2$',
                tip: 'Always simplify first! $2x + 3x$ is NOT a binomial, because it simplifies to $5x$, which is a monomial.',
            },
            {
                title: 'By Degree',
                f: '$\\text{Linear (Degree 1), Quadratic (Degree 2), Cubic (Degree 3)}$',
                d: 'The degree (highest power) determines the basic "shape" or type of the polynomial function.',
                ex: 'Linear ($ax + b$): $2x + 3$\nQuadratic ($ax^2 + bx + c$): $4x^2 - x + 1$\nCubic ($ax^3 + bx^2 + cx + d$): $y^3 - 4y$',
                tip: 'A linear polynomial can have at most 1 zero. A quadratic up to 2 zeroes, a cubic up to 3.',
            },
        ],
    },
    {
        title: 'Evaluating & Factoring',
        icon: '⚙️',
        color: '#b71c1c',
        rules: [
            {
                title: 'Finding the Value of a Polynomial',
                f: '$p(a) \\text{ is the value of } p(x) \\text{ at } x = a$',
                d: 'To find the value of a polynomial at a specific point, simply replace every instance of the variable with that number and calculate.',
                ex: 'Find the value of $p(x) = x^2 - 3x + 5$ at $x = 2$:\n$p(2) = (2)^2 - 3(2) + 5$\n$p(2) = 4 - 6 + 5 = 3$',
                tip: 'Use parentheses when substituting negative numbers to avoid sign mistakes. e.g., $(-2)^2 = 4$, not $-4$.',
            },
            {
                title: 'Splitting the Middle Term',
                f: '$ax^2 + bx + c = ax^2 + px + qx + c \\quad \\text{ where } p+q=b \\text{ and } pq=ac$',
                d: 'To factorise quadratics, find two numbers that MULTIPLY to give $(a \\times c)$ and ADD to give $(b)$. Then split the middle term and factor by grouping.',
                ex: 'Factorise $x^2 + 5x + 6$:\nWe need two numbers that multiply to $6$ and add to $5$. They are $2$ and $3$.\n$= x^2 + 2x + 3x + 6$\n$= x(x + 2) + 3(x + 2) = (x + 2)(x + 3)$',
                tip: 'If the constant term $c$ is positive, both split numbers have the same sign. If $c$ is negative, they have opposite signs.',
            },
            {
                title: 'Key Algebraic Identities',
                f: '$(x+y)^2 = x^2+2xy+y^2 \\quad | \\quad (x-y)^2 = x^2-2xy+y^2 \\quad | \\quad x^2-y^2 = (x-y)(x+y)$',
                d: 'These three fundamental identities are the building blocks of algebra. You must memorise them. They work in reverse too (for factorisation).',
                ex: 'Expand $(2x - 3)^2$:\n$= (2x)^2 - 2(2x)(3) + 3^2$\n$= 4x^2 - 12x + 9$',
                tip: 'The difference of squares, $x^2 - y^2$, is the most commonly tested identity. Always watch out for subtraction between two perfect squares!',
            },
            {
                title: 'Advanced Identities (Cubes & 3 Variables)',
                f: '$(x+y+z)^2 = x^2+y^2+z^2+2xy+2yz+2zx \\quad | \\quad x^3+y^3 = (x+y)(x^2-xy+y^2)$',
                d: 'Extending to three variables or cubic powers requires these advanced identities. Note the signs carefully in the sum/difference of cubes.',
                ex: 'Expand $(x+2y+z)^2$:\n$= x^2 + (2y)^2 + z^2 + 2(x)(2y) + 2(2y)(z) + 2(z)(x)$\n$= x^2 + 4y^2 + z^2 + 4xy + 4yz + 2zx$',
                tip: 'For $(x-y)^3 = x^3 - y^3 - 3xy(x-y)$, notice how every term after the first has a negative sign compared to $(x+y)^3$.',
            },
        ],
    },
];

// ─── QUIZ (Test Prep) ────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    { q: 'Which of the following is a polynomial?', opts: ['$x^2 + \\frac{1}{x} + 2$', '$\\sqrt{x} + 3$', '$x^3 - 4x + 7$', '$x^{1/2} + 5$'], ans: 2, exp: 'In a polynomial, the exponent of the variable MUST be a non-negative integer. $x^3 - 4x + 7$ is the only one satisfying this.' },
    { q: 'What is the degree of the zero polynomial?', opts: ['$0$', '$1$', 'Not defined', 'Defined as infinite'], ans: 2, exp: 'The degree of the zero polynomial ($p(x) = 0$) is mathematically undefined.' },
    { q: 'What is the coefficient of $x^2$ in $p(x) = 5 - 3x + x^2 - x^3$?', opts: ['$0$', '$-3$', '$1$', '$-1$'], ans: 2, exp: 'The term containing $x^2$ is $+1x^2$. So the coefficient is $1$.' },
    { q: 'If $p(x) = x - 5$, what is the zero of $p(x)$?', opts: ['$-5$', '$5$', '$0$', '$1$'], ans: 1, exp: 'Set $p(x) = 0$. So, $x - 5 = 0 \\implies x = 5$. Thus, $5$ is the zero.' },
    { q: 'By the Factor Theorem, $(x - a)$ is a factor of $p(x)$ if:', opts: ['$p(x) = 0$', '$p(a) = a$', '$p(a) = 0$', '$p(-a) = 0$'], ans: 2, exp: 'The Factor Theorem states that $(x - a)$ is a factor of $p(x)$ if and only if the polynomial evaluates to zero at $x = a$, i.e., $p(a) = 0$.' },
    { q: 'A polynomial of degree 2 is called:', opts: ['Linear', 'Quadratic', 'Cubic', 'Biquadratic'], ans: 1, exp: 'Degree 1 is Linear, Degree 2 is Quadratic, Degree 3 is Cubic.' },
    { q: 'Factorise $x^2 - 16$ using identities.', opts: ['$(x-4)^2$', '$(x-16)(x+1)$', '$(x-4)(x+4)$', '$(x+4)^2$'], ans: 2, exp: 'Use the difference of squares identity: $a^2 - b^2 = (a-b)(a+b)$. Here, $x^2 - 4^2 = (x-4)(x+4)$.' },
    { q: 'Which identity matches $x^2 + 2xy + y^2$?', opts: ['$(x-y)^2$', '$(x+y)(x-y)$', '$(x+y)^2$', '$(x+y)^3$'], ans: 2, exp: 'The expansion of $(x+y)^2$ is $x^2 + 2xy + y^2$.' },
    { q: 'What is the value of $p(y) = y^2 - y + 1$ at $y = -1$?', opts: ['$1$', '$-1$', '$3$', '$0$'], ans: 2, exp: '$p(-1) = (-1)^2 - (-1) + 1 = 1 + 1 + 1 = 3$.' },
    { q: 'A polynomial with exactly two non-zero terms is called a:', opts: ['Monomial', 'Binomial', 'Trinomial', 'Quadratic'], ans: 1, exp: 'Number of terms determines the name: 1 = Monomial, 2 = Binomial, 3 = Trinomial.' },
];

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function QuizEngine({ onBack }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = QUIZ_QUESTIONS[current];
    const color = '#0f4c81';
    const progress = ((current + (finished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.ans) setScore((s) => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= QUIZ_QUESTIONS.length) setFinished(true);
        else { setCurrent((c) => c + 1); setSelected(null); setAnswered(false); }
    };

    if (finished) {
        const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Review & Retry!';
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '8px solid #fff'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>out of {QUIZ_QUESTIONS.length}</div>
                    </div>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px' }}>
                    {pct >= 75 ? 'Great understanding of Polynomials vocabulary!' : 'Review the terms and try again for a higher score.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="poly-btn-primary" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}>
                        Try Again
                    </button>
                    <button className="poly-btn-secondary" onClick={onBack}>Return to Terminology</button>
                </div>
            </div>
        );
    }

    return (
        <div className="poly-quiz-container">
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Vocabulary Quiz</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color }}>{current + 1}</span> / {QUIZ_QUESTIONS.length}</div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${color}, #1565c0)`, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            <div className="poly-quiz-card">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                    QUESTION {current + 1}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 24 }}>
                    <LatexText text={q.q} />
                </div>

                <div className="poly-quiz-options">
                    {q.opts.map((opt, oi) => {
                        let borderColor = 'rgba(0,0,0,0.04)', bgColor = '#fff', textColor = '#0f172a', dotColor = '#f1f5f9';
                        if (answered) {
                            if (oi === q.ans) { borderColor = '#059669'; bgColor = 'rgba(5,150,105,0.05)'; textColor = '#059669'; dotColor = '#059669'; }
                            else if (oi === selected) { borderColor = '#ef4444'; bgColor = 'rgba(239,68,68,0.05)'; textColor = '#ef4444'; dotColor = '#ef4444'; }
                        } else if (selected === oi) { borderColor = color; bgColor = `${color}05`; dotColor = color; }
                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${borderColor}`, background: bgColor, cursor: answered ? 'default' : 'pointer', fontSize: 15, color: textColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                                <LatexText text={opt} />
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(15,76,129,0.05)', border: '1px solid rgba(15,76,129,0.15)', fontSize: 13.5, lineHeight: 1.6, color: '#475569' }}>
                        <strong style={{ color }}>💡 Explanation: </strong><LatexText text={q.exp} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleNext} disabled={!answered} className="poly-btn-primary"
                    style={{ padding: '12px 40px', opacity: answered ? 1 : 0.4, cursor: answered ? 'pointer' : 'not-allowed' }}>
                    {current + 1 >= QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function PolynomialsGrade9Terminology() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('terms');
    const [activeTerm, setActiveTerm] = useState(0);
    const [activeIdea, setActiveIdea] = useState(0);
    const [activeRule, setActiveRule] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const TABS = [
        { id: 'terms', label: 'Key Terms', icon: '📚' },
        { id: 'ideas', label: 'Key Ideas', icon: '💡' },
        { id: 'quiz', label: 'Test Prep', icon: '✅' },
    ];

    return (
        <div className="poly-page">
            {/* ── TOP NAV ─────────────────────────────────── */}
            <nav className="poly-nav">
                <button className="poly-nav-back" onClick={() => navigate('/senior/grade/9/polynomials')}>
                    ← Back to Polynomials
                </button>
                <div className="poly-nav-links">
                    <button className="poly-nav-link" onClick={() => navigate('/senior/grade/9/polynomials/introduction')}>🌟 Introduction</button>
                    <button className="poly-nav-link poly-nav-link--active">📖 Terminology</button>
                    <button className="poly-nav-link" onClick={() => navigate('/senior/grade/9/polynomials/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── HEADER ──────────────────────────────────── */}
            <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                    Polynomials{' '}
                    <span style={{ background: 'linear-gradient(90deg,#0f4c81,#6a1b9a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Vocabulary</span>
                </h1>
            </div>

            {/* ── TABS ────────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', padding: '0 12px 12px' }}>
                {TABS.map((t) => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`poly-tab${tab === t.id ? ' active' : ''}`}>
                        <span>{t.icon}</span> {t.label}
                    </button>
                ))}
            </div>

            {/* ── TAB: KEY TERMS ──────────────────────────── */}
            {tab === 'terms' && (
                <div className="poly-section">
                    <div className="poly-learn-grid">
                        <aside className="poly-learn-sidebar">
                            {TERMS.map((t, i) => (
                                <button key={i} onClick={() => setActiveTerm(i)}
                                    className={`poly-sidebar-btn${activeTerm === i ? ' active' : ''}`}
                                    style={{ '--skill-color': t.color }}>
                                    <div className="poly-sidebar-btn-icon">{t.icon}</div>
                                    <span className="poly-sidebar-btn-title">{t.name}</span>
                                </button>
                            ))}
                        </aside>

                        <main key={activeTerm} className="poly-details-window poly-details-window-anim" style={{ border: `2px solid ${TERMS[activeTerm].color}15` }}>
                            <div className="poly-learn-header-row">
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 900, color: TERMS[activeTerm].color }}>{TERMS[activeTerm].name}</h3>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>TERM {activeTerm + 1} OF {TERMS.length}</div>
                                </div>
                                <div style={{ fontSize: 36 }}>{TERMS[activeTerm].icon}</div>
                            </div>

                            <div style={{ background: `${TERMS[activeTerm].color}05`, padding: 24, borderRadius: 16, border: `2px solid ${TERMS[activeTerm].color}15`, marginBottom: 24 }}>
                                <div style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: '#0f172a', whiteSpace: 'pre-line' }}>
                                    <LatexText text={TERMS[activeTerm].def} />
                                </div>
                            </div>

                            <div className="poly-rule-split">
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Example</h4>
                                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0f172a', whiteSpace: 'pre-line' }}>
                                            <LatexText text={TERMS[activeTerm].example} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: TERMS[activeTerm].color, marginBottom: 10 }}>Real World</h4>
                                    <div style={{ background: `${TERMS[activeTerm].color}05`, padding: 20, borderRadius: 16, border: `2px solid ${TERMS[activeTerm].color}15` }}>
                                        <div style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0f172a' }}>
                                            <LatexText text={TERMS[activeTerm].realWorld} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="poly-learn-footer">
                                <button className="poly-btn-primary" onClick={() => setTab('quiz')}>Ready for the Quiz? →</button>
                                <button className="poly-btn-secondary" onClick={() => setActiveTerm((activeTerm + 1) % TERMS.length)}>
                                    Next: {TERMS[(activeTerm + 1) % TERMS.length].name}
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            {/* ── TAB: KEY IDEAS ──────────────────────────── */}
            {tab === 'ideas' && (
                <div className="poly-section">
                    <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                        {KEY_IDEAS.map((idea, idx) => (
                            <button key={idx} onClick={() => { setActiveIdea(idx); setActiveRule(0); }}
                                style={{ padding: '12px 24px', borderRadius: 50, border: '2px solid', borderColor: activeIdea === idx ? idea.color : '#e2e8f0', background: activeIdea === idx ? idea.color : '#fff', color: activeIdea === idx ? '#fff' : '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Open Sans, sans-serif' }}>
                                <span>{idea.icon}</span> {idea.title}
                            </button>
                        ))}
                    </div>

                    <div className="poly-learn-grid">
                        <aside className="poly-learn-sidebar">
                            {KEY_IDEAS[activeIdea].rules.map((rule, ri) => (
                                <button key={ri} onClick={() => setActiveRule(ri)}
                                    className={`poly-sidebar-btn${activeRule === ri ? ' active' : ''}`}
                                    style={{ '--skill-color': KEY_IDEAS[activeIdea].color }}>
                                    <div className="poly-sidebar-btn-num">{ri + 1}</div>
                                    <span className="poly-sidebar-btn-title">{rule.title}</span>
                                </button>
                            ))}
                        </aside>

                        <main key={`${activeIdea}-${activeRule}`} className="poly-details-window poly-details-window-anim" style={{ border: `2px solid ${KEY_IDEAS[activeIdea].color}15` }}>
                            <div className="poly-learn-header-row">
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: KEY_IDEAS[activeIdea].color }}>{KEY_IDEAS[activeIdea].rules[activeRule].title}</h3>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {activeRule + 1} OF {KEY_IDEAS[activeIdea].rules.length}</div>
                                </div>
                                <div style={{ fontSize: 32 }}>{KEY_IDEAS[activeIdea].icon}</div>
                            </div>

                            <div style={{ background: `${KEY_IDEAS[activeIdea].color}05`, padding: 24, borderRadius: 20, border: `2px solid ${KEY_IDEAS[activeIdea].color}15`, marginBottom: 28, textAlign: 'center' }}>
                                <div style={{ fontSize: 19, fontWeight: 800, color: KEY_IDEAS[activeIdea].color, letterSpacing: 0.5 }}>
                                    <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].f} />
                                </div>
                            </div>

                            <div className="poly-rule-split">
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                    <div style={{ fontSize: 15, lineHeight: 1.7, color: '#0f172a', margin: 0 }}>
                                        <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].d} />
                                    </div>
                                    <div style={{ marginTop: 20, background: 'rgba(15,76,129,0.05)', padding: 16, borderRadius: 14, border: '1px solid rgba(15,76,129,0.1)' }}>
                                        <div style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                                            <span style={{ fontWeight: 800, color: '#0f4c81' }}>🛡️ Key Tip: </span>
                                            <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].tip} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: KEY_IDEAS[activeIdea].color, marginBottom: 10 }}>Practical Example</h4>
                                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#0f172a', whiteSpace: 'pre-line' }}>
                                            <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].ex} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="poly-learn-footer">
                                <button className="poly-btn-primary" onClick={() => setTab('quiz')}>Test your Knowledge →</button>
                                <button className="poly-btn-secondary" onClick={() => setActiveRule((activeRule + 1) % KEY_IDEAS[activeIdea].rules.length)}>
                                    Next: {KEY_IDEAS[activeIdea].rules[(activeRule + 1) % KEY_IDEAS[activeIdea].rules.length].title}
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            {/* ── TAB: QUIZ ───────────────────────────────── */}
            {tab === 'quiz' && (
                <div className="poly-section">
                    <QuizEngine onBack={() => setTab('terms')} />
                </div>
            )}
        </div>
    );
}
