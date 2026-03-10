// ─── ComparingQuantitiesSkillsData.js ────────────────────────────────────────
// All question pools for the 4 Comparing Quantities skills.
// Supports question types: 'mcq', 'fill', 'multiStep', 'truefalse'
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

// ═══════════════════════════════════════════════════════════════════════════
// SKILL 1: PERCENTAGES
// ═══════════════════════════════════════════════════════════════════════════

function genPercentageOf() {
    const pct = rand(1, 9) * 5; // 5, 10, 15 ... 45
    const total = rand(3, 20) * 100;
    const answer = (pct / 100) * total;
    return {
        type: 'fill',
        question: `What is $${pct}\\%$ of ₹$${total}$?`,
        correctValue: answer,
        explanation: `$${pct}\\%$ of $${total} = (\\frac{${pct}}{100}) \\times ${total} =$ ₹$${answer}$.`,
    };
}

function genConvertToPercent() {
    const num = rand(1, 9);
    const den = rand(num + 1, 20);
    const pct = parseFloat(((num / den) * 100).toFixed(2));
    return {
        type: 'mcq',
        question: `Convert the fraction $\\frac{${num}}{${den}}$ to a percentage. (Round to 2 decimal places if needed.)`,
        options: [`$${pct}\\%$`, `$${parseFloat((pct + 5).toFixed(2))}\\%$`, `$${parseFloat((num * den).toFixed(2))}\\%$`, `$${parseFloat((100 / den).toFixed(2))}\\%$`],
        correct: 0,
        explanation: `$(\\frac{${num}}{${den}}) \\times 100 = ${pct}\\%$.`,
    };
}

function genPercentIncrease() {
    const original = rand(2, 15) * 100;
    const pct = rand(1, 8) * 5;
    const increase = (pct / 100) * original;
    const newVal = original + increase;
    return {
        type: 'multiStep',
        question: `A TV costs ₹$${original}$. Its price increases by $${pct}\\%$.\nStep 1: Find the increase amount.\nStep 2: Find the new price.`,
        options: [`₹$${newVal - increase}$`, `₹$${newVal}$`, `₹$${newVal + increase}$`, `₹$${original * 2}$`],
        correct: 1,
        explanation: `Increase $= (\\frac{${pct}}{100}) \\times ${original} =$ ₹$${increase}$. New price $= ${original} + ${increase} =$ ₹$${newVal}$.`,
    };
}

function genFindOriginal() {
    const pct = rand(1, 8) * 10;
    const result = rand(3, 20) * pct;
    const original = result * 100 / pct;
    return {
        type: 'fill',
        question: `$${pct}\\%$ of a number is $${result}$. What is the number?`,
        correctValue: original,
        explanation: `Let the number = $x$. $${pct}\\%$ of $x = ${result} \\rightarrow x = \\frac{${result} \\times 100}{${pct}} = ${original}$.`,
    };
}

function genPercentChange() {
    const original = rand(2, 10) * 100;
    const change = rand(1, 6) * 20;
    const isIncrease = Math.random() > 0.5;
    const newVal = isIncrease ? original + change : original - change;
    const pctChange = (change / original) * 100;
    return {
        type: 'fill',
        question: `A product's price changed from ₹$${original}$ to ₹$${newVal}$. What is the percentage ${isIncrease ? 'increase' : 'decrease'}?`,
        correctValue: pctChange,
        explanation: `$\\text{Change} = |${newVal} - ${original}| = ${change}$. $\\% \\text{ Change} = (\\frac{${change}}{${original}}) \\times 100 = ${pctChange}\\%$.`,
    };
}

const percentageStaticPractice = [
    { type: 'mcq', question: '$25\\%$ of a number is $75$. What is the number?', options: ['$300$', '$255$', '$200$', '$150$'], correct: 0, explanation: 'Let $\\text{number} = x$. $25\\% \\text{ of } x = 75 \\rightarrow x = \\frac{75 \\times 100}{25} = 300$.' },
    { type: 'truefalse', question: 'TRUE or FALSE: "$50\\% \\text{ of } 80$" equals "$80\\% \\text{ of } 50$".', options: ['True', 'False'], correct: 0, explanation: 'Both $= 40$! This works because $a\\% \\text{ of } b = b\\% \\text{ of } a$. It follows from $(\\frac{a}{100}) \\times b = (\\frac{b}{100}) \\times a$.' },
    { type: 'mcq', question: 'A student scored $54$ out of $90$. What is the percentage score?', options: ['$54\\%$', '$60\\%$', '$65\\%$', '$70\\%$'], correct: 1, explanation: '$(\\frac{54}{90}) \\times 100 = 60\\%$. Always: $(\\frac{\\text{obtained}}{\\text{total}}) \\times 100$.' },
    { type: 'multiStep', question: "A shirt's price increased from ₹$400$ to ₹$500$.\nStep 1: Find the increase.\nStep 2: Find $25\\%$ increase on original.", options: ['$20\\%$', '$25\\%$', '$30\\%$', '$15\\%$'], correct: 1, explanation: '$\\text{Increase} = 100$. $\\% \\text{ Increase} = (\\frac{100}{400}) \\times 100 = 25\\%$.' },
    { type: 'truefalse', question: 'TRUE or FALSE: $\\% \\text{ decrease}$ is calculated on the NEW (reduced) value.', options: ['True', 'False'], correct: 1, explanation: 'FALSE! $\\% \\text{ decrease} = (\\frac{\\text{Decrease}}{\\text{ORIGINAL value}}) \\times 100$. Always use the original (old) value as base.' },
    { type: 'mcq', question: 'What is $12.5\\%$ of ₹$6,400$?', options: ['₹$640$', '₹$800$', '₹$700$', '₹$900$'], correct: 1, explanation: '$12.5\\% = \\frac{1}{8}$. $\\frac{6400}{8} = 800$. Or: $(12.5/100) \\times 6400 = 800$.' },
    { type: 'fill', question: 'A class has $32$ boys and $18$ girls. What percentage of students are girls?', correctValue: 36, explanation: '$\\text{Total} = 50$. $\\% \\text{ girls} = (\\frac{18}{50}) \\times 100 = 36\\%$.' },
];

const percentageStaticAssessment = [
    { question: 'Convert $\\frac{3}{8}$ to a percentage.', options: ['$37\\%$', '$37.5\\%$', '$38\\%$', '$32\\%$'], correct: 1, explanation: '$(\\frac{3}{8}) \\times 100 = 37.5\\%$.' },
    { question: 'A number increased from $200$ to $250$. Find the $\\% \\text{ increase}$.', options: ['$20\\%$', '$25\\%$', '$50\\%$', '$15\\%$'], correct: 1, explanation: '$\\% \\text{ Increase} = (\\frac{50}{200}) \\times 100 = 25\\%$.' },
    { question: '$40\\%$ of a number is $160$. Find the number.', options: ['$64$', '$200$', '$400$', '$320$'], correct: 2, explanation: '$x = \\frac{160 \\times 100}{40} = 400$.' },
    { question: 'A population of $80,000$ decreased by $15\\%$. New population?', options: ['$68,000$', '$70,000$', '$72,000$', '$65,000$'], correct: 0, explanation: '$\\text{Decrease} = 15\\% \\times 80000 = 12,000. \\text{New} = 80000 - 12000 = 68,000$.' },
    { question: 'What percentage of $400$ is $60$?', options: ['$12\\%$', '$15\\%$', '$20\\%$', '$10\\%$'], correct: 1, explanation: '$(\\frac{60}{400}) \\times 100 = 15\\%$.' },
];

export function buildPercentagesPracticePool() {
    return [
        ...percentageStaticPractice, // 7
        genPercentageOf(), genPercentageOf(), genPercentageOf(), // 10
        genConvertToPercent(), genConvertToPercent(), genConvertToPercent(), // 13
        genPercentIncrease(), genPercentIncrease(), genPercentIncrease(), // 16
        genFindOriginal(), genFindOriginal(), // 18
        genPercentChange(), genPercentChange(), // 20
    ];
}

export function buildPercentagesAssessmentPool() {
    return [
        ...percentageStaticAssessment,
        genConvertToPercent(), genConvertToPercent(),
        genPercentIncrease(), genPercentIncrease(),
        genConvertToPercent(),
    ];
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL 2: PROFIT, LOSS & DISCOUNT
// ═══════════════════════════════════════════════════════════════════════════

function genProfitPct() {
    const cp = rand(3, 20) * 100;
    const profitPct = rand(1, 8) * 5;
    const profit = (profitPct / 100) * cp;
    const sp = cp + profit;
    return {
        type: 'mcq',
        question: `A shopkeeper bought an item for ₹$${cp}$ and sold it for ₹$${sp}$. What is the profit percentage?`,
        options: [`$${profitPct - 5}\\%$`, `$${profitPct}\\%$`, `$${profitPct + 5}\\%$`, `$${profitPct * 2}\\%$`],
        correct: 1,
        explanation: `Profit = ₹$${sp}$ - ₹$${cp}$ = ₹$${profit}$. Profit$\\% = (\\frac{${profit}}{${cp}}) \\times 100 = ${profitPct}\\%$.`,
    };
}

function genFindSP() {
    const cp = rand(4, 15) * 100;
    const profitPct = rand(1, 6) * 10;
    const sp = cp * (1 + profitPct / 100);
    return {
        type: 'fill',
        question: `A merchant buys goods for ₹$${cp}$ and wants to earn $${profitPct}\\%$ profit. What should the selling price be?`,
        correctValue: sp,
        explanation: `SP $= \\text{CP} \\times (1 + \\frac{\\text{Profit}\\%}{100}) = ${cp} \\times ${1 + profitPct / 100} =$ ₹$${sp}$.`,
    };
}

function genDiscountCalc() {
    const mp = rand(5, 20) * 100;
    const discountPct = rand(1, 6) * 5;
    const discount = (discountPct / 100) * mp;
    const sp = mp - discount;
    return {
        type: 'multiStep',
        question: `A jacket has a Marked Price of ₹$${mp}$. A discount of $${discountPct}\\%$ is offered.\nStep 1: Calculate the discount amount.\nStep 2: Find the selling price.`,
        options: [`₹$${sp - 50}$`, `₹$${sp}$`, `₹$${sp + discount}$`, `₹$${mp}$`],
        correct: 1,
        explanation: `Discount $= (\\frac{${discountPct}}{100}) \\times ${mp} =$ ₹$${discount}$. SP $= ${mp} - ${discount} =$ ₹$${sp}$.`,
    };
}

function genGSTCalc() {
    const sp = rand(3, 20) * 100;
    const gst = [5, 12, 18][rand(0, 2)];
    const gstAmount = (gst / 100) * sp;
    const total = sp + gstAmount;
    return {
        type: 'fill',
        question: `An electronic item costs ₹$${sp}$. GST of $${gst}\\%$ is applicable. What is the total amount payable?`,
        correctValue: total,
        explanation: `GST $= (\\frac{${gst}}{100}) \\times ${sp} =$ ₹$${gstAmount}$. Total $= ${sp} + ${gstAmount} =$ ₹$${total}$.`,
    };
}

function genLossPct() {
    const cp = rand(4, 16) * 100;
    const lossPct = rand(1, 5) * 5;
    const loss = (lossPct / 100) * cp;
    const sp = cp - loss;
    return {
        type: 'mcq',
        question: `An item was purchased for ₹$${cp}$ and sold for ₹$${sp}$. What is the loss percentage?`,
        options: [`$${lossPct - 5}\\%$`, `$${lossPct}\\%$`, `$${lossPct + 5}\\%$`, `$${lossPct * 2}\\%$`],
        correct: 1,
        explanation: `Loss = ₹$${cp}$ - ₹$${sp}$ = ₹$${loss}$. Loss$\\% = (\\frac{${loss}}{${cp}}) \\times 100 = ${lossPct}\\%$.`,
    };
}

const profitLossStaticPractice = [
    { type: 'mcq', question: 'Profit% and Loss% are always calculated on which price?', options: ['Selling Price', 'Marked Price', 'Cost Price', 'Discount'], correct: 2, explanation: '$\\text{Profit}\\% = (\\frac{\\text{Profit}}{\\text{CP}}) \\times 100$. $\\text{Loss}\\% = (\\frac{\\text{Loss}}{\\text{CP}}) \\times 100$. CP is ALWAYS the base.' },
    { type: 'truefalse', question: 'TRUE or FALSE: Discount% is calculated on the Selling Price.', options: ['True', 'False'], correct: 1, explanation: 'FALSE. Discount% is on the MARKED PRICE (MP), not SP. $\\text{SP} = \\text{MP} - \\text{Discount}$.' },
    { type: 'mcq', question: 'If SP = ₹$780$ and Profit$\\% = 30\\%$, what is the CP?', options: ['₹$520$', '₹$550$', '₹$600$', '₹$650$'], correct: 2, explanation: 'SP $= \\text{CP} \\times (1 + \\frac{30}{100}) = 1.3 \\times \\text{CP}$. CP $= \\frac{780}{1.3} =$ ₹$600$.' },
    { type: 'multiStep', question: '$\\text{MP} = ₹1200$. Discount $= 25\\%$. $\\text{CP} = ₹750$.\nStep 1: Find SP.\nStep 2: Find Profit%.', options: ['$10\\%$', '$20\\%$', '$15\\%$', '$25\\%$'], correct: 1, explanation: '$\\text{SP} = 1200 \\times 0.75 = ₹900$. $\\text{Profit} = 900 - 750 = 150$. $\\text{Profit}\\% = (\\frac{150}{750}) \\times 100 = 20\\%$.' },
    { type: 'truefalse', question: 'TRUE or FALSE: Equal % profit on one item and equal % loss on another item always results in no net gain/loss overall.', options: ['True', 'False'], correct: 1, explanation: 'FALSE! Equal profit% and loss% always results in a $\\text{NET LOSS} = \\frac{(\\text{common } \\%)^2}{100}$ percent of total cost.' },
    { type: 'fill', question: 'CP = ₹$2500$, SP = ₹$1900$. Find the loss%.', correctValue: 24, explanation: 'Loss $= 600$. Loss$\\% = (\\frac{600}{2500}) \\times 100 = 24\\%$.' },
];

const profitLossStaticAssessment = [
    { question: 'A book is bought for ₹$250$ and sold for ₹$300$. Profit%?', options: ['$20\\%$', '$25\\%$', '$16.7\\%$', '$15\\%$'], correct: 0, explanation: '$\\text{Profit} = 50$. $\\text{Profit}\\% = (\\frac{50}{250}) \\times 100 = 20\\%$.' },
    { question: 'MP = ₹$500$, Discount $= 20\\%$. What is the SP?', options: ['₹$400$', '₹$420$', '₹$380$', '₹$450$'], correct: 0, explanation: 'SP $= 500 \\times (1 - 0.20) = 500 \\times 0.8 =$ ₹$400$.' },
    { question: 'SP = ₹$390$, Loss $= 35\\%$. Find CP.', options: ['₹$500$', '₹$550$', '₹$600$', '₹$650$'], correct: 2, explanation: 'SP $= \\text{CP} \\times (1 - \\frac{35}{100}) = 0.65 \\times \\text{CP}$. CP $= \\frac{390}{0.65} =$ ₹$600$.' },
    { question: 'An item is sold at $15\\%$ profit. CP = ₹$800$. Find SP.', options: ['₹$920$', '₹$900$', '₹$880$', '₹$840$'], correct: 0, explanation: 'SP $= 800 \\times 1.15 =$ ₹$920$.' },
    { question: 'GST $= 18\\%$. If SP = ₹$1,000$, what does the customer pay?', options: ['₹$1,180$', '₹$1,200$', '₹$1,080$', '₹$1,150$'], correct: 0, explanation: 'Amount $= 1000 + (\\frac{18}{100}) \\times 1000 = 1000 + 180 =$ ₹$1,180$.' },
];

export function buildProfitLossPracticePool() {
    return [
        ...profitLossStaticPractice, // 6
        genProfitPct(), genProfitPct(), genProfitPct(), genProfitPct(), // 10
        genLossPct(), genLossPct(), genLossPct(), // 13
        genFindSP(), genFindSP(), genFindSP(), // 16
        genDiscountCalc(), genDiscountCalc(), // 18
        genGSTCalc(), genGSTCalc(), // 20
    ];
}

export function buildProfitLossAssessmentPool() {
    return [
        ...profitLossStaticAssessment,
        genProfitPct(), genProfitPct(),
        genLossPct(), genLossPct(),
        genDiscountCalc(),
    ];
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL 3: SIMPLE INTEREST
// ═══════════════════════════════════════════════════════════════════════════

function genSIBasic() {
    const p = rand(2, 20) * 1000;
    const r = rand(1, 4) * 2;  // 2,4,6,8
    const t = rand(1, 5);
    const si = (p * r * t) / 100;
    const amt = p + si;
    return {
        type: 'fill',
        question: `Find the Simple Interest on ₹$${p}$ at $${r}\\%$ per annum for $${t}$ year${t > 1 ? 's' : ''}.`,
        correctValue: si,
        explanation: `SI $= \\frac{${p} \\times ${r} \\times ${t}}{100} =$ ₹$${si}$.`,
    };
}

function genSIFindP() {
    for (let i = 0; i < 50; i++) {
        const r = rand(1, 5) * 2;
        const t = rand(1, 4);
        const si = rand(2, 20) * 100;
        const p = (si * 100) / (r * t);
        if (!Number.isInteger(p)) continue;
        return {
            type: 'fill',
            question: `The Simple Interest on a sum is ₹$${si}$ at $${r}\\%$ p.a. for $${t}$ year${t > 1 ? 's' : ''}. Find the Principal.`,
            correctValue: p,
            explanation: `P $= \\frac{\\text{SI} \\times 100}{\\text{R} \\times \\text{T}} = \\frac{${si} \\times 100}{${r} \\times ${t}} =$ ₹$${p}$.`,
        };
    }
    return { type: 'fill', question: 'SI = ₹$600$ at $5\\%$ p.a. for $3$ years. Find Principal.', correctValue: 4000, explanation: 'P $= \\frac{600 \\times 100}{5 \\times 3} =$ ₹$4000$.' };
}

function genSIFindRate() {
    for (let i = 0; i < 50; i++) {
        const p = rand(2, 20) * 1000;
        const t = rand(1, 4);
        const r = rand(1, 8);
        const si = (p * r * t) / 100;
        if (!Number.isInteger(si)) continue;
        return {
            type: 'mcq',
            question: `P = ₹$${p}$, T = ${t} year${t > 1 ? 's' : ''}, SI = ₹$${si}$. Find the rate of interest per annum.`,
            options: [`$${r - 1}\\%$`, `$${r}\\%$`, `$${r + 1}\\%$`, `$${r * 2}\\%$`],
            correct: 1,
            explanation: `$\\text{R} = \\frac{\\text{SI} \\times 100}{\\text{P} \\times \\text{T}} = \\frac{${si} \\times 100}{${p} \\times ${t}} = ${r}\\%$.`,
        };
    }
    return { type: 'mcq', question: 'P = ₹$5000$, T = $2$ years, SI = ₹$800$. Find rate.', options: ['$6\\%$', '$7\\%$', '$8\\%$', '$9\\%$'], correct: 2, explanation: 'R $= \\frac{800 \\times 100}{5000 \\times 2} = 8\\%$.' };
}

function genAmount() {
    const p = rand(2, 15) * 1000;
    const r = rand(1, 5) * 2;
    const t = rand(1, 4);
    const si = (p * r * t) / 100;
    const amt = p + si;
    return {
        type: 'fill',
        question: `P = ₹$${p}$, R = $${r}\\%$ p.a., T = ${t} year${t > 1 ? 's' : ''}. Find the Amount.`,
        correctValue: amt,
        explanation: `SI $= \\frac{${p} \\times ${r} \\times ${t}}{100} =$ ₹$${si}$. Amount $= \\text{P} + \\text{SI} = ${p} + ${si} =$ ₹$${amt}$.`,
    };
}

const siStaticPractice = [
    { type: 'mcq', question: 'In SI formula: SI = PRT/100. What does T stand for?', options: ['Tax', 'Total amount', 'Time in years', 'Transaction'], correct: 2, explanation: '$T = \\text{Time in years}$. $P = \\text{Principal}$, $R = \\text{Rate}\\%$ per annum, $T = \\text{Time in years}$.' },
    { type: 'truefalse', question: 'TRUE or FALSE: In Simple Interest, the interest earned increases year on year (i.e., year 2 interest > year 1 interest).', options: ['True', 'False'], correct: 1, explanation: 'FALSE. In Simple Interest, the SAME interest is earned each year because it is always calculated on the original Principal.' },
    { type: 'multiStep', question: 'P = ₹$12,000, R = 6\\%$ p.a., T = $2.5$ years.\nStep 1: Apply SI $= \\frac{PRT}{100}$.\nStep 2: Find Amount $= \\text{P} + \\text{SI}$.', options: ['₹$13,800$', '₹$14,200$', '₹$13,500$', '₹$14,000$'], correct: 0, explanation: 'SI $= \\frac{12000 \\times 6 \\times 2.5}{100} =$ ₹$1800$. Amount $= 12000 + 1800 =$ ₹$13,800$.' },
    { type: 'fill', question: 'At what rate will ₹$5000$ amount to ₹$6200$ in $3$ years under SI?', correctValue: 8, explanation: '$\\text{SI} = 6200 - 5000 = 1200$. $\\text{R} = \\frac{1200 \\times 100}{5000 \\times 3} = 8\\%$.' },
    { type: 'mcq', question: 'How long will it take ₹$8000$ to become ₹$10000$ at $5\\%$ SI per annum?', options: ['$3$ years', '$4$ years', '$5$ years', '$6$ years'], correct: 2, explanation: '$\\text{SI} = 10000 - 8000 = 2000$. $\\text{T} = \\frac{2000 \\times 100}{8000 \\times 5} = 5 \\text{ years}$.' },
    { type: 'truefalse', question: 'TRUE or FALSE: If P, R, and T are all doubled, the SI becomes 8 times the original.', options: ['True', 'False'], correct: 0, explanation: '$\\text{SI} = \\frac{PRT}{100}$. Doubling all three: $\\frac{(2P)(2R)(2T)}{100} = \\frac{8PRT}{100} = 8 \\times \\text{original}$. TRUE!' },
];

const siStaticAssessment = [
    { question: 'P = ₹$6000, R = 5\\%$ p.a., T = $3 \\text{ years}$. Find SI.', options: ['₹$800$', '₹$900$', '₹$1000$', '₹$750$'], correct: 1, explanation: 'SI $= \\frac{6000 \\times 5 \\times 3}{100} =$ ₹$900$.' },
    { question: 'P = ₹$4000$, SI = ₹$1200$, T = $5 \\text{ years}$. Find R.', options: ['$5\\%$', '$6\\%$', '$4\\%$', '$3\\%$'], correct: 1, explanation: 'R $= \\frac{1200 \\times 100}{4000 \\times 5} = 6\\%$.' },
    { question: 'P = ₹$10000$, R $= 8\\%$, SI = ₹$3200$. Find T.', options: ['$3 \\text{ years}$', '$4 \\text{ years}$', '$5 \\text{ years}$', '$6 \\text{ years}$'], correct: 1, explanation: 'T $= \\frac{3200 \\times 100}{10000 \\times 8} = 4 \\text{ years}$.' },
    { question: 'P = ₹$7500$, R $= 12\\%$ p.a., T = $18 \\text{ months}$. Find Amount.', options: ['₹$8,550$', '₹$8,850$', '₹$9,000$', '₹$9,250$'], correct: 1, explanation: 'T $= \\frac{18}{12} = 1.5 \\text{ years}$. SI $= \\frac{7500 \\times 12 \\times 1.5}{100} = 1350$. Amount $= 7500+1350 =$ ₹$8850$.' },
    { question: 'In how many years will ₹$2000$ double itself at $10\\%$ SI per annum?', options: ['$5 \\text{ years}$', '$8 \\text{ years}$', '$10 \\text{ years}$', '$12 \\text{ years}$'], correct: 2, explanation: 'To double: $\\text{SI} = \\text{P} = 2000$. $\\text{T} = \\frac{2000 \\times 100}{2000 \\times 10} = 10 \\text{ years}$.' },
];

export function buildSimpleInterestPracticePool() {
    return [
        ...siStaticPractice, // 6
        genSIBasic(), genSIBasic(), genSIBasic(), genSIBasic(), // 10
        genSIFindP(), genSIFindP(), genSIFindP(), // 13
        genSIFindRate(), genSIFindRate(), genSIFindRate(), // 16
        genAmount(), genAmount(), genAmount(), genAmount(), // 20
    ];
}

export function buildSimpleInterestAssessmentPool() {
    return [
        ...siStaticAssessment,
        genSIFindRate(), genSIFindRate(),
        genSIFindRate(),
        genSIFindRate(),
        genSIFindRate(),
    ];
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL 4: COMPOUND INTEREST
// ═══════════════════════════════════════════════════════════════════════════

function genCIAnnual() {
    const p = rand(2, 10) * 1000;
    const r = rand(1, 3) * 5; // 5, 10, 15
    const n = rand(2, 3);
    const multiplier = Math.pow(1 + r / 100, n);
    const amount = parseFloat((p * multiplier).toFixed(2));
    const ci = parseFloat((amount - p).toFixed(2));
    return {
        type: 'fill',
        question: `Find the Compound Interest on ₹$${p}$ at $${r}\\%$ p.a. for $${n}$ years (compounded annually).`,
        correctValue: ci,
        explanation: `$A = ${p} \\times (1 + \\frac{${r}}{100})^${n} = ${p} \\times ${multiplier.toFixed(4)} =$ ₹$${amount}$. CI $= ${amount} - ${p} =$ ₹$${ci}$.`,
    };
}

function genCIHalfYearly() {
    const p = rand(2, 8) * 1000;
    const rAnnual = rand(1, 3) * 8; // 8, 16, 24
    const rHalf = rAnnual / 2;
    const n = 2; // 1 year = 2 half-year periods
    const amount = parseFloat((p * Math.pow(1 + rHalf / 100, n)).toFixed(2));
    const ci = parseFloat((amount - p).toFixed(2));
    return {
        type: 'mcq',
        question: `P = ₹$${p}$. Rate $= ${rAnnual}\\%$ per annum, compounded half-yearly for $1$ year.\nWhat is the Compound Interest?`,
        options: [`₹$${parseFloat((ci - rHalf * 10).toFixed(2))}$`, `₹$${ci}$`, `₹$${parseFloat((ci + rHalf * 10).toFixed(2))}$`, `₹$${parseFloat((p * rAnnual / 100).toFixed(2))}$`],
        correct: 1,
        explanation: `Rate per half-year $= \\frac{${rAnnual}}{2} = ${rHalf}\\%$. Periods $= 2$.\n$A = ${p} \\times (1 + \\frac{${rHalf}}{100})^2 =$ ₹$${amount}$. CI = ₹$${ci}$.`,
    };
}

function genCIvsSI() {
    const p = rand(2, 10) * 1000;
    const r = rand(1, 4) * 5;
    const si2 = (p * r * 2) / 100;
    const ci2 = parseFloat((p * Math.pow(1 + r / 100, 2) - p).toFixed(2));
    const diff = parseFloat((ci2 - si2).toFixed(2));
    return {
        type: 'fill',
        question: `P = ₹$${p}$, R = $${r}\\%$ p.a., T = $2$ years.\nFind (CI - SI). [Hint: Use CI - SI $= P \\times (\\frac{R}{100})^2$]`,
        correctValue: diff,
        explanation: `CI - SI $= P \\times (\\frac{R}{100})^2 = ${p} \\times (\\frac{${r}}{100})^2 = ${p} \\times ${Math.pow(r / 100, 2)} =$ ₹$${diff}$.\n(Verification: SI = ₹$${si2}$, CI = ₹$${ci2}$, Diff = ₹$${diff}$.)`,
    };
}

function genDepreciation() {
    const p = rand(3, 20) * 10000;
    const r = rand(1, 4) * 5;
    const n = rand(1, 3);
    const amount = parseFloat((p * Math.pow(1 - r / 100, n)).toFixed(2));
    return {
        type: 'multiStep',
        question: `A machine costs ₹$${p}$. It depreciates at $${r}\\%$ per year.\nStep 1: Apply $A = P(1 - \\frac{R}{100})^n$ with $n = ${n}$.\nStep 2: Find value after $${n}$ year${n > 1 ? 's' : ''}.`,
        options: [
            `₹$${parseFloat((amount - 5000).toFixed(0))}$`,
            `₹$${parseFloat(amount.toFixed(0))}$`,
            `₹$${parseFloat((amount + 5000).toFixed(0))}$`,
            `₹$${parseFloat((p * (1 - r / 100)).toFixed(0))}$`
        ],
        correct: 1,
        explanation: `$A = ${p} \\times (1 - \\frac{${r}}{100})^${n} = ${p} \\times ${Math.pow(1 - r / 100, n).toFixed(4)} \\approx ₹${parseFloat(amount.toFixed(0))}$.`,
    };
}

const ciStaticPractice = [
    { type: 'mcq', question: 'In CI formula $A = P(1 + \\frac{R}{100})^n$, what does "n" represent?', options: ['Rate of interest', 'Net amount', 'Number of compounding periods', 'None of above'], correct: 2, explanation: '"n" is the number of compounding periods (e.g., years for annual compounding). $R$ is the rate per period.' },
    { type: 'truefalse', question: 'TRUE or FALSE: For the same P, R and T with n > 1 year, CI is always greater than SI.', options: ['True', 'False'], correct: 0, explanation: 'TRUE. For more than $1$ year, CI > SI because CI earns "interest on interest". For $n = 1$, CI = SI exactly.' },
    { type: 'truefalse', question: 'TRUE or FALSE: For half-yearly compounding, you use rate = R and periods = n (same as annual).', options: ['True', 'False'], correct: 1, explanation: 'FALSE. For half-yearly: $\\text{rate} = \\frac{R}{2}$ per period, $\\text{periods} = 2n$. This gives MORE return than annual compounding.' },
    { type: 'multiStep', question: 'P = ₹$1000$, R = $10\\%, n = 3$ years (annual compounding).\nDeduce: Year 1 principal $\\rightarrow$ Year 2 principal $\\rightarrow$ Year 3 amount.', options: ['₹$1,200$', '₹$1,310$', '₹$1,331$', '₹$1,300$'], correct: 2, explanation: 'Year 1: $1000 \\times 1.1 = 1100$. Year 2: $1100 \\times 1.1 = 1210$. Year 3: $1210 \\times 1.1 = 1331$. CI = ₹$331$.' },
    { type: 'fill', question: 'CI - SI for P = ₹$5000, R = 10\\%, T = 2$ years equals?', correctValue: 50, explanation: 'CI - SI $= P \\times (\\frac{R}{100})^2 = 5000 \\times (0.10)^2 = 5000 \\times 0.01 =$ ₹$50$.' },
    { type: 'mcq', question: 'A population of $1,00,000$ grows at $5\\%$ p.a. (like CI). Population after $2$ years?', options: ['$1,10,000$', '$1,10,250$', '$1,10,500$', '$1,05,000$'], correct: 1, explanation: '$A = 100000 \\times (1.05)^2 = 100000 \\times 1.1025 = 1,10,250$.' },
    { type: 'truefalse', question: 'TRUE or FALSE: Depreciation uses $A = P(1 - \\frac{R}{100})^n$, while growth uses $A = P(1 + \\frac{R}{100})^n$.', options: ['True', 'False'], correct: 0, explanation: 'TRUE. For depreciation (value decreasing), subtract: $(1 - \\frac{R}{100})$. For growth (value increasing), add: $(1 + \\frac{R}{100})$.' },
];

const ciStaticAssessment = [
    { question: 'P = ₹$5000$, R $= 8\\%$ p.a., $n = 2 \\text{ years (annual CI)}$. Find Amount.', options: ['₹$5,832$', '₹$5,800$', '₹$5,832$', '₹$6,000$'], correct: 0, explanation: '$A = 5000 \\times (1.08)^2 = 5000 \\times 1.1664 =$ ₹$5832$. CI = ₹$832$.' },
    { question: 'P = ₹$10,000$, R $= 10\\%$ p.a., half-yearly for $1$ year. CI $= ?$', options: ['₹$1,025$', '₹$1,000$', '₹$1,050$', '₹$950$'], correct: 0, explanation: 'Rate per period $= 5\\%, n = 2$. $A = 10000 \\times (1.05)^2 = 11025$. CI = ₹$1025$.' },
    { question: 'For $2$ years, CI - SI = ₹$25$. R $= 5\\%$. Find Principal.', options: ['₹$8,000$', '₹$10,000$', '₹$12,000$', '₹$5,000$'], correct: 1, explanation: 'CI - SI $= P(\\frac{R}{100})^2$. $25 = P \\times (0.05)^2 = P \\times 0.0025$. $P = \\frac{25}{0.0025} =$ ₹$10,000$.' },
    { question: 'A bike costs ₹$80,000$ and depreciates at $10\\%$ per year. Value after $2$ years?', options: ['$₹64,800$', '$₹60,000$', '$₹70,000$', '$₹72,000$'], correct: 0, explanation: '$A = 80000 \\times (0.9)^2 = 80000 \\times 0.81 = ₹64,800$.' },
    { question: 'P = ₹$2000$, R $= 15\\%$ p.a. compounded annually for $2$ years. CI $= ?$', options: ['₹$600$', '₹$645$', '₹$660$', '₹$700$'], correct: 1, explanation: '$A = 2000 \\times (1.15)^2 = 2000 \\times 1.3225 =$ ₹$2645$. CI = ₹$645$.' },
];

export function buildCompoundInterestPracticePool() {
    return [
        ...ciStaticPractice, // 7
        genCIAnnual(), genCIAnnual(), genCIAnnual(), genCIAnnual(), // 11
        genCIHalfYearly(), genCIHalfYearly(), genCIHalfYearly(), // 14
        genCIvsSI(), genCIvsSI(), genCIvsSI(), // 17
        genDepreciation(), genDepreciation(), genDepreciation(), // 20
    ];
}

export function buildCompoundInterestAssessmentPool() {
    return [
        ...ciStaticAssessment,
        genCIHalfYearly(), genCIHalfYearly(),
        genDepreciation(), genDepreciation(),
        genCIHalfYearly(),
    ];
}
