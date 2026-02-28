import React, { useState } from 'react';
import './algebra.css';
import AlgebraIntro5W1H from './Topics/5W1H/AlgebraIntro5W1H';
import AlgebraTerminology from './Topics/Terminology/AlgebraTerminology';
import AlgebraSkills from './Topics/Skills/AlgebraSkills';

const MODULES = [
    {
        id: '5w1h',
        label: 'Introduction',
        icon: '🌟',
        tagline: '5W1H Exploration',
        desc: 'Discover what Algebra is, where it came from, and why it matters — through 6 big questions.',
        color: '#6c63ff',
    },
    {
        id: 'terminology',
        label: 'Terminology',
        icon: '📚',
        tagline: '7 Words · 5 Rules',
        desc: 'Learn the 9 key terms (constants, variables, terms, coefficients…) and the 5 golden rules.',
        color: '#00d4aa',
    },
    {
        id: 'skills',
        label: 'Skills',
        icon: '🎯',
        tagline: 'Practice & Assessment',
        desc: '5 core skills with 10 practice questions and 10 assessment questions each.',
        color: '#ff6b9d',
    },
];

export default function Algebra() {
    const [activeModule, setActiveModule] = useState('5w1h');

    return (
        <div className="alg-page">
            {/* ── HERO ─────────────────────────────────────────── */}
            <div className="alg-hero">
                <div className="alg-hero-tag">📐 Math Branches · Algebra</div>
                <h1>Master Algebra</h1>
                <p className="alg-hero-sub">
                    From mystery unknowns to powerful equations — learn Algebra the way it was meant to be taught:
                    with curiosity, clarity, and confidence.
                </p>

                {/* Stats chips */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                    {[
                        { val: '6', label: 'Big Questions' },
                        { val: '9', label: 'Key Terms' },
                        { val: '5', label: 'Rules' },
                        { val: '5', label: 'Skills' },
                        { val: '100', label: 'Practice Questions' },
                    ].map((s, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 12,
                            padding: '10px 20px',
                            textAlign: 'center',
                            backdropFilter: 'blur(10px)',
                        }}>
                            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#6c63ff' }}>{s.val}</div>
                            <div style={{ fontSize: 11, color: '#9090bb', fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── MODULE TABS ───────────────────────────────────── */}
            <div style={{
                background: '#1a1a2e',
                borderBottom: '1px solid rgba(108,99,255,0.2)',
                padding: '20px 24px',
            }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            onClick={() => setActiveModule(mod.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '12px 26px', borderRadius: 50,
                                border: activeModule === mod.id ? 'none' : '2px solid rgba(108,99,255,0.3)',
                                background: activeModule === mod.id
                                    ? `linear-gradient(135deg, ${mod.color}, ${mod.color}aa)`
                                    : 'transparent',
                                color: activeModule === mod.id ? '#fff' : '#9090bb',
                                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: activeModule === mod.id ? `0 4px 20px ${mod.color}45` : 'none',
                            }}
                        >
                            <span style={{ fontSize: 18 }}>{mod.icon}</span>
                            <span>{mod.label}</span>
                            {activeModule === mod.id && (
                                <span style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: 50, padding: '2px 8px', fontSize: 11, fontWeight: 700
                                }}>
                                    {mod.tagline}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── MODULE CONTENT ────────────────────────────────── */}
            <div style={{ background: '#0f0f1a', minHeight: '60vh', paddingTop: 48 }}>
                {activeModule === '5w1h' && <AlgebraIntro5W1H onBack={() => setActiveModule('5w1h')} />}
                {activeModule === 'terminology' && <AlgebraTerminology onBack={() => setActiveModule('5w1h')} />}
                {activeModule === 'skills' && <AlgebraSkills onBack={() => setActiveModule('5w1h')} />}
            </div>

            {/* ── BOTTOM NAV ─────────────────────────────────────── */}
            <div style={{
                background: '#1a1a2e',
                borderTop: '1px solid rgba(108,99,255,0.2)',
                padding: '32px 24px',
            }}>
                <div style={{
                    maxWidth: 1100, margin: '0 auto',
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16
                }}>
                    {MODULES.map(mod => (
                        <button
                            key={mod.id}
                            onClick={() => setActiveModule(mod.id)}
                            style={{
                                background: activeModule === mod.id ? `${mod.color}15` : '#1e1e3a',
                                border: `1px solid ${activeModule === mod.id ? mod.color + '50' : 'rgba(108,99,255,0.2)'}`,
                                borderRadius: 14, padding: '20px', cursor: 'pointer',
                                transition: 'all 0.3s ease', textAlign: 'left',
                            }}
                        >
                            <div style={{ fontSize: 28, marginBottom: 8 }}>{mod.icon}</div>
                            <div style={{
                                fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 800,
                                color: activeModule === mod.id ? mod.color : '#fff', marginBottom: 4
                            }}>{mod.label}</div>
                            <div style={{ fontSize: 13, color: '#9090bb', lineHeight: 1.5 }}>{mod.desc}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
