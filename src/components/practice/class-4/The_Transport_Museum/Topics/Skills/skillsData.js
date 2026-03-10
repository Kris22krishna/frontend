// Interactive Skills data for The Transport Museum chapter
// Each question has a `type` field: visual_count, fill_blank, mcq, true_false, picture_problem, split_builder, group_maker

export const SKILLS = [
    { id: 1, title: 'Multiplying by 10 and 100', icon: '🔟', color: '#d97706', desc: 'Use shortcuts to multiply numbers by 10 and 100 instantly.' },
    { id: 2, title: 'Constructing Times Tables', icon: '✂️', color: '#0284c7', desc: 'Break down difficult tables into easy ones by splitting numbers.' },
    { id: 3, title: 'Division & Remainders', icon: '➗', color: '#059669', desc: 'Divide large groups and figure out what to do with the leftovers.' },
    { id: 4, title: 'Transport Word Problems', icon: '🚌', color: '#7c3aed', desc: 'Solve real-life transport problems involving fuel, seats, and fares.' },
];

export const LEARN_CONTENT = {
    1: {
        title: 'Multiplying by 10 and 100',
        points: [
            'To multiply any number by 10, simply attach a zero to the end. (e.g., 25 × 10 = 250)',
            'To multiply any number by 100, attach two zeros. (e.g., 8 × 100 = 800)',
            'This works because you are shifting the digits to higher place values (Tens or Hundreds).',
            'When dividing by 10 or 100, you do the opposite: remove zeros!'
        ],
        example: 'A train ticket costs ₹45. For 10 tickets: 45 × 10 = ₹450.'
    },
    2: {
        title: 'Constructing Times Tables (Splitting)',
        points: [
            'If you do not know a large times table, split it into two easier ones!',
            'To find 15 × 6, split 15 into 10 and 5.',
            'Multiply both parts by 6: (10 × 6 = 60) and (5 × 6 = 30).',
            'Add the results together: 60 + 30 = 90.',
            'You can also use "Doubling" (e.g., 4 × 8 is double of 2 × 8).'
        ],
        example: 'To calculate 12 × 4, calculate (10 × 4) + (2 × 4) = 40 + 8 = 48.'
    },
    3: {
        title: 'Division & Remainders',
        points: [
            'Division is sharing things into equal groups.',
            'Sometimes, things do not divide perfectly, leaving a "remainder".',
            'The remainder must ALWAYS be smaller than the number you are dividing by (the divisor).',
            'In transport, if you have 14 kids and a car seats 4, you need 3 cars = 12 kids. The remaining 2 kids still need a car, so you actually need 4 cars!'
        ],
        example: '15 ÷ 4: 4 fits into 15 three times (12). There are 3 left over. Answer: 3 Remainder 3.'
    },
    4: {
        title: 'Transport Word Problems',
        points: [
            'Read carefully to know if you should multiply or divide.',
            'Multiply when you are given the size of 1 group and asked for the total (e.g. 5 buses with 40 seats each).',
            'Divide when you are given the total and asked to split it evenly (e.g. 200 people going into 40-seat buses).',
            'Always remember real-life logic, like needing an extra bus for remainders!'
        ],
        example: 'Diesel costs ₹85 per litre. A truck needs 100 litres. Cost = 85 × 100 = ₹8500.'
    },
};

export const generatePracticeQs = (skillId) => {
    const qs = [];
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Skill 1: Multiplying by 10 and 100
    if (skillId === 1) {
        // Easy (1-6)
        for (let i = 0; i < 6; i++) {
            let n = rand(2, 9);
            let mult = pick([10, 10, 100]); // more 10s
            let ans = n * mult;
            let act = rand(1, 4);
            if (act === 1) qs.push({ type: 'visual_count', emoji: pick(['🚗', '🎫', '⭐', '🍎']), rows: n, perRow: mult, q: `Count ${n} packs of ${mult}!`, answer: ans, expl: `${n} × ${mult} = ${ans}. Just attach zero(s)!` });
            else if (act === 2) qs.push({ type: 'fill_blank', q: `${n} × ${mult} = ___`, answer: ans, hint: 'Attach zero(s)!', expl: `${n} × ${mult} = ${ans}.` });
            else if (act === 3) {
                let fake = ans + pick([10, -10, 100]);
                let isTrue = Math.random() > 0.5;
                qs.push({ type: 'true_false', statement: `${n} × ${mult} = ${isTrue ? ans : fake}`, correct: isTrue, visual: '', expl: isTrue ? 'Correct!' : `No, it's ${ans}.` });
            } else {
                let opts = [ans.toString(), (ans / 10).toString(), (ans * 10).toString(), (ans + 10).toString()].sort(() => Math.random() - 0.5);
                qs.push({ type: 'mcq', q: `What is ${n} × ${mult}?`, opts, ans: opts.indexOf(ans.toString()), expl: `Attach zero(s) → ${ans}.` });
            }
        }
        // Medium (7-13)
        for (let i = 0; i < 7; i++) {
            let isDiv = Math.random() > 0.4;
            let n = rand(11, 80);
            let mult = pick([10, 100]);
            if (isDiv) {
                let total = n * mult;
                let ans = n;
                let act = rand(1, 3);
                if (act === 1) qs.push({ type: 'mcq', q: `${total} ÷ ${mult} = ?`, opts: [ans.toString(), (ans * 10).toString(), (ans / 10).toString(), (ans + mult).toString()].sort(() => Math.random() - 0.5), ans: -1, expl: `Dividing removes zero(s): ${total} → ${ans}.` });
                else qs.push({ type: 'fill_blank', q: `${total} ÷ ${mult} = ___`, answer: ans, hint: 'Chop off zero(s)!', expl: `${total} ÷ ${mult} = ${ans}.` });
                // fix mcq ans
                if (act === 1) {
                    let lastItem = qs[qs.length - 1];
                    lastItem.ans = lastItem.opts.indexOf(ans.toString());
                }
            } else {
                let ans = n * mult;
                let act = rand(1, 3);
                if (act === 1) qs.push({ type: 'picture_problem', scene: pick(['🚌', '🚂', '✈️']), sceneCount: n, perItem: `👤 × ${mult}`, q: `${n} vehicles carrying ${mult} each. Total?`, answer: ans, expl: `${n} × ${mult} = ${ans}.` });
                else if (act === 2) qs.push({ type: 'true_false', statement: `${n} × ${mult} = ${ans + 100}`, correct: false, visual: '', expl: `No! ${n} × ${mult} = ${ans}.` });
                else qs.push({ type: 'fill_blank', q: `${n} × ${mult} = ___`, answer: ans, hint: 'Add zero(s)!', expl: `${n} × ${mult} = ${ans}.` });
            }
        }
        // Hard (14-20)
        for (let i = 0; i < 7; i++) {
            let isDiv = Math.random() > 0.5;
            let n = rand(20, 99);
            let mult = pick([10, 100]);
            if (isDiv) {
                let total = n * mult;
                let act = rand(1, 2);
                if (act === 1) qs.push({ type: 'mcq', q: `A car travels ${n} km/hour. Distance in ${mult} hours?`, opts: [(n * mult).toString(), n.toString(), (n * mult * 10).toString(), (n * 10).toString()].sort(() => Math.random() - 0.5), ans: -1, expl: `${n} × ${mult} = ${n * mult}.` });
                else qs.push({ type: 'fill_blank', q: `${total} ÷ ${mult} = ___`, answer: n, hint: 'Remove zero(s)!', expl: `${total} ÷ ${mult} = ${n}.` });
                if (act === 1) {
                    let lastItem = qs[qs.length - 1];
                    lastItem.ans = lastItem.opts.indexOf((n * mult).toString());
                }
            } else {
                let ans = n * mult;
                let act = rand(1, 3);
                if (act === 1) {
                    let comp = pick([10, 100]);
                    let compN = rand(1, 9);
                    let bigger = (ans > comp * compN) ? 0 : (ans < comp * compN) ? 1 : 2;
                    let opts = [`${n} × ${mult}`, `${compN} × ${comp}`, 'They are equal', 'Cannot tell'];
                    qs.push({ type: 'mcq', q: `Which is bigger: ${n} × ${mult} or ${compN} × ${comp}?`, opts, ans: bigger, expl: `${n} × ${mult} = ${ans}. ${compN} × ${comp} = ${compN * comp}.` });
                } else if (act === 2) qs.push({ type: 'picture_problem', scene: pick(['✈️', '🚢']), sceneCount: mult, perItem: `👤 × ${n}`, q: `${mult} flights with ${n} passengers each. Total?`, answer: ans, expl: `${n} × ${mult} = ${ans}.` });
                else qs.push({ type: 'fill_blank', q: `${n} × ${mult} = ___`, answer: ans, hint: 'Attach zeros!', expl: `${n} × ${mult} = ${ans}.` });
            }
        }
    }

    // Skill 2: Constructing Times Tables
    if (skillId === 2) {
        // Easy (1-6)
        for (let i = 0; i < 6; i++) {
            let n = rand(11, 15);
            let mult = rand(3, 6);
            let splitA = 10;
            let splitB = n - 10;
            let ans = n * mult;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'split_builder', number: n, splitA, splitB, multiplyBy: mult, answer: ans, expl: `(10×${mult})+(${splitB}×${mult}) = ${10 * mult}+${splitB * mult} = ${ans}.` });
            else if (act === 2) qs.push({ type: 'fill_blank', q: `(${splitA} × ${mult}) + (${splitB} × ${mult}) = ___`, answer: ans, hint: `${splitA * mult} + ${splitB * mult} = ?`, expl: `${n} × ${mult} split: ${splitA * mult} + ${splitB * mult} = ${ans}.` });
            else qs.push({ type: 'true_false', statement: `${n} × ${mult} = (${splitA}×${mult}) + (${splitB}×${mult}) = ${ans}`, correct: true, visual: `${n} → ${splitA} + ${splitB}`, expl: `Yes! ${splitA * mult} + ${splitB * mult} = ${ans}.` });
        }
        // Medium (7-13)
        for (let i = 0; i < 7; i++) {
            let n = rand(12, 19);
            let mult = rand(4, 8);
            let splitA = 10;
            let splitB = n - 10;
            let ans = n * mult;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'split_builder', number: n, splitA, splitB, multiplyBy: mult, answer: ans, expl: `(10×${mult})+(${splitB}×${mult}) = ${10 * mult}+${splitB * mult} = ${ans}.` });
            else if (act === 2) qs.push({ type: 'fill_blank', q: `${n} × ${mult} = (${splitA}×${mult}) + (${splitB}×${mult}) = ___`, answer: ans, hint: `${splitA * mult} + ${splitB * mult} = ?`, expl: `${splitA * mult} + ${splitB * mult} = ${ans}.` });
            else qs.push({ type: 'picture_problem', scene: pick(['🚌', '🚐']), sceneCount: n, perItem: `👤 × ${mult}`, q: `${n} rows of ${mult} seats. Total seats?`, answer: ans, expl: `${n}×${mult} = (10×${mult})+(${splitB}×${mult}) = ${ans}.` });
        }
        // Hard (14-20)
        for (let i = 0; i < 7; i++) {
            let n = rand(18, 25);
            let mult = rand(4, 9);
            let splitA = n >= 20 ? 20 : 10;
            let splitB = n - splitA;
            let ans = n * mult;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'split_builder', number: n, splitA, splitB, multiplyBy: mult, answer: ans, expl: `(${splitA}×${mult})+(${splitB}×${mult}) = ${splitA * mult}+${splitB * mult} = ${ans}.` });
            else if (act === 2) qs.push({ type: 'fill_blank', q: `${n} × ${mult} = (${splitA}×${mult}) + (${splitB}×${mult}) = ___`, answer: ans, hint: `${splitA * mult} + ${splitB * mult} = ?`, expl: `${splitA * mult} + ${splitB * mult} = ${ans}.` });
            else {
                let opts = [`(${splitA}×${mult})+(${splitB}×${mult})`, `(${splitA - 1}×${mult})+(${splitB + 1}×${mult})`, `(${n * 2}×${mult})-(1×${mult})`, 'All work!'];
                qs.push({ type: 'mcq', q: `Which split makes ${n} × ${mult} easiest?`, opts, ans: 0, expl: `Breaking it into tens like (${splitA}×${mult}) + (${splitB}×${mult}) is usually easiest!` });
            }
        }
    }

    // Skill 3: Division & Remainders
    if (skillId === 3) {
        // Easy (1-6)
        for (let i = 0; i < 6; i++) {
            let divisor = rand(2, 5);
            let quotient = rand(3, 8);
            let rem = rand(0, divisor - 1);
            let total = divisor * quotient + rem;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'group_maker', total, groupSize: divisor, emoji: pick(['🍎', '🧒', '🍪']), q: `Put ${total} into groups of ${divisor}.`, answer: quotient, remainder: rem, expl: `${total} ÷ ${divisor} = ${quotient} groups, remainder ${rem}.` });
            else if (act === 2) qs.push({ type: 'fill_blank', q: `${total} ÷ ${divisor} = ___ remainder ___`, answer: quotient, answer2: rem, twoAnswers: true, hint: `${divisor} × ${quotient} = ${divisor * quotient}. What's left?`, expl: `${total} ÷ ${divisor} = ${quotient} R${rem}.` });
            else qs.push({ type: 'mcq', q: `What is ${total} ÷ ${divisor}?`, opts: [`${quotient} R${rem}`, `${quotient + 1} R0`, `${quotient - 1} R${rem + divisor}`, `${quotient} R${rem + 1}`], ans: 0, expl: `${divisor} × ${quotient} = ${divisor * quotient}. Remainder is ${rem}.` });
        }
        // Medium (7-13)
        for (let i = 0; i < 7; i++) {
            let divisor = rand(4, 8);
            let quotient = rand(4, 9);
            let rem = rand(1, divisor - 1); // always remainder
            let total = divisor * quotient + rem;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'picture_problem', scene: pick(['⛵', '🚌']), sceneCount: total, perItem: `👤 ÷ ${divisor}`, q: `${total} kids in boats of ${divisor}. How many FULL boats?`, answer: quotient, expl: `${divisor}×${quotient}=${divisor * quotient}. So ${quotient} full boats.` });
            else if (act === 2) qs.push({ type: 'group_maker', total, groupSize: divisor, emoji: pick(['🎫', '🍪', '🎒']), q: `${total} shared in groups of ${divisor}.`, answer: quotient, remainder: rem, expl: `${divisor} × ${quotient} = ${divisor * quotient}. Remainder = ${rem}.` });
            else qs.push({ type: 'true_false', statement: `A remainder can be larger than the divisor`, correct: false, visual: '❌ Remainder < Divisor always!', expl: 'No! If the remainder is larger, you can make another group.' });
        }
        // Hard (14-20)
        for (let i = 0; i < 7; i++) {
            let divisor = rand(6, 12);
            let quotient = rand(5, 12);
            let rem = rand(1, divisor - 1);
            let total = divisor * quotient + rem;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'fill_blank', q: `${total} ÷ ${divisor} = ___ remainder ___`, answer: quotient, answer2: rem, twoAnswers: true, hint: `${divisor} × ${quotient} = ${divisor * quotient}. What's left?`, expl: `${total} ÷ ${divisor} = ${quotient} R${rem}.` });
            else if (act === 2) qs.push({ type: 'mcq', q: `Divide ${total} by ${divisor}.`, opts: [`${quotient} R${rem}`, `${quotient} R${rem + 2}`, `${quotient - 1} R${rem + divisor}`, `${quotient + 1} R${rem > 1 ? rem - 1 : 1}`], ans: 0, expl: `${divisor}×${quotient}=${divisor * quotient}. ${total}-${divisor * quotient}=${rem}.` });
            else qs.push({ type: 'picture_problem', scene: pick(['🚌', '🚎']), sceneCount: total, perItem: `👤 ÷ ${divisor}`, q: `${total} passengers, minibus holds ${divisor}. Buses needed?`, answer: quotient + 1, expl: `${divisor}×${quotient}=${divisor * quotient}, R${rem}. Need ${quotient + 1} buses for the extra ${rem}!` });
        }
    }

    // Skill 4: Transport Word Problems
    if (skillId === 4) {
        // Easy (1-6)
        for (let i = 0; i < 6; i++) {
            let n = rand(3, 8);
            let mult = pick([10, 20, 30, 40]);
            let ans = n * mult;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'picture_problem', scene: '🚌', sceneCount: n, perItem: `👤 × ${mult}`, q: `${n} buses with ${mult} seats each. Total seats?`, answer: ans, expl: `${n} × ${mult} = ${ans} seats.` });
            else if (act === 2) qs.push({ type: 'fill_blank', q: `A ticket costs ₹${mult}. Cost for ${n} tickets = ₹___`, answer: ans, hint: '', expl: `${mult}×${n} = ${ans}.` });
            else qs.push({ type: 'mcq', q: `A train has ${n} coaches, ${mult} people each. Total?`, opts: [`${ans}`, `${ans + 10}`, `${ans - 10}`, `${n * 10}`], ans: 0, expl: `${n} × ${mult} = ${ans}.` });
        }
        // Medium (7-13)
        for (let i = 0; i < 7; i++) {
            let n = rand(4, 12);
            let mult = rand(25, 85);
            let ans = n * mult;
            let act = rand(1, 3);
            if (act === 1) qs.push({ type: 'picture_problem', scene: '🚂', sceneCount: n, perItem: `👤 × ${mult}`, q: `${n} coaches, ${mult} passengers each. Total?`, answer: ans, expl: `${mult} × ${n} = ${ans} passengers.` });
            else if (act === 2) qs.push({ type: 'fill_blank', q: `Auto fare ₹${mult}/km. Cost for ${n} km = ₹___`, answer: ans, hint: 'Split and multiply!', expl: `${mult}×${n} = ₹${ans}.` });
            else qs.push({ type: 'mcq', q: `A car uses ${n}L for 100 km. Litres for 300 km?`, opts: [`${n * 3}L`, `${n * 2}L`, `${n * 4}L`, `${n + 3}L`], ans: 0, expl: `300 is 3 hundreds. 3 × ${n} = ${n * 3} litres.` });
        }
        // Hard (14-20)
        for (let i = 0; i < 7; i++) {
            let isDiv = Math.random() > 0.5;
            if (isDiv) {
                let seats = rand(12, 25);
                let buses = rand(15, 30);
                let extra = rand(1, seats - 1);
                let kids = seats * buses + extra;
                let ans = buses + 1;
                qs.push({ type: 'true_false', statement: `${kids} children in ${seats}-seater buses need ${ans} buses`, correct: true, visual: `${kids} ÷ ${seats} = ${buses} R${extra} → ${ans} buses!`, expl: `Yes! ${seats}×${buses}=${seats * buses}, R${extra}. The ${extra} extra kids need 1 more bus → ${ans}.` });
            } else {
                let n = rand(12, 24);
                let mult = rand(35, 65);
                let ans = n * mult;
                let act = rand(1, 2);
                if (act === 1) qs.push({ type: 'picture_problem', scene: '🚌', sceneCount: n, perItem: `👤 × ${mult}`, q: `${n} buses, ${mult} seats each. How many can travel?`, answer: ans, expl: `${n} × ${mult} = ${ans}.` });
                else qs.push({ type: 'fill_blank', q: `${n} coaches × ${mult} kids = ___ kids total`, answer: ans, hint: `Split!`, expl: `${n} × ${mult} = ${ans}.` });
            }
        }
    }

    return qs;
};
