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
    '🎉 Perfect match! You know your money! 🎉',
    '✨ Brilliant! That\'s exactly right! ✨',
    '🚀 Super! You\'re a money expert! 🚀',
    '🌟 Spot on! Great work! 🌟',
    '💎 Excellent! Keep it up! 💎',
];

// ─── SVG CURRENCY HELPERS ─────────────────────────────────────────────────────

// Draw a realistic Indian banknote (w×h default 80×42)
const note = (x, y, denom, w = 80, h = 42) => {
    const themes = {
        500: { bg: '#6A1B9A', mid: '#9C27B0', light: '#CE93D8', stripe: '#AB47BC' },
        200: { bg: '#BF360C', mid: '#E64A19', light: '#FF8A65', stripe: '#FF7043' },
        100: { bg: '#1A237E', mid: '#283593', light: '#7986CB', stripe: '#5C6BC0' },
        50: { bg: '#004D40', mid: '#00695C', light: '#4DB6AC', stripe: '#26A69A' },
        20: { bg: '#B71C1C', mid: '#C62828', light: '#EF9A9A', stripe: '#E57373' },
        10: { bg: '#4E342E', mid: '#6D4C41', light: '#BCAAA4', stripe: '#8D6E63' },
        5: { bg: '#1B5E20', mid: '#2E7D32', light: '#81C784', stripe: '#66BB6A' },
    };
    const t = themes[denom] || { bg: '#455A64', mid: '#607D8B', light: '#B0BEC5', stripe: '#90A4AE' };
    const gid = `ng${denom}x${Math.random().toString(36).slice(2, 6)}`;
    const px = Math.round, ph = Math.round;
    return `
<g transform="translate(${x},${y})">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.light}" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="${t.mid}"/>
      <stop offset="100%" stop-color="${t.bg}"/>
    </linearGradient>
  </defs>
  <!-- Base note body -->
  <rect width="${w}" height="${h}" rx="5" fill="url(#${gid})" stroke="${t.light}" stroke-width="0.8"/>
  <!-- Inner border -->
  <rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="4" fill="none" stroke="${t.light}" stroke-width="0.6" opacity="0.6"/>
  <!-- Left portrait panel -->
  <rect x="3" y="3" width="${px(w * 0.28)}" height="${h - 6}" rx="3" fill="${t.light}" opacity="0.15"/>
  <!-- Gandhi head silhouette -->
  <ellipse cx="${px(w * 0.14)}" cy="${px(h * 0.45)}" rx="7" ry="9" fill="${t.light}" opacity="0.5"/>
  <ellipse cx="${px(w * 0.14)}" cy="${px(h * 0.28)}" rx="5.5" ry="6" fill="${t.light}" opacity="0.6"/>
  <!-- Glasses line -->
  <line x1="${px(w * 0.095)}" y1="${px(h * 0.27)}" x2="${px(w * 0.185)}" y2="${px(h * 0.27)}" stroke="white" stroke-width="0.8" opacity="0.45"/>
  <!-- RBI top banner -->
  <rect x="${px(w * 0.31)}" y="3" width="${px(w * 0.44)}" height="9" rx="2" fill="${t.light}" opacity="0.18"/>
  <text x="${px(w * 0.53)}" y="10" text-anchor="middle" font-size="4.5" font-weight="700" fill="white" font-family="Arial" opacity="0.85">भारतीय रिज़र्व बैंक</text>
  <!-- Denomination (large) -->
  <text x="${px(w * 0.56)}" y="${px(h * 0.67)}" text-anchor="middle" font-size="${denom >= 100 ? 14 : 13}" font-weight="900" fill="white" font-family="Arial">₹${denom}</text>
  <!-- RUPEES label -->
  <text x="${px(w * 0.56)}" y="${px(h * 0.86)}" text-anchor="middle" font-size="4" fill="white" font-family="Arial" opacity="0.6">RUPEES</text>
  <!-- Security thread (vertical strip) -->
  <rect x="${px(w * 0.82)}" y="3" width="4" height="${h - 6}" rx="2" fill="${t.stripe}" opacity="0.45"/>
  <line x1="${px(w * 0.84)}" y1="4" x2="${px(w * 0.84)}" y2="${h - 4}" stroke="white" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.5"/>
  <!-- Ashoka pillar (right area) -->
  <rect x="${px(w * 0.87)}" y="${px(h * 0.5)}" width="6" height="10" rx="1" fill="${t.light}" opacity="0.3"/>
  <ellipse cx="${px(w * 0.90)}" cy="${px(h * 0.5)}" rx="3.5" ry="1.8" fill="${t.light}" opacity="0.3"/>
</g>`;
};

// Draw a realistic Indian coin with metallic gradient + milled edge
const coin = (cx, cy, denom, r = 17) => {
    const themes = {
        10: { rim: '#A0522D', face1: '#CD853F', face2: '#FFD700', shine: '#FFF8DC', text: '#4E2A04' },
        5: { rim: '#8B6914', face1: '#B8860B', face2: '#DAA520', shine: '#FFFDE7', text: '#4E2A04' },
        2: { rim: '#616161', face1: '#9E9E9E', face2: '#E0E0E0', shine: '#F5F5F5', text: '#212121' },
        1: { rim: '#795548', face1: '#A1887F', face2: '#D7CCC8', shine: '#EFEBE9', text: '#3E2723' },
    };
    const t = themes[denom] || { rim: '#757575', face1: '#9E9E9E', face2: '#E0E0E0', shine: '#F5F5F5', text: '#333' };
    const gid = `cg${denom}x${Math.random().toString(36).slice(2, 6)}`;
    const ticks = Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const x1 = (cx + Math.cos(a) * (r - 0.5)).toFixed(1), y1 = (cy + Math.sin(a) * (r - 0.5)).toFixed(1);
        const x2 = (cx + Math.cos(a) * (r - 3)).toFixed(1), y2 = (cy + Math.sin(a) * (r - 3)).toFixed(1);
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${t.shine}" stroke-width="1" opacity="0.55"/>`;
    }).join('');
    return `
<g>
  <defs>
    <radialGradient id="${gid}" cx="35%" cy="30%" r="68%">
      <stop offset="0%" stop-color="${t.shine}"/>
      <stop offset="35%" stop-color="${t.face2}"/>
      <stop offset="85%" stop-color="${t.face1}"/>
      <stop offset="100%" stop-color="${t.rim}"/>
    </radialGradient>
  </defs>
  <!-- Drop shadow -->
  <circle cx="${cx + 1.5}" cy="${cy + 1.5}" r="${r}" fill="rgba(0,0,0,0.22)"/>
  <!-- Rim -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${t.rim}"/>
  <!-- Milled edge ticks -->
  ${ticks}
  <!-- Face -->
  <circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="url(#${gid})"/>
  <!-- Inner ring -->
  <circle cx="${cx}" cy="${cy}" r="${r - 6.5}" fill="none" stroke="${t.rim}" stroke-width="0.8" opacity="0.45"/>
  <!-- Ashoka pillar (3 vertical lines + arc) -->
  <rect x="${cx - 1.5}" y="${cy - r + 9}" width="3" height="${Math.round(r * 0.45)}" rx="1" fill="${t.text}" opacity="0.55"/>
  <line x1="${cx - 5}" y1="${cy - r + 12}" x2="${cx - 5}" y2="${cy - r + 9 + Math.round(r * 0.45)}" stroke="${t.text}" stroke-width="1" opacity="0.35"/>
  <line x1="${cx + 5}" y1="${cy - r + 12}" x2="${cx + 5}" y2="${cy - r + 9 + Math.round(r * 0.45)}" stroke="${t.text}" stroke-width="1" opacity="0.35"/>
  <path d="M${cx - 6},${cy - r + 10} Q${cx},${cy - r + 6} ${cx + 6},${cy - r + 10}" fill="${t.text}" opacity="0.45"/>
  <!-- ₹ denomination text -->
  <text x="${cx}" y="${cy + r - 5}" text-anchor="middle" font-size="${r >= 15 ? 10 : 8}" font-weight="900" fill="${t.text}" font-family="Arial">₹${denom}</text>
</g>`;
};

// Layout individual notes+coins, auto-wrap rows, return svg + actual dims
const renderMoney = (items, startX = 10, startY = 10, maxW = 280) => {
    let svg = '', x = startX, y = startY;
    let total = 0;
    let maxX = startX;
    items.forEach(({ type, denom, qty }) => {
        total += denom * qty;
        for (let i = 0; i < qty; i++) {
            if (type === 'note') {
                const nw = 82, nh = 44;
                if (x + nw > maxW + startX) { x = startX; y += nh + 8; }
                svg += note(x, y, denom, nw, nh);
                x += nw + 5;
                maxX = Math.max(maxX, x);
            } else {
                const r = 20;
                if (x + r * 2 > maxW + startX) { x = startX; y += r * 2 + 8; }
                svg += coin(x + r, y + r, denom, r);
                x += r * 2 + 6;
                maxX = Math.max(maxX, x);
            }
        }
    });
    const contentH = y + (items.some(i => i.type === 'note') ? 54 : 50);
    return { svg, total, contentW: Math.min(maxX, maxW + startX + 10), contentH };
};

// Draw a price tag for an item
const priceTag = (cx, cy, price, itemEmoji, itemLabel) => `
  <g>
    <ellipse cx="${cx}" cy="${cy - 18}" rx="28" ry="22" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
    <text x="${cx}" y="${cy - 12}" text-anchor="middle" font-size="20">${itemEmoji}</text>
    <rect x="${cx - 28}" y="${cy + 6}" width="56" height="22" rx="6" fill="#E53935"/>
    <text x="${cx}" y="${cy + 21}" text-anchor="middle" font-size="11" font-weight="900" fill="white" font-family="Arial">₹${price}</text>
    <text x="${cx}" y="${cy + 40}" text-anchor="middle" font-size="10" fill="#555" font-family="Arial">${itemLabel}</text>
  </g>`;

// Draw a piggy bank with coins going in — large, clear
const piggyBank = (cx, cy, coins, total) => {
    const cr = 22; // coin radius
    const perRow = 4;
    const rowH = cr * 2 + 8;
    let coinSvg = '';
    coins.forEach((c, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const totalInRow = Math.min(perRow, coins.length - row * perRow);
        const rowStartX = cx - ((totalInRow - 1) * (cr * 2 + 8)) / 2;
        const coinX = rowStartX + col * (cr * 2 + 8);
        const coinY = cy - 75 - row * rowH;
        coinSvg += coin(coinX, coinY, c, cr);
        // Dashed drop-line
        coinSvg += `<line x1="${coinX}" y1="${coinY + cr}" x2="${cx}" y2="${cy - 48}" stroke="#F48FB1" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>`;
    });
    // Scale pig up (rx=55,ry=44)
    return `
  <g>
    <ellipse cx="${cx}" cy="${cy}" rx="55" ry="44" fill="#F48FB1" stroke="#C2185B" stroke-width="2.5"/>
    <ellipse cx="${cx + 46}" cy="${cy - 6}" rx="17" ry="13" fill="#F06292"/>
    <!-- nostrils -->
    <ellipse cx="${cx + 42}" cy="${cy - 4}" rx="4" ry="3" fill="#C2185B" opacity="0.5"/>
    <ellipse cx="${cx + 51}" cy="${cy - 4}" rx="4" ry="3" fill="#C2185B" opacity="0.5"/>
    <circle cx="${cx - 26}" cy="${cy - 14}" r="8" fill="white"/>
    <circle cx="${cx - 24}" cy="${cy - 13}" r="3.5" fill="#333"/>
    <!-- legs -->
    <ellipse cx="${cx - 18}" cy="${cy + 38}" rx="9" ry="5" fill="#CE93D8"/>
    <ellipse cx="${cx - 2}" cy="${cy + 42}" rx="9" ry="5" fill="#CE93D8"/>
    <ellipse cx="${cx + 14}" cy="${cy + 38}" rx="9" ry="5" fill="#CE93D8"/>
    <!-- coin slot on top -->
    <rect x="${cx - 7}" y="${cy - 47}" width="14" height="6" rx="3" fill="#795548"/>
    <!-- total label -->
    <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="18" font-weight="900" fill="#880E4F" font-family="Arial">₹${total}</text>
    ${coinSvg}
  </g>`;
};


// Draw a shop shelf with items
const shopItem = (x, y, emoji, price, label) => `
  <g>
    <rect x="${x}" y="${y}" width="70" height="70" rx="10" fill="#E8F5E9" stroke="#43A047" stroke-width="1.5"/>
    <text x="${x + 35}" y="${y + 38}" text-anchor="middle" font-size="26">${emoji}</text>
    <rect x="${x + 5}" y="${y + 48}" width="60" height="18" rx="5" fill="#43A047"/>
    <text x="${x + 35}" y="${y + 60}" text-anchor="middle" font-size="10" font-weight="900" fill="white" font-family="Arial">₹${price} ${label}</text>
  </g>`;

// Wallet SVG
const wallet = (cx, cy, amount, color = '#FF8F00') => `
  <g>
    <rect x="${cx - 32}" y="${cy - 22}" width="64" height="44" rx="8" fill="${color}" stroke="#E65100" stroke-width="2"/>
    <rect x="${cx - 28}" y="${cy - 18}" width="56" height="36" rx="6" fill="#FFE0B2"/>
    <circle cx="${cx + 20}" cy="${cy}" r="10" fill="${color}" stroke="#E65100" stroke-width="1.5"/>
    <circle cx="${cx + 20}" cy="${cy}" r="5" fill="#FFE0B2"/>
    <text x="${cx - 5}" y="${cy + 5}" text-anchor="middle" font-size="12" font-weight="900" fill="#E65100" font-family="Arial">₹${amount}</text>
  </g>`;

// Arrow SVG between two columns
const matchArrow = (x1, y1, x2, y2, color = '#4CAF50') => `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" stroke-dasharray="5"/>
  <polygon points="${x2 - 5},${y2 - 4} ${x2},${y2} ${x2 - 5},${y2 + 4}" fill="${color}"/>`;

// ─── QUESTION GENERATORS ──────────────────────────────────────────────────────

const makeMoneyOption = (items) => {
    const { svg, total, height } = renderMoney(items);
    return { svg, total, height: Math.max(height, 55), label: `₹${total}` };
};

// Render money into an SVG that auto-scales to fit the option box
// All notes/coins always visible — nothing clipped
const moneyOptionSVG = (items, boxW = 300, boxH = 110) => {
    // Lay out with generous per-row width; snap to 3 notes per row max
    const perRowW = Math.min(boxW * 3.5, 360); // internal layout width
    const { svg, total, contentW, contentH } = renderMoney(items, 8, 8, perRowW);
    // Scale to fit in boxH with preserveAspectRatio
    return `<svg viewBox="0 0 ${perRowW + 16} ${contentH}" width="100%" height="${Math.min(contentH, boxH)}" preserveAspectRatio="xMidYMid meet" style="display:block;overflow:hidden">${svg}</svg>`;
};

const questionGenerators = [

    // Q1: Match equivalent amounts — left column vs right column (MCQ: pick the equal right side)
    () => {
        const leftItems = [{ type: 'note', denom: 50, qty: 2 }]; // ₹100
        const correctItems = [{ type: 'note', denom: 10, qty: 8 }, { type: 'note', denom: 20, qty: 1 }];
        const wrong1 = [{ type: 'note', denom: 10, qty: 9 }];
        const wrong2 = [{ type: 'note', denom: 50, qty: 1 }, { type: 'coin', denom: 10, qty: 5 }];
        const wrong3 = [{ type: 'note', denom: 20, qty: 3 }, { type: 'note', denom: 10, qty: 2 }];
        const leftTotal = 100;
        const options = shuffle([
            { label: moneyOptionSVG(correctItems), value: 'correct', total: 100 },
            { label: moneyOptionSVG(wrong1), value: 'w1', total: 90 },
            { label: moneyOptionSVG(wrong2), value: 'w2', total: 100 },
            { label: moneyOptionSVG(wrong3), value: 'w3', total: 80 },
        ]);
        // find unique correct: only correctItems = 100 and is labeled correct
        const answer = options.find(o => o.value === 'correct').label;
        return {
            answer,
            options: options.map(o => o.label),
            visual: `<div style="display:flex;gap:20px;align-items:center;justify-content:center">
        <div style="border:2.5px dashed #1E88E5;border-radius:14px;padding:12px 14px;background:#E3F2FD;text-align:center">
          <div style="font-size:13px;font-weight:800;color:#1E88E5;margin-bottom:6px">LEFT SIDE = ₹${leftTotal}</div>
          ${moneyOptionSVG(leftItems, 280, 80)}
        </div>
        <span style="font-size:36px;font-weight:900;color:#C62828">= ?</span>
      </div>`,
            solution: `2×₹50 = ₹100. 8×₹10 + 1×₹20 = ₹80 + ₹20 = ₹100. ✓`,
            text: `<b>Match the equivalent amount</b> for the left side!<br/><span style="color:#1E88E5;font-size:0.9rem">Which option equals the same total?</span>`,
            useRawOptions: true,
        };
    },

    // Q2: Find total of notes + coins shown
    () => {
        const denom1 = pick([50, 20, 10]), qty1 = randomInt(1, 3);
        const denom2 = pick([5, 2, 1]), qty2 = randomInt(2, 5);
        const total = denom1 * qty1 + denom2 * qty2;
        const items = [{ type: 'note', denom: denom1, qty: qty1 }, { type: 'coin', denom: denom2, qty: qty2 }];
        const { svg, height } = renderMoney(items, 12, 12, 420);
        const wrong = shuffle([total + denom2, total - denom2, total + denom1, total - denom1].filter(v => v !== total && v > 0)).slice(0, 3);
        const options = shuffle([`₹${total}`, ...wrong.map(v => `₹${v}`)]);
        const canvasH = Math.max(height, 100);
        return {
            answer: `₹${total}`,
            options,
            visual: `<svg viewBox="0 0 440 ${canvasH}" width="100%" height="${canvasH}" style="overflow:visible;background:#FFFDE7;border-radius:14px">${svg}<text x="12" y="${canvasH - 8}" font-size="13" font-weight="700" fill="#F57F17" font-family="Arial">Count all the notes and coins! 💰</text></svg>`,
            solution: `${qty1}×₹${denom1} = ₹${denom1 * qty1}  +  ${qty2}×₹${denom2} = ₹${denom2 * qty2}  →  Total = ₹${total}`,
            text: `<b>Count the money!</b><br/><span style="color:#F57F17;font-size:0.9rem">What is the total amount shown?</span>`,
        };
    },

    // Q3: Buying an item — which combination of notes/coins EXACTLY pays for it?  
    () => {
        const items = [
            { emoji: '🪁', label: 'Kite', price: 35 },
            { emoji: '🍎', label: 'Apples', price: 25 },
            { emoji: '📚', label: 'Book', price: 45 },
            { emoji: '🎨', label: 'Colours', price: 28 },
            { emoji: '🚗', label: 'Toy Car', price: 55 },
            { emoji: '🍫', label: 'Chocolate', price: 20 },
        ];
        const item = pick(items);
        const price = item.price;
        // Build correct combination
        const correct = [];
        let rem = price;
        [20, 10, 5, 2, 1].forEach(d => {
            const q = Math.floor(rem / d);
            if (q > 0) { correct.push({ type: d >= 5 ? 'note' : 'coin', denom: d, qty: q }); rem -= d * q; }
        });
        const wrong1items = [{ type: 'note', denom: 20, qty: Math.floor(price / 20) + 1 }];
        const wrong2items = [{ type: 'note', denom: 10, qty: Math.floor(price / 10) - 1 }];
        const wrong3items = [{ type: 'coin', denom: 5, qty: Math.floor(price / 5) + 2 }];
        const options = shuffle([
            { label: moneyOptionSVG(correct, 320, 115), value: 'correct' },
            { label: moneyOptionSVG(wrong1items, 320, 80), value: 'w1' },
            { label: moneyOptionSVG(wrong2items, 320, 80), value: 'w2' },
            { label: moneyOptionSVG(wrong3items, 320, 80), value: 'w3' },
        ]);
        const answer = options.find(o => o.value === 'correct').label;
        return {
            answer,
            options: options.map(o => o.label),
            visual: `<svg viewBox="0 0 240 130" width="240" height="130" style="overflow:visible;display:block;margin:0 auto">${priceTag(120, 65, price, item.emoji, item.label)}</svg>`,
            solution: `The item costs ₹${price}. The correct combination adds up to exactly ₹${price}!`,
            text: `<b>Which combination pays exactly for the ${item.label}?</b><br/><span style="color:#E53935;font-size:0.9rem">Match the right money!</span>`,
            useRawOptions: true,
        };
    },

    // Q4: Change problem — paid with ₹X, item costs ₹Y, how much change?
    () => {
        const payments = [50, 100, 20];
        const paid = pick(payments);
        const maxCost = paid - 1;
        const cost = randomInt(Math.floor(paid * 0.3), maxCost - 2);
        const change = paid - cost;
        const wrong = shuffle([change + 5, change - 5, change + 10, paid - cost + 2].filter(v => v !== change && v > 0 && v < paid)).slice(0, 3);
        const options = shuffle([`₹${change}`, ...wrong.map(v => `₹${v}`)]);
        // Visual: wallet (paid amount) → shop → change box
        const shopEmoji = pick(['🛒', '🏪', '🧺', '🛍️']);
        return {
            answer: `₹${change}`,
            options,
            visual: `<svg viewBox="0 0 460 150" width="100%" height="148" style="overflow:visible">
        <!-- Paid panel -->
        <rect x="6" y="10" width="130" height="130" rx="14" fill="#FFF3E0" stroke="#FF8F00" stroke-width="2.5"/>
        <text x="71" y="32" text-anchor="middle" font-size="13" font-weight="800" fill="#E65100" font-family="Arial">You paid</text>
        ${note(18, 42, paid >= 100 ? 100 : paid >= 50 ? 50 : 20, 94, 54)}
        <text x="71" y="118" text-anchor="middle" font-size="20" font-weight="900" fill="#BF360C" font-family="Arial">₹${paid}</text>
        <!-- Arrow -->
        <text x="155" y="84" font-size="34">→</text>
        <!-- Shop panel -->
        <rect x="196" y="10" width="130" height="130" rx="14" fill="#E8F5E9" stroke="#43A047" stroke-width="2.5"/>
        <text x="261" y="32" text-anchor="middle" font-size="13" font-weight="800" fill="#2E7D32" font-family="Arial">Item costs</text>
        <text x="261" y="82" text-anchor="middle" font-size="38" font-weight="900" fill="#1B5E20" font-family="Arial">₹${cost}</text>
        <text x="261" y="108" text-anchor="middle" font-size="26">${shopEmoji}</text>
        <!-- Arrow -->
        <text x="343" y="84" font-size="34">→</text>
        <!-- Change panel -->
        <rect x="386" y="10" width="70" height="130" rx="14" fill="#FFF9C4" stroke="#F9A825" stroke-width="2.5" stroke-dasharray="6"/>
        <text x="421" y="32" text-anchor="middle" font-size="11" font-weight="800" fill="#F57F17" font-family="Arial">Change</text>
        <text x="421" y="90" text-anchor="middle" font-size="32" font-weight="900" fill="#E65100" font-family="Arial">?</text>
      </svg>`,
            solution: `Change = ₹${paid} − ₹${cost} = ₹${change}`,
            text: `Paid <b>₹${paid}</b> for an item costing <b>₹${cost}</b>.<br/>How much <b>change</b> will you get?`,
        };
    },

    // Q5: Piggy bank — which coins/notes make up the total inside?
    () => {
        const coinSet = shuffle([
            [{ type: 'coin', denom: 5, qty: 3 }, { type: 'coin', denom: 2, qty: 2 }],
            [{ type: 'coin', denom: 10, qty: 2 }, { type: 'coin', denom: 5, qty: 1 }],
            [{ type: 'note', denom: 10, qty: 2 }, { type: 'coin', denom: 2, qty: 3 }],
        ])[0];
        const total = coinSet.reduce((s, i) => s + i.denom * i.qty, 0);
        const items = coinSet;
        const { svg } = renderMoney(items, 32, 8, 220);
        const wrong = shuffle([total + 5, total - 2, total + 10, total - 5].filter(v => v !== total && v > 0)).slice(0, 3);
        const options = shuffle([`₹${total}`, ...wrong.map(v => `₹${v}`)]);
        const coins4pig = items.flatMap(i => Array(i.qty).fill(i.denom));
        return {
            answer: `₹${total}`,
            options,
            visual: `<svg viewBox="0 0 480 230" width="100%" height="225" style="overflow:visible">
        ${piggyBank(240, 158, coins4pig.slice(0, 8), total)}
        <text x="240" y="216" text-anchor="middle" font-size="14" fill="#880E4F" font-family="Arial" font-weight="800">How much is saved inside? 🐷</text>
      </svg>`,
            solution: `${items.map(i => `${i.qty}×₹${i.denom}=₹${i.denom * i.qty}`).join(' + ')} = ₹${total}`,
            text: `<b>Count the coins in the piggy bank!</b><br/><span style="color:#C2185B;font-size:0.9rem">What is the total amount saved?</span>`,
        };
    },

    // Q6: Two-column match visual — find which right-column option equals the left
    () => {
        const leftDenom = pick([20, 50, 100]);
        const leftQty = randomInt(2, 4);
        const leftTotal = leftDenom * leftQty;
        const leftItems = [{ type: 'note', denom: leftDenom, qty: leftQty }];
        // build correct right side (split differently)
        const half = leftDenom / 2 > 0 ? leftDenom / 2 : 10;
        const rightItems = [{ type: leftDenom >= 20 ? 'note' : 'coin', denom: half || 10, qty: leftQty * 2 }];
        const correctTotal = (half || 10) * leftQty * 2;
        // Use identical total if possible
        const correctOptionItems = correctTotal === leftTotal ? rightItems : [{ type: 'note', denom: 10, qty: leftTotal / 10 }];
        const w1 = [{ type: 'note', denom: 10, qty: leftTotal / 10 + 1 }];
        const w2 = [{ type: 'note', denom: 20, qty: Math.max(1, leftTotal / 20 - 1) }];
        const w3 = [{ type: 'coin', denom: 5, qty: leftTotal / 5 - 2 }];
        const options = shuffle([
            { label: moneyOptionSVG(correctOptionItems, 320, 115), value: 'correct' },
            { label: moneyOptionSVG(w1, 320, 80), value: 'w1' },
            { label: moneyOptionSVG(w2, 320, 80), value: 'w2' },
            { label: moneyOptionSVG(w3, 320, 80), value: 'w3' },
        ]);
        const answer = options.find(o => o.value === 'correct').label;
        return {
            answer,
            options: options.map(o => o.label),
            visual: `<div style="display:flex;align-items:center;justify-content:center;gap:16px">
        <div style="border:2.5px solid #E91E63;border-radius:12px;padding:12px 14px;background:#FCE4EC">
          <div style="font-size:12px;font-weight:800;color:#C2185B;margin-bottom:6px">This amount:</div>
          ${moneyOptionSVG(leftItems, 280, 90)}
          <div style="font-size:14px;font-weight:900;color:#C2185B;text-align:center;margin-top:4px">= ₹${leftTotal}</div>
        </div>
        <div style="font-size:32px">↔️</div>
        <div style="border:2.5px dashed #9C27B0;border-radius:12px;padding:12px;background:#F3E5F5;min-width:90px;text-align:center">
          <div style="font-size:12px;font-weight:800;color:#7B1FA2">Match →</div>
          <div style="font-size:28px;font-weight:900;color:#7B1FA2;margin-top:8px">?</div>
        </div>
      </div>`,
            solution: `${leftQty}×₹${leftDenom} = ₹${leftTotal}. The matching option also totals ₹${leftTotal}!`,
            text: `<b>Match the equivalent amount!</b><br/><span style="color:#7B1FA2;font-size:0.9rem">Which option on the right equals ₹${leftTotal}?</span>`,
            useRawOptions: true,
        };
    },

    // Q7: Shop — buy 2 items, find the total cost
    () => {
        const shopItems = [
            { emoji: '🍌', price: 12, label: 'Banana' }, { emoji: '🏏', price: 35, label: 'Bat' },
            { emoji: '📏', price: 8, label: 'Scale' }, { emoji: '🪀', price: 18, label: 'Yo-yo' },
            { emoji: '🎈', price: 15, label: 'Balloon' }, { emoji: '🖊️', price: 10, label: 'Pen' },
        ];
        const [a, b] = shuffle(shopItems).slice(0, 2);
        const total = a.price + b.price;
        const wrong = shuffle([total + 5, total - 5, total + a.price, total - b.price].filter(v => v !== total && v > 0)).slice(0, 3);
        const options = shuffle([`₹${total}`, ...wrong.map(v => `₹${v}`)]);
        return {
            answer: `₹${total}`,
            options,
            visual: `<svg viewBox="0 0 320 115" width="100%" height="110" style="overflow:visible">
        <rect x="0" y="0" width="320" height="110" rx="12" fill="#E8F5E9" stroke="#43A047" stroke-width="2"/>
        <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="800" fill="#2E7D32" font-family="Arial">🛒 Shopping Time!</text>
        ${shopItem(20, 25, a.emoji, a.price, a.label)}
        <text x="110" y="65" text-anchor="middle" font-size="22">➕</text>
        ${shopItem(140, 25, b.emoji, b.price, b.label)}
        <text x="230" y="65" text-anchor="middle" font-size="22">=</text>
        <rect x="248" y="40" width="60" height="34" rx="8" fill="#F9A825"/>
        <text x="278" y="63" text-anchor="middle" font-size="14" font-weight="900" fill="white" font-family="Arial">₹?</text>
      </svg>`,
            solution: `₹${a.price} (${a.label}) + ₹${b.price} (${b.label}) = ₹${total}`,
            text: `Neha buys a <b>${a.label}</b> (₹${a.price}) and a <b>${b.label}</b> (₹${b.price}).<br/>What is the <b>total cost</b>?`,
        };
    },

    // Q8: Number line money — add coins to reach a target amount
    () => {
        const start = pick([10, 20, 30, 40, 50]);
        const coinDenom = pick([5, 10, 2]);
        const hops = randomInt(3, 6);
        const end = start + coinDenom * hops;
        const blankHop = randomInt(1, hops - 1);
        const blankVal = start + coinDenom * blankHop;
        const spacingX = 52;
        const points = Array.from({ length: hops + 1 }, (_, i) => start + coinDenom * i);
        const lineW = 30 + (hops + 1) * spacingX + 20;
        let lineSvg = `<line x1="20" y1="50" x2="${lineW}" y2="50" stroke="#555" stroke-width="2.5"/>`;
        lineSvg += `<polygon points="${lineW},45 ${lineW + 10},50 ${lineW},55" fill="#555"/>`;
        points.forEach((v, i) => {
            const cx = 30 + i * spacingX;
            lineSvg += `<line x1="${cx}" y1="42" x2="${cx}" y2="58" stroke="#555" stroke-width="2"/>`;
            const isBlank = i === blankHop;
            const bfill = isBlank ? '#FFF9C4' : '#E0F7FA';
            const bstroke = isBlank ? '#F9A825' : '#00ACC1';
            lineSvg += `<rect x="${cx - 22}" y="60" width="44" height="26" rx="6" fill="${bfill}" stroke="${bstroke}" stroke-width="1.5" stroke-dasharray="${isBlank ? '4' : '0'}"/>`;
            lineSvg += `<text x="${cx}" y="78" text-anchor="middle" font-size="${isBlank ? 16 : 11}" font-weight="900" fill="${isBlank ? '#E65100' : '#01579B'}" font-family="Arial">${isBlank ? '?' : '₹' + v}</text>`;
            if (i < hops) {
                const nx = 30 + (i + 1) * spacingX;
                const mx = (cx + nx) / 2;
                lineSvg += `<path d="M${cx},50 Q${mx},22 ${nx},50" fill="none" stroke="#E91E63" stroke-width="2" stroke-dasharray="4"/>`;
                lineSvg += `<polygon points="${nx - 5},42 ${nx},50 ${nx + 5},42" fill="#E91E63"/>`;
                lineSvg += `<rect x="${mx - 14}" y="10" width="28" height="14" rx="5" fill="#E91E63"/>`;
                lineSvg += `<text x="${mx}" y="21" text-anchor="middle" font-size="10" font-weight="900" fill="white" font-family="Arial">+₹${coinDenom}</text>`;
            }
        });
        const wrong = shuffle([blankVal + coinDenom, blankVal - coinDenom, blankVal + coinDenom * 2, blankVal - coinDenom * 2].filter(v => v !== blankVal && v > 0)).slice(0, 3);
        const options = shuffle([`₹${blankVal}`, ...wrong.map(v => `₹${v}`)]);
        return {
            answer: `₹${blankVal}`,
            options,
            visual: `<svg viewBox="0 0 ${lineW + 30} 100" width="100%" height="95" style="overflow:visible">${lineSvg}</svg>`,
            solution: `Start at ₹${start}, add ₹${coinDenom} each hop. At hop ${blankHop}: ₹${start} + ${blankHop}×₹${coinDenom} = ₹${blankVal}`,
            text: `The number line adds <b>₹${coinDenom}</b> each hop.<br/><span style="color:#E91E63;font-size:0.9rem">What is the <b>missing amount</b>?</span>`,
        };
    },

    // Q9: How many ₹10 notes make up a given total? (division concept)
    () => {
        const denom = pick([10, 5, 20]);
        const qty = randomInt(3, 8);
        const total = denom * qty;
        const { svg, height } = renderMoney([{ type: denom >= 10 ? 'note' : 'coin', denom, qty }], 10, 10, 310);
        const wrong = shuffle([qty + 1, qty - 1, qty + 2, qty * 2].filter(v => v !== qty && v > 0)).slice(0, 3);
        const options = shuffle([String(qty), ...wrong.map(String)]);
        return {
            answer: String(qty),
            options,
            visual: `<svg viewBox="0 0 330 ${Math.max(height, 70)}" width="100%" height="${Math.max(height, 70)}" style="overflow:visible;background:#E8EAF6;border-radius:12px">
        ${svg}
        <text x="10" y="${Math.max(height, 70) - 6}" font-size="11" fill="#283593" font-family="Arial" font-weight="700">Total = ₹${total}.  How many ₹${denom} notes?</text>
      </svg>`,
            solution: `₹${total} ÷ ₹${denom} = ${qty} notes`,
            text: `The total is <b>₹${total}</b>.<br/>How many <b>₹${denom} notes</b> make this amount?`,
        };
    },

    // Q10: Word problem with box diagram — missing part
    () => {
        const scenarios = [
            { story: 'Ravi had some money. He spent ₹{spent}. Now he has ₹{left}. How much did he start with?', type: 'find_start' },
            { story: 'Priya saved ₹{a} in week 1 and ₹{b} in week 2. How much did she save in all?', type: 'add' },
            { story: 'A shop had ₹{total} in the till. ₹{spent} was given as change. How much remains?', type: 'subtract' },
        ];
        const sc = pick(scenarios);
        let answer, question, nums;
        if (sc.type === 'add') {
            const a = randomInt(20, 80), b = randomInt(10, 60);
            answer = a + b; nums = { a, b };
            question = sc.story.replace('{a}', a).replace('{b}', b);
        } else if (sc.type === 'subtract') {
            const total = randomInt(80, 200), spent = randomInt(20, total - 10);
            answer = total - spent; nums = { total, spent };
            question = sc.story.replace('{total}', total).replace('{spent}', spent);
        } else {
            const spent = randomInt(20, 80), left = randomInt(10, 60);
            answer = spent + left; nums = { spent, left };
            question = sc.story.replace('{spent}', spent).replace('{left}', left);
        }
        // Box diagram visual
        const [ka, kb] = sc.type === 'add'
            ? [nums.a, nums.b]
            : sc.type === 'subtract'
                ? [nums.spent, answer]
                : [nums.spent, nums.left];
        const totalV = sc.type === 'add' ? answer : sc.type === 'subtract' ? nums.total : answer;
        const boxW = 300, boxH = 120;
        const boxSvg = `
      <rect x="2" y="2" width="${boxW - 4}" height="${boxH - 4}" rx="14" fill="#E8F5E9" stroke="#43A047" stroke-width="2.5"/>
      <text x="${boxW / 2}" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#1B5E20" font-family="Arial">Total: ₹${totalV}</text>
      <line x1="20" y1="32" x2="${boxW - 20}" y2="32" stroke="#E53935" stroke-width="2"/>
      <polygon points="20,28 10,32 20,36" fill="#E53935"/>
      <polygon points="${boxW - 20},28 ${boxW - 10},32 ${boxW - 20},36" fill="#E53935"/>
      <rect x="16" y="42" width="116" height="46" rx="8" fill="white" stroke="#43A047" stroke-width="2"/>
      <text x="74" y="62" text-anchor="middle" font-size="16" font-weight="900" fill="#333" font-family="Arial">${ka}</text>
      <text x="74" y="80" text-anchor="middle" font-size="10" fill="#555" font-family="Arial">₹${ka}</text>
      <rect x="144" y="42" width="140" height="46" rx="8" fill="#FFF9C4" stroke="#F9A825" stroke-width="2" stroke-dasharray="5"/>
      <text x="214" y="72" text-anchor="middle" font-size="24" font-weight="900" fill="#E65100" font-family="Arial">?</text>`;
        const wrong = shuffle([answer + 10, answer - 10, answer + 5, answer - 5].filter(v => v !== answer && v > 0)).slice(0, 3);
        const options = shuffle([`₹${answer}`, ...wrong.map(v => `₹${v}`)]);
        return {
            answer: `₹${answer}`,
            options,
            visual: `<svg viewBox="0 0 ${boxW} ${boxH}" width="100%" height="${boxH}" style="overflow:visible">${boxSvg}</svg>`,
            solution: `${sc.type === 'add' ? `₹${ka} + ₹${kb} = ₹${answer}` : sc.type === 'subtract' ? `₹${totalV} − ₹${ka} = ₹${answer}` : `₹${ka} + ₹${kb} = ₹${answer}`}`,
            text: `<b>${question}</b>`,
        };
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const HandlingMoney = () => {
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

    const SKILL_ID = 9010;
    const SKILL_NAME = 'Handling Money';
    const TOTAL_QUESTIONS = 10;

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID)
                .then(sess => { if (sess?.session_id) setSessionId(sess.session_id); })
                .catch(console.error);
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

    const generateQuestion = (_idx) => {
        const gen = pick(questionGenerators);
        const qData = gen();
        setShuffledOptions(qData.options);
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
                question_text: 'Handling Money',
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
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>💰 Handling Money</p>
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
                        {percentage >= 80 ? '🎉 Excellent! You\'re a money wizard!' : percentage >= 50 ? '👍 Good effort! Keep practising!' : '💪 Keep going, you\'ll get it!'}
                    </p>
                    <button onClick={() => navigate(-1)} className="nav-pill-next-btn" style={{ width: '100%', justifyContent: 'center' }}>
                        Go Back <ChevronRight size={22} strokeWidth={3} />
                    </button>
                </motion.div>
            </div>
        );
    }

    const isRawOptions = currentQuestion?.useRawOptions;

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-lg shadow-sm whitespace-nowrap">
                        💰 Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-base shadow-sm">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ flex: 1, overflow: 'hidden', padding: '0.75rem', display: 'flex', alignItems: 'stretch' }}>
                <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="question-card-modern" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div className="question-header-modern" style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                    <h2 className="question-text-modern" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 600, textAlign: 'center' }}>
                                        <LatexContent html={currentQuestion.text} />
                                    </h2>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 1 auto', minHeight: 0, overflow: 'hidden', padding: '0.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: '1rem', marginTop: '0.4rem' }}>
                                        {typeof currentQuestion.visual === 'string' && currentQuestion.visual.startsWith('<svg') ? (
                                            <div dangerouslySetInnerHTML={{ __html: currentQuestion.visual }} style={{ width: '100%', maxHeight: '100%', overflow: 'visible', display: 'flex', justifyContent: 'center' }} />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: currentQuestion.visual }} style={{ width: '100%' }} />
                                        )}
                                    </div>
                                </div>

                                <div className="interaction-area-modern">
                                    {/* Options: for money-image options use 2-column grid with raw HTML */}
                                    {isRawOptions ? (
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', maxWidth: '700px', margin: '0 auto' }}>
                                            {shuffledOptions.map((option, idx) => {
                                                const isSelected = selectedOption === option;
                                                const isCorrectOpt = isSubmitted && option === currentQuestion.answer;
                                                const isWrong = isSubmitted && isSelected && !isCorrect;
                                                return (
                                                    <button key={idx}
                                                        onClick={() => { if (!isSubmitted) setSelectedOption(option); }}
                                                        disabled={isSubmitted}
                                                        style={{
                                                            border: `2.5px solid ${isCorrectOpt ? '#4CAF50' : isWrong ? '#EF5350' : isSelected ? '#00BFA5' : '#E2E8F0'}`,
                                                            borderRadius: '10px',
                                                            background: isCorrectOpt ? '#C8E6C9' : isWrong ? '#FFCDD2' : isSelected ? '#E0F2F1' : 'white',
                                                            padding: '8px',
                                                            cursor: isSubmitted ? 'default' : 'pointer',
                                                            transition: 'all 0.15s',
                                                            boxShadow: isCorrectOpt ? '0 4px 0 #388E3C' : isWrong ? '0 4px 0 #D32F2F' : isSelected ? '0 4px 0 #00897B' : '0 3px 0 #CBD5E0',
                                                            textAlign: 'left',
                                                            overflow: 'hidden',
                                                            minHeight: '80px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}>
                                                        <div dangerouslySetInnerHTML={{ __html: option }} style={{ width: '100%' }} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.answer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                    style={{ fontWeight: 600, fontSize: '1.05rem' }}
                                                    onClick={() => { if (!isSubmitted) setSelectedOption(option); }}
                                                    disabled={isSubmitted}>
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>
                                    )}
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

export default HandlingMoney;
