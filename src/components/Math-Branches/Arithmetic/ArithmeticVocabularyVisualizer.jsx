import React from 'react';
import { motion } from 'framer-motion';
import SkillSparkEmbed from '../../common/SkillSparkEmbed';

/* ──────────────── SVG-based Number Line ──────────────── */
function NumberLineSVG({ domainMin, domainMax, highlightRanges = [], markers = [], accentColor, fractionTicks = [] }) {
    const totalRange = domainMax - domainMin;
    const xOf = (val) => 30 + (540 / totalRange) * (val - domainMin);

    return (
        <div style={{ width: '100%', padding: '10px 0', overflow: 'hidden' }}>
            <svg width="100%" height="100" viewBox="0 0 600 100" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                {/* Arrow heads */}
                <defs>
                    <marker id="arrowR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <path d="M0,0 L8,3 L0,6" fill="#94a3b8" />
                    </marker>
                    <marker id="arrowL" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                        <path d="M8,0 L0,3 L8,6" fill="#94a3b8" />
                    </marker>
                </defs>

                {/* Main axis */}
                <line x1="15" y1="50" x2="585" y2="50" stroke="#cbd5e1" strokeWidth="3" markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />

                {/* Highlighted segments */}
                {highlightRanges.map((range, idx) => {
                    const x1 = xOf(range[0]);
                    const x2 = xOf(range[1]);
                    return (
                        <motion.rect
                            key={`h-${idx}`}
                            initial={{ width: 0 }}
                            animate={{ width: Math.abs(x2 - x1) }}
                            transition={{ type: 'spring', bounce: 0.3, duration: 1 }}
                            x={Math.min(x1, x2)} y="46" height="8" rx="4"
                            fill={accentColor} style={{ opacity: 0.35 }}
                        />
                    );
                })}

                {/* Integer ticks */}
                {Array.from({ length: totalRange + 1 }).map((_, i) => {
                    const val = domainMin + i;
                    const x = xOf(val);
                    let isHighlighted = false;
                    highlightRanges.forEach(r => { if (val >= r[0] && val <= r[1]) isHighlighted = true; });

                    return (
                        <g key={val}>
                            <line x1={x} y1="40" x2={x} y2="60"
                                stroke={val === 0 ? '#475569' : (isHighlighted ? accentColor : '#cbd5e1')}
                                strokeWidth={val === 0 ? 3 : 1.5}
                            />
                            <text x={x} y="80"
                                fill={isHighlighted ? accentColor : '#64748b'}
                                fontSize="14" fontWeight={val === 0 || isHighlighted ? 'bold' : 'normal'}
                                textAnchor="middle" fontFamily='"Outfit", sans-serif'
                            >
                                {val}
                            </text>
                        </g>
                    );
                })}

                {/* Fraction ticks (between integers) */}
                {fractionTicks.map((ft, idx) => {
                    const x = xOf(ft.val);
                    return (
                        <motion.g key={`ft-${idx}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.15 }}>
                            <line x1={x} y1="43" x2={x} y2="57" stroke={accentColor} strokeWidth="2" strokeDasharray="3,2" />
                            <text x={x} y="22" fill={accentColor} fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily='"Outfit", sans-serif'>
                                {ft.label}
                            </text>
                        </motion.g>
                    );
                })}

                {/* Point markers — stagger labels when close */}
                {markers.map((marker, idx) => {
                    const x = xOf(marker.val);
                    const labelY = idx % 2 === 0 ? 15 : 5;
                    return (
                        <motion.g key={`m-${idx}`} initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.15 * idx }}>
                            <circle cx={x} cy="50" r="8" fill={accentColor} />
                            <text x={x} y={labelY} fill={accentColor} fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily='"Outfit", sans-serif'>
                                {marker.label}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
}

/* ──────────────── Percentage Grid ──────────────── */
function PercentageGrid({ percent, accentColor }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '10px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 3, width: 'fit-content' }}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.005, type: 'spring', stiffness: 300 }}
                        style={{
                            width: 24, height: 24, borderRadius: 4,
                            background: i < percent ? accentColor : '#f1f5f9',
                            border: `1.5px solid ${i < percent ? accentColor : '#e2e8f0'}`,
                            opacity: i < percent ? 1 : 0.5
                        }}
                    />
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: '"Outfit", sans-serif' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: accentColor }}>{percent}%</div>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>=&nbsp;{percent}/100&nbsp;=&nbsp;{percent/100}</div>
            </div>
        </div>
    );
}

/* ──────────────── Equivalent Fractions Visual ──────────────── */
function EquivalentFractionsVisual({ accentColor }) {
    const fractions = [
        { num: 1, den: 2 },
        { num: 2, den: 4 },
        { num: 5, den: 10 }
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '10px 0' }}>
            {fractions.map((f, idx) => (
                <motion.div key={idx}
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.25, type: 'spring' }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, width: '90%', maxWidth: 420 }}>
                    <div style={{ minWidth: 50, textAlign: 'center', fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: 18, color: accentColor }}>
                        {f.num}/{f.den}
                    </div>
                    <div style={{ display: 'flex', gap: 2, flex: 1 }}>
                        {Array.from({ length: f.den }).map((_, i) => (
                            <div key={i} style={{
                                flex: 1, height: 32, borderRadius: 4,
                                background: i < f.num ? accentColor : '#e2e8f0',
                                border: `1.5px solid ${i < f.num ? accentColor : '#cbd5e1'}`,
                                opacity: i < f.num ? 1 : 0.4
                            }} />
                        ))}
                    </div>
                    {idx < fractions.length - 1 && (
                        <div style={{ position: 'absolute', right: -20, fontSize: 18, color: '#94a3b8' }}></div>
                    )}
                </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <div style={{ background: accentColor, color: '#fff', padding: '4px 14px', borderRadius: 100, fontSize: 13, fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}>
                    ALL EQUAL = 0.5
                </div>
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600, fontFamily: '"Outfit", sans-serif' }}>Same shaded area!</span>
            </motion.div>
        </div>
    );
}

/* ──────────────── Fraction Bar Visual ──────────────── */
function FractionBarVisual({ numerator, denominator, accentColor }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '10px 0' }}>
            <div style={{ display: 'flex', gap: 3, width: '80%', maxWidth: 400 }}>
                {Array.from({ length: denominator }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.08, type: 'spring' }}
                        style={{
                            flex: 1, height: 44, borderRadius: 6,
                            background: i < numerator ? accentColor : '#e2e8f0',
                            border: `2px solid ${i < numerator ? accentColor : '#cbd5e1'}`,
                            opacity: i < numerator ? 1 : 0.5
                        }}
                    />
                ))}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#64748b', fontFamily: '"Outfit", sans-serif' }}>
                <span style={{ color: accentColor, fontWeight: 900 }}>{numerator}</span> out of <span style={{ fontWeight: 900 }}>{denominator}</span> parts shaded
            </div>
        </div>
    );
}

/* ──────────────── L-Shape Division Visual ──────────────── */
function LShapeDivision({ numbers, accentColor }) {
    // Demonstrates the L-shape (division method) for LCM/HCF
    const steps = [
        { divisor: 2, results: numbers.map(n => n / 2) },
        { divisor: 3, results: numbers.map(n => n / 6) },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ border: `3px solid ${accentColor}`, borderRight: 'none', borderTop: 'none', padding: '8px 20px 8px 8px', borderRadius: '0 0 0 12px', display: 'inline-flex', flexDirection: 'column', gap: 6 }}>
                {/* Header row with original numbers */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 32, fontWeight: 900, color: accentColor, fontSize: 18, textAlign: 'center', borderRight: `2px solid ${accentColor}`, paddingRight: 12 }}>÷</div>
                    {numbers.map((n, i) => (
                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 * i }}
                            style={{ width: 40, textAlign: 'center', fontWeight: 800, fontSize: 18, color: '#1e293b' }}>
                            {n}
                        </motion.div>
                    ))}
                </div>
                <div style={{ borderTop: `2px solid ${accentColor}`, width: '100%' }} />
                {/* Division steps */}
                {steps.filter(s => s.results.every(r => Number.isInteger(r) && r > 0)).map((step, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.3 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 32, fontWeight: 900, color: accentColor, fontSize: 16, textAlign: 'center', borderRight: `2px solid ${accentColor}`, paddingRight: 12 }}>
                            {step.divisor}
                        </div>
                        {step.results.map((r, i) => (
                            <div key={i} style={{ width: 40, textAlign: 'center', fontWeight: 700, fontSize: 16, color: '#475569' }}>{r}</div>
                        ))}
                    </motion.div>
                ))}
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, marginTop: 6 }}>L-Shape Division Method</div>
        </div>
    );
}

/* ──────────────── Factor Tree Visual (SVG) ──────────────── */
function FactorTree({ number, accentColor }) {
    const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false; return true; };

    // Preset node layouts: { val, x, y, parentIdx }
    const layouts = {
        60: [
            { val: 60, x: 200, y: 30 },
            { val: 2,  x: 120, y: 100, parentIdx: 0 },
            { val: 30, x: 280, y: 100, parentIdx: 0 },
            { val: 2,  x: 210, y: 170, parentIdx: 2 },
            { val: 15, x: 350, y: 170, parentIdx: 2 },
            { val: 3,  x: 290, y: 240, parentIdx: 4 },
            { val: 5,  x: 410, y: 240, parentIdx: 4 },
        ],
        12: [
            { val: 12, x: 200, y: 30 },
            { val: 2,  x: 120, y: 110, parentIdx: 0 },
            { val: 6,  x: 280, y: 110, parentIdx: 0 },
            { val: 2,  x: 210, y: 190, parentIdx: 2 },
            { val: 3,  x: 350, y: 190, parentIdx: 2 },
        ],
        18: [
            { val: 18, x: 200, y: 30 },
            { val: 2,  x: 120, y: 110, parentIdx: 0 },
            { val: 9,  x: 280, y: 110, parentIdx: 0 },
            { val: 3,  x: 210, y: 190, parentIdx: 2 },
            { val: 3,  x: 350, y: 190, parentIdx: 2 },
        ],
        48: [
            { val: 48, x: 220, y: 25 },
            { val: 2,  x: 120, y: 85, parentIdx: 0 },
            { val: 24, x: 320, y: 85, parentIdx: 0 },
            { val: 2,  x: 240, y: 145, parentIdx: 2 },
            { val: 12, x: 400, y: 145, parentIdx: 2 },
            { val: 2,  x: 340, y: 205, parentIdx: 4 },
            { val: 6,  x: 440, y: 205, parentIdx: 4 },
            { val: 2,  x: 390, y: 265, parentIdx: 6 },
            { val: 3,  x: 490, y: 265, parentIdx: 6 },
        ],
    };

    const nodes = layouts[number];
    if (!nodes) return <div style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>Factor tree for {number}</div>;

    const maxY = Math.max(...nodes.map(n => n.y));
    const svgH = maxY + 55;
    const r = 22;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0' }}>
            <svg width="100%" height={svgH} viewBox={`0 0 520 ${svgH}`} preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible', maxWidth: 420 }}>
                {/* Connecting lines (drawn first, behind nodes) */}
                {nodes.map((node, idx) => {
                    if (node.parentIdx === undefined) return null;
                    const parent = nodes[node.parentIdx];
                    return (
                        <motion.line key={`line-${idx}`}
                            x1={parent.x} y1={parent.y + r} x2={node.x} y2={node.y - r}
                            stroke="#cbd5e1" strokeWidth="2.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ delay: idx * 0.15, duration: 0.3 }}
                        />
                    );
                })}
                {/* Nodes */}
                {nodes.map((node, idx) => {
                    const prime = isPrime(node.val);
                    return (
                        <motion.g key={`n-${idx}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.15 + 0.1, type: 'spring', stiffness: 200 }}>
                            <circle cx={node.x} cy={node.y} r={r}
                                fill={prime ? accentColor : '#f8fafc'}
                                stroke={prime ? accentColor : '#e2e8f0'} strokeWidth="2.5"
                            />
                            <text x={node.x} y={node.y + 6}
                                fill={prime ? '#fff' : '#1e293b'}
                                fontSize="16" fontWeight="800" textAnchor="middle"
                                fontFamily='"Outfit", sans-serif'>
                                {node.val}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>
            <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>
                Factor Tree of {number} — <span style={{ color: accentColor, fontWeight: 800 }}>colored = prime</span>
            </div>
        </div>
    );
}

/* ──────────────── Circle Visualization (for π) ──────────────── */
function CircleVisualization({ accentColor }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '10px 0' }}>
            <svg width="130" height="130" viewBox="0 0 130 130">
                <motion.circle cx="65" cy="65" r="55" fill="none" stroke={accentColor} strokeWidth="3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                />
                <motion.line x1="65" y1="65" x2="120" y2="65" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                />
                <text x="90" y="58" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily='"Outfit", sans-serif'>r</text>
                <motion.line x1="10" y1="65" x2="120" y2="65" stroke="#3b82f6" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                />
                <text x="60" y="82" fill="#3b82f6" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily='"Outfit", sans-serif'>d</text>
            </svg>
            <div style={{ fontFamily: '"Outfit", sans-serif', fontSize: 14, color: '#475569', lineHeight: 1.8 }}>
                <div><span style={{ fontWeight: 800, color: accentColor }}>π</span> = Circumference ÷ Diameter</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: accentColor }}>≈ 3.14159...</div>
            </div>
        </div>
    );
}

/* ──────────────── Exponential Growth (for e) ──────────────── */
function ExponentialGrowthVisual({ accentColor }) {
    const points = Array.from({ length: 8 }).map((_, i) => ({ x: i, y: Math.exp(i * 0.4) }));
    const maxY = Math.max(...points.map(p => p.y));
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '10px 0' }}>
            <svg width="200" height="100" viewBox="0 0 200 100">
                {points.map((p, i) => {
                    if (i === 0) return null;
                    const prev = points[i - 1];
                    return (
                        <motion.line key={i}
                            x1={20 + prev.x * 22} y1={90 - (prev.y / maxY) * 75}
                            x2={20 + p.x * 22} y2={90 - (p.y / maxY) * 75}
                            stroke={accentColor} strokeWidth="2.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ delay: i * 0.15, duration: 0.3 }}
                        />
                    );
                })}
                <line x1="20" y1="90" x2="190" y2="90" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="20" y1="10" x2="20" y2="90" stroke="#cbd5e1" strokeWidth="1" />
            </svg>
            <div style={{ fontFamily: '"Outfit", sans-serif', fontSize: 14, color: '#475569', lineHeight: 1.8 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: accentColor }}>e ≈ 2.71828...</div>
                <div>Exponential growth curve</div>
            </div>
        </div>
    );
}

/* ──────────────── Main Switch ──────────────── */
export default function ArithmeticVocabularyVisualizer({ visualType, accentColor = '#3b82f6' }) {
    if (!visualType) return null;

    switch (visualType) {
        /* ─── Natural Numbers ─── */
        case 'NumberLine-NaturalFull':
            return <NumberLineSVG domainMin={0} domainMax={10} highlightRanges={[[1, 10]]} markers={[]} accentColor={accentColor} />;
        case 'NumberLine-Even':
            return <NumberLineSVG domainMin={0} domainMax={12} highlightRanges={[]} markers={[{val:2,label:'2'},{val:4,label:'4'},{val:6,label:'6'},{val:8,label:'8'},{val:10,label:'10'},{val:12,label:'12'}]} accentColor={accentColor} />;
        case 'NumberLine-Odd':
            return <NumberLineSVG domainMin={0} domainMax={11} highlightRanges={[]} markers={[{val:1,label:'1'},{val:3,label:'3'},{val:5,label:'5'},{val:7,label:'7'},{val:9,label:'9'},{val:11,label:'11'}]} accentColor={accentColor} />;
        case 'NumberLine-Prime':
            return <NumberLineSVG domainMin={0} domainMax={15} highlightRanges={[]} markers={[{val:2,label:'2'},{val:3,label:'3'},{val:5,label:'5'},{val:7,label:'7'},{val:11,label:'11'},{val:13,label:'13'}]} accentColor={accentColor} />;
        case 'NumberLine-Composite':
            return <NumberLineSVG domainMin={0} domainMax={15} highlightRanges={[]} markers={[{val:4,label:'4'},{val:6,label:'6'},{val:8,label:'8'},{val:9,label:'9'},{val:10,label:'10'},{val:12,label:'12'}]} accentColor={accentColor} />;
        case 'NumberLine-Successor':
            return <NumberLineSVG domainMin={13} domainMax={18} highlightRanges={[]} markers={[{val:15,label:'n = 15'},{val:16,label:'n+1 = 16'}]} accentColor={accentColor} />;
        case 'NumberLine-Predecessor':
            return <NumberLineSVG domainMin={7} domainMax={12} highlightRanges={[]} markers={[{val:10,label:'n = 10'},{val:9,label:'n−1 = 9'}]} accentColor={accentColor} />;

        /* ─── Integers ─── */
        case 'NumberLine-Full':
            return <NumberLineSVG domainMin={-5} domainMax={5} highlightRanges={[[-5, 5]]} markers={[]} accentColor={accentColor} />;
        case 'NumberLine-Positive':
            return <NumberLineSVG domainMin={-5} domainMax={5} highlightRanges={[[1, 5]]} markers={[]} accentColor={accentColor} />;
        case 'NumberLine-Negative':
            return <NumberLineSVG domainMin={-5} domainMax={5} highlightRanges={[[-5, -1]]} markers={[]} accentColor={accentColor} />;
        case 'NumberLine-Zero':
            return <NumberLineSVG domainMin={-5} domainMax={5} highlightRanges={[]} markers={[{val:0,label:'Origin'}]} accentColor={accentColor} />;
        case 'NumberLine-Absolute':
            return <NumberLineSVG domainMin={-6} domainMax={6} highlightRanges={[]} markers={[{val:-5,label:'|−5| = 5'},{val:5,label:'|5| = 5'}]} accentColor={accentColor} />;
        case 'NumberLine-Opposite':
            return <NumberLineSVG domainMin={-8} domainMax={8} highlightRanges={[]} markers={[{val:-7,label:'−7'},{val:7,label:'+7'}]} accentColor={accentColor} />;

        /* ─── Fractions ─── */
        case 'Spark-FractionSharing':
            return <SkillSparkEmbed spark="fractions-sharing" mini={true} height={380} />;
        case 'FractionBar-3-4':
            return <FractionBarVisual numerator={3} denominator={4} accentColor={accentColor} />;
        case 'FractionBar-Numerator':
            return <FractionBarVisual numerator={5} denominator={8} accentColor={accentColor} />;
        case 'FractionBar-Denominator':
            return <FractionBarVisual numerator={5} denominator={8} accentColor={accentColor} />;
        case 'FractionBar-Proper':
            return <FractionBarVisual numerator={1} denominator={2} accentColor={accentColor} />;
        case 'FractionBar-Improper':
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <FractionBarVisual numerator={4} denominator={4} accentColor={accentColor} />
                    <FractionBarVisual numerator={1} denominator={4} accentColor="#f59e0b" />
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, fontFamily: '"Outfit", sans-serif' }}>5/4 = 1 whole + 1/4 extra</div>
                </div>
            );
        case 'FractionBar-Mixed':
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <FractionBarVisual numerator={4} denominator={4} accentColor={accentColor} />
                    <FractionBarVisual numerator={1} denominator={4} accentColor="#8b5cf6" />
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, fontFamily: '"Outfit", sans-serif' }}>1¼ = one whole + one quarter</div>
                </div>
            );
        case 'NumberLine-Equivalent':
            return <EquivalentFractionsVisual accentColor={accentColor} />;

        /* ─── Rational Numbers ─── */
        case 'NumberLine-Rational':
            return <NumberLineSVG domainMin={-2} domainMax={3} highlightRanges={[[-2,3]]}
                fractionTicks={[{val:0.5,label:'½'},{val:-0.5,label:'-½'},{val:1.5,label:'1.5'},{val:2.25,label:'2¼'}]}
                markers={[]} accentColor={accentColor} />;
        case 'NumberLine-Quotient':
            return <NumberLineSVG domainMin={0} domainMax={10} highlightRanges={[]} markers={[{val:5,label:'10÷2=5'}]} accentColor={accentColor} />;
        case 'NumberLine-Terminating':
            return <NumberLineSVG domainMin={0} domainMax={1} highlightRanges={[]}
                fractionTicks={[{val:0.25,label:'0.25'},{val:0.5,label:'0.5'},{val:0.75,label:'0.75'}]}
                markers={[]} accentColor={accentColor} />;
        case 'NumberLine-Repeating':
            return <NumberLineSVG domainMin={0} domainMax={1} highlightRanges={[]}
                fractionTicks={[{val:0.333,label:'0.3̄'},{val:0.667,label:'0.6̄'}]}
                markers={[]} accentColor={accentColor} />;
        case 'NumberLine-Percentage':
            return <PercentageGrid percent={50} accentColor={accentColor} />;
        case 'NumberLine-Reciprocal':
            return <NumberLineSVG domainMin={0} domainMax={3} highlightRanges={[]}
                fractionTicks={[]}
                markers={[{val:0.667,label:'⅔ (Fraction)'},{val:1.5,label:'³⁄₂ (Reciprocal)'}]} accentColor={accentColor} />;

        /* ─── Irrational Numbers ─── */
        case 'NumberLine-Irrational':
            return <NumberLineSVG domainMin={0} domainMax={4} highlightRanges={[]}
                fractionTicks={[{val:1.414,label:'√2'},{val:2.236,label:'√5'},{val:3.14159,label:'π'}]}
                markers={[]} accentColor={accentColor} />;
        case 'Circle-Pi':
            return <CircleVisualization accentColor={accentColor} />;
        case 'Exponential-e':
            return <ExponentialGrowthVisual accentColor={accentColor} />;
        case 'NumberLine-Root':
            return <NumberLineSVG domainMin={0} domainMax={4} highlightRanges={[]}
                fractionTicks={[{val:1.414,label:'√2'},{val:2.646,label:'√7'},{val:3.606,label:'√13'}]}
                markers={[]} accentColor={accentColor} />;
        case 'NumberLine-PerfectSquare':
            return <NumberLineSVG domainMin={0} domainMax={5} highlightRanges={[]}
                markers={[{val:1,label:'√1=1'},{val:2,label:'√4=2'},{val:3,label:'√9=3'},{val:4,label:'√16=4'}]}
                accentColor={accentColor} />;
        case 'NumberLine-Surd':
            return <NumberLineSVG domainMin={1} domainMax={3} highlightRanges={[]}
                fractionTicks={[]}
                markers={[{val:1.732,label:'√3 ≈ 1.73 (Surd)'}]} accentColor={accentColor} />;

        /* ─── LCM ─── */
        case 'NumberLine-Multiples':
            return <NumberLineSVG domainMin={0} domainMax={20} highlightRanges={[]}
                markers={[{val:3,label:'3'},{val:6,label:'6'},{val:9,label:'9'},{val:12,label:'12'},{val:15,label:'15'},{val:18,label:'18'}]}
                accentColor={accentColor} />;
        case 'NumberLine-CommonMultiple':
            return <NumberLineSVG domainMin={0} domainMax={25} highlightRanges={[]}
                markers={[{val:12,label:'LCM → 12'},{val:24,label:'24'}]}
                fractionTicks={[{val:4,label:'×4'},{val:6,label:'×6'},{val:8,label:'×4'},{val:16,label:'×4'},{val:18,label:'×6'}]}
                accentColor={accentColor} />;
        case 'LShape-LCM':
            return <LShapeDivision numbers={[12, 18]} accentColor={accentColor} />;
        case 'FactorTree-LCM':
            return <FactorTree number={60} accentColor={accentColor} />;
        case 'NumberLine-CommonDenominator':
            return <NumberLineSVG domainMin={0} domainMax={1} highlightRanges={[]}
                fractionTicks={[{val:0.25,label:'3/12'},{val:1/6,label:'2/12'}]}
                markers={[]} accentColor={accentColor} />;
        case 'NumberLine-Coprime':
            return <NumberLineSVG domainMin={0} domainMax={10} highlightRanges={[]}
                markers={[{val:7,label:'7'},{val:9,label:'9'}]}
                accentColor={accentColor} />;

        /* ─── HCF ─── */
        case 'NumberLine-Factors':
            return <NumberLineSVG domainMin={0} domainMax={13} highlightRanges={[]}
                markers={[{val:1,label:'1'},{val:2,label:'2'},{val:3,label:'3'},{val:4,label:'4'},{val:6,label:'6'},{val:12,label:'12'}]}
                accentColor={accentColor} />;
        case 'NumberLine-CommonFactor':
            return <NumberLineSVG domainMin={0} domainMax={7} highlightRanges={[]}
                markers={[{val:1,label:'1'},{val:2,label:'2'},{val:3,label:'3'},{val:6,label:'6 ←HCF'}]}
                accentColor={accentColor} />;
        case 'LShape-HCF':
            return <LShapeDivision numbers={[12, 18]} accentColor={accentColor} />;
        case 'FactorTree-HCF':
            return <FactorTree number={60} accentColor={accentColor} />;
        case 'LShape-Euclid':
            return <LShapeDivision numbers={[48, 18]} accentColor={accentColor} />;
        case 'NumberLine-CoprimeHCF':
            return <NumberLineSVG domainMin={0} domainMax={16} highlightRanges={[]}
                markers={[{val:8,label:'8'},{val:15,label:'15'}]}
                accentColor={accentColor} />;

        default:
            return (
                <div style={{ padding: 16, textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', background: '#f8fafc', borderRadius: 12, fontSize: 14 }}>
                    Visual for "{visualType}" coming soon...
                </div>
            );
    }
}
