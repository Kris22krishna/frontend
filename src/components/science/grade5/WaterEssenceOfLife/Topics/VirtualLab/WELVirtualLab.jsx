import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../WaterEssenceOfLifeDashboard.module.css';

/* ─── Experiment Data ─────────────────────────────────── */
const EXPERIMENTS = [
    {
        id: 'availability',
        title: 'Water Availability Simulator',
        subtitle: 'Activity 1',
        emoji: '🌍',
        color: '#0ea5e9',
        colorLight: '#f0f9ff',
        actionLabel: '💧 Show Distribution',
        equation: 'All Water = 100% → Freshwater ≈ 3% → Usable ≈ 0.5%',
        type: 'Earth Science · Water Distribution',
        desc: 'See how much of Earth\'s water is actually drinkable — the answer will surprise you!',
        observation: 'Out of all the water on Earth, 97% is salty ocean water. Of the remaining 3% freshwater, about 69% is locked in glaciers. Only about 0.5% is available as rivers, lakes, and groundwater — that\'s like one teaspoon from a full glass!',
    },
    {
        id: 'states',
        title: 'States of Water Lab',
        subtitle: 'Activity 2',
        emoji: '🧊',
        color: '#8b5cf6',
        colorLight: '#f5f3ff',
        actionLabel: '🔥 Heat the Water',
        equation: 'Ice (0°C) → Water → Steam (100°C)',
        type: 'Chemistry · States of Matter',
        desc: 'Control temperature to change water between solid, liquid, and gas!',
        observation: 'At 0°C, water freezes into solid ice crystals. As temperature rises, ice melts into liquid water. At 100°C, water boils and turns into invisible steam (water vapour). The molecules move faster as they get hotter — slow in ice, faster in liquid, fastest in gas!',
    },
    {
        id: 'cycle',
        title: 'Water Cycle Simulation',
        subtitle: 'Activity 3',
        emoji: '☁️',
        color: '#10b981',
        colorLight: '#ecfdf5',
        actionLabel: '☀️ Start the Sun',
        equation: 'Evaporation → Condensation → Precipitation → Collection',
        type: 'Earth Science · Water Cycle',
        desc: 'Watch the complete water cycle in action — from ocean to cloud to rain!',
        observation: 'The sun heats water in oceans and rivers causing evaporation. Water vapour rises and cools, condensing into tiny droplets that form clouds. When clouds become heavy, water falls as rain (precipitation). Rain collects in rivers and the cycle repeats endlessly!',
    },
    {
        id: 'ground',
        title: 'Groundwater Seepage',
        subtitle: 'Activity 4',
        emoji: '🌱',
        color: '#f59e0b',
        colorLight: '#fffbeb',
        actionLabel: '🌧️ Make it Rain',
        equation: 'Rain → Soil → Underground Aquifer',
        type: 'Geology · Groundwater',
        desc: 'Compare how water seeps into forest soil versus city concrete!',
        observation: 'In forests, rain seeps through soft soil and tree roots into underground aquifers — like a sponge absorbing water. In cities, concrete and tar block seepage, causing water to run off into drains. Forests recharge 10x more groundwater than cities!',
    },
    {
        id: 'river',
        title: 'River Flow Simulator',
        subtitle: 'Activity 5',
        emoji: '🏞️',
        color: '#6366f1',
        colorLight: '#eef2ff',
        actionLabel: '💧 Release Water',
        equation: 'Mountains → Rivers → Plains → Ocean',
        type: 'Geography · River Systems',
        desc: 'Watch water flow from mountains to the ocean following terrain!',
        observation: 'Water always flows from high ground to low ground due to gravity. Rivers start as small streams in mountains, join together to form bigger rivers flowing through plains, and finally reach the ocean. The slope of the land determines the river\'s path and speed!',
    },
    {
        id: 'aquatic',
        title: 'Aquatic Life Explorer',
        subtitle: 'Activity 6',
        emoji: '🐟',
        color: '#ec4899',
        colorLight: '#fdf2f8',
        actionLabel: '🔍 Explore Life',
        equation: 'Water → Adaptations → Survival',
        type: 'Biology · Aquatic Ecosystems',
        desc: 'Discover how fish, frogs, and plants survive in water with special features!',
        observation: 'Fish use gills to extract oxygen from water and fins to swim. Frogs are amphibians — they breathe through lungs AND skin! Ducks have webbed feet like paddles. Water lilies have waxy coatings to float and repel water. Each adaptation is perfectly designed for survival!',
    },
];

/* ─── SVG Lab Scenes ─────────────────────────────────── */

/* WATER AVAILABILITY SCENE */
function AvailabilityScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    return (
        <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%', maxHeight: 320 }}>
            <defs>
                <linearGradient id="oceanGr" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#164e63" />
                </linearGradient>
                <linearGradient id="freshGr" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
            </defs>
            {/* Glass */}
            <rect x="40" y="60" width="160" height="200" rx="12" fill="none" stroke="#94a3b8" strokeWidth="3" />
            {/* Salt water fill — 97% */}
            <rect x="43" y="66" width="154" height="190" rx="8" fill="url(#oceanGr)" opacity={isRunning || isDone ? 1 : 0.2}>
                {isRunning && <animate attributeName="height" from="0" to="190" dur="1.2s" fill="freeze" />}
                {isRunning && <animate attributeName="y" from="256" to="66" dur="1.2s" fill="freeze" />}
            </rect>
            {/* Label ocean */}
            <text x="120" y="170" textAnchor="middle" fill="#fff" fontWeight="800" fontSize="14" opacity={isDone ? 1 : 0}>97% Salty</text>
            {/* Freshwater teaspoon */}
            {isDone && (
                <>
                    <ellipse cx="245" cy="200" rx="22" ry="8" fill="url(#freshGr)" opacity="0.9">
                        <animate attributeName="opacity" from="0" to="0.9" dur="0.6s" fill="freeze" />
                    </ellipse>
                    <rect x="242" y="200" width="6" height="60" rx="3" fill="#94a3b8" />
                    <text x="245" y="280" textAnchor="middle" fill="#0ea5e9" fontWeight="800" fontSize="11">3% Fresh</text>
                    <text x="245" y="295" textAnchor="middle" fill="#64748b" fontWeight="600" fontSize="9">(&lt;1% usable)</text>
                    <text x="120" y="45" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="16">Earth's Water</text>
                </>
            )}
            {!isRunning && !isDone && <text x="150" y="170" textAnchor="middle" fill="#94a3b8" fontWeight="700" fontSize="15">Click to visualize</text>}
        </svg>
    );
}

/* STATES OF WATER SCENE */
function StatesScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    return (
        <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%', maxHeight: 320 }}>
            <defs>
                <linearGradient id="iceGr2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bfdbfe" /><stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
                <linearGradient id="watGr2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
            </defs>
            <text x="150" y="25" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">States of Water</text>
            {/* ICE */}
            <rect x="20" y="60" width="70" height="70" rx="8" fill="url(#iceGr2)" stroke="#60a5fa" strokeWidth="2" opacity={isDone ? 0.4 : 1}>
                <animate attributeName="opacity" from="1" to={isDone ? "0.4" : "1"} dur="0.5s" fill="freeze" />
            </rect>
            <text x="55" y="150" textAnchor="middle" fill="#1e40af" fontWeight="700" fontSize="11">ICE (0°C)</text>
            <text x="55" y="163" textAnchor="middle" fill="#64748b" fontWeight="600" fontSize="9">Solid</text>
            {/* Arrow 1 */}
            {(isRunning || isDone) && (
                <g opacity={isDone ? 1 : 0}>
                    <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.3s" fill="freeze" />
                    <line x1="95" y1="95" x2="110" y2="95" stroke="#f59e0b" strokeWidth="2.5" />
                    <polygon points="112,90 122,95 112,100" fill="#f59e0b" />
                    <text x="108" y="84" textAnchor="middle" fill="#f59e0b" fontWeight="700" fontSize="8">Heat</text>
                </g>
            )}
            {/* LIQUID */}
            <ellipse cx="155" cy="110" rx="30" ry="20" fill="url(#watGr2)" opacity={isRunning || isDone ? 1 : 0.3}>
                {isRunning && <animate attributeName="opacity" from="0.3" to="1" dur="0.8s" begin="0.4s" fill="freeze" />}
                {isDone && (
                    <animate attributeName="ry" values="20;22;20" dur="2s" repeatCount="indefinite" />
                )}
            </ellipse>
            <text x="155" y="150" textAnchor="middle" fill="#0369a1" fontWeight="700" fontSize="11">WATER</text>
            <text x="155" y="163" textAnchor="middle" fill="#64748b" fontWeight="600" fontSize="9">Liquid</text>
            {/* Arrow 2 */}
            {isDone && (
                <g>
                    <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.6s" fill="freeze" />
                    <line x1="190" y1="95" x2="205" y2="78" stroke="#ef4444" strokeWidth="2.5" />
                    <polygon points="205,72 212,82 202,82" fill="#ef4444" />
                    <text x="210" y="68" textAnchor="middle" fill="#ef4444" fontWeight="700" fontSize="8">100°C</text>
                </g>
            )}
            {/* STEAM */}
            {isDone && (
                <g>
                    {[0, 1, 2].map(i => (
                        <circle key={i} cx={230 + i * 15} cy={55 - i * 8} r={6 + i * 2} fill="#e2e8f0" opacity="0.6">
                            <animate attributeName="cy" values={`${55 - i * 8};${45 - i * 8};${55 - i * 8}`} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.6;0.3;0.6" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                        </circle>
                    ))}
                    <text x="245" y="150" textAnchor="middle" fill="#64748b" fontWeight="700" fontSize="11">STEAM</text>
                    <text x="245" y="163" textAnchor="middle" fill="#64748b" fontWeight="600" fontSize="9">Gas</text>
                </g>
            )}
            {/* Temperature bar */}
            <rect x="20" y="200" width="260" height="18" rx="9" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
            {(isRunning || isDone) && (
                <rect x="20" y="200" width={isDone ? "260" : "0"} height="18" rx="9" fill="linear-gradient(90deg, #38bdf8, #f59e0b, #ef4444)">
                    <animate attributeName="width" from="0" to="260" dur="1.5s" fill="freeze" />
                </rect>
            )}
            <text x="20" y="235" fill="#3b82f6" fontWeight="700" fontSize="10">0°C</text>
            <text x="270" y="235" textAnchor="end" fill="#ef4444" fontWeight="700" fontSize="10">100°C</text>
            {/* Molecules info */}
            {isDone && (
                <g>
                    <text x="150" y="270" textAnchor="middle" fill="#0f172a" fontWeight="800" fontSize="12">
                        Molecules: Slow ❄️ → Medium 💧 → Fast 🔥
                    </text>
                </g>
            )}
        </svg>
    );
}

/* WATER CYCLE SCENE */
function CycleScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    return (
        <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%', maxHeight: 320 }}>
            <defs>
                <linearGradient id="skyGr" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#bae6fd" /><stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="seaGr" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" /><stop offset="100%" stopColor="#075985" />
                </linearGradient>
            </defs>
            {/* Sky background */}
            <rect width="300" height="200" fill="url(#skyGr)" rx="12" />
            {/* Sea */}
            <rect x="0" y="200" width="300" height="100" fill="url(#seaGr)" rx="0 0 12 12" />
            <text x="150" y="260" textAnchor="middle" fill="#bae6fd" fontWeight="700" fontSize="13" opacity="0.8">OCEAN</text>
            {/* Sun */}
            {(isRunning || isDone) && (
                <circle cx="40" cy="40" r="25" fill="#fbbf24">
                    <animate attributeName="r" values="25;28;25" dur="2s" repeatCount="indefinite" />
                </circle>
            )}
            {!isRunning && !isDone && <circle cx="40" cy="40" r="25" fill="#fde68a" opacity="0.4" />}
            {/* Evaporation arrows */}
            {(isRunning || isDone) && (
                <g>
                    {[100, 150, 200].map((x, i) => (
                        <g key={i}>
                            <line x1={x} y1="200" x2={x} y2="130" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" opacity="0.6">
                                <animate attributeName="y2" values="200;130" dur="1s" begin={`${i * 0.2}s`} fill="freeze" />
                            </line>
                            <circle cx={x} cy={130} r="3" fill="#38bdf8" opacity="0.8">
                                <animate attributeName="cy" values="200;130;90" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.8;0.3;0" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                            </circle>
                        </g>
                    ))}
                    <text x="160" y="178" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="10" opacity="0.8">↑ Evaporation</text>
                </g>
            )}
            {/* Cloud */}
            {isDone && (
                <g>
                    <ellipse cx="220" cy="55" rx="40" ry="20" fill="#fff" opacity="0.95">
                        <animate attributeName="cx" values="220;225;220" dur="4s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="240" cy="48" rx="25" ry="15" fill="#fff" opacity="0.9" />
                    <ellipse cx="200" cy="50" rx="22" ry="14" fill="#fff" opacity="0.9" />
                    <text x="220" y="38" textAnchor="middle" fill="#475569" fontWeight="700" fontSize="9">Condensation ☁️</text>
                    {/* Rain drops */}
                    {[210, 225, 240].map((x, i) => (
                        <ellipse key={i} cx={x} cy={80} rx="2" ry="4" fill="#38bdf8">
                            <animate attributeName="cy" values="75;200" dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0.3" dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite" />
                        </ellipse>
                    ))}
                    <text x="255" y="140" textAnchor="middle" fill="#1e40af" fontWeight="700" fontSize="9">↓ Precipitation</text>
                </g>
            )}
            {/* Mountain for collection */}
            {isDone && (
                <g>
                    <polygon points="0,200 40,140 80,200" fill="#065f46" opacity="0.6" />
                    <text x="40" y="195" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="8">Collection</text>
                </g>
            )}
            {/* Labels */}
            {!isRunning && !isDone && <text x="150" y="150" textAnchor="middle" fill="#475569" fontWeight="700" fontSize="14">Click to start the cycle</text>}
        </svg>
    );
}

/* GROUNDWATER SCENE */
function GroundScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    return (
        <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%', maxHeight: 320 }}>
            <defs>
                <linearGradient id="soilGr5" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#92400e" /><stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="conGr" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9ca3af" /><stop offset="100%" stopColor="#6b7280" />
                </linearGradient>
            </defs>
            <text x="150" y="22" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">Forest vs City</text>
            {/* FOREST SIDE */}
            <rect x="5" y="30" width="140" height="20" rx="4" fill="#10b981" opacity="0.2" />
            <text x="75" y="44" textAnchor="middle" fill="#059669" fontWeight="800" fontSize="10">🌳 Forest</text>
            {/* Soil layers */}
            <rect x="5" y="55" width="140" height="80" rx="8" fill="url(#soilGr5)" />
            <rect x="5" y="135" width="140" height="40" rx="0 0 8 8" fill="#a16207" opacity="0.4" />
            {/* Aquifer */}
            <rect x="5" y="175" width="140" height="30" rx="8" fill="#0ea5e9" opacity={isDone ? 0.8 : 0.2}>
                {isDone && <animate attributeName="opacity" from="0.2" to="0.8" dur="1s" fill="freeze" />}
            </rect>
            {isDone && <text x="75" y="195" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="10">Aquifer ✓</text>}
            {/* Trees */}
            <polygon points="35,55 45,25 55,55" fill="#16a34a" />
            <polygon points="85,55 95,30 105,55" fill="#15803d" />
            {/* Rain drops seeping */}
            {(isRunning || isDone) && (
                <g>
                    {[30, 55, 80, 105].map((x, i) => (
                        <circle key={i} cx={x} cy={60} r="3" fill="#38bdf8">
                            <animate attributeName="cy" values="55;175" dur={`${1.5 + i * 0.2}s`} repeatCount={isDone ? "indefinite" : "3"} />
                            <animate attributeName="opacity" values="1;0.2" dur={`${1.5 + i * 0.2}s`} repeatCount={isDone ? "indefinite" : "3"} />
                        </circle>
                    ))}
                </g>
            )}
            {/* CITY SIDE */}
            <rect x="155" y="30" width="140" height="20" rx="4" fill="#6b7280" opacity="0.2" />
            <text x="225" y="44" textAnchor="middle" fill="#4b5563" fontWeight="800" fontSize="10">🏙️ City</text>
            {/* Concrete layer */}
            <rect x="155" y="55" width="140" height="15" rx="4" fill="url(#conGr)" />
            <rect x="155" y="70" width="140" height="65" rx="0" fill="url(#soilGr5)" opacity="0.6" />
            <rect x="155" y="135" width="140" height="40" rx="0 0 8 8" fill="#a16207" opacity="0.3" />
            {/* Dry aquifer */}
            <rect x="155" y="175" width="140" height="30" rx="8" fill="#0ea5e9" opacity={isDone ? 0.15 : 0.1} />
            {isDone && <text x="225" y="195" textAnchor="middle" fill="#94a3b8" fontWeight="700" fontSize="10">Low Water ✗</text>}
            {/* Buildings */}
            <rect x="170" y="30" width="20" height="25" rx="2" fill="#9ca3af" />
            <rect x="200" y="20" width="20" height="35" rx="2" fill="#6b7280" />
            <rect x="260" y="35" width="20" height="20" rx="2" fill="#9ca3af" />
            {/* Runoff arrows for city */}
            {(isRunning || isDone) && (
                <g>
                    {[175, 210, 245].map((x, i) => (
                        <circle key={i} cx={x} cy={55} r="3" fill="#38bdf8">
                            <animate attributeName="cx" values={`${x};${x + 30}`} dur="1s" repeatCount={isDone ? "indefinite" : "3"} />
                            <animate attributeName="opacity" values="1;0" dur="1s" repeatCount={isDone ? "indefinite" : "3"} />
                        </circle>
                    ))}
                    {isDone && <text x="225" y="62" textAnchor="middle" fill="#ef4444" fontWeight="700" fontSize="8">→ Runoff</text>}
                </g>
            )}
            {/* Comparison text */}
            {isDone && (
                <g>
                    <text x="75" y="230" textAnchor="middle" fill="#10b981" fontWeight="800" fontSize="11">10× more seepage</text>
                    <text x="225" y="230" textAnchor="middle" fill="#ef4444" fontWeight="800" fontSize="11">Water runs off!</text>
                </g>
            )}
        </svg>
    );
}

/* RIVER FLOW SCENE */
function RiverScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    return (
        <svg viewBox="0 0 300 280" style={{ width: '100%', height: '100%', maxHeight: 310 }}>
            <defs>
                <linearGradient id="mtGr" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#475569" /><stop offset="70%" stopColor="#065f46" />
                </linearGradient>
            </defs>
            <text x="150" y="20" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">Mountain to Ocean</text>
            {/* Mountain */}
            <polygon points="5,200 60,40 115,200" fill="url(#mtGr)" />
            <polygon points="50,200 80,80 115,200" fill="#065f46" opacity="0.5" />
            {/* Snow cap */}
            <polygon points="48,55 60,40 72,55" fill="#fff" />
            {/* Plains */}
            <rect x="100" y="200" width="200" height="80" fill="#86efac" opacity="0.3" rx="8" />
            {/* River path */}
            {(isRunning || isDone) && (
                <path d="M 65,80 Q 90,130 120,170 Q 150,200 200,210 Q 250,215 290,220" fill="none" stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round" opacity="0.7">
                    <animate attributeName="stroke-dashoffset" values="500;0" dur="2s" fill="freeze" />
                    <animate attributeName="stroke-dasharray" values="0,500;500,0" dur="2s" fill="freeze" />
                </path>
            )}
            {/* Flow particles */}
            {isDone && (
                <g>
                    {[0, 1, 2, 3, 4].map(i => (
                        <circle key={i} r="3" fill="#38bdf8" opacity="0.8">
                            <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                                <mpath href="#riverPath5" />
                            </animateMotion>
                        </circle>
                    ))}
                    <path id="riverPath5" d="M 65,80 Q 90,130 120,170 Q 150,200 200,210 Q 250,215 290,220" fill="none" opacity="0" />
                </g>
            )}
            {/* Ocean */}
            {isDone && (
                <g>
                    <rect x="260" y="195" width="40" height="60" rx="6" fill="#0ea5e9" opacity="0.4" />
                    <text x="280" y="230" textAnchor="middle" fill="#0369a1" fontWeight="700" fontSize="9">Ocean</text>
                </g>
            )}
            {/* Labels */}
            {isDone && (
                <g>
                    <text x="60" y="35" textAnchor="middle" fill="#fff" fontWeight="800" fontSize="10">Source</text>
                    <text x="150" y="195" textAnchor="middle" fill="#059669" fontWeight="700" fontSize="10">Plains</text>
                    <text x="150" y="270" textAnchor="middle" fill="#0f172a" fontWeight="700" fontSize="11">Water flows HIGH → LOW (gravity)</text>
                </g>
            )}
            {!isRunning && !isDone && <text x="150" y="150" textAnchor="middle" fill="#94a3b8" fontWeight="700" fontSize="14">Click to release water</text>}
        </svg>
    );
}

/* AQUATIC LIFE SCENE */
function AquaticScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    return (
        <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%', maxHeight: 320 }}>
            <defs>
                <linearGradient id="pondGr" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#bae6fd" /><stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
            </defs>
            {/* Pond */}
            <rect width="300" height="300" rx="12" fill="url(#pondGr)" />
            <text x="150" y="25" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="14">Aquatic Ecosystem</text>
            {/* Fish */}
            {(isRunning || isDone) && (
                <g>
                    <ellipse cx="80" cy="120" rx="25" ry="12" fill="#f59e0b">
                        <animate attributeName="cx" values="80;220;80" dur="5s" repeatCount="indefinite" />
                    </ellipse>
                    <polygon points="53,120 42,110 42,130" fill="#f59e0b">
                        <animate attributeName="points" values="53,120 42,110 42,130;193,120 182,110 182,130;53,120 42,110 42,130" dur="5s" repeatCount="indefinite" />
                    </polygon>
                    <circle cx="90" cy="117" r="2" fill="#0f172a">
                        <animate attributeName="cx" values="90;230;90" dur="5s" repeatCount="indefinite" />
                    </circle>
                    <text x="80" y="145" fill="#fff" fontWeight="700" fontSize="9" opacity="0.8">
                        🐟 Gills + Fins
                        <animate attributeName="x" values="80;220;80" dur="5s" repeatCount="indefinite" />
                    </text>
                </g>
            )}
            {/* Frog */}
            {isDone && (
                <g>
                    <ellipse cx="230" cy="70" rx="18" ry="12" fill="#22c55e" />
                    <circle cx="222" cy="62" r="4" fill="#bbf7d0" />
                    <circle cx="238" cy="62" r="4" fill="#bbf7d0" />
                    <circle cx="222" cy="62" r="2" fill="#0f172a" />
                    <circle cx="238" cy="62" r="2" fill="#0f172a" />
                    <text x="230" y="95" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="9">🐸 Amphibian</text>
                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze" />
                </g>
            )}
            {/* Water lily */}
            {isDone && (
                <g>
                    <ellipse cx="60" cy="60" rx="22" ry="8" fill="#22c55e" opacity="0.7" />
                    <circle cx="60" cy="55" r="6" fill="#fda4af" />
                    <text x="60" y="80" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="9">🌸 Waxy coating</text>
                </g>
            )}
            {/* Duck */}
            {isDone && (
                <g>
                    <ellipse cx="170" cy="45" rx="16" ry="10" fill="#f97316" />
                    <circle cx="180" cy="40" r="7" fill="#f97316" />
                    <polygon points="187,39 195,38 187,42" fill="#eab308" />
                    <text x="170" y="68" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="9">🦆 Webbed feet</text>
                </g>
            )}
            {/* Submerged plant */}
            {isDone && (
                <g>
                    {[140, 150, 160].map((x, i) => (
                        <line key={i} x1={x} y1="300" x2={x + (i - 1) * 5} y2={240 - i * 15} stroke="#16a34a" strokeWidth="2" opacity="0.6">
                            <animate attributeName="x2" values={`${x + (i - 1) * 5};${x + (i - 1) * 5 + 3};${x + (i - 1) * 5}`} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                        </line>
                    ))}
                    <text x="150" y="230" textAnchor="middle" fill="#bbf7d0" fontWeight="700" fontSize="9">🌿 Submerged plant</text>
                </g>
            )}
            {/* Food chain */}
            {isDone && (
                <text x="150" y="285" textAnchor="middle" fill="#fff" fontWeight="800" fontSize="11" opacity="0.9">
                    Food Chain: Algae → Fish → Frog → Eagle 🦅
                </text>
            )}
            {/* Bubbles */}
            {(isRunning || isDone) && (
                <g>
                    {[0, 1, 2, 3, 4].map(i => (
                        <circle key={i} cx={50 + i * 55} cy={250} r={3 + i} fill="#fff" opacity="0.3">
                            <animate attributeName="cy" values="280;40" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
                            <animate attributeName="opacity" values="0.3;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
                        </circle>
                    ))}
                </g>
            )}
            {!isRunning && !isDone && <text x="150" y="160" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">Click to explore life</text>}
        </svg>
    );
}

/* ── Scene Router ── */
function LabScene({ experimentId, phase }) {
    switch (experimentId) {
        case 'availability': return <AvailabilityScene phase={phase} />;
        case 'states': return <StatesScene phase={phase} />;
        case 'cycle': return <CycleScene phase={phase} />;
        case 'ground': return <GroundScene phase={phase} />;
        case 'river': return <RiverScene phase={phase} />;
        case 'aquatic': return <AquaticScene phase={phase} />;
        default: return null;
    }
}

/* ── Main Virtual Lab Component ─────────────────────── */
export default function WELVirtualLab() {
    const navigate = useNavigate();
    const BASE = '/middle/grade/5/science/water-essence-of-life';
    const [activeIdx, setActiveIdx] = useState(0);
    const [phase, setPhase] = useState('idle');
    const timerRef = useRef(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);
    useEffect(() => { setPhase('idle'); return () => clearTimeout(timerRef.current); }, [activeIdx]);

    const exp = EXPERIMENTS[activeIdx];

    const runExperiment = () => {
        if (phase !== 'idle') return;
        setPhase('running');
        timerRef.current = setTimeout(() => setPhase('done'), 2500);
    };

    const resetExperiment = () => { setPhase('idle'); };

    return (
        <div className={styles['wel-page']}>
            <nav className={styles['wel-nav']}>
                <button className={styles['wel-nav-back']} onClick={() => navigate(BASE)}>← Dashboard</button>
                <div className={styles['wel-nav-links']}>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/core-concepts`)}>🎯 Core Concepts</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/connectomics`)}>🔗 Connectomics</button>
                    <button className={`${styles['wel-nav-link']} ${styles['active']}`}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['wel-hero']}>
                <h1 className={styles['wel-hero-title']}>Virtual <span style={{ color: '#38bdf8' }}>Lab</span></h1>
                <p className={styles['wel-hero-sub']}>Perform virtual water experiments with smooth animations!</p>
            </div>

            <div style={{ maxWidth: 1100, margin: '30px auto', padding: '0 24px 60px' }}>
                {/* Experiment selector */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 30, flexWrap: 'wrap' }}>
                    {EXPERIMENTS.map((e, i) => (
                        <button key={e.id} onClick={() => setActiveIdx(i)} style={{
                            padding: '10px 18px', borderRadius: 100, fontWeight: 800, fontSize: 13,
                            background: activeIdx === i ? e.color : '#fff',
                            color: activeIdx === i ? '#fff' : '#334155',
                            border: activeIdx === i ? 'none' : '2px solid #e2e8f0',
                            boxShadow: activeIdx === i ? `0 6px 20px ${e.color}40` : 'none',
                            cursor: 'pointer', transition: 'all 0.3s ease',
                        }}>
                            {e.emoji} {e.title.split(' ')[0]}
                        </button>
                    ))}
                </div>

                {/* Lab workspace */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
                    {/* LEFT: SVG Lab */}
                    <div style={{
                        background: '#fff', borderRadius: 24, padding: 24,
                        border: '1px solid rgba(0,0,0,0.04)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 12,
                                background: `${exp.color}15`, display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: 20,
                            }}>{exp.emoji}</div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 800, color: exp.color, textTransform: 'uppercase', letterSpacing: 1 }}>{exp.subtitle}</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{exp.title}</div>
                            </div>
                        </div>

                        <div style={{ background: exp.colorLight, borderRadius: 16, padding: 16, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LabScene experimentId={exp.id} phase={phase} />
                        </div>

                        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                            <button onClick={runExperiment} disabled={phase !== 'idle'} style={{
                                flex: 1, padding: '12px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: 14,
                                background: phase === 'idle' ? exp.color : '#e2e8f0',
                                color: phase === 'idle' ? '#fff' : '#94a3b8',
                                cursor: phase === 'idle' ? 'pointer' : 'not-allowed',
                                boxShadow: phase === 'idle' ? `0 4px 15px ${exp.color}40` : 'none',
                                transition: 'all 0.3s ease',
                            }}>
                                {phase === 'idle' ? exp.actionLabel : phase === 'running' ? '⏳ Running...' : '✅ Complete'}
                            </button>
                            {phase === 'done' && (
                                <button onClick={resetExperiment} style={{
                                    padding: '12px 20px', borderRadius: 12, background: '#fff',
                                    border: '2px solid #e2e8f0', fontWeight: 700, cursor: 'pointer',
                                }}>🔄 Reset</button>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Info panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, color: exp.color, marginBottom: 8 }}>{exp.type}</div>
                            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#475569', margin: 0 }}>{exp.desc}</p>
                        </div>

                        <div style={{
                            background: `${exp.color}08`, borderRadius: 20, padding: 24,
                            border: `1px solid ${exp.color}15`,
                        }}>
                            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, color: exp.color, marginBottom: 8 }}>Equation</div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: '#0f172a', padding: '12px 16px', borderRadius: 12, background: '#fff', border: '1px solid rgba(0,0,0,0.04)' }}>
                                {exp.equation}
                            </div>
                        </div>

                        {phase === 'done' && (
                            <div style={{
                                background: '#fff', borderRadius: 20, padding: 24,
                                border: `2px solid ${exp.color}30`,
                                boxShadow: `0 8px 24px ${exp.color}15`,
                                animation: 'fadeIn 0.4s ease',
                            }}>
                                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, color: exp.color, marginBottom: 10 }}>🔬 Observation</div>
                                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#334155', margin: 0 }}>{exp.observation}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
