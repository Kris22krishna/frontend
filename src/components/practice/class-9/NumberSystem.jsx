import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NumberSystem.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/senior/grade/9/number-system/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Number System — What, Why, Who, When, Where and How.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terminology',
        path: '/senior/grade/9/number-system/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Key Terms · Core Rules',
        desc: 'Master the language of Number System — Rational, Irrational, Surds & the golden rules.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/senior/grade/9/number-system/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: '5 core skills, with guided learning, practice questions and full assessments.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0891b2' },
    { val: '10+', label: 'Key Terms', color: '#7c3aed' },
    { val: '5', label: 'Core Skills', color: '#0369a1' },
    { val: '50+', label: 'Practice Qs', color: '#059669' },
];

export default function NumberSystem() {
    const navigate = useNavigate();

    return (
        <div className="alg-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="alg-left">
                {/* Decorative circles */}
                <div className="alg-deco alg-deco-a" />
                <div className="alg-deco alg-deco-b" />
                <div className="alg-deco alg-deco-c" />

                <div className="alg-left-content">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="alg-main-title">
                            Master<br />
                            <span className="alg-title-accent">Number System</span>
                        </h1>

                        <p className="alg-main-sub">
                            From rational numbers to complex surds — learn the
                            language of mathematics from the ground up.
                        </p>
                    </motion.div>

                    {/* Stats grid */}
                    <div className="alg-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="alg-stat" key={i}>
                                <span
                                    className="alg-stat-num"
                                    style={{ color: s.color }}
                                >
                                    {s.val}
                                </span>
                                <span className="alg-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="alg-right">
                <p className="alg-right-eyebrow">Choose a topic to explore</p>
                <div className="alg-cards-col">
                    {MODULES.map((mod, idx) => (
                        <motion.button
                            key={mod.id}
                            className="alg-card-btn"
                            onClick={() => navigate(mod.path)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="alg-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            {/* Icon */}
                            <div
                                className="alg-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="alg-card-text">
                                <div
                                    className="alg-card-label"
                                    style={{ color: mod.gradFrom }}
                                >
                                    {mod.label}
                                </div>
                                <div className="alg-card-tagline">{mod.tagline}</div>
                                <div className="alg-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className="alg-card-chevron"
                                style={{ color: mod.gradFrom }}
                            >
                                ›
                            </div>
                        </motion.button>
                    ))}
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <button
                        onClick={() => navigate('/senior/grade/9')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748B',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        ← Back to Syllabus
                    </button>
                </div>
            </div>
        </div>
    );
}

