import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LinesAndAngles.css';
import MathRenderer from '@/components/MathRenderer';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Lines and Angles?',
        icon: '🔍',
        gradFrom: '#4f46e5',
        gradTo: '#7c3aed',
        shadow: 'rgba(79, 70, 229, 0.35)',
        content: `Geometry is all about shapes and measurements. A **Line** is a straight path that goes on forever in both directions. An **Angle** is formed when two lines meet at a common point called the vertex. Together, they are the building blocks of every shape you see!`,
        fact: 'The word "Geometry" comes from the Greek words "Geo" (Earth) and "Metron" (Measure).',
    },
    {
        q: 'WHO',
        label: 'Who uses Geometry?',
        icon: '👥',
        gradFrom: '#0d9488',
        gradTo: '#10b981',
        shadow: 'rgba(13, 148, 136, 0.35)',
        content: `Architects use angles to build stable houses. Engineers use lines to design bridges. Even football players use geometry to calculate the best angle to kick the ball into the goal!`,
        fact: 'Spiders use geometric patterns to build perfectly symmetrical webs!',
    },
    {
        q: 'WHEN',
        label: 'When did it start?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Ancient Egyptians used geometry over $4000$ years ago to redraw land borders after the Nile flooded. Later, Euclid, known as the "Father of Geometry," wrote down the rules we still use today in school!`,
        fact: 'Euclid\'s book "Elements" was used to teach geometry for over $2000$ years!',
    },
    {
        q: 'WHERE',
        label: 'Where do we see them?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Look at the corner of your room—that's a right angle! Look at railway tracks—those are parallel lines. You see lines and angles in the hands of a clock, the scissors you use, and the petals of a flower.`,
        fact: 'Honeycomb cells are perfect hexagons using $120$ degree angles to save space and wax!',
    },
    {
        q: 'WHY',
        label: 'Why learn them?',
        icon: '🚀',
        gradFrom: '#4338ca',
        gradTo: '#6366f1',
        shadow: 'rgba(67, 56, 202, 0.35)',
        content: `Learning geometry helps you understand how the world fits together. It improves your spatial reasoning—the ability to visualize objects and patterns. It's the foundation for art, design, and space exploration!`,
        fact: 'GPS navigation uses geometric triangulation with satellites to find your exact location!',
    },
    {
        q: 'HOW',
        label: 'How to master them?',
        icon: '🎯',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        content: `Observe and Draw! Use a ruler and protractor to see the math in action. Remember: every complex shape is just a collection of lines and angles. Once you understand the basics, you can build anything!`,
        fact: 'The sum of angles in any triangle is always $180$ degrees, no matter the shape!',
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
                    <div className="intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
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
            {!open && <div className="intro-card-hint">Tap to explore →</div>}
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
                        <MathRenderer text={`💡 ${card.fact}`} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function LinesAndAnglesIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="intro-page">
            <nav className="matrices-chapter-header" style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
                <button
                    className="matrices-back-btn"
                    onClick={() => navigate('/middle/grade/6/lines-and-angles')}
                >
                    <ArrowLeft size={18} /> Back to Chapter
                </button>
                <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Fundamental Concept</h1>
            </nav>
            <div className="intro-hero" style={{ padding: '40px 24px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', marginBottom: 16 }}>
                    Discover Lines and Angles Through <span style={{ color: '#4F46E5' }}>6 Big Questions</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#64748B' }}>Tap each card to explore ✨</p>
            </div>
            <div className="intro-content" style={{ padding: '10px 24px 60px', maxWidth: 1000, margin: '0 auto' }}>
                <div className="intro-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', color: '#64748B', marginBottom: 16 }}>Ready to master the terminology?</p>
                    <button
                        onClick={() => navigate('/middle/grade/6/lines-and-angles/terminology')}
                        style={{
                            padding: '14px 32px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
                        }}
                    >
                        Terminology & Rules →
                    </button>
                </div>
            </div>
        </div>
    );
}
