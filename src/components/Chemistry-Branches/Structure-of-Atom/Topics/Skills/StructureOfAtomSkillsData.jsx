import React from 'react';
import MathRenderer from '../../../../MathRenderer';

// Helper to get random item from array
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFromValue = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Skill 1: Sub-atomic Particles (Protons, Neutrons, Electrons, Isotopes)
const generateSubAtomicQuestions = () => {
    const questions = [];
    const elements = [
        { name: 'Carbon', symbol: 'C', z: 6, isotopes: [12, 13, 14] },
        { name: 'Oxygen', symbol: 'O', z: 8, isotopes: [16, 17, 18] },
        { name: 'Nitrogen', symbol: 'N', z: 7, isotopes: [14, 15] },
        { name: 'Chlorine', symbol: 'Cl', z: 17, isotopes: [35, 37] },
        { name: 'Sodium', symbol: 'Na', z: 11, isotopes: [23, 24] },
        { name: 'Fluorine', symbol: 'F', z: 9, isotopes: [19] },
        { name: 'Neon', symbol: 'Ne', z: 10, isotopes: [20, 21, 22] },
        { name: 'Magnesium', symbol: 'Mg', z: 12, isotopes: [24, 25, 26] },
        { name: 'Phosphorus', symbol: 'P', z: 15, isotopes: [31, 32] },
        { name: 'Potassium', symbol: 'K', z: 19, isotopes: [39, 40] }
    ];

    for (let i = 0; i < 15; i++) {
        const templateType = i % 3;
        const el = getRandomFromValue(elements);
        const mass = getRandomFromValue(el.isotopes);
        const neutrons = mass - el.z;

        if (templateType === 0) {
            // Find neutrons
            const options = [neutrons, neutrons + 2, neutrons - 1, el.z];
            const uniqueOptions = [...new Set(options)];
            while(uniqueOptions.length < 4) {
               uniqueOptions.push(getRandomInt(1, 40));
            }
            const shuffledOptions = shuffleArray(uniqueOptions.slice(0, 4));
            
            questions.push({
                type: 'mcq',
                difficulty: 'Basic',
                question: `Calculate the number of neutrons in an atom of ${el.name}-${mass} (${el.symbol}).`,
                options: shuffledOptions.map(String),
                answer: shuffledOptions.indexOf(neutrons),
                explanation: `The mass number (A) is ${mass} and the atomic number (Z) for ${el.name} is ${el.z}. Neutrons = A - Z = ${mass} - ${el.z} = ${neutrons}.`
            });
        } else if (templateType === 1) {
            // Find electrons in an ion
            const chargeList = [1, -1, 2, -2, 3];
            const charge = getRandomFromValue(chargeList);
            const electrons = el.z - charge;
            const chargeStr = charge > 0 ? `+${charge}` : `${charge}`;
            
            const options = [electrons, el.z + charge, el.z, el.z + 2];
            const uniqueOptions = [...new Set(options)];
            while(uniqueOptions.length < 4) {
               uniqueOptions.push(getRandomInt(1, 40));
            }
            const shuffledOptions = shuffleArray(uniqueOptions.slice(0, 4));

            questions.push({
                type: 'mcq',
                difficulty: 'Intermediate',
                question: `How many electrons are present in the ${el.symbol}${chargeStr} ion? (Atomic number of ${el.name} = ${el.z})`,
                options: shuffledOptions.map(String),
                answer: shuffledOptions.indexOf(electrons),
                explanation: `A neutral ${el.name} atom has ${el.z} electrons. A charge of ${chargeStr} means it has ${charge > 0 ? 'lost' : 'gained'} ${Math.abs(charge)} electrons. Total electrons = ${el.z} - (${charge}) = ${electrons}.`
            });
        } else {
            // Identify Isotopes/Isobars
            const isIsotope = Math.random() > 0.5;
            let questionText, expText;
            if (isIsotope) {
                questionText = `Species with the same atomic number but different mass numbers are called what?`;
                expText = `Isotopes have the same Z (protons) but different A (neutrons).`;
            } else {
                questionText = `Species with the same mass number but different atomic numbers are called what?`;
                expText = `Isobars have the same A but different Z (different elements).`;
            }
            const options = ["Isotopes", "Isobars", "Isotones", "Isoelectronic"];
            const answerStr = isIsotope ? "Isotopes" : "Isobars";
            const answer = options.indexOf(answerStr);
            
            questions.push({
                type: 'mcq',
                difficulty: 'Basic',
                question: questionText,
                options: options,
                answer: answer,
                explanation: expText
            });
        }
    }
    return shuffleArray(questions);
};

// Skill 2: Electromagnetic Radiation & Planck's Theory
const generateRadiationQuestions = () => {
    const questions = [];
    const c = 3.0; // * 10^8 m/s
    const h = 6.626; // * 10^-34 J s

    for (let i = 0; i < 15; i++) {
        const type = i % 2;
        
        if (type === 0) {
            // Wavelength to Frequency
            const wl_nm = getRandomInt(300, 700); // visible light range
            const freq = (c * 1e8) / (wl_nm * 1e-9);
            const freq_pow14 = (freq / 1e14).toFixed(2);
            
            const correctOpt = `${freq_pow14} × 10¹⁴ Hz`;
            const options = [
                correctOpt,
                `${(freq_pow14 * 1.5).toFixed(2)} × 10¹⁴ Hz`,
                `${(freq_pow14 / 2).toFixed(2)} × 10¹⁴ Hz`,
                `${(freq_pow14 * 10).toFixed(2)} × 10¹⁴ Hz`
            ];
            const shuffledOptions = shuffleArray(options);

            questions.push({
                type: 'mcq',
                difficulty: 'Intermediate',
                question: `Calculate the frequency of light having a wavelength of ${wl_nm} nm. (c = 3.0 × 10⁸ m/s)`,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(correctOpt),
                explanation: `Using ν = c/λ.\nν = (3.0 × 10⁸ m/s) / (${wl_nm} × 10⁻⁹ m) = ${freq_pow14} × 10¹⁴ Hz.`
            });
        } else {
            // Frequency to Energy
            const freq_pow14 = getRandomInt(400, 800) / 100; // 4.00 to 8.00
            const energy = h * 1e-34 * freq_pow14 * 1e14;
            const energy_pow19 = (energy * 1e19).toFixed(2);
            
            const correctOpt = `${energy_pow19} × 10⁻¹⁹ J`;
            const options = [
                correctOpt,
                `${(energy_pow19 * 2).toFixed(2)} × 10⁻¹⁹ J`,
                `${(energy_pow19 / 2).toFixed(2)} × 10⁻¹⁹ J`,
                `${(energy_pow19 * 10).toFixed(2)} × 10⁻¹⁹ J`
            ];
            const shuffledOptions = shuffleArray(options);

            questions.push({
                type: 'mcq',
                difficulty: 'Advanced',
                question: `Calculate the energy of one photon of radiation whose frequency is ${freq_pow14} × 10¹⁴ Hz. (h = 6.626 × 10⁻³⁴ J s)`,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(correctOpt),
                explanation: `Using E = hν.\nE = (6.626 × 10⁻³⁴ J s) × (${freq_pow14} × 10¹⁴ s⁻¹) = ${energy_pow19} × 10⁻¹⁹ J.`
            });
        }
    }
    return shuffleArray(questions);
};

// Skill 3: Bohr Model (Radius, Energy, Velocity)
const generateBohrQuestions = () => {
    const questions = [];
    
    for (let i = 0; i < 15; i++) {
        const type = i % 3;
        const n = getRandomInt(2, 5);
        
        if (type === 0) {
            // Radius of Hydrogen
            const r0 = 52.9; // pm
            const radius = r0 * n * n;
            
            const correctOpt = `${radius} pm`;
            const options = [
                correctOpt,
                `${r0 * n} pm`,
                `${(r0 / n).toFixed(1)} pm`,
                `${r0 * n * n * 2} pm`
            ];
            const shuffledOptions = shuffleArray(options);

            questions.push({
                type: 'mcq',
                difficulty: 'Intermediate',
                question: `What is the radius of the n = ${n} orbit of a Hydrogen atom? (r₀ = 52.9 pm)`,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(correctOpt),
                explanation: `Radius rₙ = r₀ × n² / Z.\nFor Hydrogen, Z = 1. Therefore, rₙ = 52.9 × (${n})² = 52.9 × ${n*n} = ${radius} pm.`
            });
        } else if (type === 1) {
            // Energy of Hydrogen
            const e1 = -13.6; // eV
            const energy = (e1 / (n * n)).toFixed(2);
            
            const correctOpt = `${energy} eV`;
            const options = [
                correctOpt,
                `${(e1 / n).toFixed(2)} eV`,
                `${(e1 * n).toFixed(2)} eV`,
                `${(energy * -1).toFixed(2)} eV`
            ];
            const shuffledOptions = shuffleArray(options);

            questions.push({
                type: 'mcq',
                difficulty: 'Intermediate',
                question: `Calculate the energy of an electron in the n = ${n} orbit of a Hydrogen atom.`,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(correctOpt),
                explanation: `Energy Eₙ = -13.6 × (Z² / n²) eV.\nFor Hydrogen (Z = 1): Eₙ = -13.6 / ${n*n} = ${energy} eV.`
            });
        } else {
            // Balmer series visible transition observation
            const n_high = getRandomInt(3, 6);
            const isVisible = true; 
            
            questions.push({
                type: 'mcq',
                difficulty: 'Basic',
                question: `In the hydrogen spectrum, a transition from n = ${n_high} to n = 2 falls in which series?`,
                options: ["Lyman Series (UV)", "Balmer Series (Visible)", "Paschen Series (IR)", "Brackett Series (IR)"],
                answer: 1, // Balmer
                explanation: `Any transition ending at n₁ = 2 belongs to the Balmer series, which lies in the visible region of the electromagnetic spectrum.`
            });
        }
    }
    return shuffleArray(questions);
};

// Skill 4: Quantum Numbers
const generateQuantumQuestions = () => {
    const questions = [];
    const subshells = ['s', 'p', 'd', 'f'];
    
    for (let i = 0; i < 15; i++) {
        const type = i % 3;
        
        if (type === 0) {
            // n and l to subshell notation
            const n = getRandomInt(2, 5);
            const l = getRandomInt(0, Math.min(n - 1, 3));
            const notation = `${n}${subshells[l]}`;
            
            const options = [notation, `${n}${subshells[(l+1)%4]}`, `${n+1}${subshells[l]}`, `${n}${subshells[(l+2)%4]}`];
            const uniqueOptions = [...new Set(options)];
            const shuffledOptions = shuffleArray(uniqueOptions);
            
            questions.push({
                type: 'mcq',
                difficulty: 'Basic',
                question: `Which subshell is designated by the quantum numbers n = ${n} and l = ${l}?`,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(notation),
                explanation: `The principal quantum number n = ${n}. The azimuthal quantum number l = 0 is 's', 1 is 'p', 2 is 'd', 3 is 'f'. Thus, l = ${l} corresponds to '${subshells[l]}'. The subshell is ${notation}.`
            });
        } else if (type === 1) {
            // valid/invalid quantum numbers
            const isValid = Math.random() > 0.5;
            const n = getRandomInt(2, 4);
            let l, m;
            if (isValid) {
                l = getRandomInt(0, n-1);
                m = getRandomInt(-l, l);
            } else {
                l = n; // invalid, l must be < n
                m = 0; 
            }
            const s = "+1/2";
            
            const setStr = `n=${n}, l=${l}, m=${m}, s=${s}`;
            
            questions.push({
                type: 'mcq',
                difficulty: 'Intermediate',
                question: `Is the following set of quantum numbers valid?\n${setStr}`,
                options: ["Valid", "Invalid"],
                answer: isValid ? 0 : 1,
                explanation: isValid 
                    ? `Valid because l (${l}) is strictly less than n (${n}), and m (${m}) is between -l and +l.`
                    : `Invalid because the azimuthal quantum number 'l' must be strictly less than 'n'. Here l=${l} which equals n=${n}.`
            });
        } else {
            // total electrons in subshell
            const l = getRandomInt(0, 3);
            const maxElectrons = 2 * (2 * l + 1);
            
            const options = [maxElectrons.toString(), (maxElectrons * 2).toString(), (maxElectrons / 2).toString(), (maxElectrons + 2).toString()];
            const uniqueOptions = [...new Set(options)];
            const shuffledOptions = shuffleArray(uniqueOptions);
            
            questions.push({
                type: 'mcq',
                difficulty: 'Intermediate',
                question: `What is the maximum number of electrons that can be accommodated in a ${subshells[l]}-subshell (l = ${l})?`,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(maxElectrons.toString()),
                explanation: `The formula for the maximum number of electrons in a subshell is 2(2l + 1). For l = ${l}, total electrons = 2(2(${l}) + 1) = ${maxElectrons}.`
            });
        }
    }
    return shuffleArray(questions);
};

// Skill 5: Electronic Configuration
const generateConfigQuestions = () => {
    const questions = [];
    const elements = [
        { name: 'Nitrogen', symbol: 'N', Z: 7, conf: '1s² 2s² 2p³' },
        { name: 'Neon', symbol: 'Ne', Z: 10, conf: '1s² 2s² 2p⁶' },
        { name: 'Sodium', symbol: 'Na', Z: 11, conf: '[Ne] 3s¹' },
        { name: 'Phosphorus', symbol: 'P', Z: 15, conf: '[Ne] 3s² 3p³' },
        { name: 'Argon', symbol: 'Ar', Z: 18, conf: '[Ne] 3s² 3p⁶' },
        { name: 'Scandium', symbol: 'Sc', Z: 21, conf: '[Ar] 4s² 3d¹' },
        { name: 'Chromium', symbol: 'Cr', Z: 24, conf: '[Ar] 4s¹ 3d⁵ (Exception)' },
        { name: 'Manganese', symbol: 'Mn', Z: 25, conf: '[Ar] 4s² 3d⁵' },
        { name: 'Copper', symbol: 'Cu', Z: 29, conf: '[Ar] 4s¹ 3d¹⁰ (Exception)' },
        { name: 'Zinc', symbol: 'Zn', Z: 30, conf: '[Ar] 4s² 3d¹⁰' }
    ];

    for (let i = 0; i < 15; i++) {
        const type = i % 2;
        const targetEl = getRandomFromValue(elements);
        
        if (type === 0) {
            // Identify correct configuration
            let wrongConfs = [
                targetEl.conf.replace('4s²', '3d²').replace('4s¹', '3d¹'),
                targetEl.conf.replace('p³', 'p⁴').replace('s¹', 's²'),
                targetEl.conf.replace('3d⁵', '3d⁴ 4p¹'),
                targetEl.conf.replace('[Ar]', '[Kr]')
            ].filter(c => c !== targetEl.conf);
            
            const options = [targetEl.conf, ...wrongConfs.slice(0, 3)];
            const uniqueOptions = [...new Set(options)];
            const shuffledOptions = shuffleArray(uniqueOptions);
            
            questions.push({
                type: 'mcq',
                difficulty: targetEl.conf.includes('Exception') ? 'Advanced' : 'Intermediate',
                question: `Which of the following represents the correct ground state electronic configuration of ${targetEl.name} (Z=${targetEl.Z})?`,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(targetEl.conf),
                explanation: targetEl.conf.includes('Exception') 
                    ? `${targetEl.name} is an exception to the Aufbau principle. Because exactly half-filled or fully-filled d-orbitals grant extra stability, one 4s electron promotes to 3d giving ${targetEl.conf}.`
                    : `Following the (n+l) rule / Aufbau principle, the electrons fill as: ${targetEl.conf}.`
            });
        } else {
            // Identify element from configuration
            let options = elements.map(e => e.name).filter(n => n !== targetEl.name);
            options = shuffleArray(options).slice(0, 3);
            options.push(targetEl.name);
            const shuffledOptions = shuffleArray(options);
            
            questions.push({
                type: 'mcq',
                difficulty: 'Intermediate',
                question: `Identify the element whose ground state electronic configuration is: ${targetEl.conf}`,
                options: shuffledOptions,
                answer: shuffledOptions.indexOf(targetEl.name),
                explanation: `Summing the electrons in the configuration gives an atomic number (Z) of ${targetEl.Z}, which corresponds to ${targetEl.name}.`
            });
        }
    }
    return shuffleArray(questions);
};

export const STRUCTURE_OF_ATOM_SKILLS = [
    {
        id: 'skill-1',
        title: 'Sub-atomic Particles',
        desc: 'Calculate protons, neutrons, and electrons in atoms and ions.',
        color: '#3b82f6',
        icon: '⚛️',
        learnContent: (
            <div style={{ color: 'var(--atom-text)', lineHeight: 1.7, fontSize: 16 }}>
                <h3>Fundamental Particles</h3>
                <p>Atoms are made of three subatomic particles:</p>
                <ul>
                    <li><strong>Protons:</strong> Positive charge (+1), mass ~1 amu. Inside nucleus.</li>
                    <li><strong>Neutrons:</strong> No charge (0), mass ~1 amu. Inside nucleus.</li>
                    <li><strong>Electrons:</strong> Negative charge (-1), mass ~1/1836 amu. Orbit nucleus.</li>
                </ul>
                <div style={{ padding: 16, background: '#eff6ff', borderRadius: 8, marginTop: 16, borderLeft: '4px solid #3b82f6' }}>
                    <strong>Formulas:</strong><br/>
                    Atomic Number (Z) = Number of Protons<br/>
                    Mass Number (A) = Protons + Neutrons<br/>
                    In a neutral atom, Electrons = Protons
                </div>
            </div>
        ),
        practice: generateSubAtomicQuestions(),
        assess: generateSubAtomicQuestions()
    },
    {
        id: 'skill-2',
        title: 'Electromagnetic Radiation',
        desc: 'Master the relationships between wavelength, frequency, and energy of photons.',
        color: '#f59e0b',
        icon: '🌊',
        learnContent: (
            <div style={{ color: 'var(--atom-text)', lineHeight: 1.7, fontSize: 16 }}>
                <h3>Wave Characteristics</h3>
                <p>Light acts as a wave with speed, wavelength (λ), and frequency (ν).</p>
                <ul>
                    <li><strong>c = νλ</strong> (c = speed of light, 3 × 10⁸ m/s)</li>
                </ul>
                <h3>Planck's Quantum Theory</h3>
                <p>Energy is emitted or absorbed in discrete packets called 'quanta' or 'photons'.</p>
                <div style={{ padding: 16, background: '#fffbeb', borderRadius: 8, marginTop: 16, borderLeft: '4px solid #f59e0b' }}>
                    <strong>Formula:</strong><br/>
                    E = hν = hc/λ<br/>
                    Where h (Planck's constant) = 6.626 × 10⁻³⁴ J s
                </div>
            </div>
        ),
        practice: generateRadiationQuestions(),
        assess: generateRadiationQuestions()
    },
    {
        id: 'skill-3',
        title: 'Bohr Model Mathematics',
        desc: 'Calculate radius, energy, and velocity of electron orbits in Hydrogen-like species.',
        color: '#10b981',
        icon: '🎯',
        learnContent: (
            <div style={{ color: 'var(--atom-text)', lineHeight: 1.7, fontSize: 16 }}>
                <h3>Bohr's Orbit Calculations</h3>
                <p>Bohr's model applies to single-electron species like H, He⁺, Li²⁺.</p>
                <div style={{ padding: 16, background: '#ecfdf5', borderRadius: 8, marginTop: 16, borderLeft: '4px solid #10b981' }}>
                    <strong>Key Formulas:</strong><br/>
                    <strong>Radius:</strong> rₙ = 52.9 × (n² / Z) pm<br/>
                    <strong>Energy:</strong> Eₙ = -13.6 × (Z² / n²) eV/atom<br/>
                    <strong>Velocity:</strong> vₙ = 2.18 × 10⁶ × (Z / n) m/s
                </div>
                <p style={{ marginTop: 16 }}>Where 'n' is the orbit number and 'Z' is the atomic number.</p>
            </div>
        ),
        practice: generateBohrQuestions(),
        assess: generateBohrQuestions()
    },
    {
        id: 'skill-4',
        title: 'Quantum Numbers',
        desc: 'Determine n, l, m, s sets and identify valid quantum states.',
        color: '#8b5cf6',
        icon: '🔢',
        learnContent: (
            <div style={{ color: 'var(--atom-text)', lineHeight: 1.7, fontSize: 16 }}>
                <h3>The 4 Quantum Numbers</h3>
                <ol>
                    <li><strong>Principal (n):</strong> Shell. Values: 1, 2, 3... Determines size & energy.</li>
                    <li><strong>Azimuthal (l):</strong> Subshell shape. Values: 0 to (n-1). (0=s, 1=p, 2=d, 3=f)</li>
                    <li><strong>Magnetic (m):</strong> Orbital orientation. Values: -l to +l (including 0).</li>
                    <li><strong>Spin (s):</strong> Electron spin. Values: +1/2 or -1/2.</li>
                </ol>
                <div style={{ padding: 16, background: '#f5f3ff', borderRadius: 8, marginTop: 16, borderLeft: '4px solid #8b5cf6' }}>
                    <strong>Max Capacity:</strong><br/>
                    Max electrons in a shell = 2n²<br/>
                    Max electrons in a subshell = 2(2l + 1)
                </div>
            </div>
        ),
        practice: generateQuantumQuestions(),
        assess: generateQuantumQuestions()
    },
    {
        id: 'skill-5',
        title: 'Electronic Configuration',
        desc: 'Apply Aufbau, Pauli, and Hund rules to write ground state configurations.',
        color: '#ec4899',
        icon: '📝',
        learnContent: (
            <div style={{ color: 'var(--atom-text)', lineHeight: 1.7, fontSize: 16 }}>
                <h3>Writing Configurations</h3>
                <p>Electrons fill orbitals in order of increasing energy based on the (n+l) rule:</p>
                <p style={{ fontWeight: 600 }}>1s {'>'} 2s {'>'} 2p {'>'} 3s {'>'} 3p {'>'} 4s {'>'} 3d {'>'} 4p...</p>
                <h3>Exceptions to the Rule</h3>
                <div style={{ padding: 16, background: '#fdf2f8', borderRadius: 8, marginTop: 16, borderLeft: '4px solid #ec4899' }}>
                    Exactly half-filled and fully-filled configurations grant extra stability.<br/><br/>
                    <strong>Chromium (Z=24):</strong> [Ar] 4s¹ 3d⁵ <em>(NOT 4s² 3d⁴)</em><br/>
                    <strong>Copper (Z=29):</strong> [Ar] 4s¹ 3d¹⁰ <em>(NOT 4s² 3d⁹)</em>
                </div>
            </div>
        ),
        practice: generateConfigQuestions(),
        assess: generateConfigQuestions()
    }
];
