import React from 'react';

// ─── Helpers ───────────────────────────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const ANGLES = [30, 45, 60];

const tanStr = (a) => ({ 30: '\\frac{1}{\\sqrt{3}}', 45: '1', 60: '\\sqrt{3}' }[a]);
const cotStr = (a) => ({ 30: '\\sqrt{3}', 45: '1', 60: '\\frac{1}{\\sqrt{3}}' }[a]);
const sinStr = (a) => ({ 30: '\\frac{1}{2}', 45: '\\frac{1}{\\sqrt{2}}', 60: '\\frac{\\sqrt{3}}{2}' }[a]);
const cosStr = (a) => ({ 30: '\\frac{\\sqrt{3}}{2}', 45: '\\frac{1}{\\sqrt{2}}', 60: '\\frac{1}{2}' }[a]);

// Height = d * tan(angle) as a LaTeX string
function hExpr(d, angle) {
    if (angle === 30) return `\\frac{${d}}{\\sqrt{3}}`;
    if (angle === 45) return `${d}`;
    return `${d}\\sqrt{3}`;
}
// Distance = h / tan(angle)
function dExpr(h, angle) {
    if (angle === 30) return `${h}\\sqrt{3}`;
    if (angle === 45) return `${h}`;
    return `\\frac{${h}}{\\sqrt{3}}`;
}
// String length = h / sin(angle)
function strExpr(h, angle) {
    if (angle === 30) return `${h * 2}`;
    if (angle === 45) return `${h}\\sqrt{2}`;
    return `\\frac{${h * 2}}{\\sqrt{3}}`;
}

// Wrong answer variants
function wrongH(d, angle) {
    const others = ANGLES.filter(a => a !== angle);
    return hExpr(d, others[0]);
}

// ─── SVG Diagram Components ────────────────────────────────────────────────
function ElevDiagram({ d, angle, color = '#059669', label = 'Tower', showH = true }) {
    return (
        <svg viewBox="0 0 300 180" style={{ width: '100%', maxHeight: 165 }}>
            <line x1="20" y1="155" x2="280" y2="155" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Observer */}
            <circle cx="55" cy="140" r="7" fill={color} />
            <line x1="55" y1="147" x2="55" y2="155" stroke={color} strokeWidth="2" />
            <text x="55" y="170" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">Observer</text>
            {/* Tower */}
            <rect x="228" y="45" width="18" height="110" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
            <text x="237" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">{label}</text>
            {/* Line of sight */}
            <line x1="62" y1="140" x2="228" y2="50" stroke={color} strokeWidth="2" strokeDasharray="5,3" />
            {/* Horizontal */}
            <line x1="62" y1="140" x2="228" y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
            {/* Angle arc */}
            <path d="M 100,140 A 38,38 0 0,0 90,120" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="108" y="130" fontSize="12" fontWeight="900" fill="#ef4444">{angle}°</text>
            {/* Labels */}
            <text x="142" y="170" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="800">{d} m</text>
            {showH && <text x="254" y="100" fontSize="10" fill="#ef4444" fontWeight="800">h = ?</text>}
            {/* Right angle marker */}
            <polyline points="218,155 218,145 228,145" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
    );
}

function ElevDiagramKnownH({ d, h, angle, color = '#059669' }) {
    return (
        <svg viewBox="0 0 300 180" style={{ width: '100%', maxHeight: 165 }}>
            <line x1="20" y1="155" x2="280" y2="155" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            <circle cx="55" cy="140" r="7" fill={color} />
            <line x1="55" y1="147" x2="55" y2="155" stroke={color} strokeWidth="2" />
            <rect x="228" y="45" width="18" height="110" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
            <line x1="62" y1="140" x2="228" y2="50" stroke={color} strokeWidth="2" strokeDasharray="5,3" />
            <line x1="62" y1="140" x2="228" y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
            <path d="M 100,140 A 38,38 0 0,0 90,120" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="108" y="130" fontSize="12" fontWeight="900" fill="#ef4444">θ = ?</text>
            <text x="142" y="170" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="800">{d} m</text>
            <text x="254" y="100" fontSize="10" fill="#ef4444" fontWeight="800">h={h}</text>
            <polyline points="218,155 218,145 228,145" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
    );
}

function DeprDiagram({ h, angle, color = '#7c3aed', showD = true }) {
    return (
        <svg viewBox="0 0 300 200" style={{ width: '100%', maxHeight: 185 }}>
            <line x1="20" y1="180" x2="280" y2="180" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Building/cliff */}
            <rect x="40" y="40" width="22" height="140" fill="#ede9fe" stroke={color} strokeWidth="1.5" rx="2" />
            <circle cx="51" cy="36" r="7" fill={color} />
            <text x="51" y="25" textAnchor="middle" fontSize="9" fontWeight="700" fill={color}>Observer</text>
            {/* Horizontal from top */}
            <line x1="62" y1="40" x2="270" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="175" y="34" textAnchor="middle" fontSize="9" fill="#f59e0b" fontWeight="700">Horizontal</text>
            {/* Object on ground */}
            <circle cx="230" cy="176" r="6" fill="#ec4899" />
            <text x="230" y="195" textAnchor="middle" fontSize="9" fill="#ec4899" fontWeight="700">Object</text>
            {/* Line of sight */}
            <line x1="58" y1="40" x2="226" y2="173" stroke={color} strokeWidth="2" strokeDasharray="5,3" />
            {/* Depression angle */}
            <path d="M 105,40 A 43,43 0 0,1 94,68" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="112" y="60" fontSize="12" fontWeight="900" fill="#ef4444">{angle}°</text>
            {/* Height label */}
            <text x="22" y="112" fontSize="9" fill={color} fontWeight="800" transform="rotate(-90,22,112)">h = {h} m</text>
            {showD && <text x="144" y="192" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="800">d = ?</text>}
            {/* Right angle */}
            <polyline points="220,180 220,170 230,170" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
    );
}

function ShadowDiagram({ h, angle, color = '#d97706', shadowLabel = '?' }) {
    return (
        <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
            <line x1="20" y1="150" x2="280" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Sun */}
            <circle cx="30" cy="28" r="14" fill="#fbbf24" opacity="0.85" />
            <text x="30" y="33" textAnchor="middle" fontSize="13">☀️</text>
            {/* Pole */}
            <line x1="190" y1="150" x2="190" y2="42" stroke="#1e293b" strokeWidth="3" />
            <circle cx="190" cy="39" r="4" fill="#f59e0b" />
            <text x="200" y="96" fontSize="10" fill="#1e293b" fontWeight="800">{h} m</text>
            {/* Shadow */}
            <line x1="190" y1="150" x2="80" y2="150" stroke="#94a3b8" strokeWidth="4" />
            <text x="135" y="165" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="800">shadow = {shadowLabel}</text>
            {/* Sun ray */}
            <line x1="80" y1="150" x2="190" y2="42" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Angle arc */}
            <path d="M 113,150 A 33,33 0 0,0 106,128" fill="none" stroke="#ef4444" strokeWidth="2" />
            <text x="104" y="142" fontSize="11" fontWeight="900" fill="#ef4444">{angle}°</text>
            {/* Right angle at pole base */}
            <polyline points="182,150 182,142 190,142" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
    );
}

function TwoPosDiagram({ d1, d2, move, angle1, angle2, color = '#dc2626' }) {
    return (
        <svg viewBox="0 0 320 180" style={{ width: '100%', maxHeight: 165 }}>
            <line x1="10" y1="155" x2="310" y2="155" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Tower */}
            <rect x="252" y="35" width="16" height="120" fill="#fee2e2" stroke={color} strokeWidth="1.5" rx="2" />
            <text x="260" y="28" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">Tower</text>
            {/* Observer positions */}
            <circle cx="60" cy="150" r="6" fill="#3b82f6" />
            <circle cx="60" cy="150" r="12" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,2" />
            <circle cx="130" cy="150" r="6" fill="#8b5cf6" />
            {/* Lines of sight */}
            <line x1="66" y1="148" x2="252" y2="38" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
            <line x1="136" y1="148" x2="252" y2="38" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Angle labels */}
            <text x="80" y="138" fontSize="11" fontWeight="800" fill="#3b82f6">{angle1}°</text>
            <text x="148" y="138" fontSize="11" fontWeight="800" fill="#8b5cf6">{angle2}°</text>
            {/* Distance labels */}
            <text x="95" y="170" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="700">← {move} m →</text>
            <text x="191" y="170" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="700">d = ?</text>
            <text x="278" y="96" fontSize="10" fill={color} fontWeight="800">h = ?</text>
            <polyline points="242,155 242,145 252,145" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
    );
}

function LadderDiagram({ len, angle, color = '#059669' }) {
    return (
        <svg viewBox="0 0 280 175" style={{ width: '100%', maxHeight: 160 }}>
            <line x1="20" y1="155" x2="260" y2="155" stroke="#94a3b8" strokeWidth="2" />
            {/* Wall */}
            <rect x="205" y="20" width="16" height="135" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
            {/* Ladder */}
            <line x1="100" y1="155" x2="205" y2="52" stroke={color} strokeWidth="4" strokeLinecap="round" />
            {/* Rungs */}
            {[0.25, 0.5, 0.75].map((t, i) => (
                <line key={i}
                    x1={100 + 105 * t - 8} y1={155 - 103 * t + 6}
                    x2={100 + 105 * t + 8} y2={155 - 103 * t - 6}
                    stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            ))}
            {/* Angle arc */}
            <path d="M 128,155 A 28,28 0 0,0 120,131" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="134" y="144" fontSize="11" fontWeight="900" fill="#ef4444">{angle}°</text>
            {/* Labels */}
            <text x="152" y="88" fontSize="10" fill={color} fontWeight="800" transform="rotate(-44,152,88)">{len} m</text>
            <text x="228" y="100" fontSize="10" fill="#ef4444" fontWeight="800">h = ?</text>
            <polyline points="197,155 197,147 205,147" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
    );
}

function TwoShipsDiagram({ h, angle1, angle2, color = '#0369a1' }) {
    return (
        <svg viewBox="0 0 320 200" style={{ width: '100%', maxHeight: 185 }}>
            <line x1="10" y1="180" x2="310" y2="180" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Lighthouse */}
            <rect x="143" y="40" width="18" height="140" fill="#dbeafe" stroke={color} strokeWidth="1.5" rx="2" />
            <circle cx="152" cy="36" r="7" fill={color} />
            <text x="152" y="25" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">Lighthouse</text>
            {/* Horizontal */}
            <line x1="28" y1="40" x2="290" y2="40" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
            {/* Ships */}
            <text x="40" y="185" textAnchor="middle" fontSize="14">🚢</text>
            <text x="258" y="185" textAnchor="middle" fontSize="14">🚢</text>
            {/* Lines of sight (depression) */}
            <line x1="143" y1="40" x2="48" y2="178" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" />
            <line x1="161" y1="40" x2="252" y2="178" stroke="#059669" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Angles */}
            <path d="M 110,40 A 33,33 0 0,1 102,62" fill="none" stroke="#7c3aed" strokeWidth="2" />
            <text x="98" y="57" fontSize="11" fontWeight="800" fill="#7c3aed">{angle1}°</text>
            <path d="M 185,40 A 33,33 0 0,0 193,62" fill="none" stroke="#059669" strokeWidth="2" />
            <text x="191" y="57" fontSize="11" fontWeight="800" fill="#059669">{angle2}°</text>
            {/* Height */}
            <text x="172" y="110" fontSize="10" fill={color} fontWeight="800">h={h}m</text>
            {/* Total distance */}
            <text x="152" y="196" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="800">total dist = ?</text>
        </svg>
    );
}

function ComplementaryDiagram({ a, b, color = '#dc2626' }) {
    return (
        <svg viewBox="0 0 320 175" style={{ width: '100%', maxHeight: 160 }}>
            <line x1="10" y1="155" x2="310" y2="155" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            <rect x="148" y="30" width="14" height="125" fill="#fee2e2" stroke={color} strokeWidth="1.5" rx="2" />
            <text x="155" y="22" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">Tower</text>
            <circle cx="55" cy="150" r="6" fill="#3b82f6" />
            <circle cx="245" cy="150" r="6" fill="#8b5cf6" />
            <line x1="61" y1="148" x2="148" y2="33" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
            <line x1="239" y1="148" x2="161" y2="33" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="55" y="170" textAnchor="middle" fontSize="9" fill="#3b82f6" fontWeight="700">{a}m</text>
            <text x="245" y="170" textAnchor="middle" fontSize="9" fill="#8b5cf6" fontWeight="700">{b}m</text>
            <text x="72" y="138" fontSize="9" fill="#3b82f6" fontWeight="700">θ</text>
            <text x="220" y="138" fontSize="9" fill="#8b5cf6" fontWeight="700">90-θ</text>
            <text x="175" y="92" fontSize="10" fill={color} fontWeight="800">h = √(ab) ?</text>
        </svg>
    );
}

function RiverDiagram({ w, angle1, angle2, color = '#6d28d9' }) {
    return (
        <svg viewBox="0 0 300 190" style={{ width: '100%', maxHeight: 175 }}>
            <rect x="80" y="0" width="140" height="175" fill="#bfdbfe" opacity="0.3" />
            <line x1="80" y1="0" x2="80" y2="175" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,3" />
            <line x1="220" y1="0" x2="220" y2="175" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,3" />
            <text x="150" y="90" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="700">🏞️ River</text>
            <line x1="10" y1="160" x2="80" y2="160" stroke="#94a3b8" strokeWidth="2" />
            <line x1="220" y1="160" x2="290" y2="160" stroke="#94a3b8" strokeWidth="2" />
            {/* Tree on far bank */}
            <line x1="220" y1="160" x2="220" y2="70" stroke="#1e293b" strokeWidth="3" />
            <text x="220" y="60" textAnchor="middle" fontSize="16">🌳</text>
            {/* Observer */}
            <circle cx="40" cy="152" r="7" fill={color} />
            {/* Lines of sight */}
            <line x1="47" y1="148" x2="218" y2="72" stroke={color} strokeWidth="1.5" strokeDasharray="5,3" />
            <line x1="47" y1="148" x2="218" y2="158" stroke="#059669" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Angle labels */}
            <text x="70" y="135" fontSize="10" fontWeight="800" fill={color}>{angle1}°</text>
            <text x="70" y="150" fontSize="10" fontWeight="800" fill="#059669">{angle2}°</text>
            {/* Width label */}
            <text x="150" y="182" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="800">width = ? m</text>
        </svg>
    );
}

// ─── SKILL 1: Line of Sight & Setup (Conceptual - no dynamic numbers needed) ──
export function generateLineOfSightQuestions(mode) {
    const conceptual = [
        {
            difficulty: 'easy',
            question: "A boy standing on the ground looks up at a kite in the sky. The angle between the horizontal and his line of sight is called the:",
            diagram: () => (
                <svg viewBox="0 0 300 160" style={{ width: '100%', maxHeight: 145 }}>
                    <line x1="20" y1="140" x2="280" y2="140" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="60" cy="128" r="7" fill="#059669" />
                    <line x1="60" y1="135" x2="60" y2="140" stroke="#059669" strokeWidth="2" />
                    <text x="60" y="155" textAnchor="middle" fontSize="9" fill="#059669" fontWeight="700">Boy</text>
                    <text x="230" y="35" textAnchor="middle" fontSize="18">🪁</text>
                    <line x1="67" y1="124" x2="225" y2="42" stroke="#0891b2" strokeWidth="2" strokeDasharray="5,3" />
                    <line x1="67" y1="124" x2="225" y2="124" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
                    <path d="M 100,124 A 33,33 0 0,0 92,106" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="108" y="114" fontSize="11" fontWeight="900" fill="#ef4444">?</text>
                </svg>
            ),
            options: ["Angle of Depression", "Angle of Elevation", "Right Angle", "Vertical Angle"],
            correct: 1,
            explanation: "When an observer looks UPWARD at an object above the horizontal, the angle formed between the horizontal and the line of sight is the Angle of Elevation."
        },
        {
            difficulty: 'easy',
            question: "A lighthouse keeper looks down at a boat on the sea. The angle formed between the horizontal and the line of sight is:",
            diagram: () => (
                <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                    <line x1="20" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <rect x="48" y="35" width="22" height="130" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" rx="2" />
                    <circle cx="59" cy="30" r="7" fill="#7c3aed" />
                    <line x1="70" y1="34" x2="260" y2="34" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
                    <text x="220" y="165" textAnchor="middle" fontSize="14">🚢</text>
                    <line x1="68" y1="34" x2="218" y2="162" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5,3" />
                    <path d="M 108,34 A 38,38 0 0,1 98,58" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="116" y="52" fontSize="11" fontWeight="900" fill="#ef4444">?</text>
                </svg>
            ),
            options: ["Angle of Elevation", "Angle of Depression", "Alternate Angle", "None of these"],
            correct: 1,
            explanation: "Looking DOWNWARD from a height creates the Angle of Depression — measured between the horizontal and the downward line of sight."
        },
        {
            difficulty: 'easy',
            question: "In a Heights & Distances right triangle, where is the right angle located?",
            diagram: () => (
                <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
                    <polygon points="55,155 245,155 245,40" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
                    <polyline points="230,155 230,140 245,140" fill="none" stroke="#059669" strokeWidth="2" />
                    <text x="55" y="170" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="700">Observer</text>
                    <text x="245" y="170" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="700">Base of Tower</text>
                    <text x="255" y="96" fontSize="10" fill="#1e293b" fontWeight="700">Tower</text>
                    <text x="145" y="148" textAnchor="middle" fontSize="10" fill="#f59e0b" fontWeight="700">Ground Distance</text>
                    <path d="M 88,155 A 33,33 0 0,0 79,136" fill="none" stroke="#ef4444" strokeWidth="2" />
                    <text x="95" y="145" fontSize="11" fontWeight="900" fill="#ef4444">θ</text>
                </svg>
            ),
            options: ["At the observer's eye", "At the top of the tower", "At the base of the tower (where tower meets ground)", "At the midpoint of the hypotenuse"],
            correct: 2,
            explanation: "The right angle is always at the base of the vertical object — where the vertical height meets the horizontal ground. The tower is vertical (perpendicular to ground)."
        },
        {
            difficulty: 'easy',
            question: "The angle of depression from a cliff top to a boat equals the angle of elevation from the boat to the cliff top. This is because:",
            diagram: () => (
                <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                    <line x1="20" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <rect x="45" y="40" width="20" height="125" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" rx="2" />
                    <circle cx="55" cy="36" r="6" fill="#7c3aed" />
                    <line x1="65" y1="40" x2="265" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
                    <line x1="65" y1="40" x2="235" y2="162" stroke="#7c3aed" strokeWidth="2" />
                    <line x1="55" y1="165" x2="235" y2="165" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,3" />
                    <path d="M 108,40 A 43,43 0 0,1 98,65" fill="none" stroke="#ef4444" strokeWidth="2" />
                    <text x="90" y="58" fontSize="10" fontWeight="800" fill="#ef4444">β (dep)</text>
                    <path d="M 196,165 A 38,38 0 0,0 188,146" fill="none" stroke="#0891b2" strokeWidth="2" />
                    <text x="176" y="155" fontSize="10" fontWeight="800" fill="#0891b2">β (elev)</text>
                    <text x="280" y="40" fontSize="9" fill="#f59e0b">∥</text>
                    <text x="237" y="175" fontSize="9" fill="#10b981">∥</text>
                </svg>
            ),
            options: ["Vertically opposite angles", "Corresponding angles", "Alternate interior angles (parallel lines cut by transversal)", "Co-interior angles"],
            correct: 2,
            explanation: "The horizontal line at the top and the ground are parallel. The line of sight is the transversal. Alternate interior angles formed are equal — so angle of depression = angle of elevation."
        },
        {
            difficulty: 'easy',
            question: "If the angle of elevation of the sun is 90°, the shadow of a vertical pole is:",
            diagram: () => (
                <svg viewBox="0 0 300 170" style={{ width: '100%', maxHeight: 155 }}>
                    <line x1="20" y1="145" x2="280" y2="145" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <line x1="150" y1="145" x2="150" y2="35" stroke="#1e293b" strokeWidth="3" />
                    <circle cx="150" cy="32" r="5" fill="#f59e0b" />
                    <circle cx="150" cy="20" r="18" fill="#fbbf24" opacity="0.9" />
                    <text x="150" y="25" textAnchor="middle" fontSize="14">☀️</text>
                    <line x1="150" y1="18" x2="150" y2="32" stroke="#f59e0b" strokeWidth="2" />
                    <text x="150" y="162" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="700">shadow = ???</text>
                    <text x="165" y="90" fontSize="10" fill="#1e293b" fontWeight="700">pole</text>
                    <text x="200" y="60" fontSize="10" fill="#f59e0b" fontWeight="700">Sun directly overhead!</text>
                </svg>
            ),
            options: ["Equal to height", "Zero (no shadow)", "Twice the height", "Infinite"],
            correct: 1,
            explanation: "When the sun is at 90° elevation (directly overhead), rays fall vertically. No horizontal shadow is cast. Shadow = h/tan(90°) = h/∞ = 0."
        },
        {
            difficulty: 'medium',
            question: "An observer stands at point A on the ground. He sees the top of a tower at 60° elevation. He then walks toward the tower and observes at 30° elevation. Which statement is TRUE?",
            diagram: () => (
                <svg viewBox="0 0 300 170" style={{ width: '100%', maxHeight: 155 }}>
                    <line x1="10" y1="150" x2="290" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <rect x="245" y="30" width="16" height="120" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
                    <circle cx="55" cy="142" r="6" fill="#059669" />
                    <text x="55" y="165" textAnchor="middle" fontSize="9" fill="#059669">A (60°)</text>
                    <circle cx="140" cy="142" r="6" fill="#3b82f6" />
                    <text x="140" y="165" textAnchor="middle" fontSize="9" fill="#3b82f6">B (30°)</text>
                    <line x1="61" y1="140" x2="246" y2="32" stroke="#059669" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="146" y1="140" x2="246" y2="32" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                    <text x="80" y="128" fontSize="10" fontWeight="900" fill="#059669">60°</text>
                    <text x="158" y="130" fontSize="10" fontWeight="900" fill="#3b82f6">30°</text>
                </svg>
            ),
            options: ["The observer at A is closer to the tower", "The observer moved AWAY from the tower (B is farther)", "Both A and B are equidistant", "The angle increased as he walked closer"],
            correct: 1,
            explanation: "Moving CLOSER to the tower increases the elevation angle. So if angle decreased from 60° to 30°, the observer MOVED AWAY — B is farther from the tower than A."
        },
        {
            difficulty: 'medium',
            question: "In a height problem, the 'opposite' side relative to angle θ is the ____ and the 'adjacent' side is the ____.",
            diagram: () => (
                <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
                    <polygon points="55,155 245,155 245,40" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
                    <polyline points="232,155 232,142 245,142" fill="none" stroke="#059669" strokeWidth="2" />
                    <text x="148" y="170" textAnchor="middle" fontSize="11" fill="#0891b2" fontWeight="800">ADJACENT (d)</text>
                    <text x="258" y="100" fontSize="11" fill="#ef4444" fontWeight="800">OPP (h)</text>
                    <text x="136" y="85" fontSize="11" fill="#7c3aed" fontWeight="800" transform="rotate(-28,136,85)">HYPOTENUSE</text>
                    <path d="M 90,155 A 35,35 0 0,0 82,136" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                    <text x="98" y="145" fontSize="13" fontWeight="900" fill="#f59e0b">θ</text>
                </svg>
            ),
            options: ["Height (h), Ground distance (d)", "Ground distance (d), Height (h)", "Hypotenuse, Height (h)", "Height (h), Hypotenuse"],
            correct: 0,
            explanation: "Relative to angle θ at the observer: Opposite = the side it cannot touch = the vertical height (h). Adjacent = the side next to it = the ground distance (d). tan θ = h/d."
        },
        {
            difficulty: 'medium',
            question: "A person stands 50 m from a building and sees the top at angle θ. Another person stands 25 m away and sees it at angle φ. Which relationship is correct?",
            diagram: () => (
                <svg viewBox="0 0 300 170" style={{ width: '100%', maxHeight: 155 }}>
                    <line x1="10" y1="150" x2="290" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <rect x="240" y="35" width="16" height="115" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
                    <circle cx="55" cy="143" r="6" fill="#3b82f6" />
                    <text x="55" y="165" textAnchor="middle" fontSize="9" fill="#3b82f6">50m away</text>
                    <circle cx="155" cy="143" r="6" fill="#8b5cf6" />
                    <text x="155" y="165" textAnchor="middle" fontSize="9" fill="#8b5cf6">25m away</text>
                    <line x1="61" y1="141" x2="240" y2="37" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="161" y1="141" x2="240" y2="37" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,3" />
                    <text x="90" y="128" fontSize="10" fontWeight="900" fill="#3b82f6">θ</text>
                    <text x="175" y="128" fontSize="10" fontWeight="900" fill="#8b5cf6">φ</text>
                </svg>
            ),
            options: ["θ = φ", "θ > φ", "θ < φ (closer person sees larger angle)", "Cannot be determined"],
            correct: 2,
            explanation: "The closer observer (25 m) sees the building top at a larger angle than the farther observer (50 m). So φ > θ, meaning θ < φ."
        },
        {
            difficulty: 'hard',
            question: "An observer's eye is at height 1.5 m. The angle of elevation to a tower top is 45°. The distance from the observer to the tower base is 30 m. The total height of the tower from ground is:",
            diagram: () => (
                <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                    <line x1="20" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <line x1="58" y1="165" x2="58" y2="132" stroke="#059669" strokeWidth="2" />
                    <circle cx="58" cy="126" r="6" fill="#059669" />
                    <text x="38" y="150" fontSize="9" fill="#059669" fontWeight="700">1.5m</text>
                    <rect x="222" y="30" width="18" height="135" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                    <line x1="64" y1="126" x2="222" y2="30" stroke="#059669" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="64" y1="126" x2="222" y2="126" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
                    <path d="M 96,126 A 32,32 0 0,0 89,108" fill="none" stroke="#ef4444" strokeWidth="2" />
                    <text x="104" y="118" fontSize="11" fontWeight="800" fill="#ef4444">45°</text>
                    <text x="142" y="158" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="800">30 m</text>
                    <text x="250" y="95" fontSize="10" fill="#ef4444" fontWeight="800">H=?</text>
                    <line x1="248" y1="126" x2="248" y2="165" stroke="#059669" strokeWidth="1" strokeDasharray="3,2" />
                    <text x="260" y="148" fontSize="9" fill="#059669">1.5m</text>
                </svg>
            ),
            options: ["31.5 m", "30 m", "28.5 m", "32 m"],
            correct: 0,
            explanation: "Height above observer's eye = 30 × tan45° = 30 × 1 = 30 m. Total height from ground = 30 + 1.5 = 31.5 m."
        },
        {
            difficulty: 'hard',
            question: "Which trigonometric ratio would you use to find the length of the line of sight (hypotenuse) when height (h) and angle of elevation (θ) are given?",
            diagram: () => (
                <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
                    <polygon points="55,155 245,155 245,40" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
                    <polyline points="232,155 232,142 245,142" fill="none" stroke="#059669" strokeWidth="2" />
                    <text x="148" y="170" textAnchor="middle" fontSize="11" fill="#0891b2" fontWeight="800">d = Adjacent</text>
                    <text x="258" y="100" fontSize="11" fill="#ef4444" fontWeight="800">h (given)</text>
                    <text x="136" y="82" fontSize="11" fill="#7c3aed" fontWeight="800" transform="rotate(-28,136,82)">L.O.S. = ?</text>
                    <path d="M 90,155 A 35,35 0 0,0 82,136" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                    <text x="98" y="145" fontSize="13" fontWeight="900" fill="#f59e0b">θ</text>
                </svg>
            ),
            options: ["$\\cos\\theta = \\frac{d}{\\text{hyp}}$ → use cosine", "$\\sin\\theta = \\frac{h}{\\text{hyp}}$ → hyp = $\\frac{h}{\\sin\\theta}$", "$\\tan\\theta = \\frac{h}{d}$ → use tangent", "$\\cot\\theta = \\frac{d}{h}$ → use cotangent"],
            correct: 1,
            explanation: "$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{h}{\\text{LOS}}$. So Line of Sight = $\\frac{h}{\\sin\\theta}$. Use sine when hypotenuse (line of sight, string, ladder) is involved."
        }
    ];
    const assessment = [
        ...conceptual.slice(0, 5).map(q => ({ ...q })),
        {
            difficulty: 'medium',
            question: "From a hilltop, a person sees two points A and B on the ground at depression angles 30° and 60°. A and B are on the SAME side. Which point is farther from the base of the hill?",
            diagram: () => (
                <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                    <line x1="10" y1="165" x2="290" y2="165" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <rect x="42" y="35" width="20" height="130" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" rx="2" />
                    <circle cx="52" cy="30" r="7" fill="#7c3aed" />
                    <line x1="62" y1="35" x2="270" y2="35" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
                    <circle cx="130" cy="161" r="5" fill="#3b82f6" />
                    <text x="130" y="178" textAnchor="middle" fontSize="9" fill="#3b82f6" fontWeight="700">A</text>
                    <circle cx="220" cy="161" r="5" fill="#ef4444" />
                    <text x="220" y="178" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="700">B</text>
                    <line x1="60" y1="35" x2="128" y2="160" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="60" y1="35" x2="218" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
                    <text x="90" y="52" fontSize="10" fontWeight="800" fill="#3b82f6">60°</text>
                    <text x="108" y="42" fontSize="10" fontWeight="800" fill="#ef4444">30°</text>
                </svg>
            ),
            options: ["A (at 60° depression)", "B (at 30° depression)", "Both are equidistant", "Cannot determine"],
            correct: 1,
            explanation: "A smaller depression angle (30°) means the object is FARTHER away. A larger depression angle (60°) means the object is CLOSER. So B (at 30°) is farther from the base."
        },
        {
            difficulty: 'medium',
            question: "Two equal poles AB and CD stand on level ground. If lines from top of each to foot of the other cross at height h, and poles are of height p, then h equals:",
            diagram: () => (
                <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
                    <line x1="20" y1="155" x2="280" y2="155" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="70" y1="155" x2="70" y2="30" stroke="#059669" strokeWidth="3" />
                    <line x1="220" y1="155" x2="220" y2="30" stroke="#059669" strokeWidth="3" />
                    <text x="70" y="20" textAnchor="middle" fontSize="9" fill="#059669" fontWeight="700">p</text>
                    <text x="220" y="20" textAnchor="middle" fontSize="9" fill="#059669" fontWeight="700">p</text>
                    <line x1="70" y1="30" x2="220" y2="155" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="220" y1="30" x2="70" y2="155" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
                    <circle cx="145" cy="92" r="5" fill="#f59e0b" />
                    <text x="158" y="90" fontSize="9" fill="#f59e0b" fontWeight="700">h = ?</text>
                </svg>
            ),
            options: ["$h = p/2$", "$h = 2p$", "$h = p$", "$h = p/4$"],
            correct: 0,
            explanation: "For two equal poles of height p, the cross-connection formula gives $h = \\frac{p \\cdot p}{p + p} = \\frac{p^2}{2p} = \\frac{p}{2}$."
        },
        {
            difficulty: 'hard',
            question: "A vertical pole stands at the edge of a platform 3 m high. The angle of elevation of the top of the pole from a point on the ground (4 m from platform base) is 45°. Height of pole:",
            options: ["4 m", "1 m", "7 m", "3 m"],
            diagram: () => (
                <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                    <line x1="20" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeWidth="2" />
                    <rect x="130" y="132" width="100" height="33" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                    <text x="180" y="155" textAnchor="middle" fontSize="9" fill="#64748b">Platform 3m</text>
                    <line x1="130" y1="132" x2="130" y2="60" stroke="#1e293b" strokeWidth="3" />
                    <circle cx="130" cy="56" r="5" fill="#f59e0b" />
                    <text x="118" y="98" fontSize="9" fill="#1e293b" fontWeight="700">pole=?</text>
                    <circle cx="55" cy="159" r="6" fill="#059669" />
                    <line x1="61" y1="156" x2="128" y2="58" stroke="#059669" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="61" y1="156" x2="128" y2="156" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
                    <path d="M 88,156 A 27,27 0 0,0 82,138" fill="none" stroke="#ef4444" strokeWidth="2" />
                    <text x="94" y="148" fontSize="11" fontWeight="800" fill="#ef4444">45°</text>
                    <text x="93" y="172" textAnchor="middle" fontSize="9" fill="#0891b2" fontWeight="700">4m</text>
                </svg>
            ),
            correct: 1,
            explanation: "At 45°: total height above observer = distance = 4 m. Platform height = 3 m. Pole height = 4 - 3 = 1 m."
        },
        {
            difficulty: 'hard',
            question: "A person 2 m tall sees the top of a tree at 60° and the root of the tree at 30° depression. Distance to the tree is 10 m. Height of tree:",
            options: ["$10\\sqrt{3} + 10/\\sqrt{3}$ m", "$10\\sqrt{3}$ m", "$10/\\sqrt{3}$ m", "$10(\\sqrt{3}+1)$ m"],
            diagram: () => (
                <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                    <line x1="20" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <line x1="60" y1="165" x2="60" y2="132" stroke="#059669" strokeWidth="2" />
                    <circle cx="60" cy="126" r="5" fill="#059669" />
                    <text x="44" y="150" fontSize="9" fill="#059669">2m</text>
                    <line x1="200" y1="165" x2="200" y2="30" stroke="#1e293b" strokeWidth="3" />
                    <text x="218" y="100" fontSize="10" fill="#1e293b" fontWeight="700">tree</text>
                    <line x1="65" y1="126" x2="200" y2="32" stroke="#059669" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="65" y1="126" x2="200" y2="163" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" />
                    <text x="105" y="112" fontSize="10" fontWeight="700" fill="#059669">60° up</text>
                    <text x="105" y="140" fontSize="10" fontWeight="700" fill="#7c3aed">30° down</text>
                    <text x="132" y="178" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="700">10 m</text>
                </svg>
            ),
            correct: 0,
            explanation: "Height above eye = 10tan60° = 10√3. Height below eye to root = 10tan30° = 10/√3. Total tree height = 10√3 + 10/√3 m."
        },
        {
            difficulty: 'hard',
            question: "An aeroplane at altitude H flies horizontally. From a point P, the elevation was 60°. After flying some distance, elevation became 45°. If H = 3000 m, the distance flown is:",
            options: ["$3000(1 - \\frac{1}{\\sqrt{3}})$ m", "$3000(\\sqrt{3}-1)$ m", "$3000$ m", "$1000\\sqrt{3}$ m"],
            diagram: () => (
                <svg viewBox="0 0 300 170" style={{ width: '100%', maxHeight: 155 }}>
                    <line x1="20" y1="150" x2="280" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <line x1="20" y1="40" x2="280" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="35" y="35" fontSize="13">✈️</text>
                    <text x="175" y="35" fontSize="13">✈️</text>
                    <circle cx="150" cy="145" r="5" fill="#059669" />
                    <text x="150" y="163" textAnchor="middle" fontSize="9" fill="#059669">P</text>
                    <line x1="155" y1="143" x2="43" y2="43" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="155" y1="143" x2="183" y2="43" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
                    <text x="120" y="125" fontSize="10" fontWeight="700" fill="#3b82f6">60°</text>
                    <text x="165" y="128" fontSize="10" fontWeight="700" fill="#ef4444">45°</text>
                    <text x="105" y="38" fontSize="9" fill="#64748b" fontWeight="700">← distance flown →</text>
                    <text x="265" y="97" fontSize="10" fill="#ef4444" fontWeight="700">H=3000m</text>
                </svg>
            ),
            correct: 0,
            explanation: "d₁ = H/tan60° = 3000/√3. d₂ = H/tan45° = 3000. Distance flown = d₂ - d₁ = 3000 - 3000/√3 = 3000(1 - 1/√3) m."
        }
    ];
    return mode === 'practice' ? conceptual : assessment;
}

// ─── SKILL 2: Angle of Elevation ──────────────────────────────────────────
export function generateElevationQuestions(mode) {
    // Pick fresh random values
    const configs = [
        { d: pick([20, 30, 40, 50, 60]), angle: pick([30, 45, 60]) },
        { d: pick([10, 15, 20, 25, 30]), angle: 45 },
        { d: pick([40, 50, 60, 80, 100]), angle: pick([30, 60]) },
        { d: pick([20, 40, 60, 80]), angle: pick([30, 60]) },
        { d: pick([10, 12, 14, 16, 20]), angle: pick([30, 45, 60]) },
        { d: pick([30, 40, 50, 60]), angle: pick([30, 60]) },
        { h: pick([15, 20, 25, 30]), angle: pick([30, 45, 60]) },
        { obs: pick([1.2, 1.5, 1.8]), d: pick([20, 30, 40]), angle: pick([45, 60]) },
        { a: pick([9, 16, 25]), b_mult: pick([2, 3, 4]) },
        { d: pick([30, 40, 50]), angle1: 30, angle2: 60, move: pick([20, 30, 40]) }
    ];
    const [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9] = configs;

    const practice = [
        // Q1 EASY
        (() => {
            const { d, angle } = c0;
            const hStr = hExpr(d, angle);
            return {
                difficulty: 'easy',
                question: `From a point ${d} m from the base of a tower, the angle of elevation of its top is ${angle}°. Find the height of the tower.`,
                diagram: (color) => <ElevDiagram d={d} angle={angle} color={color} label="Tower" />,
                options: [`$${hStr}$ m`, `$${wrongH(d, angle)}$ m`, `$${d * 2}$ m`, `$${d}\\sin${angle}°$ m`],
                correct: 0,
                explanation: `$\\tan ${angle}° = \\frac{h}{${d}} \\Rightarrow h = ${d} \\times \\tan ${angle}° = ${hStr}$ m.`
            };
        })(),
        // Q2 EASY - angle 45
        (() => {
            const { d: d45 } = c1;
            return {
                difficulty: 'easy',
                question: `A building is ${d45} m tall. From how far away will the angle of elevation of the top be 45°?`,
                diagram: (color) => <ElevDiagramKnownH d={d45} h={d45} angle={45} color={color} />,
                options: [`${d45} m`, `${d45 * 2} m`, `${d45 / 2} m`, `$${d45}\\sqrt{2}$ m`],
                correct: 0,
                explanation: `When θ = 45°, tan 45° = 1, so height = distance. Distance from base = ${d45} m.`
            };
        })(),
        // Q3 EASY - find angle
        (() => {
            const { d, angle } = c2;
            const h_exp = hExpr(d, angle);
            return {
                difficulty: 'easy',
                question: `A pole of height $${h_exp}$ m is observed from ${d} m away. The angle of elevation is:`,
                diagram: (color) => <ElevDiagram d={d} angle={angle} color={color} showH={false} label="Pole" />,
                options: [`${angle}°`, `${angle === 30 ? 60 : 30}°`, `45°`, `${angle === 60 ? 30 : 60}°`],
                correct: 0,
                explanation: `$\\tan\\theta = \\frac{${h_exp}}{${d}} = ${tanStr(angle)} \\Rightarrow \\theta = ${angle}°$.`
            };
        })(),
        // Q4 MEDIUM - ladder
        (() => {
            const len = c4.d;
            const angle = c4.angle;
            const h_str = angle === 30 ? `${len}/2` : angle === 45 ? `${len}/\\sqrt{2}` : `${len}\\sqrt{3}/2`;
            return {
                difficulty: 'medium',
                question: `A ${len} m ladder leans against a wall making ${angle}° with the ground. How high up the wall does it reach?`,
                diagram: (color) => <LadderDiagram len={len} angle={angle} color={color} />,
                options: [`$${h_str}$ m`, `$${len}\\cos${angle}°$ m`, `$${len}\\tan${angle}°$ m`, `$${len}$ m`],
                correct: 0,
                explanation: `$\\sin ${angle}° = h/${len} \\Rightarrow h = ${len}\\sin ${angle}° = ${h_str}$ m.`
            };
        })(),
        // Q5 MEDIUM - two positions
        (() => {
            const move = c9.move;
            const d2 = move / 2;
            const hStr = `${d2}\\sqrt{3}`;
            return {
                difficulty: 'medium',
                question: `The angle of elevation of a tower changes from 30° to 60° when an observer moves ${move} m closer. Height of the tower:`,
                diagram: (color) => <TwoPosDiagram d1={d2 + move} d2={d2} move={move} angle1={30} angle2={60} color={color} />,
                options: [`$${d2}\\sqrt{3}$ m`, `$${move}\\sqrt{3}$ m`, `$${d2}$ m`, `$${move / 4}\\sqrt{3}$ m`],
                correct: 0,
                explanation: `Let closer dist = d. Then $h = d\\sqrt{3}$ and $h = (d+${move})/\\sqrt{3}$. From these: $3d = d+${move}$, so d = ${d2}. Height $= ${d2}\\sqrt{3}$ m.`
            };
        })(),
        // Q6 MEDIUM - observer height
        (() => {
            const { obs, d, angle } = c7;
            const hAbove = hExpr(d, angle);
            const totalStr = angle === 30 ? `${d}/\\sqrt{3} + ${obs}` : angle === 45 ? `${d + obs}` : `${d}\\sqrt{3} + ${obs}`;
            return {
                difficulty: 'medium',
                question: `A ${obs} m tall person standing ${d} m from a tower sees its top at ${angle}° elevation. Total height of tower from ground:`,
                diagram: (color) => (
                    <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                        <line x1="20" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <line x1="55" y1="165" x2="55" y2="138" stroke={color} strokeWidth="2" />
                        <circle cx="55" cy="132" r="6" fill={color} />
                        <text x="38" y="152" fontSize="9" fill={color} fontWeight="700">{obs}m</text>
                        <rect x="222" y="25" width="18" height="140" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                        <line x1="61" y1="132" x2="222" y2="28" stroke={color} strokeWidth="1.5" strokeDasharray="5,3" />
                        <line x1="61" y1="132" x2="222" y2="132" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
                        <path d="M 93,132 A 32,32 0 0,0 86,115" fill="none" stroke="#ef4444" strokeWidth="2" />
                        <text x="100" y="123" fontSize="11" fontWeight="800" fill="#ef4444">{angle}°</text>
                        <text x="140" y="158" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="800">{d}m</text>
                        <text x="250" y="92" fontSize="10" fill="#ef4444" fontWeight="800">H=?</text>
                    </svg>
                ),
                options: [`$${totalStr}$ m`, `$${hAbove}$ m`, `$${d}$ m`, `$${hAbove} - ${obs}$ m`],
                correct: 0,
                explanation: `Height above eye = $${d}\\tan${angle}° = ${hAbove}$ m. Total = $${hAbove} + ${obs}$ m.`
            };
        })(),
        // Q7 MEDIUM - kite string
        (() => {
            const h = pick([30, 40, 50, 60]);
            const angle = pick([30, 45, 60]);
            const strLen = strExpr(h, angle);
            return {
                difficulty: 'medium',
                question: `A kite flies at height ${h} m above ground. The string makes ${angle}° with horizontal. Length of string:`,
                diagram: () => (
                    <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
                        <line x1="20" y1="150" x2="280" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <circle cx="55" cy="142" r="7" fill="#059669" />
                        <text x="225" y="38" textAnchor="middle" fontSize="16">🪁</text>
                        <line x1="62" y1="140" x2="220" y2="45" stroke="#059669" strokeWidth="2.5" />
                        <line x1="62" y1="140" x2="220" y2="140" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
                        <path d="M 96,140 A 34,34 0 0,0 88,120" fill="none" stroke="#ef4444" strokeWidth="2" />
                        <text x="102" y="130" fontSize="11" fontWeight="900" fill="#ef4444">{angle}°</text>
                        <text x="218" y="95" fontSize="10" fill="#ef4444" fontWeight="700">{h}m ↕</text>
                        <text x="143" y="80" fontSize="10" fill="#059669" fontWeight="700" transform={`rotate(-25,143,80)`}>string=?</text>
                    </svg>
                ),
                options: [`$\\frac{${h}}{\\sin${angle}°} = ${strLen}$ m`, `$${h}\\sin${angle}°$ m`, `$${h}\\cos${angle}°$ m`, `$${h}\\tan${angle}°$ m`],
                correct: 0,
                explanation: `$\\sin${angle}° = \\frac{h}{\\text{string}} \\Rightarrow \\text{string} = \\frac{${h}}{\\sin${angle}°} = ${strLen}$ m.`
            };
        })(),
        // Q8 HARD - complementary angles
        (() => {
            const a = c8.a;
            const b = a * c8.b_mult;
            const h = Math.round(Math.sqrt(a * b));
            return {
                difficulty: 'hard',
                question: `From two points ${a} m and ${b} m from the base of a tower, the angles of elevation are complementary. Height of tower:`,
                diagram: (color) => <ComplementaryDiagram a={a} b={b} color={color} />,
                options: [`${h} m`, `${a + b} m`, `${(a + b) / 2} m`, `$\\sqrt{${a + b}}$ m`],
                correct: 0,
                explanation: `For complementary angles, $h = \\sqrt{a \\times b} = \\sqrt{${a} \\times ${b}} = \\sqrt{${a * b}} = ${h}$ m.`
            };
        })(),
        // Q9 HARD - jet speed
        (() => {
            const H = pick([1500, 2000, 3000]);
            const t = pick([10, 15, 20]);
            const d1 = Math.round(H / Math.sqrt(3));
            const d2 = Math.round(H * Math.sqrt(3));
            const dist = d2 - d1;
            const speed = Math.round(dist / t);
            return {
                difficulty: 'hard',
                question: `A jet at altitude ${H} m: elevation changes from 60° to 30° in ${t} s. Speed of the jet:`,
                diagram: () => (
                    <svg viewBox="0 0 300 165" style={{ width: '100%', maxHeight: 150 }}>
                        <line x1="20" y1="145" x2="280" y2="145" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <line x1="20" y1="35" x2="280" y2="35" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                        <text x="40" y="32" fontSize="13">✈️</text>
                        <text x="185" y="32" fontSize="13">✈️</text>
                        <circle cx="148" cy="140" r="5" fill="#059669" />
                        <line x1="148" y1="138" x2="48" y2="37" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                        <line x1="148" y1="138" x2="192" y2="37" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
                        <text x="105" y="120" fontSize="10" fontWeight="700" fill="#3b82f6">60°</text>
                        <text x="158" y="122" fontSize="10" fontWeight="700" fill="#ef4444">30°</text>
                        <text x="255" y="90" fontSize="10" fill="#ef4444" fontWeight="700">{H}m</text>
                        <text x="115" y="27" textAnchor="middle" fontSize="9" fill="#64748b">← distance? →</text>
                    </svg>
                ),
                options: [`${speed} m/s`, `${Math.round(speed / 2)} m/s`, `${speed * 2} m/s`, `${Math.round(H / t)} m/s`],
                correct: 0,
                explanation: `At 60°: d₁ = H/√3 = ${d1} m. At 30°: d₂ = H√3 = ${d2} m. Distance = ${dist} m. Speed = ${dist}/${t} = ${speed} m/s.`
            };
        })(),
        // Q10 HARD - flagpole on building
        (() => {
            const bH = pick([15, 20, 25]);
            const d = bH; // angle 45 first
            const combH = Math.round(d * Math.sqrt(3));
            const flagH = combH - bH;
            return {
                difficulty: 'hard',
                question: `From ${d} m away, the angle of elevation to the top of a ${bH} m building is 45°. A flagpole sits on top. Elevation to tip of flag is 60°. Height of flagpole:`,
                diagram: (color) => (
                    <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                        <line x1="20" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <rect x="218" y={165 - bH * 3.5} width="18" height={bH * 3.5} fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                        <line x1="227" y1={165 - bH * 3.5} x2="227" y2={165 - bH * 3.5 - flagH * 3.5} stroke="#ef4444" strokeWidth="3" />
                        <line x1="227" y1={165 - bH * 3.5} x2="227" y2={165 - bH * 3.5 - flagH * 5} stroke="#ef4444" strokeWidth="3" />
                        <circle cx="55" cy="158" r="7" fill={color} />
                        <line x1="62" y1="155" x2="218" y2={165 - bH * 3.5} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                        <line x1="62" y1="155" x2="224" y2={165 - bH * 3.5 - flagH * 5} stroke={color} strokeWidth="1.5" strokeDasharray="5,3" />
                        <text x="100" y="143" fontSize="10" fontWeight="700" fill="#3b82f6">45°</text>
                        <text x="85" y="130" fontSize="10" fontWeight="700" fill={color}>60°</text>
                        <text x="143" y="178" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="700">{d}m</text>
                    </svg>
                ),
                options: [`$${d}(\\sqrt{3}-1)$ m ≈ ${Math.round(flagH)} m`, `${bH} m`, `$${d}\\sqrt{3}$ m`, `${d} m`],
                correct: 0,
                explanation: `Building top at 45°: height = d = ${d} m (≠ given ${bH}). Tip at 60°: height = ${d}√3. Flagpole = ${d}√3 - ${d} = ${d}(√3-1) m.`
            };
        })()
    ];

    const assessment = [
        ...practice.slice(0, 4),
        (() => {
            const d = pick([40, 60, 80, 100]);
            const angle = pick([30, 45, 60]);
            return {
                difficulty: 'medium',
                question: `From a point ${d} m away, angle of elevation to a pole top is ${angle}°. From a point ${d / 2} m away, the angle of elevation is:`,
                diagram: (color) => <TwoPosDiagram d1={d} d2={d / 2} move={d / 2} angle1={angle} angle2={angle === 30 ? 45 : 60} color={color} />,
                options: [`${angle === 30 ? 45 : 60}° (larger)`, `${angle}° (same)`, `${angle === 60 ? 45 : 30}° (smaller)`, `Cannot determine without height`],
                correct: 0,
                explanation: `Moving closer increases the elevation angle. At ${d / 2} m (half the original distance), the height subtends a larger angle than ${angle}°.`
            };
        })(),
        ...practice.slice(5, 8),
        (() => {
            const h = pick([20, 30, 40, 50]);
            const multip = pick([2, 3, 4]);
            const d = h * multip;
            const angle = multip === 1 ? 45 : multip < 2 ? 60 : 30;
            return {
                difficulty: 'hard',
                question: `A vertical tower of height ${h} m stands on a horizontal plane. From a point ${d} m from its base, the elevation angle is approximately:`,
                diagram: (color) => <ElevDiagram d={d} angle={Math.round(Math.atan(h / d) * 180 / Math.PI)} color={color} showH={false} />,
                options: [`$\\tan^{-1}(${h}/${d})$`, `$\\tan^{-1}(${d}/${h})$`, `${Math.round(Math.atan(h / d) * 180 / Math.PI)}°`, `Both A and C`],
                correct: 3,
                explanation: `$\\tan\\theta = \\frac{h}{d} = \\frac{${h}}{${d}}$. So $\\theta = \\tan^{-1}(${h}/${d}) \\approx ${Math.round(Math.atan(h / d) * 180 / Math.PI)}°$. Both forms (A and C) are correct.`
            };
        })(),
        ...practice.slice(9)
    ];

    return mode === 'practice' ? practice : assessment;
}

// ─── SKILL 3: Angle of Depression ─────────────────────────────────────────
export function generateDepressionQuestions(mode) {
    const hs = [40, 50, 60, 75, 80, 100, 120, 150, 200];
    const practice = [
        (() => {
            const h = pick([40, 50, 60, 75, 100]);
            const angle = pick([30, 45, 60]);
            const dStr = dExpr(h, angle);
            return {
                difficulty: 'easy',
                question: `From the top of a ${h} m high tower, the angle of depression of a point on the ground is ${angle}°. Distance of the point from the base:`,
                diagram: (color) => <DeprDiagram h={h} angle={angle} color={color} />,
                options: [`$${dStr}$ m`, `$${hExpr(h, angle)}$ m`, `$${h}$ m`, `$${h * 2}$ m`],
                correct: 0,
                explanation: `Angle of depression = angle of elevation from ground. $\\tan${angle}° = ${h}/d \\Rightarrow d = ${h}/\\tan${angle}° = ${dStr}$ m.`
            };
        })(),
        (() => {
            const h = pick([20, 30, 40, 50]);
            const dStr = `${h}`;
            return {
                difficulty: 'easy',
                question: `From a window ${h} m above the street, the angle of depression of a parked car is 45°. Distance of car from directly below the window:`,
                diagram: (color) => <DeprDiagram h={h} angle={45} color={color} />,
                options: [`${h} m`, `${h * 2} m`, `${h / 2} m`, `$${h}\\sqrt{2}$ m`],
                correct: 0,
                explanation: `At 45°, tan 45° = 1, so distance = height. Distance = ${h} m.`
            };
        })(),
        (() => {
            const h = pick([60, 80, 100]);
            const angle1 = 30, angle2 = 45;
            const d1 = dExpr(h, angle1);
            const d2 = `${h}`;
            const sepExpr = `${h}(\\sqrt{3}-1)`;
            return {
                difficulty: 'medium',
                question: `From the top of a ${h} m cliff, two boats on the SAME side have depression angles of 45° and 30°. Distance between the boats:`,
                diagram: (color) => (
                    <svg viewBox="0 0 320 195" style={{ width: '100%', maxHeight: 180 }}>
                        <line x1="10" y1="175" x2="310" y2="175" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <rect x="40" y="35" width="20" height="140" fill="#ede9fe" stroke={color} strokeWidth="1.5" rx="2" />
                        <circle cx="50" cy="30" r="6" fill={color} />
                        <line x1="60" y1="35" x2="300" y2="35" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
                        <text x="145" y="175" textAnchor="middle" fontSize="12">🚢</text>
                        <text x="245" y="175" textAnchor="middle" fontSize="12">🚢</text>
                        <line x1="58" y1="35" x2="143" y2="172" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                        <line x1="58" y1="35" x2="243" y2="172" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
                        <text x="92" y="52" fontSize="10" fontWeight="800" fill="#3b82f6">45°</text>
                        <text x="105" y="44" fontSize="10" fontWeight="800" fill="#ef4444">30°</text>
                        <text x="36" y="108" fontSize="9" fill={color} fontWeight="800" transform={`rotate(-90,36,108)`}>{h}m</text>
                        <text x="193" y="188" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="700">separation = ?</text>
                    </svg>
                ),
                options: [`$${sepExpr}$ m`, `$${h}\\sqrt{3}$ m`, `$${h}$ m`, `$${h}(\\sqrt{3}+1)$ m`],
                correct: 0,
                explanation: `d₁ = ${h}/tan45° = ${h} m. d₂ = ${h}/tan30° = ${h}√3 m. Separation = d₂ - d₁ = ${h}(√3 - 1) m.`
            };
        })(),
        (() => {
            const h = pick([75, 100, 120, 150]);
            const angle1 = 30, angle2 = 60;
            const d = Math.round(h / Math.sqrt(3));
            const poleH = Math.round(h - d / Math.sqrt(3));
            return {
                difficulty: 'medium',
                question: `From the top of a ${h} m tower, depression angles of the top and bottom of a pole are 30° and 60°. Height of pole:`,
                diagram: (color) => (
                    <svg viewBox="0 0 310 200" style={{ width: '100%', maxHeight: 185 }}>
                        <line x1="10" y1="178" x2="300" y2="178" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <rect x="35" y="22" width="20" height="156" fill="#ede9fe" stroke={color} strokeWidth="1.5" rx="2" />
                        <circle cx="45" cy="18" r="6" fill={color} />
                        <line x1="55" y1="22" x2="290" y2="22" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
                        <rect x="220" y="80" width="14" height="98" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                        <line x1="53" y1="22" x2="221" y2="80" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
                        <line x1="53" y1="22" x2="221" y2="176" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,3" />
                        <text x="97" y="38" fontSize="10" fontWeight="800" fill="#3b82f6">30°</text>
                        <text x="80" y="30" fontSize="10" fontWeight="800" fill="#8b5cf6">60°</text>
                        <text x="32" y="100" fontSize="9" fill={color} fontWeight="800" transform={`rotate(-90,32,100)`}>{h}m</text>
                        <text x="240" y="132" fontSize="9" fill="#3b82f6" fontWeight="700">pole=?</text>
                    </svg>
                ),
                options: [`$${h} - ${d}\\cdot\\frac{1}{\\sqrt{3}}\\cdot\\sqrt{3}$ m = ${h - d} m`, `${Math.round(h / 2)} m`, `$${h}/\\sqrt{3}$ m`, `${d} m`],
                correct: 0,
                explanation: `d = ${h}/tan60° = ${d} m. Height of pole top from ground = ${h} - d×tan30° = ${h} - ${d}/√3 = ${h} - ${Math.round(d / Math.sqrt(3))} ≈ ${h - Math.round(d / Math.sqrt(3))} m.`
            };
        })(),
        (() => {
            const h = pick([60, 80, 100, 120]);
            const angle1 = 30, angle2 = 45;
            return {
                difficulty: 'medium',
                question: `A balloon at ${h} m height has depression angles of 45° and 30° to two cars on opposite sides. Distance between the cars:`,
                diagram: (color) => <TwoShipsDiagram h={h} angle1={45} angle2={30} color={color} />,
                options: [`$${h}(1+\\sqrt{3})$ m`, `$${h}\\sqrt{3}$ m`, `$${h * 2}$ m`, `$${h}(\\sqrt{3}-1)$ m`],
                correct: 0,
                explanation: `d₁ = ${h}/tan45° = ${h} m (at 45°). d₂ = ${h}/tan30° = ${h}√3 m (at 30°). Opposite sides: total = ${h} + ${h}√3 = ${h}(1+√3) m.`
            };
        })(),
        (() => {
            const h = pick([100, 150, 200]);
            const t = pick([10, 15, 20, 30]);
            const d1 = h;
            const d2 = Math.round(h * Math.sqrt(3));
            const dist = d2 - d1;
            const speed = Math.round(dist / t);
            return {
                difficulty: 'hard',
                question: `A car approaches a ${h} m cliff. The angle of depression changes from 30° to 45° in ${t} seconds. Speed of the car:`,
                diagram: (color) => <DeprDiagram h={h} angle={45} color={color} showD={false} />,
                options: [`${speed} m/s`, `${Math.round(h / t)} m/s`, `${speed * 2} m/s`, `${Math.round(dist / (t * 2))} m/s`],
                correct: 0,
                explanation: `At 30°: d = ${h}√3 = ${d2} m. At 45°: d = ${h} m. Car moved = ${d2} - ${h} = ${dist} m in ${t}s. Speed = ${speed} m/s.`
            };
        })(),
        (() => {
            const h = pick([40, 50, 60]);
            const h2 = pick([20, 25, 30]);
            const d = pick([30, 40, 50]);
            return {
                difficulty: 'hard',
                question: `From the top of a ${h} m building, angle of depression to the top of a ${h2} m pole (${d} m away) is:`,
                diagram: (color) => (
                    <svg viewBox="0 0 300 185" style={{ width: '100%', maxHeight: 170 }}>
                        <line x1="20" y1="165" x2="280" y2="165" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <rect x="40" y={165 - h * 2.5} width="20" height={h * 2.5} fill="#ede9fe" stroke={color} strokeWidth="1.5" rx="2" />
                        <rect x="200" y={165 - h2 * 2.5} width="14" height={h2 * 2.5} fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                        <circle cx="50" cy={165 - h * 2.5 - 5} r="5" fill={color} />
                        <line x1="60" y1={165 - h * 2.5} x2="280" y2={165 - h * 2.5} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
                        <line x1="58" y1={165 - h * 2.5} x2="200" y2={165 - h2 * 2.5} stroke={color} strokeWidth="1.5" strokeDasharray="5,3" />
                        <text x="122" y="155" textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="700">{d}m</text>
                        <text x="35" y="110" fontSize="9" fill={color} fontWeight="700">{h}m</text>
                        <text x="222" y="140" fontSize="9" fill="#3b82f6" fontWeight="700">{h2}m</text>
                    </svg>
                ),
                options: [`$\\tan^{-1}\\left(\\frac{${h - h2}}{${d}}\\right)$`, `$\\tan^{-1}\\left(\\frac{${h}}{${d}}\\right)$`, `$\\tan^{-1}\\left(\\frac{${h2}}{${d}}\\right)$`, `45°`],
                correct: 0,
                explanation: `Height difference = ${h} - ${h2} = ${h - h2} m. Horizontal distance = ${d} m. $\\tan\\theta = \\frac{${h - h2}}{${d}} \\Rightarrow \\theta = \\tan^{-1}(${h - h2}/${d})$.`
            };
        })(),
        (() => {
            const h = pick([80, 100, 120]);
            const angle1 = 30, angle2 = 60;
            const d1 = Math.round(h * Math.sqrt(3));
            const d2 = Math.round(h / Math.sqrt(3));
            return {
                difficulty: 'hard',
                question: `From the top of a ${h} m cliff, ships on OPPOSITE sides have depression angles 30° and 60°. Total distance between ships:`,
                diagram: (color) => <TwoShipsDiagram h={h} angle1={60} angle2={30} color={color} />,
                options: [`$${h}(\\sqrt{3} + \\frac{1}{\\sqrt{3}})$ m`, `$${h}\\sqrt{3}$ m`, `$${h * 2}$ m`, `$${h}(\\sqrt{3}-\\frac{1}{\\sqrt{3}})$ m`],
                correct: 0,
                explanation: `d₁ = ${h}/tan60° = ${d2} m (at 60°). d₂ = ${h}/tan30° = ${d1} m (at 30°). Opposite sides: total = ${d2} + ${d1} = ${h}(1/√3 + √3) = ${h}(√3 + 1/√3) m.`
            };
        })(),
        (() => {
            const h = pick([50, 60, 75]);
            return {
                difficulty: 'hard',
                question: `A man on a ${h} m cliff observes a boat approaching. The angle of depression changes from 30° to 60°. Find the distance the boat covered.`,
                diagram: (color) => <DeprDiagram h={h} angle={30} color={color} />,
                options: [`$${h} \\cdot \\frac{2}{\\sqrt{3}}$ m`, `$${h}(\\sqrt{3}-\\frac{1}{\\sqrt{3}})$ m`, `$${h}(1-\\frac{1}{\\sqrt{3}})$ m`, `$${h}\\sqrt{3}$ m`],
                correct: 1,
                explanation: `Initial dist = ${h}√3. Final dist = ${h}/√3. Covered = ${h}√3 - ${h}/√3 = ${h}(√3 - 1/√3) m.`
            };
        })(),
        (() => {
            const h = pick([40, 50, 60]);
            return {
                difficulty: 'hard',
                question: `From the top of a ${h} m tower, the angle of depression of a point P is 30°. If P moves 20 m closer, what is the new angle of depression?`,
                diagram: (color) => <DeprDiagram h={h} angle={30} color={color} />,
                options: [`$\\tan^{-1}\\left(\\frac{${h}}{${Math.round(h * Math.sqrt(3))} - 20}\\right)$`, `60°`, `45°`, `$\\tan^{-1}(\\frac{${h}}{20})$`],
                correct: 0,
                explanation: `Initial d = ${h}√3 ≈ ${Math.round(h * Math.sqrt(3))} m. New d = ${Math.round(h * Math.sqrt(3))} - 20 m. New angle = tan⁻¹(${h}/(${Math.round(h * Math.sqrt(3))}-20)).`
            };
        })()
    ];

    const assessment = [
        ...practice.slice(0, 3),
        (() => {
            const h = pick([60, 80, 100]);
            const angle1 = 45, angle2 = 30;
            return {
                difficulty: 'medium',
                question: `From a lighthouse ${h} m tall, two ships on SAME side have depression angles 45° and 30°. Which ship is closer and how far apart are they?`,
                diagram: (color) => <DeprDiagram h={h} angle={45} color={color} />,
                options: [`Ship at 45° is closer; separation = ${h}(√3 - 1) m`, `Ship at 30° is closer; separation = ${h}m`, `Both are same`, `Ship at 45° is farther`],
                correct: 0,
                explanation: `At 45°: d = ${h} m. At 30°: d = ${h}√3 m. Ship at 45° is closer. Separation = ${h}√3 - ${h} = ${h}(√3 - 1) m.`
            };
        })(),
        ...practice.slice(4, 7),
        (() => {
            const h = pick([100, 150, 200]);
            const angle1 = 30, angle2 = 60;
            const d1 = Math.round(h * Math.sqrt(3));
            const d2 = Math.round(h / Math.sqrt(3));
            return {
                difficulty: 'hard',
                question: `A ${h} m tall cliff has depression angles to two boats as 30° and 60° on opposite sides. Distance between boats:`,
                diagram: (color) => <TwoShipsDiagram h={h} angle1={60} angle2={30} color={color} />,
                options: [`$\\frac{4${h}}{\\sqrt{3}}$ m = $\\frac{4 \\times ${h}}{${Math.round(Math.sqrt(3) * 10) / 10}}$ m`, `$${h * 2}$ m`, `$${h}(\\sqrt{3}+1)$ m`, `$${d1 + d2}$ m (exact)`],
                correct: 3,
                explanation: `d₁ = ${d2} m (at 60°) and d₂ = ${d1} m (at 30°). Total = ${d1 + d2} m.`
            };
        })(),
        ...practice.slice(8, 10)
    ];

    return mode === 'practice' ? practice : assessment;
}

// ─── SKILL 4: Shadow & Sun ────────────────────────────────────────────────
export function generateShadowQuestions(mode) {
    const practice = [
        (() => {
            const h = pick([6, 8, 10, 12]);
            const mult = pick([1, 2, 3]);
            const shadowLen = mult === 1 ? h : mult === 2 ? `${h}\\sqrt{3}` : `${h}/\\sqrt{3}`;
            const angle = mult === 1 ? 45 : mult === 2 ? 30 : 60;
            const shadowNum = mult === 1 ? h : mult === 2 ? Math.round(h * 1.73) : Math.round(h * 0.577);
            return {
                difficulty: 'easy',
                question: `A pole of height ${h} m casts a shadow of $${shadowLen}$ m. The sun's altitude is:`,
                diagram: () => <ShadowDiagram h={h} angle={angle} shadowLabel={`${shadowLen} m`} />,
                options: [`${angle}°`, `${angle === 30 ? 60 : 30}°`, `45°`, `90°`],
                correct: 0,
                explanation: `$\\tan\\alpha = \\frac{${h}}{${shadowLen}} = ${tanStr(angle)} \\Rightarrow \\alpha = ${angle}°$.`
            };
        })(),
        (() => {
            const h = pick([10, 12, 15, 20]);
            return {
                difficulty: 'easy',
                question: `At what sun altitude does a ${h} m pole cast a shadow of ${h} m?`,
                diagram: () => <ShadowDiagram h={h} angle={45} shadowLabel={`${h} m`} />,
                options: ['45°', '30°', '60°', '90°'],
                correct: 0,
                explanation: `$\\tan\\alpha = ${h}/${h} = 1 \\Rightarrow \\alpha = 45°$. When shadow = height, angle = 45°.`
            };
        })(),
        (() => {
            const h = pick([12, 15, 18, 20]);
            const shadow1 = Math.round(h * Math.sqrt(3));
            const shadow2 = Math.round(h / Math.sqrt(3));
            return {
                difficulty: 'easy',
                question: `A ${h} m pole's shadow length at 30° sun altitude is _____ m and at 60° altitude is _____ m:`,
                diagram: () => <ShadowDiagram h={h} angle={30} shadowLabel="?" />,
                options: [`${shadow1} m ; ${shadow2} m`, `${shadow2} m ; ${shadow1} m`, `${h} m ; ${h} m`, `${h * 2} m ; ${h / 2} m`],
                correct: 0,
                explanation: `Shadow = h/tanα. At 30°: ${h}/tan30° = ${h}√3 ≈ ${shadow1} m. At 60°: ${h}/tan60° = ${h}/√3 ≈ ${shadow2} m.`
            };
        })(),
        (() => {
            const manH = pick([1.6, 1.7, 1.8]);
            const manS = pick([2.4, 3.0, 3.6]);
            const treeS = pick([12, 16, 20, 24]);
            const treeH = Math.round((manH / manS) * treeS * 10) / 10;
            return {
                difficulty: 'medium',
                question: `A ${manH} m tall man has a shadow of ${manS} m. At the same time, a tree's shadow is ${treeS} m. Height of tree:`,
                diagram: () => (
                    <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
                        <line x1="20" y1="150" x2="280" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                        <circle cx="28" cy="30" r="12" fill="#fbbf24" opacity="0.85" />
                        <text x="28" y="35" textAnchor="middle" fontSize="11">☀️</text>
                        <line x1="80" y1="150" x2="80" y2="115" stroke="#059669" strokeWidth="2.5" />
                        <circle cx="80" cy="111" r="4" fill="#059669" />
                        <text x="70" y="135" fontSize="8" fill="#059669">man={manH}m</text>
                        <line x1="80" y1="150" x2="56" y2="150" stroke="#64748b" strokeWidth="3" />
                        <text x="68" y="164" textAnchor="middle" fontSize="8" fill="#64748b">{manS}m</text>
                        <line x1="200" y1="150" x2="200" y2="45" stroke="#1e293b" strokeWidth="3" />
                        <text x="215" y="100" fontSize="9" fill="#1e293b" fontWeight="700">h=?</text>
                        <line x1="200" y1="150" x2="136" y2="150" stroke="#64748b" strokeWidth="3" />
                        <text x="168" y="164" textAnchor="middle" fontSize="8" fill="#64748b">{treeS}m</text>
                    </svg>
                ),
                options: [`${treeH} m`, `${treeS} m`, `${manH * treeS} m`, `${Math.round(treeS / manH)} m`],
                correct: 0,
                explanation: `Same sun angle → similar triangles. $\\frac{h_{tree}}{s_{tree}} = \\frac{h_{man}}{s_{man}} \\Rightarrow h_{tree} = \\frac{${manH}}{${manS}} \\times ${treeS} = ${treeH}$ m.`
            };
        })(),
        (() => {
            const h = pick([10, 12, 15, 20]);
            const shadowA = Math.round(h * Math.sqrt(3));
            const shadowB = Math.round(h / Math.sqrt(3));
            return {
                difficulty: 'medium',
                question: `The shadow of a ${h} m pole decreases from ${shadowA} m to ${shadowB} m. The sun's altitude changed from:`,
                diagram: () => <ShadowDiagram h={h} angle={60} shadowLabel={`${shadowB} m`} />,
                options: [`30° to 60°`, `60° to 30°`, `45° to 60°`, `30° to 45°`],
                correct: 0,
                explanation: `Shadow=${shadowA}m → α: tan α = ${h}/${shadowA} = 1/√3 → α=30°. Shadow=${shadowB}m → α: tan α = ${h}/${shadowB} = √3 → α=60°. Altitude went from 30° to 60°.`
            };
        })(),
        (() => {
            const h = pick([10, 12, 15, 20]);
            const shadow = Math.round(h * Math.sqrt(3));
            return {
                difficulty: 'medium',
                question: `A ${h} m flagpole is broken by the wind. The broken part makes 30° with the ground, top touches ground at ${shadow} m from base. Original height of flagpole:`,
                diagram: () => (
                    <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
                        <line x1="20" y1="148" x2="280" y2="148" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="170" y1="148" x2="170" y2="55" stroke="#1e293b" strokeWidth="2.5" />
                        <line x1="170" y1="55" x2="60" y2="148" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,4" />
                        <text x="112" y="120" fontSize="8" fill="#ef4444" fontWeight="700" transform="rotate(-41,112,120)">broken part</text>
                        <path d="M 100,148 A 30,30 0 0,0 92,126" fill="none" stroke="#ef4444" strokeWidth="2" />
                        <text x="96" y="140" fontSize="10" fontWeight="800" fill="#ef4444">30°</text>
                        <text x="115" y="160" textAnchor="middle" fontSize="9" fill="#0891b2" fontWeight="700">{shadow}m</text>
                        <text x="182" y="100" fontSize="9" fill="#1e293b" fontWeight="700">stump</text>
                    </svg>
                ),
                options: [`${h + shadow} m (approx)`, `${shadow} m`, `${h} m`, `${h * 2} m`],
                correct: 0,
                explanation: `Stump height = ${shadow} × tan30° = ${shadow}/√3 ≈ ${Math.round(shadow / Math.sqrt(3))} m. Fallen part = ${shadow}/cos30° ≈ ${Math.round(shadow * 2 / Math.sqrt(3))} m. Total ≈ ${h + shadow} m.`
            };
        })(),
        (() => {
            const h = pick([15, 20, 25]);
            const shadowLen = Math.round(h * Math.sqrt(3));
            return {
                difficulty: 'hard',
                question: `A ${h} m pole and its shadow of ${shadowLen} m are at 30° sun altitude. If sun altitude increases to 60°, the shadow becomes:`,
                diagram: () => <ShadowDiagram h={h} angle={60} shadowLabel="?" />,
                options: [`$\\frac{${h}}{\\sqrt{3}}$ m`, `${h} m`, `${shadowLen} m`, `$${h}\\sqrt{3}$ m`],
                correct: 0,
                explanation: `New shadow = h/tan60° = ${h}/√3 m. (At 60°, shadow shrinks from ${shadowLen} m to ${h}/√3 m.)`
            };
        })(),
        (() => {
            const h1 = pick([12, 16, 20]);
            const h2 = Math.round(h1 * 1.5);
            const d = pick([30, 40, 50]);
            return {
                difficulty: 'hard',
                question: `Two poles of heights ${h1} m and ${h2} m stand ${d} m apart. At the same time, their shadows are in opposite directions and tips coincide. Sun's altitude:`,
                diagram: () => (
                    <svg viewBox="0 0 300 170" style={{ width: '100%', maxHeight: 155 }}>
                        <line x1="20" y1="148" x2="280" y2="148" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="80" y1="148" x2="80" y2={148 - h1 * 4} stroke="#059669" strokeWidth="3" />
                        <line x1="200" y1="148" x2="200" y2={148 - h2 * 3} stroke="#1e293b" strokeWidth="3" />
                        <line x1="80" y1="148" x2="150" y2="148" stroke="#64748b" strokeWidth="3" />
                        <line x1="200" y1="148" x2="150" y2="148" stroke="#94a3b8" strokeWidth="3" />
                        <text x="115" y="163" textAnchor="middle" fontSize="8" fill="#94a3b8">shadows meet</text>
                        <text x="140" y="155" textAnchor="middle" fontSize="9" fill="#0891b2" fontWeight="700">{d}m</text>
                    </svg>
                ),
                options: [`$\\tan^{-1}\\left(\\frac{${h1}+${h2}}{${d}}\\right)$`, `$\\tan^{-1}(\\frac{${h1}}{${d}})$`, `45°`, `$\\tan^{-1}(\\frac{${h2}}{${d}})$`],
                correct: 0,
                explanation: `If shadow tips meet, total = ${d} m split proportionally. Let sun angle = α. ${h1}/s₁ = ${h2}/s₂ = tanα and s₁+s₂=${d}. Solving: tanα = (${h1}+${h2})/${d}.`
            };
        })(),
        (() => {
            const h = pick([20, 25, 30]);
            const deckH = pick([5, 8, 10]);
            return {
                difficulty: 'hard',
                question: `A ${h} m flagpole stands on a ${deckH} m tall observation deck. At sun altitude 45°, total shadow length (from base of deck to tip) is:`,
                diagram: () => (
                    <svg viewBox="0 0 300 175" style={{ width: '100%', maxHeight: 160 }}>
                        <line x1="20" y1="148" x2="280" y2="148" stroke="#94a3b8" strokeWidth="2" />
                        <rect x="155" y={148 - deckH * 5} width="40" height={deckH * 5} fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="175" y1={148 - deckH * 5} x2="175" y2={148 - deckH * 5 - h * 2.5} stroke="#1e293b" strokeWidth="3" />
                        <line x1="175" y1={148 - deckH * 5 - h * 2.5} x2={175 - (h + deckH) * 2.5} y2="148" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
                        <circle cx="28" cy="25" r="12" fill="#fbbf24" opacity="0.9" />
                        <text x="28" y="30" textAnchor="middle" fontSize="11">☀️</text>
                        <text x="175" y="163" textAnchor="middle" fontSize="9" fill="#0891b2" fontWeight="700">shadow=?</text>
                    </svg>
                ),
                options: [`${h + deckH} m`, `${h} m`, `${deckH} m`, `${h * 2} m`],
                correct: 0,
                explanation: `At 45°, shadow = effective height = ${h} + ${deckH} = ${h + deckH} m (since tanα = 1 for 45°).`
            };
        })(),
        (() => {
            const h = pick([6, 8, 10, 12]);
            const shadow = pick([6, 8, 10]);
            const tanVal = Math.round((h / shadow) * 100) / 100;
            return {
                difficulty: 'hard',
                question: `A ${h} m pole has a shadow of ${shadow} m. At the same time, a building has a shadow of ${shadow * 4} m. Height of the building?`,
                diagram: () => <ShadowDiagram h={h} angle={Math.round(Math.atan(h / shadow) * 180 / Math.PI)} shadowLabel={`${shadow}m`} />,
                options: [`${h * 4} m`, `${h * 2} m`, `${shadow * 4} m`, `${h + shadow * 4} m`],
                correct: 0,
                explanation: `Same sun angle: $\\frac{h_{building}}{${shadow * 4}} = \\frac{${h}}{${shadow}} \\Rightarrow h_{building} = ${h * 4}$ m.`
            };
        })()
    ];

    const assessment = [
        ...practice.slice(0, 5),
        ...practice.slice(6, 10).map(q => ({ ...q, difficulty: 'hard' })),
        (() => {
            const h = pick([10, 15, 20]);
            return {
                difficulty: 'hard',
                question: `A ${h} m pole casts a shadow. When the sun's altitude is 30°, the shadow is how many times the pole's height?`,
                diagram: () => <ShadowDiagram h={h} angle={30} shadowLabel={`${h}√3 m`} />,
                options: [`√3 times`, `2 times`, `1/√3 times`, `Same as height`],
                correct: 0,
                explanation: `Shadow = h/tan30° = h√3. So shadow = √3 × height.`
            };
        })(),
        (() => {
            const h = pick([10, 15, 20]);
            return {
                difficulty: 'hard',
                question: `Sun altitude changes from 45° to 30°. A ${h} m pole's shadow change is:`,
                diagram: () => <ShadowDiagram h={h} angle={30} shadowLabel="?" />,
                options: [`${h}(\\sqrt{3}-1)$ m increase`, `${h}(\\sqrt{3}-1)$ m decrease`, `Same`, `Cannot determine`],
                correct: 0,
                explanation: `At 45°: shadow = ${h} m. At 30°: shadow = ${h}√3 m. Change = ${h}√3 - ${h} = ${h}(√3-1) m INCREASE.`
            };
        })(),
        (() => {
            const h = pick([5, 6, 8, 10]);
            return {
                difficulty: 'hard',
                question: `The shadow of a ${h} m pole is ${h}√3 m. If the sun rises to 60°, the shadow:`,
                diagram: () => <ShadowDiagram h={h} angle={60} shadowLabel={`${h}/√3 m`} />,
                options: [`Becomes ${h}/√3 m`, `Becomes ${h} m`, `Stays ${h}√3 m`, `Becomes 0`],
                correct: 0,
                explanation: `At 30°: shadow = ${h}√3 m (initial). At 60°: shadow = ${h}/tan60° = ${h}/√3 m.`
            };
        })()
    ];

    return mode === 'practice' ? practice : assessment;
}

// ─── SKILLS 4, 5, 6 — Heights & Distances / Multi-Step / Buildings  ───────
// (delegating to elevation/depression generators for now with skill-specific framing)
export function generateHeightsDistancesQuestions(mode) {
    return generateElevationQuestions(mode);
}
export function generateMultiStepQuestions(mode) {
    return generateDepressionQuestions(mode);
}
export function generateBuildingsQuestions(mode) {
    return generateShadowQuestions(mode);
}
