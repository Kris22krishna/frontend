import React from 'react';
import { useNavigate } from 'react-router-dom';
import './partsandwholes.css';
import { LatexText } from '@/components/LatexText';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/5/parts-and-wholes/introduction',
        label: 'Introduction',
        emoji: '🍕',
        tagline: '5W1H Exploration',
        desc: 'Discover what fractions are and why they matter in everyday life.',
        color: '#f59e0b'
    },
    {
        id: 'terminology',
        path: '/middle/grade/5/parts-and-wholes/terminology',
        label: 'Terminology',
        emoji: '📒',
        tagline: 'Fraction Basics',
        desc: 'Numerators, Denominators, and Equivalent Fractions — the language of parts.',
        color: '#d97706'
    },
    {
        id: 'skills',
        path: '/middle/grade/5/parts-and-wholes/skills',
        label: 'Skills Hub',
        emoji: '🎯',
        tagline: 'Learn & Practice',
        desc: 'Master identifying, comparing, and placing fractions on a number line.',
        color: '#b45309'
    }
];

export default function PartsAndWholesLanding() {
    const navigate = useNavigate();

    return (
        <div className="pw-fullpage">
            <div className="pw-left">
                <button
                    className="pw-back-btn-top"
                    onClick={() => navigate('/middle/grade/5')}
                >
                    ← Back to Syllabus
                </button>
                <div className="pw-deco pw-deco-a" />
                <div className="pw-left-content">
                    <h1 className="pw-main-title">
                        Parts &<br />
                        <span className="pw-title-accent">Wholes</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>
                        Discover how to divide things into equal parts and understand the world of fractions all around us!
                    </p>
                    <div className="pw-stats-grid">
                        <div className="pw-stat">
                            <span className="pw-stat-num">3</span>
                            <span className="pw-stat-lbl">Core Skills</span>
                        </div>
                        <div className="pw-stat">
                            <span className="pw-stat-num">25</span>
                            <span className="pw-stat-lbl">Test Questions</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pw-right">
                <div className="pw-cards-col">
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#f59e0b', marginBottom: 8 }}>Choose a topic</p>
                    {MODULES.map(mod => (
                        <button key={mod.id} className="pw-card-btn" onClick={() => navigate(mod.path)}>
                            <div className="pw-card-icon">{mod.emoji}</div>
                            <div>
                                <div className="pw-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginTop: 2 }}>{mod.tagline}</div>
                                <div className="pw-card-desc"><LatexText text={mod.desc} /></div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
