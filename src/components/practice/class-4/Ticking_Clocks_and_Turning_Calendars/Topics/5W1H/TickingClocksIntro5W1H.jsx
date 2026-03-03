import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../ticking-clocks.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Clocks & Calendars?',
        icon: '🔍',
        gradFrom: '#d97706',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `A clock is a device that measures and shows us the time of the day. It has three hands: the short hour hand, the long minute hand, and the thin second hand. A calendar is a chart that organizes days into weeks, months, and years, helping us plan our lives. Together, clocks and calendars help us know "when" everything happens!`,
        fact: '💡 The oldest known clock is a sundial from ancient Egypt, dating back to around 1500 BCE!',
    },
    {
        q: 'WHO',
        label: 'Who uses Clocks & Calendars?',
        icon: '👥',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Everyone uses time! Students use clocks to know when school starts and ends. Farmers use calendars to know when to plant and harvest. Pilots use precise clocks to schedule flights. Doctors time their surgeries. Even your body has an internal clock that tells you when to sleep and wake up!`,
        fact: '💡 Astronauts on the International Space Station see 16 sunrises every day because they orbit Earth every 90 minutes!',
    },
    {
        q: 'WHEN',
        label: 'When did people start measuring time?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `People have been measuring time for thousands of years! Ancient Egyptians used sundials and water clocks around 3500 BCE. The first mechanical clock was invented around 1300 AD in Europe. The Gregorian calendar we use today was introduced in 1582. India adopted it officially in 1752!`,
        fact: '💡 The Indian National Calendar (Saka Calendar) was adopted in 1957 alongside the Gregorian calendar for official use.',
    },
    {
        q: 'WHERE',
        label: 'Where do we see time everywhere?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Time is everywhere! On the clock tower at your railway station. On your phone, TV, and microwave. In the school timetable. On calendars hanging on walls. On birthday invitation cards. At the cinema showing movie timings. Even in sports — every cricket match, race, and football game runs on time!`,
        fact: '💡 India has a single time zone (IST = GMT+5:30), but some countries like Russia have 11 different time zones!',
    },
    {
        q: 'WHY',
        label: 'Why should I learn about time?',
        icon: '🚀',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Learning to tell time helps you be independent and punctual. You'll know when to wake up, when school starts, how long a movie lasts, and when your birthday falls! Understanding calendars helps you plan holidays, remember important dates, and understand seasons. Time management is a superpower for life!`,
        fact: '💡 Studies show that children who learn to tell time early develop better organizational skills throughout their lives!',
    },
    {
        q: 'HOW',
        label: 'How do I read time and calendars?',
        icon: '🎯',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.35)',
        content: `Start with the clock: the short hand points to the hour, the long hand points to the minutes. When the minute hand is at 12, it's "o'clock." At 3, it's "quarter past." At 6, it's "half past." At 9, it's "quarter to" the next hour. For calendars, learn the 12 months, how many days each has, and the trick: "30 days hath September, April, June, and November!"`,
        fact: '💡 A quick trick: Make a fist — the knuckles and valleys tell you which months have 31 or 30 days!',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`tc-intro-card${open ? ' tc-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="tc-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />
            <div className="tc-intro-card-header">
                <div
                    className="tc-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div className="tc-intro-card-title-block">
                    <div className="tc-intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="tc-intro-card-sublabel">{card.label}</div>
                </div>
                <div
                    className="tc-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>
            {!open && <div className="tc-intro-card-hint">Tap to explore →</div>}
            {open && (
                <div className="tc-intro-card-body">
                    <div className="tc-intro-card-content">{card.content}</div>
                    <div
                        className="tc-intro-card-fact"
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

export default function TickingClocksIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="tc-intro-page">
            <nav className="tc-nav">
                <button className="tc-nav-back" onClick={() => navigate('/ticking-clocks')}>
                    ← Back to Ticking Clocks
                </button>
                <div className="tc-nav-links">
                    <button className="tc-nav-link tc-nav-link--active" onClick={() => navigate('/ticking-clocks/introduction')}>🌟 Introduction</button>
                    <button className="tc-nav-link" onClick={() => navigate('/ticking-clocks/terminology')}>📖 Terminology</button>
                    <button className="tc-nav-link" onClick={() => navigate('/ticking-clocks/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="tc-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="tc-intro-hero-deco tc-intro-hero-deco-a" />
                <div className="tc-intro-hero-deco tc-intro-hero-deco-b" />
                <div className="tc-intro-hero-inner">
                    <h1 className="tc-intro-hero-title">
                        Discover Time & Calendars Through{' '}
                        <span className="tc-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="tc-intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            <div className="tc-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="tc-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div className="tc-intro-cta-strip">
                    <p className="tc-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 10 key terms &amp; 5 golden rules
                    </p>
                    <button
                        className="tc-intro-cta-btn"
                        onClick={() => navigate('/ticking-clocks/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
