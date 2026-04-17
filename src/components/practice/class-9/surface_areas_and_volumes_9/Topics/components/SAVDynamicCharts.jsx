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

// ─── 1. CONE ANATOMY CHART ──────────────────────────────────────────────────────
export const ConeAnatomyChart = () => {
    const [highlight, setHighlight] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setHighlight(p => (p + 1) % 3), 2000);
        return () => clearInterval(interval);
    }, []);

    const labels = ['Radius (r)', 'Height (h)', 'Slant Height (l)'];
    const colors = ['#059669', '#b71c1c', '#0f4c81'];

    return (
        <SVGChartWrapper viewBox="0 0 280 220">
            {/* Cone Body */}
            <path d="M 50 170 L 230 170 L 140 30 Z" fill="rgba(15, 76, 129, 0.06)" stroke="#0f4c81" strokeWidth="2" />
            {/* Base Ellipse */}
            <ellipse cx="140" cy="170" rx="90" ry="20" fill="rgba(5, 150, 105, 0.08)" stroke="#059669" strokeWidth="2" />

            {/* Height (dashed) */}
            <line x1="140" y1="30" x2="140" y2="170" stroke={highlight === 1 ? '#b71c1c' : '#b71c1c80'} strokeWidth={highlight === 1 ? 3 : 2} strokeDasharray="6 4" style={{ transition: 'all 0.4s' }} />
            <text x="148" y="105" fontSize="13" fill="#b71c1c" fontWeight="bold" style={{ opacity: highlight === 1 ? 1 : 0.5, transition: 'opacity 0.4s' }}>h</text>

            {/* Radius */}
            <line x1="140" y1="170" x2="230" y2="170" stroke={highlight === 0 ? '#059669' : '#05966980'} strokeWidth={highlight === 0 ? 3 : 2} style={{ transition: 'all 0.4s' }} />
            <text x="185" y="195" fontSize="13" fill="#059669" fontWeight="bold" style={{ opacity: highlight === 0 ? 1 : 0.5, transition: 'opacity 0.4s' }}>r</text>

            {/* Slant Height */}
            <line x1="140" y1="30" x2="230" y2="170" stroke={highlight === 2 ? '#0f4c81' : '#0f4c8180'} strokeWidth={highlight === 2 ? 3 : 2} style={{ transition: 'all 0.4s' }} />
            <text x="195" y="95" fontSize="13" fill="#0f4c81" fontWeight="bold" style={{ opacity: highlight === 2 ? 1 : 0.5, transition: 'opacity 0.4s' }}>l</text>

            {/* Right angle marker at base */}
            <rect x="140" y="158" width="10" height="10" fill="none" stroke="#334155" strokeWidth="1" />

            {/* Apex dot */}
            <circle cx="140" cy="30" r="3" fill="#0f172a" />
            {/* Center dot */}
            <circle cx="140" cy="170" r="3" fill="#0f172a" />

            {/* Active label */}
            <rect x="65" y="205" width="150" height="22" rx="6" fill="#f1f5f9" />
            <text x="140" y="220" fontSize="13" fill={colors[highlight]} textAnchor="middle" fontWeight="bold" style={{ transition: 'fill 0.4s' }}>
                {labels[highlight]}
            </text>
        </SVGChartWrapper>
    );
};

// ─── 2. CONE FORMULAS CHART ─────────────────────────────────────────────────────
export const ConeFormulasChart = () => {
    return (
        <SVGChartWrapper viewBox="0 0 300 200">
            {/* Cone outline */}
            <path d="M 40 140 L 160 140 L 100 30 Z" fill="rgba(15, 76, 129, 0.05)" stroke="#0f4c81" strokeWidth="2" />
            <ellipse cx="100" cy="140" rx="60" ry="14" fill="none" stroke="#059669" strokeWidth="1.5" />
            <line x1="100" y1="30" x2="100" y2="140" stroke="#b71c1c" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="100" y1="140" x2="160" y2="140" stroke="#059669" strokeWidth="1.5" />
            <text x="130" y="155" fontSize="10" fill="#059669" fontWeight="bold">r</text>
            <text x="107" y="95" fontSize="10" fill="#b71c1c" fontWeight="bold">h</text>
            <text x="60" y="80" fontSize="10" fill="#0f4c81" fontWeight="bold">l</text>

            {/* Formulas on the right */}
            <text x="185" y="45" fontSize="12" fill="#0f4c81" fontWeight="bold">CSA = πrl</text>
            <text x="185" y="75" fontSize="12" fill="#059669" fontWeight="bold">TSA = πr(l + r)</text>
            <text x="185" y="105" fontSize="12" fill="#b71c1c" fontWeight="bold">Vol = ⅓πr²h</text>
            <text x="185" y="135" fontSize="11" fill="#64748b">l² = r² + h²</text>

            <rect x="178" y="150" width="110" height="22" rx="6" fill="#f1f5f9" />
            <text x="233" y="165" fontSize="11" fill="#334155" textAnchor="middle" fontWeight="600">π = 22/7</text>
        </SVGChartWrapper>
    );
};

// ─── 3. SPHERE ANATOMY CHART ────────────────────────────────────────────────────
export const SphereAnatomyChart = () => {
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setPulse(p => !p), 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <SVGChartWrapper viewBox="0 0 280 200">
            {/* The sphere */}
            <circle cx="140" cy="100" r="75" fill="rgba(5, 150, 105, 0.05)" stroke="#059669" strokeWidth="2.5" />
            {/* Equator ellipse */}
            <ellipse cx="140" cy="100" rx="75" ry="22" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="5 3" />

            {/* Radius line */}
            <line x1="140" y1="100" x2="215" y2="100" stroke={pulse ? '#059669' : '#0f4c81'} strokeWidth={pulse ? 3 : 2} style={{ transition: 'all 0.4s' }} />
            <circle cx="140" cy="100" r="3.5" fill="#0f172a" />
            <text x="178" y="92" fontSize="14" fill={pulse ? '#059669' : '#0f4c81'} fontWeight="bold" style={{ transition: 'fill 0.4s' }}>r</text>
            <text x="140" y="118" fontSize="11" fill="#64748b" textAnchor="middle">O (center)</text>

            {/* Formulas */}
            <rect x="60" y="180" width="160" height="18" rx="6" fill="#f1f5f9" />
            <text x="140" y="194" fontSize="12" fill="#059669" textAnchor="middle" fontWeight="bold">SA = 4πr²  ·  Vol = ⁴⁄₃πr³</text>
        </SVGChartWrapper>
    );
};

// ─── 4. HEMISPHERE CHART ────────────────────────────────────────────────────────
export const HemisphereChart = () => {
    const [showFlat, setShowFlat] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setShowFlat(p => !p), 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <SVGChartWrapper viewBox="0 0 280 180">
            {/* Hemisphere dome */}
            <path d="M 40 110 A 100 100 0 0 1 240 110" fill="rgba(183, 28, 28, 0.05)" stroke="#b71c1c" strokeWidth="2.5" />
            {/* Flat base */}
            <ellipse cx="140" cy="110" rx="100" ry="22" fill={showFlat ? 'rgba(183, 28, 28, 0.12)' : 'rgba(183, 28, 28, 0.03)'} stroke="#b71c1c" strokeWidth="2" style={{ transition: 'fill 0.4s' }} />

            {/* Radius */}
            <line x1="140" y1="110" x2="240" y2="110" stroke="#b71c1c" strokeWidth="2" />
            <circle cx="140" cy="110" r="3" fill="#0f172a" />
            <text x="190" y="105" fontSize="13" fill="#b71c1c" fontWeight="bold">r</text>

            {/* Active label */}
            <rect x="45" y="145" width="190" height="26" rx="8" fill="#f1f5f9" />
            <text x="140" y="163" fontSize="12" fill="#b71c1c" textAnchor="middle" fontWeight="bold">
                {showFlat ? 'TSA = 3πr²  (curved + flat base)' : 'CSA = 2πr²  (curved only)'}
            </text>
        </SVGChartWrapper>
    );
};

// ─── 5. HEMISPHERE VOLUME CHART ─────────────────────────────────────────────────
export const HemisphereVolumeChart = () => {
    const [fillPct, setFillPct] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFillPct(p => p >= 100 ? 0 : p + 2);
        }, 60);
        return () => clearInterval(interval);
    }, []);

    const fillHeight = 60 * (fillPct / 100); // max fill height

    return (
        <SVGChartWrapper viewBox="0 0 280 180">
            {/* Hemisphere bowl outline */}
            <path d="M 40 100 A 100 80 0 0 1 240 100" fill="none" stroke="#6a1b9a" strokeWidth="2.5" />
            <ellipse cx="140" cy="100" rx="100" ry="18" fill="none" stroke="#6a1b9a" strokeWidth="2" />

            {/* Water fill (clip to hemisphere) */}
            <defs>
                <clipPath id="hemi-clip">
                    <path d="M 40 100 A 100 80 0 0 1 240 100 L 240 100 L 40 100 Z" />
                </clipPath>
            </defs>
            <rect x="40" y={100 - fillHeight} width="200" height={fillHeight} fill="rgba(59, 130, 246, 0.2)" clipPath="url(#hemi-clip)" style={{ transition: 'y 0.06s, height 0.06s' }} />

            {/* Labels */}
            <text x="140" y="85" fontSize="14" fill="#6a1b9a" fontWeight="bold" textAnchor="middle">r</text>
            <line x1="140" y1="100" x2="240" y2="100" stroke="#6a1b9a" strokeWidth="1.5" />
            <circle cx="140" cy="100" r="3" fill="#0f172a" />

            <rect x="55" y="130" width="170" height="22" rx="6" fill="#f1f5f9" />
            <text x="140" y="145" fontSize="12" fill="#6a1b9a" textAnchor="middle" fontWeight="bold">Vol = ⅔πr³</text>

            <text x="140" y="170" fontSize="10" fill="#64748b" textAnchor="middle">1000 cm³ = 1 Liter</text>
        </SVGChartWrapper>
    );
};

// ─── 6. APPLICATION: TENT/DOME COST CHART ────────────────────────────────────────
export const ApplicationCostChart = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setStep(p => (p + 1) % 3), 2500);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { label: '1. Identify Shape', color: '#0f4c81' },
        { label: '2. Calculate Area', color: '#059669' },
        { label: '3. Cost = Area × Rate', color: '#b71c1c' },
    ];

    return (
        <SVGChartWrapper viewBox="0 0 300 220">
            {/* Conical tent */}
            <g transform="translate(30, 5)">
                <path d="M 10 120 L 110 120 L 60 20 Z" fill="rgba(15, 76, 129, 0.06)" stroke="#0f4c81" strokeWidth="2" />
                <ellipse cx="60" cy="120" rx="50" ry="12" fill="none" stroke="#059669" strokeWidth="1.5" />
                <text x="60" y="145" fontSize="10" fill="#64748b" textAnchor="middle">Conical Tent</text>
            </g>

            {/* Hemispherical dome */}
            <g transform="translate(170, 35)">
                <path d="M 10 90 A 50 50 0 0 1 110 90" fill="rgba(183, 28, 28, 0.06)" stroke="#b71c1c" strokeWidth="2" />
                <ellipse cx="60" cy="90" rx="50" ry="12" fill="none" stroke="#b71c1c" strokeWidth="1.5" />
                <text x="60" y="115" fontSize="10" fill="#64748b" textAnchor="middle">Hemispherical Dome</text>
            </g>

            {/* Step indicator */}
            {steps.map((s, i) => (
                <g key={i} transform={`translate(80, ${165 + i * 18})`}>
                    <circle cx="8" cy="6" r={step === i ? 6 : 4} fill={step === i ? s.color : '#e2e8f0'} style={{ transition: 'all 0.4s' }} />
                    <text x="20" y="10" fontSize="11" fill={step === i ? s.color : '#94a3b8'} fontWeight={step === i ? 'bold' : 'normal'} style={{ transition: 'all 0.4s' }}>
                        {s.label}
                    </text>
                </g>
            ))}
        </SVGChartWrapper>
    );
};

// ─── 7. APPLICATION: CAPACITY CHART ─────────────────────────────────────────────
export const ApplicationCapacityChart = () => {
    return (
        <SVGChartWrapper viewBox="0 0 300 180">
            {/* Hemispherical bowl */}
            <g transform="translate(20, 10)">
                <path d="M 10 80 A 60 50 0 0 1 130 80" fill="rgba(6, 182, 212, 0.08)" stroke="#0891b2" strokeWidth="2" />
                <ellipse cx="70" cy="80" rx="60" ry="12" fill="none" stroke="#0891b2" strokeWidth="1.5" />
                {/* Water ripple */}
                <ellipse cx="70" cy="65" rx="45" ry="6" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2">
                    <animate attributeName="ry" values="6;8;6" dur="2s" repeatCount="indefinite" />
                </ellipse>
                <text x="70" y="110" fontSize="10" fill="#64748b" textAnchor="middle">Bowl (⅔πr³)</text>
            </g>

            {/* Conical vessel */}
            <g transform="translate(170, 10)">
                <path d="M 30 80 L 110 80 L 70 10 Z" fill="rgba(6, 182, 212, 0.08)" stroke="#0891b2" strokeWidth="2" />
                {/* Water fill inside */}
                <path d="M 45 55 L 95 55 L 70 10 Z" fill="rgba(56, 189, 248, 0.15)" />
                <text x="70" y="100" fontSize="10" fill="#64748b" textAnchor="middle">Vessel (⅓πr²h)</text>
            </g>

            {/* Conversion info */}
            <rect x="30" y="130" width="240" height="40" rx="10" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1" />
            <text x="150" y="148" fontSize="12" fill="#0d9488" textAnchor="middle" fontWeight="bold">Unit Conversion</text>
            <text x="150" y="163" fontSize="11" fill="#64748b" textAnchor="middle">1000 cm³ = 1 Liter  ·  1 m³ = 1000 Liters</text>
        </SVGChartWrapper>
    );
};

// ─── 8. INTRO HERO SVG ─────────────────────────────────────────────────────────
export const IntroHeroSVG = () => {
    const [rot, setRot] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setRot(p => (p + 1) % 360), 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <SVGChartWrapper viewBox="0 0 340 160">
            {/* Cone */}
            <g transform="translate(30, 20)">
                <path d="M 15 110 L 85 110 L 50 15 Z" fill="rgba(15, 76, 129, 0.08)" stroke="#0f4c81" strokeWidth="2" />
                <ellipse cx="50" cy="110" rx="35" ry="10" fill="none" stroke="#0f4c81" strokeWidth="1.5" />
                <text x="50" y="135" fontSize="10" fill="#0f4c81" textAnchor="middle" fontWeight="600">Cone</text>
            </g>

            {/* Sphere (rotating highlight) */}
            <g transform="translate(140, 20)">
                <circle cx="50" cy="55" r="45" fill="rgba(5, 150, 105, 0.06)" stroke="#059669" strokeWidth="2" />
                <ellipse cx="50" cy="55" rx="45" ry="14" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="4 3" transform={`rotate(${rot * 0.2}, 50, 55)`} />
                <circle cx="50" cy="55" r="2" fill="#059669" />
                <text x="50" y="115" fontSize="10" fill="#059669" textAnchor="middle" fontWeight="600">Sphere</text>
            </g>

            {/* Hemisphere */}
            <g transform="translate(245, 45)">
                <path d="M 5 65 A 40 40 0 0 1 85 65" fill="rgba(183, 28, 28, 0.06)" stroke="#b71c1c" strokeWidth="2" />
                <ellipse cx="45" cy="65" rx="40" ry="10" fill="none" stroke="#b71c1c" strokeWidth="1.5" />
                <text x="45" y="90" fontSize="10" fill="#b71c1c" textAnchor="middle" fontWeight="600">Hemisphere</text>
            </g>

            {/* Title */}
            <text x="170" y="155" fontSize="13" fill="#475569" textAnchor="middle" fontWeight="bold">3D Shapes in this Chapter</text>
        </SVGChartWrapper>
    );
};
