import React, { useEffect, useState } from 'react';

// Common SVG Wrapper
const SVGChartWrapper = ({ children, viewBox = "0 0 300 200", style }) => (
    <svg
        viewBox={viewBox}
        style={{
            width: '100%',
            maxWidth: 360,
            height: 'auto',
            overflow: 'visible',
            ...style
        }}
    >
        {children}
    </svg>
);

// 1. Angle Types Chart (Acute, Right, Obtuse, Straight, Reflex)
export const AngleTypesChart = () => {
    const [angleIdx, setAngleIdx] = useState(0);
    const angles = [
        { type: "Acute (< 90°)", val: 45, d: "M 150 100 L 250 100 M 150 100 L 220 30", arc: "M 180 100 A 30 30 0 0 0 170 80" },
        { type: "Right (= 90°)", val: 90, d: "M 150 100 L 250 100 M 150 100 L 150 10", arc: "M 170 100 L 170 80 L 150 80" },
        { type: "Obtuse (> 90°)", val: 135, d: "M 150 100 L 250 100 M 150 100 L 80 30", arc: "M 180 100 A 30 30 0 0 0 128 78" },
        { type: "Straight (= 180°)", val: 180, d: "M 50 100 L 250 100", arc: "M 180 100 A 30 30 0 0 0 120 100" },
        { type: "Reflex (> 180°)", val: 240, d: "M 150 100 L 250 100 M 150 100 L 100 186", arc: "M 180 100 A 30 30 0 1 1 125 143" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setAngleIdx((prev) => (prev + 1) % angles.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const cur = angles[angleIdx];

    return (
        <SVGChartWrapper viewBox="0 0 300 220">
            <text x="150" y="20" fontSize="16" fontWeight="bold" fill="#0f172a" textAnchor="middle">{cur.type}</text>
            <path d={cur.d} stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" style={{ transition: "d 0.5s ease" }}/>
            <path d={cur.arc} stroke="#0ea5e9" strokeWidth="3" fill="none" style={{ transition: "d 0.5s ease" }}/>
            <circle cx="150" cy="100" r="4" fill="#0f172a" />
        </SVGChartWrapper>
    );
};

// 2. Linear Pair Chart
export const LinearPairChart = () => {
    return (
        <SVGChartWrapper viewBox="0 0 300 180">
            {/* Base line */}
            <line x1="40" y1="120" x2="260" y2="120" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <text x="30" y="125" fontSize="14" fill="#64748b">A</text>
            <text x="270" y="125" fontSize="14" fill="#64748b">B</text>
            
            {/* Origin */}
            <circle cx="150" cy="120" r="4" fill="#0f172a" />
            <text x="145" y="140" fontSize="14" fill="#64748b">O</text>

            {/* Ray */}
            <line x1="150" y1="120" x2="210" y2="30" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <text x="220" y="25" fontSize="14" fill="#64748b">C</text>

            {/* Arc 1 */}
            <path d="M 180 120 A 30 30 0 0 0 166 96" stroke="#e11d48" strokeWidth="3" fill="none" />
            <text x="185" y="105" fontSize="12" fill="#e11d48" fontWeight="bold">60°</text>

            {/* Arc 2 */}
            <path d="M 120 120 A 30 30 0 0 1 166 96" stroke="#0284c7" strokeWidth="3" fill="none" />
            <text x="125" y="85" fontSize="12" fill="#0284c7" fontWeight="bold">120°</text>
            
            {/* Info */}
            <rect x="75" y="150" width="150" height="25" rx="6" fill="#f1f5f9" />
            <text x="150" y="167" fontSize="13" fill="#0f172a" textAnchor="middle" fontWeight="bold">60° + 120° = 180°</text>
        </SVGChartWrapper>
    );
};

// 3. Vertically Opposite Angles Chart
export const VOAChart = () => {
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setPulse(p => !p), 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            {/* Line 1 */}
            <line x1="50" y1="50" x2="250" y2="150" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            {/* Line 2 */}
            <line x1="50" y1="150" x2="250" y2="50" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            
            <circle cx="150" cy="100" r="4" fill="#0f172a" />

            {/* Vertical Angle Pair 1 (Top/Bottom) */}
            <path d="M 130 110 A 30 30 0 0 0 170 110" stroke={pulse ? "#059669" : "#a7f3d0"} strokeWidth={pulse ? 5 : 3} fill="none" style={{ transition: "all 0.4s" }} />
            <path d="M 130 90 A 30 30 0 0 1 170 90" stroke={pulse ? "#059669" : "#a7f3d0"} strokeWidth={pulse ? 5 : 3} fill="none" style={{ transition: "all 0.4s" }}/>
            <text x="150" y="80" fontSize="16" fill={pulse ? "#059669" : "#a7f3d0"} fontWeight="bold" textAnchor="middle" style={{ transition: "all 0.4s" }}>1</text>
            <text x="150" y="132" fontSize="16" fill={pulse ? "#059669" : "#a7f3d0"} fontWeight="bold" textAnchor="middle" style={{ transition: "all 0.4s" }}>3</text>
            
            {/* Vertical Angle Pair 2 (Left/Right) */}
            <path d="M 135 85 A 30 30 0 0 0 135 115" stroke={!pulse ? "#d97706" : "#fde68a"} strokeWidth={!pulse ? 5 : 3} fill="none" style={{ transition: "all 0.4s" }}/>
            <path d="M 165 85 A 30 30 0 0 1 165 115" stroke={!pulse ? "#d97706" : "#fde68a"} strokeWidth={!pulse ? 5 : 3} fill="none" style={{ transition: "all 0.4s" }}/>
            <text x="120" y="105" fontSize="16" fill={!pulse ? "#d97706" : "#fde68a"} fontWeight="bold" textAnchor="middle" style={{ transition: "all 0.4s" }}>4</text>
            <text x="180" y="105" fontSize="16" fill={!pulse ? "#d97706" : "#fde68a"} fontWeight="bold" textAnchor="middle" style={{ transition: "all 0.4s" }}>2</text>
            
            <text x="150" y="180" fontSize="14" fill="#0f172a" textAnchor="middle" fontWeight="bold">∠1 = ∠3  and  ∠2 = ∠4</text>
        </SVGChartWrapper>
    );
};

// 4. Parallel Lines & Transversal Chart
export const ParallelLinesChart = () => {
    return (
        <SVGChartWrapper viewBox="0 0 300 220">
            {/* Elegant Angle Fills */}
            {/* Top intersection V1: (140, 70). Bottom intersection V2: (160, 140) */}
            <g fill="#7c3aed" fillOpacity="0.25" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="miter">
                {/* Top intersection (140, 70) - Bottom-Right angle */}
                {/* P1 = (165, 70), P2 = (146.87, 94.04) */}
                <path d="M 140 70 L 165 70 A 25 25 0 0 1 146.87 94.04 Z">
                    <animate attributeName="fill-opacity" values="0.25;0.5;0.25" dur="2.5s" repeatCount="indefinite" />
                </path>
                {/* Bottom intersection (160, 140) - Top-Left angle */}
                {/* P3 = (135, 140), P4 = (153.13, 115.96) */}
                <path d="M 160 140 L 135 140 A 25 25 0 0 1 153.13 115.96 Z">
                    <animate attributeName="fill-opacity" values="0.25;0.5;0.25" dur="2.5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Line m */}
            <line x1="40" y1="70" x2="260" y2="70" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <text x="25" y="74" fontSize="15" fill="#64748b" fontStyle="italic" fontWeight="600">m</text>
            <polygon points="260,66 268,70 260,74" fill="#334155" />
            <polygon points="40,66 32,70 40,74" fill="#334155" />

            {/* Line n */}
            <line x1="40" y1="140" x2="260" y2="140" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <text x="25" y="144" fontSize="15" fill="#64748b" fontStyle="italic" fontWeight="600">n</text>
            <polygon points="260,136 268,140 260,144" fill="#334155" />
            <polygon points="40,136 32,140 40,144" fill="#334155" />

            {/* Transversal l: Passes through (140,70) and (160,140). */}
            <line x1="128.6" y1="30" x2="171.4" y2="180" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <text x="120" y="24" fontSize="15" fill="#64748b" fontStyle="italic" fontWeight="600">l</text>
            
            {/* Arrows for transversal */}
            {/* Bottom arrow - points down outward */}
            <polygon points="175.2,178.9 167.5,181.1 173.6,187.7" fill="#334155" />
            {/* Top arrow - points up outward */}
            <polygon points="132.4,28.9 124.7,31.1 126.4,22.3" fill="#334155" />
            
            {/* Label */}
            <text x="150" y="210" fontSize="14" fill="#7c3aed" textAnchor="middle" fontWeight="bold">Alternate Interior Angles (Equal)</text>
        </SVGChartWrapper>
    );
};

// 5. Complementary & Supplementary Visualization
export const CompSuppChart = () => {
    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            <g transform="translate(40, 50)">
                <text x="45" y="-10" fontSize="12" fill="#0f172a" textAnchor="middle" fontWeight="bold">Complementary (90°)</text>
                <path d="M 10 90 L 10 10 M 10 90 L 90 90 M 10 90 L 50 30" stroke="#334155" strokeWidth="2" fill="none" />
                {/* 90 marker */}
                <path d="M 10 80 L 20 80 L 20 90" stroke="#334155" strokeWidth="1" fill="none" />
                
                <path d="M 40 90 A 30 30 0 0 0 32 58" stroke="#ca8a04" strokeWidth="3" fill="none" />
                <path d="M 10 60 A 30 30 0 0 1 32 58" stroke="#ea580c" strokeWidth="3" fill="none" />
                <text x="35" y="80" fontSize="10">56°</text>
                <text x="15" y="55" fontSize="10">34°</text>
            </g>

            <g transform="translate(180, 50)">
                <text x="40" y="-10" fontSize="12" fill="#0f172a" textAnchor="middle" fontWeight="bold">Supplementary (180°)</text>
                <path d="M 0 90 L 100 90 M 50 90 L 80 30" stroke="#334155" strokeWidth="2" fill="none" />
                
                <path d="M 80 90 A 30 30 0 0 0 65 60" stroke="#ca8a04" strokeWidth="3" fill="none" />
                <path d="M 20 90 A 30 30 0 0 1 65 60" stroke="#ea580c" strokeWidth="3" fill="none" />
                <text x="75" y="80" fontSize="10">60°</text>
                <text x="35" y="70" fontSize="10">120°</text>
            </g>
        </SVGChartWrapper>
    );
};

// 6. Basic Entities Chart (Line, Ray, Segment)
export const BasicEntitiesChart = () => {
    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            {/* Line */}
            <g transform="translate(0, 40)">
                <text x="150" y="0" fontSize="13" fill="#64748b" textAnchor="middle" fontWeight="bold">Line</text>
                <line x1="50" y1="20" x2="250" y2="20" stroke="#334155" strokeWidth="2.5" />
                <polygon points="50,15 40,20 50,25" fill="#334155" />
                <polygon points="250,15 260,20 250,25" fill="#334155" />
                <circle cx="100" cy="20" r="3" fill="#0f172a" />
                <text x="100" y="38" fontSize="12" fill="#0f172a" textAnchor="middle">A</text>
                <circle cx="200" cy="20" r="3" fill="#0f172a" />
                <text x="200" y="38" fontSize="12" fill="#0f172a" textAnchor="middle">B</text>
            </g>

            {/* Ray */}
            <g transform="translate(0, 100)">
                <text x="150" y="0" fontSize="13" fill="#64748b" textAnchor="middle" fontWeight="bold">Ray</text>
                <line x1="100" y1="20" x2="250" y2="20" stroke="#e65100" strokeWidth="2.5" />
                <polygon points="250,15 260,20 250,25" fill="#e65100" />
                <circle cx="100" cy="20" r="4" fill="#e65100" />
                <text x="100" y="38" fontSize="12" fill="#e65100" textAnchor="middle">C</text>
                <circle cx="200" cy="20" r="3" fill="#0f172a" />
                <text x="200" y="38" fontSize="12" fill="#0f172a" textAnchor="middle">D</text>
            </g>

            {/* Segment */}
            <g transform="translate(0, 160)">
                <text x="150" y="0" fontSize="13" fill="#64748b" textAnchor="middle" fontWeight="bold">Line Segment</text>
                <line x1="100" y1="20" x2="200" y2="20" stroke="#059669" strokeWidth="2.5" />
                <circle cx="100" cy="20" r="4" fill="#059669" />
                <text x="100" y="38" fontSize="12" fill="#059669" textAnchor="middle">E</text>
                <circle cx="200" cy="20" r="4" fill="#059669" />
                <text x="200" y="38" fontSize="12" fill="#059669" textAnchor="middle">F</text>
            </g>
        </SVGChartWrapper>
    );
};

// 7. Adjacent Angles Chart
export const AdjacentAnglesChart = () => {
    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            {/* Vertex O */}
            <circle cx="150" cy="150" r="5" fill="#0f172a" />
            <text x="150" y="170" fontSize="14" fill="#0f172a" textAnchor="middle">O (Vertex)</text>

            {/* Bottom Arm OA */}
            <line x1="150" y1="150" x2="260" y2="150" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <polygon points="255,145 265,150 255,155" fill="#334155" />
            <text x="250" y="170" fontSize="14" fill="#64748b">A</text>

            {/* Middle Common Arm OB */}
            <line x1="150" y1="150" x2="220" y2="60" stroke="#6a1b9a" strokeWidth="4" strokeLinecap="round" />
            <polygon points="214,64 224,55 222,67" fill="#6a1b9a" />
            <text x="230" y="55" fontSize="14" fill="#6a1b9a" fontWeight="bold">B (Common Arm)</text>

            {/* Top Arm OC */}
            <line x1="150" y1="150" x2="100" y2="40" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <polygon points="107,43 97,33 99,46" fill="#334155" />
            <text x="80" y="40" fontSize="14" fill="#64748b">C</text>

            {/* Angle AOB */}
            <path d="M 190 150 A 40 40 0 0 0 181 110" stroke="#8b5cf6" strokeWidth="4" fill="none" />
            <text x="195" y="125" fontSize="13" fill="#8b5cf6" fontWeight="bold">∠AOB</text>

            {/* Angle BOC */}
            <path d="M 173 120 A 30 30 0 0 0 134 114" stroke="#d946ef" strokeWidth="4" fill="none" />
            <text x="145" y="105" fontSize="13" fill="#d946ef" fontWeight="bold">∠BOC</text>
        </SVGChartWrapper>
    );
};

// 8. Co-interior Angles Chart
export const CoInteriorAnglesChart = () => {
    return (
        <SVGChartWrapper viewBox="0 0 300 220">
            {/* Elegant Angle Fills */}
            {/* Top intersection V1: (140, 70). Bottom intersection V2: (160, 140) */}
            <g fill="#0284c7" fillOpacity="0.25" stroke="#0284c7" strokeWidth="2" strokeLinejoin="miter">
                {/* Top intersection (140, 70) - Bottom-Right angle */}
                {/* P1 = (165, 70), P2 = (146.87, 94.04) */}
                <path d="M 140 70 L 165 70 A 25 25 0 0 1 146.87 94.04 Z">
                    <animate attributeName="fill-opacity" values="0.25;0.5;0.25" dur="2.5s" repeatCount="indefinite" />
                </path>
                {/* Bottom intersection (160, 140) - Top-Right angle */}
                {/* P_upleft = (153.13, 115.96), P_right = (185, 140) */}
                <path d="M 160 140 L 153.13 115.96 A 25 25 0 0 1 185 140 Z">
                    <animate attributeName="fill-opacity" values="0.25;0.5;0.25" dur="2.5s" repeatCount="indefinite" />
                </path>
            </g>

            {/* Line m */}
            <line x1="40" y1="70" x2="260" y2="70" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <text x="25" y="74" fontSize="15" fill="#64748b" fontStyle="italic" fontWeight="600">m</text>
            <polygon points="260,66 268,70 260,74" fill="#334155" />
            <polygon points="40,66 32,70 40,74" fill="#334155" />

            {/* Line n */}
            <line x1="40" y1="140" x2="260" y2="140" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <text x="25" y="144" fontSize="15" fill="#64748b" fontStyle="italic" fontWeight="600">n</text>
            <polygon points="260,136 268,140 260,144" fill="#334155" />
            <polygon points="40,136 32,140 40,144" fill="#334155" />

            {/* Transversal l: Passes through (140,70) and (160,140). */}
            <line x1="128.6" y1="30" x2="171.4" y2="180" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <text x="120" y="24" fontSize="15" fill="#64748b" fontStyle="italic" fontWeight="600">l</text>
            
            {/* Arrows for transversal */}
            {/* Bottom arrow - points down outward */}
            <polygon points="175.2,178.9 167.5,181.1 173.6,187.7" fill="#334155" />
            {/* Top arrow - points up outward */}
            <polygon points="132.4,28.9 124.7,31.1 126.4,22.3" fill="#334155" />
            
            {/* Label texts inside the angles */}
            <text x="155" y="85" fontSize="14" fill="#0284c7" fontWeight="bold" textAnchor="middle">x</text>
            <text x="165" y="132" fontSize="14" fill="#0284c7" fontWeight="bold" textAnchor="middle">y</text>

            <text x="150" y="210" fontSize="14" fill="#0284c7" textAnchor="middle" fontWeight="bold">x + y = 180°</text>
        </SVGChartWrapper>
    );
};
