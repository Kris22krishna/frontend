import React, { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   CGDynamicCharts — Pure‑SVG animated illustrations for Coordinate Geometry
   Used in Terminology, Introduction, and Learn sections.
   ═══════════════════════════════════════════════════════════════════════════ */

const S = 260;                               // default canvas size
const MID = S / 2;                           // centre = origin
const UNIT = S / 22;                         // each unit ≈ 12 px (range −10..10 → 20 units + margin)
const to = (x, y) => ({ px: MID + x * UNIT, py: MID - y * UNIT });

/* ── tiny fade‑in wrapper ────────────────────────────────────────────────── */
const FadeG = ({ delay = 0, children, ...rest }) => {
    const [vis, setVis] = useState(false);
    useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
    return <g style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s ease' }} {...rest}>{children}</g>;
};

/* ── shared grid ─────────────────────────────────────────────────────────── */
function BaseGrid({ size = S, showLabels = true }) {
    const lines = [];
    for (let i = -10; i <= 10; i++) {
        const { px } = to(i, 0);
        const { py } = to(0, i);
        lines.push(<line key={`v${i}`} x1={px} y1={0} x2={px} y2={size} stroke={i === 0 ? '#1e293b' : '#e2e8f0'} strokeWidth={i === 0 ? 2 : 0.5} />);
        lines.push(<line key={`h${i}`} x1={0} y1={py} x2={size} y2={py} stroke={i === 0 ? '#1e293b' : '#e2e8f0'} strokeWidth={i === 0 ? 2 : 0.5} />);
    }
    const labels = [];
    if (showLabels) {
        for (let i = -10; i <= 10; i += 2) {
            if (i === 0) continue;
            const { px } = to(i, 0);
            const { py } = to(0, i);
            labels.push(<text key={`lx${i}`} x={px} y={MID + 14} textAnchor="middle" fontSize={8} fill="#94a3b8">{i}</text>);
            labels.push(<text key={`ly${i}`} x={MID - 6} y={py + 3} textAnchor="end" fontSize={8} fill="#94a3b8">{i}</text>);
        }
        labels.push(<text key="o" x={MID - 8} y={MID + 12} textAnchor="end" fontSize={8} fill="#94a3b8">0</text>);
        labels.push(<text key="X" x={size - 8} y={MID - 8} textAnchor="end" fontSize={10} fill="#0f172a" fontWeight="800">X</text>);
        labels.push(<text key="Y" x={MID + 8} y={14} fontSize={10} fill="#0f172a" fontWeight="800">Y</text>);
    }

    const arr = 6;
    const arrows = (
        <g key="arrows">
            <polygon points={`${MID},0 ${MID-arr},${arr} ${MID+arr},${arr}`} fill="#1e293b" />
            <polygon points={`${MID},${size} ${MID-arr},${size-arr} ${MID+arr},${size-arr}`} fill="#1e293b" />
            <polygon points={`0,${MID} ${arr},${MID-arr} ${arr},${MID+arr}`} fill="#1e293b" />
            <polygon points={`${size},${MID} ${size-arr},${MID-arr} ${size-arr},${MID+arr}`} fill="#1e293b" />
        </g>
    );

    return <>{lines}{labels}{arrows}</>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. QuadrantChart — four coloured regions that fade in one‑by‑one
   ═══════════════════════════════════════════════════════════════════════════ */
export function QuadrantChart() {
    const quads = [
        { x: MID, y: 0, w: MID, h: MID, fill: '#10b98120', label: 'Q I (+,+)', lx: MID + MID / 2, ly: MID / 2 },
        { x: 0, y: 0, w: MID, h: MID, fill: '#3b82f620', label: 'Q II (−,+)', lx: MID / 2, ly: MID / 2 },
        { x: 0, y: MID, w: MID, h: MID, fill: '#f59e0b20', label: 'Q III (−,−)', lx: MID / 2, ly: MID + MID / 2 },
        { x: MID, y: MID, w: MID, h: MID, fill: '#ef444420', label: 'Q IV (+,−)', lx: MID + MID / 2, ly: MID + MID / 2 },
    ];
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            {quads.map((q, i) => (
                <FadeG key={i} delay={i * 350}>
                    <rect x={q.x} y={q.y} width={q.w} height={q.h} fill={q.fill} />
                    <text x={q.lx} y={q.ly} textAnchor="middle" fontSize={11} fontWeight="800" fill="#334155">{q.label}</text>
                </FadeG>
            ))}
            <BaseGrid />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. AxesHighlightChart — pulsing origin, axes draw in
   ═══════════════════════════════════════════════════════════════════════════ */
export function AxesHighlightChart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid showLabels={false} />
            {/* X‑axis highlight */}
            <FadeG delay={200}>
                <line x1={0} y1={MID} x2={S} y2={MID} stroke="#0891b2" strokeWidth={3} />
                <text x={S - 8} y={MID - 8} textAnchor="end" fontSize={12} fill="#0891b2" fontWeight="900">X-axis →</text>
            </FadeG>
            {/* Y‑axis highlight */}
            <FadeG delay={600}>
                <line x1={MID} y1={0} x2={MID} y2={S} stroke="#7c3aed" strokeWidth={3} />
                <text x={MID + 8} y={16} fontSize={12} fill="#7c3aed" fontWeight="900">↑ Y-axis</text>
            </FadeG>
            {/* Pulsing origin */}
            <FadeG delay={1000}>
                <circle cx={MID} cy={MID} r={7} fill="#d97706" stroke="#fff" strokeWidth={2}>
                    <animate attributeName="r" values="6;9;6" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <text x={MID + 12} y={MID + 16} fontSize={11} fill="#d97706" fontWeight="800">Origin (0,0)</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. OrderedPairChart — dashed lines animate from axes to point
   ═══════════════════════════════════════════════════════════════════════════ */
export function OrderedPairChart({ px: ptX = 4, py: ptY = 5 }) {
    const pt = to(ptX, ptY);
    const xOnAxis = to(ptX, 0);
    const yOnAxis = to(0, ptY);
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            {/* Dashed projection lines */}
            <FadeG delay={300}>
                <line x1={xOnAxis.px} y1={xOnAxis.py} x2={pt.px} y2={pt.py} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 4" />
            </FadeG>
            <FadeG delay={600}>
                <line x1={yOnAxis.px} y1={yOnAxis.py} x2={pt.px} y2={pt.py} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 4" />
            </FadeG>
            {/* Axis tick indicators */}
            <FadeG delay={200}>
                <circle cx={xOnAxis.px} cy={xOnAxis.py} r={4} fill="#0891b2" />
                <text x={xOnAxis.px} y={xOnAxis.py + 16} textAnchor="middle" fontSize={10} fill="#0891b2" fontWeight="800">{ptX}</text>
            </FadeG>
            <FadeG delay={500}>
                <circle cx={yOnAxis.px} cy={yOnAxis.py} r={4} fill="#7c3aed" />
                <text x={yOnAxis.px - 14} y={yOnAxis.py + 4} textAnchor="end" fontSize={10} fill="#7c3aed" fontWeight="800">{ptY}</text>
            </FadeG>
            {/* The point */}
            <FadeG delay={900}>
                <circle cx={pt.px} cy={pt.py} r={6} fill="#dc2626" stroke="#fff" strokeWidth={2} />
                <text x={pt.px + 10} y={pt.py - 10} fontSize={12} fill="#dc2626" fontWeight="900">P({ptX},{ptY})</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. ReflectionChart — point + its mirror across an axis
   ═══════════════════════════════════════════════════════════════════════════ */
export function ReflectionChart({ axis = 'X' }) {
    const origX = 3, origY = 4;
    const refX = axis === 'Y' ? -origX : origX;
    const refY = axis === 'X' ? -origY : origY;
    const p1 = to(origX, origY);
    const p2 = to(refX, refY);
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            {/* Mirror line pulse */}
            <FadeG delay={200}>
                {axis === 'X'
                    ? <line x1={0} y1={MID} x2={S} y2={MID} stroke="#f59e0b" strokeWidth={3} opacity={0.4}>
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                      </line>
                    : <line x1={MID} y1={0} x2={MID} y2={S} stroke="#f59e0b" strokeWidth={3} opacity={0.4}>
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                      </line>
                }
            </FadeG>
            {/* Dashed connecting line */}
            <FadeG delay={600}>
                <line x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py} stroke="#94a3b8" strokeWidth={1} strokeDasharray="4 4" />
            </FadeG>
            {/* Original */}
            <FadeG delay={400}>
                <circle cx={p1.px} cy={p1.py} r={6} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                <text x={p1.px + 10} y={p1.py - 8} fontSize={11} fill="#3b82f6" fontWeight="800">A({origX},{origY})</text>
            </FadeG>
            {/* Reflection */}
            <FadeG delay={1000}>
                <circle cx={p2.px} cy={p2.py} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                <text x={p2.px + 10} y={p2.py - 8} fontSize={11} fill="#ef4444" fontWeight="800">A'({refX},{refY})</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. DistanceFromAxisChart — perpendicular distance line with measurement
   ═══════════════════════════════════════════════════════════════════════════ */
export function DistanceFromAxisChart({ axis = 'X' }) {
    const ptX = -4, ptY = 7;
    const pt = to(ptX, ptY);
    const footX = axis === 'X' ? to(ptX, 0) : to(0, ptY);
    const dist = axis === 'X' ? Math.abs(ptY) : Math.abs(ptX);
    const distColor = '#0f766e';
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            {/* Distance line */}
            <FadeG delay={500}>
                <line x1={pt.px} y1={pt.py} x2={footX.px} y2={footX.py} stroke={distColor} strokeWidth={2.5} strokeDasharray="6 3" />
                <text x={(pt.px + footX.px) / 2 + 10} y={(pt.py + footX.py) / 2} fontSize={11} fill={distColor} fontWeight="900">{dist} units</text>
            </FadeG>
            {/* Foot on axis */}
            <FadeG delay={300}>
                <circle cx={footX.px} cy={footX.py} r={4} fill="#64748b" />
            </FadeG>
            {/* Point */}
            <FadeG delay={200}>
                <circle cx={pt.px} cy={pt.py} r={6} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                <text x={pt.px + 10} y={pt.py - 8} fontSize={11} fill="#3b82f6" fontWeight="800">P({ptX},{ptY})</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. PlottingStepsChart — animated step‑by‑step: origin → X → Y → dot
   ═══════════════════════════════════════════════════════════════════════════ */
export function PlottingStepsChart({ targetX = 3, targetY = 4 }) {
    const [step, setStep] = useState(0);
    useEffect(() => {
        if (step >= 3) return;
        const t = setTimeout(() => setStep(s => s + 1), 900);
        return () => clearTimeout(t);
    }, [step]);

    const origin = to(0, 0);
    const xStop = to(targetX, 0);
    const final = to(targetX, targetY);
    const arrowColor = '#0f4c81';

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            {/* Step 1: horizontal arrow from origin to X */}
            {step >= 1 && (
                <FadeG delay={0}>
                    <line x1={origin.px} y1={origin.py} x2={xStop.px} y2={xStop.py} stroke={arrowColor} strokeWidth={2.5} markerEnd="url(#arrowHead)" />
                    <text x={(origin.px + xStop.px) / 2} y={origin.py + 18} textAnchor="middle" fontSize={10} fill={arrowColor} fontWeight="800">→ {targetX} right</text>
                </FadeG>
            )}
            {/* Step 2: vertical arrow from X‑stop to final */}
            {step >= 2 && (
                <FadeG delay={0}>
                    <line x1={xStop.px} y1={xStop.py} x2={final.px} y2={final.py} stroke="#b71c1c" strokeWidth={2.5} markerEnd="url(#arrowHeadR)" />
                    <text x={final.px + 14} y={(xStop.py + final.py) / 2} fontSize={10} fill="#b71c1c" fontWeight="800">↑ {targetY} up</text>
                </FadeG>
            )}
            {/* Step 3: final dot */}
            {step >= 3 && (
                <FadeG delay={0}>
                    <circle cx={final.px} cy={final.py} r={7} fill="#ef4444" stroke="#fff" strokeWidth={2}>
                        <animate attributeName="r" values="6;9;7" dur="0.6s" repeatCount="1" />
                    </circle>
                    <text x={final.px + 12} y={final.py - 10} fontSize={12} fill="#ef4444" fontWeight="900">({targetX},{targetY})</text>
                </FadeG>
            )}
            {/* Arrowhead defs */}
            <defs>
                <marker id="arrowHead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill={arrowColor} /></marker>
                <marker id="arrowHeadR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#b71c1c" /></marker>
            </defs>
        </svg>
    );
}
