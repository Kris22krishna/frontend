import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../SurfaceAreasAndVolumes/surface-volumes.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/statistics/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Statistics — What, Why, Who, When, Where and How.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terminology',
        path: '/statistics/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '10 Key Terms · 5 Rules',
        desc: 'Master the vocabulary — Class Intervals, Frequency, Cumulative Frequency & the 5 golden rules.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/statistics/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Mastery & Practice',
        desc: '7 core skills with NCERT-aligned interactive practice and assessment modes.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0891b2' },
    { val: '10', label: 'Key Terms', color: '#7c3aed' },
    { val: '5', label: 'Rules', color: '#059669' },
    { val: '7', label: 'Core Skills', color: '#0369a1' },
];

export default function Statistics() {
    const navigate = useNavigate();

    return (
        <div className="sv-fullpage">
            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="sv-left">
                <button
                    className="sv-exit-btn"
                    onClick={() => navigate('/senior/grade/10')}
                >
                    <span style={{ fontSize: 20 }}>‹</span> Back to Grade 10
                </button>

                <div className="sv-deco sv-deco-a" />
                <div className="sv-deco sv-deco-b" />
                <div className="sv-deco sv-deco-c" />

                <div className="sv-left-content">
                    <h1 className="sv-main-title">
                        Master<br />
                        <span className="sv-title-accent">Statistics</span>
                    </h1>

                    <p className="sv-main-sub">
                        From grouped data to ogives — master mean, mode, and median
                        calculations with frequency distributions.
                    </p>

                    <div className="sv-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="sv-stat" key={i}>
                                <span className="sv-stat-num" style={{ color: s.color }}>
                                    {s.val}
                                </span>
                                <span className="sv-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="sv-right">
                <p className="sv-right-eyebrow">Choose a topic to explore</p>
                <div className="sv-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="sv-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div
                                className="sv-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />
                            <div
                                className="sv-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>
                            <div className="sv-card-text">
                                <div className="sv-card-label" style={{ color: mod.gradFrom }}>
                                    {mod.label}
                                </div>
                                <div className="sv-card-tagline">{mod.tagline}</div>
                                <div className="sv-card-desc">{mod.desc}</div>
                            </div>
                            <div className="sv-card-chevron" style={{ color: mod.gradFrom }}>
                                ›
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
