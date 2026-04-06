/**
 * CubesSkillsData.js
 * NCERT Class 8 Mathematics — Chapter 7: Cubes and Cube Roots
 * 
 * Each skill has:
 * - practice: 20 unique questions (includes MCQ, T/F, Fill)
 * - assess: 10 unique MCQ/TF questions (no overlap with practice)
 */

export const findingPerfectCubes = {
    practice: [
        { type: 'mcq', question: 'Which of the following numbers is a perfect cube?', options: ['$125$', '$36$', '$75$', '$100$'], correct: 0, explanation: '$5^3 = 125$.' },
        { type: 'fill', question: 'The cube of $6$ is _____.', correctValue: 216, explanation: '$6 \times 6 \times 6 = 216$.' },
        { type: 'truefalse', question: 'The cube of an even number is always an even number.', options: ['True', 'False'], correct: 0, explanation: 'Even $\times$ Even $\times$ Even is always Even.' },
        { type: 'mcq', question: 'If a number ends with $1$, its cube ends with:', options: ['$1$', '$3$', '$7$', '$9$'], correct: 0, explanation: 'Numbers ending in $1$ (like $11, 21$) always have cubes ending in $1$.' },
        { type: 'mcq', question: 'Which of the following is NOT a perfect cube?', options: ['$8$', '$27$', '$64$', '$90$'], correct: 3, explanation: '$4^3=64, 5^3=125$. $90$ is not a cube.' },
        { type: 'fill', question: 'The cube of $11$ is _____.', correctValue: 1331, explanation: '$11 \times 11 \times 11 = 1331$.' },
        { type: 'mcq', question: 'The number $1729$ is known as:', options: ['Newton Number', 'Hardy-Ramanujan Number', 'Euclid Number', 'Prime Number'], correct: 1, explanation: '1729 is the smallest number expressible as the sum of two cubes in two different ways.' },
        { type: 'truefalse', question: 'A perfect cube can end with exactly two zeros.', options: ['True', 'False'], correct: 1, explanation: 'False. Perfect cubes always end in a multiple of three zeros (e.g., 1000, 1000000).' },
        { type: 'mcq', question: 'The cube of a number ending in $7$ will end in:', options: ['$1$', '$3$', '$7$', '$9$'], correct: 1, explanation: '$7 \times 7 \times 7 = 343$, which ends in $3$.' },
        { type: 'mcq', question: 'Which digit is in the units place of $8^3$?', options: ['$2$', '$4$', '$6$', '$8$'], correct: 0, explanation: '$8 \times 8 \times 8 = 512$, units digit is $2$.' },
        { type: 'fill', question: 'Sum of cubes: $1^3 + 2^3 + 3^3 + 4^3 = $ _____.', correctValue: 100, explanation: '$1 + 8 + 27 + 64 = 100$.' },
        { type: 'mcq', question: 'The cube of a negative number is:', options: ['Positive', 'Negative', 'Zero', 'Depends on the number'], correct: 1, explanation: 'e.g., $(-2)^3 = -8$.' },
        { type: 'truefalse', question: 'The cube of a single digit number can be a single digit number.', options: ['True', 'False'], correct: 0, explanation: 'True: $1^3 = 1$ and $2^3 = 8$.' },
        { type: 'mcq', question: 'Which of these is a Hardy-Ramanujan number?', options: ['$1729$', '$4104$', '$13832$', 'All of these'], correct: 3, explanation: 'All these can be expressed as sum of two cubes in two ways.' },
        { type: 'fill', question: '$1^3 + 2^3 + 3^3 = (1+2+3)^x$. Find $x$.', correctValue: 2, explanation: 'Sum of first $n$ cubes is $(\sum n)^2$.' },
        { type: 'mcq', question: 'What is the cube of $0.2$?', options: ['$0.4$', '$0.04$', '$0.8$', '$0.008$'], correct: 3, explanation: '$0.2 \times 0.2 \times 0.2 = 0.008$.' },
        { type: 'mcq', question: 'Identify the perfect cube among these:', options: ['$100$', '$1000$', '$10000$', '$10$'], correct: 1, explanation: '$10^3 = 1000$.' },
        { type: 'fill', question: 'The value of $\sqrt[3]{8} / 2$ is _____.', correctValue: 1, explanation: '$2 / 2 = 1$.' },
        { type: 'mcq', question: 'The cube root of $216$ is:', options: ['$4$', '$5$', '$6$', '$8$'], correct: 2, explanation: '$6^3 = 216$.' },
        { type: 'truefalse', question: 'The cube of an odd number is always odd.', options: ['True', 'False'], correct: 0, explanation: 'Odd $\times$ Odd $\times$ Odd is Odd.' }
    ],
    assess: [
        { type: 'mcq', question: 'Which number is a perfect cube?', options: ['$216$', '$256$', '$128$', '$500$'], correct: 0, explanation: '$6^3 = 216$.' },
        { type: 'mcq', question: 'Units digit of the cube of $53$ is:', options: ['$3$', '$9$', '$7$', '$1$'], correct: 2, explanation: '$3^3 = 27$, so ends in $7$.' },
        { type: 'mcq', question: 'The cube of $9$ is equal to:', options: ['$81$', '$729$', '$243$', '$656$'], correct: 1, explanation: '$9 \times 9 \times 9 = 729$.' },
        { type: 'truefalse', question: 'The cube of a $2$-digit number may have $7$ or more digits.', options: ['True', 'False'], correct: 1, explanation: 'False. $99^3 = 970299$ (6 digits). Max for 2-digit is 6 digits.' },
        { type: 'mcq', question: 'Smallest 3-digit perfect cube is:', options: ['$100$', '$125$', '$216$', '$343$'], correct: 1, explanation: '$5^3=125$.' },
        { type: 'mcq', question: 'Which is NOT a Hardy-Ramanujan number?', options: ['$1729$', '$4104$', '$1728$', '$13832$'], correct: 2, explanation: '$1728$ is just $12^3$.' },
        { type: 'mcq', question: 'The difference $3^3 - 2^3$ is:', options: ['$1$', '$7$', '$19$', '$37$'], correct: 2, explanation: '$27 - 8 = 19$.' },
        { type: 'truefalse', question: 'Perfect cubes of even numbers are multiples of $8$.', options: ['True', 'False'], correct: 0, explanation: 'True. $(2n)^3 = 8n^3$.' },
        { type: 'mcq', question: 'The cube of $0.1$ is:', options: ['$0.3$', '$0.01$', '$0.001$', '$0.111$'], correct: 2, explanation: '$0.1^3 = 0.001$.' },
        { type: 'mcq', question: 'The cube of $100$ will have how many zeros?', options: ['$3$', '$4$', '$6$', '$9$'], correct: 2, explanation: '$2$ zeros cubed becomes $2 \times 3 = 6$ zeros.' }
    ]
};

export const primeFactorisation = {
    practice: [
        { type: 'mcq', question: 'Prime factorisation of $216$ is:', options: ['$2^2 \\times 3^2$', '$2^3 \\times 3^3$', '$2^4 \\times 3$', '$6^3$'], correct: 1, explanation: '$216 = 8 \times 27 = 2^3 \times 3^3$.' },
        { type: 'fill', question: 'In $512 = 2^x$, what is $x$?', correctValue: 9, explanation: '$512$ is $2$ to the power $9$.' },
        { type: 'mcq', question: 'Find $\\sqrt[3]{1000}$ using prime factors.', options: ['$10$', '$100$', '$5$', '$20$'], correct: 0, explanation: '$1000 = 2^3 \\times 5^3$. Root $= 2 \\times 5 = 10$.' },
        { type: 'truefalse', question: 'To find the cube root by prime factorisation, factors must be grouped in triplets.', options: ['True', 'False'], correct: 0, explanation: 'True. Cubes require powers of 3.' },
        { type: 'mcq', question: '$\\sqrt[3]{2744} = $?', options: ['$12$', '$14$', '$16$', '$18$'], correct: 1, explanation: '$2744 = 2^3 \\times 7^3$. Root $= 2 \\times 7 = 14$.' },
        { type: 'fill', question: 'The prime factor $3$ appears _____ times in the factorisation of $729$.', correctValue: 6, explanation: '$3^6 = 729$. ($3^3 \times 3^3$).' },
        { type: 'mcq', question: 'Which prime factor of $1331$ appears as a triplet?', options: ['$7$', '$11$', '$13$', '$17$'], correct: 1, explanation: '$1331 = 11 \\times 11 \\times 11$.' },
        { type: 'truefalse', question: 'If prime factorisation of $n$ is $3^3 \times 5^2$, $n$ is a perfect cube.', options: ['True', 'False'], correct: 1, explanation: 'False. $5^2$ is not a triplet.' },
        { type: 'mcq', question: 'Find $\\sqrt[3]{8000}$.', options: ['$20$', '$40$', '$80$', '$10$'], correct: 0, explanation: '$8000 = 2^3 \\times 10^3 = (20)^3$.' },
        { type: 'fill', question: 'Prime factors of $64$ are $2^x$. $x = $ ____.', correctValue: 6, explanation: '$2^6 = 64$.' },
        { type: 'mcq', question: 'Cube root of $3375$ is:', options: ['$15$', '$25$', '$35$', '$45$'], correct: 0, explanation: '$3375 = 3^3 \\times 5^3$. Root $= 3 \\times 5 = 15$.' },
        { type: 'fill', question: 'The smallest prime factor of $1728$ is _____.', correctValue: 2, explanation: '$1728$ is even, so $2$ is a prime factor.' },
        { type: 'truefalse', question: '9261 is a perfect cube.', options: ['True', 'False'], correct: 0, explanation: 'True. $9261 = 21^3 = 3^3 \\times 7^3$.' },
        { type: 'mcq', question: 'Prime factorisation of $512$ is:', options: ['$2^9$', '$2^8$', '$2^{10}$', '$2^6$'], correct: 0, explanation: '$2^9 = 512$.' },
        { type: 'fill', question: '$\\sqrt[3]{1728} = 2 \\times 2 \\times x$. Find $x$.', correctValue: 3, explanation: 'Root is $12$. $2 \times 2 \times 3 = 12$.' },
        { type: 'mcq', question: 'Which prime factor in $10648$ is a triplet?', options: ['$2$ and $11$', '$2$ and $3$', '$3$ and $11$', '$only 2$'], correct: 0, explanation: '$10648 = 2^3 \\times 11^3$.' },
        { type: 'mcq', question: 'Prime factorisation of $15625$ ends in which prime base?', options: ['$3$', '$5$', '$7$', '$11$'], correct: 1, explanation: '$5^6 = 15625$.' },
        { type: 'fill', question: 'Count of triplets in $2^3 \\times 5^3 \\times 7^3$ is _____.', correctValue: 3, explanation: '$2, 5, 7$ are all triplets.' },
        { type: 'truefalse', question: 'Every prime factor of a perfect cube appears in sets of 3.', options: ['True', 'False'], correct: 0, explanation: 'Definition of perfect cube.' },
        { type: 'mcq', question: '$\\sqrt[3]{a^3 \\times b^3}$ is:', options: ['$a \\times b$', '$a^2 \\times b^2$', '$a+b$', '$3ab$'], correct: 0, explanation: 'Take one from each triplet.' }
    ],
    assess: [
        { type: 'mcq', question: 'Find $\\sqrt[3]{1331}$.', options: ['$11$', '$13$', '$17$', '$19$'], correct: 0, explanation: '$11^3 = 1331$.' },
        { type: 'mcq', question: 'Prime factorisation of $3375$ involves which set of primes?', options: ['$3$ and $5$', '$2$ and $3$', '$5$ and $7$', '$2, 3$ and $5$'], correct: 0, explanation: '$3^3 \\times 5^3$.' },
        { type: 'mcq', question: 'What is the cube root of $5832$?', options: ['$12$', '$18$', '$22$', '$28$'], correct: 1, explanation: '$5832 = 2^3 \\times 3^6 = (2 \\times 3^2)^3 = 18^3$.' },
        { type: 'truefalse', question: 'The cube root of $12000$ can be found as an integer via prime factorisation.', options: ['True', 'False'], correct: 1, explanation: 'False. $12000$ is not a perfect cube.' },
        { type: 'mcq', question: 'Select the prime factorisation of $1728$:', options: ['$2^6 \\times 3^3$', '$2^3 \\times 3^6$', '$2^9$', '$2^4 \\times 3^4$'], correct: 0, explanation: '$2^6 \\times 3^3 = 64 \times 27 = 1728$.' },
        { type: 'mcq', question: 'Which is the cube root of $4096$?', options: ['$14$', '$16$', '$18$', '$24$'], correct: 1, explanation: '$16^3 = 4096$.' },
        { type: 'mcq', question: 'Total factors of $2$ in prime factorisation of $8000$ is:', options: ['$3$', '$6$', '$9$', '$5$'], correct: 1, explanation: '$8000 = 2^6 \\times 5^3$.' },
        { type: 'truefalse', question: '$11$ is the only prime factor of $1331$.', options: ['True', 'False'], correct: 0, explanation: 'True. $1331 = 11^3$.' },
        { type: 'mcq', question: 'Prime factors of $12167$ are triplets of which prime?', options: ['$21$', '$23$', '$27$', '$29$'], correct: 1, explanation: '$23 \times 23 \times 23 = 12167$.' },
        { type: 'mcq', question: 'If $\\sqrt[3]{x} = 21$, then $x$ is:', options: ['$441$', '$9261$', '$8261$', '$2100$'], correct: 1, explanation: '$21^3 = 9261$.' }
    ]
};

export const estimatingRoots = {
    practice: [
        { type: 'mcq', question: 'Estimate unit digit of $\\sqrt[3]{17576}$.', options: ['$2$', '$4$', '$6$', '$8$'], correct: 2, explanation: 'Ends in $6$, so unit digit is $6$.' },
        { type: 'mcq', question: 'In estimating $\\sqrt[3]{91125}$, the right group is:', options: ['$91$', '$125$', '$911$', '$112$'], correct: 1, explanation: 'Start from right in groups of $3$.' },
        { type: 'fill', question: 'Left group of $32768$ is _____.', correctValue: 32, explanation: 'Right group is $768$, left is $32$.' },
        { type: 'mcq', question: 'Largest perfect cube smaller than $32$ is:', options: ['$8$', '$27$', '$64$', '$1$'], correct: 1, explanation: '$3^3 = 27 < 32$.' },
        { type: 'fill', question: 'Estimated cube root of $17576$ is _____.', correctValue: 26, explanation: 'Right($576$) $\to 6$. Left($17$) $\to 2$ (since $2^3 < 17 < 3^3$). Result: $26$.' },
        { type: 'mcq', question: 'If a number has $2$ groups of three digits, its cube root has:', options: ['$1$ digit', '$2$ digits', '$3$ digits', '$6$ digits'], correct: 1, explanation: 'Number of groups $=$ number of digits in root.' },
        { type: 'truefalse', question: 'Estimating roots only works for perfect cubes.', options: ['True', 'False'], correct: 0, explanation: 'True. We assume the number is a perfect cube to use this shortcut.' },
        { type: 'mcq', question: 'Estimate $\\sqrt[3]{4913}$.', options: ['$13$', '$17$', '$23$', '$27$'], correct: 1, explanation: 'End $3 \to 7$. Left $4 \to 1$. Root $17$.' },
        { type: 'fill', question: 'Estimate root of $1331$. Result is _____.', correctValue: 11, explanation: 'End $1 \to 1$. Left $1 \to 1$. Root $11$.' },
        { type: 'mcq', question: 'Unit digit of root of $110592$ is:', options: ['$2$', '$4$', '$6$', '$8$'], correct: 3, explanation: 'Ends in $2$, so root ends in $8$ ($8^3 = 512$).' },
        { type: 'mcq', question: 'Tens digit for root of $110592$ (Left group $110$) is:', options: ['$3$', '$4$', '$5$', '$6$'], correct: 1, explanation: '$4^3 = 64, 5^3 = 125$. So tens digit is $4$.' },
        { type: 'fill', question: 'Estimate root of $110592$. Result is _____.', correctValue: 48, explanation: 'Tens: $4$, Units: $8$. Result: $48$.' },
        { type: 'mcq', question: 'Unit digit of root of $32768$ is:', options: ['$2$', '$4$', '$8$', '$6$'], correct: 0, explanation: 'Ends in $8 \to 2$ ($2^3=8$).' },
        { type: 'fill', question: 'Estimate root of $32768$. Result is _____.', correctValue: 32, explanation: 'Tens: $3$, Units: $2$. Result: $32$.' },
        { type: 'mcq', question: 'How many digits in $\\sqrt[3]{1000000}$?', options: ['$2$', '$3$', '$4$', '$7$'], correct: 1, explanation: 'Three groups ($000, 000, 1$).' },
        { type: 'truefalse', question: 'The cube root of $8$ ends in $2$.', options: ['True', 'False'], correct: 0, explanation: '$2^3 = 8$.' },
        { type: 'mcq', question: 'Estimate $\\sqrt[3]{12167}$.', options: ['$23$', '$27$', '$33$', '$37$'], correct: 0, explanation: 'End $7 \to 3$. Left $12 \to 2$. Result: $23$.' },
        { type: 'fill', question: 'Number of digits in root of $970299$ is _____.', correctValue: 2, explanation: 'Two groups ($299, 970$).' },
        { type: 'mcq', question: 'Unit digit of root of $970299$ is:', options: ['$3$', '$7$', '$9$', '$1$'], correct: 2, explanation: 'Ends in $9$, so root ends in $9$.' },
        { type: 'fill', question: 'Estimate root of $970299$. Result is _____.', correctValue: 99, explanation: 'Left $970 \to 9$ ($9^3 = 729$). Unit $9$. Result: $99$.' }
    ],
    assess: [
        { type: 'mcq', question: 'Estimate the cube root of $91125$.', options: ['$35$', '$45$', '$55$', '$25$'], correct: 1, explanation: 'Right $125 \to 5$. Left $91 \to 4$. Result: $45$.' },
        { type: 'mcq', question: 'Estimated cube root of $42875$ is:', options: ['$25$', '$35$', '$45$', '$55$'], correct: 1, explanation: 'Right $875 \to 5$. Left $42 \to 2^3=8, 3^3=27... 3^3 < 42$. Result: $35$.' },
        { type: 'mcq', question: 'Unit digit of root of $50653$ is:', options: ['$3$', '$7$', '$9$', '$1$'], correct: 1, explanation: 'Ends in $3 \to 7$.' },
        { type: 'mcq', question: 'Tens digit of root of $50653$ is:', options: ['$2$', '$3$', '$4$', '$5$'], correct: 1, explanation: '$3^3 = 27 < 50$. Result: $3$.' },
        { type: 'mcq', question: 'Total estimate for $\\sqrt[3]{50653}$ is:', options: ['$33$', '$37$', '$43$', '$47$'], correct: 1, explanation: 'Result: $37$.' },
        { type: 'mcq', question: 'Estimate $\\sqrt[3]{74088}$.', options: ['$32$', '$42$', '$52$', '$48$'], correct: 1, explanation: 'Right $088 \to 2$. Left $74 \to 4$. Result: $42$.' },
        { type: 'mcq', question: 'Estimate $\\sqrt[3]{21952}$ units digit:', options: ['$2$', '$4$', '$8$', '$6$'], correct: 2, explanation: 'Ends in $2 \to 8$.' },
        { type: 'truefalse', question: 'Cube root of $1331$ has two digits.', options: ['True', 'False'], correct: 0, explanation: 'True. Groups: $331$ and $1$.' },
        { type: 'mcq', question: 'Unit digit of root of $13824$ is:', options: ['$2$', '$4$', '$6$', '$8$'], correct: 1, explanation: 'Ends in $4 \to 4$.' },
        { type: 'mcq', question: 'Estimate $\\sqrt[3]{2197}$ value:', options: ['$11$', '$13$', '$17$', '$19$'], correct: 1, explanation: 'Right $197 \to 3$. Left $2 \to 1$. Result: $13$.' }
    ]
};

export const missingMultiples = {
    practice: [
        { type: 'mcq', question: 'Smallest number to MULTIPLY $72$ with to make it a cube?', options: ['$2$', '$3$', '$6$', '$9$'], correct: 1, explanation: '$72 = 2^3 \\times 3^2$. Need one more $3$.' },
        { type: 'mcq', question: 'Smallest number to DIVIDE $81$ by to get a cube?', options: ['$3$', '$9$', '$27$', '$2$'], correct: 0, explanation: '$81 = 3^4$. Divide by $3$ to get $3^3 = 27$.' },
        { type: 'fill', question: '$128 = 2^7$. Smallest number to DIVIDE by is _____.', correctValue: 2, explanation: '$2^7 = 2^6 \\times 2$. Divide by $2$ to leave $(2^2)^3$.' },
        { type: 'mcq', question: 'To make $100$ a perfect cube, we multiply by:', options: ['$10$', '$100$', '$1000$', '$1$'], correct: 0, explanation: '$100 \times 10 = 1000 = 10^3$.' },
        { type: 'fill', question: '$256 = 2^8$. Multiplied by _____ makes it a perfect cube.', correctValue: 2, explanation: '$2^8 \\times 2 = 2^9 = (2^3)^3$.' },
        { type: 'truefalse', question: 'Dividing $1250$ by $2$ gives a perfect cube.', options: ['True', 'False'], correct: 1, explanation: 'False. $1250 / 2 = 625$, which is $5^4$, not a cube.' },
        { type: 'mcq', question: 'Smallest number to multiply $675$ to make it a cube?', options: ['$3$', '$5$', '$15$', '$25$'], correct: 1, explanation: '$675 = 3^3 \\times 5^2$. Need one $5$.' },
        { type: 'fill', question: 'Smallest number to multiply $1080$ with?', correctValue: 25, explanation: '$1080 = 2^3 \\times 3^3 \\times 5^1$. Need $5^2 = 25$.' },
        { type: 'mcq', question: 'Divide $5184$ by what to get a cube? ($5184 = 2^6 \\times 3^4$)', options: ['$3$', '$9$', '$27$', '$2$'], correct: 0, explanation: 'Divide by $3$ to get $2^6 \\times 3^3$.' },
        { type: 'fill', question: '$1188$ divided by _____ is a cube. ($2^2 \\times 3^3 \\times 11$)', correctValue: 44, explanation: 'Divide by $2^2 \\times 11 = 44$.' },
        { type: 'mcq', question: 'Multiply $250$ by _____ to make it a cube.', options: ['$2$', '$4$', '$5$', '$10$'], correct: 1, explanation: '$250 = 2^1 \\times 5^3$. Need $2^2 = 4$.' },
        { type: 'truefalse', question: 'Multiplying $500$ by $2$ gives a perfect cube.', options: ['True', 'False'], correct: 0, explanation: '$500 \times 2 = 1000$.' },
        { type: 'mcq', question: 'Smallest number to divide $192$ by?', options: ['$2$', '$3$', '$4$', '$6$'], correct: 1, explanation: '$192 = 2^6 \\times 3$. Divide by $3$.' },
        { type: 'fill', question: 'Multiply $1536$ by _____. ($2^9 \\times 3$)', correctValue: 9, explanation: 'Need $3^2 = 9$.' },
        { type: 'mcq', question: 'Smallest number to multiply $1323$ by? ($3^3 \\times 7^2$)', options: ['$3$', '$7$', '$49$', '$21$'], correct: 1, explanation: 'Need one $7$.' },
        { type: 'fill', question: 'Divide $1600$ by _____. ($2^6 \\times 5^2$)', correctValue: 25, explanation: 'Need to remove $5^2$.' },
        { type: 'mcq', question: 'Multiply $243$ by _____ to make it a cube.', options: ['$3$', '$9$', '$27$', '$1$'], correct: 0, explanation: '$243 = 3^5$. Need one $3$.' },
        { type: 'truefalse', question: 'Every number can be made a perfect cube by multiplying by some integer.', options: ['True', 'False'], correct: 0, explanation: 'True. If we have $p^a$, multiply by $p^{3-a}$ (or $6-a$ etc).' },
        { type: 'mcq', question: 'A cuboid has sides $5, 2, 5$. How many make a cube?', options: ['$5$', '$10$', '$20$', '$2$'], correct: 2, explanation: '$5^2 \\times 2^1 \\times (5^1 \\times 2^2) = 5^3 \\times 2^3$. Multiplier is $5 \\times 4 = 20$.' },
        { type: 'fill', question: 'Multiply $3000$ by _____ to get the smallest cube.', correctValue: 9, explanation: '$3000 = 3 \\times 10^3$. Need $3^2 = 9$.' }
    ],
    assess: [
        { type: 'mcq', question: 'Divide $54$ by _____ to get a cube.', options: ['$2$', '$3$', '$6$', '$9$'], correct: 0, explanation: '$54 = 2 \\times 27$. Divide by $2$.' },
        { type: 'mcq', question: 'Multiply $144$ by _____ to make it a cube.', options: ['$3$', '$6$', '$12$', '$2$'], correct: 2, explanation: '$144 = 2^4 \\times 3^2$. Need $2^2 \\times 3^1 = 12$.' },
        { type: 'mcq', question: 'To make $108$ a cube, we must multiply by:', options: ['$2$', '$4$', '$6$', '$12$'], correct: 0, explanation: '$108 = 2^2 \\times 3^3$. Need one $2$.' },
        { type: 'truefalse', question: 'Dividing $250$ by $2$ gives a perfect cube.', options: ['True', 'False'], correct: 0, explanation: '$125 = 5^3$.' },
        { type: 'mcq', question: 'Smallest number to multiply $320$ by is:', options: ['$5$', '$25$', '$2$', '$10$'], correct: 1, explanation: '$320 = 2^6 \\times 5$. Need $5^2 = 25$.' },
        { type: 'mcq', question: 'Divide $432$ by _____ to get a cube.', options: ['$2$', '$4$', '$16$', '$27$'], correct: 1, explanation: '$432 = 16 \\times 27$. Divide by $16$.' },
        { type: 'mcq', question: 'Multiply $135$ by _____ to make it a cube.', options: ['$5$', '$25$', '$15$', '$3$'], correct: 1, explanation: '$135 = 3^3 \\times 5$. Multiplier is $5^2=25$.' },
        { type: 'truefalse', question: 'If you divide $2^3 \\times 3$ by $3$, you get a cube.', options: ['True', 'False'], correct: 0, explanation: 'True.' },
        { type: 'mcq', question: 'Which multiplier makes $675$ a cube? ($3^3 \\times 5^2$)', options: ['$3$', '$5$', '$15$', '$25$'], correct: 1, explanation: 'Need one $5$.' },
        { type: 'mcq', question: 'Divide $24$ by _____ to get a perfect cube.', options: ['$2$', '$3$', '$4$', '$12$'], correct: 1, explanation: '$24 = 2^3 \\times 3$.' }
    ]
};
