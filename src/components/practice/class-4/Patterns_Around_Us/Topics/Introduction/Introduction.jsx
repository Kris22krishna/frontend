import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../patterns-around-us.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Patterns?',
        icon: '🔁',
        gradFrom: '#d97706',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `A pattern is something that repeats in a logical, magical way! It could be shapes, colors, sounds, or numbers. When you see things lined up following a secret rule—like red, blue, red, blue—you've found a pattern!`,
        fact: '💡 Patterns are nature\'s math! You can find patterns on a tiger\'s coat, the petals of a flower, or a beehive.',
    },
    {
        q: 'WHO',
        label: 'Who uses Patterns?',
        icon: '🎨',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Everyone! Artists use patterns to make beautiful clothes and rugs. Musicians use patterns to create catchy beats. Programmers use patterns to write code. Even you use patterns every day when you follow your morning routine!`,
        fact: '💡 Mathematicians are often called "pattern searchers" because math is all about finding rules and patterns in the world.',
    },
    {
        q: 'WHERE',
        label: 'Where are patterns found?',
        icon: '🌍',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Look right now—they are everywhere! On the tiles of your floor, in the calendar on the wall, in the way numbers grow (2, 4, 6, 8...), and in the coins in your piggy bank! The world is built on patterns.`,
        fact: '💡 A chessboard is a famous pattern of 64 alternating black and white squares!',
    },
    {
        q: 'WHEN',
        label: 'When do we use Odd & Even?',
        icon: '🔢',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `We use them when sharing or pairing things. If you want everyone to have a partner for a dance, you need an EVEN number of people. If there\'s one person left out, that\'s an ODD number! Knowing odd and even helps us divide things fairly.`,
        fact: '💡 The houses on your street use Odd and Even numbers! One side has even-numbered houses, and the other side has odd ones.',
    },
    {
        q: 'WHY',
        label: 'Why learn about Patterns?',
        icon: '🔮',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Because patterns let us predict the future! If you know the rule of a pattern, you don't have to count or guess what comes next—you just KNOW. It turns math into a fun puzzle where you figure out the secret rule.`,
        fact: '💡 If you know the pattern "Add 2", you instantly know that after 98 comes 100!',
    },
    {
        q: 'HOW',
        label: 'How do money patterns work?',
        icon: '🪙',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.35)',
        content: `Money patterns happen when we use different smaller coins to make up a big amount. You can make ₹10 with one ₹10 coin, two ₹5 coins, or ten ₹1 coins! It\'s like a puzzle finding combinations that reach the target.`,
        fact: '💡 Using combinations of 1, 2, 5, and 10 coins, you can make ANY amount you need!',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`pau-intro-card${open ? ' pau-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="pau-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />
            <div className="pau-intro-card-header">
                <div
                    className="pau-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div className="pau-intro-card-title-block">
                    <div className="pau-intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="pau-intro-card-sublabel">{card.label}</div>
                </div>
                <div
                    className="pau-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>
            {!open && <div className="pau-intro-card-hint">Tap to explore →</div>}
            {open && (
                <div className="pau-intro-card-body">
                    <div className="pau-intro-card-content">{card.content}</div>
                    <div
                        className="pau-intro-card-fact"
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

export default function PatternsIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="pau-intro-page">
            <nav className="pau-nav">
                <button className="pau-nav-back" onClick={() => navigate('/junior/grade/4/patterns-around-us')}>
                    ← Back to Patterns Around Us
                </button>
                <div className="pau-nav-links">
                    <button className="pau-nav-link pau-nav-link--active" onClick={() => navigate('/junior/grade/4/patterns-around-us/introduction')}>🌟 Introduction</button>
                    <button className="pau-nav-link" onClick={() => navigate('/junior/grade/4/patterns-around-us/terminology')}>📖 Terminology</button>
                    <button className="pau-nav-link" onClick={() => navigate('/junior/grade/4/patterns-around-us/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="pau-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="pau-intro-hero-deco pau-intro-hero-deco-a" />
                <div className="pau-intro-hero-deco pau-intro-hero-deco-b" />
                <div className="pau-intro-hero-inner">
                    <h1 className="pau-intro-hero-title">
                        Discover the Magic of Patterns Through{' '}
                        <span className="pau-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="pau-intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            <div className="pau-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="pau-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div className="pau-intro-cta-strip">
                    <p className="pau-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 10 key terms &amp; 5 golden rules
                    </p>
                    <button
                        className="pau-intro-cta-btn"
                        onClick={() => navigate('/junior/grade/4/patterns-around-us/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
