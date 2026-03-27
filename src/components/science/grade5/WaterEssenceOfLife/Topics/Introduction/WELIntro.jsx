import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { welIntroData } from './WELIntroData';
import styles from '../../WaterEssenceOfLifeDashboard.module.css';

/* ── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['wel-intro-card']} ${open ? styles['wel-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['wel-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['wel-intro-card-header']}>
                <div
                    className={styles['wel-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                <div style={{ flex: 1 }}>
                    <div
                        className={styles['wel-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                        {card.label}
                    </div>
                </div>

                <div
                    style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: open ? card.gradFrom : '#f1f5f9',
                        color: open ? '#fff' : '#94a3b8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: '14px',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {open ? '−' : '+'}
                </div>
            </div>

            {/* Expandable body */}
            {open && (
                <div className={styles['wel-intro-card-body']}>
                    <div className={styles['wel-intro-card-content']}>
                        {card.content}
                    </div>
                    {card.fact && (
                        <div className={styles['wel-intro-card-fact']}>
                            {card.fact}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Main Page ───────────────────────────────────── */
export default function WELIntro() {
    const navigate = useNavigate();
    const data = welIntroData;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className={styles['wel-page']}>
            {/* Navigation */}
            <div className={styles['wel-nav']}>
                <button className={styles['wel-nav-back']} onClick={() => navigate('/middle/grade/5/science/water-essence-of-life')}>
                    ← Dashboard
                </button>
                <div className={styles['wel-nav-links']}>
                    <button className={`${styles['wel-nav-link']} ${styles['active']}`}>🌟 Introduction</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate('/middle/grade/5/science/water-essence-of-life/terminology')}>📖 Terminology</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate('/middle/grade/5/science/water-essence-of-life/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate('/middle/grade/5/science/water-essence-of-life/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate('/middle/grade/5/science/water-essence-of-life/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </div>

            {/* Hero */}
            <div className={styles['wel-hero']}>
                <h1 className={styles['wel-hero-title']}>{data.title}</h1>
                <p className={styles['wel-hero-sub']}>{data.subtitle}</p>
            </div>

            {/* Prerequisites */}
            <div style={{ maxWidth: 700, margin: '30px auto', padding: '0 24px' }}>
                <div style={{
                    background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '20px 24px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ fontWeight: 800, marginBottom: 8, color: '#0ea5e9' }}>📝 What you should already know</div>
                    <ul style={{ margin: 0, paddingLeft: 20, color: '#64748b', lineHeight: 1.7 }}>
                        {data.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                </div>
            </div>

            {/* 5W1H Cards */}
            <div className={styles['wel-grid']}>
                {data.cards.map((card, idx) => (
                    <W1HCard key={idx} card={card} />
                ))}
            </div>
        </div>
    );
}
