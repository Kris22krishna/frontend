import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Matrices.css";
import MathRenderer from "../../../../../MathRenderer";
import { LatexText } from "../../../../../LatexText";
import {
  generateOrderQuestions,
  generateOrderAssessment,
  generateTypesQuestions,
  generateTypesAssessment,
  generateOperationsQuestions,
  generateOperationsAssessment,
  generateMultiplicationQuestions,
  generateMultiplicationAssessment,
  generateTransposeQuestions,
  generateTransposeAssessment,
  generateInverseQuestions,
  generateInverseAssessment,
} from "./matrixQuestions";

import QuizEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine";
import AssessmentEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";




// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const SKILLS = [
  {
    id: "order",
    title: "Order & Elements",
    subtitle: "Skill 1 · Foundations",
    icon: "📏",
    color: "#6366f1",
    desc: "Identify rows, columns, elements, and order of any matrix.",
    practice: generateOrderQuestions,
    assessment: generateOrderAssessment,
    learn: {
      concept:
        "Understanding order is the first step to working with matrices. Every matrix is described by its rows × columns dimensions.",
      rules: [
        {
          title: "Order Convention",
          f: "m \\times n",
          d: "A matrix with m rows and n columns has order m × n. Rows always come first.",
          ex: "A $2\\times3$ matrix has 2 rows and 3 columns",
          tip: "RC = Rows × Columns (like Remote Control)!",
        },
        {
          title: "Element Notation",
          f: "a_{ij}",
          d: "Element aᵢⱼ is in row i and column j. The first subscript is always the row.",
          ex: "$a_{23}$ means row 2, column 3",
          tip: 'Think "Row then Column" — always in that order!',
        },
        {
          title: "Total Elements",
          f: "m \\times n",
          d: "A matrix of order m × n has exactly m × n elements.",
          ex: "A $3\\times4$ matrix has 12 elements",
          tip: "Just multiply rows by columns!",
        },
        {
          title: "Possible Orders",
          f: "\\text{Factor pairs}",
          d: "A number of elements can have multiple possible orders based on factor pairs.",
          ex: "12 elements: $1\\times12, 2\\times6, 3\\times4, 4\\times3, 6\\times2, 12\\times1$",
          tip: "List all factor pairs of the total to find all possible orders.",
        },
      ],
    },
  },
  {
    id: "types",
    title: "Types of Matrices",
    subtitle: "Skill 2 · Classification",
    icon: "⬜",
    color: "#0891b2",
    desc: "Classify matrices: square, diagonal, identity, symmetric, and more.",
    practice: generateTypesQuestions,
    assessment: generateTypesAssessment,
    learn: {
      concept:
        "Matrices come in many types based on their structure and the arrangement of their elements.",
      rules: [
        {
          title: "Square Matrix",
          f: "n \\times n",
          d: "A matrix where rows equals columns. Only square matrices can have determinants and inverses.",
          ex: "$\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$ is a $2\\times2$ square matrix",
          tip: "Equal dimensions = square, like a perfect square shape!",
        },
        {
          title: "Diagonal Matrix",
          f: "a_{ij} = 0, i \\neq j",
          d: "A square matrix where all off-diagonal elements are zero.",
          ex: "$\\begin{bmatrix}5&0\\\\0&3\\end{bmatrix}$ is a diagonal matrix",
          tip: "Everything off the diagonal is wiped to zero!",
        },
        {
          title: "Identity Matrix",
          f: "I_n",
          d: "A diagonal matrix with all 1s on the diagonal. The multiplicative identity for matrices.",
          ex: "$I_2 = \\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$",
          tip: 'The "1" of matrix world — multiplying by it changes nothing!',
        },
        {
          title: "Symmetric Matrix",
          f: "A = A^T",
          d: "A matrix equal to its transpose. It is symmetric about the main diagonal.",
          ex: "$\\begin{bmatrix}1&2\\\\2&3\\end{bmatrix}$ is symmetric",
          tip: "Mirror image across the diagonal!",
        },
        {
          title: "Skew-Symmetric",
          f: "A = -A^T",
          d: "A matrix that equals the negative of its transpose. All diagonal elements must be 0.",
          ex: "$\\begin{bmatrix}0&2\\\\-2&0\\end{bmatrix}$ is skew-symmetric",
          tip: "Diagonal = 0, and signs flip across the diagonal!",
        },
      ],
    },
  },
  {
    id: "operations",
    title: "Addition & Scalar Mult.",
    subtitle: "Skill 3 · Operations",
    icon: "➕",
    color: "#f59e0b",
    desc: "Add, subtract, and scale matrices element-wise.",
    practice: generateOperationsQuestions,
    assessment: generateOperationsAssessment,
    learn: {
      concept:
        "Matrix addition and scalar multiplication are element-wise operations — simple but with important rules about matching orders.",
      rules: [
        {
          title: "Same Order Rule",
          f: "A + B \\text{ defined iff same order}",
          d: "You can only add/subtract matrices that have the exact same dimensions.",
          ex: "$2\\times3 + 2\\times3 \\checkmark$, $2\\times3 + 3\\times2 \\times$",
          tip: "Always check order first!",
        },
        {
          title: "Element-wise Add",
          f: "(A+B)_{ij} = a_{ij} + b_{ij}",
          d: "Add corresponding elements in the same position.",
          ex: "$\\begin{bmatrix}1&2\\end{bmatrix} + \\begin{bmatrix}3&4\\end{bmatrix} = \\begin{bmatrix}4&6\\end{bmatrix}$",
          tip: "Match positions and add!",
        },
        {
          title: "Scalar Multiply",
          f: "(kA)_{ij} = k \\cdot a_{ij}",
          d: "Multiply every element by the scalar k.",
          ex: "$3 \\times \\begin{bmatrix}1&2\\end{bmatrix} = \\begin{bmatrix}3&6\\end{bmatrix}$",
          tip: "The scalar visits every single element!",
        },
        {
          title: "Properties",
          f: "\\text{Commutative \\& Associative}",
          d: "A+B = B+A and (A+B)+C = A+(B+C). Zero matrix is the additive identity.",
          ex: "$A + O = A$",
          tip: "Addition is friendly — order doesn't matter!",
        },
      ],
    },
  },
  {
    id: "multiplication",
    title: "Matrix Multiplication",
    subtitle: "Skill 4 · Core",
    icon: "✖️",
    color: "#ec4899",
    desc: "Multiply matrices using dot products of rows and columns.",
    practice: generateMultiplicationQuestions,
    assessment: generateMultiplicationAssessment,
    learn: {
      concept:
        "Matrix multiplication combines rows of the first matrix with columns of the second using dot products. Order matters!",
      rules: [
        {
          title: "Dimension Rule",
          f: "A_{m\\times n} \\cdot B_{n\\times p} = C_{m\\times p}",
          d: "Inner dimensions must match. Result has outer dimensions.",
          ex: "$A_{2\\times3} \\cdot B_{3\\times4} = C_{2\\times4}$",
          tip: "Inner match, outer = result!",
        },
        {
          title: "Dot Product",
          f: "c_{ij} = \\sum a_{ik}b_{kj}",
          d: "Each element is the dot product of a row from A and a column from B.",
          ex: "$\\text{Row } \\begin{bmatrix}1&2&3\\end{bmatrix} \\cdot \\text{Col } \\begin{bmatrix}4\\\\5\\\\6\\end{bmatrix} = 1\\times4+2\\times5+3\\times6 = 32$",
          tip: "Multiply matching pairs, then sum!",
        },
        {
          title: "Non-Commutative",
          f: "AB \\neq BA",
          d: "Matrix multiplication is NOT commutative. Order matters!",
          ex: "$AB$ and $BA$ usually give different results",
          tip: "Never swap the order unless proven equal!",
        },
        {
          title: "Associative",
          f: "A(BC) = (AB)C",
          d: "Grouping doesn't matter, but order does.",
          ex: "$\\text{You can compute } BC \\text{ first or } AB \\text{ first}$",
          tip: "Group however you like, just keep the sequence!",
        },
      ],
    },
  },
  {
    id: "transpose",
    title: "Transpose Properties",
    subtitle: "Skill 5 · Transforms",
    icon: "🔄",
    color: "#7c3aed",
    desc: "Master transpose operations, symmetric and skew-symmetric decomposition.",
    practice: generateTransposeQuestions,
    assessment: generateTransposeAssessment,
    learn: {
      concept:
        "The transpose flips a matrix over its main diagonal, swapping rows and columns. It has elegant properties.",
      rules: [
        {
          title: "Basic Transpose",
          f: "(A^T)_{ij} = a_{ji}",
          d: "Rows become columns and columns become rows.",
          ex: "$\\begin{bmatrix}1&2\\end{bmatrix}^T = \\begin{bmatrix}1\\\\2\\end{bmatrix}$",
          tip: "Flip over the diagonal!",
        },
        {
          title: "Double Transpose",
          f: "(A^T)^T = A",
          d: "Transposing twice gives back the original matrix.",
          ex: "$\\text{Flip twice} = \\text{back to start}$",
          tip: "Two flips cancel out!",
        },
        {
          title: "Product Transpose",
          f: "(AB)^T = B^TA^T",
          d: "Reverse the order and transpose each factor.",
          ex: "$(ABC)^T = C^TB^TA^T$",
          tip: "Shoe-sock rule: last on, first off!",
        },
        {
          title: "Decomposition",
          f: "A = \\frac{1}{2}(A+A^T) + \\frac{1}{2}(A-A^T)",
          d: "Any square matrix = symmetric part + skew-symmetric part.",
          ex: "$\\text{Works for every square matrix!}$",
          tip: "Split any matrix into a symmetric + skew-symmetric pair!",
        },
      ],
    },
  },
  {
    id: "inverse",
    title: "Invertible Matrices",
    subtitle: "Skill 6 · Advanced",
    icon: "🔓",
    color: "#059669",
    desc: "Determine invertibility, properties of matrix inverses.",
    practice: generateInverseQuestions,
    assessment: generateInverseAssessment,
    learn: {
      concept:
        'A matrix inverse "undoes" multiplication. Only square matrices with non-zero determinants are invertible.',
      rules: [
        {
          title: "Existence",
          f: "|A| \\neq 0 \\implies A^{-1} \\text{ exists}",
          d: "A square matrix is invertible if and only if its determinant is non-zero.",
          ex: "$|A| = 5 \\implies A \\text{ is invertible}$",
          tip: "Always check the determinant first!",
        },
        {
          title: "Definition",
          f: "AA^{-1} = A^{-1}A = I",
          d: "The inverse undoes multiplication, yielding the identity matrix.",
          ex: "$A \\cdot A^{-1} = I$",
          tip: "Like multiplying by 1/x to get 1!",
        },
        {
          title: "Product Inverse",
          f: "(AB)^{-1} = B^{-1}A^{-1}",
          d: "Inverse of a product reverses the order (shoe-sock rule again).",
          ex: "$\\text{Undo } B \\text{ first, then undo } A$",
          tip: "Same reversal pattern as transpose!",
        },
        {
          title: "Transpose-Inverse",
          f: "(A^T)^{-1} = (A^{-1})^T",
          d: "Transpose and inverse operations commute — you can do them in any order.",
          ex: "$\\text{Transpose first or invert first} = \\text{same result}$",
          tip: "These two operations are best friends!",
        },
      ],
    },
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function MatricesSkills() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

  if (view !== "list" && skill) {
    return (
      <div
        className="mat-skills-page"
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "20px 0 60px",
        }}
      >
        <nav className="mat-intro-nav">
          <button
            className="mat-intro-nav-back"
            onClick={() => {
              setView("list");
              setSelectedLearnIdx(0);
            }}
          >
            ← Back to Skills
          </button>
          <div className="mat-intro-nav-links">
            <button
              className="mat-intro-nav-link"
              onClick={() => navigate("/senior/grade/12/matrices/introduction")}
            >
              🌟 Intro
            </button>
            <button
              className="mat-intro-nav-link"
              onClick={() => navigate("/senior/grade/12/matrices/terminology")}
            >
              📖 Terminology
            </button>
            <button className="mat-intro-nav-link mat-intro-nav-link--active">
              🎯 Skills
            </button>
          </div>
        </nav>
        <div style={{ padding: "0 24px" }}>
          {view === "learn" ? (
            <div
              className="mat-lexicon-container"
              style={{ maxWidth: 1100, margin: "0 auto" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${skill.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {skill.icon}
                </div>
                <h1
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "var(--mat-text)",
                    margin: 0,
                  }}
                >
                  Learn: {skill.title}
                </h1>
              </div>

              <div className="mat-learn-grid">
                {/* Side Selector */}
                <aside
                  className="mat-learn-sidebar"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    padding: "12px",
                    borderRadius: 20,
                    border: "1px solid rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    maxHeight: "65vh",
                    overflowY: "auto",
                  }}
                >
                  {skill.learn.rules.map((rule, ri) => (
                    <button
                      key={ri}
                      onClick={() => setSelectedLearnIdx(ri)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        borderRadius: 12,
                        border: "1px solid",
                        borderColor:
                          selectedLearnIdx === ri
                            ? skill.color
                            : "rgba(0,0,0,0.05)",
                        background:
                          selectedLearnIdx === ri ? skill.color : "#fff",
                        color:
                          selectedLearnIdx === ri ? "#fff" : "var(--mat-text)",
                        transition: "all 0.2s",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background:
                            selectedLearnIdx === ri
                              ? "rgba(255,255,255,0.2)"
                              : `${skill.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 900,
                          flexShrink: 0,
                        }}
                      >
                        {ri + 1}
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>
                        {rule.title}
                      </span>
                    </button>
                  ))}
                </aside>

                {/* Detailed Window */}
                <main
                  className="mat-details-window-anim mat-details-window"
                  key={selectedLearnIdx}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "24px 32px",
                    border: `2px solid ${skill.color}15`,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
                    minHeight: 400,
                  }}
                >
                  <div
                    className="mat-learn-header-row"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 20,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: "0 0 4px",
                          fontSize: 28,
                          fontWeight: 900,
                          color: skill.color,
                        }}
                      >
                        {skill.learn.rules[selectedLearnIdx].title}
                      </h3>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "var(--mat-muted)",
                        }}
                      >
                        RULE {selectedLearnIdx + 1} OF{" "}
                        {skill.learn.rules.length}
                      </div>
                    </div>
                    <div style={{ fontSize: 32 }}>{skill.icon}</div>
                  </div>

                  {/* Core Formula Box */}
                  <div
                    style={{
                      background: `${skill.color}05`,
                      padding: "24px",
                      borderRadius: 20,
                      border: `2px solid ${skill.color}15`,
                      marginBottom: 32,
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="mat-formula-text"
                      style={{
                        fontSize: 42,
                        fontWeight: 800,
                        color: skill.color,
                      }}
                    >
                      <MathRenderer
                        text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`}
                      />
                    </div>
                  </div>

                  <div
                    className="mat-rule-split"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 24,
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontSize: 12,
                          letterSpacing: 1,
                          color: "var(--mat-muted)",
                          marginBottom: 10,
                        }}
                      >
                        Explanation
                      </h4>
                      <p
                        style={{
                          fontSize: 17,
                          lineHeight: 1.6,
                          margin: 0,
                          color: "var(--mat-text)",
                        }}
                      >
                        {skill.learn.rules[selectedLearnIdx].d}
                      </p>

                      <div
                        style={{
                          marginTop: 24,
                          background: "rgba(20,184,166,0.05)",
                          padding: "16px",
                          borderRadius: 16,
                          border: "1px solid rgba(20,184,166,0.1)",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 15,
                            lineHeight: 1.6,
                            color: "var(--mat-muted)",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "var(--mat-teal)",
                            }}
                          >
                            🛡️ Survival Tip:{" "}
                          </span>
                          {skill.learn.rules[selectedLearnIdx].tip}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontSize: 12,
                          letterSpacing: 1,
                          color: skill.color,
                          marginBottom: 10,
                        }}
                      >
                        Practical Example
                      </h4>
                      <div
                        style={{
                          background: "#f8fafc",
                          padding: 24,
                          borderRadius: 20,
                          border: "1px solid rgba(0,0,0,0.03)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: "var(--mat-text)",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 17,
                              color: "var(--mat-text)",
                              display: "block",
                            }}
                          >
                            <LatexText
                              text={skill.learn.rules[selectedLearnIdx].ex}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Footnotes */}
                  <div
                    className="mat-learn-footer"
                    style={{ marginTop: 40, display: "flex", gap: 16 }}
                  >
                    <button
                      className="mat-btn-primary"
                      onClick={() => setView("practice")}
                      style={{
                        padding: "14px 32px",
                        background: skill.color,
                        fontSize: 15,
                      }}
                    >
                      Mastered this? Try Practice →
                    </button>
                    <button
                      className="mat-btn-secondary"
                      onClick={() => {
                        const nextIdx =
                          (selectedLearnIdx + 1) % skill.learn.rules.length;
                        setSelectedLearnIdx(nextIdx);
                      }}
                      style={{ padding: "14px 32px", fontSize: 15 }}
                    >
                      Next:{" "}
                      {
                        skill.learn.rules[
                          (selectedLearnIdx + 1) % skill.learn.rules.length
                        ].title
                      }
                    </button>
                  </div>
                </main>
              </div>
            </div>
          ) : view === "practice" ? (
            <QuizEngine
              questions={skill.practice}
              title={`Practice: ${skill.title}`}
              onBack={() => setView("list")}
              color={skill.color}
              prefix="mat"
            />
          ) : (
            <AssessmentEngine
              questions={skill.assessment}
              title={`Assessment: ${skill.title}`}
              onBack={() => setView("list")}
              color={skill.color}
              prefix="mat"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mat-skills-page">
      {/* ── TOP NAV BAR ──────────────────────────────── */}
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
            className="mat-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/matrices/terminology")}
          >
            📖 Terminology
          </button>
          <button
            className="mat-intro-nav-link mat-intro-nav-link--active"
            onClick={() => navigate("/senior/grade/12/matrices/skills")}
          >
            🎯 Skills
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ──────────────────────────────── */}
      <div
        className="mat-lexicon-container"
        style={{ maxWidth: 1100, margin: "20px auto 40px", padding: "0 24px" }}
      >
        {/* Compact Heading Line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          <h1
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "2.1rem",
              fontWeight: 900,
              color: "var(--mat-text)",
              margin: "0 0 6px",
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
              Skills
            </span>
          </h1>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--mat-muted)",
              letterSpacing: 0.5,
            }}
          >
            Step up from concepts to mastery with targeted practice.
          </div>
        </div>

        {/* Vertical Skills List */}
        <div className="mat-skills-list">
          {SKILLS.map((skill, idx) => (
            <div key={skill.id} className="mat-skill-card">
              {/* Skill Info */}
              <div className="mat-skill-info">
                <div
                  className="mat-skill-icon"
                  style={{ background: `${skill.color}15` }}
                >
                  {skill.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: skill.color,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 2,
                    }}
                  >
                    {skill.subtitle}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 17,
                      fontWeight: 800,
                      color: "var(--mat-text)",
                    }}
                  >
                    {skill.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "var(--mat-muted)",
                    }}
                  >
                    {skill.desc}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mat-skill-actions">
                <button
                  onClick={() => {
                    setActiveSkill(idx);
                    setView("learn");
                  }}
                  className="mat-btn-secondary"
                  style={{
                    padding: "8px 16px",
                    fontSize: 12,
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    border: "1.5px solid rgba(0,0,0,0.1)",
                  }}
                >
                  Learn
                </button>
                <button
                  onClick={() => {
                    setActiveSkill(idx);
                    setView("practice");
                  }}
                  className="mat-btn-secondary"
                  style={{
                    padding: "8px 16px",
                    fontSize: 12,
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  Practice
                </button>
                <button
                  onClick={() => {
                    setActiveSkill(idx);
                    setView("assessment");
                  }}
                  className="mat-btn-primary"
                  style={{
                    padding: "8px 16px",
                    fontSize: 12,
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    background: skill.color,
                  }}
                >
                  Assess
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Final Motivation */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p
            style={{ fontSize: 13, color: "var(--mat-muted)", fontWeight: 600 }}
          >
            Done with all? You're officially a{" "}
            <span style={{ color: "var(--mat-indigo)" }}>Matrix Pro!</span> 🏅
          </p>
        </div>
      </div>
    </div>
  );
}
