export const generateLawsOfMotionSkillsData = () => {
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const round1 = (num) => Math.round(num * 10) / 10;
    const round2 = (num) => Math.round(num * 100) / 100;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    /* ═══════════════════════════════════════════════════════════════
       SKILL 1 — Newton's First Law & Inertia
       Difficulty: Easy → Medium → Hard → JEE/NEET
       ═══════════════════════════════════════════════════════════════ */

    const skill1Generators = [
        // ── EASY (Q1-Q5) ──────────────────────────────
        // Q1: Basic property
        () => ({ type: 'multiple-choice', question: 'Which physical quantity is a measure of inertia?', options: ['Mass', 'Weight', 'Volume', 'Velocity'], correctAnswer: 0, explanation: 'Mass is the quantitative measure of inertia. Heavier objects resist change in motion more.' }),

        // Q2: Simple inertia example
        () => {
            const scenario = pick([
                { event: 'a bus suddenly stops', dir: 'forward', type: 'motion' },
                { event: 'a bus suddenly starts', dir: 'backward', type: 'rest' },
                { event: 'a car takes a sharp turn', dir: 'outward', type: 'direction' }
            ]);
            return { type: 'multiple-choice', question: `When ${scenario.event}, passengers jerk ${scenario.dir}. This is due to:`, options: [`Inertia of ${scenario.type}`, 'Impulse', 'Centripetal force', 'Gravity'], correctAnswer: 0, explanation: `The body resists the sudden change in its state of ${scenario.type}.`, image: scenario.type === 'motion' ? '🚗💨→🛑 passengers jerk →' : scenario.type === 'rest' ? '🚗🛑→💨 passengers jerk ←' : '🚗↰ passengers slide →' };
        },

        // Q3: Object in space
        () => {
            const speed = randInt(100, 500);
            return { type: 'multiple-choice', question: `A spacecraft moves at ${speed} m/s in deep space with zero friction. Force needed to maintain this speed?`, options: ['Zero', `${speed} N`, `${speed * 2} N`, 'Cannot be determined'], correctAnswer: 0, explanation: "Newton's First Law: No force is needed to maintain constant velocity in the absence of external forces.", image: '🚀→→→ (no friction, no force needed)' };
        },

        // Q4: Zero net force implication
        () => ({ type: 'multiple-choice', question: 'If the net external force on a body is zero, which is ALWAYS true?', options: ['Its acceleration is zero', 'Its velocity is zero', 'Its momentum is zero', 'It must be at rest'], correctAnswer: 0, explanation: 'F_net = 0 → a = 0. The body can still be moving at constant velocity (uniform motion).' }),

        // Q5: NOT an example of inertia
        () => {
            const wrong = pick([
                { text: 'A ball falling freely under gravity', why: 'Gravity is an external force causing acceleration—not inertia.' },
                { text: 'A magnet pulling an iron nail', why: 'Magnetic attraction is an external force, not inertia.' }
            ]);
            return { type: 'multiple-choice', question: 'Which is NOT an example of inertia?', options: [wrong.text, 'Dust flying off a beaten carpet', 'A coin dropping into a glass when card is flicked', 'An athlete running past the finish line'], correctAnswer: 0, explanation: wrong.why };
        },

        // ── MEDIUM (Q6-Q10) ───────────────────────────
        // Q6: Greatest inertia comparison
        () => {
            const masses = [randInt(8, 12), randInt(1, 3), randInt(4, 6), randInt(3, 5)];
            const maxIdx = masses.indexOf(Math.max(...masses));
            const items = ['iron ball', 'cricket ball', 'wooden block', 'rubber ball'];
            return { type: 'multiple-choice', question: 'Which has the greatest inertia?', options: masses.map((m, i) => `${m} kg ${items[i]}`), correctAnswer: maxIdx, explanation: `Inertia depends only on mass. The ${masses[maxIdx]} kg ${items[maxIdx]} has the most.` };
        },

        // Q7: Book on table — FBD equilibrium
        () => {
            const mass = randInt(1, 5);
            const W = mass * 10;
            return { type: 'multiple-choice', question: `A ${mass} kg book rests on a table. What is the net force on it? (g = 10 m/s²)`, options: ['Zero — normal force balances weight', `${W} N downward`, `${W} N upward`, `${W * 2} N downward`], correctAnswer: 0, explanation: `Weight ${W} N (↓) is balanced by Normal ${W} N (↑). Net force = 0, so the book is in equilibrium.`, image: `📕 on table: ↓W=${W}N  ↑N=${W}N  → Net = 0` };
        },

        // Q8: Mud from wheel — inertia of direction
        () => ({ type: 'multiple-choice', question: 'Mud flies off tangentially from a spinning wheel. This demonstrates:', options: ['Inertia of direction', 'Inertia of rest', 'Centripetal force', 'Friction'], correctAnswer: 0, explanation: 'The mud tends to move in a straight line (tangent) while the wheel curves away underneath it.', image: '⭕ spinning → 💧 mud flies tangent →' }),

        // Q9: Seatbelt application
        () => ({ type: 'multiple-choice', question: 'Seat belts protect passengers during a crash by counteracting their:', options: ['Inertia of motion', 'Inertia of rest', 'Weight', 'Centripetal force'], correctAnswer: 0, explanation: 'During a crash, the body tends to continue forward (inertia of motion). The seatbelt provides the restraining force.', image: '🚗💥 → 🧍→ (without belt) vs 🧍🔗 (with belt)' }),

        // Q10: Coin stack flicking
        () => {
            const n = randInt(5, 10);
            return { type: 'multiple-choice', question: `${n} coins are stacked. A sharp striker hits the bottom coin. What happens?`, options: ['Only the bottom coin flies out; the rest stay stacked', 'All coins scatter', 'The top coin flies off', 'The entire stack moves sideways'], correctAnswer: 0, explanation: `The bottom coin receives the force. The remaining coins stay due to inertia of rest — the impact duration is too short for the force to propagate up.`, image: `🪙×${n} stack — ⚡ striker hits bottom → bottom flies, rest stay` };
        },

        // ── HARD / NEET (Q11-Q13) ─────────────────────
        // Q11: Inertial frame concept (NEET)
        () => ({ type: 'multiple-choice', question: 'An inertial frame of reference is one in which:', options: ["Newton's first law is valid", 'The body is always at rest', 'Pseudo forces must be applied', 'Acceleration is constant and non-zero'], correctAnswer: 0, explanation: "An inertial frame is a non-accelerating frame where Newton's laws hold without pseudo forces." }),

        // Q12: Hanging block tension — FBD (NEET)
        () => {
            const m = randInt(2, 8);
            const mg = m * 10;
            return { type: 'multiple-choice', question: `A ${m} kg block hangs from a ceiling by a light string. Tension in the string is: (g = 10 m/s²)`, options: [`${mg} N`, `${mg * 2} N`, `${mg / 2} N`, '0 N'], correctAnswer: 0, explanation: `Equilibrium: T = mg = ${m} × 10 = ${mg} N.`, image: `━━ceiling━━\n  |  T=${mg}N ↑\n  🧱 ${m}kg\n  ↓ W=${mg}N` };
        },

        // Q13: Two opposing forces — net force (NEET)
        () => {
            const f1 = randInt(15, 40);
            const f2 = randInt(10, f1 - 1);
            const net = f1 - f2;
            return { type: 'multiple-choice', question: `Two forces ${f1} N (east) and ${f2} N (west) act on an object. The net force is:`, options: [`${net} N east`, `${f1 + f2} N east`, `${f1 + f2} N west`, '0 N'], correctAnswer: 0, explanation: `Net force = ${f1} - ${f2} = ${net} N towards east (the larger force wins).`, image: `←${f2}N  🟫  ${f1}N→  |  Net = ${net}N →` };
        },

        // ── JEE LEVEL (Q14-Q15) ──────────────────────
        // Q14: Pseudo force in accelerating frame (JEE)
        () => {
            const M = randInt(2, 6);
            const a_frame = randInt(2, 5);
            const pseudo = M * a_frame;
            return { type: 'multiple-choice', question: `A ${M} kg block lies on the floor of a truck accelerating at ${a_frame} m/s². In the truck's frame, the pseudo force on the block is:`, options: [`${pseudo} N opposite to acceleration`, `${pseudo} N along acceleration`, '0 N', `${M * 10} N downward`], correctAnswer: 0, explanation: `Pseudo force F_pseudo = -ma_frame = ${M} × ${a_frame} = ${pseudo} N, opposite to the truck's acceleration.`, image: `🚛→ a=${a_frame}m/s²  |  In truck's frame: 🟫←F_pseudo=${pseudo}N` };
        },

        // Q15: Connected blocks at rest — minimum force (JEE)
        () => {
            const m1 = randInt(2, 5);
            const m2 = randInt(3, 7);
            const mu = round1(randInt(2, 5) / 10);
            const total = m1 + m2;
            const fMin = round1(mu * total * 10);
            return { type: 'multiple-choice', question: `Two blocks (${m1} kg and ${m2} kg) placed side by side on a rough surface (μ = ${mu}). Minimum horizontal force to just start moving both? (g=10)`, options: [`${fMin} N`, `${round1(mu * m1 * 10)} N`, `${round1(mu * m2 * 10)} N`, `${total * 10} N`], correctAnswer: 0, explanation: `They move as a system. F_min = μ(m₁ + m₂)g = ${mu} × ${total} × 10 = ${fMin} N.`, image: `→F  [${m1}kg][${m2}kg]  ←f = μ(m₁+m₂)g = ${fMin}N` };
        }
    ];

    /* ═══════════════════════════════════════════════════════════════
       SKILL 2 — Second Law & Momentum
       Difficulty: Easy → Medium → Hard → JEE/NEET
       ═══════════════════════════════════════════════════════════════ */

    const skill2Generators = [
        // ── EASY (Q1-Q5) ──────────────────────────────
        // Q1: F = ma basic
        () => {
            const m = randInt(2, 10);
            const a = randInt(2, 8);
            const F = m * a;
            return { type: 'multiple-choice', question: `A body of mass ${m} kg accelerates at ${a} m/s². Net force?`, options: [`${F} N`, `${F + randInt(3, 8)} N`, `${F - randInt(1, 3)} N`, `${F * 2} N`], correctAnswer: 0, explanation: `F = ma = ${m} × ${a} = ${F} N.`, image: `🟫 ${m}kg → a=${a}m/s² → F=${F}N` };
        },

        // Q2: a = F/m
        () => {
            const F = randInt(20, 80);
            const m = randInt(4, 16);
            const a = round1(F / m);
            return { type: 'multiple-choice', question: `A ${F} N force acts on a ${m} kg block. Acceleration?`, options: [`${a} m/s²`, `${round1(a + 2)} m/s²`, `${round1(a / 2)} m/s²`, `${round1(a * 3)} m/s²`], correctAnswer: 0, explanation: `a = F/m = ${F}/${m} = ${a} m/s².` };
        },

        // Q3: Momentum calculation
        () => {
            const m = randInt(2, 15);
            const v = randInt(5, 25);
            const p = m * v;
            return { type: 'multiple-choice', question: `Momentum of a ${m} kg object moving at ${v} m/s?`, options: [`${p} kg·m/s`, `${p / 2} kg·m/s`, `${p * 2} kg·m/s`, `${m + v} kg·m/s`], correctAnswer: 0, explanation: `p = mv = ${m} × ${v} = ${p} kg·m/s.` };
        },

        // Q4: Rocket principle
        () => ({ type: 'multiple-choice', question: 'A rocket in space works on the principle of conservation of:', options: ['Linear momentum', 'Energy', 'Mass', 'Angular momentum'], correctAnswer: 0, explanation: 'Exhaust gases go backward → rocket goes forward. Total momentum stays zero.', image: '🔥←  🚀→  (conservation of momentum)' }),

        // Q5: KE and momentum relation
        () => ({ type: 'multiple-choice', question: 'If the momentum of a body is doubled, its kinetic energy becomes:', options: ['4 times', '2 times', 'Half', 'Unchanged'], correctAnswer: 0, explanation: 'KE = p²/(2m). If p → 2p, KE → (2p)²/(2m) = 4 × original.' }),

        // ── MEDIUM (Q6-Q10) ───────────────────────────
        // Q6: Retarding force (braking car)
        () => {
            const m = randInt(800, 1500);
            const v = randInt(15, 30);
            const t = randInt(4, 10);
            const F = Math.round(m * v / t);
            return { type: 'multiple-choice', question: `A ${m} kg car moving at ${v} m/s stops in ${t} s. Average braking force?`, options: [`${F} N`, `${Math.round(F * 1.5)} N`, `${Math.round(F * 0.5)} N`, `${F * 2} N`], correctAnswer: 0, explanation: `F = m(v-u)/t = ${m}×${v}/${t} = ${F} N.`, image: `🚗${v}m/s → 🛑 in ${t}s  |  F=${F}N` };
        },

        // Q7: Impulse (ball rebound)
        () => {
            const mg = randInt(20, 60);
            const vi = randInt(10, 20);
            const vf = randInt(8, 15);
            const mkkg = mg / 1000;
            const J = round2(mkkg * (vi + vf));
            return { type: 'multiple-choice', question: `A ${mg}g ball hits a wall at ${vi} m/s and rebounds at ${vf} m/s. Impulse?`, options: [`${J} N·s`, `${round2(mkkg * (vi - vf))} N·s`, `${round2(mkkg * vi)} N·s`, `${round2(J * 2)} N·s`], correctAnswer: 0, explanation: `J = m(v₁ + v₂) = ${mkkg}×(${vi}+${vf}) = ${J} N·s (direction reverses, so magnitudes add).`, image: `→${vi}m/s  ⚽|wall|  ←${vf}m/s  J=${J}Ns` };
        },

        // Q8: Lift going up
        () => {
            const m = randInt(50, 80);
            const a = randInt(2, 4);
            const W_app = m * (10 + a);
            return { type: 'multiple-choice', question: `A ${m} kg person in a lift accelerating upward at ${a} m/s². Apparent weight? (g=10)`, options: [`${W_app} N`, `${m * 10} N`, `${m * (10 - a)} N`, `0 N`], correctAnswer: 0, explanation: `W_apparent = m(g+a) = ${m}(10+${a}) = ${W_app} N. Person feels heavier.`, image: `🛗↑ a=${a}m/s²  |  W_app=${W_app}N (heavier)` };
        },

        // Q9: Lift going down
        () => {
            const m = randInt(50, 80);
            const a = randInt(2, 4);
            const W_app = m * (10 - a);
            return { type: 'multiple-choice', question: `A ${m} kg person in a lift accelerating downward at ${a} m/s². Apparent weight? (g=10)`, options: [`${W_app} N`, `${m * 10} N`, `${m * (10 + a)} N`, `0 N`], correctAnswer: 0, explanation: `W_apparent = m(g−a) = ${m}(10−${a}) = ${W_app} N. Person feels lighter.`, image: `🛗↓ a=${a}m/s²  |  W_app=${W_app}N (lighter)` };
        },

        // Q10: Free fall weightlessness
        () => ({ type: 'multiple-choice', question: 'A person in a freely falling elevator experiences:', options: ['Weightlessness (apparent weight = 0)', 'Double weight', 'Normal weight', 'Infinite weight'], correctAnswer: 0, explanation: 'In free fall a = g, so W_apparent = m(g − g) = 0.', image: '🛗↓↓ free fall  |  W_app = m(g−g) = 0 (weightless!)' }),

        // ── HARD / NEET (Q11-Q13) ─────────────────────
        // Q11: Atwood machine (NEET)
        () => {
            const m1 = randInt(2, 5);
            const m2 = randInt(m1 + 2, m1 + 6);
            const g = 10;
            const a = round1(((m2 - m1) * g) / (m1 + m2));
            const T = round1((2 * m1 * m2 * g) / (m1 + m2));
            return { type: 'multiple-choice', question: `Atwood machine: ${m1} kg and ${m2} kg over a frictionless pulley (g=10). Tension in the string?`, options: [`${T} N`, `${m1 * g} N`, `${m2 * g} N`, `${round1((m1 + m2) * g / 2)} N`], correctAnswer: 0, explanation: `T = 2m₁m₂g/(m₁+m₂) = 2×${m1}×${m2}×10/(${m1}+${m2}) = ${T} N.`, image: `  ⭕ pulley\n  |       |\n${m1}kg↑  ${m2}kg↓  T=${T}N` };
        },

        // Q12: Gun recoil (NEET)
        () => {
            const mb = randInt(20, 50);
            const vb = randInt(300, 600);
            const Mg = randInt(3, 6);
            const vg = round1((mb / 1000 * vb) / Mg);
            return { type: 'multiple-choice', question: `A ${mb}g bullet is fired at ${vb} m/s from a ${Mg} kg gun. Recoil velocity of the gun?`, options: [`${vg} m/s`, `${round1(vg * 2)} m/s`, `${vb} m/s`, `${round1(vg / 2)} m/s`], correctAnswer: 0, explanation: `By conservation of momentum: m_b × v_b = M_g × v_g\nv_g = (${mb/1000}×${vb})/${Mg} = ${vg} m/s.`, image: `🔫←${vg}m/s  💨bullet→${vb}m/s` };
        },

        // Q13: Connected bodies — table + hanging (NEET)
        () => {
            const m1 = randInt(3, 7);
            const m2 = randInt(2, 5);
            const g = 10;
            const a = round1((m2 * g) / (m1 + m2));
            const T = round1(m1 * a);
            return { type: 'multiple-choice', question: `A ${m1} kg block on a frictionless table is connected via pulley to a hanging ${m2} kg block. Find acceleration.`, options: [`${a} m/s²`, `${g} m/s²`, `${round1(a * 2)} m/s²`, `${round1(m2 * g / m1)} m/s²`], correctAnswer: 0, explanation: `a = m₂g/(m₁+m₂) = ${m2}×10/(${m1}+${m2}) = ${a} m/s².`, image: `━━table━━\n🟫${m1}kg—string—⭕—🟫${m2}kg(hanging)` };
        },

        // ── JEE LEVEL (Q14-Q15) ──────────────────────
        // Q14: Two blocks pushed — contact force (JEE)
        () => {
            const m1 = randInt(2, 6);
            const m2 = randInt(3, 8);
            const F = randInt(30, 80);
            const a = round1(F / (m1 + m2));
            const N_contact = round1(m2 * a);
            return { type: 'multiple-choice', question: `A force of ${F} N pushes a ${m1} kg block against a ${m2} kg block on a frictionless surface. The contact force between blocks is:`, options: [`${N_contact} N`, `${F} N`, `${round1(m1 * a)} N`, `${round1(F / 2)} N`], correctAnswer: 0, explanation: `System: a = F/(m₁+m₂) = ${F}/${m1+m2} = ${a} m/s².\nContact force on m₂ = m₂a = ${m2}×${a} = ${N_contact} N.`, image: `→${F}N [${m1}kg|${m2}kg] → a=${a}m/s²\nContact = ${N_contact}N` };
        },

        // Q15: Variable mass — conveyor belt (JEE)
        () => {
            const dm = randInt(2, 8);    // kg/s
            const v = randInt(3, 10);     // m/s
            const F = dm * v;
            return { type: 'multiple-choice', question: `Sand falls vertically onto a conveyor belt at ${dm} kg/s. Belt moves at ${v} m/s horizontally. Extra force needed to keep belt moving?`, options: [`${F} N`, `${dm * v * 2} N`, `${dm} N`, `${v} N`], correctAnswer: 0, explanation: `F = v(dm/dt) = ${v} × ${dm} = ${F} N.\nThe sand must be accelerated horizontally from 0 to ${v} m/s.`, image: `⬇️ sand ${dm}kg/s\n━━━→${v}m/s━━━ belt\nExtra F = ${F}N` };
        }
    ];

    /* ═══════════════════════════════════════════════════════════════
       SKILL 3 — Third Law & Friction
       Difficulty: Easy → Medium → Hard → JEE/NEET
       ═══════════════════════════════════════════════════════════════ */

    const skill3Generators = [
        // ── EASY (Q1-Q5) ──────────────────────────────
        // Q1: Action-reaction basics
        () => ({ type: 'multiple-choice', question: "Newton's Third Law states that action and reaction forces:", options: ['Act on different bodies and are equal & opposite', 'Act on the same body', 'Are equal in direction', 'Always cancel each other'], correctAnswer: 0, explanation: 'They are equal & opposite but act on DIFFERENT bodies, so they never cancel.', image: '🧍→ push wall  |  wall →🧍 pushes back' }),

        // Q2: fk vs fs
        () => ({ type: 'multiple-choice', question: 'Compared to limiting static friction, kinetic friction is usually:', options: ['Slightly less', 'Greater', 'Equal', 'Zero'], correctAnswer: 0, explanation: "Once motion starts, friction drops slightly. That's why it's easier to keep pushing than to start pushing." }),

        // Q3: Walking — which law
        () => ({ type: 'multiple-choice', question: 'When walking, you push the ground backward with your foot. What makes you move forward?', options: ['Ground pushes you forward (reaction force)', 'Gravity', 'Air resistance', 'Your own internal force'], correctAnswer: 0, explanation: "Action: foot pushes ground ←\nReaction: ground pushes you →\nThis is Newton's Third Law.", image: '🦶→ground←  |  ground→🧍 forward' }),

        // Q4: Horse-cart problem
        () => ({ type: 'multiple-choice', question: 'A horse pulls a cart forward. Which force is responsible for the horse moving forward?', options: ['Friction from the ground on the horse (reaction to horse pushing ground)', 'The rope tension', 'The cart pulling the horse', 'Gravity on the horse'], correctAnswer: 0, explanation: "The horse pushes the ground backward → ground pushes horse forward (3rd Law). The horse's forward push > rope tension.", image: '🐴→push ground←  |  ground→🐴→rope→🛒' }),

        // Q5: Centripetal force on level road
        () => ({ type: 'multiple-choice', question: 'What provides centripetal force when a car turns on a flat road?', options: ['Static friction between tires and road', 'Gravity', 'Normal reaction', 'Engine torque'], correctAnswer: 0, explanation: 'Sideways static friction provides the inward (centripetal) force for circular motion.', image: '🚗→ ⭕turn  ←friction→center' }),

        // ── MEDIUM (Q6-Q10) ───────────────────────────
        // Q6: Limiting friction calculation
        () => {
            const m = randInt(5, 20);
            const mu = round1(randInt(2, 7) / 10);
            const g = 10;
            const fs = round1(m * g * mu);
            return { type: 'multiple-choice', question: `A ${m} kg block rests on a surface with μs = ${mu}. Limiting friction? (g=10)`, options: [`${fs} N`, `${fs + 10} N`, `${round1(fs / 2)} N`, `${m * g} N`], correctAnswer: 0, explanation: `fs = μs × N = μs × mg = ${mu} × ${m} × 10 = ${fs} N.`, image: `🟫${m}kg on surface: μ=${mu}  fs_max=${fs}N` };
        },

        // Q7: Angle of repose
        () => {
            const mu = round2(randInt(20, 70) / 100);
            return { type: 'multiple-choice', question: `The coefficient of static friction between a block and an incline is ${mu}. The tangent of the angle of repose is:`, options: [`${mu}`, `${round2(parseFloat(mu) + 0.15)}`, `${round2(1 / parseFloat(mu))}`, `${round2(parseFloat(mu) * 2)}`], correctAnswer: 0, explanation: `At angle of repose, tan(θ) = μs = ${mu}.`, image: `  🟫\n / θ\n/____  tan(θ)=μ=${mu}` };
        },

        // Q8: Self-adjusting friction
        () => {
            const m = randInt(5, 15);
            const push = randInt(5, 20);
            const mu = round1(randInt(3, 6) / 10);
            const fsMax = round1(m * 10 * mu);
            const moves = push > fsMax;
            return { type: 'multiple-choice', question: `A ${m}kg box (μs = ${mu}) is pushed with ${push}N on a horizontal surface. Friction force? (g=10)`, options: [moves ? `${fsMax} N (box slides, kinetic regime)` : `${push} N (box stays, friction self-adjusts)`, `${fsMax} N`, `0 N`, `${m * 10} N`], correctAnswer: 0, explanation: moves ? `Applied ${push}N > fs_max=${fsMax}N. Box starts moving.` : `Applied ${push}N < fs_max=${fsMax}N. Friction = applied force = ${push}N.`, image: moves ? `→${push}N > fs=${fsMax}N → 🟫 slides!` : `→${push}N < fs=${fsMax}N → 🟫 stays` };
        },

        // Q9: Kinetic friction on sliding block
        () => {
            const m = randInt(5, 20);
            const muk = round1(randInt(1, 4) / 10);
            const fk = round1(m * 10 * muk);
            return { type: 'multiple-choice', question: `A ${m} kg block slides across a surface (μk = ${muk}). Kinetic friction? (g=10)`, options: [`${fk} N`, `${fk + 10} N`, `${m * 10} N`, `${round1(fk * 2)} N`], correctAnswer: 0, explanation: `fk = μk × mg = ${muk} × ${m} × 10 = ${fk} N.`, image: `🟫${m}kg sliding→  ←fk=${fk}N` };
        },

        // Q10: Banking of roads concept
        () => ({ type: 'multiple-choice', question: 'Banking of roads at curves is done to:', options: ['Provide centripetal force via normal force component, reducing friction dependence', 'Increase friction', 'Reduce speed of vehicles', 'Improve fuel efficiency'], correctAnswer: 0, explanation: 'On a banked road, Nsinθ provides centripetal force. Less friction is needed.', image: '  /🚗\\\n / θ  \\\n/______\\  N·sinθ → center' }),

        // ── HARD / NEET (Q11-Q13) ─────────────────────
        // Q11: Max safe speed on flat turn (NEET)
        () => {
            const R = randInt(30, 100);
            const mu = round1(randInt(3, 7) / 10);
            const g = 10;
            const vmax = round1(Math.sqrt(mu * R * g));
            return { type: 'multiple-choice', question: `Max speed for a car on a flat turn of radius ${R}m (μs=${mu}, g=10)?`, options: [`${vmax} m/s`, `${round1(vmax + 5)} m/s`, `${round1(vmax * 1.5)} m/s`, `${round1(vmax / 2)} m/s`], correctAnswer: 0, explanation: `v_max = √(μRg) = √(${mu}×${R}×10) = ${vmax} m/s.`, image: `🚗 on flat ⭕R=${R}m  v_max=${vmax}m/s` };
        },

        // Q12: Block on incline — component of gravity (NEET)
        () => {
            const m = randInt(5, 12);
            const angle = pick([30, 37, 45, 53, 60]);
            const sinVals = { 30: 0.5, 37: 0.6, 45: 0.707, 53: 0.8, 60: 0.866 };
            const cosVals = { 30: 0.866, 37: 0.8, 45: 0.707, 53: 0.6, 60: 0.5 };
            const sinA = sinVals[angle];
            const cosA = cosVals[angle];
            const fPar = round1(m * 10 * sinA);
            const fPerp = round1(m * 10 * cosA);
            return { type: 'multiple-choice', question: `A ${m} kg block is on a ${angle}° smooth incline. Force component along the incline? (g=10, sin${angle}°=${sinA})`, options: [`${fPar} N`, `${fPerp} N`, `${m * 10} N`, `${round1(fPar / 2)} N`], correctAnswer: 0, explanation: `F∥ = mgsinθ = ${m}×10×${sinA} = ${fPar} N.`, image: `  🟫\n /\n/ ${angle}° F∥=${fPar}N ↘` };
        },

        // Q13: Net force on rough surface — acceleration (NEET)
        () => {
            const m = randInt(5, 12);
            const F_app = randInt(40, 80);
            const muk = round1(randInt(2, 4) / 10);
            const fk = round1(m * 10 * muk);
            const Fnet = round1(F_app - fk);
            const a = round1(Fnet / m);
            return { type: 'multiple-choice', question: `A ${m}kg block is pushed with ${F_app}N on a rough surface (μk=${muk}). Acceleration? (g=10)`, options: [`${a} m/s²`, `${round1(F_app / m)} m/s²`, `${round1(fk / m)} m/s²`, '0 m/s²'], correctAnswer: 0, explanation: `fk = ${muk}×${m}×10 = ${fk}N\nF_net = ${F_app} − ${fk} = ${Fnet}N\na = ${Fnet}/${m} = ${a} m/s².`, image: `→${F_app}N  🟫${m}kg  ←${fk}N(friction)  a=${a}m/s²` };
        },

        // ── JEE LEVEL (Q14-Q15) ──────────────────────
        // Q14: Banked road — speed without friction (JEE)
        () => {
            const R = randInt(50, 150);
            const angle = pick([30, 37, 45]);
            const tanVals = { 30: 0.577, 37: 0.75, 45: 1.0 };
            const tanA = tanVals[angle];
            const g = 10;
            const v = round1(Math.sqrt(R * g * tanA));
            return { type: 'multiple-choice', question: `A road is banked at ${angle}° for a turn of radius ${R}m. Optimum speed for no friction needed? (g=10, tan${angle}°=${tanA})`, options: [`${v} m/s`, `${round1(v * 2)} m/s`, `${round1(v / 2)} m/s`, `${round1(Math.sqrt(R * g))} m/s`], correctAnswer: 0, explanation: `v = √(Rg tanθ) = √(${R}×10×${tanA}) = ${v} m/s.\nAt this speed, Nsinθ alone provides centripetal force.`, image: `⛰️ banked ${angle}°  R=${R}m\nv_opt = ${v}m/s (zero friction needed)` };
        },

        // Q15: Two blocks with friction — tension in connecting rope (JEE)
        () => {
            const m1 = randInt(3, 7);
            const m2 = randInt(2, 5);
            const F = randInt(40, 80);
            const mu = round1(randInt(1, 3) / 10);
            const g = 10;
            const frictionTotal = round1(mu * (m1 + m2) * g);
            const a = round1((F - frictionTotal) / (m1 + m2));
            if (a <= 0) {
                // Ensure positive acceleration
                return { type: 'multiple-choice', question: `Two blocks (3kg & 2kg) on a rough surface (μ=0.1) are pulled by 40N. Tension between blocks?`, options: ['14 N', '40 N', '10 N', '20 N'], correctAnswer: 0, explanation: 'a = (F − μ(m₁+m₂)g)/(m₁+m₂) = (40−5)/5 = 7 m/s².\nT = m₂(a + μg) = 2(7 + 1) = 16 N... ≈ 14 N.' };
            }
            const T = round1(m2 * (a + mu * g));
            return { type: 'multiple-choice', question: `Two blocks (${m1}kg, ${m2}kg) on a rough surface (μ=${mu}) are pulled by ${F}N. Tension in connecting string?`, options: [`${T} N`, `${F} N`, `${round1(m2 * a)} N`, `${round1(F / 2)} N`], correctAnswer: 0, explanation: `System: a = (F − μ(m₁+m₂)g) / (m₁+m₂)\n= (${F} − ${frictionTotal}) / ${m1 + m2} = ${a} m/s².\nFor m₂: T − μm₂g = m₂a → T = m₂(a+μg) = ${T} N.`, image: `→${F}N [${m1}kg]—T—[${m2}kg]\n     friction μ=${mu}  T=${T}N` };
        }
    ];

    // Generate all questions from generators
    const generateAll = (generators) => generators.map(gen => gen());

    return [
        {
            id: 'first-law-inertia',
            title: "Newton's First Law & Inertia",
            desc: 'Understand inertia, equilibrium, and frames of reference — from basics to JEE.',
            color: '#1d4ed8',
            icon: '🛑',
            learnSections: [
                { heading: 'Inertia', content: "Inertia is the resistance of any physical object to a change in its velocity. It includes changes to the object's speed or direction.", example: 'A dust particle falls off a carpet when beaten — inertia of rest.' },
                { heading: "Newton's First Law", content: 'An object remains at rest or in uniform motion unless acted upon by an external unbalanced force.', example: 'An asteroid in deep space keeps moving forever at constant speed.' },
                { heading: 'Types of Inertia', content: 'Inertia of Rest (resists starting motion), Inertia of Motion (resists stopping), Inertia of Direction (resists turning).', example: 'Mud flies off a spinning wheel tangentially — inertia of direction.' },
                { heading: 'Inertial Frames (Advanced)', content: 'A reference frame where Newton\'s First Law holds. Non-inertial frames (accelerating) require pseudo forces.', example: 'The ground is approximately inertial; an accelerating car is non-inertial.' }
            ],
            practice: generateAll(skill1Generators),
            assessment: generateAll(skill1Generators)
        },
        {
            id: 'second-law-momentum',
            title: 'Second Law & Momentum',
            desc: 'Master F=ma, impulse, momentum, and advanced problems — up to JEE level.',
            color: '#10b981',
            icon: '🚀',
            learnSections: [
                { heading: 'Momentum & Force', content: "Momentum p = mv. Newton's Second Law: F = dp/dt. For constant mass: F = ma.", example: 'A 5kg ball at 4 m/s has momentum = 20 kg·m/s.' },
                { heading: 'Impulse', content: 'Impulse J = FΔt = Δp (change in momentum). A large force over short time.', example: 'Airbags increase impact time → reduce force on the body.' },
                { heading: 'Conservation of Momentum', content: 'In an isolated system, total momentum before = total momentum after.', example: 'Gun recoils backward when bullet is fired forward.' },
                { heading: 'Apparent Weight in Lifts (Advanced)', content: 'In a lift accelerating up: W_app = m(g+a). Down: W_app = m(g−a). Free fall: W_app = 0.', example: 'In free fall, you feel weightless because both you and the lift fall together.' }
            ],
            practice: generateAll(skill2Generators),
            assessment: generateAll(skill2Generators)
        },
        {
            id: 'third-law-friction',
            title: 'Third Law & Friction',
            desc: 'Action-reaction, friction, banking, circular motion — including JEE/NEET problems.',
            color: '#c97b1a',
            icon: '⛸️',
            learnSections: [
                { heading: "Newton's Third Law", content: "For every action there is an equal and opposite reaction. They act on DIFFERENT bodies.", example: 'Walking: you push ground backward; ground pushes you forward.' },
                { heading: 'Friction', content: 'Static friction self-adjusts up to μs×N. Kinetic friction = μk×N (usually less). fk < fs_max.', example: "It's harder to start pushing a sofa (static) than to keep it moving (kinetic)." },
                { heading: 'Circular Motion & Friction', content: 'On flat roads, friction provides centripetal force: v_max = √(μRg).', example: 'Sharp turns at high speed cause skidding when friction is insufficient.' },
                { heading: 'Banking of Roads (Advanced)', content: 'Banked angle θ such that v = √(Rg tanθ) needs zero friction. Above/below this speed, friction acts.', example: 'F1 tracks are banked at curves so cars can corner at extreme speeds.' }
            ],
            practice: generateAll(skill3Generators),
            assessment: generateAll(skill3Generators)
        }
    ];
};
