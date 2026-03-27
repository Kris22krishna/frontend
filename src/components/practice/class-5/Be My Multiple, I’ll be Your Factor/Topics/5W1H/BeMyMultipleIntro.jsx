import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../bemyfactor.css';
import { LatexText } from '@/components/LatexText';

const QUESTIONS = [
    { label: 'WHAT', q: 'What are Factors & Multiples?', icon: '🔢', color: '#0284c7', desc: 'Factors are numbers that divide another number exactly. Multiples are what you get after multiplying a number by another number!' },
    { label: 'WHY', q: 'Why do we study them?', icon: '🤔', color: '#0369a1', desc: 'They are the building blocks of numbers. They help us simplify fractions, find patterns, and solve real-world timing problems!' },
    { label: 'WHO', q: 'Who uses them?', icon: '👨‍💻', color: '#075985', desc: 'Engineers, computer scientists, and even musicians use multiples to create rhythms and secure data!' },
    { label: 'WHEN', q: 'When do we find common ones?', icon: '🤝', color: '#0ea5e9', desc: 'When we want to find a common meeting point for two different cycles, like bells tolling or traffic lights changing.' },
    { label: 'WHERE', q: 'Where are they seen?', icon: '🏢', color: '#0369a1', desc: 'In tiled floors, skyscraper windows, and natural growth patterns. Symmetry often involves multiples!' },
    { label: 'HOW', q: 'How to identify prime numbers?', icon: '💎', color: '#075985', desc: 'A prime number is special - it only has two factors: 1 and itself. It cannot be broken down further!' }
];

export default function BeMyMultipleIntro() {
    const navigate = useNavigate();

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/middle/grade/5/be-my-multiple')}>← Back to Chapter</div>
                <div className="ft-nav-links">
                    <span className="ft-nav-link-active">🌟 Intro</span>
                    <span className="ft-nav-link" onClick={() => navigate('/middle/grade/5/be-my-multiple/terminology')}>📖 Terminology</span>
                    <span className="ft-nav-link" onClick={() => navigate('/middle/grade/5/be-my-multiple/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="ft-content" style={{ padding: '32px 24px' }}>
                <div style={{ marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 16 }}>
                    <h1 className="ft-main-title" style={{ fontSize: '2.8rem', color: '#0f172a' }}>Introduction: <span className="ft-title-accent">5W1H</span></h1>
                    <p style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>Unlock the secrets of numbers through six foundational questions.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {QUESTIONS.map((item, i) => (
                        <div key={i} className="ft-quiz-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ fontSize: 24, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: `${item.color}15` }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: item.color }}>{item.label}</div>
                                    <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: '#0f172a' }}>{item.q}</h3>
                                </div>
                            </div>
                            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                <LatexText text={item.desc} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
