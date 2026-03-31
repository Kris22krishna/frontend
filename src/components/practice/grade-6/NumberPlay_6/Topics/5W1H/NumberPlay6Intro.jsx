import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../NumberPlay_6.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './NumberPlay6IntroData.jsx';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['np6-intro-card']} ${open ? styles['np6-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['np6-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['np6-intro-card-header']}>
                {/* Icon */}
                <div
                    className={styles['np6-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className={styles['np6-intro-card-title-block']}>
                    <div
                        className={styles['np6-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className={styles['np6-intro-card-sublabel']}>{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className={styles['np6-intro-card-chevron']}
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
                <div className={styles['np6-intro-card-hint']}>Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className={styles['np6-intro-card-body']}>
                    {card.svg && (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12, overflow: 'auto' }}
                             dangerouslySetInnerHTML={{ __html: card.svg }} />
                    )}
                    <div className={styles['np6-intro-card-content']}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className={styles['np6-intro-card-fact']}
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
export default function NumberPlay6Intro() {
    const navigate = useNavigate();

    return (
        <div className={styles['np6-intro-page']}>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className={styles['np6-intro-nav']}>
                <button
                    className={styles['np6-intro-nav-back']}
                    onClick={() => navigate('/middle/grade/6/number-play-chapter')}
                >
                    ← Back to Number Play
                </button>

                <div className={styles['np6-intro-nav-links']}>
                    <button
                        className={`${styles['np6-intro-nav-link']} ${styles['np6-intro-nav-link--active']}`}
                    >
                        🌟 Intro
                    </button>
                    <button
                        className={styles['np6-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/number-play-chapter/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className={styles['np6-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/number-play-chapter/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className={styles['np6-intro-hero']} style={{ padding: '16px 24px 20px' }}>
                <div className={`${styles['np6-intro-hero-deco']} ${styles['np6-intro-hero-deco-a']}`} />
                <div className={`${styles['np6-intro-hero-deco']} ${styles['np6-intro-hero-deco-b']}`} />
                <div className={styles['np6-intro-hero-inner']}>
                    <h1 className={styles['np6-intro-hero-title']}>
                        Discover Numbers Through{' '}
                        <span className={styles['np6-intro-hero-highlight']}>6 Big Questions</span>
                    </h1>
                    <p className={styles['np6-intro-hero-sub']}>
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className={styles['np6-intro-content']} style={{ padding: '10px 24px 20px' }}>
                <div className={styles['np6-intro-grid']}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className={styles['np6-intro-cta-strip']}>
                    <p className={styles['np6-intro-cta-sub']} style={{ margin: 0 }}>
                        Up next: Key terms & concepts
                    </p>
                    <button
                        className={styles['np6-intro-cta-btn']}
                        onClick={() => navigate('/middle/grade/6/number-play-chapter/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
