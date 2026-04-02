import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../The_Fish_Tale/fishtale.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/5/mapping-your-way/introduction',
        label: 'Introduction',
        emoji: '🌍',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Mapping Your Way — What, Why, Who, When, Where and How.',
        color: '#0284c7'
    },
    {
        id: 'terminology',
        path: '/middle/grade/5/mapping-your-way/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Key Terms & Concepts',
        desc: 'Master the language of maps, scales, grids, and directions.',
        color: '#0369a1'
    },
    {
        id: 'skills',
        path: '/middle/grade/5/mapping-your-way/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Targeted practice for spatial orientation, map reading and direction interpretation.',
        color: '#075985'
    }
];

export default function MappingYourWayLanding() {
    const navigate = useNavigate();

    return (
        <div className="ft-fullpage">
            <div className="ft-left">
                <button
                    className="ft-back-btn-top"
                    onClick={() => navigate('/middle/grade/5')}
                >
                    ← Back to Syllabus
                </button>
                <div className="ft-deco ft-deco-a" />
                <div className="ft-left-content">
                    <h1 className="ft-main-title">
                        Mapping<br />
                        <span className="ft-title-accent">Your Way</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>
                        Dive into the world of maps, scales, directions, and grids.
                        Learn how to read simple maps and navigate spatial relationships!
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
