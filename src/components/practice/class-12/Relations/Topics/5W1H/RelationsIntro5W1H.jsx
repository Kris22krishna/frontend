import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Relations.css";
import MathRenderer from "../../../../../MathRenderer";
import RelationsTopNav from "../../RelationsTopNav";

const cards5W1H = [
  {
    q: "WHAT",
    label: "What is a Relation?",
    icon: "🔗",
    gradFrom: "#0891b2",
    gradTo: "#06b6d4",
    shadow: "rgba(6,182,212,0.35)",
    content:
      "In mathematics, a relation is a set of ordered pairs showing a connection between elements of two sets. If $A$ and $B$ are sets, then a relation $R$ from $A$ to $B$ is a subset of the Cartesian product $A \\times B$.\n\nIf $(x, y) \\in R$, we say $x$ is related to $y$. From the first and second coordinates, we define the domain and range.",
    fact:
      'Just as "brother of" connects two people, a mathematical relation connects two mathematical objects.',
  },
  {
    q: "WHO",
    label: "Who developed Relations formally?",
    icon: "👥",
    gradFrom: "#059669",
    gradTo: "#10b981",
    shadow: "rgba(16,185,129,0.35)",
    content:
      "Set theory pioneers like Georg Cantor built the language needed for relations. Later, Giuseppe Peano and Kazimierz Kuratowski helped formalize ordered pairs, letting relations be defined rigorously using sets.",
    fact:
      "Kuratowski showed that even ordered pairs can be defined using only sets.",
  },
  {
    q: "WHEN",
    label: "When did Relations become formal?",
    icon: "📅",
    gradFrom: "#b45309",
    gradTo: "#f59e0b",
    shadow: "rgba(245,158,11,0.35)",
    content:
      "Relations became formal during the late 19th and early 20th centuries, when mathematicians were rebuilding the foundations of mathematics with precise definitions.",
    fact:
      "Functions were defined as a special type of relation after relations themselves were formalized.",
  },
  {
    q: "WHERE",
    label: "Where are Relations applied?",
    icon: "🌍",
    gradFrom: "#be185d",
    gradTo: "#ec4899",
    shadow: "rgba(236,72,153,0.35)",
    content:
      "Relations appear in graph theory, databases, computer science, social networks, and abstract algebra. SQL tables and graph edges are practical ways of storing and studying relationships.",
    fact:
      "Relational databases are named after the mathematical concept of relations.",
  },
  {
    q: "WHY",
    label: "Why study properties of Relations?",
    icon: "🚀",
    gradFrom: "#7c3aed",
    gradTo: "#a855f7",
    shadow: "rgba(168,85,247,0.35)",
    content:
      "Properties like reflexive, symmetric, and transitive help us classify relations. When all three hold together, we get equivalence relations, which partition a set into meaningful groups.",
    fact:
      "Without equivalence relations, ideas like modular arithmetic and rational numbers would be much harder to define cleanly.",
  },
  {
    q: "HOW",
    label: "How do we work with Relations?",
    icon: "🎯",
    gradFrom: "#0369a1",
    gradTo: "#3b82f6",
    shadow: "rgba(59,130,246,0.35)",
    content:
      "Since relations are sets of ordered pairs, we use set operations, inverse relations, and composition. We also test them for important logical properties to understand their behavior.",
    fact:
      "If $|A|=m$ and $|B|=n$, then the number of possible relations from $A$ to $B$ is $2^{mn}$.",
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
        boxShadow: open
          ? `0 8px 32px ${card.shadow}`
          : "0 2px 10px rgba(0,0,0,0.07)",
      }}
    >
      <div
        className="rel-intro-card-strip"
        style={{
          background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})`,
        }}
      />

      <div className="rel-intro-card-header">
        <div
          className="rel-intro-card-icon"
          style={{
            background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
            boxShadow: `0 4px 14px ${card.shadow}`,
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
          ▼
        </div>
      </div>

      {!open && <div className="rel-intro-card-hint">Tap to explore →</div>}

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

export default function RelationsIntro5W1H() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rel-intro-page">
      <RelationsTopNav active="introduction" backLabel="Back to Relations" />

      <div className="rel-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="rel-intro-hero-deco rel-intro-hero-deco-a" />
        <div className="rel-intro-hero-deco rel-intro-hero-deco-b" />
        <div className="rel-intro-hero-inner">
          <h1 className="rel-intro-hero-title">
            Discover Relations Through{" "}
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
            Up next: terminology, properties, and structured vocabulary.
          </p>
          <button
            className="rel-intro-cta-btn"
            onClick={() => navigate("/senior/grade/12/relations/terminology")}
          >
            Terminology →
          </button>
        </div>
      </div>
    </div>
  );
}
