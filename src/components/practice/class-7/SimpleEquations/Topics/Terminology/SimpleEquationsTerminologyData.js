// ─── TERMINOLOGY DATA WITH DIAGRAMS ─────────────────────────────────────────

export const TERMS = [
    {
        name: 'Variable',
        color: '#6366f1',
        icon: '🔤',
        def: 'A letter or symbol used to represent an unknown value that can change or vary.',
        examples: ['$x$, $y$, $z$', '$a, b, c$'],
        inUse: 'In $4x + 5$, $x$ is the variable.',
        memory: 'VARY-able = it can VARY or change its value!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="40" width="80" height="80" rx="10" fill="rgba(99,102,241,0.1)" stroke="#6366f1" stroke-width="2"/><text x="100" y="95" text-anchor="middle" fill="#6366f1" font-size="40" font-weight="700" font-style="italic">x</text><text x="100" y="25" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="600">Unknown Value</text></svg>`
    },
    {
        name: 'Constant',
        color: '#10b981',
        icon: '🔢',
        def: 'A fixed number that does not change its value on its own.',
        examples: ['$5$, $-20$, $100$', '$\\pi$ (pi)'],
        inUse: 'In the expression $4x + 5$, the number $5$ is a constant.',
        memory: 'CONSTant = remains CONSTANT (unchanging).',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="80" r="40" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="2"/><text x="100" y="92" text-anchor="middle" fill="#10b981" font-size="32" font-weight="700">5</text><text x="100" y="25" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="600">Fixed Number</text></svg>`
    },
    {
        name: 'Expression',
        color: '#f59e0b',
        icon: '📝',
        def: 'A mathematical phrase containing numbers, variables, and operations, but NO equals sign.',
        examples: ['$4x + 5$', '$10y - 20$', '$m/2$'],
        inUse: 'When you "multiply a number by 4 and add 5", the expression is $4x + 5$.',
        memory: 'Think of an EXPRESSION like a phrase in English—it has no "verb" (no equals sign).',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><path d="M 40 80 L 160 80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 5"/><text x="100" y="75" text-anchor="middle" fill="#f59e0b" font-size="28" font-weight="700" font-style="italic">4x + 5</text><text x="100" y="115" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">No = sign here!</text></svg>`
    },
    {
        name: 'Equation',
        color: '#f43f5e',
        icon: '⚖️',
        def: 'A mathematical statement asserting that two expressions are exactly equal.',
        examples: ['$4x + 5 = 65$', '$10y - 20 = 50$'],
        inUse: 'The equation $x - 5 = 9$ tells us that some number minus 5 equals 9.',
        memory: 'EQUAtion has the word "EQUAL" built into it. It MUST have an "=" sign.',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="50" width="140" height="60" rx="8" fill="rgba(244,63,94,0.05)" stroke="#f43f5e" stroke-width="2"/><text x="65" y="88" text-anchor="middle" fill="#f43f5e" font-size="20" font-weight="700">4x+5</text><text x="100" y="88" text-anchor="middle" fill="#f43f5e" font-size="24" font-weight="800">=</text><text x="135" y="88" text-anchor="middle" fill="#f43f5e" font-size="20" font-weight="700">65</text><circle cx="100" cy="81" r="15" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4" /></svg>`
    },
    {
        name: 'LHS (Left Hand Side)',
        color: '#0891b2',
        icon: '👈',
        def: 'The expression located entirely on the left side of the equals sign in an equation.',
        examples: ['In $4x + 5 = 65$, LHS is $4x + 5$'],
        inUse: 'You check an answer by putting it back into the LHS and seeing if it matches the RHS.',
        memory: 'Literally the "Left Hand" side of the "=" sign.',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="60" width="70" height="40" fill="rgba(8,145,178,0.1)" stroke="#0891b2" stroke-width="2"/><text x="60" y="85" text-anchor="middle" fill="#0891b2" font-size="16" font-weight="700">4x+5</text><text x="120" y="85" text-anchor="middle" fill="#94a3b8" font-size="20" font-weight="700">= 65</text><text x="60" y="50" text-anchor="middle" fill="#0891b2" font-size="12" font-weight="700">LHS</text></svg>`
    },
    {
        name: 'RHS (Right Hand Side)',
        color: '#8b5cf6',
        icon: '👉',
        def: 'The expression located entirely on the right side of the equals sign in an equation.',
        examples: ['In $3n + 7 = 25$, RHS is $25$'],
        inUse: 'To balance an equation, operations done to LHS must also be done to RHS.',
        memory: 'Literally the "Right Hand" side of the "=" sign.',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><text x="60" y="85" text-anchor="middle" fill="#94a3b8" font-size="20" font-weight="700">4x+5 =</text><rect x="105" y="60" width="70" height="40" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" stroke-width="2"/><text x="140" y="85" text-anchor="middle" fill="#8b5cf6" font-size="16" font-weight="700">65</text><text x="140" y="50" text-anchor="middle" fill="#8b5cf6" font-size="12" font-weight="700">RHS</text></svg>`
    },
    {
        name: 'Transposition',
        color: '#ec4899',
        icon: '🔄',
        def: 'Moving a term from one side of an equation to the other by changing its sign (+ to -, or - to +).',
        examples: ['$x + 3 = 8 \\Rightarrow x = 8 - 3$', '$y - 4 = 7 \\Rightarrow y = 7 + 4$'],
        inUse: 'By transposition, shifting $+12$ to the RHS makes it $-12$.',
        memory: 'TRANSporting the term changes its POSITION and its SIGN.',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><text x="60" y="70" text-anchor="middle" fill="#334155" font-size="18" font-weight="700">x + 5 = 12</text><path d="M 80 80 C 80 120, 140 120, 140 80" fill="none" stroke="#ec4899" stroke-width="2" marker-end="url(#arrow)"/><defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ec4899" /></marker></defs><text x="110" y="130" text-anchor="middle" fill="#ec4899" font-size="14" font-weight="700">- 5</text></svg>`
    },
    {
        name: 'Solution (or Root)',
        color: '#059669',
        icon: '✅',
        def: 'The value of the variable that makes the equation true (i.e., makes LHS = RHS).',
        examples: ['For $x + 3 = 8$, the solution is $x = 5$'],
        inUse: 'To check a solution, substitute the value back into the original equation.',
        memory: 'The "Root" is what entirely supports the "Tree" (the true equation).',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="40" width="80" height="80" rx="40" fill="rgba(5,150,105,0.1)" stroke="#059669" stroke-width="3"/><polyline points="80,80 95,95 125,65" fill="none" stroke="#059669" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><text x="100" y="145" text-anchor="middle" fill="#059669" font-size="16" font-weight="800">x = 5</text></svg>`
    }
];

export const FOUR_RULES = [
    {
        num: 1,
        title: 'Balance Property (Addition/Subtraction)',
        rule: 'An equation remains balanced if you add or subtract the same number from BOTH sides.',
        emoji: '⚖️',
        color: '#f59e0b',
        detail: 'Think of an equation as a weighing scale. If you drop a $3$ kg weight on the left pan, you must drop a $3$ kg weight on the right pan to keep it level.',
        examples: ['$x - 3 = 10 \\Rightarrow x - 3 + 3 = 10 + 3$', '$y + 4 = 7 \\Rightarrow y + 4 - 4 = 7 - 4$'],
        tip: 'Always do the OPPOSITE operation to isolate the variable!',
        svg: `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
            <line x1="110" y1="120" x2="110" y2="40" stroke="#94a3b8" stroke-width="3"/>
            <polygon points="110,40 20,40 110,60" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="110,40 200,40 110,60" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2"/>
            <line x1="20" y1="40" x2="200" y2="40" stroke="#f59e0b" stroke-width="4"/>
            <rect x="15" y="15" width="25" height="25" fill="#f59e0b" rx="4"/>
            <text x="27.5" y="32" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">+3</text>
            <rect x="180" y="15" width="25" height="25" fill="#f59e0b" rx="4"/>
            <text x="192.5" y="32" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">+3</text>
            <polygon points="90,120 130,120 110,80" fill="#94a3b8"/>
        </svg>`
    },
    {
        num: 2,
        title: 'Balance Property (Multiplication/Division)',
        rule: 'An equation remains balanced if you multiply or divide BOTH sides by the same non-zero number.',
        emoji: '✖️',
        color: '#10b981',
        detail: 'If you double the LHS, you must double the RHS. If you halve the LHS, you must halve the RHS.',
        examples: ['$5y = 35 \\Rightarrow 5y/5 = 35/5$', '$m/2 = 5 \\Rightarrow (m/2) \\times 2 = 5 \\times 2$'],
        tip: 'To remove a multiplier, divide. To remove a divisor, multiply!',
        svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="40" width="60" height="40" rx="8" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="2"/>
            <text x="55" y="65" text-anchor="middle" fill="#10b981" font-size="16" font-weight="bold">5y</text>
            <rect x="115" y="40" width="60" height="40" rx="8" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="2"/>
            <text x="145" y="65" text-anchor="middle" fill="#10b981" font-size="16" font-weight="bold">35</text>
            <text x="100" y="65" text-anchor="middle" fill="#1e293b" font-size="20" font-weight="bold">=</text>
            <line x1="25" y1="85" x2="85" y2="85" stroke="#10b981" stroke-width="2"/>
            <text x="55" y="105" text-anchor="middle" fill="#10b981" font-size="14" font-weight="bold">÷ 5</text>
            <line x1="115" y1="85" x2="175" y2="85" stroke="#10b981" stroke-width="2"/>
            <text x="145" y="105" text-anchor="middle" fill="#10b981" font-size="14" font-weight="bold">÷ 5</text>
        </svg>`
    },
    {
        num: 3,
        title: 'Brackets & Distribution',
        rule: 'When an equation has brackets, multiply the outside number with EACH term inside.',
        emoji: '📦',
        color: '#6366f1',
        detail: 'This is the Distributive Property: $a(b + c) = ab + ac$. It "opens up" the bracket so you can solve.',
        examples: ['$4(m + 3) = 18 \\Rightarrow 4m + 12 = 18$', '$-2(x + 3) = 8 \\Rightarrow -2x - 6 = 8$'],
        tip: 'Don\'t forget to multiply the SECOND inside term too!',
        svg: `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
            <text x="110" y="55" text-anchor="middle" fill="#1e293b" font-size="20" font-weight="bold">4 ( m + 3 )</text>
            <path d="M 85 35 Q 110 15 130 35" fill="none" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-blue)"/>
            <path d="M 80 35 Q 90 25 105 35" fill="none" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-blue)"/>
            <defs>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                </marker>
            </defs>
            <text x="110" y="85" text-anchor="middle" fill="#6366f1" font-size="16" font-weight="bold">4m + 12</text>
        </svg>`
    }
];

export const VOCAB_QUIZ = [
    {
        question: "What does LHS stand for?",
        options: ["Linear Hidden Solution", "Low High Sum", "Left Hand Side", "Last Hand Symbol"],
        correct: 2,
        explanation: "LHS stands for Left Hand Side, the part of the equation to the left of the '=' sign."
    },
    {
        question: "Which of the following is an equation?",
        options: ["$4x + 5$", "$x - 3 > 10$", "$5p = 20$", "$3n + 7$"],
        correct: 2,
        explanation: "An equation MUST have an '=' sign. Only $5p = 20$ has it."
    },
    {
        question: "Moving a term to the other side and changing its sign is called:",
        options: ["Substitution", "Transposition", "Distribution", "Reduction"],
        correct: 1,
        explanation: "Transposition shifts terms across the '=' sign while flipping their signs (+ to -, - to +)."
    },
    {
        question: "In the expression $4x + 5$, what is $x$?",
        options: ["A constant", "The RHS", "A variable", "A transposition"],
        correct: 2,
        explanation: "$x$ is a variable, an unknown quantity that can vary."
    },
    {
        question: "What happens when you add $5$ to the LHS of an equation?",
        options: ["The equation is solved.", "You must add $5$ to the RHS too.", "You must subtract $5$ from the RHS.", "Nothing happens to the balance."],
        correct: 1,
        explanation: "To keep the equation balanced, any operation done to the LHS must be done to the RHS."
    },
    {
        question: "What is the value called that makes an equation true?",
        options: ["Expression", "Variable", "Constant", "Solution"],
        correct: 3,
        explanation: "The solution (or root) is the exact value of the variable that balances the equation."
    },
    {
        question: "Which of these is a constant?",
        options: ["$x$", "$-20$", "$y + 3$", "LHS"],
        correct: 1,
        explanation: "$-20$ is a fixed number that cannot change its value. Variables like $x$ and $y$ can."
    },
    {
        question: "To solve $5y = 35$ in one step, what should you do?",
        options: ["Subtract $5$ from both sides", "Add $5$ to both sides", "Divide both sides by $5$", "Multiply both sides by $5$"],
        correct: 2,
        explanation: "Since $y$ is multiplied by $5$, we use the opposite operation (division by $5$) to isolate $y$."
    },
    {
        question: "If $y - 4 = 7$, applying transposition gives:",
        options: ["$y = 7 - 4$", "$y = 7 + 4$", "$y = -7 - 4$", "$y = 4 - 7$"],
        correct: 1,
        explanation: "Moving $-4$ to the RHS flips its sign to $+4$, so $y = 7 + 4$."
    },
    {
        question: "If we open the bracket for $4(m + 3)$, what do we get?",
        options: ["$4m + 3$", "$m + 12$", "$4m + 12$", "$4m + 7$"],
        correct: 2,
        explanation: "By the Distributive Property, $4$ multiplies with both $m$ and $3$, giving $4m + 12$."
    }
];
