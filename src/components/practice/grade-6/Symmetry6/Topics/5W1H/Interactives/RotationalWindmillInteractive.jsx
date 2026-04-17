import React, { useState, useEffect, useRef } from 'react';

/**
 * Interactive windmill/pinwheel that rotates. Shows angles of symmetry (90°, 180°, 270°, 360°).
 */
export default function RotationalWindmillInteractive() {
    const [angle, setAngle] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const animRef = useRef(null);

    const snapAngles = [0, 90, 180, 270, 360];
    const closest = snapAngles.reduce((prev, curr) =>
        Math.abs(curr - (angle % 360 || 360)) < Math.abs(prev - (angle % 360 || 360)) ? curr : prev
    );
    const isSnapped = Math.abs((angle % 360 || 360) - closest) < 5;

    useEffect(() => {
        if (isSpinning) {
            const tick = () => {
                setAngle(a => {
                    const next = a + 1.5;
                    if (next >= 360) {
                        setIsSpinning(false);
                        return 360;
                    }
                    return next;
                });
                animRef.current = requestAnimationFrame(tick);
            };
            animRef.current = requestAnimationFrame(tick);
        }
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, [isSpinning]);

    const bladeColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg viewBox="0 0 240 240" width="100%" style={{ maxWidth: 220, height: 'auto' }}>
                {/* Reference line */}
                <line x1="120" y1="120" x2="120" y2="20" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,3" />
                <text x="125" y="18" fontSize="10" fill="#94a3b8" fontWeight="700">0°</text>

                <g transform={`rotate(${angle}, 120, 120)`}>
                    {bladeColors.map((color, i) => (
                        <g key={i} transform={`rotate(${i * 90}, 120, 120)`}>
                            <path d={`M 120,120 L 105,45 Q 120,35 135,45 Z`} fill={color} opacity="0.85" stroke={color} strokeWidth="1" />
                        </g>
                    ))}
                    {/* Center pin */}
                    <circle cx="120" cy="120" r="8" fill="#1e293b" />
                    <circle cx="120" cy="120" r="3" fill="#fff" />
                    {/* Rotated reference line */}
                    <line x1="120" y1="120" x2="120" y2="20" stroke="#6366f1" strokeWidth="2" />
                </g>

                {/* Degree label */}
                <rect x="75" y="205" width="90" height="28" rx="8" fill="#fff" stroke={isSnapped ? '#10b981' : '#e2e8f0'} strokeWidth="2" />
                <text x="120" y="224" textAnchor="middle" fontSize="14" fontWeight="800" fill={isSnapped ? '#10b981' : '#475569'}>
                    {Math.round(angle % 360 === 0 && angle > 0 ? 360 : angle % 360)}°
                </text>
            </svg>

            {/* Controls */}
            <div style={{ width: '85%', maxWidth: 260 }}>
                <input type="range" min="0" max="360" value={angle} onChange={e => { setIsSpinning(false); setAngle(Number(e.target.value)); }}
                    style={{ width: '100%', accentColor: '#6366f1' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => { setAngle(0); setIsSpinning(true); }} style={{
                    padding: '6px 16px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
                }}>▶ Auto-Spin</button>
                {snapAngles.filter(a => a > 0).map(a => (
                    <button key={a} onClick={() => { setIsSpinning(false); setAngle(a); }} style={{
                        padding: '6px 10px', borderRadius: 8, border: `2px solid ${angle % 360 === a % 360 ? '#10b981' : '#e2e8f0'}`,
                        fontWeight: 700, fontSize: 11, cursor: 'pointer', background: angle % 360 === a % 360 ? '#dcfce7' : '#fff', color: '#475569'
                    }}>{a}°</button>
                ))}
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>
                {isSnapped && closest > 0 ? `✨ The windmill looks the same at ${closest}°!` : 'Rotate to find where the windmill overlaps itself!'}
            </div>
        </div>
    );
}
