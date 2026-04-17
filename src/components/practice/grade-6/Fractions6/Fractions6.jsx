import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './fractions6.module.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/6/fractions-6/introduction',
        label: 'Introduction',
        emoji: '🍕',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Fractions — What, Why, Who, When, Where and How.',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245,158,11,0.4)',
    },
    {
        id: 'terminology',
        path: '/middle/grade/6/fractions-6/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Definitions & Visuals',
        desc: 'Master the language of Fractions — Numerator, Denominator, Equivalent Fractions.',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.4)',
    },
    {
        id: 'skills',
        path: '/middle/grade/6/fractions-6/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Highly interactive skills for equal shares, finding equivalents, and comparing fractions.',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#f59e0b' },
    { val: '5', label: 'Key Terms', color: '#ec4899' },
    { val: '3', label: 'Visual Models', color: '#10b981' },
    { val: '4', label: 'Core Skills', color: '#0ea5e9' },
];

export default function Fractions6() {
    const navigate = useNavigate();

    return (
        <div className={styles['frac-fullpage']} style={{ position: "relative" }}>
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

            {/* 🔴 LEFT PANEL — Hero */}
            <div className={styles['frac-left']} style={{ background: 'linear-gradient(145deg, #1e3a8a 0%, #312e81 25%, #4c1d95 50%, #7c3aed 75%, #d946ef 100%)' }}>
                {/* Decorative circles */}
                <div className={`${styles['frac-deco']} ${styles['frac-deco-a']}`} style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, transparent 70%)' }} />
                <div className={`${styles['frac-deco']} ${styles['frac-deco-b']}`} style={{ background: 'radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)' }} />
                <div className={`${styles['frac-deco']} ${styles['frac-deco-c']}`} style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)' }} />

                <div className={styles['frac-left-content']}>
                    <h1 className={styles['frac-main-title']}>
                        Master<br />
                        <span className={styles['frac-title-accent']} style={{ background: 'linear-gradient(90deg, #fde047 0%, #fef08a 40%, #fdba74 80%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fractions</span>
                    </h1>

                    <p className={styles['frac-main-sub']}>
                        From dividing chikki bars equally to finding equivalent shares on the fraction wall.
                    </p>

                    {/* Stats grid */}
                    <div className={styles['frac-stats-grid']}>
                        {STATS.map((s, i) => (
                            <div className={styles['frac-stat']} key={i}>
                                <span
                                    className={styles['frac-stat-num']}
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className={styles['frac-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles['frac-word-chip-cloud']}>
                         <div className={styles['frac-word-chip']}>Numerator</div>
                         <div className={styles['frac-word-chip']}>Denominator</div>
                         <div className={styles['frac-word-chip']}>Equivalent</div>
                         <div className={styles['frac-word-chip']}>Mixed Fractions</div>
                    </div>
                </div>
            </div>

            {/* 🔴 RIGHT PANEL — Topic Cards */}
            <div className={styles['frac-right']}>
                <p className={styles['frac-right-eyebrow']} style={{ color: '#ec4899' }}>Choose a topic to explore</p>
                <div className={styles['frac-cards-col']}>
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className={styles['frac-card-btn']}
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className={styles['frac-card-strip']}
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className={styles['frac-card-icon']}
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className={styles['frac-card-text']}>
                                <div
                                    className={styles['frac-card-label']}
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className={styles['frac-card-tagline']}>{mod.tagline}</div>
                                <div className={styles['frac-card-desc']}>{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className={styles['frac-card-chevron']}
                                style={{ color: mod.gradFrom }}
                            >
                                →
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
