import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { trianglesConnectomicsData } from './TrianglesConnectomicsData';
import '../../TrianglesBranch.css';
import MathRenderer from '../../../../../MathRenderer';

export default function TrianglesConnectomics() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="rn-page">
            <nav className="rn-nav">
                <button className="rn-nav-back" onClick={() => navigate('/senior/grade/10/triangles')}>
                    ← Back to Dashboard
                </button>
                <div className="rn-nav-links">
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/introduction')}>📐 Intro</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/terminology')}>📘 Terminology</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/skills')}>🎯 Skills</button>
                    <button className="rn-nav-link active" onClick={() => navigate('/senior/grade/10/triangles/connectomics')}>🔗 Connectomics</button>
                </div>
            </nav>

            <div className="rn-hero" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1d4ed8 100%)' }}>
                <h1 className="rn-hero-title">Triangles <span style={{ color: '#f59e0b' }}>Connectomics</span></h1>
                <p className="rn-hero-sub">Discover how triangle similarity powers trigonometry, surveying, maps, shadows, and design.</p>
            </div>

            <main className="rn-topic-shell" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    The Web of Mathematics
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {trianglesConnectomicsData.connections.map((conn, idx) => (
                        <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: conn.color }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: 800, background: `${conn.color}15`, color: conn.color, padding: '4px 10px', borderRadius: '100px' }}>
                                    {conn.type}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
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

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    Real World Systems
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px' }}>
                    {trianglesConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #0f172a, #1d4ed8)', padding: '32px', borderRadius: '24px', color: '#fff' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                Impact: {app.impact}
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{app.title}</h3>
                            <p style={{ margin: 0, opacity: 0.8, fontSize: '15px', lineHeight: 1.6 }}><MathRenderer text={app.desc} /></p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#2563eb" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b' }}>One Shape, Many Uses</h3>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
                        Triangle similarity is not just a chapter topic. It is a practical way of thinking that shows up in maps, lenses, construction, and indirect measurement.
                    </p>
                </div>
            </main>
        </div>
    );
}
