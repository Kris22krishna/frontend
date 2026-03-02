import React from 'react';
import { useNavigate } from 'react-router-dom';
import './algebra.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/algebra/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Algebra — What, Why, Who, When, Where and How.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terminology',
        path: '/algebra/terminology',
        label: 'Terminology',
        emoji: '�',
        tagline: '7 Key Terms · 5 Rules',
        desc: 'Master the language of Algebra — variables, constants, coefficients & the 5 golden rules.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/algebra/skills',
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
    { val: '7', label: 'Key Terms', color: '#7c3aed' },
    { val: '5', label: 'Rules', color: '#059669' },
    { val: '5', label: 'Skills', color: '#0369a1' },
    { val: '100', label: 'Practice Qs', color: '#b45309' },
];

export default function Algebra() {
    const navigate = useNavigate();

    return (
        <div className="alg-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="alg-left">
                {/* Decorative circles */}
                <div className="alg-deco alg-deco-a" />
                <div className="alg-deco alg-deco-b" />
                <div className="alg-deco alg-deco-c" />

                <div className="alg-left-content">
                    <h1 className="alg-main-title">
                        Master<br />
                        <span className="alg-title-accent">Algebra</span>
                    </h1>

                    <p className="alg-main-sub">
                        From mystery unknowns to powerful equations — learn Algebra
                        the way it was meant to be taught.
                    </p>

                    {/* Stats grid */}
                    <div className="alg-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="alg-stat" key={i}>
                                <span
                                    className="alg-stat-num"
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className="alg-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="alg-right">
                <p className="alg-right-eyebrow">Choose a topic to explore</p>
                <div className="alg-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="alg-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="alg-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className="alg-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="alg-card-text">
                                <div
                                    className="alg-card-label"
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className="alg-card-tagline">{mod.tagline}</div>
                                <div className="alg-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className="alg-card-chevron"
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
