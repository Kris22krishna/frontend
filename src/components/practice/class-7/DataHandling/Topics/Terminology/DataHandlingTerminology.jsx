import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../DataHandling.css";
import MathRenderer from "../../../../../MathRenderer";

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

const TERMS = [
    {
        name: "Data",
        color: "#6366f1",
        icon: "📊",
        def: "Raw facts and figures collected for analysis. Data can be numbers (quantitative) or categories (qualitative).",
        examples: ["Heights of students: $150, 155, 148, 160$ cm", "Favourite colours: Red, Blue, Green"],
        inUse: "A teacher records the marks of 30 students — that collection of marks is the data.",
        memory: "Data = the raw ingredients before you cook your statistics!"
    },
    {
        name: "Arithmetic Mean",
        color: "#0891b2",
        icon: "📐",
        def: "The average of a set of numbers, found by dividing the sum of all observations by the number of observations. $\\text{Mean} = \\frac{\\text{Sum of values}}{\\text{Number of values}}$",
        examples: ["Mean of $4, 6, 8 = \\frac{4+6+8}{3} = 6$"],
        inUse: "A batsman's average is the total runs scored divided by the number of innings.",
        memory: "Mean = the great equaliser — if everyone shared equally, each gets the mean!"
    },
    {
        name: "Median",
        color: "#059669",
        icon: "📍",
        def: "The middle value of data when arranged in ascending or descending order. For an even number of observations, it's the average of the two middle values.",
        examples: ["Median of $3, 5, 7$ is $5$", "Median of $2, 4, 6, 8$ is $\\frac{4+6}{2} = 5$"],
        inUse: "If 5 students score $40, 55, 62, 78, 90$, the median score is $62$ (the middle one).",
        memory: "Median = the middle child — not too high, not too low, right in the centre!"
    },
    {
        name: "Mode",
        color: "#f59e0b",
        icon: "🏆",
        def: "The value that occurs most frequently in a dataset. A dataset can have no mode, one mode, or multiple modes.",
        examples: ["Mode of $2, 3, 3, 5, 7$ is $3$", "Mode of $1, 2, 3, 4$ is none (no repeats)"],
        inUse: "A shoe store checks which size sells the most — that's the mode size.",
        memory: "Mode = the most popular kid in class — appears the most times!"
    },
    {
        name: "Range",
        color: "#ec4899",
        icon: "↔️",
        def: "The difference between the highest and lowest values in a dataset. $\\text{Range} = \\text{Maximum} - \\text{Minimum}$",
        examples: ["Range of $12, 25, 37, 48$ is $48 - 12 = 36$"],
        inUse: "If temperatures ranged from $18°C$ to $35°C$, the range is $17°C$.",
        memory: "Range = the gap between the tallest and shortest person in a group!"
    },
    {
        name: "Frequency",
        color: "#8b5cf6",
        icon: "🔢",
        def: "The number of times a particular value or category appears in a dataset.",
        examples: ["In $2, 3, 2, 5, 2, 3$: Frequency of $2$ is $3$, Frequency of $3$ is $2$"],
        inUse: "A tally chart counts how many goals were scored in each match — each tally is a frequency.",
        memory: "Frequency = how often it shows up — like how frequently you eat pizza!"
    },
    {
        name: "Bar Graph",
        color: "#0369a1",
        icon: "📊",
        def: "A chart that uses rectangular bars of equal width to represent data. The height of each bar shows the value or frequency. Bars have equal spacing between them.",
        examples: ["A bar graph showing runs scored by 5 batsmen", "A bar graph showing favourite sports in a class"],
        inUse: "Newspapers use bar graphs to compare election results across parties at a glance.",
        memory: "Bars stand tall like buildings in a city skyline — taller bar = bigger value!"
    },
    {
        name: "Double Bar Graph",
        color: "#be185d",
        icon: "📊",
        def: "A bar graph that uses two bars side-by-side for each category to compare two related datasets. A legend identifies which bar belongs to which dataset.",
        examples: ["Comparing Term 1 vs Term 2 marks", "Comparing boys vs girls in different activities"],
        inUse: "Compare a city's rainfall in 2024 vs 2025 using paired bars for each month.",
        memory: "Double bars = best friends standing side by side for comparison!"
    }
];

const SIX_RULES = [
    {
        num: 1,
        title: "Mean Formula",
        rule: "$\\text{Mean} = \\frac{\\text{Sum of all observations}}{\\text{Number of observations}}$",
        emoji: "📐",
        color: "#6366f1",
        detail: "Add up every single value in the dataset, then divide by how many values there are. The mean is sensitive to extreme values (outliers).",
        examples: ["Mean of $10, 20, 30 = \\frac{60}{3} = 20$", "Mean of $5, 5, 5, 5 = \\frac{20}{4} = 5$"],
        tip: "The mean might not even be a value in the dataset!"
    },
    {
        num: 2,
        title: "Median Position",
        rule: "Sort the data first! For $n$ values: if $n$ is odd, median is the $\\frac{n+1}{2}$th value. If $n$ is even, average the two middle values.",
        emoji: "📍",
        color: "#059669",
        detail: "The median always requires the data to be arranged in order first. It's not affected by extreme values, making it a 'robust' measure.",
        examples: ["$n = 7$: median is the 4th value", "$n = 10$: median is the average of 5th and 6th values"],
        tip: "Always sort your data before finding the median — unsorted data gives wrong answers!"
    },
    {
        num: 3,
        title: "Mode Identification",
        rule: "Count the frequency of each value. The value with the highest frequency is the mode.",
        emoji: "🏆",
        color: "#f59e0b",
        detail: "Use a tally chart or frequency table for large datasets. If two values tie for highest frequency, the data is bimodal (has two modes).",
        examples: ["$1, 2, 2, 3, 3, 3, 4$ → mode is $3$ (appears 3 times)", "$5, 5, 7, 7$ → bimodal (modes: 5 and 7)"],
        tip: "Mode is the only measure that works for non-numeric data (like favourite colour)!"
    },
    {
        num: 4,
        title: "Range Calculation",
        rule: "$\\text{Range} = \\text{Highest value} - \\text{Lowest value}$",
        emoji: "↔️",
        color: "#ec4899",
        detail: "Range gives a quick sense of how spread out the data is. A small range means data points are clustered; a large range means they are spread out.",
        examples: ["Data: $15, 22, 8, 30, 18$ → Range $= 30 - 8 = 22$"],
        tip: "Range only uses two values — it can be misleading if there are outliers!"
    },
    {
        num: 5,
        title: "Bar Graph Scale",
        rule: "Choose a scale that fits all values without making the graph too tall or too short. All bars must have equal width and equal spacing.",
        emoji: "📊",
        color: "#0369a1",
        detail: "The y-axis scale must start from 0. Use consistent intervals (e.g., 0, 5, 10, 15...). Label both axes and give the graph a title.",
        examples: ["If max value is 40, use scale 0-45 with intervals of 5", "If max value is 350, use scale 0-400 with intervals of 50"],
        tip: "A broken scale (using a zigzag) can be used when values are very large but differences are small!"
    },
    {
        num: 6,
        title: "Double Bar Comparison",
        rule: "In a double bar graph, place paired bars side-by-side for each category. Always include a legend to identify each dataset.",
        emoji: "📊",
        color: "#be185d",
        detail: "Use different colours or patterns for each dataset. The same scale must apply to both sets of bars to ensure fair comparison.",
        examples: ["Blue bars = Term 1, Red bars = Term 2", "Solid = Boys, Striped = Girls"],
        tip: "The gap between paired groups should be wider than the gap within a pair!"
    }
];

const VOCAB_QUIZ = [
    {
        question: "What is the mean of $5, 10, 15$?",
        options: ["$5$", "$10$", "$15$", "$30$"],
        correct: 1,
        explanation: "Mean $= \\frac{5 + 10 + 15}{3} = \\frac{30}{3} = 10$."
    },
    {
        question: "What is the median of $3, 7, 1, 9, 5$?",
        options: ["$3$", "$5$", "$7$", "$1$"],
        correct: 1,
        explanation: "First sort: $1, 3, 5, 7, 9$. The middle (3rd) value is $5$."
    },
    {
        question: "Find the mode of $4, 2, 4, 6, 2, 4, 8$.",
        options: ["$2$", "$4$", "$6$", "$8$"],
        correct: 1,
        explanation: "$4$ appears 3 times — more than any other value."
    },
    {
        question: "The range of $12, 25, 7, 30, 18$ is:",
        options: ["$18$", "$23$", "$12$", "$7$"],
        correct: 1,
        explanation: "Range $= 30 - 7 = 23$."
    },
    {
        question: "Which measure of central tendency is affected most by outliers?",
        options: ["Mode", "Mean", "Median", "Range"],
        correct: 1,
        explanation: "The mean is pulled towards extreme values. Median and mode are resistant to outliers."
    },
    {
        question: "In a bar graph, what does the height of a bar represent?",
        options: ["The category name", "The frequency or value", "The number of bars", "The scale on x-axis"],
        correct: 1,
        explanation: "The height of each bar represents the value or frequency for that category."
    },
    {
        question: "A double bar graph is used to:",
        options: ["Show one dataset", "Compare two datasets", "Find the median", "Calculate the mean"],
        correct: 1,
        explanation: "Double bar graphs place paired bars side-by-side to compare two related datasets."
    },
    {
        question: "What must you do before finding the median?",
        options: ["Find the mean first", "Arrange data in order", "Count the mode", "Draw a bar graph"],
        correct: 1,
        explanation: "Data must be arranged in ascending or descending order before finding the median."
    },
    {
        question: "A dataset $6, 6, 8, 8$ has:",
        options: ["No mode", "One mode: 6", "One mode: 8", "Two modes: 6 and 8"],
        correct: 3,
        explanation: "Both 6 and 8 appear twice — the data is bimodal."
    },
    {
        question: "The y-axis of a bar graph should always start at:",
        options: ["The minimum value", "0", "1", "The mean"],
        correct: 1,
        explanation: "Bar graphs should start at 0 to avoid misleading visual comparisons."
    }
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function DataHandlingTerminology() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState("terms");
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = SIX_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizTotalScore(0);
        setQuizFinished(false);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        if (optIdx === activeQuiz.correct) {
            setQuizTotalScore((s) => s + 1);
        }
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx((i) => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="dh-terminology-page">
            <style>{`
                .dh-details-window-anim {
                    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .dh-term-btn-mini {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.06);
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: left;
                    font-family: 'Outfit', sans-serif;
                    position: relative;
                    overflow: hidden;
                }
                .dh-term-btn-mini::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    z-index: 0;
                    transition: opacity 0.2s;
                    opacity: 1;
                }
                .dh-term-btn-mini:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
                }
                .dh-term-btn-mini.active {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    z-index: 2;
                }
                .dh-term-btn-mini.active::before {
                    opacity: 0;
                }
                .dh-term-btn-mini > * {
                    position: relative;
                    z-index: 1;
                }
                @media (max-width: 1024px) {
                    .dh-lexicon-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .dh-selector-container {
                        max-width: 600px;
                        margin: 0 auto 16px;
                    }
                }
            `}</style>

            <nav className="dh-intro-nav">
                <button
                    className="dh-intro-nav-back"
                    onClick={() => navigate("/middle/grade/7/data-handling")}
                >
                    ← Back to Hub
                </button>
                <div className="dh-intro-nav-links">
                    <button className="dh-intro-nav-link" onClick={() => navigate("/middle/grade/7/data-handling/introduction")}>🌟 Introduction</button>
                    <button className="dh-intro-nav-link dh-intro-nav-link--active" onClick={() => navigate("/middle/grade/7/data-handling/terminology")}>📖 Terminology</button>
                    <button className="dh-intro-nav-link" onClick={() => navigate("/middle/grade/7/data-handling/skills")}>🎯 Skills</button>
                </div>
            </nav>

            <div className="dh-lexicon-container" style={{ maxWidth: 1100, margin: "40px auto 20px", padding: "0 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 20 }}>
                    <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.8rem", fontWeight: 900, color: "var(--dh-text)", margin: "0 0 8px" }}>
                        Data Handling{" "}
                        <span style={{ background: "linear-gradient(135deg, var(--dh-teal), var(--dh-indigo))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Vocabulary
                        </span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--dh-muted)", letterSpacing: 0.5 }}>
                        {activeTab === "quiz"
                            ? "Test your knowledge with 10 interactive questions!"
                            : `Select any ${activeTab === "terms" ? "term" : "rule"} below to explore details.`}
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
                    <button className={`dh-tab ${activeTab === "terms" ? "active" : ""}`} onClick={() => setActiveTab("terms")}>📚 Terminology</button>
                    <button className={`dh-tab ${activeTab === "rules" ? "active" : ""}`} onClick={() => setActiveTab("rules")}>📏 6 Rules</button>
                    <button className={`dh-tab ${activeTab === "quiz" ? "active" : ""}`} onClick={() => setActiveTab("quiz")}>🧪 Test Prep</button>
                </div>

                {activeTab !== "quiz" ? (
                    <div className="dh-lexicon-grid" style={{ display: "grid", gridTemplateColumns: "minmax(300px, 360px) 1fr", gap: 16, alignItems: "start" }}>
                        <aside className="dh-selector-container" style={{ background: "rgba(255,255,255,0.7)", padding: "14px", borderRadius: 20, border: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: activeTab === "terms" ? "1fr 1fr" : "1fr", gap: 10, backdropFilter: "blur(10px)" }}>
                            {activeTab === "terms"
                                ? TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`dh-term-btn-mini ${isActive ? "active" : ""}`}
                                            onClick={() => setSelectedIdx(i)}
                                            style={{ background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`, borderColor: isActive ? term.color : `${term.color}20`, gridColumn: i === TERMS.length - 1 && TERMS.length % 2 === 1 ? "span 2" : "span 1", justifyContent: i === TERMS.length - 1 && TERMS.length % 2 === 1 ? "center" : "flex-start" }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? term.color : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: isActive ? "none" : "0 2px 5px rgba(0,0,0,0.05)", transition: "all 0.2s" }}>
                                                {term.icon}
                                            </div>
                                            <span style={{ fontWeight: 800, fontSize: 15, color: isActive ? "#fff" : "var(--dh-text)" }}>
                                                {term.name}
                                            </span>
                                            {isActive && (<div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${term.color}, ${term.color}dd)`, zIndex: 0 }} />)}
                                        </button>
                                    );
                                })
                                : SIX_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`dh-term-btn-mini ${isActive ? "active" : ""}`}
                                            onClick={() => setSelectedRuleIdx(i)}
                                            style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20` }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? rule.color : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: isActive ? "none" : "0 2px 5px rgba(0,0,0,0.05)", transition: "all 0.2s" }}>
                                                {rule.emoji}
                                            </div>
                                            <span style={{ fontWeight: 800, fontSize: 15, color: isActive ? "#fff" : "var(--dh-text)" }}>
                                                {rule.title}
                                            </span>
                                            {isActive && (<div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />)}
                                        </button>
                                    );
                                })}
                        </aside>

                        {/* Detail Panel */}
                        {activeTab === "terms" ? (
                            <main className="dh-details-window-anim" key={selectedIdx} style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", border: `2px solid ${activeTerm.color}15`, boxShadow: "0 8px 30px rgba(0,0,0,0.03)", minHeight: 400 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${activeTerm.color}, ${activeTerm.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: `0 6px 16px ${activeTerm.color}40` }}>
                                        {activeTerm.icon}
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontFamily: "Outfit, sans-serif", fontSize: 26, fontWeight: 900, color: activeTerm.color }}>{activeTerm.name}</h2>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dh-muted)", textTransform: "uppercase", letterSpacing: 1.5 }}>KEY TERM #{selectedIdx + 1}</div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1.5, color: "var(--dh-muted)", marginBottom: 8 }}>Definition</h4>
                                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--dh-text)", margin: 0 }}><MathRenderer text={activeTerm.def} /></p>
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1.5, color: activeTerm.color, marginBottom: 8 }}>Examples</h4>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                        {activeTerm.examples.map((ex, i) => (
                                            <div key={i} style={{ background: `${activeTerm.color}08`, border: `1px solid ${activeTerm.color}20`, borderRadius: 12, padding: "10px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
                                                <MathRenderer text={ex} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0", marginBottom: 20 }}>
                                    <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1.5, color: "var(--dh-muted)", marginBottom: 8 }}>In Use</h4>
                                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--dh-text)" }}><MathRenderer text={activeTerm.inUse} /></p>
                                </div>

                                <div style={{ background: `${activeTerm.color}08`, padding: "16px 20px", borderRadius: 14, border: `1px solid ${activeTerm.color}15` }}>
                                    <div style={{ fontWeight: 800, color: activeTerm.color, fontSize: 13, marginBottom: 4 }}>🧠 Memory Hook</div>
                                    <MathRenderer text={activeTerm.memory} />
                                </div>
                            </main>
                        ) : (
                            <main className="dh-details-window-anim" key={selectedRuleIdx} style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", border: `2px solid ${activeRule.color}15`, boxShadow: "0 8px 30px rgba(0,0,0,0.03)", minHeight: 400 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${activeRule.color}, ${activeRule.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#fff", fontWeight: 900, boxShadow: `0 6px 16px ${activeRule.color}40` }}>
                                        {activeRule.num}
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontFamily: "Outfit, sans-serif", fontSize: 26, fontWeight: 900, color: activeRule.color }}>{activeRule.title}</h2>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dh-muted)", textTransform: "uppercase", letterSpacing: 1.5 }}>GOLDEN RULE #{activeRule.num}</div>
                                    </div>
                                </div>

                                <div style={{ background: `${activeRule.color}05`, padding: 24, borderRadius: 20, border: `2px solid ${activeRule.color}15`, marginBottom: 24, textAlign: "center" }}>
                                    <div style={{ fontSize: 20, fontWeight: 800, color: activeRule.color }}>
                                        <MathRenderer text={activeRule.rule} />
                                    </div>
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1.5, color: "var(--dh-muted)", marginBottom: 8 }}>Explanation</h4>
                                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--dh-text)", margin: 0 }}><MathRenderer text={activeRule.detail} /></p>
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1.5, color: activeRule.color, marginBottom: 8 }}>Examples</h4>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {activeRule.examples.map((ex, i) => (
                                            <div key={i} style={{ background: `${activeRule.color}08`, border: `1px solid ${activeRule.color}20`, borderRadius: 12, padding: "12px 18px", fontSize: 15 }}>
                                                <MathRenderer text={ex} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ background: "rgba(20,184,166,0.05)", padding: "16px 20px", borderRadius: 14, border: "1px solid rgba(20,184,166,0.1)" }}>
                                    <span style={{ fontWeight: 800, color: "var(--dh-teal)" }}>💡 Tip: </span>
                                    <MathRenderer text={activeRule.tip} />
                                </div>
                            </main>
                        )}
                    </div>
                ) : (
                    /* ── QUIZ VIEW ── */
                    <div style={{ maxWidth: 700, margin: "0 auto" }}>
                        {quizFinished ? (
                            <div style={{ background: "#fff", borderRadius: 24, padding: 40, textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 8px 30px rgba(0,0,0,0.05)" }}>
                                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                                <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 32, fontWeight: 900, marginBottom: 8, color: "var(--dh-text)" }}>Quiz Complete!</h2>
                                <p style={{ fontSize: 20, fontWeight: 700, color: quizTotalScore >= 7 ? "#059669" : quizTotalScore >= 5 ? "#f59e0b" : "#ef4444", marginBottom: 24 }}>
                                    You scored {quizTotalScore} / {VOCAB_QUIZ.length}
                                </p>
                                <button onClick={resetQuiz} style={{ padding: "14px 32px", borderRadius: 100, background: "linear-gradient(135deg, var(--dh-teal), var(--dh-indigo))", color: "#fff", border: "none", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <div style={{ background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 8px 30px rgba(0,0,0,0.05)" }}>
                                <div style={{ background: "rgba(8,145,178,0.1)", borderRadius: 50, height: 8, marginBottom: 12, overflow: "hidden" }}>
                                    <div style={{ height: "100%", borderRadius: 50, background: "linear-gradient(90deg, #0891b2, #6366f1)", transition: "width 0.4s ease", width: `${((quizIdx + 1) / VOCAB_QUIZ.length) * 100}%` }} />
                                </div>
                                <div style={{ fontSize: 13, color: "var(--dh-muted)", textAlign: "right", marginBottom: 16 }}>
                                    Question {quizIdx + 1} of {VOCAB_QUIZ.length}
                                </div>

                                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--dh-text)", marginBottom: 24 }}>
                                    <MathRenderer text={activeQuiz.question} />
                                </h3>

                                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                                    {activeQuiz.options.map((opt, idx) => {
                                        let bg = "#f8fafc";
                                        let border = "1px solid #e2e8f0";
                                        let color = "var(--dh-text)";
                                        if (quizAnswered) {
                                            if (idx === activeQuiz.correct) {
                                                bg = "#dcfce7"; border = "2px solid #22c55e"; color = "#166534";
                                            } else if (idx === quizSelected) {
                                                bg = "#fee2e2"; border = "2px solid #ef4444"; color = "#991b1b";
                                            }
                                        } else if (idx === quizSelected) {
                                            bg = "#eff6ff"; border = "2px solid #3b82f6"; color = "#1e40af";
                                        }
                                        return (
                                            <button key={idx} onClick={() => handleQuizSelect(idx)}
                                                style={{ padding: "14px 20px", borderRadius: 14, background: bg, border, color, fontWeight: 700, fontSize: 16, cursor: quizAnswered ? "default" : "pointer", transition: "all 0.2s", textAlign: "left" }}>
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div style={{ background: "#f0f9ff", padding: 20, borderRadius: 16, border: "1px solid #bae6fd", marginBottom: 20 }}>
                                        <div style={{ fontWeight: 800, color: "#0284c7", marginBottom: 6 }}>Explanation</div>
                                        <MathRenderer text={activeQuiz.explanation} />
                                    </div>
                                )}

                                {quizAnswered && (
                                    <div style={{ textAlign: "right" }}>
                                        <button onClick={nextQuiz} style={{ padding: "12px 28px", borderRadius: 100, background: "linear-gradient(135deg, var(--dh-teal), var(--dh-indigo))", color: "#fff", border: "none", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                                            {quizIdx + 1 < VOCAB_QUIZ.length ? "Next Question →" : "See Results →"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
