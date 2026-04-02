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
    path: "/senior/grade/12/inverse-trigonometric-functions/introduction",
  },
  {
    id: "terminology",
    label: "Terminology",
    icon: BookOpenText,
    path: "/senior/grade/12/inverse-trigonometric-functions/terminology",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Target,
    path: "/senior/grade/12/inverse-trigonometric-functions/skills",
  },
  {
    id: "connectomics",
    label: "Connectomics",
    icon: Network,
    path: "/senior/grade/12/inverse-trigonometric-functions/connectomics",
  },
  {
    id: "exam-edge",
    label: "Exam Edge",
    icon: Trophy,
    path: "/senior/grade/12/inverse-trigonometric-functions/exam-edge",
  },
];

export default function InverseTrigonometricFunctionsTopNav({
  active,
  backLabel = "Back to Inverse Trigonometric Functions",
  backTo = "/senior/grade/12/inverse-trigonometric-functions",
  onBack,
}) {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .itf-topnav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 14px 32px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .itf-topnav-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #0891b2;
          background: rgba(8, 145, 178, 0.08);
          border: 1.5px solid rgba(8, 145, 178, 0.25);
          border-radius: 100px;
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .itf-topnav-back:hover {
          background: rgba(8, 145, 178, 0.14);
          box-shadow: 0 4px 12px rgba(8, 145, 178, 0.18);
        }
        .itf-topnav-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .itf-topnav-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
        }
        .itf-topnav-link:hover {
          border-color: #0891b2;
          color: #0891b2;
          background: rgba(8, 145, 178, 0.06);
        }
        .itf-topnav-link--active {
          background: linear-gradient(135deg, #0891b2, #06b6d4);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(8, 145, 178, 0.35);
        }
        .itf-topnav-link--active:hover {
          background: linear-gradient(135deg, #0369a1, #0891b2);
          color: #ffffff;
        }
        @media (max-width: 768px) {
          .itf-topnav {
            padding: 12px 16px;
          }
          .itf-topnav-links {
            gap: 6px;
          }
          .itf-topnav-link {
            padding: 7px 12px;
            font-size: 12px;
          }
        }
        @media (max-width: 640px) {
          .itf-topnav {
            flex-direction: column;
            gap: 12px;
          }
          .itf-topnav-links {
            width: 100%;
            justify-content: center;
            overflow-x: auto;
            padding-bottom: 4px;
            scrollbar-width: none;
            flex-wrap: nowrap;
          }
          .itf-topnav-links::-webkit-scrollbar {
            display: none;
          }
          .itf-topnav-link {
            flex-shrink: 0;
          }
        }
      `}</style>
    <nav className="itf-topnav">
      <button
        className="itf-topnav-back"
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
      <div className="itf-topnav-links">
        {LINKS.map((link) => {
          const Icon = link.icon;

          return (
            <button
              key={link.id}
              className={`itf-topnav-link${
                active === link.id ? " itf-topnav-link--active" : ""
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
    </>
  );
}
