import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../Shapes_Around_Us/shapes-around-us.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/junior/grade/4/hide-and-seek/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Spatial Reasoning — What, Why, Who, When, Where and How.',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.4)',
    },
    {
        id: 'terminology',
        path: '/junior/grade/4/hide-and-seek/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '10 Key Terms',
        desc: 'Master the language of maps, views, grids, directions, and landmarks.',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.4)',
    },
    {
        id: 'skills',
        path: '/junior/grade/4/hide-and-seek/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: '4 core skills, 20 practice questions and 20 assessment questions for each skill.',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#059669' },
    { val: '10', label: 'Key Terms', color: '#0284c7' },
    { val: '5', label: 'Core Rules', color: '#d97706' },
    { val: '4', label: 'Skills', color: '#0ea5e9' },
];

export default function HideAndSeek() {
    const navigate = useNavigate();

    return (
        <div className="sau-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="sau-left" style={{
                background: 'linear-gradient(145deg, #064e3b 0%, #065f46 25%, #059669 50%, #0284c7 75%, #0c4a6e 100%)'
            }}>
                <div className="sau-deco sau-deco-a" style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)'
                }} />
                <div className="sau-deco sau-deco-b" style={{
                    background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)'
                }} />
                <div className="sau-deco sau-deco-c" style={{
                    background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)'
                }} />

                <div className="sau-left-content">
                    <h1 className="sau-main-title">
                        Hide &<br />
                        <span className="sau-title-accent" style={{
                            background: 'linear-gradient(90deg, #34d399 0%, #a7f3d0 40%, #fde68a 80%, #fbbf24 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>Seek</span>
                    </h1>

                    <p className="sau-main-sub">
                        Discover how objects look from different sides, navigate grids like treasure maps, and learn to read real maps — spatial reasoning is your superpower!
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
            <div className="sau-right" style={{ background: '#ecfdf5' }}>
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
                <p className="sau-right-eyebrow" style={{ color: '#059669' }}>Choose a topic to explore</p>
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
