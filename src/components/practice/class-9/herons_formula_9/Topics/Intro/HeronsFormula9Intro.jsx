import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../herons_formula_9.module.css';
import { LatexText } from '../../../../../LatexText';

const CARDS = [
    {
        q: 'WHAT',
        label: "What is Heron's Formula?",
        icon: '📐',
        color: '#0f4c81',
        short: 'A formula to calculate the exact area of a triangle when only the lengths of its three sides are known.',
        bullets: [
            'Usually, the area of a triangle requires knowing the base and the perpendicular height: $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$.',
            'But what if you have a triangular field and only know the lengths of the fences (the three sides) but not the height?',
            "That's exactly what Heron's Formula solves! It calculates the area using just the sides $a$, $b$, and $c$.",
            "The magic happens by first calculating the 'semi-perimeter' (half the perimeter), denoted as $s$.",
        ],
    },
    {
        q: 'WHO',
        label: 'Who Invented This Formula?',
        icon: '👨‍🎨',
        color: '#1a237e',
        short: 'Heron (or Hero) of Alexandria, a brilliant mathematician and engineer from Roman Egypt.',
        bullets: [
            '🏛️ Heron lived around 10 CE to 75 CE in Alexandria, Egypt.',
            'He was an applied mathematician—he created formulas to solve real-world engineering and surveying problems.',
            'His works were encyclopedic. In his book "Metrica", he detailed how to find the areas of irregular shapes, including triangles, quadrilaterals, and regular polygons.',
            "It is in this famous book that he derived the formula that bears his name: $\\sqrt{s(s-a)(s-b)(s-c)}$.",
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This Applied?',
        icon: '🌍',
        color: '#b71c1c',
        short: 'In surveying, architecture, landscaping, and geography.',
        bullets: [
            '🚧 Land Surveying — Real plots of land are rarely perfect rectangles or right triangles. They are irregular polygons, which surveyors split into scalene triangles to calculate total area.',
            '🎨 Design & Decor — If you need to paint a triangular wall or order turf for a triangular park, measuring the edges is much easier than finding the exact mathematical "height".',
            '🚥 Traffic Signs — Making sure a "SCHOOL AHEAD" sign has the exact required surface area for visibility standards.',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Should You Use It?',
        icon: '⏳',
        color: '#6a1b9a',
        short: 'Whenever you know three side lengths (SSS) but finding the height is impossible or difficult.',
        bullets: [
            'If you have a right-angled triangle, you already have the base and height, so $\\frac{1}{2}bh$ is faster.',
            "If you have an equilateral or isosceles triangle, dropping a perpendicular makes finding the height easy, but Heron's Formula still works perfectly as a backup.",
            "For a scalene triangle (where all sides are different lengths and no angles are $90^{\\circ}$), Heron's Formula is absolutely essential.",
            "Always check: Do I know all three sides? If yes, Heron's is ready to go.",
        ],
    },
    {
        q: 'WHY',
        label: 'Why Not Just Measure the Height?',
        icon: '💡',
        color: '#e65100',
        short: 'Measuring a perfectly perpendicular line across open space is highly prone to error.',
        bullets: [
            '📏 Imagine standing in a massive, uneven triangular field measuring $120\\text{m}$ by $80\\text{m}$ by $50\\text{m}$.',
            'To find the height, you would have to draw a perfectly straight, perfectly $90^{\\circ}$ line from one corner to the opposite side.',
            'Any slight mistake in the angle drastically changes the height measurement, leading to an incorrect area.',
            'Measuring the outer edges (the perimeter) is much simpler, faster, and more accurate in the real world.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Does the Formula Work?',
        icon: '✏️',
        color: '#0f766e',
        short: 'It requires two simple steps: 1. Calculate semi-perimeter (s). 2. Plug into the square root formula.',
        bullets: [
            'Step 1: Add the three sides and divide by 2 to find the semi-perimeter $s$: $s = \\frac{a+b+c}{2}$',
            'Step 2: Subtract each side length from $s$ to get three differences: $(s-a)$, $(s-b)$, and $(s-c)$.',
            'Step 3: Multiply $s$ times the three differences.',
            'Step 4: Take the square root of that product: Area = $\\sqrt{s(s-a)(s-b)(s-c)}$',
        ],
    },
];

export default function HeronsFormula9Intro() {
    const navigate = useNavigate();
    const [openIdx, setOpenIdx] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['page']}>
            {/* ── TOP NAV ─────────────────────────────────── */}
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/herons-formula')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/herons-formula/terminology')}>📖 Terminology</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/herons-formula/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ─────────────────────────────── */}
                <div className={styles['module-hero']} style={{ background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)' }}>
                    <h1 className={styles['module-title']} style={{ color: '#fff' }}>
                        The 6 Big Questions
                    </h1>
                    <p className={styles['module-subtitle']}>
                        Why are we learning Heron's Formula? Let's break it down before diving into the math.
                    </p>
                </div>

                {/* ── 5W1H GRID ───────────────────────────────── */}
                <div className={styles['section']}>
                    <div className={styles['fivew1h-grid']}>
                        {CARDS.map((card, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div key={idx} className={styles['fivew1h-card']} style={{ borderColor: isOpen ? card.color : '#f1f5f9' }}>
                                    <div
                                        className={styles['fivew1h-header']}
                                        style={{ background: isOpen ? `${card.color}08` : '#fff' }}
                                        onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                                    >
                                        <div className={styles['fivew1h-icon']} style={{ background: `${card.color}15`, color: card.color }}>
                                            {card.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div className={styles['fivew1h-label']} style={{ color: card.color }}>{card.q}</div>
                                            <div className={styles['fivew1h-q']}><LatexText text={card.label} /></div>
                                            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 1.4 }}><LatexText text={card.short} /></div>
                                        </div>
                                        <div className={`${styles['fivew1h-chevron']} ${isOpen ? styles['fivew1h-chevron--open'] : ''}`} style={{ color: card.color }}>
                                            ▼
                                        </div>
                                    </div>
                                    {isOpen && (
                                        <div className={styles['fivew1h-body']}>
                                            <ul className={styles['fivew1h-list']}>
                                                {card.bullets.map((b, i) => (
                                                    <li key={i} className={styles['fivew1h-item']}>
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
                    <div className={styles['learn-footer']} style={{ justifyContent: 'center', marginTop: 40 }}>
                        <button
                            className={styles['sidebar-btn']}
                            style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '12px 24px', fontSize: 16, fontWeight: 700 }}
                            onClick={() => navigate('/practice/class-9/herons-formula/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
