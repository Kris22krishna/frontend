import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../coordinate_geometry_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { QuadrantChart, PlottingStepsChart } from '../components/CGDynamicCharts';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is Coordinate Geometry?',
        icon: '🗺️',
        color: '#0f4c81',
        chart: QuadrantChart,
        short: 'A system that links algebra and geometry using a grid of numbers.',
        bullets: [
            'COORDINATE GEOMETRY is the study of geometry using a coordinate system.',
            'It uses a grid (called the Cartesian Plane) to precisely locate points, lines, and shapes using pairs of numbers.',
            'Every point is described by an ORDERED PAIR $(x, y)$.',
            'It perfectly bridges ALGEBRA (equations) with GEOMETRY (shapes). For example, $y = 2x + 1$ represents a straight line.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Invented It?',
        icon: '👨‍🎨',
        color: '#1a237e',
        short: 'René Descartes, a 17th-century French mathematician and philosopher.',
        bullets: [
            '🧠 René Descartes (1596–1650) developed this system while lying in bed watching a fly on the ceiling.',
            'He realized he could describe the fly\'s exact position by measuring its distance from the two adjacent walls.',
            'Because of his Latinized name (Cartesius), the system is called the CARTESIAN system.',
            'His brilliant idea bridged the gap between two previously separate subjects: Algebra and Euclidean Geometry.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        short: 'In maps, GPS, video games, astronomy, and architecture.',
        bullets: [
            '🛰️ GPS & Mapping — Latitude and longitude act as a giant coordinate system for the Earth.',
            '🎮 Video Games & CGI — Every pixel on a screen and 3D character is mapped using $x, y$, and $z$ coordinates.',
            '🏗️ Architecture — Blueprints use grids to accurately space out rooms, pillars, and boundaries.',
            '🔭 Astronomy — Star maps use coordinates to locate planets, galaxies, and constellations in the night sky.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Learn Coordinate Geometry?',
        icon: '💡',
        color: '#e65100',
        short: 'To exactly pinpoint locations and verify geometric properties algebraically.',
        bullets: [
            '🎯 Accuracy — It eliminates guessing. "A bit to the left" becomes "At $x = -2$".',
            '📏 Distance & Shapes — You can calculate the exact distance between two spots without a physical ruler.',
            '🚀 Future Sandbox — It is the foundation for vectors, calculus, physics, and computer programming.',
            '🧩 Visualizing Data — It lets us turn raw numbers into graphs to easily spot trends and patterns.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Does It Work?',
        icon: '✏️',
        color: '#0f766e',
        chart: PlottingStepsChart,
        short: 'By crossing two perpendicular number lines: the X-axis and Y-axis.',
        bullets: [
            '1️⃣ The Grid: Take a horizontal number line ($X$-axis) and cross it with a vertical one ($Y$-axis).',
            '2️⃣ The Origin: Where they cross is the center $(0,0)$, called the Origin.',
            '3️⃣ The Coordinates: To find $(3, 4)$, start at the origin, move $3$ steps right (on $X$), and $4$ steps up (on $Y$).',
            '4️⃣ The Quadrants: The two crossed lines divide the flat plane into 4 distinct regions called Quadrants.',
        ],
    },
];

export default function CoordinateGeometry9Intro() {
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/coordinate-geometry')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/coordinate-geometry/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/coordinate-geometry/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Discover Coordinate Geometry Through{' '}
                        <span className={styles['accent-text']}>5 Big Questions</span>
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
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <p style={{ fontSize: 16, color: '#475569', marginBottom: 16, fontWeight: 600 }}>
                            Ready to master the vocabulary? 📖
                        </p>
                        <button
                            className={styles['btn-primary']}
                            style={{ padding: '14px 32px', fontSize: 16 }}
                            onClick={() => navigate('/practice/class-9/coordinate-geometry/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
