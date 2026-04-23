import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mslIntroData } from './MSLIntroData';
import MathRenderer from '../../../../MathRenderer';
import MSLNav from '../../MSLNav';
import styles from '../../msl.module.css';

const BASE = '/senior/grade/11/physics/motion-in-a-straight-line';

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={styles['msl-intro-card']}
            onClick={() => setOpen(o => !o)}
            style={{ borderColor: open ? `${card.gradFrom}60` : '#e2e8f0' }}
        >
            <div className={styles['msl-intro-card-strip']}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }} />
            <div className={styles['msl-intro-card-header']}>
                <div className={styles['msl-intro-card-icon']}
                    style={{ background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})` }}>
                    {card.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <div className={styles['msl-intro-card-q']} style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className={styles['msl-intro-card-label']}>
                        <MathRenderer text={card.label} />
                    </div>
                </div>
                <span className={`${styles['msl-intro-card-chevron']}${open ? ` ${styles['msl-intro-card-chevron--open']}` : ''}`}>▼</span>
            </div>
            {open && (
                <div className={styles['msl-intro-card-body']}>
                    <p className={styles['msl-intro-card-content']}><MathRenderer text={card.content} /></p>
                    <div className={styles['msl-intro-card-fact']}>
                        <strong style={{ color: card.gradFrom }}>⭐ Fun Fact: </strong>
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MSLIntro() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className={styles['msl-page']}>
            <MSLNav activeTab="intro" />

            <div className={styles['msl-hero']}>
                <h1 className={styles['msl-hero-title']}>
                    Motion in a <span className={styles['msl-hero-accent']}>Straight Line</span>
                </h1>
                <p className={styles['msl-hero-sub']}>Explore the 6 key questions and check your prerequisites before diving in.</p>
            </div>

            <div className={styles['msl-section']}>
                {/* Prerequisites */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, marginBottom: 20, color: '#0f172a', textAlign: 'center' }}>
                    Prerequisites
                </h2>
                <div className={styles['msl-prereq-grid']}>
                    {mslIntroData.prerequisites.map((p, i) => (
                        <div key={i} className={styles['msl-prereq-card']}>
                            <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 900, margin: '0 0 6px', color: '#0f172a' }}>
                                <MathRenderer text={p.title} />
                            </h3>
                            <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.6 }}>
                                <MathRenderer text={p.desc} />
                            </p>
                        </div>
                    ))}
                </div>

                {/* 5W1H Cards */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, marginBottom: 20, color: '#0f172a', textAlign: 'center' }}>
                    6 Big Questions
                </h2>
                <div className={styles['msl-intro-grid']}>
                    {mslIntroData.cards5W1H.map((card, i) => <W1HCard key={i} card={card} />)}
                </div>

                {/* Footer CTA */}
                <div style={{ marginTop: 48, padding: 28, background: 'linear-gradient(135deg, #0f172a, #134e4a)', borderRadius: 20, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>Ready to master the vocabulary?</h3>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>Key terms like displacement, velocity, and acceleration — defined precisely.</p>
                    </div>
                    <button
                        onClick={() => navigate(`${BASE}/terminology`)}
                        style={{ padding: '12px 28px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer', fontSize: 14, flexShrink: 0 }}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
