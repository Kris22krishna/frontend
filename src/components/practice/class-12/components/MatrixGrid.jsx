import React, { useCallback } from 'react';
import './MatrixGrid.css';

/**
 * MatrixGrid — renders (and optionally edits) a matrix with brackets.
 *
 * Props
 * ─────────────────────────────────────────────────────
 * rows        : number
 * cols        : number
 * values      : number[][]  (rows × cols)
 * editable    : boolean     (false)
 * showLabels  : boolean     (false)  — show aᵢⱼ subscript labels
 * showOrder   : boolean     (false)  — show "m × n" underneath
 * highlightCell : {i,j}|null         — single cell to pulse-highlight
 * highlightRow  : number|null        — row index to highlight (0-based)
 * highlightCol  : number|null        — col index to highlight (0-based)
 * highlightResult : {i,j}|null       — green result cell
 * onCellChange : (i, j, value) => void
 * compact     : boolean     (false)  — smaller cells
 */
const MatrixGrid = ({
    rows,
    cols,
    values,
    editable = false,
    showLabels = false,
    showOrder = false,
    highlightCell = null,
    highlightRow = null,
    highlightCol = null,
    highlightResult = null,
    onCellChange,
    compact = false,
}) => {
    const handleChange = useCallback(
        (i, j, val) => {
            if (onCellChange) {
                const num = val === '' || val === '-' ? val : isNaN(Number(val)) ? val : Number(val);
                onCellChange(i, j, num);
            }
        },
        [onCellChange]
    );

    const getCellClass = (i, j) => {
        const classes = ['matrix-cell'];
        if (editable) classes.push('editable');
        if (compact) classes.push('compact');
        if (highlightCell && highlightCell.i === i && highlightCell.j === j) classes.push('highlight');
        if (highlightRow !== null && highlightRow === i) classes.push('highlight-row');
        if (highlightCol !== null && highlightCol === j) classes.push('highlight-col');
        if (highlightResult && highlightResult.i === i && highlightResult.j === j) classes.push('highlight-result');
        return classes.join(' ');
    };

    // Bracket heights scale with rows
    const bracketH = Math.max(48, rows * 44 + (rows - 1) * 6 + 16);

    return (
        <div className="matrix-grid-container" style={{ display: 'inline-block' }}>
            <div className="matrix-grid-wrapper">
                {/* Left bracket */}
                <div className="matrix-bracket left">
                    <svg width="10" height={bracketH} viewBox={`0 0 10 ${bracketH}`} fill="none">
                        <path d={`M9 1 Q1 1 1 ${bracketH / 2} Q1 ${bracketH - 1} 9 ${bracketH - 1}`} stroke="#31326F" strokeWidth="2" fill="none" />
                    </svg>
                </div>

                {/* Grid */}
                <div
                    className="matrix-grid"
                    style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
                    role="grid"
                    aria-label={`${rows} by ${cols} matrix`}
                >
                    {Array.from({ length: rows }, (_, i) =>
                        Array.from({ length: cols }, (_, j) => {
                            const val = values && values[i] && values[i][j] !== undefined ? values[i][j] : '';
                            return (
                                <div
                                    key={`${i}-${j}`}
                                    className={getCellClass(i, j)}
                                    role="gridcell"
                                    aria-label={`row ${i + 1} column ${j + 1}: value ${val}`}
                                >
                                    {editable ? (
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={val}
                                            onChange={(e) => handleChange(i, j, e.target.value)}
                                            aria-label={`row ${i + 1} column ${j + 1}`}
                                            tabIndex={0}
                                        />
                                    ) : (
                                        <span>{val}</span>
                                    )}
                                    {showLabels && (
                                        <span className="matrix-label">
                                            a<sub>{i + 1}{j + 1}</sub>
                                        </span>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Right bracket */}
                <div className="matrix-bracket right">
                    <svg width="10" height={bracketH} viewBox={`0 0 10 ${bracketH}`} fill="none">
                        <path d={`M1 1 Q9 1 9 ${bracketH / 2} Q9 ${bracketH - 1} 1 ${bracketH - 1}`} stroke="#31326F" strokeWidth="2" fill="none" />
                    </svg>
                </div>
            </div>

            {showOrder && (
                <div className="matrix-order-label">
                    <span>{rows} × {cols}</span>
                </div>
            )}
        </div>
    );
};

export default React.memo(MatrixGrid);
