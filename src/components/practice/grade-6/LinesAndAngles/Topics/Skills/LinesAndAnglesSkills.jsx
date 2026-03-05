import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LinesAndAngles.css';
import mascot from '../../../../../assets/mascot.png';
import MathRenderer from '../../../../../components/MathRenderer';
import { SKILL_LEARN_DATA } from './linesAndAnglesQuestions';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const SKILLS = [
    { id: 'introduction', title: 'Introduction', subtitle: 'Skill 1 · Fundamental', desc: 'Basic building blocks of geometry.', icon: '📌', color: '#0891b2', path: '/middle/grade/6/lines-and-angles/introduction' },
    { id: 'line-segment-ray', title: 'Line, Segment & Ray', subtitle: 'Skill 2 · Drawing', desc: 'Points, paths, and directions.', icon: '↔️', color: '#10b981', path: '/middle/grade/6/lines-and-angles/line-segment-ray' },
    { id: 'line-types', title: 'Types of Lines', subtitle: 'Skill 3 · Configuration', desc: 'Parallel and intersecting paths.', icon: '🛤️', color: '#f59e0b', path: '/middle/grade/6/lines-and-angles/line-types' },
    { id: 'angle-types', title: 'Types of Angles', subtitle: 'Skill 4 · Measurement', desc: 'Acute, Obtuse, and more.', icon: '📐', color: '#ef4444', path: '/middle/grade/6/lines-and-angles/angle-types' },
    { id: 'adjacent-angles', title: 'Adjacent Angles', subtitle: 'Skill 5 · Relationships', desc: 'Understanding neighbors.', icon: '🤝', color: '#6366f1', path: '/middle/grade/6/lines-and-angles/adjacent-angles' },
    { id: 'linear-pair', title: 'Linear Pair of Angles', subtitle: 'Skill 6 · Common Line', desc: 'Angles on a straight path.', icon: '➖', color: '#7c3aed', path: '/middle/grade/6/lines-and-angles/linear-pair' },
    { id: 'vertically-opposite', title: 'Vertically Opposite Angles', subtitle: 'Skill 7 · X-Cross', desc: 'Intersection properties.', icon: '❌', color: '#ec4899', path: '/middle/grade/6/lines-and-angles/vertically-opposite' },
    { id: 'transversal-angles', title: 'Angles formed by a Transversal', subtitle: 'Skill 8 · Parallel Cross', desc: 'Z and F shape angles.', icon: '⚡', color: '#3b82f6', path: '/middle/grade/6/lines-and-angles/transversal-angles' },
    { id: 'angles-at-point', title: 'Angles at a Point', subtitle: 'Skill 9 · Full Turn', desc: 'The 360-degree rotation.', icon: '🔘', color: '#0d9488', path: '/middle/grade/6/lines-and-angles/angles-at-point' },
    { id: 'real-life-examples', title: 'Real Life Examples', subtitle: 'Skill 10 · Application', desc: 'Math in the real world.', icon: '🌍', color: '#4f46e5', path: '/middle/grade/6/lines-and-angles/real-life-examples' }
];

const SkillCard = ({ skill, onLearn, onPractice, onAssess }) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: '#fff', borderRadius: 18, padding: '24px 32px',
                border: `1.5px solid ${hover ? skill.color : '#E2E8F0'}`,
                boxShadow: hover ? `0 12px 28px ${skill.color}20` : '0 4px 12px rgba(0,0,0,0.02)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hover ? 'translateY(-2px)' : 'none',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: hover ? `${skill.color}15` : '#F8FAFC',
                    color: skill.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0
                }}>
                    {skill.icon}
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                        {skill.subtitle}
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 800, color: '#0F172A' }}>{skill.title}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#64748B', fontWeight: 500 }}>{skill.desc}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
                <button
                    onClick={() => onLearn(skill)}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: '1.5px solid #E2E8F0', background: '#fff', color: '#334155',
                        transition: '0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.color = skill.color; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#334155'; }}
                >
                    Learn
                </button>
                <button
                    onClick={() => onPractice(skill.path)}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: '1.5px solid #E2E8F0', background: '#fff', color: '#334155',
                        transition: '0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.color = skill.color; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#334155'; }}
                >
                    Practice
                </button>
                <button
                    onClick={() => onAssess(skill.path)}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: 'none', background: skill.color, color: '#fff',
                        transition: '0.2s', boxShadow: `0 4px 12px ${skill.color}30`
                    }}
                >
                    Assess
                </button>
            </div>
        </div>
    );
};

export default function LinesAndAnglesSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const handleLearn = (skill) => {
        setActiveSkill(skill);
        setView('learn');
        setSelectedLearnIdx(0);
    };

    if (view === 'learn' && activeSkill) {
        const learnData = SKILL_LEARN_DATA[activeSkill.id];
        return (
            <div className="matrices-chapter-page" style={{ minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className="matrices-chapter-header" style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
                    <button className="matrices-back-btn" onClick={() => setView('list')}>
                        <ArrowLeft size={18} /> Back to Skills
                    </button>
                    <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Learn: {activeSkill.title}</h1>
                </nav>

                <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, justifyContent: 'center' }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeSkill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{activeSkill.icon}</div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', margin: 0 }}>{activeSkill.title}</h1>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32 }}>
                        {/* Side Selector */}
                        <aside style={{
                            background: '#F8FAFC', padding: '20px', borderRadius: 24, border: '1px solid #E2E8F0',
                            display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '65vh', overflowY: 'auto'
                        }}>
                            {learnData && learnData.rules.map((rule, ri) => (
                                <button
                                    key={ri}
                                    onClick={() => setSelectedLearnIdx(ri)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderRadius: 16,
                                        border: '1px solid', borderColor: selectedLearnIdx === ri ? activeSkill.color : 'transparent',
                                        background: selectedLearnIdx === ri ? activeSkill.color : '#fff',
                                        color: selectedLearnIdx === ri ? '#fff' : '#334155',
                                        transition: '0.2s', cursor: 'pointer', textAlign: 'left',
                                        boxShadow: selectedLearnIdx === ri ? `0 8px 24px ${activeSkill.color}40` : '0 2px 8px rgba(0,0,0,0.02)'
                                    }}
                                >
                                    <div style={{
                                        width: 28, height: 28, borderRadius: 8,
                                        background: selectedLearnIdx === ri ? 'rgba(255,255,255,0.2)' : `${activeSkill.color}15`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 14, fontWeight: 900, flexShrink: 0
                                    }}>{ri + 1}</div>
                                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>{rule.title}</span>
                                </button>
                            ))}
                        </aside>

                        {/* Detailed Window */}
                        <main style={{
                            background: '#fff', borderRadius: 24, padding: '40px', border: `2px solid ${activeSkill.color}20`,
                            boxShadow: '0 12px 40px rgba(0,0,0,0.06)', minHeight: 500
                        }}>
                            {learnData && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 8px', fontSize: '2.2rem', fontWeight: 900, color: activeSkill.color }}>{learnData.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: '#64748B', letterSpacing: 1 }}>CONCEPT {selectedLearnIdx + 1} OF {learnData.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: '3rem' }}>{activeSkill.icon}</div>
                                    </div>

                                    <div style={{ background: `${activeSkill.color}05`, padding: '32px', borderRadius: 24, border: `2px solid ${activeSkill.color}15`, marginBottom: 40, textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: activeSkill.color }}>
                                            <MathRenderer text={`$$${learnData.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748B', marginBottom: 12 }}>Explanation</h4>
                                            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, margin: 0, color: '#1E293B' }}>{learnData.rules[selectedLearnIdx].d}</p>

                                            <div style={{ marginTop: 24, background: '#F0FDFA', padding: '20px', borderRadius: 16, border: '1px solid #CCFBF1' }}>
                                                <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.6, color: '#0F766E' }}>
                                                    <span style={{ fontWeight: 800 }}>🛡️ Pro Tip: </span>
                                                    {learnData.rules[selectedLearnIdx].tip}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: activeSkill.color, marginBottom: 12 }}>Example</h4>
                                            <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 20, border: '1px solid #E2E8F0', height: '100%' }}>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#334155' }}>{learnData.rules[selectedLearnIdx].ex}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button
                                            onClick={() => navigate(activeSkill.path)}
                                            style={{ padding: '16px 32px', background: activeSkill.color, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: `0 8px 20px ${activeSkill.color}40`, transition: '0.2s' }}
                                        >
                                            Start Practice →
                                        </button>
                                        <button
                                            onClick={() => {
                                                const nextIdx = (selectedLearnIdx + 1) % learnData.rules.length;
                                                setSelectedLearnIdx(nextIdx);
                                            }}
                                            style={{ padding: '16px 32px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', transition: '0.2s' }}
                                        >
                                            Read Next Concept
                                        </button>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="matrices-chapter-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav className="matrices-chapter-header" style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #E2E8F0', flexShrink: 0 }}>
                <button className="matrices-back-btn" onClick={() => navigate('/middle/grade/6/lines-and-angles')}>
                    <ArrowLeft size={18} /> Back to Chapter
                </button>
                <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Applied Skills</h1>
            </nav>

            <div style={{ flex: 1, padding: '40px 24px', overflowY: 'auto', background: '#F8FAFC' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
                        <img src={mascot} alt="Mascot" style={{ width: 100, height: 'auto', marginBottom: 20 }} />
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#1E293B', margin: '0 0 8px' }}>
                            Lines and Angles <span style={{ color: '#0CA5E9' }}>Skills</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#64748B' }}>Master the geometric world with interactive practice modes.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {SKILLS.map((skill) => (
                            <SkillCard
                                key={skill.id}
                                skill={skill}
                                onLearn={() => handleLearn(skill)}
                                onPractice={(path) => navigate(path)}
                                onAssess={(path) => navigate(path + '?mode=assess')}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
