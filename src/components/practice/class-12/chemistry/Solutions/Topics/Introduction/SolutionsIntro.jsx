import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { solutionsIntroData } from './SolutionsIntroData';
import styles from '../../SolutionsDashboard.module.css';
import MathRenderer from '../../../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { SLUG_TO_NODE_ID } from '@/lib/curriculumIds';

/* ── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['sol-intro-card']} ${open ? styles['sol-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['sol-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['sol-intro-card-header']}>
                {/* Icon */}
                <div
                    className={styles['sol-intro-card-icon']}
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
                        className={styles['sol-intro-card-q']}
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
                <div className={styles['sol-intro-card-body']}>
                    <p className={styles['sol-intro-card-content']}><MathRenderer text={card.content} /></p>
                    <div className={styles['sol-intro-card-fact']}>
                        <span style={{ color: card.gradFrom, fontWeight: 800 }}>⭐ Fun Fact: </span>
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main page ───────────────────────────────────── */
export default function SolutionsIntro() {
    const navigate = useNavigate();

    const { startSession, finishSession, abandonSession } = useSessionLogger();
    const nodeId = SLUG_TO_NODE_ID['g12-chem-solutions-introduction'];

    useEffect(() => {
        window.scrollTo(0, 0);
        startSession({ nodeId, sessionType: 'practice' });

        return () => {
            abandonSession({ totalQuestions: 1 }); // Just tracking visit
        };
    }, [nodeId, startSession, abandonSession]);

    return (
        <div className={styles['sol-page']}>
            <nav className={styles['sol-nav']}>
                <button className={styles['sol-nav-back']} onClick={() => navigate('/senior/grade/12/chemistry/solutions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['sol-nav-links']}>
                    <button className={`${styles['sol-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/12/chemistry/solutions/introduction')}>🌟 Intro</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/terminology')}>📖 Terminology</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/exam-edge')}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles['sol-hero']}>
                <h1 className={styles['sol-hero-title']}>Dive into <span className={styles['sol-hero-accent--violet']}>Solutions</span></h1>
                <p className={styles['sol-hero-sub']}>Get started with the 6 big questions and check your prerequisites.</p>
            </div>

            <main className={styles['sol-topic-shell']}>
                {/* Prerequisites */}
                <section className={styles['sol-section-mb']}>
                    <h2 className={styles['sol-section-header']}>Prerequisites</h2>
                    <div className={styles['sol-grid']} style={{ padding: 0 }}>
                        {solutionsIntroData.prerequisites.map((p, idx) => (
                            <div key={idx} className={`${styles['sol-concept-card']} ${styles['sol-prereq-card']}`}>
                                <div className={styles['sol-prereq-icon']}>{p.icon}</div>
                                <h3 className={styles['sol-prereq-title']}>
                                    <MathRenderer text={p.title} />
                                </h3>
                                <p className={styles['sol-prereq-desc']}>
                                    <MathRenderer text={p.desc} />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5W1H Cards Grid */}
                <h2 className={styles['sol-section-header']}>6 Big Questions</h2>
                <div className={styles['sol-grid']} style={{ padding: 0 }}>
                    {solutionsIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div className={styles['sol-topic-cta']}>
                    <div>
                        <h3>Ready to learn the language?</h3>
                        <p>Next up: Key terms and vocabulary.</p>
                    </div>
                    <button
                        className={styles['sol-topic-cta-button']}
                        onClick={() => navigate('/senior/grade/12/chemistry/solutions/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
