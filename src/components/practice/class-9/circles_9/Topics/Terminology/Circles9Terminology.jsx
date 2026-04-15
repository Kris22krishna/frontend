import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../circles_9.module.css';
import { LatexText } from '../../../../../LatexText';

// SVGs for Terminology
const RadiusSVG = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        <circle cx="100" cy="100" r="4" fill="#3b82f6" />
        <line x1="100" y1="100" x2="169.28" y2="60" stroke="#3b82f6" strokeWidth="4" />
        <text x="130" y="70" fill="#3b82f6" fontSize="16" fontWeight="bold">Radius</text>
        <text x="85" y="115" fill="#64748b" fontSize="14" fontWeight="bold">Center</text>
    </svg>
);

const DiameterSVG = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        <circle cx="100" cy="100" r="4" fill="#64748b" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#f59e0b" strokeWidth="4" />
        <text x="75" y="90" fill="#f59e0b" fontSize="16" fontWeight="bold">Diameter</text>
    </svg>
);

const ChordSVG = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        <circle cx="100" cy="100" r="4" fill="#64748b" />
        <line x1="30" y1="60" x2="170" y2="60" stroke="#10b981" strokeWidth="4" />
        <text x="100" y="50" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">Chord</text>
    </svg>
);

const ArcSVG = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f5f9" strokeWidth="4" />
        <path d="M 43.43 43.43 A 80 80 0 0 1 156.57 43.43" fill="none" stroke="#8b5cf6" strokeWidth="6" />
        <text x="100" y="25" fill="#8b5cf6" fontSize="16" fontWeight="bold" textAnchor="middle">Minor Arc</text>
        <path d="M 156.57 43.43 A 80 80 0 1 1 43.43 43.43" fill="none" stroke="#ec4899" strokeWidth="6" />
        <text x="100" y="195" fill="#ec4899" fontSize="16" fontWeight="bold" textAnchor="middle">Major Arc</text>
    </svg>
);

const SegmentSVG = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px">
        <circle cx="100" cy="100" r="80" fill="#fce7f3" stroke="#e2e8f0" strokeWidth="4" />
        <path d="M 30 60 A 80 80 0 0 1 170 60 Z" fill="#d8b4fe" />
        <line x1="30" y1="60" x2="170" y2="60" stroke="#8b5cf6" strokeWidth="4" />
        <text x="100" y="45" fill="#581c87" fontSize="14" fontWeight="bold" textAnchor="middle">Minor Segment</text>
        <text x="100" y="130" fill="#9d174d" fontSize="16" fontWeight="bold" textAnchor="middle">Major Segment</text>
    </svg>
);

const SectorSVG = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px">
        <circle cx="100" cy="100" r="80" fill="#fef3c7" stroke="#e2e8f0" strokeWidth="4" />
        <path d="M 100 100 L 43.43 43.43 A 80 80 0 0 1 156.57 43.43 Z" fill="#bbf7d0" />
        <text x="100" y="65" fill="#166534" fontSize="14" fontWeight="bold" textAnchor="middle">Minor Sector</text>
        <text x="100" y="150" fill="#92400e" fontSize="16" fontWeight="bold" textAnchor="middle">Major Sector</text>
    </svg>
);

const SubtendedAngleSVG = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        <circle cx="100" cy="100" r="4" fill="#64748b" />
        {/* Chord */}
        <line x1="30" y1="134.64" x2="170" y2="134.64" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
        {/* Subtended to center */}
        <line x1="100" y1="100" x2="30" y2="134.64" stroke="#3b82f6" strokeWidth="3" />
        <line x1="100" y1="100" x2="170" y2="134.64" stroke="#3b82f6" strokeWidth="3" />
        {/* Angle arc */}
        <path d="M 90 105 A 15 15 0 0 0 110 105" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <text x="100" y="85" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">Angle Subtended</text>
        <text x="100" y="150" fill="#64748b" fontSize="12" fontWeight="bold" textAnchor="middle">by Chord</text>
    </svg>
);

const CyclicQuadSVG = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        {/* Points on circle */}
        <polygon points="40,47 160,47 175,127 60,169" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="40" cy="47" r="4" fill="#d97706" />
        <circle cx="160" cy="47" r="4" fill="#d97706" />
        <circle cx="175" cy="127" r="4" fill="#d97706" />
        <circle cx="60" cy="169" r="4" fill="#d97706" />
    </svg>
);

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const KEY_TERMS = [
    {
        name: 'Radius & Center',
        icon: '📏',
        color: '#0f4c81',
        chart: RadiusSVG,
        def: 'The distance from the center of the circle to any point on its boundary.\n\n• Center: The fixed point in the middle.\n• Radius: A line segment from the center to the boundary.',
        example: 'If the radius is $5\\text{ cm}$, any line from the center to the edge is $5\\text{ cm}$.',
        realWorld: 'The spokes on a bicycle wheel or a tetherball attached to a pole.',
    },
    {
        name: 'Diameter & Chord',
        icon: '➖',
        color: '#1a237e',
        chart: DiameterSVG,
        def: 'Line segments connecting two points on the circle.\n\n• Chord: A segment whose endpoints lie on the circle.\n• Diameter: The longest chord, which passes exactly through the center. $d = 2r$.',
        example: 'A circle with radius $3\\text{ cm}$ has a diameter of $6\\text{ cm}$.',
        realWorld: 'Cutting a pizza straight down the middle represents the diameter.',
    },
    {
        name: 'Arc',
        icon: '🌈',
        color: '#b71c1c',
        chart: ArcSVG,
        def: 'A continuous piece of the circle\'s boundary.\n\n• Minor Arc: The shorter distance between two points on the boundary.\n• Major Arc: The longer distance around the boundary.',
        example: 'A semi-circle is an arc that is exactly half of the circle.',
        realWorld: 'A rainbow forms the shape of an arc.',
    },
    {
        name: 'Segment',
        icon: '🧀',
        color: '#6a1b9a',
        chart: SegmentSVG,
        def: 'The region bounded by a chord and an arc.\n\n• Minor Segment: The smaller area cut off by a chord.\n• Major Segment: The larger remaining area.',
        example: 'Cutting across a circular cake without going through the middle produces a minor and major segment.',
        realWorld: 'A crescent moon resembles a curved segment.',
    },
    {
        name: 'Sector',
        icon: '🍕',
        color: '#e65100',
        chart: SectorSVG,
        def: 'The region bounded by two radii and an arc.\n\n• Minor Sector: The smaller "slice".\n• Major Sector: The rest of the circle.',
        example: 'A $90^{\\circ}$ angle at the center creates a sector that is $1/4$ of the circle.',
        realWorld: 'A standard slice of pizza or pie is a sector.',
    }
];

// ─── KEY IDEAS DATA ──────────────────────────────────────────────────────────
const KEY_IDEAS = [
    {
        title: 'Angles & Chords',
        icon: '📐',
        color: '#0f766e',
        rules: [
            {
                title: 'Angle Subtended by a Chord',
                chart: SubtendedAngleSVG,
                f: '$\\text{Equal chords subtend equal angles at the center}$',
                d: 'When you draw lines from the ends of a chord to a specific point (like the center), the angle formed is the "subtended" angle.\nIf two chords are equal in length, they will subtend the exact same angle at the center of the circle.',
                tip: 'Always trace the lines back from the angle vertex to see which chord or arc created it.',
                ex: 'If chord $AB = 5\\text{ cm}$ and chord $CD = 5\\text{ cm}$, the angle they make at the center will be identical.'
            }
        ]
    },
    {
        title: 'Cyclic Quadrilaterals',
        icon: '🔳',
        color: '#b71c1c',
        rules: [
            {
                title: 'Opposite Angles Sum',
                chart: CyclicQuadSVG,
                f: '$\\angle A + \\angle C = 180^{\\circ}$',
                d: 'A cyclic quadrilateral is a 4-sided shape where all 4 corners touch the boundary of the same circle.\nThe sum of either pair of opposite angles is always $180^{\\circ}$.',
                tip: 'If it doesn\'t touch the boundary at all 4 points, it\'s NOT a cyclic quadrilateral!',
                ex: 'If the bottom-left angle is $60^{\\circ}$, the top-right opposite angle must be $120^{\\circ}$.'
            }
        ]
    }
];

// ─── QUIZ (Test Prep) ────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    {
        q: 'What is the longest chord of a circle?',
        opts: ['Radius', 'Diameter', 'Arc', 'Sector'],
        ans: 1,
        exp: 'The diameter is a chord that passes through the center, making it the longest possible chord.'
    },
    {
        q: 'The region bounded by two radii and an arc is called a...',
        opts: ['Sector', 'Segment', 'Chord', 'Semicircle'],
        ans: 0,
        exp: 'Like a slice of pizza, a region bounded by two radii and an arc is a Sector.'
    },
    {
        q: 'If the radius of a circle is $7\\text{ cm}$, what is its diameter?',
        opts: ['$3.5\\text{ cm}$', '$14\\text{ cm}$', '$21\\text{ cm}$', '$49\\text{ cm}$'],
        ans: 1,
        exp: 'The diameter is exactly twice the radius ($d = 2r = 2 \\times 7 = 14$).'
    },
    {
        q: 'What is the sum of opposite angles in a cyclic quadrilateral?',
        opts: ['$90^{\\circ}$', '$180^{\\circ}$', '$270^{\\circ}$', '$360^{\\circ}$'],
        ans: 1,
        exp: 'In a cyclic quadrilateral, the sum of either pair of opposite angles is ALWAYS $180^{\\circ}$.'
    },
    {
        q: 'A continuous piece of the circle\'s boundary is called an...',
        opts: ['Arc', 'Area', 'Angle', 'Axiom'],
        ans: 0,
        exp: 'An arc is a part of the circumference (the outer boundary) of a circle.'
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
                    {pct >= 75 ? 'Great understanding of Circles vocabulary!' : 'Review the terms and try again for a higher score.'}
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
export default function Circles9Terminology() {
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
        <div className={styles['page']}>
            {/* ── TOP NAV ─────────────────────────────────── */}
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/circles')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/circles/intro')}>🌟 Introduction</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/circles/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HEADER ──────────────────────────────────── */}
                <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                        Circles{' '}
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
                                {KEY_TERMS.map((t, i) => (
                                    <button key={i} onClick={() => setActiveTerm(i)}
                                        className={`${styles['sidebar-btn']} ${activeTerm === i ? styles['active'] : ''}`}
                                        style={{ '--skill-color': t.color }}>
                                        <div className={styles['sidebar-btn-icon']}>{t.icon}</div>
                                        <span className={styles['sidebar-btn-title']}>{t.name}</span>
                                    </button>
                                ))}
                            </aside>

                            <main key={activeTerm} className={`${styles['details-window']} ${styles['details-window-anim']}`} style={{ border: `2px solid ${KEY_TERMS[activeTerm].color}15` }}>
                                <div className={styles['learn-header-row']}>
                                    <div>
                                        <h3 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 900, color: KEY_TERMS[activeTerm].color }}>{KEY_TERMS[activeTerm].name}</h3>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>TERM {activeTerm + 1} OF {KEY_TERMS.length}</div>
                                    </div>
                                    <div style={{ fontSize: 36 }}>{KEY_TERMS[activeTerm].icon}</div>
                                </div>

                                <div style={{ background: `${KEY_TERMS[activeTerm].color}05`, padding: 24, borderRadius: 16, border: `2px solid ${KEY_TERMS[activeTerm].color}15`, marginBottom: 24 }}>
                                    <div style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: '#0f172a', whiteSpace: 'pre-line' }}>
                                        <LatexText text={KEY_TERMS[activeTerm].def} />
                                    </div>
                                </div>

                                {/* Animated Chart Illustration */}
                                {KEY_TERMS[activeTerm].chart && (
                                    <div style={{ marginBottom: 24, padding: 16, background: '#f8fafc', borderRadius: 16, display: 'flex', justifyContent: 'center' }}>
                                        {React.createElement(KEY_TERMS[activeTerm].chart)}
                                    </div>
                                )}

                                <div className={styles['rule-split']}>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Example</h4>
                                        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                            <div style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0f172a', whiteSpace: 'pre-line' }}>
                                                <LatexText text={KEY_TERMS[activeTerm].example} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: KEY_TERMS[activeTerm].color, marginBottom: 10 }}>Real World</h4>
                                        <div style={{ background: `${KEY_TERMS[activeTerm].color}05`, padding: 20, borderRadius: 16, border: `2px solid ${KEY_TERMS[activeTerm].color}15` }}>
                                            <div style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0f172a' }}>
                                                <LatexText text={KEY_TERMS[activeTerm].realWorld} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles['learn-footer']}>
                                    <button className={styles['btn-primary']} onClick={() => setTab('ideas')}>Ready for Key Ideas? →</button>
                                    <button className={styles['nav-back']} onClick={() => setActiveTerm((activeTerm + 1) % KEY_TERMS.length)}>
                                        Next: {KEY_TERMS[(activeTerm + 1) % KEY_TERMS.length].name}
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
