import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Determinants.css";
import MathRenderer from "../../../../../MathRenderer";
import { LatexText } from "../../../../../LatexText";
import DeterminantsTopNav from "../../DeterminantsTopNav";
import { NODE_IDS } from "@/lib/curriculumIds";
import {
  generateFundamentalsQuestions,
  generateFundamentalsAssessment,
  generatePropertiesQuestions,
  generatePropertiesAssessment,
  generateAreaQuestions,
  generateAreaAssessment,
  generateMinorCofactorQuestions,
  generateMinorCofactorAssessment,
  generateAdjointInverseQuestions,
  generateAdjointInverseAssessment,
  generateApplicationsQuestions,
  generateApplicationsAssessment,
} from "./determinantQuestions";

import QuizEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine";
import AssessmentEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";



// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const SKILLS = [
  {
    id: "fundamentals",
    title: "Determinant Fundamentals",
    subtitle: "Skill 1 · Foundations",
    icon: "🔢",
    color: "#6366f1",
    desc: "Evaluate 2×2 and 3×3 determinants, understand the expansion method.",
    practice: generateFundamentalsQuestions,
    assessment: generateFundamentalsAssessment,
    learn: {
      concept:
        "A determinant is a scalar value uniquely associated with every square matrix. It reveals invertibility, scaling, and solvability.",
      rules: [
        {
          title: "Determinant Formula (2×2)",
          f: "|A| = ad - bc",
          d: "For a 2×2 matrix [[a,b],[c,d]], multiply the main diagonal and subtract the cross diagonal product.",
          ex: "$\\begin{vmatrix} 3 & 4 \\\\ 1 & 2 \\end{vmatrix} = 6 - 4 = 2$",
          tip: "Main diagonal minus cross diagonal — just two products and a subtraction!",
        },
        {
          title: "Invertibility Rule",
          f: "A^{-1} \\text{ exists iff } |A| \\neq 0",
          d: "A square matrix is invertible if and only if its determinant is non-zero.",
          ex: "$|A| = 5 \\implies A$ is invertible",
          tip: "Always check the determinant before attempting to find an inverse!",
        },
        {
          title: "3×3 Expansion",
          f: "|A| = a_{11}A_{11} + a_{12}A_{12} + a_{13}A_{13}",
          d: "Expand along any row or column. Each term = element × its cofactor.",
          ex: "$\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{vmatrix}$ expanded along $R_1$",
          tip: "Choose the row/column with the most zeros for easier computation!",
        },
        {
          title: "Sign Pattern",
          f: "(-1)^{i+j}",
          d: "The sign pattern follows a checkerboard: +−+, −+−, +−+. Position (i,j) has sign (−1)^(i+j).",
          ex: "Position $(1,1)$: $+$, position $(1,2)$: $-$, position $(2,1)$: $-$",
          tip: "Start with + at top-left and alternate like a chess board!",
        },
      ],
    },
  },
  {
    id: "properties",
    title: "Properties of Determinants",
    subtitle: "Skill 2 · Key Theorems",
    icon: "📐",
    color: "#0891b2",
    desc: "Master scalar multiplication, product rule, row operations, and more.",
    practice: generatePropertiesQuestions,
    assessment: generatePropertiesAssessment,
    learn: {
      concept:
        "Determinants have elegant properties that simplify computation and reveal matrix behavior.",
      rules: [
        {
          title: "Scalar Multiplication",
          f: "|kA| = k^n|A|",
          d: "Scaling the whole n×n matrix by k multiplies the determinant by kⁿ. Scaling one row multiplies by k.",
          ex: "$|2A| = 2^3|A| = 8|A|$ for $3 \\times 3$",
          tip: "Full matrix × k: raise k to the power of n. One row × k: just multiply by k.",
        },
        {
          title: "Product Rule",
          f: "|AB| = |A| \\cdot |B|",
          d: "The determinant of a product equals the product of the individual determinants.",
          ex: "If $|A|=3, |B|=2$, then $|AB|=6$",
          tip: "No need to multiply matrices first — just multiply their determinants!",
        },
        {
          title: "Transpose Rule",
          f: "|A^T| = |A|",
          d: "Transposing does not change the determinant value.",
          ex: "$|A^T| = |A|$ always",
          tip: "Any property about rows also holds for columns, thanks to this rule!",
        },
        {
          title: "Row Operations",
          f: "R_i \\to R_i + kR_j \\text{ leaves } |A| \\text{ unchanged}",
          d: "Adding a multiple of one row to another preserves the determinant. Swapping two rows changes the sign.",
          ex: "$R_1 \\to R_1 + 3R_2$: determinant stays the same",
          tip: "Add freely, but swapping flips the sign!",
        },
      ],
    },
  },
  {
    id: "area",
    title: "Area & Collinearity",
    subtitle: "Skill 3 · Geometry",
    icon: "📐",
    color: "#f59e0b",
    desc: "Compute triangle area, test collinearity, and derive line equations using determinants.",
    practice: generateAreaQuestions,
    assessment: generateAreaAssessment,
    learn: {
      concept:
        "Determinants connect algebra to geometry — they compute areas, test collinearity, and give line equations.",
      rules: [
        {
          title: "Area of Triangle",
          f: "A = \\frac{1}{2}|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)|",
          d: "The area of a triangle with vertices (x₁,y₁), (x₂,y₂), (x₃,y₃) is given by half the absolute value of a 3×3 determinant.",
          ex: "Vertices $(0,0), (3,0), (0,4)$: Area $= \\frac{1}{2}|0+12+0| = 6$",
          tip: "Always take the absolute value — area can never be negative!",
        },
        {
          title: "Collinearity Test",
          f: "\\text{Area} = 0 \\implies \\text{collinear}",
          d: "Three points are collinear (on the same line) if and only if the area determinant equals zero.",
          ex: "$(1,2), (2,4), (3,6)$ → Area $= 0$ → Collinear",
          tip: "Zero area = no triangle possible = points on a line!",
        },
        {
          title: "Line Equation",
          f: "\\begin{vmatrix} x & y & 1 \\\\ x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\end{vmatrix} = 0",
          d: "The equation of a line through two given points can be written as a 3×3 determinant set to zero.",
          ex: "Line through $(1,2)$ and $(3,4)$: expand and simplify",
          tip: "Expand along R₁ to get the equation in x and y!",
        },
      ],
    },
  },
  {
    id: "minors-cofactors",
    title: "Minors & Cofactors",
    subtitle: "Skill 4 · Core Concepts",
    icon: "✂️",
    color: "#ec4899",
    desc: "Find minors, cofactors, and understand the zero-sum property.",
    practice: generateMinorCofactorQuestions,
    assessment: generateMinorCofactorAssessment,
    learn: {
      concept:
        "Minors and cofactors are the building blocks of determinant expansion and the adjoint matrix.",
      rules: [
        {
          title: "Minor",
          f: "M_{ij} = \\det(\\text{submatrix})",
          d: "The minor M_ij is the determinant after deleting row i and column j from the original matrix.",
          ex: "In a $3 \\times 3$ matrix, $M_{11}$ is a $2 \\times 2$ determinant",
          tip: "Cross out the row and column, then compute the remaining 2×2 determinant!",
        },
        {
          title: "Cofactor",
          f: "A_{ij} = (-1)^{i+j} M_{ij}",
          d: "The cofactor applies the checkerboard sign to the minor. Position determines the sign.",
          ex: "$A_{12} = (-1)^{1+2} M_{12} = -M_{12}$",
          tip: "Checkerboard pattern: if i+j is even → +, if odd → −",
        },
        {
          title: "Expansion",
          f: "|A| = \\sum a_{ij} A_{ij}",
          d: "Any determinant can be computed by summing element × cofactor along any row or column.",
          ex: "Along $R_1$: $|A| = a_{11}A_{11} + a_{12}A_{12} + a_{13}A_{13}$",
          tip: "Works along ANY row or column — always same result!",
        },
        {
          title: "Zero-Sum Property",
          f: "\\sum a_{ij} A_{kj} = 0 \\text{ when } i \\neq k",
          d: "Elements of one row times cofactors of a different row always sum to zero.",
          ex: "$a_{11}A_{21} + a_{12}A_{22} + a_{13}A_{23} = 0$",
          tip: "This elegant property is the key to proving adj(A) × A = |A|I!",
        },
      ],
    },
  },
  {
    id: "adjoint-inverse",
    title: "Adjoint & Inverse",
    subtitle: "Skill 5 · Advanced",
    icon: "🔓",
    color: "#7c3aed",
    desc: "Compute adjoint, find inverse using the adjoint method, and verify properties.",
    practice: generateAdjointInverseQuestions,
    assessment: generateAdjointInverseAssessment,
    learn: {
      concept:
        "The adjoint matrix is the bridge between a matrix and its inverse. Master this to solve any invertible system.",
      rules: [
        {
          title: "Adjoint Definition",
          f: "\\text{adj}(A) = C^T",
          d: "The adjoint is the transpose of the cofactor matrix C. Each cofactor A_ij goes to position (j,i).",
          ex: "For $2 \\times 2$: $\\text{adj}\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix} = \\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$",
          tip: "For 2×2: swap diagonal, negate off-diagonal. That's it!",
        },
        {
          title: "Key Identity",
          f: "A \\cdot \\text{adj}(A) = |A| \\cdot I",
          d: "This fundamental identity connects a matrix, its adjoint, and its determinant.",
          ex: "$A \\cdot \\text{adj}(A) = |A| \\cdot I_n$",
          tip: "This identity is the foundation of the inverse formula!",
        },
        {
          title: "Inverse Formula",
          f: "A^{-1} = \\frac{1}{|A|} \\text{adj}(A)",
          d: "Dividing the adjoint by the determinant gives the inverse. Requires |A| ≠ 0.",
          ex: "If $|A| = 2$ and $\\text{adj}(A) = \\begin{bmatrix}4&-2\\\\-3&1\\end{bmatrix}$, then $A^{-1} = \\frac{1}{2}\\begin{bmatrix}4&-2\\\\-3&1\\end{bmatrix}$",
          tip: "Step 1: |A|. Step 2: adj(A). Step 3: Divide. Done!",
        },
        {
          title: "Adjoint Determinant",
          f: "|\\text{adj}(A)| = |A|^{n-1}",
          d: "For an n×n matrix, the determinant of the adjoint is |A| raised to (n−1).",
          ex: "For $3 \\times 3$ with $|A|=5$: $|\\text{adj}(A)| = 5^2 = 25$",
          tip: "Power = order minus 1. For 3×3, it's squared!",
        },
      ],
    },
  },
  {
    id: "applications",
    title: "System Solving",
    subtitle: "Skill 6 · Applications",
    icon: "⚡",
    color: "#059669",
    desc: "Solve linear systems using determinants, test consistency, apply Cramer's Rule.",
    practice: generateApplicationsQuestions,
    assessment: generateApplicationsAssessment,
    learn: {
      concept:
        "Determinants are the key to solving systems of linear equations, determining consistency, and applying Cramer's Rule.",
      rules: [
        {
          title: "Matrix Method",
          f: "X = A^{-1}B",
          d: "For system AX = B, if |A| ≠ 0, then X = A⁻¹B gives the unique solution.",
          ex: "System $2x+y=5, 3x+4y=6$: find $A^{-1}$, multiply by $B$",
          tip: "First check |A| ≠ 0, then compute A⁻¹ = adj(A)/|A|, then X = A⁻¹B.",
        },
        {
          title: "Consistency Test",
          f: "|A| \\neq 0 \\implies \\text{unique solution}",
          d: "When |A| ≠ 0: unique solution. When |A| = 0: check (adj A)B to determine if infinite solutions or no solution.",
          ex: "$|A| = 0$ and $(\\text{adj }A)B = O$ → infinite solutions",
          tip: "|A| ≠ 0 → unique. |A| = 0 → check adjoint test for infinite vs. no solution.",
        },
        {
          title: "Cramer's Rule",
          f: "x = \\frac{D_x}{D}, \\; y = \\frac{D_y}{D}",
          d: "Replace each column of the coefficient matrix with the constants column and compute determinants.",
          ex: "For $2x+3y=5, 4x+y=6$: $D = |A|$, $D_x$ replaces column 1 with $[5,6]$",
          tip: "Cramer's works only when D ≠ 0. Fast for small systems!",
        },
        {
          title: "Homogeneous Systems",
          f: "AX = O",
          d: "If |A| ≠ 0: only trivial solution X = O. If |A| = 0: non-trivial solutions exist.",
          ex: "Homogeneous system always has at least the trivial solution $X = O$",
          tip: "For non-trivial solutions, we NEED |A| = 0!",
        },
      ],
    },
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function DeterminantsSkills() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");

  const skillMap = {
    fundamentals: NODE_IDS.g12MathDeterminantsFundamentals,
    properties: NODE_IDS.g12MathDeterminantsProperties,
    area: NODE_IDS.g12MathDeterminantsArea,
    "minors-cofactors": NODE_IDS.g12MathDeterminantsMinorsCofactors,
    "adjoint-inverse": NODE_IDS.g12MathDeterminantsAdjointInverse,
    applications: NODE_IDS.g12MathDeterminantsApplications,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
  const currentNodeId = React.useMemo(() => skill ? skillMap[skill.id] : null, [skill]);

  if (view !== "list" && skill) {
    return (
      <div
        className={`det-page det-skill-runtime ${view === "practice" ? "det-skill-runtime--practice" : ""} ${view === "assessment" ? "det-skill-runtime--assessment" : ""}`}
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "20px 0 60px",
        }}
      >
        <DeterminantsTopNav
          active="skills"
          backLabel="Back to Skills"
          onBack={() => {
            setView("list");
            setSelectedLearnIdx(0);
          }}
        />
        {false && <nav className="det-intro-nav">
          <button
            className="det-intro-nav-back"
            onClick={() => {
              setView("list");
              setSelectedLearnIdx(0);
            }}
          >
            ← Back to Skills
          </button>
          <div className="det-intro-nav-links">
            <button
              className="det-intro-nav-link"
              onClick={() =>
                navigate("/senior/grade/12/determinants/introduction")
              }
            >
              🌟 Intro
            </button>
            <button
              className="det-intro-nav-link"
              onClick={() =>
                navigate("/senior/grade/12/determinants/terminology")
              }
            >
              📖 Terminology
            </button>
            <button className="det-intro-nav-link det-intro-nav-link--active">
              🎯 Skills
            </button>
          </div>
        </nav>}
        <div className="det-skill-runtime-body" style={{ padding: "0 24px" }}>
          {view === "learn" ? (
            <div
              className="det-lexicon-container"
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
                    color: "var(--det-text)",
                    margin: 0,
                  }}
                >
                  Learn: {skill.title}
                </h1>
              </div>

              <div className="det-learn-grid">
                <aside
                  className="det-learn-sidebar"
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
                          selectedLearnIdx === ri ? "#fff" : "var(--det-text)",
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

                <main
                  className="det-details-window-anim det-details-window"
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
                    className="det-learn-header-row"
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
                          color: "var(--det-muted)",
                        }}
                      >
                        RULE {selectedLearnIdx + 1} OF{" "}
                        {skill.learn.rules.length}
                      </div>
                    </div>
                    <div style={{ fontSize: 32 }}>{skill.icon}</div>
                  </div>

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
                      className="det-formula-text"
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
                    className="det-rule-split"
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
                          color: "var(--det-muted)",
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
                          color: "var(--det-text)",
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
                            color: "var(--det-muted)",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "var(--det-teal)",
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
                            color: "var(--det-text)",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 17,
                              color: "var(--det-text)",
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

                  <div
                    className="det-learn-footer"
                    style={{ marginTop: 40, display: "flex", gap: 16 }}
                  >
                    <button
                      className="det-btn-primary"
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
                      className="det-btn-secondary"
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
              prefix="det"
              nodeId={currentNodeId}
            />
          ) : (
            <AssessmentEngine
              questions={skill.assessment}
              title={`Assessment: ${skill.title}`}
              onBack={() => setView("list")}
              color={skill.color}
              prefix="det"
              nodeId={currentNodeId}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="det-skills-page">
      <DeterminantsTopNav active="skills" />
      {false && <nav className="det-intro-nav">
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
            className="det-intro-nav-link"
            onClick={() =>
              navigate("/senior/grade/12/determinants/terminology")
            }
          >
            📖 Terminology
          </button>
          <button
            className="det-intro-nav-link det-intro-nav-link--active"
            onClick={() => navigate("/senior/grade/12/determinants/skills")}
          >
            🎯 Skills
          </button>
        </div>
      </nav>}

      <div
        className="det-lexicon-container"
        style={{ maxWidth: 1100, margin: "20px auto 40px", padding: "0 24px" }}
      >
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
              color: "var(--det-text)",
              margin: "0 0 6px",
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
              Skills
            </span>
          </h1>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--det-muted)",
              letterSpacing: 0.5,
            }}
          >
            Step up from concepts to mastery with targeted practice.
          </div>
        </div>

        <div className="det-skills-list">
          {SKILLS.map((skill, idx) => (
            <div key={skill.id} className="det-skill-card">
              <div className="det-skill-info">
                <div
                  className="det-skill-icon"
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
                      color: "var(--det-text)",
                    }}
                  >
                    {skill.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "var(--det-muted)",
                    }}
                  >
                    {skill.desc}
                  </p>
                </div>
              </div>
              <div className="det-skill-actions">
                <button
                  onClick={() => {
                    setActiveSkill(idx);
                    setView("learn");
                  }}
                  className="det-btn-secondary"
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
                  className="det-btn-secondary"
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
                  className="det-btn-primary"
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

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p
            style={{ fontSize: 13, color: "var(--det-muted)", fontWeight: 600 }}
          >
            Done with all? You're officially a{" "}
            <span style={{ color: "var(--det-indigo)" }}>Determinant Pro!</span>{" "}
            🏅
          </p>
        </div>
      </div>
    </div>
  );
}
