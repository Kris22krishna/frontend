// ─── QUESTIONS & DATA FOR FISH TALE ─────────────────────────────────────────

const getNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generatePlaceValueQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        let num = getNum(100000, 999999);
        const type = i % 3;
        let q, options, explanation;

        if (type === 0) {
            // Number to Words
            q = `Write the number $${num.toLocaleString('en-IN')}$ in words according to the Indian System.`;
            const correct = numToWords(num);
            options = [correct, numToWords(num + 10000), numToWords(num - 1000), numToWords(num + 100000)];
            explanation = `$${num.toLocaleString('en-IN')}$ is written as ${correct}.`;
        } else if (type === 1) {
            // Digit Place Value
            let digits = num.toString().split('');
            let pos = getNum(0, 5);
            let digit = digits[pos];

            // Ensure the chosen digit is unique in the number to avoid ambiguity
            while (num.toString().indexOf(digit) !== num.toString().lastIndexOf(digit)) {
                num = getNum(100000, 999999);
                digits = num.toString().split('');
                pos = getNum(0, 5);
                digit = digits[pos];
            }

            const places = ['Lakhs', 'Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
            const actualPlace = places[pos];
            const value = parseInt(digit) * Math.pow(10, 5 - pos);

            q = `What is the place value of the digit $${digit}$ in $${num.toLocaleString('en-IN')}$?`;
            options = [`$${value.toLocaleString('en-IN')}$`, `$${(value / 10).toLocaleString('en-IN')}$`, `$${(value * 10).toLocaleString('en-IN')}$`, `$${digit}$`];
            explanation = `In $${num.toLocaleString('en-IN')}$, the digit $${digit}$ is in the ${actualPlace} place. So its value is $${value.toLocaleString('en-IN')}$.`;
        } else {
            // Expanded Form
            q = `Which of these is the correct expanded form of $${num.toLocaleString('en-IN')}$?`;
            const expanded = getExpandedForm(num);
            options = [expanded, getExpandedForm(num + 1000), getExpandedForm(num - 500), getExpandedForm(num + 10000)];
            explanation = `The expanded form shows the value of each digit added together: ${expanded}.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q,
            options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const numToWords = (n) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const helper = (num) => {
        if (num < 20) return ones[num];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
        if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + helper(num % 100) : '');
        return '';
    };

    let res = '';
    if (n >= 100000) {
        res += helper(Math.floor(n / 100000)) + ' Lakh ';
        n %= 100000;
    }
    if (n >= 1000) {
        res += helper(Math.floor(n / 1000)) + ' Thousand ';
        n %= 1000;
    }
    res += helper(n);
    return res.trim();
};

const getExpandedForm = (n) => {
    const s = n.toString();
    const parts = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== '0') {
            parts.push((parseInt(s[i]) * Math.pow(10, s.length - 1 - i)).toLocaleString('en-IN'));
        }
    }
    return `$${parts.join(' + ')}$`;
};

// ─── GENERATORS ─────────────────────────────────────────────────────────────

const generateReadingWritingQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const num = getNum(100000, 999999);
        const isWordToNum = i % 2 === 0;
        let q, options, explanation;

        if (isWordToNum) {
            const words = numToWords(num);
            q = `Write "${words}" in figures.`;
            options = [num.toLocaleString('en-IN'), (num + 10000).toLocaleString('en-IN'), (num - 1000).toLocaleString('en-IN'), (num + 100000).toLocaleString('en-IN')];
            explanation = `To write words into figures, match the words to their place values: ${num.toLocaleString('en-IN')}.`;
        } else {
            const formatted = num.toLocaleString('en-IN');
            q = `Write the number $${formatted}$ in words.`;
            const correct = numToWords(num);
            options = [correct, numToWords(num + 10000), numToWords(num - 1000), numToWords(num + 100000)];
            explanation = `$${formatted}$ is read as ${correct}.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q,
            options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateNumberSenseQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const base = getNum(10, 99);
        const multiplier = Math.pow(10, getNum(1, 3));
        const isMultiply = i % 2 === 0;
        let q, options, explanation;

        if (isMultiply) {
            q = `What is $${base} \\times ${multiplier.toLocaleString()}$?`;
            const ans = base * multiplier;
            options = [`$${ans.toLocaleString()}$`, `$${(ans * 10).toLocaleString()}$`, `$${(ans / 10).toLocaleString()}$`, `$${(ans + 100).toLocaleString()}$`];
            explanation = `When multiplying by $${multiplier}$, we add $${Math.log10(multiplier)}$ zeros to the number.`;
        } else {
            const dividend = base * multiplier;
            q = `What is $${dividend.toLocaleString()} \\div ${multiplier.toLocaleString()}$?`;
            const ans = base;
            options = [`$${ans}$`, `$${ans * 10}$`, `$${ans / 10}$`, `$${ans + 5}$`];
            explanation = `When dividing by $${multiplier}$, we remove $${Math.log10(multiplier)}$ zeros from the dividend.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q,
            options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateRealLifeDataQuestions = () => {
    const questions = [];
    const boatTypes = ['Motor Boat', 'Long Tail Boat', 'Log Boat', 'Machine Boat'];
    const catchWeights = [600, 800, 1500, 6000];

    for (let i = 0; i < 10; i++) {
        const type = i % 3;
        let q, options, explanation;

        if (type === 0) {
            const cp = getNum(20, 50);
            const sp = cp + getNum(5, 15);
            const weight = getNum(10, 50);
            const profitPerKg = sp - cp;
            const totalProfit = profitPerKg * weight;

            q = `Fazila sells Kingfish for Rs $${sp}$ per kg. If she bought it for Rs $${cp}$ per kg, how much profit does she make on $${weight}$ kg?`;
            options = [`Rs $${totalProfit}$`, `Rs $${totalProfit + 100}$`, `Rs $${totalProfit - 50}$`, `Rs $${sp * weight}$`];
            explanation = `Profit per kg is SP - CP ($${sp} - ${cp} = ${profitPerKg}$). For $${weight}$ kg, total profit is $${profitPerKg} \\times ${weight} = ${totalProfit}$.`;
        } else if (type === 1) {
            const fresh = getNum(3, 15) * 200;
            const dry = fresh / 3;
            q = `Floramma knows that $3$ kg of fresh fish gives $1$ kg of dried fish. How much dried fish will she get from $${fresh.toLocaleString()}$ kg of fresh fish?`;
            options = [`$${Math.floor(dry).toLocaleString()}$ kg`, `$${(dry * 2).toLocaleString()}$ kg`, `$${(fresh / 2).toLocaleString()}$ kg`, `$${(fresh * 3).toLocaleString()}$ kg`];
            explanation = `We divide the fresh weight by $3$ to find the dried weight: $${fresh} \\div 3 = ${Math.floor(dry)}$.`;
        } else {
            const boat = boatTypes[getNum(0, 3)];
            const capacity = catchWeights[getNum(0, 3)];
            const trips = getNum(5, 12);
            const total = capacity * trips;
            q = `A ${boat} can bring $${capacity.toLocaleString()}$ kg of fish in one trip. How much fish will it bring in $${trips}$ trips?`;
            options = [`$${total.toLocaleString()}$ kg`, `$${(total - 500).toLocaleString()}$ kg`, `$${(total + 1000).toLocaleString()}$ kg`, `$${(capacity + trips).toLocaleString()}$ kg`];
            explanation = `Multiply the capacity by the number of trips: $${capacity} \\times ${trips} = ${total}$.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q,
            options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateEstimationQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = i % 2;
        let q, options, explanation;

        if (type === 0) {
            // Rounding
            const num = getNum(1000, 9999);
            const roundTo = 1000;
            const rounded = Math.round(num / roundTo) * roundTo;
            q = `Round $${num.toLocaleString('en-IN')}$ to the nearest Thousand.`;
            options = [`$${rounded.toLocaleString('en-IN')}$`, `$${(rounded + 1000).toLocaleString('en-IN')}$`, `$${(rounded - 1000).toLocaleString('en-IN')}$`, `$${(num - (num % 100)).toLocaleString('en-IN')}$`];
            explanation = `Look at the Hundreds digit. If it is 5 or more, round up. So $${num}$ rounds to $${rounded}$.`;
        } else {
            // Estimating sums
            const n1 = getNum(2000, 8000);
            const n2 = getNum(2000, 8000);
            const r1 = Math.round(n1 / 1000) * 1000;
            const r2 = Math.round(n2 / 1000) * 1000;
            const sum = r1 + r2;
            q = `Estimate the sum: $${n1.toLocaleString('en-IN')} + ${n2.toLocaleString('en-IN')}$ by rounding each to the nearest thousand.`;
            options = [`$${sum.toLocaleString('en-IN')}$`, `$${(sum + 1000).toLocaleString('en-IN')}$`, `$${Math.abs(sum - 1000).toLocaleString('en-IN')}$`, `$${(sum + 500).toLocaleString('en-IN')}$`];
            explanation = `$${n1}$ rounds to $${r1}$ and $${n2}$ rounds to $${r2}$. Their sum is $${sum}$.`;
        }

        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);
        while (shuffled.length < 4) shuffled.push(`$${getNum(1000, 20000).toLocaleString('en-IN')}$`);

        questions.push({
            question: q,
            options: shuffled.slice(0, 4),
            correct: shuffled.slice(0, 4).indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateComparisonQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = i % 2;
        let q, options, explanation;

        if (type === 0) {
            // Which is larger
            const n1 = getNum(100000, 999999);
            let n2, n3, n4;
            do { n2 = getNum(100000, 999999); } while (n1 === n2);
            do { n3 = getNum(100000, 999999); } while (n1 === n3 || n2 === n3);
            do { n4 = getNum(100000, 999999); } while (n1 === n4 || n2 === n4 || n3 === n4);
            const arr = [n1, n2, n3, n4];
            const max = Math.max(...arr);

            q = `Which number is the largest?`;
            options = [`$${max.toLocaleString('en-IN')}$`];
            arr.filter(x => x !== max).forEach(x => options.push(`$${x.toLocaleString('en-IN')}$`));

            explanation = `Compare the digits from left to right. The number with the greatest digit in the highest place value is the largest. $${max.toLocaleString('en-IN')}$ is the largest.`;
        } else {
            // True or false inequality
            const n1 = getNum(100000, 999999);
            const n2 = getNum(100000, 999999);
            const isLess = n1 < n2;
            const op = isLess ? '<' : '>';

            q = `True or False: $${n1.toLocaleString('en-IN')} ${op} ${n2.toLocaleString('en-IN')}$`;
            options = ['True', 'False'];
            explanation = `Comparing the digits from left to right, we see that $${n1.toLocaleString('en-IN')}$ is ${isLess ? 'less' : 'greater'} than $${n2.toLocaleString('en-IN')}$. Thus, it is True.`;
        }

        let shuffled = [...new Set(options)];
        if (type === 0) shuffled = shuffled.sort(() => Math.random() - 0.5);

        questions.push({
            question: q,
            options: shuffled.slice(0, 4),
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateLogisticsQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = i % 2;
        let q, options, explanation;

        if (type === 0) {
            // Distance
            const speed = getNum(10, 50);
            const time = getNum(2, 6);
            const distance = speed * time;

            q = `A boat travels at $${speed}$ km/h. How far will it go in $${time}$ hours?`;
            options = [`$${distance}$ km`, `$${distance + speed}$ km`, `$${distance - speed}$ km`, `$${speed + time}$ km`];
            explanation = `Distance = Speed $\\times$ Time. So, $${speed} \\times ${time} = ${distance}$ km.`;
        } else {
            // Speed
            const speed = getNum(15, 60);
            const time = getNum(2, 5);
            const distance = speed * time;

            q = `If a boat travels $${distance}$ km in $${time}$ hours, what is its speed?`;
            options = [`$${speed}$ km/h`, `$${speed + 10}$ km/h`, `$${Math.max(10, speed - 10)}$ km/h`, `$${distance - time}$ km/h`];
            explanation = `Speed = Distance $\\div$ Time. So, $${distance} \\div ${time} = ${speed}$ km/h.`;
        }

        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);
        questions.push({
            question: q,
            options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateLargeNumbersQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = i % 2;
        let q, options, explanation;

        if (type === 0) {
            // How many zeros
            const choices = [
                { name: '1 Lakh', zeros: 5, num: '1,00,000' },
                { name: '10 Lakhs', zeros: 6, num: '10,00,000' },
                { name: '1 Crore', zeros: 7, num: '1,00,00,000' },
                { name: '10 Crores', zeros: 8, num: '10,00,00,000' }
            ];
            const item = choices[getNum(0, 3)];

            q = `How many zeros are in ${item.name}?`;
            options = [`$${item.zeros}$`, `$${item.zeros - 1}$`, `$${item.zeros + 1}$`, `$${item.zeros + 2}$`];
            explanation = `${item.name} is written as $${item.num}$, which has ${item.zeros} zeros.`;
        } else {
            // Conversions
            const conversions = [
                { q: 'What is 100 Lakhs called in the Indian system?', ans: '1 Crore', opts: ['10 Lakh', '1 Billion', '1 Million'] },
                { q: 'What is 100 Thousands called in the Indian system?', ans: '1 Lakh', opts: ['1 Crore', '10 Lakh', '10 Thousand'] },
                { q: 'How many Lakhs make a Crore?', ans: '100', opts: ['10', '1000', '1'] }
            ];
            const item = conversions[getNum(0, 2)];

            q = item.q;
            options = [item.ans, ...item.opts];
            explanation = `In the Indian numbering system, ${item.ans} is the correct equivalent.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q,
            options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

// ─── SKILLS CONFIG ──────────────────────────────────────────────────────────

export const SKILLS = [
    {
        id: 'ft-01',
        title: 'Place Value',
        subtitle: 'Lakhs & Beyond',
        icon: '🏛️',
        color: '#0ea5e9',
        desc: 'Master the Indian Numeral System up to 6 digits.',
        learn: {
            concept: 'Understanding Large Numbers',
            rules: [
                {
                    title: 'The Indian System',
                    f: '$$1,00,000 = 1\\text{ Lakh}$$',
                    d: 'In the Indian system, we use commas after the Hundreds, then after every two digits.',
                    ex: '$5,42,109$ is Five Lakh Forty-Two Thousand One Hundred and Nine.',
                    tip: 'Count from the right: 3 digits, then groups of 2!'
                },
                {
                    title: 'Expanded Form',
                    f: '$$\\text{Value} = \\text{Digit} \\times \\text{Place}$$',
                    d: 'Expanded form shows the sum of the place values of each digit.',
                    ex: '$4,562 = 4000 + 500 + 60 + 2$',
                    tip: 'Zeroes in a number don\'t need to be shown in expanded form.'
                }
            ]
        },
        practice: generatePlaceValueQuestions,
        assessment: generatePlaceValueQuestions
    },
    {
        id: 'ft-02',
        title: 'Estimation',
        subtitle: 'Real-Life rounding',
        icon: '🎯',
        color: '#0284c7',
        desc: 'Round off large numbers for quick trade calculations.',
        learn: {
            concept: 'Rounding and Estimation',
            rules: [
                {
                    title: 'Rounding Rule',
                    f: '$$5 \\uparrow, <5 \\rightarrow$$',
                    d: 'If the digit to the right is 5 or more, round up. If less than 5, keep it the same.',
                    ex: '$48$ rounded to nearest $10$ is $50$.',
                    tip: 'Always look at the digit immediately to the right of your target place!'
                }
            ]
        },
        practice: generateEstimationQuestions,
        assessment: generateEstimationQuestions
    },
    {
        id: 'ft-03',
        title: 'Reading & Writing',
        subtitle: 'Figures to Words',
        icon: '📝',
        color: '#0ea5e9',
        desc: 'Read and write numbers up to 10 lakhs in the Indian system.',
        learn: {
            concept: 'Numeral Systems',
            rules: [
                {
                    title: 'Words to Figures',
                    f: '$$\\text{Five Lakh} = 5,00,000$$',
                    d: 'Convert written words into numerical figures by placing digits in their period blocks.',
                    ex: 'Two Lakh Three Thousand = $2,03,000$',
                    tip: 'Always check if you need a zero as a placeholder!'
                }
            ]
        },
        practice: generateReadingWritingQuestions,
        assessment: generateReadingWritingQuestions
    },
    {
        id: 'ft-04',
        title: 'Comparison',
        subtitle: 'Value judgement',
        icon: '⚖️',
        color: '#0284c7',
        desc: 'Comparing large numbers in catch volumes and sales.',
        learn: {
            concept: 'Comparing Large Numbers',
            rules: [
                {
                    title: 'Comparing Digits',
                    f: '$$7,42,000 > 6,98,000$$',
                    d: 'Start comparing from the highest place value (leftmost digit).',
                    ex: '$5,00,000 > 4,99,999$',
                    tip: 'Count digits first! More digits mean a larger number.'
                }
            ]
        },
        practice: generateComparisonQuestions,
        assessment: generateComparisonQuestions
    },
    {
        id: 'ft-05',
        title: 'Number Sense',
        subtitle: 'Binary Ops',
        icon: '🔢',
        color: '#0369a1',
        desc: 'Master multiplication and division by powers of 10.',
        learn: {
            concept: 'Mental Math with Large Numbers',
            rules: [
                {
                    title: 'Shifting Zeros',
                    f: '$$n \\times 10^x \\rightarrow \\text{Add } x \\text{ zeros}$$',
                    d: 'When multiplying by 10, 100, or 1000, simply add the zeros to the end of the number.',
                    ex: '$45 \\times 100 = 4,500$',
                    tip: 'Division is the opposite—remove the zeros!'
                }
            ]
        },
        practice: generateNumberSenseQuestions,
        assessment: generateNumberSenseQuestions
    },
    {
        id: 'ft-06',
        title: 'Logistics',
        subtitle: 'Trip time & catch',
        icon: '🛥️',
        color: '#075985',
        desc: 'Calculating distance and speed for different boat types.',
        learn: {
            concept: 'Distance and Speed',
            rules: [
                {
                    title: 'The Speed Formula',
                    f: '$$S = D/T$$',
                    d: 'Speed is distance divided by time.',
                    ex: '$20$ km in $1$ hr $= 20$ km/h',
                    tip: 'Distance = Speed × Time!'
                }
            ]
        },
        practice: generateLogisticsQuestions,
        assessment: generateLogisticsQuestions
    },
    {
        id: 'ft-07',
        title: 'Real Life Data',
        subtitle: 'Trade & Profit',
        icon: '📊',
        color: '#0c4a6e',
        desc: 'Interpreting fish market data and trade profiles.',
        learn: {
            concept: 'Economic Math',
            rules: [
                {
                    title: 'Profit Calculation',
                    f: '$$P = SP - CP$$',
                    d: 'Profit is Selling Price minus Cost Price.',
                    ex: 'Buy at $10$, Sell at $15 \\rightarrow \\text{Profit} = 5$',
                    tip: 'If SP < CP, it is a loss!'
                }
            ]
        },
        practice: generateRealLifeDataQuestions,
        assessment: generateRealLifeDataQuestions
    },
    {
        id: 'ft-08',
        title: 'Large Numbers',
        subtitle: 'Crowds & Counts',
        icon: '🌍',
        color: '#0ea5e9',
        desc: 'Understanding very large numbers in real-world contexts.',
        learn: {
            concept: 'Contextual Math',
            rules: [
                {
                    title: 'Real World Scale',
                    f: '$$1 \\text{ Crore} = 100 \\text{ Lakhs}$$',
                    d: 'Understanding how many zeros are in a Crore (7 zeros) or a Billion.',
                    ex: 'The population of a city can be in lakhs.',
                    tip: 'A Crore is ten million in the International system.'
                }
            ]
        },
        practice: generateLargeNumbersQuestions,
        assessment: generateLargeNumbersQuestions
    }
];
