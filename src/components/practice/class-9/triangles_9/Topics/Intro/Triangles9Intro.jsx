import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../triangles_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { CongruenceChart, TriangleTypesChart, ApplicationChart } from '../components/TrianglesDynamicCharts';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is Congruence of Triangles?',
        icon: '📐',
        color: '#0f4c81',
        chart: CongruenceChart,
        short: 'The study of identical shapes and sizes.',
        bullets: [
            'TRIANGLES are 2D shapes bounded by three line segments.',
            'Two figures are **congruent** if they are of the exact same shape and size.',
            'If you trace a triangle and place the copy over the original, they will perfectly cover each other.',
            'We use the symbol $\\cong$ to denote congruence between two geometric figures.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Defined These Criteria?',
        icon: '👨‍🎨',
        color: '#1a237e',
        short: 'Euclid established the foundation of triangle congruence in his "Elements".',
        bullets: [
            '📜 Euclid (c. 300 BC) defined the criteria under which triangles are identical without needing to measure all 6 parts (3 sides and 3 angles).',
            'He introduced the SAS (Side-Angle-Side) axiom as an undeniable truth.',
            'Using this axiom, subsequent mathematicians logically proved ASA, AAS, SSS, and RHS congruences.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        chart: ApplicationChart,
        short: 'In manufacturing, architecture, and structural engineering.',
        bullets: [
            '🏗️ Architecture — Bridges and roofs use triangles because they are rigid. A congruent set of triangles balances the structural load perfectly.',
            '🏭 Manufacturing — Mass production requires identical parts. A mold creates congruent objects every single time.',
            '📐 Tiling — Floor tiles are often congruent shapes that fit brilliantly together without gaps.',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Do We Use This Logic?',
        icon: '⏳',
        color: '#6a1b9a',
        short: 'When validating measurements or creating carbon copies.',
        bullets: [
            '🕵️ Think like an engineer: "If triangle $A \\cong B$, and I know the length of a side in A, then I instantly know the identical side in B!"',
            'Because Corresponding Parts of Congruent Triangles (CPCT) are strictly equal.',
            'This allows for deducing unknown properties without having to physically put a ruler or protractor to the object.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Prove It? Can\'t We Just Measure?',
        icon: '💡',
        color: '#e65100',
        chart: TriangleTypesChart,
        short: 'Because geometry demands absolute mathematical certainty.',
        bullets: [
            '📏 Measurement is imperfect — A standard ruler has a margin of error. Ink has thickness.',
            '🧠 Proofs are permanent — Once you algebraically prove an ASA congruence, it applies infinitely everywhere in the universe.',
            'With the 5 rules (SAS, ASA, AAS, SSS, RHS), checking just 3 specific conditions guarantees the other 3 automatically.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Prove Congruence?',
        icon: '✏️',
        color: '#0f766e',
        short: 'By matching Sides and Angles using the 5 Rules.',
        bullets: [
            '1️⃣ SAS — Side, Included Angle, Side.',
            '2️⃣ ASA — Angle, Included Side, Angle.',
            '3️⃣ SSS — All corresponding Sides match.',
            '4️⃣ RHS — In right-angled triangles: Right angle, Hypotenuse, and one Side.',
            'If any of these conditions are met, you can definitively claim the triangles are identical.',
        ],
    },
];

export default function Triangles9Intro() {
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/triangles')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/triangles/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/triangles/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Discover Triangles Through{' '}
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
                            onClick={() => navigate('/practice/class-9/triangles/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
