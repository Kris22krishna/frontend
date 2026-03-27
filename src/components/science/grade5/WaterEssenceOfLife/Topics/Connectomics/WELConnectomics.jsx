import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../WaterEssenceOfLifeDashboard.module.css';

const CONNECTIONS = [
    {
        id: 'biology',
        title: 'Biology — Life Sciences',
        icon: '🧬',
        color: '#10b981',
        intro: 'Water is the foundation of all life on Earth. Understanding aquatic ecosystems connects directly to biology.',
        links: [
            { topic: 'Aquatic Ecosystems', desc: 'Ponds, rivers, and oceans are complex ecosystems with producers, consumers, and decomposers.' },
            { topic: 'Animal Adaptations', desc: 'Fish gills, duck webbed feet, and frog amphibian nature are all biological adaptations for water life.' },
            { topic: 'Plant Biology', desc: 'Water plants like lotus, hydrilla, and water lily have unique adaptations — waxy coatings, air spaces, and floating leaves.' },
            { topic: 'Food Chains & Webs', desc: 'Aquatic food chains (algae → fish → birds) show how energy flows through living systems.' },
        ]
    },
    {
        id: 'geography',
        title: 'Geography — Rivers & Landforms',
        icon: '🗺️',
        color: '#6366f1',
        intro: 'Water shapes our planet\'s geography — rivers carve valleys, rain erodes mountains, and oceans define coastlines.',
        links: [
            { topic: 'Rivers of India', desc: 'Ganga, Yamuna, Narmada — learn how rivers flow east to Bay of Bengal or west to Arabian Sea.' },
            { topic: 'Water Cycle & Climate', desc: 'The water cycle drives weather patterns — evaporation creates clouds, precipitation creates rain.' },
            { topic: 'Groundwater & Wells', desc: 'Underground aquifers supply water to millions — geography determines where they form.' },
            { topic: 'Landforms & Water Flow', desc: 'Water always flows from high to low — mountains, valleys, and plains direct river paths.' },
        ]
    },
    {
        id: 'environment',
        title: 'Environment — Conservation',
        icon: '🌍',
        color: '#f59e0b',
        intro: 'Understanding water leads to environmental awareness — conservation, pollution, and sustainability.',
        links: [
            { topic: 'Water Conservation', desc: 'Saving water through harvesting, fixing leaks, and reducing waste is crucial for our future.' },
            { topic: 'Pollution & Ecosystems', desc: 'River pollution destroys aquatic habitats — understanding this helps protect our water sources.' },
            { topic: 'Cities vs Forests', desc: 'Concrete blocks groundwater recharge while forests act like natural sponges — urban planning matters.' },
            { topic: 'Climate Change', desc: 'Rising temperatures affect glaciers, rainfall patterns, and water availability worldwide.' },
        ]
    },
];

export default function WELConnectomics() {
    const navigate = useNavigate();
    const BASE = '/middle/grade/5/science/water-essence-of-life';
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const active = CONNECTIONS[activeIdx];

    return (
        <div className={styles['wel-page']}>
            <nav className={styles['wel-nav']}>
                <button className={styles['wel-nav-back']} onClick={() => navigate(BASE)}>
                    ← Back to Dashboard
                </button>
                <div className={styles['wel-nav-links']}>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/core-concepts`)}>🎯 Core Concepts</button>
                    <button className={`${styles['wel-nav-link']} ${styles['active']}`}>🔗 Connectomics</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/virtual-lab`)}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['wel-hero']}>
                <h1 className={styles['wel-hero-title']}>
                    Connect <span style={{ color: '#fbbf24' }}>the Dots</span>
                </h1>
                <p className={styles['wel-hero-sub']}>
                    See how water science connects to biology, geography, and environmental studies.
                </p>
            </div>

            <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 24px 60px' }}>
                {/* Connection selector */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
                    {CONNECTIONS.map((c, idx) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveIdx(idx)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '12px 20px', borderRadius: 100,
                                border: activeIdx === idx ? 'none' : '2px solid #e2e8f0',
                                background: activeIdx === idx ? c.color : '#fff',
                                color: activeIdx === idx ? '#fff' : '#334155',
                                fontWeight: 800, fontSize: 14, cursor: 'pointer',
                                boxShadow: activeIdx === idx ? `0 6px 20px ${c.color}40` : '0 2px 8px rgba(0,0,0,0.04)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {c.icon} {c.title}
                        </button>
                    ))}
                </div>

                {/* Active connection detail */}
                <div style={{
                    background: '#fff', borderRadius: 24, padding: 32,
                    border: '1px solid rgba(0,0,0,0.04)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: `${active.color}15`, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: 28,
                        }}>
                            {active.icon}
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: active.color }}>
                                {active.title}
                            </h2>
                            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 15 }}>
                                {active.intro}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                        {active.links.map((link, i) => (
                            <div key={i} style={{
                                padding: 20, borderRadius: 16,
                                background: `${active.color}05`,
                                border: `1px solid ${active.color}15`,
                                transition: 'all 0.2s ease',
                            }}>
                                <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: active.color }}>
                                    {link.topic}
                                </h4>
                                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#64748b' }}>
                                    {link.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div style={{ marginTop: 48, textAlign: 'center' }}>
                    <button
                        onClick={() => navigate(`${BASE}/virtual-lab`)}
                        style={{
                            padding: '14px 36px', borderRadius: 100,
                            background: 'linear-gradient(135deg, #0ea5e9, #0891b2)',
                            color: '#fff', fontWeight: 800, fontSize: 16,
                            border: 'none', cursor: 'pointer',
                            boxShadow: '0 8px 24px rgba(14,165,233,0.3)',
                        }}
                    >
                        🧪 Explore the Virtual Lab →
                    </button>
                </div>
            </div>
        </div>
    );
}
