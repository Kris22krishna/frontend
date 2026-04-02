import React from 'react';

export default function AreaDrawInteractive({ question, answered, userAnswer = [], onChange, color = '#10b981' }) {
    const cols = question.gridCols || 10;
    const rows = question.gridRows || 8;
    const cellSize = 40;
    const width = cols * cellSize;
    const height = rows * cellSize;

    const answerArray = Array.isArray(userAnswer) ? userAnswer : [];

    const toggleCell = (i) => {
        if (answered) return;
        if (answerArray.includes(i)) {
            onChange(answerArray.filter(x => x !== i));
        } else {
            onChange([...answerArray, i]);
        }
    };

    const cells = [];
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            const isSelected = answerArray.includes(i);
            
            cells.push(
                <rect
                    key={`cell-${i}`}
                    x={x * cellSize}
                    y={y * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill={isSelected ? `${color}40` : '#fff'}
                    stroke={isSelected ? color : '#e2e8f0'}
                    strokeWidth={isSelected ? 3 : 1}
                    style={{ cursor: answered ? 'default' : 'pointer', transition: 'all 0.1s' }}
                    onClick={() => toggleCell(i)}
                />
            );
        }
    }

    // Optional: if the question needs to show a boundary target
    const boundary = question.boundaryPath ? (
        <path d={question.boundaryPath} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" />
    ) : null;

    return (
        <div style={{ textAlign: 'center', userSelect: 'none' }}>
            <div style={{ display: 'inline-block', position: 'relative', background: '#fff', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
                    {/* Render cells first */}
                    <g>{cells}</g>
                    {/* Render boundary over cells */}
                    {boundary}
                </svg>
                <div style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: '#64748b' }}>
                    Area Shaded: <span style={{ color: color, fontSize: 20, fontWeight: 900 }}>{answerArray.length}</span> sq units
                </div>
            </div>
        </div>
    );
}
