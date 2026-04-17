import React, { useEffect, useState } from 'react';

// Common base styles for charts
const svgStyle = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block'
};

// 1. Congruence Chart (Two identical triangles with an animation overlaying them)
export const CongruenceChart = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let direction = 1;
        const interval = setInterval(() => {
            setOffset(prev => {
                let nxt = prev + direction * 2;
                if (nxt > 100) { nxt = 100; direction = -1; }
                if (nxt < 0) { nxt = 0; direction = 1; }
                return nxt;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const triangle1 = "30,120 120,40 210,120"; // Base static triangle
    // Triangle 2 slides left to overalap
    const t2X = 250 - (offset / 100) * 250;
    
    return (
        <svg viewBox="0 0 500 160" width="300" style={svgStyle}>
            {/* Triangle A */}
            <polygon points={triangle1} fill="rgba(15, 76, 129, 0.2)" stroke="#0f4c81" strokeWidth="3" />
            <text x="120" y="30" textAnchor="middle" fill="#0f4c81" fontSize="14" fontWeight="bold">A</text>
            <text x="20" y="130" textAnchor="middle" fill="#0f4c81" fontSize="14" fontWeight="bold">B</text>
            <text x="220" y="130" textAnchor="middle" fill="#0f4c81" fontSize="14" fontWeight="bold">C</text>

            <g transform={`translate(${t2X}, 0)`}>
                <polygon points={triangle1} fill="rgba(249, 168, 37, 0.4)" stroke="#f9a825" strokeWidth="3" />
            </g>
        </svg>
    );
};

// 2. Triangle Types Chart (Scalene, Isosceles, Equilateral)
export const TriangleTypesChart = () => {
    return (
        <svg viewBox="0 0 500 150" width="400" style={svgStyle}>
            {/* Scalene */}
            <polygon points="10,130 90,30 140,130" fill="none" stroke="#e65100" strokeWidth="2" />
            <text x="75" y="150" textAnchor="middle" fill="#e65100" fontSize="12">Scalene</text>

            {/* Isosceles */}
            <polygon points="200,130 250,30 300,130" fill="none" stroke="#0f766e" strokeWidth="2" />
            {/* Tick marks for Iso */}
            <line x1="218" y1="76" x2="232" y2="84" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" />
            <line x1="268" y1="84" x2="282" y2="76" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" />
            <text x="250" y="150" textAnchor="middle" fill="#0f766e" fontSize="12">Isosceles</text>

            {/* Equilateral */}
            <polygon points="360,130 420,26 480,130" fill="none" stroke="#6a1b9a" strokeWidth="2" />
            {/* Tick marks for Eq */}
            <line x1="383" y1="74" x2="397" y2="82" stroke="#6a1b9a" strokeWidth="2" strokeLinecap="round" />
            <line x1="443" y1="82" x2="457" y2="74" stroke="#6a1b9a" strokeWidth="2" strokeLinecap="round" />
            <line x1="420" y1="122" x2="420" y2="138" stroke="#6a1b9a" strokeWidth="2" strokeLinecap="round" />
            <text x="420" y="150" textAnchor="middle" fill="#6a1b9a" fontSize="12">Equilateral</text>
        </svg>
    );
};

// 3. Application Chart (A bridge truss structure)
export const ApplicationChart = () => {
    return (
        <svg viewBox="0 0 500 150" width="300" style={svgStyle}>
            <rect x="20" y="120" width="460" height="10" fill="#b71c1c" />
            <polygon points="20,120 135,40 250,120" fill="none" stroke="#b71c1c" strokeWidth="3" />
            <polygon points="135,40 250,120 365,40" fill="none" stroke="#b71c1c" strokeWidth="3" />
            <polygon points="250,120 365,40 480,120" fill="none" stroke="#b71c1c" strokeWidth="3" />
            <line x1="20" y1="120" x2="480" y2="120" stroke="#b71c1c" strokeWidth="4" />
            <line x1="135" y1="40" x2="365" y2="40" stroke="#b71c1c" strokeWidth="4" />
        </svg>
    );
};

// Generic helper to draw two triangles side by side for terminology
const drawCongruentPair = (decorations) => {
    return (
        <svg viewBox="0 0 600 180" width="400" style={svgStyle}>
            {/* T1 */}
            <polygon points="40,140 140,40 240,140" fill="rgba(66, 153, 225, 0.1)" stroke="#2b6cb0" strokeWidth="2" />
            {/* T2 */}
            <polygon points="340,140 440,40 540,140" fill="rgba(72, 187, 120, 0.1)" stroke="#2f855a" strokeWidth="2" />
            
            {decorations}
        </svg>
    )
}

// 4. SAS Chart
export const SASChart = () => drawCongruentPair(
    <>
        {/* Left Side Single Tick */}
        <line x1="82" y1="82" x2="98" y2="98" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="382" y1="82" x2="398" y2="98" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />

        {/* Top Angle Arch */}
        <path d="M 126 54 A 20 20 0 0 0 154 54" fill="none" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <path d="M 426 54 A 20 20 0 0 0 454 54" fill="none" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />

        {/* Right Side Double Tick */}
        <line x1="179" y1="95" x2="195" y2="79" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="185" y1="101" x2="201" y2="85" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        
        <line x1="479" y1="95" x2="495" y2="79" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
        <line x1="485" y1="101" x2="501" y2="85" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
    </>
);

// 5. ASA Chart
export const ASAChart = () => drawCongruentPair(
    <>
        {/* Left Angle Single Arc */}
        <path d="M 65 140 A 25 25 0 0 0 57.6 122.3" fill="none" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <path d="M 365 140 A 25 25 0 0 0 357.6 122.3" fill="none" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />

        {/* Bottom Base Single Tick */}
        <line x1="140" y1="132" x2="140" y2="148" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="440" y1="132" x2="440" y2="148" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />

        {/* Right Angle Double Arc */}
        <path d="M 215 140 A 25 25 0 0 1 222.4 122.3" fill="none" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <path d="M 210 140 A 30 30 0 0 1 218.8 118.8" fill="none" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />

        <path d="M 515 140 A 25 25 0 0 1 522.4 122.3" fill="none" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
        <path d="M 510 140 A 30 30 0 0 1 518.8 118.8" fill="none" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
    </>
);

// 6. SSS Chart
export const SSSChart = () => drawCongruentPair(
    <>
        {/* Left Side Single Tick */}
        <line x1="82" y1="82" x2="98" y2="98" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="382" y1="82" x2="398" y2="98" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />

        {/* Right Side Double Tick */}
        <line x1="179" y1="95" x2="195" y2="79" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="185" y1="101" x2="201" y2="85" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="479" y1="95" x2="495" y2="79" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
        <line x1="485" y1="101" x2="501" y2="85" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />

        {/* Bottom Base Triple Tick */}
        <line x1="133" y1="132" x2="133" y2="148" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="140" y1="132" x2="140" y2="148" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="147" y1="132" x2="147" y2="148" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />

        <line x1="433" y1="132" x2="433" y2="148" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
        <line x1="440" y1="132" x2="440" y2="148" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
        <line x1="447" y1="132" x2="447" y2="148" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
    </>
);

// 7. RHS Chart
export const RHSChart = () => (
    <svg viewBox="0 0 600 180" width="400" style={svgStyle}>
        <polygon points="60,140 60,40 180,140" fill="rgba(66, 153, 225, 0.1)" stroke="#2b6cb0" strokeWidth="2" />
        <rect x="60" y="120" width="20" height="20" fill="none" stroke="#2b6cb0" strokeWidth="2" />
        <line x1="113" y1="98" x2="127" y2="82" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />
        <line x1="52" y1="90" x2="68" y2="90" stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round" />

        <polygon points="360,140 360,40 480,140" fill="rgba(72, 187, 120, 0.1)" stroke="#2f855a" strokeWidth="2" />
        <rect x="360" y="120" width="20" height="20" fill="none" stroke="#2f855a" strokeWidth="2" />
        <line x1="413" y1="98" x2="427" y2="82" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
        <line x1="352" y1="90" x2="368" y2="90" stroke="#2f855a" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

// 8. CPCT Chart
export const CPCTChart = () => drawCongruentPair(
    <>
        {/* Draw attention to corresponding angles */}
        <path d="M 65 140 A 25 25 0 0 0 57.6 122.3" fill="none" stroke="#e65100" strokeWidth="4" strokeLinecap="round" />
        <path d="M 365 140 A 25 25 0 0 0 357.6 122.3" fill="none" stroke="#e65100" strokeWidth="4" strokeLinecap="round" />
        <text x="65" y="155" fill="#e65100" fontSize="14" fontWeight="bold">∠A</text>
        <text x="365" y="155" fill="#e65100" fontSize="14" fontWeight="bold">∠P</text>

        {/* Draw attention to corresponding sides */}
        <line x1="179" y1="95" x2="195" y2="79" stroke="#6a1b9a" strokeWidth="4" strokeLinecap="round" />
        <line x1="185" y1="101" x2="201" y2="85" stroke="#6a1b9a" strokeWidth="4" strokeLinecap="round" />
        <line x1="479" y1="95" x2="495" y2="79" stroke="#6a1b9a" strokeWidth="4" strokeLinecap="round" />
        <line x1="485" y1="101" x2="501" y2="85" stroke="#6a1b9a" strokeWidth="4" strokeLinecap="round" />
        <text x="210" y="90" fill="#6a1b9a" fontSize="14" fontWeight="bold">BC</text>
        <text x="510" y="90" fill="#6a1b9a" fontSize="14" fontWeight="bold">QR</text>

        {/* CPCT Arrow indication */}
        <path d="M 280 90 Q 300 70 320 90" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4" />
        <text x="300" y="60" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">CPCT</text>
        
        {/* Arrow marker def */}
        <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
        </defs>
    </>
);

// 9. Isosceles Properties Chart
export const IsoscelesChart = () => (
    <svg viewBox="0 0 300 180" width="300" style={svgStyle}>
        <polygon points="150,20 50,140 250,140" fill="rgba(183, 28, 28, 0.1)" stroke="#b71c1c" strokeWidth="2" />
        
        {/* Equal side ticks (Perpendicular) */}
        <line x1="92" y1="74" x2="108" y2="86" stroke="#b71c1c" strokeWidth="3" strokeLinecap="round" />
        <line x1="192" y1="86" x2="208" y2="74" stroke="#b71c1c" strokeWidth="3" strokeLinecap="round" />
        
        {/* Equal base angles */}
        <path d="M 75 140 A 25 25 0 0 0 66 121" fill="none" stroke="#b71c1c" strokeWidth="3" strokeLinecap="round" />
        <path d="M 225 140 A 25 25 0 0 1 234 121" fill="none" stroke="#b71c1c" strokeWidth="3" strokeLinecap="round" />

        <text x="65" y="70" fill="#b71c1c" fontSize="14" fontWeight="bold">Side 1</text>
        <text x="195" y="70" fill="#b71c1c" fontSize="14" fontWeight="bold">Side 2</text>
        <text x="80" y="132" textAnchor="middle" fill="#b71c1c" fontSize="12" fontWeight="bold">θ</text>
        <text x="220" y="132" textAnchor="middle" fill="#b71c1c" fontSize="12" fontWeight="bold">θ</text>
    </svg>
);

// 10. Equilateral Properties Chart
export const EquilateralChart = () => (
    <svg viewBox="0 0 300 180" width="300" style={svgStyle}>
        <polygon points="150,20 81,140 219,140" fill="rgba(106, 27, 154, 0.1)" stroke="#6a1b9a" strokeWidth="2" />
        
        {/* Side ticks (Perpendicular) */}
        <line x1="107" y1="75" x2="124" y2="85" stroke="#6a1b9a" strokeWidth="3" strokeLinecap="round" />
        <line x1="176" y1="85" x2="193" y2="75" stroke="#6a1b9a" strokeWidth="3" strokeLinecap="round" />
        <line x1="150" y1="130" x2="150" y2="150" stroke="#6a1b9a" strokeWidth="3" strokeLinecap="round" />
        
        {/* Angle arcs */}
        <path d="M 137.5 41.6 A 25 25 0 0 0 162.5 41.6" fill="none" stroke="#6a1b9a" strokeWidth="3" strokeLinecap="round" />
        <path d="M 106 140 A 25 25 0 0 0 93.5 118.4" fill="none" stroke="#6a1b9a" strokeWidth="3" strokeLinecap="round" />
        <path d="M 194 140 A 25 25 0 0 1 206.5 118.4" fill="none" stroke="#6a1b9a" strokeWidth="3" strokeLinecap="round" />

        <text x="150" y="58" textAnchor="middle" fill="#6a1b9a" fontSize="12" fontWeight="bold">60°</text>
        <text x="110" y="132" textAnchor="middle" fill="#6a1b9a" fontSize="12" fontWeight="bold">60°</text>
        <text x="190" y="132" textAnchor="middle" fill="#6a1b9a" fontSize="12" fontWeight="bold">60°</text>
    </svg>
);
