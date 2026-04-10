import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   LEGraphMini — Compact SVG graph renderer for Linear Equations
   Renders equation lines, solution points, and intercepts for
   practice/assessment questions.
   ═══════════════════════════════════════════════════════════════════════════ */

const S = 240;
const MID = S / 2;
const UNIT = S / 20;
const to = (x, y) => ({ px: MID + x * UNIT, py: MID - y * UNIT });

function MiniGrid() {
    const lines = [];
    for (let i = -10; i <= 10; i++) {
        const { px } = to(i, 0);
        const { py } = to(0, i);
        lines.push(<line key={`v${i}`} x1={px} y1={0} x2={px} y2={S} stroke={i === 0 ? '#334155' : '#e2e8f0'} strokeWidth={i === 0 ? 1.5 : 0.4} />);
        lines.push(<line key={`h${i}`} x1={0} y1={py} x2={S} y2={py} stroke={i === 0 ? '#334155' : '#e2e8f0'} strokeWidth={i === 0 ? 1.5 : 0.4} />);
    }
    const labels = [];
    for (let i = -8; i <= 8; i += 2) {
        if (i === 0) continue;
        const { px } = to(i, 0);
        const { py } = to(0, i);
        labels.push(<text key={`lx${i}`} x={px} y={MID + 12} textAnchor="middle" fontSize={7} fill="#94a3b8">{i}</text>);
        labels.push(<text key={`ly${i}`} x={MID - 5} y={py + 3} textAnchor="end" fontSize={7} fill="#94a3b8">{i}</text>);
    }
    labels.push(<text key="X" x={S - 6} y={MID - 6} textAnchor="end" fontSize={8} fill="#475569" fontWeight="800">x</text>);
    labels.push(<text key="Y" x={MID + 6} y={10} fontSize={8} fill="#475569" fontWeight="800">y</text>);
    const arr = 5;
    return (
        <>
            {lines}{labels}
            <polygon points={`${MID},0 ${MID-arr},${arr} ${MID+arr},${arr}`} fill="#334155" />
            <polygon points={`${S},${MID} ${S-arr},${MID-arr} ${S-arr},${MID+arr}`} fill="#334155" />
        </>
    );
}

export function LEGraphMini({ config }) {
    if (!config) return null;

    const { type, data } = config;

    // ── single-line: draw one equation ──
    if (type === 'single-line') {
        const { a, b, c, color = '#3b82f6', label, points = [] } = data;
        const getY = (x) => (c - a * x) / b;
        const x1 = -10, x2 = 10;
        const lp1 = to(x1, getY(x1)), lp2 = to(x2, getY(x2));

        return (
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
                <MiniGrid />
                <line x1={lp1.px} y1={lp1.py} x2={lp2.px} y2={lp2.py} stroke={color} strokeWidth={2} />
                {points.map((pt, i) => {
                    const pos = to(pt.x, pt.y);
                    return (
                        <g key={i}>
                            <circle cx={pos.px} cy={pos.py} r={6} fill={color} stroke="#fff" strokeWidth={2} />
                            <text x={pos.px + 9} y={pos.py - 9} fontSize={9} fill={color} fontWeight="900">
                                ({pt.x},{pt.y % 1 === 0 ? pt.y : pt.y.toFixed(1)})
                            </text>
                        </g>
                    );
                })}
                {label && <text x={10} y={16} fontSize={9} fill={color} fontWeight="900">{label}</text>}
            </svg>
        );
    }

    // ── two-lines: draw two equations and mark intersection ──
    if (type === 'two-lines') {
        const { line1, line2, intersection } = data;
        const getY = (a, b, c, x) => (c - a * x) / b;
        const draw = (eq) => {
            const y1 = getY(eq.a, eq.b, eq.c, -10);
            const y2 = getY(eq.a, eq.b, eq.c, 10);
            return { p1: to(-10, y1), p2: to(10, y2) };
        };
        const l1 = draw(line1);
        const l2 = draw(line2);

        return (
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
                <MiniGrid />
                <line x1={l1.p1.px} y1={l1.p1.py} x2={l1.p2.px} y2={l1.p2.py} stroke={line1.color || '#3b82f6'} strokeWidth={2} />
                <line x1={l2.p1.px} y1={l2.p1.py} x2={l2.p2.px} y2={l2.p2.py} stroke={line2.color || '#ef4444'} strokeWidth={2} />
                {line1.label && <text x={10} y={16} fontSize={9} fill={line1.color || '#3b82f6'} fontWeight="900">{line1.label}</text>}
                {line2.label && <text x={10} y={28} fontSize={9} fill={line2.color || '#ef4444'} fontWeight="900">{line2.label}</text>}
                {intersection && (
                    <g>
                        <circle cx={to(intersection.x, intersection.y).px} cy={to(intersection.x, intersection.y).py} r={6} fill="#10b981" stroke="#fff" strokeWidth={2} />
                        <text x={to(intersection.x, intersection.y).px + 9} y={to(intersection.x, intersection.y).py - 9} fontSize={9} fill="#10b981" fontWeight="900">
                            ({intersection.x},{intersection.y})
                        </text>
                    </g>
                )}
            </svg>
        );
    }

    // ── solution-check: highlight a point on/off a line ──
    if (type === 'solution-check') {
        const { a, b, c, color = '#7c3aed', point, isOnLine } = data;
        const getY = (x) => (c - a * x) / b;
        const lp1 = to(-10, getY(-10)), lp2 = to(10, getY(10));
        const ptPos = to(point.x, point.y);

        return (
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
                <MiniGrid />
                <line x1={lp1.px} y1={lp1.py} x2={lp2.px} y2={lp2.py} stroke={color} strokeWidth={2} />
                <circle cx={ptPos.px} cy={ptPos.py} r={6} fill={isOnLine ? '#10b981' : '#ef4444'} stroke="#fff" strokeWidth={2} />
                <text x={ptPos.px + 9} y={ptPos.py - 9} fontSize={9} fill={isOnLine ? '#10b981' : '#ef4444'} fontWeight="900">
                    ({point.x},{point.y})
                </text>
            </svg>
        );
    }

    // ── intercepts: show x and y intercepts ──
    if (type === 'intercepts') {
        const { a, b, c, color = '#0f766e' } = data;
        const getY = (x) => (c - a * x) / b;
        const xInt = c / a, yInt = c / b;
        const lp1 = to(-10, getY(-10)), lp2 = to(10, getY(10));

        return (
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
                <MiniGrid />
                <line x1={lp1.px} y1={lp1.py} x2={lp2.px} y2={lp2.py} stroke={color} strokeWidth={2} />
                <circle cx={to(xInt, 0).px} cy={to(xInt, 0).py} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                <text x={to(xInt, 0).px + 9} y={to(xInt, 0).py + 14} fontSize={9} fill="#ef4444" fontWeight="900">({xInt},0)</text>
                <circle cx={to(0, yInt).px} cy={to(0, yInt).py} r={6} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                <text x={to(0, yInt).px + 9} y={to(0, yInt).py - 9} fontSize={9} fill="#3b82f6" fontWeight="900">(0,{yInt})</text>
            </svg>
        );
    }

    return null;
}
