import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../Trigonometry/trigonometry.module.css';

export default function LinesInSpaceDashboard() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const CARDS = [
        { id: 'intro', path: '/coordinate-geometry/lines-in-space/introduction', tagline: 'Learn', title: 'Introduction', desc: 'Discover how lines behave in 3D space — from vector equations to skew lines.', emoji: '💡', gradFrom: '#f43f5e', gradTo: '#f43f5eCC', shadow: '#f43f5e44' },
        { id: 'terms', path: '/coordinate-geometry/lines-in-space/terminology', tagline: 'Memory', title: 'Terminology', desc: 'Master vector forms, parametric equations, shortest distance, and coplanarity conditions.', emoji: '🧠', gradFrom: '#8b5cf6', gradTo: '#8b5cf6CC', shadow: '#8b5cf644' },
        { id: 'skills', path: '/coordinate-geometry/lines-in-space/skills', tagline: 'Practice & Test', title: 'Skills', desc: 'Solve problems on line equations, angles between lines, and skew line distances.', emoji: '🎯', gradFrom: '#0ea5e9', gradTo: '#0ea5e9CC', shadow: '#0ea5e944' }
    ];
    return (
        <div className={styles.arithFullpage}>
            <div className={styles.arithLeft} style={{ background: 'linear-gradient(145deg, #1c1917 0%, #44403c 25%, #78716c 55%, #e11d48 80%, #f43f5e 100%)' }}>
                <div className={`${styles.arithDeco} ${styles.arithDecoA}`} /><div className={`${styles.arithDeco} ${styles.arithDecoB}`} />
                <div className={styles.arithLeftContent}>
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}><span style={{ fontSize: '0.9rem', display: 'block', marginBottom: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800 }}>Branch 3 · Vectors</span>Lines In<br /><span className={styles.arithTitleAccent} style={{ background: 'linear-gradient(135deg, #fb7185, #fda4af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Space</span></h1>
                    <p className={styles.arithMainSub}>Study vector equations of lines, angles between them, skew lines, and shortest distances in 3D.</p>
                    <div className={styles.arithStatsGrid}>{[{ val: '6', label: 'Big Questions', c: '#f43f5e' }, { val: '7', label: 'Key Terms', c: '#8b5cf6' }, { val: '3', label: 'Skills', c: '#0ea5e9' }].map(s => <div className={styles.arithStat} key={s.label}><span className={styles.arithStatNum} style={{ color: s.c }}>{s.val}</span><span className={styles.arithStatLbl}>{s.label}</span></div>)}</div>
                </div>
            </div>
            <div className={styles.arithRight}>
                <button onClick={() => navigate('/coordinate-geometry')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 100, width: 'fit-content', background: '#fff', border: '1.5px solid #e2e8f0', fontSize: 14, fontWeight: 700, color: '#334155', cursor: 'pointer', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>🏠 Dashboard</button>
                <p className={styles.arithRightEyebrow}>Explore Lines In Space</p>
                <div className={styles.arithCardsCol}>{CARDS.map(b => (<button key={b.id} className={styles.arithCardBtn} onClick={() => navigate(b.path)}><div className={styles.arithCardStrip} style={{ background: `linear-gradient(180deg, ${b.gradFrom}, ${b.gradTo})` }} /><div className={styles.arithCardIcon} style={{ background: `linear-gradient(135deg, ${b.gradFrom}, ${b.gradTo})`, boxShadow: `0 6px 20px ${b.shadow}` }}>{b.emoji}</div><div className={styles.arithCardText}><div className={styles.arithCardLabel} style={{ color: b.gradFrom }}>{b.title}</div><div className={styles.arithCardTagline}>{b.tagline}</div><div className={styles.arithCardDesc}>{b.desc}</div></div><div className={styles.arithCardChevron} style={{ color: b.gradFrom }}>{'>'}</div></button>))}</div>
            </div>
        </div>
    );
}