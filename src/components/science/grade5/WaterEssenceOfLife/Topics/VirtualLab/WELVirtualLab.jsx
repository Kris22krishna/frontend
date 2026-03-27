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

/* ─── Animation Keyframes injected once ─────────────────── */
const KEYFRAMES = `
@keyframes wellFillUp {
  from { transform: scaleY(0); transform-origin: bottom; }
  to   { transform: scaleY(1); transform-origin: bottom; }
}
@keyframes waveSurface {
  0%   { d: path("M43,66 Q80,62 120,66 Q160,70 197,66"); }
  50%  { d: path("M43,66 Q80,70 120,66 Q160,62 197,66"); }
  100% { d: path("M43,66 Q80,62 120,66 Q160,70 197,66"); }
}
@keyframes teaspoonPop {
  0%   { transform: scale(0) rotate(-20deg); opacity:0; }
  60%  { transform: scale(1.2) rotate(5deg);  opacity:1; }
  100% { transform: scale(1)   rotate(0deg);  opacity:1; }
}
@keyframes labelFade {
  from { opacity:0; transform: translateY(6px); }
  to   { opacity:1; transform: translateY(0); }
}
@keyframes iceMelt {
  0%   { rx:12; ry:12; opacity:1; fill:#bfdbfe; }
  40%  { rx:18; ry:10; opacity:0.9; fill:#93c5fd; }
  100% { rx:32; ry:8;  opacity:0; fill:#38bdf8; }
}
@keyframes liquidRise {
  from { transform: scaleY(0.3) translateY(20px); opacity:0; }
  to   { transform: scaleY(1)   translateY(0px);  opacity:1; }
}
@keyframes steamPuff {
  0%   { transform: translateY(0)   scale(1);   opacity:0.7; }
  50%  { transform: translateY(-18px) scale(1.4); opacity:0.4; }
  100% { transform: translateY(-36px) scale(1.8); opacity:0; }
}
@keyframes steamRise {
  0%   { transform: translateY(0)    scaleX(1);   opacity:0.85; }
  40%  { transform: translateY(-22px) scaleX(1.2); opacity:0.6; }
  80%  { transform: translateY(-44px) scaleX(1.5); opacity:0.2; }
  100% { transform: translateY(-55px) scaleX(1.7); opacity:0; }
}
@keyframes tempBarFill {
  from { width: 0; }
  to   { width: 260px; }
}
@keyframes sunPulse {
  0%,100% { r:26; opacity:1; }
  50%      { r:30; opacity:0.85; }
}
@keyframes sunRayGrow {
  0%,100% { stroke-dashoffset:8; }
  50%      { stroke-dashoffset:0; }
}
@keyframes riseAndFade {
  0%   { transform: translateY(0);   opacity:0.8; }
  100% { transform: translateY(-90px); opacity:0; }
}
@keyframes cloudDrift {
  0%,100% { transform: translateX(0); }
  50%      { transform: translateX(8px); }
}
@keyframes rainDrop {
  0%   { transform: translateY(-10px); opacity:1; }
  100% { transform: translateY(130px); opacity:0; }
}
@keyframes mountainReveal {
  from { clip-path: polygon(50% 100%, 50% 100%, 50% 100%); }
  to   { clip-path: polygon(0% 100%, 50% 0%, 100% 100%); }
}
@keyframes dropSeep {
  0%   { transform: translateY(0);  opacity:1; }
  80%  { transform: translateY(110px); opacity:0.5; }
  100% { transform: translateY(120px); opacity:0; }
}
@keyframes cityRainFall {
  0%   { transform: translateY(0);   opacity:0.9; }
  65%  { transform: translateY(26px); opacity:0.9; }
  66%  { transform: translateY(26px); opacity:0; }
  100% { transform: translateY(26px); opacity:0; }
}
@keyframes splashLeft {
  0%   { transform: translate(0,0) scale(1);   opacity:0.85; }
  100% { transform: translate(-28px, 4px) scale(0.4); opacity:0; }
}
@keyframes splashRight {
  0%   { transform: translate(0,0) scale(1);   opacity:0.85; }
  100% { transform: translate(28px, 4px) scale(0.4); opacity:0; }
}
@keyframes runoffStream {
  0%   { transform: translateX(0);   opacity:0.8; }
  100% { transform: translateX(90px); opacity:0; }
}
@keyframes runoffSlide {
  0%   { transform: translateX(0); opacity:1; }
  100% { transform: translateX(80px); opacity:0; }
}
@keyframes aquiferFill {
  from { transform: scaleX(0); transform-origin: left; opacity:0.2; }
  to   { transform: scaleX(1); transform-origin: left; opacity:0.85; }
}
@keyframes riverFlow {
  from { stroke-dashoffset: 600; }
  to   { stroke-dashoffset: 0; }
}
@keyframes particleFlow {
  0%   { offset-distance: 0%;   opacity:1; }
  90%  { offset-distance: 100%; opacity:1; }
  100% { offset-distance: 100%; opacity:0; }
}
@keyframes fishSwim {
  0%,100% { transform: translateX(0px) scaleX(1); }
  49%      { transform: translateX(130px) scaleX(1); }
  50%      { transform: translateX(130px) scaleX(-1); }
  99%      { transform: translateX(0px) scaleX(-1); }
}
@keyframes frogBob {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}
@keyframes bubbleRise {
  0%   { transform: translateY(0) scale(1); opacity:0.4; }
  100% { transform: translateY(-230px) scale(1.6); opacity:0; }
}
@keyframes plantSway {
  0%,100% { transform: rotate(-4deg) translateX(0); }
  50%      { transform: rotate(4deg) translateX(3px); }
}
@keyframes duckPaddle {
  0%,100% { transform: translateX(0); }
  50%      { transform: translateX(6px); }
}
@keyframes fadeSlideIn {
  from { opacity:0; transform: translateY(12px); }
  to   { opacity:1; transform: translateY(0); }
}
@keyframes moleculeBounce {
  0%,100% { transform: translate(0,0); }
  25%      { transform: translate(3px,-4px); }
  50%      { transform: translate(-3px,2px); }
  75%      { transform: translate(4px,3px); }
}
@keyframes iceShimmer {
  0%,100% { filter: brightness(1); }
  50%      { filter: brightness(1.15) drop-shadow(0 0 4px #93c5fd); }
}
@keyframes glowPulse {
  0%,100% { filter: drop-shadow(0 0 4px rgba(251,191,36,0.5)); }
  50%      { filter: drop-shadow(0 0 14px rgba(251,191,36,0.9)); }
}
`;

function InjectKeyframes() {
    useEffect(() => {
        const id = 'wel-lab-keyframes';
        if (!document.getElementById(id)) {
            const style = document.createElement('style');
            style.id = id;
            style.textContent = KEYFRAMES;
            document.head.appendChild(style);
        }
    }, []);
    return null;
}

/* ══════════════════════════════════════════════════
   SCENE 1 — WATER AVAILABILITY  (completely reworked)
══════════════════════════════════════════════════ */
function AvailabilityScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 300 320" style={{ width: '100%', height: '100%', maxHeight: 340 }}>
            <defs>
                <linearGradient id="av-ocean" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#164e63" />
                </linearGradient>
                <linearGradient id="av-fresh" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="av-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#fff" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.2" />
                </linearGradient>
                <filter id="av-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <clipPath id="av-glass-clip">
                    <rect x="44" y="68" width="152" height="188" rx="8" />
                </clipPath>
            </defs>

            <text x="120" y="22" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="15">Earth's Water</text>

            {/* Glass outline with shine */}
            <rect x="40" y="60" width="160" height="200" rx="12" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="40" y="60" width="160" height="200" rx="12" fill="url(#av-glass)" />
            {/* Shine strip */}
            <rect x="52" y="70" width="8" height="175" rx="4" fill="#fff" opacity="0.25" />

            {/* Ocean fill — animates height */}
            {(isRunning || isDone) && (
                <rect
                    x="44" y="68" width="152" height="188" rx="8"
                    fill="url(#av-ocean)"
                    clipPath="url(#av-glass-clip)"
                    style={{
                        animation: isRunning
                            ? 'wellFillUp 1.3s cubic-bezier(0.22,1,0.36,1) forwards'
                            : 'none',
                        transformOrigin: '50% 100%',
                    }}
                />
            )}
            {!isRunning && !isDone && (
                <text x="120" y="168" textAnchor="middle" fill="#94a3b8" fontWeight="700" fontSize="13">Click to visualize</text>
            )}

            {/* Animated wave on top of ocean */}
            {isDone && (
                <path
                    d="M44,68 Q80,64 120,68 Q160,72 196,68"
                    fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.7"
                    style={{ animation: 'waveSurface 2.5s ease-in-out infinite' }}
                />
            )}

            {/* 97% label inside glass */}
            {isDone && (
                <text
                    x="120" y="175" textAnchor="middle"
                    fill="#fff" fontWeight="900" fontSize="28" opacity="0.9"
                    style={{ animation: 'labelFade 0.5s ease 0.3s both' }}
                >97%</text>
            )}
            {isDone && (
                <text
                    x="120" y="196" textAnchor="middle"
                    fill="#bae6fd" fontWeight="700" fontSize="11"
                    style={{ animation: 'labelFade 0.5s ease 0.5s both' }}
                >Salty Ocean Water</text>
            )}

            {/* Teaspoon — appears after fill */}
            {isDone && (
                <g style={{ animation: 'teaspoonPop 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both', transformOrigin: '248px 200px' }}>
                    {/* spoon bowl */}
                    <ellipse cx="248" cy="198" rx="20" ry="7" fill="url(#av-fresh)" filter="url(#av-glow)" />
                    {/* water in spoon shimmer */}
                    <ellipse cx="248" cy="197" rx="14" ry="4" fill="#7dd3fc" opacity="0.7" />
                    {/* handle */}
                    <rect x="245" y="205" width="6" height="52" rx="3" fill="#94a3b8" />
                    {/* droplet dripping off spoon */}
                    <ellipse cx="256" cy="210" rx="3" ry="4" fill="#38bdf8" opacity="0.8">
                        <animate attributeName="cy" values="210;240;210" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="1.8s" repeatCount="indefinite" />
                    </ellipse>
                    <text x="248" y="272" textAnchor="middle" fill="#0ea5e9" fontWeight="900" fontSize="12">3% Fresh</text>
                    <text x="248" y="287" textAnchor="middle" fill="#64748b" fontWeight="700" fontSize="10">(&lt;0.5% usable!)</text>
                </g>
            )}

            {/* Percentage bar at bottom */}
            {isDone && (
                <g style={{ animation: 'labelFade 0.4s ease 1.5s both' }}>
                    <rect x="40" y="278" width="160" height="10" rx="5" fill="#e0f2fe" />
                    <rect x="40" y="278" width="155" height="10" rx="5" fill="#0369a1" opacity="0.8" />
                    <rect x="40" y="278" width="5" height="10" rx="2" fill="#38bdf8" />
                    <text x="40" y="302" fill="#0369a1" fontSize="9" fontWeight="700">0.5% usable</text>
                    <text x="200" y="302" textAnchor="end" fill="#0369a1" fontSize="9" fontWeight="700">97% salty</text>
                </g>
            )}
        </svg>
    );
}

/* ══════════════════════════════════════════════════
   SCENE 2 — STATES OF WATER  (reworked with molecules)
══════════════════════════════════════════════════ */
function StatesScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    // molecule positions in each state
    const iceMols = [
        [38,88],[52,88],[66,88],[38,100],[52,100],[66,100],[38,112],[52,112],[66,112],
    ];
    const liquidMols = [
        [138,92],[152,100],[166,90],[143,108],[158,112],[172,104],[140,120],[155,125],
    ];
    const steamMols = [
        [222,58],[238,44],[252,60],[228,74],[245,68],[235,82],
    ];

    return (
        <svg viewBox="0 0 300 310" style={{ width: '100%', height: '100%', maxHeight: 330 }}>
            <defs>
                <radialGradient id="st-icegrad" cx="50%" cy="40%">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="100%" stopColor="#93c5fd" />
                </radialGradient>
                <radialGradient id="st-liquidgrad" cx="50%" cy="30%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="100%" stopColor="#0284c7" />
                </radialGradient>
                <filter id="st-blur">
                    <feGaussianBlur stdDeviation="2" />
                </filter>
                <filter id="st-glow-blue">
                    <feGaussianBlur stdDeviation="3" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            <text x="150" y="22" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">States of Water</text>

            {/* ── ICE block ── */}
            <g style={isDone ? { animation: 'iceShimmer 3s ease-in-out infinite', opacity: 0.45 } : {}}>
                <rect x="15" y="45" width="80" height="80" rx="10"
                    fill="url(#st-icegrad)" stroke="#93c5fd" strokeWidth="2">
                    {isDone && <animate attributeName="opacity" from="1" to="0.45" dur="0.8s" fill="freeze" />}
                </rect>
                {/* crystal lines */}
                <line x1="35" y1="45" x2="35" y2="125" stroke="#bfdbfe" strokeWidth="1" opacity="0.5" />
                <line x1="55" y1="45" x2="55" y2="125" stroke="#bfdbfe" strokeWidth="1" opacity="0.5" />
                <line x1="75" y1="45" x2="75" y2="125" stroke="#bfdbfe" strokeWidth="1" opacity="0.5" />
                <line x1="15" y1="70" x2="95" y2="70" stroke="#bfdbfe" strokeWidth="1" opacity="0.5" />
                <line x1="15" y1="95" x2="95" y2="95" stroke="#bfdbfe" strokeWidth="1" opacity="0.5" />
            </g>

            {/* ICE molecules — tight grid */}
            {iceMols.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4.5"
                    fill="#3b82f6" stroke="#bfdbfe" strokeWidth="1.2"
                    opacity={isDone ? 0.35 : 0.9}>
                    <animate attributeName="r" values="4.5;4.8;4.5" dur="3s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                </circle>
            ))}
            {/* bonds */}
            {isDone ? null : iceMols.map(([cx, cy], i) =>
                i < 6 ? <line key={`b${i}`} x1={cx} y1={cy} x2={iceMols[i + 3][0]} y2={iceMols[i + 3][1]}
                    stroke="#93c5fd" strokeWidth="1" opacity="0.6" /> : null
            )}

            <text x="55" y="142" textAnchor="middle" fill="#1e40af" fontWeight="800" fontSize="11">ICE  0°C</text>
            <text x="55" y="154" textAnchor="middle" fill="#64748b" fontSize="9">Solid · slow molecules</text>

            {/* ── HEAT ARROW (visible when running or done) ── */}
            {(isRunning || isDone) && (
                <g style={{ animation: 'labelFade 0.4s ease 0.3s both' }}>
                    <defs>
                        <linearGradient id="arrowHeat" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                    </defs>
                    <path d="M100,85 L118,85" stroke="url(#arrowHeat)" strokeWidth="3" strokeLinecap="round" />
                    <polygon points="118,79 128,85 118,91" fill="#f59e0b" />
                    <text x="113" y="76" textAnchor="middle" fill="#f59e0b" fontWeight="800" fontSize="9">🔥 Heat</text>
                </g>
            )}

            {/* ── LIQUID puddle ── */}
            {(isRunning || isDone) && (
                <g style={{ animation: 'liquidRise 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both', transformOrigin: '152px 110px' }}>
                    <ellipse cx="152" cy="112" rx="33" ry="18" fill="url(#st-liquidgrad)" opacity="0.9">
                        <animate attributeName="ry" values="18;20;18" dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="rx" values="33;31;33" dur="2.2s" repeatCount="indefinite" />
                    </ellipse>
                    {/* ripple rings */}
                    {isDone && [0,1,2].map(i => (
                        <ellipse key={i} cx="152" cy="112" rx={15 + i * 8} ry={7 + i * 3} fill="none"
                            stroke="#38bdf8" strokeWidth="1" opacity={0.4 - i * 0.12}>
                            <animate attributeName="rx" values={`${15 + i * 8};${22 + i * 8};${15 + i * 8}`}
                                dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" values={`${0.4 - i * 0.12};0;${0.4 - i * 0.12}`}
                                dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" />
                        </ellipse>
                    ))}
                </g>
            )}
            {/* liquid molecules */}
            {(isRunning || isDone) && liquidMols.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4"
                    fill="#0ea5e9" stroke="#7dd3fc" strokeWidth="1"
                    style={{ animation: `moleculeBounce ${1.2 + i * 0.15}s ease-in-out ${i * 0.1}s infinite` }}>
                </circle>
            ))}
            {(isRunning || isDone) && (
                <>
                    <text x="152" y="142" textAnchor="middle" fill="#0369a1" fontWeight="800" fontSize="11">WATER</text>
                    <text x="152" y="154" textAnchor="middle" fill="#64748b" fontSize="9">Liquid · medium speed</text>
                </>
            )}

            {/* ── BOIL ARROW ── */}
            {isDone && (
                <g style={{ animation: 'labelFade 0.4s ease 0.7s both' }}>
                    <path d="M188,95 Q200,70 210,60" stroke="#ef4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <polygon points="207,54 216,62 207,66" fill="#ef4444" />
                    <text x="208" y="50" textAnchor="middle" fill="#ef4444" fontWeight="800" fontSize="9">100°C</text>
                </g>
            )}

            {/* ── STEAM zone — dedicated background + large visible puffs ── */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.5s ease 0.6s both' }}>
                    {/* steam zone background */}
                    <rect x="205" y="30" width="88" height="110" rx="14"
                        fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.9" />
                    <text x="249" y="50" textAnchor="middle" fill="#64748b" fontWeight="800" fontSize="10">STEAM</text>
                    <text x="249" y="62" textAnchor="middle" fill="#94a3b8" fontWeight="600" fontSize="8">Gas · fast</text>
                    {/* Large steam puffs — staggered, clearly visible */}
                    {[
                        { cx: 230, cy: 105, r: 14, delay: '0s',    dur: '2.2s' },
                        { cx: 255, cy: 95,  r: 16, delay: '0.35s', dur: '2.4s' },
                        { cx: 278, cy: 108, r: 13, delay: '0.7s',  dur: '2.0s' },
                        { cx: 238, cy: 82,  r: 11, delay: '1.05s', dur: '2.3s' },
                        { cx: 265, cy: 78,  r: 12, delay: '1.4s',  dur: '2.1s' },
                        { cx: 248, cy: 68,  r: 10, delay: '0.5s',  dur: '1.9s' },
                    ].map((p, i) => (
                        <g key={i} style={{
                            animation: `steamRise ${p.dur} ease-out ${p.delay} infinite`,
                            transformOrigin: `${p.cx}px ${p.cy}px`,
                        }}>
                            {/* outer glow */}
                            <circle cx={p.cx} cy={p.cy} r={p.r + 4}
                                fill="#cbd5e1" opacity="0.35" filter="url(#st-blur)" />
                            {/* main puff body */}
                            <circle cx={p.cx} cy={p.cy} r={p.r}
                                fill="#e2e8f0" opacity="0.88" />
                            {/* inner highlight */}
                            <circle cx={p.cx - p.r * 0.3} cy={p.cy - p.r * 0.3}
                                r={p.r * 0.45}
                                fill="#f8fafc" opacity="0.7" />
                        </g>
                    ))}
                </g>
            )}
            {isDone && (
                <text x="249" y="152" textAnchor="middle" fill="#64748b" fontWeight="800" fontSize="11">STEAM</text>
            )}

            {/* Temperature gradient bar */}
            <defs>
                <linearGradient id="tempBar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
            </defs>
            <rect x="20" y="168" width="260" height="12" rx="6" fill="#f1f5f9" />
            {(isRunning || isDone) && (
                <rect x="20" y="168" width="260" height="12" rx="6" fill="url(#tempBar)"
                    style={{ animation: 'tempBarFill 1.8s cubic-bezier(0.22,1,0.36,1) forwards' }} />
            )}
            {/* thermometer marker */}
            {isDone && (
                <circle cx="280" cy="174" r="7" fill="#ef4444"
                    style={{ animation: 'labelFade 0.3s ease 1.8s both' }}>
                    <animate attributeName="r" values="7;9;7" dur="1s" repeatCount="indefinite" />
                </circle>
            )}
            <text x="20" y="190" fill="#3b82f6" fontWeight="800" fontSize="10">0°C ❄️</text>
            <text x="280" y="190" textAnchor="end" fill="#ef4444" fontWeight="800" fontSize="10">🔥 100°C</text>

            {/* Molecule speed legend */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.5s ease 1.8s both' }}>
                    <rect x="20" y="202" width="260" height="36" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                    <text x="150" y="219" textAnchor="middle" fill="#0f172a" fontWeight="800" fontSize="11">
                        Molecules: Slow ❄️ → Medium 💧 → Fast 🔥
                    </text>
                    <text x="150" y="232" textAnchor="middle" fill="#64748b" fontWeight="600" fontSize="9">
                        More heat = faster movement = state change
                    </text>
                </g>
            )}
        </svg>
    );
}

/* ══════════════════════════════════════════════════
   SCENE 3 — WATER CYCLE  (complete overhaul)
══════════════════════════════════════════════════ */
function CycleScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 300 310" style={{ width: '100%', height: '100%', maxHeight: 330 }}>
            <defs>
                <linearGradient id="cy-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isDone ? "#7dd3fc" : "#bae6fd"} />
                    <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="cy-sea" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#075985" />
                </linearGradient>
                <radialGradient id="cy-sun" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="60%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                </radialGradient>
                <filter id="cy-glow">
                    <feGaussianBlur stdDeviation="4" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            {/* Sky */}
            <rect width="300" height="215" rx="12" fill="url(#cy-sky)" />
            {/* Sea */}
            <rect x="0" y="210" width="300" height="100" rx="0 0 12 12" fill="url(#cy-sea)" />
            {/* Sea waves */}
            {(isRunning || isDone) && [0,1,2].map(i => (
                <path key={i} d={`M${-20 + i * 10},${218 + i * 4} Q${40 + i * 10},${214 + i * 4} ${80 + i * 10},${218 + i * 4} Q${120 + i * 10},${222 + i * 4} ${160 + i * 10},${218 + i * 4} Q${200 + i * 10},${214 + i * 4} ${240 + i * 10},${218 + i * 4} Q${280 + i * 10},${222 + i * 4} ${320 + i * 10},${218 + i * 4}`}
                    fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.35">
                    <animate attributeName="d"
                        values={`M${-20 + i * 10},${218 + i * 4} Q${40 + i * 10},${214 + i * 4} ${80 + i * 10},${218 + i * 4} Q${120 + i * 10},${222 + i * 4} ${160 + i * 10},${218 + i * 4} Q${200 + i * 10},${214 + i * 4} ${240 + i * 10},${218 + i * 4} Q${280 + i * 10},${222 + i * 4} ${320 + i * 10},${218 + i * 4};M${-20 + i * 10},${222 + i * 4} Q${40 + i * 10},${218 + i * 4} ${80 + i * 10},${222 + i * 4} Q${120 + i * 10},${214 + i * 4} ${160 + i * 10},${222 + i * 4} Q${200 + i * 10},${218 + i * 4} ${240 + i * 10},${222 + i * 4} Q${280 + i * 10},${214 + i * 4} ${320 + i * 10},${222 + i * 4};M${-20 + i * 10},${218 + i * 4} Q${40 + i * 10},${214 + i * 4} ${80 + i * 10},${218 + i * 4} Q${120 + i * 10},${222 + i * 4} ${160 + i * 10},${218 + i * 4} Q${200 + i * 10},${214 + i * 4} ${240 + i * 10},${218 + i * 4} Q${280 + i * 10},${222 + i * 4} ${320 + i * 10},${218 + i * 4}`}
                        dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
                </path>
            ))}
            <text x="150" y="252" textAnchor="middle" fill="#bae6fd" fontWeight="700" fontSize="13" opacity="0.8">OCEAN</text>

            {/* ── SUN ── */}
            {(isRunning || isDone) ? (
                <g style={{ animation: 'glowPulse 2s ease-in-out infinite' }}>
                    {/* rays */}
                    {[0,45,90,135,180,225,270,315].map((angle, i) => (
                        <line key={i}
                            x1={42 + Math.cos(angle * Math.PI / 180) * 28}
                            y1={42 + Math.sin(angle * Math.PI / 180) * 28}
                            x2={42 + Math.cos(angle * Math.PI / 180) * 38}
                            y2={42 + Math.sin(angle * Math.PI / 180) * 38}
                            stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round">
                            <animate attributeName="stroke-dasharray"
                                values={`0,10;10,0;0,10`}
                                dur={`${1.2 + i * 0.1}s`} repeatCount="indefinite" />
                        </line>
                    ))}
                    <circle cx="42" cy="42" r="22" fill="url(#cy-sun)" filter="url(#cy-glow)">
                        <animate attributeName="r" values="22;25;22" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="42" y="78" textAnchor="middle" fill="#f59e0b" fontWeight="800" fontSize="9">☀️ Sun</text>
                </g>
            ) : (
                <circle cx="42" cy="42" r="22" fill="#fde68a" opacity="0.35" />
            )}

            {/* ── EVAPORATION vapour trails ── */}
            {(isRunning || isDone) && (
                <g>
                    {[80, 120, 160, 200].map((x, i) => (
                        <g key={i}>
                            {[0,1,2].map(j => (
                                <circle key={j} cx={x + j * 4 - 4} cy={200} r={3 + j}
                                    fill="#7dd3fc" opacity="0"
                                    style={{
                                        animation: `riseAndFade ${1.6 + j * 0.3}s ease-out ${i * 0.25 + j * 0.1}s infinite`,
                                    }} />
                            ))}
                        </g>
                    ))}
                    <text x="150" y="195" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="9" opacity="0.8">↑ Evaporation</text>
                </g>
            )}

            {/* ── CLOUD (appears in done) ── */}
            {isDone && (
                <g style={{
                    animation: 'cloudDrift 5s ease-in-out infinite, fadeSlideIn 0.7s ease 0.5s both',
                    transformOrigin: '220px 55px'
                }}>
                    <ellipse cx="218" cy="58" rx="42" ry="22" fill="#fff" opacity="0.97" />
                    <ellipse cx="243" cy="50" rx="26" ry="17" fill="#fff" opacity="0.95" />
                    <ellipse cx="197" cy="52" rx="23" ry="16" fill="#f0f9ff" opacity="0.9" />
                    {/* shadow under cloud */}
                    <ellipse cx="220" cy="80" rx="35" ry="6" fill="#94a3b8" opacity="0.12" />
                    <text x="220" y="42" textAnchor="middle" fill="#475569" fontWeight="700" fontSize="8">Condensation ☁️</text>
                </g>
            )}

            {/* ── RAIN drops ── */}
            {isDone && (
                <g>
                    {[204, 217, 230, 243, 256].map((x, i) => (
                        <g key={i} style={{
                            animation: `rainDrop ${0.7 + i * 0.12}s ease-in ${i * 0.14}s infinite`
                        }}>
                            <ellipse cx={x} cy={82} rx="2.5" ry="5" fill="#38bdf8" opacity="0.85" />
                        </g>
                    ))}
                    <text x="260" y="145" textAnchor="middle" fill="#1e40af" fontWeight="700" fontSize="8">↓ Precipitation</text>
                </g>
            )}

            {/* ── MOUNTAIN collection ── */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.6s ease 0.9s both' }}>
                    <polygon points="8,210 50,148 92,210" fill="#065f46" opacity="0.75" />
                    <polygon points="30,210 50,165 70,210" fill="#16a34a" opacity="0.5" />
                    {/* snow cap */}
                    <polygon points="42,155 50,148 58,155 52,162 48,162" fill="#fff" opacity="0.9" />
                    <text x="50" y="225" textAnchor="middle" fill="#bbf7d0" fontWeight="700" fontSize="8">Collection</text>
                    {/* river from mountain */}
                    <path d="M 50,175 Q 65,192 80,200 Q 120,208 180,212" fill="none"
                        stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" opacity="0.6">
                        <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="1.5s" fill="freeze" />
                        <animate attributeName="stroke-dashoffset" values="200;0" dur="1.5s" fill="freeze" />
                    </path>
                </g>
            )}

            {/* Cycle arrow label */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.5s ease 1.4s both' }}>
                    <rect x="60" y="270" width="180" height="28" rx="10" fill="#0369a1" opacity="0.85" />
                    <text x="150" y="289" textAnchor="middle" fill="#fff" fontWeight="800" fontSize="11">
                        ♻️ The cycle repeats endlessly!
                    </text>
                </g>
            )}

            {!isRunning && !isDone && (
                <text x="150" y="148" textAnchor="middle" fill="#475569" fontWeight="700" fontSize="13">Click to start the cycle</text>
            )}
        </svg>
    );
}

/* ══════════════════════════════════════════════════
   SCENE 4 — GROUNDWATER SEEPAGE  (reworked)
══════════════════════════════════════════════════ */
function GroundScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    const forestDrops = [22, 42, 62, 82, 102, 122];
    const cityDropXs = [170, 195, 220, 245, 270];

    return (
        <svg viewBox="0 0 300 310" style={{ width: '100%', height: '100%', maxHeight: 330 }}>
            <defs>
                <linearGradient id="gw-soil" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#92400e" />
                    <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="gw-concrete" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#6b7280" />
                </linearGradient>
                <linearGradient id="gw-aquifer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <filter id="gw-glow">
                    <feGaussianBlur stdDeviation="2.5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            <text x="150" y="20" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">Forest vs City Groundwater</text>

            {/* Divider */}
            <line x1="148" y1="28" x2="148" y2="290" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4,4" />

            {/* ── FOREST SIDE ── */}
            <text x="74" y="36" textAnchor="middle" fill="#059669" fontWeight="900" fontSize="11">🌳 Forest</text>

            {/* sky */}
            <rect x="4" y="40" width="140" height="30" rx="6" fill="#e0f2fe" opacity="0.5" />
            {/* soil layers with texture */}
            <rect x="4" y="72" width="140" height="90" rx="6 6 0 0" fill="url(#gw-soil)" />
            {/* soil texture dots */}
            {[20,45,70,95,120].map((x,i) => [80,95,110,125,140].map((y,j) => (
                <circle key={`sd${i}${j}`} cx={x} cy={y} r="1.5" fill="#a16207" opacity="0.4" />
            )))}
            {/* subsoil */}
            <rect x="4" y="160" width="140" height="30" rx="0" fill="#92400e" opacity="0.5" />
            {/* bedrock */}
            <rect x="4" y="188" width="140" height="22" rx="0 0 6 6" fill="#78350f" opacity="0.7" />

            {/* Trees */}
            {[28, 74, 118].map((x, i) => (
                <g key={i}>
                    {/* trunk */}
                    <rect x={x - 4} y={58} width="8" height="16" rx="2" fill="#92400e" />
                    {/* canopy layers */}
                    <polygon points={`${x - 22},72 ${x},${34 - i * 4} ${x + 22},72`} fill="#16a34a" />
                    <polygon points={`${x - 16},64 ${x},${44 - i * 4} ${x + 16},64`} fill="#22c55e" />
                </g>
            ))}

            {/* Root system */}
            {isDone && (
                <g opacity="0.5">
                    {[28, 74, 118].map((x, i) => (
                        <g key={i}>
                            <path d={`M${x},73 Q${x - 15},105 ${x - 20},130`} fill="none" stroke="#92400e" strokeWidth="1.5" />
                            <path d={`M${x},73 Q${x + 15},110 ${x + 18},135`} fill="none" stroke="#92400e" strokeWidth="1.5" />
                            <path d={`M${x},73 Q${x},115 ${x},140`} fill="none" stroke="#92400e" strokeWidth="1.5" />
                        </g>
                    ))}
                </g>
            )}

            {/* Aquifer FOREST */}
            <rect x="4" y="212" width="140" height="30" rx="0 0 6 6" fill="#0ea5e9"
                opacity={isDone ? 0 : 0.1}
                style={isDone ? { animation: 'aquiferFill 1.2s cubic-bezier(0.22,1,0.36,1) 1.4s both' } : {}}>
                {isDone && <animate attributeName="opacity" from="0.1" to="0.85" dur="1.2s" begin="1.4s" fill="freeze" />}
            </rect>
            {isDone && (
                <>
                    {/* water shimmer */}
                    {[15, 50, 90, 130].map((x, i) => (
                        <ellipse key={i} cx={x} cy={227} rx="8" ry="2" fill="#7dd3fc" opacity="0.5"
                            style={{ animation: `duckPaddle ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                    <text x="74" y="232" textAnchor="middle" fill="#fff" fontWeight="800" fontSize="10"
                        style={{ animation: 'fadeSlideIn 0.4s ease 2.4s both', opacity: 0 }}
                        filter="url(#gw-glow)">💧 Aquifer Full ✓</text>
                </>
            )}

            {/* Rain drops — FOREST (seep all the way down through soft soil) */}
            {(isRunning || isDone) && forestDrops.map((x, i) => (
                <g key={i} style={{ animation: `dropSeep 2s ease-in ${i * 0.15}s infinite` }}>
                    <ellipse cx={x} cy={50} rx="2.5" ry="4.5" fill="#38bdf8" opacity="0.9" />
                </g>
            ))}

            {/* ── CITY SIDE ── */}
            <text x="224" y="36" textAnchor="middle" fill="#4b5563" fontWeight="900" fontSize="11">🏙️ City</text>

            {/* sky */}
            <rect x="152" y="40" width="144" height="30" rx="6" fill="#f1f5f9" opacity="0.5" />
            {/* Concrete surface — thick, clearly impermeable */}
            <rect x="152" y="70" width="144" height="18" rx="4 4 0 0" fill="url(#gw-concrete)" />
            {/* concrete texture lines */}
            <line x1="152" y1="76" x2="296" y2="76" stroke="#9ca3af" strokeWidth="0.6" opacity="0.4" />
            <line x1="152" y1="82" x2="296" y2="82" stroke="#9ca3af" strokeWidth="0.6" opacity="0.4" />
            {/* concrete cracks */}
            <path d="M175,70 L180,88 M210,70 L205,88 M245,72 L248,88 M280,70 L275,88" stroke="#9ca3af" strokeWidth="0.8" opacity="0.5" />
            {/* BLOCKED seepage label on concrete */}
            {isDone && (
                <rect x="152" y="70" width="144" height="18" rx="4 4 0 0" fill="#ef4444" opacity="0.12" />
            )}
            {/* soil under concrete — DRY, no drops penetrate */}
            <rect x="152" y="88" width="144" height="75" fill="url(#gw-soil)" opacity="0.6" />
            <rect x="152" y="160" width="144" height="30" rx="0" fill="#92400e" opacity="0.4" />
            <rect x="152" y="188" width="144" height="22" rx="0 0 6 6" fill="#78350f" opacity="0.6" />

            {/* Buildings */}
            {[{x:162,w:22,h:42},{x:196,w:26,h:55},{x:238,w:20,h:38},{x:268,w:22,h:46}].map((b, i) => (
                <g key={i}>
                    <rect x={b.x} y={72 - b.h} width={b.w} height={b.h} rx="2" fill={i % 2 === 0 ? '#94a3b8' : '#6b7280'} />
                    {[0,1].map(row => [0,1].map(col => (
                        <rect key={`${row}${col}`}
                            x={b.x + 4 + col * 10} y={72 - b.h + 8 + row * 10}
                            width="6" height="5" rx="1"
                            fill="#fef08a" opacity="0.6" />
                    )))}
                </g>
            ))}

            {/* Dry aquifer */}
            <rect x="152" y="212" width="144" height="30" rx="0 0 6 6" fill="#94a3b8" opacity="0.15" />
            {isDone && (
                <text x="224" y="232" textAnchor="middle" fill="#94a3b8" fontWeight="800" fontSize="10"
                    style={{ animation: 'fadeSlideIn 0.4s ease 2s both', opacity: 0 }}>
                    🏜️ Dry — No Recharge ✗
                </text>
            )}

            {/* ── CITY RAIN: drops fall → HIT concrete → splash + run off (never soak in) ── */}
            {(isRunning || isDone) && cityDropXs.map((x, i) => (
                <g key={i}>
                    {/* Drop falls and STOPS at concrete surface (y=70) */}
                    <ellipse cx={x} cy={44} rx="2.5" ry="4.5" fill="#38bdf8" opacity="0.9"
                        style={{ animation: `cityRainFall 1.4s ease-in ${i * 0.22}s infinite` }} />
                    {/* Splash left — appears when drop hits */}
                    <ellipse cx={x - 3} cy={71} rx="3.5" ry="2" fill="#7dd3fc" opacity="0"
                        style={{ animation: `splashLeft 0.5s ease-out ${0.6 + i * 0.22}s infinite` }} />
                    {/* Splash right */}
                    <ellipse cx={x + 3} cy={71} rx="3.5" ry="2" fill="#7dd3fc" opacity="0"
                        style={{ animation: `splashRight 0.5s ease-out ${0.6 + i * 0.22}s infinite` }} />
                    {/* Runoff stream flowing right along concrete surface */}
                    {isDone && (
                        <ellipse cx={x} cy={72} rx="5" ry="1.8" fill="#38bdf8" opacity="0"
                            style={{ animation: `runoffStream 1.1s ease-out ${0.65 + i * 0.18}s infinite` }} />
                    )}
                </g>
            ))}
            {/* Runoff arrow + label */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.4s ease 0.8s both', opacity: 0 }}>
                    <path d="M160,74 Q220,68 296,74" fill="none" stroke="#38bdf8" strokeWidth="2"
                        strokeDasharray="5,3" opacity="0.7" strokeLinecap="round">
                        <animate attributeName="stroke-dashoffset" values="40;0" dur="1s" repeatCount="indefinite" />
                    </path>
                    <polygon points="291,70 298,74 291,78" fill="#38bdf8" opacity="0.8" />
                    <text x="224" y="64" textAnchor="middle" fill="#dc2626" fontWeight="800" fontSize="9">
                        ⛔ Blocked! Water runs off →
                    </text>
                </g>
            )}

            {/* Comparison badges */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.5s ease 2.6s both', opacity: 0 }}>
                    <rect x="4" y="252" width="140" height="24" rx="8" fill="#10b981" opacity="0.15" />
                    <text x="74" y="268" textAnchor="middle" fill="#059669" fontWeight="800" fontSize="11">
                        10× more seepage ✅
                    </text>
                    <rect x="152" y="252" width="144" height="24" rx="8" fill="#ef4444" opacity="0.1" />
                    <text x="224" y="268" textAnchor="middle" fill="#dc2626" fontWeight="800" fontSize="11">
                        Water lost as runoff ❌
                    </text>
                </g>
            )}
        </svg>
    );
}

/* ══════════════════════════════════════════════════
   SCENE 5 — RIVER FLOW  (rich terrain + realistic flow)
══════════════════════════════════════════════════ */
function RiverScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    // Main river path — sweeps from peak through valley to ocean
    const RIVER_MAIN  = "M 60,78 C 72,105 85,130 100,155 C 116,182 138,195 165,203 C 192,211 230,214 285,217";
    // Tributary from left hillside
    const RIVER_TRIB  = "M 18,140 C 35,148 52,155 72,160 C 85,164 93,160 100,155";

    return (
        <svg viewBox="0 0 300 285" style={{ width: '100%', height: '100%', maxHeight: 305 }}>
            <defs>
                {/* Sky */}
                <linearGradient id="rv-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#e0f9ff" />
                </linearGradient>
                {/* Mountain */}
                <linearGradient id="rv-mountain" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#78716c" />
                    <stop offset="35%" stopColor="#44403c" />
                    <stop offset="65%" stopColor="#1c1917" />
                    <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
                {/* Left ridge */}
                <linearGradient id="rv-ridge" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#57534e" />
                    <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
                {/* Plains */}
                <linearGradient id="rv-plains" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d1fae5" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                </linearGradient>
                {/* Ocean */}
                <linearGradient id="rv-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
                {/* River water */}
                <linearGradient id="rv-river" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                {/* Glow */}
                <filter id="rv-glow">
                    <feGaussianBlur stdDeviation="4" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="rv-softglow">
                    <feGaussianBlur stdDeviation="2" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                {/* Shadow */}
                <filter id="rv-shadow">
                    <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#00000030"/>
                </filter>
            </defs>

            {/* ── Sky ── */}
            <rect x="0" y="0" width="300" height="285" rx="12" fill="url(#rv-sky)" />

            {/* ── Distant haze / atmosphere ── */}
            <ellipse cx="150" cy="170" rx="180" ry="60" fill="#bae6fd" opacity="0.18" />

            {/* ── Background hills (far) ── */}
            <path d="M 0,185 Q 50,158 100,172 Q 150,185 200,165 Q 250,148 300,170 L300,285 L0,285 Z"
                fill="#a7f3d0" opacity="0.35" />
            <path d="M 0,195 Q 60,175 120,188 Q 180,200 240,182 Q 270,173 300,182 L300,285 L0,285 Z"
                fill="#6ee7b7" opacity="0.4" />

            {/* ── Plains ── */}
            <path d="M 0,215 Q 100,205 200,212 Q 250,216 300,212 L300,285 L0,285 Z"
                fill="url(#rv-plains)" />

            {/* ── Ocean inlet (right) ── */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.7s ease 1.8s both', opacity: 0 }}>
                    <path d="M 255,212 Q 270,205 300,200 L300,285 L255,285 Z" fill="url(#rv-ocean)" opacity="0.85" />
                    {/* ocean waves */}
                    {[0,1,2].map(i => (
                        <path key={i}
                            d={`M ${256 + i * 5},${218 + i * 6} Q ${272 + i * 5},${214 + i * 6} ${285 + i * 5},${218 + i * 6}`}
                            fill="none" stroke="#7dd3fc" strokeWidth="1.5" opacity={0.6 - i * 0.15}>
                            <animate attributeName="d"
                                values={`M ${256 + i * 5},${218 + i * 6} Q ${272 + i * 5},${214 + i * 6} ${285 + i * 5},${218 + i * 6};M ${256 + i * 5},${220 + i * 6} Q ${272 + i * 5},${216 + i * 6} ${285 + i * 5},${220 + i * 6};M ${256 + i * 5},${218 + i * 6} Q ${272 + i * 5},${214 + i * 6} ${285 + i * 5},${218 + i * 6}`}
                                dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" />
                        </path>
                    ))}
                    <text x="278" y="250" textAnchor="middle" fill="#fff" fontWeight="800" fontSize="9"
                        style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }}>🌊 Ocean</text>
                </g>
            )}

            {/* ── Left ridge / foothill ── */}
            <path d="M 0,285 L 0,165 Q 20,148 38,158 Q 55,168 60,185 L 80,200 L 120,215 L 0,215 Z"
                fill="url(#rv-ridge)" opacity="0.75" />
            {/* Foliage on ridge */}
            <path d="M 0,175 Q 15,165 28,170 Q 40,175 50,170 Q 55,167 60,172" fill="none"
                stroke="#16a34a" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

            {/* ── Main Mountain — layered with shadow ── */}
            {/* Mountain shadow */}
            <polygon points="10,285 62,42 118,285" fill="#1c1917" opacity="0.25" transform="translate(5,6)" />
            {/* Mountain body */}
            <polygon points="5,285 62,42 120,285" fill="url(#rv-mountain)" filter="url(#rv-shadow)" />
            {/* Green forest belt on mountain base */}
            <path d="M 18,245 Q 35,225 55,235 Q 70,242 80,235 Q 95,228 110,240 Q 115,245 120,250"
                fill="#065f46" opacity="0.7" />
            <path d="M 22,255 Q 45,240 65,248 Q 80,254 95,248 Q 108,244 118,255"
                fill="#16a34a" opacity="0.5" />

            {/* Snow cap — layered */}
            <polygon points="48,60 62,42 76,60 70,72 54,72" fill="#f8fafc" />
            <polygon points="52,68 62,54 72,68 68,76 56,76" fill="#e0f2fe" opacity="0.8" />
            {/* Snow glint */}
            <line x1="56" y1="58" x2="62" y2="48" stroke="#fff" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />

            {/* Rock outcroppings */}
            {[[40,155,8],[80,180,6],[100,205,5]].map(([x,y,r],i) => (
                <ellipse key={i} cx={x} cy={y} rx={r*2} ry={r} fill="#57534e" opacity="0.5" />
            ))}

            {/* Trees on lower mountain slopes */}
            {isDone && [[30,220],[46,228],[55,234],[95,230],[108,236]].map(([x,y],i) => (
                <g key={i}>
                    <polygon points={`${x-6},${y} ${x},${y-14} ${x+6},${y}`} fill="#15803d" opacity="0.8" />
                    <polygon points={`${x-4},${y} ${x},${y-9} ${x+4},${y}`} fill="#22c55e" opacity="0.7" />
                </g>
            ))}

            {/* ── TRIBUTARY river (left hillside) — drawn first ── */}
            {isDone && (
                <>
                    {/* trib glow */}
                    <path d={RIVER_TRIB} fill="none" stroke="#93c5fd" strokeWidth="8"
                        strokeLinecap="round" opacity="0.15" filter="url(#rv-glow)"
                        style={{ animation: 'riverFlow 1.4s ease-out 0.8s both' }}
                        strokeDasharray="200" strokeDashoffset="200" />
                    {/* trib body */}
                    <path d={RIVER_TRIB} fill="none" stroke="#60a5fa" strokeWidth="4"
                        strokeLinecap="round" opacity="0.75"
                        style={{ animation: 'riverFlow 1.4s ease-out 0.8s both' }}
                        strokeDasharray="200" strokeDashoffset="200" />
                    {/* trib highlight */}
                    <path d={RIVER_TRIB} fill="none" stroke="#fff" strokeWidth="1"
                        strokeLinecap="round" opacity="0.4"
                        style={{ animation: 'riverFlow 1.5s ease-out 0.9s both' }}
                        strokeDasharray="200" strokeDashoffset="200" />
                    {/* Tributary source label */}
                    <text x="18" y="134" fill="#3b82f6" fontWeight="700" fontSize="8" opacity="0.8">Tributary</text>
                </>
            )}

            {/* ── MAIN RIVER — 3-layer draw animation ── */}
            {(isRunning || isDone) && (
                <>
                    {/* Outer glow */}
                    <path d={RIVER_MAIN} fill="none" stroke="#7dd3fc" strokeWidth="18"
                        strokeLinecap="round" opacity="0.18" filter="url(#rv-glow)"
                        style={{ animation: 'riverFlow 2.2s cubic-bezier(0.16,1,0.3,1) forwards' }}
                        strokeDasharray="700" strokeDashoffset="700" />
                    {/* Main body */}
                    <path d={RIVER_MAIN} fill="none" stroke="url(#rv-river)" strokeWidth="9"
                        strokeLinecap="round" opacity="0.92"
                        style={{ animation: 'riverFlow 2.2s cubic-bezier(0.16,1,0.3,1) forwards' }}
                        strokeDasharray="700" strokeDashoffset="700" />
                    {/* Surface highlight */}
                    <path d={RIVER_MAIN} fill="none" stroke="#fff" strokeWidth="2.5"
                        strokeLinecap="round" opacity="0.38"
                        style={{ animation: 'riverFlow 2.3s cubic-bezier(0.16,1,0.3,1) 0.1s forwards' }}
                        strokeDasharray="700" strokeDashoffset="700" />
                    {/* Deep shadow edge */}
                    <path d={RIVER_MAIN} fill="none" stroke="#0369a1" strokeWidth="11"
                        strokeLinecap="round" opacity="0.12"
                        style={{ animation: 'riverFlow 2.2s cubic-bezier(0.16,1,0.3,1) forwards' }}
                        strokeDasharray="700" strokeDashoffset="700" />
                </>
            )}

            {/* ── Flow particles along main river ── */}
            {isDone && (
                <>
                    <path id="rv-p" d={RIVER_MAIN} fill="none" opacity="0" />
                    {[0,1,2,3,4,5,6].map(i => (
                        <circle key={i} r={2.5 + (i % 3) * 0.8} fill="#fff" opacity="0.82"
                            style={{
                                animation: `particleFlow ${2.2 + i * 0.28}s cubic-bezier(0.4,0,0.6,1) ${i * 0.38}s infinite`,
                                offsetPath: `path('${RIVER_MAIN}')`,
                                filter: 'drop-shadow(0 0 2px rgba(56,189,248,0.6))',
                            }} />
                    ))}
                    {/* Slower, bigger foam particles */}
                    {[0,1,2].map(i => (
                        <ellipse key={i} rx="3" ry="1.8" fill="#e0f2fe" opacity="0.6"
                            style={{
                                animation: `particleFlow ${3.5 + i * 0.5}s ease-in-out ${i * 0.9 + 0.5}s infinite`,
                                offsetPath: `path('${RIVER_MAIN}')`,
                            }} />
                    ))}
                </>
            )}

            {/* ── Waterfall cascade at mountain base ── */}
            {isDone && (
                <g opacity="0.8">
                    {[0,1,2,3].map(i => (
                        <path key={i}
                            d={`M ${68 + i * 2},${90 + i * 5} C ${70 + i * 2},${105 + i * 5} ${66 + i * 2},${118 + i * 5} ${69 + i * 2},${130 + i * 5}`}
                            fill="none" stroke="#bae6fd" strokeWidth={2 - i * 0.3}>
                            <animate attributeName="stroke-dashoffset"
                                values={`${40 - i * 5};0;${40 - i * 5}`}
                                dur={`${0.7 + i * 0.08}s`} repeatCount="indefinite" />
                            <animate attributeName="stroke-dasharray"
                                values={`4,${28 - i * 4};${14 - i * 2},${18 - i * 4};4,${28 - i * 4}`}
                                dur={`${0.7 + i * 0.08}s`} repeatCount="indefinite" />
                        </path>
                    ))}
                    {/* Waterfall mist */}
                    <ellipse cx="72" cy="148" rx="12" ry="5" fill="#bae6fd" opacity="0.35">
                        <animate attributeName="rx" values="12;16;12" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.35;0.15;0.35" dur="1.2s" repeatCount="indefinite" />
                    </ellipse>
                </g>
            )}

            {/* ── Meander bends: small eddies where river curves ── */}
            {isDone && [
                {cx:120,cy:172},{cx:175,cy:206},{cx:230,cy:215}
            ].map((p,i) => (
                <g key={i}>
                    <ellipse cx={p.cx} cy={p.cy} rx="6" ry="3" fill="none" stroke="#7dd3fc" strokeWidth="1" opacity="0.5">
                        <animate attributeName="rx" values="6;9;6" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                    </ellipse>
                </g>
            ))}

            {/* ── Labels ── */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.5s ease 2.2s both', opacity: 0 }}>
                    <text x="62" y="34" textAnchor="middle" fill="#e7e5e4" fontWeight="800" fontSize="9"
                        style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>⛰️ Source</text>
                    <text x="165" y="198" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="8">Plains</text>
                    <rect x="40" y="260" width="220" height="20" rx="8" fill="#1e40af" opacity="0.12" />
                    <text x="150" y="274" textAnchor="middle" fill="#1e40af" fontWeight="800" fontSize="10">
                        ⬇ Gravity pulls water HIGH → LOW
                    </text>
                </g>
            )}

            {!isRunning && !isDone && (
                <text x="150" y="148" textAnchor="middle" fill="#64748b" fontWeight="700" fontSize="13">Click to release water</text>
            )}
        </svg>
    );
}

/* ══════════════════════════════════════════════════
   SCENE 6 — AQUATIC LIFE  (richest overhaul)
══════════════════════════════════════════════════ */
function AquaticScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 300 310" style={{ width: '100%', height: '100%', maxHeight: 330 }}>
            <defs>
                <linearGradient id="aq-water" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#075985" />
                </linearGradient>
                <linearGradient id="aq-surface" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.8" />
                </linearGradient>
                <radialGradient id="aq-sun-shaft" cx="30%" cy="0%" r="80%">
                    <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
                <filter id="aq-glow">
                    <feGaussianBlur stdDeviation="2" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            {/* Water background */}
            <rect width="300" height="310" rx="12" fill="url(#aq-water)" />
            {/* light shaft */}
            <rect width="300" height="310" rx="12" fill="url(#aq-sun-shaft)" />

            {/* Surface ripples */}
            {(isRunning || isDone) && (
                <g>
                    <rect x="0" y="0" width="300" height="18" rx="12 12 0 0" fill="url(#aq-surface)" />
                    {[0,1,2,3].map(i => (
                        <path key={i} d={`M${-10 + i * 80},9 Q${20 + i * 80},5 ${50 + i * 80},9 Q${65 + i * 80},13 ${80 + i * 80},9`}
                            fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.35">
                            <animate attributeName="d"
                                values={`M${-10 + i * 80},9 Q${20 + i * 80},5 ${50 + i * 80},9 Q${65 + i * 80},13 ${80 + i * 80},9;M${-10 + i * 80},9 Q${20 + i * 80},13 ${50 + i * 80},9 Q${65 + i * 80},5 ${80 + i * 80},9;M${-10 + i * 80},9 Q${20 + i * 80},5 ${50 + i * 80},9 Q${65 + i * 80},13 ${80 + i * 80},9`}
                                dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                        </path>
                    ))}
                </g>
            )}

            <text x="150" y="34" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="14"
                style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))' }}>
                Aquatic Ecosystem
            </text>

            {/* ── FISH — swims in mid-water zone (y ~155), never touches surface ── */}
            {(isRunning || isDone) && (
                <g style={{ animation: 'fishSwim 6s ease-in-out infinite', transformOrigin: '72px 155px' }}>
                    {/* body */}
                    <ellipse cx="72" cy="155" rx="28" ry="13" fill="#f59e0b" />
                    {/* highlight */}
                    <ellipse cx="70" cy="149" rx="12" ry="4" fill="#fde68a" opacity="0.5" />
                    {/* tail */}
                    <polygon points="44,155 30,143 30,167" fill="#d97706" />
                    {/* dorsal fin */}
                    <polygon points="72,142 80,132 88,142" fill="#b45309" opacity="0.8" />
                    {/* pectoral fin */}
                    <ellipse cx="75" cy="162" rx="10" ry="5" fill="#d97706" opacity="0.7"
                        transform="rotate(-20,75,162)" />
                    {/* eye */}
                    <circle cx="90" cy="151" r="4" fill="#fff" />
                    <circle cx="91" cy="151" r="2.5" fill="#1c1917" />
                    <circle cx="92" cy="149.5" r="0.8" fill="#fff" />
                    {/* gill line */}
                    <path d="M82,145 Q80,155 82,165" fill="none" stroke="#d97706" strokeWidth="1.5" />
                    {/* mouth */}
                    <path d="M99,153 Q102,156 99,159" fill="none" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
                    <text x="72" y="178" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="8"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
                        🐟 Gills + Fins
                    </text>
                </g>
            )}

            {/* ── FROG ── */}
            {isDone && (
                <g style={{
                    animation: 'frogBob 2s ease-in-out infinite, fadeSlideIn 0.6s ease 0.4s both',
                    opacity: 0
                }}>
                    {/* body */}
                    <ellipse cx="228" cy="72" rx="20" ry="13" fill="#22c55e" />
                    {/* head */}
                    <ellipse cx="228" cy="58" rx="14" ry="11" fill="#22c55e" />
                    {/* eyes */}
                    <circle cx="220" cy="52" r="5.5" fill="#bbf7d0" />
                    <circle cx="236" cy="52" r="5.5" fill="#bbf7d0" />
                    <circle cx="220" cy="52" r="3" fill="#0f172a" />
                    <circle cx="236" cy="52" r="3" fill="#0f172a" />
                    <circle cx="221" cy="51" r="1" fill="#fff" />
                    <circle cx="237" cy="51" r="1" fill="#fff" />
                    {/* mouth */}
                    <path d="M220,63 Q228,68 236,63" fill="none" stroke="#16a34a" strokeWidth="1.5" />
                    {/* front legs */}
                    <path d="M215,72 Q208,80 205,85" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                    <path d="M240,72 Q247,80 250,85" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                    <text x="228" y="98" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="8"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
                        🐸 Amphibian
                    </text>
                </g>
            )}

            {/* ── DUCK (surface) ── */}
            {isDone && (
                <g style={{
                    animation: 'duckPaddle 3s ease-in-out infinite, fadeSlideIn 0.5s ease 0.6s both',
                    opacity: 0
                }}>
                    {/* body on water */}
                    <ellipse cx="150" cy="14" rx="22" ry="9" fill="#f97316" />
                    {/* head */}
                    <circle cx="168" cy="10" r="9" fill="#f97316" />
                    {/* beak */}
                    <polygon points="177,9 188,8 177,13" fill="#eab308" />
                    {/* eye */}
                    <circle cx="172" cy="8" r="2" fill="#1c1917" />
                    <circle cx="173" cy="7.2" r="0.6" fill="#fff" />
                    {/* wing */}
                    <ellipse cx="148" cy="13" rx="14" ry="6" fill="#ea580c" opacity="0.7" />
                    {/* wake ripples */}
                    {[0,1,2].map(i => (
                        <ellipse key={i} cx={128 - i * 12} cy="18" rx={6 + i * 4} ry="2" fill="none"
                            stroke="#7dd3fc" strokeWidth="1" opacity={0.5 - i * 0.12}>
                            <animate attributeName="rx" values={`${6 + i * 4};${10 + i * 4};${6 + i * 4}`}
                                dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                        </ellipse>
                    ))}
                    <text x="150" y="30" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="8"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}>
                        🦆 Webbed feet
                    </text>
                </g>
            )}

            {/* ── WATER LILY ── */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.5s ease 0.8s both', opacity: 0 }}>
                    {/* stem */}
                    <line x1="50" y1="310" x2="50" y2="250" stroke="#15803d" strokeWidth="2" />
                    {/* pad */}
                    <ellipse cx="50" cy="55" rx="26" ry="9" fill="#16a34a" opacity="0.85" />
                    {/* pad shine */}
                    <ellipse cx="44" cy="52" rx="10" ry="3" fill="#22c55e" opacity="0.5" />
                    {/* notch */}
                    <path d="M50,46 L50,64" fill="none" stroke="#15803d" strokeWidth="1" opacity="0.5" />
                    {/* flower */}
                    {[0,45,90,135,180,225,270,315].map((angle, i) => (
                        <ellipse key={i} cx={50 + Math.cos(angle * Math.PI / 180) * 9}
                            cy={48 + Math.sin(angle * Math.PI / 180) * 5}
                            rx="5" ry="3"
                            fill={i % 2 === 0 ? '#fda4af' : '#fb7185'}
                            transform={`rotate(${angle}, ${50 + Math.cos(angle * Math.PI / 180) * 9}, ${48 + Math.sin(angle * Math.PI / 180) * 5})`}
                            opacity="0.9" />
                    ))}
                    <circle cx="50" cy="48" r="5" fill="#fef9c3" />
                    <text x="50" y="76" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="8"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
                        🌸 Waxy coating
                    </text>
                </g>
            )}

            {/* ── SEAWEED plants ── */}
            {isDone && (
                <g>
                    {[[130,3,'#22c55e'],[145,5,'#16a34a'],[158,3,'#15803d'],[170,4,'#22c55e']].map(([x, w, col], i) => (
                        <path key={i}
                            d={`M${x},310 Q${x - 10 + i * 5},${260 + i * 10} ${x + 5},${230 + i * 8} Q${x - 5},${200} ${x + 3},${180 - i * 10}`}
                            fill="none" stroke={col} strokeWidth={w} strokeLinecap="round"
                            style={{ animation: `plantSway ${1.8 + i * 0.25}s ease-in-out ${i * 0.15}s infinite`, transformOrigin: `${x}px 310px` }}
                        />
                    ))}
                </g>
            )}

            {/* ── BUBBLES ── */}
            {(isRunning || isDone) && (
                <g>
                    {[0,1,2,3,4,5,6].map(i => (
                        <circle key={i}
                            cx={30 + i * 40} cy={290}
                            r={2 + (i % 3)}
                            fill="#fff" opacity="0.25"
                            style={{ animation: `bubbleRise ${3 + i * 0.5}s ease-out ${i * 0.7}s infinite` }} />
                    ))}
                </g>
            )}

            {/* Coral at bottom */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.6s ease 1s both', opacity: 0 }}>
                    {[[20,5,'#f97316'],[40,7,'#ec4899'],[270,6,'#f59e0b'],[250,5,'#ef4444']].map(([x, r, col], i) => (
                        <g key={i}>
                            <circle cx={x} cy={295} r={r} fill={col} opacity="0.7">
                                <animate attributeName="r" values={`${r};${r + 1.5};${r}`}
                                    dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                            </circle>
                            <rect x={x - 2} cy={295} y={295} width="4" height="12" rx="2" fill={col} opacity="0.5" />
                        </g>
                    ))}
                </g>
            )}

            {/* Food chain badge */}
            {isDone && (
                <g style={{ animation: 'fadeSlideIn 0.5s ease 1.5s both', opacity: 0 }}>
                    <rect x="10" y="277" width="280" height="26" rx="10" fill="#0f172a" opacity="0.55" />
                    <text x="150" y="294" textAnchor="middle" fill="#fff" fontWeight="800" fontSize="10">
                        Food Chain: Algae → Fish → Frog → Eagle 🦅
                    </text>
                </g>
            )}

            {!isRunning && !isDone && (
                <text x="150" y="168" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="13">Click to explore life</text>
            )}
        </svg>
    );
}

/* ── Scene Router ── */
function LabScene({ experimentId, phase }) {
    switch (experimentId) {
        case 'availability': return <AvailabilityScene phase={phase} />;
        case 'states':       return <StatesScene phase={phase} />;
        case 'cycle':        return <CycleScene phase={phase} />;
        case 'ground':       return <GroundScene phase={phase} />;
        case 'river':        return <RiverScene phase={phase} />;
        case 'aquatic':      return <AquaticScene phase={phase} />;
        default:             return null;
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
            <InjectKeyframes />
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
