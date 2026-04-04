import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../class-12/Matrices/Matrices.css';
import '../../../../../class-12/Matrices/MatricesPages.css';
import MathRenderer from '../../../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';

const BASE = '/senior/grade/11/maths/relations-and-functions';

const examData = {
    exams: [
        {
            name: 'CBSE Board',
            emoji: '📋',
            color: '#6366f1',
            weightage: '6–8 Marks',
            freq: 'Every Year',
            topics: ['Cartesian Product', 'Domain & Range', 'Types of Functions', 'Algebra of Functions', 'Greatest Integer Function'],
            strategy: 'Focus on **finding domain and range** — this appears every year as a 2-marker. Practice identifying whether a given relation is a function. Know special functions ($|x|$, $[x]$, $\\text{sgn}(x)$) thoroughly — graph-based questions are common. The algebra of functions section usually has a 4-mark problem.',
            pitfalls: [
                'Confusing **Range** with **Codomain** — range is what is actually mapped to, codomain is the entire target set.',
                'Forgetting that $[-1.5] = -2$, not $-1$ — the floor function rounds DOWN, even for negatives.',
                'Writing $A \\times B = B \\times A$ — this is FALSE unless $A = B$ or one is empty.',
                'Missing domain restrictions for $f/g$ — you must exclude $x$ where $g(x) = 0$.'
            ]
        },
        {
            name: 'JEE Mains',
            emoji: '🎯',
            color: '#ef4444',
            weightage: '4–8 Marks (1–2 Questions)',
            freq: 'High Frequency',
            topics: ['Number of Relations', 'Domain of Composite Functions', 'Special Functions Graphs', 'Functional Equations'],
            strategy: 'JEE loves **counting relations** and **domain of rational/radical functions**. Master: $2^{mn}$ formula for total relations. Practice domain problems with $\\sqrt{f(x)}$ and $1/f(x)$ — they test edge cases. Know graphs of $|x|$, $[x]$, and $\\{x\\}$ (fractional part) cold.',
            pitfalls: [
                'Not handling **negative inputs** for $[x]$ correctly — e.g., $[-0.1] = -1$.',
                'Forgetting that $|x|^2 = x^2$ but $|x| \\neq x$ for negative values.',
                'Assuming every polynomial has domain $\\mathbb{R}$ — rational functions have restrictions!'
            ]
        },
        {
            name: 'Olympiad',
            emoji: '🏅',
            color: '#f59e0b',
            weightage: 'Conceptual Foundation',
            freq: 'Always Relevant',
            topics: ['Functional Equations', 'Bijections & Counting', 'Relations on Sets', 'Composition of Functions'],
            strategy: 'Olympiad problems test **deep understanding**, not computation. Focus on: proving a mapping is/isn\'t a function, counting functions between finite sets ($n(B)^{n(A)}$ total functions), and functional equations like $f(x + y) = f(x) + f(y)$. Build intuition through examples before attempting proofs.',
            pitfalls: [
                'Assuming **surjectivity** without proof — always verify that every element of the codomain has a preimage.',
                'Confusing number of **relations** ($2^{mn}$) with number of **functions** ($n^m$).',
                'Not considering **edge cases** like empty sets and singleton sets.'
            ]
        }
    ],
    proTips: [
        '💡 **Quick Domain Check**: For $\\sqrt{f(x)}$, set $f(x) \\geq 0$. For $1/f(x)$, set $f(x) \\neq 0$. For $\\log f(x)$, set $f(x) > 0$.',
        '📊 **Graph Shortcut**: Modulus = V-shape at origin. Floor = staircase. Signum = three dots at $y = -1, 0, 1$. Constant = horizontal line.',
        '🧮 **Counting Formula**: Total functions from $A$ to $B = n(B)^{n(A)}$. Total relations = $2^{n(A) \\cdot n(B)}$. One-one functions exist only if $n(A) \\leq n(B)$.',
        '⚡ **Vertical Line Test**: If you can draw ANY vertical line that hits the graph twice, it\'s NOT a function. Works for every graph problem.',
        '🎯 **Range vs Codomain**: Range = what is ACTUALLY hit. Codomain = what CAN be hit. If Range = Codomain, the function is **surjective (onto)**.'
    ]
};

export default function RelFuncExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState(examData.exams[0].name);
    const exam = examData.exams.find(e => e.name === activeExam);

    return (
        <div className="mat-page">
            <nav className="mat-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <button onClick={() => navigate(BASE)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', color: '#64748b' }}>← Back to Relations & Functions</button>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/skills`)}>🎯 Skills</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(30,27,75,0.3)' }} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
                </div>
            </nav>

            <div className="det-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="det-intro-hero-deco det-intro-hero-deco-a" />
                <div className="det-intro-hero-deco det-intro-hero-deco-b" />
                <div className="det-intro-hero-inner">
                    <h1 className="det-intro-hero-title">Relations & Functions <span className="det-intro-hero-highlight" style={{ color: '#ef4444' }}>Exam Edge</span></h1>
                    <p className="det-intro-hero-sub">Strategic insights and high-weightage topics for competitive exams.</p>
                </div>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                {/* Exam Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {examData.exams.map(e => (
                        <button key={e.name} onClick={() => setActiveExam(e.name)} style={{
                            padding: '12px 24px', borderRadius: '100px', border: '2px solid',
                            borderColor: activeExam === e.name ? e.color : '#e2e8f0',
                            background: activeExam === e.name ? `${e.color}10` : '#fff',
                            color: activeExam === e.name ? e.color : '#64748b',
                            fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <span>{e.emoji}</span> {e.name}
                        </button>
                    ))}
                </div>

                <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0' }}>
                    {/* Weightage & Frequency */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '20px', marginBottom: '32px' }}>
                        <div style={{ background: `${exam.color}08`, padding: '20px', borderRadius: '16px', border: `1px solid ${exam.color}20` }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: exam.color, textTransform: 'uppercase', marginBottom: '4px' }}>Weightage</div>
                            <div style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b' }}>{exam.weightage}</div>
                        </div>
                        <div style={{ background: `${exam.color}08`, padding: '20px', borderRadius: '16px', border: `1px solid ${exam.color}20` }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: exam.color, textTransform: 'uppercase', marginBottom: '4px' }}>Frequency</div>
                            <div style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b' }}>{exam.freq}</div>
                        </div>
                    </div>

                    {/* High Yield Topics */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Target size={18} color={exam.color} /> High-Yield Topics
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {exam.topics.map((t, idx) => (
                                <div key={idx} style={{ background: '#f8fafc', padding: '10px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: 700, color: '#1e1b4b' }}>{t}</div>
                            ))}
                        </div>
                    </div>

                    {/* Strategy & Pitfalls */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Trophy size={18} color="#f59e0b" /> Winning Strategy
                            </h3>
                            <div style={{ background: '#fffbeb', padding: '24px', borderRadius: '20px', border: '1px solid #fef3c7', color: '#92400e', fontSize: '16px', lineHeight: 1.6 }}>
                                <MathRenderer text={exam.strategy} />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={18} color="#ef4444" /> Common Pitfalls
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {exam.pitfalls.map((p, idx) => (
                                    <div key={idx} style={{ background: '#fef2f2', padding: '16px 20px', borderRadius: '16px', border: '1px solid #fee2e2', color: '#991b1b', fontSize: '14px', fontWeight: 700 }}>
                                        ⚠️ <MathRenderer text={p} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pro Tips */}
                <div style={{ marginTop: '40px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '40px', borderRadius: '32px', color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Lightbulb size={32} color="#f59e0b" />
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Bonus Exam Tips</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '20px' }}>
                        {examData.proTips.map((tip, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', lineHeight: 1.6 }}>
                                <MathRenderer text={tip} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
