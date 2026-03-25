import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chemReactionsConnectomicsData } from './ChemReactionsConnectomicsData';
import styles from '../../ChemicalReactionsDashboard.module.css';
import MathRenderer from '../../../../MathRenderer';
import { Share2 } from 'lucide-react';

export default function ChemReactionsConnectomics() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['chem-page']}>
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['chem-hero']}>
                <h1 className={styles['chem-hero-title']}>Chemical Reactions <span style={{ color: '#f59e0b' }}>Connectomics</span></h1>
                <p className={styles['chem-hero-sub']}>Discover the hidden threads linking chemical equations to the entire world of science.</p>
            </div>

            <main className={styles['chem-topic-shell']} style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                
                {/* Connections Map */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    The Web of Chemistry
                </h2>
                
                <div className={styles['chem-responsive-grid']} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {chemReactionsConnectomicsData.connections.map((conn, idx) => (
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

                            <div className={styles['chem-connection-path']} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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

                <div className={styles['chem-responsive-grid']} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px' }}>
                    {chemReactionsConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '32px', borderRadius: '24px', color: '#fff' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                Impact: {app.impact}
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{app.title}</h3>
                            <p style={{ margin: 0, opacity: 0.8, fontSize: '15px', lineHeight: 1.6 }}><MathRenderer text={app.desc} /></p>
                        </div>
                    ))}
                </div>

                <div className={styles['chem-topic-banner']} style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#6366f1" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b' }}>Infinite Connections</h3>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
                        Chemical reactions aren't just a chapter; they're the underlying code for biology, engineering, and the universe. Every breath you take and every machine you use relies on the principles of molecular exchange.
                    </p>
                </div>
            </main>
        </div>
    );
}
