import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LinesAndAngles.css';

const MODULES = [
    {
        id: 'intro',
        path: '/middle/grade/6/lines-and-angles/introduction',
        label: 'Fundamental Concept',
        emoji: '🌍',
        tagline: '5W1H Exploration',
        desc: 'Explore the 5W1H of Lines and Angles—What they are, Why they matter, and How they shape geometry.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terms',
        path: '/middle/grade/6/lines-and-angles/terminology',
        label: 'Core Terminology',
        emoji: '📐',
        tagline: 'Key Concepts & Models',
        desc: 'Master the vocabulary: Points, Rays, Segments, and the 5 Golden Rules of Angles.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/middle/grade/6/lines-and-angles/skills',
        label: 'Applied Skills',
        emoji: '⚙️',
        tagline: 'Practice & Mastery',
        desc: 'Challenge yourself with Transversals, Intersecting Lines, and measuring angles.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
    }
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0891b2' },
    { val: '6+', label: 'Core Terms', color: '#7c3aed' },
    { val: '10', label: 'Skills', color: '#059669' },
    { val: '3', label: 'Practice Tests', color: '#b45309' },
];

export default function LinesAndAngles() {
    const navigate = useNavigate();

    return (
        <div className="la-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="la-left">
                {/* Decorative circles */}
                <div className="la-deco la-deco-a" />
                <div className="la-deco la-deco-b" />
                <div className="la-deco la-deco-c" />

                <div className="la-left-content">
                    <h1 className="la-main-title">
                        Master<br />
                        <span className="la-title-accent">Lines & Angles</span>
                    </h1>

                    <p className="la-main-sub">
                        An interactive journey through the building blocks of geometry. From points and rays to transversals and linear pairs, discover how shapes fit together.
                    </p>

                    {/* Stats grid */}
                    <div className="la-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="la-stat" key={i}>
                                <span
                                    className="la-stat-num"
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className="la-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="la-right">
                <p className="la-right-eyebrow">Choose a topic to explore</p>
                <div className="la-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="la-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="la-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className="la-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="la-card-text">
                                <div
                                    className="la-card-label"
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className="la-card-tagline">{mod.tagline}</div>
                                <div className="la-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className="la-card-chevron"
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

