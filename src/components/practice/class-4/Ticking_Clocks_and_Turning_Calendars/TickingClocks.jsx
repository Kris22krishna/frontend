import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './ticking-clocks.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/ticking-clocks/introduction',
        label: 'Introduction',
        emoji: '🌟',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Time & Calendars — What, Why, Who, When, Where and How.',
        gradFrom: '#d97706',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.4)',
    },
    {
        id: 'terminology',
        path: '/ticking-clocks/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: '10 Key Terms · 5 Rules',
        desc: 'Master the language of Time — hour hand, minute hand, AM/PM, leap years & 5 golden rules.',
        gradFrom: '#0284c7',
        gradTo: '#38bdf8',
        shadow: 'rgba(56,189,248,0.4)',
    },
    {
        id: 'skills',
        path: '/ticking-clocks/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: '7 core skills, 10 practice questions and 10 assessment questions for each skill.',
        gradFrom: '#0d9488',
        gradTo: '#2dd4bf',
        shadow: 'rgba(45,212,191,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#d97706' },
    { val: '10', label: 'Key Terms', color: '#0284c7' },
    { val: '5', label: 'Rules', color: '#059669' },
    { val: '7', label: 'Skills', color: '#0d9488' },
];

export default function TickingClocks() {
    const navigate = useNavigate();

    return (
        <div className="tc-fullpage">

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="tc-left">
                <div className="tc-deco tc-deco-a" />
                <div className="tc-deco tc-deco-b" />
                <div className="tc-deco tc-deco-c" />

                <div className="tc-left-content">
                    <h1 className="tc-main-title">
                        Ticking Clocks &<br />
                        <span className="tc-title-accent">Turning Calendars</span>
                    </h1>

                    <p className="tc-main-sub">
                        From reading the clock to mastering calendars — learn to tell time
                        and navigate dates like a pro!
                    </p>

                    <div className="tc-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="tc-stat" key={i}>
                                <span className="tc-stat-num" style={{ color: s.color }}>{s.val}</span>
                                <span className="tc-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="tc-right">
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
                    Back Home
                </button>
                <p className="tc-right-eyebrow">Choose a topic to explore</p>
                <div className="tc-cards-col">
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            className="tc-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div
                                className="tc-card-strip"
                                style={{ background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})` }}
                            />
                            <div
                                className="tc-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>
                            <div className="tc-card-text">
                                <div className="tc-card-label" style={{ color: mod.gradFrom }}>{mod.label}</div>
                                <div className="tc-card-tagline">{mod.tagline}</div>
                                <div className="tc-card-desc">{mod.desc}</div>
                            </div>
                            <div className="tc-card-chevron" style={{ color: mod.gradFrom }}>›</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
