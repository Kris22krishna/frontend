import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../class-12/Matrices/Matrices.css";
import MathRenderer from "../../../../../../MathRenderer";
import { LatexText } from "../../../../../../LatexText";
import {
  generateCartesianQuestions,
  generateCartesianAssessment,
  generateRelationsQuestions,
  generateRelationsAssessment,
  generateCountingRelationsQuestions,
  generateCountingRelationsAssessment,
  generateFunctionsQuestions,
  generateFunctionsAssessment,
  generateSpecialFunctionsQuestions,
  generateSpecialFunctionsAssessment,
  generateAlgebraOfFunctionsQuestions,
  generateAlgebraOfFunctionsAssessment,
} from "./relFuncQuestions";

import QuizEngine from "../../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine";
import AssessmentEngine from "../../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";

const BASE = "/senior/grade/11/maths/relations-and-functions";

// ─── SKILLS DATA ──────────────────────────────────────────────────────────
const SKILLS = [
  {
    id: "cartesian",
    title: "Ordered Pairs & Cartesian Product",
    subtitle: "Skill 1 · Foundations",
    icon: "🎯",
    color: "#6366f1",
    desc: "Work with ordered pairs, build Cartesian products, and apply their properties.",
    practice: generateCartesianQuestions,
    assessment: generateCartesianAssessment,
    learn: {
      concept: "Ordered pairs and Cartesian products form the foundation of all relations and functions. Understanding these is essential before moving forward.",
      rules: [
        { title: "Ordered Pair", f: "(a, b)", d: "A pair where order matters. $(a,b) \\neq (b,a)$ unless $a = b$.", ex: "$(2,3) \\neq (3,2)$ — the first element is always distinguished.", tip: "Think of coordinates on a map: latitude first, longitude second!" },
        { title: "Equality", f: "(a,b) = (c,d) \\iff a = c, b = d", d: "Two ordered pairs are equal if and only if their corresponding components match.", ex: "$(x+1, y) = (3, 5) \\implies x = 2, y = 5$.", tip: "Match first with first, second with second — always!" },
        { title: "Cartesian Product", f: "A \\times B = \\{(a,b) : a \\in A, b \\in B\\}", d: "Every element of $A$ pairs with every element of $B$.", ex: "$\\{1,2\\} \\times \\{3,4\\} = \\{(1,3),(1,4),(2,3),(2,4)\\}$.", tip: "Think of it like a menu: each starter pairs with each dessert!" },
        { title: "Size Formula", f: "n(A \\times B) = n(A) \\times n(B)", d: "The number of ordered pairs equals the product of the set sizes.", ex: "$n(A) = 3, n(B) = 4 \\implies n(A \\times B) = 12$.", tip: "Just multiply the sizes!" }
      ]
    }
  },
  {
    id: "relations",
    title: "Relations & Representations",
    subtitle: "Skill 2 · Connections",
    icon: "🔗",
    color: "#0891b2",
    desc: "Define relations, find domain/range, and represent them in roster, set-builder, and arrow diagrams.",
    practice: generateRelationsQuestions,
    assessment: generateRelationsAssessment,
    learn: {
      concept: "A relation is a way to describe how elements of two sets are connected. It's a subset of the Cartesian product.",
      rules: [
        { title: "Relation", f: "R \\subseteq A \\times B", d: "A relation picks some ordered pairs from $A \\times B$.", ex: "$R = \\{(1,2), (2,4), (3,6)\\}$ from $A = \\{1,2,3\\}$ to $B = \\{2,4,6\\}$.", tip: "It's like a filter on the Cartesian product!" },
        { title: "Domain", f: "\\text{Dom}(R) = \\{a : (a,b) \\in R\\}", d: "The set of all first elements in the relation.", ex: "For $R = \\{(1,2),(3,4)\\}$, Domain $= \\{1,3\\}$.", tip: "Domain = all the inputs." },
        { title: "Range", f: "\\text{Ran}(R) = \\{b : (a,b) \\in R\\}", d: "The set of all second elements actually mapped to.", ex: "For $R = \\{(1,2),(3,4)\\}$, Range $= \\{2,4\\}$.", tip: "Range = only the outputs that show up." },
        { title: "Representations", f: "\\text{Roster, Set-builder, Arrow}", d: "Relations can be written in roster form (list pairs), set-builder form (rule), or shown as arrow diagrams.", ex: "$R = \\{(x,y) : y = 2x\\}$ (set-builder).", tip: "Arrow diagrams are the most visual!" }
      ]
    }
  },
  {
    id: "counting",
    title: "Number of Relations",
    subtitle: "Skill 3 · Counting",
    icon: "🔢",
    color: "#f59e0b",
    desc: "Calculate the total number of possible relations using power set counting.",
    practice: generateCountingRelationsQuestions,
    assessment: generateCountingRelationsAssessment,
    learn: {
      concept: "Since a relation is any subset of the Cartesian product, the number of possible relations follows the power set formula.",
      rules: [
        { title: "Total Relations", f: "2^{n(A) \\times n(B)}", d: "Every subset of $A \\times B$ is a valid relation, including $\\emptyset$ and $A \\times B$ itself.", ex: "$n(A) = 2, n(B) = 3 \\implies 2^6 = 64$ relations.", tip: "It's always a power of 2!" },
        { title: "Empty Relation", f: "R = \\emptyset", d: "The empty set is always a valid relation (no pairs selected).", ex: "$\\emptyset \\subseteq A \\times B$ for any $A, B$.", tip: "Even 'nothing relates to nothing' counts!" },
        { title: "Universal Relation", f: "R = A \\times B", d: "The full Cartesian product is also a valid relation (everything relates).", ex: "If $A \\times B$ has 6 pairs, the universal relation contains all 6.", tip: "The maximum possible relation." },
        { title: "Non-empty Relations", f: "2^{mn} - 1", d: "Subtract 1 (the empty relation) to count only non-empty relations.", ex: "$2^6 - 1 = 63$ non-empty relations.", tip: "Just subtract the empty set from the total!" }
      ]
    }
  },
  {
    id: "functions",
    title: "Functions Identification",
    subtitle: "Skill 4 · Core Concept",
    icon: "⚡",
    color: "#ec4899",
    desc: "Identify functions, find domains and ranges, and apply the vertical line test.",
    practice: generateFunctionsQuestions,
    assessment: generateFunctionsAssessment,
    learn: {
      concept: "A function is a special relation where every input has exactly one output. This is the most important concept in all of mathematics.",
      rules: [
        { title: "Function Definition", f: "f: A \\to B, \\; \\forall a \\in A, \\exists! b \\in B", d: "Every element of the domain must map to exactly one element of the codomain.", ex: "$f(x) = x^2$ is a function. $\\{(1,2),(1,3)\\}$ is NOT.", tip: "One input, one output — that's the rule!" },
        { title: "Vertical Line Test", f: "\\text{VLT}", d: "A graph represents a function iff every vertical line intersects it at most once.", ex: "A circle fails the VLT. A parabola passes.", tip: "Draw vertical lines mentally through the graph!" },
        { title: "Domain", f: "\\text{Dom}(f)", d: "The set of all valid inputs. Exclude values that cause division by zero or negative square roots.", ex: "Domain of $1/x$: $\\mathbb{R} \\setminus \\{0\\}$.", tip: "Ask: 'What values of $x$ break this function?'" },
        { title: "Range", f: "\\text{Ran}(f)", d: "The set of all possible outputs. Range $\\subseteq$ Codomain.", ex: "Range of $x^2$: $[0, \\infty)$.", tip: "Ask: 'What $y$-values are actually reachable?'" }
      ]
    }
  },
  {
    id: "special",
    title: "Special Functions",
    subtitle: "Skill 5 · Function Zoo",
    icon: "🦁",
    color: "#7c3aed",
    desc: "Master identity, constant, modulus, signum, greatest integer, and polynomial functions.",
    practice: generateSpecialFunctionsQuestions,
    assessment: generateSpecialFunctionsAssessment,
    learn: {
      concept: "NCERT Chapter 2 explores several named functions, each with unique graphs and properties.",
      rules: [
        { title: "Identity Function", f: "f(x) = x", d: "Maps every element to itself. Graph is the line $y = x$.", ex: "$f(5) = 5$, $f(-3) = -3$.", tip: "The 'do nothing' function!" },
        { title: "Modulus Function", f: "f(x) = |x|", d: "Returns the absolute value. V-shaped graph.", ex: "$|-7| = 7$, $|3| = 3$.", tip: "Strips the sign — always non-negative!" },
        { title: "Signum Function", f: "\\text{sgn}(x) = \\begin{cases} 1 & x > 0 \\\\\\\\ 0 & x = 0 \\\\\\\\ -1 & x < 0 \\end{cases}", d: "Extracts the sign. Range is $\\{-1, 0, 1\\}$.", ex: "$\\text{sgn}(5) = 1$, $\\text{sgn}(-3) = -1$.", tip: "Traffic light: green (+1), yellow (0), red (−1)!" },
        { title: "Greatest Integer", f: "[x] = \\lfloor x \\rfloor", d: "Returns the largest integer $\\leq x$. Staircase graph.", ex: "$[3.7] = 3$, $[-1.2] = -2$.", tip: "Always round DOWN — even for negatives!" }
      ]
    }
  },
  {
    id: "algebra",
    title: "Algebra of Functions",
    subtitle: "Skill 6 · Combining",
    icon: "🧮",
    color: "#0369a1",
    desc: "Add, subtract, multiply, and divide functions. Master domain restrictions.",
    practice: generateAlgebraOfFunctionsQuestions,
    assessment: generateAlgebraOfFunctionsAssessment,
    learn: {
      concept: "Functions can be combined using arithmetic operations, creating new functions from existing ones.",
      rules: [
        { title: "Sum", f: "(f + g)(x) = f(x) + g(x)", d: "Add the outputs pointwise. Domain = intersection of individual domains.", ex: "If $f(x) = x^2$ and $g(x) = 2x$, then $(f+g)(x) = x^2 + 2x$.", tip: "Just add the two formulas!" },
        { title: "Product", f: "(f \\cdot g)(x) = f(x) \\cdot g(x)", d: "Multiply the outputs pointwise.", ex: "If $f(x) = x$ and $g(x) = x + 1$, then $(fg)(x) = x(x+1) = x^2 + x$.", tip: "Multiply like you would any two expressions!" },
        { title: "Quotient", f: "(f/g)(x) = f(x)/g(x), \\; g(x) \\neq 0", d: "Divide the outputs. MUST exclude zeros of $g$ from the domain.", ex: "$(x^2)/(2x) = x/2$ for $x \\neq 0$.", tip: "Always check: where does the denominator = 0?" },
        { title: "Domain of Combined", f: "\\text{Dom}(f \\star g) = \\text{Dom}(f) \\cap \\text{Dom}(g)", d: "For $f/g$, additionally exclude $\\{x : g(x) = 0\\}$.", ex: "$f(x) = \\sqrt{x}, g(x) = \\sqrt{4-x}$. Domain of $f+g$: $[0, 4]$.", tip: "Intersection first, then remove zeros for division!" }
      ]
    }
  }
];

// ─── COMPONENT ────────────────────────────────────────────────────────────
export default function RelFuncSkills() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

  // ─── ACTIVE SKILL VIEW (Learn / Practice / Assessment) ──────────────────
  if (view !== "list" && skill) {
    return (
      <div className={`mat-page mat-skill-runtime ${view === "practice" ? "mat-skill-runtime--practice" : ""} ${view === "assessment" ? "mat-skill-runtime--assessment" : ""}`}
        style={{ background: "#f8fafc", minHeight: "100vh", padding: "20px 0 60px" }}>
        <nav className="mat-intro-nav">
          <button className="mat-intro-nav-back" onClick={() => { setView("list"); setSelectedLearnIdx(0); }}>
            ← Back to Skills
          </button>
          <div className="mat-intro-nav-links">
            <button className="mat-intro-nav-link" onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
            <button className="mat-intro-nav-link" onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
            <button className="mat-intro-nav-link mat-intro-nav-link--active">🎯 Skills</button>
            <button className="mat-intro-nav-link" onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
            <button className="mat-intro-nav-link" onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
          </div>
        </nav>

        <div className="mat-skill-runtime-body" style={{ padding: "0 24px" }}>
          {view === "learn" ? (
            <div className="mat-lexicon-container" style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, justifyContent: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{skill.icon}</div>
                <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.5rem", fontWeight: 900, color: "var(--mat-text)", margin: 0 }}>{skill.title}</h1>
              </div>
              <div style={{ background: `${skill.color}08`, borderRadius: 20, padding: "24px 28px", marginBottom: 40, border: `1px solid ${skill.color}20` }}>
                <p style={{ fontSize: "1.05rem", color: "var(--mat-muted)", lineHeight: 1.7, margin: 0, fontWeight: 500 }}><LatexText text={skill.learn.concept} /></p>
              </div>

              {/* Rule Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 40 }}>
                {skill.learn.rules.map((rule, idx) => (
                  <button key={idx} onClick={() => setSelectedLearnIdx(idx)}
                    style={{
                      background: selectedLearnIdx === idx ? `${skill.color}08` : "#fff",
                      border: selectedLearnIdx === idx ? `2px solid ${skill.color}` : "2px solid #e2e8f0",
                      borderRadius: 20, padding: "24px", cursor: "pointer", textAlign: "left", transition: "all 0.2s"
                    }}>
                    <div style={{ fontSize: 11, fontWeight: 900, color: skill.color, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8 }}>Rule {idx + 1}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: "#0f172a" }}>{rule.title}</h3>
                    <div style={{ marginTop: 12, fontSize: 15, color: "#64748b", lineHeight: 1.7 }}><MathRenderer text={`$${rule.f}$`} /></div>
                  </button>
                ))}
              </div>

              {/* Selected Rule Detail */}
              {skill.learn.rules[selectedLearnIdx] && (() => {
                const r = skill.learn.rules[selectedLearnIdx];
                return (
                  <div style={{ background: "#fff", borderRadius: 24, padding: 40, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                      <div style={{ display: "inline-block", background: `${skill.color}10`, padding: "16px 40px", borderRadius: 16, fontSize: 22, fontWeight: 800 }}>
                        <MathRenderer text={`$${r.f}$`} />
                      </div>
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "#334155", marginBottom: 20 }}><MathRenderer text={r.d} /></p>
                    <div style={{ background: "#f8fafc", borderRadius: 16, padding: "16px 20px", marginBottom: 16, border: "1px solid #e2e8f0" }}>
                      <strong style={{ color: "#2563eb" }}>Example: </strong><MathRenderer text={r.ex} />
                    </div>
                    <div style={{ background: "#fffbeb", borderRadius: 16, padding: "16px 20px", border: "1px solid #fef3c7" }}>
                      <strong style={{ color: "#92400e" }}>💡 Tip: </strong>{r.tip}
                    </div>
                  </div>
                );
              })()}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
                <button onClick={() => setView("practice")} style={{ padding: "14px 36px", background: skill.color, color: "#fff", border: "none", borderRadius: 100, fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 8px 24px ${skill.color}30` }}>
                  Practice Now →
                </button>
                <button onClick={() => setView("assessment")} style={{ padding: "14px 36px", background: "#fff", color: skill.color, border: `2px solid ${skill.color}`, borderRadius: 100, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                  Take Assessment
                </button>
              </div>
            </div>
          ) : view === "practice" ? (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <QuizEngine
                questions={skill.practice}
                title={skill.title}
                onBack={() => setView("list")}
                onSecondaryBack={() => navigate(BASE)}
                color={skill.color}
                prefix="mat"
                nodeId={`g11-relfunc-${skill.id}-practice`}
                sessionType="practice"
              />
            </div>
          ) : (
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <AssessmentEngine
                questions={skill.assessment}
                title={skill.title}
                onBack={() => setView("list")}
                onSecondaryBack={() => navigate(BASE)}
                color={skill.color}
                prefix="mat"
                nodeId={`g11-relfunc-${skill.id}-assessment`}
                sessionType="assessment"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── SKILLS LIST VIEW ──────────────────────────────────────────────────
  return (
    <div className="mat-page" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <nav className="mat-intro-nav">
        <button className="mat-intro-nav-back" onClick={() => navigate(BASE)}>← Back to Relations & Functions</button>
        <div className="mat-intro-nav-links">
          <button className="mat-intro-nav-link" onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
          <button className="mat-intro-nav-link" onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
          <button className="mat-intro-nav-link mat-intro-nav-link--active">🎯 Skills</button>
          <button className="mat-intro-nav-link" onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
          <button className="mat-intro-nav-link" onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
        </div>
      </nav>

      <div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Relations & Functions <span className="det-intro-hero-highlight">Skills</span>
          </h1>
          <p className="det-intro-hero-sub">6 essential skills · Learn · Practice · Assess</p>
        </div>
      </div>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 24 }}>
          {SKILLS.map((sk, idx) => (
            <div key={sk.id} style={{
              background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #e2e8f0",
              position: "relative", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: sk.color }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${sk.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{sk.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: sk.color, textTransform: "uppercase", letterSpacing: "1.2px" }}>{sk.subtitle}</div>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, margin: 0, color: "#0f172a" }}>{sk.title}</h3>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 24, minHeight: 40 }}>{sk.desc}</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setActiveSkill(idx); setView("learn"); }} style={{ flex: 1, padding: "10px", borderRadius: 12, background: `${sk.color}08`, border: `1.5px solid ${sk.color}25`, color: sk.color, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>📘 Learn</button>
                <button onClick={() => { setActiveSkill(idx); setView("practice"); }} style={{ flex: 1, padding: "10px", borderRadius: 12, background: sk.color, border: "none", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", boxShadow: `0 4px 14px ${sk.color}30` }}>🎯 Practice</button>
                <button onClick={() => { setActiveSkill(idx); setView("assessment"); }} style={{ flex: 1, padding: "10px", borderRadius: 12, background: "#1e1b4b", border: "none", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>📝 Assess</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
