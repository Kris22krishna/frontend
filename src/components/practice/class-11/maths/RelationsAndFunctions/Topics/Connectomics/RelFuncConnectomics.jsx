import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../class-12/Matrices/Matrices.css';
import '../../../../../class-12/Matrices/MatricesPages.css';
import MathRenderer from '../../../../../../MathRenderer';
import { Share2 } from 'lucide-react';

const BASE = '/senior/grade/11/maths/relations-and-functions';

const connections = [
    { from: 'Cartesian Product', to: 'Coordinate Geometry', icon: '📐', type: 'Foundation', color: '#6366f1', note: 'Every point on a graph is an ordered pair $(x,y) \\in \\mathbb{R} \\times \\mathbb{R}$. Coordinate geometry is literally Cartesian products in action!' },
    { from: 'Relations', to: 'Graph Theory', icon: '🕸️', type: 'Extension', color: '#0891b2', note: 'Relations between elements become edges in graphs. Social networks, road maps, and the internet are all modeled using relation-based graph theory.' },
    { from: 'Functions', to: 'Calculus', icon: '📈', type: 'Core Dependency', color: '#f59e0b', note: 'Derivatives and integrals are operations ON functions. Without understanding $f(x)$, calculus is meaningless. Functions are the language of calculus.' },
    { from: 'Domain & Range', to: 'Real Analysis', icon: '🔬', type: 'Foundation', color: '#ec4899', note: 'Understanding domains and ranges leads to continuity, limits, and topology. Every theorem in analysis starts with "Let $f: D \\to \\mathbb{R}$..."' },
    { from: 'Special Functions', to: 'Signal Processing', icon: '📡', type: 'Application', color: '#7c3aed', note: 'The signum function is used in digital signal processing. The floor function powers computer algorithms. Modulus measures distances in physics.' },
    { from: 'Algebra of Functions', to: 'Linear Algebra', icon: '🧮', type: 'Extension', color: '#10b981', note: 'Adding and scaling functions leads to vector spaces of functions. This is the bridge from algebra to functional analysis and quantum mechanics.' },
    { from: 'Functions', to: 'Programming', icon: '💻', type: 'Application', color: '#0369a1', note: 'Every function in Python, Java, or C++ is a mathematical function: it takes inputs (arguments) and returns outputs (return values).' },
    { from: 'Ordered Pairs', to: 'Database Systems', icon: '🗄️', type: 'Application', color: '#d97706', note: 'Database tables are sets of tuples (ordered pairs/triples). SQL queries are operations on relations. Relational databases literally use mathematical relations!' }
];

const realWorld = [
    { title: 'Machine Learning', impact: 'Revolutionary', desc: 'Neural networks are compositions of functions: $f_n \\circ f_{n-1} \\circ \\ldots \\circ f_1(x)$. Training is finding the right function to map inputs to outputs.' },
    { title: 'Cryptography', impact: 'Critical', desc: 'Encryption functions map plaintext to ciphertext. One-to-one functions ensure unique decryption. The RSA algorithm is built on modular arithmetic functions.' },
    { title: 'Economics', impact: 'Fundamental', desc: 'Supply and demand are functions of price. Utility functions model consumer preferences. Economic equilibrium is where two functions intersect.' },
    { title: 'GPS Navigation', impact: 'Daily Life', desc: 'Your location is an ordered pair (latitude, longitude). Distance is a function of coordinates. Route optimization uses function composition.' }
];

export default function RelFuncConnectomics() {
    const navigate = useNavigate();

    return (
        <div className="mat-page">
            <nav className="mat-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <button onClick={() => navigate(BASE)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', color: '#64748b' }}>← Back to Relations & Functions</button>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/skills`)}>🎯 Skills</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(30,27,75,0.3)' }} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
                </div>
            </nav>

            <div className="det-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="det-intro-hero-deco det-intro-hero-deco-a" />
                <div className="det-intro-hero-deco det-intro-hero-deco-b" />
                <div className="det-intro-hero-inner">
                    <h1 className="det-intro-hero-title">Relations & Functions <span className="det-intro-hero-highlight" style={{ color: '#f59e0b' }}>Connectomics</span></h1>
                    <p className="det-intro-hero-sub">Discover the hidden threads linking Relations & Functions to the entire world of science.</p>
                </div>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>The Web of Mathematics</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {connections.map((conn, idx) => (
                        <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: conn.color }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: 800, background: `${conn.color}15`, color: conn.color, padding: '4px 10px', borderRadius: '100px' }}>{conn.type}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 800, color: '#1e1b4b' }}>{conn.from}</span>
                                <span style={{ color: '#94a3b8' }}>→</span>
                                <span style={{ fontWeight: 800, color: conn.color }}>{conn.to}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}><MathRenderer text={conn.note} /></p>
                        </div>
                    ))}
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>Real World Systems</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px' }}>
                    {realWorld.map((app, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '32px', borderRadius: '24px', color: '#fff' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Impact: {app.impact}</div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{app.title}</h3>
                            <p style={{ margin: 0, opacity: 0.8, fontSize: '15px', lineHeight: 1.6 }}><MathRenderer text={app.desc} /></p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#6366f1" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b' }}>Infinite Connections</h3>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
                        Relations & Functions aren't just a chapter; they're the operating system of mathematics. Every formula, algorithm, and model is built on the idea of mapping inputs to outputs.
                    </p>
                </div>
            </main>
        </div>
    );
}
