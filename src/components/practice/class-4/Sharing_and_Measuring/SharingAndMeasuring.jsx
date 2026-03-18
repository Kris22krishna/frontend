import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../Shapes_Around_Us/shapes-around-us.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/junior/grade/4/sharing-and-measuring/introduction',
        label: 'Introduction',
        emoji: '🍰',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about fractions, sharing equally, and measuring parts of a whole.',
        gradFrom: '#e11d48', // rose-600
        gradTo: '#fb7185', // rose-400
        shadow: 'rgba(225,29,72,0.4)',
    },
    {
        id: 'terminology',
        path: '/junior/grade/4/sharing-and-measuring/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '10 Key Terms',
        desc: 'Master the language of halves, quarters, numerators, denominators, and equal parts.',
        gradFrom: '#ea580c', // orange-600
        gradTo: '#fb923c', // orange-400
        shadow: 'rgba(234,88,12,0.4)',
    },
    {
        id: 'skills',
        path: '/junior/grade/4/sharing-and-measuring/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: '3 core skills, 20 practice questions and 20 assessment questions for each skill.',
        gradFrom: '#9333ea', // purple-600
        gradTo: '#c084fc', // purple-400
        shadow: 'rgba(147,51,234,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#e11d48' },
    { val: '10', label: 'Key Terms', color: '#ea580c' },
    { val: '5', label: 'Core Rules', color: '#c026d3' },
    { val: '3', label: 'Skills', color: '#9333ea' },
];

export default function SharingAndMeasuring() {
    const navigate = useNavigate();

    return (
        <div className="sau-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="sau-left" style={{
                background: 'linear-gradient(145deg, #4c1d95 0%, #7c3aed 25%, #db2777 50%, #e11d48 75%, #9f1239 100%)'
            }}>
                <div className="sau-deco sau-deco-a" style={{
                    background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)'
                }} />
                <div className="sau-deco sau-deco-b" style={{
                    background: 'radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)'
                }} />
                <div className="sau-deco sau-deco-c" style={{
                    background: 'radial-gradient(circle, rgba(244,63,94,0.25) 0%, transparent 70%)'
                }} />

                <div className="sau-left-content">
                    <h1 className="sau-main-title">
                        Sharing &<br />
                        <span className="sau-title-accent" style={{
                            background: 'linear-gradient(90deg, #fbcfe8 0%, #f9a8d4 40%, #fca5a5 80%, #fef08a 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>Measuring</span>
                    </h1>

                    <p className="sau-main-sub">
                        Discover how to split things equally! From sharing a pizza to dividing a rectangular paper into halves and quarters, learning about parts and wholes is your mathematical superpower!
                    </p>

                    <div className="sau-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="sau-stat" key={i}>
                                <span className="sau-stat-num" style={{ color: s.color }}>{s.val}</span>
                                <span className="sau-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="sau-right" style={{ background: '#fdf2f8' }}>
                <button
                    onClick={() => navigate('/junior/grade/4')}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: 50,
                        padding: '10px 22px', cursor: 'pointer', fontSize: 14, fontWeight: 700,
                        color: '#334155', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        transition: 'all 0.2s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}
                >
                    <Home size={16} />
                    Back
                </button>
                <p className="sau-right-eyebrow" style={{ color: '#db2777' }}>Choose a topic to explore</p>
                <div className="sau-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="sau-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div
                                className="sau-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />
                            <div
                                className="sau-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>
                            <div className="sau-card-text">
                                <div className="sau-card-label" style={{ color: mod.gradFrom }}>{mod.label}</div>
                                <div className="sau-card-tagline">{mod.tagline}</div>
                                <div className="sau-card-desc">{mod.desc}</div>
                            </div>
                            <div className="sau-card-chevron" style={{ color: mod.gradFrom }}>›</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
