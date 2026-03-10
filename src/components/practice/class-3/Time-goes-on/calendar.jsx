
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

// Always produce 4 unique options, guaranteed
function makeOpts(correct, distractors) {
    const pool = [correct];
    for (const d of distractors) {
        const s = String(d);
        if (!pool.includes(s)) pool.push(s);
        if (pool.length === 4) break;
    }
    // pad if needed
    let extra = 1;
    while (pool.length < 4) {
        const s = String(Number(correct) + extra);
        if (!pool.includes(s)) pool.push(s);
        extra++;
    }
    return shuffle(pool);
}
function makeStrOpts(correct, wrong3) {
    const pool = [correct];
    for (const w of wrong3) {
        if (!pool.includes(w) && pool.length < 4) pool.push(w);
    }
    return shuffle(pool);
}

const CORRECT_MESSAGES = [
    '🎉 Brilliant! You read the calendar perfectly! 🎉',
    '✨ Amazing! Perfect answer! ✨',
    '🚀 Spot on! Keep going! 🚀',
    '🌟 Excellent! You\'re a calendar expert! 🌟',
    '💎 Perfect! Well done! 💎',
];

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_HINDI = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
const DAY_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_HI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const DAY_HI_SHORT = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
const MONTH_EMOJI = ['❄️', '💝', '🌸', '🌷', '🌺', '☀️', '🌊', '🏫', '🍂', '🎃', '🪔', '🎄'];
const MONTH_DAYS_2025 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function firstDow(m0, yr = 2025) { return new Date(yr, m0, 1).getDay(); }
function daysIn(m0, yr = 2025) { return new Date(yr, m0 + 1, 0).getDate(); }

// ─── BEAUTIFUL CALENDAR SVG ───────────────────────────────────────────────────
// Renders a full, correctly-sized calendar with highlight + circle markers
function calSVG(m0, yr, hiDates = [], hiColor = '#FFE082', circDate = null, circColor = '#E91E63') {
    const fd = firstDow(m0, yr);
    const total = daysIn(m0, yr);
    const emoji = MONTH_EMOJI[m0];
    const name = MONTH_NAMES[m0];

    const CW = 36, CH = 24;   // compact cells
    const SX = 8, SY = 66;   // grid start (tighter header)
    const W = 268, H = 200;   // overall SVG dimensions

    // background card
    let s = `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="white" stroke="#E8EAF6" stroke-width="1.5"/>`;
    // gradient header
    s += `<defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3949AB"/><stop offset="100%" stop-color="#7E57C2"/></linearGradient></defs>`;
    s += `<rect x="1" y="1" width="${W - 2}" height="38" rx="14" fill="url(#hg)"/>`;
    s += `<rect x="1" y="26" width="${W - 2}" height="13" fill="url(#hg)"/>`;
    s += `<text x="${W / 2}" y="24" text-anchor="middle" font-size="15" font-weight="900" fill="white" font-family="'Segoe UI',Arial,sans-serif">${emoji} ${name} ${yr}</text>`;

    // day headers
    const dColors = ['#FF5252', '#607D8B', '#607D8B', '#607D8B', '#607D8B', '#607D8B', '#42A5F5'];
    for (let d = 0; d < 7; d++) {
        const cx = SX + d * CW + CW / 2;
        s += `<text x="${cx}" y="48" text-anchor="middle" font-size="10" font-weight="800" fill="${dColors[d]}" font-family="Arial">${DAY_EN[d]}</text>`;
        s += `<text x="${cx}" y="61" text-anchor="middle" font-size="6.5" fill="${dColors[d]}90" font-family="Arial">${DAY_HI_SHORT[d]}</text>`;
    }
    s += `<line x1="4" y1="${SY}" x2="${W - 4}" y2="${SY}" stroke="#E8EAF6" stroke-width="1"/>`;

    // date cells
    let dt = 1;
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (row * 7 + col < fd || dt > total) continue;
            const cx = SX + col * CW + CW / 2;
            const cy = SY + row * CH + CH / 2;
            const isSun = col === 0, isSat = col === 6;
            const isHi = hiDates.includes(dt);
            const isCirc = dt === circDate;

            if (isHi) {
                s += `<rect x="${SX + col * CW + 2}" y="${SY + row * CH + 2}" width="${CW - 4}" height="${CH - 4}" rx="5" fill="${hiColor}" opacity="0.9"/>`;
            }
            if (isCirc) {
                s += `<circle cx="${cx}" cy="${cy}" r="11" fill="${circColor}" opacity="0.18"/>`;
                s += `<circle cx="${cx}" cy="${cy}" r="11" fill="none" stroke="${circColor}" stroke-width="2"/>`;
            }

            const col_ = isCirc ? circColor : isSun ? '#FF5252' : isSat ? '#42A5F5' : isHi ? '#1A237E' : '#37474F';
            const fw = isHi || isCirc ? '900' : '600';
            s += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11.5" font-weight="${fw}" fill="${col_}" font-family="Arial">${dt}</text>`;
            dt++;
        }
    }
    return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:360px;overflow:visible">${s}</svg>`;
}

// ─── WEEK WHEEL SVG ───────────────────────────────────────────────────────────
function weekWheelSVG(startIdx, endIdx, daysAdd) {
    const cx = 138, cy = 105, r = 72;
    let s = '';
    // decorative outer ring
    s += `<circle cx="${cx}" cy="${cy}" r="${r + 18}" fill="#EDE7F6" stroke="#D1C4E9" stroke-width="1.5"/>`;
    DAY_FULL.forEach((d, i) => {
        const ang = (i / 7) * 2 * Math.PI - Math.PI / 2;
        const x = cx + r * Math.cos(ang), y = cy + r * Math.sin(ang);
        const isSt = i === startIdx, isEn = i === endIdx;
        const bg = isSt ? '#3949AB' : isEn ? '#E91E63' : 'white';
        const tc = (isSt || isEn) ? 'white' : '#37474F';
        s += `<circle cx="${x}" cy="${y}" r="25" fill="${bg}" stroke="${isSt || isEn ? 'white' : '#C5CAE9'}" stroke-width="${isSt || isEn ? 3 : 1.5}"/>`;
        s += `<text x="${x}" y="${y - 3}" text-anchor="middle" font-size="9.5" font-weight="800" fill="${tc}" font-family="Arial">${d.slice(0, 3)}</text>`;
        s += `<text x="${x}" y="${y + 9}" text-anchor="middle" font-size="7" fill="${isSt || isEn ? 'rgba(255,255,255,0.8)' : '#9E9E9E'}" font-family="Arial">${DAY_HI_SHORT[i].slice(0, 3)}</text>`;
    });
    // Arc arrow from start → end
    const a1 = (startIdx / 7) * 2 * Math.PI - Math.PI / 2;
    const a2 = (endIdx / 7) * 2 * Math.PI - Math.PI / 2;
    const ax = cx + r * Math.cos(a1), ay = cy + r * Math.sin(a1);
    const bx = cx + r * Math.cos(a2), by = cy + r * Math.sin(a2);
    const mx = (ax + bx) / 2 + 20 * Math.sign(bx - ax || 1);
    const my = (ay + by) / 2 - 20;
    s += `<defs><marker id="arr" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0,6 2,0 4" fill="#E91E63"/></marker></defs>`;
    s += `<path d="M${ax},${ay} Q${mx},${my} ${bx},${by}" fill="none" stroke="#E91E63" stroke-width="3" stroke-dasharray="6,3" marker-end="url(#arr)"/>`;
    // centre badge
    s += `<circle cx="${cx}" cy="${cy}" r="24" fill="#3949AB" opacity="0.12"/>`;
    s += `<text x="${cx}" y="${cy + 3}" text-anchor="middle" font-size="17" font-weight="900" fill="#3949AB" font-family="Arial">+${daysAdd}</text>`;
    s += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="10" fill="#64748b" font-family="Arial">days</text>`;
    // legend
    s += `<rect x="8" y="192" width="14" height="14" rx="4" fill="#3949AB"/><text x="26" y="203" font-size="11" fill="#37474F" font-family="Arial" font-weight="700">Today</text>`;
    s += `<rect x="110" y="192" width="14" height="14" rx="4" fill="#E91E63"/><text x="128" y="203" font-size="11" fill="#37474F" font-family="Arial" font-weight="700">Answer</text>`;
    return `<svg viewBox="0 0 276 215" width="100%" style="max-width:340px;overflow:visible">${s}</svg>`;
}

// ─── 12-MONTH GRID SVG ────────────────────────────────────────────────────────
function monthGridSVG(targetCount, targetName, yr) {
    const CW = 42, CH = 82;
    const cols = 6;
    let s = `<rect x="0" y="0" width="276" height="175" rx="14" fill="#F8F9FF" stroke="#E8EAF6" stroke-width="1.5"/>`;
    MONTH_NAMES.forEach((m, i) => {
        const row = Math.floor(i / cols), col = i % cols;
        const x = 4 + col * CW, y = 4 + row * CH;
        const d = MONTH_DAYS_2025[i];
        const isTgt = m === targetName;
        const hdr = isTgt ? '#E91E63' : '#3949AB';
        const daysBg = d === 31 ? '#E8F5E9' : d === 30 ? '#FFF8E1' : '#FFEBEE';
        s += `<rect x="${x}" y="${y}" width="${CW - 4}" height="${CH - 4}" rx="8" fill="${isTgt ? '#FCE4EC' : 'white'}" stroke="${isTgt ? '#F48FB1' : '#E8EAF6'}" stroke-width="${isTgt ? 2 : 1}"/>`;
        s += `<rect x="${x}" y="${y}" width="${CW - 4}" height="22" rx="6" fill="${hdr}"/>`;
        s += `<rect x="${x}" y="${y + 14}" width="${CW - 4}" height="8" fill="${hdr}"/>`;
        s += `<text x="${x + (CW - 4) / 2}" y="${y + 15}" text-anchor="middle" font-size="8.5" font-weight="900" fill="white" font-family="Arial">${m.slice(0, 3)}</text>`;
        s += `<rect x="${x + 4}" y="${y + 26}" width="${CW - 12}" height="28" rx="4" fill="${daysBg}"/>`;
        s += `<text x="${x + (CW - 4) / 2}" y="${y + 41}" text-anchor="middle" font-size="15" font-weight="900" fill="#37474F" font-family="Arial">${d}</text>`;
        s += `<text x="${x + (CW - 4) / 2}" y="${y + 56}" text-anchor="middle" font-size="7" fill="#9E9E9E" font-family="Arial">days</text>`;
        if (isTgt) s += `<text x="${x + (CW - 4) / 2}" y="${y + 72}" text-anchor="middle" font-size="11" font-family="Arial">⭐</text>`;
    });
    return `<svg viewBox="0 0 276 175" width="100%" style="max-width:340px;overflow:visible">${s}</svg>`;
}

// ─── BIRTH CERTIFICATE SVG ────────────────────────────────────────────────────
function birthCertSVG(data) {
    const W = 320, H = 220;
    let s = `<rect x="0" y="0" width="${W}" height="${H}" fill="#FFF8DC" stroke="#DEB887" stroke-width="4"/>`;
    s += `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" fill="none" stroke="#DEB887" stroke-width="1.5"/>`;
    s += `<rect x="8" y="8" width="${W - 16}" height="${H - 16}" fill="none" stroke="#DEB887" stroke-width="1"/>`;

    // Header
    s += `<text x="${W / 2}" y="25" text-anchor="middle" font-size="9" font-style="italic" fill="#5C4033" font-family="'Times New Ruler',serif">Form Number 5</text>`;
    s += `<text x="${W / 2}" y="36" text-anchor="middle" font-size="10" font-weight="bold" fill="#5C4033" font-family="'Times New Ruler',serif">Government of Kerala</text>`;
    s += `<text x="${W / 2}" y="56" text-anchor="middle" font-size="16" font-weight="900" fill="#B8860B" font-family="Georgia,serif" letter-spacing="1">BIRTH CERTIFICATE</text>`;

    // Intro text
    s += `<text x="20" y="74" font-size="8" font-style="italic" fill="#5C4033" font-family="'Times New Ruler',serif">This is to certify that this information is taken from the original</text>`;
    s += `<text x="20" y="84" font-size="8" font-style="italic" fill="#5C4033" font-family="'Times New Ruler',serif">record of birth which is in the register for the year <tspan fill="#B8860B" font-weight="bold">${data.regYear}</tspan> of Panchayat.</text>`;

    // Fields
    const startY = 100, rowH = 12;
    const fields = [
        ['Name:', data.name],
        ['Sex:', data.sex],
        ['Date of Birth:', `${data.dob}  (${data.dobText})`],
        ['Place of Birth:', data.pob],
        ['Name of Father:', data.father],
        ['Name of Mother:', data.mother],
        ['Date of Registration:', data.regDate],
        ['Registration Number:', data.regNum]
    ];

    fields.forEach(([lbl, val], i) => {
        const y = startY + i * rowH;
        s += `<text x="20" y="${y}" font-size="8" font-style="italic" fill="#333" font-family="'Times New Ruler',serif">${lbl}</text>`;
        s += `<text x="100" y="${y}" font-size="8" font-weight="600" fill="#B8860B" font-family="Arial">${val}</text>`;
    });

    // Footer
    s += `<text x="20" y="${H - 20}" font-size="8" font-style="italic" fill="#333" font-family="'Times New Ruler',serif">Date ${data.issueDate}</text>`;
    s += `<text x="${W - 20}" y="${H - 20}" text-anchor="end" font-size="8" font-style="italic" fill="#333" font-family="'Times New Ruler',serif">Signature Authority</text>`;

    return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:380px;overflow:visible;box-shadow:0 6px 16px rgba(0,0,0,0.1)">${s}</svg>`;
}

// ─── SAME / CHANGES tick-box SVG ─────────────────────────────────────────────
function sameChangesSVG(items, answers) {
    // items: [{label, answer: 'Same'|'Changes'}], answers[i] revealed or not
    const W = 276, rowH = 32, startY = 18;
    let s = `<rect x="0" y="0" width="${W}" height="${startY + items.length * rowH + 10}" rx="12" fill="#F8F9FF" stroke="#E8EAF6" stroke-width="1.5"/>`;
    // headers
    s += `<text x="14" y="14" font-size="10" font-weight="800" fill="#3949AB" font-family="Arial">What changes? What stays the same?</text>`;
    s += `<rect x="${W - 95}" y="4" width="42" height="16" rx="4" fill="#4CAF50" opacity="0.15"/>`;
    s += `<text x="${W - 74}" y="15" text-anchor="middle" font-size="9" font-weight="800" fill="#388E3C" font-family="Arial">SAME</text>`;
    s += `<rect x="${W - 48}" y="4" width="44" height="16" rx="4" fill="#FF5722" opacity="0.15"/>`;
    s += `<text x="${W - 26}" y="15" text-anchor="middle" font-size="9" font-weight="800" fill="#E64A19" font-family="Arial">CHANGES</text>`;

    items.forEach(({ label }, i) => {
        const y = startY + i * rowH;
        const bg = i % 2 === 0 ? 'white' : '#F5F5FF';
        s += `<rect x="4" y="${y}" width="${W - 8}" height="${rowH - 2}" rx="6" fill="${bg}"/>`;
        s += `<text x="14" y="${y + rowH / 2 + 4}" font-size="11" font-weight="600" fill="#37474F" font-family="Arial">${label}</text>`;
        // Same box
        s += `<rect x="${W - 95}" y="${y + 5}" width="42" height="22}" rx="5" fill="#E8F5E9" stroke="#A5D6A7" stroke-width="1.5"/>`;
        // Changes box
        s += `<rect x="${W - 48}" y="${y + 5}" width="44" height="22" rx="5" fill="#FBE9E7" stroke="#FFAB91" stroke-width="1.5"/>`;
        // dots to indicate choices
        s += `<circle cx="${W - 74}" cy="${y + 16}" r="6" fill="#A5D6A7" stroke="#4CAF50" stroke-width="1.5"/>`;
        s += `<circle cx="${W - 26}" cy="${y + 16}" r="6" fill="#FFAB91" stroke="#FF5722" stroke-width="1.5"/>`;
    });
    return `<svg viewBox="0 0 ${W} ${startY + items.length * rowH + 10}" width="100%" style="max-width:340px;overflow:visible">${s}</svg>`;
}

// ─── YEAR INFO SVG ────────────────────────────────────────────────────────────
function yearInfoSVG() {
    const facts = [
        { label: 'Months in a year', val: '12', emoji: '📅' },
        { label: 'Days in a year (2025)', val: '365', emoji: '🗓️' },
        { label: 'Weeks in a year', val: '52', emoji: '📆' },
        { label: 'Days in a week', val: '7', emoji: '⭐' },
    ];
    const W = 276, RH = 40;
    let s = `<rect x="0" y="0" width="${W}" height="${facts.length * RH + 20}" rx="14" fill="#F3E5F5" stroke="#CE93D8" stroke-width="1.5"/>`;
    s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="11" font-weight="900" fill="#6A1B9A" font-family="Arial">📊 Calendar Facts for ${2025}</text>`;
    facts.forEach(({ label, val, emoji }, i) => {
        const y = 22 + i * RH;
        const bg = i % 2 === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)';
        s += `<rect x="8" y="${y}" width="${W - 16}" height="${RH - 4}" rx="8" fill="${bg}"/>`;
        s += `<text x="22" y="${y + RH / 2 + 4}" font-size="12" font-family="Arial">${emoji}</text>`;
        s += `<text x="40" y="${y + RH / 2 + 4}" font-size="11" font-weight="600" fill="#4A148C" font-family="Arial">${label}</text>`;
        s += `<text x="${W - 16}" y="${y + RH / 2 + 4}" text-anchor="end" font-size="14" font-weight="900" fill="#7B1FA2" font-family="Arial">${val}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${facts.length * RH + 20}" width="100%" style="max-width:340px;overflow:visible">${s}</svg>`;
}

// ─── QUESTION POOL ────────────────────────────────────────────────────────────
function makeQuestions() {
    const yr = 2025;
    const qs = [];

    // ── TYPE 1: Count Sundays ──────────────────────────────────────────────────
    {
        const m = randomInt(0, 11);
        const fd = firstDow(m, yr), total = daysIn(m, yr);
        let sundays = [];
        for (let d = 1; d <= total; d++) if ((fd + d - 1) % 7 === 0) sundays.push(d);
        const ans = sundays.length;
        qs.push({
            text: `🗓️ Look at the <b>${MONTH_NAMES[m]} ${yr}</b> calendar.<br/>How many <b style="color:#E91E63">Sundays</b> does this month have?`,
            visual: calSVG(m, yr, sundays, '#FFE082'),
            options: makeOpts(String(ans), [String(ans - 1), String(ans + 1), String(ans + 2)]),
            answer: String(ans),
            solution: `Sundays in ${MONTH_NAMES[m]} ${yr} are on: <b>${sundays.join(', ')}</b>. So there are <b>${ans} Sundays</b>! 🌞`
        });
    }

    // ── TYPE 2: Write the Thursday dates ──────────────────────────────────────
    {
        const m = randomInt(0, 11);
        const fd = firstDow(m, yr), total = daysIn(m, yr);
        const dow = randomInt(0, 6);
        let dates = [];
        for (let d = 1; d <= total; d++) if ((fd + d - 1) % 7 === dow) dates.push(d);
        const ans = dates.length;
        qs.push({
            text: `📅 In <b>${MONTH_NAMES[m]} ${yr}</b>, the <b style="color:#7B1FA2">${DAY_FULL[dow]}s</b> (${DAY_HI[dow]}) are highlighted.<br/>How many <b>${DAY_FULL[dow]}s</b> are in this month?`,
            visual: calSVG(m, yr, dates, '#E1BEE7'),
            options: makeOpts(String(ans), [String(ans - 1), String(ans + 1), String(ans + 2)]),
            answer: String(ans),
            solution: `${DAY_FULL[dow]}s in ${MONTH_NAMES[m]} ${yr}: <b>${dates.join(', ')}</b>. Total = <b>${ans}</b>! 💜`
        });
    }

    // ── TYPE 3: What day of the week is date X? ────────────────────────────────
    {
        const m = randomInt(0, 11);
        const day = randomInt(1, daysIn(m, yr));
        const dow = (firstDow(m, yr) + day - 1) % 7;
        const ans = DAY_FULL[dow];
        qs.push({
            text: `🔍 In the <b>${MONTH_NAMES[m]} ${yr}</b> calendar,<br/>the circled date is <b style="color:#E91E63">${day} ${MONTH_NAMES[m]}</b>.<br/>What <b>day of the week</b> is it?`,
            visual: calSVG(m, yr, [], '#FFE082', day, '#E91E63'),
            options: makeStrOpts(ans, shuffle(DAY_FULL.filter(d => d !== ans)).slice(0, 3)),
            answer: ans,
            solution: `<b>${day} ${MONTH_NAMES[m]} ${yr}</b> falls on a <b>${ans}</b> (${DAY_HI[dow]}). Count along from the first day of the month! 🔢`
        });
    }

    // ── TYPE 4: N days after a date ───────────────────────────────────────────
    {
        const m = randomInt(0, 10);
        const total = daysIn(m, yr);
        const start = randomInt(1, total - 8);
        const n = randomInt(3, 10);
        const ans = start + n;
        qs.push({
            text: `⏩ Using the <b>${MONTH_NAMES[m]} ${yr}</b> calendar,<br/>what date comes <b style="color:#1565C0">${n} days after ${start} ${MONTH_NAMES[m]}</b>?<br/><span style="font-size:0.88rem;color:#607D8B">Both dates are shaded 🔵</span>`,
            visual: calSVG(m, yr, [start, ans], '#B2EBF2'),
            options: makeOpts(String(ans), [String(ans - 1), String(ans + 1), String(ans + 2)]),
            answer: String(ans),
            solution: `Start at <b>${start}</b>, count forward <b>${n}</b> days → <b>${start} + ${n} = ${ans}</b>! 🎯`
        });
    }

    // ── TYPE 5: School holiday reopening ─────────────────────────────────────
    {
        const m = randomInt(0, 9);
        const total = daysIn(m, yr);
        const close = randomInt(2, total - 18);
        const dur = randomInt(7, 14);
        const reopen = close + dur + 1; // day after last holiday
        const holidayDates = Array.from({ length: dur }, (_, i) => close + i + 1).filter(d => d <= total);
        const ans = Math.min(reopen, total);
        qs.push({
            text: `🏫 In <b>${MONTH_NAMES[m]} ${yr}</b>, school closes on <b>${close} ${MONTH_NAMES[m]}</b> for <b style="color:#BF360C">${dur} vacation days</b>.<br/>On which date does school <b>reopen</b>? 🔔`,
            visual: calSVG(m, yr, holidayDates, '#FFCCBC', ans, '#BF360C'),
            options: makeOpts(String(ans), [String(ans - 1), String(ans + 1), String(ans - 2)]),
            answer: String(ans),
            solution: `School closes ${close}, holidays are ${close + 1}→${close + dur}. It reopens on <b>${ans} ${MONTH_NAMES[m]}</b>! Orange = holidays 🎉`
        });
    }

    // ── TYPE 6: Day wheel — N days after named day ────────────────────────────
    {
        const si = randomInt(0, 6);
        const n = randomInt(2, 5);
        const ei = (si + n) % 7;
        const ans = DAY_FULL[ei];
        qs.push({
            text: `🌀 If today is <b style="color:#3949AB">${DAY_FULL[si]}</b> (${DAY_HI[si]}),<br/>what day will it be after <b style="color:#E91E63">${n} days</b>?<br/><span style="font-size:0.88rem;color:#607D8B">Use the wheel — count ${n} steps forward!</span>`,
            visual: weekWheelSVG(si, ei, n),
            options: makeStrOpts(ans, shuffle(DAY_FULL.filter(d => d !== ans)).slice(0, 3)),
            answer: ans,
            solution: `${DAY_FULL[si]} + ${n} days = <b>${ans}</b> (${DAY_HI[ei]})! Count ${n} steps forward on the week wheel 🔄`
        });
    }

    // ── TYPE 7: How many days from date A to B ────────────────────────────────
    {
        const m = randomInt(0, 11);
        const total = daysIn(m, yr);
        const a = randomInt(1, total - 8);
        const b = a + randomInt(5, 12);
        const diff = b - a;
        qs.push({
            text: `📏 In <b>${MONTH_NAMES[m]} ${yr}</b>,<br/>how many days from <b style="color:#1B5E20">${a} ${MONTH_NAMES[m]}</b> to <b style="color:#E91E63">${b} ${MONTH_NAMES[m]}</b>?<br/><span style="font-size:0.88rem;color:#607D8B">(Don't count ${a} itself)</span>`,
            visual: calSVG(m, yr, Array.from({ length: b - a + 1 }, (_, i) => a + i), '#C8E6C9', b, '#2E7D32'),
            options: makeOpts(String(diff), [String(diff - 1), String(diff + 1), String(diff + 2)]),
            answer: String(diff),
            solution: `${b} − ${a} = <b>${diff} days</b>. Count the green shaded dates to verify! 🟢`
        });
    }

    // ── TYPE 8: Nth occurrence of weekday ─────────────────────────────────────
    {
        const m = randomInt(0, 11);
        const fd = firstDow(m, yr), total = daysIn(m, yr);
        const dow = randomInt(1, 5); // Mon–Fri
        const occ = randomInt(2, 3);
        let found = 0, ans = -1, allOcc = [];
        for (let d = 1; d <= total; d++) {
            if ((fd + d - 1) % 7 === dow) { found++; allOcc.push(d); if (found === occ) ans = d; }
        }
        qs.push({
            text: `🔢 In <b>${MONTH_NAMES[m]} ${yr}</b>,<br/>what is the date of the <b style="color:#F57F17">${occ === 2 ? '2nd' : '3rd'} ${DAY_FULL[dow]}</b>?<br/><span style="font-size:0.88rem;color:#607D8B">Previous occurrences are shaded 🟡</span>`,
            visual: calSVG(m, yr, allOcc.slice(0, occ - 1), '#FFF9C4', ans, '#F57F17'),
            options: makeOpts(String(ans), [String(ans - 7), String(ans - 1), String(ans + 7)]),
            answer: String(ans),
            solution: `${DAY_FULL[dow]}s in ${MONTH_NAMES[m]}: ${allOcc.join(', ')}. The ${occ === 2 ? '2nd' : '3rd'} one is <b>${ans}</b>! 🌟`
        });
    }

    // ── TYPE 9: Complete weeks in a month ─────────────────────────────────────
    {
        const m = randomInt(0, 11);
        const total = daysIn(m, yr);
        const weeks = Math.floor(total / 7);
        const extra = total % 7;
        qs.push({
            text: `⏱️ <b>${MONTH_NAMES[m]} ${yr}</b> has <b style="color:#1565C0">${total} days</b>.<br/>How many <b>complete weeks</b> are in this month?<br/><span style="font-size:0.88rem;color:#607D8B">Hint: 1 week = 7 days 📅</span>`,
            visual: calSVG(m, yr, Array.from({ length: weeks * 7 }, (_, i) => i + 1), '#B2DFDB'),
            options: makeOpts(String(weeks), [String(weeks - 1), String(weeks + 1), String(weeks + 2)]),
            answer: String(weeks),
            solution: `${total} ÷ 7 = <b>${weeks} complete weeks</b> with ${extra} extra days. Teal dates = complete weeks! 🏁`
        });
    }

    // ── TYPE 10: Which month has X days? ──────────────────────────────────────
    {
        const options = [
            { count: 28, name: 'February' },
            { count: 30, name: pick(['April', 'June', 'September', 'November']) },
            { count: 31, name: pick(['January', 'March', 'May', 'July', 'August', 'October', 'December']) }
        ];
        const tgt = pick(options);
        const wrong = options.filter(o => o.count !== tgt.count).map(o => o.name);
        const m = MONTH_NAMES.indexOf(tgt.name);
        qs.push({
            text: `🌍 Which month of the year has exactly <b style="color:#E91E63">${tgt.count} days</b>?${tgt.count === 28 ? '<br/><span style="font-size:0.88rem;color:#607D8B">(in a non-leap year)</span>' : ''}<br/><span style="font-size:0.88rem;color:#607D8B">Check the grid below 👇</span>`,
            visual: monthGridSVG(tgt.count, tgt.name, yr),
            options: makeStrOpts(tgt.name, shuffle(wrong.concat(shuffle(MONTH_NAMES.filter(n => n !== tgt.name && !wrong.includes(n))).slice(0, 2)))),
            answer: tgt.name,
            solution: `<b>${tgt.name}</b> has <b>${tgt.count} days</b>! 31-day months: Jan, Mar, May, Jul, Aug, Oct, Dec. 30-day: Apr, Jun, Sep, Nov. Feb = 28 (29 in leap year). ⭐`
        });
    }

    // ── BIRTH CERTIFICATE HELPERS & DATA ──────────────────────────────────────
    const bMonthIdx = randomInt(3, 8); // Apr to Sep to leave room for future dates in same year
    const bDay = randomInt(2, 25);
    const bYear = randomInt(currYr - 12, currYr - 8); // kid is 8-12 yrs old now
    const regDay = bDay + randomInt(1, 5); // registered a few days later
    const issueDay = regDay + randomInt(1, 15);
    const issueMonth = bMonthIdx + (issueDay > daysIn(bMonthIdx, bYear) ? 1 : 0);
    const issueDayAdj = issueDay > daysIn(bMonthIdx, bYear) ? issueDay - daysIn(bMonthIdx, bYear) : issueDay;

    const bMonthName = MONTH_NAMES[bMonthIdx];
    const bMonthNumStr = String(bMonthIdx + 1).padStart(2, '0');
    const bDayStr = String(bDay).padStart(2, '0');
    const regDayStr = String(regDay).padStart(2, '0');
    const issueDayStr = String(issueDayAdj).padStart(2, '0');
    const issueMonthStr = String(issueMonth + 1).padStart(2, '0');

    const numberToWords = {
        1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth', 6: 'Sixth', 7: 'Seventh', 8: 'Eighth', 9: 'Ninth', 10: 'Tenth',
        11: 'Eleventh', 12: 'Twelfth', 13: 'Thirteenth', 14: 'Fourteenth', 15: 'Fifteenth', 16: 'Sixteenth', 17: 'Seventeenth',
        18: 'Eighteenth', 19: 'Nineteenth', 20: 'Twentieth', 21: 'Twenty First', 22: 'Twenty Second', 23: 'Twenty Third',
        24: 'Twenty Fourth', 25: 'Twenty Fifth', 26: 'Twenty Sixth', 27: 'Twenty Seventh', 28: 'Twenty Eighth', 29: 'Twenty Ninth', 30: 'Thirtieth', 31: 'Thirty First'
    };

    // Generate cert data once for consistency across any selected cert questions
    const certData = {
        name: pick(['Bincy Thomas Jacob', 'Aarav Patel', 'Riya Sharma', 'Karthik Nair', 'Sneha Reddy']),
        sex: pick(['Female', 'Male']),
        dob: `${bDayStr}/${bMonthNumStr}/${bYear}`,
        dobText: `${numberToWords[bDay]} ${bMonthName} Two Thousand ${bYear > 2000 ? bYear - 2000 : bYear}`,
        pob: pick(['Kadampuzha Hospital', 'City Hospital', 'Metro Care Clinic', 'Sunrise Hospital']),
        father: 'Jacob/Ravi/Arun'.split('/')[randomInt(0, 2)],
        mother: 'Lara/Priya/Deepa'.split('/')[randomInt(0, 2)],
        regDate: `${regDayStr}/${bMonthNumStr}/${bYear}`,
        regNum: `${randomInt(100, 999)}/${bYear.toString().slice(-2)}`,
        issueDate: `${issueDayStr}. ${issueMonthStr}. ${bYear}`,
        regYear: String(bYear)
    };
    const bName = certData.name.split(' ')[0];

    // ── TYPE 11: Birth Certificate - Month Translation ────────────────────────
    {
        const opts = shuffle([bMonthName, MONTH_NAMES[(bMonthIdx + 1) % 12], MONTH_NAMES[(bMonthIdx + 2) % 12], MONTH_NAMES[(bMonthIdx + 11) % 12]]);
        qs.push({
            text: `Look at ${bName}'s birth certificate.<br/>${bDayStr}/${bMonthNumStr}/${bYear} shows that ${bName} was born on <br/><b style="color:#B8860B">${bDay} (_____)</b> in the year ${bYear}.`,
            visual: birthCertSVG(certData),
            options: makeStrOpts(bMonthName, opts.filter(o => o !== bMonthName).slice(0, 3)),
            answer: bMonthName,
            solution: `The month number is <b>${bMonthNumStr}</b>. Month ${bMonthNumStr} of the year is <b>${bMonthName}</b>! 🗓️`
        });
    }

    // ── TYPE 12: Birth Certificate - Age on specific future date ──────────────
    {
        const targetYr = bYear + 10;
        const ans = targetYr - bYear;
        qs.push({
            text: `Look at the birth certificate.<br/>How old will ${bName} be on <b style="color:#B8860B">${bDay} ${bMonthName} ${targetYr}</b>?`,
            visual: birthCertSVG(certData),
            options: makeOpts(String(ans), [String(ans - 1), String(ans + 1), String(ans + 2)]),
            answer: String(ans),
            solution: `${targetYr} − ${bYear} (birth year) = <b>${ans} years old</b>! 🎂`
        });
    }

    // ── TYPE 13: Birth Certificate - Age in specific year ─────────────────────
    {
        const targetYr = bYear + randomInt(15, 25);
        const ans = targetYr - bYear;
        qs.push({
            text: `Look at the birth certificate.<br/>How old will ${bName} be in the year <b style="color:#B8860B">${targetYr}</b>?`,
            visual: birthCertSVG(certData),
            options: makeOpts(String(ans), [String(ans - 1), String(ans + 1), String(ans + 2)]),
            answer: String(ans),
            solution: `${targetYr} − ${bYear} = <b>${ans} years old</b>! 🎉`
        });
    }

    // ── TYPE 14: Birth Certificate - Date of Nth birthday ─────────────────────
    {
        const nth = randomInt(5, 12);
        const nthWords = { 5: 'Fifth', 6: 'Sixth', 7: 'Seventh', 8: 'Eighth', 9: 'Ninth', 10: 'Tenth', 11: 'Eleventh', 12: 'Twelfth' };
        const targetYr = bYear + nth;
        const ans = `${bDayStr}/${bMonthNumStr}/${targetYr}`;
        const w1 = `${bDayStr}/${bMonthNumStr}/${targetYr - 1}`;
        const w2 = `${bDayStr}/${bMonthNumStr}/${targetYr + 1}`;
        const w3 = `${String(bDay + 1).padStart(2, '0')}/${bMonthNumStr}/${targetYr}`;
        qs.push({
            text: `Look at the birth certificate.<br/>The <b style="color:#B8860B">${nthWords[nth]} Birthday</b> of ${bName} will be on which date?`,
            visual: birthCertSVG(certData),
            options: makeStrOpts(ans, [w1, w2, w3]),
            answer: ans,
            solution: `Add ${nth} years to the birth year (${bYear}): ${bYear} + ${nth} = <b>${targetYr}</b>. The date is <b>${ans}</b>! 🎁`
        });
    }

    // ── TYPE 15: Birth Certificate - Age in months on specific date ───────────
    {
        const addMonths = randomInt(2, 6);
        const targetMonthIdx = bMonthIdx + addMonths;
        const targetMonthName = MONTH_NAMES[targetMonthIdx];
        const ans = addMonths; // exactly addMonths later
        qs.push({
            text: `Look at the birth certificate.<br/>${bName} was <b style="color:#B8860B">_____ months old</b> on ${bDay} ${targetMonthName} ${bYear}.`,
            visual: birthCertSVG(certData),
            options: makeOpts(String(ans), [String(ans - 1), String(ans + 1), String(ans + 2)]),
            answer: String(ans),
            solution: `Count the months from ${bMonthName} to ${targetMonthName}: ${bMonthName} → ${targetMonthName} is <b>${ans} months</b>! 👶`
        });
    }

    // ── TYPE 16: Birth Certificate - Days after birth till issue ──────────────
    {
        // Simple days diff within same month or next month for small numbers
        const daysDiff = (issueMonth === bMonthIdx) ? (issueDayAdj - bDay) : (daysIn(bMonthIdx, bYear) - bDay + issueDayAdj);
        qs.push({
            text: `Look at the birth certificate.<br/>After <b style="color:#B8860B">how many days</b> of birth was the certificate issued?`,
            visual: birthCertSVG(certData),
            options: makeOpts(String(daysDiff), [String(daysDiff - 1), String(daysDiff + 1), String(daysDiff + 2)]),
            answer: String(daysDiff),
            solution: `Birth date: ${bDayStr}/${bMonthNumStr}. Issue date: ${issueDayStr}/${issueMonthStr}. The difference is <b>${daysDiff} days</b>! 📝`
        });
    }

    return shuffle(qs).slice(0, 10); // randomly pick 10 from the pool of 16
}


// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const CalendarQuestions = () => {
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
    const [questions, setQuestions] = useState([]);

    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 9010;
    const SKILL_NAME = 'Calendar — Time Goes On';
    const TOTAL_QUESTIONS = 10;

    useEffect(() => {
        const qs = makeQuestions();
        setQuestions(qs);
        setCurrentQuestion(qs[0]);
        setShuffledOptions(qs[0].options); // already shuffled by makeOpts/makeStrOpts
    }, []);

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

    const goToQ = (idx, qs) => {
        const q = qs[idx];
        setCurrentQuestion(q);
        setShuffledOptions(q.options);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage('');
    };

    const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

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
                question_text: `${SKILL_NAME} — Q${qIndex + 1}`,
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
            const ni = qIndex + 1;
            setQIndex(ni);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
            goToQ(ni, questions);
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const tc = Object.values(answers).filter(v => v === true).length;
                api.createReport({
                    title: SKILL_NAME, type: 'practice',
                    score: (tc / TOTAL_QUESTIONS) * 100,
                    parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId, 10),
                }).catch(console.error);
            }
            setFinalTime(timeElapsed);
            setShowReport(true);
        }
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            const pi = qIndex - 1;
            setQIndex(pi);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
            goToQ(pi, questions);
        }
    };

    if (!currentQuestion && !showReport) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh' }}>Loading...</div>;

    if (showReport) {
        const tc = Object.values(answers).filter(v => v === true).length;
        const pct = Math.round((tc / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans",sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                    style={{ background: 'white', borderRadius: '2rem', padding: '2.5rem 3rem', maxWidth: '480px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(79,183,179,0.2)', border: '3px solid rgba(79,183,179,0.3)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐'}</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#31326F', marginBottom: '0.25rem' }}>Practice Complete!</h2>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Calendar — Time Goes On</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
                        {[['#f0fdf4', '#86efac', '#16a34a', `${tc}/${TOTAL_QUESTIONS}`, 'Correct'],
                        ['#eff6ff', '#93c5fd', '#2563eb', `${pct}%`, 'Score'],
                        ['#fef3c7', '#fcd34d', '#d97706', formatTime(finalTime), 'Time']
                        ].map(([bg, border, fg, val, lbl]) => (
                            <div key={lbl} style={{ background: bg, borderRadius: '1rem', padding: '0.9rem 1.2rem', border: `2px solid ${border}` }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: fg }}>{val}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{lbl}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '1.05rem', color: '#31326F', fontWeight: 700, marginBottom: '1.5rem' }}>
                        {pct >= 80 ? "🎉 Excellent! You're a calendar master!" : pct >= 50 ? '👍 Good effort! Keep practicing!' : "💪 Keep going, you'll improve!"}
                    </p>
                    <button onClick={() => navigate(-1)} className="nav-pill-next-btn" style={{ width: '100%', justifyContent: 'center' }}>
                        Go Back <ChevronRight size={22} strokeWidth={3} />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans",sans-serif', height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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

            <main className="practice-content-wrapper" style={{ flex: 1, overflow: 'hidden', padding: '0.35rem 0.6rem', display: 'flex', alignItems: 'stretch' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="question-card-modern" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div className="question-header-modern" style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                    <h2 className="question-text-modern" style={{ fontSize: 'clamp(0.82rem,1.7vw,1.05rem)', fontWeight: 600, textAlign: 'center', margin: '0 0 0.2rem' }}>
                                        <LatexContent html={currentQuestion.text} />
                                    </h2>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 1 auto', minHeight: 0, overflow: 'hidden', padding: '0.2rem', background: 'rgba(255,255,255,0.5)', borderRadius: '0.75rem' }}>
                                        <div dangerouslySetInnerHTML={{ __html: currentQuestion.visual }} style={{ width: '100%', maxHeight: '100%', overflow: 'visible', display: 'flex', justifyContent: 'center' }} />
                                    </div>
                                </div>

                                <div className="interaction-area-modern" style={{ padding: '0.3rem 0.75rem 0.35rem' }}>
                                    <div className="options-grid-modern">
                                        {shuffledOptions.map((option, idx) => (
                                            <button key={idx}
                                                className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.answer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                style={{ fontWeight: 600, fontSize: '0.95rem', padding: '0.4rem 0.5rem', minHeight: '40px' }}
                                                onClick={() => { if (!isSubmitted) setSelectedOption(option); }}
                                                disabled={isSubmitted}>
                                                <LatexContent html={option} />
                                            </button>
                                        ))}
                                    </div>
                                    {isSubmitted && isCorrect && (
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '5px', padding: '0.3rem 0.5rem', fontSize: '0.88rem' }}>
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

export default CalendarQuestions;
