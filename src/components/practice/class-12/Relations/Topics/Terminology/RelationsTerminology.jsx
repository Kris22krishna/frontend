import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Relations.css";
import MathRenderer from "../../../../../MathRenderer";
import RelationsTopNav from "../../RelationsTopNav";

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

const TERMS = [
    {
        name: "Ordered Pair",
        color: "#6366f1",
        icon: "👫",
        def: "Two objects $a$ and $b$ listed in a specific order. The first object $a$ is the first coordinate, and the second object $b$ is the second coordinate.",
        examples: ["$(x, y)$", "$(1, 2) \\neq (2, 1)$", "$(a, b)$"],
        inUse: "In the coordinate plane, $(3, 4)$ means move 3 on X-axis and 4 on Y-axis. The order is crucial!",
        memory: "It's like an address — House Number then Street Name. The order matters!",
    },
    {
        name: "Cartesian Product",
        color: "#0891b2",
        icon: "✖️",
        def: "The set of all possible ordered pairs $(x, y)$ where $x \\in A$ and $y \\in B$. Denoted by $A \\times B$.",
        examples: ["$A \\times B = \\{(x, y) \\mid x \\in A, y \\in B\\}$", "$n(A \\times B) = mn$"],
        inUse: "If $A = \\{1, 2\\}$ and $B = \\{x, y\\}$, then $A \\times B = \\{(1, x), (1, y), (2, x), (2, y)\\}$.",
        memory: "Match every element from the first set with every element from the second. It's the ultimate 'mix and match'!",
    },
    {
        name: "Relation",
        color: "#f59e0b",
        icon: "🔗",
        def: "A subset of the Cartesian product $A \\times B$. Any set of ordered pairs from $A$ to $B$ is a relation.",
        examples: ["$R \\subseteq A \\times B$", "$R = \\{(1, 2), (3, 4)\\}$"],
        inUse: "If $R \\subseteq A \\times B$, we say $R$ is a relation from $A$ into $B$.",
        memory: "A relation is just picking specific pairs out of the massive Cartesian product dictionary.",
    },
    {
        name: "Domain",
        color: "#ec4899",
        icon: "📥",
        def: "The set of all first coordinates from the ordered pairs in a relation $R$.",
        examples: ["$\\text{Domain of } R = \\{x \\in A \\mid (x, y) \\in R\\}$", "$\\text{Domain}(R) \\subseteq A$"],
        inUse: "If $R = \\{(1, a), (2, b)\\}$, the Domain is $\\{1, 2\\}$.",
        memory: "Domain = Inputs! It's everyone standing in the left circle.",
    },
    {
        name: "Range",
        color: "#7c3aed",
        icon: "📤",
        def: "The set of all second coordinates from the ordered pairs in a relation $R$.",
        examples: ["$\\text{Range of } R = \\{y \\in B \\mid (x, y) \\in R\\}$", "$\\text{Range}(R) \\subseteq B$"],
        inUse: "If $R = \\{(1, a), (2, b)\\}$, the Range is $\\{a, b\\}$.",
        memory: "Range = Outputs! It's everyone who actually gets pointed to in the right circle.",
    },
    {
        name: "Inverse Relation",
        color: "#10b981",
        icon: "🔄",
        def: "The relation obtained by swapping the coordinates of every ordered pair in $R$. Denoted $R^{-1}$.",
        examples: ["$R^{-1} = \\{(y, x) \\mid (x, y) \\in R\\}$"],
        inUse: "If $R = \\{(1, a), (2, b)\\}$, then $R^{-1} = \\{(a, 1), (b, 2)\\}$.",
        memory: "Just flip the arrows backward!",
    },
    {
        name: "Identity Relation",
        color: "#ef4444",
        icon: "🪞",
        def: "A relation in set $A$ where every element relates ONLY to itself.",
        examples: ["$I_A = \\{(x, x) \\mid x \\in A\\}$"],
        inUse: "If $A = \\{1, 2\\}$, the Identity relation is EXACTLY $\\{(1, 1), (2, 2)\\}$.",
        memory: "Looking in a perfect mirror — you only see yourself and nobody else.",
    },
    {
        name: "Universal Relation",
        color: "#6366f1",
        icon: "🌌",
        def: "The relation containing all possible ordered pairs. It is the entire Cartesian product.",
        examples: ["$R = A \\times A$"],
        inUse: "Every single element is related to every other element.",
        memory: "The biggest possible relation — everything is connected!",
    },
    {
        name: "Empty Relation",
        color: "#06b6d4",
        icon: "🕳️",
        def: "A relation containing no ordered pairs. It is the empty set $\\emptyset$.",
        examples: ["$R = \\emptyset \\subseteq A \\times A$"],
        inUse: "No element in $A$ is related to any element.",
        memory: "The smallest possible relation — complete isolation.",
    },
    {
        name: "Composite Relation",
        color: "#8b5cf6",
        icon: "🚂",
        def: "Combining two relations $f$ and $g$ such that if $(x, y) \\in f$ and $(y, z) \\in g$, then $(x, z) \\in g \\circ f$.",
        examples: ["$g \\circ f = \\{(x, z) \\mid (x, y) \\in f \\text{ and } (y, z) \\in g \\text{ for some } y\\}$"],
        inUse: "Like taking a flight with a layover. Fly from X to Y, then Y to Z. The composite is the ticket from X to Z.",
        memory: "Connecting the dots! If X connects to Y, and Y connects to Z, draw a line directly from X to Z.",
    },
];

const SIX_RULES = [
    {
        num: 1,
        title: "Reflexive Property",
        rule: "Every element must be related to itself.",
        emoji: "🧍",
        color: "#6366f1",
        detail: "A relation $R$ on set $A$ is reflexive if $(x, x) \\in R$ for ALL $x \\in A$. Missing even one means it's not reflexive!",
        examples: [
            "$\\{(1,1), (2,2), (3,3)\\}$ on $A=\\{1,2,3\\}$ ✓",
            "$\\{(1,1), (2,2)\\}$ on $A=\\{1,2,3\\}$ ✗ (missing 3)",
        ],
        tip: "Every element needs its own self-loop. Check the roll call — is everyone present?",
    },
    {
        num: 2,
        title: "Symmetric Property",
        rule: "If x relates to y, then y MUST relate to x.",
        emoji: "🤝",
        color: "#0891b2",
        detail: "A relation $R$ is symmetric if whenever $(x, y) \\in R$, then $(y, x) \\in R$ must also be there.",
        examples: [
            "$\\{(1,2), (2,1)\\}$ ✓",
            "$\\{(1,2), (2,3), (3,2)\\}$ ✗ (missing (2,1))",
        ],
        tip: "It's a two-way street. If an arrow goes out, one must come back!",
    },
    {
        num: 3,
        title: "Transitive Property",
        rule: "If x relates to y, and y to z, then x MUST relate to z.",
        emoji: "⏭️",
        color: "#f59e0b",
        detail: "A relation $R$ is transitive if $(x, y) \\in R$ and $(y, z) \\in R$ implies $(x, z) \\in R$.",
        examples: [
            "$\\{(1,2), (2,3), (1,3)\\}$ ✓",
            "$\\{(1,2), (2,3)\\}$ ✗ (missing (1,3))",
        ],
        tip: "If there's a two-step path, there MUST be a direct shortcut!",
    },
    {
        num: 4,
        title: "Equivalence Relation",
        rule: "Must be Reflexive, Symmetric, AND Transitive.",
        emoji: "👑",
        color: "#10b981",
        detail: "The holy trinity of relations. If a relation satisfies all three properties, it is an Equivalence Relation. It partitions the set into disjoint equivalence classes.",
        examples: ["Equality ($=$) is an equivalence relation.", "Similarity of triangles is an equivalence relation."],
        tip: "R-S-T: Remember this acronym! It must pass all three tests.",
    },
    {
        num: 5,
        title: "Anti-Symmetric Property",
        rule: "If x relates to y, and y relates to x, then x MUST equal y.",
        emoji: "🛡️",
        color: "#ec4899",
        detail: "A relation is anti-symmetric if $(x, y) \\in R$ and $(y, x) \\in R$ implies $x = y$. It means no two distinct elements can relate to each other.",
        examples: ["Less than or equal to ($\\leq$) ✓", "Subset ($\\subseteq$) ✓"],
        tip: "Two-way streets are ONLY allowed if you're standing in the exact same spot (self-loops).",
    },
    {
        num: 6,
        title: "Total Relations Formula",
        rule: "The number of relations from A to B is $2^{mn}$.",
        emoji: "🧮",
        color: "#7c3aed",
        detail: "If $n(A) = m$ and $n(B) = n$, the Cartesian product $A \\times B$ has $mn$ elements. A relation is any subset, and the number of subsets of a set with $k$ elements is $2^k$.",
        examples: [
            "$n(A)=2, n(B)=3 \\implies 2^{2 \\times 3} = 2^6 = 64$ relations",
        ],
        tip: "Multiply the sizes of the sets, then put it as a power of 2!",
    },
];

const VOCAB_QUIZ = [
    {
        question: "If A has 3 elements and B has 4 elements, how many possible relations exist from A into B?",
        options: ["$12$", "$2^{12}$", "$2^7$", "$12^2$"],
        correct: 1,
        explanation: "Number of relations is $2^{n(A) \\times n(B)} = 2^{3 \\times 4} = 2^{12}$.",
    },
    {
        question: "The relation obtained by swapping the coordinates of every ordered pair is called the:",
        options: ["Reflexive Relation", "Inverse Relation", "Empty Relation", "Symmetric Relation"],
        correct: 1,
        explanation: "Swapping $(x, y)$ to $(y, x)$ creates the Inverse Relation, $R^{-1}$.",
    },
    {
        question: "If a relation is both Reflexive, Symmetric, and Transitive, it is called an:",
        options: ["Identity Relation", "Universal Relation", "Equivalence Relation", "Anti-symmetric Relation"],
        correct: 2,
        explanation: "An Equivalence Relation must satisfy the R-S-T properties: Reflexive, Symmetric, and Transitive.",
    },
    {
        question: "If $(x, y) \\in R$ and $(y, x) \\in R \\implies x = y$, the relation is said to be:",
        options: ["Symmetric", "Reflexive", "Transitive", "Anti-symmetric"],
        correct: 3,
        explanation: "This is the exact definition of Anti-symmetric. The only two-way connections allowed are self-loops.",
    },
    {
        question: "If $n(A) = m$ and $n(B) = n$, what is $n(A \\times B)$?",
        options: ["$m + n$", "$m^n$", "$mn$", "$2^{mn}$"],
        correct: 2,
        explanation: "The Cartesian product $A \\times B$ has exactly $m \\times n$ elements (ordered pairs).",
    },
    {
        question: "Which of the following describes the Identity relation on set A?",
        options: [
            "No elements relate to each other",
            "Every element relates to itself, and only itself",
            "Every element relates to every other element",
            "Elements relate to their inverses"
        ],
        correct: 1,
        explanation: "The Identity relation $I_A$ contains exactly the pairs $(x, x)$ for every $x \\in A$, and nothing else.",
    },
    {
        question: "The set of all first coordinates in a relation is called its:",
        options: ["Range", "Domain", "Codomain", "Inverse"],
        correct: 1,
        explanation: "The Domain is the set of valid inputs, which are the first elements of the ordered pairs.",
    },
    {
        question: "For a relation to be symmetric, what condition must hold?",
        options: [
            "$(x, x) \\in R$ for all $x$",
            "If $(x, y) \\in R$, then $(x, z) \\in R$",
            "If $(x, y) \\in R$, then $(y, x) \\in R$",
            "If $(x, y) \\in R$ and $(y, z) \\in R$, then $(x, z) \\in R$"
        ],
        correct: 2,
        explanation: "Symmetry requires that every directed edge has a backward arrow: if x relates to y, y must relate to x.",
    },
    {
        question: "What is the relationship between the domains and ranges of a relation $R$ and its inverse $R^{-1}$?",
        options: [
            "They are exactly the same",
            "Domain of $R$ = Domain of $R^{-1}$",
            "Domain of $R$ = Range of $R^{-1}$",
            "They have no relationship"
        ],
        correct: 2,
        explanation: "Because $R^{-1}$ swaps the coordinates, the Domain of $R$ becomes the Range of $R^{-1}$, and vice-versa.",
    },
    {
        question: "If a relation assigns more than one element in B to an element in A, it is a:",
        options: ["One-to-one relation", "Many-to-one relation", "One-to-many relation", "Equivalence relation"],
        correct: 2,
        explanation: "One input in A mapping to MULTIPLE outputs in B is the definition of a one-to-many relation.",
    },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function RelationsTerminology() {
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
        <div className="rel-terminology-page">
            <style>{`
                .rel-details-window-anim {
                    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .rel-term-btn-mini {
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
                .rel-term-btn-mini::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    z-index: 0;
                    transition: opacity 0.2s;
                    opacity: 1;
                }
                .rel-term-btn-mini:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
                }
                .rel-term-btn-mini:hover::before {
                    opacity: 0.9;
                }
                .rel-term-btn-mini.active {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    z-index: 2;
                }
                .rel-term-btn-mini.active::before {
                    opacity: 0;
                }
                .rel-term-btn-mini > * {
                    position: relative;
                    z-index: 1;
                }
                
                @media (max-width: 1024px) {
                    .rel-lexicon-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .rel-selector-container {
                        max-width: 600px;
                        margin: 0 auto 16px;
                    }
                }
            `}</style>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <RelationsTopNav
                active="terminology"
                backLabel="Back to Relations"
            />
            {false && <nav className="rel-intro-nav">
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
                        className="rel-intro-nav-link rel-intro-nav-link--active"
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="rel-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/relations/skills")}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>}

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div
                className="rel-lexicon-container"
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
                            color: "var(--rel-text)",
                            margin: "0 0 8px",
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
                            Vocabulary
                        </span>
                    </h1>
                    <div
                        style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "var(--rel-muted)",
                            letterSpacing: 0.5,
                        }}
                    >
                        {activeTab === "quiz"
                            ? "Test your knowledge with 10 interactive questions!"
                            : `Select any ${activeTab === "terms" ? "term" : "property"} below to explore details.`}
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
                        className={`rel-tab ${activeTab === "terms" ? "active" : ""}`}
                        onClick={() => setActiveTab("terms")}
                    >
                        📚 Terminology
                    </button>
                    <button
                        className={`rel-tab ${activeTab === "rules" ? "active" : ""}`}
                        onClick={() => setActiveTab("rules")}
                    >
                        📏 Properties
                    </button>
                    <button
                        className={`rel-tab ${activeTab === "quiz" ? "active" : ""}`}
                        onClick={() => setActiveTab("quiz")}
                    >
                        🧪 Test Prep
                    </button>
                </div>

                {activeTab !== "quiz" ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Rules) ── */
                    <div
                        className="rel-lexicon-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(300px, 360px) 1fr",
                            gap: 16,
                            alignItems: "start",
                        }}
                    >
                        <aside
                            className="rel-selector-container"
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
                                            className={`rel-term-btn-mini ${isActive ? "active" : ""}`}
                                            onClick={() => setSelectedIdx(i)}
                                            style={{
                                                background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`,
                                                borderColor: isActive
                                                    ? term.color
                                                    : `${term.color}20`,
                                                gridColumn:
                                                    i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? "span 2" : "span 1",
                                                justifyContent: "flex-start",
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
                                                    flexShrink: 0
                                                }}
                                            >
                                                {term.icon}
                                            </div>
                                            <span
                                                style={{
                                                    fontWeight: 800,
                                                    fontSize: 14,
                                                    color: isActive ? "#fff" : "var(--rel-text)",
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
                                            className={`term-btn-mini ${isActive ? "active" : ""}`}
                                            onClick={() => setSelectedRuleIdx(i)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 14,
                                                background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`,
                                                borderColor: isActive
                                                    ? rule.color
                                                    : `${rule.color}20`,
                                                border: "1px solid",
                                                padding: "12px 16px",
                                                borderRadius: "12px",
                                                cursor: "pointer",
                                                position: "relative",
                                                overflow: "hidden",
                                                textAlign: "left"
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
                                                    zIndex: 1,
                                                    flexShrink: 0
                                                }}
                                            >
                                                {rule.num}
                                            </div>
                                            <div
                                                style={{ display: "flex", flexDirection: "column", zIndex: 1 }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: 800,
                                                        fontSize: 16,
                                                        color: isActive ? "#fff" : "var(--rel-text)",
                                                        lineHeight: 1,
                                                    }}
                                                >
                                                    {rule.title}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: isActive
                                                            ? "rgba(255,255,255,0.8)"
                                                            : "var(--rel-muted)",
                                                        textTransform: "uppercase",
                                                        letterSpacing: 0.5,
                                                        marginTop: 4,
                                                    }}
                                                >
                                                    Property {rule.num}
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
                            className="rel-details-window-anim"
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
                                            color: "var(--rel-text)",
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
                                                        color: "var(--rel-muted)",
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
                                                    color: "#8b5cf6",
                                                    marginBottom: 10,
                                                }}
                                            >
                                                Mental Hook
                                            </h4>
                                            <div
                                                style={{
                                                    background: "rgba(139, 92, 246, 0.05)",
                                                    padding: 16,
                                                    borderRadius: 16,
                                                    border: "1px solid rgba(139, 92, 246, 0.1)",
                                                    display: "flex",
                                                    gap: 12,
                                                }}
                                            >
                                                <div style={{ fontSize: 20 }}>🧠</div>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: 15,
                                                        color: "var(--rel-text)",
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    {activeTerm.memory}
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
                                                background: `${activeRule.color}`,
                                                color: "#fff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 22,
                                                fontWeight: 900,
                                            }}
                                        >
                                            #{activeRule.num}
                                        </div>
                                        <h2
                                            style={{
                                                fontFamily: "Outfit, sans-serif",
                                                fontSize: 24,
                                                fontWeight: 900,
                                                color: activeRule.color,
                                                margin: 0,
                                            }}
                                        >
                                            {activeRule.title} {activeRule.emoji}
                                        </h2>
                                    </div>
                                    <div
                                        style={{
                                            background: "rgba(255,255,255,0.5)",
                                            padding: 16,
                                            borderRadius: 12,
                                            borderLeft: `4px solid ${activeRule.color}`,
                                            marginBottom: 20,
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 800,
                                                color: "var(--rel-text)",
                                                margin: 0,
                                            }}
                                        >
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 16,
                                            color: "var(--rel-muted)",
                                            lineHeight: 1.6,
                                            margin: "0 0 24px",
                                        }}
                                    >
                                        <MathRenderer text={activeRule.detail} />
                                    </p>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(180px, 1fr))",
                                            gap: 20,
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: `${activeRule.color}05`,
                                                padding: 16,
                                                borderRadius: 16,
                                                border: `1px solid ${activeRule.color}15`,
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 11,
                                                    letterSpacing: 1,
                                                    color: activeRule.color,
                                                    marginBottom: 8,
                                                    marginTop: 0,
                                                }}
                                            >
                                                In Action
                                            </h4>
                                            <ul
                                                style={{
                                                    margin: 0,
                                                    paddingLeft: 20,
                                                    color: "var(--rel-text)",
                                                    fontSize: 14,
                                                }}
                                            >
                                                {activeRule.examples.map((ex, j) => (
                                                    <li key={j} style={{ marginBottom: 6 }}>
                                                        <MathRenderer text={ex} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div
                                            style={{
                                                background: "rgba(16, 185, 129, 0.05)",
                                                padding: 16,
                                                borderRadius: 16,
                                                border: "1px solid rgba(16, 185, 129, 0.15)",
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 11,
                                                    letterSpacing: 1,
                                                    color: "#059669",
                                                    marginBottom: 8,
                                                    marginTop: 0,
                                                }}
                                            >
                                                Pro Tip
                                            </h4>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: 14,
                                                    color: "#047857",
                                                    lineHeight: 1.5,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {activeRule.tip}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── QUIZ VIEW ── */
                    <div
                        className="rel-quiz-container"
                        style={{
                            maxWidth: 700,
                            margin: "0 auto",
                            background: "#fff",
                            borderRadius: 24,
                            padding: 32,
                            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
                            border: "1px solid rgba(0,0,0,0.04)",
                        }}
                    >
                        {quizFinished ? (
                            <div style={{ textAlign: "center", padding: "40px 20px" }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>
                                    {quizTotalScore >= 8
                                        ? "🏆"
                                        : quizTotalScore >= 5
                                            ? "👍"
                                            : "📚"}
                                </div>
                                <h2
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 900,
                                        color: "var(--rel-text)",
                                        marginBottom: 12,
                                    }}
                                >
                                    Quiz Complete!
                                </h2>
                                <p
                                    style={{
                                        fontSize: 18,
                                        color: "var(--rel-muted)",
                                        marginBottom: 32,
                                    }}
                                >
                                    You scored <strong>{quizTotalScore}</strong> out of{" "}
                                    {VOCAB_QUIZ.length}.
                                </p>
                                <button
                                    className="rel-btn-primary"
                                    onClick={resetQuiz}
                                    style={{
                                        padding: "12px 24px",
                                        background: "var(--rel-indigo)",
                                    }}
                                >
                                    Retry Quiz
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 24,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 800,
                                            color: "var(--rel-teal)",
                                            textTransform: "uppercase",
                                            letterSpacing: 1,
                                        }}
                                    >
                                        Question {quizIdx + 1} of {VOCAB_QUIZ.length}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: "var(--rel-muted)",
                                        }}
                                    >
                                        Score: {quizTotalScore}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        width: "100%",
                                        height: 6,
                                        background: "#f1f5f9",
                                        borderRadius: 4,
                                        marginBottom: 32,
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "100%",
                                            width: `${((quizIdx + 1) / VOCAB_QUIZ.length) * 100}%`,
                                            background: "var(--rel-teal)",
                                            transition: "width 0.3s ease",
                                        }}
                                    />
                                </div>

                                <h3
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: "var(--rel-text)",
                                        lineHeight: 1.5,
                                        marginBottom: 24,
                                    }}
                                >
                                    <MathRenderer text={activeQuiz.question} />
                                </h3>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                        marginBottom: 32,
                                    }}
                                >
                                    {activeQuiz.options.map((opt, i) => {
                                        const isSelected = quizSelected === i;
                                        const isCorrect = i === activeQuiz.correct;

                                        let bg = "#fff";
                                        let borderColor = "rgba(0,0,0,0.1)";
                                        let color = "var(--rel-text)";

                                        if (quizAnswered) {
                                            if (isCorrect) {
                                                bg = "rgba(16, 185, 129, 0.1)";
                                                borderColor = "#10b981";
                                                color = "#047857";
                                            } else if (isSelected) {
                                                bg = "rgba(239, 68, 68, 0.1)";
                                                borderColor = "#ef4444";
                                                color = "#b91c1c";
                                            } else {
                                                bg = "#f8fafc";
                                                color = "var(--rel-muted)";
                                            }
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleQuizSelect(i)}
                                                disabled={quizAnswered}
                                                style={{
                                                    padding: "16px 20px",
                                                    borderRadius: 16,
                                                    border: `2px solid ${borderColor}`,
                                                    background: bg,
                                                    color: color,
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                    textAlign: "left",
                                                    cursor: quizAnswered ? "default" : "pointer",
                                                    transition: "all 0.2s",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <MathRenderer text={opt} />
                                                {quizAnswered && isCorrect && <span>✓</span>}
                                                {quizAnswered && isSelected && !isCorrect && (
                                                    <span>✗</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div
                                        className="rel-details-window-anim"
                                        style={{
                                            background: "rgba(99, 102, 241, 0.05)",
                                            padding: 20,
                                            borderRadius: 16,
                                            borderLeft: "4px solid #6366f1",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 16,
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: 15,
                                                color: "var(--rel-text)",
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            <strong style={{ color: "#4f46e5" }}>
                                                Explanation:
                                            </strong>{" "}
                                            <MathRenderer text={activeQuiz.explanation} />
                                        </p>
                                        <button
                                            className="rel-btn-primary"
                                            onClick={nextQuiz}
                                            style={{ alignSelf: "flex-end" }}
                                        >
                                            {quizIdx + 1 === VOCAB_QUIZ.length
                                                ? "Finish Quiz"
                                                : "Next Question →"}
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
