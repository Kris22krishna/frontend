import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ECFIntroData } from './ECFIntroData';
import MathRenderer from '../../../../MathRenderer';
import ECFNav from '../../ECFNav';
import styles from '../../ecf.module.css';

const BASE = '/senior/grade/12/physics/electric-charges-and-fields';

const prerequisites = [
    {
        icon: '📐',
        title: 'Basic Mathematics',
        desc: 'Algebra, vectors, inverse-square variation, and handling powers of 10 in electrostatic numericals.',
    },
    {
        icon: '➕',
        title: 'Scalars & Vectors',
        desc: 'Electric force and electric field are vectors. Superposition always needs directional addition.',
    },
    {
        icon: '🧪',
        title: 'SI Units',
        desc: 'Coulomb (C), N/C, V/m, and constants like k and ε₀ must be handled cleanly with units.',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={styles['ecf-intro-card']}
            onClick={() => setOpen(o => !o)}
            style={{ borderColor: open ? '#8b5cf660' : '#e2e8f0' }}
        >
            <div
                className={styles['ecf-intro-card-strip']}
                style={{ background: card.gradient }}
            />
            <div className={styles['ecf-intro-card-header']}>
                <div
                    className={styles['ecf-intro-card-icon']}
                    style={{ background: card.gradient }}
                >
                    {card.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <div className={styles['ecf-intro-card-q']}>{card.q}</div>
                    <div className={styles['ecf-intro-card-label']}>
                        <MathRenderer text={card.label} />
                    </div>
                </div>
                <span className={`${styles['ecf-intro-card-chevron']}${open ? ` ${styles['ecf-intro-card-chevron--open']}` : ''}`}>▼</span>
            </div>
            {open && (
                <div className={styles['ecf-intro-card-body']}>
                    <p className={styles['ecf-intro-card-content']} style={{ whiteSpace: 'pre-line' }}>
                        <MathRenderer text={card.content} />
                    </p>
                    <div className={styles['ecf-intro-card-fact']}>
                        <strong style={{ color: '#4a2c8a' }}>⭐ Fun Fact: </strong>
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ECFIntro() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className={styles['ecf-page']}>
            <ECFNav activeTab="intro" />

            <div className={styles['ecf-hero']}>
                <h1 className={styles['ecf-hero-title']}>
                    Electric Charges &amp; <span className={styles['ecf-hero-accent']}>Fields</span>
                </h1>
                <p className={styles['ecf-hero-sub']}>Explore the 6 key questions and check your prerequisites before diving in.</p>
            </div>

            <div className={styles['ecf-section']}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, marginBottom: 20, color: '#0f172a', textAlign: 'center' }}>
                    Prerequisites
                </h2>
                <div className={styles['ecf-prereq-grid']}>
                    {prerequisites.map((p, i) => (
                        <div key={i} className={styles['ecf-prereq-card']}>
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

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, marginBottom: 20, color: '#0f172a', textAlign: 'center' }}>
                    6 Big Questions
                </h2>
                <div className={styles['ecf-intro-grid']}>
                    {ECFIntroData.map((card, i) => <W1HCard key={i} card={card} />)}
                </div>

                <div style={{ marginTop: 48, padding: 28, background: 'linear-gradient(135deg, #120a2e, #4a2c8a)', borderRadius: 20, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>Ready to master the vocabulary?</h3>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>Key terms like field, flux, dipole, and Gauss&apos;s Law — defined precisely.</p>
                    </div>
                    <button
                        onClick={() => navigate(`${BASE}/terminology`)}
                        style={{ padding: '12px 28px', background: '#fff', color: '#120a2e', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer', fontSize: 14, flexShrink: 0 }}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
