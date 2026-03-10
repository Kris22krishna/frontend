// ─── ProportionsSkillsData.js ─────────────────────────────────────────────────
// All question pools for the Direct & Inverse Proportions skills section.
// Dynamic generators produce fresh questions with randomised numbers each call.

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export function shuffle(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── DIRECT PROPORTION GENERATORS ────────────────────────────────────────────

function genDirectCost() {
    const items = ['pens', 'notebooks', 'pencils', 'erasers', 'rulers'];
    const item = items[rand(0, items.length - 1)];
    const qty1 = rand(3, 8);
    const cost1 = qty1 * rand(5, 15);
    const qty2 = rand(9, 20);
    const cost2 = (cost1 / qty1) * qty2;
    return {
        question: `${qty1} ${item} cost ₹${cost1}. What is the cost of ${qty2} ${item}?`,
        options: [`₹${cost2 - (cost1 / qty1)}`, `₹${cost2}`, `₹${cost2 + (cost1 / qty1)}`, `₹${cost2 * 2}`],
        correct: 1,
        explanation: `Cost of 1 ${item.slice(0, -1)} = ₹${cost1} ÷ ${qty1} = ₹${cost1 / qty1}. Cost of ${qty2} = ${cost1 / qty1} × ${qty2} = ₹${cost2}. (Direct proportion — more items, more cost.)`
    };
}

function genDirectDistance() {
    const speed = rand(40, 80);
    const t1 = rand(2, 4);
    const d1 = speed * t1;
    const t2 = rand(5, 8);
    const d2 = speed * t2;
    return {
        question: `A car covers ${d1} km in ${t1} hours at constant speed. How far will it travel in ${t2} hours?`,
        options: [`${d2 - speed} km`, `${d2} km`, `${d2 + speed} km`, `${d1 + t2} km`],
        correct: 1,
        explanation: `Speed = ${d1}/${t1} = ${speed} km/h. In ${t2} hours: ${speed} × ${t2} = ${d2} km. (Distance ∝ Time at constant speed — direct proportion.)`
    };
}

function genDirectShadow() {
    const h1 = rand(3, 8);
    const s1 = rand(2, 6);
    const h2 = rand(10, 20);
    const s2 = (s1 / h1) * h2;
    return {
        question: `A pole ${h1} m tall casts a shadow of ${s1} m at a certain time of day. How long is the shadow of a tree ${h2} m tall at the same time?`,
        options: [`${s2 - (s1 / h1)} m`, `${s2} m`, `${s2 + (s1 / h1)} m`, `${h2 - h1} m`],
        correct: 1,
        explanation: `Shadow ∝ Height (direct proportion). Shadow/Height = ${s1}/${h1}. For height ${h2}: Shadow = (${s1}/${h1}) × ${h2} = ${s2} m.`
    };
}

function genDirectMissingK() {
    const k = rand(3, 9);
    const x = rand(4, 10);
    const y = k * x;
    return {
        question: `y is directly proportional to x. When x = ${x}, y = ${y}. Find the constant of proportionality k.`,
        options: [`${k - 1}`, `${k}`, `${k + 1}`, `${y}`],
        correct: 1,
        explanation: `k = y/x = ${y}/${x} = ${k}. The relationship is y = ${k}x.`
    };
}

function genDirectFindY() {
    const k = rand(4, 12);
    const x1 = rand(2, 6);
    const y1 = k * x1;
    const x2 = rand(7, 14);
    const y2 = k * x2;
    return {
        question: `If y ∝ x and y = ${y1} when x = ${x1}, find y when x = ${x2}.`,
        options: [`${y2 - k}`, `${y2}`, `${y2 + k}`, `${x2 * x1}`],
        correct: 1,
        explanation: `k = ${y1}/${x1} = ${k}. When x = ${x2}: y = ${k} × ${x2} = ${y2}.`
    };
}

function genDirectWages() {
    const wage = rand(300, 800);
    const days1 = rand(3, 6);
    const pay1 = wage * days1;
    const days2 = rand(7, 12);
    const pay2 = wage * days2;
    return {
        question: `A worker earns ₹${pay1} for ${days1} days of work. How much will they earn in ${days2} days?`,
        options: [`₹${pay2 - wage}`, `₹${pay2}`, `₹${pay2 + wage}`, `₹${days2 * days1}`],
        correct: 1,
        explanation: `Wages/Day = ₹${pay1}/${days1} = ₹${wage}. For ${days2} days: ₹${wage} × ${days2} = ₹${pay2}. (Wages ∝ Days — direct proportion.)`
    };
}

function genDirectFuel() {
    const mpL = rand(12, 20);
    const fuel1 = rand(3, 6);
    const dist1 = mpL * fuel1;
    const fuel2 = rand(7, 12);
    const dist2 = mpL * fuel2;
    return {
        question: `A bike travels ${dist1} km on ${fuel1} litres of petrol. How far can it travel on ${fuel2} litres?`,
        options: [`${dist2 - mpL} km`, `${dist2} km`, `${dist2 + mpL} km`, `${fuel2 + dist1} km`],
        correct: 1,
        explanation: `Distance per litre = ${dist1}/${fuel1} = ${mpL} km/L. For ${fuel2} litres: ${mpL} × ${fuel2} = ${dist2} km. (Direct proportion.)`
    };
}

// ─── INVERSE PROPORTION GENERATORS ───────────────────────────────────────────

function genInverseWorkers() {
    for (let attempts = 0; attempts < 50; attempts++) {
        const k = rand(24, 72);
        const w1 = rand(3, 6);
        const d1 = k / w1;
        if (!Number.isInteger(d1)) continue;
        const w2 = rand(w1 + 2, 12);
        const d2 = k / w2;
        if (!Number.isInteger(d2) || d1 === d2) continue;
        return {
            question: `${w1} workers can complete a job in ${d1} days. How many days will ${w2} workers take to complete the same job?`,
            options: [`${d2 - 1} days`, `${d2} days`, `${d2 + 1} days`, `${d2 * 2} days`],
            correct: 1,
            explanation: `Inverse proportion: Workers × Days = constant. ${w1} × ${d1} = ${k}. So ${w2} × d = ${k} → d = ${k}/${w2} = ${d2} days. (More workers → fewer days.)`
        };
    }
    return {
        question: `4 workers can complete a job in 12 days. How many days will 8 workers take to complete the same job?`,
        options: [`5 days`, `6 days`, `7 days`, `12 days`],
        correct: 1,
        explanation: `Inverse proportion: Workers × Days = constant. 4 × 12 = 48. So 8 × d = 48 → d = 48/8 = 6 days.`
    };
}

function genInversePipes() {
    for (let attempts = 0; attempts < 50; attempts++) {
        const k = rand(12, 48);
        const p1 = rand(2, 4);
        const h1 = k / p1;
        if (!Number.isInteger(h1)) continue;
        const p2 = rand(p1 + 1, 8);
        const h2 = k / p2;
        if (!Number.isInteger(h2) || h1 === h2) continue;
        return {
            question: `${p1} pipes can fill a tank in ${h1} hours. How long will ${p2} pipes take to fill the same tank?`,
            options: [`${h2 - 1} hours`, `${h2} hours`, `${h2 + 1} hours`, `${p2 * h1} hours`],
            correct: 1,
            explanation: `Inverse proportion: Pipes × Hours = constant. ${p1} × ${h1} = ${k}. So ${p2} × h = ${k} → h = ${k}/${p2} = ${h2} hours.`
        };
    }
    return {
        question: `3 pipes can fill a tank in 8 hours. How long will 6 pipes take to fill the same tank?`,
        options: [`3 hours`, `4 hours`, `5 hours`, `24 hours`],
        correct: 1,
        explanation: `Inverse proportion: Pipes × Hours = constant. 3 × 8 = 24. So 6 × h = 24 → h = 24/6 = 4 hours.`
    };
}

function genInverseSpeed() {
    for (let attempts = 0; attempts < 50; attempts++) {
        const dist = rand(12, 36) * 10;
        const s1 = rand(4, 8) * 10;
        const t1 = dist / s1;
        if (!Number.isInteger(t1)) continue;
        const s2 = rand((s1 / 10) + 2, 12) * 10;
        const t2 = dist / s2;
        if (!Number.isInteger(t2) || t1 === t2) continue;
        return {
            question: `A car covers a fixed distance at ${s1} km/h in ${t1} hours. How long will it take at ${s2} km/h?`,
            options: [`${t2 - 1} hours`, `${t2} hours`, `${t2 + 1} hours`, `${t1 + 1} hours`],
            correct: 1,
            explanation: `Speed × Time = Distance (constant). ${s1} × ${t1} = ${dist}. At ${s2} km/h: ${s2} × t = ${dist} → t = ${dist}/${s2} = ${t2} hours.`
        };
    }
    return {
        question: `A car covers a fixed distance at 60 km/h in 4 hours. How long will it take at 80 km/h?`,
        options: [`2 hours`, `3 hours`, `4 hours`, `5 hours`],
        correct: 1,
        explanation: `Speed × Time = Distance (constant). 60 × 4 = 240. At 80 km/h: 80 × t = 240 → t = 240/80 = 3 hours.`
    };
}

function genInverseMissing() {
    for (let attempts = 0; attempts < 50; attempts++) {
        const k = rand(60, 180);
        const x1 = rand(4, 10);
        const y1 = k / x1;
        if (!Number.isInteger(y1)) continue;
        const x2 = rand(x1 + 2, 20);
        const y2 = k / x2;
        if (!Number.isInteger(y2) || y1 === y2) continue;
        return {
            question: `x and y are in inverse proportion. When x = ${x1}, y = ${y1}. Find y when x = ${x2}.`,
            options: [`${y2 - 1}`, `${y2}`, `${y2 + 1}`, `${x2 * y1}`],
            correct: 1,
            explanation: `Constant k = x × y = ${x1} × ${y1} = ${k}. When x = ${x2}: y = ${k}/${x2} = ${y2}.`
        };
    }
    return {
        question: `x and y are in inverse proportion. When x = 5, y = 24. Find y when x = 12.`,
        options: [`9`, `10`, `11`, `12`],
        correct: 1,
        explanation: `Constant k = x × y = 5 × 24 = 120. When x = 12: y = 120/12 = 10.`
    };
}

function genInverseGears() {
    for (let attempts = 0; attempts < 50; attempts++) {
        const k = rand(12, 30) * 10;
        const t1 = rand(15, 40);
        const rpm1 = k / t1;
        if (!Number.isInteger(rpm1)) continue;
        const t2 = rand(t1 + 5, 80);
        const rpm2 = k / t2;
        if (!Number.isInteger(rpm2) || rpm1 === rpm2) continue;
        return {
            question: `A gear with ${t1} teeth rotates at ${rpm1} rpm. How fast does a gear with ${t2} teeth rotate when meshed with it?`,
            options: [`${rpm2 - 1} rpm`, `${rpm2} rpm`, `${rpm2 + 1} rpm`, `${t2} rpm`],
            correct: 1,
            explanation: `Teeth × RPM = constant (inverse proportion). ${t1} × ${rpm1} = ${k}. For ${t2} teeth: rpm = ${k}/${t2} = ${rpm2} rpm.`
        };
    }
    return {
        question: `A gear with 20 teeth rotates at 30 rpm. How fast does a gear with 60 teeth rotate when meshed with it?`,
        options: [`9 rpm`, `10 rpm`, `11 rpm`, `12 rpm`],
        correct: 1,
        explanation: `Teeth × RPM = constant (inverse proportion). 20 × 30 = 600. For 60 teeth: rpm = 600/60 = 10 rpm.`
    };
}

// ─── STATIC QUESTION BANKS ───────────────────────────────────────────────────

const directStaticPractice = [
    { question: 'In direct proportion, if x is tripled, then y is:', options: ['Halved', 'Tripled', 'Unchanged', 'Divided by 3'], correct: 1, explanation: 'In direct proportion y = kx. If x × 3, then y = k(3x) = 3kx = 3y. y is also tripled.' },
    { question: 'Which of these is an example of DIRECT proportion?', options: ['Number of workers and days taken for a job', 'Speed and time for a fixed distance', 'Number of books and cost at a fixed price', 'Pipes and time to fill a tank'], correct: 2, explanation: 'Cost = Price Per Book × Number of Books. Price is fixed, so cost ∝ number of books. This is direct proportion.' },
    { question: 'The graph of direct proportion (y ∝ x) is:', options: ['A U-shaped parabola', 'A horizontal line', 'A straight line through the origin', 'A curved hyperbola'], correct: 2, explanation: 'y = kx is a linear equation through (0,0). Its graph is a straight line passing through the origin.' },
    { question: 'The ratio y/x in direct proportion is:', options: ['Always zero', 'Variable', 'Constant (= k)', 'Greater than 1 always'], correct: 2, explanation: 'In direct proportion y/x = k (the constant of proportionality). This ratio NEVER changes.' },
    { question: 'If 1 kg of rice costs ₹50, what do 7 kg cost? (Direct proportion)', options: ['₹300', '₹350', '₹400', '₹250'], correct: 1, explanation: 'Cost of 1 kg = ₹50. Cost of 7 kg = 50 × 7 = ₹350. (Unitary method)' },
    { question: 'In the proportion 3 : 5 :: 12 : 20, which is the constant?', options: ['3/12 = 0.25', '5/3 = 1.67', '3/5 = 0.6', '12/20 = 0.6'], correct: 2, explanation: '3/5 = 0.6 = 12/20. The constant ratio y/x = 0.6 for both pairs.' },
    { question: 'A recipe needs 2 cups of flour for 12 cookies. For 36 cookies, you need:', options: ['4 cups', '6 cups', '8 cups', '3 cups'], correct: 1, explanation: 'Flour ∝ Cookies (direct). 2/12 = x/36 → x = (2 × 36)/12 = 6 cups.' },
];

const directStaticAssessment = [
    { question: 'The distance covered by a car is directly proportional to time at constant speed. If 150 km are covered in 3 hours, how far in 5 hours?', options: ['200 km', '250 km', '300 km', '180 km'], correct: 1, explanation: 'Speed = 150/3 = 50 km/h. In 5 hours: 50 × 5 = 250 km.' },
    { question: 'A shadow of 4 m is cast by a 6 m pole. What shadow does a 15 m tree cast at the same time?', options: ['8 m', '10 m', '12 m', '9 m'], correct: 1, explanation: 'Shadow/Height = 4/6 = 2/3 (constant). Shadow of 15 m tree = (2/3) × 15 = 10 m.' },
    { question: 'If y is directly proportional to x and y = 36 when x = 4, what is k?', options: ['8', '9', '12', '6'], correct: 1, explanation: 'k = y/x = 36/4 = 9. The equation is y = 9x.' },
    { question: 'A worker earns ₹1800 in 6 days. In how many days will he earn ₹3000?', options: ['8 days', '10 days', '12 days', '15 days'], correct: 1, explanation: 'Wages per day = 1800/6 = ₹300. Days for ₹3000 = 3000/300 = 10 days.' },
    { question: 'A car uses 8 litres of fuel to travel 96 km. How much fuel for 240 km?', options: ['16 L', '20 L', '24 L', '18 L'], correct: 1, explanation: 'Fuel per km = 8/96 = 1/12 L/km. For 240 km: (1/12) × 240 = 20 L.' },
];

const inverseStaticPractice = [
    { question: 'In inverse proportion, if x doubles, then y:', options: ['Doubles', 'Halves', 'Triples', 'Stays the same'], correct: 1, explanation: 'In inverse proportion xy = k. If x × 2, then (2x)y = k → y = k/(2x) = half of original y.' },
    { question: 'Which of these is an example of INVERSE proportion?', options: ['Cost and number of items at fixed price', 'Workers and days to complete a job', 'Distance and time at fixed speed', 'Height and shadow length'], correct: 1, explanation: 'More workers → fewer days. Workers × Days = constant. This is inverse proportion.' },
    { question: 'The product x × y in an inverse proportion is:', options: ['Always zero', 'Always variable', 'A constant (k)', 'Equal to x + y'], correct: 2, explanation: 'In inverse proportion x × y = k (constant). This product never changes for any pair of corresponding values.' },
    { question: 'If 6 men complete a job in 8 days, 4 men take:', options: ['10 days', '12 days', '14 days', '16 days'], correct: 1, explanation: 'k = 6 × 8 = 48. 4 × d = 48 → d = 12 days. (Inverse proportion — fewer men, more days.)' },
    { question: 'In inverse proportion, if x is multiplied by 3, y becomes:', options: ['3y', 'y/3', '9y', 'y + 3'], correct: 1, explanation: 'xy = k. If x becomes 3x: 3x × y_new = k → y_new = k/(3x) = y/3.' },
    { question: 'A driver takes 4 hours at 60 km/h. How long at 80 km/h for the same journey?', options: ['2 hours', '3 hours', '5 hours', '6 hours'], correct: 1, explanation: 'k = 60 × 4 = 240. 80 × t = 240 → t = 3 hours. (Inverse proportion.)' },
    { question: 'The graph of inverse proportion (y ∝ 1/x) is shaped like:', options: ['A straight line through origin', 'A vertical line', 'A U-shaped parabola', 'A hyperbola (curve decreasing from left)'], correct: 3, explanation: 'y = k/x is a hyperbola — a curve that decreases as x increases, never touching the axes.' },
];

const inverseStaticAssessment = [
    { question: '10 workers build a wall in 12 days. In how many days will 15 workers build the same wall?', options: ['6 days', '8 days', '10 days', '18 days'], correct: 1, explanation: 'k = 10 × 12 = 120. 15 × d = 120 → d = 8 days.' },
    { question: 'A car at 60 km/h covers a distance in 5 hours. Time taken at 75 km/h?', options: ['3 hours', '4 hours', '6 hours', '8 hours'], correct: 1, explanation: 'k = 60 × 5 = 300. 75 × t = 300 → t = 4 hours.' },
    { question: '3 pipes fill a tank in 16 hours. How long do 6 pipes take?', options: ['6 hours', '8 hours', '10 hours', '12 hours'], correct: 1, explanation: 'k = 3 × 16 = 48. 6 × t = 48 → t = 8 hours.' },
    { question: 'x and y are in inverse proportion. x = 6, y = 8. Find y when x = 12.', options: ['4', '16', '6', '3'], correct: 0, explanation: 'k = 6 × 8 = 48. 12 × y = 48 → y = 4.' },
    { question: 'A gear with 30 teeth turns at 40 rpm. A meshing gear with 60 teeth turns at:', options: ['80 rpm', '20 rpm', '40 rpm', '60 rpm'], correct: 1, explanation: 'k = 30 × 40 = 1200. 60 × rpm = 1200 → rpm = 20. (More teeth → slower rotation — inverse proportion.)' },
];

// ─── BUILD FULL QUESTION POOLS ────────────────────────────────────────────────

export function buildDirectPracticePool() {
    return [
        ...directStaticPractice,
        genDirectCost(), genDirectCost(), genDirectCost(),
        genDirectDistance(), genDirectDistance(),
        genDirectShadow(), genDirectShadow(),
        genDirectMissingK(), genDirectMissingK(),
        genDirectFindY(), genDirectFindY(),
        genDirectWages(), genDirectWages(),
        genDirectFuel(), genDirectFuel(),
    ];
}

export function buildDirectAssessmentPool() {
    return [
        ...directStaticAssessment,
        genDirectCost(), genDirectCost(),
        genDirectDistance(),
        genDirectShadow(),
        genDirectMissingK(),
        genDirectFindY(),
        genDirectWages(),
        genDirectFuel(),
    ];
}

export function buildInversePracticePool() {
    return [
        ...inverseStaticPractice,
        genInverseWorkers(), genInverseWorkers(), genInverseWorkers(),
        genInversePipes(), genInversePipes(),
        genInverseSpeed(), genInverseSpeed(),
        genInverseMissing(), genInverseMissing(),
        genInverseGears(),
    ];
}

export function buildInverseAssessmentPool() {
    return [
        ...inverseStaticAssessment,
        genInverseWorkers(), genInverseWorkers(),
        genInversePipes(),
        genInverseSpeed(),
        genInverseMissing(),
        genInverseGears(),
    ];
}
