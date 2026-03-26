import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wwsIntroData } from './WWSIntroData';
import styles from '../../WonderfulWorldOfScienceDashboard.module.css';

/* ── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['wws-intro-card']} ${open ? styles['wws-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['wws-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['wws-intro-card-header']}>
                <div
                    className={styles['wws-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                <div style={{ flex: 1 }}>
                    <div
                        className={styles['wws-intro-card-q']}
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
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    ▼
                </div>
            </div>

            {/* Expanded content */}
            {open && (
                <div className={styles['wws-intro-card-body']}>
                    <p className={styles['wws-intro-card-content']}>{card.content}</p>
                    <div className={styles['wws-intro-card-fact']}>
                        <span style={{ color: card.gradFrom, fontWeight: 800 }}>⭐ Fun Fact: </span>
                        {card.fact}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main page ───────────────────────────────────── */
export default function WWSIntro() {
    const navigate = useNavigate();
    const BASE = '/middle/grade/6/science/wonderful-world-of-science';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['wws-page']}>
            <nav className={styles['wws-nav']}>
                <button className={styles['wws-nav-back']} onClick={() => navigate(BASE)}>
                    ← Back to Dashboard
                </button>
                <div className={styles['wws-nav-links']}>
                    <button className={`${styles['wws-nav-link']} ${styles['active']}`} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/core-concepts`)}>🎯 Core Concepts</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/connectomics`)}>🔗 Connectomics</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/virtual-lab`)}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['wws-hero']}>
                <h1 className={styles['wws-hero-title']}>Dive into <span className={styles['wws-hero-accent--violet']}>The Wonderful World of Science</span></h1>
                <p className={styles['wws-hero-sub']}>Get started with the 6 big questions and check your prerequisites.</p>
            </div>

            <main className={styles['wws-topic-shell']}>
                {/* Prerequisites */}
                <section className={styles['wws-section-mb']}>
                    <h2 className={styles['wws-section-header']}>Prerequisites</h2>
                    <div className={styles['wws-grid']} style={{ padding: 0 }}>
                        {wwsIntroData.prerequisites.map((p, idx) => (
                            <div key={idx} className={`${styles['wws-concept-card']} ${styles['wws-prereq-card']}`}>
                                <div className={styles['wws-prereq-icon']}>{p.icon}</div>
                                <h3 className={styles['wws-prereq-title']}>{p.title}</h3>
                                <p className={styles['wws-prereq-desc']}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5W1H Cards Grid */}
                <h2 className={styles['wws-section-header']}>6 Big Questions</h2>
                <div className={styles['wws-grid']} style={{ padding: 0 }}>
                    {wwsIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div className={styles['wws-topic-cta']}>
                    <div>
                        <h3>Ready to learn the language?</h3>
                        <p>Next up: Key terms and vocabulary.</p>
                    </div>
                    <button
                        className={styles['wws-topic-cta-button']}
                        onClick={() => navigate(`${BASE}/terminology`)}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
