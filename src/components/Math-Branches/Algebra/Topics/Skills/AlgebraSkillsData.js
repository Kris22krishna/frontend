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
        _mkQ(`Simplify: $\\left(\\frac{x}{y}\\right)^{${p}}$`, [`$\\frac{x^{${p}}}{y^{${p}}}$`,`$\\frac{x}{y^{${p}}}$`,`$x^{${p}}y^{${p}}$`,`$\\frac{${p}x}{${p}y}$`], `Distribute power to both.`),
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

// --- OTHER SKILLS — DYNAMIC GENERATORS (20+ questions each) ---

// ── Skill 2: Identifying Like & Unlike Terms ──────────────────────────────
const genLikeTerms = () => {
    const qs = [];
    // Block A – identify like-term pairs
    const vars = ['x','y','a','b','m','n','p','q'];
    for (let i = 0; i < 5; i++) {
        const v = vars[i % vars.length];
        const w = vars[(i + 1) % vars.length];
        const cA = _rnd(2,9), cB = _rnd(2,9);
        qs.push(_mkQ(
            `Which pair are LIKE terms?`,
            [`$${cA}${v}, ${cB}${v}$`, `$${cA}${v}, ${cB}${w}$`, `$${v}^2, ${v}^3$`, `$${cA}, ${cA}${v}$`],
            `Like terms share the same variable and power. $${cA}${v}$ and $${cB}${v}$ both have $${v}$.`
        ));
    }
    // Block B – simplify addition/subtraction of like terms
    const pairs = [
        [3,5,'x'], [7,2,'y'], [6,4,'a'], [8,3,'b'], [5,5,'n'],
        [9,1,'m'], [4,4,'p'], [2,7,'q'], [10,3,'x'], [6,6,'y']
    ];
    pairs.forEach(([cA, cB, v]) => {
        const sum = cA + cB, diff = Math.abs(cA - cB);
        qs.push(_mkQ(
            `Simplify: $${cA}${v} + ${cB}${v}$`,
            [`$${sum}${v}$`, `$${sum}${v}^2$`, `$${cA*cB}${v}$`, `$${diff}${v}$`],
            `Add coefficients: $${cA} + ${cB} = ${sum}$.`
        ));
    });
    // Block C – subtraction
    const subPairs = [
        [10,4,'x'], [8,3,'y'], [9,2,'a'], [7,5,'b'], [6,1,'m']
    ];
    subPairs.forEach(([cA, cB, v]) => {
        const diff = cA - cB;
        qs.push(_mkQ(
            `Simplify: $${cA}${v} - ${cB}${v}$`,
            [`$${diff}${v}$`, `$${cA+cB}${v}$`, `$${cA*cB}${v}$`, `$${diff}${v}^2$`],
            `Subtract coefficients: $${cA} - ${cB} = ${diff}$.`
        ));
    });
    // Block D – mixed with unlike terms
    qs.push(_mkQ('Simplify: $4a + 5b - a$', [`$3a + 5b$`,`$8ab$`,`$9ab$`,`$4$`], 'Combine $4a - a = 3a$; $b$ stays.'));
    qs.push(_mkQ('Simplify: $3x + 2y + x - y$', [`$4x + y$`,`$5xy$`,`$4x - y$`,`$6x + y$`], 'Group: $3x+x=4x$ and $2y-y=y$.'));
    qs.push(_mkQ('Simplify: $5m + 2n - 3m + n$', [`$2m + 3n$`,`$8mn$`,`$2m - 3n$`,`$3m + n$`], 'Group like terms: $5m-3m=2m$, $2n+n=3n$.'));
    qs.push(_mkQ('Simplify: $x^2 + 3x + 2x^2 - x$', [`$3x^2 + 2x$`,`$5x^3$`,`$3x^2 - 2x$`,`$6x^2$`], '$x^2+2x^2=3x^2$; $3x-x=2x$.'));
    qs.push(_mkQ('Which of these CANNOT be simplified further?', [`$3x + 4y$`,`$2x + 5x$`,`$3a - a$`,`$4b + b$`], '$3x + 4y$ has unlike terms — cannot combine.'));
    return _shuffle(qs).slice(0, 20);
};
const likeTermsQuestions = genLikeTerms;
const likeTermsAssessment = genLikeTerms;

// ── Skill 3: Simplifying Expressions ────────────────────────────────────
const genExpressions = () => {
    const qs = [];
    // Block A – basic distribution
    const distData = [
        [2,'x',5, '2x+10', '2x+5', '7x', 'x+10'],
        [3,'x',4, '3x+12', '3x+4', '7x', 'x+12'],
        [4,'a',2, '4a+8',  '4a+2', '6a', 'a+8'],
        [5,'b',3, '5b+15', '5b+3', '8b', 'b+15'],
        [2,'m',7, '2m+14', '2m+7', '9m', 'm+14'],
    ];
    distData.forEach(([k, v, c, correct, w1, w2, w3]) => {
        qs.push(_mkQ(
            `Expand: $${k}(${v} + ${c})$`,
            [`$${correct}$`, `$${w1}$`, `$${w2}$`, `$${w3}$`],
            `Multiply $${k}$ by each term: $${k}\\times ${v}=${k}${v}$, $${k}\\times${c}=${k*c}$.`
        ));
    });
    // Block B – distribution with subtraction
    const subData = [
        [3,'x',4,'6x-12','6x-4','5x-7','x-12', 2],
        [2,'y',5,'2y-10','2y-5','7y','y-10', 1],
        [4,'a',3,'4a-12','4a-3','7a','a-12', 1],
        [5,'b',2,'5b-10','5b-2','7b','b-10', 1],
    ];
    subData.forEach(([k, v, c, correct, w1, w2, w3]) => {
        qs.push(_mkQ(
            `Expand: $${k}(${v} - ${c})$`,
            [`$${correct}$`, `$${w1}$`, `$${w2}$`, `$${w3}$`],
            `Distribute: $${k}\\times${v}=${k}${v}$, $${k}\\times(-${c})=-${k*c}$.`
        ));
    });
    // Block C – simplify after expanding
    qs.push(_mkQ('Simplify: $5(x+1)+2x$', [`$7x+5$`,`$5x+3$`,`$12x$`,`$7x+1$`], '$5x+5+2x=7x+5$.'));
    qs.push(_mkQ('Simplify: $3(a+2)+2a$', [`$5a+6$`,`$3a+6$`,`$5a+2$`,`$6a$`], '$3a+6+2a=5a+6$.'));
    qs.push(_mkQ('Simplify: $2(x+3)-x$', [`$x+6$`,`$2x+6$`,`$x-6$`,`$3x+6$`], '$2x+6-x=x+6$.'));
    qs.push(_mkQ('Simplify: $4(y-1)+3y$', [`$7y-4$`,`$4y-1$`,`$7y+4$`,`$y-4$`], '$4y-4+3y=7y-4$.'));
    qs.push(_mkQ('Simplify: $-(x-4)$', [`$-x+4$`,`$-x-4$`,`$x-4$`,`$x+4$`], 'Multiply by $-1$: flip every sign inside.'));
    qs.push(_mkQ('Simplify: $2(a+b)-a$', [`$a+2b$`,`$2a+2b$`,`$ab$`,`$2b$`], '$2a+2b-a=a+2b$.'));
    // Block D – collecting like terms after expanding two brackets
    qs.push(_mkQ('Simplify: $2(x+3)+3(x+1)$', [`$5x+9$`,`$5x+4$`,`$6x+9$`,`$5x+6$`], '$2x+6+3x+3=5x+9$.'));
    qs.push(_mkQ('Simplify: $4(a-2)-2(a+1)$', [`$2a-10$`,`$2a-6$`,`$6a-10$`,`$2a+10$`], '$4a-8-2a-2=2a-10$.'));
    qs.push(_mkQ('Simplify: $3(2x-1)+x$', [`$7x-3$`,`$6x-3$`,`$7x+3$`,`$6x-1$`], '$6x-3+x=7x-3$.'));
    qs.push(_mkQ('Simplify: $5(m+2)-3(m-1)$', [`$2m+13$`,`$2m+7$`,`$8m+7$`,`$2m-13$`], '$5m+10-3m+3=2m+13$.'));
    qs.push(_mkQ('Simplify: $(x+2)(x+3)$ — identify correct expansion', [`$x^2+5x+6$`,`$x^2+6x+6$`,`$x^2+5x+5$`,`$x^2+6$`], 'FOIL: $x^2+3x+2x+6=x^2+5x+6$.'));
    return _shuffle(qs).slice(0, 20);
};
const expressionQuestions = genExpressions;
const expressionAssessment = genExpressions;

// ── Skill 4: Solving Equations ───────────────────────────────────────────
const generateEquationQuestionsLinear1 = () => {
    const a = _rnd(2, 9), b = _rnd(1, 12), x = _rnd(1, 10);
    const result = a * x + b;
    return [_mkQ(
        `Solve for $x$: $${a}x + ${b} = ${result}$`,
        [`$x=${x}$`, `$x=${x+1}$`, `$x=${x-1}$`, `$x=${a+b}$`],
        `Subtract $${b}$: $${a}x=${result-b}$, divide by $${a}$: $x=${x}$.`
    )];
};
const generateEquationQuestionsLinear2 = () => {
    const S = _rnd(8,14), D = _rnd(2,6);
    const x = (S+D)/2, y = (S-D)/2;
    if (!Number.isInteger(x) || !Number.isInteger(y)) return generateEquationQuestionsLinear2();
    return [_mkQ(
        `If $x+y=${S}$ and $x-y=${D}$, find $x$.`,
        [`$${x}$`, `$${y}$`, `$${S}$`, `$${D}$`],
        `Add equations: $2x=${S+D}$, so $x=${x}$.`
    )];
};
const generateEquationQuestionsQuadratic = () => {
    const r1 = _rnd(1,6), r2 = _rnd(1,6);
    const bCoeff = -(r1+r2), cCoeff = r1*r2;
    const signB = bCoeff < 0 ? '-' : '+';
    const absB = Math.abs(bCoeff);
    return [_mkQ(
        `Solve: $x^2 ${signB} ${absB}x + ${cCoeff} = 0$`,
        [`$x=${r1}$ or $x=${r2}$`, `$x=${-r1}$ or $x=${-r2}$`, `$x=${r1+r2}$`, `$x=${cCoeff}$`],
        `Factor as $(x-${r1})(x-${r2})=0$; roots are $${r1}$ and $${r2}$.`
    )];
};

// Full 20-question dynamic practice for Solving Equations
const genSolvingPractice = () => {
    const qs = [];
    // 8 basic linear (ax + b = c)
    for (let i = 0; i < 8; i++) qs.push(...generateEquationQuestionsLinear1());
    // 5 two-variable pairs
    for (let i = 0; i < 5; i++) qs.push(...generateEquationQuestionsLinear2());
    // 4 quadratics
    for (let i = 0; i < 4; i++) qs.push(...generateEquationQuestionsQuadratic());
    // 3 misc linear
    qs.push(_mkQ('Solve: $3x - 7 = 14$', [`$x=7$`,`$x=3$`,`$x=5$`,`$x=21$`], '$3x=21$, $x=7$.'));
    qs.push(_mkQ('Solve: $\\frac{x}{4} = 5$', [`$x=20$`,`$x=1.25$`,`$x=9$`,`$x=4$`], 'Multiply both sides by 4.'));
    qs.push(_mkQ('Solve: $2(x+3)=16$', [`$x=5$`,`$x=8$`,`$x=4$`,`$x=11$`], '$x+3=8$, $x=5$.'));
    return _shuffle(qs).slice(0, 20);
};
const equationAssessment = () => {
    const qs = [];
    for (let i = 0; i < 8; i++) qs.push(...generateEquationQuestionsLinear1());
    for (let i = 0; i < 5; i++) qs.push(...generateEquationQuestionsLinear2());
    for (let i = 0; i < 4; i++) qs.push(...generateEquationQuestionsQuadratic());
    qs.push(_mkQ('Solve: $5x + 3 = 28$', [`$x=5$`,`$x=6$`,`$x=4$`,`$x=31$`], '$5x=25$, $x=5$.'));
    qs.push(_mkQ('Solve: $\\frac{2x}{3} = 8$', [`$x=12$`,`$x=16$`,`$x=6$`,`$x=4$`], '$2x=24$, $x=12$.'));
    qs.push(_mkQ('Solve: $4(x-1)=20$', [`$x=6$`,`$x=5$`,`$x=4$`,`$x=21$`], '$x-1=5$, $x=6$.'));
    return _shuffle(qs).slice(0, 20);
};

// ── Skill 5: Change of Subject ───────────────────────────────────────────
const genSubject = () => {
    const qs = [];
    const c = _rnd(2,9), d = _rnd(2,8), e = _rnd(2,7), f = _rnd(2,6);
    // Basic add/subtract type: y = x + k
    qs.push(_mkQ(`Make $x$ the subject: $y = x + ${c}$`, [`$x=y-${c}$`,`$x=y+${c}$`,`$x=${c}-y$`,`$x=${c}y$`], `Subtract $${c}$ from both sides.`));
    qs.push(_mkQ(`Make $x$ the subject: $y = x - ${d}$`, [`$x=y+${d}$`,`$x=y-${d}$`,`$x=${d}-y$`,`$x=${d}y$`], `Add $${d}$ to both sides.`));
    qs.push(_mkQ(`Make $a$ the subject: $b = a + ${e}$`, [`$a=b-${e}$`,`$a=b+${e}$`,`$a=${e}-b$`,`$a=${e}b$`], `Subtract $${e}$ from both sides.`));
    // Multiply/divide type: y = kx
    qs.push(_mkQ(`Make $x$ the subject: $A = ${c}x$`, [`$x=A/${c}$`,`$x=${c}A$`,`$x=A-${c}$`,`$x=A+${c}$`], `Divide both sides by $${c}$.`));
    qs.push(_mkQ(`Make $p$ the subject: $Q = ${d}p$`, [`$p=Q/${d}$`,`$p=${d}Q$`,`$p=Q-${d}$`,`$p=Q+${d}$`], `Divide both sides by $${d}$.`));
    qs.push(_mkQ(`Make $t$ the subject: $d = vt$`, [`$t=d/v$`,`$t=dv$`,`$t=v/d$`,`$t=d-v$`], 'Divide both sides by $v$.'));
    qs.push(_mkQ(`Make $r$ the subject: $C = 2\\pi r$`, [`$r=C/(2\\pi)$`,`$r=2\\pi/C$`,`$r=C-2\\pi$`,`$r=C\\cdot 2\\pi$`], 'Divide both sides by $2\\pi$.'));
    qs.push(_mkQ(`Make $h$ the subject: $A = bh$`, [`$h=A/b$`,`$h=Ab$`,`$h=b/A$`,`$h=A+b$`], 'Divide both sides by $b$.'));
    // Two-step: y = kx + c
    qs.push(_mkQ(`Make $x$ the subject: $y = ${c}x + ${d}$`, [`$x=(y-${d})/${c}$`,`$x=(y+${d})/${c}$`,`$x=y/${c}-${d}$`,`$x=y-${d}${c}$`], `Subtract $${d}$, then divide by $${c}$.`));
    qs.push(_mkQ(`Make $x$ the subject: $P = ${e}x - ${f}$`, [`$x=(P+${f})/${e}$`,`$x=(P-${f})/${e}$`,`$x=P/${e}+${f}$`,`$x=P+${f}${e}$`], `Add $${f}$, then divide by $${e}$.`));
    qs.push(_mkQ(`Make $v$ the subject: $E = \\frac{1}{2}mv^2$`, [`$v=\\sqrt{2E/m}$`,`$v=2E/m$`,`$v=\\sqrt{E/m}$`,`$v=2Em$`], 'Multiply by 2, divide by $m$, take square root.'));
    qs.push(_mkQ(`Make $l$ the subject: $A = l^2$`, [`$l=\\sqrt{A}$`,`$l=A^2$`,`$l=A/2$`,`$l=2A$`], 'Take the square root of both sides.'));
    qs.push(_mkQ(`Make $x$ the subject: $ax = 10$`, [`$x=10/a$`,`$x=a/10$`,`$x=10-a$`,`$x=10a$`], 'Divide both sides by $a$.'));
    qs.push(_mkQ(`Make $y$ the subject: $x = 3y + 1$`, [`$y=(x-1)/3$`,`$y=(x+1)/3$`,`$y=x/3-1$`,`$y=3(x-1)$`], 'Subtract 1, then divide by 3.'));
    qs.push(_mkQ(`Make $F$ the subject: $C = (F-32)/1.8$`, [`$F=1.8C+32$`,`$F=C/1.8+32$`,`$F=C-32/1.8$`,`$F=1.8C-32$`], 'Multiply by 1.8, then add 32.'));
    qs.push(_mkQ(`Make $m$ the subject: $F = ma$`, [`$m=F/a$`,`$m=Fa$`,`$m=a/F$`,`$m=F+a$`], 'Divide both sides by $a$.'));
    qs.push(_mkQ(`Make $x$ the subject: $y = \\sqrt{x}$`, [`$x=y^2$`,`$x=y/2$`,`$x=\\sqrt{y}$`,`$x=2y$`], 'Square both sides: $x=y^2$.'));
    qs.push(_mkQ(`Make $r$ the subject: $A = \\pi r^2$`, [`$r=\\sqrt{A/\\pi}$`,`$r=A/(\\pi)$`,`$r=\\sqrt{A}\\pi$`,`$r=A^2/\\pi$`], 'Divide by $\\pi$, take square root.'));
    qs.push(_mkQ(`Make $b$ the subject: $A = \\frac{1}{2}bh$`, [`$b=2A/h$`,`$b=A/(2h)$`,`$b=2Ah$`,`$b=A/h$`], 'Multiply by 2, divide by $h$.'));
    qs.push(_mkQ(`Make $x$ the subject: $y = x/k$`, [`$x=ky$`,`$x=y/k$`,`$x=k/y$`,`$x=y-k$`], 'Multiply both sides by $k$.'));
    return _shuffle(qs).slice(0, 20);
};
const subjectQuestions = genSubject;
const subjectAssessment = genSubject;

// ── Skill 6: Word Problems ───────────────────────────────────────────────
const genWordProblems = () => {
    const qs = [];
    const base = _rnd(3,8), rate = _rnd(1,3), total = base + rate * _rnd(3,7);
    const items = Math.round((total - base) / rate);
    qs.push(_mkQ(
        `A shop charges $\\$${base}$ entry plus $\\$${rate}$ per game. Total bill: $\\$${total}$. How many games?`,
        [`$${items}$`, `$${items+1}$`, `$${items-1}$`, `$${base+rate}$`],
        `$${rate}g + ${base} = ${total}\\Rightarrow g = ${items}$.`
    ));
    // Age problem
    const ageNow = _rnd(10,30), ageYears = _rnd(3,10);
    const ageFuture = ageNow + ageYears;
    qs.push(_mkQ(
        `Sam is $${ageNow}$ years old. In $${ageYears}$ years, how old will Sam be?`,
        [`$${ageFuture}$`, `$${ageNow-ageYears}$`, `$${ageNow+2*ageYears}$`, `$2\\times${ageNow}$`],
        `$${ageNow} + ${ageYears} = ${ageFuture}$.`
    ));
    // Consecutive integers
    const start = _rnd(3,10);
    const sumThree = start + (start+1) + (start+2);
    qs.push(_mkQ(
        `Three consecutive integers sum to $${sumThree}$. What is the smallest?`,
        [`$${start}$`, `$${start+1}$`, `$${start-1}$`, `$${start+2}$`],
        `$x+(x+1)+(x+2)=${sumThree}\\Rightarrow x=${start}$.`
    ));
    // Perimeter
    const width = _rnd(4,10), perim = _rnd(24,40);
    const length = (perim/2) - width;
    if (Number.isInteger(length) && length > width) {
        qs.push(_mkQ(
            `A rectangle has perimeter $${perim}$ cm and width $${width}$ cm. Find the length.`,
            [`$${length}$ cm`, `$${perim-width}$ cm`, `$${width}$ cm`, `$${perim/4}$ cm`],
            `$2(l+${width})=${perim}\\Rightarrow l=${length}$ cm.`
        ));
    }
    // Shared cost
    const cost = _rnd(30,80), people = _rnd(3,6);
    const share = cost / people;
    if (Number.isInteger(share)) {
        qs.push(_mkQ(
            `$${people}$ friends share a bill of $\\$${cost}$ equally. How much does each pay?`,
            [`$\\$${share}$`, `$\\$${cost-people}$`, `$\\$${share+1}$`, `$\\$${cost*people}$`],
            `$${cost}\\div${people}=${share}$.`
        ));
    }
    // Double & add
    const secret = _rnd(4,12), doubleAdd = 2 * secret + _rnd(3,9);
    const addK = doubleAdd - 2 * secret;
    qs.push(_mkQ(
        `Double a number then add $${addK}$ gives $${doubleAdd}$. Find the number.`,
        [`$${secret}$`, `$${secret+1}$`, `$${secret-1}$`, `$${doubleAdd}$`],
        `$2n+${addK}=${doubleAdd}\\Rightarrow n=${secret}$.`
    ));
    // Static bank of extra problems
    qs.push(_mkQ('A pizza costs $\\$8$ and each topping is $\\$1.50$. Total $\\$14$. How many toppings?', [`$4$`,`$2$`,`$6$`,`$5$`], '$1.5t+8=14\\Rightarrow t=4$.'));
    qs.push(_mkQ('A bus carries 45 passengers. After 3 stops with 5 exiting each, how many remain?', [`$30$`,`$35$`,`$25$`,`$40$`], '$45-3\\times5=30$.'));
    qs.push(_mkQ('A jacket is 20% off its original price of $\\$60$. Sale price?', [`$\\$48$`,`$\\$50$`,`$\\$40$`,`$\\$55$`], '0.8×60=48.'));
    qs.push(_mkQ('Two numbers differ by 7. Their sum is 33. Find the larger number.', [`$20$`,`$13$`,`$26$`,`$23$`], '$x+(x-7)=33\\Rightarrow x=20$.'));
    qs.push(_mkQ('A train travels 240 km in 3 hours. Speed?', [`$80$ km/h`,`$60$ km/h`,`$720$ km/h`,`$90$ km/h`], '$\\text{speed}=240/3=80$.'));
    qs.push(_mkQ('Tom has $3t$ sweets and Liz has $t+10$. They have 30 total. Find $t$.', [`$5$`,`$10$`,`$6$`,`$4$`], '$3t+t+10=30\\Rightarrow 4t=20\\Rightarrow t=5$.'));
    qs.push(_mkQ('A rectangle has a length twice its width. Perimeter is 48 cm. Find the width.', [`$8$ cm`,`$12$ cm`,`$16$ cm`,`$6$ cm`], '$2(2w+w)=48\\Rightarrow w=8$.'));
    qs.push(_mkQ('If 5 pens cost $\\$3.50$, how much do 8 pens cost?', [`$\\$5.60$`,`$\\$4.50$`,`$\\$7.00$`,`$\\$6.00$`], '$0.70\\times8=5.60$.'));
    qs.push(_mkQ('A tank has 200 litres. It leaks 4 litres per hour. When will it be empty?', [`$50$ hours`,`$40$ hours`,`$196$ hours`,`$25$ hours`], '$200/4=50$ hours.'));
    qs.push(_mkQ('The sum of two numbers is 25 and one is 3 more than the other. Smaller number?', [`$11$`,`$14$`,`$12$`,`$13$`], '$x+(x+3)=25\\Rightarrow x=11$.'));
    qs.push(_mkQ('Maria earns $\\$12$ per hour and works 35 hours. She saves $\\$180$. Spending?', [`$\\$240$`,`$\\$180$`,`$\\$420$`,`$\\$60$`], '$12\\times35=420$; $420-180=240$.'));
    qs.push(_mkQ('A number tripled minus 4 equals 20. Find the number.', [`$8$`,`$6$`,`$9$`,`$24$`], '$3n-4=20\\Rightarrow 3n=24\\Rightarrow n=8$.'));
    return _shuffle(qs).slice(0, 20);
};
const wordProblemQuestions = genWordProblems;
const wordProblemAssessment = genWordProblems;

// ── Skill 7: Algebra in Action (Real Life) ───────────────────────────────
const genRealLife = () => {
    const qs = [];
    // Taxi / distance problems
    const baseFare = _rnd(2,5), perMile = _rnd(1,3), miles = _rnd(3,10);
    const totalFare = baseFare + perMile * miles;
    qs.push(_mkQ(
        `A taxi charges $\\$${baseFare}$ base plus $\\$${perMile}$ per mile. Total: $\\$${totalFare}$. Distance?`,
        [`$${miles}$ miles`, `$${miles+1}$ miles`, `$${miles-1}$ miles`, `$${baseFare+perMile}$ miles`],
        `$${perMile}m+${baseFare}=${totalFare}\\Rightarrow m=${miles}$.`
    ));
    // Chicken-cow type
    const cows = _rnd(3,7), chickens = 10 - cows;
    const legs = 4*cows + 2*chickens;
    qs.push(_mkQ(
        `A farmer has chickens and cows totalling 10 animals and ${legs} legs. How many cows?`,
        [`$${cows}$`, `$${chickens}$`, `$${cows+1}$`, `$${cows-1}$`],
        `$2c+4(10-c)=${legs}\\Rightarrow c=${cows}$.`
    ));
    // Savings
    const weekly = _rnd(15,30), goal = weekly * _rnd(4,10);
    const weeks = goal / weekly;
    qs.push(_mkQ(
        `You save $\\$${weekly}$ per week. How many weeks to reach $\\$${goal}$?`,
        [`$${weeks}$ weeks`, `$${weeks+1}$ weeks`, `$${weeks-1}$ weeks`, `$${goal}$ weeks`],
        `$${weekly}w=${goal}\\Rightarrow w=${weeks}$.`
    ));
    // Temperature conversion
    const degC = _rnd(0,40);
    const degF = Math.round(degC * 1.8 + 32);
    qs.push(_mkQ(
        `Convert $${degC}°C$ to Fahrenheit using $F=1.8C+32$.`,
        [`$${degF}°F$`, `$${degF+10}°F$`, `$${degF-10}°F$`, `$${degC+32}°F$`],
        `$F=1.8\\times${degC}+32=${degF}$.`
    ));
    // Profit = Revenue - Cost
    const units = _rnd(10,30), costPer = _rnd(2,5), sellPer = costPer + _rnd(2,5);
    const profit = units * (sellPer - costPer);
    qs.push(_mkQ(
        `You buy ${units} items at $\\$${costPer}$ each and sell at $\\$${sellPer}$ each. Profit?`,
        [`$\\$${profit}$`, `$\\$${units*sellPer}$`, `$\\$${units*costPer}$`, `$\\$${profit+costPer}$`],
        `Profit $=${units}\\times(${sellPer}-${costPer})=${profit}$.`
    ));
    // Speed-distance-time
    const speed = _rnd(40,100), time = _rnd(2,5);
    const dist = speed * time;
    qs.push(_mkQ(
        `A car travels at $${speed}$ km/h for $${time}$ hours. Distance covered?`,
        [`$${dist}$ km`, `$${speed+time}$ km`, `$${dist/2}$ km`, `$${speed*time+10}$ km`],
        `$d=s\\times t=${speed}\\times${time}=${dist}$ km.`
    ));
    // Mobile data
    const dataUsed = _rnd(2,6), remaining = _rnd(1,4), total = dataUsed + remaining;
    qs.push(_mkQ(
        `A phone plan has $${total}$ GB data. You used $${dataUsed}$ GB. Remaining?`,
        [`$${remaining}$ GB`, `$${total}$ GB`, `$${dataUsed}$ GB`, `$${total+dataUsed}$ GB`],
        `$${total}-${dataUsed}=${remaining}$ GB.`
    ));
    // Static classics
    qs.push(_mkQ('A shop sells pens for $\\$2$ and rulers for $\\$3$. Total $\\$24$ buying 10 items. How many pens?', [`$6$`,`$4$`,`$8$`,`$5$`], '$2p+3(10-p)=24\\Rightarrow p=6$.'));
    qs.push(_mkQ('A recipe uses 3 cups flour for 12 cookies. Cups for 40 cookies?', [`$10$`,`$12$`,`$8$`,`$15$`], '$3/12\\times40=10$.'));
    qs.push(_mkQ('A phone costs $\\$600$ on a 12-month plan. Monthly payment?', [`$\\$50$`,`$\\$60$`,`$\\$48$`,`$\\$55$`], '$600\\div12=50$.'));
    qs.push(_mkQ('A runner does 5 km in 25 min. Time for 15 km at the same pace?', [`$75$ min`,`$50$ min`,`$60$ min`,`$45$ min`], '$5$ min/km $\\times15=75$ min.'));
    qs.push(_mkQ('Electricity costs $\\$0.12$ per kWh. Bill for 500 kWh?', [`$\\$60$`,`$\\$50$`,`$\\$120$`,`$\\$6$`], '$0.12\\times500=60$.'));
    qs.push(_mkQ('A classroom has 30 seats. 5 rows are filled. How many seats per row?', [`$6$`,`$5$`,`$25$`,`$150$`], '$30\\div5=6$.'));
    return _shuffle(qs).slice(0, 20);
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
        practice: genSolvingPractice,
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
