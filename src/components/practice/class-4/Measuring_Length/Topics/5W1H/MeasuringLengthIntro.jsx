import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../measuring-length.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Measuring Length?',
        icon: '📏',
        gradFrom: '#d97706',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Measuring length is finding out how long, tall, or wide something is. We can measure tiny things like ants using millimeters (mm) and centimeters (cm), bigger things like our height or a room using meters (m), and very long distances like towns using kilometers (km)!`,
        fact: '💡 If you stack exactly 100 centimeter cubes, you get 1 meter!',
    },
    {
        q: 'WHO',
        label: 'Who measures length?',
        icon: '👷',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Everyone! Tailors measure cloth to make clothes fit perfectly. Carpenters measure wood to build strong tables and chairs. Architects measure land to build giant skyscrapers. Even athletes track the distance they run!`,
        fact: '💡 Did you know? A tailor uses a flexible measuring tape so they can measure around curves easily!',
    },
    {
        q: 'WHEN',
        label: 'When do we use different units?',
        icon: '⏰',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `We use centimeters for small objects like a pencil or notebook. We jump to meters for bigger objects like the length of a classroom or the height of a tree. We use kilometers only for really long journeys, like the distance from your house to another city!`,
        fact: '💡 A normal pencil is about 15 centimeters long, but a real car is about 4 meters long!',
    },
    {
        q: 'WHERE',
        label: 'Where does zero matter?',
        icon: '🎯',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `When you use a ruler to measure an object, you MUST start exactly at the '0' mark, not the edge of the ruler! If you start at '1', your measurement will be wrong by 1 whole centimeter. Precision is everything!`,
        fact: '💡 If a broken ruler starts at 2cm and the object ends at 10cm, the object is actually 8cm long! (10 - 2 = 8).',
    },
    {
        q: 'WHY',
        label: 'Why do we need standard units?',
        icon: '🌍',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Long ago, people measured using body parts like handspans or footsteps. But a tall person has bigger steps than a short person! To make sure everyone agrees on a length, we use standard, fixed units like centimeters and meters that never change.`,
        fact: '💡 The distance from your elbow to your middle fingertip is called a "Cubit"! It was used to build the Pyramids.',
    },
    {
        q: 'HOW',
        label: 'How do we add or subtract lengths?',
        icon: '✨',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.35)',
        content: `To add or subtract lengths, always make sure the units match! You cannot directly add 5 meters to 20 centimeters. You have to carefully add meters to meters and centimeters to centimeters, carrying over 100 cm as 1 extra meter if needed!`,
        fact: '💡 1 meter and 20 cm is the exact same as 120 cm!',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`ml-intro-card${open ? ' ml-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="ml-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />
            <div className="ml-intro-card-header">
                <div
                    className="ml-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div className="ml-intro-card-title-block">
                    <div className="ml-intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="ml-intro-card-sublabel">{card.label}</div>
                </div>
                <div
                    className="ml-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>
            {!open && <div className="ml-intro-card-hint">Tap to explore →</div>}
            {open && (
                <div className="ml-intro-card-body">
                    <div className="ml-intro-card-content">{card.content}</div>
                    <div
                        className="ml-intro-card-fact"
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

export default function MeasuringLengthIntro() {
    const navigate = useNavigate();

    return (
        <div className="ml-intro-page">
            <nav className="ml-nav">
                <button className="ml-nav-back" onClick={() => navigate('/measuring-length')}>
                    ← Back to Measuring Length
                </button>
                <div className="ml-nav-links">
                    <button className="ml-nav-link ml-nav-link--active" onClick={() => navigate('/measuring-length/introduction')}>🌟 Introduction</button>
                    <button className="ml-nav-link" onClick={() => navigate('/measuring-length/terminology')}>📖 Terminology</button>
                    <button className="ml-nav-link" onClick={() => navigate('/measuring-length/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="ml-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="ml-intro-hero-deco ml-intro-hero-deco-a" />
                <div className="ml-intro-hero-deco ml-intro-hero-deco-b" />
                <div className="ml-intro-hero-inner">
                    <h1 className="ml-intro-hero-title">
                        Discover Measuring Through{' '}
                        <span className="ml-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="ml-intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            <div className="ml-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="ml-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div className="ml-intro-cta-strip">
                    <p className="ml-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 10 key terms &amp; 5 golden rules
                    </p>
                    <button
                        className="ml-intro-cta-btn"
                        onClick={() => navigate('/measuring-length/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
