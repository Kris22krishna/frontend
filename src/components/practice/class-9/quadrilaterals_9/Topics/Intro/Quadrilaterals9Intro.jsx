import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../quadrilaterals_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { QuadrilateralChart, ParallelogramChart, MidPointTheoremChart } from '../components/QuadrilateralsDynamicCharts';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is a Quadrilateral?',
        icon: '📐',
        color: '#0f4c81',
        chart: QuadrilateralChart,
        short: 'A 2D shape bounded by 4 lines.',
        bullets: [
            'A QUADRILATERAL is a closed figure obtained by joining four points (in order) in a plane.',
            'It has 4 sides, 4 angles, and 4 vertices.',
            'By drawing a diagonal, a quadrilateral is divided into two triangles. Therefore, the angle sum is always $360^{\\circ}$ (since $180^{\\circ} + 180^{\\circ} = 360^{\\circ}$).',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Studies Such Shapes?',
        icon: '👨‍🎨',
        color: '#1a237e',
        short: 'Mathematicians building on Euclidean geometry.',
        bullets: [
            '📜 The properties were formally written down in Euclid\'s "Elements".',
            'Mathematicians study quadrilaterals by breaking them down into simpler structures—triangles.',
            'Using the congruence rules of triangles (SAS, ASA, SSS) we can prove everything about parallelograms.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        chart: ParallelogramChart,
        short: 'In everyday life, from books to building designs.',
        bullets: [
            '🏢 Real Estate — A standard room plan or plot of land is usually a rectangle or at least a quadrilateral.',
            '📚 Everyday Objects — Books, screens, doors, and boards are rectangular.',
            '💠 Structure — The symmetry of parallelograms and rectangles makes them perfect for tiling floors without gaps.',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Does It Shift Forms?',
        icon: '⏳',
        color: '#6a1b9a',
        short: 'When specific angles or sides are constrained.',
        bullets: [
            'A quadrilateral becomes a **Parallelogram** when both pairs of opposite sides are parallel.',
            'A parallelogram becomes a **Rectangle** when one of its angles is $90^{\\circ}$.',
            'A parallelogram becomes a **Rhombus** when all sides are made equal.',
            'A rectangle (or rhombus) becomes a **Square** when all sides are equal *and* all angles are $90^{\\circ}$.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Does Mid-point Theorem Matter?',
        icon: '💡',
        color: '#e65100',
        chart: MidPointTheoremChart,
        short: 'It creates quadrilaterals inside triangles.',
        bullets: [
            'The Mid-point Theorem shows that connecting the mid-points of two sides of a triangle creates a line parallel to the third side.',
            'This beautifully links the 3-sided triangle world back to the 4-sided world by creating parallelograms in proofs.',
            'It is essential for dividing lines equally and scaling objects.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Prove Properties?',
        icon: '✏️',
        color: '#0f766e',
        short: 'By drawing a diagonal and using Triangle CPCT.',
        bullets: [
            '1️⃣ Draw a diagonal in a parallelogram.',
            '2️⃣ Notice it creates two triangles.',
            '3️⃣ Prove the two triangles are congruent using parallel line properties (like alternate interior angles).',
            '4️⃣ Conclude that opposite sides are equal, or opposite angles are equal using CPCT (Corresponding Parts of Congruent Triangles)!',
        ],
    },
];

export default function Quadrilaterals9Intro() {
    const navigate = useNavigate();
    const [openCard, setOpenCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggle = (idx) => setOpenCard((prev) => (prev === idx ? null : idx));

    return (
        <div className={styles['page']} style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            {/* ── TOP NAV ──────────────────────────────────── */}
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/quadrilaterals')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/quadrilaterals/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/quadrilaterals/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, paddingBottom: '40px' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Discover Quadrilaterals Through{' '}
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
                            className={styles['btn-primary'] || 'generic-btn'}
                            style={{ 
                                padding: '14px 32px', 
                                fontSize: 16, 
                                background: '#4F46E5', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onClick={() => navigate('/practice/class-9/quadrilaterals/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
