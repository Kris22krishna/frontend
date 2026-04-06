import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../comparing_quantities.css';
import { LatexText } from '../../../../../LatexText';

import CQPracticeEngine from './Engines/CQPracticeEngine';
import CQAssessmentEngine from './Engines/CQAssessmentEngine';
import { NODE_IDS } from '@/lib/curriculumIds';

import {
    buildPercentagesPracticePool,
    buildPercentagesAssessmentPool,
    buildProfitLossPracticePool,
    buildProfitLossAssessmentPool,
    buildSimpleInterestPracticePool,
    buildSimpleInterestAssessmentPool,
    buildCompoundInterestPracticePool,
    buildCompoundInterestAssessmentPool,
} from './ComparingQuantitiesSkillsData';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'percentages',
        title: 'Percentages',
        subtitle: 'Skill 1 · Convert, Find & Change',
        icon: '%',
        color: '#0f4c81',
        desc: 'Convert between ratios and percentages, find a percentage of a value, and calculate percentage increase/decrease.',
        practicePool: buildPercentagesPracticePool,
        assessmentPool: buildPercentagesAssessmentPool,
        learn: {
            concept: 'A percentage is a ratio expressed as a fraction of 100. Mastering % conversions and % change unlocks profit/loss, interest, and data analysis.',
            rules: [
                {
                    title: 'Convert to Percentage',
                    f: '$\\frac{\\text{Value}}{\\text{Total}} \\times 100$ OR $\\text{Fraction} \\times 100$',
                    d: 'To convert any fraction or ratio to a percentage, multiply by 100. This works because % literally means "per hundred" — you are scaling the fraction to have denominator 100.',
                    ex: '$\\frac{3}{4}$ as %: $(\\frac{3}{4}) \\times 100 = 75\\%$.\n$7:20$ as %: $(\\frac{7}{20}) \\times 100 = 35\\%$.\n$0.65$ as %: $0.65 \\times 100 = 65\\%$.',
                    tip: 'Reverse: to convert % back to fraction, divide by 100. $45\\% = \\frac{45}{100} = \\frac{9}{20}$.',
                },
                {
                    title: 'Find x% of a Number',
                    f: '$x\\% \\text{ of } N = (\\frac{x}{100}) \\times N$',
                    d: 'This is the most-used percentage formula. Multiply the number by the rate expressed as a decimal. You can also scale: $10\\% \\text{ of } N = N \\div 10$, then use that to find other multiples.',
                    ex: '$15\\% \\text{ of } ₹2,400 = (\\frac{15}{100}) \\times 2400 = 0.15 \\times 2400 = ₹360$.\n$12.5\\% = \\frac{1}{8}$, so $12.5\\% \\text{ of } 800 = \\frac{800}{8} = 100$.',
                    tip: '$10\\%$ is always $\\text{base} \\div 10$. Then: $5\\% =$ half of $10\\%$; $20\\% =$ double $10\\%$; $15\\% = 10\\% + 5\\%$.',
                },
                {
                    title: 'Percentage Increase',
                    f: '$\\% \\text{ Increase} = (\\frac{\\text{Increase}}{\\text{Original}}) \\times 100$',
                    d: 'The base is ALWAYS the original (old) value. Find the increase amount first $(\\text{new} - \\text{old})$, then divide by old, then multiply by 100.',
                    ex: 'Price went from ₹500 to ₹625.\n$\\text{Increase} = 125$. $\\% \\text{ Increase} = (\\frac{125}{500}) \\times 100 = 25\\%$.',
                    tip: 'Quick: if something becomes $1.25\\times$ its original, it increased by $25\\%$.',
                },
                {
                    title: 'Percentage Decrease',
                    f: '$\\% \\text{ Decrease} = (\\frac{\\text{Decrease}}{\\text{Original}}) \\times 100$',
                    d: 'Same formula, but $\\text{decrease} = \\text{old} - \\text{new}$. Base is STILL the original. A common trap: "$20\\%$ off ₹500 then increased $20\\%$" does NOT give you back ₹500!',
                    ex: 'Value fell from ₹400 to ₹320.\n$\\text{Decrease} = 80$. $\\% \\text{ Decrease} = (\\frac{80}{400}) \\times 100 = 20\\%$.\nAfter reapplying $20\\%$ on $320$: $320 \\times 1.2 = ₹384 \\neq ₹400$.',
                    tip: 'A $20\\%$ increase followed by a $20\\%$ decrease gives a NET $4\\%$ decrease (not zero). Always recalculate on the new base.',
                },
                {
                    title: 'Finding the Original Value',
                    f: '$\\text{If } x\\% \\text{ of } N = P, \\text{ then } N = \\frac{P \\times 100}{x}$',
                    d: 'Work backwards: if you know the percentage and the result, divide the result by the percentage and multiply by 100 to find the original.',
                    ex: '$35\\% \\text{ of a number is } 70$. $\\text{Number} = \\frac{70 \\times 100}{35} = 200$.\nA price after $20\\%$ decrease is ₹600. $\\text{Original} = \\frac{600}{1-0.20} = \\frac{600}{0.8} = ₹750$.',
                    tip: 'When "after increase/decrease" is given, divide by $(1 \\pm \\text{rate}/100)$ to get back to the original.',
                },
            ],
        },
    },
    {
        id: 'profit-loss',
        title: 'Profit, Loss & Discount',
        subtitle: 'Skill 2 · Trade & Tax',
        icon: '💹',
        color: '#6a1b9a',
        desc: 'Calculate profit%, loss%, discount on marked price, GST applications, and find CP or SP when % is given.',
        practicePool: buildProfitLossPracticePool,
        assessmentPool: buildProfitLossAssessmentPool,
        learn: {
            concept: 'All trade calculations — profit, loss, discount — hinge on identifying the base: CP for profit/loss, MP for discount. GST adds tax on top of SP.',
            rules: [
                {
                    title: 'Profit and Loss %',
                    f: '$\\text{Profit}\\% = (\\frac{\\text{Profit}}{\\text{CP}}) \\times 100 \\quad | \\quad \\text{Loss}\\% = (\\frac{\\text{Loss}}{\\text{CP}}) \\times 100$',
                    d: 'CP (Cost Price) is ALWAYS the base for profit% and loss%. $\\text{Profit} = \\text{SP} - \\text{CP}$ (when $\\text{SP} > \\text{CP}$). $\\text{Loss} = \\text{CP} - \\text{SP}$ (when $\\text{SP} < \\text{CP}$).',
                    ex: 'Bought for ₹400, sold for ₹460.\n$\\text{Profit} = 60$. $\\text{Profit}\\% = (\\frac{60}{400}) \\times 100 = 15\\%$.',
                    tip: "Never use SP as the base for profit/loss %. It's a very common error. Base = CP, always.",
                },
                {
                    title: 'Finding SP from CP and %',
                    f: '$\\text{SP} = \\text{CP} \\times (1 + \\frac{\\text{Profit}\\%}{100}) \\text{ OR } \\text{SP} = \\text{CP} \\times (1 - \\frac{\\text{Loss}\\%}{100})$',
                    d: 'If you know CP and the desired profit% (or given loss%), calculate SP in one step using the multiplier. This is faster than computing profit amount first.',
                    ex: '$\\text{CP} = ₹1200, \\text{Profit}\\% = 25\\%$. $\\text{SP} = 1200 \\times 1.25 = ₹1500$.\n$\\text{CP} = ₹800, \\text{Loss}\\% = 12.5\\%$. $\\text{SP} = 800 \\times 0.875 = ₹700$.',
                    tip: 'Memorise: $25\\% \\text{ profit} \\rightarrow \\times 1.25, 20\\% \\rightarrow \\times 1.2, 33.3\\% \\rightarrow \\times \\frac{4}{3}, 50\\% \\rightarrow \\times 1.5$.',
                },
                {
                    title: 'Finding CP from SP and %',
                    f: '$\\text{CP} = \\frac{\\text{SP}}{1 + \\frac{\\text{Profit}\\%}{100}} \\text{ OR } \\text{CP} = \\frac{\\text{SP}}{1 - \\frac{\\text{Loss}\\%}{100}}$',
                    d: 'When SP and the profit/loss% are given, divide SP by the multiplier to get CP. This is the reverse of the SP formula.',
                    ex: '$\\text{SP} = ₹936, \\text{Profit}\\% = 20\\%$. $\\text{CP} = \\frac{936}{1.20} = ₹780$.\n$\\text{SP} = ₹510, \\text{Loss}\\% = 15\\%$. $\\text{CP} = \\frac{510}{0.85} = ₹600$.',
                    tip: 'Exam shortcut: Profit% given $\\rightarrow$ divide SP by $\\frac{100+P}{100}$. Loss% given $\\rightarrow$ divide by $\\frac{100-L}{100}$.',
                },
                {
                    title: 'Discount on Marked Price',
                    f: '$\\text{Discount} = \\text{MP} \\times (\\frac{\\text{D}\\%}{100}) \\quad | \\quad \\text{SP} = \\text{MP} \\times (1 - \\frac{\\text{D}\\%}{100})$',
                    d: 'Discount% is ALWAYS on Marked Price (MP), NOT on CP. SP is what the customer pays. Then if CP is also known, calculate Profit/Loss from this SP.',
                    ex: '$\\text{MP} = ₹1,500, \\text{Discount} = 20\\%$. $\\text{Discount} = 300$. $\\text{SP} = ₹1,200$.\n$\\text{CP} = ₹900, \\text{Profit} = 300, \\text{Profit}\\% = (\\frac{300}{900}) \\times 100 = 33.3\\%$.',
                    tip: 'Two-step problem: Step 1 find SP from MP and Discount%. Step 2 find Profit/Loss% from SP and CP.',
                },
                {
                    title: 'GST / Sales Tax',
                    f: '$\\text{Amount} = \\text{SP} \\times (1 + \\frac{\\text{Tax}\\%}{100})$',
                    d: 'GST is charged ON TOP of the selling price. The consumer pays SP + GST. GST rates in India: 0%, 5%, 12%, 18%, 28%. For intra-state: CGST = SGST = half of total rate.',
                    ex: 'Laptop $\\text{SP} = ₹45,000, \\text{GST} = 18\\%$.\n$\\text{GST amount} = 45000 \\times 0.18 = ₹8,100$.\nCustomer pays ₹53,100.',
                    tip: 'Reverse: if price inclusive of 18% GST = ₹11,800, then SP excluding GST = $\\frac{11800}{1.18} = ₹10,000$.',
                },
            ],
        },
    },
    {
        id: 'simple-interest',
        title: 'Simple Interest',
        subtitle: 'Skill 3 · SI Formula & Applications',
        icon: '📈',
        color: '#e65100',
        desc: 'Apply SI = PRT/100, find any unknown among P, R, T, calculate Amount, and solve real-life SI problems.',
        practicePool: buildSimpleInterestPracticePool,
        assessmentPool: buildSimpleInterestAssessmentPool,
        learn: {
            concept: 'Simple Interest is earned on the original Principal alone, giving the same interest every year. The formula SI = PRT/100 is rearrangeable to find any of the four variables.',
            rules: [
                {
                    title: 'The SI Formula',
                    f: '$\\text{SI} = \\frac{P \\times R \\times T}{100} \\quad | \\quad \\text{Amount} = P + \\text{SI}$',
                    d: 'Principal (P) = amount borrowed/invested. Rate (R) = % interest per year. Time (T) = number of years. Always check T is in years; convert months to years ($\\div 12$).',
                    ex: '$P = ₹6000, R = 5\\%, T = 3 \\text{ years}$.\n$\\text{SI} = \\frac{6000 \\times 5 \\times 3}{100} = ₹900$.\n$\\text{Amount} = 6000 + 900 = ₹6900$.',
                    tip: 'Keep units consistent. T in months? Divide by 12 before using in the formula.',
                },
                {
                    title: 'Finding Principal (P)',
                    f: '$P = \\frac{\\text{SI} \\times 100}{R \\times T}$',
                    d: 'Rearrange SI = PRT/100 to isolate P. This is used when you know the interest earned, the rate, and the time, and want to find the original deposit.',
                    ex: '$\\text{SI} = ₹1800, R = 6\\%, T = 5 \\text{ years}$.\n$P = \\frac{1800 \\times 100}{6 \\times 5} = \\frac{180000}{30} = ₹6000$.',
                    tip: 'Always cross-check by substituting P back into SI = PRT/100.',
                },
                {
                    title: 'Finding Rate (R)',
                    f: '$R = \\frac{\\text{SI} \\times 100}{P \\times T}$',
                    d: 'Rearrange to find the interest rate. This is useful when comparing two investment options to find which offers a better rate.',
                    ex: '$P = ₹5000, T = 4 \\text{ years}, \\text{SI} = ₹1200$.\n$R = \\frac{1200 \\times 100}{5000 \\times 4} = \\frac{120000}{20000} = 6\\% \\text{ p.a.}$',
                    tip: 'The answer is always in % per annum (p.a.) because P and T are in standard units.',
                },
                {
                    title: 'Finding Time (T)',
                    f: '$T = \\frac{\\text{SI} \\times 100}{P \\times R}$',
                    d: 'Rearrange to find how many years are needed. This answers questions like "how many years for ₹X to become ₹Y at R% SI?"',
                    ex: '$P = ₹8000, R = 7.5\\%, \\text{SI} = ₹3000$.\n$T = \\frac{3000 \\times 100}{8000 \\times 7.5} = \\frac{300000}{60000} = 5 \\text{ years}$.',
                    tip: 'For doubling under SI: $\\text{SI} = P$, so $T = \\frac{100}{R}$. Example: $10\\% \\text{ SI} \\rightarrow$ doubles in 10 years.',
                },
                {
                    title: 'Real-Life SI Problems',
                    f: 'SI does NOT earn interest on interest',
                    d: 'In real life, SI is used for simple lending/borrowing contexts (certain government bonds, some personal loans). Each year produces the SAME interest amount — the interest earned in year 2 equals year 1.',
                    ex: 'Bank offers $8\\% \\text{ SI}$. You invest ₹10,000 for 5 years.\n$\\text{Yearly interest} = \\frac{10000 \\times 8}{100} = ₹800$ every year.\n$\\text{Total SI after 5 years} = 800 \\times 5 = ₹4,000, \\text{Amount} = ₹14,000$.',
                    tip: 'CI grows faster than SI over time because CI earns interest on accumulated amount. SI is linear; CI is exponential.',
                },
            ],
        },
    },
    {
        id: 'compound-interest',
        title: 'Compound Interest',
        subtitle: 'Skill 4 · CI Formula & Applications',
        icon: '📊',
        color: '#0f766e',
        desc: 'Deduce and apply A = P(1 + R/100)ⁿ, solve half-yearly/quarterly compounding, compare CI vs SI, and apply to depreciation and growth.',
        practicePool: buildCompoundInterestPracticePool,
        assessmentPool: buildCompoundInterestAssessmentPool,
        learn: {
            concept: 'Compound Interest earns "interest on interest" each period. The formula A = P(1 + R/100)ⁿ is derived by applying interest year by year. CI > SI for the same P, R, T when n > 1.',
            rules: [
                {
                    title: 'Deducing the CI Formula',
                    f: 'Year by year: $A_1 = P(1+\\frac{R}{100}), A_2 = P(1+\\frac{R}{100})^2, \\dots, A_n = P(1+\\frac{R}{100})^n$',
                    d: 'After Year 1, the new principal becomes $A_1$. After Year 2, interest is charged on $A_1$, not $P$. By induction, after $n$ years, $\\text{Amount} = P \\times (1+\\frac{R}{100})^n. \\text{CI} = \\text{Amount} - P$.',
                    ex: '$P = ₹5000, R = 10\\% \\text{ annual}$.\n$A_1 = 5000 \\times 1.10 = 5500$.\n$A_2 = 5500 \\times 1.10 = 6050$.\n$\\text{CI} = 6050 - 5000 = ₹1050$. ($SI = ₹1000$)',
                    tip: 'Think of $(1+\\frac{R}{100})$ as a "growth multiplier". Each year you multiply by it.',
                },
                {
                    title: 'Half-Yearly & Quarterly Compounding',
                    f: 'Half-yearly: $r = \\frac{R}{2}, n = 2T \\quad | \\quad$ Quarterly: $r = \\frac{R}{4}, n = 4T$',
                    d: 'When compounding is more frequent, divide the annual rate by the compounding frequency and multiply the number of years accordingly. This ALWAYS gives a larger amount than annual compounding.',
                    ex: '$P = ₹10,000, R = 8\\% \\text{ p.a.}, T = 1 \\text{ year, compounded half-yearly}$.\n$\\text{Rate/period} = 4\\%, \\text{Periods} = 2$.\n$A = 10000 \\times (1.04)^2 = 10000 \\times 1.0816 = ₹10,816$.\n$\\text{CI} = ₹816. (\\text{Annual CI would be } ₹800.)$',
                    tip: 'More frequent compounding = more interest = larger amount. Quarterly > Half-yearly > Annual.',
                },
                {
                    title: 'CI vs SI for 2 Years',
                    f: '$\\text{CI} - \\text{SI} = P \\times (\\frac{R}{100})^2$',
                    d: 'A powerful shortcut: for exactly $2$ years at the same $P$ and $R$, the difference $(\\text{CI} - \\text{SI})$ equals $P \\times (\\frac{R}{100})^2$. This is derived algebraically and is frequently asked in exams.',
                    ex: '$P = ₹4000, R = 10\\%, T = 2 \\text{ years}$.\n$\\text{SI} = \\frac{4000 \\times 10 \\times 2}{100} = ₹800$.\n$\\text{CI} = 4000 \\times (1.1)^2 - 4000 = 4840 - 4000 = ₹840$.\n$\\text{CI} - \\text{SI} = 40. \\text{Check}: 4000 \\times (0.1)^2 = 40 \\checkmark$',
                    tip: 'If $\\text{CI} - \\text{SI}$ and $R$ are given, find $P = \\frac{\\text{CI} - \\text{SI}}{(\\frac{R}{100})^2}$. Useful when working backwards.',
                },
                {
                    title: 'Depreciation',
                    f: '$A = P \\times (1 - \\frac{R}{100})^n$',
                    d: 'When a quantity DECREASES by a fixed % each period (vehicles, machines, electronics), use $(1 - \\frac{R}{100})$ instead of $(1 + \\frac{R}{100})$. The value shrinks by the same % each year.',
                    ex: 'A car costs ₹5,00,000 and depreciates at $20\\%$ per year.\nAfter $2$ years: $A = 500000 \\times (0.80)^2 = 500000 \\times 0.64 = ₹3,20,000$.',
                    tip: 'Combined growth/decay: if value grows at $r_1\\%$ for $n_1$ years then decays at $r_2\\%$ for $n_2$ years, multiply the multipliers: $P \\times (1+\\frac{r_1}{100})^{n_1} \\times (1-\\frac{r_2}{100})^{n_2}$.',
                },
                {
                    title: 'Population & Growth Applications',
                    f: '$\\text{Future Pop} = P \\times (1 + \\frac{r}{100})^n$',
                    d: 'CI formula applies to any quantity growing at a fixed % per period: bacteria, investments, population, compound annual growth rate (CAGR). If the rate differs year by year, multiply each year\'s multiplier separately.',
                    ex: 'Town population: $80,000$. Growth: $5\\%$ in year 1, $4\\%$ in year 2, $3\\%$ in year 3.\n$\\text{Final} = 80000 \\times 1.05 \\times 1.04 \\times 1.03 = 80000 \\times 1.12476 \\approx 89,981$.',
                    tip: 'When the rate is the same every year, use the formula. When rates differ, multiply year-by-year.',
                },
            ],
        },
    },
];

const SKILL_NODE_IDS = {
    'percentages': NODE_IDS.g8MathComparingPercentages,
    'profit-loss': NODE_IDS.g8MathComparingProfitLoss,
    'simple-interest': NODE_IDS.g8MathComparingSimpleInterest,
    'compound-interest': NODE_IDS.g8MathComparingCompoundInterest,
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ComparingQuantitiesSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className="cq-page">
                <nav className="cq-nav">
                    <button className="cq-nav-back" onClick={goBack}>← Back to Skills</button>
                    <div className="cq-nav-links">
                        <button className="cq-nav-link" onClick={() => navigate('/senior/grade/8/comparing-quantities/introduction')}>🌟 Intro</button>
                        <button className="cq-nav-link" onClick={() => navigate('/senior/grade/8/comparing-quantities/terminology')}>📖 Terminology</button>
                        <button className="cq-nav-link cq-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="cq-lexicon-container">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="cq-learn-grid">
                                <aside className="cq-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`cq-sidebar-btn${selectedLearnIdx === ri ? ' active' : ''}`}
                                            style={{ '--skill-color': skill.color }}>
                                            <div className="cq-sidebar-btn-num">{ri + 1}</div>
                                            <span className="cq-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className="cq-details-window cq-details-window-anim" key={selectedLearnIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 28 }}>{skill.icon}</div>
                                    </div>
                                    <div style={{ background: `${skill.color}08`, padding: '18px', borderRadius: 16, border: `2px solid ${skill.color}20`, marginBottom: 22, textAlign: 'center' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: skill.color, letterSpacing: 0.5 }}>
                                            <LatexText text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>
                                    <div className="cq-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <div style={{ fontSize: 15, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].d} />
                                            </div>
                                            <div style={{ marginTop: 16, background: 'rgba(20,184,166,0.05)', padding: '12px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                <div style={{ margin: 0, fontSize: 13.5, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Tip: </span>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: skill.color, marginBottom: 8 }}>Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <button className="cq-btn-primary" onClick={() => setView('practice')} style={{ background: skill.color }}>Mastered? Try Practice →</button>
                                        <button className="cq-btn-secondary" onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto' }}>
                            <CQPracticeEngine
                                questionPool={skill.practicePool()}
                                sampleSize={20}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={SKILL_NODE_IDS[skill.id]}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto' }}>
                            <CQAssessmentEngine
                                questionPool={skill.assessmentPool()}
                                sampleSize={10}
                                title={skill.title}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={SKILL_NODE_IDS[skill.id]}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="cq-page">
            <nav className="cq-nav">
                <button className="cq-nav-back" onClick={() => navigate('/senior/grade/8/comparing-quantities')}>← Back to Comparing Quantities</button>
                <div className="cq-nav-links">
                    <button className="cq-nav-link" onClick={() => navigate('/senior/grade/8/comparing-quantities/introduction')}>🌟 Introduction</button>
                    <button className="cq-nav-link" onClick={() => navigate('/senior/grade/8/comparing-quantities/terminology')}>📖 Terminology</button>
                    <button className="cq-nav-link cq-nav-link--active">🎯 Skills</button>
                </div>
            </nav>
            <div className="cq-lexicon-container" style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Comparing Quantities <span style={{ color: '#0f766e' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Learn rules · Practice with 20 mixed questions · Take a 10-question timed assessment.</div>
                </div>
                <div className="cq-skills-list">
                    {SKILLS.map((sk, idx) => (
                        <div key={sk.id} className="cq-skill-card">
                            <div className="cq-skill-info">
                                <div className="cq-skill-icon" style={{ background: `${sk.color}15`, fontSize: 28 }}>{sk.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{sk.subtitle}</div>
                                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{sk.title}</h3>
                                    <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{sk.desc}</p>
                                </div>
                            </div>
                            <div className="cq-skill-actions">
                                <button className="cq-skill-btn-outline" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('learn'); }}>Learn</button>
                                <button className="cq-skill-btn-outline" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('practice'); }}>Practice</button>
                                <button className="cq-skill-btn-filled" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                        Completed all 4 skills? You're a <span style={{ color: '#0f4c81' }}>Comparing Quantities Champion! 🏆</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
