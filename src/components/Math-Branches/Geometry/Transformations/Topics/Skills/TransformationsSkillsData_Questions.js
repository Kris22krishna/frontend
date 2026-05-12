const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (q, c, d, e) => { const u=Array.from(new Set(d)).filter(x=>x!==c); const opts=shuf([c,...u]); return{question:q,options:opts,correct:opts.indexOf(c),explanation:e}; };

export const genTranslationP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const x = R(-6, 6), y = R(-6, 6), a = R(-5, 5), b = R(-5, 5);
        const nx = x + a, ny = y + b;
        const ans = `(${nx}, ${ny})`;
        qs.push(qM(
            `Translate point (${x}, ${y}) by vector (${a}, ${b}). What is the image?`,
            ans,
            [`(${x - a}, ${y - b})`, `(${x + b}, ${y + a})`, `(${nx + 1}, ${ny})`],
            `Add the vector components: (${x}+${a}, ${y}+${b}) = (${nx}, ${ny}).`
        ));
    }
    return qs;
};
export const genTranslationA = () => genTranslationP().slice(0, 15);

export const genReflectionP = () => {
    const qs = [];
    const axes = [
        { label: 'x-axis', rule: (x, y) => [x, -y], desc: 'Reflect in x-axis: (x, y) → (x, −y)' },
        { label: 'y-axis', rule: (x, y) => [-x, y], desc: 'Reflect in y-axis: (x, y) → (−x, y)' },
        { label: 'y = x', rule: (x, y) => [y, x], desc: 'Reflect in y = x: (x, y) → (y, x)' },
        { label: 'y = −x', rule: (x, y) => [-y, -x], desc: 'Reflect in y = −x: (x, y) → (−y, −x)' },
    ];
    for (let i = 0; i < 20; i++) {
        const x = R(-6, 6) || 1, y = R(-6, 6) || 2;
        const ax = axes[i % axes.length];
        const [nx, ny] = ax.rule(x, y);
        const ans = `(${nx}, ${ny})`;
        qs.push(qM(
            `Reflect the point (${x}, ${y}) in the ${ax.label}. What is the image?`,
            ans,
            [`(${-nx}, ${-ny})`, `(${ny}, ${nx})`, `(${nx + 1}, ${ny})`],
            `${ax.desc}. So (${x}, ${y}) → (${nx}, ${ny}).`
        ));
    }
    return qs;
};
export const genReflectionA = () => genReflectionP().slice(0, 15);

export const genRotationP = () => {
    const qs = [];
    const rots = [
        { angle: '90° anticlockwise', rule: (x, y) => [-y, x], desc: '90° anticlockwise: (x, y) → (−y, x)' },
        { angle: '180°', rule: (x, y) => [-x, -y], desc: '180°: (x, y) → (−x, −y)' },
        { angle: '90° clockwise', rule: (x, y) => [y, -x], desc: '90° clockwise: (x, y) → (y, −x)' },
    ];
    for (let i = 0; i < 20; i++) {
        const x = R(-5, 5) || 1, y = R(-5, 5) || 2;
        const rot = rots[i % rots.length];
        const [nx, ny] = rot.rule(x, y);
        const ans = `(${nx}, ${ny})`;
        qs.push(qM(
            `Rotate point (${x}, ${y}) by ${rot.angle} about the origin. What is the image?`,
            ans,
            [`(${-nx}, ${ny})`, `(${nx}, ${-ny})`, `(${-ny}, ${-nx})`],
            `${rot.desc}. So (${x}, ${y}) → (${nx}, ${ny}).`
        ));
    }
    return qs;
};
export const genRotationA = () => genRotationP().slice(0, 15);

export const genDilationP = () => {
    const qs = [];
    const factors = [2, 3, 0.5, 4];
    for (let i = 0; i < 20; i++) {
        const x = R(1, 6), y = R(1, 6);
        const k = factors[i % factors.length];
        const nx = k * x, ny = k * y;
        const ans = `(${nx}, ${ny})`;
        const type = i % 2 === 0 ? 'coordinates' : 'scale';
        if (type === 'coordinates') {
            qs.push(qM(
                `Dilate point (${x}, ${y}) by scale factor ${k} from the origin. What is the image?`,
                ans,
                [`(${x + k}, ${y + k})`, `(${nx + 1}, ${ny})`, `(${ny}, ${nx})`],
                `Multiply each coordinate by k=${k}: (${k}×${x}, ${k}×${y}) = (${nx}, ${ny}).`
            ));
        } else {
            const d1 = Math.sqrt(x*x+y*y).toFixed(2);
            const d2 = (k * Math.sqrt(x*x+y*y)).toFixed(2);
            qs.push(qM(
                `A point is at distance ${d1} units from the origin. After dilation by scale factor ${k}, its distance from the origin is:`,
                `${d2} units`,
                [`${d1} units`, `${(parseFloat(d1)+k).toFixed(2)} units`, `${(parseFloat(d1)*k + 1).toFixed(2)} units`],
                `Dilation multiplies all distances from the centre by k=${k}. Distance = ${k} × ${d1} = ${d2}.`
            ));
        }
    }
    return qs;
};
export const genDilationA = () => genDilationP().slice(0, 15);
