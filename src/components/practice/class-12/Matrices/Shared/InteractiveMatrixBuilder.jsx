import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * InteractiveMatrixBuilder
 * Modes:
 *   - "display": Read-only matrix with optional cell highlights
 *   - "highlight": Highlights specific cells (pass highlightCells=[[r,c],...])
 *   - "build": Students can fill in cell values (editable)
 *   - "animate": Step-by-step operation playback
 *
 * Props:
 *   rows, cols – dimensions
 *   values    – 2D array of cell values (strings)
 *   highlightCells – array of [row, col] pairs to highlight
 *   editable  – boolean, makes cells input fields
 *   onCellChange(row, col, value) – callback for editable mode
 *   label     – optional label above the matrix
 *   showIndices – show aij notation
 *   compact   – smaller sizing
 *   accentColor – highlight color (default indigo)
 *   animateEntrance – animate cells appearing
 */
const InteractiveMatrixBuilder = ({
    rows = 2,
    cols = 2,
    values = null,
    highlightCells = [],
    editable = false,
    onCellChange = () => { },
    label = '',
    showIndices = false,
    compact = false,
    accentColor = '#4F46E5',
    animateEntrance = true,
}) => {
    const cellSize = compact ? 44 : 56;
    const fontSize = compact ? '0.9rem' : '1.1rem';
    const gap = compact ? 4 : 6;

    // Generate empty grid if no values provided
    const grid = values || Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));

    const isHighlighted = (r, c) => highlightCells.some(([hr, hc]) => hr === r && hc === c);

    return (
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            {label && (
                <div style={{
                    fontSize: '0.8rem', fontWeight: 700, color: '#64748B',
                    marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                    {label}
                </div>
            )}

            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
                {/* Left bracket */}
                <div style={{
                    width: 8, borderLeft: `3px solid #334155`, borderTop: `3px solid #334155`, borderBottom: `3px solid #334155`,
                    height: rows * (cellSize + gap) - gap + 16, borderRadius: '4px 0 0 4px'
                }} />

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
                    gap: `${gap}px`,
                    padding: '8px 4px',
                }}>
                    {grid.map((row, rIdx) =>
                        row.map((cell, cIdx) => {
                            const highlighted = isHighlighted(rIdx, cIdx);
                            const cellContent = (
                                <motion.div
                                    key={`${rIdx}-${cIdx}`}
                                    initial={animateEntrance ? { scale: 0, opacity: 0 } : false}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: (rIdx * cols + cIdx) * 0.05, type: 'spring', stiffness: 300 }}
                                    style={{
                                        width: cellSize, height: cellSize,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        borderRadius: 10,
                                        background: highlighted ? `${accentColor}15` : '#F8FAFC',
                                        border: `2px solid ${highlighted ? accentColor : '#E2E8F0'}`,
                                        fontWeight: 700,
                                        fontSize,
                                        color: highlighted ? accentColor : '#1E293B',
                                        position: 'relative',
                                        boxShadow: highlighted ? `0 0 0 3px ${accentColor}30` : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {editable ? (
                                        <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) => onCellChange(rIdx, cIdx, e.target.value)}
                                            style={{
                                                width: '100%', height: '100%', textAlign: 'center',
                                                border: 'none', background: 'transparent',
                                                fontWeight: 700, fontSize, color: '#1E293B',
                                                outline: 'none',
                                            }}
                                            maxLength={6}
                                        />
                                    ) : (
                                        cell
                                    )}

                                    {showIndices && (
                                        <span style={{
                                            position: 'absolute', top: 2, right: 4,
                                            fontSize: '0.55rem', color: '#94A3B8', fontWeight: 600,
                                            fontStyle: 'italic',
                                        }}>
                                            a<sub>{rIdx + 1}{cIdx + 1}</sub>
                                        </span>
                                    )}
                                </motion.div>
                            );
                            return cellContent;
                        })
                    )}
                </div>

                {/* Right bracket */}
                <div style={{
                    width: 8, borderRight: `3px solid #334155`, borderTop: `3px solid #334155`, borderBottom: `3px solid #334155`,
                    height: rows * (cellSize + gap) - gap + 16, borderRadius: '0 4px 4px 0'
                }} />
            </div>
        </div>
    );
};

export default InteractiveMatrixBuilder;
