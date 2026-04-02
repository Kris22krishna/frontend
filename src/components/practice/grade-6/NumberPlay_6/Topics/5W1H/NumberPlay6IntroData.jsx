// ─── SVG Illustrations for each card ─────────────────────────
const svgWhat = `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="40" x2="260" y2="40" stroke="#0891b2" stroke-width="2" stroke-dasharray="4,4"/>
  <circle cx="50" cy="40" r="12" fill="#0891b2"/><text x="50" y="44" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">1</text>
  <circle cx="110" cy="40" r="12" fill="#0369a1"/><text x="110" y="44" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">2</text>
  <circle cx="170" cy="40" r="12" fill="#06b6d4"/><text x="170" y="44" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">4</text>
  <circle cx="230" cy="40" r="12" fill="#0891b2"/><text x="230" y="44" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">8</text>
  <path d="M 50 20 Q 80 -10 110 20" fill="none" stroke="#0891b2" stroke-width="2"/>
  <path d="M 110 20 Q 140 -10 170 20" fill="none" stroke="#0369a1" stroke-width="2"/>
  <path d="M 170 20 Q 200 -10 230 20" fill="none" stroke="#06b6d4" stroke-width="2"/>
  <text x="140" y="70" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">Discovering sequences and hidden mathematical rules</text>
</svg>`;

const svgWhy = `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <rect x="120" y="35" width="40" height="30" rx="4" fill="#10b981" />
  <path d="M 128 35 L 128 20 A 12 12 0 0 1 152 20 L 152 35" fill="none" stroke="#10b981" stroke-width="4"/>
  <circle cx="140" cy="50" r="4" fill="#fff"/>
  <line x1="140" y1="50" x2="140" y2="58" stroke="#fff" stroke-width="2"/>
  <text x="140" y="76" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">Numbers secure data, power algorithms, and solve problems</text>
</svg>`;

const svgWho = `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <rect x="90" y="20" width="100" height="40" rx="20" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="140" y="46" font-size="22" font-weight="800" fill="#f59e0b" text-anchor="middle" letter-spacing="4">6174</text>
  <text x="140" y="76" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">D. R. Kaprekar and other legendary mathematicians</text>
</svg>`;

const svgWhere = `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <rect x="115" y="5" width="50" height="50" fill="none" stroke="#ec4899" stroke-width="2"/>
  <line x1="115" y1="21.6" x2="165" y2="21.6" stroke="#ec4899" stroke-width="2"/>
  <line x1="115" y1="38.3" x2="165" y2="38.3" stroke="#ec4899" stroke-width="2"/>
  <line x1="131.6" y1="5" x2="131.6" y2="55" stroke="#ec4899" stroke-width="2"/>
  <line x1="148.3" y1="5" x2="148.3" y2="55" stroke="#ec4899" stroke-width="2"/>
  <text x="123.3" y="17" font-size="10" fill="#ec4899" font-weight="bold" text-anchor="middle">8</text>
  <text x="140" y="17" font-size="10" fill="#ec4899" font-weight="bold" text-anchor="middle">1</text>
  <text x="156.6" y="17" font-size="10" fill="#ec4899" font-weight="bold" text-anchor="middle">6</text>
  <text x="140" y="74" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">In Magic Squares, Sudoku and Mathematical puzzles</text>
</svg>`;

const svgWhen = `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M 90 40 Q 140 0 190 40" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="140" y="48" font-size="26" font-weight="800" fill="#a855f7" text-anchor="middle" letter-spacing="8">12321</text>
  <text x="140" y="76" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">When numbers read the same forwards and backwards (Palindromes)</text>
</svg>`;

const svgHow = `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="80" y="15" width="30" height="30" rx="4" fill="#0369a1" opacity="0.9"/>
    <text x="95" y="35" fill="#fff" font-weight="bold" font-size="14" text-anchor="middle">9</text>
    <rect x="120" y="15" width="30" height="30" rx="4" fill="#0369a1" opacity="0.6"/>
    <text x="135" y="35" fill="#fff" font-weight="bold" font-size="14" text-anchor="middle">5</text>
    <rect x="160" y="15" width="30" height="30" rx="4" fill="#0369a1" opacity="0.3"/>
    <text x="175" y="35" fill="#fff" font-weight="bold" font-size="14" text-anchor="middle">2</text>
    <path d="M 115 55 L 155 55 L 135 50 Z" fill="#0369a1"/>
    <text x="140" y="74" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">By sorting, reversing, adding, and subtracting digits</text>
</svg>`;

export const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Number Play?',
        icon: '🎲',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        svg: svgWhat,
        content: `Number play is the exciting exploration of patterns, properties, and hidden structures within numbers. It bridges the gap between basic arithmetic and deep mathematical reasoning through puzzles, sequences, and clever manipulations.`,
        fact: '💡 Every number has its own unique personality and hidden properties waiting to be discovered!',
    },
    {
        q: 'WHY',
        label: 'Why study number properties?',
        icon: '🧠',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        svg: svgWhy,
        content: `Numbers are the fundamental vocabulary of our universe. Recognizing their properties isn't just a party trick; it's the foundation of cryptography (keeping your data secure), advanced algorithms, and developing critical analytical thinking.`,
        fact: '💡 Prime numbers are actually the "locks" used to keep internet transactions secure!',
    },
    {
        q: 'WHO',
        label: 'Who pioneered these explorations?',
        icon: '👨‍🏫',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        svg: svgWho,
        content: `Many numbers or sequences are named after the mathematicians who first identified them. For instance, the constant $6174$ is named after the Indian mathematician **D. R. Kaprekar**, who famously discovered its magical loop properties in 1949.`,
        fact: '💡 Srinivasa Ramanujan was another legendary figure who could see patterns in numbers that no one else could!',
    },
    {
        q: 'WHERE',
        label: 'Where are they found?',
        icon: '🧩',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        svg: svgWhere,
        content: `Number patterns appear everywhere! You'll see them in the petals of a sunflower (Fibonacci), in ancient Magic Squares where rows and columns sum to the same amount, and in popular modern brain games like Sudoku and KenKen.`,
        fact: '💡 The very first Magic Square "Lo Shu" was discovered in China over 4000 years ago!',
    },
    {
        q: 'WHEN',
        label: 'When is a number special?',
        icon: '🔄',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        svg: svgWhen,
        content: `A number becomes 'special' when it possesses a rare property. For example, when a number reads the exact same forwards and backwards (like $1331$ or $12321$), it is called a **Palindromic Number**.`,
        fact: '💡 Some dates are palindromic too, like 12/02/2021 !',
    },
    {
        q: 'HOW',
        label: 'How do we play with digits?',
        icon: '🧮',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        svg: svgHow,
        content: `We play with numbers by treating their individual digits as movable parts. By reversing them, sorting them in descending or ascending order, finding their differences, or repeating an operation, we uncover magical constants and cyclic loops!`,
        fact: '💡 A simple trick involves taking any four-digit number, sorting its digits high-to-low and low-to-high, and subtracting! Try it!',
    },
];
