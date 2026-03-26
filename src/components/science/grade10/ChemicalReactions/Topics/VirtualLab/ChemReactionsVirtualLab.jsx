import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../ChemicalReactionsDashboard.module.css';

/* ─── Experiment Data ─────────────────────────────────── */
const EXPERIMENTS = [
    {
        id: 'mg',
        title: 'Burning Magnesium',
        subtitle: 'Activity 1.1',
        emoji: '🔥',
        color: '#f59e0b',
        colorLight: '#fffbeb',
        actionLabel: '🔥 Light the Burner',
        equation: '2Mg(s) + O₂(g) → 2MgO(s) + Heat',
        type: 'Combination · Exothermic',
        desc: 'A magnesium ribbon is held with tongs and brought to the flame of a Bunsen burner.',
        observation: 'The magnesium ribbon burns with an intensely bright white dazzling flame. A white powdery ash (Magnesium oxide, MgO) is left behind on the watch glass.',
    },
    {
        id: 'zn',
        title: 'Zinc + Hydrochloric Acid',
        subtitle: 'Activity 1.3',
        emoji: '⚗️',
        color: '#0ea5e9',
        colorLight: '#f0f9ff',
        actionLabel: '🧪 Pour Acid into Flask',
        equation: 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑',
        type: 'Displacement · Exothermic',
        desc: 'Dilute hydrochloric acid is added to zinc granules in a conical flask fitted with a delivery tube.',
        observation: 'Bubbles of hydrogen gas rise vigorously around the zinc granules. The zinc slowly dissolves and the flask becomes warm — an exothermic reaction.',
    },
    {
        id: 'fe',
        title: 'Iron Nail + CuSO₄ Solution',
        subtitle: 'Activity 1.9',
        emoji: '🔩',
        color: '#10b981',
        colorLight: '#ecfdf5',
        actionLabel: '📌 Immerse Nail in Solution',
        equation: 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)',
        type: 'Single Displacement',
        desc: 'An iron nail is suspended by a thread inside a test tube filled with blue copper sulphate solution.',
        observation: 'The iron nail turns brownish-red as copper deposits on its surface. The deep blue colour of CuSO₄ fades to a pale blue-green (FeSO₄).',
    },
    {
        id: 'precip',
        title: 'Pb(NO₃)₂ + KI Precipitation',
        subtitle: 'Activity 1.10',
        emoji: '🔬',
        color: '#a855f7',
        colorLight: '#faf5ff',
        actionLabel: '🫗 Mix the Solutions',
        equation: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)',
        type: 'Double Displacement · Precipitation',
        desc: 'A solution of potassium iodide is poured into a beaker containing lead nitrate solution.',
        observation: 'A brilliant yellow precipitate of Lead Iodide (PbI₂) forms instantly. This insoluble salt settles at the bottom of the beaker.',
    },
];

/* ─── SVG Lab Scenes ─────────────────────────────────── */
function MgScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    // Spark positions radiating from burn point (88, 180)
    const sparks = [
        { dx: -55, dy: -45, dur: '0.55s', delay: '0s',    r: 2.5 },
        { dx:  60, dy: -38, dur: '0.62s', delay: '0.08s', r: 2   },
        { dx: -40, dy: -62, dur: '0.5s',  delay: '0.15s', r: 3   },
        { dx:  38, dy: -65, dur: '0.7s',  delay: '0.05s', r: 2   },
        { dx: -68, dy: -20, dur: '0.58s', delay: '0.2s',  r: 2.5 },
        { dx:  72, dy: -15, dur: '0.6s',  delay: '0.12s', r: 2   },
        { dx:  10, dy: -75, dur: '0.65s', delay: '0.22s', r: 3   },
        { dx: -20, dy: -72, dur: '0.53s', delay: '0.18s', r: 2   },
        { dx:  50, dy:  30, dur: '0.6s',  delay: '0.1s',  r: 2   },
        { dx: -45, dy:  35, dur: '0.55s', delay: '0.25s', r: 2.5 },
    ];

    return (
        <svg viewBox="0 0 280 290" style={{ width: '100%', height: '100%', maxHeight: 310 }}>
            <defs>
                {/* Flash radial gradient */}
                <radialGradient id="mgFlash" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%"  stopColor="#fff9e6" stopOpacity="0.95" />
                    <stop offset="70%"  stopColor="#fffbcd" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#fff3a0" stopOpacity="0" />
                </radialGradient>
                {/* Halo glow */}
                <radialGradient id="mgHalo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#ffffcc" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffcc" stopOpacity="0" />
                </radialGradient>
                {/* Smoke gradient */}
                <radialGradient id="smokeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#e2e8f0" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0" />
                </radialGradient>
                {/* Bunsen flame gradient */}
                <linearGradient id="bunsenFlame" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%"   stopColor="#1d4ed8" />
                    <stop offset="50%"  stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.5" />
                </linearGradient>
            </defs>

            <style>{`
                @keyframes mgFlameFlicker {
                    0%,100% { transform: scaleX(1)   scaleY(1);   opacity: 0.85; }
                    33%     { transform: scaleX(1.12) scaleY(1.07);opacity: 1;    }
                    66%     { transform: scaleX(0.92) scaleY(1.04);opacity: 0.9;  }
                }
                @keyframes mgCoreFlicker {
                    0%,100% { transform: scaleX(1)   scaleY(1);   }
                    50%     { transform: scaleX(1.08) scaleY(0.95);}
                }
                @keyframes mgFlashPulse {
                    0%,100% { opacity: 0.92; transform: scale(1);   }
                    50%     { opacity: 1;    transform: scale(1.06); }
                }
                @keyframes mgHaloPulse {
                    0%,100% { opacity: 0.45; transform: scale(1);   }
                    50%     { opacity: 0.7;  transform: scale(1.12); }
                }
                @keyframes mgRaysSpin {
                    0%   { transform: rotate(0deg);   }
                    100% { transform: rotate(360deg); }
                }
                @keyframes mgRaysSpinRev {
                    0%   { transform: rotate(0deg);   }
                    100% { transform: rotate(-360deg);}
                }
                @keyframes mgSparkFly {
                    0%   { transform: translate(0,0);      opacity: 1;   }
                    80%  { opacity: 0.8; }
                    100% { transform: translate(var(--sdx), var(--sdy)); opacity: 0; }
                }
                @keyframes mgSmokeRise {
                    0%   { transform: translateY(0)   scaleX(1);   opacity: 0.55; }
                    100% { transform: translateY(-55px) scaleX(2.2); opacity: 0;   }
                }
                @keyframes mgSmokeRise2 {
                    0%   { transform: translateY(0)   scaleX(1);   opacity: 0.4; }
                    100% { transform: translateY(-45px) scaleX(1.8); opacity: 0;  }
                }
                @keyframes mgRibbonGlow {
                    0%,100% { filter: drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px #fffde7); }
                    50%     { filter: drop-shadow(0 0 12px #fff) drop-shadow(0 0 24px #fbbf24); }
                }
                @keyframes mgPowderSettle {
                    0%   { transform: translateY(-8px); opacity: 0; }
                    60%  { opacity: 1; }
                    100% { transform: translateY(0);    opacity: 1; }
                }
                @keyframes mgRibbonBurn {
                    0%   { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: 200; }
                }
            `}</style>

            {/* ══════════════════ LAB BENCH ══════════════════ */}
            <rect x="10" y="258" width="260" height="14" fill="#d1d5db" rx="4" />
            {/* bench edge shadow */}
            <rect x="10" y="268" width="260" height="4" fill="#b0bec5" rx="2" opacity="0.5" />

            {/* ══════════════════ BUNSEN BURNER ══════════════ */}
            <ellipse cx="80" cy="260" rx="34" ry="8" fill="#374151" />
            <rect x="68" y="200" width="24" height="62" fill="#9ca3af" rx="5" />
            {/* Shine */}
            <rect x="70" y="204" width="5" height="50" fill="white" rx="3" opacity="0.18" />
            <rect x="65" y="215" width="30" height="11" fill="#6b7280" rx="3" />
            <ellipse cx="63" cy="228" rx="7" ry="5" fill="#374151" />
            <rect x="60" y="222" width="6" height="6" fill="#6b7280" rx="2" />
            <rect x="70" y="192" width="20" height="12" fill="#94a3b8" rx="4" />

            {/* Bunsen FLAME — animated blue cone */}
            <g style={{ transformOrigin: '80px 192px', animation: 'mgFlameFlicker 0.4s ease-in-out infinite' }}>
                {/* outer blue cone */}
                <ellipse cx="80" cy="179" rx="9" ry="14" fill="url(#bunsenFlame)" opacity="0.82" />
                {/* inner hot core */}
                <g style={{ transformOrigin: '80px 185px', animation: 'mgCoreFlicker 0.3s ease-in-out infinite' }}>
                    <ellipse cx="80" cy="184" rx="5" ry="8" fill="#dbeafe" opacity="0.95" />
                    <ellipse cx="80" cy="187" rx="3" ry="4" fill="white" opacity="0.7" />
                </g>
            </g>

            {/* ══════════════════ TONGS ══════════════════════ */}
            {/* Front Arm (Right loop, Left grip) */}
            <path d="M220 20 L235 5 A 8 8 0 0 1 246 16 L230 35 L196 70 L155 120 Q145 133 158 140" 
                stroke="#111827" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Back Arm (Left loop, Right grip) */}
            <path d="M205 35 L220 20 A 8 8 0 0 1 231 31 L215 45 L196 70 L167 122 Q162 133 158 140" 
                stroke="#030712" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Pivot Rivet */}
            <circle cx="196" cy="70" r="3.5" fill="#475569" stroke="#111827" strokeWidth="1" />

            {/* ══════════════════ MG RIBBON ══════════════════ */}
            {!isDone && (
                <path
                    d="M158 140 Q145 152 125 165 Q108 175 92 186"
                    stroke={isRunning ? '#ffffff' : '#c8d0d8'}
                    strokeWidth="5.5"
                    fill="none"
                    strokeLinecap="round"
                    style={isRunning
                        ? { animation: 'mgRibbonGlow 0.4s ease-in-out infinite' }
                        : {}}
                />
            )}

            {/* ══════════════════ BURN ZONE ══════════════════ */}
            {isRunning && (() => {
                const BX = 92, BY = 183;
                return (
                    <g>
                        {/* Wide atmospheric halo */}
                        <circle cx={BX} cy={BY} r="85"
                            fill="url(#mgHalo)"
                            style={{ transformOrigin: `${BX}px ${BY}px`, animation: 'mgHaloPulse 0.6s ease-in-out infinite' }} />

                        {/* ── Rotating outer ray set (15° apart) ── */}
                        <g style={{ transformOrigin: `${BX}px ${BY}px`, animation: 'mgRaysSpin 1.8s linear infinite' }}>
                            {Array.from({ length: 24 }, (_, i) => {
                                const a = (i * 15) * Math.PI / 180;
                                const inner = 30, outer = 76;
                                return (
                                    <line key={i}
                                        x1={BX + Math.cos(a) * inner} y1={BY + Math.sin(a) * inner}
                                        x2={BX + Math.cos(a) * outer} y2={BY + Math.sin(a) * outer}
                                        stroke="#fffde7"
                                        strokeWidth={i % 2 === 0 ? 2 : 1}
                                        opacity={i % 2 === 0 ? 0.55 : 0.28}
                                    />
                                );
                            })}
                        </g>

                        {/* ── Counter-rotating inner ray set (shorter, denser) ── */}
                        <g style={{ transformOrigin: `${BX}px ${BY}px`, animation: 'mgRaysSpinRev 1.1s linear infinite' }}>
                            {Array.from({ length: 12 }, (_, i) => {
                                const a = (i * 30) * Math.PI / 180;
                                return (
                                    <line key={i}
                                        x1={BX + Math.cos(a) * 6} y1={BY + Math.sin(a) * 6}
                                        x2={BX + Math.cos(a) * 30} y2={BY + Math.sin(a) * 30}
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        opacity="0.7"
                                    />
                                );
                            })}
                        </g>

                        {/* Main flash disc */}
                        <circle cx={BX} cy={BY} r="50"
                            fill="url(#mgFlash)"
                            style={{ transformOrigin: `${BX}px ${BY}px`, animation: 'mgFlashPulse 0.35s ease-in-out infinite' }} />

                        {/* Bright solid core */}
                        <circle cx={BX} cy={BY} r="20"
                            fill="white" opacity="0.98"
                            style={{ filter: 'drop-shadow(0 0 18px #fff) drop-shadow(0 0 35px #fffde7)' }} />

                        {/* Hot yellow inner dot */}
                        <circle cx={BX} cy={BY} r="8"
                            fill="#fef9c3" opacity="1"
                            style={{ filter: 'drop-shadow(0 0 6px #fbbf24)' }} />

                        {/* Flying sparks */}
                        {sparks.map(({ dx, dy, dur, delay, r }, i) => (
                            <circle key={i}
                                cx={BX} cy={BY} r={r}
                                fill={i % 3 === 0 ? '#fde68a' : i % 3 === 1 ? '#fbbf24' : '#ffffff'}
                                style={{
                                    '--sdx': `${dx}px`,
                                    '--sdy': `${dy}px`,
                                    animation: `mgSparkFly ${dur} ${delay} infinite ease-out`,
                                }}
                            />
                        ))}

                        {/* Smoke plumes rising */}
                        <ellipse cx={BX - 8} cy={BY - 14} rx="12" ry="18"
                            fill="url(#smokeGrad)"
                            style={{ animation: 'mgSmokeRise 1.2s 0s ease-out infinite' }} />
                        <ellipse cx={BX + 6} cy={BY - 10} rx="10" ry="15"
                            fill="url(#smokeGrad)"
                            style={{ animation: 'mgSmokeRise2 1.4s 0.3s ease-out infinite' }} />

                        {/* Flash label */}
                        <text x={BX} y="252"
                            textAnchor="middle" fill="#d97706"
                            fontSize="10" fontWeight="900" fontFamily="Outfit,sans-serif"
                            style={{ filter: 'drop-shadow(0 0 4px #fbbf24)' }}>
                            ✦ Intensely Bright White Flash!
                        </text>
                    </g>
                );
            })()}

            {/* ══════════════════ DONE — MgO ASH ═════════════ */}
            {/* Watch glass */}
            <path d="M154 254 Q192 268 232 254"
                stroke="#9ca3af" strokeWidth="3"
                fill="rgba(248,250,252,0.5)" />
            {isDone && (
                <g style={{ animation: 'mgPowderSettle 0.8s ease-out both' }}>
                    <ellipse cx="194" cy="254" rx="28" ry="6"
                        fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
                    {/* powder lumps */}
                    {[172, 182, 192, 203, 214].map((cx, i) => (
                        <circle key={i} cx={cx} cy={251 - i * 0.4}
                            r={3 + (i % 3 === 1 ? 1.5 : 0)}
                            fill="white" stroke="#e5e7eb" strokeWidth="0.8" opacity="0.97" />
                    ))}
                    {/* lingering smoke wisps */}
                    <ellipse cx="155" cy="220" rx="10" ry="22"
                        fill="url(#smokeGrad)" opacity="0.4"
                        style={{ animation: 'mgSmokeRise 2s 0s ease-out infinite' }} />
                    <text x="194" y="274"
                        textAnchor="middle" fill="#64748b"
                        fontSize="9" fontWeight="700" fontFamily="Outfit,sans-serif">
                        MgO — White Powdery Ash
                    </text>
                </g>
            )}

            {/* ══════════════════ LABELS ═════════════════════ */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                {/* Bunsen Burner */}
                <line x1="50" y1="230" x2="65" y2="230" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="45" y="233" textAnchor="end">Bunsen Burner</text>
                
                {/* Tongs */}
                <line x1="245" y1="50" x2="228" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="250" y="53" textAnchor="start">Tongs</text>

                {/* Magnesium Ribbon */}
                {!isDone && (
                    <g>
                        <line x1="175" y1="180" x2="135" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                        <text x="180" y="183" textAnchor="start">Mg Ribbon</text>
                    </g>
                )}

                {/* Watch Glass */}
                <line x1="240" y1="260" x2="215" y2="252" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="245" y="263" textAnchor="start">Watch Glass</text>
                {isDone && <text x="245" y="273" textAnchor="start" fill="#64748b" fontSize="8">MgO Ash</text>}
            </g>
        </svg>
    );
}

function ZnScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    // Flask interior bounds: neck top=80, body widens from y=115 to y=220, left~62, right~198
    return (
        <svg viewBox="0 0 260 270" style={{ width: '100%', height: '100%', maxHeight: 300 }}>
            <style>{`
                @keyframes bubbleFloat{
                    0%  { transform: translateY(0px);   opacity: 0.9; }
                    80% { opacity: 0.7; }
                    100%{ transform: translateY(-60px); opacity: 0; }
                }
            `}</style>
            {/* Lab bench */}
            <rect x="10" y="248" width="240" height="10" fill="#d1d5db" rx="4" />

            {/* ─── Conical flask ─── */}
            {/* Body: neck starts at y=80, widens to base at y=225 */}
            <path d="M108 80 L108 115 L62 215 Q58 228 72 228 L188 228 Q202 228 198 215 L152 115 L152 80 Z"
                fill="rgba(232,245,253,0.35)" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Neck */}
            <rect x="105" y="55" width="50" height="30" fill="rgba(232,245,253,0.3)" stroke="#94a3b8" strokeWidth="2"
                rx="4" />

            {/* ─── Liquid (clipped inside flask body) ─── */}
            <defs>
                <clipPath id="znFlaskClip">
                    <path d="M110 140 L110 115 L64 213 Q61 226 73 226 L187 226 Q199 226 196 213 L150 115 L150 140 Z" />
                </clipPath>
            </defs>
            {/* Acid liquid from y=140 to base */}
            <rect x="58" y="140" width="146" height="92"
                fill={isDone ? '#93c5fd' : '#fde68a'}
                clipPath="url(#znFlaskClip)"
                opacity="0.72"
                style={{ transition: 'fill 2s ease' }}
            />

            {/* ─── Zinc granules at bottom ─── */}
            <clipPath id="znGranuleClip">
                <path d="M63 213 Q61 226 73 226 L187 226 Q199 226 196 213 Z" />
            </clipPath>
            {[82, 100, 118, 136, 154, 170].map((cx, i) => (
                <circle key={i} cx={cx} cy={220} r={7 - i * 0.4} fill="#6b7280"
                    clipPath="url(#znGranuleClip)" />
            ))}

            {/* ─── Bubbles (large, clearly visible) ─── */}
            {(isRunning || isDone) && (
                <g clipPath="url(#znFlaskClip)">
                    {[
                        { cx: 88,  cy: 210, r: 6, delay: '0s',    dur: '0.9s'  },
                        { cx: 107, cy: 215, r: 8, delay: '0.15s', dur: '1.1s'  },
                        { cx: 126, cy: 208, r: 5, delay: '0.3s',  dur: '0.85s' },
                        { cx: 145, cy: 213, r: 7, delay: '0.05s', dur: '1.0s'  },
                        { cx: 163, cy: 210, r: 6, delay: '0.25s', dur: '0.95s' },
                        { cx: 96,  cy: 220, r: 5, delay: '0.4s',  dur: '1.15s' },
                        { cx: 155, cy: 218, r: 4, delay: '0.5s',  dur: '0.8s'  },
                    ].map(({ cx, cy, r, delay, dur }, i) => (
                        <circle key={i} cx={cx} cy={cy} r={r}
                            fill="white" stroke="rgba(147,197,253,0.6)" strokeWidth="1"
                            style={{ animation: `bubbleFloat ${dur} ${delay} infinite linear` }} />
                    ))}
                </g>
            )}

            {/* ─── Cork + delivery tube ─── */}
            <rect x="105" y="46" width="50" height="14" fill="#d97706" rx="4" />
            {/* Glass delivery tube out of cork */}
            <line x1="130" y1="46" x2="130" y2="12" stroke="#cbd5e1" strokeWidth="5"
                strokeLinecap="round" />
            <line x1="130" y1="12" x2="155" y2="12" stroke="#cbd5e1" strokeWidth="5"
                strokeLinecap="round" />

            {/* H2 gas exit bubbles from tube tip */}
            {isRunning && [
                { cx: 158, cy: 10, r: 5, delay: '0s',    dur: '0.7s' },
                { cx: 162, cy: 2,  r: 7, delay: '0.2s',  dur: '0.9s' },
                { cx: 154, cy: -2, r: 4, delay: '0.4s',  dur: '0.8s' },
            ].map(({ cx, cy, r, delay, dur }, i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill="#bae6fd" opacity="0.8"
                    style={{ animation: `bubbleFloat ${dur} ${delay} infinite` }} />
            ))}

            {/* ══════════════════ LABELS ═════════════════════ */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                {/* Conical Flask */}
                <line x1="45" y1="190" x2="68" y2="190" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="40" y="193" textAnchor="end">Conical Flask</text>
                
                {/* Dilute HCl */}
                <line x1="45" y1="150" x2="75" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="40" y="153" textAnchor="end">Dilute HCl</text>

                {/* Cork */}
                <line x1="55" y1="60" x2="105" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="50" y="63" textAnchor="end">Rubber Cork</text>

                {/* Delivery Tube */}
                <line x1="180" y1="25" x2="150" y2="12" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="185" y="28" textAnchor="start">Delivery Tube</text>

                {/* Zinc Granules */}
                <line x1="185" y1="210" x2="160" y2="218" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="190" y="212" textAnchor="start">Zinc Granules</text>
            </g>
        </svg>
    );
}

function FeScene({ phase }) {
    const isDone = phase === 'done';
    const isRunning = phase === 'running';
    // CuSO4 = vivid blue; FeSO4 = pale green
    const liq  = isDone ? '#4ade80' : '#2563eb';
    const nail = isDone ? '#92400e' : '#9ca3af';
    return (
        <svg viewBox="0 0 260 270" style={{ width: '100%', height: '100%', maxHeight: 300 }}>
            {/* Lab bench */}
            <rect x="10" y="248" width="240" height="10" fill="#d1d5db" rx="4" />

            {/* ─── Retort stand ─── */}
            <rect x="28" y="234" width="84" height="14" fill="#78350f" rx="3" />
            <rect x="56" y="18" width="14" height="218" fill="#b45309" rx="4" />
            {/* Horizontal arm */}
            <rect x="68" y="62" width="72" height="10" fill="#78350f" rx="3" />
            {/* Boss-head clamp */}
            <circle cx="68" cy="67" r="12" fill="#4b5563" />
            <circle cx="68" cy="67" r="7"  fill="#374151" />

            {/* ─── Thread from clamp to nail head ─── */}
            <line x1="140" y1="67" x2="147" y2="88"
                stroke="#374151" strokeWidth="1.5" strokeDasharray="3,2" />

            {/* ─── Test tube (wider, taller — fills more of scene) ─── */}
            {/* Tube walls */}
            <path d="M130 55 L130 210 A20 20 0 0 0 170 210 L170 55"
                fill="rgba(255,255,255,0.15)" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Rim */}
            <rect x="124" y="47" width="52" height="12" fill="#94a3b8" rx="3" />

            {/* ─── Liquid fill from just below rim all the way to rounded bottom ─── */}
            <defs>
                <clipPath id="ttClipFe">
                    <path d="M132 60 L132 208 A18 18 0 0 0 168 208 L168 60 Z" />
                </clipPath>
            </defs>
            <rect x="130" y="60" width="40" height="154"
                fill={liq}
                clipPath="url(#ttClipFe)"
                opacity="0.82"
                style={{ transition: 'fill 2.5s ease' }}
            />

            {/* ─── Iron nail (hung from thread, submerged) ─── */}
            {/* Nail head */}
            <rect x="142" y="82" width="16" height="5" fill={nail} rx="2"
                style={{ transition: 'fill 2.5s ease' }} />
            {/* Nail shank */}
            <rect x="147" y="87" width="6" height="115" fill={nail} rx="2"
                style={{ transition: 'fill 2.5s ease' }} />
            {/* Nail point */}
            <polygon points="147,202 153,202 150,218" fill={nail}
                style={{ transition: 'fill 2.5s ease' }} />

            {/* ─── Copper (reddish-brown) deposit on nail ─── */}
            {(isRunning || isDone) && (
                <rect x="147" y="115" width="6" height="80" fill="#b45309" rx="2" opacity="0.8"
                    style={{ transition: 'opacity 1s' }} />
            )}

            {/* Colour-change label */}
            {isDone && (
                <text x="150" y="242" textAnchor="middle" fill="#16a34a"
                    fontSize="9" fontWeight="800" fontFamily="Outfit,sans-serif">Solution: blue → green</text>
            )}

            {/* ══════════════════ LABELS ═════════════════════ */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                {/* Retort Stand */}
                <line x1="45" y1="130" x2="56" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="40" y="133" textAnchor="end">Retort Stand</text>

                {/* Thread */}
                <line x1="195" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="200" y="83" textAnchor="start">Thread</text>

                {/* Test Tube */}
                <line x1="195" y1="115" x2="170" y2="115" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="200" y="118" textAnchor="start">Test Tube</text>

                {/* Iron Nail */}
                <line x1="195" y1="150" x2="153" y2="150" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="200" y="153" textAnchor="start">Iron Nail</text>

                {/* Solution */}
                <line x1="195" y1="185" x2="165" y2="185" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="200" y="188" textAnchor="start">{isDone ? 'FeSO₄ Solution' : 'CuSO₄ Solution'}</text>
            </g>
        </svg>
    );
}

function PrecipScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    return (
        <svg viewBox="0 0 260 260" style={{ width: '100%', height: '100%', maxHeight: 300 }}>
            <style>{`@keyframes dropFall{0%{transform:translateY(-8px);opacity:.9;}100%{transform:translateY(10px);opacity:0;}}`}</style>
            <rect x="10" y="235" width="240" height="10" fill="#d1d5db" rx="4" />
            {/* Beaker */}
            <path d="M55 65 L55 210 Q55 225 70 225 L170 225 Q185 225 185 210 L185 65 Z"
                fill="rgba(248,250,252,0.7)" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="48" y="55" width="144" height="14" fill="#94a3b8" rx="3" />
            <clipPath id="beakerClipP"><rect x="57" y="130" width="126" height="93" /></clipPath>
            <rect x="57" y="130" width="126" height="93"
                fill={isDone ? '#fef3c7' : 'rgba(219,234,254,0.3)'} clipPath="url(#beakerClipP)"
                style={{ transition: 'fill 1.5s' }} />
            {/* Yellow precipitate */}
            {isDone && (
                <g clipPath="url(#beakerClipP)">
                    <ellipse cx="120" cy="222" rx="54" ry="9" fill="#fbbf24" opacity="0.95" />
                    <ellipse cx="120" cy="215" rx="40" ry="7" fill="#f59e0b" opacity="0.7" />
                    {[82, 96, 110, 126, 142, 158].map((cx, i) => (
                        <circle key={i} cx={cx} cy={217 - i * 1.5} r={4 + (i % 3)} fill="#fde68a" opacity="0.9" />
                    ))}
                </g>
            )}
            {/* Dropping flask (tilted) */}
            <g style={{
                transform: isRunning || isDone ? 'rotate(-42deg)' : 'rotate(-10deg)',
                transformOrigin: '210px 38px', transition: 'transform 0.8s ease'
            }}>
                <path d="M192 18 L192 78 A13 13 0 0 0 222 78 L222 18"
                    fill="rgba(254,249,195,0.85)" stroke="#94a3b8" strokeWidth="2.5" />
                <rect x="186" y="12" width="42" height="10" fill="#94a3b8" rx="3" />
                {!isDone && <rect x="194" y="30" width="26" height="50" fill="#fef9c3" opacity="0.75" />}
            </g>
            {/* Pour drops */}
            {isRunning && (
                <g fill="rgba(254,240,138,0.85)">
                    {[0, 1, 2].map(i => (
                        <circle key={i} cx={140 + i * 6} cy={82 + i * 18} r={3 + i}
                            style={{ animation: `dropFall 0.45s ${i * 0.14}s infinite` }} />
                    ))}
                </g>
            )}
            {/* ══════════════════ LABELS ═════════════════════ */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                {/* Beaker */}
                <line x1="215" y1="160" x2="185" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="220" y="163" textAnchor="start">Beaker</text>

                {/* Lead Nitrate */}
                <line x1="45" y1="180" x2="65" y2="180" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="40" y="183" textAnchor="end">Pb(NO₃)₂ Solution</text>

                {/* Dropping Flask */}
                <line x1="100" y1="45" x2="190" y2="45" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x="95" y="48" textAnchor="end">Dropping Flask</text>

                {/* Potassium Iodide */}
                {(isRunning || isDone) && (
                    <g>
                        <line x1="85" y1="90" x2="140" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                        <text x="80" y="93" textAnchor="end">Potassium Iodide (KI)</text>
                    </g>
                )}

                {/* Precipitate */}
                {isDone && (
                    <g>
                        <line x1="215" y1="215" x2="155" y2="215" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                        <text x="220" y="218" textAnchor="start" fill="#d97706">PbI₂ Precipitate</text>
                    </g>
                )}
            </g>
        </svg>
    );
}

const SVG_MAP = { mg: MgScene, zn: ZnScene, fe: FeScene, precip: PrecipScene };

/* ─── Main Component ─────────────────────────────────── */
export default function ChemReactionsVirtualLab() {
    const navigate = useNavigate();
    const [activeExp, setActiveExp] = useState(0);
    const [phase, setPhase] = useState('idle'); // idle | running | done

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
        <div className={styles['chem-page']}>
            <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}`}</style>

            {/* Nav */}
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            {/* Hero */}
            <div className={styles['chem-lab-hero']}>
                <div className={styles['chem-lab-hero-bg']} />
                <div className={styles['chem-lab-hero-content']}>
                    <div className={styles['chem-lab-hero-badge']}>
                        🧬 HANDS-ON SCIENCE
                    </div>
                    <h1 className={styles['chem-lab-hero-title']}>
                        Interactive Virtual <span className={styles['chem-lab-hero-title-accent']}>Lab</span>
                    </h1>
                    <p className={styles['chem-lab-hero-sub']}>
                        Pick an experiment, run it, and observe the animated reaction live in your browser.
                    </p>
                </div>
            </div>

            <div className={styles['chem-lab-container']}>

                {/* Experiment Picker */}
                <div className={styles['chem-lab-picker']}>
                    {EXPERIMENTS.map((e, idx) => (
                        <button key={e.id} onClick={() => handleExpChange(idx)}
                            className={`${styles['chem-lab-picker-btn']} ${activeExp === idx ? styles['active'] : ''}`}
                            style={{ '--skill-color': e.color, '--skill-color-12': e.color + '12', '--skill-color-25': e.color + '25' }}
                        >
                            <div className={styles['chem-lab-picker-emoji']}>{e.emoji}</div>
                            <div className={styles['chem-lab-picker-title']}>{e.title}</div>
                            <div className={styles['chem-lab-picker-sub']}>{e.subtitle}</div>
                        </button>
                    ))}
                </div>

                {/* Main Lab Stage */}
                <div className={styles['chem-lab-stage']}>

                        {/* 1. Experiment info card */}
                        <div className={styles['chem-card-exp']}>
                            <div className={styles['chem-card-exp-badge']} style={{ color: exp.color }}>EXPERIMENT</div>
                            <h2 className={styles['chem-card-exp-title']}>{exp.title}</h2>
                            <p className={styles['chem-card-exp-desc']}>{exp.desc}</p>
                            <div className={styles['chem-card-exp-type']}>
                                <div className={styles['chem-card-exp-type-label']}>Reaction Type</div>
                                <div className={styles['chem-card-exp-type-value']} style={{ color: exp.color }}>{exp.type}</div>
                            </div>
                        </div>

                        {/* 3. Result panel */}
                        {phase === 'done' ? (
                            <div className={`${styles['chem-card-obs']} ${styles['done']}`} style={{ background: `linear-gradient(135deg, ${exp.colorLight}, #fff)`, border: `1.5px solid ${exp.color}40` }}>
                                <div className={styles['chem-card-obs-badge']}>
                                    <span className={styles['chem-card-obs-badge-icon']}>✅</span>
                                    <div className={styles['chem-card-obs-badge-text']} style={{ color: exp.color }}>Observation Log</div>
                                </div>
                                <p className={styles['chem-card-obs-desc']}>{exp.observation}</p>
                                <div className={styles['chem-card-obs-eq']} style={{ border: `1px solid ${exp.color}30` }}>
                                    <div className={styles['chem-card-obs-eq-label']}>Balanced Equation</div>
                                    <div className={styles['chem-card-obs-eq-value']} style={{ color: exp.color }}>{exp.equation}</div>
                                </div>
                            </div>
                        ) : (
                            <div className={`${styles['chem-card-obs']} ${styles['idle']}`}>
                                <div style={{ fontSize: 36, marginBottom: 10 }}>🔬</div>
                                <p style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                                    Click <strong style={{ color: exp.color }}>{exp.actionLabel}</strong> to see the reaction and observations appear here.
                                </p>
                            </div>
                        )}

                        {/* 4. Safety note */}
                        <div className={styles['chem-card-safety']}>
                            <span className={styles['chem-card-safety-icon']}>⚠️</span>
                            <div className={styles['chem-card-safety-text']}>
                                <strong>Safety Note:</strong> Only perform these reactions in a certified lab under qualified teacher supervision.
                            </div>
                        </div>

                    {/* 2. RIGHT — Animated Scene */}
                    <div className={styles['chem-card-scene']}>
                        {/* macOS title bar */}
                        <div className={styles['chem-card-scene-titlebar']}>
                            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
                                <div key={i} className={styles['chem-card-scene-title-circle']} style={{ background: c }} />
                            ))}
                            <span className={styles['chem-card-scene-title-text']}>
                                lab.scene({exp.id})
                            </span>
                        </div>
                        {/* Scene canvas */}
                        <div className={styles['chem-card-scene-canvas']} style={{
                            background: phase === 'running'
                                ? (exp.id === 'mg' ? 'linear-gradient(180deg,#fffbeb,#fff)' : 'linear-gradient(180deg,#f0f9ff,#fff)')
                                : '#fafafa'
                        }}>
                            <LabScene phase={phase} />
                        </div>
                        {/* Controls */}
                        <div className={styles['chem-card-scene-controls']}>
                            {phase === 'idle' && (
                                <button onClick={handleRun} className={`${styles['chem-btn-lab-action']} ${styles['run']}`} style={{ '--skill-color': exp.color, '--skill-color-bb': exp.color + 'bb', '--skill-color-40': exp.color + '40' }}>
                                    {exp.actionLabel}
                                </button>
                            )}
                            {phase === 'running' && (
                                <button disabled className={`${styles['chem-btn-lab-action']} ${styles['running']}`}>
                                    ⏳ Reaction Occurring...
                                </button>
                            )}
                            {phase === 'done' && (
                                <button onClick={handleReset} className={`${styles['chem-btn-lab-action']} ${styles['reset']}`}>
                                    🔄 Reset Experiment
                                </button>
                            )}
                            <button onClick={handleReset} className={styles['chem-btn-lab-icon']}>
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
                                {phase === 'idle' ? '● Ready' : phase === 'running' ? '● Reaction occurring...' : '● Complete'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
