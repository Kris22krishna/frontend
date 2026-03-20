import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coordinateGeometryIntroData } from './CoordinateGeometryIntroData';
import '../../CoordinateGeometryBranch.css';
import MathRenderer from '../../../../../MathRenderer';

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`rn-intro-card${open ? ' rn-intro-card--open' : ''}`}
            onClick={() => setOpen((prev) => !prev)}
            style={{
                borderColor: open ? `${card.gradFrom}60` : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)'
            }}
        >
            <div className="rn-card-strip" style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }} />

            <div className="rn-intro-card-header">
                <div
                    className="rn-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`
                    }}
                >
                    {card.icon}
                </div>

                <div style={{ flex: 1 }}>
                    <div className="rn-intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                        <MathRenderer text={card.label} />
                    </div>
                </div>

                <div style={{ color: open ? card.gradFrom : '#94a3b8', transform: open ? 'rotate(180deg)' : 'none', transition: 'all 0.3s ease' }}>
                    ▼
                </div>
            </div>

            {open && (
                <div className="rn-intro-card-body">
                    <p className="rn-intro-card-content"><MathRenderer text={card.content} /></p>
                    <div className="rn-intro-card-fact">
                        <span style={{ color: card.gradFrom, fontWeight: 800 }}>Quick Insight: </span>
                        <MathRenderer text={card.fact} />
                     </div>
                </div>
            )}
        </div>
    );
}

export default function CoordinateGeometryIntro() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="rn-page">
            <nav className="rn-nav">
                <button className="rn-nav-back" onClick={() => navigate('/senior/grade/10/coordinate-geometry')}>
                    ← Back to Dashboard
                </button>
                <div className="rn-nav-links">
                    <button className="rn-nav-link active" onClick={() => navigate('/senior/grade/10/coordinate-geometry/introduction')}>📈 Intro</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/coordinate-geometry/terminology')}>📘 Terminology</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/coordinate-geometry/skills')}>🎯 Skills</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/coordinate-geometry/connectomics')}>🔗 Connectomics</button>
                </div>
            </nav>

            <div className="rn-hero" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1d4ed8 100%)' }}>
                <h1 className="rn-hero-title">Dive into <span style={{ color: '#7dd3fc' }}>Coordinate Geometry</span></h1>
                <p className="rn-hero-sub">Start with the big ideas behind plotting points, measuring distance on a plane, and calculating area algebraically.</p>
            </div>

            <main className="rn-topic-shell" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '24px', textAlign: 'center', color: 'var(--rn-indigo)' }}>
                        Prerequisites
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px' }}>
                        {coordinateGeometryIntroData.prerequisites.map((item, idx) => (
                            <div key={idx} style={{ background: '#fff', padding: '32px 24px', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 8px', color: 'var(--rn-text)' }}>
                                    <MathRenderer text={item.title} />
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--rn-muted)', margin: 0, lineHeight: 1.6 }}>
                                    <MathRenderer text={item.desc} />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: 'var(--rn-indigo)' }}>
                    6 Big Questions
                </h2>
                <div className="rn-grid" style={{ padding: 0 }}>
                    {coordinateGeometryIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div style={{ marginTop: '60px', padding: '32px', background: 'linear-gradient(135deg, #0f172a, #1d4ed8)', borderRadius: '24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px' }}>Ready for coordinate language?</h3>
                        <p style={{ margin: 0, opacity: 0.8 }}>Next up: key terms, formulas, and the language of the Cartesian plane.</p>
                    </div>
                    <button
                        onClick={() => navigate('/senior/grade/10/coordinate-geometry/terminology')}
                        style={{ padding: '12px 28px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: '100px', fontWeight: 800, cursor: 'pointer' }}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
