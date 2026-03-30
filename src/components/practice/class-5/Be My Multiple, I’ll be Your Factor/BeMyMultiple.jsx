import React from 'react';
import { useNavigate } from 'react-router-dom';
import './bemyfactor.css';

const MODULES = [
    {
        title: '5W1H: Introduction',
        tagline: 'The Foundation',
        desc: 'Six basic questions to help you understand the why, what, and how of factors.',
        icon: '🌟',
        path: '/middle/grade/5/be-my-multiple/introduction',
        color: '#0284c7'
    },
    {
        title: 'Key Terminology',
        tagline: 'The Language',
        desc: 'Master the essential terms like Prime, Composite, LCM, and HCF.',
        icon: '📖',
        path: '/middle/grade/5/be-my-multiple/terminology',
        color: '#0369a1'
    },
    {
        title: 'Skills Hub',
        tagline: 'Deep Practice',
        desc: 'Targeted practice sessions to build mastery in division and multiplication relationships.',
        icon: '🎯',
        path: '/middle/grade/5/be-my-multiple/skills',
        color: '#075985'
    }
];

export default function BeMyMultiple() {
    const navigate = useNavigate();

    return (
        <div className="ft-fullpage">
            <div className="ft-left">
                <button className="ft-back-btn-top" onClick={() => navigate('/middle/grade/5')}>
                    ← Back to Syllabus
                </button>
                <div className="ft-deco ft-deco-a" />
                <div className="ft-left-content">
                    <h1 className="ft-main-title">
                        Be My Multiple,<br />
                        <span className="ft-title-accent">I’ll be Your Factor</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>
                        Explore the fascinating world of numbers, divisors, and patterns. Learn how numbers connect through multiplication!
                    </p>
                    <div className="ft-stats-grid">
                        <div className="ft-stat">
                            <span className="ft-stat-num">5</span>
                            <span className="ft-stat-lbl">Topics</span>
                        </div>
                        <div className="ft-stat">
                            <span className="ft-stat-num">3</span>
                            <span className="ft-stat-lbl">Skills</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ft-right">
                <div className="ft-cards-col">
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#0369a1', marginBottom: 8 }}>CHAPTER MODULES</p>
                    {MODULES.map((m, i) => (
                        <button key={i} className="ft-card-btn" onClick={() => navigate(m.path)}>
                            <div className="ft-card-icon">{m.icon}</div>
                            <div>
                                <div className="ft-card-label" style={{ color: m.color }}>{m.title}</div>
                                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginTop: 2 }}>{m.tagline}</div>
                                <div className="ft-card-desc">{m.desc}</div>
                            </div>
                        </button>
                    ))}

                    <button 
                        className="ft-card-btn"
                        style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', border: 'none' }}
                        onClick={() => navigate('/middle/grade/5/be-my-multiple/test')}
                    >
                        <div className="ft-card-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>🏆</div>
                        <div>
                            <div className="ft-card-label" style={{ color: '#fff' }}>Comprehensive Test</div>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Final Challenge</div>
                            <div className="ft-card-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>Put your skills to the test with an all-in-one assessment.</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
