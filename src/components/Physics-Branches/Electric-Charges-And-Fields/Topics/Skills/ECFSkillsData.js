const randElem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const formatOpt = val => `${Number.isInteger(val) ? val : Number(val).toFixed(2)}`.replace(/\.00$/, '');
const shuffle = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const generateSkillPool = (generators, count) => {
    const pool = [];
    let attempts = 0;
    while (pool.length < count && attempts < 1000) {
        const gen = randElem(generators);
        const q = gen();
        if (!pool.some(existing => existing.question === q.question)) {
            pool.push(q);
        }
        attempts++;
    }
    return pool;
};

const skill1Generators = [
    () => {
        const n = randInt(2, 8) * 10;
        const electrons = n * Math.pow(10, 10);
        const charge = n * 1.6;
        const opts = shuffle([`${charge} nC`, `-${charge} nC`, `${charge * 2} nC`, `-${charge * 2} nC`]);
        return {
            type: 'multiple-choice',
            question: `A glass rod loses ${n} × 10¹⁰ electrons on rubbing. The net charge on the rod is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${charge} nC`),
            explanation: `Losing electrons gives a positive charge. $q = ne = (${n} \\times 10^{10}) \\times (1.6 \\times 10^{-19}) = ${charge} \\times 10^{-9} \\text{ C} = +${charge} \\text{ nC}$.`
        };
    },
    () => {
        const q1 = randInt(2, 12);
        const q2 = -randInt(2, 8);
        const res = (q1 + q2) / 2;
        const opts = shuffle([`${res} μC`, `${Math.abs(res)} μC`, `${q1 + q2} μC`, `0 μC`]);
        return {
            type: 'multiple-choice',
            question: `Two identical conducting spheres carry charges +${q1} μC and ${q2} μC. They are touched and separated. The final charge on each sphere is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${res} μC`),
            explanation: `By conservation and equal sharing: $q_{\\text{each}} = \\frac{q_1 + q_2}{2} = \\frac{${q1} + (${q2})}{2} = ${res} \\text{ \\mu C}$.`
        };
    },
    () => {
        const q1 = randInt(2, 6);
        const q2 = -randInt(1, 5);
        const q3 = randInt(1, 4);
        const total = q1 + q2 + q3;
        const opts = shuffle([`${total} μC`, `${Math.abs(q1) + Math.abs(q2) + Math.abs(q3)} μC`, `${total * 2} μC`, `0 μC`]);
        return {
            type: 'multiple-choice',
            question: `An isolated system contains three charges: +${q1} μC, ${q2} μC, and +${q3} μC. The total charge of the system is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${total} μC`),
            explanation: `Additivity of charge: $Q_{\\text{total}} = ${q1} + (${q2}) + ${q3} = ${total} \\text{ \\mu C}$.`
        };
    }
];

const skill2Generators = [
    () => {
        const q1 = randInt(2, 6);
        const q2 = randInt(2, 6);
        const r_cm = randInt(1, 3) * 10;
        const r = r_cm / 100;
        const f = 9 * 1000000000 * (q1 * 0.000001) * (q2 * 0.000001) / (r * r);
        const f_val = formatOpt(f);
        const opts = shuffle([`${f_val} N`, `${formatOpt(f * 2)} N`, `${formatOpt(f / 2)} N`, `${formatOpt(f * 10)} N`]);
        return {
            type: 'multiple-choice',
            question: `Two point charges +${q1} μC and +${q2} μC are separated by a distance of ${r_cm} cm in vacuum. The magnitude of the electrostatic force between them is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${f_val} N`),
            explanation: `Using Coulomb's Law: $F = \\frac{kq_1q_2}{r^2}$. $F = \\frac{9 \\times 10^9 \\times (${q1} \\times 10^{-6}) \\times (${q2} \\times 10^{-6})}{(${r})^2} = ${f_val} \\text{ N}$.`
        };
    },
    () => {
        const dist_factor = randElem([2, 3, 4]);
        const factor = dist_factor * dist_factor;
        const opts = shuffle([`$F/${factor}$`, `$F/${dist_factor}$`, `$${factor}F$`, `$${dist_factor}F$`]);
        return {
            type: 'multiple-choice',
            question: `The electrostatic force between two charges is $F$. If the distance between them is increased to ${dist_factor} times the original distance, the new force is:`,
            options: opts,
            correctAnswer: opts.indexOf(`$F/${factor}$`),
            explanation: `Force is inversely proportional to the square of the distance ($F \\propto 1/r^2$). If $r \\to ${dist_factor}r$, then $F \\to F/${factor}$.`
        };
    },
    () => {
        const q = randInt(2, 8);
        const ratio = randElem([2, 3, 4]);
        const q1_new = q * ratio;
        const d_factor = randElem([1.5, 2]);
        const opts = shuffle([`$\\frac{${ratio}}{${d_factor * d_factor}}F$`, `$\\frac{${ratio * 2}}{${d_factor * d_factor}}F$`, `$\\frac{${d_factor * d_factor}}{${ratio}}F$`, `$\\frac{${ratio}}{${d_factor}}F$`]);
        return {
            type: 'multiple-choice',
            question: `Two charges initially repel with force $F$. If one charge is increased by a factor of ${ratio} and the distance is increased by a factor of ${d_factor}, what is the new force in terms of $F$?`,
            options: opts,
            correctAnswer: opts.indexOf(`$\\frac{${ratio}}{${d_factor * d_factor}}F$`),
            explanation: `$F' = \\frac{k(q_1 \\times ${ratio})q_2}{(${d_factor}r)^2} = \\frac{${ratio}}{${d_factor * d_factor}} \\frac{kq_1q_2}{r^2} = \\frac{${ratio}}{${d_factor * d_factor}}F$.`
        };
    }
];

const skill3Generators = [
    () => {
        const q = randInt(2, 8);
        const r_cm = randInt(1, 5) * 10;
        const r = r_cm / 100;
        const e = (9 * Math.pow(10, 9) * q * Math.pow(10, -6)) / (r * r);
        const e_sci = e.toExponential(1).replace('e+', ' × 10^');
        const opts = shuffle([`${e_sci} N/C`, `${(e * 2).toExponential(1).replace('e+', ' × 10^')} N/C`, `${(e / 2).toExponential(1).replace('e+', ' × 10^')} N/C`, `${(e * 10).toExponential(1).replace('e+', ' × 10^')} N/C`]);
        return {
            type: 'multiple-choice',
            question: `The magnitude of the electric field at a distance of ${r_cm} cm from a point charge of +${q} μC is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${e_sci} N/C`),
            explanation: `$E = \\frac{kq}{r^2} = \\frac{9 \\times 10^9 \\times (${q} \\times 10^{-6})}{(${r})^2} = ${e_sci} \\text{ N/C}$.`
        };
    },
    () => {
        const F = randInt(2, 6) * 10;
        const q = randInt(1, 5) * 2;
        const e = F / (q * 0.001);
        const e_sci = e.toExponential(1).replace('e+', ' × 10^');
        const opts = shuffle([`${e_sci} N/C`, `${formatOpt(F / q)} N/C`, `${(e * 2).toExponential(1).replace('e+', ' × 10^')} N/C`, `${(e / 10).toExponential(1).replace('e+', ' × 10^')} N/C`]);
        return {
            type: 'multiple-choice',
            question: `A test charge of +${q} mC experiences a force of ${F} N in an electric field. The magnitude of the electric field is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${e_sci} N/C`),
            explanation: `$E = \\frac{F}{q} = \\frac{${F}}{${q} \\times 10^{-3}} = ${e_sci} \\text{ N/C}$.`
        };
    },
    () => {
        const d = randInt(2, 5) * 2;
        const opts = shuffle([`$d/3$`, `$d/2$`, `$d/4$`, `$2d/3$`]);
        return {
            type: 'multiple-choice',
            question: `Two positive charges $+4q$ and $+q$ are separated by a distance $d$. The point where the net electric field is zero is at what distance from $+q$?`,
            options: opts,
            correctAnswer: opts.indexOf(`$d/3$`),
            explanation: `Let the null point be at distance $x$ from $+q$. Then $E_1 = E_2 \\implies \\frac{k(q)}{x^2} = \\frac{k(4q)}{(d-x)^2} \\implies \\frac{1}{x} = \\frac{2}{d-x} \\implies d-x = 2x \\implies x = d/3$.`
        };
    }
];

const skill4Generators = [
    () => {
        const l = randInt(1, 5) * 0.1;
        const E = randInt(1, 5) * 1000;
        const area = l * l;
        const flux = E * area * Math.cos(Math.PI / 3);
        const f_flux = formatOpt(flux);
        const opts = shuffle([`${f_flux} N·m²/C`, `${formatOpt(flux * 2)} N·m²/C`, `${formatOpt(flux / 2)} N·m²/C`, `${formatOpt(flux * 1.5)} N·m²/C`]);
        return {
            type: 'multiple-choice',
            question: `A uniform electric field $E = ${E}$ N/C exists in space. What is the electric flux through a square of side ${formatOpt(l)} m if its normal makes an angle of $60^\\circ$ with the field?`,
            options: opts,
            correctAnswer: opts.indexOf(`${f_flux} N·m²/C`),
            explanation: `$\\Phi = EA\\cos\\theta$. Area $A = ${l}^2 = ${formatOpt(area)}$ m². $\\Phi = ${E} \\times ${formatOpt(area)} \\times \\cos(60^\\circ) = ${E} \\times ${formatOpt(area)} \\times 0.5 = ${f_flux} \\text{ N·m}^2\\text{/C}$.`
        };
    },
    () => {
        const q = randInt(2, 8);
        const opts = shuffle([`$\\frac{${q} \\mu\\text{C}}{\\varepsilon_0}$`, `$\\frac{${q} \\mu\\text{C}}{2\\varepsilon_0}$`, `$\\frac{${q} \\mu\\text{C}}{6\\varepsilon_0}$`, `$0$`]);
        return {
            type: 'multiple-choice',
            question: `A point charge of +${q} μC is placed exactly at the centre of a closed cubical surface. The total electric flux through the entire surface is:`,
            options: opts,
            correctAnswer: opts.indexOf(`$\\frac{${q} \\mu\\text{C}}{\\varepsilon_0}$`),
            explanation: `By Gauss's Law, the total flux through any closed surface enclosing a net charge $q_\\text{enc}$ is simply $q_\\text{enc}/\\varepsilon_0$. Here, total flux = $\\frac{${q} \\mu\\text{C}}{\\varepsilon_0}$.`
        };
    },
    () => {
        const q_in = randInt(3, 9);
        const q_out = randInt(2, 7);
        const opts = shuffle([`$\\frac{${q_in} \\mu\\text{C}}{\\varepsilon_0}$`, `$\\frac{${q_in + q_out} \\mu\\text{C}}{\\varepsilon_0}$`, `$\\frac{${Math.abs(q_in - q_out)} \\mu\\text{C}}{\\varepsilon_0}$`, `$\\frac{${q_out} \\mu\\text{C}}{\\varepsilon_0}$`]);
        return {
            type: 'multiple-choice',
            question: `A spherical Gaussian surface encloses a charge of +${q_in} μC. Another charge of +${q_out} μC is placed outside the surface. The net electric flux through the surface is:`,
            options: opts,
            correctAnswer: opts.indexOf(`$\\frac{${q_in} \\mu\\text{C}}{\\varepsilon_0}$`),
            explanation: `Flux through a closed surface depends only on the charge enclosed. $\\Phi = \\frac{q_\\text{enc}}{\\varepsilon_0} = \\frac{${q_in} \\mu\\text{C}}{\\varepsilon_0}$. Charges outside contribute zero net flux.`
        };
    }
];

const skill5Generators = [
    () => {
        const q = randInt(2, 8);
        const d_cm = randInt(2, 6);
        const p = q * 0.000001 * (d_cm / 100);
        const p_sci = p.toExponential(1).replace('e', ' × 10^');
        const opts = shuffle([`${p_sci} C·m`, `${(p / 2).toExponential(1).replace('e', ' × 10^')} C·m`, `${(p * 2).toExponential(1).replace('e', ' × 10^')} C·m`, `${(p * 10).toExponential(1).replace('e', ' × 10^')} C·m`]);
        return {
            type: 'multiple-choice',
            question: `Two charges $\\pm ${q}$ μC are separated by ${d_cm} cm. The magnitude of the electric dipole moment is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${p_sci} C·m`),
            explanation: `$p = q(2a) = (${q} \\times 10^{-6}) \\times (${d_cm} \\times 10^{-2}) = ${p_sci} \\text{ C·m}$. Note: The distance given is the full separation $2a$.`
        };
    },
    () => {
        const p_val = randInt(2, 6);
        const E = randInt(1, 5) * 1000;
        const torque = (p_val * Math.pow(10, -8)) * E;
        const t_sci = torque.toExponential(1).replace('e', ' × 10^');
        const opts = shuffle([`${t_sci} N·m`, `${(torque / 2).toExponential(1).replace('e', ' × 10^')} N·m`, `${(torque * 2).toExponential(1).replace('e', ' × 10^')} N·m`, `$0$`]);
        return {
            type: 'multiple-choice',
            question: `An electric dipole of moment ${p_val} × 10⁻⁸ C·m is placed in a uniform electric field of ${E} N/C such that it makes an angle of $90^\\circ$ with the field. The torque acting on it is:`,
            options: opts,
            correctAnswer: opts.indexOf(`${t_sci} N·m`),
            explanation: `$\\tau = pE\\sin\\theta$. At $90^\\circ$, $\\tau_\\text{max} = pE = (${p_val} \\times 10^{-8}) \\times ${E} = ${t_sci} \\text{ N·m}$.`
        };
    },
    () => {
        const opts = shuffle([`$-pE$`, `$0$`, `$pE$`, `$2pE$`]);
        return {
            type: 'multiple-choice',
            question: `What is the potential energy of an electric dipole of moment $p$ in a uniform electric field $E$ when it is in stable equilibrium?`,
            options: opts,
            correctAnswer: opts.indexOf(`$-pE$`),
            explanation: `Stable equilibrium occurs when $\\theta = 0^\\circ$ (dipole aligned with the field). $U = -pE\\cos(0^\\circ) = -pE$.`
        };
    }
];

const skill6Generators = [
    () => {
        const R = randInt(5, 15);
        const r = randInt(2, R - 1);
        const q = randInt(1, 9);
        const opts = shuffle([`0 N/C`, `$\\frac{kq}{${r}^2}$ N/C`, `$\\frac{kq}{${R}^2}$ N/C`, `$\\frac{kq${r}}{${R}^3}$ N/C`]);
        return {
            type: 'multiple-choice',
            question: `A charge $Q = ${q} \\mu C$ is uniformly distributed over the surface of a thin spherical shell of radius $R = ${R} \\text{ cm}$. What is the electric field at a distance of $r = ${r} \\text{ cm}$ from the centre?`,
            options: opts,
            correctAnswer: opts.indexOf(`0 N/C`),
            explanation: `For a thin spherical shell, the electric field inside the shell ($r < R$) is zero everywhere by Gauss's Law.`
        };
    },
    () => {
        const sigma = randInt(2, 8);
        const opts = shuffle([`$\\frac{\\sigma}{\\varepsilon_0}$`, `$\\frac{\\sigma}{2\\varepsilon_0}$`, `$\\frac{2\\sigma}{\\varepsilon_0}$`, `$0$`]);
        return {
            type: 'multiple-choice',
            question: `An infinite thin plane sheet of charge has a uniform surface charge density $\\sigma = ${sigma}\\mu\\text{C/m}^2$. The electric field $E$ at a distance $r$ from the sheet is:`,
            options: opts,
            correctAnswer: opts.indexOf(`$\\frac{\\sigma}{2\\varepsilon_0}$`),
            explanation: `By applying Gauss's Law with a pillbox acting as the Gaussian surface, $2EA = \\frac{\\sigma A}{\\varepsilon_0} \\implies E = \\frac{\\sigma}{2\\varepsilon_0}$.`
        };
    },
    () => {
        const lambda = randInt(2, 6);
        const r_cm = randInt(5, 20);
        const r = r_cm / 100;
        const e = (lambda * 0.000001) / (2 * 3.14159 * 8.854e-12 * r);
        const e_sci = e.toExponential(1).replace('e+', ' × 10^');
        const opts = shuffle([`${e_sci} N/C`, `${(e * 2).toExponential(1).replace('e+', ' × 10^')} N/C`, `${(e * 3.14).toExponential(1).replace('e+', ' × 10^')} N/C`, `${(e / 2).toExponential(1).replace('e+', ' × 10^')} N/C`]);
        return {
            type: 'multiple-choice',
            question: `An infinitely long straight wire has a uniform linear charge density of $\\lambda = ${lambda} \\mu\\text{C/m}$. The electric field at a distance of ${r_cm} cm from the wire is approximately:`,
            options: opts,
            correctAnswer: opts.indexOf(`${e_sci} N/C`),
            explanation: `$E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r} = \\frac{2k\\lambda}{r} = \\frac{2 \\times 9 \\times 10^9 \\times ${lambda} \\times 10^{-6}}{${r}} \\approx ${e_sci} \\text{ N/C}$.`
        };
    }
];

const skill7Generators = [
    () => {
        const a = randInt(2, 6);
        const opts = shuffle([`$0$`, `$\\frac{kq}{a^2}$`, `$\\frac{2kq}{a^2}$`, `$\\frac{4kq}{a^2}$`]);
        return {
            type: 'multiple-choice',
            question: `Four equal charges $+q$ are placed at the corners of a square of side $a$. What is the net electric field at the centre of the square?`,
            options: opts,
            correctAnswer: opts.indexOf(`$0$`),
            explanation: `By symmetry, the electric field vectors from opposite corners cancel each other out completely. Net $E = 0$.`
        };
    },
    () => {
        const R = randInt(5, 10);
        const lambda = randInt(1, 5);
        const opts = shuffle([`$\\frac{k \\lambda}{R}$`, `$\\frac{2k\\lambda}{R}$`, `0`, `$\\frac{\\lambda}{2\\pi\\varepsilon_0 R}$`]);
        return {
            type: 'multiple-choice',
            question: `A uniform ring of radius $R = ${R}$ cm has a uniform linear charge density $\\lambda$. The electric field at its centre is:`,
            options: opts,
            correctAnswer: opts.indexOf(`0`),
            explanation: `For an intact uniform ring, diametrically opposite elements produce equal and opposite electric fields at the centre. Net $E = 0$.`
        };
    },
    () => {
        const q = randInt(5, 15);
        const x = randInt(2, 6);
        const R = randInt(2, 4);
        const opts = shuffle([`$\\frac{k(${q}x)}{(R^2+x^2)^{3/2}}$`, `$\\frac{k(${q})}{x^2}$`, `$\\frac{k(${q})}{R^2}$`, `0`]);
        return {
            type: 'multiple-choice',
            question: `A ring of radius $R=${R}$ m carries a total charge $Q=${q}$ C. The electric field on its axis at a distance of $x=${x}$ m from the centre is given by:`,
            options: opts,
            correctAnswer: opts.indexOf(`$\\frac{k(${q}x)}{(R^2+x^2)^{3/2}}$`),
            explanation: `The formula for the electric field on the axis of a uniform ring is $E = \\frac{kQx}{(R^2+x^2)^{3/2}}$.`
        };
    }
];

export const generateECFSkillsData = () => {
    const pools = [
        generateSkillPool(skill1Generators, 30),
        generateSkillPool(skill2Generators, 30),
        generateSkillPool(skill3Generators, 30),
        generateSkillPool(skill4Generators, 30),
        generateSkillPool(skill5Generators, 30),
        generateSkillPool(skill6Generators, 30),
        generateSkillPool(skill7Generators, 30),
    ];

    return [
        {
            id: 'electric-charge-properties',
            icon: '⚡',
            color: '#4a2c8a',
            title: 'Electric Charge & Its Properties',
            desc: 'Apply quantisation, conservation, and additivity of charge to solve numerical and conceptual problems.',
            learnSections: [
            {
                icon: '🔢',
                heading: 'Quantisation — Working With q = ne',
                content: `Every charge problem involving "how many electrons" uses quantisation.

Formula: q = ne  (n = integer, e = 1.6 × 10⁻¹⁹ C)

Procedure:
1. Identify the charge given (q) or the number of electrons (n).
2. Use n = q/e to find number of electrons, or q = ne to find charge.
3. Sign: electrons gained → negative charge; electrons lost → positive charge.

Example:
A glass rod loses 5 × 10¹⁰ electrons on rubbing.
Charge = +5 × 10¹⁰ × 1.6 × 10⁻¹⁹ = +8 × 10⁻⁹ C = +8 nC.`,
                example: 'NEET trap: If a body has charge −3.2 × 10⁻¹⁸ C, the number of excess electrons = 3.2 × 10⁻¹⁸ / 1.6 × 10⁻¹⁹ = 20 electrons. Always divide by e = 1.6 × 10⁻¹⁹.'
            },
            {
                icon: '♻️',
                heading: 'Conservation — Two Spheres / Two Charges Problems',
                content: `Conservation of charge is tested in "touching/sharing" problems.

Rule: Total charge before = Total charge after (algebraic sum).

Two identical conducting spheres touched and separated:
Each gets q_each = (q₁ + q₂) / 2

If one sphere is grounded:
The grounded sphere gets charge 0 (ground absorbs all charge).
The other sphere keeps its induced charge.

Example:
Spheres A (+8 μC) and B (−2 μC) are touched, then separated.
Each gets (8 + (−2))/2 = +3 μC.`,
                example: 'Key: "identical conducting spheres" → equal sharing. "One sphere grounded" → that sphere becomes 0. These two cases cover 90% of conservation questions.'
            },
            {
                icon: '➕',
                heading: 'Additivity — Net Charge on a System',
                content: `Charges are scalars with sign. Total charge = algebraic sum of all charges.

For a system of charged particles:
Q_total = q₁ + q₂ + q₃ + … (with proper signs)

This applies when calculating:
• Net charge enclosed in a Gaussian surface
• Net charge on a body after gaining/losing electrons
• Net charge after two bodies exchange charge

Example:
Three charges: +3 μC, −5 μC, +2 μC.
Q_total = 3 − 5 + 2 = 0 μC (electrically neutral system).`,
                keyLabel: 'neet-note',
                example: 'Charge is a scalar quantity — do NOT add magnitudes. Always keep track of + and − signs. The net charge of an isolated system is invariant (constant).'
            }
        ],
            practice: pools[0].slice(0, 20),
            assessment: pools[0].slice(20, 30)
        },
        {
            id: 'coulombs-law',
            icon: '⚖️',
            color: '#be123c',
            title: "Coulomb's Law",
            desc: "Calculate electrostatic force between point charges using Coulomb's Law; apply superposition.",
            learnSections: [
            {
                icon: '📐',
                heading: "Coulomb's Law — The Two-Charge Formula",
                content: `F = kq₁q₂/r²

where k = 9 × 10⁹ N·m²/C² = 1/(4πε₀)

Steps to solve any Coulomb problem:
1. Convert all charges to Coulombs (μC → × 10⁻⁶; nC → × 10⁻⁹).
2. Convert distance to metres.
3. Substitute into F = kq₁q₂/r².
4. The sign of F gives direction: positive = repulsion, negative = attraction.
5. In most problems, state magnitude and specify direction separately.

Example:
q₁ = +3 μC, q₂ = −4 μC, r = 20 cm = 0.2 m.
F = 9×10⁹ × (3×10⁻⁶)(4×10⁻⁶) / (0.2)² = 9×10⁹ × 12×10⁻¹² / 0.04 = 2.7 N (attractive)`,
                keyLabel: 'neet-note',
                example: 'The Coulomb force is central (along the line joining the charges) and conservative. It obeys Newton\'s Third Law: F on q₁ due to q₂ = −F on q₂ due to q₁.'
            },
            {
                icon: '➕',
                heading: 'Superposition Principle — Multiple Charges',
                content: `Net force on charge q due to charges q₁, q₂, … qₙ:
F_net = F₁ + F₂ + … + Fₙ  (vector sum)

Method for superposition:
1. Find force due to each charge separately (magnitude + direction).
2. Resolve each force into x and y components.
3. Sum all x-components → Fₓ_total.
4. Sum all y-components → F_y_total.
5. Resultant: F = √(Fₓ² + F_y²)
6. Angle: θ = arctan(F_y/Fₓ)

Symmetry shortcut:
If charges are arranged symmetrically (equilateral triangle, square), many components cancel — always check for this first.`,
                example: 'Three equal charges +q at corners of equilateral triangle: force on any charge from the other two has equal magnitude but components along the triangle sides partially cancel, leaving a net force pointing away from the centroid.'
            },
            {
                icon: '📏',
                heading: 'Equilibrium Position Problems',
                content: `"Where should a third charge be placed so the net force on it is zero?"

For three collinear charges, the equilibrium point is found by:
1. Let the third charge be at distance x from one charge and (d − x) from the other.
2. Set |F₁| = |F₂| (forces equal and opposite).
3. Solve for x.

Special case — two like charges q₁ and q₂ separated by d:
Position of zero force (from q₁): x = d·√q₁ / (√q₁ + √q₂)

Note: For two unlike charges, no equilibrium point exists between them for a test charge. The neutral point is OUTSIDE the line, on the side of the smaller charge.`,
                keyLabel: 'neet-trap',
                example: 'NEET trap: If q₁ = 4q and q₂ = q (like charges), separated by d, the neutral point is at x = 2d/3 from q₂ (smaller charge). Check: forces at x = 2d/3 from q₂ are equal. Never guess the neutral point is at the midpoint unless q₁ = q₂.'
            }
        ],
            practice: pools[1].slice(0, 20),
            assessment: pools[1].slice(20, 30)
        },
        {
            id: 'electric-field',
            icon: '🌐',
            color: '#d97706',
            title: 'Electric Field Calculations',
            desc: 'Find the electric field at a point due to point charges and simple systems.',
            learnSections: [
            {
                icon: '📍',
                heading: 'Field Due to a Point Charge — Method',
                content: `E = kq/r² (magnitude)

Direction: Away from +q (radially outward); Toward −q (radially inward).

Steps:
1. Find r = distance from charge to the field point.
2. Compute E = kq/r².
3. Assign direction: +q → away from charge; −q → toward charge.
4. For multiple charges: find each E vector, then add (superposition).

Example:
E at 30 cm from a +5 μC charge:
E = 9×10⁹ × 5×10⁻⁶ / (0.3)² = 4.5×10⁴/0.09 = 5 × 10⁵ N/C (away from +5 μC).`,
                example: 'Test charge concept: The test charge q₀ is assumed to be infinitesimally small so it doesn\'t disturb the source charge. E = F/q₀ — divide the experienced force by q₀ to get E at that point.'
            },
            {
                icon: '↔️',
                heading: 'Field Due to an Electric Dipole — Two Key Cases',
                content: `Dipole moment: p = q × 2l (C·m), direction from −q to +q.

Case 1 — Axial point (on the axis of the dipole, distance r from centre, r >> 2l):
E_axis = 2kp/r³  (parallel to p, i.e., from −q toward +q direction)

Case 2 — Equatorial point (on the perpendicular bisector, distance r from centre):
E_eq = kp/r³     (antiparallel to p, i.e., from +q toward −q direction)

Memory trick: "Axis has 2, equatorial has 1" — E_axis = 2 × E_eq at same r.

At large r: both fall off as 1/r³ (faster than 1/r² for point charge).`,
                keyLabel: 'neet-note',
                example: 'NEET 2023 asked: "Which direction is the E field at an equatorial point?" Answer: antiparallel to dipole moment p. Many students get the direction wrong because they forget the ± contributions of each charge.'
            },
            {
                icon: '⚡',
                heading: 'Null Point — Where E = 0 for Two Charges',
                content: `For two charges q₁ and q₂ on a line, the electric field is zero at the null point.

Case 1 — Like charges (both positive or both negative):
Null point lies BETWEEN the charges.
Distance from q₁: x = d√q₁ / (√q₁ + √q₂)
where d = separation.

Case 2 — Unlike charges (one + one −):
Null point lies OUTSIDE the line segment, on the side of the SMALLER magnitude charge.

Cross-check: At the null point, confirm E from q₁ and E from q₂ are equal in magnitude and opposite in direction.`,
                keyLabel: 'neet-trap',
                example: 'Unlike charges: E is zero only outside the pair. If q₁ = +4q and q₂ = −q, the null point is beyond −q (smaller magnitude) on the extension of the line. Between the charges, both E₁ and E₂ point in the same direction — no cancellation.'
            }
        ],
            practice: pools[2].slice(0, 20),
            assessment: pools[2].slice(20, 30)
        },
        {
            id: 'field-lines-flux',
            icon: 'Φ',
            color: '#0f7b6c',
            title: 'Electric Field Lines & Flux',
            desc: 'Interpret field line diagrams; calculate electric flux through flat and closed surfaces.',
            learnSections: [
            {
                icon: '〰️',
                heading: 'Rules for Electric Field Lines',
                content: `Field lines are a visualisation tool — not physical objects. Memorise these 5 rules:

1. Start: originate at positive charges; terminate at negative charges.
2. Never cross: two field lines cannot intersect (E has a unique direction at each point).
3. Density encodes strength: closer together → stronger field.
4. Perpendicular at conductors: always enter/leave perpendicular to the surface of a conductor.
5. Never close on themselves in static E field (they can in magnetic fields).

And 2 key consequences:
• No field lines inside a conductor (E = 0 inside → no lines).
• Between two parallel plates: uniform field → parallel, equally-spaced straight lines.`,
                example: 'NEET question type: "Which diagram correctly shows the field lines between two opposite charges?" Answer: lines curve from + to −, with higher density near each charge (stronger field), and the lines on the outside form closed arcs.'
            },
            {
                icon: 'Φ',
                heading: 'Electric Flux — Calculation Method',
                content: `Φ = E·A·cosθ

where θ = angle between E⃗ and the area normal n̂ (outward normal for closed surfaces).

For a flat surface in uniform field:
• θ = 0° → Φ = EA (maximum, field perpendicular to surface)
• θ = 90° → Φ = 0 (field parallel to surface — no flux)
• θ = 180° → Φ = −EA (field enters through the surface)

For a closed surface:
Φ_total = ∮E·dA = q_enc/ε₀ (Gauss's Law)

Sign convention: outward flux = positive (+), inward flux = negative (−).`,
                keyLabel: 'neet-note',
                example: 'Flux through a cube face: If E is directed along +x axis and the cube has face area A, then: right face (normal = +x̂): Φ = EA; left face (normal = −x̂): Φ = −EA; top/bottom/front/back: Φ = 0. Total flux = 0 (no charge inside).'
            },
            {
                icon: '📦',
                heading: 'Gauss\'s Law — Applying It Correctly',
                content: `Φ_closed = q_enc/ε₀

Key points:
1. q_enc is the NET charge inside the Gaussian surface (algebraic sum).
2. The flux depends ONLY on enclosed charge, NOT on shape or size of Gaussian surface.
3. Charges outside the Gaussian surface contribute zero net flux.

Worked example:
A charge Q = 5 μC is placed inside a cube. Flux through the entire cube:
Φ = Q/ε₀ = 5×10⁻⁶ / 8.85×10⁻¹² = 5.65 × 10⁵ N·m²/C

Flux through ONE face of the cube (by symmetry):
Φ_one face = Φ/6 = 5.65×10⁵/6 ≈ 9.4 × 10⁴ N·m²/C`,
                example: 'NEET 2023: Charge Q at centre of cube → flux per face = Q/(6ε₀). This is the most commonly tested Gauss\'s Law application. The geometry of the cube doesn\'t matter — only the symmetry and q_enc matter.'
            }
        ],
            practice: pools[3].slice(0, 20),
            assessment: pools[3].slice(20, 30)
        },
        {
            id: 'electric-dipole',
            icon: '↔️',
            color: '#1d4ed8',
            title: 'Electric Dipole',
            desc: 'Calculate dipole moment, torque, potential energy and fields.',
            learnSections: [
            {
                icon: '📏',
                heading: 'Dipole Moment — What It Encodes',
                content: `An electric dipole = two equal and opposite charges +q and −q separated by 2l.

Dipole moment: p = q × 2l  (vector, C·m)
Direction: from −q to +q (convention!)

Why it matters:
• p encodes both the strength of the dipole and its orientation.
• All formulas for E and V at large r depend on p, not on q and l separately.

Common mistake: Students write p = q × l (using half-separation l). The full separation is 2l.
Correct: p = q × (2l).

Examples of dipoles in nature:
• HCl molecule: p ≈ 3.4 × 10⁻³⁰ C·m
• Water molecule: p ≈ 6.2 × 10⁻³⁰ C·m (makes it a polar solvent)`,
                example: 'NEET often gives charges and separation directly: e.g., "charges ±2 μC 4 cm apart" → p = 2×10⁻⁶ × 0.04 = 8 × 10⁻⁸ C·m. Do NOT halve the separation.'
            },
            {
                icon: '🔄',
                heading: 'Torque and Energy in Uniform Field',
                content: `When a dipole is placed in a uniform electric field E:

Torque: τ = pE sinθ
At θ = 0°: τ = 0 (stable equilibrium, p parallel to E)
At θ = 90°: τ = pE (maximum torque)
At θ = 180°: τ = 0 (unstable equilibrium, p antiparallel to E)

Potential energy: U = −pE cosθ  (with U = 0 at θ = 90°)
At θ = 0°: U = −pE (minimum → stable)
At θ = 180°: U = +pE (maximum → unstable)

Work done to rotate from θ₁ to θ₂:
W = pE(cosθ₁ − cosθ₂)`,
                keyLabel: 'neet-note',
                example: 'NEET 2020: "A dipole p in field E is at θ = 60°. Work needed to bring it to θ = 0°?" W = pE(cos60° − cos0°) = pE(0.5 − 1) = −0.5pE. Negative work means the field does the work (system releases energy).'
            },
            {
                icon: '📐',
                heading: 'Non-Uniform Field — Net Force on Dipole',
                content: `In a UNIFORM field: Net force = 0, only torque exists.

In a NON-UNIFORM field: Net force ≠ 0.
Along x-axis: F = p·(dE/dx) (component of force along the field gradient)

This net force causes: The dipole moves toward the region of stronger field (for p aligned with E).

Physical consequences:
• Polar molecules are attracted into regions of stronger E field — basis of dielectrophoresis.
• A dipole near a point charge experiences both force and torque.

Important for NEET: Distinguish clearly between uniform and non-uniform field questions. Ask: "Is the field the same everywhere in the region?"`,
                keyLabel: 'neet-trap',
                example: 'Trap: "A dipole is placed in an electric field. The net force on it is zero." This is only true in a UNIFORM field. In a non-uniform field, the net force is non-zero even if torque explains rotation.'
            }
        ],
            practice: pools[4].slice(0, 20),
            assessment: pools[4].slice(20, 30)
        },
        {
            id: 'gauss-law',
            icon: '🔵',
            color: '#15803d',
            title: "Gauss's Law",
            desc: "Apply Gauss's Law to find field for spherical, cylindrical, and planar distributions.",
            learnSections: [
            {
                icon: '⭕',
                heading: 'The Three Canonical Gaussian Surfaces',
                content: `Gauss's Law: Φ = q_enc/ε₀

The power of Gauss's Law lies in choosing the right surface for the geometry:

1. SPHERICAL surface — for:
   • Point charges (or any spherical distribution)
   • Solid/hollow charged spheres
   Result: E = kq/r² (outside); E = kqr/R³ (inside solid sphere)

2. CYLINDRICAL surface — for:
   • Infinite line charges / long wire with charge density λ
   • Long cylindrical conductor
   Result: E = λ/(2πε₀r) at distance r from wire

3. RECTANGULAR PILLBOX — for:
   • Infinite plane sheet with surface charge σ
   • Thin conducting plate
   Result: E = σ/(2ε₀) for non-conductor;
           E = σ/ε₀ at surface of conductor`,
                keyLabel: 'neet-note',
                example: 'Exam strategy: Read the problem, identify the geometry (spherical / cylindrical / planar), select the corresponding Gaussian surface, then pull E outside the integral. Never try to integrate E directly for symmetric distributions — Gauss\'s Law bypasses all integration.'
            },
            {
                icon: '🌐',
                heading: 'Inside vs Outside a Uniformly Charged Sphere',
                content: `For a uniformly charged solid sphere (charge Q, radius R):

OUTSIDE (r > R):
E = kQ/r² (same as a point charge at centre)
The entire sphere "looks like" a point charge.

INSIDE (r < R):
Only the charge within radius r matters:
q_enc = Q × (r³/R³) (proportional to volume)
E = kQr/R³ = Qr/(4πε₀R³)
E increases linearly from centre → surface.

At r = R: E = kQ/R² (both formulas agree at the surface)

For a hollow spherical shell:
• Outside: E = kQ/r²
• Inside: E = 0 (no enclosed charge)`,
                example: 'NEET: "A charge Q is uniformly distributed in a solid sphere. Find E at r = R/2." E = kQr/R³ = kQ(R/2)/R³ = kQ/(2R²). This is exactly half the surface field.'
            },
            {
                icon: '⚡',
                heading: 'Infinite Line Charge & Conductors',
                content: `Application 1 — Infinite line charge (λ C/m):
Gaussian surface: co-axial cylinder of radius r, length L.
Flux = E × 2πrL (only curved surface contributes; flat ends give zero flux because E is radial ⊥ to end normals)
q_enc = λL
E × 2πrL = λL/ε₀ → E = λ/(2πε₀r)

Application 2 — Conductor properties from Gauss's Law:
• Inside conductor: E = 0 (Gaussian surface inside → q_enc = 0)
• All free charge on the OUTER surface: No volume charges in equilibrium.
• Cavity inside conductor: If a charge +q is placed in the cavity, −q appears on inner wall, +q appears on outer surface. E inside conductor walls remains 0.`,
                keyLabel: 'neet-trap',
                example: 'Trap: "An uncharged conducting shell surrounds a charge +q at its centre. What is E inside the shell material?" → E = 0 (conductor). What charge appears on inner surface? → −q. Outer surface? → +q. Net charge on shell? → 0 (it was uncharged).'
            }
        ],
            practice: pools[5].slice(0, 20),
            assessment: pools[5].slice(20, 30)
        },
        {
            id: 'charge-distributions',
            icon: '⚡',
            color: '#c026d3',
            title: "Continuous Charge Distributions",
            desc: "Solve for electric fields of continuous bodies like rings and lines using integration/symmetry.",
            learnSections: [
            {
                icon: 'λ',
                heading: 'Linear Charge Density (λ) — Wires and Rods',
                content: `λ = charge per unit length = dq/dl  (C/m)

Computing E:
• For an infinite straight wire using Gauss's Law:
  E = λ/(2πε₀r) [radially outward for +λ, at distance r]

• For a finite rod or arc, you must integrate:
  dE = kdq/r²; q = λ·dl (not tested in most NEET problems)

Practical usage:
If you're given a total charge Q on a wire of length L:
λ = Q/L → use formula.

Example:
Wire: Q = 40 μC, L = 1 m → λ = 40 μC/m.
E at r = 0.5 m from infinite wire:
E = λ/(2πε₀r) = 40×10⁻⁶/(2π × 8.85×10⁻¹² × 0.5) = 40×10⁻⁶/2.79×10⁻¹¹ ≈ 1.43 × 10⁶ N/C.`,
                example: 'Key fact: The field of an infinite wire depends on 1/r (not 1/r²). This is because more "length" of the wire contributes at a given distance — field falls off slower than a point charge.'
            },
            {
                icon: 'σ',
                heading: 'Surface Charge Density (σ) — Sheets and Plates',
                content: `σ = charge per unit area = dq/dA  (C/m²)

Results from Gauss's Law:

1. Infinite non-conducting plane sheet:
   E = σ/(2ε₀)  on each side
   Field is uniform and perpendicular to the sheet.
   Distance from the sheet does NOT matter!

2. Conducting plate (one surface):
   E = σ/ε₀  just outside the conductor surface
   E = 0 inside the conductor

3. Two parallel conducting plates (capacitor arrangement):
   +σ on one, −σ on other:
   Between plates: E = σ/ε₀ (fields add)
   Outside plates: E = 0 (fields cancel)

Example:
A non-conducting sheet has σ = 2 × 10⁻⁷ C/m².
E = σ/(2ε₀) = 2×10⁻⁷/(2 × 8.85×10⁻¹²) = 1.13 × 10⁴ N/C.`,
                keyLabel: 'neet-note',
                example: 'NEET common confusion: σ/(2ε₀) vs σ/ε₀. The factor of 2: non-conducting sheet (field emerges from both surfaces) → σ/(2ε₀). Conductor surface (all charge on one face) → σ/ε₀. Two-plate capacitor (fields add between plates) → σ/ε₀.'
            },
            {
                icon: 'ρ',
                heading: 'Volume Charge Density (ρ) — Spheres',
                content: `ρ = charge per unit volume = dq/dV  (C/m³)

For a uniformly charged solid sphere (total charge Q, radius R):
• Outside (r > R): E = kQ/r² (point charge behaviour)
• Inside (r < R): E = ρr/(3ε₀) = kQr/R³

At r = R (surface): Both formulas give E = kQ/R².

Finding total charge from ρ:
Q = ρ × (4πR³/3) for a solid sphere.

Key relationships:
ρ = 3Q/(4πR³)
E_inside = ρr/(3ε₀)
E_surface = ρR/(3ε₀) = kQ/R²

At the centre (r = 0): E = 0.
The E field increases linearly from 0 at centre to maximum at surface, then decreases as 1/r².`,
                keyLabel: 'neet-trap',
                example: 'Graph question: For a uniformly charged sphere, E vs r has a linear rise inside and a 1/r² fall outside. The peak is exactly at r = R (surface). Draw this graph — it appears every 2-3 years in NEET as a "which graph correctly shows E vs r?" question.'
            }
        ],
            practice: pools[6].slice(0, 20),
            assessment: pools[6].slice(20, 30)
        }
    ];
};
