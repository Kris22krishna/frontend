import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../fishtale.css';

const QUESTIONS = [
    { label: 'WHAT', q: 'What is "The Fish Tale"?', icon: '🐟', color: '#0ea5e9', desc: 'A story of numbers, fishing, and real-world math application.' },
    { label: 'WHY', q: 'Why study large numbers?', icon: '🔢', color: '#0284c7', desc: 'To understand the scale of our world, from thousands to lakhs.' },
    { label: 'WHO', q: 'Who uses this math?', icon: '🛶', color: '#0369a1', desc: 'Fishermen, merchants, and anyone dealing with trade and quantities.' },
    { label: 'WHEN', q: 'When do we round numbers?', icon: '⏲️', color: '#075985', desc: 'When exact values aren\'t needed, but a quick estimate is.' },
    { label: 'WHERE', q: 'Where do we see lakhs?', icon: '🏙️', color: '#0ea5e9', desc: 'In populations, large sales, and government data.' },
    { label: 'HOW', q: 'How to compare big numbers?', icon: '⚖️', color: '#0284c7', desc: 'By looking at place value from the highest digit down.' }
];

export default function FishTaleIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/the-fish-tale')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ fontWeight: 800, color: '#0ea5e9' }}>🌟 Intro</span>
                    <span style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => navigate('/the-fish-tale/terminology')}>📖 Terminology</span>
                    <span style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => navigate('/the-fish-tale/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 24px' }}>
                <h1 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 900, marginBottom: 8 }}>Introduction: <span style={{ color: '#0ea5e9' }}>5W1H</span></h1>
                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 40 }}>Understanding the core of The Fish Tale through six big questions.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                    {QUESTIONS.map((item, i) => (
                        <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, padding: 32, transition: 'all 0.3s ease', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                <div style={{ fontSize: 24, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}10`, borderRadius: 12 }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 900, color: item.color, letterSpacing: 1 }}>{item.label}</div>
                                    <div style={{ fontSize: 18, fontWeight: 800 }}>{item.q}</div>
                                </div>
                            </div>
                            <p style={{ color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
