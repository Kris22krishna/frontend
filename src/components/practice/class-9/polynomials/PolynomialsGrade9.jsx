import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './polynomials_grade_9.css';

const MODULES = [
    {
        id: 'introduction',
        icon: '🌟',
        label: 'Introduction',
        tagline: 'Module 1 · 6 Big Questions',
        desc: 'Discover the WHAT, WHO, WHEN, WHERE, and WHY of Polynomials through rich real-world examples.',
        color: '#0f4c81', // Can keep or change later if needed
        path: '/senior/grade/9/polynomials/introduction',
    },
    {
        id: 'terminology',
        icon: '📖',
        label: 'Terminology',
        tagline: 'Module 2 · 8 Terms · 2 Key Ideas',
        desc: 'Master the language of terms, coefficients, degrees, zeroes, factors, and identities.',
        color: '#1a237e',
        path: '/senior/grade/9/polynomials/terminology',
    },
    {
        id: 'skills',
        icon: '🎯',
        label: 'Skills',
        tagline: 'Module 3 · 4 Skills · 80 Practice Questions',
        desc: 'Build mastery in identifying Polynomials, finding Zeroes, Factorisation, and Algebraic Identities.',
        color: '#6a1b9a',
        path: '/senior/grade/9/polynomials/skills',
    },
];

const STATS = [
    { num: '6', lbl: 'Big Questions' },
    { num: '8', lbl: 'Key Terms' },
    { num: '2', lbl: 'Key Ideas' },
    { num: '4', lbl: 'Skills' },
    { num: '80', lbl: 'Practice Qs' },
];

export default function PolynomialsGrade9() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="poly-fullpage">
            {/* ── LEFT HERO ───────────────────────────────── */}
            <div className="poly-left">
                <div className="poly-deco poly-deco-a" />
                <div className="poly-deco poly-deco-b" />
                <div className="poly-deco poly-deco-c" />

                <button
                    onClick={() => navigate('/senior/grade/9')}
                    className="poly-nav-back-abs"
                >
                    ← Back to Chapters
                </button>

                <div className="poly-left-content">
                    <h1 className="poly-main-title">
                        Master <span className="poly-title-accent">Polynomials</span>
                    </h1>

                    <p className="poly-main-sub">
                        Variables, Degrees, Zeroes & Factors — the building blocks of Algebra.
                    </p>

                    <div className="poly-stats-grid">
                        {STATS.map((s) => (
                            <div key={s.lbl} className="poly-stat">
                                <span className="poly-stat-num">{s.num}</span>
                                <span className="poly-stat-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: MODULE CARDS ─────────────────────── */}
            <div className="poly-right">
                <div className="poly-right-header">
                    <h2 className="poly-right-title">
                        Polynomials{' '}
                        <span className="poly-right-title-accent">Grade 9</span>
                    </h2>
                    <p className="poly-right-subtitle">
                        Start with the introduction, build your vocabulary, then sharpen all 4 skills.
                    </p>
                </div>

                <div className="poly-cards-col">
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className="poly-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div className="poly-card-strip" style={{ background: mod.color }} />
                            <div className="poly-card-icon" style={{ background: `${mod.color}15` }}>
                                {mod.icon}
                            </div>
                            <div className="poly-card-text">
                                <div className="poly-card-tagline">{mod.tagline}</div>
                                <div className="poly-card-label" style={{ color: mod.color }}>{mod.label}</div>
                                <div className="poly-card-desc">{mod.desc}</div>
                            </div>
                            <div className="poly-card-chevron" style={{ color: mod.color }}>›</div>
                        </button>
                    ))}
                </div>

                <p className="poly-footer-text">
                    📚 Based on NCERT Class 9 Mathematics — Chapter 2
                </p>
            </div>
        </div>
    );
}
