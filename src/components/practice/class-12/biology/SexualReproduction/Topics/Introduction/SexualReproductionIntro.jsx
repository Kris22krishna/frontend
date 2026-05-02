import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { srIntroData } from './SexualReproductionIntroData';
import '../../SexualReproductionBranch.css';

/* ── Single Image-Based Card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`sr-intro-card${open ? ' sr-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                borderColor: open ? card.gradFrom : '#e2e8f0',
                boxShadow: open ? `0 12px 40px ${card.shadow}` : '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '20px',
                background: '#fff',
                height: '100%',
            }}
        >
            {/* Image Header */}
            <div style={{
                width: '100%',
                height: '200px',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: `4px solid ${card.gradFrom}`
            }}>
                <img 
                    src={card.image} 
                    alt={card.label} 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: open ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.5s ease',
                    }}
                />
                {/* Overlay Gradient */}
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '80px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                }} />
                
                {/* Title overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '20px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px'
                }}>
                    <span style={{ 
                        fontFamily: 'Outfit, sans-serif', 
                        fontSize: '28px', 
                        fontWeight: 900, 
                        color: '#fff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>{card.q}</span>
                    <span style={{ 
                        fontSize: '16px', 
                        fontWeight: 600, 
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                    }}>{card.label}</span>
                </div>
            </div>

            {/* Content Body */}
            <div style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
            }}>
                <p style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#475569',
                    margin: '0 0 16px 0',
                    display: open ? 'block' : '-webkit-box',
                    WebkitLineClamp: open ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                }}>
                    {card.content}
                </p>

                {open && (
                    <div style={{
                        marginTop: 'auto',
                        padding: '16px',
                        borderRadius: '12px',
                        background: `${card.gradFrom}10`,
                        borderLeft: `4px solid ${card.gradFrom}`,
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        <span style={{ color: card.gradFrom, fontWeight: 800, display: 'block', marginBottom: '4px' }}>⭐ Fascinating Fact: </span>
                        <span style={{ fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>{card.fact}</span>
                    </div>
                )}
                
                {!open && (
                    <div style={{
                        marginTop: 'auto',
                        textAlign: 'right',
                        color: card.gradFrom,
                        fontWeight: 700,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px'
                    }}>
                        Click to read more <span>▼</span>
                    </div>
                )}
                {open && (
                    <div style={{
                        marginTop: '16px',
                        textAlign: 'right',
                        color: '#94a3b8',
                        fontWeight: 700,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px'
                    }}>
                        Show less <span>▲</span>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Main page ───────────────────────────────────── */
export default function SexualReproductionIntro() {
    const navigate = useNavigate();

    return (
        <div className="sr-page">
            <nav className="sr-nav">
                <button className="sr-nav-back" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction')}>
                    ← Back to Dashboard
                </button>
                <div className="sr-nav-links">
                    <div className="sr-nav-link active">Introduction</div>
                    <div className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/terminology')}>Terminology</div>
                    <div className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/skills')}>Skills</div>
                    <div className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/connectomics')}>Connectomics</div>
                    <div className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/exam-edge')}>Exam Edge</div>
                </div>
            </nav>

            <header className="sr-hero" style={{ background: 'linear-gradient(145deg, #10b981 0%, #059669 100%)' }}>
                <h1 className="sr-hero-title">Introduction</h1>
                <p className="sr-hero-sub">Get started with the 6 big questions surrounding Sexual Reproduction in Angiosperms.</p>
            </header>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
                
                {/* 5W1H Cards Grid */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: 'var(--sr-indigo)' }}>
                    The 6 Big Questions
                </h2>
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                }}>
                    {srIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div style={{ 
                    marginTop: '60px', 
                    padding: '32px', 
                    background: 'linear-gradient(135deg, #064e3b, #065f46)', 
                    borderRadius: '24px', 
                    color: '#fff', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                    boxShadow: '0 12px 40px rgba(6, 78, 59, 0.2)'
                }}>
                    <div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, margin: '0 0 8px' }}>Ready to learn the language?</h3>
                        <p style={{ margin: 0, opacity: 0.85, fontSize: '15px' }}>Next up: Master the key botanical terms for this chapter.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/terminology')}
                        style={{ padding: '14px 32px', background: '#fff', color: '#064e3b', border: 'none', borderRadius: '100px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
