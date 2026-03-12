import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { structureOfAtomConnectomicsData } from './StructureOfAtomConnectomicsData';
import '../../StructureOfAtomBranch.css';
import MathRenderer from '../../../../MathRenderer';
import { Share2, Globe, Box, Link2 } from 'lucide-react';

export default function StructureOfAtomConnectomics() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="atom-page">
            <nav className="atom-nav">
                <button className="atom-nav-back" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom')}>
                    ← Back to Dashboard
                </button>
            </nav>

            <div className="atom-hero">
                <h1 className="atom-hero-title">Structure of Atom <span style={{ color: '#f59e0b' }}>Connectomics</span></h1>
                <p className="atom-hero-sub">Discover the hidden threads linking Structure of Atom to the entire world of science.</p>
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
                        {structureOfAtomConnectomicsData.checkpoints && structureOfAtomConnectomicsData.checkpoints.map((item, idx) => (
                            <div key={idx} style={{
                                padding: '10px 14px', background: '#f8fafc', borderRadius: '10px',
                                border: '1px solid #e2e8f0', fontSize: '14px', color: '#334155',
                                display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600
                            }}>
                                <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 800 }}>✓</span>
                                {item.title}
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
                    {structureOfAtomConnectomicsData.chapterLink}
                </div>

                {/* Connections Map */}

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    The Web of Science
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {structureOfAtomConnectomicsData.connections.map((conn, idx) => (
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
                                <MathRenderer text={conn.note} />
                            </p>
                        </div>
                    ))}
                </div>

                {/* Real World Applications */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    Real World Systems
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {structureOfAtomConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '32px', borderRadius: '24px', color: '#fff' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                Impact: {app.impact}
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{app.title}</h3>
                            <p style={{ margin: 0, opacity: 0.8, fontSize: '15px', lineHeight: 1.6 }}><MathRenderer text={app.desc} /></p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#6366f1" style={{ marginBottom: '16px', display: 'inline-block' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b' }}>Infinite Connections</h3>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', lineHeight: 1.6 }}>
                        Structure of Atom isn't just a chapter; its principles ripple outward, forming the foundation of modern technology, medicine, and the universe itself. Every time you turn on a computer, you're looking at atomic properties applied!
                    </p>
                </div>
            </main>
        </div>
    );
}
