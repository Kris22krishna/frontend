import React from 'react';

export default function PerimeterDrawInteractive({ question, answered, userAnswer = [], onChange, color = '#6366f1' }) {
    const cols = question.gridCols || 10;
    const rows = question.gridRows || 8;
    const cellSize = 40;
    const width = cols * cellSize;
    const height = rows * cellSize;

    const answerArray = Array.isArray(userAnswer) ? userAnswer : [];
    const fillCells = question.fill || []; // Cells that make up the shape

    const toggleEdge = (id) => {
        if (answered) return;
        if (answerArray.includes(id)) {
            onChange(answerArray.filter(x => x !== id));
        } else {
            onChange([...answerArray, id]);
        }
    };

    // Render underlying shape cells
    const shapeLayer = [];
    for (let i of fillCells) {
        const x = i % cols;
        const y = Math.floor(i / cols);
        shapeLayer.push(
            <rect
                key={`shape-${i}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill={`${color}20`}
                stroke="none"
            />
        );
    }

    // Render grid lines & clickable edges
    const hLines = [];
    for (let y = 0; y <= rows; y++) {
        for (let x = 0; x < cols; x++) {
            const id = `h_${x}_${y}`;
            const isSelected = answerArray.includes(id);
            hLines.push(
                <g key={id} onClick={() => toggleEdge(id)} style={{ cursor: answered ? 'default' : 'pointer' }}>
                    <line x1={x * cellSize} y1={y * cellSize} x2={(x + 1) * cellSize} y2={y * cellSize} stroke={isSelected ? color : '#e2e8f0'} strokeWidth={isSelected ? 6 : 1} strokeLinecap="round" style={{ transition: 'all 0.1s' }} />
                    <line x1={x * cellSize} y1={y * cellSize} x2={(x + 1) * cellSize} y2={y * cellSize} stroke="transparent" strokeWidth={24} />
                </g>
            );
        }
    }

    const vLines = [];
    for (let x = 0; x <= cols; x++) {
        for (let y = 0; y < rows; y++) {
            const id = `v_${x}_${y}`;
            const isSelected = answerArray.includes(id);
            vLines.push(
                <g key={id} onClick={() => toggleEdge(id)} style={{ cursor: answered ? 'default' : 'pointer' }}>
                    <line x1={x * cellSize} y1={y * cellSize} x2={x * cellSize} y2={(y + 1) * cellSize} stroke={isSelected ? color : '#e2e8f0'} strokeWidth={isSelected ? 6 : 1} strokeLinecap="round" style={{ transition: 'all 0.1s' }} />
                    <line x1={x * cellSize} y1={y * cellSize} x2={x * cellSize} y2={(y + 1) * cellSize} stroke="transparent" strokeWidth={24} />
                </g>
            );
        }
    }

    return (
        <div style={{ textAlign: 'center', userSelect: 'none' }}>
            <div style={{ display: 'inline-block', position: 'relative', background: '#fff', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
                    {/* Shadow Shape Layer */}
                    <g>{shapeLayer}</g>
                    {/* Grid and Interactive Edges */}
                    <g>{hLines}</g>
                    <g>{vLines}</g>
                </svg>
                <div style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: '#64748b' }}>
                    Perimeter Traced: <span style={{ color: color, fontSize: 20, fontWeight: 900 }}>{answerArray.length}</span> units
                </div>
            </div>
        </div>
    );
}
