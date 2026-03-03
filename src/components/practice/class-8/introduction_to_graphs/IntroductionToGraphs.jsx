import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './graphs.css';

const MODULES = [
    {
        id: 'introduction',
        icon: '🌟',
        label: 'Introduction',
        tagline: 'Module 1 · 6 Questions',
        desc: 'Explore the WHAT, WHO, WHEN, WHERE, WHY and HOW of line graphs through interactive cards.',
        color: '#059669',
        path: '/senior/grade/8/introduction-to-graphs/introduction',
    },
    {
        id: 'terminology',
        icon: '📖',
        label: 'Terminology',
        tagline: 'Module 2 · 6 Terms & 2 Key Ideas',
        desc: 'Master the language of line graphs — axes, coordinates, scale, origin, and more.',
        color: '#0891b2',
        path: '/senior/grade/8/introduction-to-graphs/terminology',
    },
    {
        id: 'skills',
        icon: '🎯',
        label: 'Skills',
        tagline: 'Module 3 · 2 Skills · 20 Practice Questions',
        desc: 'Build and test your skills in reading line graphs and applying linear graphs.',
        color: '#7c3aed',
        path: '/senior/grade/8/introduction-to-graphs/skills',
    },
];

const STATS = [
    { num: '6', lbl: 'Big Questions' },
    { num: '6', lbl: 'Key Terms' },
    { num: '2', lbl: 'Key Ideas' },
    { num: '2', lbl: 'Skills' },
    { num: '20', lbl: 'Practice Qs' },
];

export default function IntroductionToGraphs() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="grph-fullpage">
            {/* ── LEFT HERO ────────────────────────────── */}
            <div className="grph-left">
                <div className="grph-deco grph-deco-a" />
                <div className="grph-deco grph-deco-b" />
                <div className="grph-deco grph-deco-c" />

                <button
                    onClick={() => navigate('/senior/grade/8')}
                    style={{
                        position: 'absolute', top: 32, left: 32,
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '8px 16px', borderRadius: 50,
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                        fontSize: 13, fontWeight: 700, cursor: 'pointer', zIndex: 10
                    }}
                >
                    ← Back to Chapters
                </button>

                <div className="grph-left-content">
                    {/* Title */}
                    <h1 className="grph-main-title">
                        Master<br />
                        <span className="grph-title-accent">Line Graph</span>
                    </h1>

                    <p className="grph-main-sub">
                        Learn to read, draw, and interpret line graphs — the language of trends,
                        patterns, and change over time. From temperature charts to speed-distance graphs.
                    </p>

                    {/* Stats grid only */}
                    <div className="grph-stats-grid">
                        {STATS.map((s) => (
                            <div key={s.lbl} className="grph-stat">
                                <span className="grph-stat-num">{s.num}</span>
                                <span className="grph-stat-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* ── RIGHT: TOPIC CARDS ───────────────────── */}
            <div className="grph-right">
                <div style={{ marginBottom: 28 }}>
                    <div className="grph-right-eyebrow">Choose a Module</div>
                    <h2 style={{
                        fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                        fontWeight: 900, color: '#0f172a', margin: '0 0 6px'
                    }}>
                        Introduction to <span style={{
                            background: 'linear-gradient(90deg,#059669,#0891b2)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                        }}>Graphs</span>
                    </h2>
                    <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                        Start with the introduction, learn the vocabulary, then sharpen your skills.
                    </p>
                </div>

                <div className="grph-cards-col">
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className="grph-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Colored strip */}
                            <div className="grph-card-strip" style={{ background: mod.color }} />

                            {/* Icon */}
                            <div className="grph-card-icon" style={{ background: `${mod.color}15` }}>
                                {mod.icon}
                            </div>

                            {/* Text */}
                            <div className="grph-card-text">
                                <div className="grph-card-tagline">{mod.tagline}</div>
                                <div className="grph-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div className="grph-card-desc">{mod.desc}</div>
                            </div>

                            {/* Chevron */}
                            <div className="grph-card-chevron" style={{ color: mod.color }}>›</div>
                        </button>
                    ))}
                </div>

                {/* Footer note */}
                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 24, fontWeight: 600 }}>
                    📚 Based on NCERT Class 8 Mathematics — Chapter 15
                </p>
            </div>
        </div >
    );
}
