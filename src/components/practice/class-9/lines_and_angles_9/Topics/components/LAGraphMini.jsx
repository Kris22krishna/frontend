import React, { useState, useRef, useEffect } from 'react';

const describeArc = (x, y, radius, startAngle, endAngle) => {
    let diff = endAngle - startAngle;
    if (diff < 0) diff += 360;
    const largeArcFlag = diff <= 180 ? "0" : "1";
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const startX = x + radius * Math.cos(startRad);
    const startY = y - radius * Math.sin(startRad);
    const endX = x + radius * Math.cos(endRad);
    const endY = y - radius * Math.sin(endRad);
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY}`;
};

const AngleLabel = ({ cx, cy, angleRadius, angleMid, text, color }) => {
    if (text === undefined || text === null || text === '') return null;
    const isUnknown = String(text).includes('x') || String(text).includes('?') || String(text).includes('y') || String(text).includes('z');
    const rad = (angleMid * Math.PI) / 180.0;
    const px = cx + angleRadius * Math.cos(rad);
    const py = cy - angleRadius * Math.sin(rad); 
    return (
        <text 
            x={px} y={py} 
            fontSize={isUnknown ? "16" : "13"} 
            fill={isUnknown ? "#e11d48" : (color || "#0284c7")} fontFamily="Times New Roman, serif" fontStyle="italic" 
            fontWeight="bold" 
            textAnchor="middle" 
            dominantBaseline="central"
            style={isUnknown ? { filter: 'drop-shadow(0px 0px 3px rgba(255,255,255,0.9))' } : {}}
        >
            {text}
        </text>
    );
};

// Renders the different SVG question types
export const LAGraphMini = ({ config, onProtractorChange }) => {
    if (!config) return null;

    const { type, data } = config;

    if (type === 'protractor-measure') {
        return <InteractiveProtractor angle={data.angle} onChange={onProtractorChange} />;
    }

    if (type === 'linear-pair') {
        const { a1, a2, splitAngle, pointLabels } = data;
        const [pL, pO, pR, pC] = pointLabels || ['P', 'O', 'Q', ''];
        const rad = (splitAngle * Math.PI) / 180;
        const r = 100;
        const cx = 170;
        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="160" x2="300" y2="160" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx={cx} cy="160" r="4" fill="#0f172a" />
                <line markerEnd="url(#arrow)" x1={cx} y1="160" x2={cx + r * Math.cos(rad)} y2={160 - r * Math.sin(rad)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                
                <path d={describeArc(cx, 160, 30, 0, splitAngle)} stroke="#0284c7" strokeWidth="2.5" fill="none" />
                <path d={describeArc(cx, 160, 30, splitAngle, 180)} stroke="#e11d48" strokeWidth="2.5" fill="none" />
                
                <AngleLabel cx={cx} cy={160} angleRadius={50} angleMid={splitAngle / 2} text={a1} color="#0284c7" />
                <AngleLabel cx={cx} cy={160} angleRadius={50} angleMid={(180 + splitAngle) / 2} text={a2} color="#e11d48" />
                
                <text x="35" y="145" fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pL}</text>
                <text x={cx} y="180" fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">{pO}</text>
                <text x="295" y="145" fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pR}</text>
                {pC && <text x={cx + (r+12) * Math.cos(rad)} y={160 - (r+12) * Math.sin(rad)} fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pC}</text>}
            </svg>
        );
    }

    if (type === 'linear-pair-labelled') {
        const { labelLeft, labelRight, splitAngle, pointLabels } = data;
        const r = 100;
        const rad = (splitAngle * Math.PI) / 180;
        const [pA, pO, pB, pC] = pointLabels || ['A', 'O', 'B', 'C'];
        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="20" y1="160" x2="320" y2="160" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="160" r="4" fill="#0f172a" />
                
                <line markerEnd="url(#arrow)" x1="170" y1="160" x2={170 + r * Math.cos(rad)} y2={160 - r * Math.sin(rad)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                
                <path d={describeArc(170, 160, 30, splitAngle, 180)} stroke="#e11d48" strokeWidth="2.5" fill="none" />
                <path d={describeArc(170, 160, 30, 0, splitAngle)} stroke="#0284c7" strokeWidth="2.5" fill="none" />
                
                <AngleLabel cx={170} cy={160} angleRadius={50} angleMid={(180 + splitAngle) / 2} text={labelLeft} color="#e11d48" />
                <AngleLabel cx={170} cy={160} angleRadius={50} angleMid={splitAngle / 2} text={labelRight} color="#0284c7" />
                
                <text x="15" y="175" fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pA}</text>
                <text x="170" y="185" fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">{pO}</text>
                <text x="318" y="175" fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pB}</text>
                <text x={170 + (r+12) * Math.cos(rad)} y={160 - (r+12) * Math.sin(rad)} fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pC}</text>
            </svg>
        );
    }

    if (type === 'bisector-on-line') {
        const { mainAngle, pointLabels } = data;
        const [pP, pO, pQ, pS, pR, pT] = pointLabels || ['P', 'O', 'Q', 'S', 'R', 'T'];
        const radS = (mainAngle * Math.PI) / 180;
        const r = 90;
        const rBis = 80;

        const bisLeftDeg = (180 + mainAngle) / 2;
        const bisRightDeg = mainAngle / 2;
        const radR = (bisLeftDeg * Math.PI) / 180;
        const radT = (bisRightDeg * Math.PI) / 180;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="20" y1="170" x2="320" y2="170" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="170" r="4" fill="#0f172a" />

                <line markerEnd="url(#arrow)" x1="170" y1="170" x2={170 + r * Math.cos(radS)} y2={170 - r * Math.sin(radS)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" x1="170" y1="170" x2={170 + rBis * Math.cos(radR)} y2={170 - rBis * Math.sin(radR)} stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,3" />
                <line markerEnd="url(#arrow)" x1="170" y1="170" x2={170 + rBis * Math.cos(radT)} y2={170 - rBis * Math.sin(radT)} stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,3" />

                <path d={describeArc(170, 170, 25, bisRightDeg, bisLeftDeg)} stroke="#059669" strokeWidth="2.5" fill="none" />
                <AngleLabel cx={170} cy={170} angleRadius={50} angleMid={90} text="∠ROT = ?" color="#059669" />

                <text x="15" y="185" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pP}</text>
                <text x="170" y="195" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">{pO}</text>
                <text x="318" y="185" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pQ}</text>
                <text x={170 + (r+10) * Math.cos(radS)} y={170 - (r+10) * Math.sin(radS)} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pS}</text>
                <text x={170 + (rBis+10) * Math.cos(radR)} y={170 - (rBis+10) * Math.sin(radR)} fontSize="12" fill="#0284c7" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pR}</text>
                <text x={170 + (rBis+10) * Math.cos(radT)} y={170 - (rBis+10) * Math.sin(radT)} fontSize="12" fill="#e11d48" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pT}</text>
            </svg>
        );
    }

    if (type === 'three-rays-on-line') {
        const { angles, pointLabels } = data;
        const [pP, pO, pQ, pA, pB] = pointLabels || ['P', 'O', 'Q', 'A', 'B'];
        const r = 90;

        const numericAngles = angles.map(a => {
            if (typeof a === 'number') return a;
            const parsed = parseInt(a);
            if (!isNaN(parsed)) return parsed;
            const knownSum = angles.reduce((s, v) => {
                if (typeof v === 'number') return s + v;
                const p = parseInt(v);
                return !isNaN(p) ? s + p : s;
            }, 0);
            return 180 - knownSum;
        });

        const cumAngles = [180];
        for (let j = 0; j < numericAngles.length; j++) {
            cumAngles.push(cumAngles[j] - numericAngles[j]);
        }
        const rayAngles = cumAngles.slice(1, -1);

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="20" y1="170" x2="320" y2="170" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="170" r="4" fill="#0f172a" />

                {rayAngles.map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line markerEnd="url(#arrow)" markerStart="url(#arrow)" key={ri} x1="170" y1="170"
                            x2={170 + r * Math.cos(rad)} y2={170 - r * Math.sin(rad)}
                            stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
                    );
                })}

                {angles.map((label, ai) => {
                    const colors = ['#0284c7', '#059669', '#e11d48'];
                    return <AngleLabel key={ai} cx={170} cy={170} angleRadius={50} angleMid={(cumAngles[ai]+cumAngles[ai+1])/2} text={label} color={colors[ai%3]} />;
                })}

                {angles.map((_, ai) => {
                    const strokeColors = ['#0284c7', '#059669', '#e11d48'];
                    return <path key={'arc'+ai} d={describeArc(170, 170, 30, cumAngles[ai+1], cumAngles[ai])} stroke={strokeColors[ai%3]} strokeWidth="2" fill="none" />;
                })}

                <text x="15" y="185" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pP}</text>
                <text x="170" y="195" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">{pO}</text>
                <text x="318" y="185" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pQ}</text>
                {rayAngles.map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    const rayLabels = [pA, pB];
                    return (
                        <text key={'rl' + ri}
                            x={170 + (r + 12) * Math.cos(rad)}
                            y={170 - (r + 12) * Math.sin(rad)}
                            fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle" dominantBaseline="central"
                        >{rayLabels[ri] || ''}</text>
                    );
                })}
            </svg>
        );
    }

    if (type === 'intersecting') {
        const { top, bottom, left, right, angle, pointLabels } = data;
        const [pP, pQ, pR, pS, pO] = pointLabels || ['', '', '', '', 'O'];
        const rad = (angle * Math.PI) / 180;
        const r = 90;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r} y1="110" x2={170 + r} y2="110" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r * Math.cos(rad)} y1={110 + r * Math.sin(rad)} x2={170 + r * Math.cos(rad)} y2={110 - r * Math.sin(rad)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="110" r="4" fill="#0f172a" />
                
                <path d={describeArc(170, 110, 25, 0, angle)} stroke="#d97706" strokeWidth="2" fill="none" />
                <path d={describeArc(170, 110, 25, angle, 180)} stroke="#059669" strokeWidth="2" fill="none" />
                <path d={describeArc(170, 110, 25, 180, 180+angle)} stroke="#d97706" strokeWidth="2" fill="none" />
                <path d={describeArc(170, 110, 25, 180+angle, 360)} stroke="#059669" strokeWidth="2" fill="none" />
                
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={90 + angle/2} text={top} color="#059669" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={270 + angle/2} text={bottom} color="#059669" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={180 + angle/2} text={left} color="#d97706" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={angle/2} text={right} color="#d97706" />
                
                {pP && <text x={170 - r - 12} y="115" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pP}</text>}
                {pQ && <text x={170 + r + 8} y="115" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pQ}</text>}
                {pR && <text x={170 + (r+10) * Math.cos(rad)} y={110 - (r+10) * Math.sin(rad)} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pR}</text>}
                {pS && <text x={170 - (r+10) * Math.cos(rad)} y={110 + (r+10) * Math.sin(rad)} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pS}</text>}
                {pO && <text x="178" y="125" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pO}</text>}
            </svg>
        );
    }

    if (type === 'intersecting-labelled') {
        const { labels, angle, pointLabels } = data;
        const [pP, pQ, pR, pS, pO] = pointLabels || ['P', 'Q', 'R', 'S', 'O'];
        const rad = (angle * Math.PI) / 180;
        const r = 90;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r} y1="110" x2={170 + r} y2="110" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r * Math.cos(rad)} y1={110 + r * Math.sin(rad)} x2={170 + r * Math.cos(rad)} y2={110 - r * Math.sin(rad)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="110" r="4" fill="#0f172a" />

                <path d={describeArc(170, 110, 25, 90 + angle/2, 90 + angle/2)} stroke="#0284c7" strokeWidth="2" fill="none" />
                <path d={describeArc(170, 110, 25, angle/2, angle/2)} stroke="#e11d48" strokeWidth="2" fill="none" />
                <path d={describeArc(170, 110, 25, 270 + angle/2, 270 + angle/2)} stroke="#0284c7" strokeWidth="2" fill="none" />
                <path d={describeArc(170, 110, 25, 180 + angle/2, 180 + angle/2)} stroke="#e11d48" strokeWidth="2" fill="none" />

                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={90 + angle/2} text={labels[0]} color="#0284c7" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={angle/2} text={labels[1]} color="#e11d48" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={270 + angle/2} text={labels[2]} color="#0284c7" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={180 + angle/2} text={labels[3]} color="#e11d48" />

                <text x={170 - r - 12} y="115" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pP}</text>
                <text x={170 + r + 8} y="115" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pQ}</text>
                <text x={170 + (r+10) * Math.cos(rad)} y={110 - (r+10) * Math.sin(rad)} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pR}</text>
                <text x={170 - (r+10) * Math.cos(rad)} y={110 + (r+10) * Math.sin(rad)} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pS}</text>
                <text x="178" y="125" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pO}</text>
            </svg>
        );
    }

    if (type === 'intersecting-four') {
        const { a, b, angle } = data;
        const rad = (angle * Math.PI) / 180;
        const r = 90;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r} y1="110" x2={170 + r} y2="110" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r * Math.cos(rad)} y1={110 + r * Math.sin(rad)} x2={170 + r * Math.cos(rad)} y2={110 - r * Math.sin(rad)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="110" r="4" fill="#0f172a" />

                <path d={describeArc(170, 110, 25, 0, angle)} stroke="#0284c7" strokeWidth="2" fill="none" />
                <path d={describeArc(170, 110, 25, angle, 180)} stroke="#e11d48" strokeWidth="2" fill="none" />

                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={angle/2} text={`${a}°`} color="#0284c7" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={90 + angle/2} text={`${b}°`} color="#e11d48" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={180 + angle/2} text={`${a}°`} color="#0284c7" />
                <AngleLabel cx={170} cy={110} angleRadius={45} angleMid={270 + angle/2} text="x" color="#e11d48" />

                <text x="178" y="125" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="600">O</text>
            </svg>
        );
    }

    if (type === 'intersecting-reflex') {
        const { a, reflex, angle } = data;
        const rad = (angle * Math.PI) / 180;
        const r = 80;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r} y1="110" x2={170 + r} y2="110" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r * Math.cos(rad)} y1={110 + r * Math.sin(rad)} x2={170 + r * Math.cos(rad)} y2={110 - r * Math.sin(rad)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="110" r="4" fill="#0f172a" />

                <path d={describeArc(170, 110, 25, 0, angle)} stroke="#0284c7" strokeWidth="2.5" fill="none" />
                <AngleLabel cx={170} cy={110} angleRadius={40} angleMid={angle/2} text={`${a}°`} color="#0284c7" />

                <path d={describeArc(170, 110, 40, angle, 360)} stroke="#e11d48" strokeWidth="2" fill="none" strokeDasharray="5,3" />
                <AngleLabel cx={170} cy={110} angleRadius={60} angleMid={(360+angle)/2} text="x = ?" color="#e11d48" />
                
                <text x="178" y="125" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">O</text>
            </svg>
        );
    }

    if (type === 'three-lines-point') {
        const { angles, pointLabels } = data;
        const r = 80;
        const cumAngles = [0];
        for (let j = 0; j < angles.length; j++) {
            cumAngles.push(cumAngles[j] + angles[j]);
        }

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <circle cx="170" cy="130" r="4" fill="#0f172a" />
                <text x="178" y="148" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">O</text>

                {[0, ...cumAngles.slice(1, 4)].map((deg, li) => {
                    if (deg === undefined) return null;
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line markerEnd="url(#arrow)" markerStart="url(#arrow)" key={li}
                            x1={170 - r * Math.cos(rad)} y1={130 + r * Math.sin(rad)}
                            x2={170 + r * Math.cos(rad)} y2={130 - r * Math.sin(rad)}
                            stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
                    );
                })}

                {angles.map((a, ai) => {
                    const colors = ['#0284c7', '#059669', '#e11d48'];
                    return <AngleLabel key={ai} cx={170} cy={130} angleRadius={45} angleMid={(cumAngles[ai]+cumAngles[ai+1])/2} text={`${a}°`} color={colors[ai%3]} />;
                })}

                {angles.map((_, ai) => {
                    const strokeColors = ['#0284c7', '#059669', '#e11d48'];
                    return <path key={'arc'+ai} d={describeArc(170, 130, 25, cumAngles[ai], cumAngles[ai+1])} stroke={strokeColors[ai%3]} strokeWidth="2" fill="none" />;
                })}
            </svg>
        );
    }

    if (type === 'intersecting-extra-ray') {
        const { angleBOD, angleBOE, angleAOE, pointLabels } = data;
        const [pA, pB, pC, pD, pO, pE] = pointLabels || ['A', 'B', 'C', 'D', 'O', 'E'];
        const r = 85;
        const radCD = (angleBOD * Math.PI) / 180;
        
        let radOE;
        let isAOE = false;
        if (angleAOE !== undefined) {
            radOE = (180 + angleAOE) * Math.PI / 180;
            isAOE = true;
        } else {
            radOE = (angleBOE * Math.PI) / 180;
        }

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r} y1="120" x2={170 + r} y2="120" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={170 - r * Math.cos(radCD)} y1={120 + r * Math.sin(radCD)} x2={170 + r * Math.cos(radCD)} y2={120 - r * Math.sin(radCD)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" x1="170" y1="120" x2={170 + r * Math.cos(radOE)} y2={120 - r * Math.sin(radOE)} stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6,4" />

                <circle cx="170" cy="120" r="4" fill="#0f172a" />

                <text x={170 - r - 12} y="125" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pA}</text>
                <text x={170 + r + 6} y="125" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pB}</text>
                <text x={170 + (r+10) * Math.cos(radCD)} y={120 - (r+10) * Math.sin(radCD)} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pD}</text>
                <text x={170 - (r+10) * Math.cos(radCD)} y={120 + (r+10) * Math.sin(radCD)} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pC}</text>
                <text x={170 + (r+10) * Math.cos(radOE)} y={120 - (r+10) * Math.sin(radOE)} fontSize="12" fill="#7c3aed" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{pE}</text>
                <text x="178" y="138" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pO}</text>

                <path d={describeArc(170, 120, 25, 0, angleBOD)} stroke="#0284c7" strokeWidth="2" fill="none" />
                <AngleLabel cx={170} cy={120} angleRadius={45} angleMid={angleBOD/2} text={`${angleBOD}°`} color="#0284c7" />
                
                {isAOE ? (
                    <>
                        <path d={describeArc(170, 120, 22, 180, 180 + angleAOE)} stroke="#e11d48" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                        <AngleLabel cx={170} cy={120} angleRadius={40} angleMid={180 + angleAOE/2} text={`${angleAOE}°`} color="#e11d48" />
                    </>
                ) : (
                    <>
                        <path d={describeArc(170, 120, 22, 0, angleBOE)} stroke="#e11d48" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                        <AngleLabel cx={170} cy={120} angleRadius={40} angleMid={angleBOE/2} text={`${angleBOE}°`} color="#e11d48" />
                    </>
                )}
            </svg>
        );
    }

    if (type === 'parallel') {
        const { knownLoc, unknownLoc, knownVal, tilt } = data;
        const rad = (tilt * Math.PI) / 180;
        
        const dy = 60; // 130 - 70
        const dx = dy / Math.tan(rad);
        const topX = 150 + dx/2;
        const botX = 150 - dx/2;

        const renderAngle = (loc, text, color) => {
            const isTop = loc.startsWith('t-');
            const cx = isTop ? topX : botX;
            const cy = isTop ? 70 : 130;
            const quad = loc.split('-')[1];

            let startAngle, endAngle, midAngle;
            if (quad === 'tr') { startAngle = 0; endAngle = tilt; midAngle = tilt / 2; }
            else if (quad === 'tl') { startAngle = tilt; endAngle = 180; midAngle = 90 + tilt / 2; }
            else if (quad === 'bl') { startAngle = 180; endAngle = 180 + tilt; midAngle = 180 + tilt / 2; }
            else if (quad === 'br') { startAngle = 180 + tilt; endAngle = 360; midAngle = 360 - (180 - tilt) / 2; }

            return (
                <g key={loc}>
                    <path d={describeArc(cx, cy, 25, startAngle, endAngle)} stroke={color} strokeWidth="2" fill="none" />
                    <AngleLabel cx={cx} cy={cy} angleRadius={35} angleMid={midAngle} text={text} color={color} />
                </g>
            );
        };

        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="70" x2="260" y2="70" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="130" x2="260" y2="130" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <text x="25" y="60" fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic">l</text>
                <text x="25" y="120" fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic">m</text>
                
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={botX - 40*Math.cos(rad)} y1={130 + 40*Math.sin(rad)} x2={topX + 40*Math.cos(rad)} y2={70 - 40*Math.sin(rad)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                
                {knownLoc && renderAngle(knownLoc, `${knownVal}°`, "#0ea5e9")}
                {unknownLoc && renderAngle(unknownLoc, "x", "#e11d48")}
            </svg>
        );
    }

    if (type === 'parallel-aux-line') {
        const { mxq, myr, xmy, pointLabels } = data;
        const [pP, pQ, pR, pS, pM, pX, pY] = pointLabels || ['P', 'Q', 'R', 'S', 'M', 'X', 'Y'];

        return (
            <svg viewBox="0 0 360 250" width="100%" style={{ maxWidth: 340, maxHeight: 230, background: '#f8fafc', borderRadius: 12 }}>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="30" y1="60" x2="330" y2="60" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="30" y1="190" x2="330" y2="190" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="230" y1="60" x2="170" y2="125" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="170" y1="125" x2="230" y2="190" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="60" y1="125" x2="300" y2="125" stroke="#059669" strokeWidth="1.5" strokeDasharray="6,4" />
                <circle cx="170" cy="125" r="4" fill="#0f172a" />

                <path d={describeArc(230, 60, 25, 225, 360)} stroke="#0ea5e9" strokeWidth="2" fill="none" />
                <AngleLabel cx={230} cy={60} angleRadius={35} angleMid={292.5} text={`${mxq}°`} color="#0ea5e9" />
                
                <path d={describeArc(230, 190, 25, 135, 180)} stroke="#0ea5e9" strokeWidth="2" fill="none" />
                <AngleLabel cx={230} cy={190} angleRadius={40} angleMid={157.5} text={`${myr}°`} color="#0ea5e9" />
                
                <text x="175" y="105" fontSize="14" fill="#e11d48" fontWeight="bold">∠XMY = ?</text>

                <text x="25" y="45" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pP}</text>
                <text x="325" y="45" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pQ}</text>
                <text x="25" y="175" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pR}</text>
                <text x="325" y="175" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pS}</text>
                <text x="150" y="130" fontSize="12" fill="#0f172a" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">{pM}</text>
                <text x="225" y="50" fontSize="12" fill="#0f172a" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pX}</text>
                <text x="225" y="210" fontSize="12" fill="#0f172a" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pY}</text>
                <circle cx="230" cy="60" r="3" fill="#0f172a" />
                <circle cx="230" cy="190" r="3" fill="#0f172a" />
            </svg>
        );
    }

    if (type === 'parallel-perp') {
        const { bef, z, x, y, pointLabels } = data;
        const [pA, pB, pC, pD, pE, pF] = pointLabels || ['A', 'B', 'C', 'D', 'E', 'F'];

        return (
            <svg viewBox="0 0 360 250" width="100%" style={{ maxWidth: 340, maxHeight: 230, background: '#f8fafc', borderRadius: 12 }}>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="80" y1="50" x2="330" y2="50" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="80" y1="120" x2="330" y2="120" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="80" y1="200" x2="330" y2="200" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="120" y1="50" x2="120" y2="200" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                <rect x="120" y="50" width="10" height="10" fill="none" stroke="#0284c7" strokeWidth="1.5" />

                <path d={describeArc(120, 200, 25, 0, 90)} stroke="#e11d48" strokeWidth="2" fill="none" />
                <AngleLabel cx={120} cy={200} angleRadius={40} angleMid={45} text={`${bef}°`} color="#e11d48" />
                
                <path d={describeArc(120, 200, 25, 90, 180)} stroke="#059669" strokeWidth="2" fill="none" />
                <AngleLabel cx={120} cy={200} angleRadius={40} angleMid={135} text="z" color="#059669" />

                <text x="110" y="35" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pA}</text>
                <text x="325" y="35" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pB}</text>
                <text x="90" y="105" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pC}</text>
                <text x="325" y="105" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pD}</text>
                <text x="110" y="215" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pE}</text>
                <text x="325" y="215" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pF}</text>
            </svg>
        );
    }

    if (type === 'triple-parallel') {
        const { y: yAngle, z: zAngle, x: xAngle, rm, rn, pointLabels } = data;
        const [pA, pB, pC, pD, pE, pF] = pointLabels || ['A', 'B', 'C', 'D', 'E', 'F'];
        const tilt = 65;
        const rad = (tilt * Math.PI) / 180;

        // Three lines: y=50, y=125, y=200. Transversal crosses all three.
        const midX = 180;
        const topX = midX + (75 / Math.tan(rad));
        const botX = midX - (75 / Math.tan(rad));

        return (
            <svg viewBox="0 0 360 250" width="100%" style={{ maxWidth: 340, maxHeight: 230, background: '#f8fafc', borderRadius: 12 }}>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="50" x2="320" y2="50" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="125" x2="320" y2="125" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="200" x2="320" y2="200" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={botX - 30*Math.cos(rad)} y1={200 + 30*Math.sin(rad)} x2={topX + 30*Math.cos(rad)} y2={50 - 30*Math.sin(rad)} stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                <path d={describeArc(topX, 50, 25, 0, tilt)} stroke="#e11d48" strokeWidth="2" fill="none" />
                <AngleLabel cx={topX} cy={50} angleRadius={35} angleMid={tilt/2} text="x" color="#e11d48" />
                
                <path d={describeArc(midX, 125, 25, 0, tilt)} stroke="#059669" strokeWidth="2" fill="none" />
                <AngleLabel cx={midX} cy={125} angleRadius={35} angleMid={tilt/2} text={`y (${rm}k)`} color="#059669" />
                
                <path d={describeArc(botX, 200, 25, 0, tilt)} stroke="#7c3aed" strokeWidth="2" fill="none" />
                <AngleLabel cx={botX} cy={200} angleRadius={35} angleMid={tilt/2} text={`z (${rn}k)`} color="#7c3aed" />

                <text x="35" y="35" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pA}</text>
                <text x="315" y="35" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pB}</text>
                <text x="35" y="110" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pC}</text>
                <text x="315" y="110" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pD}</text>
                <text x="35" y="185" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pE}</text>
                <text x="315" y="185" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pF}</text>
            </svg>
        );
    }

    if (type === 'parallel-ext') {
        const { knownVal, tilt } = data;
        const rad = ((tilt || 65) * Math.PI) / 180;
        const dy = 60;
        const dx = dy / Math.tan(rad);
        const topX = 150 + dx/2;
        const botX = 150 - dx/2;

        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="70" x2="260" y2="70" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="130" x2="260" y2="130" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={botX - 40*Math.cos(rad)} y1={130 + 40*Math.sin(rad)} x2={topX + 40*Math.cos(rad)} y2={70 - 40*Math.sin(rad)} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

                <text x="30" y="74" fontSize="11" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic">l</text>
                <text x="30" y="134" fontSize="11" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic">m</text>

                <path d={describeArc(topX, 70, 25, 0, (tilt||65))} stroke="#7c3aed" strokeWidth="2" fill="none" />
                <AngleLabel cx={topX} cy={70} angleRadius={35} angleMid={(tilt||65)/2} text={`${knownVal}°`} color="#7c3aed" />
                
                <path d={describeArc(botX, 130, 25, 180, 180+(tilt||65))} stroke="#e11d48" strokeWidth="2" fill="none" />
                <AngleLabel cx={botX} cy={130} angleRadius={35} angleMid={180 + (tilt||65)/2} text="x" color="#e11d48" />
            </svg>
        );
    }

    if (type === 'parallel-transversal-labelled') {
        const { apq, pqd, pointLabels } = data;
        const [pA, pB, pC, pD, pP, pQ] = pointLabels || ['A', 'B', 'C', 'D', 'P', 'Q'];
        const tilt = 65;
        const rad = (tilt * Math.PI) / 180;
        const dy = 120;
        const dx = dy / Math.tan(rad);
        const topX = 170 + dx/2;
        const botX = 170 - dx/2;

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="60" x2="300" y2="60" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="40" y1="180" x2="300" y2="180" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={botX - 40*Math.cos(rad)} y1={180 + 40*Math.sin(rad)} x2={topX + 40*Math.cos(rad)} y2={60 - 40*Math.sin(rad)} stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                <path d={describeArc(topX, 60, 25, 180, 180+tilt)} stroke="#e11d48" strokeWidth="2" fill="none" />
                <AngleLabel cx={topX} cy={60} angleRadius={35} angleMid={180 + tilt/2} text={`${apq}°`} color="#e11d48" />
                
                <path d={describeArc(botX, 180, 25, 0, tilt)} stroke="#059669" strokeWidth="2" fill="none" />
                <AngleLabel cx={botX} cy={180} angleRadius={35} angleMid={tilt/2} text={`x (${pqd}°)`} color="#059669" />

                <text x="35" y="45" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pA}</text>
                <text x="295" y="45" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pB}</text>
                <text x="35" y="165" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pC}</text>
                <text x="295" y="165" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pD}</text>
                
                <text x={topX - 10} y={45} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pP}</text>
                <text x={botX + 10} y={195} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pQ}</text>
            </svg>
        );
    }

    if (type === 'parallel-intersect-complex') {
        const { baseAngle, coInt, pointLabels } = data;
        const [pA, pB, pC, pD, pE, pF, pP] = pointLabels || ['A', 'B', 'C', 'D', 'E', 'F', 'P'];
        const tilt = 60;
        const rad = (tilt * Math.PI) / 180;

        return (
            <svg viewBox="0 0 360 250" width="100%" style={{ maxWidth: 340, maxHeight: 230, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="30" y1="80" x2="330" y2="80" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="30" y1="190" x2="330" y2="190" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="180" y1="80" x2={180 + 110*Math.cos(rad)} y2={80 + 110*Math.sin(rad)} stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1="180" y1="80" x2={180 - 50*Math.cos(rad)} y2={80 - 50*Math.sin(rad)} stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                <circle cx="180" cy="80" r="4" fill="#0f172a" />

                <path d={describeArc(180, 80, 25, -tilt, 0)} stroke="#0284c7" strokeWidth="2" fill="none" />
                <AngleLabel cx={180} cy={80} angleRadius={35} angleMid={-tilt/2} text={`${baseAngle}°`} color="#0284c7" />
                <AngleLabel cx={180 + 110*Math.cos(rad) * (110/(110))  } cy={190} angleRadius={35} angleMid={180-tilt/2} text="x = ?" color="#e11d48" />

                <text x="20" y="75" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pA}</text>
                <text x="325" y="75" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pB}</text>
                <text x="20" y="185" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pC}</text>
                <text x="325" y="185" fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pD}</text>
                <text x={180 - 50*Math.cos(rad) - 10} y={80 - 50*Math.sin(rad) - 8} fontSize="12" fill="#0284c7" fontWeight="bold">{pE}</text>
                <text x={180 + 110*Math.cos(rad) + 6} y={80 + 110*Math.sin(rad) + 12} fontSize="12" fill="#0284c7" fontWeight="bold">{pF}</text>
                <text x="180" y="100" fontSize="11" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">{pP}</text>
            </svg>
        );
    }

    if (type === 'angles-around-point') {
        const angles = data.angles;
        const knownSum = angles.filter(x => typeof x === 'number').reduce((s, x) => s + x, 0);
        const numericAngles = angles.map(a => typeof a === 'string' ? (360 - knownSum) : a);
        
        const cumAngles = [0];
        for (let j = 0; j < numericAngles.length; j++) {
            cumAngles.push(cumAngles[j] + numericAngles[j]);
        }

        const r = 75;
        const cx = 170, cy = 110;
        const rayLabels = data.pointLabels || ['P', 'Q', 'R', 'S', 'O'];

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <circle cx={cx} cy={cy} r="4" fill="#0f172a" />
                <text x={cx-10} y={cy+15} fontSize="12" fill="#0f172a" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{rayLabels[4]}</text>

                {cumAngles.slice(0, -1).map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    const textX = cx + (r + 15) * Math.cos(rad);
                    const textY = cy - (r + 15) * Math.sin(rad);
                    return (
                        <g key={ri}>
                            <line markerEnd="url(#arrow)" x1={cx} y1={cy}
                                x2={cx + r * Math.cos(rad)} y2={cy - r * Math.sin(rad)}
                                stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
                            <text x={textX} y={textY} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{rayLabels[ri]}</text>
                        </g>
                    );
                })}

                {angles.map((label, ai) => {
                    const colors = ['#0284c7', '#e11d48', '#059669', '#d97706', '#7c3aed'];
                    const displayLabel = typeof label === 'string' ? label : `${label}°`;
                    return <AngleLabel key={ai} cx={cx} cy={cy} angleRadius={50} angleMid={(cumAngles[ai]+cumAngles[ai+1])/2} text={displayLabel} color={colors[ai%5]} />;
                })}

                {angles.map((_, ai) => {
                    const strokeColors = ['#0284c7', '#e11d48', '#059669', '#d97706', '#7c3aed'];
                    return <path key={'arc'+ai} d={describeArc(cx, cy, 28, cumAngles[ai], cumAngles[ai+1])} stroke={strokeColors[ai%5]} strokeWidth="2" fill="none" />;
                })}
            </svg>
        );
    }

    if (type === 'five-rays-point') {
        const angles = data.angles;
        const knownSum = angles.filter(x => typeof x === 'number').reduce((s, x) => s + x, 0);
        const numericAngles = angles.map(a => typeof a === 'string' ? (360 - knownSum) : a);
        const cumAngles = [0];
        for (let j = 0; j < numericAngles.length; j++) {
            cumAngles.push(cumAngles[j] + numericAngles[j]);
        }

        const r = 75;
        const cx = 170, cy = 110;
        const rayLabels = data.pointLabels || ['P', 'Q', 'R', 'S', 'T', 'O'];

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <circle cx={cx} cy={cy} r="4" fill="#0f172a" />
                <text x={cx-10} y={cy+15} fontSize="12" fill="#0f172a" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{rayLabels[5]}</text>

                {cumAngles.slice(0, -1).map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    const textX = cx + (r + 15) * Math.cos(rad);
                    const textY = cy - (r + 15) * Math.sin(rad);
                    return (
                        <g key={ri}>
                            <line markerEnd="url(#arrow)" x1={cx} y1={cy}
                                x2={cx + r * Math.cos(rad)} y2={cy - r * Math.sin(rad)}
                                stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
                            <text x={textX} y={textY} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{rayLabels[ri]}</text>
                        </g>
                    );
                })}

                {angles.map((label, ai) => {
                    const colors = ['#0284c7', '#e11d48', '#059669', '#d97706', '#7c3aed'];
                    const displayLabel = typeof label === 'string' ? label : `${label}°`;
                    return <AngleLabel key={ai} cx={cx} cy={cy} angleRadius={50} angleMid={(cumAngles[ai]+cumAngles[ai+1])/2} text={displayLabel} color={colors[ai%5]} />;
                })}

                {angles.map((_, ai) => {
                    const strokeColors = ['#0284c7', '#e11d48', '#059669', '#d97706', '#7c3aed'];
                    return <path key={'arc'+ai} d={describeArc(cx, cy, 25, cumAngles[ai], cumAngles[ai+1])} stroke={strokeColors[ai%5]} strokeWidth="2" fill="none" />;
                })}
            </svg>
        );
    }

    if (type === 'three-rays-around-point') {
        const angles = data.angles;
        const knownSum = angles.filter(x => typeof x === 'number').reduce((s, x) => s + x, 0);
        const numericAngles = angles.map(a => typeof a === 'string' ? (360 - knownSum) : a);
        const cumAngles = [0];
        for (let j = 0; j < numericAngles.length; j++) {
            cumAngles.push(cumAngles[j] + numericAngles[j]);
        }

        const r = 75;
        const cx = 170, cy = 110;
        const rayLabels = data.pointLabels || ['P', 'Q', 'R', 'O'];

        return (
            <svg viewBox="0 0 340 220" width="100%" style={{ maxWidth: 320, maxHeight: 200, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <circle cx={cx} cy={cy} r="4" fill="#0f172a" />
                <text x={cx-10} y={cy+15} fontSize="12" fill="#0f172a" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{rayLabels[3]}</text>

                {cumAngles.slice(0, -1).map((deg, ri) => {
                    const rad = (deg * Math.PI) / 180;
                    const textX = cx + (r + 15) * Math.cos(rad);
                    const textY = cy - (r + 15) * Math.sin(rad);
                    return (
                        <g key={ri}>
                            <line markerEnd="url(#arrow)" x1={cx} y1={cy}
                                x2={cx + r * Math.cos(rad)} y2={cy - r * Math.sin(rad)}
                                stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
                            <text x={textX} y={textY} fontSize="12" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" dominantBaseline="central" textAnchor="middle">{rayLabels[ri]}</text>
                        </g>
                    );
                })}

                {angles.map((label, ai) => {
                    const colors = ['#0284c7', '#e11d48', '#059669'];
                    const displayLabel = typeof label === 'string' ? label : `${label}°`;
                    return <AngleLabel key={ai} cx={cx} cy={cy} angleRadius={50} angleMid={(cumAngles[ai]+cumAngles[ai+1])/2} text={displayLabel} color={colors[ai%3]} />;
                })}

                {angles.map((_, ai) => {
                    const strokeColors = ['#0284c7', '#e11d48', '#059669'];
                    return <path key={'arc'+ai} d={describeArc(cx, cy, 28, cumAngles[ai], cumAngles[ai+1])} stroke={strokeColors[ai%3]} strokeWidth="2" fill="none" />;
                })}
            </svg>
        );
    }

    if (type === 'triangle-exterior') {
        const { intA, intB, extC, pointLabels } = data;
        const [pP, pQ, pR, pS] = pointLabels || ['P', 'Q', 'R', 'S'];

        // Dynamic Triangle vertices
        let L = 160;
        let Qx = 60, Qy = 180;
        let extC_val = extC;
        if (extC_val >= 180) extC_val = 179; // Safety
        
        // Use Sine rule to find length of side PQ
        const angR_interior = 180 - extC_val;
        const PQ_len = L * Math.sin(angR_interior * Math.PI / 180) / Math.sin(intA * Math.PI / 180);
        
        let Px = Qx + PQ_len * Math.cos(intB * Math.PI / 180);
        let Py = Qy - PQ_len * Math.sin(intB * Math.PI / 180);

        // Scale to fit vertically if P goes too high (above y=40)
        if (Py < 40) {
            const scale = (Qy - 40) / (Qy - Py);
            L *= scale;
            Px = Qx + (Px - Qx) * scale;
            Py = Qy - (Qy - Py) * scale;
        }
        
        // Scale to fit horizontally if P goes too far right (beyond x=280)
        if (Px > 280) {
            const scale = (280 - Qx) / (Px - Qx);
            L *= scale;
            Px = Qx + (Px - Qx) * scale;
            Py = Qy - (Qy - Py) * scale;
        }

        const Rx = Qx + L;
        const Ry = Qy;
        const Sx = Rx + 50; // Extend line to S
        const Sy = Qy;

        // Angle at P: direction from P to Q and P to R
        let pAngQ = Math.atan2(-(Qy - Py), Qx - Px) * 180 / Math.PI;
        let pAngR = Math.atan2(-(Ry - Py), Rx - Px) * 180 / Math.PI;
        if (pAngQ < 0) pAngQ += 360;
        if (pAngR < 0) pAngR += 360;
        
        let diffP = pAngR - pAngQ;
        if (diffP < 0) diffP += 360;
        if (diffP > 180) {
            const temp = pAngQ; pAngQ = pAngR; pAngR = temp;
            diffP = 360 - diffP;
        }
        const pMid = pAngQ + diffP / 2;

        // Angle at Q
        const qAngP = Math.atan2(-(Py - Qy), Px - Qx) * 180 / Math.PI;
        if (qAngP < 0) qAngP += 360;
        
        // Exterior angle at R
        const rAngP = Math.atan2(-(Py - Ry), Px - Rx) * 180 / Math.PI;
        if (rAngP < 0) rAngP += 360;

        return (
            <svg viewBox="0 0 360 230" width="100%" style={{ maxWidth: 340, maxHeight: 210, background: '#f8fafc', borderRadius: 12 }}>
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                    </marker>
                </defs>
                <polygon points={`${Px},${Py} ${Qx},${Qy} ${Rx},${Ry}`} fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinejoin="round" />
                <line markerEnd="url(#arrow)" markerStart="url(#arrow)" x1={Rx} y1={Ry} x2={Sx} y2={Sy} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

                <path d={describeArc(Px, Py, 20, pAngQ, pAngR)} stroke="#0284c7" strokeWidth="2" fill="none" />
                <path d={describeArc(Qx, Qy, 20, 0, qAngP)} stroke="#059669" strokeWidth="2" fill="none" />
                <path d={describeArc(Rx, Ry, 20, 0, rAngP)} stroke="#e11d48" strokeWidth="2.5" fill="none" />

                <AngleLabel cx={Px} cy={Py} angleRadius={35} angleMid={pMid} text={`${intA}°`} color="#0284c7" />
                <AngleLabel cx={Qx} cy={Qy} angleRadius={35} angleMid={qAngP / 2} text={`${intB}°`} color="#059669" />
                <AngleLabel cx={Rx} cy={Ry} angleRadius={35} angleMid={rAngP / 2} text="x" color="#e11d48" />

                <text x={Px} y={Py - 15} fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">{pP}</text>
                <text x={Qx - 12} y={Qy + 15} fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pQ}</text>
                <text x={Rx} y={Ry + 18} fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">{pR}</text>
                <text x={Sx - 5} y={Sy + 15} fontSize="13" fill="#0ea5e9" fontFamily="Times New Roman, serif" fontStyle="italic" fontWeight="bold">{pS}</text>
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
                <line markerEnd="url(#arrow)" x1="150" y1="140" x2="250" y2="140" stroke="#cbd5e1" strokeWidth="4" />
                <line markerEnd="url(#arrow)" x1="150" y1="140" x2={150 + 100 * Math.cos(angle * Math.PI / 180)} y2={140 - 100 * Math.sin(angle * Math.PI / 180)} stroke="#cbd5e1" strokeWidth="4" />

                {/* User Graphic */}
                <line markerEnd="url(#arrow)" x1="150" y1="140" x2="250" y2="140" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                <circle cx="150" cy="140" r="6" fill="#0f172a" />
                
                <line markerEnd="url(#arrow)" x1="150" y1="140" x2={150 + 100 * Math.cos(userAngle * Math.PI / 180)} y2={140 - 100 * Math.sin(userAngle * Math.PI / 180)} stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
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
