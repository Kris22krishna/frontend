import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../dataHandling6.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './DataHandling6IntroData.jsx';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['dh-intro-card']} ${open ? styles['dh-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['dh-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['dh-intro-card-header']}>
                {/* Icon */}
                <div
                    className={styles['dh-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className={styles['dh-intro-card-title-block']}>
                    <div
                        className={styles['dh-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className={styles['dh-intro-card-sublabel']}>{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className={styles['dh-intro-card-chevron']}
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
                <div className={styles['dh-intro-card-hint']}>Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className={styles['dh-intro-card-body']}>
                    {card.svg && (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12, overflow: 'auto' }}
                             dangerouslySetInnerHTML={{ __html: card.svg }} />
                    )}
                    <div className={styles['dh-intro-card-content']}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className={styles['dh-intro-card-fact']}
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
export default function DataHandling6Intro() {
    const navigate = useNavigate();

    return (
        <div className={styles['dh-intro-page']}>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className={styles['dh-intro-nav']}>
                <button
                    className={styles['dh-intro-nav-back']}
                    onClick={() => navigate('/middle/grade/6/data-handling-6')}
                >
                    ← Back to Data Handling Dashboard
                </button>

                <div className={styles['dh-intro-nav-links']}>
                    <button
                        className={`${styles['dh-intro-nav-link']} ${styles['dh-intro-nav-link--active']}`}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className={styles['dh-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/data-handling-6/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className={styles['dh-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/data-handling-6/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className={styles['dh-intro-hero']} style={{ padding: '16px 24px 20px' }}>
                <div className={`${styles['dh-intro-hero-deco']} ${styles['dh-intro-hero-deco-a']}`} />
                <div className={`${styles['dh-intro-hero-deco']} ${styles['dh-intro-hero-deco-b']}`} />
                <div className={styles['dh-intro-hero-inner']}>
                    <h1 className={styles['dh-intro-hero-title']}>
                        Discover Data Through{' '}
                        <span className={styles['dh-intro-hero-highlight']}>6 Big Questions</span>
                    </h1>
                    <p className={styles['dh-intro-hero-sub']}>
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className={styles['dh-intro-content']} style={{ padding: '10px 24px 20px' }}>
                <div className={styles['dh-intro-grid']}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className={styles['dh-intro-cta-strip']}>
                    <p className={styles['dh-intro-cta-sub']} style={{ margin: 0 }}>
                        Up next: Key terms &amp; visual charts
                    </p>
                    <button
                        className={styles['dh-intro-cta-btn']}
                        onClick={() => navigate('/middle/grade/6/data-handling-6/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
