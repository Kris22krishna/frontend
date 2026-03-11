import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { structureOfAtomIntroData } from './StructureOfAtomIntroData';
import '../../StructureOfAtomBranch.css';

/* ── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`atom-intro-card${open ? ' atom-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className="atom-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className="atom-intro-card-header">
                {/* Icon */}
                <div
                    className="atom-intro-card-icon"
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
                        className="atom-intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{card.label}</div>
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
                <div className="atom-intro-card-body">
                    <p className="atom-intro-card-content">{card.content}</p>
                    <div className="atom-intro-card-fact">
                        <span style={{ color: card.gradFrom, fontWeight: 800 }}>⭐ Fun Fact: </span>
                        {card.fact}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main page ───────────────────────────────────── */
export default function StructureOfAtomIntro() {
    const navigate = useNavigate();

    return (
        <div className="atom-page">
            <nav className="atom-nav">
                <button className="atom-nav-back" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom')}>
                    ← Back to Dashboard
                </button>
                <div className="atom-nav-links">
                    <button className="atom-nav-link active" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/introduction')}>🌟 Intro</button>
                    <button className="atom-nav-link" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/terminology')}>📖 Terminology</button>
                    <button className="atom-nav-link" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="atom-hero">
                <h1 className="atom-hero-title">Dive into <span style={{ color: '#0ea5e9' }}>Structure of Atom</span></h1>
                <p className="atom-hero-sub">Get started with the 6 big questions and check your prerequisites.</p>
            </div>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
                {/* Prerequisites */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '24px', textAlign: 'center', color: 'var(--atom-indigo)' }}>
                        Prerequisites
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {structureOfAtomIntroData.prerequisites.map((p, idx) => (
                            <div key={idx} style={{ background: '#fff', padding: '32px 24px', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', transition: 'all 0.3s ease' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{p.icon}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 8px', color: 'var(--atom-text)' }}>{p.title}</h3>
                                <p style={{ fontSize: '15px', color: 'var(--atom-muted)', margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5W1H Cards Grid */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: 'var(--atom-indigo)' }}>
                    6 Big Questions
                </h2>
                <div className="atom-grid" style={{ padding: 0 }}>
                    {structureOfAtomIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div style={{ 
                    marginTop: '60px', 
                    padding: '32px', 
                    background: 'linear-gradient(135deg, #1e1b4b, #312e81)', 
                    borderRadius: '24px', 
                    color: '#fff', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px' }}>Ready to learn the language?</h3>
                        <p style={{ margin: 0, opacity: 0.8 }}>Next up: Key terms and the definitions of atomic structure.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/terminology')}
                        style={{ padding: '12px 28px', background: '#fff', color: '#1e1b4b', border: 'none', borderRadius: '100px', fontWeight: 800, cursor: 'pointer' }}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
