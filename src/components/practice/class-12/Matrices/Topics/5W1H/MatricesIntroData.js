export const matricesIntroData = {
    prerequisites: [
        { title: 'Basic Arithmetic', desc: 'Familiarity with addition, subtraction, and multiplication of numbers.', icon: '🔢' },
        { title: 'Linear Equations', desc: 'Basic understanding of equations with variables.', icon: '✖️' },
        { title: 'Data Organization', desc: 'Idea of data arranged in rows and columns.', icon: '📊' }
    ],
    cards5W1H: [
        {
            q: "WHAT",
            label: "is a Matrix?",
            icon: "🔍",
            gradFrom: "#0891b2",
            gradTo: "#06b6d4",
            shadow: "rgba(6,182,212,0.35)",
            content: `A matrix is a rectangular arrangement of numbers (or functions) in rows and columns, enclosed in brackets. Each number is called an element. A matrix with $m$ rows and $n$ columns has order $m \\times n$. For example, $\\displaystyle \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ is a $2 \\times 2$ matrix. Matrices are the mathematical equivalent of organised data tables — powerful, compact, and structured!`,
            fact: 'The word "matrix" was coined by James Joseph Sylvester in 1850, from the Latin word meaning "womb" — because a matrix generates determinants!',
        },
        {
            q: "WHO",
            label: "uses Matrices?",
            icon: "👥",
            gradFrom: "#059669",
            gradTo: "#10b981",
            shadow: "rgba(16,185,129,0.35)",
            content: `Everyone from Netflix engineers to NASA scientists! Game developers use matrices for 3D graphics transformations. Data scientists use them for machine learning models. Economists model input-output systems. Cryptographers encode secret messages. Even your phone's GPS uses matrix calculations to find the shortest path. Engineers use them to solve systems of equations in structural analysis.`,
            fact: "Netflix uses matrix factorisation to recommend movies — that's why it seems to know what you want to watch next!",
        },
        {
            q: "WHEN",
            label: "did Matrices begin?",
            icon: "📅",
            gradFrom: "#b45309",
            gradTo: "#f59e0b",
            shadow: "rgba(245,158,11,0.35)",
            content: `Matrices date back to ancient China! The Nine Chapters on Mathematical Art (200 BCE) used rectangular arrays to solve systems of equations. In 1858, Arthur Cayley formally defined matrix algebra. Werner Heisenberg used matrix mechanics to describe quantum physics in 1925. Today, matrices power everything from AI to video games!`,
            fact: "Cayley's matrix theory was so ahead of its time that it took decades for the mathematical community to fully appreciate its power!",
        },
        {
            q: "WHERE",
            label: "do we see Matrices?",
            icon: "🌍",
            gradFrom: "#be185d",
            gradTo: "#ec4899",
            shadow: "rgba(236,72,153,0.35)",
            content: `Matrices are everywhere! Google's PageRank algorithm uses a massive matrix to rank web pages. Image filters (blur, sharpen) apply matrix convolutions to pixel grids. Computer graphics represent 3D rotations, scaling, and translations as $4 \\times 4$ matrices. Economists use Leontief input-output matrices. Even digital music compression uses matrix transforms!`,
            fact: "Every image on your screen is a matrix of pixel values — a 1080p image is a $1920 \\times 1080$ matrix of RGB triplets!",
        },
        {
            q: "WHY",
            label: "should I learn Matrices?",
            icon: "🚀",
            gradFrom: "#7c3aed",
            gradTo: "#a855f7",
            shadow: "rgba(168,85,247,0.35)",
            content: `Matrices are the foundation for linear algebra, which is the most widely applied branch of mathematics. They simplify complex systems of equations into compact notation. Understanding matrices opens doors to machine learning, quantum computing, computer graphics, and data science. They train you to think in terms of transformations and patterns!`,
            fact: "Linear algebra (powered by matrices) is the #1 most important math for AI and machine learning engineering!",
        },
        {
            q: "HOW",
            label: "do Matrices work?",
            icon: "🎯",
            gradFrom: "#0369a1",
            gradTo: "#3b82f6",
            shadow: "rgba(59,130,246,0.35)",
            content: `Start with understanding order (rows × columns) and element notation ($a_{ij}$). Learn the types: row, column, square, diagonal, identity, and zero matrices. Then master operations: addition (element-wise), scalar multiplication, and the dot-product-based matrix multiplication. Finally, explore transpose and inverse — the tools that make matrices truly powerful!`,
            fact: "Matrix multiplication is NOT commutative — $AB \\neq BA$ in general. Order matters because matrices represent transformations!",
        }
    ]
};
