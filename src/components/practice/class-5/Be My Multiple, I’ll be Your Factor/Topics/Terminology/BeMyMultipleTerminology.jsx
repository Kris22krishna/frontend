import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../bemyfactor.css';
import { LatexText } from '@/components/LatexText';

const TERMS = [
    { id: 't1', term: 'Factor', def: 'A number that divides another number exactly without leaving a remainder.', ex: 'Factors of 6 are 1, 2, 3, and 6.', color: '#0284c7' },
    { id: 't2', term: 'Multiple', def: 'The product of a number and any whole number.', ex: 'Multiples of 5 are 5, 10, 15, 20...', color: '#0369a1' },
    { id: 't3', term: 'Common Factor', def: 'A factor that is shared by two or more numbers.', ex: 'Common factors of 12 and 18 are 1, 2, 3, 6.', color: '#075985' },
    { id: 't4', term: 'Common Multiple', def: 'A multiple that is shared by two or more numbers.', ex: 'Common multiples of 3 and 4 are 12, 24, 36...', color: '#0ea5e9' },
    { id: 't5', term: 'Prime Number', def: 'A number greater than 1 that has only two factors: 1 and itself.', ex: '2, 3, 5, 7, 11 are prime numbers.', color: '#0369a1' },
    { id: 't6', term: 'Composite Number', def: 'A number that has more than two factors.', ex: '4, 6, 8, 9, 10 are composite numbers.', color: '#075985' },
    { id: 't7', term: 'LCM', def: 'Least Common Multiple: The smallest multiple shared by numbers.', ex: 'LCM of 4 and 6 is 12.', color: '#0ea5e9' },
    { id: 't8', term: 'HCF/GCF', def: 'Highest Common Factor: The largest factor shared by numbers.', ex: 'HCF of 12 and 18 is 6.', color: '#0284c7' }
];

export default function BeMyMultipleTerminology() {
    const navigate = useNavigate();
    const [activeTerm, setActiveTerm] = useState(TERMS[0]);

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/middle/grade/5/be-my-multiple')}>← Back to Chapter</div>
                <div className="ft-nav-links">
                    <span className="ft-nav-link" onClick={() => navigate('/middle/grade/5/be-my-multiple/introduction')}>🌟 Intro</span>
                    <span className="ft-nav-link-active">📖 Terminology</span>
                    <span className="ft-nav-link" onClick={() => navigate('/middle/grade/5/be-my-multiple/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="ft-content" style={{ padding: '32px 24px' }}>
                <div className="ft-learn-view-grid">
                    <aside className="ft-learn-sidebar">
                        <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 16, paddingLeft: 12 }}>Key Concepts</p>
                        {TERMS.map((t) => (
                            <button
                                key={t.id}
                                className={`ft-rule-btn ${activeTerm.id === t.id ? 'ft-rule-btn-active' : ''}`}
                                onClick={() => setActiveTerm(t)}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: 12,
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    background: activeTerm.id === t.id ? `${t.color}15` : 'transparent',
                                    borderLeft: `4px solid ${activeTerm.id === t.id ? t.color : 'transparent'}`,
                                    transition: 'all 0.2s',
                                    display: 'block',
                                    width: '100%',
                                    marginBottom: 4
                                }}
                            >
                                <div style={{ fontSize: 10, fontWeight: 900, color: activeTerm.id === t.id ? t.color : '#94a3b8' }}>TERM</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: activeTerm.id === t.id ? '#0f172a' : '#64748b' }}>{t.term}</div>
                            </button>
                        ))}
                    </aside>

                    <main className="ft-quiz-card" style={{ padding: 40 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 24 }}>
                            <div style={{ width: 50, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${activeTerm.color}15`, fontSize: 24 }}>🧭</div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, color: '#0f172a' }}>{activeTerm.term}</h2>
                        </div>

                        <div className="ft-formula-box" style={{ background: `${activeTerm.color}08`, borderColor: `${activeTerm.color}30` }}>
                            <div className="ft-formula-text" style={{ color: activeTerm.color, fontSize: 26, lineHeight: 1.4 }}>
                                <LatexText text={activeTerm.def} />
                            </div>
                        </div>

                        <div className="ft-rule-split">
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>DETAILED DEFINITION</div>
                                <p style={{ fontSize: 15, color: '#0f172a', lineHeight: 1.6, margin: 0 }}>
                                    The concept of <strong>{activeTerm.term}</strong> is fundamental to arithmetic. In mathematics, it allows us to break down complex numbers into simpler prime parts.
                                </p>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>EXAMPLE</div>
                                <div className="ft-example-box" style={{ background: '#f8fafc', fontWeight: 600 }}>
                                    <LatexText text={activeTerm.ex} />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
