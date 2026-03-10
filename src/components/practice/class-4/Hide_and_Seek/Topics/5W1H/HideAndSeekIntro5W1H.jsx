import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../../Shapes_Around_Us/shapes-around-us.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Hide and Seek about?',
        icon: '🔍',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Hide and Seek is all about Spatial Reasoning — understanding where things are, how they look from different angles, and how to find your way around! Imagine looking at a toy car: from the top it looks like a rectangle, from the front it looks different, and from the side it has wheels. This chapter teaches you to see objects from every direction!`,
        fact: '💡 Architects use spatial reasoning every day to design buildings that look amazing from all sides!',
    },
    {
        q: 'WHO',
        label: 'Who uses spatial skills?',
        icon: '🧭',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.35)',
        content: `Map-makers, delivery drivers, pilots, explorers, and even video game designers all use spatial skills! When a pilot reads a map to find the airport, or when you use Google Maps to find your friend's house — that's spatial reasoning in action!`,
        fact: '💡 Ancient sailors used stars and hand-drawn maps with landmarks and directions to navigate the oceans!',
    },
    {
        q: 'WHEN',
        label: 'When do we use views?',
        icon: '👁️',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Every time you describe what something looks like, you are using views! When you draw a picture of your house, you pick a view — front, side, or top. Engineers use "top view" (also called a plan) to design roads, and "side view" (also called elevation) to design buildings!`,
        fact: '💡 A bird flying above your school sees the "top view" — also called a bird\'s eye view!',
    },
    {
        q: 'WHERE',
        label: 'Where do we find grids & maps?',
        icon: '🗺️',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Grids are everywhere — the squares on a chess board, the rows and columns of a spreadsheet, even the streets of a planned city! Maps use grids too, with rows labeled A, B, C and columns numbered 1, 2, 3, so you can find any place by its "coordinates" like B3 or D5!`,
        fact: '💡 The game Battleship uses a grid coordinate system — you call out "B4" to fire at a specific square!',
    },
    {
        q: 'WHY',
        label: 'Why is spatial reasoning important?',
        icon: '🧩',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Spatial reasoning helps you solve puzzles, pack a suitcase efficiently, give directions to someone who is lost, read a treasure map, or even park a car! It trains your brain to think in 3D, rotate objects mentally, and understand how flat maps represent the real round world.`,
        fact: '💡 Studies show that kids who are good at spatial puzzles often become great engineers and scientists!',
    },
    {
        q: 'HOW',
        label: 'How do we read maps?',
        icon: '📍',
        gradFrom: '#dc2626',
        gradTo: '#f87171',
        shadow: 'rgba(248,113,113,0.35)',
        content: `Reading a map is like being a detective! First, find where you are. Then use landmarks (things you can see like a park or temple), directions (North, South, East, West), and the scale (how big distances really are) to figure out where to go. Practice with grid maps first, then graduate to real-world maps!`,
        fact: '💡 On most maps, North is at the top, South at the bottom, East on the right, and West on the left!',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`sau-intro-card${open ? ' sau-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="sau-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />
            <div className="sau-intro-card-header">
                <div
                    className="sau-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div className="sau-intro-card-title-block">
                    <div className="sau-intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="sau-intro-card-sublabel">{card.label}</div>
                </div>
                <div
                    className="sau-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>
            {!open && <div className="sau-intro-card-hint">Tap to explore →</div>}
            {open && (
                <div className="sau-intro-card-body">
                    <div className="sau-intro-card-content">{card.content}</div>
                    <div
                        className="sau-intro-card-fact"
                        style={{
                            background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                            borderColor: card.gradFrom + '30',
                        }}
                    >
                        {card.fact}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function HideAndSeekIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="sau-intro-page" style={{ background: '#ecfdf5' }}>
            <nav className="sau-nav">
                <button className="sau-nav-back" style={{ color: '#059669' }} onClick={() => navigate('/junior/grade/4/hide-and-seek')}>
                    ← Back to Hide and Seek
                </button>
                <div className="sau-nav-links">
                    <button className="sau-nav-link sau-nav-link--active" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }} onClick={() => navigate('/junior/grade/4/hide-and-seek/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/hide-and-seek/terminology')}>📖 Terminology</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/hide-and-seek/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="sau-intro-hero" style={{ padding: '16px 24px 20px', background: 'linear-gradient(135deg, #d1fae5 0%, #e0f2fe 100%)' }}>
                <div className="sau-intro-hero-deco sau-intro-hero-deco-a" />
                <div className="sau-intro-hero-deco sau-intro-hero-deco-b" />
                <div className="sau-intro-hero-inner">
                    <h1 className="sau-intro-hero-title">
                        Discover Spatial Reasoning Through{' '}
                        <span className="sau-intro-hero-highlight" style={{ background: 'linear-gradient(90deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>6 Big Questions</span>
                    </h1>
                    <p className="sau-intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            <div className="sau-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="sau-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div className="sau-intro-cta-strip">
                    <p className="sau-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 10 key terms &amp; spatial reasoning rules
                    </p>
                    <button
                        className="sau-intro-cta-btn"
                        style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
                        onClick={() => navigate('/junior/grade/4/hide-and-seek/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
