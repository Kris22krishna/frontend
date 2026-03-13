import React from 'react';
import MathRenderer from '../../../../MathRenderer';

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
const round = (v, d = 2) => Number(v.toFixed(d));

const generateSubAtomicQuestions = () => {
    const questions = [];
    const elements = [
        { name: 'Carbon', symbol: 'C', z: 6, isotopes: [12, 13, 14] },
        { name: 'Oxygen', symbol: 'O', z: 8, isotopes: [16, 17, 18] },
        { name: 'Nitrogen', symbol: 'N', z: 7, isotopes: [14, 15] },
        { name: 'Chlorine', symbol: 'Cl', z: 17, isotopes: [35, 37] },
        { name: 'Sodium', symbol: 'Na', z: 11, isotopes: [23] },
        { name: 'Neon', symbol: 'Ne', z: 10, isotopes: [20, 21, 22] },
        { name: 'Magnesium', symbol: 'Mg', z: 12, isotopes: [24, 25, 26] },
        { name: 'Phosphorus', symbol: 'P', z: 15, isotopes: [31] },
        { name: 'Potassium', symbol: 'K', z: 19, isotopes: [39, 40] },
        { name: 'Iron', symbol: 'Fe', z: 26, isotopes: [54, 56, 57] }
    ];
    for (let i = 0; i < 15; i++) {
        const t = i % 5;
        const el = getRandomFromValue(elements);
        const mass = getRandomFromValue(el.isotopes);
        const n = mass - el.z;
        if (t === 0) {
            const opts = shuffleArray([...new Set([n, n+2, n-1, el.z])].slice(0,4));
            while(opts.length<4) opts.push(getRandomInt(1,40));
            questions.push({ type:'mcq', difficulty:'Basic', question:`Calculate the number of neutrons in ${el.name}-${mass} (${el.symbol}, Z=${el.z}).`, options:opts.map(String), answer:opts.indexOf(n), explanation:`Neutrons = A - Z = ${mass} - ${el.z} = ${n}.` });
        } else if (t === 1) {
            const ch = getRandomFromValue([1,-1,2,-2,3]);
            const elec = el.z - ch;
            const cs = ch>0?`+${ch}`:`${ch}`;
            const opts = shuffleArray([...new Set([elec, el.z+ch, el.z, el.z+2])].slice(0,4));
            while(opts.length<4) opts.push(getRandomInt(1,40));
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`How many electrons in ${el.symbol}${cs} ion? (Z=${el.z})`, options:opts.map(String), answer:opts.indexOf(elec), explanation:`Electrons = Z - charge = ${el.z} - (${ch}) = ${elec}.` });
        } else if (t === 2) {
            const iso = Math.random()>0.5;
            questions.push({ type:'mcq', difficulty:'Basic', question: iso ? 'Species with same atomic number but different mass numbers are called:' : 'Species with same mass number but different atomic numbers are called:', options:['Isotopes','Isobars','Isotones','Isoelectronic'], answer: iso?0:1, explanation: iso?'Isotopes have same Z, different A.':'Isobars have same A, different Z.' });
        } else if (t === 3) {
            questions.push({ type:'mcq', difficulty:'Basic', question:'The e/m ratio for cathode rays is independent of:', options:['Applied voltage','Pressure of gas','Nature of cathode material','All of the above'], answer:3, explanation:'e/m ratio is the same regardless of gas, cathode material, or voltage — proving electrons are universal.' });
        } else {
            questions.push({ type:'mcq', difficulty:'Intermediate', question:'Which pair of species are isoelectronic?', options:['Na⁺ and Mg⁺','Na⁺ and Ne','CO₂ and NO₂','N₂O and CO'], answer:1, explanation:'Na⁺ has 10 electrons (11-1). Ne has 10 electrons. Both have 10e⁻ — isoelectronic.' });
        }
    }
    return shuffleArray(questions);
};
const generateAtomicModelQuestions = () => {
    const questions = [];
    const templates = [
        { q:'Thomson\'s model of atom is also known as:', opts:['Nuclear model','Plum pudding model','Planetary model','Quantum model'], a:1, exp:'Thomson proposed atoms as a sphere of positive charge with electrons embedded like plums in pudding.' },
        { q:'In Rutherford\'s α-particle scattering, most particles pass straight through because:', opts:['Nucleus occupies most volume','α-particles have low energy','Atom is mostly empty space','Gold has no nucleus'], a:2, exp:'Most α-particles passing undeflected means the atom is predominantly empty space.' },
        { q:'Which limitation of Rutherford\'s model did Bohr address?', opts:['Discovery of neutron','Stability of atom and line spectrum','Discovery of proton','Nuclear fission'], a:1, exp:'Bohr introduced quantised stationary states to explain why electrons don\'t spiral into the nucleus and why only specific wavelengths are emitted.' },
        { q:'The scattering experiment used which metal foil?', opts:['Silver','Lead','Gold','Copper'], a:2, exp:'Rutherford used gold foil because gold can be beaten into extremely thin sheets (~1000 atoms thick).' },
        { q:'Which is NOT a postulate of Bohr\'s model?', opts:['Electrons revolve in stationary orbits','Angular momentum = nh/2π','Electron has wave character in orbit','Radiation emitted during orbit transitions'], a:2, exp:'Wave nature of electron was proposed by de Broglie (1924), after Bohr\'s model (1913).' },
        { q:'In Rutherford\'s experiment, α-particles bouncing back (1 in 20,000) indicates:', opts:['Atom is mostly empty','Nucleus is very small and dense','Electrons are heavy','Gold is radioactive'], a:1, exp:'Very few bouncing back means the positive charge is concentrated in an extremely small, dense nucleus.' },
        { q:'Bohr\'s model works for:', opts:['All atoms','Multi-electron atoms','Only hydrogen-like (one-electron) species','Only noble gases'], a:2, exp:'Bohr\'s model successfully explains spectra of H, He⁺, Li²⁺ — all single-electron systems.' },
        { q:'The detector screen in Rutherford\'s experiment was coated with:', opts:['Phosphorus','ZnS (zinc sulfide)','Silver bromide','Barium sulfate'], a:1, exp:'ZnS produces scintillations (flashes of light) when hit by α-particles.' },
    ];
    for (let i = 0; i < 15; i++) {
        const t = templates[i % templates.length];
        const opts = [...t.opts];
        questions.push({ type:'mcq', difficulty: i<5?'Basic':'Intermediate', question:t.q, options:opts, answer:t.a, explanation:t.exp });
    }
    return shuffleArray(questions);
};
const generateBohrQuestions = () => {
    const questions = [];
    const species = [{name:'H',Z:1},{name:'He⁺',Z:2},{name:'Li²⁺',Z:3},{name:'Be³⁺',Z:4}];
    for (let i = 0; i < 15; i++) {
        const t = i % 5;
        const n = getRandomInt(2, 5);
        const sp = getRandomFromValue(species);
        if (t === 0) {
            const r = round(0.529 * n*n / sp.Z, 3);
            const co = `${r} Å`;
            const opts = shuffleArray([co, `${round(0.529*n/sp.Z,3)} Å`, `${round(0.529/n/sp.Z,3)} Å`, `${round(0.529*n*n*2/sp.Z,3)} Å`]);
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`Radius of n=${n} orbit of ${sp.name} (Z=${sp.Z})? (r₀ = 0.529 Å)`, options:opts, answer:opts.indexOf(co), explanation:`rₙ = 0.529 × n²/Z = 0.529 × ${n*n}/${sp.Z} = ${r} Å` });
        } else if (t === 1) {
            const E = round(-13.6 * sp.Z*sp.Z / (n*n), 2);
            const co = `${E} eV`;
            const opts = shuffleArray([co, `${round(-13.6/n,2)} eV`, `${round(-13.6*sp.Z/n,2)} eV`, `${round(E*-1,2)} eV`]);
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`Energy of electron in n=${n} of ${sp.name} (Z=${sp.Z})?`, options:opts, answer:opts.indexOf(co), explanation:`Eₙ = -13.6 × Z²/n² = -13.6 × ${sp.Z*sp.Z}/${n*n} = ${E} eV` });
        } else if (t === 2) {
            questions.push({ type:'mcq', difficulty:'Intermediate', question:'The KE and PE of electron in ground state H (E = -13.6 eV) are:', options:['-13.6 eV and +13.6 eV','+13.6 eV and -27.2 eV','+6.8 eV and -13.6 eV','13.6 eV and 0'], answer:1, explanation:'KE = -E = +13.6 eV. PE = 2E = -27.2 eV. Total = 13.6 + (-27.2) = -13.6 eV ✓' });
        } else if (t === 3) {
            const n1 = 2, n2 = getRandomInt(3,6);
            const R = 1.097e7;
            const invL = R*(1/(n1*n1) - 1/(n2*n2));
            const lam = round(1/invL * 1e9, 0);
            const co = `${lam} nm`;
            const opts = shuffleArray([co, `${lam+50} nm`, `${lam-80} nm`, `${Math.round(lam*1.5)} nm`]);
            questions.push({ type:'mcq', difficulty:'Advanced', question:`Wavelength of light emitted when H-atom electron jumps from n=${n2} to n=${n1}? (R = 1.097×10⁷ m⁻¹)`, options:opts, answer:opts.indexOf(co), explanation:`1/λ = R(1/${n1}² - 1/${n2}²). λ ≈ ${lam} nm (Balmer series, visible).` });
        } else {
            questions.push({ type:'mcq', difficulty:'Basic', question:`IE of hydrogen = 13.6 eV. IE of He⁺ (Z=2) is:`, options:['13.6 eV','27.2 eV','54.4 eV','6.8 eV'], answer:2, explanation:'IE = 13.6 × Z² = 13.6 × 4 = 54.4 eV for He⁺.' });
        }
    }
    return shuffleArray(questions);
};
const generateSpectrumQuestions = () => {
    const questions = [];
    const templates = [
        { q:'The spectral series in the visible region is:', opts:['Lyman','Balmer','Paschen','Brackett'], a:1, exp:'Balmer series (n₁=2) falls in visible region (410-656 nm).' },
        { q:'How many spectral lines from 4th excited state (n=5)?', opts:['4','8','10','6'], a:2, exp:'4th excited = n=5. Lines = n(n-1)/2 = 5×4/2 = 10.' },
        { q:'Lyman series corresponds to transitions ending at:', opts:['n=1','n=2','n=3','n=4'], a:0, exp:'Lyman: n₁=1 (UV). Balmer: n₁=2. Paschen: n₁=3.' },
        { q:'The Hα line of Balmer series corresponds to transition:', opts:['2→1','3→2','4→2','5→2'], a:1, exp:'Hα is the first Balmer line: n=3→2, λ=656 nm (red).' },
        { q:'Paschen series lies in which region?', opts:['UV','Visible','Near IR','Far IR'], a:2, exp:'Paschen (n₁=3) is in the near infrared region.' },
        { q:'"2nd excited state" means the electron is at n=?', opts:['2','3','4','5'], a:1, exp:'Ground=n=1, 1st excited=n=2, 2nd excited=n=3.' },
        { q:'Which transition gives shortest wavelength in Balmer?', opts:['3→2','4→2','5→2','∞→2'], a:3, exp:'Shortest λ = highest energy = series limit (n₂=∞→n₁=2).' },
        { q:'Humphreys series: transitions end at n=?', opts:['4','5','6','7'], a:2, exp:'Humphreys: n₁=6, Far IR region.' },
    ];
    for (let i = 0; i < 15; i++) {
        const t = templates[i % templates.length];
        questions.push({ type:'mcq', difficulty: i<5?'Basic':'Intermediate', question:t.q, options:[...t.opts], answer:t.a, explanation:t.exp });
    }
    return shuffleArray(questions);
};
const generateDualNatureQuestions = () => {
    const questions = [];
    const h = 6.626e-34;
    const me = 9.109e-31;
    for (let i = 0; i < 15; i++) {
        const t = i % 5;
        if (t === 0) {
            const wl_nm = getRandomInt(300, 700);
            const freq = (3e8) / (wl_nm * 1e-9);
            const E = h * freq;
            const E19 = round(E * 1e19, 2);
            const co = `${E19} × 10⁻¹⁹ J`;
            const opts = shuffleArray([co, `${round(E19*2,2)} × 10⁻¹⁹ J`, `${round(E19/2,2)} × 10⁻¹⁹ J`, `${round(E19*10,2)} × 10⁻¹⁹ J`]);
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`Energy of a photon with wavelength ${wl_nm} nm? (h=6.626×10⁻³⁴ J·s, c=3×10⁸ m/s)`, options:opts, answer:opts.indexOf(co), explanation:`E = hc/λ = 6.626×10⁻³⁴ × 3×10⁸ / (${wl_nm}×10⁻⁹) = ${E19} × 10⁻¹⁹ J` });
        } else if (t === 1) {
            questions.push({ type:'mcq', difficulty:'Intermediate', question:'de Broglie wavelength with kinetic energy E is:', options:['h/mE','h/√(2mE)','h/√(mE)','√(h/2mE)'], answer:1, explanation:'KE = p²/2m → p = √(2mE). λ = h/p = h/√(2mE).' });
        } else if (t === 2) {
            const V = getRandomInt(50, 200);
            const lam = h / Math.sqrt(2 * me * 1.6e-19 * V);
            const lam_pm = round(lam * 1e12, 1);
            const co = `${lam_pm} pm`;
            const opts = shuffleArray([co, `${round(lam_pm*2,1)} pm`, `${round(lam_pm/2,1)} pm`, `${round(lam_pm*10,1)} pm`]);
            questions.push({ type:'mcq', difficulty:'Advanced', question:`de Broglie wavelength of electron accelerated through ${V} V?`, options:opts, answer:opts.indexOf(co), explanation:`λ = h/√(2meV) = ${lam_pm} pm` });
        } else if (t === 3) {
            questions.push({ type:'mcq', difficulty:'Basic', question:'Photoelectric effect proves light has:', options:['Only wave nature','Only particle nature','Both wave and particle nature','Neither'], answer:1, explanation:'Photoelectric effect: electrons ejected only above threshold frequency, proving photon (particle) nature of light.' });
        } else {
            questions.push({ type:'mcq', difficulty:'Basic', question:'Davisson-Germer experiment confirmed:', options:['Photoelectric effect','Wave nature of electrons','Nuclear model','Heisenberg principle'], answer:1, explanation:'Davisson-Germer (1927) showed electron diffraction through crystal lattice, confirming de Broglie\'s hypothesis.' });
        }
    }
    return shuffleArray(questions);
};
const generateHeisenbergQuestions = () => {
    const questions = [];
    const h = 6.626e-34;
    const me = 9.109e-31;
    for (let i = 0; i < 15; i++) {
        const t = i % 5;
        if (t === 0) {
            questions.push({ type:'mcq', difficulty:'Basic', question:"Heisenberg's uncertainty principle rules out:", options:['Existence of electrons','Definite path/orbit of electron','Wave nature of electrons','Quantisation of energy'], answer:1, explanation:"To trace a definite orbit you'd need both exact position and velocity — Heisenberg says Δx·Δp ≥ h/4π prevents this." });
        } else if (t === 1) {
            questions.push({ type:'mcq', difficulty:'Intermediate', question:'The uncertainty principle uses which constant?', options:['h/2π','h/4π','h/π','2h/π'], answer:1, explanation:'Δx·Δp ≥ h/4π. Do NOT confuse with angular momentum quantisation which uses h/2π.' });
        } else if (t === 2) {
            const v = getRandomInt(2,8) * 1e4;
            const pct = 0.01;
            const dv = v * pct / 100;
            const dp = me * dv;
            const dx = h / (4 * Math.PI * dp);
            const dx_exp = round(dx * 1e5, 2);
            const co = `${dx_exp} × 10⁻⁵ m`;
            const opts = shuffleArray([co, `${round(dx_exp*2,2)} × 10⁻⁵ m`, `${round(dx_exp/2,2)} × 10⁻⁵ m`, `${round(dx_exp*10,2)} × 10⁻⁵ m`]);
            questions.push({ type:'mcq', difficulty:'Advanced', question:`Uncertainty in position of electron (m=9.1×10⁻³¹ kg) at v=${v/1e4}×10⁴ m/s with 0.01% uncertainty in velocity?`, options:opts, answer:opts.indexOf(co), explanation:`Δv = 0.01% of ${v/1e4}×10⁴ = ${dv} m/s. Δx = h/(4πmΔv) ≈ ${dx_exp} × 10⁻⁵ m.` });
        } else if (t === 3) {
            questions.push({ type:'mcq', difficulty:'Basic', question:'Heisenberg principle directly invalidates which model?', options:["Thomson's model","Rutherford's model","Bohr's model","de Broglie's hypothesis"], answer:2, explanation:"Bohr's model requires definite circular orbits with known position and velocity — Heisenberg shows this is impossible." });
        } else {
            questions.push({ type:'mcq', difficulty:'Intermediate', question:'For a macroscopic object (1 kg at 10 m/s), the uncertainty in position is:', options:['Very large','Measurable','Negligibly small (≈10⁻³⁵ m)','Zero'], answer:2, explanation:'Δx ≈ h/(4πmΔv) is incredibly tiny for macroscopic objects — uncertainty is undetectable.' });
        }
    }
    return shuffleArray(questions);
};
const generateQuantumQuestions = () => {
    const questions = [];
    const subs = ['s','p','d','f'];
    for (let i = 0; i < 15; i++) {
        const t = i % 5;
        if (t === 0) {
            const n = getRandomInt(2,5);
            const l = getRandomInt(0, Math.min(n-1, 3));
            const nota = `${n}${subs[l]}`;
            const opts = shuffleArray([...new Set([nota, `${n}${subs[(l+1)%4]}`, `${n+1}${subs[l]}`, `${n}${subs[(l+2)%4]}`])]);
            questions.push({ type:'mcq', difficulty:'Basic', question:`Which subshell: n=${n}, l=${l}?`, options:opts, answer:opts.indexOf(nota), explanation:`l=0→s, 1→p, 2→d, 3→f. So n=${n}, l=${l} → ${nota}.` });
        } else if (t === 1) {
            const isValid = Math.random()>0.5;
            const n = getRandomInt(2,4);
            let l = isValid ? getRandomInt(0,n-1) : n;
            const m = isValid ? getRandomInt(-l,l) : 0;
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`Is n=${n}, l=${l}, m=${m}, s=+½ valid?`, options:['Valid','Invalid'], answer:isValid?0:1, explanation: isValid?`Valid: l(${l}) < n(${n}), |m|(${Math.abs(m)}) ≤ l(${l}).`:`Invalid: l must be < n. Here l=${l} ≥ n=${n}.` });
        } else if (t === 2) {
            const l = getRandomInt(0,3);
            const maxE = 2*(2*l+1);
            const opts = shuffleArray([...new Set([maxE, maxE*2, maxE/2, maxE+2].map(v=>String(Math.round(v))))]);
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`Max electrons in ${subs[l]}-subshell (l=${l})?`, options:opts, answer:opts.indexOf(String(maxE)), explanation:`Max = 2(2l+1) = 2(2×${l}+1) = ${maxE}.` });
        } else if (t === 3) {
            const n = getRandomInt(2,4);
            const maxE = 2*n*n;
            const opts = shuffleArray([...new Set([maxE, maxE/2, maxE*2, maxE+2].map(String))]);
            questions.push({ type:'mcq', difficulty:'Basic', question:`Max electrons in shell n=${n}?`, options:opts, answer:opts.indexOf(String(maxE)), explanation:`Max = 2n² = 2×${n}² = ${maxE}.` });
        } else {
            questions.push({ type:'mcq', difficulty:'Intermediate', question:'Which set is NOT valid?', options:['n=3, l=2, m=-1, s=+½','n=4, l=0, m=0, s=-½','n=3, l=3, m=0, s=+½','n=2, l=1, m=-1, s=+½'], answer:2, explanation:'n=3 means l can be 0,1,2 (max n-1=2). l=3 is invalid.' });
        }
    }
    return shuffleArray(questions);
};
const generateOrbitalQuestions = () => {
    const questions = [];
    const orbitals = [
        {name:'1s',n:1,l:0}, {name:'2s',n:2,l:0}, {name:'2p',n:2,l:1}, {name:'3s',n:3,l:0},
        {name:'3p',n:3,l:1}, {name:'3d',n:3,l:2}, {name:'4s',n:4,l:0}, {name:'4p',n:4,l:1},
        {name:'4d',n:4,l:2}, {name:'4f',n:4,l:3}
    ];
    for (let i = 0; i < 15; i++) {
        const t = i % 5;
        const orb = getRandomFromValue(orbitals);
        const radial = orb.n - orb.l - 1;
        const angular = orb.l;
        const total = orb.n - 1;
        if (t === 0) {
            const opts = shuffleArray([String(radial), String(radial+1), String(angular), String(total)].filter((v,i,a)=>a.indexOf(v)===i));
            while(opts.length<4) opts.push(String(getRandomInt(0,5)));
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`Radial nodes in ${orb.name} orbital?`, options:opts.slice(0,4), answer:opts.indexOf(String(radial)), explanation:`Radial nodes = n-l-1 = ${orb.n}-${orb.l}-1 = ${radial}.` });
        } else if (t === 1) {
            const opts = shuffleArray([String(angular), String(angular+1), String(radial), String(total)].filter((v,i,a)=>a.indexOf(v)===i));
            while(opts.length<4) opts.push(String(getRandomInt(0,5)));
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`Angular nodes in ${orb.name} orbital?`, options:opts.slice(0,4), answer:opts.indexOf(String(angular)), explanation:`Angular nodes = l = ${orb.l}.` });
        } else if (t === 2) {
            questions.push({ type:'mcq', difficulty:'Basic', question:'s orbital shape is:', options:['Spherical','Dumbbell','Cloverleaf','Complex'], answer:0, explanation:'s orbital (l=0) is spherically symmetrical. p is dumbbell, d is cloverleaf.' });
        } else if (t === 3) {
            questions.push({ type:'mcq', difficulty:'Basic', question:'p orbitals are oriented along:', options:['Only x-axis','x, y, z axes','Only z-axis','Random directions'], answer:1, explanation:'Three p orbitals: pₓ, pᵧ, p_z oriented along x, y, z axes respectively.' });
        } else {
            questions.push({ type:'mcq', difficulty:'Intermediate', question:'For 4f orbital, angular and radial nodes are:', options:['0 angular, 3 radial','3 angular, 3 radial','3 angular, 0 radial','2 angular, 1 radial'], answer:2, explanation:'4f: n=4, l=3. Angular = l = 3. Radial = n-l-1 = 0.' });
        }
    }
    return shuffleArray(questions);
};
const generateConfigQuestions = () => {
    const questions = [];
    const elements = [
        { name:'Nitrogen', Z:7, conf:'1s² 2s² 2p³' },
        { name:'Neon', Z:10, conf:'1s² 2s² 2p⁶' },
        { name:'Sodium', Z:11, conf:'[Ne] 3s¹' },
        { name:'Phosphorus', Z:15, conf:'[Ne] 3s² 3p³' },
        { name:'Argon', Z:18, conf:'[Ne] 3s² 3p⁶' },
        { name:'Scandium', Z:21, conf:'[Ar] 4s² 3d¹' },
        { name:'Chromium', Z:24, conf:'[Ar] 3d⁵ 4s¹' },
        { name:'Manganese', Z:25, conf:'[Ar] 4s² 3d⁵' },
        { name:'Iron', Z:26, conf:'[Ar] 3d⁶ 4s²' },
        { name:'Copper', Z:29, conf:'[Ar] 3d¹⁰ 4s¹' },
        { name:'Zinc', Z:30, conf:'[Ar] 3d¹⁰ 4s²' }
    ];
    for (let i = 0; i < 15; i++) {
        const t = i % 5;
        const el = getRandomFromValue(elements);
        if (t === 0) {
            const wrong = [
                el.conf.replace('4s²','3d²').replace('4s¹','3d¹'),
                el.conf.replace('p³','p⁴').replace('s¹','s²'),
                el.conf.replace('3d⁵','3d⁴ 4p¹'),
                el.conf.replace('[Ar]','[Kr]')
            ].filter(c => c !== el.conf);
            const opts = shuffleArray([el.conf, ...wrong.slice(0,3)]);
            questions.push({ type:'mcq', difficulty: el.conf.includes('4s¹')?'Advanced':'Intermediate', question:`Ground state config of ${el.name} (Z=${el.Z})?`, options:opts, answer:opts.indexOf(el.conf), explanation: el.name==='Chromium'?'Exception: [Ar] 3d⁵ 4s¹ due to half-filled d stability.':el.name==='Copper'?'Exception: [Ar] 3d¹⁰ 4s¹ due to fully-filled d stability.':`Aufbau principle: ${el.conf}.` });
        } else if (t === 1) {
            let others = elements.map(e=>e.name).filter(n=>n!==el.name);
            others = shuffleArray(others).slice(0,3);
            others.push(el.name);
            const opts = shuffleArray(others);
            questions.push({ type:'mcq', difficulty:'Intermediate', question:`Identify element with config: ${el.conf}`, options:opts, answer:opts.indexOf(el.name), explanation:`Z=${el.Z} corresponds to ${el.name}.` });
        } else if (t === 2) {
            questions.push({ type:'mcq', difficulty:'Basic', question:'Aufbau principle states electrons fill orbitals in order of:', options:['Decreasing energy','Increasing energy','Decreasing n','Increasing l only'], answer:1, explanation:'Aufbau: fill lowest energy first, using (n+l) rule.' });
        } else if (t === 3) {
            questions.push({ type:'mcq', difficulty:'Advanced', question:'Number of unpaired electrons in Fe³⁺ (Z=26)?', options:['4','5','6','3'], answer:1, explanation:'Fe: [Ar] 3d⁶ 4s². Fe³⁺ loses 2 from 4s + 1 from 3d → [Ar] 3d⁵. Half-filled → 5 unpaired.' });
        } else {
            questions.push({ type:'mcq', difficulty:'Intermediate', question:'Correct energy order for 4th period subshells?', options:['4s < 4p < 3d < 4d','4s < 3d < 4p','3d < 4s < 4p','4s < 4p < 4d < 3d'], answer:1, explanation:'(n+l): 4s=4, 3d=5, 4p=5. For equal (n+l), lower n first → 3d < 4p. Order: 4s < 3d < 4p.' });
        }
    }
    return shuffleArray(questions);
};
export const STRUCTURE_OF_ATOM_SKILLS = [
    { id:'skill-1', title:'Sub-atomic Particles', desc:'Cathode rays, canal rays, neutrons, isotopes, isobars, and isoelectronic species.', color:'#3b82f6', icon:'⚛️', learnSections: [
        { heading: "Sub-atomic Particles", content: "The atom is not indivisible — it has internal structure. Three key experiments revealed its components.\n• Cathode Ray Experiment (Thomson, 1897): Discovered electrons. Cathode rays travel from cathode to anode. e/m = 1.758820 × 10¹¹ C/kg.\n• Canal Rays (Goldstein, 1886): Discovered protons. Positive rays through perforated cathode. Proton has smallest positive e/m ratio.\n• Neutron (Chadwick, 1932): Bombarded beryllium with α-particles to find neutral radiation.", example: "Cathode ray experiments used low-pressure gas. The nature of cathode rays (e/m ratio) is independent of the gas used and independent of the cathode material.", keyLabel: "neet-trap" },
        { heading: "Particle Properties", content: "Properties of the three fundamental sub-atomic particles:", table: { headers: ["Particle", "Mass (kg)", "Relative Mass", "Charge"], rows: [["Electron (e⁻)", "9.109 × 10⁻³¹", "1/1837 ≈ 0.00055 u", "−1 (−1.6 × 10⁻¹⁹ C)"], ["Proton (p⁺)", "1.673 × 10⁻²⁷", "≈ 1.0073 u", "+1 (+1.6 × 10⁻¹⁹ C)"], ["Neutron (n)", "1.675 × 10⁻²⁷", "≈ 1.0087 u", "0 (neutral)"]] }, example: "Neutron is slightly heavier than a proton! Mass: n > p > e.", keyLabel: "key-fact" },
        { heading: "Atomic Species Configurations", content: "Atoms of different elements can share specific properties like mass or neutron count:", table: { headers: ["Term", "Same", "Different", "Example"], rows: [["Isotopes", "Atomic number (Z)", "Mass number (A)", "¹H, ²H, ³H"], ["Isobars", "Mass number (A)", "Atomic number (Z)", "¹⁴C and ¹⁴N"], ["Isotones", "Neutrons (n)", "Z and A both differ", "¹⁴C (8n) and ¹⁵N (8n)"], ["Isoelectronic", "Electrons", "Protons (Z)", "N³⁻, O²⁻, F⁻, Ne, Na⁺ (10e⁻)"]] }, example: "Isoelectronic species are extremely common in NEET. Na⁺ (11-1), Mg²⁺ (12-2), Ne (10), F⁻ (9+1), O²⁻ (8+2) all have 10 electrons.", keyLabel: "neet-note" }
    ], practice: generateSubAtomicQuestions(), assess: generateSubAtomicQuestions() },
    { id:'skill-2', title:'Atomic Models', desc:'Thomson, Rutherford, and Bohr — postulates, experiments, and limitations.', color:'#d4971a', icon:'🔬', learnSections: [
        { heading: "Thomson's Plum Pudding Model (1904)", content: "The atom is a sphere of uniform positive charge (like a pudding) with electrons (like plums/raisins) embedded at various positions. Total charge is neutral.\n• Explains overall neutrality of the atom\n• Electrons can be removed to explain ionisation\n• Limitation: Could not explain the results of Rutherford's scattering experiment", example: "This was the first atomic model proposed after the discovery of the electron, providing a way to integrate positive and negative charges.", keyLabel: "key-fact" },
        { heading: "Rutherford's Nuclear Model (1911)", content: "Experiment: α-particles (helium nuclei, +2 charge) fired at a thin gold foil. A zinc sulfide (ZnS) screen detected scattered particles.\n\nObservations:\n• Most passed straight through → atom is mostly empty space\n• Some deflected by small angles → a small positive region exists\n• Very few (1 in 20,000) bounced back → extremely small/dense nucleus", example: "The scatterer was gold (not lead/silver) because it can be beaten into extremely thin sheets. The screen was coated with ZnS, not phosphorus. The α-particles were from a radioactive source (like Polonium).", keyLabel: "neet-trap" },
        { heading: "Bohr's Quantised Orbit Model (1913)", content: "Bohr fixed Rutherford's limitations (atom stability and line spectrum) with four postulates:\n1. Electrons revolve in fixed circular orbits (stationary states) without emitting energy\n2. Only orbits where angular momentum = nh/2π are allowed\n3. Energy is emitted/absorbed only when electron jumps between orbits\n4. ΔE = E₂ − E₁ = hν (Planck's relation)", example: "Bohr's model works ONLY for hydrogen and hydrogen-like ions (one-electron systems like He⁺, Li²⁺). It fails for multi-electron atoms and does not explain the fine structure of spectral lines.", keyLabel: "misconception" }
    ], practice: generateAtomicModelQuestions(), assess: generateAtomicModelQuestions() },
    { id:'skill-3', title:"Bohr's Model", desc:'Calculate radius, energy, velocity for H-like species. KE-PE relationships.', color:'#10b981', icon:'🎯', learnSections: [
        { heading: "Bohr's Formulas", content: "Formulae for calculations in hydrogen and hydrogen-like ions (He⁺, Li²⁺, Be³⁺):\n• Radius: rₙ = 0.529 × n²/Z  Å\n• Energy: Eₙ = −13.6 × Z²/n²  eV\n• Velocity: vₙ = 2.18 × 10⁶ × Z/n  m/s\n• Angular Momentum: mvr = nh/2π\n\nEnergy levels of Hydrogen:\n• n=1: −13.6 eV\n• n=2: −3.4 eV\n• n=3: −1.51 eV\n• n=4: −0.85 eV", example: "Radius increases with n², decreases with Z (r ∝ n²/Z). Energy increases (less negative) as n increases (E ∝ −Z²/n²). Velocity decreases as n increases (v ∝ Z/n).", keyLabel: "neet-note" },
        { heading: "Energy Relationships", content: "The relationship between Kinetic, Potential, and Total Energy is a direct consequence of the Virial theorem:\n• KE = −(Total E)\n• PE = 2 × (Total E)\n• Total E = KE + PE\n\nFor Hydrogen in ground state:\nTotal E = −13.6 eV → KE = +13.6 eV, PE = −27.2 eV", example: "Ionisation Energy (IE) is the energy needed to remove an electron from n=1 to n=∞. IE = 0 − (−13.6) = 13.6 eV for H. For He⁺ (Z=2): IE = 13.6 × 2² = 54.4 eV.", keyLabel: "key-fact" }
    ], practice: generateBohrQuestions(), assess: generateBohrQuestions() },
    { id:'skill-4', title:'Hydrogen Spectrum', desc:'Spectral series (Lyman to Humphreys), Rydberg equation, number of lines.', color:'#e05a47', icon:'🌈', learnSections: [
        { heading: "Hydrogen Spectrum & Rydberg Equation", content: "When excited hydrogen atoms emit light, only specific wavelengths appear, grouped into series. Wavenumber v̄ (1/λ) is given by:\n• 1/λ = R_H × Z² × (1/n₁² − 1/n₂²)\nWhere R_H = 1.097 × 10⁷ m⁻¹ and n₂ > n₁.", example: "\"nth excited state\" always means the (n+1)th energy level! 2nd orbit → n=2, but 2nd excited state → n=3. This is a huge language trap.", keyLabel: "neet-trap" },
        { heading: "The Six Spectral Series", content: "The series are defined by the final state n₁:", table: { headers: ["Series", "Final State (n₁)", "Transitions (n₂)", "Region"], rows: [["Lyman", "n₁ = 1", "2, 3, 4...", "UV Region"], ["Balmer", "n₁ = 2", "3, 4, 5...", "Visible Region"], ["Paschen", "n₁ = 3", "4, 5, 6...", "Near IR"], ["Brackett", "n₁ = 4", "5, 6, 7...", "Mid IR"], ["Pfund", "n₁ = 5", "6, 7, 8...", "Far IR"], ["Humphreys", "n₁ = 6", "7, 8...", "Far IR"]] }, example: "Balmer is the ONLY series in the visible region (410-656 nm). Hα is red (3→2), Hβ is blue-green (4→2), Hγ and Hδ are violet.", keyLabel: "neet-note" },
        { heading: "Number of Spectral Lines", content: "If an electron is in the nth shell, it can drop to lower shells via multiple paths.\nTotal number of lines = n(n−1)/2", example: "If an electron drops from the 4th excited state, n=5. Total lines = 5(4)/2 = 10 lines.", keyLabel: "key-fact" }
    ], practice: generateSpectrumQuestions(), assess: generateSpectrumQuestions() },
    { id:'skill-5', title:'Dual Nature & de Broglie', desc:'Planck theory, photoelectric effect, de Broglie wavelength calculations.', color:'#f59e0b', icon:'🌊', learnSections: [
        { heading: "Planck's Quantum Theory", content: "Energy is not continuous but comes in discrete packets called quanta.\n• E = hν = hc/λ\nh = 6.626 × 10⁻³⁴ J·s (Planck's constant)", example: "Photoelectric effect: KE_max = hν − hν₀ = hν − W. Increasing intensity of light increases the NUMBER of ejected electrons, but NOT their maximum kinetic energy.", keyLabel: "key-fact" },
        { heading: "de Broglie Wavelength", content: "If light has particle character, particles have wave character:\n• λ = h/mv = h/p\nWhere p is momentum. Lighter particles have longer wavelengths.\n\nEnergy forms:\n• With Kinetic Energy: λ = h/√(2mKE)\n• Accelerated by Potential V: λ = h/√(2meV)", example: "The formula λ = h/√(2mKE) is the most commonly tested variant in NEET numericals.", keyLabel: "neet-note" }
    ], practice: generateDualNatureQuestions(), assess: generateDualNatureQuestions() },
    { id:'skill-6', title:"Heisenberg's Principle", desc:'Uncertainty in position and momentum. Why orbits are invalid.', color:'#7c3aed', icon:'🔮', learnSections: [
        { heading: "Heisenberg's Uncertainty Principle", content: "We cannot simultaneously know both the exact position and exact momentum (or velocity) of a particle.\n• Δx · Δp ≥ h/4π\n• Δx · mΔv ≥ h/4π", example: "The principle rules out the existence of definite paths (orbits) for electrons. It directly invalidates Bohr's model.", keyLabel: "key-fact" },
        { heading: "Formula Confusion", content: "It uses h/4π, not h/2π.", example: "The uncertainty principle uses h/4π. Angular momentum quantisation (Bohr model) uses nh/2π. Do not mix these up!", keyLabel: "neet-trap" }
    ], practice: generateHeisenbergQuestions(), assess: generateHeisenbergQuestions() },
    { id:'skill-7', title:'Quantum Numbers', desc:'n, l, mₗ, mₛ — valid sets, subshell notation, shell capacity.', color:'#8b5cf6', icon:'🔢', learnSections: [
        { heading: "Quantum Numbers", content: "Quantum numbers are the \"address\" of an electron:\n1. Principal (n): Shell, Size & Energy. Values: 1, 2, 3... Max electrons: 2n²\n2. Azimuthal (l): Shape. Values: 0 to (n−1). l=0 (s), 1 (p), 2 (d), 3 (f)\n3. Magnetic (mₗ): Orientation. Values: −l to +l. Total = 2l+1 orbitals\n4. Spin (mₛ): Spin direction. Values: +½ or −½.", example: "NEET Favourite trap: n=3, l=3 is INVALID (l must be ≤ n−1). Likewise, n=2, l=1, m_l=+2 is INVALID.", keyLabel: "neet-trap" },
        { heading: "Subshell Capacity", content: "Total values of mₗ gives the number of orbitals per subshell:", table: { headers: ["l Value", "Subshell", "No. of Orbitals (2l+1)", "Max Electrons"], rows: [["0", "s", "1", "2"], ["1", "p", "3", "6"], ["2", "d", "5", "10"], ["3", "f", "7", "14"]] }, example: "Angular momentum of an orbital = √[l(l+1)] × h/2π. Note this depends ONLY on l, not on n.", keyLabel: "key-fact" }
    ], practice: generateQuantumQuestions(), assess: generateQuantumQuestions() },
    { id:'skill-8', title:'Shapes of Orbitals', desc:'s, p, d, f shapes. Radial and angular nodes. Node calculations.', color:'#0d9488', icon:'🌐', learnSections: [
        { heading: "Shapes of Atomic Orbitals", content: "Orbitals are 3D regions of max electron probability:\n• s orbital (l=0): Spherical. Non-directional. (1 orbital)\n• p orbital (l=1): Dumbbell. (3 orbitals: px, py, pz)\n• d orbital (l=2): Cloverleaf. (5 orbitals)\n• f orbital (l=3): Complex. (7 orbitals)", example: "s orbitals are non-directional. p orbitals have a nodal plane passing through the nucleus.", keyLabel: "key-fact" },
        { heading: "Calculation of Nodes", content: "Nodes are regions with zero probability of finding an electron:\n• Radial nodes = n − l − 1\n• Angular nodes = l\n• Total nodes = n − 1", table: { headers: ["Orbital", "Radial Nodes", "Angular Nodes"], rows: [["1s (n=1, l=0)", "0", "0"], ["2p (n=2, l=1)", "0", "1"], ["3p (n=3, l=1)", "1", "1"], ["3d (n=3, l=2)", "0", "2"], ["4f (n=4, l=3)", "0", "3"]] }, example: "1s has 0 nodes. 3d has 0 radial nodes, only 2 angular nodes. The first time any subshell orbital appears (1s, 2p, 3d, 4f), it has zero radial nodes.", keyLabel: "neet-note" }
    ], practice: generateOrbitalQuestions(), assess: generateOrbitalQuestions() },
    { id:'skill-9', title:'Electronic Configuration', desc:'Aufbau, Pauli, Hund rules. Cr/Cu exceptions. Magnetic properties.', color:'#ec4899', icon:'📝', learnSections: [
        { heading: "The Three Filling Rules", content: "1. Aufbau Principle: Electrons fill orbitals in order of increasing energy. Use the (n+l) rule; lower (n+l) fills first. If equal, lower n fills first.\n2. Pauli Exclusion Principle: No two electrons can have the same four quantum numbers. Max 2 electrons/orbital with opposite spins.\n3. Hund's Rule: In degenerate orbitals (same energy), fill singly first before pairing.", example: "Order: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s... 4s fills BEFORE 3d because (4+0=4) < (3+2=5).", keyLabel: "key-fact" },
        { heading: "Exceptions & Magnetic Properties", content: "Half-filled and fully-filled subshells provide extra stability.\n• Cr (Z=24): [Ar] 3d⁵ 4s¹ (NOT 3d⁴ 4s²)\n• Cu (Z=29): [Ar] 3d¹⁰ 4s¹ (NOT 3d⁹ 4s²)\n\nMagnetic properties depend on unpaired electrons:\n• Paramagnetic: Has unpaired electrons (attracted to magnetic field)\n• Diamagnetic: All electrons paired (weakly repelled by field)", example: "These exceptions are the most tested topic in the chapter. When ionizing transition metals, s-electrons are removed BEFORE d-electrons! (e.g. Fe³⁺ is 3d⁵, not 3d³ 4s²).", keyLabel: "neet-trap" }
    ], practice: generateConfigQuestions(), assess: generateConfigQuestions() }
];
