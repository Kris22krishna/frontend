// Interactive Skills data for the Data Handling chapter
// question types: mcq, fill_blank, true_false, visual_count, picture_problem

export const SKILLS = [
    { id: 1, title: 'Collecting & Organizing Data', icon: '📋', color: '#059669', desc: 'Collect information through surveys and organize it neatly using tally marks and tables.' },
    { id: 2, title: 'Reading & Creating Tables', icon: '📊', color: '#7c3aed', desc: 'Read data from tables, fill in missing values, and create your own frequency tables.' },
    { id: 3, title: 'Pictograph Reading', icon: '🖼️', color: '#0284c7', desc: 'Read pictographs, understand the key/scale, and answer questions from picture charts.' },
    { id: 4, title: 'Data Interpretation & Comparison', icon: '🔍', color: '#d97706', desc: 'Compare data, find most/least popular, calculate totals and differences.' },
];

export const LEARN_CONTENT = {
    1: {
        title: 'Collecting & Organizing Data',
        points: [
            'Data is information we collect about people, places, or things.',
            'A survey is when you ask people questions to collect data (e.g., "What is your favourite fruit?").',
            'Tally marks help you count quickly — draw 4 lines, then cross them with the 5th: 𝍸 = 5.',
            'After counting with tallies, organize the data into a table with categories and their counts (frequency).',
            'Always double-check: the total of all categories should match the number of people surveyed!',
        ],
        example: 'You asked 20 classmates their favourite colour. Red: 𝍸|| = 7, Blue: 𝍸 = 5, Green: |||| = 4, Yellow: |||| = 4. Total: 7+5+4+4 = 20 ✓',
    },
    2: {
        title: 'Reading & Creating Tables',
        points: [
            'A table organizes data into rows and columns — each row is a category, and columns show the counts.',
            'Every table needs a title that tells what the data is about.',
            'To find a missing value, use the total. If Total = 30 and you know 3 categories, subtract them to find the 4th.',
            'Tables make it easy to compare: just look across the same column to see which category has more or less.',
            'When creating a table from raw data, first list all categories, then count each one carefully.',
        ],
        example: 'Favourite Subject table: Math – 12, Art – 8, Science – 6, PE – 4. Total = 30. Most popular: Math (12). Least: PE (4).',
    },
    3: {
        title: 'Pictograph Reading',
        points: [
            'A pictograph uses pictures or symbols to represent data — it is a visual way to show information.',
            'Every pictograph has a KEY (or scale) that tells you what each picture stands for.',
            'If the key says 1 🍎 = 5 apples, then 3 apple icons means 3 × 5 = 15 apples.',
            'Half symbols mean half the value! If 1 icon = 10, half icon = 5.',
            'To find the total in a pictograph, count all icons across all categories and multiply by the scale.',
        ],
        example: 'Key: 1 🍦 = 2 cones. Chocolate: 🍦🍦🍦 = 6, Vanilla: 🍦🍦 = 4, Strawberry: 🍦🍦🍦🍦 = 8. Most popular: Strawberry!',
    },
    4: {
        title: 'Data Interpretation & Comparison',
        points: [
            'The item with the HIGHEST count is the "most popular" or "most common".',
            'The item with the LOWEST count is the "least popular" or "least common".',
            'To find "how many more", subtract: bigger number − smaller number.',
            'To find the total, add up all the categories.',
            'Sometimes you need to compare data from two groups (like boys vs girls) — read each group separately.',
        ],
        example: 'Ice gola data — Boys: Orange 8, Mango 12, Kala Khatta 5. Girls: Orange 10, Mango 6, Kala Khatta 9. Boys liked Mango most. Girls liked Orange most. Difference in Mango: 12 − 6 = 6 more boys.',
    },
};

const generateQuestionBatch = (skillId) => {
    const qs = [];
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Skill 1: Collecting & Organizing Data
    if (skillId === 1) {
        const items = ['🍎', '🍌', '🥭', '🍇', '🍊'];
        const subjects = ['Math', 'Art', 'Science', 'PE', 'Music'];
        const colours = ['Red', 'Blue', 'Green', 'Yellow', 'Orange'];

        // Easy (1–6)
        for (let i = 0; i < 6; i++) {
            const act = rand(1, 4);
            if (act === 1) {
                // Tally reading
                const n = rand(6, 18);
                qs.push({ type: 'tally_count', q: `Count the tally marks:`, category: 'Mangoes', answer: n, hint: 'Each bundle is 5. Count the extra lines!', expl: `${Math.floor(n / 5)} bundles of 5 = ${Math.floor(n / 5) * 5}, plus ${n % 5} extra = ${n}.` });
            } else if (act === 2) {
                const n = rand(3, 15);
                const isTrue = Math.random() > 0.5;
                const shown = isTrue ? n : n + rand(1, 3);
                qs.push({ type: 'true_false', statement: `${n} children were surveyed. That means we collected ${shown} data points.`, correct: isTrue, visual: '', expl: isTrue ? `Yes! Each child gives 1 data point, so ${n} children = ${n} data points.` : `No! ${n} children = ${n} data points, not ${shown}.` });
            } else if (act === 3) {
                const cat = pick(colours);
                const count = rand(3, 10);
                const total = count + rand(5, 15);
                qs.push({ type: 'mcq', q: `In a survey of ${total} students, ${count} chose ${cat}. How many did NOT choose ${cat}?`, opts: [`${total - count}`, `${count}`, `${total}`, `${total + count}`].sort(() => Math.random() - 0.5), ans: -1, expl: `${total} − ${count} = ${total - count} students chose something else.` });
                qs[qs.length - 1].ans = qs[qs.length - 1].opts.indexOf(`${total - count}`);
            } else {
                const emoji = pick(items);
                const count = rand(3, 8);
                qs.push({ type: 'visual_count', emoji, rows: 1, perRow: count, q: `Count the items to collect data!`, answer: count, expl: `There are ${count} items. That's ${count} data points collected!` });
            }
        }

        // Medium (7–13)
        for (let i = 0; i < 7; i++) {
            const act = rand(1, 4);
            if (act === 1) {
                const n = rand(12, 28);
                qs.push({ type: 'tally_count', q: `Read the tally marks:`, category: 'Books Read', answer: n, hint: 'Count by 5s then add extras!', expl: `${Math.floor(n / 5)} × 5 = ${Math.floor(n / 5) * 5}, + ${n % 5} = ${n}.` });
            } else if (act === 2) {
                const cats = pick([subjects, colours]);
                const a = rand(4, 12), b = rand(4, 12), c = rand(4, 12);
                const total = a + b + c;
                qs.push({ type: 'fill_blank', q: `Survey: ${cats[0]}=${a}, ${cats[1]}=${b}, ${cats[2]}=${c}. Total surveyed = ___`, answer: total, hint: 'Add them all up!', expl: `${a} + ${b} + ${c} = ${total}.` });
            } else if (act === 3) {
                const a = rand(5, 15), b = rand(5, 15);
                const total = a + b;
                const missingVal = a;
                qs.push({ type: 'fill_blank', q: `Total students = ${total}. Boys = ___. Girls = ${b}.`, answer: missingVal, hint: `Total − Girls = Boys`, expl: `${total} − ${b} = ${missingVal} boys.` });
            } else {
                qs.push({ type: 'mcq', q: 'Which is the BEST way to organize data?', opts: ['Write it all in one long sentence', 'Make a table with categories and counts', 'Draw random pictures', 'Just remember it'], ans: 1, expl: 'A table with categories and counts is the best way to organize data!' });
            }
        }

        // Hard (14–20)
        for (let i = 0; i < 7; i++) {
            const act = rand(1, 3);
            if (act === 1) {
                const a = rand(6, 14), b = rand(6, 14), c = rand(6, 14), d = rand(6, 14);
                const total = a + b + c + d;
                const missing = pick([a, b, c, d]);
                const shown = total - missing;
                const cats = pick([subjects, colours]);
                qs.push({ type: 'fill_blank', q: `Survey of ${total}: ${cats[0]}=${a === missing ? '?' : a}, ${cats[1]}=${b === missing ? '?' : b}, ${cats[2]}=${c === missing ? '?' : c}, ${cats[3]}=${d === missing ? '?' : d}. Find the missing value: ___`, answer: missing, hint: `Total − sum of known = missing`, expl: `${total} − ${shown} = ${missing}.` });
            } else if (act === 2) {
                const n = rand(20, 40);
                qs.push({ type: 'tally_count', q: `Big tally count!`, category: 'Visitors', answer: n, hint: 'Count the bundles (5s) first!', expl: `${Math.floor(n / 5)} × 5 = ${Math.floor(n / 5) * 5} + ${n % 5} = ${n}.` });
            } else {
                const total = rand(30, 50);
                const a = rand(5, 15), b = rand(5, 15);
                const c = total - a - b;
                qs.push({ type: 'true_false', statement: `If the total surveyed is ${total}, and two categories have ${a} and ${b}, the third must have ${c}.`, correct: true, visual: '', expl: `Yes! ${total} − ${a} − ${b} = ${c}. ✓` });
            }
        }
    }

    // Skill 2: Reading & Creating Tables
    if (skillId === 2) {
        const fruits = ['Mango', 'Apple', 'Banana', 'Grapes', 'Orange'];
        const sports = ['Cricket', 'Football', 'Chess', 'Badminton', 'Kho-Kho'];

        // Easy (1–6)
        for (let i = 0; i < 6; i++) {
            const act = rand(1, 4);
            const cats = pick([fruits, sports]);
            const a = rand(4, 12), b = rand(4, 12), c = rand(4, 12);
            if (act === 1) {
                qs.push({ type: 'mcq', q: `Table: ${cats[0]}=${a}, ${cats[1]}=${b}, ${cats[2]}=${c}. Which category has the highest count?`, opts: [cats[0], cats[1], cats[2], 'All equal'].sort(() => Math.random() - 0.5), ans: -1, expl: `The highest is ${Math.max(a, b, c)}.` });
                const maxVal = Math.max(a, b, c);
                const maxCat = maxVal === a ? cats[0] : maxVal === b ? cats[1] : cats[2];
                qs[qs.length - 1].ans = qs[qs.length - 1].opts.indexOf(maxCat);
            } else if (act === 2) {
                const table = [[cats[0], a], [cats[1], b], [cats[2], c], ['Total', '?']];
                qs.push({ type: 'fill_blank', q: `Look at the table. Find the Total:`, table, tableHeaders: ['Category', 'Count'], answer: a + b + c, hint: 'Add all values!', expl: `${a} + ${b} + ${c} = ${a + b + c}.` });
            } else if (act === 3) {
                const hi = Math.max(a, b, c), lo = Math.min(a, b, c);
                const table = [[cats[0], a], [cats[1], b], [cats[2], c]];
                qs.push({ type: 'fill_blank', q: `Difference between most and least popular?`, table, tableHeaders: ['Category', 'Count'], answer: hi - lo, hint: 'Biggest − Smallest!', expl: `${hi} − ${lo} = ${hi - lo}.` });
            } else {
                const emoji = pick(['🍎', '🏏', '⚽']);
                qs.push({ type: 'visual_count', emoji, rows: a, perRow: 1, q: `Count items for the table: How many ${cats[0]}?`, answer: a, expl: `There are ${a} items for ${cats[0]}.` });
            }
        }

        // Medium (7–13)
        for (let i = 0; i < 7; i++) {
            const act = rand(1, 4);
            const cats = pick([fruits, sports]);
            const a = rand(6, 18), b = rand(6, 18), c = rand(6, 18);
            const total = a + b + c;
            if (act === 1) {
                const table = [[cats[0], a], [cats[1], b], [cats[2], '?'], ['Total', total]];
                qs.push({ type: 'fill_blank', q: `Find the missing value in the table:`, table, tableHeaders: ['Category', 'Count'], answer: c, hint: `${total} − ${a} − ${b} = ?`, expl: `${total} − ${a} − ${b} = ${c}.` });
            } else if (act === 2) {
                const combo = a + b;
                qs.push({ type: 'mcq', q: `${cats[0]}=${a}, ${cats[1]}=${b}. How many chose ${cats[0]} or ${cats[1]}?`, opts: [`${combo}`, `${a}`, `${b}`, `${combo + c}`].sort(() => Math.random() - 0.5), ans: -1, expl: `${a} + ${b} = ${combo} chose either.` });
                qs[qs.length - 1].ans = qs[qs.length - 1].opts.indexOf(`${combo}`);
            } else if (act === 3) {
                const diff = Math.abs(a - b);
                qs.push({ type: 'fill_blank', q: `${cats[0]}=${a}, ${cats[1]}=${b}. How many more students chose ${a > b ? cats[0] : cats[1]} than ${a > b ? cats[1] : cats[0]}? ___`, answer: diff, hint: 'Subtract smaller from bigger!', expl: `${Math.max(a, b)} − ${Math.min(a, b)} = ${diff}.` });
            } else {
                qs.push({ type: 'true_false', statement: `In a table, every category should have the same count.`, correct: false, visual: '', expl: 'No! Categories can have different counts. The table just organizes and shows what each count is.' });
            }
        }

        // Hard (14–20)
        for (let i = 0; i < 7; i++) {
            const act = rand(1, 3);
            const cats = pick([fruits, sports]);
            const a = rand(8, 20), b = rand(8, 20), c = rand(8, 20), d = rand(8, 20);
            const total = a + b + c + d;
            if (act === 1) {
                const table = [[cats[0], a], [cats[1], b], [cats[2], c], [cats[3], d], ['Total', '?']];
                qs.push({ type: 'fill_blank', q: `Find the Total sum for the table:`, table, tableHeaders: ['Category', 'Count'], answer: total, hint: 'Add all four!', expl: `${a}+${b}+${c}+${d} = ${total}.` });
            } else if (act === 2) {
                const table = [[cats[0], a], [cats[1], b], [cats[2], c], [cats[3], '?'], ['Total', total]];
                qs.push({ type: 'fill_blank', q: `Find the missing value for ${cats[3]}:`, table, tableHeaders: ['Category', 'Count'], answer: d, hint: `${total} − ${a} − ${b} − ${c}`, expl: `${total} − ${a} − ${b} − ${c} = ${d}.` });
            } else {
                const hi = Math.max(a, b, c, d), lo = Math.min(a, b, c, d);
                qs.push({ type: 'mcq', q: `Scores: ${cats[0]}=${a}, ${cats[1]}=${b}, ${cats[2]}=${c}, ${cats[3]}=${d}. The difference between most & least popular is?`, opts: [`${hi - lo}`, `${hi}`, `${lo}`, `${hi + lo}`].sort(() => Math.random() - 0.5), ans: -1, expl: `${hi} − ${lo} = ${hi - lo}.` });
                qs[qs.length - 1].ans = qs[qs.length - 1].opts.indexOf(`${hi - lo}`);
            }
        }
    }

    // Skill 3: Pictograph Reading
    if (skillId === 3) {
        const icons = ['🍎', '🍦', '📚', '⭐', '🎈'];
        const categories = ['Apple', 'Ice cream', 'Book', 'Star', 'Balloon'];

        // Easy (1–6): scale = 1
        for (let i = 0; i < 6; i++) {
            const act = rand(1, 4);
            const scale = 1;
            const iconIdx = rand(0, icons.length - 1);
            const icon = icons[iconIdx];
            const cat = categories[iconIdx];
            const count = rand(3, 8);

            if (act === 1) {
                const iconStr = (icon + ' ').repeat(count).trim();
                qs.push({ type: 'fill_blank', q: `Pictograph (Key: 1 ${icon} = ${scale}). ${cat}: ${iconStr}. Total = ___`, answer: count * scale, hint: `Count the icons × ${scale}!`, expl: `${count} icons × ${scale} = ${count * scale}.` });
            } else if (act === 2) {
                qs.push({ type: 'mcq', q: `Key: 1 ${icon} = ${scale}. If you see ${count} icons, total is?`, opts: [`${count * scale}`, `${count + scale}`, `${count * 2}`, `${scale}`].sort(() => Math.random() - 0.5), ans: -1, expl: `${count} × ${scale} = ${count * scale}.` });
                qs[qs.length - 1].ans = qs[qs.length - 1].opts.indexOf(`${count * scale}`);
            } else if (act === 3) {
                qs.push({ type: 'picture_problem', scene: icon, sceneCount: count, perItem: `Key: 1 ${icon} = ${scale}`, q: `How many ${cat.toLowerCase()}s are shown?`, answer: count * scale, expl: `${count} icons × ${scale} = ${count * scale}.` });
            } else {
                qs.push({ type: 'true_false', statement: `In a pictograph, every picture must have the same value.`, correct: true, visual: '', expl: 'Yes! That\'s what the key/scale ensures — every symbol has the same value.' });
            }
        }

        // Medium (7–13): scale = 2 or 5
        for (let i = 0; i < 7; i++) {
            const act = rand(1, 4);
            const scale = pick([2, 5]);
            const iconIdx = rand(0, icons.length - 1);
            const icon = icons[iconIdx];
            const cat = categories[iconIdx];
            const count = rand(2, 7);
            const total = count * scale;

            if (act === 1) {
                qs.push({ type: 'fill_blank', q: `Key: 1 ${icon} = ${scale}. You see ${count} icons. Total = ___`, answer: total, hint: `${count} × ${scale} = ?`, expl: `${count} × ${scale} = ${total}.` });
            } else if (act === 2) {
                const count2 = rand(2, 6);
                const total2 = count2 * scale;
                const diff = Math.abs(total - total2);
                qs.push({ type: 'fill_blank', q: `Key: 1 icon = ${scale}. ${categories[0]} has ${count} icons and ${categories[1]} has ${count2} icons. What is the difference between their totals? ___`, answer: diff, hint: `(${count}×${scale}) − (${count2}×${scale})`, expl: `${total} − ${total2} = ${diff}. (Remember to multiply icons by scale first!)` });
            } else if (act === 3) {
                qs.push({ type: 'picture_problem', scene: icon, sceneCount: count, perItem: `Key: 1 ${icon} = ${scale}`, q: `How many total ${cat.toLowerCase()} are shown?`, answer: total, expl: `${count} × ${scale} = ${total}.` });
            } else {
                const wrongScale = scale + 1;
                qs.push({ type: 'true_false', statement: `Key says 1 ${icon} = ${scale}. So ${count} icons = ${count * wrongScale}.`, correct: false, visual: '', expl: `No! ${count} × ${scale} = ${total}, not ${count * wrongScale}.` });
            }
        }

        // Hard (14–20): scale = 5 or 10
        for (let i = 0; i < 7; i++) {
            const act = rand(1, 3);
            const scale = pick([5, 10]);
            const iconIdx = rand(0, icons.length - 1);
            const icon = icons[iconIdx];
            const count1 = rand(3, 8), count2 = rand(3, 8), count3 = rand(3, 8);
            const t1 = count1 * scale, t2 = count2 * scale, t3 = count3 * scale;
            const grandTotal = t1 + t2 + t3;

            if (act === 1) {
                qs.push({ type: 'fill_blank', q: `Key: 1 ${icon}=${scale}. Cat A: ${count1} icons, Cat B: ${count2} icons, Cat C: ${count3} icons. Grand total = ___`, answer: grandTotal, hint: `(${count1}+${count2}+${count3}) × ${scale}`, expl: `(${count1}+${count2}+${count3}) × ${scale} = ${count1 + count2 + count3} × ${scale} = ${grandTotal}.` });
            } else if (act === 2) {
                const most = Math.max(t1, t2, t3);
                const least = Math.min(t1, t2, t3);
                qs.push({ type: 'fill_blank', q: `Key: 1${icon}=${scale}. The three category totals are ${t1}, ${t2}, and ${t3}. How many more items are there in the most popular category than in the least popular category? ___`, answer: most - least, hint: `${most} − ${least}`, expl: `${most} − ${least} = ${most - least}.` });
            } else {
                qs.push({ type: 'mcq', q: `Key: 1 icon = ${scale}. You need to show ${count1 * scale} items. How many icons do you draw?`, opts: [`${count1}`, `${count1 * scale}`, `${scale}`, `${count1 + scale}`].sort(() => Math.random() - 0.5), ans: -1, expl: `${count1 * scale} ÷ ${scale} = ${count1} icons.` });
                qs[qs.length - 1].ans = qs[qs.length - 1].opts.indexOf(`${count1}`);
            }
        }
    }

    // Skill 4: Data Interpretation & Comparison
    if (skillId === 4) {
        const contexts = [
            { cats: ['Mango', 'Apple', 'Banana', 'Grapes'], label: 'fruits' },
            { cats: ['Cricket', 'Football', 'Chess', 'Kabaddi'], label: 'sports' },
            { cats: ['Math', 'Art', 'Science', 'PE'], label: 'subjects' },
            { cats: ['Orange', 'Mango', 'Kala Khatta', 'Lemon'], label: 'gola flavours' },
        ];

        // Easy (1–6)
        for (let i = 0; i < 6; i++) {
            const act = rand(1, 4);
            const ctx = pick(contexts);
            const a = rand(5, 15), b = rand(5, 15), c = rand(5, 15);
            const vals = [a, b, c];
            const most = Math.max(...vals);
            const least = Math.min(...vals);
            const mostCat = ctx.cats[vals.indexOf(most)];
            const leastCat = ctx.cats[vals.indexOf(least)];

            if (act === 1) {
                qs.push({ type: 'mcq', q: `Favourite ${ctx.label}: ${ctx.cats[0]}=${a}, ${ctx.cats[1]}=${b}, ${ctx.cats[2]}=${c}. Which category is the most popular?`, opts: [ctx.cats[0], ctx.cats[1], ctx.cats[2], 'All equal'].sort(() => Math.random() - 0.5), ans: -1, expl: `${mostCat} has ${most} — the highest count!` });
                qs[qs.length - 1].ans = qs[qs.length - 1].opts.indexOf(mostCat);
            } else if (act === 2) {
                qs.push({ type: 'mcq', q: `Favourite ${ctx.label}: ${ctx.cats[0]}=${a}, ${ctx.cats[1]}=${b}, ${ctx.cats[2]}=${c}. Which category is the least popular?`, opts: [ctx.cats[0], ctx.cats[1], ctx.cats[2], 'None'].sort(() => Math.random() - 0.5), ans: -1, expl: `${leastCat} has ${least} — the lowest count!` });
                qs[qs.length - 1].ans = qs[qs.length - 1].opts.indexOf(leastCat);
            } else if (act === 3) {
                qs.push({ type: 'fill_blank', q: `${ctx.cats[0]}=${a}, ${ctx.cats[1]}=${b}, ${ctx.cats[2]}=${c}. Total = ___`, answer: a + b + c, hint: 'Add all values!', expl: `${a}+${b}+${c} = ${a + b + c}.` });
            } else {
                qs.push({ type: 'fill_blank', q: `${ctx.cats[0]}=${a}, ${ctx.cats[1]}=${b}. How many more students chose ${a > b ? ctx.cats[0] : ctx.cats[1]} than ${a > b ? ctx.cats[1] : ctx.cats[0]}? ___`, answer: Math.abs(a - b), hint: 'Bigger − smaller', expl: `${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)}.` });
            }
        }

        // Medium (7–13)
        for (let i = 0; i < 7; i++) {
            const act = rand(1, 4);
            const ctx = pick(contexts);
            const a = rand(8, 20), b = rand(8, 20), c = rand(8, 20), d = rand(8, 20);
            const vals = [a, b, c, d];
            const total = a + b + c + d;
            const most = Math.max(...vals);
            const least = Math.min(...vals);

            if (act === 1) {
                qs.push({ type: 'fill_blank', q: `${ctx.cats[0]}=${a}, ${ctx.cats[1]}=${b}, ${ctx.cats[2]}=${c}, ${ctx.cats[3]}=${d}. Total = ___`, answer: total, hint: 'Sum of all 4!', expl: `${a}+${b}+${c}+${d} = ${total}.` });
            } else if (act === 2) {
                qs.push({ type: 'fill_blank', q: `The most popular category has ${most} students and the least popular category has ${least} students. What is the difference between them? ___`, answer: most - least, hint: `${most} − ${least}`, expl: `${most} − ${least} = ${most - least}.` });
            } else if (act === 3) {
                // Two-group comparison
                const boysA = rand(4, 12), boysB = rand(4, 12);
                const girlsA = rand(4, 12), girlsB = rand(4, 12);
                const totalBoys = boysA + boysB;
                qs.push({ type: 'fill_blank', q: `In this survey, each child chose only one option. Boys: ${ctx.cats[0]}=${boysA}, ${ctx.cats[1]}=${boysB}. Girls: ${ctx.cats[0]}=${girlsA}, ${ctx.cats[1]}=${girlsB}. What is the total number of boys surveyed? ___`, answer: totalBoys, hint: `${boysA} + ${boysB}`, expl: `Since each boy chose only one option, total boys surveyed = ${boysA} + ${boysB} = ${totalBoys}.` });
            } else {
                const halfTotal = Math.floor(total / 2);
                qs.push({ type: 'true_false', statement: `If total is ${total}, then more than half chose one category means that category has more than ${halfTotal}.`, correct: true, visual: '', expl: `Half of ${total} is ${halfTotal}. So "more than half" means > ${halfTotal}.` });
            }
        }

        // Hard (14–20)
        for (let i = 0; i < 7; i++) {
            const act = rand(1, 3);
            const ctx = pick(contexts);
            if (act === 1) {
                // Bal Mela context (from NCERT)
                const day1 = rand(20, 40), day2 = rand(20, 40), day3 = rand(20, 40);
                const total = day1 + day2 + day3;
                qs.push({ type: 'fill_blank', q: `Bal Mela sales — Day 1: ${day1} chaats, Day 2: ${day2}, Day 3: ${day3}. Total sold = ___`, answer: total, hint: 'Add all 3 days!', expl: `${day1} + ${day2} + ${day3} = ${total} chaats sold in total.` });
            } else if (act === 2) {
                const boysA = rand(5, 15), boysB = rand(5, 15);
                const girlsA = rand(5, 15), girlsB = rand(5, 15);
                const diff = Math.abs((boysA + boysB) - (girlsA + girlsB));
                qs.push({ type: 'fill_blank', q: `Boys total = ${boysA + boysB}. Girls total = ${girlsA + girlsB}. How many more ${(boysA + boysB) > (girlsA + girlsB) ? 'boys are there than girls' : 'girls are there than boys'}? ___`, answer: diff, hint: 'Subtract the smaller total from bigger!', expl: `${Math.max(boysA + boysB, girlsA + girlsB)} − ${Math.min(boysA + boysB, girlsA + girlsB)} = ${diff}.` });
            } else {
                const a = rand(10, 25), b = rand(10, 25), c = rand(10, 25), d = rand(10, 25);
                const vals = [a, b, c, d];
                const sorted = [...vals].sort((x, y) => y - x);
                const topTwo = sorted[0] + sorted[1];
                qs.push({ type: 'fill_blank', q: `${ctx.cats[0]}=${a}, ${ctx.cats[1]}=${b}, ${ctx.cats[2]}=${c}, ${ctx.cats[3]}=${d}. Sum of the top 2 categories = ___`, answer: topTwo, hint: 'Find the 2 biggest values and add them!', expl: `Top two: ${sorted[0]} + ${sorted[1]} = ${topTwo}.` });
            }
        }
    }

    return qs;
};

const getQuestionKey = (q) => JSON.stringify({
    type: q.type,
    q: q.q || '',
    statement: q.statement || '',
    answer: q.answer ?? null,
    answer2: q.answer2 ?? null,
    ans: q.ans ?? null,
    correct: q.correct ?? null,
    category: q.category || '',
    emoji: q.emoji || '',
    rows: q.rows ?? null,
    perRow: q.perRow ?? null,
    scene: q.scene || '',
    sceneCount: q.sceneCount ?? null,
    perItem: q.perItem || '',
    table: q.table || null,
    tableHeaders: q.tableHeaders || null,
});

export const generatePracticeQs = (skillId, options = {}) => {
    const { excludeKeys = new Set(), target = 20 } = options;
    const seen = new Set(excludeKeys);
    const uniqueQs = [];
    let attempts = 0;

    while (uniqueQs.length < target && attempts < 50) {
        const batch = generateQuestionBatch(skillId);
        batch.forEach(q => {
            if (uniqueQs.length >= target) return;
            const key = getQuestionKey(q);
            if (!seen.has(key)) {
                seen.add(key);
                uniqueQs.push(q);
            }
        });
        attempts++;
    }

    return uniqueQs.slice(0, target);
};

export const generateQuestionSets = (skillId) => {
    const practice = generatePracticeQs(skillId, { target: 20 });
    const practiceKeys = new Set(practice.map(getQuestionKey));
    const assessment = generatePracticeQs(skillId, { excludeKeys: practiceKeys, target: 20 });

    return { practice, assessment };
};
