import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NumberSystem.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/senior/grade/9/number-system/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: 'Module 1 · 6 Big Questions',
        desc: '6 Big Questions about Number System — What, Why, Who, When, Where and How.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
        color: '#0891b2',
    },
    {
        id: 'terminology',
        path: '/senior/grade/9/number-system/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Module 2 · Key Terms',
        desc: 'Master the language of Number System — Rational, Irrational, Surds & the golden rules.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
        color: '#7c3aed',
    },
    {
        id: 'skills',
        path: '/senior/grade/9/number-system/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Module 3 · 5 Core Skills',
        desc: '5 core skills, with guided learning, practice questions and full assessments.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
        color: '#0369a1',
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="ns-fullpage">
            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="ns-left">
                {/* Decorative circles */}
                <div className="ns-deco ns-deco-a" />
                <div className="ns-deco ns-deco-b" />
                <div className="ns-deco ns-deco-c" />

                <button
                    onClick={() => navigate('/senior/grade/9')}
                    className="ns-nav-back-abs"
                >
                    ← Back to Syllabus
                </button>

                <div className="ns-left-content">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="ns-main-title">
                            Master <span className="ns-title-accent">Number System</span>
                        </h1>

                        <p className="ns-main-sub">
                            From rational numbers to complex surds — learn the
                            language of mathematics from the ground up.
                        </p>
                    </motion.div>

                    {/* Stats grid */}
                    <div className="ns-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="ns-stat" key={i}>
                                <span className="ns-stat-num" style={{ color: s.color }}>
                                    {s.val}
                                </span>
                                <span className="ns-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="ns-right">
                <div className="ns-right-header">
                    <h2 className="ns-right-title">
                        Number{' '}
                        <span className="ns-right-title-accent">System</span>
                    </h2>
                    <p className="ns-right-subtitle">
                        Choose a module to explore — from basics to mastery.
                    </p>
                </div>

                <div className="ns-cards-col">
                    {MODULES.map((mod, idx) => (
                        <motion.button
                            key={mod.id}
                            className="ns-card-btn"
                            onClick={() => navigate(mod.path)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="ns-card-strip"
                                style={{ background: mod.color }}
                            />

                            {/* Icon */}
                            <div
                                className="ns-card-icon"
                                style={{
                                    background: `${mod.color}15`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="ns-card-text">
                                <div className="ns-card-tagline">{mod.tagline}</div>
                                <div
                                    className="ns-card-label"
                                    style={{ color: mod.color }}
                                >
                                    {mod.label}
                                </div>
                                <div className="ns-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div
                                className="ns-card-chevron"
                                style={{ color: mod.color }}
                            >
                                ›
                            </div>
                        </motion.button>
                    ))}
                </div>

                <p className="ns-footer-text">
                    📚 Based on Mathematics — Grade 9 Curriculum
                </p>
            </div>
        </div>
    );
}
