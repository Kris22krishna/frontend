export const SKILLS = [
    {
        id: 'work-calculation',
        title: 'Work Calculation',
        subtitle: 'Dot Product & Forces',
        desc: 'Master the calculation of work done by constant and variable forces using scalar products.',
        icon: '🛠️',
        color: '#6366f1',
        learn: {
            title: 'Definition of Work',
            content: `Work is done when a force produces a displacement in the body.
            
            1. Constant Force: $W = \\vec{F} \\cdot \\vec{d} = Fd\\cos\\theta$
            2. Variable Force: $W = \\int_{x_1}^{x_2} F(x) dx$
            
            Remember: Work is a SCALAR quantity, entirely dependent on the angle $\\theta$ between Force and Displacement vectors.`,
            rules: [
                '$\\theta = 0^\\circ \\implies$ Maximum positive work.',
                '$\\theta = 90^\\circ \\implies$ Zero work (e.g., centripetal force).',
                '$\\theta = 180^\\circ \\implies$ Maximum negative work (e.g., kinetic friction).'
            ],
            examples: [
                { q: 'Push a 10 kg box horizontally for 5 m with 50 N. Work?', a: 'Since $\\theta = 0^\\circ$, $W = 50 \\times 5 = 250$ J.' },
                { q: 'What is the work done by Earth\'s gravity on a satellite in circular orbit?', a: 'Zero. Gravity is perpendicular to the tangent path ($\\theta = 90^\\circ$).' }
            ]
        },
        practice: [
            // 5 Easy
            { question: 'What is the SI unit of Work?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], correct: 1, explanation: 'The SI unit of work and energy is the Joule ($1~\\text{J} = 1~\\text{N}\\cdot\\text{m}$).' },
            { question: 'A force of 10 N moves an object 2 m in the direction of the force. Work done?', options: ['20 J', '5 J', '0 J', '12 J'], correct: 0, explanation: '$W = Fd\\cos(0^\\circ) = 10 \\times 2 \\times 1 = 20$ J.' },
            { question: 'Work done by a force is zero if the angle between force and displacement is:', options: ['$0^{\\circ}$', '$45^{\\circ}$', '$90^{\\circ}$', '$180^{\\circ}$'], correct: 2, explanation: '$\\cos(90^\\circ) = 0$, hence $W = 0$.' },
            { question: 'A person holds a 20 kg suitcase on his head and stands still for 10 minutes. Work done by him is:', options: ['2000 J', '200 J', '196 J', 'Zero'], correct: 3, explanation: 'Displacement is zero, therefore work done is zero.' },
            { question: 'When a body is thrown upwards, work done by gravity is:', options: ['Positive', 'Negative', 'Zero', 'Cannot be determined'], correct: 1, explanation: 'Gravity acts downwards while displacement is upwards. $\\theta = 180^{\\circ}$, making it negative.' },
            // 5 Medium
            { question: 'A block is pulled 5 m at an angle of $60^{\\circ}$ with a force of 20 N. Work done?', options: ['100 J', '50 J', '86.6 J', '25 J'], correct: 1, explanation: '$W = Fd\\cos(60^{\\circ}) = 20 \\times 5 \\times 0.5 = 50$ J.' },
            { question: 'If $\\vec{F} = (3\\hat{i} + 4\\hat{j})\\text{ N}$ and $\\vec{d} = (2\\hat{i} - \\hat{j})\\text{ m}$. The work done is:', options: ['14 J', '10 J', '2 J', '5 J'], correct: 2, explanation: 'Dot product: $(3 \\times 2) + (4 \\times -1) = 6 - 4 = 2$ J.' },
            { question: 'Area under a Force-Displacement graph represents:', options: ['Power', 'Impulse', 'Work done', 'Acceleration'], correct: 2, explanation: 'The integral $\\int F dx$ equals the area under the curve, which is Work.' },
            { question: 'Work done by static friction is always:', options: ['Zero', 'Positive', 'Negative', 'Can be positive, negative, or zero'], correct: 3, explanation: 'It depends on the relative frame. e.g., On a truck bed, static friction pushes a box forward (positive work).' },
            { question: 'A man pushes against a wall with 100 N for 10s. The Work done is:', options: ['1000 J', '100 J', 'Zero', '-1000 J'], correct: 2, explanation: 'The wall does not move, so $d = 0$, $W = 0$.' }
        ],
        assessment: [
            // 5 Hard
            { question: 'A variable force $F = (3x^2 - 2x + 7)\\text{ N}$ acts on a body. Work done from $x = 0$ to $x = 2$ m is:', options: ['14 J', '18 J', '22 J', '20 J'], correct: 1, explanation: '$\\int_0^2 (3x^2 - 2x + 7) dx = [x^3 - x^2 + 7x]_0^2 = 8 - 4 + 14 = 18$ J.' },
            { question: 'A spring of force constant $k = 50\\text{ N/m}$ is compressed from $x = 0$ to $x = 0.2$ m. Work done by the external force is:', options: ['1 J', '2 J', '-1 J', '-2 J'], correct: 0, explanation: 'External work is positive: $W = \\frac{1}{2}kx^2 = 0.5 \\times 50 \\times (0.2)^2 = 1$ J.' },
            { question: 'If $\\vec{F} = y\\hat{i} + x\\hat{j}$ acts on a particle moving from $(0,0)$ to $(1,1)$ along $y=x$. The work done is:', options: ['1 J', '0.5 J', '2 J', '0 J'], correct: 0, explanation: '$\\int F\\cdot dr = \\int (ydx + xdy) = \\int d(xy) = [xy]_{(0,0)}^{(1,1)} = 1$ J.' },
            { question: 'A chain of mass $M$ and length $L$ overhangs a table by $L/3$. Work done to pull it fully onto the table is:', options: ['$MgL/18$', '$MgL/3$', '$MgL/9$', '$MgL/6$'], correct: 0, explanation: 'Overhanging mass is $M/3$. Its COM is $L/6$ below. Work $= (M/3) \\times g \\times (L/6) = MgL/18$.' },
            { question: 'The work done by a conservative force along a closed path is:', options: ['Maximum', 'Minimum', 'Zero', 'Infinite'], correct: 2, explanation: 'By definition, conservative forces do zero net work in a closed loop.' },
            // 5 JEE/NEET
            { question: '(JEE) An object is displaced from $(1, 2, -1)$ to $(3, -1, 4)$ under a constant force $\\vec{F} = (2\\hat{i} - \\hat{j} + 3\\hat{k})\\text{ N}$. Find work done.', options: ['22 J', '20 J', '15 J', '18 J'], correct: 0, explanation: '$\\vec{d} = (3-1)\\hat{i} + (-1-2)\\hat{j} + (4 - -1)\\hat{k} = 2\\hat{i} - 3\\hat{j} + 5\\hat{k}$. $W = 2(2) + (-1)(-3) + 3(5) = 4 + 3 + 15 = 22$ J.' },
            { question: '(NEET) A block of mass $m$ is pulled by a force $F$ on a rough horizontal surface (coefficient $\\mu$). If the block moves with constant velocity, the work done by $F$ over distance $d$ is:', options: ['$\\mu mg d$', '$F d \\cos\\theta$', 'Zero', '$\\mu mg d \\sin\\theta$'], correct: 0, explanation: 'Since $v$ is constant, $F = f_k = \\mu mg$. Work done by $F$ is $F \\times d = \\mu mg d$.' },
            { question: '(JEE) A particle moves along the x-axis under a force $F = \\frac{k}{x^2}$. The work done moving from $x=a$ to $x=b$ ($b>a$) is:', options: ['$k(\\frac{1}{a} - \\frac{1}{b})$', '$k(\\frac{1}{b} - \\frac{1}{a})$', '$k(b-a)$', '$\\frac{k}{ab}$'], correct: 0, explanation: '$\\int_a^b kx^{-2} dx = -[k/x]_a^b = k(\\frac{1}{a} - \\frac{1}{b})$.' },
            { question: '(NEET) Work done in raising a box depends on:', options: ['Path taken', 'Time taken', 'Mass and height', 'Initial velocity'], correct: 2, explanation: 'Gravity is conservative. Work depends only on mass ($m$) and change in height ($h$), $W = mgh$.' },
            { question: '(JEE) A 10 kg block is pulled up a rough $30^\\circ$ incline by a 100 N force parallel to the plane. If $\\mu_k = 0.2$ and distance is 5 m, find work done by Gravity. ($g=10$)', options: ['-250 J', '250 J', '-500 J', '0 J'], correct: 0, explanation: '$W_g = -mg d \\sin(30^\\circ) = -10 \\times 10 \\times 5 \\times 0.5 = -250$ J.' }
        ]
    },
    {
        id: 'work-energy-theorem',
        title: 'Work-Energy Theorem',
        subtitle: 'The Universal Equation',
        desc: 'Understand how net work translates directly into changes in kinetic energy.',
        icon: '🔗',
        color: '#f59e0b',
        learn: {
            title: 'Connecting Forces and Speed',
            content: `The Work-Energy Theorem states that the net work done on an object by all forces equals its change in Kinetic Energy.
            $$W_{net} = \\Delta KE = KE_f - KE_i$$
            
            This applies universally, regardless of whether forces are conservative or non-conservative.`,
            rules: [
                'Identify ALL forces acting on the body.',
                'Calculate the work done by each force.',
                'Sum them up: $W_1 + W_2 + ... = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2$.'
            ],
            examples: [
                { q: 'A 2 kg car speeds up from 0 to 10 m/s. Net work done?', a: '$\\Delta KE = 0.5 \\times 2 \\times 10^2 - 0 = 100$ J. So $W_{net} = 100$ J.' },
                { q: 'A bullet hits a tree and stops. What is the net work?', a: 'Final KE is 0. $\\Delta KE = -\\text{initial KE}$. Work done by the tree is negative.' }
            ]
        },
        practice: [
            // 5 Easy
            { question: 'The kinetic energy of an object depends on its:', options: ['Mass only', 'Velocity only', 'Mass and Velocity', 'Position'], correct: 2, explanation: '$KE = \\frac{1}{2}mv^2$.' },
            { question: 'If the velocity of an object is doubled, its kinetic energy becomes:', options: ['Doubled', 'Quadrupled', 'Halved', 'Unchanged'], correct: 1, explanation: 'Because $v$ is squared, $2^2 = 4$ times.' },
            { question: 'According to the work-energy theorem, net work done is equal to:', options: ['Change in momentum', 'Change in potential energy', 'Change in kinetic energy', 'Impulse'], correct: 2, explanation: '$W_{net} = \\Delta KE$.' },
            { question: 'Kinetic Energy can never be:', options: ['Zero', 'Positive', 'Negative', 'Fractional'], correct: 2, explanation: 'Since mass is positive and velocity is squared (always positive), KE is never negative.' },
            { question: 'A 4 kg mass moves at 3 m/s. What is its KE?', options: ['12 J', '6 J', '18 J', '36 J'], correct: 2, explanation: '$KE = 0.5 \\times 4 \\times 3^2 = 2 \\times 9 = 18$ J.' },
            // 5 Medium
            { question: 'A force of 50 N acts on a body of mass 10 kg initially at rest. The work done in 2 seconds is:', options: ['100 J', '250 J', '500 J', '1000 J'], correct: 2, explanation: '$a = F/m = 5$. Distance $d = 0.5\\times 5 \\times 2^2 = 10$ m. $W = F \\times d = 50 \\times 10 = 500$ J.' },
            { question: 'A car of mass 1000 kg accelerates from 10 m/s to 20 m/s. Net work done is:', options: ['150 kJ', '50 kJ', '300 kJ', '100 kJ'], correct: 0, explanation: '$\\Delta KE = 0.5 \\times 1000 \\times (20^2 - 10^2) = 500 \\times 300 = 150,000$ J.' },
            { question: 'If the kinetic energy of a particle increases by 300%, its momentum increases by:', options: ['100%', '150%', '200%', '300%'], correct: 0, explanation: 'New KE is $4\\times$ original. Since $p = \\sqrt{2mKE}$, new $p$ is $\\sqrt{4} = 2\\times$ original. A 100% increase.' },
            { question: 'Two bodies with mass $m$ and $4m$ have equal KE. The ratio of their linear momenta is:', options: ['1:2', '1:4', '4:1', '1:16'], correct: 0, explanation: '$p^2 = 2mKE$. $p_1 / p_2 = \\sqrt{m / 4m} = 1/2$.' },
            { question: 'A bullet is fired into a wooden block and penetrates $10$ cm before stopping. If velocity is doubled, penetration is:', options: ['10 cm', '20 cm', '40 cm', '80 cm'], correct: 2, explanation: 'Work done by stopping force $F\\times d = KE$. If $v$ doubles, $KE$ quadruples. Distance becomes $4 \\times 10 = 40$ cm.' }
        ],
        assessment: [
            // 5 Hard
            { question: 'A 2 kg block drops from 5 m. Air resistance does -20 J work. Velocity just before hitting the ground is ($g=10$):', options: ['$\\sqrt{80}$ m/s', '$\\sqrt{100}$ m/s', '10 m/s', '8 m/s'], correct: 0, explanation: '$W_{net} = W_g + W_{air} = 100 - 20 = 80$. $80 = 0.5 \\times 2 \\times v^2 \\implies v^2 = 80$.' },
            { question: 'A particle moves on rough horizontal ground. Its KE reduces by $10$ J after covering $5$ m. Frictional force is:', options: ['2 N', '5 N', '10 N', '50 N'], correct: 0, explanation: '$W_f = \\Delta KE \\implies -f_k \\times 5 = -10 \\implies f_k = 2$ N.' },
            { question: 'A body of mass $2$ kg is projected upwards at $20$ m/s. Work done by gravity in the first 1 sec is ($g=10$):', options: ['-400 J', '-300 J', '-200 J', '-100 J'], correct: 1, explanation: 'Displacement $s = 20(1) - 0.5(10)(1)^2 = 15$ m. $W = -mg s = -2 \\times 10 \\times 15 = -300$ J.' },
            { question: 'An object travels a distance proportional to $t^{3/2}$. The net work done by it is proportional to:', options: ['$t$', '$t^{1/2}$', '$t^2$', 'Constant'], correct: 0, explanation: '$x \\propto t^{3/2} \\implies v \\propto t^{1/2}$. $KE \\propto v^2 \\propto t$. Thus $W_{net} \\propto t$.' },
            { question: 'A block slides down a rough curved track. $W_{gravity} = 50$ J, $W_{friction} = -20$ J, Normal force does $0$ J. Initial $KE = 0$. Final $KE$ is:', options: ['30 J', '70 J', '50 J', '20 J'], correct: 0, explanation: '$W_{net} = 50 - 20 + 0 = 30$ J. $\\Delta KE = 30$.' },
            // 5 JEE/NEET
            { question: '(JEE) Two identical blocks A and B moving at 10 m/s and 20 m/s are retarded by the same constant frictional force. Ratio of stopping distances $d_A : d_B$ is:', options: ['1:2', '1:4', '1:8', '1:1'], correct: 1, explanation: '$F \\times d = \\frac{1}{2}mv^2 \\implies d \\propto v^2$. $(10/20)^2 = 1/4$.' },
            { question: '(NEET) A bomb of mass 30 kg at rest explodes into two pieces of 18 kg and 12 kg. Velocity of 18 kg mass is 6 m/s. KE of the other mass is:', options: ['256 J', '324 J', '486 J', '524 J'], correct: 2, explanation: 'Momentum conservation: $18 \\times 6 = 12 \\times v_2 \\implies v_2 = 9$ m/s. $KE = 0.5 \\times 12 \\times 9^2 = 486$ J.' },
            { question: '(JEE) A particle falls from rest under gravity. The graph of Kinetic Energy vs Height ($h$ fallen) is a:', options: ['Straight line', 'Parabola opening up', 'Parabola opening down', 'Hyperbola'], correct: 0, explanation: '$v^2 = 2gh$. $KE = \\frac{1}{2}m(2gh) = mgh$. Linear relationship $y = mx$.' },
            { question: '(NEET) A motor drives a body along a straight line with a constant power P. The distance $x$ traveled in time $t$ is proportional to:', options: ['$t$', '$t^{1/2}$', '$t^{3/2}$', '$t^2$'], correct: 2, explanation: '$P = Fv = m v \\frac{dv}{dt}$. $\\int v dv = \\int \\frac{P}{m} dt \\implies v^2 = \\frac{2P}{m}t \\implies v \\propto t^{1/2} \\implies x \\propto t^{3/2}$.' },
            { question: '(JEE) A chain of mass M, length L rests on a rough table ($\\mu=0.25$). If it starts sliding when it overhangs by length $x$, the kinetic energy when it completely slips off the table requires accounting for:', options: ['Only Gravity', 'Only Friction', 'Gravity and Friction', 'Normal Force'], correct: 2, explanation: 'Work-Energy Theorem dictates $W_g + W_f = \\Delta KE$. Both do work before it fully leaves.' }
        ]
    },
    {
        id: 'potential-energy',
        title: 'Potential Energy',
        subtitle: 'Stored Capacity',
        desc: 'Understand gravitational and elastic potential energy based on position and configuration.',
        icon: '🔋',
        color: '#10b981',
        learn: {
            title: 'Energy of Position',
            content: `Potential Energy is defined only for conservative forces.
            $$F = -\\frac{dU}{dx}$$
            
            1. Gravitational PE near Earth: $U = mgh$ (relative to a chosen zero-level)
            2. Spring PE: $U = \\frac{1}{2}kx^2$ (where $x$ is displacement from natural length)`,
            rules: [
                'You can arbitrarily choose where $U=0$.',
                'If a conservative force does positive work, Potential Energy decreases.',
                'If a conservative force does negative work, Potential Energy increases.'
            ],
            examples: [
                { q: 'Lift a 2kg book up 2m. Change in PE?', a: '$\\Delta U = -W_{gravity} = -(-2 \\times 10 \\times 2) = +40$ J.' },
                { q: 'Compress a spring by $x$. What is the stored energy?', a: '$\\frac{1}{2}kx^2$. The external force did positive work on the spring.' }
            ]
        },
        practice: [
            // 5 Easy
            { question: 'Potential energy is purely a function of:', options: ['Velocity', 'Acceleration', 'Temperature', 'Position or Configuration'], correct: 3, explanation: 'PE arises from the arrangement of objects in a conservative field.' },
            { question: 'The formula for gravitational potential energy near Earth’s surface is:', options: ['$0.5mv^2$', '$mg/h$', '$mgh$', '$mv$'], correct: 2, explanation: '$U = mgh$.' },
            { question: 'The potential energy of a stretched spring is given by:', options: ['$kx$', '$\\frac{1}{2}kx^2$', '$k/x$', '$\\frac{1}{2}k^2x$'], correct: 1, explanation: 'Area of the $F-x$ triangle: $0.5 \\times \\text{base} \\times \\text{height} = 0.5 \\times x \\times (kx) = 0.5kx^2$.' },
            { question: 'When an object falls freely towards the earth, its potential energy:', options: ['Increases', 'Decreases', 'Remains constant', 'Becomes zero immediately'], correct: 1, explanation: 'As height $h$ decreases, $mgh$ decreases.' },
            { question: 'Is Potential Energy defined for frictional forces?', options: ['Yes', 'No', 'Sometimes', 'Only at rest'], correct: 1, explanation: 'Friction is a non-conservative force. Defining a scalar potential for it is impossible since it depends on path.' },
            // 5 Medium
            { question: 'A spring with $k=100$ N/m is compressed by $0.1$ m. Its potential energy is:', options: ['10 J', '5 J', '0.5 J', '1 J'], correct: 2, explanation: '$0.5 \\times 100 \\times (0.1)^2 = 0.5$ J.' },
            { question: 'Two springs A and B ($k_A > k_B$) are stretched by the same force. Which has more potential energy?', options: ['A', 'B', 'Both same', 'Insufficient data'], correct: 1, explanation: '$U = F^2 / (2k)$. Since $k_B$ is smaller, dividing by a smaller number gives a larger $U$.' },
            { question: 'For a conservative force $F$, its relation to potential energy $U$ in 1D is:', options: ['$F = dU/dx$', '$F = -dU/dx$', '$F = \\int U dx$', '$F = U^2$'], correct: 1, explanation: 'Force invariably points towards the direction of DECREASING potential energy.' },
            { question: 'The potential energy of a simple pendulum is maximum at:', options: ['Mean position', 'Extreme positions', 'Midway', 'Cannot be determined'], correct: 1, explanation: 'At extreme positions, height is at a maximum relative to the mean.' },
            { question: 'A body is taken from Earth surface to height $R$ (Earth radius). Change in PE is:', options: ['$mgR$', '$mgR/2$', '$2mgR$', 'Zero'], correct: 1, explanation: 'Using exact formula $U = -GMm/r$. $\\Delta U = -\\frac{GMm}{2R} - (-\\frac{GMm}{R}) = \\frac{GMm}{2R} = \\frac{1}{2}mgR$.' }
        ],
        assessment: [
            // 5 Hard
            { question: 'The curve of potential energy $U(x)$ vs $x$ is a parabola $U = cx^2$. The force $F(x)$ is represented by:', options: ['A straight line through origin', 'A parabola', 'A constant', 'A hyperbola'], correct: 0, explanation: '$F = -dU/dx = -2cx$. A linear equation representing Hooke’s Law.' },
            { question: 'At neutral equilibrium, the potential energy is:', options: ['Maximum', 'Minimum', 'Constant', 'Zero'], correct: 2, explanation: 'For neutral equilibrium, $dU/dx = 0$ everywhere locally, so $U$ is constant.' },
            { question: 'A spring ($k=200$ N/m) is cut in half. The potential energy of ONE piece when compressed by $x$ compared to the whole spring compressed by $x$ is:', options: ['Half', 'Same', 'Double', 'Quadruple'], correct: 2, explanation: 'Cutting a spring in half doubles its constant ($k_{new}=400$). So $U_{new} = \\frac{1}{2}(2k)x^2 = 2U_{old}$.' },
            { question: 'If $U(x,y) = x^2 + y^2$, the force vector is:', options: ['$2x\\hat{i} + 2y\\hat{j}$', '$-2x\\hat{i} - 2y\\hat{j}$', '$x\\hat{i} + y\\hat{j}$', 'Zero'], correct: 1, explanation: '$\\vec{F} = -\\nabla U = -\\frac{\\partial U}{\\partial x}\\hat{i} - \\frac{\\partial U}{\\partial y}\\hat{j} = -2x\\hat{i} - 2y\\hat{j}$.' },
            { question: 'A meter stick of mass 1kg is pivoting at its center. Work done to rotate it from horizontal to vertical is:', options: ['10 J', '5 J', '0 J', '2.5 J'], correct: 2, explanation: 'The Center of Mass remains at the same height. $\\Delta U_{gravity} = 0$.' },
            // 5 JEE/NEET
            { question: '(JEE) Two identical blocks are tied to a spring and pushed apart, storing $U$. If released, the max KE of ONE block is:', options: ['$U$', '$U/2$', '$2U$', '$U/4$'], correct: 1, explanation: 'By symmetry and momentum conservation, the energy $U$ is split perfectly in half, so $U/2$ each.' },
            { question: '(NEET) The potential energy of a particle varies as $U = A/x^2 - B/x$. For stable equilibrium, the position $x$ is:', options: ['$A/B$', '$2A/B$', '$A/2B$', '$B/A$'], correct: 1, explanation: '$dU/dx = -2A/x^3 + B/x^2 = 0 \\implies 2A/x = B \\implies x = 2A/B$.' },
            { question: '(JEE) A block attached to a spring ($k$) is pulled by a constant force $F$. The maximum extension of the spring is:', options: ['$F/k$', '$2F/k$', '$F/2k$', '$\\sqrt{F/k}$'], correct: 1, explanation: 'Work done by $F$ = PE stored: $F x_{max} = \\frac{1}{2} k x_{max}^2 \\implies x_{max} = 2F/k$. (Equilibrium is at $F/k$).' },
            { question: '(NEET) A ball is dropped from height $H$. At what height is its KE equal to half its PE?', options: ['$H/2$', '$H/3$', '$2H/3$', '$3H/4$'], correct: 2, explanation: '$KE + PE = mgH$. Given $KE = PE/2 \\implies PE/2 + PE = mgH \\implies 1.5 PE = mgH \\implies PE = 2/3 mgH \\implies h = 2H/3$.' },
            { question: '(JEE) Work done by internal conservative forces of a system is equal to:', options: ['Change in KE', 'Negative change in PE', 'Total energy change', 'Zero'], correct: 1, explanation: '$W_{conservative} = -\\Delta U$. This is the fundamental definition of Potential Energy.' }
        ]
    },
    {
        id: 'conservation-of-energy',
        title: 'Conservation of Energy',
        subtitle: 'The Invariant Total',
        desc: 'Apply the principle of conservation of mechanical energy to solve complex motion problems without kinematics.',
        icon: '⚖️',
        color: '#ec4899',
        learn: {
            title: 'Mechanical Energy Conservation',
            content: `If only conservative forces (like gravity or springs) do work on a system, the Total Mechanical Energy remains constant.
            $$KE_i + PE_i = KE_f + PE_f$$
            
            This allows us to bypass time and path completely, matching position and speed states directly.`,
            rules: [
                'Ensure NO non-conservative forces (like friction) are doing work. If they are, use $W_{nc} = \\Delta E_{mech}$.',
                'Pick a convenient datum where $PE = 0$.',
                'Calculate Energy at start, calculate Energy at end, and equate them.'
            ],
            examples: [
                { q: 'A roller coaster drops 20m from rest. Speed at bottom?', a: '$mgh = 0.5mv^2 \\implies v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 20} = 20$m/s.' },
                { q: 'Pendulum released from horizontal. Speed at lowest point?', a: 'Same equation! $v = \\sqrt{2gL}$' }
            ]
        },
        practice: [
            // 5 Easy
            { question: 'If no non-conservative forces act on a falling apple, which is true?', options: ['KE is constant', 'PE is constant', 'KE + PE is constant', 'Only Momentum is constant'], correct: 2, explanation: 'This is the Law of Conservation of Mechanical Energy.' },
            { question: 'A ball is thrown upward. At the highest point, its:', options: ['KE is max', 'PE is max', 'Total Energy is zero', 'Acceleration is zero'], correct: 1, explanation: 'Velocity is zero at the top, making KE zero and taking PE to its maximum value.' },
            { question: 'Total mechanical energy is the sum of:', options: ['Potential & Heat Energy', 'Kinetic & Potential Energy', 'Kinetic & Sound Energy', 'Work & Power'], correct: 1, explanation: 'Mechanical Energy = KE + PE.' },
            { question: 'When a pendulum swings, it converts:', options: ['KE to PE and vice-versa', 'Heat to KE', 'Work to Power', 'Mass to Energy'], correct: 0, explanation: 'It continually cycles between maximum PE (extremes) and maximum KE (mean position).' },
            { question: 'A 1 kg stone falls 5m. Energy conserved? What is the KE at bottom ($g=10$)?', options: ['10 J', '50 J', '100 J', '0 J'], correct: 1, explanation: 'Initial PE = $1 \\times 10 \\times 5 = 50$ J. At bottom, all PE transforms to KE.' },
            // 5 Medium
            { question: 'A body falls freely. In the middle of its path, it possesses:', options: ['Only KE', 'Only PE', 'Both PE and KE equally', 'Zero energy'], correct: 2, explanation: 'Halfway down, height is halved, so PE is halved. The other half must have become KE.' },
            { question: 'Water falling from a 50 m high dam turns a turbine. What energy conversion occurs?', options: ['Electric to KE', 'PE to KE to Electric', 'Heat to KE', 'Chemical to Electric'], correct: 1, explanation: 'Gravitational PE of water $\\rightarrow$ KE of falling water $\\rightarrow$ Electrical energy via turbine.' },
            { question: 'A block slides down a frictionless incline of height $h$. The velocity at the bottom depends on:', options: ['Its mass', 'The angle of incline', 'Height $h$ only', 'Mass and angle'], correct: 2, explanation: '$mgh = 0.5mv^2 \\implies v = \\sqrt{2gh}$. It is independent of mass or path angle.' },
            { question: 'A spring gun with $k$ is compressed by $x$, firing a ball $m$. Muzzle velocity is:', options: ['$x\\sqrt{m/k}$', '$x\\sqrt{k/m}$', '$\\sqrt{kx/m}$', '$kx^2/m$'], correct: 1, explanation: '$0.5 k x^2 = 0.5 m v^2 \\implies v = x\\sqrt{k/m}$.' },
            { question: 'A roller coaster car is inverted at the top of a loop of radius $R$. Minimum speed to not fall is:', options: ['$\\sqrt{gR}$', '$\\sqrt{2gR}$', '$\\sqrt{3gR}$', '$\\sqrt{5gR}$'], correct: 0, explanation: 'Requires centripetal force condition at top: $mg = mv^2/R \\implies v = \\sqrt{gR}$.' }
        ],
        assessment: [
            // 5 Hard
            { question: 'A block is released from height $h$ on a frictionless track that ends in a vertical loop of radius $R$. Min height $h$ to complete the loop?', options: ['$2R$', '$2.5R$', '$3R$', '$5R$'], correct: 1, explanation: 'Velocity at bottom must be $\\sqrt{5gR}$. $mgh = 0.5m(\\sqrt{5gR})^2 \\implies h = 2.5R$.' },
            { question: 'A simple pendulum is released from the horizontal. Tension in the string at the lowest point is:', options: ['$Mg$', '$2Mg$', '$3Mg$', '$4Mg$'], correct: 2, explanation: '$v^2 = 2gL$. Tension $T - Mg = Mv^2/L \\implies T = M(2gL)/L + Mg = 3Mg$.' },
            { question: 'A mass attached to a string of length $L$ is given horizontal velocity $u$. To just reach the horizontal position, $u$ must be:', options: ['$\\sqrt{gL}$', '$\\sqrt{2gL}$', '$\\sqrt{3gL}$', '$\\sqrt{5gL}$'], correct: 1, explanation: 'Must reach height $L$ with $v=0$. $0.5mu^2 = mgL \\implies u = \\sqrt{2gL}$.' },
            { question: 'Two perfectly elastic balls collide. Is mechanical energy conserved DURING the microscopic milliseconds of collision?', options: ['Yes', 'No, it converts to PE temporarily', 'No, it is lost', 'Depends on masses'], correct: 1, explanation: 'During deformation, KE converts to Elastic Potential Energy. Total energy is conserved, but KE is NOT constant during the squish.' },
            { question: 'A 1 kg bead slides on a frictionless wire ending in a spring ($k=100$ N/m). Height is 5 m. Max compression of spring is ($g=10$):', options: ['0.5 m', '1 m', '1.5 m', '2 m'], correct: 1, explanation: '$mgh = 0.5kx^2 \\implies 1 \\times 10 \\times 5 = 0.5 \\times 100 \\times x^2 \\implies 50 = 50x^2 \\implies x = 1$ m.' },
            // 5 JEE/NEET
            { question: '(JEE) A particle in a 1D potential field has $U = 5x(x-4)$. If total energy is $0$, what are the bounds of its motion?', options: ['$x=0, 4$', '$x=-4, 4$', '$x=2, 4$', 'Unbounded'], correct: 0, explanation: 'Kinetic energy must be $\\ge 0$. So $E - U \\ge 0 \\implies 0 - 5x(x-4) \\ge 0 \\implies x(x-4) \\le 0 \\implies 0 \\le x \\le 4$.' },
            { question: '(NEET) A ball bounces to $80\\%$ of its original height. What percentage of mechanical energy is lost?', options: ['$10\\%$', '$20\\%$', '$64\\%$', '$36\\%$'], correct: 1, explanation: '$PE_{initial} = mgH$. $PE_{final} = mg(0.8H) = 0.8 PE_{initial}$. Loss is $20\\%$.' },
            { question: '(JEE) An elastic string has natural length $L$ and spring constant $k$. Work done to stretch it from $L$ to $L+x$, then to $L+2x$ is in the ratio:', options: ['1:3', '1:4', '1:2', '1:8'], correct: 0, explanation: '$W_1 = 0.5kx^2$. $W_{total} = 0.5k(2x)^2 = 2kx^2$. Second part $W_2 = W_{total} - W_1 = 1.5kx^2$. Ratio $0.5 : 1.5 = 1:3$.' },
            { question: '(NEET) The power of a heart pumping 5 liters of blood per minute at a pressure of 120 mm Hg ($1.6 \\times 10^4$ Pa) is closely:', options: ['1.3 W', '5 W', '130 W', '0.5 W'], correct: 0, explanation: '$P = \\text{Pressure} \\times \\text{Volume Flow Rate} = (1.6 \\times 10^4) \\times (5 \\times 10^{-3} / 60) = 1.33$ W.' },
            { question: '(JEE) A uniform heavy chain is pulled onto a table. If 1/n th of its length is hanging, the fraction of total work needed relative to if it were entirely hanging is:', options: ['$1/n$', '$1/n^2$', '$1/(2n)$', '$1/n^3$'], correct: 1, explanation: 'Work to pull length $y$ is $W_y = \\int_0^y (\\lambda ds) g s = \\frac{\\lambda g}{2} y^2$. Set $y = L/n$, then $W = \\frac{\\lambda g L^2}{2n^2} = W_{total} / n^2$.' }
        ]
    }
];
