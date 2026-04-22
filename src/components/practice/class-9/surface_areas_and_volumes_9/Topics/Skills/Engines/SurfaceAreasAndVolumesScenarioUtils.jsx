import React from 'react';

// Math/Geometry Constants
const PI = 22 / 7;

// Valid integer combinations for right cones: r, h, l must form a right triangle to avoid ugly roots where possible
// We will also use standard radii that cancel with 7 easily (e.g., 7, 14, 21, 3.5, 10.5)
const CONE_TRIPLETS = [
    { r: 3, h: 4, l: 5 },
    { r: 6, h: 8, l: 10 },
    { r: 5, h: 12, l: 13 },
    { r: 7, h: 24, l: 25 },
    { r: 14, h: 48, l: 50 },
    { r: 21, h: 20, l: 29 }, // 20, 21, 29
    { r: 8, h: 15, l: 17 }
];

const STANDARD_RADII = [7, 14, 21, 28, 3.5, 10.5, 17.5];

const rInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Shuffle an array
export const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

// Generate Options Array with latex wrapper
export const generateOptions = (val, suffix = '', isCurrency = false) => {
    let rawOptions = [];
    
    // Add correct option
    rawOptions.push(val);

    // Distractors
    if (val === 0) {
        rawOptions.push(1, 2, 3);
    } else {
        rawOptions.push(Math.round(val * 1.5));
        rawOptions.push(Math.round(val * 0.5));
        rawOptions.push(val + rInt(10, 50));
        rawOptions.push(Math.abs(val - rInt(10, 50)));
        rawOptions.push(Math.round(val * 3.14)); // Common pi miscalculation
        rawOptions.push(Math.round(val / 2));
    }

    rawOptions = [...new Set(rawOptions.map(v => Number.isInteger(v) ? v : Number(v.toFixed(2))))];
    
    // Fallback if not enough unique distractors
    while (rawOptions.length < 4) {
        let fallback = val + rInt(10, 200);
        if (!rawOptions.includes(fallback)) {
            rawOptions.push(fallback);
        }
    }

    // Take correct answer + 3 distractors
    let finalRaw = [rawOptions[0]];
    let distractors = shuffleArray(rawOptions.slice(1)).slice(0, 3);
    finalRaw = finalRaw.concat(distractors);

    let finalStrings = finalRaw.map(v => {
        let str = v.toString() + suffix;
        if (isCurrency) return '₹' + str;
        return `$${str}$`; // Auto LaTeX wrap for standard answers
    });

    const shuffled = shuffleArray(finalStrings);
    const correctStr = isCurrency ? '₹' + (val.toString() + suffix) : `$${val.toString() + suffix}$`;

    return {
        options: shuffled,
        correctIndex: shuffled.indexOf(correctStr)
    };
};

/* --- SVG Generators --- */
const renderConeSVG = (labelR, labelH, labelL) => (
    <svg viewBox="0 0 160 140" width="100%" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }}>
        {/* Cone Body */}
        <path d="M 30 100 L 130 100 L 80 20 Z" fill="rgba(15, 76, 129, 0.05)" stroke="#0f4c81" strokeWidth="2" />
        {/* Base Ellipse */}
        <ellipse cx="80" cy="100" rx="50" ry="15" fill="none" stroke="#059669" strokeWidth="2" />
        {/* Heights and Radius lines */}
        <path d="M 80 20 L 80 100" stroke="#b71c1c" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 80 100 L 130 100" stroke="#059669" strokeWidth="2" />
        {/* Labels */}
        <text x="85" y="70" fontSize="12" fill="#b71c1c" fontWeight="bold">{labelH}</text>
        <text x="105" y="125" fontSize="12" fill="#059669" fontWeight="bold">{labelR}</text>
        <text x="45" y="55" fontSize="12" fill="#0f4c81" fontWeight="bold">{labelL}</text>
    </svg>
);

const renderSphereSVG = (labelR) => (
    <svg viewBox="0 0 160 140" width="100%" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }}>
        <circle cx="80" cy="70" r="60" fill="rgba(5, 150, 105, 0.05)" stroke="#059669" strokeWidth="2" />
        <ellipse cx="80" cy="70" rx="60" ry="18" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 80 70 L 140 70" stroke="#059669" strokeWidth="2" />
        <circle cx="80" cy="70" r="3" fill="#059669" />
        <text x="110" y="65" fontSize="12" fill="#059669" fontWeight="bold">{labelR}</text>
    </svg>
);

const renderHemisphereSVG = (labelR) => (
    <svg viewBox="0 0 160 110" width="100%" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }}>
        <path d="M 20 50 A 60 60 0 0 0 140 50 Z" fill="rgba(183, 28, 28, 0.05)" stroke="#b71c1c" strokeWidth="2" />
        <ellipse cx="80" cy="50" rx="60" ry="18" fill="rgba(183, 28, 28, 0.15)" stroke="#b71c1c" strokeWidth="2" />
        <path d="M 80 50 L 140 50" stroke="#b71c1c" strokeWidth="2" />
        <circle cx="80" cy="50" r="3" fill="#b71c1c" />
        <text x="110" y="45" fontSize="12" fill="#b71c1c" fontWeight="bold">{labelR}</text>
    </svg>
);


/* --- Skill Generators --- */

// 1. CONES (Area & Volume)
export const generateConeScenarios = (count = 20) => {
    const list = [];
    for (let i = 0; i < count; i++) {
        // Pick a base triplet
        const base = CONE_TRIPLETS[Math.floor(Math.random() * CONE_TRIPLETS.length)];
        const scale = rInt(1, 5) * (Math.random() > 0.5 ? 1 : 0.5); // Can scale by halves to get 3.5, etc.
        const r = base.r * scale;
        const h = base.h * scale;
        const l = base.l * scale;
        
        let unit = '\\text{ cm}';
        
        // 1-7: Area
        if (i < 7) {
            if (i % 2 === 0) {
                // CSA
                const csa = (PI * r * l).toFixed(2);
                const { options, correctIndex } = generateOptions(Number(csa), '\\text{ cm}^2');
                list.push({
                    type: 'mcq',
                    q: `Find the Curved Surface Area (CSA) of a cone with radius $r = ${r}${unit}$ and slant height $l = ${l}${unit}$. (Use $\\pi = 22/7$)`,
                    options, correctIndex,
                    svg: renderConeSVG(`r = ${r}`, `?`, `l = ${l}`),
                    explanation: `CSA = $\\pi r l$
CSA = $\\frac{22}{7} \\times ${r} \\times ${l}$
= $${csa}\\text{ cm}^2$.`
                });
            } else {
                // TSA
                const tsa = (PI * r * (l + r)).toFixed(2);
                const { options, correctIndex } = generateOptions(Number(tsa), '\\text{ cm}^2');
                list.push({
                    type: 'mcq',
                    q: `Find the Total Surface Area (TSA) of a cone with radius $r = ${r}${unit}$ and slant height $l = ${l}${unit}$. (Use $\\pi = 22/7$)`,
                    options, correctIndex,
                    svg: renderConeSVG(`r = ${r}`, `?`, `l = ${l}`),
                    explanation: `TSA = $\\pi r (l + r)$
TSA = $\\frac{22}{7} \\times ${r} \\times (${l} + ${r})$
= $${tsa}\\text{ cm}^2$.`
                });
            }
        } 
        // 8-14: Volume
        else if (i < 14) {
            const vol = ((1/3) * PI * r * r * h).toFixed(2);
            // Sometimes give 'l' instead of 'h' so they must find 'h'
            const giveSlant = Math.random() > 0.5;
            const { options, correctIndex } = generateOptions(Number(vol), '\\text{ cm}^3');
            
            list.push({
                type: 'mcq',
                q: `Find the Volume of a cone with radius $r = ${r}${unit}$ and ${giveSlant ? `slant height $l = ${l}` : `height $h = ${h}`}${unit}$. (Use $\\pi = 22/7$)`,
                options, correctIndex,
                svg: renderConeSVG(`r = ${r}`, giveSlant ? `h = ?` : `h = ${h}`, giveSlant ? `l = ${l}` : `l = ?`),
                explanation: giveSlant ? 
                    `Step 1: Find height $h$ using Pythagoras: $h = \\sqrt{l^2 - r^2} = \\sqrt{${l}^2 - ${r}^2} = ${h}$.
Step 2: Volume = $\\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times \\frac{22}{7} \\times ${r}^2 \\times ${h} = $${vol}\\text{ cm}^3$.` :
                    `Volume = $\\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times \\frac{22}{7} \\times ${r}^2 \\times ${h} = $${vol}\\text{ cm}^3$.`
            });
        } 
        // 15-20: Missing Dimensions
        else {
            const isMissingR = Math.random() > 0.5;
            const vol = ((1/3) * PI * r * r * h).toFixed(2);
            
            if (isMissingR) {
                const { options, correctIndex } = generateOptions(r, '\\text{ cm}');
                list.push({
                    type: 'mcq',
                    q: `The volume of a cone is $${vol}\\text{ cm}^3$ and its height is $${h}\\text{ cm}$. Find its radius.`,
                    options, correctIndex,
                    svg: renderConeSVG(`r = ?`, `h = ${h}`, ` `),
                    explanation: `$V = \\frac{1}{3}\\pi r^2 h \\implies ${vol} = \\frac{1}{3} \\times \\frac{22}{7} \\times r^2 \\times ${h}$
$r^2 = \\frac{${vol} \\times 3 \\times 7}{22 \\times ${h}} = ${Math.pow(r, 2)}$
$r = \\sqrt{${Math.pow(r, 2)}} = ${r}\\text{ cm}$.`
                });
            } else {
                const { options, correctIndex } = generateOptions(h, '\\text{ cm}');
                list.push({
                    type: 'mcq',
                    q: `The volume of a cone is $${vol}\\text{ cm}^3$ and its base radius is $${r}\\text{ cm}$. Find its height.`,
                    options, correctIndex,
                    svg: renderConeSVG(`r = ${r}`, `h = ?`, ` `),
                    explanation: `$V = \\frac{1}{3}\\pi r^2 h \\implies ${vol} = \\frac{1}{3} \\times \\frac{22}{7} \\times ${Math.pow(r, 2)} \\times h$
$h = \\frac{${vol} \\times 3 \\times 7}{22 \\times ${Math.pow(r, 2)}} = ${h}\\text{ cm}$.`
                });
            }
        }
    }
    return list;
};


// 2. SPHERES & HEMISPHERES (Area & Volume)
export const generateSphereScenarios = (count = 20) => {
    const list = [];
    for (let i = 0; i < count; i++) {
        let r = STANDARD_RADII[Math.floor(Math.random() * STANDARD_RADII.length)];
        let unit = '\\text{ cm}';
        
        // 1-7: Sphere SA
        if (i < 7) {
            const sa = (4 * PI * r * r).toFixed(2);
            const giveDia = Math.random() > 0.5;
            const { options, correctIndex } = generateOptions(Number(sa), '\\text{ cm}^2');
            
            list.push({
                type: 'mcq',
                q: `Find the Surface Area of a sphere with ${giveDia ? `diameter $d = ${r*2}` : `radius $r = ${r}`}${unit}$. (Use $\\pi = 22/7$)`,
                options, correctIndex,
                svg: renderSphereSVG(giveDia ? `d=${r*2}` : `r=${r}`),
                explanation: giveDia ? 
                    `Step 1: Radius $r = \\frac{d}{2} = ${r}$.
Step 2: Area = $4\\pi r^2 = 4 \\times \\frac{22}{7} \\times ${r}^2 = $${sa}\\text{ cm}^2$.` :
                    `Area = $4\\pi r^2 = 4 \\times \\frac{22}{7} \\times ${r}^2 = $${sa}\\text{ cm}^2$.`
            });
        }
        // 8-14: Hemisphere SA & TSA
        else if (i < 14) {
            if (i % 2 === 0) {
                // Hemi CSA
                const csa = (2 * PI * r * r).toFixed(2);
                const { options, correctIndex } = generateOptions(Number(csa), '\\text{ cm}^2');
                list.push({
                    type: 'mcq',
                    q: `Find the Curved Surface Area (CSA) of a hemisphere with radius $r = ${r}${unit}$.`,
                    options, correctIndex,
                    svg: renderHemisphereSVG(`r=${r}`),
                    explanation: `Hemisphere CSA = $2\\pi r^2 = 2 \\times \\frac{22}{7} \\times ${r}^2 = $${csa}\\text{ cm}^2$.`
                });
            } else {
                // Hemi TSA
                const tsa = (3 * PI * r * r).toFixed(2);
                const { options, correctIndex } = generateOptions(Number(tsa), '\\text{ cm}^2');
                list.push({
                    type: 'mcq',
                    q: `Find the Total Surface Area (TSA) of a solid hemisphere with radius $r = ${r}${unit}$.`,
                    options, correctIndex,
                    svg: renderHemisphereSVG(`r=${r}`),
                    explanation: `Hemisphere TSA = $3\\pi r^2 = 3 \\times \\frac{22}{7} \\times ${r}^2 = $${tsa}\\text{ cm}^2$.`
                });
            }
        }
        // 15-20: Sphere / Hemi Volumes
        else {
            const isHemi = Math.random() > 0.5;
            if (isHemi) {
                const vol = ((2/3) * PI * Math.pow(r, 3)).toFixed(2);
                const { options, correctIndex } = generateOptions(Number(vol), '\\text{ cm}^3');
                list.push({
                    type: 'mcq',
                    q: `Find the Volume of a hemisphere with radius $r = ${r}${unit}$.`,
                    options, correctIndex,
                    svg: renderHemisphereSVG(`r=${r}`),
                    explanation: `Hemisphere Volume = $\\frac{2}{3}\\pi r^3 = \\frac{2}{3} \\times \\frac{22}{7} \\times ${r}^3 = $${vol}\\text{ cm}^3$.`
                });
            } else {
                const vol = ((4/3) * PI * Math.pow(r, 3)).toFixed(2);
                const { options, correctIndex } = generateOptions(Number(vol), '\\text{ cm}^3');
                list.push({
                    type: 'mcq',
                    q: `Find the Volume of a sphere with radius $r = ${r}${unit}$.`,
                    options, correctIndex,
                    svg: renderSphereSVG(`r=${r}`),
                    explanation: `Sphere Volume = $\\frac{4}{3}\\pi r^3 = \\frac{4}{3} \\times \\frac{22}{7} \\times ${r}^3 = $${vol}\\text{ cm}^3$.`
                });
            }
        }
    }
    return list;
};


// 3. APPLICATIONS (Real World Contexts)
export const generateApplicationScenarios = (count = 20) => {
    const list = [];
    for (let i = 0; i < count; i++) {
        let r = STANDARD_RADII[Math.floor(Math.random() * STANDARD_RADII.length)];
        
        // 1-10: Costs (Painting / Materials)
        if (i < 10) {
            const rate = rInt(5, 50); // ₹ per m2
            
            // Randomly choose conical tent or hemispherical dome
            if (i % 2 === 0) {
                // Conical tent: uses CSA, rate.
                const base = CONE_TRIPLETS[Math.floor(Math.random() * CONE_TRIPLETS.length)];
                const scale = rInt(1, 5);
                const coneR = base.r * scale;
                const coneL = base.l * scale;
                
                const csa = (PI * coneR * coneL).toFixed(2);
                const cost = Math.round(csa * rate);
                const { options, correctIndex } = generateOptions(cost, '', true);
                
                list.push({
                    type: 'mcq',
                    q: `A conical tent has base radius $${coneR}\\text{ m}$ and slant height $${coneL}\\text{ m}$. Find the cost of canvas required to make it, if canvas costs $₹${rate}$ per $\\text{m}^2$.`,
                    options, correctIndex,
                    svg: renderConeSVG(`r=${coneR}m`, ` `, `l=${coneL}m`),
                    explanation: `Canvas only covers the curved area (CSA).\\nCSA = $\\pi r l = \\frac{22}{7} \\times ${coneR} \\times ${coneL} = ${csa}\\text{ m}^2$.\\nTotal Cost = $${csa} \\times ${rate} = ₹${cost}$.`
                });
            } else {
                // Hemispherical dome: uses CSA, rate.
                let domer = r; // m
                const csa = (2 * PI * domer * domer).toFixed(2);
                const cost = Math.round(csa * rate);
                const { options, correctIndex } = generateOptions(cost, '', true);
                
                list.push({
                    type: 'mcq',
                    q: `A hemispherical dome of a building needs painting from the outside. Its radius is $${domer}\\text{ m}$. If painting costs $₹${rate}$ per $\\text{m}^2$, find the total cost of painting the dome.`,
                    options, correctIndex,
                    svg: renderHemisphereSVG(`r=${domer}m`),
                    explanation: `The dome requires painting only on its curved surface.\\nCSA = $2\\pi r^2 = 2 \\times \\frac{22}{7} \\times ${domer}^2 = ${csa}\\text{ m}^2$.\\nTotal Cost = $${csa} \\times ${rate} = ₹${cost}$.`
                });
            }
        } 
        // 11-20: Capacity (Liters)
        else {
            if (i % 2 === 0) {
                // Hemispherical bowl: capacity in Liters. r is in cm. Vol / 1000 = Liters
                let bowlr = r * 10; // larger bowl to hold liters, e.g. 70cm, 140cm
                const vol_cm3 = (2/3) * PI * Math.pow(bowlr, 3);
                const liters = (vol_cm3 / 1000).toFixed(2);
                const { options, correctIndex } = generateOptions(Number(liters), '\\text{ L}');
                
                list.push({
                    type: 'mcq',
                    q: `How many liters of milk can a hemispherical bowl of radius $${bowlr}\\text{ cm}$ hold?`,
                    options, correctIndex,
                    svg: renderHemisphereSVG(`r=${bowlr}cm`),
                    explanation: `Capacity is the Volume.\\nVolume = $\\frac{2}{3}\\pi r^3 = \\frac{2}{3} \\times \\frac{22}{7} \\times ${bowlr}^3 = ${vol_cm3.toFixed(2)}\\text{ cm}^3$.\\nSince $1000\\text{ cm}^3 = 1\\text{ Liter}$, Capacity = $${vol_cm3.toFixed(2)} \\div 1000 = $${liters}\\text{ L}$.`
                });
            } else {
                // Conical vessel: capacity
                const base = CONE_TRIPLETS[Math.floor(Math.random() * CONE_TRIPLETS.length)];
                const scale = rInt(5, 10);
                const coneR = base.r * scale; // in cm
                const coneH = base.h * scale;
                const vol_cm3 = (1/3) * PI * Math.pow(coneR, 2) * coneH;
                const liters = (vol_cm3 / 1000).toFixed(2);
                const { options, correctIndex } = generateOptions(Number(liters), '\\text{ L}');
                
                list.push({
                    type: 'mcq',
                    q: `Find the capacity in liters of a conical vessel with radius $${coneR}\\text{ cm}$ and vertical height $${coneH}\\text{ cm}$.`,
                    options, correctIndex,
                    svg: renderConeSVG(`r=${coneR}cm`, `h=${coneH}cm`, ` `),
                    explanation: `Capacity is the Volume.\\nVolume = $\\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times \\frac{22}{7} \\times ${coneR}^2 \\times ${coneH} = ${vol_cm3.toFixed(2)}\\text{ cm}^3$.\\nCapacity = $${vol_cm3.toFixed(2)} \\div 1000 = $${liters}\\text{ L}$.`
                });
            }
        }
    }
    return list;
};


// The Main Entry Point for Engines
export const generateQuestions = (skillId, count = 20) => {
    // Generate the sequential scenarios based on skill ID
    // 20 items per skill mapped perfectly.
    switch (skillId) {
        case 'cones':
            return generateConeScenarios(count);
        case 'spheres':
            return generateSphereScenarios(count);
        case 'applications':
            return generateApplicationScenarios(count);
        // For chapter test / assessment, we shuffle all available!
        case 'assessment':
            const allFiles = [
                ...generateConeScenarios(10),
                ...generateSphereScenarios(10),
                ...generateApplicationScenarios(10)
            ];
            const testPool = shuffleArray(allFiles).slice(0, count);
            return testPool;
        default:
            return generateConeScenarios(count);
    }
};
