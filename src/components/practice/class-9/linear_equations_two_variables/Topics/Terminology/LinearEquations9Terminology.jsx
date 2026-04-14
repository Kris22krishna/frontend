import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../linear_equations_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { SingleLineChart, TwoLinesChart, SolutionSetChart, HorizontalVerticalChart, StandardFormChart, ParallelLinesEqChart, GraphOfEquationChart, OrderedPairChart, PlottingStepsChart } from '../components/LEDynamicCharts';

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const TERMS = [
    {
        name: 'Linear Equation in Two Variables',
        icon: '📐',
        color: '#0f4c81',
        chart: SingleLineChart,
        def: 'An equation of the form $ax + by + c = 0$ where $a$, $b$, $c$ are real numbers and $a \\neq 0$ or $b \\neq 0$.\n\n• It has two variables (usually $x$ and $y$)\n• The highest power of each variable is 1\n• Its graph is always a straight line',
        example: '$2x + 3y = 12$ is a linear equation.\n$x^2 + y = 5$ is NOT linear (power of $x$ is 2).',
        realWorld: 'If a pen costs ₹$x$ and a notebook costs ₹$y$, then buying 2 pens and 3 notebooks for ₹120 gives: $2x + 3y = 120$.',
    },
    {
        name: 'Solution of a Linear Equation',
        icon: '✅',
        color: '#059669',
        chart: SolutionSetChart,
        def: 'A pair of values $(x, y)$ that makes the equation true.\n\n• Written as an ordered pair $(x, y)$\n• Every point on the line is a solution\n• A linear equation in two variables has infinitely many solutions',
        example: 'For $x + y = 5$:\n$(2, 3)$ is a solution because $2 + 3 = 5$ ✓\n$(1, 2)$ is NOT a solution because $1 + 2 \\neq 5$ ✗',
        realWorld: 'If your total budget is ₹500 for items costing ₹$x$ and ₹$y$ each, then every valid combination $(x, y)$ that adds up to 500 is a solution.',
    },
    {
        name: 'Graph of a Linear Equation',
        icon: '📈',
        color: '#7c3aed',
        chart: GraphOfEquationChart,
        def: 'The geometric representation of all solutions of a linear equation on the Cartesian plane.\n\n• Every linear equation in two variables is a straight line\n• Every point on the line satisfies the equation\n• To draw it, find at least 2 solution pairs and plot them',
        example: 'The graph of $y = 2x + 1$ passes through $(0, 1)$, $(1, 3)$, $(2, 5)$, etc. — all lying on the same straight line.',
        realWorld: 'A taxi fare chart showing "Base fare + ₹10/km" can be graphed as a straight line.',
    },
    {
        name: 'Standard Form: ax + by + c = 0',
        icon: '📝',
        color: '#b71c1c',
        chart: StandardFormChart,
        def: 'The general way of writing any linear equation.\n\n• $a$ = coefficient of $x$\n• $b$ = coefficient of $y$\n• $c$ = constant term\n• $a$ and $b$ are not both zero simultaneously',
        example: '$y = 2x + 3$ can be rewritten as $2x - y + 3 = 0$\nHere $a = 2$, $b = -1$, $c = 3$.',
        realWorld: 'Every real-world linear relationship can be expressed in this universal form for systematic analysis.',
    },
    {
        name: 'Equations x = a and y = b',
        icon: '↔️',
        color: '#0891b2',
        chart: HorizontalVerticalChart,
        def: 'Special linear equations that represent lines parallel to axes.\n\n• $x = a$ is a vertical line parallel to the Y-axis\n• $y = b$ is a horizontal line parallel to the X-axis\n• $x = 0$ is the Y-axis itself\n• $y = 0$ is the X-axis itself',
        example: '$x = 3$ is a vertical line passing through $(3, 0)$, $(3, 1)$, $(3, -2)$, etc.\n$y = -2$ is a horizontal line passing through $(0, -2)$, $(1, -2)$, etc.',
        realWorld: 'A boundary wall running North-South at 3 meters from a reference point is the line $x = 3$.',
    },
    {
        name: 'Ordered Pair & Cartesian Plane',
        icon: '🗺️',
        color: '#e65100',
        chart: OrderedPairChart,
        def: 'An ordered pair $(x, y)$ represents a unique point on the Cartesian plane.\n\n• $x$ = abscissa (horizontal distance from origin)\n• $y$ = ordinate (vertical distance from origin)\n• The order matters! $(2, 3) \\neq (3, 2)$\n• The origin is $(0, 0)$',
        example: 'The point $(4, -3)$ is 4 units right and 3 units down from the origin.',
        realWorld: 'GPS coordinates are ordered pairs that pinpoint exact locations on Earth.',
    },
];

// ─── KEY IDEAS DATA ──────────────────────────────────────────────────────────
const KEY_IDEAS = [
    {
        title: 'Finding Solutions',
        icon: '🔍',
        color: '#0f4c81',
        rules: [
            {
                title: 'Substitution Method',
                chart: SolutionSetChart,
                f: '$\\text{Choose } x, \\text{ compute } y = \\frac{c - ax}{b}$',
                d: 'To find solutions, pick any value for one variable and calculate the other.\n\nFor $2x + y = 6$:\n• Let $x = 0$: $y = 6$ → $(0, 6)$\n• Let $x = 1$: $y = 4$ → $(1, 4)$\n• Let $x = 3$: $y = 0$ → $(3, 0)$',
                tip: 'Choosing $x = 0$ gives the y-intercept, and choosing $y = 0$ gives the x-intercept. These are the easiest points to find!',
                ex: 'For $3x + 2y = 12$:\nWhen $x = 0$: $y = 6$ → $(0, 6)$\nWhen $y = 0$: $x = 4$ → $(4, 0)$\nWhen $x = 2$: $y = 3$ → $(2, 3)$',
            },
        ],
    },
    {
        title: 'Graphing Linear Equations',
        icon: '📊',
        color: '#7c3aed',
        rules: [
            {
                title: 'Plotting Steps',
                chart: PlottingStepsChart,
                f: '$\\text{2 points} \\rightarrow \\text{1 straight line}$',
                d: 'Steps to graph a linear equation:\n1. Find at least 2 solutions (3 is better for verification)\n2. Plot each solution as a point $(x, y)$\n3. Draw a straight line through all points\n4. Extend the line with arrows on both ends (it goes on infinitely)',
                tip: 'If all 3 points don\'t lie on the same line, you made a calculation error! Go back and check.',
                ex: 'Graph $y = x + 2$:\n1. $(0, 2)$, $(1, 3)$, $(-1, 1)$\n2. Plot these 3 points\n3. They form a straight line ✓',
            },
        ],
    },
    {
        title: 'Special Cases',
        icon: '⭐',
        color: '#b71c1c',
        rules: [
            {
                title: 'Lines Parallel to Axes',
                chart: HorizontalVerticalChart,
                f: '$x = a \\text{ (vertical)} \\quad y = b \\text{ (horizontal)}$',
                d: '• $y = 3$ means $y$ is always 3, regardless of $x$. This is $0 \\cdot x + 1 \\cdot y = 3$.\n• $x = -2$ means $x$ is always $-2$, regardless of $y$. This is $1 \\cdot x + 0 \\cdot y = -2$.\n• These are still linear equations (one coefficient is 0).',
                tip: 'Remember: $x = a$ is vertical (parallel to Y-axis), $y = b$ is horizontal (parallel to X-axis). Don\'t mix them up!',
                ex: 'The equation $2y = 10$ simplifies to $y = 5$, which is a horizontal line 5 units above the X-axis.',
            },
        ],
    },
];

// ─── QUIZ (Test Prep) ────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    {
        q: 'Which of the following is a linear equation in two variables?',
        opts: ['$x^2 + y = 5$', '$2x + 3y = 7$', '$xy = 6$', '$\\sqrt{x} + y = 1$'],
        ans: 1,
        exp: '$2x + 3y = 7$ has both variables with power 1, making it a linear equation in two variables.',
    },
    {
        q: 'How many solutions does a linear equation in two variables have?',
        opts: ['Exactly one', 'Exactly two', 'No solutions', 'Infinitely many'],
        ans: 3,
        exp: 'A linear equation in two variables has infinitely many solutions. Each point on its line is a solution.',
    },
    {
        q: 'The graph of the equation $y = 3$ is:',
        opts: ['A line parallel to the X-axis', 'A line parallel to the Y-axis', 'A line passing through the origin', 'A point'],
        ans: 0,
        exp: '$y = 3$ gives a constant $y$-value for all $x$, which is a horizontal line parallel to the X-axis.',
    },
    {
        q: 'Which point lies on the line $x + y = 7$?',
        opts: ['$(2, 3)$', '$(3, 4)$', '$(4, 4)$', '$(5, 3)$'],
        ans: 1,
        exp: 'Substituting $(3, 4)$: $3 + 4 = 7$ ✓. This point satisfies the equation.',
    },
    {
        q: 'The equation $2x + 3y - 6 = 0$ in standard form has $a =$',
        opts: ['$2$', '$3$', '$-6$', '$6$'],
        ans: 0,
        exp: 'In $ax + by + c = 0$, the coefficient of $x$ is $a$. Here $a = 2$.',
    },
];

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function QuizEngine({ onBack }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const quizAnswersRef = useRef([]);

    const q = QUIZ_QUESTIONS[current];
    const color = '#0f4c81';
    const progress = ((current + (finished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        const isCorrect = idx === q.ans;
        if (isCorrect) setScore((s) => s + 1);
        quizAnswersRef.current[current] = { question_index: current, answer: idx, is_correct: isCorrect };
    };

    const handleNext = () => {
        if (current + 1 >= QUIZ_QUESTIONS.length) {
            setFinished(true);
        } else { setCurrent((c) => c + 1); setSelected(null); setAnswered(false); }
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
                    {pct >= 75 ? 'Great understanding of Linear Equations vocabulary!' : 'Review the terms and try again for a higher score.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className={styles['btn-primary']} onClick={() => { quizAnswersRef.current = []; setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}>
                        Try Again
                    </button>
                    <button className={styles['nav-back']} onClick={onBack}>Return to Terminology</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['quiz-container']}>
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Vocabulary Quiz</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color }}>{current + 1}</span> / {QUIZ_QUESTIONS.length}</div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${color}, #1565c0)`, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            <div className={styles['quiz-card']}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                    QUESTION {current + 1}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 24 }}>
                    <LatexText text={q.q} />
                </div>

                <div className={styles['quiz-options']}>
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
                <button onClick={handleNext} disabled={!answered} className={styles['btn-primary']}
                    style={{ padding: '12px 40px', opacity: answered ? 1 : 0.4, cursor: answered ? 'pointer' : 'not-allowed' }}>
                    {current + 1 >= QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function LinearEquations9Terminology() {
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
        <div className={styles['page']} style={window.innerWidth > 900 ? { height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { display: 'flex', flexDirection: 'column' }}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/intro')}>🌟 Introduction</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                        Linear Equations{' '}
                        <span style={{ background: 'linear-gradient(90deg,#0f4c81,#6a1b9a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Vocabulary</span>
                    </h1>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', padding: '0 12px 12px' }}>
                    {TABS.map((t) => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={`${styles['tab']} ${tab === t.id ? styles['active'] : ''}`}>
                            <span>{t.icon}</span> {t.label}
                        </button>
                    ))}
                </div>

                {/* ── TAB: KEY TERMS ──────────────────────────── */}
                {tab === 'terms' && (
                    <div className={styles['section']}>
                        <div className={styles['learn-grid']}>
                            <aside className={styles['learn-sidebar']}>
                                {TERMS.map((t, i) => (
                                    <button key={i} onClick={() => setActiveTerm(i)}
                                        className={`${styles['sidebar-btn']} ${activeTerm === i ? styles['active'] : ''}`}
                                        style={{ '--skill-color': t.color }}>
                                        <div className={styles['sidebar-btn-icon']}>{t.icon}</div>
                                        <span className={styles['sidebar-btn-title']}>{t.name}</span>
                                    </button>
                                ))}
                            </aside>

                            <main key={activeTerm} className={`${styles['details-window']} ${styles['details-window-anim']}`} style={{ border: `2px solid ${TERMS[activeTerm].color}15` }}>
                                <div className={styles['learn-header-row']}>
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

                                {TERMS[activeTerm].chart && (
                                    <div style={{ marginBottom: 24, padding: 16, background: '#f8fafc', borderRadius: 16, display: 'flex', justifyContent: 'center' }}>
                                        {React.createElement(TERMS[activeTerm].chart)}
                                    </div>
                                )}

                                <div className={styles['rule-split']}>
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

                                <div className={styles['learn-footer']}>
                                    <button className={styles['btn-primary']} onClick={() => setTab('quiz')}>Ready for the Quiz? →</button>
                                    <button className={styles['nav-back']} onClick={() => setActiveTerm((activeTerm + 1) % TERMS.length)}>
                                        Next: {TERMS[(activeTerm + 1) % TERMS.length].name}
                                    </button>
                                </div>
                            </main>
                        </div>
                    </div>
                )}

                {/* ── TAB: KEY IDEAS ──────────────────────────── */}
                {tab === 'ideas' && (
                    <div className={styles['section']}>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                            {KEY_IDEAS.map((idea, idx) => (
                                <button key={idx} onClick={() => { setActiveIdea(idx); setActiveRule(0); }}
                                    style={{ padding: '12px 24px', borderRadius: 50, border: '2px solid', borderColor: activeIdea === idx ? idea.color : '#e2e8f0', background: activeIdea === idx ? idea.color : '#fff', color: activeIdea === idx ? '#fff' : '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Open Sans, sans-serif' }}>
                                    <span>{idea.icon}</span> {idea.title}
                                </button>
                            ))}
                        </div>

                        <div className={styles['learn-grid']}>
                            <aside className={styles['learn-sidebar']}>
                                {KEY_IDEAS[activeIdea].rules.map((rule, ri) => (
                                    <button key={ri} onClick={() => setActiveRule(ri)}
                                        className={`${styles['sidebar-btn']} ${activeRule === ri ? styles['active'] : ''}`}
                                        style={{ '--skill-color': KEY_IDEAS[activeIdea].color }}>
                                        <div className={styles['sidebar-btn-num']}>{ri + 1}</div>
                                        <span className={styles['sidebar-btn-title']}>{rule.title}</span>
                                    </button>
                                ))}
                            </aside>

                            <main key={`${activeIdea}-${activeRule}`} className={`${styles['details-window']} ${styles['details-window-anim']}`} style={{ border: `2px solid ${KEY_IDEAS[activeIdea].color}15` }}>
                                <div className={styles['learn-header-row']}>
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

                                {KEY_IDEAS[activeIdea].rules[activeRule].chart && (
                                    <div style={{ marginBottom: 24, padding: 16, background: '#f8fafc', borderRadius: 16, display: 'flex', justifyContent: 'center' }}>
                                        {React.createElement(KEY_IDEAS[activeIdea].rules[activeRule].chart)}
                                    </div>
                                )}

                                <div className={styles['rule-split']}>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                        <div style={{ fontSize: 15, lineHeight: 1.7, color: '#0f172a', margin: 0, whiteSpace: 'pre-line' }}>
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

                                <div className={styles['learn-footer']}>
                                    <button className={styles['btn-primary']} onClick={() => setTab('quiz')}>Test your Knowledge →</button>
                                    <button className={styles['nav-back']} onClick={() => setActiveRule((activeRule + 1) % KEY_IDEAS[activeIdea].rules.length)}>
                                        Next: {KEY_IDEAS[activeIdea].rules[(activeRule + 1) % KEY_IDEAS[activeIdea].rules.length].title}
                                    </button>
                                </div>
                            </main>
                        </div>
                    </div>
                )}

                {/* ── TAB: QUIZ ───────────────────────────────── */}
                {tab === 'quiz' && (
                    <div className={styles['section']}>
                        <QuizEngine onBack={() => setTab('terms')} />
                    </div>
                )}
            </div>
        </div>
    );
}
