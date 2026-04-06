import React, { useState, useEffect } from "react";
import "../../InverseTrigonometricFunctions.css";
import MathRenderer from "../../../../../MathRenderer";
import { LatexText } from "../../../../../LatexText";
import InverseTrigonometricFunctionsTopNav from "../../InverseTrigonometricFunctionsTopNav";
import {
  generateInverseConceptQuestions,
  generateInverseConceptAssessment,
  generateDefinitionValueQuestions,
  generateDefinitionValueAssessment,
  generatePropertyIdentityQuestions,
  generatePropertyIdentityAssessment,
  generatePrincipalValueQuestions,
  generatePrincipalValueAssessment,
  generateSimplificationQuestions,
  generateSimplificationAssessment,
} from "./inverseTrigonometricFunctionsQuestions";
import QuizEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine";
import AssessmentEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";

const SKILLS = [
  {
    id: "concept",
    title: "Concept and Domain Restriction",
    subtitle: "Skill 1 - Foundations",
    icon: "INV",
    color: "#0891b2",
    desc: "Understand inverse existence, one-one behavior, and why trig needs restricted domains.",
    practice: generateInverseConceptQuestions,
    assessment: generateInverseConceptAssessment,
    learn: {
      concept:
        "Inverse trigonometric functions begin with inverse-function logic: first make the trigonometric function one-one, then define its inverse on that branch.",
      rules: [
        {
          title: "Inverse of a Function",
          f: "\\text{Inverse exists only if the function is one-one and onto}",
          d: "A reversible mapping needs uniqueness and full coverage. Real-life examples include password to account access, roll number to student identity, and barcode to product.",
          ex: "If a function sends two different inputs to the same output, its inverse cannot be unique.",
          tip: "No repeated outputs if you want a clean inverse.",
        },
        {
          title: "Need for Domain Restriction",
          f: "\\sin x,\\cos x\\text{ are not one-one on }\\mathbb{R}",
          d: "Trigonometric functions repeat values periodically, so they cannot be inverted over all real numbers. We choose restricted intervals to make them one-one.",
          ex: "A standard choice is $\\sin x$ on $[-\\pi/2,\\pi/2]$.",
          tip: "Inverse trig starts by cutting the domain, not by changing the range.",
        },
        {
          title: "Principal Value Branch",
          f: "\\text{Inverse trig outputs lie in standard principal ranges}",
          d: "Each inverse trig function returns one official angle from its principal range. This is why calculators give a single answer.",
          ex: "$\\cos^{-1}x$ always returns an angle in $[0,\\pi]$.",
          tip: "Always check whether the final angle lies in the principal range.",
        },
      ],
    },
  },
  {
    id: "definitions",
    title: "Definitions and Standard Values",
    subtitle: "Skill 2 - Core Values",
    icon: "VAL",
    color: "#f59e0b",
    desc: "Learn domains, ranges, and principal values of the inverse trig families.",
    practice: generateDefinitionValueQuestions,
    assessment: generateDefinitionValueAssessment,
    learn: {
      concept:
        "Each inverse trig function has a carefully chosen domain and principal range. Standard values come from matching a trig ratio to the correct principal angle.",
      rules: [
        {
          title: "sin^-1 x and cos^-1 x",
          f: "\\sin^{-1}x: [-1,1]\\to[-\\pi/2,\\pi/2],\\ \\cos^{-1}x: [-1,1]\\to[0,\\pi]",
          d: "These functions recover angles from sine and cosine values while respecting their principal branches. They appear in navigation, physics, and triangle angle recovery.",
          ex: "$\\sin^{-1}(1/2)=\\pi/6$ and $\\cos^{-1}(-1/2)=2\\pi/3$.",
          tip: "Same domain, different principal ranges.",
        },
        {
          title: "tan^-1 x and cot^-1 x",
          f: "\\tan^{-1}x: \\mathbb{R}\\to(-\\pi/2,\\pi/2),\\ \\cot^{-1}x: \\mathbb{R}\\to(0,\\pi)",
          d: "These are useful in slope, ramp inclination, and angle of elevation problems.",
          ex: "$\\tan^{-1}(1)=\\pi/4$ and $\\cot^{-1}(-1)=3\\pi/4$.",
          tip: "Cot inverse stays positive while tan inverse is centered around zero.",
        },
        {
          title: "sec^-1 x and cosec^-1 x",
          f: "\\sec^{-1}x,\\ \\csc^{-1}x\\text{ are defined for }|x|\\ge1",
          d: "Reciprocal trig functions cannot take values inside $(-1,1)$, so their inverses are defined only outside that interval.",
          ex: "$\\sec^{-1}(2)=\\pi/3$ and $\\csc^{-1}(-2)=-\\pi/6$.",
          tip: "Reciprocal inverse domains live outside the center strip.",
        },
      ],
    },
  },
  {
    id: "properties",
    title: "Properties and Composite Functions",
    subtitle: "Skill 3 - Identities",
    icon: "ID",
    color: "#ec4899",
    desc: "Use direct identities and handle reverse composites with principal-range care.",
    practice: generatePropertyIdentityQuestions,
    assessment: generatePropertyIdentityAssessment,
    learn: {
      concept:
        "Direct trig of an inverse usually simplifies immediately, but inverse of trig needs careful principal-range thinking.",
      rules: [
        {
          title: "Basic Identities",
          f: "\\sin(\\sin^{-1}x)=x,\\ \\tan(\\tan^{-1}x)=x",
          d: "These behave like undo operations or encode-decode systems: apply a function, then reverse it directly.",
          ex: "$\\cos(\\cos^{-1}x)=x$ for $x\\in[-1,1]$.",
          tip: "Trig of matching inverse is usually the easy direction.",
        },
        {
          title: "Composite Functions",
          f: "\\sin^{-1}(\\sin x),\\ \\cos^{-1}(\\cos x),\\ \\tan^{-1}(\\tan x)",
          d: "These depend on the principal range because the inner trigonometric function may start from an angle outside the chosen branch.",
          ex: "$\\sin^{-1}(\\sin 3\\pi/4)=\\pi/4$.",
          tip: "Do not cancel in reverse order unless the angle already lies in the principal range.",
        },
        {
          title: "Important Transformation",
          f: "\\sin^{-1}x + \\cos^{-1}x = \\pi/2",
          d: "This complementary-angle identity simplifies many inverse trig expressions and shows up often in proofs.",
          ex: "Use it to rewrite $\\cos^{-1}x$ as $\\pi/2-\\sin^{-1}x$.",
          tip: "Two inverse partners often hide a complement.",
        },
      ],
    },
  },
  {
    id: "principal",
    title: "Principal Value Problems",
    subtitle: "Skill 4 - Angle Recovery",
    icon: "PV",
    color: "#7c3aed",
    desc: "Recover the correct principal-value angle in direct evaluation and composite expressions.",
    practice: generatePrincipalValueQuestions,
    assessment: generatePrincipalValueAssessment,
    learn: {
      concept:
        "Principal value problems are really about picking the right standard branch after evaluating the trigonometric part.",
      rules: [
        {
          title: "Finding Principal Values",
          f: "\\text{Answer must lie in the principal range}",
          d: "Even if many angles share the same trig value, the inverse function returns only the one in its standard branch.",
          ex: "$\\sin^{-1}(1/2)=\\pi/6$, not $5\\pi/6$.",
          tip: "Compute the trig value first, then choose the angle from the correct branch.",
        },
        {
          title: "Evaluating Expressions",
          f: "\\sin^{-1}(\\sin x),\\ \\cos^{-1}(\\cos x),\\ \\tan^{-1}(\\tan x)",
          d: "These questions test whether you can map a familiar angle back into the principal branch.",
          ex: "$\\tan^{-1}(\\tan 3\\pi/4)=-\\pi/4$.",
          tip: "Equivalent angle, principal branch, final answer.",
        },
      ],
    },
  },
  {
    id: "simplification",
    title: "Simplification of Expressions",
    subtitle: "Skill 5 - Advanced Forms",
    icon: "SIM",
    color: "#10b981",
    desc: "Simplify structured inverse-trig expressions using identities and principal-value logic.",
    practice: generateSimplificationQuestions,
    assessment: generateSimplificationAssessment,
    learn: {
      concept:
        "Advanced simplification works best when you substitute a standard angle, use a trig identity, and then verify the principal-range condition.",
      rules: [
        {
          title: "Using Identities",
          f: "\\sin^{-1}(\\sin 2\\theta)=2\\theta\\text{ when }2\\theta\\text{ stays in principal range}",
          d: "Expressions like $\\sin^{-1}(2x\\sqrt{1-x^2})$ are solved by setting $x=\\sin\\theta$ and using double-angle identities.",
          ex: "If $0\\le x\\le 1/\\sqrt{2}$, then $\\sin^{-1}(2x\\sqrt{1-x^2})=2\\sin^{-1}x$.",
          tip: "Substitute first, simplify next, branch-check last.",
        },
        {
          title: "Advanced Simplification",
          f: "\\text{Rewrite reciprocal or half-angle expressions into a standard inverse form}",
          d: "Forms involving $\\cot^{-1}$, half-angle identities, or radicals often reduce cleanly once you assign a principal-value angle.",
          ex: "$\\cot^{-1}(1/\\sqrt{x^2-1})=\\sec^{-1}x$ for $x>1$.",
          tip: "Choose a standard triangle or angle model when the algebra starts looking hidden.",
        },
      ],
    },
  },
];

export default function InverseTrigonometricFunctionsSkills() {
  const [view, setView] = useState("list");
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

  if (view !== "list" && skill) {
    return (
      <div className="itf-skills-page" style={{ background: "#f8fafc", minHeight: "100vh", padding: "20px 0 60px" }}>
        <style>{`
          .itf-details-window-anim {
            animation: itfSlideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes itfSlideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .itf-learn-grid {
            display: grid;
            grid-template-columns: minmax(280px, 320px) minmax(0, 1fr);
            gap: 18px;
            align-items: start;
          }
          .itf-skill-shell {
            max-width: 1100px;
            margin: 0 auto;
          }
          .itf-learn-sidebar {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding: 14px !important;
            max-height: none !important;
            overflow: visible !important;
            background: rgba(255,255,255,0.82) !important;
            border: 1px solid rgba(148,163,184,0.16);
            border-radius: 24px !important;
            backdrop-filter: blur(12px);
            position: static !important;
            margin: 0 !important;
            white-space: normal !important;
            box-sizing: border-box;
          }
          .itf-detail-panel {
            background: #fff;
            border-radius: 24px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.03);
            padding: 24px 28px;
          }
          .itf-rule-split {
            display: grid;
            grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.85fr);
            gap: 24px;
          }
          .itf-learn-footer {
            margin-top: 40px;
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }
          .itf-primary-btn {
            padding: 14px 32px;
            border-radius: 100px;
            font-size: 15px;
            font-weight: 800;
            border: none;
            color: #fff;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(8,145,178,0.28);
            transition: all 0.25s ease;
          }
          .itf-primary-btn:hover {
            transform: translateY(-2px);
          }
          .itf-secondary-btn {
            padding: 14px 32px;
            border-radius: 100px;
            font-size: 15px;
            font-weight: 700;
            border: 2px solid #e2e8f0;
            background: #fff;
            color: var(--rel-text);
            cursor: pointer;
            transition: all 0.25s ease;
          }
          .itf-secondary-btn:hover {
            border-color: var(--skill-color, #0891b2);
            color: var(--skill-color, #0891b2);
            transform: translateY(-2px);
          }
          .itf-learn-rule-btn {
            width: 100%;
            min-height: 72px;
            box-sizing: border-box;
            justify-content: flex-start;
            align-items: center;
            padding: 12px 14px;
            transform: none !important;
            display: flex;
            gap: 10px;
            border-radius: 14px;
            border: 1.5px solid rgba(0, 0, 0, 0.06);
            background: #fff;
            color: var(--rel-text);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            text-align: left;
            position: relative;
            overflow: hidden;
          }
          .itf-learn-rule-btn:focus {
            outline: none;
          }
          .itf-learn-rule-btn:focus-visible {
            outline: 2px solid var(--skill-color);
            outline-offset: 2px;
          }
          .itf-learn-rule-btn::before {
            content: "";
            position: absolute;
            inset: 0;
            background: #fff;
            z-index: 0;
            transition: opacity 0.2s;
            opacity: 1;
          }
          .itf-learn-rule-btn:hover::before {
            opacity: 0.9;
          }
          .itf-learn-rule-btn > * {
            position: relative;
            z-index: 1;
          }
          .itf-learn-rule-btn:hover:not(.active) {
            background: var(--skill-color-15);
            border-color: var(--skill-color);
            box-shadow: 0 4px 12px var(--skill-color-40);
          }
          .itf-learn-rule-btn.active {
            background: var(--skill-color);
            border-color: var(--skill-color);
            color: #fff;
            box-shadow: 0 10px 24px var(--skill-color-40);
          }
          .itf-learn-rule-btn.active::before {
            opacity: 0;
          }
          .itf-learn-rule-num {
            width: 24px;
            height: 24px;
            border-radius: 6px;
            background: var(--skill-color-15);
            color: var(--skill-color);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 900;
            flex-shrink: 0;
            transition: all 0.25s;
          }
          .itf-learn-rule-btn:hover:not(.active) .itf-learn-rule-num {
            background: #fff;
            color: var(--skill-color);
          }
          .itf-learn-rule-btn.active .itf-learn-rule-num {
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
          }
          .itf-learn-rule-title {
            font-weight: 700;
            font-size: 15px;
            line-height: 1.35;
          }
          @media (max-width: 860px) {
            .itf-learn-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
            .itf-learn-sidebar {
              margin-bottom: 0 !important;
            }
            .itf-rule-split {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
        <InverseTrigonometricFunctionsTopNav
          active="skills"
          backLabel="Back to Skills"
          onBack={() => {
            setView("list");
            setSelectedLearnIdx(0);
          }}
        />

        <div style={{ padding: "0 24px" }}>
          {view === "learn" ? (
            <div className="itf-skill-shell">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, justifyContent: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: skill.color }}>{skill.icon}</div>
                <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.3rem", fontWeight: 900, color: "var(--rel-text)", margin: 0 }}>Learn: {skill.title}</h1>
              </div>

              <div className="itf-learn-grid">
                <aside className="itf-learn-sidebar">
                  {skill.learn.rules.map((rule, index) => (
                    <button type="button" key={rule.title} onClick={() => setSelectedLearnIdx(index)} className={`itf-learn-rule-btn${selectedLearnIdx === index ? " active" : ""}`} style={{ "--skill-color": skill.color, "--skill-color-15": `${skill.color}15`, "--skill-color-40": `${skill.color}40` }}>
                      <div className="itf-learn-rule-num">{index + 1}</div>
                      <span className="itf-learn-rule-title">{rule.title}</span>
                    </button>
                  ))}
                </aside>

                <main key={selectedLearnIdx} className="itf-details-window-anim itf-detail-panel" style={{ border: `2px solid ${skill.color}15`, "--skill-color-15": `${skill.color}15` }}>
                  <div className="itf-learn-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <h3 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--rel-muted)" }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: skill.color }}>{skill.icon}</div>
                  </div>

                  <div style={{ background: `${skill.color}05`, padding: 24, borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 18, textAlign: "center" }}>
                    <div style={{ fontSize: 30, fontWeight: 800 }}>
                      <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 28, padding: "16px 20px", borderRadius: 18, background: "linear-gradient(180deg, rgba(248,250,252,0.98), rgba(241,245,249,0.9))", border: "1px solid rgba(148,163,184,0.16)" }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase", color: skill.color, marginBottom: 8 }}>Big Idea</div>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--rel-text)" }}><MathRenderer text={skill.learn.concept} /></p>
                  </div>

                  <div className="itf-rule-split">
                    <div>
                      <h4 style={{ textTransform: "uppercase", fontSize: 12, letterSpacing: 1, color: "var(--rel-muted)", marginBottom: 10 }}>Explanation</h4>
                      <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: "var(--rel-text)" }}><MathRenderer text={skill.learn.rules[selectedLearnIdx].d} /></p>
                      <div style={{ marginTop: 24, background: "rgba(20,184,166,0.05)", padding: 16, borderRadius: 16, border: "1px solid rgba(20,184,166,0.1)" }}>
                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--rel-muted)" }}><span style={{ fontWeight: 800, color: "var(--rel-teal)" }}>Survival Tip: </span><MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} /></p>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ textTransform: "uppercase", fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                      <div style={{ background: "#f8fafc", padding: 24, borderRadius: 20, border: "1px solid rgba(0,0,0,0.03)" }}>
                        <span style={{ display: "block", fontSize: 17, color: "var(--rel-text)" }}><LatexText text={skill.learn.rules[selectedLearnIdx].ex} /></span>
                      </div>
                    </div>
                  </div>

                  <div className="itf-learn-footer">
                    <button className="itf-primary-btn" onClick={() => setView("practice")} style={{ background: skill.color }}>Mastered this? Try Practice -&gt;</button>
                    <button className="itf-secondary-btn" onClick={() => setSelectedLearnIdx((selectedLearnIdx + 1) % skill.learn.rules.length)} style={{ "--skill-color": skill.color }}>Next: {skill.learn.rules[(selectedLearnIdx + 1) % skill.learn.rules.length].title}</button>
                  </div>
                </main>
              </div>
            </div>
          ) : view === "practice" ? (
            <QuizEngine questions={skill.practice} title={`Practice: ${skill.title}`} onBack={() => setView("list")} color={skill.color} prefix="rel" />
          ) : (
            <AssessmentEngine questions={skill.assessment} title={`Assessment: ${skill.title}`} onBack={() => setView("list")} color={skill.color} prefix="rel" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="itf-skills-page">
      <style>{`
        .itf-skill-shell {
          max-width: 1100px;
          margin: 20px auto 40px;
          padding: 0 24px;
        }
        .itf-skill-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .itf-skill-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: #fff;
          border: 1px solid rgba(148,163,184,0.16);
          border-radius: 22px;
          box-shadow: 0 10px 24px rgba(15,23,42,0.04);
        }
        .itf-skill-info {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }
        .itf-skill-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .itf-skill-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .itf-list-secondary-btn {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
          border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: #fff;
          color: var(--rel-text);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .itf-list-secondary-btn:hover {
          transform: translateY(-2px);
          border-color: #0891b2;
          color: #0891b2;
        }
        .itf-list-primary-btn {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
          border-radius: 100px;
          border: none;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(8,145,178,0.24);
        }
        .itf-list-primary-btn:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 860px) {
          .itf-skill-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .itf-skill-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
      <InverseTrigonometricFunctionsTopNav active="skills" backLabel="Back to Inverse Trigonometric Functions" />

      <div className="itf-skill-shell">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.1rem", fontWeight: 900, color: "var(--rel-text)", margin: "0 0 6px" }}>
            Inverse Trigonometric Functions{" "}
            <span style={{ background: "linear-gradient(135deg, var(--rel-teal), var(--rel-indigo))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Skills</span>
          </h1>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rel-muted)", letterSpacing: 0.5 }}>Build chapter mastery from inverse basics to advanced simplification.</div>
        </div>

        <div className="itf-skill-list">
          {SKILLS.map((skill, idx) => (
            <div key={skill.id} className="itf-skill-card">
              <div className="itf-skill-info">
                <div className="itf-skill-icon" style={{ background: `${skill.color}15` }}><span style={{ color: skill.color, fontSize: 12, fontWeight: 800 }}>{skill.icon}</span></div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: skill.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{skill.subtitle}</div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "var(--rel-text)" }}>{skill.title}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--rel-muted)" }}>{skill.desc}</p>
                </div>
              </div>
              <div className="itf-skill-actions">
                <button onClick={() => { setActiveSkill(idx); setView("learn"); setSelectedLearnIdx(0); }} className="itf-list-secondary-btn">Learn</button>
                <button onClick={() => { setActiveSkill(idx); setView("practice"); }} className="itf-list-secondary-btn">Practice</button>
                <button onClick={() => { setActiveSkill(idx); setView("assessment"); }} className="itf-list-primary-btn" style={{ background: skill.color }}>Assess</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--rel-muted)", fontWeight: 600 }}>Done with all? You are officially an <span style={{ color: "var(--rel-indigo)" }}>Inverse Trig Pro!</span></p>
        </div>
      </div>
    </div>
  );
}
