import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../triangles_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { SASChart, SSSChart, ASAChart, RHSChart, CongruenceChart, CPCTChart, IsoscelesChart, EquilateralChart } from '../components/TrianglesDynamicCharts';

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const TERMS = [
    {
        name: 'Congruence of Triangles',
        icon: '📐',
        color: '#0f4c81',
        chart: CongruenceChart,
        def: 'Two triangles are congruent if and only if one of them can be made to superpose on the other so as to cover it exactly.\n\n• They have the exact same shape and size.\n• All corresponding sides are equal.\n• All corresponding angles are equal.',
        example: 'If $\\triangle ABC \\cong \\triangle PQR$, then side $AB = PQ$, $BC = QR$, $AC = PR$ and $\\angle A = \\angle P$, $\\angle B = \\angle Q$, $\\angle C = \\angle R$.',
        realWorld: 'Two copies of the exact same photograph printed at 4x6 dimensions.',
    },
    {
        name: 'CPCT',
        icon: '🔗',
        color: '#1a237e',
        chart: CPCTChart,
        def: 'CPCT stands for "Corresponding Parts of Congruent Triangles".\n\n• Once two triangles are proven congruent, their remaining matching parts automatically become equal.\n• We use CPCT in proofs to state that an unknown side or measuring angle is equal to its pair.',
        example: 'If you prove $\\triangle XYZ \\cong \\triangle LMN$ using just SAS, you can then say $\\angle Y = \\angle M$ by CPCT.',
        realWorld: 'If two cars are exactly the same model (congruent), their steering wheels (corresponding parts) must be identical.',
    },
    {
        name: 'Isosceles Triangle Properties',
        icon: '🔺',
        color: '#b71c1c',
        chart: IsoscelesChart,
        def: 'An isosceles triangle has two sides of equal length.\n\n• Theorem 7.2: Angles opposite to equal sides of an isosceles triangle are equal.\n• Theorem 7.3 (Converse): The sides opposite to equal angles of a triangle are equal.',
        example: 'If in $\\triangle ABC$, $AB = AC$, then $\\angle B = \\angle C$.',
        realWorld: 'A standard roof truss forms an isosceles triangle to evenly distribute the weight to the walls.',
    },
    {
        name: 'Equilateral Triangle Properties',
        icon: '💠',
        color: '#6a1b9a',
        chart: EquilateralChart,
        def: 'A triangle where all three sides are equal.\n\n• All three internal angles are also equal.\n• Since the sum of angles is $180^{\\circ}$, each angle strictly measures $60^{\\circ}$.',
        example: 'Every angle in an equilateral triangle is exactly $60^{\\circ}$.',
        realWorld: 'A classic "Yield" traffic sign.',
    }
];

// ─── KEY IDEAS DATA ──────────────────────────────────────────────────────────
const KEY_IDEAS = [
    {
        title: 'Congruence Criteria',
        icon: '📏',
        color: '#0f766e',
        rules: [
            {
                title: 'SAS Axiom',
                chart: SASChart,
                f: '$\\text{Side - Angle - Side}$',
                d: 'Two triangles are congruent if two sides and the included angle of one triangle are equal to the two sides and the included angle of the other triangle.',
                tip: 'The angle MUST be sandwiched directly between the two known equal sides!',
                ex: 'In $\\triangle ABC$ and $\\triangle DEF$, if $AB = DE$, $\\angle B = \\angle E$, and $BC = EF$, then $\\triangle ABC \\cong \\triangle DEF$.'
            },
            {
                title: 'ASA/AAS Theorem',
                chart: ASAChart,
                f: '$\\text{Angle - Side - Angle}$',
                d: 'Two triangles are congruent if two angles and the included side of one triangle are equal to two angles and the included side of the other.',
                tip: 'AAS (Angle-Angle-Side) also works because if two angles are equal, the third angle matches automatically due to the $180^{\\circ}$ rule.',
                ex: 'In $\\triangle ABC$ and $\\triangle DEF$, if $\\angle B = \\angle E$, $BC = EF$, and $\\angle C = \\angle F$, they are congruent (ASA).'
            },
            {
                title: 'SSS Theorem',
                chart: SSSChart,
                f: '$\\text{Side - Side - Side}$',
                d: 'If three sides of one triangle are equal to the three sides of another triangle, then the two triangles are congruent.',
                tip: 'You do not need to know a single angle measurement if all three side lengths match!',
                ex: 'If $AB=PQ$, $BC=QR$, and $AC=PR$, then $\\triangle ABC \\cong \\triangle PQR$.'
            },
            {
                title: 'RHS Theorem',
                chart: RHSChart,
                f: '$\\text{Right Angle - Hypotenuse - Side}$',
                d: 'If in two right triangles the hypotenuse and one side of one triangle are equal to the hypotenuse and one side of the other triangle, then the two triangles are congruent.',
                tip: 'RHS only applies to triangles containing a $90^{\\circ}$ angle.',
                ex: 'In right triangles $\\triangle ABC$ and $\\triangle DEF$ (right angled at B and E), if hypotenuse $AC = DF$ and side $AB = DE$, they are congruent.'
            }
        ]
    }
];

// ─── QUIZ (Test Prep) ────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    {
        q: 'Which of the following is NOT a valid congruence criterion for triangles?',
        opts: ['SAS', 'ASA', 'SSA', 'SSS'],
        ans: 2,
        exp: 'SSA (Side-Side-Angle) is not a guaranteed congruence criterion because it can create two totally different triangles (the ambiguous case).'
    },
    {
        q: 'In $\\triangle ABC$, if $AB = AC$, which property is true?',
        opts: ['$\\angle A = \\angle B$', '$\\angle B = \\angle C$', '$\\angle C = \\angle A$', 'All angles are $60^{\\circ}$'],
        ans: 1,
        exp: 'By Theorem 7.2, angles opposite to equal sides of an isosceles triangle are equal.'
    },
    {
        q: 'If $\\triangle ABC \\cong \\triangle PQR$, what does CPCT allow us to conclude?',
        opts: ['Only the sides are equal', '$\\angle A = \\angle R$', '$\\angle B = \\angle Q$', 'They have different areas'],
        ans: 2,
        exp: 'CPCT means corresponding parts are equal. The second letter in ABC corresponds to the second letter in PQR, so $\\angle B = \\angle Q$.'
    },
    {
        q: 'What does RHS stand for in congruence?',
        opts: ['Right-Hand-Side', 'Right angle-Hypotenuse-Side', 'Ratio-Height-Side', 'Rectangle-Hypotenuse-Side'],
        ans: 1,
        exp: 'RHS requires a Right angle, an equal Hypotenuse, and one equal Side.'
    },
    {
        q: 'Can two equilateral triangles of different sizes be congruent?',
        opts: ['Yes, always', 'No, never', 'Only if they share a vertex', 'Only if their side lengths are equal'],
        ans: 3,
        exp: 'All equilateral triangles have equal angles ($60^{\\circ}$), but to be congruent (same size and shape), their side lengths must also be strictly equal (SSS).'
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
                    {pct >= 75 ? 'Great understanding of Triangles vocabulary!' : 'Review the terms and try again for a higher score.'}
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
export default function Triangles9Terminology() {
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/triangles')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/triangles/intro')}>🌟 Introduction</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/triangles/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, paddingBottom: '40px' }}>
                {/* ── HEADER ──────────────────────────────────── */}
                <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                        Triangles{' '}
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
