import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../calculus.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/calculus/integration/introduction',
        label: 'Introduction',
        emoji: '🌍',
        tagline: '5W1H Exploration',
        desc: '6 big questions about Integration: what, why, who, when, where, and how.',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.4)',
    },
    {
        id: 'terminology',
        path: '/calculus/integration/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Key Terms and Concepts',
        desc: 'Master Antiderivatives, Definite Integrals, and the Fundamental Theorem.',
        gradFrom: '#8b5cf6',
        gradTo: '#a78bfa',
        shadow: 'rgba(139,92,246,0.4)',
    },
    {
        id: 'skills',
        path: '/calculus/integration/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice and Assess',
        desc: 'Master 10 core integration skills spanning substitution, parts, and partial fractions.',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244,63,94,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0ea5e9' },
    { val: '10', label: 'Core Skills', color: '#f43f5e' },
    { val: '400', label: 'Unique Questions', color: '#8b5cf6' },
];

export default function IntDashboard() {
    const navigate = useNavigate();

    return (
        <div className="calc-fullpage">
            <div className="calc-left">
                <div className="calc-deco calc-deco-a" />
                <div className="calc-deco calc-deco-b" />
                <div className="calc-deco calc-deco-c" />

                <div className="calc-left-content">
                    <button
                        onClick={() => navigate('/calculus')}
                        style={{
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', borderRadius: '50px', padding: '8px 16px', fontSize: '13px',
                            fontWeight: '600', cursor: 'pointer', marginBottom: '24px', display: 'inline-flex',
                            alignItems: 'center', gap: '6px', backdropFilter: 'blur(10px)'
                        }}
                    >
                        ← Back to Calculus
                    </button>

                    <h1 className="calc-main-title">
                        Master
                        <br />
                        <span className="calc-title-accent" style={{ background: 'linear-gradient(90deg, #d946ef, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Integration</span>
                    </h1>

                    <p className="calc-main-sub">
                        The mathematics of accumulation. Learn how to construct areas, volumes, and totals from infinitesimal pieces.
                    </p>

                    <div className="calc-stats-grid">
                        {STATS.map((item) => (
                            <div className="calc-stat" key={item.label}>
                                <span className="calc-stat-num" style={{ color: item.color }}>
                                    {item.val}
                                </span>
                                <span className="calc-stat-lbl">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="calc-right">
                <p className="calc-right-eyebrow">Choose a topic to explore</p>

                <div className="calc-cards-col">
                    {MODULES.map((moduleItem) => (
                        <button
                            key={moduleItem.id}
                            className="calc-card-btn"
                            onClick={() => navigate(moduleItem.path)}
                        >
                            <div
                                className="calc-card-strip"
                                style={{ background: `linear-gradient(180deg, ${moduleItem.gradFrom}, ${moduleItem.gradTo})` }}
                            />

                            <div
                                className="calc-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${moduleItem.gradFrom}, ${moduleItem.gradTo})`,
                                    boxShadow: `0 6px 20px ${moduleItem.shadow}`,
                                }}
                            >
                                {moduleItem.emoji}
                            </div>

                            <div className="calc-card-text">
                                <div className="calc-card-label" style={{ color: moduleItem.gradFrom }}>
                                    {moduleItem.label}
                                </div>
                                <div className="calc-card-tagline">{moduleItem.tagline}</div>
                                <div className="calc-card-desc">{moduleItem.desc}</div>
                            </div>

                            <div className="calc-card-chevron" style={{ color: moduleItem.gradFrom }}>
                                {'>'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
