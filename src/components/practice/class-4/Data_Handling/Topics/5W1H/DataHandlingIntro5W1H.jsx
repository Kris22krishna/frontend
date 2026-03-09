import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../data-handling.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Data Handling?',
        icon: '🔍',
        gradFrom: '#059669',
        gradTo: '#34d399',
        shadow: 'rgba(52,211,153,0.35)',
        content: `Data handling is all about collecting information (called "data"), organizing it neatly in tables, and showing it using pictures or charts! Imagine asking all your classmates their favourite fruit — instead of a messy list of names, you put it into a clear table that shows exactly how many kids like mangoes, apples, or bananas.`,
        fact: '💡 The word "data" comes from Latin and means "things given". Whenever someone gives you information — that\'s data!',
    },
    {
        q: 'WHO',
        label: 'Who uses data every day?',
        icon: '👥',
        gradFrom: '#7c3aed',
        gradTo: '#a78bfa',
        shadow: 'rgba(167,139,250,0.35)',
        content: `Everyone uses data! Teachers track students' marks and attendance. Shopkeepers count how many items they sold. Doctors look at graphs of temperature to see if a patient is getting better. Even cricket commentators use data to tell you a batsman's average runs!`,
        fact: '💡 Did you know? Weather forecasters collect data from thousands of stations every single day to predict if it will rain tomorrow!',
    },
    {
        q: 'WHEN',
        label: 'When do we collect data?',
        icon: '📅',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.35)',
        content: `We collect data whenever we want to find something out! Want to know the most popular school lunch? Do a survey! Want to track how many books your class reads each month? Keep a record! During elections, people collect data to predict the winner. Data is collected before making any big decision.`,
        fact: '💡 A survey is a set of questions you ask people to collect data. Even your school census is a kind of survey!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see data around us?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Data is everywhere! Newspapers show election results in colourful charts. Your report card is organized data of your marks. The score board at a cricket match shows runs, wickets, and overs. Even the menu at a restaurant organizes food items with their prices — that's organized data!`,
        fact: '💡 Look at a newspaper — you\'ll find at least 3 charts or tables. Weather forecast, stock prices, sports scores — all organized data!',
    },
    {
        q: 'WHY',
        label: 'Why do we need to organize data?',
        icon: '🚀',
        gradFrom: '#d97706',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Imagine your teacher asks "What is the class's favourite subject?" and everyone shouts at once — chaos! But if you write it down, make a table, and count — suddenly you can clearly see that 12 kids like Art, 8 like Math, and 5 like Science. Organized data helps us compare, find the most and least popular things, and make smart decisions!`,
        fact: '💡 Raw, unorganized data is like a messy room — you can\'t find anything! Tables and charts are like shelves and labels.',
    },
    {
        q: 'HOW',
        label: 'How do we show data in pictures?',
        icon: '🎯',
        gradFrom: '#0d9488',
        gradTo: '#2dd4bf',
        shadow: 'rgba(45,212,191,0.35)',
        content: `First, we collect data by asking questions or observing. Then we use tally marks (||||) to count quickly. Next, we organize the tallies into a neat table with categories and numbers. Finally, we draw a pictograph — a chart that uses tiny pictures to represent data. Each picture can stand for 1 item, or even 2, 5, or 10 items using a scale!`,
        fact: '💡 In a pictograph, one 🍎 might stand for 5 apples. So if you see 3 apple icons, that means 15 apples! Always check the key!',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`dh-intro-card${open ? ' dh-intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="dh-intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />
            <div className="dh-intro-card-header">
                <div
                    className="dh-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div className="dh-intro-card-title-block">
                    <div className="dh-intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="dh-intro-card-sublabel">{card.label}</div>
                </div>
                <div
                    className="dh-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>
            {!open && <div className="dh-intro-card-hint">Tap to explore →</div>}
            {open && (
                <div className="dh-intro-card-body">
                    <div className="dh-intro-card-content">{card.content}</div>
                    <div
                        className="dh-intro-card-fact"
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

export default function DataHandlingIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="dh-intro-page">
            <nav className="dh-nav">
                <button className="dh-nav-back" onClick={() => navigate('/data-handling')}>
                    ← Back to Data Handling
                </button>
                <div className="dh-nav-links">
                    <button className="dh-nav-link dh-nav-link--active" onClick={() => navigate('/data-handling/introduction')}>🌟 Introduction</button>
                    <button className="dh-nav-link" onClick={() => navigate('/data-handling/terminology')}>📖 Terminology</button>
                    <button className="dh-nav-link" onClick={() => navigate('/data-handling/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="dh-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="dh-intro-hero-deco dh-intro-hero-deco-a" />
                <div className="dh-intro-hero-deco dh-intro-hero-deco-b" />
                <div className="dh-intro-hero-inner">
                    <h1 className="dh-intro-hero-title">
                        Discover Data Handling Through{' '}
                        <span className="dh-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="dh-intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            <div className="dh-intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="dh-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                <div className="dh-intro-cta-strip">
                    <p className="dh-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 10 key terms &amp; 5 golden rules
                    </p>
                    <button
                        className="dh-intro-cta-btn"
                        onClick={() => navigate('/data-handling/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
