// Linear Inequalities — Dynamic Question Generators (NCERT Class 11 Ch 6)
// Each export is a FUNCTION returning a fresh array of 20 questions.

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeQ(question, correct, distractors, explanation, svg = null) {
  const allOpts = [correct, ...distractors.filter(d => d !== correct)].slice(0, 4);
  while (allOpts.length < 4) allOpts.push(`Option ${String.fromCharCode(65 + allOpts.length)}`);
  const shuffled = shuffle(allOpts.slice(0, 4));
  return { question, options: shuffled, correct: shuffled.indexOf(correct), explanation, ...(svg ? { svg } : {}) };
}

// ─── SVG HELPERS ────────────────────────────────────────────────────────────

function numberLineSVG(point, type, color = '#6366f1') {
  const W = 400, H = 80, Y = 40;
  const span = 10;
  const startVal = point - span / 2 - 1;
  const toX = v => 30 + ((v - startVal) / (span + 2)) * 340;
  const px = Math.min(Math.max(toX(point), 30), 370);
  const filled = type === 'lte' || type === 'gte';
  const goLeft = type === 'lt' || type === 'lte';
  const shadeEnd = goLeft ? px : 370;
  const shadeStart = goLeft ? 30 : px;

  let ticks = '';
  for (let v = Math.ceil(startVal); v <= startVal + span + 2; v++) {
    const x = toX(v);
    if (x < 20 || x > 380) continue;
    ticks += `<line x1="${x.toFixed(1)}" y1="${Y - 5}" x2="${x.toFixed(1)}" y2="${Y + 5}" stroke="#94a3b8" stroke-width="1.5"/>`;
    ticks += `<text x="${x.toFixed(1)}" y="${Y + 20}" text-anchor="middle" font-size="11" fill="#64748b" font-family="Arial">${v}</text>`;
  }

  const circleEl = filled
    ? `<circle cx="${px.toFixed(1)}" cy="${Y}" r="7" fill="${color}" stroke="${color}" stroke-width="2"/>`
    : `<circle cx="${px.toFixed(1)}" cy="${Y}" r="7" fill="white" stroke="${color}" stroke-width="3"/>`;

  const arrowEl = goLeft
    ? `<polygon points="30,${Y - 6} 18,${Y} 30,${Y + 6}" fill="${color}"/>`
    : `<polygon points="370,${Y - 6} 382,${Y} 370,${Y + 6}" fill="${color}"/>`;

  return `<svg width="400" height="80" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;display:block;margin:0 auto;max-width:100%">
    <line x1="18" y1="${Y}" x2="382" y2="${Y}" stroke="#cbd5e1" stroke-width="1.5"/>
    <polygon points="380,${Y - 4} 390,${Y} 380,${Y + 4}" fill="#cbd5e1"/>
    <polygon points="20,${Y - 4} 10,${Y} 20,${Y + 4}" fill="#cbd5e1"/>
    ${ticks}
    <rect x="${shadeStart.toFixed(1)}" y="${Y - 5}" width="${(shadeEnd - shadeStart).toFixed(1)}" height="10" fill="${color}" opacity="0.25" rx="3"/>
    <line x1="${shadeStart.toFixed(1)}" y1="${Y}" x2="${shadeEnd.toFixed(1)}" y2="${Y}" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
    ${arrowEl}
    ${circleEl}
  </svg>`;
}

function compoundLineSVG(a, b, typeLeft, typeRight, color = '#0891b2') {
  const W = 400, H = 80, Y = 40;
  const startVal = a - 3;
  const span = (b - a) + 6;
  const toX = v => 30 + ((v - startVal) / span) * 340;
  const ax = Math.min(Math.max(toX(a), 35), 365);
  const bx = Math.min(Math.max(toX(b), 35), 365);
  const filledA = typeLeft === 'gte' || typeLeft === 'lte';
  const filledB = typeRight === 'gte' || typeRight === 'lte';

  let ticks = '';
  for (let v = Math.ceil(startVal); v <= startVal + span; v++) {
    const x = toX(v);
    if (x < 20 || x > 380) continue;
    ticks += `<line x1="${x.toFixed(1)}" y1="${Y - 5}" x2="${x.toFixed(1)}" y2="${Y + 5}" stroke="#94a3b8" stroke-width="1.5"/>`;
    ticks += `<text x="${x.toFixed(1)}" y="${Y + 20}" text-anchor="middle" font-size="11" fill="#64748b" font-family="Arial">${v}</text>`;
  }

  const circA = filledA
    ? `<circle cx="${ax.toFixed(1)}" cy="${Y}" r="7" fill="${color}" stroke="${color}" stroke-width="2"/>`
    : `<circle cx="${ax.toFixed(1)}" cy="${Y}" r="7" fill="white" stroke="${color}" stroke-width="3"/>`;
  const circB = filledB
    ? `<circle cx="${bx.toFixed(1)}" cy="${Y}" r="7" fill="${color}" stroke="${color}" stroke-width="2"/>`
    : `<circle cx="${bx.toFixed(1)}" cy="${Y}" r="7" fill="white" stroke="${color}" stroke-width="3"/>`;

  return `<svg width="400" height="80" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;display:block;margin:0 auto;max-width:100%">
    <line x1="18" y1="${Y}" x2="382" y2="${Y}" stroke="#cbd5e1" stroke-width="1.5"/>
    <polygon points="380,${Y - 4} 390,${Y} 380,${Y + 4}" fill="#cbd5e1"/>
    <polygon points="20,${Y - 4} 10,${Y} 20,${Y + 4}" fill="#cbd5e1"/>
    ${ticks}
    <rect x="${ax.toFixed(1)}" y="${Y - 5}" width="${(bx - ax).toFixed(1)}" height="10" fill="${color}" opacity="0.25" rx="3"/>
    <line x1="${ax.toFixed(1)}" y1="${Y}" x2="${bx.toFixed(1)}" y2="${Y}" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
    ${circA}
    ${circB}
  </svg>`;
}

function halfPlaneSVG(a, b, c, type, color = '#7c3aed') {
  const W = 260, H = 220, cx = 130, cy = 110, unit = 25;
  const toSx = x => cx + x * unit;
  const toSy = y => cy - y * unit;

  let linePts = '';
  let fillPts = '';
  const solid = type === 'lte' || type === 'gte';

  if (b !== 0) {
    const x1 = -4, y1 = (c - a * x1) / b;
    const x2 = 4, y2 = (c - a * x2) / b;
    linePts = `${toSx(x1)},${toSy(y1)} ${toSx(x2)},${toSy(y2)}`;

    const shade = (type === 'lte' || type === 'lt');
    const fy = shade ? toSy(-5) : toSy(5);
    fillPts = `${toSx(x1)},${toSy(y1)} ${toSx(x2)},${toSy(y2)} ${toSx(x2)},${fy} ${toSx(x1)},${fy}`;
  } else {
    const xVal = c / a;
    const sx = toSx(xVal);
    linePts = `${sx},${toSy(-4)} ${sx},${toSy(4)}`;
    const shade = (type === 'lte' || type === 'lt');
    fillPts = `${toSx(-4)},${toSy(-4)} ${sx},${toSy(-4)} ${sx},${toSy(4)} ${toSx(-4)},${toSy(4)}`;
    if (!shade) fillPts = `${sx},${toSy(-4)} ${toSx(4)},${toSy(-4)} ${toSx(4)},${toSy(4)} ${sx},${toSy(4)}`;
  }

  let gridLines = '';
  for (let i = -4; i <= 4; i++) {
    gridLines += `<line x1="${toSx(i)}" y1="${toSy(-4)}" x2="${toSx(i)}" y2="${toSy(4)}" stroke="#f1f5f9" stroke-width="1"/>`;
    gridLines += `<line x1="${toSx(-4)}" y1="${toSy(i)}" x2="${toSx(4)}" y2="${toSy(i)}" stroke="#f1f5f9" stroke-width="1"/>`;
  }

  let axisLabels = '';
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      axisLabels += `<text x="${toSx(i)}" y="${cy + 14}" text-anchor="middle" font-size="9" fill="#94a3b8">${i}</text>`;
      axisLabels += `<text x="${cx - 14}" y="${toSy(i) + 4}" text-anchor="middle" font-size="9" fill="#94a3b8">${i}</text>`;
    }
  }

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="background:#fff;border-radius:12px;border:1px solid #e2e8f0;display:block;margin:0 auto">
    ${gridLines}
    <line x1="${toSx(-4.5)}" y1="${cy}" x2="${toSx(4.5)}" y2="${cy}" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="${cx}" y1="${toSy(-4.5)}" x2="${cx}" y2="${toSy(4.5)}" stroke="#94a3b8" stroke-width="1.5"/>
    <polygon points="${toSx(4.5)},${cy - 4} ${toSx(5)},${cy} ${toSx(4.5)},${cy + 4}" fill="#94a3b8"/>
    <polygon points="${cx - 4},${toSy(4.5)} ${cx},${toSy(5)} ${cx + 4},${toSy(4.5)}" fill="#94a3b8"/>
    ${axisLabels}
    <text x="${toSx(4.2)}" y="${cy - 6}" font-size="11" fill="#64748b">x</text>
    <text x="${cx + 6}" y="${toSy(4.2)}" font-size="11" fill="#64748b">y</text>
    <polygon points="${fillPts}" fill="${color}" opacity="0.18"/>
    <polyline points="${linePts}" stroke="${color}" stroke-width="2.5" fill="none" stroke-dasharray="${solid ? '' : '6,4'}"/>
    <text x="10" y="20" font-size="10" fill="${color}" font-weight="bold">${a}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}y ${type === 'lte' ? '≤' : type === 'lt' ? '<' : type === 'gte' ? '≥' : '>'} ${c}</text>
  </svg>`;
}

// ─── SKILL 1: PROPERTIES OF INEQUALITIES ────────────────────────────────────

export function generatePropertiesQuestions() {
  const qs = [];

  // Q1-4: Addition/Subtraction Property
  const a1 = R(2, 10), b1 = R(1, 9), c1 = R(1, 8);
  qs.push(makeQ(
    `If $${a1} > ${b1}$, then $${a1} + ${c1}$ is:`,
    `Greater than $${b1 + c1}$`,
    [`Less than $${b1 + c1}$`, `Equal to $${b1 + c1}$`, `Cannot be determined`],
    `Adding $${c1}$ to both sides preserves the inequality: $${a1} + ${c1} > ${b1} + ${c1}$, i.e., $${a1 + c1} > ${b1 + c1}$.`
  ));

  const a2 = R(5, 15), b2 = R(1, a2 - 1), c2 = R(2, 8);
  qs.push(makeQ(
    `If $x > ${a2}$, then $x - ${c2}$ is:`,
    `Greater than $${a2 - c2}$`,
    [`Less than $${a2 - c2}$`, `Equal to $${a2 - c2}$`, `Greater than $${a2}$`],
    `Subtracting $${c2}$ from both sides: $x - ${c2} > ${a2} - ${c2} = ${a2 - c2}$.`
  ));

  // Q3-4: Multiplication (positive)
  const m1 = R(2, 6), n1 = R(1, m1 - 1), k1 = R(2, 5);
  qs.push(makeQ(
    `If $${m1} > ${n1}$ and $c = ${k1} > 0$, then $${m1}c$ versus $${n1}c$:`,
    `$${m1 * k1} > ${n1 * k1}$ (inequality preserved)`,
    [`$${m1 * k1} < ${n1 * k1}$ (inequality reverses)`, `$${m1 * k1} = ${n1 * k1}$`, `Cannot determine`],
    `Multiplying by a positive number preserves the inequality: $${m1} \\times ${k1} = ${m1 * k1} > ${n1} \\times ${k1} = ${n1 * k1}$.`
  ));

  qs.push(makeQ(
    'If $a > b$ and $c > 0$, then:',
    '$ac > bc$',
    ['$ac < bc$', '$ac = bc$', '$ac \\leq bc$'],
    'Multiplying both sides by a positive number preserves the inequality direction.'
  ));

  // Q5-8: Multiplication by negative (FLIP!)
  const p1 = R(3, 10), q1 = R(1, p1 - 1), neg1 = R(2, 5);
  qs.push(makeQ(
    `If $${p1} > ${q1}$, multiply both sides by $-${neg1}$. What happens?`,
    `$-${p1 * neg1} < -${q1 * neg1}$ (inequality FLIPS)`,
    [`$-${p1 * neg1} > -${q1 * neg1}$ (preserved)`, `$-${p1 * neg1} = -${q1 * neg1}$`, `Result is undefined`],
    `Multiplying by $-${neg1}$ (negative) reverses the inequality: $${p1} \\times (-${neg1}) = -${p1 * neg1}$ which is LESS than $${q1} \\times (-${neg1}) = -${q1 * neg1}$.`
  ));

  qs.push(makeQ(
    'If $a > b$ and $c < 0$, then:',
    '$ac < bc$ (inequality reverses)',
    ['$ac > bc$ (preserved)', '$ac = bc$', '$ac \\geq bc$'],
    'Multiplying or dividing by a NEGATIVE number ALWAYS reverses the inequality sign. This is the most important rule!'
  ));

  const r1 = R(4, 12), s1 = R(1, r1 - 1);
  qs.push(makeQ(
    `Dividing $${r1} > ${s1}$ by $-1$ gives:`,
    `$-${r1} < -${s1}$`,
    [`$-${r1} > -${s1}$`, `$-${r1} = -${s1}$`, `$${r1} < -${s1}$`],
    `Dividing by $-1$ reverses: $${r1} > ${s1} \\Rightarrow -${r1} < -${s1}$. Check: $-${r1}$ is to the left of $-${s1}$ on the number line.`
  ));

  qs.push(makeQ(
    'Which operation does NOT reverse the inequality sign?',
    'Adding a negative number to both sides',
    ['Multiplying both sides by $-2$', 'Dividing both sides by $-3$', 'Multiplying both sides by $-1$'],
    'Addition (or subtraction) of any number — positive or negative — NEVER reverses the inequality. Only multiplication/division by negatives does.'
  ));

  // Q9-12: Transitive & comparison
  const t1 = R(2, 5), t2 = t1 + R(1, 3), t3 = t2 + R(1, 3);
  qs.push(makeQ(
    `If $${t1} < ${t2}$ and $${t2} < ${t3}$, then:`,
    `$${t1} < ${t3}$ (transitive property)`,
    [`$${t1} > ${t3}$`, `$${t1} = ${t3}$`, `$${t3} < ${t1}$`],
    `By the transitive property of inequalities: if $a < b$ and $b < c$, then $a < c$. So $${t1} < ${t3}$.`
  ));

  qs.push(makeQ(
    'The transitive property of inequalities states:',
    'If $a > b$ and $b > c$, then $a > c$',
    ['If $a > b$ then $b > a$', 'If $a > b$ and $b > c$, then $a = c$', 'If $a > b$ then $a + b > 0$'],
    'Transitivity: the "greater than" relationship passes through the middle element.'
  ));

  // Q11-12: Special cases
  qs.push(makeQ(
    'If $3x < 0$, then:',
    '$x < 0$',
    ['$x > 0$', '$x = 0$', '$x \\leq 0$'],
    'Dividing by $3$ (positive, so NO flip): $x < 0/3 = 0$.'
  ));

  qs.push(makeQ(
    'If $-5x > 0$, then:',
    '$x < 0$ (sign flips when dividing by $-5$)',
    ['$x > 0$', '$x = 0$', '$x \\geq 0$'],
    'Dividing by $-5$ reverses: $x < 0/-5 = 0$. So $x < 0$.'
  ));

  // Q13-16: Mixed practice
  const v1 = R(2, 8), v2 = R(2, 6);
  qs.push(makeQ(
    `If $x < ${v1}$ and $y < ${v2}$, can we conclude $x + y < ${v1 + v2}$?`,
    `Yes — adding inequalities of the same type`,
    [`No — addition reverses the sign`, `Only if $x, y > 0$`, `Only for integers`],
    `If $a < b$ and $c < d$, then $a + c < b + d$. So $x + y < ${v1} + ${v2} = ${v1 + v2}$.`
  ));

  qs.push(makeQ(
    'Which pair of inequalities can be added directly?',
    '$a > b$ and $c > d$ $\\Rightarrow$ $a + c > b + d$',
    ['$a > b$ and $c < d$ $\\Rightarrow$ $a + c > b + d$', '$a > b$ and $c < d$ $\\Rightarrow$ $ac > bd$', '$a < b$ and $c > d$ $\\Rightarrow$ $ac < bd$'],
    'Inequalities in the SAME direction can be added: both $>$ means sum is $>$. You cannot add inequalities in opposite directions.'
  ));

  qs.push(makeQ(
    'If $|a| < |b|$, which is true?',
    '$a^2 < b^2$ always (squaring preserves direction for absolute values)',
    ['$a < b$ always', '$-a < -b$', '$a^2 > b^2$'],
    'Since $|a| < |b|$, squaring both sides (both non-negative) gives $|a|^2 < |b|^2$, i.e., $a^2 < b^2$.'
  ));

  qs.push(makeQ(
    'For any real $x$, which is always true?',
    '$x^2 \\geq 0$',
    ['$x > 0$', '$x^2 > 1$', '$x^2 = x \\cdot x > x$'],
    'The square of any real number is non-negative: $x^2 \\geq 0$, with equality only when $x = 0$.'
  ));

  // Q17-20: Advanced properties
  qs.push(makeQ(
    'If $a > 0$ and $b > 0$ and $a > b$, then:',
    '$\\frac{1}{a} < \\frac{1}{b}$ (reciprocal reverses)',
    ['$\\frac{1}{a} > \\frac{1}{b}$', '$\\frac{1}{a} = \\frac{1}{b}$', `Cannot determine`],
    'For positive numbers, the greater the number, the smaller its reciprocal. $a > b > 0 \\Rightarrow \\frac{1}{a} < \\frac{1}{b}$.'
  ));

  const e1 = R(3, 9);
  qs.push(makeQ(
    `If $x^2 < ${e1 * e1}$ and $x > 0$, then $x$ is in:`,
    `$0 < x < ${e1}$`,
    [`$x > ${e1}$`, `$x < -${e1}$`, `$-${e1} < x < ${e1}$`],
    `$x^2 < ${e1 * e1}$ gives $|x| < ${e1}$, i.e., $-${e1} < x < ${e1}$. Since $x > 0$, we get $0 < x < ${e1}$.`
  ));

  qs.push(makeQ(
    'If $a + b > 0$ and $a - b > 0$, then:',
    '$a > 0$ and $a > |b|$',
    ['$a > 0$ and $b > 0$', '$a > b > 0$', '$a < 0$ and $b < 0$'],
    'Adding: $2a > 0 \\Rightarrow a > 0$. Subtracting: $2b > 0$... Wait — from $a+b>0$ and $a-b>0$: first gives $a > -b$, second gives $a > b$. So $a > |b|$.'
  ));

  qs.push(makeQ(
    'For which value of $k$ does $kx > ky$ NOT imply $x > y$?',
    '$k < 0$ (negative)',
    ['$k > 0$ (positive)', '$k = 1$', '$k = 2$'],
    'When $k < 0$, multiplying/dividing by it reverses the inequality. So $kx > ky$ with $k < 0$ gives $x < y$, NOT $x > y$.'
  ));

  return shuffle(qs).slice(0, 20);
}

export function generatePropertiesAssessment() {
  const qs = [];

  for (let i = 0; i < 5; i++) {
    const a = R(3, 12), b = R(1, a - 1), neg = R(2, 4);
    qs.push(makeQ(
      `If $${a} > ${b}$, then $${a} \\times (-${neg})$ compared to $${b} \\times (-${neg})$:`,
      `$-${a * neg} < -${b * neg}$ (inequality reverses)`,
      [`$-${a * neg} > -${b * neg}$`, `$-${a * neg} = -${b * neg}$`, `Cannot compare`],
      `Multiplying both by $-${neg}$ reverses: $-${a * neg} < -${b * neg}$.`
    ));
  }

  qs.push(makeQ('If $a > b > 0$, then $\\sqrt{a}$ vs $\\sqrt{b}$:', '$\\sqrt{a} > \\sqrt{b}$ (square root is increasing)', ['$\\sqrt{a} < \\sqrt{b}$', '$\\sqrt{a} = \\sqrt{b}$', 'Cannot compare'], 'Square root is a monotonically increasing function for positive numbers, so it preserves the order.'));
  qs.push(makeQ('If $-3 < x < 3$, then $x^2$:', '$x^2 < 9$ and $x^2 \\geq 0$', ['$x^2 > 9$', '$x^2 = 9$', '$x^2 < 0$'], '$|x| < 3 \\Rightarrow x^2 < 9$. Also $x^2 \\geq 0$ always.'));
  qs.push(makeQ('The inequality $a^2 + b^2 \\geq 2ab$ is:', 'Always true (AM-GM inequality)', ['Always false', 'True only when $a, b > 0$', 'True only when $a = b$'], '$a^2 + b^2 - 2ab = (a-b)^2 \\geq 0$. So $a^2 + b^2 \\geq 2ab$ always.'));
  qs.push(makeQ('Dividing $-6 < -2$ by $2$:', '$-3 < -1$ (preserved, divided by positive)', ['$-3 > -1$', '$3 < 1$', '$3 > -1$'], 'Dividing by $2 > 0$ preserves: $-6/2 = -3 < -2/2 = -1$.'));
  qs.push(makeQ('Dividing $-6 < -2$ by $-2$:', '$3 > 1$ (reversed, divided by negative)', ['$3 < 1$', '$3 = 1$', '$-3 > -1$'], 'Dividing by $-2 < 0$ reverses: $-6/-2 = 3 > -2/-2 = 1$.'));
  qs.push(makeQ('If $x > 2$, then $-x$:', '$-x < -2$', ['$-x > -2$', '$-x = -2$', '$-x > 2$'], 'Multiplying by $-1$ reverses: $x > 2 \\Rightarrow -x < -2$.'));
  qs.push(makeQ('If $a < b$, which is certainly true?', '$a - b < 0$', ['$a/b < 1$', '$a^2 < b^2$', '$1/a > 1/b$'], '$a < b \\Rightarrow a - b < 0$. The others depend on the signs of $a$ and $b$.'));

  const n1 = R(2, 5), n2 = R(6, 10);
  qs.push(makeQ(`Can $x$ satisfy both $x > ${n2}$ and $x < ${n1}$?`, 'No — the two sets are disjoint', ['Yes — for all real $x$', 'Only for $x = 0$', 'Only for negative $x$'], `$x > ${n2}$ and $x < ${n1}$: since $${n2} > ${n1}$, no real number satisfies both.`));
  qs.push(makeQ('If $0 < a < 1$, then $a^2$ vs $a$:', '$a^2 < a$ (squaring a fraction less than 1 makes it smaller)', ['$a^2 > a$', '$a^2 = a$', 'Cannot compare'], 'For $0 < a < 1$: $a^2 = a \\cdot a < a \\cdot 1 = a$.'));

  return shuffle(qs).slice(0, 20);
}

// ─── SKILL 2: ONE-VARIABLE ALGEBRAIC SOLUTIONS ──────────────────────────────

export function generateOneVariableQuestions() {
  const qs = [];

  // Simple solving: ax + b < c
  for (let i = 0; i < 8; i++) {
    const a = R(1, 6), b = R(1, 10), c = R(b + 1, b + a * 8);
    const sol = (c - b) / a;
    const sign = ['<', '>', '≤', '≥'][i % 4];
    const latexSign = ['<', '>', '\\leq', '\\geq'][i % 4];
    const desc = ['lt', 'gt', 'lte', 'gte'][i % 4];

    if (i < 4) {
      const exact = Number.isInteger(sol);
      const solStr = exact ? String(sol) : `${c - b}/${a}`;
      qs.push(makeQ(
        `Solve: $${a}x + ${b} ${latexSign} ${c}$`,
        `$x ${latexSign} ${solStr}$`,
        [`$x ${latexSign} -${solStr}$`, `$x ${['>', '<', '\\geq', '\\leq'][i % 4]} ${solStr}$`, `$x = ${solStr}$`],
        `Subtract $${b}$: $${a}x ${latexSign} ${c - b}$. Divide by $${a}$ (positive, no flip): $x ${latexSign} ${solStr}$.`
      ));
    } else {
      // Negative coefficient
      const na = R(1, 5);
      const nb = R(1, 8), nc = R(1, nb - 1 + na * 5);
      const nsol = (nc - nb) / (-na);
      const nsolStr = Number.isInteger(nsol) ? String(nsol) : `${nc - nb}/${-na}`;
      const oppSign = ['>', '<', '\\geq', '\\leq'][i % 4];
      qs.push(makeQ(
        `Solve: $-${na}x + ${nb} ${latexSign} ${nc}$`,
        `$x ${oppSign} ${Number.isInteger(nsol) ? nsol : `(${nb - nc})/${na}`}$`,
        [`$x ${latexSign} ${Number.isInteger(nsol) ? nsol : `(${nb - nc})/${na}`}$`, `$x = 0$`, `No solution`],
        `Subtract $${nb}$: $-${na}x ${latexSign} ${nc - nb}$. Divide by $-${na}$ (negative → FLIP): $x ${oppSign} ${Number.isInteger(nsol) ? nsol : `(${nb - nc})/${na}`}$.`
      ));
    }
  }

  // Compound inequalities
  for (let i = 0; i < 6; i++) {
    const a = R(-5, 0), b = R(1, 5), mid = R(a + 1, b - 1);
    qs.push(makeQ(
      `Which value satisfies $${a} < x \\leq ${b}$?`,
      `$x = ${mid}$`,
      [`$x = ${a}$`, `$x = ${b + 1}$`, `$x = ${a - 1}$`],
      `The solution set is $(${a}, ${b}]$: open at $${a}$, closed at $${b}$. $x = ${mid}$ satisfies this since $${a} < ${mid} \\leq ${b}$.`
    ));
  }

  // Word-style one-variable
  const w1 = R(3, 8), w2 = R(w1 + 2, w1 + 10);
  qs.push(makeQ(
    `Solve: $\\frac{x}{${w1}} + 1 > \\frac{x}{${w1}} + \\frac{1}{${w1}}$`,
    'True for all real $x$ (infinite solutions)',
    ['No solution', '$x > 0$', '$x > 1$'],
    `Subtract $\\frac{x}{${w1}}$: $1 > \\frac{1}{${w1}}$. Since $1 > \\frac{1}{${w1}}$ is always true, all real $x$ are solutions.`
  ));

  qs.push(makeQ(
    'Solve: $3(x - 2) > 2(x + 1)$',
    '$x > 8$',
    ['$x > 4$', '$x < 8$', '$x > -8$'],
    'Expand: $3x - 6 > 2x + 2$. Subtract $2x$: $x - 6 > 2$. Add $6$: $x > 8$.'
  ));

  qs.push(makeQ(
    'Solve: $\\frac{3x - 4}{2} \\geq 5$',
    '$x \\geq \\frac{14}{3}$',
    ['$x \\geq 7$', '$x \\geq \\frac{14}{3}$', '$x \\leq \\frac{14}{3}$'],
    'Multiply by $2$: $3x - 4 \\geq 10$. Add $4$: $3x \\geq 14$. Divide by $3$: $x \\geq \\frac{14}{3}$.'
  ));

  qs.push(makeQ(
    'Solution of $-2(3 - x) > 4$:',
    '$x > 5$',
    ['$x < 5$', '$x > -5$', '$x < -5$'],
    'Expand: $-6 + 2x > 4$. Add $6$: $2x > 10$. Divide by $2$: $x > 5$.'
  ));

  qs.push(makeQ(
    'The solution set of $2x - 3 \\leq 7$ is:',
    '$x \\leq 5$, i.e., $(-\\infty, 5]$',
    ['$x \\leq 2$, i.e., $(-\\infty, 2]$', '$x \\geq 5$, i.e., $[5, \\infty)$', '$x < 5$, i.e., $(-\\infty, 5)$'],
    '$2x \\leq 10$, so $x \\leq 5$. Use $\\leq$, so include $5$: closed bracket $(-\\infty, 5]$.'
  ));

  return shuffle(qs).slice(0, 20);
}

export function generateOneVariableAssessment() {
  const qs = [];

  for (let i = 0; i < 10; i++) {
    const a = R(1, 8), b = R(1, 15), c = R(b + a, b + a * 6);
    const sol = (c - b);
    const aStr = a === 1 ? '' : `${a}`;
    qs.push(makeQ(
      `Solve: $${aStr}x + ${b} \\leq ${c}$`,
      a === 1 ? `$x \\leq ${sol}$` : `$x \\leq \\frac{${sol}}{${a}} = ${Number.isInteger(sol / a) ? sol / a : `${sol}/${a}`}$`,
      [`$x \\geq ${Number.isInteger(sol / a) ? sol / a : `${sol}/${a}`}$`, `$x < ${Number.isInteger(sol / a) ? sol / a : `${sol}/${a}`}$`, `$x \\leq -${Number.isInteger(sol / a) ? sol / a : `${sol}/${a}`}$`],
      `Subtract $${b}$: $${aStr}x \\leq ${sol}$. Divide by $${a}$: $x \\leq ${Number.isInteger(sol / a) ? sol / a : `${sol}/${a}`}$.`
    ));
  }

  qs.push(makeQ('Solve: $5 - 3x \\geq 2$', '$x \\leq 1$', ['$x \\geq 1$', '$x \\leq -1$', '$x \\geq -1$'], '$-3x \\geq 2 - 5 = -3$. Divide by $-3$ (flip!): $x \\leq 1$.'));
  qs.push(makeQ('Solve: $4x - 1 < 3x + 2$', '$x < 3$', ['$x > 3$', '$x < -3$', '$x > -3$'], 'Subtract $3x$: $x - 1 < 2$. Add $1$: $x < 3$.'));
  qs.push(makeQ('Solve: $\\frac{x+1}{3} > \\frac{x-2}{4}$', '$x > -10$', ['$x < -10$', '$x > 10$', '$x < 10$'], 'Multiply by $12$: $4(x+1) > 3(x-2)$. $4x + 4 > 3x - 6$. $x > -10$.'));
  qs.push(makeQ('Solve: $|2x| < 8$ (treat as $-8 < 2x < 8$)', '$-4 < x < 4$', ['$x < 4$', '$x > -4$', '$-8 < x < 8$'], 'Divide by $2$: $-4 < x < 4$.'));
  qs.push(makeQ('For what $x$ is $5(x - 2) \\leq 4(x + 1)$?', '$x \\leq 14$', ['$x \\geq 14$', '$x \\leq -14$', '$x \\geq 6$'], '$5x - 10 \\leq 4x + 4 \\Rightarrow x \\leq 14$.'));
  qs.push(makeQ('If $2x + 7 > 3$ and $3x - 2 < 16$, find the solution set:', '$-2 < x < 6$', ['$x > -2$', '$x < 6$', '$x > 6$ or $x < -2$'], 'From first: $2x > -4 \\Rightarrow x > -2$. From second: $3x < 18 \\Rightarrow x < 6$. Intersection: $-2 < x < 6$.'));
  qs.push(makeQ('No solution exists for:', '$x > 3$ and $x < -2$ simultaneously', ['$x > -2$ and $x < 5$', '$x \\geq 0$ and $x \\leq 4$', '$1 < x \\leq 3$'], 'Since $3 > -2$, no real number can be simultaneously greater than $3$ and less than $-2$.'));
  qs.push(makeQ('Solve: $3 \\leq 2x - 1 < 9$', '$2 \\leq x < 5$', ['$1 \\leq x < 4$', '$2 < x \\leq 5$', '$2 \\leq x \\leq 5$'], 'Add $1$: $4 \\leq 2x < 10$. Divide by $2$: $2 \\leq x < 5$.'));

  return shuffle(qs).slice(0, 20);
}

// ─── SKILL 3: NUMBER LINE & INTERVAL NOTATION ────────────────────────────────

export function generateNumberLineQuestions() {
  const qs = [];

  // Visual number line questions (with SVGs)
  const pts = [R(-4, -1), R(0, 3), R(1, 5), R(-3, 0), R(2, 6)];
  const types = ['lt', 'gt', 'lte', 'gte', 'lt'];
  const colors = ['#6366f1', '#0891b2', '#f59e0b', '#ec4899', '#7c3aed'];
  const symbs = ['<', '>', '\\leq', '\\geq', '<'];

  pts.forEach((pt, i) => {
    const circle = (types[i] === 'lte' || types[i] === 'gte') ? 'closed (filled) circle' : 'open (empty) circle';
    const dir = (types[i] === 'lt' || types[i] === 'lte') ? 'arrow pointing LEFT' : 'arrow pointing RIGHT';
    qs.push(makeQ(
      `The number line below represents which inequality? (${circle}, ${dir})`,
      `$x ${symbs[i]} ${pt}$`,
      [`$x ${symbs[(i + 1) % 4]} ${pt}$`, `$x ${symbs[(i + 2) % 4]} ${pt}$`, `$x = ${pt}$`],
      `A ${circle} at $${pt}$ with an arrow to the ${(types[i] === 'lt' || types[i] === 'lte') ? 'left' : 'right'} represents $x ${symbs[i]} ${pt}$.`,
      numberLineSVG(pt, types[i], colors[i])
    ));
  });

  // Interval notation questions
  const intervals = [
    { ineq: '$x > 3$', interval: '$(3, \\infty)$', wrong: ['$[3, \\infty)$', '$(-\\infty, 3)$', '$(-\\infty, 3]$'], exp: '$x > 3$ uses strict inequality, so open parenthesis at $3$: $(3, \\infty)$.' },
    { ineq: '$x \\leq -2$', interval: '$(-\\infty, -2]$', wrong: ['$(-\\infty, -2)$', '$[-2, \\infty)$', '$(-2, \\infty)$'], exp: '$x \\leq -2$ includes $-2$ (closed): $(-\\infty, -2]$.' },
    { ineq: '$-1 < x \\leq 4$', interval: '$(-1, 4]$', wrong: ['$[-1, 4]$', '$(-1, 4)$', '$[-1, 4)$'], exp: 'Open at $-1$ (strict), closed at $4$ (non-strict): $(-1, 4]$.' },
    { ineq: '$2 \\leq x \\leq 7$', interval: '$[2, 7]$', wrong: ['$(2, 7)$', '$[2, 7)$', '$(2, 7]$'], exp: 'Both endpoints included (non-strict): $[2, 7]$ — closed on both sides.' },
    { ineq: '$x < 0$', interval: '$(-\\infty, 0)$', wrong: ['$(0, \\infty)$', '$(-\\infty, 0]$', '$[0, \\infty)$'], exp: '$x < 0$ (strict) means open at $0$: $(-\\infty, 0)$.' },
  ];

  intervals.forEach(({ ineq, interval, wrong, exp }) => {
    qs.push(makeQ(`The interval notation for $\\{x : ${ineq}\\}$ is:`, interval, wrong, exp));
  });

  // Back-conversion: interval to inequality
  const backConv = [
    { interval: '$[3, 8)$', ineq: '$3 \\leq x < 8$', wrong: ['$3 < x \\leq 8$', '$3 \\leq x \\leq 8$', '$3 < x < 8$'], exp: 'Square bracket $[3$ means $x \\geq 3$; round bracket $8)$ means $x < 8$.' },
    { interval: '$(-5, 2]$', ineq: '$-5 < x \\leq 2$', wrong: ['$-5 \\leq x < 2$', '$-5 < x < 2$', '$-5 \\leq x \\leq 2$'], exp: 'Round bracket $(-5$ means $x > -5$; square bracket $2]$ means $x \\leq 2$.' },
    { interval: '$(-\\infty, 1)$', ineq: '$x < 1$', wrong: ['$x \\leq 1$', '$x > 1$', '$x \\geq 1$'], exp: 'Open end at $1$ means strict inequality $x < 1$.' },
  ];

  backConv.forEach(({ interval, ineq, wrong, exp }) => {
    qs.push(makeQ(`The inequality represented by ${interval} is:`, ineq, wrong, exp));
  });

  // Open vs closed circles
  qs.push(makeQ(
    'On a number line, $x \\geq 5$ is shown with:',
    'Filled circle at $5$, arrow pointing RIGHT',
    ['Open circle at $5$, arrow pointing right', 'Filled circle at $5$, arrow pointing left', 'Open circle at $5$, arrow pointing left'],
    '$\\geq$ means "greater than or equal to" — so include $5$ (filled/closed circle), and the arrow goes right toward larger values.'
  ));

  qs.push(makeQ(
    'The symbol $\\infty$ in interval notation always uses:',
    'Round bracket (open), never square bracket',
    ['Square bracket (closed)', 'Either bracket depending on context', 'Square bracket when $\\infty$ is negative'],
    'Infinity is not a real number — you can never "reach" it or "include" it, so always use round bracket: $(a, \\infty)$ or $(-\\infty, b)$.'
  ));

  return shuffle(qs).slice(0, 20);
}

export function generateNumberLineAssessment() {
  const qs = [];

  const pts2 = [R(-6, -2), R(-1, 2), R(3, 7), R(-4, 0), R(1, 5), R(-3, 1)];
  const types2 = ['gte', 'lt', 'lte', 'gt', 'lte', 'gt'];
  const syms2 = ['\\geq', '<', '\\leq', '>', '\\leq', '>'];
  const colors2 = ['#0891b2', '#f59e0b', '#7c3aed', '#ec4899', '#6366f1', '#10b981'];

  pts2.forEach((pt, i) => {
    qs.push(makeQ(
      `Identify the inequality shown in the number line below:`,
      `$x ${syms2[i]} ${pt}$`,
      [`$x ${syms2[(i + 1) % 4]} ${pt}$`, `$x ${syms2[(i + 2) % 4]} ${pt}$`, `$x = ${pt}$`],
      `A ${(types2[i] === 'lte' || types2[i] === 'gte') ? 'filled' : 'open'} circle at $${pt}$ with arrow to the ${(types2[i] === 'lt' || types2[i] === 'lte') ? 'left' : 'right'} represents $x ${syms2[i]} ${pt}$.`,
      numberLineSVG(pt, types2[i], colors2[i])
    ));
  });

  const a3 = R(-5, 0), b3 = R(1, 6);
  qs.push(makeQ(
    `Which number line shows $${a3} \\leq x < ${b3}$?`,
    `Filled circle at $${a3}$, open circle at $${b3}$, shaded between`,
    [`Open circle at both $${a3}$ and $${b3}$`, `Filled circles at both`, `Filled at $${b3}$, open at $${a3}$`],
    `$\\leq$ gives filled (closed) at $${a3}$; strict $<$ gives open at $${b3}$. Region between them is shaded.`,
    compoundLineSVG(a3, b3, 'lte', 'lt', '#6366f1')
  ));

  qs.push(makeQ('Union $(-\\infty, 3) \\cup (5, \\infty)$ in inequality form:', '$x < 3$ or $x > 5$', ['$3 < x < 5$', '$x \\leq 3$ or $x \\geq 5$', '$x < 3$ and $x > 5$'], 'Union means "either region" — so $x < 3$ OR $x > 5$.'));
  qs.push(makeQ('Intersection $(-\\infty, 6] \\cap [2, \\infty)$ is:', '$[2, 6]$', ['$(-\\infty, \\infty)$', '$(2, 6)$', 'Empty set', ], 'Overlap: $x \\leq 6$ AND $x \\geq 2$, giving $2 \\leq x \\leq 6$, i.e., $[2, 6]$.'));
  qs.push(makeQ('What is $(-3, 7) \\cap [0, 10]$?', '$[0, 7)$', ['$(-3, 10]$', '$[0, 7]$', '$(-3, 7)$'], 'The overlap: $0 \\leq x < 7$. At $0$: closed (because $[0$). At $7$: open (because $7)$).'));
  qs.push(makeQ('Number of integers in $[-2, 4)$:', '$6$ integers: $-2, -1, 0, 1, 2, 3$', ['$5$', '$7$', '$4$'], '$[-2, 4)$ includes $-2$ but not $4$. Integers: $\\{-2, -1, 0, 1, 2, 3\\}$ — that is $6$.'));
  qs.push(makeQ('The solution $x \\geq 0$ in interval notation:', '$[0, \\infty)$', ['$(0, \\infty)$', '$(-\\infty, 0]$', '$(-\\infty, 0)$'], '$x \\geq 0$ includes $0$ (closed bracket) and goes to $+\\infty$ (open).'));
  qs.push(makeQ('Which interval represents ALL real numbers?', '$(-\\infty, \\infty)$', ['$(0, \\infty)$', '$[-\\infty, \\infty]$', '$(-1, 1)$'], 'All reals = $(-\\infty, \\infty)$. Note: never use square brackets with $\\infty$.'));

  return shuffle(qs).slice(0, 20);
}

// ─── SKILL 4: TWO-VARIABLE INEQUALITIES ─────────────────────────────────────

export function generateTwoVariableQuestions() {
  const qs = [];

  // Point-testing questions with half-plane SVGs
  const inequalities = [
    { a: 2, b: 1, c: 4, type: 'lt', q: 'Is $(1, 1)$ in the region $2x + y < 4$?', ans: 'Yes — $2(1)+1(1)=3<4$', wrong: ['No — $3 \\geq 4$', 'Cannot determine', 'Only on the boundary'] },
    { a: 1, b: -2, c: 0, type: 'gte', q: 'Is $(2, 0)$ in $x - 2y \\geq 0$?', ans: 'Yes — $2-0=2\\geq0$', wrong: ['No — $2 < 0$', 'Only if $y > 0$', 'Cannot determine'] },
    { a: 3, b: 2, c: 6, type: 'gt', q: 'Is $(3, 1)$ in $3x + 2y > 6$?', ans: 'Yes — $9+2=11>6$', wrong: ['No — $11 \\leq 6$', 'It is on the boundary', 'Cannot determine'] },
    { a: 1, b: 1, c: 5, type: 'lte', q: 'Is $(3, 3)$ in $x + y \\leq 5$?', ans: 'No — $3+3=6 > 5$', wrong: ['Yes — $6 \\leq 5$', 'It is on the boundary', 'Cannot determine'] },
    { a: 2, b: 3, c: 12, type: 'lte', q: 'Is the origin $(0,0)$ in $2x + 3y \\leq 12$?', ans: 'Yes — $0+0=0\\leq12$', wrong: ['No — origin is never in half-planes', 'Only on the boundary', 'Cannot determine'] },
  ];

  inequalities.forEach(({ a, b, c, type, q, ans, wrong }) => {
    qs.push(makeQ(q, ans, wrong,
      `Substitute the point into the inequality. If it satisfies, the point is in the region.`,
      halfPlaneSVG(a, b, c, type)));
  });

  // Boundary line questions
  const boundaryQs = [
    makeQ('For the inequality $2x - y < 5$, the boundary line is:', '$2x - y = 5$ (dashed line — strict inequality)', ['$2x - y = 5$ (solid line)', '$y = 5$ (horizontal)', '$x = 5$ (vertical)'], 'Strict inequality ($<$) uses a dashed boundary line (points on the line are NOT included).'),
    makeQ('For $3x + y \\leq 6$, the boundary line is:', '$3x + y = 6$ (solid line — non-strict)', ['$3x + y = 6$ (dashed line)', '$y = 6$', '$x = 2$'], 'Non-strict inequality ($\\leq$) uses a solid boundary line (points on the line ARE included).'),
    makeQ('Which point lies on the line $x + 2y = 8$?', '$(0, 4)$: $0 + 8 = 8$ ✓', ['$(4, 0)$: $4 + 0 \\neq 8$', '$(2, 3)$: $2 + 6 \\neq 8$', '$(1, 3)$: $1 + 6 \\neq 8$'], 'Checking $(0, 4)$: $0 + 2(4) = 8$. This lies exactly on the boundary line.'),
  ];
  qs.push(...boundaryQs);

  // Shading direction
  const shadingQs = [
    makeQ('For $y > 2x + 1$, which side of the boundary is shaded?', 'The region ABOVE the line $y = 2x + 1$', ['The region below the line', 'The line itself', 'The left side of the line'], 'Test $(0, 0)$: $0 > 2(0)+1 = 1$? No. So $(0,0)$ is not in the region. Shade the OTHER side (above the line).'),
    makeQ('For $y \\leq 3x$, test point $(0, 0)$:', '$0 \\leq 0$ — TRUE, so origin is in the shaded region', ['$0 < 0$ — FALSE', '$0 = 0$ is only on the boundary', 'Cannot use origin as test point'], 'Substituting $(0,0)$: $0 \\leq 3(0) = 0$. True! So the origin side is shaded.'),
    makeQ('The graph of $x > 3$ in two variables represents:', 'All points to the RIGHT of the vertical line $x = 3$', ['All points above $y = 3$', 'All points below $x = 3$', 'The line $x = 3$ itself'], '$x > 3$ in 2D means all points where the x-coordinate exceeds $3$ — the right half-plane.'),
  ];
  qs.push(...shadingQs);

  // Domain/feasibility
  qs.push(makeQ('The boundary line $ax + by = c$ divides the plane into:', 'Exactly two half-planes', ['Three regions', 'Four quadrants', 'One region'], 'Every line divides the plane into exactly two infinite half-planes.'));
  qs.push(makeQ('The feasible region of $x \\geq 0, y \\geq 0$ is:', 'The first quadrant (including axes)', ['The entire plane', 'The third quadrant', 'Only the positive $x$-axis'], '$x \\geq 0$ and $y \\geq 0$ define the first quadrant (Q1) including the two non-negative coordinate axes.'));
  qs.push(makeQ('What is the test point method for graphing inequalities?', 'Substitute a point not on the boundary to determine which half-plane to shade', ['Draw only the boundary line', 'Use the $y$-intercept only', 'Shade both sides always'], "Substitute a test point (usually origin $(0,0)$ if it's not on the boundary) into the inequality. If it satisfies the inequality, shade that side; otherwise shade the other side."));

  return shuffle(qs).slice(0, 20);
}

export function generateTwoVariableAssessment() {
  const qs = [];

  // Point testing with various inequalities
  const testPairs = [
    { ineq: '$x + y \\leq 6$', point: '$(2, 3)$', check: '2+3=5≤6', ans: 'Yes — $5 \\leq 6$', no: 'No — $5 > 6$' },
    { ineq: '$2x - y > 1$', point: '$(1, 0)$', check: '2(1)-0=2>1', ans: 'Yes — $2 > 1$', no: 'No — $2 \\leq 1$' },
    { ineq: '$x - 2y \\geq 4$', point: '$(2, 0)$', check: '2-0=2, 2<4', ans: 'No — $2 < 4$', no: 'Yes — $2 \\geq 4$' },
    { ineq: '$3x + y < 9$', point: '$(3, 0)$', check: '9+0=9, not <9', ans: 'No — $9 \\not< 9$ (on boundary)', no: 'Yes — $9 < 9$' },
    { ineq: '$y \\geq 2x$', point: '$(0, 0)$', check: '0≥0', ans: 'Yes — $0 \\geq 0$ (on boundary, included)', no: 'No — $0 < 0$' },
  ];

  testPairs.forEach(({ ineq, point, check, ans, no }) => {
    qs.push(makeQ(`Is ${point} in the region ${ineq}?`, ans, [no, 'Cannot determine', 'Only for integer coordinates'], `Substituting ${point}: $${check}$. Answer: ${ans}.`));
  });

  qs.push(makeQ('A strict inequality ($<$ or $>$) uses what boundary?', 'Dashed line (points on boundary excluded)', ['Solid line', 'Dotted curve', 'Double line'], 'Strict: dashed (boundary NOT included). Non-strict ($\\leq, \\geq$): solid (boundary included).'));
  qs.push(makeQ('The region $x \\geq 0$ is:', 'Right half-plane including the $y$-axis', ['Left half-plane', 'Upper half-plane', 'Only the positive $x$-axis'], '$x \\geq 0$ includes all points where $x$ is zero or positive — the right half-plane including the $y$-axis.'));
  qs.push(makeQ('The region $y < 0$ is:', 'Lower half-plane (strictly below $x$-axis)', ['Upper half-plane', 'Left half-plane', 'The $x$-axis itself'], '$y < 0$ means all points strictly below the $x$-axis — the lower half-plane.'));
  qs.push(makeQ('The boundary line for $3x - 2y = 6$ passes through:', '$(2, 0)$ and $(0, -3)$', ['$(0, 3)$ and $(6, 0)$', '$(3, 0)$ and $(0, -2)$', '$(6, 0)$ and $(0, 3)$'], 'Set $y=0$: $3x=6 \\Rightarrow x=2$. Set $x=0$: $-2y=6 \\Rightarrow y=-3$. Intercepts: $(2,0)$ and $(0,-3)$.'));

  for (let i = 0; i < 7; i++) {
    const a = R(1, 4), b = R(1, 4), c = R(4, 12);
    const types = ['lte', 'gte', 'lt', 'gt'];
    const t = types[i % 4];
    const syms = ['\\leq', '\\geq', '<', '>'];
    const sym = syms[i % 4];
    const px = R(0, 3), py = R(0, 3);
    const val = a * px + b * py;
    const inRegion = t === 'lte' ? val <= c : t === 'gte' ? val >= c : t === 'lt' ? val < c : val > c;
    qs.push(makeQ(
      `Is $(${px}, ${py})$ in the region $${a}x + ${b}y ${sym} ${c}$?`,
      inRegion ? `Yes — $${a * px + b * py} ${sym} ${c}$ ✓` : `No — $${a * px + b * py} \\not${sym} ${c}$ ✗`,
      [inRegion ? `No — $${a * px + b * py} \\not${sym} ${c}$` : `Yes — $${a * px + b * py} ${sym} ${c}$`, 'Cannot determine without graph', 'Only for integer points'],
      `Substituting: $${a}(${px}) + ${b}(${py}) = ${val}$. ${inRegion ? `$${val} ${sym} ${c}$ is TRUE.` : `$${val} ${sym} ${c}$ is FALSE.`}`
    ));
  }

  return shuffle(qs).slice(0, 20);
}

// ─── SKILL 5: SYSTEM OF LINEAR INEQUALITIES ──────────────────────────────────

export function generateSystemsQuestions() {
  const qs = [];

  // Core concept questions
  qs.push(makeQ('The feasible region of a system of linear inequalities is:', 'The intersection of all individual solution regions', ['The union of all regions', 'The boundary lines only', 'An unbounded region always'], 'All constraints must be satisfied simultaneously — so we take the INTERSECTION (overlap) of all half-planes.'));
  qs.push(makeQ('A system of linear inequalities has no feasible region when:', 'The intersection of all half-planes is empty', ['Only one inequality exists', 'All inequalities use ≤', 'The region is bounded'], 'If no point satisfies ALL constraints simultaneously, the feasible region is the empty set.'));
  qs.push(makeQ('The feasible region is always:', 'A convex region (possibly unbounded)', ['A closed bounded polygon', 'An open region', 'A circle'], 'The intersection of half-planes is always a convex set. It may be bounded or unbounded.'));

  // Point-in-system testing
  const systems = [
    { cond: '$x + y \\leq 6$, $x \\geq 0$, $y \\geq 0$', point: '$(2, 3)$', check: '2+3=5≤6, x≥0, y≥0 — all OK', ans: 'Yes — satisfies all three constraints', no: 'No — fails $x + y \\leq 6$' },
    { cond: '$2x + y \\leq 4$, $x + 2y \\leq 4$, $x \\geq 0$, $y \\geq 0$', point: '$(0, 0)$', check: '0≤4, 0≤4, 0≥0, 0≥0', ans: 'Yes — origin satisfies all', no: 'No — fails one constraint' },
    { cond: '$x > 2$ and $x < 5$', point: '$(3, 7)$', check: '3>2 and 3<5 — TRUE', ans: 'Yes — $3$ is between $2$ and $5$', no: 'No — $x = 3$ fails' },
    { cond: '$x + y \\leq 3$ and $x + y \\geq 7$', point: 'Any point $(x, y)$', check: 'Need x+y≤3 AND x+y≥7 — impossible', ans: 'No solution exists (empty feasible region)', no: '$(5, 2)$ satisfies both' },
    { cond: '$y \\geq x$ and $y \\leq 2x$', point: '$(3, 4)$', check: '4≥3 ✓, 4≤6 ✓', ans: 'Yes — $(3, 4)$ is in the feasible region', no: 'No — fails $y \\geq x$' },
  ];

  systems.forEach(({ cond, point, check, ans, no }) => {
    qs.push(makeQ(`Is ${point} in the feasible region of ${cond}?`, ans, [no, 'Cannot determine', 'Depends on which quadrant'], `Checking: ${check}.`));
  });

  // Corner point / vertex questions
  qs.push(makeQ('The corner points (vertices) of a feasible region are found at:', 'Intersections of boundary lines', ['Centers of boundary lines', 'Midpoints of the region', 'The origin always'], 'Corner points occur where two or more boundary lines intersect within the feasible region.'));
  qs.push(makeQ('Find the corner point of $x + y = 6$ and $x - y = 2$:', '$(4, 2)$', ['$(3, 3)$', '$(2, 4)$', '$(6, 0)$'], 'Adding equations: $2x = 8 \\Rightarrow x = 4$. Then $y = 6 - 4 = 2$. Corner point: $(4, 2)$.'));
  qs.push(makeQ('The system $x \\geq 0$, $y \\geq 0$, $x + y \\leq 4$ forms a feasible region with how many corner points?', '3 corners: $(0,0)$, $(4,0)$, $(0,4)$', ['2 corners', '4 corners', 'Infinitely many'], 'Three vertices: origin $(0,0)$, and the two intercepts of $x+y=4$: $(4,0)$ and $(0,4)$.'));

  // Graphical method questions
  qs.push(makeQ('To solve a system graphically, first:', 'Graph each inequality and identify the common shaded region', ['Find the intersection of boundary lines only', 'Plot random points', 'Use only algebraic methods'], 'The graphical method: shade each inequality individually, then the overlap (feasible region) is the solution.'));

  for (let i = 0; i < 4; i++) {
    const a = R(1, 3), b = R(4, 9);
    const c = R(1, 3), d = R(3, 8);
    qs.push(makeQ(
      `The system $x \\leq ${b}$ and $x \\geq ${a}$ has solutions:`,
      `$${a} \\leq x \\leq ${b}$ — a bounded interval`,
      [`No solution (since $${b} > ${a}$)`, `$x < ${a}$ only`, `All reals`],
      `Both constraints: $x \\leq ${b}$ AND $x \\geq ${a}$. Since $${a} < ${b}$, the solution is the interval $[${a}, ${b}]$.`
    ));
  }

  qs.push(makeQ('The region satisfying $x > 0$, $y > 0$, $x < 5$, $y < 5$ is:', 'An open square (interior of the square in Q1)', ['Closed square', 'Unbounded region', 'Empty'], 'All four constraints bound a region: the interior of the square with corners at $(0,0)$, $(5,0)$, $(5,5)$, $(0,5)$ — open because of strict inequalities.'));
  qs.push(makeQ('If a system has only one feasible point, the region is:', 'A single point (degenerate feasible region)', ['A line segment', 'An empty set', 'An infinite region'], 'It is possible for the intersection of all constraints to be exactly one point.'));

  return shuffle(qs).slice(0, 20);
}

export function generateSystemsAssessment() {
  const qs = [];

  qs.push(makeQ('Vertices of the feasible region for $x \\geq 0, y \\geq 0, x + y \\leq 5$:', '$(0,0), (5,0), (0,5)$', ['$(0,0), (5,5)$', '$(1,1), (4,1), (1,4)$', '$(5,0), (0,5)$ only'], 'The region is a right triangle. Vertices: origin, $x$-intercept $(5,0)$, and $y$-intercept $(0,5)$.'));
  qs.push(makeQ('Corner of $x + y = 7$ and $x - y = 3$:', '$(5, 2)$', ['$(3, 4)$', '$(7, 0)$', '$(4, 3)$'], 'Add: $2x = 10 \\Rightarrow x = 5$; then $y = 7-5 = 2$.'));
  qs.push(makeQ('Corner of $2x + y = 8$ and $x + 2y = 7$:', '$(3, 2)$', ['$(4, 0)$', '$(2, 3)$', '$(1, 6)$'], 'From first: $y = 8-2x$. Sub in second: $x + 2(8-2x) = 7 \\Rightarrow x + 16 - 4x = 7 \\Rightarrow -3x = -9 \\Rightarrow x=3, y=2$.'));

  for (let i = 0; i < 8; i++) {
    const a = R(1, 4), b = R(2, 6);
    const c = R(1, 4), d = R(2, 6);
    const px = R(0, b - 1), py = R(0, d - 1);
    const inRegion = (px <= b && py <= d && px >= 0 && py >= 0);
    const condStr = `$x \\leq ${b}$, $y \\leq ${d}$, $x \\geq 0$, $y \\geq 0$`;
    qs.push(makeQ(
      `Is $(${px}, ${py})$ in the feasible region of ${condStr}?`,
      inRegion ? `Yes — all conditions satisfied` : `No — fails one or more conditions`,
      [inRegion ? `No — fails one condition` : `Yes — all conditions satisfied`, 'Cannot determine', 'Only on the boundary'],
      `Checking: $0 \\leq ${px} \\leq ${b}$ ✓, $0 \\leq ${py} \\leq ${d}$ ${py <= d ? '✓ — in region' : '✗ — not in region'}.`
    ));
  }

  qs.push(makeQ('A system with an unbounded feasible region means:', 'There is no upper/lower bound in at least one direction', ['No solution exists', 'Exactly one solution exists', 'The region is a polygon'], 'Unbounded means the region extends infinitely in some direction (e.g., only lower bounds on $x$ and $y$).'));
  qs.push(makeQ('How many constraints define the feasible region corner of a typical 2D LP problem?', 'Exactly 2 boundary lines intersect at each corner', ['3 or more lines', 'Only 1 line', '0 lines (it is a curve)'], 'In 2D, each corner (vertex) of the feasible region is the intersection of exactly two boundary lines.'));
  qs.push(makeQ('The solution to the system $x + y \\leq 4$, $x - y \\geq 0$, $x \\geq 0$ includes the point:', '$(2, 1)$: $3 \\leq 4$ ✓, $1 \\geq 0$ ✓, $2 \\geq 0$ ✓', ['$(3, 3)$: $6 \\not\\leq 4$', '$(0, 5)$: $5 \\not\\leq 4$', '$(-1, 2)$: $-1 \\not\\geq 0$'], 'Test $(2,1)$: $2+1=3\\leq4$ ✓, $2-1=1\\geq0$ ✓, $2\\geq0$ ✓.'));
  qs.push(makeQ('The system $x + y > 10$ and $x + y < 5$ has:', 'No solution (empty feasible region)', ['Solutions in Q1 only', 'Solutions for all $x, y > 0$', 'One solution at $x = y$'], 'Cannot have $x+y > 10$ AND $x+y < 5$ simultaneously — these contradict each other.'));

  return shuffle(qs).slice(0, 20);
}

// ─── SKILL 6: WORD PROBLEMS ──────────────────────────────────────────────────

export function generateWordProblemsQuestions() {
  const qs = [];

  // Age problems
  const age1 = R(10, 20), age2 = R(age1 + 5, age1 + 15);
  qs.push(makeQ(
    `Riya is ${age1} years old. She must be at least ${age2} years old to join a program. She needs at least how many more years?`,
    `$${age2 - age1}$ more years`,
    [`$${age1}$ more years`, `$${age2}$ more years`, `$${age1 + age2}$ more years`],
    `Let $x$ = additional years. Condition: $${age1} + x \\geq ${age2}$. So $x \\geq ${age2 - age1}$.`
  ));

  const ageMin = R(18, 21);
  qs.push(makeQ(
    `A scheme is available for persons whose age is at most ${ageMin + 5} years but not less than ${ageMin} years. The inequality for age $a$:`,
    `$${ageMin} \\leq a \\leq ${ageMin + 5}$`,
    [`$a > ${ageMin}$ only`, `$${ageMin} < a < ${ageMin + 5}$`, `$a \\leq ${ageMin}$`],
    `"Not less than ${ageMin}" means $a \\geq ${ageMin}$. "At most ${ageMin + 5}" means $a \\leq ${ageMin + 5}$. Combined: $${ageMin} \\leq a \\leq ${ageMin + 5}$.`
  ));

  // Budget / money
  const price = R(50, 150) * 10, budget = R(500, 1500), maxItems = Math.floor(budget / price);
  qs.push(makeQ(
    `Tickets cost ₹${price} each. Sheetal has ₹${budget}. At most how many tickets can she buy?`,
    `${maxItems} tickets`,
    [`${maxItems + 1} tickets`, `${maxItems - 1} tickets`, `${Math.floor(budget / (price / 2))} tickets`],
    `Condition: $${price}n \\leq ${budget}$. So $n \\leq ${budget}/${price} = ${budget / price}$. Since $n$ is an integer, $n \\leq ${maxItems}$.`
  ));

  const salary = R(15, 40) * 1000;
  qs.push(makeQ(
    `A bank requires monthly income ≥ ₹${salary} for a credit card. Rajesh earns ₹${salary - 5000}/month with a ₹${R(3, 8) * 1000}/month raise due. Will he qualify after the raise?`,
    `Yes — his income will be ≥ ₹${salary}`,
    [`No — he still needs more`, `Need more information`, `Only if working for 2+ years`],
    `After raise: ${salary - 5000} + ${(R(3, 8)) * 1000} ≥ ${salary}. The raise will push his income to or above the threshold.`
  ));

  // Speed / distance
  const speed = R(40, 80), dist = R(100, 300);
  const minTime = Math.ceil((dist / speed) * 60);
  qs.push(makeQ(
    `A driver must travel ${dist} km. The speed limit is at most ${speed} km/h. What is the minimum time (hours) for this trip?`,
    `$t \\geq \\frac{${dist}}{${speed}} = ${(dist / speed).toFixed(2)}$ hours`,
    [`$t \\leq ${(dist / speed).toFixed(2)}$ hours`, `$t = ${speed}$ hours`, `$t \\geq ${dist}$ hours`],
    `Time = Distance/Speed. Since speed $\\leq ${speed}$, time $= d/v \\geq ${dist}/${speed} = ${(dist / speed).toFixed(2)}$ hours.`
  ));

  // Manufacturing / production
  const unitProfit1 = R(3, 8) * 100, unitProfit2 = R(2, 6) * 100, minProfit = R(5, 12) * 1000;
  qs.push(makeQ(
    `Product A gives ₹${unitProfit1} profit each and Product B gives ₹${unitProfit2} each. For total profit ≥ ₹${minProfit}, the constraint is:`,
    `$${unitProfit1}x + ${unitProfit2}y \\geq ${minProfit}$`,
    [`$${unitProfit1}x + ${unitProfit2}y \\leq ${minProfit}$`, `$x + y \\geq ${minProfit}$`, `$${unitProfit1}x = ${minProfit}$`],
    `Let $x$ = units of A, $y$ = units of B. Total profit = $${unitProfit1}x + ${unitProfit2}y$. For ≥ ₹${minProfit}: $${unitProfit1}x + ${unitProfit2}y \\geq ${minProfit}$.`
  ));

  // Temperature / science
  const tempMin = R(-10, 5), tempMax = R(tempMin + 10, tempMin + 30);
  qs.push(makeQ(
    `A chemical reaction requires temperature between ${tempMin}°C and ${tempMax}°C (inclusive). Express this as an inequality for temperature $T$:`,
    `$${tempMin} \\leq T \\leq ${tempMax}$`,
    [`$T > ${tempMin}$ and $T < ${tempMax}$`, `$T = ${tempMin}$ or $T = ${tempMax}$`, `$T \\geq ${tempMax}$`],
    `"Between" and "inclusive" means both endpoints included: $${tempMin} \\leq T \\leq ${tempMax}$.`
  ));

  // Marks / academic
  const passMarks = R(35, 50), totalMarks = R(100, 150);
  qs.push(makeQ(
    `A student scored ${passMarks - 10} out of ${totalMarks}. To pass, she needs at least ${passMarks}. How many more marks does she need?`,
    `At least ${passMarks - (passMarks - 10)} = ${passMarks} - ${passMarks - 10} more marks`,
    [`At most $${passMarks}$ marks`, `Exactly $${passMarks}$ marks`, `None — she already passed`],
    `Condition: ${passMarks - 10} + x ≥ ${passMarks}, so x ≥ ${passMarks} - ${passMarks - 10} = ${passMarks - (passMarks - 10)}.`
  ));

  // Linear programming setup
  qs.push(makeQ(
    'A factory can produce items A and B. It has 40 hours per week. A takes 2 hours and B takes 4 hours. If it must produce at least 5 of each, the time constraint is:',
    '$2x + 4y \\leq 40$ with $x \\geq 5$, $y \\geq 5$',
    ['$x + y \\leq 40$', '$2x + 4y \\geq 40$', '$x + y \\geq 5$'],
    'Time used: $2x + 4y$ hours. Must not exceed 40. Additionally $x \\geq 5$ and $y \\geq 5$ for minimum production.'
  ));

  qs.push(makeQ(
    'Arjun must score at least 80 in his next test to maintain an average of at least 75 across 4 tests. His first 3 scores are 70, 72, 76. The inequality for his 4th test score $s$:',
    '$s \\geq 82$ (since $(70+72+76+s)/4 \\geq 75$)',
    ['$s \\geq 75$', '$s \\geq 80$', '$s \\geq 90$'],
    '$(70+72+76+s)/4 \\geq 75 \\Rightarrow 218 + s \\geq 300 \\Rightarrow s \\geq 82$.'
  ));

  // More varied word problems
  const cost = R(5, 15), fixed = R(100, 300), revenue = R(cost + 5, cost + 20);
  qs.push(makeQ(
    `A business has fixed costs ₹${fixed} and produces items at ₹${cost} each, selling at ₹${revenue} each. For profit, the minimum number of items $n$:`,
    `$n > \\frac{${fixed}}{${revenue - cost}} = ${Math.ceil(fixed / (revenue - cost))}$ items`,
    [`$n > ${fixed}$ items`, `$n > ${cost}$ items`, `$n < ${Math.ceil(fixed / (revenue - cost))}$ items`],
    `Profit: $(${revenue} - ${cost})n - ${fixed} > 0 \\Rightarrow ${revenue - cost}n > ${fixed} \\Rightarrow n > ${(fixed / (revenue - cost)).toFixed(1)}$. So $n \\geq ${Math.ceil(fixed / (revenue - cost))}$.`
  ));

  const litres = R(20, 50), tanker = R(200, 500);
  qs.push(makeQ(
    `A tank holds up to ${tanker} litres. It currently has ${litres} litres. How many more litres $x$ can be added?`,
    `$0 \\leq x \\leq ${tanker - litres}$`,
    [`$x \\leq ${tanker}$`, `$x \\geq ${tanker - litres}$`, `$x > 0$`],
    `After adding: ${litres} + x ≤ ${tanker}. So x ≤ ${tanker - litres}. Also x ≥ 0.`
  ));

  for (let i = 0; i < 5; i++) {
    const needed = R(60, 90), current = R(30, needed - 10), extra = needed - current;
    qs.push(makeQ(
      `Pooja needs at least ${needed} points across 3 rounds. She has ${current} so far. In the last 2 rounds, she needs at least how many points?`,
      `At least $${extra}$ points across 2 rounds`,
      [`At least $${needed}$ points`, `Exactly $${extra}$ points`, `At least $${needed - current + 5}$ points`],
      `Condition: ${current} + r ≥ ${needed}, so r ≥ ${extra}.`
    ));
  }

  return shuffle(qs).slice(0, 20);
}

export function generateWordProblemsAssessment() {
  const qs = [];

  qs.push(makeQ('IQ score must be between 90 and 110 (inclusive) for a study group. Inequality for IQ $q$:', '$90 \\leq q \\leq 110$', ['$q > 90$ and $q < 110$', '$q = 100$', '$q \\geq 110$'], 'Inclusive on both ends: $90 \\leq q \\leq 110$.'));
  qs.push(makeQ('A pipe fills at 30 litres/min. How long to fill a tank of at least 300 litres?', '$t \\geq 10$ minutes', ['$t \\leq 10$', '$t = 10$', '$t \\geq 30$'], '$30t \\geq 300 \\Rightarrow t \\geq 10$.'));

  for (let i = 0; i < 10; i++) {
    const rate = R(5, 20) * 10, target = R(5, 20) * 100;
    qs.push(makeQ(
      `A worker earns ₹${rate} per item. To earn at least ₹${target}, she must produce at least how many items?`,
      `$${Math.ceil(target / rate)}$ items ($n \\geq ${target}/${rate}$)`,
      [`$${Math.floor(target / rate) - 1}$ items`, `Exactly $${target}$ items`, `$${Math.ceil(target / rate) + 2}$ items`],
      `$${rate}n \\geq ${target} \\Rightarrow n \\geq ${target / rate} = ${Math.ceil(target / rate)}$ items.`
    ));
  }

  qs.push(makeQ('A student needs to score above 60% overall on 3 tests each worth 100. Scores are 55 and 62. Minimum for 3rd test:', '$63$ (since $(55+62+s)/3 > 60 \\Rightarrow s > 63$)', ['$60$', '$50$', '$70$'], '$(55+62+s)/3 > 60 \\Rightarrow 117+s > 180 \\Rightarrow s > 63$.'));
  qs.push(makeQ('Car A charges ₹500 flat + ₹20/km. Car B charges ₹800 + ₹10/km. For what distance is A cheaper?', '$d < 30$ km', ['$d > 30$ km', '$d = 30$ km', '$d < 50$ km'], '$500 + 20d < 800 + 10d \\Rightarrow 10d < 300 \\Rightarrow d < 30$.'));
  qs.push(makeQ('Weight limit is 500 kg per trip. Each crate weighs 35 kg. Maximum crates per trip:', '$14$ crates ($\\lfloor 500/35 \\rfloor = 14$)', ['$15$', '$13$', '$16$'], '$35n \\leq 500 \\Rightarrow n \\leq 14.28... \\Rightarrow n \\leq 14$.'));
  qs.push(makeQ('A diet requires at least 2000 but at most 2500 calories/day. The inequality:', '$2000 \\leq C \\leq 2500$', ['$C > 2000$', '$C < 2500$', '$C = 2250$'], 'Between 2000 and 2500 inclusive: $2000 \\leq C \\leq 2500$.'));
  qs.push(makeQ('Speed limit is 80 km/h. A car travels 200 km. Minimum journey time:', '$t \\geq 2.5$ hours', ['$t \\leq 2.5$', '$t = 2.5$', '$t \\geq 4$'], '$v \\leq 80$ and $t = 200/v$. Since $v \\leq 80$, $t = 200/v \\geq 200/80 = 2.5$ hours.'));
  qs.push(makeQ('In a class of 40, absent students must be ≤ 8 to maintain 80% attendance. Currently 5 absent. Max more who can miss:', '$3$ more ($5 + x \\leq 8$)', ['$8$', '$2$', '$5$'], '$5 + x \\leq 8 \\Rightarrow x \\leq 3$.'));

  return shuffle(qs).slice(0, 20);
}
