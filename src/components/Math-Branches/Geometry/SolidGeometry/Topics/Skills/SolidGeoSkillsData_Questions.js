const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (q, c, d, e) => { const u=Array.from(new Set(d)).filter(x=>x!==c); const opts=shuf([c,...u]); return{question:q,options:opts,correct:opts.indexOf(c),explanation:e}; };

export const genCylinderP = () => {
    const qs=[]; const pi=3.14;
    for(let i=0;i<20;i++){
        const r=R(2,10), h=R(3,15), type=i%2;
        if(type===0){ const v=parseFloat((pi*r*r*h).toFixed(2)); qs.push(qM(`Find the volume of a cylinder with radius ${r} cm and height ${h} cm. (π=3.14)`,`${v} cm³`,[`${(2*pi*r*(r+h)).toFixed(2)} cm³`,`${(v+pi*r).toFixed(2)} cm³`,`${(pi*r*h).toFixed(2)} cm³`],`V = πr²h = 3.14×${r*r}×${h} = ${v} cm³.`)); }
        else{ const sa=parseFloat((2*pi*r*(r+h)).toFixed(2)); qs.push(qM(`Find the total surface area of a cylinder with radius ${r} cm and height ${h} cm. (π=3.14)`,`${sa} cm²`,[`${(pi*r*r*h).toFixed(2)} cm²`,`${(2*pi*r*h).toFixed(2)} cm²`,`${(sa+pi*r).toFixed(2)} cm²`],`SA = 2πr(r+h) = 2×3.14×${r}×(${r}+${h}) = ${sa} cm².`)); }
    }
    return qs;
};
export const genCylinderA = () => genCylinderP().slice(0,15);

export const genSphereP = () => {
    const qs=[]; const pi=3.14;
    for(let i=0;i<20;i++){
        const r=R(2,10), type=i%2;
        if(type===0){ const v=parseFloat((4/3*pi*r*r*r).toFixed(2)); qs.push(qM(`Find the volume of a sphere with radius ${r} cm. (π=3.14)`,`${v} cm³`,[`${(4*pi*r*r).toFixed(2)} cm³`,`${(v+pi).toFixed(2)} cm³`,`${(pi*r*r*r).toFixed(2)} cm³`],`V = ⁴⁄₃πr³ = (4/3)×3.14×${r}³ = ${v} cm³.`)); }
        else{ const sa=parseFloat((4*pi*r*r).toFixed(2)); qs.push(qM(`Find the surface area of a sphere with radius ${r} cm. (π=3.14)`,`${sa} cm²`,[`${(4/3*pi*r*r*r).toFixed(2)} cm²`,`${(2*pi*r*r).toFixed(2)} cm²`,`${(sa+pi*r).toFixed(2)} cm²`],`SA = 4πr² = 4×3.14×${r*r} = ${sa} cm².`)); }
    }
    return qs;
};
export const genSphereA = () => genSphereP().slice(0,15);

export const genConeP = () => {
    const qs=[]; const pi=3.14;
    const triples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10]];
    for(let i=0;i<20;i++){
        const [r,h,l]=triples[i%triples.length], type=i%2;
        if(type===0){ const v=parseFloat((1/3*pi*r*r*h).toFixed(2)); qs.push(qM(`Find the volume of a cone with radius ${r} cm and height ${h} cm. (π=3.14)`,`${v} cm³`,[`${(pi*r*r*h).toFixed(2)} cm³`,`${(v+5).toFixed(2)} cm³`,`${(pi*r*l).toFixed(2)} cm³`],`V = ⅓πr²h = (1/3)×3.14×${r*r}×${h} = ${v} cm³.`)); }
        else{ const sa=parseFloat((pi*r*(r+l)).toFixed(2)); qs.push(qM(`Find the total surface area of a cone with radius ${r} cm and slant height ${l} cm. (π=3.14)`,`${sa} cm²`,[`${(1/3*pi*r*r*h).toFixed(2)} cm²`,`${(pi*r*l).toFixed(2)} cm²`,`${(sa+pi*r).toFixed(2)} cm²`],`SA = πr(r+l) = 3.14×${r}×(${r}+${l}) = ${sa} cm².`)); }
    }
    return qs;
};
export const genConeA = () => genConeP().slice(0,15);
