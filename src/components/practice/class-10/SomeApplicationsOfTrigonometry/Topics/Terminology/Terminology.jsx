import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../SurfaceAreasAndVolumes/surface-volumes.css';
import '../../../SurfaceAreasAndVolumes/hide-footer.css';
import MathRenderer from '../../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';

const TERMINOLOGY_QUIZ_NODE_ID = 'a4101014-0010-0000-0000-000000000000';

/* ── Inline SVG Diagram Components ─────────────────────────────────── */
function LineOfSightDiagram() {
    return (
        <svg viewBox="0 0 320 200" style={{ width: '100%', maxHeight: 180 }}>
            <defs><marker id="ah1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill="#0891b2" /></marker></defs>
            {/* Ground */}
            <line x1="20" y1="170" x2="300" y2="170" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            <text x="160" y="190" textAnchor="middle" fontSize="11" fill="#64748b">Ground / Horizontal</text>
            {/* Observer */}
            <circle cx="60" cy="140" r="8" fill="#0891b2" />
            <line x1="60" y1="148" x2="60" y2="170" stroke="#0891b2" strokeWidth="2" />
            <text x="60" y="135" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0891b2">Observer</text>
            {/* Tower */}
            <rect x="250" y="50" width="20" height="120" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
            <text x="260" y="45" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed">Object</text>
            {/* Line of Sight */}
            <line x1="68" y1="140" x2="250" y2="55" stroke="#0891b2" strokeWidth="2" markerEnd="url(#ah1)" />
            <text x="145" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0891b2" transform="rotate(-25, 145, 85)">Line of Sight</text>
            {/* Horizontal from eye */}
            <line x1="68" y1="140" x2="250" y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="160" y="155" textAnchor="middle" fontSize="9" fill="#f59e0b">Horizontal</text>
            {/* Angle arc */}
            <path d="M 110,140 A 42,42 0 0,0 100,122" fill="none" stroke="#ef4444" strokeWidth="2" />
            <text x="118" y="130" fontSize="11" fontWeight="800" fill="#ef4444">θ</text>
        </svg>
    );
}

function ElevationDiagram() {
    return (
        <svg viewBox="0 0 320 200" style={{ width: '100%', maxHeight: 180 }}>
            <defs><marker id="ah2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill="#059669" /></marker></defs>
            <line x1="20" y1="170" x2="300" y2="170" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Person */}
            <circle cx="60" cy="140" r="8" fill="#059669" />
            <line x1="60" y1="148" x2="60" y2="170" stroke="#059669" strokeWidth="2" />
            {/* Building */}
            <rect x="240" y="40" width="30" height="130" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
            <text x="255" y="35" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b82f6">h = ?</text>
            {/* Line of sight UP */}
            <line x1="68" y1="140" x2="240" y2="45" stroke="#059669" strokeWidth="2" markerEnd="url(#ah2)" />
            {/* Horizontal */}
            <line x1="68" y1="140" x2="240" y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Angle arc */}
            <path d="M 115,140 A 47,47 0 0,0 103,118" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="120" y="128" fontSize="12" fontWeight="900" fill="#ef4444">α</text>
            {/* Labels */}
            <text x="60" y="185" textAnchor="middle" fontSize="9" fill="#64748b">Observer</text>
            <text x="150" y="165" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">d (distance)</text>
            {/* Arrow indicating UP */}
            <text x="140" y="75" fontSize="10" fill="#059669" fontWeight="700">↑ Looking UP</text>
        </svg>
    );
}

function DepressionDiagram() {
    return (
        <svg viewBox="0 0 320 210" style={{ width: '100%', maxHeight: 190 }}>
            <defs><marker id="ah3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill="#7c3aed" /></marker></defs>
            <line x1="20" y1="190" x2="300" y2="190" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Building with observer on top */}
            <rect x="40" y="40" width="30" height="150" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" rx="2" />
            <circle cx="55" cy="38" r="7" fill="#7c3aed" />
            <text x="55" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7c3aed">Observer</text>
            {/* Horizontal from top */}
            <line x1="70" y1="42" x2="280" y2="42" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="180" y="36" textAnchor="middle" fontSize="9" fill="#f59e0b">Horizontal</text>
            {/* Object on ground */}
            <circle cx="260" cy="185" r="6" fill="#ec4899" />
            <text x="260" y="175" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ec4899">Object</text>
            {/* Line of sight DOWN */}
            <line x1="65" y1="42" x2="255" y2="182" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#ah3)" />
            {/* Depression angle arc */}
            <path d="M 120,42 A 50,50 0 0,1 105,70" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="125" y="62" fontSize="12" fontWeight="900" fill="#ef4444">β</text>
            {/* Arrow DOWN */}
            <text x="180" y="130" fontSize="10" fill="#7c3aed" fontWeight="700" transform="rotate(36, 180, 130)">↓ Looking DOWN</text>
            {/* Height label */}
            <text x="25" y="120" fontSize="9" fill="#64748b" transform="rotate(-90, 25, 120)">Height h</text>
        </svg>
    );
}

function RightTriangleDiagram() {
    return (
        <svg viewBox="0 0 320 200" style={{ width: '100%', maxHeight: 180 }}>
            {/* Triangle */}
            <polygon points="60,170 260,170 260,50" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
            {/* Right angle mark */}
            <polyline points="245,170 245,155 260,155" fill="none" stroke="#059669" strokeWidth="1.5" />
            {/* Labels */}
            <text x="160" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0891b2">Adjacent (d)</text>
            <text x="278" y="115" fontSize="12" fontWeight="700" fill="#ef4444">Opposite (h)</text>
            <text x="140" y="100" fontSize="12" fontWeight="700" fill="#7c3aed" transform="rotate(-28, 140, 100)">Hypotenuse</text>
            {/* Angle */}
            <path d="M 100,170 A 40,40 0 0,0 90,148" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="105" y="158" fontSize="13" fontWeight="900" fill="#f59e0b">θ</text>
            {/* Formulas */}
            <text x="60" y="25" fontSize="10" fontWeight="600" fill="#475569">tan θ = h/d</text>
            <text x="160" y="25" fontSize="10" fontWeight="600" fill="#475569">sin θ = h/hyp</text>
            <text x="250" y="25" fontSize="10" fontWeight="600" fill="#475569">cos θ = d/hyp</text>
        </svg>
    );
}

function ShadowDiagram() {
    return (
        <svg viewBox="0 0 320 200" style={{ width: '100%', maxHeight: 180 }}>
            <line x1="20" y1="170" x2="300" y2="170" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Pole */}
            <line x1="180" y1="170" x2="180" y2="60" stroke="#1e293b" strokeWidth="3" />
            <circle cx="180" cy="57" r="4" fill="#f59e0b" />
            <text x="190" y="115" fontSize="10" fontWeight="700" fill="#1e293b">h</text>
            {/* Shadow */}
            <line x1="180" y1="170" x2="80" y2="170" stroke="#64748b" strokeWidth="3" />
            <text x="130" y="185" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">Shadow (s)</text>
            {/* Sun rays */}
            <line x1="80" y1="170" x2="180" y2="60" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
            {/* Sun */}
            <circle cx="30" cy="30" r="15" fill="#fbbf24" opacity="0.8" />
            <text x="30" y="34" textAnchor="middle" fontSize="10">☀️</text>
            {/* Angle */}
            <path d="M 120,170 A 40,40 0 0,0 108,148" fill="none" stroke="#ef4444" strokeWidth="2" />
            <text x="110" y="160" fontSize="12" fontWeight="900" fill="#ef4444">α</text>
            {/* Formula */}
            <text x="220" y="40" fontSize="10" fontWeight="600" fill="#475569">tan α = h / s</text>
        </svg>
    );
}

function AlternateAnglesDiagram() {
    return (
        <svg viewBox="0 0 320 210" style={{ width: '100%', maxHeight: 190 }}>
            <line x1="20" y1="190" x2="300" y2="190" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Building */}
            <rect x="50" y="50" width="25" height="140" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" rx="2" />
            {/* Observer on top */}
            <circle cx="62" cy="48" r="5" fill="#7c3aed" />
            {/* Horizontal from top */}
            <line x1="75" y1="52" x2="280" y2="52" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Object on ground */}
            <circle cx="250" cy="185" r="5" fill="#0891b2" />
            {/* Line of sight */}
            <line x1="70" y1="52" x2="248" y2="183" stroke="#7c3aed" strokeWidth="2" />
            {/* Horizontal from ground */}
            <line x1="75" y1="190" x2="250" y2="190" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5,3" />
            {/* Depression angle */}
            <path d="M 120,52 A 48,48 0 0,1 107,76" fill="none" stroke="#ef4444" strokeWidth="2" />
            <text x="125" y="68" fontSize="10" fontWeight="800" fill="#ef4444">β (dep)</text>
            {/* Elevation angle */}
            <path d="M 210,190 A 40,40 0 0,0 200,170" fill="none" stroke="#0891b2" strokeWidth="2" />
            <text x="202" y="178" fontSize="10" fontWeight="800" fill="#0891b2">β (elev)</text>
            {/* Parallel lines indicator */}
            <text x="290" y="52" fontSize="9" fill="#f59e0b">∥</text>
            <text x="260" y="195" fontSize="9" fill="#10b981">∥</text>
            {/* Key text */}
            <text x="160" y="25" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">∠Depression = ∠Elevation (Alternate Interior Angles)</text>
        </svg>
    );
}

function TwoBuildingsDiagram() {
    return (
        <svg viewBox="0 0 320 210" style={{ width: '100%', maxHeight: 190 }}>
            <line x1="20" y1="190" x2="300" y2="190" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Building A (taller) */}
            <rect x="40" y="40" width="30" height="150" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
            <text x="55" y="35" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3b82f6">A</text>
            {/* Building B (shorter) */}
            <rect x="240" y="100" width="30" height="90" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" rx="2" />
            <text x="255" y="95" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ec4899">B</text>
            {/* Lines of sight */}
            <line x1="70" y1="45" x2="240" y2="105" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4,3" />
            <line x1="70" y1="45" x2="240" y2="185" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4,3" />
            {/* Horizontal */}
            <line x1="70" y1="45" x2="280" y2="45" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
            {/* Labels */}
            <text x="155" y="68" fontSize="9" fill="#7c3aed" fontWeight="600">θ₁</text>
            <text x="130" y="55" fontSize="9" fill="#0891b2" fontWeight="600">θ₂</text>
            <text x="150" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">d (distance between)</text>
        </svg>
    );
}

function HorizontalDiagram() {
    return (
        <svg viewBox="0 0 320 180" style={{ width: '100%', maxHeight: 160 }}>
            {/* Eye */}
            <circle cx="60" cy="90" r="12" fill="#e0f2fe" stroke="#0891b2" strokeWidth="2" />
            <circle cx="60" cy="90" r="4" fill="#0891b2" />
            <text x="60" y="115" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0891b2">Eye</text>
            {/* Horizontal line */}
            <line x1="72" y1="90" x2="290" y2="90" stroke="#059669" strokeWidth="2.5" />
            <text x="180" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">Horizontal Line</text>
            {/* Above - elevation */}
            <line x1="72" y1="90" x2="250" y2="30" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="200" y="45" fontSize="9" fill="#3b82f6" fontWeight="600">↑ Above = Elevation</text>
            {/* Below - depression */}
            <line x1="72" y1="90" x2="250" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="200" y="155" fontSize="9" fill="#ef4444" fontWeight="600">↓ Below = Depression</text>
            {/* Angle arcs */}
            <path d="M 120,90 A 48,48 0 0,0 112,65" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <path d="M 120,90 A 48,48 0 0,1 112,115" fill="none" stroke="#ef4444" strokeWidth="2" />
        </svg>
    );
}

function ClinometerDiagram() {
    return (
        <svg viewBox="0 0 320 180" style={{ width: '100%', maxHeight: 160 }}>
            {/* Clinometer body */}
            <rect x="100" y="50" width="120" height="80" rx="10" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            {/* Protractor arc */}
            <path d="M 160,120 A 50,50 0 0,1 110,70" fill="none" stroke="#0891b2" strokeWidth="2" />
            <path d="M 160,120 A 50,50 0 0,0 210,70" fill="none" stroke="#0891b2" strokeWidth="2" />
            {/* Plumb line */}
            <line x1="160" y1="70" x2="140" y2="120" stroke="#ef4444" strokeWidth="2" />
            <circle cx="140" cy="122" r="3" fill="#ef4444" />
            {/* Degree marks */}
            <text x="108" y="68" fontSize="8" fill="#64748b">90°</text>
            <text x="155" y="55" fontSize="8" fill="#64748b">0°</text>
            <text x="205" y="68" fontSize="8" fill="#64748b">90°</text>
            {/* Sighting tube */}
            <line x1="220" y1="65" x2="280" y2="45" stroke="#1e293b" strokeWidth="3" />
            <text x="250" y="40" fontSize="9" fill="#1e293b" fontWeight="600">Sight →</text>
            {/* Label */}
            <text x="160" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0891b2">Clinometer / Theodolite</text>
        </svg>
    );
}

function ObserverHeightDiagram() {
    return (
        <svg viewBox="0 0 320 200" style={{ width: '100%', maxHeight: 180 }}>
            <line x1="20" y1="180" x2="300" y2="180" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Person */}
            <line x1="70" y1="180" x2="70" y2="140" stroke="#0891b2" strokeWidth="2" />
            <circle cx="70" cy="135" r="6" fill="#0891b2" />
            <text x="50" y="160" fontSize="9" fill="#0891b2" fontWeight="600">1.5m</text>
            {/* Tower */}
            <rect x="240" y="40" width="25" height="140" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
            {/* Horizontal from eye */}
            <line x1="76" y1="135" x2="240" y2="135" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
            {/* Line of sight to top */}
            <line x1="76" y1="135" x2="240" y2="45" stroke="#7c3aed" strokeWidth="1.5" />
            {/* Height labels */}
            <text x="275" y="90" fontSize="9" fill="#ef4444" fontWeight="600">H−h</text>
            <text x="275" y="160" fontSize="9" fill="#0891b2" fontWeight="600">h</text>
            <line x1="265" y1="135" x2="265" y2="180" stroke="#0891b2" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="265" y1="40" x2="265" y2="135" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" />
            {/* Angle */}
            <path d="M 115,135 A 39,39 0 0,0 107,118" fill="none" stroke="#ef4444" strokeWidth="2" />
            <text x="118" y="125" fontSize="11" fontWeight="800" fill="#ef4444">θ</text>
            <text x="160" y="195" textAnchor="middle" fontSize="9" fill="#64748b">Total Height = (H−h) + h</text>
        </svg>
    );
}

const DIAGRAM_MAP = {
    0: LineOfSightDiagram,
    1: HorizontalDiagram,
    2: ElevationDiagram,
    3: DepressionDiagram,
    4: AlternateAnglesDiagram,
    5: RightTriangleDiagram,
    6: ShadowDiagram,
    7: ClinometerDiagram,
    8: ObserverHeightDiagram,
    9: TwoBuildingsDiagram,
};

const TERMS = [
    {
        name: 'Line of Sight',
        color: '#0891b2',
        icon: '👁️',
        def: 'The straight line drawn from the eye of the observer to the point on the object being viewed. It connects the observer to the target.',
        formula: 'Eye → Object',
        example: 'A student looking at the top of a flag pole — the imaginary line from their eye to the tip is the line of sight.',
        memory: 'Line of Sight = "Eye-to-Object Laser Beam"'
    },
    {
        name: 'Horizontal Line',
        color: '#059669',
        icon: '➡️',
        def: 'The imaginary line drawn at the eye level of the observer, parallel to the ground. It serves as the base reference for all angle measurements.',
        formula: 'Parallel to ground at eye level',
        example: 'When you stare straight ahead without tilting your head — that direction is the horizontal.',
        memory: 'Horizontal = "Straight Ahead" — your default gaze direction'
    },
    {
        name: 'Angle of Elevation',
        color: '#3b82f6',
        icon: '📐',
        def: 'The angle between the horizontal line and the line of sight when the observer looks UPWARD at an object above the horizontal level.',
        formula: '$\\theta = \\tan^{-1}\\left(\\frac{h}{d}\\right)$',
        example: 'Looking up at a kite in the sky — the angle your eyes tilt upward from straight-ahead is the angle of elevation.',
        memory: 'Elevation = "Eyes go UP" — like an elevator going up!'
    },
    {
        name: 'Angle of Depression',
        color: '#7c3aed',
        icon: '⬇️',
        def: 'The angle between the horizontal line and the line of sight when the observer looks DOWNWARD at an object below the horizontal level.',
        formula: '$\\beta = \\tan^{-1}\\left(\\frac{h}{d}\\right)$',
        example: 'A person on a cliff looking down at a boat — the angle their eyes tilt downward is the angle of depression.',
        memory: 'Depression = "Eyes go DOWN" — like feeling low!'
    },
    {
        name: 'Alternate Interior Angles',
        color: '#ef4444',
        icon: '🔄',
        def: 'When two parallel lines (horizontal at top and ground) are cut by a transversal (line of sight), the angle of depression equals the angle of elevation.',
        formula: '$\\angle\\text{Depression} = \\angle\\text{Elevation}$',
        example: 'From a tower top, if angle of depression to a car is 30°, then from the car, the angle of elevation to the tower top is also 30°.',
        memory: 'Alternate = "Mirror Angles" — depression above mirrors elevation below!'
    },
    {
        name: 'Right Triangle',
        color: '#10b981',
        icon: '📏',
        def: 'Every height-and-distance problem forms a right-angled triangle where the vertical height is the perpendicular, ground distance is the base, and line of sight is the hypotenuse.',
        formula: '$\\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}}$',
        example: 'Tower height (vertical), distance from base (horizontal), and line of sight form the triangle.',
        memory: 'Right Triangle = "The Secret Shape" — it is hidden in EVERY problem!'
    },
    {
        name: 'Shadow Length',
        color: '#f59e0b',
        icon: '🌓',
        def: 'The length of the shadow cast by an object when sunlight falls at a certain altitude angle. Shadow length changes as the sun angle changes.',
        formula: '$\\text{Shadow} = \\frac{h}{\\tan(\\text{sun altitude})}$',
        example: 'A 10 m pole casts a longer shadow in the evening (low sun) than at noon (high sun).',
        memory: "Shadow = \"Sun's Footprint\" — lower sun means longer shadow!"
    },
    {
        name: 'Clinometer / Theodolite',
        color: '#6366f1',
        icon: '🔭',
        def: "An instrument used to measure angles of elevation or depression. A clinometer is a simple version; a theodolite is the professional surveying tool.",
        formula: "Measures $\\theta$ directly",
        example: "Surveyors use a theodolite on a tripod to measure precise angles before calculating heights.",
        memory: 'Clinometer = "Angle Finder" — it reads the tilt of your sight!'
    },
    {
        name: 'Observer Height',
        color: '#ec4899',
        icon: '🧍',
        def: "The height of the observer's eye from the ground. In many problems, observer height (e.g. 1.5 m) must be added to the calculated height to get the total.",
        formula: "$H_{total} = h_{calculated} + h_{observer}$",
        example: "A 1.5 m tall person measures a tower angle — the tower height = tan-based height + 1.5 m.",
        memory: "Observer Height = \"Don't Forget Me!\" — always add it at the end!"
    },
    {
        name: 'Two-Triangle Problems',
        color: '#0369a1',
        icon: '🔺',
        def: 'Advanced problems where two right triangles share a common side. Common in flag-on-building, two-ship, and shadow-change problems.',
        formula: '$h_1 = d\\tan\\theta_1,\\; h_2 = d\\tan\\theta_2$',
        example: 'A building with a flag on top — one triangle to the building top, another to the flag top, same base distance.',
        memory: 'Two Triangles = "Stack or Share" — they share a side!'
    },
];

const RULES = [
    {
        num: 1,
        title: 'Always Draw the Diagram',
        rule: 'Before any calculation, draw a clear diagram with the observer, object, horizontal line, line of sight, and all given angles and distances.',
        emoji: '✏️',
        color: '#0891b2',
        detail: 'The biggest mistake is jumping to formulas without a picture. A well-labelled diagram makes the right triangle obvious and prevents choosing the wrong ratio.',
        examples: ['Mark the right angle clearly', 'Label "Opposite" and "Adjacent" relative to the given angle'],
        tip: 'Spend 30 seconds on a good diagram — it saves 3 minutes of confusion!'
    },
    {
        num: 2,
        title: '$\\tan\\theta$ is King',
        rule: 'In 80% of NCERT problems, you only need $\\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}}$ because height (opposite) and distance (adjacent) are the most common pair.',
        emoji: '👑',
        color: '#f59e0b',
        detail: 'Use $\\sin\\theta$ only when the hypotenuse (line of sight / ladder / string) is involved. Use $\\cos\\theta$ when you need the base and hypotenuse.',
        examples: ['Tower + Distance → $\\tan$', 'Ladder + Wall → $\\sin$ or $\\cos$'],
        tip: 'If the problem mentions "height" and "distance from base" — it is always $\\tan$!'
    },
    {
        num: 3,
        title: 'Depression = Elevation',
        rule: 'The angle of depression from the top equals the angle of elevation from the bottom, because horizontal lines are parallel and the line of sight is a transversal.',
        emoji: '🔄',
        color: '#7c3aed',
        detail: 'This is the most important trick. When a problem gives you an Angle of Depression, immediately convert it to an Angle of Elevation in the right triangle. This makes the problem identical to a standard elevation problem.',
        examples: ['Depression of 45° from tower = Elevation of 45° from ground', 'Parallel horizontals + transversal = Alternate Interior Angles'],
        tip: 'Never solve with "depression" directly — flip it to "elevation" first!'
    },
    {
        num: 4,
        title: 'Standard Angle Values',
        rule: 'Memorise: $\\tan 30° = \\frac{1}{\\sqrt{3}}$, $\\tan 45° = 1$, $\\tan 60° = \\sqrt{3}$. These three cover 95% of all problems.',
        emoji: '📋',
        color: '#10b981',
        detail: 'Almost every NCERT problem uses 30°, 45°, or 60°. If you know these three tan values cold, you can solve any standard problem instantly without a calculator.',
        examples: ['$\\tan 30° = 1/\\sqrt{3} \\approx 0.577$', '$\\tan 45° = 1$', '$\\tan 60° = \\sqrt{3} \\approx 1.732$'],
        tip: 'Make a 3-row table and paste it on your wall — tan 30, 45, 60!'
    },
    {
        num: 5,
        title: 'Add Observer Height',
        rule: "When the problem states the observer's height (e.g. 1.5 m), the final answer must include it: Total Height = Calculated Height + Observer Height.",
        emoji: '🧍',
        color: '#ec4899',
        detail: "Many students forget to add the observer height at the end and lose easy marks. The right triangle gives you the height ABOVE the observer's eye level, not from the ground.",
        examples: ['Total = $d \\cdot \\tan\\theta + 1.5$', 'Observer on a pedestal? Add pedestal height too!'],
        tip: 'Read the last line of the question — if it says "height from ground", you MUST add observer height!'
    }
];

const QUIZ = [
    { q: "The line drawn from the eye of an observer to the point being viewed is called the:", opts: ["Horizontal Line", "Line of Sight", "Angle of Elevation", "Hypotenuse"], corr: 1, exp: "The Line of Sight is the direct imaginary line from the observer's eye to the object being viewed." },
    { q: "When an observer looks UP at an object, the angle formed with the horizontal is called:", opts: ["Angle of Depression", "Right Angle", "Angle of Elevation", "Reflex Angle"], corr: 2, exp: "Looking upward from the horizontal creates the Angle of Elevation." },
    { q: "The angle of depression from a tower top equals the angle of elevation from the ground because of:", opts: ["Vertically opposite angles", "Corresponding angles", "Alternate interior angles", "Co-interior angles"], corr: 2, exp: "The horizontal at the top and the ground are parallel lines cut by the line of sight (transversal), creating equal alternate interior angles." },
    { q: "Which trigonometric ratio is most commonly used in Heights & Distances problems?", opts: ["$\\sin\\theta$", "$\\cos\\theta$", "$\\tan\\theta$", "$\\cot\\theta$"], corr: 2, exp: "Since most problems involve height (opposite) and distance (adjacent), $\\tan\\theta$ = Opposite/Adjacent is the go-to ratio." },
    { q: "If $\\tan\\theta = 1$, then $\\theta$ equals:", opts: ["$30°$", "$45°$", "$60°$", "$90°$"], corr: 1, exp: "$\\tan 45° = 1$. This means the height equals the distance — it's an isoceles right triangle." },
    { q: "A person standing on a cliff looks down at a boat. The angle measured is an angle of:", opts: ["Elevation", "Depression", "Reflection", "Inclination"], corr: 1, exp: "Looking downward from a height creates an Angle of Depression." },
    { q: "In a shadow problem, if the sun's altitude increases, the shadow length:", opts: ["Increases", "Decreases", "Stays same", "Doubles"], corr: 1, exp: "Higher sun angle means a steeper ray, which casts a shorter shadow. Shadow = h / tan(altitude)." },
    { q: "An instrument used to measure angles of elevation and depression is a:", opts: ["Barometer", "Thermometer", "Clinometer", "Speedometer"], corr: 2, exp: "A Clinometer (or Theodolite in professional use) directly measures the tilt angle of the line of sight." },
    { q: "If observer height is 1.5 m and the calculated height above eye level is 20 m, total height is:", opts: ["20 m", "18.5 m", "21.5 m", "22 m"], corr: 2, exp: "Total height from ground = height above eye level + observer height = 20 + 1.5 = 21.5 m." },
    { q: "Two right triangles sharing a common vertical side typically appear in problems involving:", opts: ["Simple tower heights", "Circular paths", "Flag on a building / two angles", "Area calculations"], corr: 2, exp: "When two angles are given (e.g., to building top and flag top), two right triangles share the same horizontal distance." }
];

export default function Terminology() {
    const navigate = useNavigate();
    const [view, setView] = useState('terms'); // 'terms' | 'rules' | 'quiz'
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [ansSelected, setAnsSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const quizAnswers = useRef([]);

    useEffect(() => {
        if (view === 'quiz') {
            startSession({ nodeId: TERMINOLOGY_QUIZ_NODE_ID, sessionType: 'quiz' });
            quizAnswers.current = [];
        }
    }, [view]);

    React.useEffect(() => {
        document.body.classList.add('hide-main-footer');
        return () => document.body.classList.remove('hide-main-footer');
    }, []);

    const term = TERMS[selectedIdx];
    const activeRule = RULES[selectedRuleIdx];
    const DiagramComponent = DIAGRAM_MAP[selectedIdx] || LineOfSightDiagram;

    const handleAns = async (idx) => {
        if (answered) return;
        setAnsSelected(idx);
        setAnswered(true);
        const isCorrect = idx === QUIZ[quizIdx].corr;
        if (isCorrect) setScore(s => s + 1);
        const answerData = { question_index: quizIdx + 1, answer_json: { selected: idx }, is_correct: isCorrect ? 1.0 : 0.0, marks_awarded: isCorrect ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
        quizAnswers.current[quizIdx] = answerData;
        await logAnswer({ questionIndex: answerData.question_index, answerJson: answerData.answer_json, isCorrect: answerData.is_correct });
    };

    const nextQ = async () => {
        if (quizIdx + 1 < QUIZ.length) {
            setQuizIdx(i => i + 1);
            setAnsSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
            const payload = quizAnswers.current.filter(Boolean);
            await finishSession({ totalQuestions: QUIZ.length, questionsAnswered: payload.length, answersPayload: payload });
        }
    };

    return (
        <div className="terminology-page">
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/some-applications-of-trigonometry')}>← Hub</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/some-applications-of-trigonometry/introduction')}>🌟 Intro</button>
                    <button className="intro-nav-link intro-nav-link--active">📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/some-applications-of-trigonometry/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="res-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 4 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0' }}>
                        Heights & Distances <span style={{ background: 'linear-gradient(135deg, var(--sv-primary), var(--sv-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                    <button className={`alg-tab ${view === 'terms' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('terms')}>📚 Terminology</button>
                    <button className={`alg-tab ${view === 'rules' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('rules')}>📏 5 Golden Rules</button>
                    <button className={`alg-tab ${view === 'quiz' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('quiz')}>🧪 Test Prep</button>
                </div>

                {view === 'terms' && (
                    <div className="res-fade-in alg-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: 12, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '10px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {TERMS.map((t, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button
                                        key={i}
                                        className={`term-btn-mini ${isActive ? 'active' : ''}`}
                                        onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: `linear-gradient(135deg, ${t.color}15, ${t.color}05)`,
                                            borderColor: isActive ? t.color : `${t.color}20`,
                                            gridColumn: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'span 2' : 'span 1',
                                            justifyContent: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'center' : 'flex-start',
                                            padding: '6px 10px', position: 'relative', overflow: 'hidden', border: '1.5px solid', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{ fontSize: 20, padding: '2px', position: 'relative', zIndex: 1, filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none' }}>{t.icon}</div>
                                        <div style={{ fontWeight: 800, fontSize: 10, color: isActive ? '#fff' : '#1e293b', textAlign: 'center', lineHeight: 1.1, position: 'relative', zIndex: 1 }}>{t.name.split(' (')[0]}</div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="details-window-anim" key={selectedIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                            border: `2px solid ${term.color}40`, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%'
                        }}>
                            <div className="term-featured-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none', borderRadius: 0, margin: 0, height: '100%', alignItems: 'stretch' }}>
                                <div className="term-visual-zone" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', background: `${term.color}08` }}>
                                    <DiagramComponent />
                                    <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800, color: term.color, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>DIAGRAM</div>
                                </div>

                                <div className="term-content-zone" style={{ padding: '0 0 0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <span className="term-badge" style={{ background: term.color + '15', color: term.color, marginBottom: 6, padding: '2px 8px', fontSize: 10 }}>Definition</span>
                                    <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: '0 0 4px', lineHeight: 1.1 }}>{term.name}</h2>
                                    <p style={{ fontSize: 13, lineHeight: 1.4, color: '#475569', marginBottom: 12 }}>{term.def}</p>

                                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1 1 120px', background: '#f8fafc', padding: 8, borderRadius: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
                                            <div style={{ fontSize: 9, fontWeight: 800, color: term.color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Formula / Key</div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}><MathRenderer text={term.formula} /></div>
                                        </div>
                                        <div style={{ flex: '2 1 140px', background: '#f8fafc', padding: 8, borderRadius: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
                                            <div style={{ fontSize: 9, fontWeight: 800, color: term.color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>In Practice</div>
                                            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.3 }}>{term.example}</div>
                                        </div>
                                    </div>

                                    <div style={{ background: term.color + '05', padding: '10px 12px', borderRadius: 10, borderLeft: `4px solid ${term.color}` }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>
                                            <span style={{ marginRight: 6 }}>💡</span> <MathRenderer text={term.memory} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'rules' && (
                    <div className="alg-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: 12, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '8px 10px', borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr', gap: 6, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className={`term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                        style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20`, padding: '8px 12px', position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                                    >
                                        <div style={{ width: 26, height: 26, borderRadius: 6, background: isActive ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: isActive ? '#fff' : rule.color, fontWeight: 900, position: 'relative', zIndex: 1 }}>{rule.num}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                                            <span style={{ fontWeight: 800, fontSize: 13, color: isActive ? '#fff' : '#1e293b', lineHeight: 1 }}>Rule {rule.num}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>
                                                <MathRenderer text={rule.title} />
                                            </span>
                                        </div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="details-window-anim" key={selectedRuleIdx} style={{
                            background: '#ffffff', borderRadius: 16, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${activeRule.color}15`, height: '100%', display: 'flex', flexDirection: 'column', gap: '6px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                <div style={{ width: 26, height: 26, borderRadius: 6, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: <MathRenderer text={activeRule.title} /></h2>
                            </div>
                            <div style={{ background: `${activeRule.color}08`, padding: '8px 10px', borderRadius: 8, borderLeft: `3px solid ${activeRule.color}`, marginBottom: 8 }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                    <MathRenderer text={activeRule.rule} />
                                </p>
                            </div>
                            <p style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.3, margin: '0 0 10px' }}>
                                <MathRenderer text={activeRule.detail} />
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: activeRule.color, marginBottom: 6 }}>Practical Examples</h4>
                                    <div style={{ background: '#f8fafc', padding: 10, borderRadius: 10, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            {activeRule.examples.map((ex, j) => (
                                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: activeRule.color }} />
                                                    <span style={{ fontSize: 12, background: '#fff', padding: '2px 6px', borderRadius: 6, color: '#1e293b', fontWeight: 600 }}>
                                                        <MathRenderer text={ex} />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: '#14b9a6', marginBottom: 6 }}>Survival Tip</h4>
                                    <div style={{ background: 'rgba(20,184,166,0.05)', padding: 10, borderRadius: 10, border: '1px solid rgba(20,184,166,0.1)' }}>
                                        <p style={{ margin: 0, fontSize: 12, color: '#445163', lineHeight: 1.4 }}><span style={{ fontWeight: 800, color: '#14b9a6' }}>🛡️ Pro Tip: </span><MathRenderer text={activeRule.tip} /></p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'quiz' && (
                    <div className="details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '20px 24px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!finished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--sv-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of {QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#1e293b', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: 'var(--sv-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: 'var(--sv-secondary)' }}>{quizIdx + 1}/{QUIZ.length}</div>
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', lineHeight: 1.4, marginBottom: 16 }}>
                                    <MathRenderer text={QUIZ[quizIdx].q} />
                                </div>
                                <div className="quiz-options-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                    {QUIZ[quizIdx].opts.map((opt, i) => {
                                        const isSelected = ansSelected === i;
                                        const isCorrect = i === QUIZ[quizIdx].corr;

                                        let borderColor = 'rgba(0,0,0,0.05)';
                                        let bgColor = '#fff';
                                        let textColor = '#1e293b';

                                        if (answered) {
                                            if (isCorrect) {
                                                borderColor = '#10b981';
                                                bgColor = 'rgba(16, 185, 129, 0.05)';
                                                textColor = '#10b981';
                                            } else if (isSelected) {
                                                borderColor = '#ef4444';
                                                bgColor = 'rgba(239, 68, 68, 0.05)';
                                                textColor = '#ef4444';
                                            }
                                        } else if (isSelected) {
                                            borderColor = 'var(--sv-secondary)';
                                            bgColor = 'rgba(99, 102, 241, 0.05)';
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleAns(i)}
                                                disabled={answered}
                                                style={{
                                                    padding: '12px 16px', borderRadius: '14px', border: `2px solid ${borderColor}`,
                                                    background: bgColor, color: textColor,
                                                    textAlign: 'left', fontWeight: isSelected ? 800 : 600, transition: 'all 0.2s',
                                                    fontSize: '15px', cursor: answered ? 'default' : 'pointer'
                                                }}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {answered && (
                                    <div style={{
                                        background: 'rgba(99, 102, 241, 0.05)', padding: '10px 14px', borderRadius: '12px', marginBottom: '16px',
                                        border: '1px solid rgba(99, 102, 241, 0.2)'
                                    }}>
                                        <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
                                            <strong style={{ color: 'var(--sv-secondary)' }}>Solution: </strong>
                                            <MathRenderer text={QUIZ[quizIdx].exp} />
                                        </div>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="alg-btn-primary"
                                        onClick={nextQ}
                                        disabled={!answered}
                                        style={{
                                            padding: '10px 24px', background: answered ? 'var(--sv-secondary)' : '#f8fafc',
                                            color: answered ? '#fff' : '#94a3b8', border: 'none', borderRadius: '100px',
                                            fontWeight: 800, fontSize: '13px', cursor: answered ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.2s', boxShadow: answered ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none'
                                        }}
                                    >
                                        {quizIdx + 1 === QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{score >= 8 ? '🏆' : score >= 5 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8, color: 'var(--sv-text)' }}>Test Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: 'var(--sv-secondary)', fontWeight: 900 }}>{score} / {QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button className="alg-btn-primary" onClick={() => { setFinished(false); setQuizIdx(0); setScore(0); setAnswered(false); setAnsSelected(null); }}>Try Again</button>
                                    <button className="alg-btn-secondary" onClick={() => navigate('/some-applications-of-trigonometry/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 4, textAlign: 'center' }}>
                    <button className="alg-btn-primary" onClick={() => navigate('/some-applications-of-trigonometry/skills')} style={{ padding: '6px 20px', fontSize: 13, borderRadius: 100 }}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div >
    );
}
