import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './symmetry6.module.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/6/symmetry-6/introduction',
        label: 'Introduction',
        emoji: '🦋',
        tagline: 'Symmetry Around Us',
        desc: 'Explore reflection and rotation in nature, architecture, and daily life.',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245,158,11,0.4)',
    },
    {
        id: 'terminology',
        path: '/middle/grade/6/symmetry-6/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Definitions & Visuals',
        desc: 'Master the language — Line of Symmetry, Center of Rotation, and Angles.',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.4)',
    },
    {
        id: 'skills',
        path: '/middle/grade/6/symmetry-6/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Highly interactive skills for finding lines and angles of symmetry.',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.4)',
    },
];

const STATS = [
    { val: '2', label: 'Types of Symmetry', color: '#f59e0b' },
    { val: '6', label: 'Key Terms', color: '#ec4899' },
    { val: '4', label: 'Visual Models', color: '#10b981' },
    { val: '2', label: 'Core Skills', color: '#0ea5e9' },
];

export default function Symmetry6() {
    const navigate = useNavigate();

    return (
        <div className={styles['sym-fullpage']} style={{ position: "relative" }}>
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
            <div className={styles['sym-left']} style={{ background: 'linear-gradient(145deg, #0f766e 0%, #0d9488 25%, #0ea5e9 50%, #3b82f6 75%, #6366f1 100%)' }}>
                {/* Decorative circles */}
                <div className={`${styles['sym-deco']} ${styles['sym-deco-a']}`} style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, transparent 70%)' }} />
                <div className={`${styles['sym-deco']} ${styles['sym-deco-b']}`} style={{ background: 'radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)' }} />
                <div className={`${styles['sym-deco']} ${styles['sym-deco-c']}`} style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)' }} />

                <div className={styles['sym-left-content']}>
                    <h1 className={styles['sym-main-title']}>
                        Discover<br />
                        <span className={styles['sym-title-accent']} style={{ background: 'linear-gradient(90deg, #fde047 0%, #fef08a 40%, #fdba74 80%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Symmetry</span>
                    </h1>

                    <p className={styles['sym-main-sub']}>
                        From the wings of a butterfly to the rotation of a pinwheel—master patterns that repeat properties.
                    </p>

                    {/* Stats grid */}
                    <div className={styles['sym-stats-grid']}>
                        {STATS.map((s, i) => (
                            <div className={styles['sym-stat']} key={i}>
                                <span
                                    className={styles['sym-stat-num']}
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className={styles['sym-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles['sym-word-chip-cloud']}>
                         <div className={styles['sym-word-chip']}>Reflection</div>
                         <div className={styles['sym-word-chip']}>Axis of Symmetry</div>
                         <div className={styles['sym-word-chip']}>Rotation</div>
                         <div className={styles['sym-word-chip']}>Center of Rotation</div>
                         <div className={styles['sym-word-chip']}>Order of Symmetry</div>
                    </div>
                </div>
            </div>

            {/* 🔴 RIGHT PANEL — Topic Cards */}
            <div className={styles['sym-right']}>
                <p className={styles['sym-right-eyebrow']} style={{ color: '#0ea5e9' }}>Choose a topic to explore</p>
                <div className={styles['sym-cards-col']}>
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className={styles['sym-card-btn']}
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className={styles['sym-card-strip']}
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className={styles['sym-card-icon']}
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className={styles['sym-card-text']}>
                                <div
                                    className={styles['sym-card-label']}
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className={styles['sym-card-tagline']}>{mod.tagline}</div>
                                <div className={styles['sym-card-desc']}>{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className={styles['sym-card-chevron']}
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
