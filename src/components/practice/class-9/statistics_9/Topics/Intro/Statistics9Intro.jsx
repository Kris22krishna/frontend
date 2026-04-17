import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../statistics_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { BarGraphChart, HistogramChart, FrequencyPolygonChart, DataSourcesChart, ClassMarksChart, AdjustedFrequencyChart } from '../components/StatisticsDynamicCharts';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is Graphical Data Analysis?',
        icon: '📊',
        color: '#0f4c81',
        chart: BarGraphChart,
        short: 'Transforming boring numbers into clear, accessible visual stories.',
        bullets: [
            'STATISTICS is the science of collecting, organizing, and analyzing data.',
            'While a raw table of data (like marks of 100 students) is useful, it is slow to read.',
            'GRAPHICAL REPRESENTATION turns those tables into pictures.',
            'We use Bar Graphs for categories, Histograms for continuous ranges, and Polygons for trends.'
        ],
    },
    {
        q: 'WHO',
        label: 'Who Uses Statistical Graphs?',
        icon: '👨‍🔬',
        color: '#1a237e',
        chart: DataSourcesChart,
        short: 'Everyone from climate scientists to your favorite mobile game developers.',
        bullets: [
            '📈 Economists map stock markets to predict crashes or booms using line graphs.',
            '🌍 Meteorologists use histograms to track rainfall over continuous 10-day intervals.',
            '🗣️ Social media platforms use bar charts to show your screen time or engagement metrics.',
            'Whenever there is massive data that needs quick summarization, data scientists step in!'
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        chart: HistogramChart,
        short: 'In election results, fitness trackers, and global geography.',
        bullets: [
            '🏃‍♂️ Smartwatches — Your heart rate zones and sleep cycles are plotted as continuous histograms.',
            '🗳️ Elections — Broadcasters use bar graphs to vividly compare votes across different parties.',
            '🛒 E-commerce — Retailers map daily sales to see spikes during holidays.'
        ],
    },
    {
        q: 'WHEN',
        label: 'When Should We Choose Which Graph?',
        icon: '⏳',
        color: '#6a1b9a',
        chart: ClassMarksChart,
        short: 'It depends entirely on whether data is "Discrete" or "Continuous".',
        bullets: [
            'Use a **Bar Graph** when you have distinct categories (like types of pets, or favorite colors).',
            'Use a **Histogram** when tracking continuous numerical intervals without gaps (e.g., ages $10-20, 20-30$).',
            'Use a **Frequency Polygon** when comparing two different distributions on the same axes without drawing bulky histograms.'
        ],
    },
    {
        q: 'WHY',
        label: 'Why Not Just Use Pie Charts?',
        icon: '💡',
        color: '#e65100',
        chart: FrequencyPolygonChart,
        short: 'Because area and length are perceived differently by the human eye.',
        bullets: [
            '🧠 Quick Decoding — Humans are extremely accurate at comparing heights of parallel bars, but very poor at estimating angles in pie charts.',
            '📊 Scale Variability — A bar graph or histogram lets us measure thousands of entries dynamically on an axis.',
            '📈 Trend Spotting — Frequency Polygons help us track shifts in data over time seamlessly.'
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Construct Them?',
        icon: '✏️',
        color: '#0f766e',
        chart: AdjustedFrequencyChart,
        short: 'By plotting Variables on X and Frequencies on Y.',
        bullets: [
            '1️⃣ Choose Axes — Variables (like class intervals) go on the x-axis, counts (frequency) on the y-axis.',
            '2️⃣ Find a Scale — If frequencies reach 50, a scale of 1 unit = 5 items is appropriate.',
            '3️⃣ Watch the Gaps — Leave gaps for Bar Graphs. Do NOT leave gaps for Histograms.',
            '4️⃣ Calculate Widths — If histogram classes vary in size, adjust the height to maintain proportional area.'
        ],
    },
];

export default function Statistics9Intro() {
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/statistics')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/statistics/terminology')}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/statistics/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* ── HERO BANNER ──────────────────────────────── */}
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Discover Statistics Through{' '}
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
                            onClick={() => navigate('/practice/class-9/statistics/terminology')}
                        >
                            Next: Terminology →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
