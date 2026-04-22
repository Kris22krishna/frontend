import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../surface_areas_and_volumes_9.module.css';
import { LatexText } from '../../../../../LatexText';

const TERMS = [
    {
        name: 'Parts of a Cone',
        icon: '📐',
        def: `A right circular cone is defined by three main measurements:
        
$r$ = Radius of the circular base.
$h$ = Vertical Height (from vertex to base center at $90^\\circ$).
$l$ = Slant Height (distance along the slanted surface).

Because they form a right triangle, they always obey Pythagoras:
$l^2 = r^2 + h^2$`,
        color: '#0f4c81',
        chart: () => (
            <svg viewBox="0 0 100 120" width="100%" height="240" style={{ maxWidth: 220, display: 'block', margin: '0 auto' }}>
                <path d="M 20 90 L 80 90 L 50 15 Z" fill="rgba(0,0,0,0.05)" stroke="#0f4c81" strokeWidth="2" />
                <path d="M 50 15 L 50 90" stroke="#b71c1c" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 50 90 L 80 90" stroke="#059669" strokeWidth="2" />
                <text x="55" y="60" fontSize="11" fill="#b71c1c" fontWeight="bold">h</text>
                <text x="65" y="105" fontSize="11" fill="#059669" fontWeight="bold">r</text>
                <text x="25" y="55" fontSize="11" fill="#0f4c81" fontWeight="bold">l</text>
                <rect x="50" y="85" width="5" height="5" fill="none" stroke="#b71c1c" />
            </svg>
        ),
        example: 'If $r = 6$ and $h = 8$, the slant height is $l = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.',
        realWorld: 'An ice cream cone has a height and radius, but the slanted side is what you actually hold.'
    },
    {
        name: 'Sphere',
        icon: '🌍',
        def: `A sphere is defined purely by its radius ($r$). It has no edges or vertices, and consists of just one continuous, completely curved curved surface. The distance from the center to any point on the surface is always exactly $r$.`,
        color: '#059669',
        chart: () => (
            <svg viewBox="0 0 100 120" width="100%" height="240" style={{ maxWidth: 220, display: 'block', margin: '0 auto' }}>
                <circle cx="50" cy="60" r="40" fill="#05966915" stroke="#059669" strokeWidth="2" />
                <ellipse cx="50" cy="60" rx="40" ry="12" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 50 60 L 90 60" stroke="#059669" strokeWidth="2" />
                <circle cx="50" cy="60" r="2" fill="#059669" />
                <text x="65" y="55" fontSize="11" fill="#059669" fontWeight="bold">r</text>
            </svg>
        ),
        example: 'A perfect marble with a radius of $2$ cm has points on its surface that are all exactly $2$ cm from the center.',
        realWorld: 'Planets, bubbles, and basketballs are all common spherical objects.'
    },
    {
        name: 'Hemisphere',
        icon: '🥣',
        def: `When you slice a solid sphere perfectly in half, you get a hemisphere. 
Unlike a sphere, a hemisphere has TWO faces:
1. The curved bowl-shaped face.
2. The flat circular base.`,
        color: '#b71c1c',
        chart: () => (
            <svg viewBox="0 0 100 120" width="100%" height="240" style={{ maxWidth: 220, display: 'block', margin: '0 auto' }}>
                <path d="M 10 70 A 40 40 0 0 0 90 70 Z" fill="#b71c1c15" stroke="#b71c1c" strokeWidth="2" />
                <ellipse cx="50" cy="70" rx="40" ry="12" fill="#b71c1c25" stroke="#b71c1c" strokeWidth="2" />
                <path d="M 50 70 L 90 70" stroke="#b71c1c" strokeWidth="2" />
                <circle cx="50" cy="70" r="2" fill="#b71c1c" />
                <text x="65" y="65" fontSize="11" fill="#b71c1c" fontWeight="bold">r</text>
            </svg>
        ),
        example: 'If a sphere has radius $10$, the hemisphere cut from it also has radius $10$, and a flat roof of radius $10$.',
        realWorld: 'A soup bowl or the architectural dome of a mosque are hemispheres.'
    }
];

const KEY_IDEAS = [
    {
        title: 'Cone Formulas',
        icon: '🍦',
        color: '#0f4c81',
        rules: [
            {
                title: 'Surface Areas',
                f: '$\\text{CSA} = \\pi r l$  &  $\\text{TSA} = \\pi r (l + r)$',
                chart: () => (
                    <svg viewBox="0 0 120 120" width="100%" height="200" style={{ maxWidth: 240, margin: '0 auto', display: 'block' }}>
                        <path d="M 40 100 L 100 100 L 70 30 Z" fill="#0f4c81" fillOpacity="0.1" stroke="#0f4c81" strokeWidth="2" />
                        <ellipse cx="70" cy="100" rx="30" ry="10" fill="#059669" fillOpacity="0.2" stroke="#059669" strokeWidth="2" />
                        <text x="70" y="80" fontSize="10" fill="#0f4c81" textAnchor="middle">Curved = πrl</text>
                        <text x="70" y="115" fontSize="10" fill="#059669" textAnchor="middle">Base = πr²</text>
                    </svg>
                ),
                d: 'The Curved Surface Area (CSA) measures only the slanted, wrapped part of the cone. The Total Surface Area (TSA) measures the slanted curved part PLUS the flat circular base at the bottom.',
                tip: 'Never use the vertical height ($h$) for finding surface areas. Only use the slant height ($l$).',
                ex: 'Given $r = 7$, $l = 10$:\n$\\text{CSA} = \\frac{22}{7} \\times 7 \\times 10 = 220$.\n$\\text{TSA} = \\frac{22}{7} \\times 7(10+7) = 374$.'
            },
            {
                title: 'Volume',
                f: '$\\text{Volume} = \\frac{1}{3}\\pi r^2 h$',
                chart: () => (
                    <svg viewBox="0 0 120 120" width="100%" height="200" style={{ maxWidth: 240, margin: '0 auto', display: 'block' }}>
                        <path d="M 30 100 L 30 40 A 30 10 0 0 1 90 40 L 90 100 A 30 10 0 0 1 30 100 Z" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="2 2" />
                        <path d="M 30 100 L 90 100 L 60 40 Z" fill="#0f4c81" fillOpacity="0.2" stroke="#0f4c81" strokeWidth="2" />
                        <text x="60" y="80" fontSize="10" fill="#0f4c81" textAnchor="middle" fontWeight="bold">1/3 of Cylinder</text>
                    </svg>
                ),
                d: 'If you have a cylinder and a cone with the exact same base radius $r$ and exact same height $h$, it takes exactly 3 cones full of water to fill the cylinder completely.',
                tip: 'Notice that volume requires the strictly vertical height ($h$), NOT the slant height ($l$).',
                ex: 'Given $r = 7$, $h = 10$:\nVol = $\\frac{1}{3} \\times \\frac{22}{7} \\times 49 \\times 10 = \\frac{1540}{3}$.'
            }
        ]
    },
    {
        title: 'Sphere & Hemi',
        icon: '🌍',
        color: '#b71c1c',
        rules: [
            {
                title: 'Sphere Area & Volume',
                f: '$\\text{SA} = 4\\pi r^2$  &  $\\text{Vol} = \\frac{4}{3}\\pi r^3$',
                chart: () => (
                    <svg viewBox="0 0 120 120" width="100%" height="200" style={{ maxWidth: 240, margin: '0 auto', display: 'block' }}>
                        <circle cx="60" cy="60" r="30" fill="#b71c1c" fillOpacity="0.1" stroke="#b71c1c" strokeWidth="2" />
                        <text x="60" y="65" fontSize="12" fill="#b71c1c" textAnchor="middle">SA = 4πr²</text>
                    </svg>
                ),
                d: 'The surface of one sphere is exactly equal to the area of four distinct circles of the same radius! Its volume is $\\frac{4}{3}\\pi r^3$.',
                tip: 'A sphere has no separate "Curved" distinct from "Total" surface area since the entire shape is one continuous curve.',
                ex: 'For a sphere with $r = 7$: SA = $4 \\times \\frac{22}{7} \\times 49 = 616$.\nVol = $\\frac{4}{3} \\times \\frac{22}{7} \\times 343 \\approx 1437.3$.'
            },
            {
                title: 'Hemisphere Formulas',
                f: '$\\text{CSA} = 2\\pi r^2$ | $\\text{TSA} = 3\\pi r^2$ | $\\text{Vol} = \\frac{2}{3}\\pi r^3$',
                chart: () => (
                    <svg viewBox="0 0 120 120" width="100%" height="200" style={{ maxWidth: 240, margin: '0 auto', display: 'block' }}>
                        <path d="M 20 80 A 40 40 0 0 0 100 80 Z" fill="#b71c1c" fillOpacity="0.15" stroke="#b71c1c" strokeWidth="2" />
                        <ellipse cx="60" cy="80" rx="40" ry="12" fill="#b71c1c" fillOpacity="0.25" stroke="#b71c1c" strokeWidth="2" />
                    </svg>
                ),
                d: 'A hemisphere has a curved bowl part ($2\\pi r^2$) and a flat lid part ($\\pi r^2$). Since it is exactly half of a sphere, its volume is halved.',
                tip: 'Always read carefully to see if the hemisphere is "solid" (needs TSA) or "open" at the top (needs CSA).',
                ex: 'Given a bowl of $r=7$:\nCSA = $2 \\times \\frac{22}{7} \\times 49 = 308$.\nTSA = $3 \\times \\frac{22}{7} \\times 49 = 462$.'
            }
        ]
    }
];

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    {
        q: 'What is the relationship between the slant height ($l$), vertical height ($h$), and radius ($r$) of a cone?',
        opts: ['$l = r + h$', '$l^2 = r^2 + h^2$', '$l = \\pi r^2 h$', '$l^2 = r^2 - h^2$'],
        ans: 1,
        exp: 'The radius, height, and slant height form a right-angled triangle, obeying Pythagoras theorem.'
    },
    {
        q: 'What is the formula for the Surface Area of a Sphere?',
        opts: ['$4\\pi r^2$', '$\\frac{4}{3}\\pi r^3$', '$2\\pi r^2$', '$\\pi r^2$'],
        ans: 0,
        exp: 'The surface area of a sphere is equal to the area of four circles with the same radius: $4\\pi r^2$.'
    },
    {
        q: 'What is the Total Surface Area (TSA) of a Hemisphere?',
        opts: ['$2\\pi r^2$', '$3\\pi r^2$', '$4\\pi r^2$', '$\\frac{2}{3}\\pi r^3$'],
        ans: 1,
        exp: 'A hemisphere has a curved surface ($2\\pi r^2$) and a flat circular base ($\\pi r^2$), making the total $3\\pi r^2$.'
    },
    {
        q: 'How many cones of volume $\\frac{1}{3}\\pi r^2 h$ fill a cylinder of volume $\\pi r^2 h$?',
        opts: ['1', '2', '3', '4'],
        ans: 2,
        exp: 'Since the ratio is $\\frac{1}{3}$, it takes exactly 3 cones to fill the cylinder completely.'
    },
    {
        q: 'Which of the following describes the curved surface area of a cone?',
        opts: ['$\\pi r h$', '$\\pi r^2 l$', '$\\pi r l$', '$2\\pi r h$'],
        ans: 2,
        exp: 'The Curved Surface Area of a cone is $\\pi r l$, where $l$ is the slant height.'
    }
];

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
        if (current + 1 >= QUIZ_QUESTIONS.length) { setFinished(true); } 
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
                    {pct >= 75 ? 'Great understanding of Surface Areas vocabulary!' : 'Review the formulas and try again for a higher score.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className={styles['btn-primary']} onClick={() => { quizAnswersRef.current = []; setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}>
                        Try Again
                    </button>
                    <button className={styles['nav-back']} onClick={onBack}>Return to Terms</button>
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
                    <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: `${color}08`, border: `1px solid ${color}15`, fontSize: 14, lineHeight: 1.6, color: '#334155' }}>
                        <span style={{ fontWeight: 800, color, display: 'block', marginBottom: 4 }}>💡 Explanation:</span>
                        <LatexText text={q.exp} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
                <button onClick={handleNext} disabled={!answered} className={styles['btn-primary']}
                    style={{ padding: '14px 40px', opacity: answered ? 1 : 0.4, minWidth: 200, fontSize: 15, cursor: answered ? 'pointer' : 'not-allowed' }}>
                    {current + 1 >= QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function SurfaceAreasAndVolumes9Terminology() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('terms');
    const [activeTerm, setActiveTerm] = useState(0);
    const [activeIdea, setActiveIdea] = useState(0);
    const [activeRule, setActiveRule] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const TABS = [
        { id: 'terms', label: 'Key Terms', icon: '📚' },
        { id: 'ideas', label: 'Formulas', icon: '💡' },
        { id: 'quiz', label: 'Knowledge Check', icon: '✅' },
    ];

    return (
        <div className={styles['page']} style={{ display: 'flex', flexDirection: 'column' }}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 80, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/intro')}>🌟 Introduction</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 24px' }}>
                    {/* ── HEADER ──────────────────────────────────── */}
                    <div style={{ textAlign: 'center', marginBottom: 28 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                            Surface Areas & Volumes{' '}
                            <span style={{ background: 'linear-gradient(90deg,#0f4c81,#6a1b9a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Vocabulary</span>
                        </h1>
                    </div>

                    {/* ── TABS ────────────────────────────────────── */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
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
                                <aside className={styles['learn-sidebar']} style={{ alignSelf: 'start', position: 'sticky', top: 160 }}>
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
                                        <button className={styles['btn-primary']} onClick={() => setTab('ideas')}>Ready for Formulas? →</button>
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
                                <aside className={styles['learn-sidebar']} style={{ alignSelf: 'start', position: 'sticky', top: 160 }}>
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
        </div>
    );
}
