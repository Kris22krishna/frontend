import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../InverseTrigonometricFunctions.css";
import MathRenderer from "../../../../../MathRenderer";
import InverseTrigonometricFunctionsTopNav from "../../InverseTrigonometricFunctionsTopNav";

const cards5W1H = [
  {
    q: "WHAT",
    label: "What are Inverse Trigonometric Functions?",
    icon: "inv",
    gradFrom: "#0891b2",
    gradTo: "#06b6d4",
    shadow: "rgba(6,182,212,0.35)",
    content:
      "Inverse trigonometric functions recover an angle from a trigonometric value. Since ordinary trigonometric functions are not one-one on all real numbers, we first restrict their domains and then define inverses on those branches.",
    fact:
      "The answer produced by an inverse trig function is a principal value angle, not every possible angle.",
  },
  {
    q: "WHO",
    label: "Who made inverse ideas important?",
    icon: "hist",
    gradFrom: "#059669",
    gradTo: "#10b981",
    shadow: "rgba(16,185,129,0.35)",
    content:
      "Inverse functions became central once mathematicians formalized one-one mappings. In trigonometry, the need to recover angles from ratios made inverse trig functions essential in geometry, astronomy, and analysis.",
    fact:
      "Inverse trigonometric notation lets us move from ratios back to angles, which is critical in solving triangles and calculus problems.",
  },
  {
    q: "WHEN",
    label: "When do we need domain restriction?",
    icon: "cut",
    gradFrom: "#b45309",
    gradTo: "#f59e0b",
    shadow: "rgba(245,158,11,0.35)",
    content:
      "We need domain restriction whenever a function repeats outputs. For example, $\\sin x$ and $\\cos x$ take the same values many times, so they cannot have inverses over all real numbers.",
    fact:
      "Choosing $[-\\pi/2, \\pi/2]$ for sine and $[0,\\pi]$ for cosine creates unique output-to-angle recovery.",
  },
  {
    q: "WHERE",
    label: "Where are inverse trig functions used?",
    icon: "map",
    gradFrom: "#be185d",
    gradTo: "#ec4899",
    shadow: "rgba(236,72,153,0.35)",
    content:
      "Inverse trig functions appear in navigation, slope calculations, engineering design, physics angles, signal processing, and calculus integration formulas.",
    fact:
      "Whenever we know a ratio like height over distance and want the angle, inverse trig enters immediately.",
  },
  {
    q: "WHY",
    label: "Why are principal values important?",
    icon: "PV",
    gradFrom: "#7c3aed",
    gradTo: "#a855f7",
    shadow: "rgba(168,85,247,0.35)",
    content:
      "Principal values give a standard answer. Without them, one trig value could correspond to infinitely many angles, and the inverse would stop being a proper function.",
    fact:
      "Calculators always return the principal value branch, not every coterminal angle.",
  },
  {
    q: "HOW",
    label: "How do we solve inverse trig problems?",
    icon: "solve",
    gradFrom: "#0369a1",
    gradTo: "#3b82f6",
    shadow: "rgba(59,130,246,0.35)",
    content:
      "We solve inverse trig problems by checking the allowed domain and principal range, simplifying expressions using identities, and converting composite forms back into principal-value angles.",
    fact:
      "In expressions like $\\sin^{-1}(\\sin x)$, the answer depends on whether $x$ already lies in the principal range.",
  },
];

function W1HCard({ card }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rel-intro-card${open ? " rel-intro-card--open" : ""}`}
      onClick={() => setOpen((value) => !value)}
      style={{
        borderColor: open ? `${card.gradFrom}60` : "#e2e8f0",
        boxShadow: open ? `0 8px 32px ${card.shadow}` : "0 2px 10px rgba(0,0,0,0.07)",
      }}
    >
      <div
        className="rel-intro-card-strip"
        style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
      />

      <div className="rel-intro-card-header">
        <div
          className="rel-intro-card-icon"
          style={{
            background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
            boxShadow: `0 4px 14px ${card.shadow}`,
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          {card.icon}
        </div>

        <div className="rel-intro-card-title-block">
          <div className="rel-intro-card-q" style={{ color: card.gradFrom }}>
            {card.q}
          </div>
          <div className="rel-intro-card-sublabel">{card.label}</div>
        </div>

        <div
          className="rel-intro-card-chevron"
          style={{
            color: open ? card.gradFrom : "#94a3b8",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          v
        </div>
      </div>

      {!open && <div className="rel-intro-card-hint">Tap to explore -&gt;</div>}

      {open && (
        <div className="rel-intro-card-body">
          <div className="rel-intro-card-content">
            <MathRenderer text={card.content} />
          </div>
          <div
            className="rel-intro-card-fact"
            style={{
              background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
              borderColor: `${card.gradFrom}30`,
            }}
          >
            <MathRenderer text={card.fact} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function InverseTrigonometricFunctionsIntro5W1H() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rel-intro-page">
      <InverseTrigonometricFunctionsTopNav
        active="introduction"
        backLabel="Back to Inverse Trigonometric Functions"
      />

      <div className="rel-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="rel-intro-hero-deco rel-intro-hero-deco-a" />
        <div className="rel-intro-hero-deco rel-intro-hero-deco-b" />
        <div className="rel-intro-hero-inner">
          <h1 className="rel-intro-hero-title">
            Discover Inverse Trigonometric Functions Through{" "}
            <span className="rel-intro-hero-highlight">6 Big Questions</span>
          </h1>
          <p className="rel-intro-hero-sub">Tap each card to explore.</p>
        </div>
      </div>

      <div className="rel-intro-content" style={{ padding: "10px 24px 20px" }}>
        <div className="rel-intro-grid">
          {cards5W1H.map((card) => (
            <W1HCard key={card.q} card={card} />
          ))}
        </div>

        <div className="rel-intro-cta-strip">
          <p className="rel-intro-cta-sub" style={{ margin: 0 }}>
            Up next: inverse function conditions, restricted domains, and principal value branches.
          </p>
          <button
            className="rel-intro-cta-btn"
            onClick={() =>
              navigate("/senior/grade/12/inverse-trigonometric-functions/terminology")
            }
          >
            Terminology -&gt;
          </button>
        </div>
      </div>
    </div>
  );
}
