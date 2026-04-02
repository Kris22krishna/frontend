import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../simple-equations.css';
import MathRenderer from '../../../../../MathRenderer';
import { INTRO_DATA } from './SimpleEquationsIntroData';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`eq-intro-card${open ? ' eq-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className="eq-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className="eq-intro-card-header">
                {/* Icon */}
                <div
                    className="eq-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className="eq-intro-card-title-block">
                    <div
                        className="eq-intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className="eq-intro-card-sublabel">{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className="eq-intro-card-chevron"
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
                <div className="eq-intro-card-hint">Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className="eq-intro-card-body">
                    <div className="eq-intro-card-content">
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className="eq-intro-card-fact"
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
export default function SimpleEquationsIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="eq-intro-page">

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="eq-intro-nav">
                <button
                    className="eq-intro-nav-back"
                    onClick={() => navigate('/middle/grade/7/simple-equations')}
                >
                    ← Back to Simple Equations
                </button>

                <div className="eq-intro-nav-links">
                    <button
                        className="eq-intro-nav-link eq-intro-nav-link--active"
                        onClick={() => navigate('/middle/grade/7/simple-equations/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="eq-intro-nav-link"
                        onClick={() => navigate('/middle/grade/7/simple-equations/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="eq-intro-nav-link"
                        onClick={() => navigate('/middle/grade/7/simple-equations/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="eq-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="eq-intro-hero-deco eq-intro-hero-deco-a" />
                <div className="eq-intro-hero-deco eq-intro-hero-deco-b" />
                <div className="eq-intro-hero-inner">
                    <h1 className="eq-intro-hero-title">
                        Discover Simple Equations Through{' '}
                        <span className="eq-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="eq-intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="eq-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="eq-intro-grid">
                    {INTRO_DATA.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="eq-intro-cta-strip">
                    <p className="eq-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: Key terms &amp; concepts of equations
                    </p>
                    <button
                        className="eq-intro-cta-btn"
                        onClick={() => navigate('/middle/grade/7/simple-equations/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
