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
    "⚖️ Perfect balance! You got it! ⚖️",
    "🏋️ Strong answer! Well done! 🏋️",
    "🎉 Correct! You're a weight wizard! 🎉",
    "✨ Spot on! Amazing work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌟 Brilliant! Keep going! 🌟",
    "🎊 Great job! Moving on... 🎊",
    "💪 Exactly right! Excellent! 💪"
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ─── Textbook-style balance scale SVG string helper ─────────────────────────
// tiltDeg > 0 → left side down (left heavier); tiltDeg < 0 → right side down
const makeBalanceSVG = (leftLabel, rightLabel, tiltDeg) => {
    const rad = (tiltDeg * Math.PI) / 180;
    const px = 140, py = 62;
    const armLen = 88;
    const lax = px - armLen * Math.cos(rad);
    const lay = py + armLen * Math.sin(rad);
    const rax = px + armLen * Math.cos(rad);
    const ray = py - armLen * Math.sin(rad);
    const sLen = 40;
    const lpx = lax, lpy = lay + sLen;
    const rpx = rax, rpy = ray + sLen;
    const baseY = 178;
    const poleTop = py + 16;
    const poleH = baseY - 26 - poleTop;
    return [
        // === Base & Stand (orange / amber, textbook style) ===
        `<rect x="${px - 58}" y="${baseY - 15}" width="116" height="15" rx="7" fill="#F59E0B"/>`,
        `<rect x="${px - 42}" y="${baseY - 28}" width="84" height="15" rx="5" fill="#D97706"/>`,
        `<rect x="${px - 7}" y="${poleTop}" width="14" height="${poleH}" rx="4" fill="#D97706"/>`,
        // === Triangular pivot cap ===
        `<polygon points="${px},${py - 22} ${px - 24},${py + 16} ${px + 24},${py + 16}" fill="#B45309"/>`,
        // === Pivot knob ===
        `<circle cx="${px}" cy="${py}" r="9" fill="#44403C" stroke="#1C1917" stroke-width="1.5"/>`,
        `<circle cx="${px}" cy="${py}" r="3.5" fill="#D6D3D1"/>`,
        // === Beam arm ===
        `<line x1="${lax}" y1="${lay}" x2="${rax}" y2="${ray}" stroke="#1C1917" stroke-width="8" stroke-linecap="round"/>`,
        `<circle cx="${lax}" cy="${lay}" r="5.5" fill="#57534E"/>`,
        `<circle cx="${rax}" cy="${ray}" r="5.5" fill="#57534E"/>`,
        // === Left three-string chain ===
        `<line x1="${lax - 7}" y1="${lay}" x2="${lpx - 7}" y2="${lpy}" stroke="#78716C" stroke-width="2"/>`,
        `<line x1="${lax}" y1="${lay}" x2="${lpx}" y2="${lpy}" stroke="#78716C" stroke-width="2"/>`,
        `<line x1="${lax + 7}" y1="${lay}" x2="${lpx + 7}" y2="${lpy}" stroke="#78716C" stroke-width="2"/>`,
        // === Right three-string chain ===
        `<line x1="${rax - 7}" y1="${ray}" x2="${rpx - 7}" y2="${rpy}" stroke="#78716C" stroke-width="2"/>`,
        `<line x1="${rax}" y1="${ray}" x2="${rpx}" y2="${rpy}" stroke="#78716C" stroke-width="2"/>`,
        `<line x1="${rax + 7}" y1="${ray}" x2="${rpx + 7}" y2="${rpy}" stroke="#78716C" stroke-width="2"/>`,
        // === Left pan (bowl / plate) ===
        `<ellipse cx="${lpx}" cy="${lpy}" rx="38" ry="11" fill="#FECACA" stroke="#EF4444" stroke-width="2"/>`,
        `<path d="M${lpx - 38} ${lpy} Q${lpx} ${lpy + 22} ${lpx + 38} ${lpy}" fill="none" stroke="#EF4444" stroke-width="2" opacity="0.7"/>`,
        // === Right pan ===
        `<ellipse cx="${rpx}" cy="${rpy}" rx="38" ry="11" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>`,
        `<path d="M${rpx - 38} ${rpy} Q${rpx} ${rpy + 22} ${rpx + 38} ${rpy}" fill="none" stroke="#3B82F6" stroke-width="2" opacity="0.7"/>`,
        // === Labels on pans ===
        `<text x="${lpx}" y="${lpy + 5}" text-anchor="middle" font-size="13" font-weight="800" fill="#7F1D1D" font-family="Arial,sans-serif">${leftLabel}</text>`,
        `<text x="${rpx}" y="${rpy + 5}" text-anchor="middle" font-size="13" font-weight="800" fill="#1E3A8A" font-family="Arial,sans-serif">${rightLabel}</text>`,
    ].join('');
};

// ─── SVG: Object icon for weight items ──────────────────────────────────────
const OBJECT_ICONS = {
    apple: '🍎', book: '📚', brick: '🧱', bag: '🎒', cat: '🐱',
    watermelon: '🍉', feather: '🪶', coin: '🪙', hammer: '🔨', pencil: '✏️',
    ball: '⚽', mango: '🥭', pumpkin: '🎃', bicycle: '🚲', shoe: '👟',
    elephant: '🐘', butterfly: '🦋', stone: '🪨', letter: '✉️', milk: '🥛'
};

// ─── Q-TYPE 1: Which side of balance is heavier? ────────────────────────────
const genBalanceHeavy = () => {
    const scenarios = [
        { left: '3 kg', right: '1 kg', leftHeavy: true, leftLabel: '3 kg', rightLabel: '1 kg' },
        { left: '500 g', right: '1 kg', leftHeavy: false, leftLabel: '500g', rightLabel: '1 kg' },
        { left: '2 kg', right: '2 kg', leftHeavy: false, equal: true, leftLabel: '2 kg', rightLabel: '2 kg' },
        { left: '1 kg 500g', right: '2 kg', leftHeavy: false, leftLabel: '1½ kg', rightLabel: '2 kg' },
        { left: '4 kg', right: '3 kg 500g', leftHeavy: true, leftLabel: '4 kg', rightLabel: '3½ kg' },
        { left: '750g', right: '500g', leftHeavy: true, leftLabel: '750g', rightLabel: '500g' },
    ];
    const s = pick(scenarios);
    const opts = s.equal
        ? ['Both equal ⚖️', 'Left side ⬅️', 'Right side ➡️', 'Cannot tell']
        : ['Left side ⬅️', 'Right side ➡️', 'Both equal ⚖️', 'Cannot tell'];
    const correct = s.equal ? 'Both equal ⚖️' : s.leftHeavy ? 'Left side ⬅️' : 'Right side ➡️';
    const options = shuffle(opts);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:6px">
                ⚖️ Look at the <strong>balance scale</strong>. Which side is <strong style="color:#DC2626">heavier</strong>?
            </p>
            <div style="display:inline-block;background:linear-gradient(135deg,#EFF6FF,#DBEAFE);border-radius:18px;padding:10px 18px;border:2px solid #BFDBFE;">
                <svg viewBox="0 0 280 190" width="252" height="171" style="display:block;margin:0 auto;filter:drop-shadow(0 4px 14px rgba(0,0,0,0.12))">
                    ${makeBalanceSVG(s.leftLabel, s.rightLabel, s.equal ? 0 : s.leftHeavy ? 18 : -18)}
                </svg>
            </div>
        </div>
    `;
    const explanation = `The ${s.equal ? 'scale is <strong>balanced</strong> — both sides weigh the same.' : (s.leftHeavy ? '<strong>left side</strong> is heavier' : '<strong>right side</strong> is heavier')} (${s.leftLabel} vs ${s.rightLabel}).`;
    return { questionText, correctAnswer: correct, options, explanation };
};

// ─── Q-TYPE 2: More or Less than 1 kg? ──────────────────────────────────────
const genMoreLess1kg = () => {
    const items = [
        { name: 'a feather 🪶', weight: 5, unit: 'grams', answer: 'Less than 1 kg' },
        { name: 'a watermelon 🍉', weight: 5, unit: 'kg', answer: 'More than 1 kg' },
        { name: 'a 1 kg bag of sugar 🍬', weight: 1, unit: 'kg', answer: 'Exactly 1 kg' },
        { name: 'a school bag 🎒', weight: 3, unit: 'kg', answer: 'More than 1 kg' },
        { name: 'a coin 🪙', weight: 10, unit: 'grams', answer: 'Less than 1 kg' },
        { name: 'a brick 🧱', weight: 2, unit: 'kg', answer: 'More than 1 kg' },
        { name: 'a 1 litre water bottle 💧', weight: 1, unit: 'kg', answer: 'Exactly 1 kg' },
        { name: 'a pencil ✏️', weight: 20, unit: 'grams', answer: 'Less than 1 kg' },
        { name: 'a big pumpkin 🎃', weight: 4, unit: 'kg', answer: 'More than 1 kg' },
        { name: 'a mango 🥭', weight: 300, unit: 'grams', answer: 'Less than 1 kg' },
    ];
    const item = pick(items);
    const opts = ['More than 1 kg', 'Less than 1 kg', 'Exactly 1 kg'];
    const options = shuffle(opts);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:10px">
                Is the weight of <strong style="color:#7C3AED;font-size:18px">${item.name}</strong><br/>more than, less than, or exactly 1 kg?
            </p>
            <div style="background:linear-gradient(135deg,#F5F3FF,#EDE9FE);border-radius:18px;padding:14px 24px;display:inline-block;border:2px solid #C4B5FD;">
                <div style="font-size:54px;margin-bottom:8px">${item.name.split(' ').pop()}</div>
                <div style="background:#7C3AED;color:white;border-radius:20px;padding:4px 16px;font-size:13px;font-weight:700;">
                    Weighs ${item.weight} ${item.unit}
                </div>
            </div>
            <p style="font-size:12px;color:#64748B;margin-top:8px">💡 Remember: 1000 grams = 1 kilogram</p>
        </div>
    `;
    const explanation = `${item.name} weighs <strong>${item.weight} ${item.unit}</strong>. Since ${item.weight} ${item.unit} is ${item.answer.toLowerCase().replace('more', 'greater').replace('less', 'smaller')}, the answer is <strong>${item.answer}</strong>.`;
    return { questionText, correctAnswer: item.answer, options, explanation };
};

// ─── Q-TYPE 3: Heaviest / Lightest among 3 objects ──────────────────────────
const genHeaviestLightest = () => {
    const groups = [
        { objects: [{ n: 'Apple 🍎', w: 200 }, { n: 'Pumpkin 🎃', w: 5000 }, { n: 'Feather 🪶', w: 5 }], unit: 'g/kg' },
        { objects: [{ n: 'Book 📚', w: 500 }, { n: 'Brick 🧱', w: 2500 }, { n: 'Pencil ✏️', w: 20 }], unit: 'g' },
        { objects: [{ n: 'Cat 🐱', w: 4000 }, { n: 'Coin 🪙', w: 10 }, { n: 'Ball ⚽', w: 450 }], unit: 'g' },
        { objects: [{ n: 'Watermelon 🍉', w: 6000 }, { n: 'Shoe 👟', w: 800 }, { n: 'Letter ✉️', w: 30 }], unit: 'g' },
        { objects: [{ n: 'Elephant 🐘', w: 5000 }, { n: 'Butterfly 🦋', w: 1 }, { n: 'Stone 🪨', w: 1000 }], unit: 'g/kg' },
    ];
    const g = pick(groups);
    const isHeaviest = Math.random() > 0.5;
    const sorted = [...g.objects].sort((a, b) => isHeaviest ? b.w - a.w : a.w - b.w);
    const correct = sorted[0].n;
    const options = shuffle(g.objects.map(o => o.n));
    const colors = ['#60A5FA', '#FB923C', '#34D399'];

    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:10px">
                Which is the <strong style="color:${isHeaviest ? '#DC2626' : '#16A34A'};font-size:18px">${isHeaviest ? 'HEAVIEST 🏋️' : 'LIGHTEST 🪶'}</strong>?
            </p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
                ${g.objects.map((obj, i) => `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;background:linear-gradient(135deg,${colors[i]}18,${colors[i]}35);border-radius:16px;padding:10px 16px;border:2px solid ${colors[i]}55;min-width:80px">
                        <div style="font-size:36px">${obj.n.split(' ')[1] || obj.n.split(' ')[0]}</div>
                        <div style="font-weight:700;font-size:12px;color:${colors[i]}">${obj.n.split(' ')[0]}</div>
                        <div style="background:${colors[i]};color:white;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:700">
                            ${obj.w >= 1000 ? (obj.w / 1000) + ' kg' : obj.w + ' g'}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    const explanation = `Comparing weights: ${g.objects.map(o => `<strong>${o.n}</strong> = ${o.w >= 1000 ? (o.w / 1000) + ' kg' : o.w + ' g'}`).join(', ')}. The ${isHeaviest ? 'heaviest' : 'lightest'} is <strong>${correct}</strong>.`;
    return { questionText, correctAnswer: correct, options, explanation };
};

// ─── Q-TYPE 4: Grams to kg conversion ───────────────────────────────────────
const genGramsToKg = () => {
    const conversions = [
        { grams: 1000, kg: '1 kg', distractors: ['½ kg', '2 kg', '100 kg'] },
        { grams: 500, kg: '½ kg', distractors: ['1 kg', '5 kg', '¼ kg'] },
        { grams: 2000, kg: '2 kg', distractors: ['½ kg', '1 kg', '20 kg'] },
        { grams: 250, kg: '¼ kg', distractors: ['½ kg', '1 kg', '2½ kg'] },
        { grams: 3000, kg: '3 kg', distractors: ['½ kg', '300 kg', '1 kg'] },
        { grams: 1500, kg: '1½ kg', distractors: ['½ kg', '15 kg', '2 kg'] },
        { grams: 4000, kg: '4 kg', distractors: ['400 kg', '½ kg', '2 kg'] },
        { grams: 750, kg: '¾ kg', distractors: ['7½ kg', '½ kg', '1 kg'] },
    ];
    const c = pick(conversions);
    const options = shuffle([c.kg, ...c.distractors.slice(0, 3)]);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:14px">
                Convert: <strong style="color:#D97706;font-size:22px">${c.grams} grams</strong> = _____ kg?
            </p>
            <div style="background:linear-gradient(135deg,#FEF3C7,#FDE68A);border-radius:18px;padding:14px 28px;display:inline-block;border:2px solid #FCD34D;">
                <div style="font-size:13px;font-weight:700;color:#92400E;margin-bottom:6px">💡 Key Fact</div>
                <div style="font-size:15px;color:#78350F;font-weight:600">1000 grams = 1 kilogram</div>
                <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px">
                    ${Array(Math.min(c.grams / 250, 4)).fill(0).map(() => `<span style="font-size:22px">⚖️</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    const explanation = `<strong>${c.grams} grams ÷ 1000 = ${c.kg}</strong>. Remember: 1000 g = 1 kg.`;
    return { questionText, correctAnswer: c.kg, options, explanation };
};

// ─── Q-TYPE 5: Odd one out (doesn't weigh about 1 kg) ───────────────────────
const genOddOneOut = () => {
    const sets = [
        {
            items: ['1 litre water bottle 💧', 'A bag of flour 🌾', 'A feather 🪶', '1 kg sugar packet 🍬'],
            odd: 'A feather 🪶',
            reason: 'A feather weighs only a few grams, not about 1 kg.'
        },
        {
            items: ['A brick 🧱', 'A mango 🥭', '1 kg rice packet 🍚', '1 kg of apples 🍎'],
            odd: 'A mango 🥭',
            reason: 'A mango weighs about 200–300 grams, not 1 kg.'
        },
        {
            items: ['A pencil ✏️', 'A coin 🪙', 'A butterfly 🦋', '1 kg salt packet 🧂'],
            odd: '1 kg salt packet 🧂',
            reason: 'A salt packet weighs 1 kg; pencil, coin, and butterfly are all much lighter.'
        },
    ];
    const s = pick(sets);
    const options = shuffle(s.items);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:10px">
                🔍 <strong>Odd One Out!</strong><br/>
                <span style="font-size:14px;color:#374151;font-weight:500">Which item does <strong>NOT</strong> weigh about 1 kilogram?</span>
            </p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
                ${s.items.map((item, i) => {
        const cols = ['#60A5FA', '#FB923C', '#34D399', '#F472B6'];
        return `<span style="background:${cols[i]}20;border:2px solid ${cols[i]}60;border-radius:14px;padding:6px 14px;font-size:14px;font-weight:600;color:#1E3A8A">${item}</span>`;
    }).join('')}
            </div>
        </div>
    `;
    const explanation = `The odd one out is <strong>${s.odd}</strong>. ${s.reason}`;
    return { questionText, correctAnswer: s.odd, options, explanation };
};

// ─── Q-TYPE 6: Interactive Tick Grid — More or Less than 1 kg ───────────────
//  (rendered as MCQ with all options for compatibility)
const genTickGrid = () => {
    const objectSets = [
        {
            objects: [
                { name: 'School bag 🎒', wgt: 3, more: true },
                { name: 'Pencil ✏️', wgt: 0.02, more: false },
                { name: 'Water bottle 💧', wgt: 1, more: false },
                { name: 'Brick 🧱', wgt: 2, more: true },
            ],
            q: 'How many of these objects weigh MORE than 1 kg?',
        },
        {
            objects: [
                { name: 'Feather 🪶', wgt: 0.005, more: false },
                { name: 'Pumpkin 🎃', wgt: 4, more: true },
                { name: 'Coin 🪙', wgt: 0.01, more: false },
                { name: 'Book 📚', wgt: 0.5, more: false },
            ],
            q: 'How many of these objects weigh MORE than 1 kg?',
        },
        {
            objects: [
                { name: 'Bicycle 🚲', wgt: 10, more: true },
                { name: 'Butterfly 🦋', wgt: 0.001, more: false },
                { name: 'Letter ✉️', wgt: 0.03, more: false },
                { name: 'Shoe 👟', wgt: 0.8, more: false },
            ],
            q: 'How many of these objects weigh LESS than 1 kg?',
            countLess: true,
        },
    ];
    const s = pick(objectSets);
    const count = s.countLess
        ? s.objects.filter(o => !o.more).length
        : s.objects.filter(o => o.more).length;
    const correct = String(count);
    const options = shuffle(['1', '2', '3', '4']);
    const cols = ['#60A5FA', '#FB923C', '#34D399', '#F472B6'];

    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:10px">
                📋 <strong>${s.q}</strong>
            </p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:340px;margin:0 auto 10px">
                ${s.objects.map((obj, i) => `
                    <div style="display:flex;align-items:center;gap:8px;background:${cols[i]}18;border:2px solid ${cols[i]}50;border-radius:14px;padding:8px 12px;">
                        <span style="font-size:26px">${obj.name.split(' ').pop()}</span>
                        <div style="text-align:left">
                            <div style="font-size:12px;font-weight:700;color:#1E3A8A">${obj.name.split(' ')[0]}</div>
                            <div style="font-size:11px;color:#64748B">${obj.wgt >= 1 ? obj.wgt + ' kg' : (obj.wgt * 1000) + ' g'}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <p style="font-size:12px;color:#64748B">💡 1000 g = 1 kg</p>
        </div>
    `;
    const explanation = `Count carefully: ${s.objects.map(o => `${o.name} = ${o.wgt >= 1 ? o.wgt + ' kg' : (o.wgt * 1000) + ' g'}`).join(', ')}. The answer is <strong>${count}</strong>.`;
    return { questionText, correctAnswer: correct, options, explanation };
};

// ─── Q-TYPE 7: Word problem — total weight ──────────────────────────────────
const genTotalWeight = () => {
    const problems = [
        { text: 'Ritu bought 2 bags of rice, each weighing 5 kg. What is the total weight?', correct: '10 kg', distractors: ['5 kg', '7 kg', '12 kg'], expr: '2 × 5 kg = 10 kg' },
        { text: 'Arjun has 3 bricks, each weighing 2 kg. How heavy are they altogether?', correct: '6 kg', distractors: ['3 kg', '5 kg', '8 kg'], expr: '3 × 2 kg = 6 kg' },
        { text: 'Meena buys 4 mangoes, each weighing 250 g. What is the total weight?', correct: '1 kg', distractors: ['500 g', '2 kg', '250 g'], expr: '4 × 250 g = 1000 g = 1 kg' },
        { text: 'A crate holds 5 books, each 400 g. What is the total weight of the books?', correct: '2 kg', distractors: ['1 kg', '500 g', '4 kg'], expr: '5 × 400 g = 2000 g = 2 kg' },
        { text: 'Priya has a box weighing 3 kg and a bag weighing 1500 g. What is the total?', correct: '4½ kg', distractors: ['3 kg', '5 kg', '4 kg'], expr: '3 kg + 1500 g = 3 kg + 1.5 kg = 4.5 kg' },
        { text: 'A shopkeeper sells 2 watermelons: one weighs 4 kg, the other weighs 3 kg 500 g. Total?', correct: '7½ kg', distractors: ['7 kg', '8 kg', '6½ kg'], expr: '4 kg + 3.5 kg = 7.5 kg' },
    ];
    const p = pick(problems);
    const options = shuffle([p.correct, ...p.distractors.slice(0, 3)]);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:12px;line-height:1.5">
                🧮 ${p.text}
            </p>
            <div style="background:linear-gradient(135deg,#F0FDF4,#DCFCE7);border-radius:16px;padding:10px 20px;display:inline-block;border:2px solid #BBF7D0;">
                <span style="font-size:22px">⚖️ Think step by step!</span>
            </div>
        </div>
    `;
    const explanation = `<strong>Solution:</strong> ${p.expr}. So the answer is <strong>${p.correct}</strong>.`;
    return { questionText, correctAnswer: p.correct, options, explanation };
};

// ─── Q-TYPE 8: Which weighs more — choose heavier item ──────────────────────
const genWhichHeavier = () => {
    const pairs = [
        { a: 'Elephant 🐘 (5000 kg)', b: 'Ant 🐜 (1 g)', correct: 'Elephant 🐘', aW: 5000000, bW: 0.001 },
        { a: 'Watermelon 🍉 (5 kg)', b: 'Feather 🪶 (5 g)', correct: 'Watermelon 🍉', aW: 5000, bW: 5 },
        { a: 'Book 📚 (500 g)', b: 'Pencil ✏️ (20 g)', correct: 'Book 📚', aW: 500, bW: 20 },
        { a: 'Brick 🧱 (2 kg)', b: 'Apple 🍎 (200 g)', correct: 'Brick 🧱', aW: 2000, bW: 200 },
        { a: 'School Bag 🎒 (4 kg)', b: 'Coin 🪙 (10 g)', correct: 'School Bag 🎒', aW: 4000, bW: 10 },
        { a: 'Pumpkin 🎃 (3 kg)', b: 'Butterfly 🦋 (1 g)', correct: 'Pumpkin 🎃', aW: 3000, bW: 1 },
    ];
    const p = pick(pairs);
    const options = shuffle([p.a.split(' ')[0] + ' ' + p.a.split(' ')[1], p.b.split(' ')[0] + ' ' + p.b.split(' ')[1], 'Both Equal', 'Cannot Say']);
    const correct = p.correct.split(' ')[0] + ' ' + p.correct.split(' ')[1];
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:14px">
                Which is <strong style="color:#DC2626;font-size:18px">HEAVIER</strong>? 🏋️
            </p>
            <div style="display:flex;gap:16px;justify-content:center;align-items:center;flex-wrap:wrap">
                <div style="background:linear-gradient(135deg,#DBEAFE,#BFDBFE);border-radius:18px;padding:14px 22px;border:2px solid #93C5FD;min-width:120px">
                    <div style="font-size:42px;margin-bottom:6px">${p.a.split('(')[0].trim().split(' ').slice(1).join(' ')}</div>
                    <div style="font-weight:700;color:#1E40AF;font-size:13px">${p.a}</div>
                </div>
                <div style="font-size:28px;color:#64748B;font-weight:900">VS</div>
                <div style="background:linear-gradient(135deg,#FCE7F3,#FBCFE8);border-radius:18px;padding:14px 22px;border:2px solid #F9A8D4;min-width:120px">
                    <div style="font-size:42px;margin-bottom:6px">${p.b.split('(')[0].trim().split(' ').slice(1).join(' ')}</div>
                    <div style="font-weight:700;color:#9D174D;font-size:13px">${p.b}</div>
                </div>
            </div>
        </div>
    `;
    const explanation = `A <strong>${p.correct.split('(')[0].trim()}</strong> is heavier. ${p.a} vs ${p.b}.`;
    return { questionText, correctAnswer: correct, options, explanation };
};

// ─── Q-TYPE 9: Ordering three objects by weight ──────────────────────────────
const genOrderByWeight = () => {
    const sets = [
        { items: [{ n: 'Feather 🪶', w: 5 }, { n: 'Book 📚', w: 500 }, { n: 'Brick 🧱', w: 2000 }], lightToHeavy: 'Feather → Book → Brick' },
        { items: [{ n: 'Coin 🪙', w: 10 }, { n: 'Apple 🍎', w: 200 }, { n: 'Watermelon 🍉', w: 5000 }], lightToHeavy: 'Coin → Apple → Watermelon' },
        { items: [{ n: 'Pencil ✏️', w: 20 }, { n: 'Shoe 👟', w: 800 }, { n: 'School Bag 🎒', w: 4000 }], lightToHeavy: 'Pencil → Shoe → Bag' },
        { items: [{ n: 'Butterfly 🦋', w: 1 }, { n: 'Mango 🥭', w: 300 }, { n: 'Pumpkin 🎃', w: 4000 }], lightToHeavy: 'Butterfly → Mango → Pumpkin' },
    ];
    const s = pick(sets);
    const isLight = Math.random() > 0.5;
    const correct = isLight ? s.lightToHeavy : s.lightToHeavy.split(' → ').reverse().join(' → ');
    const distractors = shuffle([
        s.items.map(i => i.n.split(' ')[0]).join(' → '),
        s.items.map(i => i.n.split(' ')[0]).reverse().join(' → '),
        [s.items[1].n.split(' ')[0], s.items[0].n.split(' ')[0], s.items[2].n.split(' ')[0]].join(' → '),
    ]).filter(d => d !== correct).slice(0, 3);
    const options = shuffle([correct, ...distractors]);
    const colors = ['#F472B6', '#60A5FA', '#34D399'];
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:16px;font-weight:700;color:#1E3A8A;margin-bottom:10px">
                📊 Arrange from <strong style="color:${isLight ? '#16A34A' : '#DC2626'}">${isLight ? 'LIGHTEST to HEAVIEST 🪶→🏋️' : 'HEAVIEST to LIGHTEST 🏋️→🪶'}</strong>:
            </p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:8px">
                ${s.items.map((item, i) => `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;background:${colors[i]}18;border:2px solid ${colors[i]}55;border-radius:14px;padding:8px 14px;">
                        <span style="font-size:32px">${item.n.split(' ')[1] || item.n.split(' ')[0]}</span>
                        <span style="font-size:12px;font-weight:700;color:#1E3A8A">${item.n.split(' ')[0]}</span>
                        <span style="background:${colors[i]};color:white;border-radius:12px;padding:1px 8px;font-size:10px;font-weight:700">${item.w >= 1000 ? (item.w / 1000) + ' kg' : item.w + ' g'}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    const explanation = `Comparing: ${s.items.map(i => `${i.n} = ${i.w >= 1000 ? (i.w / 1000) + ' kg' : i.w + ' g'}`).join(', ')}. Correct order: <strong>${correct}</strong>.`;
    return { questionText, correctAnswer: correct, options, explanation };
};

// ─── Q-TYPE 10: Which pan's total is correct? (Balance riddle) ──────────────
const genBalanceRiddle = () => {
    const riddles = [
        {
            left: '3 bags of 500 g each', right: '2 kg', leftShort: '3×500g', rightShort: '2 kg',
            leftW: 1500, rightW: 2000,
            question: 'Three bags (each 500 g) vs one 2 kg weight — which is heavier?',
            correct: '2 kg weight ➡️', distractors: ['3 bags ⬅️', 'Equal ⚖️', 'Cannot tell'],
        },
        {
            left: '4 apples (200 g each)', right: '1 kg', leftShort: '4×200g', rightShort: '1 kg',
            leftW: 800, rightW: 1000,
            question: 'Four apples (each 200 g) vs 1 kg weight — which is heavier?',
            correct: '1 kg weight ➡️', distractors: ['4 apples ⬅️', 'Equal ⚖️', 'Cannot tell'],
        },
        {
            left: '2 bricks (1 kg each)', right: '2 kg', leftShort: '2×1 kg', rightShort: '2 kg',
            leftW: 2000, rightW: 2000,
            question: 'Two bricks (each 1 kg) vs a 2 kg weight — what happens to the scale?',
            correct: 'Equal ⚖️', distractors: ['2 bricks ⬅️', '2 kg weight ➡️', 'Cannot tell'],
        },
        {
            left: '5 coins (100 g each)', right: '1 kg', leftShort: '5×100g', rightShort: '1 kg',
            leftW: 500, rightW: 1000,
            question: 'Five coins (each 100 g) vs 1 kg weight — which is heavier?',
            correct: '1 kg weight ➡️', distractors: ['5 coins ⬅️', 'Equal ⚖️', 'Cannot tell'],
        },
        {
            left: '6 mangoes (250 g each)', right: '1½ kg', leftShort: '6×250g', rightShort: '1½ kg',
            leftW: 1500, rightW: 1500,
            question: 'Six mangoes (each 250 g) vs 1½ kg — what happens?',
            correct: 'Equal ⚖️', distractors: ['6 mangoes ⬅️', '1½ kg ➡️', 'Cannot tell'],
        },
    ];
    const r = pick(riddles);
    const equal = r.leftW === r.rightW;
    const leftHeavy = r.leftW > r.rightW;
    const tilt = equal ? 0 : leftHeavy ? 18 : -18;
    const rad = (tilt * Math.PI) / 180;
    const lx = 120 - 90 * Math.cos(rad), ly = 40 - 90 * Math.sin(rad);
    const rx = 120 + 90 * Math.cos(rad), ry = 40 + 90 * Math.sin(rad);

    const options = shuffle([r.correct, ...r.distractors.slice(0, 3)]);
    const questionText = `
        <div style="text-align:center">
            <p style="font-size:15px;font-weight:700;color:#1E3A8A;margin-bottom:8px">⚖️ ${r.question}</p>
            <div style="background:linear-gradient(135deg,#F0F9FF,#E0F2FE);border-radius:18px;padding:8px 16px;display:inline-block;border:2px solid #BAE6FD;">
                <svg viewBox="0 0 280 190" width="252" height="171" style="display:block;margin:0 auto;filter:drop-shadow(0 4px 14px rgba(0,0,0,0.12))">
                    ${makeBalanceSVG(r.leftShort, r.rightShort, equal ? 0 : leftHeavy ? 18 : -18)}
                </svg>
            </div>
        </div>
    `;
    const explanation = `Left side = ${r.leftW} g, Right side = ${r.rightW} g. ${equal ? 'They are <strong>equal</strong>.' : (leftHeavy ? '<strong>Left is heavier.</strong>' : '<strong>Right is heavier.</strong>')} Answer: <strong>${r.correct}</strong>.`;
    return { questionText, correctAnswer: r.correct, options, explanation };
};

// ─── Question Pool ────────────────────────────────────────────────────────────
const GENERATORS = [
    genBalanceHeavy,
    genMoreLess1kg,
    genHeaviestLightest,
    genGramsToKg,
    genOddOneOut,
    genTickGrid,
    genTotalWeight,
    genWhichHeavier,
    genOrderByWeight,
    genBalanceRiddle,
];

// ─── Main Component ───────────────────────────────────────────────────────────
const WeightHunt = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 9016;
    const SKILL_NAME = 'Filling and Lifting - Weight Hunt';
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});
    const [showCompletion, setShowCompletion] = useState(false);
    const [completionData, setCompletionData] = useState(null);

    useEffect(() => {
        const gens = shuffle(GENERATORS);
        const qs = gens.map(g => { try { return g(); } catch { return genMoreLess1kg(); } });
        setQuestions(qs);
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error('Failed to start session', err));
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
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            clearInterval(timer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
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
                question_text: `WeightHunt Q${qIndex + 1}`,
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isRight,
                solution_text: String(question.explanation || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error('Failed to record attempt', e);
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
            setFeedbackMessage('');
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const totalCorrect = Object.values({ ...answers, [qIndex]: isCorrect }).filter(v => v === true).length;
            if (userId) {
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
                    console.error('Failed to create report', err);
                }
            }
            setCompletionData({ totalCorrect, timeElapsed });
            setShowCompletion(true);
        }
    };

    if (!currentQuestion && !showCompletion) return <div>Loading...</div>;

    // ── Completion / Results Screen ───────────────────────────────────────────
    if (showCompletion && completionData) {
        const { totalCorrect, timeElapsed: t } = completionData;
        const pct = Math.round((totalCorrect / TOTAL_QUESTIONS) * 100);
        const mins = Math.floor(t / 60);
        const secs = t % 60;
        const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : pct >= 40 ? '💪' : '📚';
        const msg = pct === 100 ? 'Perfect Score! You\'re a Weight Wizard!' :
            pct >= 80 ? 'Excellent Work! Almost perfect!' :
                pct >= 60 ? 'Good Job! Keep practising!' :
                    pct >= 40 ? 'Nice Try! You can do better!' :
                        'Keep Learning! Practice makes perfect!';
        const barColor = pct >= 80 ? '#22C55E' : pct >= 60 ? '#F59E0B' : '#EF4444';

        return (
            <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                    style={{
                        background: 'white', borderRadius: '28px', padding: '2.5rem 2rem',
                        maxWidth: '440px', width: '90%', textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '3px solid #E0F2FE'
                    }}
                >
                    {/* Trophy emoji */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: '72px', marginBottom: '0.5rem' }}
                    >{emoji}</motion.div>

                    <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1E3A8A', marginBottom: '0.25rem' }}>
                        Practice Complete!
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#64748B', marginBottom: '1.5rem' }}>{msg}</p>

                    {/* Score ring */}
                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
                        <svg viewBox="0 0 120 120" width="120" height="120">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke={barColor} strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 50}`}
                                strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                                transform="rotate(-90 60 60)"
                                style={{ transition: 'stroke-dashoffset 1s ease' }}
                            />
                            <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1E3A8A">{pct}%</text>
                            <text x="60" y="74" textAnchor="middle" fontSize="11" fill="#64748B">score</text>
                        </svg>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.8rem', flexWrap: 'wrap' }}>
                        <div style={{ background: '#F0FDF4', border: '2px solid #BBF7D0', borderRadius: '14px', padding: '0.7rem 1.2rem', minWidth: '100px' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#16A34A' }}>{totalCorrect} / {TOTAL_QUESTIONS}</div>
                            <div style={{ fontSize: '0.75rem', color: '#4B5563', fontWeight: 600 }}>Correct Answers</div>
                        </div>
                        <div style={{ background: '#EFF6FF', border: '2px solid #BFDBFE', borderRadius: '14px', padding: '0.7rem 1.2rem', minWidth: '100px' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1D4ED8' }}>{mins}:{String(secs).padStart(2, '0')}</div>
                            <div style={{ fontSize: '0.75rem', color: '#4B5563', fontWeight: 600 }}>Time Taken</div>
                        </div>
                    </div>

                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)', color: 'white',
                            border: 'none', borderRadius: '999px', padding: '0.85rem 2.5rem',
                            fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer',
                            boxShadow: '0 6px 20px rgba(59,130,246,0.4)',
                            transition: 'transform 0.15s'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        🏠 Back to Skills
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        ⚖️ Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ padding: '0.75rem 1rem 90px 1rem', minHeight: 'unset', flex: 1 }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto', minHeight: 'unset', padding: '0 0.5rem' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern" style={{ paddingLeft: '2rem', paddingTop: '1rem', paddingBottom: '0.5rem', overflow: 'hidden' }}>
                                    <div className="question-header-modern" style={{ marginBottom: '0.5rem' }}>
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'center', justifyContent: 'center', overflow: 'visible', width: '100%' }}>
                                            <span dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern" style={{ paddingBottom: '0.5rem', paddingTop: '0.25rem' }}>
                                        <div className="options-grid-modern" style={{ gap: '0.75rem' }}>
                                            {currentQuestion.options.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                    style={{
                                                        fontWeight: '500', fontSize: '1.05rem', minHeight: '56px', padding: '0.5rem 1rem',
                                                        ...(isSubmitted && option === currentQuestion.correctAnswer ? {
                                                            background: '#C8E6C9', borderColor: '#4CAF50', color: '#1B5E20', boxShadow: '0 4px 0 #388E3C'
                                                        } : {}),
                                                        ...(isSubmitted && selectedOption === option && !isCorrect ? {
                                                            background: '#FFCDD2', borderColor: '#EF5350', color: '#B71C1C', boxShadow: '0 4px 0 #D32F2F'
                                                        } : {}),
                                                    }}
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
                                                style={{ marginTop: '8px' }}
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
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

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
                                    {qIndex < TOTAL_QUESTIONS - 1 ? 'Next' : 'Done'}
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

export default WeightHunt;
