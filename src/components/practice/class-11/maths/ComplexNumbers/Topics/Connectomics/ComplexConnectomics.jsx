import React from 'react';
import { useNavigate } from 'react-router-dom';
import { complexConnectomicsData } from './ComplexConnectomicsData';
import '../../../Sets/SetsBranch.css';
import { LatexText } from '../../../../../../LatexText';
import MathRenderer from '../../../../../../MathRenderer';

const BASE = '/senior/grade/11/maths/complex-numbers';

export default function ComplexConnectomics() {
    const navigate = useNavigate();

    return (
        <div className="sets-page">
            <nav className="sets-nav">
                <button className="sets-nav-back" onClick={() => navigate(BASE)}>← Back to Dashboard</button>
                <div className="sets-nav-links">
                    <button className="sets-nav-link" onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button className="sets-nav-link" onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button className="sets-nav-link" onClick={() => navigate(`${BASE}/skills`)}>🎯 Skills</button>
                    <button className="sets-nav-link active" onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
                    <button className="sets-nav-link" onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
                </div>
            </nav>

            <div className="sets-hero">
                <h1 className="sets-hero-title">
                    Complex Numbers <span style={{ color: '#f59e0b' }}>Connectomics</span>
                </h1>
                <p className="sets-hero-sub">Discover how i permeates physics, engineering, and the deepest corners of mathematics.</p>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    The Web of Applications
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {complexConnectomicsData.connections.map((conn, idx) => (
                        <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: conn.color }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: 800, background: `${conn.color}15`, color: conn.color, padding: '4px 10px', borderRadius: '100px' }}>
                                    {conn.type}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 800, color: '#1e1b4b', fontSize: 14 }}>{conn.from}</span>
                                <span style={{ color: '#94a3b8' }}>→</span>
                                <span style={{ fontWeight: 700, color: conn.color, fontSize: 14 }}>{conn.to}</span>
                            </div>

                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, margin: '0 0 16px' }}>{conn.how}</p>

                            <div style={{ background: `${conn.color}08`, padding: '12px 16px', borderRadius: '12px', border: `1px solid ${conn.color}20`, fontSize: '14px', color: conn.color, fontWeight: 700 }}>
                                <MathRenderer text={`$${conn.formula}$`} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Euler's Identity Spotlight */}
                <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95)', borderRadius: '24px', padding: '40px', color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
                    <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Euler's Identity</h3>
                    <div style={{ fontSize: 36, fontWeight: 900, color: '#a78bfa', marginBottom: 16 }}>
                        <MathRenderer text={'$$e^{i\\pi} + 1 = 0$$'} />
                    </div>
                    <p style={{ opacity: 0.85, fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                        Called the most beautiful equation in mathematics — it connects five fundamental constants: e, i, π, 1, and 0 — all in one identity. This is the power of complex numbers.
                    </p>
                </div>

                {/* CTA */}
                <div style={{ padding: '32px', background: 'linear-gradient(135deg, #1e1b4b, #4c1d95)', borderRadius: '24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px' }}>Exam ready?</h3>
                        <p style={{ margin: 0, opacity: 0.8 }}>Test yourself with NCERT-style exam edge questions.</p>
                    </div>
                    <button
                        onClick={() => navigate(`${BASE}/exam-edge`)}
                        style={{ padding: '12px 28px', background: '#fff', color: '#1e1b4b', border: 'none', borderRadius: '100px', fontWeight: 800, cursor: 'pointer' }}
                    >
                        Exam Edge →
                    </button>
                </div>
            </main>
        </div>
    );
}
