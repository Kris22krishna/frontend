import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../geometry.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { mensurationCards5W1H } from './MensurationIntroData';

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={styles.w1hCard} onClick={() => setOpen(o => !o)} style={{ borderColor: open ? card.gradFrom + '60' : '#e2e8f0', boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)', cursor: 'pointer' }}>
            <div className={styles.w1hHeader}>
                <div className={styles.w1hIcon} style={{ background: `linear-gradient(135deg,${card.gradFrom},${card.gradTo})`, boxShadow: `0 4px 14px ${card.shadow}` }}>{card.icon}</div>
                <div style={{ flex: 1 }}><div className={styles.w1hQ} style={{ color: card.gradFrom }}>{card.q}</div><div className={styles.w1hLabel}>{card.label}</div></div>
                <div style={{ fontSize: 24, color: open ? card.gradFrom : '#94a3b8', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>▼</div>
            </div>
            {!open && <div style={{ padding: '0 24px 16px', fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>Tap to explore →</div>}
            {open && <div className={styles.w1hBody}><div style={{ marginBottom: 16 }}><MathRenderer text={card.content} /></div><div style={{ padding: 12, borderRadius: 12, background: `linear-gradient(135deg,${card.gradFrom}12,${card.gradTo}18)`, border: `1px solid ${card.gradFrom}30`, fontSize: 14, color: '#475569' }}><MathRenderer text={card.fact} /></div></div>}
        </div>
    );
}

export default function MensurationIntro5W1H() {
    const navigate = useNavigate();
    return (
        <div className={styles.page}>
            <nav className={styles.introNav}>
                <button className={styles.backBtn} onClick={() => navigate('/geometry/mensuration')} style={{ marginBottom: 0 }}>← Back to Mensuration</button>
                <div className={styles.introNavLinks}>
                    <button className={`${styles.introNavLink} ${styles.introNavLinkActive}`}>🌟 Introduction</button>
                    <button className={styles.introNavLink} onClick={() => navigate('/geometry/mensuration/terminology')}>📖 Terminology</button>
                    <button className={styles.introNavLink} onClick={() => navigate('/geometry/mensuration/skills')}>🎯 Skills</button>
                </div>
            </nav>
            <div className={styles.moduleHero}><div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}><h1 className={styles.sectionTitle}>Discover Mensuration Through <span className={styles.sectionTitleAccent}>6 Big Questions</span></h1><p className={styles.sectionSubtitle} style={{ marginBottom: 0 }}>Tap each card to understand the art and science of measurement ✨</p></div></div>
            <div className={styles.section} style={{ paddingTop: 32 }}>
                <div className={styles.w1hGrid}>{mensurationCards5W1H.map((card, idx) => <W1HCard key={idx} card={card} />)}</div>
                <div style={{ marginTop: 40, padding: 24, background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#475569' }}>Up next: Area, perimeter, surface area, and volume formulas!</p>
                    <button onClick={() => navigate('/geometry/mensuration/terminology')} style={{ padding: '10px 24px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 700, cursor: 'pointer' }}>Terminology →</button>
                </div>
            </div>
        </div>
    );
}
