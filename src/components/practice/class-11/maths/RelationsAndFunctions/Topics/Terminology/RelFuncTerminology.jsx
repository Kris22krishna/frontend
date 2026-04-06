import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../class-12/Matrices/Matrices.css";
import "../../../../../class-12/Matrices/MatricesPages.css";
import MathRenderer from "../../../../../../MathRenderer";

const BASE = "/senior/grade/11/maths/relations-and-functions";

// ─── DATA ──────────────────────────────────────────────────────────────────

const TERMS = [
  {
    name: "Ordered Pair",
    color: "#6366f1",
    icon: "🎯",
    def: "An ordered pair $(a, b)$ is a pair of elements where the order matters. $(a, b) \\neq (b, a)$ unless $a = b$.",
    examples: ["$(2, 3)$", "$(x, y)$", "$(0, 0)$"],
    inUse: [
      "If $(x + 1, y - 2) = (3, 5)$, then $x = 2$ and $y = 7$.",
      "$(2, 3) \\neq (3, 2)$ because order matters.",
      "Coordinates on a graph are ordered pairs $(x, y)$."
    ],
    memory: "Think of your address: (City, State) is not the same as (State, City)!"
  },
  {
    name: "Cartesian Product",
    color: "#0891b2",
    icon: "✖️",
    def: "The Cartesian product $A \\times B$ is the set of all ordered pairs $(a, b)$ where $a \\in A$ and $b \\in B$.",
    examples: ["$\\{1,2\\} \\times \\{3,4\\} = \\{(1,3),(1,4),(2,3),(2,4)\\}$"],
    inUse: [
      "$n(A \\times B) = n(A) \\times n(B)$.",
      "$A \\times B \\neq B \\times A$ in general.",
      "If $A = \\emptyset$, then $A \\times B = \\emptyset$."
    ],
    memory: "Every item from the first set pairs with every item from the second — like a menu combo!"
  },
  {
    name: "Relation",
    color: "#f59e0b",
    icon: "🔗",
    def: "A relation $R$ from set $A$ to set $B$ is a subset of $A \\times B$. It describes how elements of $A$ are connected to elements of $B$.",
    examples: ["$R = \\{(1,2), (2,4), (3,6)\\}$", "$R: y = 2x$"],
    inUse: [
      "$R \\subseteq A \\times B$ by definition.",
      "Total possible relations from $A$ to $B$ = $2^{n(A \\times B)}$.",
      "Relations can be shown as arrow diagrams, roster form, or set-builder form."
    ],
    memory: "A relation picks some pairs from the Cartesian product — like selecting items from a menu!"
  },
  {
    name: "Domain",
    color: "#ec4899",
    icon: "📥",
    def: "The domain of a relation $R$ is the set of all first elements (inputs) in the ordered pairs of $R$.",
    examples: ["For $R = \\{(1,3),(2,5),(4,7)\\}$, Domain $= \\{1, 2, 4\\}$"],
    inUse: [
      "Domain = set of all $a$ such that $(a, b) \\in R$.",
      "For $f(x) = \\sqrt{x}$, Domain $= [0, \\infty)$.",
      "Every element of the domain must have at least one image."
    ],
    memory: "Domain = \"Door\" — the entry point where inputs come in!"
  },
  {
    name: "Range",
    color: "#7c3aed",
    icon: "📤",
    def: "The range of a relation $R$ is the set of all second elements (outputs) that are actually used.",
    examples: ["For $R = \\{(1,3),(2,5),(4,7)\\}$, Range $= \\{3, 5, 7\\}$"],
    inUse: [
      "Range $\\subseteq$ Codomain.",
      "For $f(x) = x^2$ on $\\mathbb{R}$, Range $= [0, \\infty) \\neq \\mathbb{R}$.",
      "Range is what actually gets mapped to."
    ],
    memory: "Range = \"Results\" — only the outputs that actually appear!"
  },
  {
    name: "Codomain",
    color: "#10b981",
    icon: "🌐",
    def: "The codomain is the entire set $B$ in a function $f: A \\to B$. It may contain elements that are never mapped to.",
    examples: ["For $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2$, Codomain $= \\mathbb{R}$"],
    inUse: [
      "Codomain is defined when the function is declared, not computed.",
      "Range $\\subseteq$ Codomain always.",
      "If Range = Codomain, the function is called onto (surjective)."
    ],
    memory: "Codomain is the \"Co-pilot\" — it's there, but not everything lands!"
  },
  {
    name: "Function",
    color: "#14b8a6",
    icon: "⚡",
    def: "A function $f: A \\to B$ is a relation where every element of $A$ maps to exactly one element of $B$.",
    examples: ["$f(x) = x^2$", "$f(x) = 2x + 1$"],
    inUse: [
      "Vertical Line Test: if any vertical line cuts the graph more than once, it's NOT a function.",
      "Every input has exactly one output — no exceptions.",
      "$\\{(1,2), (1,3)\\}$ is NOT a function since input $1$ maps to both $2$ and $3$."
    ],
    memory: "A function is a loyal machine: one input → exactly one output. No cheating!"
  },
  {
    name: "Identity Function",
    color: "#ef4444",
    icon: "🆔",
    def: "The identity function $f(x) = x$ maps every element to itself. Domain = Range = the set itself.",
    examples: ["$f(3) = 3$", "$f(-5) = -5$"],
    inUse: [
      "Graph is a straight line $y = x$ at $45°$.",
      "Acts as the \"do nothing\" function.",
      "In function composition, $f \\circ I = I \\circ f = f$."
    ],
    memory: "Identity = \"I am what I am!\" — every input comes out unchanged."
  },
  {
    name: "Constant Function",
    color: "#06b6d4",
    icon: "➡️",
    def: "A constant function $f(x) = c$ gives the same output for every input. Range $= \\{c\\}$.",
    examples: ["$f(x) = 5$", "$f(x) = -2$"],
    inUse: [
      "Graph is a horizontal line at $y = c$.",
      "Domain $= \\mathbb{R}$, Range $= \\{c\\}$.",
      "No matter what $x$ you substitute, you always get $c$."
    ],
    memory: "A constant function is a broken vending machine: press any button, get the same drink!"
  },
  {
    name: "Modulus Function",
    color: "#d97706",
    icon: "📐",
    def: "The modulus (absolute value) function $f(x) = |x|$ gives the distance of $x$ from zero.",
    examples: ["$|5| = 5$", "$|-3| = 3$", "$|0| = 0$"],
    inUse: [
      "Graph is V-shaped with vertex at origin.",
      "$|x| \\geq 0$ always.",
      "$|x| = \\begin{cases} x, & x \\geq 0 \\\\\\\\ -x, & x < 0 \\end{cases}$"
    ],
    memory: "Modulus strips the sign — like an \"absolute\" ruler that only measures distance!"
  },
  {
    name: "Signum Function",
    color: "#8b5cf6",
    icon: "±",
    def: "The signum function extracts the sign: $\\text{sgn}(x) = 1$ if $x > 0$, $0$ if $x = 0$, $-1$ if $x < 0$.",
    examples: ["$\\text{sgn}(7) = 1$", "$\\text{sgn}(-3) = -1$", "$\\text{sgn}(0) = 0$"],
    inUse: [
      "Range $= \\{-1, 0, 1\\}$.",
      "Useful in physics for direction.",
      "$x = |x| \\cdot \\text{sgn}(x)$."
    ],
    memory: "Signum is a traffic signal: 🟢 positive → +1, 🔴 negative → −1, 🟡 zero → 0."
  },
  {
    name: "Greatest Integer Function",
    color: "#0369a1",
    icon: "⬇️",
    def: "The greatest integer function $[x]$ (or $\\lfloor x \\rfloor$) gives the largest integer $\\leq x$.",
    examples: ["$[3.7] = 3$", "$[-1.2] = -2$", "$[5] = 5$"],
    inUse: [
      "Also called the floor function.",
      "Graph looks like a staircase.",
      "$[x] \\leq x < [x] + 1$ always."
    ],
    memory: "Floor function = \"drop to the floor\" — always round DOWN!"
  }
];

const RULES = [
  {
    title: "Cartesian Product Rule",
    formula: "n(A \\times B) = n(A) \\cdot n(B)",
    detail: "The number of ordered pairs in $A \\times B$ equals the product of the sizes. Order matters: $A \\times B \\neq B \\times A$ in general.",
    color: "#6366f1"
  },
  {
    title: "Relation Counting",
    formula: "\\text{Total relations} = 2^{n(A \\times B)}",
    detail: "Since a relation is any subset of $A \\times B$, and $A \\times B$ has $n(A) \\cdot n(B)$ elements, there are $2^{n(A) \\cdot n(B)}$ possible relations.",
    color: "#0891b2"
  },
  {
    title: "Function Rule",
    formula: "\\forall \\, a \\in A, \\; \\exists! \\; b \\in B : f(a) = b",
    detail: "Every element of the domain must map to exactly one element of the codomain. No element of the domain can be left unmapped, and no element can map to two outputs.",
    color: "#f59e0b"
  },
  {
    title: "Vertical Line Test",
    formula: "\\text{Graph is a function} \\iff \\text{every vertical line cuts it at most once}",
    detail: "Draw vertical lines through the graph. If any vertical line intersects the graph at more than one point, the graph does NOT represent a function.",
    color: "#ec4899"
  },
  {
    title: "Algebra of Functions",
    formula: "(f \\pm g)(x) = f(x) \\pm g(x), \\; (fg)(x) = f(x) \\cdot g(x)",
    detail: "Functions can be added, subtracted, multiplied, and divided pointwise. The domain of the result is the intersection of the individual domains.",
    color: "#7c3aed"
  },
  {
    title: "Domain of Quotient",
    formula: "\\left(\\frac{f}{g}\\right)(x) = \\frac{f(x)}{g(x)}, \\; g(x) \\neq 0",
    detail: "When dividing functions, exclude all $x$ where $g(x) = 0$ from the domain. Domain of $f/g$ = (Domain of $f$ ∩ Domain of $g$) $\\setminus \\{x : g(x) = 0\\}$.",
    color: "#10b981"
  }
];

const QUIZ_QUESTIONS = [
  { q: "An ordered pair where order matters is denoted:", opts: ["$(a, b)$", "$\\{a, b\\}$", "$[a, b]$", "$a \\cup b$"], correct: 0, exp: "Round brackets denote ordered pairs: $(a,b)$." },
  { q: "The Cartesian product $A \\times B$ gives a set of:", opts: ["Ordered pairs", "Subsets", "Integers", "Functions"], correct: 0, exp: "$A \\times B$ = all ordered pairs $(a,b)$." },
  { q: "A relation from $A$ to $B$ is a subset of:", opts: ["$A \\times B$", "$A \\cup B$", "$A \\cap B$", "$P(A)$"], correct: 0, exp: "By definition, $R \\subseteq A \\times B$." },
  { q: "The domain of a relation is the set of all:", opts: ["First elements", "Second elements", "All elements", "Common elements"], correct: 0, exp: "Domain = set of all first coordinates." },
  { q: "A function maps each input to:", opts: ["Exactly one output", "Multiple outputs", "No output", "At least two outputs"], correct: 0, exp: "The defining property of a function." },
  { q: "The identity function $f(x) = x$ has the graph:", opts: ["$y = x$ (45° line)", "Horizontal line", "V-shape", "Parabola"], correct: 0, exp: "Every point lies on the line $y = x$." },
  { q: "$|{-8}| =$", opts: ["$8$", "$-8$", "$0$", "$64$"], correct: 0, exp: "Modulus removes the negative sign: $|-8| = 8$." },
  { q: "$\\text{sgn}(-5) =$", opts: ["$-1$", "$0$", "$1$", "$-5$"], correct: 0, exp: "Signum of a negative number is $-1$." },
  { q: "$[2.9] =$", opts: ["$2$", "$3$", "$2.9$", "$0$"], correct: 0, exp: "Greatest integer $\\leq 2.9$ is $2$." },
  { q: "$(f + g)(x)$ equals:", opts: ["$f(x) + g(x)$", "$f(g(x))$", "$f(x) \\cdot g(x)$", "$f(x) / g(x)$"], correct: 0, exp: "Addition of functions is pointwise." }
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function RelFuncTerminology() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("terms");
  const [activeTermIdx, setActiveTermIdx] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const term = TERMS[activeTermIdx];

  const handleQuizSelect = (idx) => {
    if (quizAnswered) return;
    setQuizSelected(idx);
    setQuizAnswered(true);
    if (idx === QUIZ_QUESTIONS[quizCurrent].correct) setQuizScore(s => s + 1);
  };

  const handleQuizNext = () => {
    if (quizCurrent + 1 >= QUIZ_QUESTIONS.length) { setQuizFinished(true); return; }
    setQuizCurrent(c => c + 1);
    setQuizSelected(null);
    setQuizAnswered(false);
  };

  const tabs = [
    { id: "terms", label: "📚 Terminology", count: TERMS.length },
    { id: "rules", label: "📏 Golden Rules", count: RULES.length },
    { id: "quiz", label: "🧪 Test Prep", count: QUIZ_QUESTIONS.length }
  ];

  // ─── NAV BAR ─────────────────────────────────────────────────────────────
  const navBar = (
    <nav className="mat-nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
      <button className="mat-nav-back" onClick={() => navigate(BASE)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#64748b" }}>
        ← Back to Relations & Functions
      </button>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Introduction</button>
        <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "linear-gradient(135deg, #1e1b4b, #312e81)", color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(30,27,75,0.3)" }} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
        <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/skills`)}>🎯 Skills</button>
        <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
        <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
      </div>
    </nav>
  );

  return (
    <div className="mat-page">
      {navBar}

      {/* HERO */}
      <div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Relations & Functions <span className="det-intro-hero-highlight">Lexicon</span>
          </h1>
          <p className="det-intro-hero-sub">12 terms · 6 rules · 10-question vocab quiz</p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", margin: "32px 0", flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "12px 28px", borderRadius: "100px", fontWeight: 800, fontSize: "15px", cursor: "pointer", transition: "all 0.2s",
            border: tab === t.id ? "2px solid #312e81" : "2px solid #e2e8f0",
            background: tab === t.id ? "linear-gradient(135deg, #1e1b4b, #312e81)" : "#fff",
            color: tab === t.id ? "#fff" : "#64748b",
            boxShadow: tab === t.id ? "0 6px 20px rgba(30,27,75,0.25)" : "none"
          }}>{t.label} <span style={{ opacity: 0.7, marginLeft: 4 }}>({t.count})</span></button>
        ))}
      </div>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>
        {/* ─── TAB: TERMS ─── */}
        {tab === "terms" && (
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "32px" }}>
            {/* Left: Selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {TERMS.map((t, idx) => (
                <button key={idx} onClick={() => setActiveTermIdx(idx)} style={{
                  display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "16px",
                  border: activeTermIdx === idx ? `2px solid ${t.color}` : "2px solid transparent",
                  background: activeTermIdx === idx ? `${t.color}08` : "#fff",
                  cursor: "pointer", textAlign: "left", transition: "all 0.2s"
                }}>
                  <span style={{ fontSize: "20px" }}>{t.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "14px", color: activeTermIdx === idx ? t.color : "#475569" }}>{t.name}</span>
                </button>
              ))}
            </div>

            {/* Right: Details */}
            <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "28px", background: `${term.color}15`, boxShadow: `0 4px 14px ${term.color}25`
                }}>{term.icon}</div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 900, color: term.color, textTransform: "uppercase", letterSpacing: "1.2px" }}>Term {activeTermIdx + 1} of {TERMS.length}</div>
                  <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 900, margin: 0, color: "#0f172a" }}>{term.name}</h2>
                </div>
              </div>

              {/* Definition */}
              <div style={{ background: "#f8fafc", padding: "20px 24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>📖 Definition</div>
                <div style={{ fontSize: "16px", lineHeight: 1.7, color: "#1e293b" }}><MathRenderer text={term.def} /></div>
              </div>

              {/* Examples */}
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

              {/* In Use */}
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

              {/* Memory Hint */}
              <div style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)", padding: "18px 24px", borderRadius: "16px", border: "1px solid #fef3c7" }}>
                <span style={{ fontWeight: 800, color: "#92400e" }}>🧠 Memory Hack: </span>
                <span style={{ color: "#92400e", fontSize: "15px" }}>{term.memory}</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB: RULES ─── */}
        {tab === "rules" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(480px, 100%), 1fr))", gap: "24px" }}>
            {RULES.map((rule, idx) => (
              <div key={idx} style={{ background: "#fff", borderRadius: "24px", padding: "32px", border: "1px solid #e2e8f0", position: "relative", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: rule.color }} />
                <div style={{ fontSize: "11px", fontWeight: 900, color: rule.color, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>Rule {idx + 1}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "22px", fontWeight: 900, margin: "0 0 16px", color: "#0f172a" }}>{rule.title}</h3>
                <div style={{ background: `${rule.color}08`, padding: "16px 20px", borderRadius: "12px", border: `1px solid ${rule.color}15`, marginBottom: "16px", textAlign: "center" }}>
                  <MathRenderer text={`$${rule.formula}$`} />
                </div>
                <p style={{ margin: 0, fontSize: "15px", color: "#475569", lineHeight: 1.7 }}><MathRenderer text={rule.detail} /></p>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: QUIZ ─── */}
        {tab === "quiz" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {!quizStarted ? (
              <div style={{ textAlign: "center", padding: "60px 32px", background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧪</div>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 900, marginBottom: "12px", color: "#0f172a" }}>Vocabulary Quiz</h2>
                <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "32px" }}>10 quick questions to test your terminology mastery.</p>
                <button onClick={() => setQuizStarted(true)} style={{ padding: "14px 40px", background: "linear-gradient(135deg, #1e1b4b, #312e81)", color: "#fff", border: "none", borderRadius: "100px", fontWeight: 800, fontSize: "16px", cursor: "pointer", boxShadow: "0 8px 24px rgba(30,27,75,0.3)" }}>Start Quiz</button>
              </div>
            ) : quizFinished ? (
              <div style={{ textAlign: "center", padding: "60px 32px", background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>{quizScore >= 8 ? "🏆" : quizScore >= 5 ? "🌟" : "💪"}</div>
                <div style={{ fontSize: "48px", fontWeight: 900, color: "#312e81" }}>{quizScore}/{QUIZ_QUESTIONS.length}</div>
                <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "32px" }}>{quizScore >= 8 ? "Excellent mastery!" : quizScore >= 5 ? "Good progress, keep going!" : "Review the terms and try again!"}</p>
                <button onClick={() => { setQuizStarted(false); setQuizFinished(false); setQuizCurrent(0); setQuizScore(0); setQuizSelected(null); setQuizAnswered(false); }} style={{ padding: "14px 40px", background: "linear-gradient(135deg, #1e1b4b, #312e81)", color: "#fff", border: "none", borderRadius: "100px", fontWeight: 800, fontSize: "16px", cursor: "pointer" }}>Try Again</button>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#312e81", background: "#eef2ff", padding: "6px 14px", borderRadius: "100px" }}>Q{quizCurrent + 1}/{QUIZ_QUESTIONS.length}</span>
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
                    } else if (oi === quizSelected) { border = "2px solid #312e81"; bg = "#eef2ff"; }
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
                      <button onClick={handleQuizNext} style={{ padding: "12px 36px", background: "linear-gradient(135deg, #1e1b4b, #312e81)", color: "#fff", border: "none", borderRadius: "100px", fontWeight: 800, cursor: "pointer" }}>
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
