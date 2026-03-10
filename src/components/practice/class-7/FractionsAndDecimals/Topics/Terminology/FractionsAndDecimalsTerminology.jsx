import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../FractionsAndDecimals.css";
import MathRenderer from "../../../../../MathRenderer";

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

const TERMS = [
    {
        name: "Proper Fraction",
        color: "#6366f1",
        icon: "🍰",
        def: "A fraction where the numerator (top number) is strictly less than the denominator (bottom number). Its value is always less than 1.",
        examples: ["$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{99}{100}$"],
        inUse: "If you have 3 slices of an 8-slice pizza, you have $\\frac{3}{8}$ of the pizza.",
        memory: "Proper means 'normal' — the smaller number sits safely on top of the bigger one!"
    },
    {
        name: "Improper Fraction",
        color: "#0d9488",
        icon: "🏗️",
        def: "A fraction where the numerator is greater than or equal to the denominator. Its value is 1 or greater.",
        examples: ["$\\frac{5}{4}$", "$\\frac{7}{2}$", "$\\frac{10}{10}$"],
        inUse: "$\\frac{5}{4}$ means you have more than one whole pizza (1 whole + 1/4).",
        memory: "Improper means 'top-heavy' — a bigger number trying to balance directly on a smaller one!"
    },
    {
        name: "Mixed Fraction",
        color: "#f59e0b",
        icon: "🧩",
        def: "A combination of a whole number and a proper fraction.",
        examples: ["$1\\frac{1}{4}$", "$3\\frac{1}{2}$"],
        inUse: "Instead of saying $\\frac{7}{2}$, we usually say $3\\frac{1}{2}$ (three and a half).",
        memory: "It's a mix! A whole number mixed right next to a fraction!"
    },
    {
        name: "Like Fractions",
        color: "#ec4899",
        icon: "👯",
        def: "Fractions that have the exact same denominator.",
        examples: ["$\\frac{1}{5}, \\frac{3}{5}, \\frac{4}{5}$"],
        inUse: "It is very easy to add $\\frac{1}{5} + \\frac{2}{5}$ because they are like fractions.",
        memory: "They 'like' each other because their bottoms match!"
    },
    {
        name: "Reciprocal",
        color: "#8b5cf6",
        icon: "🔄",
        def: "The inverse of a fraction created by swapping the numerator and the denominator. When a fraction is multiplied by its reciprocal, the result is 1.",
        examples: ["$\\frac{3}{4} \\rightarrow \\frac{4}{3}$", "$5 \\rightarrow \\frac{1}{5}$"],
        inUse: "To divide by $\\frac{2}{3}$, you multiply by its reciprocal, $\\frac{3}{2}$.",
        memory: "Just flip it over!"
    },
    {
        name: "Decimal Shift",
        color: "#10b981",
        icon: "⏩",
        def: "Multiplying a decimal by exactly 10, 100, or 1000 moves the decimal point to the right. Dividing moves it to the left.",
        examples: ["$2.34 \\times 10 = 23.4$", "$5.6 \\times 100 = 560$"],
        inUse: "Every zero in 10, 100, 1000 pushes the decimal point one step to the right.",
        memory: "Multiply means get bigger (shift right). Divide means get smaller (shift left)."
    }
];

const SIX_RULES = [
    {
        num: 1,
        title: "Fraction Multiplication",
        rule: "Multiply straight across: Top with Top, Bottom with Bottom.",
        emoji: "✖️",
        color: "#6366f1",
        detail: "To multiply two fractions, just multiply the numerators together to get the new numerator, and the denominators together to get the new denominator.",
        examples: ["$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$", "$\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}$"],
        tip: "You don't need a common denominator for multiplication!"
    },
    {
        num: 2,
        title: "The Word 'Of'",
        rule: "In mathematics, the word 'of' generally means multiplication.",
        emoji: "🗣️",
        color: "#0d9488",
        detail: "When you are asked to find 'half of ten', you are doing $\\frac{1}{2} \\times 10$. Both give the answer 5.",
        examples: ["$\\frac{1}{3} \\text{ of } 9 = 3$", "$\\frac{3}{4} \\text{ of } 12 = 9$"],
        tip: "Whenever you read 'fraction OF a number', change 'OF' to exactly a multiplication sign $\\times$."
    },
    {
        num: 3,
        title: "Value of the Product",
        rule: "Multiplying by a proper fraction shrinks the number. Multiplying by an improper fraction grows it.",
        emoji: "📏",
        color: "#f59e0b",
        detail: "If you multiply $N$ by $\\frac{1}{2}$, the result is smaller than $N$. If you multiply $N$ by $\\frac{3}{2}$, the result is larger than $N$.",
        examples: ["$8 \\times \\frac{1}{2} = 4$ (smaller)", "$8 \\times \\frac{3}{2} = 12$ (larger)"],
        tip: "A fraction $< 1$ makes things smaller. A fraction $> 1$ makes things bigger!"
    },
    {
        num: 4,
        title: "Division by a Fraction",
        rule: "Keep the first number, Change the sign to multiply, Flip the second fraction.",
        emoji: "🔄",
        color: "#10b981",
        detail: "This is known as the 'Keep-Change-Flip' rule. To divide by a fraction, multiply by its reciprocal.",
        examples: ["$\\frac{1}{2} \\div \\frac{3}{4} = \\frac{1}{2} \\times \\frac{4}{3}$", "$5 \\div \\frac{1}{2} = 5 \\times \\frac{2}{1} = 10$"],
        tip: "KFC... no wait, KCF! Keep, Change, Flip."
    },
    {
        num: 5,
        title: "Decimal Multiplication",
        rule: "First, ignore the decimals and multiply. Then, count the total decimal places in the problem and put them in the answer.",
        emoji: "🔢",
        color: "#ec4899",
        detail: "If you multiply $0.2$ (1 place) by $0.3$ (1 place), first do $2 \\times 3 = 6$. The answer must have $1+1=2$ decimal places, so it is $0.06$.",
        examples: ["$1.2 \\times 3 = 3.6$", "$0.5 \\times 0.5 = 0.25$"],
        tip: "Count the jumps before, recreate the total jumps after!"
    },
    {
        num: 6,
        title: "Hidden Denominators",
        rule: "Every whole number has a hidden denominator of 1.",
        emoji: "👻",
        color: "#8b5cf6",
        detail: "If you need to multiply a fraction by a whole number, turn the whole number into a fraction by putting it over 1.",
        examples: ["$5 = \\frac{5}{1}$", "$\\frac{2}{3} \\times 4 = \\frac{2}{3} \\times \\frac{4}{1} = \\frac{8}{3}$"],
        tip: "When in doubt, write a 1 under it!"
    }
];

const VOCAB_QUIZ = [
    {
        question: "What is $\\frac{7}{4}$ called?",
        options: ["Proper Fraction", "Improper Fraction", "Mixed Fraction", "Equivalent Fraction"],
        correct: 1,
        explanation: "Because the numerator (7) is larger than the denominator (4), it is improper."
    },
    {
        question: "What does the word 'of' mean in '$\\frac{3}{4}$ of 16'?",
        options: ["Add", "Subtract", "Multiply", "Divide"],
        correct: 2,
        explanation: "'Of' translates to multiplication $\\times$."
    },
    {
        question: "How do you multiply two fractions?",
        options: ["Find a common denominator", "Add the top, add the bottom", "Multiply the top and bottom with cross terms", "Multiply top with top, bottom with bottom"],
        correct: 3,
        explanation: "Multiply straight across: numerators together, denominators together."
    },
    {
        question: "What is the reciprocal of $\\frac{5}{8}$?",
        options: ["$\\frac{-5}{8}$", "$\\frac{8}{5}$", "$1$", "$\\frac{1}{8}$"],
        correct: 1,
        explanation: "Flip the numerator and denominator to get the reciprocal, $\\frac{8}{5}$."
    },
    {
        question: "To divide by a fraction, you multiply by its:",
        options: ["Opposite", "Numerator", "Reciprocal", "Denominator"],
        correct: 2,
        explanation: "Keep-Change-Flip! Change division to multiplication by flipping the second fraction (taking its reciprocal)."
    },
    {
        question: "If I multiply $1.5$ (1 decimal place) by $0.02$ (2 decimal places), how many decimal places will the answer have?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        explanation: "Add the decimal places of the factors: 1 + 2 = 3 decimal places."
    },
    {
        question: "What happens when you multiply $4.75$ by $10$?",
        options: ["The decimal point moves one place left", "The decimal point moves one place right", "It becomes $4.750$", "The 7 becomes an 8"],
        correct: 1,
        explanation: "Multiplying by 10 shifts the decimal point exactly one step to the right, yielding $47.5$."
    },
    {
        question: "When you multiply $12$ by $\\frac{1}{3}$, the product is:",
        options: ["Larger than 12", "Exactly 12", "Smaller than 12", "Negative"],
        correct: 2,
        explanation: "Because $\\frac{1}{3}$ is a proper fraction (less than 1), multiplying 12 by it shrinks it down (to 4)."
    },
    {
        question: "A number written as $2\\frac{1}{2}$ is a:",
        options: ["Proper fraction", "Improper fraction", "Mixed fraction", "Decimal fraction"],
        correct: 2,
        explanation: "It has a whole number part (2) mixed with a proper fraction part (1/2)."
    },
    {
        question: "To multiply $\\frac{3}{5}$ by the whole number $4$, what should you do first?",
        options: ["Rewrite $4$ as $\\frac{1}{4}$", "Rewrite $4$ as $\\frac{4}{1}$", "Multiply $3+4$ on top", "Find a common denominator"],
        correct: 1,
        explanation: "Give the whole number a hidden denominator of 1 to make straight-across multiplication easy."
    }
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function FractionsAndDecimalsTerminology() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Tabs state
    const [activeTab, setActiveTab] = useState("terms");

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
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
        <div className="frac-terminology-page">
            <style>{`
                .frac-details-window-anim {
                    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .frac-term-btn-mini {
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
                .frac-term-btn-mini::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    z-index: 0;
                    transition: opacity 0.2s;
                    opacity: 1;
                }
                .frac-term-btn-mini:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
                }
                .frac-term-btn-mini:hover::before {
                    opacity: 0.9;
                }
                .frac-term-btn-mini.active {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    z-index: 2;
                }
                .frac-term-btn-mini.active::before {
                    opacity: 0;
                }
                .frac-term-btn-mini > * {
                    position: relative;
                    z-index: 1;
                }
                
                @media (max-width: 1024px) {
                    .frac-lexicon-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .frac-selector-container {
                        max-width: 600px;
                        margin: 0 auto 16px;
                    }
                }
            `}</style>

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
                        className="frac-intro-nav-link frac-intro-nav-link--active"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/terminology")}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="frac-intro-nav-link"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/skills")}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div
                className="frac-lexicon-container"
                style={{ maxWidth: 1100, margin: "40px auto 20px", padding: "0 24px" }}
            >
                {/* Heading Stack */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: 20,
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "Outfit, sans-serif",
                            fontSize: "2.8rem",
                            fontWeight: 900,
                            color: "var(--frac-text)",
                            margin: "0 0 8px",
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
                            Vocabulary
                        </span>
                    </h1>
                    <div
                        style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "var(--frac-muted)",
                            letterSpacing: 0.5,
                        }}
                    >
                        {activeTab === "quiz"
                            ? "Test your knowledge with 10 interactive questions!"
                            : `Select any ${activeTab === "terms" ? "term" : "rule"} below to explore details.`}
                    </div>
                </div>

                {/* Sub Tabs */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 8,
                        marginBottom: 16,
                    }}
                >
                    <button
                        className={`frac-tab ${activeTab === "terms" ? "active" : ""}`}
                        onClick={() => setActiveTab("terms")}
                    >
                        📚 Terminology
                    </button>
                    <button
                        className={`frac-tab ${activeTab === "rules" ? "active" : ""}`}
                        onClick={() => setActiveTab("rules")}
                    >
                        📏 6 Rules
                    </button>
                    <button
                        className={`frac-tab ${activeTab === "quiz" ? "active" : ""}`}
                        onClick={() => setActiveTab("quiz")}
                    >
                        🧪 Test Prep
                    </button>
                </div>

                {activeTab !== "quiz" ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Rules) ── */
                    <div
                        className="frac-lexicon-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(300px, 360px) 1fr",
                            gap: 16,
                            alignItems: "start",
                        }}
                    >
                        <aside
                            className="frac-selector-container"
                            style={{
                                background: "rgba(255,255,255,0.7)",
                                padding: "14px",
                                borderRadius: 20,
                                border: "1px solid rgba(0,0,0,0.05)",
                                display: "grid",
                                gridTemplateColumns: activeTab === "terms" ? "1fr 1fr" : "1fr",
                                gap: 10,
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            {activeTab === "terms"
                                ? TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button
                                            key={i}
                                            className={`frac-term-btn-mini ${isActive ? "active" : ""}`}
                                            onClick={() => setSelectedIdx(i)}
                                            style={{
                                                background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`,
                                                borderColor: isActive
                                                    ? term.color
                                                    : `${term.color}20`,
                                                gridColumn:
                                                    i === TERMS.length - 1 && TERMS.length % 2 === 1 ? "span 2" : "span 1",
                                                justifyContent:
                                                    i === TERMS.length - 1 && TERMS.length % 2 === 1 ? "center" : "flex-start",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: 10,
                                                    background: isActive ? term.color : "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 20,
                                                    boxShadow: isActive
                                                        ? "none"
                                                        : "0 2px 5px rgba(0,0,0,0.05)",
                                                    transition: "all 0.2s",
                                                }}
                                            >
                                                {term.icon}
                                            </div>
                                            <span
                                                style={{
                                                    fontWeight: 800,
                                                    fontSize: 15,
                                                    color: isActive ? "#fff" : "var(--frac-text)",
                                                }}
                                            >
                                                {term.name}
                                            </span>
                                            {isActive && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: `linear-gradient(135deg, ${term.color}, ${term.color}dd)`,
                                                        zIndex: 0,
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })
                                : SIX_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button
                                            key={i}
                                            className={`frac-term-btn-mini ${isActive ? "active" : ""}`}
                                            onClick={() => setSelectedRuleIdx(i)}
                                            style={{
                                                background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`,
                                                borderColor: isActive
                                                    ? rule.color
                                                    : `${rule.color}20`,
                                                padding: "12px 16px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: 10,
                                                    background: isActive ? rule.color : "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 20,
                                                    color: isActive ? "#fff" : rule.color,
                                                    fontWeight: 900,
                                                }}
                                            >
                                                {rule.num}
                                            </div>
                                            <div
                                                style={{ display: "flex", flexDirection: "column" }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: 800,
                                                        fontSize: 16,
                                                        color: isActive ? "#fff" : "var(--frac-text)",
                                                        lineHeight: 1,
                                                    }}
                                                >
                                                    Rule {rule.num}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: isActive
                                                            ? "rgba(255,255,255,0.8)"
                                                            : "var(--frac-muted)",
                                                        textTransform: "uppercase",
                                                        letterSpacing: 0.5,
                                                        marginTop: 4,
                                                    }}
                                                >
                                                    {rule.title}
                                                </span>
                                            </div>
                                            {isActive && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`,
                                                        zIndex: 0,
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                        </aside>

                        <main
                            className="frac-details-window-anim"
                            key={activeTab === "terms" ? selectedIdx : selectedRuleIdx}
                            style={{
                                background: "#ffffff",
                                borderRadius: 20,
                                padding: "20px 28px",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.03)",
                                border: `2px solid ${(activeTab === "terms" ? activeTerm : activeRule).color}15`,
                                minHeight: 330,
                            }}
                        >
                            {activeTab === "terms" ? (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            marginBottom: 16,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 12,
                                                background: `${activeTerm.color}15`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 24,
                                            }}
                                        >
                                            {activeTerm.icon}
                                        </div>
                                        <h2
                                            style={{
                                                fontFamily: "Outfit, sans-serif",
                                                fontSize: 28,
                                                fontWeight: 900,
                                                color: activeTerm.color,
                                                margin: 0,
                                            }}
                                        >
                                            {activeTerm.name}
                                        </h2>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 17,
                                            color: "var(--frac-text)",
                                            lineHeight: 1.6,
                                            margin: "0 0 24px",
                                        }}
                                    >
                                        <MathRenderer text={activeTerm.def} />
                                    </p>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(180px, 1fr))",
                                            gap: 20,
                                        }}
                                    >
                                        <div>
                                            <h4
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 11,
                                                    letterSpacing: 1,
                                                    color: activeTerm.color,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                Examples
                                            </h4>
                                            <div
                                                style={{
                                                    background: `${activeTerm.color}05`,
                                                    padding: 16,
                                                    borderRadius: 16,
                                                    border: `1px solid ${activeTerm.color}10`,
                                                }}
                                            >
                                                <div
                                                    style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                                                >
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <code
                                                            key={j}
                                                            style={{
                                                                background: "#fff",
                                                                border: `1px solid ${activeTerm.color}20`,
                                                                color: activeTerm.color,
                                                                padding: "4px 10px",
                                                                borderRadius: 8,
                                                                display: "flex",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <MathRenderer text={ex} />
                                                        </code>
                                                    ))}
                                                </div>
                                                <div
                                                    style={{
                                                        marginTop: 12,
                                                        fontSize: 13,
                                                        color: "var(--frac-muted)",
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 11,
                                                    letterSpacing: 1,
                                                    color: activeTerm.color,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                Memory Hook 🧠
                                            </h4>
                                            <div
                                                style={{
                                                    background: "#fff",
                                                    padding: 16,
                                                    borderRadius: 16,
                                                    border: `1px dashed ${activeTerm.color}50`,
                                                    height: "100%",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: 14,
                                                        lineHeight: 1.5,
                                                        color: "var(--frac-text)",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    <MathRenderer text={activeTerm.memory} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            marginBottom: 16,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 12,
                                                background: activeRule.color,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 20,
                                                fontWeight: 900,
                                                color: "#fff",
                                                fontFamily: "Outfit, sans-serif",
                                            }}
                                        >
                                            {activeRule.num}
                                        </div>
                                        <h2
                                            style={{
                                                fontFamily: "Outfit, sans-serif",
                                                fontSize: 28,
                                                fontWeight: 900,
                                                color: activeRule.color,
                                                margin: 0,
                                            }}
                                        >
                                            {activeRule.title}
                                        </h2>
                                    </div>

                                    <div
                                        style={{
                                            background: `${activeRule.color}10`,
                                            borderLeft: `5px solid ${activeRule.color}`,
                                            padding: "16px 20px",
                                            borderRadius: "0 12px 12px 0",
                                            marginBottom: 24,
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: "var(--frac-text)",
                                            }}
                                        >
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>

                                    <p
                                        style={{
                                            fontSize: 16,
                                            color: "var(--frac-muted)",
                                            lineHeight: 1.6,
                                            marginBottom: 20,
                                        }}
                                    >
                                        <MathRenderer text={activeRule.detail} />
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 12,
                                            marginBottom: 24,
                                        }}
                                    >
                                        {activeRule.examples.map((ex, j) => (
                                            <code
                                                key={j}
                                                style={{
                                                    background: "#f8fafc",
                                                    border: "1px solid #e2e8f0",
                                                    color: "var(--frac-violet)",
                                                    padding: "8px 14px",
                                                    borderRadius: 8,
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <MathRenderer text={ex} />
                                            </code>
                                        ))}
                                    </div>

                                    <div
                                        style={{
                                            background: "rgba(245, 158, 11, 0.1)",
                                            border: "1px solid rgba(245, 158, 11, 0.2)",
                                            padding: "12px 16px",
                                            borderRadius: 12,
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 12,
                                        }}
                                    >
                                        <span style={{ fontSize: 20 }}>💡</span>
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: 14,
                                                color: "#92400e",
                                                fontWeight: 600,
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            <MathRenderer text={activeRule.tip} />
                                        </p>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── QUIZ SECTION ── */
                    <div className="frac-quiz-wrap">
                        {!quizFinished ? (
                            <>
                                <div className="frac-quiz-header">
                                    <div className="frac-quiz-progress">
                                        <div
                                            className="frac-quiz-progress-fill"
                                            style={{
                                                width: `${(quizIdx / VOCAB_QUIZ.length) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="frac-quiz-counter">
                                        Question {quizIdx + 1} of {VOCAB_QUIZ.length}
                                    </div>
                                </div>

                                <div className="frac-question-card">
                                    <div className="frac-question-text">
                                        <MathRenderer text={activeQuiz.question} />
                                    </div>
                                    <div className="frac-options-grid">
                                        {activeQuiz.options.map((opt, i) => {
                                            let btnClass = "frac-option-btn";
                                            if (quizAnswered) {
                                                if (i === activeQuiz.correct) btnClass += " correct";
                                                else if (i === quizSelected) btnClass += " wrong";
                                            } else if (quizSelected === i) {
                                                btnClass += " selected";
                                            }

                                            return (
                                                <button
                                                    key={i}
                                                    className={btnClass}
                                                    onClick={() => handleQuizSelect(i)}
                                                    disabled={quizAnswered}
                                                >
                                                    <div
                                                        style={{
                                                            width: 28,
                                                            height: 28,
                                                            borderRadius: "50%",
                                                            border: "2px solid currentColor",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontSize: 13,
                                                            fontWeight: 800,
                                                        }}
                                                    >
                                                        {["A", "B", "C", "D"][i]}
                                                    </div>
                                                    <span>
                                                        <MathRenderer text={opt} />
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {quizAnswered && (
                                        <div
                                            style={{
                                                marginTop: 32,
                                                padding: 24,
                                                background:
                                                    quizSelected === activeQuiz.correct
                                                        ? "#ecfdf5"
                                                        : "#fef2f2",
                                                borderRadius: 16,
                                                border: `1px solid ${quizSelected === activeQuiz.correct ? "#a7f3d0" : "#fecaca"}`,
                                                animation: "slideInRight 0.4s",
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    margin: "0 0 8px",
                                                    color:
                                                        quizSelected === activeQuiz.correct
                                                            ? "#065f46"
                                                            : "#991b1b",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    fontSize: 18,
                                                }}
                                            >
                                                {quizSelected === activeQuiz.correct
                                                    ? "✅ Spot on!"
                                                    : "❌ Not quite!"}
                                            </h4>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    color: "var(--frac-text)",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                <MathRenderer text={activeQuiz.explanation} />
                                            </p>
                                            <button
                                                className="frac-btn-primary"
                                                style={{ marginTop: 20 }}
                                                onClick={nextQuiz}
                                            >
                                                {quizIdx + 1 === VOCAB_QUIZ.length
                                                    ? "See Final Score →"
                                                    : "Next Question →"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* Quiz Results */
                            <div className="frac-result-card" style={{ animation: "slideInRight 0.5s" }}>
                                <div className="frac-result-icon">
                                    {quizTotalScore >= 8 ? "🏆" : quizTotalScore >= 5 ? "👍" : "📚"}
                                </div>
                                <h2 className="frac-result-title">Quiz Complete!</h2>
                                <div className="frac-result-score">
                                    You scored <span>{quizTotalScore}</span> out of {VOCAB_QUIZ.length}
                                </div>
                                {quizTotalScore === VOCAB_QUIZ.length && (
                                    <p style={{ color: "var(--frac-success)", fontWeight: 700, marginBottom: 30 }}>
                                        Perfect Score! You're a Master of Terminology!
                                    </p>
                                )}
                                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                                    <button className="frac-btn-secondary" onClick={resetQuiz}>
                                        Retry Quiz
                                    </button>
                                    <button
                                        className="frac-btn-primary"
                                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/skills")}
                                    >
                                        Move to Skills →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
