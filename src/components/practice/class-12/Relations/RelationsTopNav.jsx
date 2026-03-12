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
    path: "/senior/grade/12/relations/introduction",
  },
  {
    id: "terminology",
    label: "Terminology",
    icon: BookOpenText,
    path: "/senior/grade/12/relations/terminology",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Target,
    path: "/senior/grade/12/relations/skills",
  },
  {
    id: "connectomics",
    label: "Connectomics",
    icon: Network,
    path: "/senior/grade/12/relations/connectomics",
  },
  {
    id: "exam-edge",
    label: "Exam Edge",
    icon: Trophy,
    path: "/senior/grade/12/relations/exam-edge",
  },
];

export default function RelationsTopNav({
  active,
  backLabel = "Back to Relations",
  backTo = "/senior/grade/12/relations",
  onBack,
}) {
  const navigate = useNavigate();

  return (
    <nav className="rel-intro-nav">
      <button
        className="rel-intro-nav-back"
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
      <div className="rel-intro-nav-links">
        {LINKS.map((link) => {
          const Icon = link.icon;

          return (
            <button
              key={link.id}
              className={`rel-intro-nav-link${
                active === link.id ? " rel-intro-nav-link--active" : ""
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
