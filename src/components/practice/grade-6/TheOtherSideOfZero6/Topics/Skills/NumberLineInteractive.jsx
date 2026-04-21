import React, { useState, useCallback } from 'react';

/**
 * Interactive Number Line Widget
 *
 * Props:
 *  - question: { range: [lo, hi], startMarker?, jumpLabel? }
 *  - answered: boolean (lock interaction after answering)
 *  - userAnswer: number | null (currently selected tick)
 *  - correctAnswer: number (shown after answering in practice mode)
 *  - onChange: (value: number) => void
 *  - color: string (theme color)
 *  - showResult: boolean (whether to show correct/incorrect after answering)
 */
export default function NumberLineInteractive({
    question,
    answered = false,
    userAnswer,
    correctAnswer,
    onChange,
    color = '#3b82f6',
    showResult = false,
}) {
    const lo = question.range?.[0] ?? -7;
    const hi = question.range?.[1] ?? 7;
    const startMarker = question.startMarker ?? null;  // optional: shows a "Start" marker
    const jumpLabel = question.jumpLabel ?? null;       // optional: shows a jump arc with label

    const count = hi - lo + 1;
    const PADDING = 40;
    const TICK_SPACING = 44;
    const W = count * TICK_SPACING + PADDING * 2;
    const H = 110;
    const LINE_Y = 55;

    const getX = (n) => PADDING + (n - lo) * TICK_SPACING;

    const [hoveredTick, setHoveredTick] = useState(null);

    const handleTickClick = useCallback((n) => {
        if (answered) return;
        onChange(n);
    }, [answered, onChange]);

    return (
        <div style={{
            background: '#f8fafc',
            borderRadius: 20,
            padding: '20px 12px 12px',
            border: `2px solid ${answered ? (showResult && userAnswer === correctAnswer ? '#10b981' : showResult ? '#ef4444' : '#e2e8f0') : `${color}30`}`,
            transition: 'border-color 0.3s',
            overflow: 'auto',
        }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, color: '#64748b', marginBottom: 8, textAlign: 'center' }}>
                👆 Click on the number line to select your answer
            </div>

            <svg
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                height={H}
                style={{ display: 'block', cursor: answered ? 'default' : 'pointer' }}
            >
                {/* Main horizontal line */}
                <line x1={PADDING - 15} y1={LINE_Y} x2={W - PADDING + 15} y2={LINE_Y} stroke={color} strokeWidth="3" />
                {/* Arrow heads */}
                <polygon points={`${W - PADDING + 15},${LINE_Y - 5} ${W - PADDING + 25},${LINE_Y} ${W - PADDING + 15},${LINE_Y + 5}`} fill={color} />
                <polygon points={`${PADDING - 15},${LINE_Y - 5} ${PADDING - 25},${LINE_Y} ${PADDING - 15},${LINE_Y + 5}`} fill={color} />

                {/* Ticks and labels */}
                {Array.from({ length: count }, (_, i) => {
                    const n = lo + i;
                    const x = getX(n);
                    const isZero = n === 0;
                    const isSelected = userAnswer === n;
                    const isCorrect = answered && showResult && n === correctAnswer;
                    const isWrong = answered && showResult && isSelected && n !== correctAnswer;
                    const isHovered = hoveredTick === n && !answered;
                    const isStart = startMarker === n;

                    let tickColor = '#94a3b8';
                    let tickWidth = 1.5;
                    let tickLen = 7;
                    let labelColor = '#334155';
                    let labelWeight = '600';

                    if (isZero) { tickColor = '#f59e0b'; tickWidth = 3; tickLen = 10; labelColor = '#f59e0b'; labelWeight = '900'; }
                    if (isSelected && !answered) { tickColor = color; tickWidth = 4; tickLen = 12; labelColor = color; labelWeight = '900'; }
                    if (isCorrect) { tickColor = '#10b981'; tickWidth = 4; tickLen = 12; labelColor = '#10b981'; labelWeight = '900'; }
                    if (isWrong) { tickColor = '#ef4444'; tickWidth = 4; tickLen = 12; labelColor = '#ef4444'; labelWeight = '900'; }
                    if (isHovered) { tickColor = color; tickWidth = 3; tickLen = 10; }

                    return (
                        <g key={n}>
                            {/* Tick mark */}
                            <line
                                x1={x} y1={LINE_Y - tickLen} x2={x} y2={LINE_Y + tickLen}
                                stroke={tickColor} strokeWidth={tickWidth}
                            />
                            {/* Label */}
                            <text
                                x={x} y={LINE_Y + tickLen + 18}
                                textAnchor="middle" fontFamily="'Inter', sans-serif"
                                fontSize="13" fontWeight={labelWeight} fill={labelColor}
                            >
                                {n}
                            </text>

                            {/* Selected circle marker */}
                            {isSelected && !answered && (
                                <g>
                                    <circle cx={x} cy={LINE_Y - 20} r="12" fill={color} opacity="0.9">
                                        <animate attributeName="r" values="10;13;10" dur="1.5s" repeatCount="indefinite" />
                                    </circle>
                                    <text x={x} y={LINE_Y - 16} textAnchor="middle" fill="white" fontSize="10" fontWeight="800">
                                        ✓
                                    </text>
                                </g>
                            )}

                            {/* Correct answer marker (after answering) */}
                            {isCorrect && (
                                <g>
                                    <circle cx={x} cy={LINE_Y - 20} r="12" fill="#10b981" />
                                    <text x={x} y={LINE_Y - 16} textAnchor="middle" fill="white" fontSize="10" fontWeight="800">✓</text>
                                </g>
                            )}

                            {/* Wrong answer marker */}
                            {isWrong && (
                                <g>
                                    <circle cx={x} cy={LINE_Y - 20} r="12" fill="#ef4444" />
                                    <text x={x} y={LINE_Y - 16} textAnchor="middle" fill="white" fontSize="10" fontWeight="800">✗</text>
                                </g>
                            )}

                            {/* Start marker */}
                            {isStart && !isSelected && !isCorrect && !isWrong && (
                                <g>
                                    <circle cx={x} cy={LINE_Y - 20} r="10" fill="#10b981" opacity="0.85" />
                                    <text x={x} y={LINE_Y - 16} textAnchor="middle" fill="white" fontSize="8" fontWeight="800">S</text>
                                </g>
                            )}

                            {/* Invisible clickable area */}
                            <rect
                                x={x - TICK_SPACING / 2}
                                y={LINE_Y - 30}
                                width={TICK_SPACING}
                                height={70}
                                fill="transparent"
                                style={{ cursor: answered ? 'default' : 'pointer' }}
                                onClick={() => handleTickClick(n)}
                                onMouseEnter={() => !answered && setHoveredTick(n)}
                                onMouseLeave={() => setHoveredTick(null)}
                            />

                            {/* Hover highlight */}
                            {isHovered && !isSelected && (
                                <circle cx={x} cy={LINE_Y} r="6" fill={`${color}30`} stroke={color} strokeWidth="1.5">
                                    <animate attributeName="r" values="5;8;5" dur="1s" repeatCount="indefinite" />
                                </circle>
                            )}
                        </g>
                    );
                })}

                {/* Jump arc (optional) */}
                {jumpLabel && startMarker !== null && userAnswer !== null && !answered && (
                    (() => {
                        const sx = getX(startMarker);
                        const ex = getX(userAnswer);
                        const midX = (sx + ex) / 2;
                        const arcHeight = Math.min(Math.abs(userAnswer - startMarker) * 5, 30);
                        return (
                            <g>
                                <path
                                    d={`M ${sx} ${LINE_Y - 12} Q ${midX} ${LINE_Y - 12 - arcHeight} ${ex} ${LINE_Y - 12}`}
                                    fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3"
                                />
                                <text x={midX} y={LINE_Y - 14 - arcHeight} textAnchor="middle" fontSize="11" fontWeight="800" fill="#d97706">
                                    {jumpLabel}
                                </text>
                            </g>
                        );
                    })()
                )}
            </svg>

            {/* Selection indicator */}
            <div style={{ textAlign: 'center', marginTop: 6, fontSize: 14, fontWeight: 700, minHeight: 22 }}>
                {!answered && userAnswer !== null && (
                    <span style={{ color, background: `${color}10`, padding: '4px 16px', borderRadius: 100, border: `1px solid ${color}20` }}>
                        Selected: <strong>{userAnswer}</strong>
                    </span>
                )}
                {!answered && userAnswer === null && (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                        Click on a position above to answer
                    </span>
                )}
            </div>
        </div>
    );
}
