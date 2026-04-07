import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../arithmetic.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { rationalCards5W1H } from './RationalNumbersIntroData';

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            onClick={() => setOpen(o => !o)}
            style={{
                background: '#fff',
                borderRadius: 20,
                padding: 24,
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                borderWidth: 2,
                borderStyle: 'solid',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.3s'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div
                    style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 24, flexShrink: 0, color: '#fff'
                    }}
                >
                    {card.icon}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ color: card.gradFrom, fontWeight: 900, fontSize: '1.4rem', fontFamily: '"Outfit", sans-serif', marginBottom: 4 }}>
                        {card.q}
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: 700 }}>{card.label}</div>
                </div>

                <div
                    style={{
                        fontSize: 20,
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease'
                    }}
                >
                    ▼
                </div>
            </div>

            {!open && (
                <div style={{ padding: '16px 0 0 76px', fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>
                    Tap to explore →
                </div>
            )}

            {open && (
                <div style={{ padding: '24px 0 0', marginTop: 24, borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ marginBottom: 16, color: '#334155', lineHeight: 1.6, fontSize: '1.05rem' }}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        style={{
                            padding: 16,
                            borderRadius: 16,
                            background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                            border: `1px solid ${card.gradFrom}30`,
                            fontSize: 14,
                            color: '#0f172a',
                            fontWeight: 600,
                            lineHeight: 1.5
                        }}
                    >
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function RationalNumbersIntro() {
    const navigate = useNavigate();

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className={styles.arithPage}>
            <nav className={styles.introNav}>
                <button
                    className={styles.arithBackBtn}
                    onClick={() => navigate('/arithmetic/rational-numbers')}
                >
                    ← Back to Branch
                </button>

                <div className={styles.arithIntroNavLinks}>
                    <button className={`${styles.arithIntroNavLink} ${styles.arithIntroNavLinkActive}`}>🌟 Introduction</button>
                    <button className={styles.arithIntroNavLink} onClick={() => navigate('/arithmetic/rational-numbers/terminology')}>📖 Terminology</button>
                    <button className={styles.arithIntroNavLink} onClick={() => navigate('/arithmetic/rational-numbers/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ background: '#fff', padding: '60px 20px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', marginBottom: 16 }}>
                        Discover Rational Numbers Through{' '}
                        <span style={{ color: '#14b8a6' }}>6 Big Questions</span>
                    </h1>
                    <p style={{ fontSize: '1.15rem', color: '#64748b' }}>
                        Tap each card to explore quotients, division, and fractions acting as numbers ✨
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px 80px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
                    {rationalCards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div style={{
                    marginTop: 60, padding: 32, background: '#fff', borderRadius: 24,
                    border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}>
                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#475569' }}>
                        Up next: Decimals, percents, and conversions!
                    </p>
                    <button
                        onClick={() => navigate('/arithmetic/rational-numbers/terminology')}
                        style={{
                            padding: '14px 32px', background: '#14b8a6', color: '#fff',
                            border: 'none', borderRadius: 100, fontWeight: 800, fontSize: 16,
                            cursor: 'pointer', boxShadow: '0 8px 24px rgba(20,184,166,0.3)'
                        }}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
