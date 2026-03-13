import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lawsOfMotionIntroData } from './LawsOfMotionIntroData';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../../LawsOfMotionBranch.css';

/* ── Helper to render Math ─────────────────────────────────── */
const renderTextWithMath = (text) => {
    // Splits the text by $...$ to render InlineMath
    const parts = text.split(/(\$[^$]+\$)/g);
    return parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
            const mathExp = part.slice(1, -1);
            return <InlineMath key={index} math={mathExp} />;
        }
        return <span key={index}>{part}</span>;
    });
};

/* ── Single card component ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`lom-intro-card${open ? ' lom-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            {/* Gradient top strip */}
            <div
                className="lom-intro-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            {/* Header row */}
            <div className="lom-intro-card-header">
                {/* Icon */}
                <div
                    className="lom-intro-card-icon"
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
                        className="lom-intro-card-q"
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
                <div className="lom-intro-card-body">
                    <p className="lom-intro-card-content">{renderTextWithMath(card.content)}</p>
                    <div className="lom-intro-card-fact">
                        <span style={{ color: card.gradFrom, fontWeight: 800 }}>⭐ Fun Fact: </span>
                        {renderTextWithMath(card.fact)}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main page component ───────────────────────────────────── */
export default function LawsOfMotionIntro() {
    const navigate = useNavigate();

    return (
        <div className="lom-page">
            <nav className="lom-nav">
                <button className="lom-nav-back" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion')}>
                    ← Back to Dashboard
                </button>
                <div className="lom-nav-links">
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/connectomics')}>🧠 Connectomics</button>
                    <button className="lom-nav-link active">🌟 Intro</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/terminology')}>📖 Terminology</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/skills')}>🎯 Skills</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/exam-edge')}>⚡ Exam Edge</button>
                </div>
            </nav>

            <div className="lom-hero">
                <h1 className="lom-hero-title">
                    <span style={{ color: '#6366f1', fontWeight: 900, fontStyle: 'italic' }}>Dive into</span> <span style={{ color: '#1e293b', fontWeight: 900 }}>Laws of Motion</span>
                </h1>
                <p className="lom-hero-sub">Get started with the 6 big questions and check your prerequisites.</p>
            </div>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
                {/* Prerequisites Section */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '24px', textAlign: 'center', color: 'var(--lom-indigo)' }}>
                        Prerequisites
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {lawsOfMotionIntroData.prerequisites.map((p, idx) => (
                            <div key={idx} style={{ background: '#fff', padding: '32px 24px', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', transition: 'all 0.3s ease' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{p.icon}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 8px', color: 'var(--lom-text)' }}>{p.title}</h3>
                                <p style={{ fontSize: '15px', color: 'var(--lom-muted)', margin: 0, lineHeight: 1.6 }}>{renderTextWithMath(p.desc)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5W1H Cards Section */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: 'var(--lom-indigo)' }}>
                    6 Big Questions
                </h2>
                <div className="lom-grid" style={{ padding: 0 }}>
                    {lawsOfMotionIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div style={{ 
                    marginTop: '60px', 
                    padding: '32px', 
                    background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', 
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
                        <p style={{ margin: 0, opacity: 0.8 }}>Next up: Key terms and theoretical definitions of motion.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/terminology')}
                        style={{ padding: '12px 28px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: '100px', fontWeight: 800, cursor: 'pointer' }}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
