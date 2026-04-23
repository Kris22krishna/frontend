// MSL Terminology Data – follows WEP TerminologyData pattern
// Terms cover DEFINITIONS only. Skills section handles problem-solving.

export const TERMS = [
    {
        name: 'Frame of Reference',
        color: '#6366f1',
        icon: '🗺️',
        def: 'A coordinate system with a fixed origin used to measure the position and motion of objects. Physics laws can be described from any frame, but once chosen, it must remain consistent throughout a problem.',
        examples: [
            'Ground frame: a stationary observer watching a car drive past.',
            'Train frame: a passenger inside a moving train — the platform appears to move backward.',
        ],
        inUse: 'Choosing the ground frame simplifies most NEET/JEE problems. Relative-velocity problems require you to explicitly switch frames.',
        memory: 'Frame = your camera position. Change the camera, and the story changes — but the physics does not.'
    },
    {
        name: 'Distance',
        color: '#0d9488',
        icon: '📏',
        def: 'The total length of the actual path travelled by an object, regardless of direction. Distance is a **scalar** — it has only magnitude and is always $\\geq 0$. It never decreases as long as the object moves.',
        examples: [
            'A car drives 4 km east then 3 km west. Distance = 4 + 3 = 7 km.',
            'An odometer reading increases from 1200 km to 1260 km: distance = 60 km.',
        ],
        inUse: 'Average speed = total distance ÷ total time (always $\\geq 0$).',
        memory: 'Distance = what the odometer reads — it only goes up, never down.'
    },
    {
        name: 'Displacement',
        color: '#f59e0b',
        icon: '➡️',
        def: 'The shortest straight-line vector from the **initial position** to the **final position**, with a defined direction. Displacement is a **vector** — it can be positive (forward), negative (backward), or zero (returned to start). $s = x_{\\text{final}} - x_{\\text{initial}}$',
        examples: [
            'Walk 4 km east then 3 km west. Displacement = $+4 - 3 = +1$ km (east).',
            'Complete one full lap of a circular track. Displacement = 0 (same start and finish).',
        ],
        inUse: 'Average velocity = total displacement ÷ total time (can be zero or negative).',
        memory: 'Displacement = how a crow flies — straight from start to finish, with direction.'
    },
    {
        name: 'Speed',
        color: '#ec4899',
        icon: '🏎️',
        def: 'The rate at which an object covers **distance**. Speed is a **scalar** — it has no direction and is always $\\geq 0$. $\\text{Average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}$. Instantaneous speed = magnitude of instantaneous velocity.',
        examples: [
            'Car travels 120 km in 2 h: average speed = 60 km/h.',
            'A sprinter\'s peak speed is 12.4 m/s (44.6 km/h).',
        ],
        inUse: 'Speedometers display instantaneous speed (magnitude of velocity, with no sense of direction).',
        memory: 'Speed = what the speedometer shows — just a number, no arrow.'
    },
    {
        name: 'Velocity',
        color: '#3b82f6',
        icon: '🎯',
        def: 'The rate of change of **displacement** with respect to time. Velocity is a **vector** — it carries both magnitude and direction. $v_{\\text{avg}} = \\dfrac{\\Delta s}{\\Delta t}$. Instantaneous velocity $= \\dfrac{ds}{dt}$.',
        examples: [
            'Walk 10 m east in 5 s: velocity = $+2$ m/s.',
            'Walk 10 m east then 10 m west in 10 s: displacement = 0, so average velocity = 0 m/s.',
        ],
        inUse: 'If average velocity = 0, it means net displacement is zero — NOT that the object was stationary.',
        memory: 'Velocity = speed with a GPS arrow attached — direction matters!'
    },
    {
        name: 'Acceleration',
        color: '#7c3aed',
        icon: '⚡',
        def: 'The rate of change of **velocity** with respect to time. Acceleration is a **vector** — it can be positive (speeds up in +ve direction), negative (slows down in +ve direction, also called **retardation**), or zero. $a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{v - u}{t}$',
        examples: [
            'Car goes from rest to 20 m/s in 5 s: $a = \\dfrac{20-0}{5} = +4\\ \\text{m/s}^2$.',
            'Ball thrown upward at the highest point: $v = 0$, but $a = -g = -10\\ \\text{m/s}^2$ (still acting downward!).',
        ],
        inUse: 'Acceleration = 0 does NOT mean the object is at rest. It means velocity is constant.',
        memory: 'Acceleration = how fast your velocity arrow changes — not just how fast you move.'
    },
    {
        name: 'Uniform Acceleration',
        color: '#10b981',
        icon: '📐',
        def: 'Motion in which the acceleration remains constant in both magnitude and direction throughout. This is the only condition under which the three standard kinematic equations $v = u+at$, $s = ut + \\dfrac{1}{2}at^2$, and $v^2 = u^2 + 2as$ are valid.',
        examples: [
            'Free fall (ignoring air resistance): $a = g = 9.8\\ \\text{m/s}^2$ downward — constant.',
            'A car braking uniformly from 30 m/s to rest over 60 m.',
        ],
        inUse: 'For uniform acceleration only: $v_{\\text{avg}} = \\dfrac{u + v}{2}$. This formula does NOT hold for non-uniform acceleration.',
        memory: 'When $a$ = constant, the three kinematic equations are your best friends.',
        graphSvg: `<svg viewBox="0 0 300 120" style="width:100%; max-width:400px; display:block; margin: 0 auto 20px; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:16px;">
            <text x="5" y="15" font-size="12" font-weight="bold" fill="#0f172a">v-t Graph (Uniform a)</text>
            <line x1="20" y1="100" x2="280" y2="100" stroke="#94a3b8" stroke-width="2"/>
            <line x1="20" y1="30" x2="20" y2="100" stroke="#94a3b8" stroke-width="2"/>
            <line x1="20" y1="90" x2="240" y2="40" stroke="#10b981" stroke-width="3"/>
            <text x="140" y="55" font-size="11" font-weight="bold" fill="#10b981" transform="rotate(-12 140,55)">Constant Slope</text>
        </svg>`
    },
    {
        name: 'Free Fall',
        color: '#ef4444',
        icon: '🍎',
        def: 'Motion of a body under gravity alone (no air resistance). The acceleration equals $g = 9.8\\ \\text{m/s}^2 \\approx 10\\ \\text{m/s}^2$ directed **downward**, regardless of the object\'s mass, shape, or initial velocity. Both upward-thrown and freely dropped bodies experience free fall.',
        examples: [
            'Dropped from rest ($u=0$): after $t$ seconds, $v = gt$ and $h = \\dfrac{1}{2}gt^2$.',
            'Thrown upward at $u$ m/s: time to top = $\\dfrac{u}{g}$; maximum height $= \\dfrac{u^2}{2g}$.',
        ],
        inUse: 'At the highest point of an upward throw: velocity = 0, but acceleration = $g$ downward (always!).',
        memory: 'Gravity never switches off — even when $v = 0$ at the top, $a = g$ is still acting.',
        graphSvg: `<svg viewBox="0 0 300 120" style="width:100%; max-width:400px; display:block; margin: 0 auto 20px; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:16px;">
            <text x="5" y="15" font-size="12" font-weight="bold" fill="#0f172a">Free Fall Path</text>
            <path d="M 80 100 Q 150 -40 220 100" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
            <circle cx="150" cy="30" r="5" fill="#ef4444"/>
            <text x="110" y="25" font-size="11" fill="#ef4444" font-weight="bold">v = 0 (top)</text>
            <line x1="150" y1="30" x2="150" y2="60" stroke="#0f172a" stroke-width="2"/>
            <polygon points="146,55 154,55 150,60" fill="#0f172a"/>
            <text x="160" y="50" font-size="12" font-weight="bold">a = g ↓</text>
        </svg>`
    },
    {
        name: 'Relative Velocity',
        color: '#0ea5e9',
        icon: '🚂',
        def: 'The velocity of object A as observed from object B\'s reference frame: $v_{AB} = v_A - v_B$. In 1D, this determines how quickly two objects approach, recede from, or match each other.',
        examples: [
            'Train A at $+60$ m/s, Train B at $+40$ m/s (same direction): $v_{AB} = 60 - 40 = +20$ m/s.',
            'Opposite directions: $v_{AB} = 60 - (-40) = 100$ m/s (approaching at combined speed).',
        ],
        inUse: 'Same direction → subtract speeds. Opposite directions → add speeds. This rule covers all 1D relative-velocity scenarios.',
        memory: '🚂 Same direction = subtract speeds. Head-on = add speeds.',
        graphSvg: `<svg viewBox="0 0 300 110" style="width:100%; max-width:400px; display:block; margin: 0 auto 20px; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:16px;">
            <!-- Train A -->
            <rect x="20" y="30" width="60" height="20" rx="4" fill="#0ea5e9"/>
            <text x="40" y="44" font-size="11" fill="#fff" font-weight="bold">A</text>
            <line x1="85" y1="40" x2="135" y2="40" stroke="#0ea5e9" stroke-width="2"/>
            <polygon points="130,36 130,44 135,40" fill="#0ea5e9"/>
            <text x="85" y="30" font-size="11" font-weight="bold" fill="#0ea5e9">40 m/s</text>
            
            <!-- Train B -->
            <rect x="220" y="70" width="60" height="20" rx="4" fill="#f59e0b"/>
            <text x="240" y="84" font-size="11" fill="#fff" font-weight="bold">B</text>
            <line x1="215" y1="80" x2="165" y2="80" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="170,76 170,84 165,80" fill="#f59e0b"/>
            <text x="175" y="70" font-size="11" font-weight="bold" fill="#f59e0b">30 m/s</text>
            
            <text x="150" y="15" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Closing speed = 70 m/s</text>
        </svg>`
    },
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Signs Before Equations',
        rule: 'Fix one direction as positive before writing any equation. Stick to it throughout.',
        emoji: '➕',
        color: '#6366f1',
        detail: 'Taking upward as positive: $g = -10\\ \\text{m/s}^2$ (downward). Taking downward as positive: $g = +10\\ \\text{m/s}^2$. Both give the same final answer — but mixing conventions mid-problem gives wrong answers.',
        examples: [
            'Ball thrown up at 20 m/s (upward = +ve): $u = +20$, $a = -10$. At top: $v = 0$, $t = 2$ s.',
            'Same ball (downward = +ve): $u = -20$, $a = +10$. At top: $v = 0$, $t = 2$ s. ✓ Same answer.',
        ],
        tip: 'Write "↑ = +ve" at the top of every free-fall problem. This one habit eliminates most sign errors.'
    },
    {
        num: 2,
        title: 'Know 3, Find 2',
        rule: 'Every kinematic problem involves 5 variables: u, v, a, s, t. You always know 3 and solve for the other 2.',
        emoji: '🔢',
        color: '#0d9488',
        detail: 'Select the equation that naturally contains your 3 known variables. The missing variable (the one NOT in your equation) is the one you do not need.\n• $v = u + at$ — does not contain $s$\n• $s = ut + \\dfrac{1}{2}at^2$ — does not contain $v$\n• $v^2 = u^2 + 2as$ — does not contain $t$',
        examples: [
            'Know u, a, s → want v: use $v^2 = u^2 + 2as$ (t not needed).',
            'Know u, a, t → want s: use $s = ut + \\dfrac{1}{2}at^2$ (v not needed).',
        ],
        tip: 'List u=?, v=?, a=?, s=?, t=? at the top of each solution. This forces you to organise before computing.'
    },
    {
        num: 3,
        title: 'Slope and Area on Motion Graphs',
        rule: 'Slope of s–t = velocity. Slope of v–t = acceleration. Area under v–t = displacement.',
        emoji: '📊',
        color: '#f59e0b',
        detail: 'These three rules let you extract every kinematic quantity directly from a graph without equations:\n• Steeper s–t slope → higher speed\n• Horizontal v–t line → zero acceleration (uniform motion)\n• v–t line crossing the time axis → object reverses direction\n• Area below the time axis on v–t → negative displacement (motion in −ve direction)',
        examples: [
            'v–t graph: triangle from (0,0) to (4 s, 20 m/s). Area = $\\frac{1}{2} \\times 4 \\times 20 = 40$ m displacement.',
            's–t graph: parabola opening upward → slope (velocity) increases → positive constant acceleration.',
        ],
        tip: 'JEE and NEET set v–t graph questions with shaded regions. Master area-of-trapezoid and area-of-triangle calculations.',
        graphSvg: `<svg viewBox="0 0 400 150" style="width:100%; max-width:400px; display:block; margin: 0 auto; background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:12px;">
            <!-- s-t graph -->
            <text x="40" y="20" font-size="13" font-weight="bold" fill="#0f172a">s-t Graph</text>
            <line x1="30" y1="120" x2="180" y2="120" stroke="#94a3b8" stroke-width="2"/>
            <line x1="30" y1="30" x2="30" y2="120" stroke="#94a3b8" stroke-width="2"/>
            <path d="M 30 120 Q 100 120 160 40" fill="none" stroke="#6366f1" stroke-width="3"/>
            <text x="100" y="90" font-size="11" transform="rotate(-30 100,90)" fill="#4f46e5" font-weight="bold">Slope = Velocity</text>

            <!-- v-t graph -->
            <text x="240" y="20" font-size="13" font-weight="bold" fill="#0f172a">v-t Graph</text>
            <line x1="220" y1="120" x2="380" y2="120" stroke="#94a3b8" stroke-width="2"/>
            <line x1="220" y1="30" x2="220" y2="120" stroke="#94a3b8" stroke-width="2"/>
            <path d="M 220 120 L 300 50 L 360 50" fill="none" stroke="#f59e0b" stroke-width="3"/>
            <polygon points="220,120 300,50 300,120" fill="rgba(245,158,11,0.2)"/>
            <text x="235" y="105" font-size="12" fill="#d97706" font-weight="bold">Area = Disp.</text>
            <text x="310" y="43" font-size="11" fill="#d97706" font-weight="bold">Slope = a</text>
        </svg>`
    },
    {
        num: 4,
        title: 'Free-Fall Symmetry',
        rule: 'For a body thrown upward, the time going up = the time coming down, and the speed on return equals the launch speed.',
        emoji: '🍎',
        color: '#10b981',
        detail: 'Under uniform gravity ($a = -g$), the motion above the launch point is perfectly symmetric:\n• Time to maximum height: $t_{up} = \\dfrac{u}{g}$\n• Maximum height: $H = \\dfrac{u^2}{2g}$\n• Total flight time: $T = \\dfrac{2u}{g}$\n• Speed when it returns to launch level: $v = u$ (same magnitude, opposite direction)',
        examples: [
            'Ball thrown up at 30 m/s ($g=10$): $H = \\dfrac{900}{20} = 45$ m; total time = 6 s.',
            'Ball dropped from $H$: impact speed $v = \\sqrt{2gH}$.',
        ],
        tip: 'At maximum height: velocity = 0, but acceleration = $g$ downward. Never say acceleration is zero at the top!'
    },
    {
        num: 5,
        title: 'Relative Velocity Direction Rule',
        rule: 'Same direction: $v_{rel} = |v_A - v_B|$. Opposite directions: $v_{rel} = v_A + v_B$.',
        emoji: '🚂',
        color: '#ef4444',
        detail: 'For two objects A and B moving in 1D:\n• Both moving east at different speeds → relative speed = difference\n• One moving east, one moving west → relative speed = sum\n• Time to close a gap $d$: $t = \\dfrac{d}{v_{rel}}$\n\nFor train-crossing problems always add the **lengths** of both trains (not just one).',
        examples: [
            'Train A (200 m, 20 m/s) overtakes Train B (100 m, 10 m/s): $t = \\dfrac{200+100}{20-10} = 30$ s.',
            'Two trains approach at 30 m/s and 20 m/s: closing speed = 50 m/s.',
        ],
        tip: 'Draw a velocity arrow for each object before applying the relative-velocity formula. Common error: forgetting to add train lengths.'
    },
];

export const VOCAB_QUIZ = [
    {
        question: 'A car travels 3 km east, then 4 km north. Its **displacement** magnitude is:',
        options: ['7 km', '5 km', '1 km', '12 km'],
        correct: 1,
        explanation: 'Displacement = straight-line distance from start to end = $\\sqrt{3^2 + 4^2} = 5$ km. Distance (path length) = 7 km. The two are different!'
    },
    {
        question: 'An object moves 20 m east and 20 m west in 10 s. Its average velocity is:',
        options: ['4 m/s east', '0 m/s', '2 m/s east', '4 m/s'],
        correct: 1,
        explanation: 'Net displacement = 20 − 20 = 0 m. Average velocity = $\\dfrac{\\Delta s}{\\Delta t} = \\dfrac{0}{10} = 0$ m/s. Average speed = $\\dfrac{40}{10} = 4$ m/s.'
    },
    {
        question: 'A ball at the top of its throw (momentarily at rest) has acceleration equal to:',
        options: ['0 m/s²', '$g$ upward', '$g$ downward', 'Cannot be determined'],
        correct: 2,
        explanation: 'Gravity never switches off. At the highest point, velocity = 0 but acceleration = $g = 10\\ \\text{m/s}^2$ downward — always.'
    },
    {
        question: 'The slope of a velocity–time graph gives:',
        options: ['Speed', 'Displacement', 'Acceleration', 'Distance'],
        correct: 2,
        explanation: 'Slope of v–t graph = $\\dfrac{\\Delta v}{\\Delta t}$ = acceleration. Area under v–t graph = displacement.'
    },
    {
        question: 'Train A moves east at 80 km/h; Train B moves west at 60 km/h. Their relative speed is:',
        options: ['20 km/h', '80 km/h', '140 km/h', '60 km/h'],
        correct: 2,
        explanation: 'Opposite directions → relative speed = $80 + 60 = 140$ km/h. They approach each other at 140 km/h.'
    },
    {
        question: 'Which kinematic equation is used when **time** is not given and not needed?',
        options: ['$v = u + at$', '$s = ut + \\frac{1}{2}at^2$', '$v^2 = u^2 + 2as$', '$v_{avg} = \\frac{u+v}{2}$'],
        correct: 2,
        explanation: '$v^2 = u^2 + 2as$ relates u, v, a, and s — it does not involve t. Perfect for stopping-distance and impact-speed problems.'
    },
];
