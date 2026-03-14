import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../fishtale.css';
import MathRenderer from '../../../../../MathRenderer';

const TERMS = [
    { name: 'Lakh', def: 'A unit in the Indian numbering system equal to $1,00,000$ (one hundred thousand).', ex: '$1,00,000$' },
    { name: 'Estimation', def: 'A rough calculation or judgement of a value, quantity, or number.', ex: 'Rounding $9,999$ to $10,000$' },
    { name: 'Place Value', def: 'The value of a digit based on its position in a number.', ex: 'In $1,23,456$, the $2$ is in the ten-thousands place.' },
    { name: 'Rounding', def: 'Making a number simpler but keeping its value close to what it was.', ex: '$45$ rounded to the nearest ten is $50$.' },
    { name: 'Numerical Data', def: 'Information that is something that can be measured or counted.', ex: 'The speed of a log boat vs a motor boat.' }
];

export default function FishTaleTerminology() {
    const navigate = useNavigate();

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/the-fish-tale')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/the-fish-tale/introduction')}>🌟 Intro</span>
                    <span style={{ fontWeight: 800, color: '#0369a1' }}>📖 Terminology</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/the-fish-tale/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="ft-content" style={{ padding: '32px 24px 80px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 16 }}>
                        <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: 4, color: '#0f172a' }}>Terminology: <span style={{ color: '#0ea5e9' }}>Fish Tale</span></h1>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>Mastering the language of large numbers and logistics.</p>
                    </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {TERMS.map((term, i) => (
                        <div key={i} style={{ 
                            background: '#fff', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '20px', 
                            padding: '24px', 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                            transition: 'all 0.3s ease', 
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)' 
                        }}>
                            <div style={{ fontSize: 18, fontWeight: 800, color: '#0ea5e9' }}>{term.name}</div>
                            <p style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.5, margin: 0 }}>
                                <MathRenderer text={term.def} />
                            </p>
                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: 12, border: '1px solid #f1f5f9', marginTop: 'auto' }}>
                                <div style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Example</div>
                                <div style={{ fontWeight: 700, color: '#0369a1', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
                                    <MathRenderer text={term.ex} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}
