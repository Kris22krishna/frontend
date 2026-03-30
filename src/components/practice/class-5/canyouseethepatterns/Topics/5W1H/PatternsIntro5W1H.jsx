import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Patterns.css';
import MathRenderer from '../../../../../MathRenderer';

const QUESTIONS = [
    { 
        label: 'WHAT', 
        q: 'What is a Pattern?', 
        icon: '🌀', 
        color: '#0ea5e9', 
        desc: 'A pattern is a recurring sequence of numbers, shapes, or designs that follows a specific rule.' 
    },
    { 
        label: 'WHY', 
        q: 'Why study patterns?', 
        icon: '🧠', 
        color: '#0284c7', 
        desc: 'Working with patterns builds logical thinking and helps us predict what comes next in a sequence.' 
    },
    { 
        label: 'WHO', 
        q: 'Who uses patterns?', 
        icon: '👩‍💻', 
        color: '#0369a1', 
        desc: 'Scientists, architects, programmers, and artists all use patterns to solve problems and create beauty.' 
    },
    { 
        label: 'WHEN', 
        q: 'When do we use patterns?', 
        icon: '📅', 
        color: '#0ea5e9', 
        desc: 'From predicting weather to designing floor tiles, patterns are used in daily life and nature.' 
    },
    { 
        label: 'WHERE', 
        q: 'Where are patterns found?', 
        icon: '🌻', 
        color: '#0284c7', 
        desc: 'Nature is full of patterns! Look at the petals of a flower, the scales on a fish, or the spiral of a shell.' 
    },
    { 
        label: 'HOW', 
        q: 'How to decode a pattern?', 
        icon: '🔍', 
        color: '#0369a1', 
        desc: 'Identify the "Rule" by looking at the change between elements. Apply the rule to find the next term.' 
    }
];

export default function PatternsIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="pt-page">
            <div className="pt-deco pt-deco-1"></div>
            <div className="pt-deco pt-deco-2"></div>
            <div className="pt-deco pt-deco-3"></div>

            <nav className="pt-topic-nav">
                <div className="pt-back-link" onClick={() => navigate('/middle/grade/5/canyouseethepatterns')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ fontWeight: 800, color: '#0369a1' }}>🌟 Intro</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/canyouseethepatterns/terminology')}>📖 Terminology</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/canyouseethepatterns/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="pt-content" style={{ padding: '32px 24px 80px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 16 }}>
                        <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: 4, color: '#0f172a' }}>Introduction: <span style={{ color: '#0ea5e9' }}>5W1H</span></h1>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>Understanding the fundamentals of patterns through six key questions.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                        {QUESTIONS.map((item, i) => (
                            <div key={i} className="pt-card-hover" style={{ 
                                background: 'rgba(255, 255, 255, 0.9)', 
                                backdropFilter: 'blur(10px)',
                                border: '1px solid #e2e8f0', 
                                borderRadius: '24px', 
                                padding: '24px', 
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16,
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ fontSize: 24, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}15`, borderRadius: 14 }}>{item.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 900, color: item.color, letterSpacing: 1, textTransform: 'uppercase' }}>{item.label}</div>
                                        <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: '#0f172a' }}>{item.q}</h3>
                                    </div>
                                </div>
                                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
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
