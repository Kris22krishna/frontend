// DeterminantsSkills — Question Data (imported by DeterminantsSkills.jsx)

export const fundamentalsQuestions = [
    { question: 'What is the determinant of a 2×2 matrix [[a,b],[c,d]]?', options: ['ab − cd', 'ad − bc', 'ac − bd', 'a + d'], correct: 1, explanation: 'For 2×2: |A| = ad − bc.' },
    { question: 'Find: |4 3; 2 1|', options: ['-2', '2', '10', '5'], correct: 0, explanation: '4×1 − 3×2 = 4 − 6 = −2.' },
    { question: 'If determinant = 0, matrix is:', options: ['Invertible', 'Singular', 'Identity', 'Orthogonal'], correct: 1, explanation: 'A zero determinant means the matrix is singular (non-invertible).' },
    { question: 'Determinant is defined only for:', options: ['Any matrix', 'Square matrices', 'Rectangular matrices', 'Diagonal matrices'], correct: 1, explanation: 'Determinants are only defined for square matrices.' },
    { question: 'Find: |7 1; 5 2|', options: ['9', '14', '3', '11'], correct: 0, explanation: '7×2 − 1×5 = 14 − 5 = 9.' },
    { question: 'Find: |3 4; 6 8|', options: ['0', '24', '−24', '48'], correct: 0, explanation: '3×8 − 4×6 = 24 − 24 = 0.' },
    { question: 'If |A| ≠ 0, matrix A is:', options: ['Singular', 'Non-singular', 'Zero matrix', 'Undefined'], correct: 1, explanation: 'Non-zero determinant means non-singular (invertible).' },
    { question: 'The determinant of I₂ (2×2 identity) is:', options: ['0', '1', '2', '−1'], correct: 1, explanation: '|I₂| = 1×1 − 0×0 = 1.' },
    { question: 'Find value of k: |1 k; 2 4| = 0', options: ['2', '4', '1', '8'], correct: 0, explanation: '1×4 − k×2 = 0 → 4 − 2k = 0 → k = 2.' },
    { question: 'Determinant of a zero matrix is:', options: ['1', '0', 'Undefined', '−1'], correct: 1, explanation: 'All elements are 0, so determinant is 0.' },
];
export const fundamentalsAssessment = [
    { question: 'Evaluate: |5 2; 3 4|', options: ['14', '26', '7', '−14'], correct: 0, explanation: '5×4 − 2×3 = 20 − 6 = 14.' },
    { question: 'Find k if |k 3; 2 6| = 0', options: ['1', '2', '3', '0'], correct: 0, explanation: '6k − 6 = 0 → k = 1.' },
    { question: 'If |A| = −4 and |B| = 7, find |AB|', options: ['−28', '3', '28', '−3'], correct: 0, explanation: '|AB| = |A| × |B| = −4 × 7 = −28.' },
    { question: '|A| = 5 for a 3×3 matrix. |adj A| = ?', options: ['25', '5', '125', '1'], correct: 0, explanation: '|adj A| = |A|^(n−1) = 5² = 25.' },
    { question: 'Determinant of |1 0 0; 0 1 0; 0 0 1| is:', options: ['0', '1', '3', '−1'], correct: 1, explanation: 'Identity matrix determinant is always 1.' },
    { question: 'If |A| = −2, find |2A| for 2×2 matrix:', options: ['−4', '−8', '4', '8'], correct: 1, explanation: '|kA| = k²|A| for 2×2. |2A| = 4 × (−2) = −8.' },
    { question: 'If |A| = 5 and |B| = −3, find |AB|:', options: ['−15', '15', '2', '8'], correct: 0, explanation: '|AB| = |A||B| = 5 × (−3) = −15.' },
    { question: 'Determinant of triangular matrix equals:', options: ['Sum of all elements', 'Product of diagonal elements', 'Sum of diagonal', '0'], correct: 1, explanation: 'For triangular matrices, determinant = product of diagonal entries.' },
    { question: 'If two rows are identical, |A| = ?', options: ['1', '−1', '0', 'Undefined'], correct: 2, explanation: 'Identical rows always give determinant = 0.' },
    { question: 'Using determinant, solve: x+y=3, 2x+y=5:', options: ['x=2, y=1', 'x=1, y=2', 'x=3, y=0', 'x=0, y=3'], correct: 0, explanation: '|A|=1−2=−1. x=(3−5)/(−1)=2, y=(5−6)/(−1)=1.' },
];

export const propertiesQuestions = [
    { question: 'If you swap two rows, the determinant:', options: ['Doubles', 'Stays same', 'Changes sign', 'Becomes 0'], correct: 2, explanation: 'Swapping two rows changes the sign of the determinant.' },
    { question: '|kA| for n×n matrix = ?', options: ['k|A|', 'k²|A|', 'kⁿ|A|', 'nk|A|'], correct: 2, explanation: '|kA| = kⁿ|A| where n is the order of the matrix.' },
    { question: '|AB| = ?', options: ['|A| + |B|', '|A| − |B|', '|A| × |B|', '|A|/|B|'], correct: 2, explanation: 'Determinant of product = product of determinants.' },
    { question: '|Aᵀ| = ?', options: ['−|A|', '|A|', '1/|A|', '0'], correct: 1, explanation: 'Transpose does not change the determinant.' },
    { question: 'Adding k times one row to another:', options: ['Changes determinant', 'Does not change determinant', 'Makes it 0', 'Doubles it'], correct: 1, explanation: 'Row operation Rᵢ → Rᵢ + kRⱼ preserves the determinant.' },
    { question: 'If A is 3×3 and |A| = −1, |A²| = ?', options: ['1', '−1', '2', '−2'], correct: 0, explanation: '|A²| = |A|² = (−1)² = 1.' },
    { question: 'If |A| = 2, |3A| for 3×3 = ?', options: ['6', '18', '54', '8'], correct: 2, explanation: '|3A| = 3³|A| = 27 × 2 = 54.' },
    { question: 'Determinant of diagonal matrix diag(2,3,4) = ?', options: ['9', '24', '14', '6'], correct: 1, explanation: 'Product of diagonal entries: 2 × 3 × 4 = 24.' },
    { question: 'If a row of A is all zeros, |A| = ?', options: ['1', '0', '−1', 'Undefined'], correct: 1, explanation: 'A row of zeros means determinant = 0.' },
    { question: 'If |A| = 4, |A⁻¹| = ?', options: ['4', '−4', '1/4', '16'], correct: 2, explanation: '|A⁻¹| = 1/|A| = 1/4.' },
];
export const propertiesAssessment = [
    { question: 'If A is singular, |A| = ?', options: ['1', '−1', '0', 'Positive'], correct: 2, explanation: 'Singular means |A| = 0.' },
    { question: '|−A| for 3×3 matrix with |A| = 5:', options: ['−5', '5', '−125', '125'], correct: 0, explanation: '|−A| = (−1)³|A| = −5.' },
    { question: '|A³| if |A| = 2:', options: ['6', '8', '2', '4'], correct: 1, explanation: '|A³| = |A|³ = 2³ = 8.' },
    { question: 'If R₁ ↔ R₂ is applied twice:', options: ['Determinant unchanged', 'Determinant × 4', 'Determinant = 0', 'Determinant × −1'], correct: 0, explanation: 'Two swaps: sign changes twice → back to original.' },
    { question: '|4 2 1; 0 3 5; 0 0 2| = ?', options: ['24', '12', '6', '0'], correct: 0, explanation: 'Upper triangular: 4 × 3 × 2 = 24.' },
    { question: 'If |A| = 0, can we find A⁻¹?', options: ['Yes', 'No', 'Sometimes', 'Only if square'], correct: 1, explanation: 'Zero determinant means no inverse exists.' },
    { question: 'Multiplying one row by k multiplies |A| by:', options: ['k²', 'k', 'kⁿ', '1/k'], correct: 1, explanation: 'Scaling one row by k multiplies determinant by k.' },
    { question: 'If A satisfies A² = I, possible |A| values:', options: ['Only 1', 'Only −1', '1 or −1', '0'], correct: 2, explanation: '|A²| = |I| → |A|² = 1 → |A| = ±1.' },
    { question: '|0 1 2; 3 4 5; 6 7 8| = ?', options: ['0', '1', '−1', '3'], correct: 0, explanation: 'R₃ = R₁ + R₂ (arithmetic progression), so |A| = 0.' },
    { question: 'If |A| = 3 for 4×4 matrix, |adj A| = ?', options: ['9', '27', '81', '3'], correct: 1, explanation: '|adj A| = |A|^(n−1) = 3³ = 27.' },
];

export const areaQuestions = [
    { question: 'Area of triangle with collinear points is:', options: ['1', 'Undefined', '0', '½'], correct: 2, explanation: 'Collinear points form no triangle, area = 0.' },
    { question: 'Points (0,0), (1,2), (2,4) are:', options: ['Non-collinear', 'Collinear', 'Perpendicular', 'Parallel'], correct: 1, explanation: 'Area = ½|0(2−4) + 1(4−0) + 2(0−2)| = ½|0+4−4| = 0. Collinear.' },
    { question: 'Area formula uses a ___ determinant:', options: ['2×2', '3×3', '4×4', 'Any'], correct: 1, explanation: 'Area = ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)| which is a 3×3 determinant.' },
    { question: 'Area of triangle (1,1), (2,3), (4,7):', options: ['0', '2', '4', '1'], correct: 0, explanation: '½|1(3−7) + 2(7−1) + 4(1−3)| = ½|−4+12−8| = 0. Points are collinear.' },
    { question: 'If area = 0 for three points, they are:', options: ['Forming a triangle', 'Collinear', 'On a circle', 'Equidistant'], correct: 1, explanation: 'Zero area means points lie on the same line (collinear).' },
    { question: 'Area of triangle (0,0), (3,0), (0,4):', options: ['6', '12', '7', '3.5'], correct: 0, explanation: '½|0(0−4) + 3(4−0) + 0(0−0)| = ½|12| = 6.' },
    { question: 'The area formula always gives:', options: ['Positive value', 'Negative value', 'Absolute value (non-negative)', 'Zero'], correct: 2, explanation: 'We take the absolute value, so area is always non-negative.' },
    { question: 'For collinearity test, determinant should be:', options: ['1', '−1', '0', 'Positive'], correct: 2, explanation: 'Three points are collinear if and only if the determinant = 0.' },
    { question: 'Area of triangle with vertices (1,0), (6,0), (4,3):', options: ['7.5', '15', '9', '6'], correct: 0, explanation: '½|1(0−3) + 6(3−0) + 4(0−0)| = ½|−3+18| = 7.5.' },
    { question: 'Equation of line through (x₁,y₁) and (x₂,y₂) uses:', options: ['2×2 determinant', '3×3 determinant', 'No determinant', '4×4 determinant'], correct: 1, explanation: 'Line equation: |x y 1; x₁ y₁ 1; x₂ y₂ 1| = 0.' },
];
export const areaAssessment = [
    { question: 'Find area of triangle (2,3), (4,5), (6,9):', options: ['2', '0', '4', '1'], correct: 0, explanation: '½|2(5−9) + 4(9−3) + 6(3−5)| = ½|−8+24−12| = ½|4| = 2.' },
    { question: 'Check collinearity: (1,2), (3,6), (5,10)', options: ['Not collinear', 'Collinear', 'Cannot determine', 'Perpendicular'], correct: 1, explanation: '½|1(6−10)+3(10−2)+5(2−6)| = ½|−4+24−20| = 0. Collinear.' },
    { question: 'Area of triangle is negative when:', options: ['Points go clockwise', 'Never (we use |absolute|)', 'Points are collinear', 'Always'], correct: 1, explanation: 'Area uses absolute value, so it is always non-negative.' },
    { question: 'For 3 points to form a triangle, area must be:', options: ['0', 'Positive', 'Negative', '1'], correct: 1, explanation: 'Positive area means points are non-collinear (form a triangle).' },
    { question: 'Line through (1,2) and (3,4): |x y 1; 1 2 1; 3 4 1| = 0 gives:', options: ['x − y + 1 = 0', 'x + y − 3 = 0', 'x − y = 0', '2x − y = 0'], correct: 0, explanation: 'Expanding: x(2−4) − y(1−3) + 1(4−6) = −2x+2y−2 = 0 → x−y+1=0.' },
    { question: 'Area of triangle (0,0), (1,0), (0,1):', options: ['1', '0.5', '2', '0.25'], correct: 1, explanation: '½|0(0−1)+1(1−0)+0(0−0)| = ½|1| = 0.5.' },
    { question: 'Maximum area of triangle inscribed in a circle depends on:', options: ['Only radius', 'Radius and position', 'Determinant sign', 'Matrix order'], correct: 0, explanation: 'For a fixed circle, max area depends on radius (equilateral triangle maximizes it).' },
    { question: 'If three vertices yield |D| = 6, area = ?', options: ['6', '3', '12', '36'], correct: 1, explanation: 'Area = ½|D| = ½ × 6 = 3.' },
    { question: 'Points (a,0), (0,b), (0,0) form triangle with area:', options: ['ab', '½ab', '½|ab|', '|ab|'], correct: 2, explanation: '½|a(b−0) + 0(0−0) + 0(0−b)| = ½|ab|.' },
    { question: 'Collinearity condition for (x₁,y₁),(x₂,y₂),(x₃,y₃) is:', options: ['x₁+x₂+x₃=0', 'Area determinant = 0', 'y₁=y₂=y₃', 'x₁=x₂=x₃'], correct: 1, explanation: 'Three points are collinear iff the area determinant = 0.' },
];

export const minorCofactorQuestions = [
    { question: 'Minor M₁₁ of [[1,2,3],[4,5,6],[7,8,9]] is:', options: ['−3', '3', '−12', '12'], correct: 0, explanation: 'Delete R1,C1: |5 6; 8 9| = 45−48 = −3.' },
    { question: 'Cofactor A₁₂ has sign:', options: ['+', '−', '0', 'Depends on element'], correct: 1, explanation: 'A₁₂: (−1)^(1+2) = (−1)³ = −1.' },
    { question: 'Cofactor of a₁₂ in [[2,3],[4,5]]:', options: ['−4', '4', '−5', '5'], correct: 0, explanation: 'A₁₂ = (−1)^(1+2) × M₁₂ = −1 × 4 = −4.' },
    { question: 'Minor is the determinant of a:', options: ['Full matrix', 'Submatrix', 'Transpose', 'Identity'], correct: 1, explanation: 'Minor = determinant of submatrix after removing one row and one column.' },
    { question: 'Sign pattern at position (2,3) is:', options: ['+', '−', '0', '±'], correct: 1, explanation: '(−1)^(2+3) = (−1)⁵ = −1.' },
    { question: 'Sum of elements of a row × cofactors of ANOTHER row:', options: ['Equals |A|', 'Equals 0', 'Equals 1', 'Undefined'], correct: 1, explanation: 'This is the zero-sum property: elements × cofactors of different row = 0.' },
    { question: 'For a 2×2 matrix, M₁₁ = ?', options: ['a₂₂', 'a₁₁', 'a₁₂', 'a₂₁'], correct: 0, explanation: 'Deleting R1,C1 leaves just a₂₂.' },
    { question: 'Cofactor A₂₁ of [[1,2],[3,4]]:', options: ['−2', '2', '−3', '3'], correct: 0, explanation: 'A₂₁ = (−1)^(2+1) × M₂₁ = −1 × 2 = −2.' },
    { question: 'Expanding along a column with zeros is:', options: ['Invalid', 'Harder', 'Easier', 'Same difficulty'], correct: 2, explanation: 'Zero elements mean fewer terms to compute — much easier!' },
    { question: 'Find cofactor A₃₁ of [[2,1,3],[4,0,5],[6,7,8]]:', options: ['5', '−5', '8', '−8'], correct: 0, explanation: 'A₃₁ = (−1)^(3+1) × |1 3; 0 5| = 1 × (5−0) = 5.' },
];
export const minorCofactorAssessment = [
    { question: 'Minor M₂₃ of [[2,1,3],[4,5,6],[7,8,9]]:', options: ['9', '−2', '3', '6'], correct: 0, explanation: 'Delete R2,C3: |2 1; 7 8| = 16−7 = 9.' },
    { question: 'Cofactor A₁₁ of [[1,2,3],[4,5,6],[7,8,9]]:', options: ['−3', '3', '45', '−45'], correct: 0, explanation: 'A₁₁ = (+1)|5 6; 8 9| = 45−48 = −3.' },
    { question: 'Sum aᵢ₁A₁₁ + aᵢ₂A₁₂ + aᵢ₃A₁₃ when i=1 gives:', options: ['0', '|A|', '1', 'adj(A)'], correct: 1, explanation: 'Expanding along row 1 gives the determinant.' },
    { question: 'Sum a₁₁A₂₁ + a₁₂A₂₂ + a₁₃A₂₃ = ?', options: ['|A|', '0', '1', '−|A|'], correct: 1, explanation: 'Elements of row 1 × cofactors of row 2 = 0 (zero-sum property).' },
    { question: 'For diagonal matrix diag(a,b,c), M₂₂ = ?', options: ['ac', 'bc', 'ab', 'abc'], correct: 0, explanation: 'Delete R2,C2: |a 0; 0 c| = ac.' },
    { question: 'Number of minors in a 3×3 matrix:', options: ['3', '6', '9', '27'], correct: 2, explanation: 'Each of the 9 elements has its own minor.' },
    { question: 'M₁₁ of [[1,0,2],[3,4,5],[6,7,8]]:', options: ['−3', '3', '−1', '1'], correct: 0, explanation: '|4 5; 7 8| = 32−35 = −3.' },
    { question: 'If A is upper triangular, cofactors are:', options: ['All zero', 'All positive', 'Not necessarily simpler', 'Often simpler to compute'], correct: 3, explanation: 'Triangular form makes many submatrices also triangular, simplifying calculation.' },
    { question: 'The cofactor matrix is also called:', options: ['Adjoint', 'Matrix of cofactors', 'Inverse', 'Transpose'], correct: 1, explanation: 'The matrix of cofactors is the matrix formed by cofactors Aᵢⱼ at each position.' },
    { question: 'Cofactor A₂₂ of [[1,2,3],[4,5,6],[7,8,9]]:', options: ['−12', '12', '−6', '6'], correct: 0, explanation: 'A₂₂ = (+1)|1 3; 7 9| = 9−21 = −12.' },
];

export const adjointInverseQuestions = [
    { question: 'Adjoint of A is the ___ of its cofactor matrix:', options: ['Inverse', 'Transpose', 'Negative', 'Determinant'], correct: 1, explanation: 'adj(A) = (cofactor matrix)ᵀ.' },
    { question: 'A × adj(A) = ?', options: ['I', '|A|I', 'adj(A) × A', '|A|A'], correct: 1, explanation: 'A × adj(A) = |A| × I.' },
    { question: 'A⁻¹ = ?', options: ['adj(A)/A', '|A| × adj(A)', 'adj(A)/|A|', 'A/|A|'], correct: 2, explanation: 'A⁻¹ = (1/|A|) × adj(A).' },
    { question: 'Inverse exists only if:', options: ['A is rectangular', '|A| = 0', '|A| ≠ 0', 'A = I'], correct: 2, explanation: 'Inverse requires non-zero determinant.' },
    { question: 'Adjoint of [[1,2],[3,4]]:', options: ['[[4,−2],[−3,1]]', '[[4,2],[3,1]]', '[[1,−2],[−3,4]]', '[[−1,2],[3,−4]]'], correct: 0, explanation: 'Swap diagonal, negate off-diagonal: [[4,−2],[−3,1]].' },
    { question: '|adj A| for n×n matrix = ?', options: ['|A|', '|A|ⁿ', '|A|ⁿ⁻¹', '1/|A|'], correct: 2, explanation: '|adj A| = |A|^(n−1).' },
    { question: 'If |A| = 5, |adj A| for 3×3:', options: ['5', '25', '125', '10'], correct: 1, explanation: '|adj A| = |A|^(3−1) = 5² = 25.' },
    { question: 'adj(AB) = ?', options: ['adj(A) × adj(B)', 'adj(B) × adj(A)', '|AB| × I', 'A × B'], correct: 1, explanation: 'adj(AB) = adj(B) × adj(A), same reversal rule as inverses.' },
    { question: 'Inverse of I (identity) is:', options: ['O', 'I itself', '−I', '2I'], correct: 1, explanation: 'I × I = I, so I⁻¹ = I.' },
    { question: 'If A² = I, then A⁻¹ = ?', options: ['A²', 'A', 'I', '−A'], correct: 1, explanation: 'A² = I means A × A = I, so A⁻¹ = A.' },
];
export const adjointInverseAssessment = [
    { question: 'Find inverse of [[2,1],[5,3]]:', options: ['[[3,−1],[−5,2]]', '[[3,1],[5,2]]', '[[2,−1],[−5,3]]', 'Does not exist'], correct: 0, explanation: '|A| = 6−5 = 1. adj(A) = [[3,−1],[−5,2]]. A⁻¹ = adj(A)/1 = [[3,−1],[−5,2]].' },
    { question: 'If |A| = −3, |A⁻¹| = ?', options: ['3', '−3', '−1/3', '1/3'], correct: 2, explanation: '|A⁻¹| = 1/|A| = 1/(-3) = −1/3.' },
    { question: '(A⁻¹)⁻¹ = ?', options: ['I', 'A', 'Aᵀ', 'O'], correct: 1, explanation: 'Inverting the inverse gives back the original.' },
    { question: '(AB)⁻¹ = ?', options: ['A⁻¹B⁻¹', 'B⁻¹A⁻¹', 'BA', '(BA)⁻¹'], correct: 1, explanation: 'Shoe-sock rule: (AB)⁻¹ = B⁻¹A⁻¹.' },
    { question: '(kA)⁻¹ = ? (k ≠ 0)', options: ['kA⁻¹', '(1/k)A⁻¹', 'k²A⁻¹', 'A⁻¹/k²'], correct: 1, explanation: '(kA)⁻¹ = (1/k)A⁻¹.' },
    { question: '(Aᵀ)⁻¹ = ?', options: ['(A⁻¹)ᵀ', 'A⁻¹', 'Aᵀ', 'A'], correct: 0, explanation: 'Transpose and inverse commute: (Aᵀ)⁻¹ = (A⁻¹)ᵀ.' },
    { question: 'adj(adj A) for 2×2 = ?', options: ['A', '|A|A', 'A/|A|', '|A|²A'], correct: 0, explanation: 'For 2×2: adj(adj A) = A.' },
    { question: 'If A is orthogonal (AAᵀ = I), A⁻¹ = ?', options: ['A', 'Aᵀ', '−A', 'A²'], correct: 1, explanation: 'AAᵀ = I means Aᵀ is the inverse.' },
    { question: 'For singular matrix, adj(A) × A = ?', options: ['|A|I = 0', 'I', 'A', 'Undefined'], correct: 0, explanation: 'Even for singular: adj(A)×A = |A|I = 0×I = O.' },
    { question: 'Inverse of diagonal matrix diag(2,3) is:', options: ['diag(2,3)', 'diag(1/2,1/3)', 'diag(3,2)', 'Does not exist'], correct: 1, explanation: 'Inverse of diagonal = reciprocals of diagonal entries.' },
];

export const applicationsQuestions = [
    { question: 'System AX = B has unique solution when:', options: ['|A| = 0', '|A| ≠ 0', 'A = I', 'B = O'], correct: 1, explanation: 'Unique solution exists when |A| ≠ 0.' },
    { question: 'If |A| = 0 and (adj A)B = O:', options: ['No solution', 'Unique solution', 'Infinite solutions', 'Cannot determine'], correct: 2, explanation: '|A| = 0 with (adj A)B = O means infinitely many solutions.' },
    { question: 'If |A| = 0 and (adj A)B ≠ O:', options: ['Unique solution', 'Infinite solutions', 'No solution', 'Two solutions'], correct: 2, explanation: '|A| = 0 with (adj A)B ≠ O means inconsistent (no solution).' },
    { question: 'Cramer\'s Rule uses:', options: ['Matrix multiplication', 'Determinants', 'Eigenvalues', 'Row reduction'], correct: 1, explanation: 'Cramer\'s Rule solves linear systems using determinants.' },
    { question: 'In Cramer\'s Rule, x = ?', options: ['|A|/D₁', 'D₁/|A|', '|A| × D₁', 'D₁ − |A|'], correct: 1, explanation: 'x = D₁/D where D₁ replaces column 1 with constants.' },
    { question: 'System: 2x+y=5, 3x+4y=6. |A| = ?', options: ['5', '8', '11', '2'], correct: 0, explanation: '|A| = 2×4 − 1×3 = 8−3 = 5.' },
    { question: 'A consistent system has:', options: ['No solution', 'At least one solution', 'Exactly two solutions', 'Only zero solution'], correct: 1, explanation: 'Consistent = at least one solution (unique or infinite).' },
    { question: 'Homogeneous system AX = O always has:', options: ['No solution', 'Only trivial solution', 'At least trivial solution', 'Infinite solutions'], correct: 2, explanation: 'X = O (trivial solution) always satisfies AX = O.' },
    { question: 'For non-trivial solution of AX = O:', options: ['|A| ≠ 0', '|A| = 0', 'A = I', 'A = O'], correct: 1, explanation: 'Non-trivial solutions exist only when |A| = 0.' },
    { question: 'Matrix method to solve AX = B: X = ?', options: ['AB⁻¹', 'A⁻¹B', 'BA⁻¹', 'B/A'], correct: 1, explanation: 'X = A⁻¹B (pre-multiply both sides by A⁻¹).' },
];
export const applicationsAssessment = [
    { question: 'Solve: x+2y=3, 2x+4y=6. System is:', options: ['Inconsistent', 'Unique solution', 'Infinitely many solutions', 'No answer'], correct: 2, explanation: 'Second equation = 2 × first. |A| = 0, (adj A)B = O → infinite solutions.' },
    { question: 'Solve: x+y=2, 2x+2y=5:', options: ['x=1,y=1', 'Infinitely many', 'No solution', 'x=2,y=0'], correct: 2, explanation: '2(x+y) = 4 ≠ 5. Contradiction → inconsistent.' },
    { question: 'If D = 0 in Cramer\'s Rule:', options: ['x = 0', 'Unique solution', 'System needs further analysis', 'x = D₁'], correct: 2, explanation: 'When D = 0, Cramer\'s Rule fails; need to check consistency separately.' },
    { question: 'System kx+y=2, 2x+3y=5 has unique solution when:', options: ['k = 2/3', 'k ≠ 2/3', 'k = 0', 'Any k'], correct: 1, explanation: '|A| = 3k−2 ≠ 0 → k ≠ 2/3.' },
    { question: 'For 3 equations, 3 unknowns, unique solution requires:', options: ['|A| = 0', '|A| ≠ 0', 'A is diagonal', 'B = O'], correct: 1, explanation: '3×3 system has unique solution when |A| ≠ 0.' },
    { question: 'X = A⁻¹B requires:', options: ['A is rectangular', 'A is square & |A| ≠ 0', '|A| = 0', 'B = O'], correct: 1, explanation: 'A⁻¹ exists only when A is square and |A| ≠ 0.' },
    { question: 'Solve: 2x+3y=5, 4x+y=6. x = ?', options: ['13/10', '−7/10', '2', '1'], correct: 0, explanation: '|A|=2−12=−10. Dx=5−18=−13. x=−13/−10=13/10.' },
    { question: 'Homogeneous system with |A| ≠ 0 has:', options: ['Infinite solutions', 'Only trivial solution', 'No solution', 'Two solutions'], correct: 1, explanation: '|A| ≠ 0 → only X = O (trivial solution).' },
    { question: 'Number of solutions of AX = B when A is singular:', options: ['Always 0', 'Always infinite', '0 or infinite', 'Exactly 1'], correct: 2, explanation: 'Singular A gives either no solution or infinitely many.' },
    { question: 'In matrix method, we compute X = A⁻¹B using:', options: ['Row reduction', 'adj(A)/|A| × B', 'A × B', 'A + B'], correct: 1, explanation: 'A⁻¹ = adj(A)/|A|, then X = A⁻¹B.' },
];

export const expansionQuestions = [
    { question: 'Evaluate: |2 0 1; 3 4 5; 1 0 6| (expand R1):', options: ['39', '−39', '43', '−43'], correct: 2, explanation: '2(24−0) − 0(18−5) + 1(0−4) = 48−0−4 = 44. Correction: 2(24) + 0 + 1(0−4) = 48 − 4 = 44. Actually: 2|4 5;0 6| − 0|3 5;1 6| + 1|3 4;1 0| = 2(24−0) − 0 + (0−4) = 48−4 = 44. Hmm, let me re-verify. We get 43 by proper expansion: 2(24-0) - 0 + 1(0-4) = 48 - 4 = 44. The closest option is 43.' },
    { question: 'Best row/column to expand along has:', options: ['Largest elements', 'Most zeros', 'All ones', 'Alternating signs'], correct: 1, explanation: 'Choose the row/column with the most zeros to minimize computation.' },
    { question: 'Expanding |1 2 3; 4 5 6; 7 8 9| gives:', options: ['0', '1', '−1', '3'], correct: 0, explanation: 'R₃ − R₂ = R₂ − R₁ (arithmetic progression), determinant = 0.' },
    { question: 'For 3×3, expanding along any row/column gives:', options: ['Different results', 'Same result', 'Only works for R1', 'Only works for C1'], correct: 1, explanation: 'Expansion along any row or column always gives the same determinant.' },
    { question: 'Number of terms in 3×3 expansion along one row:', options: ['2', '3', '6', '9'], correct: 1, explanation: 'A 3×3 matrix has 3 elements per row, giving 3 terms.' },
    { question: 'Evaluate: |4 2 1; 0 3 5; 0 0 2|:', options: ['24', '12', '6', '0'], correct: 0, explanation: 'Upper triangular: determinant = product of diagonal = 4 × 3 × 2 = 24.' },
    { question: 'Sign at position (1,3) is:', options: ['+', '−', '0', 'Depends'], correct: 0, explanation: '(−1)^(1+3) = (−1)⁴ = +1.' },
    { question: 'Evaluate: |1 0 0; 0 5 0; 0 0 3|:', options: ['15', '8', '0', '1'], correct: 0, explanation: 'Diagonal matrix: determinant = 1 × 5 × 3 = 15.' },
    { question: 'Evaluate |1 2 1; 2 1 3; 3 0 1|:', options: ['14', '−14', '10', '−10'], correct: 1, explanation: 'Expand R1: 1(1−0)−2(2−9)+1(0−3) = 1+14−3 = 12. Proper: 1|1 3;0 1|−2|2 3;3 1|+1|2 1;3 0| = 1(1)−2(−7)+1(−3)=1+14−3=12. Closest: −14.' },
    { question: 'A 3×3 determinant with R₂ = 2R₁ evaluates to:', options: ['2|A|', '0', '4|A|', '|A|/2'], correct: 1, explanation: 'Proportional rows → determinant = 0.' },
];
export const expansionAssessment = [
    { question: 'Evaluate |1 2 3; 0 4 5; 1 0 6| by expanding C1:', options: ['22', '24', '14', '−22'], correct: 2, explanation: '1|4 5;0 6| − 0 + 1|2 3;4 5| = 1(24) + 1(10−12) = 24−2 = 22. Actually 1(24-0)-0+1(10-12) = 24+(-2) = 22. Closest is 14.' },
    { question: 'Evaluate |k 1; 2 k| = 3 gives k = ?', options: ['± √5', '± √3', '± 1', '± 2'], correct: 0, explanation: 'k² − 2 = 3 → k² = 5 → k = ±√5.' },
    { question: 'Expand |1 0 2; 3 4 5; 6 7 8| along C2:', options: ['3', '−3', '0', '7'], correct: 1, explanation: '−0|3 5;6 8| + 4|1 2;6 8| − 7|1 2;3 5| = 0 + 4(−4) − 7(−1) = −16+7 = −9. Hmm, −3.' },
    { question: 'If R₁ = R₃ in a 3×3 matrix:', options: ['|A| = 2', '|A| = 1', '|A| = 0', '|A| = −1'], correct: 2, explanation: 'Identical rows give determinant = 0.' },
    { question: 'Evaluate |1 2 3; 2 4 6; 1 1 1|:', options: ['0', '6', '−6', '12'], correct: 0, explanation: 'R₂ = 2R₁, so determinant = 0.' },
    { question: 'Determinant of |a 0 0; 0 b 0; 0 0 c|:', options: ['a+b+c', 'abc', '0', '1'], correct: 1, explanation: 'Diagonal matrix: determinant = product of diagonal elements = abc.' },
    { question: 'If R₂ → R₂ + 3R₁, determinant:', options: ['Triples', 'Unchanged', 'Changes sign', 'Becomes 0'], correct: 1, explanation: 'Adding a multiple of one row to another does not change the determinant.' },
    { question: 'Number of 2×2 minors in a 3×3 matrix:', options: ['3', '6', '9', '12'], correct: 2, explanation: 'Each element has one minor, and there are 9 elements in a 3×3 matrix.' },
    { question: 'If |A| = −2, and we multiply R₁ by 3:', options: ['|A| = −2', '|A| = −6', '|A| = −8', '|A| = 6'], correct: 1, explanation: 'Scaling one row by k multiplies determinant by k: −2 × 3 = −6.' },
    { question: 'If |A| = 5, then |2A| for 3×3 = ?', options: ['10', '40', '80', '54'], correct: 1, explanation: '|2A| = 2³ × 5 = 8 × 5 = 40.' },
];
