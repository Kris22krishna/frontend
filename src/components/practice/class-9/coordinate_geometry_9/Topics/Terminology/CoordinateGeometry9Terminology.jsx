import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionLogger } from '@/hooks/useSessionLogger';

const TERMINOLOGY_QUIZ_NODE_ID = 'a4091003-0010-0000-0000-000000000000';
import styles from '../../coordinate_geometry_9.module.css';
import { LatexText } from '../../../../../LatexText';
import {
    QuadrantChart, AxesHighlightChart, OrderedPairChart,
    ReflectionChart, DistanceFromAxisChart, PlottingStepsChart,
} from '../components/CGDynamicCharts';

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const TERMS = [
    {
        name: 'Cartesian System',
        icon: '🪟',
        color: '#0f4c81',
        chart: AxesHighlightChart,
        def: 'A coordinate system that specifies each point uniquely in a plane by a pair of numerical coordinates, which are the signed distances to the point from two fixed perpendicular oriented lines.',
        example: 'To locate a desk in a classroom, you might say "3rd row from the front, 4th seat from the left". $X=4, Y=3$.',
        realWorld: 'Your smartphone screen uses a Cartesian system to know exactly where your finger tapped.',
    },
    {
        name: 'Coordinate Axes',
        icon: '➕',
        color: '#1a237e',
        chart: AxesHighlightChart,
        def: 'The two mutually perpendicular reference lines in a plane. The horizontal line is called the $X$-axis and the vertical line is called the $Y$-axis.',
        example: 'Like the equator and the prime meridian on Earth. The $X$-axis runs left-to-right. The $Y$-axis runs bottom-to-top.',
        realWorld: 'On a graph of temperature vs. time, time is on the $X$-axis and temperature is on the $Y$-axis.',
    },
    {
        name: 'Origin',
        icon: '🎯',
        color: '#6a1b9a',
        chart: AxesHighlightChart,
        def: 'The point of intersection of the $X$-axis and the $Y$-axis. It serves as the reference starting point for measuring distances.',
        example: 'The coordinates of the origin are $(0, 0)$. Any movement starts from here.',
        realWorld: 'When you open a maps app, the "My Location" dot acts as the origin from which all travel distances are calculated.',
    },
    {
        name: 'Abscissa (x-coordinate)',
        icon: '↔️',
        color: '#b71c1c',
        chart: OrderedPairChart,
        def: 'The $X$-coordinate of a point. It represents the perpendicular distance of the point from the $Y$-axis.',
        example: 'In the ordered pair $(4, -7)$, the abscissa is $4$. This means the point is $4$ units to the right of the $Y$-axis.',
        realWorld: 'Walking along a street (horizontal movement) before turning into an alley (vertical movement).',
    },
    {
        name: 'Ordinate (y-coordinate)',
        icon: '↕️',
        color: '#e65100',
        chart: OrderedPairChart,
        def: 'The $Y$-coordinate of a point. It represents the perpendicular distance of the point from the $X$-axis.',
        example: 'In the ordered pair $(4, -7)$, the ordinate is $-7$. This means the point is $7$ units below the $X$-axis.',
        realWorld: 'Taking the elevator directly up to the 5th floor of a building.',
    },
    {
        name: 'Quadrants',
        icon: '🧩',
        color: '#0f766e',
        chart: QuadrantChart,
        def: 'The four regions into which the coordinate axes divide the plane. They are numbered I, II, III, and IV anti-clockwise starting from the top right.',
        example: 'Quadrant I $(+, +)$, Quadrant II $(-, +)$, Quadrant III $(-, -)$, Quadrant IV $(+, -)$.',
        realWorld: 'Dividing a city into North-East, North-West, South-West, and South-East zones.',
    },
];

// ─── KEY IDEAS DATA ──────────────────────────────────────────────────────────
const KEY_IDEAS = [
    {
        title: 'Locating Points',
        icon: '📍',
        color: '#0f4c81',
        rules: [
            {
                title: 'The Ordered Pair (x, y)',
                chart: PlottingStepsChart,
                f: '$\\text{Point } P = (x, y)$',
                d: 'Every point in the Cartesian plane is uniquely represented by an ordered pair of real numbers. The order matters! $(3, 5)$ is not the same as $(5, 3)$.',
                ex: '$(3, 5)$ means travel $3$ units Right on $X$, then $5$ units Up on $Y$.\n$(5, 3)$ means travel $5$ units Right on $X$, then $3$ units Up on $Y$.',
                tip: 'Always remember: Walk down the hall ($X$-axis) before taking the elevator ($Y$-axis).',
            },
            {
                title: 'Points on the Axes',
                f: '$\\text{On } X\\text{-axis: } (x, 0) \\quad | \\quad \\text{On } Y\\text{-axis: } (0, y)$',
                d: 'If a point lies exactly on the $X$-axis, it hasn\'t moved up or down, so its $Y$-ordinate is $0$. Conversely, points on the $Y$-axis have an $X$-abscissa of $0$.',
                ex: '$(5, 0)$ lies on the positive $X$-axis.\n$(0, -8)$ lies on the negative $Y$-axis.',
                tip: 'If there is a $0$, the point is trapped on one of the lines! Look at where the non-zero number is to know which line it is on.',
            },
        ],
    },
    {
        title: 'Understanding Quadrants & Distance',
        icon: '🗺️',
        color: '#b71c1c',
        rules: [
            {
                title: 'Quadrant Signs',
                chart: QuadrantChart,
                f: '$\\text{Q I}: (+,+) \\quad \\text{Q II}: (-,+) \\quad \\text{Q III}: (-,-) \\quad \\text{Q IV}: (+,-)$',
                d: 'The signs of the coordinates determine which quarter of the infinite plane the point lives in.',
                ex: 'Point $A(-2, 5)$ has negative $X$, positive $Y \\implies \\text{Quadrant II}$.\nPoint $B(-3, -4)$ has both negative $\\implies \\text{Quadrant III}$.',
                tip: 'Draw a small plus sign on your paper. Label the directions $+,-,+, -$. It makes matching signs to quadrants instantly visual.',
            },
            {
                title: 'Perpendicular Distance from Axes',
                chart: DistanceFromAxisChart,
                f: '$\\text{Distance from } X\\text{-axis} = |y| \\quad | \\quad \\text{Distance from } Y\\text{-axis} = |x|$',
                d: 'The distance of a point from the $X$-axis is its vertical height (the $y$-coordinate). Distance from the $Y$-axis is its horizontal shift (the $x$-coordinate). Distances are ALWAYS positive!',
                ex: 'For point $(-4, 7)$:\nDistance from $X$-axis = $|7| = 7$ units.\nDistance from $Y$-axis = $|-4| = 4$ units.',
                tip: 'This is the most common trick question! Distance from $X$-axis is NOT the $x$-value, it is the $Y$-value!',
            },
        ],
    },
];

// ─── QUIZ (Test Prep) ────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    { q: 'The point of intersection of the coordinate axes is called:', opts: ['Abscissa', 'Ordinate', 'Origin', 'Quadrant'], ans: 2, exp: 'The axes intersect at $(0,0)$, which is defined as the Origin.' },
    { q: 'What is the $y$-coordinate of the point $(3, -4)$?', opts: ['$3$', '$-4$', '$-3$', '$4$'], ans: 1, exp: 'In the ordered pair $(x, y)$, the second number is the $y$-coordinate. So it is $-4$.' },
    { q: 'In which quadrant does the point $(-2, 5)$ lie?', opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], ans: 1, exp: 'Negative $X$ and Positive $Y$ $(-, +)$ describes Quadrant II.' },
    { q: 'If the $y$-coordinate of a point is zero, where does the point lie?', opts: ['On the $Y$-axis', 'On the $X$-axis', 'In Quadrant I', 'In Quadrant IV'], ans: 1, exp: 'Points in the format $(x, 0)$ have no vertical distance from the horizontal axis, so they lie directly ON the $X$-axis.' },
    { q: 'What is the perpendicular distance of the point $(5, -7)$ from the $Y$-axis?', opts: ['$5$ units', '$-7$ units', '$7$ units', '$-5$ units'], ans: 0, exp: 'The distance from the $Y$-axis is the absolute value of the $x$-coordinate: $|5| = 5$ units.' },
    { q: 'What is the perpendicular distance of the point $(2, -6)$ from the $X$-axis?', opts: ['$2$ units', '$-6$ units', '$6$ units', '$8$ units'], ans: 2, exp: 'The distance from the $X$-axis is the absolute value of the $y$-coordinate: $|-6| = 6$ units. Distance is always positive.' },
    { q: 'Which of the following points lies on the negative $Y$-axis?', opts: ['$(0, 3)$', '$(-3, 0)$', '$(0, -4)$', '$(4, 0)$'], ans: 2, exp: 'Points on the $Y$-axis have $x = 0$. For it to be on the NEGATIVE $Y$-axis, the $y$-value must be negative. Thus, $(0, -4)$.' },
    { q: 'The $x$-coordinate of a point is also called the:', opts: ['Ordinate', 'Origin', 'Quadrant', 'Abscissa'], ans: 3, exp: 'The mathematical name for the $x$-coordinate is the Abscissa.' },
    { q: 'Both coordinates of a point are negative. In which quadrant does it lie?', opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], ans: 2, exp: 'The format $(-x, -y)$ falls exactly into Quadrant III (bottom-left region).' },
    { q: 'Are the points $(3, 4)$ and $(4, 3)$ located at the same position?', opts: ['Yes', 'No', 'Depends on the scale', 'Only if graphed on paper'], ans: 1, exp: 'No, $(x, y)$ is an ordered pair. $(3, 4)$ is $3$ units right and $4$ units up. $(4, 3)$ is $4$ units right and $3$ units up. Order strictly matters.' },
];

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function QuizEngine({ onBack }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const quizAnswersRef = useRef([]);

    const q = QUIZ_QUESTIONS[current];
    const color = '#0f4c81';
    const progress = ((current + (finished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

    useEffect(() => {
        startSession({ nodeId: TERMINOLOGY_QUIZ_NODE_ID, sessionType: 'quiz' });
    }, []); // eslint-disable-line

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        const isCorrect = idx === q.ans;
        if (isCorrect) setScore((s) => s + 1);
        const entry = {
            question_index: current,
            answer_json: { selected: idx, correct_answer: q.ans },
            is_correct: isCorrect,
            marks_awarded: isCorrect ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0,
        };
        quizAnswersRef.current[current] = entry;
        logAnswer(entry);
    };

    const handleNext = async () => {
        if (current + 1 >= QUIZ_QUESTIONS.length) {
            await finishSession({ answers_payload: quizAnswersRef.current.filter(Boolean) });
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
                    {pct >= 75 ? 'Great understanding of Coordinate Geometry vocabulary!' : 'Review the terms and try again for a higher score.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className={styles['btn-primary']} onClick={() => { quizAnswersRef.current = []; startSession({ nodeId: TERMINOLOGY_QUIZ_NODE_ID, sessionType: 'quiz' }); setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}>
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
export default function CoordinateGeometry9Terminology() {
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
            {/* ── TOP NAV ─────────────────────────────────── */}
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/coordinate-geometry')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/coordinate-geometry/intro')}>🌟 Introduction</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/coordinate-geometry/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HEADER ──────────────────────────────────── */}
                <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                        Coordinate Geometry{' '}
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
