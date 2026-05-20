import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { organicChemIntroData } from './OrganicChemIntroData';
import '../../../chemistry.css';

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            onClick={() => setOpen(o => !o)}
            style={{
                border: `2px solid ${open ? card.gradFrom + '60' : '#e2e8f0'}`,
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
                background: '#fff', borderRadius: 20,
                cursor: 'pointer', overflow: 'hidden', transition: 'all 0.3s ease',
                marginBottom: 16,
            }}
        >
            <div style={{ height: 4, background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
                <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                    boxShadow: `0 4px 14px ${card.shadow}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>
                    {card.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: card.gradFrom, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 2 }}>{card.q}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#334155' }}>{card.label}</div>
                </div>
                <div style={{ color: open ? card.gradFrom : '#94a3b8', transform: open ? 'rotate(180deg)' : 'none', transition: 'all 0.3s ease', fontSize: 16 }}>▼</div>
            </div>

            {open && (
                <div style={{ padding: '0 24px 24px' }}>
                    <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: '0 0 16px' }}>{card.content}</p>
                    <div style={{ background: `${card.gradFrom}08`, borderLeft: `4px solid ${card.gradFrom}`, borderRadius: '0 12px 12px 0', padding: '14px 18px' }}>
                        <span style={{ color: card.gradFrom, fontWeight: 800 }}>⭐ Fun Fact: </span>
                        <span style={{ fontSize: 14, color: '#475569' }}>{card.fact}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function OrganicChemIntro() {
    const navigate = useNavigate();

    return (
        <div className="chemPage">
            <nav className="chemNav">
                <button className="chemNavBack" onClick={() => navigate('/chemistry/organic')}>
                    ← Back to Dashboard
                </button>
                <div className="chemNavLinks">
                    <button className="chemNavLink chemNavLinkActive">🌟 Intro</button>
                    <button className="chemNavLink" onClick={() => navigate('/chemistry/organic/terminology')}>📖 Terminology</button>
                    <button className="chemNavLink" onClick={() => navigate('/chemistry/organic/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="chemModuleHero" style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)' }}>
                <h1 className="chemModuleTitle">
                    Dive into <span style={{ color: '#fbbf24' }}>Organic Chemistry</span>
                </h1>
                <p className="chemModuleSubtitle">Start with the 6 big questions: Who, What, When, Where, Why, and How.</p>
            </div>

            <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, marginBottom: 28, textAlign: 'center', color: '#0f172a' }}>
                    6 Big Questions
                </h2>

                <div className="chemIntroGrid">
                    {organicChemIntroData.cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div style={{
                    marginTop: 48, padding: '32px', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', flexWrap: 'wrap', gap: 20,
                    background: 'linear-gradient(135deg, #78350f, #92400e)',
                    borderRadius: 24, color: '#fff',
                }}>
                    <div>
                        <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Ready to learn the language?</h3>
                        <p style={{ margin: 0, opacity: 0.8 }}>Next up: Key terms and identities of Organic Chemistry.</p>
                    </div>
                    <button
                        onClick={() => navigate('/chemistry/organic/terminology')}
                        style={{ padding: '12px 28px', background: '#fff', color: '#78350f', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer' }}
                    >
                        Terminology →
                    </button>
                </div>
            </main>
        </div>
    );
}
