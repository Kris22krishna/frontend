import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Functions.css";
import MathRenderer from "../../../../../MathRenderer";
import FunctionsTopNav from "../../FunctionsTopNav";

const cards5W1H = [
  {
    q: "WHAT",
    label: "What is a Function?",
    icon: "f(x)",
    gradFrom: "#0891b2",
    gradTo: "#06b6d4",
    shadow: "rgba(6,182,212,0.35)",
    content:
      "A function is a special relation in which every input has exactly one output. If an input is assigned two different outputs, the relation is not a function.",
    fact:
      "Roll number to student, Aadhaar number to person, and mobile number to user are everyday one-output mappings.",
  },
  {
    q: "WHO",
    label: "Who shaped the idea of Functions?",
    icon: "hist",
    gradFrom: "#059669",
    gradTo: "#10b981",
    shadow: "rgba(16,185,129,0.35)",
    content:
      "The modern function idea grew through the work of Leibniz, Euler, Dirichlet, and later analysts who made the input-output rule precise.",
    fact:
      "A function does not need a simple formula. It only needs a clear rule assigning one output to each allowed input.",
  },
  {
    q: "WHEN",
    label: "When do Functions matter most?",
    icon: "time",
    gradFrom: "#b45309",
    gradTo: "#f59e0b",
    shadow: "rgba(245,158,11,0.35)",
    content:
      "Functions matter whenever one quantity depends on another: distance with time, price with quantity, temperature with day, or area with side length.",
    fact:
      "Limits, continuity, and derivatives all begin by understanding functions first.",
  },
  {
    q: "WHERE",
    label: "Where are Functions applied?",
    icon: "map",
    gradFrom: "#be185d",
    gradTo: "#ec4899",
    shadow: "rgba(236,72,153,0.35)",
    content:
      "Functions appear in finance, physics, coding, population models, machine learning, and engineering. Any system with an input-output rule can often be modeled through a function.",
    fact:
      "A graph is often the quickest way to see how a function behaves.",
  },
  {
    q: "WHY",
    label: "Why study types of Functions?",
    icon: "why",
    gradFrom: "#7c3aed",
    gradTo: "#a855f7",
    shadow: "rgba(168,85,247,0.35)",
    content:
      "Different function types behave differently. Constant functions stay flat, polynomial functions curve, rational functions break at restrictions, and modulus functions remove negative signs.",
    fact:
      "Type recognition saves time because domain and range often follow standard patterns.",
  },
  {
    q: "HOW",
    label: "How do we work with Functions?",
    icon: "solve",
    gradFrom: "#0369a1",
    gradTo: "#3b82f6",
    shadow: "rgba(59,130,246,0.35)",
    content:
      "We evaluate functions, compare them, combine them through algebra, and study domain and range restrictions. We also solve equations like $f(x)=g(x)$ to find where two rules agree.",
    fact:
      "When dividing functions, the denominator function must never become zero.",
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
            fontSize: 14,
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

export default function FunctionsIntro5W1H() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rel-intro-page">
      <FunctionsTopNav active="introduction" backLabel="Back to Functions" />

      <div className="rel-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="rel-intro-hero-deco rel-intro-hero-deco-a" />
        <div className="rel-intro-hero-deco rel-intro-hero-deco-b" />
        <div className="rel-intro-hero-inner">
          <h1 className="rel-intro-hero-title">
            Discover Functions Through{" "}
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
            Up next: terminology, function types, and the rules behind domain and range.
          </p>
          <button
            className="rel-intro-cta-btn"
            onClick={() => navigate("/senior/grade/12/functions/terminology")}
          >
            Terminology -&gt;
          </button>
        </div>
      </div>
    </div>
  );
}
