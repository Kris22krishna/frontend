const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (question, correct, distractors, explanation) => { const u=Array.from(new Set(distractors)).filter(d=>d!==correct); const opts=shuf([correct,...u]); return{question,options:opts,correct:opts.indexOf(correct),explanation}; };

export const genCircumferenceP = () => {
    const qs = [];
    for(let i=0;i<20;i++){
        const r=R(2,15); const pi=3.14;
        const type=i%3;
        if(type===0){ const c=parseFloat((2*pi*r).toFixed(2)); qs.push(qM(`Find the circumference of a circle with radius ${r} cm. (π = 3.14)`,`${c} cm`,[`${(pi*r).toFixed(2)} cm`,`${(pi*r*r).toFixed(2)} cm`,`${(c+pi).toFixed(2)} cm`],`C = 2πr = 2 × 3.14 × ${r} = ${c} cm.`)); }
        else if(type===1){ const d=r*2; const c=parseFloat((pi*d).toFixed(2)); qs.push(qM(`A circle has diameter ${d} cm. Find its circumference. (π = 3.14)`,`${c} cm`,[`${(2*pi*d).toFixed(2)} cm`,`${(pi*r).toFixed(2)} cm`,`${(c+5).toFixed(2)} cm`],`C = πd = 3.14 × ${d} = ${c} cm.`)); }
        else{ const c=parseFloat((2*pi*r).toFixed(2)); qs.push(qM(`A circle has circumference ${c} cm. Find its radius. (π = 3.14)`,`${r} cm`,[`${r+2} cm`,`${r*2} cm`,`${r-1} cm`],`r = C/(2π) = ${c}/(2×3.14) = ${r} cm.`)); }
    }
    return qs;
};
export const genCircumferenceA = () => genCircumferenceP().slice(0,15);

export const genAreaP = () => {
    const qs = [];
    for(let i=0;i<20;i++){
        const r=R(2,12); const pi=3.14;
        const type=i%2;
        if(type===0){ const a=parseFloat((pi*r*r).toFixed(2)); qs.push(qM(`Find the area of a circle with radius ${r} cm. (π = 3.14)`,`${a} cm²`,[`${(2*pi*r).toFixed(2)} cm²`,`${(a+10).toFixed(2)} cm²`,`${(pi*r).toFixed(2)} cm²`],`A = πr² = 3.14 × ${r}² = 3.14 × ${r*r} = ${a} cm².`)); }
        else{ const a=parseFloat((pi*r*r).toFixed(2)); qs.push(qM(`A circle has area ${a} cm². Find its radius. (π = 3.14)`,`${r} cm`,[`${r+3} cm`,`${r*2} cm`,`${r-1} cm`],`r = √(A/π) = √(${a}/3.14) = √${r*r} = ${r} cm.`)); }
    }
    return qs;
};
export const genAreaA = () => genAreaP().slice(0,15);

export const genArcSectorP = () => {
    const qs = [];
    const angles = [30,45,60,90,120,180];
    for(let i=0;i<20;i++){
        const r=R(4,12); const theta=angles[i%angles.length]; const pi=3.14;
        const type=i%2;
        if(type===0){ const arc=parseFloat((theta/360*2*pi*r).toFixed(2)); qs.push(qM(`Find the arc length for a sector with radius ${r} cm and central angle ${theta}°. (π = 3.14)`,`${arc} cm`,[`${(arc+2).toFixed(2)} cm`,`${(theta/360*pi*r*r).toFixed(2)} cm`,`${(arc*2).toFixed(2)} cm`],`Arc = (θ/360°)×2πr = (${theta}/360)×2×3.14×${r} = ${arc} cm.`)); }
        else{ const sa=parseFloat((theta/360*pi*r*r).toFixed(2)); qs.push(qM(`Find the sector area with radius ${r} cm and central angle ${theta}°. (π = 3.14)`,`${sa} cm²`,[`${(sa+5).toFixed(2)} cm²`,`${(theta/360*2*pi*r).toFixed(2)} cm²`,`${(sa*2).toFixed(2)} cm²`],`Sector area = (θ/360°)×πr² = (${theta}/360)×3.14×${r*r} = ${sa} cm².`)); }
    }
    return qs;
};
export const genArcSectorA = () => genArcSectorP().slice(0,15);
