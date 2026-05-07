import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../Trigonometry/trigonometry.module.css';

export default function ThreeDGeometryDashboard() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const CARDS = [
        { id: 'intro', path: '/coordinate-geometry/3d-geometry/introduction', tagline: 'Learn', title: 'Introduction', desc: 'Discover 3D coordinate systems, octants, and the leap from 2D to 3D spatial reasoning.', emoji: '💡', gradFrom: '#0ea5e9', gradTo: '#0ea5e9CC', shadow: '#0ea5e944' },
        { id: 'terms', path: '/coordinate-geometry/3d-geometry/terminology', tagline: 'Memory', title: 'Terminology', desc: 'Master direction cosines, direction ratios, 3D distance formula, and octant classification.', emoji: '🧠', gradFrom: '#6366f1', gradTo: '#6366f1CC', shadow: '#6366f144' },
        { id: 'skills', path: '/coordinate-geometry/3d-geometry/skills', tagline: 'Practice & Test', title: 'Skills', desc: 'Solve 3D distance, section formula, and direction cosine problems step by step.', emoji: '🎯', gradFrom: '#f59e0b', gradTo: '#f59e0bCC', shadow: '#f59e0b44' }
    ];

    return (
        <div className={styles.arithFullpage}>
            <div className={styles.arithLeft} style={{ background: 'linear-gradient(145deg, #020617 0%, #0c4a6e 25%, #0369a1 55%, #0284c7 80%, #0ea5e9 100%)' }}>
                <div className={`${styles.arithDeco} ${styles.arithDecoA}`} />
                <div className={`${styles.arithDeco} ${styles.arithDecoB}`} />
                <div className={styles.arithLeftContent}>
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        <span style={{ fontSize: '0.9rem', display: 'block', marginBottom: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800 }}>Branch 2 · Spatial</span>
                        3D Coordinate
                        <br />
                        <span className={styles.arithTitleAccent} style={{ background: 'linear-gradient(135deg, #38bdf8, #7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Geometry</span>
                    </h1>
                    <p className={styles.arithMainSub}>Extend your understanding to three dimensions — octants, direction cosines, and spatial distances.</p>
                    <div className={styles.arithStatsGrid}>
                        {[{ val: '6', label: 'Big Questions', c: CARDS[0].gradFrom }, { val: '8', label: 'Key Terms', c: CARDS[1].gradFrom }, { val: '3', label: 'Skills', c: CARDS[2].gradFrom }].map(s => (
                            <div className={styles.arithStat} key={s.label}><span className={styles.arithStatNum} style={{ color: s.c }}>{s.val}</span><span className={styles.arithStatLbl}>{s.label}</span></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.arithRight}>
                <button onClick={() => navigate('/coordinate-geometry')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 100, width: 'fit-content', background: '#fff', border: '1.5px solid #e2e8f0', fontSize: 14, fontWeight: 700, color: '#334155', cursor: 'pointer', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>🏠 Dashboard</button>
                <p className={styles.arithRightEyebrow}>Explore 3D Coordinate Geometry</p>
                <div className={styles.arithCardsCol}>
                    {CARDS.map(b => (
                        <button key={b.id} className={styles.arithCardBtn} onClick={() => navigate(b.path)}>
                            <div className={styles.arithCardStrip} style={{ background: `linear-gradient(180deg, ${b.gradFrom}, ${b.gradTo})` }} />
                            <div className={styles.arithCardIcon} style={{ background: `linear-gradient(135deg, ${b.gradFrom}, ${b.gradTo})`, boxShadow: `0 6px 20px ${b.shadow}` }}>{b.emoji}</div>
                            <div className={styles.arithCardText}>
                                <div className={styles.arithCardLabel} style={{ color: b.gradFrom }}>{b.title}</div>
                                <div className={styles.arithCardTagline}>{b.tagline}</div>
                                <div className={styles.arithCardDesc}>{b.desc}</div>
                            </div>
                            <div className={styles.arithCardChevron} style={{ color: b.gradFrom }}>{'>'}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}