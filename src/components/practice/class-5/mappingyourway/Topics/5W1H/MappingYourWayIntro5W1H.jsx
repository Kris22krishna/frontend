import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../The_Fish_Tale/fishtale.css';
import MathRenderer from '../../../../../MathRenderer';

const QUESTIONS = [
    { label: 'WHAT', q: 'What is a Map?', icon: '🗺️', color: '#0ea5e9', desc: 'A map is a drawing of a place as seen from above, showing features like roads, rivers, buildings, and landmarks in a scaled-down way. Maps help us understand the layout of an area without being there physically.' },
    { label: 'WHY', q: 'Why do we need maps?', icon: '🤔', color: '#0284c7', desc: 'Maps help us find directions, measure distances, plan routes, and understand where things are located relative to each other. They are essential for navigation, urban planning, and understanding our world.' },
    { label: 'WHO', q: 'Who uses maps?', icon: '🧭', color: '#0369a1', desc: 'Travelers use maps to navigate roads. Pilots use flight charts. Hikers use trail maps. Architects use blueprints. Scientists use terrain maps. Even delivery drivers use digital maps every day!' },
    { label: 'WHEN', q: 'When do we use grids and scales?', icon: '📏', color: '#075985', desc: 'Grids are used whenever we need to pinpoint a specific location on a map quickly, like finding a city on an atlas. Scales are used when we need to convert map distances to real-world distances.' },
    { label: 'WHERE', q: 'Where do we see maps in daily life?', icon: '📍', color: '#0ea5e9', desc: 'Maps are everywhere — in phone GPS apps like Google Maps, on classroom walls, in atlases, on bus route boards, in airports showing terminals, and even in shopping malls showing floor plans.' },
    { label: 'HOW', q: 'How do we read a map?', icon: '🔑', color: '#0284c7', desc: 'First, orient yourself using the compass rose (North is usually at the top). Then use the legend/key to understand symbols. Finally, use the scale to estimate actual distances between locations on the map.' }
];

export default function MappingYourWayIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/middle/grade/5/mapping-your-way')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ fontWeight: 800, color: '#0369a1' }}>🌍 Intro</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/mapping-your-way/terminology')}>📖 Terminology</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/mapping-your-way/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="ft-content" style={{ padding: '32px 24px 80px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 16 }}>
                        <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: 4, color: '#0f172a' }}>Introduction: <span style={{ color: '#0ea5e9' }}>5W1H</span></h1>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>Deep dive into maps and navigation through six foundational questions.</p>
                    </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {QUESTIONS.map((item, i) => (
                        <div key={i} style={{ 
                            background: '#fff', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '20px', 
                            padding: '24px', 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                            transition: 'all 0.3s ease', 
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)' 
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ fontSize: 24, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}15`, borderRadius: 12 }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 900, color: item.color, letterSpacing: 1, textTransform: 'uppercase' }}>{item.label}</div>
                                    <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: '#0f172a' }}>{item.q}</h3>
                                </div>
                            </div>
                            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                                <MathRenderer text={item.desc} />
                            </p>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}
