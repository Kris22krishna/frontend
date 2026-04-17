import React, { useState, useEffect } from 'react';

/* ─── Compass Widget ─── */
export function CompassTermWidget() {
    const [angle, setAngle] = useState(270);
    const cx = 80, cy = 80, r = 50;
    const rad = (angle - 90) * Math.PI / 180;
    const px = cx + r * Math.cos(rad);
    const py = cy + r * Math.sin(rad);

    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 160 160" width="150" height="150">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4,3" />
                <circle cx={cx} cy={cy} r="4" fill="#0ea5e9" />
                <line x1={cx} y1={cy} x2={px} y2={py} stroke="#334155" strokeWidth="2" />
                <circle cx={px} cy={py} r="4" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                <text x={cx + 8} y={cy - 4} fontSize="11" fill="#0ea5e9" fontWeight="700">Center</text>
            </svg>
            <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))}
                style={{ width: 140, accentColor: '#0ea5e9' }} />
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Rotate the compass arm</div>
        </div>
    );
}

/* ─── Radius Widget ─── */
export function RadiusTermWidget() {
    const [r, setR] = useState(40);
    const cx = 80, cy = 80;
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 160 160" width="150" height="150">
                <circle cx={cx} cy={cy} r={r} fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                <circle cx={cx} cy={cy} r="3" fill="#3b82f6" />
                <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#ef4444" strokeWidth="2" />
                <text x={cx + r/2} y={cy - 6} textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="800">{r} px</text>
            </svg>
            <input type="range" min="20" max="70" value={r} onChange={e => setR(Number(e.target.value))}
                style={{ width: 140, accentColor: '#3b82f6' }} />
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Change the radius</div>
        </div>
    );
}

/* ─── Perpendicular Widget ─── */
export function PerpendicularTermWidget() {
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 160 120" width="150" height="110">
                <line x1="20" y1="90" x2="140" y2="90" stroke="#334155" strokeWidth="2.5" />
                <line x1="80" y1="90" x2="80" y2="15" stroke="#8b5cf6" strokeWidth="2.5" />
                <rect x="82" y="78" width="10" height="10" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                <text x="80" y="108" textAnchor="middle" fontSize="12" fill="#334155" fontWeight="700">Base</text>
                <text x="95" y="55" fontSize="12" fill="#8b5cf6" fontWeight="700">90°</text>
            </svg>
        </div>
    );
}

/* ─── Diagonal Widget ─── */
export function DiagonalTermWidget() {
    const [show, setShow] = useState(true);
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 160 120" width="150" height="110">
                <rect x="20" y="15" width="120" height="80" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" rx="2" />
                {show && <>
                    <line x1="20" y1="15" x2="140" y2="95" stroke="#ef4444" strokeWidth="2" />
                    <line x1="140" y1="15" x2="20" y2="95" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="80" cy="55" r="4" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                </>}
            </svg>
            <button onClick={() => setShow(s => !s)} style={{ fontSize: 12, padding: '4px 14px', borderRadius: 100, border: '1px solid #10b981', background: '#ecfdf5', color: '#10b981', fontWeight: 700, cursor: 'pointer' }}>
                {show ? 'Hide' : 'Show'} Diagonals
            </button>
        </div>
    );
}

/* ─── Arc Widget ─── */
export function ArcTermWidget() {
    const [sweep, setSweep] = useState(120);
    const cx = 80, cy = 80, r = 50;
    const startRad = (-90) * Math.PI / 180;
    const endRad = (sweep - 90) * Math.PI / 180;
    const sx = cx + r * Math.cos(startRad), sy = cy + r * Math.sin(startRad);
    const ex = cx + r * Math.cos(endRad), ey = cy + r * Math.sin(endRad);
    const large = sweep > 180 ? 1 : 0;
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 160 160" width="150" height="150">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                <path d={`M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`} fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                <circle cx={cx} cy={cy} r="3" fill="#64748b" />
                <text x={cx + 8} y={cy - 4} fontSize="10" fill="#64748b" fontWeight="600">center</text>
            </svg>
            <input type="range" min="30" max="350" value={sweep} onChange={e => setSweep(Number(e.target.value))}
                style={{ width: 140, accentColor: '#f59e0b' }} />
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Arc sweep: {sweep}°</div>
        </div>
    );
}

/* ─── 90-Degree Angle Widget ─── */
export function RightAngleTermWidget() {
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 130 130" width="120" height="120">
                <line x1="20" y1="100" x2="110" y2="100" stroke="#334155" strokeWidth="2.5" />
                <line x1="20" y1="100" x2="20" y2="15" stroke="#ec4899" strokeWidth="2.5" />
                <rect x="22" y="88" width="12" height="12" fill="none" stroke="#ec4899" strokeWidth="2" />
                <text x="40" y="85" fontSize="16" fill="#ec4899" fontWeight="800">90°</text>
            </svg>
        </div>
    );
}

/* ─── Equidistant Widget ─── */
export function EquidistantTermWidget() {
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 180 140" width="170" height="130">
                <circle cx="50" cy="100" r="4" fill="#0ea5e9" />
                <circle cx="130" cy="100" r="4" fill="#0ea5e9" />
                <text x="50" y="118" textAnchor="middle" fontSize="12" fill="#0ea5e9" fontWeight="700">B</text>
                <text x="130" y="118" textAnchor="middle" fontSize="12" fill="#0ea5e9" fontWeight="700">C</text>
                {/* Arcs */}
                <path d="M 50 100 A 80 80 0 0 1 90 35" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,3" />
                <path d="M 130 100 A 80 80 0 0 0 90 35" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
                <circle cx="90" cy="35" r="5" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                <text x="90" y="25" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="800">A</text>
                <line x1="50" y1="100" x2="90" y2="35" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="130" y1="100" x2="90" y2="35" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
                <text x="60" y="65" fontSize="10" fill="#64748b" fontWeight="600">5 cm</text>
                <text x="115" y="65" fontSize="10" fill="#64748b" fontWeight="600">5 cm</text>
            </svg>
        </div>
    );
}
