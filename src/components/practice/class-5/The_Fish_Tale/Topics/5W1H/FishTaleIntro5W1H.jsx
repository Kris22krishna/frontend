import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../fishtale.css';
import MathRenderer from '../../../../../MathRenderer';

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
                    <span style={{ fontWeight: 800, color: '#0369a1' }}>🌟 Intro</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/the-fish-tale/terminology')}>📖 Terminology</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/the-fish-tale/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="ft-content" style={{ padding: '32px 24px 80px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 16 }}>
                        <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: 4, color: '#0f172a' }}>Introduction: <span style={{ color: '#0ea5e9' }}>5W1H</span></h1>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>Deep dive into the core concepts through six foundational questions.</p>
                    </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {QUESTIONS.map((item, i) => (
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ fontSize: 24, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}15`, borderRadius: 12 }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 900, color: item.color, letterSpacing: 1, textTransform: 'uppercase' }}>{item.label}</div>
                                    <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: '#0f172a' }}>{item.q}</h3>
                                </div>
                            </div>
                            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                <MathRenderer text={item.desc} />
                            </p>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}
