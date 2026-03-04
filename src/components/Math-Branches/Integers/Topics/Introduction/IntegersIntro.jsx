import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, BookOpen, Target, CircleHelp as HelpCircle, Users, Calendar, MapPin, Rocket, Crosshair } from 'lucide-react';
import '../../integers.css';
import MathRenderer from '@/components/MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Integers?',
        icon: <HelpCircle />,
        sublabel: 'The Definition',
        gradFrom: '#4f46e5',
        gradTo: '#7c3aed',
        content: `Integers are matching pairs of positive and negative numbers, along with zero. Think of them as "whole numbers" that can go in two opposite directions. If $+5$ is five steps forward, then $-5$ is five steps backward. Together, they create a complete system for measuring change!`,
        fact: 'The word "Integer" comes from the Latin word "interger," meaning "whole" or "untouched."',
    },
    {
        q: 'WHO',
        label: 'Who uses Integers?',
        icon: <Users />,
        sublabel: 'The Users',
        gradFrom: '#0d9488',
        gradTo: '#10b981',
        content: `Weather reporters use them for temperatures ($20°C$ vs $-5°C$). Accountants use them for profits ($+$) and losses ($-$). Even in games like Minecraft, your Y-coordinate uses integers to tell if you are above ground or deep in a cave!`,
        fact: 'Digital thermometers use tiny sensors to detect if energy is moving "positive" or "negative"!',
    },
    {
        q: 'WHEN',
        label: 'When did they appear?',
        icon: <Calendar />,
        sublabel: 'The History',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        content: `The idea of "negative" numbers was first used in ancient China around $200$ BCE, using red rods for positive and black rods for negative. Later, Indian mathematicians like Brahmagupta in $628$ CE defined them clearly as "debts" versus "fortunes".`,
        fact: 'For a long time, many European mathematicians called negative numbers "absurd" or "false"!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see them?',
        icon: <MapPin />,
        sublabel: 'Real World',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        content: `Look at a lift! The ground floor is $0$, the higher floors are $+1, +2$, and the basement levels are $-1, -2$. You see them in sports scores (goal difference), bank balances, and even when you use "BC" and "AD" in history class.`,
        fact: 'The Dead Sea is at an elevation of about $-430$ meters—the lowest point on Earth\'s land!',
    },
    {
        q: 'WHY',
        label: 'Why learn them?',
        icon: <Rocket />,
        sublabel: 'The Purpose',
        gradFrom: '#4338ca',
        gradTo: '#6366f1',
        content: `Without integers, we couldn't describe "opposites" easily. They allow us to do subtraction without getting stuck at zero. They are the foundation of Algebra, Physics, and Economics. Learning them helps your brain handle complex, multi-directional ideas!`,
        fact: 'In computer science, integers are the most basic way we store numbers in memory!',
    },
    {
        q: 'HOW',
        label: 'How to master them?',
        icon: <Crosshair />,
        sublabel: 'The strategy',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        content: `Visualise! Use models like the number line or a vertical building. Remember: "Negative" just means "Opposite". Once you see the patterns, working with these "signed numbers" becomes as easy as counting!`,
        fact: 'Practice makes perfect—try thinking of everyday numbers as "directed" values!',
    },
];

function IntroCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`intro-card ${open ? "intro-card--open" : ""}`}
            onClick={() => setOpen(!open)}
            style={{ borderColor: open ? card.gradFrom : "#e2e8f0" }}
        >
            <div
                className="intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            <div className="intro-card-header">
                <div
                    className="intro-card-icon"
                    style={{ background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})` }}
                >
                    {card.icon}
                </div>
                <div className="intro-card-title-block">
                    <div className="intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="intro-card-sublabel">{card.sublabel}</div>
                </div>
                <ChevronDown
                    className="intro-card-chevron"
                    style={{
                        transform: open ? 'rotate(180deg)' : 'none',
                        color: open ? card.gradFrom : '#64748b'
                    }}
                />
            </div>

            {!open && (
                <div className="intro-card-hint">
                    Tap to explore <span style={{ color: card.gradFrom }}>{card.label}</span>
                </div>
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="intro-card-body"
                    >
                        <div className="intro-card-content">
                            <MathRenderer text={card.content} />
                        </div>
                        <div
                            className="intro-card-fact"
                            style={{
                                background: `${card.gradFrom}08`,
                                borderLeft: `3px solid ${card.gradFrom}`,
                                color: '#0f172a',
                                fontWeight: 600
                            }}
                        >
                            <MathRenderer text={`💡 ${card.fact}`} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function IntegersIntro() {
    const navigate = useNavigate();

    return (
        <div className="int-page">
            <nav className="int-nav">
                <button className="int-nav-back" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/integers')}>
                    ← Back to Integers
                </button>
                <div className="int-nav-links">
                    <button className="int-nav-link int-nav-link--active">
                        <Sparkles size={16} style={{ marginRight: '6px' }} /> Introduction
                    </button>
                    <button className="int-nav-link" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/terminology')}>
                        <BookOpen size={16} style={{ marginRight: '6px' }} /> Terminology
                    </button>
                    <button className="int-nav-link" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/skills')}>
                        <Target size={16} style={{ marginRight: '6px' }} /> Skills
                    </button>
                </div>
            </nav>

            <div className="int-hero">
                <div className="int-hero-deco int-hero-deco-a" />
                <div className="int-hero-deco int-hero-deco-b" />

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="int-hero-title"
                >
                    Discover Integers Through <span className="int-hero-highlight">6 Big Questions</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="int-hero-sub"
                >
                    Tap each card to explore the "other side of zero" ✨
                </motion.p>
            </div>

            <div className="int-content">
                <div className="int-grid">
                    {cards5W1H.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            <IntroCard card={card} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="int-cta-strip"
                >
                    <p className="int-cta-sub">Ready to master the language of signed numbers?</p>
                    <button
                        className="int-cta-btn"
                        onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/terminology')}
                    >
                        Master Terminology →
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
