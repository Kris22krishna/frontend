import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../transport-museum.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Multiplication & Division?',
        icon: '🔍',
        gradFrom: '#d97706',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Multiplication is simply repeating the same addition over and over very efficiently. It’s like counting large groups of things in a fast way! Division is the opposite: it's about sharing things equally into groups or figuring out how many groups we can make out of a big number. Both help us handle large numbers easily!`,
        fact: '💡 If you split 100 into 10 equal groups, each group has exactly 10! That’s why 10 × 10 = 100.',
    },
    {
        q: 'WHO',
        label: 'Who uses large calculations?',
        icon: '👥',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Everyone needs quick math! Shopkeepers use multiplication to find total costs when selling items. Drivers calculate how far their car can travel on a tank of fuel. Event organizers figure out how many boats, buses, or trains they need when there are hundreds of passengers taking a trip!`,
        fact: '💡 Did you know? Engineers use giant multiplication and division problems to ensure airplanes fly safely!',
    },
    {
        q: 'WHEN',
        label: 'When do we use rules of 10 and 100?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `We use them constantly! When you have 14 boxes with 10 pencils each, you just use the times-10 rule: 14 Tens = 140 pencils! The rules of 10s and 100s let us solve problems in our head instantly instead of adding huge columns of numbers!`,
        fact: '💡 To multiply any number by 10, simply imagine the number sliding one place value to the left, adding a zero!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see math in transport?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Math is everywhere in transport! You see it calculating the number of seats on the Punjab Mail train, which has coaches carrying 72 passengers. Or determining how many smaller buses are needed for an expedition of 300 children. Math ensures everyone gets a seat!`,
        fact: '💡 A famous Snake Boat in Kerala can be paddled by up to 128 people! Calculating boats needed for 960 people requires division!',
    },
    {
        q: 'WHY',
        label: 'Why split numbers apart?',
        icon: '🚀',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Splitting and doubling is a math superpower! Why memorize a 15 times-table when you can just split it into 10 and 5? 15 × 5 is just (10 × 5) + (5 × 5) = 50 + 25 = 75. It breaks big intimidating problems into bite-sized, friendly numbers!`,
        fact: '💡 You can calculate 6 × 14 by finding 6 × 7 and doing a "double of 42 = 84!"',
    },
    {
        q: 'HOW',
        label: 'How do I handle remainders?',
        icon: '🎯',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.35)',
        content: `When things don't divide perfectly equally, we get a "remainder". If you have 324 children and a train coach seats 14, dividing tells us how many full coaches we need. But what happens to the remaining children? They need a coach too! The remainder tells us what's left behind so we can adjust our plan.`,
        fact: '💡 The remainder in division will ALWAYS be smaller than the number you are dividing by!',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`tm-intro-card${open ? ' tm-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="tm-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />
            <div className="tm-intro-card-header">
                <div
                    className="tm-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div className="tm-intro-card-title-block">
                    <div className="tm-intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="tm-intro-card-sublabel">{card.label}</div>
                </div>
                <div
                    className="tm-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>
            {!open && <div className="tm-intro-card-hint">Tap to explore →</div>}
            {open && (
                <div className="tm-intro-card-body">
                    <div className="tm-intro-card-content">{card.content}</div>
                    <div
                        className="tm-intro-card-fact"
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

export default function MuseumIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="tm-intro-page">
            <nav className="tm-nav">
                <button className="tm-nav-back" onClick={() => navigate('/the-transport-museum')}>
                    ← Back to The Transport Museum
                </button>
                <div className="tm-nav-links">
                    <button className="tm-nav-link tm-nav-link--active" onClick={() => navigate('/the-transport-museum/introduction')}>🌟 Introduction</button>
                    <button className="tm-nav-link" onClick={() => navigate('/the-transport-museum/terminology')}>📖 Terminology</button>
                    <button className="tm-nav-link" onClick={() => navigate('/the-transport-museum/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="tm-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="tm-intro-hero-deco tm-intro-hero-deco-a" />
                <div className="tm-intro-hero-deco tm-intro-hero-deco-b" />
                <div className="tm-intro-hero-inner">
                    <h1 className="tm-intro-hero-title">
                        Discover Transport Math Through{' '}
                        <span className="tm-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="tm-intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            <div className="tm-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="tm-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div className="tm-intro-cta-strip">
                    <p className="tm-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 10 key terms &amp; 5 golden rules
                    </p>
                    <button
                        className="tm-intro-cta-btn"
                        onClick={() => navigate('/the-transport-museum/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
