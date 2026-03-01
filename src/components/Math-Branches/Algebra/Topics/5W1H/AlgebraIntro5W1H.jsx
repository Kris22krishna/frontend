import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../algebra.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Algebra?',
        icon: '🔍',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        content: `Algebra is the language of patterns and unknowns. Imagine you have a mystery box 📦 — you don't know what's inside, but you know it's 3 more than 5. So the box = 8! In Algebra, we use letters like x, y, or n to represent those mystery numbers. It's like cracking a secret code every time you solve an equation!`,
        fact: '💡 The word "Algebra" comes from the Arabic word "al-jabr" meaning "reunion of broken parts."',
    },
    {
        q: 'WHO',
        label: 'Who uses Algebra?',
        icon: '👥',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Everyone! Doctors calculate medicine doses. Engineers design bridges. Game developers program characters. Bankers balance accounts. Even chefs double a recipe — that's Algebra! You already use it when you split a pizza equally or figure out how many more coins you need.`,
        fact: '💡 NASA engineers use Algebra to calculate rocket trajectories to Mars!',
    },
    {
        q: 'WHEN',
        label: 'When did Algebra begin?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Algebra has been around for over 4,000 years! Ancient Babylonians were solving equations on clay tablets in 2000 BCE. A Persian mathematician Al-Khwarizmi wrote the first Algebra book around 820 AD. You're learning a subject with a 4,000-year-old superpower!`,
        fact: '💡 Al-Khwarizmi\'s name gave us the word "algorithm" — the backbone of all computer programs!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see Algebra?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Algebra is everywhere! In your phone's GPS calculating the shortest path. In movies where CGI artists create 3D characters. In music apps that compress sound files. In shopping when apps calculate discounts. Algebra is the invisible math powering the modern world!`,
        fact: '💡 Every time you use Google Maps, thousands of algebraic equations run in milliseconds!',
    },
    {
        q: 'WHY',
        label: 'Why should I learn Algebra?',
        icon: '🚀',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Algebra trains your brain to think logically and solve problems step-by-step — a skill valuable in ANY career. It builds the foundation for all higher mathematics. More importantly, it teaches you that every complex problem can be broken into simple, solvable steps!`,
        fact: '💡 Studies show that students who master Algebra earn 60% more during their lifetime!',
    },
    {
        q: 'HOW',
        label: 'How do I learn Algebra?',
        icon: '🎯',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        content: `Start with the building blocks: understand variables and expressions. Then learn how to simplify and combine like terms. Next, practice solving equations — it's like balancing a see-saw! Master one skill before moving to the next. Practice a little each day!`,
        fact: '💡 Learning Algebra is like learning a language — the more you practice, the more fluent you become!',
    },
];

/* ─── Single card ─────────────────────────────────── */
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
            {/* Gradient top strip */}
            <div
                className="intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className="intro-card-header">
                {/* Icon */}
                <div
                    className="intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className="intro-card-title-block">
                    <div
                        className="intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className="intro-card-sublabel">{card.label}</div>
                </div>

                {/* Chevron */}
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

            {/* Collapsed hint */}
            {!open && (
                <div className="intro-card-hint">Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className="intro-card-body">
                    <p className="intro-card-content">{card.content}</p>
                    <div
                        className="intro-card-fact"
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
export default function AlgebraIntro5W1H({ onBack }) {
    const navigate = useNavigate();

    return (
        <div className="intro-page">

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="intro-nav">
                <button
                    className="intro-nav-back"
                    onClick={() => navigate('/algebra')}
                >
                    ← Back to Algebra
                </button>

                <div className="intro-nav-links">
                    <button
                        className="intro-nav-link intro-nav-link--active"
                        onClick={() => navigate('/algebra/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/algebra/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/algebra/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="intro-hero">
                <div className="intro-hero-deco intro-hero-deco-a" />
                <div className="intro-hero-deco intro-hero-deco-b" />
                <div className="intro-hero-inner">
                    <h1 className="intro-hero-title">
                        Discover Algebra Through{' '}
                        <span className="intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="intro-content">
                <div className="intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="intro-cta-strip">
                    <p className="intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 7 key terms &amp; 5 golden rules
                    </p>
                    <button
                        className="intro-cta-btn"
                        onClick={() => navigate('/algebra/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
