import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../AreasRelatedToCirclesBranch.css';
import MathRenderer from '../../../../../MathRenderer';
import { CONNECTOMICS_DATA } from './AreasRelatedToCirclesConnectomicsData';

export default function AreasRelatedToCirclesConnectomics() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="rn-page">
            <nav className="rn-nav">
                <button className="rn-nav-back" onClick={() => navigate('/senior/grade/10/areas-related-to-circles')}>
                    ← Back to Dashboard
                </button>
                <div className="rn-nav-links">
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/areas-related-to-circles/introduction')}>📐 Intro</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/areas-related-to-circles/terminology')}>📘 Terminology</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/areas-related-to-circles/skills')}>🎯 Skills</button>
                    <button className="rn-nav-link active" onClick={() => navigate('/senior/grade/10/areas-related-to-circles/connectomics')}>🔗 Connectomics</button>
                </div>
            </nav>

            <div className="rn-hero" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #7c3aed 100%)' }}>
                <h1 className="rn-hero-title">The <span style={{ color: '#c4b5fd' }}>Connectomics</span></h1>
                <p className="rn-hero-sub">How Areas Related To Circles link to other fields of math and the real world.</p>
            </div>

            <main className="rn-topic-shell" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '8px', color: 'var(--rn-text)' }}>
                        Mathematical Connections
                    </h2>
                    <p style={{ fontSize: '16px', color: 'var(--rn-muted)', marginBottom: '32px' }}>
                        The geometry of circles doesn't exist in isolation.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                        {CONNECTOMICS_DATA.connections.map((conn, idx) => (
                            <div key={idx} style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${conn.color}15`, color: conn.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>
                                    {conn.icon}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 12px', color: 'var(--rn-text)' }}>
                                    <MathRenderer text={conn.title} />
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--rn-muted)', margin: 0, lineHeight: 1.6 }}>
                                    <MathRenderer text={conn.desc} />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '8px', color: 'var(--rn-text)' }}>
                        Real World Impact
                    </h2>
                    <p style={{ fontSize: '16px', color: 'var(--rn-muted)', marginBottom: '32px' }}>
                        Where calculating areas and arcs shapes our reality.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {CONNECTOMICS_DATA.impacts.map((impact, idx) => (
                            <div key={idx} style={{ background: '#fff', display: 'flex', gap: '20px', padding: '24px', borderRadius: '20px', border: `1px solid ${impact.color}20` }}>
                                <div style={{ fontSize: '40px', lineHeight: 1 }}>{impact.icon}</div>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px', color: impact.color }}><MathRenderer text={impact.title} /></h3>
                                    <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                                        <MathRenderer text={impact.desc} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                <div style={{ marginTop: '60px', padding: '32px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '24px', textAlign: 'center', color: '#fff' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 16px' }}>You've Mastered the Chapter!</h3>
                    <p style={{ fontSize: '16px', opacity: 0.8, maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                        From understanding basic terminology to slicing up sectors, calculating complex segment areas, and answering real-world problems. You are ready to tackle anything on Areas Related to Circles.
                    </p>
                    <button 
                        onClick={() => navigate('/senior/grade/10')}
                        style={{ padding: '14px 32px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '100px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)' }}
                    >
                        Back to Syllabus
                    </button>
                </div>
            </main>
        </div>
    );
}
