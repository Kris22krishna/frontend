import React from 'react';

// SvgWrap purely for the terminology/intro components aesthetics
const SvgWrap = ({ children, width = 300, height = 200, viewBox = "0 0 300 200" }) => (
    <svg width={width} height={height} viewBox={viewBox} style={{ overflow: 'visible', maxWidth: '100%', height: 'auto' }}>
        <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
        </defs>
        {children}
    </svg>
);

export function QuadrilateralChart() {
    return (
        <SvgWrap>
            <polygon points="60,150 240,150 200,50 100,50" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinejoin="round" />
            <line x1="60" y1="150" x2="200" y2="50" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
            
            <circle cx="60" cy="150" r="4" fill="#1e293b" />
            <text x="50" y="165" fontSize="14" fontWeight="bold">A</text>
            
            <circle cx="240" cy="150" r="4" fill="#1e293b" />
            <text x="245" y="165" fontSize="14" fontWeight="bold">B</text>
            
            <circle cx="200" cy="50" r="4" fill="#1e293b" />
            <text x="210" y="45" fontSize="14" fontWeight="bold">C</text>
            
            <circle cx="100" cy="50" r="4" fill="#1e293b" />
            <text x="85" y="45" fontSize="14" fontWeight="bold">D</text>

            <text x="150" y="100" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold" transform="rotate(-23 150 100)">Diagonal AC</text>
        </SvgWrap>
    );
}

export function ParallelogramChart() {
    return (
        <SvgWrap>
            <polygon points="70,140 230,140 200,60 40,60" fill="none" stroke="#059669" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Top and Bottom parallel markers */}
            <path d="M 115,60 L 125,55 L 125,65 Z" fill="#059669" />
            <path d="M 145,140 L 155,135 L 155,145 Z" fill="#059669" />
            
            {/* Left and Right parallel markers */}
            <path d="M 50,110 L 60,110 L 55,100 Z" fill="#059669" />
            <path d="M 55,115 L 65,115 L 60,105 Z" fill="#059669" />
            
            <path d="M 210,110 L 220,110 L 215,100 Z" fill="#059669" />
            <path d="M 215,115 L 225,115 L 220,105 Z" fill="#059669" />

            <text x="150" y="160" textAnchor="middle" fontSize="14" fontWeight="800" fill="#059669">AB || DC, AD || BC</text>
        </SvgWrap>
    );
}

export function RectangleChart() {
    return (
        <SvgWrap>
            <rect x="70" y="60" width="160" height="90" fill="none" stroke="#2563eb" strokeWidth="3" rx="2" />
            
            {/* Right angles */}
            <path d="M 70,75 L 85,75 L 85,60" fill="none" stroke="#ef4444" strokeWidth="2" />
            <path d="M 215,60 L 215,75 L 230,75" fill="none" stroke="#ef4444" strokeWidth="2" />
            <path d="M 230,135 L 215,135 L 215,150" fill="none" stroke="#ef4444" strokeWidth="2" />
            <path d="M 70,135 L 85,135 L 85,150" fill="none" stroke="#ef4444" strokeWidth="2" />

            {/* Diagonals */}
            <line x1="70" y1="60" x2="230" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="70" y1="150" x2="230" y2="60" stroke="#94a3b8" strokeWidth="1.5" />

            <circle cx="150" cy="105" r="4" fill="#2563eb" />
            <text x="150" y="180" textAnchor="middle" fontSize="14" fontWeight="800" fill="#2563eb">Diagonals are Equal & Bisect</text>
        </SvgWrap>
    );
}

export function RhombusChart() {
    return (
        <SvgWrap>
            <polygon points="150,40 220,100 150,160 80,100" fill="none" stroke="#d97706" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Tick marks for equal sides */}
            <line x1="110" y1="65" x2="120" y2="75" stroke="#d97706" strokeWidth="2" />
            <line x1="180" y1="65" x2="190" y2="75" stroke="#d97706" strokeWidth="2" />
            <line x1="110" y1="135" x2="120" y2="125" stroke="#d97706" strokeWidth="2" />
            <line x1="180" y1="135" x2="190" y2="125" stroke="#d97706" strokeWidth="2" />
            
            {/* Diagonals */}
            <line x1="150" y1="40" x2="150" y2="160" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="80" y1="100" x2="220" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
            
            {/* Right angle at center */}
            <path d="M 150,90 L 160,90 L 160,100" fill="none" stroke="#ef4444" strokeWidth="2" />

            <text x="150" y="185" textAnchor="middle" fontSize="14" fontWeight="800" fill="#d97706">Diagonals Bisect at 90°</text>
        </SvgWrap>
    );
}

export function SquareChart() {
    return (
        <SvgWrap>
            <rect x="100" y="50" width="100" height="100" fill="none" stroke="#7c3aed" strokeWidth="3" rx="2" />
            
            {/* Tick marks */}
            <line x1="150" y1="45" x2="150" y2="55" stroke="#7c3aed" strokeWidth="2" />
            <line x1="150" y1="145" x2="150" y2="155" stroke="#7c3aed" strokeWidth="2" />
            <line x1="95" y1="100" x2="105" y2="100" stroke="#7c3aed" strokeWidth="2" />
            <line x1="195" y1="100" x2="205" y2="100" stroke="#7c3aed" strokeWidth="2" />
            
            {/* Diagonals */}
            <line x1="100" y1="50" x2="200" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="100" y1="150" x2="200" y2="50" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Right angles at corners */}
            <path d="M 100,60 L 110,60 L 110,50" fill="none" stroke="#ef4444" strokeWidth="2" />
            {/* Right angle at center */}
            <path d="M 150,90 L 160,90 L 160,100" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 150 100)" />

            <text x="150" y="180" textAnchor="middle" fontSize="14" fontWeight="800" fill="#7c3aed">Rectangle + Rhombus</text>
        </SvgWrap>
    );
}

export function TrapeziumChart() {
    return (
        <SvgWrap>
            <polygon points="50,150 250,150 190,70 110,70" fill="none" stroke="#0891b2" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Top and Bottom parallel markers */}
            <path d="M 145,70 L 155,65 L 155,75 Z" fill="#0891b2" />
            <path d="M 145,150 L 155,145 L 155,155 Z" fill="#0891b2" />

            <text x="150" y="175" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0891b2">Exactly One Pair of Parallel Sides</text>
        </SvgWrap>
    );
}

export function MidPointTheoremChart() {
    return (
        <SvgWrap>
            <polygon points="60,160 240,160 150,40" fill="none" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
            
            {/* Mid points */}
            <circle cx="105" cy="100" r="5" fill="#ef4444" />
            <circle cx="195" cy="100" r="5" fill="#ef4444" />
            <text x="85" y="95" fontSize="14" fontWeight="bold">E</text>
            <text x="210" y="95" fontSize="14" fontWeight="bold">F</text>
            
            {/* Line joining midpoints */}
            <line x1="105" y1="100" x2="195" y2="100" stroke="#ef4444" strokeWidth="3" />
            
            {/* Parallel markers */}
            <path d="M 145,100 L 155,95 L 155,105 Z" fill="#ef4444" />
            <path d="M 145,160 L 155,155 L 155,165 Z" fill="#ef4444" />

            <text x="150" y="185" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ef4444">EF || BC and EF = ½ BC</text>
        </SvgWrap>
    );
}

export function KiteChart() {
    return (
        <SvgWrap viewBox="0 0 300 240">
            <polygon points="150,20 210,90 150,200 90,90" fill="none" stroke="#db2777" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Tick marks */}
            <line x1="115" y1="50" x2="125" y2="60" stroke="#db2777" strokeWidth="2" />
            <line x1="175" y1="60" x2="185" y2="50" stroke="#db2777" strokeWidth="2" />
            
            <line x1="105" y1="140" x2="115" y2="145" stroke="#db2777" strokeWidth="2" />
            <line x1="110" y1="135" x2="120" y2="140" stroke="#db2777" strokeWidth="2" />
            
            <line x1="185" y1="145" x2="195" y2="140" stroke="#db2777" strokeWidth="2" />
            <line x1="180" y1="140" x2="190" y2="135" stroke="#db2777" strokeWidth="2" />

            <text x="150" y="225" textAnchor="middle" fontSize="14" fontWeight="800" fill="#db2777">Adjacent Sides are Equal</text>
        </SvgWrap>
    );
}
