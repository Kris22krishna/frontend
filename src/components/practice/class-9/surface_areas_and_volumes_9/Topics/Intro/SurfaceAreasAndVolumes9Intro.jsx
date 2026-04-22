import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../surface_areas_and_volumes_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { IntroHeroSVG } from '../components/SAVDynamicCharts';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What are Surface Areas and Volumes?',
        icon: '🧊',
        color: '#0f4c81',
        short: 'The study of measuring the outside skin and inside space of 3D objects.',
        svg: (
            <svg viewBox="0 0 200 100" style={{ width: '100%', maxWidth: 220, height: 'auto' }}>
                <path d="M 20 70 L 80 70 L 50 15 Z" fill="rgba(15,76,129,0.08)" stroke="#0f4c81" strokeWidth="1.5" />
                <ellipse cx="50" cy="70" rx="30" ry="8" fill="none" stroke="#0f4c81" strokeWidth="1" />
                <circle cx="140" cy="45" r="30" fill="rgba(5,150,105,0.06)" stroke="#059669" strokeWidth="1.5" />
                <text x="50" y="90" fontSize="9" fill="#64748b" textAnchor="middle">Cone</text>
                <text x="140" y="85" fontSize="9" fill="#64748b" textAnchor="middle">Sphere</text>
            </svg>
        ),
        bullets: [
            'SURFACE AREA measures the total outer boundary of a 3D solid — like how much wrapping paper you need.',
            'VOLUME measures the total inner space — like how much water a container can hold.',
            'In this chapter, we focus on three key shapes: Cones, Spheres, and Hemispheres.',
            'These formulas are essential building blocks for engineering, physics, and architecture.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Developed These Formulas?',
        icon: '👨‍🔬',
        color: '#1a237e',
        short: 'Ancient Greek mathematicians like Archimedes laid the groundwork.',
        svg: (
            <svg viewBox="0 0 200 80" style={{ width: '100%', maxWidth: 220, height: 'auto' }}>
                <circle cx="40" cy="40" r="28" fill="rgba(26,35,126,0.06)" stroke="#1a237e" strokeWidth="1.5" />
                <ellipse cx="40" cy="40" rx="28" ry="8" fill="none" stroke="#1a237e" strokeWidth="1" strokeDasharray="3 2" />
                <rect x="85" y="12" width="30" height="56" rx="2" fill="rgba(26,35,126,0.04)" stroke="#1a237e" strokeWidth="1.5" />
                <ellipse cx="100" cy="12" rx="15" ry="4" fill="none" stroke="#1a237e" strokeWidth="1" />
                <ellipse cx="100" cy="68" rx="15" ry="4" fill="none" stroke="#1a237e" strokeWidth="1" />
                <text x="140" y="30" fontSize="8" fill="#1a237e" fontWeight="bold">Sphere</text>
                <text x="140" y="50" fontSize="8" fill="#64748b">fits inside</text>
                <text x="140" y="62" fontSize="8" fill="#1a237e" fontWeight="bold">Cylinder</text>
            </svg>
        ),
        bullets: [
            '🏛️ Archimedes of Syracuse (c. 287–212 BC) discovered the formulas for the surface area and volume of a sphere.',
            'He proved that the volume of a sphere is exactly $\\frac{2}{3}$ of the volume of its enclosing cylinder.',
            '📜 He was so proud of this discovery that it was engraved on his tombstone!',
            'The cone volume formula ($\\frac{1}{3}$ of a cylinder) was also known to ancient Greek geometers.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        short: 'In ice cream cones, sports balls, domes, tanks, and planets!',
        svg: (
            <svg viewBox="0 0 220 70" style={{ width: '100%', maxWidth: 240, height: 'auto' }}>
                <path d="M 15 50 L 45 50 L 30 10 Z" fill="rgba(183,28,28,0.08)" stroke="#b71c1c" strokeWidth="1.5" />
                <text x="30" y="65" fontSize="7" fill="#64748b" textAnchor="middle">🍦 Cone</text>
                <circle cx="90" cy="30" r="22" fill="rgba(5,150,105,0.06)" stroke="#059669" strokeWidth="1.5" />
                <text x="90" y="62" fontSize="7" fill="#64748b" textAnchor="middle">⚽ Ball</text>
                <path d="M 135 50 A 30 30 0 0 1 195 50" fill="rgba(106,27,154,0.06)" stroke="#6a1b9a" strokeWidth="1.5" />
                <ellipse cx="165" cy="50" rx="30" ry="6" fill="none" stroke="#6a1b9a" strokeWidth="1" />
                <text x="165" y="65" fontSize="7" fill="#64748b" textAnchor="middle">🏛️ Dome</text>
            </svg>
        ),
        bullets: [
            '🍦 Ice Cream Cones — A classic example of a right circular cone. Its volume tells you how much ice cream fits inside.',
            '⚽ Sports — Footballs, basketballs, and cricket balls are all spheres. Their surface area tells you how much leather is needed.',
            '🏛️ Architecture — The domes of famous buildings (like the Taj Mahal) are hemispheres. Painters need the CSA to estimate paint.',
            '🌎 Astronomy — Planets are spheres. NASA uses these formulas to calculate atmospheres and gravitational fields.',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Do We Use Each Formula?',
        icon: '⏳',
        color: '#6a1b9a',
        short: 'It depends on whether you need the outer skin or the inner space.',
        svg: (
            <svg viewBox="0 0 200 80" style={{ width: '100%', maxWidth: 220, height: 'auto' }}>
                <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(106,27,154,0.06)" stroke="#6a1b9a" strokeWidth="1" />
                <text x="50" y="35" fontSize="9" fill="#6a1b9a" textAnchor="middle" fontWeight="bold">🎨 Surface</text>
                <text x="50" y="50" fontSize="8" fill="#64748b" textAnchor="middle">Paint, Wrap</text>
                <text x="50" y="62" fontSize="8" fill="#64748b" textAnchor="middle">Cover, Coat</text>
                <rect x="110" y="10" width="80" height="60" rx="8" fill="rgba(5,150,105,0.06)" stroke="#059669" strokeWidth="1" />
                <text x="150" y="35" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">🥛 Volume</text>
                <text x="150" y="50" fontSize="8" fill="#64748b" textAnchor="middle">Fill, Pour</text>
                <text x="150" y="62" fontSize="8" fill="#64748b" textAnchor="middle">Store, Hold</text>
            </svg>
        ),
        bullets: [
            '🎨 Use SURFACE AREA when: painting, wrapping, coating, or covering the outside of an object.',
            '🥛 Use VOLUME when: filling, pouring, storing, or measuring the capacity of a container.',
            '⛺ Use CURVED Surface Area (CSA) when: only the curved part matters (like a tent without a floor).',
            '📦 Use TOTAL Surface Area (TSA) when: the entire object is being covered, including the base.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Not Just Measure Directly?',
        icon: '💡',
        color: '#e65100',
        short: 'Because formulas give us exact answers without needing to physically wrap or fill the object.',
        svg: (
            <svg viewBox="0 0 200 80" style={{ width: '100%', maxWidth: 220, height: 'auto' }}>
                <circle cx="50" cy="40" r="28" fill="rgba(230,81,0,0.06)" stroke="#e65100" strokeWidth="1.5" />
                <text x="50" y="44" fontSize="10" fill="#e65100" textAnchor="middle" fontWeight="bold">4πr²</text>
                <text x="120" y="20" fontSize="9" fill="#64748b">No wrapping</text>
                <text x="120" y="35" fontSize="9" fill="#64748b">needed! Just</text>
                <text x="120" y="50" fontSize="9" fill="#e65100" fontWeight="bold">one formula</text>
                <text x="120" y="65" fontSize="9" fill="#64748b">gives exact area</text>
            </svg>
        ),
        bullets: [
            '📏 Imagine trying to measure the surface area of a basketball by wrapping it in paper — nearly impossible to do accurately!',
            '🧮 The formula $4\\pi r^2$ gives you the exact answer with just the radius.',
            'For volume, you cannot pour water into a planet! But $\\frac{4}{3}\\pi r^3$ gives you the answer instantly.',
            'Formulas let engineers design objects on paper (or screen) before they are ever built.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Solve These Problems?',
        icon: '✏️',
        color: '#0f766e',
        short: 'By identifying the shape, picking the right formula, and substituting the given values.',
        svg: (
            <svg viewBox="0 0 220 75" style={{ width: '100%', maxWidth: 240, height: 'auto' }}>
                {[{ x: 15, label: '1. Shape', icon: '🔍' }, { x: 75, label: '2. Formula', icon: '📐' }, { x: 135, label: '3. Solve', icon: '🧮' }].map((s, i) => (
                    <g key={i}>
                        <rect x={s.x} y="10" width="50" height="40" rx="8" fill="rgba(15,118,110,0.06)" stroke="#0f766e" strokeWidth="1" />
                        <text x={s.x + 25} y="32" fontSize="14" textAnchor="middle">{s.icon}</text>
                        <text x={s.x + 25} y="62" fontSize="8" fill="#0f766e" textAnchor="middle" fontWeight="bold">{s.label}</text>
                        {i < 2 && <text x={s.x + 58} y="34" fontSize="12" fill="#94a3b8">→</text>}
                    </g>
                ))}
                <text x="200" y="32" fontSize="16">✓</text>
            </svg>
        ),
        bullets: [
            '1️⃣ Identify the shape — Is it a Cone, Sphere, or Hemisphere?',
            '2️⃣ Determine the task — Is the problem asking for Surface Area (painting/covering) or Volume (filling/capacity)?',
            '3️⃣ Pick the formula — e.g., Cone CSA = $\\pi r l$, Sphere Volume = $\\frac{4}{3}\\pi r^3$.',
            '4️⃣ Substitute & Calculate — Plug in $r$, $h$, or $l$ and use $\\pi = \\frac{22}{7}$ unless told otherwise.',
        ],
    },
];

export default function SurfaceAreasAndVolumes9Intro() {
    const navigate = useNavigate();
    const [openCard, setOpenCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggle = (idx) => setOpenCard((prev) => (prev === idx ? null : idx));

    return (
        <div className={styles['page']} style={window.innerWidth > 900 ? { height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { display: 'flex', flexDirection: 'column' }}>
            {/* ── TOP NAV ──────────────────────────────────── */}
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                        <IntroHeroSVG />
                    </div>
                    <h1 className={styles['module-title']}>
                        Discover Surface Areas & Volumes Through{' '}
                        <span className={styles['accent-text']}>6 Big Questions</span>
                    </h1>
                    <p className={styles['module-subtitle']}>
                        Tap each card to explore ✨
                    </p>
                </div>

                {/* ── ACCORDION CARDS ──────────────────────────── */}
                <div className={styles['section']}>
                    <div className={styles['fivew1h-grid']}>
                        {CARDS.map((card, idx) => {
                            const isOpen = openCard === idx;
                            return (
                                <div
                                    key={card.q}
                                    className={styles['fivew1h-card']}
                                    style={{
                                        borderColor: isOpen ? card.color : undefined,
                                        animation: `fadeSlideIn 0.4s ease ${idx * 0.1}s both`,
                                    }}
                                >
                                    {/* Header */}
                                    <div
                                        className={styles['fivew1h-header']}
                                        onClick={() => toggle(idx)}
                                        style={{ background: isOpen ? `${card.color}10` : undefined }}
                                    >
                                        <div className={styles['fivew1h-icon']} style={{ background: `${card.color}15` }}>
                                            {card.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div className={styles['fivew1h-label']} style={{ color: card.color }}>{card.q}</div>
                                            <div className={styles['fivew1h-q']}>{card.label}</div>
                                            {!isOpen && (
                                                <p style={{ margin: '5px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                                                    {card.short}
                                                </p>
                                            )}
                                        </div>
                                        <div
                                            className={`${styles['fivew1h-chevron']} ${isOpen ? styles['fivew1h-chevron--open'] : ''}`}
                                            style={{ color: card.color }}
                                        >⌄</div>
                                    </div>

                                    {/* Expandable body */}
                                    {isOpen && (
                                        <div className={styles['fivew1h-body']}>
                                            {card.svg && (
                                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                                                    {card.svg}
                                                </div>
                                            )}
                                            <ul className={styles['fivew1h-list']}>
                                                {card.bullets.map((b, bi) => (
                                                    <li key={bi} className={styles['fivew1h-item']}>
                                                        <LatexText text={b} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div style={{ textAlign: 'center', margin: '40px 0' }}>
                        <p style={{ fontSize: 16, color: '#475569', marginBottom: 16, fontWeight: 600 }}>
                            Ready to master the vocabulary? 📖
                        </p>
                        <button
                            className={styles['btn-primary']}
                            style={{ padding: '14px 32px', fontSize: 16 }}
                            onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
