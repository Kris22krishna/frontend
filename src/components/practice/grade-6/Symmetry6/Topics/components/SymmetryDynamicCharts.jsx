import React, { useState, useEffect, useRef } from 'react';

// 1. Regular Polygon Lines of Symmetry Interactive
export function PolySymmetryLines({ sides = 4, color = '#0ea5e9' }) {
    const [activeLine, setActiveLine] = useState(-1);
    const cx = 150, cy = 150, r = 100;
    
    // Generate polygon points
    const pts = Array.from({ length: sides }, (_, i) => {
        const a = (i * 360 / sides - 90) * Math.PI / 180;
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');

    // Generate symmetry lines
    const lines = Array.from({ length: sides }, (_, i) => {
        const a = (i * 180 / sides - 90) * Math.PI / 180;
        const R = 130;
        return { 
            x1: cx + R * Math.cos(a), y1: cy + R * Math.sin(a),
            x2: cx - R * Math.cos(a), y2: cy - R * Math.sin(a)
        };
    });

    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 300 300" width="100%" style={{ maxWidth: 260, background: '#f8fafc', borderRadius: 20 }}>
                <polygon points={pts} fill={`${color}20`} stroke={color} strokeWidth="3" />
                {lines.map((l, i) => (
                    <line 
                        key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} 
                        stroke={activeLine === -1 || activeLine === i ? '#ef4444' : '#cbd5e1'} 
                        strokeWidth="3" strokeDasharray="6,4" 
                        opacity={activeLine === -1 || activeLine === i ? 1 : 0.3}
                        style={{ transition: 'all 0.3s' }}
                    />
                ))}
            </svg>
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                <button onClick={() => setActiveLine(-1)} style={{ padding: '6px 12px', background: activeLine === -1 ? color : '#f1f5f9', color: activeLine === -1 ? '#fff' : '#475569', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Show All</button>
                {lines.map((_, i) => (
                    <button key={i} onMouseEnter={() => setActiveLine(i)} onMouseLeave={() => setActiveLine(-1)} style={{ padding: '6px 12px', background: activeLine === i ? color : '#e2e8f0', color: activeLine === i ? '#fff' : '#0f172a', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Line {i+1}</button>
                ))}
            </div>
        </div>
    );
}

// 2. Circle Symmetry Interactive
export function CircleSymmetry() {
    const [rotation, setRotation] = useState(0);
    const reqRef = useRef();

    useEffect(() => {
        const animate = () => {
            setRotation(r => (r + 0.5) % 360);
            reqRef.current = requestAnimationFrame(animate);
        };
        reqRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(reqRef.current);
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 300 300" width="100%" style={{ maxWidth: 260, background: '#f8fafc', borderRadius: 20 }}>
                <circle cx="150" cy="150" r="100" fill="#e0e7ff" stroke="#6366f1" strokeWidth="3" />
                <g transform={`rotate(${rotation}, 150, 150)`}>
                    <line x1="150" y1="20" x2="150" y2="280" stroke="#f43f5e" strokeWidth="3" strokeDasharray="6,6" />
                </g>
                <circle cx="150" cy="150" r="5" fill="#4f46e5" />
            </svg>
            <p style={{ marginTop: 12, fontWeight: 700, color: '#f43f5e' }}>Every rotating diameter is a line of symmetry!</p>
        </div>
    );
}

// 3. Rotational Polygon Animated
export function RotationalPolygon({ sides = 4, color = '#8b5cf6' }) {
    const [angle, setAngle] = useState(0);
    const smallestAngle = 360 / sides;

    const cx = 150, cy = 150, r = 100;
    const pts = Array.from({ length: sides }, (_, i) => {
        const a = (i * 360 / sides - 90) * Math.PI / 180;
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');

    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 300 300" width="100%" style={{ maxWidth: 260, background: '#f8fafc', borderRadius: 20 }}>
                {/* Ghost Outline */}
                <polygon points={pts} fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4,4" />
                {/* Rotating Shape */}
                <polygon points={pts} fill={`${color}30`} stroke={color} strokeWidth="3" transform={`rotate(${angle}, 150, 150)`} style={{ transition: 'transform 0.5s ease-in-out' }} />
                
                {/* Centre dot */}
                <circle cx="150" cy="150" r="5" fill={color} />
                <text x="150" y="150" fill={color} fontWeight="900" transform={`rotate(${angle}, 150, 150)`} textAnchor="middle" dy="-20">↑</text>
            </svg>
            <div style={{ marginTop: 16, display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
                <button onClick={() => setAngle(a => a - smallestAngle)} style={{ padding: '8px 16px', borderRadius: 100, border: 'none', background: '#e2e8f0', color: '#0f172a', fontWeight: 800, cursor: 'pointer' }}>↺ -{smallestAngle}°</button>
                <div style={{ width: 60, fontSize: 18, fontWeight: 900, color: '#0f172a' }}>{angle}°</div>
                <button onClick={() => setAngle(a => a + smallestAngle)} style={{ padding: '8px 16px', borderRadius: 100, border: 'none', background: color, color: '#fff', fontWeight: 800, cursor: 'pointer' }}>↻ +{smallestAngle}°</button>
            </div>
            {angle % smallestAngle === 0 && angle !== 0 && (
                <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#10b981', background: '#d1fae5', display: 'inline-block', padding: '4px 12px', borderRadius: 100 }}>✨ Matches exactly!</div>
            )}
        </div>
    );
}

// 4. Order of Symmetry Tracker
export function OrderTracker() {
    const [step, setStep] = useState(0);
    const angles = [0, 120, 240, 360];
    
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 300 240" width="100%" style={{ maxWidth: 300, background: '#f8fafc', borderRadius: 20 }}>
                {/* Ghost triangle */}
                <polygon points="150,40 60,190 240,190" fill="none" stroke="#cbd5e1" strokeWidth="3" />
                <polygon points="150,40 60,190 240,190" fill="#10b98120" stroke="#10b981" strokeWidth="3" transform={`rotate(${angles[step]}, 150, 140)`} style={{ transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
                
                {/* Tracker dot to show rotation */}
                <circle cx="150" cy="40" r="8" fill="#f43f5e" transform={`rotate(${angles[step]}, 150, 140)`} style={{ transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
            </svg>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 8 }}>
                {angles.map((a, i) => (
                    <div key={i} style={{ padding: '8px 12px', background: step === i ? '#10b981' : '#e2e8f0', color: step === i ? '#fff' : '#64748b', borderRadius: 8, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setStep(i)}>
                        {a}°
                    </div>
                ))}
            </div>
            <p style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>
                Order of Symmetry: <span style={{ color: '#10b981', fontSize: 18 }}>3</span>
            </p>
        </div>
    );
}
