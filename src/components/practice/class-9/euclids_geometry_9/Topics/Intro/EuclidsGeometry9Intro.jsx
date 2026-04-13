import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../euclids_geometry_9.module.css';
import { LatexText } from '../../../../../LatexText';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is Euclid\'s Geometry?',
        icon: '📐',
        color: '#0f4c81',
        short: 'The study of formal mathematical logic, shapes, and space using defined rules.',
        bullets: [
            'Geometry comes from Greek words "geo" (earth) and "metrein" (measure).',
            'Euclidean geometry is a mathematical system attributed to Alexandrian Greek mathematician Euclid.',
            'It is the first organized logical system that deduced geometric facts from a small set of given truths.',
            'It deals with solid objects, flat surfaces, lines, and points, and how they relate to one another.'
        ],
    },
    {
        q: 'WHO',
        label: 'Who Developed These Ideas?',
        icon: '👨‍🎨',
        color: '#1a237e',
        short: 'Thales, Pythagoras, and primarily Euclid of Alexandria.',
        bullets: [
            '🏛️ Thales (a Greek mathematician) is credited with giving the first known proof (that a circle is bisected by its diameter).',
            'Pythagoras and his group discovered many geometric properties and developed them logically.',
            '📜 Euclid (around 300 BCE) collected all known work and arranged it in his famous treatise called "Elements".',
            'He introduced the revolutionary idea of proving statements using previously proven statements and starting assumptions.'
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        short: 'In architecture, engineering, astronomy, and any field requiring logical proofs.',
        bullets: [
            '🏗️ Construction — Ancient civilizations (Egyptians, Babylonians, Harappans) used practical geometry to build pyramids and cities.',
            '📐 Designing — Modern architecture and computer graphics rely entirely on the foundations of points, lines, and planes.',
            '🌟 Logic — The deductive method used by Euclid is now the foundation of computer programming and theoretical physics and mathematics.'
        ],
    },
    {
        q: 'WHEN',
        label: 'When Were These Ideas Formulated?',
        icon: '⏳',
        color: '#6a1b9a',
        short: 'Over thousands of years, culminating in 300 BCE.',
        bullets: [
            'Geometry has been used since ancient times whenever people faced practical problems (like remeasuring land after Nile floods in Egypt).',
            'In India, the Sulbasutras (800 BCE to 500 BCE) were manuals of geometrical constructions used for complex fire altars.',
            'In 300 BCE, Euclid formalized all this scattered, practical knowledge into a purely logical framework in Alexandria, Egypt.'
        ],
    },
    {
        q: 'WHY',
        label: 'Why Do We Study It?',
        icon: '💡',
        color: '#e65100',
        short: 'To learn how to reason logically and build complex truths from simple assumptions.',
        bullets: [
            '🧱 It represents the ultimate model of logical reasoning. If you learn how to prove things in geometry, you learn how to think critically.',
            'It provides the structural vocabulary (points, lines, angles, planes) we need to describe the physical universe.',
            'Understanding axioms and postulates is essential to studying any advanced mathematics.'
        ],
    },
    {
        q: 'HOW',
        label: 'How is it Organized?',
        icon: '✏️',
        color: '#0f766e',
        short: 'Through Definitions, Axioms, Postulates, and Theorems.',
        bullets: [
            '1️⃣ Euclid started by listing 23 definitions to make sure everyone meant the same thing (e.g., "A point is that which has no part").',
            '2️⃣ He stated 7 Axioms — general universal truths applicable to all mathematics (e.g., "Things equal to the same thing are equal").',
            '3️⃣ He stated 5 Postulates — truths specific only to geometry (e.g., "A straight line may be drawn from any one point to any other point").',
            '4️⃣ Using only these assumptions and common logic, he proved hundreds of complex Theorems.'
        ],
    },
];

export default function EuclidsGeometry9Intro() {
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/euclids-geometry')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/euclids-geometry/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/euclids-geometry/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Discover Euclid's Geometry Through{' '}
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

                    <div style={{ textAlign: 'center', margin: '40px 0' }}>
                        <p style={{ fontSize: 16, color: '#475569', marginBottom: 16, fontWeight: 600 }}>
                            Ready to master the vocabulary? 📖
                        </p>
                        <button
                            className={styles['btn-primary']}
                            style={{ padding: '14px 32px', fontSize: 16 }}
                            onClick={() => navigate('/practice/class-9/euclids-geometry/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
