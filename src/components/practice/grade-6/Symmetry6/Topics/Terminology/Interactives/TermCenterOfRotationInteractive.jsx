import React, { useState } from 'react';

/** Interactive: rotate a shape and see where it overlaps — find center of rotation */
export default function TermCenterOfRotationInteractive() {
    const [angle, setAngle] = useState(0);
    const snapAngles = [0, 60, 120, 180, 240, 300, 360];
    const isSnap = snapAngles.some(a => Math.abs((angle % 360 || 360) - a) < 5);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 200 200" width="100%" style={{ maxWidth: 200, height: 'auto' }}>
                {/* Static reference */}
                <polygon points="100,30 145,90 130,155 70,155 55,90" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,3" />
                {/* Rotating shape */}
                <g transform={`rotate(${angle}, 100, 100)`}>
                    <polygon points="100,30 145,90 130,155 70,155 55,90" fill={isSnap ? '#dcfce7' : '#dbeafe'} stroke={isSnap ? '#10b981' : '#3b82f6'} strokeWidth="2" />
                </g>
                {/* Center dot */}
                <circle cx="100" cy="100" r="6" fill="#ef4444" />
                <text x="100" y="190" textAnchor="middle" fontSize="12" fontWeight="800" fill={isSnap ? '#10b981' : '#475569'}>{Math.round(angle)}°</text>
            </svg>
            <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))}
                style={{ width: '75%', maxWidth: 220, accentColor: '#ef4444' }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: isSnap ? '#10b981' : '#94a3b8' }}>
                {isSnap ? '✨ The shape overlaps! This is an angle of symmetry!' : 'Rotate the regular pentagon around the red center'}
            </div>
        </div>
    );
}
