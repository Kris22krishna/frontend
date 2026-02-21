
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing job! You measured that perfectly! ✨",
    "🌟 Brilliant! You have a sharp eye! 🌟",
    "🎉 Correct! You're a length expert! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const generateStringSVG = (type, config) => {
    let svgContent = '';
    const width = config.width || 300;
    const height = config.height || 100;
    const strokeWidth = config.strokeWidth || 4;
    const color = config.color || '#FF5722';
    const length = config.length || 200;

    let viewBox = `0 0 ${width} ${height}`;

    if (type === 'straight') {
        const y = height / 2;
        const xStart = (width - length) / 2;
        const xEnd = xStart + length;
        svgContent += `<line x1="${xStart}" y1="${y}" x2="${xEnd}" y2="${y}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" />`;
        svgContent += `<circle cx="${xStart}" cy="${y}" r="${strokeWidth}" fill="${color}" />`;
        svgContent += `<circle cx="${xEnd}" cy="${y}" r="${strokeWidth}" fill="${color}" />`;
    }
    else if (type === 'wavy') {
        const y = height / 2;
        const amplitude = config.amplitude || 20;
        const frequency = config.frequency || 3;
        const xStart = 20;
        const realLength = length;
        let path = `M ${xStart} ${y}`;
        const step = realLength / (frequency * 4);
        for (let i = 0; i < frequency; i++) {
            path += ` q ${step} -${amplitude}, ${step * 2} 0 t ${step * 2} 0`;
        }
        svgContent += `<path d="${path}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round" />`;
    }
    else if (type === 'coiled') {
        const y = height / 2;
        const loops = config.loops || 5;
        const xStart = 30;
        const spacing = (config.width - 60) / loops;
        let path = `M ${xStart} ${y}`;
        for (let i = 0; i < loops; i++) {
            const loopW = spacing;
            path += ` C ${xStart + i * loopW + loopW * 0.25} ${y - 30}, ${xStart + i * loopW + loopW * 0.75} ${y - 30}, ${xStart + (i + 1) * loopW} ${y}`;
            if (config.hasBulbs) {
                const bx = xStart + i * loopW + loopW * 0.5;
                const by = y - 15;
                svgContent += `<g transform="translate(${bx}, ${by})">
                      <path d="M -5 0 L -5 8 L 5 8 L 5 0 Z" fill="#555" />
                      <circle cx="0" cy="-6" r="8" fill="${['#FFD700', '#FF5722', '#03A9F4', '#4CAF50'][i % 4]}" />
                  </g>`;
            }
        }
        svgContent += `<path d="${path}" stroke="#333" stroke-width="2" fill="none" />`;
    }
    else if (type === 'snake') {
        const y = height / 2 + 10;
        const xStart = 20;
        const snakeLen = config.length || 200;
        const waves = config.waves || 3;
        const amp = config.amplitude || 15;
        let pathData = `M ${xStart} ${y}`;
        for (let i = 0; i < waves * 2; i++) {
            const dy = (i % 2 === 0) ? -amp : amp;
            pathData += ` Q ${xStart + (i + 0.5) * (snakeLen / (waves * 2))} ${y + dy}, ${xStart + (i + 1) * (snakeLen / (waves * 2))} ${y}`;
        }
        svgContent += `<path d="${pathData}" stroke="${color}" stroke-width="12" fill="none" stroke-linecap="round" />`;
        svgContent += `<path d="${pathData}" stroke="#FFF" stroke-width="2" fill="none" stroke-dasharray="0 15" stroke-linecap="round" opacity="0.5" />`;
        const headX = xStart + snakeLen;
        svgContent += `<circle cx="${headX}" cy="${y}" r="10" fill="${color}" />`;
        svgContent += `<circle cx="${headX + 3}" cy="${y - 3}" r="2" fill="white" />`;
        svgContent += `<circle cx="${headX + 3}" cy="${y - 3}" r="1" fill="black" />`;
        svgContent += `<path d="M ${headX + 8} ${y + 2} L ${headX + 15} ${y + 5} L ${headX + 8} ${y + 8}" stroke="red" stroke-width="2" fill="none" />`;
    }
    else if (type === 'necklace') {
        const cx = width / 2;
        const cy = height / 2;
        const rx = config.rx || 80;
        const ry = config.ry || 30;
        svgContent += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#2196F3" stroke-width="2" />`;
        const beads = 12;
        for (let i = 0; i < beads; i++) {
            const angle = (i / beads) * 2 * Math.PI;
            const bx = cx + rx * Math.cos(angle);
            const by = cy + ry * Math.sin(angle);
            svgContent += `<circle cx="${bx}" cy="${by}" r="6" fill="${['red', 'gold', 'purple'][i % 3]}" stroke="white" stroke-width="1" />`;
        }
        svgContent += `<rect x="${cx - 4}" y="${cy - ry - 4}" width="8" height="4" fill="gold" />`;
    }

    return `<svg viewBox="${viewBox}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="max-height: 85px; overflow: visible;">${svgContent}</svg>`;
};

const LongerShorterStrings = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 9006;
    const SKILL_NAME = "Longer & Shorter Strings";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});
    const [showReport, setShowReport] = useState(false);
    const [finalTime, setFinalTime] = useState(0);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

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

    useEffect(() => {
        generateQuestion(qIndex);
    }, [qIndex]);

    // Pool of question generators — randomly mixed every session
    const questionGenerators = [
        // Type 1: Two straight strings, compare lengths
        () => {
            const colors = ['#E91E63', '#2196F3', '#4CAF50', '#FF5722', '#9C27B0'];
            const c1 = colors[randomInt(0, colors.length - 1)];
            const c2 = colors.filter(c => c !== c1)[randomInt(0, colors.length - 2)];
            const lenA = randomInt(80, 160);
            const lenB = randomInt(180, 270);
            const swap = Math.random() > 0.5;
            const [finalA, finalB] = swap ? [lenB, lenA] : [lenA, lenB];
            const svgA = generateStringSVG('straight', { length: finalA, color: c1, width: 300, height: 40 });
            const svgB = generateStringSVG('straight', { length: finalB, color: c2, width: 300, height: 40 });
            const isALonger = finalA > finalB;
            const askLongest = Math.random() > 0.5;
            const correct = (askLongest && isALonger) || (!askLongest && !isALonger) ? "String A" : "String B";
            return {
                text: `Which string is <b>${askLongest ? 'longer' : 'shorter'}</b>?`,
                visual: `<div class='flex flex-col gap-2 items-center w-full justify-center'>
                    <div class='flex items-center gap-3 w-full justify-center'><span class='font-bold text-lg w-8'>A:</span> ${svgA}</div>
                    <div class='flex items-center gap-3 w-full justify-center'><span class='font-bold text-lg w-8'>B:</span> ${svgB}</div>
                </div>`,
                options: ["String A", "String B"],
                correctAnswer: correct,
                solution: `${correct} is ${askLongest ? 'longer' : 'shorter'} than the other.`
            };
        },

        // Type 2: Curvy snake vs straight stick
        () => {
            const snakeColor = ['#4CAF50', '#FF5722', '#9C27B0'][randomInt(0, 2)];
            const stickColor = ['#607D8B', '#795548', '#455A64'][randomInt(0, 2)];
            const waves = randomInt(3, 6);
            const svgSnake = generateStringSVG('snake', { length: 200, color: snakeColor, waves, amplitude: 15, height: 50 });
            const svgLine = generateStringSVG('straight', { length: 220, color: stickColor, height: 40 });
            const labels = [
                { name: `Wavy String`, svg: svgSnake, isLonger: true },
                { name: `Straight Stick`, svg: svgLine, isLonger: false }
            ].sort(() => Math.random() - 0.5);
            const [labelA, labelB] = labels;
            const correct = labelA.isLonger ? labelA.name : labelB.name;
            return {
                text: "Which is <b>longer</b> when straightened out?",
                visual: `<div class='flex flex-col gap-2 items-center justify-center w-full'>
                    <div class='flex items-center gap-3 w-full justify-center'><span class='font-bold text-lg w-8'>A:</span> ${labelA.svg}</div>
                    <div class='flex items-center gap-3 w-full justify-center'><span class='font-bold text-lg w-8'>B:</span> ${labelB.svg}</div>
                </div>`,
                options: [labelA.name, labelB.name],
                correctAnswer: correct,
                solution: `The wavy string, when straightened, is much longer than the straight stick!`
            };
        },

        // Type 3: Three coiled light strings — shortest/longest
        () => {
            const loopOptions = [[2, 4, 6], [3, 5, 8], [2, 5, 7], [3, 6, 9]];
            const [l1, l2, l3] = loopOptions[randomInt(0, loopOptions.length - 1)];
            const bulbColors = [['#E91E63', '#2196F3', '#4CAF50'], ['#FF5722', '#9C27B0', '#FF9800']];
            const bColors = bulbColors[randomInt(0, 1)];
            const svg1 = generateStringSVG('coiled', { loops: l1, width: 180, height: 40, hasBulbs: true, bulbColor: bColors[0] });
            const svg2 = generateStringSVG('coiled', { loops: l2, width: 230, height: 40, hasBulbs: true, bulbColor: bColors[1] });
            const svg3 = generateStringSVG('coiled', { loops: l3, width: 280, height: 40, hasBulbs: true, bulbColor: bColors[2] });
            const items = [
                { id: "A", svg: svg1, len: l1 },
                { id: "B", svg: svg2, len: l2 },
                { id: "C", svg: svg3, len: l3 }
            ].sort(() => Math.random() - 0.5);
            const askShortest = Math.random() > 0.5;
            const target = askShortest
                ? items.reduce((p, c) => p.len < c.len ? p : c)
                : items.reduce((p, c) => p.len > c.len ? p : c);
            return {
                text: `Which string of lights is the <b>${askShortest ? 'shortest' : 'longest'}</b>?`,
                visual: `<div class='flex flex-col gap-1 w-full justify-center'>
                    ${items.map(item => `<div class='flex items-center gap-3 w-full justify-center'><span class='font-bold text-xl w-8'>${item.id}</span> ${item.svg}</div>`).join('')}
                </div>`,
                options: ["A", "B", "C"],
                correctAnswer: target.id,
                solution: `String ${target.id} has ${askShortest ? 'the fewest' : 'the most'} loops, so it is the ${askShortest ? 'shortest' : 'longest'}.`
            };
        },

        // Type 4: Ribbon bar chart — shortest/longest
        () => {
            const allColors = ['#FF9800', '#9C27B0', '#00BCD4', '#E91E63', '#4CAF50'];
            const chosen = [...allColors].sort(() => Math.random() - 0.5).slice(0, 3);
            const vals = [randomInt(25, 45), randomInt(50, 65), randomInt(70, 95)].sort(() => Math.random() - 0.5);
            const ribbons = vals.map((v, i) => ({ val: v, color: chosen[i] }));
            const generateRibbon = (h, c) => `<svg width="35" height="100" viewBox="0 0 40 100">
                <rect x="5" y="${100 - h}" width="30" height="${h}" fill="${c}" rx="3"/>
                <path d="M 5 ${100} L 20 ${90} L 35 ${100}" fill="white" />
            </svg>`;
            const visualHTML = `<div class='flex justify-center gap-8 items-end' style='height:115px'>
                ${ribbons.map((r, i) => `<div class='flex flex-col items-center'>${generateRibbon(r.val, r.color)}<span class='font-bold mt-1 text-base'>${i + 1}</span></div>`).join('')}
            </div>`;
            const askLongest = Math.random() > 0.5;
            const target = askLongest
                ? ribbons.indexOf(ribbons.reduce((a, b) => a.val > b.val ? a : b)) + 1
                : ribbons.indexOf(ribbons.reduce((a, b) => a.val < b.val ? a : b)) + 1;
            return {
                text: `Which ribbon is the <b>${askLongest ? 'longest' : 'shortest'}</b>?`,
                visual: visualHTML,
                options: ["1", "2", "3"],
                correctAnswer: target.toString(),
                solution: `Ribbon ${target} is the ${askLongest ? 'tallest' : 'shortest'} bar, so it is the ${askLongest ? 'longest' : 'shortest'}.`
            };
        },

        // Type 5: Two necklaces — which uses more string
        () => {
            const smallR = randomInt(25, 35);
            const bigR = randomInt(45, 60);
            const svgSmall = generateStringSVG('necklace', { rx: smallR, ry: smallR, width: smallR * 2 + 20, height: smallR * 2 + 20 });
            const svgBig = generateStringSVG('necklace', { rx: bigR, ry: bigR, width: bigR * 2 + 20, height: bigR * 2 + 20 });
            const names = [['Necklace A', 'Necklace B'], ['Ring 1', 'Ring 2'], ['Bangle A', 'Bangle B']][randomInt(0, 2)];
            const swap = Math.random() > 0.5;
            return {
                text: `Which <b>${names[0].split(' ')[0].toLowerCase()}</b> uses <b>more</b> string?`,
                visual: `<div class='flex justify-around items-center w-full gap-4'>
                    <div class='flex flex-col items-center gap-1'>${swap ? svgBig : svgSmall}<span class='font-bold'>${names[0]}</span></div>
                    <div class='flex flex-col items-center gap-1'>${swap ? svgSmall : svgBig}<span class='font-bold'>${names[1]}</span></div>
                </div>`,
                options: [names[0], names[1]],
                correctAnswer: swap ? names[0] : names[1],
                solution: `The bigger ${names[0].split(' ')[0].toLowerCase()} has a larger circumference, so it uses more string.`
            };
        },

        // Type 6: Add two string pieces — total length
        () => {
            const p1 = randomInt(2, 8);
            const p2 = randomInt(2, 8);
            const scale = 18;
            const c1 = ['#E91E63', '#FF5722', '#9C27B0'][randomInt(0, 2)];
            const c2 = ['#2196F3', '#4CAF50', '#FF9800'][randomInt(0, 2)];
            const svgPieces = `<svg width="300" height="70" viewBox="0 0 300 70">
                <text x="10" y="14" font-size="13" font-weight="bold" fill="${c1}">Part 1: ${p1} cm</text>
                <line x1="10" y1="28" x2="${10 + p1 * scale}" y2="28" stroke="${c1}" stroke-width="6" stroke-linecap="round"/>
                <text x="10" y="52" font-size="13" font-weight="bold" fill="${c2}">Part 2: ${p2} cm</text>
                <line x1="10" y1="64" x2="${10 + p2 * scale}" y2="64" stroke="${c2}" stroke-width="6" stroke-linecap="round"/>
            </svg>`;
            const total = p1 + p2;
            const wrong1 = total + randomInt(1, 3);
            const wrong2 = Math.abs(p1 - p2);
            const wrong3 = p1 * p2;
            const opts = [total, wrong1, wrong2, wrong3].filter((v, i, a) => a.indexOf(v) === i && v >= 0).slice(0, 4);
            while (opts.length < 4) opts.push(total + opts.length);
            return {
                text: `Two pieces of string are joined. How long is the <b>total</b> string?`,
                visual: svgPieces,
                options: opts.map(o => `${o} cm`),
                correctAnswer: `${total} cm`,
                solution: `Add the two pieces: ${p1} cm + ${p2} cm = ${total} cm.`
            };
        },

        // Type 7: Four colored bars — longest/shortest
        () => {
            const colorPool = [
                { name: "Blue", c: "blue" }, { name: "Red", c: "red" },
                { name: "Green", c: "green" }, { name: "Yellow", c: "#FFC107" },
                { name: "Purple", c: "#9C27B0" }, { name: "Orange", c: "#FF9800" }
            ];
            const chosen = [...colorPool].sort(() => Math.random() - 0.5).slice(0, 4);
            const lengths = [60, 100, 140, 190].sort(() => Math.random() - 0.5);
            const items = chosen.map((c, i) => ({ ...c, l: lengths[i] }));
            const visual = `<div class='flex flex-col gap-2 w-full items-center'>
                ${items.map(i => `<div class='flex items-center gap-2 w-full max-w-xs'>
                    <div style="width:55px;text-align:right;font-weight:bold;font-size:0.85rem;">${i.name}</div>
                    <svg width="180" height="14"><line x1="0" y1="7" x2="${i.l}" y2="7" stroke="${i.c}" stroke-width="7" stroke-linecap="round"/></svg>
                </div>`).join('')}
            </div>`;
            const askLongest = Math.random() > 0.5;
            const correct = askLongest
                ? items.reduce((a, b) => a.l > b.l ? a : b).name
                : items.reduce((a, b) => a.l < b.l ? a : b).name;
            return {
                text: `Which string is the <b>${askLongest ? 'longest' : 'shortest'}</b>?`,
                visual: visual,
                options: items.map(i => i.name),
                correctAnswer: correct,
                solution: `The ${correct} string is the ${askLongest ? 'longest' : 'shortest'} bar.`
            };
        },

        // Type 8: Curved path vs straight path
        () => {
            const curveY = randomInt(5, 25);
            const startX = 20, endX = 260, midX = 140, midY = 65;
            const svgPath = `<svg viewBox="0 0 300 90" width="100%" height="85">
                <line x1="${startX}" y1="${midY}" x2="${endX}" y2="${midY}" stroke="#2196F3" stroke-width="4" />
                <text x="${midX}" y="${midY + 14}" fill="#2196F3" font-weight="bold" font-size="12" text-anchor="middle">Path B (Straight)</text>
                <path d="M ${startX} ${midY} Q ${midX} ${midY - curveY * 3}, ${endX} ${midY}" stroke="#FF5722" stroke-width="4" fill="none" />
                <text x="${midX}" y="${midY - curveY * 3 - 5}" fill="#FF5722" font-weight="bold" font-size="12" text-anchor="middle">Path A (Curved)</text>
                <circle cx="${startX}" cy="${midY}" r="5" fill="#333"/><text x="${startX - 5}" y="${midY - 8}" font-size="11">Start</text>
                <circle cx="${endX}" cy="${midY}" r="5" fill="#333"/><text x="${endX - 12}" y="${midY - 8}" font-size="11">End</text>
            </svg>`;
            return {
                text: "Both paths go from Start to End. Which path is <b>shorter</b>?",
                visual: svgPath,
                options: ["Path A", "Path B"],
                correctAnswer: "Path B",
                solution: "A straight line is always the shortest distance between two points!"
            };
        },

        // Type 9: Paperclip chains — which is longer
        () => {
            const clipsA = randomInt(2, 5);
            const clipsB = randomInt(6, 10);
            const swap = Math.random() > 0.5;
            const [top, bot] = swap ? [clipsB, clipsA] : [clipsA, clipsB];
            const topColor = ['#FFC107', '#FF9800', '#E91E63'][randomInt(0, 2)];
            const botColor = ['#8BC34A', '#4CAF50', '#2196F3'][randomInt(0, 2)];
            const svg = `<svg viewBox="0 0 300 100" height="90" width="100%">
                <text x="5" y="18" font-weight="bold" font-size="14">A</text>
                <rect x="20" y="8" width="${top * 24}" height="10" fill="${topColor}" rx="5"/>
                ${Array.from({ length: top }).map((_, i) => `<ellipse cx="${32 + i * 24}" cy="28" rx="8" ry="3.5" fill="none" stroke="gray" stroke-width="2"/>`).join('')}
                <text x="5" y="62" font-weight="bold" font-size="14">B</text>
                <rect x="20" y="52" width="${bot * 24}" height="10" fill="${botColor}" rx="5"/>
                ${Array.from({ length: bot }).map((_, i) => `<ellipse cx="${32 + i * 24}" cy="73" rx="8" ry="3.5" fill="none" stroke="gray" stroke-width="2"/>`).join('')}
            </svg>`;
            const correct = top > bot ? "A" : "B";
            return {
                text: "Each paperclip is the same size. Which chain is <b>longer</b>?",
                visual: svg,
                options: ["A", "B"],
                correctAnswer: correct,
                solution: `Chain ${correct} has more paperclips (${Math.max(top, bot)} vs ${Math.min(top, bot)}), so it is longer.`
            };
        },

        // Type 10: Best-fit string for a gap (random gap width)
        () => {
            const gapW = randomInt(100, 180);
            const shorter = gapW - randomInt(30, 50);
            const longer = gapW + randomInt(30, 60);
            const labels = ['A', 'B', 'C'].sort(() => Math.random() - 0.5);
            const opts = [
                { label: labels[0], len: shorter, valid: false },
                { label: labels[1], len: gapW + randomInt(-5, 5), valid: true },
                { label: labels[2], len: longer, valid: false }
            ].sort((a, b) => a.label.localeCompare(b.label));
            const correctLabel = opts.find(o => o.valid).label;
            const gapSVG = `<svg width="100%" height="55" viewBox="0 0 300 55">
                <rect x="10" y="8" width="45" height="36" fill="#795548" rx="4"/>
                <rect x="${10 + 45 + gapW * 0.6}" y="8" width="45" height="36" fill="#795548" rx="4"/>
                <text x="${10 + 45 + gapW * 0.3}" y="32" text-anchor="middle" font-size="22" fill="#555">?</text>
            </svg>`;
            return {
                text: "Which string fits <b>exactly</b> in the gap?",
                visual: `<div class='flex flex-col items-center gap-2 w-full'>
                    <div style='width:100%'>${gapSVG}</div>
                    <div class='flex flex-col gap-1 w-full items-center'>
                        ${opts.map(o => `<div class='flex items-center gap-2 border px-2 py-1 rounded w-full max-w-xs justify-between'>
                            <span class='font-bold w-6'>${o.label}</span>
                            <svg width="200" height="14"><line x1="0" y1="7" x2="${o.len * 0.75}" y2="7" stroke="${o.valid ? '#4CAF50' : '#FF5722'}" stroke-width="5" stroke-linecap="round"/></svg>
                        </div>`).join('')}
                    </div>
                </div>`,
                options: opts.map(o => o.label),
                correctAnswer: correctLabel,
                solution: `String ${correctLabel} is just the right length to fill the gap!`
            };
        }
    ];

    const generateQuestion = (_index) => {
        // Pick a random generator from the pool every time
        const gen = questionGenerators[randomInt(0, questionGenerators.length - 1)];
        const qData = gen();

        setShuffledOptions([...qData.options].sort(() => Math.random() - 0.5));
        setCurrentQuestion(qData);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
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
                question_text: "Longer Shorter Strings Q",
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
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
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
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
            setFinalTime(timeElapsed);
            setShowReport(true);
        }
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (!currentQuestion && !showReport) return <div>Loading...</div>;

    if (showReport) {
        const totalCorrect = Object.values(answers).filter(val => val === true).length;
        const percentage = Math.round((totalCorrect / TOTAL_QUESTIONS) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        return (
            <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                        background: 'white',
                        borderRadius: '2rem',
                        padding: '2.5rem 3rem',
                        maxWidth: '480px',
                        width: '90%',
                        textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(79,183,179,0.2)',
                        border: '3px solid rgba(79,183,179,0.3)'
                    }}
                >
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        {stars === 3 ? '🌟🌟🌟' : stars === 2 ? '⭐⭐' : '⭐'}
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#31326F', marginBottom: '0.25rem' }}>Practice Complete!</h2>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '1rem' }}>Longer &amp; Shorter Strings</p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: '#f0fdf4', borderRadius: '1rem', padding: '1rem 1.5rem', border: '2px solid #86efac' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#16a34a' }}>{totalCorrect}/{TOTAL_QUESTIONS}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Correct</div>
                        </div>
                        <div style={{ background: '#eff6ff', borderRadius: '1rem', padding: '1rem 1.5rem', border: '2px solid #93c5fd' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2563eb' }}>{percentage}%</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Score</div>
                        </div>
                        <div style={{ background: '#fef3c7', borderRadius: '1rem', padding: '1rem 1.5rem', border: '2px solid #fcd34d' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#d97706' }}>{formatTime(finalTime)}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Time</div>
                        </div>
                    </div>

                    <p style={{ fontSize: '1.1rem', color: '#31326F', fontWeight: 700, marginBottom: '1.5rem' }}>
                        {percentage >= 80 ? '🎉 Excellent work! You\'re a string expert!' : percentage >= 50 ? '👍 Good effort! Keep practicing!' : '💪 Keep going, you\'ll get better!'}
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="nav-pill-next-btn"
                        style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem' }}
                    >
                        Go Back <ChevronRight size={22} strokeWidth={3} />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-lg shadow-sm whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-base shadow-sm flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ flex: 1, overflow: 'hidden', padding: '0.75rem', display: 'flex', alignItems: 'stretch' }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="practice-left-col" style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}
                            >
                                <div className="question-card-modern" style={{ paddingLeft: '2rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                    <div className="question-header-modern" style={{ flex: '1 1 auto', minHeight: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 'bold', textAlign: 'center', justifyContent: 'center', overflow: 'visible', width: '100%' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            flex: '1 1 auto',
                                            minHeight: '0',
                                            overflow: 'hidden',
                                            padding: '0.5rem',
                                            background: 'rgba(255,255,255,0.5)',
                                            borderRadius: '1rem',
                                            marginTop: '0.4rem'
                                        }}>
                                            <div dangerouslySetInnerHTML={{ __html: currentQuestion.visual }} className="w-full flex justify-center" style={{ maxHeight: '100%', overflow: 'hidden' }} />
                                        </div>
                                    </div>
                                    <div className="interaction-area-modern" style={{ flex: '0 0 auto' }}>
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                    style={{ fontWeight: '500', fontSize: '1.5rem' }}
                                                    onClick={() => handleOptionSelect(option)}
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
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar" style={{ height: '70px', padding: '0 1rem' }}>
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
                        <div className="nav-buttons-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {qIndex > 0 && (
                                <button className="nav-pill-btn" onClick={handlePrev} style={{ background: 'white', border: '2px solid #4FB7B3', color: '#31326F', borderRadius: '999px', padding: '0.5rem 1.2rem', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                    <ChevronLeft size={22} strokeWidth={3} /> Prev
                                </button>
                            )}
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
                            {qIndex > 0 && (
                                <button onClick={handlePrev} style={{ background: 'white', border: '2px solid #4FB7B3', color: '#31326F', borderRadius: '999px', padding: '0.4rem 0.8rem', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                                    <ChevronLeft size={18} strokeWidth={3} /> Prev
                                </button>
                            )}
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

export default LongerShorterStrings;
