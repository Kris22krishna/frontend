import React, { useState, useEffect } from 'react';

/* ─── Interactive Widget: Drawing a Circle with Compass ─── */
export function CompassCircleInteractive() {
    const [angle, setAngle] = useState(0);
    const [drawing, setDrawing] = useState(false);
    const cx = 120, cy = 120, r = 70;

    useEffect(() => {
        if (!drawing) return;
        const timer = setInterval(() => {
            setAngle(prev => {
                if (prev >= 360) { setDrawing(false); return 360; }
                return prev + 4;
            });
        }, 20);
        return () => clearInterval(timer);
    }, [drawing]);

    const arcPath = (angleDeg) => {
        if (angleDeg <= 0) return '';
        const rad = (angleDeg - 90) * Math.PI / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        const startX = cx, startY = cy - r;
        const largeArc = angleDeg > 180 ? 1 : 0;
        return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${x} ${y}`;
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 240 240" width="220" height="220">
                {/* Grid dots */}
                {[0,1,2,3,4,5,6,7,8].map(i => [0,1,2,3,4,5,6,7,8].map(j => (
                    <circle key={`${i}-${j}`} cx={i*30} cy={j*30} r="1" fill="#e2e8f0" />
                )))}
                {/* Center point P */}
                <circle cx={cx} cy={cy} r="5" fill="#0ea5e9" />
                <text x={cx+10} y={cy+5} fill="#0ea5e9" fontWeight="800" fontSize="14" fontFamily="Outfit">P</text>
                {/* Radius line */}
                <line x1={cx} y1={cy} x2={cx} y2={cy-r} stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
                <text x={cx+6} y={cy-r/2} fill="#64748b" fontSize="11" fontFamily="Outfit">r</text>
                {/* Circle arc being drawn */}
                {angle > 0 && <path d={arcPath(angle)} fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />}
                {/* Compass needle tip */}
                {angle > 0 && angle < 360 && (() => {
                    const rad = (angle - 90) * Math.PI / 180;
                    const tx = cx + r * Math.cos(rad);
                    const ty = cy + r * Math.sin(rad);
                    return <circle cx={tx} cy={ty} r="4" fill="#f59e0b" stroke="#fff" strokeWidth="2" />;
                })()}
                {angle >= 360 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0ea5e9" strokeWidth="2.5" />}
            </svg>
            <div style={{ marginTop: 8 }}>
                <button onClick={() => { setAngle(0); setDrawing(true); }}
                    style={{ padding: '8px 24px', borderRadius: 100, border: 'none', background: '#0ea5e9', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                    {angle >= 360 ? '🔄 Draw Again' : '📐 Draw Circle'}
                </button>
            </div>
        </div>
    );
}

/* ─── Interactive Widget: Ruler Measurement ─── */
export function RulerMeasurementInteractive() {
    const [length, setLength] = useState(4);
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 320 100" width="300" height="100">
                {/* Ruler */}
                <rect x="10" y="50" width="300" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                {Array.from({length: 16}, (_, i) => (
                    <g key={i}>
                        <line x1={10 + i * 20} y1="50" x2={10 + i * 20} y2={i % 5 === 0 ? 65 : 58} stroke="#b45309" strokeWidth={i % 5 === 0 ? 2 : 1} />
                        {i % 5 === 0 && <text x={10 + i * 20} y="76" textAnchor="middle" fontSize="10" fill="#b45309" fontWeight="700">{i / 5 * 2}</text>}
                    </g>
                ))}
                {/* Measurement line */}
                <line x1="10" y1="30" x2={10 + length * 37.5} y2="30" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                <circle cx="10" cy="30" r="4" fill="#ef4444" />
                <circle cx={10 + length * 37.5} cy="30" r="4" fill="#ef4444" />
                <text x={(10 + 10 + length * 37.5) / 2} y="22" textAnchor="middle" fontSize="14" fill="#ef4444" fontWeight="800" fontFamily="Outfit">{length} cm</text>
            </svg>
            <div style={{ marginTop: 8 }}>
                <input type="range" min="1" max="8" value={length} onChange={e => setLength(Number(e.target.value))}
                    style={{ width: 200, accentColor: '#ef4444' }} />
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4 }}>Slide to change length</div>
            </div>
        </div>
    );
}

/* ─── Interactive Widget: Square vs Rectangle Properties ─── */
export function SquareRectangleCompare() {
    const [showSquare, setShowSquare] = useState(true);
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 280 160" width="260" height="150">
                {showSquare ? (
                    <g>
                        <rect x="60" y="20" width="100" height="100" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5" rx="2" />
                        <text x="110" y="15" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="700">6 cm</text>
                        <text x="110" y="135" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="700">6 cm</text>
                        <text x="50" y="75" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="700" transform="rotate(-90,50,75)">6 cm</text>
                        <text x="170" y="75" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="700" transform="rotate(90,170,75)">6 cm</text>
                        {/* 90° markers */}
                        {[[60,20],[160,20],[160,120],[60,120]].map(([x,y], i) => (
                            <rect key={i} x={x + (i===0||i===3 ? 2 : -12)} y={y + (i===0||i===1 ? 2 : -12)} width="10" height="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                        ))}
                        <text x="220" y="75" fontSize="20" fontWeight="900" fill="#3b82f6" fontFamily="Outfit">SQUARE</text>
                    </g>
                ) : (
                    <g>
                        <rect x="30" y="35" width="150" height="80" fill="#fce7f3" stroke="#ec4899" strokeWidth="2.5" rx="2" />
                        <text x="105" y="30" textAnchor="middle" fontSize="12" fill="#ec4899" fontWeight="700">8 cm</text>
                        <text x="105" y="130" textAnchor="middle" fontSize="12" fill="#ec4899" fontWeight="700">8 cm</text>
                        <text x="20" y="78" textAnchor="middle" fontSize="12" fill="#ec4899" fontWeight="700" transform="rotate(-90,20,78)">4 cm</text>
                        <text x="190" y="78" textAnchor="middle" fontSize="12" fill="#ec4899" fontWeight="700" transform="rotate(90,190,78)">4 cm</text>
                        {[[30,35],[180,35],[180,115],[30,115]].map(([x,y], i) => (
                            <rect key={i} x={x + (i===0||i===3 ? 2 : -12)} y={y + (i===0||i===1 ? 2 : -12)} width="10" height="10" fill="none" stroke="#ec4899" strokeWidth="1.5" />
                        ))}
                        <text x="220" y="78" fontSize="16" fontWeight="900" fill="#ec4899" fontFamily="Outfit">RECT.</text>
                    </g>
                )}
            </svg>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
                <button onClick={() => setShowSquare(true)} style={{ padding: '6px 18px', borderRadius: 100, border: showSquare ? '2px solid #3b82f6' : '2px solid #e2e8f0', background: showSquare ? '#dbeafe' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13, color: showSquare ? '#3b82f6' : '#64748b' }}>Square</button>
                <button onClick={() => setShowSquare(false)} style={{ padding: '6px 18px', borderRadius: 100, border: !showSquare ? '2px solid #ec4899' : '2px solid #e2e8f0', background: !showSquare ? '#fce7f3' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13, color: !showSquare ? '#ec4899' : '#64748b' }}>Rectangle</button>
            </div>
        </div>
    );
}

/* ─── Interactive Widget: Perpendicular Line Constructor ─── */
export function PerpendicularConstructor() {
    const [step, setStep] = useState(0);
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 260 180" width="240" height="170">
                {/* Base line PQ */}
                <line x1="30" y1="140" x2="230" y2="140" stroke="#334155" strokeWidth="2.5" />
                <circle cx="30" cy="140" r="4" fill="#0ea5e9" />
                <circle cx="230" cy="140" r="4" fill="#0ea5e9" />
                <text x="30" y="158" textAnchor="middle" fontSize="13" fill="#0ea5e9" fontWeight="800">P</text>
                <text x="230" y="158" textAnchor="middle" fontSize="13" fill="#0ea5e9" fontWeight="800">Q</text>
                {step >= 1 && <>
                    {/* Perpendicular line through P */}
                    <line x1="30" y1="140" x2="30" y2="20" stroke="#8b5cf6" strokeWidth="2" strokeDasharray={step >= 2 ? "0" : "6,4"} />
                    <rect x="32" y="128" width="10" height="10" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                    <text x="18" y="80" fontSize="11" fill="#8b5cf6" fontWeight="700" transform="rotate(-90,18,80)">90°</text>
                </>}
                {step >= 2 && <>
                    {/* Point S on perpendicular */}
                    <circle cx="30" cy="40" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                    <text x="18" y="38" fontSize="13" fill="#10b981" fontWeight="800">S</text>
                    <text x="42" y="92" fontSize="11" fill="#64748b" fontWeight="600">6 cm</text>
                </>}
                {step >= 3 && <>
                    {/* Perpendicular at Q and point R */}
                    <line x1="230" y1="140" x2="230" y2="20" stroke="#8b5cf6" strokeWidth="2" strokeDasharray={step >= 4 ? "0" : "6,4"} />
                    <rect x="218" y="128" width="10" height="10" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                    <circle cx="230" cy="40" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    <text x="240" y="38" fontSize="13" fill="#f59e0b" fontWeight="800">R</text>
                </>}
                {step >= 4 && <>
                    {/* Top line SR */}
                    <line x1="30" y1="40" x2="230" y2="40" stroke="#334155" strokeWidth="2.5" />
                </>}
            </svg>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
                {['Draw PQ', '⊥ at P', 'Mark S', '⊥ at Q + R', 'Join SR'].map((label, i) => (
                    <button key={i} onClick={() => setStep(i)}
                        style={{ padding: '6px 14px', borderRadius: 100, border: step === i ? '2px solid #8b5cf6' : '1px solid #e2e8f0', background: step === i ? '#ede9fe' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 12, color: step === i ? '#8b5cf6' : '#64748b' }}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ─── Interactive Widget: Diagonal Explorer ─── */
export function DiagonalExplorer() {
    const [showDiag, setShowDiag] = useState(false);
    const w = 160, h = 100, ox = 40, oy = 20;
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 260 160" width="240" height="150">
                <rect x={ox} y={oy} width={w} height={h} fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" rx="2" />
                <text x={ox} y={oy - 4} fontSize="13" fill="#10b981" fontWeight="800">P</text>
                <text x={ox + w} y={oy - 4} fontSize="13" fill="#10b981" fontWeight="800" textAnchor="end">Q</text>
                <text x={ox + w + 4} y={oy + h + 14} fontSize="13" fill="#10b981" fontWeight="800">R</text>
                <text x={ox - 4} y={oy + h + 14} fontSize="13" fill="#10b981" fontWeight="800" textAnchor="end">S</text>
                {showDiag && <>
                    <line x1={ox} y1={oy} x2={ox+w} y2={oy+h} stroke="#ef4444" strokeWidth="2" />
                    <line x1={ox+w} y1={oy} x2={ox} y2={oy+h} stroke="#3b82f6" strokeWidth="2" />
                    {/* Intersection */}
                    <circle cx={ox+w/2} cy={oy+h/2} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    <text x={ox+w/2+10} y={oy+h/2-6} fontSize="11" fill="#f59e0b" fontWeight="700">O</text>
                    <text x={ox+w/2} y={oy+h+30} textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="600">PR = QS (Diagonals are equal!)</text>
                </>}
            </svg>
            <button onClick={() => setShowDiag(d => !d)}
                style={{ marginTop: 8, padding: '8px 20px', borderRadius: 100, border: 'none', background: '#10b981', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                {showDiag ? '🔄 Hide Diagonals' : '✏️ Show Diagonals'}
            </button>
        </div>
    );
}

/* ─── Interactive Widget: House Construction (Equidistant Points) ─── */
export function HouseConstructionInteractive() {
    const [step, setStep] = useState(0);
    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox="0 0 240 220" width="220" height="200">
                {/* Base square BCDE */}
                {step >= 0 && <>
                    <line x1="60" y1="180" x2="180" y2="180" stroke="#334155" strokeWidth="2.5" />
                    <line x1="180" y1="180" x2="180" y2="70" stroke="#334155" strokeWidth="2.5" />
                    <line x1="60" y1="180" x2="60" y2="70" stroke="#334155" strokeWidth="2.5" />
                    <line x1="60" y1="70" x2="180" y2="70" stroke="#334155" strokeWidth="2.5" />
                    <text x="55" y="195" fontSize="12" fill="#334155" fontWeight="700">E</text>
                    <text x="182" y="195" fontSize="12" fill="#334155" fontWeight="700">D</text>
                    <text x="182" y="65" fontSize="12" fill="#334155" fontWeight="700">C</text>
                    <text x="49" y="65" fontSize="12" fill="#334155" fontWeight="700">B</text>
                </>}
                {step >= 1 && <>
                    {/* Arc from B */}
                    <path d="M 60 70 A 110 110 0 0 1 120 5" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,3" />
                </>}
                {step >= 2 && <>
                    {/* Arc from C */}
                    <path d="M 180 70 A 110 110 0 0 0 120 5" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
                    {/* Point A */}
                    <circle cx="120" cy="5" r="5" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                    <text x="120" y="-2" textAnchor="middle" fontSize="13" fill="#ef4444" fontWeight="800">A</text>
                </>}
                {step >= 3 && <>
                    {/* Roof lines */}
                    <line x1="60" y1="70" x2="120" y2="5" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="180" y1="70" x2="120" y2="5" stroke="#ef4444" strokeWidth="2.5" />
                    {/* Roof arc */}
                    <path d="M 60 70 A 120 120 0 0 1 180 70" fill="none" stroke="#ef4444" strokeWidth="2" />
                </>}
            </svg>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
                {['Base Square', 'Arc from B', 'Arc from C', 'Complete House'].map((label, i) => (
                    <button key={i} onClick={() => setStep(i)}
                        style={{ padding: '5px 12px', borderRadius: 100, border: step === i ? '2px solid #ef4444' : '1px solid #e2e8f0', background: step === i ? '#fef2f2' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 11, color: step === i ? '#ef4444' : '#64748b' }}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ─── Interactive Widget: Artwork Patterns — Wavy Wave ─── */
export function WavyWaveInteractive() {
    const [waves, setWaves] = useState(4);
    const w = 280, h = 80, waveW = w / waves;
    
    let pathD = `M 10 40`;
    for (let i = 0; i < waves; i++) {
        const dir = i % 2 === 0 ? -1 : 1;
        const x1 = 10 + i * waveW + waveW / 2;
        const y1 = 40 + dir * 30;
        const x2 = 10 + (i + 1) * waveW;
        pathD += ` Q ${x1} ${y1}, ${x2} 40`;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <svg viewBox={`0 0 300 ${h}`} width="280" height={h}>
                <line x1="10" y1="40" x2="290" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,3" />
                <path d={pathD} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="10" cy="40" r="3" fill="#8b5cf6" />
                <circle cx={10 + waves * waveW} cy="40" r="3" fill="#8b5cf6" />
                <text x="5" y="60" fontSize="11" fill="#8b5cf6" fontWeight="700">A</text>
                <text x={10 + waves * waveW - 3} y="60" fontSize="11" fill="#8b5cf6" fontWeight="700">B</text>
            </svg>
            <div style={{ marginTop: 8 }}>
                <input type="range" min="2" max="8" value={waves} onChange={e => setWaves(Number(e.target.value))}
                    style={{ width: 180, accentColor: '#8b5cf6' }} />
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{waves} waves using semicircles</div>
            </div>
        </div>
    );
}
