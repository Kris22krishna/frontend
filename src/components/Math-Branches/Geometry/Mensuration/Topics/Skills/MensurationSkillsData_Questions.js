const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (q, c, d, e) => { const u=Array.from(new Set(d)).filter(x=>x!==c); const opts=shuf([c,...u]); return{question:q,options:opts,correct:opts.indexOf(c),explanation:e}; };

export const genRectangleP = () => {
    const qs=[];
    for(let i=0;i<20;i++){
        const l=R(4,20), w=R(2,12), type=i%3;
        if(type===0){ const p=2*(l+w); qs.push(qM(`Find the perimeter of a rectangle with length ${l} cm and width ${w} cm.`,`${p} cm`,[`${l+w} cm`,`${p+4} cm`,`${l*w} cm`],`P = 2(l+w) = 2(${l}+${w}) = ${p} cm.`)); }
        else if(type===1){ const a=l*w; qs.push(qM(`Find the area of a rectangle with length ${l} cm and width ${w} cm.`,`${a} cm²`,[`${2*(l+w)} cm²`,`${a+l} cm²`,`${a-w} cm²`],`A = l × w = ${l} × ${w} = ${a} cm².`)); }
        else{ const a=l*w; qs.push(qM(`A rectangle has area ${a} cm² and length ${l} cm. Find its width.`,`${w} cm`,[`${w+3} cm`,`${l} cm`,`${a-l} cm`],`w = A/l = ${a}/${l} = ${w} cm.`)); }
    }
    return qs;
};
export const genRectangleA = () => genRectangleP().slice(0,15);

export const genTriAreaP = () => {
    const qs=[];
    for(let i=0;i<20;i++){
        const b=R(4,20)*2, h=R(3,15)*2, area=(b*h)/2, type=i%2;
        if(type===0){ qs.push(qM(`Find the area of a triangle with base ${b} cm and height ${h} cm.`,`${area} cm²`,[`${b*h} cm²`,`${area+8} cm²`,`${b+h} cm²`],`A = ½ × b × h = ½ × ${b} × ${h} = ${area} cm².`)); }
        else{ qs.push(qM(`A triangle has area ${area} cm² and base ${b} cm. Find its height.`,`${h} cm`,[`${h+4} cm`,`${h-2} cm`,`${b} cm`],`h = 2A/b = 2×${area}/${b} = ${h} cm.`)); }
    }
    return qs;
};
export const genTriAreaA = () => genTriAreaP().slice(0,15);

export const genCircleP = () => {
    const qs=[];
    for(let i=0;i<20;i++){
        const r=R(2,14), pi=3.14, type=i%2;
        if(type===0){ const a=parseFloat((pi*r*r).toFixed(2)); qs.push(qM(`Find the area of a circle with radius ${r} cm. (π=3.14)`,`${a} cm²`,[`${(2*pi*r).toFixed(2)} cm²`,`${(a+10).toFixed(2)} cm²`,`${(pi*r).toFixed(2)} cm²`],`A = πr² = 3.14 × ${r*r} = ${a} cm².`)); }
        else{ const c=parseFloat((2*pi*r).toFixed(2)); qs.push(qM(`Find the circumference of a circle with radius ${r} cm. (π=3.14)`,`${c} cm`,[`${(pi*r*r).toFixed(2)} cm`,`${(c+pi).toFixed(2)} cm`,`${(pi*r).toFixed(2)} cm`],`C = 2πr = 2×3.14×${r} = ${c} cm.`)); }
    }
    return qs;
};
export const genCircleA = () => genCircleP().slice(0,15);

export const genCuboidP = () => {
    const qs=[];
    for(let i=0;i<20;i++){
        const l=R(3,10), w=R(2,8), h=R(2,8), type=i%2;
        if(type===0){ const v=l*w*h; qs.push(qM(`Find the volume of a cuboid with l=${l}, w=${w}, h=${h} cm.`,`${v} cm³`,[`${2*(l*w+l*h+w*h)} cm³`,`${v+l} cm³`,`${l+w+h} cm³`],`V = l×w×h = ${l}×${w}×${h} = ${v} cm³.`)); }
        else{ const sa=2*(l*w+l*h+w*h); qs.push(qM(`Find the surface area of a cuboid l=${l}, w=${w}, h=${h} cm.`,`${sa} cm²`,[`${l*w*h} cm²`,`${sa+10} cm²`,`${2*(l+w+h)} cm²`],`SA = 2(lw+lh+wh) = 2(${l*w}+${l*h}+${w*h}) = ${sa} cm².`)); }
    }
    return qs;
};
export const genCuboidA = () => genCuboidP().slice(0,15);
