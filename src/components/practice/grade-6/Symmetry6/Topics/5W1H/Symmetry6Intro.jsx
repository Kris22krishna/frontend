import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../symmetry6.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { cards5W1H } from './Symmetry6IntroData.jsx';

/* 🦋 Single card */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['sym-intro-card']} ${open ? styles['sym-intro-card--open'] : ''}`}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['sym-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['sym-intro-card-header']} onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer' }}>
                {/* Icon */}
                <div
                    className={styles['sym-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className={styles['sym-intro-card-title-block']}>
                    <div
                        className={styles['sym-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className={styles['sym-intro-card-sublabel']}>{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className={styles['sym-intro-card-chevron']}
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
                <div className={styles['sym-intro-card-hint']} onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>Tap to explore →</div>
            )}

            {/* Expanded content */}
            {open && (
                <div className={styles['sym-intro-card-body']}>
                    {card.interactiveWidget ? (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12 }}>
                            {card.interactiveWidget}
                        </div>
                    ) : card.svg && (
                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 12, overflow: 'auto' }}
                             dangerouslySetInnerHTML={{ __html: card.svg }} />
                    )}
                    <div className={styles['sym-intro-card-content']}>
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className={styles['sym-intro-card-fact']}
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

/* 🦋 Main page */
export default function Symmetry6Intro() {
    const navigate = useNavigate();

    return (
        <div className={styles['sym-intro-page']}>

            {/* TOP NAV BAR */}
            <nav className={styles['sym-intro-nav']}>
                <button
                    className={styles['sym-intro-nav-back']}
                    onClick={() => navigate('/middle/grade/6/symmetry-6')}
                >
                    ← Back to Symmetry Dashboard
                </button>

                <div className={styles['sym-intro-nav-links']}>
                    <button
                        className={`${styles['sym-intro-nav-link']} ${styles['sym-intro-nav-link--active']}`}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className={styles['sym-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/symmetry-6/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className={styles['sym-intro-nav-link']}
                        onClick={() => navigate('/middle/grade/6/symmetry-6/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* HERO BANNER */}
            <div className={styles['sym-intro-hero']} style={{ padding: '16px 24px 20px', background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 25%, #0ea5e9 50%, #3b82f6 75%, #6366f1 100%)' }}>
                <div className={`${styles['sym-intro-hero-deco']} ${styles['sym-intro-hero-deco-a']}`} />
                <div className={`${styles['sym-intro-hero-deco']} ${styles['sym-intro-hero-deco-b']}`} />
                <div className={styles['sym-intro-hero-inner']}>
                    <h1 className={styles['sym-intro-hero-title']}>
                        Discover Symmetry Through{' '}
                        <span className={styles['sym-intro-hero-highlight']} style={{ background: 'linear-gradient(90deg, #fde047 0%, #fef08a 40%, #fdba74 80%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>6 Big Questions</span>
                    </h1>
                    <p className={styles['sym-intro-hero-sub']}>
                        Tap each card to explore 👇
                    </p>
                </div>
            </div>

            {/* 5W1H CARDS GRID */}
            <div className={styles['sym-intro-content']} style={{ padding: '10px 24px 20px' }}>
                <div className={styles['sym-intro-grid']}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className={styles['sym-intro-cta-strip']}>
                    <p className={styles['sym-intro-cta-sub']} style={{ margin: 0 }}>
                        Up next: Key terms &amp; visual symmetry concepts
                    </p>
                    <button
                        className={styles['sym-intro-cta-btn']}
                        onClick={() => navigate('/middle/grade/6/symmetry-6/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
