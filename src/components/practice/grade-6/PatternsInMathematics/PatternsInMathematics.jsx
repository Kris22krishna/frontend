import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './patterns.module.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/6/patterns-in-mathematics/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Patterns — What, Why, Who, When, Where and How.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terminology',
        path: '/middle/grade/6/patterns-in-mathematics/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '8 Key Terms · 4 Properties',
        desc: 'Master the language of Patterns — numbers, shapes, rules, and relationships.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/middle/grade/6/patterns-in-mathematics/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Core pattern skills, non-repeating dynamic sequences, and detailed assessments.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0891b2' },
    { val: '8', label: 'Key Terms', color: '#7c3aed' },
    { val: '4', label: 'Properties', color: '#059669' },
    { val: '3', label: 'Skills', color: '#0369a1' },
];

export default function PatternsInMathematics() {
    const navigate = useNavigate();

    return (
        <div className={styles['pat-fullpage']} style={{ position: "relative" }}>
            {/* Back Button */}
            <button
                onClick={() => navigate("/middle/grade/6")}
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
                <ArrowLeft size={18} /> Back to Grade 6
            </button>

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className={styles['pat-left']}>
                {/* Decorative circles */}
                <div className={`${styles['pat-deco']} ${styles['pat-deco-a']}`} />
                <div className={`${styles['pat-deco']} ${styles['pat-deco-b']}`} />
                <div className={`${styles['pat-deco']} ${styles['pat-deco-c']}`} />

                <div className={styles['pat-left-content']}>
                    <h1 className={styles['pat-main-title']}>
                        Master<br />
                        <span className={styles['pat-title-accent']}>Patterns</span>
                    </h1>

                    <p className={styles['pat-main-sub']}>
                        From triangular numbers to snowflake shapes — discover the hidden rules that govern the universe of mathematics.
                    </p>

                    {/* Stats grid */}
                    <div className={styles['pat-stats-grid']}>
                        {STATS.map((s, i) => (
                            <div className={styles['pat-stat']} key={i}>
                                <span
                                    className={styles['pat-stat-num']}
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className={styles['pat-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className={styles['pat-right']}>
                <p className={styles['pat-right-eyebrow']}>Choose a topic to explore</p>
                <div className={styles['pat-cards-col']}>
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className={styles['pat-card-btn']}
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className={styles['pat-card-strip']}
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className={styles['pat-card-icon']}
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className={styles['pat-card-text']}>
                                <div
                                    className={styles['pat-card-label']}
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className={styles['pat-card-tagline']}>{mod.tagline}</div>
                                <div className={styles['pat-card-desc']}>{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className={styles['pat-card-chevron']}
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
