import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './data-handling.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/junior/grade/4/data-handling/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Data Handling — What, Why, Who, When, Where and How.',
        gradFrom: '#059669',
        gradTo: '#34d399',
        shadow: 'rgba(52,211,153,0.4)',
    },
    {
        id: 'terminology',
        path: '/junior/grade/4/data-handling/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '10 Key Terms · 5 Rules',
        desc: 'Master the language of Data — tally marks, frequency, pictograph, scale & more.',
        gradFrom: '#7c3aed',
        gradTo: '#a78bfa',
        shadow: 'rgba(167,139,250,0.4)',
    },
    {
        id: 'skills',
        path: '/junior/grade/4/data-handling/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: '4 core skills, 20 practice questions and 20 assessment questions for each skill.',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#059669' },
    { val: '10', label: 'Key Terms', color: '#7c3aed' },
    { val: '5', label: 'Rules', color: '#0d9488' },
    { val: '4', label: 'Skills', color: '#0284c7' },
];

export default function DataHandlingClass4() {
    const navigate = useNavigate();

    return (
        <div className="dh-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="dh-left">
                <div className="dh-deco dh-deco-a" />
                <div className="dh-deco dh-deco-b" />
                <div className="dh-deco dh-deco-c" />

                <div className="dh-left-content">
                    <h1 className="dh-main-title">
                        Data<br />
                        <span className="dh-title-accent">Handling</span>
                    </h1>

                    <p className="dh-main-sub">
                        From surveys to pictographs, learn to collect, organize & read data like a pro!
                    </p>

                    <div className="dh-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="dh-stat" key={i}>
                                <span className="dh-stat-num" style={{ color: s.color }}>{s.val}</span>
                                <span className="dh-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="dh-right">
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
                <p className="dh-right-eyebrow">Choose a topic to explore</p>
                <div className="dh-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="dh-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div
                                className="dh-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />
                            <div
                                className="dh-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>
                            <div className="dh-card-text">
                                <div className="dh-card-label" style={{ color: mod.gradFrom }}>{mod.label}</div>
                                <div className="dh-card-tagline">{mod.tagline}</div>
                                <div className="dh-card-desc">{mod.desc}</div>
                            </div>
                            <div className="dh-card-chevron" style={{ color: mod.gradFrom }}>›</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
