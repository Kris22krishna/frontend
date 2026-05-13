const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (question, correct, distractors, explanation, svg='') => {
  const u = Array.from(new Set(distractors)).filter(d => d !== correct);
  const opts = shuf([correct, ...u]);
  return { question, options: opts, correct: opts.indexOf(correct), explanation, svg };
};

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

const circleSVG = (_r_val, label_r, label_center='O', extra='') => {
  const cx=120, cy=115, R=70;
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#0ea5e9"/>
    <line x1="${cx}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,3"/>
    <text x="${cx+4}" y="${cy-6}" font-size="11" fill="#0ea5e9" font-weight="700">${label_center}</text>
    <text x="${cx+R/2}" y="${cy-8}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">${label_r}</text>
    ${extra}
  </svg>`;
};

const diameterSVG = (_d_val, label_d) => {
  const cx=120, cy=115, R=70;
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#0ea5e9"/>
    <line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="#f59e0b" stroke-width="2.5"/>
    <polygon points="${cx-R-2},${cy} ${cx-R+7},${cy-4} ${cx-R+7},${cy+4}" fill="#f59e0b"/>
    <polygon points="${cx+R+2},${cy} ${cx+R-7},${cy-4} ${cx+R-7},${cy+4}" fill="#f59e0b"/>
    <text x="${cx}" y="${cy-14}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">${label_d}</text>
    <text x="${cx+4}" y="${cy-6}" font-size="11" fill="#0ea5e9" font-weight="700">O</text>
  </svg>`;
};

const circleWithCLabel = (label_r, cLabel, isQuestion=false) => {
  const cx=120, cy=115, R=70;
  const extra = `<text x="${cx}" y="${cy-R-10}" text-anchor="middle" font-size="12" fill="#ef4444" font-weight="700">${cLabel}</text>`;
  const rLabel = isQuestion ? '?' : label_r;
  return circleSVG(null, rLabel, 'O', extra);
};

const areaCircleSVG = (label_r, aLabel='') => {
  const cx=120, cy=115, R=70;
  const extra = aLabel
    ? `<text x="${cx}" y="${cy+16}" text-anchor="middle" font-size="12" fill="#ef4444" font-weight="700">${aLabel}</text>`
    : '';
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="rgba(14,165,233,0.15)" stroke="#0ea5e9" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#0ea5e9"/>
    <line x1="${cx}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,3"/>
    <text x="${cx+4}" y="${cy-6}" font-size="11" fill="#0ea5e9" font-weight="700">O</text>
    <text x="${cx+R/2}" y="${cy-8}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">${label_r}</text>
    ${extra}
  </svg>`;
};

const sectorSVG = (_r_val, thetaDeg, label_r, label_theta) => {
  const cx=110, cy=130, R=80;
  const toRad = d => d * Math.PI / 180;
  const endX = cx + R*Math.cos(toRad(-thetaDeg));
  const endY = cy + R*Math.sin(toRad(-thetaDeg));
  const large = thetaDeg > 180 ? 1 : 0;
  const arcR = 22;
  const arcX = cx + arcR*Math.cos(toRad(-thetaDeg/2));
  const arcY = cy + arcR*Math.sin(toRad(-thetaDeg/2));
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <path d="M${cx},${cy} L${cx+R},${cy} A${R},${R} 0 ${large},0 ${endX},${endY} Z" fill="rgba(14,165,233,0.12)" stroke="#0ea5e9" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#0ea5e9"/>
    <text x="${cx+4}" y="${cy-6}" font-size="11" fill="#0ea5e9" font-weight="700">O</text>
    <text x="${(cx+cx+R)/2}" y="${cy-10}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">${label_r}</text>
    <text x="${arcX}" y="${arcY}" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#ef4444" font-weight="700">${label_theta}</text>
  </svg>`;
};

const arcSectorSVG = (_r_val, thetaDeg, label_r, label_theta, highlightArc=false) => {
  const cx=110, cy=130, R=80;
  const toRad = d => d * Math.PI / 180;
  const endX = cx + R*Math.cos(toRad(-thetaDeg));
  const endY = cy + R*Math.sin(toRad(-thetaDeg));
  const large = thetaDeg > 180 ? 1 : 0;
  const arcR = 22;
  const arcX = cx + arcR*Math.cos(toRad(-thetaDeg/2));
  const arcY = cy + arcR*Math.sin(toRad(-thetaDeg/2));
  const arcStroke = highlightArc ? '#ef4444' : '#0ea5e9';
  const arcWidth = highlightArc ? '3.5' : '2.5';
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <path d="M${cx},${cy} L${cx+R},${cy} A${R},${R} 0 ${large},0 ${endX},${endY} Z" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="1.5"/>
    <line x1="${cx}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="#0ea5e9" stroke-width="2.5"/>
    <line x1="${cx}" y1="${cy}" x2="${endX}" y2="${endY}" stroke="#0ea5e9" stroke-width="2.5"/>
    <path d="M${cx+R},${cy} A${R},${R} 0 ${large},0 ${endX},${endY}" fill="none" stroke="${arcStroke}" stroke-width="${arcWidth}"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#0ea5e9"/>
    <text x="${cx+4}" y="${cy-6}" font-size="11" fill="#0ea5e9" font-weight="700">O</text>
    <text x="${(cx+cx+R)/2}" y="${cy-10}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">${label_r}</text>
    <text x="${arcX}" y="${arcY}" text-anchor="middle" dominant-baseline="central" font-size="12" fill="#ef4444" font-weight="700">${label_theta}</text>
  </svg>`;
};

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

export const genCircumferenceP = () => {
  const qs = [];
  const pi = 3.14;
  for (let i = 0; i < 20; i++) {
    const r = R(2, 15);
    const type = i % 3;

    if (type === 0) {
      // Given radius → find circumference
      const c = parseFloat((2 * pi * r).toFixed(2));
      const svg = circleSVG(r, `r = ${r} cm`, 'O',
        `<text x="120" y="28" text-anchor="middle" font-size="12" fill="#ef4444" font-weight="700">C = ?</text>`
      );
      qs.push(qM(
        `Find the circumference of a circle with radius r = ${r} cm. (π = 3.14)`,
        `${c} cm`,
        [`${(pi * r).toFixed(2)} cm`, `${(pi * r * r).toFixed(2)} cm`, `${(c + pi).toFixed(2)} cm`],
        `C = 2πr = 2 × 3.14 × ${r} = ${c} cm.`,
        svg
      ));
    } else if (type === 1) {
      // Given diameter → find circumference
      const d = r * 2;
      const c = parseFloat((pi * d).toFixed(2));
      const svg = diameterSVG(d, `d = ${d} cm`);
      qs.push(qM(
        `A circle has diameter d = ${d} cm. Find its circumference. (π = 3.14)`,
        `${c} cm`,
        [`${(2 * pi * d).toFixed(2)} cm`, `${(pi * r).toFixed(2)} cm`, `${(c + 5).toFixed(2)} cm`],
        `C = πd = 3.14 × ${d} = ${c} cm.`,
        svg
      ));
    } else {
      // Given circumference → find radius
      const c = parseFloat((2 * pi * r).toFixed(2));
      const svg = circleWithCLabel(r, `C = ${c} cm`, true);
      qs.push(qM(
        `A circle has circumference C = ${c} cm. Find its radius. (π = 3.14)`,
        `${r} cm`,
        [`${r + 2} cm`, `${r * 2} cm`, `${r - 1} cm`],
        `r = C / (2π) = ${c} / (2 × 3.14) = ${r} cm.`,
        svg
      ));
    }
  }
  return qs;
};

export const genCircumferenceA = () => genCircumferenceP().slice(0, 15);

// ---------------------------------------------------------------------------

export const genAreaP = () => {
  const qs = [];
  const pi = 3.14;
  for (let i = 0; i < 20; i++) {
    const r = R(2, 12);
    const type = i % 2;

    if (type === 0) {
      // Given radius → find area
      const a = parseFloat((pi * r * r).toFixed(2));
      const svg = areaCircleSVG(`r = ${r} cm`);
      qs.push(qM(
        `Find the area of a circle with radius r = ${r} cm. (π = 3.14)`,
        `${a} cm²`,
        [`${(2 * pi * r).toFixed(2)} cm²`, `${(a + 10).toFixed(2)} cm²`, `${(pi * r).toFixed(2)} cm²`],
        `A = πr² = 3.14 × ${r}² = 3.14 × ${r * r} = ${a} cm².`,
        svg
      ));
    } else {
      // Given area → find radius
      const a = parseFloat((pi * r * r).toFixed(2));
      const svg = areaCircleSVG('?', `A = ${a} cm²`);
      qs.push(qM(
        `A circle has area A = ${a} cm². Find its radius. (π = 3.14)`,
        `${r} cm`,
        [`${r + 3} cm`, `${r * 2} cm`, `${r - 1} cm`],
        `r = √(A / π) = √(${a} / 3.14) = √${r * r} = ${r} cm.`,
        svg
      ));
    }
  }
  return qs;
};

export const genAreaA = () => genAreaP().slice(0, 15);

// ---------------------------------------------------------------------------

export const genArcSectorP = () => {
  const qs = [];
  const angles = [30, 45, 60, 90, 120, 180];
  const pi = 3.14;
  for (let i = 0; i < 20; i++) {
    const r = R(4, 12);
    const theta = angles[i % angles.length];
    const type = i % 2;

    if (type === 0) {
      // Arc length question
      const arc = parseFloat((theta / 360 * 2 * pi * r).toFixed(2));
      const svg = arcSectorSVG(r, theta, `r = ${r} cm`, `${theta}°`, true);
      qs.push(qM(
        `Find the arc length for a sector with radius r = ${r} cm and central angle ${theta}°. (π = 3.14)`,
        `${arc} cm`,
        [`${(arc + 2).toFixed(2)} cm`, `${(theta / 360 * pi * r * r).toFixed(2)} cm`, `${(arc * 2).toFixed(2)} cm`],
        `Arc = (θ / 360°) × 2πr = (${theta} / 360) × 2 × 3.14 × ${r} = ${arc} cm.`,
        svg
      ));
    } else {
      // Sector area question
      const sa = parseFloat((theta / 360 * pi * r * r).toFixed(2));
      const svg = sectorSVG(r, theta, `r = ${r} cm`, `${theta}°`);
      qs.push(qM(
        `Find the sector area with radius r = ${r} cm and central angle ${theta}°. (π = 3.14)`,
        `${sa} cm²`,
        [`${(sa + 5).toFixed(2)} cm²`, `${(theta / 360 * 2 * pi * r).toFixed(2)} cm²`, `${(sa * 2).toFixed(2)} cm²`],
        `Sector area = (θ / 360°) × πr² = (${theta} / 360) × 3.14 × ${r * r} = ${sa} cm².`,
        svg
      ));
    }
  }
  return qs;
};

export const genArcSectorA = () => genArcSectorP().slice(0, 15);
