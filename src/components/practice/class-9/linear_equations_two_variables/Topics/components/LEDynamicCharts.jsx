import React, { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   LEDynamicCharts — Pure SVG animated illustrations for Linear Equations
   Used in Terminology, Introduction, and Learn sections.
   ═══════════════════════════════════════════════════════════════════════════ */

const S = 260;
const MID = S / 2;
const UNIT = S / 22;
const to = (x, y) => ({ px: MID + x * UNIT, py: MID - y * UNIT });

/* ── tiny fade-in wrapper ──────────────────────────────────────────────── */
const FadeG = ({ delay = 0, children, ...rest }) => {
    const [vis, setVis] = useState(false);
    useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
    return <g style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s ease' }} {...rest}>{children}</g>;
};

/* ── shared grid ─────────────────────────────────────────────────────── */
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
   1. SingleLineChart — plots a single linear equation ax + by = c
   ═══════════════════════════════════════════════════════════════════════════ */
export function SingleLineChart({ a = 1, b = 1, c = 2, color = '#3b82f6', label = 'x + y = 2' }) {
    // Compute two points on the line
    const getY = (x) => (c - a * x) / b;
    const x1 = -10, x2 = 10;
    const y1 = getY(x1), y2 = getY(x2);
    const p1 = to(x1, y1), p2 = to(x2, y2);

    // Compute 3 solution points to highlight
    const solPoints = [];
    for (let x = -4; x <= 4; x += 2) {
        const y = getY(x);
        if (Math.abs(y) <= 10) solPoints.push({ x, y });
    }

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <FadeG delay={300}>
                <line x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py} stroke={color} strokeWidth={2.5} />
            </FadeG>
            {solPoints.map((pt, i) => {
                const pos = to(pt.x, pt.y);
                return (
                    <FadeG key={i} delay={600 + i * 250}>
                        <circle cx={pos.px} cy={pos.py} r={5} fill={color} stroke="#fff" strokeWidth={2} />
                        <text x={pos.px + 8} y={pos.py - 8} fontSize={9} fill={color} fontWeight="800">
                            ({pt.x},{pt.y % 1 === 0 ? pt.y : pt.y.toFixed(1)})
                        </text>
                    </FadeG>
                );
            })}
            <FadeG delay={200}>
                <text x={12} y={20} fontSize={11} fill={color} fontWeight="900">{label}</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. TwoLinesChart — plots two linear equations (shows intersection)
   ═══════════════════════════════════════════════════════════════════════════ */
export function TwoLinesChart() {
    // x + y = 4 and x - y = 2 → intersection at (3, 1)
    const line1 = { a: 1, b: 1, c: 4, color: '#3b82f6', label: 'x + y = 4' };
    const line2 = { a: 1, b: -1, c: 2, color: '#ef4444', label: 'x − y = 2' };

    const getY = (a, b, c, x) => (c - a * x) / b;
    const drawLine = (eq) => {
        const y1 = getY(eq.a, eq.b, eq.c, -10);
        const y2 = getY(eq.a, eq.b, eq.c, 10);
        return { p1: to(-10, y1), p2: to(10, y2) };
    };

    const l1 = drawLine(line1);
    const l2 = drawLine(line2);
    const intPt = to(3, 1);

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <FadeG delay={300}>
                <line x1={l1.p1.px} y1={l1.p1.py} x2={l1.p2.px} y2={l1.p2.py} stroke={line1.color} strokeWidth={2.5} />
                <text x={12} y={20} fontSize={10} fill={line1.color} fontWeight="900">{line1.label}</text>
            </FadeG>
            <FadeG delay={700}>
                <line x1={l2.p1.px} y1={l2.p1.py} x2={l2.p2.px} y2={l2.p2.py} stroke={line2.color} strokeWidth={2.5} />
                <text x={12} y={34} fontSize={10} fill={line2.color} fontWeight="900">{line2.label}</text>
            </FadeG>
            <FadeG delay={1100}>
                <circle cx={intPt.px} cy={intPt.py} r={7} fill="#10b981" stroke="#fff" strokeWidth={2}>
                    <animate attributeName="r" values="6;9;7" dur="1s" repeatCount="1" />
                </circle>
                <text x={intPt.px + 10} y={intPt.py - 10} fontSize={11} fill="#10b981" fontWeight="900">(3, 1)</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. SolutionSetChart — shows infinite solutions on a line
   ═══════════════════════════════════════════════════════════════════════════ */
export function SolutionSetChart() {
    // 2x + 3y = 12
    const getY = (x) => (12 - 2 * x) / 3;
    const p1 = to(-10, getY(-10)), p2 = to(10, getY(10));
    const sols = [{ x: 0, y: 4 }, { x: 3, y: 2 }, { x: 6, y: 0 }, { x: -3, y: 6 }];

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <FadeG delay={300}>
                <line x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py} stroke="#7c3aed" strokeWidth={2.5} />
                <text x={12} y={20} fontSize={10} fill="#7c3aed" fontWeight="900">2x + 3y = 12</text>
            </FadeG>
            {sols.map((s, i) => {
                const pt = to(s.x, s.y);
                return (
                    <FadeG key={i} delay={600 + i * 300}>
                        <circle cx={pt.px} cy={pt.py} r={5} fill="#7c3aed" stroke="#fff" strokeWidth={2} />
                        <text x={pt.px + 8} y={pt.py - 8} fontSize={9} fill="#7c3aed" fontWeight="800">({s.x},{s.y})</text>
                    </FadeG>
                );
            })}
            <FadeG delay={1800}>
                <text x={S - 12} y={S - 12} textAnchor="end" fontSize={9} fill="#64748b" fontWeight="700">∞ solutions on this line!</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. HorizontalVerticalChart — x = a and y = b lines
   ═══════════════════════════════════════════════════════════════════════════ */
export function HorizontalVerticalChart() {
    const xLine = to(3, 0);
    const yLine = to(0, 4);
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <FadeG delay={300}>
                <line x1={xLine.px} y1={0} x2={xLine.px} y2={S} stroke="#0891b2" strokeWidth={2.5} strokeDasharray="6 3" />
                <text x={xLine.px + 6} y={18} fontSize={10} fill="#0891b2" fontWeight="900">x = 3</text>
            </FadeG>
            <FadeG delay={700}>
                <line x1={0} y1={yLine.py} x2={S} y2={yLine.py} stroke="#d97706" strokeWidth={2.5} strokeDasharray="6 3" />
                <text x={S - 12} y={yLine.py - 8} textAnchor="end" fontSize={10} fill="#d97706" fontWeight="900">y = 4</text>
            </FadeG>
            <FadeG delay={1100}>
                <circle cx={xLine.px} cy={yLine.py} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2}>
                    <animate attributeName="r" values="5;8;6" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <text x={xLine.px + 10} y={yLine.py + 14} fontSize={10} fill="#ef4444" fontWeight="900">(3, 4)</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. StandardFormChart — visualizing ax + by + c = 0
   ═══════════════════════════════════════════════════════════════════════════ */
export function StandardFormChart() {
    // 2x + 3y - 6 = 0 → same as 2x + 3y = 6
    const getY = (x) => (6 - 2 * x) / 3;
    const p1 = to(-5, getY(-5)), p2 = to(8, getY(8));
    const xInt = to(3, 0);
    const yInt = to(0, 2);

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <FadeG delay={300}>
                <line x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py} stroke="#0f766e" strokeWidth={2.5} />
                <text x={12} y={20} fontSize={10} fill="#0f766e" fontWeight="900">2x + 3y − 6 = 0</text>
            </FadeG>
            <FadeG delay={700}>
                <circle cx={xInt.px} cy={xInt.py} r={5} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                <text x={xInt.px + 8} y={xInt.py + 14} fontSize={9} fill="#ef4444" fontWeight="800">x-intercept (3,0)</text>
            </FadeG>
            <FadeG delay={1000}>
                <circle cx={yInt.px} cy={yInt.py} r={5} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                <text x={yInt.px + 8} y={yInt.py - 8} fontSize={9} fill="#3b82f6" fontWeight="800">y-intercept (0,2)</text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. ParallelLinesChart — two parallel lines (no solution)
   ═══════════════════════════════════════════════════════════════════════════ */
export function ParallelLinesEqChart() {
    // x + y = 4 and x + y = 8
    const getY1 = (x) => 4 - x;
    const getY2 = (x) => 8 - x;
    const l1p1 = to(-10, getY1(-10)), l1p2 = to(10, getY1(10));
    const l2p1 = to(-10, getY2(-10)), l2p2 = to(10, getY2(10));

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <FadeG delay={300}>
                <line x1={l1p1.px} y1={l1p1.py} x2={l1p2.px} y2={l1p2.py} stroke="#3b82f6" strokeWidth={2.5} />
                <text x={12} y={20} fontSize={10} fill="#3b82f6" fontWeight="900">x + y = 4</text>
            </FadeG>
            <FadeG delay={700}>
                <line x1={l2p1.px} y1={l2p1.py} x2={l2p2.px} y2={l2p2.py} stroke="#ef4444" strokeWidth={2.5} />
                <text x={12} y={34} fontSize={10} fill="#ef4444" fontWeight="900">x + y = 8</text>
            </FadeG>
            <FadeG delay={1200}>
                <text x={S / 2} y={S - 12} textAnchor="middle" fontSize={10} fill="#64748b" fontWeight="800">
                    Parallel → No intersection!
                </text>
            </FadeG>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. PlottingStepsChart — animated step-by-step line plotting
   ═══════════════════════════════════════════════════════════════════════════ */
export function PlottingStepsChart() {
    const [step, setStep] = useState(0);
    useEffect(() => {
        if (step >= 4) return;
        const t = setTimeout(() => setStep(s => s + 1), 900);
        return () => clearTimeout(t);
    }, [step]);

    // y = 2x - 1 → solutions: (0,-1), (1,1), (2,3), (3,5)
    const sols = [{ x: 0, y: -1 }, { x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 5 }];
    const lineP1 = to(-2, -5), lineP2 = to(5, 9);

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <FadeG delay={0}>
                <text x={12} y={20} fontSize={10} fill="#0f4c81" fontWeight="900">y = 2x − 1</text>
            </FadeG>
            {sols.map((s, i) => {
                if (step < i + 1) return null;
                const pt = to(s.x, s.y);
                return (
                    <FadeG key={i} delay={0}>
                        <circle cx={pt.px} cy={pt.py} r={5} fill="#0f4c81" stroke="#fff" strokeWidth={2}>
                            <animate attributeName="r" values="4;7;5" dur="0.5s" repeatCount="1" />
                        </circle>
                        <text x={pt.px + 8} y={pt.py - 8} fontSize={9} fill="#0f4c81" fontWeight="800">({s.x},{s.y})</text>
                    </FadeG>
                );
            })}
            {step >= 4 && (
                <FadeG delay={0}>
                    <line x1={lineP1.px} y1={lineP1.py} x2={lineP2.px} y2={lineP2.py} stroke="#0f4c81" strokeWidth={2} opacity={0.6} />
                </FadeG>
            )}
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. GraphOfEquationChart — shows y=2x+1 with solution points + line
   ═══════════════════════════════════════════════════════════════════════════ */
export function GraphOfEquationChart() {
    const [step, setStep] = useState(0);
    useEffect(() => {
        if (step >= 5) return;
        const t = setTimeout(() => setStep(s => s + 1), 700);
        return () => clearTimeout(t);
    }, [step]);

    const sols = [{ x: -1, y: -1 }, { x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 5 }];
    const lineP1 = to(-4, -7), lineP2 = to(5, 11);

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <FadeG delay={0}>
                <text x={12} y={20} fontSize={11} fill="#7c3aed" fontWeight="900">y = 2x + 1</text>
            </FadeG>
            {sols.map((s, i) => {
                if (step < i + 1) return null;
                const pt = to(s.x, s.y);
                return (
                    <FadeG key={i} delay={0}>
                        <line x1={pt.px} y1={MID} x2={pt.px} y2={pt.py} stroke="#7c3aed" strokeWidth={0.8} strokeDasharray="3 2" opacity={0.4} />
                        <line x1={MID} y1={pt.py} x2={pt.px} y2={pt.py} stroke="#7c3aed" strokeWidth={0.8} strokeDasharray="3 2" opacity={0.4} />
                        <circle cx={pt.px} cy={pt.py} r={6} fill="#7c3aed" stroke="#fff" strokeWidth={2}>
                            <animate attributeName="r" values="4;8;6" dur="0.6s" repeatCount="1" />
                        </circle>
                        <text x={pt.px + 9} y={pt.py - 9} fontSize={9} fill="#7c3aed" fontWeight="800">
                            ({s.x},{s.y})
                        </text>
                    </FadeG>
                );
            })}
            {step >= 5 && (
                <FadeG delay={0}>
                    <line x1={lineP1.px} y1={lineP1.py} x2={lineP2.px} y2={lineP2.py} stroke="#7c3aed" strokeWidth={2.5} opacity={0.7} />
                    <text x={S - 12} y={S - 16} textAnchor="end" fontSize={9} fill="#64748b" fontWeight="700">
                        Every point on this line is a solution!
                    </text>
                </FadeG>
            )}
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. OrderedPairChart — shows points in all 4 quadrants with labels
   ═══════════════════════════════════════════════════════════════════════════ */
export function OrderedPairChart() {
    const points = [
        { x: 4, y: 3, label: '(4, 3)', color: '#3b82f6', quadrant: 'I' },
        { x: -3, y: 5, label: '(−3, 5)', color: '#10b981', quadrant: 'II' },
        { x: -4, y: -3, label: '(−4, −3)', color: '#f59e0b', quadrant: 'III' },
        { x: 3, y: -4, label: '(3, −4)', color: '#ef4444', quadrant: 'IV' },
        { x: 0, y: 0, label: 'O (0,0)', color: '#0f172a', quadrant: '' },
    ];

    const quadLabels = [
        { text: 'Q I (+,+)', x: S - 40, y: 30, color: '#3b82f6' },
        { text: 'Q II (−,+)', x: 8, y: 30, color: '#10b981' },
        { text: 'Q III (−,−)', x: 8, y: S - 16, color: '#f59e0b' },
        { text: 'Q IV (+,−)', x: S - 40, y: S - 16, color: '#ef4444' },
    ];

    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <BaseGrid />
            <rect x={MID} y={0} width={MID} height={MID} fill="#3b82f6" opacity={0.03} />
            <rect x={0} y={0} width={MID} height={MID} fill="#10b981" opacity={0.03} />
            <rect x={0} y={MID} width={MID} height={MID} fill="#f59e0b" opacity={0.03} />
            <rect x={MID} y={MID} width={MID} height={MID} fill="#ef4444" opacity={0.03} />
            {quadLabels.map((ql, i) => (
                <FadeG key={i} delay={200 + i * 150}>
                    <text x={ql.x} y={ql.y} fontSize={8} fill={ql.color} fontWeight="800" opacity={0.7}>{ql.text}</text>
                </FadeG>
            ))}
            {points.map((pt, i) => {
                const pos = to(pt.x, pt.y);
                return (
                    <FadeG key={i} delay={600 + i * 350}>
                        {pt.x !== 0 && pt.y !== 0 && (
                            <>
                                <line x1={pos.px} y1={MID} x2={pos.px} y2={pos.py} stroke={pt.color} strokeWidth={0.8} strokeDasharray="3 2" opacity={0.5} />
                                <line x1={MID} y1={pos.py} x2={pos.px} y2={pos.py} stroke={pt.color} strokeWidth={0.8} strokeDasharray="3 2" opacity={0.5} />
                            </>
                        )}
                        <circle cx={pos.px} cy={pos.py} r={pt.x === 0 && pt.y === 0 ? 4 : 6} fill={pt.color} stroke="#fff" strokeWidth={2}>
                            <animate attributeName="r" values="4;8;6" dur="0.5s" repeatCount="1" />
                        </circle>
                        <text
                            x={pos.px + (pt.x >= 0 ? 9 : -9)}
                            y={pos.py + (pt.y >= 0 ? -9 : 14)}
                            textAnchor={pt.x >= 0 ? 'start' : 'end'}
                            fontSize={9} fill={pt.color} fontWeight="800"
                        >
                            {pt.label}
                        </text>
                    </FadeG>
                );
            })}
        </svg>
    );
}
