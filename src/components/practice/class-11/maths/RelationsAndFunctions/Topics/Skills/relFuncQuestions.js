// RelationsAndFunctions — Dynamic Question Generators
// Each export is a FUNCTION that returns a fresh array of 10 questions with randomized numbers.

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function makeQ(question, correctVal, distractors, explanation) {
    const opts = [String(correctVal)];
    for (const d of distractors) {
        const s = String(d);
        if (!opts.includes(s)) opts.push(s);
    }
    let fallbackCounter = 1;
    while (opts.length < 4) {
        let fallbackStr;
        const numVal = Number(correctVal);
        if (!isNaN(numVal)) {
            fallbackStr = String(numVal + fallbackCounter * 3 + 1);
        } else {
            fallbackStr = `Option ${String.fromCharCode(64 + opts.length + 1)}`;
        }
        if (!opts.includes(fallbackStr)) opts.push(fallbackStr);
        fallbackCounter++;
    }
    const final = opts.slice(0, 4);
    const shuffled = [...final];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return { question, options: shuffled, correct: shuffled.indexOf(final[0]), explanation };
}

// ─── SKILL 1: ORDERED PAIRS & CARTESIAN PRODUCT ─────────────────────────
export function generateCartesianQuestions() {
    const qs = [];
    // Easy: Q1-3
    for (let i = 0; i < 3; i++) {
        const a = R(1, 5), b = R(1, 5);
        if (i === 0) {
            qs.push(makeQ(
                `If $(x + 2, y - 1) = (${a + 2}, ${b - 1})$, find $x$.`,
                `$${a}$`, [`$${a + 1}$`, `$${a - 1}$`, `$${a + 2}$`],
                `$x + 2 = ${a + 2}$, so $x = ${a}$.`
            ));
        } else if (i === 1) {
            qs.push(makeQ(
                `Is $(2, 3) = (3, 2)$?`,
                'No, order matters in ordered pairs',
                ['Yes, they are equal', 'Only if both are positive', 'Cannot determine'],
                'In an ordered pair, the first and second elements are distinguished. $(2,3) \\neq (3,2)$.'
            ));
        } else {
            const x = R(1, 7), y = R(1, 7);
            qs.push(makeQ(
                `If $(a, b) = (${x}, ${y})$, find $a + b$.`,
                `$${x + y}$`, [`$${x * y}$`, `$${x - y}$`, `$${x + y + 1}$`],
                `$a = ${x}$ and $b = ${y}$, so $a + b = ${x + y}$.`
            ));
        }
    }
    // Medium: Q4-6
    for (let i = 0; i < 3; i++) {
        if (i === 0) {
            const nA = R(2, 4), nB = R(2, 4);
            qs.push(makeQ(
                `If $A$ has ${nA} elements and $B$ has ${nB} elements, find $n(A \\times B)$.`,
                `$${nA * nB}$`, [`$${nA + nB}$`, `$${nA * nB + 1}$`, `$${nA * nB - 1}$`],
                `$n(A \\times B) = n(A) \\times n(B) = ${nA} \\times ${nB} = ${nA * nB}$.`
            ));
        } else if (i === 1) {
            qs.push(makeQ(
                `If $A = \\{1, 2\\}$ and $B = \\{3, 4\\}$, which pair is NOT in $A \\times B$?`,
                '$(3, 1)$', ['$(1, 3)$', '$(2, 4)$', '$(1, 4)$'],
                '$A \\times B = \\{(1,3),(1,4),(2,3),(2,4)\\}$. $(3,1)$ is in $B \\times A$, not $A \\times B$.'
            ));
        } else {
            qs.push(makeQ(
                'Is $A \\times B = B \\times A$ in general?',
                'No, $A \\times B \\neq B \\times A$',
                ['Yes, always', 'Only when $A = B$', 'Only for finite sets'],
                '$A \\times B \\neq B \\times A$ unless $A = B$ or one is empty.'
            ));
        }
    }
    // Hard: Q7-10
    const hardConcepts = [
        makeQ('If $A = \\emptyset$, what is $A \\times B$?', '$\\emptyset$', ['$B$', '$\\{\\emptyset\\}$', 'Undefined'], 'Cartesian product with empty set is always empty.'),
        () => { const nAB = R(8, 20); const nA = R(2, 4); const nB = nAB / nA; return Number.isInteger(nB) ? makeQ(`If $A \\times B$ has ${nAB} elements and $n(A) = ${nA}$, find $n(B)$.`, `$${nB}$`, [`$${nA}$`, `$${nAB}$`, `$${nB + 1}$`], `$n(B) = ${nAB} / ${nA} = ${nB}$.`) : makeQ('If $n(A \\times B) = 12$ and $n(A) = 3$, find $n(B)$.', '$4$', ['$3$', '$12$', '$9$'], '$n(B) = 12/3 = 4$.'); },
        makeQ('$A \\times (B \\cap C)$ equals:', '$(A \\times B) \\cap (A \\times C)$', ['$(A \\times B) \\cup (A \\times C)$', '$A \\times B \\times C$', '$(A \\cap B) \\times C$'], 'Cartesian product distributes over intersection.'),
        makeQ('$A \\times (B \\cup C)$ equals:', '$(A \\times B) \\cup (A \\times C)$', ['$(A \\times B) \\cap (A \\times C)$', '$A \\times B \\times C$', '$(A \\cup B) \\times C$'], 'Cartesian product distributes over union.'),
    ];
    for (let i = 0; i < 4; i++) {
        const c = hardConcepts[i];
        qs.push(typeof c === 'function' ? c() : c);
    }
    return qs;
}

export function generateCartesianAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const a = R(1, 6), b = R(1, 6);
            if (i === 0) {
                qs.push(makeQ(`If $(2a, b + 3) = (${2 * a}, ${b + 3})$, find $a$.`, `$${a}$`, [`$${2 * a}$`, `$${a + 1}$`, `$${a - 1}$`], `$2a = ${2 * a}$ gives $a = ${a}$.`));
            } else if (i === 1) {
                const nA = R(2, 5), nB = R(2, 5);
                qs.push(makeQ(`$n(A) = ${nA}$, $n(B) = ${nB}$. Find $n(A \\times B) + n(B \\times A)$.`, `$${2 * nA * nB}$`, [`$${nA * nB}$`, `$${nA + nB}$`, `$${nA * nB + nA}$`], `Both $n(A \\times B)$ and $n(B \\times A) = ${nA * nB}$. Sum $= ${2 * nA * nB}$.`));
            } else {
                qs.push(makeQ(`If $(x - 1, y + 2) = (${a - 1}, ${b + 2})$, find $x + y$.`, `$${a + b}$`, [`$${a - b}$`, `$${a * b}$`, `$${a + b + 1}$`], `$x = ${a}$, $y = ${b}$. Sum $= ${a + b}$.`));
            }
        } else {
            const concepts = [
                makeQ('$A \\times B$ is a set of:', 'Ordered pairs', ['Numbers', 'Subsets', 'Unordered pairs'], '$A \\times B$ consists of all ordered pairs $(a, b)$.'),
                () => { const n = R(2, 5); return makeQ(`If $A = B$ and $n(A) = ${n}$, find $n(A \\times A)$.`, `$${n * n}$`, [`$${2 * n}$`, `$${n}$`, `$${n * n + n}$`], `$n(A \\times A) = ${n}^2 = ${n * n}$.`); },
                makeQ('Two ordered pairs $(a, b)$ and $(c, d)$ are equal iff:', '$a = c$ and $b = d$', ['$a + b = c + d$', '$a = d$ and $b = c$', '$a \\cdot b = c \\cdot d$'], 'Equality of ordered pairs requires both components to be equal.'),
                makeQ('If $A \\subseteq B$, then $A \\times A$ is a subset of:', '$B \\times B$', ['$A \\times B$ only', '$B \\times A$ only', 'Neither'], '$A \\subseteq B \\implies A \\times A \\subseteq B \\times B$.'),
                makeQ('$\\{1\\} \\times \\{2, 3\\}$ equals:', '$\\{(1,2), (1,3)\\}$', ['$\\{(2,1), (3,1)\\}$', '$\\{1, 2, 3\\}$', '$\\{(1,2,3)\\}$'], 'Each element of the first set pairs with each element of the second.'),
                makeQ('The Cartesian product is named after:', 'René Descartes', ['Isaac Newton', 'Leonhard Euler', 'Carl Gauss'], 'Named after the French mathematician René Descartes.'),
                () => { const nA = R(2, 4), nB = R(2, 4); const pairsInR = nA * nB; return makeQ(`If $n(A) = ${nA}$, $n(B) = ${nB}$, number of subsets of $A \\times B$ is:`, `$2^{${pairsInR}}$`, [`$${pairsInR}$`, `$2^{${nA}} \\times 2^{${nB}}$`, `$${nA + nB}$`], `$A \\times B$ has ${pairsInR} elements, so it has $2^{${pairsInR}}$ subsets.`); },
            ];
            const c = concepts[i - 3];
            qs.push(typeof c === 'function' ? c() : c);
        }
    }
    return qs;
}

// ─── SKILL 2: RELATIONS & REPRESENTATIONS ────────────────────────────────
export function generateRelationsQuestions() {
    const qs = [];
    // Easy
    qs.push(makeQ('A relation from set $A$ to set $B$ is a subset of:', '$A \\times B$', ['$A \\cup B$', '$A \\cap B$', '$B \\times A$'], 'By definition, a relation $R$ from $A$ to $B$ is $R \\subseteq A \\times B$.'));
    qs.push(makeQ('For $R = \\{(1,2), (2,3), (3,4)\\}$, the domain is:', '$\\{1, 2, 3\\}$', ['$\\{2, 3, 4\\}$', '$\\{1, 2, 3, 4\\}$', '$\\{1, 4\\}$'], 'Domain = set of all first elements = $\\{1, 2, 3\\}$.'));
    qs.push(makeQ('For $R = \\{(1,2), (2,3), (3,4)\\}$, the range is:', '$\\{2, 3, 4\\}$', ['$\\{1, 2, 3\\}$', '$\\{1, 2, 3, 4\\}$', '$\\{1, 4\\}$'], 'Range = set of all second elements = $\\{2, 3, 4\\}$.'));
    // Medium
    qs.push(makeQ('If $R = \\{(x, y) : y = x + 1, x \\in \\{1,2,3\\}\\}$, then $R$ in roster form is:', '$\\{(1,2), (2,3), (3,4)\\}$', ['$\\{(2,1), (3,2), (4,3)\\}$', '$\\{(1,1), (2,2), (3,3)\\}$', '$\\{1, 2, 3, 4\\}$'], 'Substitute: $x = 1 \\to y = 2$, $x = 2 \\to y = 3$, $x = 3 \\to y = 4$.'));
    qs.push(makeQ('An arrow diagram represents a relation using:', 'Arrows from elements of $A$ to elements of $B$', ['A number line', 'A bar graph', 'A Venn diagram only'], 'Arrow diagrams show which elements are related by drawing arrows.'));
    qs.push(makeQ('The codomain of a relation from $A$ to $B$ is:', 'The entire set $B$', ['Only the range', 'The domain', '$A \\cup B$'], 'Codomain is the full set $B$, while range is the subset of $B$ that is actually mapped to.'));
    // Hard
    qs.push(makeQ('Range is always a subset of:', 'Codomain', ['Domain', '$A \\times B$', 'The universal set'], 'Range $\\subseteq$ Codomain, since range only includes elements that are actually mapped to.'));
    qs.push(makeQ('A relation from $A$ to $A$ is called:', 'A relation on $A$', ['An identity relation', 'A function', 'An equivalence relation'], 'When domain and codomain are the same set, we say "relation on $A$".'));
    qs.push(makeQ('$R = \\{(x,y) : x$ divides $y, x \\in \\{2,3\\}, y \\in \\{4,6,9\\}\\}$ in roster form is:', '$\\{(2,4), (2,6), (3,6), (3,9)\\}$', ['$\\{(2,4), (3,9)\\}$', ['$\\{(4,2), (6,3), (9,3)\\}$'], '$\\{(2,9), (3,4)\\}$'], '$2|4, 2|6, 3|6, 3|9$. So $R = \\{(2,4),(2,6),(3,6),(3,9)\\}$.'));
    qs.push(makeQ('The empty relation from $A$ to $B$ is:', '$\\emptyset$ (no pairs)', ['$A \\times B$', 'Undefined', '$\\{(a,b)\\}$ for some $a,b$'], 'The empty relation contains no ordered pairs.'));
    return qs;
}

export function generateRelationsAssessment() {
    const qs = [];
    qs.push(makeQ('Every relation is a subset of a:', 'Cartesian product', ['Union', 'Intersection', 'Power set'], 'A relation $R: A \\to B$ is a subset of $A \\times B$.'));
    qs.push(makeQ('If $R = \\{(a,1),(b,2),(c,3)\\}$, the domain of $R$ is:', '$\\{a, b, c\\}$', ['$\\{1, 2, 3\\}$', '$\\{a,b,c,1,2,3\\}$', '$\\{(a,1)\\}$'], 'Domain = first elements = $\\{a, b, c\\}$.'));
    const nA = R(2, 4), nB = R(2, 4); const total = nA * nB;
    qs.push(makeQ(`If $n(A) = ${nA}$ and $n(B) = ${nB}$, how many relations are possible from $A$ to $B$?`, `$2^{${total}}$`, [`$${total}$`, `$${nA + nB}$`, `$2^{${nA}} \\times 2^{${nB}}$`], `$A \\times B$ has ${total} elements. Number of subsets = $2^{${total}}$.`));
    qs.push(makeQ('Range $\\subseteq$ Codomain. Is the converse true?', 'No, codomain can be larger than range', ['Yes, always', 'Only for functions', 'Only for finite sets'], 'Codomain is the full target set; range is what is actually mapped to.'));
    qs.push(makeQ('Roster form of $R = \\{(x,y) : y = x^2, x \\in \\{1,2,3\\}\\}$ is:', '$\\{(1,1), (2,4), (3,9)\\}$', ['$\\{(1,2), (2,4), (3,6)\\}$', '$\\{1, 4, 9\\}$', '$\\{(1,1), (4,2), (9,3)\\}$'], '$1^2=1, 2^2=4, 3^2=9$.'));
    qs.push(makeQ('Set-builder form for $R = \\{(1,2),(2,4),(3,6)\\}$ could be:', '$\\{(x,y) : y = 2x, x \\in \\{1,2,3\\}\\}$', ['$\\{(x,y) : y = x+1\\}$', '$\\{(x,y) : y = x^2\\}$', '$\\{(x,y) : x = 2y\\}$'], '$2 = 2(1), 4 = 2(2), 6 = 2(3)$. Rule: $y = 2x$.'));
    qs.push(makeQ('The universal relation from $A$ to $B$ is:', '$A \\times B$ itself', ['$\\emptyset$', 'The identity relation', '$A \\cup B$'], 'The universal relation contains all possible ordered pairs.'));
    qs.push(makeQ('If codomain $= \\{1,2,3,4,5\\}$ and range $= \\{2,4\\}$, which elements are NOT in the range?', '$\\{1, 3, 5\\}$', ['$\\{2, 4\\}$', '$\\{1, 2, 3, 4, 5\\}$', 'None'], 'Range is a subset of codomain. Elements $1, 3, 5$ are in codomain but not mapped to.'));
    qs.push(makeQ('A relation can be represented in how many ways?', 'Three: roster, set-builder, arrow diagram', ['Only roster form', 'Only set-builder', 'Two ways'], 'Relations have three standard representations.'));
    qs.push(makeQ('If $A = \\{1\\}$ and $B = \\{2\\}$, total number of relations from $A$ to $B$:', '$2$', ['$1$', '$4$', '$0$'], '$A \\times B = \\{(1,2)\\}$ has 1 element. Subsets: $\\emptyset$ and $\\{(1,2)\\}$ = 2 relations.'));
    return qs;
}

// ─── SKILL 3: NUMBER OF RELATIONS ────────────────────────────────────────
export function generateCountingRelationsQuestions() {
    const qs = [];
    // Easy
    for (let i = 0; i < 3; i++) {
        const nA = R(1, 3), nB = R(1, 3); const prod = nA * nB;
        qs.push(makeQ(
            `If $n(A) = ${nA}$ and $n(B) = ${nB}$, find the total number of relations from $A$ to $B$.`,
            `$2^{${prod}}$`, [`$${prod}$`, `$2^{${nA + nB}}$`, `$${Math.pow(2, prod) + 1}$`],
            `$n(A \\times B) = ${prod}$. Total relations = $2^{${prod}}$.`
        ));
    }
    // Medium
    qs.push(makeQ('If $A \\times B$ has 4 elements, find total relations.', '$2^4 = 16$', ['$4$', '$8$', '$2^3 = 8$'], 'Total relations = $2^{n(A \\times B)} = 2^4 = 16$.'));
    qs.push(makeQ('Total number of relations from $A$ to $A$ (relation ON $A$) if $n(A) = 2$:', '$2^4 = 16$', ['$4$', '$2^2 = 4$', '$8$'], '$n(A \\times A) = 2^2 = 4$. Relations = $2^4 = 16$.'));
    qs.push(makeQ('Which is always true about the number of relations?', 'It is always a power of 2', ['It equals $n(A) \\times n(B)$', 'It is always even', 'It equals $n(A) + n(B)$'], 'Number of relations = $2^{n(A \\times B)}$, always a power of 2.'));
    // Hard
    qs.push(makeQ('The empty set $\\emptyset$ is a valid relation from $A$ to $B$:', 'True', ['False', 'Only if $A = \\emptyset$', 'Only if $B = \\emptyset$'], '$\\emptyset \\subseteq A \\times B$ is always true, so the empty relation is valid.'));
    qs.push(makeQ('$A \\times B$ itself is a valid relation from $A$ to $B$:', 'True (the universal relation)', ['False', 'Only if $A = B$', 'Only for finite sets'], '$A \\times B \\subseteq A \\times B$ is trivially true.'));
    qs.push(makeQ('If $n(A) = 3$ and $n(B) = 2$, how many non-empty relations exist?', '$2^6 - 1 = 63$', ['$64$', '$6$', '$62$'], 'Total = $2^6 = 64$. Non-empty = $64 - 1 = 63$.'));
    qs.push(makeQ('The number of reflexive relations on a set with $n$ elements is:', '$2^{n^2 - n}$', ['$2^{n^2}$', '$2^n$', '$n^2$'], 'Diagonal pairs are fixed. Remaining $n^2 - n$ pairs can be chosen freely.'));
    return qs;
}

export function generateCountingRelationsAssessment() {
    const qs = [];
    for (let i = 0; i < 3; i++) {
        const nA = R(2, 4), nB = R(2, 4); const prod = nA * nB;
        qs.push(makeQ(
            `$n(A) = ${nA}$, $n(B) = ${nB}$. Total subsets of $A \\times B$:`,
            `$2^{${prod}}$`, [`$${prod}$`, `$2^{${nA}}$`, `$${prod * 2}$`],
            `$|A \\times B| = ${prod}$. Power set size = $2^{${prod}}$.`
        ));
    }
    qs.push(makeQ('Number of symmetric relations on $\\{1,2\\}$:', '$8$', ['$4$', '$16$', '$6$'], 'Symmetric relations on $n$ elements: $2^{n(n+1)/2}$. For $n=2$: $2^3 = 8$.'));
    qs.push(makeQ('Every function from $A$ to $B$ is a relation from $A$ to $B$:', 'True', ['False', 'Only for bijections', 'Only for finite sets'], 'Functions are special relations where each input has exactly one output.'));
    qs.push(makeQ('The identity relation on $\\{1,2,3\\}$ is:', '$\\{(1,1), (2,2), (3,3)\\}$', ['$\\{(1,2), (2,3), (3,1)\\}$', '$\\{(1,1)\\}$', '$\\emptyset$'], 'Identity relation: every element is related to itself.'));
    qs.push(makeQ('If a relation $R$ on $A$ is both reflexive and symmetric, is it an equivalence relation?', 'No, it must also be transitive', ['Yes', 'Only for finite sets', 'Only if $A$ has 2 elements'], 'Equivalence requires reflexive + symmetric + transitive.'));
    qs.push(makeQ('Total number of relations from $\\emptyset$ to any set $B$:', '$1$ (only the empty relation)', ['$0$', '$n(B)$', 'Undefined'], '$\\emptyset \\times B = \\emptyset$. Only subset of $\\emptyset$ is $\\emptyset$. So 1 relation.'));
    qs.push(makeQ('If relation $R$ has 5 elements, number of subsets of $R$:', '$2^5 = 32$', ['$5$', '$10$', '$25$'], '$R$ is a set with 5 elements, so $2^5 = 32$ subsets.'));
    qs.push(makeQ('Number of relations on $\\{a\\}$ (singleton set):', '$2$ ($\\emptyset$ and $\\{(a,a)\\}$)', ['$1$', '$0$', '$4$'], '$\\{a\\} \\times \\{a\\} = \\{(a,a)\\}$. Subsets: $\\emptyset$ and $\\{(a,a)\\}$.'));
    return qs;
}

// ─── SKILL 4: FUNCTIONS IDENTIFICATION ───────────────────────────────────
export function generateFunctionsQuestions() {
    const qs = [];
    // Easy
    qs.push(makeQ('Is $\\{(1,2), (2,3), (2,4)\\}$ a function?', 'No, 2 maps to both 3 and 4', ['Yes', 'Only if domain is specified', 'Cannot determine'], 'A function requires each input to have exactly one output. Input 2 has two outputs.'));
    qs.push(makeQ('Is $\\{(1,2), (2,3), (3,4)\\}$ a function?', 'Yes, each input has exactly one output', ['No', 'Only for integers', 'Cannot determine'], 'Each element 1, 2, 3 maps to exactly one output.'));
    qs.push(makeQ('Why is $\\{(1,2), (1,3)\\}$ not a function?', 'Input 1 has two different outputs (2 and 3)', ['It has too few pairs', 'The range is wrong', 'It is a function'], 'A function cannot map one input to multiple outputs.'));
    // Medium
    qs.push(makeQ('For $f(x) = 2x$, find $f(5)$.', '$10$', ['$7$', '$25$', '$5$'], '$f(5) = 2 \\times 5 = 10$.'));
    qs.push(makeQ('For $f(x) = x^2$, find the range when domain is $\\{-2, -1, 0, 1, 2\\}$:', '$\\{0, 1, 4\\}$', ['$\\{-4, -1, 0, 1, 4\\}$', '$\\{0, 1, 2, 4\\}$', '$\\{4, 1, 0\\}$'], '$(-2)^2=4, (-1)^2=1, 0^2=0, 1^2=1, 2^2=4$. Range = $\\{0,1,4\\}$.'));
    qs.push(makeQ('Find the domain of $f(x) = \\frac{1}{x}$.', 'All real numbers except $0$', ['All real numbers', 'Only positive numbers', 'Only integers'], '$f(x) = 1/x$ is undefined at $x = 0$.'));
    // Hard
    qs.push(makeQ('The vertical line test states:', 'A graph is a function if every vertical line intersects it at most once', ['Vertical lines are always functions', 'Functions must pass through the origin', 'Graphs must be straight lines'], 'If any vertical line crosses the graph more than once, it is NOT a function.'));
    qs.push(makeQ('A function $f: A \\to B$ must satisfy:', 'Every element of $A$ has exactly one image in $B$', ['Every element of $B$ has a preimage', 'Range = Codomain', '$f$ is one-to-one'], 'The defining property: each input maps to exactly one output.'));
    qs.push(makeQ('Can two different inputs map to the same output in a function?', 'Yes (e.g., $f(x) = x^2$: $f(-2) = f(2) = 4$)', ['No', 'Only for constant functions', 'Only for linear functions'], 'Functions allow many-to-one mapping. Only one-to-one functions forbid this.'));
    qs.push(makeQ('If $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = 5$, this is a:', 'Constant function', ['Identity function', 'Polynomial function', 'Modulus function'], 'Output is always 5 regardless of input. This is a constant function.'));
    return qs;
}

export function generateFunctionsAssessment() {
    const qs = [];
    qs.push(makeQ('A function from $A$ to $B$ is a special type of:', 'Relation from $A$ to $B$', ['Subset of $A$', 'Subset of $B$', 'Cartesian product'], 'A function is a relation where each element of $A$ maps to exactly one element of $B$.'));
    const a = R(2, 5);
    qs.push(makeQ(`For $f(x) = 3x - 1$, find $f(${a})$.`, `$${3 * a - 1}$`, [`$${3 * a}$`, `$${3 * a + 1}$`, `$${2 * a - 1}$`], `$f(${a}) = 3(${a}) - 1 = ${3 * a - 1}$.`));
    qs.push(makeQ('Domain of $f(x) = \\sqrt{x}$ (real-valued) is:', '$[0, \\infty)$', ['$(-\\infty, \\infty)$', '$(0, \\infty)$', '$\\{0\\}$'], 'Square root requires non-negative input: $x \\geq 0$.'));
    qs.push(makeQ('Range of $f(x) = x^2$ for $f: \\mathbb{R} \\to \\mathbb{R}$ is:', '$[0, \\infty)$', ['$(-\\infty, \\infty)$', ['$\\mathbb{R}$'], '$(0, \\infty)$'], 'Squares are always non-negative.'));
    qs.push(makeQ('If $f(x) = |x|$, then $f(-7) =$:', '$7$', ['$-7$', '$0$', '$49$'], '$|-7| = 7$.'));
    qs.push(makeQ('The signum function $\\text{sgn}(x)$ for $x < 0$ equals:', '$-1$', ['$0$', '$1$', '$x$'], 'Signum: $-1$ for negative, $0$ for zero, $1$ for positive.'));
    qs.push(makeQ('Greatest integer function $[3.7] =$:', '$3$', ['$4$', '$3.7$', '$0$'], '$[3.7]$ = greatest integer $\\leq 3.7 = 3$.'));
    qs.push(makeQ('$[-1.2] =$:', '$-2$', ['$-1$', '$-1.2$', '$0$'], '$[-1.2]$ = greatest integer $\\leq -1.2 = -2$.'));
    qs.push(makeQ('Which is NOT a function?', '$\\{(1,2), (1,3), (2,4)\\}$', ['$f(x) = x$', '$f(x) = |x|$', '$f(x) = x^2$'], 'Input 1 maps to both 2 and 3. Violates function definition.'));
    qs.push(makeQ('A function where $f(x) = x$ for all $x$ is called:', 'Identity function', ['Constant function', 'Zero function', 'Modulus function'], 'The identity function maps every element to itself.'));
    return qs;
}

// ─── SKILL 5: SPECIAL FUNCTIONS ──────────────────────────────────────────
export function generateSpecialFunctionsQuestions() {
    const qs = [];
    // Easy - evaluate
    const val1 = R(1, 10);
    qs.push(makeQ(`Identity function: $f(x) = x$. Find $f(${val1})$.`, `$${val1}$`, [`$${val1 + 1}$`, `$0$`, `$${val1 * 2}$`], `$f(${val1}) = ${val1}$.`));
    qs.push(makeQ('Constant function: $f(x) = 3$. Find the range.', '$\\{3\\}$', ['$\\mathbb{R}$', '$\\{0, 3\\}$', '$[0, 3]$'], 'Output is always 3, so range = $\\{3\\}$.'));
    const neg = -R(1, 9);
    qs.push(makeQ(`Modulus function: $f(x) = |x|$. Find $f(${neg})$.`, `$${-neg}$`, [`$${neg}$`, `$0$`, `$${neg * neg}$`], `$|${neg}| = ${-neg}$.`));
    // Medium - graph behavior
    qs.push(makeQ('Graph of $f(x) = |x|$ is:', 'V-shaped, opening upward', ['A straight line', 'U-shaped (parabola)', 'Steps'], 'Modulus function creates a V-shape with vertex at origin.'));
    qs.push(makeQ('Graph of $f(x) = [x]$ (greatest integer) looks like:', 'Staircase steps', ['A straight line', 'V-shaped', 'A parabola'], 'The greatest integer function creates step-like discontinuities.'));
    qs.push(makeQ('Signum function: $\\text{sgn}(0) =$:', '$0$', ['$1$', '$-1$', 'Undefined'], 'By definition, $\\text{sgn}(0) = 0$.'));
    // Advanced
    qs.push(makeQ('Is $f(x) = x^2 + 2x + 1$ a polynomial function?', 'Yes (degree 2)', ['No', 'Only for integers', 'It is a rational function'], '$x^2 + 2x + 1$ is a polynomial of degree 2.'));
    const b = R(2, 5);
    qs.push(makeQ(`$f(x) = x^3 - x$. Find $f(${b})$.`, `$${b * b * b - b}$`, [`$${b * b * b}$`, `$${b * b - b}$`, `$${b * b * b + b}$`], `$f(${b}) = ${b}^3 - ${b} = ${b * b * b} - ${b} = ${b * b * b - b}$.`));
    qs.push(makeQ('Domain of rational function $f(x) = \\frac{1}{x - 2}$:', '$\\mathbb{R} \\setminus \\{2\\}$', ['$\\mathbb{R}$', '$\\mathbb{R} \\setminus \\{0\\}$', '$(2, \\infty)$'], 'Denominator $= 0$ when $x = 2$. So exclude $x = 2$.'));
    qs.push(makeQ('$[2.7] + [-2.7] =$:', '$2 + (-3) = -1$', ['$0$', ['$2 + (-2) = 0$'], '$5$'], '$[2.7] = 2$ and $[-2.7] = -3$. Sum $= -1$.'));
    return qs;
}

export function generateSpecialFunctionsAssessment() {
    const qs = [];
    const c = R(1, 10);
    qs.push(makeQ(`If $f(x) = ${c}$ for all $x$, the function is:`, 'Constant', ['Identity', 'Modulus', 'Signum'], `Output is always ${c}. This is a constant function.`));
    qs.push(makeQ('Domain and range of identity function $f(x) = x$ on $\\mathbb{R}$:', 'Domain $= \\mathbb{R}$, Range $= \\mathbb{R}$', ['Domain $= \\mathbb{R}^+$, Range $= \\mathbb{R}^+$', 'Domain $= \\{0\\}$, Range $= \\{0\\}$', 'Domain $= \\mathbb{R}$, Range $= \\{1\\}$'], 'Identity maps every real to itself.'));
    qs.push(makeQ('Range of modulus function $f(x) = |x|$:', '$[0, \\infty)$', ['$(-\\infty, \\infty)$', '$(0, \\infty)$', '$\\{0, 1\\}$'], 'Absolute value is always $\\geq 0$.'));
    qs.push(makeQ('Signum function can be written as piecewise:', '$\\text{sgn}(x) = \\begin{cases} 1, & x > 0 \\\\\\\\ 0, & x = 0 \\\\\\\\ -1, & x < 0 \\end{cases}$', ['$|x|/x$ for all $x$', '$x/|x|$ for all $x$', '$f(x) = x$'], 'The piecewise definition covers all three cases.'));
    qs.push(makeQ('$[4.0] =$:', '$4$', ['$3$', '$5$', '$0$'], '$4.0$ is already an integer, so $[4.0] = 4$.'));
    qs.push(makeQ('$[-0.5] =$:', '$-1$', ['$0$', '$-0.5$', '$1$'], 'Greatest integer $\\leq -0.5$ is $-1$.'));
    qs.push(makeQ('A function that maps $x$ to its absolute value is called:', 'Modulus function', ['Signum function', 'Floor function', 'Ceiling function'], '$f(x) = |x|$ is the modulus (absolute value) function.'));
    qs.push(makeQ('Degree of polynomial $f(x) = 5x^4 - 3x^2 + 7$ is:', '$4$', ['$2$', ['$5$'], '$7$'], 'Highest power of $x$ is 4.'));
    const v = R(1, 5);
    qs.push(makeQ(`$f(x) = \\frac{1}{x}$. Find $f(${v})$.`, `$\\frac{1}{${v}}$`, [`$${v}$`, `$${v * v}$`, `$-\\frac{1}{${v}}$`], `$f(${v}) = 1/${v}$.`));
    qs.push(makeQ('The graph of constant function $f(x) = c$ is:', 'A horizontal line', ['A vertical line', 'A parabola', 'A V-shape'], 'Constant function: same output for all inputs = horizontal line.'));
    return qs;
}

// ─── SKILL 6: ALGEBRA OF FUNCTIONS ───────────────────────────────────────
export function generateAlgebraOfFunctionsQuestions() {
    const qs = [];
    // Easy: add/subtract
    qs.push(makeQ('If $f(x) = x^2$ and $g(x) = 2x$, find $(f + g)(x)$.', '$x^2 + 2x$', ['$2x^3$', '$x^2 - 2x$', '$x^2 \\cdot 2x$'], '$(f + g)(x) = f(x) + g(x) = x^2 + 2x$.'));
    qs.push(makeQ('If $f(x) = x^2$ and $g(x) = 2x$, find $(f - g)(x)$.', '$x^2 - 2x$', ['$x^2 + 2x$', '$2x - x^2$', '$x^2 / 2x$'], '$(f - g)(x) = f(x) - g(x) = x^2 - 2x$.'));
    qs.push(makeQ('If $f(x) = 3x$ and $g(x) = x + 1$, find $(f + g)(2)$.', '$9$', ['$7$', '$8$', '$10$'], '$(f+g)(2) = f(2) + g(2) = 6 + 3 = 9$.'));
    // Medium: multiply/divide
    qs.push(makeQ('If $f(x) = x^2$ and $g(x) = 2x$, find $(fg)(x)$.', '$2x^3$', ['$x^2 + 2x$', '$x^2 - 2x$', '$x^2 / 2x$'], '$(fg)(x) = f(x) \\cdot g(x) = x^2 \\cdot 2x = 2x^3$.'));
    qs.push(makeQ('If $f(x) = x^2$ and $g(x) = 2x$, find $(f/g)(x)$.', '$x/2$ (for $x \\neq 0$)', ['$2x$', '$x^2 / 2$', '$x^2$'], '$(f/g)(x) = x^2 / (2x) = x/2$ when $x \\neq 0$.'));
    qs.push(makeQ('$(f/g)(x)$ is defined only when:', '$g(x) \\neq 0$', ['$f(x) \\neq 0$', ['$f(x) = g(x)$'], 'Always'], 'Division by zero is undefined, so $g(x)$ must not be zero.'));
    // Hard: domain restrictions
    qs.push(makeQ('Domain of $(f/g)(x)$ where $f(x) = x$ and $g(x) = x - 3$:', '$\\mathbb{R} \\setminus \\{3\\}$', ['$\\mathbb{R}$', ['$\\{3\\}$'], '$\\mathbb{R} \\setminus \\{0\\}$'], '$g(x) = 0$ when $x = 3$. So exclude $x = 3$.'));
    qs.push(makeQ('If $f(x) = x + 1$ and $g(x) = x^2$, find $(f \\cdot g)(3)$.', '$36$', ['$12$', '$10$', '$30$'], '$(f \\cdot g)(3) = f(3) \\cdot g(3) = 4 \\cdot 9 = 36$.'));
    qs.push(makeQ('Is $(f + g)(x) = (g + f)(x)$?', 'Yes, addition is commutative', ['No', 'Only for polynomials', 'Only when $f = g$'], '$f(x) + g(x) = g(x) + f(x)$ since addition of real numbers is commutative.'));
    qs.push(makeQ('$f(x) = \\sqrt{x}$, $g(x) = \\sqrt{4 - x}$. Domain of $(f + g)$:', '$[0, 4]$', ['$[0, \\infty)$', '$(-\\infty, 4]$', '$\\mathbb{R}$'], 'Need $x \\geq 0$ AND $4 - x \\geq 0$. So $0 \\leq x \\leq 4$.'));
    return qs;
}

export function generateAlgebraOfFunctionsAssessment() {
    const qs = [];
    const a1 = R(2, 5), a2 = R(2, 5);
    qs.push(makeQ(`$f(x) = ${a1}x$, $g(x) = ${a2}x$. Find $(f + g)(x)$.`, `$${a1 + a2}x$`, [`$${a1 * a2}x$`, `$${a1 - a2}x$`, `$${a1}x^2$`], `$(f+g)(x) = ${a1}x + ${a2}x = ${a1 + a2}x$.`));
    qs.push(makeQ('$f(x) = x^2 + 1$, $g(x) = x - 1$. Find $(f - g)(1)$.', '$1$', ['$0$', '$2$', '$-1$'], '$f(1) = 2, g(1) = 0. (f-g)(1) = 2 - 0 = 2$. Wait: $f(1)=1+1=2, g(1)=1-1=0, (f-g)(1)=2$.'));
    qs.push(makeQ('$(f \\cdot g)(x)$ for $f(x) = x + 2, g(x) = x - 2$ is:', '$x^2 - 4$', ['$x^2 + 4$', '$x^2 - 2$', '$2x$'], '$(x+2)(x-2) = x^2 - 4$.'));
    qs.push(makeQ('$f(x) = x^3$, $g(x) = x$. $(f/g)(x)$ for $x \\neq 0$:', '$x^2$', ['$x^3$', '$x$', '$1/x^2$'], '$x^3/x = x^2$.'));
    qs.push(makeQ('Domain of $f + g$ is:', 'Domain of $f$ $\\cap$ Domain of $g$', ['Domain of $f$ $\\cup$ Domain of $g$', 'Domain of $f$ only', '$\\mathbb{R}$'], 'Both functions must be defined, so take the intersection of their domains.'));
    qs.push(makeQ('If $f(x) = 2x + 1$ and $g(x) = x^2$, find $(g - f)(2)$.', '$4 - 5 = -1$', ['$5$', '$1$', '$0$'], '$g(2) = 4, f(2) = 5. (g-f)(2) = 4-5 = -1$.'));
    qs.push(makeQ('Is $(f \\cdot g)(x) = (g \\cdot f)(x)$?', 'Yes, multiplication is commutative', ['No', 'Only for polynomials', 'Only when $f = g$'], 'Multiplication of real numbers is commutative.'));
    qs.push(makeQ('$(f/g)(x)$ where $f(x) = 6x^2$ and $g(x) = 3x$, for $x \\neq 0$:', '$2x$', ['$2x^2$', '$3x$', '$18x^3$'], '$6x^2 / 3x = 2x$.'));
    qs.push(makeQ('If $f(x) = x$ and $g(x) = 1/x$, then $(f \\cdot g)(x)$ for $x \\neq 0$:', '$1$', ['$x$', '$1/x$', '$x^2$'], '$x \\cdot (1/x) = 1$.'));
    qs.push(makeQ('$(f + g)(x) - (f - g)(x)$ simplifies to:', '$2g(x)$', ['$2f(x)$', '$0$', '$f(x) + g(x)$'], '$(f+g) - (f-g) = f+g-f+g = 2g$.'));
    return qs;
}
