import React, { useState } from 'react';

/** Interactive: visualize angle of symmetry as multiples of the smallest angle */
export default function TermAngleOfSymmetryInteractive() {
    const [arms, setArms] = useState(4);
    const smallestAngle = 360 / arms;
    const angles = Array.from({ length: arms }, (_, i) => smallestAngle * (i + 1));

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#0ea5e9', '#f97316'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 200 200" width="100%" style={{ maxWidth: 200, height: 'auto' }}>
                {/* Radial arms */}
                {Array.from({ length: arms }, (_, i) => {
                    const rad = (i * smallestAngle - 90) * Math.PI / 180;
                    return (
                        <g key={i}>
                            <line x1="100" y1="100" x2={100 + 80 * Math.cos(rad)} y2={100 + 80 * Math.sin(rad)}
                                stroke={colors[i % colors.length]} strokeWidth="3" strokeLinecap="round" />
                            <circle cx={100 + 70 * Math.cos(rad)} cy={100 + 70 * Math.sin(rad)} r="10"
                                fill={colors[i % colors.length]} opacity="0.7" />
                        </g>
                    );
                })}
                <circle cx="100" cy="100" r="5" fill="#1e293b" />
                {/* Angle arc */}
                <path d={`M 100,60 A 40,40 0 0,1 ${100 + 40 * Math.cos((smallestAngle - 90) * Math.PI / 180)},${100 + 40 * Math.sin((smallestAngle - 90) * Math.PI / 180)}`}
                    fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
                <text x="115" y="55" fontSize="11" fill="#f59e0b" fontWeight="800">{smallestAngle}°</text>
            </svg>

            {/* Arms selector */}
            <div style={{ display: 'flex', gap: 6 }}>
                {[3, 4, 5, 6, 8].map(n => (
                    <button key={n} onClick={() => setArms(n)} style={{
                        padding: '5px 12px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        background: n === arms ? '#6366f1' : '#f1f5f9', color: n === arms ? '#fff' : '#475569'
                    }}>{n} arms</button>
                ))}
            </div>

            {/* Angles list */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                {angles.map((a, i) => (
                    <span key={i} style={{ padding: '3px 10px', borderRadius: 6, background: '#f1f5f9', fontSize: 12, fontWeight: 700, color: '#475569' }}>{a}°</span>
                ))}
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                Smallest angle: {smallestAngle}° — all angles are its multiples!
            </div>
        </div>
    );
}
