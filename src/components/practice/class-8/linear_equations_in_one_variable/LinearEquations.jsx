import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './linear_equations.css';

const MODULES = [
    {
        id: 'introduction',
        icon: '🌟',
        label: 'Introduction',
        tagline: 'Module 1 · 6 Questions',
        desc: 'Explore the WHAT, WHO, WHEN, WHERE, WHY and HOW of linear equations through interactive cards.',
        color: '#7c3aed',
        path: '/senior/grade/8/linear-equations/introduction',
    },
    {
        id: 'terminology',
        icon: '📖',
        label: 'Terminology',
        tagline: 'Module 2 · 8 Terms & 2 Key Ideas',
        desc: 'Master the language — variable, constant, LHS, RHS, transposition, cross-multiplication.',
        color: '#0891b2',
        path: '/senior/grade/8/linear-equations/terminology',
    },
    {
        id: 'skills',
        icon: '🎯',
        label: 'Skills',
        tagline: 'Module 3 · 3 Skills · 20 Practice Questions',
        desc: 'Solve by balancing and transposition, tackle word problems — age, coins, perimeter and more.',
        color: '#059669',
        path: '/senior/grade/8/linear-equations/skills',
    },
];

const STATS = [
    { num: '6', lbl: 'Big Questions' },
    { num: '8', lbl: 'Key Terms' },
    { num: '2', lbl: 'Key Ideas' },
    { num: '3', lbl: 'Skills' },
    { num: '20', lbl: 'Practice Qs' },
];

export default function LinearEquations() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="leq-fullpage">
            {/* ── LEFT HERO ─────────────────────────── */}
            <div className="leq-left">
                <div className="leq-deco leq-deco-a" />
                <div className="leq-deco leq-deco-b" />
                <div className="leq-deco leq-deco-c" />

                <button className="leq-hero-back" onClick={() => navigate('/senior/grade/8')}>
                    ← Back to Chapters
                </button>

                <div className="leq-left-content">
                    <h1 className="leq-main-title">
                        Solve<br />
                        <span className="leq-title-accent">Linear Equations</span>
                    </h1>

                    <p className="leq-main-sub">
                        Balance, transpose and apply equations to solve real-world problems from NCERT Class 8 Ch. 2.
                    </p>

                    <div className="leq-stats-grid">
                        {STATS.map((s) => (
                            <div key={s.lbl} className="leq-stat">
                                <span className="leq-stat-num">{s.num}</span>
                                <span className="leq-stat-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: TOPIC CARDS ──────────────────── */}
            <div className="leq-right">
                <div style={{ marginBottom: 28 }}>
                    <div className="leq-right-eyebrow">Choose a Module</div>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                        fontWeight: 900, color: '#0f172a', margin: '0 0 6px'
                    }}>
                        Linear Equations in{' '}
                        <span style={{
                            background: 'linear-gradient(90deg,#7c3aed,#0891b2)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                        }}>One Variable</span>
                    </h2>
                    <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                        Start with the introduction, learn the vocabulary, then sharpen your skills.
                    </p>
                </div>

                <div className="leq-cards-col">
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className="leq-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div className="leq-card-strip" style={{ background: mod.color }} />
                            <div className="leq-card-icon" style={{ background: `${mod.color}15` }}>
                                {mod.icon}
                            </div>
                            <div className="leq-card-text">
                                <div className="leq-card-tagline">{mod.tagline}</div>
                                <div className="leq-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div className="leq-card-desc">{mod.desc}</div>
                            </div>
                            <div className="leq-card-chevron" style={{ color: mod.color }}>›</div>
                        </button>
                    ))}
                </div>

                <p className="leq-hub-footer">
                    📚 Based on NCERT Class 8 Mathematics — Chapter 2
                </p>
            </div>
        </div>
    );
}
