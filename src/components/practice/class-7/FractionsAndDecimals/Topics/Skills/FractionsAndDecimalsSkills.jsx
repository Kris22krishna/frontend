import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../FractionsAndDecimals.css";
import MathRenderer from "../../../../../MathRenderer";
import { LatexText } from "../../../../../LatexText";
import {
    generateTypesQuestions,
    generateTypesAssessment,
    generateAddSubQuestions,
    generateAddSubAssessment,
    generateMultiplyQuestions,
    generateMultiplyAssessment,
    generateDecimalShiftQuestions,
    generateDecimalShiftAssessment,
    generateDecimalMultiplyQuestions,
    generateDecimalMultiplyAssessment,
} from "./fractionsAndDecimalsQuestions";

import QuizEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine";
import AssessmentEngine from "../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";

// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: "types",
        title: "Types of Fractions",
        subtitle: "Skill 1 · Foundations",
        icon: "🍰",
        color: "#6366f1",
        desc: "Identify proper, improper, equivalent, and mixed fractions.",
        practice: generateTypesQuestions,
        assessment: generateTypesAssessment,
        learn: {
            concept: "Fractions come in several forms depending on the relationship between numerator and denominator.",
            rules: [
                {
                    title: "Proper vs Improper",
                    f: "\\text{Top} < \\text{Bottom} \\implies \\text{Proper}",
                    d: "If the numerator is strictly less than the denominator, it's proper ($< 1$). Otherwise, it's improper ($\\ge 1$).",
                    ex: "$\\frac{3}{4}$ proper, $\\frac{5}{4}$ improper",
                    tip: "Top heavy = improper!",
                },
                {
                    title: "Mixed Fractions",
                    f: "a\\frac{b}{c} = a + \\frac{b}{c}",
                    d: "A whole number combined with a proper fraction. Convert to improper by $(a \\times c) + b$.",
                    ex: "$2\\frac{1}{3} = \\frac{7}{3}$",
                    tip: "Multiply the bottom, add the top!",
                },
                {
                    title: "Equivalent Fractions",
                    f: "\\frac{a}{b} = \\frac{a \\times k}{b \\times k}",
                    d: "Multiplying top and bottom by the same number creates an equivalent fraction with the same exact value.",
                    ex: "$\\frac{1}{2} = \\frac{4}{8}$",
                    tip: "What you do to the top, you do to the bottom!",
                },
            ],
        },
    },
    {
        id: "addsub",
        title: "Addition & Subtraction",
        subtitle: "Skill 2 · Operations",
        icon: "➕",
        color: "#0891b2",
        desc: "Add and subtract both like and unlike fractions.",
        // Note: fallback arrays since these logic aren't 100% robust for questions generator
        practice: generateAddSubQuestions,
        assessment: generateAddSubAssessment,
        learn: {
            concept: "Fractions can only be combined or separated when they're talking about the exact same sized pieces (common denominators).",
            rules: [
                {
                    title: "Like Fractions",
                    f: "\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}",
                    d: "If the denominators are exactly the same, just add or subtract the numerators. Leave the denominator alone.",
                    ex: "$\\frac{1}{5} + \\frac{2}{5} = \\frac{3}{5}$",
                    tip: "NEVER add the denominators together!",
                },
                {
                    title: "Unlike Fractions",
                    f: "\\text{Find a Common Denominator}",
                    d: "If denominators are different, multiply both denominators to find a common one (or find the LCM). Convert each fraction, then add/subtract.",
                    ex: "$\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$",
                    tip: "Cross multiply to find the new numerators, multiply denominators for the new bottom!",
                },
                {
                    title: "Simplification",
                    f: "\\text{Find the GCD}",
                    d: "Always check your final answer to see if top and bottom can be divided by the same number.",
                    ex: "$\\frac{4}{8} \\div \\frac{4}{4} = \\frac{1}{2}$",
                    tip: "Always leave answers in simplest form!",
                },
            ],
        },
    },
    {
        id: "multiply",
        title: "Multiplication & Division",
        subtitle: "Skill 3 · Core",
        icon: "✖️",
        color: "#f59e0b",
        desc: "Multiply strictly across, and divide using the reciprocal.",
        practice: generateMultiplyQuestions,
        assessment: generateMultiplyAssessment,
        learn: {
            concept: "Multiplication is straight across. Division uses multiplication by flipping the second fraction.",
            rules: [
                {
                    title: "Straight Across Multiply",
                    f: "\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}",
                    d: "Multiply the numerators to get the new numerator, and multiply the denominators to get the new denominator.",
                    ex: "$\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}$",
                    tip: "Do NOT need a common denominator for multiplication!",
                },
                {
                    title: "The Word 'Of'",
                    f: "\\text{'of'} = \\times",
                    d: "In story problems, the word 'of' indicates multiplication.",
                    ex: "$\\frac{1}{2}$ of $10$ is $\\frac{1}{2} \\times 10 = 5$",
                    tip: "Half of pizza means exactly half times the pizza!",
                },
                {
                    title: "Division (Keep-Change-Flip)",
                    f: "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}",
                    d: "Dividing by a fraction is the exact same as multiplying by its reciprocal (the flipped fraction).",
                    ex: "$\\frac{1}{2} \\div \\frac{1}{4} = \\frac{1}{2} \\times \\frac{4}{1} = 2$",
                    tip: "Keep the first, Change the sign, Flip the second!",
                },
            ],
        },
    },
    {
        id: "decimalshift",
        title: "Decimal Shifting",
        subtitle: "Skill 4 · Tens",
        icon: "⏩",
        color: "#ec4899",
        desc: "Multiply and divide decimals by 10, 100, and 1000.",
        practice: generateDecimalShiftQuestions,
        assessment: generateDecimalShiftAssessment,
        learn: {
            concept: "Our number system is base-10. Multiplying or dividing by powers of 10 simply shifts the decimal point.",
            rules: [
                {
                    title: "Multiplying (Shifting Right)",
                    f: "\\times 10^n \\implies \\text{Right } n \\text{ times}",
                    d: "Every zero in 10, 100, 1000 moves the decimal point exactly one step to the right, making the number larger.",
                    ex: "$4.56 \\times 10 = 45.6$",
                    tip: "Multiply = get bigger = shift right!",
                },
                {
                    title: "Dividing (Shifting Left)",
                    f: "\\div 10^n \\implies \\text{Left } n \\text{ times}",
                    d: "Every zero in 10, 100, 1000 moves the decimal point exactly one step to the left, making the number smaller.",
                    ex: "$4.56 \\div 10 = 0.456$",
                    tip: "Divide = get smaller = shift left!",
                },
                {
                    title: "Adding Placeholder Zeros",
                    f: "\\text{Fill empty jumps with } 0",
                    d: "If you shift the decimal point past the end of the number, you must fill the empty spaces with zeros.",
                    ex: "$4.5 \\times 100 = 450$",
                    tip: "Don't fall off the edge — add a zero!",
                },
            ],
        },
    },
    {
        id: "decimalmult",
        title: "Decimal Multiplication",
        subtitle: "Skill 5 · Advanced",
        icon: "🔢",
        color: "#7c3aed",
        desc: "Multiply two decimals by counting total decimal places.",
        practice: generateDecimalMultiplyQuestions,
        assessment: generateDecimalMultiplyAssessment,
        learn: {
            concept: "Decimal multiplication works exactly like whole number multiplication, but you must replace the decimal point perfectly at the end.",
            rules: [
                {
                    title: "Ignore and Multiply",
                    f: "\\text{Pretend there are no decimals}",
                    d: "First, take the decimal points completely out and multiply the numbers exactly as if they were whole integer numbers.",
                    ex: "$0.2 \\times 0.3 \\rightarrow 2 \\times 3 = 6$",
                    tip: "Just do the math on the actual non-zero digits!",
                },
                {
                    title: "Count Total Places",
                    f: "\\text{Sum the decimal places}",
                    d: "Count how many total digits exist behind the decimal points in BOTH of the original numbers.",
                    ex: "$1.5 \\text{ (1)} \\times 0.02 \\text{ (2)} = \\text{Total 3 places}$",
                    tip: "Add the jumps from the original problem!",
                },
                {
                    title: "Place the Decimal",
                    f: "\\text{Start far right, jump left}",
                    d: "Take the whole number answer and jump the decimal point leftwards exactly the total number of places you counted.",
                    ex: "For $1.5 \\times 0.02$, $15 \\times 2 = 30$. Jump 3 times $\\rightarrow 0.030$.",
                    tip: "Start at the invisible decimal to the far right, then jump left!",
                },
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function FractionsAndDecimalsSkills() {
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
                className="frac-skills-page"
                style={{
                    background: "#f8fafc",
                    minHeight: "100vh",
                    padding: "20px 0 60px",
                }}
            >
                <nav className="frac-intro-nav">
                    <button
                        className="frac-intro-nav-back"
                        onClick={() => {
                            setView("list");
                            setSelectedLearnIdx(0);
                        }}
                    >
                        ← Back to Skills
                    </button>
                    <div className="frac-intro-nav-links">
                        <button
                            className="frac-intro-nav-link"
                            onClick={() => navigate("/middle/grade/7/fractions-and-decimals/introduction")}
                        >
                            🌟 Intro
                        </button>
                        <button
                            className="frac-intro-nav-link"
                            onClick={() => navigate("/middle/grade/7/fractions-and-decimals/terminology")}
                        >
                            📖 Terminology
                        </button>
                        <button
                            className="frac-intro-nav-link frac-intro-nav-link--active"
                            onClick={() => navigate("/middle/grade/7/fractions-and-decimals/skills")}
                        >
                            🎯 Skills
                        </button>
                    </div>
                </nav>
                <div style={{ padding: "0 24px" }}>
                    {view === "learn" ? (
                        <div
                            className="frac-lexicon-container"
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
                                        color: "var(--frac-text)",
                                        margin: 0,
                                    }}
                                >
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div className="frac-learn-grid" style={{
                                display: "grid",
                                gridTemplateColumns: "300px 1fr",
                                gap: "24px",
                                alignItems: "start"
                            }}>
                                {/* Side Selector */}
                                <aside
                                    className="frac-learn-sidebar"
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
                                                    selectedLearnIdx === ri ? "#fff" : "var(--frac-text)",
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
                                            <span style={{ fontWeight: 700, fontSize: 13 }}>
                                                {rule.title}
                                            </span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main
                                    className="frac-details-window-anim frac-details-window"
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
                                        className="frac-learn-header-row"
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
                                                    color: "var(--frac-muted)",
                                                }}
                                            >
                                                RULE {selectedLearnIdx + 1} OF{" "}
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
                                            className="frac-formula-text"
                                            style={{
                                                fontSize: 42,
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
                                        className="frac-rule-split"
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
                                                    color: "var(--frac-muted)",
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
                                                    color: "var(--frac-text)",
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
                                                        color: "var(--frac-muted)",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: 800,
                                                            color: "var(--frac-teal)",
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
                                                        color: "var(--frac-text)",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: 17,
                                                            color: "var(--frac-text)",
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
                                        className="frac-learn-footer"
                                        style={{ marginTop: 40, display: "flex", gap: 16 }}
                                    >
                                        <button
                                            className="frac-btn-primary"
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
                                            className="frac-btn-secondary"
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
                            prefix="frac"
                        />
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={`Assessment: ${skill.title}`}
                            onBack={() => setView("list")}
                            color={skill.color}
                            prefix="frac"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="frac-skills-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="frac-intro-nav">
                <button
                    className="frac-intro-nav-back"
                    onClick={() => navigate("/middle/grade/7/fractions-and-decimals")}
                >
                    ← Back to Hub
                </button>
                <div className="frac-intro-nav-links">
                    <button
                        className="frac-intro-nav-link"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/introduction")}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="frac-intro-nav-link"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/terminology")}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="frac-intro-nav-link frac-intro-nav-link--active"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/skills")}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div
                className="frac-lexicon-container"
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
                            color: "var(--frac-text)",
                            margin: "0 0 6px",
                        }}
                    >
                        Fractions & Decimals{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--frac-teal), var(--frac-indigo))",
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
                            color: "var(--frac-muted)",
                            letterSpacing: 0.5,
                        }}
                    >
                        Step up from concepts to mastery with targeted practice.
                    </div>
                </div>

                {/* Vertical Skills List */}
                <div className="frac-skills-list">
                    {SKILLS.map((skill, idx) => (
                        <div key={skill.id} className="frac-skill-card">
                            {/* Skill Info */}
                            <div className="frac-skill-info">
                                <div
                                    className="frac-skill-icon"
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
                                            margin: "0 0 6px",
                                            fontSize: 20,
                                            fontWeight: 800,
                                            color: "var(--frac-text)",
                                        }}
                                    >
                                        {skill.title}
                                    </h3>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: 14,
                                            color: "var(--frac-muted)",
                                            maxWidth: 360,
                                        }}
                                    >
                                        {skill.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="frac-skill-actions">
                                <button
                                    className="frac-skill-btn-outline"
                                    onClick={() => {
                                        setActiveSkill(idx);
                                        setView("learn");
                                    }}
                                >
                                    Learn
                                </button>
                                <button
                                    className="frac-skill-btn-outline"
                                    onClick={() => {
                                        setActiveSkill(idx);
                                        setView("practice");
                                    }}
                                >
                                    Practice
                                </button>
                                <button
                                    className="frac-skill-btn-filled frac-assess-btn"
                                    onClick={() => {
                                        setActiveSkill(idx);
                                        setView("assessment");
                                    }}
                                    style={{ '--skill-color': skill.color, '--skill-color-30': `${skill.color}4d`, '--skill-color-40': `${skill.color}66` }}
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
