import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   EGGraphMini — Compact SVG graph renderer for Euclid's Geometry
   ═══════════════════════════════════════════════════════════════════════════ */

const S = 240;
const MID = S / 2;

export function EGGraphMini({ config }) {
    if (!config) return null;

    const { type, data } = config;

    // ── axiom-overlap: Show two shapes overlapping or not ──
    if (type === 'axiom-overlap') {
        const { shape = 'rect', offset = 0 } = data;
        return (
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%', background: '#f8fafc', borderRadius: 8 }}>
                {shape === 'rect' && (
                    <>
                        {/* Shape A */}
                        <rect x={40} y={60} width={80} height={80} fill="#3b82f6" opacity={0.7} />
                        {/* Shape B */}
                        <rect x={40 + offset} y={60 + offset} width={80} height={80} fill="#ef4444" opacity={0.7} style={{ mixBlendMode: 'multiply' }} />
                        {/* Separated Labels */}
                        <text x={65} y={105} textAnchor="middle" fontSize={18} fill="#fff" fontWeight="900">A</text>
                        <text x={95 + offset} y={105 + offset} textAnchor="middle" fontSize={18} fill="#fff" fontWeight="900">B</text>
                    </>
                )}
                {shape === 'circle' && (
                    <>
                        <circle cx={100} cy={120} r={50} fill="#3b82f6" opacity={0.7} />
                        <circle cx={100 + offset} cy={120 + offset} r={50} fill="#ef4444" opacity={0.7} style={{ mixBlendMode: 'multiply' }} />
                        <text x={85} y={125} textAnchor="middle" fontSize={18} fill="#fff" fontWeight="900">A</text>
                        <text x={115 + offset} y={125 + offset} textAnchor="middle" fontSize={18} fill="#fff" fontWeight="900">B</text>
                    </>
                )}
            </svg>
        );
    }

    // ── points-line: Show passing lines through points ──
    if (type === 'points-line') {
        const { pts = 2, invalidLines = false } = data;
        return (
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%', background: '#f8fafc', borderRadius: 8 }}>
                <circle cx={80} cy={120} r={6} fill="#1e40af" />
                <text x={70} y={110} fontSize={12} fill="#1e40af" fontWeight="900">A</text>
                
                {pts >= 2 && (
                    <>
                        <circle cx={160} cy={120} r={6} fill="#b71c1c" />
                        <text x={170} y={110} fontSize={12} fill="#b71c1c" fontWeight="900">B</text>
                        <line x1={40} y1={120} x2={200} y2={120} stroke="#10b981" strokeWidth={3} />
                    </>
                )}
                
                {pts === 1 && invalidLines && (
                    <>
                        <line x1={40} y1={80} x2={120} y2={160} stroke="#9ca3af" strokeWidth={2} strokeDasharray="4 4" />
                        <line x1={40} y1={160} x2={120} y2={80} stroke="#9ca3af" strokeWidth={2} strokeDasharray="4 4" />
                        <line x1={80} y1={60} x2={80} y2={180} stroke="#9ca3af" strokeWidth={2} strokeDasharray="4 4" />
                    </>
                )}
            </svg>
        );
    }

    // ── transversal: fifth postulate visually ──
    if (type === 'transversal') {
        const { willMeet = true } = data;
        // if willMeet is true, lines lean inwards. If false, lines lean outwards or are parallel.
        const upperY = willMeet ? 100 : 70;
        const lowerY = willMeet ? 140 : 170;
        const strokeColor = willMeet ? '#ef4444' : '#3b82f6';
        
        return (
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%', background: '#f8fafc', borderRadius: 8 }}>
                {/* Transversal */}
                <line x1={120} y1={20} x2={120} y2={220} stroke="#1e293b" strokeWidth={3} />
                
                {/* Line 1 */}
                <line x1={20} y1={90} x2={220} y2={upperY} stroke={strokeColor} strokeWidth={3} />
                {/* Line 2 */}
                <line x1={20} y1={150} x2={220} y2={lowerY} stroke={strokeColor} strokeWidth={3} />
                
                {/* Highlight Angles on the Right Side */}
                <path d="M 120 100 A 15 15 0 0 1 135 102" fill="none" stroke="#f59e0b" strokeWidth={3} />
                <path d="M 135 141 A 15 15 0 0 1 120 145" fill="none" stroke="#f59e0b" strokeWidth={3} />
                
                <text x={145} y={125} fontSize={12} fill="#f59e0b" fontWeight="800">
                    Sum {willMeet ? '<' : '≥'} 180°
                </text>
            </svg>
        );
    }

    return null;
}
