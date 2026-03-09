import React from 'react';

// ─── SHUFFLE HELPER ───────────────────────────────────────────────────────────
export const lgShuffle = (opts, ansIdx) => {
    let list = opts.map((opt, i) => ({ opt, isAns: i === ansIdx }));
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return { opts: list.map(item => item.opt), ans: list.findIndex(item => item.isAns) };
};

// ─── 5 PLOTTING SCENARIOS (DYNAMIC) ──────────────────────────────────────────
export function generateLGScenarios() {
    const scenarios = [];

    // 1. Cost of Fruit (Dynamic)
    const fruits = ['Apples', 'Oranges', 'Mangoes', 'Bananas', 'Kiwis'];
    const sf = fruits[Math.floor(Math.random() * fruits.length)];
    const spf = Math.floor(Math.random() * 8) + 4;
    const s1q1 = lgShuffle([`₹${3 * spf}`, `₹${2 * spf}`, `₹${4 * spf}`, `₹${5 * spf}`], 0);
    const s1q2 = lgShuffle(['4', '3', '5', '6'], 0);
    const s1q3 = lgShuffle(['Cost ∝ Quantity (Direct proportion)', 'Cost is never ₹0', 'Price keeps changing', 'Only valid for 5 items'], 0);
    scenarios.push({
        title: `Cost of ${sf}`,
        eq: `Cost = ₹${spf} × Quantity`,
        xLabel: `Number of ${sf}`, yLabel: 'Cost (in ₹)',
        xMin: 0, xMax: 6, yMin: 0, yMax: 6 * spf + (spf % 2 === 0 ? 0 : 2),
        points: [1, 2, 3, 4, 5].map(x => ({ x, y: x * spf })),
        xScaleOpts: [{ label: `1 unit = 1 item`, v: 1 }],
        yScaleOpts: [{ label: `1 unit = ₹${spf}`, v: spf }, { label: `1 unit = ₹${spf * 2}`, v: spf * 2 }],
        mcqs: [
            { q: `From the graph, what is the cost of 3 ${sf.toLowerCase()}?`, opts: s1q1.opts, ans: s1q1.ans, exp: `Find 3 on X-axis → go up to line → read ₹${3 * spf} on Y-axis.` },
            { q: `How many ${sf.toLowerCase()} can be bought for ₹${4 * spf}?`, opts: s1q2.opts, ans: s1q2.ans, exp: `Find ₹${4 * spf} on Y-axis → trace to the line → drop to X-axis → 4 items.` },
            { q: 'The graph passes through the origin. What does this confirm?', opts: s1q3.opts, ans: s1q3.ans, exp: 'A straight line through origin (0,0) means Cost ∝ Quantity — direct proportion.' },
        ],
    });

    // 2. Car Distance (Dynamic)
    const speed = Math.floor(Math.random() * 3 + 3) * 10;
    const s2q1 = lgShuffle([`${2.5 * speed} km`, `${2 * speed} km`, `${3 * speed} km`, `${4 * speed} km`], 0);
    const s2q2 = lgShuffle(['3 hours', '2 hours', '4 hours', '2.5 hours'], 0);
    const s2q3 = lgShuffle([`Speed (${speed} km/h)`, 'Total distance', 'Total time', 'Half the speed'], 0);
    scenarios.push({
        title: 'Distance Travelled by a Car',
        eq: `Distance = ${speed} × Time`,
        xLabel: 'Time (in hours)', yLabel: 'Distance (in km)',
        xMin: 0, xMax: 5, yMin: 0, yMax: 5 * speed,
        points: [1, 2, 3, 4].map(x => ({ x, y: x * speed })),
        xScaleOpts: [{ label: '1 unit = 1 hr', v: 1 }],
        yScaleOpts: [{ label: `1 unit = ${speed} km`, v: speed }, { label: `1 unit = ${speed / 2} km`, v: speed / 2 }],
        mcqs: [
            { q: 'From the graph, how far did the car travel in 2.5 hours?', opts: s2q1.opts, ans: s2q1.ans, exp: `Distance = ${speed} × 2.5 = ${2.5 * speed} km.` },
            { q: `After how many hours had the car covered ${3 * speed} km?`, opts: s2q2.opts, ans: s2q2.ans, exp: `Find ${3 * speed} on Y-axis → trace right to line → drop to X-axis → 3 hours.` },
            { q: 'The slope of this distance–time graph equals:', opts: s2q3.opts, ans: s2q3.ans, exp: `Slope = Distance ÷ Time = speed. Here slope = ${speed} km/h.` },
        ],
    });

    // 3. Bank Interest (Dynamic)
    const rate = Math.floor(Math.random() * 4) + 5;
    const rate1000 = 10 * rate;
    const s3q1 = lgShuffle(['Yes — ₹0 deposit earns ₹0 interest', 'No — SI starts higher', 'Only at 0% rate', 'No — it starts at the rate'], 0);
    const s3q2 = lgShuffle([`₹${2.5 * rate1000}`, `₹${2 * rate1000}`, `₹${3 * rate1000}`, `₹${1.5 * rate1000}`], 0);
    const s3q3 = lgShuffle([`₹3500`, `₹3000`, `₹4000`, `₹2500`], 0);
    scenarios.push({
        title: 'Interest on Bank Deposits',
        eq: `SI = ${rate}% of Deposit (per year)`,
        xLabel: 'Deposit (in ₹)', yLabel: 'Simple Interest (in ₹)',
        xMin: 0, xMax: 6000, yMin: 0, yMax: 5 * rate1000 + rate1000,
        points: [1000, 2000, 3000, 4000, 5000].map(x => ({ x, y: (x / 1000) * rate1000 })),
        xScaleOpts: [{ label: '1 unit = ₹1000', v: 1000 }, { label: '1 unit = ₹500', v: 500 }],
        yScaleOpts: [{ label: `1 unit = ₹${rate1000}`, v: rate1000 }, { label: `1 unit = ₹${rate1000 / 2}`, v: rate1000 / 2 }],
        mcqs: [
            { q: 'Does the SI vs Deposit graph pass through the origin?', opts: s3q1.opts, ans: s3q1.ans, exp: 'When Deposit = ₹0, SI = ₹0. The graph always passes through (0,0).' },
            { q: 'From the graph, find the SI on a deposit of ₹2500.', opts: s3q2.opts, ans: s3q2.ans, exp: `₹2500 is midway between ₹2000 and ₹3000. SI corresponds to ₹${2.5 * rate1000}.` },
            { q: `To earn an SI of ₹${3.5 * rate1000} per year, how much should be deposited?`, opts: s3q3.opts, ans: s3q3.ans, exp: `Find ₹${3.5 * rate1000} on Y-axis → trace to line → drop to X-axis → ₹3500 deposit.` },
        ],
    });

    // 4. Taxi Fare (Non-Origin Graph)
    const baseFare = Math.floor(Math.random() * 3 + 2) * 10;
    const perKm = Math.floor(Math.random() * 2 + 1) * 10;
    const s4q1 = lgShuffle([`₹${baseFare}`, `₹0`, `₹${perKm}`, `₹${baseFare + perKm}`], 0);
    const s4q2 = lgShuffle([`₹${baseFare + 7 * perKm}`, `₹${7 * perKm}`, `₹${baseFare + 6 * perKm}`, `₹${baseFare + 8 * perKm}`], 0);
    const s4q3 = lgShuffle(['Fixed base fare of ₹' + baseFare, 'Per-km rate is changing', 'Distance is never 0', 'It actually is straight'], 0);
    scenarios.push({
        title: 'Taxi Fare (Fixed + Per km)',
        eq: `Fare = ₹${baseFare} + (₹${perKm} × Distance)`,
        xLabel: 'Distance (in km)', yLabel: 'Total Fare (in ₹)',
        xMin: 0, xMax: 10, yMin: 0, yMax: baseFare + 10 * perKm + 10,
        points: [2, 4, 6, 8, 10].map(x => ({ x, y: baseFare + (x * perKm) })),
        xScaleOpts: [{ label: '1 unit = 2 km', v: 2 }, { label: '1 unit = 1 km', v: 1 }],
        yScaleOpts: [{ label: `1 unit = ₹20`, v: 20 }, { label: `1 unit = ₹10`, v: 10 }],
        mcqs: [
            { q: 'What is the y-intercept of the graph (Fare when Distance = 0)?', opts: s4q1.opts, ans: s4q1.ans, exp: `Even for 0 km, the fixed base fare of ₹${baseFare} is charged.` },
            { q: 'What is the total fare for a journey of 7 km?', opts: s4q2.opts, ans: s4q2.ans, exp: `Fare = ₹${baseFare} + ₹${perKm} × 7 = ₹${baseFare + 7 * perKm}.` },
            { q: 'Why does this cost graph NOT pass through the origin?', opts: s4q3.opts, ans: s4q3.ans, exp: `Because of the initial Fixed Fare (₹${baseFare}), the cost does not start at ₹0.` },
        ],
    });

    // 5. Cycling Distance (Dynamic)
    const mph = Math.floor(Math.random() * 3 + 2) * 5;
    const s5q1 = lgShuffle([`${mph * 5} km`, `${mph * 4} km`, `${mph * 6} km`, `${mph * 3} km`], 0);
    const s5q2 = lgShuffle([`${mph} km/h`, `${mph / 2} km/h`, `${mph * 1.5} km/h`, `${mph * 2} km/h`], 0);
    const s5q3 = lgShuffle(['Yes — constant speed = straight line', 'No — speed changes', 'Only for first hours', 'Yes — but it curves'], 0);
    scenarios.push({
        title: 'Distance by a Cyclist',
        eq: `Distance = ${mph} × Time`,
        xLabel: 'Time (in hours)', yLabel: 'Distance (in km)',
        xMin: 0, xMax: 9, yMin: 0, yMax: 9 * mph + 10,
        points: [2, 4, 6, 8].map(x => ({ x, y: x * mph })),
        xScaleOpts: [{ label: '1 unit = 1 hr', v: 1 }, { label: '1 unit = 2 hrs', v: 2 }],
        yScaleOpts: [{ label: `1 unit = ${mph * 2} km`, v: mph * 2 }, { label: `1 unit = ${mph} km`, v: mph }],
        mcqs: [
            { q: 'From the graph, how far does the cyclist travel in 5 hours?', opts: s5q1.opts, ans: s5q1.ans, exp: `Find 5 on X-axis → trace up to line → read Y-axis.` },
            { q: 'What is the speed of the cyclist?', opts: s5q2.opts, ans: s5q2.ans, exp: `Speed = Distance ÷ Time = ${mph} km/h.` },
            { q: 'Is the Distance–Time graph for the cyclist a straight line?', opts: s5q3.opts, ans: s5q3.ans, exp: `Constant speed means time and distance are in direct proportion.` },
        ],
    });

    return scenarios;
}

// ─── MINI GRAPH COMPONENT ─────────────────────────────────────────────────────
export function GraphMini({ scenario, xGridStep, yGridStep, color, userPoints }) {
    const W = 280, H = 220;
    const PL = 52, PB = 44, PT = 14, PR = 14;
    const pw = W - PL - PR, ph = H - PT - PB;
    const { xMin, xMax, yMin, yMax } = scenario;

    const px = (dx) => PL + ((dx - xMin) / (xMax - xMin)) * pw;
    const py = (dy) => PT + (1 - (dy - yMin) / (yMax - yMin)) * ph;

    const xTicks = [];
    for (let gx = xMin; gx <= xMax; gx += xGridStep) xTicks.push(gx);
    const yTicks = [];
    for (let gy = yMin; gy <= yMax; gy += yGridStep) yTicks.push(gy);

    // use userPoints if provided, otherwise use scenario.points (correct graph)
    const pts = userPoints || scenario.points;
    const sorted = [...pts].sort((a, b) => a.x - b.x);

    return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', maxWidth: '100%' }}>
            {xTicks.map((gx, i) => <line key={`vg${i}`} x1={px(gx)} y1={PT} x2={px(gx)} y2={PT + ph} stroke="#e2e8f0" strokeWidth={1} />)}
            {yTicks.map((gy, i) => <line key={`hg${i}`} x1={PL} y1={py(gy)} x2={PL + pw} y2={py(gy)} stroke="#e2e8f0" strokeWidth={1} />)}
            <line x1={PL} y1={PT} x2={PL} y2={PT + ph} stroke="#1e293b" strokeWidth={2} />
            <line x1={PL} y1={PT + ph} x2={PL + pw} y2={PT + ph} stroke="#1e293b" strokeWidth={2} />
            {xTicks.map((gx, i) => <text key={`xl${i}`} x={px(gx)} y={PT + ph + 14} textAnchor="middle" fontSize={8} fill="#64748b">{gx}</text>)}
            {yTicks.map((gy, i) => <text key={`yl${i}`} x={PL - 4} y={py(gy) + 3} textAnchor="end" fontSize={8} fill="#64748b">{gy}</text>)}
            <text x={PL + pw / 2} y={H - 2} textAnchor="middle" fontSize={9} fill="#374151" fontWeight="700">{scenario.xLabel}</text>
            {sorted.length > 1 && sorted.map((p, i) => {
                if (i === 0) return null;
                const prev = sorted[i - 1];
                return <line key={`s${i}`} x1={px(prev.x)} y1={py(prev.y)} x2={px(p.x)} y2={py(p.y)} stroke={color} strokeWidth={2} strokeLinecap="round" />;
            })}
            {sorted.map((p, i) => <circle key={`p${i}`} cx={px(p.x)} cy={py(p.y)} r={4} fill={color} stroke="#fff" strokeWidth={1.5} />)}
        </svg>
    );
}
