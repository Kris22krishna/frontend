import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Matrices.css";
import "../../MatricesPages.css";
import MathRenderer from "../../../../../MathRenderer";
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

const TERMS = [
  {
    name: "Order of a Matrix",
    color: "#6366f1",
    icon: "📏",
    def: "A matrix with $m$ rows and $n$ columns has order $m \\times n$. The total number of elements is $m \\times n$.",
    examples: ["$2 \\times 3$", "$3 \\times 1$", "$4 \\times 4$"],
    inUse: [
      "In $\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$, the order is $2 \\times 3$.",
      "In $\\begin{bmatrix} 7 \\\\ 8 \\\\ 9 \\end{bmatrix}$, the order is $3 \\times 1$.",
      "In a generic $\\begin{bmatrix} a_{11} & \\dots & a_{14} \\\\ \\vdots & \\ddots & \\vdots \\\\ a_{41} & \\dots & a_{44} \\end{bmatrix}$, the order is $4 \\times 4$."
    ],
    memory: "Rows come first, Columns come second — like RC (Remote Control)!",
  },
  {
    name: "Element",
    color: "#0891b2",
    icon: "🔢",
    def: "Each individual number in a matrix, denoted $a_{ij}$ where $i$ = row number and $j$ = column number.",
    examples: ["$a_{11}$", "$a_{23}$", "$a_{ij}$"],
    inUse: [
      "In $\\begin{bmatrix} 5 & -3 \\\\ 7 & 1 \\end{bmatrix}$, the element $a_{11} = 5$.",
      "In $\\begin{bmatrix} 5 & -3 & 2 \\\\ 7 & 1 & 8 \\end{bmatrix}$, the element $a_{23} = 8$.",
      "In general, $a_{ij}$ is the element in the $i$-th row and $j$-th column."
    ],
    memory:
      'First subscript = Row, Second subscript = Column. Think "RC" again!',
  },
  {
    name: "Row Matrix",
    color: "#f59e0b",
    icon: "➡️",
    def: "A matrix with exactly one row. Its order is $1 \\times n$.",
    examples: [
      "$\\begin{bmatrix} 7 & 3 & -1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\end{bmatrix}$",
    ],
    inUse: [
      "$\\begin{bmatrix} 7 & 3 & -1 \\end{bmatrix}$ is a $1 \\times 3$ row matrix.",
      "$\\begin{bmatrix} 1 & 0 \\end{bmatrix}$ is a $1 \\times 2$ row matrix."
    ],
    memory: "One row goes horizontally across — like a row of chairs!",
  },
  {
    name: "Column Matrix",
    color: "#ec4899",
    icon: "⬇️",
    def: "A matrix with exactly one column. Its order is $m \\times 1$.",
    examples: [
      "$\\begin{bmatrix} 2 \\\\ 5 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 \\\\ 0 \\\\ -3 \\end{bmatrix}$",
    ],
    inUse: [
      "$\\begin{bmatrix} 2 \\\\ 5 \\end{bmatrix}$ is a $2 \\times 1$ column matrix.",
      "$\\begin{bmatrix} 1 \\\\ 0 \\\\ -3 \\end{bmatrix}$ is a $3 \\times 1$ column matrix."
    ],
    memory: "A single column stands tall — like a pillar!",
  },
  {
    name: "Square Matrix",
    color: "#7c3aed",
    icon: "⬜",
    def: "A matrix where the number of rows equals the number of columns (order $n \\times n$).",
    examples: ["$2 \\times 2$", "$3 \\times 3$", "$n \\times n$"],
    inUse: [
      "$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ is a $2 \\times 2$ square matrix.",
      "$\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{bmatrix}$ is a $3 \\times 3$ square matrix.",
      "A matrix with $n$ rows and $n$ columns is a square matrix of order $n$."
    ],
    memory: "Equal sides like a perfect square!",
  },
  {
    name: "Diagonal Matrix",
    color: "#10b981",
    icon: "⚡",
    def: "A square matrix where all non-diagonal elements are zero. Only $a_{ii}$ can be non-zero.",
    examples: [
      "$\\begin{bmatrix} 4 & 0 \\\\ 0 & 7 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 5 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}$",
    ],
    inUse: [
      "A $2 \\times 2$ diagonal matrix. Notice $a_{12}=0$ and $a_{21}=0$.",
      "A $3 \\times 3$ diagonal matrix. All elements off the main diagonal are zero."
    ],
    memory: "Everything off the diagonal is wiped clean to zero!",
  },
  {
    name: "Scalar Matrix",
    color: "#14b8a6",
    icon: "🔷",
    def: "A diagonal matrix in which all diagonal elements are equal to the same scalar $k$.",
    examples: [
      "$\\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$",
      "$\\begin{bmatrix} -2 & 0 & 0 \\\\ 0 & -2 & 0 \\\\ 0 & 0 & -2 \\end{bmatrix}$",
    ],
    inUse: [
      "Every scalar matrix is diagonal because all off-diagonal elements are zero.",
      "$I_n$ is a scalar matrix with scalar $k = 1$."
    ],
    memory: "Scalar matrix = diagonal matrix with the same number repeated on the main diagonal.",
  },
  {
    name: "Identity Matrix",
    color: "#ef4444",
    icon: "🆔",
    def: "A diagonal matrix where every diagonal element is 1. Denoted $I_n$. It is the multiplicative identity: $AI = IA = A$.",
    examples: [
      "$I_2 = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$",
      "$I_3 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$",
    ],
    inUse: [
      "$I_2$ is the $2 \\times 2$ identity matrix.",
      "$I_3$ is the $3 \\times 3$ identity matrix. Multiplying any matrix by $I$ gives back the same matrix!"
    ],
    memory:
      'The identity matrix is the "1" of matrix world — it changes nothing!',
  },
  {
    name: "Zero Matrix",
    color: "#06b6d4",
    icon: "0️⃣",
    def: "A matrix in which every element is 0. Denoted $O$. It is the additive identity: $A + O = A$.",
    examples: ["$O_{2 \\times 2} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$", "$O_{1 \\times 3} = \\begin{bmatrix} 0 & 0 & 0 \\end{bmatrix}$"],
    inUse: [
      "Adding the zero matrix to any matrix gives back the same matrix!",
      "$O$ can be of any order, as long as all elements are zero."
    ],
    memory:
      'The zero matrix is the "0" of matrix world — adding it changes nothing!',
  },
  {
    name: "Transpose",
    color: "#6366f1",
    icon: "🔄",
    def: "Obtained by interchanging rows and columns. Denoted $A^T$ or $A'$. If $A$ is $m \\times n$, then $A^T$ is $n \\times m$.",
    examples: ["$A^T$", "$(A^T)^T = A$"],
    inUse: [
      "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ then $A^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix}$.",
      "Transposing a matrix twice gives back the original matrix!"
    ],
    memory:
      "Rows become columns and columns become rows — like flipping over the diagonal!",
  },
];

const SIX_RULES = [
  {
    num: 1,
    title: "Addition Condition",
    rule: "Two matrices can only be added or subtracted if they have the same order.",
    emoji: "➕",
    color: "#6366f1",
    detail:
      "Matrix addition is element-wise: $(A+B)_{ij} = a_{ij} + b_{ij}$. The matrices must be the same size — you can't add a $2 \\times 3$ to a $3 \\times 2$!",
    examples: [
      "$A_{2 \\times 3} + B_{2 \\times 3}$ ✓",
      "$A_{2 \\times 3} + B_{3 \\times 2}$ ✗",
    ],
    tip: "Check orders first — if they don't match, stop immediately!",
  },
  {
    num: 2,
    title: "Multiplication Rule",
    rule: "Matrix multiplication $AB$ is defined only when columns of $A$ = rows of $B$.",
    emoji: "✖️",
    color: "#0891b2",
    detail:
      "$A_{m \\times n} \\cdot B_{n \\times p} = C_{m \\times p}$. The \"inner dimensions\" must match. The result has the \"outer dimensions\".",
    examples: [
      "$A_{2 \\times 3} \\cdot B_{3 \\times 4} = C_{2 \\times 4}$ ✓",
      "$A_{2 \\times 3} \\cdot B_{2 \\times 3}$ ✗ ($3 \\neq 2$)",
    ],
    tip: "Inner dimensions must match, outer dimensions give the result size!",
  },
  {
    num: 3,
    title: "Non-Commutativity",
    rule: "Matrix multiplication is NOT commutative: $AB \\neq BA$ in general.",
    emoji: "🔀",
    color: "#f59e0b",
    detail:
      "Unlike numbers where $3 \\times 5 = 5 \\times 3$, matrices care about order. Even if both $AB$ and $BA$ are defined, they usually give different results!",
    examples: [
      "$AB \\neq BA$ in general",
      "Even $A_{2 \\times 2} \\cdot B_{2 \\times 2} \\neq B \\cdot A$ usually",
    ],
    tip: "Order matters! Always keep the sequence exactly as given.",
  },
  {
    num: 4,
    title: "Identity Property",
    rule: "The identity matrix $I$ is the multiplicative identity: $AI = IA = A$.",
    emoji: "🆔",
    color: "#10b981",
    detail:
      "Just like multiplying a number by 1 gives the same number, multiplying any matrix by the identity matrix gives back the same matrix.",
    examples: ["$A \\cdot I = A$", "$I \\cdot A = A$"],
    tip: 'The identity matrix is the "1" of matrix multiplication!',
  },
  {
    num: 5,
    title: "Transpose of Product",
    rule: "The transpose of a product reverses the order: $(AB)^T = B^T A^T$.",
    emoji: "🔄",
    color: "#ec4899",
    detail:
      'This is called the "shoe-sock" rule. When you put on socks then shoes, you take off shoes first, then socks — reversed order!',
    examples: ["$(AB)^T = B^T A^T$", "$(ABC)^T = C^T B^T A^T$"],
    tip: "Reverse the order and transpose each factor individually!",
  },
  {
    num: 6,
    title: "Inverse Matrix",
    rule: "The inverse of a square matrix $A$ is a matrix $A^{-1}$ such that $AA^{-1} = A^{-1}A = I$.",
    emoji: "🔓",
    color: "#7c3aed",
    detail:
      "An inverse matrix undoes the action of $A$. When you multiply a matrix by its inverse from either side, you get the identity matrix.",
    examples: [
      "$AA^{-1} = I$",
      "$A^{-1}A = I$",
    ],
    tip: "Think of the inverse as the matrix version of a reciprocal: it brings you back to identity.",
  },
];

const VOCAB_QUIZ = [
  {
    question: "What is the order of a matrix with 3 rows and 5 columns?",
    options: ["$5 \\times 3$", "$3 \\times 5$", "$15$", "$8$"],
    correct: 1,
    explanation:
      "Order = rows × columns. 3 rows and 5 columns gives order $3 \\times 5$.",
  },
  {
    question: "Which matrix has all non-diagonal elements as zero?",
    options: ["Zero Matrix", "Diagonal Matrix", "Row Matrix", "Column Matrix"],
    correct: 1,
    explanation:
      "A diagonal matrix has non-zero entries only on the main diagonal; everything else is zero.",
  },
  {
    question:
      "For $AB$ to be defined, the number of ___ of $A$ must equal the number of ___ of $B$.",
    options: [
      "rows, columns",
      "columns, rows",
      "rows, rows",
      "columns, columns",
    ],
    correct: 1,
    explanation:
      "Columns of $A$ must equal rows of $B$ for the multiplication to be defined.",
  },
  {
    question: "What is $(AB)^T$ equal to?",
    options: ["$A^T B^T$", "$B^T A^T$", "$(BA)^T$", "$A^T + B^T$"],
    correct: 1,
    explanation:
      "The shoe-sock rule: $(AB)^T = B^T A^T$. Reverse order, transpose each.",
  },
  {
    question: "The identity matrix $I_3$ has order:",
    options: [
      "$1 \\times 3$",
      "$3 \\times 3$",
      "$3 \\times 1$",
      "$1 \\times 1$",
    ],
    correct: 1,
    explanation: "$I_n$ is always $n \\times n$. So $I_3$ is $3 \\times 3$.",
  },
  {
    question: "Is matrix multiplication commutative?",
    options: [
      "Yes, always",
      "No, $AB \\neq BA$ in general",
      "Only for square matrices",
      "Only for diagonal matrices",
    ],
    correct: 1,
    explanation:
      "Matrix multiplication is NOT commutative. $AB \\neq BA$ in general.",
  },
  {
    question: "A matrix is invertible only if:",
    options: [
      "It is diagonal",
      "It is square and $|A| \\neq 0$",
      "It has no zero elements",
      "It has equal rows and columns count",
    ],
    correct: 1,
    explanation:
      "A square matrix with non-zero determinant is invertible (non-singular).",
  },
  {
    question: "An element $a_{23}$ is in which position?",
    options: [
      "Row 3, Column 2",
      "Row 2, Column 3",
      "Row 2, Column 2",
      "Row 3, Column 3",
    ],
    correct: 1,
    explanation:
      "$a_{ij}$: first subscript = row, second = column. So $a_{23}$ is row 2, column 3.",
  },
  {
    question: "$A + B$ is defined only when:",
    options: [
      "$A$ is square",
      "$A$ and $B$ have the same order",
      "Both are diagonal",
      "$B$ is identity",
    ],
    correct: 1,
    explanation:
      "Matrix addition requires both matrices to have the exact same order.",
  },
  {
    question: "The zero matrix acts as the ___ for matrix addition.",
    options: [
      "Multiplicative identity",
      "Additive identity",
      "Inverse",
      "Transpose",
    ],
    correct: 1,
    explanation:
      "$A + O = A$. The zero matrix is the additive identity — adding it changes nothing.",
  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function MatricesTerminology() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("terms");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
  const [activeExampleIdx, setActiveExampleIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizTotalScore, setQuizTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const quizPayload = React.useRef([]);
  const isFinishingRef = React.useRef(false);
  const { startSession, logAnswer, finishSession } = useSessionLogger();

  useEffect(() => {
    setActiveExampleIdx(0);
  }, [selectedIdx]);

  const activeTerm = TERMS[selectedIdx];
  const activeRule = SIX_RULES[selectedRuleIdx];
  const activeQuiz = VOCAB_QUIZ[quizIdx];

  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizAnswered(false);
    setQuizTotalScore(0);
    setQuizFinished(false);
    quizPayload.current = [];
    isFinishingRef.current = false;
    startSession({ nodeId: NODE_IDS.g12MathMatricesTerminologyQuiz, sessionType: 'practice' });
  };

  const handleQuizSelect = (optIdx) => {
    if (quizAnswered) return;
    setQuizSelected(optIdx);
    setQuizAnswered(true);
    const correct = optIdx === activeQuiz.correct;
    if (correct) {
      setQuizTotalScore((s) => s + 1);
    }
        
    const answerData = {
      question_index: quizIdx + 1,
      answer_json: { selected: optIdx, text: activeQuiz.options[optIdx] },
      is_correct: correct ? 1.0 : 0.0,
      marks_awarded: correct ? 1 : 0,
      marks_possible: 1
    };
    quizPayload.current.push(answerData);

    logAnswer({
      questionIndex: answerData.question_index,
      answerJson: answerData.answer_json,
      isCorrect: answerData.is_correct
    });
  };

  const nextQuiz = () => {
    if (quizIdx + 1 < VOCAB_QUIZ.length) {
      setQuizIdx((i) => i + 1);
      setQuizSelected(null);
      setQuizAnswered(false);
    } else {
      if (isFinishingRef.current) return;
      isFinishingRef.current = true;
      setQuizFinished(true);
      finishSession({
        totalQuestions: VOCAB_QUIZ.length,
        questionsAnswered: quizIdx + 1,
        answersPayload: quizPayload.current
      });
    }
  };

  return (
    <div className="mat-terminology-page">
      <style>{`
                .mat-details-window-anim { animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
                .mat-term-btn-mini { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); text-align: left; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
                .mat-term-btn-mini::before { content: ''; position: absolute; inset: 0; background: #fff; z-index: 0; transition: opacity 0.2s; opacity: 1; }
                .mat-term-btn-mini:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.08); }
                .mat-term-btn-mini:hover::before { opacity: 0.9; }
                .mat-term-btn-mini.active { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); z-index: 2; }
                .mat-term-btn-mini.active::before { opacity: 0; }
                .mat-term-btn-mini > * { position: relative; z-index: 1; }
                .mat-tab { display: flex; align-items: center; gap: 8px; padding: 12px 26px; border-radius: 100px; border: 2px solid #e2e8f0; background: #f8fafc; color: #64748b; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.25s ease; }
                .mat-tab:hover { border-color: #0891b2; color: #0891b2; background: #f0fdfa; transform: translateY(-2px); }
                .mat-tab.active { background: linear-gradient(135deg, #0891b2, #06b6d4); border-color: transparent; color: #fff !important; box-shadow: 0 4px 16px rgba(8, 145, 178, 0.35); transform: translateY(-2px); }
                @media (max-width: 1024px) { .mat-lexicon-grid { grid-template-columns: 1fr !important; } .mat-selector-container { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

      <nav className="mat-intro-nav">
        <button
          className="mat-intro-nav-back"
          onClick={() => navigate("/senior/grade/12/matrices")}
        >
          ← Back to Matrices
        </button>
        <div className="mat-intro-nav-links">
          <button
            className="mat-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/matrices/introduction")}
          >
            🌟 Introduction
          </button>
          <button
            className="mat-intro-nav-link mat-intro-nav-link--active"
            onClick={() => navigate("/senior/grade/12/matrices/terminology")}
          >
            📖 Terminology
          </button>
          <button
            className="mat-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/matrices/skills")}
          >
            🎯 Skills
          </button>
          <button
            className="mat-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/matrices/connectomics")}
          >
            🌐 Connectomics
          </button>
          <button
            className="mat-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/matrices/exam-edge")}
          >
            ⚔️ Exam Edge
          </button>
        </div>
      </nav>

      <div
        className="mat-lexicon-container"
        style={{ maxWidth: 1100, margin: "40px auto 20px", padding: "0 24px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          <h1
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "2.8rem",
              fontWeight: 900,
              color: "var(--mat-text)",
              margin: "0 0 8px",
            }}
          >
            Matrices{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--mat-teal), var(--mat-indigo))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Vocabulary
            </span>
          </h1>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--mat-muted)",
              letterSpacing: 0.5,
            }}
          >
            {activeTab === "quiz"
              ? "Test your knowledge with 10 interactive questions!"
              : `Select any ${activeTab === "terms" ? "term" : "rule"} below to explore details.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <button
            className={`mat-tab ${activeTab === "terms" ? "active" : ""}`}
            onClick={() => setActiveTab("terms")}
          >
            📚 Terminology
          </button>
          <button
            className={`mat-tab ${activeTab === "rules" ? "active" : ""}`}
            onClick={() => setActiveTab("rules")}
          >
            📏 6 Golden Rules
          </button>
          <button
            className={`mat-tab ${activeTab === "quiz" ? "active" : ""}`}
            onClick={() => {
              if (activeTab !== "quiz") {
                setActiveTab("quiz");
                resetQuiz();
              }
            }}
          >
            🧪 Test Prep
          </button>
        </div>

        {activeTab !== "quiz" ? (
          <div
            className="mat-lexicon-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(300px, 360px) 1fr",
              gap: 16,
              alignItems: "start",
            }}
          >
            <aside
              className="mat-selector-container"
              style={{
                background: "rgba(255,255,255,0.7)",
                padding: "14px",
                borderRadius: 20,
                border: "1px solid rgba(0,0,0,0.05)",
                display: "grid",
                gridTemplateColumns: activeTab === "terms" ? "1fr 1fr" : "1fr",
                gap: 10,
                backdropFilter: "blur(10px)",
              }}
            >
              {activeTab === "terms"
                ? TERMS.map((term, i) => {
                  const isActive = selectedIdx === i;
                  return (
                    <button
                      key={i}
                      className={`mat-term-btn-mini ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedIdx(i)}
                      style={{
                        background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`,
                        borderColor: isActive
                          ? term.color
                          : `${term.color}20`,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: isActive ? term.color : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          boxShadow: isActive
                            ? "none"
                            : "0 2px 5px rgba(0,0,0,0.05)",
                          transition: "all 0.2s",
                        }}
                      >
                        {term.icon}
                      </div>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: 16,
                          color: isActive ? "#fff" : "var(--mat-text)",
                        }}
                      >
                        {term.name}
                      </span>
                      {isActive && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(135deg, ${term.color}, ${term.color}dd)`,
                            zIndex: 0,
                          }}
                        />
                      )}
                    </button>
                  );
                })
                : SIX_RULES.map((rule, i) => {
                  const isActive = selectedRuleIdx === i;
                  return (
                    <button
                      key={i}
                      className={`mat-term-btn-mini ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedRuleIdx(i)}
                      style={{
                        background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`,
                        borderColor: isActive
                          ? rule.color
                          : `${rule.color}20`,
                        padding: "12px 16px",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: isActive ? rule.color : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          color: isActive ? "#fff" : rule.color,
                          fontWeight: 900,
                        }}
                      >
                        {rule.num}
                      </div>
                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 16,
                            color: isActive ? "#fff" : "var(--mat-text)",
                            lineHeight: 1,
                          }}
                        >
                          Rule {rule.num}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: isActive
                              ? "rgba(255,255,255,0.8)"
                              : "var(--mat-muted)",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                            marginTop: 4,
                          }}
                        >
                          {rule.title}
                        </span>
                      </div>
                      {isActive && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`,
                            zIndex: 0,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
            </aside>

            <main
              className="mat-details-window-anim"
              key={activeTab === "terms" ? selectedIdx : selectedRuleIdx}
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "20px 28px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.03)",
                border: `2px solid ${(activeTab === "terms" ? activeTerm : activeRule).color}15`,
                minHeight: 330,
              }}
            >
              {activeTab === "terms" ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `${activeTerm.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      {activeTerm.icon}
                    </div>
                    <h2
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 28,
                        fontWeight: 900,
                        color: activeTerm.color,
                        margin: 0,
                      }}
                    >
                      {activeTerm.name}
                    </h2>
                  </div>
                  <p
                    style={{
                      fontSize: 17,
                      color: "var(--mat-text)",
                      lineHeight: 1.6,
                      margin: "0 0 24px",
                    }}
                  >
                    <MathRenderer text={activeTerm.def} />
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 20,
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontSize: 11,
                          letterSpacing: 1,
                          color: activeTerm.color,
                          marginBottom: 10,
                        }}
                      >
                        Examples
                      </h4>
                      <div
                        style={{
                          background: `${activeTerm.color}05`,
                          padding: 16,
                          borderRadius: 16,
                          border: `1px solid ${activeTerm.color}10`,
                        }}
                      >
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                        >
                          {activeTerm.examples.map((ex, j) => {
                            const isExActive = activeExampleIdx === j;
                            return (
                              <button
                                key={j}
                                onClick={() => setActiveExampleIdx(j)}
                                style={{
                                  background: isExActive ? activeTerm.color : "#fff",
                                  border: `1px solid ${isExActive ? activeTerm.color : activeTerm.color + "20"}`,
                                  color: isExActive ? "#fff" : activeTerm.color,
                                  padding: "4px 10px",
                                  borderRadius: 8,
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                  fontFamily: "inherit",
                                  fontSize: "inherit",
                                  boxShadow: isExActive ? `0 4px 10px ${activeTerm.color}30` : "none",
                                  transform: isExActive ? "translateY(-1px)" : "none",
                                }}
                              >
                                <MathRenderer text={ex} />
                              </button>
                            );
                          })}
                        </div>
                        <div
                          style={{
                            marginTop: 12,
                            fontSize: 13,
                            color: "var(--mat-muted)",
                            fontStyle: "italic",
                          }}
                        >
                          <MathRenderer text={Array.isArray(activeTerm.inUse) ? activeTerm.inUse[activeExampleIdx] || activeTerm.inUse[0] : activeTerm.inUse} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontSize: 11,
                          letterSpacing: 1,
                          color: "var(--mat-indigo)",
                          marginBottom: 10,
                        }}
                      >
                        Master Hint
                      </h4>
                      <div
                        style={{
                          background: "rgba(108,99,255,0.05)",
                          padding: 16,
                          borderRadius: 16,
                          border: "1px solid rgba(108,99,255,0.1)",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 15,
                            color: "var(--mat-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "var(--mat-indigo)",
                            }}
                          >
                            💡 Hint:{" "}
                          </span>
                          {activeTerm.memory}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `${activeRule.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        color: activeRule.color,
                        fontWeight: 900,
                      }}
                    >
                      {activeRule.emoji}
                    </div>
                    <h2
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 28,
                        fontWeight: 900,
                        color: activeRule.color,
                        margin: 0,
                      }}
                    >
                      Rule {activeRule.num}: {activeRule.title}
                    </h2>
                  </div>
                  <div
                    style={{
                      background: `${activeRule.color}08`,
                      padding: "16px 20px",
                      borderRadius: 12,
                      borderLeft: `5px solid ${activeRule.color}`,
                      marginBottom: 20,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: activeRule.color,
                        margin: 0,
                      }}
                    >
                      <MathRenderer text={activeRule.rule} />
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: 17,
                      color: "var(--mat-text)",
                      lineHeight: 1.6,
                      margin: "0 0 24px",
                    }}
                  >
                    <MathRenderer text={activeRule.detail} />
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 20,
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontSize: 11,
                          letterSpacing: 1,
                          color: activeRule.color,
                          marginBottom: 10,
                        }}
                      >
                        Practical Examples
                      </h4>
                      <div
                        style={{
                          background: "#f8fafc",
                          padding: 16,
                          borderRadius: 16,
                          border: "1px solid rgba(0,0,0,0.04)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                          }}
                        >
                          {activeRule.examples.map((ex, j) => (
                            <div
                              key={j}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <div
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: activeRule.color,
                                }}
                              />
                              <span
                                style={{
                                  fontSize: 15,
                                  background: "#fff",
                                  padding: "3px 8px",
                                  borderRadius: 6,
                                  color: "var(--mat-text)",
                                  fontWeight: 600,
                                }}
                              >
                                <MathRenderer text={ex} />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontSize: 11,
                          letterSpacing: 1,
                          color: "var(--mat-teal)",
                          marginBottom: 10,
                        }}
                      >
                        Survival Tip
                      </h4>
                      <div
                        style={{
                          background: "rgba(20,184,166,0.05)",
                          padding: 16,
                          borderRadius: 16,
                          border: "1px solid rgba(20,184,166,0.1)",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 15,
                            color: "var(--mat-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "var(--mat-teal)",
                            }}
                          >
                            🛡️ Pro Tip:{" "}
                          </span>
                          {activeRule.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </main>
          </div>
        ) : (
          <div
            className="mat-details-window-anim"
            style={{
              maxWidth: 800,
              margin: "0 auto",
              background: "#fff",
              borderRadius: 24,
              padding: "32px 40px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            {!quizFinished ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 28,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "var(--mat-blue)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Question {quizIdx + 1} of 10
                    </div>
                    <h3
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 24,
                        fontWeight: 800,
                        color: "var(--mat-text)",
                        margin: 0,
                      }}
                    >
                      Vocabulary Check
                    </h3>
                  </div>
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      border: "5px solid #f1f5f9",
                      borderTopColor: "var(--mat-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      fontWeight: 900,
                      color: "var(--mat-blue)",
                    }}
                  >
                    {quizIdx + 1}/10
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--mat-text)",
                    lineHeight: 1.5,
                    marginBottom: 28,
                  }}
                >
                  <MathRenderer text={activeQuiz.question} />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 28,
                  }}
                >
                  {activeQuiz.options.map((opt, oi) => {
                    let bCol = "rgba(0,0,0,0.05)";
                    let bgCol = "#fff";
                    let txtCol = "var(--mat-text)";
                    if (quizAnswered) {
                      if (oi === activeQuiz.correct) {
                        bCol = "var(--mat-teal)";
                        bgCol = "rgba(20,184,166,0.05)";
                        txtCol = "var(--mat-teal)";
                      } else if (oi === quizSelected) {
                        bCol = "var(--mat-red)";
                        bgCol = "rgba(239,68,68,0.05)";
                        txtCol = "var(--mat-red)";
                      }
                    } else if (quizSelected === oi) {
                      bCol = "var(--mat-blue)";
                      bgCol = "rgba(59,130,246,0.05)";
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => handleQuizSelect(oi)}
                        disabled={quizAnswered}
                        style={{
                          padding: "16px 24px",
                          borderRadius: 14,
                          border: `3px solid ${bCol}`,
                          background: bgCol,
                          color: txtCol,
                          fontWeight: quizSelected === oi ? 800 : 600,
                          fontSize: 17,
                          cursor: quizAnswered ? "default" : "pointer",
                          transition: "all 0.2s",
                          textAlign: "left",
                        }}
                      >
                        <MathRenderer text={opt} />
                      </button>
                    );
                  })}
                </div>
                {quizAnswered && (
                  <div
                    style={{
                      background: "rgba(59,130,246,0.05)",
                      padding: 16,
                      borderRadius: 12,
                      border: "1px solid rgba(59,130,246,0.2)",
                      marginBottom: 24,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        color: "var(--mat-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong style={{ color: "var(--mat-blue)" }}>
                        Solution:{" "}
                      </strong>
                      <MathRenderer text={activeQuiz.explanation} />
                    </p>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={nextQuiz}
                    disabled={!quizAnswered}
                    className="mat-btn-primary"
                    style={{
                      padding: "12px 40px",
                      background: quizAnswered ? "var(--mat-blue)" : "#f1f5f9",
                      color: quizAnswered ? "#fff" : "#94a3b8",
                      borderRadius: 100,
                      border: "none",
                      cursor: quizAnswered ? "pointer" : "not-allowed",
                    }}
                  >
                    {quizIdx + 1 === 10 ? "Finish Test" : "Next Question →"}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>
                  {quizTotalScore >= 8
                    ? "🏆"
                    : quizTotalScore >= 5
                      ? "🌟"
                      : "💪"}
                </div>
                <h2
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 32,
                    fontWeight: 900,
                    marginBottom: 8,
                  }}
                >
                  Test Complete!
                </h2>
                <p
                  style={{
                    color: "var(--mat-muted)",
                    fontSize: 18,
                    marginBottom: 32,
                  }}
                >
                  Your Vocabulary Score:{" "}
                  <span style={{ color: "var(--mat-blue)", fontWeight: 900 }}>
                    {quizTotalScore} / 10
                  </span>
                </p>
                <div
                  style={{ display: "flex", gap: 12, justifyContent: "center" }}
                >
                  <button className="mat-btn-primary" onClick={resetQuiz}>
                    Try Again
                  </button>
                  <button
                    className="mat-btn-secondary"
                    onClick={() => navigate("/senior/grade/12/matrices/skills")}
                  >
                    Go to Skills 🎯
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button
            className="mat-btn-primary"
            onClick={() => navigate("/senior/grade/12/matrices/skills")}
            style={{ padding: "10px 28px", fontSize: 13 }}
          >
            Ready to Solve! 🎯
          </button>
        </div>
      </div>
    </div>
  );
}
