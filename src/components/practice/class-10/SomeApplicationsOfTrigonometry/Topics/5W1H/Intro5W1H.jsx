import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../SurfaceAreasAndVolumes/surface-volumes.css';
import MathRenderer from '../../../../../MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Heights & Distances?',
        icon: '🔍',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        content: `Heights and Distances is the branch of trigonometry that deals with measuring inaccessible heights and distances using angles and basic trigonometric ratios. The core idea is simple: if you know one side and one angle of a right triangle, you can find any other side. The "Line of Sight" connects the observer's eye to the object, the "Horizontal" is the reference level, and the angle between them is either an Angle of Elevation or Depression.`,
        fact: '💡 Key Insight: Every real-world measurement problem in this chapter reduces to solving a right-angled triangle using $\\tan\\theta$, $\\sin\\theta$, or $\\cos\\theta$!',
    },
    {
        q: 'WHO',
        label: 'Who uses these concepts?',
        icon: '👥',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Surveyors measure land boundaries and topography. Architects calculate building heights and shadow lengths. Navigators use elevation angles to find distances to lighthouses. Astronomers measure the distance and altitude of celestial bodies. Military engineers calculate projectile angles and target distances. Even hikers use clinometers (angle measurers) to estimate mountain heights!`,
        fact: '💡 The ancient Greeks used trigonometry to estimate the distance to the Moon and the Sun — over 2000 years ago!',
    },
    {
        q: 'WHEN',
        label: 'When do we use each ratio?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Use $\\tan\\theta$ when you have height and distance (opposite and adjacent). Use $\\sin\\theta$ when you have the hypotenuse and need the height (opposite). Use $\\cos\\theta$ when you have the hypotenuse and need the base (adjacent). Use Angle of Elevation when looking UP at an object. Use Angle of Depression when looking DOWN at an object from a height.`,
        fact: '💡 In NCERT problems, $\\tan\\theta$ is used in about 80% of all Heights & Distances questions because most problems give you height/distance pairs!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see examples?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Real-life examples are everywhere:\n1. Tower Height: A person stands at a distance and looks up at a tower.\n2. Shadow Problems: The sun's altitude changes the length of a shadow.\n3. Lighthouse: A keeper looks down at a boat on the sea.\n4. Bridge Height: An engineer measures the river width from a bridge.\n5. Buildings: Two buildings face each other — angles connect their tops and bases.\n6. Kite Flying: The string makes an angle with the ground.`,
        fact: '💡 The Eiffel Tower\'s height was verified using trigonometric surveying before modern laser devices existed!',
    },
    {
        q: 'WHY',
        label: 'Why study this chapter?',
        icon: '🚀',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `This chapter teaches you to measure things you cannot physically reach. You learn to convert visual "angle clues" into exact numerical answers. It builds spatial reasoning, diagram interpretation, and multi-step problem solving. It is a high-scoring NCERT chapter because the method is always the same: draw a right triangle, label the sides, apply the correct ratio, and solve.`,
        fact: '💡 Mastering this chapter gives you a guaranteed 8-10 marks in Board exams — it is one of the most predictable topics!',
    },
    {
        q: 'HOW',
        label: 'How to solve problems?',
        icon: '🎯',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        content: `Follow this 4-step framework:\n1. Draw the Diagram: Mark the observer, object, horizontal line, and line of sight.\n2. Identify the Triangle: Find the right angle, label Opposite, Adjacent, and Hypotenuse.\n3. Choose the Ratio: Pick $\\tan$, $\\sin$, or $\\cos$ based on which sides are known/needed.\n4. Solve & Verify: Substitute known values, solve for the unknown, and check units.`,
        fact: '💡 Always convert "Angle of Depression" to "Angle of Elevation" using alternate interior angles before solving — it simplifies every problem!',
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
                <div style={{ padding: '0 24px 20px', fontSize: 13, color: '#94a3b8', textAlign: 'right' }}>Tap to explore →</div>
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
                    onClick={() => navigate('/some-applications-of-trigonometry')}
                >
                    ← Back to Hub
                </button>

                <div className="intro-nav-links">
                    <button className="intro-nav-link intro-nav-link--active">🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/some-applications-of-trigonometry/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/some-applications-of-trigonometry/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="intro-hero-deco intro-hero-deco-a" />
                <div className="intro-hero-deco intro-hero-deco-b" />
                <div className="intro-hero-inner">
                    <h1 className="intro-hero-title">
                        Discover Heights & Distances Through{' '}
                        <span className="intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="intro-hero-sub">
                        Tap each card to explore ✨
                    </p>
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
                    onClick={() => navigate('/some-applications-of-trigonometry/terminology')}
                    style={{ cursor: 'pointer', marginTop: '32px' }}
                >
                    <div className="intro-cta-emoji">🧠</div>
                    <div className="intro-cta-body">
                        <div className="intro-cta-title">Mastered the basics?</div>
                        <p className="intro-cta-sub">
                            Next: 10 key terms and the 5 golden rules of Heights & Distances.
                        </p>
                    </div>
                    <button className="intro-cta-btn">
                        Explore Terminology ✨
                    </button>
                </div>
            </main>
        </div>
    );
}
