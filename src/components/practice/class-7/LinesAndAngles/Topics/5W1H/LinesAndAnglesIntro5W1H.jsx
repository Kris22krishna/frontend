import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../lines-and-angles.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './LinesAndAnglesIntroData';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`la-intro-card${open ? ' la-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className="la-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className="la-intro-card-header">
                {/* Icon */}
                <div
                    className="la-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className="la-intro-card-title-block">
                    <div
                        className="la-intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className="la-intro-card-sublabel">{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className="la-intro-card-chevron"
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
                <div className="la-intro-card-hint">Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className="la-intro-card-body">
                    <div className="la-intro-card-content">
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className="la-intro-card-fact"
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
export default function LinesAndAnglesIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="la-intro-page">

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="la-intro-nav">
                <button
                    className="la-intro-nav-back"
                    onClick={() => navigate('/middle/grade/7/lines-and-angles')}
                >
                    ← Back to Chapter Hub
                </button>

                <div className="la-intro-nav-links">
                    <button
                        className="la-intro-nav-link la-intro-nav-link--active"
                        onClick={() => navigate('/middle/grade/7/lines-and-angles/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="la-intro-nav-link"
                        onClick={() => navigate('/middle/grade/7/lines-and-angles/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="la-intro-nav-link"
                        onClick={() => navigate('/middle/grade/7/lines-and-angles/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="la-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="la-intro-hero-deco la-intro-hero-deco-a" />
                <div className="la-intro-hero-deco la-intro-hero-deco-b" />
                <div className="la-intro-hero-inner">
                    <h1 className="la-intro-hero-title">
                        Discover Lines and Angles Through{' '}
                        <span className="la-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="la-intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="la-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="la-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="la-intro-cta-strip">
                    <p className="la-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: Key terms &amp; geometric rules
                    </p>
                    <button
                        className="la-intro-cta-btn"
                        onClick={() => navigate('/middle/grade/7/lines-and-angles/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
