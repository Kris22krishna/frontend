import React from "react";
import { useNavigate } from "react-router-dom";
import { matricesConnectomicsData as data } from "./MatricesConnectomicsData";
import "../../MatricesPages.css";
import MathRenderer from "../../../../../MathRenderer";
import { Share2 } from "lucide-react";

export default function MatricesConnectomics() {
    const navigate = useNavigate();

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
                    <h1 className="mat-intro-hero-title">Matrices <span className="mat-intro-hero-highlight">Connectomics</span></h1>
                    <p className="mat-intro-hero-sub">Discover the hidden threads linking Matrices to the entire world of science.</p>
                </div>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

                {/* Connections Map */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    The Web of Mathematics
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {data.conceptMap.links.map((link, idx) => {
                        const fromNode = data.conceptMap.nodes.find(n => n.id === link.from);
                        const toNode = data.conceptMap.nodes.find(n => n.id === link.to);
                        if (!fromNode || !toNode) return null;

                        return (
                            <div key={idx} style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '24px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: fromNode.color }} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ fontSize: '24px' }}>{fromNode.icon}</div>
                                    <div style={{ fontSize: '12px', fontWeight: 800, background: `${fromNode.color}15`, color: fromNode.color, padding: '4px 10px', borderRadius: '100px' }}>
                                        Connection {idx + 1}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 800, color: '#1e1b4b' }}>{fromNode.label}</span>
                                    <span style={{ color: '#94a3b8' }}>→</span>
                                    <span style={{ fontWeight: 800, color: fromNode.color }}>{toNode.label}</span>
                                </div>

                                <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                                    <MathRenderer text={link.tooltip} />
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Real World Applications */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    Real World Systems
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {data.topicBreakdown.map((topic, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '32px', borderRadius: '24px', color: '#fff' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                                Zone {topic.id}
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{topic.title}</h3>
                            <p style={{ margin: 0, opacity: 0.8, fontSize: '15px', lineHeight: 1.6 }}>
                                <MathRenderer text={topic.concepts} />
                            </p>
                        </div>
                    ))}
                </div>

                {/* Misconceptions */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>
                    Common Misconceptions
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {data.misconceptions.map((item, idx) => (
                        <div key={idx} style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '24px',
                            border: '1px solid #fee2e2',
                            boxShadow: '0 4px 12px rgba(239,68,68,0.04)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#ef4444' }} />
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#ef4444', marginBottom: '8px' }}>
                                ⚠️ <MathRenderer text={item.statement} />
                            </div>
                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                                <MathRenderer text={item.truth} />
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#6366f1" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b' }}>Infinite Connections</h3>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
                        Matrices aren't just a chapter; they're the computational backbone of computer graphics, machine learning, and quantum mechanics.
                    </p>
                </div>
            </main>
        </div>
    );
}
