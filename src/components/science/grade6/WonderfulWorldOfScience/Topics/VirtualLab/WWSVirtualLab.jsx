import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../WonderfulWorldOfScienceDashboard.module.css';

/* ─── Experiment Data ─────────────────────────────────── */
const EXPERIMENTS = [
    {
        id: 'plant',
        title: 'Plant Growth Simulator',
        subtitle: 'Activity 1',
        emoji: '🌱',
        color: '#10b981',
        colorLight: '#ecfdf5',
        actionLabel: '🌱 Plant the Seed',
        equation: 'Seed + Water + Sunlight → Plant',
        type: 'Biology · Growth',
        desc: 'Place a seed in soil, add water and sunlight, and watch it grow into a beautiful plant!',
        observation: 'The seed absorbs water and swells up. A tiny root pushes down into the soil. Then a green shoot breaks through the surface and grows upwards towards the sunlight. Leaves unfold and the plant grows taller — this process is called germination!',
    },
    {
        id: 'water',
        title: 'Water State Changes',
        subtitle: 'Activity 2',
        emoji: '🧊',
        color: '#0ea5e9',
        colorLight: '#f0f9ff',
        actionLabel: '🔥 Heat the Water',
        equation: 'Ice → Water → Steam (Solid → Liquid → Gas)',
        type: 'Chemistry · States of Matter',
        desc: 'Heat an ice cube in a beaker and watch it change from solid to liquid to gas!',
        observation: 'The ice cube slowly melts into liquid water at 0°C. As the water heats up, tiny bubbles appear on the walls of the beaker. At 100°C, the water boils vigorously and turns into invisible steam (water vapour). The three states of matter are visible!',
    },
    {
        id: 'sort',
        title: 'Material Sorting Lab',
        subtitle: 'Activity 3',
        emoji: '🏷️',
        color: '#f59e0b',
        colorLight: '#fffbeb',
        actionLabel: '🏷️ Sort the Materials',
        equation: 'Objects → Natural / Man-made Groups',
        type: 'General Science · Classification',
        desc: 'Look at different objects and sort them into natural and man-made categories!',
        observation: 'We classified objects into two groups: Natural (wood, cotton, silk, wool, leather) and Man-made (plastic, glass, nylon, rubber, metal). Natural materials come from plants, animals, or the earth, while man-made materials are created in factories!',
    },
    {
        id: 'rain',
        title: 'Rain Cycle Simulation',
        subtitle: 'Activity 4',
        emoji: '🌧️',
        color: '#8b5cf6',
        colorLight: '#f5f3ff',
        actionLabel: '☀️ Start the Sun',
        equation: 'Sun → Evaporation → Clouds → Rain',
        type: 'Earth Science · Water Cycle',
        desc: 'Watch how the sun heats water, forms clouds, and creates rain in the water cycle!',
        observation: 'The sun heats the water in rivers, lakes, and oceans. Water evaporates and rises as invisible vapour. High up, the cool air causes vapour to condense into tiny water droplets, forming clouds. When clouds get heavy, water falls as rain. Rain collects in rivers and the cycle repeats — forever!',
    },
];

/* ─── SVG Lab Scenes ─────────────────────────────────── */

/* PLANT GROWTH SCENE */
function PlantScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 280 290" style={{ width: '100%', height: '100%', maxHeight: 310 }}>
            <defs>
                <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#92400e" />
                    <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="potGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#dc8850" />
                    <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                    <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Sky */}
            <rect x="0" y="0" width="280" height="200" fill="#e0f2fe" rx="4" />

            {/* Sun */}
            {(isRunning || isDone) && (
                <g>
                    <circle cx="230" cy="50" r="30" fill="url(#sunGrad)">
                        {isRunning && <animateTransform attributeName="transform" type="scale" values="1;1.1;1" begin="0s" dur="2s" repeatCount="indefinite" additive="sum" />}
                    </circle>
                    <circle cx="230" cy="50" r="16" fill="#fbbf24" />
                    {/* Sun rays */}
                    {[0,45,90,135,180,225,270,315].map((angle, i) => (
                        <line key={i}
                            x1={230 + 22 * Math.cos(angle * Math.PI / 180)}
                            y1={50 + 22 * Math.sin(angle * Math.PI / 180)}
                            x2={230 + 34 * Math.cos(angle * Math.PI / 180)}
                            y2={50 + 34 * Math.sin(angle * Math.PI / 180)}
                            stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
                            opacity={isRunning ? undefined : "0.7"}
                        >
                            {isRunning && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.15}s`} />}
                        </line>
                    ))}
                </g>
            )}

            {/* Pot */}
            <path d="M90,200 L80,260 L200,260 L190,200 Z" fill="url(#potGrad)" stroke="#92400e" strokeWidth="1.5" />
            <rect x="75" y="193" width="130" height="12" rx="4" fill="#dc8850" stroke="#92400e" strokeWidth="1" />

            {/* Soil */}
            <path d="M92,205 L82,255 L198,255 L188,205 Z" fill="url(#soilGrad)" />

            {/* Seed (idle state) */}
            {phase === 'idle' && (
                <g>
                    <ellipse cx="140" cy="222" rx="8" ry="5" fill="#92400e" stroke="#78350f" strokeWidth="1" />
                    <text x="140" y="195" textAnchor="middle" fontSize="10" fill="#78350f" fontWeight="700">Seed</text>
                </g>
            )}

            {/* Sprouting (running) */}
            {isRunning && (
                <g>
                    {/* Root */}
                    <line x1="140" y1="222" x2="140" y2="245" stroke="#a16207" strokeWidth="2">
                        <animate attributeName="y2" from="222" to="245" dur="1s" fill="freeze" />
                    </line>
                    {/* Stem coming up */}
                    <line x1="140" y1="222" x2="140" y2="170" stroke="#16a34a" strokeWidth="3" strokeLinecap="round">
                        <animate attributeName="y2" from="222" to="170" dur="1.5s" fill="freeze" />
                    </line>
                    {/* First leaf */}
                    <ellipse cx="152" cy="185" rx="12" ry="6" fill="#22c55e" transform="rotate(-30 152 185)" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1s" fill="freeze" />
                    </ellipse>
                    {/* Second leaf */}
                    <ellipse cx="128" cy="180" rx="12" ry="6" fill="#22c55e" transform="rotate(30 128 180)" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.3s" fill="freeze" />
                    </ellipse>
                    {/* Water drops */}
                    {[50, 70, 90].map((x, i) => (
                        <circle key={i} cx={x} cy="160" r="3" fill="#60a5fa" opacity="0.7">
                            <animate attributeName="cy" from="140" to="210" dur="1.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                        </circle>
                    ))}
                </g>
            )}

            {/* Full plant (done) */}
            {isDone && (
                <g>
                    {/* Root system */}
                    <line x1="140" y1="222" x2="130" y2="248" stroke="#a16207" strokeWidth="1.5" />
                    <line x1="140" y1="222" x2="150" y2="245" stroke="#a16207" strokeWidth="1.5" />
                    <line x1="140" y1="222" x2="140" y2="250" stroke="#a16207" strokeWidth="2" />
                    {/* Main stem */}
                    <line x1="140" y1="222" x2="140" y2="120" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
                    {/* Branches */}
                    <line x1="140" y1="180" x2="165" y2="165" stroke="#16a34a" strokeWidth="2.5" />
                    <line x1="140" y1="160" x2="115" y2="148" stroke="#16a34a" strokeWidth="2.5" />
                    <line x1="140" y1="140" x2="160" y2="130" stroke="#16a34a" strokeWidth="2" />
                    {/* Leaves */}
                    <ellipse cx="170" cy="162" rx="16" ry="8" fill="#22c55e" transform="rotate(-20 170 162)" />
                    <ellipse cx="108" cy="145" rx="16" ry="8" fill="#22c55e" transform="rotate(25 108 145)" />
                    <ellipse cx="165" cy="127" rx="14" ry="7" fill="#4ade80" transform="rotate(-15 165 127)" />
                    <ellipse cx="145" cy="118" rx="12" ry="6" fill="#4ade80" transform="rotate(10 145 118)" />
                    <ellipse cx="135" cy="115" rx="10" ry="5" fill="#86efac" transform="rotate(-5 135 115)" />
                    {/* Flower */}
                    <circle cx="140" cy="108" r="8" fill="#f472b6" />
                    <circle cx="140" cy="108" r="4" fill="#fbbf24" />
                </g>
            )}

            {/* Labels */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                <text x="140" y="275" textAnchor="middle">Flower Pot</text>
                {isDone && <text x="140" y="100" textAnchor="middle" fill="#16a34a" fontSize="10">🌸 Fully Grown Plant!</text>}
                {isRunning && <text x="60" y="135" textAnchor="middle" fill="#3b82f6" fontSize="9">💧 Water</text>}
            </g>
        </svg>
    );
}

/* WATER STATE CHANGES SCENE */
function WaterScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 280 290" style={{ width: '100%', height: '100%', maxHeight: 310 }}>
            <defs>
                <linearGradient id="beakerGradW" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(148,163,184,0.15)" />
                    <stop offset="100%" stopColor="rgba(148,163,184,0.25)" />
                </linearGradient>
                <linearGradient id="flameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
            </defs>

            {/* Background */}
            <rect x="0" y="0" width="280" height="290" fill="#f8fafc" rx="4" />

            {/* Bunsen burner base */}
            <rect x="115" y="250" width="50" height="12" rx="3" fill="#94a3b8" />
            <rect x="132" y="220" width="16" height="35" rx="2" fill="#94a3b8" />

            {/* Flame */}
            {(isRunning || isDone) && (
                <g>
                    <ellipse cx="140" cy="210" rx="10" ry="18" fill="url(#flameGrad)">
                        {isRunning && <animate attributeName="ry" values="18;22;16;20;18" dur="0.6s" repeatCount="indefinite" />}
                    </ellipse>
                    <ellipse cx="140" cy="208" rx="5" ry="10" fill="#fef3c7">
                        {isRunning && <animate attributeName="ry" values="10;13;9;11;10" dur="0.5s" repeatCount="indefinite" />}
                    </ellipse>
                </g>
            )}

            {/* Beaker */}
            <path d="M100,120 L100,200 Q100,210 110,210 L170,210 Q180,210 180,200 L180,120" fill="url(#beakerGradW)" stroke="#94a3b8" strokeWidth="2" />
            {/* Beaker rim */}
            <line x1="95" y1="120" x2="185" y2="120" stroke="#94a3b8" strokeWidth="2.5" />

            {/* Ice cube (idle) */}
            {phase === 'idle' && (
                <g>
                    <rect x="120" y="155" width="40" height="35" rx="5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="128" y1="160" x2="128" y2="184" stroke="#93c5fd" strokeWidth="1" />
                    <line x1="138" y1="158" x2="138" y2="186" stroke="#93c5fd" strokeWidth="1" />
                    <line x1="148" y1="160" x2="148" y2="182" stroke="#93c5fd" strokeWidth="1" />
                    <text x="140" y="150" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="700">Ice (0°C)</text>
                </g>
            )}

            {/* Water (running — melting + bubbles) */}
            {isRunning && (
                <g>
                    {/* Water level */}
                    <rect x="102" y="155" width="76" height="53" fill="#bfdbfe" opacity="0.6" rx="2" />
                    {/* Small ice chunk melting */}
                    <rect x="128" y="152" width="24" height="15" rx="4" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1">
                        <animate attributeName="width" from="24" to="6" dur="2s" fill="freeze" />
                        <animate attributeName="opacity" from="1" to="0.3" dur="2s" fill="freeze" />
                    </rect>
                    {/* Bubbles */}
                    {[120, 135, 150, 160, 115, 145].map((x, i) => (
                        <circle key={i} cx={x} cy="190" r={2 + (i % 2)} fill="#93c5fd" opacity="0.7">
                            <animate attributeName="cy" from="200" to="140" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.8" to="0" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
                        </circle>
                    ))}
                    {/* Thermometer */}
                    <rect x="186" y="130" width="8" height="80" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
                    <rect x="188" y="170" width="4" height="38" rx="2" fill="#ef4444">
                        <animate attributeName="y" from="195" to="140" dur="2.5s" fill="freeze" />
                        <animate attributeName="height" from="13" to="68" dur="2.5s" fill="freeze" />
                    </rect>
                    <circle cx="190" cy="212" r="6" fill="#ef4444" />
                </g>
            )}

            {/* Steam (done) */}
            {isDone && (
                <g>
                    {/* Water level lower */}
                    <rect x="102" y="175" width="76" height="33" fill="#bfdbfe" opacity="0.4" rx="2" />
                    {/* Steam wisps */}
                    {[120, 140, 160].map((x, i) => (
                        <g key={i}>
                            <path d={`M${x},120 Q${x-10},100 ${x},80 Q${x+10},60 ${x},40`}
                                fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" opacity="0.5">
                                <animate attributeName="opacity" values="0.6;0.2;0.6" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                                <animateTransform attributeName="transform" type="translate" values="0,0;0,-10;0,0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                            </path>
                        </g>
                    ))}
                    {/* Vigorous bubbles */}
                    {[110, 125, 140, 155, 170].map((x, i) => (
                        <circle key={i} cx={x} cy="190" r={2 + (i % 3)} fill="#60a5fa" opacity="0.6">
                            <animate attributeName="cy" from="205" to="125" dur={`${0.6 + i * 0.15}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.7" to="0" dur={`${0.6 + i * 0.15}s`} repeatCount="indefinite" />
                        </circle>
                    ))}
                    <text x="140" y="35" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700">💨 Steam (100°C)</text>
                </g>
            )}

            {/* Labels */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                <text x="140" y="280" textAnchor="middle">Bunsen Burner</text>
                <line x1="80" y1="165" x2="98" y2="165" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="75" y="168" textAnchor="end">Beaker</text>
            </g>
        </svg>
    );
}

/* MATERIAL SORTING SCENE */
function SortScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    const naturalItems = [
        { label: '🪵 Wood', x: 60, y: 195 },
        { label: '🧶 Cotton', x: 60, y: 215 },
        { label: '🌿 Leaf', x: 60, y: 235 },
    ];
    const manMadeItems = [
        { label: '🥤 Plastic', x: 195, y: 195 },
        { label: '🪟 Glass', x: 195, y: 215 },
        { label: '🔩 Metal', x: 195, y: 235 },
    ];
    const unsorted = [
        { label: '🪵', x: 80 }, { label: '🥤', x: 110 }, { label: '🌿', x: 140 },
        { label: '🪟', x: 170 }, { label: '🧶', x: 95 }, { label: '🔩', x: 160 },
    ];

    return (
        <svg viewBox="0 0 280 290" style={{ width: '100%', height: '100%', maxHeight: 310 }}>
            <rect x="0" y="0" width="280" height="290" fill="#fffbeb" rx="4" />

            {/* Table top */}
            <rect x="20" y="130" width="240" height="8" rx="3" fill="#d97706" />
            <rect x="30" y="138" width="220" height="4" fill="#b45309" rx="1" />

            {phase === 'idle' && (
                <g>
                    {/* Scattered items on table */}
                    {unsorted.map((item, i) => (
                        <text key={i} x={item.x} y={120} fontSize="24" textAnchor="middle">{item.label}</text>
                    ))}
                    <text x="140" y="170" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="700">
                        Objects scattered on the table
                    </text>
                </g>
            )}

            {isRunning && (
                <g>
                    {/* Items flying to groups */}
                    {unsorted.map((item, i) => {
                        const targetX = i % 2 === 0 ? 60 : 210;
                        const targetY = 200 + (Math.floor(i / 2)) * 20;
                        return (
                            <text key={i} x={item.x} y={120} fontSize="20" textAnchor="middle">
                                {item.label}
                                <animate attributeName="x" from={item.x} to={targetX} dur="1.5s" fill="freeze" begin={`${i * 0.3}s`} />
                                <animate attributeName="y" from="120" to={targetY} dur="1.5s" fill="freeze" begin={`${i * 0.3}s`} />
                            </text>
                        );
                    })}
                    {/* Group labels appearing */}
                    <rect x="15" y="165" width="110" height="90" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze" />
                    </rect>
                    <text x="70" y="183" textAnchor="middle" fontSize="10" fontWeight="800" fill="#16a34a" opacity="0">
                        NATURAL
                        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze" />
                    </text>
                    <rect x="155" y="165" width="110" height="90" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze" />
                    </rect>
                    <text x="210" y="183" textAnchor="middle" fontSize="10" fontWeight="800" fill="#2563eb" opacity="0">
                        MAN-MADE
                        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze" />
                    </text>
                </g>
            )}

            {isDone && (
                <g>
                    {/* Natural group */}
                    <rect x="15" y="165" width="110" height="95" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                    <text x="70" y="183" textAnchor="middle" fontSize="10" fontWeight="800" fill="#16a34a">🌿 NATURAL</text>
                    {naturalItems.map((item, i) => (
                        <text key={i} x={item.x} y={item.y} fontSize="11" fontWeight="600" fill="#166534">{item.label}</text>
                    ))}

                    {/* Man-made group */}
                    <rect x="155" y="165" width="110" height="95" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    <text x="210" y="183" textAnchor="middle" fontSize="10" fontWeight="800" fill="#2563eb">🏭 MAN-MADE</text>
                    {manMadeItems.map((item, i) => (
                        <text key={i} x={item.x} y={item.y} fontSize="11" fontWeight="600" fill="#1e40af">{item.label}</text>
                    ))}

                    {/* Check marks */}
                    <text x="140" y="280" textAnchor="middle" fontSize="11" fill="#16a34a" fontWeight="800">✅ All objects sorted!</text>
                </g>
            )}

            {/* Title */}
            <text x="140" y="25" textAnchor="middle" fontSize="12" fontWeight="800" fill="#92400e" fontFamily="Outfit,sans-serif">
                Material Classification
            </text>
        </svg>
    );
}

/* RAIN CYCLE SCENE */
function RainScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 280 290" style={{ width: '100%', height: '100%', maxHeight: 310 }}>
            <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isDone ? '#93c5fd' : '#bfdbfe'} />
                    <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="waterBody" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
            </defs>

            {/* Sky */}
            <rect x="0" y="0" width="280" height="210" fill="url(#skyGrad)" rx="4" />

            {/* Ground */}
            <rect x="0" y="210" width="280" height="80" fill="#86efac" rx="0" />
            <path d="M0,210 Q70,200 140,210 Q210,220 280,210 L280,230 Q210,240 140,230 Q70,220 0,230 Z" fill="#4ade80" />

            {/* Water body (lake) */}
            <ellipse cx="140" cy="245" rx="80" ry="20" fill="url(#waterBody)" opacity="0.7" />

            {/* Mountains */}
            <polygon points="0,210 40,160 80,210" fill="#6ee7b7" />
            <polygon points="200,210 240,150 280,210" fill="#6ee7b7" />

            {/* Sun */}
            <circle cx="50" cy="45" r="22" fill="#fbbf24" />
            {(isRunning || isDone) && [0,45,90,135,180,225,270,315].map((angle, i) => (
                <line key={i}
                    x1={50 + 26 * Math.cos(angle * Math.PI / 180)}
                    y1={45 + 26 * Math.sin(angle * Math.PI / 180)}
                    x2={50 + 36 * Math.cos(angle * Math.PI / 180)}
                    y2={45 + 36 * Math.sin(angle * Math.PI / 180)}
                    stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
                >
                    {isRunning && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" begin={`${i*0.15}s`} />}
                </line>
            ))}

            {/* Evaporation arrows (running) */}
            {isRunning && (
                <g>
                    {[110, 140, 170].map((x, i) => (
                        <g key={i}>
                            <line x1={x} y1="235" x2={x} y2="120" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4,4">
                                <animate attributeName="strokeDashoffset" from="20" to="0" dur="1.5s" repeatCount="indefinite" />
                            </line>
                            <polygon points={`${x-5},125 ${x},115 ${x+5},125`} fill="#60a5fa">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin={`${i*0.3}s`} />
                            </polygon>
                        </g>
                    ))}
                    <text x="180" y="175" fontSize="9" fill="#2563eb" fontWeight="700">Evaporation ↑</text>
                </g>
            )}

            {/* Clouds forming */}
            {(isRunning || isDone) && (
                <g>
                    <ellipse cx="160" cy="65" rx="40" ry="18" fill={isDone ? '#94a3b8' : '#e2e8f0'}>
                        {isRunning && <animate attributeName="rx" from="20" to="40" dur="2s" fill="freeze" />}
                    </ellipse>
                    <ellipse cx="145" cy="55" rx="30" ry="16" fill={isDone ? '#94a3b8' : '#e2e8f0'}>
                        {isRunning && <animate attributeName="rx" from="15" to="30" dur="2s" fill="freeze" />}
                    </ellipse>
                    <ellipse cx="175" cy="58" rx="25" ry="14" fill={isDone ? '#94a3b8' : '#e2e8f0'}>
                        {isRunning && <animate attributeName="rx" from="10" to="25" dur="2s" fill="freeze" />}
                    </ellipse>
                    {isRunning && <text x="160" y="95" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="700">☁️ Condensation</text>}
                </g>
            )}

            {/* Rain drops (done) */}
            {isDone && (
                <g>
                    {[130, 145, 160, 175, 150, 140, 165, 155, 170, 135].map((x, i) => (
                        <line key={i}
                            x1={x} y1={80 + (i % 3) * 10}
                            x2={x - 2} y2={85 + (i % 3) * 10 + 8}
                            stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
                        >
                            <animate attributeName="y1" from={70 + (i % 3) * 10} to={200} dur={`${0.8 + i * 0.1}s`} repeatCount="indefinite" />
                            <animate attributeName="y2" from={80 + (i % 3) * 10} to={210} dur={`${0.8 + i * 0.1}s`} repeatCount="indefinite" />
                        </line>
                    ))}
                    <text x="160" y="95" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="800">🌧️ Precipitation!</text>
                </g>
            )}

            {/* Labels */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                <text x="50" y="78" textAnchor="middle">☀️ Sun</text>
                <text x="140" y="270" textAnchor="middle">🏞️ Water Body</text>
                {isDone && <text x="140" y="285" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="800">The Water Cycle repeats forever! ♻️</text>}
            </g>
        </svg>
    );
}

const SVG_MAP = { plant: PlantScene, water: WaterScene, sort: SortScene, rain: RainScene };

/* ─── Main Component ─────────────────────────────────── */
export default function WWSVirtualLab() {
    const navigate = useNavigate();
    const BASE = '/middle/grade/6/science/wonderful-world-of-science';
    const [activeExp, setActiveExp] = useState(0);
    const [phase, setPhase] = useState('idle');

    const exp = EXPERIMENTS[activeExp];
    const LabScene = SVG_MAP[exp.id];

    const handleExpChange = (idx) => {
        setActiveExp(idx);
        setPhase('idle');
    };
    const handleRun = () => {
        setPhase('running');
        setTimeout(() => setPhase('done'), 2500);
    };
    const handleReset = () => setPhase('idle');

    return (
        <div className={styles['wws-page']}>
            <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}`}</style>

            <nav className={styles['wws-nav']}>
                <button className={styles['wws-nav-back']} onClick={() => navigate(BASE)}>
                    ← Back to Dashboard
                </button>
                <div className={styles['wws-nav-links']}>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/core-concepts`)}>🎯 Core Concepts</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/connectomics`)}>🔗 Connectomics</button>
                    <button className={`${styles['wws-nav-link']} ${styles['active']}`} onClick={() => navigate(`${BASE}/virtual-lab`)}>🧪 Virtual Lab</button>
                </div>
            </nav>

            {/* Hero */}
            <div className={styles['wws-lab-hero']}>
                <div className={styles['wws-lab-hero-bg']} />
                <div className={styles['wws-lab-hero-content']}>
                    <div className={styles['wws-lab-hero-badge']}>
                        🧬 HANDS-ON SCIENCE
                    </div>
                    <h1 className={styles['wws-lab-hero-title']}>
                        Interactive Virtual <span className={styles['wws-lab-hero-title-accent']}>Lab</span>
                    </h1>
                    <p className={styles['wws-lab-hero-sub']}>
                        Pick an experiment, run it, and observe the animated science live in your browser!
                    </p>
                </div>
            </div>

            <div className={styles['wws-lab-container']}>
                {/* Experiment Picker */}
                <div className={styles['wws-lab-picker']}>
                    {EXPERIMENTS.map((e, idx) => (
                        <button key={e.id} onClick={() => handleExpChange(idx)}
                            className={`${styles['wws-lab-picker-btn']} ${activeExp === idx ? styles['active'] : ''}`}
                            style={{ '--skill-color': e.color, '--skill-color-12': e.color + '12', '--skill-color-25': e.color + '25' }}
                        >
                            <div className={styles['wws-lab-picker-emoji']}>{e.emoji}</div>
                            <div className={styles['wws-lab-picker-title']}>{e.title}</div>
                            <div className={styles['wws-lab-picker-sub']}>{e.subtitle}</div>
                        </button>
                    ))}
                </div>

                {/* Main Lab Stage */}
                <div className={styles['wws-lab-stage']}>
                    {/* Experiment info card */}
                    <div className={styles['wws-card-exp']}>
                        <div className={styles['wws-card-exp-badge']} style={{ color: exp.color }}>EXPERIMENT</div>
                        <h2 className={styles['wws-card-exp-title']}>{exp.title}</h2>
                        <p className={styles['wws-card-exp-desc']}>{exp.desc}</p>
                        <div className={styles['wws-card-exp-type']}>
                            <div className={styles['wws-card-exp-type-label']}>Science Type</div>
                            <div className={styles['wws-card-exp-type-value']} style={{ color: exp.color }}>{exp.type}</div>
                        </div>
                    </div>

                    {/* Result panel */}
                    {phase === 'done' ? (
                        <div className={`${styles['wws-card-obs']} ${styles['done']}`} style={{ background: `linear-gradient(135deg, ${exp.colorLight}, #fff)`, border: `1.5px solid ${exp.color}40` }}>
                            <div className={styles['wws-card-obs-badge']}>
                                <span className={styles['wws-card-obs-badge-icon']}>✅</span>
                                <div className={styles['wws-card-obs-badge-text']} style={{ color: exp.color }}>Observation Log</div>
                            </div>
                            <p className={styles['wws-card-obs-desc']}>{exp.observation}</p>
                            <div className={styles['wws-card-obs-eq']} style={{ border: `1px solid ${exp.color}30` }}>
                                <div className={styles['wws-card-obs-eq-label']}>What Happened</div>
                                <div className={styles['wws-card-obs-eq-value']} style={{ color: exp.color }}>{exp.equation}</div>
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles['wws-card-obs']} ${styles['idle']}`}>
                            <div style={{ fontSize: 36, marginBottom: 10 }}>🔬</div>
                            <p style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                                Click <strong style={{ color: exp.color }}>{exp.actionLabel}</strong> to see the experiment and observations appear here.
                            </p>
                        </div>
                    )}

                    {/* Safety note */}
                    <div className={styles['wws-card-safety']}>
                        <span className={styles['wws-card-safety-icon']}>💡</span>
                        <div className={styles['wws-card-safety-text']}>
                            <strong>Fun Fact:</strong> You can try many of these experiments at home with the help of a parent or teacher! Always ask for permission first.
                        </div>
                    </div>

                    {/* Animated Scene */}
                    <div className={styles['wws-card-scene']}>
                        {/* Title bar */}
                        <div className={styles['wws-card-scene-titlebar']}>
                            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
                                <div key={i} className={styles['wws-card-scene-title-circle']} style={{ background: c }} />
                            ))}
                            <span className={styles['wws-card-scene-title-text']}>
                                lab.scene({exp.id})
                            </span>
                        </div>
                        {/* Scene canvas */}
                        <div className={styles['wws-card-scene-canvas']} style={{
                            background: phase === 'running'
                                ? `linear-gradient(180deg, ${exp.colorLight}, #fff)`
                                : '#fafafa'
                        }}>
                            <LabScene phase={phase} />
                        </div>
                        {/* Controls */}
                        <div className={styles['wws-card-scene-controls']}>
                            {phase === 'idle' && (
                                <button onClick={handleRun} className={`${styles['wws-btn-lab-action']} ${styles['run']}`} style={{ '--skill-color': exp.color, '--skill-color-bb': exp.color + 'bb', '--skill-color-40': exp.color + '40' }}>
                                    {exp.actionLabel}
                                </button>
                            )}
                            {phase === 'running' && (
                                <button disabled className={`${styles['wws-btn-lab-action']} ${styles['running']}`}>
                                    ⏳ Experiment Running...
                                </button>
                            )}
                            {phase === 'done' && (
                                <button onClick={handleReset} className={`${styles['wws-btn-lab-action']} ${styles['reset']}`}>
                                    🔄 Reset Experiment
                                </button>
                            )}
                            <button onClick={handleReset} className={styles['wws-btn-lab-icon']}>
                                ↺
                            </button>
                        </div>
                        {/* Status pill */}
                        <div style={{ padding: '0 20px 16px', textAlign: 'center' }}>
                            <div style={{
                                display: 'inline-block', padding: '4px 14px', borderRadius: 100,
                                background: phase === 'done' ? '#dcfce7' : phase === 'running' ? '#fef9c3' : '#f1f5f9',
                                fontSize: 11, fontWeight: 700,
                                color: phase === 'done' ? '#16a34a' : phase === 'running' ? '#d97706' : '#64748b'
                            }}>
                                {phase === 'idle' ? '● Ready' : phase === 'running' ? '● Experiment running...' : '● Complete'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
