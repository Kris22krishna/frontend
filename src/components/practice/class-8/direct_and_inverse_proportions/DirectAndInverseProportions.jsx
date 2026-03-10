import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './proportions.css';

const MODULES = [
    {
        id: 'introduction',
        icon: '🌟',
        label: 'Introduction',
        tagline: 'Module 1 · 6 Big Questions',
        desc: 'Explore the WHAT, WHO, WHEN, WHERE, WHY and HOW of proportions through interactive accordion cards.',
        color: '#059669',
        path: '/senior/grade/8/direct-and-inverse-proportions/introduction',
    },
    {
        id: 'terminology',
        icon: '📖',
        label: 'Terminology',
        tagline: 'Module 2 · 6 Terms & 2 Key Ideas',
        desc: 'Master the language of proportions — ratio, direct proportion, inverse proportion, constant k, and more.',
        color: '#0891b2',
        path: '/senior/grade/8/direct-and-inverse-proportions/terminology',
    },
    {
        id: 'skills',
        icon: '🎯',
        label: 'Skills',
        tagline: 'Module 3 · 2 Skills · 20 Practice Questions',
        desc: 'Build and test your skills in solving direct proportion and inverse proportion problems.',
        color: '#7c3aed',
        path: '/senior/grade/8/direct-and-inverse-proportions/skills',
    },
];

const STATS = [
    { num: '6', lbl: 'Big Questions' },
    { num: '6', lbl: 'Key Terms' },
    { num: '2', lbl: 'Key Ideas' },
    { num: '2', lbl: 'Skills' },
    { num: '20', lbl: 'Practice Qs' },
];

export default function DirectAndInverseProportions() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="prop-fullpage">
            {/* ── LEFT HERO ───────────────────────────────── */}
            <div className="prop-left">
                <div className="prop-deco prop-deco-a" />
                <div className="prop-deco prop-deco-b" />
                <div className="prop-deco prop-deco-c" />

                <button
                    onClick={() => navigate('/senior/grade/8')}
                    style={{
                        position: 'absolute', top: 16, left: 32,
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '8px 6px', borderRadius: 50,
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                        fontSize: 13, fontWeight: 700, cursor: 'pointer', zIndex: 10
                    }}
                >
                    ← Back to Chapters
                </button>

                <div className="prop-left-content">
                    {/* Title */}
                    <h1 className="prop-main-title">
                        Master<br />
                        <span className="prop-title-accent">Proportions</span>
                    </h1>

                    <p className="prop-main-sub">
                        Understand how quantities relate — directly or inversely.
                    </p>

                    {/* Stats grid only */}
                    <div className="prop-stats-grid">
                        {STATS.map((s) => (
                            <div key={s.lbl} className="prop-stat">
                                <span className="prop-stat-num">{s.num}</span>
                                <span className="prop-stat-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* ── RIGHT: MODULE CARDS ─────────────────────── */}
            <div className="prop-right">
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                        fontWeight: 900, color: '#0f172a', margin: '0 0 6px'
                    }}>
                        Direct & Inverse{' '}
                        <span style={{
                            background: 'linear-gradient(90deg,#059669,#7c3aed)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                        }}>Proportions</span>
                    </h2>
                    <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                        Start with the introduction, learn the vocabulary, then sharpen your skills.
                    </p>
                </div>

                <div className="prop-cards-col">
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className="prop-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div className="prop-card-strip" style={{ background: mod.color }} />
                            <div className="prop-card-icon" style={{ background: `${mod.color}15` }}>
                                {mod.icon}
                            </div>
                            <div className="prop-card-text">
                                <div className="prop-card-tagline">{mod.tagline}</div>
                                <div className="prop-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div className="prop-card-desc">{mod.desc}</div>
                            </div>
                            <div className="prop-card-chevron" style={{ color: mod.color }}>›</div>
                        </button>
                    ))}
                </div>

                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 24, fontWeight: 600 }}>
                    📚 Based on NCERT Class 8 Mathematics — Chapter 13
                </p>
            </div>
        </div>
    );
}
