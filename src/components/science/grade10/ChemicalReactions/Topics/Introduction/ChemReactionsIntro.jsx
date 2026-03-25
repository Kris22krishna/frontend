import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chemReactionsIntroData } from './ChemReactionsIntroData';
import styles from '../../ChemicalReactionsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';

/* ── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['chem-intro-card']} ${open ? styles['chem-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['chem-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['chem-intro-card-header']}>
                {/* Icon */}
                <div
                    className={styles['chem-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div style={{ flex: 1 }}>
                    <div
                        className={styles['chem-intro-card-q']}
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                        <MathRenderer text={card.label} />
                    </div>
                </div>

                {/* Chevron */}
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
                <div className={styles['chem-intro-card-body']}>
                    <p className={styles['chem-intro-card-content']}><MathRenderer text={card.content} /></p>
                    <div className={styles['chem-intro-card-fact']}>
                        <span style={{ color: card.gradFrom, fontWeight: 800 }}>⭐ Fun Fact: </span>
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main page ───────────────────────────────────── */
export default function ChemReactionsIntro() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['chem-page']}>
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['chem-hero']}>
                <h1 className={styles['chem-hero-title']}>Dive into <span className={styles['chem-hero-accent--violet']}>Chemical Reactions</span></h1>
                <p className={styles['chem-hero-sub']}>Get started with the 6 big questions and check your prerequisites.</p>
            </div>

            <main className={styles['chem-topic-shell']}>
                {/* Prerequisites */}
                <section className={styles['chem-section-mb']}>
                    <h2 className={styles['chem-section-header']}>Prerequisites</h2>
                    <div className={styles['chem-grid']} style={{ padding: 0 }}>
                        {chemReactionsIntroData.prerequisites.map((p, idx) => (
                            <div key={idx} className={`${styles['chem-concept-card']} ${styles['chem-prereq-card']}`}>
                                <div className={styles['chem-prereq-icon']}>{p.icon}</div>
                                <h3 className={styles['chem-prereq-title']}>
                                    <MathRenderer text={p.title} />
                                </h3>
                                <p className={styles['chem-prereq-desc']}>
                                    <MathRenderer text={p.desc} />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5W1H Cards Grid */}
                <h2 className={styles['chem-section-header']}>6 Big Questions</h2>
                <div className={styles['chem-grid']} style={{ padding: 0 }}>
                    {chemReactionsIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div className={styles['chem-topic-cta']}>
                    <div>
                        <h3>Ready to learn the language?</h3>
                        <p>Next up: Key terms and vocabulary.</p>
                    </div>
                    <button
                        className={styles['chem-topic-cta-button']}
                        onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
