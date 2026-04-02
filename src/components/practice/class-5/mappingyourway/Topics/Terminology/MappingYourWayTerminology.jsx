import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../The_Fish_Tale/fishtale.css';
import MathRenderer from '../../../../../MathRenderer';

const TERMS = [
    { name: 'Map', def: 'A drawing of a place as seen from above, showing physical features, roads, and boundaries in a scaled-down form.', ex: 'A map of India shows all its states, rivers, and major cities.' },
    { name: 'Compass Rose', def: 'A symbol on a map that shows the four main directions — North, South, East, and West.', ex: 'The compass rose tells us North is at the top of the map.' },
    { name: 'Legend / Key', def: 'A table or box on a map that explains what each symbol, line, color, or icon represents.', ex: 'The legend shows that a blue line means a river and a red dot means a city.' },
    { name: 'Scale', def: 'The ratio between a distance on the map and the corresponding actual distance on the ground.', ex: 'If the scale says $1$ cm = $10$ km, then $5$ cm on the map means $50$ km in real life.' },
    { name: 'Grid', def: 'A network of horizontal and vertical lines forming squares on a map, used to locate specific places.', ex: 'Grid reference B3 means column B, row 3 on the map.' },
    { name: 'Cardinal Directions', def: 'The four main points of the compass — North (N), South (S), East (E), and West (W).', ex: 'The sun rises in the East and sets in the West.' },
    { name: 'Landmark', def: 'A recognizable natural or man-made feature used as a point of reference for navigation.', ex: 'The tall clock tower is a landmark that helps people find the main square.' },
    { name: 'Route', def: 'A way or course taken in getting from a starting point to a destination on a map.', ex: 'The shortest route from the school to the park passes by the hospital.' },
    { name: 'Symbol', def: 'A small picture or icon on a map that represents a feature like a hospital, railway station, or temple.', ex: 'A small cross symbol (✚) usually represents a hospital on the map.' },
    { name: 'Distance', def: 'The amount of space between two points, measured along the path connecting them.', ex: 'The distance between Town A and Town B is $25$ km.' }
];

export default function MappingYourWayTerminology() {
    const navigate = useNavigate();

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/middle/grade/5/mapping-your-way')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/mapping-your-way/introduction')}>🌍 Intro</span>
                    <span style={{ fontWeight: 800, color: '#0369a1' }}>📖 Terminology</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/mapping-your-way/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="ft-content" style={{ padding: '32px 24px 80px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 16 }}>
                        <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: 4, color: '#0f172a' }}>Terminology: <span style={{ color: '#0ea5e9' }}>Mapping Your Way</span></h1>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>Mastering the language of maps, scales, grids, and navigation.</p>
                    </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {TERMS.map((term, i) => (
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
                            <div style={{ fontSize: 18, fontWeight: 800, color: '#0ea5e9' }}>{term.name}</div>
                            <p style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.5, margin: 0 }}>
                                <MathRenderer text={term.def} />
                            </p>
                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: 12, border: '1px solid #f1f5f9', marginTop: 'auto' }}>
                                <div style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Example</div>
                                <div style={{ fontWeight: 700, color: '#0369a1', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
                                    <MathRenderer text={term.ex} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}
