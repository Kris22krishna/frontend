import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpenText,
  ChevronRight,
  Network,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import "./InverseTrigonometricFunctions.css";

const MODULES = [
  {
    id: "introduction",
    path: "/senior/grade/12/inverse-trigonometric-functions/introduction",
    label: "Introduction",
    icon: Sparkles,
    tagline: "5W1H Exploration",
    desc: "6 big questions about inverse trigonometric functions - what, why, who, when, where and how.",
    color: "#0891b2",
  },
  {
    id: "terminology",
    path: "/senior/grade/12/inverse-trigonometric-functions/terminology",
    label: "Terminology",
    icon: BookOpenText,
    tagline: "Key Terms and Rules",
    desc: "Master inverse, restricted domains, principal values, and standard inverse-trig branches.",
    color: "#7c3aed",
  },
  {
    id: "skills",
    path: "/senior/grade/12/inverse-trigonometric-functions/skills",
    label: "Skills",
    icon: Target,
    tagline: "Practice and Assessment",
    desc: "Train on principal values, identities, composites, and simplification questions with strong coverage.",
    color: "#0369a1",
  },
  {
    id: "connectomics",
    path: "/senior/grade/12/inverse-trigonometric-functions/connectomics",
    label: "Connectomics",
    icon: Network,
    tagline: "Big Picture",
    desc: "See how inverse trig connects trigonometry, geometry, calculus, modeling, and angle recovery.",
    color: "#d97706",
  },
  {
    id: "exam-edge",
    path: "/senior/grade/12/inverse-trigonometric-functions/exam-edge",
    label: "Exam Edge",
    icon: Trophy,
    tagline: "Test Ready",
    desc: "Board-style revision, principal value checkpoints, and exam-pattern simplification practice.",
    color: "#ef4444",
  },
];

const STATS = [
  { label: "Core Topics", num: "5" },
  { label: "Practice Tracks", num: "5" },
  { label: "Chapter Links", num: "5" },
  { label: "Mastery", num: "0%" },
];

export default function InverseTrigonometricFunctions() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const footer = document.querySelector(".main-footer");
    if (footer) footer.style.display = "none";
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, []);

  return (
    <div className="rel-fullpage">
      <div className="rel-left">
        <div className="rel-deco rel-deco-a" />
        <div className="rel-deco rel-deco-b" />
        <div className="rel-deco rel-deco-c" />

        <div className="rel-left-content">
          <button className="rel-back-link" onClick={() => navigate("/senior/grade/12")}>
            <ArrowLeft size={16} />
            <span>Grade 12</span>
          </button>

          <h1 className="rel-main-title">
            Master
            <br />
            <span className="rel-title-accent">Inverse Trigonometric Functions</span>
          </h1>

          <p className="rel-main-sub">
            Learn why domain restriction matters, how principal values work, and how to solve
            inverse-trig identities and simplification problems with the same chapter flow as the
            other Class 12 deep-dive modules.
          </p>

          <div className="rel-stats-row">
            {STATS.map((stat) => (
              <div key={stat.label} className="rel-stat-chip">
                <span className="rel-stat-chip-val">{stat.num}</span>
                <span className="rel-stat-chip-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rel-right">
        <div className="rel-right-inner">
          <div className="rel-right-eyebrow">CHOOSE YOUR PATH</div>

          <div className="rel-cards-col">
            {MODULES.map((mod) => {
              const Icon = mod.icon;

              return (
                <button
                  key={mod.id}
                  className="rel-module-card"
                  onClick={() => navigate(mod.path)}
                >
                  <div className="rel-module-strip" style={{ background: mod.color }} />
                  <div
                    className="rel-module-icon"
                    style={{ background: `${mod.color}15`, color: mod.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="rel-module-text">
                    <div className="rel-module-tagline">{mod.tagline}</div>
                    <div className="rel-module-label">{mod.label}</div>
                    <div className="rel-module-desc">{mod.desc}</div>
                  </div>
                  <div className="rel-module-chevron" style={{ color: mod.color }}>
                    <ChevronRight size={32} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
