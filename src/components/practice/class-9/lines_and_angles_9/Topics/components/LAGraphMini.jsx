import React, { useState, useRef, useEffect } from 'react';

// Renders the different SVG question types
export const LAGraphMini = ({ config, onProtractorChange }) => {
    if (!config) return null;

    const { type, data } = config;

    if (type === 'protractor-measure') {
        return <InteractiveProtractor angle={data.angle} onChange={onProtractorChange} />;
    }

    if (type === 'linear-pair') {
        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                {/* Horizontal Line */}
                <line x1="30" y1="150" x2="270" y2="150" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="150" cy="150" r="4" fill="#0f172a" />
                
                {/* Ray leaning left or right based on splitAngle */}
                {(() => {
                    const r = 100;
                    const rad = (data.splitAngle * Math.PI) / 180;
                    const x2 = 150 + r * Math.cos(rad);
                    const y2 = 150 - r * Math.sin(rad);
                    return (
                        <g>
                            <line x1="150" y1="150" x2={x2} y2={y2} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                            {/* Arcs */}
                            <path d={`M 180 150 A 30 30 0 0 0 ${150 + 30 * Math.cos(rad)} ${150 - 30 * Math.sin(rad)}`} stroke="#0284c7" strokeWidth="3" fill="none" />
                            <path d={`M 120 150 A 30 30 0 0 1 ${150 + 30 * Math.cos(rad)} ${150 - 30 * Math.sin(rad)}`} stroke="#e11d48" strokeWidth="3" fill="none" />
                            
                            {/* Labels */}
                            <text x="190" y="130" fontSize="14" fill="#0284c7" fontWeight="bold">{data.a1}</text>
                            <text x="100" y="130" fontSize="14" fill="#e11d48" fontWeight="bold">{data.a2}</text>
                        </g>
                    );
                })()}
            </svg>
        );
    }

    if (type === 'linear-pair-labelled') {
        // More detailed linear pair with point labels (A, O, B, C)
        const { labelLeft, labelRight, splitAngle, pointLabels } = data;
        const r = 100;
        const rad = (splitAngle * Math.PI) / 180;
        const x2 = 150 + r * Math.cos(rad);
        const y2 = 150 - r * Math.sin(rad);
        const [pA, pO, pB, pC] = pointLabels || ['A', 'O', 'B', 'C'];
        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                {/* Horizontal Line A-O-B */}
                <line x1="20" y1="160" x2="320" y2="160" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="160" r="4" fill="#0f172a" />
                
                {/* Ray O→C */}
                <line x1="170" y1="160" x2={170 + r * Math.cos(rad)} y2={160 - r * Math.sin(rad)} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                
                {/* Arc for left angle */}
                <path d={`M 140 160 A 30 30 0 0 1 ${170 + 30 * Math.cos(rad)} ${160 - 30 * Math.sin(rad)}`} stroke="#e11d48" strokeWidth="2.5" fill="rgba(225,29,72,0.08)" />
                {/* Arc for right angle */}
                <path d={`M 200 160 A 30 30 0 0 0 ${170 + 30 * Math.cos(rad)} ${160 - 30 * Math.sin(rad)}`} stroke="#0284c7" strokeWidth="2.5" fill="rgba(2,132,199,0.08)" />
                
                {/* Angle labels */}
                <text x={115} y={140} fontSize="13" fill="#e11d48" fontWeight="bold" textAnchor="middle">{labelLeft}</text>
                <text x={225} y={140} fontSize="13" fill="#0284c7" fontWeight="bold" textAnchor="middle">{labelRight}</text>
                
                {/* Point labels */}
                <text x="15" y="175" fontSize="13" fill="#64748b" fontWeight="bold">{pA}</text>
                <text x="170" y="185" fontSize="13" fill="#0f172a" fontWeight="bold" textAnchor="middle">{pO}</text>
                <text x="318" y="175" fontSize="13" fill="#64748b" fontWeight="bold">{pB}</text>
                <text x={170 + r * Math.cos(rad) + 8} y={160 - r * Math.sin(rad) - 5} fontSize="13" fill="#64748b" fontWeight="bold">{pC}</text>
            </svg>
        );
    }

    if (type === 'bisector-on-line') {
        // Ray OS on line PQ, bisectors OR and OT, showing ∠ROT = 90°
        const { mainAngle, pointLabels } = data;
        const [pP, pO, pQ, pS, pR, pT] = pointLabels || ['P', 'O', 'Q', 'S', 'R', 'T'];
        const rad = (mainAngle * Math.PI) / 180;
        const halfLeft = mainAngle / 2;
        const halfRight = (180 - mainAngle) / 2 + mainAngle;
        const r = 90;
        const rBis = 80;

        const radS = rad;
        const radR = ((180 + mainAngle) / 2) * Math.PI / 180; // Bisects POS (left side)
        const radT = (mainAngle / 2) * Math.PI / 180; // Bisects SOQ (right side)

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                {/* Line P-O-Q */}
                <line x1="20" y1="170" x2="320" y2="170" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="170" r="4" fill="#0f172a" />

                {/* Ray OS (main) */}
                <line x1="170" y1="170" x2={170 + r * Math.cos(radS)} y2={170 - r * Math.sin(radS)} stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* Bisector OR */}
                <line x1="170" y1="170" x2={170 + rBis * Math.cos(radR)} y2={170 - rBis * Math.sin(radR)} stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,3" />

                {/* Bisector OT */}
                <line x1="170" y1="170" x2={170 + rBis * Math.cos(radT)} y2={170 - rBis * Math.sin(radT)} stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,3" />

                {/* Angle arc ROT */}
                <path d={`M ${170 + 25 * Math.cos(radT)} ${170 - 25 * Math.sin(radT)} A 25 25 0 0 0 ${170 + 25 * Math.cos(radR)} ${170 - 25 * Math.sin(radR)}`}
                    stroke="#059669" strokeWidth="2.5" fill="rgba(5,150,105,0.08)" />
                <text x="170" y="130" fontSize="14" fill="#059669" fontWeight="bold" textAnchor="middle">∠ROT = ?</text>

                {/* Point labels */}
                <text x="15" y="185" fontSize="12" fill="#64748b" fontWeight="bold">{pP}</text>
                <text x="170" y="195" fontSize="12" fill="#0f172a" fontWeight="bold" textAnchor="middle">{pO}</text>
                <text x="318" y="185" fontSize="12" fill="#64748b" fontWeight="bold">{pQ}</text>
                <text x={170 + r * Math.cos(radS) + 6} y={170 - r * Math.sin(radS) - 4} fontSize="12" fill="#334155" fontWeight="bold">{pS}</text>
                <text x={170 + rBis * Math.cos(radR) + 6} y={170 - rBis * Math.sin(radR) - 4} fontSize="12" fill="#0284c7" fontWeight="bold">{pR}</text>
                <text x={170 + rBis * Math.cos(radT) + 6} y={170 - rBis * Math.sin(radT) - 4} fontSize="12" fill="#e11d48" fontWeight="bold">{pT}</text>
            </svg>
        );
    }

    if (type === 'three-rays-on-line') {
        // Three angles on one side of a straight line
        // angles[0] is the leftmost angle (near P), angles[last] is rightmost (near Q)
        const { angles, pointLabels } = data;
        const [pP, pO, pQ, pA, pB] = pointLabels || ['P', 'O', 'Q', 'A', 'B'];
        const r = 90;

        // Parse numeric values (for 'x' labels, estimate based on remaining)
        const numericAngles = angles.map(a => {
            if (typeof a === 'number') return a;
            const parsed = parseInt(a);
            if (!isNaN(parsed)) return parsed;
            // For 'x', calculate as remainder to 180
            const knownSum = angles.reduce((s, v) => {
                if (typeof v === 'number') return s + v;
                const p = parseInt(v);
                return !isNaN(p) ? s + p : s;
            }, 0);
            return 180 - knownSum;
        });

        // Start from 180° (left/P side) and subtract each angle going right toward 0° (Q side)
        const cumAngles = [180];
        for (let j = 0; j < numericAngles.length; j++) {
            cumAngles.push(cumAngles[j] - numericAngles[j]);
        }
        // Intermediate ray positions (between P and Q)
        const rayAngles = cumAngles.slice(1, -1);

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                {/* Line P-O-Q */}
                <line x1="20" y1="170" x2="320" y2="170" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="170" r="4" fill="#0f172a" />

                {/* Rays from O */}
                {rayAngles.map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line key={ri} x1="170" y1="170"
                            x2={170 + r * Math.cos(rad)} y2={170 - r * Math.sin(rad)}
                            stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                    );
                })}

                {/* Angle labels */}
                {angles.map((label, ai) => {
                    const midAngle = ((cumAngles[ai] + cumAngles[ai + 1]) / 2) * Math.PI / 180;
                    const labelR = 45;
                    const colors = ['#0284c7', '#059669', '#e11d48'];
                    return (
                        <text key={ai}
                            x={170 + labelR * Math.cos(midAngle)}
                            y={170 - labelR * Math.sin(midAngle)}
                            fontSize="13" fill={colors[ai % 3]} fontWeight="bold" textAnchor="middle"
                        >{label}</text>
                    );
                })}

                {/* Arcs for each angle (clockwise from left to right) */}
                {angles.map((_, ai) => {
                    const startRad = (cumAngles[ai] * Math.PI) / 180;
                    const endRad = (cumAngles[ai + 1] * Math.PI) / 180;
                    const arcR = 30;
                    const colors = ['rgba(2,132,199,0.15)', 'rgba(5,150,105,0.15)', 'rgba(225,29,72,0.15)'];
                    const strokeColors = ['#0284c7', '#059669', '#e11d48'];
                    return (
                        <path key={'arc' + ai}
                            d={`M ${170 + arcR * Math.cos(startRad)} ${170 - arcR * Math.sin(startRad)} A ${arcR} ${arcR} 0 0 1 ${170 + arcR * Math.cos(endRad)} ${170 - arcR * Math.sin(endRad)}`}
                            stroke={strokeColors[ai % 3]} strokeWidth="2" fill={colors[ai % 3]}
                        />
                    );
                })}

                {/* Point labels */}
                <text x="15" y="185" fontSize="12" fill="#64748b" fontWeight="bold">{pP}</text>
                <text x="170" y="195" fontSize="12" fill="#0f172a" fontWeight="bold" textAnchor="middle">{pO}</text>
                <text x="318" y="185" fontSize="12" fill="#64748b" fontWeight="bold">{pQ}</text>
                {rayAngles.map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    const rayLabels = [pA, pB];
                    return (
                        <text key={'rl' + ri}
                            x={170 + (r + 12) * Math.cos(rad)}
                            y={170 - (r + 12) * Math.sin(rad)}
                            fontSize="12" fill="#64748b" fontWeight="bold" textAnchor="middle"
                        >{rayLabels[ri] || ''}</text>
                    );
                })}
            </svg>
        );
    }

    if (type === 'intersecting') {
        const { top, bottom, left, right, angle } = data;
        const rad = (angle * Math.PI) / 180;
        const r = 100;

        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                {/* Horizontal line */}
                <line x1={150 - r} y1="100" x2={150 + r} y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Angled line */}
                <line x1={150 - r * Math.cos(rad)} y1={100 + r * Math.sin(rad)} x2={150 + r * Math.cos(rad)} y2={100 - r * Math.sin(rad)} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                
                <circle cx="150" cy="100" r="4" fill="#0f172a" />
                
                <text x="150" y={100 - 30} fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">{top}</text>
                <text x="150" y={100 + 40} fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">{bottom}</text>
                <text x={150 - 50} y="105" fontSize="14" fill="#d97706" textAnchor="middle" fontWeight="bold">{left}</text>
                <text x={150 + 50} y="105" fontSize="14" fill="#d97706" textAnchor="middle" fontWeight="bold">{right}</text>
            </svg>
        );
    }

    if (type === 'intersecting-labelled') {
        // Intersecting lines with point labels and ratio labels on all four angles
        const { labels, angle, pointLabels } = data;
        const [pP, pQ, pR, pS, pO] = pointLabels || ['P', 'Q', 'R', 'S', 'O'];
        const rad = (angle * Math.PI) / 180;
        const r = 90;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                {/* Horizontal line P-O-Q */}
                <line x1={170 - r} y1="110" x2={170 + r} y2="110" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Angled line R-O-S */}
                <line x1={170 - r * Math.cos(rad)} y1={110 + r * Math.sin(rad)} x2={170 + r * Math.cos(rad)} y2={110 - r * Math.sin(rad)} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="110" r="4" fill="#0f172a" />

                {/* Labels for four angles */}
                <text x="170" y="80" fontSize="13" fill="#0284c7" textAnchor="middle" fontWeight="bold">{labels[0]}</text>
                <text x="210" y="115" fontSize="13" fill="#e11d48" textAnchor="middle" fontWeight="bold">{labels[1]}</text>
                <text x="170" y="145" fontSize="13" fill="#0284c7" textAnchor="middle" fontWeight="bold">{labels[2]}</text>
                <text x="130" y="115" fontSize="13" fill="#e11d48" textAnchor="middle" fontWeight="bold">{labels[3]}</text>

                {/* Point labels */}
                <text x={170 - r - 12} y="115" fontSize="12" fill="#64748b" fontWeight="bold">{pP}</text>
                <text x={170 + r + 8} y="115" fontSize="12" fill="#64748b" fontWeight="bold">{pQ}</text>
                <text x={170 + r * Math.cos(rad) + 6} y={110 - r * Math.sin(rad) - 4} fontSize="12" fill="#64748b" fontWeight="bold">{pR}</text>
                <text x={170 - r * Math.cos(rad) - 12} y={110 + r * Math.sin(rad) + 12} fontSize="12" fill="#64748b" fontWeight="bold">{pS}</text>
                <text x="178" y="125" fontSize="12" fill="#0f172a" fontWeight="bold">{pO}</text>
            </svg>
        );
    }

    if (type === 'intersecting-four') {
        // Show all four angles labelled with values
        const { a, b, angle } = data;
        const rad = (angle * Math.PI) / 180;
        const r = 90;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <line x1={170 - r} y1="110" x2={170 + r} y2="110" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1={170 - r * Math.cos(rad)} y1={110 + r * Math.sin(rad)} x2={170 + r * Math.cos(rad)} y2={110 - r * Math.sin(rad)} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="110" r="4" fill="#0f172a" />

                {/* Angle arcs */}
                <path d={`M 195 110 A 25 25 0 0 0 ${170 + 25 * Math.cos(rad)} ${110 - 25 * Math.sin(rad)}`} stroke="#0284c7" strokeWidth="2" fill="rgba(2,132,199,0.1)" />
                <path d={`M ${170 + 25 * Math.cos(rad)} ${110 - 25 * Math.sin(rad)} A 25 25 0 0 0 145 110`} stroke="#e11d48" strokeWidth="2" fill="rgba(225,29,72,0.1)" />

                <text x="205" y="96" fontSize="13" fill="#0284c7" fontWeight="bold">{a}°</text>
                <text x="130" y="96" fontSize="13" fill="#e11d48" fontWeight="bold">{b}°</text>
                <text x="130" y="132" fontSize="13" fill="#0284c7" fontWeight="bold">{a}°</text>
                <text x="205" y="132" fontSize="13" fill="#e11d48" fontWeight="bold">x</text>

                <text x="170" y="200" fontSize="12" fill="#64748b" fontWeight="600" textAnchor="middle">O</text>
            </svg>
        );
    }

    if (type === 'intersecting-reflex') {
        // Show an acute angle and its reflex
        const { a, reflex, angle } = data;
        const rad = (angle * Math.PI) / 180;
        const r = 80;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <line x1={170 - r} y1="110" x2={170 + r} y2="110" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1={170 - r * Math.cos(rad)} y1={110 + r * Math.sin(rad)} x2={170 + r * Math.cos(rad)} y2={110 - r * Math.sin(rad)} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="110" r="4" fill="#0f172a" />

                {/* Small arc for acute */}
                <path d={`M 195 110 A 25 25 0 0 0 ${170 + 25 * Math.cos(rad)} ${110 - 25 * Math.sin(rad)}`} stroke="#0284c7" strokeWidth="2.5" fill="rgba(2,132,199,0.1)" />
                <text x="208" y="95" fontSize="12" fill="#0284c7" fontWeight="bold">{a}°</text>

                {/* Large arc for reflex (sweep-flag = 1 for long way around) */}
                <path d={`M 195 110 A 40 40 0 1 1 ${170 + 40 * Math.cos(rad)} ${110 - 40 * Math.sin(rad)}`} stroke="#e11d48" strokeWidth="2" fill="none" strokeDasharray="5,3" />
                <text x="125" y="155" fontSize="13" fill="#e11d48" fontWeight="bold">x = ?</text>
            </svg>
        );
    }

    if (type === 'three-lines-point') {
        // 3 lines through a point → 6 angles (show 3 on upper side)
        const { angles, pointLabels } = data;
        const r = 80;
        // 3 angles on the upper semicircle
        const cumAngles = [0];
        for (let j = 0; j < angles.length; j++) {
            cumAngles.push(cumAngles[j] + angles[j]);
        }

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <circle cx="170" cy="130" r="4" fill="#0f172a" />
                <text x="178" y="148" fontSize="12" fill="#0f172a" fontWeight="bold">O</text>

                {/* Draw 3 full lines (6 rays) */}
                {[0, ...cumAngles.slice(1, 3)].map((deg, li) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line key={li}
                            x1={170 - r * Math.cos(rad)} y1={130 + r * Math.sin(rad)}
                            x2={170 + r * Math.cos(rad)} y2={130 - r * Math.sin(rad)}
                            stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                    );
                })}

                {/* Angle labels on upper side */}
                {angles.map((a, ai) => {
                    const midAngle = ((cumAngles[ai] + cumAngles[ai + 1]) / 2) * Math.PI / 180;
                    const colors = ['#0284c7', '#059669', '#e11d48'];
                    return (
                        <text key={ai}
                            x={170 + 40 * Math.cos(midAngle)}
                            y={130 - 40 * Math.sin(midAngle)}
                            fontSize="13" fill={colors[ai % 3]} fontWeight="bold" textAnchor="middle"
                        >{a}°</text>
                    );
                })}

                {/* Arcs */}
                {angles.map((_, ai) => {
                    const startRad = (cumAngles[ai] * Math.PI) / 180;
                    const endRad = (cumAngles[ai + 1] * Math.PI) / 180;
                    const arcR = 25;
                    const strokeColors = ['#0284c7', '#059669', '#e11d48'];
                    return (
                        <path key={'arc' + ai}
                            d={`M ${170 + arcR * Math.cos(startRad)} ${130 - arcR * Math.sin(startRad)} A ${arcR} ${arcR} 0 0 0 ${170 + arcR * Math.cos(endRad)} ${130 - arcR * Math.sin(endRad)}`}
                            stroke={strokeColors[ai % 3]} strokeWidth="2" fill="none"
                        />
                    );
                })}
            </svg>
        );
    }

    if (type === 'intersecting-extra-ray') {
        // Two intersecting lines with an extra ray (e.g., OE)
        const { angleBOD, angleBOE, pointLabels } = data;
        const [pA, pB, pC, pD, pO, pE] = pointLabels || ['A', 'B', 'C', 'D', 'O', 'E'];
        const r = 85;
        // Line AB is horizontal, line CD at angle angleBOD from OB
        const radCD = (angleBOD * Math.PI) / 180;
        // Extra ray OE at angleBOE from OB (between OB and OD)
        const radOE = (angleBOE * Math.PI) / 180;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                {/* Line AB (horizontal) */}
                <line x1={170 - r} y1="120" x2={170 + r} y2="120" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Line CD */}
                <line x1={170 - r * Math.cos(radCD)} y1={120 + r * Math.sin(radCD)} x2={170 + r * Math.cos(radCD)} y2={120 - r * Math.sin(radCD)} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Extra Ray OE */}
                <line x1="170" y1="120" x2={170 + r * Math.cos(radOE)} y2={120 - r * Math.sin(radOE)} stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6,4" />

                <circle cx="170" cy="120" r="4" fill="#0f172a" />

                {/* Point labels */}
                <text x={170 - r - 12} y="125" fontSize="12" fill="#64748b" fontWeight="bold">{pA}</text>
                <text x={170 + r + 6} y="125" fontSize="12" fill="#64748b" fontWeight="bold">{pB}</text>
                <text x={170 + r * Math.cos(radCD) + 6} y={120 - r * Math.sin(radCD) - 4} fontSize="12" fill="#64748b" fontWeight="bold">{pD}</text>
                <text x={170 - r * Math.cos(radCD) - 12} y={120 + r * Math.sin(radCD) + 12} fontSize="12" fill="#64748b" fontWeight="bold">{pC}</text>
                <text x={170 + r * Math.cos(radOE) + 6} y={120 - r * Math.sin(radOE) - 4} fontSize="12" fill="#7c3aed" fontWeight="bold">{pE}</text>
                <text x="178" y="138" fontSize="12" fill="#0f172a" fontWeight="bold">{pO}</text>

                {/* Angle arc for BOD */}
                <path d={`M 195 120 A 25 25 0 0 0 ${170 + 25 * Math.cos(radCD)} ${120 - 25 * Math.sin(radCD)}`} stroke="#0284c7" strokeWidth="2" fill="rgba(2,132,199,0.08)" />
                <text x={170 + 38 * Math.cos(radCD / 2)} y={120 - 38 * Math.sin(radCD / 2)} fontSize="11" fill="#0284c7" fontWeight="bold" textAnchor="middle">{angleBOD}°</text>
            </svg>
        );
    }

    if (type === 'parallel') {
        const { knownLoc, unknownLoc, knownVal, tilt } = data;
        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                {/* Parallel lines */}
                <line x1="50" y1="70" x2="250" y2="70" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="130" x2="250" y2="130" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                
                {/* Arrows indicating parallel */}
                <text x="30" y="74" fontSize="11" fill="#64748b">l</text>
                <text x="30" y="134" fontSize="11" fill="#64748b">m</text>
                
                {/* Transversal */}
                <line x1="120" y1="30" x2="180" y2="170" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* Labels */}
                <text x="175" y="60" fontSize="14" fill="#7c3aed" fontWeight="bold">{knownLoc === 'top-right' ? `${knownVal}°` : ''}</text>
                <text x="125" y="60" fontSize="14" fill="#7c3aed" fontWeight="bold">{knownLoc === 'top-left' ? `${knownVal}°` : ''}</text>
                <text x="135" y="125" fontSize="14" fill="#e11d48" fontWeight="bold">{unknownLoc === 'bottom-left' ? 'x' : ''}</text>
                <text x="175" y="150" fontSize="14" fill="#e11d48" fontWeight="bold">{unknownLoc === 'bottom-right' ? 'x' : ''}</text>
                <text x="125" y="150" fontSize="14" fill="#e11d48" fontWeight="bold">{unknownLoc === 'bottom-left-out' ? 'x' : ''}</text>
            </svg>
        );
    }

    if (type === 'parallel-aux-line') {
        // PQ || RS with point M between them, auxiliary line through M
        const { mxq, myr, xmy, pointLabels } = data;
        const [pP, pQ, pR, pS, pM, pX, pY] = pointLabels || ['P', 'Q', 'R', 'S', 'M', 'X', 'Y'];

        return (
            <svg viewBox="0 0 360 250" width="100%" style={{ maxWidth: 340, maxHeight: 230, background: '#f8fafc', borderRadius: 12 }}>
                {/* Line PQ (top) */}
                <line x1="30" y1="60" x2="330" y2="60" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Line RS (bottom) */}
                <line x1="30" y1="190" x2="330" y2="190" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* Transversal X→M (from PQ to M) */}
                <line x1="230" y1="60" x2="170" y2="125" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                {/* Transversal M→Y (from M to RS) */}
                <line x1="170" y1="125" x2="130" y2="190" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                {/* Auxiliary dashed line through M */}
                <line x1="60" y1="125" x2="300" y2="125" stroke="#059669" strokeWidth="1.5" strokeDasharray="6,4" />

                {/* Point M */}
                <circle cx="170" cy="125" r="4" fill="#0f172a" />

                {/* Angle labels */}
                <text x="245" y="55" fontSize="12" fill="#7c3aed" fontWeight="bold">{mxq}°</text>
                <text x="115" y="205" fontSize="12" fill="#7c3aed" fontWeight="bold">{myr}°</text>
                <text x="175" y="115" fontSize="13" fill="#e11d48" fontWeight="bold">∠XMY = ?</text>

                {/* Point labels */}
                <text x="15" y="56" fontSize="12" fill="#64748b" fontWeight="bold">{pP}</text>
                <text x="325" y="56" fontSize="12" fill="#64748b" fontWeight="bold">{pQ}</text>
                <text x="15" y="186" fontSize="12" fill="#64748b" fontWeight="bold">{pR}</text>
                <text x="325" y="186" fontSize="12" fill="#64748b" fontWeight="bold">{pS}</text>
                <text x="170" y="142" fontSize="11" fill="#0f172a" fontWeight="bold" textAnchor="middle">{pM}</text>
                <text x="235" y="56" fontSize="11" fill="#0284c7" fontWeight="bold">{pX}</text>
                <text x="125" y="206" fontSize="11" fill="#0284c7" fontWeight="bold">{pY}</text>
            </svg>
        );
    }

    if (type === 'parallel-perp') {
        // AB||CD||EF with EA⊥AB
        const { bef, z, x, y, pointLabels } = data;
        const [pA, pB, pC, pD, pE, pF] = pointLabels || ['A', 'B', 'C', 'D', 'E', 'F'];

        return (
            <svg viewBox="0 0 360 250" width="100%" style={{ maxWidth: 340, maxHeight: 230, background: '#f8fafc', borderRadius: 12 }}>
                {/* Line AB (top) */}
                <line x1="80" y1="50" x2="330" y2="50" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Line CD (middle) */}
                <line x1="80" y1="120" x2="330" y2="120" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Line EF (bottom) */}
                <line x1="80" y1="200" x2="330" y2="200" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* Vertical line EA (perpendicular to AB) */}
                <line x1="120" y1="50" x2="120" y2="200" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                {/* Right angle mark at A */}
                <rect x="120" y="50" width="10" height="10" fill="none" stroke="#0284c7" strokeWidth="1.5" />

                {/* Angle label */}
                <text x="130" y="212" fontSize="12" fill="#e11d48" fontWeight="bold">{bef}°</text>
                <text x="130" y="190" fontSize="12" fill="#059669" fontWeight="bold">z</text>
                <text x="245" y="45" fontSize="12" fill="#7c3aed" fontWeight="bold">x = {x}°</text>
                <text x="245" y="115" fontSize="12" fill="#7c3aed" fontWeight="bold">y = {y}°</text>

                {/* Point labels */}
                <text x="112" y="43" fontSize="12" fill="#64748b" fontWeight="bold">{pA}</text>
                <text x="325" y="43" fontSize="12" fill="#64748b" fontWeight="bold">{pB}</text>
                <text x="73" y="116" fontSize="12" fill="#64748b" fontWeight="bold">{pC}</text>
                <text x="325" y="116" fontSize="12" fill="#64748b" fontWeight="bold">{pD}</text>
                <text x="112" y="215" fontSize="12" fill="#64748b" fontWeight="bold">{pE}</text>
                <text x="325" y="196" fontSize="12" fill="#64748b" fontWeight="bold">{pF}</text>
            </svg>
        );
    }

    if (type === 'triple-parallel') {
        // AB||CD||EF with transversal
        const { y: yAngle, z: zAngle, x: xAngle, rm, rn, pointLabels } = data;
        const [pA, pB, pC, pD, pE, pF] = pointLabels || ['A', 'B', 'C', 'D', 'E', 'F'];

        return (
            <svg viewBox="0 0 360 250" width="100%" style={{ maxWidth: 340, maxHeight: 230, background: '#f8fafc', borderRadius: 12 }}>
                {/* Three parallel lines */}
                <line x1="40" y1="50" x2="320" y2="50" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="40" y1="125" x2="320" y2="125" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="40" y1="200" x2="320" y2="200" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* Transversal */}
                <line x1="140" y1="30" x2="220" y2="220" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                {/* Angle labels */}
                <text x="165" y="45" fontSize="13" fill="#e11d48" fontWeight="bold">x</text>
                <text x="185" y="120" fontSize="13" fill="#059669" fontWeight="bold">y ({rm}k)</text>
                <text x="200" y="195" fontSize="13" fill="#7c3aed" fontWeight="bold">z ({rn}k)</text>

                {/* Point labels */}
                <text x="25" y="46" fontSize="12" fill="#64748b" fontWeight="bold">{pA}</text>
                <text x="315" y="46" fontSize="12" fill="#64748b" fontWeight="bold">{pB}</text>
                <text x="25" y="121" fontSize="12" fill="#64748b" fontWeight="bold">{pC}</text>
                <text x="315" y="121" fontSize="12" fill="#64748b" fontWeight="bold">{pD}</text>
                <text x="25" y="196" fontSize="12" fill="#64748b" fontWeight="bold">{pE}</text>
                <text x="315" y="196" fontSize="12" fill="#64748b" fontWeight="bold">{pF}</text>
            </svg>
        );
    }

    if (type === 'parallel-ext') {
        // Alternate exterior angles
        const { knownVal, tilt } = data;
        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                <line x1="50" y1="70" x2="250" y2="70" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="130" x2="250" y2="130" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="120" y1="30" x2="180" y2="170" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                <text x="30" y="74" fontSize="11" fill="#64748b">l</text>
                <text x="30" y="134" fontSize="11" fill="#64748b">m</text>

                {/* Top exterior angle (above l) */}
                <text x="110" y="60" fontSize="14" fill="#7c3aed" fontWeight="bold">{knownVal}°</text>
                {/* Bottom exterior angle (below m) */}
                <text x="185" y="155" fontSize="14" fill="#e11d48" fontWeight="bold">x</text>
            </svg>
        );
    }

    if (type === 'parallel-transversal-labelled') {
        // AB||CD with transversal PQ, labelled intersection points
        const { apq, pqd, pointLabels } = data;
        const [pA, pB, pC, pD, pP, pQ] = pointLabels || ['A', 'B', 'C', 'D', 'P', 'Q'];

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                {/* Line AB */}
                <line x1="30" y1="70" x2="310" y2="70" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Line CD */}
                <line x1="30" y1="150" x2="310" y2="150" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Transversal */}
                <line x1="130" y1="30" x2="200" y2="190" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                {/* Intersection points */}
                <circle cx="148" cy="70" r="4" fill="#0f172a" />
                <circle cx="178" cy="150" r="4" fill="#0f172a" />

                {/* Angle labels */}
                <text x="108" y="60" fontSize="13" fill="#7c3aed" fontWeight="bold">{apq}°</text>
                <text x="195" y="165" fontSize="13" fill="#e11d48" fontWeight="bold">x</text>

                {/* Line/Point labels */}
                <text x="22" y="65" fontSize="12" fill="#64748b" fontWeight="bold">{pA}</text>
                <text x="305" y="65" fontSize="12" fill="#64748b" fontWeight="bold">{pB}</text>
                <text x="22" y="145" fontSize="12" fill="#64748b" fontWeight="bold">{pC}</text>
                <text x="305" y="145" fontSize="12" fill="#64748b" fontWeight="bold">{pD}</text>
                <text x="155" y="65" fontSize="11" fill="#0f172a" fontWeight="bold">{pP}</text>
                <text x="185" y="145" fontSize="11" fill="#0f172a" fontWeight="bold">{pQ}</text>
            </svg>
        );
    }

    if (type === 'parallel-intersect-complex') {
        // AB||CD with lines intersecting at P on AB
        const { baseAngle, coInt, pointLabels } = data;
        const [pA, pB, pC, pD, pE, pF, pP] = pointLabels || ['A', 'B', 'C', 'D', 'E', 'F', 'P'];

        return (
            <svg viewBox="0 0 360 250" width="100%" style={{ maxWidth: 340, maxHeight: 230, background: '#f8fafc', borderRadius: 12 }}>
                {/* Line AB */}
                <line x1="30" y1="80" x2="330" y2="80" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Line CD */}
                <line x1="30" y1="190" x2="330" y2="190" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* Line EF through P */}
                <line x1="180" y1="80" x2="230" y2="190" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="180" y1="80" x2="130" y2="30" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                {/* Point P on AB */}
                <circle cx="180" cy="80" r="4" fill="#0f172a" />

                {/* Angle labels */}
                <text x="200" y="75" fontSize="13" fill="#0284c7" fontWeight="bold">{baseAngle}°</text>
                <text x="240" y="185" fontSize="13" fill="#e11d48" fontWeight="bold">x = ?</text>

                {/* Labels */}
                <text x="20" y="75" fontSize="12" fill="#64748b" fontWeight="bold">{pA}</text>
                <text x="325" y="75" fontSize="12" fill="#64748b" fontWeight="bold">{pB}</text>
                <text x="20" y="185" fontSize="12" fill="#64748b" fontWeight="bold">{pC}</text>
                <text x="325" y="185" fontSize="12" fill="#64748b" fontWeight="bold">{pD}</text>
                <text x="120" y="25" fontSize="12" fill="#0284c7" fontWeight="bold">{pE}</text>
                <text x="235" y="205" fontSize="12" fill="#0284c7" fontWeight="bold">{pF}</text>
                <text x="180" y="100" fontSize="11" fill="#0f172a" fontWeight="bold" textAnchor="middle">{pP}</text>
            </svg>
        );
    }

    if (type === 'angles-around-point') {
        const angles = data.angles;
        // Calculate actual numeric values for positioning
        const numericAngles = angles.map(a => typeof a === 'string' ? 90 : a);
        const totalAngle = numericAngles.reduce((s, a) => s + a, 0);
        
        // Build cumulative angles for ray directions (in degrees from 3 o'clock, going counterclockwise)
        const cumAngles = [0];
        for (let j = 0; j < numericAngles.length; j++) {
            cumAngles.push(cumAngles[j] + numericAngles[j]);
        }

        const r = 75;
        const cx = 170, cy = 110;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <circle cx={cx} cy={cy} r="4" fill="#0f172a" />

                {/* Rays */}
                {cumAngles.slice(0, -1).map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line key={ri} x1={cx} y1={cy}
                            x2={cx + r * Math.cos(rad)} y2={cy - r * Math.sin(rad)}
                            stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                    );
                })}

                {/* Angle labels */}
                {angles.map((label, ai) => {
                    const midAngle = ((cumAngles[ai] + cumAngles[ai + 1]) / 2) * Math.PI / 180;
                    const labelR = 50;
                    const colors = ['#0284c7', '#e11d48', '#059669', '#d97706', '#7c3aed'];
                    const displayLabel = typeof label === 'string' ? label : `${label}°`;
                    return (
                        <text key={ai}
                            x={cx + labelR * Math.cos(midAngle)}
                            y={cy - labelR * Math.sin(midAngle)}
                            fontSize="13" fill={colors[ai % 5]} fontWeight="bold" textAnchor="middle"
                            dominantBaseline="central"
                        >{displayLabel}</text>
                    );
                })}

                {/* Arcs */}
                {angles.map((_, ai) => {
                    const startRad = (cumAngles[ai] * Math.PI) / 180;
                    const endRad = (cumAngles[ai + 1] * Math.PI) / 180;
                    const arcR = 28;
                    const strokeColors = ['#0284c7', '#e11d48', '#059669', '#d97706', '#7c3aed'];
                    const span = numericAngles[ai];
                    const largeArc = span > 180 ? 1 : 0;
                    return (
                        <path key={'arc' + ai}
                            d={`M ${cx + arcR * Math.cos(startRad)} ${cy - arcR * Math.sin(startRad)} A ${arcR} ${arcR} 0 ${largeArc} 0 ${cx + arcR * Math.cos(endRad)} ${cy - arcR * Math.sin(endRad)}`}
                            stroke={strokeColors[ai % 5]} strokeWidth="2" fill="none"
                        />
                    );
                })}
            </svg>
        );
    }

    if (type === 'five-rays-point') {
        // 5 rays from a point
        const angles = data.angles;
        const numericAngles = angles.map(a => typeof a === 'string' ? (360 - angles.filter(x => typeof x === 'number').reduce((s, x) => s + x, 0)) : a);
        const cumAngles = [0];
        for (let j = 0; j < numericAngles.length; j++) {
            cumAngles.push(cumAngles[j] + numericAngles[j]);
        }

        const r = 75;
        const cx = 170, cy = 110;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <circle cx={cx} cy={cy} r="4" fill="#0f172a" />

                {cumAngles.slice(0, -1).map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line key={ri} x1={cx} y1={cy}
                            x2={cx + r * Math.cos(rad)} y2={cy - r * Math.sin(rad)}
                            stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                    );
                })}

                {angles.map((label, ai) => {
                    const midAngle = ((cumAngles[ai] + cumAngles[ai + 1]) / 2) * Math.PI / 180;
                    const labelR = 50;
                    const colors = ['#0284c7', '#e11d48', '#059669', '#d97706', '#7c3aed'];
                    const displayLabel = typeof label === 'string' ? label : `${label}°`;
                    return (
                        <text key={ai}
                            x={cx + labelR * Math.cos(midAngle)}
                            y={cy - labelR * Math.sin(midAngle)}
                            fontSize="12" fill={colors[ai % 5]} fontWeight="bold" textAnchor="middle"
                            dominantBaseline="central"
                        >{displayLabel}</text>
                    );
                })}

                {angles.map((_, ai) => {
                    const startRad = (cumAngles[ai] * Math.PI) / 180;
                    const endRad = (cumAngles[ai + 1] * Math.PI) / 180;
                    const arcR = 25;
                    const strokeColors = ['#0284c7', '#e11d48', '#059669', '#d97706', '#7c3aed'];
                    const span = numericAngles[ai];
                    const largeArc = span > 180 ? 1 : 0;
                    return (
                        <path key={'arc' + ai}
                            d={`M ${cx + arcR * Math.cos(startRad)} ${cy - arcR * Math.sin(startRad)} A ${arcR} ${arcR} 0 ${largeArc} 0 ${cx + arcR * Math.cos(endRad)} ${cy - arcR * Math.sin(endRad)}`}
                            stroke={strokeColors[ai % 5]} strokeWidth="2" fill="none"
                        />
                    );
                })}
            </svg>
        );
    }

    if (type === 'three-rays-around-point') {
        // 3 angles around a point summing to 360
        const angles = data.angles;
        const numericAngles = angles.map(a => typeof a === 'string' ? (360 - angles.filter(x => typeof x === 'number').reduce((s, x) => s + x, 0)) : a);
        const cumAngles = [0];
        for (let j = 0; j < numericAngles.length; j++) {
            cumAngles.push(cumAngles[j] + numericAngles[j]);
        }

        const r = 75;
        const cx = 170, cy = 110;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <circle cx={cx} cy={cy} r="4" fill="#0f172a" />

                {cumAngles.slice(0, -1).map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line key={ri} x1={cx} y1={cy}
                            x2={cx + r * Math.cos(rad)} y2={cy - r * Math.sin(rad)}
                            stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                    );
                })}

                {angles.map((label, ai) => {
                    const midAngle = ((cumAngles[ai] + cumAngles[ai + 1]) / 2) * Math.PI / 180;
                    const labelR = 50;
                    const colors = ['#0284c7', '#e11d48', '#059669'];
                    const displayLabel = typeof label === 'string' ? label : `${label}°`;
                    return (
                        <text key={ai}
                            x={cx + labelR * Math.cos(midAngle)}
                            y={cy - labelR * Math.sin(midAngle)}
                            fontSize="13" fill={colors[ai % 3]} fontWeight="bold" textAnchor="middle"
                            dominantBaseline="central"
                        >{displayLabel}</text>
                    );
                })}
            </svg>
        );
    }

    if (type === 'triangle-exterior') {
        // Triangle with an exterior angle
        const { intA, intB, extC, pointLabels } = data;
        const [pP, pQ, pR, pS] = pointLabels || ['P', 'Q', 'R', 'S'];

        return (
            <svg viewBox="0 0 360 230" width="100%" style={{ maxWidth: 340, maxHeight: 210, background: '#f8fafc', borderRadius: 12 }}>
                {/* Triangle PQR */}
                <polygon points="180,40 80,180 260,180" fill="none" stroke="#334155" strokeWidth="3" strokeLinejoin="round" />
                
                {/* Extended side QR to S */}
                <line x1="260" y1="180" x2="340" y2="180" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* Angle arcs */}
                {/* Angle P (top) */}
                <path d="M 172,58 A 18 18 0 0 1 188,58" stroke="#0284c7" strokeWidth="2" fill="rgba(2,132,199,0.1)" />
                {/* Angle Q (bottom-left) */}
                <path d="M 98,170 A 18 18 0 0 0 88,164" stroke="#059669" strokeWidth="2" fill="rgba(5,150,105,0.1)" />
                {/* Exterior angle at R */}
                <path d="M 280,180 A 20 20 0 0 0 254,168" stroke="#e11d48" strokeWidth="2.5" fill="rgba(225,29,72,0.1)" />

                {/* Labels */}
                <text x="180" y="32" fontSize="13" fill="#0284c7" fontWeight="bold" textAnchor="middle">{intA}°</text>
                <text x="70" y="192" fontSize="13" fill="#059669" fontWeight="bold">{intB}°</text>
                <text x="295" y="172" fontSize="13" fill="#e11d48" fontWeight="bold">x</text>

                {/* Point labels */}
                <text x="180" y="22" fontSize="12" fill="#64748b" fontWeight="bold" textAnchor="middle">{pP}</text>
                <text x="65" y="195" fontSize="12" fill="#64748b" fontWeight="bold">{pQ}</text>
                <text x="268" y="195" fontSize="12" fill="#64748b" fontWeight="bold">{pR}</text>
                <text x="340" y="195" fontSize="12" fill="#64748b" fontWeight="bold">{pS}</text>
            </svg>
        );
    }

    return null;
};

// Simple interactive protractor component for drawing/measuring angles
const InteractiveProtractor = ({ angle, onChange }) => {
    const [userAngle, setUserAngle] = useState(0);
    const svgRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerMove = (e) => {
        if (!isDragging || !svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height - 20; // base line y offset
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dx = x - centerX;
        const dy = centerY - y;
        
        let deg = Math.atan2(dy, dx) * (180 / Math.PI);
        if (deg < 0) deg = 0;
        if (deg > 180) deg = 180;
        
        const finalAngle = Math.round(deg);
        setUserAngle(finalAngle);
        if (onChange) onChange(finalAngle);
    };

    return (
        <div style={{ padding: 20, background: '#f8fafc', borderRadius: 12, textAlign: 'center' }}>
            <svg 
                ref={svgRef}
                viewBox="0 0 300 160" 
                style={{ width: '100%', maxWidth: 280, maxHeight: 180, touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
                onPointerDown={(e) => { setIsDragging(true); handlePointerMove(e); e.currentTarget.setPointerCapture(e.pointerId); }}
                onPointerMove={handlePointerMove}
                onPointerUp={(e) => { setIsDragging(false); e.currentTarget.releasePointerCapture(e.pointerId); }}
            >
                {/* Target Graphic (ghosted) */}
                <line x1="150" y1="140" x2="250" y2="140" stroke="#cbd5e1" strokeWidth="4" />
                <line x1="150" y1="140" x2={150 + 100 * Math.cos(angle * Math.PI / 180)} y2={140 - 100 * Math.sin(angle * Math.PI / 180)} stroke="#cbd5e1" strokeWidth="4" />

                {/* User Graphic */}
                <line x1="150" y1="140" x2="250" y2="140" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="150" cy="140" r="6" fill="#0f172a" />
                
                <line x1="150" y1="140" x2={150 + 100 * Math.cos(userAngle * Math.PI / 180)} y2={140 - 100 * Math.sin(userAngle * Math.PI / 180)} stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                <circle cx={150 + 100 * Math.cos(userAngle * Math.PI / 180)} cy={140 - 100 * Math.sin(userAngle * Math.PI / 180)} r="8" fill="#e11d48" />
                
                {/* Arc */}
                {userAngle > 0 && <path d={`M 180 140 A 30 30 0 0 0 ${150 + 30 * Math.cos(userAngle * Math.PI / 180)} ${140 - 30 * Math.sin(userAngle * Math.PI / 180)}`} stroke="#0284c7" strokeWidth="2" fill="none" />}
            </svg>
            <div style={{ marginTop: 12, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                Your Angle: <span style={{ color: '#0284c7' }}>{userAngle}°</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b' }}>Drag the red handle to match the grey angle drawing.</div>
        </div>
    );
};
