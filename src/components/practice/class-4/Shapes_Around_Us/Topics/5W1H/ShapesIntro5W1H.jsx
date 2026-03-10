import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../shapes-around-us.css';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are 3D and 2D Shapes?',
        icon: '🧊',
        gradFrom: '#d97706',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `2D Shapes like squares and circles are flat patterns on a piece of paper. 3D Shapes like cubes and spheres stick out into the real world. A square is just a drawn box, but a cube is a box you can actually put toys into!`,
        fact: '💡 Most 3D shapes are built using flat 2D shapes for their faces!',
    },
    {
        q: 'WHO',
        label: 'Who builds with shapes?',
        icon: '🏗️',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Architects and builders use shapes to build houses, stadiums, and bridges! A triangular roof lets rain slide off, while strong rectangular pillars hold the building up. Even toys like LEGO blocks are basic 3D shapes.`,
        fact: '💡 The famous Qutub Minar is a towering 3D building made up of thousands of rectangular bricks!',
    },
    {
        q: 'WHEN',
        label: 'When do lines make angles?',
        icon: '📐',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Whenever two straight edges or lines bump into each other and meet at a point, they form an angle! You can see angles everywhere: the corner of your textbook, the hands of a clock, or even in the crook of your elbow.`,
        fact: '💡 The corner of a perfect square or rectangle is called a "Right Angle"!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see circles?',
        icon: '⭕',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Circles are super important in the world! Any wheel on a bicycle or car is a circle—that's what makes it roll smoothly. You can also spot circular shapes in plates, coins, clocks, and even a yummy pizza!`,
        fact: '💡 Every single point on the edge of a perfect circle is exactly the same distance from its center!',
    },
    {
        q: 'WHY',
        label: 'Why do we unfold shapes?',
        icon: '📦',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `If you fold open a cardboard box until it is completely flat on the floor, you've created a "net"! Nets help us understand how a 3D shape is built. By studying the net, we can clearly see all the flat faces that join together to make the solid object!`,
        fact: '💡 A standard 6-sided die is a cube, which means its net is made up of 6 perfect squares!',
    },
    {
        q: 'HOW',
        label: 'How are shapes sorted?',
        icon: '📊',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.35)',
        content: `We sort 3D shapes by looking at their "properties": how many flat faces they have, the number of straight edges, and the number of sharp corners (vertices)! A shape with curved faces, like a ball, is totally different from a box with flat faces!`,
        fact: '💡 A sphere is a super smooth shape—it has 1 curved face, 0 edges, and 0 corners!',
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

export default function ShapesIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="sau-intro-page">
            <nav className="sau-nav">
                <button className="sau-nav-back" onClick={() => navigate('/junior/grade/4/shapes-around-us')}>
                    ← Back to Shapes Around Us
                </button>
                <div className="sau-nav-links">
                    <button className="sau-nav-link sau-nav-link--active" onClick={() => navigate('/junior/grade/4/shapes-around-us/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/shapes-around-us/terminology')}>📖 Terminology</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/shapes-around-us/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="sau-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="sau-intro-hero-deco sau-intro-hero-deco-a" />
                <div className="sau-intro-hero-deco sau-intro-hero-deco-b" />
                <div className="sau-intro-hero-inner">
                    <h1 className="sau-intro-hero-title">
                        Discover Geometry Through{' '}
                        <span className="sau-intro-hero-highlight">6 Big Questions</span>
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
                        Up next: 10 key terms &amp; shape properties
                    </p>
                    <button
                        className="sau-intro-cta-btn"
                        onClick={() => navigate('/junior/grade/4/shapes-around-us/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
