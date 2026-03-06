// DeterminantsSkills — Dynamic Question Generators
// Each export is a FUNCTION that returns a fresh array of 10 questions with randomized numbers.

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const NZ = (min, max) => { let n = 0; while (n === 0) n = R(min, max); return n; };

// Helper: make unique options, ensure correct is at index 0 before shuffle
function makeQ(question, correctVal, distractors, explanation) {
    const opts = [String(correctVal)];
    for (const d of distractors) {
        const s = String(d);
        if (!opts.includes(s)) opts.push(s);
    }
    while (opts.length < 4) opts.push(String(correctVal + opts.length * 2 + 1));
    const final = opts.slice(0, 4);
    const shuffled = [...final].sort(() => Math.random() - 0.5);
    return { question, options: shuffled, correct: shuffled.indexOf(final[0]), explanation };
}

// ─── KaTeX helpers ──────────────────────────────────────────────────────
const mat2 = (a, b, c, d) => `$\\begin{vmatrix}${a}&${b}\\\\${c}&${d}\\end{vmatrix}$`;
const bmat2 = (a, b, c, d) => `$\\begin{bmatrix}${a}&${b}\\\\${c}&${d}\\end{bmatrix}$`;

// ─── FUNDAMENTALS ───────────────────────────────────────────────────────
export function generateFundamentalsQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const a = NZ(-9, 9), b = NZ(-9, 9), c = NZ(-9, 9), d = NZ(-9, 9);
        const det = a * d - b * c;
        if (i < 4) {
            // Evaluate 2×2 determinant
            qs.push(makeQ(
                `Evaluate: ${mat2(a, b, c, d)}`,
                det,
                [a * b - c * d, a * c - b * d, a + d],
                `For 2×2: $|A| = ad - bc = (${a})(${d}) - (${b})(${c}) = ${det}$.`
            ));
        } else if (i < 7) {
            // Find k for zero determinant
            const k_a = NZ(1, 6), k_d = NZ(1, 6);
            const k_b = NZ(1, 6);
            // k_a * k_d - k_b * k = 0 => k = (k_a * k_d) / k_b
            const prod = k_a * k_d;
            if (prod % k_b === 0) {
                const kVal = prod / k_b;
                qs.push(makeQ(
                    `Find $k$ if ${mat2(k_a, k_b, kVal, k_d)} = 0$`,
                    kVal,
                    [kVal + 1, kVal - 1, kVal * 2],
                    `$${k_a} \\times ${k_d} - ${k_b} \\times k = 0 \\Rightarrow k = ${kVal}$.`
                ));
            } else {
                qs.push(makeQ(
                    `If $|A| \\neq 0$, matrix $A$ is:`,
                    'Non-singular',
                    ['Singular', 'Zero matrix', 'Undefined'],
                    `Non-zero determinant means the matrix is non-singular (invertible).`
                ));
            }
        } else {
            // Conceptual
            const concepts = [
                makeQ('Determinant is defined only for:', 'Square matrices', ['Any matrix', 'Rectangular matrices', 'Diagonal matrices'], 'Determinants are only defined for square matrices.'),
                makeQ('If determinant = 0, matrix is:', 'Singular', ['Invertible', 'Identity', 'Orthogonal'], 'A zero determinant means the matrix is singular (non-invertible).'),
                makeQ('The determinant of the identity matrix $I_2$ is:', '1', ['0', '2', '−1'], '$|I_2| = 1 \\times 1 - 0 \\times 0 = 1$.'),
            ];
            qs.push(concepts[i - 7]);
        }
    }
    return qs;
}

export function generateFundamentalsAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const a = NZ(-8, 8), b = NZ(-8, 8), c = NZ(-8, 8), d = NZ(-8, 8);
        const det = a * d - b * c;
        if (i < 3) {
            qs.push(makeQ(
                `Evaluate: ${mat2(a, b, c, d)}`,
                det, [a * b - c * d, -det, Math.abs(det) + 1],
                `$|A| = (${a})(${d}) - (${b})(${c}) = ${det}$.`
            ));
        } else if (i < 5) {
            // |A| product rule
            const dA = NZ(-5, 5), dB = NZ(-5, 5);
            qs.push(makeQ(
                `If $|A| = ${dA}$ and $|B| = ${dB}$, find $|AB|$`,
                dA * dB, [dA + dB, dA - dB, Math.abs(dA * dB)],
                `$|AB| = |A| \\times |B| = ${dA} \\times ${dB} = ${dA * dB}$.`
            ));
        } else if (i < 7) {
            // scalar multiplication
            const n = R(2, 3), k = R(2, 4), detA = NZ(-4, 4);
            const result = Math.pow(k, n) * detA;
            qs.push(makeQ(
                `If $|A| = ${detA}$ for a ${n}×${n} matrix, find $|${k}A|$`,
                result, [k * detA, k * k * detA, -result],
                `$|${k}A| = ${k}^{${n}} \\times |A| = ${Math.pow(k, n)} \\times ${detA} = ${result}$.`
            ));
        } else {
            const concepts = [
                makeQ('If two rows are identical, $|A| = ?$', '0', ['1', '−1', 'Undefined'], 'Identical rows always give determinant = 0.'),
                makeQ('Determinant of a triangular matrix equals:', 'Product of diagonal elements', ['Sum of all elements', 'Sum of diagonal', '0'], 'For triangular matrices, determinant = product of diagonal entries.'),
                makeQ('Determinant of a zero matrix is:', '0', ['1', 'Undefined', '−1'], 'All elements are 0, so determinant is 0.'),
            ];
            qs.push(concepts[i - 7]);
        }
    }
    return qs;
}

// ─── PROPERTIES ─────────────────────────────────────────────────────────
export function generatePropertiesQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const n = R(2, 3), k = R(2, 5), detA = NZ(-5, 5);
            const res = Math.pow(k, n) * detA;
            qs.push(makeQ(
                `If $|A| = ${detA}$ for a ${n}×${n} matrix, $|${k}A| = ?$`,
                res, [k * detA, -res, detA],
                `$|${k}A| = ${k}^{${n}} \\cdot |A| = ${Math.pow(k, n)} \\times ${detA} = ${res}$.`
            ));
        } else if (i < 5) {
            const detA = NZ(-5, 5), p = R(2, 3);
            const res = Math.pow(detA, p);
            qs.push(makeQ(
                `If $|A| = ${detA}$, $|A^{${p}}| = ?$`,
                res, [detA * p, -res, Math.abs(res) + 1],
                `$|A^{${p}}| = |A|^{${p}} = ${detA}^{${p}} = ${res}$.`
            ));
        } else if (i < 7) {
            const d1 = NZ(2, 5), d2 = NZ(2, 5), d3 = NZ(2, 5);
            const prod = d1 * d2 * d3;
            qs.push(makeQ(
                `Determinant of diagonal matrix $\\text{diag}(${d1}, ${d2}, ${d3})$ is:`,
                prod, [d1 + d2 + d3, d1 * d2, d2 * d3],
                `Product of diagonal entries: $${d1} \\times ${d2} \\times ${d3} = ${prod}$.`
            ));
        } else {
            const concepts = [
                makeQ('If you swap two rows, the determinant:', 'Changes sign', ['Doubles', 'Stays same', 'Becomes 0'], 'Swapping two rows changes the sign of the determinant.'),
                makeQ('$|A^T| = ?$', '$|A|$', ['$-|A|$', '$1/|A|$', '$0$'], 'Transpose does not change the determinant.'),
                makeQ('Adding $k$ times one row to another:', 'Does not change determinant', ['Changes determinant', 'Makes it 0', 'Doubles it'], 'Row operation $R_i \\to R_i + kR_j$ preserves the determinant.'),
            ];
            qs.push(concepts[i - 7]);
        }
    }
    return qs;
}

export function generatePropertiesAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const detA = NZ(-5, 5);
            const n = 3;
            const negDet = Math.pow(-1, n) * detA;
            qs.push(makeQ(
                `$|-A|$ for a 3×3 matrix with $|A| = ${detA}$:`,
                negDet, [-negDet, detA, -detA],
                `$|-A| = (-1)^3 |A| = ${negDet}$.`
            ));
        } else if (i < 5) {
            const detA = NZ(2, 5);
            qs.push(makeQ(
                `If $|A| = ${detA}$, $|A^{-1}| = ?$`,
                `$1/${detA}$`, [`$${detA}$`, `$-${detA}$`, `$${detA * detA}$`],
                `$|A^{-1}| = 1/|A| = 1/${detA}$.`
            ));
        } else {
            const concepts = [
                makeQ('If a row of $A$ is all zeros, $|A| = ?$', '0', ['1', '−1', 'Undefined'], 'A row of zeros means determinant = 0.'),
                makeQ('If $A$ is singular, $|A| = ?$', '0', ['1', '−1', 'Positive'], 'Singular means $|A| = 0$.'),
                makeQ('If $R_1 \\leftrightarrow R_2$ is applied twice:', 'Determinant unchanged', ['Determinant × 4', 'Determinant = 0', 'Determinant × −1'], 'Two swaps: sign changes twice → back to original.'),
                makeQ('If $A$ satisfies $A^2 = I$, possible $|A|$ values:', '$1$ or $-1$', ['Only $1$', 'Only $-1$', '$0$'], '$|A^2| = |I| \\Rightarrow |A|^2 = 1 \\Rightarrow |A| = \\pm 1$.'),
                makeQ('Multiplying one row by $k$ multiplies $|A|$ by:', '$k$', ['$k^2$', '$k^n$', '$1/k$'], 'Scaling one row by $k$ multiplies determinant by $k$.'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

// ─── AREA & COLLINEARITY ────────────────────────────────────────────────
export function generateAreaQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 4) {
            const x1 = R(0, 5), y1 = R(0, 5), x2 = R(0, 8), y2 = R(0, 8), x3 = R(0, 8), y3 = R(0, 8);
            const area2 = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
            const areaStr = area2 % 2 === 0 ? `${area2 / 2}` : `${area2}/2`;
            qs.push(makeQ(
                `Area of triangle with vertices $(${x1},${y1})$, $(${x2},${y2})$, $(${x3},${y3})$:`,
                areaStr,
                [`${area2}`, `${area2 + 2}`, `${Math.max(1, area2 / 2 - 1)}`],
                `Area $= \\frac{1}{2}|${x1}(${y2}-${y3}) + ${x2}(${y3}-${y1}) + ${x3}(${y1}-${y2})| = ${areaStr}$.`
            ));
        } else if (i < 7) {
            // Collinear points (make y = mx + c)
            const m = NZ(-2, 2), cc = R(-3, 3);
            const x1 = R(0, 3), x2 = x1 + R(1, 3), x3 = x2 + R(1, 3);
            const y1 = m * x1 + cc, y2 = m * x2 + cc, y3 = m * x3 + cc;
            qs.push(makeQ(
                `Points $(${x1},${y1})$, $(${x2},${y2})$, $(${x3},${y3})$ are:`,
                'Collinear',
                ['Non-collinear', 'Perpendicular', 'Parallel'],
                `Area $= 0$ since these points lie on the line $y = ${m}x + ${cc}$. Hence collinear.`
            ));
        } else {
            const concepts = [
                makeQ('Area of triangle with collinear points is:', '0', ['1', 'Undefined', '½'], 'Collinear points form no triangle, area = 0.'),
                makeQ('The area formula always gives:', 'Absolute value (non-negative)', ['Positive value', 'Negative value', 'Zero'], 'We take the absolute value, so area is always non-negative.'),
                makeQ('For collinearity test, determinant should be:', '0', ['1', '−1', 'Positive'], 'Three points are collinear if and only if the determinant = 0.'),
            ];
            qs.push(concepts[i - 7]);
        }
    }
    return qs;
}

export function generateAreaAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 4) {
            const x1 = R(0, 6), y1 = R(0, 6), x2 = R(0, 8), y2 = R(0, 8), x3 = R(0, 8), y3 = R(0, 8);
            const area2 = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
            const areaStr = area2 % 2 === 0 ? `${area2 / 2}` : `${area2}/2`;
            qs.push(makeQ(
                `Find area of triangle $(${x1},${y1})$, $(${x2},${y2})$, $(${x3},${y3})$:`,
                areaStr,
                [`${area2}`, `${area2 + 3}`, `${Math.max(0, area2 / 2 - 2)}`],
                `Area $= \\frac{1}{2}|${x1}(${y2}-${y3}) + ${x2}(${y3}-${y1}) + ${x3}(${y1}-${y2})| = ${areaStr}$.`
            ));
        } else if (i < 7) {
            const m = NZ(-2, 2), cc = R(-3, 3);
            const x1 = R(1, 3), x2 = x1 + R(1, 3), x3 = x2 + R(1, 3);
            qs.push(makeQ(
                `Check collinearity: $(${x1},${m * x1 + cc})$, $(${x2},${m * x2 + cc})$, $(${x3},${m * x3 + cc})$`,
                'Collinear', ['Not collinear', 'Cannot determine', 'Perpendicular'],
                `Area determinant = 0 since these lie on $y = ${m}x + ${cc}$. Hence collinear.`
            ));
        } else {
            const concepts = [
                makeQ('Area of triangle is negative when:', 'Never (we use absolute value)', ['Points go clockwise', 'Points are collinear', 'Always'], 'Area uses absolute value, so it is always non-negative.'),
                makeQ('For 3 points to form a triangle, area must be:', 'Positive', ['0', 'Negative', '1'], 'Positive area means points are non-collinear (form a triangle).'),
                makeQ('If three vertices yield $|D| = 6$, area = ?', '3', ['6', '12', '36'], 'Area $= \\frac{1}{2}|D| = \\frac{1}{2} \\times 6 = 3$.'),
            ];
            qs.push(concepts[i - 7]);
        }
    }
    return qs;
}

// ─── MINORS & COFACTORS ─────────────────────────────────────────────────
export function generateMinorCofactorQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 4) {
            // Minor of a 2×2
            const a = NZ(-5, 5), b = NZ(-5, 5), c = NZ(-5, 5), d = NZ(-5, 5);
            const positions = [
                { r: 1, c: 1, minor: d, label: `M_{11}`, del: `Delete $R_1,C_1$: leaves $${d}$` },
                { r: 1, c: 2, minor: c, label: `M_{12}`, del: `Delete $R_1,C_2$: leaves $${c}$` },
                { r: 2, c: 1, minor: b, label: `M_{21}`, del: `Delete $R_2,C_1$: leaves $${b}$` },
                { r: 2, c: 2, minor: a, label: `M_{22}`, del: `Delete $R_2,C_2$: leaves $${a}$` },
            ];
            const pos = positions[i];
            qs.push(makeQ(
                `$${pos.label}$ of ${bmat2(a, b, c, d)} is:`,
                pos.minor, [pos.minor + 1, -pos.minor, pos.minor * 2],
                `${pos.del}.`
            ));
        } else if (i < 7) {
            // Cofactor with sign
            const r = R(1, 3), col = R(1, 3);
            const sign = Math.pow(-1, r + col);
            const signStr = sign === 1 ? '+' : '−';
            qs.push(makeQ(
                `Sign pattern at position $(${r},${col})$ is:`,
                signStr, [sign === 1 ? '−' : '+', '0', '±'],
                `$(-1)^{${r}+${col}} = (-1)^{${r + col}} = ${signStr}$.`
            ));
        } else {
            const concepts = [
                makeQ('Minor is the determinant of a:', 'Submatrix', ['Full matrix', 'Transpose', 'Identity'], 'Minor = determinant of submatrix after removing one row and one column.'),
                makeQ('Sum of elements of a row × cofactors of ANOTHER row:', 'Equals 0', ['Equals $|A|$', 'Equals 1', 'Undefined'], 'This is the zero-sum property: elements × cofactors of different row = 0.'),
                makeQ('Expanding along a column with zeros is:', 'Easier', ['Invalid', 'Harder', 'Same difficulty'], 'Zero elements mean fewer terms to compute — much easier!'),
            ];
            qs.push(concepts[i - 7]);
        }
    }
    return qs;
}

export function generateMinorCofactorAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 4) {
            const a = NZ(-5, 5), b = NZ(-5, 5), c = NZ(-5, 5), d = NZ(-5, 5);
            const sign12 = Math.pow(-1, 1 + 2);
            const cofA12 = sign12 * c;
            qs.push(makeQ(
                `Cofactor $A_{12}$ of ${bmat2(a, b, c, d)}:`,
                cofA12, [-cofA12, c, -c],
                `$A_{12} = (-1)^{1+2} \\times M_{12} = ${sign12} \\times ${c} = ${cofA12}$.`
            ));
        } else {
            const concepts = [
                makeQ('Sum $a_{i1}A_{11} + a_{i2}A_{12} + a_{i3}A_{13}$ when $i=1$ gives:', '$|A|$', ['$0$', '$1$', '$\\text{adj}(A)$'], 'Expanding along row 1 gives the determinant.'),
                makeQ('Sum $a_{11}A_{21} + a_{12}A_{22} + a_{13}A_{23} = ?$', '$0$', ['$|A|$', '$1$', '$-|A|$'], 'Elements of row 1 × cofactors of row 2 = 0 (zero-sum property).'),
                makeQ('Number of minors in a 3×3 matrix:', '9', ['3', '6', '27'], 'Each of the 9 elements has its own minor.'),
                makeQ('The cofactor matrix is also called:', 'Matrix of cofactors', ['Adjoint', 'Inverse', 'Transpose'], 'The matrix of cofactors is the matrix formed by cofactors $A_{ij}$ at each position.'),
                makeQ('For a 2×2 matrix, $M_{11} = ?$', '$a_{22}$', ['$a_{11}$', '$a_{12}$', '$a_{21}$'], 'Deleting $R_1,C_1$ leaves just $a_{22}$.'),
                makeQ('If A is upper triangular, cofactors are:', 'Often simpler to compute', ['All zero', 'All positive', 'Not necessarily simpler'], 'Triangular form makes many submatrices also triangular, simplifying calculation.'),
            ];
            qs.push(concepts[i - 4]);
        }
    }
    return qs;
}

// ─── ADJOINT & INVERSE ──────────────────────────────────────────────────
export function generateAdjointInverseQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const detA = NZ(2, 6), n = R(2, 3);
            const adjDet = Math.pow(detA, n - 1);
            qs.push(makeQ(
                `If $|A| = ${detA}$ for a ${n}×${n} matrix, $|\\text{adj }A| = ?$`,
                adjDet, [detA, Math.pow(detA, n), detA * 2],
                `$|\\text{adj }A| = |A|^{n-1} = ${detA}^{${n - 1}} = ${adjDet}$.`
            ));
        } else if (i < 5) {
            // Inverse of 2×2
            const a = NZ(1, 4), b = NZ(-3, 3), c = NZ(-3, 3), d = NZ(1, 4);
            const det = a * d - b * c;
            if (det !== 0) {
                qs.push(makeQ(
                    `Adjoint of ${bmat2(a, b, c, d)} is:`,
                    `${bmat2(d, -b, -c, a)}`,
                    [`${bmat2(d, b, c, a)}`, `${bmat2(a, -b, -c, d)}`, `${bmat2(-a, b, c, -d)}`],
                    `Swap diagonal, negate off-diagonal: ${bmat2(d, -b, -c, a)}.`
                ));
            } else {
                qs.push(makeQ(
                    'Adjoint of $A$ is the ___ of its cofactor matrix:',
                    'Transpose', ['Inverse', 'Negative', 'Determinant'],
                    `$\\text{adj}(A) = (\\text{cofactor matrix})^T$.`
                ));
            }
        } else {
            const concepts = [
                makeQ('$A \\times \\text{adj}(A) = ?$', '$|A|I$', ['$I$', '$\\text{adj}(A) \\times A$', '$|A|A$'], '$A \\times \\text{adj}(A) = |A| \\times I$.'),
                makeQ('$A^{-1} = ?$', '$\\text{adj}(A)/|A|$', ['$\\text{adj}(A)/A$', '$|A| \\times \\text{adj}(A)$', '$A/|A|$'], '$A^{-1} = \\frac{1}{|A|} \\times \\text{adj}(A)$.'),
                makeQ('Inverse exists only if:', '$|A| \\neq 0$', ['$A$ is rectangular', '$|A| = 0$', '$A = I$'], 'Inverse requires non-zero determinant.'),
                makeQ('If $A^2 = I$, then $A^{-1} = ?$', '$A$', ['$A^2$', '$I$', '$-A$'], '$A^2 = I$ means $A \\times A = I$, so $A^{-1} = A$.'),
                makeQ('Inverse of $I$ (identity) is:', '$I$ itself', ['$O$', '$-I$', '$2I$'], '$I \\times I = I$, so $I^{-1} = I$.'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

export function generateAdjointInverseAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const detA = NZ(-6, 6);
            qs.push(makeQ(
                `If $|A| = ${detA}$, $|A^{-1}| = ?$`,
                `$1/${detA}$`, [`$${detA}$`, `$-${detA}$`, `$${detA * detA}$`],
                `$|A^{-1}| = 1/|A| = 1/${detA}$.`
            ));
        } else {
            const concepts = [
                makeQ('$(A^{-1})^{-1} = ?$', '$A$', ['$I$', '$A^T$', '$O$'], 'Inverting the inverse gives back the original.'),
                makeQ('$(AB)^{-1} = ?$', '$B^{-1}A^{-1}$', ['$A^{-1}B^{-1}$', '$BA$', '$(BA)^{-1}$'], 'Shoe-sock rule: $(AB)^{-1} = B^{-1}A^{-1}$.'),
                makeQ('$(kA)^{-1} = ?$ ($k \\neq 0$)', '$(1/k)A^{-1}$', ['$kA^{-1}$', '$k^2 A^{-1}$', '$A^{-1}/k^2$'], '$(kA)^{-1} = (1/k)A^{-1}$.'),
                makeQ('$(A^T)^{-1} = ?$', '$(A^{-1})^T$', ['$A^{-1}$', '$A^T$', '$A$'], 'Transpose and inverse commute: $(A^T)^{-1} = (A^{-1})^T$.'),
                makeQ('If $A$ is orthogonal ($AA^T = I$), $A^{-1} = ?$', '$A^T$', ['$A$', '$-A$', '$A^2$'], '$AA^T = I$ means $A^T$ is the inverse.'),
                makeQ('For singular matrix, $\\text{adj}(A) \\times A = ?$', '$|A|I = O$', ['$I$', '$A$', 'Undefined'], 'Even for singular: $\\text{adj}(A) \\times A = |A|I = 0 \\times I = O$.'),
                makeQ('$\\text{adj}(AB) = ?$', '$\\text{adj}(B) \\times \\text{adj}(A)$', ['$\\text{adj}(A) \\times \\text{adj}(B)$', '$|AB| \\times I$', '$A \\times B$'], '$\\text{adj}(AB) = \\text{adj}(B) \\times \\text{adj}(A)$, same reversal rule as inverses.'),
            ];
            qs.push(concepts[i - 3]);
        }
    }
    return qs;
}

// ─── APPLICATIONS (Cramer's Rule, Systems) ──────────────────────────────
export function generateApplicationsQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            // System with specific det
            const a1 = NZ(1, 4), b1 = NZ(1, 4), a2 = NZ(1, 4), b2 = NZ(1, 4);
            const det = a1 * b2 - b1 * a2;
            qs.push(makeQ(
                `System: $${a1}x + ${b1}y = c_1$, $${a2}x + ${b2}y = c_2$. $|A| = ?$`,
                det, [a1 * a2 - b1 * b2, a1 + b2, a1 * b2 + b1 * a2],
                `$|A| = ${a1} \\times ${b2} - ${b1} \\times ${a2} = ${det}$.`
            ));
        } else {
            const concepts = [
                makeQ('System $AX = B$ has unique solution when:', '$|A| \\neq 0$', ['$|A| = 0$', '$A = I$', '$B = O$'], 'Unique solution exists when $|A| \\neq 0$.'),
                makeQ('If $|A| = 0$ and $(\\text{adj }A)B = O$:', 'Infinite solutions', ['No solution', 'Unique solution', 'Cannot determine'], '$|A| = 0$ with $(\\text{adj }A)B = O$ means infinitely many solutions.'),
                makeQ('If $|A| = 0$ and $(\\text{adj }A)B \\neq O$:', 'No solution', ['Unique solution', 'Infinite solutions', 'Two solutions'], '$|A| = 0$ with $(\\text{adj }A)B \\neq O$ means inconsistent (no solution).'),
                makeQ("Cramer's Rule uses:", 'Determinants', ['Matrix multiplication', 'Eigenvalues', 'Row reduction'], "Cramer's Rule solves linear systems using determinants."),
                makeQ('Homogeneous system $AX = O$ always has:', 'At least trivial solution', ['No solution', 'Only trivial solution', 'Infinite solutions'], '$X = O$ (trivial solution) always satisfies $AX = O$.'),
                makeQ('For non-trivial solution of $AX = O$:', '$|A| = 0$', ['$|A| \\neq 0$', '$A = I$', '$A = O$'], 'Non-trivial solutions exist only when $|A| = 0$.'),
                makeQ('Matrix method: $X = ?$', '$A^{-1}B$', ['$AB^{-1}$', '$BA^{-1}$', '$B/A$'], '$X = A^{-1}B$ (pre-multiply both sides by $A^{-1}$).'),
            ];
            qs.push(concepts[i - 3]);
        }
    }
    return qs;
}

export function generateApplicationsAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const concepts = [
            makeQ('If $D = 0$ in Cramer\'s Rule:', 'System needs further analysis', ['$x = 0$', 'Unique solution', '$x = D_1$'], 'When $D = 0$, Cramer\'s Rule fails; need to check consistency separately.'),
            makeQ('For 3 equations, 3 unknowns, unique solution requires:', '$|A| \\neq 0$', ['$|A| = 0$', '$A$ is diagonal', '$B = O$'], '3×3 system has unique solution when $|A| \\neq 0$.'),
            makeQ('$X = A^{-1}B$ requires:', '$A$ is square & $|A| \\neq 0$', ['$A$ is rectangular', '$|A| = 0$', '$B = O$'], '$A^{-1}$ exists only when $A$ is square and $|A| \\neq 0$.'),
            makeQ('Homogeneous system with $|A| \\neq 0$ has:', 'Only trivial solution', ['Infinite solutions', 'No solution', 'Two solutions'], '$|A| \\neq 0$ → only $X = O$ (trivial solution).'),
            makeQ('Number of solutions of $AX = B$ when $A$ is singular:', '0 or infinite', ['Always 0', 'Always infinite', 'Exactly 1'], 'Singular $A$ gives either no solution or infinitely many.'),
            makeQ('A consistent system has:', 'At least one solution', ['No solution', 'Exactly two solutions', 'Only zero solution'], 'Consistent = at least one solution (unique or infinite).'),
            makeQ('In matrix method, we compute $X = A^{-1}B$ using:', '$\\text{adj}(A)/|A| \\times B$', ['Row reduction', '$A \\times B$', '$A + B$'], '$A^{-1} = \\text{adj}(A)/|A|$, then $X = A^{-1}B$.'),
        ];
        if (i < 3) {
            const a1 = NZ(1, 5), b1 = NZ(1, 5), a2 = NZ(1, 5), b2 = NZ(1, 5);
            const det = a1 * b2 - b1 * a2;
            if (det !== 0) {
                const c1 = R(1, 10), c2 = R(1, 10);
                const dx = c1 * b2 - b1 * c2;
                qs.push(makeQ(
                    `For $${a1}x+${b1}y=${c1}$, $${a2}x+${b2}y=${c2}$: $D = |A| = ?$`,
                    det, [a1 * a2 - b1 * b2, det + 2, -det],
                    `$|A| = ${a1}(${b2}) - ${b1}(${a2}) = ${det}$.`
                ));
            } else {
                qs.push(concepts[i]);
            }
        } else {
            qs.push(concepts[Math.min(i - 3, concepts.length - 1)]);
        }
    }
    return qs;
}

// ─── EXPANSION (Skill 6 if present) ─────────────────────────────────────
export function generateExpansionQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            // Upper triangular determinant
            const d1 = NZ(1, 5), d2 = NZ(1, 5), d3 = NZ(1, 5);
            const prod = d1 * d2 * d3;
            qs.push(makeQ(
                `Evaluate: $\\begin{vmatrix}${d1}&${R(0, 3)}&${R(0, 3)}\\\\0&${d2}&${R(0, 3)}\\\\0&0&${d3}\\end{vmatrix}$`,
                prod, [d1 + d2 + d3, d1 * d2, d2 * d3],
                `Upper triangular: determinant = product of diagonal = $${d1} \\times ${d2} \\times ${d3} = ${prod}$.`
            ));
        } else if (i < 5) {
            // Diagonal matrix
            const d1 = NZ(1, 5), d2 = NZ(1, 5), d3 = NZ(1, 5);
            const prod = d1 * d2 * d3;
            qs.push(makeQ(
                `Evaluate: $\\begin{vmatrix}${d1}&0&0\\\\0&${d2}&0\\\\0&0&${d3}\\end{vmatrix}$`,
                prod, [d1 + d2 + d3, 0, 1],
                `Diagonal matrix: determinant = $${d1} \\times ${d2} \\times ${d3} = ${prod}$.`
            ));
        } else {
            const concepts = [
                makeQ('Best row/column to expand along has:', 'Most zeros', ['Largest elements', 'All ones', 'Alternating signs'], 'Choose the row/column with the most zeros to minimize computation.'),
                makeQ('For 3×3, expanding along any row/column gives:', 'Same result', ['Different results', 'Only works for $R_1$', 'Only works for $C_1$'], 'Expansion along any row or column always gives the same determinant.'),
                makeQ('Number of terms in 3×3 expansion along one row:', '3', ['2', '6', '9'], 'A 3×3 matrix has 3 elements per row, giving 3 terms.'),
                makeQ('A 3×3 determinant with $R_2 = 2R_1$ evaluates to:', '0', ['$2|A|$', '$4|A|$', '$|A|/2$'], 'Proportional rows → determinant = 0.'),
                makeQ('If $|A| = 5$, and we multiply $R_1$ by 3:', '$|A_{\\text{new}}| = 15$', ['$|A| = 5$', '$|A| = 45$', '$|A| = -15$'], 'Scaling one row by $k$ multiplies determinant by $k$: $5 \\times 3 = 15$.'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

export function generateExpansionAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const d1 = NZ(1, 6), d2 = NZ(1, 6), d3 = NZ(1, 6);
            const prod = d1 * d2 * d3;
            qs.push(makeQ(
                `Determinant of $\\begin{vmatrix}${d1}&0&0\\\\0&${d2}&0\\\\0&0&${d3}\\end{vmatrix}$:`,
                prod, [d1 + d2 + d3, d1 * d2 + d3, 0],
                `Diagonal matrix: determinant = product of diagonal elements = $${d1} \\times ${d2} \\times ${d3} = ${prod}$.`
            ));
        } else if (i < 5) {
            // k determinant
            const k_val = NZ(1, 5);
            const target = R(2, 10);
            const other = target + k_val * k_val;
            qs.push(makeQ(
                `Evaluate $\\begin{vmatrix}k&1\\\\2&k\\end{vmatrix} = ${k_val * k_val - 2}$ gives $k = ?$`,
                `$\\pm\\sqrt{${k_val * k_val}}$`,
                [`$\\pm${k_val + 1}$`, `$\\pm 1$`, `$\\pm 2$`],
                `$k^2 - 2 = ${k_val * k_val - 2} \\Rightarrow k^2 = ${k_val * k_val} \\Rightarrow k = \\pm${k_val}$.`
            ));
        } else {
            const n = R(2, 4), detA = NZ(-4, 4), k = R(2, 4);
            const res = Math.pow(k, n) * detA;
            const concepts = [
                makeQ('If $R_1 = R_3$ in a 3×3 matrix:', '$|A| = 0$', ['$|A| = 2$', '$|A| = 1$', '$|A| = -1$'], 'Identical rows give determinant = 0.'),
                makeQ('If $R_2 \\to R_2 + 3R_1$, determinant:', 'Unchanged', ['Triples', 'Changes sign', 'Becomes 0'], 'Adding a multiple of one row to another does not change the determinant.'),
                makeQ('Number of 2×2 minors in a 3×3 matrix:', '9', ['3', '6', '12'], 'Each element has one minor, and there are 9 elements in a 3×3 matrix.'),
                makeQ(`If $|A| = ${detA}$, then $|${k}A|$ for ${n}×${n} = ?`, res, [k * detA, -res, detA], `$|${k}A| = ${k}^{${n}} \\times ${detA} = ${Math.pow(k, n)} \\times ${detA} = ${res}$.`),
                makeQ(`If $|A| = ${detA}$, and we multiply $R_1$ by ${k}:`, k * detA, [detA, -k * detA, detA + k], `Scaling one row by $${k}$ multiplies determinant by $${k}$: $${detA} \\times ${k} = ${k * detA}$.`),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}
