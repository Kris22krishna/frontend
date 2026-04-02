import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../mensuration6.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './Mensuration6IntroData.jsx';

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['men-intro-card']} ${open ? styles['men-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['men-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['men-intro-card-header']}>
                {/* Icon */}
                <div
                    className={styles['men-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className={styles['men-intro-card-title-block']}>
                    <div
                        className={styles['men-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className={styles['men-intro-card-sublabel']}>{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className={styles['men-intro-card-chevron']}
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
                <div className={styles['men-intro-card-hint']}>Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className={styles['men-intro-card-body']}>
                    {card.svg && (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12, overflow: 'auto' }}
                             dangerouslySetInnerHTML={{ __html: card.svg }} />
                    )}
                    <div className={styles['men-intro-card-content']}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className={styles['men-intro-card-fact']}
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
export default function Mensuration6Intro() {
    const navigate = useNavigate();

    return (
        <div className={styles['men-intro-page']}>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className={styles['men-intro-nav']}>
                <button
                    className={styles['men-intro-nav-back']}
                    onClick={() => navigate('/middle/grade/6/mensuration-6')}
                >
                    ← Back to Perimeter & Area Dashboard
                </button>

                <div className={styles['men-intro-nav-links']}>
                    <button
                        className={`${styles['men-intro-nav-link']} ${styles['men-intro-nav-link--active']}`}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className={styles['men-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/mensuration-6/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className={styles['men-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/mensuration-6/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className={styles['men-intro-hero']} style={{ padding: '16px 24px 20px' }}>
                <div className={`${styles['men-intro-hero-deco']} ${styles['men-intro-hero-deco-a']}`} />
                <div className={`${styles['men-intro-hero-deco']} ${styles['men-intro-hero-deco-b']}`} />
                <div className={styles['men-intro-hero-inner']}>
                    <h1 className={styles['men-intro-hero-title']}>
                        Discover Mensuration Through{' '}
                        <span className={styles['men-intro-hero-highlight']}>6 Big Questions</span>
                    </h1>
                    <p className={styles['men-intro-hero-sub']}>
                        Tap each card to explore ✨
                    </p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className={styles['men-intro-content']} style={{ padding: '10px 24px 20px' }}>
                <div className={styles['men-intro-grid']}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className={styles['men-intro-cta-strip']}>
                    <p className={styles['men-intro-cta-sub']} style={{ margin: 0 }}>
                        Up next: Key terms & formulas
                    </p>
                    <button
                        className={styles['men-intro-cta-btn']}
                        onClick={() => navigate('/middle/grade/6/mensuration-6/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
