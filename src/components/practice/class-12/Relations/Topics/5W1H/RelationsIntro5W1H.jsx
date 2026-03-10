import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Relations.css";
import MathRenderer from "../../../../../MathRenderer";

const cards5W1H = [
    {
        q: "WHAT",
        label: "What is a Relation?",
        icon: "🔗",
        gradFrom: "#0891b2",
        gradTo: "#06b6d4",
        shadow: "rgba(6,182,212,0.35)",
        content: `In mathematics, a **Relation** is a set of ordered pairs showing a connection or link between elements of two sets. Formally, if $A$ and $B$ are two sets, a relation $R$ from $A$ to $B$ is a subset of the Cartesian product $A \\times B$. \n\nIf $(x, y) \\in R$, we say $x$ is related to $y$, often written as $xRy$. By extracting the first and second coordinates, we can define the **Domain** (all valid inputs) and **Range** (all resulting outputs).`,
        fact: '💡 Just as "brother of" connects two people, a mathematical relation connects two mathematical objects (like numbers or shapes)!',
    },
    {
        q: "WHO",
        label: "Who invented Set Theory & Relations?",
        icon: "👥",
        gradFrom: "#059669",
        gradTo: "#10b981",
        shadow: "rgba(16,185,129,0.35)",
        content: `The formal definitions we use today were pioneered by mathematicians in the late 19th and early 20th centuries. **Georg Cantor** established Set Theory, the language needed to define relations. \n\nLater, **Giuseppe Peano** and **Kazimierz Kuratowski** formalised the concept of an *ordered pair*, reducing relations to pure set theory. Mathematical logic pioneers like **Gottlob Frege** and **Bertrand Russell** heavily relied on relations to build the foundations of modern mathematics.`,
        fact: "💡 Kuratowski's definition of an ordered pair $(a, b)$ is elegantly defined using pure sets: $\\{\\{a\\}, \\{a, b\\}\\}$!",
    },
    {
        q: "WHEN",
        label: "When did Relations become formal?",
        icon: "📅",
        gradFrom: "#b45309",
        gradTo: "#f59e0b",
        shadow: "rgba(245,158,11,0.35)",
        content: `While humans have always reasoned about relationships (like "is taller than" or "is a factor of"), the *formal mathematical definition* emerged during the crisis in foundations of mathematics between **1870 and 1920**.\n\nMathematicians realised they needed a rigorous way to define "functions." They achieved this by first defining relations as subsets of Cartesian products, and then defining functions as a special, strict type of relation.`,
        fact: "💡 Every function is a relation, but not every relation is a function! Relations are the broader, more forgiving parent concept.",
    },
    {
        q: "WHERE",
        label: "Where are Relations applied?",
        icon: "🌍",
        gradFrom: "#be185d",
        gradTo: "#ec4899",
        shadow: "rgba(236,72,153,0.35)",
        content: `Relations are everywhere in Computer Science and discrete mathematics. The entire internet runs on **Relational Databases** (SQL), which literally store data as mathematical relations (tables of records).\n\nIn Graph Theory, relations define the edges (connections) between nodes (cities, websites, people). **Equivalence relations** are used extensively in abstract algebra and topology to group things that are "essentially the same" (like fractions $1/2$ and $2/4$).`,
        fact: "💡 When you write a SQL query like `SELECT *`, you are executing operations from Relational Algebra, invented by Edgar F. Codd in 1970!",
    },
    {
        q: "WHY",
        label: "Why study properties of Relations?",
        icon: "🚀",
        gradFrom: "#7c3aed",
        gradTo: "#a855f7",
        shadow: "rgba(168,85,247,0.35)",
        content: `Understanding how elements relate allows us to categorize the world. If a relation is **Reflexive, Symmetric, and Transitive**, it's called an *Equivalence Relation*. This behaves just like "Equality" ($=$) and partitions a set into distinct, non-overlapping groups.\n\nIf an element relates to at most one other element, it points toward the concept of a **Function**, which models predictable systems in calculus and physics. Studying relations helps you think logically and structurally.`,
        fact: "💡 Without the concept of equivalence relations, we couldn't properly define rational numbers, modular arithmetic, or vectors!",
    },
    {
        q: "HOW",
        label: "How do we operate on Relations?",
        icon: "🎯",
        gradFrom: "#0369a1",
        gradTo: "#3b82f6",
        shadow: "rgba(59,130,246,0.35)",
        content: `Since relations are just sets of ordered pairs, we use set operations! We can take the **Union** ($R_1 \\cup R_2$) or **Intersection** of relations. \n\nWe can find the **Inverse Relation** $R^{-1}$ by simply flipping every ordered pair: if $(x, y) \\in R$, then $(y, x) \\in R^{-1}$. We can also **Compose** relations ($g \\circ f$): if $x$ maps to $y$, and $y$ maps to $z$, the composite relation maps $x$ directly to $z$.`,
        fact: "💡 The number of possible relations from a set $A$ (with $m$ elements) to a set $B$ (with $n$ elements) is a massive $2^{mn}$!",
    },
];

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`rel-intro-card${open ? " rel-intro-card--open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            style={{
                borderColor: open ? card.gradFrom + "60" : "#e2e8f0",
                boxShadow: open
                    ? `0 8px 32px ${card.shadow}`
                    : "0 2px 10px rgba(0,0,0,0.07)",
            }}
        >
            {/* Gradient top strip */}
            <div
                className="rel-intro-card-strip"
                style={{
                    background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})`,
                }}
            />

            {/* Header row */}
            <div className="rel-intro-card-header">
                {/* Icon */}
                <div
                    className="rel-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className="rel-intro-card-title-block">
                    <div className="rel-intro-card-q" style={{ color: card.gradFrom }}>
                        {card.q}
                    </div>
                    <div className="rel-intro-card-sublabel">{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className="rel-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : "#94a3b8",
                        transform: open ? "rotate(180deg)" : "none",
                    }}
                >
                    ▼
                </div>
            </div>

            {/* Collapsed hint */}
            {!open && <div className="rel-intro-card-hint">Tap to explore →</div>}

            {/* Expanded content */}
            {open && (
                <div className="rel-intro-card-body">
                    <div className="rel-intro-card-content">
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className="rel-intro-card-fact"
                        style={{
                            background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                            borderColor: card.gradFrom + "30",
                        }}
                    >
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Main page ───────────────────────────────────── */
export default function RelationsIntro5W1H() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="rel-intro-page">
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
                        className="rel-intro-nav-link rel-intro-nav-link--active"
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
                        className="rel-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/relations/skills")}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="rel-intro-hero" style={{ padding: "16px 24px 20px" }}>
                <div className="rel-intro-hero-deco rel-intro-hero-deco-a" />
                <div className="rel-intro-hero-deco rel-intro-hero-deco-b" />
                <div className="rel-intro-hero-inner">
                    <h1 className="rel-intro-hero-title">
                        Discover Relations Through{" "}
                        <span className="rel-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="rel-intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="rel-intro-content" style={{ padding: "10px 24px 20px" }}>
                <div className="rel-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="rel-intro-cta-strip">
                    <p className="rel-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: 10 key terms &amp; essential properties
                    </p>
                    <button
                        className="rel-intro-cta-btn"
                        onClick={() => navigate("/senior/grade/12/relations/terminology")}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
