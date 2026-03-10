const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'components', 'practice', 'class-10', 'Probability', 'Topics', 'Skills', 'ProbabilitySkillsData.js');

function generateQuestions(templateFn, count) {
    let qs = [];
    for (let i = 0; i < count; i++) {
        qs.push(templateFn(i, count));
    }
    return qs;
}

const s1_practice = [
    { question: 'What is the sample space for tossing a single fair coin?', options: ['$\\{H\\}$', '$\\{T\\}$', '$\\{H, T\\}$', '$\\{H, T, HT\\}$'], correct: 2, explanation: 'A coin has exactly two sides: Head ($H$) and Tail ($T$).' },
    { question: 'What is the total number of outcomes when rolling a standard six-sided die?', options: ['6', '36', '1', '12'], correct: 0, explanation: 'A standard die has the numbers 1 to 6 on its faces, making 6 possible outcomes.' },
    { question: 'Which of the following describes an outcome?', options: ['The entire sample space', 'A single possible result of an experiment', 'An impossible event', 'A mathematical formula'], correct: 1, explanation: 'An outcome is defined as a single possible result of a random experiment.' },
    { question: 'If you draw one card from a standard deck, how many total possible outcomes are there?', options: ['13', '26', '52', '4'], correct: 2, explanation: 'A standard playing card deck contains exactly 52 unique cards.' },
    { question: 'Which of the following is NOT a random experiment?', options: ['Tossing a coin', 'Rolling a die', 'Boiling pure water at 100°C', 'Drawing a card blindly'], correct: 2, explanation: 'Boiling water at 100°C under standard pressure always produces steam. The result is certain, not random.' },
    { question: 'What is the sample space of choosing a vowel from the English alphabet?', options: ['$\\{A, E, I, O, U\\}$', '$\\{A, B, C\\}$', '$\\{X, Y, Z\\}$', 'None of these'], correct: 0, explanation: 'The vowels are exactly A, E, I, O, U.' },
    { question: 'If a spinner has 4 equal sections colored Red, Blue, Green, and Yellow, what is the sample space?', options: ['$\\{Red, Blue\\}$', '$\\{\\text{All Colors}\\}$', '$\\{Red, Blue, Green, Yellow\\}$', '$\\{Red\\}$'], correct: 2, explanation: 'The sample space lists all distinct individual sections.' },
    { question: 'A bag contains 3 red balls and 2 blue balls. If one ball is drawn, how many physical outcomes are there?', options: ['2', '3', '5', '1'], correct: 2, explanation: 'Each of the 5 individual balls represents a distinct physical outcome, even if some have the same color.' },
    { question: 'What does it mean for outcomes to be "equally likely"?', options: ['They cannot happen', 'One is more likely than the other', 'They have the exact same chance of occurring', 'They add up to 2'], correct: 2, explanation: 'Equally likely means the probability is evenly distributed.' },
    { question: 'Are the outcomes of rolling a weighted dice "equally likely"?', options: ['Yes', 'No', 'Sometimes', 'Always'], correct: 1, explanation: 'A weighted die favors certain sides over others.' },
    { question: 'If you flip a coin that has Heads on both sides, is getting Heads or Tails equally likely?', options: ['Yes', 'No', 'Depends on the toss', 'Yes, it is a coin'], correct: 1, explanation: 'Since there is no Tail, Tails is impossible and Heads is certain.' },
    { question: 'When throwing a standard die, are the outcomes (Even) and (Odd) equally likely?', options: ['Yes', 'No', 'Only on a rigged die', 'They sum to 0'], correct: 0, explanation: 'There are 3 Evens (2,4,6) and 3 Odds (1,3,5). So yes.' },
    { question: 'What is the sample space for the sum of two 6-sided dice?', options: ['$\\{1, 2... 12\\}$', '$\\{2, 3... 12\\}$', '$\\{1, 6\\}$', '$\\{36\\}$'], correct: 1, explanation: 'The minimum sum is 2 (1+1) and max is 12 (6+6).' },
    { question: 'Which sample space describes tossing two coins?', options: ['$\\{H, T\\}$', '$\\{HH, TT\\}$', '$\\{HH, HT, TH, TT\\}$', '$\\{H, T, HT\\}$'], correct: 2, explanation: 'Each coin has 2 states. Total = 2 * 2 = 4.' },
    { question: 'Are the events "Sum is 2" and "Sum is 7" equally likely when rolling two dice?', options: ['Yes', 'No', 'Only mathematically', 'Sometimes'], correct: 1, explanation: 'Sum 2 has 1 outcome, Sum 7 has 6.' },
    { question: 'If you pick a random integer from 1 to 10 inclusive, are the outcomes equally likely?', options: ['Yes', 'No', 'Only primes', 'Only evens'], correct: 0, explanation: 'Each has a 1/10 chance.' },
    { question: 'A jar has 10 red marbles and 1 blue marble. Are picking Red and picking Blue equally likely?', options: ['Yes', 'No', 'Sometimes', 'Always'], correct: 1, explanation: 'Red is much more likely.' },
    { question: 'What is the sample space of flipping a coin until a Head or 3 times max?', options: ['$\\{H, TH, TTH, TTT\\}$', '$\\{H, T\\}$', '$\\{HHH, TTT\\}$', '$\\{HT, TH\\}$'], correct: 0, explanation: 'All sequences that stop on H or at 3 flips.' },
    { question: 'Two numbers are drawn from {1, 2, 3} without replacement. Sample space size?', options: ['3', '6', '9', '8'], correct: 1, explanation: '3 * 2 = 6 pairs.' },
    { question: 'If three coins are tossed, the sample space size is:', options: ['3', '6', '8', '9'], correct: 2, explanation: '2 * 2 * 2 = 8.' }
];

const s1_assessment = [
    { question: 'If you toss two coins simultaneously, how many outcomes are in the sample space?', options: ['2', '3', '4', '8'], correct: 2, explanation: 'HH, HT, TH, TT.' },
    { question: 'Which of the following describes equally likely outcomes?', options: ['Picking a card from a deck', 'A rigged game', 'A loaded die', 'Flipping a bent coin'], correct: 0, explanation: 'Standard decks afford equal chances.' },
    { question: 'What is the sample space for guessing a 1-digit PIN (0-9)?', options: ['$\\{1... 9\\}$', '$\\{0... 9\\}$', '10', '100'], correct: 1, explanation: '0 to 9 are 10 digits.' },
    { question: 'A spinner has 1 Green and 3 Red sections of equal size. Equal?', options: ['Yes', 'No', 'Maybe', 'Always'], correct: 1, explanation: 'Unbalanced proportions.' },
    { question: 'In a family of 2 children, gender sample space?', options: ['$\\{B, G\\}$', '$\\{BB, GG\\}$', '$\\{BB, BG, GB, GG\\}$', 'None'], correct: 2, explanation: 'Permutations of B and G.' },
    { question: 'If you roll an 8-sided die, how many possible outcomes?', options: ['6', '8', '16', '64'], correct: 1, explanation: '8 faces = 8 outcomes.' },
    { question: 'Which set represents drawing a letter from "CAT"?', options: ['$\\{C, A\\}$', '$\\{A, T\\}$', '$\\{C, A, T\\}$', '$\\{CAT\\}$'], correct: 2, explanation: '{C, A, T}.' },
    { question: 'Are the outcomes of choosing a date in a leap year equal?', options: ['Yes', 'No', 'February only', 'Never'], correct: 0, explanation: 'Each day is 1/366.' },
    { question: 'Two cards from a deck WITH replacement. Outcomes?', options: ['52', '104', '2652', '2704'], correct: 3, explanation: '52 * 52 = 2704.' },
    { question: 'True or False: A sample space must contain finite outcomes.', options: ['True', 'False', 'Sometimes', 'Always'], correct: 1, explanation: 'Continuous spaces exist.' }
];

const s2_prac = generateQuestions((i) => {
    let t = 10 + i;
    let f = (i % 5) + 2;
    return {
        question: `A bag contains ${t} total items, of which ${f} are special. What is the probability of picking a special item?`,
        options: [`$\\\\frac{${f}}{${t}}$`, `$\\\\frac{1}{${t}}$`, `$\\\\frac{${f}}{${t - f}}$`, `$\\\\frac{${t - f}}{${t}}$`],
        correct: 0,
        explanation: `P = Favourable (${f}) / Total (${t}).`
    };
}, 20);

const s2_ass = generateQuestions((i) => {
    let t = 20 + i;
    let f = 5;
    return {
        question: `A class has ${t} students. ${f} of them wear glasses. Probability of picking one who wears glasses?`,
        options: [`$\\\\frac{${f}}{${t}}$`, `$\\\\frac{1}{${t}}$`, `$\\\\frac{${f}}{20}$`, `0`],
        correct: 0,
        explanation: `${f} out of ${t}.`
    }
}, 10);

const s3_prac = generateQuestions((i) => {
    if (i < 5) return { question: 'What is an elementary event?', options: ['Exactly one outcome', 'Multiple outcomes', 'Zero outcomes', 'Whole space'], correct: 0, explanation: 'Simple event = single outcome.' };
    return { question: `Experiment case ${i}: Is a single outcome elementary?`, options: ['Yes', 'No', 'Maybe', 'Never'], correct: 0, explanation: 'Yes, by definition.' };
}, 20);

const s3_ass = generateQuestions((i) => {
    return { question: `If an experiment has 5 elementary events each with probability x, what is x?`, options: ['0.2', '0.1', '0.5', '1'], correct: 0, explanation: '5x = 1 => x = 0.2.' };
}, 10);

const s4_prac = generateQuestions((i) => {
    let p = (0.1 + i * 0.04).toFixed(2);
    let comp = (1 - parseFloat(p)).toFixed(2);
    return { question: `If P(E) = ${p}, find P(not E).`, options: [`${comp}`, `${p}`, '1', '0'], correct: 0, explanation: '1 - P(E).' };
}, 20);

const s4_ass = generateQuestions((i) => {
    let p = (0.05 + i * 0.09).toFixed(2);
    let comp = (1 - parseFloat(p)).toFixed(2);
    return { question: `P(E) is ${p}. P(not E) is:`, options: [`${comp}`, `${p}`, '0.5', '1'], correct: 0, explanation: 'Sum is 1.' };
}, 10);

const s5_prac = generateQuestions((i) => {
    if (i % 2 === 0) return { question: 'P(Impossible Event)?', options: ['0', '1', '0.5', 'None'], correct: 0, explanation: 'Cannot happen.' };
    return { question: 'P(Sure Event)?', options: ['1', '0', '0.5', 'None'], correct: 0, explanation: 'Always happens.' };
}, 20);

const s5_ass = generateQuestions((i) => {
    if (i < 5) return { question: 'Probability of a sun rising in West?', options: ['0', '1', '0.5', 'None'], correct: 0, explanation: 'Impossible.' };
    return { question: 'Probability of getting a Head or Tail on a coin?', options: ['1', '0', '0.5', 'None'], correct: 0, explanation: 'Sure.' };
}, 10);

const s6_prac = generateQuestions((i) => {
    return { question: `Tossing ${i % 3 + 2} coins. Total outcomes?`, options: [`${Math.pow(2, i % 3 + 2)}`, `${(i % 3 + 2) * 2}`, '2', '4'], correct: 0, explanation: '2^n.' };
}, 20);

const s6_ass = generateQuestions((i) => {
    return { question: `Rolling 2 dice. Sum of 7 probability?`, options: ['6/36', '1/36', '1/6', 'Both A and C'], correct: 3, explanation: '(1,6),(2,5),(3,4),(4,3),(5,2),(6,1). 6/36 = 1/6.' };
}, 10);

const s7_prac = generateQuestions((i) => {
    return { question: `Draw a card. P(Heart)?`, options: ['1/4', '1/13', '1/52', '1/2'], correct: 0, explanation: '13/52 = 1/4.' };
}, 20);

const s7_ass = generateQuestions((i) => {
    return { question: `P(King)?`, options: ['4/52', '1/13', 'Both', '1/52'], correct: 2, explanation: '4 Kings out of 52.' };
}, 10);

const s8_prac = generateQuestions((i) => {
    return { question: `Bag has 5 red, ${i + 5} blue marbles. P(Red)?`, options: [`5/${i + 10}`, '5/10', '1/2', 'None'], correct: 0, explanation: '5 / Total.' };
}, 20);

const s8_ass = generateQuestions((i) => {
    return { question: `Class of 30. ${i + 5} girls. P(Girl)?`, options: [`${i + 5}/30`, '1/2', '5/30', 'None'], correct: 0, explanation: 'Girls / Total.' };
}, 10);


const SKILLS = [
    {
        id: 's1', title: 'Random Experiments', subtitle: 'The Foundation', desc: 'Identify sample spaces.', color: '#8b5cf6', icon: '🎲',
        learn: { concept: 'uncertain result actions.', rules: [{ title: 'Likely', f: 'P(E)=1/n', d: 'Equal chances.' }] },
        practice: s1_practice, assessment: s1_assessment
    },
    {
        id: 's2', title: 'Theoretical Probability', subtitle: 'The Formula', desc: 'Compute chances.', color: '#3b82f6', icon: '🎯',
        learn: { concept: 'Ratio logic.', rules: [{ title: 'Formula', f: 'F/T', d: 'Fave/Total.' }] },
        practice: s2_prac, assessment: s2_ass
    },
    {
        id: 's3', title: 'Elementary Events', subtitle: 'Single Outcomes', desc: 'Sum to 1.', color: '#ec4899', icon: '1️⃣',
        learn: { concept: 'One result.', rules: [{ title: 'Sum', f: 'sum=1', d: 'Total 100%.' }] },
        practice: s3_prac, assessment: s3_ass
    },
    {
        id: 's4', title: 'Complementary Events', subtitle: 'The Not Rule', desc: 'Subtract from 1.', color: '#f59e0b', icon: '☯️',
        learn: { concept: 'Opposites.', rules: [{ title: 'Complement', f: '1-P', d: 'Remaining.' }] },
        practice: s4_prac, assessment: s4_ass
    },
    {
        id: 's5', title: 'Impossible & Sure', subtitle: 'Limits', desc: '0 and 1.', color: '#10b981', icon: '⚖️',
        learn: { concept: 'Bounds.', rules: [{ title: '0-1', f: '0<=P<=1', d: 'Range.' }] },
        practice: s5_prac, assessment: s5_ass
    },
    {
        id: 's6', title: 'Coins & Dice', subtitle: 'Combinations', desc: 'Multiply spaces.', color: '#6366f1', icon: '🧩',
        learn: { concept: 'Compound.', rules: [{ title: 'Multi', f: 'n*m', d: 'Counting.' }] },
        practice: s6_prac, assessment: s6_ass
    },
    {
        id: 's7', title: 'Playing Cards', subtitle: 'Deck Logic', desc: '52 cards.', color: '#ef4444', icon: '🃏',
        learn: { concept: 'Suits/Ranks.', memory: '52 cards.', rules: [{ title: 'Deck', f: 'count/52', d: 'Standard.' }] },
        practice: s7_prac, assessment: s7_ass
    },
    {
        id: 's8', title: 'Real-Life', subtitle: 'Scenarios', desc: 'Daily math.', color: '#14b8a6', icon: '🛍️',
        learn: { concept: 'Selections.', rules: [{ title: 'Real', f: 'q/p', d: 'Mixing.' }] },
        practice: s8_prac, assessment: s8_ass
    }
];

const fileContent = 'export const SKILLS = ' + JSON.stringify(SKILLS, null, 4) + ';';
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Success');
