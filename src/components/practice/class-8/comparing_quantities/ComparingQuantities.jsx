import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './comparing_quantities.css';

const MODULES = [
    {
        id: 'introduction',
        icon: '🌟',
        label: 'Introduction',
        tagline: 'Module 1 · 6 Big Questions',
        desc: 'Discover the WHAT, WHO, WHEN, WHERE, WHY and HOW of comparing quantities through rich real-world examples.',
        color: '#0f4c81',
        path: '/senior/grade/8/comparing-quantities/introduction',
    },
    {
        id: 'terminology',
        icon: '📖',
        label: 'Terminology',
        tagline: 'Module 2 · 7 Terms · 2 Key Ideas',
        desc: 'Master the language of percentages, profit, loss, discount, GST, and interest rates.',
        color: '#1a237e',
        path: '/senior/grade/8/comparing-quantities/terminology',
    },
    {
        id: 'skills',
        icon: '🎯',
        label: 'Skills',
        tagline: 'Module 3 · 4 Skills · 80 Practice Questions',
        desc: 'Build mastery in Percentages, Profit & Loss, Simple Interest, and Compound Interest.',
        color: '#6a1b9a',
        path: '/senior/grade/8/comparing-quantities/skills',
    },
];

const STATS = [
    { num: '6', lbl: 'Big Questions' },
    { num: '7', lbl: 'Key Terms' },
    { num: '2', lbl: 'Key Ideas' },
    { num: '4', lbl: 'Skills' },
    { num: '80', lbl: 'Practice Qs' },
];

export default function ComparingQuantities() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cq-fullpage">
            {/* ── LEFT HERO ───────────────────────────────── */}
            <div className="cq-left">
                <div className="cq-deco cq-deco-a" />
                <div className="cq-deco cq-deco-b" />
                <div className="cq-deco cq-deco-c" />

                <button
                    onClick={() => navigate('/senior/grade/8')}
                    className="cq-nav-back-abs"
                >
                    ← Back to Chapters
                </button>

                <div className="cq-left-content">
                    <h1 className="cq-main-title">
                        Master <span className="cq-title-accent">Comparing Quantities</span>
                    </h1>

                    <p className="cq-main-sub">
                        Percentages, Profit &amp; Loss, Interest — the money maths of everyday life.
                    </p>

                    <div className="cq-stats-grid">
                        {STATS.map((s) => (
                            <div key={s.lbl} className="cq-stat">
                                <span className="cq-stat-num">{s.num}</span>
                                <span className="cq-stat-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: MODULE CARDS ─────────────────────── */}
            <div className="cq-right">
                <div className="cq-right-header">
                    <h2 className="cq-right-title">
                        Comparing{' '}
                        <span className="cq-right-title-accent">Quantities</span>
                    </h2>
                    <p className="cq-right-subtitle">
                        Start with the introduction, build your vocabulary, then sharpen all 4 skills.
                    </p>
                </div>

                <div className="cq-cards-col">
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className="cq-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div className="cq-card-strip" style={{ background: mod.color }} />
                            <div className="cq-card-icon" style={{ background: `${mod.color}15` }}>
                                {mod.icon}
                            </div>
                            <div className="cq-card-text">
                                <div className="cq-card-tagline">{mod.tagline}</div>
                                <div className="cq-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div className="cq-card-desc">{mod.desc}</div>
                            </div>
                            <div className="cq-card-chevron" style={{ color: mod.color }}>›</div>
                        </button>
                    ))}
                </div>

                <p className="cq-footer-text">
                    📚 Based on NCERT Class 8 Mathematics — Chapter 8
                </p>
            </div>
        </div>
    );
}
