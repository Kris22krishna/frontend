import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './NumberPlay_6.module.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/6/number-play-chapter/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Numbers — What, Why, Who, When, Where and How.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terminology',
        path: '/middle/grade/6/number-play-chapter/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Key Terms & Concepts',
        desc: 'Master the numbers — supercells, palindromes, operations, and Kaprekar\'s constant.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/middle/grade/6/number-play-chapter/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Core number skills, engaging puzzles, and detailed assessments.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0891b2' },
    { val: '6', label: 'Key Skills', color: '#7c3aed' },
    { val: '120', label: 'Dynamic Tasks', color: '#059669' },
    { val: '3', label: 'Modes', color: '#0369a1' },
];

export default function NumberPlay_6() {
    const navigate = useNavigate();

    return (
        <div className={styles['np6-fullpage']} style={{ position: "relative" }}>
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
            <div className={styles['np6-left']}>
                {/* Decorative circles */}
                <div className={`${styles['np6-deco']} ${styles['np6-deco-a']}`} />
                <div className={`${styles['np6-deco']} ${styles['np6-deco-b']}`} />
                <div className={`${styles['np6-deco']} ${styles['np6-deco-c']}`} />

                <div className={styles['np6-left-content']}>
                    <h1 className={styles['np6-main-title']}>
                        Master<br />
                        <span className={styles['np6-title-accent']}>Number Play</span>
                    </h1>

                    <p className={styles['np6-main-sub']}>
                        From Kaprekar sets to Palindromic patterns — discover the fascinating world of numbers.
                    </p>

                    {/* Stats grid */}
                    <div className={styles['np6-stats-grid']}>
                        {STATS.map((s, i) => (
                            <div className={styles['np6-stat']} key={i}>
                                <span
                                    className={styles['np6-stat-num']}
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className={styles['np6-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className={styles['np6-right']}>
                <p className={styles['np6-right-eyebrow']}>Choose a topic to explore</p>
                <div className={styles['np6-cards-col']}>
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className={styles['np6-card-btn']}
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className={styles['np6-card-strip']}
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className={styles['np6-card-icon']}
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className={styles['np6-card-text']}>
                                <div
                                    className={styles['np6-card-label']}
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className={styles['np6-card-tagline']}>{mod.tagline}</div>
                                <div className={styles['np6-card-desc']}>{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className={styles['np6-card-chevron']}
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
