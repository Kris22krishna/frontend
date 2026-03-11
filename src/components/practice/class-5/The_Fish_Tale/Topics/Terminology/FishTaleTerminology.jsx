import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../fishtale.css';

const TERMS = [
    { name: 'Lakh', def: 'A unit in the Indian numbering system equal to 1,00,000 (one hundred thousand).', ex: '1,00,000' },
    { name: 'Estimation', def: 'A rough calculation or judgement of a value, quantity, or number.', ex: 'Rounding 9,999 to 10,000' },
    { name: 'Place Value', def: 'The value of a digit based on its position in a number.', ex: 'In 1,23,456, the 2 is in the ten-thousands place.' },
    { name: 'Rounding', def: 'Making a number simpler but keeping its value close to what it was.', ex: '45 rounded to the nearest ten is 50.' },
    { name: 'Numerical Data', def: 'Information that is something that can be measured or counted.', ex: 'The speed of a log boat vs a motor boat.' }
];

export default function FishTaleTerminology() {
    const navigate = useNavigate();

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/the-fish-tale')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => navigate('/the-fish-tale/introduction')}>🌟 Intro</span>
                    <span style={{ fontWeight: 800, color: '#0ea5e9' }}>📖 Terminology</span>
                    <span style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => navigate('/the-fish-tale/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 24px' }}>
                <h1 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 900, marginBottom: 8 }}>Terminology: <span style={{ color: '#0ea5e9' }}>The Fish Tale</span></h1>
                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 40 }}>Mastering the language of large numbers and logistics.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                    {TERMS.map((term, i) => (
                        <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, padding: 32, transition: 'all 0.3s ease', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <div style={{ fontSize: 20, fontWeight: 800, color: '#0ea5e9', marginBottom: 8 }}>{term.name}</div>
                            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{term.def}</p>
                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: 12, border: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Example</div>
                                <div style={{ fontWeight: 700, color: '#0369a1', fontFamily: 'JetBrains Mono', fontSize: 13 }}>{term.ex}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
