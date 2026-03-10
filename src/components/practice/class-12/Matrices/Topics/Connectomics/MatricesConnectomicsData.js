// MatricesConnectomicsData.js

export const matricesConnectomicsData = {
    hero: {
        badge: "Concept Map",
        title: "Matrices",
        highlight: "Connectomics",
        subtitle: "Matrices are a compact way to represent linear relationships. This page maps every idea you'll meet in Class 12 — from basic definitions to inverse matrices and tests of consistency — and shows the exact order to learn, practise, and master them."
    },
    learningObjectives: [
        "Understand matrix definitions and notation (order, elements).",
        "Master matrix arithmetic (add, scalar multiply, multiply).",
        "Learn transpose, symmetric/skew-symmetric, identity and zero matrices.",
        "Compute determinant, adjoint, inverse (2x2, 3x3) and find inverse with row operations.",
        "Apply matrices to solve linear systems (Cramer's rule, inverse method) and test consistency."
    ],
    conceptMap: {
        nodes: [
            { id: "matrix", label: "Matrix", icon: "🧮", color: "#6366f1" },
            { id: "types", label: "Types of Matrices", icon: "⬜", color: "#8b5cf6" },
            { id: "operations", label: "Operations (Add, Scalar, Multiply)", icon: "⚙️", color: "#ec4899" },
            { id: "transpose", label: "Transpose", icon: "🔄", color: "#f59e0b" },
            { id: "determinant", label: "Determinant", icon: "📐", color: "#10b981" },
            { id: "inverse", label: "Inverse (Adjoint/Row Ops)", icon: "🔓", color: "#06b6d4" },
            { id: "rank", label: "Rank", icon: "⭐", color: "#eab308" },
            { id: "systems", label: "Test of Consistency & Solving Linear Systems", icon: "⚖️", color: "#ef4444" },
            { id: "applications", label: "Applications (Area, Transformations)", icon: "🌍", color: "#3b82f6" }
        ],
        links: [
            { from: "matrix", to: "types", tooltip: "Different structures (Zero, Identity, Diagonal) have different properties." },
            { from: "matrix", to: "operations", tooltip: "Addition/subtraction requires the same order. Multiplication requires inner dimensions to match." },
            { from: "operations", to: "transpose", tooltip: "Operations and transpose interact: (AB)^T = B^TA^T. Transpose defines Symmetric/Skew-Symmetric." },
            { from: "transpose", to: "determinant", tooltip: "Determinant links to volume scaling and invertibility. det(A) = det(A^T)." },
            { from: "determinant", to: "inverse", tooltip: "If det ≠ 0 → inverse exists. Inverse can be found via adjoint/determinant or elementary row operations." },
            { from: "inverse", to: "rank", tooltip: "Invertible nxn matrices have full rank (rank n)." },
            { from: "rank", to: "systems", tooltip: "Rank(A) vs Rank([A|b]) determines if a system has unique, none, or infinite solutions." },
            { from: "systems", to: "applications", tooltip: "Systems model real-world networks; determinants calculate areas of triangles in 2D." }
        ]
    },
    topicBreakdown: [
        {
            title: "Matrix Basics & Types",
            id: "A",
            concepts: "Order, element notation $a_{ij}$, zero, identity, diagonal, scalar.",
            example: "Show equality of two matrices to solve for missing variables x and y.",
            mistake: "Mixing up row and column indices (putting $a_{21}$ where $a_{12}$ belongs).",
            problems: [
                { level: "Easy", q: "Construct a $2\\times 2$ matrix whose elements are given by $a_{ij} = \\frac{(i+j)^2}{2}$" },
                { level: "Medium", q: "Find $x, y$ if $\\begin{bmatrix} 2x+y & 4 \\\\ 5 & x-y \\end{bmatrix} = \\begin{bmatrix} 7 & 4 \\\\ 5 & 2 \\end{bmatrix}$" },
                { level: "Hard", q: "Prove that a scalar matrix is a diagonal matrix, but a diagonal matrix is not necessarily a scalar matrix." }
            ]
        },
        {
            title: "Operations & Properties",
            id: "B",
            concepts: "Associative, distributive, non-commutativity of multiplication.",
            example: "Given matrices A and B, find AB and BA, and show they are not equal.",
            mistake: "Assuming $AB = BA$ for all matrices.",
            problems: [
                { level: "Easy", q: "Add $A = \\begin{bmatrix} 1 & -2 \\\\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 2 & 4 \\\\ -1 & 0 \\end{bmatrix}$" },
                { level: "Medium", q: "Multiply $A_{2\\times 3}$ by $B_{3\\times 2}$ and state the order of the resulting matrix." },
                { level: "Hard", q: "Prove $(AB)^T = B^T A^T$ with a numerical $2\\times 2$ example." }
            ]
        },
        {
            title: "Transpose, Symmetric & Skew",
            id: "C",
            concepts: "Transpose properties, $A = A^T$ (symmetric), $A = -A^T$ (skew-symmetric).",
            example: "Express a given square matrix as the sum of a symmetric and a skew-symmetric matrix.",
            mistake: "Forgetting that diagonal elements of a skew-symmetric matrix must be purely zero.",
            problems: [
                { level: "Easy", q: "Find the transpose of $A = \\begin{bmatrix} 1 & 5 & 9 \\\\ 2 & 6 & 0 \\end{bmatrix}$" },
                { level: "Medium", q: "Show that $A + A^T$ is symmetric for any given square matrix A." },
                { level: "Hard", q: "Express $A = \\begin{bmatrix} 3 & -2 \\\\ -4 & 1 \\end{bmatrix}$ as the sum of symmetric and skew-symmetric matrices." }
            ]
        },
        {
            title: "Determinant (2x2, 3x3)",
            id: "D",
            concepts: "Evaluation, properties of determinants, geometric interpretation (scaling factor).",
            example: "Evaluate a 3x3 determinant by expanding along a row with the most zeros.",
            mistake: "Forgetting the alternating sign pattern (+, -, +) when expanding a 3x3 determinant.",
            problems: [
                { level: "Easy", q: "Evaluate the determinant of $\\begin{bmatrix} 2 & 4 \\\\ -1 & 3 \\end{bmatrix}$" },
                { level: "Medium", q: "Find the value of $x$ for which $\\begin{vmatrix} 3 & x \\\\ x & 1 \\end{vmatrix} = \\begin{vmatrix} 3 & 2 \\\\ 4 & 1 \\end{vmatrix}$" },
                { level: "Hard", q: "Use properties of determinants to show $\\begin{vmatrix} x & y & z \\\\ x^2 & y^2 & z^2 \\\\ x^3 & y^3 & z^3 \\end{vmatrix} = xyz(x-y)(y-z)(z-x)$" }
            ]
        },
        {
            title: "Adjoint & Inverse",
            id: "E",
            concepts: "Computing $A^{-1}$, the formula $A^{-1} = \\frac{1}{|A|} \\text{adj}(A)$, row-op algorithm.",
            example: "Find the inverse of a 2x2 matrix using the identity trick (switching a and d, negating b and c).",
            mistake: "Trying to find an inverse for a singular matrix ($|A| = 0$).",
            problems: [
                { level: "Easy", q: "Find the adjoint of $\\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix}$" },
                { level: "Medium", q: "Find the inverse of a given 3x3 matrix using the adjoint method." },
                { level: "Hard", q: "Use elementary row operations to find the inverse of $\\begin{bmatrix} 0 & 1 & 2 \\\\ 1 & 2 & 3 \\\\ 3 & 1 & 1 \\end{bmatrix}$" }
            ]
        },
        {
            title: "Rank & Consistency",
            id: "F",
            concepts: "Rank of a matrix, augmented matrix, test for unique/infinite/no solutions.",
            example: "Use Cramer's rule or matrix inverse to solve a system of 3 linear equations.",
            mistake: "Mixing up the conditions for infinite vs no solutions based on the augmented rank.",
            problems: [
                { level: "Easy", q: "Write the augmented matrix for the system: $2x+y=5$, $x-3y=7$" },
                { level: "Medium", q: "Solve the system using matrix inversion: $2x+5y=1, 3x + 2y = 7$" },
                { level: "Hard", q: "Examine the consistency of the system: $x+y+z=1, 2x+3y+2z=2, ax+ay+2az=4$" }
            ]
        },
        {
            title: "Applications",
            id: "G",
            concepts: "Area of a triangle via determinant, simple linear transformations.",
            example: "Find the area of a triangle given its vertices using a 3x3 determinant.",
            mistake: "Forgetting the absolute value — area cannot be negative even if the determinant is.",
            problems: [
                { level: "Easy", q: "Find the area of the triangle with vertices $(1,0), (6,0), (4,3)$" },
                { level: "Medium", q: "Show that the points $(a, b+c), (b, c+a), (c, a+b)$ are collinear using determinants." },
                { level: "Hard", q: "A matrix transformation maps $(1,0)$ to $(2,3)$ and $(0,1)$ to $(-1,4)$. Find the matrix." }
            ]
        }
    ],
    pedagogy: [
        {
            week: "Week 1",
            title: "Basics + Operations",
            focus: "Define matrices, build matrices from equations, execute addition, subtraction, scalar. Introduce multiplication rules."
        },
        {
            week: "Week 2",
            title: "Determinant & Adjoint",
            focus: "Calculate 2x2 and 3x3 determinants. Learn properties of determinants. Define adjoint and the inverse formula."
        },
        {
            week: "Week 3",
            title: "Inverse Row Ops & Consistency",
            focus: "Master elementary row operations to find inverses. Introduce rank, augmented matrices, and tests of consistency."
        },
        {
            week: "Week 4",
            title: "Applications & Mixed Practice",
            focus: "Area of triangles using determinants. Solve real-world word problems using systems of linear equations. Unit assessments."
        }
    ],
    misconceptions: [
        { statement: "\"If AB = 0 then A = 0 or B = 0\"", truth: "False. You can multiply two non-zero matrices to get a zero matrix, unlike real numbers." },
        { statement: "Confusing row vs column indices", truth: "An element $a_{23}$ is always in Row 2, Column 3. Never the other way around." },
        { statement: "Assuming multiplication is commutative", truth: "In general, $AB \\neq BA$. The order of multiplication drastically changes the result, or might not even be defined." },
        { statement: "Finding det(A) for non-square matrices", truth: "Determinants are strictly defined only for square ($n \\times n$) matrices." }
    ]
};
