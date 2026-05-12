const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (q, c, d, e) => { const u=Array.from(new Set(d)).filter(x=>x!==c); const opts=shuf([c,...u]); return{question:q,options:opts,correct:opts.indexOf(c),explanation:e}; };

export const genRectSquareP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        if (i % 4 === 0) {
            const l = R(3, 15), w = R(2, 10);
            const a = l * w;
            qs.push(qM(`Find the area of a rectangle with length ${l} cm and width ${w} cm.`, `${a} cm²`, [`${2*(l+w)} cm²`, `${a+l} cm²`, `${l+w} cm²`], `Area = l × w = ${l} × ${w} = ${a} cm².`));
        } else if (i % 4 === 1) {
            const l = R(3, 15), w = R(2, 10);
            const p = 2 * (l + w);
            qs.push(qM(`Find the perimeter of a rectangle with length ${l} cm and width ${w} cm.`, `${p} cm`, [`${l * w} cm`, `${p + 2} cm`, `${l + w} cm`], `Perimeter = 2(l + w) = 2(${l} + ${w}) = ${p} cm.`));
        } else if (i % 4 === 2) {
            const s = R(3, 14);
            const a = s * s;
            qs.push(qM(`Find the area of a square with side ${s} cm.`, `${a} cm²`, [`${4 * s} cm²`, `${a + s} cm²`, `${2 * s * s} cm²`], `Area = s² = ${s}² = ${a} cm².`));
        } else {
            const s = R(3, 14);
            const p = 4 * s;
            qs.push(qM(`Find the perimeter of a square with side ${s} cm.`, `${p} cm`, [`${s * s} cm`, `${p + 4} cm`, `${2 * s} cm`], `Perimeter = 4s = 4 × ${s} = ${p} cm.`));
        }
    }
    return qs;
};
export const genRectSquareA = () => genRectSquareP().slice(0, 15);

export const genParallelogramP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) {
            const b = R(4, 14), h = R(3, 12);
            const a = b * h;
            qs.push(qM(`Find the area of a parallelogram with base ${b} cm and perpendicular height ${h} cm.`, `${a} cm²`, [`${2*(b+h)} cm²`, `${a + b} cm²`, `${b * h / 2} cm²`], `Area = base × height = ${b} × ${h} = ${a} cm².`));
        } else {
            const a = R(4, 12), b = R(3, 10);
            const p = 2 * (a + b);
            qs.push(qM(`Find the perimeter of a parallelogram with sides ${a} cm and ${b} cm.`, `${p} cm`, [`${a * b} cm`, `${p + 2} cm`, `${a + b} cm`], `Perimeter = 2(a + b) = 2(${a} + ${b}) = ${p} cm.`));
        }
    }
    return qs;
};
export const genParallelogramA = () => genParallelogramP().slice(0, 15);

export const genRhombusKiteP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) {
            const d1 = R(4, 14), d2 = R(3, 12);
            const a = (d1 * d2) / 2;
            const shape = i % 4 === 0 ? 'rhombus' : 'kite';
            qs.push(qM(`Find the area of a ${shape} with diagonals ${d1} cm and ${d2} cm.`, `${a} cm²`, [`${d1 * d2} cm²`, `${a + d1} cm²`, `${d1 + d2} cm²`], `Area = (d₁ × d₂) / 2 = (${d1} × ${d2}) / 2 = ${a} cm².`));
        } else {
            const s = R(3, 12);
            const p = 4 * s;
            qs.push(qM(`Find the perimeter of a rhombus with each side ${s} cm.`, `${p} cm`, [`${s * s} cm`, `${p + 4} cm`, `${2 * s} cm`], `Perimeter = 4s = 4 × ${s} = ${p} cm (all sides equal).`));
        }
    }
    return qs;
};
export const genRhombusKiteA = () => genRhombusKiteP().slice(0, 15);

export const genTrapeziumP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) {
            const a = R(4, 14), b = R(2, a - 1), h = R(3, 10);
            const area = parseFloat(((a + b) / 2 * h).toFixed(2));
            qs.push(qM(`Find the area of a trapezium with parallel sides ${a} cm and ${b} cm, and height ${h} cm.`, `${area} cm²`, [`${(a + b) * h} cm²`, `${area + h} cm²`, `${parseFloat(((a - b) / 2 * h).toFixed(2))} cm²`], `Area = ½(a + b)h = ½(${a} + ${b}) × ${h} = ${area} cm².`));
        } else {
            const angles = [R(60, 80), R(100, 120)];
            const remaining = 360 - angles[0] - angles[1];
            const a4 = 180 - (remaining - 180 < 0 ? remaining : 180);
            const a3 = 360 - angles[0] - angles[1] - Math.abs(a4);
            const sumCheck = angles[0] + angles[1];
            qs.push(qM(`Three angles of a quadrilateral are ${angles[0]}°, ${angles[1]}°, and 85°. Find the fourth angle.`, `${360 - sumCheck - 85}°`, [`${360 - sumCheck}°`, `${180 - angles[0]}°`, `${360 - angles[0] - 85}°`], `Sum of quadrilateral angles = 360°. Fourth = 360 − ${angles[0]} − ${angles[1]} − 85 = ${360 - sumCheck - 85}°.`));
        }
    }
    return qs;
};
export const genTrapeziumA = () => genTrapeziumP().slice(0, 15);
