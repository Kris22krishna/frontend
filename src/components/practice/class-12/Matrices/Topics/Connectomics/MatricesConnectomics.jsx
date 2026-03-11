import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { matricesConnectomicsData as data } from "./MatricesConnectomicsData";
import "../../MatricesPages.css";
import MathRenderer from "../../../../../MathRenderer";

const HERO_STATS = [
    { label: "Learning Targets", value: data.learningObjectives.length },
    { label: "Core Connections", value: data.conceptMap.links.length },
    { label: "Topic Zones", value: data.topicBreakdown.length },
];

export default function MatricesConnectomics() {
    const navigate = useNavigate();
    const [expandedTopics, setExpandedTopics] = useState(new Set([0]));

    const toggleTopic = (idx) => {
        setExpandedTopics((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mat-page mat-connect-page">
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
                        className="mat-intro-nav-link mat-intro-nav-link--active"
                        onClick={() => navigate("/senior/grade/12/matrices/connectomics")}
                    >
                        🌐 Connectomics
                    </button>
                    <button
                        className="mat-intro-nav-link"
                        onClick={() => navigate("/senior/grade/12/matrices/exam-edge")}
                    >
                        ⚔️ Exam Edge
                    </button>
                </div>
            </nav>

            <header className="mat-connect-hero">
                <div className="mat-connect-hero-shell">
                    <div className="mat-connect-hero-copy">
                        <div className="mat-hero-badge">{data.hero.badge}</div>
                        <h1 className="mat-connect-title">
                            {data.hero.title} <span>{data.hero.highlight}</span>
                        </h1>
                        <p className="mat-connect-subtitle">{data.hero.subtitle}</p>
                    </div>

                    <div className="mat-connect-hero-panel">
                        <div className="mat-connect-panel-label">Chapter Spine</div>
                        <div className="mat-connect-node-cloud">
                            {data.conceptMap.nodes.slice(0, 6).map((node) => (
                                <div
                                    key={node.id}
                                    className="mat-connect-node-chip"
                                    style={{ "--chip-color": node.color }}
                                >
                                    <span>{node.icon}</span>
                                    <span>{node.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mat-connect-hero-stats">
                            {HERO_STATS.map((stat) => (
                                <div key={stat.label} className="mat-connect-stat">
                                    <span className="mat-connect-stat-value">{stat.value}</span>
                                    <span className="mat-connect-stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="mat-section mat-connect-main">
                <section className="mat-connect-section">
                    <div className="mat-connect-section-head">
                        <div>
                            <p className="mat-connect-kicker">What this page gives you</p>
                            <h2 className="mat-section-title">
                                Learning <span>Objectives</span>
                            </h2>
                        </div>
                        <p className="mat-section-subtitle">
                            The exact outcomes you should be able to demonstrate after this chapter.
                        </p>
                    </div>

                    <div className="mat-connect-objectives">
                        {data.learningObjectives.map((objective, idx) => (
                            <article key={idx} className="mat-connect-objective-card">
                                <div className="mat-connect-objective-index">
                                    {String(idx + 1).padStart(2, "0")}
                                </div>
                                <p>{objective}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mat-connect-section">
                    <div className="mat-connect-section-head">
                        <div>
                            <p className="mat-connect-kicker">Flow of ideas</p>
                            <h2 className="mat-section-title">
                                Concept <span>Map</span>
                            </h2>
                        </div>
                        <p className="mat-section-subtitle">
                            Follow how one idea unlocks the next instead of memorising topics in isolation.
                        </p>
                    </div>

                    <div className="mat-connect-flow">
                        {data.conceptMap.links.map((link, idx) => {
                            const fromNode = data.conceptMap.nodes.find((node) => node.id === link.from);
                            const toNode = data.conceptMap.nodes.find((node) => node.id === link.to);
                            if (!fromNode || !toNode) return null;

                            return (
                                <article
                                    key={idx}
                                    className="mat-connect-flow-card"
                                    style={{ "--flow-color": fromNode.color }}
                                >
                                    <div className="mat-connect-flow-track">
                                        <div className="mat-connect-flow-icon">{fromNode.icon}</div>
                                        <div className="mat-connect-flow-line" />
                                        <div className="mat-connect-flow-icon mat-connect-flow-icon--end">
                                            {toNode.icon}
                                        </div>
                                    </div>

                                    <div className="mat-connect-flow-body">
                                        <div className="mat-connect-flow-tag">Connection {idx + 1}</div>
                                        <div className="mat-connect-flow-path">
                                            <span>{fromNode.label}</span>
                                            <span className="mat-connect-flow-arrow">→</span>
                                            <span>{toNode.label}</span>
                                        </div>
                                        <p>{link.tooltip}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="mat-connect-section">
                    <div className="mat-connect-section-head">
                        <div>
                            <p className="mat-connect-kicker">Deep dive by unit</p>
                            <h2 className="mat-section-title">
                                Topic <span>Breakdown</span>
                            </h2>
                        </div>
                        <p className="mat-section-subtitle">
                            Expand each zone to see the concept, a worked idea, the common trap, and the practice ladder.
                        </p>
                    </div>

                    <div className="mat-connect-accordion">
                        {data.topicBreakdown.map((topic, idx) => {
                            const isExpanded = expandedTopics.has(idx);

                            return (
                                <article
                                    key={topic.id}
                                    className={`mat-connect-topic ${isExpanded ? "is-open" : ""}`}
                                >
                                    <button
                                        className="mat-connect-topic-toggle"
                                        onClick={() => toggleTopic(idx)}
                                    >
                                        <div className="mat-connect-topic-heading">
                                            <div className="mat-connect-topic-id">{topic.id}</div>
                                            <div>
                                                <h3>{topic.title}</h3>
                                                <p>{topic.concepts}</p>
                                            </div>
                                        </div>
                                        <div className="mat-connect-topic-caret">{isExpanded ? "−" : "+"}</div>
                                    </button>

                                    {isExpanded && (
                                        <div className="mat-connect-topic-panel">
                                            <div className="mat-connect-topic-grid">
                                                <div className="mat-connect-detail-card mat-connect-detail-card--concept">
                                                    <div className="mat-connect-detail-label">Core Concept</div>
                                                    <MathRenderer text={topic.concepts} />
                                                </div>

                                                <div className="mat-connect-detail-card">
                                                    <div className="mat-connect-detail-label">Worked Example</div>
                                                    <p>{topic.example}</p>
                                                </div>

                                                <div className="mat-connect-detail-card mat-connect-detail-card--warning">
                                                    <div className="mat-connect-detail-label">Common Mistake</div>
                                                    <MathRenderer text={topic.mistake} />
                                                </div>
                                            </div>

                                            <div className="mat-connect-practice">
                                                <div className="mat-connect-detail-label">Practice Ladder</div>
                                                <div className="mat-connect-practice-list">
                                                    {topic.problems.map((problem, problemIdx) => (
                                                        <div key={problemIdx} className="mat-connect-practice-item">
                                                            <span className={`mat-connect-level mat-connect-level--${problem.level.toLowerCase()}`}>
                                                                {problem.level}
                                                            </span>
                                                            <div className="mat-connect-practice-question">
                                                                <MathRenderer text={problem.q} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="mat-connect-section">
                    <div className="mat-connect-two-col">
                        <div className="mat-connect-panel-card">
                            <div className="mat-connect-section-head mat-connect-section-head--compact">
                                <div>
                                    <p className="mat-connect-kicker">Teacher lens</p>
                                    <h2 className="mat-section-title">
                                        Pedagogy <span>Sequence</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="mat-connect-weeks">
                                {data.pedagogy.map((plan) => (
                                    <article key={plan.week} className="mat-connect-week-card">
                                        <div className="mat-connect-week-tag">{plan.week}</div>
                                        <h3>{plan.title}</h3>
                                        <p>{plan.focus}</p>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="mat-connect-panel-card mat-connect-panel-card--warning">
                            <div className="mat-connect-section-head mat-connect-section-head--compact">
                                <div>
                                    <p className="mat-connect-kicker">Student traps</p>
                                    <h2 className="mat-section-title">
                                        Common <span>Misconceptions</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="mat-connect-misconceptions">
                                {data.misconceptions.map((item, idx) => (
                                    <article key={idx} className="mat-connect-misc-card">
                                        <div className="mat-connect-misc-badge">!</div>
                                        <div>
                                            <div className="mat-connect-misc-statement">
                                                <MathRenderer text={item.statement} />
                                            </div>
                                            <div className="mat-connect-misc-truth">
                                                <MathRenderer text={item.truth} />
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mat-connect-cta">
                    <div>
                        <p className="mat-connect-kicker">Next move</p>
                        <h3>Use the map. Then train for marks.</h3>
                        <p>
                            Once the chapter structure is clear, shift to exam pattern drills and timed question selection.
                        </p>
                    </div>
                    <button onClick={() => navigate("/senior/grade/12/matrices/exam-edge")}>
                        Open Exam Edge →
                    </button>
                </section>
            </main>
        </div>
    );
}
