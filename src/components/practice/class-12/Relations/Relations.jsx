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
import "./Relations.css";

const MODULES = [
  {
    id: "introduction",
    path: "/senior/grade/12/relations/introduction",
    label: "Introduction",
    icon: Sparkles,
    tagline: "5W1H Exploration",
    desc: "6 big questions about Relations - what, why, who, when, where and how.",
    color: "#0891b2",
  },
  {
    id: "terminology",
    path: "/senior/grade/12/relations/terminology",
    label: "Terminology",
    icon: BookOpenText,
    tagline: "Key Terms and Rules",
    desc: "Master the language of relations - domain, range, properties, and equivalence.",
    color: "#7c3aed",
  },
  {
    id: "skills",
    path: "/senior/grade/12/relations/skills",
    label: "Skills",
    icon: Target,
    tagline: "Practice and Assessment",
    desc: "Targeted skill builders for Cartesian products, counting, domain-range, and proofs.",
    color: "#0369a1",
  },
  {
    id: "connectomics",
    path: "/senior/grade/12/relations/connectomics",
    label: "Connectomics",
    icon: Network,
    tagline: "Big Picture",
    desc: "See how relations connect to functions, graphs, databases, and real-world systems.",
    color: "#d97706",
  },
  {
    id: "exam-edge",
    path: "/senior/grade/12/relations/exam-edge",
    label: "Exam Edge",
    icon: Trophy,
    tagline: "Test Ready",
    desc: "Exam patterns, high-yield ideas, and question desk practice for Relations.",
    color: "#ef4444",
  },
];

const STATS = [
  { label: "Core Topics", num: "4" },
  { label: "Practice Problems", num: "4" },
  { label: "Chapter Links", num: "5" },
  { label: "Mastery", num: "0%" },
];

export default function Relations() {
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
            <span className="rel-title-accent">Relations</span>
          </h1>

          <p className="rel-main-sub">
            From ordered pairs to equivalence classes and functions, learn Relations with the
            same clear flow as the strongest chapters.
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
