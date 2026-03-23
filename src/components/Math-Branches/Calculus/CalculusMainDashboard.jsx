import React from 'react';
import { useNavigate } from 'react-router-dom';
import './calculus.css';

const BRANCHES = [
    {
        id: 'functions',
        path: '/calculus/functions',
        label: 'Functions',
        emoji: '📈',
        tagline: 'The Core of Calculus',
        desc: 'Understand the primary objects of mathematical interest. Before limits, there are functions.',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.4)',
    },
    {
        id: 'limits',
        path: '/calculus/limits',
        label: 'Limits',
        emoji: '🎯',
        tagline: 'The Foundation of Calculus',
        desc: 'Explore continuity, approach, and how functions behave near a specific point.',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.4)',
    },
    {
        id: 'differentiation',
        path: '/calculus/differentiation',
        label: 'Differentiation',
        emoji: '📉',
        tagline: 'The Math of Instant Change',
        desc: 'Master rates of change, slopes of tangent lines, and optimization rules.',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244,63,94,0.4)',
    },
    {
        id: 'integration',
        path: '/calculus/integration',
        label: 'Integration',
        emoji: '📈',
        tagline: 'The Math of Accumulation',
        desc: 'Calculate areas under curves, volumes, and reverse differentiation rules.',
        gradFrom: '#8b5cf6',
        gradTo: '#a78bfa',
        shadow: 'rgba(139,92,246,0.4)',
    },
];

const STATS = [
    { val: '4', label: 'Branches', color: '#0ea5e9' },
    { val: '22', label: 'Chapters', color: '#f43f5e' },
    { val: '∞', label: 'Possibilities', color: '#8b5cf6' },
];

export default function CalculusMainDashboard() {
    const navigate = useNavigate();

    return (
        <div className="calc-fullpage">
            <div className="calc-left">
                <div className="calc-deco calc-deco-a" />
                <div className="calc-deco calc-deco-b" />
                <div className="calc-deco calc-deco-c" />

                <div className="calc-left-content">
                    <h1 className="calc-main-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        Master
                        <br />
                        <span className="calc-title-accent">Calculus</span>
                    </h1>

                    <p className="calc-main-sub">
                        Calculus is the mathematical study of continuous change. Select one of the three foundational pillars to begin your mastery journey.
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
                <button onClick={() => navigate('/')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 18px', borderRadius: 100, width: 'fit-content',
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    fontSize: 14, fontWeight: 700, color: '#334155',
                    cursor: 'pointer', marginBottom: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>🏠 Back</button>
                <p className="calc-right-eyebrow">Choose a branch to explore</p>

                <div className="calc-cards-col">
                    {BRANCHES.map((branchItem) => (
                        <button
                            key={branchItem.id}
                            className="calc-card-btn"
                            onClick={() => navigate(branchItem.path)}
                        >
                            <div
                                className="calc-card-strip"
                                style={{ background: `linear-gradient(180deg, ${branchItem.gradFrom}, ${branchItem.gradTo})` }}
                            />

                            <div
                                className="calc-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${branchItem.gradFrom}, ${branchItem.gradTo})`,
                                    boxShadow: `0 6px 20px ${branchItem.shadow}`,
                                }}
                            >
                                {branchItem.emoji}
                            </div>

                            <div className="calc-card-text">
                                <div className="calc-card-label" style={{ color: branchItem.gradFrom }}>
                                    {branchItem.label}
                                </div>
                                <div className="calc-card-tagline">{branchItem.tagline}</div>
                                <div className="calc-card-desc">{branchItem.desc}</div>
                            </div>

                            <div className="calc-card-chevron" style={{ color: branchItem.gradFrom }}>
                                {'>'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
