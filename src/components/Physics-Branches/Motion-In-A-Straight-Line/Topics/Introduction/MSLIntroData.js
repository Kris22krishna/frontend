// MSL Introduction Data – follows the WEP IntroData pattern exactly

export const mslIntroData = {
    prerequisites: [
        {
            icon: '📐',
            title: 'Basic Mathematics',
            desc: 'Algebra (solving for unknowns), coordinate geometry, and elementary calculus (rates of change).'
        },
        {
            icon: '➕',
            title: 'Scalars & Vectors',
            desc: 'A scalar has magnitude only; a vector has magnitude and direction. This distinction is the core of kinematics.'
        },
        {
            icon: '🔬',
            title: 'SI Units',
            desc: 'Length in metres (m), time in seconds (s), and derived units like m/s for speed and $\\text{m/s}^2$ for acceleration.'
        }
    ],
    cards5W1H: [
        {
            q: 'What',
            label: 'is Motion in a Straight Line?',
            icon: '🔭',
            gradFrom: '#6366f1',
            gradTo: '#818cf8',
            shadow: 'rgba(99,102,241,0.3)',
            content: '**Kinematics** is the branch of mechanics that describes how objects move — without asking why. When motion is restricted to a single axis (one dimension), we call it **rectilinear** or **1D** motion.\n\nKey quantities:\n• **Position (x):** Location on a number line relative to a chosen origin\n• **Distance (d):** Total path length — always $\\geq 0$, scalar\n• **Displacement (s):** Change in position from start to end — a signed vector\n• **Velocity (v):** Rate of change of displacement — can be negative\n• **Acceleration (a):** Rate of change of velocity — can be negative',
            fact: 'Kinematics does NOT care about mass or forces — it only asks: where is the object, how fast is it going, and is it speeding up or slowing down?'
        },
        {
            q: 'Why',
            label: 'study kinematics first?',
            icon: '💡',
            gradFrom: '#0d9488',
            gradTo: '#14b8a6',
            shadow: 'rgba(13,148,136,0.3)',
            content: 'Kinematics is the **language** of mechanics. Every chapter that follows — Newton\'s Laws, Work-Energy, Rotational Motion, Projectile Motion — uses velocity, displacement, and acceleration as primary variables.\n\nWithout kinematics:\n• You cannot apply $F = ma$ (you need to know what a is)\n• You cannot compute work using $W = Fs$\n• You cannot describe projectile trajectories\n\nFor NEET/JEE, kinematics contributes **2–3 questions per paper**, often via v–t graph interpretation, which is the most discriminating question type in the entire paper.',
            fact: 'JEE Advanced 2023: 3 out of 5 mechanics conceptual questions were rooted in kinematics — even when the problem appeared to be about forces!'
        },
        {
            q: 'Who',
            label: 'pioneered the study of motion?',
            icon: '👨‍🔬',
            gradFrom: '#7c3aed',
            gradTo: '#a78bfa',
            shadow: 'rgba(124,58,237,0.3)',
            content: '**Galileo Galilei (1564–1642)** conducted the first rigorous experiments on motion. He showed that in free fall, all objects accelerate at the same rate regardless of mass — using inclined planes to slow down free fall so he could measure it with a water clock.\n\n**Isaac Newton (1643–1727)** provided the mathematical framework — calculus — that allowed instantaneous velocity and acceleration to be precisely defined.\n\nToday, aerospace engineers, biomechanists, traffic safety researchers, and even game-engine developers use the same principles Galileo and Newton established.',
            fact: 'Galileo did NOT drop cannonballs from the Leaning Tower of Pisa — that\'s a popular myth! His real experiments used inclined planes and careful timing.'
        },
        {
            q: 'Where',
            label: 'does rectilinear motion appear?',
            icon: '📍',
            gradFrom: '#f59e0b',
            gradTo: '#fbbf24',
            shadow: 'rgba(245,158,11,0.3)',
            content: '**Roads & Vehicles:** Braking distance $s = \\dfrac{u^2}{2a}$ is literally derived from $v^2 = u^2 + 2as$ with $v = 0$.\n\n**Elevators:** Three kinematic phases — acceleration up, constant speed, deceleration to floor.\n\n**Sport:** 100 m sprint is pure rectilinear kinematics. Biomechanists use $s = ut + \\frac{1}{2}at^2$ to model the drive phase.\n\n**Free Fall & Drops:** Buildings, cranes, parachutes — all use $v^2 = 2gh$ to find impact velocity.\n\n**Spacecraft:** Rocket burns modelled as constant-acceleration phases along a straight trajectory.',
            fact: 'Your smartphone\'s accelerometer measures 1D acceleration along each of its three axes independently — that\'s how it detects free fall and auto-rotates the screen!'
        },
        {
            q: 'When',
            label: 'do we apply kinematic equations?',
            icon: '⏰',
            gradFrom: '#3b82f6',
            gradTo: '#60a5fa',
            shadow: 'rgba(59,130,246,0.3)',
            content: 'The three kinematic equations are valid **only when acceleration is constant (uniform)**. Apply them when:\n\n• You know **3 of the 5 variables** (u, v, a, s, t) and need the others\n• The problem says "uniformly accelerated", "constant force", or "free fall"\n• You are analysing a **single phase** of motion (one value of a throughout)\n\nDo **not** apply them when:\n• Acceleration changes with time (e.g., $a = kt$) — use calculus instead\n• The motion has multiple segments — split into phases and apply separately',
            fact: 'Tyre skid marks let accident investigators use $v^2 = u^2 + 2as$ backwards — from the mark length and deceleration they calculate the speed before braking!'
        },
        {
            q: 'How',
            label: 'do we solve kinematics problems?',
            icon: '⚙️',
            gradFrom: '#ec4899',
            gradTo: '#f472b6',
            shadow: 'rgba(236,72,153,0.3)',
            content: '**Step 1 — Set up a reference frame:** Choose a positive direction (usually up or right). Velocities and displacements in that direction are positive; opposite is negative.\n\n**Step 2 — List the 5 variables:** u, v, a, s, t. Mark which 3 are known and which 2 are unknown.\n\n**Step 3 — Select the equation that omits the unnecessary unknown:**\n• Missing s? Use $v = u + at$\n• Missing v? Use $s = ut + \\frac{1}{2}at^2$\n• Missing t? Use $v^2 = u^2 + 2as$\n\n**Step 4 — Substitute and solve algebraically.** Then check units and sign.',
            fact: 'Writing down u, v, a, s, t and circling the knowns before touching an equation eliminates approximately 80% of "silly mistakes" in kinematics problems.'
        }
    ]
};
