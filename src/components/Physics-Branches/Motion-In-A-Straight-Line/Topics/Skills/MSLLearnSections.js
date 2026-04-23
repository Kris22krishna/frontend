export const mslLearnSections = [
    // SKILL 1 – Distance vs Displacement
    [
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
        }
    ],
    // SKILL 2 – Speed, Velocity & Acceleration
    [
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
        }
    ],
    // SKILL 3 – Kinematic Equations
    [
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
        }
    ],
    // SKILL 4 – Motion Graphs
    [
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
        }
    ],
    // SKILL 5 – Relative Velocity
    [
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
        }
    ]
];
