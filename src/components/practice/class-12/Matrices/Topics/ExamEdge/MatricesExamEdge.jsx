import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { matricesExamEdgeData as data } from "./MatricesExamEdgeData";
import "../../MatricesPages.css";
import MathRenderer from "../../../../../MathRenderer";

const QUESTION_TABS = [
    { id: "kcet", label: "KCET Sprint", accent: "#0891b2" },
    { id: "jee", label: "JEE Main", accent: "#ef4444" },
    { id: "jeeAdvanced", label: "JEE Advanced", accent: "#7c3aed" },
];

const HERO_STATS = [
    { label: "Exam Tracks", value: data.primers.length },
    { label: "High-Yield Buckets", value: data.highYield.length },
    { label: "Revision Phases", value: data.revisionPlan.length },
];

export default function MatricesExamEdge() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("kcet");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const currentTab = QUESTION_TABS.find((tab) => tab.id === activeTab) || QUESTION_TABS[0];
    const questionSet = data.questions[activeTab];

    return (
        <div className="mat-page mat-exam-page">
            <nav className="mat-intro-nav">
                <button
                    className="mat-intro-nav-back"
                    onClick={() => navigate("/senior/grade/12/matrices")}
                >
                    ← Back to Matrices
                </button>
                <div className="mat-intro-nav-links">
                    <button
                        className="mat-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/matrices/introduction")}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="mat-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/matrices/terminology")}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="mat-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/matrices/skills")}
                    >
                        🎯 Skills
                    </button>
                    <button
                        className="mat-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/matrices/connectomics")}
                    >
                        🌐 Connectomics
                    </button>
                    <button
                        className="mat-intro-nav-link mat-intro-nav-link--active"
                        onClick={() => navigate("/senior/grade/12/matrices/exam-edge")}
                    >
                        ⚔️ Exam Edge
                    </button>
                </div>
            </nav>

            <header className="mat-exam-hero">
                <div className="mat-exam-hero-shell">
                    <div className="mat-exam-hero-copy">
                        <div className="mat-hero-badge">{data.hero.badge}</div>
                        <h1 className="mat-exam-title">
                            Matrices <span>{data.hero.title}</span>
                        </h1>
                        <p className="mat-exam-subtitle">{data.hero.subtitle}</p>
                    </div>

                    <div className="mat-exam-hero-side">
                        <div className="mat-exam-side-card">
                            <div className="mat-exam-side-label">Mission Snapshot</div>
                            <div className="mat-exam-side-stats">
                                {HERO_STATS.map((stat) => (
                                    <div key={stat.label} className="mat-exam-stat">
                                        <span className="mat-exam-stat-value">{stat.value}</span>
                                        <span className="mat-exam-stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mat-section mat-exam-main">
                <section className="mat-exam-section">
                    <div className="mat-exam-section-head">
                        <div>
                            <p className="mat-exam-kicker">Know the paper</p>
                            <h2 className="mat-section-title">
                                Exam <span>Primer</span>
                            </h2>
                        </div>
                        <p className="mat-section-subtitle">
                            Different exams reward different behaviours. Calibrate your preparation before you practise.
                        </p>
                    </div>

                    <div className="mat-exam-primer-grid">
                        {data.primers.map((primer) => (
                            <article key={primer.exam} className="mat-exam-primer-card">
                                <div className="mat-exam-primer-top">
                                    <h3>{primer.exam}</h3>
                                    <a href={primer.link} target="_blank" rel="noreferrer">
                                        Official Site ↗
                                    </a>
                                </div>
                                <p>{primer.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mat-exam-section">
                    <div className="mat-exam-section-head">
                        <div>
                            <p className="mat-exam-kicker">Study with leverage</p>
                            <h2 className="mat-section-title">
                                High-Yield <span>Topics</span>
                            </h2>
                        </div>
                    </div>

                    <div className="mat-exam-yield-grid">
                        {data.highYield.map((item) => (
                            <article
                                key={item.category}
                                className="mat-exam-yield-card"
                                style={{ "--exam-color": item.color }}
                            >
                                <div className="mat-exam-yield-label">Priority Bucket</div>
                                <h3>{item.category}</h3>
                                <ul>
                                    {item.topics.map((topic, idx) => (
                                        <li key={idx}>{topic}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mat-exam-section">
                    <div className="mat-exam-two-col">
                        <div className="mat-exam-panel">
                            <div className="mat-exam-section-head mat-exam-section-head--compact">
                                <div>
                                    <p className="mat-exam-kicker">Execution under pressure</p>
                                    <h2 className="mat-section-title">
                                        Strategy <span>Playbook</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="mat-exam-strategy-list">
                                {data.strategy.map((item) => (
                                    <article
                                        key={item.exam}
                                        className="mat-exam-strategy-card"
                                        style={{ "--exam-color": item.color }}
                                    >
                                        <div className="mat-exam-strategy-head">
                                            <div className="mat-exam-strategy-icon">{item.icon}</div>
                                            <h3>{item.exam}</h3>
                                        </div>
                                        <ul>
                                            {item.points.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="mat-exam-panel mat-exam-panel--dark">
                            <div className="mat-exam-section-head mat-exam-section-head--compact">
                                <div>
                                    <p className="mat-exam-kicker">Shortcuts worth keeping</p>
                                    <h2 className="mat-section-title">
                                        Toppers' <span>Tricks</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="mat-exam-tricks-grid">
                                {data.tricks.map((trick) => (
                                    <article key={trick.title} className="mat-exam-trick-card">
                                        <h3>{trick.title}</h3>
                                        <div className="mat-exam-trick-copy">
                                            <MathRenderer text={trick.content} />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mat-exam-section">
                    <div className="mat-exam-section-head">
                        <div>
                            <p className="mat-exam-kicker">Practise by paper style</p>
                            <h2 className="mat-section-title">
                                Question <span>Desk</span>
                            </h2>
                        </div>
                    </div>

                    <div className="mat-exam-tabs">
                        {QUESTION_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                className={`mat-exam-tab ${activeTab === tab.id ? "is-active" : ""}`}
                                style={{
                                    "--tab-color": tab.accent,
                                    "--tab-surface": `${tab.accent}12`,
                                }}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mat-exam-questions-shell" style={{ "--tab-color": currentTab.accent }}>
                        {activeTab === "jeeAdvanced" ? (
                            <div className="mat-exam-advanced-list">
                                {questionSet.map((item, idx) => (
                                    <article key={idx} className="mat-exam-advanced-card">
                                        <div className="mat-exam-question-number">Problem {idx + 1}</div>
                                        <div className="mat-exam-question-copy">
                                            <MathRenderer text={item.q} />
                                        </div>
                                        <div className="mat-exam-insight">
                                            <span>Insight</span>
                                            <MathRenderer text={item.ans} />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="mat-exam-question-grid">
                                {questionSet.map((item, idx) => (
                                    <article key={idx} className="mat-exam-question-card">
                                        <div className="mat-exam-question-top">
                                            <span className={`mat-exam-level mat-exam-level--${item.level.toLowerCase()}`}>
                                                {item.level}
                                            </span>
                                            <span className="mat-exam-question-number">Q{idx + 1}</span>
                                        </div>

                                        <div className="mat-exam-question-copy">
                                            <MathRenderer text={item.q} />
                                        </div>

                                        {item.options && (
                                            <div className="mat-exam-options">
                                                {item.options.map((option, optionIdx) => (
                                                    <div key={optionIdx} className="mat-exam-option">
                                                        <span>{String.fromCharCode(65 + optionIdx)}</span>
                                                        <MathRenderer text={option} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="mat-exam-section">
                    <div className="mat-exam-section-head">
                        <div>
                            <p className="mat-exam-kicker">Last 14 days</p>
                            <h2 className="mat-section-title">
                                Revision <span>Timeline</span>
                            </h2>
                        </div>
                    </div>

                    <div className="mat-exam-timeline">
                        {data.revisionPlan.map((step, idx) => (
                            <article key={step.phase} className="mat-exam-timeline-card">
                                <div className="mat-exam-timeline-step">{idx + 1}</div>
                                <div>
                                    <div className="mat-exam-timeline-phase">{step.phase}</div>
                                    <p>{step.focus}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mat-exam-cta">
                    <div>
                        <p className="mat-exam-kicker">Close the loop</p>
                        <h3>Need raw question volume before mocks?</h3>
                        <p>
                            Go back to the skills page for targeted repetition, then return here for timed exam simulation.
                        </p>
                    </div>
                    <button onClick={() => navigate("/senior/grade/12/matrices/skills")}>
                        Back to Skills →
                    </button>
                </section>
            </main>
        </div>
    );
}
