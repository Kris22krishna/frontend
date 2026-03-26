import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ourCommunityIntroData } from './OurCommunityIntroData.jsx';
import styles from '../../OurCommunityShared.module.css';

/* ── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    const gradFrom = card.color;
    const gradTo = card.color + 'aa';
    const shadow = card.color + '40';

    return (
        <div
            className={`${styles['chem-intro-card']} ${open ? styles['chem-intro-card--open'] : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className={styles['chem-card-strip']}
                style={{ background: `linear-gradient(90deg, ${gradFrom}, ${gradTo})` }}
            />

            {/* Header row */}
            <div className={styles['chem-intro-card-header']}>
                {/* Icon */}
                <div
                    className={styles['chem-intro-card-icon']}
                    style={{
                        background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                        boxShadow: `0 4px 14px ${shadow}`,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24, // Assuming some icons might be emojis/text
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div style={{ flex: 1 }}>
                    <div
                        className={styles['chem-intro-card-q']}
                        style={{ color: gradFrom, textTransform: 'uppercase' }}
                    >
                        {card.id}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                        {card.q}
                    </div>
                </div>

                {/* Chevron */}
                <div
                    style={{
                        color: open ? gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                        transition: 'all 0.3s ease',
                        fontSize: 16
                    }}
                >
                    ▼
                </div>
            </div>

            {/* Expanded content */}
            {open && (
                <div className={styles['chem-intro-card-body']}>
                    <div style={{ marginBottom: 20, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                        {card.visual}
                    </div>
                    <p className={styles['chem-intro-card-content']}>{card.content}</p>
                    <div className={styles['chem-intro-card-fact']}>
                        <span style={{ color: gradFrom, fontWeight: 800 }}>⭐ Fun Fact: </span>
                        {card.fact}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main page ───────────────────────────────────── */
export default function OurCommunityIntro() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['chemPage']} style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <nav className={styles['chemNav']}>
                <button className={styles['chemNavBack']} onClick={() => navigate('/junior/grade/4/science/our-community')}>
                    ← Back to Dashboard
                </button>
            </nav>

            <div className={styles['chemHero']} style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)' }}>
                <h1 className={styles['chemHeroTitle']}>Dive into <span style={{ color: '#a5b4fc' }}>Our Community</span></h1>
                <p className={styles['chemHeroSub']}>Get started with the 6 big questions and check your prerequisites.</p>
            </div>

            <main className={styles['chem-topic-shell']} style={{ maxWidth: '1180px', margin: '0 auto', padding: '32px 24px 60px' }}>
                {/* Prerequisites */}
                <section className={styles['chem-section-mb']} style={{ marginBottom: 40 }}>
                    <h2 className={styles['chem-section-header']} style={{ fontSize: 28, fontWeight: 900, marginBottom: 24, color: '#1e293b' }}>What you should know</h2>
                    <div className={styles['chem-grid']} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, padding: 0 }}>
                        {ourCommunityIntroData.prerequisites.map((p, idx) => (
                            <div key={idx} className={`${styles['chem-concept-card']}`} style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                                <div style={{ fontSize: 32, marginBottom: 12 }}>✔️</div>
                                <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#334155' }}>Prerequisite {idx + 1}</h3>
                                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                                    {p}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5W1H Cards Grid */}
                <h2 className={styles['chem-section-header']} style={{ fontSize: 28, fontWeight: 900, marginBottom: 24, color: '#1e293b' }}>6 Big Questions</h2>
                <div className={styles['chem-grid']} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, padding: 0 }}>
                    {ourCommunityIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div style={{ marginTop: 60, padding: 36, borderRadius: 24, background: '#1e1b4b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
                    <div>
                        <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready to learn the language?</h3>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: 16 }}>Next up: Key terms and vocabulary.</p>
                    </div>
                    <button
                        onClick={() => navigate('/junior/grade/4/science/our-community/terminology')}
                        style={{ padding: '14px 32px', background: '#fff', color: '#1e1b4b', borderRadius: 100, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
