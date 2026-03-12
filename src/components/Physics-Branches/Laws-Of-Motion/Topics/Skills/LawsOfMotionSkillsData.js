export const generateLawsOfMotionSkillsData = () => {
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const round1 = (num) => Math.round(num * 10) / 10;
    const round2 = (num) => Math.round(num * 100) / 100;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

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

    

    /* ═══════════════════════════════════════════════════════════════
       SKILL 4 — Equilibrium of Forces
       ═══════════════════════════════════════════════════════════════ */

    const skill4Generators = [
        () => ({ type: 'multiple-choice', question: 'A body is in translational equilibrium when:', options: ['The net force on it is zero', 'It is at rest only', 'It has zero velocity', 'It has maximum acceleration'], correctAnswer: 0, explanation: 'Translational equilibrium: ΣF = 0. The body can be at rest OR moving with constant velocity.' }),

        () => {
            const m = randInt(2, 8);
            const angle = pick([30, 45, 60]);
            const sinV = {30: 0.5, 45: 0.707, 60: 0.866};
            const cosV = {30: 0.866, 45: 0.707, 60: 0.5};
            const N = round1(m * 10 * cosV[angle]);
            return { type: 'multiple-choice', question: `A ${m} kg block rests on a smooth inclined plane of angle ${angle}°. The normal force is: (g=10, cos${angle}°=${cosV[angle]})`, options: [`${N} N`, `${m*10} N`, `${round1(m*10*sinV[angle])} N`, `${round1(N*2)} N`], correctAnswer: 0, explanation: `N = mg cos θ = ${m}×10×${cosV[angle]} = ${N} N.` };
        },

        () => {
            const m = randInt(2, 8);
            const angle = pick([30, 45, 60]);
            const sinV = {30: 0.5, 45: 0.707, 60: 0.866};
            const F = round1(m * 10 * sinV[angle]);
            return { type: 'multiple-choice', question: `A ${m} kg block on a smooth ${angle}° incline. Force along the plane needed to keep it stationary? (g=10, sin${angle}°=${sinV[angle]})`, options: [`${F} N`, `${m*10} N`, `${round1(F*2)} N`, '0 N'], correctAnswer: 0, explanation: `F = mg sin θ = ${m}×10×${sinV[angle]} = ${F} N up the plane.` };
        },

        () => ({ type: 'multiple-choice', question: 'Lami\'s Theorem applies when:', options: ['Three concurrent coplanar forces are in equilibrium', 'Two forces act on a body', 'Forces are non-concurrent', 'Body is accelerating'], correctAnswer: 0, explanation: 'Lami\'s Theorem: If three concurrent coplanar forces are in equilibrium, each force is proportional to the sine of the angle between the other two.' }),

        () => ({ type: 'multiple-choice', question: 'The condition for translational equilibrium is:', options: ['ΣFx = 0 and ΣFy = 0', 'ΣF = ma', 'Only ΣFx = 0', 'F > 0'], correctAnswer: 0, explanation: 'For equilibrium, net force in EVERY direction must be zero: ΣFx = 0, ΣFy = 0.' }),

        () => {
            const m = randInt(3, 10);
            const T = m * 10;
            return { type: 'multiple-choice', question: `A ${m} kg object hangs from two strings making equal angles with the ceiling. If total vertical component of tensions equals weight, the weight is:`, options: [`${T} N`, `${T/2} N`, `${T*2} N`, '0 N'], correctAnswer: 0, explanation: `Weight = mg = ${m}×10 = ${T} N. Sum of vertical tension components must equal this.` };
        },

        () => ({ type: 'multiple-choice', question: 'For a block on a smooth inclined plane, which force component acts along the plane?', options: ['mg sin θ', 'mg cos θ', 'mg', 'mg tan θ'], correctAnswer: 0, explanation: 'Along the incline: mg sin θ (drives block down). Perpendicular: mg cos θ (balanced by normal force).' }),

        () => {
            const m = randInt(2, 6);
            const angle = 30;
            const gComp = round1(m * 10 * 0.5);
            return { type: 'multiple-choice', question: `A ${m} kg block slides down a smooth 30° incline. Its acceleration is: (g=10, sin30°=0.5)`, options: ['5 m/s²', '10 m/s²', '2.5 m/s²', `${m*5} m/s²`], correctAnswer: 0, explanation: 'a = g sin θ = 10 × 0.5 = 5 m/s² (independent of mass for smooth surface).' };
        },

        () => ({ type: 'multiple-choice', question: 'A body can be in equilibrium even if it is:', options: ['Moving with constant velocity', 'Accelerating upward', 'Decelerating', 'Rotating with increasing speed'], correctAnswer: 0, explanation: 'Equilibrium means ΣF = 0, which means a = 0. The body can be at rest or in uniform motion.' }),

        () => {
            const m1 = randInt(2, 5);
            const m2 = randInt(2, 5);
            const T = round1((2 * m1 * m2 * 10) / (m1 + m2));
            return { type: 'multiple-choice', question: `In an Atwood machine with masses ${m1} kg and ${m2} kg, the tension in the string is: (g=10)`, options: [`${T} N`, `${m1*10} N`, `${m2*10} N`, `${(m1+m2)*5} N`], correctAnswer: 0, explanation: `T = 2m₁m₂g/(m₁+m₂) = 2×${m1}×${m2}×10/${m1+m2} = ${T} N.` };
        },

        () => {
            const m = randInt(3, 8);
            const angle = 37;
            const a = round1(10 * 0.6);
            return { type: 'multiple-choice', question: `A ${m} kg block slides down a smooth 37° incline. Acceleration? (g=10, sin37°=0.6)`, options: [`${a} m/s²`, '10 m/s²', '3 m/s²', `${round1(a/2)} m/s²`], correctAnswer: 0, explanation: `a = g sin θ = 10 × 0.6 = ${a} m/s².` };
        },

        () => {
            const m = randInt(5, 15);
            const angle = pick([30, 45, 60]);
            const sinV = {30: 0.5, 45: 0.707, 60: 0.866};
            const cosV = {30: 0.866, 45: 0.707, 60: 0.5};
            const N = round1(m * 10 * cosV[angle]);
            const fPar = round1(m * 10 * sinV[angle]);
            return { type: 'multiple-choice', question: `A ${m} kg block on a ${angle}° smooth incline. The component of gravity perpendicular to the incline is:`, options: [`${N} N`, `${fPar} N`, `${m*10} N`, '0 N'], correctAnswer: 0, explanation: `Perpendicular component = mg cos θ = ${m}×10×${cosV[angle]} = ${N} N.` };
        },

        () => ({ type: 'multiple-choice', question: 'In Lami\'s Theorem, F₁/sin α = F₂/sin β = F₃/sin γ, where α, β, γ are:', options: ['Angles opposite to F₁, F₂, F₃ respectively', 'Angles between consecutive forces', 'All equal to 60°', 'Angles of the triangle formed'], correctAnswer: 0, explanation: 'α is the angle between F₂ and F₃ (opposite to F₁), and so on.' }),

        () => {
            const m = randInt(3, 7);
            const m2 = randInt(2, 5);
            const a = round1((m2 * 10) / (m + m2));
            return { type: 'multiple-choice', question: `A ${m} kg block on a frictionless table connected via pulley to a hanging ${m2} kg block. Acceleration?`, options: [`${a} m/s²`, '10 m/s²', `${round1(a*2)} m/s²`, `${round1(m2*10/m)} m/s²`], correctAnswer: 0, explanation: `a = m₂g/(m₁+m₂) = ${m2}×10/${m+m2} = ${a} m/s².` };
        },

        () => {
            const M = randInt(2, 6);
            const a_frame = randInt(2, 5);
            const pseudo = M * a_frame;
            return { type: 'multiple-choice', question: `A ${M} kg block on the floor of a truck accelerating at ${a_frame} m/s². In the truck\'s frame, the pseudo force on the block is:`, options: [`${pseudo} N opposite to acceleration`, `${pseudo} N along acceleration`, '0 N', `${M * 10} N downward`], correctAnswer: 0, explanation: `Pseudo force = ma_frame = ${M}×${a_frame} = ${pseudo} N, opposite to truck's acceleration.` };
        }
    ];

    /* ═══════════════════════════════════════════════════════════════
       SKILL 5 — Friction
       ═══════════════════════════════════════════════════════════════ */

    const skill5Generators = [
        () => ({ type: 'multiple-choice', question: 'Friction is a force that:', options: ['Opposes relative motion between surfaces in contact', 'Always opposes motion', 'Only acts on moving objects', 'Is independent of surface type'], correctAnswer: 0, explanation: 'Friction opposes relative motion (or tendency of relative motion) between surfaces in contact.' }),

        () => ({ type: 'multiple-choice', question: 'Compared to limiting static friction, kinetic friction is usually:', options: ['Slightly less', 'Greater', 'Equal', 'Zero'], correctAnswer: 0, explanation: "Once motion starts, friction drops slightly. That's why it's easier to keep pushing than to start pushing." }),

        () => {
            const m = randInt(5, 20);
            const mu = round1(randInt(2, 7) / 10);
            const fs = round1(m * 10 * mu);
            return { type: 'multiple-choice', question: `A ${m} kg block on a surface with μs = ${mu}. Maximum static friction? (g=10)`, options: [`${fs} N`, `${fs + 10} N`, `${round1(fs / 2)} N`, `${m * 10} N`], correctAnswer: 0, explanation: `fs_max = μs × N = ${mu} × ${m} × 10 = ${fs} N.` };
        },

        () => ({ type: 'multiple-choice', question: 'Friction does NOT depend on:', options: ['Area of contact between surfaces', 'Normal force', 'Nature of surfaces', 'Coefficient of friction'], correctAnswer: 0, explanation: 'Friction is independent of area of contact (2nd law of friction). This is a favourite NEET concept question.' }),

        () => ({ type: 'multiple-choice', question: 'The correct order of friction magnitudes is:', options: ['f_static(max) > f_kinetic > f_rolling', 'f_rolling > f_kinetic > f_static', 'f_kinetic > f_static > f_rolling', 'All are equal'], correctAnswer: 0, explanation: 'μs > μk > μrolling. Static limiting friction is always the largest.' }),

        () => {
            const mu = round2(randInt(20, 70) / 100);
            return { type: 'multiple-choice', question: `The coefficient of static friction between a block and an incline is ${mu}. The angle of repose is the angle whose tangent equals:`, options: [`${mu}`, `${round2(1/mu)}`, `${round2(mu*2)}`, `${round2(mu/2)}`], correctAnswer: 0, explanation: `At angle of repose, tan(θ) = μs = ${mu}.` };
        },

        () => {
            const m = randInt(5, 12);
            const F_app = randInt(40, 80);
            const muk = round1(randInt(2, 4) / 10);
            const fk = round1(m * 10 * muk);
            const Fnet = round1(F_app - fk);
            const a = round1(Fnet / m);
            return { type: 'multiple-choice', question: `A ${m}kg block pushed with ${F_app}N on a rough surface (μk=${muk}). Acceleration? (g=10)`, options: [`${a} m/s²`, `${round1(F_app / m)} m/s²`, `${round1(fk / m)} m/s²`, '0 m/s²'], correctAnswer: 0, explanation: `fk = ${muk}×${m}×10 = ${fk}N. F_net = ${F_app} − ${fk} = ${Fnet}N. a = ${Fnet}/${m} = ${a} m/s².` };
        },

        () => {
            const m = randInt(5, 15);
            const push = randInt(5, 20);
            const mu = round1(randInt(3, 6) / 10);
            const fsMax = round1(m * 10 * mu);
            const moves = push > fsMax;
            return { type: 'multiple-choice', question: `A ${m}kg box (μs = ${mu}) pushed with ${push}N horizontally. Friction force? (g=10)`, options: [moves ? `${fsMax} N (box slides)` : `${push} N (box stays, friction self-adjusts)`, `${fsMax} N`, '0 N', `${m * 10} N`], correctAnswer: 0, explanation: moves ? `Applied ${push}N > fs_max=${fsMax}N. Box starts moving.` : `Applied ${push}N < fs_max=${fsMax}N. Friction = applied force = ${push}N.` };
        },

        () => ({ type: 'multiple-choice', question: 'A body rests on an inclined plane of angle 30°. If μs = 1/√3, the body is:', options: ['Just in equilibrium at the verge of sliding', 'Sliding down', 'Accelerating down', 'Moving up'], correctAnswer: 0, explanation: 'tan(30°) = 1/√3 = μs. Since plane angle equals angle of repose, body is at the verge of sliding.' }),

        () => {
            const m = randInt(5, 20);
            const muk = round1(randInt(1, 4) / 10);
            const fk = round1(m * 10 * muk);
            return { type: 'multiple-choice', question: `A ${m} kg block slides across a surface (μk = ${muk}). Kinetic friction? (g=10)`, options: [`${fk} N`, `${fk + 10} N`, `${m * 10} N`, `${round1(fk * 2)} N`], correctAnswer: 0, explanation: `fk = μk × mg = ${muk} × ${m} × 10 = ${fk} N.` };
        },

        () => ({ type: 'multiple-choice', question: 'Rolling friction is experienced when:', options: ['A body rolls on a surface', 'A body slides on a surface', 'A body is at rest', 'There is no contact'], correctAnswer: 0, explanation: 'Rolling friction is much smaller than kinetic or static friction. This is why wheels were invented.' }),

        () => ({ type: 'multiple-choice', question: 'The angle of friction λ is related to μ by:', options: ['tan λ = μ', 'sin λ = μ', 'cos λ = μ', 'λ = μ'], correctAnswer: 0, explanation: 'tan λ = f/N = μ, where λ is angle between normal force and resultant of normal and friction.' }),

        () => {
            const m = randInt(5, 12);
            const angle = 37;
            const muk = 0.5;
            const decel = round1(10 * (0.6 + muk * 0.8));
            return { type: 'multiple-choice', question: `A ${m}kg block moving UP a rough 37° incline (μk=${muk}). Deceleration while going up? (g=10, sin37°=0.6, cos37°=0.8)`, options: [`${decel} m/s²`, '6 m/s²', '4 m/s²', '2 m/s²'], correctAnswer: 0, explanation: `Going up: both gravity (mg sin θ) and friction (μk mg cos θ) act down. a = g(sin θ + μk cos θ) = 10(0.6 + 0.5×0.8) = ${decel} m/s².` };
        },

        () => {
            const m1 = randInt(2, 5);
            const m2 = randInt(3, 7);
            const mu = round1(randInt(2, 5) / 10);
            const total = m1 + m2;
            const fMin = round1(mu * total * 10);
            return { type: 'multiple-choice', question: `Two blocks (${m1}kg, ${m2}kg) side by side on rough surface (μ=${mu}). Min force to start moving both? (g=10)`, options: [`${fMin} N`, `${round1(mu * m1 * 10)} N`, `${round1(mu * m2 * 10)} N`, `${total * 10} N`], correctAnswer: 0, explanation: `F_min = μ(m₁+m₂)g = ${mu}×${total}×10 = ${fMin} N.` };
        },

        () => {
            const m = randInt(10, 20);
            const mu = 0.4;
            const fs = round1(m * 10 * mu);
            return { type: 'multiple-choice', question: `The coefficient of static friction between a ${m}kg block and floor is ${mu}. Maximum static friction is: (g=10)`, options: [`${fs} N`, `${m*10} N`, `${round1(fs/2)} N`, `${round1(fs*2)} N`], correctAnswer: 0, explanation: `f_s(max) = μs × N = ${mu} × ${m*10} = ${fs} N.` };
        }
    ];

    /* ═══════════════════════════════════════════════════════════════
       SKILL 6 — Circular Motion
       ═══════════════════════════════════════════════════════════════ */

    const skill6Generators = [
        () => ({ type: 'multiple-choice', question: 'In uniform circular motion, the acceleration is directed:', options: ['Toward the centre of the circle', 'Along the tangent', 'Away from the centre', 'Along the velocity'], correctAnswer: 0, explanation: 'Centripetal acceleration = v²/r, directed toward the centre. Speed is constant but direction changes.' }),

        () => ({ type: 'multiple-choice', question: 'Centripetal force is:', options: ['Not a new force — it is provided by existing forces like tension, friction, or gravity', 'A separate fundamental force', 'Always equal to weight', 'Only acts in non-inertial frames'], correctAnswer: 0, explanation: 'Centripetal force is provided by tension (string), friction (car turning), gravity (orbits), or normal force (banking).' }),

        () => {
            const m = randInt(1, 5);
            const v = randInt(3, 8);
            const r = randInt(1, 4);
            const T = round1(m * v * v / r);
            return { type: 'multiple-choice', question: `A ${m} kg stone on a string whirled in a horizontal circle of radius ${r} m at ${v} m/s. Tension?`, options: [`${T} N`, `${round1(T/2)} N`, `${round1(T*2)} N`, `${m*10} N`], correctAnswer: 0, explanation: `T = mv²/r = ${m}×${v*v}/${r} = ${T} N.` };
        },

        () => ({ type: 'multiple-choice', question: 'What provides centripetal force when a car turns on a flat road?', options: ['Static friction between tires and road', 'Gravity', 'Normal reaction', 'Engine torque'], correctAnswer: 0, explanation: 'Sideways static friction provides the inward (centripetal) force for circular motion on a flat road.' }),

        () => ({ type: 'multiple-choice', question: 'Centripetal force is real; centrifugal force is:', options: ['Pseudo (not real in an inertial frame)', 'Also real', 'Greater than centripetal', 'Only in vertical circles'], correctAnswer: 0, explanation: 'In an inertial frame (standard NEET problems), there is no centrifugal force. It only appears in rotating (non-inertial) frames.' }),

        () => {
            const R = randInt(30, 100);
            const mu = round1(randInt(3, 7) / 10);
            const vmax = round1(Math.sqrt(mu * R * 10));
            return { type: 'multiple-choice', question: `Max speed for a car on a flat turn of radius ${R}m (μs=${mu}, g=10)?`, options: [`${vmax} m/s`, `${round1(vmax + 5)} m/s`, `${round1(vmax * 1.5)} m/s`, `${round1(vmax / 2)} m/s`], correctAnswer: 0, explanation: `v_max = √(μRg) = √(${mu}×${R}×10) = ${vmax} m/s.` };
        },

        () => ({ type: 'multiple-choice', question: 'Banking of roads at curves is done to:', options: ['Provide centripetal force via normal force component, reducing friction dependence', 'Increase friction', 'Reduce speed', 'Improve fuel efficiency'], correctAnswer: 0, explanation: 'On a banked road, N sin θ provides centripetal force directly. Less friction is needed.' }),

        () => {
            const R = randInt(50, 150);
            const angle = pick([30, 37, 45]);
            const tanV = { 30: 0.577, 37: 0.75, 45: 1.0 };
            const v = round1(Math.sqrt(R * 10 * tanV[angle]));
            return { type: 'multiple-choice', question: `Road banked at ${angle}° for a turn of radius ${R}m. Speed requiring no friction? (g=10, tan${angle}°=${tanV[angle]})`, options: [`${v} m/s`, `${round1(v * 2)} m/s`, `${round1(v / 2)} m/s`, `${round1(Math.sqrt(R * 10))} m/s`], correctAnswer: 0, explanation: `v = √(Rg tan θ) = √(${R}×10×${tanV[angle]}) = ${v} m/s.` };
        },

        () => {
            const m = randInt(800, 1500);
            const R = randInt(30, 80);
            const mu = 0.5;
            const vmax = round1(Math.sqrt(mu * R * 10));
            return { type: 'multiple-choice', question: `A ${m} kg car on a circular road of radius ${R}m. If μs = ${mu}, max speed without skidding? (g=10)`, options: [`√${mu*R*10} ≈ ${vmax} m/s`, `${round1(vmax+5)} m/s`, '10 m/s', `${round1(vmax*2)} m/s`], correctAnswer: 0, explanation: `v_max = √(μRg) = √(${mu}×${R}×10) = ${vmax} m/s. Note: mass doesn't matter!` };
        },

        () => ({ type: 'multiple-choice', question: 'For a frictionless banked road, the relationship between banking angle θ and speed v is:', options: ['tan θ = v²/(rg)', 'sin θ = v²/(rg)', 'cos θ = v²/(rg)', 'θ = v/r'], correctAnswer: 0, explanation: 'On frictionless banked road: N sin θ = mv²/r and N cos θ = mg. Dividing: tan θ = v²/(rg).' }),

        () => ({ type: 'multiple-choice', question: 'In a situation where a planet orbits the Sun, the centripetal force is provided by:', options: ['Gravitational force', 'Tension', 'Friction', 'Normal force'], correctAnswer: 0, explanation: 'For planetary orbits, gravitational attraction provides the necessary centripetal force: F_g = mv²/r.' }),

        () => ({ type: 'multiple-choice', question: 'A car going around a curve at a speed greater than the optimum speed on a banked road. Friction acts:', options: ['Toward the centre (inward and down the bank)', 'Away from the centre', 'Along the velocity', 'Vertically upward'], correctAnswer: 0, explanation: 'Above optimum speed, the car tends to skid outward. Friction acts inward to provide additional centripetal force.' }),

        () => {
            const Tmax = randInt(80, 120);
            const m = 1;
            const r = 1;
            const vSq = Tmax - m * 10;
            const v = round1(Math.sqrt(vSq));
            return { type: 'multiple-choice', question: `String can withstand ${Tmax} N. A ${m} kg stone whirled in vertical circle of radius ${r} m. Max speed at bottom without breaking? (g=10)`, options: [`√${vSq} ≈ ${v} m/s`, '10 m/s', `${round1(Math.sqrt(Tmax))} m/s`, `${round1(v/2)} m/s`], correctAnswer: 0, explanation: `At bottom: T - mg = mv²/r → ${Tmax} - 10 = v² → v = √${vSq} ≈ ${v} m/s.` };
        },

        () => ({ type: 'multiple-choice', question: 'The centripetal acceleration can also be written as:', options: ['ω²r, where ω is angular velocity', 'ωr²', 'ω/r', 'v/r²'], correctAnswer: 0, explanation: 'a_c = v²/r = ω²r = vω. All three forms are equivalent since v = ωr.' }),

        () => {
            const m = randInt(2, 5);
            const v = randInt(4, 10);
            const r = randInt(2, 5);
            const Fc = round1(m * v * v / r);
            return { type: 'multiple-choice', question: `Centripetal force on a ${m} kg object moving at ${v} m/s in a circle of radius ${r} m?`, options: [`${Fc} N`, `${round1(Fc/2)} N`, `${m*10} N`, `${round1(Fc*2)} N`], correctAnswer: 0, explanation: `F_c = mv²/r = ${m}×${v*v}/${r} = ${Fc} N.` };
        }
    ];

    // Generate all questions from generators
    const generateAll = (generators) => generators.map(gen => gen());

    return [
        {
            id: 'newtons-three-laws',
            title: "Newton's Three Laws",
            desc: "Master inertia (1st Law), F = ma (2nd Law), and action-reaction (3rd Law) — the complete foundation of mechanics.",
            color: '#1d4ed8',
            icon: '📐',
            learnSections: [
                { heading: "Newton's First Law — Law of Inertia", content: "A body continues in its state of rest or uniform motion in a straight line unless acted upon by a net external force. Inertia is the tendency of a body to resist change — it is NOT a force, but a property measured by mass. Types: Inertia of Rest, Inertia of Motion, Inertia of Direction.", example: "Dust on a carpet flies off when beaten (inertia of rest). Mud flies tangentially off a spinning wheel (inertia of direction). Mass measures inertia — heavier body has more inertia." },
                { heading: "Newton's Second Law — F = ma", content: "The rate of change of momentum is directly proportional to applied force: F = dp/dt = ma (for constant mass). This gives us the quantitative definition of force. Unit: Newton (N) = 1 kg·m/s². The First Law is a special case when F = 0.", example: "A 5 kg block pushed by 20 N on a frictionless surface: a = F/m = 20/5 = 4 m/s². Always use component form: Fx = max, Fy = may." },
                { heading: "Newton's Third Law — Action–Reaction", content: "For every action, there is an equal and opposite reaction. Key: they act on DIFFERENT bodies, are simultaneous, and equal in magnitude. They never cancel because they act on different bodies.", example: "Walking: foot pushes ground backward (action) → ground pushes you forward (reaction). Rocket: gases expelled backward → rocket propelled forward." },
                { heading: "Inertial Frames (Advanced)", content: "An inertial frame is a non-accelerating reference frame where Newton's laws hold without pseudo forces. In a non-inertial (accelerating) frame, pseudo force F_pseudo = -ma_frame must be added.", example: "Ground is approximately inertial. An accelerating car/train is non-inertial — objects appear to slide backward due to pseudo force." }
            ],
            practice: generateAll(skill1Generators),
            assessment: generateAll(skill1Generators)
        },
        {
            id: 'momentum-impulse',
            title: 'Momentum & Impulse',
            desc: 'Understand linear momentum p = mv, impulse J = FΔt = Δp, and their applications in real-world scenarios.',
            color: '#10b981',
            icon: '🚀',
            learnSections: [
                { heading: 'Linear Momentum', content: "Momentum p = mv is a vector quantity (direction = direction of velocity). SI unit: kg·m/s. Newton's Second Law in momentum form: F = Δp/Δt. For constant mass, this simplifies to F = ma.", example: 'A 2 kg ball at 5 m/s has momentum = 10 kg·m/s. If momentum doubles, KE becomes 4 times (since KE = p²/2m).' },
                { heading: 'Impulse', content: 'Impulse J = F·Δt = Δp = mv − mu. SI unit: N·s = kg·m/s. Impulse equals the change in momentum. By increasing the time of impact (Δt), the peak force is reduced while keeping the same impulse.', example: 'Cricket player draws hands back while catching → increases Δt → reduces F on hands. Same principle: airbags, cushions, helmets.' },
                { heading: 'Apparent Weight in Lifts', content: 'Lift accelerating UP: W_apparent = m(g+a) — person feels heavier. Lift accelerating DOWN: W_apparent = m(g−a) — person feels lighter. Free fall (a=g): W_apparent = 0 — weightlessness!', example: 'A 60 kg person in a lift accelerating down at 2 m/s²: Apparent weight = 60(10−2) = 480 N (reads 48 kg on scale).' },
                { heading: 'NEET Traps', content: "If same impulse acts on two bodies of different masses: Δv = J/m — smaller mass gets larger velocity change. For a ball bouncing off a wall, velocities add (direction reverses): J = m(v₁ + v₂).", example: 'Ball hits wall at 4 m/s, rebounds at 4 m/s: Δp = m(4+4) = 8m (not zero, because direction reverses!).' }
            ],
            practice: generateAll(skill2Generators),
            assessment: generateAll(skill2Generators)
        },
        {
            id: 'conservation-momentum',
            title: 'Conservation of Momentum',
            desc: 'When no external force acts, total momentum stays constant — gun recoil, explosions, and collisions.',
            color: '#7c3aed',
            icon: '💥',
            learnSections: [
                { heading: 'The Law', content: "If F_ext = 0, then p_total = constant. In equation form: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. This follows directly from Newton's Third Law — internal forces cancel in pairs.", example: 'Derived from 3rd Law: F_AB = −F_BA → dp_A/dt + dp_B/dt = 0 → p_total = constant.' },
                { heading: 'Applications', content: 'Gun recoil: both at rest initially (p=0), after firing m_gun × v_gun = m_bullet × v_bullet. Explosion: fragments fly apart such that Σm_i·v_i = 0. Rocket propulsion: exhaust goes backward, rocket goes forward.', example: 'A 5 kg gun fires a 50g bullet at 300 m/s. Recoil velocity = (0.05×300)/5 = 3 m/s backward.' },
                { heading: 'Explosion Problems', content: 'A body at rest explodes into fragments. Total momentum remains zero. If two pieces, their momenta are equal and opposite. For KE ratio: KE₁/KE₂ = m₂/m₁ (lighter piece has more KE).', example: 'Bomb (12 kg at rest) splits into 4 kg and 8 kg. If KE of 8 kg piece is 200 J, then KE of 4 kg piece = (8/4)×200 = 400 J.' },
                { heading: 'NEET Scope', content: 'Focus on: gun-bullet recoil numericals, explosion problems (object splits into parts), identifying when conservation applies (no external force). 2D problems: use Pythagoras for resultant momentum.', example: 'NEET 2023: Body explodes into 3 pieces (ratio 1:1:2). Two equal pieces fly perpendicular at speed v. Speed of heavier piece = v√2/4.' }
            ],
            practice: generateAll(skill2Generators),
            assessment: generateAll(skill2Generators)
        },
        {
            id: 'equilibrium-forces',
            title: 'Equilibrium of Forces',
            desc: "Concurrent forces, free body diagrams, inclined planes, Lami's theorem, and connected body problems.",
            color: '#0d9488',
            icon: '⚖️',
            learnSections: [
                { heading: 'Translational Equilibrium', content: 'A body is in equilibrium when ΣF = 0, which means ΣFx = 0 AND ΣFy = 0. The body can be at rest OR moving with constant velocity. This is the condition for zero acceleration.', example: 'A block on a table: Normal force (↑) = Weight (↓), so ΣFy = 0 and the block stays in equilibrium.' },
                { heading: "Lami's Theorem", content: "If three concurrent coplanar forces are in equilibrium: F₁/sin α = F₂/sin β = F₃/sin γ, where α, β, γ are angles opposite to F₁, F₂, F₃. Rarely tested in NEET — focus on component resolution instead.", example: 'For NEET, resolving forces using components (Fx, Fy) is more useful than Lami\'s Theorem.' },
                { heading: 'Inclined Plane Analysis', content: 'On a smooth incline of angle θ: Normal force N = mg cos θ (perpendicular to plane). Force along plane = mg sin θ (drives block down). To hold block stationary: apply F = mg sin θ up the plane.', example: 'Block on 30° smooth incline: N = mg cos 30° = 0.866mg. Along plane: mg sin 30° = 0.5mg.' },
                { heading: 'Connected Bodies (Pulley)', content: 'Atwood machine: a = (m₂−m₁)g/(m₁+m₂), T = 2m₁m₂g/(m₁+m₂). Table-pulley system: a = m₂g/(m₁+m₂) where m₂ hangs, m₁ is on frictionless table.', example: 'Atwood: 4 kg and 6 kg → a = (6−4)×10/(6+4) = 2 m/s². T = 2×4×6×10/10 = 48 N.' }
            ],
            practice: generateAll(skill4Generators),
            assessment: generateAll(skill4Generators)
        },
        {
            id: 'friction',
            title: 'Friction',
            desc: 'Static, kinetic, and rolling friction — laws, angle of repose, and numerical problem-solving.',
            color: '#c97b1a',
            icon: '⛸️',
            learnSections: [
                { heading: 'Static Friction', content: 'Acts when body is at rest with an applied force. Self-adjusts to balance applied force up to a maximum: 0 ≤ fs ≤ μs·N. Limiting friction fs(max) = μs·N is the tipping point — exceed it and the body starts moving.', example: 'Push a heavy box gently: friction = applied force. Push harder until exceeding μs·N: box starts sliding.' },
                { heading: 'Kinetic Friction', content: 'Acts when body is already sliding: fk = μk·N (constant, independent of speed for NEET). Always less than limiting static friction (μk < μs). Laws: friction ∝ N, independent of area, independent of velocity, depends on surface nature.', example: 'A block slides with μk = 0.3 on a surface. Kinetic friction = 0.3 × Normal force. It\'s easier to keep pushing than to start pushing.' },
                { heading: 'Angle of Friction & Repose', content: 'Angle of friction λ: tan λ = μ. Angle of repose θr: maximum incline angle for no sliding → tan θr = μs. Key result: θr = λ. On an incline: if θ < θr, block stays; if θ > θr, block slides.', example: 'Sand dunes have a characteristic slope = angle of repose for sand. At this angle: mg sin θ = μs × mg cos θ.' },
                { heading: 'Friction on Inclined Planes', content: 'Moving UP rough incline: both gravity and friction act down → a = g(sin θ + μk cos θ). Moving DOWN: friction acts up → a = g(sin θ − μk cos θ). Stationary on incline: f = mg sin θ (if below limiting).', example: 'Block on rough 37° incline (μk = 0.5) moving up: deceleration = 10(0.6 + 0.5×0.8) = 10 m/s².' }
            ],
            practice: generateAll(skill5Generators),
            assessment: generateAll(skill5Generators)
        },
        {
            id: 'circular-motion',
            title: 'Circular Motion',
            desc: 'Centripetal force and acceleration, vehicle dynamics on flat and banked roads, vertical circles.',
            color: '#ef4444',
            icon: '🔄',
            learnSections: [
                { heading: 'Centripetal Acceleration & Force', content: 'In uniform circular motion: ac = v²/r = ω²r (toward centre). Centripetal force Fc = mv²/r = mω²r. This is NOT a new force — it is provided by existing forces (tension, friction, gravity, normal force).', example: 'Stone on string: T provides Fc. Planet around Sun: gravity provides Fc. Car turning: friction provides Fc.' },
                { heading: 'Vehicle on Level Road', content: 'For a car turning on a flat road, static friction provides centripetal force. Maximum safe speed: vmax = √(μs·r·g). Exceeding this → car skids outward.', example: 'Car on flat turn, R = 40 m, μs = 0.5: vmax = √(0.5×40×10) = √200 ≈ 14.1 m/s.' },
                { heading: 'Banking of Roads', content: 'Roads banked at angle θ to reduce friction dependence. Frictionless banking: tan θ = v²/(rg), optimal speed v = √(rg tan θ). With friction: vmax = √[rg(tan θ + μs)/(1 − μs tan θ)].', example: 'Road banked at 30°, R = 100 m: v = √(100×10×tan30°) = √(577) ≈ 24 m/s (no friction needed).' },
                { heading: 'Centrifugal Force (NEET Trap)', content: 'Centripetal force is REAL; centrifugal force is PSEUDO. In an inertial frame (standard NEET problems), DO NOT add centrifugal force. It only appears in rotating non-inertial frames.', example: 'NEET misconception: "Why doesn\'t water fall from an inverted bucket?" Answer: At the top, mg and N both point down, providing mv²/r. Not centrifugal force!' }
            ],
            practice: generateAll(skill6Generators),
            assessment: generateAll(skill6Generators)
        }
    ];
};
