import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './trigonometry.css';
import MathRenderer from '../../../MathRenderer';

const MODULES = [
    {
        id: 'introduction',
        path: '/introduction-to-trigonometry/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Trigonometry — What, Why, Who, When, Where and How.',
        gradFrom: '#8b5cf6', // trig-primary
        gradTo: '#a855f7',
        shadow: 'rgba(139, 92, 246, 0.4)',
    },
    {
        id: 'terminology',
        path: '/introduction-to-trigonometry/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Key Terms · Angles · 5 Rules',
        desc: 'Master the vocabulary — Hypotenuse, Opposite, Adjacent, $\\sin, \\cos, \\tan$ & golden rules.',
        gradFrom: '#0ea5e9', // trig-secondary
        gradTo: '#38bdf8',
        shadow: 'rgba(14, 165, 233, 0.4)',
    },
    {
        id: 'skills',
        path: '/introduction-to-trigonometry/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Mastery & Practice',
        desc: '8 core skills with NCERT-aligned interactive practice and assessment modes.',
        gradFrom: '#f43f5e', // trig-accent
        gradTo: '#fb7185',
        shadow: 'rgba(244, 63, 94, 0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#8b5cf6' },
    { val: '10+', label: 'Key Terms', color: '#0ea5e9' },
    { val: '3', label: 'Identities', color: '#f59e0b' },
    { val: '8', label: 'Core Skills', color: '#f43f5e' },
];

export default function IntroductionToTrignometry() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('hide-main-footer');
        return () => document.body.classList.remove('hide-main-footer');
    }, []);

    return (
        <div className="trig-fullpage">
            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="trig-left">
                <button
                    className="trig-exit-btn"
                    onClick={() => navigate('/senior/grade/10')}
                >
                    <span style={{ fontSize: 20 }}>‹</span> Back to Grade 10
                </button>

                <div className="trig-deco trig-deco-a" />
                <div className="trig-deco trig-deco-b" />
                <div className="trig-deco trig-deco-c" />

                <div className="trig-left-content">
                    <h1 className="trig-main-title">
                        Master<br />
                        <span className="trig-title-accent">Introduction to Trigonometry</span>
                    </h1>

                    <p className="trig-main-sub">
                        From basic right-angled triangles to complex identities — master the
                        mathematics of triangles and angles with precision and logic.
                    </p>

                    <div className="trig-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="trig-stat" key={i}>
                                <span className="trig-stat-num" style={{ color: s.color }}>
                                    {s.val}
                                </span>
                                <span className="trig-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="trig-right">
                <p className="trig-right-eyebrow">Choose a topic to explore</p>
                <div className="trig-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="trig-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div
                                className="trig-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />
                            <div
                                className="trig-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>
                            <div className="trig-card-text">
                                <div className="trig-card-label" style={{ color: mod.gradFrom }}>
                                    {mod.label}
                                </div>
                                <div className="trig-card-tagline">{mod.tagline}</div>
                                <div className="trig-card-desc"><MathRenderer text={mod.desc} /></div>
                            </div>
                            <div className="trig-card-chevron" style={{ color: mod.gradFrom }}>
                                ›
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
