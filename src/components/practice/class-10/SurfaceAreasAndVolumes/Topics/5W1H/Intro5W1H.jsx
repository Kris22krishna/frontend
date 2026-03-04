import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../surface-volumes.css';
import MathRenderer from '../../../../../MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Surface Area & Volume?',
        icon: '🔍',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        content: `Surface Area is the total area that the surface of a 3D object occupies. Think of it as the amount of "wrapping paper" needed to cover the solid. Volume is the amount of space occupied by the object — how much "water" it can hold. Combined Solids are shapes made by joining basic solids like cones, cylinders, and spheres.`,
        fact: '💡 Key Difference: TSA includes all surfaces, while CSA excludes bases. When solids join, some surfaces become "internal" and are no longer part of the Total Surface Area!',
    },
    {
        q: 'WHO',
        label: 'Who uses these concepts?',
        icon: '👥',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Professionals across various fields use these calculations every day! Engineers calculate material needs for machinery. Architects design buildings and storage tanks. Tent makers calculate canvas requirements. Industrial designers plan packaging for products. Manufacturing units use volume for capacity planning.`,
        fact: '💡 Even Doctors use volume concepts to determine the capacity of organs or the dosage of liquid medicine!',
    },
    {
        q: 'WHEN',
        label: 'When do we use each?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Use Surface Area when you need to paint, polish, or wrap an object. Use Volume when you need to find how much material it's made of (like iron in a pole). Use Capacity when measuring liquid or gas a container can hold. Use Displacement when an object is dropped into water to find its volume.`,
        fact: '💡 Archimedes discovered the concept of displacement while taking a bath — the famous "Eureka!" moment!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see examples?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Real-life examples are everywhere: 
1. Tent: A cylinder topped with a cone.
2. Capsule: A cylinder with two hemispherical ends.
3. Shed: A cuboid with a half-cylinder roof.
4. Toy: A cone mounted on a hemisphere.
5. Glass: A cylinder with a raised hemispherical base inside.
6. Gulab Jamun: Cylindrical shape with hemispherical ends.`,
        fact: '💡 Most industrial parts are "Composite Solids" — combinations of simple geometric shapes!',
    },
    {
        q: 'WHY',
        label: 'Why study combined solids?',
        icon: '🚀',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Most objects in the real world aren't just simple spheres or cubes. By studying combined solids, we learn to break complex problems into solvable parts. We learn why Surface Area isn't just simple addition (due to hidden surfaces) and how Volume rules differ (it remains additive even if shapes join).`,
        fact: '💡 Mastering this chapter builds your spatial reasoning and visual thinking skills!',
    },
    {
        q: 'HOW',
        label: 'How to solve problems?',
        icon: '🎯',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        content: `Follow this 4-step framework:
1. Visualise & Break: Identify the basic solids making up the shape.
2. Hidden Surfaces: Decide which surfaces are lost when objects join.
3. Add/Subtract: Decide whether to add volumes or subtract hollow parts.
4. Formula & Units: Apply specific formulas for each part and ensure units are consistent.`,
        fact: '💡 Always check if the question asks for Surface Area (Exterior) or Volume (Interior) before you start!',
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
                    onClick={() => navigate('/surface-areas-and-volumes')}
                >
                    ← Back to Hub
                </button>

                <div className="intro-nav-links">
                    <button className="intro-nav-link intro-nav-link--active">🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/surface-areas-and-volumes/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/surface-areas-and-volumes/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="intro-hero-deco intro-hero-deco-a" />
                <div className="intro-hero-deco intro-hero-deco-b" />
                <div className="intro-hero-inner">
                    <h1 className="intro-hero-title">
                        Discover Surface Areas & Volumes Through{' '}
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
                    onClick={() => navigate('/surface-areas-and-volumes/terminology')}
                    style={{ cursor: 'pointer', marginTop: '32px' }}
                >
                    <div className="intro-cta-emoji">🧠</div>
                    <div className="intro-cta-body">
                        <div className="intro-cta-title">Mastered the basics?</div>
                        <p className="intro-cta-sub">
                            Next: 10 key terms and the 5 golden rules of 3D geometry.
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
