import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../understanding_quadrilaterals.module.css';
import { IntroFigure } from '../../QuadrilateralFigures';

const CARDS = [
    {
        key: 'what',
        label: 'WHAT',
        q: 'What are Quadrilaterals?',
        icon: '🔷',
        color: '#0f766e',
        items: [
            '📌 The chapter begins with plane curves, then narrows down to polygons, and finally to quadrilaterals.',
            '📌 A polygon is a simple closed curve made only of line segments.',
            '📌 A quadrilateral is a polygon with exactly 4 sides, 4 vertices, and 4 angles.',
            '📌 A diagonal joins two non-consecutive vertices of a polygon.',
            '📌 The chapter then studies trapeziums, kites, parallelograms, rhombuses, rectangles, and squares.',
        ],
    },
    {
        key: 'who',
        label: 'WHO',
        q: 'Who Uses These Ideas?',
        icon: '👥',
        color: '#1e40af',
        items: [
            '📌 Architects use quadrilateral shapes in floor plans, roofs, windows, and wall panels.',
            '📌 Surveyors study land plots that are often triangular or quadrilateral in shape.',
            '📌 Designers use rectangles, squares, and kites in screens, posters, and product layouts.',
            '📌 Engineers rely on angle properties and parallel sides in frames and support structures.',
            '📌 Students use these ideas to identify shapes, find missing angles, and justify geometric reasoning.',
        ],
    },
    {
        key: 'when',
        label: 'WHEN',
        q: 'When Do We Use Angle Properties?',
        icon: '🕒',
        color: '#7c3aed',
        items: [
            '📌 When we need the angle sum of a quadrilateral, we use $360^\\circ$.',
            '📌 When we divide an $n$-gon from one vertex into $(n-2)$ triangles, we get the interior-angle formula $(n-2) \\times 180^\\circ$.',
            '📌 When we walk around a polygon, the total exterior turn is always $360^\\circ$.',
            '📌 When we study regular polygons, we use $\\frac{360^\\circ}{n}$ for each exterior angle.',
            '📌 When we identify special quadrilaterals, we use side, angle, and diagonal properties together.',
        ],
    },
    {
        key: 'where',
        label: 'WHERE',
        q: 'Where Do We See Quadrilaterals?',
        icon: '🌍',
        color: '#b45309',
        items: [
            '📌 Rectangles appear in doors, books, phone screens, and notebooks.',
            '📌 Squares appear in tiles, chessboards, and grid paper.',
            '📌 Kites appear in traditional flying kites and decorative patterns.',
            '📌 Trapezium-like shapes appear in bridges, tabletops, and road sign frames.',
            '📌 Parallelogram patterns appear in brick designs, art borders, and mechanical linkages.',
        ],
    },
    {
        key: 'why',
        label: 'WHY',
        q: 'Why Do We Learn This Chapter?',
        icon: '🎯',
        color: '#be185d',
        items: [
            '📌 To distinguish simple, closed, convex, and regular figures correctly.',
            '📌 To use angle-sum and exterior-angle facts in exact calculations.',
            '📌 To classify quadrilaterals using definitions instead of guesswork.',
            '📌 To understand the hierarchy: a square is also a rectangle, a rhombus, and a parallelogram.',
            '📌 To prepare for later geometry through properties proved using congruence and diagonals.',
        ],
    },
    {
        key: 'how',
        label: 'HOW',
        q: 'How Do We Study Quadrilaterals?',
        icon: '🛠',
        color: '#0369a1',
        items: [
            '📌 Start by checking whether the figure is a simple closed curve made of line segments.',
            '📌 Classify polygons by number of sides, then by shape type: convex/concave or regular/irregular.',
            '📌 Draw diagonals to study quadrilaterals and angle sums.',
            '📌 Use definitions first: trapezium, kite, and parallelogram each have different side relationships.',
            '📌 Use the special properties of rhombus, rectangle, and square as upgraded forms of parallelograms.',
        ],
    },
];

export default function UnderstandingQuadrilateralsIntro5W1H() {
    const navigate = useNavigate();
    const [openKey, setOpenKey] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

    return (
        <div className={styles['ccr-page']}>
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals')}>
                    ← Understanding Quadrilaterals
                </button>
                <div className={styles['ccr-nav-links']}>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Introduction</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals/terminology')}>Terminology</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals/skills')}>Skills</button>
                </div>
            </nav>

            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>
                    Introduction to <span className={styles['ccr-accent-text']}>Understanding Quadrilaterals</span>
                </h1>
                <p className={styles['ccr-module-subtitle']}>6 Big Questions · Tap any card to explore</p>
            </div>

            <div className={styles['ccr-section']}>
                <div className={styles['ccr-5w1h-grid']}>
                    {CARDS.map((card) => {
                        const isOpen = openKey === card.key;
                        return (
                            <div
                                key={card.key}
                                className={styles['ccr-5w1h-card']}
                                style={{ borderColor: isOpen ? card.color : '#f1f5f9' }}
                            >
                                <div
                                    className={styles['ccr-5w1h-header']}
                                    style={{ background: isOpen ? `${card.color}08` : 'transparent' }}
                                    onClick={() => toggle(card.key)}
                                >
                                    <div className={styles['ccr-5w1h-icon']} style={{ background: `${card.color}15` }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className={styles['ccr-5w1h-label']} style={{ color: card.color }}>{card.label}</div>
                                        <div className={styles['ccr-5w1h-q']}>{card.q}</div>
                                    </div>
                                    <span className={`${styles['ccr-5w1h-chevron']}${isOpen ? ` ${styles['ccr-5w1h-chevron--open']}` : ''}`} style={{ color: card.color }}>
                                        ⌄
                                    </span>
                                </div>

                                {isOpen && (
                                    <div className={styles['ccr-5w1h-body']}>
                                        <div className={styles['ccr-inline-figure']}>
                                            <IntroFigure type={card.key} color={card.color} />
                                        </div>
                                        <ul className={styles['ccr-5w1h-list']}>
                                            {card.items.map((item, idx) => (
                                                <li key={idx} className={styles['ccr-5w1h-item']}>
                                                    <LatexText text={item} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: 36 }}>
                    <button
                        className={`${styles['ccr-btn-primary']} ${styles['ccr-btn-large']}`}
                        onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals/terminology')}
                    >
                        Next: Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
