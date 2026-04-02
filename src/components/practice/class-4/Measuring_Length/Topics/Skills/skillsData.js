// Interactive Skills data for Measuring Length chapter
export const SKILLS = [
    { id: 1, title: 'Converting Meters & Centimeters', icon: '📏', color: '#d97706', desc: 'Swap between meters and centimeters. Remember: 1m = 100cm!' },
    { id: 2, title: 'Converting Kilometers & Meters', icon: '🛣️', color: '#0284c7', desc: 'Master long distances. Swap between km and m. 1km = 1000m!' },
    { id: 3, title: 'Reading a Ruler', icon: '📐', color: '#059669', desc: 'Measure objects correctly even if they do not start at zero!' },
    { id: 4, title: 'Length Word Problems', icon: '🚌', color: '#7c3aed', desc: 'Solve real-life length problems involving addition and subtraction.' },
];

export const LEARN_CONTENT = {
    1: {
        title: 'Meters & Centimeters',
        points: [
            '1 Meter (m) is exactly 100 Centimeters (cm).',
            'To change meters to cm, multiply by 100 (add two 0s). Example: 4m = 400cm.',
            'To change cm back to meters, remove two 0s! Example: 500cm = 5m.',
            'For mixed units, combine them! 2m 50cm = 200cm + 50cm = 250cm.'
        ],
        example: 'If a desk is 1m 20cm, it is 100 + 20 = 120 cm long!'
    },
    2: {
        title: 'Kilometers & Meters',
        points: [
            '1 Kilometer (km) is exactly 1000 Meters (m).',
            'To change km to m, multiply by 1000 (add three 0s). Example: 3km = 3000m.',
            'To change m back to km, remove three 0s! Example: 8000m = 8km.',
            'Mixed units: 5km 400m = 5000m + 400m = 5400m.'
        ],
        example: 'A race is 5km long. That is 5000 meters of running!'
    },
    3: {
        title: 'Reading a Ruler',
        points: [
            'Always try to start measuring from the ZERO (0) mark on the ruler.',
            'If you start at 0 and the object ends at 8, it is 8cm long.',
            'Sometimes rulers are broken! If you start at 2 and end at 10, subtract the numbers.',
            'End (10) - Start (2) = 8cm!'
        ],
        example: 'Start at 3cm, end at 15cm. Length = 15 - 3 = 12cm.'
    },
    4: {
        title: 'Length Word Problems',
        points: [
            'Read carefully to see if you are adding (total length) or subtracting (difference/leftover).',
            'IMPORTANT: Only add or subtract when the units are the SAME!',
            'You cannot just add 3 meters to 50 centimeters. Convert the meters to cm first!',
            '3m + 50cm = 300cm + 50cm = 350cm.'
        ],
        example: 'A 100cm ribbon is cut by 25cm. Leftover = 100 - 25 = 75cm.'
    },
};

const questionKey = (q) => JSON.stringify({
    type: q.type,
    q: q.q ?? '',
    statement: q.statement ?? '',
    opts: q.opts ?? [],
    answer: q.answer ?? null,
    answer2: q.answer2 ?? null,
    correct: q.correct ?? null,
    scene: q.scene ?? '',
    sceneCount: q.sceneCount ?? null,
    perItem: q.perItem ?? ''
});

const fillUniqueQuestions = (skillId, initialQuestions, generateBatch, targetCount = initialQuestions.length) => {
    const unique = [];
    const seen = new Set();

    const addIfNew = (question) => {
        const key = questionKey(question);
        if (seen.has(key)) return false;
        seen.add(key);
        unique.push(question);
        return true;
    };

    initialQuestions.forEach(addIfNew);

    let attempts = 0;
    while (unique.length < targetCount && attempts < 25) {
        generateBatch(skillId).forEach((question) => {
            if (unique.length < targetCount) addIfNew(question);
        });
        attempts++;
    }

    return unique.slice(0, targetCount);
};

export const generatePracticeQs = (skillId, options = {}) => {
    const { ensureUnique = true } = options;
    const qs = [];
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Skill 1: m <-> cm
    if (skillId === 1) {
        // Easy (1-6): Straight conversions m to cm or cm to m
        for (let i = 0; i < 6; i++) {
            let n = rand(2, 9);
            let isMtoCm = Math.random() > 0.5;
            let act = rand(1, 3);
            if (isMtoCm) {
                let ans = n * 100;
                if (act === 1) qs.push({ type: 'fill_blank', q: `How many centimeters are in ${n} m?`, answer: ans, hint: 'Multiply by 100!', expl: `${n} × 100 = ${ans}` });
                else if (act === 2) qs.push({ type: 'mcq', q: `How many cm in ${n} m?`, opts: [`${ans} cm`, `${ans + 10} cm`, `${n * 10} cm`, `${ans + 100} cm`], ans: 0, expl: `1m=100cm, so ${n}m = ${ans}cm.` });
                else qs.push({ type: 'true_false', statement: `${n} m is exactly ${ans} cm`, correct: true, visual: '', expl: `Correct! ${n} × 100 = ${ans}` });
            } else {
                let ans = n;
                let qVal = n * 100;
                if (act === 1) qs.push({ type: 'fill_blank', q: `How many meters are in ${qVal} cm?`, answer: ans, hint: 'Remove two zeros!', expl: `${qVal} ÷ 100 = ${ans}` });
                else if (act === 2) qs.push({ type: 'mcq', q: `Convert ${qVal} cm to m:`, opts: [`${ans} m`, `${ans * 10} m`, `${ans + 2} m`, `${ans * 100} m`], ans: 0, expl: `Remove 2 zeros → ${ans}m.` });
                else qs.push({ type: 'true_false', statement: `${qVal} cm = ${ans * 10} m`, correct: false, visual: '', expl: `False! It is ${ans} m.` });
            }
        }
        // Medium (7-13): Mixed units to total cm
        for (let i = 0; i < 7; i++) {
            let m = rand(1, 8);
            let cm = rand(10, 95);
            let ans = m * 100 + cm;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'fill_blank', q: `What is ${m} m ${cm} cm in centimeters?`, answer: ans, hint: 'Convert m first, then add!', expl: `${m}m = ${m * 100}cm. + ${cm}cm = ${ans}cm.` });
            else if (act === 2) qs.push({ type: 'mcq', q: `What is ${m} m ${cm} cm in cm?`, opts: [`${ans} cm`, `${ans + 100} cm`, `${m}${cm + 10} cm`, `${ans - 100} cm`], ans: 0, expl: `${m * 100} + ${cm} = ${ans}` });
            else qs.push({ type: 'true_false', statement: `${m} m ${cm} cm = ${m}${cm} cm`, correct: true, visual: '', expl: `Correct! ${m * 100} + ${cm} = ${ans}.` });
        }
        // Hard (14-20): cm to Mixed units, or tricky math
        for (let i = 0; i < 7; i++) {
            let cm = rand(215, 985);
            let mPart = Math.floor(cm / 100);
            let cmPart = cm % 100;
            let act = rand(1, 2);
            if (act === 1) qs.push({ type: 'fill_blank', q: `Write ${cm} cm as meters and centimeters.`, answer: mPart, answer2: cmPart, twoAnswers: true, hint: 'Hundreds are meters!', expl: `${cm} = ${mPart}00 + ${cmPart} = ${mPart}m ${cmPart}cm.` });
            else {
                let opts = [`${mPart} m ${cmPart} cm`, `${mPart + 1} m ${cmPart} cm`, `${mPart} m ${cmPart + 10} cm`, `${cmPart} m ${mPart} cm`];
                qs.push({ type: 'mcq', q: `Break ${cm} cm into meters and cm:`, opts, ans: 0, expl: `The hundreds digit is meters. So ${mPart}m ${cmPart}cm.` });
            }
        }
    }

    // Skill 2: km <-> m
    if (skillId === 2) {
        // Easy (1-6)
        for (let i = 0; i < 6; i++) {
            let n = rand(2, 9);
            let isKmToM = Math.random() > 0.5;
            let act = rand(1, 3);
            if (isKmToM) {
                let ans = n * 1000;
                if (act === 1) qs.push({ type: 'fill_blank', q: `How many meters are in ${n} km?`, answer: ans, hint: 'Multiply by 1000!', expl: `${n} × 1000 = ${ans}` });
                else if (act === 2) qs.push({ type: 'mcq', q: `How many m in ${n} km?`, opts: [`${ans} m`, `${ans + 100} m`, `${n * 100} m`, `${ans + 1000} m`], ans: 0, expl: `1km=1000m, so ${n}km = ${ans}m.` });
                else qs.push({ type: 'true_false', statement: `${n} km is ${ans} m`, correct: true, visual: '', expl: `Correct! ${n} × 1000 = ${ans}` });
            } else {
                let ans = n;
                let qVal = n * 1000;
                if (act === 1) qs.push({ type: 'fill_blank', q: `How many kilometers are in ${qVal} m?`, answer: ans, hint: 'Remove three zeros!', expl: `${qVal} ÷ 1000 = ${ans}` });
                else if (act === 2) qs.push({ type: 'mcq', q: `Convert ${qVal} m to km:`, opts: [`${ans} km`, `${ans * 10} km`, `${ans + 2} km`, `${ans * 100} km`], ans: 0, expl: `Remove 3 zeros → ${ans}km.` });
                else qs.push({ type: 'true_false', statement: `${qVal} m = ${ans * 10} km`, correct: false, visual: '', expl: `False! It is ${ans} km.` });
            }
        }
        // Medium (7-13)
        for (let i = 0; i < 7; i++) {
            let km = rand(1, 8);
            let m = rand(150, 950);
            let ans = km * 1000 + m;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'fill_blank', q: `What is ${km} km ${m} m in meters?`, answer: ans, hint: 'Convert km first!', expl: `${km}km = ${km * 1000}m. + ${m}m = ${ans}m.` });
            else if (act === 2) qs.push({ type: 'mcq', q: `What is ${km} km ${m} m in m?`, opts: [`${ans} m`, `${ans + 100} m`, `${km}${m + 10} m`, `${ans - 100} m`], ans: 0, expl: `${km * 1000} + ${m} = ${ans}` });
            else qs.push({ type: 'picture_problem', scene: pick(['🚗', '✈️']), sceneCount: 1, perItem: 'Distance = ', q: `Traveled ${km} km and ${m} m. Total meters?`, answer: ans, expl: `${km * 1000} + ${m} = ${ans} m.` });
        }
        // Hard (14-20)
        for (let i = 0; i < 7; i++) {
            let m = rand(2150, 9850);
            let kmPart = Math.floor(m / 1000);
            let mPart = m % 1000;
            let act = rand(1, 2);
            if (act === 1) qs.push({ type: 'fill_blank', q: `Write ${m} m as kilometers and meters.`, answer: kmPart, answer2: mPart, twoAnswers: true, hint: 'Thousands are km!', expl: `${m} = ${kmPart}000 + ${mPart} = ${kmPart}km ${mPart}m.` });
            else {
                let opts = [`${kmPart} km ${mPart} m`, `${kmPart + 1} km ${mPart} m`, `${kmPart} km ${mPart + 100} m`, `${mPart} km ${kmPart} m`];
                qs.push({ type: 'mcq', q: `Break ${m} m into km and m:`, opts, ans: 0, expl: `The thousands digit is km. So ${kmPart}km ${mPart}m.` });
            }
        }
    }

    // Skill 3: Reading a Ruler
    if (skillId === 3) {
        // Easy (1-6): Start at 0
        for (let i = 0; i < 6; i++) {
            let end = rand(3, 12);
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'fill_blank', q: `A pencil starts at 0 cm and ends at ${end} cm. What is its length in cm?`, answer: end, hint: 'It started at 0!', expl: `${end} - 0 = ${end} cm.` });
            else if (act === 2) qs.push({ type: 'mcq', q: `Object starts at 0, ends at ${end}. Length?`, opts: [`${end} cm`, `${end + 1} cm`, `${end - 1} cm`, `${end * 2} cm`], ans: 0, expl: `Ending digit is the length if starting at 0.` });
            else qs.push({ type: 'true_false', statement: `Starts at 0, ends at ${end}. Length is ${end} cm.`, correct: true, visual: '', expl: `Correct! ${end} - 0 = ${end}.` });
        }
        // Medium (7-13): Start > 0
        for (let i = 0; i < 7; i++) {
            let start = rand(2, 6);
            let len = rand(4, 9);
            let end = start + len;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'fill_blank', q: `A crayon starts at ${start} cm and ends at ${end} cm. What is its length in cm?`, answer: len, hint: 'End - Start!', expl: `${end} - ${start} = ${len} cm.` });
            else if (act === 2) qs.push({ type: 'mcq', q: `Starts at ${start} cm, ends at ${end} cm. How long?`, opts: [`${len} cm`, `${end} cm`, `${start} cm`, `${len + 1} cm`], ans: 0, expl: `Subtract: ${end} - ${start} = ${len} cm.` });
            else qs.push({ type: 'true_false', statement: `Starts at ${start}, ends at ${end}. Length is ${end} cm.`, correct: false, visual: '', expl: `False! You must subtract the start: ${end} - ${start} = ${len} cm.` });
        }
        // Hard (14-20): Compare objects or tricky word problem
        for (let i = 0; i < 7; i++) {
            let s1 = rand(1, 3), l1 = rand(5, 8);
            let s2 = rand(4, 7), l2 = rand(3, 6);
            if (l1 === l2) l1++; // ensure different
            let act = rand(1, 2);
            if (act === 1) {
                let opts = [`Object 1`, `Object 2`, `They are equal`, `Ruler is broken`];
                let is1Longer = l1 > l2 ? 0 : 1;
                qs.push({ type: 'mcq', q: `Obj 1: starts ${s1}, ends ${s1 + l1}. Obj 2: starts ${s2}, ends ${s2 + l2}. Which is longer?`, opts, ans: is1Longer, expl: `Obj 1 = ${l1}. Obj 2 = ${l2}. So ${l1 > l2 ? 'Obj 1' : 'Obj 2'} is longer.` });
            } else {
                let ans = Math.abs(l1 - l2);
                qs.push({ type: 'fill_blank', q: `Pen is ${l1}cm. Eraser is ${l2}cm. How much longer is the pen?`, answer: ans, hint: 'Subtract sizes!', expl: `${Math.max(l1, l2)} - ${Math.min(l1, l2)} = ${ans} cm.` });
            }
        }
    }

    // Skill 4: Word Problems
    if (skillId === 4) {
        // Easy (1-6): Straight add/sub same units
        for (let i = 0; i < 6; i++) {
            let n1 = rand(15, 45);
            let n2 = rand(10, 30);
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'fill_blank', q: `A string was ${n1} cm long. We cut off ${n2} cm. How many centimeters are left?`, answer: n1 - n2, hint: 'Cut off = subtract!', expl: `${n1} - ${n2} = ${n1 - n2} cm.` });
            else if (act === 2) qs.push({ type: 'fill_blank', q: `Tape A is ${n1} m and Tape B is ${n2} m. What is their total length in meters?`, answer: n1 + n2, hint: 'Add them up!', expl: `${n1} + ${n2} = ${n1 + n2} m.` });
            else qs.push({ type: 'mcq', q: `Build a tower: ${n1} cm block + ${n2} cm block. Total height?`, opts: [`${n1 + n2} cm`, `${n1 - n2} cm`, `${n1 + n2 + 10} cm`, `${n1} cm`], ans: 0, expl: `${n1} + ${n2} = ${n1 + n2} cm.` });
        }
        // Medium (7-13): Mixed units or multiplication
        for (let i = 0; i < 7; i++) {
            let act = rand(1, 3);
            if (act === 1) {
                let m = rand(2, 5);
                let cm = rand(20, 80);
                qs.push({ type: 'fill_blank', q: `Add ${m} m and ${cm} cm. What is the total in centimeters?`, answer: m * 100 + cm, hint: '1m = 100cm', expl: `${m}m = ${m * 100}cm. + ${cm}cm = ${m * 100 + cm}cm.` });
            } else if (act === 2) {
                let count = rand(3, 7);
                let len = rand(15, 25);
                qs.push({ type: 'fill_blank', q: `We have ${count} ropes, each ${len} cm long. What is the total length in centimeters?`, answer: count * len, hint: 'Multiply!', expl: `${count} × ${len} = ${count * len} cm.` });
            } else {
                let total = rand(200, 400);
                let part = rand(50, 150);
                qs.push({ type: 'mcq', q: `A ${total}m path is built. ${part}m is done. How much left?`, opts: [`${total - part} m`, `${total + part} m`, `${total} m`, `${part} m`], ans: 0, expl: `${total} - ${part} = ${total - part} m.` });
            }
        }
        // Hard (14-20): Tricky conversions + add/sub
        for (let i = 0; i < 7; i++) {
            let act = rand(1, 3);
            if (act === 1) {
                let m = rand(1, 4);
                let cmTotal = rand(120, 250); // e.g. 1m 50cm
                qs.push({ type: 'fill_blank', q: `A pole is ${m} m tall. It gets taller by ${cmTotal} cm. What is the total height in centimeters?`, answer: m * 100 + cmTotal, hint: 'Convert m to cm first!', expl: `${m}m = ${m * 100}cm. ${m * 100} + ${cmTotal} = ${m * 100 + cmTotal} cm.` });
            } else if (act === 2) {
                let km = rand(2, 5);
                let m = rand(300, 800);
                qs.push({ type: 'mcq', q: `A bus must travel ${km} km. It passed ${m} m. M left?`, opts: [`${km * 1000 - m} m`, `${km * 1000 + m} m`, `${km - m} m`, `${m - km} m`], ans: 0, expl: `${km}km = ${km * 1000}m. ${km * 1000} - ${m} = ${km * 1000 - m} m left.` });
            } else {
                let count = rand(4, 9);
                let mPerObj = rand(2, 5);
                let total = count * mPerObj;
                qs.push({ type: 'true_false', statement: `${count} cars of ${mPerObj}m placed end-to-end measure ${total * 100}cm.`, correct: true, visual: '', expl: `${count} × ${mPerObj}m = ${total}m. ${total}m = ${total * 100}cm. Correct!` });
            }
        }
    }

    if (!ensureUnique) return qs;
    return fillUniqueQuestions(skillId, qs, (id) => generatePracticeQs(id, { ensureUnique: false }));
};
