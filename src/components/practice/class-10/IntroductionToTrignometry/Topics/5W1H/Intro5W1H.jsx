import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../trigonometry.css';
import MathRenderer from '../../../../../MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Trigonometry?',
        icon: '📐',
        gradFrom: '#8b5cf6',
        gradTo: '#a855f7',
        shadow: 'rgba(139, 92, 246, 0.35)',
        content: `Trigonometry literally means "triangle measurement". It is the mathematical study of the relationship between the lengths of sides and the angles of a triangle. In Class 10, we specifically focus on Right-Angled Triangles. We define ratios of sides (like opposite to hypotenuse) corresponding to acute angles.`,
        fact: '💡 Did you know? The word "trigonometry" is derived from the Greek words "trigonon" (triangle) and "metron" (measure).',
    },
    {
        q: 'WHO',
        label: 'Who Uses Trigonometry?',
        icon: '👨‍🚀',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14, 165, 233, 0.35)',
        content: `Many professionals rely on trigonometry! Engineers use it to design bridges and buildings. Astronomers use it to calculate the distance to stars and planets. Surveyors measure land layouts. Navigators on ships use it to plot courses. Even Computer Graphics Designers use it to rotate and animate 3D models in video games!`,
        fact: '💡 Hipparchus, a Greek astronomer, is considered the "father of trigonometry" for compiling the very first trigonometric table.',
    },
    {
        q: 'WHEN',
        label: 'When Do We Use It?',
        icon: '⏳',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245, 158, 11, 0.35)',
        content: `We use trigonometry when we only know partial information about a right triangle and need to find the rest. For instance, if you know your distance from a building and the angle you are looking up at its roof, you can use trigonometry to find the height of the building *without* having to climb it!`,
        fact: '💡 Finding heights of tall historical monuments or trees from a distance is a classic application of trigonometry!',
    },
    {
        q: 'WHERE',
        label: 'Where Do We See It?',
        icon: '🌉',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244, 63, 94, 0.35)',
        content: `Trigonometry is visibly used everywhere in our spatial world:\n1. Architecture: Calculating slopes of roofs or structural loads.\n2. Aviation: Determining flight paths, ascent, and descent angles.\n3. Navigation: GPS and positioning systems use triangulation.\n4. Nature: Measuring the width of a river without crossing it.`,
        fact: '💡 The height of Mount Everest was mathematically calculated using trigonometry long before anyone climbed it!',
    },
    {
        q: 'WHY',
        label: 'Why Ratios?',
        icon: '🤔',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16, 185, 129, 0.35)',
        content: `Why not just measure everything directly? Because sometimes it is physically impossible! You can't reach the stars with a tape measure, and you can't stretch a string across a wide rushing river. By establishing fixed ratios between sides for specific angles (like $\\sin 30^\\circ = 1/2$), we can calculate the unknown mathematically with high precision.`,
        fact: '💡 Trigonometric ratios of an acute angle in a right triangle express the relationship between the angle and the length of its sides.',
    },
    {
        q: 'HOW',
        label: 'How to Solve Problems?',
        icon: '📝',
        gradFrom: '#6366f1',
        gradTo: '#818cf8',
        shadow: 'rgba(99, 102, 241, 0.35)',
        content: `Follow this 6-step framework to master trigonometry:\n1. Draw the right-angled triangle.\n2. Identify the reference acute angle.\n3. Label the sides: Hypotenuse, Opposite, and Adjacent.\n4. Choose the correct ratio ($\sin$, $\cos$, or $\tan$) using SOH-CAH-TOA.\n5. Substitute the known values.\n6. Solve the equation for the unknown.`,
        fact: '💡 Always remember: the "Opposite" side changes depending on which acute angle you pick as your reference!',
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

export default function Intro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="intro-page">
            <nav className="intro-nav">
                <button
                    className="intro-nav-back"
                    onClick={() => navigate('/introduction-to-trigonometry')}
                >
                    ← Back to Hub
                </button>

                <div className="intro-nav-links">
                    <button className="intro-nav-link intro-nav-link--active">🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/introduction-to-trigonometry/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/introduction-to-trigonometry/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="intro-hero" style={{ padding: '10px 16px 12px' }}>
                <div className="intro-hero-deco intro-hero-deco-a" />
                <div className="intro-hero-deco intro-hero-deco-b" />
                <div className="intro-hero-inner">
                    <h1 className="intro-hero-title" style={{ fontSize: '1.4rem' }}>
                        Discover Trigonometry Through{' '}
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
                    onClick={() => navigate('/introduction-to-trigonometry/terminology')}
                    style={{ cursor: 'pointer', marginTop: '12px', padding: '10px 16px' }}
                >
                    <div className="intro-cta-emoji" style={{ fontSize: '1.5rem' }}>🧠</div>
                    <div className="intro-cta-body">
                        <div className="intro-cta-title" style={{ fontSize: '0.9rem' }}>Mastered the basics?</div>
                        <p className="intro-cta-sub" style={{ fontSize: '0.75rem' }}>
                            Next: Vocabulary, key rules, and the values table.
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
