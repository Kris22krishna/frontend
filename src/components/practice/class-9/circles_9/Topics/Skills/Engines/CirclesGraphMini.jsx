import React from 'react';

/**
 * A highly reusable visualizer for the Circles Quiz Engine.
 * Adapts to `config.type` and renders a clean, educational SVG.
 */
export default function CirclesGraphMini({ config }) {
    if (!config) return null;

    const { type, data } = config;
    const s = 200;
    const r = 80;
    const cx = 100;
    const cy = 100;

    // Helper: point on circle
    const getPoint = (angleDegree) => {
        const rad = ((angleDegree - 90) * Math.PI) / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad)
        };
    };

    if (type === 'equal-chords') {
        // Two equal chords subtending equal angles at the center
        const a1 = 30;
        const a2 = a1 + data.angle;
        const p1 = getPoint(a1);
        const p2 = getPoint(a2);

        const a3 = 180 + 30;
        const a4 = a3 + data.angle;
        const p3 = getPoint(a3);
        const p4 = getPoint(a4);

        return (
            <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="240px">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx={cx} cy={cy} r="3" fill="#0f172a" />
                
                {/* Chord 1 */}
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#f59e0b" strokeWidth="3" />
                <line x1={cx} y1={cy} x2={p1.x} y2={p1.y} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="2" />
                <line x1={cx} y1={cy} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="2" />
                
                {/* Chord 2 */}
                <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#f59e0b" strokeWidth="3" />
                <line x1={cx} y1={cy} x2={p3.x} y2={p3.y} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="2" />
                <line x1={cx} y1={cy} x2={p4.x} y2={p4.y} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="2" />
                
                <text x={cx} y={cy - 10} fill="#0f172a" fontSize="14" fontWeight="bold" textAnchor="middle">{data.angle}°</text>
                <text x={cx} y={cy + 20} fill="#0f172a" fontSize="14" fontWeight="bold" textAnchor="middle">?</text>
            </svg>
        );
    }

    if (type === 'perp-bisect' || type === 'pythagoras-radius' || type === 'pythagoras-chord') {
        const perpDrop = 40; // visual representation
        const halfVisual = Math.sqrt(r * r - perpDrop * perpDrop);
        const p1 = { x: cx - halfVisual, y: cy + perpDrop };
        const p2 = { x: cx + halfVisual, y: cy + perpDrop };
        const pm = { x: cx, y: cy + perpDrop };

        return (
            <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="240px">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx={cx} cy={cy} r="3" fill="#0f172a" />
                
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#3b82f6" strokeWidth="3" />
                <line x1={cx} y1={cy} x2={pm.x} y2={pm.y} stroke="#ef4444" strokeWidth="3" />
                <line x1={cx} y1={cy} x2={p2.x} y2={p2.y} stroke="#10b981" strokeWidth="3" strokeDasharray="4 4" />
                
                {/* Right angle square */}
                <rect x={pm.x} y={pm.y - 10} width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="1" />
                
                <text x={cx} y={cy - 10} fill="#0f172a" fontSize="12" fontWeight="bold">O</text>
                <text x={p1.x - 10} y={p1.y + 10} fill="#0f172a" fontSize="12" fontWeight="bold">A</text>
                <text x={p2.x + 10} y={p2.y + 10} fill="#0f172a" fontSize="12" fontWeight="bold">B</text>
                <text x={pm.x - 10} y={pm.y + 15} fill="#0f172a" fontSize="12" fontWeight="bold">M</text>
            </svg>
        );
    }

    if (type === 'equidistant-chords') {
        const d = 40;
        const hl = Math.sqrt(r * r - d * d);
        return (
            <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="240px">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx={cx} cy={cy} r="3" fill="#0f172a" />
                
                {/* Horizontal Chord Top */}
                <line x1={cx - hl} y1={cy - d} x2={cx + hl} y2={cy - d} stroke="#10b981" strokeWidth="3" />
                <line x1={cx} y1={cy} x2={cx} y2={cy - d} stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Vertical Chord Left */}
                <line x1={cx - d} y1={cy - hl} x2={cx - d} y2={cy + hl} stroke="#10b981" strokeWidth="3" />
                <line x1={cx} y1={cy} x2={cx - d} y2={cy} stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />

                <text x={cx + 5} y={cy - d/2} fill="#ef4444" fontSize="12" fontWeight="bold">{data.dist}cm</text>
                <text x={cx - d/2 - 20} y={cy - 5} fill="#ef4444" fontSize="12" fontWeight="bold">{data.dist}cm</text>
            </svg>
        );
    }

    if (type === 'centre-angle') {
        const { boundAngle, centreAngle, unknown } = data;
        const p1 = getPoint(210);
        const p2 = getPoint(150);
        const top = getPoint(0);
        return (
            <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="240px">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                
                {/* Angle at boundary */}
                <line x1={p1.x} y1={p1.y} x2={top.x} y2={top.y} stroke="#3b82f6" strokeWidth="2" />
                <line x1={p2.x} y1={p2.y} x2={top.x} y2={top.y} stroke="#3b82f6" strokeWidth="2" />
                <text x={top.x} y={top.y + 20} fill="#3b82f6" fontSize="14" fontWeight="bold" textAnchor="middle">
                    {unknown === 'boundary' ? '?' : `${boundAngle}°`}
                </text>
                
                {/* Angle at centre */}
                <line x1={p1.x} y1={p1.y} x2={cx} y2={cy} stroke="#f59e0b" strokeWidth="3" />
                <line x1={p2.x} y1={p2.y} x2={cx} y2={cy} stroke="#f59e0b" strokeWidth="3" />
                <text x={cx} y={cy - 10} fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">
                    {unknown === 'centre' ? '?' : `${centreAngle}°`}
                </text>
                
                <circle cx={cx} cy={cy} r="3" fill="#0f172a" />
            </svg>
        );
    }

    if (type === 'same-segment') {
        const { angle } = data;
        const p1 = getPoint(220);
        const p2 = getPoint(140);
        const top1 = getPoint(-20);
        const top2 = getPoint(20);
        return (
            <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="240px">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="4" />

                <line x1={p1.x} y1={p1.y} x2={top1.x} y2={top1.y} stroke="#8b5cf6" strokeWidth="2" />
                <line x1={p2.x} y1={p2.y} x2={top1.x} y2={top1.y} stroke="#8b5cf6" strokeWidth="2" />
                <text x={top1.x} y={top1.y + 20} fill="#8b5cf6" fontSize="14" fontWeight="bold" textAnchor="middle">{angle}°</text>
                
                <line x1={p1.x} y1={p1.y} x2={top2.x} y2={top2.y} stroke="#ec4899" strokeWidth="2" />
                <line x1={p2.x} y1={p2.y} x2={top2.x} y2={top2.y} stroke="#ec4899" strokeWidth="2" />
                <text x={top2.x} y={top2.y + 20} fill="#ec4899" fontSize="14" fontWeight="bold" textAnchor="middle">?</text>
            </svg>
        );
    }

    if (type === 'semicircle') {
        const p1 = getPoint(270);
        const p2 = getPoint(90);
        const top = getPoint(0);
        return (
            <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="240px">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx={cx} cy={cy} r="3" fill="#0f172a" />
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#64748b" strokeWidth="3" />
                
                <line x1={p1.x} y1={p1.y} x2={top.x} y2={top.y} stroke="#10b981" strokeWidth="3" />
                <line x1={p2.x} y1={p2.y} x2={top.x} y2={top.y} stroke="#10b981" strokeWidth="3" />
                <text x={top.x} y={top.y + 25} fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">?</text>
            </svg>
        );
    }

    if (type === 'cyclic-quad' || type === 'cyclic-quad-ratio') {
        const pA = getPoint(220); // bottom left
        const pB = getPoint(300); // top left
        const pC = getPoint(40);  // top right
        const pD = getPoint(140); // bottom right
        const lbl1 = data.labels ? data.labels[0] : 'A';
        const lbl2 = data.labels ? data.labels[1] : 'C';
        let val1 = data.knownA ? `${data.knownA}°` : `${data.m}x`;
        let val2 = data.unknownC ? `?` : `${data.n}x`;
        if (type === 'cyclic-quad-ratio') {
            val1 = `${data.m}x`;
            val2 = `? (${data.n}x)`;
        }
        return (
            <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="240px">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <polygon points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y} ${pD.x},${pD.y}`} fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
                
                <text x={pA.x + 15} y={pA.y - 10} fill="#d97706" fontSize="14" fontWeight="bold">{val1}</text>
                <text x={pC.x - 20} y={pC.y + 20} fill="#d97706" fontSize="14" fontWeight="bold">{val2}</text>
                <text x={pA.x - 10} y={pA.y + 10} fill="#0f172a" fontSize="14" fontWeight="bold">{lbl1}</text>
                <text x={pC.x + 10} y={pC.y - 10} fill="#0f172a" fontSize="14" fontWeight="bold">{lbl2}</text>
            </svg>
        );
    }

    if (type === 'cyclic-quad-ext') {
        const pA = getPoint(220); 
        const pB = getPoint(300); 
        const pC = getPoint(40);  
        const pD = getPoint(140); 
        // Extension of line DC
        const extLength = 40;
        const dx = pC.x - pD.x;
        const dy = pC.y - pD.y;
        const mag = Math.sqrt(dx*dx + dy*dy);
        const pExt = {
            x: pC.x + (dx/mag) * extLength,
            y: pC.y + (dy/mag) * extLength
        };

        return (
            <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="240px">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <polygon points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y} ${pD.x},${pD.y}`} fill="#f1f5f9" stroke="#64748b" strokeWidth="3" />
                <line x1={pC.x} y1={pC.y} x2={pExt.x} y2={pExt.y} stroke="#64748b" strokeWidth="3" />
                
                <text x={pA.x + 20} y={pA.y - 5} fill="#3b82f6" fontSize="14" fontWeight="bold">{data.interiorOpp}°</text>
                <text x={pExt.x - 15} y={pExt.y + 15} fill="#ef4444" fontSize="14" fontWeight="bold">x</text>
            </svg>
        );
    }

    return null;
}
