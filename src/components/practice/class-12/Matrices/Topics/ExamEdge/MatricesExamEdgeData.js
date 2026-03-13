// MatricesExamEdgeData.js

export const matricesExamEdgeData = {
    hero: {
        badge: "Strategy Dashboard",
        title: "Exam Edge",
        subtitle: "Exam-focused guide to exactly what you need to practise for KCET and JEE, with topic weights, exam-style problems, time-management tips, and a 2-week intensive revision plan."
    },
    primers: [
        {
            exam: "KCET",
            description: "State-level test (Karnataka Examinations Authority). 60 MCQs for Maths, +1 for correct, no negative marking. Speed and direct formula application are critical here.",
            link: "https://cetonline.karnataka.gov.in/kea/"
        },
        {
            exam: "JEE Main",
            description: "National level engineering test (NTA). Heavy emphasis on algebra of matrices, determinants (2x2, 3x3), adjoint & inverse, and deeply testing the consistency of linear equations.",
            link: "https://jeemain.nta.ac.in/"
        }
    ],
    highYield: [
        {
            category: "Core Essentials (Both Exams)",
            color: "#f59e0b",
            topics: [
                "Matrix operations (add, mult, scalar) and properties",
                "Determinant evaluation (2x2, 3x3) — shortcut expansions",
                "Adjoint & inverse (2x2, 3x3) and inverse via row operations",
                "Test of consistency & solving linear systems (inverse method, Cramer's rule)"
            ]
        },
        {
            category: "KCET Specific Focus",
            color: "#0d9488",
            topics: [
                "Straightforward MCQ application of concepts (speed & accuracy).",
                "Fewer multi-step proofs, more direct computations.",
                "Identifying matrix types (symmetric, scalar, diagonal) instantly."
            ]
        },
        {
            category: "JEE Specific Focus",
            color: "#ef4444",
            topics: [
                "Proof-style, multi-step problems combining determinants, inverse, and system consistency.",
                "Higher powers of matrices ($A^{50}$ pattern recognition).",
                "Conceptual links to linear algebra (rank, invertibility)."
            ]
        }
    ],
    questions: {
        kcet: [
            {
                level: "Easy",
                q: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, find $|A|$.",
                options: ["-2", "2", "10", "4"],
                correct: 0,
                explanation: "For a $2 \\times 2$ matrix, $|A| = ad - bc = (1)(4) - (2)(3) = -2$."
            },
            {
                level: "Easy",
                q: "Which of the following matrices is symmetric?",
                options: [
                    "$\\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 1 & 2 \\\\ 2 & 3 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 1 & 2 \\\\ 3 & 1 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 0 & 0 \\\\ 1 & 0 \\end{bmatrix}$"
                ],
                correct: 1,
                explanation: "A symmetric matrix satisfies $A^T = A$. Only $\\begin{bmatrix} 1 & 2 \\\\ 2 & 3 \\end{bmatrix}$ mirrors perfectly across the main diagonal."
            },
            {
                level: "Medium",
                q: "For a 3x3 matrix $A$, if $|A| = 0$, which statement is correct?",
                options: [
                    "$A^{-1}$ exists",
                    "System $AX=B$ trivially has a unique solution",
                    "$A$ is singular",
                    "$A$ is an identity matrix"
                ],
                correct: 2,
                explanation: "A zero determinant means the matrix is singular, so it is not invertible."
            },
            {
                level: "Medium",
                q: "If $A = \\text{diag}[2, -1, 3]$ and $B = \\text{diag}[-1, 3, 2]$, find $A^2 B$.",
                options: [
                    "$\\text{diag}[-4, 3, 18]$",
                    "$\\text{diag}[4, 1, 9]$",
                    "$\\text{diag}[-2, -3, 6]$",
                    "$\\text{diag}[8, 9, 12]$"
                ],
                correct: 0,
                explanation: "First square $A$: $A^2 = \\text{diag}[4, 1, 9]$. Then multiply diagonal entries with $B$ to get $\\text{diag}[-4, 3, 18]$."
            }
        ],
        jee: [
            {
                level: "Medium",
                q: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, then $A^2$ equals",
                options: [
                    "$\\begin{bmatrix} 7 & 10 \\\\ 15 & 22 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 5 & 8 \\\\ 11 & 14 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 4 & 6 \\\\ 10 & 14 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 6 & 8 \\\\ 14 & 20 \\end{bmatrix}$"
                ],
                correct: 0,
                explanation: "Multiply $A$ by itself: $A^2 = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} = \\begin{bmatrix} 7 & 10 \\\\ 15 & 22 \\end{bmatrix}$."
            },
            {
                level: "Easy",
                q: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, then the trace of $A$ is",
                options: ["5", "3", "4", "7"],
                correct: 0,
                explanation: "The trace is the sum of the main diagonal entries: $1 + 4 = 5$."
            },
            {
                level: "Easy",
                q: "If $A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$, then $A^2$ equals",
                options: [
                    "$\\begin{bmatrix} 4 & 0 \\\\ 0 & 9 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 6 & 0 \\\\ 0 & 6 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 5 & 0 \\\\ 0 & 5 \\end{bmatrix}$"
                ],
                correct: 0,
                explanation: "Squaring a diagonal matrix means squaring each diagonal entry: $2^2 = 4$ and $3^2 = 9$."
            },
            {
                level: "Medium",
                q: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$, then $rank(A)$ is",
                options: ["0", "1", "2", "3"],
                correct: 1,
                explanation: "The second row is exactly twice the first row, so there is only one linearly independent row."
            },
            {
                level: "Easy",
                q: "If $A$ is a $2 \\times 3$ matrix and $B$ is a $3 \\times 4$ matrix, then $AB$ is",
                options: ["$2 \\times 4$", "$3 \\times 3$", "$4 \\times 2$", "not defined"],
                correct: 0,
                explanation: "Matrix multiplication uses matching inner dimensions. The product takes the outer dimensions, so $AB$ is $2 \\times 4$."
            },
            {
                level: "Medium",
                q: "If $A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$, then $A^5$ equals",
                options: ["$I$", "$5I$", "$0$", "$2I$"],
                correct: 0,
                explanation: "The identity matrix stays unchanged under every positive power, so $I^5 = I$."
            },
            {
                level: "Easy",
                q: "If $A$ is an idempotent matrix, then",
                options: ["$A^2 = 0$", "$A^2 = A$", "$A^2 = I$", "$A^3 = I$"],
                correct: 1,
                explanation: "Idempotent means the matrix reproduces itself when squared: $A^2 = A$."
            },
            {
                level: "Medium",
                q: "If $A = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$, then $A^2$ equals",
                options: ["$I$", "$0$", "$A$", "$2A$"],
                correct: 0,
                explanation: "Multiplying the swap matrix by itself swaps twice, which returns the identity matrix."
            },
            {
                level: "Easy",
                q: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, then $A^T$ equals",
                options: [
                    "$\\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 4 & 3 \\\\ 2 & 1 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$",
                    "$\\begin{bmatrix} 2 & 1 \\\\ 4 & 3 \\end{bmatrix}$"
                ],
                correct: 0,
                explanation: "Transpose swaps rows and columns, so the first row becomes the first column."
            },
            {
                level: "Easy",
                q: "If $A$ is symmetric, then",
                options: ["$A^T = A$", "$A^T = -A$", "$A^{-1} = A$", "$A^2 = A$"],
                correct: 0,
                explanation: "Symmetric matrices are exactly those equal to their transpose."
            },
            {
                level: "Easy",
                q: "If $A$ is skew-symmetric, then",
                options: ["$A^T = A$", "$A^T = -A$", "$A^2 = I$", "$A = I$"],
                correct: 1,
                explanation: "Skew-symmetric means the transpose changes the sign: $A^T = -A$."
            },
            {
                level: "Easy",
                q: "If $A$ is a zero matrix, then",
                options: ["$A^2 = I$", "$A^2 = 0$", "$A^{-1}$ exists", "$A$ is non-singular"],
                correct: 1,
                explanation: "Every entry remains zero after multiplication, so the square of the zero matrix is still the zero matrix."
            },
            {
                level: "Easy",
                q: "If $AB = BA$, matrices are called",
                options: ["Symmetric", "Idempotent", "Commutative", "Orthogonal"],
                correct: 2,
                explanation: "When the order does not matter in multiplication, the matrices are said to commute."
            },
            {
                level: "Medium",
                q: "If $A$ is invertible then",
                options: ["$|A| = 0$", "$|A| \\neq 0$", "$A^2 = I$", "$A = 0$"],
                correct: 1,
                explanation: "An inverse exists exactly when the determinant is non-zero."
            },
            {
                level: "Hard",
                q: "If $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, then $A^n$ equals",
                options: [
                    "$\\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}$",
                    "$\\begin{bmatrix} n & 1 \\\\ 0 & n \\end{bmatrix}$",
                    "$\\begin{bmatrix} 1 & 1 \\\\ 0 & n \\end{bmatrix}$",
                    "$\\begin{bmatrix} n & n \\\\ 0 & 1 \\end{bmatrix}$"
                ],
                correct: 0,
                explanation: "This Jordan block has the pattern $A^n = \\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}$."
            }
        ],
        jeeAdvanced: [
            {
                q: "Let $A = \\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix}$. Find $A^{2026}$.",
                ans: "$A^2 = -I$, so $A^{2026} = (A^2)^{1013} = (-I)^{1013} = -I$."
            },
            {
                q: "If $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$, find $A^2 - 4A + 3I$.",
                ans: "By Cayley-Hamilton or direct calc, $A^2 - 4A + 3I = 0$."
            },
            {
                q: "If $A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$, find $A^n$.",
                ans: "$A^n = 2^{n-1} A$."
            },
            {
                q: "Find all matrices $A$ such that $A^2 = I$.",
                ans: "Involutory matrices (e.g., $I, -I$, reflection matrices)."
            },
            {
                q: "If $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ and $A^2 = 0$, find relations between $a, b, c, d$.",
                ans: "$Tr(A) = 0$ ($a+d=0$) and $det(A) = 0$ ($ad-bc=0$)."
            }
        ]
    },
    tricks: [
        { title: "Identity Power Trick", content: "$I^n = I$ (Always)." },
        { title: "Diagonal Matrix Shortcut", content: "If $A = \\text{diag}[a, b]$, then $A^n = \\text{diag}[a^n, b^n]$." },
        { title: "Rotation Matrix Pattern", content: "For $A = \\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix}$: $A^2 = -I, A^4 = I$. Powers repeat every 4." },
        { title: "Idempotent Shortcut", content: "If $A^2 = A$, then $A^n = A$ for all $n \\ge 1$." },
        { title: "Nilpotent Trick", content: "If $A^2 = 0$, then $A^n = 0$ for $n \\ge 2$." }
    ],
    strategy: [
        {
            exam: "KCET Strategy",
            icon: "⏱️",
            color: "#0891b2",
            points: [
                "60 Maths problems in 80 minutes → ~1.2 minutes per question.",
                "Prioritize accuracy over attempting every single question immediately.",
                "No negative marking: Never leave a bubble blank. Guess intelligently if totally stuck at the end."
            ]
        },
        {
            exam: "JEE Strategy",
            icon: "🧠",
            color: "#e11d48",
            points: [
                "Mixed difficulty. Allocate ~1.5–3 mins for medium MCQs.",
                "Allocate 6–12 mins for longer numerical/constructive problems.",
                "Emphasize shortcut methods and keep your scratch-paper perfectly organized to avoid silly arithmetic errors in 3x3 multiplication."
            ]
        }
    ],
    revisionPlan: [
        { phase: "Days 1–3", focus: "All basic operations + 2x2 determinants + 10 practice MCQs per day." },
        { phase: "Days 4–6", focus: "3x3 determinants + adjoint & inverse (shortcuts) + inverse-by-row ops practice." },
        { phase: "Days 7–9", focus: "Rank, augmented matrix notation, consistency + mixed problem sets." },
        { phase: "Days 10–12", focus: "Timed practice. KCET mock: 60 Q in 80 min. JEE: Full maths mock sections." },
        { phase: "Days 13–14", focus: "Mistake log review + reading the last-minute formula sheet. Light review only." }
    ]
};
