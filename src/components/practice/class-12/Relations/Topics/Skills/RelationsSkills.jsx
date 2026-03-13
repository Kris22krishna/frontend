import React, { useState, useEffect } from "react";
import "../../Relations.css";
import MathRenderer from "../../../../../MathRenderer";
import { LatexText } from "../../../../../LatexText";
import RelationsTopNav from "../../RelationsTopNav";
import {
  generateCartesianQuestions,
  generateCartesianAssessment,
  generateCountingQuestions,
  generateCountingAssessment,
  generateDomainRangeQuestions,
  generateDomainRangeAssessment,
  generateEquivalenceQuestions,
  generateEquivalenceAssessment,
} from "./relationsQuestions";
import QuizEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine";
import AssessmentEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";

const SKILLS = [
  {
    id: "cartesian",
    title: "Cartesian Products",
    subtitle: "Skill 1 · Foundations",
    icon: "✖️",
    color: "#0891b2",
    desc: "Calculate and identify elements in A × B.",
    practice: generateCartesianQuestions,
    assessment: generateCartesianAssessment,
    learn: {
      concept:
        "The Cartesian product is the foundation of all relations. It lists every possible ordered pair between two sets.",
      rules: [
        {
          title: "Definition",
          f: "A \\times B = \\{(a, b) \\mid a \\in A, b \\in B\\}",
          d: "Pair every element from A with every element from B in that exact order.",
          ex: "$A=\\{1\\}, B=\\{x,y\\} \\implies A \\times B = \\{(1,x), (1,y)\\}$",
          tip: "Order matters. (1, x) is not the same as (x, 1).",
        },
        {
          title: "Number of Elements",
          f: "n(A \\times B) = n(A) \\times n(B)",
          d: "The total number of ordered pairs is the product of the sizes of the two sets.",
          ex: "$n(A)=3, n(B)=2 \\implies n(A \\times B)=6$",
          tip: "Multiply the counts first before listing pairs.",
        },
      ],
    },
  },
  {
    id: "domain_range",
    title: "Domain and Range",
    subtitle: "Skill 2 · Extraction",
    icon: "🎯",
    color: "#f59e0b",
    desc: "Extract domains and ranges from explicit relations.",
    practice: generateDomainRangeQuestions,
    assessment: generateDomainRangeAssessment,
    learn: {
      concept:
        "Domain and range tell us which inputs and outputs are actually used by a relation.",
      rules: [
        {
          title: "Domain",
          f: "\\mathrm{Dom}(R) = \\{x \\mid (x, y) \\in R\\}",
          d: "The domain is the set of first coordinates.",
          ex: "$R=\\{(1,a),(2,b)\\} \\implies \\mathrm{Dom}(R)=\\{1,2\\}$",
          tip: "Read only the left side of each ordered pair.",
        },
        {
          title: "Range",
          f: "\\mathrm{Range}(R) = \\{y \\mid (x, y) \\in R\\}",
          d: "The range is the set of second coordinates.",
          ex: "$R=\\{(1,a),(2,b)\\} \\implies \\mathrm{Range}(R)=\\{a,b\\}$",
          tip: "Read only the right side of each ordered pair.",
        },
      ],
    },
  },
  {
    id: "counting",
    title: "Counting Relations",
    subtitle: "Skill 3 · Combinatorics",
    icon: "🧮",
    color: "#ec4899",
    desc: "Count total relations and special families of relations.",
    practice: generateCountingQuestions,
    assessment: generateCountingAssessment,
    learn: {
      concept:
        "Since relations are subsets, counting relations is really a subset-counting problem.",
      rules: [
        {
          title: "Total Relations",
          f: "2^{mn}",
          d: "If $n(A)=m$ and $n(B)=n$, then there are $2^{mn}$ possible relations from A to B.",
          ex: "$m=2, n=3 \\implies 2^6 = 64$ relations",
          tip: "Count the Cartesian product first, then raise 2 to that power.",
        },
        {
          title: "Reflexive Relations",
          f: "2^{n(n-1)}",
          d: "On a set with n elements, reflexive relations force all diagonal pairs, leaving choices only off the diagonal.",
          ex: "$n=3 \\implies 2^{3(2)} = 2^6 = 64$",
          tip: "Diagonal entries are fixed, so only off-diagonal entries vary.",
        },
      ],
    },
  },
  {
    id: "equivalence",
    title: "Equivalence Properties",
    subtitle: "Skill 4 · Proofs",
    icon: "👑",
    color: "#7c3aed",
    desc: "Test relations for reflexive, symmetric, and transitive properties.",
    practice: generateEquivalenceQuestions,
    assessment: generateEquivalenceAssessment,
    learn: {
      concept:
        "To test whether a relation is an equivalence relation, we check reflexive, symmetric, and transitive properties carefully.",
      rules: [
        {
          title: "Reflexive",
          f: "\\forall x \\in A, (x, x) \\in R",
          d: "Every element must be related to itself.",
          ex: "$1,2,3$ all need $(1,1),(2,2),(3,3)$",
          tip: "Take attendance. Missing one diagonal pair means it fails reflexivity.",
        },
        {
          title: "Symmetric",
          f: "(x, y) \\in R \\implies (y, x) \\in R",
          d: "Whenever one ordered pair appears, its reverse must also appear.",
          ex: "If $(1,2)$ is present, $(2,1)$ must also be present.",
          tip: "Look for one-way streets and break them.",
        },
        {
          title: "Transitive",
          f: "(x, y) \\in R \\land (y, z) \\in R \\implies (x, z) \\in R",
          d: "If a two-step chain exists, the shortcut must also exist.",
          ex: "If $(1,2)$ and $(2,3)$ are in R, then $(1,3)$ must be in R.",
          tip: "Chains are where transitivity usually breaks.",
        },
      ],
    },
  },
];

export default function RelationsSkills() {
  const [view, setView] = useState("list");
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

  if (view !== "list" && skill) {
    return (
      <div
        className="rel-skills-page"
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "20px 0 60px",
        }}
      >
        <RelationsTopNav
          active="skills"
          backLabel="Back to Skills"
          onBack={() => {
            setView("list");
            setSelectedLearnIdx(0);
          }}
        />

        <div style={{ padding: "0 24px" }}>
          {view === "learn" ? (
            <div
              className="rel-lexicon-container"
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
                    color: "var(--rel-text)",
                    margin: 0,
                  }}
                >
                  Learn: {skill.title}
                </h1>
              </div>

              <div className="rel-learn-grid">
                <aside className="rel-learn-sidebar">
                  {skill.learn.rules.map((rule, index) => (
                    <button
                      key={rule.title}
                      onClick={() => setSelectedLearnIdx(index)}
                      className={`rel-sidebar-btn${
                        selectedLearnIdx === index ? " active" : ""
                      }`}
                      style={{
                        "--skill-color": skill.color,
                        "--skill-color-15": `${skill.color}15`,
                        "--skill-color-40": `${skill.color}40`,
                      }}
                    >
                      <div className="rel-sidebar-btn-num">{index + 1}</div>
                      <span className="rel-sidebar-btn-title">{rule.title}</span>
                    </button>
                  ))}
                </aside>

                <main
                  key={selectedLearnIdx}
                  className="rel-details-window-anim rel-details-window"
                  style={{
                    border: `2px solid ${skill.color}15`,
                    "--skill-color-15": `${skill.color}15`,
                  }}
                >
                  <div
                    className="rel-learn-header-row"
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
                          color: "var(--rel-muted)",
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
                      padding: 24,
                      borderRadius: 20,
                      border: `2px solid ${skill.color}15`,
                      marginBottom: 32,
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="rel-formula-text"
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

                  <div className="rel-rule-split">
                    <div>
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontSize: 12,
                          letterSpacing: 1,
                          color: "var(--rel-muted)",
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
                          color: "var(--rel-text)",
                        }}
                      >
                        {skill.learn.rules[selectedLearnIdx].d}
                      </p>

                      <div
                        style={{
                          marginTop: 24,
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
                            lineHeight: 1.6,
                            color: "var(--rel-muted)",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "var(--rel-teal)",
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
                        <span
                          style={{
                            display: "block",
                            fontSize: 17,
                            color: "var(--rel-text)",
                          }}
                        >
                          <LatexText
                            text={skill.learn.rules[selectedLearnIdx].ex}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rel-learn-footer"
                    style={{ marginTop: 40, display: "flex", gap: 16 }}
                  >
                    <button
                      className="rel-btn-primary"
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
                      className="rel-btn-secondary"
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
              prefix="rel"
            />
          ) : (
            <AssessmentEngine
              questions={skill.assessment}
              title={`Assessment: ${skill.title}`}
              onBack={() => setView("list")}
              color={skill.color}
              prefix="rel"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rel-skills-page">
      <RelationsTopNav active="skills" backLabel="Back to Relations" />

      <div
        className="rel-lexicon-container"
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
              color: "var(--rel-text)",
              margin: "0 0 6px",
            }}
          >
            Relations{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--rel-teal), var(--rel-indigo))",
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
              color: "var(--rel-muted)",
              letterSpacing: 0.5,
            }}
          >
            Step up from concepts to mastery with targeted practice.
          </div>
        </div>

        <div className="rel-skills-list">
          {SKILLS.map((skill, idx) => (
            <div key={skill.id} className="rel-skill-card">
              <div className="rel-skill-info">
                <div
                  className="rel-skill-icon"
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
                      color: "var(--rel-text)",
                    }}
                  >
                    {skill.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "var(--rel-muted)",
                    }}
                  >
                    {skill.desc}
                  </p>
                </div>
              </div>

              <div className="rel-skill-actions">
                <button
                  onClick={() => {
                    setActiveSkill(idx);
                    setView("learn");
                    setSelectedLearnIdx(0);
                  }}
                  className="rel-btn-secondary"
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
                  className="rel-btn-secondary"
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
                  className="rel-btn-primary"
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
            style={{ fontSize: 13, color: "var(--rel-muted)", fontWeight: 600 }}
          >
            Done with all? You are officially a{" "}
            <span style={{ color: "var(--rel-indigo)" }}>Relations Pro!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
