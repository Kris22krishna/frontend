// skillsData.js — Thousands Around Us (Grade 4)
// Fully dynamic question generation. Every call produces fresh, non-repeating questions.
// Interactive question types: multiple-choice, place-value-slots, number-builder, ordering, expanded-fill

/* ─── Helpers ─── */
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rnd(0, arr.length - 1)];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const PLACES = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
const PLACE_VALS = [1000, 100, 10, 1];
const numWord = (n) => {
  const ones = ['zero','one','two','three','four','five','six','seven','eight','nine'];
  const teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  if (n < 10) return ones[n];
  if (n < 20) return teens[n - 10];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
  return String(n);
};
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const fmt = (n) => n.toLocaleString();

function rnd4() { return rnd(1000, 9999); }
function rnd4Distinct() {
  let n = rnd4();
  while (new Set(digits(n)).size !== 4) n = rnd4();
  return n;
}
function rnd4unique(count, exclude = [], generator = rnd4) {
  const set = new Set(exclude);
  const result = [];
  while (result.length < count) {
    const n = generator();
    if (!set.has(n)) { set.add(n); result.push(n); }
  }
  return result;
}
function digits(n) {
  const s = String(n);
  return [+s[0], +s[1], +s[2], +s[3]];
}
function uniqueDigitPositions(n) {
  const d = digits(n);
  return d
    .map((digit, idx) => (d.indexOf(digit) === d.lastIndexOf(digit) ? idx : -1))
    .filter(idx => idx !== -1);
}
function ensureUniqueDigitQuestion(used) {
  let n = rnd4Distinct();
  let uniquePositions = uniqueDigitPositions(n);
  while (used.has(n) || uniquePositions.length === 0) {
    n = rnd4Distinct();
    uniquePositions = uniqueDigitPositions(n);
  }
  used.add(n);
  return { n, d: digits(n), pos: pick(uniquePositions) };
}
function expanded(n) {
  const d = digits(n);
  return d.map((v, i) => v * PLACE_VALS[i]).filter(v => v > 0).join(' + ');
}

/* ─── Interactive Question Generators per Skill ─── */

// ═══════════════════════════════════
//  SKILL 1: Understanding Place Value
// ═══════════════════════════════════
function genPlaceValuePractice() {
  const qs = [];
  const used = new Set();
  const ensure = () => { let n = rnd4Distinct(); while (used.has(n)) n = rnd4Distinct(); used.add(n); return n; };

  // Type 1: MCQ — What is the place of digit X in N? (5 qs)
  for (let i = 0; i < 5; i++) {
    const { n, d, pos } = ensureUniqueDigitQuestion(used);
    const digit = d[pos];
    const correct = PLACES[pos];
    const opts = shuffle(PLACES);
    qs.push({
      type: 'multiple-choice',
      question: `What is the place of the digit ${digit} in ${fmt(n)}?`,
      options: opts,
      correctAnswer: opts.indexOf(correct),
      explanation: `The digit ${digit} is in the ${correct} place in ${fmt(n)}.`,
      image: '🔢'
    });
  }

  // Type 2: MCQ — What is the VALUE of digit X in N? (5 qs)
  for (let i = 0; i < 5; i++) {
    const { n, d, pos } = ensureUniqueDigitQuestion(used);
    const digit = d[pos];
    const value = digit * PLACE_VALS[pos];
    const fakes = shuffle(PLACE_VALS.map(v => digit * v).filter(v => v !== value)).slice(0, 3);
    const opts = shuffle([value, ...fakes]).map(v => fmt(v));
    qs.push({
      type: 'multiple-choice',
      question: `What is the value of the digit ${digit} in ${fmt(n)}?`,
      options: opts,
      correctAnswer: opts.indexOf(fmt(value)),
      explanation: `${digit} is in the ${PLACES[pos]} place, so its value is ${digit} × ${fmt(PLACE_VALS[pos])} = ${fmt(value)}.`,
      image: '💎'
    });
  }

  // Type 3: Interactive — Place Value Slots: drag digits into place columns (5 qs)
  for (let i = 0; i < 5; i++) {
    const n = ensure();
    const d = digits(n);
    qs.push({
      type: 'place-value-slots',
      question: `Place each digit of ${fmt(n)} in the correct column!`,
      number: n,
      digits: shuffle(d),
      correctSlots: d, // [Th, H, T, O]
      explanation: `${fmt(n)} = ${d[0]} Thousands, ${d[1]} Hundreds, ${d[2]} Tens, ${d[3]} Ones.`,
      image: '🏗️'
    });
  }

  // Type 4: Interactive — Number Builder: build N from a clue (5 qs)
  for (let i = 0; i < 5; i++) {
    const n = ensure();
    const d = digits(n);
    const cluePos = rnd(0, 3);
    const clue = `Build a number with ${d[cluePos]} in the ${PLACES[cluePos]} place, ${d[(cluePos + 1) % 4]} in the ${PLACES[(cluePos + 1) % 4]} place, ${d[(cluePos + 2) % 4]} in the ${PLACES[(cluePos + 2) % 4]} place, and ${d[(cluePos + 3) % 4]} in the ${PLACES[(cluePos + 3) % 4]} place.`;
    qs.push({
      type: 'number-builder',
      question: clue,
      correctAnswer: n,
      explanation: `The number is ${fmt(n)}: ${d[0]} thousands, ${d[1]} hundreds, ${d[2]} tens, ${d[3]} ones.`,
      image: '🔨'
    });
  }

  return shuffle(qs);
}

function genPlaceValueAssessment() {
  const qs = [];
  const used = new Set();
  const ensure = () => { let n = rnd4Distinct(); while (used.has(n)) n = rnd4Distinct(); used.add(n); return n; };

  // Mix of MCQ + interactive for assessment
  for (let i = 0; i < 6; i++) {
    const { n, d, pos } = ensureUniqueDigitQuestion(used);
    const digit = d[pos];
    const correct = PLACES[pos];
    const opts = shuffle(PLACES);
    qs.push({
      type: 'multiple-choice',
      question: `In ${fmt(n)}, the digit ${digit} is in which place?`,
      options: opts,
      correctAnswer: opts.indexOf(correct),
      explanation: `${digit} is in the ${correct} place.`,
      image: '🔢'
    });
  }

  for (let i = 0; i < 6; i++) {
    const { n, d, pos } = ensureUniqueDigitQuestion(used);
    const digit = d[pos];
    const value = digit * PLACE_VALS[pos];
    const fakes = shuffle(PLACE_VALS.map(v => digit * v).filter(v => v !== value)).slice(0, 3);
    const opts = shuffle([value, ...fakes]).map(v => fmt(v));
    qs.push({
      type: 'multiple-choice',
      question: `The value of ${digit} in ${fmt(n)} is…`,
      options: opts,
      correctAnswer: opts.indexOf(fmt(value)),
      explanation: `${digit} × ${fmt(PLACE_VALS[pos])} = ${fmt(value)}.`,
      image: '💎'
    });
  }

  for (let i = 0; i < 4; i++) {
    const n = ensure();
    const d = digits(n);
    qs.push({
      type: 'place-value-slots',
      question: `Sort the digits of ${fmt(n)} into the correct places!`,
      number: n,
      digits: shuffle(d),
      correctSlots: d,
      explanation: `${fmt(n)} = ${d[0]} Th, ${d[1]} H, ${d[2]} T, ${d[3]} O.`,
      image: '🏗️'
    });
  }

  for (let i = 0; i < 4; i++) {
    const n = ensure();
    const d = digits(n);
    qs.push({
      type: 'number-builder',
      question: `Build: ${d[0]} thousands + ${d[1]} hundreds + ${d[2]} tens + ${d[3]} ones = ?`,
      correctAnswer: n,
      explanation: `The answer is ${fmt(n)}.`,
      image: '🔨'
    });
  }

  return shuffle(qs);
}

// ═══════════════════════════════════
//  SKILL 2: Expanded & Standard Form
// ═══════════════════════════════════
function genExpandedPractice() {
  const qs = [];
  const used = new Set();
  const ensure = () => { let n = rnd4Distinct(); while (used.has(n)) n = rnd4Distinct(); used.add(n); return n; };

  // Type 1: MCQ — Expanded form of N (5 qs)
  for (let i = 0; i < 5; i++) {
    const n = ensure();
    const correct = expanded(n);
    // Generate plausible wrong answers
    const d = digits(n);
    const wrong1 = d.map((v, j) => v * PLACE_VALS[(j + 1) % 4]).filter(v => v > 0).join(' + ');
    const n2 = ensure();
    const wrong2 = expanded(n2);
    const n3 = ensure();
    const wrong3 = expanded(n3);
    const opts = shuffle([correct, wrong1, wrong2, wrong3]);
    qs.push({
      type: 'multiple-choice',
      question: `What is ${fmt(n)} in expanded form?`,
      options: opts,
      correctAnswer: opts.indexOf(correct),
      explanation: `${fmt(n)} = ${correct}.`,
      image: '📐'
    });
  }

  // Type 2: MCQ — Standard form from expanded (5 qs)
  for (let i = 0; i < 5; i++) {
    const n = ensure();
    const exp = expanded(n);
    const fakes = rnd4unique(3, [n]);
    const opts = shuffle([n, ...fakes]).map(v => fmt(v));
    qs.push({
      type: 'multiple-choice',
      question: `Write in standard form: ${exp}`,
      options: opts,
      correctAnswer: opts.indexOf(fmt(n)),
      explanation: `${exp} = ${fmt(n)}.`,
      image: '📊'
    });
  }

  // Type 3: Interactive — Expanded Form Fill: fill in blank place values (5 qs)
  for (let i = 0; i < 5; i++) {
    const n = ensure();
    const d = digits(n);
    const parts = d.map((v, j) => ({ place: PLACES[j], multiplier: PLACE_VALS[j], digit: v, value: v * PLACE_VALS[j] }));
    qs.push({
      type: 'expanded-fill',
      question: `Fill in the expanded form of ${fmt(n)}:`,
      number: n,
      parts: parts,
      explanation: `${fmt(n)} = ${expanded(n)}.`,
      image: '✏️'
    });
  }

  // Type 4: Interactive — Number Builder from word form (5 qs)
  for (let i = 0; i < 5; i++) {
    const n = ensure();
    const [th, h, t, o] = digits(n);
    const wordParts = [];
    if (th > 0) wordParts.push(`${capitalize(numWord(th))} thousand`);
    if (h > 0) wordParts.push(`${numWord(h)} hundred`);
    if (t > 0 && o > 0) {
      if (t * 10 + o < 20) wordParts.push(numWord(t * 10 + o));
      else wordParts.push(numWord(t * 10 + o));
    } else {
      if (t > 0) wordParts.push(numWord(t * 10));
      if (o > 0) wordParts.push(numWord(o));
    }
    qs.push({
      type: 'number-builder',
      question: `Write the number: "${wordParts.join(' ')}"`,
      correctAnswer: n,
      explanation: `"${wordParts.join(' ')}" = ${fmt(n)}.`,
      image: '📝'
    });
  }

  return shuffle(qs);
}

function genExpandedAssessment() {
  const qs = [];
  const used = new Set();
  const ensure = () => { let n = rnd4Distinct(); while (used.has(n)) n = rnd4Distinct(); used.add(n); return n; };

  for (let i = 0; i < 7; i++) {
    const n = ensure();
    const correct = expanded(n);
    const n2 = ensure(); const n3 = ensure();
    const d = digits(n);
    const wrong1 = d.map((v, j) => v * PLACE_VALS[(j + 1) % 4]).filter(v => v > 0).join(' + ');
    const opts = shuffle([correct, wrong1, expanded(n2), expanded(n3)]);
    qs.push({
      type: 'multiple-choice',
      question: `Expanded form of ${fmt(n)}?`,
      options: opts,
      correctAnswer: opts.indexOf(correct),
      explanation: `${fmt(n)} = ${correct}.`,
      image: '📐'
    });
  }

  for (let i = 0; i < 7; i++) {
    const n = ensure();
    const exp = expanded(n);
    const fakes = rnd4unique(3, [n]);
    const opts = shuffle([n, ...fakes]).map(v => fmt(v));
    qs.push({
      type: 'multiple-choice',
      question: `Standard form of: ${exp}`,
      options: opts,
      correctAnswer: opts.indexOf(fmt(n)),
      explanation: `${exp} = ${fmt(n)}.`,
      image: '📊'
    });
  }

  for (let i = 0; i < 6; i++) {
    const n = ensure();
    const d = digits(n);
    qs.push({
      type: 'expanded-fill',
      question: `Complete the expanded form of ${fmt(n)}:`,
      number: n,
      parts: d.map((v, j) => ({ place: PLACES[j], multiplier: PLACE_VALS[j], digit: v, value: v * PLACE_VALS[j] })),
      explanation: `${fmt(n)} = ${expanded(n)}.`,
      image: '✏️'
    });
  }

  return shuffle(qs);
}

// ═══════════════════════════════════
//  SKILL 3: Comparing & Ordering
// ═══════════════════════════════════
function genComparingPractice() {
  const qs = [];
  const used = new Set();
  const ensure = () => { let n = rnd4Distinct(); while (used.has(n)) n = rnd4Distinct(); used.add(n); return n; };

  // Type 1: MCQ — Compare two numbers (5 qs)
  for (let i = 0; i < 5; i++) {
    const a = ensure(), b = ensure();
    const correct = a < b ? '<' : a > b ? '>' : '=';
    const opts = ['<', '>', '='];
    qs.push({
      type: 'multiple-choice',
      question: `Compare: ${fmt(a)}  ___  ${fmt(b)}`,
      options: opts,
      correctAnswer: opts.indexOf(correct),
      explanation: `${fmt(a)} ${correct} ${fmt(b)} because ${a < b ? a + ' is smaller' : a > b ? a + ' is larger' : 'they are equal'}.`,
      image: '⚖️'
    });
  }

  // Type 2: MCQ — Which is greatest/smallest (5 qs)
  for (let i = 0; i < 5; i++) {
    const nums = rnd4unique(4, [], rnd4Distinct);
    const isGreatest = rnd(0, 1) === 0;
    const target = isGreatest ? Math.max(...nums) : Math.min(...nums);
    const opts = shuffle(nums).map(v => fmt(v));
    qs.push({
      type: 'multiple-choice',
      question: `Which number is the ${isGreatest ? 'greatest' : 'smallest'}?`,
      options: opts,
      correctAnswer: opts.indexOf(fmt(target)),
      explanation: `${fmt(target)} is the ${isGreatest ? 'greatest' : 'smallest'} because it has the ${isGreatest ? 'highest' : 'lowest'} value.`,
      image: isGreatest ? '👑' : '🐜'
    });
  }

  // Type 3: Interactive — Ordering: put numbers in correct order (5 qs)
  for (let i = 0; i < 5; i++) {
    const nums = rnd4unique(4, [], rnd4Distinct);
    const ascending = rnd(0, 1) === 0;
    const sorted = [...nums].sort((a, b) => ascending ? a - b : b - a);
    qs.push({
      type: 'ordering',
      question: `Arrange these numbers from ${ascending ? 'smallest to largest' : 'largest to smallest'}:`,
      numbers: shuffle(nums),
      correctOrder: sorted,
      explanation: `The correct order is: ${sorted.map(fmt).join(', ')}.`,
      image: ascending ? '📈' : '📉'
    });
  }

  // Type 4: MCQ — N more / N less (5 qs)
  for (let i = 0; i < 5; i++) {
    const n = ensure();
    const ops = [
      { label: '100 more than', delta: 100 },
      { label: '100 less than', delta: -100 },
      { label: '1,000 more than', delta: 1000 },
      { label: '1,000 less than', delta: -1000 },
      { label: '10 more than', delta: 10 },
      { label: '10 less than', delta: -10 },
    ];
    const op = pick(ops);
    const result = n + op.delta;
    if (result < 1000 || result > 9999) { i--; continue; }
    const fakes = [result + rnd(1, 100), result - rnd(1, 100), result + rnd(100, 500)].map(v => Math.max(1000, Math.min(9999, v)));
    const opts = shuffle([result, ...fakes]).map(v => fmt(v));
    // De-dupe options
    const uniqueOpts = [...new Set(opts)];
    if (uniqueOpts.length < 4) { i--; continue; }
    qs.push({
      type: 'multiple-choice',
      question: `What is ${op.label} ${fmt(n)}?`,
      options: uniqueOpts.slice(0, 4),
      correctAnswer: uniqueOpts.indexOf(fmt(result)),
      explanation: `${fmt(n)} ${op.delta > 0 ? '+' : '−'} ${fmt(Math.abs(op.delta))} = ${fmt(result)}.`,
      image: '🧮'
    });
  }

  return shuffle(qs);
}

function genComparingAssessment() {
  const qs = [];
  const used = new Set();
  const ensure = () => { let n = rnd4Distinct(); while (used.has(n)) n = rnd4Distinct(); used.add(n); return n; };

  for (let i = 0; i < 6; i++) {
    const a = ensure(), b = ensure();
    const correct = a < b ? '<' : a > b ? '>' : '=';
    const opts = ['<', '>', '='];
    qs.push({
      type: 'multiple-choice',
      question: `${fmt(a)}  ___  ${fmt(b)}`,
      options: opts,
      correctAnswer: opts.indexOf(correct),
      explanation: `${fmt(a)} ${correct} ${fmt(b)}.`,
      image: '⚖️'
    });
  }

  for (let i = 0; i < 6; i++) {
    const nums = rnd4unique(4, [], rnd4Distinct);
    const isGreatest = rnd(0, 1) === 0;
    const target = isGreatest ? Math.max(...nums) : Math.min(...nums);
    const opts = shuffle(nums).map(v => fmt(v));
    qs.push({
      type: 'multiple-choice',
      question: `Which is the ${isGreatest ? 'greatest' : 'smallest'}?`,
      options: opts,
      correctAnswer: opts.indexOf(fmt(target)),
      explanation: `${fmt(target)} is the ${isGreatest ? 'greatest' : 'smallest'}.`,
      image: isGreatest ? '👑' : '🐜'
    });
  }

  for (let i = 0; i < 4; i++) {
    const nums = rnd4unique(4, [], rnd4Distinct);
    const ascending = rnd(0, 1) === 0;
    const sorted = [...nums].sort((a, b) => ascending ? a - b : b - a);
    qs.push({
      type: 'ordering',
      question: `Order from ${ascending ? 'smallest → largest' : 'largest → smallest'}:`,
      numbers: shuffle(nums),
      correctOrder: sorted,
      explanation: `Correct order: ${sorted.map(fmt).join(', ')}.`,
      image: ascending ? '📈' : '📉'
    });
  }

  for (let i = 0; i < 4; i++) {
    const available = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const picked = shuffle(available).slice(0, 4);
    // Ensure at least one non-zero for thousands
    if (picked.every(d => d === 0)) picked[0] = rnd(1, 9);
    const nonZero = picked.filter(d => d > 0);
    const isLargest = rnd(0, 1) === 0;
    let answer;
    if (isLargest) {
      const sorted = [...picked].sort((a, b) => b - a);
      if (sorted[0] === 0) sorted[0] = sorted[sorted.length - 1]; // swap
      answer = +sorted.join('');
    } else {
      const sorted = [...picked].sort((a, b) => a - b);
      // first digit can't be 0
      if (sorted[0] === 0) {
        const firstNonZero = sorted.findIndex(d => d > 0);
        [sorted[0], sorted[firstNonZero]] = [sorted[firstNonZero], sorted[0]];
      }
      answer = +sorted.join('');
    }
    const fakes = rnd4unique(3, [answer]);
    const opts = shuffle([answer, ...fakes]).map(v => fmt(v));
    qs.push({
      type: 'multiple-choice',
      question: `Using the digits ${picked.join(', ')}, form the ${isLargest ? 'largest' : 'smallest'} 4-digit number.`,
      options: opts,
      correctAnswer: opts.indexOf(fmt(answer)),
      explanation: `The ${isLargest ? 'largest' : 'smallest'} 4-digit number using ${picked.join(', ')} is ${fmt(answer)}.`,
      image: '🧩'
    });
  }

  return shuffle(qs);
}

/* ═══════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════ */
export const generateThousandsSkillsData = () => [
  {
    id: 'thousands-01',
    title: 'Understanding Place Value',
    desc: 'Identify Thousands, Hundreds, Tens, and Ones.',
    color: '#2563eb',
    icon: '🎯',
    learnSections: [
      {
        heading: 'What is Place Value?',
        content: 'Every digit in a number has a "place" that tells us its value. In a 4-digit number, the places from left to right are: Thousands, Hundreds, Tens, and Ones. The same digit can mean different things depending on where it sits!',
        example: 'In 3,526 → 3 is in the Thousands place (value = 3,000), 5 is in the Hundreds place (value = 500), 2 is in the Tens place (value = 20), 6 is in the Ones place (value = 6).',
      },
      {
        heading: 'Face Value vs Place Value',
        content: 'Face value is the digit itself — it never changes! Place value depends on WHERE the digit sits. The digit 5 always has face value 5, but its place value changes: in 5,000 it\'s worth 5,000, but in 1,050 it\'s worth only 50!',
        example: 'In 4,567: face value of 5 = 5, but place value of 5 = 500 (because it\'s in the Hundreds place).',
      },
      {
        heading: 'Reading Big Numbers',
        content: 'To read a 4-digit number, start from the left: say the thousands digit, then "thousand", then read the rest. Use commas to separate thousands from the rest!',
        example: '7,089 → "Seven thousand eighty-nine" (no hundreds because the hundreds digit is 0).',
      }
    ],
    practice: genPlaceValuePractice(),
    assessment: genPlaceValueAssessment(),
  },
  {
    id: 'thousands-02',
    title: 'Expanded & Standard Form',
    desc: 'Write numbers in expanded and standard forms.',
    color: '#8b5cf6',
    icon: '✨',
    learnSections: [
      {
        heading: 'What is Expanded Form?',
        content: 'Expanded form breaks a number into the value of each digit. You write each digit multiplied by its place value, separated by + signs. It shows exactly how much each digit contributes to the whole number!',
        example: '4,521 = 4,000 + 500 + 20 + 1. Each part shows one digit\'s contribution.',
      },
      {
        heading: 'Standard Form',
        content: 'Standard form is just the normal way of writing a number — all the digits together. When you see an expanded form, add all the parts together to get the standard form.',
        example: '3,000 + 600 + 70 + 8 = 3,678 (standard form).',
      },
      {
        heading: 'Numbers with Zero',
        content: 'When a digit is 0, we skip it in expanded form (since 0 × anything = 0). But in standard form, we still write the 0 as a placeholder!',
        example: '7,045 = 7,000 + 40 + 5 (we skip the hundreds because it\'s 0). Standard form: 7,045.',
      }
    ],
    practice: genExpandedPractice(),
    assessment: genExpandedAssessment(),
  },
  {
    id: 'thousands-03',
    title: 'Comparing & Ordering',
    desc: 'Compare using <, >, = and arrange numbers.',
    color: '#f59e0b',
    icon: '🏆',
    learnSections: [
      {
        heading: 'Comparing Numbers',
        content: 'To compare two 4-digit numbers, start from the leftmost digit (Thousands). If they\'re equal, move to Hundreds, then Tens, then Ones. The first difference you find tells you which is bigger!',
        example: '4,567 vs 4,657 → Thousands are equal (4=4). Hundreds: 5 < 6. So 4,567 < 4,657.',
      },
      {
        heading: 'Ordering Numbers',
        content: 'To arrange numbers from smallest to largest (ascending) or largest to smallest (descending), compare them step by step. Use the "leftmost digit first" rule to sort quickly!',
        example: 'Sort: 3,940, 3,501, 3,099 → Ascending: 3,099, 3,501, 3,940.',
      },
      {
        heading: 'Successor & Predecessor',
        content: 'The successor is the number right after (+1). The predecessor is the number right before (−1). You can also find numbers that are 10, 100, or 1,000 more or less!',
        example: 'Successor of 4,999 = 5,000. Predecessor of 3,000 = 2,999. 100 more than 4,900 = 5,000.',
      }
    ],
    practice: genComparingPractice(),
    assessment: genComparingAssessment(),
  }
];
