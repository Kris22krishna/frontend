import React, { useState, useEffect } from "react";
import "../../Functions.css";
import MathRenderer from "../../../../../MathRenderer";
import { LatexText } from "../../../../../LatexText";
import FunctionsTopNav from "../../FunctionsTopNav";
import { NODE_IDS } from "@/lib/curriculumIds";
import {
  generateFunctionBasicsQuestions,
  generateFunctionBasicsAssessment,
  generateFunctionTypesQuestions,
  generateFunctionTypesAssessment,
  generateFunctionAlgebraQuestions,
  generateFunctionAlgebraAssessment,
  generateFunctionEquationQuestions,
  generateFunctionEquationAssessment,
  generateFunctionDomainRangeQuestions,
  generateFunctionDomainRangeAssessment,
} from "./functionsQuestions";
import QuizEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine";
import AssessmentEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";

const SKILLS = [
  {
    id: "concept",
    title: "Concept of Function",
    subtitle: "Skill 1 - Foundations",
    icon: "f(x)",
    color: "#0891b2",
    desc: "Check the function rule and identify domain, codomain, and range.",
    practice: generateFunctionBasicsQuestions,
    assessment: generateFunctionBasicsAssessment,
    learn: {
      concept:
        "A function is a special relation where every input is assigned exactly one output.",
      rules: [
        {
          title: "Definition of Function",
          f: "\\text{Each input has exactly one output}",
          d: "If one input leads to two different outputs, the relation is not a function. Real-life examples include student to roll number, Aadhaar number to person, and mobile number to user.",
          ex: "For $R=\\{(1,2),(2,3),(3,4)\\}$, each input appears with one output, so $R$ is a function.",
          tip: "Repeated outputs are allowed. Repeated inputs with different outputs are not.",
        },
        {
          title: "Domain, Codomain, Range",
          f: "\\text{Domain = inputs, Range = actual outputs}",
          d: "Domain collects allowed inputs, codomain is the target set, and range is the output set actually reached. Think of students to marks, days to temperature, or products to prices.",
          ex: "For $\\{(1,7),(2,5),(3,5)\\}$, domain is $\\{1,2,3\\}$ and range is $\\{7,5\\}$.",
          tip: "Domain looks left, range looks right.",
        },
      ],
    },
  },
  {
    id: "types",
    title: "Types of Functions",
    subtitle: "Skill 2 - Recognition",
    icon: "type",
    color: "#f59e0b",
    desc: "Identify standard function families and predict their behavior.",
    practice: generateFunctionTypesQuestions,
    assessment: generateFunctionTypesAssessment,
    learn: {
      concept:
        "Type recognition speeds up solving because each family of functions comes with standard behavior.",
      rules: [
        {
          title: "Identity Function",
          f: "f(x)=x",
          d: "The output equals the input. It behaves like a mirror, a copy-paste process, or an unchanged transformation.",
          ex: "$f(5)=5$ and $f(-2)=-2$.",
          tip: "Identity means nothing changes.",
        },
        {
          title: "Constant Function",
          f: "f(x)=c",
          d: "Every input gets the same output. Real-life examples include fixed salary, flat delivery charge, and same attendance bonus.",
          ex: "If $f(x)=5$, then $f(2)=5$ and $f(-10)=5$.",
          tip: "Wide domain, single-value range.",
        },
        {
          title: "Polynomial Function",
          f: "f(x)=a_nx^n+\\cdots+a_1x+a_0",
          d: "Polynomial functions model projectile motion, profit versus units sold, and area formulas. They are defined for all real numbers.",
          ex: "For $f(x)=x^2+3x+1$, $f(2)=11$.",
          tip: "No variable in the denominator or under a root.",
        },
        {
          title: "Rational Function",
          f: "f(x)=\\frac{p(x)}{q(x)}",
          d: "Rational functions appear in speed, density, and efficiency ratios. They behave like fractions, so denominator restrictions matter.",
          ex: "For $f(x)=\\frac{1}{x+2}$, $x=-2$ is not allowed.",
          tip: "Start with denominator zero check.",
        },
        {
          title: "Modulus Function",
          f: "f(x)=|x|",
          d: "Modulus measures magnitude, so it appears in distance, temperature difference, and error size. Outputs are never negative.",
          ex: "$|-7|=7$ and $|5|=5$.",
          tip: "Absolute value keeps size and removes sign.",
        },
        {
          title: "Greatest Integer Function",
          f: "f(x)=[x]",
          d: "This step-like function shows up in floor pricing, count of complete items, and slab-based billing.",
          ex: "$[2.7]=2$ and $[-1.2]=-2$.",
          tip: "Move to the greatest integer on the left.",
        },
      ],
    },
  },
  {
    id: "algebra",
    title: "Algebra of Functions",
    subtitle: "Skill 3 - Operations",
    icon: "alg",
    color: "#ec4899",
    desc: "Add, subtract, multiply, divide, and scale functions correctly.",
    practice: generateFunctionAlgebraQuestions,
    assessment: generateFunctionAlgebraAssessment,
    learn: {
      concept: "Algebra of functions works output-by-output with domain restrictions kept alive.",
      rules: [
        {
          title: "Addition and Subtraction",
          f: "(f\\pm g)(x)=f(x)\\pm g(x)",
          d: "These operations model total cost as item plus tax or net score as positive marks minus negative marks.",
          ex: "If $f(x)=x+1$ and $g(x)=x^2$, then $(f+g)(x)=x^2+x+1$.",
          tip: "Combine outputs first, simplify second.",
        },
        {
          title: "Multiplication",
          f: "(fg)(x)=f(x)g(x)",
          d: "Multiplication appears in area calculations and scaling effects where two changing quantities interact.",
          ex: "If $f(x)=x+2$ and $g(x)=x-1$, then $(fg)(2)=4$.",
          tip: "Evaluate both functions before multiplying if a number is given.",
        },
        {
          title: "Quotient",
          f: "\\left(\\frac{f}{g}\\right)(x)=\\frac{f(x)}{g(x)},\\ g(x)\\neq 0",
          d: "Quotients arise in speed, averages, and ratio-style models. The denominator output can never be zero.",
          ex: "If $f(x)=x^2$ and $g(x)=x+1$, then $\\frac{f}{g}(x)=\\frac{x^2}{x+1}$ with $x\\neq -1$.",
          tip: "Always write the restriction after dividing.",
        },
        {
          title: "Scalar Multiplication",
          f: "(cf)(x)=cf(x)",
          d: "Scalar multiplication represents doubling salary, tripling measurements, or any fixed scale factor on the output.",
          ex: "If $f(x)=x^2-1$, then $(2f)(3)=16$.",
          tip: "Multiply the output, not the input.",
        },
      ],
    },
  },
  {
    id: "equations",
    title: "Function Equations",
    subtitle: "Skill 4 - Solving",
    icon: "eq",
    color: "#7c3aed",
    desc: "Solve $f(x)=g(x)$ and evaluate mixed expressions confidently.",
    practice: generateFunctionEquationQuestions,
    assessment: generateFunctionEquationAssessment,
    learn: {
      concept:
        "Function equations translate directly into algebraic equations. Once the functions are known, the job is substitution and simplification.",
      rules: [
        {
          title: "Equality of Functions",
          f: "f(x)=g(x)",
          d: "Set the two outputs equal and solve for the input values where both functions agree.",
          ex: "Solve $2x^2-1=1-3x$ by rearranging to $2x^2+3x-2=0$.",
          tip: "Move everything to one side before factoring or using a formula.",
        },
        {
          title: "Function Evaluation",
          f: "\\text{Substitute the given input carefully}",
          d: "Questions like $f(3)+g(-5)$ or $f\\left(\\frac{1}{2}\\right)g(14)$ check substitution, sign control, and order.",
          ex: "If $f(x)=2x+1$ and $g(x)=x^2$, then $f(3)+g(-5)=7+25=32$.",
          tip: "Use brackets carefully when substituting negative values.",
        },
      ],
    },
  },
  {
    id: "domain_range",
    title: "Advanced Domain and Range",
    subtitle: "Skill 5 - Restrictions",
    icon: "DR",
    color: "#10b981",
    desc: "Master domain exclusions and range patterns for common expressions.",
    practice: generateFunctionDomainRangeQuestions,
    assessment: generateFunctionDomainRangeAssessment,
    learn: {
      concept:
        "Advanced domain and range problems are mostly about respecting algebraic restrictions and recognizing output patterns.",
      rules: [
        {
          title: "Advanced Domain",
          f: "\\text{Avoid zero denominators and impossible roots}",
          d: "Expressions like $\\frac{1}{x-5}$, $\\frac{1}{\\sqrt{x^2-1}}$, and $\\frac{1}{x^2+3x+2}$ are controlled by what makes the denominator or root invalid.",
          ex: "For $\\frac{1}{\\sqrt{x^2-1}}$, we need $x^2-1>0$, so $x<-1$ or $x>1$.",
          tip: "If the root sits in the denominator, the inside must be strictly positive.",
        },
        {
          title: "Advanced Range",
          f: "\\text{Track maximums, minimums, and sign behavior}",
          d: "Range questions become easier when you use standard facts: square roots are non-negative, absolute value is non-negative, and a constant-shifted square root often creates an upper bound.",
          ex: "For $2-\\sqrt{x-5}$, the range is $(-\\infty,2]$.",
          tip: "Ask what the square root can do first, then transform that answer.",
        },
      ],
    },
  },
];

export default function FunctionsSkills() {
  const [view, setView] = useState("list");
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

  const skillMap = {
    concept: NODE_IDS.g12MathFunctionsConcept,
    types: NODE_IDS.g12MathFunctionsTypes,
    algebra: NODE_IDS.g12MathFunctionsAlgebra,
    equations: NODE_IDS.g12MathFunctionsEquations,
    domain_range: NODE_IDS.g12MathFunctionsDomainRangeAdvanced,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
  const currentNodeId = React.useMemo(() => skill ? skillMap[skill.id] : null, [skill]);

  if (view !== "list" && skill) {
    return (
      <div className="rel-skills-page" style={{ background: "#f8fafc", minHeight: "100vh", padding: "20px 0 60px" }}>
        <FunctionsTopNav
          active="skills"
          backLabel="Back to Skills"
          onBack={() => {
            setView("list");
            setSelectedLearnIdx(0);
          }}
        />

        <div style={{ padding: "0 24px" }}>
          {view === "learn" ? (
            <div className="rel-lexicon-container" style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, justifyContent: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: skill.color }}>
                  {skill.icon}
                </div>
                <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.5rem", fontWeight: 900, color: "var(--rel-text)", margin: 0 }}>
                  Learn: {skill.title}
                </h1>
              </div>

              <div className="rel-learn-grid">
                <aside className="rel-learn-sidebar">
                  {skill.learn.rules.map((rule, index) => (
                    <button
                      key={rule.title}
                      onClick={() => setSelectedLearnIdx(index)}
                      className={`rel-sidebar-btn${selectedLearnIdx === index ? " active" : ""}`}
                      style={{ "--skill-color": skill.color, "--skill-color-15": `${skill.color}15`, "--skill-color-40": `${skill.color}40` }}
                    >
                      <div className="rel-sidebar-btn-num">{index + 1}</div>
                      <span className="rel-sidebar-btn-title">{rule.title}</span>
                    </button>
                  ))}
                </aside>

                <main key={selectedLearnIdx} className="rel-details-window-anim rel-details-window" style={{ border: `2px solid ${skill.color}15`, "--skill-color-15": `${skill.color}15` }}>
                  <div className="rel-learn-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <h3 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, color: skill.color }}>
                        {skill.learn.rules[selectedLearnIdx].title}
                      </h3>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--rel-muted)" }}>
                        RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}
                      </div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: skill.color }}>{skill.icon}</div>
                  </div>

                  <div style={{ background: `${skill.color}05`, padding: 24, borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 18, textAlign: "center" }}>
                    <div className="rel-formula-text" style={{ fontSize: 32, fontWeight: 800 }}>
                      <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 28, padding: "16px 20px", borderRadius: 18, background: "linear-gradient(180deg, rgba(248,250,252,0.98), rgba(241,245,249,0.9))", border: "1px solid rgba(148,163,184,0.16)" }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase", color: skill.color, marginBottom: 8 }}>
                      Big Idea
                    </div>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--rel-text)" }}>
                      <MathRenderer text={skill.learn.concept} />
                    </p>
                  </div>

                  <div className="rel-rule-split">
                    <div>
                      <h4 style={{ textTransform: "uppercase", fontSize: 12, letterSpacing: 1, color: "var(--rel-muted)", marginBottom: 10 }}>
                        Explanation
                      </h4>
                      <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: "var(--rel-text)" }}>
                        <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                      </p>

                      <div style={{ marginTop: 24, background: "rgba(20,184,166,0.05)", padding: 16, borderRadius: 16, border: "1px solid rgba(20,184,166,0.1)" }}>
                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--rel-muted)" }}>
                          <span style={{ fontWeight: 800, color: "var(--rel-teal)" }}>Survival Tip: </span>
                          <MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ textTransform: "uppercase", fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>
                        Practical Example
                      </h4>
                      <div style={{ background: "#f8fafc", padding: 24, borderRadius: 20, border: "1px solid rgba(0,0,0,0.03)" }}>
                        <span style={{ display: "block", fontSize: 17, color: "var(--rel-text)" }}>
                          <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rel-learn-footer" style={{ marginTop: 40, display: "flex", gap: 16 }}>
                    <button className="rel-btn-primary" onClick={() => setView("practice")} style={{ padding: "14px 32px", background: skill.color, fontSize: 15 }}>
                      Mastered this? Try Practice -&gt;
                    </button>
                    <button
                      className="rel-btn-secondary"
                      onClick={() => setSelectedLearnIdx((selectedLearnIdx + 1) % skill.learn.rules.length)}
                      style={{ padding: "14px 32px", fontSize: 15 }}
                    >
                      Next: {skill.learn.rules[(selectedLearnIdx + 1) % skill.learn.rules.length].title}
                    </button>
                  </div>
                </main>
              </div>
            </div>
          ) : view === "practice" ? (
            <QuizEngine questions={skill.practice} title={`Practice: ${skill.title}`} onBack={() => setView("list")} color={skill.color} prefix="rel" nodeId={currentNodeId} />
          ) : (
            <AssessmentEngine questions={skill.assessment} title={`Assessment: ${skill.title}`} onBack={() => setView("list")} color={skill.color} prefix="rel" nodeId={currentNodeId} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rel-skills-page">
      <FunctionsTopNav active="skills" backLabel="Back to Functions" />

      <div className="rel-lexicon-container" style={{ maxWidth: 1100, margin: "20px auto 40px", padding: "0 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.1rem", fontWeight: 900, color: "var(--rel-text)", margin: "0 0 6px" }}>
            Functions{" "}
            <span style={{ background: "linear-gradient(135deg, var(--rel-teal), var(--rel-indigo))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Skills
            </span>
          </h1>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rel-muted)", letterSpacing: 0.5 }}>
            Build chapter mastery from basics to advanced restrictions.
          </div>
        </div>

        <div className="rel-skills-list">
          {SKILLS.map((skill, idx) => (
            <div key={skill.id} className="rel-skill-card">
              <div className="rel-skill-info">
                <div className="rel-skill-icon" style={{ background: `${skill.color}15` }}>
                  <span style={{ color: skill.color, fontSize: 13, fontWeight: 800 }}>{skill.icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: skill.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
                    {skill.subtitle}
                  </div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "var(--rel-text)" }}>{skill.title}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--rel-muted)" }}>{skill.desc}</p>
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
                  style={{ padding: "8px 16px", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap", border: "1.5px solid rgba(0,0,0,0.1)" }}
                >
                  Learn
                </button>
                <button
                  onClick={() => {
                    setActiveSkill(idx);
                    setView("practice");
                  }}
                  className="rel-btn-secondary"
                  style={{ padding: "8px 16px", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap" }}
                >
                  Practice
                </button>
                <button
                  onClick={() => {
                    setActiveSkill(idx);
                    setView("assessment");
                  }}
                  className="rel-btn-primary"
                  style={{ padding: "8px 16px", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap", background: skill.color }}
                >
                  Assess
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--rel-muted)", fontWeight: 600 }}>
            Done with all? You are officially a{" "}
            <span style={{ color: "var(--rel-indigo)" }}>Functions Pro!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
