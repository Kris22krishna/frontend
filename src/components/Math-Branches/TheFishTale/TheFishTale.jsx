import React from 'react';
import { useNavigate } from 'react-router-dom';
import './the-fish-tale.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/the-fish-tale/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about The Fish Tale — What, Why, Who, When, Where and How.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terminology',
        path: '/the-fish-tale/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '8 Key Terms · Indian Number System',
        desc: 'Master the vocabulary of large numbers — Lakhs, Place Value, Face Value & the Indian system.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/the-fish-tale/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Practice & Assessment',
        desc: '5 core skills, 10 practice questions and 10 assessment questions each.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0891b2' },
    { val: '8', label: 'Key Terms', color: '#7c3aed' },
    { val: '5', label: 'Skills', color: '#0369a1' },
    { val: '100', label: 'Practice Qs', color: '#b45309' },
];

export default function TheFishTale() {
    const navigate = useNavigate();

    return (
        <div className="ft-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="ft-left">
                {/* Decorative circles */}
                <div className="ft-deco ft-deco-a" />
                <div className="ft-deco ft-deco-b" />
                <div className="ft-deco ft-deco-c" />

                <div className="ft-left-content">
                    <h1 className="ft-main-title">
                        Master<br />
                        <span className="ft-title-accent">The Fish Tale</span>
                    </h1>

                    <p className="ft-main-sub">
                        From counting fish to cracking lakhs — learn large numbers
                        through the lives of fisher-folk along the Indian coast.
                    </p>

                    {/* Stats grid */}
                    <div className="ft-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="ft-stat" key={i}>
                                <span
                                    className="ft-stat-num"
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className="ft-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="ft-right">
                <p className="ft-right-eyebrow">Choose a topic to explore</p>
                <div className="ft-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="ft-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="ft-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className="ft-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="ft-card-text">
                                <div
                                    className="ft-card-label"
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className="ft-card-tagline">{mod.tagline}</div>
                                <div className="ft-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className="ft-card-chevron"
                                style={{ color: mod.gradFrom }}
                            >
                                ›
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
