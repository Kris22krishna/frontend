import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lawsOfMotionConnectomicsData } from './LawsOfMotionConnectomicsData';
import '../../LawsOfMotionBranch.css';
import { Share2 } from 'lucide-react';

export default function LawsOfMotionConnectomics() {
    const navigate = useNavigate();

    return (
        <div className="lom-page">
            <nav className="lom-nav">
                <button className="lom-nav-back" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion')}>
                    ← Back to Dashboard
                </button>
                <div className="lom-nav-links">
                    <button className="lom-nav-link active">🧠 Connectomics</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/introduction')}>🌟 Intro</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/terminology')}>📖 Terminology</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/skills')}>🎯 Skills</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/exam-edge')}>⚡ Exam Edge</button>
                </div>
            </nav>

            <div className="lom-hero" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)', color: '#fff' }}>
                <h1 className="lom-hero-title" style={{ color: '#fff' }}>Laws of Motion <span style={{ color: '#f59e0b' }}>Connectomics</span></h1>
                <p className="lom-hero-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>Discover the hidden threads linking Newton's Laws to the entire world of science.</p>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

                {/* Connectomic Checkpoint */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '12px', textAlign: 'center', color: '#1e1b4b' }}>
                    📋 Connectomic Checkpoint
                </h2>
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '15px', marginBottom: '24px', maxWidth: '600px', marginInline: 'auto' }}>
                    Every concept in this chapter rests on what you already know. Verify these before proceeding.
                </p>

                <div style={{
                    background: '#fff', borderRadius: '20px', padding: '28px',
                    border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    marginBottom: '24px'
                }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#f59e0b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ✅ You must be comfortable with:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
                        {lawsOfMotionConnectomicsData.checkpoints.map((item, idx) => (
                            <div key={idx} style={{
                                padding: '10px 14px', background: '#f8fafc', borderRadius: '10px',
                                border: '1px solid #e2e8f0', fontSize: '14px', color: '#334155',
                                display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600
                            }}>
                                <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 800 }}>✓</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chapter Link Note */}
                <div style={{
                    background: '#fff', borderRadius: '16px', padding: '18px 22px',
                    border: '1px solid #e2e8f0', borderLeft: '4px solid #3b82f6',
                    marginBottom: '60px', fontSize: '14px', color: '#334155', lineHeight: 1.6
                }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>🔗 Chapter Link</div>
                    {lawsOfMotionConnectomicsData.chapterLink}
                </div>

                {/* Connections Map */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    The Web of Physics
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {lawsOfMotionConnectomicsData.connections.map((conn, idx) => (
                        <div key={idx} style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '24px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: conn.color }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: 800, background: `${conn.color}15`, color: conn.color, padding: '4px 10px', borderRadius: '100px' }}>
                                    {conn.type}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 800, color: '#1e1b4b' }}>{conn.from}</span>
                                <span style={{ color: '#94a3b8' }}>→</span>
                                <span style={{ fontWeight: 800, color: conn.color }}>{conn.to}</span>
                            </div>

                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                                {conn.note}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Real World Applications */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    Real World Systems
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {lawsOfMotionConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '32px', borderRadius: '24px', color: '#fff' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                Impact: {app.impact}
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{app.title}</h3>
                            <p style={{ margin: 0, opacity: 0.8, fontSize: '15px', lineHeight: 1.6 }}>{app.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Infinite Connections Footer */}
                <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#3b82f6" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b' }}>Infinite Connections</h3>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', marginBottom: '32px' }}>
                        Newton's Laws aren't just a chapter — they're the backbone of engineering, sports science, and space exploration. Every time a car brakes or a rocket launches, these laws are at work.
                    </p>
                    <div style={{ marginTop: 40, textAlign: 'center' }}>
                        <button onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/introduction')} style={{ padding: '12px 32px', fontSize: 16, background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 100, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            Next Topic: Intro <span style={{ color: '#0f172a' }}>→</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
