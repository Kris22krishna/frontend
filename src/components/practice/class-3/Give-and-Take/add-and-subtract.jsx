import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[randomInt(0, arr.length - 1)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const CORRECT_MESSAGES = [
    "🎉 Brilliant! You cracked the chain! 🎉",
    "✨ Amazing! Perfect arithmetic! ✨",
    "🚀 Super! Keep going! 🚀",
    "🌟 Spot on! You're a math star! 🌟",
    "💎 Excellent! Well done! 💎",
];

// ─── SVG HELPERS ──────────────────────────────────────────────────────────────

// Caterpillar chain: circle segments with a cute head
const drawCaterpillar = (values, color1, color2, startX = 40, y = 90, r = 28) => {
    const gap = r * 0.45;
    let svg = '';
    const cx0 = startX + r;
    // head
    svg += `<circle cx="${cx0}" cy="${y}" r="${r + 4}" fill="${color1}" stroke="#333" stroke-width="2.5"/>`;
    svg += `<circle cx="${cx0 - 7}" cy="${y - 8}" r="5" fill="white" stroke="#333" stroke-width="1.5"/>`;
    svg += `<circle cx="${cx0 + 7}" cy="${y - 8}" r="5" fill="white" stroke="#333" stroke-width="1.5"/>`;
    svg += `<circle cx="${cx0 - 7}" cy="${y - 8}" r="2.5" fill="#222"/>`;
    svg += `<circle cx="${cx0 + 7}" cy="${y - 8}" r="2.5" fill="#222"/>`;
    svg += `<path d="M${cx0 - 6},${y + 6} Q${cx0},${y + 14} ${cx0 + 6},${y + 6}" stroke="#333" stroke-width="2" fill="none"/>`;
    svg += `<text x="${cx0}" y="${y + 6}" text-anchor="middle" font-size="14" font-weight="900" fill="white" font-family="Arial">${values[0]}</text>`;
    // antennae
    svg += `<line x1="${cx0 - 8}" y1="${y - r - 4}" x2="${cx0 - 14}" y2="${y - r - 20}" stroke="#555" stroke-width="2"/><circle cx="${cx0 - 14}" cy="${y - r - 22}" r="3" fill="#ff6b6b"/>`;
    svg += `<line x1="${cx0 + 8}" y1="${y - r - 4}" x2="${cx0 + 14}" y2="${y - r - 20}" stroke="#555" stroke-width="2"/><circle cx="${cx0 + 14}" cy="${y - r - 22}" r="3" fill="#ff6b6b"/>`;
    // body segments
    for (let i = 1; i < values.length; i++) {
        const cx = cx0 + i * (2 * r + gap);
        const bg = i % 2 === 0 ? color1 : color2;
        svg += `<circle cx="${cx}" cy="${y}" r="${r}" fill="${bg}" stroke="#333" stroke-width="2"/>`;
        if (values[i] === '?') {
            svg += `<text x="${cx}" y="${y + 6}" text-anchor="middle" font-size="22" font-weight="900" fill="white" font-family="Arial">?</text>`;
        } else {
            svg += `<text x="${cx}" y="${y + 6}" text-anchor="middle" font-size="14" font-weight="900" fill="white" font-family="Arial">${values[i]}</text>`;
        }
    }
    // legs
    const step = 2 * r + gap;
    for (let i = 0; i < values.length; i++) {
        const cx = cx0 + i * step;
        svg += `<line x1="${cx - 10}" y1="${y + r}" x2="${cx - 16}" y2="${y + r + 18}" stroke="#555" stroke-width="2.5" stroke-linecap="round"/>`;
        svg += `<line x1="${cx + 10}" y1="${y + r}" x2="${cx + 16}" y2="${y + r + 18}" stroke="#555" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    return svg;
};

// Train with wagons
const drawTrain = (values, engineColor, wagonColors) => {
    const wx = 38, wh = 44, wr = 8, gap = 10;
    const wheelR = 10;
    const baseY = 120;
    let svg = '';
    // engine
    const ex = 10;
    svg += `<rect x="${ex}" y="${baseY - wh - 14}" width="${wx + 14}" height="${wh + 14}" rx="6" fill="${engineColor}" stroke="#333" stroke-width="2"/>`;
    svg += `<rect x="${ex + 4}" y="${baseY - wh - 10}" width="22" height="18" rx="3" fill="#B3E5FC"/>`;
    svg += `<rect x="${ex + 28}" y="${baseY - wh - 22}" width="14" height="14" rx="4" fill="#555"/>`;
    // chimney smoke
    svg += `<circle cx="${ex + 35}" cy="${baseY - wh - 30}" r="6" fill="#ccc" opacity="0.7"/>`;
    svg += `<circle cx="${ex + 40}" cy="${baseY - wh - 40}" r="8" fill="#eee" opacity="0.5"/>`;
    svg += `<text x="${ex + 25}" y="${baseY - 12}" text-anchor="middle" font-size="13" font-weight="900" fill="white" font-family="Arial">${values[0]}</text>`;
    svg += `<circle cx="${ex + 12}" cy="${baseY + 2}" r="${wheelR}" fill="#333"/><circle cx="${ex + 42}" cy="${baseY + 2}" r="${wheelR}" fill="#333"/>`;
    // wagons
    for (let i = 1; i < values.length; i++) {
        const wStartX = ex + wx + 14 + (i - 1) * (wx + gap) + gap;
        const wColor = wagonColors[(i - 1) % wagonColors.length];
        svg += `<rect x="${wStartX}" y="${baseY - wh}" width="${wx}" height="${wh}" rx="${wr}" fill="${wColor}" stroke="#333" stroke-width="2"/>`;
        svg += `<rect x="${wStartX + 4}" y="${baseY - wh + 4}" width="${wx - 8}" height="14" rx="3" fill="white" opacity="0.35"/>`;
        if (values[i] === '?') {
            svg += `<text x="${wStartX + wx / 2}" y="${baseY - 12}" text-anchor="middle" font-size="22" font-weight="900" fill="white" font-family="Arial">?</text>`;
        } else {
            svg += `<text x="${wStartX + wx / 2}" y="${baseY - 12}" text-anchor="middle" font-size="13" font-weight="900" fill="white" font-family="Arial">${values[i]}</text>`;
        }
        svg += `<circle cx="${wStartX + 10}" cy="${baseY + 2}" r="8" fill="#333"/><circle cx="${wStartX + wx - 10}" cy="${baseY + 2}" r="8" fill="#333"/>`;
        // coupler
        svg += `<rect x="${wStartX - gap}" y="${baseY - wh / 2 - 3}" width="${gap}" height="6" fill="#888" rx="2"/>`;
    }
    // track
    svg += `<rect x="5" y="${baseY + 10}" width="600" height="6" rx="3" fill="#A1887F"/>`;
    return svg;
};

// Snake body
const drawSnake = (values, headColor, bodyColors) => {
    const segW = 50, segH = 38, startX = 10, y = 70, gap = 4;
    let svg = '';
    // snake head
    svg += `<ellipse cx="${startX + 38}" cy="${y}" rx="38" ry="22" fill="${headColor}" stroke="#333" stroke-width="2.5"/>`;
    svg += `<circle cx="${startX + 22}" cy="${y - 8}" r="6" fill="white" stroke="#333" stroke-width="1.5"/>`;
    svg += `<circle cx="${startX + 22}" cy="${y - 8}" r="3" fill="#111"/>`;
    svg += `<path d="M${startX + 55},${y + 5} L${startX + 68},${y} L${startX + 55},${y - 5}" fill="#e74c3c"/>`;
    svg += `<text x="${startX + 36}" y="${y + 6}" text-anchor="middle" font-size="14" font-weight="900" fill="white" font-family="Arial">${values[0]}</text>`;
    // body
    for (let i = 1; i < values.length; i++) {
        const sx = startX + 76 + (i - 1) * (segW + gap);
        const bc = bodyColors[(i - 1) % bodyColors.length];
        svg += `<rect x="${sx}" y="${y - segH / 2}" width="${segW}" height="${segH}" rx="10" fill="${bc}" stroke="#333" stroke-width="2"/>`;
        if (values[i] === '?') {
            svg += `<text x="${sx + segW / 2}" y="${y + 7}" text-anchor="middle" font-size="22" font-weight="900" fill="white" font-family="Arial">?</text>`;
        } else {
            svg += `<text x="${sx + segW / 2}" y="${y + 7}" text-anchor="middle" font-size="14" font-weight="900" fill="white" font-family="Arial">${values[i]}</text>`;
        }
    }
    // tail
    const tailX = startX + 76 + (values.length - 1) * (segW + gap);
    svg += `<path d="M${tailX},${y} Q${tailX + 20},${y - 20} ${tailX + 30},${y + 10}" stroke="${headColor}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    return svg;
};

// Rocket chain
const drawRocket = (values, rocketColor, cloudColor) => {
    let svg = '';
    const spacing = 68;
    // stars background
    for (let s = 0; s < 8; s++) {
        const sx = randomInt(5, 440), sy = randomInt(5, 50);
        svg += `<circle cx="${sx}" cy="${sy}" r="${randomInt(1, 3)}" fill="#FFD700" opacity="0.7"/>`;
    }
    values.forEach((v, i) => {
        const cx = 30 + i * spacing;
        const isRocket = i === 0;
        if (isRocket) {
            // big rocket
            svg += `<polygon points="${cx},10 ${cx - 18},60 ${cx + 18},60" fill="${rocketColor}" stroke="#333" stroke-width="2"/>`;
            svg += `<rect x="${cx - 18}" y="60" width="36" height="28" rx="4" fill="${rocketColor}" stroke="#333" stroke-width="2"/>`;
            svg += `<circle cx="${cx}" cy="52" r="10" fill="#B3E5FC" stroke="#333" stroke-width="1.5"/>`;
            svg += `<polygon points="${cx - 28},60 ${cx - 18},78 ${cx - 18},60" fill="#FF7043"/>`;
            svg += `<polygon points="${cx + 28},60 ${cx + 18},78 ${cx + 18},60" fill="#FF7043"/>`;
            svg += `<ellipse cx="${cx}" cy="92" rx="10" ry="6" fill="#FF5722" opacity="0.9"/>`;
            svg += `<ellipse cx="${cx}" cy="97" rx="6" ry="4" fill="#FF9800" opacity="0.7"/>`;
            svg += `<text x="${cx}" y="75" text-anchor="middle" font-size="12" font-weight="900" fill="white" font-family="Arial">${v}</text>`;
        } else {
            // cloud/planet node
            svg += `<ellipse cx="${cx}" cy="60" rx="24" ry="18" fill="${cloudColor}" stroke="#aaa" stroke-width="1.5"/>`;
            svg += `<ellipse cx="${cx - 10}" cy="50" rx="16" ry="12" fill="${cloudColor}" stroke="#aaa" stroke-width="1.5"/>`;
            svg += `<ellipse cx="${cx + 10}" cy="50" rx="16" ry="12" fill="${cloudColor}" stroke="#aaa" stroke-width="1.5"/>`;
            if (v === '?') {
                svg += `<text x="${cx}" y="64" text-anchor="middle" font-size="22" font-weight="900" fill="#31326F" font-family="Arial">?</text>`;
            } else {
                svg += `<text x="${cx}" y="64" text-anchor="middle" font-size="13" font-weight="900" fill="#31326F" font-family="Arial">${v}</text>`;
            }
            // dashed arrow connector
            if (i > 1) {
                svg += `<line x1="${cx - spacing + 24}" y1="60" x2="${cx - 24}" y2="60" stroke="#888" stroke-width="2" stroke-dasharray="5"/>`;
                svg += `<polygon points="${cx - 26},55 ${cx - 24},60 ${cx - 26},65" fill="#888"/>`;
            } else {
                svg += `<line x1="${cx - spacing + 18}" y1="60" x2="${cx - 24}" y2="60" stroke="#888" stroke-width="2" stroke-dasharray="5"/>`;
                svg += `<polygon points="${cx - 26},55 ${cx - 24},60 ${cx - 26},65" fill="#888"/>`;
            }
        }
    });
    return svg;
};

// Flower chain
const drawFlowers = (values, petalColor, centerColor) => {
    let svg = '';
    const spacing = 65;
    const petalAngles = [0, 60, 120, 180, 240, 300];
    values.forEach((v, i) => {
        const cx = 35 + i * spacing;
        const cy = 70;
        // stem
        svg += `<line x1="${cx}" y1="${cy + 22}" x2="${cx}" y2="${cy + 48}" stroke="#4CAF50" stroke-width="3"/>`;
        // leaves
        svg += `<ellipse cx="${cx - 12}" cy="${cy + 36}" rx="10" ry="5" fill="#66BB6A" transform="rotate(-30,${cx - 12},${cy + 36})"/>`;
        // petals
        petalAngles.forEach(a => {
            const rx = a * Math.PI / 180;
            const px = cx + 18 * Math.cos(rx), py = cy + 18 * Math.sin(rx);
            svg += `<ellipse cx="${px}" cy="${py}" rx="9" ry="6" fill="${petalColor}" transform="rotate(${a},${px},${py})" opacity="0.9"/>`;
        });
        svg += `<circle cx="${cx}" cy="${cy}" r="16" fill="${centerColor}" stroke="#333" stroke-width="2"/>`;
        if (v === '?') {
            svg += `<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="18" font-weight="900" fill="white" font-family="Arial">?</text>`;
        } else {
            svg += `<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="12" font-weight="900" fill="white" font-family="Arial">${v}</text>`;
        }
        // pot
        svg += `<ellipse cx="${cx}" cy="${cy + 52}" rx="13" ry="7" fill="#A1887F"/>`;
        svg += `<rect x="${cx - 10}" y="${cy + 48}" width="20" height="14" rx="3" fill="#8D6E63"/>`;
        // connector arrow
        if (i < values.length - 1) {
            svg += `<line x1="${cx + 16}" y1="${cy}" x2="${cx + spacing - 16}" y2="${cy}" stroke="#ccc" stroke-width="2" stroke-dasharray="4"/>`;
            svg += `<polygon points="${cx + spacing - 18},${cy - 5} ${cx + spacing - 14},${cy} ${cx + spacing - 18},${cy + 5}" fill="#ccc"/>`;
        }
    });
    return svg;
};

// Fish chain
const drawFish = (values, fishColors) => {
    let svg = '';
    // water waves
    svg += `<rect x="0" y="0" width="500" height="130" rx="8" fill="#E3F2FD" opacity="0.7"/>`;
    for (let w = 0; w < 5; w++) {
        svg += `<path d="M${w * 90},100 Q${w * 90 + 22},90 ${w * 90 + 45},100 Q${w * 90 + 68},110 ${w * 90 + 90},100" stroke="#90CAF9" stroke-width="2" fill="none" opacity="0.8"/>`;
    }
    // bubbles
    for (let b = 0; b < 6; b++) {
        svg += `<circle cx="${randomInt(20, 450)}" cy="${randomInt(10, 80)}" r="${randomInt(3, 7)}" fill="none" stroke="#90CAF9" stroke-width="1.5" opacity="0.6"/>`;
    }
    const spacing = 78;
    values.forEach((v, i) => {
        const cx = 45 + i * spacing;
        const cy = 60;
        const fc = fishColors[i % fishColors.length];
        // tail
        svg += `<polygon points="${cx - 28},${cy - 18} ${cx - 14},${cy} ${cx - 28},${cy + 18}" fill="${fc}" opacity="0.8"/>`;
        // body
        svg += `<ellipse cx="${cx}" cy="${cy}" rx="26" ry="18" fill="${fc}" stroke="#333" stroke-width="1.5"/>`;
        // fin top
        svg += `<polygon points="${cx - 6},${cy - 18} ${cx + 6},${cy - 18} ${cx},${cy - 30}" fill="${fc}" opacity="0.7"/>`;
        // eye
        svg += `<circle cx="${cx + 16}" cy="${cy - 5}" r="5" fill="white" stroke="#333" stroke-width="1.5"/>`;
        svg += `<circle cx="${cx + 17}" cy="${cy - 5}" r="2.5" fill="#222"/>`;
        // smile
        svg += `<path d="M${cx + 10},${cy + 5} Q${cx + 18},${cy + 10} ${cx + 22},${cy + 3}" stroke="#333" stroke-width="1.5" fill="none"/>`;
        if (v === '?') {
            svg += `<text x="${cx - 3}" y="${cy + 6}" text-anchor="middle" font-size="18" font-weight="900" fill="white" font-family="Arial">?</text>`;
        } else {
            svg += `<text x="${cx - 3}" y="${cy + 6}" text-anchor="middle" font-size="12" font-weight="900" fill="white" font-family="Arial">${v}</text>`;
        }
        // bubbles from mouth
        svg += `<circle cx="${cx + 26}" cy="${cy - 10}" r="3" fill="none" stroke="#90CAF9" stroke-width="1.5"/>`;
        svg += `<circle cx="${cx + 30}" cy="${cy - 20}" r="4" fill="none" stroke="#90CAF9" stroke-width="1.5"/>`;
    });
    return svg;
};

// Hot air balloons
const drawBalloons = (values, balloonColors) => {
    let svg = '';
    // sky
    svg += `<rect x="0" y="0" width="500" height="150" rx="8" fill="#E1F5FE" opacity="0.6"/>`;
    // clouds
    svg += `<ellipse cx="80" cy="20" rx="30" ry="14" fill="white" opacity="0.8"/>`;
    svg += `<ellipse cx="300" cy="15" rx="25" ry="12" fill="white" opacity="0.7"/>`;
    svg += `<ellipse cx="420" cy="25" rx="22" ry="10" fill="white" opacity="0.75"/>`;
    const spacing = 80;
    values.forEach((v, i) => {
        const cx = 40 + i * spacing;
        const cy = 65;
        const bc = balloonColors[i % balloonColors.length];
        // balloon envelope
        svg += `<ellipse cx="${cx}" cy="${cy}" rx="28" ry="36" fill="${bc}" stroke="#333" stroke-width="2"/>`;
        // stripes
        svg += `<line x1="${cx - 10}" y1="${cy - 36}" x2="${cx - 10}" y2="${cy + 36}" stroke="white" stroke-width="3" opacity="0.4"/>`;
        svg += `<line x1="${cx + 10}" y1="${cy - 36}" x2="${cx + 10}" y2="${cy + 36}" stroke="white" stroke-width="3" opacity="0.4"/>`;
        // basket ropes
        svg += `<line x1="${cx - 16}" y1="${cy + 34}" x2="${cx - 10}" y2="${cy + 50}" stroke="#795548" stroke-width="1.5"/>`;
        svg += `<line x1="${cx + 16}" y1="${cy + 34}" x2="${cx + 10}" y2="${cy + 50}" stroke="#795548" stroke-width="1.5"/>`;
        // basket
        svg += `<rect x="${cx - 14}" y="${cy + 50}" width="28" height="16" rx="3" fill="#A1887F" stroke="#333" stroke-width="1.5"/>`;
        if (v === '?') {
            svg += `<text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="20" font-weight="900" fill="white" font-family="Arial">?</text>`;
        } else {
            svg += `<text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="13" font-weight="900" fill="white" font-family="Arial">${v}</text>`;
        }
        // dashed line connector
        if (i < values.length - 1) {
            svg += `<line x1="${cx + 28}" y1="${cy}" x2="${cx + spacing - 28}" y2="${cy}" stroke="#aaa" stroke-width="2" stroke-dasharray="5"/>`;
        }
    });
    return svg;
};

// ─── QUESTION GENERATORS ──────────────────────────────────────────────────────

const buildChain = (start, op, step, length) => {
    const chain = [start];
    for (let i = 1; i < length; i++) {
        chain.push(op === '+' ? chain[i - 1] + step : chain[i - 1] - step);
    }
    return chain;
};

const makeQuestion = (chain, blankIdx, label, visual, op, step) => {
    const answer = chain[blankIdx];
    const display = chain.map((v, i) => i === blankIdx ? '?' : String(v));
    const wrong = shuffle([answer + step, answer - step, answer + step * 2, answer - step * 2]
        .filter(v => v !== answer && v > 0)).slice(0, 3);
    const options = shuffle([String(answer), ...wrong.map(String)]);
    return {
        display,
        answer: String(answer),
        options,
        op, step,
        visual: visual(display),
        solution: `The chain ${op === '+' ? 'adds' : 'subtracts'} ${step} each time. So the missing number is ${answer}.`,
        text: `Fill in the <b>missing number</b> in the chain!<br/><span style="color:#31326F;font-size:0.95rem">Rule: ${op === '+' ? 'Add' : 'Subtract'} <b>${step}</b> each time</span>`
    };
};

const questionGenerators = [
    // Q1: Caterpillar — Add
    () => {
        const step = pick([2, 3, 4, 5, 6]);
        const start = randomInt(100, 450);
        const chain = buildChain(start, '+', step, 6);
        const bi = randomInt(2, 5);
        const colors = [pick(['#66BB6A', '#26A69A', '#42A5F5']), pick(['#FFA726', '#EF5350', '#AB47BC'])];
        return makeQuestion(chain, bi, 'caterpillar', d =>
            `<svg viewBox="0 0 ${40 + 6 * 64} 140" width="100%" height="130" style="overflow:visible">${drawCaterpillar(d, colors[0], colors[1])}</svg>`, '+', step);
    },
    // Q2: Train — Subtract
    () => {
        const step = pick([3, 4, 5, 6, 7]);
        const start = randomInt(200, 550);
        const chain = buildChain(start, '-', step, 5);
        const bi = randomInt(1, 4);
        const engineColor = pick(['#EF5350', '#42A5F5', '#AB47BC', '#FF7043']);
        const wagonColors = ['#FFCA28', '#66BB6A', '#26C6DA', '#EC407A', '#78909C'];
        return makeQuestion(chain, bi, 'train', d =>
            `<svg viewBox="0 0 500 145" width="100%" height="135" style="overflow:visible">${drawTrain(d, engineColor, shuffle(wagonColors))}</svg>`, '-', step);
    },
    // Q3: Snake — Add
    () => {
        const step = pick([5, 6, 7, 8, 9]);
        const start = randomInt(150, 400);
        const chain = buildChain(start, '+', step, 6);
        const bi = randomInt(1, 5);
        const headColor = pick(['#EF5350', '#7E57C2', '#26A69A', '#FFA726']);
        const bodyColors = shuffle(['#FFCA28', '#66BB6A', '#EF9A9A', '#80CBC4', '#B39DDB']);
        return makeQuestion(chain, bi, 'snake', d =>
            `<svg viewBox="0 0 ${76 + 6 * 54} 140" width="100%" height="130" style="overflow:visible">${drawSnake(d, headColor, bodyColors)}</svg>`, '+', step);
    },
    // Q4: Rocket — Subtract
    () => {
        const step = pick([8, 9, 10, 11, 12]);
        const start = randomInt(250, 600);
        const chain = buildChain(start, '-', step, 6);
        const bi = randomInt(1, 5);
        const rocketColor = pick(['#EF5350', '#7E57C2', '#FF7043', '#42A5F5']);
        const cloudColor = pick(['#F5F5F5', '#E8EAF6', '#E0F7FA']);
        return makeQuestion(chain, bi, 'rocket', d =>
            `<svg viewBox="0 0 430 115" width="100%" height="110" style="overflow:visible">${drawRocket(d, rocketColor, cloudColor)}</svg>`, '-', step);
    },
    // Q5: Flowers — Add
    () => {
        const step = pick([3, 4, 6, 7]);
        const start = randomInt(120, 380);
        const chain = buildChain(start, '+', step, 6);
        const bi = randomInt(1, 5);
        const petalColor = pick(['#F48FB1', '#FFCC80', '#CE93D8', '#80CBC4', '#EF9A9A']);
        const centerColor = pick(['#E91E63', '#FF9800', '#9C27B0', '#00BCD4']);
        return makeQuestion(chain, bi, 'flowers', d =>
            `<svg viewBox="0 0 430 130" width="100%" height="125" style="overflow:visible">${drawFlowers(d, petalColor, centerColor)}</svg>`, '+', step);
    },
    // Q6: Fish — Subtract
    () => {
        const step = pick([5, 6, 7, 9, 11]);
        const start = randomInt(200, 500);
        const chain = buildChain(start, '-', step, 5);
        const bi = randomInt(1, 4);
        const fishColors = shuffle(['#42A5F5', '#66BB6A', '#FFA726', '#EC407A', '#7E57C2']);
        return makeQuestion(chain, bi, 'fish', d =>
            `<svg viewBox="0 0 430 140" width="100%" height="130" style="overflow:visible">${drawFish(d, fishColors)}</svg>`, '-', step);
    },
    // Q7: Hot Air Balloons — Add
    () => {
        const step = pick([10, 11, 12, 13, 15]);
        const start = randomInt(100, 300);
        const chain = buildChain(start, '+', step, 5);
        const bi = randomInt(1, 4);
        const balloonColors = shuffle(['#EF5350', '#AB47BC', '#42A5F5', '#FF7043', '#66BB6A']);
        return makeQuestion(chain, bi, 'balloons', d =>
            `<svg viewBox="0 0 440 145" width="100%" height="135" style="overflow:visible">${drawBalloons(d, balloonColors)}</svg>`, '+', step);
    },
    // Q8: Caterpillar — Subtract (bigger numbers)
    () => {
        const step = pick([4, 5, 6, 8, 9]);
        const start = randomInt(300, 600);
        const chain = buildChain(start, '-', step, 6);
        const bi = randomInt(1, 5);
        const colors = [pick(['#7E57C2', '#EC407A', '#26A69A']), pick(['#FFCA28', '#FF7043', '#42A5F5'])];
        return makeQuestion(chain, bi, 'caterpillar2', d =>
            `<svg viewBox="0 0 ${40 + 6 * 64} 140" width="100%" height="130" style="overflow:visible">${drawCaterpillar(d, colors[0], colors[1])}</svg>`, '-', step);
    },
    // Q9: Train — Add (large steps)
    () => {
        const step = pick([7, 8, 10, 12, 15]);
        const start = randomInt(100, 350);
        const chain = buildChain(start, '+', step, 5);
        const bi = randomInt(1, 4);
        const engineColor = pick(['#26A69A', '#66BB6A', '#FFCA28', '#EC407A']);
        const wagonColors = ['#EF9A9A', '#B39DDB', '#80CBC4', '#FFCC80', '#A5D6A7'];
        return makeQuestion(chain, bi, 'train2', d =>
            `<svg viewBox="0 0 500 145" width="100%" height="135" style="overflow:visible">${drawTrain(d, engineColor, shuffle(wagonColors))}</svg>`, '+', step);
    },
    // Q10: Snake — Subtract (big numbers)
    () => {
        const step = pick([9, 10, 11, 12, 13]);
        const start = randomInt(400, 700);
        const chain = buildChain(start, '-', step, 6);
        const bi = randomInt(1, 5);
        const headColor = pick(['#FF7043', '#42A5F5', '#66BB6A', '#EC407A']);
        const bodyColors = shuffle(['#FFA726', '#26C6DA', '#AB47BC', '#EF5350', '#78909C']);
        return makeQuestion(chain, bi, 'snake2', d =>
            `<svg viewBox="0 0 ${76 + 6 * 54} 140" width="100%" height="130" style="overflow:visible">${drawSnake(d, headColor, bodyColors)}</svg>`, '-', step);
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const AddAndSubtract = () => {
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

    const SKILL_ID = 9009;
    const SKILL_NAME = 'Add and Subtract';
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

    const generateQuestion = (idx) => {
        const gen = questionGenerators[idx % questionGenerators.length];
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
        const isRight = selectedOption === currentQuestion.answer;
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
                question_text: 'Add and Subtract chain',
                correct_answer: String(currentQuestion.answer),
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

    if (showReport) {
        const totalCorrect = Object.values(answers).filter(v => v === true).length;
        const percentage = Math.round((totalCorrect / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                    style={{ background: 'white', borderRadius: '2rem', padding: '2.5rem 3rem', maxWidth: '480px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(79,183,179,0.2)', border: '3px solid rgba(79,183,179,0.3)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{percentage >= 80 ? '🌟🌟🌟' : percentage >= 50 ? '⭐⭐' : '⭐'}</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#31326F', marginBottom: '0.25rem' }}>Practice Complete!</h2>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Add &amp; Subtract Chains</p>
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
                        {percentage >= 80 ? "🎉 Excellent! You're a chain master!" : percentage >= 50 ? '👍 Good effort! Keep practicing!' : '💪 Keep going, you\'ll improve!'}
                    </p>
                    <button onClick={() => navigate(-1)} className="nav-pill-next-btn" style={{ width: '100%', justifyContent: 'center' }}>
                        Go Back <ChevronRight size={22} strokeWidth={3} />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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

            <main className="practice-content-wrapper" style={{ flex: 1, overflow: 'hidden', padding: '0.75rem', display: 'flex', alignItems: 'stretch' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="question-card-modern" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div className="question-header-modern" style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                    <h2 className="question-text-modern" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.25rem)', fontWeight: 600, textAlign: 'center' }}>
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
                                                className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.answer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                style={{
                                                    fontWeight: 700,
                                                    fontSize: '1.1rem',
                                                    ...(isSubmitted && option === currentQuestion.answer && {
                                                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                                        borderColor: '#16a34a',
                                                        color: 'white',
                                                        boxShadow: '0 4px 15px rgba(34,197,94,0.4)',
                                                    }),
                                                    ...(isSubmitted && selectedOption === option && !isCorrect && {
                                                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                                        borderColor: '#dc2626',
                                                        color: 'white',
                                                        boxShadow: '0 4px 15px rgba(239,68,68,0.4)',
                                                    }),
                                                }}
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
                correctAnswer={currentQuestion.answer} explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar" style={{ height: '70px', padding: '0 1rem' }}>
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

export default AddAndSubtract;
