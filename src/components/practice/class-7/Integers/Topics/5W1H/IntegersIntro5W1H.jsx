import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../integers.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './IntegersIntroData';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`int-intro-card${open ? ' int-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className="int-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className="int-intro-card-header">
                {/* Icon */}
                <div
                    className="int-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className="int-intro-card-title-block">
                    <div
                        className="int-intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className="int-intro-card-sublabel">{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className="int-intro-card-chevron"
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
                <div className="int-intro-card-hint">Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className="int-intro-card-body">
                    <div className="int-intro-card-content">
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className="int-intro-card-fact"
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

/* ─── Main page ───────────────────────────────────── */
export default function IntegersIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="int-intro-page">

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="int-intro-nav">
                <button
                    className="int-intro-nav-back"
                    onClick={() => navigate('/middle/grade/7/integers')}
                >
                    ← Back to Integers
                </button>

                <div className="int-intro-nav-links">
                    <button
                        className="int-intro-nav-link int-intro-nav-link--active"
                        onClick={() => navigate('/middle/grade/7/integers/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="int-intro-nav-link"
                        onClick={() => navigate('/middle/grade/7/integers/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="int-intro-nav-link"
                        onClick={() => navigate('/middle/grade/7/integers/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="int-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="int-intro-hero-deco int-intro-hero-deco-a" />
                <div className="int-intro-hero-deco int-intro-hero-deco-b" />
                <div className="int-intro-hero-inner">
                    <h1 className="int-intro-hero-title">
                        Discover Integers Through{' '}
                        <span className="int-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="int-intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="int-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="int-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="int-intro-cta-strip">
                    <p className="int-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: Key terms &amp; rules of signs
                    </p>
                    <button
                        className="int-intro-cta-btn"
                        onClick={() => navigate('/middle/grade/7/integers/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
