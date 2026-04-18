import React, { useState, useEffect } from 'react';

/* ─── 1. Animated Circle Drawing ─── */
export function LearnCircleDrawing() {
    const [angle, setAngle] = useState(0);
    const [running, setRunning] = useState(false);
    const cx = 130, cy = 130, r = 80;

    useEffect(() => {
        if (!running) return;
        const t = setInterval(() => {
            setAngle(prev => {
                if (prev >= 360) { setRunning(false); return 360; }
                return prev + 3;
            });
        }, 16);
        return () => clearInterval(t);
    }, [running]);

    const arcPath = () => {
        if (angle <= 0) return '';
        const rad = (angle - 90) * Math.PI / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        return `M ${cx} ${cy - r} A ${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${x} ${y}`;
    };

    const tipRad = (angle - 90) * Math.PI / 180;
    const tipX = cx + r * Math.cos(tipRad);
    const tipY = cy + r * Math.sin(tipRad);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 260 260" width="240" height="240" style={{ background: '#f0f9ff', borderRadius: 16 }}>
                {/* Soft grid */}
                {Array.from({length:14},(_, i) => (
                    <line key={`h${i}`} x1="0" y1={i*20} x2="260" y2={i*20} stroke="#e0f2fe" strokeWidth="0.5" />
                ))}
                {Array.from({length:14},(_, i) => (
                    <line key={`v${i}`} x1={i*20} y1="0" x2={i*20} y2="260" stroke="#e0f2fe" strokeWidth="0.5" />
                ))}
                {/* Radius line */}
                <line x1={cx} y1={cy} x2={cx} y2={cy-r} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6,4" />
                <text x={cx+8} y={cy-r/2} fill="#64748b" fontSize="13" fontWeight="700" fontFamily="Outfit">4 cm</text>
                {/* Center */}
                <circle cx={cx} cy={cy} r="6" fill="#0ea5e9" />
                <text x={cx+10} y={cy+5} fill="#0ea5e9" fontWeight="900" fontSize="14" fontFamily="Outfit">P</text>
                {/* Arc being drawn */}
                {angle > 0 && <path d={arcPath()} fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />}
                {/* Compass tip */}
                {angle > 0 && angle < 360 && (
                    <>
                        <line x1={cx} y1={cy} x2={tipX} y2={tipY} stroke="#475569" strokeWidth="1.5" />
                        <circle cx={tipX} cy={tipY} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    </>
                )}
                {/* Full circle */}
                {angle >= 360 && (
                    <>
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0ea5e9" strokeWidth="3" />
                        <text x={cx} y={cy+r+20} textAnchor="middle" fill="#0ea5e9" fontSize="13" fontWeight="800" fontFamily="Outfit">radius = 4 cm everywhere!</text>
                    </>
                )}
            </svg>
            <button onClick={() => { setAngle(0); setTimeout(() => setRunning(true), 50); }}
                style={{ padding: '10px 28px', borderRadius: 100, border: 'none', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14, boxShadow: '0 4px 14px rgba(14,165,233,0.3)' }}>
                {angle >= 360 ? '🔄 Draw Again' : '📐 Watch the Compass Draw'}
            </button>
        </div>
    );
}

/* ─── 2. Wavy Wave Builder ─── */
export function LearnWavyWave() {
    const [numWaves, setNumWaves] = useState(4);
    const totalW = 260, h = 120, lineY = 60;
    const waveW = totalW / numWaves;
    const r = waveW / 2;

    let arcs = '';
    for (let i = 0; i < numWaves; i++) {
        const startX = i * waveW;
        const endX = startX + waveW;
        const midX = (startX + endX) / 2;
        const dir = i % 2 === 0 ? -1 : 1;
        arcs += `<path d="M ${startX} ${lineY} A ${r} ${r} 0 0 ${dir === -1 ? 1 : 0} ${endX} ${lineY}" fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round"/>`;
        arcs += `<circle cx="${midX}" cy="${lineY}" r="2" fill="#8b5cf6" opacity="0.4"/>`;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox={`-10 -10 280 ${h + 20}`} width="280" height={h + 20} style={{ background: '#faf5ff', borderRadius: 16 }}>
                <line x1="0" y1={lineY} x2={totalW} y2={lineY} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5,4" />
                <g dangerouslySetInnerHTML={{ __html: arcs }} />
                <circle cx="0" cy={lineY} r="4" fill="#8b5cf6" />
                <circle cx={totalW} cy={lineY} r="4" fill="#8b5cf6" />
                <text x="-4" y={lineY + 18} fontSize="12" fill="#8b5cf6" fontWeight="700">A</text>
                <text x={totalW - 4} y={lineY + 18} fontSize="12" fill="#8b5cf6" fontWeight="700">B</text>
                <text x={totalW / 2} y={h + 8} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
                    {numWaves} semicircles, radius = {(totalW / numWaves / 2).toFixed(0)} units each
                </text>
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#8b5cf6' }}>Waves:</span>
                <input type="range" min="2" max="8" value={numWaves} onChange={e => setNumWaves(Number(e.target.value))}
                    style={{ width: 160, accentColor: '#8b5cf6' }} />
                <span style={{ fontSize: 14, fontWeight: 800, color: '#8b5cf6' }}>{numWaves}</span>
            </div>
        </div>
    );
}

/* ─── 3. Rectangle With Labels ─── */
export function LearnRectangleLabeled() {
    const [highlight, setHighlight] = useState('sides');
    const w = 200, h = 120, ox = 30, oy = 20;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 280 180" width="260" height="170" style={{ background: '#faf5ff', borderRadius: 16 }}>
                <rect x={ox} y={oy} width={w} height={h} fill={highlight === 'sides' ? '#ede9fe' : '#f5f3ff'} stroke="#8b5cf6" strokeWidth="2.5" rx="2" />
                {/* Corner labels */}
                <text x={ox-8} y={oy-4} fontSize="14" fill="#8b5cf6" fontWeight="900">A</text>
                <text x={ox+w+4} y={oy-4} fontSize="14" fill="#8b5cf6" fontWeight="900">B</text>
                <text x={ox+w+4} y={oy+h+16} fontSize="14" fill="#8b5cf6" fontWeight="900">C</text>
                <text x={ox-8} y={oy+h+16} fontSize="14" fill="#8b5cf6" fontWeight="900">D</text>
                {highlight === 'sides' && <>
                    {/* Top & Bottom (equal) */}
                    <text x={ox+w/2} y={oy-8} textAnchor="middle" fontSize="13" fill="#ec4899" fontWeight="800">8 cm</text>
                    <text x={ox+w/2} y={oy+h+16} textAnchor="middle" fontSize="13" fill="#ec4899" fontWeight="800">8 cm</text>
                    {/* Left & Right (equal) */}
                    <text x={ox-14} y={oy+h/2+4} fontSize="13" fill="#3b82f6" fontWeight="800" transform={`rotate(-90,${ox-14},${oy+h/2+4})`}>4 cm</text>
                    <text x={ox+w+16} y={oy+h/2+4} fontSize="13" fill="#3b82f6" fontWeight="800" transform={`rotate(90,${ox+w+16},${oy+h/2+4})`}>4 cm</text>
                </>}
                {highlight === 'angles' && <>
                    {[[ox,oy,1,1],[ox+w,oy,-1,1],[ox+w,oy+h,-1,-1],[ox,oy+h,1,-1]].map(([x,y,dx,dy], i) => (
                        <g key={i}>
                            <rect x={x + (dx > 0 ? 3 : -15)} y={y + (dy > 0 ? 3 : -15)} width="12" height="12" fill="none" stroke="#ef4444" strokeWidth="2" />
                            <text x={x + dx * 22} y={y + dy * 22} fontSize="11" fill="#ef4444" fontWeight="800" textAnchor="middle">90°</text>
                        </g>
                    ))}
                </>}
            </svg>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setHighlight('sides')} style={{ padding: '6px 18px', borderRadius: 100, border: highlight === 'sides' ? '2px solid #8b5cf6' : '1px solid #e2e8f0', background: highlight === 'sides' ? '#ede9fe' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 12, color: '#8b5cf6' }}>Show Sides</button>
                <button onClick={() => setHighlight('angles')} style={{ padding: '6px 18px', borderRadius: 100, border: highlight === 'angles' ? '2px solid #ef4444' : '1px solid #e2e8f0', background: highlight === 'angles' ? '#fef2f2' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 12, color: '#ef4444' }}>Show Angles</button>
            </div>
        </div>
    );
}

/* ─── 4. Square With Rotation ─── */
export function LearnSquareRotation() {
    const [rotation, setRotation] = useState(0);
    const cx = 180, cy = 110, s = 90;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 360 230" width="340" height="220" style={{ background: '#f0fdf4', borderRadius: 16 }}>
                <rect x={cx - s/2} y={cy - s/2} width={s} height={s} fill="#dcfce7" stroke="#10b981" strokeWidth="2.5" rx="2"
                    transform={`rotate(${rotation},${cx},${cy})`} />
                {/* Side labels */}
                <text x={cx} y={cy + s/2 + 22} textAnchor="middle" fontSize="13" fill="#10b981" fontWeight="800">
                    All sides = 6 cm  ·  All angles = 90°
                </text>
                <text x={cx} y={cy + s/2 + 40} textAnchor="middle" fontSize="14" fill="#059669" fontWeight="900">
                    Still a SQUARE! ✓
                </text>
                {/* Rotation indicator */}
                <text x={cx} y={20} textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="700">Rotated {rotation}°</text>
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>Rotate:</span>
                <input type="range" min="0" max="90" value={rotation} onChange={e => setRotation(Number(e.target.value))}
                    style={{ width: 200, accentColor: '#10b981' }} />
                <span style={{ fontSize: 14, fontWeight: 800, color: '#10b981' }}>{rotation}°</span>
            </div>
        </div>
    );
}

/* ─── 5. Square Construction Steps ─── */
export function LearnSquareConstruction() {
    const [step, setStep] = useState(0);
    const steps = ['Draw PQ', '⊥ at P', 'Mark S', '⊥ at Q + R', 'Join SR'];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 280 220" width="260" height="200" style={{ background: '#f0fdf4', borderRadius: 16 }}>
                {/* Base PQ */}
                <line x1="40" y1="180" x2="220" y2="180" stroke="#334155" strokeWidth="3" />
                <circle cx="40" cy="180" r="5" fill="#10b981" />
                <circle cx="220" cy="180" r="5" fill="#10b981" />
                <text x="40" y="198" textAnchor="middle" fontSize="13" fill="#10b981" fontWeight="900">P</text>
                <text x="220" y="198" textAnchor="middle" fontSize="13" fill="#10b981" fontWeight="900">Q</text>
                <text x="130" y="175" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="700">6 cm</text>

                {step >= 1 && <>
                    <line x1="40" y1="180" x2="40" y2="20" stroke="#8b5cf6" strokeWidth="2" strokeDasharray={step >= 2 ? "0" : "6,4"} />
                    <rect x="42" y="168" width="10" height="10" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                </>}
                {step >= 2 && <>
                    <circle cx="40" cy="20" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    <text x="28" y="18" fontSize="13" fill="#f59e0b" fontWeight="900">S</text>
                    <text x="28" y="100" fontSize="11" fill="#64748b" fontWeight="600" transform="rotate(-90,28,100)">6 cm</text>
                </>}
                {step >= 3 && <>
                    <line x1="220" y1="180" x2="220" y2="20" stroke="#8b5cf6" strokeWidth="2" />
                    <rect x="208" y="168" width="10" height="10" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                    <circle cx="220" cy="20" r="5" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                    <text x="228" y="18" fontSize="13" fill="#ef4444" fontWeight="900">R</text>
                </>}
                {step >= 4 && <>
                    <line x1="40" y1="20" x2="220" y2="20" stroke="#334155" strokeWidth="3" />
                    <rect x="40" y="20" width="180" height="160" fill="#10b98108" stroke="none" />
                    <text x="130" y="14" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="700">6 cm</text>
                </>}
            </svg>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {steps.map((label, i) => (
                    <button key={i} onClick={() => setStep(i)}
                        style={{ padding: '6px 14px', borderRadius: 100, border: step === i ? '2px solid #10b981' : '1px solid #e2e8f0', background: step === i ? '#dcfce7' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 12, color: step === i ? '#10b981' : '#64748b' }}>
                        Step {i + 1}: {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ─── 6. Rectangle from Side + Diagonal (Arc Intersection) ─── */
export function LearnRectDiagonal() {
    const [step, setStep] = useState(0);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 280 240" width="260" height="220" style={{ background: '#fffbeb', borderRadius: 16 }}>
                {/* Base CD */}
                <line x1="40" y1="200" x2="200" y2="200" stroke="#334155" strokeWidth="3" />
                <circle cx="40" cy="200" r="5" fill="#f59e0b" />
                <circle cx="200" cy="200" r="5" fill="#f59e0b" />
                <text x="40" y="218" textAnchor="middle" fontSize="13" fill="#f59e0b" fontWeight="900">D</text>
                <text x="200" y="218" textAnchor="middle" fontSize="13" fill="#f59e0b" fontWeight="900">C</text>
                <text x="120" y="195" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="700">5 cm</text>

                {step >= 1 && <>
                    {/* Perpendicular at C */}
                    <line x1="200" y1="200" x2="200" y2="30" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="6,4" />
                    <rect x="188" y="188" width="10" height="10" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                    <text x="210" y="115" fontSize="11" fill="#8b5cf6" fontWeight="700" fontStyle="italic">line l</text>
                </>}
                {step >= 2 && <>
                    {/* Arc from D with radius 7 */}
                    <path d="M 200 60 A 140 140 0 0 0 100 200" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" />
                    <text x="100" y="100" fontSize="11" fill="#ef4444" fontWeight="700">radius = 7 cm</text>
                </>}
                {step >= 3 && <>
                    {/* Point B at intersection */}
                    <circle cx="200" cy="68" r="6" fill="#10b981" stroke="#fff" strokeWidth="2" />
                    <text x="212" y="68" fontSize="13" fill="#10b981" fontWeight="900">B</text>
                    {/* Diagonal DB */}
                    <line x1="40" y1="200" x2="200" y2="68" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
                    <text x="110" y="125" fontSize="11" fill="#ef4444" fontWeight="700">7 cm (diagonal)</text>
                </>}
                {step >= 4 && <>
                    {/* Complete rectangle */}
                    <line x1="200" y1="68" x2="200" y2="200" stroke="#334155" strokeWidth="2.5" />
                    <line x1="40" y1="200" x2="40" y2="68" stroke="#334155" strokeWidth="2.5" />
                    <line x1="40" y1="68" x2="200" y2="68" stroke="#334155" strokeWidth="2.5" />
                    <circle cx="40" cy="68" r="5" fill="#0ea5e9" stroke="#fff" strokeWidth="2" />
                    <text x="28" y="66" fontSize="13" fill="#0ea5e9" fontWeight="900">A</text>
                    <rect x="40" y="68" width="160" height="132" fill="#f59e0b08" stroke="none" />
                </>}
            </svg>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Base CD', '⊥ at C', 'Arc from D', 'Find B', 'Complete'].map((label, i) => (
                    <button key={i} onClick={() => setStep(i)}
                        style={{ padding: '6px 12px', borderRadius: 100, border: step === i ? '2px solid #f59e0b' : '1px solid #e2e8f0', background: step === i ? '#fef3c7' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 11, color: step === i ? '#f59e0b' : '#64748b' }}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ─── 7. Diagonal Explorer ─── */
export function LearnDiagonals() {
    const [showDiag, setShowDiag] = useState(false);
    const ox = 30, oy = 30, w = 200, h = 120;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 280 200" width="260" height="185" style={{ background: '#fef2f2', borderRadius: 16 }}>
                <rect x={ox} y={oy} width={w} height={h} fill="#fee2e2" stroke="#ef4444" strokeWidth="2.5" rx="2" />
                <text x={ox-8} y={oy-4} fontSize="14" fill="#ef4444" fontWeight="900">P</text>
                <text x={ox+w+4} y={oy-4} fontSize="14" fill="#ef4444" fontWeight="900">Q</text>
                <text x={ox+w+4} y={oy+h+16} fontSize="14" fill="#ef4444" fontWeight="900">R</text>
                <text x={ox-8} y={oy+h+16} fontSize="14" fill="#ef4444" fontWeight="900">S</text>
                {showDiag && <>
                    <line x1={ox} y1={oy} x2={ox+w} y2={oy+h} stroke="#3b82f6" strokeWidth="2.5" />
                    <line x1={ox+w} y1={oy} x2={ox} y2={oy+h} stroke="#f59e0b" strokeWidth="2.5" />
                    <circle cx={ox+w/2} cy={oy+h/2} r="6" fill="#10b981" stroke="#fff" strokeWidth="2" />
                    <text x={ox+w/2+10} y={oy+h/2-8} fontSize="12" fill="#10b981" fontWeight="800">O</text>
                    {/* Label diagonals */}
                    <text x={ox+w/2-40} y={oy+h/2-20} fontSize="12" fill="#3b82f6" fontWeight="700">PR</text>
                    <text x={ox+w/2+25} y={oy+h/2-20} fontSize="12" fill="#f59e0b" fontWeight="700">QS</text>
                    <text x={ox+w/2} y={oy+h+40} textAnchor="middle" fontSize="13" fill="#334155" fontWeight="800">
                        PR = QS ✓ (Diagonals are always equal!)
                    </text>
                </>}
            </svg>
            <button onClick={() => setShowDiag(d => !d)}
                style={{ padding: '10px 24px', borderRadius: 100, border: 'none', background: showDiag ? '#64748b' : '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14, boxShadow: '0 4px 14px rgba(239,68,68,0.3)' }}>
                {showDiag ? '🔄 Hide Diagonals' : '✏️ Draw Both Diagonals'}
            </button>
        </div>
    );
}

/* ─── 8. House Construction (Equidistant Arcs) ─── */
export function LearnHouseArcs() {
    const [step, setStep] = useState(0);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 280 260" width="260" height="240" style={{ background: '#fef2f2', borderRadius: 16 }}>
                {/* Base square */}
                <line x1="60" y1="220" x2="220" y2="220" stroke="#334155" strokeWidth="2.5" />
                <line x1="220" y1="220" x2="220" y2="80" stroke="#334155" strokeWidth="2.5" />
                <line x1="60" y1="220" x2="60" y2="80" stroke="#334155" strokeWidth="2.5" />
                <line x1="60" y1="80" x2="220" y2="80" stroke="#334155" strokeWidth="2.5" />
                <text x="54" y="235" fontSize="12" fill="#334155" fontWeight="800">E</text>
                <text x="222" y="235" fontSize="12" fill="#334155" fontWeight="800">D</text>
                <text x="222" y="74" fontSize="12" fill="#334155" fontWeight="800">C</text>
                <text x="48" y="74" fontSize="12" fill="#334155" fontWeight="800">B</text>
                <text x="140" y="215" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">5 cm each side</text>

                {step >= 1 && <>
                    {/* Arc from B */}
                    <path d="M 60 80 A 140 140 0 0 1 140 10" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" />
                    <text x="75" y="40" fontSize="11" fill="#0ea5e9" fontWeight="700">Arc r=5cm from B</text>
                </>}
                {step >= 2 && <>
                    {/* Arc from C */}
                    <path d="M 220 80 A 140 140 0 0 0 140 10" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />
                    <text x="170" y="40" fontSize="11" fill="#f59e0b" fontWeight="700">Arc from C</text>
                    {/* Point A */}
                    <circle cx="140" cy="10" r="7" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                    <text x="140" y="-2" textAnchor="middle" fontSize="14" fill="#ef4444" fontWeight="900">A</text>
                </>}
                {step >= 3 && <>
                    {/* Roof lines + arc */}
                    <line x1="60" y1="80" x2="140" y2="10" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="220" y1="80" x2="140" y2="10" stroke="#ef4444" strokeWidth="2.5" />
                    <path d="M 60 80 A 155 155 0 0 1 220 80" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="140" y="250" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="800">
                        🏠 AB = AC = 5 cm (equidistant!)
                    </text>
                </>}
            </svg>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Square Base', 'Arc from B', 'Arc from C → A', 'Complete House'].map((label, i) => (
                    <button key={i} onClick={() => setStep(i)}
                        style={{ padding: '6px 12px', borderRadius: 100, border: step === i ? '2px solid #ef4444' : '1px solid #e2e8f0', background: step === i ? '#fef2f2' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 11, color: step === i ? '#ef4444' : '#64748b' }}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
