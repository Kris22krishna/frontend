import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Target, ChevronRight } from 'lucide-react';
import './integers.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/6/the-other-side-of-zero/introduction',
        label: 'Introduction',
        icon: <Sparkles />,
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Integers — What, Why, Who, When, Where and How.',
        gradFrom: '#4f46e5',
        gradTo: '#7c3aed',
        shadow: 'rgba(79, 70, 229, 0.4)',
    },
    {
        id: 'terminology',
        path: '/middle/grade/6/the-other-side-of-zero/terminology',
        label: 'Terminology',
        icon: <BookOpen />,
        tagline: 'Key Concepts & Models',
        desc: 'Master the language of Integers — Positive, Negative, Zero, and the Building Model.',
        gradFrom: '#0d9488',
        gradTo: '#10b981',
        shadow: 'rgba(13, 148, 136, 0.4)',
    },
    {
        id: 'skills',
        path: '/middle/grade/6/the-other-side-of-zero/skills',
        label: 'Skills',
        icon: <Target />,
        tagline: 'Practice & Mastery',
        desc: 'Core skills for absolute mastery of signed numbers and their operations.',
        gradFrom: '#e11d48',
        gradTo: '#f43f5e',
        shadow: 'rgba(225, 29, 72, 0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions' },
    { val: '4', label: 'Models' },
    { val: '5', label: 'Skills' },
    { val: '50+', label: 'Practice Qs' },
];

export default function IntegersHub() {
    const navigate = useNavigate();

    return (
        <div className="int-fullpage">
            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="int-left"
            >
                <div className="int-deco int-deco-a" />
                <div className="int-deco int-deco-b" />

                <div className="int-left-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="int-main-title"
                    >
                        Master<br />
                        <span className="int-title-accent">Integers</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="int-main-sub"
                    >
                        Explore the "other side of zero". From the depths of mines
                        to the heights of skyscrapers, discover how numbers
                        work in every direction.
                    </motion.p>

                    <div className="int-stats-grid">
                        {STATS.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="int-stat"
                            >
                                <span className="int-stat-num">{s.val}</span>
                                <span className="int-stat-lbl">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="int-right">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="int-right-eyebrow"
                >
                    Choose a topic to explore
                </motion.p>

                <div className="int-cards-col">
                    {MODULES.map((mod, idx) => (
                        <motion.button
                            key={mod.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                            className="int-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div
                                className="int-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />

                            <div
                                className="int-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 8px 24px ${mod.shadow}`,
                                    color: '#fff'
                                }}
                            >
                                {mod.icon}
                            </div>

                            <div className="int-card-text">
                                <div className="int-card-tagline" style={{ color: mod.gradFrom }}>{mod.tagline}</div>
                                <div className="int-card-label">{mod.label}</div>
                                <div className="int-card-desc">{mod.desc}</div>
                            </div>

                            <div className="int-card-chevron" style={{ color: mod.gradFrom }}>
                                <ChevronRight size={32} />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}
