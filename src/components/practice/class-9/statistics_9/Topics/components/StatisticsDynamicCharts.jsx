import React, { useEffect, useState } from 'react';

// Common SVG Wrapper
const SVGChartWrapper = ({ children, viewBox = "0 0 300 200", style }) => (
    <svg
        viewBox={viewBox}
        style={{
            width: '100%',
            maxWidth: 360,
            height: 'auto',
            overflow: 'visible',
            ...style
        }}
    >
        {children}
    </svg>
);

// ─── 1. BAR GRAPH CHART ─────────────────────────────────────────────────────────
export const BarGraphChart = () => {
    const [highlight, setHighlight] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => setHighlight(p => (p + 1) % 4), 1500);
        return () => clearInterval(interval);
    }, []);

    const data = [
        { label: 'A', value: 40, showVal: 40 },
        { label: 'B', value: 70, showVal: 70 },
        { label: 'C', value: 50, showVal: 50 },
        { label: 'D', value: 90, showVal: 90 }
    ];

    const maxVal = 100;
    const chartHeight = 140;
    const chartWidth = 240;
    const originX = 30;
    const originY = 160;

    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            {/* Y Axis line */}
            <line x1={originX} y1="20" x2={originX} y2={originY} stroke="#334155" strokeWidth="2" />
            {/* X Axis line */}
            <line x1={originX} y1={originY} x2={originX + chartWidth + 20} y2={originY} stroke="#334155" strokeWidth="2" />

            {/* Y Axis ticks */}
            {[0, 25, 50, 75, 100].map((tick, i) => {
                const yPos = originY - (tick / maxVal) * chartHeight;
                return (
                    <g key={i}>
                        <line x1={originX - 4} y1={yPos} x2={originX} y2={yPos} stroke="#334155" strokeWidth="2" />
                        <text x={originX - 8} y={yPos + 4} fontSize="10" fill="#64748b" textAnchor="end">{tick}</text>
                        {tick > 0 && <line x1={originX} y1={yPos} x2={originX + chartWidth} y2={yPos} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />}
                    </g>
                );
            })}

            {/* Bars */}
            {data.map((d, i) => {
                const barWidth = 30;
                const gap = 20;
                const xPos = originX + gap + i * (barWidth + gap);
                const barHeight = (d.value / maxVal) * chartHeight;
                const yPos = originY - barHeight;
                const isH = highlight === i;

                return (
                    <g key={i}>
                        <rect 
                            x={xPos} 
                            y={yPos} 
                            width={barWidth} 
                            height={barHeight} 
                            fill={isH ? '#0f4c81' : '#bae6fd'} 
                            stroke="#0f4c81"
                            strokeWidth="2"
                            style={{ transition: 'all 0.4s' }}
                        />
                        <text x={xPos + barWidth / 2} y={originY + 15} fontSize="12" fill="#334155" textAnchor="middle" fontWeight="bold">{d.label}</text>
                        {isH && (
                            <text x={xPos + barWidth / 2} y={yPos - 8} fontSize="12" fill="#0f4c81" textAnchor="middle" fontWeight="bold">
                                {d.showVal}
                            </text>
                        )}
                    </g>
                );
            })}
        </SVGChartWrapper>
    );
};

// ─── 2. HISTOGRAM CHART (Uniform Width) ──────────────────────────────────────────
export const HistogramChart = () => {
    const data = [
        { label: '0-10', value: 20 },
        { label: '10-20', value: 50 },
        { label: '20-30', value: 80 },
        { label: '30-40', value: 40 },
        { label: '40-50', value: 60 }
    ];

    const maxVal = 100;
    const chartHeight = 140;
    const chartWidth = 240;
    const originX = 30;
    const originY = 160;
    const barWidth = 40; // No gaps

    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            {/* Axes */}
            <line x1={originX} y1="20" x2={originX} y2={originY} stroke="#334155" strokeWidth="2" />
            <line x1={originX} y1={originY} x2={originX + chartWidth + 10} y2={originY} stroke="#334155" strokeWidth="2" />

            {/* Y Ticks */}
            {[0, 50, 100].map((tick, i) => {
                const yPos = originY - (tick / maxVal) * chartHeight;
                return (
                    <g key={i}>
                        <text x={originX - 5} y={yPos + 4} fontSize="10" fill="#64748b" textAnchor="end">{tick}</text>
                        {tick > 0 && <line x1={originX} y1={yPos} x2={originX + chartWidth} y2={yPos} stroke="#e2e8f0" strokeWidth="1" />}
                    </g>
                );
            })}

            {/* Histogram Bars */}
            {data.map((d, i) => {
                const xPos = originX + i * barWidth;
                const barHeight = (d.value / maxVal) * chartHeight;
                const yPos = originY - barHeight;

                return (
                    <g key={i}>
                        <rect 
                            x={xPos} 
                            y={yPos} 
                            width={barWidth} 
                            height={barHeight} 
                            fill="rgba(5, 150, 105, 0.15)"
                            stroke="#059669"
                            strokeWidth="1.5"
                        />
                        {/* X-axis boundaries */}
                        <text x={xPos} y={originY + 12} fontSize="10" fill="#334155" textAnchor="middle">{d.label.split('-')[0]}</text>
                    </g>
                );
            })}
            <text x={originX + data.length * barWidth} y={originY + 12} fontSize="10" fill="#334155" textAnchor="middle">50</text>
        </SVGChartWrapper>
    );
};

// ─── 3. FREQUENCY POLYGON CHART ──────────────────────────────────────────────────
export const FrequencyPolygonChart = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setStep(p => (p + 1) % 3), 2000); // 0: hist, 1: points, 2: lines
        return () => clearInterval(interval);
    }, []);

    const data = [
        { x: 10, y: 0 },
        { x: 20, y: 30 },
        { x: 30, y: 70 },
        { x: 40, y: 50 },
        { x: 50, y: 80 },
        { x: 60, y: 20 },
        { x: 70, y: 0 }
    ];

    const maxVal = 100;
    const chartHeight = 140;
    const originX = 30;
    const originY = 160;
    const xInterval = 30;

    const pointsStr = data.map((d, i) => {
        const px = originX + i * xInterval;
        const py = originY - (d.y / maxVal) * chartHeight;
        return `${px},${py}`;
    }).join(' ');

    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            {/* Axes */}
            <line x1={originX} y1="20" x2={originX} y2={originY} stroke="#334155" strokeWidth="2" />
            <line x1={originX} y1={originY} x2={originX + 220} y2={originY} stroke="#334155" strokeWidth="2" />

            {/* Hidden Histogram Outline (Step 0) */}
            {step === 0 && data.map((d, i) => {
                if (i === 0 || i === data.length - 1) return null;
                const px = originX + i * xInterval;
                const py = originY - (d.y / maxVal) * chartHeight;
                return (
                    <rect 
                        key={i}
                        x={px - xInterval/2} 
                        y={py} 
                        width={xInterval} 
                        height={(d.y / maxVal) * chartHeight} 
                        fill="rgba(183, 28, 28, 0.05)"
                        stroke="#b71c1c"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                    />
                );
            })}

            {/* Polygon Lines (Step 2) */}
            {(step === 2 || step === 1) && (
                <polyline points={pointsStr} fill="rgba(183, 28, 28, 0.1)" stroke="#b71c1c" strokeWidth={step === 2 ? "3" : "1"} />
            )}

            {/* Midpoints (Step 1 & 2) */}
            {(step === 1 || step === 2) && data.map((d, i) => {
                const px = originX + i * xInterval;
                const py = originY - (d.y / maxVal) * chartHeight;
                return (
                    <circle key={i} cx={px} cy={py} r="4" fill="#b71c1c" />
                );
            })}

            {/* X-axis labels */}
            {data.map((d, i) => {
                const px = originX + i * xInterval;
                return (
                    <text key={i} x={px} y={originY + 15} fontSize="9" fill="#64748b" textAnchor="middle">{d.x}</text>
                );
            })}
        </SVGChartWrapper>
    );
};

// ─── 4. VARYING WIDTH HISTOGRAM ───────────────────────────────────────────────
export const VaryingHistogramChart = () => {
    // data: x is start, w is width, y is actual frequency, ha is adjusted height (for area prop)
    const data = [
        { x: 0,  w: 20, y: 10, ha: 10 },
        { x: 20, w: 10, y: 15, ha: 30 }, // narrower, taller proportionally
        { x: 30, w: 10, y: 20, ha: 40 },
        { x: 40, w: 30, y: 15, ha: 10 }  // wider, shorter proportionally
    ];

    const maxHa = 50;
    const chartHeight = 140;
    const originX = 30;
    const originY = 160;
    const scaleX = 2.5;

    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            {/* Axes */}
            <line x1={originX} y1="20" x2={originX} y2={originY} stroke="#334155" strokeWidth="2" />
            <line x1={originX} y1={originY} x2={originX + 200} y2={originY} stroke="#334155" strokeWidth="2" />

            {/* Ticks */}
            {[0, 20, 30, 40, 70].map((tick, i) => (
                <g key={i}>
                    <line x1={originX + tick * scaleX} y1={originY} x2={originX + tick * scaleX} y2={originY + 4} stroke="#334155" />
                    <text x={originX + tick * scaleX} y={originY + 14} fontSize="9" fill="#334155" textAnchor="middle">{tick}</text>
                </g>
            ))}

            {/* Bars */}
            {data.map((d, i) => {
                const xPos = originX + d.x * scaleX;
                const bWidth = d.w * scaleX;
                const bHeight = (d.ha / maxHa) * chartHeight;
                const yPos = originY - bHeight;

                return (
                    <g key={i}>
                        <rect 
                            x={xPos} 
                            y={yPos} 
                            width={bWidth} 
                            height={bHeight} 
                            fill="rgba(15, 76, 129, 0.1)"
                            stroke="#0f4c81"
                            strokeWidth="1.5"
                        />
                        {/* Show adjusted frequency or density */}
                        <text x={xPos + bWidth/2} y={yPos - 5} fontSize="9" fill="#0f4c81" textAnchor="middle" fontWeight="bold">adj={d.ha}</text>
                    </g>
                );
            })}
        </SVGChartWrapper>
    );
};

// ─── 5. DATA SOURCES CHART ───────────────────────────────────────────────────
export const DataSourcesChart = () => (
    <SVGChartWrapper viewBox="0 0 300 200">
        {/* Primary Data */}
        <rect x="30" y="40" width="100" height="120" rx="10" fill="#bae6fd" stroke="#0f4c81" strokeWidth="2" />
        <circle cx="80" cy="80" r="20" fill="none" stroke="#0f4c81" strokeWidth="3" />
        <line x1="95" y1="95" x2="110" y2="110" stroke="#0f4c81" strokeWidth="4" />
        <text x="80" y="135" fontSize="12" fill="#0f4c81" textAnchor="middle" fontWeight="bold">PRIMARY</text>
        <text x="80" y="150" fontSize="10" fill="#475569" textAnchor="middle">Original</text>

        {/* Secondary Data */}
        <rect x="170" y="40" width="100" height="120" rx="10" fill="#e0e7ff" stroke="#3730a3" strokeWidth="2" />
        <path d="M 185 80 L 255 80 M 185 95 L 255 95 M 185 110 L 230 110" stroke="#3730a3" strokeWidth="3" strokeLinecap="round" />
        <text x="220" y="135" fontSize="12" fill="#3730a3" textAnchor="middle" fontWeight="bold">SECONDARY</text>
        <text x="220" y="150" fontSize="10" fill="#475569" textAnchor="middle">Existing records</text>
    </SVGChartWrapper>
);

// ─── 6. RAW DATA RANGE CHART ──────────────────────────────────────────────────
export const RawDataRangeChart = () => (
    <SVGChartWrapper viewBox="0 0 300 200">
        <line x1="30" y1="160" x2="270" y2="160" stroke="#334155" strokeWidth="2" />
        <circle cx="50" cy="160" r="6" fill="#ef4444" />
        <text x="50" y="180" fontSize="10" fill="#ef4444" textAnchor="middle" fontWeight="bold">MIN (12)</text>
        
        <circle cx="120" cy="160" r="4" fill="#94a3b8" />
        <circle cx="160" cy="160" r="4" fill="#94a3b8" />
        <circle cx="210" cy="160" r="4" fill="#94a3b8" />
        
        <circle cx="250" cy="160" r="6" fill="#22c55e" />
        <text x="250" y="180" fontSize="10" fill="#22c55e" textAnchor="middle" fontWeight="bold">MAX (98)</text>

        <path d="M 50 130 C 150 70, 250 130, 250 130" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="250,130 240,125 245,120" fill="#6366f1" />
        <polygon points="50,130 60,125 55,120" fill="#6366f1" />
        <text x="150" y="90" fontSize="12" fill="#6366f1" textAnchor="middle" fontWeight="bold">RANGE</text>
        <text x="150" y="105" fontSize="10" fill="#6366f1" textAnchor="middle">98 - 12 = 86</text>
    </SVGChartWrapper>
);

// ─── 7. CLASS MARKS CHART ─────────────────────────────────────────────────────
export const ClassMarksChart = () => (
    <SVGChartWrapper viewBox="0 0 300 200">
        <line x1="30" y1="150" x2="270" y2="150" stroke="#334155" strokeWidth="2" />
        <rect x="80" y="80" width="140" height="70" fill="rgba(15, 76, 129, 0.1)" stroke="#0f4c81" strokeWidth="2" />
        
        <line x1="80" y1="145" x2="80" y2="155" stroke="#334155" strokeWidth="2" />
        <text x="80" y="170" fontSize="12" fill="#334155" textAnchor="middle">10</text>
        <text x="80" y="185" fontSize="9" fill="#64748b" textAnchor="middle">Lower Limit</text>
        
        <line x1="220" y1="145" x2="220" y2="155" stroke="#334155" strokeWidth="2" />
        <text x="220" y="170" fontSize="12" fill="#334155" textAnchor="middle">20</text>
        <text x="220" y="185" fontSize="9" fill="#64748b" textAnchor="middle">Upper Limit</text>
        
        <line x1="150" y1="140" x2="150" y2="70" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="150" cy="150" r="5" fill="#ef4444" />
        <text x="150" y="55" fontSize="14" fill="#ef4444" textAnchor="middle" fontWeight="bold">Class-mark = 15</text>
    </SVGChartWrapper>
);

// ─── 8. ADJUSTED FREQUENCY CHART ──────────────────────────────────────────────
export const AdjustedFrequencyChart = () => {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setStep(p => (p + 1) % 2), 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            <line x1="30" y1="160" x2="270" y2="160" stroke="#334155" strokeWidth="2" />
            {/* Standard bin */}
            <rect x="50" y="60" width="40" height="100" fill="rgba(5, 150, 105, 0.2)" stroke="#059669" strokeWidth="2" />
            <text x="70" y="180" fontSize="10" fill="#334155" textAnchor="middle">Width 10</text>
            <text x="70" y="110" fontSize="10" fill="#059669" textAnchor="middle">Freq 10</text>
            
            {/* Wider bin */}
            <text x="170" y="180" fontSize="10" fill="#334155" textAnchor="middle">Width 20</text>
            {step === 0 ? (
                <g>
                    <rect x="130" y="60" width="80" height="100" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
                    <text x="170" y="50" fontSize="12" fill="#ef4444" textAnchor="middle" fontWeight="bold">Area too large!</text>
                    <text x="170" y="110" fontSize="10" fill="#ef4444" textAnchor="middle">Freq 10</text>
                </g>
            ) : (
                <g>
                    <rect x="130" y="110" width="80" height="50" fill="rgba(15, 76, 129, 0.2)" stroke="#0f4c81" strokeWidth="2" />
                    <text x="170" y="100" fontSize="12" fill="#0f4c81" textAnchor="middle" fontWeight="bold">Adjusted Area!</text>
                    <text x="170" y="140" fontSize="10" fill="#0f4c81" textAnchor="middle">Adj=5</text>
                </g>
            )}
        </SVGChartWrapper>
    );
};

