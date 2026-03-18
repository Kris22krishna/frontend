import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../calculus.css';
import MathRenderer from '../../../../../MathRenderer';
import { diffCards5W1H } from './DiffIntroData';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`calc-5w1h-card${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
                cursor: 'pointer'
            }}
        >
            <div className="calc-5w1h-header">
                <div
                    className="calc-5w1h-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                <div style={{ flex: 1 }}>
                    <div className="calc-5w1h-q" style={{ color: card.gradFrom }}>
                        {card.q}
                    </div>
                    <div className="calc-5w1h-label">{card.label}</div>
                </div>

                <div
                    style={{
                        fontSize: 24,
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease'
                    }}
                >
                    ▼
                </div>
            </div>

            {!open && (
                <div style={{ padding: '0 24px 16px', fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>
                    Tap to explore →
                </div>
            )}

            {open && (
                <div className="calc-5w1h-body">
                    <div style={{ marginBottom: 16 }}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        style={{
                            padding: 12,
                            borderRadius: 12,
                            background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                            border: `1px solid ${card.gradFrom}30`,
                            fontSize: 14,
                            color: '#475569'
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
export default function DiffIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="calc-page">
            <nav className="intro-nav">
                <button
                    className="calc-back-btn"
                    onClick={() => navigate('/calculus/differentiation')}
                    style={{ marginBottom: 0 }}
                >
                    ← Back to Differentiation
                </button>

                <div className="intro-nav-links">
                    <button className="intro-nav-link intro-nav-link--active">🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/calculus/differentiation/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/calculus/differentiation/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="calc-module-hero">
                <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
                    <h1 className="calc-section-title">
                        Discover Differentiation Through{' '}
                        <span>6 Big Questions</span>
                    </h1>
                    <p className="calc-section-subtitle" style={{ marginBottom: 0 }}>
                        Tap each card to explore the mathematics of continuous, instantaneous change ✨
                    </p>
                </div>
            </div>

            <div className="calc-section" style={{ paddingTop: 32 }}>
                <div className="calc-5w1h-grid">
                    {diffCards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div style={{
                    marginTop: 40, padding: 24, background: '#fff', borderRadius: 20,
                    border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#475569' }}>
                        Up next: Rules like Product, Quotient, and Chain rule basics!
                    </p>
                    <button
                        onClick={() => navigate('/calculus/differentiation/terminology')}
                        style={{
                            padding: '10px 24px', background: 'var(--calc-rose)', color: '#fff',
                            border: 'none', borderRadius: 100, fontWeight: 700, cursor: 'pointer'
                        }}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
