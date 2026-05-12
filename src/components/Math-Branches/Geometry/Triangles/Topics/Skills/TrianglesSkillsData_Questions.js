const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const qM = (question, correctAnswer, distractors, explanation) => {
    const unique = Array.from(new Set(distractors)).filter(d => d !== correctAnswer);
    const opts = shuf([correctAnswer, ...unique]);
    return { question, options: opts, correct: opts.indexOf(correctAnswer), explanation };
};

/* ── SKILL 1: Pythagorean Theorem ── */
export const genPythagorasP = () => {
    const triples = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[6,8,10],[9,12,15],[12,16,20]];
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const [a, b, c] = triples[i % triples.length];
        const k = R(1, 3);
        const [A, B, C] = [a*k, b*k, c*k];
        const type = i % 3;
        if (type === 0) {
            qs.push(qM(`A right triangle has legs ${A} and ${B}. Find the hypotenuse.`, `${C}`, [`${C+2}`, `${C-1}`, `${A+B}`], `Use $$a^2+b^2=c^2$$: $$${A}^2+${B}^2=${A*A+B*B}=c^2$$, so $$c=${C}$$.`));
        } else if (type === 1) {
            qs.push(qM(`A right triangle has hypotenuse ${C} and one leg ${A}. Find the other leg.`, `${B}`, [`${B+3}`, `${B-2}`, `${C-A}`], `$$b^2=c^2-a^2=${C*C}-${A*A}=${B*B}$$, so $$b=${B}$$.`));
        } else {
            qs.push(qM(`Is a triangle with sides ${A}, ${B}, ${C} a right triangle?`, 'Yes', ['No', 'Cannot be determined', 'Only if angles are given'], `$$${A}^2+${B}^2=${A*A+B*B}=${C*C}=${C}^2$$ ✓ Right triangle.`));
        }
    }
    return qs;
};

export const genPythagorasA = () => genPythagorasP().slice(0, 15);

/* ── SKILL 2: Triangle Area ── */
export const genTriAreaP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const b = R(4, 20) * 2;
        const h = R(3, 15) * 2;
        const area = (b * h) / 2;
        const type = i % 2;
        if (type === 0) {
            qs.push(qM(`Find the area of a triangle with base ${b} cm and height ${h} cm.`, `${area} cm²`, [`${b*h} cm²`, `${area+10} cm²`, `${area-5} cm²`], `Area = ½ × base × height = ½ × ${b} × ${h} = ${area} cm².`));
        } else {
            qs.push(qM(`A triangle has area ${area} cm² and base ${b} cm. Find its height.`, `${h} cm`, [`${h+4} cm`, `${h-2} cm`, `${b} cm`], `h = 2 × Area ÷ base = 2 × ${area} ÷ ${b} = ${h} cm.`));
        }
    }
    return qs;
};

export const genTriAreaA = () => genTriAreaP().slice(0, 15);

/* ── SKILL 3: Angle Sum Property ── */
export const genAngleSumP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const a = R(20, 80);
        const b = R(20, 80);
        const c = 180 - a - b;
        if (c <= 0 || c >= 180) { qs.push(qM(`What is the sum of interior angles of any triangle?`, `180°`, ['90°','270°','360°'], `The angle sum property states all three interior angles sum to 180°.`)); continue; }
        const type = i % 3;
        if (type === 0) {
            qs.push(qM(`A triangle has angles ${a}° and ${b}°. Find the third angle.`, `${c}°`, [`${c+10}°`, `${c-5}°`, `${180-a}°`], `Third angle = 180° − ${a}° − ${b}° = ${c}°.`));
        } else if (type === 1) {
            qs.push(qM(`An isosceles triangle has a vertex angle of ${a}°. Find each base angle.`, `${(180-a)/2}°`, [`${a}°`, `${180-a}°`, `${(180-a)/2+5}°`], `Base angles = (180° − ${a}°) ÷ 2 = ${(180-a)/2}°.`));
        } else {
            qs.push(qM(`The exterior angle of a triangle is ${a+b}°. One remote interior angle is ${a}°. Find the other.`, `${b}°`, [`${a+b}°`, `${180-(a+b)}°`, `${b+10}°`], `Other remote interior angle = exterior − ${a}° = ${a+b}° − ${a}° = ${b}°.`));
        }
    }
    return qs;
};

export const genAngleSumA = () => genAngleSumP().slice(0, 15);

/* ── SKILL 4: Congruence & Similarity ── */
export const genCongruenceP = () => {
    const conditions = ['SSS', 'SAS', 'ASA', 'AAS', 'RHS'];
    const simRatios = [[1,2],[2,3],[3,4],[1,3],[2,5]];
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const type = i % 4;
        if (type === 0) {
            const cond = conditions[i % conditions.length];
            qs.push(qM(`Which congruence rule uses two sides and the included angle?`, 'SAS', ['SSS', 'ASA', 'AAS'], `SAS = Side–Angle–Side. The angle must be between the two given sides.`));
        } else if (type === 1) {
            const [p, q] = simRatios[i % simRatios.length];
            const side = R(4, 12) * p;
            const corresponding = side * q / p;
            qs.push(qM(`Two similar triangles have a ratio of ${p}:${q}. A side in the smaller triangle is ${side}. Find the corresponding side.`, `${corresponding}`, [`${side+q}`, `${side*p}`, `${corresponding+p}`], `Corresponding side = ${side} × (${q}/${p}) = ${corresponding}.`));
        } else if (type === 2) {
            qs.push(qM(`Two triangles are congruent. One has perimeter 36 cm. What is the perimeter of the other?`, '36 cm', ['18 cm', '72 cm', 'Cannot be determined'], `Congruent triangles are identical in every measurement, including perimeter.`));
        } else {
            const [p, q] = simRatios[i % simRatios.length];
            const area1 = R(4, 9) * p * p;
            const area2 = area1 * q * q / (p * p);
            qs.push(qM(`Two similar triangles have sides in ratio ${p}:${q}. The smaller has area ${area1} cm². Find the larger area.`, `${area2} cm²`, [`${area1*q/p} cm²`, `${area1+area2} cm²`, `${area2+10} cm²`], `Area ratio = (side ratio)² = (${q}/${p})² = ${q*q}/${p*p}. Area₂ = ${area1} × ${q*q}/${p*p} = ${area2} cm².`));
        }
    }
    return qs;
};

export const genCongruenceA = () => genCongruenceP().slice(0, 15);
