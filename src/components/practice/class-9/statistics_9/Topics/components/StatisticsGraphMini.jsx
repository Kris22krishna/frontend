import React from 'react';

export const StatisticsGraphMini = ({ config }) => {
    if (!config) return null;

    const SVGChartWrapper = ({ children, viewBox = "0 0 300 200", style }) => (
        <svg
            viewBox={viewBox}
            style={{ width: '100%', maxWidth: 360, height: 'auto', overflow: 'visible', ...style }}
        >
            {children}
        </svg>
    );

    const originX = 30;
    const originY = 160;
    const chartWidth = 240;
    const chartHeight = 130;

    if (config.type === 'bar-graph') {
        const { data } = config;
        const maxVal = Math.max(...data.map(d => d.value), 50);
        return (
            <SVGChartWrapper>
                <line x1={originX} y1={20} x2={originX} y2={originY} stroke="#334155" strokeWidth="2" />
                <line x1={originX} y1={originY} x2={originX + chartWidth} y2={originY} stroke="#334155" strokeWidth="2" />
                {[0, maxVal/2, maxVal].map((tick, i) => {
                    const yPos = originY - (tick/maxVal) * chartHeight;
                    return (
                        <g key={i}>
                            <text x={originX - 5} y={yPos + 4} fontSize="10" fill="#64748b" textAnchor="end">{tick}</text>
                            {tick > 0 && <line x1={originX} y1={yPos} x2={originX + chartWidth} y2={yPos} stroke="#e2e8f0" strokeDasharray="4 4" />}
                        </g>
                    )
                })}
                {data.map((d, i) => {
                    const w = 30;
                    const gap = 15;
                    const xPos = originX + gap + i * (w + gap);
                    const h = (d.value/maxVal) * chartHeight;
                    return (
                        <g key={i}>
                            <rect x={xPos} y={originY - h} width={w} height={h} fill="#bae6fd" stroke="#0f4c81" />
                            <text x={xPos + w/2} y={originY + 15} fontSize="10" fill="#334155" textAnchor="middle">{d.label}</text>
                        </g>
                    )
                })}
            </SVGChartWrapper>
        );
    }

    if (config.type === 'histogram-uniform') {
        const { data, maxVal } = config;
        return (
            <SVGChartWrapper>
                <line x1={originX} y1={20} x2={originX} y2={originY} stroke="#334155" strokeWidth="2" />
                <line x1={originX} y1={originY} x2={originX + chartWidth} y2={originY} stroke="#334155" strokeWidth="2" />
                {data.map((d, i) => {
                    const w = 50;
                    const xPos = originX + i * w;
                    const h = (d.freq/maxVal) * chartHeight;
                    return (
                        <g key={i}>
                            <rect x={xPos} y={originY - h} width={w} height={h} fill="rgba(5, 150, 105, 0.15)" stroke="#059669" />
                            <text x={xPos} y={originY + 12} fontSize="10" fill="#334155" textAnchor="middle">{d.x}</text>
                        </g>
                    )
                })}
                <text x={originX + data.length*50} y={originY + 12} fontSize="10" fill="#334155" textAnchor="middle">{data[data.length-1].x + data[data.length-1].w}</text>
            </SVGChartWrapper>
        );
    }

    if (config.type === 'histogram-varying') {
        const { data, targetIdx } = config;
        const maxVal = Math.max(...data.map(d=>d.freq), 60);
        return (
            <SVGChartWrapper>
                <line x1={originX} y1={20} x2={originX} y2={originY} stroke="#334155" strokeWidth="2" />
                <line x1={originX} y1={originY} x2={originX + chartWidth} y2={originY} stroke="#334155" strokeWidth="2" />
                {data.map((d, i) => {
                    const scaleX = 3;
                    const w = d.w * scaleX;
                    const xPos = originX + d.x * scaleX;
                    const h = (d.freq/maxVal) * chartHeight; // showing actual freq visually
                    return (
                        <g key={i}>
                            <rect x={xPos} y={originY - h} width={w} height={h} fill={i === targetIdx ? "rgba(15, 76, 129, 0.3)" : "rgba(15, 76, 129, 0.1)"} stroke="#0f4c81" />
                            <text x={xPos} y={originY + 12} fontSize="8" fill="#334155" textAnchor="middle">{d.x}</text>
                            <text x={xPos + w/2} y={originY - h - 5} fontSize="9" fill="#0f4c81" textAnchor="middle">f={d.freq}</text>
                        </g>
                    )
                })}
                <text x={originX + (data[data.length-1].x + data[data.length-1].w)*3} y={originY + 12} fontSize="8" fill="#334155" textAnchor="middle">{data[data.length-1].x + data[data.length-1].w}</text>
            </SVGChartWrapper>
        );
    }

    if (config.type === 'frequency-polygon') {
        const { data } = config;
        const maxVal = Math.max(...data.map(d=>d.freq), 30);
        const w = 40;
        const startX = originX + 20;
        const pts = data.map((d, i) => `${startX + i*w},${originY - (d.freq/maxVal)*chartHeight}`).join(' ');
        return (
            <SVGChartWrapper>
                <line x1={originX} y1={20} x2={originX} y2={originY} stroke="#334155" strokeWidth="2" />
                <line x1={originX} y1={originY} x2={originX + chartWidth} y2={originY} stroke="#334155" strokeWidth="2" />
                <polyline points={pts} fill="none" stroke="#b71c1c" strokeWidth="2" />
                {data.map((d, i) => {
                    const cx = startX + i*w;
                    const cy = originY - (d.freq/maxVal)*chartHeight;
                    return (
                        <g key={i}>
                            <circle cx={cx} cy={cy} r="4" fill="#b71c1c" />
                            <text x={cx} y={originY + 15} fontSize="9" fill="#334155" textAnchor="middle">{d.mark}</text>
                        </g>
                    )
                })}
            </SVGChartWrapper>
        );
    }

    return null;
};
