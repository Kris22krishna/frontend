import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Relations.css";
import MathRenderer from "../../../../../MathRenderer";
import { LatexText } from "../../../../../LatexText";
import {
    generateCartesianQuestions,
    generateCartesianAssessment,
    generateCountingQuestions,
    generateCountingAssessment,
    generateDomainRangeQuestions,
    generateDomainRangeAssessment,
    generateEquivalenceQuestions,
    generateEquivalenceAssessment
} from "./relationsQuestions";

import QuizEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine";
import AssessmentEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";

// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: "cartesian",
        title: "Cartesian Products",
        subtitle: "Skill 1 · Foundations",
        icon: "✖️",
        color: "#0891b2",
        desc: "Calculate and identify elements in A × B.",
        practice: generateCartesianQuestions,
        assessment: generateCartesianAssessment,
        learn: {
            concept:
                "The Cartesian Product forms the foundation of all relations. It's the set of all possible ordered pairs between two sets.",
            rules: [
                {
                    title: "Definition",
                    f: "A \\times B = \\{(a, b) \\mid a \\in A, b \\in B\\}",
                    d: "Group every element from A with every element from B in exactly that order.",
                    ex: "$A=\\{1\\}, B=\\{x,y\\} \\implies \\{(1,x), (1,y)\\}$",
                    tip: "Order matters! (1, x) is NOT the same as (x, 1)!",
                },
                {
                    title: "Number of Elements",
                    f: "n(A \\times B) = n(A) \\times n(B)",
                    d: "The total number of ordered pairs is just the product of the sizes of the two sets.",
                    ex: "$n(A)=3, n(B)=2 \\implies n(A \\times B) = 6$",
                    tip: "Just multiply the counts!",
                }
            ],
        },
    },
    {
        id: "domain_range",
        title: "Domain & Range",
        subtitle: "Skill 2 · Extraction",
        icon: "🎯",
        color: "#f59e0b",
        desc: "Extract domains and ranges from implicit and explicit relations.",
        practice: generateDomainRangeQuestions,
        assessment: generateDomainRangeAssessment,
        learn: {
            concept:
                "Domain and Range define the actual inputs and outputs used by the relation.",
            rules: [
                {
                    title: "Domain",
                    f: "\\text{Dom}(R) = \\{x \\mid (x, y) \\in R\\}",
                    d: "The set of all the FIRST coordinates.",
                    ex: "$R=\\{(1,a), (2,b)\\} \\implies \\text{Dom} = \\{1,2\\}$",
                    tip: "Look ONLY at the left side of the commas!",
                },
                {
                    title: "Range",
                    f: "\\text{Range}(R) = \\{y \\mid (x, y) \\in R\\}",
                    d: "The set of all the SECOND coordinates.",
                    ex: "$R=\\{(1,a), (2,b)\\} \\implies \\text{Range} = \\{a,b\\}$",
                    tip: "Look ONLY at the right side of the commas!",
                }
            ],
        },
    },
    {
        id: "counting",
        title: "Counting Relations",
        subtitle: "Skill 3 · Combinatorics",
        icon: "🧮",
        color: "#ec4899",
        desc: "Calculate total relations, reflexive relations, symmetric formulas.",
        practice: generateCountingQuestions,
        assessment: generateCountingAssessment,
        learn: {
            concept:
                "Because relations are subsets, we use powers of 2 to calculate the number of possible relations.",
            rules: [
                {
                    title: "Total Relations",
                    f: "2^{mn}",
                    d: "If n(A)=m and n(B)=n, there are $2^{mn}$ total subset relations.",
                    ex: "$m=2, n=3 \\implies 2^{6} = 64$ relations",
                    tip: "It grows exponentially! Even small sets have thousands of relations.",
                },
                {
                    title: "Reflexive Relations",
                    f: "2^{n(n-1)}",
                    d: "The number of reflexive relations on a set of size n.",
                    ex: "$n=3 \\implies 2^{3(2)} = 2^6 = 64$",
                    tip: "The diagonal elements are forced to exist, so we only have choices for the off-diagonal ones.",
                }
            ],
        },
    },
    {
        id: "equivalence",
        title: "Equivalence Properties",
        subtitle: "Skill 4 · Proofs",
        icon: "👑",
        color: "#7c3aed",
        desc: "Test relations for reflexivity, symmetry, and transitivity.",
        practice: generateEquivalenceQuestions,
        assessment: generateEquivalenceAssessment,
        learn: {
            concept:
                "To prove an Equivalence Relation, you must hunt for counterexamples to R, S, and T.",
            rules: [
                {
                    title: "Reflexive",
                    f: "\\forall x \\in A, (x, x) \\in R",
                    d: "Every element maps to itself.",
                    ex: "$1, 2, 3$ must all have $(1,1), (2,2), (3,3)$",
                    tip: "Check the roll call. Missing one? Fail!",
                },
                {
                    title: "Symmetric",
                    f: "(x, y) \\in R \\implies (y, x) \\in R",
                    d: "If an arrow goes out, one must come back.",
                    ex: "If $(1,2)$ is there, $(2,1)$ MUST be there.",
                    tip: "Scan for lonely one-way streets.",
                },
                {
                    title: "Transitive",
                    f: "(x, y) \\in R \\land (y, z) \\in R \\implies (x, z) \\in R",
                    d: "If step A to B, and B to C exist, shortcut A to C must exist.",
                    ex: "If $(1,2)$ and $(2,3)$ are present, $(1,3)$ must be.",
                    tip: "This is the trickiest! Actively look for chains $x \\to y \\to z$.",
                }
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function RelationsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState("list");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== "list" && skill) {
        return (
            <div
                className="rel-skills-page"
                style={{
                    background: "#f8fafc",
                    minHeight: "100vh",
                    padding: "0 0 60px",
                }}
            >
                <nav className="rel-intro-nav">
                    <button
                        className="rel-intro-nav-back"
                        onClick={() => {
                            setView("list");
                            setSelectedLearnIdx(0);
                        }}
                    >
                        ← Back to Skills
                    </button>
                    <div className="rel-intro-nav-links">
                        <button
                            className="rel-intro-nav-link"
                            onClick={() => navigate("/senior/grade/12/relations/introduction")}
                        >
                            🌟 Intro
                        </button>
                        <button
                            className="rel-intro-nav-link"
                            onClick={() => navigate("/senior/grade/12/relations/terminology")}
                        >
                            📖 Terminology
                        </button>
                        <button className="rel-intro-nav-link rel-intro-nav-link--active">
                            🎯 Skills
                        </button>
                    </div>
                </nav>
                <div style={{ padding: "0 24px" }}>
                    {view === "learn" ? (
                        <div
                            className="rel-lexicon-container"
                            style={{ maxWidth: 1100, margin: "0 auto" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    marginBottom: 24,
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        background: `${skill.color}15`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 22,
                                    }}
                                >
                                    {skill.icon}
                                </div>
                                <h1
                                    style={{
                                        fontFamily: "Outfit, sans-serif",
                                        fontSize: "2.5rem",
                                        fontWeight: 900,
                                        color: "var(--rel-text)",
                                        margin: 0,
                                    }}
                                >
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div className="rel-learn-grid">
                                {/* Side Selector */}
                                <aside
                                    className="rel-learn-sidebar"
                                    style={{
                                        background: "rgba(255,255,255,0.7)",
                                        padding: "12px",
                                        borderRadius: 20,
                                        border: "1px solid rgba(0,0,0,0.05)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                        maxHeight: "65vh",
                                        overflowY: "auto",
                                    }}
                                >
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10,
                                                padding: "10px 14px",
                                                borderRadius: 12,
                                                border: "1px solid",
                                                borderColor:
                                                    selectedLearnIdx === ri
                                                        ? skill.color
                                                        : "rgba(0,0,0,0.05)",
                                                background:
                                                    selectedLearnIdx === ri ? skill.color : "#fff",
                                                color:
                                                    selectedLearnIdx === ri ? "#fff" : "var(--rel-text)",
                                                transition: "all 0.2s",
                                                cursor: "pointer",
                                                textAlign: "left",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 6,
                                                    background:
                                                        selectedLearnIdx === ri
                                                            ? "rgba(255,255,255,0.2)"
                                                            : `${skill.color}15`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 14,
                                                    fontWeight: 900,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {ri + 1}
                                            </div>
                                            <span style={{ fontWeight: 700, fontSize: 15 }}>
                                                {rule.title}
                                            </span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main
                                    className="rel-details-window-anim rel-details-window"
                                    key={selectedLearnIdx}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 20,
                                        padding: "24px 32px",
                                        border: `2px solid ${skill.color}15`,
                                        boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
                                        minHeight: 400,
                                    }}
                                >
                                    <div
                                        className="rel-learn-header-row"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <div>
                                            <h3
                                                style={{
                                                    margin: "0 0 4px",
                                                    fontSize: 28,
                                                    fontWeight: 900,
                                                    color: skill.color,
                                                }}
                                            >
                                                {skill.learn.rules[selectedLearnIdx].title}
                                            </h3>
                                            <div
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: 700,
                                                    color: "var(--rel-muted)",
                                                }}
                                            >
                                                PROPERTY {selectedLearnIdx + 1} OF{" "}
                                                {skill.learn.rules.length}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div
                                        style={{
                                            background: `${skill.color}05`,
                                            padding: "24px",
                                            borderRadius: 20,
                                            border: `2px solid ${skill.color}15`,
                                            marginBottom: 32,
                                            textAlign: "center",
                                        }}
                                    >
                                        <div
                                            className="rel-formula-text"
                                            style={{
                                                fontSize: 32,
                                                fontWeight: 800,
                                                color: skill.color,
                                            }}
                                        >
                                            <MathRenderer
                                                text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="rel-rule-split"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: 24,
                                        }}
                                    >
                                        <div>
                                            <h4
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 12,
                                                    letterSpacing: 1,
                                                    color: "var(--rel-muted)",
                                                    marginBottom: 10,
                                                }}
                                            >
                                                Explanation
                                            </h4>
                                            <p
                                                style={{
                                                    fontSize: 17,
                                                    lineHeight: 1.6,
                                                    margin: 0,
                                                    color: "var(--rel-text)",
                                                }}
                                            >
                                                {skill.learn.rules[selectedLearnIdx].d}
                                            </p>

                                            <div
                                                style={{
                                                    marginTop: 24,
                                                    background: "rgba(20,184,166,0.05)",
                                                    padding: "16px",
                                                    borderRadius: 16,
                                                    border: "1px solid rgba(20,184,166,0.1)",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: 15,
                                                        lineHeight: 1.6,
                                                        color: "var(--rel-muted)",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: 800,
                                                            color: "var(--rel-teal)",
                                                        }}
                                                    >
                                                        🛡️ Survival Tip:{" "}
                                                    </span>
                                                    {skill.learn.rules[selectedLearnIdx].tip}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 12,
                                                    letterSpacing: 1,
                                                    color: skill.color,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                Practical Example
                                            </h4>
                                            <div
                                                style={{
                                                    background: "#f8fafc",
                                                    padding: 24,
                                                    borderRadius: 20,
                                                    border: "1px solid rgba(0,0,0,0.03)",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: 22,
                                                        fontWeight: 700,
                                                        color: "var(--rel-text)",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: 17,
                                                            color: "var(--rel-text)",
                                                            display: "block",
                                                        }}
                                                    >
                                                        <LatexText
                                                            text={skill.learn.rules[selectedLearnIdx].ex}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div
                                        className="rel-learn-footer"
                                        style={{ marginTop: 40, display: "flex", gap: 16 }}
                                    >
                                        <button
                                            className="rel-btn-primary"
                                            onClick={() => setView("practice")}
                                            style={{
                                                padding: "14px 32px",
                                                background: skill.color,
                                                fontSize: 15,
                                            }}
                                        >
                                            Mastered this? Try Practice →
                                        </button>
                                        <button
                                            className="rel-btn-secondary"
                                            onClick={() => {
                                                const nextIdx =
                                                    (selectedLearnIdx + 1) % skill.learn.rules.length;
                                                setSelectedLearnIdx(nextIdx);
                                            }}
                                            style={{ padding: "14px 32px", fontSize: 15 }}
                                        >
                                            Next:{" "}
                                            {
                                                skill.learn.rules[
                                                    (selectedLearnIdx + 1) % skill.learn.rules.length
                                                ].title
                                            }
                                        </button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === "practice" ? (
                        <QuizEngine
                            questions={skill.practice}
                            title={`Practice: ${skill.title}`}
                            onBack={() => setView("list")}
                            color={skill.color}
                            prefix="mat"
                        />
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={`Assessment: ${skill.title}`}
                            onBack={() => setView("list")}
                            color={skill.color}
                            prefix="mat"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="rel-skills-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="rel-intro-nav">
                <button
                    className="rel-intro-nav-back"
                    onClick={() => navigate("/senior/grade/12/relations")}
                >
                    ← Back to Relations HUB
                </button>
                <div className="rel-intro-nav-links">
                    <button
                        className="rel-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/relations/introduction")}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="rel-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/relations/terminology")}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="rel-intro-nav-link rel-intro-nav-link--active"
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div
                className="rel-lexicon-container"
                style={{ maxWidth: 1100, margin: "20px auto 40px", padding: "0 24px" }}
            >
                {/* Compact Heading Line */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: 32,
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "Outfit, sans-serif",
                            fontSize: "2.1rem",
                            fontWeight: 900,
                            color: "var(--rel-text)",
                            margin: "0 0 6px",
                        }}
                    >
                        Relations{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--rel-teal), var(--rel-indigo))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Skills
                        </span>
                    </h1>
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "var(--rel-muted)",
                            letterSpacing: 0.5,
                        }}
                    >
                        Step up from concepts to mastery with targeted practice.
                    </div>
                </div>

                {/* Vertical Skills List */}
                <div className="rel-skills-list">
                    {SKILLS.map((skill, idx) => (
                        <div key={skill.id} className="rel-skill-card">
                            {/* Skill Info */}
                            <div className="rel-skill-info">
                                <div
                                    className="rel-skill-icon"
                                    style={{ background: `${skill.color}15` }}
                                >
                                    {skill.icon}
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 10,
                                            fontWeight: 800,
                                            color: skill.color,
                                            textTransform: "uppercase",
                                            letterSpacing: 1,
                                            marginBottom: 2,
                                        }}
                                    >
                                        {skill.subtitle}
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 800,
                                            margin: "0 0 6px",
                                            color: "var(--rel-text)",
                                        }}
                                    >
                                        {skill.title}
                                    </h3>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: 14,
                                            color: "var(--rel-muted)",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {skill.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="rel-skill-actions" style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <button
                                    className="rel-btn-learn"
                                    onClick={() => {
                                        setActiveSkill(idx);
                                        setView("learn");
                                        setSelectedLearnIdx(0);
                                    }}
                                    style={{
                                        color: '#0f172a', /* Dark color text */
                                        background: '#fff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '9999px',
                                        padding: '8px 24px',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Learn
                                </button>
                                <button
                                    className="rel-btn-practice"
                                    onClick={() => {
                                        setActiveSkill(idx);
                                        setView("practice");
                                    }}
                                    style={{
                                        color: '#0f172a',
                                        background: '#fff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '9999px',
                                        padding: '8px 24px',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Practice
                                </button>
                                <button
                                    className="rel-btn-assess"
                                    onClick={() => {
                                        setActiveSkill(idx);
                                        setView("assessment");
                                    }}
                                    style={{
                                        color: '#fff',
                                        background: skill.color,
                                        border: 'none',
                                        borderRadius: '9999px',
                                        padding: '8px 24px',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        boxShadow: `0 4px 14px ${skill.color}40`,
                                    }}
                                >
                                    Assess
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
