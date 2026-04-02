import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Patterns.css';
import MathRenderer from '../../../../../MathRenderer';

const TERMS = [
    { 
        name: 'Sequence', 
        def: 'An ordered set of numbers or objects that follow a logical rule.', 
        ex: '$2, 4, 6, 8, ...$' 
    },
    { 
        name: 'Pattern Rule', 
        def: 'The specific formula or instruction used to generate the next term in a sequence.', 
        ex: '"Add 5" or "Multiply by 2"' 
    },
    { 
        name: 'Term', 
        def: 'Each individual number or object in a pattern sequence.', 
        ex: 'In $5, 10, 15$, the number $10$ is the second term.' 
    },
    { 
        name: 'Growing Pattern', 
        def: 'A pattern where each following term is larger than the previous one.', 
        ex: '$1, 3, 6, 10, ...$ (adding $2, 3, 4, ...$)' 
    },
    { 
        name: 'Shrinking Pattern', 
        def: 'A pattern where each following term is smaller than the previous one.', 
        ex: '$100, 90, 80, 70, ...$' 
    },
    { 
        name: 'Rotation', 
        def: 'Turning a shape around a center point by a certain angle (like $90^\\circ$ or $180^\\circ$).', 
        ex: 'A square turning clockwise.' 
    }
];

export default function PatternsTerminology() {
    const navigate = useNavigate();

    return (
        <div className="pt-page">
            <div className="pt-deco pt-deco-1"></div>
            <div className="pt-deco pt-deco-2"></div>
            <div className="pt-deco pt-deco-3"></div>

            <nav className="pt-topic-nav">
                <div className="pt-back-link" onClick={() => navigate('/middle/grade/5/canyouseethepatterns')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/canyouseethepatterns/introduction')}>🌟 Intro</span>
                    <span style={{ fontWeight: 800, color: '#0369a1' }}>📖 Terminology</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/canyouseethepatterns/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="pt-content" style={{ padding: '32px 24px 80px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 16 }}>
                        <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: 4, color: '#0f172a' }}>Terminology: <span style={{ color: '#0ea5e9' }}>Pattern Power</span></h1>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>Key vocabulary for mastering pattern recognition.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                        {TERMS.map((term, i) => (
                            <div key={i} className="pt-card-hover" style={{ 
                                background: 'rgba(255, 255, 255, 0.9)', 
                                backdropFilter: 'blur(12px)',
                                border: '1px solid #e2e8f0', 
                                borderRadius: '28px', 
                                padding: '28px', 
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16,
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
                                boxShadow: '0 4px 25px rgba(0,0,0,0.06)' 
                            }}>
                                <div style={{ fontSize: 20, fontWeight: 900, color: '#0369a1', fontFamily: 'Outfit' }}>{term.name}</div>
                                <p style={{ color: '#475569', fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                                    <MathRenderer text={term.def} />
                                </p>
                                <div style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '16px 20px', borderRadius: '16px', border: '1px solid #bae6fd', marginTop: 'auto' }}>
                                    <div style={{ fontSize: 10, fontWeight: 900, color: '#0ea5e9', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>Example</div>
                                    <div style={{ fontWeight: 700, color: '#0369a1', fontSize: 14 }}>
                                        <MathRenderer text={term.ex} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
