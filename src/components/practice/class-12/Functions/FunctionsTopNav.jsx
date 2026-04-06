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
    path: "/senior/grade/12/functions/introduction",
  },
  {
    id: "terminology",
    label: "Terminology",
    icon: BookOpenText,
    path: "/senior/grade/12/functions/terminology",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Target,
    path: "/senior/grade/12/functions/skills",
  },
  {
    id: "connectomics",
    label: "Connectomics",
    icon: Network,
    path: "/senior/grade/12/functions/connectomics",
  },
  {
    id: "exam-edge",
    label: "Exam Edge",
    icon: Trophy,
    path: "/senior/grade/12/functions/exam-edge",
  },
];

export default function FunctionsTopNav({
  active,
  backLabel = "Back to Functions",
  backTo = "/senior/grade/12/functions",
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
