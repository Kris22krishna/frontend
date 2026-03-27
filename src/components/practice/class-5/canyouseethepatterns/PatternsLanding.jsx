import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Patterns.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/5/canyouseethepatterns/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Patterns — What, Why, Who, When, Where and How.',
        color: '#0284c7'
    },
    {
        id: 'terminology',
        path: '/middle/grade/5/canyouseethepatterns/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Key Terms & Concepts',
        desc: 'Master the language of sequences, rotations, and symmetry.',
        color: '#0369a1'
    },
    {
        id: 'skills',
        path: '/middle/grade/5/canyouseethepatterns/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Targeted practice for mastering number and shape patterns.',
        color: '#075985'
    }
];

export default function PatternsLanding() {
    const navigate = useNavigate();

    return (
        <div className="pt-fullpage">
            <div className="pt-left">
                <button
                    className="pt-back-btn-top"
                    onClick={() => navigate('/middle/grade/5')}
                >
                    ← Back to Syllabus
                </button>
                <div className="pt-deco pt-deco-a" />
                <div className="pt-left-content">
                    <h1 className="pt-main-title">
                        Can You See<br />
                        <span className="pt-title-accent">The Pattern?</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>
                        Step into a world of logic and symmetry. Master the art of 
                        identifying and predicting patterns in numbers and shapes.
                    </p>
                    <div className="pt-stats-grid">
                        <div className="pt-stat">
                            <span className="pt-stat-num">15</span>
                            <span className="pt-stat-lbl">Questions</span>
                        </div>
                        <div className="pt-stat">
                            <span className="pt-stat-num">3</span>
                            <span className="pt-stat-lbl">Skills</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-right">
                <div className="pt-cards-col">
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#0369a1', marginBottom: 8 }}>Choose a topic</p>
                    {MODULES.map(mod => (
                        <button key={mod.id} className="pt-card-btn" onClick={() => navigate(mod.path)}>
                            <div className="pt-card-icon">{mod.emoji}</div>
                            <div>
                                <div className="pt-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginTop: 2 }}>{mod.tagline}</div>
                                <div className="pt-card-desc">{mod.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
