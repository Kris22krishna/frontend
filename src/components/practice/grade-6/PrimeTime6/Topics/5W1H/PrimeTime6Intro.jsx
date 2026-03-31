import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../primeTime6.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './PrimeTime6IntroData.jsx';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['pt-intro-card']} ${open ? styles['pt-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['pt-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['pt-intro-card-header']}>
                {/* Icon */}
                <div
                    className={styles['pt-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className={styles['pt-intro-card-title-block']}>
                    <div
                        className={styles['pt-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className={styles['pt-intro-card-sublabel']}>{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className={styles['pt-intro-card-chevron']}
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
                <div className={styles['pt-intro-card-hint']}>Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className={styles['pt-intro-card-body']}>
                    {card.svg && (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12, overflow: 'auto' }}
                             dangerouslySetInnerHTML={{ __html: card.svg }} />
                    )}
                    <div className={styles['pt-intro-card-content']}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className={styles['pt-intro-card-fact']}
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
export default function PrimeTime6Intro() {
    const navigate = useNavigate();

    return (
        <div className={styles['pt-intro-page']}>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className={styles['pt-intro-nav']}>
                <button
                    className={styles['pt-intro-nav-back']}
                    onClick={() => navigate('/middle/grade/6/prime-time')}
                >
                    ← Back to Prime Time Dashboard
                </button>

                <div className={styles['pt-intro-nav-links']}>
                    <button
                        className={`${styles['pt-intro-nav-link']} ${styles['pt-intro-nav-link--active']}`}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className={styles['pt-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/prime-time/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className={styles['pt-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/prime-time/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className={styles['pt-intro-hero']} style={{ padding: '16px 24px 20px' }}>
                <div className={`${styles['pt-intro-hero-deco']} ${styles['pt-intro-hero-deco-a']}`} />
                <div className={`${styles['pt-intro-hero-deco']} ${styles['pt-intro-hero-deco-b']}`} />
                <div className={styles['pt-intro-hero-inner']}>
                    <h1 className={styles['pt-intro-hero-title']}>
                        Discover Prime Time Through{' '}
                        <span className={styles['pt-intro-hero-highlight']}>6 Big Questions</span>
                    </h1>
                    <p className={styles['pt-intro-hero-sub']}>
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className={styles['pt-intro-content']} style={{ padding: '10px 24px 20px' }}>
                <div className={styles['pt-intro-grid']}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className={styles['pt-intro-cta-strip']}>
                    <p className={styles['pt-intro-cta-sub']} style={{ margin: 0 }}>
                        Up next: Key terms &amp; vocabulary
                    </p>
                    <button
                        className={styles['pt-intro-cta-btn']}
                        onClick={() => navigate('/middle/grade/6/prime-time/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
