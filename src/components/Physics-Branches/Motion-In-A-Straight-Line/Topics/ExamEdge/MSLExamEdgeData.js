// MSL Exam Edge Data — all formulae use $...$ LaTeX for MathRenderer

export const mslExamEdgeData = [
    {
        id: 'jee-mains',
        exam: 'JEE Mains',
        color: '#ef4444',
        weightage: '2',
        marks: '8',
        difficulty: 'Medium–High',
        focus: 'JEE Mains tests 1D kinematics primarily through velocity-time graph problems and relative velocity. Expect at least one question requiring you to find displacement from a v-t graph by calculating areas of triangles/trapezoids. Sign convention errors and relative velocity for trains/boats are the most common traps.',
        pyqs: [
            {
                year: 2023,
                question: 'A particle starts from rest and moves with acceleration $a = 2t$ m/s². Find the displacement in the first 3 seconds.',
                answer: 'Here $a$ is NOT constant, so kinematic equations don\'t directly apply. Use integration: $v = \\int a\\,dt = \\int 2t\\,dt = t^2$. Then $s = \\int v\\,dt = \\int t^2\\,dt = \\dfrac{t^3}{3}$. At $t = 3$ s: $s = \\dfrac{27}{3} = 9$ m.',
            },
            {
                year: 2022,
                question: 'A car decelerates uniformly from 72 km/h and travels 80 m before stopping. Find the deceleration.',
                answer: 'Convert: $u = 72$ km/h $= 20$ m/s; $v = 0$; $s = 80$ m. Use $v^2 = u^2 + 2as$: $0 = 400 + 2a(80)$ ⟹ $a = -\\dfrac{400}{160} = -2.5$ m/s². Deceleration $= 2.5$ m/s².',
            },
            {
                year: 2022,
                question: 'Two trains approach each other at 60 km/h and 90 km/h on parallel tracks. Initial separation is 1.5 km. After how many seconds do they meet?',
                answer: 'Relative speed $= 60 + 90 = 150$ km/h (approaching ⟹ add speeds). Time $= \\dfrac{1.5}{150}$ h $= 0.01$ h $= 36$ s.',
            },
        ],
    },
    {
        id: 'jee-advanced',
        exam: 'JEE Advanced',
        color: '#6366f1',
        weightage: '2',
        marks: '12',
        difficulty: 'High',
        focus: 'JEE Advanced combines kinematics with forces or graphs with multi-region motion. You must integrate non-uniform acceleration and switch between piecewise uniform regions. Variable acceleration (a as a function of v or x) requires calculus. Integer-type and paragraph-type kinematics problems are common.',
        pyqs: [
            {
                year: 2023,
                question: 'A particle moves in 1D. Its velocity varies as $v = \\alpha\\sqrt{x}$ where $\\alpha$ is a constant. Find the acceleration as a function of $x$.',
                answer: '$a = v\\,\\dfrac{dv}{dx}$. Given $v = \\alpha\\sqrt{x}$: $\\dfrac{dv}{dx} = \\dfrac{\\alpha}{2\\sqrt{x}}$. So $a = \\alpha\\sqrt{x}\\cdot\\dfrac{\\alpha}{2\\sqrt{x}} = \\dfrac{\\alpha^2}{2}$. Acceleration is CONSTANT ($= \\dfrac{\\alpha^2}{2}$) even though $v(x)$ looks complicated.',
            },
            {
                year: 2020,
                question: 'A rocket is launched vertically. In the first 10 s, acceleration is 4 m/s² upward. The motor then cuts off. Find the maximum height. ($g = 10$ m/s²)',
                answer: 'Phase 1 (0–10 s): $u_1 = 0$, $a_1 = 4$ m/s². $v_1 = 4(10) = 40$ m/s; $s_1 = \\frac{1}{2}(4)(100) = 200$ m. Phase 2 (motor off): $u_2 = 40$ m/s, $a_2 = -10$ m/s². Extra height: $s_2 = \\dfrac{v_1^2}{2g} = \\dfrac{1600}{20} = 80$ m. Max height $= 200 + 80 = 280$ m.',
            },
        ],
    },
    {
        id: 'neet',
        exam: 'NEET',
        color: '#10b981',
        weightage: '2',
        marks: '8',
        difficulty: 'Medium',
        focus: 'NEET focuses on conceptual MCQs — distinguishing distance from displacement, average speed vs. average velocity, and applying the three kinematic equations. Free-fall problems (ball thrown up/dropped) are the most frequently tested. v-t graph interpretation (finding displacement as area, acceleration as slope) appears annually.',
        pyqs: [
            {
                year: 2023,
                question: 'A ball is thrown upward with $u = 40$ m/s. After how many seconds does its velocity become zero? ($g = 10$ m/s²)',
                answer: 'At maximum height, $v = 0$. Using $v = u + at$: $0 = 40 - 10t$ ⟹ $t = 4$ s. By symmetry, total flight time $= 8$ s.',
            },
            {
                year: 2022,
                question: 'The slope of a displacement-time graph gives:',
                answer: 'The slope of an $s$-$t$ graph $= \\dfrac{\\Delta s}{\\Delta t} =$ velocity. For a straight $s$-$t$ graph this is average (constant) velocity; a tangent at any point gives instantaneous velocity.',
            },
            {
                year: 2021,
                question: 'A body starts from rest with acceleration 5 m/s². What is its velocity after travelling 80 m?',
                answer: 'Use $v^2 = u^2 + 2as$: $v^2 = 0 + 2(5)(80) = 800$. $v = \\sqrt{800} = 20\\sqrt{2} \\approx 28.3$ m/s.',
            },
        ],
    },
];

export const mslFormulaSheet = [
    { quantity: 'Displacement',        formula: '$s = x_f - x_i$',                         unit: 'm' },
    { quantity: 'Average Velocity',    formula: '$\\bar{v} = \\dfrac{\\Delta s}{\\Delta t}$',  unit: 'm/s' },
    { quantity: 'Average Speed',       formula: '$\\text{speed} = \\dfrac{d_{\\text{total}}}{\\Delta t}$', unit: 'm/s' },
    { quantity: 'Acceleration',        formula: '$a = \\dfrac{\\Delta v}{\\Delta t}$',          unit: 'm/s²' },
    { quantity: 'Kinematic Eq. 1',     formula: '$v = u + at$',                               unit: '—' },
    { quantity: 'Kinematic Eq. 2',     formula: '$s = ut + \\dfrac{1}{2}at^2$',               unit: 'm' },
    { quantity: 'Kinematic Eq. 3',     formula: '$v^2 = u^2 + 2as$',                          unit: '—' },
    { quantity: 'Avg Vel (uniform a)', formula: '$\\bar{v} = \\dfrac{u + v}{2}$',             unit: 'm/s' },
    { quantity: 'Free-fall velocity',  formula: '$v = gt$ (from rest, downward +ve)',          unit: 'm/s' },
    { quantity: 'Free-fall distance',  formula: '$h = \\dfrac{1}{2}gt^2$',                    unit: 'm' },
    { quantity: 'Max height (throw)',  formula: '$H = \\dfrac{u^2}{2g}$',                     unit: 'm' },
    { quantity: 'Time to max height', formula: '$T = \\dfrac{u}{g}$',                         unit: 's' },
    { quantity: 'Relative Velocity',   formula: '$v_{AB} = v_A - v_B$',                       unit: 'm/s' },
];

export const mslQuickRevision = [
    {
        icon: '📏',
        title: 'Scalars vs Vectors',
        points: [
            'Scalar: distance, speed, time — magnitude only.',
            'Vector: displacement, velocity, acceleration — magnitude + direction.',
            'Speed $= |\\text{velocity}|$; distance is never less than $|\\text{displacement}|$.',
        ],
    },
    {
        icon: '📐',
        title: 'Three Kinematic Equations',
        points: [
            '$v = u + at$ → missing $s$',
            '$s = ut + \\frac{1}{2}at^2$ → missing $v$',
            '$v^2 = u^2 + 2as$ → missing $t$',
            'All require CONSTANT acceleration!',
        ],
    },
    {
        icon: '📊',
        title: 'Graph Interpretation',
        points: [
            '$s$-$t$: slope = velocity. Curved → accelerating. Straight → constant $v$.',
            '$v$-$t$: slope = acceleration. Area = displacement.',
            '$a$-$t$: area = change in velocity ($\\Delta v$).',
            'Negative slope on $v$-$t$ = deceleration.',
        ],
    },
    {
        icon: '🍎',
        title: 'Free Fall Key Points',
        points: [
            '$a = g \\approx 10$ m/s² (downward, always).',
            'Body dropped: $u = 0$, $s = \\frac{1}{2}gt^2$.',
            'Body thrown up: $v = 0$ at top; time up = time down.',
            '$v$ at ground (dropped from $H$) $= \\sqrt{2gH}$.',
        ],
    },
    {
        icon: '🚂',
        title: 'Relative Velocity Rules',
        points: [
            'Same direction: $v_{\\text{rel}} = |v_A - v_B|$.',
            'Opposite directions: $v_{\\text{rel}} = v_A + v_B$.',
            '$v_{BA} = -v_{AB}$ (reverse observer).',
            'Key for trains, boats, and overtaking problems.',
        ],
    },
    {
        icon: '⚠️',
        title: 'Common Traps',
        points: [
            'Distance $\\neq |\\text{displacement}|$ unless path is straight + unidirectional.',
            'Average velocity $= 0$ does NOT mean speed $= 0$.',
            'Retardation is NOT negative speed — it\'s negative acceleration.',
            '$g$ acts even when $v = 0$ (at the top of a throw).',
        ],
    },
];
