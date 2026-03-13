import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../NumberSystem.css';
import MathRenderer from '../../../../MathRenderer';
import { cards5W1H } from './NumberSystemIntroData';

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="ns-5w1h-card"
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="ns-5w1h-header"
                onClick={() => setOpen(o => !o)}
                style={{ background: open ? `${card.gradFrom}08` : 'transparent' }}
            >
                <div
                    className="ns-5w1h-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        color: '#fff',
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <div className="ns-5w1h-label" style={{ color: card.gradFrom }}>{card.label}</div>
                    <div className="ns-5w1h-q">{card.q}</div>
                </div>
                <div className={`ns-5w1h-chevron ${open ? 'ns-5w1h-chevron--open' : ''}`} style={{ color: card.gradFrom }}>▼</div>
            </div>

            {open && (
                <div className="ns-5w1h-body">
                    <ul className="ns-5w1h-list">
                        <li className="ns-5w1h-item"><MathRenderer text={card.content} /></li>
                        <li className="ns-5w1h-item" style={{ borderBottom: 'none' }}>
                            <div style={{
                                background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                                padding: '12px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                marginTop: '8px'
                            }}>
                                <span style={{ fontWeight: 800, color: card.gradFrom }}>💡 Fact: </span>
                                <MathRenderer text={card.fact} />
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function NumberSystemIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="ns-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="ns-nav">
                <button
                    className="ns-nav-back"
                    onClick={() => navigate('/senior/grade/9/number-system')}
                >
                    ← Back to Hub
                </button>
                <div className="ns-nav-links">
                    <button
                        className="ns-nav-link ns-nav-link--active"
                        onClick={() => navigate('/senior/grade/9/number-system/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="ns-nav-link"
                        onClick={() => navigate('/senior/grade/9/number-system/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="ns-nav-link"
                        onClick={() => navigate('/senior/grade/9/number-system/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="ns-module-hero">
                <h1 className="ns-module-title">
                    Explore the <span className="ns-accent-text">Number System</span>
                </h1>
                <p className="ns-module-subtitle">
                    Master the foundations of real numbers ✨
                </p>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="ns-section">
                <div className="ns-5w1h-grid" style={{ marginTop: '24px' }}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ color: '#64748b', fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>
                        Up next: Key terms & classification rules
                    </p>
                    <button
                        className="ns-btn-primary"
                        onClick={() => navigate('/senior/grade/9/number-system/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
