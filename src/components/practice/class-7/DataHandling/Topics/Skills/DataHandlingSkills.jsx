import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../DataHandling.css";
import MathRenderer from "../../../../../MathRenderer";
import { LatexText } from "../../../../../LatexText";
import {
    generateMeanQuestions,
    generateMeanAssessment,
    generateRangeQuestions,
    generateRangeAssessment,
    generateModeQuestions,
    generateModeAssessment,
    generateMedianQuestions,
    generateMedianAssessment,
    generateBarGraphQuestions,
    generateBarGraphAssessment,
    generateDoubleBarQuestions,
    generateDoubleBarAssessment,
} from "./dataHandlingQuestions";

import QuizEngine from "./Engines/QuizEngine";
import AssessmentEngine from "./Engines/AssessmentEngine";

// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: "mean",
        title: "Arithmetic Mean",
        subtitle: "Skill 1 · Average",
        icon: "📐",
        color: "#6366f1",
        desc: "Find the average of datasets, missing values given the mean, and understand mean properties.",
        practice: generateMeanQuestions,
        assessment: generateMeanAssessment,
        learn: {
            concept: "The mean (arithmetic average) distributes the total equally among all values.",
            rules: [
                {
                    title: "Mean Formula",
                    f: "\\text{Mean} = \\frac{\\text{Sum}}{\\text{Count}}",
                    d: "Add all values together, then divide by how many values there are.",
                    ex: "Mean of $4, 8, 12 = \\frac{24}{3} = 8$",
                    tip: "The mean might not be a value in the dataset!",
                },
                {
                    title: "Finding a Missing Value",
                    f: "\\text{Missing} = (\\text{Mean} \\times n) - \\text{Sum of known}",
                    d: "If you know the mean and all but one value, calculate the total and subtract the known sum.",
                    ex: "Mean of 3 numbers is 10, two are 8 and 12. Missing $= 30 - 20 = 10$.",
                    tip: "Total = Mean × Count. Then subtract what you know!",
                },
                {
                    title: "Effect of Outliers",
                    f: "\\text{Mean is sensitive to extremes}",
                    d: "A single very large or very small value can dramatically shift the mean.",
                    ex: "Mean of $10, 10, 10, 10, 100 = \\frac{140}{5} = 28$",
                    tip: "One outlier can make the mean misleading!",
                },
            ],
        },
    },
    {
        id: "range",
        title: "Range of Data",
        subtitle: "Skill 2 · Spread",
        icon: "↔️",
        color: "#0891b2",
        desc: "Calculate the range and understand how spread out data is.",
        practice: generateRangeQuestions,
        assessment: generateRangeAssessment,
        learn: {
            concept: "Range measures how spread out a dataset is — the gap between the highest and lowest values.",
            rules: [
                {
                    title: "Range Formula",
                    f: "\\text{Range} = \\text{Max} - \\text{Min}",
                    d: "Find the largest value, find the smallest value, and subtract.",
                    ex: "Range of $5, 12, 3, 18 = 18 - 3 = 15$",
                    tip: "Range only uses two values from the entire dataset!",
                },
                {
                    title: "What Range Tells Us",
                    f: "\\text{Small range} \\implies \\text{clustered data}",
                    d: "A small range means all values are close together. A large range means they're spread apart.",
                    ex: "Range of $10, 11, 12 = 2$ (tight), Range of $1, 50, 99 = 98$ (very spread)",
                    tip: "Range gives a quick snapshot of variability!",
                },
            ],
        },
    },
    {
        id: "mode",
        title: "Mode",
        subtitle: "Skill 3 · Frequency",
        icon: "🏆",
        color: "#f59e0b",
        desc: "Find the most frequent value using tally charts and frequency tables.",
        practice: generateModeQuestions,
        assessment: generateModeAssessment,
        learn: {
            concept: "Mode is the value that appears most often — the 'most popular' number in a dataset.",
            rules: [
                {
                    title: "Finding Mode",
                    f: "\\text{Mode} = \\text{highest frequency value}",
                    d: "Count how many times each value appears. The one with the highest count is the mode.",
                    ex: "In $2, 3, 3, 5, 7$: mode $= 3$ (appears twice)",
                    tip: "Use tally marks for large datasets!",
                },
                {
                    title: "Special Cases",
                    f: "\\text{No mode or Multiple modes}",
                    d: "If no value repeats, there is no mode. If two values tie for highest frequency, the data is bimodal.",
                    ex: "$1, 2, 3, 4$ → no mode. $2, 2, 5, 5$ → bimodal (2 and 5)",
                    tip: "Mode is the only measure that works for non-numeric data!",
                },
            ],
        },
    },
    {
        id: "median",
        title: "Median",
        subtitle: "Skill 4 · Middle Value",
        icon: "📍",
        color: "#ec4899",
        desc: "Find the middle value of sorted data for both odd and even datasets.",
        practice: generateMedianQuestions,
        assessment: generateMedianAssessment,
        learn: {
            concept: "Median is the middle value when data is sorted. It's not affected by outliers.",
            rules: [
                {
                    title: "Odd Count",
                    f: "\\text{Median} = \\text{the } \\frac{n+1}{2}\\text{th value}",
                    d: "Sort the data, then find the exact middle value.",
                    ex: "In $3, 5, 7, 9, 11$: median $= 7$ (3rd of 5 values)",
                    tip: "Always sort first! Position = (n+1)/2",
                },
                {
                    title: "Even Count",
                    f: "\\text{Median} = \\frac{\\text{two middle values}}{2}",
                    d: "When there are an even number of values, average the two central values.",
                    ex: "In $2, 4, 6, 8$: median $= \\frac{4+6}{2} = 5$",
                    tip: "Average the two middle neighbours!",
                },
            ],
        },
    },
    {
        id: "bargraph",
        title: "Bar Graphs",
        subtitle: "Skill 5 · Visualization",
        icon: "📊",
        color: "#7c3aed",
        desc: "Read and interpret bar graphs — find tallest/shortest bars, differences, and totals.",
        practice: generateBarGraphQuestions,
        assessment: generateBarGraphAssessment,
        learn: {
            concept: "Bar graphs use rectangular bars to compare values across categories visually.",
            rules: [
                {
                    title: "Bar Graph Components",
                    f: "\\text{Title, Axes, Labels, Scale, Bars}",
                    d: "Every bar graph needs a title, labelled x and y axes, a consistent scale starting from 0, and equal-width bars with gaps.",
                    ex: "A bar graph showing favourite sports with 5 bars of different heights",
                    tip: "The y-axis scale MUST start from 0 for fair comparison!",
                },
                {
                    title: "Reading Bar Graphs",
                    f: "\\text{Height of bar} = \\text{Value}",
                    d: "To find a value, trace from the top of the bar horizontally to the y-axis. Compare bar heights to compare values.",
                    ex: "Tallest bar = highest value, shortest bar = lowest value",
                    tip: "The difference between two bars = difference in their values!",
                },
            ],
        },
    },
    {
        id: "doublebargraph",
        title: "Double Bar Graphs",
        subtitle: "Skill 6 · Comparison",
        icon: "📊",
        color: "#059669",
        desc: "Compare two datasets side-by-side using double bar graphs.",
        practice: generateDoubleBarQuestions,
        assessment: generateDoubleBarAssessment,
        learn: {
            concept: "Double bar graphs place two bars for each category to compare two related datasets.",
            rules: [
                {
                    title: "Structure",
                    f: "\\text{Two colours, one legend}",
                    d: "Use different colours for each dataset. Always include a legend showing which colour represents which dataset.",
                    ex: "Blue = Term 1 marks, Yellow = Term 2 marks",
                    tip: "The gap between groups should be wider than within a group!",
                },
                {
                    title: "Interpreting Comparisons",
                    f: "\\text{Compare paired bars}",
                    d: "Look at each category to see which dataset is higher. Also compare across categories.",
                    ex: "If Math's Term 1 bar is taller than Term 2, the student improved in Term 2",
                    tip: "Double bar graphs answer 'which is more?' and 'by how much?' instantly!",
                },
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────

export default function DataHandlingSkills() {
    const navigate = useNavigate();
    const [activeSkillIdx, setActiveSkillIdx] = useState(null);
    const [mode, setMode] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const skill = activeSkillIdx !== null ? SKILLS[activeSkillIdx] : null;

    if (skill && mode === "practice") {
        return (
            <div className="dh-page" style={{ minHeight: "100vh" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
                    <QuizEngine
                        questions={skill.practice}
                        title={skill.title}
                        onBack={() => setMode(null)}
                        color={skill.color}
                        prefix="dh"
                    />
                </div>
            </div>
        );
    }

    if (skill && mode === "assess") {
        return (
            <div className="dh-page" style={{ minHeight: "100vh" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
                    <AssessmentEngine
                        questions={skill.assessment}
                        title={skill.title}
                        onBack={() => setMode(null)}
                        color={skill.color}
                        prefix="dh"
                    />
                </div>
            </div>
        );
    }

    if (skill && mode === "learn") {
        return (
            <div className="dh-page" style={{ minHeight: "100vh" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
                    <button onClick={() => setMode(null)} className="dh-back-btn">← Back to Skills</button>
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 32, fontWeight: 900, margin: "0 0 8px", color: "var(--dh-text, #0f172a)" }}>
                        <span style={{ color: skill.color }}>{skill.icon}</span> {skill.title}
                    </h2>
                    <p style={{ color: "var(--dh-muted, #64748b)", fontSize: 16, marginBottom: 32 }}>{skill.learn.concept}</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {skill.learn.rules.map((rule, i) => (
                            <div key={i} className="dh-card" style={{ padding: 28, borderLeft: `4px solid ${skill.color}` }}>
                                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, color: skill.color, margin: "0 0 10px" }}>{rule.title}</h3>
                                <div style={{ background: `${skill.color}08`, borderRadius: 12, padding: "14px 18px", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, textAlign: "center" }}>
                                    <MathRenderer text={`$${rule.f}$`} />
                                </div>
                                <p style={{ margin: "0 0 10px", lineHeight: 1.7, color: "var(--dh-text, #0f172a)" }}>
                                    <MathRenderer text={rule.d} />
                                </p>
                                <div style={{ background: "#f8fafc", padding: "12px 16px", borderRadius: 10, marginBottom: 10, border: "1px solid #e2e8f0" }}>
                                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: skill.color, textTransform: "uppercase", marginBottom: 4 }}>Example</div>
                                    <MathRenderer text={rule.ex} />
                                </div>
                                <div style={{ background: `${skill.color}08`, padding: "10px 14px", borderRadius: 10, border: `1px solid ${skill.color}15`, fontSize: 14 }}>
                                    <strong style={{ color: skill.color }}>💡 Tip: </strong>
                                    <MathRenderer text={rule.tip} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: 14, marginTop: 32, justifyContent: "center" }}>
                        <button className="dh-skill-btn-outline" onClick={() => setMode("practice")}>▶ Start Practice</button>
                        <button className="dh-skill-btn-filled" style={{ "--skill-color": skill.color }} onClick={() => setMode("assess")}>🔥 Take Assessment</button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Skills Picker ──
    return (
        <div className="dh-page">
            <nav className="dh-intro-nav">
                <button className="dh-intro-nav-back" onClick={() => navigate("/middle/grade/7/data-handling")}>← Back to Hub</button>
                <div className="dh-intro-nav-links">
                    <button className="dh-intro-nav-link" onClick={() => navigate("/middle/grade/7/data-handling/introduction")}>🌟 Introduction</button>
                    <button className="dh-intro-nav-link" onClick={() => navigate("/middle/grade/7/data-handling/terminology")}>📖 Terminology</button>
                    <button className="dh-intro-nav-link dh-intro-nav-link--active" onClick={() => navigate("/middle/grade/7/data-handling/skills")}>🎯 Skills</button>
                </div>
            </nav>

            <div className="dh-section" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
                <h1 className="dh-section-title">
                    Skill-Based <span>Practice</span>
                </h1>
                <p className="dh-section-subtitle">
                    Choose a skill below, then learn the concept, practice with 10 dynamic questions, or take a timed assessment.
                </p>

                <div className="dh-skills-grid">
                    {SKILLS.map((sk, i) => (
                        <div key={sk.id} className="dh-skill-card" style={{ cursor: "pointer", "--skill-color": sk.color }} onClick={() => { setActiveSkillIdx(i); setMode(null); }}>
                            <div className="dh-skill-icon" style={{ background: `${sk.color}12`, color: sk.color }}>
                                {sk.icon}
                            </div>
                            <div className="dh-skill-content">
                                <div className="dh-skill-text-stack">
                                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--dh-text, #0f172a)" }}>{sk.title}</div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: sk.color, textTransform: "uppercase", letterSpacing: 1 }}>{sk.subtitle}</div>
                                </div>
                                <div style={{ fontSize: 14, color: "var(--dh-muted, #64748b)", lineHeight: 1.5, marginBottom: 12 }}>{sk.desc}</div>
                                <div className="dh-skill-actions">
                                    <button className="dh-skill-btn-outline" onClick={(e) => { e.stopPropagation(); setActiveSkillIdx(i); setMode("learn"); }}>📖 Learn</button>
                                    <button className="dh-skill-btn-outline" onClick={(e) => { e.stopPropagation(); setActiveSkillIdx(i); setMode("practice"); }}>▶ Practice</button>
                                    <button className="dh-skill-btn-filled" style={{ "--skill-color": sk.color, "--skill-color-30": `${sk.color}4d`, "--skill-color-40": `${sk.color}66` }} onClick={(e) => { e.stopPropagation(); setActiveSkillIdx(i); setMode("assess"); }}>🔥 Assess</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
