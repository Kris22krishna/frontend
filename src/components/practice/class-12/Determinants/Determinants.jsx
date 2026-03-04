import React from "react";
import { useNavigate } from "react-router-dom";
import "./Determinants.css";

const MODULES = [
  {
    id: "introduction",
    path: "/senior/grade/12/determinants/introduction",
    label: "Introduction",
    emoji: "🌟",
    tagline: "5W1H Exploration",
    desc: "6 Big Questions about Determinants — What, Why, Who, When, Where and How.",
    gradFrom: "#0891b2",
    gradTo: "#06b6d4",
    shadow: "rgba(6,182,212,0.4)",
  },
  {
    id: "terminology",
    path: "/senior/grade/12/determinants/terminology",
    label: "Terminology",
    emoji: "📖",
    tagline: "8 Key Terms · 6 Rules",
    desc: "Master the language of Determinants — minors, cofactors, adjoint & the golden rules.",
    gradFrom: "#7c3aed",
    gradTo: "#a855f7",
    shadow: "rgba(168,85,247,0.4)",
  },
  {
    id: "skills",
    path: "/senior/grade/12/determinants/skills",
    label: "Skills",
    emoji: "🎯",
    tagline: "Practice & Assessment",
    desc: "6 core skills, practice questions and assessment questions for each topic.",
    gradFrom: "#0369a1",
    gradTo: "#3b82f6",
    shadow: "rgba(59,130,246,0.4)",
  },
];

const STATS = [
  { val: "6", label: "Big Questions", color: "#0891b2" },
  { val: "8", label: "Key Terms", color: "#7c3aed" },
  { val: "6", label: "Rules", color: "#059669" },
  { val: "6", label: "Skills", color: "#0369a1" },
  { val: "100+", label: "Practice Qs", color: "#b45309" },
];

export default function Determinants() {
  const navigate = useNavigate();

  return (
    <div className="det-fullpage">
      {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
      <div className="det-left">
        <div className="det-deco det-deco-a" />
        <div className="det-deco det-deco-b" />
        <div className="det-deco det-deco-c" />

        <div className="det-left-content">
          <h1 className="det-main-title">
            Master
            <br />
            <span className="det-title-accent">Determinants</span>
          </h1>

          <p className="det-main-sub">
            From scalar values of square matrices to solving linear systems —
            learn Determinants the way they were meant to be taught.
          </p>

          <div className="det-stats-grid">
            {STATS.map((s, i) => (
              <div className="det-stat" key={i}>
                <span className="det-stat-num" style={{ color: s.color }}>
                  {s.val}
                </span>
                <span className="det-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
      <div className="det-right">
        <p className="det-right-eyebrow">Choose a topic to explore</p>
        <div className="det-cards-col">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              className="det-card-btn"
              onClick={() => navigate(mod.path)}
            >
              <div
                className="det-card-strip"
                style={{
                  background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})`,
                }}
              />
              <div
                className="det-card-icon"
                style={{
                  background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                  boxShadow: `0 6px 20px ${mod.shadow}`,
                }}
              >
                {mod.emoji}
              </div>
              <div className="det-card-text">
                <div className="det-card-label" style={{ color: mod.gradFrom }}>
                  {mod.label}
                </div>
                <div className="det-card-tagline">{mod.tagline}</div>
                <div className="det-card-desc">{mod.desc}</div>
              </div>
              <div className="det-card-chevron" style={{ color: mod.gradFrom }}>
                ›
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
