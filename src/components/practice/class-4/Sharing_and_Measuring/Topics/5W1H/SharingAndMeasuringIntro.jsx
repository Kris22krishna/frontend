import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../../Shapes_Around_Us/shapes-around-us.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Sharing and Measuring?',
        icon: '🍕',
        gradFrom: '#e11d48',
        gradTo: '#fb7185',
        shadow: 'rgba(225,29,72,0.35)',
        content: `Sharing and Measuring is all about parts and wholes! When you have a single pizza and want to share it equally with a friend, you cut it into two halves. This chapter teaches you how to break things into equal pieces like halves and quarters!`,
        fact: '💡 If you divide an object into two equal parts, each part is called one-half, written as 1/2.',
    },
    {
        q: 'WHO',
        label: 'Who uses fractions?',
        icon: '👨‍🍳',
        gradFrom: '#ea580c',
        gradTo: '#fb923c',
        shadow: 'rgba(234,88,12,0.35)',
        content: `Chefs, carpenters, scientists, and everyone uses fractions! A chef needs "half a cup of milk" for a recipe. A carpenter measures "two and a quarter meters" of wood to build a table. You use fractions when you share your chocolate bar!`,
        fact: '💡 Bakers use special measuring cups that are marked with fractions like 1/4, 1/3, and 1/2 to measure ingredients perfectly.',
    },
    {
        q: 'WHEN',
        label: 'When do we need equal parts?',
        icon: '⚖️',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `We need equal parts when we want to be fair! If you and three friends are sharing the last piece of cake, you must cut it into four EXACTLY equal parts. If one part is bigger, it's not a true "quarter" (1/4)!`,
        fact: '💡 A fraction only works if all the pieces of the whole are exactly the same size!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see fractions?',
        icon: '🕒',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Fractions are everywhere! Look at a clock: a "quarter past" means the minute hand has moved 1/4 of the way around the clock. Look at a ruler: the little lines between the centimeters mark halves and tenths!`,
        fact: '💡 Even music has fractions! Notes are called "half notes" and "quarter notes" depending on how long you play them.',
    },
    {
        q: 'WHY',
        label: 'Why learn about halves & quarters?',
        icon: '🧠',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Understanding halves and quarters is the first step to mastering all of mathematics! Once you know how to break one whole into smaller pieces, you can understand money (50 paise is half a rupee), time, and measurements easily.`,
        fact: '💡 Two quarters (1/4 + 1/4) put together make exactly one half (1/2)! Try it with a piece of paper.',
    },
    {
        q: 'HOW',
        label: 'How do we write fractions?',
        icon: '✍️',
        gradFrom: '#c026d3',
        gradTo: '#e879f9',
        shadow: 'rgba(192,38,211,0.35)',
        content: `A fraction has two numbers! The top number (numerator) tells you how many parts you have. The bottom number (denominator) tells you how many equal parts the whole was divided into. So 3/4 means "3 out of 4 equal parts"!`,
        fact: '💡 Remember: "Denominator is Down". It\'s the number on the bottom of the fraction!',
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

export default function SharingAndMeasuringIntro() {
    const navigate = useNavigate();

    return (
        <div className="sau-intro-page" style={{ background: '#fdf2f8' }}>
            <nav className="sau-nav">
                <button className="sau-nav-back" style={{ color: '#db2777' }} onClick={() => navigate('/junior/grade/4/sharing-and-measuring')}>
                    ← Back to Sharing and Measuring
                </button>
                <div className="sau-nav-links">
                    <button className="sau-nav-link sau-nav-link--active" style={{ background: 'linear-gradient(135deg, #e11d48, #fb7185)' }} onClick={() => navigate('/junior/grade/4/sharing-and-measuring/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/sharing-and-measuring/terminology')}>📖 Terminology</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/sharing-and-measuring/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="sau-intro-hero" style={{ padding: '16px 24px 20px', background: 'linear-gradient(135deg, #fce7f3 0%, #fee2e2 100%)' }}>
                <div className="sau-intro-hero-deco sau-intro-hero-deco-a" />
                <div className="sau-intro-hero-deco sau-intro-hero-deco-b" />
                <div className="sau-intro-hero-inner">
                    <h1 className="sau-intro-hero-title">
                        Discover Parts & Wholes Through{' '}
                        <span className="sau-intro-hero-highlight" style={{ background: 'linear-gradient(90deg, #e11d48, #fb7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>6 Big Questions</span>
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
                        Up next: 10 key terms about fractions
                    </p>
                    <button
                        className="sau-intro-cta-btn"
                        style={{ background: 'linear-gradient(135deg, #e11d48, #fb7185)' }}
                        onClick={() => navigate('/junior/grade/4/sharing-and-measuring/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
