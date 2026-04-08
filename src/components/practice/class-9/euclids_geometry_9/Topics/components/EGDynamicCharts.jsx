import React, { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   EGDynamicCharts — Pure SVG animated illustrations for Euclid's Geometry
   ═══════════════════════════════════════════════════════════════════════════ */

const S = 260;
const MID = S / 2;

const FadeG = ({ delay = 0, children, ...rest }) => {
    const [vis, setVis] = useState(false);
    useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
    return <g style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s ease' }} {...rest}>{children}</g>;
};

/* 1. PointLineSurfaceChart (Definitions) */
export function PointLineSurfaceChart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            {/* Point */}
            <FadeG delay={200}>
                <circle cx={40} cy={40} r={4} fill="#0f4c81" />
                <text x={50} y={44} fontSize={10} fill="#0f4c81" fontWeight="800">Point (no part)</text>
            </FadeG>
            {/* Line */}
            <FadeG delay={800}>
                <line x1={40} y1={90} x2={220} y2={90} stroke="#b71c1c" strokeWidth={2.5} />
                <circle cx={40} cy={90} r={4} fill="#b71c1c" />
                <circle cx={220} cy={90} r={4} fill="#b71c1c" />
                <text x={130} y={80} textAnchor="middle" fontSize={10} fill="#b71c1c" fontWeight="800">Line (breadthless length)</text>
                <text x={40} y={108} textAnchor="middle" fontSize={9} fill="#475569">End is Point</text>
            </FadeG>
            {/* Surface */}
            <FadeG delay={1400}>
                <path d="M 60 160 L 200 160 L 220 220 L 40 220 Z" fill="#10b981" fillOpacity={0.2} stroke="#10b981" strokeWidth={2} />
                <text x={130} y={195} textAnchor="middle" fontSize={10} fill="#047857" fontWeight="800">Plane Surface</text>
                <text x={130} y={150} textAnchor="middle" fontSize={9} fill="#475569">Edges are Lines</text>
            </FadeG>
        </svg>
    );
}

/* 2. CoincideAxiomChart (Axiom 4) */
export function CoincideAxiomChart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            {/* Shape A */}
            <FadeG delay={200}>
                <rect x={40} y={60} width={80} height={80} fill="#3b82f6" opacity={0.6} />
                <text x={80} y={105} textAnchor="middle" fontSize={12} fill="#fff" fontWeight="800">A</text>
            </FadeG>
            {/* Shape B moving to A */}
            <FadeG delay={1000}>
                <rect x={160} y={100} width={80} height={80} fill="#ef4444" opacity={0.6}>
                    <animate attributeName="x" values="160;40;40;160" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="y" values="100;60;60;100" dur="4s" repeatCount="indefinite" />
                </rect>
            </FadeG>
            <FadeG delay={1500}>
                <text x={MID} y={220} textAnchor="middle" fontSize={11} fill="#475569" fontWeight="800">
                    If they coincide perfectly, A = B
                </text>
            </FadeG>
        </svg>
    );
}

/* 3. WholePartAxiomChart (Axiom 5) */
export function WholePartAxiomChart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <FadeG delay={200}>
                <line x1={40} y1={100} x2={220} y2={100} stroke="#3b82f6" strokeWidth={8} strokeLinecap="round" />
                <text x={130} y={80} textAnchor="middle" fontSize={11} fill="#3b82f6" fontWeight="800">Whole Segment (A to C)</text>
            </FadeG>
            <FadeG delay={1000}>
                <line x1={40} y1={140} x2={120} y2={140} stroke="#ef4444" strokeWidth={8} strokeLinecap="round" />
                <text x={80} y={165} textAnchor="middle" fontSize={10} fill="#ef4444" fontWeight="800">Part (A to B)</text>
                <line x1={40} y1={85} x2={40} y2={155} stroke="#64748b" strokeWidth={1} strokeDasharray="4 2" />
                <line x1={120} y1={85} x2={120} y2={155} stroke="#64748b" strokeWidth={1} strokeDasharray="4 2" />
            </FadeG>
            <FadeG delay={1800}>
                <text x={MID} y={220} textAnchor="middle" fontSize={11} fill="#475569" fontWeight="800">
                    Whole &gt; Part
                </text>
            </FadeG>
        </svg>
    );
}

/* 4. Postulate1Chart */
export function Postulate1Chart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <FadeG delay={200}>
                <circle cx={60} cy={180} r={5} fill="#6366f1" />
                <text x={60} y={200} textAnchor="middle" fontSize={11} fill="#6366f1" fontWeight="800">Point P</text>
            </FadeG>
            <FadeG delay={800}>
                <circle cx={200} cy={60} r={5} fill="#d946ef" />
                <text x={200} y={50} textAnchor="middle" fontSize={11} fill="#d946ef" fontWeight="800">Point Q</text>
            </FadeG>
            <FadeG delay={1400}>
                <line x1={60} y1={180} x2={200} y2={60} stroke="#10b981" strokeWidth={3} strokeDasharray="200" strokeDashoffset="200">
                    <animate attributeName="stroke-dashoffset" values="200;0" dur="1s" fill="freeze" />
                </line>
            </FadeG>
        </svg>
    );
}

/* 5. Postulate2Chart */
export function Postulate2Chart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <FadeG delay={200}>
                <line x1={80} y1={MID} x2={180} y2={MID} stroke="#3b82f6" strokeWidth={4} />
                <circle cx={80} cy={MID} r={5} fill="#1e40af" />
                <circle cx={180} cy={MID} r={5} fill="#1e40af" />
                <text x={130} y={MID - 15} textAnchor="middle" fontSize={11} fill="#1e40af" fontWeight="800">Terminated Line</text>
            </FadeG>
            <FadeG delay={1200}>
                <line x1={20} y1={MID} x2={80} y2={MID} stroke="#3b82f6" strokeWidth={2} strokeDasharray="6 4" />
                <line x1={180} y1={MID} x2={240} y2={MID} stroke="#3b82f6" strokeWidth={2} strokeDasharray="6 4" />
                <polygon points="10,130 20,125 20,135" fill="#3b82f6" />
                <polygon points="250,130 240,125 240,135" fill="#3b82f6" />
                <text x={130} y={MID + 24} textAnchor="middle" fontSize={10} fill="#64748b" fontWeight="800">Produced Indefinitely</text>
            </FadeG>
        </svg>
    );
}

/* 6. Postulate3Chart */
export function Postulate3Chart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <FadeG delay={200}>
                <circle cx={MID} cy={MID} r={4} fill="#b71c1c" />
                <text x={MID} y={MID + 16} textAnchor="middle" fontSize={10} fill="#b71c1c" fontWeight="900">Centre</text>
            </FadeG>
            <FadeG delay={1000}>
                <line x1={MID} y1={MID} x2={MID + 60} y2={MID} stroke="#eab308" strokeWidth={3}>
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${MID} ${MID}`} to={`360 ${MID} ${MID}`} dur="4s" repeatCount="indefinite" />
                </line>
                <text x={MID + 30} y={MID - 8} textAnchor="middle" fontSize={10} fill="#eab308" fontWeight="800">Radius</text>
            </FadeG>
            <FadeG delay={1500}>
                <circle cx={MID} cy={MID} r={60} fill="none" stroke="#eab308" strokeWidth={2} strokeDasharray="3 3" />
            </FadeG>
        </svg>
    );
}

/* 7. Postulate4Chart */
export function Postulate4Chart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            {/* First right angle */}
            <FadeG delay={200}>
                <g transform="translate(60, 100)">
                    <line x1={0} y1={0} x2={60} y2={0} stroke="#3b82f6" strokeWidth={3} strokeLinecap="round" />
                    <line x1={0} y1={0} x2={0} y2={-60} stroke="#3b82f6" strokeWidth={3} strokeLinecap="round" />
                    <rect x={0} y={-15} width={15} height={15} fill="none" stroke="#ef4444" strokeWidth={2} />
                    <text x={10} y={20} fontSize={10} fill="#475569" fontWeight="800">90°</text>
                </g>
            </FadeG>
            {/* Second right angle (rotated and larger lines but same angle) */}
            <FadeG delay={1000}>
                <g transform="translate(180, 160) rotate(45)">
                    <line x1={0} y1={0} x2={80} y2={0} stroke="#10b981" strokeWidth={3} strokeLinecap="round" />
                    <line x1={0} y1={0} x2={0} y2={-80} stroke="#10b981" strokeWidth={3} strokeLinecap="round" />
                    <rect x={0} y={-15} width={15} height={15} fill="none" stroke="#ef4444" strokeWidth={2} />
                    <text x={35} y={-10} transform="rotate(-45)" fontSize={10} fill="#475569" fontWeight="800">90°</text>
                </g>
            </FadeG>
            <FadeG delay={1800}>
                <text x={MID} y={240} textAnchor="middle" fontSize={12} fill="#ef4444" fontWeight="800">Always Equal</text>
            </FadeG>
        </svg>
    );
}

/* 8. Postulate5Chart */
export function Postulate5Chart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            {/* Transversal Line */}
            <FadeG delay={200}>
                <line x1={70} y1={20} x2={70} y2={240} stroke="#0f172a" strokeWidth={3} />
                <text x={70} y={15} textAnchor="middle" fontSize={11} fill="#0f172a" fontWeight="800">Transversal</text>
            </FadeG>
            {/* Two straight lines falling inwards on the right side */}
            <FadeG delay={800}>
                <line x1={-10} y1={70} x2={190} y2={100} stroke="#3b82f6" strokeWidth={3} />
                <line x1={-10} y1={210} x2={190} y2={170} stroke="#3b82f6" strokeWidth={3} />
            </FadeG>
            {/* Angles on the right side (where they intersect eventually) */}
            <FadeG delay={1600}>
                {/* Angle 1 (Top right interior) */}
                <path d="M 70 78 A 20 20 0 0 1 85 84" fill="none" stroke="#ef4444" strokeWidth={3} />
                <text x={82} y={75} fontSize={10} fill="#ef4444" fontWeight="800">∠1</text>
                
                {/* Angle 2 (Bottom right interior) */}
                <path d="M 90 188 A 20 20 0 0 1 70 193" fill="none" stroke="#ef4444" strokeWidth={3} />
                <text x={82} y={204} fontSize={10} fill="#ef4444" fontWeight="800">∠2</text>
                
                <text x={120} y={145} fontSize={12} fill="#ef4444" fontWeight="800">∠1 + ∠2 &lt; 180°</text>
            </FadeG>
            {/* Meeting point extension */}
            <FadeG delay={2400}>
                <line x1={190} y1={100} x2={240} y2={107.5} stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                <line x1={190} y1={170} x2={240} y2={160} stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                <text x={180} y={120} fontSize={10} fill="#10b981" fontWeight="800">Lines meet</text>
                <text x={180} y={135} fontSize={10} fill="#10b981" fontWeight="800">on this side!→</text>
            </FadeG>
        </svg>
    );
}

/* 8. EquivVersionsChart (Playfair's Axiom) */
export function EquivVersionsChart() {
    return (
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display: 'block', maxWidth: '100%' }}>
            <FadeG delay={200}>
                <line x1={30} y1={150} x2={230} y2={150} stroke="#1f2937" strokeWidth={3} />
                <text x={230} y={170} textAnchor="end" fontSize={11} fill="#1f2937" fontWeight="800">Line L</text>
            </FadeG>
            <FadeG delay={800}>
                <circle cx={130} cy={90} r={5} fill="#b71c1c" />
                <text x={130} y={70} textAnchor="middle" fontSize={11} fill="#b71c1c" fontWeight="800">Point P (not on L)</text>
            </FadeG>
            <FadeG delay={1600}>
                <line x1={40} y1={90} x2={220} y2={90} stroke="#10b981" strokeWidth={3} />
                <text x={40} y={105} fontSize={10} fill="#10b981" fontWeight="800">Unique Parallel Line M</text>
            </FadeG>
            <FadeG delay={2200}>
                {/* Invalid passing lines */}
                <line x1={80} y1={60} x2={180} y2={120} stroke="#9ca3af" strokeWidth={1} strokeDasharray="4 2" />
                <line x1={100} y1={50} x2={160} y2={130} stroke="#9ca3af" strokeWidth={1} strokeDasharray="4 2" />
                <line x1={180} y1={60} x2={80} y2={120} stroke="#9ca3af" strokeWidth={1} strokeDasharray="4 2" />
            </FadeG>
        </svg>
    );
}
