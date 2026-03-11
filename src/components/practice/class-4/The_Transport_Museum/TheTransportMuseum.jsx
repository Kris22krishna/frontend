import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './transport-museum.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/the-transport-museum/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Multiplication & Division — What, Why, Who, When, Where and How.',
        gradFrom: '#d97706',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.4)',
    },
    {
        id: 'terminology',
        path: '/the-transport-museum/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '10 Key Terms · 5 Rules',
        desc: 'Master the language of Transport Math — product, quotient, remainder, splitting & shortcuts.',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.4)',
    },
    {
        id: 'skills',
        path: '/the-transport-museum/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: '4 core skills, 10 practice questions and 10 assessment questions for each skill.',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#d97706' },
    { val: '10', label: 'Key Terms', color: '#0284c7' },
    { val: '5', label: 'Rules', color: '#059669' },
    { val: '4', label: 'Skills', color: '#0ea5e9' },
];

export default function TheTransportMuseum() {
    const navigate = useNavigate();

    return (
        <div className="tm-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="tm-left">
                <div className="tm-deco tm-deco-a" />
                <div className="tm-deco tm-deco-b" />
                <div className="tm-deco tm-deco-c" />

                <div className="tm-left-content">
                    <h1 className="tm-main-title">
                        The Transport<br />
                        <span className="tm-title-accent">Museum</span>
                    </h1>

                    <p className="tm-main-sub">
                        From navigating traffic to figuring out fare, learn multiplication and division shortcuts to travel smoothly!
                    </p>

                    <div className="tm-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="tm-stat" key={i}>
                                <span className="tm-stat-num" style={{ color: s.color }}>{s.val}</span>
                                <span className="tm-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="tm-right">
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
                <p className="tm-right-eyebrow">Choose a topic to explore</p>
                <div className="tm-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="tm-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div
                                className="tm-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />
                            <div
                                className="tm-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>
                            <div className="tm-card-text">
                                <div className="tm-card-label" style={{ color: mod.gradFrom }}>{mod.label}</div>
                                <div className="tm-card-tagline">{mod.tagline}</div>
                                <div className="tm-card-desc">{mod.desc}</div>
                            </div>
                            <div className="tm-card-chevron" style={{ color: mod.gradFrom }}>›</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
