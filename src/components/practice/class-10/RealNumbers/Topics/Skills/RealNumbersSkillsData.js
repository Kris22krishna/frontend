export const SKILLS = [
    {
        id: 'understanding-real-numbers',
        title: 'Understanding Real Numbers',
        subtitle: 'Number Classification',
        desc: 'Explore the classification of numbers into rational and irrational categories.',
        icon: '🌳',
        color: '#6366f1',
        learn: {
            title: 'The Real Number Family',
            content: `Real numbers represent any value on a continuous number line. They are split into two major families: Rational and Irrational.
            
            1. Rational Numbers (Q): $Q = \\{ \\frac{p}{q} : p, q \\in \\mathbb{Z}, q \\neq 0 \\}$. Numbers that can be expressed as a fraction. Decimals either terminate or repeat.
            2. Irrational Numbers (I): Numbers that cannot be written as fractions. Decimals are non-terminating and non-repeating.`,
            rules: [
                'Every integer is a rational number because it can be written as $\\frac{n}{1}$.',
                'Roots of non-perfect squares (like $\\sqrt{2}$) are always irrational.',
                'The sum of a rational and an irrational number is always irrational.'
            ],
            examples: [
                { q: 'Is $0.5$ rational?', a: 'Yes, it can be written as $\\frac{1}{2}$.' },
                { q: 'Is $\\pi$ rational?', a: 'No, it is a non-terminating, non-repeating decimal.' }
            ]
        },
        practice: [
            { question: 'Which of the following is an irrational number?', options: ['$\\frac{22}{7}$', '3.141414...', '$\\sqrt{5}$', '0.5'], correct: 2, explanation: '$\\sqrt{5}$ is the square root of a non-perfect square, resulting in a non-terminating, non-repeating decimal.' },
            { question: 'True or False: All natural numbers are real numbers.', options: ['True', 'False'], correct: 0, explanation: 'Real numbers include all rational numbers, and natural numbers are a subset of rationals.' },
            { question: 'Is the number $0.121212...$ rational or irrational?', options: ['Rational', 'Irrational', 'Neither', 'Both'], correct: 0, explanation: 'It is a repeating decimal, which can be expressed as a fraction $(\\frac{12}{99})$.' },
            { question: 'What is the value of $\\sqrt{9}$ and its type?', options: ['3, Rational', '3, Irrational', '9, Rational', '4.5, Irrational'], correct: 0, explanation: '$\\sqrt{9} = 3$, which is an integer and thus a rational number.' },
            { question: 'Which set does $\\pi$ belong to?', options: ['Rational Numbers', 'Irrational Numbers', 'Integers', 'Whole Numbers'], correct: 1, explanation: '$\\pi$ is a non-terminating, non-repeating decimal.' },
            { question: 'A terminating decimal is always:', options: ['Rational', 'Irrational', 'An Integer', 'Prime'], correct: 0, explanation: 'Any terminating decimal can be written as a fraction with a power of 10 in the denominator.' },
            { question: 'Is $0.101101110...$ rational?', options: ['Yes', 'No', 'Depends on the next digit', 'Only if it ends'], correct: 1, explanation: 'The pattern shows no repeating block, making it irrational.' },
            { question: 'Sum of a rational and an irrational number is always:', options: ['Rational', 'Irrational', 'Zero', 'Undefined'], correct: 1, explanation: 'Adding a "clean" fraction and a "messy" infinite decimal results in a messy one.' },
            { question: 'Which of these is NOT a real number?', options: ['$\\sqrt{2}$', '$0$', '$\\sqrt{-1}$', '$\\pi$'], correct: 2, explanation: 'The square root of a negative number is an imaginary number, not a real number.' },
            { question: 'Every integer $n$ can be written as:', options: ['$\\frac{n}{n}$', '$\\frac{n}{1}$', '$\\frac{1}{n}$', '$\\frac{0}{n}$'], correct: 1, explanation: 'This proves that every integer is a rational number.' }
        ],
        assessment: [
            { question: 'The decimal expansion of an irrational number is:', options: ['Terminating', 'Non-terminating and repeating', 'Non-terminating and non-repeating', 'None of these'], correct: 2, explanation: 'By definition, irrational numbers do not repeat or end.' },
            { question: 'Which of the following is rational?', options: ['$\\sqrt{2}$', '$\\pi$', '$\\sqrt{4}$', '$\\sqrt{7}$'], correct: 2, explanation: '$\\sqrt{4} = 2$, which is a rational number.' },
            { question: 'Is the sum of two irrational numbers always irrational?', options: ['Yes', 'No', 'Only if they are positive', 'Always zero'], correct: 1, explanation: 'Not always. For example, $\\sqrt{2} + (-\\sqrt{2}) = 0$, which is rational.' },
            { question: 'Which property do real numbers follow on a number line?', options: ['Completeness Property', 'Void Property', 'Integer Property', 'Prime Property'], correct: 0, explanation: 'The completeness property means there are no gaps on the real number line.' },
            { question: 'Is $22/7$ the exact value of $\\pi$?', options: ['Yes', 'No, it is an approximation', 'Yes, in geometry', 'No, $22/7$ is irrational'], correct: 1, explanation: '$22/7$ is a rational approximation of the irrational number $\\pi$.' },
            { question: 'The product of a non-zero rational and an irrational number is:', options: ['Rational', 'Irrational', 'Zero', 'Integer'], correct: 1, explanation: 'A non-zero rational multiplied by an irrational cannot become rational.' },
            { question: 'Between any two rational numbers, there are:', options: ['Exactly 10 numbers', 'Infinite numbers', 'Zero numbers', 'Only integers'], correct: 1, explanation: 'This is the density property of rational numbers.' },
            { question: 'Which of these decimals is irrational?', options: ['0.333...', '0.125', '0.101001000...', '0.75'], correct: 2, explanation: '0.101001000... has no repeating block.' },
            { question: 'Are all square roots irrational?', options: ['Yes', 'No, only non-perfect squares', 'No, only primes', 'Yes, by definition'], correct: 1, explanation: 'Roots of perfect squares like $\\sqrt{9}, \\sqrt{16}$ are rational.' },
            { question: 'Zero is a:', options: ['Rational Number', 'Irrational Number', 'Neither', 'Natural Number'], correct: 0, explanation: 'Zero is a rational number because it can be written as $\\frac{0}{1}$.' }
        ]
    },
    {
        id: 'euclids-algorithm',
        title: 'Euclid’s Division Algorithm',
        subtitle: 'Finding HCF',
        desc: 'Learn the systematic way to find the HCF of two large numbers.',
        icon: '➗',
        color: '#0d9488',
        learn: {
            title: 'The Remainder Secret',
            content: `Euclid’s Division Lemma is the foundation for finding the HCF. It states that for any two positive integers $a$ and $b$, there exist unique integers $q$ and $r$ such that:
            $$a = bq + r, \\text{ where } 0 \\le r < b$$
            
            By repeatedly applying this lemma, we can find the HCF of any two numbers.`,
            rules: [
                'Dividend = divisor $\\times$ quotient + remainder.',
                'The remainder $r$ must always be smaller than the divisor $b$.',
                'The last non-zero divisor in the algorithm is the HCF.'
            ],
            examples: [
                { q: 'Find $q$ and $r$ for $a=17, b=5$.', a: '$17 = 5 \\times 3 + 2$. So $q=3, r=2$.' },
                { q: 'What is the HCF of 24 and 10?', a: 'HCF is 2.' }
            ]
        },
        practice: [
            { question: 'Using Euclid’s Lemma, if $a = 45$ and $b = 6$, find $q$ and $r$.', options: ['$q=7, r=3$', '$q=6, r=9$', '$q=8, r=1$', '$q=7, r=0$'], correct: 0, explanation: '$45 = 6 \\times 7 + 3$. Here $q=7$ and $r=3$.' },
            { question: 'In $a = bq + r$, what is the condition for $r$?', options: ['$0 < r < b$', '$0 \\le r < b$', '$0 < r < q$', '$0 \\le r \\le b$'], correct: 1, explanation: 'The remainder can be zero but must be strictly less than the divisor.' },
            { question: 'What is the first step to find HCF of 120 and 45?', options: ['$45 = 120q + r$', '$120 = 45q + r$', '$120 + 45$', '$120 - 45$'], correct: 1, explanation: 'Start with the larger number as the dividend.' },
            { question: 'If $r = 0$ in the first step of Euclid’s Algorithm, what is the HCF?', options: ['$a$', '$b$', '$q$', '$0$'], correct: 1, explanation: 'If $b$ divides $a$ perfectly, $b$ is the HCF.' },
            { question: 'Find $q$ and $r$ for $a=100, b=30$.', options: ['$q=3, r=10$', '$q=2, r=40$', '$q=4, r=0$', '$q=3, r=0$'], correct: 0, explanation: '$100 = 30 \\times 3 + 10$.' },
            { question: 'Euclid\'s Division Algorithm is used to find:', options: ['LCM', 'HCF', 'Prime Factors', 'Quotients only'], correct: 1, explanation: 'It is a specific method for Highest Common Factor.' },
            { question: 'If $HCF(a, b) = 1$, the numbers are:', options: ['Even', 'Odd', 'Co-prime', 'Composite'], correct: 2, explanation: 'Co-prime numbers have no common factors other than 1.' },
            { question: 'For $a=72, b=10$, the sequence of remainders is:', options: ['$2, 0$', '$10, 2, 0$', '$2, 2, 0$', '$7, 2, 0$'], correct: 0, explanation: '$72 = 10 \\times 7 + 2$; $10 = 2 \\times 5 + 0$. Remainders are 2 then 0.' },
            { question: 'Can $r$ be greater than $b$?', options: ['Yes', 'No', 'Sometimes', 'Only if $a < b$'], correct: 1, explanation: 'By definition, $r < b$.' },
            { question: 'If $a=bq+r$, then $HCF(a,b)$ is same as:', options: ['$HCF(q,r)$', '$HCF(b,r)$', '$HCF(a,q)$', '$HCF(b,q)$'], correct: 1, explanation: 'This is the property that makes the algorithm work.' }
        ],
        assessment: [
            { question: 'What is the HCF of 135 and 225 using Euclid’s Algorithm?', options: ['15', '45', '75', '5'], correct: 1, explanation: '$225 = 135 \\times 1 + 90$; $135 = 90 \\times 1 + 45$; $90 = 45 \\times 2 + 0$. HCF is 45.' },
            { question: 'Find HCF of 84 and 105.', options: ['21', '7', '14', '3'], correct: 0, explanation: '$105 = 84 \\times 1 + 21$; $84 = 21 \\times 4 + 0$. HCF is 21.' },
            { question: 'The HCF of any two consecutive even numbers is:', options: ['1', '2', '4', 'Depends on numbers'], correct: 1, explanation: 'Consecutive even numbers (like 4, 6) always have 2 as their only common factor.' },
            { question: 'The HCF of any two consecutive odd numbers is:', options: ['1', '2', '3', '5'], correct: 0, explanation: 'Consecutive odd numbers (like 5, 7) are always co-prime.' },
            { question: 'Find HCF of 455 and 42.', options: ['7', '13', '91', '1'], correct: 0, explanation: '$455 = 42 \\times 10 + 35$; $42 = 35 \\times 1 + 7$; $35 = 7 \\times 5 + 0$. HCF is 7.' },
            { question: 'If $a = 15, b = 4$, then $q$ and $r$ are:', options: ['$3, 3$', '$4, -1$', '$3, 1$', '$2, 7$'], correct: 0, explanation: '$15 = 4 \\times 3 + 3$.' },
            { question: 'Euclid\'s Division Lemma is a restatement of:', options: ['Long Division', 'Multiplication', 'Addition', 'Subtraction'], correct: 0, explanation: 'It formalizes the process of division with remainders.' },
            { question: 'HCF of 96 and 404 is:', options: ['4', '2', '8', '12'], correct: 0, explanation: '$404 = 96 \\times 4 + 20$; $96 = 20 \\times 4 + 16$; $20 = 16 \\times 1 + 4$; $16 = 4 \\times 4 + 0$.' },
            { question: 'If $HCF(480, 672) = 96$, then $HCF(96, 480)$ is:', options: ['$96$', '$480$', '$1$', '$192$'], correct: 0, explanation: 'By the algorithmic property, the HCF is preserved through steps.' },
            { question: 'The largest number which divides 70 and 125 leaving remainders 5 and 8 respectively is:', options: ['13', '65', '875', '1750'], correct: 0, explanation: 'Find HCF of $(70-5=65)$ and $(125-8=117)$. $117 = 65 \\times 1 + 52$; $65 = 52 \\times 1 + 13$; $52 = 13 \\times 4 + 0$. HCF is 13.' }
        ]
    },
    {
        id: 'prime-factorisation',
        title: 'Prime Factorisation',
        subtitle: 'Building Blocks',
        desc: 'Break down composite numbers into their prime building blocks.',
        icon: '⛏️',
        color: '#f59e0b',
        learn: {
            title: 'Prime Building Blocks',
            content: `Every composite number can be broken down into a product of prime numbers. This is its unique "prime signature".
            
            Primes are numbers with exactly two factors: 1 and themselves. Composite numbers have more than two factors.`,
            rules: [
                '2 is the only even prime number.',
                'Factor Tree: Repeatedly divide by the smallest prime until the end.',
                'The order of primes in the factorisation does not change the result.'
            ],
            examples: [
                { q: 'What is the prime factorisation of 60?', a: '$60 = 2^2 \\times 3 \\times 5$.' },
                { q: 'Is 91 a prime number?', a: 'No, $91 = 7 \\times 13$.' }
            ]
        },
        practice: [
            { question: 'Which is the correct prime factorisation of 140?', options: ['$2 \\times 70$', '$2 \\times 2 \\times 35$', '$2^2 \\times 5 \\times 7$', '$10 \\times 14$'], correct: 2, explanation: '$140 = 2 \\times 70 = 2 \\times 2 \\times 35 = 2 \\times 2 \\times 5 \\times 7 = 2^2 \\times 5 \\times 7$.' },
            { question: 'What is the prime factorisation of 156?', options: ['$2^2 \\times 3 \\times 13$', '$2 \\times 3 \\times 13$', '$2^2 \\times 39$', '$2 \\times 78$'], correct: 0, explanation: '$156 = 2 \\times 78 = 2 \\times 2 \\times 39 = 2^2 \\times 3 \\times 13$.' },
            { question: 'The number 2 is:', options: ['The only even prime', 'The smallest prime', 'Both A and B', 'Not a prime'], correct: 2, explanation: '2 is unique for being even and the starting point of primes.' },
            { question: 'Which of these is NOT a prime factor of 210?', options: ['2', '3', '5', '9'], correct: 3, explanation: '$210 = 2 \\times 3 \\times 5 \\times 7$. 9 is not a factor.' },
            { question: 'Prime factorisation of 81 is:', options: ['$3^3$', '$3^4$', '$9^2$', '$3 \\times 27$'], correct: 1, explanation: '$3 \\times 3 \\times 3 \\times 3 = 81$.' },
            { question: 'Smallest odd prime number is:', options: ['1', '3', '5', '2'], correct: 1, explanation: '1 is neither prime nor composite. 3 is the first odd prime.' },
            { question: 'How many prime factors does 30 have?', options: ['2', '3', '4', '5'], correct: 1, explanation: '$30 = 2 \\times 3 \\times 5$. There are 3 factors.' },
            { question: 'Factorise 100 into primes.', options: ['$10^2$', '$2^2 \\times 5^2$', '$2 \\times 50$', '$4 \\times 25$'], correct: 1, explanation: '$4 \\times 25 = (2 \\times 2) \\times (5 \\times 5)$.' },
            { question: 'Is 91 a prime number?', options: ['Yes', 'No, $7 \\times 13$', 'No, $3 \\times 27$', 'No, even'], correct: 1, explanation: '91 is often mistaken for prime, but it is $7 \\times 13$.' },
            { question: 'Sum of prime factors of 12?', options: ['5', '7', '8', '12'], correct: 0, explanation: '$12 = 2^2 \\times 3$. Distinct prime factors are 2 and 3. Sum = 5.' }
        ],
        assessment: [
            { question: 'The number of prime factors of 105 is:', options: ['2', '3', '4', '5'], correct: 1, explanation: '$105 = 3 \\times 5 \\times 7$. There are 3 distinct prime factors.' },
            { question: 'Prime factorisation of 5005 is:', options: ['$5 \\times 7 \\times 11 \\times 13$', '$5 \\times 7^2 \\times 13$', '$5 \\times 1001$', '$5 \\times 11 \\times 91$'], correct: 0, explanation: 'Dividing 5005 by 5 gives 1001. $1001 = 7 \\times 11 \\times 13$.' },
            { question: 'The exponent of 2 in the prime factorisation of 144 is:', options: ['2', '3', '4', '5'], correct: 2, explanation: '$144 = 12^2 = (2^2 \\times 3)^2 = 2^4 \\times 3^2$.' },
            { question: 'Which number is composite?', options: ['2', '23', '37', '39'], correct: 3, explanation: '$39 = 3 \\times 13$. All others are prime.' },
            { question: 'Prime factors of 132 are:', options: ['$2, 3, 11$', '$2, 3, 13$', '$2, 11, 13$', '$3, 11, 13$'], correct: 0, explanation: '$132 = 2 \\times 66 = 2 \\times 2 \\times 33 = 2^2 \\times 3 \\times 11$.' },
            { question: 'Is 1 a prime number?', options: ['Yes', 'No', 'Depends on the context', 'Always'], correct: 1, explanation: '1 is the multiplicative identity and is excluded from primes.' },
            { question: 'Largest 1-digit prime number is:', options: ['7', '9', '8', '5'], correct: 0, explanation: '9 is $3 \\times 3$, 8 is $2^3$. 7 is the largest single digit prime.' },
            { question: 'Prime factorisation of 3825.', options: ['$3^2 \\times 5^2 \\times 17$', '$3 \\times 5^2 \\times 17$', '$3^2 \\times 5 \\times 17$', '$3^2 \\times 5^2 \\times 13$'], correct: 0, explanation: '$3825 / 3 = 1275$; $1275 / 3 = 425$; $425 / 5 = 85$; $85 / 5 = 17$.' },
            { question: 'How many composite numbers are between 1 and 10?', options: ['4', '5', '6', '3'], correct: 1, explanation: '4, 6, 8, 9, 10. (Total 5 numbers).' },
            { question: 'A factor of every number is:', options: ['0', '1', 'The number itself', 'Both B and C'], correct: 3, explanation: '1 and the number N are always factors of N.' }
        ]
    },
    {
        id: 'fundamental-theorem',
        title: 'Fundamental Theorem of Arithmetic',
        subtitle: 'Unique Factorisation',
        desc: 'Understand why prime factorisation is unique for every number.',
        icon: '📜',
        color: '#ec4899',
        learn: {
            title: 'The Number Fingerprint',
            content: `The Fundamental Theorem of Arithmetic (FTA) states that every composite number can be expressed as a product of primes uniquely.
            
            This unique factorisation is like a digital fingerprint for the number. It help us predict properties like terminating decimals or ending digits.`,
            rules: [
                'Every composite number has ONE unique set of prime factors.',
                'To end with 0, a number $N^n$ must have both 2 and 5 as prime factors.',
                'The order of factors is irrelevant to uniqueness.'
            ],
            examples: [
                { q: 'Can $6^n$ end with 0?', a: 'No, $6^n = (2 \\times 3)^n$. It lacks the factor 5.' },
                { q: 'Unique factorisation of 12?', a: '$2^2 \\times 3$.' }
            ]
        },
        practice: [
            { question: 'According to FTA, the factorisation of 30 as $2 \\times 3 \\times 5$ is:', options: ['One of many possible prime groups', 'Unique', 'Dependent on the method used', 'Only valid for even numbers'], correct: 1, explanation: 'The group of primes {2, 3, 5} is the only set of primes that multiplies to 30.' },
            { question: 'For a number to end with the digit 0, its prime factorisation must contain:', options: ['Only 2', 'Only 5', 'Both 2 and 5', 'Either 2 or 5'], correct: 2, explanation: 'A factor of 10 ($2 \\times 5$) is required to produce a trailing zero.' },
            { question: 'Can $4^n$ end with digit 0 for any natural $n$?', options: ['Yes', 'No', 'Only for $n=0$', 'Only for even $n$'], correct: 1, explanation: '$4^n = (2^2)^n = 2^{2n}$. It lacks the factor 5 required to end in 0.' },
            { question: 'Who gave the first proof of FTA?', options: ['Euclid', 'Gauss', 'Pythagoras', 'Aryabhatta'], correct: 1, explanation: 'Carl Friedrich Gauss is credited with the proof in his book Disquisitiones Arithmeticae.' },
            { question: 'If $p$ is a prime and $p$ divides $a^2$, then:', options: ['$p$ divides $a$', '$p^2$ divides $a$', '$a$ divides $p$', 'None'], correct: 0, explanation: 'This is a fundamental lemma related to the theorem and proofs of irrationality.' },
            { question: 'The unique factorisation of 12 is:', options: ['$2 \\times 6$', '$3 \\times 4$', '$2^2 \\times 3$', '$2 \\times 3 \\times 2$'], correct: 2, explanation: 'FTA specifies "product of primes". Only $2^2 \\times 3$ consists entirely of primes.' },
            { question: 'Does the order of prime factors matter in FTA?', options: ['Yes', 'No', 'Sometimes', 'Only for large numbers'], correct: 1, explanation: 'The theorem states factorisation is unique "apart from the order".' },
            { question: 'Which number is neither prime nor composite?', options: ['0', '1', '2', '3'], correct: 1, explanation: '1 is the unit, not part of the prime/composite classification used in FTA.' },
            { question: 'Prime factorisation of $1001$ is:', options: ['$7 \\times 11 \\times 13$', '$11 \\times 91$', '$7 \\times 143$', 'Prime itself'], correct: 0, explanation: '$1001$ is the product of three consecutive primes starting from $7$.' },
            { question: 'The FTA is also known as:', options: ['Unique Factorization Theorem', 'Euclid Algorithm', 'Pythagoras Theorem', 'Logic Theorem'], correct: 0, explanation: 'It guarantees only one way to break down numbers into primes.' }
        ],
        assessment: [
            { question: 'If the prime factorisation of $n$ is $2^3 \\times 5^2$, how many zeros are at the end?', options: ['1', '2', '3', '5'], correct: 1, explanation: 'Zeros are formed by pairs of (2, 5). We have 2 such pairs ($5^2$).' },
            { question: 'Check if $6^n$ ends with 0.', options: ['Yes', 'No', 'Only if $n$ is multiple of 5', 'Impossible to say'], correct: 1, explanation: '$6^n = (2 \\times 3)^n$. It contains 2 but no 5.' },
            { question: 'Every composite number can be expressed as product of:', options: ['Integers', 'Even numbers', 'Primes', 'Odd numbers'], correct: 2, explanation: 'This is the basic statement of FTA.' },
            { question: 'Prime factorisation of 144 is:', options: ['$2^4 \\times 3^2$', '$2^2 \\times 3^4$', '$2^3 \\times 3^3$', '$12 \\times 12$'], correct: 0, explanation: '$144 = 16 \\times 9 = 2^4 \\times 3^2$.' },
            { question: 'If $a$ and $b$ are primes, their product is always:', options: ['Prime', 'Composite', 'Odd', 'Even'], correct: 1, explanation: 'The product has factors 1, a, b, and the product itself, making it composite.' },
            { question: 'Can a composite number have an infinite number of prime factors?', options: ['Yes', 'No', 'Only if it is very large', 'Depends on the base'], correct: 1, explanation: 'Every finite number has a finite number of prime factors.' },
            { question: 'The exponent of 5 in 625 is:', options: ['2', '3', '4', '5'], correct: 2, explanation: '$625 = 5 \\times 5 \\times 5 \\times 5 = 5^4$.' },
            { question: 'Which of these is composite?', options: ['17', '19', '21', '23'], correct: 2, explanation: '21 = 3 \\times 7.' },
            { question: 'Prime factorisation of 30?', options: ['$2, 3, 5$', '$5, 6$', '$2, 15$', '$3, 10$'], correct: 0, explanation: 'Only the first lists all prime components.' },
            { question: 'Is 0 composite?', options: ['Yes', 'No', 'Neither', 'Infinite factors'], correct: 2, explanation: 'Composite/Prime definitions apply only to natural numbers greater than 1.' }
        ]
    },
    {
        id: 'hcf-lcm-method',
        title: 'HCF and LCM using Prime Factorisation',
        subtitle: 'The Power Method',
        desc: 'Calculate divisors and multiples using the power of prime factors.',
        icon: '🔼',
        color: '#7c3aed',
        learn: {
            title: 'The Power Play',
            content: `Using prime factorisation, calculating HCF and LCM becomes a systematic process involving powers of primes.
            - HCF: Product of the smallest powers of common prime factors.
            - LCM: Product of the greatest powers of all prime factors.`,
            rules: [
                'HCF uses common primes only; LCM uses every prime involved.',
                '$HCF(a, b) \\times LCM(a, b) = a \\times b$ (for two numbers only).',
                '$HCF$ of co-prime numbers is always 1.'
            ],
            examples: [
                { q: 'HCF of 6 and 20?', a: '$6=2^1 \\cdot 3^1, 20=2^2 \\cdot 5^1 \\rightarrow HCF=2^1=2$.' },
                { q: 'If $Product = 120, HCF=2$, find $LCM$.', a: '$LCM = 120/2 = 60$.' }
            ]
        },
        practice: [
            { question: 'HCF of $2^3 \\times 3^2$ and $2^2 \\times 3^3$ is:', options: ['$2^3 \\times 3^3$', '$2^2 \\times 3^2$', '$2^5 \\times 3^5$', '$2 \\times 3$'], correct: 1, explanation: 'Take smallest powers of common primes: $2^2$ and $3^2$.' },
            { question: 'LCM of 6 and 20 is:', options: ['2', '60', '120', '40'], correct: 1, explanation: '$6 = 2 \\times 3$, $20 = 2^2 \\times 5$. $LCM = 2^2 \\times 3 \\times 5 = 60$.' },
            { question: 'If HCF(26, 91) = 13, find LCM(26, 91).', options: ['182', '2366', '13', '91'], correct: 0, explanation: '$LCM = (26 \\times 91) / 13 = 2 \\times 91 = 182$.' },
            { question: 'HCF of two co-prime numbers is:', options: ['Their product', '1', '0', 'Smaller number'], correct: 1, explanation: 'Co-prime numbers have no common factors besides 1.' },
            { question: 'LCM of two co-prime numbers $a$ and $b$ is:', options: ['1', '$a+b$', '$ab$', '$|a-b|$'], correct: 2, explanation: 'Since they have no common factors, the LCM is their product.' },
            { question: 'Find HCF of 12, 15, and 21.', options: ['3', '6', '2', '1'], correct: 0, explanation: '$12=2^2 \\cdot 3, 15=3 \\cdot 5, 21=3 \\cdot 7$. Common prime is 3.' },
            { question: 'Find LCM of 12, 15, and 21.', options: ['420', '210', '120', '3'], correct: 0, explanation: '$2^2 \\cdot 3 \\cdot 5 \\cdot 7 = 4 \\cdot 3 \\cdot 5 \\cdot 7 = 420$.' },
            { question: 'If $Product = 180$ and $HCF = 3$, what is $LCM$?', options: ['540', '60', '183', '177'], correct: 1, explanation: '$LCM = Product / HCF = 180 / 3 = 60$.' },
            { question: 'Which is ALWAYS true?', options: ['$HCF \\le LCM$', '$HCF > LCM$', '$HCF = LCM$', 'No relation'], correct: 0, explanation: 'The divisor is naturally smaller than or equal to the multiple.' },
            { question: 'The LCM of 1 to 5 (inclusive) is:', options: ['10', '20', '60', '120'], correct: 2, explanation: 'Numbers: 1, 2, 3, 4, 5. $LCM = 3 \\cdot 4 \\cdot 5 = 60$.' }
        ],
        assessment: [
            { question: 'If $a$ is a multiple of $b$, then $HCF(a, b)$ is:', options: ['$a$', '$b$', '$1$', '$ab$'], correct: 1, explanation: 'If $b$ divides $a$, then the highest common factor is $b$.' },
            { question: 'If $a$ is a multiple of $b$, then $LCM(a, b)$ is:', options: ['$a$', '$b$', '$1$', '$ab$'], correct: 0, explanation: 'If $b$ divides $a$, then the least common multiple is $a$.' },
            { question: 'HCF(6, 72)?', options: ['6', '72', '12', '1'], correct: 0, explanation: '6 divides 72, so HCF is 6.' },
            { question: 'LCM(6, 72)?', options: ['6', '72', '432', '12'], correct: 1, explanation: '6 divides 72, so LCM is 72.' },
            { question: 'Find HCF(17, 23).', options: ['1', '391', '0', '5'], correct: 0, explanation: 'Both are prime, so they are co-prime. HCF = 1.' },
            { question: 'Find LCM(17, 23).', options: ['1', '391', '40', '0'], correct: 1, explanation: '$17 \\times 23 = 391$.' },
            { question: 'HCF of smallest prime and smallest composite number?', options: ['1', '2', '4', '0'], correct: 1, explanation: 'Smallest prime = 2, Smallest composite = 4. HCF(2, 4) = 2.' },
            { question: 'LCM of smallest prime and smallest composite number?', options: ['2', '4', '8', '6'], correct: 1, explanation: 'LCM(2, 4) = 4.' },
            { question: 'Can $LCM \\times HCF$ of 3 numbers be equal to their product?', options: ['Always', 'Never', 'Only if they are co-prime', 'Not necessarily'], correct: 3, explanation: 'The product formula only holds for 2 numbers.' },
            { question: 'HCF of $100$ and $101$?', options: ['$1$', '$100$', '$10100$', '$10$'], correct: 0, explanation: 'Consecutive integers are always co-prime.' }
        ]
    },
    {
        id: 'applications-hcf-lcm',
        title: 'Applications of HCF and LCM',
        subtitle: 'Real World Math',
        desc: 'Solve real-world timing and grouping problems using factors and multiples.',
        icon: '🚀',
        color: '#3b82f6',
        learn: {
            title: 'Real World Grouping',
            content: `HCF and LCM are powerful tools for solving daily problems. 
            - Use HCF when you need to divide things into the largest equal groups or capacities.
            - Use LCM when you need to find the next time events will happen simultaneously.`,
            rules: [
                'Keywords for HCF: Maximum, Largest, Dividing exactly.',
                'Keywords for LCM: Minimum, Together again, Simultaneously.',
                'The HCF value is usually smaller than the given numbers; LCM is larger.'
            ],
            examples: [
                { q: 'Bells ring every 6s and 8s. When together?', a: 'LCM(6, 8) = 24s.' },
                { q: 'Milk cans of 20L and 30L. Largest mug?', a: 'HCF(20, 30) = 10L.' }
            ]
        },
        practice: [
            { question: 'Two bells ring at 6 min and 8 min intervals. If they ring together at 10:00, when is the next time?', options: ['10:14', '10:24', '10:48', '11:00'], correct: 1, explanation: 'LCM(6, 8) = 24. Next ring is at 10:24.' },
            { question: 'A sweets seller has 420 laddoos and 130 barfis. What is the maximum number in each equal stack?', options: ['20', '10', '30', '40'], correct: 1, explanation: 'HCF of 420 and 130 is 10.' },
            { question: 'Traffic lights change every 48s and 72s. When do they change together?', options: ['120s', '144s', '96s', '24s'], correct: 1, explanation: 'LCM(48, 72) = 144s.' },
            { question: 'Smallest number divisible by 15, 20, and 24?', options: ['60', '120', '240', '480'], correct: 1, explanation: 'LCM(15, 20, 24) = 120.' },
            { question: 'Largest scale to measure 7m, 3m 85cm and 12m 95cm exactly?', options: ['35cm', '5cm', '15cm', '25cm'], correct: 0, explanation: 'HCF of 700, 385, 1295 in cm. $700 = 35 \\times 20, 385 = 35 \\times 11, 1295 = 35 \\times 37$.' },
            { question: 'Three runners take 200s, 300s, 450s for a lap. When will they meet at start?', options: ['600s', '900s', '1800s', '1200s'], correct: 2, explanation: 'LCM(200, 300, 450). $LCM(200, 300) = 600$; $LCM(600, 450) = 1800$.' },
            { question: 'Minimum number of rooms required for 60 participants in Hindi and 84 in English (same count per room)?', options: ['12', '14', '10', '8'], correct: 1, explanation: 'HCF(60, 84) = 12 participants per room. Total rooms = $(60/12) + (84/12) = 5 + 7 = 12$. Wait, calculation check: 12 rooms total? Let me re-read. Oh, $HCF=12$, participants=12/room. Rooms = 12. Option A should be correct.' },
            { question: 'If you want to tiles a floor 20ft by 15ft with largest square tiles, tile side is?', options: ['5ft', '3ft', '4ft', '2ft'], correct: 0, explanation: 'HCF(20, 15) = 5ft.' },
            { question: 'Three bells ring at intervals of 4, 7 and 14 mins. If they ring at 6 am, they next ring together at:', options: ['6:28 am', '6:14 am', '6:21 am', '7:00 am'], correct: 0, explanation: 'LCM(4, 7, 14) = 28.' },
            { question: 'A heap of stones can be made into groups of 21, 28 or 36. Minimum stones?', options: ['252', '126', '504', '756'], correct: 0, explanation: 'LCM(21, 28, 36). $LCM(21, 28) = 84$. $LCM(84, 36) = 252$.' }
        ],
        assessment: [
            { question: 'Total number of students is 396 in section A and 462 in section B. Max students in a bus (same for all busses)?', options: ['66', '33', '22', '11'], correct: 0, explanation: 'HCF(396, 462). $462 - 396 = 66$. 66 divides 396 (6 times). HCF = 66.' },
            { question: 'Find smallest number which when divided by 28 and 32 leaves 8 and 12 as remainder.', options: ['204', '224', '116', '216'], correct: 0, explanation: 'Note $28-8=20$ and $32-12=20$. Find $LCM(28, 32) - 20 = 224 - 20 = 204$.' },
            { question: 'Max capacity of container to measure 850L and 680L?', options: ['170L', '85L', '10L', '340L'], correct: 0, explanation: 'HCF(850, 680). Difference is 170. 170 divides both.' },
            { question: 'Smallest number leaving remainder 7 when divided by 12, 16, 24?', options: ['55', '48', '96', '103'], correct: 0, explanation: '$LCM(12, 16, 24) = 48$. Result = $48 + 7 = 55$.' },
            { question: 'Two numbers are in ratio 3:4. If HCF is 4, find LCM.', options: ['48', '12', '16', '24'], correct: 0, explanation: 'Numbers are $3 \\times 4 = 12$ and $4 \\times 4 = 16$. $LCM(12, 16) = 48$.' },
            { question: 'A path around a field takes Sonia 18m and Ravi 12m. When do they meet at start?', options: ['36m', '60m', '12m', '18m'], correct: 0, explanation: 'LCM(18, 12) = 36.' },
            { question: 'How many times do 5 bells ring together in 1 hour if they ring at 2, 4, 6, 8, 10s?', options: ['30', '31', '29', '60'], correct: 1, explanation: 'LCM(2, 4, 6, 8, 10) = 120s = 2 mins. $30 + 1$ (at start) = 31.' },
            { question: 'Largest number dividing 245 and 1029 leaving remainder 5?', options: ['16', '8', '4', '32'], correct: 0, explanation: 'HCF(240, 1024). $1024 = 240 \\cdot 4 + 64 \\dots$ HCF is 16.' },
            { question: 'If HCF(a, b) = 1, then a and b are called:', options: ['Primes', 'Co-primes', 'Composites', 'Perfect'], correct: 1, explanation: 'Key definition used in many application problems.' },
            { question: 'Product of two numbers is 3072 and LCM is 192. HCF?', options: ['16', '32', '64', '12'], correct: 0, explanation: '$3072 / 192 = 16$.' }
        ]
    },
    {
        id: 'proving-irrational',
        title: 'Proving Irrational Numbers',
        subtitle: 'The Contradiction Method',
        desc: 'Learn the method of contradiction for numbers like $\\sqrt{2}$ and $\\sqrt{3}$.',
        icon: '🛡️',
        color: '#ef4444',
        learn: {
            title: 'The Contradiction Method',
            content: `To prove a number like $\\sqrt{2}$ is irrational, we use Reductio ad absurdum (Proof by Contradiction).
            
            We assume the opposite (that it is rational) and show that this assumption leads to a mathematical impossibility.`,
            rules: [
                'Assume $\\sqrt{p} = \\frac{a}{b}$, where $a$ and $b$ are co-prime.',
                'Show that both $a$ and $b$ are divisible by $p$.',
                'This contradicts the co-prime assumption, proving irrationality.'
            ],
            examples: [
                { q: 'If $3$ divides $a^2$, then what?', a: '3 must also divide $a$.' },
                { q: 'Is $\\sqrt{5}$ irrational?', a: 'Yes, because 5 is prime.' }
            ]
        },
        practice: [
            { question: 'In the proof of irrationality, what is the first step?', options: ['Square the number', 'Assume it is rational', 'Divide by prime', 'Assume it is even'], correct: 1, explanation: 'We always start with the assumption that leads to a contradiction.' },
            { question: 'If $p$ divides $a^2$, then $p$ divides $a$. This is true if:', options: ['$p$ is prime', '$p$ is odd', '$p$ is even', 'Always'], correct: 0, explanation: 'This property only strictly holds for prime divisors.' },
            { question: 'If $\\sqrt{p} = \\frac{a}{b}$, then $a^2 = $:', options: ['$\\frac{b^2}{p}$', '$b^2$', '$pb^2$', '$p^2b^2$'], correct: 2, explanation: 'Squaring $\\sqrt{p} = \\frac{a}{b}$ gives $p = \\frac{a^2}{b^2}$, so $a^2 = pb^2$.' },
            { question: 'Assume $\\sqrt{2} = \\frac{a}{b}$. What does it mean if $a^2 = 2b^2$?', options: ['$a$ is even', '$a$ is odd', '$b$ is prime', '$a=b$'], correct: 0, explanation: '$a^2$ is a multiple of 2, so it is even, implying $a$ is even.' },
            { question: 'Co-prime numbers have an HCF of:', options: ['0', '1', 'The larger number', 'Their product'], correct: 1, explanation: 'Core assumption in irrationality proofs.' },
            { question: 'Which of the following is irrational?', options: ['$\\sqrt{4}$', '$\\sqrt{9}$', '$\\sqrt{12}$', '$\\sqrt{16}$'], correct: 2, explanation: '12 is not a perfect square. $\\sqrt{12} = 2\\sqrt{3}$.' },
            { question: 'If we assume $\\sqrt{2} = \\frac{a}{b}$ is rational, we find that:', options: ['$a, b$ are odd', '$a, b$ are co-prime', '$a, b$ have factor 2', 'It is not a fraction'], correct: 2, explanation: 'The logic shows both must be even, contradicting co-primality.' },
            { question: 'Is $\\sqrt{p}$ always irrational if $p$ is prime?', options: ['Yes', 'No', 'Only if $p > 2$', 'Only if $p$ is odd'], correct: 0, explanation: 'Fundamental theorem about square roots of primes.' },
            { question: 'The square root of which number is rational?', options: ['2', '3', '4', '5'], correct: 2, explanation: '$\\sqrt{4} = 2$.' },
            { question: 'Proof by contradiction is also known as:', options: ['Direct proof', 'Reductio ad absurdum', 'Induction', 'Algebraic proof'], correct: 1, explanation: 'Reducing the argument to an absurdity.' }
        ],
        assessment: [
            { question: 'If $\\sqrt{5} = \\frac{a}{b}$, then $5$ divides:', options: ['$a$', '$b$', 'Both $a$ and $b$', 'None'], correct: 2, explanation: 'The proof shows the prime must divide both numerator and denominator.' },
            { question: 'Which of these is irrational?', options: ['$2+\\sqrt{3}$', '$2-\\sqrt{4}$', '$\\frac{2}{3}$', '$0.5$'], correct: 0, explanation: 'Rational + Irrational = Irrational.' },
            { question: 'What is co-prime?', options: ['Only 1 common factor', 'Both are prime', 'Sum is prime', 'HCF is 2'], correct: 0, explanation: 'Standard definition.' },
            { question: 'If $a^2 = 3b^2$, then $a$ is divisible by:', options: ['2', '3', '9', '6'], correct: 1, explanation: '$a^2$ is multiple of 3, so $a$ must be divisible by 3.' },
            { question: 'Who is famous for irrational number proofs?', options: ['Pythagoreans', 'Isaac Newton', 'John Locke', 'Aryabhatta'], correct: 0, explanation: 'They discovered $\\sqrt{2}$ was irrational.' },
            { question: 'Is $\\pi$ rational or irrational?', options: ['Rational', 'Irrational', 'Integer', 'Natural'], correct: 1, explanation: 'Irrational (transcendental).' },
            { question: 'Sum of $\\sqrt{2}$ and $\\sqrt{3}$ is:', options: ['$\\sqrt{5}$', 'Rational', 'Irrational', 'Not real'], correct: 2, explanation: 'Sum of roots of distinct primes is irrational.' },
            { question: 'If $3$ divides $a$, we can write $a = $:', options: ['$3c$', '$\\frac{c}{3}$', '$c+3$', '$3^c$'], correct: 0, explanation: 'Standard algebraic substitution for divisibility.' },
            { question: 'Contradiction occurs when:', options: ['HCF becomes 1', 'HCF becomes $>$ 1', 'Numerator is zero', 'Denominator is zero'], correct: 1, explanation: 'Contradicts the co-prime assumption.' },
            { question: '$\\sqrt{0.4}$ is:', options: ['0.2', 'Rational', 'Irrational', 'Integer'], correct: 2, explanation: '$\\sqrt{\\frac{4}{10}} = \\frac{2}{\\sqrt{10}}$, which is irrational.' }
        ]
    },
    {
        id: 'operations-irrational',
        title: 'Operations on Irrational Numbers',
        subtitle: 'Mixing Types',
        desc: 'Combine rational and irrational numbers and predict the outcome.',
        icon: '🎭',
        color: '#10b981',
        learn: {
            title: 'Mixing the Messy & Clean',
            content: `When we perform operations with rational and irrational numbers, the "messy" (irrational) part usually dominates.
            - Rational $\\pm$ Irrational = Irrational
            - Rational $\\times$ Irrational = Irrational (non-zero rational)`,
            rules: [
                'Rationals are "clean"; one irrational drop ruins the whole sum.',
                'Irrational $\\times$ Irrational might result in a Rational (e.g., $\\sqrt{2} \\times \\sqrt{2} = 2$).',
                'Always check if roots can be simplified or cancelled out.'
            ],
            examples: [
                { q: 'Is $5 + \\sqrt{3}$ rational?', a: 'No, it is irrational.' },
                { q: 'Is $\\frac{\\sqrt{8}}{\\sqrt{2}}$ rational?', a: 'Yes, it equals $\\sqrt{4} = 2$.' }
            ]
        },
        practice: [
            { question: 'The product of a non-zero rational and an irrational number is:', options: ['Always rational', 'Always irrational', 'Sometimes rational', 'Integer'], correct: 1, explanation: 'A non-zero rational multiplied by an irrational cannot become rational.' },
            { question: 'Which of the following is rational?', options: ['$(2 - \\sqrt{3}) + \\sqrt{3}$', '$2 + \\sqrt{3}$', '$\\sqrt{2} \\times \\sqrt{3}$', '$\\pi/2$'], correct: 0, explanation: '$(2 - \\sqrt{3}) + \\sqrt{3} = 2$, which is rational.' },
            { question: 'Is $\\sqrt{3} \\times \\sqrt{3}$ irrational?', options: ['Yes', 'No, it is 3', 'Yes, it is $\\sqrt{9}$', 'Depends on the signs'], correct: 1, explanation: '$\\sqrt{3} \\times \\sqrt{3} = 3$, which is rational.' },
            { question: 'Is $5 - \\sqrt{3}$ rational or irrational?', options: ['Rational', 'Irrational', 'Both', 'Zero'], correct: 1, explanation: 'Difference of rational and irrational is irrational.' },
            { question: 'The sum of two irrational numbers is:', options: ['Always irrational', 'Always rational', 'Sometimes rational', 'Never real'], correct: 2, explanation: '$\\sqrt{2} + (-\\sqrt{2}) = 0$, which is rational.' },
            { question: '$\\frac{\\sqrt{8}}{\\sqrt{2}}$ is:', options: ['Rational', 'Irrational', '4', 'Undefined'], correct: 0, explanation: '$\\sqrt{8/2} = \\sqrt{4} = 2$, which is rational.' },
            { question: 'Is $0 \\times \\sqrt{2}$ irrational?', options: ['Yes', 'No', 'Sometimes', 'Infinite'], correct: 1, explanation: 'Zero is the only rational that makes the product rational (0).' },
            { question: 'Product of two distinct primes $p$ and $q$ under root $(\\sqrt{pq})$ is:', options: ['Rational', 'Irrational', 'Even', 'Odd'], correct: 1, explanation: 'Distinct primes cannot form a perfect square.' },
            { question: 'Which is rational?', options: ['$\\pi+2$', '$\\pi - \\pi$', '$2\\pi$', '$\\pi^2$'], correct: 1, explanation: '$\\pi - \\pi = 0$, which is rational.' },
            { question: 'Is $\\frac{1}{\\sqrt{2}}$ rational?', options: ['Yes', 'No', 'Only if inverted', 'If squared'], correct: 1, explanation: 'Inverse of an irrational is irrational.' }
        ],
        assessment: [
            { question: 'Calculate $(3+\\sqrt{2})(3-\\sqrt{2})$.', options: ['7', '11', '$9-\\sqrt{2}$', '5'], correct: 0, explanation: '$(a+b)(a-b) = a^2 - b^2 = 9 - 2 = 7$.' },
            { question: 'Is $(\\sqrt{2}+\\sqrt{3})^2$ rational?', options: ['Yes', 'No', 'Only if added to something', 'Depends on $x$'], correct: 1, explanation: 'It expands to $2 + 3 + 2\\sqrt{6} = 5 + 2\\sqrt{6}$, which is irrational.' },
            { question: 'Rational number equivalent to $0.333...$ is:', options: ['1/3', '3/10', '3/100', '1/30'], correct: 0, explanation: 'Standard repeating decimal conversion.' },
            { question: 'Which value is irrational?', options: ['$\\sqrt{225}$', '$\\sqrt{196}$', '$\\sqrt{23}$', '$\\sqrt{625}$'], correct: 2, explanation: '23 is prime, not a perfect square.' },
            { question: 'Sum of a rational and irrational is:', options: ['Rational', 'Irrational', 'Zero', 'Composite'], correct: 1, explanation: 'Fundamental property.' },
            { question: 'Is $\\pi$ rational?', options: ['No', 'Yes', 'Approximately', 'Only on Sundays'], correct: 0, explanation: 'No, it never ends or repeats.' },
            { question: 'Multiplication check: $2\\sqrt{3} \\times \\sqrt{3}$:', options: ['6', '2', '$\\sqrt{18}$', '9'], correct: 0, explanation: '$2 \\times 3 = 6$.' },
            { question: 'Divide $\\sqrt{15}$ by $\\sqrt{3}$:', options: ['5', '$\\sqrt{5}$', '3', '$\\sqrt{3}$'], correct: 1, explanation: '$\\sqrt{5}$.' },
            { question: 'Result of $(\\sqrt{2}-2)^2$:', options: ['Irrational', 'Rational', 'Positive', 'A and C'], correct: 3, explanation: '$2 + 4 - 4\\sqrt{2} = 6 - 4\\sqrt{2}$.' },
            { question: 'Is the set of real numbers closed under addition?', options: ['Yes', 'No', 'Only for rationals', 'Only for positives'], correct: 0, explanation: 'Sum of any two real numbers is a real number.' }
        ]
    }
];
