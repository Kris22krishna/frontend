export const SKILLS = [
    {
        id: 'what-is-set',
        title: 'Fundamental: What is a Set?',
        subtitle: 'FOUNDATION',
        desc: 'Learn the core definition of a set and how to represent them accurately.',
        icon: '💎',
        color: '#6366f1',
        learn: {
            title: 'The "Well-Defined" Secret',
            rules: [
                { title: 'Well-Defined Collection', f: 'A = \\{x : P(x)\\}', d: 'A set must be well-defined — there is an objective rule to decide membership. Subjective terms like "beautiful" or "best" do not define a set.', ex: 'V = {a, e, i, o, u} is well-defined. "Collection of talented actors" is NOT.', tip: 'If someone can argue about membership, it is NOT a set.' },
                { title: 'Roster Form', f: 'A = \\{a, e, i, o, u\\}', d: 'Elements are listed inside curly braces, separated by commas. Order does not matter and repetitions are ignored.', ex: 'Letters of APPLE: {A, P, L, E} — not {A, P, P, L, E}.', tip: 'Always remove duplicates before writing in roster form.' },
                { title: 'Set-Builder Form', f: 'V = \\{x : x \\text{ is a vowel}\\}', d: 'A descriptive property P(x) is used to define membership. The colon ":" means "such that".', ex: '{x : x² = 4} = {−2, 2} — the rule filters all solutions.', tip: 'Use set-builder when the roster form would be too long or infinite.' }
            ]
        },
        practice: [
            {
                question: 'Level 1: Which of the following collections is a well-defined set?',
                options: ['The collection of best cricket players in the world', 'The collection of all vowels in English alphabet', 'The collection of most difficult problems in Maths', 'The collection of tall students in your class'],
                correct: 1,
                explanation: 'Best, Difficult, and Tall are subjective. Vowels are universally defined.'
            },
            {
                question: 'Level 1: Represent the set $A = \\{x : x \\text{ is a letter in the word APPLE}\\}$ in Roster form.',
                options: ['$\\{A, P, P, L, E\\}$', '$\\{A, P, L, E\\}$', '$\\{A, E, L, P\\}$', 'Both B and C'],
                correct: 3,
                explanation: 'In roster form, repetitions are ignored and order does not matter.'
            },
            {
                question: 'Level 2: The set $B = \\{1, 4, 9, 16, 25\\}$ in Set-builder form is:',
                options: ['$\\{x : x \\text{ is a natural number}\\}$', '$\\{x : x = n^2, n \\in \\mathbb{N} \\text{ and } n \\le 5\\}$', '$\\{x : x^2 = n, n \\in \\mathbb{N}\\}$', '$\\{x : x \\le 25\\}$'],
                correct: 1,
                explanation: 'The elements are squares of first 5 natural numbers.'
            },
            {
                question: 'Level 2: Convert $\\{x : x \\text{ is an integer, } -3 < x \\le 2\\}$ to Roster form.',
                options: ['$\\{-2, -1, 0, 1, 2\\}$', '$\\{-3, -2, -1, 0, 1\\}$', '$\\{-3, -2, -1, 0, 1, 2\\}$', '$\\{-2, -1, 0, 1\\}$'],
                correct: 0,
                explanation: '-3 is excluded (strict inequality) and 2 is included.'
            },
            {
                question: 'Level 2: What is the roster form of $\\{x : x \\in \\mathbb{N} \\text{ and } x \\text{ is a divisor of } 12\\}$?',
                options: ['$\\{1, 2, 3, 4, 6\\}$', '$\\{1, 2, 3, 4, 6, 12\\}$', '$\\{2, 3, 4, 6, 12\\}$', '$\\{12, 6, 4\\}$'],
                correct: 1,
                explanation: 'Don\'t forget 1 and the number itself (12) are divisors.'
            },
            {
                question: 'Level 3: If $S = \\{x : x^2 - 5x + 6 = 0\\}$, which of the following is NOT an element of S?',
                options: ['2', '3', '0', 'Both A and B are elements'],
                correct: 2,
                explanation: 'Solving $x^2-5x+6=0$ gives roots $x=2$ and $x=3$. So 0 is not an element.'
            },
            {
                question: 'Level 3: Which type of representation uses a descriptor rule like $P(x)$?',
                options: ['Roster form', 'Tabular form', 'Set-builder form', 'Infinite form'],
                correct: 2,
                explanation: 'Set-builder uses a property $P(x)$ to define membership.'
            },
            {
                question: 'Level 3: In the set $A = \\{1, 2, \\{3, 4\\}\\}$, how many elements exist?',
                options: ['3', '4', '2', '5'],
                correct: 0,
                explanation: 'The elements are 1, 2, and the set {3, 4} itself. So total 3 elements.'
            }
        ],
        assessment: [
            { 
                type: 'mcq', 
                question: 'Which of the following is a well-defined set?', 
                options: ['Five most talented actors of India', 'A team of eleven best cricket batsmen of the world', 'All the months of a year beginning with the letter J', 'The collection of most difficult chapters in Maths'],
                correct: 2,
                explanation: 'Subjective terms like "talented", "best", "difficult" or "renowned" are not well-defined.'
            },
            { 
                type: 'text', 
                question: 'Represent the set of all even prime numbers in roster form.', 
                answer: '{2}',
                explanation: '2 is the only even prime number.'
            },
            { 
                type: 'mcq', 
                question: 'The set $A = \\{x : x \\in \\mathbb{N} \\text{ and } x^2 = 9\\}$ in Roster form is:', 
                options: ['$\\{-3, 3\\}$', '$\\{3\\}$', '$\\{-3\\}$', '$\\{9\\}$'],
                correct: 1,
                explanation: 'Natural numbers ($\\mathbb{N}$) are positive only. So $-3$ is excluded.'
            },
            { 
                type: 'msq', 
                question: 'Which of the following are sets of odd natural numbers less than 10? Select all that apply.', 
                options: ['$\\{1, 3, 5, 7, 9\\}$', '$\\{x : x \\text{ is an odd natural number and } x < 10\\}$', '$\\{1, 2, 3, 5, 7, 9\\}$', '$\\{x : x \\in \\mathbb{N}, x \\in \\text{Odd}, x \\le 9\\}$'],
                correct: [0, 1, 3],
                explanation: '2 is an even number, so the third option is incorrect.'
            },
            { 
                type: 'text', 
                question: 'What is the cardinality of the set $B = \\{1, 1, 2, 2, 3, 3\\}$?', 
                answer: '3',
                explanation: 'Distinct elements are {1, 2, 3}.'
            },
            { 
                type: 'mcq', 
                question: 'In Set-builder notation, the set $P = \\{1, 4, 9, 16, 25, ...\\}$ is:', 
                options: ['$\\{x : x \\text{ is an odd number}\\}$', '$\\{x : x \\text{ is a square of a natural number}\\}$', '$\\{x : x = 2n, n \\in \\mathbb{N} \\}$', '$\\{x : x = n^3, n \\in \\mathbb{N} \\}$'],
                correct: 1,
                explanation: 'The numbers are $1^2, 2^2, 3^2$, etc.'
            },
            { 
                type: 'text', 
                question: 'Convert the set $\\{x : x \\in \\mathbb{Z}, -3 < x < 2\\}$ into Roster form.', 
                answer: '{-2, -1, 0, 1}',
                explanation: 'The integers between -3 and 2 are -2, -1, 0, and 1.'
            },
            { 
                type: 'mcq', 
                question: 'Is "The collection of all clever students of your class" a set?', 
                options: ['Yes', 'No'],
                correct: 1,
                explanation: '"Clever" is not well-defined.'
            },
            { 
                type: 'mcq', 
                question: 'If $A = \\{1, 2, 3, 4, 5, 6\\}$, insert symbols $\\in$ or $\\notin$ in: $5$...$A$', 
                options: ['$\\in$', '$\\notin$', '$\\subset$', '$\\supset$'],
                correct: 0,
                explanation: '5 is an element of A.'
            },
            { 
                type: 'mcq', 
                question: 'Represent $A = \\{x : x \\text{ is an integer and } -3 \\le x < 7\\}$ in roster form.', 
                options: ['$\\{-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7\\}$', '$\\{-3, -2, -1, 0, 1, 2, 3, 4, 5, 6\\}$', '$\\{-2, -1, 0, 1, 2, 3, 4, 5, 6\\}$', '$\\{1, 2, 3, 4, 5, 6\\}$'],
                correct: 1,
                explanation: 'Starts from -3 (included) up to 6 (7 excluded).'
            },
            { 
                type: 'msq', 
                question: 'Which of the following are written correctly in Set-Builder form?', 
                options: ['$\\{x : x \\text{ is a Natural Number}\\}$', '$\\{n \\mid n \\text{ is even}\\}$', '$\\{3n : n \\in \\mathbb{N} \\}$', '$\\{1, 3, 5\\}$'],
                correct: [0, 1, 2],
                explanation: 'Option 4 is Roster form.'
            },
            { 
                type: 'text', 
                question: 'Find cardinality of $P = \\{x : x \\text{ is a letter in INDIA} \\}$.', 
                answer: '4',
                explanation: '{I, N, D, A} - I is repeated.'
            }
        ]
    },
    {
        id: 'types-of-sets',
        title: 'Empty & Finite Sets',
        subtitle: 'CLASSIFICATION',
        desc: 'Understand the difference between sets with no elements, fixed elements, and infinite elements.',
        icon: '📏',
        color: '#0d9488',
        learn: {
            title: 'Counting Elements',
            rules: [
                { title: 'Empty Set', f: '\\emptyset = \\{\\}', d: 'A set with zero elements. Also called the Null or Void set. The set {∅} is NOT empty — it has one element (the empty set itself).', ex: '{x : x² = 4 and x is odd} = ∅ — no odd number squares to 4.', tip: 'Never write {∅} when you mean ∅ — they are very different!' },
                { title: 'Finite vs Infinite', f: 'n(A) \\in \\mathbb{N} \\cup \\{0\\}', d: 'A finite set has a countable number of elements. An infinite set is one where counting never ends (e.g., natural numbers).', ex: 'Months of a year: finite (12). Set of all even numbers: infinite.', tip: 'Stars in the sky? Finite. Points on a line? Infinite.' },
                { title: 'Singleton Set', f: 'n(A) = 1', d: 'A set with exactly one element. Every singleton is finite. Examples: {0}, {2}, {∅}.', ex: '{x : x ∈ ℕ, x² = 9} = {3} — only 3 works for natural numbers.', tip: 'When solving for membership, always check the domain (ℕ, ℤ, ℝ).' }
            ]
        },
        practice: [
            {
                question: 'Level 1: Which of the following is the Empty set?',
                options: ['$\\{0\\}$', '$\\{\\emptyset\\}$', '$\\emptyset$', '$\\{\\text{zero}\\}$'],
                correct: 2,
                explanation: '$\\emptyset$ or $\\{\\}$ represents no elements. $\\{0\\}$ contains the number zero.'
            },
            {
                question: 'Level 1: The set of Natural numbers is an example of:',
                options: ['Finite set', 'Infinite set', 'Empty set', 'Singleton set'],
                correct: 1,
                explanation: 'Natural numbers 1, 2, 3... go on forever.'
            },
            {
                question: 'Level 2: What is the cardinality of the set $A = \\{x : x \\text{ is an even prime number}\\}$?',
                options: ['0', '1', '2', 'Infinite'],
                correct: 1,
                explanation: 'The only even prime is 2. So $A = \\{2\\}$, which has 1 element.'
            },
            {
                question: 'Level 2: Is the set $\\{x : x \\in \\mathbb{N} \\text{ and } 1 < x < 2\\}$ empty or infinite?',
                options: ['Empty', 'Infinite', 'Finite but not empty', 'Singleton'],
                correct: 0,
                explanation: 'There are no natural numbers between 1 and 2.'
            },
            {
                question: 'Level 2: A set with a fixed, countable number of elements is called:',
                options: ['Infinite set', 'Null set', 'Finite set', 'Subset'],
                correct: 2,
                explanation: 'Definition of a Finite set.'
            },
            {
                question: 'Level 3: Which of these is a Singleton set?',
                options: ['$\\{x : x \\in \\mathbb{N}, x^2 = 9\\}$', '$\\{x : x \\in \\mathbb{Z}, |x| < 1\\}$', 'Both A and B', 'None of these'],
                correct: 2,
                explanation: 'A = {3} (since $x \\in \\mathbb{N}$). B = {0} (since $|x|<1$ for integers).'
            },
            {
                question: 'Level 3: True or False: Every Singleton set is a Finite set.',
                options: ['True', 'False'],
                correct: 0,
                explanation: 'Yes, because 1 is a finite number.'
            },
            {
                question: 'Level 3: How many elements are in the set $\\{\\emptyset, \\{1, 2\\}\\}$?',
                options: ['2', '3', '0', '1'],
                correct: 0,
                explanation: 'The elements are the symbol $\\emptyset$ and the set $\\{1, 2\\}$. Total count = 2.'
            }
        ],
        assessment: [
            { 
                type: 'mcq', 
                question: 'Which of the following is an empty set?', 



                options: ['Set of odd natural numbers divisible by 2', 'Set of even prime numbers', '$\\{x : x^2 - 1 = 0 \\text{ and } x \\text{ is rational}\\}$', '$\\{x : x \\text{ is a natural number, } 2 < x < 5\\}$'],
                correct: 0,
                explanation: 'Odd numbers are by definition not divisible by 2.'
            },
            { 
                type: 'msq', 
                question: 'Select all sets that are Empty (Null).', 
                options: ['$\\{x : x \\text{ is a point common to any two parallel lines}\\}$', '$\\{x : x \\text{ is an even prime number}\\}$', '$\\{y : y \\text{ is a natural number, } y < 1, y \\in \\mathbb{N} \\}$', '$\\{0\\}$'],
                correct: [0, 2],
                explanation: 'Parallel lines never meet. Natural numbers start from 1.'
            },
            { 
                type: 'mcq', 
                question: 'The set $A = \\{x : x \\in \\mathbb{N}, (x-1)(x-2) = 0\\}$ is:', 
                options: ['Empty', 'Finite', 'Infinite', 'Singleton'],
                correct: 1,
                explanation: 'The set is $\\{1, 2\\}$, which is finite.'
            },
            { 
                type: 'text', 
                question: 'What is the cardinality of the empty set $\\emptyset$?', 
                answer: '0',
                explanation: 'Empty sets contain no elements.'
            },
            { 
                type: 'mcq', 
                question: '$\\{x : x \\text{ is a real number and } x^2 < 0\\}$ is:', 
                options: ['Singleton', 'Finite', 'Empty', 'Infinite'],
                correct: 2,
                explanation: 'Squares of real numbers are always $\\ge 0$.'
            },
            { 
                type: 'msq', 
                question: 'Which sets are Infinite?', 
                options: ['Set of points on a circle', 'Set of concentric circles in a plane', 'Set of prime numbers < 100', 'Set of integers'],
                correct: [0, 1, 3],
                explanation: 'Prime numbers < 100 are limited, so it\'s finite.'
            },
            { 
                type: 'mcq', 
                question: 'What is the cardinality of the set $\\{\\emptyset\\}$?', 
                options: ['0', '1', '2', 'Infinite'],
                correct: 1,
                explanation: '$\\{\\emptyset\\}$ has one element, namely the empty set.'
            },
            { 
                type: 'text', 
                question: 'Write the set of all even prime numbers in roster form.', 
                answer: '{2}',
                acceptedAnswers: ['$\\{2\\}$'],
                explanation: 'The only even prime number is $2$, so the set is $\\{2\\}$.'
            },
            { 
                type: 'msq', 
                question: 'Which of the following are singleton sets?', 
                options: ['$\\{0\\}$', '$\\{\\emptyset\\}$', 'Set of months in a year', '$\\emptyset$'],
                correct: [0, 1],
                explanation: '$\\{0\\}$ and $\\{\\emptyset\\}$ each contain exactly one element.'
            },
            { 
                type: 'text', 
                question: 'Find $n(A)$ if $A = \\{x : x \\in \\mathbb{Z}, |x| < 3\\}$.', 
                answer: '5',
                explanation: 'The elements are $\\{-2, -1, 0, 1, 2\\}$, so $n(A) = 5$.'
            },
            { 
                type: 'text', 
                question: 'Find $n(A)$ if $A = \\{x : x \\in \\mathbb{Z}, x^2 < 10 \\text{ and } x > 0\\}$.', 
                answer: '3',
                explanation: 'Elements: {1, 2, 3}.'
            },
            { 
                type: 'mcq', 
                question: 'Is the set of months of a year finite or infinite?', 
                options: ['Finite', 'Infinite'],
                correct: 0,
                explanation: 'Has exactly 12 elements.'
            }
        ]
    },
    {
        id: 'equal-equivalent',
        title: 'Comparing Sets',
        subtitle: 'COMPARISON',
        desc: 'When are two sets identical? Learn about equality and equivalence.',
        icon: '⚖️',
        color: '#f59e0b',
        learn: {
            title: 'Equality vs Equivalence',
            rules: [
                { title: 'Equal Sets', f: 'A = B \\iff A \\subseteq B \\text{ and } B \\subseteq A', d: 'Two sets are equal if they contain EXACTLY the same elements. Order and repetition do not matter.', ex: '{1, 2, 3} = {3, 2, 1} ✓ and {10, 10, 20} = {20, 10} ✓', tip: 'To prove A = B, show every element of A is in B and vice versa.' },
                { title: 'Equivalent Sets', f: 'A \\sim B \\iff n(A) = n(B)', d: 'Two sets are equivalent if they have the same number of elements (cardinality). They need NOT have the same elements.', ex: '{a, b} ~ {1, 2} — both have 2 elements, but different ones.', tip: 'Equal ⟹ Equivalent, but Equivalent ⟹ Equal only if elements match.' },
                { title: 'Solving for Equality', f: 'A = B \\Rightarrow \\text{match elements}', d: 'When given A = B with unknowns, equate corresponding elements to find values.', ex: 'If {x, 5} = {5, 9}, then x = 9.', tip: 'Write both sets in sorted roster form — matching becomes easy.' }
            ]
        },
        practice: [
            {
                question: 'Level 1: Two sets are equal if:',
                options: ['They have the same number of elements', 'They have exactly the same elements', 'They are both infinite', 'They both contain numbers'],
                correct: 1,
                explanation: 'Equality requires identical members.'
            },
            {
                question: 'Level 1: If $n(A) = n(B)$, the sets are called:',
                options: ['Equal sets', 'Equivalent sets', 'Subset', 'Universal set'],
                correct: 1,
                explanation: 'Equivalence is about element count (cardinality).'
            },
            {
                question: 'Level 2: Are $\\{a, b, c\\}$ and $\\{c, a, b\\}$ equal or equivalent?',
                options: ['Equal only', 'Equivalent only', 'Both Equal and Equivalent', 'Neither'],
                correct: 2,
                explanation: 'They have same elements and same count (3).'
            },
            {
                question: 'Level 2: Given $A = \\{10, 10, 20\\}$ and $B = \\{20, 10\\}$. Are they equal?',
                options: ['Yes', 'No'],
                correct: 0,
                explanation: 'Repetitions in Roster form are ignored. Both are essentially {10, 20}.'
            },
            {
                question: 'Level 2: Are $\\{1, 2, 3\\}$ and $\\{a, b, c\\}$ equivalent?',
                options: ['Yes, $n=3$ for both', 'No, elements are different'],
                correct: 0,
                explanation: 'For equivalence, we only care about the count.'
            },
            {
                question: 'Level 3: Find $x$ such that $\\{x, 5\\} = \\{5, 9\\}$.',
                options: ['5', '9', '0', 'Any number'],
                correct: 1,
                explanation: 'Elements must match exactly.'
            },
            {
                question: 'Level 3: If A is equal to B, then which is true?',
                options: ['$n(A) = n(B)$', '$n(A) \\neq n(B)$', '$A \\neq B$', 'None'],
                correct: 0,
                explanation: 'Equal sets are always equivalent.'
            },
            {
                question: 'Level 3: Solve $x^2 - x = 0$ for set $A$ and check if it equals $\\{0, 1\\}$.',
                options: ['Yes, $A = \\{0, 1\\}$', 'No, $A = \\{0\\}$', 'No, $A = \\{1\\}$', 'No, $A = \\emptyset$'],
                correct: 0,
                explanation: '$x(x-1)=0$ gives $x=0, 1$.'
            }
        ],
        assessment: [
            { 
                type: 'mcq', 
                question: 'Are the sets $A = \\{a, b, c, d\\}$ and $B = \\{d, c, b, a\\}$ equal?', 
                options: ['Yes', 'No'],
                correct: 0,
                explanation: 'Order doesn\'t matter in sets.'
            },
            { 
                type: 'mcq', 
                question: 'Given $A = \\{x, y\\}$ and $B = \\{x, y, x, y\\}$. Are they equal?', 
                options: ['Yes', 'No'],
                correct: 0,
                explanation: 'Repetition of elements does not change the set.'
            },
            { 
                type: 'msq', 
                question: 'If $A = \\{1, 2, 3\\}$ and $B = \\{x, y, z\\}$, which statements are true?', 
                options: ['$A = B$', '$A \\approx B$', '$n(A) = n(B)$', '$A$ and $B$ are equivalent'],
                correct: [1, 2, 3],
                explanation: 'They have same cardinality 3, so they are equivalent but not equal.'
            },
            { 
                type: 'text', 
                question: 'Are $\\{x : x \\text{ is a letter in FOLLOW}\\}$ and $\\{y : y \\text{ is a letter in WOLF}\\}$ equal?', 
                answer: 'Yes',
                explanation: 'Both sets are {F, O, L, W}.'
            },
            { 
                type: 'mcq', 
                question: 'If $A = \\{10, 20, 30\\}$ and $B = \\{x : x \\text{ is a multiple of 10}\\}$, are they equal?', 
                options: ['Yes', 'No'],
                correct: 1,
                explanation: '$B$ contains 40, 50, etc., but $A$ only has up to 30.'
            },
            { 
                type: 'msq', 
                question: 'Which of the following pairs are equal sets?', 
                options: ['$A = \\{2, 3\\}, B = \\{x : x^2 + 5x + 6 = 0\\}$', '$A = \\{0\\}, B = \\{x : x > 15 \\text{ and } x < 5\\}$', '$A = \\{a, b, c\\}, B = \\{c, a, b\\}$', '$A = \\{\\text{Cat, Dog}\\}, B = \\{\\text{Dog, Cat}\\}$'],
                correct: [2, 3],
                explanation: 'In option 1, $B$ has roots -2 and -3. Option 2 $B$ is empty.'
            },
            { 
                type: 'text', 
                question: 'True or False: Every equal set is always equivalent.', 
                answer: 'True',
                explanation: 'If they have same elements, they must have same count of elements.'
            },
            { 
                type: 'mcq', 
                question: 'Two finite sets $A$ and $B$ are equivalent if:', 
                options: ['$A \\subseteq B$', '$B \\subseteq A$', '$n(A) = n(B)$', '$A = B$'],
                correct: 2,
                explanation: 'Equivalence refers to cardinality.'
            },
            { 
                type: 'msq', 
                question: 'Select the pairs of equivalent sets.', 
                options: ['$\\{a, e, i, o, u\\}$ and $\\{1, 2, 3, 4, 5\\}$', '$\\{1, 2, 3\\}$ and $\\{1, 2, 3, 4\\}$', '$\\{\\text{red, blue}\\}$ and $\\{0, 1\\}$', '$\\emptyset$ and $\\{\\emptyset\\}$'],
                correct: [0, 2],
                explanation: 'Pair 1 has $n=5$. Pair 3 has $n=2$.'
            },
            { 
                type: 'text', 
                question: 'Find the value of $x$ for which $\\{1, 2, 3\\} = \\{2, x, 1\\}$.', 
                answer: '3',
                explanation: 'Sets must have exact same elements.'
            }
        ]
    },
    {
        id: 'subsets-intervals',
        title: 'Subsets & Intervals',
        subtitle: 'SET RELATIONS',
        desc: 'Master the concept of subsets, proper subsets, and real-number intervals.',
        icon: '🧬',
        color: '#ec4899',
        learn: {
            title: 'Layers of Sets',
            rules: [
                { title: 'Subsets', f: 'A \\subseteq B', d: 'Every element of A is also in B. The empty set is a subset of every set. A set is always a subset of itself.', ex: '{1, 3} ⊆ {1, 2, 3, 4} ✓ and ∅ ⊆ {1, 2, 3} ✓', tip: 'To disprove A ⊆ B, find just ONE element in A that is not in B.', diagram: 'subset' },
                { title: 'Proper Subsets & Power Set', f: '|P(A)| = 2^n', d: 'A proper subset means A ⊆ B but A ≠ B. The power set P(A) contains all 2ⁿ subsets. Proper subsets count: 2ⁿ − 1.', ex: 'A = {1, 2}: P(A) = {∅, {1}, {2}, {1,2}} — 4 subsets.', tip: 'Remember: 2ⁿ gives total subsets, 2ⁿ − 1 gives proper subsets.' },
                { title: 'Intervals', f: '[a, b] \\text{ vs } (a, b)', d: 'Intervals represent subsets of real numbers. Closed [a,b] includes endpoints; Open (a,b) excludes them; Semi-open [a,b) or (a,b] mixes.', ex: '-1 < x ≤ 4 is written as (−1, 4].', tip: 'Round bracket = strict (<, >). Square bracket = inclusive (≤, ≥).' }
            ]
        },
        practice: [
            {
                question: 'Level 1: The empty set $\\emptyset$ is a subset of:',
                options: ['Only other empty sets', 'Every set', 'Only finite sets', 'No set'],
                correct: 1,
                explanation: 'Fundamental rule: $\\emptyset \\subseteq A$ for any set $A$.'
            },
            {
                question: 'Level 1: If $n(A) = 3$, how many subsets does it have?',
                options: ['3', '6', '8', '9'],
                correct: 2,
                explanation: '$2^3 = 8$.'
            },
            {
                question: 'Level 2: The symbol $\\subset$ denotes:',
                options: ['Subset', 'Proper Subset', 'Superset', 'Element of'],
                correct: 1,
                explanation: 'Proper subset means $A \\subseteq B$ but $A \\neq B$.'
            },
            {
                question: 'Level 2: The interval $[2, 5]$ includes which numbers?',
                options: ['2 and 5 only', 'All real numbers between 2 and 5, excluding 2 and 5', 'All real numbers between 2 and 5, including 2 and 5', 'Only integers between 2 and 5'],
                correct: 2,
                explanation: 'Closed brackets [] include the endpoints.'
            },
            {
                question: 'Level 2: How many proper subsets does a set with 2 elements have?',
                options: ['4', '3', '2', '1'],
                correct: 1,
                explanation: '$2^2 - 1 = 3$. (The set itself is not a proper subset).'
            },
            {
                question: 'Level 3: Which representation corresponds to $( -1, 4 ]$?',
                options: ['$\\{x : -1 < x \\le 4\\}$', '$\\{x : -1 \\le x \\le 4\\}$', '$\\{x : -1 < x < 4\\}$', '$\\{x : -1 \\le x < 4\\}$'],
                correct: 0,
                explanation: 'Round bracket means strict inequality ($<$), while square bracket means non-strict inequality ($\\le$).'
            },
            {
                question: 'Level 3: If $A \\subseteq B$ and $B \\subseteq C$, then:',
                options: ['$A \\subseteq C$', '$C \\subseteq A$', '$A = C$', 'None'],
                correct: 0,
                explanation: 'The subset relation is transitive: if $A \\subseteq B$ and $B \\subseteq C$, then $A \\subseteq C$.'
            },
            {
                question: 'Level 3: The power set of $A = \\{1\\}$ is:',
                options: ['$\\{1\\}$', '$\\{\\emptyset, 1\\}$', '$\\{\\emptyset, \\{1\\}\\}$', '$\\{\\{1\\}\\}$'],
                correct: 2,
                explanation: 'A power set contains every subset of $A$, including $\\emptyset$ and $A$ itself.'
            }
        ],
        assessment: [
            { 
                type: 'text', 
                question: 'How many subsets does a set with 5 elements have?', 
                answer: '32',
                explanation: '$2^5 = 32$.'
            },
            { 
                type: 'mcq', 
                question: 'If $A = \\{1, 2, 3\\}$, then which of the following is NOT correct?', 
                options: ['$\\{1, 2\\} \\subset A$', '$3 \\in A$', '$1 \\subset A$', '$\\emptyset \\subset A$'],
                correct: 2,
                explanation: '1 is an element, so $1 \\in A$ is correct. $\\{1\\}$ would be a subset.'
            },
            { 
                type: 'msq', 
                question: 'Let $A = \\{1, 2, \\{3, 4\\}, 5\\}$. Which statements are correct?', 
                options: ['$\\{3, 4\\} \\subset A$', '$\\{3, 4\\} \\in A$', '$\\{\\{3, 4\\}\\} \\subset A$', '$1 \\in A$'],
                correct: [1, 2, 3],
                explanation: '$\\{3, 4\\}$ is an element of $A$, so $\\{\\{3, 4\\}\\}$ is a subset of $A$.'
            },
            { 
                type: 'text', 
                question: 'Represent $\\{x : x \\in \\mathbb{R}, -4 < x \\le 6\\}$ as an interval.', 
                answer: '(-4, 6]',
                acceptedAnswers: ['(-4,6]'],
                explanation: 'Strict inequality is open (round), non-strict is closed (square).'
            },
            { 
                type: 'mcq', 
                question: 'The set of all subsets of $A$ is called the:', 
                options: ['Universal set', 'Power set', 'Void set', 'Super set'],
                correct: 1,
                explanation: 'Definition of $P(A)$.'
            },
            { 
                type: 'mcq', 
                question: 'If $n(A) = m$, then $n(P(A)) = $?', 
                options: ['$m^2$', '$2m$', '$2^m$', '$m!$'],
                correct: 2,
                explanation: 'Power set has as many elements as there are subsets.'
            },
            { 
                type: 'msq', 
                question: 'Which of the following are True?', 
                options: ['$\\mathbb{N} \\subset \\mathbb{Z}$', '$\\mathbb{Q} \\subset \\mathbb{R}$', '$\\mathbb{R} \\setminus \\mathbb{Q} \\subset \\mathbb{R}$', '$\\mathbb{Z} \\subset \\mathbb{N}$'],
                correct: [0, 1, 2],
                explanation: '$\\mathbb{Z}$ is not a subset of $\\mathbb{N}$.'
            },
            { 
                type: 'mcq', 
                question: 'The interval $[a, b]$ is defined as:', 
                options: ['$\\{x : a \\le x \\le b\\}$', '$\\{x : a < x < b\\}$', '$\\{x : a \\le x < b\\}$', '$\\{x : a < x \\le b\\}$'],
                correct: 0,
                explanation: 'Closed brackets include endpoints.'
            },
            { 
                type: 'text', 
                question: 'How many proper subsets does a singleton set have?', 
                answer: '1',
                explanation: '$2^1 - 1 = 1$.'
            },
            { 
                type: 'mcq', 
                question: 'If $A \\subseteq B$ and $B \\subseteq A$, then:', 
                options: ['$A \\subset B$', '$B \\subset A$', '$A = B$', '$A \\approx B$ but $A \\neq B$'],
                correct: 2,
                explanation: 'Definition of equal sets.'
            },
            { 
                type: 'msq', 
                question: 'If $P(A) = \\{\\emptyset, \\{1\\}, \\{2\\}, \\{1, 2\\}\\}$, what are the elements of A?', 
                options: ['1', '2', '$\\{1\\}$', '$\\{1, 2\\}$'],
                correct: [0, 1],
                explanation: '$A = \\{1, 2\\}$.'
            },
            { 
                type: 'text', 
                question: 'What is the length of the interval $(-2, 5)$?', 
                answer: '7',
                explanation: 'Length is $b-a$.'
            }
        ]
    },
    {
        id: 'universal-complement',
        title: 'Universal Set & Complement',
        subtitle: 'COMPLEMENTS',
        desc: "Learn about the master set (U) and everything that stays outside a set (A').",
        icon: '🌌',
        color: '#f43f5e',
        learn: {
            title: 'The Universal Perspective',
            rules: [
                { title: 'Universal Set', f: 'U', d: 'The universal set U contains ALL objects under consideration in a given context. It defines the boundary of our discussion.', ex: 'If discussing vowels, U could be all English letters.', tip: 'U can change depending on context — always identify it first.' },
                { title: 'Complement of A', f: "A' = \\{x : x \\in U, x \\notin A\\}", d: "The complement A' consists of everything in U that is NOT in A. Also written as Aᶜ or U − A.", ex: 'U = {1,2,3,4,5}, A = {1,3}. Then A\' = {2,4,5}.', tip: 'Always state U before computing complement — it depends on U.', diagram: 'complement-a' },
                { title: 'Complement Laws (Identity)', f: "A \\cup A' = U, \\; A \\cap A' = \\emptyset", d: "1. A ∪ A' = U (The Union Law)\n2. A ∩ A' = ∅ (The Intersection Law)", ex: 'n(U)=50, n(A)=20 → n(A\')=30.', tip: 'A set and its complement are always disjoint and their union is U.', diagram: 'union' },
                { title: 'Double Complement Law', f: "(A')' = A", d: "Taking the complement of a complement returns you to the original set.", ex: "If A = {1, 2}, A' = {3, 4, 5} (in U={1..5}), then (A')' = {1, 2} = A.", tip: 'Think of it as two negatives making a positive.' },
                { title: 'Laws of Empty & Universal Sets', f: "U' = \\emptyset, \\; \\emptyset' = U", d: "1. The complement of the Universal set is the Empty set.\n2. The complement of the Empty set is the Universal set.", ex: 'U\' = U - U = ∅. ∅\' = U - ∅ = U.', tip: 'Everything outside of "Everything" is "Nothing", and vice-versa.' }
            ]
        },
        practice: [
            {
                question: "Level 1: If $U = \\{ a, b, c, d, e \\}$ and $A = \\{ a, c, e \\}$, then $A'$ is:",
                options: ['$\\{ b, d \\}$', '$\\{ a, c, e \\}$', '$\\{ a, b, c, d, e \\}$', '$\\emptyset$'],
                correct: 0,
                explanation: "A' contains elements in U that are not in A."
            },
            {
                question: "Level 1: $(A')'$ is always equal to:",
                options: ["$A'$", '$U$', '$A$', '$\\emptyset$'],
                correct: 2,
                explanation: 'Complement of a complement returns the original set.'
            },
            {
                question: "Level 2: If $U = \\{ 1, 2, 3, ..., 10 \\}$ and $A = \\{ x : x \\text{ is prime} \\}$, then $n(A')$ is:",
                options: ['4', '6', '5', '7'],
                correct: 1,
                explanation: "Primes in U are { 2, 3, 5, 7 } (count 4). $n(A') = 10 - 4 = 6$."
            },
            {
                question: 'Level 2: The universal set for the set of all equilateral triangles can be:',
                options: ['Set of all isosceles triangles', 'Set of all polygons', 'Set of all triangles', 'All of the above'],
                correct: 3,
                explanation: 'U just needs to contain all elements of the set under study.'
            },
            {
                question: "Level 2: $A \\cap A' = $:",
                options: ["$A$", "$U$", "$\\emptyset$", "$A'$"],
                correct: 2,
                explanation: 'A set and its complement have no common elements.'
            },
            {
                question: "Level 3: If $U$ is the set of human beings and A is the set of humans who like math, then $A'$ is:",
                options: ["Set of all humans", "Set of humans who do not like math", "Empty set", "Math teachers"],
                correct: 1,
                explanation: 'Definition of complement.'
            },
            {
                question: 'Level 3: Which of the following is true?',
                options: ["$U' = U$", "$\\emptyset' = \\emptyset$", "$U' = \\emptyset$", "$\\emptyset \\cup \\emptyset' = \\emptyset$"],
                correct: 2,
                explanation: 'Complement of the absolute universe is nothing.'
            },
            {
                question: "Level 3: If $n(U) = 50$ and $n(A) = 20$, then $n(A')$ is:",
                options: ['20', '30', '50', '70'],
                correct: 1,
                explanation: "$n(A') = n(U) - n(A) = 50 - 20 = 30$."
            }
        ],
        assessment: [
            { 
                type: 'mcq', 
                question: 'Complement of a set A is denoted by:', 
                options: ["$A'$", "$A^c$", "$U - A$", 'All of these'],
                correct: 3,
                explanation: 'All three notations/definitions are valid.'
            },
            { 
                type: 'text', 
                question: "If $U = \\{ 1, 2, 3, 4, 5 \\}$ and $A = \\emptyset$, what is $A'$?", 
                answer: '{1, 2, 3, 4, 5}',
                explanation: 'Complement of empty set is the universal set.'
            },
            { 
                type: 'mcq', 
                question: "If $A = U$, then $A'$ is:", 
                options: ['$U$', '$\\emptyset$', '$A$', 'None'],
                correct: 1,
                explanation: 'Complement of the whole universe is empty.'
            },
            { 
                type: 'msq', 
                question: 'Which properties of complementation are correct?', 
                options: ["$A \\cup A' = U$", "$A \\cap A' = \\emptyset$", "$(A')' = A$", "$\\emptyset' = U$"],
                correct: [0, 1, 2, 3],
                explanation: 'All are fundamental laws of complementation.'
            },
            { 
                type: 'text', 
                question: "Find $A'$ if $U = \\{ x : x \\in \\mathbb{N}, x \\le 5 \\}$ and $A = \\{ x : x \\in \\mathbb{N}, x \\text{ is even} \\}$.", 
                answer: '{1, 3, 5}',
                explanation: "U = { 1, 2, 3, 4, 5 }, A = { 2, 4 }. A' = { 1, 3, 5 }."
            }
        ]
    },
    {
        id: 'set-operations',
        title: 'Set Operations',
        subtitle: 'OPERATIONS',
        desc: 'Master the core operations: Union, Intersection, and Difference of sets.',
        icon: '🔗',
        color: '#8b5cf6',
        learn: {
            title: 'Operating on Sets',
            rules: [
                { title: 'Union', f: 'A \\cup B = \\{x : x \\in A \\text{ or } x \\in B\\}', d: 'The union combines all elements from both sets. Think of it as "everything in A OR B (or both)".', ex: 'A = {1,2,3}, B = {3,4,5} → A ∪ B = {1,2,3,4,5}.', tip: 'Union always has more or equal elements than either set.', diagram: 'union' },
                { title: 'Intersection', f: 'A \\cap B = \\{x : x \\in A \\text{ and } x \\in B\\}', d: 'The intersection keeps only elements common to both sets. If A ∩ B = ∅, the sets are disjoint.', ex: 'A = {1,2,3}, B = {3,4,5} → A ∩ B = {3}.', tip: 'For disjoint sets, A ∩ B = ∅ and A ∪ B = n(A) + n(B).', diagram: 'intersection' },
                { title: 'Difference', f: 'A - B = \\{x : x \\in A, x \\notin B\\}', d: 'A − B keeps only elements of A that are NOT in B. Note: A − B ≠ B − A (not commutative).', ex: 'A = {1,2,3,4,5,6}, B = {2,4,6,8} → B − A = {8}.', tip: 'Think of A − B as "remove B from A". What\'s left is purely A.', diagram: 'difference-a-b' }
            ]
        },
        practice: [
            {
                question: 'Level 1: If $A = \\{ 1, 2 \\}$ and $B = \\{ 3, 4 \\}$, then $A \\cap B$ is:',
                options: ['$\\{ 1, 2, 3, 4 \\}$', '$\\emptyset$', '$\\{ 0 \\}$', '$\\{ 1, 2 \\}$'],
                correct: 1,
                explanation: 'A and B have no elements in common, so they are disjoint.'
            },
            {
                question: 'Level 1: The union of $\\{ a, b, c \\}$ and $\\{ c, d, e \\}$ is:',
                options: ['$\\{ a, b, c, d, e \\}$', '$\\{ c \\}$', '$\\{ a, b, d, e \\}$', '$\\{ a, b, c, c, d, e \\}$'],
                correct: 0,
                explanation: 'Union combines all elements, ignoring repetitions.'
            },
            {
                question: 'Level 2: If $A = \\{ x : x \\in \\mathbb{N}, x < 5 \\}$ and $B = \\{ x : x \\in \\mathbb{N}, 3 \\le x < 8 \\}$, find $A \\cap B$.',
                options: ['$\\{ 1, 2, 3, 4, 5, 6, 7 \\}$', '$\\{ 3, 4 \\}$', '$\\{ 3, 4, 5 \\}$', '$\\{ 1, 2 \\}$'],
                correct: 1,
                explanation: 'A = { 1, 2, 3, 4 }, B = { 3, 4, 5, 6, 7 }. Intersection is { 3, 4 }.'
            },
            {
                question: 'Level 2: $A \\cup \\emptyset = $',
                options: ['$A$', '$\\emptyset$', '$U$', 'None'],
                correct: 0,
                explanation: 'Union with an empty set leaves the set unchanged.'
            },
            {
                question: 'Level 2: For any set A, $A \\cap A = $',
                options: ['$A$', '$\\emptyset$', '$U$', '$2A$'],
                correct: 0,
                explanation: 'Intersection of a set with itself is the set itself (Idempotent law).'
            },
            {
                question: 'Level 3: If $A = \\{ 1, 2, 3, 4, 5, 6 \\}$ and $B = \\{ 2, 4, 6, 8 \\}$, find $B - A$.',
                options: ['$\\{ 1, 3, 5 \\}$', '$\\{ 8 \\}$', '$\\{ 2, 4, 6 \\}$', '$\\emptyset$'],
                correct: 1,
                explanation: 'Elements in B that are not in A. Only 8 fits.'
            },
            {
                question: 'Level 3: If $A \\subset B$, then $A \\cap B$ is equal to:',
                options: ['$A$', '$B$', '$\\emptyset$', '$U$'],
                correct: 0,
                explanation: 'Since all of A is in B, the common elements are all of A.'
            },
            {
                question: 'Level 3: If $A \\subset B$, then $A \\cup B$ is equal to:',
                options: ['$A$', '$B$', '$\\emptyset$', '$U$'],
                correct: 1,
                explanation: 'Combining them gives the larger set B.'
            }
        ],
        assessment: [
            { 
                type: 'mcq', 
                question: 'The symmetric difference of sets A and B is defined as:', 
                options: ['$(A - B) \\cup (B - A)$', '$(A \\cup B) - (A \\cap B)$', 'Both A and B', 'None of these'],
                correct: 2,
                explanation: 'Both formulas correctly define elements that are in exactly one of the two sets.'
            },
            { 
                type: 'text', 
                question: 'If $A = \\{ 1, 3, 5 \\}$ and $B = \\{ 1, 2, 3 \\}$, find $n(A \\cup B)$.', 
                answer: '4',
                explanation: '$A \\cup B = \\{1, 2, 3, 5\\}$, so its cardinality is $4$.'
            },
            { 
                type: 'mcq', 
                question: 'Sets A and B are disjoint if:', 
                options: ['$A = B$', '$A \\subset B$', '$A \\cap B = \\emptyset$', '$A \\cup B = U$'],
                correct: 2,
                explanation: 'Disjoint means no overlap.'
            },
            { 
                type: 'msq', 
                question: 'Given $A = \\{ 1, 2, 3, 4 \\}$ and $B = \\{ 3, 4, 5, 6 \\}$, which are true?', 
                options: ['$A \\cap B = \\{ 3, 4 \\}$', '$A \\cup B = \\{ 1, 2, 3, 4, 5, 6 \\}$', '$A - B = \\{ 1, 2 \\}$', '$B - A = \\{ 5, 6 \\}$'],
                correct: [0, 1, 2, 3],
                explanation: 'All standard operation results are correct.'
            },
            { 
                type: 'mcq', 
                question: 'Evaluate $A - A$.', 
                options: ['$A$', '$\\emptyset$', '$U$', '$\\{A\\}$'],
                correct: 1,
                explanation: 'Removing all elements of a set from itself leaves nothing.'
            }
        ]
    },
    {
        id: 'venn-diagrams',
        title: 'Venn Diagrams',
        subtitle: 'VISUALIZATION',
        desc: 'Visualize sets and their relationships using Euler-Venn diagrams.',
        icon: '⭕',
        color: '#22c55e',
        learn: {
            title: 'Visualizing Sets',
            rules: [
                { title: 'Diagram Basics', f: 'U = \\text{Rectangle}, A,B = \\text{Circles}', d: 'Venn diagrams use a rectangle for U and circles for individual sets. Overlapping areas show A ∩ B.', ex: 'Two overlapping circles create 4 regions: only-A, only-B, both (A∩B), and neither.', tip: 'Always start by drawing the rectangle for U first.', diagram: 'intersection' },
                { title: 'Subset & Disjoint', f: 'A \\subset B \\Rightarrow \\text{Circle A inside B}', d: 'Non-overlapping circles mean disjoint sets (A ∩ B = ∅). One circle inside another shows subset relationship.', ex: 'If A ⊂ B: circle A is completely inside circle B.', tip: 'Disjoint = no overlap. Subset = completely inside.', diagram: 'subset' },
                { title: 'Shading Regions', f: 'A - B = \\text{shade A, not overlap}', d: 'Each operation corresponds to a specific shaded region. A−B is A\'s portion only. (A∪B)\' is outside both circles.', ex: 'To shade A − B: color circle A\'s non-overlapping part.', tip: 'Practice shading each operation — exams love "identify the shaded region" questions.' }
            ]
        },
        practice: [
            {
                question: 'Level 1: In a Venn diagram, the Universal set is usually represented by a:',
                options: ['Circle', 'Triangle', 'Rectangle', 'Square'],
                correct: 2,
                explanation: 'Standard convention uses a rectangle for U.'
            },
            {
                question: 'Level 1: The region common to two overlapping circles A and B represents:',
                options: ['$A \\cup B$', '$A \\cap B$', '$A - B$', '$A\'$'],
                correct: 1,
                explanation: 'The overlap is where elements belong to both sets.'
            },
            {
                question: 'Level 2: Shading the entire area covered by both circles A and B gives:',
                options: ["$A \\cap B$", "$A \\cup B$", "$A = B$", "$A' \\cap B'$"],
                correct: 1,
                explanation: 'Union covers everything in either or both sets.'
            },
            {
                question: 'Level 2: If circles A and B do not overlap at all, the sets are:',
                options: ['Equal', 'Equivalent', 'Disjoint', 'Subsets'],
                correct: 2,
                explanation: 'No overlap means no common elements ($A \\cap B = \\emptyset$).'
            },
            {
                question: 'Level 2: In a Venn diagram, $A - B$ is represented by:',
                options: ['Region in A only', 'Region in B only', 'Overlapping region', 'Region outside A'],
                correct: 0,
                explanation: 'Difference $A-B$ is the part of circle A that doesn\'t overlap with B.'
            },
            {
                question: 'Level 3: How many regions are created by two overlapping circles inside a rectangle U?',
                options: ['2', '3', '4', '5'],
                correct: 2,
                explanation: '1 (A only), 2 (Overlap), 3 (B only), 4 (Outside both circles).'
            },
            {
                question: 'Level 3: If $A \\subset B$, which region is guaranteed to be empty?',
                options: ['$A \\cap B$', '$A - B$', '$B - A$', '$U - B$'],
                correct: 1,
                explanation: 'If $A \\subset B$, no element can be in A without being in B, so $A - B = \\emptyset$.'
            },
            {
                question: 'Level 3: Shading the region outside $(A \\cap B)$ but inside $U$ represents:',
                options: ["$A \\cup B$", "$\\emptyset$", "$(A \\cap B)'$", "$A' \\cap B'$"],
                correct: 2,
                explanation: 'Definition of complement of an intersection.'
            }
        ],
        assessment: [
            { 
                type: 'mcq', 
                question: 'Venn diagrams are named after:', 
                options: ['John Venn', 'Leonhard Euler', 'Isaac Newton', 'George Boole'],
                correct: 0,
                explanation: 'Named after British logician John Venn.'
            },
            { 
                type: 'msq', 
                question: 'In a Venn diagram with sets A and B, which regions make up $A \\cup B$?', 
                options: ['Only A', 'Only B', 'Both A and B (Overlap)', 'Region outside A and B'],
                correct: [0, 1, 2],
                explanation: 'Union includes everything in either set.'
            },
            { 
                type: 'mcq', 
                question: 'If $A \\cap B = \\emptyset$, the circles in the Venn diagram will be:', 
                options: ['Overlapping', 'One inside another', 'Separated (Disjoint)', 'Identical'],
                correct: 2,
                explanation: 'Disjoint sets have no overlap.'
            },
            { 
                type: 'text', 
                question: 'In a 2-set Venn diagram, what is the region $(A \\cup B)\'$?', 
                answer: 'Outside both circles',
                explanation: 'Complement of union is everything in U that is not in A or B.'
            },
            { 
                type: 'mcq', 
                question: 'If Circle A is inside Circle B, then:', 
                options: ['$B \\subseteq A$', '$A \\subseteq B$', '$A \\cap B = \\emptyset$', '$A \\cup B = A$'],
                correct: 1,
                explanation: 'Visual representation of a subset.'
            }
        ]
    },
    {
        id: 'laws-properties',
        title: 'Laws & Properties',
        subtitle: 'ALGEBRA OF SETS',
        desc: 'Understand the mathematical laws that govern set theory, from De Morgan to Distributive laws.',
        icon: '📜',
        color: '#f97316',
        learn: {
            title: 'The Rules of the Game',
            rules: [
                { title: 'Commutative Laws', f: 'A \\cup B = B \\cup A, \\; A \\cap B = B \\cap A', d: 'The order in which we perform Union or Intersection does not change the result. Just like 2 + 3 = 3 + 2.', ex: '{1, 2} ∪ {3, 4} = {3, 4} ∪ {1, 2} = {1, 2, 3, 4}.', tip: 'Commutative means "the order is interchangeable".' },
                { title: 'Associative Laws', f: '(A \\cup B) \\cup C = A \\cup (B \\cup C)', d: 'The way elements are grouped in Union or Intersection does not change the result. $(A \\cap B) \\cap C = A \\cap (B \\cap C)$.', ex: '({a, b} ∪ {c}) ∪ {d} = {a, b, c} ∪ {d} = {a, b, c, d}.', tip: 'Associative means "the grouping is interchangeable".' },
                { title: 'Idempotent Laws', f: 'A \\cup A = A, \\; A \\cap A = A', d: 'Operating a set with itself results in the same set. Repetition doesn\'t add or remove anything.', ex: '{1, 2} ∩ {1, 2} = {1, 2}.', tip: 'Idempotent comes from "idempotens" — having the same power.' },
                { title: 'Distributive Laws', f: 'A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)', d: 'Union distributes over intersection AND intersection distributes over union. Works both ways.', ex: 'A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).', tip: 'Think of it like multiplication distributing over addition.' },
                { title: 'De Morgan\'s Laws', f: "(A \\cup B)' = A' \\cap B'", d: "1. (A ∪ B)' = A' ∩ B'\n2. (A ∩ B)' = A' ∪ B'\nThe complement of a union is the intersection of complements, and vice-versa.", ex: "(A ∩ B)' = A' ∪ B' — the 'flip and complement' rule.", tip: 'Remember: Break the bar, change the sign. This is crucial for proofs.' }
            ]
        },
        practice: [
            {
                question: 'Level 1: According to Commutative law, $A \\cup B$ is equal to:',
                options: ['$A \\cap B$', '$B \\cup A$', '$A$', '$B$'],
                correct: 1,
                explanation: 'Order doesn\'t matter for Union or Intersection.'
            },
            {
                question: 'Level 1: $A \\cap A$ is always:',
                options: ['$A$', '$\\emptyset$', '$U$', '$2A$'],
                correct: 0,
                explanation: 'Idempotent law: Intersecting a set with itself gives the set itself.'
            },
            {
                question: "Level 2: De Morgan's law states that $(A \\cap B)' = $:",
                options: ["$A' \\cap B'$", "$A' \\cup B'$", "$A \\cup B$", "$A \\cap B$"],
                correct: 1,
                explanation: 'Complement of intersection is the union of complements.'
            },
            {
                question: 'Level 2: $A \\cup (B \\cap C)$ is equal to:',
                options: ['$(A \\cup B) \\cap (A \\cup C)$', '$(A \\cap B) \\cup (A \\cap C)$', '$A \\cup B \\cup C$', '$A \\cap B \\cap C$'],
                correct: 0,
                explanation: 'Distributive law of Union over Intersection.'
            },
            {
                question: 'Level 2: $A \\cap (A \\cup B) = $:',
                options: ['$A$', '$B$', '$A \\cup B$', '$\\emptyset$'],
                correct: 0,
                explanation: 'Absorption Law: The result is always A because A is a subset of $A \\cup B$.'
            },
            {
                question: 'Level 3: If $A \\cup B = A \\cap B$, then which is true?',
                options: ['$A = \\emptyset$', '$B = \\emptyset$', '$A = B$', 'None of these'],
                correct: 2,
                explanation: 'Union and Intersection are only equal if the sets themselves are identical.'
            },
            {
                question: 'Level 3: Which law is represented by $(A \\cup B) \\cup C = A \\cup (B \\cup C)$?',
                options: ['Commutative', 'Associative', 'Distributive', 'De Morgan'],
                correct: 1,
                explanation: 'Grouping elements differently doesn\'t change the result.'
            },
            {
                question: 'Level 3: $A \\cap (B - C)$ is equal to:',
                options: ['$(A \\cap B) - (A \\cap C)$', '$(A \\cup B) - (A \\cup C)$', '$A - (B \\cap C)$', '$A \\cap B \\cap C$'],
                correct: 0,
                explanation: 'Intersection distributes over difference.'
            }
        ],
        assessment: [
            { 
                type: 'mcq', 
                question: "Identify De Morgan's Law from the following:", 
                options: ["$(A \\cup B)' = A' \\cap B'$ ", "$(A \\cap B)' = A' \\cup B'$ ", "Both A and B", "None of these"],
                correct: 2,
                explanation: "Both represent the two parts of De Morgan's laws."
            },
            { 
                type: 'mcq', 
                question: 'Complete the law: $A \\cap (B \\cup C) = (A \\cap B) \\cup (...)$', 
                options: ['$A \\cup C$', '$B \\cap C$', '$A \\cap C$', '$A \\cup B$'],
                correct: 2,
                explanation: 'Distributive law of intersection over union.'
            },
            { 
                type: 'mcq', 
                question: 'The law $A \\cup A\' = U$ is called:', 
                options: ['Identity Law', 'Complement Law', 'Idempotent Law', 'De Morgan Law'],
                correct: 1,
                explanation: 'A set combined with its complement fills the universal set.'
            },
            { 
                type: 'msq', 
                question: 'Which of the following are True for any set A?', 
                options: ['$A \\cup \\emptyset = A$', '$A \\cap \\emptyset = \\emptyset$', '$A \\cup U = U$', '$A \\cap U = A$'],
                correct: [0, 1, 2, 3],
                explanation: 'All are fundamental identity and domination laws.'
            },
            { 
                type: 'mcq', 
                question: "According to De Morgan's Law, $(A \\cup B)'$ is equal to?", 
                options: ["$A' \\cup B'$", "$A' \\cap B'$", "$A \\cap B$", "$(A \\cap B)'$"],
                correct: 1,
                explanation: 'Complement of union is the intersection of complements.'
            }
        ]
    },
    {
        id: 'cardinality-problems',
        title: 'Cardinality & Word Problems',
        subtitle: 'APPLICATION',
        desc: 'Apply set theory to solve real-world counting problems using inclusion-exclusion principles.',
        icon: '🧮',
        color: '#06b6d4',
        learn: {
            title: 'The Art of Counting',
            rules: [
                { title: 'Inclusion-Exclusion (2 sets)', f: 'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)', d: 'We subtract the intersection once because it is double-counted when adding n(A) and n(B).', ex: 'n(A)=30, n(B)=25, n(A∩B)=10 → n(A∪B)=45. Neither=50−45=5.', tip: 'Draw a Venn diagram first — fill in the intersection, then work outward.' },
                { title: 'Only A / Only B', f: 'n(A - B) = n(A) - n(A \\cap B)', d: 'To find elements in only A (pure A), subtract the overlap from A\'s total.', ex: 'n(A)=35, n(A∩B)=10 → only A = 25.', tip: 'In surveys: n(only A) + n(only B) + n(both) + n(neither) = n(U).' },
                { title: 'Disjoint & Max/Min', f: 'A \\cap B = \\emptyset \\Rightarrow n(A \\cup B) = n(A) + n(B)', d: 'For disjoint sets, intersection is 0. Max of n(A∪B) occurs when disjoint. Min occurs when smaller set is a subset.', ex: 'n(A)=10, n(B)=15: min union=15 (A⊂B), max union=25 (disjoint).', tip: 'Max/min problems are common in competitive exams.' }
            ]
        },
        practice: [
            {
                question: 'Level 1: If $n(A) = 15, n(B) = 20$ and $n(A \\cap B) = 5$, find $n(A \\cup B)$.',
                options: ['35', '30', '40', '25'],
                correct: 1,
                explanation: '$15 + 20 - 5 = 30$.'
            },
            {
                question: 'Level 1: $n(A - B)$ is the same as:',
                options: ['$n(A) - n(B)$', '$n(A) - n(A \\cap B)$', '$n(A \\cup B) - n(A)$', '$n(B) - n(A)$'],
                correct: 1,
                explanation: 'To get "Only A", remove the common part from A.'
            },
            {
                question: 'Level 2: In a group of 100 people, 70 speak English and 40 speak Hindi. Each speaks at least one. How many speak both?',
                options: ['10', '20', '30', '40'],
                correct: 0,
                explanation: '$n(E \\cup H) = n(E) + n(H) - n(E \\cap H) \\Rightarrow 100 = 70 + 40 - X \\Rightarrow X = 10$.'
            },
            {
                question: 'Level 2: If $A \\subset B$, then $n(B - A)$ is:',
                options: ['$n(B)$', '$n(A)$', '$n(B) - n(A)$', '0'],
                correct: 2,
                explanation: 'Since A is entirely inside B, $A \\cap B = A$. So $n(B-A) = n(B) - n(A)$.'
            },
            {
                question: 'Level 2: If $n(A) = 10$ and $n(B) = 15$, the maximum possible value of $n(A \\cup B)$ is:',
                options: ['15', '25', '10', '30'],
                correct: 1,
                explanation: 'Max value occurs when sets are disjoint ($10 + 15 = 25$).'
            },
            {
                question: 'Level 3: If $n(A) = 10$ and $n(B) = 15$, the minimum possible value of $n(A \\cup B)$ is:',
                options: ['15', '25', '10', '5'],
                correct: 0,
                explanation: 'Min value occurs when the smaller set is a subset of the larger set.'
            },
            {
                question: 'Level 3: In a survey of 400 students, 100 were Apple users, 150 were Android users and 75 were both. How many were neither?',
                options: ['175', '225', '250', '325'],
                correct: 1,
                explanation: '$n(App \\cup And) = 100 + 150 - 75 = 175$. Neither $= 400 - 175 = 225$.'
            },
            {
                question: 'Level 3: Three sets A, B, C are such that $n(A \\cup B \\cup C) = n(A) + n(B) + n(C)$. This happens when:',
                options: ['They are all equal', 'They are pairwise disjoint', 'They are subsets', 'Universal set is empty'],
                correct: 1,
                explanation: 'No overlaps mean all intersection terms are zero.'
            }
        ],
        assessment: [
            { 
                type: 'mcq', 
                question: 'The formula for $n(A \\cup B \\cup C)$ includes how many triple intersection terms $+n(A \\cap B \\cap C)$?', 
                options: ['0', '1', '2', '3'],
                correct: 1,
                explanation: 'Standard inclusion-exclusion for 3 sets adds back the triple intersection at the end.'
            },
            { 
                type: 'text', 
                question: 'If $n(A)=10, n(B)=20, n(A \\cup B)=25$, find $n(A \\cap B)$.', 
                answer: '5',
                explanation: '$10 + 20 - 25 = 5$.'
            },
            { 
                type: 'mcq', 
                question: 'If $n(A - B) = 18, n(B - A) = 25$ and $n(A \\cap B) = 15$, find $n(A \\cup B)$.', 
                options: ['58', '43', '40', '50'],
                correct: 0,
                explanation: '$18 + 25 + 15 = 58$. (Sum of the 3 distinct regions).'
            },
            { 
                type: 'msq', 
                question: 'For any two sets A and B, which are true?', 
                options: ['$n(A \\cup B) \\le n(A) + n(B)$', '$n(A \\cap B) \\le n(A)$', '$n(A \\cup B) = n(A) + n(B)$ if $A, B$ are disjoint', '$n(A - B) = n(A)$ if $A, B$ are disjoint'],
                correct: [0, 1, 2, 3],
                explanation: 'All inequalities and equalities are standard properties.'
            },
            { 
                type: 'text', 
                question: 'In a group of 50 people, 35 like pizza and 10 like both pizza and burger. How many like ONLY pizza?', 
                answer: '25',
                explanation: '$35 - 10 = 25$.'
            }
        ]
    }
];
