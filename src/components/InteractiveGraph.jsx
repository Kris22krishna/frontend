import React, { useState, useRef, useEffect } from 'react';

const InteractiveGraph = ({ onLinesUpdate, maxLines = 2, readOnly = false, initialLines = [], size = 400, onExpand, showControls = true }) => {
    const [points, setPoints] = useState([]);
    const [lines, setLines] = useState(initialLines);
    const svgRef = useRef(null);

    // Coordinate System Config
    const GRID_SIZE = 20; // Needs to match logical size (-10 to 10)
    const SVG_SIZE = size;
    const PADDING = 35; // Slightly reduced to give more space for the grid
    const LABEL_OFFSET = 20;
    const DRAWABLE_SIZE = SVG_SIZE - 2 * PADDING;
    const SCALE = DRAWABLE_SIZE / GRID_SIZE;
    const CENTER = SVG_SIZE / 2;

    // Convert Logical (x, y) to SVG (cx, cy)
    const toSVG = (x, y) => ({
        cx: CENTER + x * SCALE,
        cy: CENTER - y * SCALE
    });

    // Convert SVG (cx, cy) to Logical (x, y) (Rounded to nearest integer)
    const toLogical = (cx, cy) => {
        const x = Math.round((cx - CENTER) / SCALE);
        const y = Math.round((CENTER - cy) / SCALE);
        return { x, y };
    };

    const [hoverPos, setHoverPos] = useState(null);

    const handleMouseMove = (e) => {
        if (readOnly) return;
        const rect = svgRef.current.getBoundingClientRect();
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;
        const { x, y } = toLogical(rawX, rawY);
        // Only update if within bounds
        if (x >= -10 && x <= 10 && y >= -10 && y <= 10) {
            setHoverPos({ x, y });
        } else {
            setHoverPos(null);
        }
    };

    const handleMouseLeave = () => setHoverPos(null);

    const handleClick = (e) => {
        if (readOnly) {
            if (onExpand) onExpand();
            return;
        }
        if (lines.length >= maxLines) return;

        const rect = svgRef.current.getBoundingClientRect();
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;

        const { x, y } = toLogical(rawX, rawY);

        // Prevent duplicate points or points outside range
        if (x < -10 || x > 10 || y < -10 || y > 10) return;

        const newPoints = [...points, { x, y }];

        if (newPoints.length === 2) {
            // Form a line
            const newLine = { p1: newPoints[0], p2: newPoints[1] };
            const updatedLines = [...lines, newLine];
            setLines(updatedLines);
            setPoints([]); // Reset points for next line
            onLinesUpdate(updatedLines); // Notify parent
        } else {
            setPoints(newPoints);
        }
    };

    const handleClear = () => {
        setLines([]);
        setPoints([]);
        onLinesUpdate([]);
    };

    // Helper to extend line to edge of graph for visualization
    const getExtendedLineCoords = (p1, p2) => {
        // y - y1 = m(x - x1)
        // If vertical x = p1.x
        if (p1.x === p2.x) {
            const start = toSVG(p1.x, -10);
            const end = toSVG(p1.x, 10);
            return { x1: start.cx, y1: start.cy, x2: end.cx, y2: end.cy };
        }

        const m = (p2.y - p1.y) / (p2.x - p1.x);
        const c = p1.y - m * p1.x;

        // Calculate intersection with boundaries y = 10, y = -10, x = 10, x = -10
        // We just need two points far enough apart
        const xMin = -10;
        const yAtMin = m * xMin + c;
        const xMax = 10;
        const yAtMax = m * xMax + c;

        const start = toSVG(xMin, yAtMin);
        const end = toSVG(xMax, yAtMax);
        return { x1: start.cx, y1: start.cy, x2: end.cx, y2: end.cy };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <svg
                ref={svgRef}
                width={SVG_SIZE}
                height={SVG_SIZE}
                style={{ background: '#fff', border: 'none', cursor: readOnly ? 'default' : 'none' }} // Borderless for cleaner look
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <defs>
                    <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" transform="rotate(180 4.5 3)" />
                    </marker>
                    <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
                    </marker>
                    <marker id="line-arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#4F46E5" transform="rotate(180 4.5 3)" />
                    </marker>
                    <marker id="line-arrow-end" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#4F46E5" />
                    </marker>
                </defs>
                {/* Hover Indicator */}
                {!readOnly && hoverPos && (
                    <>
                        <circle cx={toSVG(hoverPos.x, hoverPos.y).cx} cy={toSVG(hoverPos.x, hoverPos.y).cy} r="6" fill="rgba(79, 70, 229, 0.2)" />
                        <text x={toSVG(hoverPos.x, hoverPos.y).cx + 10} y={toSVG(hoverPos.x, hoverPos.y).cy - 10} fontSize="11" fill="#4F46E5" fontWeight="bold">
                            ({hoverPos.x}, {hoverPos.y})
                        </text>
                    </>
                )}
                {/* Grid Lines & Labels */}
                {Array.from({ length: 21 }).map((_, i) => {
                    const val = i - 10;
                    if (val === 0) return null; // Skip 0 for now, handle with axes
                    const pos = CENTER + val * SCALE;

                    return (
                        <React.Fragment key={i}>
                            {/* Grid Lines - subtle */}
                            <line x1={PADDING} y1={pos} x2={SVG_SIZE - PADDING} y2={pos} stroke="#f1f5f9" strokeWidth="1" />
                            <line x1={pos} y1={PADDING} x2={pos} y2={SVG_SIZE - PADDING} stroke="#f1f5f9" strokeWidth="1" />

                            {/* X-Axis Labels (at y=0) */}
                            <text
                                x={pos}
                                y={CENTER + 18}
                                fontSize="9"
                                fill="#64748b"
                                textAnchor="middle"
                                style={{ pointerEvents: 'none', userSelect: 'none' }}
                            >
                                {val}
                            </text>

                            {/* Y-Axis Labels (at x=0) */}
                            <text
                                x={CENTER - 8}
                                y={pos + 4}
                                fontSize="9"
                                fill="#64748b"
                                textAnchor="end"
                                style={{ pointerEvents: 'none', userSelect: 'none' }}
                            >
                                {-val}
                            </text>
                        </React.Fragment>
                    );
                })}

                {/* Center 0 Label */}
                <text x={CENTER - 6} y={CENTER + 14} fontSize="9" fill="#64748b" style={{ pointerEvents: 'none', userSelect: 'none' }}>0</text>

                {/* Axes with Arrows */}
                <line x1={PADDING - 10} y1={CENTER} x2={SVG_SIZE - PADDING + 10} y2={CENTER} stroke="#64748b" strokeWidth="1.5" marker-end="url(#arrow-end)" marker-start="url(#arrow-start)" />
                <line x1={CENTER} y1={SVG_SIZE - PADDING + 10} x2={CENTER} y2={PADDING - 10} stroke="#64748b" strokeWidth="1.5" marker-end="url(#arrow-end)" marker-start="url(#arrow-start)" />

                {/* Axis Labels */}
                <text x={SVG_SIZE - PADDING + 15} y={CENTER - 5} fontSize="12" fill="#334155" fontWeight="bold">x</text>
                <text x={CENTER + 8} y={PADDING - 15} fontSize="12" fill="#334155" fontWeight="bold">y</text>

                {/* Drawn Lines */}
                {lines.map((line, idx) => {
                    const coords = getExtendedLineCoords(line.p1, line.p2);
                    return (
                        <line
                            key={idx}
                            x1={coords.x1} y1={coords.y1}
                            x2={coords.x2} y2={coords.y2}
                            stroke="#4F46E5"
                            strokeWidth="2.5"
                            marker-start="url(#line-arrow-start)"
                            marker-end="url(#line-arrow-end)"
                        />
                    );
                })}

                {/* Points being plotted (The first click of a pair) */}
                {points.map((p, idx) => {
                    const { cx, cy } = toSVG(p.x, p.y);
                    return <circle key={'p' + idx} cx={cx} cy={cy} r="4" fill="#6366f1" />;
                })}

                {/* Line Vertices (Visual indicators for completed lines) */}
                {lines.map((line, idx) => (
                    <React.Fragment key={'v' + idx}>
                        <circle cx={toSVG(line.p1.x, line.p1.y).cx} cy={toSVG(line.p1.x, line.p1.y).cy} r="3" fill="#4F46E5" />
                        <circle cx={toSVG(line.p2.x, line.p2.y).cx} cy={toSVG(line.p2.x, line.p2.y).cy} r="3" fill="#4F46E5" />
                    </React.Fragment>
                ))}

            </svg>

            {showControls && !readOnly && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', textAlign: 'center' }}>
                        {lines.map((l, i) => (
                            <div key={i}>Line {i + 1}: ({l.p1.x}, {l.p1.y}) to ({l.p2.x}, {l.p2.y})</div>
                        ))}
                        {points.map((p, i) => (
                            <div key={'tmp' + i} style={{ color: '#6366f1' }}>Selecting point: ({p.x}, {p.y})...</div>
                        ))}
                        {lines.length === 0 && points.length === 0 && "Click to plot points"}
                    </div>
                    <button
                        onClick={handleClear}
                        style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Reset Graph
                    </button>
                </div>
            )}
        </div>
    );
};

export default InteractiveGraph;
