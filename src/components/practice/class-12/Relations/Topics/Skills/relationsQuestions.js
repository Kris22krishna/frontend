// relationsQuestions.js

/**
 * Helper to shuffle an array
 */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILL 1: Cartesian Products
// Based on: "If A = {1, 2, 3}, B = {x, y} then A x B ="
// ─────────────────────────────────────────────────────────────────────────────
export const generateCartesianQuestions = (count = 5) => {
    const questions = [];

    const templates = [
        { A: "\\{1, 2, 3\\}", B: "\\{x, y\\}", ans: "\\{(1, x), (1, y), (2, x), (2, y), (3, x), (3, y)\\}" },
        { A: "\\{a, b\\}", B: "\\{1, 2\\}", ans: "\\{(a, 1), (a, 2), (b, 1), (b, 2)\\}" },
        { A: "\\{0, 1\\}", B: "\\{c, d\\}", ans: "\\{(0, c), (0, d), (1, c), (1, d)\\}" },
        { A: "\\{x, y\\}", B: "\\{x, y\\}", ans: "\\{(x, x), (x, y), (y, x), (y, y)\\}" },
        { A: "\\{1\\}", B: "\\{a, b, c\\}", ans: "\\{(1, a), (1, b), (1, c)\\}" },
    ];

    for (let i = 0; i < count; i++) {
        const t = templates[i % templates.length];

        // Generate dummy options
        const dummy1 = t.ans.replace(/x/g, 'z').replace(/1/g, '4');
        const dummy2 = t.ans.replace(/\(/g, '[').replace(/\)/g, ']');
        const dummy3 = "\\emptyset";

        const options = shuffleArray([t.ans, dummy1, dummy2, dummy3]);
        const correctIdx = options.indexOf(t.ans);

        questions.push({
            question: `If $A = ${t.A}$ and $B = ${t.B}$, what is $A \\times B$?`,
            options: options.map(o => `$${o}$`),
            correct: correctIdx,
            explanation: "Cartesian product $A \\times B$ pairs every element of $A$ with every element of $B$ in order $(a, b)$."
        });
    }
    return questions;
};
export const generateCartesianAssessment = () => generateCartesianQuestions(10);

// ─────────────────────────────────────────────────────────────────────────────
// SKILL 2: Number of Relations
// Based on: "n(A x B) = 15, n(A) = 3, then n(B) ="
// Based on: "Number of subsets having 3 or more elements"
// ─────────────────────────────────────────────────────────────────────────────
export const generateCountingQuestions = (count = 5) => {
    const questions = [];

    for (let i = 0; i < count; i++) {
        const type = Math.random();

        if (type < 0.33) {
            // Find n(B) given n(A x B) and n(A)
            const nA = Math.floor(Math.random() * 5) + 2; // 2 to 6
            const nB = Math.floor(Math.random() * 5) + 2; // 2 to 6
            const nAxB = nA * nB;

            const options = shuffleArray([nB, nB + 1, nB * 2, nA + nB]);
            const correctIdx = options.indexOf(nB);

            questions.push({
                question: `If $n(A \\times B) = ${nAxB}$ and $n(A) = ${nA}$, what is $n(B)$?`,
                options: options.map(o => `$${o}$`),
                correct: correctIdx,
                explanation: "$n(A \\times B) = n(A) \\times n(B)$. Therefore, $n(B) = \\frac{n(A \\times B)}{n(A)} = \\frac{" + nAxB + "}{" + nA + "} = " + nB + "$."
            });
        } else if (type < 0.66) {
            // Total relations 2^(mn)
            const nA = Math.floor(Math.random() * 3) + 2;
            const nB = Math.floor(Math.random() * 3) + 2;
            const ans = Math.pow(2, nA * nB);

            const options = shuffleArray([ans, nA * nB, Math.pow(2, nA + nB), ans / 2]);
            const correctIdx = options.indexOf(ans);

            questions.push({
                question: `If $A$ has ${nA} elements and $B$ has ${nB} elements, what is the total number of relations from $A$ to $B$?`,
                options: options.map(o => `$${o}$`),
                correct: correctIdx,
                explanation: `Total relations = $2^{n(A) \\times n(B)} = 2^{${nA} \\times ${nB}} = 2^{${nA * nB}} = ${ans}$.`
            });
        } else {
            // Reflexive relations 2^(n(n-1))
            const nA = Math.floor(Math.random() * 3) + 3; // 3 to 5
            const ans = Math.pow(2, nA * (nA - 1));

            const options = shuffleArray([ans, Math.pow(2, nA * nA), Math.pow(2, nA), ans * 2]);
            const correctIdx = options.indexOf(ans);

            questions.push({
                question: `If a set $A$ has ${nA} elements, how many reflexive relations can be defined on $A$?`,
                options: options.map(o => `$${o}$`),
                correct: correctIdx,
                explanation: `The formula for the number of reflexive relations on a set with $n$ elements is $2^{n(n-1)}$. Here $n=${nA}$, so $2^{${nA}(${nA - 1})} = 2^{${nA * (nA - 1)}} = ${ans}$.`
            });
        }
    }
    return questions;
};
export const generateCountingAssessment = () => generateCountingQuestions(10);

// ─────────────────────────────────────────────────────────────────────────────
// SKILL 3: Domain and Range
// Based on: "R = {(x, y) : x, y in N, 2x + y = 10}, then range of R is"
// ─────────────────────────────────────────────────────────────────────────────
export const generateDomainRangeQuestions = (count = 5) => {
    const questions = [];

    for (let i = 0; i < count; i++) {
        // Equation: ax + y = c, x, y in N
        const a = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const c = Math.floor(Math.random() * 5) + 10; // 10 to 14

        // calculate valid pairs
        const pairs = [];
        const range = [];
        const domain = [];

        for (let x = 1; x < c; x++) {
            const y = c - a * x;
            if (y > 0) {
                pairs.push(`(${x}, ${y})`);
                domain.push(x);
                range.push(y);
            }
        }

        // Ask for range
        const ansStr = "\\{" + range.join(", ") + "\\}";
        const dummy1 = "\\{" + domain.join(", ") + "\\}"; // Domain instead of range
        const dummy2 = "\\{" + range.map(y => y + 1).join(", ") + "\\}";
        const dummy3 = "\\{" + range.map(y => y - 1).join(", ") + "\\}";

        // Ensure uniqueness
        const validDummies = [dummy1, dummy2, dummy3].filter(d => d !== ansStr);
        while (validDummies.length < 3) validDummies.push(`\\{${Math.floor(Math.random() * 10)}, ${Math.floor(Math.random() * 10)}\\}`);

        const options = shuffleArray([ansStr, validDummies[0], validDummies[1], validDummies[2]]);
        const correctIdx = options.indexOf(ansStr);

        questions.push({
            question: `Let relation $R$ on $\\mathbb{N}$ be defined as $R = \\{(x, y) : ${a}x + y = ${c}\\}$. What is the Range of $R$?`,
            options: options.map(o => `$${o}$`),
            correct: correctIdx,
            explanation: `Test $x \\in \\mathbb{N}$ (starting from 1). The valid ordered pairs are $\\{${pairs.join(", ")}\\}$. The Range is the set of $y$-values: $${ansStr}$.`
        });
    }

    return questions;
};
export const generateDomainRangeAssessment = () => generateDomainRangeQuestions(10);

// ─────────────────────────────────────────────────────────────────────────────
// SKILL 4: Reflexive, Symmetric, Transitive (Equivalence)
// Based on: "Let A = {1, 2, 3}. Define relation R... then R is"
// ─────────────────────────────────────────────────────────────────────────────
export const generateEquivalenceQuestions = (count = 5) => {
    const questions = [];

    const scenarios = [
        {
            desc: "$R = \\{(1,1), (2,2), (3,3), (1,2), (2,1)\\}$ on $A = \\{1, 2, 3\\}$",
            ans: "Reflexive and Symmetric, but not Transitive", // actually it IS transitive if no (2,3) etc., let's use a clear one
            isClear: false
        },
        {
            desc: "$R = \\{(1,1), (2,2), (3,3), (1,2), (2,3), (1,3)\\}$ on $A = \\{1, 2, 3\\}$",
            ans: "Reflexive and Transitive, but not Symmetric",
            isClear: true
        },
        {
            desc: "$R = \\{(1,2), (2,1)\\}$ on $A = \\{1, 2, 3\\}$",
            ans: "Symmetric only",
            isClear: true
        },
        {
            desc: "$R = \\{(1,1), (2,2), (3,3)\\}$ on $A = \\{1, 2, 3\\}$",
            ans: "Equivalence Relation",
            isClear: true
        },
        {
            desc: "$aRb \\iff |a-b| \\leq 1$ on real numbers",
            ans: "Reflexive and Symmetric, but not Transitive",
            isClear: true
        }
    ].filter(s => s.isClear);

    for (let i = 0; i < count; i++) {
        const s = scenarios[i % scenarios.length];

        const options = shuffleArray([
            s.ans,
            "Equivalence Relation" === s.ans ? "Symmetric only" : "Equivalence Relation",
            "Reflexive and Symmetric, but not Transitive" === s.ans ? "Transitive only" : "Reflexive and Symmetric, but not Transitive",
            "Reflexive and Transitive, but not Symmetric" === s.ans ? "Neither Reflexive nor Symmetric" : "Reflexive and Transitive, but not Symmetric"
        ]);
        // Deduplicate
        const uniqueOptions = [...new Set(options)];
        while (uniqueOptions.length < 4) uniqueOptions.push(`Option ${uniqueOptions.length + 1}`);

        const finalOptions = shuffleArray(uniqueOptions.slice(0, 4));
        if (!finalOptions.includes(s.ans)) {
            finalOptions[0] = s.ans;
        }
        const shuffledFinal = shuffleArray(finalOptions);
        const correctIdx = shuffledFinal.indexOf(s.ans);

        questions.push({
            question: `Consider the relation: ${s.desc}. Which of the following is true?`,
            options: shuffledFinal,
            correct: correctIdx,
            explanation: "Test the three properties: Reflexive requires $(x,x)$, Symmetric requires $(y,x)$ for every $(x,y)$, Transitive requires $(x,z)$ for every $(x,y)$ and $(y,z)$."
        });
    }
    return questions;
};
export const generateEquivalenceAssessment = () => generateEquivalenceQuestions(10);
