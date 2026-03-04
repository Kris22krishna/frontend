import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Matrices.css";
import MathRenderer from "../../../../../MathRenderer";

const cards5W1H = [
  {
    q: "WHAT",
    label: "What is a Matrix?",
    icon: "🔍",
    gradFrom: "#0891b2",
    gradTo: "#06b6d4",
    shadow: "rgba(6,182,212,0.35)",
    content: `A matrix is a rectangular arrangement of numbers (or functions) in rows and columns, enclosed in brackets. Each number is called an element. A matrix with $m$ rows and $n$ columns has order $m \\times n$. For example, $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ is a $2 \\times 2$ matrix. Matrices are the mathematical equivalent of organised data tables — powerful, compact, and structured!`,
    fact: '💡 The word "matrix" was coined by James Joseph Sylvester in 1850, from the Latin word meaning "womb" — because a matrix generates determinants!',
  },
  {
    q: "WHO",
    label: "Who uses Matrices?",
    icon: "👥",
    gradFrom: "#059669",
    gradTo: "#10b981",
    shadow: "rgba(16,185,129,0.35)",
    content: `Everyone from Netflix engineers to NASA scientists! Game developers use matrices for 3D graphics transformations. Data scientists use them for machine learning models. Economists model input-output systems. Cryptographers encode secret messages. Even your phone's GPS uses matrix calculations to find the shortest path. Engineers use them to solve systems of equations in structural analysis.`,
    fact: "💡 Netflix uses matrix factorisation to recommend movies — that's why it seems to know what you want to watch next!",
  },
  {
    q: "WHEN",
    label: "When did Matrices begin?",
    icon: "📅",
    gradFrom: "#b45309",
    gradTo: "#f59e0b",
    shadow: "rgba(245,158,11,0.35)",
    content: `Matrices date back to ancient China! The Nine Chapters on Mathematical Art (200 BCE) used rectangular arrays to solve systems of equations. In 1858, Arthur Cayley formally defined matrix algebra. Werner Heisenberg used matrix mechanics to describe quantum physics in 1925. Today, matrices power everything from AI to video games!`,
    fact: "💡 Cayley's matrix theory was so ahead of its time that it took decades for the mathematical community to fully appreciate its power!",
  },
  {
    q: "WHERE",
    label: "Where do we see Matrices?",
    icon: "🌍",
    gradFrom: "#be185d",
    gradTo: "#ec4899",
    shadow: "rgba(236,72,153,0.35)",
    content: `Matrices are everywhere! Google's PageRank algorithm uses a massive matrix to rank web pages. Image filters (blur, sharpen) apply matrix convolutions to pixel grids. Computer graphics represent 3D rotations, scaling, and translations as $4 \\times 4$ matrices. Economists use Leontief input-output matrices. Even digital music compression uses matrix transforms!`,
    fact: "💡 Every image on your screen is a matrix of pixel values — a 1080p image is a $1920 \\times 1080$ matrix of RGB triplets!",
  },
  {
    q: "WHY",
    label: "Why should I learn Matrices?",
    icon: "🚀",
    gradFrom: "#7c3aed",
    gradTo: "#a855f7",
    shadow: "rgba(168,85,247,0.35)",
    content: `Matrices are the foundation for linear algebra, which is the most widely applied branch of mathematics. They simplify complex systems of equations into compact notation. Understanding matrices opens doors to machine learning, quantum computing, computer graphics, and data science. They train you to think in terms of transformations and patterns!`,
    fact: "💡 Linear algebra (powered by matrices) is the #1 most important math for AI and machine learning engineering!",
  },
  {
    q: "HOW",
    label: "How do Matrices work?",
    icon: "🎯",
    gradFrom: "#0369a1",
    gradTo: "#3b82f6",
    shadow: "rgba(59,130,246,0.35)",
    content: `Start with understanding order (rows × columns) and element notation ($a_{ij}$). Learn the types: row, column, square, diagonal, identity, and zero matrices. Then master operations: addition (element-wise), scalar multiplication, and the dot-product-based matrix multiplication. Finally, explore transpose and inverse — the tools that make matrices truly powerful!`,
    fact: "💡 Matrix multiplication is NOT commutative — $AB \\neq BA$ in general. Order matters because matrices represent transformations!",
  },
];

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`mat-intro-card${open ? " mat-intro-card--open" : ""}`}
      onClick={() => setOpen((o) => !o)}
      style={{
        borderColor: open ? card.gradFrom + "60" : "#e2e8f0",
        boxShadow: open
          ? `0 8px 32px ${card.shadow}`
          : "0 2px 10px rgba(0,0,0,0.07)",
      }}
    >
      {/* Gradient top strip */}
      <div
        className="mat-intro-card-strip"
        style={{
          background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})`,
        }}
      />

      {/* Header row */}
      <div className="mat-intro-card-header">
        {/* Icon */}
        <div
          className="mat-intro-card-icon"
          style={{
            background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
            boxShadow: `0 4px 14px ${card.shadow}`,
          }}
        >
          {card.icon}
        </div>

        {/* Q + label */}
        <div className="mat-intro-card-title-block">
          <div className="mat-intro-card-q" style={{ color: card.gradFrom }}>
            {card.q}
          </div>
          <div className="mat-intro-card-sublabel">{card.label}</div>
        </div>

        {/* Chevron */}
        <div
          className="mat-intro-card-chevron"
          style={{
            color: open ? card.gradFrom : "#94a3b8",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          ▼
        </div>
      </div>

      {/* Collapsed hint */}
      {!open && <div className="mat-intro-card-hint">Tap to explore →</div>}

      {/* Expanded content */}
      {open && (
        <div className="mat-intro-card-body">
          <div className="mat-intro-card-content">
            <MathRenderer text={card.content} />
          </div>
          <div
            className="mat-intro-card-fact"
            style={{
              background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
              borderColor: card.gradFrom + "30",
            }}
          >
            <MathRenderer text={card.fact} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main page ───────────────────────────────────── */
export default function MatricesIntro5W1H() {
  const navigate = useNavigate();

  return (
    <div className="mat-intro-page">
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
            className="mat-intro-nav-link mat-intro-nav-link--active"
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
            className="mat-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/matrices/skills")}
          >
            🎯 Skills
          </button>
        </div>
      </nav>

      {/* ── HERO BANNER ──────────────────────────────── */}
      <div className="mat-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="mat-intro-hero-deco mat-intro-hero-deco-a" />
        <div className="mat-intro-hero-deco mat-intro-hero-deco-b" />
        <div className="mat-intro-hero-inner">
          <h1 className="mat-intro-hero-title">
            Discover Matrices Through{" "}
            <span className="mat-intro-hero-highlight">6 Big Questions</span>
          </h1>
          <p className="mat-intro-hero-sub">Tap each card to explore ✨</p>
        </div>
      </div>

      {/* ── 5W1H CARDS GRID ──────────────────────────── */}
      <div className="mat-intro-content" style={{ padding: "10px 24px 20px" }}>
        <div className="mat-intro-grid">
          {cards5W1H.map((card, idx) => (
            <W1HCard key={idx} card={card} />
          ))}
        </div>

        {/* Compact next-step strip */}
        <div className="mat-intro-cta-strip">
          <p className="mat-intro-cta-sub" style={{ margin: 0 }}>
            Up next: 9 key terms &amp; 6 golden rules
          </p>
          <button
            className="mat-intro-cta-btn"
            onClick={() => navigate("/senior/grade/12/matrices/terminology")}
          >
            Terminology →
          </button>
        </div>
      </div>
    </div>
  );
}
