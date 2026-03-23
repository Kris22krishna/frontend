// --- HELPERS ---
const _rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const _rndL = () => String.fromCharCode(97 + _rnd(0, 25));
const _rndL2 = x => { let l = _rndL(); while (l === x) l = _rndL(); return l; };
const _shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const _mkQ = (q, opts, exp) => {
    const s = _shuffle(opts);
    return { question: q, math: '', options: s, correct: s.indexOf(opts[0]), explanation: exp };
};

// --- EXPONENT LAWS GENERATORS (5 QUESTIONS EACH) ---

// 1. PRODUCT LAW
const genProductQuestions = () => {
    const b = _rnd(2,5), a = _rnd(2,4), c = _rnd(2,4), d = _rnd(2,4);
    const l = _rndL();
    return [
        _mkQ(`Simplify: $${b}^{${a}} \\cdot ${b}^{${c}}$`, [`$${b}^{${a+c}}$`,`$${b}^{${a*c}}$`,`$${b*2}^{${a+c}}$`,`$${b}^{${Math.abs(a-c)}}$`], `Add exponents: $${a}+${c}=${a+c}$.`),
        _mkQ(`Simplify: $x^{${a}} \\cdot x^{${c}}$`, [`$x^{${a+c}}$`,`$x^{${a*c}}$`,`$2x^{${a+c}}$`,`$x^{${Math.abs(a-c)}}$`], `Add exponents: $${a}+${c}=${a+c}$.`),
        _mkQ(`Simplify: $${b}^{${a}} \\cdot ${b}^{${c}} \\cdot ${b}^{${d}}$`, [`$${b}^{${a+c+d}}$`,`$${b}^{${a*c*d}}$`,`$${b}^{${a+c}}$`,`$${b}^{3}$`], `Add all: $${a}+${c}+${d}=${a+c+d}$.`),
        _mkQ(`Simplify: $${l}^{${a}} \\cdot ${l}^{${c}} \\cdot ${l}^{${d}}$`, [`$${l}^{${a+c+d}}$`,`$${l}^{${a*c*d}}$`,`$3${l}^{${a+c+d}}$`,`$${l}^{${a+c}}$`], `Add all: $${a}+${c}+${d}=${a+c+d}$.`),
        _mkQ(`Simplify: $2${l}^{${a}} \\cdot 3${l}^{${c}} \\cdot ${l}^{2}$`, [`$6${l}^{${a+c+2}}$`,`$5${l}^{${a+c+2}}$`,`$6${l}^{${a*c*2}}$`,`$${l}^{${a+c+2}}$`], `Multiply numbers ($2 \\times 3=6$) and add exponents.`),
    ];
};

// 2. QUOTIENT LAW
const genQuotientQuestions = () => {
    const b = _rnd(2,5), a = _rnd(7,10), c = _rnd(2,3), d = _rnd(1,2);
    const l = _rndL();
    return [
        _mkQ(`Simplify: $\\frac{${b}^{${a}}}{${b}^{${c}}}$`, [`$${b}^{${a-c}}$`,`$${b}^{${a+c}}$`,`$${b}^{${a/c}}$`,`$1$`], `Subtract: $${a}-${c}=${a-c}$.`),
        _mkQ(`Simplify: $\\frac{x^{${a}}}{x^{${c}}}$`, [`$x^{${a-c}}$`,`$x^{${a+c}}$`,`$x^{${a*c}}$`,`$x^{${c}}$`], `Subtract: $${a}-${c}=${a-c}$.`),
        _mkQ(`Simplify: $\\frac{${b}^{${a}}}{${b}^{${c}} \\cdot ${b}^{${d}}}$`, [`$${b}^{${a-c-d}}$`,`$${b}^{${a-c+d}}$`,`$${b}^{${a+c+d}}$`,`$${b}^{${a-d}}$`], `Subtract both bottom exponents.`),
        _mkQ(`Simplify: $\\frac{${l}^{${a}}}{${l}^{${c}} \\cdot ${l}^{${d}}}$`, [`$${l}^{${a-c-d}}$`,`$${l}^{${a-c+d}}$`,`$${l}^{${a+c+d}}$`,`$${l}^{${a+c}}$`], `Subtract both bottoms.`),
        _mkQ(`Simplify: $\\frac{12${l}^{8}}{3${l}^{2} \\cdot ${l}^{3}}$`, [`$4${l}^{3}$`,`$9${l}^{3}$`,`$4${l}^{5}$`,`$12${l}^{3}$`], `$12/3=4$. Subtract both exponents: $8-2-3=3$.`),
    ];
};

// 3. POWER LAW
const genPowerQuestions = () => {
    const b = _rnd(2,4), a = _rnd(2,3), c = _rnd(2,3), d = _rnd(2,2);
    const l = _rndL();
    return [
        _mkQ(`Simplify: $(${b}^{${a}})^{${c}}$`, [`$${b}^{${a*c}}$`,`$${b}^{${a+c}}$`,`$${b*c}^{${a}}$`,`$${b}^{${a}}$`], `Multiply: $${a} \\times ${c}=${a*c}$.`),
        _mkQ(`Simplify: $(x^{${a}})^{${c}}$`, [`$x^{${a*c}}$`,`$x^{${a+c}}$`,`$${c}x^{${a}}$`,`$x^2$`], `Multiply: $${a} \\times ${c}=${a*c}$.`),
        _mkQ(`Simplify: $((${b}^{${a}})^{${c}})^{${d}}$`, [`$${b}^{${a*c*d}}$`,`$${b}^{${a+c+d}}$`,`$${b}^{${a*c}}$`,`$3${b}^{${a}}$`], `Multiply all three exponents.`),
        _mkQ(`Simplify: $((${l}^{${a}})^{${c}})^{${d}}$`, [`$${l}^{${a*c*d}}$`,`$${l}^{${a+c+d}}$`,`$${l}^{${a*c}}$`,`$${d}${l}^{${a}}$`], `Multiply all three exponents.`),
        _mkQ(`Simplify: $(2x^{${a}})^{${c}} \\cdot x^{2}$`, [`$${Math.pow(2,c)}x^{${a*c+2}}$`,`$${2*c}x^{${a*c+2}}$`,`$${Math.pow(2,c)}x^{${a+c+2}}$`,`$2x^{${a*c+2}}$`], `Apply power to 2 and x first, then add 2.`),
    ];
};

// 4. POWER OF PRODUCT
const genPowerOfProductQuestions = () => {
    const n1 = _rnd(2,3), n2 = _rnd(4,5), p = _rnd(2,3);
    const l = _rndL();
    return [
        _mkQ(`Simplify: $(${n1} \\cdot ${n2})^{${p}}$`, [`$(${n1*n2})^{${p}}$`,`$${n1*n2*p}$`,`$${n1+n2}^{${p}}$`,`$${n1}^{${p}} + ${n2}^{${p}}$`], `Multiply first or distribute power.`),
        _mkQ(`Simplify: $(xy)^{${p}}$`, [`$x^{${p}}y^{${p}}$`,`$xy^{${p}}$`,`$${p}xy$`,`$x^{${p}}+y^{${p}}$`], `Distribute the power to both terms.`),
        _mkQ(`Simplify: $(2 \\cdot 3 \\cdot 4)^{2}$`, [`$24^{2}$`,`$9^{2}$`,`$24$`,`$2^2+3^2+4^2$`], `Entire group is squared.`),
        _mkQ(`Simplify: $(abc)^{${p}}$`, [`$a^{${p}}b^{${p}}c^{${p}}$`,`$abc^{${p}}$`,`$${p}abc$`,`$a^{${p}}+b^{${p}}+c^{${p}}$`], `Distribute power to all three letters.`),
        _mkQ(`Simplify: $(2${l}^{2}y^{3})^{2}$`, [`$4${l}^{4}y^{6}$`,`$2${l}^{4}y^{6}$`,`$4${l}^{2}y^{3}$`,`$4${l}^{4}y^{5}$`], `Square every factor inside.`),
    ];
};

// 5. POWER OF QUOTIENT
const genPowerOfQuotientQuestions = () => {
    const n = _rnd(2,3), d = _rnd(4,5), p = _rnd(2,3);
    return [
        _mkQ(`Simplify: $\\left(\\frac{${n}}{${d}}\\right)^{${p}}$`, [`$\\frac{${n}^{${p}}}{${d}^{${p}}}$`,`$\\frac{${n*p}}{${d*p}}$`,`$\\frac{${n}^{${p}}}{${d}}$`,`$1$`], `Power applies to top and bottom.`),
        _mkQ(`Simplify: $\\left(\\frac{x}{y}\\right)^{${p}}$`, [`$\\frac{x^{${p}}}{y^{${p}}$`,`$\\frac{x}{y^{${p}}}$`,`$x^{${p}}y^{${p}}$`,`$\\frac{${p}x}{${p}y}$`], `Distribute power to both.`),
        _mkQ(`Simplify: $\\left(\\frac{2 \\cdot 3}{5}\\right)^{2}$`, [`$\\frac{6^{2}}{5^{2}}$`,`$\\frac{6}{5}$`,`$\\frac{36}{25}$`,`$\\frac{12}{10}$`], `Calculate the 6 first, then square both.`),
        _mkQ(`Simplify: $\\left(\\frac{a}{bc}\\right)^{${p}}$`, [`$\\frac{a^{${p}}}{b^{${p}}c^{${p}}}$`,`$\\frac{a}{b^{${p}}c^{${p}}}$`,`$\\frac{a^{${p}}}{bc}$`,`$a^{${p}}b^{${p}}c^{${p}}$`], `Everything inside gets the power.`),
        _mkQ(`Simplify: $\\left(\\frac{2x^{3}}{y^{2}}\\right)^{3}$`, [`$\\frac{8x^{9}}{y^{6}}$`,`$\\frac{6x^{9}}{y^{6}}$`,`$\\frac{8x^{6}}{y^{5}}$`,`$\\frac{2x^{9}}{y^{6}}$`], `Cube every part of the fraction.`),
    ];
};

// 6. ZERO LAW
const genZeroLawQuestions = () => {
    const n = _rnd(10,999), l = _rndL();
    return [
        _mkQ(`Evaluate: $${n}^{0}$`, [`$1$`,`$0$`,`$${n}$`,`$-1$`], `Anything to power 0 is 1.`),
        _mkQ(`Evaluate: $x^{0}$`, [`$1$`,`$0$`,`$x$`,`$-1$`], `Even variables to power 0 equal 1.`),
        _mkQ(`Evaluate: $2^{0} + 3^{0} + 4^{0}$`, [`$3$`,`$1$`,`$0$`,`$9$`], `$1 + 1 + 1 = 3$.`),
        _mkQ(`Evaluate: $a^{0} + b^{0} + c^{0}$`, [`$3$`,`$1$`,`$0$`,`$abc$`], `Each term becomes 1.`),
        _mkQ(`Simplify: $(5${l}^{2}y^{3})^{0}$`, [`$1$`,`$5${l}^{2}y^{3}$`,`$0$`,`$5$`], `The entire bracket is raised to 0.`),
    ];
};

// 7. IDENTITY LAW
const genIdentityLawQuestions = () => {
    const n = _rnd(10,999), l = _rndL();
    return [
        _mkQ(`Simplify: $${n}^{1}$`, [`$${n}$`,`$1$`,`$0$`,`$${n}^2$`], `Power 1 stays the same.`),
        _mkQ(`Simplify: $x^{1}$`, [`$x$`,`$1$`,`$0$`,`$x^2$`], `Variable to power 1 is just itself.`),
        _mkQ(`Simplify: $2^{1} \\cdot 3^{1} \\cdot 4^{1}$`, [`$24$`,`$9$`,`$1$`,`$24^{3}$`], `$2 \cdot 3 \cdot 4 = 24$.`),
        _mkQ(`Simplify: $a^{1} \\cdot b^{1} \\cdot c^{1}$`, [`$abc$`,`$a+b+c$`,`$1$`,`$(abc)^{3}$`], `Multiply all terms.`),
        _mkQ(`Simplify: $(2x)^{1} + (3y)^{1}$`, [`$2x + 3y$`,`$5xy$`,`$1$`,`$6xy$`], `Identity law applies to each term separately.`),
    ];
};

// 8. NEGATIVE LAW
const genNegativeLawQuestions = () => {
    const b = _rnd(2,5), n = _rnd(2,3);
    const l1 = _rndL();
    return [
        _mkQ(`Simplify: $${b}^{-${n}}$`, [`$\\frac{1}{${b}^{${n}}}$`,`$-${b}^{${n}}$`,`$\\frac{${b}}{${n}}$`,`$${b}^{${n}}$`], `Flip to denominator.`),
        _mkQ(`Simplify: $x^{-${n}}$`, [`$\\frac{1}{x^{${n}}}$`,`$-x^{${n}}$`,`$x^{${n}}$`,`$0$`], `Move variable to the bottom.`),
        _mkQ(`Simplify: $2^{-1} \\cdot 2^{-2} \\cdot 2^{4}$`, [`$2$`,`$\\frac{1}{8}$`,`$2^{-7}$`,`$1$`], `$-1-2+4=1$, so $2^1=2$.`),
        _mkQ(`Simplify: $${l1}^{-2} \\cdot ${l1}^{-3} \\cdot ${l1}^{6}$`, [`$${l1}$`,`$\\frac{1}{${l1}^{11}}$`,`$${l1}^{-1}$`,`$${l1}^5$`], `$-2-3+6=1$.`),
        _mkQ(`Simplify: $(x^{2}y^{-3})^{2} \\cdot y^{6}$`, [`$x^{4}$`,`$x^{4}y^{12}$`,`$x^{2}y^{0}$`,`$x^{4}y^{6}$`], `$(y^{-3})^2 = y^{-6}$, which cancels $y^6$.`),
    ];
};

// 9. FRACTIONAL LAW
const genFractionalLawQuestions = () => {
    return [
        _mkQ('Simplify: $36^{1/2}$', [`$6$`,`$18$`,`$36$`,`$1.2$`], `36 root 2 is 6.`),
        _mkQ('Simplify: $x^{1/2}$', [`$\\sqrt{x}$`,`$x^2$`,`$\\frac{x}{2}$`,`$2x$`], `1/2 power is root.`),
        _mkQ('Simplify: $8^{1/3} \\cdot 27^{1/3}$', [`$6$`,`$1$`,`$35^{1/3}$`,`$9$`], `$2 \times 3 = 6$.`),
        _mkQ('Simplify: $a^{1/2}b^{1/2}c^{1/2}$', [`$\\sqrt{abc}$`,`$abc$`,`$(abc)^2$`,`$a+b+c$`], `Combined root.`),
        _mkQ('Simplify: $(x^{4}y^{6}z^{8})^{1/2}$', [`$x^{2}y^{3}z^{4}$`,`$x^{4}y^{6}z^{8}$`,`$x^{6}y^{8}z^{10}$`,`$x^{8}y^{12}z^{16}$`], `Halve all exponents.`),
    ];
};

// Alias these for use in learn rules
const genProductPractice = genProductQuestions;
const genProductAssessment = genProductQuestions;
const genQuotientPractice = genQuotientQuestions;
const genQuotientAssessment = genQuotientQuestions;
const genPowerPractice = genPowerQuestions;
const genPowerAssessment = genPowerQuestions;
const genPowerOfProductPractice = genPowerOfProductQuestions;
const genPowerOfProductAssessment = genPowerOfProductQuestions;
const genPowerOfQuotientPractice = genPowerOfQuotientQuestions;
const genPowerOfQuotientAssessment = genPowerOfQuotientQuestions;
const genZeroLawPractice = genZeroLawQuestions;
const genZeroLawAssessment = genZeroLawQuestions;
const genIdentityLawPractice = genIdentityLawQuestions;
const genIdentityLawAssessment = genIdentityLawQuestions;
const genNegativeLawPractice = genNegativeLawQuestions;
const genNegativeLawAssessment = genNegativeLawQuestions;
const genFractionalLawPractice = genFractionalLawQuestions;
const genFractionalLawAssessment = genFractionalLawQuestions;

// --- 30-QUESTION PRACTICE ---
const generateExponentQuestions = () => {
    const qs = [];
    // Systematic coverage: 2 per law = 18
    const laws = [genProductQuestions, genQuotientQuestions, genPowerQuestions, genPowerOfProductQuestions, genPowerOfQuotientQuestions, genZeroLawQuestions, genIdentityLawQuestions, genNegativeLawQuestions, genFractionalLawQuestions];
    laws.forEach(l => qs.push(...l().slice(0, 2)));

    // 12 extra tricky mixed
    const l = _rndL();
    const trickies = [
        _mkQ(`Simplify: $\\frac{x^5 \\cdot x^3}{x^4}$`, [`$x^4$`,`$x^{12}$`,`$x^2$`,`$x^1$`], `5+3-4=4.`),
        _mkQ(`Simplify: $(x^2y^3)^2 \\cdot x^{-4}$`, [`$y^6$`,`$x^4y^6$`,`$x^0y^5$`,`$x^{-2}y^6$`], `(x^4y^6) * x^-4 = x^0y^6.`),
        _mkQ(`Evaluate: $2^{-1} + 2^{-1}$`, [`$1$`,`$0.5$`,`$2$`,`$0.25$`], `0.5 + 0.5 = 1.`),
        _mkQ(`Simplify: $\\left(\\frac{x^{-2}}{x^{-5}}\\right)^{2}$`, [`$x^6$`,`$x^{-14}$`,`$x^{14}$`,`$x^{-6}$`], `(-2-(-5))*2 = 3*2 = 6.`),
        _mkQ(`Simplify: $(2x^0)^3$`, [`$8$`,`$2x$`,`$6$`,`$1$`], `2^3 = 8. (x^0 = 1).`),
        _mkQ(`Simplify: $a^{1/2} \\cdot a^{3/2}$`, [`$a^2$`,`$a^{3/4}$`,`$a$`,`$a^3$`], `1/2 + 3/2 = 2.`),
        _mkQ(`Solve for $n$: $3^n \\cdot 3^2 = 3^5$`, [`$n=3$`,`$n=7$`,`$n=10$`,`$n=1.5$`], `n+2=5.`),
        _mkQ(`Simplify: $\\frac{a^2b^{-1}}{a^{-1}b}$`, [`$a^3b^{-2}$`,`$ab^{0}$`,`$a^1b^1$`,`$a^3b^2$`], `2-(-1)=3, -1-1=-2.`),
        _mkQ(`Simplify: $\\left(\\frac{x}{y}\\right)^{-1} \\cdot x$`, [`$y$`,`$x^2/y$`,`$1/y$`,`$xy$`], `(y/x) * x = y.`),
        _mkQ(`Evaluate: $(5^{1/2})^2$`, [`$5$`,`$25$`,`$1$`,`$\\sqrt{5}$`], `multiply powers: (1/2)*2=1.`),
        _mkQ(`Simplify: $x^{1} \\cdot x^{0} \\cdot x^{-1}$`, [`$1$`,`$x$`,`$x^{-1}$`,`$0$`], `1 + 0 + (-1) = 0. x^0 = 1.`),
        _mkQ(`Simplify: $(2x^2)^3$`, [`$8x^6$`,`$6x^6$`,`$8x^5$`,`$2x^6$`], `2^3=8, x^6.`),
    ];
    return qs.concat(trickies);
};

const exponentQuestions = generateExponentQuestions();

const generateExponentAssessment = () => {
    // Random mix of all generators
    const qs = [];
    const laws = [genProductQuestions, genQuotientQuestions, genPowerQuestions, genPowerOfProductQuestions, genPowerOfQuotientQuestions, genZeroLawQuestions, genIdentityLawQuestions, genNegativeLawQuestions, genFractionalLawQuestions];
    laws.forEach(l => qs.push(...l()));
    return _shuffle(qs).slice(0, 30);
};

const exponentAssessment = generateExponentAssessment();

// --- OTHER SKILLS RESTORATION (GENERIC GOOD ALGEBRA CONTENT) ---

// Skill 2: Like Terms
const genLikeTerms = () => {
    return [
        _mkQ('Simplify: $3x + 5x$', [`$8x$`,`$8x^2$`,`$15x$`,`$35x$`], 'Same variable, add coefficients.'),
        _mkQ('Simplify: $10y - 4y + 2y$', [`$8y$`,`$4y$`,`$12y$`,`$8$`], 'Subtract and add.'),
        _mkQ('Simplify: $2x^2 + 7x^2$', [`$9x^2$`,`$9x^4$`,`$14x^2$`,`$9$`], 'Letters and powers match.'),
        _mkQ('Simplify: $4a + 5b - a$', [`$3a + 5b$`,`$8ab$`,`$9ab$`,`$4$`], 'Combine $4a - a = 3a$.'),
        _mkQ('Simplify: $x + x + x$', [`$3x$`,`$x^3$`,`$3$`,`$x$`], 'Coefficients are 1.'),
        _mkQ('Which terms are LIKE?', [`$2x, 5x$`,`$2x, 2y$`,`$x^2, x^3$`,`$4, 4a$`], 'Same letter and power.'),
    ];
};
const likeTermsQuestions = genLikeTerms;
const likeTermsAssessment = genLikeTerms;

// Skill 3: Simplifying Expressions
const genExpressions = () => {
    return [
        _mkQ('Expand: $2(x + 5)$', [`$2x + 10$`,`$2x + 5$`,`$7x$`,`$x + 10$`], 'Distribute 2 to both.'),
        _mkQ('Expand: $3(2x - 4)$', [`$6x - 12$`,`$6x - 4$`,`$5x - 7$`,`$x - 12$`], 'Multiply both terms.'),
        _mkQ('Simplify: $5(x + 1) + 2x$', [`$7x + 5$`,`$5x + 3$`,`$12x$`,`$7x + 1$`], '$5x + 5 + 2x = 7x + 5$.'),
        _mkQ('Simplify: $-(x - 4)$', [`$-x + 4$`,`$-x - 4$`,`$x - 4$`,`$x + 4$`], 'Flip signs inside.'),
        _mkQ('Simplify: $2(a+b) - a$', [`$a + 2b$`,`$2a + 2b$`,`$ab$`,`$2b$`], '$2a + 2b - a = a + 2b$.'),
    ];
};
const expressionQuestions = genExpressions;
const expressionAssessment = genExpressions;

// Skill 4: Solving Equations
const generateEquationQuestionsLinear1 = () => {
    const a = _rnd(2, 5), b = _rnd(1, 10), x = _rnd(1, 10);
    const result = a * x + b;
    return [ _mkQ(`Solve for $x$: $${a}x + ${b} = ${result}$`, [`$${x}$`,`$${x+1}$`,`$${x-1}$`,`$${a+b}$`], `Subtract ${b}, then divide by ${a}.`) ];
};
const generateEquationQuestionsLinear2 = () => {
    return [ _mkQ('If $x+y=10$ and $x-y=2$, find $x$.', [`$6$`,`$4$`,`$8$`,`$5$`], 'Add equations: $2x=12 \Rightarrow x=6$.') ];
};
const generateEquationQuestionsQuadratic = () => {
    const r1 = _rnd(1, 5), r2 = _rnd(1, 5);
    const b = -(r1 + r2), c = r1 * r2;
    const signB = b < 0 ? '-' : '+';
    const absB = Math.abs(b);
    return [ _mkQ(`Factor: $x^2 ${signB} ${absB}x + ${c} = 0$`, [`$(x-${r1})(x-${r2})=0$`,`$(x+${r1})(x+${r2})=0$`,`$(x-${r1})(x+${r2})=0$`,`$(x+${r1})(x-${r2})=0$`], `Roots are $${r1}$ and $${r2}$.`) ];
};
const equationAssessment = () => [ ...generateEquationQuestionsLinear1(), ...generateEquationQuestionsLinear1(), ...generateEquationQuestionsQuadratic() ];

// Skill 5: Subject Change
const genSubject = () => {
    return [
        _mkQ('Make $x$ the subject: $y = x + 5$', [`$x = y - 5$`,`$x = y + 5$`,`$x = 5 - y$`,`$x = 5y$`], 'Subtract 5.'),
        _mkQ('Make $x$ the subject: $A = 2x$', [`$x = A/2$`,`$x = 2A$`,`$x = A - 2$`,`$x = A + 2$`], 'Divide by 2.'),
        _mkQ('Make $r$ the subject: $C = 2\\pi r$', [`$r = C/(2\\pi)$`,`$r = 2\\pi/C$`,`$r = C - 2\\pi$`,`$r = C \\cdot 2\\pi$`], 'Isolate r.'),
        _mkQ('Rearrange for $v$: $d = vt$', [`$v = d/t$`,`$v = dt$`,`$v = t/d$`,`$v = d - t$`], 'Divide by t.'),
        _mkQ('Solve for $x$ in terms of $a$: $ax = 10$', [`$x = 10/a$`,`$x = a/10$`,`$x = 10 - a$`,`$x = 10a$`], 'Divide by a.'),
    ];
};
const subjectQuestions = genSubject;
const subjectAssessment = genSubject;

// Skill 6: Word Problems
const genWordProblems = () => {
    return [
        _mkQ('A pizza costs $\\$8$ and each topping is $\\$1.50$. If total is $\\$14$, how many toppings ($t$)?', [`$4$`,`$2$`,`$6$`,`$5$`], '$1.5t + 8 = 14 \Rightarrow 1.5t = 6 \Rightarrow t=4$.'),
        _mkQ('Double a number plus 5 is 15. The number?', [`$5$`,`$10$`,`$2.5$`,`$20$`], '$2n + 5 = 15 \Rightarrow 2n = 10 \Rightarrow n=5$.'),
        _mkQ('Three consecutive numbers sum to 18. Smallest?', [`$5$`,`$6$`,`$4$`,`$3$`], '$x + x+1 + x+2 = 18 \Rightarrow 3x + 3 = 18 \Rightarrow 3x = 15 \Rightarrow x=5$.'),
    ];
};
const wordProblemQuestions = genWordProblems;
const wordProblemAssessment = genWordProblems;

// Skill 7: Real Life
const genRealLife = () => {
    return [
        _mkQ('If a cab costs $\\$3$ base plus $\\$2$ per mile, how far for $\\$13$?', [`$5$ miles`,`$4$ miles`,`$6$ miles`,`$10$ miles`], '$3 + 2m = 13 \Rightarrow 2m = 10 \Rightarrow m=5$.'),
        _mkQ('A farmer has chickens (2 legs) and cows (4 legs). If 10 heads and 32 legs, how many cows?', [`$6$`,`$4$`,`$5$`,`$2$`], '$2c + 4(10-c) = 32$ or similar leads to $c=6$ cows.'),
    ];
};
const generateRealLifeQuestions = genRealLife;
const generateRealLifeAssessment = genRealLife;

export const SKILLS = [
    {
        id: 'exponents',
        title: 'Laws of Exponents',
        subtitle: 'Skill 1 · Simplifying Terms',
        icon: '⚡',
        color: '#6366f1',
        desc: 'Product, power, and zero laws to simplify expressions.',
        practice: exponentQuestions,
        assessment: exponentAssessment,
        learn: {
            concept: 'Exponents are shorthand for repeated multiplication. These 9 laws are the rules of algebra that let you simplify even complex expressions.',
            rules: [
                { title: 'Product Law', f: 'x^a \\cdot x^b = x^{a+b}', d: 'When multiplying powers with the same base, ADD the exponents.', ex: 'x^3 \\cdot x^4 = x^7', tip: '3 copies + 4 copies = 7 copies total!', practice: genProductPractice, assessment: genProductAssessment },
                { title: 'Quotient Law', f: '\\frac{x^a}{x^b} = x^{a-b}', d: 'When dividing powers with the same base, SUBTRACT the exponents.', ex: '\\frac{y^8}{y^2} = y^6', tip: 'Cancel matching variables from top and bottom.', practice: genQuotientPractice, assessment: genQuotientAssessment },
                { title: 'Power Law', f: '(x^a)^b = x^{ab}', d: 'A power of a power? MULTIPLY the exponents.', ex: '(x^2)^3 = x^6', tip: 'A group of powers being powered up grows fast!', practice: genPowerPractice, assessment: genPowerAssessment },
                { title: 'Power of Product', f: '(xy)^a = x^ay^a', d: 'Every factor gets the outside power.', ex: '(2x)^3 = 8x^3', tip: 'Remember the number too!', practice: genPowerOfProductPractice, assessment: genPowerOfProductAssessment },
                { title: 'Power of Quotient', f: '(x/y)^a = x^a/y^a', d: 'Top and bottom both get the power.', ex: '(x/3)^2 = x^2/9', tip: 'Distribute power completely.', practice: genPowerOfQuotientPractice, assessment: genPowerOfQuotientAssessment },
                { title: 'Zero Law', f: 'x^0 = 1', d: 'Anything non-zero to power 0 is 1.', ex: '525^0 = 1', tip: 'No matter the size, power 0 makes it 1!', practice: genZeroLawPractice, assessment: genZeroLawAssessment },
                { title: 'Identity Law', f: 'x^1 = x', d: 'Power 1 remains the same.', ex: 'y^1 = y', tip: 'Exponent 1 is usually invisible.', practice: genIdentityLawPractice, assessment: genIdentityLawAssessment },
                { title: 'Negative Law', f: 'x^{-n} = 1/x^n', d: 'Negative means reciprocal. Move to bottom.', ex: 'x^{-2} = 1/x^2', tip: 'Minus sign is a ticket to cross the line!', practice: genNegativeLawPractice, assessment: genNegativeLawAssessment },
                { title: 'Fractional Law', f: 'x^{a/b} = \\sqrt[b]{x^a}', d: 'Fractional powers are roots.', ex: 'x^{1/2} = \\sqrt{x}', tip: 'Bottom = Root. Top = Power.', practice: genFractionalLawPractice, assessment: genFractionalLawAssessment },
            ]
        }
    },
    {
        id: 'liketerms',
        title: 'Identifying Like & Unlike Terms',
        subtitle: 'Skill 2',
        icon: '🤝',
        color: '#0891b2',
        desc: 'Combine matching variables and powers accurately.',
        practice: likeTermsQuestions,
        assessment: likeTermsAssessment,
        learn: {
            concept: 'Like terms are the mathematical identical twins. To combine them, they must share the exact same variable part.',
            rules: [
                { title: 'Variable Match', f: '3x + 5x = 8x', d: 'Match the letters.', ex: '$3x + 4y$ stays as $3x + 4y$', tip: "Apples and oranges can't mix!" },
                { title: 'Power Match', f: 'x^2 + 2x^2 = 3x^2', d: 'Letters AND powers must match.', ex: '$x^2 + x^3$ cannot be added', tip: 'Check the tiny numbers above the letters.' },
                { title: 'Coeff Rule', f: '7a - 2a = 5a', d: 'Add/sub numbers, keep letters same.', ex: '$5x^2 + 4x^2 = 9x^2$', tip: 'You are counting how many you have.' },
                { title: 'Invisible Coeff.', f: 'x = 1x', d: 'No number means 1.', ex: '$x + 3x = 4x$', tip: "Don't forget the '1'!" },
            ]
        }
    },
    {
        id: 'expressions',
        title: 'Simplifying Expressions',
        subtitle: 'Skill 3',
        icon: '📝',
        color: '#f59e0b',
        desc: 'Solve multi-part algebraic phrases with ease.',
        practice: expressionQuestions,
        assessment: expressionAssessment,
        learn: {
            concept: 'Simplifying means writing the shortest form by combining all possible terms.',
            rules: [
                { title: 'Distribution', f: 'a(b + c) = ab + ac', d: 'Visit everyone inside.', ex: '3(x + 2) = 3x + 6', tip: 'Fairness rule: multiply everything!' },
                { title: 'Combo Order', f: 'Group \\rightarrow Combine', d: 'Group like terms first.', ex: '3x + 5 + 2x = 5x + 5', tip: 'Organizer first, then math.' },
                { title: 'Sign Safety', f: '-(x + y) = -x - y', d: 'Minus in front flips every sign.', ex: '10 - (x + 3) = 7 - x', tip: 'Minus is like -1.' },
                { title: 'PEMDAS', f: 'Order Matters', d: 'Standard order apply.', ex: '2 + 3(x) is NOT 5x', tip: 'Mult before Add!' },
            ]
        }
    },
    {
        id: 'solving',
        title: 'Solving Equations',
        subtitle: 'Skill 4',
        icon: '⚖️',
        color: '#8b5cf6',
        desc: 'Finding the value of variables in different equation types.',
        assessment: equationAssessment,
        practiceCategories: [
            { id: 'linear1', title: 'Linear Equations (1 Variable)', questions: generateEquationQuestionsLinear1 },
            { id: 'linear2', title: 'Pair of Linear Equations (2 Vars)', questions: generateEquationQuestionsLinear2 },
            { id: 'quadratic', title: 'Quadratic Equations', questions: generateEquationQuestionsQuadratic }
        ],
        learn: {
            concept: 'Solving an equation is like balancing a scale.',
            rules: [
                { title: 'Inverse Ops.', f: '+ \\leftrightarrow -, \\times \\leftrightarrow /', d: 'Use opposite to undo.', ex: '$x + 4 = 10 \\rightarrow x = 6$', tip: 'Undo to isolate.' },
                { title: 'Isolation', f: 'x = \\text{Ans}', d: 'Get x alone.', ex: '$2x = 12 \\rightarrow x = 6$', tip: 'Peel the onion.' },
                { title: 'Substitution', f: 'y = 2x, x+y=6', d: 'Plug one into another.', ex: '$x + (2x) = 6 \\rightarrow x=2$', tip: 'Merge equations.' },
                { title: 'Factoring', f: 'x^2-9=(x+3)(x-3)', d: 'Roots for quadratics.', ex: '$x^2-5x+6 = (x-2)(x-3)$', tip: 'Find the zero points.' },
            ]
        }
    },
    {
        id: 'subject',
        title: 'Change of Subject',
        subtitle: 'Skill 5',
        icon: '🔄',
        color: '#ec4899',
        desc: 'Rearrange formulas to highlight a specific variable.',
        practice: subjectQuestions,
        assessment: subjectAssessment,
        learn: {
            concept: 'Decide which variable gets to be the star.',
            rules: [
                { title: 'Mirror Rule', f: 'a = b \\rightarrow b = a', d: 'Swap sides safely.', ex: '10 = x + 2 \\rightarrow x + 2 = 10', tip: 'Swap first if easier.' },
                { title: 'Reverse PEMDAS', f: 'SADMEP', d: 'Undo Add/Sub first.', ex: '$y = 3x+5 \\rightarrow (y-5)/3 = x$', tip: 'Peel outer layers first.' },
                { title: 'Square/Root', f: 'x^2 \\leftrightarrow \\sqrt{x}', d: 'Undo one with another.', ex: '$A = l^2 \\rightarrow l = \\sqrt{A}$', tip: 'Root cancels square.' },
                { title: 'Fraction Clear', f: 'x/y=z \\rightarrow x=zy', d: 'Mult by bottom.', ex: '$v = d/t \\rightarrow d = vt$', tip: 'Get a flat equation.' },
            ]
        }
    },
    {
        id: 'wordproblems',
        title: 'Word Problems',
        subtitle: 'Skill 6',
        icon: '🌍',
        color: '#10b981',
        desc: 'Apply algebra to real-life by converting words to math.',
        practice: wordProblemQuestions,
        assessment: wordProblemAssessment,
        learn: {
            concept: 'Convert English to Math equations.',
            rules: [
                { title: 'Translate', f: 'Sum=+, Prod=*', d: 'Code keywords into symbols.', ex: '"5 more than x" is $x+5$', tip: 'Read carefully!' },
                { title: 'Variables', f: 'Let x = ...', d: 'Name the mystery.', ex: '"How many apples?" Let a = apples', tip: 'Ends usually tell you what x is.' },
                { title: 'Build', f: 'L=R', d: 'Balanced equation. "Is" means equals.', ex: '"3x is 12" $\\rightarrow 3x=12$', tip: '"Is" is the center.' },
                { title: 'Scenarios', f: 'Real World', d: 'Solve money, time, distance.', ex: '$3t = 15 \Rightarrow t=5$', tip: 'Does it make sense?' },
            ]
        }
    },
    {
        id: 'reallife',
        title: 'Algebra in Action',
        subtitle: 'Skill 7 · Real Life',
        icon: '🌟',
        color: '#f43f5e',
        desc: 'Solve real-world mysteries using Algebra superpower.',
        practice: generateRealLifeQuestions,
        assessment: generateRealLifeAssessment,
        learn: {
            concept: 'Manage money and count animals with Algebra!',
            rules: [
                { title: 'Identity', f: 'Mystery = x', d: 'Name the unknown.', ex: '"Chickens" $\\rightarrow$ Let x = chi.', tip: 'Naming makes it solvable!' },
                { title: 'Translation', f: 'Talk \\rightarrow Math', d: 'Convert clues.', ex: '"Double plus $5$" $\\rightarrow 2p+5$', tip: 'Look for totals.' },
                { title: 'Balance', f: 'Scale', d: 'LHS = RHS.', ex: '$2c + 4s = 92$', tip: 'Keep it balanced.' },
                { title: 'Verification', f: 'Check', d: 'Plug it back in.', ex: 'Do 5 chickens have 10 legs?', tip: 'Common sense is key.' },
            ]
        }
    }
];
