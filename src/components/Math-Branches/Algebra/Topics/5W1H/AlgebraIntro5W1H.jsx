import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../algebra.css';
import MathRenderer from '../../../../MathRenderer';
import { cards5W1H } from './AlgebraIntroData';

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
                        <MathRenderer text={card.fact} />
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
            <div className="intro-hero" style={{ padding: '16px 24px 20px' }}>
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
            <div className="intro-content" style={{ padding: '10px 24px 20px' }}>
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
