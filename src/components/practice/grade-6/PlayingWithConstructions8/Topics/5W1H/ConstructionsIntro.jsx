import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../playingWithConstructions8.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './ConstructionsIntroData.jsx';

/* 📐 Single card */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['frac-intro-card']} ${open ? styles['frac-intro-card--open'] : ''}`}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['frac-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['frac-intro-card-header']} onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer' }}>
                {/* Icon */}
                <div
                    className={styles['frac-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className={styles['frac-intro-card-title-block']}>
                    <div
                        className={styles['frac-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className={styles['frac-intro-card-sublabel']}>{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className={styles['frac-intro-card-chevron']}
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
                <div className={styles['frac-intro-card-hint']} onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className={styles['frac-intro-card-body']}>
                    {card.interactiveWidget ? (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12 }}>
                            {card.interactiveWidget}
                        </div>
                    ) : card.svg && (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12, overflow: 'auto' }}
                             dangerouslySetInnerHTML={{ __html: card.svg }} />
                    )}
                    <div className={styles['frac-intro-card-content']}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className={styles['frac-intro-card-fact']}
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

/* 📐 Main page */
export default function ConstructionsIntro() {
    const navigate = useNavigate();

    return (
        <div className={styles['frac-intro-page']}>

            {/* TOP NAV BAR */}
            <nav className={styles['frac-intro-nav']}>
                <button
                    className={styles['frac-intro-nav-back']}
                    onClick={() => navigate('/middle/grade/6/playing-with-constructions')}
                >
                    ← Back to Constructions Dashboard
                </button>

                <div className={styles['frac-intro-nav-links']}>
                    <button
                        className={`${styles['frac-intro-nav-link']} ${styles['frac-intro-nav-link--active']}`}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className={styles['frac-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/playing-with-constructions/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className={styles['frac-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/playing-with-constructions/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* HERO BANNER */}
            <div className={styles['frac-intro-hero']} style={{ padding: '16px 24px 20px', background: 'linear-gradient(135deg, #0c4a6e 0%, #164e63 25%, #134e4a 50%, #065f46 75%, #10b981 100%)' }}>
                <div className={`${styles['frac-intro-hero-deco']} ${styles['frac-intro-hero-deco-a']}`} />
                <div className={`${styles['frac-intro-hero-deco']} ${styles['frac-intro-hero-deco-b']}`} />
                <div className={styles['frac-intro-hero-inner']}>
                    <h1 className={styles['frac-intro-hero-title']}>
                        Explore Constructions Through{' '}
                        <span className={styles['frac-intro-hero-highlight']} style={{ background: 'linear-gradient(90deg, #67e8f9 0%, #a5f3fc 40%, #99f6e4 80%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>6 Big Questions</span>
                    </h1>
                    <p className={styles['frac-intro-hero-sub']}>
                        Tap each card to explore 👇
                    </p>
                </div>
            </div>

            {/* 5W1H CARDS GRID */}
            <div className={styles['frac-intro-content']} style={{ padding: '10px 24px 20px' }}>
                <div className={styles['frac-intro-grid']}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className={styles['frac-intro-cta-strip']}>
                    <p className={styles['frac-intro-cta-sub']} style={{ margin: 0 }}>
                        Up next: Key terms & construction vocabulary
                    </p>
                    <button
                        className={styles['frac-intro-cta-btn']}
                        onClick={() => navigate('/middle/grade/6/playing-with-constructions/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
