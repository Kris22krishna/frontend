/* ═══════════════════════════════════════════════════════
   Data Handling & Presentation — Dynamic Questions (Grade 6)
   Interactive questions for: Data, Tally Marks, Pictographs, Bar Graphs
   ═══════════════════════════════════════════════════════ */

// ── Helpers ─────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'White'];
const FRUITS = ['Apples', 'Mangoes', 'Bananas', 'Oranges', 'Grapes', 'Watermelons', 'Pineapples'];
const SPORTS = ['Cricket', 'Football', 'Basketball', 'Badminton', 'Tennis', 'Hockey', 'Swimming'];
const ANIMALS = ['Dogs', 'Cats', 'Rabbits', 'Parrots', 'Fish', 'Hamsters'];
const SUBJECTS = ['Maths', 'Science', 'English', 'Hindi', 'Social Studies', 'Art'];
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bengaluru', 'Jaipur'];

function drawTallySVG(count, color = '#10b981') {
    const groups = Math.floor(count / 5);
    const rem = count % 5;
    let x = 10;
    const lines = [];
    for (let g = 0; g < groups; g++) {
        for (let j = 0; j < 4; j++) {
            lines.push(`<line x1="${x}" y1="8" x2="${x}" y2="42" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`);
            x += 12;
        }
        lines.push(`<line x1="${x - 48}" y1="32" x2="${x - 4}" y2="14" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`);
        x += 14;
    }
    for (let j = 0; j < rem; j++) {
        lines.push(`<line x1="${x}" y1="8" x2="${x}" y2="42" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`);
        x += 12;
    }
    return `<svg viewBox="0 0 ${Math.max(x + 10, 60)} 50" width="${Math.max(x + 10, 60)}" height="50" xmlns="http://www.w3.org/2000/svg">${lines.join('')}</svg>`;
}

function drawBarGraphSVG(labels, values, barColor = '#3b82f6') {
    const maxVal = Math.max(...values);
    const w = labels.length * 60 + 40;
    const h = 140;
    const barW = 30;
    const baseY = h - 25;
    const maxBarH = 80;
    let bars = '';
    labels.forEach((lbl, i) => {
        const bh = maxVal > 0 ? (values[i] / maxVal) * maxBarH : 0;
        const x = 40 + i * 60;
        bars += `<rect x="${x}" y="${baseY - bh}" width="${barW}" height="${bh}" fill="${barColor}" rx="3"/>`;
        bars += `<text x="${x + barW / 2}" y="${baseY - bh - 5}" text-anchor="middle" font-size="11" font-weight="bold" fill="${barColor}">${values[i]}</text>`;
        bars += `<text x="${x + barW / 2}" y="${baseY + 15}" text-anchor="middle" font-size="9" fill="#64748b" font-weight="600">${lbl}</text>`;
    });
    // axes
    bars += `<line x1="30" y1="10" x2="30" y2="${baseY}" stroke="#1e293b" stroke-width="2"/>`;
    bars += `<line x1="30" y1="${baseY}" x2="${w - 10}" y2="${baseY}" stroke="#1e293b" stroke-width="2"/>`;
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`;
}

function drawPictographSVG(labels, values, symbol, keyVal) {
    const rows = labels.map((lbl, i) => {
        const fullSymbols = Math.floor(values[i] / keyVal);
        const halfSymbol = (values[i] % keyVal) >= keyVal / 2 ? 1 : 0;
        let syms = '';
        for (let j = 0; j < fullSymbols; j++) syms += `<text x="${90 + j * 28}" y="${25 + i * 35}" font-size="20">${symbol}</text>`;
        if (halfSymbol) syms += `<text x="${90 + fullSymbols * 28}" y="${25 + i * 35}" font-size="14" opacity="0.5">${symbol}</text>`;
        return `<text x="5" y="${25 + i * 35}" font-size="12" font-weight="700" fill="#1e293b">${lbl}</text>${syms}`;
    });
    const h = 15 + labels.length * 35;
    return `<svg viewBox="0 0 350 ${h}" width="100%" height="${h}" xmlns="http://www.w3.org/2000/svg">${rows.join('')}<text x="5" y="${h - 2}" font-size="10" fill="#64748b" font-weight="700">Key: 1 ${symbol} = ${keyVal}</text></svg>`;
}

// ═══════════════════════════════════════════════════════
// SKILL 1:  Data & Observations
// ═══════════════════════════════════════════════════════
export function generateDataObservationsQuestions() {
    const questions = [];

    // Q1: Identify what data is
    questions.push({
        question: 'Which of these is the best definition of "data"?',
        options: [
            'A single test score',
            'A collection of numbers gathered to give some information',
            'A type of graph',
            'The title of a chart'
        ],
        correct: 1,
        explanation: 'Data is a collection of facts, numbers, or figures gathered together to give useful information.'
    });

    // Q2: Raw data identification
    const rawList = shuffle([randInt(2, 9), randInt(2, 9), randInt(2, 9), randInt(2, 9), randInt(2, 9), randInt(2, 9), randInt(2, 9), randInt(2, 9)]);
    questions.push({
        question: `A teacher recorded the number of books read by students: ${rawList.join(', ')}. This list is called:`,
        options: ['A frequency table', 'Raw data', 'A pictograph', 'A bar graph'],
        correct: 1,
        explanation: 'Data that has been collected but not yet organized in any way is called "raw data."'
    });

    // Q3: Count frequency
    const items = shuffle(COLORS).slice(0, 4);
    const dataArr = [];
    for (let i = 0; i < 15; i++) dataArr.push(pick(items));
    const target = pick(items);
    const freq = dataArr.filter(x => x === target).length;
    questions.push({
        question: `In the following data, how many times does "${target}" appear?\n\n${dataArr.join(', ')}`,
        type: 'text',
        answer: String(freq),
        explanation: `Count each occurrence of "${target}" — it appears ${freq} time(s).`
    });

    // Q4: What is an observation?
    questions.push({
        question: 'Each individual entry in a collection of data is called:',
        options: ['A frequency', 'An observation', 'A tally', 'A bar'],
        correct: 1,
        explanation: 'An observation is a single piece of data or entry in a dataset.'
    });

    // Q5: Identify highest frequency from a list
    const cats2 = shuffle(FRUITS).slice(0, 4);
    const freqs2 = cats2.map(() => randInt(2, 12));
    const maxFreq = Math.max(...freqs2);
    const maxCat = cats2[freqs2.indexOf(maxFreq)];
    const tableRows = cats2.map((c, i) => `${c}: ${freqs2[i]}`).join(', ');
    questions.push({
        question: `From the frequency data — ${tableRows} — which item has the highest frequency?`,
        options: shuffle([...cats2]),
        correct: shuffle([...cats2]).indexOf(maxCat),
        explanation: `${maxCat} has the highest frequency of ${maxFreq}.`
    });

    // Q6: Why organize data?
    questions.push({
        question: 'Why do we organize raw data into tables and charts?',
        options: [
            'To make it look colorful',
            'To make it easy to understand and draw conclusions',
            'To make data longer',
            'To hide information'
        ],
        correct: 1,
        explanation: 'Organizing data makes it easier to read, understand, and answer questions from it.'
    });

    // Q7: Find frequency of a number
    const numList = [];
    for (let i = 0; i < 20; i++) numList.push(randInt(1, 6));
    const tgtNum = pick([1, 2, 3, 4, 5, 6]);
    const tgtFreq = numList.filter(x => x === tgtNum).length;
    questions.push({
        question: `Here are dice rolls recorded by a student:\n\n${numList.join(', ')}\n\nWhat is the frequency of the number ${tgtNum}?`,
        type: 'text',
        answer: String(tgtFreq),
        explanation: `Count how many times ${tgtNum} appears in the list. It appears ${tgtFreq} time(s).`
    });

    // Q8: Total observations
    questions.push({
        question: `The data has ${numList.length} entries. How many total observations are there?`,
        type: 'text',
        answer: String(numList.length),
        explanation: `The total number of observations is just the count of all entries: ${numList.length}.`
    });

    // Q9-10: MCQ
    questions.push({
        question: 'Which comes first when analyzing data?',
        options: ['Drawing a bar graph', 'Collecting raw data', 'Writing a conclusion', 'Making a pictograph'],
        correct: 1,
        explanation: 'The first step is always collecting raw data before we can organize or represent it.'
    });

    questions.push({
        question: 'If a dataset has 5 different observations each appearing 3 times, the total number of data entries is:',
        options: ['5', '8', '3', '15'],
        correct: 3,
        explanation: '5 observations × 3 times each = 15 total data entries.'
    });

    return shuffle(questions).slice(0, 10);
}

// ═══════════════════════════════════════════════════════
// SKILL 2:  Tally Marks & Frequency
// ═══════════════════════════════════════════════════════
export function generateTallyMarksQuestions() {
    const questions = [];

    // Interactive Tally Drawing Question
    const drawTallyVal = randInt(8, 24);
    questions.push({
        question: `Draw exactly ${drawTallyVal} tally marks using the tool below.`,
        type: 'tally-draw',
        targetCount: drawTallyVal,
        explanation: `To draw ${drawTallyVal}, you need ${Math.floor(drawTallyVal / 5)} complete groups of 5, and ${drawTallyVal % 5} individual lines.`
    });

    // Q1: Read a tally mark SVG
    const tallyVal1 = randInt(3, 18);
    questions.push({
        question: 'How many does this tally mark represent?',
        svg: drawTallySVG(tallyVal1),
        type: 'text',
        answer: String(tallyVal1),
        explanation: `Each group of crossed tallies equals 5. Count the full groups and remaining lines to get ${tallyVal1}.`
    });

    // Q2: Another tally reading
    const tallyVal2 = randInt(6, 22);
    questions.push({
        question: 'Count the value shown by these tally marks:',
        svg: drawTallySVG(tallyVal2, '#6366f1'),
        type: 'text',
        answer: String(tallyVal2),
        explanation: `The tally marks represent the number ${tallyVal2}.`
    });

    // Q3: How many groups of 5?
    const val3 = randInt(10, 25);
    const groups3 = Math.floor(val3 / 5);
    questions.push({
        question: `If a number is ${val3}, how many complete groups of 5 tally marks will there be?`,
        type: 'text',
        answer: String(groups3),
        explanation: `${val3} ÷ 5 = ${groups3} complete groups with ${val3 % 5} remaining.`
    });

    // Q4: Remaining tallies
    const val4 = randInt(11, 28);
    const rem4 = val4 % 5;
    questions.push({
        question: `After drawing complete groups of 5 for the number ${val4}, how many individual tally marks remain?`,
        type: 'text',
        answer: String(rem4),
        explanation: `${val4} mod 5 = ${rem4} remaining marks.`
    });

    // Q5: Frequency from a table (MCQ)
    const cats5 = shuffle(SPORTS).slice(0, 4);
    const freqs5 = cats5.map(() => randInt(3, 15));
    const total5 = freqs5.reduce((a, b) => a + b, 0);
    const tableHTML = cats5.map((c, i) =>
        `<tr><td style="padding:4px 12px;border:1px solid #e2e8f0;font-weight:600">${c}</td><td style="padding:4px 12px;border:1px solid #e2e8f0;text-align:center">${drawTallySVG(freqs5[i], '#0891b2')}</td><td style="padding:4px 12px;border:1px solid #e2e8f0;text-align:center;font-weight:700">?</td></tr>`
    ).join('');
    const askCat5 = pick(cats5);
    const askFreq5 = freqs5[cats5.indexOf(askCat5)];
    questions.push({
        question: `Look at the tally chart above. What is the frequency of **${askCat5}**?`,
        svg: `<table style="border-collapse:collapse;margin:0 auto"><tr><th style="padding:6px 12px;background:#f1f5f9;border:1px solid #e2e8f0">Sport</th><th style="padding:6px 12px;background:#f1f5f9;border:1px solid #e2e8f0">Tally</th><th style="padding:6px 12px;background:#f1f5f9;border:1px solid #e2e8f0">Frequency</th></tr>${tableHTML}</table>`,
        type: 'text',
        answer: String(askFreq5),
        explanation: `Count the tally marks for ${askCat5}. They add up to ${askFreq5}.`
    });

    // Q6: Total from tally table
    questions.push({
        question: `Using the same chart, what is the total frequency of ALL sports combined?`,
        options: [String(total5 - 2), String(total5), String(total5 + 3), String(total5 - 5)],
        correct: 1,
        explanation: `Add all frequencies: ${freqs5.join(' + ')} = ${total5}.`
    });

    // Q7: How tallies are grouped
    questions.push({
        question: 'In tally marks, why do we cross the fifth line diagonally?',
        options: [
            'To make it look pretty',
            'To group tallies in bundles of 5 for easy counting',
            'Because 5 is the biggest number',
            'Because the teacher said so'
        ],
        correct: 1,
        explanation: 'Grouping in fives allows us to quickly count large totals without losing track.'
    });

    // Q8: Convert number to tally description
    const val8 = randInt(12, 23);
    const g8 = Math.floor(val8 / 5);
    const r8 = val8 % 5;
    questions.push({
        question: `To represent ${val8} using tally marks, you need:`,
        options: [
            `${g8} groups of 5 and ${r8} extra lines`,
            `${g8 + 1} groups of 5 and ${r8 + 1} extra lines`,
            `${val8} crossed lines`,
            `${g8} single lines`
        ],
        correct: 0,
        explanation: `${val8} = ${g8} × 5 + ${r8}, so ${g8} complete bundles and ${r8} remaining lines.`
    });

    // Q9: Smallest frequency
    const minFreq5 = Math.min(...freqs5);
    const minCat5 = cats5[freqs5.indexOf(minFreq5)];
    questions.push({
        question: `From the frequency data — ${cats5.map((c, i) => `${c}: ${freqs5[i]}`).join(', ')} — which has the LEAST frequency?`,
        options: shuffle([...cats5]),
        correct: shuffle([...cats5]).indexOf(minCat5),
        explanation: `${minCat5} has the lowest frequency of ${minFreq5}.`
    });

    // Q10: What is frequency?
    questions.push({
        question: 'The number of times a particular observation occurs in data is called its:',
        options: ['Tally', 'Scale', 'Value', 'Frequency'],
        correct: 3,
        explanation: 'Frequency means "how often" — the count of occurrences of an observation.'
    });

    return shuffle(questions).slice(0, 10);
}

// ═══════════════════════════════════════════════════════
// SKILL 3:  Interpreting Pictographs
// ═══════════════════════════════════════════════════════
export function generatePictographQuestions() {
    const questions = [];

    // Interactive Pictograph Drawing Question
    const drawCats = shuffle(['Apples', 'Mangoes', 'Bananas', 'Oranges']).slice(0, 3);
    const drawKeyVal = pick([2, 10]);
    const drawSym = pick(['⭐', '📦', '🍎']);
    const drawTargetCounts = drawCats.map(() => drawKeyVal * randInt(1, 4) + (pick([0, 1]) * (drawKeyVal / 2)));
    questions.push({
        question: `Complete the pictograph using the given data:\n${drawCats.map((c, i) => `${c}: ${drawTargetCounts[i]}`).join(', ')}`,
        type: 'pictograph-draw',
        categories: drawCats,
        symbol: drawSym,
        keyVal: drawKeyVal,
        allowHalf: true,
        targetCounts: drawTargetCounts,
        explanation: `Each symbol represents ${drawKeyVal}. Use half-symbols for remaining values equal to ${drawKeyVal / 2}.`
    });

    // Build a pictograph dataset
    const cats = shuffle(FRUITS).slice(0, 4);
    const keyVal = pick([2, 5, 10]);
    const symbol = pick(['🍎', '🟡', '📦', '⭐', '🌸']);
    const realValues = cats.map(() => keyVal * randInt(1, 6));
    const pictoSVG = drawPictographSVG(cats, realValues, symbol, keyVal);

    // Q1: Read a value
    const askIdx1 = randInt(0, cats.length - 1);
    questions.push({
        question: `Using the pictograph, how many ${cats[askIdx1]} are there?`,
        svg: pictoSVG,
        type: 'text',
        answer: String(realValues[askIdx1]),
        explanation: `Count the symbols for ${cats[askIdx1]}: ${realValues[askIdx1] / keyVal} symbols × ${keyVal} = ${realValues[askIdx1]}.`
    });

    // Q2: Total
    const totalPicto = realValues.reduce((a, b) => a + b, 0);
    questions.push({
        question: `What is the TOTAL count of all items in the pictograph above?`,
        svg: pictoSVG,
        type: 'text',
        answer: String(totalPicto),
        explanation: `Sum all values: ${realValues.join(' + ')} = ${totalPicto}.`
    });

    // Q3: Highest category
    const maxPicto = Math.max(...realValues);
    const maxPictoCat = cats[realValues.indexOf(maxPicto)];
    questions.push({
        question: 'Which category has the MOST items in the pictograph?',
        svg: pictoSVG,
        options: shuffle([...cats]),
        correct: shuffle([...cats]).indexOf(maxPictoCat),
        explanation: `${maxPictoCat} has ${maxPicto}, which is the highest.`
    });

    // Q4: Key understanding
    questions.push({
        question: `In the pictograph, one ${symbol} represents ${keyVal} items. What does half a ${symbol} represent?`,
        options: [String(keyVal), String(keyVal / 2), String(keyVal * 2), '1'],
        correct: 1,
        explanation: `Half a symbol = half the key value = ${keyVal} ÷ 2 = ${keyVal / 2}.`
    });

    // Q5: Difference between two categories
    const idx5a = 0, idx5b = 1;
    const diff5 = Math.abs(realValues[idx5a] - realValues[idx5b]);
    questions.push({
        question: `How many more ${cats[realValues[idx5a] > realValues[idx5b] ? idx5a : idx5b]} are there compared to ${cats[realValues[idx5a] > realValues[idx5b] ? idx5b : idx5a]}?`,
        svg: pictoSVG,
        type: 'text',
        answer: String(diff5),
        explanation: `|${realValues[idx5a]} - ${realValues[idx5b]}| = ${diff5}.`
    });

    // Q6: How many symbols needed
    const newVal6 = keyVal * randInt(2, 7);
    questions.push({
        question: `If each symbol represents ${keyVal} items, how many full symbols are needed to show ${newVal6} items?`,
        type: 'text',
        answer: String(newVal6 / keyVal),
        explanation: `${newVal6} ÷ ${keyVal} = ${newVal6 / keyVal} symbols.`
    });

    // Q7: What is a key/legend?
    questions.push({
        question: 'In a pictograph, the "Key" (or Legend) tells us:',
        options: [
            'The title of the graph',
            'What number each picture represents',
            'The name of the person who made it',
            'The total of all data'
        ],
        correct: 1,
        explanation: 'The Key tells you the value that each symbol stands for — it is essential for reading a pictograph.'
    });

    // Q8-Q10: Additional variations
    const cats8 = shuffle(ANIMALS).slice(0, 3);
    const keyVal8 = pick([4, 5, 10]);
    const vals8 = cats8.map(() => keyVal8 * randInt(1, 5));
    const picto8 = drawPictographSVG(cats8, vals8, '🐾', keyVal8);
    
    questions.push({
        question: `How many ${cats8[0]} does this pictograph show?`,
        svg: picto8,
        type: 'text',
        answer: String(vals8[0]),
        explanation: `Count the paw symbols for ${cats8[0]}: ${vals8[0] / keyVal8} × ${keyVal8} = ${vals8[0]}.`
    });

    const minPicto8 = Math.min(...vals8);
    const minPictoCat8 = cats8[vals8.indexOf(minPicto8)];
    questions.push({
        question: 'Which pet is LEAST popular according to the pictograph?',
        svg: picto8,
        options: shuffle([...cats8, pick(ANIMALS.filter(a => !cats8.includes(a)))]),
        correct: shuffle([...cats8, pick(ANIMALS.filter(a => !cats8.includes(a)))]).indexOf(minPictoCat8),
        explanation: `${minPictoCat8} has the fewest at ${minPicto8}.`
    });

    questions.push({
        question: 'A pictograph uses pictures or symbols to represent data. Which is TRUE?',
        options: [
            'Each picture must always represent exactly 1 item',
            'A key must always accompany a pictograph',
            'Pictographs can only show 2 categories',
            'Bars are used instead of pictures'
        ],
        correct: 1,
        explanation: 'A key (legend) is mandatory in a pictograph so readers know the value of each symbol.'
    });

    return shuffle(questions).slice(0, 10);
}

// ═══════════════════════════════════════════════════════
// SKILL 4:  Drawing & Reading Bar Graphs
// ═══════════════════════════════════════════════════════
export function generateBarGraphQuestions() {
    const questions = [];

    // Interactive Bar Graph Drawing Question
    const drawBarCats = shuffle(['Maths', 'English', 'Science', 'Art']).slice(0, 4);
    const drawBarStep = pick([10, 20]);
    const drawBarMax = drawBarStep * randInt(5, 8);
    const drawBarTarget = drawBarCats.map(() => Math.floor(randInt(1, drawBarMax / drawBarStep)) * drawBarStep);
    questions.push({
        question: `Draw a bar graph using the interactive tool for the following data:\n${drawBarCats.map((c, i) => `${c}: ${drawBarTarget[i]}`).join(', ')}`,
        type: 'bar-graph-draw',
        categories: drawBarCats,
        maxVal: drawBarMax,
        step: drawBarStep,
        targetCounts: drawBarTarget,
        explanation: 'Click on the columns to adjust the height of each bar to match the given data values.'
    });

    // Build a bar graph dataset
    const cats = shuffle(SUBJECTS).slice(0, 5);
    const values = cats.map(() => randInt(10, 80));
    const barSVG = drawBarGraphSVG(cats, values);

    // Q1: Read a bar value
    const askIdx1 = randInt(0, cats.length - 1);
    questions.push({
        question: `Look at the bar graph. What is the value for **${cats[askIdx1]}**?`,
        svg: barSVG,
        type: 'text',
        answer: String(values[askIdx1]),
        explanation: `The bar for ${cats[askIdx1]} reaches ${values[askIdx1]}.`
    });

    // Q2: Highest bar
    const maxBar = Math.max(...values);
    const maxBarCat = cats[values.indexOf(maxBar)];
    questions.push({
        question: 'Which subject has the tallest bar (highest marks)?',
        svg: barSVG,
        options: shuffle([...cats]),
        correct: shuffle([...cats]).indexOf(maxBarCat),
        explanation: `${maxBarCat} has the highest value of ${maxBar}.`
    });

    // Q3: Shortest bar
    const minBar = Math.min(...values);
    const minBarCat = cats[values.indexOf(minBar)];
    questions.push({
        question: 'Which subject has the shortest bar (lowest marks)?',
        svg: barSVG,
        options: shuffle([...cats]),
        correct: shuffle([...cats]).indexOf(minBarCat),
        explanation: `${minBarCat} has the lowest value of ${minBar}.`
    });

    // Q4: Difference
    const diff4 = Math.abs(values[0] - values[1]);
    questions.push({
        question: `What is the difference in marks between ${cats[0]} and ${cats[1]}?`,
        svg: barSVG,
        type: 'text',
        answer: String(diff4),
        explanation: `|${values[0]} - ${values[1]}| = ${diff4}.`
    });

    // Q5: Total
    const totalBar = values.reduce((a, b) => a + b, 0);
    questions.push({
        question: 'What is the total of all values in the bar graph?',
        svg: barSVG,
        type: 'text',
        answer: String(totalBar),
        explanation: `${values.join(' + ')} = ${totalBar}.`
    });

    // Q6: Scale question
    const scaleCats = shuffle(CITIES).slice(0, 4);
    const scaleVal = pick([10, 20, 50]);
    const scaleHeights = scaleCats.map(() => randInt(1, 8));
    const realBarValues = scaleHeights.map(h => h * scaleVal);
    const scaleBarSVG = drawBarGraphSVG(scaleCats, realBarValues, '#7c3aed');
    const askScale = randInt(0, scaleCats.length - 1);
    questions.push({
        question: `In this bar graph, if 1 unit on the Y-axis = ${scaleVal} people, how many people does "${scaleCats[askScale]}" represent?`,
        svg: scaleBarSVG,
        type: 'text',
        answer: String(realBarValues[askScale]),
        explanation: `The bar height multiplied by the scale: ${scaleHeights[askScale]} × ${scaleVal} = ${realBarValues[askScale]}.`
    });

    // Q7: What must be uniform in a bar graph?
    questions.push({
        question: 'In a properly drawn bar graph, which of these must be uniform (the same)?',
        options: [
            'The height of all bars',
            'The width of bars and the gap between them',
            'The color of every bar',
            'The length of the X-axis label'
        ],
        correct: 1,
        explanation: 'All bars must have equal width, and the spacing between consecutive bars must be identical.'
    });

    // Q8: Vertical vs Horizontal
    questions.push({
        question: 'A bar graph where the bars stand upright (pointing upwards) is called:',
        options: ['A horizontal bar graph', 'A vertical bar graph', 'A pictograph', 'A pie chart'],
        correct: 1,
        explanation: 'When bars are drawn standing up (vertical), it is a vertical bar graph.'
    });

    // Q9: Another bar graph reading
    const cats9 = shuffle(SPORTS).slice(0, 4);
    const vals9 = cats9.map(() => randInt(5, 50));
    const svg9 = drawBarGraphSVG(cats9, vals9, '#ea580c');
    const askIdx9 = randInt(0, cats9.length - 1);
    questions.push({
        question: `How many students chose **${cats9[askIdx9]}**?`,
        svg: svg9,
        type: 'text',
        answer: String(vals9[askIdx9]),
        explanation: `The bar for ${cats9[askIdx9]} shows ${vals9[askIdx9]} students.`
    });

    // Q10: True/False style
    questions.push({
        question: 'In a bar graph, a taller bar always represents a greater value. This statement is:',
        options: ['True', 'False', 'Sometimes true', 'Only for horizontal graphs'],
        correct: 0,
        explanation: 'By definition, the height of a bar in a bar graph is proportional to the value it represents. Taller = More.'
    });

    return shuffle(questions).slice(0, 10);
}
