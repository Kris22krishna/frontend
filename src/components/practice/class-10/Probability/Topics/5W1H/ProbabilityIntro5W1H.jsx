import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../probability.css';
import MathRenderer from '../../../../../MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Probability?',
        icon: '🎲',
        gradFrom: '#8b5cf6',
        gradTo: '#a855f7',
        shadow: 'rgba(139, 92, 246, 0.35)',
        content: `Probability is the mathematical study of chance. It measures the likelihood of an event occurring, ranging from 0 (impossible) to 1 (certain). In Class 10, we focus on theoretical probability based on equally likely outcomes. We calculate it as the ratio of favorable outcomes to the total possible outcomes.`,
        fact: '💡 Did you know? The foundation of probability theory was laid in the 17th century by mathematicians studying games of chance!',
    },
    {
        q: 'WHO',
        label: 'Who Uses Probability?',
        icon: '🧑‍🔬',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14, 165, 233, 0.35)',
        content: `Weather forecasters use it to predict rain. Insurance companies use it to calculate premiums. Medical researchers use it to test the effectiveness of new drugs. Artificial Intelligence and machine learning models rely heavily on probability to make predictions and decisions!`,
        fact: '💡 Actuaries are professionals who specifically use probability and statistics to assess financial risks in the insurance industry.',
    },
    {
        q: 'WHEN',
        label: 'When Do We Use It?',
        icon: '⏳',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245, 158, 11, 0.35)',
        content: `Whenever there is uncertainty! Whether you're tossing a coin to decide who bats first in cricket, predicting if it will rain tomorrow before planning a picnic, or analyzing the chances of winning a lottery, probability is the tool that helps make informed guesses.`,
        fact: '💡 Even board games like Ludo and Monopoly are entirely dependent on the probability of dice rolls!',
    },
    {
        q: 'WHERE',
        label: 'Where Do We See It?',
        icon: '🌦️',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244, 63, 94, 0.35)',
        content: `Probability is everywhere:\n1. Sports: Predicting match outcomes based on past performance.\n2. Meteorology: "There is a 40% chance of showers today."\n3. Quality Control: Checking a few products to ensure a whole batch is defect-free.\n4. Finance: Estimating the risk of an investment.`,
        fact: '💡 When you play a video game, the loot drops and enemy spawns are often determined by probabilistic algorithms!',
    },
    {
        q: 'WHY',
        label: 'Why Not Just Guess?',
        icon: '🤔',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16, 185, 129, 0.35)',
        content: `Human intuition is surprisingly bad at dealing with randomness. Probability gives us a structured, mathematical framework to evaluate risks and make rational choices instead of relying on "gut feeling". It helps turn uncertainty into quantifiable data that can be analyzed logically.`,
        fact: '💡 The sum of the probabilities of all possible outcomes of an experiment is always exactly 1.',
    },
    {
        q: 'HOW',
        label: 'How to Solve Problems?',
        icon: '📝',
        gradFrom: '#6366f1',
        gradTo: '#818cf8',
        shadow: 'rgba(99, 102, 241, 0.35)',
        content: `Follow these steps to solve a probability problem:\n1. Identify the random experiment.\n2. List all possible outcomes (the Sample Space). This is the denominator.\n3. Identify the event you're interested in.\n4. List the favorable outcomes for that event. This is the numerator.\n5. Divide favorable outcomes by total possible outcomes: $P(E) = \\frac{\\text{favorable}}{\\text{total}}$.`,
        fact: '💡 $P(E) + P(\\bar{E}) = 1$. The probability of an event happening plus it not happening is always 1!',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`intro-card${open ? ' intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div
                className="intro-card-strip"
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />

            <div className="intro-card-header">
                <div
                    className="intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                <div className="intro-card-title-block">
                    <div
                        className="intro-card-q"
                        style={{ color: card.gradFrom }}
                    >
                        {card.q}
                    </div>
                    <div className="intro-card-sublabel">{card.label}</div>
                </div>

                <div
                    className="intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : '#94a3b8',
                        transform: open ? 'rotate(180deg)' : 'none',
                    }}
                >
                    ▼
                </div>
            </div>

            {!open && (
                <div style={{ padding: '0 16px 8px', fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>Tap to explore →</div>
            )}

            {open && (
                <div className="intro-card-body">
                    <div className="intro-card-content">
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className="intro-card-fact"
                        style={{
                            background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                            borderColor: card.gradFrom + '30',
                        }}
                    >
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProbabilityIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="intro-page">
            <nav className="intro-nav">
                <button
                    className="intro-nav-back"
                    onClick={() => navigate('/senior/grade/10/probability')}
                >
                    ← Back to Hub
                </button>

                <div className="intro-nav-links">
                    <button className="intro-nav-link intro-nav-link--active">🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/senior/grade/10/probability/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/senior/grade/10/probability/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="intro-hero" style={{ padding: '10px 16px 12px' }}>
                <div className="intro-hero-deco intro-hero-deco-a" />
                <div className="intro-hero-deco intro-hero-deco-b" />
                <div className="intro-hero-inner">
                    <h1 className="intro-hero-title" style={{ fontSize: '1.4rem' }}>
                        Discover Probability Through{' '}
                        <span className="intro-hero-highlight">6 Big Questions</span>
                    </h1>
                </div>
            </div>

            {/* ── CONTENT AREA ──────────────────────────────── */}
            <main className="intro-content">
                <div className="intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* ── CTA STRIP ──────────────────────────────── */}
                <div
                    className="intro-cta-strip"
                    onClick={() => navigate('/senior/grade/10/probability/terminology')}
                    style={{ cursor: 'pointer', marginTop: '12px', padding: '10px 16px' }}
                >
                    <div className="intro-cta-emoji" style={{ fontSize: '1.5rem' }}>🧠</div>
                    <div className="intro-cta-body">
                        <div className="intro-cta-title" style={{ fontSize: '0.9rem' }}>Mastered the basics?</div>
                        <p className="intro-cta-sub" style={{ fontSize: '0.75rem' }}>
                            Next: Vocabulary, key terms, and formulas.
                        </p>
                    </div>
                    <button className="intro-cta-btn" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        Explore Terminology ✨
                    </button>
                </div>
            </main>
        </div>
    );
}
