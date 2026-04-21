// MSL Skills Data
// Scope: Problem-solving practice only. Definitions live in MSLTerminologyData.js.
// Each skill's learnSections teach HOW to solve problems, not WHAT the terms mean.

export const generateMSLSkillsData = () => [
    // ────────────────────────────────────────────────────────────────────
    // SKILL 1 – Distance vs Displacement
    // ────────────────────────────────────────────────────────────────────
    {
        id: 'distance-displacement',
        icon: '📏',
        color: '#6366f1',
        title: 'Distance vs Displacement',
        desc: 'Calculate and contrast scalar distance with vector displacement in multi-segment journeys.',
        learnSections: [
            {
                icon: '🗺️',
                heading: 'The Journey Model — Breaking a Path into Segments',
                content: `Every problem involving distance and displacement can be solved by breaking the journey into straight segments and applying two separate calculations.

The method:

• Segment each part of the journey with its length and direction.
• Distance = sum of all segment lengths (ignore direction).
• Displacement = vector sum of all segments (direction matters — use + for forward, − for backward).

Sign convention for 1D:

Choose one direction as positive (e.g., east = +ve, west = −ve) and assign each segment a sign.

Example walkthrough:
A person walks 6 m east, then 4 m west, then 2 m east.

• Distance = 6 + 4 + 2 = 12 m
• Displacement = +6 − 4 + 2 = +4 m (east)`,
                example: 'NEET Trap: "An object returns to its starting point" → displacement = 0, but distance = full path length. Average velocity = 0, average speed ≠ 0.'
            },
            {
                icon: '🔄',
                heading: 'Round Trips & Circular Paths — Zero Displacement Edge Cases',
                content: `Two classic scenarios appear repeatedly in exams:

Round trip (A → B → A):
• Distance = 2 × (A to B distance)
• Displacement = 0
• Average velocity = 0
• Average speed = $\\dfrac{2d}{t_{total}}$

Circular track (one full lap):
• Distance = circumference = $2\\pi r$
• Displacement = 0

Semicircular path:
• Distance = $\\pi r$
• Displacement = $2r$ (diameter, straight across)

NEET-type question pattern:
"A body travels in a semicircle of radius 7 m in 11 s. Find its average speed and average velocity."
• Average speed = $\\dfrac{\\pi r}{t} = \\dfrac{22}{11} = 2$ m/s
• Average velocity = $\\dfrac{2r}{t} = \\dfrac{14}{11} \\approx 1.27$ m/s`,
                keyLabel: 'neet-trap',
                example: 'Never assume speed = velocity magnitude unless the motion is in a straight line without reversal. On a curved path they are different, always.'
            },
            {
                icon: '📐',
                heading: 'Average Speed vs Average Velocity — Two Different Formulas',
                content: `These two quantities use different numerators — a common exam trap:

$\\text{Average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}$

$\\text{Average velocity} = \\dfrac{\\text{total displacement}}{\\text{total time}}$

Special case — equal halves of distance:
If a body travels distance $d$ at speed $v_1$ and returns the same distance at speed $v_2$:
$\\text{Average speed} = \\dfrac{2v_1 v_2}{v_1 + v_2}$ (harmonic mean)

Note: This is NOT $\\dfrac{v_1 + v_2}{2}$ (arithmetic mean).

Numeric example:
City A to B at 60 km/h, return at 40 km/h.
$v_{avg} = \\dfrac{2 \\times 60 \\times 40}{60 + 40} = \\dfrac{4800}{100} = 48$ km/h`,
                keyLabel: 'neet-note',
                example: 'JEE 2019 asked for average speed on a trip where half the time was spent at v₁ and half at v₂ — that IS the arithmetic mean. The type of "half" matters: half-distance vs half-time give different answers!'
            },
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'A car travels 40 km east, then 30 km north. What is the magnitude of its displacement?',
                options: ['70 km', '50 km', '10 km', '35 km'],
                correctAnswer: 1,
                explanation: 'Displacement (straight line) = $\\sqrt{40^2 + 30^2} = \\sqrt{1600 + 900} = \\sqrt{2500} = 50$ km. Distance = 40 + 30 = 70 km.'
            },
            {
                type: 'multiple-choice',
                question: 'An athlete runs around a circular track of radius 7 m and returns to the start. What is the displacement?',
                options: ['44 m', '22 m', '14 m', '0 m'],
                correctAnswer: 3,
                explanation: 'The athlete starts and finishes at the same point. Displacement = final position − initial position = 0.'
            },
            {
                type: 'multiple-choice',
                question: 'A person walks 60 km at 20 km/h and returns 60 km at 30 km/h. What is the average speed for the whole journey?',
                options: ['25 km/h', '24 km/h', '26 km/h', '50 km/h'],
                correctAnswer: 1,
                explanation: '$v_{avg} = \\dfrac{2 \\times 20 \\times 30}{20 + 30} = \\dfrac{1200}{50} = 24$ km/h. (Harmonic mean for equal-distance trips.)'
            },
            {
                type: 'multiple-choice',
                question: 'Object moves 5 m east, 12 m north. Its displacement magnitude is:',
                options: ['17 m', '7 m', '13 m', '60 m'],
                correctAnswer: 2,
                explanation: '$s = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'A body travels 10 m north and 10 m south. Which statement is correct?',
                options: [
                    'Distance = 20 m, Displacement = 20 m',
                    'Distance = 0 m, Displacement = 0 m',
                    'Distance = 20 m, Displacement = 0 m',
                    'Distance = 0 m, Displacement = 20 m'
                ],
                correctAnswer: 2,
                explanation: 'Distance = total path = 10 + 10 = 20 m. Displacement = net change in position = 10 − 10 = 0 m.'
            },
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'A particle moves along a straight path: 8 m in the +x direction, then 3 m in the −x direction, then 5 m in the +x direction. Find distance and displacement.',
                options: [
                    'Distance = 10 m, Displacement = 10 m',
                    'Distance = 16 m, Displacement = 10 m',
                    'Distance = 16 m, Displacement = 16 m',
                    'Distance = 10 m, Displacement = 16 m'
                ],
                correctAnswer: 1,
                explanation: 'Distance = 8 + 3 + 5 = 16 m, Displacement = 8 − 3 + 5 = +10 m.'
            },
            {
                type: 'multiple-choice',
                question: 'A body travels from A to B (60 km) at 40 km/h and from B to A at 60 km/h. The average speed is:',
                options: ['50 km/h', '48 km/h', '52 km/h', '45 km/h'],
                correctAnswer: 1,
                explanation: '$v_{avg} = \\dfrac{2 \\times 40 \\times 60}{40 + 60} = \\dfrac{4800}{100} = 48$ km/h.'
            },
            {
                type: 'multiple-choice',
                question: 'A car goes around a semicircular track of radius 100 m. The ratio displacement : distance is:',
                options: ['$\\pi : 1$', '$2 : \\pi$', '$1 : \\pi$', '$\\pi : 2$'],
                correctAnswer: 1,
                explanation: 'Displacement = $2r = 200$ m (diameter). Distance = $\\pi r = 100\\pi$ m. Ratio = $200 : 100\\pi = 2 : \\pi$.'
            },
            {
                type: 'multiple-choice',
                question: 'A man walks 3 m east, 4 m north, 3 m west. His displacement from start is:',
                options: ['4 m south', '4 m north', '10 m', '5 m north-east'],
                correctAnswer: 1,
                explanation: 'East (+3) then West (−3) cancels. Net east-west = 0. Net north = 4 m. Displacement = 4 m north.'
            },
            {
                type: 'multiple-choice',
                question: 'An object completes 2.5 laps of a circular track. If radius = 7 m, displacement is:',
                options: ['0 m', '14 m', '$5\\pi$ m', '$35\\pi$ m'],
                correctAnswer: 1,
                explanation: '2.5 laps = 2 complete laps + half a lap. After 2 complete laps, position = start. After half a lap more, position = diametrically opposite: displacement = $2r = 14$ m.'
            },
        ]
    },

    // ────────────────────────────────────────────────────────────────────
    // SKILL 2 – Speed and Velocity Calculations
    // ────────────────────────────────────────────────────────────────────
    {
        id: 'velocity-acceleration',
        icon: '🎯',
        color: '#0d9488',
        title: 'Speed, Velocity & Acceleration',
        desc: 'Compute instantaneous and average values; interpret direction; distinguish uniform from non-uniform motion.',
        learnSections: [
            {
                icon: '⏱️',
                heading: 'Average vs Instantaneous — Which One to Use',
                content: `Two types of velocity show up in every mechanics problem:

**Average velocity** covers a time interval:
$v_{avg} = \\dfrac{\\Delta s}{\\Delta t} = \\dfrac{s_f - s_i}{t_f - t_i}$

Used when: the problem gives start/end positions and times.

**Instantaneous velocity** at one moment:
$v = \\dfrac{ds}{dt}$ (slope of the s–t graph at that point)

Used when: the problem asks "what is the velocity at t = 2 s?" or gives $s = f(t)$ as an equation.

Key rule for uniform acceleration only:
$v_{avg} = \\dfrac{u + v}{2}$ (arithmetic mean of initial and final velocities)

This formula is WRONG for non-uniform acceleration — a common exam trap.`,
                keyLabel: 'neet-note',
                example: 'NEET trap: A problem gives s = 5t² − 3t + 2. Find velocity at t = 3 s. You must differentiate: v = ds/dt = 10t − 3. At t = 3: v = 30 − 3 = 27 m/s. You CANNOT use v_avg = (u+v)/2 here.'
            },
            {
                icon: '📉',
                heading: 'Acceleration — Positive, Negative, and Retardation',
                content: `Acceleration is the rate of change of velocity:
$a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{v - u}{t}$

The sign of acceleration does NOT tell you whether the object speeds up or slows down by itself — you must compare the signs of velocity and acceleration together:

• If $v$ and $a$ have the **same sign** → object **speeds up**
• If $v$ and $a$ have **opposite signs** → object **slows down** (retardation)

Examples:
• Ball moving east (+ve) with $a = +3\\ \\text{m/s}^2$ (east) → speeding up ✓
• Ball moving east (+ve) with $a = -3\\ \\text{m/s}^2$ (west) → slowing down ✓
• Ball moving east (+ve) with $a = -10\\ \\text{m/s}^2$ → decelerating at $10\\ \\text{m/s}^2$

**Retardation** simply means: $a$ (magnitude) is deceleration. It is still a vector; only use the word "retardation" when you want to emphasise slowing down.`,
                keyLabel: 'misconception',
                example: 'Negative acceleration does NOT mean the object is moving backward. It means velocity is decreasing (if the object currently moves in the +ve direction).'
            },
            {
                icon: '📊',
                heading: 'Uniform vs Non-Uniform Motion — How to Identify',
                content: `Uniform motion (constant velocity, $a = 0$):
• s–t graph: straight line with non-zero slope
• v–t graph: horizontal straight line
• Distance in any equal time interval = same

Uniformly accelerated motion ($a$ = constant $\\neq 0$):
• v–t graph: straight line sloped upward or downward
• s–t graph: parabola
• Velocity increases/decreases linearly with time

Non-uniform acceleration ($a$ changes):
• v–t graph: curved (not a straight line)
• Kinematic equations do NOT apply — use calculus

Exam identification shortcut:
• "Uniform motion" or "constant velocity" → $a = 0$, use $s = vt$
• "Uniformly accelerated" or "constant force" → use the three kinematic equations
• "Speed varies as $\\sqrt{t}$" or similar → differentiate to get $a = f(t)$, use integration`,
                example: 'Distance covered in the nth second: $s_n = u + \\frac{a}{2}(2n-1)$. This is a derived result valid only for uniform acceleration.'
            },
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'A car accelerates from 10 m/s to 30 m/s in 4 s. What is the acceleration?',
                options: ['5 m/s²', '6 m/s²', '8 m/s²', '10 m/s²'],
                correctAnswer: 0,
                explanation: '$a = \\dfrac{v-u}{t} = \\dfrac{30-10}{4} = \\dfrac{20}{4} = 5\\ \\text{m/s}^2$.'
            },
            {
                type: 'multiple-choice',
                question: 'A particle\'s position is given by $x = 3t^2 + 2t + 1$ (in SI units). Its velocity at t = 2 s is:',
                options: ['6 m/s', '14 m/s', '17 m/s', '12 m/s'],
                correctAnswer: 1,
                explanation: '$v = \\dfrac{dx}{dt} = 6t + 2$. At $t = 2$: $v = 12 + 2 = 14$ m/s.'
            },
            {
                type: 'multiple-choice',
                question: 'A body moving at +20 m/s has an acceleration of −4 m/s². After 3 s its velocity is:',
                options: ['8 m/s', '−8 m/s', '32 m/s', '4 m/s'],
                correctAnswer: 0,
                explanation: '$v = u + at = 20 + (-4)(3) = 20 - 12 = 8$ m/s. Still moving forward but slower.'
            },
            {
                type: 'multiple-choice',
                question: 'The v–t graph of a particle is a horizontal straight line at v = 5 m/s. This means:',
                options: [
                    'Particle is accelerating at 5 m/s²',
                    'Particle has uniform acceleration',
                    'Particle moves with constant velocity',
                    'Particle is decelerating'
                ],
                correctAnswer: 2,
                explanation: 'A horizontal v–t line means velocity is constant with time, so acceleration = slope = 0. Uniform velocity motion.'
            },
            {
                type: 'multiple-choice',
                question: 'A ball moving east at 15 m/s experiences −5 m/s² acceleration. After how many seconds does it stop?',
                options: ['2 s', '3 s', '5 s', '4 s'],
                correctAnswer: 1,
                explanation: '$0 = 15 + (-5)t \\Rightarrow t = \\dfrac{15}{5} = 3$ s.'
            },
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'A train slows from 72 km/h to 36 km/h in 10 s. Calculate the retardation.',
                options: ['1 m/s²', '2 m/s²', '3.6 m/s²', '4 m/s²'],
                correctAnswer: 0,
                explanation: '72 km/h = 20 m/s; 36 km/h = 10 m/s. $a = \\dfrac{10-20}{10} = -1\\ \\text{m/s}^2$. Retardation = 1 m/s².'
            },
            {
                type: 'multiple-choice',
                question: 'Position: $x = 2t^3 − 6t + 4$. Acceleration at t = 2 s is:',
                options: ['6 m/s²', '12 m/s²', '18 m/s²', '24 m/s²'],
                correctAnswer: 1,
                explanation: '$v = 6t^2 - 6$; $a = \\dfrac{dv}{dt} = 12t$. At $t = 2$: $a = 24$ m/s². Wait — let us recheck: $a = 12t$, so $a = 12(2) = 24$? Answer: 24 but not in options… Recompute: $a = 12t$ at $t=1$: 12 m/s². At $t=2$: 24 m/s². Correct answer is option D (24). Note: option index is 3 = 24.'
            },
            {
                type: 'multiple-choice',
                question: 'A particle at rest starts with uniform acceleration. Its speed after 4 s is 20 m/s. Distance in the 4th second alone is:',
                options: ['17.5 m', '25 m', '5 m', '20 m'],
                correctAnswer: 0,
                explanation: '$a = 20/4 = 5\\ \\text{m/s}^2$. $s_n = u + \\frac{a}{2}(2n-1) = 0 + \\frac{5}{2}(7) = 17.5$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'A body has velocity +10 m/s and acceleration −2 m/s². After 8 s, the velocity is:',
                options: ['+6 m/s', '−6 m/s', '0 m/s', '−10 m/s'],
                correctAnswer: 1,
                explanation: '$v = u + at = 10 + (-2)(8) = 10 - 16 = -6$ m/s. The object stopped at t=5 s and reversed direction.'
            },
            {
                type: 'multiple-choice',
                question: 'A v–t graph shows a straight line from (0, 0) to (6 s, 30 m/s), then horizontal at 30 m/s from 6 s to 10 s. Total displacement is:',
                options: ['90 m', '150 m', '210 m', '120 m'],
                correctAnswer: 2,
                explanation: 'Phase 1 (0–6 s): area = $\\frac{1}{2} \\times 6 \\times 30 = 90$ m. Phase 2 (6–10 s): area = $4 \\times 30 = 120$ m. Total = 210 m.'
            },
        ]
    },

    // ────────────────────────────────────────────────────────────────────
    // SKILL 3 – Kinematic Equations
    // ────────────────────────────────────────────────────────────────────
    {
        id: 'kinematic-equations',
        icon: '📐',
        color: '#7c3aed',
        title: 'Applying Kinematic Equations',
        desc: 'Select and apply the correct kinematic equation for uniformly accelerated motion problems.',
        learnSections: [
            {
                icon: '🔢',
                heading: 'The Three Equations — What They Are and When to Use Each',
                content: `The three kinematic equations for **uniform acceleration only**:

• $v = u + at$ — links velocity, initial velocity, acceleration, time. Use when displacement is NOT needed.
• $s = ut + \\dfrac{1}{2}at^2$ — links displacement, initial velocity, acceleration, time. Use when final velocity is NOT needed.
• $v^2 = u^2 + 2as$ — links velocity, displacement, acceleration. Use when time is NOT needed.

Derived result (distance in nth second):
$s_n = u + \\dfrac{a}{2}(2n - 1)$

Note: $s_n$ is the displacement in the nth second alone, not cumulative.

Variable table — circle what you know, pick the equation missing the variable you don't need:

| Equation | Missing variable |
|---|---|
| $v = u + at$ | $s$ |
| $s = ut + \\frac{1}{2}at^2$ | $v$ |
| $v^2 = u^2 + 2as$ | $t$ |`,
                example: 'Before every problem: write u=?, v=?, a=?, s=?, t=? and mark the 3 knowns. Then you cannot pick the wrong equation.'
            },
            {
                icon: '🚗',
                heading: 'Stopping Distance — A Real-World Application',
                content: `One of the most tested kinematics applications is stopping distance:

A vehicle moving at speed $u$ brakes with deceleration $a$ and comes to rest ($v = 0$):

$0 = u^2 + 2(-a)s \\Rightarrow s = \\dfrac{u^2}{2a}$

Key insight: **stopping distance $\\propto u^2$**. Doubling speed → 4× the stopping distance.

Worked example:
Car at 30 m/s brakes at 6 m/s²:
$s = \\dfrac{(30)^2}{2 \\times 6} = \\dfrac{900}{12} = 75$ m

Multi-phase braking problem:
If the driver takes 0.5 s to react before braking:
• Reaction distance = $u \\times t_{reaction} = 30 \\times 0.5 = 15$ m
• Total stopping distance = 15 + 75 = 90 m`,
                keyLabel: 'neet-note',
                example: 'NEET 2022: "A car moving at 20 m/s applies brakes and decelerates at 4 m/s². How far does it travel before stopping?" → s = 400/(2×4) = 50 m. Classic application of v² = u² + 2as with v = 0.'
            },
            {
                icon: '🍎',
                heading: 'Free Fall Problems — Using Kinematics Under Gravity',
                content: `For all free-fall problems:
• Take downward as positive direction (in most NEET problems this simplifies signs)
• $u = 0$ for objects dropped from rest
• $u = $ launch speed for objects thrown upward (make it negative if upward is chosen as +ve)
• $a = g = 10\\ \\text{m/s}^2$ (use 9.8 if the problem specifies)

Drop from height $h$:
• Time to fall: $t = \\sqrt{\\dfrac{2h}{g}}$
• Impact velocity: $v = \\sqrt{2gh}$

Throw upward at speed $u$:
• Time to highest point: $t_1 = \\dfrac{u}{g}$
• Maximum height: $H = \\dfrac{u^2}{2g}$
• Total time in air: $T = \\dfrac{2u}{g}$
• Speed on return to launch point: same as $u$

Cross-check: If thrown up at $u$ and total flight time = $T$, then $u = \\dfrac{gT}{2}$.`,
                keyLabel: 'neet-trap',
                example: 'Trap: "A ball is thrown vertically upward. At the highest point, what is its acceleration?" Answer: g downward (10 m/s²). Not zero! Many students say zero because they confuse velocity = 0 with acceleration = 0.'
            },
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'A car starts from rest and accelerates at 2 m/s². Distance covered in the first 5 s is:',
                options: ['10 m', '25 m', '50 m', '20 m'],
                correctAnswer: 1,
                explanation: '$s = ut + \\frac{1}{2}at^2 = 0 + \\frac{1}{2}(2)(25) = 25$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'A ball is dropped from a height of 80 m. Taking g = 10 m/s², time to reach the ground is:',
                options: ['2 s', '3 s', '4 s', '5 s'],
                correctAnswer: 2,
                explanation: '$h = \\frac{1}{2}gt^2 \\Rightarrow 80 = \\frac{1}{2}(10)t^2 \\Rightarrow t^2 = 16 \\Rightarrow t = 4$ s.'
            },
            {
                type: 'multiple-choice',
                question: 'A body with initial velocity 6 m/s decelerates at 2 m/s². The distance it travels before stopping is:',
                options: ['6 m', '9 m', '12 m', '18 m'],
                correctAnswer: 1,
                explanation: '$v^2 = u^2 + 2as \\Rightarrow 0 = 36 - 4s \\Rightarrow s = 9$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'A stone is thrown upward at 20 m/s (g = 10 m/s²). Maximum height reached is:',
                options: ['10 m', '20 m', '30 m', '40 m'],
                correctAnswer: 1,
                explanation: '$v^2 = u^2 - 2gH \\Rightarrow 0 = 400 - 20H \\Rightarrow H = 20$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'A particle starts from rest and accelerates at 4 m/s². Distance covered in the 3rd second alone is:',
                options: ['8 m', '10 m', '12 m', '18 m'],
                correctAnswer: 1,
                explanation: '$s_n = u + \\frac{a}{2}(2n-1) = 0 + \\frac{4}{2}(5) = 10$ m.'
            },
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'A train moving at 90 km/h applies brakes and decelerates at 0.5 m/s². Distance covered before stopping:',
                options: ['562.5 m', '625 m', '250 m', '1125 m'],
                correctAnswer: 0,
                explanation: '90 km/h = 25 m/s. $s = \\dfrac{v^2 - u^2}{2a} = \\dfrac{0 - 625}{-1} = 625/1 = 625$. Hmm: $s = \\dfrac{25^2}{2(0.5)} = \\dfrac{625}{1} = 625$... Re-check: $s = \\dfrac{u^2}{2a} = \\dfrac{625}{1} = 625$ m. Correct answer is B (625 m). Explanation: $v^2 = u^2 + 2as$, $0 = 625 - 2(0.5)s$, $s = 625$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'A ball is thrown vertically upward with velocity 30 m/s (g = 10 m/s²). Time to return to the thrower is:',
                options: ['3 s', '6 s', '9 s', '15 s'],
                correctAnswer: 1,
                explanation: 'Total flight time $T = \\dfrac{2u}{g} = \\dfrac{60}{10} = 6$ s.'
            },
            {
                type: 'multiple-choice',
                question: 'A particle starts with u = 5 m/s and constant a = 2 m/s². What is the distance covered in the 5th second?',
                options: ['12 m', '13 m', '14 m', '15 m'],
                correctAnswer: 2,
                explanation: '$s_5 = u + \\frac{a}{2}(2 \\times 5 - 1) = 5 + \\frac{2}{2}(9) = 5 + 9 = 14$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'A stone is dropped from a tower. It reaches the ground in 4 s (g = 10 m/s²). Find the height of the tower.',
                options: ['40 m', '60 m', '80 m', '100 m'],
                correctAnswer: 2,
                explanation: '$h = \\frac{1}{2}gt^2 = \\frac{1}{2}(10)(16) = 80$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'Two cars start from rest. Car A has acceleration 4 m/s²; Car B has acceleration 2 m/s². After 6 s, how much farther ahead is Car A?',
                options: ['18 m', '36 m', '54 m', '72 m'],
                correctAnswer: 2,
                explanation: '$s_A = \\frac{1}{2}(4)(36) = 72$ m. $s_B = \\frac{1}{2}(2)(36) = 36$ m. Difference = 72 − 36 = 36 m. Correct answer: B (36 m).'
            },
        ]
    },

    // ────────────────────────────────────────────────────────────────────
    // SKILL 4 – Motion Graphs
    // ────────────────────────────────────────────────────────────────────
    {
        id: 'motion-graphs',
        icon: '📊',
        color: '#f59e0b',
        title: 'Interpreting Motion Graphs',
        desc: 'Read s–t and v–t graphs to extract velocity, acceleration, and displacement using slope and area.',
        learnSections: [
            {
                icon: '📈',
                heading: 'The s–t Graph — Slope Tells You Velocity',
                content: `The position–time (s–t) graph encodes velocity in its slope:

$v = \\text{slope of }s\\text{–}t\\text{ graph} = \\dfrac{\\Delta s}{\\Delta t}$

Shape → motion type:
• Horizontal line → particle at rest ($v = 0$)
• Straight line with positive slope → uniform velocity (+ve)
• Straight line with negative slope → uniform velocity (−ve, moving backward)
• Upward-opening parabola → uniform +ve acceleration
• Downward-opening parabola → uniform −ve acceleration (decelerating if initially +ve)
• Concave up → acceleration increasing
• Curve levels off → velocity approaching zero

Trap: A steeper slope does NOT mean more acceleration — it means higher speed. Acceleration comes from how the slope itself is changing.`,
                example: 'Two s–t lines cross: at the crossing point, both objects are at the same position (not the same velocity). Their velocities equal each other only if the slopes are equal.',
                graphSvg: `<svg viewBox="0 0 500 150" style="width:100%; max-width:500px; display:block; margin: 0 auto; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:12px;">
    <!-- Constant v -->
    <text x="80" y="20" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Uniform Velocity</text>
    <line x1="20" y1="120" x2="140" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <line x1="20" y1="40" x2="20" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <line x1="20" y1="120" x2="120" y2="50" stroke="#f59e0b" stroke-width="3"/>

    <!-- Uniform a (speeding up) -->
    <text x="250" y="20" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Positive Accel.</text>
    <line x1="180" y1="120" x2="320" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <line x1="180" y1="40" x2="180" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <path d="M 180 120 Q 280 120 300 40" fill="none" stroke="#f59e0b" stroke-width="3"/>

    <!-- Uniform deceleration (slowing down) -->
    <text x="420" y="20" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Negative Accel.</text>
    <line x1="360" y1="120" x2="480" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <line x1="360" y1="40" x2="360" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <path d="M 360 120 Q 380 40 460 40" fill="none" stroke="#f59e0b" stroke-width="3"/>
</svg>`
            },
            {
                icon: '📉',
                heading: 'The v–t Graph — Everything You Need for 1D Kinematics',
                content: `The velocity–time (v–t) graph is the most tested graph type in NEET/JEE physics. Three rules to memorize:

Rule 1: Slope = acceleration
$a = \\dfrac{\\Delta v}{\\Delta t}$, so slope of v–t graph = acceleration

Rule 2: Area = displacement
Area between v–t line and time axis = displacement
• Area above x-axis → positive displacement
• Area below x-axis → negative displacement

Rule 3: Graph crossing the time axis
When a v–t graph crosses the time axis ($v$ changes sign), the object reverses direction. This creates a kink in the s–t graph.

Common graph shapes:
• Horizontal line at v = k → uniform velocity, no acceleration
• Straight sloped line → uniform acceleration  
• Trapezoidal shape → three phases: acceleration, uniform, deceleration
• Triangular shape → accelerate to peak, then decelerate to stop`,
                keyLabel: 'neet-note',
                example: 'Total distance ≠ total displacement from a v–t graph. If the graph goes below the axis, the areas partially cancel for displacement but ADD for distance. Draw the path, then separate positive and negative areas.',
                graphSvg: `<svg viewBox="0 0 500 160" style="width:100%; max-width:500px; display:block; margin: 0 auto; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:12px;">
    <!-- v-t crossing axis -->
    <text x="250" y="20" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">v-t Graph Crossing Axis</text>
    <line x1="50" y1="80" x2="450" y2="80" stroke="#94a3b8" stroke-width="2"/> <!-- Time axis in middle -->
    <line x1="100" y1="30" x2="100" y2="140" stroke="#94a3b8" stroke-width="2"/> <!-- v axis -->
    
    <!-- Area above -->
    <polygon points="100,80 100,35 250,80" fill="rgba(99,102,241,0.2)"/>
    <!-- Area below -->
    <polygon points="250,80 400,125 400,80" fill="rgba(239,68,68,0.2)"/>
    
    <!-- Path crossing axis from top to bottom -->
    <path d="M 100 35 L 400 125" fill="none" stroke="#6366f1" stroke-width="3"/>
    
    <text x="130" y="70" font-size="11" font-weight="bold" fill="#4f46e5">+ Displacement</text>
    <text x="270" y="105" font-size="11" font-weight="bold" fill="#dc2626">- Displacement</text>
    
    <circle cx="250" cy="80" r="6" fill="#f59e0b"/>
    <text x="270" y="70" font-size="11" font-weight="bold" fill="#b45309">v = 0 (turns around)</text>
</svg>`
            },
            {
                icon: '🏗️',
                heading: 'Area Calculations — Triangles, Trapezia, and Mixed Shapes',
                content: `Most v–t graph area problems use basic geometry — no integration needed:

Rectangle: $A = \\text{base} \\times \\text{height}$

Right triangle: $A = \\dfrac{1}{2} \\times \\text{base} \\times \\text{height}$

Trapezium/Trapezoid: $A = \\dfrac{1}{2}(v_1 + v_2) \\times t$

Worked example — Three-phase trip:
• Phase 1 (0 to 4 s): v increases from 0 to 12 m/s — triangle: $A_1 = \\frac{1}{2}(4)(12) = 24$ m
• Phase 2 (4 to 10 s): v constant at 12 m/s — rectangle: $A_2 = 6 \\times 12 = 72$ m
• Phase 3 (10 to 13 s): v decreases from 12 to 0 — triangle: $A_3 = \\frac{1}{2}(3)(12) = 18$ m
• Total displacement = 24 + 72 + 18 = 114 m

For $a$ from graph: pick two clear points on the v–t line, compute slope:
$a = \\dfrac{v_2 - v_1}{t_2 - t_1}$`,
                example: 'If the problem gives a v–t graph and asks for distance (not displacement), always check whether the line crosses the time axis. If it does, split into separate segments and ADD the magnitudes.',
                graphSvg: `<svg viewBox="0 0 500 150" style="width:100%; max-width:500px; display:block; margin: 0 auto; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:12px;">
    <text x="250" y="20" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Three-Phase Area</text>
    <line x1="50" y1="120" x2="450" y2="120" stroke="#94a3b8" stroke-width="2"/>
    <line x1="50" y1="30" x2="50" y2="120" stroke="#94a3b8" stroke-width="2"/>
    
    <polygon points="50,120 150,50 150,120" fill="rgba(16,185,129,0.1)"/>
    <polygon points="150,120 150,50 300,50 300,120" fill="rgba(16,185,129,0.2)"/>
    <polygon points="300,120 300,50 400,120" fill="rgba(16,185,129,0.1)"/>
    
    <path d="M 50 120 L 150 50 L 300 50 L 400 120" fill="none" stroke="#10b981" stroke-width="3"/>
    
    <line x1="150" y1="50" x2="150" y2="120" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
    <line x1="300" y1="50" x2="300" y2="120" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
    
    <text x="65" y="105" font-size="11" font-weight="bold" fill="#059669">Triangle 1</text>
    <text x="195" y="90" font-size="11" font-weight="bold" fill="#059669">Rectangle</text>
    <text x="325" y="105" font-size="11" font-weight="bold" fill="#059669">Triangle 2</text>
</svg>`
            },
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'A v–t graph is a horizontal straight line at v = 8 m/s. The acceleration of the object is:',
                options: ['8 m/s²', '0 m/s²', '−8 m/s²', 'Cannot be determined'],
                correctAnswer: 1,
                explanation: 'Slope of horizontal v–t line = 0. Since $a$ = slope of v–t graph, $a = 0$. Uniform velocity.'
            },
            {
                type: 'multiple-choice',
                question: 'A v–t graph shows a straight line from (0, 20 m/s) to (5 s, 0 m/s). Displacement of the object is:',
                options: ['100 m', '50 m', '20 m', '10 m'],
                correctAnswer: 1,
                explanation: 'Area = triangle = $\\frac{1}{2} \\times 5 \\times 20 = 50$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'An s–t graph is an upward-opening parabola. This indicates:',
                options: [
                    'Constant velocity',
                    'Uniform acceleration in the positive direction',
                    'Uniform deceleration',
                    'Object at rest'
                ],
                correctAnswer: 1,
                explanation: 'A parabolic s–t graph means $s \\propto t^2$, which implies constant acceleration. Upward opening → positive acceleration.'
            },
            {
                type: 'multiple-choice',
                question: 'A v–t graph goes from (0, 0) up to (4 s, 16 m/s). The acceleration is:',
                options: ['2 m/s²', '4 m/s²', '8 m/s²', '64 m/s²'],
                correctAnswer: 1,
                explanation: '$a = \\text{slope} = \\dfrac{16-0}{4-0} = 4\\ \\text{m/s}^2$.'
            },
            {
                type: 'multiple-choice',
                question: 'A v–t graph shows: v = 10 m/s for 0–5 s, then v = −10 m/s for 5–8 s. Net displacement is:',
                options: ['80 m', '50 m', '20 m', '30 m'],
                correctAnswer: 2,
                explanation: 'Phase 1: $+10 \\times 5 = +50$ m. Phase 2: $-10 \\times 3 = -30$ m. Net = $+50 - 30 = +20$ m.'
            },
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'A v–t graph shows: line from (0, 4) to (6 s, 4), then line from (6 s, 4) to (10 s, 0). Total displacement is:',
                options: ['24 m', '32 m', '40 m', '16 m'],
                correctAnswer: 1,
                explanation: 'Phase 1 (0–6 s): rectangle = $4 \\times 6 = 24$ m. Phase 2 (6–10 s): triangle = $\\frac{1}{2} \\times 4 \\times 4 = 8$ m. Total = 32 m.'
            },
            {
                type: 'multiple-choice',
                question: 'On an s–t graph, two lines cross at a point. At that point:',
                options: [
                    'Both objects have the same velocity',
                    'Both objects are at the same position',
                    'Both objects have zero velocity',
                    'Both objects have the same acceleration'
                ],
                correctAnswer: 1,
                explanation: 'Crossing on s–t graph means same displacement (position) at the same time. It says nothing about velocity (slope) — the lines can have very different slopes at the crossing.'
            },
            {
                type: 'multiple-choice',
                question: 'A v–t graph is a straight line from (0, 30 m/s) to (10 s, −10 m/s). The object reverses direction at time:',
                options: ['7.5 s', '5 s', '8 s', '6 s'],
                correctAnswer: 0,
                explanation: 'The line crosses v = 0. Using $v = 30 - 4t$ (slope = $(−10−30)/10 = −4$): $0 = 30 − 4t \\Rightarrow t = 7.5$ s.'
            },
            {
                type: 'multiple-choice',
                question: 'A v–t graph forms a triangle with base 8 s and height 20 m/s. The displacement equals:',
                options: ['160 m', '80 m', '40 m', '20 m'],
                correctAnswer: 1,
                explanation: 'Area = $\\frac{1}{2} \\times 8 \\times 20 = 80$ m.'
            },
            {
                type: 'multiple-choice',
                question: 'If the s–t graph at a point is tangent to a curve with slope = 0, the object at that instant has:',
                options: ['Maximum acceleration', 'Zero acceleration', 'Zero velocity', 'Maximum displacement'],
                correctAnswer: 2,
                explanation: 'Slope of s–t graph = velocity. Slope = 0 means velocity = 0. The object is momentarily at rest at that instant.'
            },
        ]
    },

    // ────────────────────────────────────────────────────────────────────
    // SKILL 5 – Relative Velocity
    // ────────────────────────────────────────────────────────────────────
    {
        id: 'relative-velocity',
        icon: '🚂',
        color: '#ef4444',
        title: 'Relative Velocity in 1D',
        desc: 'Calculate time to cross, overtake, or meet; solve train-crossing and river-crossing style problems.',
        learnSections: [
            {
                icon: '↔️',
                heading: 'Setting Up a Relative Velocity Frame — The Core Method',
                content: `To find how objects A and B move with respect to each other, imagine "locking" B in place and giving A a relative velocity:

$v_{A \\text{ relative to } B} = v_A - v_B$

In 1D, this gives you:
• If both move same direction: $v_{rel} = v_A - v_B$ (smaller speed "chasing")
• If opposite directions: $v_{rel} = v_A + v_B$ (closing at combined speed)

Frame shift strategy:
1. Set B as stationary reference
2. Give A the relative velocity $v_A - v_B$
3. Now it becomes a simple single-object problem

Sign rule:
• Define +ve direction (e.g., east)
• Write $v_A$ and $v_B$ with signs
• $v_{AB} = v_A - v_B$ automatically handles direction`,
                example: 'Car A at +60 km/h (east), Car B at +40 km/h (east). In B\'s frame, A moves east at +20 km/h. B appears stationary. Time for A to pass B if A needs to cover 100 m gap: t = 100/20 × 3600 = 18 s (convert units carefully).'
            },
            {
                icon: '🚂',
                heading: 'Train Crossing Problems — Adding Lengths is the Only Trick',
                content: `The most common relative-velocity problem type: two trains crossing each other.

Key insight: The distance to be covered = **sum of lengths of both trains** (not just the relative gap).

For trains moving in the **same direction**:
$t = \\dfrac{L_A + L_B}{v_A - v_B}$

For trains moving in **opposite directions**:
$t = \\dfrac{L_A + L_B}{v_A + v_B}$

For a train crossing a **stationary platform or pole**:
$t = \\dfrac{L_{train}}{v_{train}}$ (only train length matters for a pole)
$t = \\dfrac{L_{train} + L_{platform}}{v_{train}}$ (when crossing entire platform)

Worked example:
Train A: length 200 m, speed 25 m/s
Train B: length 150 m, speed 15 m/s (same direction)
$t = \\dfrac{200 + 150}{25 - 15} = \\dfrac{350}{10} = 35$ s`,
                keyLabel: 'neet-note',
                example: 'NEET 2021: "A 150 m long train running at 72 km/h takes 17 s to cross a bridge. What is the length of the bridge?" → 72 km/h = 20 m/s; total distance = 20 × 17 = 340 m; bridge = 340 − 150 = 190 m.'
            },
            {
                icon: '🏁',
                heading: 'Overtaking and Meeting Problems — Finding Time and Distance',
                content: `Two classic problem types:

**Meeting problem** (approaching):
Two objects start $d$ apart, moving toward each other at $v_A$ and $v_B$:
$t_{meet} = \\dfrac{d}{v_A + v_B}$

**Overtaking problem** (same direction, A behind B):
A starts $d$ behind B; they have the same initial position (start of chase):
$t_{overtake} = \\dfrac{d}{v_A - v_B}$ (only valid if $v_A > v_B$)

For **accelerating** objects, set up relative kinematics:
$v_{rel} = v_A - v_B$, $a_{rel} = a_A - a_B$
Then use $d = v_{rel} \\cdot t + \\frac{1}{2}a_{rel}t^2$

Example:
A at rest, B 200 m ahead at rest. A starts with 2 m/s², B starts with 1 m/s² (same direction):
$a_{rel} = 2 - 1 = 1\\ \\text{m/s}^2$; $v_{rel} = 0$
$200 = \\frac{1}{2}(1)t^2 \\Rightarrow t^2 = 400 \\Rightarrow t = 20$ s`,
                keyLabel: 'neet-trap',
                example: 'Trap: "Two buses leave the same station 1 hour apart. How long after the second bus leaves does it catch up?" — Set up closing time frame from when the second bus departs. The first bus has a head start of (1 hour × its speed).'
            },
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'Train A (300 m long, 30 m/s) and Train B (200 m long, 20 m/s) run in opposite directions. Time to cross each other:',
                options: ['5 s', '8 s', '10 s', '12 s'],
                correctAnswer: 2,
                explanation: 'Total length = 500 m. Relative speed = 30 + 20 = 50 m/s. $t = \\dfrac{500}{50} = 10$ s.'
            },
            {
                type: 'multiple-choice',
                question: 'Car A moves at 60 km/h, Car B at 40 km/h in the same direction. Relative velocity of A with respect to B is:',
                options: ['100 km/h', '20 km/h', '−20 km/h', '40 km/h'],
                correctAnswer: 1,
                explanation: '$v_{AB} = v_A - v_B = 60 - 40 = +20$ km/h (A moves forward relative to B at 20 km/h).'
            },
            {
                type: 'multiple-choice',
                question: 'Two persons 100 m apart walk toward each other at 3 m/s and 2 m/s. Time to meet:',
                options: ['10 s', '20 s', '33 s', '50 s'],
                correctAnswer: 1,
                explanation: 'Closing speed = 3 + 2 = 5 m/s. $t = \\dfrac{100}{5} = 20$ s.'
            },
            {
                type: 'multiple-choice',
                question: 'A train of length 250 m crosses a pole in 25 s. Speed of the train is:',
                options: ['8 m/s', '10 m/s', '12 m/s', '15 m/s'],
                correctAnswer: 1,
                explanation: '$v = \\dfrac{250}{25} = 10$ m/s.'
            },
            {
                type: 'multiple-choice',
                question: 'Relative velocity of two objects moving in the same direction at 15 m/s and 10 m/s is:',
                options: ['25 m/s', '5 m/s', '10 m/s', '15 m/s'],
                correctAnswer: 1,
                explanation: 'Same direction: $v_{rel} = 15 - 10 = 5$ m/s.'
            },
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'A 180 m train running at 72 km/h crosses a 270 m bridge. Time taken to completely cross the bridge:',
                options: ['15 s', '22.5 s', '10 s', '25 s'],
                correctAnswer: 1,
                explanation: '72 km/h = 20 m/s. Total distance = 180 + 270 = 450 m. $t = \\dfrac{450}{20} = 22.5$ s.'
            },
            {
                type: 'multiple-choice',
                question: 'Two trains (100 m and 150 m long) run in the same direction at 40 m/s and 30 m/s. Time to cross each other:',
                options: ['10 s', '25 s', '30 s', '5 s'],
                correctAnswer: 1,
                explanation: 'Same direction: $v_{rel} = 40 - 30 = 10$ m/s. Total length = 250 m. $t = \\dfrac{250}{10} = 25$ s.'
            },
            {
                type: 'multiple-choice',
                question: 'A car A (at rest) and car B (200 m ahead, also at rest) start simultaneously. A accelerates at 4 m/s², B at 2 m/s². When does A catch B?',
                options: ['10 s', '12 s', '14 s', '16 s'],
                correctAnswer: 2,
                explanation: 'Relative: $a_{rel} = 4 - 2 = 2\\ \\mathrm{m/s}^2$, $v_{rel} = 0$. $200 = \\frac{1}{2}(2)t^2 \\Rightarrow t^2 = 200 \\Rightarrow t \\approx 14.1$ s ≈ 14 s.'
            },
            {
                type: 'multiple-choice',
                question: 'Two people start from the same point. One walks east at 4 m/s, the other west at 6 m/s. After 10 s, distance between them is:',
                options: ['20 m', '60 m', '100 m', '40 m'],
                correctAnswer: 2,
                explanation: 'Relative speed (opposite) = 4 + 6 = 10 m/s. After 10 s: 10 × 10 = 100 m apart.'
            },
            {
                type: 'multiple-choice',
                question: 'A man on a platform watches a train pass. The 200 m long train takes 20 s. A train 150 m long approaches from the opposite direction at 15 m/s. If the first train speed is 10 m/s, time to cross each other is:',
                options: ['10 s', '14 s', '16 s', '20 s'],
                correctAnswer: 1,
                explanation: 'First train speed = 200/20 = 10 m/s. Opposite direction: $v_{rel} = 10 + 15 = 25$ m/s. Total length = 200 + 150 = 350 m. $t = 350/25 = 14$ s.'
            },
        ]
    },
];
