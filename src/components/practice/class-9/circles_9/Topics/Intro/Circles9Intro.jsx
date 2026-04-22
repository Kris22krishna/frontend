import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../circles_9.module.css';
import { LatexText } from '../../../../../LatexText';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What are Circles?',
        icon: '⭕',
        color: '#0f4c81',
        short: 'The collection of all points in a plane, which are equidistant from a fixed point.',
        bullets: [
            'A CIRCLE is a perfect 2D shape where every point on the boundary is perfectly equidistant from the center.',
            'That fixed distance is called the Radius, and the center is the heart of the circle.',
            'Instead of edges and corners, circles have continuous curves called arcs.',
            'The study of circles bridges the gap between straight classical geometry and the mathematics of curves.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Studied Circles?',
        icon: '👨‍🎨',
        color: '#1a237e',
        short: 'Ancient mathematicians revered the circle as the most perfect shape.',
        bullets: [
            '🏛️ Pythagoras and his followers believed circles were divine shapes exhibiting absolute perfection.',
            '📜 Euclid (c. 300 BC) dedicated Book III of his "Elements" entirely to the properties of circles.',
            'Archimedes famously approximated the value of $\\pi$ (Pi) by calculating the perimeters of polygons inscribed in circles.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        short: 'In planetary orbits, architecture, wheels, and technology.',
        bullets: [
            '⚙️ Mechanical Engineering — Gears, wheels, and engines rely on perfect circular motion.',
            '🔭 Astronomy — While orbits are elliptical, understanding the mechanics starts with perfect circles.',
            '🏛️ Architecture — Domes, arches, and coliseums are built using the structural strength of circular geometry.',
            '📡 Data & Signals — Wi-Fi, radio waves, and ripples in water expand smoothly in circular patterns.',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Do We Use This Logic?',
        icon: '⏳',
        color: '#6a1b9a',
        short: 'Whenever we need to find missing angles or distances inside curved boundaries.',
        bullets: [
            '📐 In design — Finding the center of an existing arch or plate using chords and perpendicular bisectors.',
            'When proving cyclic quadrilaterals — Ensuring four points can lie perfectly on the same circular path.',
            'When calculating areas of sectors (pizza slices!) or the length of an arc.',
            'When studying higher math — Circles are the foundation of Trigonometry (the Unit Circle).',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Prove It? Can\'t We Just Measure?',
        icon: '💡',
        color: '#e65100',
        short: 'Because drawings can be misleading, but logical deduction is absolute.',
        bullets: [
            '📏 Measurement is imperfect — A protractor has a margin of error. A compass line has thickness.',
            '🧠 Proofs are permanent — Once you algebraically prove an angle in a semicircle is exactly $90^{\\circ}$, it is true eternally.',
            'Using basic axioms, we build airtight arguments to guarantee properties that are impossible to measure by hand perfectly.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Find Unknown Angles?',
        icon: '✏️',
        color: '#0f766e',
        short: 'By using powerful theorems like the "Angle at Centre" theorem.',
        bullets: [
            '1️⃣ Spot the Arc — Look at the boundary arc; what angles does it create?',
            '2️⃣ Use the Centre Property — The angle subtended at the centre is ALWAYS double the angle at the rim.',
            '3️⃣ Find Cyclic Quadrilaterals — Four points on a circle? Opposite angles sum to exactly $180^{\\circ}$.',
            '4️⃣ Follow the Chords — Equal chords map equal angles at the centre. It\'s pure symmetry!',
        ],
    },
];

export default function Circles9Intro() {
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/circles')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/circles/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/circles/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Discover Circles Through{' '}
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
                            onClick={() => navigate('/practice/class-9/circles/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
