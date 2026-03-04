import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../integers.css';
import MathRenderer from '@/components/MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Integers?',
        icon: '🔍',
        gradFrom: '#4f46e5',
        gradTo: '#7c3aed',
        shadow: 'rgba(79, 70, 229, 0.35)',
        content: `Integers are matching pairs of positive and negative numbers, along with zero. Think of them as "whole numbers" that can go in two opposite directions. If $+5$ is five steps forward, then $-5$ is five steps backward. Together, they create a complete system for measuring change!`,
        fact: 'The word "Integer" comes from the Latin word "interger," meaning "whole" or "untouched."',
    },
    {
        q: 'WHO',
        label: 'Who uses Integers?',
        icon: '👥',
        gradFrom: '#0d9488',
        gradTo: '#10b981',
        shadow: 'rgba(13, 148, 136, 0.35)',
        content: `Weather reporters use them for temperatures ($20°C$ vs $-5°C$). Accountants use them for profits ($+$) and losses ($-$). Even in games like Minecraft, your Y-coordinate uses integers to tell if you are above ground or deep in a cave!`,
        fact: 'Digital thermometers use tiny sensors to detect if energy is moving "positive" or "negative"!',
    },
    {
        q: 'WHEN',
        label: 'When did they appear?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `The idea of "negative" numbers was first used in ancient China around $200$ BCE, using red rods for positive and black rods for negative. Later, Indian mathematicians like Brahmagupta in $628$ CE defined them clearly as "debts" versus "fortunes".`,
        fact: 'For a long time, many European mathematicians called negative numbers "absurd" or "false"!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see them?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Look at a lift! The ground floor is $0$, the higher floors are $+1, +2$, and the basement levels are $-1, -2$. You see them in sports scores (goal difference), bank balances, and even when you use "BC" and "AD" in history class.`,
        fact: 'The Dead Sea is at an elevation of about $-430$ meters—the lowest point on Earth\'s land!',
    },
    {
        q: 'WHY',
        label: 'Why learn them?',
        icon: '🚀',
        gradFrom: '#4338ca',
        gradTo: '#6366f1',
        shadow: 'rgba(67, 56, 202, 0.35)',
        content: `Without integers, we couldn't describe "opposites" easily. They allow us to do subtraction without getting stuck at zero. They are the foundation of Algebra, Physics, and Economics. Learning them helps your brain handle complex, multi-directional ideas!`,
        fact: 'In computer science, integers are the most basic way we store numbers in memory!',
    },
    {
        q: 'HOW',
        label: 'How to master them?',
        icon: '🎯',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        content: `Visualise! Use models like the number line or a vertical building. Remember: "Negative" just means "Opposite". Once you see the patterns, working with these "signed numbers" becomes as easy as counting!`,
        fact: 'Practice makes perfect—try thinking of everyday numbers as "directed" values!',
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
                        <MathRenderer text={`💡 ${card.fact}`} />
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Main page ───────────────────────────────────── */
export default function IntegersIntro() {
    const navigate = useNavigate();

    return (
        <div className="intro-page">

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="intro-nav">
                <button
                    className="intro-nav-back"
                    onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/integers')}
                >
                    ← Back to Integers
                </button>

                <div className="intro-nav-links">
                    <button
                        className="intro-nav-link intro-nav-link--active"
                        onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="intro-hero-deco intro-hero-deco-a" />
                <div className="intro-hero-deco intro-hero-deco-b" />
                <div className="intro-hero-inner">
                    <h1 className="intro-hero-title">
                        Discover Integers Through{' '}
                        <span className="intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="intro-cta-strip">
                    <p className="intro-cta-sub" style={{ margin: 0 }}>
                        Ready to master the language of signed numbers?
                    </p>
                    <button
                        className="intro-cta-btn"
                        onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
