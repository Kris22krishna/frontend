
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[randomInt(0, arr.length - 1)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const CORRECT_MESSAGES = [
    "✨ Amazing! You have a great eye for height! ✨",
    "🌟 Brilliant! You measured it perfectly! 🌟",
    "🎉 Correct! You're a height expert! 🎉",
    "🚀 Super! Keep it up! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "💎 Spot on! Excellent work! 💎",
];

// ─── SVG LABEL BADGE ─────────────────────────────────────────────────────────
// Draws a big bold colored badge (like a tag) with a letter label
const labelBadge = (cx, cy, letter, bgColor = '#31326F') => `
  <rect x="${cx - 14}" y="${cy - 13}" width="28" height="22" rx="6" fill="${bgColor}" stroke="white" stroke-width="2"/>
  <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="14" font-weight="900" fill="white" font-family="Arial, sans-serif">${letter}</text>`;

// White-backed measurement text (always readable over any background)
const measureText = (x, y, text, color = '#1a1a1a') => `
  <rect x="${x - 24}" y="${y - 12}" width="48" height="16" rx="4" fill="white" opacity="0.88"/>
  <text x="${x}" y="${y}" text-anchor="middle" font-size="11" font-weight="800" fill="${color}" font-family="Arial, sans-serif">${text}</text>`;

// Dashed height measurement line with arrow tips
const heightArrow = (x, topY, botY, color = '#888') => `
  <line x1="${x}" y1="${topY}" x2="${x}" y2="${botY}" stroke="${color}" stroke-width="1.5" stroke-dasharray="4"/>
  <line x1="${x - 4}" y1="${topY + 4}" x2="${x}" y2="${topY}" stroke="${color}" stroke-width="1.5"/>
  <line x1="${x + 4}" y1="${topY + 4}" x2="${x}" y2="${topY}" stroke="${color}" stroke-width="1.5"/>`;

// ─── DRAW HELPERS ─────────────────────────────────────────────────────────────

const drawBottle = (x, h, color, letter) => {
    const neckW = 14, bodyW = 32;
    const neckH = Math.round(h * 0.22);
    const bodyH = h - neckH;
    const baseY = 205;
    const topY = baseY - h;
    return `
    <g>
      <!-- neck -->
      <rect x="${x - neckW / 2}" y="${topY}" width="${neckW}" height="${neckH}" fill="${color}" stroke="#333" stroke-width="1.5" rx="3"/>
      <!-- cap -->
      <rect x="${x - neckW / 2 - 3}" y="${topY - 5}" width="${neckW + 6}" height="7" fill="#777" rx="3"/>
      <!-- body -->
      <rect x="${x - bodyW / 2}" y="${topY + neckH}" width="${bodyW}" height="${bodyH}" fill="${color}" stroke="#333" stroke-width="1.5" rx="5"/>
      <!-- shine -->
      <rect x="${x - bodyW / 2 + 4}" y="${topY + neckH + 6}" width="6" height="${Math.max(8, bodyH - 20)}" fill="white" opacity="0.35" rx="3"/>
      <!-- A/B/C badge on bottle -->
      ${labelBadge(x, topY - 18, letter)}
      <!-- height measurement -->
      ${heightArrow(x + bodyW / 2 + 10, topY, baseY, '#9e9e9e')}
      ${measureText(x + bodyW / 2 + 38, (topY + baseY) / 2, `${Math.round(h / 10)} dm`, '#1565C0')}
    </g>`;
};

const drawPole = (x, h, color, letter) => {
    const baseY = 205;
    const topY = baseY - h;
    return `
    <g>
      <!-- pole -->
      <rect x="${x - 7}" y="${topY}" width="14" height="${h}" fill="${color}" stroke="#333" stroke-width="1.5" rx="4"/>
      <!-- base -->
      <rect x="${x - 18}" y="${baseY}" width="36" height="9" fill="#795548" rx="3"/>
      <!-- letter badge above pole -->
      ${labelBadge(x, topY - 18, letter, '#4a148c')}
      <!-- height text -->
      ${measureText(x + 28, (topY + baseY) / 2, `${h} cm`, '#b71c1c')}
      ${heightArrow(x + 18, topY, baseY, '#bbb')}
    </g>`;
};

const drawTree = (x, h, trunkColor, leafColor, letter) => {
    const baseY = 205;
    const trunkH = Math.round(h * 0.3);
    const trunkW = 14;
    const leafH = h - trunkH;
    const leafRx = Math.round(leafH * 0.45);
    const leafRy = Math.round(leafH * 0.5);
    const leafCy = baseY - trunkH - leafRy;
    return `
    <g>
      <rect x="${x - trunkW / 2}" y="${baseY - trunkH}" width="${trunkW}" height="${trunkH}" fill="${trunkColor}" rx="2"/>
      <ellipse cx="${x}" cy="${leafCy}" rx="${leafRx}" ry="${leafRy}" fill="${leafColor}" stroke="darkgreen" stroke-width="1.5"/>
      <!-- letter badge -->
      ${labelBadge(x, leafCy - leafRy - 16, letter, '#1b5e20')}
      <!-- height -->
      ${measureText(x + leafRx + 28, (leafCy + baseY) / 2, `${h} cm`, '#2e7d32')}
      ${heightArrow(x + leafRx + 10, leafCy - leafRy, baseY, '#bbb')}
    </g>`;
};

const drawBuilding = (x, h, color, numLabel, windows = 3) => {
    const baseY = 205;
    const bw = 40;
    const winSize = 8;
    const winRows = Math.max(1, Math.min(windows, Math.floor(h / 28)));
    let wins = '';
    for (let r = 0; r < winRows; r++) {
        const wy = baseY - h + 14 + r * 25;
        wins += `<rect x="${x - bw / 2 + 5}" y="${wy}" width="${winSize}" height="${winSize}" fill="#B3E5FC" stroke="#555" stroke-width="0.8"/>`;
        wins += `<rect x="${x + 5}" y="${wy}" width="${winSize}" height="${winSize}" fill="#B3E5FC" stroke="#555" stroke-width="0.8"/>`;
    }
    return `
    <g>
      <rect x="${x - bw / 2}" y="${baseY - h}" width="${bw}" height="${h}" fill="${color}" stroke="#333" stroke-width="1.5"/>
      ${wins}
      <rect x="${x - 9}" y="${baseY - 22}" width="18" height="22" fill="#795548"/>
      <!-- number badge -->
      ${labelBadge(x, baseY - h - 18, numLabel, '#1565C0')}
      <!-- height -->
      ${measureText(x + bw / 2 + 30, (baseY - h + baseY) / 2, `${h} m`, '#b71c1c')}
      ${heightArrow(x + bw / 2 + 10, baseY - h, baseY, '#bbb')}
    </g>`;
};

const drawStaircase = (x, steps, blockH, blockW, color) => {
    let rects = '';
    const baseY = 205;
    for (let i = 0; i < steps; i++) {
        const rx = x + i * blockW;
        const height = (i + 1) * blockH;
        rects += `<rect x="${rx}" y="${baseY - height}" width="${blockW}" height="${height}" fill="${color}" stroke="#333" stroke-width="1"/>`;
        // step number label
        rects += `<text x="${rx + blockW / 2}" y="${baseY - height - 5}" text-anchor="middle" font-size="11" font-weight="800" fill="#333" font-family="Arial">${i + 1}</text>`;
    }
    return rects;
};

const drawRuler = (x, totalCm, color = '#FFF176') => {
    const pixPerCm = 20;
    const ry = 185;
    const rh = 24;
    let ticks = '';
    for (let i = 0; i <= totalCm; i++) {
        const tx = x + i * pixPerCm;
        const tickH = i % 5 === 0 ? 14 : 8;
        ticks += `<line x1="${tx}" y1="${ry}" x2="${tx}" y2="${ry + tickH}" stroke="#555" stroke-width="${i % 5 === 0 ? 2 : 1}"/>`;
        if (i % 5 === 0) ticks += `<text x="${tx}" y="${ry + rh + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#333" font-family="Arial">${i}</text>`;
    }
    return `<rect x="${x}" y="${ry}" width="${totalCm * pixPerCm}" height="${rh}" fill="${color}" stroke="#999" stroke-width="2" rx="4"/>${ticks}`;
};

// Stick figure at arbitrary position, with label displayed ABOVE and to the side (not overlapping head)
const stickFigure = (cx, topY, h, color, nameLabel, heightLabel) => {
    const headR = Math.max(10, Math.round(h * 0.13));
    const bodyLen = Math.round(h * 0.38);
    const legLen = Math.round(h * 0.33);
    const armLen = Math.round(h * 0.22);
    const headCy = topY + headR;
    const neckY = topY + headR * 2;
    const bodyBot = neckY + bodyLen;
    const baseY = bodyBot + legLen;

    return `
    <g>
      <circle cx="${cx}" cy="${headCy}" r="${headR}" fill="${color}" stroke="#333" stroke-width="1.8"/>
      <line x1="${cx}" y1="${neckY}" x2="${cx}" y2="${bodyBot}" stroke="#333" stroke-width="2.5"/>
      <line x1="${cx}" y1="${neckY + 8}" x2="${cx - armLen}" y2="${neckY + armLen}" stroke="#333" stroke-width="2"/>
      <line x1="${cx}" y1="${neckY + 8}" x2="${cx + armLen}" y2="${neckY + armLen}" stroke="#333" stroke-width="2"/>
      <line x1="${cx}" y1="${bodyBot}" x2="${cx - 12}" y2="${baseY}" stroke="#333" stroke-width="2"/>
      <line x1="${cx}" y1="${bodyBot}" x2="${cx + 12}" y2="${baseY}" stroke="#333" stroke-width="2"/>
      <!-- height badge to the left, at mid-body level — not overlapping head -->
      ${measureText(cx - 38, (topY + baseY) / 2, heightLabel, '#1565C0')}
      <!-- name label below feet -->
      <rect x="${cx - 22}" y="${baseY + 6}" width="44" height="17" rx="5" fill="${color}" opacity="0.18"/>
      <text x="${cx}" y="${baseY + 18}" text-anchor="middle" font-size="13" font-weight="900" fill="#222" font-family="Arial">${nameLabel}</text>
    </g>`;
};

// ─── QUESTION POOL ─────────────────────────────────────────────────────────────

const HeightsAndMeters = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [showReport, setShowReport] = useState(false);
    const [finalTime, setFinalTime] = useState(0);
    const [answers, setAnswers] = useState({});

    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 9008;
    const SKILL_NAME = 'Heights and Meters';
    const TOTAL_QUESTIONS = 10;

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID)
                .then(sess => { if (sess?.session_id) setSessionId(sess.session_id); })
                .catch(err => console.error('Failed to start session', err));
        }
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        const handleVisibility = () => {
            if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; }
            else { questionStartTime.current = Date.now(); isTabActive.current = true; }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => { clearInterval(timer); document.removeEventListener('visibilitychange', handleVisibility); };
    }, []);

    useEffect(() => { generateQuestion(qIndex); }, [qIndex]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    // ─── QUESTION GENERATORS ──────────────────────────────────────────────────

    const questionGenerators = [

        // Q1 — Three stick-figure children, who is tallest/shortest?
        () => {
            const names = shuffle(['Anya', 'Ravi', 'Priya', 'Lena', 'Sam', 'Mia']).slice(0, 3);
            const rawH = shuffle([50, 68, 86]);
            const cmH = rawH.map(h => h + randomInt(5, 15));
            const colors = shuffle(['#E91E63', '#2196F3', '#FF9800']);
            const children = names.map((n, i) => ({ name: n, h: rawH[i], hcm: cmH[i], color: colors[i] }));
            const askTallest = Math.random() > 0.5;
            const target = children.reduce((b, c) => askTallest ? (c.h > b.h ? c : b) : (c.h < b.h ? c : b));

            const baseY = 220;
            const xs = [55, 145, 235];
            // Calculate top of each figure so feet touch baseY
            // head radius ≈ 13% of h, then more elements below
            const figures = children.map((c, i) => {
                // approx total figure height = h
                const topY = baseY - c.h;
                return stickFigure(xs[i], topY, c.h, c.color, c.name, `${c.hcm} cm`);
            }).join('');

            return {
                text: `Who is the <b>${askTallest ? 'tallest' : 'shortest'}</b> among them?`,
                visual: `<svg viewBox="0 0 290 240" width="100%" height="220" style="overflow:visible">
                    <line x1="10" y1="${baseY}" x2="280" y2="${baseY}" stroke="#795548" stroke-width="3"/>
                    ${figures}
                </svg>`,
                options: names,
                correctAnswer: target.name,
                solution: `${target.name} is ${target.hcm} cm — the ${askTallest ? 'tallest' : 'shortest'}!`
            };
        },

        // Q2 — Three bottles, who is tallest/shortest?
        () => {
            const hList = shuffle([55, 90, 130]);
            const colorList = shuffle(['#4FC3F7', '#CE93D8', '#F48FB1', '#A5D6A7', '#FFCC80']);
            const labels = ['A', 'B', 'C'];
            const askTallest = Math.random() > 0.5;
            const targetIdx = askTallest ? hList.indexOf(Math.max(...hList)) : hList.indexOf(Math.min(...hList));
            const xs = [65, 155, 245];

            let svgContent = `<line x1="15" y1="210" x2="280" y2="210" stroke="#795548" stroke-width="3"/>`;
            for (let i = 0; i < 3; i++) svgContent += drawBottle(xs[i], hList[i], colorList[i], labels[i]);

            return {
                text: `Which bottle is the <b>${askTallest ? 'tallest' : 'shortest'}</b>?`,
                visual: `<svg viewBox="0 0 300 250" width="100%" height="240" style="overflow:visible">${svgContent}</svg>`,
                options: labels,
                correctAnswer: labels[targetIdx],
                solution: `Bottle ${labels[targetIdx]} is ${Math.round(hList[targetIdx] / 10)} dm — the ${askTallest ? 'tallest' : 'shortest'}!`
            };
        },

        // Q3 — Three poles, who is tallest/shortest?
        () => {
            const poleH = shuffle([45, 80, 115]);
            const poleColors = shuffle(['#EF9A9A', '#80CBC4', '#FFD54F', '#B39DDB']);
            const labels = ['A', 'B', 'C'];
            const askTallest = Math.random() > 0.5;
            const targetIdx = askTallest ? poleH.indexOf(Math.max(...poleH)) : poleH.indexOf(Math.min(...poleH));
            const xs = [65, 155, 245];

            let svgContent = `<line x1="15" y1="210" x2="280" y2="210" stroke="#8D6E63" stroke-width="3"/>`;
            for (let i = 0; i < 3; i++) svgContent += drawPole(xs[i], poleH[i], poleColors[i], labels[i]);

            return {
                text: `Which pole is the <b>${askTallest ? 'tallest' : 'shortest'}</b>?`,
                visual: `<svg viewBox="0 0 310 250" width="100%" height="245" style="overflow:visible">${svgContent}</svg>`,
                options: labels,
                correctAnswer: labels[targetIdx],
                solution: `Pole ${labels[targetIdx]} is ${poleH[targetIdx]} cm — the ${askTallest ? 'tallest' : 'shortest'}!`
            };
        },

        // Q4 — Three trees, who is tallest/shortest?
        () => {
            const treeH = shuffle([55, 90, 130]);
            const trunkColors = ['#795548', '#6D4C41', '#A1887F'];
            const leafColors = shuffle(['#388E3C', '#2E7D32', '#43A047', '#66BB6A', '#1B5E20']);
            const labels = ['A', 'B', 'C'];
            const askTallest = Math.random() > 0.5;
            const targetIdx = askTallest ? treeH.indexOf(Math.max(...treeH)) : treeH.indexOf(Math.min(...treeH));
            const xs = [60, 155, 250];

            let svgContent = `<rect x="0" y="203" width="310" height="10" fill="#A5D6A7" rx="2"/>`;
            for (let i = 0; i < 3; i++) svgContent += drawTree(xs[i], treeH[i], trunkColors[i], leafColors[i], labels[i]);

            return {
                text: `Which tree is the <b>${askTallest ? 'tallest' : 'shortest'}</b>?`,
                visual: `<svg viewBox="0 0 310 255" width="100%" height="245" style="overflow:visible">${svgContent}</svg>`,
                options: labels,
                correctAnswer: labels[targetIdx],
                solution: `Tree ${labels[targetIdx]} is ${treeH[targetIdx]} cm — the ${askTallest ? 'tallest' : 'shortest'}!`
            };
        },

        // Q5 — Three buildings skyline
        () => {
            const buildH = shuffle([50, 90, 135]);
            const buildColors = shuffle(['#90CAF9', '#FFAB91', '#A5D6A7', '#CE93D8', '#FFF59D']);
            const askTallest = Math.random() > 0.5;
            const targetIdx = askTallest ? buildH.indexOf(Math.max(...buildH)) : buildH.indexOf(Math.min(...buildH));
            const xs = [60, 155, 250];

            let svgContent = `<rect x="0" y="203" width="310" height="8" fill="#BCAAA4" rx="2"/>`;
            for (let i = 0; i < 3; i++) svgContent += drawBuilding(xs[i], buildH[i], buildColors[i], String(i + 1), 3);

            return {
                text: `Which building is the <b>${askTallest ? 'tallest' : 'shortest'}</b>?`,
                visual: `<svg viewBox="0 0 310 255" width="100%" height="245" style="overflow:visible">${svgContent}</svg>`,
                options: ['Building 1', 'Building 2', 'Building 3'],
                correctAnswer: `Building ${targetIdx + 1}`,
                solution: `Building ${targetIdx + 1} stands ${buildH[targetIdx]} m — the ${askTallest ? 'tallest' : 'shortest'}!`
            };
        },

        // Q6 — Count the staircase steps
        () => {
            const steps = randomInt(3, 7);
            const blockH = randomInt(16, 22);
            const blockW = 28;
            const stairColor = pick(['#80CBC4', '#FFCC80', '#EF9A9A', '#B39DDB', '#A5D6A7']);
            const opts = shuffle(
                [steps, steps + 1, steps === 1 ? steps + 2 : steps - 1, steps + 2]
                    .filter((v, i, a) => v > 0 && a.indexOf(v) === i)
            ).slice(0, 4);
            if (!opts.includes(steps)) opts[0] = steps;

            const stairSVG = drawStaircase(20, steps, blockH, blockW, stairColor);
            const totalW = steps * blockW + 50;
            const totalH = steps * blockH;

            return {
                text: `How many <b>steps</b> does this staircase have?`,
                visual: `<svg viewBox="0 0 ${totalW} 230" width="100%" height="200" style="overflow:visible">
                    <line x1="10" y1="205" x2="${totalW}" y2="205" stroke="#A1887F" stroke-width="3"/>
                    ${stairSVG}
                    <text x="${totalW / 2}" y="${202 - totalH - 8}" text-anchor="middle" font-size="12" font-weight="800" fill="#333" font-family="Arial">Total height: ${totalH} units</text>
                </svg>`,
                options: opts.map(String),
                correctAnswer: String(steps),
                solution: `Count each step — there are ${steps} steps in total!`
            };
        },

        // Q7 — Ruler reading
        () => {
            const totalCm = randomInt(9, 14);
            const objLen = randomInt(3, totalCm - 2);
            const objColor = pick(['#EF9A9A', '#80CBC4', '#FFD54F', '#CE93D8', '#FFAB91']);
            const objName = pick(['pencil', 'crayon', 'eraser', 'stick', 'ribbon']);
            const pixPerCm = 20;
            const opts = shuffle(
                [objLen, objLen + 1, objLen === 1 ? objLen + 2 : objLen - 1, objLen + 2]
                    .filter((v, i, a) => v > 0 && v <= totalCm && a.indexOf(v) === i)
            ).slice(0, 4);
            if (!opts.includes(objLen)) opts[0] = objLen;

            const rx = 15;
            const rulerSVG = drawRuler(rx, totalCm);
            const objSVG = `
            <rect x="${rx}" y="165" width="${objLen * pixPerCm}" height="17" fill="${objColor}" stroke="#333" stroke-width="1.5" rx="5"/>
            <text x="${rx + objLen * pixPerCm / 2}" y="177" text-anchor="middle" font-size="10" font-weight="800" fill="#333" font-family="Arial">${objName}</text>`;

            return {
                text: `How long is the <b>${objName}</b>? (in cm)`,
                visual: `<svg viewBox="0 0 ${rx * 2 + totalCm * pixPerCm + 10} 218" width="100%" height="150" style="overflow:visible">
                    ${rulerSVG}${objSVG}
                </svg>`,
                options: opts.map(v => `${v} cm`),
                correctAnswer: `${objLen} cm`,
                solution: `The ${objName} stretches to the ${objLen} cm mark on the ruler!`
            };
        },

        // Q8 — Child vs object side-by-side comparison
        () => {
            const childH = randomInt(55, 85);
            const compH = randomInt(40, 120);
            const diff = compH - childH;
            const childName = pick(['Rahul', 'Sita', 'Arjun', 'Meena', 'Dev']);
            const objName = pick(['the door', 'the fence', 'the table', 'the shelf']);
            const childColor = pick(['#E91E63', '#2196F3', '#FF9800', '#9C27B0']);
            const objColor = pick(['#795548', '#607D8B', '#8BC34A', '#FF7043']);

            let answer;
            if (diff > 8) answer = `${objName} is taller`;
            else if (diff < -8) answer = `${childName} is taller`;
            else answer = 'They are equal';

            const baseY = 210;
            const childFig = stickFigure(75, baseY - childH, childH, childColor, childName, `${childH} cm`);
            const objTopY = baseY - compH;
            const objFig = `
            <rect x="170" y="${objTopY}" width="42" height="${compH}" fill="${objColor}" rx="5" stroke="#333" stroke-width="1.5"/>
            <!-- shine -->
            <rect x="175" y="${objTopY + 6}" width="7" height="${Math.max(6, compH - 20)}" fill="white" opacity="0.3" rx="3"/>
            ${measureText(233, (objTopY + baseY) / 2, `${compH} cm`, '#b71c1c')}
            ${heightArrow(218, objTopY, baseY, '#bbb')}
            <text x="191" y="${baseY + 18}" text-anchor="middle" font-size="12" font-weight="900" fill="${objColor}" font-family="Arial">${objName}</text>`;

            return {
                text: `Compare the heights. Who / what is taller?`,
                visual: `<svg viewBox="0 0 280 240" width="100%" height="230" style="overflow:visible">
                    <line x1="10" y1="${baseY}" x2="270" y2="${baseY}" stroke="#795548" stroke-width="3"/>
                    ${childFig}${objFig}
                </svg>`,
                options: [`${childName} is taller`, `${objName} is taller`, 'They are equal'],
                correctAnswer: answer,
                solution: `Without the box: ${childName} = ${childH} cm, ${objName} = ${compH} cm. So ${answer}!`
            };
        },

        // Q9 — Which is about half a metre?
        () => {
            const items = [
                { name: 'A water bottle', h: 30, isHalf: false },
                { name: 'A cricket bat', h: 86, isHalf: false },
                { name: 'A jar', h: 50, isHalf: true },
                { name: 'A pen', h: 15, isHalf: false },
                { name: 'Large water pot', h: 50, isHalf: true },
                { name: 'A broomstick', h: 50, isHalf: true },
            ];
            const halfItem = shuffle(items.filter(i => i.isHalf))[0];
            const nonHalf = shuffle(items.filter(i => !i.isHalf)).slice(0, 3);
            const options4 = shuffle([halfItem, ...nonHalf]);
            const correct = halfItem;

            const scale = 1.6;
            const xs = [45, 115, 185, 255];
            const barColors = ['#4FC3F7', '#FFCC80', '#A5D6A7', '#EF9A9A'];
            let bars = '';
            options4.forEach((o, i) => {
                const ph = Math.round(o.h * scale);
                const label = o.name.split(' ').slice(-1)[0]; // last word as short label
                bars += `<rect x="${xs[i] - 16}" y="${205 - ph}" width="32" height="${ph}" fill="${barColors[i]}" stroke="#333" stroke-width="1.5" rx="5"/>`;
                // height label inside bar
                bars += `<text x="${xs[i]}" y="${205 - ph - 5}" text-anchor="middle" font-size="10" font-weight="800" fill="#333" font-family="Arial">${o.h} cm</text>`;
                // short name below
                bars += `<text x="${xs[i]}" y="222" text-anchor="middle" font-size="10" font-weight="700" fill="#333" font-family="Arial">${label}</text>`;
            });
            const halfLineY = 205 - 50 * scale;
            const halfLine = `
            <line x1="10" y1="${halfLineY}" x2="285" y2="${halfLineY}" stroke="#E91E63" stroke-width="2" stroke-dasharray="6"/>
            <rect x="250" y="${halfLineY - 10}" width="38" height="15" rx="4" fill="#E91E63"/>
            <text x="269" y="${halfLineY + 2}" text-anchor="middle" font-size="10" font-weight="900" fill="white" font-family="Arial">½ m</text>`;

            return {
                text: `A half metre = 50 cm. Which is about <b>half a metre</b> long?`,
                visual: `<svg viewBox="0 0 300 240" width="100%" height="220" style="overflow:visible">
                    <line x1="10" y1="205" x2="290" y2="205" stroke="#795548" stroke-width="3"/>
                    ${bars}${halfLine}
                </svg>`,
                options: options4.map(o => o.name),
                correctAnswer: correct.name,
                solution: `${correct.name} is about 50 cm = ½ metre!`
            };
        },

        // Q10 — Real-world objects — which is tallest/shortest?
        () => {
            const objPool = [
                { name: 'Ant', h: 0.5 }, { name: 'Shoe', h: 28 }, { name: 'Chair', h: 45 },
                { name: 'Bicycle', h: 100 }, { name: 'Pencil', h: 15 }, { name: 'Bus', h: 300 },
                { name: 'Table', h: 75 }, { name: 'Lamp post', h: 400 }, { name: 'Cat', h: 25 }
            ];
            const chosen = shuffle(objPool).slice(0, 4);
            const maxH = Math.max(...chosen.map(o => o.h));
            const scale = 140 / maxH;
            const askShortest = Math.random() > 0.5;
            const correct = askShortest
                ? chosen.reduce((b, c) => c.h < b.h ? c : b).name
                : chosen.reduce((b, c) => c.h > b.h ? c : b).name;

            const xs = [45, 115, 185, 255];
            const barColors = ['#80CBC4', '#FFD54F', '#EF9A9A', '#B39DDB'];
            let bars = '';
            chosen.forEach((o, i) => {
                const ph = Math.max(5, Math.round(o.h * scale));
                bars += `<rect x="${xs[i] - 16}" y="${195 - ph}" width="32" height="${ph}" fill="${barColors[i]}" stroke="#333" stroke-width="1.5" rx="4"/>`;
                // height above bar
                bars += `<text x="${xs[i]}" y="${195 - ph - 5}" text-anchor="middle" font-size="10" font-weight="800" fill="#333" font-family="Arial">${o.h < 1 ? o.h : o.h} cm</text>`;
                // name below
                bars += `<text x="${xs[i]}" y="215" text-anchor="middle" font-size="11" font-weight="900" fill="#333" font-family="Arial">${o.name}</text>`;
            });

            return {
                text: `Which of these is the <b>${askShortest ? 'shortest' : 'tallest'}</b>?`,
                visual: `<svg viewBox="0 0 300 230" width="100%" height="210" style="overflow:visible">
                    <line x1="10" y1="195" x2="290" y2="195" stroke="#795548" stroke-width="3"/>
                    ${bars}
                </svg>`,
                options: chosen.map(o => o.name),
                correctAnswer: correct,
                solution: `${correct} is the ${askShortest ? 'shortest' : 'tallest'} among the options!`
            };
        },

        // Q11 — Two children, one on a box — who is actually taller?
        () => {
            const name1 = pick(['Rahul', 'Arjun', 'Dev', 'Sam']);
            const name2 = pick(['Sita', 'Priya', 'Meena', 'Lena']);
            const h1 = randomInt(62, 88);
            const h2 = randomInt(55, 78);
            const boxH = randomInt(18, 32);
            const actuallyTaller = h1 > h2 ? name1 : name2;

            const baseY = 220;
            const c1color = '#E91E63';
            const c2color = '#2196F3';
            const boxColor = '#FFA726';

            // child 1 — no box
            const fig1 = stickFigure(75, baseY - h1, h1, c1color, name1, `${h1} cm`);

            // child 2 — on a box
            const boxTopY = baseY - boxH;
            const fig2TopY = boxTopY - h2;
            const fig2 = stickFigure(190, fig2TopY, h2, c2color, name2, `${h2} cm`);
            const boxSVG = `
            <rect x="165" y="${boxTopY}" width="50" height="${boxH}" fill="${boxColor}" stroke="#333" stroke-width="1.5" rx="4"/>
            <rect x="166" y="${boxTopY + 1}" width="48" height="6" fill="white" opacity="0.3" rx="2"/>
            ${measureText(220, boxTopY + boxH / 2, `Box:${boxH}cm`, '#e65100')}`;

            return {
                text: `${name2} is on a box! Who is <b>actually taller</b> (without the box)?`,
                visual: `<svg viewBox="0 0 280 250" width="100%" height="235" style="overflow:visible">
                    <line x1="10" y1="${baseY}" x2="270" y2="${baseY}" stroke="#795548" stroke-width="3"/>
                    ${fig1}${boxSVG}${fig2}
                </svg>`,
                options: [name1, name2, 'They are the same'],
                correctAnswer: actuallyTaller,
                solution: `Without the box: ${name1} = ${h1} cm, ${name2} = ${h2} cm. So ${actuallyTaller} is actually taller!`
            };
        },
    ];

    // ─── CORE LOGIC ───────────────────────────────────────────────────────────

    const generateQuestion = (_idx) => {
        const gen = questionGenerators[randomInt(0, questionGenerators.length - 1)];
        const qData = gen();
        setShuffledOptions(shuffle(qData.options));
        setCurrentQuestion(qData);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage('');
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));
        if (isRight) setFeedbackMessage(pick(CORRECT_MESSAGES));
        else setShowExplanationModal(true);

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            const seconds = Math.round((accumulatedTime.current + (isTabActive.current ? Date.now() - questionStartTime.current : 0)) / 1000);
            api.recordAttempt({
                user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID,
                template_id: null, difficulty_level: 'Easy',
                question_text: 'Heights and Meters',
                correct_answer: String(currentQuestion.correctAnswer),
                student_answer: String(selectedOption),
                is_correct: isRight,
                solution_text: String(currentQuestion.solution),
                time_spent_seconds: seconds >= 0 ? seconds : 0,
            }).catch(console.error);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(v => v === true).length;
                api.createReport({
                    title: SKILL_NAME, type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId, 10),
                }).catch(console.error);
            }
            setFinalTime(timeElapsed);
            setShowReport(true);
        }
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    if (!currentQuestion && !showReport) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh' }}>Loading...</div>;

    // ─── REPORT ───────────────────────────────────────────────────────────────
    if (showReport) {
        const totalCorrect = Object.values(answers).filter(v => v === true).length;
        const percentage = Math.round((totalCorrect / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                    style={{ background: 'white', borderRadius: '2rem', padding: '2.5rem 3rem', maxWidth: '480px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(79,183,179,0.2)', border: '3px solid rgba(79,183,179,0.3)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{percentage >= 80 ? '🌟🌟🌟' : percentage >= 50 ? '⭐⭐' : '⭐'}</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#31326F', marginBottom: '0.25rem' }}>Practice Complete!</h2>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Heights &amp; Meters</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
                        {[['#f0fdf4', '#86efac', '#16a34a', `${totalCorrect}/${TOTAL_QUESTIONS}`, 'Correct'],
                        ['#eff6ff', '#93c5fd', '#2563eb', `${percentage}%`, 'Score'],
                        ['#fef3c7', '#fcd34d', '#d97706', formatTime(finalTime), 'Time']
                        ].map(([bg, border, fg, val, lbl]) => (
                            <div key={lbl} style={{ background: bg, borderRadius: '1rem', padding: '0.9rem 1.2rem', border: `2px solid ${border}` }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: fg }}>{val}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{lbl}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '1.05rem', color: '#31326F', fontWeight: 700, marginBottom: '1.5rem' }}>
                        {percentage >= 80 ? '🎉 Excellent! You\'re a height expert!' : percentage >= 50 ? '👍 Good effort! Keep practicing!' : '💪 Keep going, you\'ll improve!'}
                    </p>
                    <button onClick={() => navigate(-1)} className="nav-pill-next-btn" style={{ width: '100%', justifyContent: 'center' }}>
                        Go Back <ChevronRight size={22} strokeWidth={3} />
                    </button>
                </motion.div>
            </div>
        );
    }

    // ─── MAIN RENDER ──────────────────────────────────────────────────────────
    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* HEADER */}
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-lg shadow-sm whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-base shadow-sm">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            {/* MAIN */}
            <main className="practice-content-wrapper" style={{ flex: 1, overflow: 'hidden', padding: '0.75rem', display: 'flex', alignItems: 'stretch' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="question-card-modern" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div className="question-header-modern" style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                    <h2 className="question-text-modern" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.35rem)', fontWeight: 600, textAlign: 'center' }}>
                                        <LatexContent html={currentQuestion.text} />
                                    </h2>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 1 auto', minHeight: 0, overflow: 'hidden', padding: '0.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: '1rem', marginTop: '0.4rem' }}>
                                        <div dangerouslySetInnerHTML={{ __html: currentQuestion.visual }} style={{ width: '100%', maxHeight: '100%', overflow: 'visible', display: 'flex', justifyContent: 'center' }} />
                                    </div>
                                </div>

                                <div className="interaction-area-modern">
                                    <div className="options-grid-modern">
                                        {shuffledOptions.map((option, idx) => (
                                            <button key={idx}
                                                className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                style={{ fontWeight: 600, fontSize: '1.05rem' }}
                                                onClick={() => { if (!isSubmitted) setSelectedOption(option); }}
                                                disabled={isSubmitted}>
                                                <LatexContent html={option} />
                                            </button>
                                        ))}
                                    </div>
                                    {isSubmitted && isCorrect && (
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '12px' }}>
                                            {feedbackMessage}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            {/* FOOTER */}
            <footer className="junior-bottom-bar" style={{ height: '70px', padding: '0 1rem' }}>
                {/* Desktop */}
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-5 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors"
                            onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>
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
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {qIndex > 0 && (
                                <button onClick={handlePrev} style={{ background: 'white', border: '2px solid #4FB7B3', color: '#31326F', borderRadius: '999px', padding: '0.5rem 1.2rem', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                    <ChevronLeft size={22} strokeWidth={3} /> Prev
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? <><span>Next</span><ChevronRight size={28} strokeWidth={3} /></> : <><span>Done</span><Check size={28} strokeWidth={3} /></>}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className="mobile-footer-controls">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                            onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>
                            <X size={20} />
                        </button>
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        {qIndex > 0 && (
                            <button onClick={handlePrev} style={{ background: 'white', border: '2px solid #4FB7B3', color: '#31326F', borderRadius: '999px', padding: '0.4rem 0.8rem', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                                <ChevronLeft size={18} strokeWidth={3} /> Prev
                            </button>
                        )}
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
            </footer>
        </div>
    );
};

export default HeightsAndMeters;
