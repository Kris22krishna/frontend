import React, { useRef } from 'react';

// A reusable SVG Cartesian plane strictly for [-10, 10] range
export default function CGSvgGraph({
    size = 320,
    points = [],           // [{ x, y, color?, label? }]
    interactive = false,   // if true, allows clicking to get coords
    onPlot = null,         // callback({x, y}) when clicked
    userPoint = null,      // point currently placed by user
    hideLabels = false,    // if true, won't show the numbering
}) {
    const svgRef = useRef(null);

    const min = -10;
    const max = 10;
    const range = max - min;
    const step = 1;

    // Convert (x, y) in math coordinates to SVG coordinates
    const toPx = (x, y) => {
        const px = ((x - min) / range) * size;
        const py = (1 - (y - min) / range) * size;
        return { px, py };
    };

    const handleSvgClick = (e) => {
        if (!interactive || !onPlot) return;
        const svg = svgRef.current;
        if (!svg) return;

        const rect = svg.getBoundingClientRect();
        const rawPx = e.clientX - rect.left;
        const rawPy = e.clientY - rect.top;

        // Convert raw pixels to math coords
        const mathX = min + (rawPx / size) * range;
        const mathY = min + (1 - rawPy / size) * range;

        // Snap to nearest integer
        const snappedX = Math.round(mathX);
        const snappedY = Math.round(mathY);

        if (snappedX >= min && snappedX <= max && snappedY >= min && snappedY <= max) {
            onPlot({ x: snappedX, y: snappedY });
        }
    };

    const gridLines = [];
    const tickLabels = [];

    // Pre-calculate origin zero coordinates
    const { px: zeroX, py: zeroY } = toPx(0, 0);

    for (let i = min; i <= max; i += step) {
        const { px, py } = toPx(i, i);

        // Grid lines
        // Vertical line at x = i
        gridLines.push(
            <line
                key={`v${i}`}
                x1={px} y1={0} x2={px} y2={size}
                stroke={i === 0 ? '#1e293b' : '#e2e8f0'}
                strokeWidth={i === 0 ? 2 : 1}
            />
        );

        // Horizontal line at y = i
        gridLines.push(
            <line
                key={`h${i}`}
                x1={0} y1={py} x2={size} y2={py}
                stroke={i === 0 ? '#1e293b' : '#e2e8f0'}
                strokeWidth={i === 0 ? 2 : 1}
            />
        );

        if (!hideLabels && i !== 0 && i % 2 === 0) {
            // Label along X-axis
            tickLabels.push(
                <text key={`tx${i}`} x={px} y={zeroY + 14} textAnchor="middle" fontSize={10} fill="#64748b" fontFamily="Open Sans, sans-serif" fontWeight="600">
                    {i}
                </text>
            );

            // Label along Y-axis
            tickLabels.push(
                <text key={`ty${i}`} x={zeroX - 6} y={py + 4} textAnchor="end" fontSize={10} fill="#64748b" fontFamily="Open Sans, sans-serif" fontWeight="600">
                    {i}
                </text>
            );
        }
    }

    // Origin label
    if (!hideLabels) {
        tickLabels.push(
            <text key="t0" x={zeroX - 6} y={zeroY + 12} textAnchor="end" fontSize={10} fill="#64748b" fontFamily="Open Sans, sans-serif" fontWeight="600">
                0
            </text>
        );
    }

    return (
        <svg
            ref={svgRef}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{
                background: '#fff',
                cursor: interactive ? 'crosshair' : 'default',
                display: 'block',
                maxWidth: '100%',
                borderRadius: 8,
                border: '1.5px solid #cbd5e1'
            }}
            onClick={handleSvgClick}
        >
            {gridLines}
            {tickLabels}

            {/* Axis Titles */}
            <text x={size - 10} y={zeroY - 8} textAnchor="end" fontSize={12} fill="#0f172a" fontWeight="800" fontFamily="Open Sans, sans-serif">X</text>
            <text x={zeroX + 8} y={16} textAnchor="start" fontSize={12} fill="#0f172a" fontWeight="800" fontFamily="Open Sans, sans-serif">Y</text>

            {/* Provided Points */}
            {points.map((pt, idx) => {
                const { px, py } = toPx(pt.x, pt.y);
                return (
                    <g key={`pt${idx}`}>
                        <circle cx={px} cy={py} r={5} fill={pt.color || '#ef4444'} />
                        {pt.label && (
                            <text
                                x={px + 8}
                                y={py - 8}
                                fill={pt.color || '#ef4444'}
                                fontSize={14}
                                fontWeight="800"
                                fontFamily="Open Sans, sans-serif"
                            >
                                {pt.label}
                            </text>
                        )}
                    </g>
                );
            })}

            {/* User Plotted Point */}
            {userPoint && (
                <g>
                    {/* Crosshairs to show alignment */}
                    <line x1={toPx(userPoint.x, 0).px} y1={0} x2={toPx(userPoint.x, 0).px} y2={size} stroke="#0ea5e9" strokeWidth={1} strokeDasharray="4,4" opacity={0.6} />
                    <line x1={0} y1={toPx(0, userPoint.y).py} x2={size} y2={toPx(0, userPoint.y).py} stroke="#0ea5e9" strokeWidth={1} strokeDasharray="4,4" opacity={0.6} />
                    <circle cx={toPx(userPoint.x, userPoint.y).px} cy={toPx(userPoint.x, userPoint.y).py} r={6} fill="#0ea5e9" stroke="#fff" strokeWidth={2} />
                </g>
            )}
        </svg>
    );
}
