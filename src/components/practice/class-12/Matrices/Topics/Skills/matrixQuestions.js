// MatricesSkills — Dynamic Question Generators
// Each export is a FUNCTION that returns a fresh array of 10 questions with randomized numbers.

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const NZ = (min, max) => { let n = 0; while (n === 0) n = R(min, max); return n; };

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
    
    // Fisher-Yates shuffle
    const shuffled = [...final];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return { question, options: shuffled, correct: shuffled.indexOf(final[0]), explanation };
}

const bmat2 = (a, b, c, d) => `$\\begin{bmatrix}${a}&${b}\\\\${c}&${d}\\end{bmatrix}$`;

// ─── ORDER & ELEMENTS ───────────────────────────────────────────────────
export function generateOrderQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 4) {
            const m = R(1, 6), n = R(1, 6);
            const elems = m * n;
            if (i < 2) {
                qs.push(makeQ(
                    `What is the order of a matrix with ${m} rows and ${n} columns?`,
                    `$${m} \\times ${n}$`, [`$${n} \\times ${m}$`, `$${elems}$`, `$${m + n}$`],
                    `Order = rows × columns = $${m} \\times ${n}$.`
                ));
            } else {
                qs.push(makeQ(
                    `How many elements does a $${m} \\times ${n}$ matrix have?`,
                    `${elems}`, [`${m + n}`, `${m}`, `${elems + 1}`],
                    `$${m} \\times ${n} = ${elems}$ elements.`
                ));
            }
        } else {
            const concepts = [
                makeQ('A column matrix has order:', '$m \\times 1$', ['$1 \\times n$', '$n \\times n$', '$1 \\times 1$'], 'A column matrix has one column, so order is $m \\times 1$.'),
                makeQ('A row matrix has order:', '$1 \\times n$', ['$m \\times 1$', '$n \\times n$', '$1 \\times 1$'], 'A row matrix has one row, so order is $1 \\times n$.'),
                makeQ('A square matrix has:', 'Equal rows and columns', ['More rows', 'More columns', 'Only one element'], 'When rows = columns, it is a square matrix.'),
                makeQ('Element $a_{23}$ is in which position?', 'Row 2, Col 3', ['Row 3, Col 2', 'Row 23, Col 1', 'Row 2, Col 2'], 'First subscript = row (2), second = column (3).'),
                makeQ('What is the order of a scalar?', '$1 \\times 1$', ['$0 \\times 0$', '$1 \\times 0$', 'Not a matrix'], 'A scalar can be treated as a $1 \\times 1$ matrix.'),
                makeQ('If two matrices are equal, they must have:', 'Same order and same elements', ['Same number of rows only', 'Same elements only', 'Same columns only'], 'Equal matrices need same order AND identical corresponding elements.'),
            ];
            qs.push(concepts[i - 4]);
        }
    }
    return qs;
}

export function generateOrderAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const total = [12, 18, 24, 8, 20][R(0, 4)];
            // Find one that doesn't divide evenly
            let wrong;
            for (let k = 2; k <= total; k++) {
                if (total % k !== 0) { wrong = k; break; }
            }
            const wrongN = Math.ceil(total / wrong);
            qs.push(makeQ(
                `A matrix has ${total} elements. Which is NOT a possible order?`,
                `$${wrong} \\times ${wrongN}$`,
                [`$1 \\times ${total}$`, `$${total} \\times 1$`, `$2 \\times ${total / 2}$`],
                `$${wrong} \\times ${wrongN} = ${wrong * wrongN} \\neq ${total}$.`
            ));
        } else if (i < 5) {
            const n = R(2, 5);
            qs.push(makeQ(
                `How many elements are on the main diagonal of a $${n} \\times ${n}$ matrix?`,
                `${n}`, [`${n * 2}`, `${n * n}`, `${n * n - n}`],
                `An $n \\times n$ matrix has $n$ diagonal elements.`
            ));
        } else {
            const concepts = [
                makeQ('If $A$ is $m \\times n$, its transpose $A^T$ has order:', '$n \\times m$', ['$m \\times n$', '$n \\times n$', '$m \\times m$'], 'Transpose flips rows and columns.'),
                makeQ('A diagonal matrix must be:', 'Square', ['Rectangular', 'A row matrix', 'A column matrix'], 'Diagonal matrices are always square.'),
                makeQ('Identity matrix $I_3$ has order:', '$3 \\times 3$', ['$1 \\times 3$', '$3 \\times 1$', '$1 \\times 1$'], '$I_n$ is always $n \\times n$.'),
                makeQ('A null matrix of order $2 \\times 3$ has how many zeros?', '6', ['2', '3', '5'], '$2 \\times 3 = 6$ elements, all zero.'),
                makeQ('Number of possible orders for a matrix with 8 elements:', '4', ['2', '3', '8'], '$1\\times8, 2\\times4, 4\\times2, 8\\times1 = 4$ possible orders.'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

// ─── TYPES OF MATRICES ──────────────────────────────────────────────────
export function generateTypesQuestions() {
    const qs = [];
    const concepts = [
        makeQ('A matrix where all elements are 0 is called:', 'Zero matrix', ['Identity matrix', 'Scalar matrix', 'Diagonal matrix'], 'A zero matrix (null matrix) has all elements equal to 0.'),
        makeQ('In a diagonal matrix, non-zero elements appear:', 'Only on the main diagonal', ['In any position', 'Only in the first row', 'In the last column'], 'Diagonal matrix: $a_{ij} = 0$ when $i \\neq j$.'),
        makeQ('A scalar matrix is a diagonal matrix where:', 'All diagonal elements are equal', ['All diagonal elements are different', 'Diagonal elements are 0', 'It has one row'], 'Scalar matrix = diagonal matrix with equal diagonal entries.'),
        makeQ('A symmetric matrix satisfies:', '$A = A^T$', ['$A = -A$', '$A = I$', '$A = 0$'], '$A$ is symmetric if $A$ equals its transpose.'),
        makeQ('A skew-symmetric matrix satisfies:', '$A = -A^T$', ['$A = A^T$', '$A = I$', '$A = A^2$'], '$A$ is skew-symmetric if $A = -A^T$.'),
        makeQ('The identity matrix $I_2$ equals:', bmat2(1, 0, 0, 1), [bmat2(1, 1, 1, 1), bmat2(0, 1, 1, 0), bmat2(2, 0, 0, 2)], '$I_2$ has 1s on diagonal, 0s elsewhere.'),
        makeQ('An upper triangular matrix has all zeros:', 'Below the diagonal', ['Above the diagonal', 'On the diagonal', 'Everywhere'], 'Upper triangular: all entries below main diagonal are 0.'),
        makeQ('Diagonal elements of a skew-symmetric matrix are:', '0', ['1', '−1', 'Any number'], 'If $A = -A^T$, then $a_{ii} = -a_{ii}$, so $a_{ii} = 0$.'),
        makeQ('Which is NOT a type of matrix?', 'Circular', ['Square', 'Diagonal', 'Identity'], 'There is no "circular" matrix type.'),
        makeQ('A square matrix of order 1 is always:', 'All of these (identity, diagonal, scalar)', ['Identity only', 'Diagonal only', 'Scalar only'], 'A $1\\times1$ matrix is simultaneously diagonal, scalar, and identity (if $[1]$).'),
    ];
    for (let i = 0; i < 10; i++) qs.push(concepts[i]);
    return qs;
}

export function generateTypesAssessment() {
    const qs = [];
    const concepts = [
        makeQ('Every identity matrix is a:', 'Scalar matrix', ['Rectangular matrix', 'Zero matrix', 'Column matrix'], 'Identity is a scalar matrix with all diagonal elements = 1.'),
        makeQ('Which matrix equals its own transpose?', 'Both symmetric and zero', ['Skew-symmetric', 'Symmetric only', 'Zero matrix only'], 'Symmetric matrix: $A = A^T$. Zero matrix is also symmetric.'),
        () => { const n = R(2, 5); return makeQ(`A ${n}×${n} diagonal matrix has at most how many non-zero elements?`, `${n}`, [`${n * 2}`, `${n * n}`, '0'], `Only diagonal entries (${n} of them) can be non-zero.`); },
        makeQ('For any square matrix $A$, $A + A^T$ is always:', 'Symmetric', ['Skew-symmetric', 'Diagonal', 'Zero'], '$(A + A^T)^T = A^T + A = A + A^T$. So it is symmetric.'),
        makeQ('For any square matrix $A$, $A - A^T$ is always:', 'Skew-symmetric', ['Symmetric', 'Identity', 'Diagonal'], '$(A - A^T)^T = A^T - A = -(A - A^T)$. So it is skew-symmetric.'),
        makeQ('A matrix can be expressed as sum of:', 'Symmetric + skew-symmetric', ['Two symmetric matrices', 'Two identity matrices', 'Row + column matrices'], '$A = \\frac{1}{2}(A+A^T) + \\frac{1}{2}(A-A^T)$.'),
        () => { const k = R(2, 5); return makeQ(`Scalar matrix $${k}I_2$ equals:`, bmat2(k, 0, 0, k), [bmat2(k, k, k, k), bmat2(0, k, k, 0), bmat2(k * 2, 0, 0, k * 2)], `$${k} \\times I_2 = ${k} \\times ${bmat2(1, 0, 0, 1)} = ${bmat2(k, 0, 0, k)}$.`); },
        makeQ('A matrix that is both symmetric AND skew-symmetric must be:', 'Zero matrix', ['Identity', 'Diagonal', 'Impossible'], '$A = A^T$ and $A = -A^T$ implies $A = -A$, so $A = O$.'),
        () => { const n = R(2, 4); const ind = n + n * (n - 1) / 2; return makeQ(`How many independent elements does a ${n}×${n} symmetric matrix have?`, `${ind}`, [`${n}`, `${n * n}`, `${n * n - ind}`], `${n} diagonal + ${n * (n - 1) / 2} upper triangle = ${ind} independent elements.`); },
        makeQ('The transpose of a symmetric matrix is:', 'The matrix itself', ['Skew-symmetric', 'Identity', 'Zero'], 'By definition, $A = A^T$ for symmetric matrices.'),
    ];
    for (let i = 0; i < 10; i++) {
        const c = concepts[i];
        qs.push(typeof c === 'function' ? c() : c);
    }
    return qs;
}

// ─── ADDITION & SCALAR MULTIPLICATION ───────────────────────────────────
export function generateOperationsQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const a = R(-5, 5), b = R(-5, 5), c = R(-5, 5), d = R(-5, 5);
            const e = R(-5, 5), f = R(-5, 5), g = R(-5, 5), h = R(-5, 5);
            qs.push(makeQ(
                `${bmat2(a, b, c, d)} + ${bmat2(e, f, g, h)} = ?`,
                bmat2(a + e, b + f, c + g, d + h),
                [bmat2(a - e, b - f, c - g, d - h), bmat2(a * e, b * f, c * g, d * h), bmat2(e, f, g, h)],
                `Add element-wise: ${bmat2(a + e, b + f, c + g, d + h)}.`
            ));
        } else if (i < 5) {
            const k = R(2, 5), a = R(-4, 4), b = R(-4, 4), c = R(-4, 4), d = R(-4, 4);
            qs.push(makeQ(
                `$${k} \\times$ ${bmat2(a, b, c, d)} $= ?$`,
                bmat2(k * a, k * b, k * c, k * d),
                [bmat2(a + k, b + k, c + k, d + k), bmat2(a, b, c, d), bmat2(k, k, k, k)],
                `Multiply each element by $${k}$: ${bmat2(k * a, k * b, k * c, k * d)}.`
            ));
        } else {
            const concepts = [
                makeQ('Matrix addition is commutative:', 'Always ($A+B = B+A$)', ['Never', 'Only for square matrices', 'Only for identity'], 'Matrix addition is always commutative.'),
                makeQ('$k(A + B)$ equals:', '$kA + kB$', ['$kA + B$', '$A + kB$', '$k^2 AB$'], 'Scalar multiplication distributes over addition.'),
                makeQ('$A + O$ (zero matrix) equals:', '$A$', ['$O$', '$2A$', '$I$'], 'Zero matrix is the additive identity.'),
                makeQ('$-A$ is called the:', 'Additive inverse of $A$', ['Inverse of $A$', 'Transpose of $A$', 'Identity of $A$'], '$-A$ is the additive inverse since $A + (-A) = O$.'),
                makeQ('Matrix subtraction $A - B$ means:', '$A + (-B)$', ['$A + B$', '$B - A$', '$A \\times B^{-1}$'], 'Subtraction = adding the negative: $A - B = A + (-1)B$.'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

export function generateOperationsAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const a = R(-5, 5), b = R(-5, 5), c = R(-5, 5), d = R(-5, 5);
            const k = R(2, 4);
            qs.push(makeQ(
                `If $${k}A = $ ${bmat2(k * a, k * b, k * c, k * d)}, then $A = ?$`,
                bmat2(a, b, c, d),
                [bmat2(k * a * 2, k * b * 2, k * c * 2, k * d * 2), bmat2(a + 1, b + 1, c + 1, d + 1), bmat2(k, k, k, k)],
                `Divide each element by $${k}$: ${bmat2(a, b, c, d)}.`
            ));
        } else {
            const concepts = [
                makeQ('If $A + B = O$, then $B$ is:', '$-A$', ['$A$', '$A^T$', '$I$'], '$B = -A$ since $A + (-A) = O$.'),
                makeQ('$(A + B) + C = A + (B + C)$ demonstrates:', 'Associativity', ['Commutativity', 'Distributivity', 'Identity'], 'This is the associative property of addition.'),
                makeQ('The additive identity for $3 \\times 2 matrices is:', '$O_{3\\times2}$', ['$I_3$', '$I_2$', '$O_{2\\times3}$'], 'The zero matrix of matching order $3 \\times 2$.'),
                makeQ('$0 \\times A$ (zero scalar times $A$) equals:', '$O$ (zero matrix)', ['$A$', '$I$', '$-A$'], 'Multiplying any matrix by scalar 0 gives the zero matrix.'),
                makeQ('Scalar multiplication is associative: $k_1(k_2 A) = ?$', '$(k_1 k_2)A$', ['$(k_1+k_2)A$', '$k_1 k_2 A^2$', '$k_1 A + k_2 A$'], '$k_1(k_2 A) = (k_1 k_2)A$.'),
                makeQ('$1 \\times A$ equals:', '$A$', ['$O$', '$I$', '$A^T$'], 'Multiplying by scalar 1 gives the same matrix.'),
                makeQ('Which property does matrix addition NOT have?', 'Multiplicative inverse', ['Commutative', 'Associative', 'Additive identity'], 'Matrix addition has commutative, associative, and identity properties but multiplicative inverse is for multiplication.'),
            ];
            qs.push(concepts[i - 3]);
        }
    }
    return qs;
}

// ─── MULTIPLICATION ─────────────────────────────────────────────────────
export function generateMultiplicationQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const m = R(2, 4), n = R(2, 4), p = R(2, 4);
            qs.push(makeQ(
                `$A_{${m}\\times${n}} \\times B_{${n}\\times${p}}$ gives a matrix of order:`,
                `$${m} \\times ${p}$`, [`$${n} \\times ${n}$`, `$${m} \\times ${n}$`, `$${p} \\times ${m}$`],
                `Result order = outer dimensions: $${m} \\times ${p}$.`
            ));
        } else {
            const concepts = [
                makeQ('For $AB$ to be defined, which must match?', 'Cols of $A$ and rows of $B$', ['Rows of $A$ and rows of $B$', 'Rows of $A$ and cols of $B$', 'Cols of $A$ and cols of $B$'], 'Number of columns of $A$ must equal number of rows of $B$.'),
                makeQ('Is matrix multiplication commutative?', 'No, $AB \\neq BA$ in general', ['Yes always', 'Yes for square matrices', 'Only for diagonal'], 'Matrix multiplication is NOT commutative in general.'),
                makeQ('$AI = ?$', '$A$', ['$I$', '$O$', '$A^T$'], 'Identity is the multiplicative identity: $AI = A$.'),
                makeQ('$A(BC) = (AB)C$ demonstrates:', 'Associativity', ['Commutativity', 'Distributivity', 'Invertibility'], 'Matrix multiplication is associative.'),
                makeQ('$A(B+C) = ?$', '$AB + AC$', ['$AB + C$', '$A + BC$', '$ABC$'], 'Multiplication distributes over addition.'),
                makeQ('$(AB)^T = ?$', '$B^T A^T$', ['$A^T B^T$', '$BA$', '$AB$'], 'Transpose of product reverses order: $(AB)^T = B^T A^T$.'),
                makeQ('If $AB = O$, does that mean $A = O$ or $B = O$?', 'No, not necessarily', ['Yes, always', 'Only for square matrices', 'Only when $A = B$'], '$AB = O$ does NOT imply $A$ or $B$ is zero.'),
            ];
            qs.push(concepts[i - 3]);
        }
    }
    return qs;
}

export function generateMultiplicationAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const m = R(1, 5), n = R(1, 5), p = R(1, 5);
            const elems = m * p;
            qs.push(makeQ(
                `$A_{${m}\\times${n}} \\times B_{${n}\\times${p}}$ gives order:`,
                `$${m} \\times ${p}$`, [`$${n} \\times ${n}$`, `$${p} \\times ${m}$`, `$${m} \\times ${n}$`],
                `Outer dimensions: $${m} \\times ${p}$.`
            ));
        } else {
            const concepts = [
                makeQ('$(kA)B = ?$', 'All of these ($kAB = A(kB) = k(AB)$)', ['$kAB$', '$A(kB)$', '$k(AB)$'], 'Scalar can be factored freely.'),
                makeQ('If $A^2 = A$, then $A$ is called:', 'Idempotent', ['Nilpotent', 'Involutory', 'Orthogonal'], 'A matrix satisfying $A^2 = A$ is idempotent.'),
                makeQ('If $A^2 = I$, then $A$ is called:', 'Involutory', ['Idempotent', 'Nilpotent', 'Symmetric'], '$A^2 = I$ means $A$ is its own inverse — involutory.'),
                makeQ('$(A+B)(A-B) = ?$', '$A^2 - AB + BA - B^2$', ['$A^2 - B^2$', '$A^2 + B^2$', 'Undefined'], 'Since $AB \\neq BA$ generally, we get $A^2 - AB + BA - B^2$.'),
                makeQ('$IA = ?$', '$A$', ['$I$', '$AI$', '$A^T$'], 'Left multiplication by identity gives $A$.'),
                makeQ('If $A$ is $1\\times3$ and $B$ is $3\\times1$, $AB$ has order:', '$1 \\times 1$', ['$3 \\times 3$', '$1 \\times 3$', '$3 \\times 1$'], 'Outer dimensions: $1 \\times 1$ (a scalar result).'),
                makeQ('If $A$ is $3\\times1$ and $B$ is $1\\times3$, $AB$ has order:', '$3 \\times 3$', ['$1 \\times 1$', '$1 \\times 3$', '$3 \\times 1$'], 'Outer dimensions: $3 \\times 3$.'),
            ];
            qs.push(concepts[i - 3]);
        }
    }
    return qs;
}

// ─── TRANSPOSE ──────────────────────────────────────────────────────────
export function generateTransposeQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 2) {
            const m = R(2, 6), n = R(2, 6);
            qs.push(makeQ(
                `If $A$ is $${m} \\times ${n}$, $A^T$ has order:`,
                `$${n} \\times ${m}$`, [`$${m} \\times ${n}$`, `$${n} \\times ${n}$`, `$${m} \\times ${m}$`],
                `Transpose swaps dimensions: $${n} \\times ${m}$.`
            ));
        } else {
            const concepts = [
                makeQ('$(A^T)^T = ?$', '$A$', ['$A^T$', '$I$', '$O$'], 'Double transpose gives back the original matrix.'),
                makeQ('$(A + B)^T = ?$', '$A^T + B^T$', ['$B^T + A^T$', 'Both A and B', '$AB$'], 'Transpose distributes over addition.'),
                makeQ('$(kA)^T = ?$', '$kA^T$', ['$k^T A$', '$Ak^T$', '$k^2 A^T$'], 'Scalar comes outside: $(kA)^T = kA^T$.'),
                makeQ('If $A = A^T$, $A$ is:', 'Symmetric', ['Skew-symmetric', 'Diagonal', 'Zero'], 'A matrix equal to its transpose is symmetric.'),
                makeQ('If $A = -A^T$, diagonal elements must be:', '0', ['1', '−1', 'Any value'], '$a_{ii} = -a_{ii}$ implies $a_{ii} = 0$.'),
                makeQ('$(AB)^T = ?$', '$B^T A^T$', ['$A^T B^T$', '$BA$', '$(BA)^T$'], 'Shoe-sock rule: reverse order and transpose each.'),
                makeQ('A symmetric matrix satisfies:', '$A - A^T = O$', ['$A + A^T = O$', '$A \\times A^T = I$', '$A + A^T = 2I$'], '$A = A^T$ means $A - A^T = O$.'),
                makeQ('Every square matrix can be written as:', 'Sum of symmetric + skew-symmetric', ['Sum of two symmetric', 'Product of two transposes', 'None'], '$A = \\frac{1}{2}(A+A^T) + \\frac{1}{2}(A-A^T)$.'),
            ];
            qs.push(concepts[i - 2]);
        }
    }
    return qs;
}

export function generateTransposeAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 2) {
            const m = R(2, 6), n = R(2, 6);
            qs.push(makeQ(
                `If $A$ is $${m}\\times${n}$, $(A^T)^T$ has order:`,
                `$${m} \\times ${n}$`, [`$${n} \\times ${m}$`, `$${m} \\times ${m}$`, `$${n} \\times ${n}$`],
                `$(A^T)^T = A$, which is $${m} \\times ${n}$.`
            ));
        } else {
            const concepts = [
                makeQ('If $A$ is symmetric, what is $(A^2)^T$?', '$A^2$', ['$(A^T)^2$', '$A$', '$2A$'], '$(A^2)^T = (A^T)^2 = A^2$ since $A$ is symmetric.'),
                makeQ('The transpose of $I_3$ is:', '$I_3$', ['$O_3$', '$3I_3$', 'Undefined'], 'Identity matrix is symmetric: $I^T = I$.'),
                makeQ('$(A - B)^T = ?$', '$A^T - B^T$', ['$B^T - A^T$', '$A - B$', '$-(A+B)^T$'], 'Transpose distributes: $(A-B)^T = A^T - B^T$.'),
                makeQ('A zero matrix is:', 'Both symmetric and skew-symmetric', ['Symmetric only', 'Skew-symmetric only', 'Neither'], '$O = O^T$ (symmetric) and $O = -O^T$ (skew-symmetric).'),
                () => { const n = R(3, 5); const ind = n * (n - 1) / 2; return makeQ(`How many independent elements in a ${n}×${n} skew-symmetric matrix?`, `${ind}`, [`${n}`, `${n * n}`, `${n * n - ind}`], `Diagonal is 0. Upper triangle: $${n}(${n}-1)/2 = ${ind}$ independent elements.`); },
                makeQ('Transpose of a diagonal matrix is:', 'The same diagonal matrix', ['Zero matrix', 'Identity', 'Undefined'], 'Diagonal matrices are symmetric.'),
                makeQ('$(ABC)^T = ?$', '$C^T B^T A^T$', ['$A^T B^T C^T$', '$(CB)^T A^T$', '$A^T(BC)^T$'], 'Extending the shoe-sock rule: reverse all and transpose each.'),
                makeQ('If $(AB)^T = B^T A^T$ and both $A,B$ are symmetric, then $(AB)^T =$', '$BA$', ['$AB$', '$A^T B^T$', '$(AB)^2$'], '$(AB)^T = B^T A^T = BA$ (since $A,B$ symmetric).'),
            ];
            const c = concepts[i - 2];
            qs.push(typeof c === 'function' ? c() : c);
        }
    }
    return qs;
}

// ─── INVERSE ────────────────────────────────────────────────────────────
export function generateInverseQuestions() {
    const qs = [];
    const concepts = [
        makeQ('A matrix $A$ is invertible if:', '$|A| \\neq 0$', ['$A$ is rectangular', '$|A| = 0$', '$A = A^T$'], 'A square matrix is invertible iff its determinant is non-zero.'),
        makeQ('The inverse of $I$ (identity) is:', '$I$ itself', ['$O$', '$-I$', '$2I$'], '$I \\times I = I$, so $I^{-1} = I$.'),
        makeQ('If $A^{-1}$ exists, then $AA^{-1} = ?$', '$I$', ['$A$', '$O$', '$A^2$'], 'By definition, $AA^{-1} = I$.'),
        makeQ('$(AB)^{-1} = ?$', '$B^{-1}A^{-1}$', ['$A^{-1}B^{-1}$', '$BA$', '$(BA)^{-1}$'], 'Shoe-sock rule: $(AB)^{-1} = B^{-1}A^{-1}$.'),
        makeQ('$(A^{-1})^{-1} = ?$', '$A$', ['$I$', '$A^T$', '$O$'], 'Inverting the inverse gives back the original.'),
        makeQ('A singular matrix has determinant:', '0', ['1', '−1', '$> 0$'], 'Singular = non-invertible = determinant is 0.'),
        makeQ('$(A^T)^{-1} = ?$', '$(A^{-1})^T$', ['$A^{-1}$', '$A^T$', '$A$'], 'Transpose and inverse commute.'),
        makeQ('$(kA)^{-1} = ?$ ($k \\neq 0$)', '$(1/k)A^{-1}$', ['$kA^{-1}$', '$k^2 A^{-1}$', '$A^{-1}/k^2$'], '$(kA)^{-1} = (1/k)A^{-1}$.'),
        makeQ('Can a non-square matrix have an inverse?', 'No', ['Yes always', 'Only if diagonal', 'Sometimes'], 'Only square matrices can be invertible.'),
        () => { const d = NZ(2, 7); return makeQ(`If $|A| = ${d}$, is $A$ invertible?`, 'Yes', ['No', 'Only if $A$ is diagonal', 'Cannot determine'], `$|A| \\neq 0$, so $A$ is invertible.`); },
    ];
    for (let i = 0; i < 10; i++) {
        const c = concepts[i];
        qs.push(typeof c === 'function' ? c() : c);
    }
    return qs;
}

export function generateInverseAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 2) {
            const detA = NZ(-6, -1);
            qs.push(makeQ(
                `If $|A| = ${detA}$, then $|A^{-1}| = ?$`,
                `$1/${detA}$`, [`$${detA}$`, `$${-detA}$`, `$${detA * detA}$`],
                `$|A^{-1}| = 1/|A| = 1/${detA}$.`
            ));
        } else if (i < 4) {
            const n = R(2, 3), k = R(2, 4), detA = NZ(1, 4);
            const res = Math.pow(k, n) * detA;
            qs.push(makeQ(
                `If $A$ is ${n}×${n} and $|A| = ${detA}$, then $|${k}A| = ?$`,
                `${res}`, [`${k * detA}`, `${-res}`, `${detA}`],
                `$|${k}A| = ${k}^{${n}} \\times |A| = ${Math.pow(k, n)} \\times ${detA} = ${res}$.`
            ));
        } else {
            const concepts = [
                makeQ('If $A^2 = I$, then $A^{-1} = ?$', '$A$', ['$A^2$', '$I$', '$-A$'], '$A^2 = I$ means $A \\cdot A = I$, so $A^{-1} = A$.'),
                makeQ('$|AB| = ?$', '$|A| \\times |B|$', ['$|A| + |B|$', '$|A| - |B|$', '$|A|/|B|$'], 'Determinant of product = product of determinants.'),
                makeQ('If $A$ and $B$ are invertible, is $AB$ invertible?', 'Yes, $(AB)^{-1} = B^{-1}A^{-1}$', ['No', 'Only if $A=B$', 'Sometimes'], 'Product of invertible matrices is invertible.'),
                makeQ('If $AB = I$, then $BA = ?$', '$I$', ['$O$', '$AB$', 'Undefined'], 'For square matrices, if $AB = I$ then $BA = I$.'),
                makeQ('$(A^{-1})^T = (A^T)^{-1}$. This is:', 'True', ['False', 'True only for symmetric', 'True only for diagonal'], 'Transpose and inverse always commute for invertible matrices.'),
                makeQ('If $A$ is orthogonal ($AA^T = I$), then $A^{-1} = ?$', '$A^T$', ['$A$', '$-A$', '$A^2$'], '$AA^T = I$ means $A^T$ is the inverse of $A$.'),
            ];
            qs.push(concepts[i - 4]);
        }
    }
    return qs;
}
