// ─── QUESTIONS & DATA ──────────────────────────────────────────────────────
const realNumberClassificationQuestions = [
    { question: 'Is $0$ a Rational Number?', options: ['Yes, it can be written as $\\frac{0}{1}$', 'No, zero is not a number', 'No, because it is an integer', 'Maybe'], correct: 0, explanation: 'Yes, any integer $n$ can be written as $\\frac{n}{1}$, making it rational.' },
    { question: 'Which of these is an Irrational Number?', options: ['$\\sqrt{4}$', '$\\sqrt{9}$', '$\\sqrt{2}$', '$0.5$'], correct: 2, explanation: '$\\sqrt{4}=2$ and $\\sqrt{9}=3$ are rational. $\\sqrt{2}$ is non-repeating and non-terminating.' },
    { question: 'Can an Irrational number be written in $\\frac{p}{q}$ form?', options: ['Yes', 'No', 'Only if p is zero', 'Sometimes'], correct: 1, explanation: 'No, by definition, irrational numbers cannot be expressed as a ratio of two integers.' },
    { question: 'Every real number is either ______ or ______.', options: ['Rational; Irrational', 'Positive; Negative', 'Integer; Whole', 'Zero; One'], correct: 0, explanation: 'The set of Real Numbers $\\mathbb{R}$ is the union of Rational and Irrational numbers.' },
    { question: 'Which set does $\\sqrt{5}$ belong to?', options: ['Natural Numbers', 'Rational Numbers', 'Irrational Numbers', 'Whole Numbers'], correct: 2, explanation: '$\\sqrt{5}$ is a non-perfect square root, hence irrational.' },
];

const classificationAssessment = [
    { question: 'Is $-5$ a rational number?', options: ['Yes', 'No', 'Only if positive', 'None of these'], correct: 0, explanation: '$-5$ can be written as $\\frac{-5}{1}$, which is the $\\frac{p}{q}$ form.' },
    { question: 'Which set does $\\sqrt{16}$ belong to?', options: ['Irrational', 'Rational', 'Negative Integers', 'None of these'], correct: 1, explanation: '$\\sqrt{16} = 4$, which is a rational number.' },
    { question: 'Which of these is a Transcendental Irrational number used in circles?', options: ['$\\sqrt{2}$', '$\\pi$', '$\\sqrt{3}$', '$0.5$'], correct: 1, explanation: '$\\pi$ is a well-known irrational number that is not the root of any algebraic equation.' },
    { question: 'Between any two rational numbers, there are ______ rational numbers.', options: ['No', 'Exactly one', 'Exactly ten', 'Infinitely many'], correct: 3, explanation: 'The density property of rational numbers states there are infinite numbers between any two.' },
    { question: 'Is the sum of two rational numbers always rational?', options: ['Yes', 'No', 'Only for positive numbers', 'Only for integers'], correct: 0, explanation: 'Rational numbers are closed under addition.' },
    { question: 'Which of the following is an irrational number?', options: ['$\\sqrt{7}$', '$\\sqrt{25}$', '$3.14$', '$\\frac{22}{7}$'], correct: 0, explanation: '$\\sqrt{7}$ is the square root of a non-perfect square, making it irrational.' },
    { question: 'Is the product of a non-zero rational number and an irrational number rational?', options: ['Always', 'Never', 'Sometimes', 'Only if the rational is 1'], correct: 1, explanation: 'The product of a non-zero rational and an irrational is always irrational.' },
    { question: 'Is every irrational number also a real number?', options: ['Yes', 'No', 'Only if positive', 'Only if negative'], correct: 0, explanation: 'Real numbers include all rational and irrational numbers.' },
    { question: 'Which of these is an irrational pattern?', options: ['$0.1212...$', '$0.121221222...$', '$0.121212$', '$0.12$'], correct: 1, explanation: '$0.121221222...$ is non-repeating and non-terminating, thus irrational.' },
    { question: 'Is $\\sqrt{2} + \\sqrt{3}$ rational or irrational?', options: ['Rational', 'Irrational', 'Whole', 'Integer'], correct: 1, explanation: 'The sum of two distinct surds that do not cancel out is irrational.' },
];

const decimalExpansionQuestions = [
    { question: 'What is the decimal expansion of $\\frac{1}{3}$?', options: ['$0.3\\bar{3}$', '$0.3$', '$0.03$', '$0.31$'], correct: 0, explanation: '$1 \\div 3 = 0.333...$ which is recurring/repeating.' },
    { question: 'If a decimal terminates, it is definitely:', options: ['Rational', 'Irrational', 'A Whole Number', 'Negative'], correct: 0, explanation: 'All terminating decimals can be converted into fractions, so they are rational.' },
    { question: 'If a decimal is non-terminating and non-repeating, it is:', options: ['Rational', 'Irrational', 'An Integer', 'Prime'], correct: 1, explanation: 'This is the exact definition of an Irrational number.' },
    { question: 'Convert $0.\\bar{6}$ to a fraction.', options: ['$\\frac{2}{3}$', '$\\frac{6}{10}$', '$\\frac{1}{6}$', '$\\frac{3}{2}$'], correct: 0, explanation: '$0.666... = \\frac{6}{9} = \\frac{2}{3}$.' },
];

const decimalAssessment = [
    { question: 'What is the decimal expansion of $\\frac{2}{5}$?', options: ['$0.2$', '$0.4$', '$0.5$', '$2.5$'], correct: 1, explanation: '$2 \\div 5 = 0.4$, which is a terminating decimal.' },
    { question: 'A rational number $\\frac{p}{q}$ has a terminating decimal if $q$ has factors of only:', options: ['$2$ and $5$', '$3$ and $7$', 'Any prime', '$2$, $3$ and $5$'], correct: 0, explanation: 'For a terminating decimal, the denominator must be in the form $2^n 5^m$.' },
    { question: 'Is $0.1010010001...$ rational or irrational?', options: ['Rational', 'Irrational', 'Terminating', 'Recurring'], correct: 1, explanation: 'It is non-terminating and non-recurring, so it is irrational.' },
    { question: 'Express $0.\\bar{3}$ as a fraction in simplest form.', options: ['$\\frac{3}{10}$', '$\\frac{1}{3}$', '$\\frac{3}{99}$', '$\\frac{33}{100}$'], correct: 1, explanation: '$0.333... = \\frac{3}{9} = \\frac{1}{3}$.' },
    { question: 'Which of the following has a terminating decimal expansion?', options: ['$\\frac{1}{7}$', '$\\frac{1}{3}$', '$\\frac{1}{4}$', '$\\frac{2}{11}$'], correct: 2, explanation: '$\\frac{1}{4} = 0.25$, which terminates.' },
    { question: 'The decimal expansion of an irrational number is always:', options: ['Terminating', 'Recurring', 'Terminating and recurring', 'Non-terminating and non-recurring'], correct: 3, explanation: 'Definition of irrationality in decimals.' },
    { question: 'Express $0.\\bar{47}$ in $\\frac{p}{q}$ form.', options: ['$\\frac{47}{100}$', '$\\frac{47}{90}$', '$\\frac{47}{99}$', '$\\frac{4.7}{10}$'], correct: 2, explanation: 'Two repeating digits mean we divide by 99.' },
    { question: 'If $x = 0.999...$, then $x$ is equal to:', options: ['$0.9$', '$1$', '$\\frac{9}{10}$', '$9.9$'], correct: 1, explanation: '$10x = 9.999...$, so $9x = 9$, which means $x = 1$.' },
    { question: 'Find a rational number between $0.1$ and $0.2$.', options: ['$0.15$', '$\\sqrt{0.02}$', '$0.101001...$', 'None'], correct: 0, explanation: '$0.15$ is a terminating decimal, thus rational, and lies between $0.1$ and $0.2$.' },
    { question: 'Which of the following is equal to $0.\\bar{3} + 0.\\bar{6}$?', options: ['$0.9$', '$0.99$', '$1$', '$0.\\bar{12}$'], correct: 2, explanation: '$\\frac{1}{3} + \\frac{2}{3} = 1$.' },
];

const operationsOnSurdsQuestions = [
    { question: 'Simplify: $\\sqrt{3} + \\sqrt{3}$', options: ['$2\\sqrt{3}$', '$\\sqrt{6}$', '$6$', '$3$'], correct: 0, explanation: 'Adding like surds: $1\\sqrt{3} + 1\\sqrt{3} = 2\\sqrt{3}$.' },
    { question: 'Simplify: $\\sqrt{2} \\times \\sqrt{3}$', options: ['$\\sqrt{6}$', '$\\sqrt{5}$', '$6$', '$5$'], correct: 0, explanation: 'Rule: $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$. So, $\\sqrt{2 \\times 3} = \\sqrt{6}$.' },
    { question: 'Simplify: $(\\sqrt{5})^2$', options: ['$5$', '$\\sqrt{10}$', '$25$', '$\\sqrt{25}$'], correct: 0, explanation: 'A square cancels a square root: $(\\sqrt{x})^2 = x$.' },
    { question: 'Is $3\\sqrt{2}$ a rational or irrational number?', options: ['Rational', 'Irrational'], correct: 1, explanation: 'The product of a non-zero rational ($3$) and an irrational ($\\sqrt{2}$) is always irrational.' },
];

const surdsAssessment = [
    { question: 'Simplify: $3\\sqrt{2} + 4\\sqrt{2}$', options: ['$7\\sqrt{4}$', '$7\\sqrt{2}$', '$12\\sqrt{2}$', '$2\\sqrt{7}$'], correct: 1, explanation: 'Add the coefficients of like surds: $(3+4)\\sqrt{2} = 7\\sqrt{2}$.' },
    { question: 'Simplify: $\\sqrt{12}$', options: ['$6$', '$3\\sqrt{2}$', '$2\\sqrt{3}$', '$4\\sqrt{3}$'], correct: 2, explanation: '$\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$.' },
    { question: 'Value of $\\sqrt{8} \\times \\sqrt{2}$ is:', options: ['$4$', '$\\sqrt{10}$', '$16$', '$\\sqrt{16}$'], correct: 0, explanation: '$\\sqrt{8 \\times 2} = \\sqrt{16} = 4$.' },
    { question: 'Simplify: $(\\sqrt{7} + \\sqrt{3})(\\sqrt{7} - \\sqrt{3})$', options: ['$10$', '$4$', '$21$', '$\\sqrt{4}$'], correct: 1, explanation: 'Using $(a+b)(a-b) = a^2 - b^2$: $(\\sqrt{7})^2 - (\\sqrt{3})^2 = 7 - 3 = 4$.' },
    { question: 'Simplify: $(2 + \\sqrt{3})^2$', options: ['$7 + 4\\sqrt{3}$', '$4 + 3$', '$7 + 2\\sqrt{3}$', '$1 + 4\\sqrt{3}$'], correct: 0, explanation: 'Using $(a+b)^2 = a^2 + b^2 + 2ab$: $2^2 + (\\sqrt{3})^2 + 2(2)(\\sqrt{3}) = 4 + 3 + 4\\sqrt{3} = 7 + 4\\sqrt{3}$.' },
    { question: 'Simplify: $\\sqrt{45} - 3\\sqrt{20} + 4\\sqrt{5}$', options: ['$2\\sqrt{5}$', '$\\sqrt{5}$', '$3\\sqrt{5}$', '$0$'], correct: 1, explanation: '$3\\sqrt{5} - 6\\sqrt{5} + 4\\sqrt{5} = (3-6+4)\\sqrt{5} = 1\\sqrt{5}$ or $\\sqrt{5}$.' },
    { question: 'Is the sum of two irrational numbers always irrational?', options: ['Yes', 'No'], correct: 1, explanation: 'No, for example, $\\sqrt{2} + (-\\sqrt{2}) = 0$, which is rational.' },
    { question: 'Simplify: $\\sqrt[3]{8} + \\sqrt{4}$', options: ['$4$', '$6$', '$2\\sqrt{2} + 2$', '$12$'], correct: 0, explanation: '$2 + 2 = 4$.' },
    { question: 'What is the product of $(\\sqrt{x} + \\sqrt{y})(\\sqrt{x} - \\sqrt{y})$?', options: ['$x+y$', '$x-y$', '$\\sqrt{x^2-y^2}$', '$xy$'], correct: 1, explanation: 'Using difference of squares: $x - y$.' },
    { question: 'Simplify: $2\\sqrt{3} \\times 5\\sqrt{3}$', options: ['$10\\sqrt{3}$', '$30$', '$15$', '$7\\sqrt{3}$'], correct: 1, explanation: '$2 \\times 5 \\times \\sqrt{3} \\times \\sqrt{3} = 10 \\times 3 = 30$.' },
];

const rationalisationQuestions = [
    { question: 'Rationalise: $\\frac{1}{\\sqrt{2}}$', options: ['$\\frac{\\sqrt{2}}{2}$', '$\\sqrt{2}$', '$\\frac{2}{\\sqrt{2}}$', '$\\frac{1}{2}$'], correct: 0, explanation: 'Multiply top and bottom by $\\sqrt{2}$: $(1 \\cdot \\sqrt{2}) / (\\sqrt{2} \\cdot \\sqrt{2}) = \\frac{\\sqrt{2}}{2}$.' },
    { question: 'To rationalise $\\frac{1}{\\sqrt{3}-1}$, we multiply by:', options: ['$\\sqrt{3}+1$', '$\\sqrt{3}-1$', '$1$', '$\\sqrt{3}$'], correct: 0, explanation: 'We multiply by the conjugate ($\\sqrt{3}+1$) to use the $(a-b)(a+b) = a^2-b^2$ identity.' },
    { question: 'Simplify: $\\frac{1}{\\sqrt{7}}$', options: ['$\\frac{\\sqrt{7}}{7}$', '$\\frac{7}{\\sqrt{7}}$', '$\\sqrt{7}$', '$\\frac{1}{7}$'], correct: 0, explanation: 'Rationalised form is $\\frac{\\sqrt{7}}{7}$.' },
];

const rationalisationAssessment = [
    { question: 'Rationalise the denominator of $\\frac{1}{\\sqrt{5}}$.', options: ['$\\frac{5}{\\sqrt{5}}$', '$\\frac{\\sqrt{5}}{5}$', '$\\frac{1}{5}$', '$\\sqrt{5}$'], correct: 1, explanation: 'Multiply numerator and denominator by $\\sqrt{5}$.' },
    { question: 'What is the conjugate of $2 + \\sqrt{3}$?', options: ['$2 + \\sqrt{3}$', '$\\sqrt{3} - 2$', '$2 - \\sqrt{3}$', '$-2 - \\sqrt{3}$'], correct: 2, explanation: 'The conjugate is formed by changing the sign between the terms.' },
    { question: 'Rationalise: $\\frac{2}{\\sqrt{6}}$.', options: ['$\\frac{\\sqrt{6}}{3}$', '$\\sqrt{6}$', '$\\frac{2\\sqrt{6}}{6}$', '$\\frac{\\sqrt{6}}{2}$'], correct: 0, explanation: '$\\frac{2\\sqrt{6}}{6} = \\frac{\\sqrt{6}}{3}$.' },
    { question: 'Rationalise the denominator of $\\frac{1}{\\sqrt{2} + 1}$.', options: ['$\\sqrt{2}-1$', '$\\sqrt{2}+1$', '$\\frac{1}{\\sqrt{2}-1}$', '$\\sqrt{2}$'], correct: 0, explanation: 'Multiply by $(\\sqrt{2}-1)/(\\sqrt{2}-1)$, denominator becomes $2-1=1$.' },
    { question: 'Find the rationalising factor of $\\sqrt{5} + 2$.', options: ['$\\sqrt{5}+2$', '$\\sqrt{5}-2$', '$2-\\sqrt{5}$', '$\\sqrt{5}$'], correct: 1, explanation: 'The conjugate $\\sqrt{5}-2$ is the rationalising factor.' },
    { question: 'Simplify: $\\frac{1}{\\sqrt{5} + \\sqrt{2}} + \\frac{1}{\\sqrt{5} - \\sqrt{2}}$', options: ['$\\frac{2\\sqrt{5}}{3}$', '$\\frac{2\\sqrt{2}}{3}$', '$\\sqrt{5}$', '$\\frac{3}{2\\sqrt{5}}$'], correct: 0, explanation: '$[ (\\sqrt{5}-\\sqrt{2}) + (\\sqrt{5}+\\sqrt{2}) ] / (5-2) = \\frac{2\\sqrt{5}}{3}$.' },
    { question: 'If $\\frac{1}{\\sqrt{3} + \\sqrt{2}} = a\\sqrt{3} + b\\sqrt{2}$, find $a$ and $b$.', options: ['$a=1, b=1$', '$a=1, b=-1$', '$a=-1, b=1$', '$a=-1, b=-1$'], correct: 1, explanation: 'Rationalisation gives $\\sqrt{3}-\\sqrt{2}$. So $a=1, b=-1$.' },
    { question: 'Rationalise: $\\frac{3}{\\sqrt{3} - \\sqrt{2}}$.', options: ['$3 (\\sqrt{3}+\\sqrt{2})$', '$\\sqrt{3}+\\sqrt{2}$', '$3$', '$3\\sqrt{3}-3\\sqrt{2}$'], correct: 0, explanation: 'Denominator becomes $3-2=1$.' },
    { question: 'Rationalise: $\\frac{1}{7 + 3\\sqrt{2}}$.', options: ['$\\frac{7-3\\sqrt{2}}{31}$', '$\\frac{7-3\\sqrt{2}}{49}$', '$\\frac{7+3\\sqrt{2}}{31}$', '$7-3\\sqrt{2}$'], correct: 0, explanation: 'Denominator is $7^2 - (3\\sqrt{2})^2 = 49 - 18 = 31$.' },
    { question: 'Rationalise: $\\frac{1}{\\sqrt{7} - \\sqrt{6}}$.', options: ['$\\sqrt{7}+\\sqrt{6}$', '$\\sqrt{7}-\\sqrt{6}$', '$\\sqrt{13}$', '$1$'], correct: 0, explanation: 'Denominator becomes $7-6=1$.' },
];

const lawsOfExponentsQuestions = [
    { question: 'Simplify: $2^3 \\cdot 2^2$', options: ['$2^5$', '$2^6$', '$4^5$', '$2^1$'], correct: 0, explanation: 'Add powers: $3+2=5$. Result: $2^5$.' },
    { question: 'Simplify: $(5^2)^3$', options: ['$5^6$', '$5^5$', '$5^8$', '$25^3$'], correct: 0, explanation: 'Multiply powers: $2 \\cdot 3 = 6$. Result: $5^6$.' },
    { question: 'Simplify: $\\frac{7^5}{7^3}$', options: ['$7^2$', '$7^8$', '$7^{15}$', '$1^2$'], correct: 0, explanation: 'Subtract powers: $5-3=2$. Result: $7^2$.' },
    { question: 'What is $a^0$ (where $a \\neq 0$)?', options: ['$1$', '$0$', '$a$', 'Undefined'], correct: 0, explanation: 'Any non-zero number to power 0 is 1.' },
];

const exponentsAssessment = [
    { question: 'Simplify: $5^2 \\times 5^3$', options: ['$5^6$', '$5^5$', '$25^5$', '$5^1$'], correct: 1, explanation: 'Add exponents for the same base: $2+3=5$.' },
    { question: 'Simplify: $(2^3)^2$', options: ['$2^5$', '$2^6$', '$2^9$', '$2^1$'], correct: 1, explanation: 'Multiply exponents: $3 \\times 2 = 6$.' },
    { question: 'Simplify: $\\frac{10^5}{10^2}$', options: ['$10^7$', '$10^3$', '$1^3$', '$10^{10}$'], correct: 1, explanation: 'Subtract exponents: $5-2=3$.' },
    { question: 'Value of $125^{1/3}$ is:', options: ['$5$', '$25$', '$15$', '$50$'], correct: 0, explanation: '$5^3 = 125$, so cube root is $5$.' },
    { question: 'Value of $64^{-1/2}$ is:', options: ['$8$', '$-8$', '$\\frac{1}{8}$', '$-\\frac{1}{8}$'], correct: 2, explanation: '$1/64^{1/2} = 1/\\sqrt{64} = \\frac{1}{8}$.' },
    { question: 'Simplify: $(\\frac{16}{81})^{1/4}$', options: ['$\\frac{2}{3}$', '$\\frac{4}{9}$', '$\\frac{8}{27}$', '$\\frac{2}{9}$'], correct: 0, explanation: 'Fourth root of 16 is 2, and of 81 is 3.' },
    { question: 'Simplify: $(25)^{3/2}$', options: ['$15$', '$75$', '$125$', '$250$'], correct: 2, explanation: '$(\\sqrt{25})^3 = 5^3 = 125$.' },
    { question: 'Find $x$ if $2^{x-3} = 1$.', options: ['$0$', '$3$', '$2$', '$1$'], correct: 1, explanation: '$1 = 2^0$, so $x-3 = 0 \\implies x=3$.' },
    { question: 'What is $(a^m \\cdot b^m)$ equal to?', options: ['$a^{m+m}$', '$(ab)^m$', '$(ab)^{m+m}$', '$ab$'], correct: 1, explanation: 'Power of a product law.' },
    { question: 'Simplify: $(\\frac{p^a}{p^b})^{a+b} \\cdot (\\frac{p^b}{p^c})^{b+c} \\cdot (\\frac{p^c}{p^a})^{c+a}$', options: ['$p^{a+b+c}$', '$1$', '$0$', '$p^{abc}$'], correct: 1, explanation: 'Powers become $(a^2-b^2) + (b^2-c^2) + (c^2-a^2) = 0$. $p^0 = 1$.' },
];

const chapterAssessment = [
    // --- EASY (Q1-Q6) ---
    { question: 'Is $0$ a rational number?', options: ['Yes', 'No', 'Only if positive', 'None of these'], correct: 0, explanation: '$0$ can be written as $\\frac{0}{1}$, which is rational.' },
    { question: 'Which of these is an irrational number?', options: ['$\\sqrt{4}$', '$\\sqrt{9}$', '$\\sqrt{2}$', '$0.5$'], correct: 2, explanation: '$\\sqrt{2}$ is non-repeating and non-terminating.' },
    { question: 'What is the sum of $\\sqrt{3} + \\sqrt{3}$?', options: ['$2\\sqrt{3}$', '$\\sqrt{6}$', '$3$', '$6$'], correct: 0, explanation: 'Like surds: $1\\sqrt{3} + 1\\sqrt{3} = 2\\sqrt{3}$.' },
    { question: 'Simplify: $2^3 \\times 2^2$', options: ['$2^5$', '$2^1$', '$4^5$', '$2^6$'], correct: 0, explanation: 'Add exponents: $3+2=5$.' },
    { question: 'What is the value of $a^0$ for $a \\neq 0$?', options: ['$0$', '$1$', '$a$', 'Undefined'], correct: 1, explanation: 'Any non-zero number to power 0 is 1.' },
    { question: 'Is the sum of two rational numbers always rational?', options: ['Yes', 'No'], correct: 0, explanation: 'Rational numbers are closed under addition.' },

    // --- MEDIUM (Q7-14) ---
    { question: 'Between any two distinct rational numbers, how many rational numbers exist?', options: ['Zero', 'One', 'Ten', 'Infinitely many'], correct: 3, explanation: 'Density property of rational numbers.' },
    { question: 'What is the decimal expansion of $\\frac{1}{3}$?', options: ['$0.3$', '$0.\\bar{3}$', '$0.03$', '$0.31$'], correct: 1, explanation: '$\\frac{1}{3} = 0.333... = 0.\\bar{3}$.' },
    { question: 'Simplify: $\\sqrt{12}$', options: ['$6$', '$3\\sqrt{2}$', '$2\\sqrt{3}$', '$4\\sqrt{3}$'], correct: 2, explanation: '$\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$.' },
    { question: 'Rationalise: $\\frac{1}{\\sqrt{2}}$', options: ['$\\sqrt{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{2}{\\sqrt{2}}$', '$\\frac{1}{2}$'], correct: 1, explanation: 'Multiply by $\\frac{\\sqrt{2}}{\\sqrt{2}}$.' },
    { question: 'Value of $125^{1/3}$ is:', options: ['$5$', '$25$', '$15$', '$50$'], correct: 0, explanation: 'Cube root of 125 is 5.' },
    { question: 'Conjugate of $2 + \\sqrt{3}$ is:', options: ['$2 + \\sqrt{3}$', '$\\sqrt{3} - 2$', '$2 - \\sqrt{3}$', '$-2 - \\sqrt{3}$'], correct: 2, explanation: 'Change the middle sign to get the conjugate.' },
    { question: 'Is $3\\sqrt{2}$ a rational or irrational number?', options: ['Rational', 'Irrational'], correct: 1, explanation: 'Rational $\\times$ Irrational = Irrational.' },
    { question: 'Simplify: $(5^2)^3$', options: ['$5^5$', '$25^3$', '$5^6$', '$5^8$'], correct: 2, explanation: 'Multiply exponents: $2 \\times 3 = 6$.' },

    // --- HARD (Q15-20) ---
    { question: 'Which of the following is equal to $0.\\bar{9}$?', options: ['$0.9$', '$1$', '$0.99$', '$9/10$'], correct: 1, explanation: '$0.999...$ is exactly equal to 1.' },
    { question: 'Simplify: $(\\sqrt{7} + \\sqrt{3})(\\sqrt{7} - \\sqrt{3})$', options: ['$10$', '$4$', '$21$', '$\\sqrt{4}$'], correct: 1, explanation: '$7 - 3 = 4$.' },
    { question: 'Rationalise: $\\frac{1}{\\sqrt{2} + 1}$', options: ['$\\sqrt{2}+1$', '$\\sqrt{2}-1$', '$\\frac{1}{\\sqrt{2}-1}$', '$\\sqrt{2}$'], correct: 1, explanation: 'Multiply by $(\\sqrt{2}-1)$. Denominator becomes $2-1=1$.' },
    { question: 'Simplify: $(\\frac{16}{81})^{1/4}$', options: ['$\\frac{2}{3}$', '$\\frac{4}{9}$', '$\\frac{8}{27}$', '$\\frac{2}{9}$'], correct: 0, explanation: 'Take the 4th root of both 16 and 81.' },
    { question: 'Find $x$ if $2^{x-3} = 1$.', options: ['$0$', '$1$', '$2$', '$3$'], correct: 3, explanation: '$2^0 = 1$, so $x-3=0 \\implies x=3$.' },
    { question: 'Simplify: $(25)^{3/2}$', options: ['$15$', '$75$', '$125$', '$250$'], correct: 2, explanation: '$(\\sqrt{25})^3 = 5^3 = 125$.' },
];

export const SKILLS = [
    {
        id: 'classification',
        nodeId: 'a4091001-0001-0000-0000-000000000000',
        title: 'Real Number Classification',
        subtitle: 'Skill 1',
        icon: '🔬',
        color: '#0891b2',
        desc: 'Identify Rational and Irrational numbers in the real number system.',
        practice: realNumberClassificationQuestions,
        assessment: classificationAssessment,
        learn: {
            concept: 'The Real Number System is divided into two main groups: Rational and Irrational.',
            rules: [
                { title: 'Rational Numbers', f: '\\frac{p}{q}, q \\neq 0', d: 'Numbers that can be expressed as a fraction of two integers.', ex: '$\\frac{2}{3}, -5, 0.75$', tip: 'If it can be a fraction, it\'s rational!' },
                { title: 'Irrational Numbers', f: '\\text{Non-repeating, Non-terminating}', d: 'Numbers that cannot be written as a fraction.', ex: '$\\sqrt{2}, \\pi, \\sqrt{3}$', tip: 'Look for roots of non-perfect squares.' },
            ]
        }
    },
    {
        id: 'decimals',
        title: 'Decimal Expansion',
        subtitle: 'Skill 2',
        icon: '🔢',
        color: '#059669',
        desc: 'Understand terminating and recurring decimal patterns.',
        practice: decimalExpansionQuestions,
        assessment: decimalAssessment,
        learn: {
            concept: 'Decimal expansions help us distinguish between Rational and Irrational numbers.',
            rules: [
                { title: 'Terminating', f: '0.125', d: 'The division ends after finite steps.', ex: '$\\frac{1}{8} = 0.125$', tip: 'These are always Rational.' },
                { title: 'Recurring', f: '0.333...', d: 'A block of digits repeats infinitely.', ex: '$\\frac{1}{3} = 0.\\bar{3}$', tip: 'These are also always Rational.' },
            ]
        }
    },
    {
        id: 'surds',
        title: 'Operations on Surds',
        subtitle: 'Skill 3',
        icon: '🧮',
        color: '#b45309',
        desc: 'Add, subtract, multiply, and divide irrational square roots.',
        practice: operationsOnSurdsQuestions,
        assessment: surdsAssessment,
        learn: {
            concept: 'Surds (roots) follow specific rules for algebraic operations.',
            rules: [
                { title: 'Multiplication', f: '\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}', d: 'You can multiply numbers under square roots.', ex: '$\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{6}$', tip: 'Only works for multiplication and division!' },
                { title: 'Addition', f: 'n\\sqrt{a} + m\\sqrt{a} = (n+m)\\sqrt{a}', d: 'You can only add "Like Surds" (same number inside root).', ex: '$\\sqrt{5} + 2\\sqrt{5} = 3\\sqrt{5}$', tip: 'Treat surds like variables ($x$).' },
            ]
        }
    },
    {
        id: 'rationalisation',
        title: 'Rationalisation',
        subtitle: 'Skill 4',
        icon: '🧹',
        color: '#7c3aed',
        desc: 'Remove square roots from denominators for standard form.',
        practice: rationalisationQuestions,
        assessment: rationalisationAssessment,
        learn: {
            concept: 'Rationalisation is the process of eliminating a radical from the denominator.',
            rules: [
                { title: 'Monomial Denom.', f: '\\frac{1}{\\sqrt{a}} \\cdot \\frac{\\sqrt{a}}{\\sqrt{a}}', d: 'Multiply by the same surd.', ex: '$\\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$', tip: 'The goal is to get a rational number on the bottom.' },
                { title: 'Binomial Denom.', f: '\\text{Use Conjugate}', d: 'Multiply by swapping the middle sign.', ex: '$\\frac{1}{\\sqrt{2}-1} \\cdot \\frac{\\sqrt{2}+1}{\\sqrt{2}+1}$', tip: 'Use the conjugate for binomials: simplify $\\frac{1}{\\sqrt{a}+b}$ using $(\\sqrt{a}-b)$.' },
            ]
        }
    },
    {
        id: 'exponents',
        title: 'Laws of Exponents',
        subtitle: 'Skill 5',
        icon: '⚡',
        color: '#be185d',
        desc: 'Apply rules for powers with real number bases.',
        practice: lawsOfExponentsQuestions,
        assessment: exponentsAssessment,
        learn: {
            concept: 'Exponents follow consistent laws across all real numbers.',
            rules: [
                { title: 'Product Law', f: 'a^m \\cdot a^n = a^{m+n}', d: 'Add powers when multiplying same bases.', ex: '$2^3 \\cdot 2^4 = 2^7$', tip: 'Base must be identical.' },
                { title: 'Power Law', f: '(a^m)^n = a^{mn}', d: 'Multiply powers when raising a power to a power.', ex: '$(x^2)^3 = x^6$', tip: 'Parentheses indicate multiplication here.' },
            ]
        }
    },
    {
        id: 'assessment',
        title: 'Chapter Assessment',
        subtitle: 'Skill 6',
        icon: '📝',
        color: '#0369a1',
        desc: 'A comprehensive 20-question test covering all Number System skills.',
        practice: null,
        assessment: chapterAssessment,
        learn: null
    },
];
