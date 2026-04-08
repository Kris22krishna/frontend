import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../lines_and_angles_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { AngleTypesChart, LinearPairChart, VOAChart, ParallelLinesChart } from '../components/LADynamicCharts';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What are Lines and Angles?',
        icon: '📐',
        color: '#0f4c81',
        chart: AngleTypesChart,
        short: 'The study of the relationships formed when lines meet or cross.',
        bullets: [
            'LINES AND ANGLES is the fundamental study of 1D shapes (lines) mixing to form 2D properties (angles).',
            'Whenever two lines intersect or a ray stands on a line, angles are born.',
            'We categorize angles by their rotation: Acute, Right, Obtuse, Straight, and Reflex.',
            'These base relationships are the very building blocks for all complex geometry like polygons, circles, and 3D shapes.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Invented Deductive Geometry?',
        icon: '👨‍🎨',
        color: '#1a237e',
        short: 'Ancient Greek mathematicians like Thales and Euclid formalized the rules.',
        bullets: [
            '🏛️ Thales of Miletus (c. 624–546 BC) is credited with the first known mathematical proof.',
            'He famously proved that when two lines intersect, the vertically opposite angles are perfectly equal!',
            '📜 Euclid (c. 300 BC) later gathered all known geometric knowledge into his legendary book, "Elements".',
            'Euclid laid down simple rules (axioms) and built a system to logically prove new facts (theorems) from them.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        chart: ParallelLinesChart,
        short: 'In architecture, engineering, physics, and even sunlight.',
        bullets: [
            '🏗️ Architecture & Engineering — Buildings rely on parallel columns and precise angles for support and stability.',
            '🌞 Physics & Optics — The reflection and refraction of light depend heavily on measuring angles of incidence and reflection.',
            '🛤️ Transportation — Railway tracks are the perfect real-world example of parallel lines intersected by transversals.',
            '✂️ Everyday objects — Look at a pair of scissors; the blades form vertically opposite angles as they open and close.',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Do We Use This Logic?',
        icon: '⏳',
        color: '#6a1b9a',
        short: 'You act as a detective whenever you need to find an unknown measurement.',
        bullets: [
            '🕵️ Think like a detective: "If angle $A = 60^{\\circ}$, what MUST angle $B$ be?"',
            'When verifying parallelism — You can prove two lines will NEVER cross by checking their alternate interior angles.',
            'When creating computer graphics — 3D software calculates angles between polygons to correctly bounce light off virtual surfaces.',
            'When studying higher math — You cannot grasp Trigonometry or Calculus without first understanding basic angle logic.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Prove It? Can\'t We Just Measure?',
        icon: '💡',
        color: '#e65100',
        chart: LinearPairChart,
        short: 'Because drawings can be misleading, but logic is absolute.',
        bullets: [
            '📏 Measurement is imperfect — A protractor has a margin of error. A pencil line has thickness.',
            '🧠 Proofs are permanent — Once you algebraically prove an angle sum is exactly $180^{\\circ}$, it is true for the rest of eternity.',
            'In deductive reasoning, we start with simple undeniable facts (Axioms).',
            'Using these facts, we build an airtight logical argument to guarantee an unknown property (Theorem).',
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Find Unknown Angles?',
        icon: '✏️',
        color: '#0f766e',
        chart: VOAChart,
        short: 'By spotting pairs: Linear Pairs, Vertically Opposite Angles, and Transversals.',
        bullets: [
            '1️⃣ Find Linear Pairs — If two angles sit side-by-side on a straight line, they sum to $180^{\\circ}$.',
            '2️⃣ Spot the "X" — When two lines cross, the angles opposite to each other are identical.',
            '3️⃣ Connect parallels — A transversal line cutting through parallel tracks makes a perfect array of matching angles (like Alternate and Corresponding).',
            '4️⃣ Substitute & Solve — Use algebra ($x + y = 180$) to track down the missing culprits!',
        ],
    },
];

export default function LinesAndAngles9Intro() {
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/lines-and-angles')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/lines-and-angles/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/lines-and-angles/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Discover Lines and Angles Through{' '}
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
                                            <ul className={styles['fivew1h-list']}>
                                                {card.bullets.map((b, bi) => (
                                                    <li key={bi} className={styles['fivew1h-item']}>
                                                        <LatexText text={b} />
                                                    </li>
                                                ))}
                                            </ul>
                                            {/* Animated chart illustration */}
                                            {card.chart && (
                                                <div style={{ marginTop: 16, padding: 12, background: '#f8fafc', borderRadius: 14, display: 'flex', justifyContent: 'center' }}>
                                                    {React.createElement(card.chart)}
                                                </div>
                                            )}
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
                            onClick={() => navigate('/practice/class-9/lines-and-angles/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
