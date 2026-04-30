/* ═══════════════════════════════════════════════════════
   The Other Side of Zero — Dynamic Questions (Grade 6)
   Interactive questions for: Number Line, Building/Lift, Tokens, Real-World
   ═══════════════════════════════════════════════════════ */

// ── Helpers ─────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// ── SVG Generators ──────────────────────────────────

function drawNumberLineSVG(highlight = null, color = '#3b82f6', range = [-7, 7]) {
    const lo = range[0], hi = range[1];
    const count = hi - lo + 1;
    const w = count * 32 + 40;
    let marks = '';
    for (let n = lo; n <= hi; n++) {
        const x = 20 + (n - lo) * 32;
        const isHL = highlight !== null && n === highlight;
        marks += `<line x1="${x}" y1="28" x2="${x}" y2="42" stroke="${isHL ? '#ef4444' : color}" stroke-width="${isHL ? 3 : 1.5}"/>`;
        marks += `<text x="${x}" y="58" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="${isHL ? '900' : '600'}" fill="${isHL ? '#ef4444' : '#334155'}">${n}</text>`;
        if (isHL) marks += `<circle cx="${x}" cy="20" r="8" fill="#ef4444"/><text x="${x}" y="24" text-anchor="middle" fill="white" font-size="9" font-weight="bold">?</text>`;
    }
    return `<svg viewBox="0 0 ${w} 65" width="100%" height="65" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="35" x2="${w - 10}" y2="35" stroke="${color}" stroke-width="2"/>
        <polygon points="${w - 10},30 ${w},35 ${w - 10},40" fill="${color}"/>
        <polygon points="10,30 0,35 10,40" fill="${color}"/>
        ${marks}
    </svg>`;
}

function drawNumberLineJumpSVG(start, jumps, color = '#3b82f6') {
    const end = start + jumps;
    const lo = Math.min(start, end, -1) - 2;
    const hi = Math.max(start, end, 1) + 2;
    const count = hi - lo + 1;
    const w = count * 32 + 40;
    let marks = '';
    for (let n = lo; n <= hi; n++) {
        const x = 20 + (n - lo) * 32;
        const isStart = n === start;
        const isEnd = n === end;
        marks += `<line x1="${x}" y1="28" x2="${x}" y2="42" stroke="${(isStart || isEnd) ? '#ef4444' : color}" stroke-width="${(isStart || isEnd) ? 3 : 1.5}"/>`;
        marks += `<text x="${x}" y="58" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="${(isStart || isEnd) ? '900' : '600'}" fill="${(isStart || isEnd) ? '#ef4444' : '#334155'}">${n}</text>`;
        if (isStart) marks += `<circle cx="${x}" cy="16" r="6" fill="#10b981"/><text x="${x}" y="20" text-anchor="middle" fill="white" font-size="8" font-weight="bold">S</text>`;
        if (isEnd) marks += `<circle cx="${x}" cy="16" r="6" fill="#ef4444"/><text x="${x}" y="20" text-anchor="middle" fill="white" font-size="8" font-weight="bold">?</text>`;
    }
    // Draw arc for jump
    const startX = 20 + (start - lo) * 32;
    const endX = 20 + (end - lo) * 32;
    const midX = (startX + endX) / 2;
    const arcY = jumps > 0 ? 10 : 10;
    marks += `<path d="M ${startX} 16 Q ${midX} ${arcY - 15} ${endX} 16" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>`;
    marks += `<text x="${midX}" y="${arcY - 16}" text-anchor="middle" font-size="10" font-weight="bold" fill="#d97706">${jumps > 0 ? '+' : ''}${jumps}</text>`;

    return `<svg viewBox="0 0 ${w} 65" width="100%" height="65" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="35" x2="${w - 10}" y2="35" stroke="${color}" stroke-width="2"/>
        <polygon points="${w - 10},30 ${w},35 ${w - 10},40" fill="${color}"/>
        <polygon points="10,30 0,35 10,40" fill="${color}"/>
        ${marks}
    </svg>`;
}

function drawBuildingSVG(startFloor, targetFloor, color = '#0891b2') {
    const lo = Math.min(startFloor, targetFloor, -3);
    const hi = Math.max(startFloor, targetFloor, 3);
    const floors = [];
    for (let f = hi; f >= lo; f--) floors.push(f);
    const h = floors.length * 28 + 40;
    let body = '';
    floors.forEach((f, i) => {
        const y = 20 + i * 28;
        const isStart = f === startFloor;
        const isTarget = f === targetFloor;
        const bgColor = f === 0 ? '#fef3c7' : f > 0 ? '#ecfdf5' : '#fef2f2';
        const textColor = f === 0 ? '#92400e' : f > 0 ? '#047857' : '#dc2626';
        body += `<rect x="20" y="${y}" width="120" height="26" rx="4" fill="${bgColor}" stroke="${isStart || isTarget ? '#0f172a' : '#e2e8f0'}" stroke-width="${isStart || isTarget ? 2 : 1}"/>`;
        body += `<text x="80" y="${y + 18}" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="${textColor}">${f >= 0 ? '+' : ''}${f}</text>`;
        if (isStart) body += `<rect x="145" y="${y + 2}" width="40" height="22" rx="6" fill="#10b981"/><text x="165" y="${y + 17}" text-anchor="middle" fill="white" font-size="10" font-weight="bold">Start</text>`;
        if (isTarget) body += `<rect x="145" y="${y + 2}" width="24" height="22" rx="6" fill="#ef4444"/><text x="157" y="${y + 17}" text-anchor="middle" fill="white" font-size="10" font-weight="bold">?</text>`;
    });
    return `<svg viewBox="0 0 200 ${h}" width="200" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <text x="80" y="14" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="800" fill="${color}">Building of Fun</text>
        ${body}
    </svg>`;
}

function drawTokensSVG(positives, negatives, color = '#0891b2') {
    const maxTokens = Math.max(positives, negatives);
    const w = Math.max(maxTokens * 30 + 80, 200);
    let tokens = '';
    // Draw positive tokens (green)
    for (let i = 0; i < positives; i++) {
        tokens += `<circle cx="${40 + i * 28}" cy="25" r="12" fill="#10b981"/>`;
        tokens += `<text x="${40 + i * 28}" y="30" text-anchor="middle" fill="white" font-weight="bold" font-size="14">+</text>`;
    }
    // Draw negative tokens (red)
    for (let i = 0; i < negatives; i++) {
        tokens += `<circle cx="${40 + i * 28}" cy="60" r="12" fill="#ef4444"/>`;
        tokens += `<text x="${40 + i * 28}" y="65" text-anchor="middle" fill="white" font-weight="bold" font-size="14">−</text>`;
    }
    tokens += `<text x="10" y="30" font-size="10" font-weight="700" fill="#10b981" font-family="sans-serif">+</text>`;
    tokens += `<text x="10" y="65" font-size="10" font-weight="700" fill="#ef4444" font-family="sans-serif">−</text>`;
    return `<svg viewBox="0 0 ${w} 80" width="100%" height="80" xmlns="http://www.w3.org/2000/svg">${tokens}</svg>`;
}

// ═══════════════════════════════════════════════════════
// SKILL 1: Number Line & Integers Basics
// ═══════════════════════════════════════════════════════
export function generateNumberLineQuestions() {
    const questions = [];

    // ── INTERACTIVE: Click the correct position on the number line ──
    const nlPos1 = randInt(-5, 5);
    questions.push({
        question: `Click on the number line to mark the integer ${nlPos1}.`,
        type: 'number-line-click',
        range: [-7, 7],
        targetAnswer: nlPos1,
        explanation: `The integer ${nlPos1} is located at position ${nlPos1} on the number line.`
    });

    // ── INTERACTIVE: Predecessor on number line ──
    const nlPred = randInt(-4, 5);
    questions.push({
        question: `Click on the predecessor (the number just BEFORE) ${nlPred} on the number line.`,
        type: 'number-line-click',
        range: [-7, 7],
        targetAnswer: nlPred - 1,
        explanation: `The predecessor of ${nlPred} is ${nlPred} − 1 = ${nlPred - 1}. It is one step to the LEFT.`
    });

    // ── INTERACTIVE: Successor on number line ──
    const nlSucc = randInt(-5, 4);
    questions.push({
        question: `Click on the successor (the number just AFTER) ${nlSucc} on the number line.`,
        type: 'number-line-click',
        range: [-7, 7],
        targetAnswer: nlSucc + 1,
        explanation: `The successor of ${nlSucc} is ${nlSucc} + 1 = ${nlSucc + 1}. It is one step to the RIGHT.`
    });

    // ── INTERACTIVE: Addition result on number line ──
    const nlA = randInt(-3, 3), nlB = randInt(-4, 4);
    const nlSum = nlA + nlB;
    if (nlSum >= -7 && nlSum <= 7) {
        questions.push({
            question: `Calculate ${nlA} + (${nlB >= 0 ? '+' : ''}${nlB}) and click the result on the number line.`,
            type: 'number-line-click',
            range: [-7, 7],
            startMarker: nlA,
            jumpLabel: `${nlB >= 0 ? '+' : ''}${nlB}`,
            targetAnswer: nlSum,
            explanation: `${nlA} + (${nlB >= 0 ? '+' : ''}${nlB}) = ${nlSum}. Start at ${nlA} and move ${Math.abs(nlB)} steps ${nlB > 0 ? 'right' : 'left'}.`
        });
    }

    // ── INTERACTIVE: Integer between two on number line ──
    const nlLo = randInt(-6, -2), nlHi = nlLo + 2;
    questions.push({
        question: `Click on the integer that lies exactly between ${nlLo} and ${nlHi}.`,
        type: 'number-line-click',
        range: [-7, 7],
        targetAnswer: nlLo + 1,
        explanation: `The integer between ${nlLo} and ${nlHi} is ${nlLo + 1}.`
    });

    // Q1: Compare two integers
    const a2 = randInt(-8, -1), b2 = randInt(1, 8);
    questions.push({
        question: `Which is greater: ${a2} or ${b2}?`,
        svg: drawNumberLineSVG(null, '#3b82f6', [Math.min(a2, b2) - 1, Math.max(a2, b2) + 1]),
        options: [String(a2), String(b2), 'They are equal', 'Cannot be determined'],
        correct: 1,
        explanation: `On a number line, ${b2} is to the right of ${a2}, so ${b2} > ${a2}. Any positive number is always greater than any negative number.`
    });

    // Q2: Compare two negatives
    const a3 = randInt(-9, -5), b3 = randInt(-4, -1);
    questions.push({
        question: `Which is greater: ${a3} or ${b3}?`,
        svg: drawNumberLineSVG(null, '#6366f1', [a3 - 1, b3 + 1]),
        options: [String(a3), String(b3), 'They are equal', 'Cannot tell'],
        correct: 1,
        explanation: `${b3} is to the right of ${a3} on the number line, so ${b3} > ${a3}. Think of temperature: ${b3}°C is warmer than ${a3}°C.`
    });

    // Q3: Order integers from smallest to largest
    const nums4 = shuffle([randInt(-7, -3), randInt(-2, 0), randInt(1, 4), randInt(5, 8)]);
    const sorted4 = [...nums4].sort((a, b) => a - b);
    const sortedStr = sorted4.join(', ');
    questions.push({
        question: `Arrange these integers from smallest to largest: ${nums4.join(', ')}`,
        options: [
            sortedStr,
            [...sorted4].reverse().join(', '),
            shuffle([...nums4]).join(', '),
            shuffle([...nums4]).join(', ')
        ],
        correct: 0,
        explanation: `On a number line, left to right order gives us: ${sortedStr}.`
    });

    // Q4: What is zero?
    questions.push({
        question: 'Zero is:',
        options: ['A positive integer', 'A negative integer', 'Neither positive nor negative', 'Not an integer'],
        correct: 2,
        explanation: 'Zero is the boundary between positive and negative integers. It is neither positive nor negative, but it IS an integer.'
    });

    // Q5: Distance on number line
    const a10 = randInt(-5, 0), b10 = randInt(1, 6);
    questions.push({
        question: `How many steps is it from ${a10} to ${b10} on the number line?`,
        type: 'text',
        answer: String(b10 - a10),
        explanation: `The distance from ${a10} to ${b10} = ${b10} − (${a10}) = ${b10 - a10} steps.`
    });

    // Q6: Negative integers definition
    questions.push({
        question: 'A negative integer is always:',
        options: ['Greater than zero', 'Less than zero', 'Equal to zero', 'Greater than all positive integers'],
        correct: 1,
        explanation: 'By definition, negative integers are always less than zero.'
    });

    // Q7: Which is NOT an integer
    questions.push({
        question: 'Which of the following is NOT an integer?',
        options: ['-5', '0', '3.5', '100'],
        correct: 2,
        explanation: '3.5 is a decimal, not a whole number. Integers are whole numbers only: ..., -2, -1, 0, 1, 2, ...'
    });

    return shuffle(questions).slice(0, 10);
}

// ═══════════════════════════════════════════════════════
// SKILL 2: Building (Lift) Model — Addition on Integers
// ═══════════════════════════════════════════════════════
export function generateBuildingQuestions() {
    const questions = [];

    // ── INTERACTIVE: Lift goes up — show result on number line ──
    const nlLiftUp = randInt(-3, 2), nlLiftMove = randInt(1, 4);
    const nlLiftEnd = nlLiftUp + nlLiftMove;
    if (nlLiftEnd >= -7 && nlLiftEnd <= 7) {
        questions.push({
            question: `Bela is on Floor ${nlLiftUp} and presses +${nlLiftMove}. Click on the number line to show which floor she reaches.`,
            type: 'number-line-click',
            range: [-7, 7],
            startMarker: nlLiftUp,
            jumpLabel: `+${nlLiftMove}`,
            targetAnswer: nlLiftEnd,
            explanation: `Starting Floor + Movement = ${nlLiftUp} + ${nlLiftMove} = ${nlLiftEnd}.`
        });
    }

    // ── INTERACTIVE: Lift goes down — show result on number line ──
    const nlLiftDn = randInt(1, 4), nlLiftDnMove = randInt(2, 5);
    const nlLiftDnEnd = nlLiftDn - nlLiftDnMove;
    if (nlLiftDnEnd >= -7 && nlLiftDnEnd <= 7) {
        questions.push({
            question: `Bela is on Floor +${nlLiftDn} and presses −${nlLiftDnMove}. Click on the number line to show where she ends up.`,
            type: 'number-line-click',
            range: [-7, 7],
            startMarker: nlLiftDn,
            jumpLabel: `−${nlLiftDnMove}`,
            targetAnswer: nlLiftDnEnd,
            explanation: `${nlLiftDn} + (−${nlLiftDnMove}) = ${nlLiftDnEnd}.`
        });
    }

    // Q1: Simple lift movement up
    const start1 = randInt(-3, 2), move1 = randInt(1, 4);
    const end1 = start1 + move1;
    questions.push({
        question: `Bela is on Floor ${start1} and presses +${move1}. Which floor does she reach?`,
        svg: drawBuildingSVG(start1, end1),
        type: 'text',
        answer: String(end1),
        explanation: `Starting Floor + Movement = ${start1} + ${move1} = ${end1}.`
    });

    // Q2: Simple lift movement down
    const start2 = randInt(1, 4), move2 = randInt(1, 5);
    const end2 = start2 - move2;
    questions.push({
        question: `Bela is on Floor +${start2} and presses −${move2}. Which floor does she reach?`,
        svg: drawBuildingSVG(start2, end2),
        type: 'text',
        answer: String(end2),
        explanation: `Starting Floor + Movement = ${start2} + (−${move2}) = ${end2}.`
    });

    // Q3: Start from negative, go up
    const start3 = randInt(-4, -1), move3 = randInt(2, 6);
    const end3 = start3 + move3;
    questions.push({
        question: `Starting from Floor ${start3}, Bela presses +${move3}. Where does she end up?`,
        svg: drawBuildingSVG(start3, end3),
        type: 'text',
        answer: String(end3),
        explanation: `${start3} + ${move3} = ${end3}.`
    });

    // Q4: Multi-step lift (two presses)
    const s4 = randInt(-2, 2), m4a = randInt(1, 3), m4b = randInt(-4, -1);
    const after4a = s4 + m4a;
    const after4b = after4a + m4b;
    questions.push({
        question: `Bela starts at Floor ${s4}. She first presses +${m4a}, then presses ${m4b}. Which floor is she on now?`,
        svg: drawBuildingSVG(s4, after4b),
        type: 'text',
        answer: String(after4b),
        explanation: `Step 1: ${s4} + ${m4a} = ${after4a}. Step 2: ${after4a} + (${m4b}) = ${after4b}.`
    });

    // Q5: Find the button pressed (MCQ)
    const s5 = randInt(-3, 3), e5 = randInt(-4, 4);
    const move5 = e5 - s5;
    questions.push({
        question: `Bela went from Floor ${s5} to Floor ${e5}. What button(s) did she press?`,
        svg: drawBuildingSVG(s5, e5),
        options: [
            `${move5 > 0 ? '+' : ''}${move5}`,
            `${-move5 > 0 ? '+' : ''}${-move5}`,
            `${move5 + 1 > 0 ? '+' : ''}${move5 + 1}`,
            `${move5 - 1 > 0 ? '+' : ''}${move5 - 1}`
        ],
        correct: 0,
        explanation: `Movement = Target − Start = ${e5} − (${s5}) = ${move5 > 0 ? '+' : ''}${move5}.`
    });

    // Q6: Return to ground floor
    const s6 = randInt(-5, 5);
    if (s6 === 0) s6 === 0; // keep it interesting
    const returnMove = -s6;
    questions.push({
        question: `Bela is on Floor ${s6}. What button must she press to return to the Ground Floor (0)?`,
        type: 'text',
        answer: String(returnMove),
        explanation: `To go from ${s6} to 0, she must press ${returnMove > 0 ? '+' : ''}${returnMove}. This is the additive inverse of ${s6}.`
    });

    // Q7: Concept question - inverse
    questions.push({
        question: 'If you press +4 then −4 in the lift, what is the net result?',
        options: ['+8', '−8', '0 (back to starting floor)', '+4'],
        correct: 2,
        explanation: '+4 and −4 are inverses. Their combined effect is zero — you end up where you started!'
    });

    // Q8: Three-step lift
    const s8 = 0;
    const moves8 = [randInt(1, 3), randInt(-4, -2), randInt(1, 3)];
    let pos8 = s8;
    const steps8 = moves8.map(m => { pos8 += m; return pos8; });
    questions.push({
        question: `Starting at Ground Floor (0), Bela presses: +${moves8[0]}, then ${moves8[1]}, then +${moves8[2]}. Which floor is she on?`,
        type: 'text',
        answer: String(pos8),
        explanation: `0 + ${moves8[0]} = ${steps8[0]}; ${steps8[0]} + (${moves8[1]}) = ${steps8[1]}; ${steps8[1]} + ${moves8[2]} = ${steps8[2]}.`
    });

    // Q9: Which floor is higher?
    const f9a = randInt(-4, -1), f9b = randInt(1, 4);
    questions.push({
        question: `Which floor is higher: Floor ${f9a} or Floor ${f9b}?`,
        options: [`Floor ${f9a}`, `Floor ${f9b}`, 'They are the same height', 'Cannot be determined'],
        correct: 1,
        explanation: `Floor ${f9b} is above ground, while Floor ${f9a} is below ground. So Floor ${f9b} is higher.`
    });

    // Q10: Building word problem
    const depth = randInt(2, 5);
    const rise = randInt(3, 7);
    questions.push({
        question: `A building has ${depth} basement floors and ${rise} floors above ground. If the ground floor is 0, what is the number of the topmost floor?`,
        options: [`+${rise}`, `+${rise + depth}`, `−${depth}`, String(rise - depth)],
        correct: 0,
        explanation: `The topmost floor is Floor +${rise}. The deepest basement is Floor −${depth}.`
    });

    return shuffle(questions).slice(0, 10);
}

// ═══════════════════════════════════════════════════════
// SKILL 3: Token Model — Addition & Subtraction
// ═══════════════════════════════════════════════════════
export function generateTokenQuestions() {
    const questions = [];

    // ── INTERACTIVE: Show token result on number line ──
    const nlTkP = randInt(2, 6), nlTkN = randInt(1, 5);
    const nlTkResult = nlTkP - nlTkN;
    if (nlTkResult >= -7 && nlTkResult <= 7) {
        questions.push({
            question: `You have ${nlTkP} positive tokens and ${nlTkN} negative tokens. Click on the number line to show the result after removing all zero pairs.`,
            type: 'number-line-click',
            range: [-7, 7],
            targetAnswer: nlTkResult,
            explanation: `${Math.min(nlTkP, nlTkN)} zero pairs cancel out. Result = ${nlTkP} − ${nlTkN} = ${nlTkResult}.`
        });
    }

    // ── INTERACTIVE: Addition using number line with tokens context ──
    const nlTk2A = randInt(1, 5), nlTk2B = randInt(-6, -2);
    const nlTk2Sum = nlTk2A + nlTk2B;
    if (nlTk2Sum >= -7 && nlTk2Sum <= 7) {
        questions.push({
            question: `Using tokens: (+${nlTk2A}) + (${nlTk2B}). Click on the number line to show the answer.`,
            type: 'number-line-click',
            range: [-7, 7],
            startMarker: nlTk2A,
            jumpLabel: `${nlTk2B}`,
            targetAnswer: nlTk2Sum,
            explanation: `Start at +${nlTk2A} and move ${Math.abs(nlTk2B)} steps left: ${nlTk2A} + (${nlTk2B}) = ${nlTk2Sum}.`
        });
    }

    // Q1: Count remaining after zero pairs
    const p1 = randInt(3, 7), n1 = randInt(1, p1 - 1);
    questions.push({
        question: `You have ${p1} positive tokens (+) and ${n1} negative tokens (−). After removing all zero pairs, what is the result?`,
        svg: drawTokensSVG(p1, n1),
        type: 'text',
        answer: String(p1 - n1),
        explanation: `${n1} zero pairs cancel out. Remaining: ${p1} − ${n1} = +${p1 - n1}.`
    });

    // Q2: More negatives than positives
    const p2 = randInt(1, 4), n2 = randInt(p2 + 1, 8);
    questions.push({
        question: `You have ${p2} positive tokens and ${n2} negative tokens. What is the value after removing zero pairs?`,
        svg: drawTokensSVG(p2, n2),
        type: 'text',
        answer: String(p2 - n2),
        explanation: `${p2} zero pairs cancel. Remaining: ${p2} − ${n2} = ${p2 - n2} (${n2 - p2} negative tokens left).`
    });

    // Q3: What is a zero pair?
    questions.push({
        question: 'A "zero pair" is formed when you combine:',
        options: ['Two positive tokens', 'Two negative tokens', 'One positive token and one negative token', 'Three tokens of any kind'],
        correct: 2,
        explanation: 'A zero pair consists of one positive (+1) and one negative (−1) token. Together they equal 0.'
    });

    // Q4: Addition using tokens
    const a4 = randInt(2, 6), b4 = randInt(-5, -1);
    const result4 = a4 + b4;
    questions.push({
        question: `Using tokens, calculate: (+${a4}) + (${b4})`,
        svg: drawTokensSVG(a4, Math.abs(b4)),
        options: [String(result4), String(a4 + Math.abs(b4)), String(-(a4 + Math.abs(b4))), String(result4 + 2)],
        correct: 0,
        explanation: `Place ${a4} green tokens and ${Math.abs(b4)} red tokens. Remove ${Math.min(a4, Math.abs(b4))} zero pairs. Result = ${result4}.`
    });

    // Q5: Subtraction using tokens — subtracting a positive
    const a5 = randInt(3, 7), b5 = randInt(1, a5);
    questions.push({
        question: `Using tokens: (+${a5}) − (+${b5}) = ?`,
        type: 'text',
        answer: String(a5 - b5),
        explanation: `Start with ${a5} green tokens. Remove ${b5} green tokens. Remaining = +${a5 - b5}.`
    });

    // Q6: Subtraction — subtracting a negative (key concept!)
    const a6 = randInt(2, 5), b6 = randInt(1, 4);
    questions.push({
        question: `Using tokens: (+${a6}) − (−${b6}) = ?`,
        options: [String(a6 - b6), String(a6 + b6), String(-a6 - b6), String(-a6 + b6)],
        correct: 1,
        explanation: `Subtracting a negative = Adding its positive. (+${a6}) − (−${b6}) = (+${a6}) + (+${b6}) = ${a6 + b6}.`
    });

    // Q7: How many zero pairs?
    const p7 = randInt(3, 8), n7 = randInt(2, 7);
    const zeroPairs7 = Math.min(p7, n7);
    questions.push({
        question: `If you have ${p7} positive tokens and ${n7} negative tokens, how many zero pairs can you form?`,
        type: 'text',
        answer: String(zeroPairs7),
        explanation: `Each zero pair needs 1 positive and 1 negative. You can form min(${p7}, ${n7}) = ${zeroPairs7} zero pairs.`
    });

    // Q8: What remains?
    const p8 = randInt(4, 9), n8 = randInt(2, 7);
    const rem8 = p8 - n8;
    questions.push({
        question: `After removing all zero pairs from ${p8} positive and ${n8} negative tokens, the remaining value is:`,
        options: [String(rem8), String(-rem8), String(p8 + n8), '0'],
        correct: 0,
        explanation: `${Math.min(p8, n8)} zero pairs cancel. Remaining = ${p8} − ${n8} = ${rem8}.`
    });

    // Q9: Adding zero pairs doesn't change value
    questions.push({
        question: 'If you add 5 zero pairs to a collection of tokens, the total value:',
        options: ['Increases by 5', 'Decreases by 5', 'Stays the same', 'Becomes zero'],
        correct: 2,
        explanation: 'Each zero pair has a value of 0. Adding zero pairs does not change the total value!'
    });

    // Q10: Represent a number with tokens
    const target10 = randInt(-6, -1);
    questions.push({
        question: `To represent ${target10} using tokens, you need:`,
        options: [
            `${Math.abs(target10)} positive tokens only`,
            `${Math.abs(target10)} negative tokens only`,
            `${Math.abs(target10)} of each (positive and negative)`,
            `Zero tokens`
        ],
        correct: 1,
        explanation: `${target10} is negative, so you need ${Math.abs(target10)} red (negative) tokens and no green (positive) tokens.`
    });

    return shuffle(questions).slice(0, 10);
}

// ═══════════════════════════════════════════════════════
// SKILL 4: Real-World Contexts (Banking, Temperature, Geography)
// ═══════════════════════════════════════════════════════
export function generateRealWorldQuestions() {
    const questions = [];

    // Q1: Bank balance — credits and debits
    const credit1 = randInt(50, 200);
    const debit1 = randInt(30, credit1 - 10);
    const balance1 = credit1 - debit1;
    questions.push({
        question: `Ravi's bank account has ₹0. He receives a credit of ₹${credit1} and then a debit of ₹${debit1}. What is his balance?`,
        options: [`₹${balance1}`, `₹${credit1 + debit1}`, `−₹${balance1}`, `₹${debit1}`],
        correct: 0,
        explanation: `Credit means +${credit1}. Debit means −${debit1}. Balance = ${credit1} + (−${debit1}) = ₹${balance1}.`
    });

    // Q2: Temperature comparison
    const t2a = randInt(-15, -5), t2b = randInt(-4, 5);
    questions.push({
        question: `On a winter day, Delhi had a temperature of ${t2a}°C and Mumbai had ${t2b}°C. Which city was warmer?`,
        options: ['Delhi', 'Mumbai', 'Same temperature', 'Cannot be compared'],
        correct: 1,
        explanation: `${t2b}°C > ${t2a}°C (${t2b} is to the right on the number line), so Mumbai was warmer.`
    });

    // Q3: Temperature drop
    const startTemp = randInt(5, 15), drop3 = randInt(10, 25);
    const endTemp = startTemp - drop3;
    questions.push({
        question: `The temperature at noon was ${startTemp}°C. By midnight it dropped by ${drop3}°C. What was the midnight temperature?`,
        type: 'text',
        answer: String(endTemp),
        explanation: `${startTemp} − ${drop3} = ${endTemp}°C.`
    });

    // Q4: Sea level — above & below
    const mountain = randInt(100, 500);
    const trench = randInt(50, 300);
    const diff4 = mountain + trench;
    questions.push({
        question: `A hill is ${mountain} m above sea level (+${mountain} m). A lake bed is ${trench} m below sea level (−${trench} m). What is the total difference in elevation?`,
        type: 'text',
        answer: String(diff4),
        explanation: `Difference = (+${mountain}) − (−${trench}) = ${mountain} + ${trench} = ${diff4} m.`
    });

    // Q5: Multiple debits & credits
    const credits = [randInt(20, 80), randInt(30, 60)];
    const debits = [randInt(20, 50), randInt(10, 40)];
    const totalCredits = credits.reduce((a, b) => a + b, 0);
    const totalDebits = debits.reduce((a, b) => a + b, 0);
    const finalBalance = totalCredits - totalDebits;
    questions.push({
        question: `A bank account starts at ₹0. Credits: ₹${credits[0]}, ₹${credits[1]}. Debits: ₹${debits[0]}, ₹${debits[1]}. What is the final balance?`,
        options: [`₹${finalBalance}`, `₹${totalCredits}`, `−₹${totalDebits}`, `₹${totalCredits + totalDebits}`],
        correct: 0,
        explanation: `Total credits = +${totalCredits}. Total debits = −${totalDebits}. Balance = ${totalCredits} − ${totalDebits} = ₹${finalBalance}.`
    });

    // Q6: Geography — distance between altitudes
    const alt6a = randInt(100, 400), alt6b = randInt(-200, -50);
    questions.push({
        question: `Point A is at an altitude of +${alt6a} m and Point B is at −${Math.abs(alt6b)} m. What is the vertical distance between them?`,
        type: 'text',
        answer: String(alt6a + Math.abs(alt6b)),
        explanation: `Distance = |${alt6a} − (${alt6b})| = ${alt6a} + ${Math.abs(alt6b)} = ${alt6a + Math.abs(alt6b)} m.`
    });

    // Q7: Timeline — BCE and CE
    const bce = randInt(100, 500), ce = randInt(100, 300);
    questions.push({
        question: `An event happened in ${bce} BCE (−${bce}) and another in ${ce} CE (+${ce}). How many years apart are they?`,
        type: 'text',
        answer: String(bce + ce),
        explanation: `Years apart = |−${bce} − (+${ce})| = ${bce} + ${ce} = ${bce + ce} years.`
    });

    // Q8: Is debt positive or negative?
    questions.push({
        question: 'In banking, if you OWE money (a debt), this is represented as:',
        options: ['A positive number (credit)', 'A negative number (debit)', 'Zero', 'A fraction'],
        correct: 1,
        explanation: 'Money owed (debt) is represented as a negative number. Money received is positive.'
    });

    // Q9: Temperature word problem
    const moscow = randInt(-20, -10), dubai = randInt(25, 40);
    questions.push({
        question: `Moscow: ${moscow}°C. Dubai: +${dubai}°C. How much warmer is Dubai than Moscow?`,
        type: 'text',
        answer: String(dubai - moscow),
        explanation: `Difference = ${dubai} − (${moscow}) = ${dubai} + ${Math.abs(moscow)} = ${dubai - moscow}°C.`
    });

    // Q10: Net result
    const actions = [randInt(-5, -1), randInt(2, 6), randInt(-3, -1)];
    const net = actions.reduce((a, b) => a + b, 0);
    questions.push({
        question: `A submarine starts at sea level (0 m). It goes ${actions[0]} m, then ${actions[1] > 0 ? '+' : ''}${actions[1]} m, then ${actions[2]} m. Where is it now?`,
        options: [String(net), String(-net), String(Math.abs(net)), '0'],
        correct: 0,
        explanation: `0 + (${actions[0]}) + (${actions[1]}) + (${actions[2]}) = ${net} m.`
    });

    return shuffle(questions).slice(0, 10);
}
