import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './integers.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/7/integers/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Integers — What, Why, Who, When, Where and How.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terminology',
        path: '/middle/grade/7/integers/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '8 Key Terms · 4 Rules',
        desc: 'Master the language of Integers — positives, negatives, and the golden computation rules.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/middle/grade/7/integers/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Core integer skills, progressive practice problems, and detailed assessments.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0891b2' },
    { val: '8', label: 'Key Terms', color: '#7c3aed' },
    { val: '4', label: 'Rules', color: '#059669' },
    { val: '4', label: 'Skills', color: '#0369a1' },
];

export default function Integers() {
    const navigate = useNavigate();

    return (
        <div className="int-fullpage" style={{ position: "relative" }}>
            {/* Back Button */}
            <button
                onClick={() => navigate("/middle/grade/7")}
                style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "#1E293B",
                    border: "1px solid #E2E8F0",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    zIndex: 50,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 6px 8px -1px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
            >
                <ArrowLeft size={18} /> Back to Grade 7
            </button>

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="int-left">
                {/* Decorative circles */}
                <div className="int-deco int-deco-a" />
                <div className="int-deco int-deco-b" />
                <div className="int-deco int-deco-c" />

                <div className="int-left-content">
                    <h1 className="int-main-title">
                        Master<br />
                        <span className="int-title-accent">Integers</span>
                    </h1>

                    <p className="int-main-sub">
                        From temperature drops to financial gains — discover the complete world of positive and negative numbers.
                    </p>

                    {/* Stats grid */}
                    <div className="int-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="int-stat" key={i}>
                                <span
                                    className="int-stat-num"
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className="int-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="int-right">
                <p className="int-right-eyebrow">Choose a topic to explore</p>
                <div className="int-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="int-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="int-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className="int-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="int-card-text">
                                <div
                                    className="int-card-label"
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className="int-card-tagline">{mod.tagline}</div>
                                <div className="int-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className="int-card-chevron"
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
