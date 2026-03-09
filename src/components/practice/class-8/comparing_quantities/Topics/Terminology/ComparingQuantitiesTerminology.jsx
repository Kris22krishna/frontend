import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../comparing_quantities.css';
import { LatexText } from '../../../../../LatexText';

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const TERMS = [
    {
        name: 'Ratio & Percentage',
        icon: '%',
        color: '#0f4c81',
        def: 'A RATIO compares two quantities of the same kind ($a : b$). A PERCENTAGE is a special ratio with denominator $100$, written as $x\\%$. To convert a ratio to $\\%$, multiply by $100$. To convert $\\%$ to a fraction, divide by $100$.',
        example: 'Ratio of boys to girls $= 3 : 5$. Fraction of boys $= \\frac{3}{8}$. Percentage of boys $= (\\frac{3}{8}) \\times 100 = 37.5\\%$.',
        realWorld: 'Exam scores: $36/40 = 90\\%$. Battery level: $75\\%$. Protein in food: $8g$ per $100g = 8\\%$.',
    },
    {
        name: 'Profit & Loss',
        icon: '💹',
        color: '#1a237e',
        def: '$\\text{PROFIT} = \\text{Selling Price (SP)} - \\text{Cost Price (CP)}$, when $\\text{SP} > \\text{CP}$.\n$\\text{LOSS} = \\text{CP} - \\text{SP}$, when $\\text{SP} < \\text{CP}$.\n$\\text{Profit}\\% = (\\frac{\\text{Profit}}{\\text{CP}}) \\times 100$. $\\text{Loss}\\% = (\\frac{\\text{Loss}}{\\text{CP}}) \\times 100$.\n⚠️ Always calculate $\\%$ on Cost Price (CP), not SP.',
        example: 'Bought a phone for ₹$12,000$. Sold for ₹$14,400$.\n$\\text{Profit} = 14,400 - 12,000 = ₹2,400$.\n$\\text{Profit}\\% = (\\frac{2400}{12000}) \\times 100 = 20\\%$.',
        realWorld: 'All businesses track profit% to measure performance. A 20% margin is considered good retail profit.',
    },
    {
        name: 'Discount & Marked Price',
        icon: '🏷️',
        color: '#6a1b9a',
        def: '$\\text{MARKED PRICE (MP)} =$ price displayed on the item (also called list price).\n$\\text{DISCOUNT} =$ reduction on MP. Discount% is always on MP.\n$\\text{SP} = \\text{MP} - \\text{Discount} = \\text{MP} \\times (1 - \\frac{\\text{Discount}\\%}{100})$.\nProfit/Loss is calculated on CP, not MP.',
        example: '$\\text{MP} = ₹1,000$. $\\text{Discount} = 20\\%$. $\\text{Discount amount} = 1000 \\times \\frac{20}{100} = ₹200$. $\\text{SP} = 800$.\nIf $\\text{CP} = ₹600$: $\\text{Profit} = 800 - 600 = ₹200$. $\\text{Profit}\\% = (\\frac{200}{600}) \\times 100 = 33.3\\%$.',
        realWorld: 'Festive season sales offer 30–70% discount off MRP. "Flat 40% off" means discount% = 40 on MP.',
    },
    {
        name: 'Sales Tax / GST',
        icon: '🏛️',
        color: '#b71c1c',
        def: 'SALES TAX (or GST) is a percentage added to the SP by the government.\n$\\text{Amount paid} = \\text{SP} + \\text{Tax} = \\text{SP} \\times (1 + \\frac{\\text{Tax}\\%}{100})$.\nIn the GST system, tax is split into CGST + SGST (each half of total GST).',
        example: 'Shirt $\\text{SP} = ₹800$. $\\text{GST} = 12\\%$.\n$\\text{GST amount} = 800 \\times \\frac{12}{100} = ₹96$.\n$\\text{Total price paid} = 800 + 96 = ₹896$.',
        realWorld: 'Your restaurant bill includes 5% GST on food. Mobiles attract 18% GST. Essential food items: 0% GST.',
    },
    {
        name: 'Simple Interest (SI)',
        icon: '📈',
        color: '#e65100',
        def: 'Simple Interest is earned (or paid) on the ORIGINAL principal every period at a fixed rate.\n$\\text{SI} = \\frac{\\text{P} \\times \\text{R} \\times \\text{T}}{100}$\n$\\text{Amount} = \\text{P} + \\text{SI}$\nWhere $\\text{P} = \\text{Principal}$, $\\text{R} = \\text{Rate \\% per annum}$, $\\text{T} = \\text{Time in years}$.',
        example: '$\\text{P} = ₹5,000$. $\\text{R} = 8\\%$ p.a. $\\text{T} = 3$ years.\n$\\text{SI} = \\frac{5000 \\times 8 \\times 3}{100} = ₹1,200$.\n$\\text{Amount} = 5000 + 1200 = ₹6,200$.',
        realWorld: 'Government bonds and some fixed deposits pay simple interest. SI stays the same every year.',
    },
    {
        name: 'Compound Interest (CI)',
        icon: '📊',
        color: '#0f766e',
        def: 'Compound Interest is calculated on the Principal PLUS accumulated interest each period.\n$A = P \\times (1 + \\frac{R}{100})^n$, $\\text{CI} = A - P$\nFor half-yearly: rate becomes $\\frac{R}{2}$, periods become $2n$.\nFor quarterly: rate becomes $\\frac{R}{4}$, periods become $4n$.',
        example: '$\\text{P} = ₹10,000$. $\\text{R} = 10\\%$ p.a. $\\text{T} = 2$ years (compounded annually).\n$A = 10000 \\times (1.1)^2 = 10000 \\times 1.21 = ₹12,100$.\n$\\text{CI} = 12100 - 10000 = ₹2,100$. (SI would be ₹$2,000$.)',
        realWorld: 'Bank savings accounts, mutual funds, and most loans use compound interest. "Power of compounding" makes wealth grow faster over long periods.',
    },
    {
        name: 'Percentage Change',
        icon: '🔄',
        color: '#455a64',
        def: 'Measures how much a quantity increased or decreased relative to its original value.\n$\\text{\\% Increase} = (\\frac{\\text{Increase}}{\\text{Original}}) \\times 100$\n$\\text{\\% Decrease} = (\\frac{\\text{Decrease}}{\\text{Original}}) \\times 100$\nBase is ALWAYS the original (initial/old) value.',
        example: 'Population of a town: $40,000$ in 2020, $44,000$ in 2024.\n$\\text{\\% Increase} = (\\frac{4000}{40000}) \\times 100 = 10\\%$.\nIf it had fallen to $36,000$: $\\text{\\% Decrease} = (\\frac{4000}{40000}) \\times 100 = 10\\%$.',
        realWorld: 'Inflation rate = % increase in prices. GDP growth = % increase in economy. Exam improvement = % change in marks.',
    },
];

// ─── KEY IDEAS DATA ──────────────────────────────────────────────────────────
const KEY_IDEAS = [
    {
        title: 'Percentages & Profit/Discount',
        icon: '%',
        color: '#0f4c81',
        rules: [
            {
                title: 'Converting Between %, Fractions & Decimals',
                f: '$\\text{\\%} = (\\frac{\\text{Value}}{\\text{Total}}) \\times 100  |  \\text{Fraction} \\rightarrow \\text{\\%} : \\times 100  |  \\text{\\%} \\rightarrow \\text{Decimal} : \\div 100$',
                d: 'The backbone of all percentage problems. A percentage is simply a fraction with denominator $100$. Mastering this conversion is the first step.',
                ex: '$\\frac{3}{4} = 0.75 = 75\\%$.\n$18\\% = \\frac{18}{100} = 0.18$.\n$7:20$ as a $\\% = (\\frac{7}{20}) \\times 100 = 35\\%$.',
                tip: 'To find $x\\%$ of $N$: compute $(\\frac{x}{100}) \\times N$. This one formula solves 80% of all % questions.',
            },
            {
                title: 'Percentage Increase & Decrease',
                f: '$\\text{\\% Change} = (\\frac{\\text{Change}}{\\text{Original}}) \\times 100$',
                d: 'Always divide by the ORIGINAL (old) value. A common mistake is dividing by the new value. The base is always what you started with.',
                ex: 'Price rose from ₹$200$ to ₹$250$. $\\text{Change} = 50$. $\\% \\text{ Increase} = (\\frac{50}{200}) \\times 100 = 25\\%$.\nPrice fell from ₹$250$ to ₹$200$. $\\text{Change} = 50$. $\\% \\text{ Decrease} = (\\frac{50}{250}) \\times 100 = 20\\%$.',
                tip: 'Notice: 25% increase $\\neq$ 25% decrease! The base changes, so the % is different.',
            },
            {
                title: 'Profit, Loss & their Percentages',
                f: '$\\text{Profit\\%} = (\\frac{\\text{Profit}}{\\text{CP}}) \\times 100   |   \\text{Loss\\%} = (\\frac{\\text{Loss}}{\\text{CP}}) \\times 100   |   \\text{SP} = \\text{CP} \\times (1 \\pm \\frac{\\text{\\%}}{100})$',
                d: 'Cost Price (CP) is ALWAYS the base for profit/loss percentage. Never use SP as the base. $\\text{SP} = \\text{CP} + \\text{Profit}$ or $\\text{SP} = \\text{CP} - \\text{Loss}$.',
                ex: '$\\text{CP} = ₹800$, $\\text{SP} = ₹920$. $\\text{Profit} = ₹120$. $\\text{Profit}\\% = (\\frac{120}{800}) \\times 100 = 15\\%$.\nIf $\\text{Profit}\\% = 25\\%$ and $\\text{CP} = ₹600$: $\\text{SP} = 600 \\times 1.25 = ₹750$.',
                tip: 'If profit% and loss% are equal on two transactions, there is ALWAYS a net loss overall.',
            },
            {
                title: 'Discount & Finding Actual SP',
                f: '$\\text{Discount} = \\text{MP} \\times (\\frac{\\text{D\\%}}{100})   \\text{SP} = \\text{MP} \\times (1 - \\frac{\\text{D\\%}}{100})$',
                d: 'Discount% is always on Marked Price (MP), NOT on Cost Price. This is a very common exam trap. SP you calculate is what the customer pays — profit/loss is then computed from CP.',
                ex: '$\\text{MP} = ₹2,000$. $\\text{Discount} = 15\\%$. $\\text{Discount} = 2000 \\times 0.15 = ₹300$. $\\text{SP} = ₹1,700$.\nIf $\\text{CP} = ₹1,400$: $\\text{Profit} = 1700 - 1400 = ₹300$. $\\text{Profit}\\% \\text{ on CP} = (\\frac{300}{1400}) \\times 100 = 21.4\\%$.',
                tip: '$\\text{SP} = \\text{MP} \\times (1 - \\frac{\\text{D}\\%}{100})$. Memorise this — it lets you jump straight to SP in one step.',
            },
            {
                title: 'GST and Tax',
                f: '$\\text{Payable Amount} = \\text{SP} \\times (1 + \\frac{\\text{Tax\\%}}{100})$',
                d: 'Sales tax or GST is added ON TOP of the selling price. The consumer pays $SP + GST$ amount. The shopkeeper collects the tax and remits it to the government.',
                ex: 'Laptop $\\text{SP} = ₹50,000$. $\\text{GST} = 18\\%$.\n$\\text{GST amount} = 50,000 \\times 0.18 = ₹9,000$.\nCustomer pays $= ₹59,000$.',
                tip: 'Always check: is the price quoted inclusive or exclusive of GST? "MRP inclusive of all taxes" means GST is already included.',
            },
        ],
    },
    {
        title: 'Interest (SI & CI)',
        icon: '🏦',
        color: '#0f766e',
        rules: [
            {
                title: 'Simple Interest Formula',
                f: '$\\text{SI} = \\frac{\\text{P} \\times \\text{R} \\times \\text{T}}{100}   |   A = P + \\text{SI}$',
                d: 'In simple interest, the interest earned each year is the SAME, calculated only on the original principal $P$. $R$ is rate per annum, $T$ is time in years.',
                ex: '$\\text{P} = ₹8,000, \\text{R} = 5\\%, \\text{T} = 4 \\text{ years}$.\n$\\text{SI} = \\frac{8000 \\times 5 \\times 4}{100} = ₹1,600$.\n$\\text{Amount} = 8000 + 1600 = ₹9,600$.',
                tip: 'Finding P: $P = \\frac{\\text{SI} \\times 100}{R \\times T}$. Finding R: $R = \\frac{\\text{SI} \\times 100}{P \\times T}$. Finding T: $T = \\frac{\\text{SI} \\times 100}{P \\times R}$.',
            },
            {
                title: 'Deducing the CI Formula',
                f: '$A = P(1 + \\frac{R}{100})^n   |   \\text{CI} = A - P$',
                d: 'Each year, interest is added to the principal, forming a new principal. After $n$ years: $A = P \\times (1 + \\frac{R}{100})^n$. This is derived by applying SI repeatedly — Year 1 principal becomes ₹$P(1 + \\frac{R}{100})$, Year 2 becomes that $\\times (1 + \\frac{R}{100})$, and so on.',
                ex: 'Deduction: Start $P$. After year 1: $A_1 = P + \\frac{PR}{100} = P(1 + \\frac{R}{100})$.\nAfter year 2: $A_2 = A_1(1 + \\frac{R}{100}) = P(1 + \\frac{R}{100})^2$.\nAfter $n$ years: $A_n = P(1 + \\frac{R}{100})^n$.',
                tip: 'Think of $(1 + \\frac{R}{100})$ as a multiplier. Each year you multiply by this factor.',
            },
            {
                title: 'CI for Half-Yearly & Quarterly',
                f: '$\\text{Half-yearly: Rate} = \\frac{R}{2}, n = 2T   |   \\text{Quarterly: Rate} = \\frac{R}{4}, n = 4T$',
                d: 'When interest is compounded more frequently, the effective rate per period decreases but the number of periods increases. This gives the bank (or you) MORE effective return than annual compounding.',
                ex: '$\\text{P} = ₹10,000$. $\\text{R} = 12\\%$ p.a. $\\text{T} = 1 \\text{ year}$, compounded half-yearly.\nRate per period $= 6\\%$. Periods $= 2$.\n$A = 10000 \\times (1.06)^2 = 10000 \\times 1.1236 = ₹11,236$.\n$\\text{CI} = ₹1,236$. (Annual CI would be ₹$1,200$.)',
                tip: 'Half-yearly compounding always gives more CI than annual for the same rate and period.',
            },
            {
                title: 'Comparing CI and SI',
                f: '$\\text{For } n=1: \\text{CI} = \\text{SI}.  \\text{ For } n=2: \\text{CI} - \\text{SI} = P \\times (\\frac{R}{100})^2.  \\text{ For } n>1: \\text{CI} > \\text{SI} \\text{ always}.$',
                d: 'For the same $P, R, \\text{ and } T$: the difference between CI and SI grows with time. For $2$ years, the extra $\\text{CI} = P \\times (\\frac{R}{100})^2$. This is a frequently tested NCERT result.',
                ex: '$\\text{P} = ₹5,000$. $\\text{R} = 10\\%$. $\\text{T} = 2 \\text{ years}$.\n$\\text{SI} = \\frac{5000 \\times 10 \\times 2}{100} = ₹1,000$.\n$\\text{CI} = 5000 \\times (1.1)^2 - 5000 = 6050 - 5000 = ₹1,050$.\n$\\text{Extra CI} = \\text{CI} - \\text{SI} = ₹50 = 5000 \\times (0.10)^2 = ₹50 \\checkmark$',
                tip: 'The extra CI is always $P \\times (\\frac{R}{100})^2$ for 2 years. Use this as a shortcut check.',
            },
            {
                title: 'CI Applications (Depreciation & Growth)',
                f: '$\\text{Growth: } A = P(1 + \\frac{R}{100})^n   |   \\text{Depreciation: } A = P(1 - \\frac{R}{100})^n$',
                d: 'Compound interest formula applies to ANY quantity that grows or decays by a fixed % each period — population growth, bacteria, radioactive decay, vehicle depreciation, and more.',
                ex: 'A car worth ₹$6,00,000$ depreciates at $15\\%$ per year for $2$ years.\n$A = 600000 \\times (1 - 0.15)^2 = 600000 \\times 0.85^2 = 600000 \\times 0.7225 = ₹4,33,500$.',
                tip: 'Depreciation uses $(1 - \\frac{R}{100})$ instead of $(1 + \\frac{R}{100})$. Value decreases each period.',
            },
        ],
    },
];

// ─── QUIZ (Test Prep) ────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    { q: 'Profit% is always calculated on:', opts: ['Selling Price', 'Marked Price', 'Cost Price', 'Discount'], ans: 2, exp: '$\\text{Profit}\\% = (\\frac{\\text{Profit}}{\\text{CP}}) \\times 100$. CP is the base for all profit/loss percentage calculations.' },
    { q: 'Discount% is always calculated on:', opts: ['Cost Price', 'Marked Price', 'Selling Price', 'Amount Paid'], ans: 1, exp: 'Discount is always a percentage of the Marked Price (MP). $\\text{SP} = \\text{MP} - \\text{Discount}$.' },
    { q: 'SI formula: $\\text{SI} = \\frac{\\text{P} \\times \\text{R} \\times \\text{T}}{100}$. If $\\text{P} = ₹2000, \\text{R} = 5\\%, \\text{T} = 3 \\text{ years}$, find SI.', opts: ['$₹200$', '$₹250$', '$₹300$', '$₹350$'], ans: 2, exp: '$\\text{SI} = \\frac{2000 \\times 5 \\times 3}{100} = \\frac{30000}{100} = ₹300$.' },
    { q: 'For $2 \\text{ years}$, CI is always ______ than SI for same P, R:', opts: ['Equal to', 'Less than', 'Greater than', 'Cannot compare'], ans: 2, exp: 'CI > SI for $n > 1$ because CI is "interest on interest". For $n = 1$, CI = SI.' },
    { q: '$\\text{A} = \\text{P}(1 + \\frac{\\text{R}}{100})^n$ is the formula for:', opts: ['Simple Interest amount', 'Compound Interest amount', 'Profit', 'Discount amount'], ans: 1, exp: '$\\text{A} = \\text{P}(1 + \\frac{\\text{R}}{100})^n$ gives the Amount after $n \\text{ years}$ under compound interest. $\\text{CI} = A - P$.' },
    { q: 'For half-yearly compounding, if annual rate $= 10\\%$, the rate used per period is:', opts: ['$10\\%$', '$5\\%$', '$2.5\\%$', '$20\\%$'], ans: 1, exp: 'For half-yearly compounding, divide the annual rate by $2$. So $10\\%/2 = 5\\%$ per half-year.' },
    { q: 'If cost price $= ₹500$ and loss $= 10\\%$, what is the selling price?', opts: ['$₹400$', '$₹450$', '$₹550$', '$₹480$'], ans: 1, exp: '$\\text{SP} = \\text{CP} \\times (1 - \\frac{\\text{Loss}\\%}{100}) = 500 \\times (1 - 0.10) = 500 \\times 0.9 = ₹450$.' },
    { q: 'The % change formula uses which value as the base?', opts: ['New value', 'Average of old and new', 'Old (original) value', 'Difference between values'], ans: 2, exp: '$\\text{\\% Change} = (\\frac{\\text{Change}}{\\text{Original}}) \\times 100$. The base is ALWAYS the original (old) value.' },
    { q: 'GST is added on top of the:', opts: ['Cost Price', 'Marked Price', 'Selling Price', 'Profit'], ans: 2, exp: 'GST is levied on the Selling Price. $\\text{Amount payable} = \\text{SP} + \\text{GST} = \\text{SP} \\times (1 + \\frac{\\text{GST}\\%}{100})$.' },
    { q: '$\\text{CI} - \\text{SI for } 2 \\text{ years} = ?$', opts: ['$P \\times (\\frac{R}{100})^2$', '$P \\times \\frac{R}{100}$', '$2 \\times \\text{SI}$', '$P \\times \\frac{2R}{100}$'], ans: 0, exp: 'For $2$ years: $\\text{CI} - \\text{SI} = P \\times (\\frac{R}{100})^2$. This is a standard NCERT result worth memorising.' },
];

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function QuizEngine({ onBack }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = QUIZ_QUESTIONS[current];
    const color = '#0f4c81';
    const progress = ((current + (finished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.ans) setScore((s) => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= QUIZ_QUESTIONS.length) setFinished(true);
        else { setCurrent((c) => c + 1); setSelected(null); setAnswered(false); }
    };

    if (finished) {
        const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Review & Retry!';
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '8px solid #fff'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>out of {QUIZ_QUESTIONS.length}</div>
                    </div>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px' }}>
                    {pct >= 75 ? 'Great understanding of comparing quantities vocabulary!' : 'Review the terms and try again for a higher score.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="cq-btn-primary" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}>
                        Try Again
                    </button>
                    <button className="cq-btn-secondary" onClick={onBack}>Return to Terminology</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cq-quiz-container">
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Vocabulary Quiz</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color }}>{current + 1}</span> / {QUIZ_QUESTIONS.length}</div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${color}, #1565c0)`, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            <div className="cq-quiz-card">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                    QUESTION {current + 1}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 24 }}>
                    <LatexText text={q.q} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                    {q.opts.map((opt, oi) => {
                        let borderColor = 'rgba(0,0,0,0.04)', bgColor = '#fff', textColor = '#0f172a', dotColor = '#f1f5f9';
                        if (answered) {
                            if (oi === q.ans) { borderColor = '#059669'; bgColor = 'rgba(5,150,105,0.05)'; textColor = '#059669'; dotColor = '#059669'; }
                            else if (oi === selected) { borderColor = '#ef4444'; bgColor = 'rgba(239,68,68,0.05)'; textColor = '#ef4444'; dotColor = '#ef4444'; }
                        } else if (selected === oi) { borderColor = color; bgColor = `${color}05`; dotColor = color; }
                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${borderColor}`, background: bgColor, cursor: answered ? 'default' : 'pointer', fontSize: 15, color: textColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                                <LatexText text={opt} />
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(15,76,129,0.05)', border: '1px solid rgba(15,76,129,0.15)', fontSize: 13.5, lineHeight: 1.6, color: '#475569' }}>
                        <strong style={{ color }}>💡 Explanation: </strong><LatexText text={q.exp} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleNext} disabled={!answered} className="cq-btn-primary"
                    style={{ padding: '12px 40px', opacity: answered ? 1 : 0.4, cursor: answered ? 'pointer' : 'not-allowed' }}>
                    {current + 1 >= QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ComparingQuantitiesTerminology() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('terms');
    const [activeTerm, setActiveTerm] = useState(0);
    const [activeIdea, setActiveIdea] = useState(0);
    const [activeRule, setActiveRule] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const TABS = [
        { id: 'terms', label: 'Key Terms', icon: '📚' },
        { id: 'ideas', label: 'Key Ideas', icon: '💡' },
        { id: 'quiz', label: 'Test Prep', icon: '✅' },
    ];

    return (
        <div className="cq-page">
            {/* ── TOP NAV ─────────────────────────────────── */}
            <nav className="cq-nav">
                <button className="cq-nav-back" onClick={() => navigate('/senior/grade/8/comparing-quantities')}>
                    ← Back to Comparing Quantities
                </button>
                <div className="cq-nav-links">
                    <button className="cq-nav-link" onClick={() => navigate('/senior/grade/8/comparing-quantities/introduction')}>🌟 Introduction</button>
                    <button className="cq-nav-link cq-nav-link--active">📖 Terminology</button>
                    <button className="cq-nav-link" onClick={() => navigate('/senior/grade/8/comparing-quantities/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── HEADER ──────────────────────────────────── */}
            <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                    Comparing Quantities{' '}
                    <span style={{ background: 'linear-gradient(90deg,#0f4c81,#6a1b9a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Vocabulary</span>
                </h1>
            </div>

            {/* ── TABS ────────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', padding: '0 12px 12px' }}>
                {TABS.map((t) => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`cq-tab${tab === t.id ? ' active' : ''}`}>
                        <span>{t.icon}</span> {t.label}
                    </button>
                ))}
            </div>

            {/* ── TAB: KEY TERMS ──────────────────────────── */}
            {tab === 'terms' && (
                <div className="cq-section">
                    <div className="cq-learn-grid">
                        <aside className="cq-learn-sidebar">
                            {TERMS.map((t, i) => (
                                <button key={i} onClick={() => setActiveTerm(i)}
                                    className={`cq-sidebar-btn${activeTerm === i ? ' active' : ''}`}
                                    style={{ '--skill-color': t.color }}>
                                    <div className="cq-sidebar-btn-icon">{t.icon}</div>
                                    <span className="cq-sidebar-btn-title">{t.name}</span>
                                </button>
                            ))}
                        </aside>

                        <main key={activeTerm} className="cq-details-window cq-details-window-anim" style={{ border: `2px solid ${TERMS[activeTerm].color}15` }}>
                            <div className="cq-learn-header-row">
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 900, color: TERMS[activeTerm].color }}>{TERMS[activeTerm].name}</h3>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>TERM {activeTerm + 1} OF {TERMS.length}</div>
                                </div>
                                <div style={{ fontSize: 36 }}>{TERMS[activeTerm].icon}</div>
                            </div>

                            <div style={{ background: `${TERMS[activeTerm].color}05`, padding: 24, borderRadius: 16, border: `2px solid ${TERMS[activeTerm].color}15`, marginBottom: 24 }}>
                                <div style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: '#0f172a', whiteSpace: 'pre-line' }}>
                                    <LatexText text={TERMS[activeTerm].def} />
                                </div>
                            </div>

                            <div className="cq-rule-split">
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Example</h4>
                                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0f172a', whiteSpace: 'pre-line' }}>
                                            <LatexText text={TERMS[activeTerm].example} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: TERMS[activeTerm].color, marginBottom: 10 }}>Real World</h4>
                                    <div style={{ background: `${TERMS[activeTerm].color}05`, padding: 20, borderRadius: 16, border: `2px solid ${TERMS[activeTerm].color}15` }}>
                                        <div style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0f172a' }}>
                                            <LatexText text={TERMS[activeTerm].realWorld} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cq-learn-footer">
                                <button className="cq-btn-primary" onClick={() => setTab('quiz')}>Ready for the Quiz? →</button>
                                <button className="cq-btn-secondary" onClick={() => setActiveTerm((activeTerm + 1) % TERMS.length)}>
                                    Next: {TERMS[(activeTerm + 1) % TERMS.length].name}
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            {/* ── TAB: KEY IDEAS ──────────────────────────── */}
            {tab === 'ideas' && (
                <div className="cq-section">
                    <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                        {KEY_IDEAS.map((idea, idx) => (
                            <button key={idx} onClick={() => { setActiveIdea(idx); setActiveRule(0); }}
                                style={{ padding: '12px 24px', borderRadius: 50, border: '2px solid', borderColor: activeIdea === idx ? idea.color : '#e2e8f0', background: activeIdea === idx ? idea.color : '#fff', color: activeIdea === idx ? '#fff' : '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Open Sans, sans-serif' }}>
                                <span>{idea.icon}</span> {idea.title}
                            </button>
                        ))}
                    </div>

                    <div className="cq-learn-grid">
                        <aside className="cq-learn-sidebar">
                            {KEY_IDEAS[activeIdea].rules.map((rule, ri) => (
                                <button key={ri} onClick={() => setActiveRule(ri)}
                                    className={`cq-sidebar-btn${activeRule === ri ? ' active' : ''}`}
                                    style={{ '--skill-color': KEY_IDEAS[activeIdea].color }}>
                                    <div className="cq-sidebar-btn-num">{ri + 1}</div>
                                    <span className="cq-sidebar-btn-title">{rule.title}</span>
                                </button>
                            ))}
                        </aside>

                        <main key={`${activeIdea}-${activeRule}`} className="cq-details-window cq-details-window-anim" style={{ border: `2px solid ${KEY_IDEAS[activeIdea].color}15` }}>
                            <div className="cq-learn-header-row">
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: KEY_IDEAS[activeIdea].color }}>{KEY_IDEAS[activeIdea].rules[activeRule].title}</h3>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {activeRule + 1} OF {KEY_IDEAS[activeIdea].rules.length}</div>
                                </div>
                                <div style={{ fontSize: 32 }}>{KEY_IDEAS[activeIdea].icon}</div>
                            </div>

                            <div style={{ background: `${KEY_IDEAS[activeIdea].color}05`, padding: 24, borderRadius: 20, border: `2px solid ${KEY_IDEAS[activeIdea].color}15`, marginBottom: 28, textAlign: 'center' }}>
                                <div style={{ fontSize: 19, fontWeight: 800, color: KEY_IDEAS[activeIdea].color, letterSpacing: 0.5 }}>
                                    <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].f} />
                                </div>
                            </div>

                            <div className="cq-rule-split">
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                    <div style={{ fontSize: 15, lineHeight: 1.7, color: '#0f172a', margin: 0 }}>
                                        <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].d} />
                                    </div>
                                    <div style={{ marginTop: 20, background: 'rgba(15,76,129,0.05)', padding: 16, borderRadius: 14, border: '1px solid rgba(15,76,129,0.1)' }}>
                                        <div style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                                            <span style={{ fontWeight: 800, color: '#0f4c81' }}>🛡️ Key Tip: </span>
                                            <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].tip} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: KEY_IDEAS[activeIdea].color, marginBottom: 10 }}>Practical Example</h4>
                                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#0f172a', whiteSpace: 'pre-line' }}>
                                            <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].ex} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cq-learn-footer">
                                <button className="cq-btn-primary" onClick={() => setTab('quiz')}>Test your Knowledge →</button>
                                <button className="cq-btn-secondary" onClick={() => setActiveRule((activeRule + 1) % KEY_IDEAS[activeIdea].rules.length)}>
                                    Next: {KEY_IDEAS[activeIdea].rules[(activeRule + 1) % KEY_IDEAS[activeIdea].rules.length].title}
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            {/* ── TAB: QUIZ ───────────────────────────────── */}
            {tab === 'quiz' && (
                <div className="cq-section">
                    <QuizEngine onBack={() => setTab('terms')} />
                </div>
            )}
        </div>
    );
}
