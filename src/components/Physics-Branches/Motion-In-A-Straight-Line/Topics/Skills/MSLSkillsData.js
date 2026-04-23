import { mslLearnSections } from './MSLLearnSections';

const randElem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (array) => {
    let copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const formatOpt = val => `${Number.isInteger(val) ? val : Number(val).toFixed(2)}`.replace(/\.00$/, '');

const generateSkillPool = (generators, count) => {
    const pool = [];
    let attempts = 0;
    while (pool.length < count && attempts < 1000) {
        const gen = randElem(generators);
        const q = gen();
        // Basic deduplication based on question text
        if (!pool.some(existing => existing.question === q.question)) {
            pool.push(q);
        }
        attempts++;
    }
    return pool;
};

// ────────────────────────────────────────────────────────────────────
// GENERATORS FOR EACH SKILL
// ────────────────────────────────────────────────────────────────────

const skill1Generators = [
    // Distance/Displacement 1D segments
    () => {
        const x = randInt(2, 12) * 10;
        const y = randInt(1, x/10 - 1) * 10;
        const z = randInt(2, 8) * 10;
        const totalDist = x + y + z;
        const totalDisp = x - y + z;
        const opts = shuffle([`Distance = ${totalDist} m, Displacement = ${totalDisp} m`, `Distance = ${totalDist} m, Displacement = ${totalDist} m`, `Distance = ${totalDisp} m, Displacement = ${totalDisp} m`, `Distance = ${x+z} m, Displacement = ${totalDisp} m`]);
        return {
            type: 'multiple-choice',
            question: `A particle moves along a straight road: ${x} m North, then ${y} m South, then finally ${z} m North. Find the total distance and net displacement.`,
            options: opts,
            correctAnswer: opts.indexOf(`Distance = ${totalDist} m, Displacement = ${totalDisp} m`),
            explanation: `Total Distance = sum of magnitudes = ${x} + ${y} + ${z} = ${totalDist} m. Displacement (vector sum) = +${x} - ${y} + ${z} = ${totalDisp} m North.`
        };
    },
    // Circular paths
    () => {
        const r = randElem([7, 14, 21, 28]);
        const laps = randElem([0.5, 1.5, 2.5]);
        const disp = 2 * r;
        const dist = Math.round(laps * 2 * (22/7) * r);
        const opts = shuffle([`Dist: ${dist} m, Disp: ${disp} m`, `Dist: ${dist} m, Disp: 0 m`, `Dist: ${disp} m, Disp: ${disp} m`, `Dist: 0 m, Disp: ${dist} m`]);
        return {
            type: 'multiple-choice',
            question: `An athlete runs around a circular track of radius ${r} m. If they complete ${laps} laps, find the distance and displacement magnitude.`,
            options: opts,
            correctAnswer: opts.indexOf(`Dist: ${dist} m, Disp: ${disp} m`),
            explanation: `After ${laps} laps, the athlete is at the diametrically opposite point. Distance = ${laps} × Circumference = ${laps} × 2πr = ${dist} m. Displacement = diameter = 2r = ${disp} m.`
        }
    },
    // Harmonic Mean Average Speed
    () => {
        const v1 = randElem([20, 30, 40, 50, 60]);
        const v2 = randElem([30, 40, 60, 80, 120]);
        if (v1 === v2) return skill1Generators[2](); // Retry
        const avg = (2 * v1 * v2) / (v1 + v2);
        const correct = `${formatOpt(avg)} km/h`;
        const opts = shuffle([correct, `${formatOpt((v1+v2)/2)} km/h`, `${formatOpt(Math.abs(v1-v2)/2)} km/h`, `${v1} km/h`]);
        return {
            type: 'multiple-choice',
            question: `A car travels from point A to B at ${v1} km/h and returns to point A at ${v2} km/h. Its average speed for the full journey is:`,
            options: opts,
            correctAnswer: opts.indexOf(correct),
            explanation: `Average speed for same-distance return trips = Harmonic Mean = 2v₁v₂ / (v₁ + v₂) = (2 × ${v1} × ${v2}) / (${v1} + ${v2}) = ${correct}.`
        };
    }
];

const skill2Generators = [
    // Basic a = (v-u)/t
    () => {
        const u = randInt(0, 10) * 2;
        const a = randInt(2, 6);
        const t = randInt(2, 8);
        const v = u + a * t;
        const opts = shuffle([`${a} m/s²`, `${a+2} m/s²`, `${formatOpt(v/t)} m/s²`, `${a-1} m/s²`]);
        return {
            type: 'multiple-choice',
            question: `A vehicle increases its velocity from ${u} m/s to ${v} m/s in a time interval of ${t} seconds. Find its constant acceleration.`,
            options: opts,
            correctAnswer: opts.indexOf(`${a} m/s²`),
            explanation: `a = (v - u) / t = (${v} - ${u}) / ${t} = ${a} m/s².`
        };
    },
    // Calculus v = dx/dt
    () => {
        const c1 = randInt(2, 5);
        const c2 = randInt(2, 8);
        const t = randInt(1, 4);
        const vel = 2 * c1 * t + c2;
        const opts = shuffle([`${vel} m/s`, `${c1 * t + c2} m/s`, `${2 * c1 * t} m/s`, `${vel + 2} m/s`]);
        return {
            type: 'multiple-choice',
            question: `The position of a particle is given by x = ${c1}t² + ${c2}t + 5 (in SI units). Its instantaneous velocity at t = ${t} s is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${vel} m/s`),
            explanation: `v = dx/dt = d/dt(${c1}t² + ${c2}t + 5) = ${2*c1}t + ${c2}. At t = ${t}, v = ${2*c1}(${t}) + ${c2} = ${vel} m/s.`
        };
    },
    // Deceleration/Retardation
    () => {
        const u = randElem([20, 30, 40]);
        const t = randElem([4, 5, 8, 10]);
        const a = u / t;
        const opts = shuffle([`${a} m/s²`, `${a*2} m/s²`, `${a-1} m/s²`, `0 m/s²`]);
        return {
            type: 'multiple-choice',
            question: `A train moving at ${u} m/s comes to a halt in ${t} s after brakes are applied. The magnitude of retardation is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${a} m/s²`),
            explanation: `a = (v - u) / t = (0 - ${u}) / ${t} = -${a} m/s². Retardation is the magnitude = ${a} m/s².`
        }
    }
];

const skill3Generators = [
    // s = ut + 0.5at^2 (u=0)
    () => {
        const a = randElem([2, 4, 6, 8]);
        const t = randInt(3, 10);
        const dist = 0.5 * a * t * t;
        const opts = shuffle([`${dist} m`, `${dist*2} m`, `${a*t} m`, `${dist-10} m`]);
        return {
            type: 'multiple-choice',
            question: `A rocket starts from rest and accelerates at ${a} m/s². The distance covered by it in ${t} s is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${dist} m`),
            explanation: `Using s = ut + ½at², with u=0: s = 0 + ½(${a})(${t}²) = ${dist} m.`
        }
    },
    // v^2 = u^2 + 2as (stopping distance)
    () => {
        const u = randElem([10, 20, 30]);
        const a = randElem([2, 4, 5]);
        const s = (u * u) / (2 * a);
        const opts = shuffle([`${s} m`, `${s/2} m`, `${s*2} m`, `${u*u} m`]);
        return {
            type: 'multiple-choice',
            question: `A car moving at ${u} m/s applies brakes to generate a uniform deceleration of ${a} m/s². How far does it travel before stopping?`,
            options: opts,
            correctAnswer: opts.indexOf(`${s} m`),
            explanation: `Using v² = u² + 2as, with v=0 and a=-${a}: 0 = ${u}² + 2(-${a})s => s = ${u*u} / ${2*a} = ${s} m.`
        }
    },
    // Distance in nth second
    () => {
        const u = randInt(2, 10);
        const a = randElem([2, 4, 6]);
        const n = randInt(3, 6);
        const sn = u + (a / 2) * (2 * n - 1);
        const opts = shuffle([`${sn} m`, `${sn+a} m`, `${sn-u} m`, `${u+a*n} m`]);
        return {
            type: 'multiple-choice',
            question: `An object moves with initial velocity ${u} m/s and acceleration ${a} m/s². The distance covered by it in the ${n === 3 ? '3rd' : n === 4 ? '4th' : n === 5 ? '5th' : 'nth'} second is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${sn} m`),
            explanation: `sₙ = u + a/2(2n - 1) = ${u} + ${a}/2(2×${n} - 1) = ${u} + ${a/2}(${2*n-1}) = ${sn} m.`
        }
    }
];

const skill4Generators = [
    // Area of v-t triangle
    () => {
        const t = randInt(4, 12);
        const v = randInt(10, 40);
        const area = 0.5 * t * v;
        const opts = shuffle([`${area} m`, `${t*v} m`, `${(v/t).toFixed(1).replace(/\\.0$/, '')} m`, `${area*2} m`]);
        
        const svg = `<svg viewBox="0 0 300 150" style="width:100%; max-width:300px; display:block; margin: 0 auto; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:12px;">
    <!-- Axes -->
    <line x1="40" y1="120" x2="260" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <line x1="40" y1="30" x2="40" y2="120" stroke="#94a3b8" stroke-width="2"/>
    
    <!-- Path -->
    <polygon points="40,120 220,50 220,120" fill="rgba(245,158,11,0.1)"/>
    <path d="M 40 120 L 220 50" fill="none" stroke="#f59e0b" stroke-width="3"/>
    <line x1="220" y1="50" x2="220" y2="120" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
    <line x1="40" y1="50" x2="220" y2="50" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
    
    <!-- Labels -->
    <text x="220" y="135" font-size="12" fill="#64748b" text-anchor="middle">${t}</text>
    <text x="10" y="55" font-size="12" fill="#64748b">${v}</text>
    <text x="270" y="125" font-size="12" font-weight="bold" fill="#0f172a">t (s)</text>
    <text x="40" y="20" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">v (m/s)</text>
</svg>`;

        return {
            type: 'multiple-choice',
            question: `Find the displacement from the given v-t graph up to t = ${t}s (peak v = ${v} m/s).`,
            graphSvg: svg,
            options: opts,
            correctAnswer: opts.indexOf(`${area} m`),
            explanation: `Displacement = Area under v-t graph = Area of triangle = ½ × base × height = ½ × ${t} × ${v} = ${area} m.`
        }
    },
    // v-t slope (acceleration)
    () => {
        const t1 = 0, v1 = randInt(0, 5) * 5;
        const t2 = randInt(2, 6);
        const v2 = v1 + randInt(2, 5) * 5;
        const accel = (v2 - v1) / (t2 - t1);
        const fAccel = formatOpt(accel);
        const opts = shuffle([`${fAccel} m/s²`, `${formatOpt(accel*2)} m/s²`, `${formatOpt((v2+v1)/2)} m/s²`, `0 m/s²`]);

        const y2 = 40;
        const y1 = 120 - ((v1 / (v2+10)) * 80);

        const svg = `<svg viewBox="0 0 300 150" style="width:100%; max-width:300px; display:block; margin: 0 auto; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:12px;">
    <line x1="40" y1="120" x2="260" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <line x1="40" y1="30" x2="40" y2="120" stroke="#94a3b8" stroke-width="2"/>
    
    <path d="M 40 ${y1} L 220 ${y2}" fill="none" stroke="#f59e0b" stroke-width="3"/>
    
    <line x1="220" y1="${y2}" x2="220" y2="120" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
    <line x1="40" y1="${y2}" x2="220" y2="${y2}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
    <line x1="40" y1="${y1}" x2="220" y2="${y1}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>

    <text x="220" y="135" font-size="12" fill="#64748b" text-anchor="middle">${t2}</text>
    <text x="10" y="${y1 + 5}" font-size="12" fill="#64748b">${v1}</text>
    <text x="10" y="${y2 + 5}" font-size="12" fill="#64748b">${v2}</text>
    
    <text x="270" y="125" font-size="12" font-weight="bold" fill="#0f172a">t (s)</text>
    <text x="40" y="20" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">v (m/s)</text>
</svg>`;

        return {
            type: 'multiple-choice',
            question: `A velocity-time graph is shown below. Calculate the acceleration of the object for the interval t=0s to t=${t2}s, given v changes from ${v1} m/s to ${v2} m/s.`,
            graphSvg: svg,
            options: opts,
            correctAnswer: opts.indexOf(`${fAccel} m/s²`),
            explanation: `Acceleration = Slope of v-t graph = (v₂ - v₁) / (t₂ - t₁) = (${v2} - ${v1}) / (${t2} - ${t1}) = ${fAccel} m/s².`
        }
    }
];

const skill5Generators = [
    // Relative Velocity Opposite Directions
    () => {
        const v1 = randInt(10, 30);
        const v2 = randInt(10, 30);
        const vRel = v1 + v2;
        const opts = shuffle([`${vRel} m/s`, `${Math.abs(v1-v2)} m/s`, `${v1} m/s`, `${v2} m/s`]);
        return {
            type: 'multiple-choice',
            question: `Two trains are moving in opposite directions with speeds of ${v1} m/s and ${v2} m/s respectively. The relative speed of one train with respect to the other is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${vRel} m/s`),
            explanation: `For opposite directions, relative speed = v₁ + v₂ = ${v1} + ${v2} = ${vRel} m/s.`
        }
    },
    // Relative Velocity Same Direction
    () => {
        const v1 = randInt(40, 100);
        const v2 = randInt(20, v1 - 10);
        const vRel = v1 - v2;
        const opts = shuffle([`${vRel} km/h`, `${v1+v2} km/h`, `${v1} km/h`, `${v2} km/h`]);
        return {
            type: 'multiple-choice',
            question: `Car A moves at ${v1} km/h and Car B moves at ${v2} km/h in the same direction. The magnitude of relative velocity of A with respect to B is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${vRel} km/h`),
            explanation: `For same direction, relative velocity magnitude = |v₁ - v₂| = ${v1} - ${v2} = ${vRel} km/h.`
        }
    }
];

// ────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ────────────────────────────────────────────────────────────────────

export const generateMSLSkillsData = () => {
    // Generate large pools for each skill
    const pools = [
        generateSkillPool(skill1Generators, 30),
        generateSkillPool(skill2Generators, 30),
        generateSkillPool(skill3Generators, 30),
        generateSkillPool(skill4Generators, 30),
        generateSkillPool(skill5Generators, 30),
    ];

    return [
        {
            id: 'distance-displacement',
            icon: '📏',
            color: '#6366f1',
            title: 'Distance vs Displacement',
            desc: 'Calculate and contrast scalar distance with vector displacement in multi-segment journeys.',
            learnSections: mslLearnSections[0],
            practice: pools[0].slice(0, 20),
            assessment: pools[0].slice(20, 30)
        },
        {
            id: 'velocity-acceleration',
            icon: '🎯',
            color: '#0d9488',
            title: 'Speed, Velocity & Acceleration',
            desc: 'Compute instantaneous and average values; interpret direction; distinguish uniform from non-uniform motion.',
            learnSections: mslLearnSections[1],
            practice: pools[1].slice(0, 20),
            assessment: pools[1].slice(20, 30)
        },
        {
            id: 'kinematic-equations',
            icon: '📐',
            color: '#7c3aed',
            title: 'Applying Kinematic Equations',
            desc: 'Select and apply the correct kinematic equation for uniformly accelerated motion problems.',
            learnSections: mslLearnSections[2],
            practice: pools[2].slice(0, 20),
            assessment: pools[2].slice(20, 30)
        },
        {
            id: 'motion-graphs',
            icon: '📊',
            color: '#f59e0b',
            title: 'Interpreting Motion Graphs',
            desc: 'Read s–t and v–t graphs to extract velocity, acceleration, and displacement using slope and area.',
            learnSections: mslLearnSections[3],
            practice: pools[3].slice(0, 20),
            assessment: pools[3].slice(20, 30)
        },
        {
            id: 'relative-velocity',
            icon: '🚂',
            color: '#ef4444',
            title: 'Relative Velocity in 1D',
            desc: 'Calculate time to cross, overtake, or meet; solve train-crossing and river-crossing style problems.',
            learnSections: mslLearnSections[4],
            practice: pools[4].slice(0, 20),
            assessment: pools[4].slice(20, 30)
        }
    ];
};
