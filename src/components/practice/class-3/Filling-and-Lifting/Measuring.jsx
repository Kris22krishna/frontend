import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💧 Spot on! Excellent! 💧"
];

// ─── Helpers ────────────────────────────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ─── SVG Vessel Drawings ─────────────────────────────────────────────────────
const VesselSVG = ({ type, fillRatio = 1, color = '#60A5FA', label, size = 80 }) => {
    const vessels = {
        bottle: (
            <svg width={size} height={size * 1.5} viewBox="0 0 60 90">
                <rect x="20" y="5" width="20" height="12" rx="3" fill="#94A3B8" />
                <path d="M15 17 Q10 25 10 35 L10 80 Q10 85 15 85 L45 85 Q50 85 50 80 L50 35 Q50 25 45 17 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                <clipPath id={`bclip-${label}`}>
                    <rect x="10" y={85 - (85 - 35) * fillRatio} width="40" height={(85 - 35) * fillRatio} />
                </clipPath>
                <path d="M15 17 Q10 25 10 35 L10 80 Q10 85 15 85 L45 85 Q50 85 50 80 L50 35 Q50 25 45 17 Z" fill={color} clipPath={`url(#bclip-${label})`} opacity="0.75" />
                <text x="30" y="95" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">{label}</text>
            </svg>
        ),
        glass: (
            <svg width={size} height={size * 1.2} viewBox="0 0 60 72">
                <path d="M12 10 L14 62 Q14 68 20 68 L40 68 Q46 68 46 62 L48 10 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                <clipPath id={`gclip-${label}`}>
                    <rect x="12" y={10 + (52) * (1 - fillRatio)} width="36" height={52 * fillRatio} />
                </clipPath>
                <path d="M12 10 L14 62 Q14 68 20 68 L40 68 Q46 68 46 62 L48 10 Z" fill={color} clipPath={`url(#gclip-${label})`} opacity="0.75" />
                <text x="30" y="78" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">{label}</text>
            </svg>
        ),
        mug: (
            <svg width={size} height={size * 1.2} viewBox="0 0 70 72">
                <rect x="10" y="10" width="40" height="55" rx="5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                <path d="M50 20 Q65 20 65 32 Q65 44 50 44" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
                <clipPath id={`mclip-${label}`}>
                    <rect x="10" y={65 - 55 * fillRatio} width="40" height={55 * fillRatio} />
                </clipPath>
                <rect x="10" y="10" width="40" height="55" rx="5" fill={color} clipPath={`url(#mclip-${label})`} opacity="0.75" />
                <text x="30" y="78" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">{label}</text>
            </svg>
        ),
        bowl: (
            <svg width={size} height={size} viewBox="0 0 70 60">
                <path d="M5 20 Q5 55 35 55 Q65 55 65 20 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                <clipPath id={`bowlclip-${label}`}>
                    <rect x="5" y={55 - 35 * fillRatio} width="60" height={35 * fillRatio} />
                </clipPath>
                <path d="M5 20 Q5 55 35 55 Q65 55 65 20 Z" fill={color} clipPath={`url(#bowlclip-${label})`} opacity="0.75" />
                <text x="35" y="64" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">{label}</text>
            </svg>
        ),
        bucket: (
            <svg width={size} height={size * 1.2} viewBox="0 0 70 84">
                <path d="M10 15 L15 70 Q15 78 35 78 Q55 78 55 70 L60 15 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                <path d="M10 15 Q35 5 60 15" fill="none" stroke="#94A3B8" strokeWidth="3" />
                <clipPath id={`buclip-${label}`}>
                    <rect x="10" y={78 - 63 * fillRatio} width="50" height={63 * fillRatio} />
                </clipPath>
                <path d="M10 15 L15 70 Q15 78 35 78 Q55 78 55 70 L60 15 Z" fill={color} clipPath={`url(#buclip-${label})`} opacity="0.75" />
                <text x="35" y="88" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">{label}</text>
            </svg>
        ),
        jug: (
            <svg width={size} height={size * 1.4} viewBox="0 0 70 98">
                <path d="M15 12 L12 80 Q12 88 35 88 Q58 88 58 80 L55 12 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                <path d="M55 22 Q70 22 70 38 Q70 54 55 54" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
                <path d="M35 12 Q20 6 15 12" fill="none" stroke="#94A3B8" strokeWidth="2" />
                <clipPath id={`jclip-${label}`}>
                    <rect x="12" y={88 - 76 * fillRatio} width="46" height={76 * fillRatio} />
                </clipPath>
                <path d="M15 12 L12 80 Q12 88 35 88 Q58 88 58 80 L55 12 Z" fill={color} clipPath={`url(#jclip-${label})`} opacity="0.75" />
                <text x="35" y="97" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">{label}</text>
            </svg>
        ),
    };
    return vessels[type] || vessels.glass;
};

// ─── Question Generators ──────────────────────────────────────────────────────

const VESSEL_COLORS = {
    Nita: '#F472B6', Monu: '#60A5FA', Ritu: '#34D399', Priya: '#FB923C',
    Arjun: '#A78BFA', Deepa: '#FACC15', Raj: '#4ADE80', Meena: '#F87171',
};
const NAMES = Object.keys(VESSEL_COLORS);
const VESSEL_TYPES = ['bottle', 'glass', 'mug', 'bowl', 'bucket', 'jug'];

// Q-TYPE 1: Who holds the MOST / LEAST liquid?
const genMostLeast = () => {
    const names = shuffle(NAMES).slice(0, 3);
    const amounts = shuffle([1, 0.5, 0.25]); // litre amounts
    const data = names.map((n, i) => ({ name: n, amt: amounts[i] }));
    const isMax = Math.random() > 0.5;
    const sorted = [...data].sort((a, b) => isMax ? b.amt - a.amt : a.amt - b.amt);
    const correctName = sorted[0].name;
    const vesselType = pick(VESSEL_TYPES);
    const amtLabel = (a) => a === 1 ? '1 litre' : a === 0.5 ? '½ litre' : '¼ litre';

    const visual = `
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end;margin:12px 0">
            ${data.map(d => `
                <div style="text-align:center">
                    <div style="font-size:11px;font-weight:700;color:#475569;margin-bottom:4px">${amtLabel(d.amt)}</div>
                </div>
            `).join('')}
        </div>
    `;
    const questionText = `
        <div style="text-align:center">
            <p style="font-weight:700;font-size:17px;color:#1E3A8A;margin-bottom:10px">
                ${data.map(d => `<strong>${d.name}</strong>'s ${vesselType} holds <strong>${amtLabel(d.amt)}</strong>`).join(' &nbsp;|&nbsp; ')}
            </p>
            <p style="font-size:16px;color:#374151;margin-top:8px">
                Who holds <strong style="color:${isMax ? '#16A34A' : '#DC2626'}">${isMax ? 'the most' : 'the least'}</strong> liquid?
            </p>
        </div>
    `;
    const options = shuffle([...new Set(names)]);
    const explanation = `${correctName}'s ${vesselType} holds <strong>${amtLabel(data.find(d => d.name === correctName).amt)}</strong>, which is ${isMax ? 'the greatest' : 'the smallest'} amount.`;
    return { questionText, correctAnswer: correctName, options, explanation };
};

// Q-TYPE 2: More than / Less than / Exactly 1 litre?
const genMoreLessExactly = () => {
    const vessels = [
        { name: 'glass', fills: 0.25, label: 'a glass' },
        { name: 'mug', fills: 0.5, label: 'a mug' },
        { name: 'jug', fills: 1, label: 'a jug' },
        { name: 'bucket', fills: 4, label: 'a bucket' },
        { name: 'bowl', fills: 0.25, label: 'a small bowl' },
        { name: 'bottle', fills: 0.75, label: 'a bottle' },
    ];
    const v = pick(vessels);
    const opts = ['more than 1 litre', 'less than 1 litre', 'exactly 1 litre'];
    let correctAnswer;
    if (v.fills > 1) correctAnswer = 'more than 1 litre';
    else if (v.fills < 1) correctAnswer = 'less than 1 litre';
    else correctAnswer = 'exactly 1 litre';
    const options = shuffle(opts);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:17px;font-weight:700;color:#1E3A8A;margin-bottom:8px">
                How much water does <strong>${v.label}</strong> hold?
            </p>
            <p style="font-size:13px;color:#64748B">(Think about a standard 1 litre bottle!)</p>
        </div>
    `;
    const explanation = `A ${v.label.replace('a ', '')} holds approximately <strong>${v.fills} litre${v.fills !== 1 ? 's' : ''}</strong>, so the answer is <strong>${correctAnswer}</strong>.`;
    return { questionText, correctAnswer, options, explanation };
};

// Q-TYPE 3: Fill-in with 'more' or 'less'
const genMoreLessComparison = () => {
    const names = shuffle(NAMES).slice(0, 3);
    const amounts = (() => {
        const a = [randomInt(1, 8), randomInt(1, 8), randomInt(1, 8)];
        while (a[0] === a[1] || a[1] === a[2] || a[0] === a[2]) {
            a[0] = randomInt(1, 8); a[1] = randomInt(1, 8); a[2] = randomInt(1, 8);
        }
        return a;
    })();
    const unit = pick(['glasses', 'cups', 'mugs', 'bowls']);
    const pairs = [
        { a: names[0], b: names[1], aAmt: amounts[0], bAmt: amounts[1] },
        { a: names[1], b: names[0], aAmt: amounts[1], bAmt: amounts[0] },
        { a: names[2], b: names[0], aAmt: amounts[2], bAmt: amounts[0] },
    ];
    const chosen = pick(pairs);
    const correct = chosen.aAmt > chosen.bAmt ? 'more' : 'less';
    const options = shuffle(['more', 'less', 'same', 'equal']);
    const questionText = `
        <div style="text-align:center">
            <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:10px">
                ${names.map((n, i) => `<span style="background:#EFF6FF;border:2px solid #BFDBFE;padding:4px 12px;border-radius:20px;font-weight:700;color:#1D4ED8">${n}: ${amounts[i]} ${unit}</span>`).join('')}
            </div>
            <p style="font-size:17px;color:#374151;margin-top:8px">
                <strong>${chosen.a}</strong>'s container holds _____ water than <strong>${chosen.b}</strong>'s container.
            </p>
        </div>
    `;
    const explanation = `<strong>${chosen.a}</strong> has ${chosen.aAmt} ${unit} and <strong>${chosen.b}</strong> has ${chosen.bAmt} ${unit}. Since ${chosen.aAmt} ${chosen.aAmt > chosen.bAmt ? '>' : '<'} ${chosen.bAmt}, the answer is <strong>${correct}</strong>.`;
    return { questionText, correctAnswer: correct, options, explanation };
};

// Q-TYPE 4: How many small glasses fill a bigger vessel?
const genFillCount = () => {
    const scenarios = [
        { small: 'glass (¼ litre)', big: 'jug (1 litre)', answer: '4', distractors: ['2', '3', '6'] },
        { small: 'glass (¼ litre)', big: 'bottle (½ litre)', answer: '2', distractors: ['3', '4', '5'] },
        { small: 'mug (½ litre)', big: 'bucket (2 litres)', answer: '4', distractors: ['2', '3', '6'] },
        { small: 'cup (¼ litre)', big: 'mug (½ litre)', answer: '2', distractors: ['3', '4', '1'] },
        { small: 'bottle (1 litre)', big: 'bucket (5 litres)', answer: '5', distractors: ['3', '4', '6'] },
        { small: 'mug (½ litre)', big: 'jug (1 litre)', answer: '2', distractors: ['3', '4', '5'] },
        { small: 'glass (¼ litre)', big: 'big bottle (2 litres)', answer: '8', distractors: ['4', '6', '10'] },
    ];
    const s = pick(scenarios);
    const options = shuffle([s.answer, ...s.distractors.slice(0, 3)]);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:17px;font-weight:700;color:#1E3A8A;margin-bottom:6px">
                How many <strong>${s.small}</strong> glasses are needed to fill a <strong>${s.big}</strong>?
            </p>
            <p style="font-size:13px;color:#64748B">Think and choose the right answer!</p>
        </div>
    `;
    const explanation = `Divide the capacity of the big vessel by the small one. The answer is <strong>${s.answer}</strong>.`;
    return { questionText, correctAnswer: s.answer, options, explanation };
};

// Q-TYPE 5: Which holds MORE between two vessels?
const genWhichHoldsMore = () => {
    const pairs = [
        { a: 'bucket', b: 'mug', aFill: 0.8, bFill: 0.5, aLabel: 'Bucket', bLabel: 'Mug', correct: 'Bucket' },
        { a: 'bottle', b: 'glass', aFill: 1, bFill: 0.25, aLabel: 'Bottle', bLabel: 'Glass', correct: 'Bottle' },
        { a: 'jug', b: 'bowl', aFill: 0.9, bFill: 0.4, aLabel: 'Jug', bLabel: 'Bowl', correct: 'Jug' },
        { a: 'mug', b: 'glass', aFill: 0.5, bFill: 0.25, aLabel: 'Mug', bLabel: 'Glass', correct: 'Mug' },
        { a: 'bucket', b: 'jug', aFill: 1, bFill: 0.7, aLabel: 'Bucket', bLabel: 'Jug', correct: 'Bucket' },
    ];
    const p = pick(pairs);
    const colors = shuffle(['#60A5FA', '#F472B6', '#34D399', '#FB923C']);
    const isReversed = Math.random() > 0.5;
    const correct = isReversed ? p.bLabel : p.correct;
    const options = shuffle([p.aLabel, p.bLabel, 'Both equal', 'Cannot tell']);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:17px;font-weight:700;color:#1E3A8A;margin-bottom:12px">
                Look at the vessels below. Which one holds <strong style="color:#16A34A">more</strong> water?
            </p>
            <div style="display:flex;gap:24px;justify-content:center;align-items:flex-end">
                <div style="text-align:center;font-weight:bold;color:#374151">${p.aLabel}</div>
                <div style="text-align:center;font-weight:bold;color:#374151">${p.bLabel}</div>
            </div>
            <p style="font-size:13px;color:#64748B;margin-top:6px">(A ${p.aLabel.toLowerCase()} is generally bigger than a ${p.bLabel.toLowerCase()})</p>
        </div>
    `;
    const explanation = `A <strong>${p.correct.toLowerCase()}</strong> holds more liquid than a ${p.correct === p.aLabel ? p.bLabel.toLowerCase() : p.aLabel.toLowerCase()}.`;
    return { questionText, correctAnswer: p.correct, options, explanation };
};

// Q-TYPE 6: Total litres calculation
const genTotalLitres = () => {
    const items = [
        { n: randomInt(1, 4), unit: 1, label: 'full 1-litre bottles' },
        { n: randomInt(1, 6), unit: 0.5, label: 'half-litre glasses' },
        { n: randomInt(1, 8), unit: 0.25, label: 'quarter-litre cups' },
    ];
    const chosen = pick(items);
    const total = chosen.n * chosen.unit;
    const distractors = shuffle([total + 0.5, total - 0.25, total * 2, chosen.n].filter(d => d !== total && d > 0)).slice(0, 3);
    const options = shuffle([String(total), ...distractors.map(String)]);
    const correctAnswer = String(total);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:17px;font-weight:700;color:#1E3A8A;margin-bottom:8px">
                Priya fills <strong>${chosen.n}</strong> ${chosen.label}. <br/>
                How many litres of water does she have in total?
            </p>
            <div style="font-size:28px;margin:8px">${Array(chosen.n).fill('💧').join(' ')}</div>
        </div>
    `;
    const explanation = `${chosen.n} × ${chosen.unit} litre = <strong>${total} litre${total !== 1 ? 's' : ''}</strong>.`;
    return { questionText, correctAnswer, options, explanation };
};

// Q-TYPE 7: Ordering vessels by capacity
const genOrdering = () => {
    const sets = [
        { vessels: ['glass (¼ L)', 'mug (½ L)', 'jug (1 L)'], order: 'smallest to largest', correct: 'glass → mug → jug' },
        { vessels: ['bucket (5 L)', 'jug (1 L)', 'mug (½ L)'], order: 'largest to smallest', correct: 'bucket → jug → mug' },
        { vessels: ['cup (¼ L)', 'bottle (1 L)', 'bowl (½ L)'], order: 'smallest to largest', correct: 'cup → bowl → bottle' },
        { vessels: ['mug (½ L)', 'bucket (5 L)', 'glass (¼ L)'], order: 'smallest to largest', correct: 'glass → mug → bucket' },
    ];
    const s = pick(sets);
    const distractors = shuffle([
        s.vessels[1] + ' → ' + s.vessels[0] + ' → ' + s.vessels[2],
        s.vessels[2] + ' → ' + s.vessels[1] + ' → ' + s.vessels[0],
        s.vessels[0] + ' → ' + s.vessels[2] + ' → ' + s.vessels[1],
    ]).slice(0, 3);
    const options = shuffle([s.correct, ...distractors]);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:17px;font-weight:700;color:#1E3A8A;margin-bottom:8px">
                Arrange these vessels from <strong style="color:#7C3AED">${s.order}</strong>:
            </p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
                ${s.vessels.map(v => `<span style="background:#F3E8FF;border:2px solid #C4B5FD;padding:4px 12px;border-radius:16px;font-weight:600;color:#5B21B6">${v}</span>`).join('')}
            </div>
        </div>
    `;
    const explanation = `The correct order (${s.order}) is: <strong>${s.correct}</strong>.`;
    return { questionText, correctAnswer: s.correct, options, explanation };
};

// Q-TYPE 8: Half / Quarter / Full litre identification
const genIdentifyAmount = () => {
    const scenarios = [
        { text: 'A mug is filled halfway. It holds exactly half a litre when full. How much water is in it now?', correct: '¼ litre', distractors: ['½ litre', '1 litre', '¾ litre'] },
        { text: 'A jug is filled up to the 1-litre mark. Which of these best describes its contents?', correct: '1 litre', distractors: ['½ litre', '¼ litre', '2 litres'] },
        { text: 'You pour half of a half-litre bottle. How much is poured out?', correct: '¼ litre', distractors: ['½ litre', '1 litre', '⅛ litre'] },
        { text: 'You have 4 quarter-litre cups full of water. How much water do you have in total?', correct: '1 litre', distractors: ['½ litre', '2 litres', '¼ litre'] },
        { text: 'A bottle holds 1 litre. You drink half of it. How much is left?', correct: '½ litre', distractors: ['¼ litre', '1 litre', '¾ litre'] },
        { text: 'You have 2 half-litre glasses. How much water is that in total?', correct: '1 litre', distractors: ['2 litres', '½ litre', '¼ litre'] },
    ];
    const s = pick(scenarios);
    const options = shuffle([s.correct, ...s.distractors.slice(0, 3)]);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:17px;font-weight:700;color:#1E3A8A;margin-bottom:8px;line-height:1.5">${s.text}</p>
        </div>
    `;
    const explanation = `The correct answer is <strong>${s.correct}</strong>. Think step by step about the amounts!`;
    return { questionText, correctAnswer: s.correct, options, explanation };
};

// Q-TYPE 9: Guess the vessel from clues
const genGuessVessel = () => {
    const clues = [
        { answer: 'Bucket', clues: ['I can hold more than 2 litres', 'I am used to carry water from a well', 'I am much bigger than a jug'], distractors: ['Mug', 'Glass', 'Bottle'] },
        { answer: 'Glass', clues: ['I hold about ¼ litre of water', 'You drink juice or milk from me', 'I am smaller than a mug'], distractors: ['Bucket', 'Mug', 'Jug'] },
        { answer: 'Mug', clues: ['I hold about ½ litre of water', 'I have a handle', 'I am used for hot drinks like tea'], distractors: ['Glass', 'Bucket', 'Bowl'] },
        { answer: 'Jug', clues: ['I hold exactly 1 litre', 'I have a spout to pour water', 'I am kept on dining tables'], distractors: ['Glass', 'Bucket', 'Mug'] },
        { answer: 'Bowl', clues: ['I am wide and shallow', 'I can hold about ¼ to ½ litre', 'Food is served in me'], distractors: ['Jug', 'Bucket', 'Bottle'] },
    ];
    const c = pick(clues);
    const pickedClues = shuffle(c.clues).slice(0, 2);
    const options = shuffle([c.answer, ...c.distractors.slice(0, 3)]);
    const questionText = `
        <div style="text-align:center">
            <p style="font-weight:700;font-size:17px;color:#1E3A8A;margin-bottom:8px">🔍 Guess the Vessel!</p>
            <ul style="text-align:left;display:inline-block;background:#F0FDF4;padding:12px 20px;border-radius:12px;border:2px solid #BBF7D0;list-style:disc;padding-left:32px">
                ${pickedClues.map(cl => `<li style="color:#166534;font-size:15px;margin:4px 0">${cl}</li>`).join('')}
            </ul>
        </div>
    `;
    const explanation = `The clues describe a <strong>${c.answer}</strong>! ${pickedClues.join(' ')}`;
    return { questionText, correctAnswer: c.answer, options, explanation };
};

// Q-TYPE 10: Real-life estimation
const genRealLife = () => {
    const scenarios = [
        { text: 'Raj wants to water 4 plants. Each plant needs a quarter litre. How many litres does he need in total?', correct: '1 litre', distractors: ['½ litre', '2 litres', '4 litres'] },
        { text: 'A recipe needs half a litre of milk. Meena has a quarter-litre cup. How many cups does she need?', correct: '2 cups', distractors: ['1 cup', '3 cups', '4 cups'] },
        { text: 'A fish tank holds 3 litres. Arjun fills it using a half-litre mug. How many mugs does he need?', correct: '6 mugs', distractors: ['3 mugs', '4 mugs', '8 mugs'] },
        { text: 'Deepa drinks 2 glasses of water (each ¼ litre) in the morning and 2 glasses in the evening. How much water does she drink in a day?', correct: '1 litre', distractors: ['½ litre', '2 litres', '¾ litre'] },
        { text: 'A school has a water tank of 5 litres. If 10 students each drink ½ litre, will the tank be enough?', correct: 'Yes, exactly enough', distractors: ['No, not enough', 'Yes, with 2½ litres to spare', 'No, double is needed'] },
        { text: 'Priya needs 2 litres of juice. She has 3 half-litre bottles. Does she have enough?', correct: 'No, she needs 1 more half-litre bottle', distractors: ['Yes, she has exactly 2 litres', 'Yes, she has more than enough', 'She needs 2 more bottles'] },
    ];
    const s = pick(scenarios);
    const options = shuffle([s.correct, ...s.distractors.slice(0, 3)]);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:17px;font-weight:700;color:#1E3A8A;margin-bottom:8px;line-height:1.5">
                🌊 ${s.text}
            </p>
        </div>
    `;
    const explanation = `The answer is <strong>${s.correct}</strong>. Work through the problem step by step!`;
    return { questionText, correctAnswer: s.correct, options, explanation };
};

// ─── Question Pool ────────────────────────────────────────────────────────────
const GENERATORS = [
    genMostLeast,
    genMoreLessExactly,
    genMoreLessComparison,
    genFillCount,
    genWhichHoldsMore,
    genTotalLitres,
    genOrdering,
    genIdentifyAmount,
    genGuessVessel,
    genRealLife,
];

// ─── Main Component ───────────────────────────────────────────────────────────
const Measuring = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 9015;
    const SKILL_NAME = "Filling and Lifting - Measuring";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    // Generate all 10 questions once on mount
    useEffect(() => {
        const gens = shuffle(GENERATORS);
        const qs = gens.map(g => {
            try { return g(); } catch { return genMoreLessExactly(); }
        });
        setQuestions(qs);
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const currentQuestion = questions[qIndex];

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isRight) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: 'Easy',
                question_text: `Measuring Q${qIndex + 1}`,
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isRight,
                solution_text: String(question.explanation || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setFeedbackMessage("");

            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(v => v === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: TOTAL_QUESTIONS,
                            correct_answers: totalCorrect,
                            timestamp: new Date().toISOString(),
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            navigate(-1);
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    {/* Empty */}
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        💧 Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>

                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'center', justifyContent: 'center', overflow: 'visible', width: '100%' }}>
                                            <span dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {currentQuestion.options.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    style={{ fontWeight: '500', fontSize: '1.2rem' }}
                                                    onClick={() => !isSubmitted && setSelectedOption(option)}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="feedback-mini correct"
                                                style={{ marginTop: '20px' }}
                                            >
                                                {feedbackMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.explanation}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                {/* Desktop Controls */}
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <StickerExit size={20} className="hidden" />
                            Exit Practice
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <X size={20} />
                        </button>

                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>

                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Measuring;
