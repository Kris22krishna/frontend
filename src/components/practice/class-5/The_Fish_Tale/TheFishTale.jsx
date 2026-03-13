import React from 'react';
import { useNavigate } from 'react-router-dom';
import './fishtale.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/the-fish-tale/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about The Fish Tale — What, Why, Who, When, Where and How.',
        color: '#0284c7'
    },
    {
        id: 'terminology',
        path: '/the-fish-tale/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Key Terms & Concepts',
        desc: 'Master the language of large numbers and nautical measurements.',
        color: '#0369a1'
    },
    {
        id: 'skills',
        path: '/the-fish-tale/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Targeted practice for mastering place value and real-life data.',
        color: '#075985'
    }
];

export default function TheFishTaleLanding() {
    const navigate = useNavigate();

    return (
        <div className="ft-fullpage">
            <div className="ft-left">
                <button
                    onClick={() => navigate('/middle/grade/5')}
                    style={{
                        position: 'absolute', top: 32, left: 32, zIndex: 10,
                        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff', padding: '8px 16px', borderRadius: '50px',
                        cursor: 'pointer', fontWeight: 700, fontSize: 13,
                        display: 'flex', alignItems: 'center', gap: 8,
                        backdropFilter: 'blur(10px)', transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    ← Back to Syllabus
                </button>
                <div className="ft-deco ft-deco-a" />
                <div className="ft-left-content">
                    <h1 className="ft-main-title">
                        The<br />
                        <span className="ft-title-accent">Fish Tale</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>
                        Dive into the world of large numbers, measurements, and real-life
                        problem solving through the lens of a fisherman's journey.
                    </p>
                    <div className="ft-stats-grid">
                        <div className="ft-stat">
                            <span className="ft-stat-num">6</span>
                            <span className="ft-stat-lbl">Questions</span>
                        </div>
                        <div className="ft-stat">
                            <span className="ft-stat-num">8</span>
                            <span className="ft-stat-lbl">Skills</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ft-right">
                <div className="ft-cards-col">
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#0369a1', marginBottom: 8 }}>Choose a topic</p>
                    {MODULES.map(mod => (
                        <button key={mod.id} className="ft-card-btn" onClick={() => navigate(mod.path)}>
                            <div className="ft-card-icon">{mod.emoji}</div>
                            <div>
                                <div className="ft-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginTop: 2 }}>{mod.tagline}</div>
                                <div className="ft-card-desc">{mod.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
