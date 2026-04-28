import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sexualReproductionConnectomicsData } from './SexualReproductionConnectomicsData';
import '../../SexualReproductionBranch.css';
import { Share2 } from 'lucide-react';

export default function SexualReproductionConnectomics() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sr-page">
            <nav className="sr-nav">
                <button className="sr-nav-back" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction')}>
                    ← Back to Dashboard
                </button>
                <div className="sr-nav-links">
                    <div className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/introduction')}>Introduction</div>
                    <div className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/terminology')}>Terminology</div>
                    <div className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/skills')}>Skills</div>
                    <div className="sr-nav-link active">Connectomics</div>
                    <div className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/exam-edge')}>Exam Edge</div>
                </div>
            </nav>

            <header className="sr-hero" style={{ background: 'linear-gradient(145deg, #f59e0b 0%, #d97706 100%)' }}>
                <h1 className="sr-hero-title">Connectomics</h1>
                <p className="sr-hero-sub">Discover the hidden threads linking Sexual Reproduction in Plants to the entire world of science.</p>
            </header>

            <main className="sr-topic-shell" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                
                {/* Connections Map */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    The Web of Biology
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {sexualReproductionConnectomicsData.connections.map((conn, idx) => (
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px' }}>
                    {sexualReproductionConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', borderRadius: '24px', color: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}>
                            <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                                {app.image && (
                                    <img src={app.image} alt={app.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                                )}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, #1e1b4b, transparent)' }} />
                            </div>
                            <div style={{ padding: '0 24px 32px 24px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                    Impact: {app.impact}
                                </div>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{app.title}</h3>
                                <p style={{ margin: 0, opacity: 0.85, fontSize: '15px', lineHeight: 1.6 }}>{app.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#f59e0b" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b' }}>The Cycle of Life</h3>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
                        Plant reproduction isn't just an isolated botanical process; it's the biological foundation for entire ecosystems and agricultural economies that sustain humanity.
                    </p>
                </div>
            </main>
        </div>
    );
}
