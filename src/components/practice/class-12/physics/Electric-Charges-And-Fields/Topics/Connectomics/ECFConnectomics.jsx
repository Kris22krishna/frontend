import React, { useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { ECFClusters, ECFBridges } from './ECFConnectomicsData';
import styles from '../../ecf.module.css';
import MathRenderer from '../../../../../../MathRenderer';
import ECFNav from '../../ECFNav';

const coreConnections = ECFClusters.map(cluster => {
    const topNodes = cluster.nodes.slice(0, 2);
    return {
        type: cluster.title,
        from: 'Electric Charges & Fields',
        to: topNodes.map(n => n.label).join(' + '),
        note: topNodes.map(n => n.detail).join(' '),
        color: cluster.color,
        icon: cluster.icon,
    };
});

const realWorldSystems = ECFBridges.map(bridge => ({
    impact: bridge.title.includes(':') ? bridge.title.split(':')[0] : 'Bridge',
    title: bridge.title,
    desc: bridge.desc,
}));

export default function ECFConnectomics() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['ecf-page']}>
            <ECFNav activeTab="connectomics" />

            <div className={styles['ecf-hero']}>
                <h1 className={styles['ecf-hero-title']}>Electrostatics <span className={styles['ecf-hero-accent']}>Connectomics</span></h1>
                <p className={styles['ecf-hero-sub']}>Discover the hidden threads linking Electric Charges and Fields to the full physics ecosystem.</p>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px', width: '100%', boxSizing: 'border-box' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#0f172a' }}>
                    The Web of Physics
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {coreConnections.map((conn, idx) => (
                        <div key={idx} style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '24px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: conn.color }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: 800, background: `${conn.color}15`, color: conn.color, padding: '4px 10px', borderRadius: '100px' }}>
                                    {conn.type}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                <span style={{ fontWeight: 800, color: '#0f172a' }}>{conn.from}</span>
                                <span style={{ color: '#94a3b8' }}>→</span>
                                <span style={{ fontWeight: 800, color: conn.color }}>{conn.to}</span>
                            </div>

                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                                <MathRenderer text={conn.note} />
                            </p>
                        </div>
                    ))}
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#0f172a' }}>
                    Real World Systems
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px' }}>
                    {realWorldSystems.map((app, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #120a2e, #4a2c8a)', padding: '32px', borderRadius: '24px', color: '#fff' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                Impact: {app.impact}
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{app.title}</h3>
                            <p style={{ margin: 0, opacity: 0.82, fontSize: '15px', lineHeight: 1.6 }}>
                                <MathRenderer text={app.desc} />
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#4a2c8a" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Infinite Connections</h3>
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: '#64748b', lineHeight: 1.6 }}>
                        Electrostatics is the grammar of electromagnetism. Once charge, field, flux, and symmetry are clear,
                        later chapters like potential, capacitance, current electricity, and magnetism become dramatically easier.
                    </p>
                </div>
            </main>
        </div>
    );
}
