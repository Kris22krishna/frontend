import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { matterIntroData } from './MatterIntroData';
import styles from '../../MatterInOurSurroundingsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { ChevronDown, Sparkles, Binary, Zap } from 'lucide-react';

/* ── Single 5W1H card ─────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles['matter-intro-card']} ${open ? styles['matter-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom : 'rgba(226, 232, 240, 0.6)',
                boxShadow: open ? `0 12px 32px ${card.shadow}` : '0 4px 12px rgba(0,0,0,0.03)',
            }}
        >
            <div
                className={styles['matter-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            <div className={styles['matter-intro-card-header']}>
                <div
                    className={styles['matter-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 6px 16px ${card.shadow}`,
                    }}
                >
                    <span style={{ fontSize: '24px' }}>{card.icon}</span>
                </div>

                <div style={{ flex: 1 }}>
                    <div
                        className={styles['matter-intro-card-q']}
                        style={{ color: card.gradFrom, fontSize: '13px', letterSpacing: '2px', opacity: 0.8 }}
                    >
                        {card.q}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                        <MathRenderer text={card.label} />
                    </div>
                </div>

                <div
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <ChevronDown size={22} strokeWidth={3} />
                </div>
            </div>

            {open && (
                <div className={styles['matter-intro-card-body']}>
                    <p className={styles['matter-intro-card-content']} style={{ fontSize: '16px', lineHeight: 1.7 }}>
                        <MathRenderer text={card.content} />
                    </p>
                    <div className={styles['matter-intro-card-fact']} style={{ background: `${card.gradFrom}08`, border: `1px solid ${card.gradFrom}15` }}>
                        <span style={{ color: card.gradFrom, fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <Sparkles size={14} /> DID YOU KNOW?
                        </span>
                        <div style={{ color: '#334155' }}>
                            <MathRenderer text={card.fact} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main Introduction Page ────────────────────────── */
export default function MatterIntro() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['matter-page']}>
            <nav className={styles['matter-nav']}>
                <button className={styles['matter-nav-back']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['matter-nav-links']}>
                    <button className={`${styles['matter-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/introduction')}>🌟 Intro</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/terminology')}>📖 Terminology</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['matter-hero']} style={{ padding: '80px 24px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', opacity: 0.1 }}>
                    <Binary size={400} style={{ position: 'absolute', top: '-100px', right: '-100px' }} />
                </div>
                <h1 className={styles['matter-hero-title']}>
                    Exploring the <span className={styles['matter-hero-accent-glow']}>Nature of Matter</span>
                </h1>
                <p className={styles['matter-hero-sub']} style={{ fontSize: '1.2rem', maxWidth: '750px' }}>
                    Everything you see, touch, or smell is part of a grand cosmic construction. Let's start by understanding the building blocks of our universe.
                </p>
            </div>

            <main className={styles['matter-topic-shell']}>
                
                {/* 1. Prerequisites Section */}
                <section className={styles['matter-section-mb']}>
                    <div className={styles['matter-section-header']}>
                        <Zap size={24} style={{ color: '#0d9488' }} />
                        <span>Essentials to Keep in Mind</span>
                    </div>
                    <div className={styles['matter-intro-prereq-grid']}>
                        {matterIntroData.prerequisites.map((p, idx) => (
                            <div 
                                key={idx} 
                                className={styles['matter-prereq-card']}
                                style={{
                                    '--prereq-color': p.color,
                                    '--prereq-glow': p.glow,
                                    '--prereq-shadow': p.shadow
                                }}
                            >
                                <div className={styles['matter-prereq-icon-box']}>
                                    {p.icon}
                                </div>
                                <h3 className={styles['matter-prereq-title']}>
                                    <MathRenderer text={p.title} />
                                </h3>
                                <p className={styles['matter-prereq-desc']}>
                                    <MathRenderer text={p.desc} />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. 5W1H Section */}
                <div style={{ margin: '80px 0 32px' }}>
                    <h2 className={styles['matter-section-header']}>
                        <Sparkles size={24} style={{ color: '#4f46e5' }} />
                        <span>The 6 Dimensional View</span>
                    </h2>
                </div>
                <div className={styles['matter-grid']} style={{ padding: 0 }}>
                    {matterIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* 3. Premium Footer CTA */}
                <div className={styles['matter-topic-cta-premium']}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>Mastered the Basics?</h3>
                        <p style={{ fontSize: '18px', opacity: 0.9 }}>Next, let's explore the essential vocabulary used by scientists.</p>
                    </div>
                    <button
                        className={styles['matter-topic-cta-button-premium']}
                        onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/terminology')}
                    >
                        Learn Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
