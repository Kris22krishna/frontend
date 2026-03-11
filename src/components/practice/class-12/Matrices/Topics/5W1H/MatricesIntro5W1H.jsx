import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { matricesIntroData } from "./MatricesIntroData";
import "../../MatricesPages.css";
import MathRenderer from "../../../../../MathRenderer";

/* ── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mat-card"
      onClick={() => setOpen((o) => !o)}
      style={{
        "--c1": card.gradFrom,
        "--c2": card.gradTo,
        "--cg": card.shadow,
        borderColor: open ? card.gradFrom + "50" : "rgba(0,0,0,0.03)",
        boxShadow: open ? `0 20px 40px ${card.shadow}` : "",
        transform: open ? "translateY(-4px)" : "",
      }}
    >
      <div className="mat-card-bg-glow" />

      {/* Header row */}
      <div className="mat-card-header">
        <div className="mat-card-icon">{card.icon}</div>
        <div style={{ flex: 1 }}>
          <div className="mat-card-q">{card.q}</div>
          <div className="mat-card-title">{card.label}</div>
        </div>
        <div
          style={{
            color: open ? card.gradFrom : "#94a3b8",
            transform: open ? "rotate(180deg)" : "none",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            fontSize: "20px",
          }}
        >
          ▼
        </div>
      </div>

      {/* Collapsed hint */}
      {!open && <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, marginTop: '-8px', paddingLeft: '84px' }}>Tap to explore →</div>}

      {/* Expanded content */}
      {open && (
        <div className="mat-card-body">
          <div className="mat-card-desc">
            <MathRenderer text={card.content} />
          </div>
          <div className="mat-card-fact">
            <strong style={{ color: card.gradFrom, display: "block", marginBottom: "4px" }}>
              💡 Fun Fact
            </strong>
            <MathRenderer text={card.fact} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page ───────────────────────────────────── */
export default function MatricesIntro5W1H() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mat-page">
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
          <button
            className="mat-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/matrices/connectomics")}
          >
            🌐 Connectomics
          </button>
          <button
            className="mat-intro-nav-link"
            onClick={() => navigate("/senior/grade/12/matrices/exam-edge")}
          >
            ⚔️ Exam Edge
          </button>
        </div>
      </nav>

      <div className="mat-hero">
        <div className="mat-hero-inner">
          <div className="mat-hero-badge">Curiosity</div>
          <h1 className="mat-hero-title">
            Discover Matrices Through <span className="mat-hero-highlight">6 Big Questions</span>
          </h1>
          <p className="mat-hero-sub">Tap each card below to explore the what, why, and how of the most powerful data structure in mathematics.</p>
        </div>
      </div>

      <main style={{ paddingBottom: "80px" }}>
        <div className="mat-cards">
          {matricesIntroData.cards5W1H.map((card, idx) => (
            <W1HCard key={idx} card={card} />
          ))}
        </div>

        {/* Beautiful CTA Strip */}
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            background: "linear-gradient(135deg, #ffffff, #f8fafc)",
            border: "1px solid #e2e8f0",
            borderRadius: "24px",
            padding: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
          }}
        >
          <div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "24px", fontWeight: 800, margin: "0 0 8px", color: "#0f172a" }}>
              Ready to learn the language?
            </h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "16px" }}>
              Next up: 9 key terms and the 6 golden rules of Matrices.
            </p>
          </div>
          <button
            onClick={() => navigate("/senior/grade/12/matrices/terminology")}
            style={{
              padding: "16px 32px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              fontWeight: 800,
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            Terminology →
          </button>
        </div>
      </main>
    </div>
  );
}
