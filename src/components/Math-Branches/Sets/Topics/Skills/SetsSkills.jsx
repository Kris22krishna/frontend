import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKILLS } from './SetsSkillsData';
import '../../SetsBranch.css';
import MathRenderer from '../../../../MathRenderer';
import { LatexText } from '../../../../LatexText';
import { NODE_IDS } from '@/lib/curriculumIds';

import QuizEngine from './Engines/QuizEngine';
import AssessmentEngine from './Engines/AssessmentEngine';

// ─── Skill-ID → canonical node-ID map ────────────────────────────────────────
const SKILL_NODE_ID_MAP = {
  'what-is-set':          NODE_IDS.g11MathSetsWhatIsSet,
  'types-of-sets':        NODE_IDS.g11MathSetsTypes,
  'equal-equivalent':     NODE_IDS.g11MathSetsEqualEquivalent,
  'subsets-intervals':    NODE_IDS.g11MathSetsSubsetsIntervals,
  'universal-complement': NODE_IDS.g11MathSetsUniversalComplement,
  'set-operations':       NODE_IDS.g11MathSetsOperations,
  'venn-diagrams':        NODE_IDS.g11MathSetsVennDiagrams,
  'laws-properties':      NODE_IDS.g11MathSetsLawsProperties,
  'cardinality-problems': NODE_IDS.g11MathSetsCardinality,
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function SetsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className={`sets-page sets-skill-runtime ${view === 'practice' ? 'sets-skill-runtime--practice' : ''} ${view === 'assessment' ? 'sets-skill-runtime--assessment' : ''}`} style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 0 60px' }}>
                <nav className="sets-nav">
                    <button className="sets-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>
                        ← Back to Skills
                    </button>
                    <div className="sets-nav-links">
                        <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/introduction')}>🌟 Intro</button>
                        <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/terminology')}>📖 Terminology</button>
                        <button className="sets-nav-link active">🎯 Skills</button>
                        <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/connectomics')}>🌐 Connectomics</button>
                        <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/exam-edge')}>⚔️ Exam Edge</button>
                    </div>
                </nav>
                <div className="sets-skill-runtime-body" style={{ padding: '0 24px' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div className="sets-skill-title-row" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                                    {skill.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 7vw, 2.5rem)', fontWeight: 900, color: 'var(--sets-text)', margin: 0 }}>
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div className="sets-learn-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
                                {/* Side Selector */}
                                <aside className="sets-learn-sidebar" style={{ background: 'rgba(255,255,255,0.7)', padding: 12, borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '65vh', overflowY: 'auto' }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12,
                                                border: '1px solid', borderColor: selectedLearnIdx === ri ? skill.color : 'rgba(0,0,0,0.05)',
                                                background: selectedLearnIdx === ri ? skill.color : '#fff',
                                                color: selectedLearnIdx === ri ? '#fff' : 'var(--sets-text)',
                                                transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left'
                                            }}
                                        >
                                            <div style={{
                                                width: 24, height: 24, borderRadius: 6,
                                                background: selectedLearnIdx === ri ? 'rgba(255,255,255,0.2)' : `${skill.color}15`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, flexShrink: 0
                                            }}>
                                                {ri + 1}
                                            </div>
                                            <span style={{ fontWeight: 700, fontSize: 15 }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main className="sets-details-window" key={selectedLearnIdx} style={{
                                    background: '#fff', borderRadius: 20, padding: '24px 32px',
                                    border: `2px solid ${skill.color}15`, boxShadow: '0 8px 30px rgba(0,0,0,0.03)', minHeight: 400,
                                    animation: 'setsSlideInRight 0.4s ease'
                                }}>
                                    <div className="sets-learn-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>
                                                {skill.learn.rules[selectedLearnIdx].title}
                                            </h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--sets-muted)' }}>
                                                RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div style={{
                                        background: `${skill.color}05`, padding: 24, borderRadius: 20,
                                        border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: 42, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div className="sets-rule-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--sets-muted)', marginBottom: 10 }}>
                                                Explanation
                                            </h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--sets-text)' }}>
                                                {skill.learn.rules[selectedLearnIdx].d}
                                            </p>
                                            <div style={{ marginTop: 24, background: 'rgba(13,148,136,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(13,148,136,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--sets-muted)' }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--sets-teal)' }}>🛡️ Survival Tip: </span>
                                                    {skill.learn.rules[selectedLearnIdx].tip}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>
                                                Practical Example
                                            </h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <span style={{ fontSize: 17, color: 'var(--sets-text)', display: 'block' }}>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="sets-learn-footer" style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className="sets-btn sets-btn-filled" style={{ '--skill-color': skill.color, padding: '14px 32px', fontSize: 15 }}
                                            onClick={() => setView('practice')}>
                                            Mastered this? Try Practice →
                                        </button>
                                        <button className="sets-btn sets-btn-outline" style={{ padding: '14px 32px', fontSize: 15 }}
                                            onClick={() => { setSelectedLearnIdx((selectedLearnIdx + 1) % skill.learn.rules.length); }}>
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
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="sets-nav">
                <button className="sets-nav-back" onClick={() => navigate('/senior/grade/11/maths/sets')}>
                    ← Back to Sets
                </button>
                <div className="sets-nav-links">
                    <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/introduction')}>🌟 Introduction</button>
                    <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/terminology')}>📖 Terminology</button>
                    <button className="sets-nav-link active" onClick={() => navigate('/senior/grade/11/maths/sets/skills')}>🎯 Skills</button>
                    <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/connectomics')}>🌐 Connectomics</button>
                    <button className="sets-nav-link" onClick={() => navigate('/senior/grade/11/maths/sets/exam-edge')}>⚔️ Exam Edge</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div style={{ maxWidth: 1100, margin: '20px auto 40px', padding: '0 24px' }}>
                {/* Compact Heading */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 32 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.1rem', fontWeight: 900, color: 'var(--sets-text)', margin: '0 0 6px' }}>
                        Sets{' '}
                        <span style={{ background: 'linear-gradient(135deg, var(--sets-teal), var(--sets-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Skills
                        </span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sets-muted)', letterSpacing: 0.5 }}>
                        Step up from concepts to mastery with targeted practice.
                    </div>
                </div>

                {/* Vertical Skills List */}
                <div className="sets-skills-list" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {SKILLS.map((sk, idx) => (
                        <div key={sk.id} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: '#fff', borderRadius: 16, padding: '16px 20px', gap: 16,
                            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s', cursor: 'default',
                            flexWrap: 'wrap'
                        }}>
                            {/* Skill Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 200 }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10, background: `${sk.color}15`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0
                                }}>
                                    {sk.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
                                        {sk.subtitle}
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--sets-text)' }}>
                                        {sk.title}
                                    </h3>
                                    <p style={{ margin: 0, fontSize: 12, color: 'var(--sets-muted)' }}>
                                        {sk.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
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

                {/* Final Motivation */}
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: 'var(--sets-muted)', fontWeight: 600 }}>
                        Done with all? You're officially a{' '}
                        <span style={{ color: 'var(--sets-indigo)' }}>Sets Pro!</span> 🏅
                    </p>
                </div>
            </div>
        </div>
    );
}
