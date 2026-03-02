import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import LatexContent from '../../../../LatexContent';

const EXAMPLES = [
    { id: 1, title: 'Example 1', question: <><p>Placeholder Question 1 for Cofactors</p></>, steps: [<><InlineMath math="1 + 1 = 2" /></>], answer: <>Answer 1</> },
    { id: 2, title: 'Example 2', question: <><p>Placeholder Question 2 for Cofactors</p></>, steps: [<><InlineMath math="1 + 2 = 3" /></>], answer: <>Answer 2</> },
    { id: 3, title: 'Example 3', question: <><p>Placeholder Question 3 for Cofactors</p></>, steps: [<><InlineMath math="1 + 3 = 4" /></>], answer: <>Answer 3</> },
    { id: 4, title: 'Example 4', question: <><p>Placeholder Question 4 for Cofactors</p></>, steps: [<><InlineMath math="1 + 4 = 5" /></>], answer: <>Answer 4</> },
    { id: 5, title: 'Example 5', question: <><p>Placeholder Question 5 for Cofactors</p></>, steps: [<><InlineMath math="1 + 5 = 6" /></>], answer: <>Answer 5</> },
];

const CofactorsExamples = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState({});

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFF, #EEF2FF, #F5F3FF)', fontFamily: "'Inter', sans-serif", paddingBottom: 60 }}>
            <header style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '32px 24px 40px', color: '#fff', textAlign: 'center', position: 'relative' }}>
                <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 16px', borderRadius: 10, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 12, border: '1px solid rgba(255,255,255,0.15)' }}>LEARN BY EXAMPLE</div>
                <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800 }}>Cofactors</h1>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, maxWidth: 450, margin: '8px auto 0' }}>5 worked examples with step-by-step solutions.</p>
            </header>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {EXAMPLES.map((ex, idx) => (
                    <div key={ex.id} style={{ background: '#fff', border: '2px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', transition: 'all 0.25s' }}>
                        <div onClick={() => toggle(ex.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 22px', cursor: 'pointer' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#4F46E5', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</div>
                            <h3 style={{ flex: 1, fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>{ex.title}</h3>
                            {expanded[ex.id] ? <ChevronUp size={18} color="#94A3B8" /> : <ChevronDown size={18} color="#94A3B8" />}
                        </div>
                        {expanded[ex.id] && (
                            <div style={{ padding: '0 22px 22px', borderTop: '1px solid #F1F5F9', lineHeight: 1.9, fontSize: '0.9rem', color: '#1E293B' }}>
                                <div style={{ margin: '14px 0', fontWeight: 600 }}>{ex.question}</div>
                                <div style={{ background: '#F8FAFF', border: '1px solid #E0E7FF', borderRadius: 12, padding: '16px 18px', marginBottom: 12 }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Solution</div>
                                    {ex.steps.map((step, i) => <div key={i} style={{ marginBottom: 6 }}>• {step}</div>)}
                                </div>
                                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, padding: '10px 16px', fontWeight: 700, color: '#065F46' }}>
                                    ✅ Answer: {ex.answer}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CofactorsExamples;