import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { matricesIntroData } from "./MatricesIntroData";
import "../../MatricesPages.css";
import { LatexText } from "../../../../../LatexText";

/* ── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`mat-intro-card${open ? ' mat-intro-card--open' : ''}`}
      onClick={() => setOpen((o) => !o)}
      style={{
        borderColor: open ? card.gradFrom + "50" : "#e2e8f0",
        boxShadow: open ? `0 8px 32px ${card.shadow}` : "0 2px 10px rgba(0,0,0,0.07)",
      }}
    >
      {/* Gradient top strip */}
      <div
         className="mat-intro-card-strip"
         style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
      />
      <div className="mat-intro-card-main">
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
          <div style={{ flex: 1 }}>
            <div
               className="mat-intro-card-q"
               style={{ color: card.gradFrom }}
            >
               {card.q}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>{card.label}</div>
          </div>

          {/* Chevron */}
          <div
            style={{
              color: open ? card.gradFrom : "#94a3b8",
              transform: open ? "rotate(180deg)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            ▼
          </div>
        </div>

        {/* Collapsed hint */}
        {!open && <div style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginTop: '-8px', paddingLeft: '90px', paddingBottom: '24px' }}>Tap to explore →</div>}

        {/* Expanded content */}
        {open && (
          <div className="mat-intro-card-body">
            <div className="mat-intro-card-content">
              <LatexText text={card.content} />
            </div>
            <div className="mat-intro-card-fact">
              <span style={{ color: card.gradFrom, fontWeight: 800 }}>💡 Fun Fact: </span>
              <LatexText text={card.fact} />
            </div>
          </div>
        )}
      </div>
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
      <nav className="mat-nav">
        <button
          className="mat-nav-back"
          onClick={() => navigate("/senior/grade/12/matrices")}
        >
          ← Back to Matrices
        </button>
        <div className="sets-nav-links" style={{ display: 'flex', gap: '8px' }}>
          <button
            className="sets-nav-link active"
            style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(30, 27, 75, 0.3)' }}
            onClick={() => navigate("/senior/grade/12/matrices/introduction")}
          >
            🌟 Introduction
          </button>
          <button
            className="sets-nav-link"
            style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }}
            onClick={() => navigate("/senior/grade/12/matrices/terminology")}
          >
            📖 Terminology
          </button>
          <button
            className="sets-nav-link"
            style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }}
            onClick={() => navigate("/senior/grade/12/matrices/skills")}
          >
            🎯 Skills
          </button>
          <button
            className="sets-nav-link"
            style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }}
            onClick={() => navigate("/senior/grade/12/matrices/connectomics")}
          >
            🌐 Connectomics
          </button>
          <button
            className="sets-nav-link"
            style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }}
            onClick={() => navigate("/senior/grade/12/matrices/exam-edge")}
          >
            ⚔️ Exam Edge
          </button>
        </div>
      </nav>

<div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Discover Matrices Through{" "}
            <span className="det-intro-hero-highlight">6 Big Questions</span>
          </h1>
          <p className="det-intro-hero-sub">Tap each card to explore ✨</p>
        </div>
      </div>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        
        {/* Prerequisites */}
        <section style={{ marginBottom: "60px" }}>
           <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 900, marginBottom: "24px", textAlign: "center", color: "#312e81" }}>
              Prerequisites
           </h2>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
               {matricesIntroData.prerequisites.map((p, idx) => (
                   <div key={idx} style={{ background: "#fff", padding: "32px 24px", borderRadius: "24px", border: "1px solid #e2e8f0", textAlign: "center", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", transition: "all 0.3s ease" }}>
                       <div style={{ fontSize: "40px", marginBottom: "16px" }}>{p.icon}</div>
                       <h3 style={{ fontSize: "20px", fontWeight: 900, margin: "0 0 8px", color: "#0f172a" }}>{p.title}</h3>
                       <p style={{ fontSize: "15px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                   </div>
               ))}
           </div>
        </section>

        {/* 5W1H Cards Grid */}
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 900, marginBottom: "32px", textAlign: "center", color: "#312e81" }}>
           6 Big Questions
        </h2>
        <div className="mat-intro-grid">
          {matricesIntroData.cards5W1H.map((card, idx) => (
            <W1HCard key={idx} card={card} />
          ))}
        </div>

        {/* Footer CTA */}
        <div
          style={{
            marginTop: "60px",
            padding: "32px",
            background: "linear-gradient(135deg, #1e1b4b, #312e81)",
            borderRadius: "24px",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 4px" }}>
              Ready to learn the language?
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Next up: Key terms and the 6 golden rules of Matrices.
            </p>
          </div>
          <button
            onClick={() => navigate("/senior/grade/12/matrices/terminology")}
            style={{
              padding: "12px 28px",
              background: "#fff",
              color: "#1e1b4b",
              border: "none",
              borderRadius: "100px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Terminology →
          </button>
        </div>
      </main>
    </div>
  );
}
