import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../../../../science/grade10/ChemicalReactions/ChemicalReactionsDashboard.module.css';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { SLUG_TO_NODE_ID } from '@/lib/curriculumIds';

/* ─── Experiment Data ─────────────────────────────────── */
const EXPERIMENTS = [
    {
        id: 'concentration',
        title: 'Concentration Calculator Lab',
        subtitle: 'Activity 2.1',
        emoji: '🧮',
        color: '#0ea5e9',
        colorLight: '#f0f9ff',
        actionLabel: '🧮 Dissolve the Solute',
        equation: 'Molarity (M) = moles of solute / volume of solution (L)',
        type: 'Quantitative · Concentration',
        desc: 'A known mass of NaCl is dissolved in 250 mL of water inside a volumetric flask. Watch the solute crystals disperse and observe all four concentration expressions — mass %, molarity, molality, and mole fraction — calculated in real time.',
        observation: 'As the crystals dissolve, solute particles spread uniformly through the solvent. Molarity and molality diverge slightly because molality uses mass of solvent only, not total solution volume — a crucial distinction for colligative property calculations. Final values: Mass % = 7.3 %, Molarity = 1.25 M, Molality = 1.35 m, χ(NaCl) = 0.0237.',
    },
    {
        id: 'dilution',
        title: 'Dilution Simulator',
        subtitle: 'Activity 2.2',
        emoji: '💧',
        color: '#6366f1',
        colorLight: '#eef2ff',
        actionLabel: '💧 Add Water to Flask',
        equation: 'C₁V₁ = C₂V₂  →  M₂ = M₁V₁ / V₂',
        type: 'Dilution · Quantitative',
        desc: 'A 2.00 M stock solution sits in a volumetric flask. Water is gradually added from a wash bottle. The solution colour fades progressively as molarity drops — the total moles of solute stay constant while volume increases.',
        observation: 'The deep blue colour lightens to near-transparent as water triples the volume. Molarity falls from 2.00 M → 0.67 M, perfectly obeying C₁V₁ = C₂V₂ (2.00 × 250 = 0.67 × 750). Moles of solute remain unchanged throughout — only the concentration changes.',
    },
    {
        id: 'solubility',
        title: 'Temperature vs Solubility',
        subtitle: 'Activity 3.1',
        emoji: '🌡️',
        color: '#ef4444',
        colorLight: '#fff1f2',
        actionLabel: '🔥 Heat the Solution',
        equation: 'Solubility of most solids ↑ as Temperature ↑  (endothermic dissolution)',
        type: 'Solubility · Thermal',
        desc: 'A beaker of water holds excess KNO₃ crystals at 22 °C. A Bunsen burner heats the solution. Watch the crystals dissolve one by one as temperature climbs, and track the real-time solubility-vs-temperature graph.',
        observation: 'At 22 °C (~31 g/100 mL) most crystals remain. At 62 °C (~110 g/100 mL) nearly all dissolve. The graph traces a steep upward curve — endothermic dissolution means higher temperature shifts the equilibrium toward dissolving. Convection currents and colour change confirm the process.',
    },
    {
        id: 'henryslaw',
        title: "Henry's Law — Gas Solubility",
        subtitle: 'Activity 3.2',
        emoji: '⚗️',
        color: '#10b981',
        colorLight: '#ecfdf5',
        actionLabel: '⬆️ Compress the Piston',
        equation: 'p = K_H · x    (pressure ∝ mole fraction of dissolved gas)',
        type: "Henry's Law · Gas Solubility",
        desc: 'A sealed cylinder holds CO₂ gas above water. A piston is pushed down, increasing pressure from 1 atm → 3 atm. Watch gas molecules dissolve into the liquid layer — the mole fraction of dissolved CO₂ rises linearly with pressure.',
        observation: "At 1 atm only 2 gas particles are dissolved. At 3 atm, 12 dissolve — a threefold increase, confirming p ∝ x (Henry's Law). Gas particles above the interface thin out as pressure forces them into solution. A straight-line graph through the origin validates the law. This is exactly why carbonated drinks go flat when opened — pressure drops.",
    },
    {
        id: 'boilingpoint',
        title: 'Boiling Point Elevation',
        subtitle: 'Activity 6.1',
        emoji: '♨️',
        color: '#f59e0b',
        colorLight: '#fffbeb',
        actionLabel: '♨️ Heat Both Beakers',
        equation: 'ΔTb = i · Kb · m    (elevation proportional to particle count)',
        type: 'Colligative Property · Ebullioscopy',
        desc: 'Two beakers sit on identical Bunsen burners — one holds pure water, the other a 0.5 m NaCl solution. Both are heated simultaneously. Watch the thermometers rise and identify which beaker begins to boil first.',
        observation: 'Pure water boils at exactly 100 °C. The NaCl solution (i = 2, Kb = 0.512 °C·kg/mol, m = 0.5) boils at 100.51 °C — the ΔTb = 2 × 0.512 × 0.5 = 0.51 °C elevation is visible as a delayed boil with a higher thermometer reading. Steam appears later in the solution beaker, confirming the colligative effect.',
    },
];

/* ══════════════════════════════════════════════════════════
   GLOBAL KEYFRAMES
══════════════════════════════════════════════════════════ */
const GLOBAL_STYLES = `
    @keyframes slideUp    { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
    @keyframes fadeScaleIn{ from{opacity:0;transform:scale(0.88);}      to{opacity:1;transform:scale(1);}      }

    @keyframes concParticleFloat { 0%,100%{transform:translateY(0);}   50%{transform:translateY(-6px);} }
    @keyframes concBubbleRise    { 0%{transform:translateY(0);opacity:.85;} 100%{transform:translateY(-62px);opacity:0;} }
    @keyframes concLabelPop      { 0%{opacity:0;transform:scale(0.82);} 100%{opacity:1;transform:scale(1);} }
    @keyframes concSwirl         { 0%  {transform:rotate(0deg)   translateX(14px) rotate(0deg);}
                                   100%{transform:rotate(360deg) translateX(14px) rotate(-360deg);} }
    @keyframes concRippleOut     { 0%{opacity:.65;r:5;} 100%{opacity:0;r:30;} }

    @keyframes dilDropFall   { 0%{transform:translateY(0);opacity:.9;}  100%{transform:translateY(18px);opacity:0;} }
    @keyframes dilBubbleRise { 0%{transform:translateY(0);opacity:.85;} 100%{transform:translateY(-55px);opacity:0;} }
    @keyframes dilLabelSlide { 0%{opacity:0;transform:translateX(12px);} 100%{opacity:1;transform:translateX(0);} }
    @keyframes dilMolPulse   { 0%,100%{transform:scale(1);} 50%{transform:scale(1.06);} }

    @keyframes solFlameFlicker { 0%,100%{transform:scaleX(1) scaleY(1);opacity:.9;}
                                  40%{transform:scaleX(1.18) scaleY(1.12);opacity:1;}
                                  70%{transform:scaleX(0.88) scaleY(1.06);opacity:.85;} }
    @keyframes solBubbleRise   { 0%{transform:translateY(0);opacity:.8;} 100%{transform:translateY(-52px);opacity:0;} }
    @keyframes solGraphDraw    { from{stroke-dashoffset:180;} to{stroke-dashoffset:0;} }
    @keyframes solSmoke        { 0%{transform:translateY(0) scaleX(1);opacity:.45;}
                                  100%{transform:translateY(-32px) scaleX(2.2);opacity:0;} }

    @keyframes hlGasJiggle   { 0%,100%{transform:translate(0,0);}    25%{transform:translate(3px,-3px);}
                                50%{transform:translate(-3px,2px);}   75%{transform:translate(2px,3px);}  }
    @keyframes hlDissFloat   { 0%,100%{transform:translateY(0);}    50%{transform:translateY(-4px);}     }
    @keyframes hlPistonPress { 0%,100%{transform:translateY(0);}    50%{transform:translateY(2px);}      }
    @keyframes hlArrowBounce { 0%,100%{transform:translateY(0);}    50%{transform:translateY(4px);}      }
    @keyframes hlGraphAppear { from{stroke-dashoffset:160;opacity:0;} to{stroke-dashoffset:0;opacity:1;} }
    @keyframes hlIfaceRipple { 0%,100%{opacity:.65;} 50%{opacity:1;} }

    @keyframes bpFlicker     { 0%,100%{transform:scaleX(1) scaleY(1);opacity:.9;}
                                40%{transform:scaleX(1.12) scaleY(1.1);opacity:1;}
                                70%{transform:scaleX(0.9) scaleY(1.05);opacity:.85;} }
    @keyframes bpBubbleRise  { 0%{transform:translateY(0);opacity:.85;} 100%{transform:translateY(-46px);opacity:0;} }
    @keyframes bpSteamPuff   { 0%{transform:translateY(0) scaleX(1);opacity:.55;}
                                100%{transform:translateY(-36px) scaleX(2.4);opacity:0;} }
`;

/* ══════════════════════════════════════════════════════
   SCENE 1 — Concentration Calculator Lab
══════════════════════════════════════════════════════ */
function ConcentrationScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone    = phase === 'done';

    const fillY  = isDone ? 112 : isRunning ? 140 : 172;
    const liqCol = isDone ? '#0284c7' : isRunning ? '#38bdf8' : '#bae6fd';

    const particles = [
        {cx:100,cy:190,r:4.5},{cx:122,cy:178,r:3.5},{cx:142,cy:186,r:5  },
        {cx:160,cy:175,r:3.5},{cx:112,cy:200,r:4  },{cx:150,cy:198,r:3  },
        {cx: 92,cy:177,r:3.5},{cx:168,cy:190,r:4  },{cx:132,cy:165,r:3  },
        {cx:105,cy:162,r:4.5},{cx:175,cy:172,r:3  },{cx: 85,cy:195,r:3.5},
    ];

    return (
        <svg viewBox="0 0 270 285" style={{ width:'100%', height:'100%', maxHeight:310 }}>
            <defs>
                <clipPath id="concFlaskClip">
                    <path d="M110 82 L110 114 L65 212 Q62 228 77 228 L193 228 Q208 228 205 212 L160 114 L160 82 Z" />
                </clipPath>
                <linearGradient id="concGlassShine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"  stopColor="#fff" stopOpacity="0.28"/>
                    <stop offset="100%"stopColor="#fff" stopOpacity="0.03"/>
                </linearGradient>
                <radialGradient id="concBubbleGrad" cx="32%" cy="32%" r="68%">
                    <stop offset="0%"  stopColor="#fff"    stopOpacity="0.95"/>
                    <stop offset="100%"stopColor="#7dd3fc" stopOpacity="0.22"/>
                </radialGradient>
                <radialGradient id="concParticleGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%"  stopColor="#e0f2fe" stopOpacity="1"  />
                    <stop offset="100%"stopColor="#0ea5e9" stopOpacity="0.5"/>
                </radialGradient>
                <filter id="concGlow">
                    <feGaussianBlur stdDeviation="2.5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            {/* Bench */}
            <rect x="10" y="258" width="250" height="14" fill="#d1d5db" rx="4"/>
            <rect x="10" y="268" width="250" height="4"  fill="#b0bec5" rx="2" opacity="0.5"/>

            {/* Neck */}
            <rect x="107" y="46" width="56" height="40" fill="rgba(224,242,254,0.32)"
                stroke="#94a3b8" strokeWidth="2.2" rx="5"/>
            {/* Stopper */}
            <rect x="117" y="36" width="36" height="14" fill="#64748b" rx="4"/>
            <rect x="123" y="26" width="24" height="14" fill="#475569" rx="4"/>
            <rect x="129" y="18" width="12" height="12" fill="#334155" rx="3"/>
            {/* Neck graduation */}
            <g style={{ opacity: isDone ? 0 : 1, transition: 'opacity 0.3s ease' }}>
                <line x1="107" y1="72" x2="116" y2="72" stroke="#0ea5e9" strokeWidth="1.8"/>
                <text x="102" y="75" fontSize="7" fill="#0ea5e9" fontWeight="800"
                    fontFamily="Outfit,sans-serif" textAnchor="end">250 mL</text>
            </g>

            {/* Flask body */}
            <path d="M110 82 L110 114 L65 212 Q62 228 77 228 L193 228 Q208 228 205 212 L160 114 L160 82 Z"
                fill="rgba(224,242,254,0.22)" stroke="#94a3b8" strokeWidth="2.6"/>
            <path d="M110 82 L110 114 L65 212 Q62 228 77 228 L193 228 Q208 228 205 212 L160 114 L160 82 Z"
                fill="url(#concGlassShine)"/>

            {/* Liquid */}
            <rect x="60" y={fillY} width="150" height={240 - fillY}
                fill={liqCol} clipPath="url(#concFlaskClip)"
                opacity="0.8" style={{ transition:'fill 1.6s ease' }}/>

            {/* Graduation ticks */}
            {[0.25,0.5,0.75].map((frac,i) => {
                const y  = 228 - frac*120;
                const x1 = 205 - frac*28;
                return (
                    <g key={i}>
                        <line x1={x1} y1={y} x2={x1+12} y2={y} stroke="#94a3b8" strokeWidth="1.2"/>
                        <text x={x1+15} y={y+3} fontSize="6" fill="#94a3b8"
                            fontFamily="Outfit,sans-serif">{Math.round(frac*250)} mL</text>
                    </g>
                );
            })}

            {/* Swirling dissolve orbits */}
            {isRunning && [
                {r:18,dur:'2.2s',delay:'0s',   col:'#bae6fd'},
                {r:26,dur:'3.0s',delay:'0.4s', col:'#93c5fd'},
                {r:34,dur:'3.8s',delay:'0.8s', col:'#60a5fa'},
            ].map(({dur,delay,col},i) => (
                <circle key={i} cx="135" cy="170" r="5" fill={col} opacity="0.72"
                    clipPath="url(#concFlaskClip)"
                    style={{ animation:`concSwirl ${dur} ${delay} linear infinite`}}/>
            ))}

            {/* Surface ripples */}
            {isRunning && [0,0.42,0.84].map((delay,i) => (
                <circle key={i} cx="135" cy={fillY+3} r="5"
                    fill="none" stroke="#38bdf8" strokeWidth="2"
                    clipPath="url(#concFlaskClip)"
                    style={{ animation:`concRippleOut 1.4s ${delay}s ease-out infinite`}}/>
            ))}

            {/* Solute particles */}
            {(isRunning||isDone) && particles.map(({cx,cy,r},i) => (
                <circle key={i} cx={cx} cy={cy} r={r}
                    fill="url(#concParticleGrad)"
                    clipPath="url(#concFlaskClip)"
                    filter={isDone ? 'url(#concGlow)' : undefined}
                    style={{ animation:`concParticleFloat ${1.3+i*0.18}s ${i*0.09}s ease-in-out infinite`}}/>
            ))}

            {/* Rising bubbles */}
            {isDone && [
                {cx: 98,cy:220,dur:'1.1s', delay:'0s'  },
                {cx:120,cy:215,dur:'0.9s', delay:'0.18s'},
                {cx:145,cy:222,dur:'1.0s', delay:'0.4s' },
                {cx:168,cy:216,dur:'0.85s',delay:'0.08s'},
                {cx:108,cy:210,dur:'1.2s', delay:'0.55s'},
            ].map(({cx,cy,dur,delay},i) => (
                <circle key={i} cx={cx} cy={cy} r="4.5"
                    fill="url(#concBubbleGrad)" clipPath="url(#concFlaskClip)"
                    style={{ animation:`concBubbleRise ${dur} ${delay} infinite`}}/>
            ))}

            {/* Results panel */}
            {isDone && (
                <g style={{ animation:'concLabelPop 0.55s ease-out both'}}>
                    <rect x="8" y="10" width="90" height="96" rx="9"
                        fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.6"/>
                    <rect x="8" y="10" width="90" height="24" rx="9" fill="#0ea5e9"/>
                    <rect x="8" y="24" width="90" height="10" fill="#0ea5e9"/>
                    <text x="53" y="26" textAnchor="middle" fontSize="8" fontWeight="900"
                        fill="#fff" fontFamily="Outfit,sans-serif" letterSpacing="0.4">CONCENTRATIONS</text>
                    {[
                        {label:'Mass %',   val:'7.3 %' },
                        {label:'Molarity', val:'1.25 M'},
                        {label:'Molality', val:'1.35 m'},
                        {label:'χ (NaCl)', val:'0.0237'},
                    ].map(({label,val},i) => (
                        <g key={i}>
                            <text x="14"  y={42+i*16} fontSize="8" fontWeight="700"
                                fill="#475569" fontFamily="Outfit,sans-serif">{label}</text>
                            <text x="96"  y={42+i*16} textAnchor="end" fontSize="8.5" fontWeight="900"
                                fill="#0ea5e9" fontFamily="Outfit,sans-serif">{val}</text>
                            {i<3 && <line x1="14" y1={48+i*16} x2="94" y2={48+i*16}
                                stroke="#e0f2fe" strokeWidth="0.8"/>}
                        </g>
                    ))}
                </g>
            )}

            {/* Labels */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                <line x1="222" y1="48" x2="165" y2="48" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="227" y="51" textAnchor="start">Stopper</text>
                <line x1="222" y1="88" x2="162" y2="82" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="227" y="91" textAnchor="start">Neck</text>
                <line x1="222" y1="175" x2="195" y2="175" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="227" y="178" textAnchor="start">250 mL Flask</text>
                {isDone && (
                    <>
                        <line x1="42" y1="198" x2="78" y2="190" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2,2"/>
                        <text x="37" y="201" textAnchor="end" fill="#0ea5e9">NaCl(aq)</text>
                    </>
                )}
            </g>
        </svg>
    );
}

/* ══════════════════════════════════════════════════════
   SCENE 2 — Dilution Simulator
══════════════════════════════════════════════════════ */
function DilutionScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone    = phase === 'done';
    const liqCol    = isDone ? '#bfdbfe' : isRunning ? '#60a5fa' : '#1d4ed8';
    const liqOp     = isDone ? 0.52 : isRunning ? 0.7 : 0.88;

    return (
        <svg viewBox="0 0 270 285" style={{ width:'100%', height:'100%', maxHeight:310 }}>
            <defs>
                <clipPath id="dilFlaskClip">
                    <path d="M110 82 L110 114 L65 212 Q62 228 77 228 L193 228 Q208 228 205 212 L160 114 L160 82 Z"/>
                </clipPath>
                <linearGradient id="dilStreamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"  stopColor="#93c5fd" stopOpacity="0.95"/>
                    <stop offset="100%"stopColor="#bfdbfe" stopOpacity="0.5"/>
                </linearGradient>
                <radialGradient id="dilBubble" cx="32%" cy="32%" r="68%">
                    <stop offset="0%"  stopColor="#fff"    stopOpacity="0.96"/>
                    <stop offset="100%"stopColor="#93c5fd" stopOpacity="0.18"/>
                </radialGradient>
                <linearGradient id="dilGlassShine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"  stopColor="#fff" stopOpacity="0.26"/>
                    <stop offset="100%"stopColor="#fff" stopOpacity="0.04"/>
                </linearGradient>
            </defs>

            {/* Bench */}
            <rect x="10" y="258" width="250" height="14" fill="#d1d5db" rx="4"/>
            <rect x="10" y="268" width="250" height="4"  fill="#b0bec5" rx="2" opacity="0.5"/>

            {/* Wash bottle */}
            <g>
                <rect x="18" y="28" width="40" height="62" fill="rgba(219,234,254,0.76)"
                    stroke="#94a3b8" strokeWidth="2" rx="7"/>
                <rect x="22" y="32" width="8"  height="50" fill="white" rx="4" opacity="0.2"/>
                <rect x="27" y="18" width="22" height="14" fill="#64748b" rx="4"/>
                <rect x="34" y="12" width="8"  height="10" fill="#94a3b8" rx="3"/>
                {/* Tube to flask */}
                <line x1="38" y1="16" x2="122" y2="58" stroke="#94a3b8" strokeWidth="3"
                    strokeLinecap="round" strokeDasharray={isRunning ? '5,4' : 'none'}/>
                {/* Water level inside bottle */}
                <rect x="20" y={isDone ? 68 : isRunning ? 52 : 32} width="36"
                    height={isDone ? 22 : isRunning ? 38 : 58}
                    fill="#bfdbfe" rx="4" opacity="0.62"
                    style={{ transition:'y 2.5s ease, height 2.5s ease'}}/>
                <text x="38" y="58" textAnchor="middle" fontSize="9" fontWeight="800"
                    fill="#1d4ed8" fontFamily="Outfit,sans-serif">H₂O</text>
            </g>

            {/* Water drops */}
            {isRunning && [0,1,2,3,4].map(i => (
                <ellipse key={i} cx={124+i*1.2} cy={70+i*9} rx="3" ry="5"
                    fill="url(#dilStreamGrad)" opacity="0.9"
                    style={{ animation:`dilDropFall 0.52s ${i*0.1}s infinite`}}/>
            ))}

            {/* Flask neck */}
            <rect x="107" y="46" width="56" height="40" fill="rgba(219,234,254,0.32)"
                stroke="#94a3b8" strokeWidth="2.2" rx="5"/>
            {/* Flask body */}
            <path d="M110 82 L110 114 L65 212 Q62 228 77 228 L193 228 Q208 228 205 212 L160 114 L160 82 Z"
                fill="rgba(219,234,254,0.18)" stroke="#94a3b8" strokeWidth="2.6"/>
            <path d="M110 82 L110 114 L65 212 Q62 228 77 228 L193 228 Q208 228 205 212 L160 114 L160 82 Z"
                fill="url(#dilGlassShine)"/>

            {/* Liquid */}
            <rect x="60" y="112" width="150" height="120"
                fill={liqCol} clipPath="url(#dilFlaskClip)"
                opacity={liqOp} style={{ transition:'fill 2.2s ease, opacity 2.2s ease'}}/>

            {/* Mixing bubbles */}
            {isRunning && [
                {cx: 90,cy:218,dur:'0.9s', delay:'0s'  },
                {cx:115,cy:213,dur:'1.1s', delay:'0.2s' },
                {cx:140,cy:220,dur:'0.85s',delay:'0.35s'},
                {cx:168,cy:215,dur:'1.0s', delay:'0.1s' },
                {cx:102,cy:210,dur:'1.15s',delay:'0.5s' },
            ].map(({cx,cy,dur,delay},i) => (
                <circle key={i} cx={cx} cy={cy} r="5"
                    fill="url(#dilBubble)" clipPath="url(#dilFlaskClip)"
                    style={{ animation:`dilBubbleRise ${dur} ${delay} infinite`}}/>
            ))}

            {/* Graduation ticks */}
            {[0.25,0.5,0.75].map((frac,i) => {
                const y  = 228 - frac*110;
                const x1 = 205 - frac*26;
                return <line key={i} x1={x1} y1={y} x2={x1+12} y2={y} stroke="#94a3b8" strokeWidth="1.2"/>;
            })}

            {/* Molarity readout */}
            {(isRunning||isDone) && (
                <g style={{ animation:'dilLabelSlide 0.5s ease-out both'}}>
                    <rect x="168" y="10" width="90" height="65" rx="8"
                        fill={isDone ? '#eff6ff' : '#dbeafe'} stroke="#6366f1" strokeWidth="1.5"/>
                    <rect x="168" y="10" width="90" height="23" rx="8" fill="#6366f1"/>
                    <rect x="168" y="23" width="90" height="10" fill="#6366f1"/>
                    <text x="213" y="26" textAnchor="middle" fontSize="8" fontWeight="900"
                        fill="#fff" fontFamily="Outfit,sans-serif" letterSpacing="0.4">MOLARITY</text>
                    <text x="213" y="48" textAnchor="middle" fontSize="20" fontWeight="900"
                        fill={isDone ? '#4f46e5' : '#2563eb'} fontFamily="Outfit,sans-serif"
                        style={{ animation:'dilMolPulse 1.5s ease-in-out infinite'}}>
                        {isDone ? '0.67' : '1.20'} M
                    </text>
                    <text x="213" y="67" textAnchor="middle" fontSize="7.5" fontWeight="600"
                        fill="#64748b" fontFamily="Outfit,sans-serif">
                        {isDone ? '▼ after dilution' : '▼ diluting…'}
                    </text>
                </g>
            )}

            {/* C₁V₁=C₂V₂ box */}
            {isDone && (
                <g style={{ animation:'fadeScaleIn 0.5s 0.2s ease-out both'}}>
                    <rect x="8" y="95" width="92" height="38" rx="6"
                        fill="#eff6ff" stroke="#6366f1" strokeWidth="1.4"/>
                    <text x="54" y="111" textAnchor="middle" fontSize="9" fontWeight="800"
                        fill="#4f46e5" fontFamily="Outfit,sans-serif">C₁V₁ = C₂V₂</text>
                    <text x="54" y="125" textAnchor="middle" fontSize="7.5" fontWeight="700"
                        fill="#6366f1" fontFamily="Outfit,sans-serif">2M × 250 = 0.67M × 750</text>
                </g>
            )}

            {/* Labels */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                <text x="38" y="104" textAnchor="middle" fontSize="7.5" fill="#64748b"
                    style={{ opacity: isDone ? 0 : 1, transition: 'opacity 0.3s ease' }}>Wash Bottle</text>
                <line x1="222" y1="165" x2="196" y2="165" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="227" y="168" textAnchor="start">250 mL Flask</text>
                <line x1="45" y1="200" x2="74" y2="194" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="40" y="203" textAnchor="end" fill="#1d4ed8">Solution</text>
            </g>
        </svg>
    );
}

/* ══════════════════════════════════════════════════════
   SCENE 3 — Temperature vs Solubility
══════════════════════════════════════════════════════ */
function SolubilityScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone    = phase === 'done';

    const crystalOpacity = isDone ? 0.04 : isRunning ? 0.45 : 1;
    const crystalScale   = isDone ? 0.2  : isRunning ? 0.65 : 1;
    const liquidCol      = isDone ? '#fde68a' : isRunning ? '#fef3c7' : '#e0f2fe';
    const tempDeg        = isDone ? '62' : isRunning ? '40' : '22';

    const crystals = [
        {cx: 82,cy:218,rot:0  },{cx: 98,cy:213,rot:25},{cx:116,cy:220,rot:15},
        {cx:133,cy:214,rot:40},{cx:150,cy:219,rot:10 },{cx:168,cy:215,rot:30},
        {cx: 90,cy:210,rot:50},{cx:160,cy:210,rot:60 },{cx:142,cy:222,rot:20},
    ];

    return (
        <svg viewBox="0 0 270 285" style={{ width:'100%', height:'100%', maxHeight:310 }}>
            <defs>
                <clipPath id="solBeakerClip">
                    <rect x="58" y="102" width="134" height="128"/>
                </clipPath>
                <linearGradient id="solBunsenGrad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%"  stopColor="#1d4ed8"/>
                    <stop offset="48%" stopColor="#60a5fa"/>
                    <stop offset="100%"stopColor="#bfdbfe" stopOpacity="0.4"/>
                </linearGradient>
                <radialGradient id="solBubble" cx="30%" cy="30%" r="70%">
                    <stop offset="0%"  stopColor="#fff"    stopOpacity="0.9"/>
                    <stop offset="100%"stopColor="#fcd34d" stopOpacity="0.12"/>
                </radialGradient>
                <linearGradient id="solGlassShine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"  stopColor="#fff" stopOpacity="0.22"/>
                    <stop offset="100%"stopColor="#fff" stopOpacity="0.04"/>
                </linearGradient>
            </defs>

            {/* Bench */}
            <rect x="10" y="258" width="250" height="14" fill="#d1d5db" rx="4"/>
            <rect x="10" y="268" width="250" height="4"  fill="#b0bec5" rx="2" opacity="0.5"/>

            {/* Bunsen burner */}
            <ellipse cx="198" cy="258" rx="30" ry="8" fill="#374151"/>
            <rect x="185" y="200" width="26" height="60" fill="#9ca3af" rx="5"/>
            <rect x="183" y="200" width="5"  height="12" fill="#6b7280" rx="2"/>
            <rect x="185" y="192" width="26" height="12" fill="#94a3b8" rx="4"/>
            <ellipse cx="198" cy="212" rx="13" ry="4" fill="#4b5563"/>

            {(isRunning||isDone) && (
                <g style={{ transformOrigin:'198px 191px', animation:'solFlameFlicker 0.42s ease-in-out infinite'}}>
                    <ellipse cx="198" cy="178" rx="11" ry="16" fill="url(#solBunsenGrad)" opacity="0.9"/>
                    <ellipse cx="198" cy="184" rx="6"  ry="9"  fill="#dbeafe"             opacity="0.95"/>
                    <ellipse cx="198" cy="188" rx="3"  ry="5"  fill="#ffffff"             opacity="0.8"/>
                </g>
            )}

            {/* Wire gauze + tripod */}
            <line x1="148" y1="238" x2="248" y2="238" stroke="#6b7280" strokeWidth="3.5" strokeLinecap="round"/>
            {[152,164,176,188,200,212,224,236].map(x => (
                <line key={x} x1={x} y1="238" x2={x} y2="244" stroke="#4b5563" strokeWidth="1"/>
            ))}
            <line x1="158" y1="238" x2="172" y2="258" stroke="#4b5563" strokeWidth="2.5"/>
            <line x1="198" y1="238" x2="198" y2="258" stroke="#4b5563" strokeWidth="2.5"/>
            <line x1="238" y1="238" x2="224" y2="258" stroke="#4b5563" strokeWidth="2.5"/>

            {/* Beaker */}
            <path d="M58 98 L58 230 Q58 240 70 240 L182 240 Q194 240 194 230 L194 98 Z"
                fill="rgba(248,250,252,0.62)" stroke="#94a3b8" strokeWidth="2.6"/>
            <rect x="50" y="88" width="150" height="14" fill="#94a3b8" rx="3"/>
            <path d="M58 98 L58 230 Q58 240 70 240 L182 240 Q194 240 194 230 L194 98 Z"
                fill="url(#solGlassShine)"/>
            {/* Spout notch */}
            <path d="M50 88 L50 96 L58 98" fill="#94a3b8"/>

            {/* Liquid */}
            <rect x="60" y="102" width="132" height="128"
                fill={liquidCol} clipPath="url(#solBeakerClip)"
                opacity="0.84" style={{ transition:'fill 2s ease'}}/>

            {/* Crystals */}
            {crystals.map(({cx,cy,rot},i) => (
                <g key={i} style={{
                    transformOrigin:`${cx}px ${cy}px`,
                    transform:`scale(${crystalScale})`,
                    opacity:crystalOpacity,
                    transition:`transform 2s ${i*0.18}s ease, opacity 2s ${i*0.18}s ease`,
                }}>
                    <polygon
                        points={`${cx},${cy-7} ${cx+6},${cy} ${cx},${cy+7} ${cx-6},${cy}`}
                        fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.3"
                        transform={`rotate(${rot},${cx},${cy})`}/>
                    <circle cx={cx} cy={cy} r="2.2" fill="#7dd3fc" opacity="0.75"/>
                </g>
            ))}

            {/* Convection bubbles */}
            {(isRunning||isDone) && [
                {cx: 78,cy:228,dur:'1.1s', delay:'0s'  },
                {cx:100,cy:224,dur:'0.92s',delay:'0.22s'},
                {cx:122,cy:230,dur:'1.0s', delay:'0.45s'},
                {cx:148,cy:226,dur:'0.88s',delay:'0.15s'},
                {cx:170,cy:228,dur:'1.05s',delay:'0.55s'},
                {cx: 90,cy:216,dur:'1.2s', delay:'0.7s' },
            ].map(({cx,cy,dur,delay},i) => (
                <circle key={i} cx={cx} cy={cy} r="4.5"
                    fill="url(#solBubble)" clipPath="url(#solBeakerClip)"
                    style={{ animation:`solBubbleRise ${dur} ${delay} infinite`}}/>
            ))}

            {/* Smoke wisps */}
            {isDone && [{cx:90,cy:98},{cx:126,cy:95},{cx:162,cy:98}].map(({cx,cy},i) => (
                <ellipse key={i} cx={cx} cy={cy} rx="7" ry="10" fill="#e2e8f0" opacity="0.5"
                    style={{ animation:`solSmoke 1.4s ${i*0.35}s ease-out infinite`}}/>
            ))}

            {/* Thermometer */}
            <rect x="174" y="100" width="11" height="76" rx="5.5"
                fill="white" stroke="#94a3b8" strokeWidth="1.6"/>
            <rect x="176" y={isDone ? 112 : isRunning ? 130 : 162} width="7"
                height={isDone ? 64 : isRunning ? 46 : 14} rx="3.5"
                fill="#ef4444" style={{ transition:'height 2.2s ease, y 2.2s ease'}}/>
            <circle cx="179" cy="180" r="8" fill="#ef4444" stroke="#94a3b8" strokeWidth="1.6"/>
            <text x="194" y={isDone ? 116 : isRunning ? 135 : 167}
                fontSize="9.5" fontWeight="900" fill="#ef4444" fontFamily="Outfit,sans-serif"
                style={{ transition:'y 2.2s ease'}}>{tempDeg}°C</text>

            {/* Solubility mini-graph */}
            {isDone && (
                <g style={{ animation:'fadeScaleIn 0.5s 0.1s ease-out both'}}>
                    <rect x="6" y="88" width="48" height="54" rx="5"
                        fill="#fff1f2" stroke="#ef4444" strokeWidth="1.4"/>
                    <text x="30" y="100" textAnchor="middle" fontSize="6.5" fontWeight="800"
                        fill="#ef4444" fontFamily="Outfit,sans-serif">g/100mL</text>
                    <line x1="12" y1="133" x2="50" y2="133" stroke="#94a3b8" strokeWidth="1.2"/>
                    <line x1="12" y1="133" x2="12" y2="103" stroke="#94a3b8" strokeWidth="1.2"/>
                    <path d="M12 132 Q20 127 28 120 Q36 112 50 103"
                        stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round"
                        strokeDasharray="180" strokeDashoffset="0"
                        style={{ animation:'solGraphDraw 1.6s ease-out both'}}/>
                    {[[12,132],[28,120],[50,103]].map(([x,y],i) => (
                        <circle key={i} cx={x} cy={y} r="2.5" fill="#ef4444"/>
                    ))}
                    <text x="30" y="140" textAnchor="middle" fontSize="5.5" fill="#94a3b8"
                        fontFamily="Outfit,sans-serif">Temp (°C) →</text>
                    <text x="10" y="133" textAnchor="end" fontSize="5" fill="#94a3b8"
                        fontFamily="Outfit,sans-serif">31</text>
                    <text x="10" y="103" textAnchor="end" fontSize="5" fill="#94a3b8"
                        fontFamily="Outfit,sans-serif">110</text>
                </g>
            )}

            {/* Labels */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                <line x1="42" y1="145" x2="58" y2="145" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="37" y="148" textAnchor="end">Beaker</text>
                <line x1="42" y1="185" x2="65" y2="192" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="37" y="188" textAnchor="end" fill="#d97706">KNO₃(aq)</text>
                <text x="220" y="202" textAnchor="start" fontSize="8">Bunsen</text>
                <text x="220" y="212" textAnchor="start" fontSize="8">Burner</text>
                {isDone
                    ? <text x="126" y="254" textAnchor="middle" fontSize="9" fontWeight="800" fill="#16a34a">
                        ✓ All crystals dissolved at 62 °C
                      </text>
                    : <text x="126" y="254" textAnchor="middle" fontSize="8" fill="#64748b">
                        KNO₃ crystals — undissolved
                      </text>
                }
            </g>
        </svg>
    );
}

/* ══════════════════════════════════════════════════════
   SCENE 4 — Henry's Law
══════════════════════════════════════════════════════ */
function HenrysLawScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone    = phase === 'done';

    const dissolvedCount   = isDone ? 12 : isRunning ? 6 : 2;
    const pistonY          = isDone ? 64  : isRunning ? 84 : 112;
    const gasParticleAlpha = isDone ? 0.28 : isRunning ? 0.58 : 0.9;
    const pressureVal      = isDone ? '3.0' : isRunning ? '2.0' : '1.0';

    const dissolvedPositions = [
        {cx: 82,cy:198},{cx:100,cy:188},{cx:118,cy:196},{cx:136,cy:190},
        {cx:154,cy:199},{cx:170,cy:186},{cx: 90,cy:180},{cx:142,cy:180},
        {cx:106,cy:206},{cx:126,cy:176},{cx:160,cy:204},{cx: 74,cy:192},
    ];
    const gasParticles = [
        {cx: 92,cy:130},{cx:118,cy:118},{cx:144,cy:132},{cx:168,cy:120},
        {cx: 80,cy:145},{cx:155,cy:146},{cx:104,cy:108},{cx:132,cy:148},
        {cx: 96,cy:100},{cx:146,cy:100},
    ];

    return (
        <svg viewBox="0 0 270 285" style={{ width:'100%', height:'100%', maxHeight:310 }}>
            <defs>
                <clipPath id="hlGasClip">
                    <rect x="62" y="60" width="136" height={Math.max(pistonY-62,2)}/>
                </clipPath>
                <clipPath id="hlLiqClip">
                    <rect x="62" y={pistonY+12} width="136" height={Math.max(230-pistonY-12,2)}/>
                </clipPath>
                <radialGradient id="hlGasParticle" cx="38%" cy="38%" r="62%">
                    <stop offset="0%"  stopColor="#bbf7d0" stopOpacity="1"  />
                    <stop offset="100%"stopColor="#059669" stopOpacity="0.55"/>
                </radialGradient>
                <radialGradient id="hlDissParticle" cx="35%" cy="35%" r="65%">
                    <stop offset="0%"  stopColor="#6ee7b7" stopOpacity="1"  />
                    <stop offset="100%"stopColor="#059669" stopOpacity="0.65"/>
                </radialGradient>
                <linearGradient id="hlLiqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"  stopColor="#d1fae5" stopOpacity="0.7"/>
                    <stop offset="100%"stopColor="#a7f3d0" stopOpacity="0.9"/>
                </linearGradient>
                <filter id="hlGlow">
                    <feGaussianBlur stdDeviation="2" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            {/* Bench */}
            <rect x="10" y="258" width="250" height="14" fill="#d1d5db" rx="4"/>
            <rect x="10" y="268" width="250" height="4"  fill="#b0bec5" rx="2" opacity="0.5"/>

            {/* Cylinder walls */}
            <rect x="58" y="56" width="148" height="180" rx="6"
                fill="rgba(236,253,245,0.28)" stroke="#94a3b8" strokeWidth="2.6"/>
            {/* Scale marks */}
            {[0.25,0.5,0.75].map((frac,i) => {
                const y = 56 + frac*180;
                return (
                    <g key={i}>
                        <line x1="196" y1={y} x2="204" y2={y} stroke="#94a3b8" strokeWidth="1.2"/>
                        <text x="207" y={y+3} fontSize="6.5" fill="#94a3b8"
                            fontFamily="Outfit,sans-serif">{Math.round(frac*3)} atm</text>
                    </g>
                );
            })}

            {/* Gas space */}
            <rect x="60" y="58" width="144" height={Math.max(pistonY-60,0)}
                fill="rgba(187,247,208,0.35)"
                style={{ transition:'height 1.8s ease'}}/>

            {/* Gas particles */}
            {gasParticles.map(({cx,cy},i) => (
                <circle key={i} cx={cx} cy={cy} r="5.5"
                    fill="url(#hlGasParticle)"
                    opacity={gasParticleAlpha}
                    clipPath="url(#hlGasClip)"
                    filter={!isDone ? 'url(#hlGlow)' : undefined}
                    style={{
                        animation:`hlGasJiggle ${0.75+i*0.1}s ${i*0.09}s ease-in-out infinite`,
                        transition:'opacity 1.8s ease',
                    }}/>
            ))}

            {/* Piston rod */}
            <rect x="120" y={pistonY-38} width="24" height={38} rx="4"
                fill="#94a3b8" stroke="#6b7280" strokeWidth="1.2"
                style={{ transition:'y 1.8s ease, height 1.8s ease'}}/>
            {/* T-bar handle */}
            <rect x="100" y={pistonY-50} width="64" height="14" rx="5"
                fill="#475569" style={{ transition:'y 1.8s ease'}}/>
            <rect x="128" y={pistonY-58} width="8"  height="12" rx="3"
                fill="#334155" style={{ transition:'y 1.8s ease'}}/>
            {/* Piston disc */}
            <rect x="60"  y={pistonY} width="144" height="12" rx="4"
                fill="#64748b" stroke="#475569" strokeWidth="1.8"
                style={{ transition:'y 1.8s ease', animation:'hlPistonPress 2.2s ease-in-out infinite'}}/>
            <text x="132" y={pistonY+9} textAnchor="middle" fontSize="7.5" fontWeight="800"
                fill="#f8fafc" fontFamily="Outfit,sans-serif"
                style={{ transition:'y 1.8s ease'}}>PISTON</text>

            {/* Force arrow */}
            {(isRunning||isDone) && (
                <g>
                    <text x="132" y={pistonY-60} textAnchor="middle" fontSize="18"
                        fill="#ef4444" fontFamily="Outfit,sans-serif"
                        style={{ animation:'hlArrowBounce 0.8s ease-in-out infinite'}}>↓</text>
                    <text x="36"  y={pistonY+9} textAnchor="middle" fontSize="9" fontWeight="800"
                        fill="#ef4444" fontFamily="Outfit,sans-serif">P↑</text>
                </g>
            )}

            {/* Liquid space */}
            <rect x="60" y={pistonY+12} width="144" height={Math.max(230-pistonY-12,0)}
                fill="url(#hlLiqGrad)"
                style={{ transition:'y 1.8s ease, height 1.8s ease'}}/>

            {/* Interface line */}
            <line x1="60" y1={pistonY+12} x2="204" y2={pistonY+12}
                stroke="#10b981" strokeWidth="2" strokeDasharray="5,4"
                style={{ transition:'y 1.8s ease', animation:'hlIfaceRipple 1.5s ease-in-out infinite'}}/>
            <text x="207" y={pistonY+16} fontSize="7" fill="#059669" fontWeight="700"
                fontFamily="Outfit,sans-serif"
                style={{ transition:'y 1.8s ease'}}>interface</text>

            {/* Dissolved CO₂ particles */}
            {dissolvedPositions.slice(0,dissolvedCount).map(({cx,cy},i) => (
                <circle key={i} cx={cx} cy={cy} r="5"
                    fill="url(#hlDissParticle)"
                    clipPath="url(#hlLiqClip)"
                    style={{ animation:`hlDissFloat ${1.0+i*0.12}s ${i*0.08}s ease-in-out infinite`}}/>
            ))}

            {isDone && (
                <text x="132" y="212" textAnchor="middle" fontSize="7.5" fontWeight="700"
                    fill="#047857" fontFamily="Outfit,sans-serif" clipPath="url(#hlLiqClip)">
                    CO₂ dissolved ↑
                </text>
            )}

            {/* Pressure gauge */}
            <g transform="translate(215,64)">
                <circle cx="20" cy="20" r="20" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2"/>
                <path d="M4 30 A18 18 0 0 1 36 30" fill="none"
                    stroke={isDone ? '#059669' : isRunning ? '#10b981' : '#94a3b8'}
                    strokeWidth="3" strokeLinecap="round" style={{ transition:'stroke 1s ease'}}/>
                <line x1="20" y1="20"
                    x2={20+12*Math.cos((isDone?-40:isRunning?-10:30)*Math.PI/180)}
                    y2={20+12*Math.sin((isDone?-40:isRunning?-10:30)*Math.PI/180)}
                    stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"
                    style={{ transition:'x2 1.5s ease, y2 1.5s ease'}}/>
                <circle cx="20" cy="20" r="3" fill="#475569"/>
                <text x="20" y="15" textAnchor="middle" fontSize="6.5" fontWeight="700"
                    fill="#475569" fontFamily="Outfit,sans-serif">P</text>
                <text x="20" y="32" textAnchor="middle" fontSize="9.5" fontWeight="900"
                    fill={isDone ? '#059669' : isRunning ? '#10b981' : '#94a3b8'}
                    fontFamily="Outfit,sans-serif"
                    style={{ transition:'fill 1s ease'}}>{pressureVal}</text>
                <text x="20" y="40" textAnchor="middle" fontSize="6" fill="#94a3b8"
                    fontFamily="Outfit,sans-serif">atm</text>
            </g>

            {/* Henry's Law graph */}
            {isDone && (
                <g style={{ animation:'fadeScaleIn 0.5s 0.1s ease-out both'}}>
                    <rect x="6" y="66" width="48" height="52" rx="5"
                        fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5"/>
                    <text x="30" y="79" textAnchor="middle" fontSize="7" fontWeight="800"
                        fill="#059669" fontFamily="Outfit,sans-serif">p ∝ x</text>
                    <line x1="12" y1="110" x2="50" y2="110" stroke="#94a3b8" strokeWidth="1"/>
                    <line x1="12" y1="110" x2="12" y2="80"  stroke="#94a3b8" strokeWidth="1"/>
                    <line x1="12" y1="110" x2="50" y2="80"
                        stroke="#10b981" strokeWidth="2.2" strokeLinecap="round"
                        strokeDasharray="55" strokeDashoffset="0"
                        style={{ animation:'hlGraphAppear 1.4s ease-out both'}}/>
                    {[[12,110],[31,95],[50,80]].map(([x,y],i) => (
                        <circle key={i} cx={x} cy={y} r="2.5" fill="#10b981"/>
                    ))}
                    <text x="30" y="117" textAnchor="middle" fontSize="5.5" fill="#94a3b8"
                        fontFamily="Outfit,sans-serif">x (mole frac.) →</text>
                </g>
            )}

            {/* Labels */}
            <g fontSize="9" fill="#475569" fontWeight="700" fontFamily="Outfit,sans-serif">
                <line x1="215" y1="178" x2="204" y2="188" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="220" y="181" textAnchor="start">Solution</text>
                <text x="220" y="191" textAnchor="start" fontSize="7.5" fill="#64748b">(H₂O + CO₂)</text>
                <line x1="215" y1={pistonY-18} x2="204" y2={pistonY-8}
                    stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"
                    style={{ transition:'y 1.8s ease'}}/>
                <text x="220" y={pistonY-15} textAnchor="start"
                    style={{ transition:'y 1.8s ease'}}>CO₂ gas</text>
                <text x="235" y="86" textAnchor="start" fontSize="7.5">Pressure</text>
                <text x="235" y="96" textAnchor="start" fontSize="7.5">Gauge</text>
            </g>
        </svg>
    );
}

/* ══════════════════════════════════════════════════════
   SCENE 5 — Boiling Point Elevation
══════════════════════════════════════════════════════ */
function BoilingPointScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone    = phase === 'done';

    const pureTempY = isDone ? 60  : isRunning ? 80  : 110;
    const solTempY  = isDone ? 66  : isRunning ? 86  : 110;
    const pureTemp  = isDone ? '100' : isRunning ? '74' : '25';
    const solTemp   = isDone ? '101' : isRunning ? '67' : '25';

    const pureBubbles = [{cx:82,cy:188},{cx:96,cy:180},{cx:82,cy:170},{cx:96,cy:162}];
    const solBubbles  = [{cx:174,cy:188},{cx:162,cy:180},{cx:174,cy:170},{cx:162,cy:162}];

    return (
        <svg viewBox="0 0 280 285" style={{ width:'100%', height:'100%', maxHeight:310 }}>
            <defs>
                <linearGradient id="bpFlame" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%"  stopColor="#1d4ed8"/>
                    <stop offset="48%" stopColor="#60a5fa"/>
                    <stop offset="100%"stopColor="#bfdbfe" stopOpacity="0.38"/>
                </linearGradient>
                <clipPath id="bpPureClip"><rect x="56" y="128" width="82" height="98"/></clipPath>
                <clipPath id="bpSolClip"><rect  x="148" y="128" width="82" height="98"/></clipPath>
                <radialGradient id="bpPureBubble" cx="30%" cy="30%" r="70%">
                    <stop offset="0%"  stopColor="#fff"    stopOpacity="0.95"/>
                    <stop offset="100%"stopColor="#bfdbfe" stopOpacity="0.14"/>
                </radialGradient>
                <radialGradient id="bpSolBubble" cx="30%" cy="30%" r="70%">
                    <stop offset="0%"  stopColor="#fff"    stopOpacity="0.95"/>
                    <stop offset="100%"stopColor="#fde68a" stopOpacity="0.18"/>
                </radialGradient>
            </defs>

            {/* Bench */}
            <rect x="8"  y="258" width="264" height="14" fill="#d1d5db" rx="4"/>
            <rect x="8"  y="268" width="264" height="4"  fill="#b0bec5" rx="2" opacity="0.5"/>

            {/* ── LEFT — Pure Water ── */}
            <path d="M56 122 L56 228 Q56 238 66 238 L148 238 Q158 238 158 228 L158 122 Z"
                fill="rgba(219,234,254,0.28)" stroke="#94a3b8" strokeWidth="2.6"/>
            <rect x="48" y="112" width="118" height="14" fill="#94a3b8" rx="3"/>
            <rect x="58"  y="128" width="98"  height="98" fill="#bfdbfe"
                clipPath="url(#bpPureClip)" opacity="0.84"/>
            {isDone && pureBubbles.map(({cx,cy},i) => (
                <circle key={i} cx={cx} cy={cy} r="5.5"
                    fill="url(#bpPureBubble)" clipPath="url(#bpPureClip)"
                    style={{ animation:`bpBubbleRise 0.88s ${i*0.22}s infinite`}}/>
            ))}
            {isDone && [{cx:80,cy:126},{cx:97,cy:122},{cx:114,cy:125}].map(({cx,cy},i) => (
                <ellipse key={i} cx={cx} cy={cy} rx="7" ry="10" fill="#e0f2fe" opacity="0.6"
                    style={{ animation:`bpSteamPuff 1.0s ${i*0.28}s infinite`}}/>
            ))}
            {/* Left thermometer */}
            <rect x="141" y="114" width="10" height="76" rx="5"
                fill="white" stroke="#94a3b8" strokeWidth="1.6"/>
            <rect x="143" y={pureTempY} width="6" height={192-pureTempY} rx="3"
                fill="#3b82f6" style={{ transition:'height 2.2s ease, y 2.2s ease'}}/>
            <circle cx="146" cy="194" r="7.5" fill="#3b82f6" stroke="#94a3b8" strokeWidth="1.6"/>
            <text x="138" y={pureTempY+4} fontSize="9.5" fontWeight="900"
                fill="#2563eb" fontFamily="Outfit,sans-serif" textAnchor="end"
                style={{ transition:'y 2.2s ease'}}>{pureTemp}°C</text>
            {/* Pure water labels */}
            <text x="103" y="252" textAnchor="middle" fontSize="9" fontWeight="800"
                fill="#1d4ed8" fontFamily="Outfit,sans-serif">Pure Water</text>
            <text x="103" y="263" textAnchor="middle" fontSize="7.5" fontWeight="600"
                fill="#64748b" fontFamily="Outfit,sans-serif">BP = 100 °C</text>

            {/* ── RIGHT — NaCl Solution ── */}
            <path d="M158 122 L158 228 Q158 238 168 238 L240 238 Q250 238 250 228 L250 122 Z"
                fill="rgba(254,243,199,0.28)" stroke="#94a3b8" strokeWidth="2.6"/>
            <rect x="150" y="112" width="108" height="14" fill="#94a3b8" rx="3"/>
            <rect x="160" y="128" width="88"  height="98" fill="#fde68a"
                clipPath="url(#bpSolClip)" opacity="0.72"/>
            {/* NaCl ions — alternating Na⁺ and Cl⁻ colour */}
            {[
                {cx:168,cy:198},{cx:182,cy:190},{cx:198,cy:198},{cx:166,cy:180},
                {cx:214,cy:186},{cx:180,cy:172},{cx:202,cy:176},{cx:224,cy:194},
            ].map(({cx,cy},i) => (
                <circle key={i} cx={cx} cy={cy} r="3.8"
                    fill={i%2===0 ? '#fef9c3' : '#dbeafe'}
                    stroke={i%2===0 ? '#d97706' : '#0ea5e9'} strokeWidth="0.9"
                    clipPath="url(#bpSolClip)" opacity="0.92"/>
            ))}
            {isDone && solBubbles.map(({cx,cy},i) => (
                <circle key={i} cx={cx} cy={cy} r="5.5"
                    fill="url(#bpSolBubble)" clipPath="url(#bpSolClip)"
                    style={{ animation:`bpBubbleRise 1.02s ${i*0.28}s infinite`}}/>
            ))}
            {isDone && [{cx:178,cy:126},{cx:196,cy:122},{cx:214,cy:125}].map(({cx,cy},i) => (
                <ellipse key={i} cx={cx} cy={cy} rx="7" ry="10" fill="#fef9c3" opacity="0.6"
                    style={{ animation:`bpSteamPuff 1.18s ${i*0.28}s infinite`}}/>
            ))}
            {/* Right thermometer */}
            <rect x="233" y="114" width="10" height="76" rx="5"
                fill="white" stroke="#94a3b8" strokeWidth="1.6"/>
            <rect x="235" y={solTempY} width="6" height={192-solTempY} rx="3"
                fill="#f59e0b" style={{ transition:'height 2.2s ease, y 2.2s ease'}}/>
            <circle cx="238" cy="194" r="7.5" fill="#f59e0b" stroke="#94a3b8" strokeWidth="1.6"/>
            <text x="247" y={solTempY+4} fontSize="9.5" fontWeight="900"
                fill="#d97706" fontFamily="Outfit,sans-serif"
                style={{ transition:'y 2.2s ease'}}>{solTemp}°C</text>
            {/* NaCl solution labels */}
            <text x="200" y="252" textAnchor="middle" fontSize="9" fontWeight="800"
                fill="#d97706" fontFamily="Outfit,sans-serif">NaCl Solution</text>
            <text x="200" y="263" textAnchor="middle" fontSize="7.5" fontWeight="600"
                fill="#64748b" fontFamily="Outfit,sans-serif">BP = 100.51 °C</text>

            {/* Two Bunsen burners */}
            {/* Left */}
            <ellipse cx="103" cy="254" rx="28" ry="7" fill="#374151"/>
            <rect x="89"  y="232" width="28" height="24" fill="#9ca3af" rx="5"/>
            <rect x="89"  y="226" width="28" height="10" fill="#94a3b8" rx="4"/>
            <ellipse cx="103" cy="237" rx="12" ry="3.5" fill="#4b5563"/>
            {(isRunning||isDone) && (
                <g style={{ transformOrigin:'103px 225px', animation:'bpFlicker 0.42s ease-in-out infinite'}}>
                    <ellipse cx="103" cy="214" rx="10" ry="14" fill="url(#bpFlame)" opacity="0.9"/>
                    <ellipse cx="103" cy="220" rx="5"  ry="8"  fill="#dbeafe"       opacity="0.92"/>
                    <ellipse cx="103" cy="224" rx="3"  ry="4"  fill="#fff"          opacity="0.75"/>
                </g>
            )}
            {/* Right */}
            <ellipse cx="200" cy="254" rx="28" ry="7" fill="#374151"/>
            <rect x="186" y="232" width="28" height="24" fill="#9ca3af" rx="5"/>
            <rect x="186" y="226" width="28" height="10" fill="#94a3b8" rx="4"/>
            <ellipse cx="200" cy="237" rx="12" ry="3.5" fill="#4b5563"/>
            {(isRunning||isDone) && (
                <g style={{ transformOrigin:'200px 225px', animation:'bpFlicker 0.42s 0.12s ease-in-out infinite'}}>
                    <ellipse cx="200" cy="214" rx="10" ry="14" fill="url(#bpFlame)" opacity="0.9"/>
                    <ellipse cx="200" cy="220" rx="5"  ry="8"  fill="#dbeafe"       opacity="0.92"/>
                    <ellipse cx="200" cy="224" rx="3"  ry="4"  fill="#fff"          opacity="0.75"/>
                </g>
            )}

            {/* ΔTb annotation */}
            {isDone && (
                <g style={{ animation:'fadeScaleIn 0.5s 0.2s ease-out both'}}>
                    <rect x="8" y="64" width="76" height="48" rx="6"
                        fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5"/>
                    <text x="46" y="80" textAnchor="middle" fontSize="8.5" fontWeight="800"
                        fill="#d97706" fontFamily="Outfit,sans-serif">ΔTb = i·Kb·m</text>
                    <text x="46" y="94" textAnchor="middle" fontSize="7.5" fontWeight="600"
                        fill="#92400e" fontFamily="Outfit,sans-serif">= 2 × 0.512 × 0.5</text>
                    <text x="46" y="107" textAnchor="middle" fontSize="9" fontWeight="900"
                        fill="#d97706" fontFamily="Outfit,sans-serif">= 0.51 °C ↑</text>
                    {/* Dashed pointer to thermometers */}
                    <line x1="84" y1="86" x2="136" y2={pureTempY+6}
                        stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="3,2"/>
                </g>
            )}

            {/* Gap indicator */}
            {isDone && (
                <g>
                    <line x1="155" y1={pureTempY+6} x2="155" y2={solTempY+6}
                        stroke="#ef4444" strokeWidth="2"/>
                    <circle cx="155" cy={pureTempY+6} r="2.5" fill="#ef4444"/>
                    <circle cx="155" cy={solTempY+6}  r="2.5" fill="#ef4444"/>
                    <text x="159" y={(pureTempY+solTempY)/2+10} fontSize="7" fontWeight="800"
                        fill="#ef4444" fontFamily="Outfit,sans-serif">ΔTb</text>
                </g>
            )}

            {/* Centre divider label */}
            <text x="155" y="110" textAnchor="middle" fontSize="7.5"
                fill="#94a3b8" fontFamily="Outfit,sans-serif" fontWeight="700">← pure  |  NaCl →</text>
        </svg>
    );
}

/* ─── SVG Map ─────────────────────────────────────────── */
const SVG_MAP = {
    concentration: ConcentrationScene,
    dilution:      DilutionScene,
    solubility:    SolubilityScene,
    henryslaw:     HenrysLawScene,
    boilingpoint:  BoilingPointScene,
};

/* ─── Main Component ─────────────────────────────────── */
export default function SolutionsVirtualLab() {
    const navigate            = useNavigate();
    const [activeExp, setActiveExp] = useState(0);
    const [phase,     setPhase]     = useState('idle');

    const exp = EXPERIMENTS[activeExp];
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const nodeId = SLUG_TO_NODE_ID['g12-chem-solutions-virtual-lab'];
    const sessionStartedRef = useRef(false);

    useEffect(() => {
        if (!sessionStartedRef.current) {
            startSession({ nodeId, sessionType: 'practice' });
            sessionStartedRef.current = true;
        }
        return () => {
            if (sessionStartedRef.current) {
                finishSession({ totalQuestions: EXPERIMENTS.length });
            }
        };
    }, [nodeId, startSession, finishSession]);

    useEffect(() => {
        if (phase === 'done') {
            logAnswer({
                question_index: activeExp + 1,
                answer_json: { experiment: exp.title, status: 'completed' },
                is_correct: 1.0,
                marks_awarded: 1,
                marks_possible: 1,
                time_taken_ms: 2800
            });
        }
    }, [phase, activeExp, exp.title, logAnswer]);

    const handleExpChange = (idx) => { setActiveExp(idx); setPhase('idle'); };
    const handleRun       = () => { setPhase('running'); setTimeout(() => setPhase('done'), 2800); };
    const handleReset     = () => setPhase('idle');

    const LabScene = SVG_MAP[exp.id];

    return (
        <div className={styles['chem-page']}>
            <style>{GLOBAL_STYLES}</style>

            {/* Nav */}
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']}
                    onClick={() => navigate('/senior/grade/12/chemistry/solutions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']}
                        onClick={() => navigate('/senior/grade/12/chemistry/solutions/introduction')}>🌟 Intro</button>
                    <button className={styles['chem-nav-link']}
                        onClick={() => navigate('/senior/grade/12/chemistry/solutions/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']}
                        onClick={() => navigate('/senior/grade/12/chemistry/solutions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['chem-nav-link']}
                        onClick={() => navigate('/senior/grade/12/chemistry/solutions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['chem-nav-link']}
                        onClick={() => navigate('/senior/grade/12/chemistry/solutions/exam-edge')}>🏆 Exam Edge</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`}
                        onClick={() => navigate('/senior/grade/12/chemistry/solutions/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            {/* Hero */}
            <div className={styles['chem-lab-hero']}>
                <div className={styles['chem-lab-hero-bg']}/>
                <div className={styles['chem-lab-hero-content']}>
                    <div className={styles['chem-lab-hero-badge']}>🧬 HANDS-ON SCIENCE</div>
                    <h1 className={styles['chem-lab-hero-title']}>
                        Interactive Virtual <span className={styles['chem-lab-hero-title-accent']}>Lab</span>
                    </h1>
                    <p className={styles['chem-lab-hero-sub']}>
                        Pick an experiment, run it, and observe the animated chemistry of solutions live in your browser.
                    </p>
                </div>
            </div>

            <div className={styles['chem-lab-container']}>

                {/* Experiment Picker */}
                <div className={styles['chem-lab-picker']}>
                    {EXPERIMENTS.map((e, idx) => (
                        <button key={e.id} onClick={() => handleExpChange(idx)}
                            className={`${styles['chem-lab-picker-btn']} ${activeExp === idx ? styles['active'] : ''}`}
                            style={{
                                '--skill-color':    e.color,
                                '--skill-color-12': e.color + '12',
                                '--skill-color-25': e.color + '25',
                            }}>
                            <div className={styles['chem-lab-picker-emoji']}>{e.emoji}</div>
                            <div className={styles['chem-lab-picker-title']}>{e.title}</div>
                            <div className={styles['chem-lab-picker-sub']}>{e.subtitle}</div>
                        </button>
                    ))}
                </div>

                {/* Main Lab Stage — mirrors original DOM order exactly */}
                <div className={styles['chem-lab-stage']}>

                    {/* 1. Experiment info card */}
                    <div className={styles['chem-card-exp']}>
                        <div className={styles['chem-card-exp-badge']} style={{ color: exp.color }}>
                            EXPERIMENT
                        </div>
                        <h2 className={styles['chem-card-exp-title']}>{exp.title}</h2>
                        <p className={styles['chem-card-exp-desc']}>{exp.desc}</p>
                        <div className={styles['chem-card-exp-type']}>
                            <div className={styles['chem-card-exp-type-label']}>Experiment Type</div>
                            <div className={styles['chem-card-exp-type-value']} style={{ color: exp.color }}>
                                {exp.type}
                            </div>
                        </div>
                    </div>

                    {/* 2. Observation / idle card */}
                    {phase === 'done' ? (
                        <div className={`${styles['chem-card-obs']} ${styles['done']}`}
                            style={{
                                background: `linear-gradient(135deg, ${exp.colorLight}, #fff)`,
                                border: `1.5px solid ${exp.color}40`,
                            }}>
                            <div className={styles['chem-card-obs-badge']}>
                                <span className={styles['chem-card-obs-badge-icon']}>✅</span>
                                <div className={styles['chem-card-obs-badge-text']} style={{ color: exp.color }}>
                                    Observation Log
                                </div>
                            </div>
                            <p className={styles['chem-card-obs-desc']}>{exp.observation}</p>
                            <div className={styles['chem-card-obs-eq']}
                                style={{ border: `1px solid ${exp.color}30` }}>
                                <div className={styles['chem-card-obs-eq-label']}>Key Equation / Principle</div>
                                <div className={styles['chem-card-obs-eq-value']} style={{ color: exp.color }}>
                                    {exp.equation}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles['chem-card-obs']} ${styles['idle']}`}>
                            <div style={{ fontSize: 36, marginBottom: 10 }}>🔬</div>
                            <p style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                                Click{' '}
                                <strong style={{ color: exp.color }}>{exp.actionLabel}</strong>
                                {' '}to run the experiment and see observations appear here.
                            </p>
                        </div>
                    )}

                    {/* 3. Safety note */}
                    <div className={styles['chem-card-safety']}>
                        <span className={styles['chem-card-safety-icon']}>⚠️</span>
                        <div className={styles['chem-card-safety-text']}>
                            <strong>Safety Note:</strong> Always handle chemical solutions with care.
                            Use gloves, goggles, and work under qualified teacher supervision in a certified lab.
                        </div>
                    </div>

                    {/* 4. Animated scene (RIGHT column, spans via CSS grid) */}
                    <div className={styles['chem-card-scene']}>
                        {/* macOS title bar */}
                        <div className={styles['chem-card-scene-titlebar']}>
                            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
                                <div key={i} className={styles['chem-card-scene-title-circle']}
                                    style={{ background: c }}/>
                            ))}
                            <span className={styles['chem-card-scene-title-text']}>
                                lab.scene({exp.id})
                            </span>
                        </div>

                        {/* Scene canvas */}
                        <div className={styles['chem-card-scene-canvas']} style={{
                            background: phase === 'running'
                                ? `linear-gradient(180deg, ${exp.colorLight}, #fff)`
                                : '#fafafa',
                        }}>
                            <LabScene phase={phase}/>
                        </div>

                        {/* Controls */}
                        <div className={styles['chem-card-scene-controls']}>
                            {phase === 'idle' && (
                                <button onClick={handleRun}
                                    className={`${styles['chem-btn-lab-action']} ${styles['run']}`}
                                    style={{
                                        '--skill-color':    exp.color,
                                        '--skill-color-bb': exp.color + 'bb',
                                        '--skill-color-40': exp.color + '40',
                                    }}>
                                    {exp.actionLabel}
                                </button>
                            )}
                            {phase === 'running' && (
                                <button disabled
                                    className={`${styles['chem-btn-lab-action']} ${styles['running']}`}>
                                    ⏳ Experiment Running...
                                </button>
                            )}
                            {phase === 'done' && (
                                <button onClick={handleReset}
                                    className={`${styles['chem-btn-lab-action']} ${styles['reset']}`}>
                                    🔄 Reset Experiment
                                </button>
                            )}
                            <button onClick={handleReset} className={styles['chem-btn-lab-icon']}>↺</button>
                        </div>

                        {/* Status pill */}
                        <div style={{ padding: '0 20px 16px', textAlign: 'center' }}>
                            <div style={{
                                display: 'inline-block', padding: '4px 14px', borderRadius: 100,
                                background: phase === 'done'    ? '#dcfce7'
                                          : phase === 'running' ? '#fef9c3'
                                          : '#f1f5f9',
                                fontSize: 11, fontWeight: 700,
                                color: phase === 'done'    ? '#16a34a'
                                     : phase === 'running' ? '#d97706'
                                     : '#64748b',
                            }}>
                                {phase === 'idle'    ? '● Ready'
                               : phase === 'running' ? '● Experiment occurring…'
                               : '● Complete'}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
