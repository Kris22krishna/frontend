import React from 'react';

export default function CompositeDrawInteractive({ question, answered, userAnswer = [], onChange, color = '#f59e0b' }) {
    const cols = question.gridCols || 10;
    const rows = question.gridRows || 8;
    const cellSize = 40;
    const width = cols * cellSize;
    const height = rows * cellSize;

    const answerArray = Array.isArray(userAnswer) ? userAnswer : [];
    const fillCells = question.fill || [];
    const cellSet = new Set(fillCells);

    const toggleEdge = (id) => {
        if (answered) return;
        if (answerArray.includes(id)) {
            onChange(answerArray.filter(x => x !== id));
        } else {
            onChange([...answerArray, id]);
        }
    };

    const cellsLayer = [];
    for (let i of fillCells) {
        const x = i % cols;
        const y = Math.floor(i / cols);
        cellsLayer.push(<rect key={`c_${i}`} x={x*cellSize} y={y*cellSize} width={cellSize} height={cellSize} fill={`${color}15`} />);
    }

    const linesLayer = [];
    const interactiveLayer = [];

    // Horizontal edges
    for (let y = 0; y <= rows; y++) {
        for (let x = 0; x < cols; x++) {
            const above = (y - 1) * cols + x;
            const below = y * cols + x;
            const hasAbove = y > 0 && cellSet.has(above);
            const hasBelow = y < rows && cellSet.has(below);

            if (hasAbove !== hasBelow) {
                // Outer boundary
                linesLayer.push(
                    <line key={`bd_h_${x}_${y}`} x1={x*cellSize} y1={y*cellSize} x2={(x+1)*cellSize} y2={y*cellSize} stroke={color} strokeWidth={3} strokeLinecap="round" />
                );
            } else if (hasAbove && hasBelow) {
                // Inner edge - clickable!
                const id = `h_${x}_${y}`;
                const isSelected = answerArray.includes(id);
                interactiveLayer.push(
                    <g key={id} onClick={() => toggleEdge(id)} style={{ cursor: answered ? 'default' : 'pointer' }}>
                        <line x1={x*cellSize} y1={y*cellSize} x2={(x+1)*cellSize} y2={y*cellSize} stroke={isSelected ? '#ef4444' : '#e2e8f0'} strokeWidth={isSelected ? 6 : 1.5} strokeDasharray={isSelected ? 'none' : '4 4'} strokeLinecap="round" style={{ transition: 'all 0.1s' }} />
                        <line x1={x*cellSize} y1={y*cellSize} x2={(x+1)*cellSize} y2={y*cellSize} stroke="transparent" strokeWidth={24} />
                    </g>
                );
            }
        }
    }

    // Vertical edges
    for (let x = 0; x <= cols; x++) {
        for (let y = 0; y < rows; y++) {
            const left = y * cols + (x - 1);
            const right = y * cols + x;
            const hasLeft = x > 0 && cellSet.has(left);
            const hasRight = x < cols && cellSet.has(right);

            if (hasLeft !== hasRight) {
                // Outer boundary
                linesLayer.push(
                    <line key={`bd_v_${x}_${y}`} x1={x*cellSize} y1={y*cellSize} x2={x*cellSize} y2={(y+1)*cellSize} stroke={color} strokeWidth={3} strokeLinecap="round" />
                );
            } else if (hasLeft && hasRight) {
                // Inner edge - clickable!
                const id = `v_${x}_${y}`;
                const isSelected = answerArray.includes(id);
                interactiveLayer.push(
                    <g key={id} onClick={() => toggleEdge(id)} style={{ cursor: answered ? 'default' : 'pointer' }}>
                        <line x1={x*cellSize} y1={y*cellSize} x2={x*cellSize} y2={(y+1)*cellSize} stroke={isSelected ? '#ef4444' : '#e2e8f0'} strokeWidth={isSelected ? 6 : 1.5} strokeDasharray={isSelected ? 'none' : '4 4'} strokeLinecap="round" style={{ transition: 'all 0.1s' }} />
                        <line x1={x*cellSize} y1={y*cellSize} x2={x*cellSize} y2={(y+1)*cellSize} stroke="transparent" strokeWidth={24} />
                    </g>
                );
            }
        }
    }

    return (
        <div style={{ textAlign: 'center', userSelect: 'none' }}>
            <div style={{ display: 'inline-block', position: 'relative', background: '#fff', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
                    <g>{cellsLayer}</g>
                    <g>{interactiveLayer}</g>
                    <g>{linesLayer}</g>
                </svg>
                <div style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: '#64748b' }}>
                    Split Lines Drawn: <span style={{ color: '#ef4444', fontSize: 20, fontWeight: 900 }}>{answerArray.length}</span>
                </div>
            </div>
        </div>
    );
}
