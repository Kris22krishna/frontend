import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../patterns.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './PatternsIntroData';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['pat-intro-card']} ${open ? styles['pat-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['pat-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['pat-intro-card-header']}>
                {/* Icon */}
                <div
                    className={styles['pat-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className={styles['pat-intro-card-title-block']}>
                    <div
                        className={styles['pat-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className={styles['pat-intro-card-sublabel']}>{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className={styles['pat-intro-card-chevron']}
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
                <div className={styles['pat-intro-card-hint']}>Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className={styles['pat-intro-card-body']}>
                    {card.svg && (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12, overflow: 'auto' }}
                             dangerouslySetInnerHTML={{ __html: card.svg }} />
                    )}
                    <div className={styles['pat-intro-card-content']}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className={styles['pat-intro-card-fact']}
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
export default function PatternsIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className={styles['pat-intro-page']}>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className={styles['pat-intro-nav']}>
                <button
                    className={styles['pat-intro-nav-back']}
                    onClick={() => navigate('/middle/grade/6/patterns-in-mathematics')}
                >
                    ← Back to Patterns Dashboard
                </button>

                <div className={styles['pat-intro-nav-links']}>
                    <button
                        className={`${styles['pat-intro-nav-link']} ${styles['pat-intro-nav-link--active']}`}
                        onClick={() => navigate('/middle/grade/6/patterns-in-mathematics/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className={styles['pat-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/patterns-in-mathematics/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className={styles['pat-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/patterns-in-mathematics/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className={styles['pat-intro-hero']} style={{ padding: '16px 24px 20px' }}>
                <div className={`${styles['pat-intro-hero-deco']} ${styles['pat-intro-hero-deco-a']}`} />
                <div className={`${styles['pat-intro-hero-deco']} ${styles['pat-intro-hero-deco-b']}`} />
                <div className={styles['pat-intro-hero-inner']}>
                    <h1 className={styles['pat-intro-hero-title']}>
                        Discover Patterns Through{' '}
                        <span className={styles['pat-intro-hero-highlight']}>6 Big Questions</span>
                    </h1>
                    <p className={styles['pat-intro-hero-sub']}>
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className={styles['pat-intro-content']} style={{ padding: '10px 24px 20px' }}>
                <div className={styles['pat-intro-grid']}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className={styles['pat-intro-cta-strip']}>
                    <p className={styles['pat-intro-cta-sub']} style={{ margin: 0 }}>
                        Up next: Key terms &amp; sequence types
                    </p>
                    <button
                        className={styles['pat-intro-cta-btn']}
                        onClick={() => navigate('/middle/grade/6/patterns-in-mathematics/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
