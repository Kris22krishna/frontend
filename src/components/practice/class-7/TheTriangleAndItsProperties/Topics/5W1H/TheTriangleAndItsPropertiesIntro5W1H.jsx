import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../the-triangle-and-its-properties.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './TheTriangleAndItsPropertiesIntroData';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`tri-intro-card${open ? ' tri-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className="tri-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className="tri-intro-card-header">
                {/* Icon */}
                <div
                    className="tri-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className="tri-intro-card-title-block">
                    <div
                        className="tri-intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className="tri-intro-card-sublabel">{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className="tri-intro-card-chevron"
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
                <div className="tri-intro-card-hint">Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className="tri-intro-card-body">
                    <div className="tri-intro-card-content">
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className="tri-intro-card-fact"
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
export default function TheTriangleAndItsPropertiesIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="tri-intro-page">

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="tri-intro-nav">
                <button
                    className="tri-intro-nav-back"
                    onClick={() => navigate('/middle/grade/7/the-triangle-and-its-properties')}
                >
                    ← Back to Triangles
                </button>

                <div className="tri-intro-nav-links">
                    <button
                        className="tri-intro-nav-link tri-intro-nav-link--active"
                        onClick={() => navigate('/middle/grade/7/the-triangle-and-its-properties/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="tri-intro-nav-link"
                        onClick={() => navigate('/middle/grade/7/the-triangle-and-its-properties/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="tri-intro-nav-link"
                        onClick={() => navigate('/middle/grade/7/the-triangle-and-its-properties/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="tri-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="tri-intro-hero-deco tri-intro-hero-deco-a" />
                <div className="tri-intro-hero-deco tri-intro-hero-deco-b" />
                <div className="tri-intro-hero-inner">
                    <h1 className="tri-intro-hero-title">
                        Discover Triangles Through{' '}
                        <span className="tri-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="tri-intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="tri-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="tri-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="tri-intro-cta-strip">
                    <p className="tri-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: Key terms &amp; properties of triangles
                    </p>
                    <button
                        className="tri-intro-cta-btn"
                        onClick={() => navigate('/middle/grade/7/the-triangle-and-its-properties/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
