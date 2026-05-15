import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../class-12/Matrices/Matrices.css";
import "../../../../../class-12/Matrices/MatricesPages.css";
import MathRenderer from "../../../../../../MathRenderer";
import { useSessionLogger } from "@/hooks/useSessionLogger";
import { NODE_IDS } from "@/lib/curriculumIds";

const BASE = "/senior/grade/11/maths/linear-inequalities";

const TERMS = [
  {
    name: "Inequality",
    color: "#6366f1",
    icon: "≠",
    def: "A mathematical statement comparing two expressions using $<$, $>$, $\\leq$, or $\\geq$. Unlike equations, inequalities represent a range of values.",
    examples: ["$3 > 1$", "$x < 5$", "$2x + 1 \\geq 7$"],
    inUse: [
      "An inequality has infinitely many solutions (an interval or ray), unlike an equation.",
      "Speed limit sign: Speed $\\leq$ 80 km/h — this is an inequality constraint.",
      "Strict inequalities ($<$, $>$) exclude the boundary; non-strict ($\\leq$, $\\geq$) include it."
    ],
    memory: "Inequality = 'Not Equal' — it describes a range, not a single point!"
  },
  {
    name: "Linear Inequality",
    color: "#0891b2",
    icon: "📐",
    def: "An inequality in which the highest power of the variable is 1. General form: $ax + b < c$ (one variable) or $ax + by < c$ (two variables).",
    examples: ["$2x - 3 > 5$", "$3x + 2y \\leq 12$", "$-x + 4 \\geq 0$"],
    inUse: [
      "Linear means degree 1 — no $x^2$, $x^3$ etc.",
      "$2x + 5 < 11$ is linear. $x^2 < 9$ is NOT linear (it is quadratic).",
      "The graph of a linear inequality in two variables is always a half-plane."
    ],
    memory: "Linear = Straight line boundary. The 'Linear' in linear inequality means the boundary is a LINE!"
  },
  {
    name: "Solution Set",
    color: "#f59e0b",
    icon: "✅",
    def: "The set of all values of the variable that satisfy the inequality. For one variable, it is typically an interval or union of intervals on the real line.",
    examples: ["Solution of $x > 3$: $\\{x \\in \\mathbb{R} : x > 3\\} = (3, \\infty)$"],
    inUse: [
      "Solution set of $2x - 1 < 5$ is $x < 3$, written as $(-\\infty, 3)$.",
      "A solution set can be empty (no solution) or all of $\\mathbb{R}$.",
      "Every value in the solution set satisfies the original inequality."
    ],
    memory: "Solution set = the 'winner's circle' — all values that make the inequality true!"
  },
  {
    name: "Open Interval",
    color: "#ec4899",
    icon: "○○",
    def: "An interval $(a, b)$ representing $a < x < b$, where both endpoints $a$ and $b$ are EXCLUDED. Corresponds to strict inequalities ($<$, $>$).",
    examples: ["$(2, 5)$: all $x$ with $2 < x < 5$", "$(-\\infty, 3)$: all $x < 3$"],
    inUse: [
      "Open circle $○$ on number line at excluded endpoint.",
      "$(2, 5)$ does not include $2$ or $5$ — you can get arbitrarily close but never reach them.",
      "Round parenthesis $( )$ always denotes an open (excluded) endpoint."
    ],
    memory: "Open = Open door — the boundary is NOT included. Round bracket = open end!"
  },
  {
    name: "Closed Interval",
    color: "#7c3aed",
    icon: "●●",
    def: "An interval $[a, b]$ representing $a \\leq x \\leq b$, where both endpoints are INCLUDED. Corresponds to non-strict inequalities ($\\leq$, $\\geq$).",
    examples: ["$[1, 6]$: all $x$ with $1 \\leq x \\leq 6$", "$[0, \\infty)$: all $x \\geq 0$"],
    inUse: [
      "Filled circle $●$ on number line at included endpoint.",
      "$[1, 6]$ includes $1$ and $6$ — they are part of the solution.",
      "Square bracket $[ ]$ always denotes a closed (included) endpoint."
    ],
    memory: "Closed = Closed door — the boundary IS included. Square bracket = closed end!"
  },
  {
    name: "Strict Inequality",
    color: "#10b981",
    icon: "<",
    def: "An inequality using $<$ or $>$, where the boundary value is NOT included in the solution. Represented by open circles on a number line and dashed boundary lines in 2D.",
    examples: ["$x < 5$ (open circle at 5)", "$2x + y > 6$ (dashed boundary)"],
    inUse: [
      "On a number line: open circle $○$ at the boundary value.",
      "In 2D: dashed boundary line (points ON the line are not solutions).",
      "Speed strictly less than 80 km/h means 80 is the limit but NOT included."
    ],
    memory: "Strict = Strictly excluded — the boundary point is off-limits!"
  },
  {
    name: "Non-Strict Inequality",
    color: "#0369a1",
    icon: "≤",
    def: "An inequality using $\\leq$ or $\\geq$, where the boundary value IS included in the solution. Represented by filled circles on a number line and solid boundary lines in 2D.",
    examples: ["$x \\leq 5$ (filled circle at 5)", "$3x + y \\geq 9$ (solid boundary)"],
    inUse: [
      "On a number line: filled circle $●$ at the boundary value.",
      "In 2D: solid boundary line (points ON the line ARE solutions).",
      "Elevator capacity: weight $\\leq$ 500 kg — exactly 500 kg is allowed."
    ],
    memory: "Non-strict = 'At least' / 'At most' — includes the boundary!"
  },
  {
    name: "Boundary Line",
    color: "#d97706",
    icon: "—",
    def: "The line $ax + by = c$ that separates the plane into two half-planes for the inequality $ax + by \\leq c$ or $ax + by \\geq c$.",
    examples: ["For $2x + y \\leq 6$: boundary is $2x + y = 6$", "Passes through $(0, 6)$ and $(3, 0)$"],
    inUse: [
      "Dashed boundary line for strict inequality (points on line excluded).",
      "Solid boundary line for non-strict (points on line included).",
      "Always draw the boundary first, then determine which side to shade."
    ],
    memory: "Boundary Line = 'The Fence' — it divides the plane into two territories!"
  },
  {
    name: "Half-Plane",
    color: "#ef4444",
    icon: "▓",
    def: "One of the two infinite regions created when a line divides the coordinate plane. The solution to a linear inequality in two variables is always a half-plane.",
    examples: ["$y > x$: upper half-plane (above $y = x$)", "$x \\leq 3$: left half-plane"],
    inUse: [
      "Use a test point (usually origin) to determine which half-plane to shade.",
      "If the test point satisfies the inequality, shade that side; otherwise shade the other.",
      "The half-plane may or may not include the boundary line."
    ],
    memory: "Half-plane = Half the world — one infinite side of the boundary line!"
  },
  {
    name: "Feasible Region",
    color: "#8b5cf6",
    icon: "🗺️",
    def: "The region satisfying ALL constraints in a system of linear inequalities simultaneously. It is the intersection of all individual half-planes.",
    examples: ["$x \\geq 0$, $y \\geq 0$, $x + y \\leq 5$: triangle in Q1"],
    inUse: [
      "Feasible region = intersection of all solution regions.",
      "If the feasible region is empty, the system has no solution.",
      "Corner points (vertices) of the feasible region are where two boundary lines meet."
    ],
    memory: "Feasible = 'Feasible plan' — the region where ALL conditions can be met simultaneously!"
  },
  {
    name: "Number Line Representation",
    color: "#14b8a6",
    icon: "←——→",
    def: "The graphical display of the solution set of a one-variable inequality on a real number line, using open/closed circles and arrows or shaded segments.",
    examples: ["$x > 2$: open circle at 2, arrow pointing right", "$-1 \\leq x < 4$: closed at $-1$, open at $4$, segment between"],
    inUse: [
      "Open circle $○$ at $a$ means $a$ is NOT in the solution.",
      "Filled circle $●$ at $a$ means $a$ IS in the solution.",
      "Arrow pointing left: solutions go to $-\\infty$. Arrow pointing right: solutions go to $+\\infty$."
    ],
    memory: "Number line rep = 'inequality selfie' — shows exactly which numbers satisfy the condition!"
  },
  {
    name: "System of Inequalities",
    color: "#f97316",
    icon: "⊓",
    def: "Two or more inequalities that must all be satisfied simultaneously. The solution is the intersection of the solution sets of all individual inequalities.",
    examples: [
      "$x + y \\leq 6$, $2x + y \\leq 8$, $x \\geq 0$, $y \\geq 0$",
      "Solution: the region satisfying ALL four conditions"
    ],
    inUse: [
      "Graph each inequality separately, then find the overlapping (common) region.",
      "Systems with contradictory constraints have an empty feasible region (no solution).",
      "Every Linear Programming problem is a system of inequalities."
    ],
    memory: "System = 'Team of rules' — EVERY member of the team must be satisfied!"
  }
];

const RULES = [
  {
    title: "Addition & Subtraction Rule",
    formula: "a > b \\Rightarrow a \\pm c > b \\pm c",
    detail: "Adding or subtracting the same real number from both sides NEVER changes the direction of the inequality. This applies to any $c$ — positive, negative, or zero.",
    color: "#6366f1"
  },
  {
    title: "Multiplication by Positive",
    formula: "a > b \\text{ and } c > 0 \\Rightarrow ac > bc",
    detail: "Multiplying both sides by a POSITIVE number preserves the direction of the inequality. Similarly for division by a positive number.",
    color: "#0891b2"
  },
  {
    title: "Multiplication by Negative — FLIP!",
    formula: "a > b \\text{ and } c < 0 \\Rightarrow ac < bc",
    detail: "Multiplying or dividing both sides by a NEGATIVE number REVERSES the inequality direction. This is the most critical rule — never forget to flip! Example: $-3x > 9 \\Rightarrow x < -3$.",
    color: "#ef4444"
  },
  {
    title: "Transitive Property",
    formula: "a > b \\text{ and } b > c \\Rightarrow a > c",
    detail: "The inequality relationship is transitive. If $a$ is greater than $b$, and $b$ is greater than $c$, then $a$ is greater than $c$. This allows chaining inequalities.",
    color: "#f59e0b"
  },
  {
    title: "Adding Inequalities (same direction)",
    formula: "a > b \\text{ and } c > d \\Rightarrow a + c > b + d",
    detail: "Inequalities pointing in the SAME direction can be added. If $a > b$ and $c > d$, then $a + c > b + d$. You CANNOT subtract inequalities this way, and you cannot add inequalities in opposite directions without additional conditions.",
    color: "#7c3aed"
  },
  {
    title: "Interval Notation Rule",
    formula: "[a, b] \\leftrightarrow a \\leq x \\leq b; \\; (a, b) \\leftrightarrow a < x < b",
    detail: "Square brackets $[$ $]$ denote included endpoints (non-strict inequalities $\\leq$, $\\geq$). Round brackets $($ $)$ denote excluded endpoints (strict inequalities $<$, $>$). Infinity always uses round brackets: $(a, \\infty)$ not $[a, \\infty]$.",
    color: "#10b981"
  }
];

const QUIZ_QUESTIONS = [
  { q: "The symbol $\\leq$ represents:", opts: ["Less than or equal to", "Less than only", "Greater than", "Not equal to"], correct: 0, exp: "$\\leq$ means 'less than or equal to' — a non-strict inequality." },
  { q: "Multiplying both sides of $-x > 3$ by $-1$ gives:", opts: ["$x < -3$", "$x > -3$", "$x < 3$", "$x > 3$"], correct: 0, exp: "Multiply by $-1$ (negative) → flip: $x < -3$." },
  { q: "The interval $(2, 7]$ means:", opts: ["$2 < x \\leq 7$", "$2 \\leq x \\leq 7$", "$2 < x < 7$", "$2 \\leq x < 7$"], correct: 0, exp: "Round bracket at $2$ → open (excluded). Square bracket at $7$ → closed (included)." },
  { q: "On a number line, $x \\geq 4$ uses:", opts: ["Filled circle at $4$, arrow right", "Open circle at $4$, arrow right", "Filled circle at $4$, arrow left", "Open circle at $4$, arrow left"], correct: 0, exp: "$\\geq$ includes $4$ (filled circle) and goes right (greater values)." },
  { q: "The boundary line for $3x + 2y \\leq 6$ is:", opts: ["$3x + 2y = 6$ (solid)", "$3x + 2y = 6$ (dashed)", "$y = 6$", "$x = 6$"], correct: 0, exp: "Non-strict $\\leq$ → solid boundary line (boundary included in solution)." },
  { q: "The feasible region is the:", opts: ["Intersection of all half-planes", "Union of all half-planes", "Boundary lines only", "Complement of the solution"], correct: 0, exp: "Feasible region = all points satisfying EVERY constraint simultaneously = intersection." },
  { q: "The solution of $-4x > 8$ is:", opts: ["$x < -2$", "$x > -2$", "$x < 2$", "$x > 2$"], correct: 0, exp: "Divide by $-4$ (negative) → flip: $x < -2$." },
  { q: "The interval $(-\\infty, 5)$ represents:", opts: ["$x < 5$", "$x \\leq 5$", "$x > 5$", "$x \\geq 5$"], correct: 0, exp: "Open bracket at $5$ → $x < 5$ (strict). Round bracket at $-\\infty$ is always open." },
  { q: "If $a + b > c$ and $c > d + e$, then:", opts: ["$a + b > d + e$ (transitive)", "$a + b = d + e$", "$a < d$", "Cannot determine"], correct: 0, exp: "By transitivity: $a + b > c > d + e$, so $a + b > d + e$." },
  { q: "The set of all points satisfying $x \\geq 0$ and $y \\geq 0$ is:", opts: ["The first quadrant including axes", "Only the positive $x$-axis", "The entire plane", "The third quadrant"], correct: 0, exp: "$x \\geq 0$ = right of $y$-axis (including it). $y \\geq 0$ = above $x$-axis (including it). Together: Q1 + axes." }
];

const NAV_STYLE = { padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" };
const NAV_STYLE_ACTIVE = { padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "linear-gradient(135deg, #0369a1, #0891b2)", color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(3,105,161,0.3)" };

export default function LinIneqTerminology() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("terms");
  const [activeTermIdx, setActiveTermIdx] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const { startSession, logAnswer, finishSession } = useSessionLogger();
  const quizAnswersPayload = useRef([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const term = TERMS[activeTermIdx];

  const handleQuizSelect = async (idx) => {
    if (quizAnswered) return;
    setQuizSelected(idx);
    setQuizAnswered(true);
    const correct = idx === QUIZ_QUESTIONS[quizCurrent].correct;
    if (correct) setQuizScore(s => s + 1);
    const answerData = {
      question_index: quizCurrent + 1,
      answer_json: { selected: idx, text: QUIZ_QUESTIONS[quizCurrent].opts[idx] },
      is_correct: correct ? 1.0 : 0.0,
      marks_awarded: correct ? 1 : 0,
      marks_possible: 1,
      time_taken_ms: 0
    };
    quizAnswersPayload.current.push(answerData);
    await logAnswer({ questionIndex: answerData.question_index, answerJson: answerData.answer_json, isCorrect: answerData.is_correct });
  };

  const handleQuizNext = async () => {
    if (quizCurrent + 1 >= QUIZ_QUESTIONS.length) {
      setQuizFinished(true);
      await finishSession({ totalQuestions: QUIZ_QUESTIONS.length, questionsAnswered: quizAnswersPayload.current.length, answersPayload: quizAnswersPayload.current });
      return;
    }
    setQuizCurrent(c => c + 1);
    setQuizSelected(null);
    setQuizAnswered(false);
  };

  const tabs = [
    { id: "terms", label: "📚 Terminology", count: TERMS.length },
    { id: "rules", label: "📏 Golden Rules", count: RULES.length },
    { id: "quiz", label: "🧪 Test Prep", count: QUIZ_QUESTIONS.length }
  ];

  const navBar = (
    <nav className="mat-nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
      <button className="mat-nav-back" onClick={() => navigate(BASE)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#64748b" }}>
        ← Back to Linear Inequalities
      </button>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Introduction</button>
        <button style={NAV_STYLE_ACTIVE} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
        <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/skills`)}>🎯 Skills</button>
        <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
        <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
      </div>
    </nav>
  );

  return (
    <div className="mat-page">
      {navBar}

      <div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Linear Inequalities <span className="det-intro-hero-highlight">Lexicon</span>
          </h1>
          <p className="det-intro-hero-sub">12 terms · 6 rules · 10-question vocab quiz</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", margin: "32px 0", flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "12px 28px", borderRadius: "100px", fontWeight: 800, fontSize: "15px", cursor: "pointer", transition: "all 0.2s",
            border: tab === t.id ? "2px solid #0369a1" : "2px solid #e2e8f0",
            background: tab === t.id ? "linear-gradient(135deg, #0369a1, #0891b2)" : "#fff",
            color: tab === t.id ? "#fff" : "#64748b",
            boxShadow: tab === t.id ? "0 6px 20px rgba(3,105,161,0.25)" : "none"
          }}>{t.label} <span style={{ opacity: 0.7, marginLeft: 4 }}>({t.count})</span></button>
        ))}
      </div>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>

        {tab === "terms" && (
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {TERMS.map((t, idx) => (
                <button key={idx} onClick={() => setActiveTermIdx(idx)} style={{
                  display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "16px",
                  border: activeTermIdx === idx ? `2px solid ${t.color}` : "2px solid transparent",
                  background: activeTermIdx === idx ? `${t.color}08` : "#fff",
                  cursor: "pointer", textAlign: "left", transition: "all 0.2s"
                }}>
                  <span style={{ fontSize: "18px", minWidth: 28, textAlign: "center" }}>{t.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "13px", color: activeTermIdx === idx ? t.color : "#475569" }}>{t.name}</span>
                </button>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", background: `${term.color}15` }}>
                  {term.icon}
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 900, color: term.color, textTransform: "uppercase", letterSpacing: "1.2px" }}>Term {activeTermIdx + 1} of {TERMS.length}</div>
                  <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "26px", fontWeight: 900, margin: 0, color: "#0f172a" }}>{term.name}</h2>
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "20px 24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>📖 Definition</div>
                <div style={{ fontSize: "16px", lineHeight: 1.7, color: "#1e293b" }}><MathRenderer text={term.def} /></div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>💡 Examples</div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {term.examples.map((ex, i) => (
                    <div key={i} style={{ background: `${term.color}08`, padding: "10px 18px", borderRadius: "12px", border: `1px solid ${term.color}20`, fontSize: "15px", fontWeight: 600 }}>
                      <MathRenderer text={ex} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>🎯 See it in Action</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {term.inUse.map((u, i) => (
                    <div key={i} style={{ padding: "14px 18px", borderRadius: "12px", background: "#fff", border: "1px solid #e2e8f0", fontSize: "14px", lineHeight: 1.7, color: "#334155" }}>
                      <MathRenderer text={u} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)", padding: "18px 24px", borderRadius: "16px", border: "1px solid #fef3c7" }}>
                <span style={{ fontWeight: 800, color: "#92400e" }}>🧠 Memory Hack: </span>
                <span style={{ color: "#92400e", fontSize: "15px" }}>{term.memory}</span>
              </div>
            </div>
          </div>
        )}

        {tab === "rules" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(480px, 100%), 1fr))", gap: "24px" }}>
            {RULES.map((rule, idx) => (
              <div key={idx} style={{ background: "#fff", borderRadius: "24px", padding: "32px", border: "1px solid #e2e8f0", position: "relative", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: rule.color }} />
                <div style={{ fontSize: "11px", fontWeight: 900, color: rule.color, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>Rule {idx + 1}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "20px", fontWeight: 900, margin: "0 0 16px", color: "#0f172a" }}>{rule.title}</h3>
                <div style={{ background: `${rule.color}08`, padding: "16px 20px", borderRadius: "12px", border: `1px solid ${rule.color}15`, marginBottom: "16px", textAlign: "center" }}>
                  <MathRenderer text={`$${rule.formula}$`} />
                </div>
                <p style={{ margin: 0, fontSize: "15px", color: "#475569", lineHeight: 1.7 }}><MathRenderer text={rule.detail} /></p>
              </div>
            ))}
          </div>
        )}

        {tab === "quiz" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {!quizStarted ? (
              <div style={{ textAlign: "center", padding: "60px 32px", background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧪</div>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 900, marginBottom: "12px", color: "#0f172a" }}>Vocabulary Quiz</h2>
                <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "32px" }}>10 quick questions to test your terminology mastery.</p>
                <button onClick={() => {
                  startSession({ nodeId: NODE_IDS.g11MathLinIneqTerminologyQuiz, sessionType: "practice" });
                  quizAnswersPayload.current = [];
                  setQuizStarted(true);
                }} style={{ padding: "14px 40px", background: "linear-gradient(135deg, #0369a1, #0891b2)", color: "#fff", border: "none", borderRadius: "100px", fontWeight: 800, fontSize: "16px", cursor: "pointer", boxShadow: "0 8px 24px rgba(3,105,161,0.3)" }}>
                  Start Quiz
                </button>
              </div>
            ) : quizFinished ? (
              <div style={{ textAlign: "center", padding: "60px 32px", background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>{quizScore >= 8 ? "🏆" : quizScore >= 5 ? "🌟" : "💪"}</div>
                <div style={{ fontSize: "48px", fontWeight: 900, color: "#0369a1" }}>{quizScore}/{QUIZ_QUESTIONS.length}</div>
                <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "32px" }}>{quizScore >= 8 ? "Excellent mastery!" : quizScore >= 5 ? "Good progress, keep going!" : "Review the terms and try again!"}</p>
                <button onClick={() => { setQuizStarted(false); setQuizFinished(false); setQuizCurrent(0); setQuizScore(0); setQuizSelected(null); setQuizAnswered(false); quizAnswersPayload.current = []; }}
                  style={{ padding: "14px 40px", background: "linear-gradient(135deg, #0369a1, #0891b2)", color: "#fff", border: "none", borderRadius: "100px", fontWeight: 800, fontSize: "16px", cursor: "pointer" }}>
                  Try Again
                </button>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#0369a1", background: "#e0f2fe", padding: "6px 14px", borderRadius: "100px" }}>Q{quizCurrent + 1}/{QUIZ_QUESTIONS.length}</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#64748b" }}>Score: {quizScore}</span>
                </div>
                <div style={{ fontSize: "18px", fontWeight: 600, color: "#1e293b", marginBottom: "24px", lineHeight: 1.6 }}>
                  <MathRenderer text={QUIZ_QUESTIONS[quizCurrent].q} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                  {QUIZ_QUESTIONS[quizCurrent].opts.map((opt, oi) => {
                    let bg = "#fff", border = "2px solid #e2e8f0", clr = "#334155";
                    if (quizAnswered) {
                      if (oi === QUIZ_QUESTIONS[quizCurrent].correct) { bg = "rgba(16,185,129,0.05)"; border = "2px solid #10b981"; clr = "#059669"; }
                      else if (oi === quizSelected) { bg = "rgba(239,68,68,0.05)"; border = "2px solid #ef4444"; clr = "#dc2626"; }
                    } else if (oi === quizSelected) { border = "2px solid #0369a1"; bg = "#e0f2fe"; }
                    return (
                      <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: "14px 18px", borderRadius: "14px", background: bg, border, color: clr, cursor: quizAnswered ? "default" : "pointer", textAlign: "left", fontWeight: 600, fontSize: "15px", transition: "all 0.2s" }}>
                        <MathRenderer text={opt} />
                      </button>
                    );
                  })}
                </div>
                {quizAnswered && (
                  <>
                    <div style={{ background: "rgba(59,130,246,0.05)", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(59,130,246,0.1)", marginBottom: "20px", color: "#475569", fontSize: "14px" }}>
                      <strong style={{ color: "#2563eb" }}>💡 </strong><MathRenderer text={QUIZ_QUESTIONS[quizCurrent].exp} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <button onClick={handleQuizNext} style={{ padding: "12px 36px", background: "linear-gradient(135deg, #0369a1, #0891b2)", color: "#fff", border: "none", borderRadius: "100px", fontWeight: 800, cursor: "pointer" }}>
                        {quizCurrent + 1 >= QUIZ_QUESTIONS.length ? "See Results" : "Next →"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
