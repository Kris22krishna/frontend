import React from 'react';
import { useNavigate } from 'react-router-dom';
import './doesitlooksame.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/middle/grade/5/does-it-look-same/introduction',
        label: 'Introduction',
        emoji: '🦋',
        tagline: '5W1H Exploration',
        desc: '6 Big Questions about Symmetry — What, Why, Who, When, Where and How.',
        color: '#4f46e5'
    },
    {
        id: 'terminology',
        path: '/middle/grade/5/does-it-look-same/terminology',
        label: 'Terminology',
        emoji: '📖',
        tagline: 'Balance Basics',
        desc: 'Master the language of symmetry, reflections, and rotational patterns.',
        color: '#6366f1'
    },
    {
        id: 'skills',
        path: '/middle/grade/5/does-it-look-same/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice & Assess',
        desc: 'Targeted practice for mastering visual symmetry and geometric reasoning.',
        color: '#8b5cf6'
    }
];

export default function DoesItLookSameLandingPage() {
    const navigate = useNavigate();

    return (
        <div className="dils-fullpage">
            <div className="dils-left">
                <button
                    className="ft-back-btn-top" /* Reusing the generic class if present or dils- equivalent */
                    style={{ position: 'absolute', top: 32, left: 32, zIndex: 10, background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(10px)' }}
                    onClick={() => navigate('/middle/grade/5')}
                >
                    ← Back to Syllabus
                </button>
                <div className="ft-deco ft-deco-a" style={{ position: 'absolute', borderRadius: '50%', pointerEvents: 'none', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)', top: -100, left: -100 }} />
                <div className="ft-left-content">
                    <h1 className="ft-main-title" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '4.2rem', fontWeight: 900, color: '#fff', marginBottom: 20, lineHeight: 1.1 }}>
                        Does it Look<br />
                        <span className="ft-title-accent" style={{ background: 'linear-gradient(90deg, #ffd60a 0%, #ffc300 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>the Same?</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400, fontSize: 16, fontWeight: 500 }}>
                        Dive into the world of balance! Discover how shapes reflect, rotate, and reveal hidden patterns of symmetry in nature and art.
                    </p>
                    <div className="ft-stats-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
                        <div className="ft-stat" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '12px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center' }}>
                            <span className="ft-stat-num" style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>3</span>
                            <span className="ft-stat-lbl" style={{ fontSize: 10, textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 700 }}>Detailed Skills</span>
                        </div>
                        <div className="ft-stat" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '12px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center' }}>
                            <span className="ft-stat-num" style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>60+</span>
                            <span className="ft-stat-lbl" style={{ fontSize: 10, textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 700 }}>Practice Qs</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ft-right" style={{ flex: 1, background: '#f8fafc', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="ft-cards-col" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#4f46e5', marginBottom: 8 }}>Choose a topic</p>
                    {MODULES.map(mod => (
                        <button key={mod.id} className="ft-card-btn" style={{ display: 'flex', alignItems: 'center', padding: 24, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, cursor: 'pointer', textAlign: 'left', gap: 20 }} onClick={() => navigate(mod.path)}>
                            <div className="ft-card-icon" style={{ fontSize: 32, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ff', borderRadius: 16 }}>{mod.emoji}</div>
                            <div>
                                <div className="ft-card-label" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{mod.label}</div>
                                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginTop: 2 }}>{mod.tagline}</div>
                                <div className="ft-card-desc" style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{mod.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
