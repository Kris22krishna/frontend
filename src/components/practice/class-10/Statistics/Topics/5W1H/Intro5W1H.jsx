import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../SurfaceAreasAndVolumes/surface-volumes.css';
import MathRenderer from '../../../../../MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Statistics about?',
        icon: '🔍',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        content: `Statistics is the branch of mathematics that deals with collecting, organizing, analyzing, and interpreting numerical data. In this chapter, we focus on **grouped data** — where individual observations are arranged into class intervals with their frequencies. The three key measures of central tendency are:\n\n1. **Mean** ($\\\\bar{x}$) — the arithmetic average\n2. **Mode** — the most frequently occurring value\n3. **Median** — the middle value that splits data into two equal halves\n\nWe also learn to represent data graphically using **Ogives** (cumulative frequency curves).`,
        fact: '💡 Key Insight: Unlike ungrouped data where you can list every value, grouped data uses class intervals and frequencies — so we need special formulas for Mean, Mode, and Median!',
    },
    {
        q: 'WHO',
        label: 'Who uses these concepts?',
        icon: '👥',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Statistics is used by virtually everyone:\n\n• **Government** — census data, economic indicators, budget allocation\n• **Scientists** — experiment results, drug trials, climate data\n• **Business** — sales analysis, customer demographics, market research\n• **Sports** — player performance, batting averages, team rankings\n• **Weather forecasting** — temperature trends, rainfall analysis\n• **Education** — exam score analysis, grading distributions\n• **Healthcare** — patient data, disease prevalence, hospital statistics`,
        fact: '💡 Florence Nightingale used statistical diagrams (pie charts and bar graphs) to convince the British government to improve hospital conditions — saving thousands of lives!',
    },
    {
        q: 'WHEN',
        label: 'When to use each method?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Use **Direct Method** for mean when values are small and manageable.\nUse **Assumed Mean Method** when class marks ($x_i$) are large — shift them down.\nUse **Step-Deviation Method** when class marks are large AND class width is uniform — divide too.\n\nUse **Mode** when you want the most common/popular value (e.g., most common shoe size).\nUse **Median** when data has outliers (e.g., income data with billionaires) — it is resistant to extremes.\nUse **Ogive** for visual representation and finding median graphically.`,
        fact: '💡 The Step-Deviation Method reduces all numbers to small values like -2, -1, 0, 1, 2 — making mental math possible even for huge datasets!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see examples?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Real-life examples are everywhere:\n1. **Exam Scores**: "How many students scored between 60-80?" → frequency table\n2. **Daily Wages**: Finding average wage of factory workers → mean of grouped data\n3. **Rainfall Data**: Monthly rainfall distributions → ogive curves\n4. **Cricket**: Most common score range (modal class) of a batsman\n5. **Traffic**: Number of vehicles per hour across different time slots\n6. **Agriculture**: Crop yield across different farms → median for central tendency`,
        fact: '💡 The Indian Census uses grouped frequency distributions to analyze data from over 1.4 billion people — the same methods you learn in this chapter!',
    },
    {
        q: 'WHY',
        label: 'Why study this chapter?',
        icon: '🚀',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `This chapter teaches you to summarize large datasets into meaningful single numbers. Instead of staring at thousands of values, you extract the "story" — the average, the most common, and the middle value.\n\nIt builds:\n• **Data literacy** — understanding real-world data\n• **Formula application** — systematic substitution\n• **Graphical interpretation** — reading ogive curves\n• **Logical reasoning** — choosing the right method\n\nIt is a high-scoring NCERT chapter because the methods are formulaic and predictable.`,
        fact: '💡 This chapter carries 6-8 marks in Board exams. The formulas are fixed — once you memorize them, scoring is almost guaranteed!',
    },
    {
        q: 'HOW',
        label: 'How to solve problems?',
        icon: '🎯',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        content: `Follow this systematic framework:\n\n**For Mean:**\n1. Build the frequency table with $x_i$ (class marks)\n2. Choose method (Direct / Assumed Mean / Step-Deviation)\n3. Compute $\\\\Sigma f_i x_i$ or $\\\\Sigma f_i d_i$ or $\\\\Sigma f_i u_i$\n4. Apply the formula\n\n**For Mode:**\n1. Find the modal class (highest frequency)\n2. Identify $f_0$, $f_1$, $f_2$ (previous, modal, next frequencies)\n3. Apply: $\\\\text{Mode} = l + \\\\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\\\times h$\n\n**For Median:**\n1. Build cumulative frequency (cf) column\n2. Find $n/2$ and locate the median class\n3. Apply: $\\\\text{Median} = l + \\\\frac{n/2 - cf}{f} \\\\times h$`,
        fact: '💡 Pro Tip: Always double-check your cumulative frequency column — one wrong cf value will cascade errors through the entire median calculation!',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`intro-card${open ? ' intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            <div className="intro-card-header">
                <div
                    className="intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                <div className="intro-card-title-block">
                    <div
                        className="intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className="intro-card-sublabel">{card.label}</div>
                </div>

                <div
                    className="intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>

            {!open && (
                <div style={{ padding: '0 24px 20px', fontSize: 13, color: '#94a3b8', textAlign: 'right' }}>Tap to explore →</div>
            )}

            {open && (
                <div className="intro-card-body">
                    <div className="intro-card-content">
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className="intro-card-fact"
                        style={{
                            background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                            borderColor: card.gradFrom + '30',
                        }}
                    >
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Intro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="intro-page">
            <nav className="intro-nav">
                <button
                    className="intro-nav-back"
                    onClick={() => navigate('/statistics')}
                >
                    ← Back to Hub
                </button>

                <div className="intro-nav-links">
                    <button className="intro-nav-link intro-nav-link--active">🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/statistics/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/statistics/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="intro-hero-deco intro-hero-deco-a" />
                <div className="intro-hero-deco intro-hero-deco-b" />
                <div className="intro-hero-inner">
                    <h1 className="intro-hero-title">
                        Discover Statistics Through{' '}
                        <span className="intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── CONTENT AREA ──────────────────────────────── */}
            <main className="intro-content">
                <div className="intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* ── CTA STRIP ──────────────────────────────── */}
                <div
                    className="intro-cta-strip"
                    onClick={() => navigate('/statistics/terminology')}
                    style={{ cursor: 'pointer', marginTop: '32px' }}
                >
                    <div className="intro-cta-emoji">🧠</div>
                    <div className="intro-cta-body">
                        <div className="intro-cta-title">Mastered the basics?</div>
                        <p className="intro-cta-sub">
                            Next: 10 key terms and the 5 golden rules of Statistics.
                        </p>
                    </div>
                    <button className="intro-cta-btn">
                        Explore Terminology ✨
                    </button>
                </div>
            </main>
        </div>
    );
}
