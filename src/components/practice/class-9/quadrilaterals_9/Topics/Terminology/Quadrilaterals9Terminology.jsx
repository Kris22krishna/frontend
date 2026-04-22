import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../quadrilaterals_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { QuadrilateralChart, ParallelogramChart, RectangleChart, RhombusChart, SquareChart, TrapeziumChart, KiteChart, MidPointTheoremChart } from '../components/QuadrilateralsDynamicCharts';

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const TERMS = [
    {
        name: 'Quadrilateral',
        icon: '📐',
        color: '#0f4c81',
        chart: QuadrilateralChart,
        def: 'A closed geometric figure bounded by four straight sides.\n\n• It has 4 vertices and 4 angles.\n• Angle Sum Property: the sum of the interior angles of a quadrilateral is $360^{\\circ}$.',
        example: 'If three angles of a quadrilateral are $60^{\\circ}, 100^{\\circ},$ and $120^{\\circ}$, the fourth angle is $360^{\\circ} - (60^{\\circ} + 100^{\\circ} + 120^{\\circ}) = 80^{\\circ}$.',
        realWorld: 'A piece of paper, a computer monitor, or a tabletop.',
    },
    {
        name: 'Parallelogram',
        icon: '▱',
        color: '#059669',
        chart: ParallelogramChart,
        def: 'A quadrilateral in which both pairs of opposite sides are parallel.\n\n• Opposite sides are equal.\n• Opposite angles are equal.\n• Diagonals bisect each other.\n• A diagonal divides it into two congruent triangles.',
        example: 'In parallelogram ABCD, if $\\angle A = 70^{\\circ}$, then opposite angle $\\angle C = 70^{\\circ}$ and adjacent angle $\\angle B = 110^{\\circ}$ (since they add to $180^{\\circ}$).',
        realWorld: 'An eraser slanted diagonally, or stairs viewed from the side profile.',
    },
    {
        name: 'Rectangle',
        icon: '▭',
        color: '#2563eb',
        chart: RectangleChart,
        def: 'A parallelogram in which one angle is a right angle ($90^{\\circ}$).\n\n• Because opposite angles are equal, all four angles become $90^{\\circ}$.\n• The diagonals are equal in length.\n• The diagonals bisect each other.',
        example: 'If diagonal AC of a rectangle is $10\\text{ cm}$, diagonal BD is also exactly $10\\text{ cm}$.',
        realWorld: 'A standard smartphone screen or a book cover.',
    },
    {
        name: 'Rhombus',
        icon: '◇',
        color: '#d97706',
        chart: RhombusChart,
        def: 'A parallelogram in which all four sides are equal.\n\n• It has all the properties of a parallelogram.\n• The diagonals bisect each other strictly at right angles ($90^{\\circ}$).',
        example: 'If you connect the mid-points of the sides of a rectangle, the shape formed inside is a rhombus.',
        realWorld: 'A diamond shape on a playing card.',
    },
    {
        name: 'Square',
        icon: '⏹',
        color: '#7c3aed',
        chart: SquareChart,
        def: 'A square is both a rectangle and a rhombus. It has all equal sides and all $90^{\\circ}$ angles.\n\n• Diagonals are equal (from rectangle property).\n• Diagonals bisect each other at right angles (from rhombus property).',
        example: 'A square has the highest symmetry of all quadrilaterals.',
        realWorld: 'A chess board.',
    },
    {
        name: 'Trapezium',
        icon: '⏢',
        color: '#0891b2',
        chart: TrapeziumChart,
        def: 'A quadrilateral in which exactly ONE pair of opposite sides is parallel.\n\n• The parallel sides are called "bases".\n• If the non-parallel sides are equal, it\'s called an "isosceles trapezium".',
        example: 'The top half of a triangle cut horizontally yields a trapezium at the bottom.',
        realWorld: 'The side profile of a lamp shade.',
    },
    {
        name: 'Kite',
        icon: '🪁',
        color: '#db2777',
        chart: KiteChart,
        def: 'A quadrilateral with two distinct pairs of equal adjacent sides.\n\n• Diagonals intersect at right angles.\n• Only one pair of opposite angles is equal.',
        example: 'In kite ABCD, $AB = AD$ and $BC = DC$.',
        realWorld: 'A traditional flying kite!',
    }
];

// ─── KEY IDEAS DATA ──────────────────────────────────────────────────────────
const KEY_IDEAS = [
    {
        title: 'Core Theorems',
        icon: '📜',
        color: '#0f766e',
        rules: [
            {
                title: 'Diagonal Theorem (8.1)',
                chart: QuadrilateralChart,
                f: '$\\triangle ABC \\cong \\triangle CDA$',
                d: 'A diagonal of a parallelogram divides it into two exact congruent triangles. This is proven using ASA criteria based on alternate interior angles from parallel lines.',
                tip: 'This is the foundational theorem. Most other properties of parallelograms (equal sides, equal angles) are just CPCT from this theorem!',
                ex: 'Draw diagonal AC in parallelogram ABCD. Since $\\triangle ABC \\cong \\triangle CDA$, we know $AB = DC$ and $AD = BC$.'
            },
            {
                title: 'Diagonals Bisect (8.6)',
                chart: ParallelogramChart,
                f: '$OA = OC, OB = OD$',
                d: 'The diagonals of a parallelogram bisect each other. This means they cut each other exactly in half.',
                tip: 'The converse (Theorem 8.7) is also a fantastic tool: If the diagonals of ANY quadrilateral bisect each other, it MUST be a parallelogram.',
                ex: 'If diagonal AC is 12cm and BD is 16cm, they intersect at point O down the middle, so OA is 6cm and OB is 8cm.'
            },
            {
                title: 'Mid-point Theorem (8.8)',
                chart: MidPointTheoremChart,
                f: '$EF \\parallel BC \\text{ and } EF = \\frac{1}{2}BC$',
                d: 'The line segment joining the mid-points of two sides of a triangle is parallel to the third side AND is half of it.',
                tip: 'Think about triangles shrinking. If you connect the midpoints, you get a miniature, half-scaled version mapping the bottom side.',
                ex: 'In $\\triangle ABC$, E is the mid-point of AB, and F is the mid-point of AC. If the base BC is $20\\text{ cm}$, the line EF is exactly $10\\text{ cm}$ and perfectly parallel to BC.'
            },
            {
                title: 'Converse Mid-point (8.9)',
                chart: MidPointTheoremChart,
                f: '$\\text{Pass through mid-point} \\rightarrow \\text{Parallels bisect}$',
                d: 'The line drawn through the mid-point of one side of a triangle, perfectly parallel to another side, will automatically bisect the third side.',
                tip: 'Here you start with parallel lines, instead of proving them.',
                ex: 'In $\\triangle XYZ$, M is the mid-point of XY. If you shoot a laser from M parallel to YZ, it will hit XZ exactly at its mid-point N.'
            }
        ]
    }
];

// ─── QUIZ (Test Prep) ────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    {
        q: 'The sum of all interior angles of a quadrilateral is:',
        opts: ['$180^{\\circ}$', '$360^{\\circ}$', '$540^{\\circ}$', '$720^{\\circ}$'],
        ans: 1,
        exp: 'Drawing a diagonal forms 2 triangles, and $2 \\times 180^{\\circ} = 360^{\\circ}$.'
    },
    {
        q: 'Which of the following is NOT a property of a parallelogram?',
        opts: ['Opposite sides are equal', 'Opposite angles are equal', 'Diagonals are equal', 'Diagonals bisect each other'],
        ans: 2,
        exp: 'Diagonals of a regular parallelogram are usually different lengths. They are only equal in a rectangle or square.'
    },
    {
        q: 'If the diagonals of a quadrilateral bisect each other at right angles, it must be a:',
        opts: ['Rectangle', 'Trapezium', 'Rhombus', 'Kite'],
        ans: 2,
        exp: 'A rhombus is defined as a parallelogram whose diagonals intersect at $90^{\\circ}$. (A square works too, but a square is a special rhombus).'
    },
    {
        q: 'In $\\triangle PQR$, A and B are mid-points of sides PQ and PR respectively. If QR is $14\\text{ cm}$, the length of AB is:',
        opts: ['$14\\text{ cm}$', '$28\\text{ cm}$', '$7\\text{ cm}$', 'Cannot be determined'],
        ans: 2,
        exp: 'By the Mid-point theorem, the line joining mid-points is half the length of the third side. Therefore $14 / 2 = 7\\text{ cm}$.'
    },
    {
        q: 'The quadrilateral formed by joining the mid-points of the sides of a quadrilateral PQRS, taken in order, is a:',
        opts: ['Rectangle', 'Parallelogram', 'Square', 'Rhombus'],
        ans: 1,
        exp: 'By applying the Mid-point theorem to the triangles formed by the diagonals of PQRS, the resulting inner shape is always a parallelogram.'
    }
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
        const entry = {
            question_index: current,
            answer: idx,
            is_correct: isCorrect,
        };
        quizAnswersRef.current[current] = entry;
    };

    const handleNext = async () => {
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
                    {pct >= 75 ? 'Great understanding of Quadrilaterals vocabulary!' : 'Review the terms and try again for a higher score.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className={styles['btn-primary']} onClick={() => { quizAnswersRef.current = []; setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }} style={{ padding: '14px 32px', fontSize: 16, background: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
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
                    style={{ padding: '12px 40px', opacity: answered ? 1 : 0.4, cursor: answered ? 'pointer' : 'not-allowed', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                    {current + 1 >= QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Quadrilaterals9Terminology() {
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
        <div className={styles['page']} style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            {/* ── TOP NAV ─────────────────────────────────── */}
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/quadrilaterals')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/quadrilaterals/intro')}>🌟 Introduction</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/quadrilaterals/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, paddingBottom: '40px' }}>
                {/* ── HEADER ──────────────────────────────────── */}
                <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                        Quadrilaterals{' '}
                        <span style={{ background: 'linear-gradient(90deg,#0f4c81,#6a1b9a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Vocabulary</span>
                    </h1>
                </div>

                {/* ── TABS ────────────────────────────────────── */}
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

                                {/* Animated Chart Illustration */}
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
                                    <button className={styles['btn-primary']} onClick={() => setTab('quiz')} style={{ padding: '14px 32px', fontSize: 16, background: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Ready for the Quiz? →</button>
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

                                {/* Animated Chart Illustration */}
                                {KEY_IDEAS[activeIdea].rules[activeRule].chart && (
                                    <div style={{ marginBottom: 24, padding: 16, background: '#f8fafc', borderRadius: 16, display: 'flex', justifyContent: 'center' }}>
                                        {React.createElement(KEY_IDEAS[activeIdea].rules[activeRule].chart)}
                                    </div>
                                )}

                                <div className={styles['rule-split']}>
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

                                <div className={styles['learn-footer']}>
                                    <button className={styles['btn-primary']} onClick={() => setTab('quiz')} style={{ padding: '14px 32px', fontSize: 16, background: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Test your Knowledge →</button>
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
