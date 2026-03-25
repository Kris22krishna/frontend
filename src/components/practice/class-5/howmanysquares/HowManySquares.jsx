import React from 'react';
import { useNavigate } from 'react-router-dom';
import './howmanysquares.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/5/how-many-squares/introduction',
        label: 'Introduction',
        emoji: '📐',
        tagline: '5W1H Exploration',
        desc: 'Understand the "why", "what", and "how" behind squares and grids.',
        color: '#4f46e5'
    },
    {
        id: 'terminology',
        path: '/middle/grade/5/how-many-squares/terminology',
        label: 'Terminology',
        emoji: '📒',
        tagline: 'Geometry Basics',
        desc: 'Area, Perimeter, and Grids — the language of measurement.',
        color: '#6366f1'
    },
    {
        id: 'skills',
        path: '/middle/grade/5/how-many-squares/skills',
        label: 'Skills Hub',
        emoji: '🎯',
        tagline: 'Learn & Practice',
        desc: 'Master measuring, identifying, and finding patterns in squares.',
        color: '#8b5cf6'
    }
];

export default function HowManySquaresLanding() {
    const navigate = useNavigate();

    return (
        <div className="hms-fullpage">
            <div className="hms-left">
                <button
                    className="hms-back-btn-top"
                    onClick={() => navigate('/middle/grade/5')}
                >
                    ← Back to Syllabus
                </button>
                <div className="hms-deco hms-deco-a" />
                <div className="hms-left-content">
                    <h1 className="hms-main-title">
                        How Many<br />
                        <span className="hms-title-accent">Squares?</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>
                        Discover and count squares in grids, uncover overlapping shapes, and decode geometric patterns!
                    </p>
                    <div className="hms-stats-grid">
                        <div className="hms-stat">
                            <span className="hms-stat-num">3</span>
                            <span className="hms-stat-lbl">Core Skills</span>
                        </div>
                        <div className="hms-stat">
                            <span className="hms-stat-num">25</span>
                            <span className="hms-stat-lbl">Test Questions</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hms-right">
                <div className="hms-cards-col">
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#4f46e5', marginBottom: 8 }}>Choose a topic</p>
                    {MODULES.map(mod => (
                        <button key={mod.id} className="hms-card-btn" onClick={() => navigate(mod.path)}>
                            <div className="hms-card-icon">{mod.emoji}</div>
                            <div>
                                <div className="hms-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginTop: 2 }}>{mod.tagline}</div>
                                <div className="hms-card-desc">{mod.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
