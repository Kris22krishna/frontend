import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../the-fish-tale.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is The Fish Tale about?',
        icon: '🐟',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        content: `"The Fish Tale" is a chapter from the NCERT Class 5 Mathematics textbook. It explores the lives of fisher-folk along the coast of India — how they catch fish, sell them, and use large numbers in their daily lives. Through their stories, you learn about big numbers like Lakhs, place value, comparison, estimation, and reading/writing large numbers in the Indian numeral system.`,
        fact: '💡 India has a coastline of about 7,516 km — that\'s a really large number too!',
    },
    {
        q: 'WHO',
        label: 'Who are the people in The Fish Tale?',
        icon: '👥',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `The chapter follows fishing communities from different parts of coastal India. We meet people like Gracy, a fisherwoman who takes loans to buy nets, Jhansi and her sister who buy log boats, and many others. These hardworking people use mathematics every day — to calculate costs, weigh their catch, estimate distances, and manage money through self-help groups.`,
        fact: '💡 Women Self-Help Groups like the one in the chapter have helped millions of women across India manage their finances!',
    },
    {
        q: 'WHEN',
        label: 'When do fishers use big numbers?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Fisher-folk encounter large numbers every day! When they weigh their daily catch (often hundreds of kilograms), calculate the price of fish at the market (thousands of rupees), repay monthly loans (over lakhs of rupees), and track how far their boats travel. Fishing seasons, festival markets, and loan repayment schedules all involve numbers reaching into the Lakhs.`,
        fact: '💡 A single motorboat can cost over Rs 6,00,000 — that\'s 6 Lakh rupees!',
    },
    {
        q: 'WHERE',
        label: 'Where does this story take place?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `The Fish Tale takes you along India's vast coastline. From the shores of Kerala and Tamil Nadu to Gujarat and the Andaman & Nicobar Islands. Fisher-folk in these areas catch different types of fish — from tiny sardines to massive marlins. Each village has its own type of boats: log boats, catamarans, and motorboats, each with different costs and capacities.`,
        fact: '💡 The Andaman & Nicobar Islands have over 500 islands, but people live on only about 37 of them!',
    },
    {
        q: 'WHY',
        label: 'Why should I learn this chapter?',
        icon: '🚀',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `This chapter teaches you to work with large numbers — a skill you'll use every day! Understanding place value up to Lakhs, comparing big numbers, and estimating are essential life skills. Whether you're reading a newspaper, understanding population data, or managing money, these number skills are your superpower. Plus, you'll learn about the fascinating life of Indian fisher-folk!`,
        fact: '💡 India\'s fish production is about 1,41,64,000 tonnes per year — try reading that number using the Indian system!',
    },
    {
        q: 'HOW',
        label: 'How do I master large numbers?',
        icon: '🎯',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        content: `Start by understanding the Indian place value chart: Ones → Tens → Hundreds → Thousands → Ten Thousands → Lakhs. Practice reading and writing 5-digit and 6-digit numbers. Learn to compare numbers by looking at digits from left to right. Finally, practice estimation by rounding numbers to the nearest thousand or ten thousand. One step at a time!`,
        fact: '💡 The Indian number system uses commas differently: 1,00,000 (one lakh) vs the international 100,000.',
    },
];

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`ft-intro-card${open ? ' ft-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className="ft-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className="ft-intro-card-header">
                {/* Icon */}
                <div
                    className="ft-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className="ft-intro-card-title-block">
                    <div
                        className="ft-intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className="ft-intro-card-sublabel">{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className="ft-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>

            {/* Collapsed hint */}
            {!open && (
                <div className="ft-intro-card-hint">Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className="ft-intro-card-body">
                    <div className="ft-intro-card-content">
                        {card.content}
                    </div>
                    <div
                        className="ft-intro-card-fact"
                        style={{
                            background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                            borderColor: card.gradFrom + '30',
                        }}
                    >
                        {card.fact}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Main page ───────────────────────────────────── */
export default function FishTaleIntro5W1H({ onBack }) {
    const navigate = useNavigate();

    return (
        <div className="ft-intro-page">

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="ft-intro-nav">
                <button
                    className="ft-intro-nav-back"
                    onClick={() => navigate('/the-fish-tale')}
                >
                    ← Back to The Fish Tale
                </button>

                <div className="ft-intro-nav-links">
                    <button
                        className="ft-intro-nav-link ft-intro-nav-link--active"
                        onClick={() => navigate('/the-fish-tale/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="ft-intro-nav-link"
                        onClick={() => navigate('/the-fish-tale/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="ft-intro-nav-link"
                        onClick={() => navigate('/the-fish-tale/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="ft-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="ft-intro-hero-deco ft-intro-hero-deco-a" />
                <div className="ft-intro-hero-deco ft-intro-hero-deco-b" />
                <div className="ft-intro-hero-inner">
                    <h1 className="ft-intro-hero-title">
                        Discover The Fish Tale Through{' '}
                        <span className="ft-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="ft-intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="ft-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="ft-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="ft-intro-cta-strip">
                    <p className="ft-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 8 key terms of the Indian number system
                    </p>
                    <button
                        className="ft-intro-cta-btn"
                        onClick={() => navigate('/the-fish-tale/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
