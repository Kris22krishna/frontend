import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './lines-and-angles.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/7/lines-and-angles/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Lines and Angles — What, Why, Who, When, Where and How.',
        gradFrom: '#10b981', // Emerald
        gradTo: '#059669',
        shadow: 'rgba(16,185,129,0.4)',
    },
    {
        id: 'terminology',
        path: '/middle/grade/7/lines-and-angles/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Key Terms & Rules',
        desc: 'Master the language of Lines and Angles — rays, segments, transversals, and vital properties.',
        gradFrom: '#f59e0b', // Amber
        gradTo: '#d97706',
        shadow: 'rgba(245,158,11,0.4)',
    },
    {
        id: 'skills',
        path: '/middle/grade/7/lines-and-angles/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Core geometric skills, progressive practice problems, and detailed assessments.',
        gradFrom: '#f43f5e', // Rose
        gradTo: '#e11d48',
        shadow: 'rgba(244,63,94,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#10b981' },
    { val: '12', label: 'Key Terms', color: '#f59e0b' },
    { val: '3', label: 'Rules', color: '#f43f5e' },
    { val: '6', label: 'Skills', color: '#6366f1' },
];

export default function LinesAndAngles() {
    const navigate = useNavigate();

    return (
        <div className="la-fullpage" style={{ position: "relative" }}>
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
            <div className="la-left">
                {/* Decorative circles */}
                <div className="la-deco la-deco-a" />
                <div className="la-deco la-deco-b" />
                <div className="la-deco la-deco-c" />

                <div className="la-left-content">
                    <h1 className="la-main-title">
                        Master<br />
                        <span className="la-title-accent">Lines & Angles</span>
                    </h1>

                    <p className="la-main-sub">
                        From intersecting lines to parallel transversals — discover the complete world of lines and angles.
                    </p>

                    {/* Stats grid */}
                    <div className="la-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="la-stat" key={i}>
                                <span
                                    className="la-stat-num"
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className="la-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="la-right">
                <p className="la-right-eyebrow">Choose a topic to explore</p>
                <div className="la-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="la-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="la-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className="la-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                    color: "#fff"
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="la-card-text">
                                <div
                                    className="la-card-label"
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className="la-card-tagline">{mod.tagline}</div>
                                <div className="la-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className="la-card-chevron"
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
