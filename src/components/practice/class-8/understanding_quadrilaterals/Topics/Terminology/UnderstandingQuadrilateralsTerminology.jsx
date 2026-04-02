import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../understanding_quadrilaterals.module.css';
import { TermFigure, IdeaFigure } from '../../QuadrilateralFigures';

const KEY_TERMS = [
    {
        term: 'Plane Curve',
        symbol: 'curve',
        definition: 'A path traced on a plane surface without lifting the pencil. It may be open, closed, simple, or self-intersecting.',
        eg: 'A loop is a simple closed curve, while a figure-eight is a self-intersecting curve.',
        realWorld: 'Road bends, wire loops, and decorative line designs are all examples of plane curves.',
        color: '#0f766e',
    },
    {
        term: 'Polygon',
        symbol: '$n$-gon',
        definition: 'A simple closed curve made entirely of line segments.',
        eg: 'A triangle, quadrilateral, pentagon, and hexagon are all polygons.',
        realWorld: 'Tiles, signboards, and picture frames are common polygonal shapes.',
        color: '#1e40af',
    },
    {
        term: 'Diagonal',
        symbol: '$AC$',
        definition: 'A line segment joining two non-consecutive vertices of a polygon.',
        eg: 'In quadrilateral $ABCD$, $AC$ and $BD$ are the 2 diagonals.',
        realWorld: 'Bracing rods inside gates and frames often follow diagonal lines.',
        color: '#7c3aed',
    },
    {
        term: 'Convex Polygon',
        symbol: '< 180°',
        definition: 'A polygon in which every interior angle is less than $180^\\circ$ and every diagonal lies inside the figure.',
        eg: 'A regular pentagon and a regular hexagon are convex polygons.',
        realWorld: 'Most tiles and standard geometric cut-outs used in school geometry boxes are convex.',
        color: '#b45309',
    },
    {
        term: 'Exterior Angle',
        symbol: '$180^\\circ - \\text{interior angle}$',
        definition: 'The angle formed by one side of a polygon and the extension of an adjacent side.',
        eg: 'At every vertex of a polygon, one exterior angle contributes to the total exterior turn of $360^\\circ$.',
        realWorld: 'Turning around a building corner or around a track models exterior-angle turning.',
        color: '#be185d',
    },
    {
        term: 'Parallelogram',
        symbol: '$AB \\parallel CD, BC \\parallel AD$',
        definition: 'A quadrilateral in which both pairs of opposite sides are parallel.',
        eg: 'A rectangle, rhombus, and square are all special parallelograms.',
        realWorld: 'Sliding linkages and repeating wall patterns often show parallelogram shapes.',
        color: '#0369a1',
    },
];

const KEY_IDEAS = [
    {
        label: 'Polygon Foundations',
        color: '#0f766e',
        icon: '🧩',
        rules: [
            { icon: '➰', title: 'Simple and Closed', body: 'Only a simple closed curve made of line segments can be a polygon.' },
            { icon: '📏', title: 'Classifying by Sides', body: 'Polygons are named by the number of sides: triangle, quadrilateral, pentagon, hexagon, and so on.' },
            { icon: '🔍', title: 'Convex vs Concave', body: 'In Class 8 we mainly work with convex polygons, where every diagonal stays inside the figure.' },
            { icon: '⭐', title: 'Regular vs Irregular', body: 'A regular polygon is both equilateral and equiangular. If one of these fails, it is irregular.' },
        ],
    },
    {
        label: 'Angle and Quadrilateral Structure',
        color: '#7c3aed',
        icon: '📐',
        rules: [
            { icon: '🔺', title: 'Interior Angle Sum', body: 'An $n$-gon can be divided into $(n-2)$ triangles, so its interior angle sum is $(n-2) \\times 180^\\circ$. For a quadrilateral this gives $2 \\times 180^\\circ = 360^\\circ$.' },
            { icon: '🔄', title: 'Exterior Angle Sum', body: 'Walking once around any convex polygon, you turn through one full rotation. So the sum of all exterior angles is always $360^\\circ$, regardless of the number of sides.' },
            { icon: '↔️', title: 'How Parallel Sides Classify Shapes', body: 'The number of parallel side-pairs determines the quadrilateral family. Zero pairs gives a general quadrilateral or kite. Exactly one pair gives a trapezium. Two pairs of parallel sides define a parallelogram and all its special forms.' },
            { icon: '🏆', title: 'The Square at the Apex', body: 'As more conditions are added — first equal opposite sides and angles (parallelogram), then equal diagonals (rectangle), then perpendicular diagonals (rhombus) — the figure narrows until every condition is met simultaneously in the square.' },
        ],
    },
];

const QUIZ_QUESTIONS = [
    { q: 'A polygon must be:', options: ['Open and curved', 'Simple closed and made of line segments', 'Only circular', 'Always regular'], correct: 1 },
    { q: 'A diagonal joins:', options: ['Adjacent vertices', 'Non-adjacent vertices', 'Midpoints of sides', 'Only equal sides'], correct: 1 },
    { q: 'In Class 8, the angle-sum formulas in this chapter are applied to:', options: ['Concave polygons only', 'Convex polygons', 'Only triangles', 'Only circles'], correct: 1 },
    { q: 'The sum of the exterior angles of any convex polygon is:', options: ['$180^\\circ$', '$270^\\circ$', '$360^\\circ$', '$540^\\circ$'], correct: 2 },
    { q: 'A quadrilateral with one pair of opposite sides parallel is a:', options: ['Kite', 'Rectangle', 'Trapezium', 'Rhombus'], correct: 2 },
    { q: 'A quadrilateral with both pairs of opposite sides parallel is a:', options: ['Parallelogram', 'Kite', 'Trapezium', 'Triangle'], correct: 0 },
    { q: 'A regular polygon is both:', options: ['Convex and concave', 'Equilateral and equiangular', 'Open and closed', 'Curved and straight'], correct: 1 },
    { q: 'Which shape is both a rectangle and a rhombus?', options: ['Trapezium', 'Kite', 'Square', 'Hexagon'], correct: 2 },
    { q: 'A kite has how many pairs of equal consecutive sides?', options: ['1', '2', '3', '4'], correct: 1 },
    { q: 'The interior angle sum of a pentagon is:', options: ['$360^\\circ$', '$540^\\circ$', '$720^\\circ$', '$900^\\circ$'], correct: 1 },
];

export default function UnderstandingQuadrilateralsTerminology() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('terms');
    const [activeTerm, setActiveTerm] = useState(KEY_TERMS[0]);
    const [activeIdea, setActiveIdea] = useState(0);
    const [activeRule, setActiveRule] = useState(0);
    const [quizIdx, setQuizIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [quizDone, setQuizDone] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleSelect = (idx) => {
        if (selected !== null) return;
        setSelected(idx);
        if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore((s) => s + 1);
    };

    const nextQ = () => {
        if (quizIdx + 1 >= QUIZ_QUESTIONS.length) setQuizDone(true);
        else { setQuizIdx((i) => i + 1); setSelected(null); }
    };

    const resetQuiz = () => { setQuizIdx(0); setSelected(null); setScore(0); setQuizDone(false); };
    const q = QUIZ_QUESTIONS[quizIdx];

    return (
        <div className={styles['ccr-page']}>
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals')}>
                    ← Understanding Quadrilaterals
                </button>
                <div className={styles['ccr-nav-links']}>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals/introduction')}>Introduction</button>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Terminology</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals/skills')}>Skills</button>
                </div>
            </nav>

            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>
                    Understanding Quadrilaterals <span className={styles['ccr-accent-text']}>Terminology</span>
                </h1>
                <p className={styles['ccr-module-subtitle']}>6 Key Terms · 2 Key Ideas · Quiz</p>
            </div>

            <div className={styles['ccr-lexicon-container']} style={{ maxWidth: 1060, margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 24, paddingTop: 24 }}>
                    {[
                        { id: 'terms', label: 'Key Terms' },
                        { id: 'ideas', label: 'Key Ideas' },
                        { id: 'quiz', label: 'Test Prep' },
                    ].map(({ id, label }) => (
                        <button key={id} className={`${styles['ccr-tab']}${tab === id ? ` ${styles['active']}` : ''}`} onClick={() => setTab(id)}>
                            {label}
                        </button>
                    ))}
                </div>

                {tab === 'terms' && (
                    <div className={styles['ccr-learn-grid']}>
                        <aside className={styles['ccr-learn-sidebar']}>
                            {KEY_TERMS.map((t, idx) => (
                                <button
                                    key={t.term}
                                    className={`${styles['ccr-sidebar-btn']}${t.term === activeTerm.term ? ` ${styles['active']}` : ''}`}
                                    style={{ '--skill-color': t.color }}
                                    onClick={() => setActiveTerm(t)}
                                >
                                    <div className={styles['ccr-sidebar-btn-num']}>{idx + 1}</div>
                                    <span className={styles['ccr-sidebar-btn-title']}>{t.term}</span>
                                </button>
                            ))}
                        </aside>
                        <main className={`${styles['ccr-details-window']} ${styles['ccr-details-window-anim']}`} style={{ border: `2px solid ${activeTerm.color}15` }}>
                            <div className={styles['ccr-learn-header-row']}>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: activeTerm.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Vocabulary Item</div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: '#1e293b', margin: 0 }}>{activeTerm.term}</h2>
                                </div>
                                <div style={{ fontSize: 32 }}>{activeTerm.symbol.includes('$') ? <LatexText text={activeTerm.symbol} /> : activeTerm.symbol}</div>
                            </div>

                            <div style={{ background: `${activeTerm.color}05`, padding: 24, borderRadius: 20, border: `2px solid ${activeTerm.color}15`, marginBottom: 20 }}>
                                <div style={{ fontSize: 16, lineHeight: 1.7, color: '#1e293b', margin: 0 }}>
                                    <LatexText text={activeTerm.definition} />
                                </div>
                            </div>

                            <div className={styles['ccr-inline-figure']} style={{ marginBottom: 20 }}>
                                <TermFigure term={activeTerm.term} color={activeTerm.color} />
                            </div>

                            <div className={styles['ccr-rule-split']}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Example Case</h4>
                                    <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6 }}>
                                            <LatexText text={activeTerm.eg} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: activeTerm.color, marginBottom: 10 }}>Real-World Application</h4>
                                    <div style={{ background: `${activeTerm.color}08`, padding: 16, borderRadius: 14, border: `1px solid ${activeTerm.color}15` }}>
                                        <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6 }}>
                                            <LatexText text={activeTerm.realWorld} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['ccr-learn-footer']} style={{ marginTop: 24 }}>
                                {(() => {
                                    const idx = KEY_TERMS.findIndex((t) => t.term === activeTerm.term);
                                    if (idx < KEY_TERMS.length - 1) {
                                        return (
                                            <button className={styles['ccr-btn-secondary']} onClick={() => setActiveTerm(KEY_TERMS[idx + 1])}>
                                                Next: {KEY_TERMS[idx + 1].term}
                                            </button>
                                        );
                                    }
                                    return (
                                        <button className={styles['ccr-btn-primary']} onClick={() => setTab('ideas')}>Next: Key Ideas →</button>
                                    );
                                })()}
                            </div>
                        </main>
                    </div>
                )}

                {tab === 'ideas' && (
                    <div className={styles['ccr-section']}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                            {KEY_IDEAS.map((idea, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveIdea(idx); setActiveRule(0); }}
                                    style={{ padding: '12px 24px', borderRadius: 50, border: '2px solid', borderColor: activeIdea === idx ? idea.color : '#e2e8f0', background: activeIdea === idx ? idea.color : '#fff', color: activeIdea === idx ? '#fff' : '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Open Sans, sans-serif' }}
                                >
                                    <span>{idea.icon}</span> {idea.label}
                                </button>
                            ))}
                        </div>

                        <div className={styles['ccr-learn-grid']}>
                            <aside className={styles['ccr-learn-sidebar']}>
                                {KEY_IDEAS[activeIdea].rules.map((rule, ri) => (
                                    <button
                                        key={ri}
                                        onClick={() => setActiveRule(ri)}
                                        className={`${styles['ccr-sidebar-btn']}${activeRule === ri ? ` ${styles['active']}` : ''}`}
                                        style={{ '--skill-color': KEY_IDEAS[activeIdea].color }}
                                    >
                                        <div className={styles['ccr-sidebar-btn-num']}>{ri + 1}</div>
                                        <span className={styles['ccr-sidebar-btn-title']}>{rule.title}</span>
                                    </button>
                                ))}
                            </aside>

                            <main key={`${activeIdea}-${activeRule}`} className={`${styles['ccr-details-window']} ${styles['ccr-details-window-anim']}`} style={{ border: `2px solid ${KEY_IDEAS[activeIdea].color}15` }}>
                                <div className={styles['ccr-learn-header-row']}>
                                    <div>
                                        <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: KEY_IDEAS[activeIdea].color }}>{KEY_IDEAS[activeIdea].rules[activeRule].title}</h3>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {activeRule + 1} OF {KEY_IDEAS[activeIdea].rules.length}</div>
                                    </div>
                                    <div style={{ fontSize: 32 }}>{KEY_IDEAS[activeIdea].rules[activeRule].icon}</div>
                                </div>

                                <div style={{ background: `${KEY_IDEAS[activeIdea].color}05`, padding: 24, borderRadius: 20, border: `2px solid ${KEY_IDEAS[activeIdea].color}15`, marginBottom: 28 }}>
                                    <div style={{ fontSize: 16, lineHeight: 1.7, color: '#1e293b', margin: 0 }}>
                                        <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].body} />
                                    </div>
                                </div>

                                <div className={styles['ccr-inline-figure']} style={{ marginBottom: 28 }}>
                                    <IdeaFigure
                                        idea={KEY_IDEAS[activeIdea].label}
                                        rule={KEY_IDEAS[activeIdea].rules[activeRule].title}
                                        color={KEY_IDEAS[activeIdea].color}
                                    />
                                </div>

                                <div className={styles['ccr-learn-footer']}>
                                    {activeIdea === KEY_IDEAS.length - 1 && activeRule === KEY_IDEAS[activeIdea].rules.length - 1 && (
                                        <button className={styles['ccr-btn-primary']} onClick={() => setTab('quiz')}>Test your Knowledge →</button>
                                    )}
                                    {activeRule < KEY_IDEAS[activeIdea].rules.length - 1 ? (
                                        <button className={styles['ccr-btn-secondary']} onClick={() => setActiveRule(activeRule + 1)}>
                                            Next: {KEY_IDEAS[activeIdea].rules[activeRule + 1].title}
                                        </button>
                                    ) : (
                                        activeIdea < KEY_IDEAS.length - 1 && (
                                            <button className={styles['ccr-btn-secondary']} onClick={() => { setActiveIdea(activeIdea + 1); setActiveRule(0); }}>
                                                Next Idea: {KEY_IDEAS[activeIdea + 1].label}
                                            </button>
                                        )
                                    )}
                                </div>
                            </main>
                        </div>
                    </div>
                )}



                {tab === 'quiz' && (
                    <div className={styles['ccr-quiz-container']}>
                        {quizDone ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ width: 120, height: 120, borderRadius: '50%', background: `conic-gradient(#0f766e ${(score / QUIZ_QUESTIONS.length) * 360}deg, #f1f5f9 0deg)`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                                    <div style={{ width: 84, height: 84, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 30, fontWeight: 900, color: '#1e293b' }}>{score}</div>
                                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>/ {QUIZ_QUESTIONS.length}</div>
                                    </div>
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: '#1e293b', margin: '0 0 8px' }}>
                                    {score >= 8 ? '🌟 Excellent!' : score >= 6 ? '👍 Good job!' : '💪 Keep Reviewing!'}
                                </h2>
                                <p style={{ color: '#64748b', margin: '0 0 28px' }}>You scored {score} out of {QUIZ_QUESTIONS.length}</p>
                                <button className={styles['ccr-btn-primary']} onClick={resetQuiz}>🔁 Retry Quiz</button>
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: 20 }}>
                                    <div className={styles['ccr-score-header']}>
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: 1.2 }}>Test Prep</div>
                                            <div style={{ fontSize: 18, fontWeight: 800, color: '#1e293b' }}>Terminology Quiz</div>
                                        </div>
                                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q {quizIdx + 1} / {QUIZ_QUESTIONS.length}</div>
                                    </div>
                                    <div style={{ background: '#f1f5f9', borderRadius: 8, height: 5, overflow: 'hidden', marginTop: 8 }}>
                                        <div style={{ height: '100%', width: `${((quizIdx + (selected !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`, background: '#0f766e', borderRadius: 8, transition: 'width 0.4s' }} />
                                    </div>
                                </div>
                                <div className={styles['ccr-quiz-card']}>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 20, lineHeight: 1.6 }}>
                                        <LatexText text={q.q} />
                                    </div>
                                    <div className={styles['ccr-quiz-options']}>
                                        {q.options.map((opt, oi) => {
                                            let border = 'rgba(0,0,0,0.07)';
                                            let bg = '#fff';
                                            let txt = '#1e293b';
                                            if (selected !== null) {
                                                if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txt = '#059669'; }
                                                else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txt = '#ef4444'; }
                                            }
                                            return (
                                                <button
                                                    key={oi}
                                                    onClick={() => handleSelect(oi)}
                                                    disabled={selected !== null}
                                                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderRadius: 12, border: `2.5px solid ${border}`, background: bg, cursor: selected !== null ? 'default' : 'pointer', fontSize: 14, color: txt, fontWeight: 600, textAlign: 'left', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}
                                                >
                                                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: oi === q.correct && selected !== null ? '#10b981' : '#f1f5f9', flexShrink: 0 }} />
                                                    <LatexText text={opt} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={nextQ}
                                        disabled={selected === null}
                                        style={{ padding: '12px 40px', background: selected !== null ? '#0f766e' : '#f1f5f9', color: selected !== null ? '#fff' : '#94a3b8', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, cursor: selected !== null ? 'pointer' : 'not-allowed', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}
                                    >
                                        {quizIdx + 1 >= QUIZ_QUESTIONS.length ? '🏁 See Score' : 'Next →'}
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
