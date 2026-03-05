// MatricesSkills — Question Data (imported by MatricesSkills.jsx)

export const orderQuestions = [
    { question: 'What is the order of a matrix with 3 rows and 4 columns?', options: ['4 × 3', '3 × 4', '12', '7'], correct: 1, explanation: 'Order = rows × columns = 3 × 4.' },
    { question: 'How many elements does a 2 × 5 matrix have?', options: ['7', '10', '3', '25'], correct: 1, explanation: '2 × 5 = 10 elements.' },
    { question: 'A column matrix has order:', options: ['1 × n', 'm × 1', 'n × n', '1 × 1'], correct: 1, explanation: 'A column matrix has one column, so order is m × 1.' },
    { question: 'A row matrix has order:', options: ['m × 1', '1 × n', 'n × n', '1 × 1'], correct: 1, explanation: 'A row matrix has one row, so order is 1 × n.' },
    { question: 'A 3 × 3 matrix is called a:', options: ['Row matrix', 'Column matrix', 'Square matrix', 'Zero matrix'], correct: 2, explanation: 'When rows = columns, it is a square matrix.' },
    { question: 'Element a₂₃ is in which position?', options: ['Row 3, Col 2', 'Row 2, Col 3', 'Row 23, Col 1', 'Row 2, Col 2'], correct: 1, explanation: 'First subscript = row (2), second = column (3).' },
    { question: 'What is the order of a scalar (single number)?', options: ['0 × 0', '1 × 1', '1 × 0', 'Not a matrix'], correct: 1, explanation: 'A scalar can be treated as a 1 × 1 matrix.' },
    { question: 'If A is 4 × 2, how many rows does A have?', options: ['2', '4', '8', '6'], correct: 1, explanation: 'The first number in m × n is the row count.' },
    { question: 'A matrix of order 1 × 1 contains how many elements?', options: ['0', '1', '2', 'Undefined'], correct: 1, explanation: '1 × 1 = 1 element.' },
    { question: 'What is the maximum number of elements in a 3 × 2 matrix?', options: ['5', '6', '9', '3'], correct: 1, explanation: '3 × 2 = 6 elements total.' },
];
export const orderAssessment = [
    { question: 'A matrix has 18 elements. Which is NOT a possible order?', options: ['2 × 9', '3 × 6', '4 × 5', '6 × 3'], correct: 2, explanation: '4 × 5 = 20 ≠ 18.' },
    { question: 'If A is m × n, its transpose Aᵀ has order:', options: ['m × n', 'n × m', 'n × n', 'm × m'], correct: 1, explanation: 'Transpose flips rows and columns.' },
    { question: 'A diagonal matrix must be:', options: ['Rectangular', 'Square', 'A row matrix', 'A column matrix'], correct: 1, explanation: 'Diagonal matrices are always square.' },
    { question: 'How many elements are on the main diagonal of a 4 × 4 matrix?', options: ['4', '8', '16', '12'], correct: 0, explanation: 'An n × n matrix has n diagonal elements.' },
    { question: 'If A is 3 × 4, element a₃₅ is:', options: ['In row 3, col 5', 'Undefined', 'In row 5, col 3', 'Zero'], correct: 1, explanation: 'A has 4 columns, so column 5 does not exist.' },
    { question: 'A null matrix of order 2 × 3 has how many zeros?', options: ['2', '3', '5', '6'], correct: 3, explanation: '2 × 3 = 6 elements, all zero.' },
    { question: 'Identity matrix I₃ has order:', options: ['1 × 3', '3 × 1', '3 × 3', '1 × 1'], correct: 2, explanation: 'Iₙ is always n × n.' },
    { question: 'A matrix with 12 elements can have order:', options: ['5 × 3', '4 × 3', '7 × 2', '6 × 3'], correct: 1, explanation: '4 × 3 = 12. Others: 15, 14, 18.' },
    { question: 'Number of possible orders for a matrix with 8 elements:', options: ['2', '3', '4', '8'], correct: 2, explanation: '1×8, 2×4, 4×2, 8×1 = 4 possible orders.' },
    { question: 'If two matrices are equal, they must have:', options: ['Same number of rows only', 'Same order and same elements', 'Same elements only', 'Same columns only'], correct: 1, explanation: 'Equal matrices need same order AND identical corresponding elements.' },
];

export const typesQuestions = [
    { question: 'A matrix where all elements are 0 is called:', options: ['Identity matrix', 'Scalar matrix', 'Zero matrix', 'Diagonal matrix'], correct: 2, explanation: 'A zero matrix (null matrix) has all elements equal to 0.' },
    { question: 'In a diagonal matrix, non-zero elements appear:', options: ['In any position', 'Only on the main diagonal', 'Only in the first row', 'In the last column'], correct: 1, explanation: 'Diagonal matrix: aᵢⱼ = 0 when i ≠ j.' },
    { question: 'A scalar matrix is a diagonal matrix where:', options: ['All diagonal elements are different', 'All diagonal elements are equal', 'Diagonal elements are 0', 'It has one row'], correct: 1, explanation: 'Scalar matrix = diagonal matrix with equal diagonal entries.' },
    { question: 'Which is NOT a type of matrix?', options: ['Square', 'Circular', 'Diagonal', 'Identity'], correct: 1, explanation: 'There is no "circular" matrix type.' },
    { question: 'A symmetric matrix satisfies:', options: ['A = -A', 'A = Aᵀ', 'A = I', 'A = 0'], correct: 1, explanation: 'A is symmetric if A equals its transpose.' },
    { question: 'A skew-symmetric matrix satisfies:', options: ['A = Aᵀ', 'A = -Aᵀ', 'A = I', 'A = A²'], correct: 1, explanation: 'A is skew-symmetric if A = -Aᵀ.' },
    { question: 'The identity matrix I₂ equals:', options: ['[[1,1],[1,1]]', '[[1,0],[0,1]]', '[[0,1],[1,0]]', '[[2,0],[0,2]]'], correct: 1, explanation: 'I₂ has 1s on diagonal, 0s elsewhere.' },
    { question: 'An upper triangular matrix has all zeros:', options: ['Above the diagonal', 'Below the diagonal', 'On the diagonal', 'Everywhere'], correct: 1, explanation: 'Upper triangular: all entries below main diagonal are 0.' },
    { question: 'Diagonal elements of a skew-symmetric matrix are:', options: ['1', '−1', '0', 'Any number'], correct: 2, explanation: 'If A = -Aᵀ, then aᵢᵢ = -aᵢᵢ, so aᵢᵢ = 0.' },
    { question: 'A square matrix of order 1 is always:', options: ['Identity', 'Diagonal', 'Scalar', 'All of these'], correct: 3, explanation: 'A 1×1 matrix is simultaneously diagonal, scalar, identity (if [1]), etc.' },
];
export const typesAssessment = [
    { question: 'Every identity matrix is a:', options: ['Rectangular matrix', 'Scalar matrix', 'Zero matrix', 'Column matrix'], correct: 1, explanation: 'Identity is a scalar matrix with all diagonal elements = 1.' },
    { question: 'Which matrix equals its own transpose?', options: ['Skew-symmetric', 'Symmetric', 'Zero matrix', 'Both B and C'], correct: 3, explanation: 'Symmetric matrix: A = Aᵀ. Zero matrix is also symmetric (0 = 0).' },
    { question: 'A 3×3 diagonal matrix has at most how many non-zero elements?', options: ['3', '6', '9', '0'], correct: 0, explanation: 'Only diagonal entries (3 of them) can be non-zero.' },
    { question: 'For any square matrix A, A + Aᵀ is always:', options: ['Skew-symmetric', 'Symmetric', 'Diagonal', 'Zero'], correct: 1, explanation: '(A + Aᵀ)ᵀ = Aᵀ + A = A + Aᵀ. So it is symmetric.' },
    { question: 'For any square matrix A, A − Aᵀ is always:', options: ['Symmetric', 'Skew-symmetric', 'Identity', 'Diagonal'], correct: 1, explanation: '(A − Aᵀ)ᵀ = Aᵀ − A = -(A − Aᵀ). So it is skew-symmetric.' },
    { question: 'A matrix can be expressed as sum of:', options: ['Two symmetric matrices', 'Symmetric + skew-symmetric', 'Two identity matrices', 'Row + column matrices'], correct: 1, explanation: 'A = ½(A+Aᵀ) + ½(A−Aᵀ), symmetric + skew-symmetric.' },
    { question: 'Scalar matrix 3I₂ equals:', options: ['[[3,0],[0,3]]', '[[3,3],[3,3]]', '[[0,3],[3,0]]', '[[6,0],[0,6]]'], correct: 0, explanation: '3 × I₂ = 3 × [[1,0],[0,1]] = [[3,0],[0,3]].' },
    { question: 'A matrix that is both symmetric AND skew-symmetric must be:', options: ['Identity', 'Diagonal', 'Zero matrix', 'Impossible'], correct: 2, explanation: 'A = Aᵀ and A = -Aᵀ implies A = -A, so A = O (zero matrix).' },
    { question: 'How many independent elements does a 3×3 symmetric matrix have?', options: ['3', '6', '9', '4'], correct: 1, explanation: '3 diagonal + 3 upper triangle = 6 independent elements.' },
    { question: 'The transpose of a symmetric matrix is:', options: ['Skew-symmetric', 'The matrix itself', 'Identity', 'Zero'], correct: 1, explanation: 'By definition, A = Aᵀ for symmetric matrices.' },
];

export const operationsQuestions = [
    { question: 'A₂ₓ₃ + B can be computed when B has order:', options: ['3 × 2', '2 × 3', '2 × 2', '3 × 3'], correct: 1, explanation: 'Addition requires same order: 2 × 3.' },
    { question: 'If A = [[1,2],[3,4]] and B = [[5,6],[7,8]], what is A + B?', options: ['[[6,8],[10,12]]', '[[4,4],[4,4]]', '[[5,12],[21,32]]', '[[6,8],[8,12]]'], correct: 0, explanation: 'Add element-wise: 1+5=6, 2+6=8, 3+7=10, 4+8=12.' },
    { question: '3 × [[1,2],[3,4]] equals:', options: ['[[3,6],[9,12]]', '[[4,5],[6,7]]', '[[3,2],[3,4]]', '[[1,6],[9,4]]'], correct: 0, explanation: 'Multiply each element by 3.' },
    { question: 'Matrix addition is commutative:', options: ['Never', 'Always (A+B = B+A)', 'Only for square matrices', 'Only for identity'], correct: 1, explanation: 'Matrix addition is always commutative: A + B = B + A.' },
    { question: 'Matrix subtraction A − B means:', options: ['A + B', 'A + (−B)', 'B − A', 'A × B⁻¹'], correct: 1, explanation: 'Subtraction = adding the negative: A − B = A + (−1)B.' },
    { question: 'k(A + B) equals:', options: ['kA + B', 'A + kB', 'kA + kB', 'k²AB'], correct: 2, explanation: 'Scalar multiplication distributes over addition.' },
    { question: '(k₁ + k₂)A equals:', options: ['k₁A + k₂A', 'k₁k₂A', 'k₁A × k₂A', '(k₁A)(k₂A)'], correct: 0, explanation: 'Scalars distribute: (k₁+k₂)A = k₁A + k₂A.' },
    { question: 'A + O (zero matrix) equals:', options: ['O', 'A', '2A', 'I'], correct: 1, explanation: 'Zero matrix is the additive identity.' },
    { question: 'If 2A = [[4,6],[8,10]], then A =', options: ['[[2,3],[4,5]]', '[[8,12],[16,20]]', '[[2,3],[8,10]]', '[[4,6],[4,5]]'], correct: 0, explanation: 'Divide each element by 2.' },
    { question: '−A is called the:', options: ['Inverse of A', 'Additive inverse of A', 'Transpose of A', 'Identity of A'], correct: 1, explanation: '−A is the additive inverse since A + (−A) = O.' },
];
export const operationsAssessment = [
    { question: 'If A + B = O, then B is:', options: ['A', '−A', 'Aᵀ', 'I'], correct: 1, explanation: 'B = −A since A + (−A) = O.' },
    { question: '(A + B) + C = A + (B + C) demonstrates:', options: ['Commutativity', 'Associativity', 'Distributivity', 'Identity'], correct: 1, explanation: 'This is the associative property of addition.' },
    { question: 'If A = [[2,−1],[0,3]] find 2A − I₂:', options: ['[[3,−2],[0,5]]', '[[4,−2],[0,6]]', '[[3,−2],[0,5]]', '[[2,−1],[-1,2]]'], correct: 0, explanation: '2A = [[4,−2],[0,6]], I₂ = [[1,0],[0,1]], 2A−I₂ = [[3,−2],[0,5]].' },
    { question: 'The additive identity for 3 × 2 matrices is:', options: ['I₃', 'I₂', 'O₃ₓ₂', 'O₂ₓ₃'], correct: 2, explanation: 'The zero matrix of matching order 3 × 2.' },
    { question: '0 × A (zero scalar times A) equals:', options: ['A', 'I', 'O (zero matrix)', '−A'], correct: 2, explanation: 'Multiplying any matrix by scalar 0 gives the zero matrix.' },
    { question: 'If A − 2B = [[1,0],[0,1]] and A = [[3,2],[2,5]], find B:', options: ['[[1,1],[1,2]]', '[[2,2],[2,4]]', '[[1,0],[0,2]]', '[[4,2],[2,6]]'], correct: 0, explanation: '2B = A − I = [[2,2],[2,4]], so B = [[1,1],[1,2]].' },
    { question: 'Scalar multiplication is associative: k₁(k₂A) = ?', options: ['(k₁+k₂)A', '(k₁k₂)A', 'k₁k₂A²', 'k₁A + k₂A'], correct: 1, explanation: 'k₁(k₂A) = (k₁k₂)A.' },
    { question: '1 × A equals:', options: ['O', 'I', 'A', 'Aᵀ'], correct: 2, explanation: 'Multiplying by scalar 1 gives the same matrix.' },
    { question: 'If A and B have different orders, A + B is:', options: ['O', 'Undefined', 'A', 'B'], correct: 1, explanation: 'Addition is only defined for matrices of the same order.' },
    { question: 'Which property does matrix addition NOT have?', options: ['Commutative', 'Associative', 'Multiplicative inverse', 'Additive identity'], correct: 2, explanation: 'Matrix addition has commutative, associative, and identity properties but multiplicative inverse is for multiplication.' },
];

export const multiplicationQuestions = [
    { question: 'A₂ₓ₃ × B₃ₓ₄ gives a matrix of order:', options: ['2 × 4', '3 × 3', '2 × 3', '4 × 2'], correct: 0, explanation: 'Result order = outer dimensions: 2 × 4.' },
    { question: 'For AB to be defined, which must match?', options: ['Rows of A and rows of B', 'Cols of A and rows of B', 'Rows of A and cols of B', 'Cols of A and cols of B'], correct: 1, explanation: 'Number of columns of A must equal number of rows of B.' },
    { question: 'Is matrix multiplication commutative?', options: ['Yes always', 'No, AB ≠ BA in general', 'Yes for square matrices', 'Only for diagonal'], correct: 1, explanation: 'Matrix multiplication is NOT commutative in general.' },
    { question: 'AI = ?', options: ['I', 'A', 'O', 'Aᵀ'], correct: 1, explanation: 'Identity is the multiplicative identity: AI = A.' },
    { question: 'If A is 2×3 and B is 2×3, is AB defined?', options: ['Yes', 'No', 'Only if A=B', 'Sometimes'], correct: 1, explanation: 'Cols of A (3) ≠ rows of B (2), so AB is not defined.' },
    { question: 'A(BC) = (AB)C demonstrates:', options: ['Commutativity', 'Associativity', 'Distributivity', 'Invertibility'], correct: 1, explanation: 'Matrix multiplication is associative.' },
    { question: 'A(B+C) = ?', options: ['AB + C', 'AB + AC', 'A + BC', 'ABC'], correct: 1, explanation: 'Multiplication distributes over addition.' },
    { question: '(AB)ᵀ = ?', options: ['AᵀBᵀ', 'BᵀAᵀ', 'BA', 'AB'], correct: 1, explanation: 'Transpose of product reverses order: (AB)ᵀ = BᵀAᵀ.' },
    { question: 'A × O (zero matrix) = ?', options: ['A', 'I', 'O', 'Undefined'], correct: 2, explanation: 'Any matrix times zero matrix gives zero matrix.' },
    { question: 'If AB = O, does that mean A = O or B = O?', options: ['Yes, always', 'No, not necessarily', 'Only for square matrices', 'Only when A = B'], correct: 1, explanation: 'AB = O does NOT imply A or B is zero. Matrix multiplication can give zero with non-zero factors.' },
];
export const multiplicationAssessment = [
    { question: 'A₃ₓ₂ × B₂ₓ₅ gives order:', options: ['3 × 5', '2 × 2', '5 × 3', '3 × 2'], correct: 0, explanation: 'Outer dimensions: 3 × 5.' },
    { question: '(kA)B = ?', options: ['kAB', 'A(kB)', 'k(AB)', 'All of these'], correct: 3, explanation: 'Scalar can be factored freely: (kA)B = A(kB) = k(AB).' },
    { question: 'If A² = A, then A is called:', options: ['Nilpotent', 'Idempotent', 'Involutory', 'Orthogonal'], correct: 1, explanation: 'A matrix satisfying A² = A is idempotent.' },
    { question: 'If A² = I, then A is called:', options: ['Idempotent', 'Nilpotent', 'Involutory', 'Symmetric'], correct: 2, explanation: 'A² = I means A is its own inverse — involutory.' },
    { question: 'How many multiplications to compute one element of AB (A is m×n)?', options: ['m', 'n', 'mn', 'm+n'], correct: 1, explanation: 'Each element requires n multiplications (dot product of row and column).' },
    { question: '(A+B)(A−B) = ?', options: ['A²−B²', 'A²−AB+BA−B²', 'A²+B²', 'Undefined'], correct: 1, explanation: 'Since AB ≠ BA generally, we get A²−AB+BA−B² (not A²−B²).' },
    { question: 'IA = ?', options: ['I', 'A', 'AI', 'Aᵀ'], correct: 1, explanation: 'Left multiplication by identity gives A.' },
    { question: 'If A is 1×3 and B is 3×1, AB has order:', options: ['1 × 1', '3 × 3', '1 × 3', '3 × 1'], correct: 0, explanation: 'Outer dimensions: 1 × 1 (a scalar result).' },
    { question: 'If A is 3×1 and B is 1×3, AB has order:', options: ['1 × 1', '3 × 3', '1 × 3', '3 × 1'], correct: 1, explanation: 'Outer dimensions: 3 × 3.' },
    { question: 'The number of elements computed for A₃ₓ₂ × B₂ₓ₄ is:', options: ['6', '8', '12', '24'], correct: 2, explanation: 'Result is 3 × 4 = 12 elements.' },
];

export const transposeQuestions = [
    { question: 'If A is 3 × 5, Aᵀ has order:', options: ['3 × 5', '5 × 3', '5 × 5', '3 × 3'], correct: 1, explanation: 'Transpose swaps dimensions: 5 × 3.' },
    { question: '(Aᵀ)ᵀ = ?', options: ['Aᵀ', 'A', 'I', 'O'], correct: 1, explanation: 'Double transpose gives back the original matrix.' },
    { question: '(A + B)ᵀ = ?', options: ['Aᵀ + Bᵀ', 'Bᵀ + Aᵀ', 'Both A and B', 'AB'], correct: 0, explanation: 'Transpose distributes over addition.' },
    { question: '(kA)ᵀ = ?', options: ['kAᵀ', 'kᵀA', 'Akᵀ', 'k²Aᵀ'], correct: 0, explanation: 'Scalar comes outside: (kA)ᵀ = kAᵀ.' },
    { question: 'If A = Aᵀ, A is:', options: ['Skew-symmetric', 'Symmetric', 'Diagonal', 'Zero'], correct: 1, explanation: 'A matrix equal to its transpose is symmetric.' },
    { question: 'If A = −Aᵀ, diagonal elements must be:', options: ['1', '−1', '0', 'Any value'], correct: 2, explanation: 'aᵢᵢ = −aᵢᵢ implies aᵢᵢ = 0.' },
    { question: 'Transpose of [[1,2,3]] (row matrix) is:', options: ['[[1,2,3]]', '[[1],[2],[3]]', '[[3,2,1]]', '[[1,0,0]]'], correct: 1, explanation: 'Transpose of a row matrix is a column matrix.' },
    { question: '(AB)ᵀ = ?', options: ['AᵀBᵀ', 'BᵀAᵀ', 'BA', '(BA)ᵀ'], correct: 1, explanation: 'Shoe-sock rule: reverse order and transpose each.' },
    { question: 'A symmetric matrix satisfies:', options: ['A + Aᵀ = O', 'A − Aᵀ = O', 'A × Aᵀ = I', 'A + Aᵀ = 2I'], correct: 1, explanation: 'A = Aᵀ means A − Aᵀ = O.' },
    { question: 'Every square matrix can be written as:', options: ['Sum of two symmetric', 'Sum of symmetric + skew-symmetric', 'Product of two transposes', 'None'], correct: 1, explanation: 'A = ½(A+Aᵀ) + ½(A−Aᵀ).' },
];
export const transposeAssessment = [
    { question: 'If A is symmetric, what is (A²)ᵀ?', options: ['A²', '(Aᵀ)²', 'A', '2A'], correct: 0, explanation: '(A²)ᵀ = (Aᵀ)² = A² since A is symmetric.' },
    { question: 'The transpose of I₃ is:', options: ['O₃', 'I₃', '3I₃', 'Undefined'], correct: 1, explanation: 'Identity matrix is symmetric: Iᵀ = I.' },
    { question: 'If A is 4×6, (Aᵀ)ᵀ has order:', options: ['6 × 4', '4 × 6', '4 × 4', '6 × 6'], correct: 1, explanation: '(Aᵀ)ᵀ = A, which is 4 × 6.' },
    { question: '(3A)ᵀ equals:', options: ['3Aᵀ', '3A', 'A/3', '9Aᵀ'], correct: 0, explanation: 'Scalar factors out of transpose.' },
    { question: '(A − B)ᵀ = ?', options: ['Aᵀ − Bᵀ', 'Bᵀ − Aᵀ', 'A − B', '−(A+B)ᵀ'], correct: 0, explanation: 'Transpose distributes: (A−B)ᵀ = Aᵀ − Bᵀ.' },
    { question: 'A zero matrix is:', options: ['Symmetric only', 'Skew-symmetric only', 'Both symmetric and skew-symmetric', 'Neither'], correct: 2, explanation: 'O = Oᵀ (symmetric) and O = −Oᵀ (skew-symmetric).' },
    { question: 'If (AB)ᵀ = BᵀAᵀ and both A,B are symmetric, then (AB)ᵀ =', options: ['AB', 'BA', 'AᵀBᵀ', '(AB)²'], correct: 1, explanation: '(AB)ᵀ = BᵀAᵀ = BA (since A,B symmetric).' },
    { question: 'How many independent elements in a 4×4 skew-symmetric matrix?', options: ['4', '6', '10', '16'], correct: 1, explanation: 'Diagonal is 0 (4 elements). Upper triangle: 4×3/2 = 6 independent elements.' },
    { question: 'Transpose of a diagonal matrix is:', options: ['Zero matrix', 'The same diagonal matrix', 'Identity', 'Undefined'], correct: 1, explanation: 'Diagonal matrices are symmetric (only diagonal elements, which stay in place).' },
    { question: '(ABC)ᵀ = ?', options: ['AᵀBᵀCᵀ', 'CᵀBᵀAᵀ', '(CB)ᵀAᵀ', 'Aᵀ(BC)ᵀ'], correct: 1, explanation: 'Extending the shoe-sock rule: reverse all and transpose each.' },
];

export const inverseQuestions = [
    { question: 'A matrix A is invertible if:', options: ['A is rectangular', '|A| ≠ 0', '|A| = 0', 'A = Aᵀ'], correct: 1, explanation: 'A square matrix is invertible iff its determinant is non-zero.' },
    { question: 'The inverse of I (identity) is:', options: ['O', 'I itself', '−I', '2I'], correct: 1, explanation: 'I × I = I, so I⁻¹ = I.' },
    { question: 'If A⁻¹ exists, then AA⁻¹ = ?', options: ['A', 'O', 'I', 'A²'], correct: 2, explanation: 'By definition, AA⁻¹ = I.' },
    { question: '(AB)⁻¹ = ?', options: ['A⁻¹B⁻¹', 'B⁻¹A⁻¹', 'BA', '(BA)⁻¹'], correct: 1, explanation: 'Shoe-sock rule for inverses: (AB)⁻¹ = B⁻¹A⁻¹.' },
    { question: '(A⁻¹)⁻¹ = ?', options: ['I', 'A', 'Aᵀ', 'O'], correct: 1, explanation: 'Inverting the inverse gives back the original.' },
    { question: 'A singular matrix has determinant:', options: ['1', '−1', '0', '> 0'], correct: 2, explanation: 'Singular = non-invertible = determinant is 0.' },
    { question: 'If |A| = 5, is A invertible?', options: ['No', 'Yes', 'Only if A is diagonal', 'Cannot determine'], correct: 1, explanation: '|A| ≠ 0, so A is invertible.' },
    { question: '(Aᵀ)⁻¹ = ?', options: ['(A⁻¹)ᵀ', 'A⁻¹', 'Aᵀ', 'A'], correct: 0, explanation: 'Transpose and inverse commute: (Aᵀ)⁻¹ = (A⁻¹)ᵀ.' },
    { question: '(kA)⁻¹ = ? (k ≠ 0)', options: ['kA⁻¹', '(1/k)A⁻¹', 'k²A⁻¹', 'A⁻¹/k²'], correct: 1, explanation: '(kA)⁻¹ = (1/k)A⁻¹.' },
    { question: 'Can a non-square matrix have an inverse?', options: ['Yes always', 'No', 'Only if it is diagonal', 'Sometimes'], correct: 1, explanation: 'Only square matrices can be invertible.' },
];
export const inverseAssessment = [
    { question: 'If |A| = −3, then |A⁻¹| = ?', options: ['3', '−3', '−1/3', '1/3'], correct: 2, explanation: '|A⁻¹| = 1/|A| = 1/(−3) = −1/3.' },
    { question: 'If A² = I, then A⁻¹ = ?', options: ['A²', 'A', 'I', '−A'], correct: 1, explanation: 'A² = I means A·A = I, so A⁻¹ = A.' },
    { question: '|AB| = ?', options: ['|A| + |B|', '|A| × |B|', '|A| − |B|', '|A|/|B|'], correct: 1, explanation: 'Determinant of product = product of determinants.' },
    { question: 'If A is 3×3 and |A| = 2, then |3A| = ?', options: ['6', '18', '54', '8'], correct: 2, explanation: '|kA| = kⁿ|A| where n is order. |3A| = 3³ × 2 = 54.' },
    { question: 'A matrix A is non-singular means:', options: ['|A| = 0', '|A| ≠ 0', 'A = O', 'A = I'], correct: 1, explanation: 'Non-singular = invertible = |A| ≠ 0.' },
    { question: 'If A and B are invertible, is AB invertible?', options: ['No', 'Yes, (AB)⁻¹ = B⁻¹A⁻¹', 'Only if A=B', 'Sometimes'], correct: 1, explanation: 'Product of invertible matrices is invertible.' },
    { question: 'The inverse of a diagonal matrix diag(2,3) is:', options: ['diag(2,3)', 'diag(1/2, 1/3)', 'diag(3,2)', 'Does not exist'], correct: 1, explanation: 'Inverse of diagonal = reciprocal of each diagonal element.' },
    { question: 'If AB = I, then BA = ?', options: ['O', 'AB', 'I', 'Undefined'], correct: 2, explanation: 'For square matrices, if AB = I then BA = I.' },
    { question: '(A⁻¹)ᵀ = (Aᵀ)⁻¹. This is:', options: ['False', 'True', 'True only for symmetric', 'True only for diagonal'], correct: 1, explanation: 'Transpose and inverse always commute for invertible matrices.' },
    { question: 'If A is orthogonal (AAᵀ = I), then A⁻¹ = ?', options: ['A', 'Aᵀ', '−A', 'A²'], correct: 1, explanation: 'AAᵀ = I means Aᵀ is the inverse of A.' },
];
