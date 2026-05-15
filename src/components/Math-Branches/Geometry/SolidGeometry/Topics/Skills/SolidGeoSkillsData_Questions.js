const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (q, c, d, e, svg) => { const u=Array.from(new Set(d)).filter(x=>x!==c); const opts=shuf([c,...u]); return{question:q,options:opts,correct:opts.indexOf(c),explanation:e,svg:svg||null}; };

const cylinderSVG = (label_r, label_h) => `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- body -->
  <rect x="60" y="60" width="120" height="100" fill="rgba(14,165,233,0.08)" stroke="none"/>
  <!-- bottom ellipse -->
  <ellipse cx="120" cy="160" rx="60" ry="18" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" stroke-width="2"/>
  <!-- top ellipse -->
  <ellipse cx="120" cy="60" rx="60" ry="18" fill="rgba(14,165,233,0.15)" stroke="#0ea5e9" stroke-width="2"/>
  <!-- sides -->
  <line x1="60" y1="60" x2="60" y2="160" stroke="#0ea5e9" stroke-width="2"/>
  <line x1="180" y1="60" x2="180" y2="160" stroke="#0ea5e9" stroke-width="2"/>
  <!-- radius line on top -->
  <line x1="120" y1="60" x2="180" y2="60" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="150" y="52" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">r = ${label_r}</text>
  <!-- height arrow -->
  <line x1="195" y1="60" x2="195" y2="160" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="190" y1="64" x2="195" y2="60" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="200" y1="64" x2="195" y2="60" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="190" y1="156" x2="195" y2="160" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="200" y1="156" x2="195" y2="160" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="210" y="115" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700" transform="rotate(90,210,115)">h = ${label_h}</text>
</svg>`;

const sphereSVG = (label_r) => `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="120" cy="110" r="75" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" stroke-width="2.5"/>
  <ellipse cx="120" cy="110" rx="75" ry="22" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="6,4"/>
  <circle cx="120" cy="110" r="3" fill="#0ea5e9"/>
  <text x="123" y="104" font-size="11" fill="#0ea5e9" font-weight="700">O</text>
  <line x1="120" y1="110" x2="195" y2="110" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="158" y="102" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">r = ${label_r}</text>
</svg>`;

const coneSVG = (r_val, h_val, l_val) => `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- cone body -->
  <polygon points="120,25 60,175 180,175" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" stroke-width="2.5"/>
  <!-- base ellipse -->
  <ellipse cx="120" cy="175" rx="60" ry="16" fill="rgba(14,165,233,0.12)" stroke="#0ea5e9" stroke-width="2"/>
  <!-- height line (dashed) -->
  <line x1="120" y1="25" x2="120" y2="175" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- right angle at base -->
  <rect x="120" y="163" width="10" height="10" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <!-- height label -->
  <text x="108" y="105" text-anchor="end" font-size="12" fill="#f59e0b" font-weight="700">h=${h_val}</text>
  <!-- radius label -->
  <text x="150" y="192" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">r=${r_val}</text>
  <!-- slant height label -->
  <text x="162" y="108" text-anchor="start" font-size="12" fill="#ef4444" font-weight="700">l=${l_val}</text>
</svg>`;

export const genCylinderP = () => {
    const qs=[]; const pi=3.14;
    for(let i=0;i<20;i++){
        const r=R(2,10), h=R(3,15), type=i%2;
        const svg = cylinderSVG(r, h);
        if(type===0){
            const v=parseFloat((pi*r*r*h).toFixed(2));
            qs.push(qM(
                `Find the volume of a cylinder with radius ${r} cm and height ${h} cm. (π=3.14)`,
                `${v} cm³`,
                [`${(2*pi*r*(r+h)).toFixed(2)} cm³`, `${(v+pi*r).toFixed(2)} cm³`, `${(pi*r*h).toFixed(2)} cm³`],
                `V = πr²h = 3.14×${r*r}×${h} = ${v} cm³.`,
                svg
            ));
        } else {
            const sa=parseFloat((2*pi*r*(r+h)).toFixed(2));
            qs.push(qM(
                `Find the total surface area of a cylinder with radius ${r} cm and height ${h} cm. (π=3.14)`,
                `${sa} cm²`,
                [`${(pi*r*r*h).toFixed(2)} cm²`, `${(2*pi*r*h).toFixed(2)} cm²`, `${(sa+pi*r).toFixed(2)} cm²`],
                `SA = 2πr(r+h) = 2×3.14×${r}×(${r}+${h}) = ${sa} cm².`,
                svg
            ));
        }
    }
    return qs;
};
export const genCylinderA = () => genCylinderP().slice(0,15);

export const genSphereP = () => {
    const qs=[]; const pi=3.14;
    for(let i=0;i<20;i++){
        const r=R(2,10), type=i%2;
        const svg = sphereSVG(r);
        if(type===0){
            const v=parseFloat((4/3*pi*r*r*r).toFixed(2));
            qs.push(qM(
                `Find the volume of a sphere with radius ${r} cm. (π=3.14)`,
                `${v} cm³`,
                [`${(4*pi*r*r).toFixed(2)} cm³`, `${(v+pi).toFixed(2)} cm³`, `${(pi*r*r*r).toFixed(2)} cm³`],
                `V = ⁴⁄₃πr³ = (4/3)×3.14×${r}³ = ${v} cm³.`,
                svg
            ));
        } else {
            const sa=parseFloat((4*pi*r*r).toFixed(2));
            qs.push(qM(
                `Find the surface area of a sphere with radius ${r} cm. (π=3.14)`,
                `${sa} cm²`,
                [`${(4/3*pi*r*r*r).toFixed(2)} cm²`, `${(2*pi*r*r).toFixed(2)} cm²`, `${(sa+pi*r).toFixed(2)} cm²`],
                `SA = 4πr² = 4×3.14×${r*r} = ${sa} cm².`,
                svg
            ));
        }
    }
    return qs;
};
export const genSphereA = () => genSphereP().slice(0,15);

export const genConeP = () => {
    const qs=[]; const pi=3.14;
    const triples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10]];
    for(let i=0;i<20;i++){
        const [r,h,l]=triples[i%triples.length], type=i%2;
        const svg = coneSVG(r, h, l);
        if(type===0){
            const v=parseFloat((1/3*pi*r*r*h).toFixed(2));
            qs.push(qM(
                `Find the volume of a cone with radius ${r} cm and height ${h} cm. (π=3.14)`,
                `${v} cm³`,
                [`${(pi*r*r*h).toFixed(2)} cm³`, `${(v+5).toFixed(2)} cm³`, `${(pi*r*l).toFixed(2)} cm³`],
                `V = ⅓πr²h = (1/3)×3.14×${r*r}×${h} = ${v} cm³.`,
                svg
            ));
        } else {
            const sa=parseFloat((pi*r*(r+l)).toFixed(2));
            qs.push(qM(
                `Find the total surface area of a cone with radius ${r} cm and slant height ${l} cm. (π=3.14)`,
                `${sa} cm²`,
                [`${(1/3*pi*r*r*h).toFixed(2)} cm²`, `${(pi*r*l).toFixed(2)} cm²`, `${(sa+pi*r).toFixed(2)} cm²`],
                `SA = πr(r+l) = 3.14×${r}×(${r}+${l}) = ${sa} cm².`,
                svg
            ));
        }
    }
    return qs;
};
export const genConeA = () => genConeP().slice(0,15);
