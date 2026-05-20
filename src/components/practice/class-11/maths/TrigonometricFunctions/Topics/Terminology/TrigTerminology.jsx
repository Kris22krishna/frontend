import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../class-12/Matrices/Matrices.css";
import "../../../../../class-12/Matrices/MatricesPages.css";
import MathRenderer from "../../../../../../MathRenderer";

const BASE = "/senior/grade/11/maths/trigonometric-functions";

const TERMS = [
  {
    name: "Angle",
    color: "#0891b2",
    icon: "📐",
    def: "An angle is formed by two rays sharing a common endpoint (vertex). Measured in degrees or radians. Positive angles go counter-clockwise; negative angles go clockwise.",
    examples: ["$30°$, $-45°$, $\\frac{\\pi}{3}$ rad", "Angle in standard position: initial ray along positive x-axis"],
    inUse: [
      "Full rotation: $360° = 2\\pi$ rad.",
      "Right angle: $90° = \\frac{\\pi}{2}$ rad.",
      "Straight angle: $180° = \\pi$ rad."
    ],
    memory: "Counter-clockwise = positive (like the hands of a clock going backward = positive direction)!"
  },
  {
    name: "Radian",
    color: "#6366f1",
    icon: "🔄",
    def: "One radian is the angle subtended at the centre of a circle by an arc whose length equals the radius. $\\pi$ radians $= 180°$.",
    examples: ["$1$ rad $\\approx 57.3°$", "$\\pi$ rad $= 180°$", "$2\\pi$ rad $= 360°$"],
    inUse: [
      "Conversion: $\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\times \\frac{\\pi}{180}$.",
      "Arc length: $l = r\\theta$ (only works with radians).",
      "Sector area: $A = \\frac{1}{2}r^2\\theta$."
    ],
    memory: "Radian = arc length / radius. When arc length = radius, angle = 1 radian!"
  },
  {
    name: "Unit Circle",
    color: "#f59e0b",
    icon: "⭕",
    def: "A circle centered at the origin with radius 1. The point $P(\\cos\\theta, \\sin\\theta)$ lies on the unit circle for every angle $\\theta$.",
    examples: ["Radius $= 1$", "Equation: $x^2 + y^2 = 1$", "Point at $60°$: $(\\frac{1}{2}, \\frac{\\sqrt{3}}{2})$"],
    inUse: [
      "$x = \\cos\\theta$, $y = \\sin\\theta$ at any point on the unit circle.",
      "Pythagorean identity: $x^2 + y^2 = 1 \\implies \\cos^2\\theta + \\sin^2\\theta = 1$.",
      "Allows defining trig functions for ANY angle, not just acute."
    ],
    memory: "Unit circle = the perfect map of all trig values. Every angle has a home on it!"
  },
  {
    name: "Sine Function",
    color: "#ec4899",
    icon: "〜",
    def: "For angle $\\theta$ in standard position, $\\sin\\theta$ is the y-coordinate of the point on the unit circle. Range: $[-1, 1]$. Period: $2\\pi$.",
    examples: ["$\\sin 30° = \\frac{1}{2}$", "$\\sin 90° = 1$", "$\\sin\\frac{\\pi}{4} = \\frac{1}{\\sqrt{2}}$"],
    inUse: [
      "In a right triangle: $\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}$.",
      "Sine is an odd function: $\\sin(-\\theta) = -\\sin\\theta$.",
      "Graph: S-shaped wave oscillating between $-1$ and $1$."
    ],
    memory: "SOH: Sine = Opposite / Hypotenuse. Or: sine is the HEIGHT on the unit circle!"
  },
  {
    name: "Cosine Function",
    color: "#7c3aed",
    icon: "📉",
    def: "For angle $\\theta$, $\\cos\\theta$ is the x-coordinate of the point on the unit circle. Range: $[-1, 1]$. Period: $2\\pi$.",
    examples: ["$\\cos 60° = \\frac{1}{2}$", "$\\cos 0° = 1$", "$\\cos\\frac{\\pi}{3} = \\frac{1}{2}$"],
    inUse: [
      "In a right triangle: $\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$.",
      "Cosine is an even function: $\\cos(-\\theta) = \\cos\\theta$.",
      "Graph: starts at 1, drops to −1, then returns. Like a shifted sine."
    ],
    memory: "CAH: Cosine = Adjacent / Hypotenuse. Or: cosine is the WIDTH on the unit circle!"
  },
  {
    name: "Tangent Function",
    color: "#10b981",
    icon: "📈",
    def: "$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$. Undefined when $\\cos\\theta = 0$. Range: $\\mathbb{R}$ (all reals). Period: $\\pi$.",
    examples: ["$\\tan 45° = 1$", "$\\tan 30° = \\frac{1}{\\sqrt{3}}$", "$\\tan 90°$ is undefined"],
    inUse: [
      "In a right triangle: $\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$.",
      "Graph: has vertical asymptotes at $\\pm\\frac{\\pi}{2}, \\pm\\frac{3\\pi}{2}, \\ldots$",
      "Slope of a line making angle $\\theta$ with x-axis: $m = \\tan\\theta$."
    ],
    memory: "TOA: Tangent = Opposite / Adjacent. It's the SLOPE of the radius at that angle!"
  },
  {
    name: "Cosecant (cosec)",
    color: "#ef4444",
    icon: "↕️",
    def: "$\\cosec\\theta = \\frac{1}{\\sin\\theta}$. Undefined when $\\sin\\theta = 0$. Range: $(-\\infty, -1] \\cup [1, \\infty)$.",
    examples: ["$\\cosec 30° = 2$", "$\\cosec 90° = 1$", "$\\cosec 0°$ undefined"],
    inUse: [
      "Reciprocal of sine: $\\sin\\theta \\cdot \\cosec\\theta = 1$.",
      "In a right triangle: $\\cosec\\theta = \\frac{\\text{hypotenuse}}{\\text{opposite}}$.",
      "Cosec is also an odd function: $\\cosec(-\\theta) = -\\cosec\\theta$."
    ],
    memory: "CoSECant = 1/Sine. The SEC in coSECant reminds you it's the reciprocal of sine!"
  },
  {
    name: "Secant (sec)",
    color: "#0369a1",
    icon: "🔐",
    def: "$\\sec\\theta = \\frac{1}{\\cos\\theta}$. Undefined when $\\cos\\theta = 0$. Range: $(-\\infty, -1] \\cup [1, \\infty)$.",
    examples: ["$\\sec 60° = 2$", "$\\sec 0° = 1$", "$\\sec 90°$ undefined"],
    inUse: [
      "Reciprocal of cosine: $\\cos\\theta \\cdot \\sec\\theta = 1$.",
      "Identity: $\\sec^2\\theta = 1 + \\tan^2\\theta$.",
      "In a right triangle: $\\sec\\theta = \\frac{\\text{hypotenuse}}{\\text{adjacent}}$."
    ],
    memory: "SECant = 1/Cosine. Think SEC as SECurity — it's the reciprocal guard of cosine!"
  },
  {
    name: "Cotangent (cot)",
    color: "#d97706",
    icon: "↔️",
    def: "$\\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta} = \\frac{1}{\\tan\\theta}$. Undefined when $\\sin\\theta = 0$. Range: $\\mathbb{R}$. Period: $\\pi$.",
    examples: ["$\\cot 45° = 1$", "$\\cot 30° = \\sqrt{3}$", "$\\cot 90° = 0$"],
    inUse: [
      "Reciprocal of tangent.",
      "Identity: $\\cot^2\\theta + 1 = \\cosec^2\\theta$.",
      "In a right triangle: $\\cot\\theta = \\frac{\\text{adjacent}}{\\text{opposite}}$."
    ],
    memory: "COTangent = 1/Tangent. COT is just tan flipped upside down!"
  },
  {
    name: "ASTC Rule",
    color: "#8b5cf6",
    icon: "🧭",
    def: "A mnemonic for signs of trig functions in four quadrants. All → Sin → Tan → Cos (positive in Q1, Q2, Q3, Q4).",
    examples: ["Q1: All +", "Q2: Sin + (cos, tan negative)", "Q3: Tan + (sin, cos negative)", "Q4: Cos + (sin, tan negative)"],
    inUse: [
      "Remember: 'All Students Take Calculus' or 'Add Sugar To Coffee'.",
      "Also applies to reciprocals: cosec same sign as sin; sec same sign as cos.",
      "$\\sin 150°$ is positive because $150°$ is in Q2 where sin is positive."
    ],
    memory: "All Students Take Calculus — the first letter of each word gives the positive function in each quadrant!"
  },
  {
    name: "Pythagorean Identities",
    color: "#14b8a6",
    icon: "🔄",
    def: "Three fundamental identities derived from the Pythagorean theorem on the unit circle: $\\sin^2\\theta + \\cos^2\\theta = 1$, $1 + \\tan^2\\theta = \\sec^2\\theta$, $1 + \\cot^2\\theta = \\cosec^2\\theta$.",
    examples: ["$\\sin^2\\theta + \\cos^2\\theta = 1$", "$\\sec^2\\theta - \\tan^2\\theta = 1$", "$\\cosec^2\\theta - \\cot^2\\theta = 1$"],
    inUse: [
      "If $\\sin\\theta = \\frac{3}{5}$, then $\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}$.",
      "Used to simplify trigonometric expressions.",
      "Central tool in proving trig identities."
    ],
    memory: "They all come from $x^2 + y^2 = 1$ on the unit circle — one source, three identities!"
  },
  {
    name: "Periodicity",
    color: "#06b6d4",
    icon: "🔁",
    def: "Trig functions repeat their values at regular intervals. $\\sin$ and $\\cos$ have period $2\\pi$; $\\tan$ and $\\cot$ have period $\\pi$.",
    examples: ["$\\sin(x + 2\\pi) = \\sin x$", "$\\tan(x + \\pi) = \\tan x$", "$\\cos(-x) = \\cos x$"],
    inUse: [
      "Evaluate $\\sin(7\\pi/6) = \\sin(\\pi + \\pi/6) = -\\sin(\\pi/6) = -1/2$.",
      "Graph of $\\sin x$ repeats every $2\\pi$ units.",
      "Used in solving trigonometric equations for general solutions."
    ],
    memory: "Sine and cosine take a full circle (2π) to return; tangent takes only half a circle (π)!"
  },
];

const RULES = [
  {
    title: "Degree–Radian Conversion",
    formula: "\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\times \\frac{\\pi}{180}",
    detail: "Multiply degrees by π/180 to get radians. Divide by π/180 (multiply by 180/π) to convert back. Key: $\\pi = 180°$, $2\\pi = 360°$, $\\frac{\\pi}{2} = 90°$.",
    color: "#0891b2"
  },
  {
    title: "Pythagorean Identity",
    formula: "\\sin^2\\theta + \\cos^2\\theta = 1",
    detail: "The most important identity — directly from the unit circle equation $x^2 + y^2 = 1$. Also gives: $1 + \\tan^2\\theta = \\sec^2\\theta$ and $1 + \\cot^2\\theta = \\cosec^2\\theta$.",
    color: "#6366f1"
  },
  {
    title: "ASTC Sign Rule",
    formula: "\\text{All → Sin → Tan → Cos (positive in Q1 → Q2 → Q3 → Q4)}",
    detail: "In Q1: all positive. Q2: only sin (and cosec) positive. Q3: only tan (and cot) positive. Q4: only cos (and sec) positive. Mnemonic: All Students Take Calculus.",
    color: "#f59e0b"
  },
  {
    title: "Allied Angle Formulas",
    formula: "\\sin(\\pi - \\theta) = \\sin\\theta, \\quad \\cos(\\pi + \\theta) = -\\cos\\theta",
    detail: "For odd multiples of π/2: function changes (sin↔cos, tan↔cot). For even multiples (π, 2π): function stays. Sign determined by ASTC. Key examples: $\\sin(\\pi-\\theta) = \\sin\\theta$, $\\tan(\\pi+\\theta) = \\tan\\theta$.",
    color: "#ec4899"
  },
  {
    title: "Sum & Difference Formulas",
    formula: "\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B",
    detail: "Also: $\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B$ and $\\tan(A+B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}$. Used to find exact values of non-standard angles like 75°, 15°.",
    color: "#7c3aed"
  },
  {
    title: "General Solution of Trig Equations",
    formula: "\\sin x = \\sin\\alpha \\Rightarrow x = n\\pi + (-1)^n\\alpha, \\quad n \\in \\mathbb{Z}",
    detail: "For cosine: $\\cos x = \\cos\\alpha \\Rightarrow x = 2n\\pi \\pm \\alpha$. For tangent: $\\tan x = \\tan\\alpha \\Rightarrow x = n\\pi + \\alpha$. These cover ALL solutions, not just the principal value.",
    color: "#10b981"
  }
];

const QUIZ_QUESTIONS = [
  { q: "1 radian equals approximately:", opts: ["$57.3°$", "$90°$", "$45°$", "$180°$"], correct: 0, exp: "$1$ rad $= \\frac{180°}{\\pi} \\approx 57.3°$." },
  { q: "$\\pi$ radians equals:", opts: ["$180°$", "$360°$", "$90°$", "$270°$"], correct: 0, exp: "$\\pi$ rad $= 180°$ — the fundamental conversion." },
  { q: "On the unit circle, $\\cos\\theta$ is the:", opts: ["x-coordinate of P", "y-coordinate of P", "Slope of radius", "Angle in degrees"], correct: 0, exp: "$(\\cos\\theta, \\sin\\theta)$ is the point P on the unit circle." },
  { q: "The range of $\\sin\\theta$ is:", opts: ["$[-1, 1]$", "$[0, 1]$", "$\\mathbb{R}$", "$[0, \\infty)$"], correct: 0, exp: "Sine oscillates between $-1$ and $1$." },
  { q: "$\\sin^2\\theta + \\cos^2\\theta$ always equals:", opts: ["$1$", "$0$", "$2$", "$\\frac{1}{2}$"], correct: 0, exp: "Pythagorean identity — always true!" },
  { q: "In which quadrant is $\\sin$ positive but $\\cos$ negative?", opts: ["Quadrant II", "Quadrant I", "Quadrant III", "Quadrant IV"], correct: 0, exp: "Q-II (90° to 180°): sin is positive, cos is negative." },
  { q: "$\\tan 90°$ is:", opts: ["Undefined", "$0$", "$1$", "$\\infty$"], correct: 0, exp: "$\\cos 90° = 0$, so $\\tan 90° = \\sin 90°/\\cos 90°$ is undefined." },
  { q: "The period of $\\tan x$ is:", opts: ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$4\\pi$"], correct: 0, exp: "$\\tan(x + \\pi) = \\tan x$. Period is $\\pi$." },
  { q: "$\\sin(\\pi - \\theta)$ equals:", opts: ["$\\sin\\theta$", "$-\\sin\\theta$", "$\\cos\\theta$", "$-\\cos\\theta$"], correct: 0, exp: "Allied angle rule: $\\sin(\\pi - \\theta) = \\sin\\theta$." },
  { q: "If $\\sin\\theta = \\frac{3}{5}$, then $\\cos^2\\theta$ is:", opts: ["$\\frac{16}{25}$", "$\\frac{9}{25}$", "$\\frac{4}{5}$", "$\\frac{1}{5}$"], correct: 0, exp: "$\\cos^2\\theta = 1 - \\sin^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}$." },
];

export default function TrigTerminology() {
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

  const navBar = (
    <nav className="mat-nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
      <button className="mat-nav-back" onClick={() => navigate(BASE)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#64748b" }}>
        ← Back to Trigonometric Functions
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

      <div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Trigonometric Functions <span className="det-intro-hero-highlight">Lexicon</span>
          </h1>
          <p className="det-intro-hero-sub">12 terms · 6 rules · 10-question vocab quiz</p>
        </div>
      </div>

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
                  <span style={{ fontSize: "20px" }}>{t.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "14px", color: activeTermIdx === idx ? t.color : "#475569" }}>{t.name}</span>
                </button>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", background: `${term.color}15`, boxShadow: `0 4px 14px ${term.color}25` }}>{term.icon}</div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 900, color: term.color, textTransform: "uppercase", letterSpacing: "1.2px" }}>Term {activeTermIdx + 1} of {TERMS.length}</div>
                  <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 900, margin: 0, color: "#0f172a" }}>{term.name}</h2>
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
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "22px", fontWeight: 900, margin: "0 0 16px", color: "#0f172a" }}>{rule.title}</h3>
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
                <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "32px" }}>10 quick questions to test your trig terminology mastery.</p>
                <button onClick={() => { setQuizStarted(true); }} style={{ padding: "14px 40px", background: "linear-gradient(135deg, #1e1b4b, #312e81)", color: "#fff", border: "none", borderRadius: "100px", fontWeight: 800, fontSize: "16px", cursor: "pointer", boxShadow: "0 8px 24px rgba(30,27,75,0.3)" }}>Start Quiz</button>
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
