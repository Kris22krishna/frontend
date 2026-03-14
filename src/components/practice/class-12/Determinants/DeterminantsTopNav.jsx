import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpenText,
  Network,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const LINKS = [
  {
    id: "introduction",
    label: "Introduction",
    icon: Sparkles,
    path: "/senior/grade/12/determinants/introduction",
  },
  {
    id: "terminology",
    label: "Terminology",
    icon: BookOpenText,
    path: "/senior/grade/12/determinants/terminology",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Target,
    path: "/senior/grade/12/determinants/skills",
  },
  {
    id: "connectomics",
    label: "Connectomics",
    icon: Network,
    path: "/senior/grade/12/determinants/connectomics",
  },
  {
    id: "exam-edge",
    label: "Exam Edge",
    icon: Trophy,
    path: "/senior/grade/12/determinants/exam-edge",
  },
];

export default function DeterminantsTopNav({
  active,
  backLabel = "Back to Determinants",
  backTo = "/senior/grade/12/determinants",
  onBack,
}) {
  const navigate = useNavigate();

  return (
    <nav className="det-intro-nav">
      <button
        className="det-intro-nav-back"
        onClick={() => {
          if (onBack) {
            onBack();
            return;
          }
          navigate(backTo);
        }}
      >
        <ArrowLeft size={16} />
        <span>{backLabel}</span>
      </button>
      <div className="det-intro-nav-links">
        {LINKS.map((link) => {
          const Icon = link.icon;

          return (
            <button
              key={link.id}
              className={`det-intro-nav-link${
                active === link.id ? " det-intro-nav-link--active" : ""
              }`}
              onClick={() => navigate(link.path)}
            >
              <Icon size={16} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
