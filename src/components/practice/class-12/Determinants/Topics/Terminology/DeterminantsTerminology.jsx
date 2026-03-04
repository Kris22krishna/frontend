import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Determinants.css";
import MathRenderer from "../../../../../MathRenderer";

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

const TERMS = [
  {
    name: "Determinant",
    color: "#6366f1",
    icon: "🔢",
    def: "A scalar value associated with a square matrix. For a $2 \\times 2$ matrix $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, the determinant is $ad - bc$.",
    examples: [
      "$|A|$",
      "$\\det(A)$",
      "$\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = -2$",
    ],
    inUse:
      "$\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 1 \\times 4 - 2 \\times 3 = -2$.",
    memory: "Main diagonal minus cross diagonal for 2×2!",
  },
  {
    name: "Singular Matrix",
    color: "#ef4444",
    icon: "🚫",
    def: "A square matrix whose determinant is zero. Singular matrices are NOT invertible.",
    examples: [
      "$|A| = 0$",
      "$\\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$",
    ],
    inUse:
      "$\\begin{vmatrix} 2 & 4 \\\\ 1 & 2 \\end{vmatrix} = 4 - 4 = 0$, so the matrix is singular.",
    memory: "Zero determinant = singular = no inverse!",
  },
  {
    name: "Non-Singular Matrix",
    color: "#10b981",
    icon: "✅",
    def: "A square matrix whose determinant is NOT zero. Non-singular matrices are invertible.",
    examples: [
      "$|A| \\neq 0$",
      "$\\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$",
    ],
    inUse:
      "$\\begin{vmatrix} 3 & 1 \\\\ 2 & 4 \\end{vmatrix} = 12 - 2 = 10 \\neq 0$, so the matrix is non-singular.",
    memory: "Non-zero determinant = non-singular = inverse exists!",
  },
  {
    name: "Minor",
    color: "#0891b2",
    icon: "✂️",
    def: "The minor $M_{ij}$ of element $a_{ij}$ is the determinant of the submatrix obtained by deleting row $i$ and column $j$.",
    examples: ["$M_{11}$", "$M_{23}$"],
    inUse:
      "In $\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{bmatrix}$, $M_{11} = \\begin{vmatrix} 5 & 6 \\\\ 8 & 9 \\end{vmatrix} = 45 - 48 = -3$.",
    memory:
      "Delete the row and column of the element, then find the determinant of what remains!",
  },
  {
    name: "Cofactor",
    color: "#f59e0b",
    icon: "±",
    def: "The cofactor $A_{ij} = (-1)^{i+j} M_{ij}$, where $M_{ij}$ is the minor. It applies a sign based on position.",
    examples: [
      "$A_{11} = +M_{11}$",
      "$A_{12} = -M_{12}$",
      "$A_{21} = -M_{21}$",
    ],
    inUse:
      "Sign pattern for $3 \\times 3$: $\\begin{bmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{bmatrix}$.",
    memory: "Checkerboard sign pattern starting with + at top-left!",
  },
  {
    name: "Adjoint",
    color: "#7c3aed",
    icon: "🔄",
    def: "The adjoint (or adjugate) of a matrix $A$ is the transpose of its cofactor matrix. Used to compute inverse: $A^{-1} = \\frac{1}{|A|} \\text{adj}(A)$.",
    examples: [
      "$\\text{adj}(A) = C^T$",
      "$A \\cdot \\text{adj}(A) = |A| \\cdot I$",
    ],
    inUse:
      "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $\\text{adj}(A) = \\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$.",
    memory: "Cofactor matrix → Transpose → Adjoint!",
  },
  {
    name: "Consistent System",
    color: "#059669",
    icon: "✓",
    def: "A system of linear equations that has at least one solution. If $|A| \\neq 0$, the system has a unique solution.",
    examples: [
      "Unique solution: $|A| \\neq 0$",
      "Infinite solutions: $|A| = 0$ but $(\\text{adj } A) \\cdot B = O$",
    ],
    inUse: "$x + y = 3, 2x + y = 5$ has unique solution $(2, 1)$.",
    memory: "Consistent means solutions exist — either one or infinitely many!",
  },
  {
    name: "Inconsistent System",
    color: "#ec4899",
    icon: "✗",
    def: "A system of linear equations that has NO solution. This happens when $|A| = 0$ and $(\\text{adj } A) \\cdot B \\neq O$.",
    examples: ["$x + y = 2, 2x + 2y = 5$ → no solution"],
    inUse: "Parallel lines never intersect — the system is inconsistent.",
    memory:
      "Inconsistent = no solution exists. The equations contradict each other!",
  },
];

const SIX_RULES = [
  {
    num: 1,
    title: "Expansion Along Row/Column",
    rule: "A determinant can be expanded along any row or column, and the result is always the same.",
    emoji: "↔️",
    color: "#6366f1",
    detail:
      "Choose the row or column with the most zeros for easiest computation. Expand: $|A| = \\sum_{j=1}^{n} a_{ij} A_{ij}$ along row $i$.",
    examples: [
      "Expand along $R_1$: $|A| = a_{11}A_{11} + a_{12}A_{12} + a_{13}A_{13}$",
      "Choose the row/column with more zeros!",
    ],
    tip: "Pick the row or column with the most zeros — saves calculation!",
  },
  {
    num: 2,
    title: "Scalar Multiplication",
    rule: "If every element of a row (or column) is multiplied by $k$, the determinant is multiplied by $k$.",
    emoji: "✖️",
    color: "#0891b2",
    detail:
      "For an $n \\times n$ matrix: $|kA| = k^n |A|$. One row × $k$ means $|A_{\\text{new}}| = k|A|$, but scaling the full matrix raises $k$ to the $n$th power.",
    examples: [
      "$|kA| = k^n|A|$ for $n \\times n$",
      "One row scaled: $|A| \\to k|A|$",
    ],
    tip: "Remember: scaling the whole matrix raises k to the power of n!",
  },
  {
    num: 3,
    title: "Determinant of Product",
    rule: "$|AB| = |A| \\cdot |B|$. The determinant of a product equals the product of determinants.",
    emoji: "🔗",
    color: "#f59e0b",
    detail:
      "This beautiful property makes computations much simpler. Instead of multiplying matrices first, you can find individual determinants and multiply them.",
    examples: ["$|AB| = |A||B|$", "If $|A| = 3, |B| = 2$, then $|AB| = 6$"],
    tip: "Product of determinants = determinant of product. Simple and powerful!",
  },
  {
    num: 4,
    title: "Identical Rows/Columns",
    rule: "If two rows (or columns) of a matrix are identical, its determinant is zero.",
    emoji: "=",
    color: "#10b981",
    detail:
      "This is because swapping identical rows changes the sign but not the matrix, so $|A| = -|A|$, which means $|A| = 0$.",
    examples: [
      "$\\begin{vmatrix} 1 & 2 \\\\ 1 & 2 \\end{vmatrix} = 0$",
      "Two equal rows → $|A| = 0$",
    ],
    tip: "Spot identical rows/columns immediately — determinant is 0, no calculation needed!",
  },
  {
    num: 5,
    title: "Row/Column Operations",
    rule: "Adding a scalar multiple of one row to another does NOT change the determinant.",
    emoji: "🔄",
    color: "#ec4899",
    detail:
      "$R_i \\to R_i + kR_j$ does not change $|A|$. But swapping two rows changes the sign: $R_i \\leftrightarrow R_j$ gives $-|A|$.",
    examples: [
      "$R_1 \\to R_1 + 3R_2$: determinant unchanged",
      "$R_1 \\leftrightarrow R_2$: determinant changes sign",
    ],
    tip: "Add multiples freely, but remember swapping flips the sign!",
  },
  {
    num: 6,
    title: "Invertibility Test",
    rule: "$A^{-1}$ exists if and only if $|A| \\neq 0$.",
    emoji: "🔓",
    color: "#7c3aed",
    detail:
      "The inverse formula is $A^{-1} = \\frac{1}{|A|} \\text{adj}(A)$. Division by zero is impossible, hence $|A| = 0$ means no inverse.",
    examples: [
      "$|A| = 5 \\Rightarrow A^{-1}$ exists",
      "$|A| = 0 \\Rightarrow$ singular (no inverse)",
    ],
    tip: "Always check the determinant FIRST before attempting to find an inverse!",
  },
];

const VOCAB_QUIZ = [
  {
    question:
      "What is the determinant of a $2 \\times 2$ matrix $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$?",
    options: ["$ab - cd$", "$ad - bc$", "$ac - bd$", "$a + d - b - c$"],
    correct: 1,
    explanation:
      "For a $2 \\times 2$ matrix, $|A| = ad - bc$ (main diagonal minus cross diagonal).",
  },
  {
    question: "A singular matrix has determinant equal to:",
    options: ["1", "−1", "0", "Any non-zero value"],
    correct: 2,
    explanation: "Singular = non-invertible = determinant is zero.",
  },
  {
    question: "The cofactor $A_{ij}$ includes which sign factor?",
    options: [
      "$(-1)^{i \\cdot j}$",
      "$(-1)^{i+j}$",
      "$(-1)^{i-j}$",
      "Always positive",
    ],
    correct: 1,
    explanation:
      "Cofactor sign is $(-1)^{i+j}$, creating a checkerboard pattern.",
  },
  {
    question: "If $|A| = 3$ and $|B| = 4$, then $|AB| = ?$",
    options: ["7", "12", "1", "−12"],
    correct: 1,
    explanation: "$|AB| = |A| \\cdot |B| = 3 \\times 4 = 12$.",
  },
  {
    question: "The adjoint of a matrix is the ___ of its cofactor matrix.",
    options: ["Inverse", "Negative", "Transpose", "Determinant"],
    correct: 2,
    explanation: "Adjoint = transpose of the cofactor matrix.",
  },
  {
    question: "If two rows of a matrix are identical, its determinant is:",
    options: ["1", "−1", "0", "Undefined"],
    correct: 2,
    explanation: "Identical rows always give determinant = 0.",
  },
  {
    question: "For a $3 \\times 3$ matrix, $|kA| = ?$",
    options: ["$k|A|$", "$k^2|A|$", "$k^3|A|$", "$3k|A|$"],
    correct: 2,
    explanation:
      "$|kA| = k^n|A|$ where $n$ is the order. For $3 \\times 3$, $|kA| = k^3|A|$.",
  },
  {
    question: "A consistent system of equations has:",
    options: [
      "No solution",
      "At least one solution",
      "Exactly two solutions",
      "Infinite solutions only",
    ],
    correct: 1,
    explanation:
      "Consistent means at least one solution exists (could be unique or infinite).",
  },
  {
    question: "The formula for inverse using adjoint is:",
    options: [
      "$A^{-1} = |A| \\cdot \\text{adj}(A)$",
      "$A^{-1} = \\frac{1}{|A|} \\text{adj}(A)$",
      "$A^{-1} = \\text{adj}(A)$",
      "$A^{-1} = \\frac{\\text{adj}(A)}{A}$",
    ],
    correct: 1,
    explanation:
      "$A^{-1} = \\frac{1}{|A|} \\text{adj}(A)$, provided $|A| \\neq 0$.",
  },
  {
    question: "Swapping two rows of a determinant:",
    options: [
      "Doubles it",
      "Does not change it",
      "Changes its sign",
      "Makes it zero",
    ],
    correct: 2,
    explanation:
      "Swapping two rows (or columns) changes the sign of the determinant.",
  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function DeterminantsTerminology() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("terms");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizTotalScore, setQuizTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeTerm = TERMS[selectedIdx];
  const activeRule = SIX_RULES[selectedRuleIdx];
  const activeQuiz = VOCAB_QUIZ[quizIdx];

  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizAnswered(false);
    setQuizTotalScore(0);
    setQuizFinished(false);
  };

  const handleQuizSelect = (optIdx) => {
    if (quizAnswered) return;
    setQuizSelected(optIdx);
    setQuizAnswered(true);
    if (optIdx === activeQuiz.correct) setQuizTotalScore((s) => s + 1);
  };

  const nextQuiz = () => {
    if (quizIdx + 1 < VOCAB_QUIZ.length) {
      setQuizIdx((i) => i + 1);
      setQuizSelected(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="det-terminology-page">
      <style>{`
                .det-details-window-anim { animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
                .det-term-btn-mini { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); text-align: left; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
                .det-term-btn-mini::before { content: ''; position: absolute; inset: 0; background: #fff; z-index: 0; transition: opacity 0.2s; opacity: 1; }
                .det-term-btn-mini:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.08); }
                .det-term-btn-mini:hover::before { opacity: 0.9; }
                .det-term-btn-mini.active { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); z-index: 2; }
                .det-term-btn-mini.active::before { opacity: 0; }
                .det-term-btn-mini > * { position: relative; z-index: 1; }
                @media (max-width: 1024px) { .det-lexicon-grid { grid-template-columns: 1fr !important; } .det-selector-container { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

      <nav className="det-intro-nav">
        <button
          className="det-intro-nav-back"
          onClick={() => navigate("/senior/grade/12/determinants")}
        >
          ← Back to Determinants
        </button>
        <div className="det-intro-nav-links">
          <button
            className="det-intro-nav-link"
            onClick={() =>
              navigate("/senior/grade/12/determinants/introduction")
            }
          >
            🌟 Introduction
          </button>
          <button
            className="det-intro-nav-link det-intro-nav-link--active"
            onClick={() =>
              navigate("/senior/grade/12/determinants/terminology")
            }
          >
            📖 Terminology
          </button>
          <button
            className="det-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/determinants/skills")}
          >
            🎯 Skills
          </button>
        </div>
      </nav>

      <div
        className="det-lexicon-container"
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
              color: "var(--det-text)",
              margin: "0 0 8px",
            }}
          >
            Determinants{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--det-teal), var(--det-indigo))",
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
              color: "var(--det-muted)",
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
            className={`det-tab ${activeTab === "terms" ? "active" : ""}`}
            onClick={() => setActiveTab("terms")}
          >
            📚 Terminology
          </button>
          <button
            className={`det-tab ${activeTab === "rules" ? "active" : ""}`}
            onClick={() => setActiveTab("rules")}
          >
            📏 6 Golden Rules
          </button>
          <button
            className={`det-tab ${activeTab === "quiz" ? "active" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            🧪 Test Prep
          </button>
        </div>

        {activeTab !== "quiz" ? (
          <div
            className="det-lexicon-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(300px, 360px) 1fr",
              gap: 16,
              alignItems: "start",
            }}
          >
            <aside
              className="det-selector-container"
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
                      className={`det-term-btn-mini ${isActive ? "active" : ""}`}
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
                          color: isActive ? "#fff" : "var(--det-text)",
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
                      className={`det-term-btn-mini ${isActive ? "active" : ""}`}
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
                            color: isActive ? "#fff" : "var(--det-text)",
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
                              : "var(--det-muted)",
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
              className="det-details-window-anim"
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
                      color: "var(--det-text)",
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
                          {activeTerm.examples.map((ex, j) => (
                            <code
                              key={j}
                              style={{
                                background: "#fff",
                                border: `1px solid ${activeTerm.color}20`,
                                color: activeTerm.color,
                                padding: "4px 10px",
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <MathRenderer text={ex} />
                            </code>
                          ))}
                        </div>
                        <div
                          style={{
                            marginTop: 12,
                            fontSize: 13,
                            color: "var(--det-muted)",
                            fontStyle: "italic",
                          }}
                        >
                          <MathRenderer text={activeTerm.inUse} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontSize: 11,
                          letterSpacing: 1,
                          color: "var(--det-indigo)",
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
                            color: "var(--det-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "var(--det-indigo)",
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
                      color: "var(--det-text)",
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
                                  color: "var(--det-text)",
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
                          color: "var(--det-teal)",
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
                            color: "var(--det-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "var(--det-teal)",
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
            className="det-details-window-anim"
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
                        color: "var(--det-blue)",
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
                        color: "var(--det-text)",
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
                      borderTopColor: "var(--det-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      fontWeight: 900,
                      color: "var(--det-blue)",
                    }}
                  >
                    {quizIdx + 1}/10
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--det-text)",
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
                    let txtCol = "var(--det-text)";
                    if (quizAnswered) {
                      if (oi === activeQuiz.correct) {
                        bCol = "var(--det-teal)";
                        bgCol = "rgba(20,184,166,0.05)";
                        txtCol = "var(--det-teal)";
                      } else if (oi === quizSelected) {
                        bCol = "var(--det-red)";
                        bgCol = "rgba(239,68,68,0.05)";
                        txtCol = "var(--det-red)";
                      }
                    } else if (quizSelected === oi) {
                      bCol = "var(--det-blue)";
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
                        color: "var(--det-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong style={{ color: "var(--det-blue)" }}>
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
                    className="det-btn-primary"
                    style={{
                      padding: "12px 40px",
                      background: quizAnswered ? "var(--det-blue)" : "#f1f5f9",
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
                    color: "var(--det-muted)",
                    fontSize: 18,
                    marginBottom: 32,
                  }}
                >
                  Your Vocabulary Score:{" "}
                  <span style={{ color: "var(--det-blue)", fontWeight: 900 }}>
                    {quizTotalScore} / 10
                  </span>
                </p>
                <div
                  style={{ display: "flex", gap: 12, justifyContent: "center" }}
                >
                  <button className="det-btn-primary" onClick={resetQuiz}>
                    Try Again
                  </button>
                  <button
                    className="det-btn-secondary"
                    onClick={() =>
                      navigate("/senior/grade/12/determinants/skills")
                    }
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
            className="det-btn-primary"
            onClick={() => navigate("/senior/grade/12/determinants/skills")}
            style={{ padding: "10px 28px", fontSize: 13 }}
          >
            Ready to Solve! 🎯
          </button>
        </div>
      </div>
    </div>
  );
}
