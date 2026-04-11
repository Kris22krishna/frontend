import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../linear_equations_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { SingleLineChart, TwoLinesChart, SolutionSetChart, PlottingStepsChart, HorizontalVerticalChart, StandardFormChart } from '../components/LEDynamicCharts';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is a Linear Equation in Two Variables?',
        icon: '📐',
        color: '#0f4c81',
        chart: SingleLineChart,
        short: 'An equation of the form ax + by + c = 0 where a, b are not both zero.',
        bullets: [
            'A linear equation in two variables is an equation that can be written as $ax + by + c = 0$, where $a$, $b$, $c$ are real numbers and $a$ and $b$ are not both zero.',
            'The word "linear" means the equation represents a straight line when plotted on a graph.',
            'It involves two unknowns (variables), usually $x$ and $y$.',
            'Examples: $2x + 3y = 12$, $x - y + 1 = 0$, $y = 2x + 5$.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Developed These Ideas?',
        icon: '👨‍🎨',
        color: '#1a237e',
        short: 'René Descartes connected algebra and geometry, making graphing possible.',
        bullets: [
            '🏛️ René Descartes (1596–1650) invented the Cartesian coordinate system, linking algebra with geometry.',
            'He showed that every algebraic equation can be visualized as a geometric curve — a revolutionary idea!',
            '📜 Pierre de Fermat independently discovered similar ideas around the same time.',
            'Their work allows us to "see" equations as lines and curves on a graph.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        chart: TwoLinesChart,
        short: 'In economics, physics, engineering, and everyday life.',
        bullets: [
            '💰 Economics — Supply and Demand curves are linear equations that predict market prices.',
            '🏗️ Engineering — Load calculations in bridges and buildings use systems of linear equations.',
            '📱 Technology — Screen coordinates, image rendering, and game physics all use linear equations.',
            '🛒 Daily Life — "If apples cost ₹50/kg and bananas cost ₹30/kg, how many of each can I buy for ₹200?" is a linear equation!',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Do We Use Them?',
        icon: '⏳',
        color: '#6a1b9a',
        chart: SolutionSetChart,
        short: 'Whenever we need to find unknown quantities connected by a relationship.',
        bullets: [
            '🕵️ Whenever a problem has TWO unknowns connected by a rule: "The sum of two numbers is 20" → $x + y = 20$.',
            'When modeling real-world relationships — distance, speed, cost, quantity problems.',
            'In higher studies — systems of equations in physics, chemistry, and data science.',
            'When verifying if a point satisfies a given condition.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Do We Study Them?',
        icon: '💡',
        color: '#e65100',
        chart: PlottingStepsChart,
        short: 'Because they form the foundation for all advanced algebra and real-world problem solving.',
        bullets: [
            '🧱 They are the building blocks — Quadratic equations, systems, matrices all build on linear equations.',
            '📊 Graphing reveals patterns — A single equation has infinitely many solutions, but its graph shows them all at once.',
            '🔑 Every solution $(x, y)$ is a point on the line. If a point is NOT on the line, it is NOT a solution.',
            'Understanding linear equations is essential for Grade 10 (pairs of linear equations) and beyond.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Solve and Graph Them?',
        icon: '✏️',
        color: '#0f766e',
        chart: StandardFormChart,
        short: 'By finding solution pairs, plotting them, and drawing the line through them.',
        bullets: [
            '1️⃣ Rewrite in standard form: $ax + by + c = 0$.',
            '2️⃣ Find at least 2 solutions — substitute values of $x$ (or $y$) to get the other variable.',
            '3️⃣ Plot the ordered pairs $(x, y)$ on the Cartesian plane.',
            '4️⃣ Connect the dots — they always form a straight line. This line represents ALL solutions!',
        ],
    },
];

export default function LinearEquations9Intro() {
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Discover Linear Equations Through{' '}
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

                    <div style={{ textAlign: 'center', margin: '40px 0' }}>
                        <p style={{ fontSize: 16, color: '#475569', marginBottom: 16, fontWeight: 600 }}>
                            Ready to master the vocabulary? 📖
                        </p>
                        <button
                            className={styles['btn-primary']}
                            style={{ padding: '14px 32px', fontSize: 16 }}
                            onClick={() => navigate('/practice/class-9/linear-equations-two-variables/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
