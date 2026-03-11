import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { matricesExamEdgeData as data } from "./MatricesExamEdgeData";
import "../../MatricesPages.css";
import MathRenderer from "../../../../../MathRenderer";
import { Trophy, Target, AlertTriangle, Lightbulb } from "lucide-react";

const EXAM_TABS = [
    { id: "kcet", name: "KCET", color: "#0d9488", emoji: "🌟" },
    { id: "jee", name: "JEE Main", color: "#f59e0b", emoji: "🥇" },
    { id: "jeeAdvanced", name: "JEE Advanced", color: "#ef4444", emoji: "🔬" },
];

export default function MatricesExamEdge() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("kcet");

    const currentTab = EXAM_TABS.find(t => t.id === activeTab);
    const questionSet = data.questions[activeTab] || [];

    // Find the strategy for the current tab
    const currentStrategy = data.strategy.find(s =>
        activeTab === "kcet" ? s.exam.includes("KCET") : s.exam.includes("JEE")
    );

    return (
        <div className="mat-page">
            <nav className="mat-intro-nav">
                <button className="mat-intro-nav-back" onClick={() => navigate("/senior/grade/12/matrices")}>
                    ← Back to Dashboard
                </button>
            </nav>

            <div className="mat-intro-hero">
                <div className="mat-intro-hero-deco mat-intro-hero-deco-a" />
                <div className="mat-intro-hero-deco mat-intro-hero-deco-b" />
                <div className="mat-intro-hero-inner">
                    <h1 className="mat-intro-hero-title">Matrices <span className="mat-intro-hero-highlight">Exam Edge</span></h1>
                    <p className="mat-intro-hero-sub">Strategic insights and high-weightage topics for competitive exams.</p>
                </div>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

                {/* Exam Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {EXAM_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '100px',
                                border: '2px solid',
                                borderColor: activeTab === tab.id ? tab.color : '#e2e8f0',
                                background: activeTab === tab.id ? `${tab.color}10` : '#fff',
                                color: activeTab === tab.id ? tab.color : '#64748b',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>{tab.emoji}</span> {tab.name}
                        </button>
                    ))}
                </div>

                <div style={{ background: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>

                    {/* High Yield Topics */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Target size={18} color={currentTab.color} /> High-Yield Topics
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {data.highYield
                                .filter(hy =>
                                    activeTab === "kcet" ? hy.category.includes("KCET") || hy.category.includes("Core") :
                                    activeTab === "jee" ? hy.category.includes("JEE") || hy.category.includes("Core") :
                                    true
                                )
                                .flatMap(hy => hy.topics)
                                .map((t, idx) => (
                                    <div key={idx} style={{ background: '#f8fafc', padding: '10px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 700, color: '#1e1b4b' }}>
                                        <MathRenderer text={t} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Strategy & Tricks */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Trophy size={18} color="#f59e0b" /> Winning Strategy
                            </h3>
                            <div style={{ background: '#fffbeb', padding: '24px', borderRadius: '20px', border: '1px solid #fef3c7', color: '#92400e', fontSize: '16px', lineHeight: 1.6 }}>
                                {currentStrategy ? (
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {currentStrategy.points.map((p, idx) => (
                                            <li key={idx} style={{ marginBottom: '8px' }}>{p}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Combine JEE Main and Advanced strategies for comprehensive preparation.</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={18} color="#ef4444" /> Toppers' Tricks
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {data.tricks.map((trick, idx) => (
                                    <div key={idx} style={{ background: '#f0f9ff', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e0f2fe', color: '#0c4a6e', fontSize: '14px', fontWeight: 700 }}>
                                        <strong>{trick.title}: </strong>
                                        <MathRenderer text={trick.content} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Question Desk */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '24px', textAlign: 'center', color: '#1e1b4b' }}>
                    Question Desk
                </h2>

                {activeTab === "jeeAdvanced" ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '40px' }}>
                        {questionSet.map((item, idx) => (
                            <div key={idx} style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '24px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            }}>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: currentTab.color, textTransform: 'uppercase', marginBottom: '12px' }}>
                                    Problem {idx + 1}
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e1b4b', lineHeight: 1.6, marginBottom: '16px' }}>
                                    <MathRenderer text={item.q} />
                                </div>
                                <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #dcfce7', fontSize: '14px', color: '#166534' }}>
                                    <strong>Insight: </strong><MathRenderer text={item.ans} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        {questionSet.map((item, idx) => (
                            <div key={idx} style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '24px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px',
                                        padding: '4px 10px', borderRadius: '100px',
                                        background: item.level === 'Easy' ? '#dcfce7' : item.level === 'Medium' ? '#fef9c3' : '#fee2e2',
                                        color: item.level === 'Easy' ? '#166534' : item.level === 'Medium' ? '#854d0e' : '#991b1b',
                                    }}>{item.level}</span>
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8' }}>Q{idx + 1}</span>
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e1b4b', lineHeight: 1.6, marginBottom: '16px' }}>
                                    <MathRenderer text={item.q} />
                                </div>
                                {item.options && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                        {item.options.map((opt, oi) => (
                                            <div key={oi} style={{
                                                padding: '10px 14px', borderRadius: '12px',
                                                background: '#f8fafc', border: '1px solid #e2e8f0',
                                                fontSize: '14px', color: '#475569',
                                                display: 'flex', alignItems: 'flex-start', gap: '8px'
                                            }}>
                                                <span style={{ fontWeight: 800, color: currentTab.color, flexShrink: 0 }}>
                                                    {String.fromCharCode(65 + oi)}
                                                </span>
                                                <MathRenderer text={opt} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Pro Tips */}
                <div style={{ marginTop: '40px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '40px', borderRadius: '32px', color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Lightbulb size={32} color="#f59e0b" />
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Revision Timeline</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {data.revisionPlan.map((step, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', lineHeight: 1.6 }}>
                                <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{step.phase}</div>
                                {step.focus}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
