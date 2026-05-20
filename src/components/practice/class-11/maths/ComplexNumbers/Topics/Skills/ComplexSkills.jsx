import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKILLS } from './ComplexSkillsData';
import '../../../Sets/SetsBranch.css';
import MathRenderer from '../../../../../../MathRenderer';
import { LatexText } from '../../../../../../LatexText';
import { NODE_IDS } from '@/lib/curriculumIds';

import QuizEngine from '../../../Sets/Topics/Skills/Engines/QuizEngine';
import AssessmentEngine from '../../../Sets/Topics/Skills/Engines/AssessmentEngine';

const BASE = '/senior/grade/11/maths/complex-numbers';

// ─── Skill-ID → canonical node-ID map ──────────────────────────────────────
const SKILL_NODE_ID_MAP = {
    'complex-basics':        NODE_IDS.g11MathCNComplexBasics,
    'addition-subtraction':  NODE_IDS.g11MathCNAdditionSubtraction,
    'multiplication':        NODE_IDS.g11MathCNMultiplication,
    'division-inverse':      NODE_IDS.g11MathCNDivisionInverse,
    'powers-of-i':           NODE_IDS.g11MathCNPowersOfI,
    'modulus-conjugate':     NODE_IDS.g11MathCNModulusConjugate,
    'argand-plane':          NODE_IDS.g11MathCNArgandPlane,
};

export default function ComplexSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div
                className={`sets-page sets-skill-runtime ${view === 'practice' ? 'sets-skill-runtime--practice' : ''} ${view === 'assessment' ? 'sets-skill-runtime--assessment' : ''}`}
                style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 0 60px' }}
            >
                <nav className="sets-nav">
                    <button className="sets-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>
                        ← Back to Skills
                    </button>
                    <div className="sets-nav-links">
                        <button className="sets-nav-link" onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                        <button className="sets-nav-link" onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                        <button className="sets-nav-link active">🎯 Skills</button>
                        <button className="sets-nav-link" onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
                        <button className="sets-nav-link" onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
                    </div>
                </nav>

                <div className="sets-skill-runtime-body" style={{ padding: '0 24px' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                                    {skill.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 900, color: 'var(--sets-text)', margin: 0 }}>
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
                                {/* Sidebar */}
                                <aside style={{ background: 'rgba(255,255,255,0.7)', padding: 12, borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '65vh', overflowY: 'auto' }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12,
                                                border: '1px solid', borderColor: selectedLearnIdx === ri ? skill.color : 'rgba(0,0,0,0.05)',
                                                background: selectedLearnIdx === ri ? skill.color : '#fff',
                                                color: selectedLearnIdx === ri ? '#fff' : 'var(--sets-text)',
                                                transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left',
                                            }}
                                        >
                                            <div style={{ width: 24, height: 24, borderRadius: 6, background: selectedLearnIdx === ri ? 'rgba(255,255,255,0.2)' : `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, flexShrink: 0 }}>
                                                {ri + 1}
                                            </div>
                                            <span style={{ fontWeight: 700, fontSize: 14 }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detail Panel */}
                                <main key={selectedLearnIdx} style={{ background: '#fff', borderRadius: 20, padding: '24px 32px', border: `2px solid ${skill.color}15`, boxShadow: '0 8px 30px rgba(0,0,0,0.03)', minHeight: 400, animation: 'setsSlideInRight 0.4s ease' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 900, color: skill.color }}>
                                                {skill.learn.rules[selectedLearnIdx].title}
                                            </h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sets-muted)' }}>
                                                RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Formula Box */}
                                    <div style={{ background: `${skill.color}05`, padding: 24, borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                                        <div style={{ fontSize: 36, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--sets-muted)', marginBottom: 10 }}>Explanation</h4>
                                            <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--sets-text)', whiteSpace: 'pre-line' }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].d} />
                                            </div>
                                            <div style={{ marginTop: 20, background: 'rgba(13,148,136,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(13,148,136,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--sets-muted)' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Survival Tip: </span>
                                                    {skill.learn.rules[selectedLearnIdx].tip}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <span style={{ fontSize: 15, color: 'var(--sets-text)', whiteSpace: 'pre-line', display: 'block' }}>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ marginTop: 36, display: 'flex', gap: 16 }}>
                                        <button className="sets-btn sets-btn-filled" style={{ '--skill-color': skill.color, padding: '12px 28px', fontSize: 14 }}
                                            onClick={() => setView('practice')}>
                                            Mastered this? Try Practice →
                                        </button>
                                        <button className="sets-btn sets-btn-outline" style={{ padding: '12px 28px', fontSize: 14 }}
                                            onClick={() => setSelectedLearnIdx((selectedLearnIdx + 1) % skill.learn.rules.length)}>
                                            Next: {skill.learn.rules[(selectedLearnIdx + 1) % skill.learn.rules.length].title}
                                        </button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <QuizEngine
                            questions={skill.practice}
                            title={`Practice: ${skill.title}`}
                            onBack={() => setView('list')}
                            color={skill.color}
                            prefix="sets"
                            nodeId={SKILL_NODE_ID_MAP[skill.id]}
                            sessionType="practice"
                        />
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={`Assessment: ${skill.title}`}
                            onBack={() => setView('list')}
                            color={skill.color}
                            prefix="sets"
                            nodeId={SKILL_NODE_ID_MAP[skill.id]}
                            sessionType="assessment"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="sets-page" style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <nav className="sets-nav">
                <button className="sets-nav-back" onClick={() => navigate(BASE)}>← Back to Complex Numbers</button>
                <div className="sets-nav-links">
                    <button className="sets-nav-link" onClick={() => navigate(`${BASE}/introduction`)}>🌟 Introduction</button>
                    <button className="sets-nav-link" onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button className="sets-nav-link active">🎯 Skills</button>
                    <button className="sets-nav-link" onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
                    <button className="sets-nav-link" onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto 40px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 32 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.1rem', fontWeight: 900, color: 'var(--sets-text)', margin: '0 0 6px' }}>
                        Complex Numbers{' '}
                        <span style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Skills
                        </span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sets-muted)', letterSpacing: 0.5 }}>
                        7 skills — each with Learn, Practice, and Assess modes.
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {SKILLS.map((sk, idx) => (
                        <div key={sk.id} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: '#fff', borderRadius: 16, padding: '16px 20px', gap: 16,
                            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s', flexWrap: 'wrap',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 200 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${sk.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                                    {sk.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
                                        {sk.subtitle}
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--sets-text)' }}>{sk.title}</h3>
                                    <p style={{ margin: 0, fontSize: 12, color: 'var(--sets-muted)' }}>{sk.desc}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                <button
                                    onClick={() => { setActiveSkill(idx); setView('learn'); }}
                                    className="sets-btn sets-btn-outline"
                                    style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', border: '1.5px solid rgba(0,0,0,0.1)' }}
                                >
                                    Learn
                                </button>
                                <button
                                    onClick={() => { setActiveSkill(idx); setView('practice'); }}
                                    className="sets-btn sets-btn-outline"
                                    style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}
                                >
                                    Practice
                                </button>
                                <button
                                    onClick={() => { setActiveSkill(idx); setView('assessment'); }}
                                    className="sets-btn sets-btn-filled"
                                    style={{ '--skill-color': sk.color, padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}
                                >
                                    Assess
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: 'var(--sets-muted)', fontWeight: 600 }}>
                        Completed all 7?{' '}
                        <span style={{ color: '#6366f1' }}>You're a Complex Numbers Pro! 🏅</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
