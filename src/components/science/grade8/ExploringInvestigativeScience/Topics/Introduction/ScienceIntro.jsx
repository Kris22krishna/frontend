import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scienceIntroData } from './ScienceIntroData';
import styles from '../../InvestigativeScienceDashboard.module.css';

/* ── Single 5W1H card ─────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['inv-intro-card']}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className={styles['inv-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />
            <div className={styles['inv-intro-card-header']}>
                <div
                    className={styles['inv-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <div className={styles['inv-intro-card-q']} style={{ color: card.gradFrom }}>
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
            {open && (
                <div className={styles['inv-intro-card-body']}>
                    <p className={styles['inv-intro-card-content']}>{card.content}</p>
                    <div className={styles['inv-intro-card-fact']}>
                        <span style={{ color: card.gradFrom, fontWeight: 800 }}>⭐ Fun Fact: </span>
                        {card.fact}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main page ───────────────────────────────────── */
export default function ScienceIntro() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navLinks = [
        { path: '/senior/grade/8/science/investigative-science/introduction', label: '🌟 Intro', active: true },
        { path: '/senior/grade/8/science/investigative-science/terminology', label: '📖 Terminology', active: false },
        { path: '/senior/grade/8/science/investigative-science/core-concepts', label: '🎯 Core Concepts', active: false },
        { path: '/senior/grade/8/science/investigative-science/connectomics', label: '🔗 Connectomics', active: false },
        { path: '/senior/grade/8/science/investigative-science/virtual-lab', label: '🧪 Virtual Lab', active: false },
    ];

    return (
        <div className={styles['inv-page']}>
            <nav className={styles['inv-nav']}>
                <button className={styles['inv-nav-back']} onClick={() => navigate('/senior/grade/8/science/investigative-science')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['inv-nav-links']}>
                    {navLinks.map(l => (
                        <button
                            key={l.path}
                            className={`${styles['inv-nav-link']} ${l.active ? styles['active'] : ''}`}
                            onClick={() => navigate(l.path)}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className={styles['inv-hero']}>
                <h1 className={styles['inv-hero-title']}>
                    Welcome to <span className={styles['inv-hero-accent--teal']}>Investigative Science</span>
                </h1>
                <p className={styles['inv-hero-sub']}>
                    Discover what it truly means to think and act like a scientist. Ask questions. Test ideas. Find answers.
                </p>
            </div>

            <main className={styles['inv-topic-shell']} style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

                {/* ── Prerequisites ── */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '28px',
                        fontWeight: 900,
                        marginBottom: '24px',
                        textAlign: 'center',
                        color: '#4f46e5',
                    }}>
                        Prerequisites
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
                        gap: '24px',
                    }}>
                        {scienceIntroData.prerequisites.map((p, idx) => (
                            <div key={idx} style={{
                                background: '#fff',
                                padding: '32px 24px',
                                borderRadius: '24px',
                                border: '1px solid #e2e8f0',
                                textAlign: 'center',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.3s ease',
                            }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{p.icon}</div>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 900,
                                    margin: '0 0 8px',
                                    color: '#0f172a',
                                    fontFamily: 'Outfit, sans-serif',
                                }}>
                                    {p.title}
                                </h3>
                                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.65 }}>
                                    {p.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 5W1H Cards ── */}
                <h2 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '28px',
                    fontWeight: 900,
                    margin: '0 0 24px',
                    textAlign: 'center',
                    color: '#4f46e5',
                }}>
                    6 Big Questions of Science
                </h2>
                <div className={styles['inv-grid']} style={{ padding: 0, marginBottom: '48px' }}>
                    {scienceIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div className={styles['inv-topic-cta']}>
                    <div>
                        <h3>Ready to learn the scientific vocabulary?</h3>
                        <p>Next up: Key terms and investigation vocabulary.</p>
                    </div>
                    <button
                        className={styles['inv-topic-cta-button']}
                        onClick={() => navigate('/senior/grade/8/science/investigative-science/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
