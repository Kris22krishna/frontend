import React, { useState, useEffect } from 'react';

// 🍫 1. Dynamic Rectangular Bar (Chikki Bar)
export function DynamicChikkiBar({ numCols = 4, filledCols = 3, width = 300, height = 60, activeColor = '#f59e0b', strokeColor = '#b45309' }) {
    const [hover, setHover] = useState(false);
    const colWidth = width / numCols;
    
    return (
        <div 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            style={{ position: 'relative', width, height, cursor: 'pointer', margin: '0 auto', transform: hover ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s' }}
        >
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ display: 'block' }}>
                <rect x="0" y="0" width={width} height={height} fill="#fff9c4" stroke={strokeColor} strokeWidth="3" rx="4" />
                {Array.from({ length: numCols }).map((_, i) => (
                    <g key={i}>
                        {i < filledCols && (
                            <rect 
                                x={i * colWidth} y="0" width={colWidth} height={height} 
                                fill={activeColor} 
                                style={{
                                    opacity: hover ? 0.8 : 1, transition: 'opacity 0.2s'
                                }}
                            />
                        )}
                        <rect x={i * colWidth} y="0" width={colWidth} height={height} fill="none" stroke={strokeColor} strokeWidth="2" />
                    </g>
                ))}
            </svg>
            {hover && (
                <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', background: '#334155', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 14, fontWeight: 'bold', animation: 'fadeIn 0.2s', whiteSpace: 'nowrap' }}>
                    {filledCols} pieces out of {numCols}
                </div>
            )}
        </div>
    );
}

// 🍕 2. Circular Pie Fraction
export function CircularPieFraction({ totalSlices = 8, filledSlices = 5, size = 150, activeColor = '#ef4444', strokeColor = '#b91c1c' }) {
    const [sweep, setSweep] = useState(0);

    useEffect(() => {
        const targetSweep = (filledSlices / totalSlices) * 360;
        const timer = setInterval(() => {
            setSweep(s => {
                if (s >= targetSweep) { clearInterval(timer); return targetSweep; }
                return s + 5;
            });
        }, 10);
        return () => clearInterval(timer);
    }, [filledSlices, totalSlices]);

    const r = size / 2 - 4;
    const cx = size / 2;
    const cy = size / 2;

    const getCoordinatesForPercent = (percent) => {
        const x = cx + r * Math.cos(2 * Math.PI * percent - Math.PI / 2);
        const y = cy + r * Math.sin(2 * Math.PI * percent - Math.PI / 2);
        return [x, y];
    };

    return (
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height={size} style={{ maxWidth: size, display: 'block', margin: '0 auto' }}>
            <circle cx={cx} cy={cy} r={r} fill="#fee2e2" stroke={strokeColor} strokeWidth="2" />

            {/* Sweep path instead of individual static slices for animation */}
            {sweep > 0 && (
                <path 
                    d={`M${cx} ${cy} L${cx} ${cy - r} A${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${cx + r * Math.sin(sweep * Math.PI / 180)} ${cy - r * Math.cos(sweep * Math.PI / 180)} Z`} 
                    fill={activeColor} 
                />
            )}

            {/* Draw the dividers */}
            {Array.from({ length: totalSlices }).map((_, i) => {
                const angle = i / totalSlices;
                const [endX, endY] = getCoordinatesForPercent(angle);
                return <line key={i} x1={cx} y1={cy} x2={endX} y2={endY} stroke={strokeColor} strokeWidth="2" />;
            })}
        </svg>
    );
}

// 📏 3. Number Line Fraction Marker
export function StaticNumberLine({ fraction = "1/2", maxUnit = 1, width = 450, height = 80, markerColor = '#10b981' }) {
    const [progress, setProgress] = useState(0);
    const fracParts = typeof fraction === 'string' ? fraction.split('/') : [1, 1];
    let num = parseInt(fracParts[0]) || 0;
    let den = parseInt(fracParts[1]) || 1;

    const activeRatio = (num / den) / maxUnit;

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= activeRatio) return activeRatio;
                return p + 0.02;
            });
        }, 20);
        return () => clearInterval(timer);
    }, [activeRatio]);

    const lineY = height - 30;
    const paddingX = 30;
    const usableWidth = width - 2 * paddingX;
    const markerX = paddingX + (progress * usableWidth);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ maxWidth: width, display: 'block', margin: '0 auto' }}>
            {/* Base line */}
            <line x1={paddingX} y1={lineY} x2={width - paddingX} y2={lineY} stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            
            {/* Draw units and subdivision ticks */}
            {Array.from({ length: maxUnit + 1 }).map((_, u) => {
                const uX = paddingX + (u / maxUnit) * usableWidth;
                return (
                    <g key={u}>
                        <line x1={uX} y1={lineY - 10} x2={uX} y2={lineY + 10} stroke="#334155" strokeWidth="3" />
                        <text x={uX} y={lineY + 25} fill="#334155" fontFamily="Outfit" fontSize="16" fontWeight="bold" textAnchor="middle">{u}</text>

                        {u < maxUnit && den <= 10 && Array.from({ length: den - 1 }).map((_, tickIdx) => {
                            const subRatio = (tickIdx + 1) / den;
                            const tickX = paddingX + ((u + subRatio) / maxUnit) * usableWidth;
                            return (
                                <line key={tickIdx} x1={tickX} y1={lineY - 5} x2={tickX} y2={lineY + 5} stroke="#cbd5e1" strokeWidth="2" />
                            );
                        })}
                    </g>
                );
            })}

            {/* Marker Line animated */}
            <line x1={paddingX} y1={lineY} x2={markerX} y2={lineY} stroke={markerColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx={markerX} cy={lineY} r="8" fill={markerColor} stroke="#fff" strokeWidth="2" />
            
            {/* Marker Fraction Text */}
            <g transform={`translate(${markerX}, ${lineY - 30})`}>
                <rect x="-24" y="-20" width="48" height="24" rx="4" fill={markerColor} />
                <text x="0" y="-3" fill="#fff" fontFamily="Outfit" fontSize="14" fontWeight="bold" textAnchor="middle">{num}/{den}</text>
                <polygon points="-6,4 6,4 0,10" fill={markerColor} />
            </g>
        </svg>
    );
}

// 🧱 4. Equivalent Fraction Strip Combiner
export function EquivalentFractionStrips({ num1 = 1, den1 = 2, num2 = 2, den2 = 4, width = 300, height = 100, color1 = '#3b82f6', color2 = '#8b5cf6' }) {
    const [hover, setHover] = useState(false);
    const stripH = 30;
    const gap = 15;
    
    return (
        <div 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            style={{ width, height, cursor: 'pointer', margin: '0 auto' }}
        >
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ display: 'block' }}>
                {/* Strip 1 */}
                <rect x="0" y="10" width={width} height={stripH} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" rx="4" />
                {Array.from({ length: den1 }).map((_, i) => (
                    <g key={`d1-${i}`}>
                        {i < num1 && <rect x={i * (width/den1)} y="10" width={(width/den1)} height={stripH} fill={color1} />}
                        <rect x={i * (width/den1)} y="10" width={(width/den1)} height={stripH} fill="none" stroke="#cbd5e1" strokeWidth="2" />
                    </g>
                ))}
                
                {/* Strip 2 - Animates opacity on hover for "reveal" effect */}
                <rect x="0" y={10 + stripH + gap} width={width} height={stripH} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" rx="4" style={{ transition: 'fill 0.3s' }} />
                {Array.from({ length: den2 }).map((_, i) => (
                    <g key={`d2-${i}`}>
                        {i < num2 && (
                            <rect 
                                x={i * (width/den2)} y={10 + stripH + gap} width={(width/den2)} height={stripH} 
                                fill={color2} 
                                style={{ opacity: hover ? 1 : 0.4, transition: 'opacity 0.4s' }}
                            />
                        )}
                        <rect x={i * (width/den2)} y={10 + stripH + gap} width={(width/den2)} height={stripH} fill="none" stroke="#cbd5e1" strokeWidth="2" />
                    </g>
                ))}
                
                {/* Labels */}
                <text x={width/2} y={15 + stripH/2} fill="#fff" fontFamily="Outfit" fontSize="16" fontWeight="bold" textAnchor="middle">{num1}/{den1}</text>
                <text x={width/2} y={15 + stripH + gap + stripH/2} fill={hover ? '#fff' : color2} fontFamily="Outfit" fontSize="16" fontWeight="bold" textAnchor="middle" style={{ transition: 'fill 0.4s' }}>{num2}/{den2}</text>
            </svg>
            {!hover && <div style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', marginTop: -5 }}>Hover to compare!</div>}
        </div>
    );
}

// ➕ 5. Fraction Addition Equation Visualizer
export function AdditionVisualizer({ num1=1, den1=4, num2=2, den2=4, resultColor='#f97316' }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 2);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const rectW = 60;
    const rectH = 60;

    const renderBlock = (num, den, color, cx) => (
        <g transform={`translate(${cx}, 10)`}>
            <rect x="0" y="0" width={rectW} height={rectH} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" rx="4" />
            {Array.from({ length: den }).map((_, i) => (
                <g key={i}>
                    {i < num && <rect x={i * (rectW/den)} y="0" width={(rectW/den)} height={rectH} fill={color} />}
                    <rect x={i * (rectW/den)} y="0" width={(rectW/den)} height={rectH} fill="none" stroke="#cbd5e1" strokeWidth="1" />
                </g>
            ))}
            <text x={rectW/2} y={rectH + 25} fill={color} fontFamily="Outfit" fontSize="18" fontWeight="bold" textAnchor="middle">{num}/{den}</text>
        </g>
    );

    return (
        <svg viewBox="0 0 320 110" width="100%" height="110" style={{ maxWidth: 320, display: 'block', margin: '0 auto' }}>
            {/* The pieces merging animation */}
            <g style={{ transition: 'transform 0.8s', transform: step === 1 ? 'translate(30px, 0)' : 'translate(0, 0)' }}>
                {renderBlock(num1, den1, '#3b82f6', 0)}
            </g>
            
            <text x="80" y="48" fill="#64748b" fontFamily="Outfit" fontSize="24" fontWeight="bold" textAnchor="middle" style={{ opacity: step === 0 ? 1 : 0, transition: 'opacity 0.4s' }}>+</text>
            
            <g style={{ transition: 'transform 0.8s', transform: step === 1 ? 'translate(-30px, 0)' : 'translate(0, 0)' }}>
                {renderBlock(num2, den2, '#10b981', 100)}
            </g>

            <text x="180" y="48" fill="#64748b" fontFamily="Outfit" fontSize="24" fontWeight="bold" textAnchor="middle">=</text>
            
            {/* The result block */}
            <g style={{ opacity: step === 1 ? 1 : 0.2, transition: 'opacity 0.8s', transform: step === 1 ? 'scale(1.05)' : 'scale(1)', transformOrigin: '230px 40px' }}>
                {renderBlock(num1 + num2, den1, resultColor, 200)}
            </g>
        </svg>
    );
}
