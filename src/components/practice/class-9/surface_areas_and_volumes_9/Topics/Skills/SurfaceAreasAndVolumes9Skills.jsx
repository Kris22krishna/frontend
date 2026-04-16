import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../surface_areas_and_volumes_9.module.css';
import { LatexText } from '../../../../../LatexText';
import {
    ConeAnatomyChart, ConeFormulasChart,
    SphereAnatomyChart, HemisphereChart, HemisphereVolumeChart,
    ApplicationCostChart, ApplicationCapacityChart
} from '../components/SAVDynamicCharts';

import SurfaceAreasAndVolumesPracticeEngine from './Engines/SurfaceAreasAndVolumesPracticeEngine';
import SurfaceAreasAndVolumesAssessmentEngine from './Engines/SurfaceAreasAndVolumesAssessmentEngine';

const SKILLS = [
    {
        id: 'cones',
        nodeId: 'sav-9-1001-0000',
        title: 'Cones: Area & Volume',
        subtitle: 'Skill 1 · CSA, TSA & Volume',
        icon: '🍦',
        color: '#0f4c81',
        desc: 'Calculate the Curved Surface Area, Total Surface Area, and Volume of a Right Circular Cone.',
        learn: {
            rules: [
                {
                    title: 'Slant Height Concept',
                    f: '$l^2 = r^2 + h^2$',
                    chart: ConeAnatomyChart,
                    d: 'The slant height, radius, and vertical height form a right triangle inside the cone.',
                    ex: 'If $r = 3$ and $h = 4$, then $l^2 = 3^2 + 4^2 = 25$, so $l = 5$.',
                    tip: 'You almost always need $l$ to find the surface area, and $h$ to find the volume. Use Pythagoras to find whichever is missing!'
                },
                {
                    title: 'Cone Surface Areas',
                    f: '$\\text{CSA} = \\pi r l \\;\\text{ and }\\; \\text{TSA} = \\pi r (l + r)$',
                    chart: ConeFormulasChart,
                    d: 'The Curved Surface Area covers only the slanted wrapping. The Total Surface Area adds the flat circular base.',
                    ex: 'For a cone with $r = 7$ and $l = 10$:\n$\\text{CSA} = \\frac{22}{7} \\times 7 \\times 10 = 220$.\n$\\text{TSA} = \\frac{22}{7} \\times 7(10+7) = 374$.',
                    tip: 'Never use the vertical height ($h$) for finding surface areas. Only use the slant height ($l$).'
                },
                {
                    title: 'Cone Volume',
                    f: '$\\text{Volume} = \\frac{1}{3}\\pi r^2 h$',
                    chart: ConeAnatomyChart,
                    d: 'The volume is exactly one-third the volume of a cylinder with the same base and height.',
                    ex: 'For a cone with $r = 7$ and $h = 10$:\nVol = $\\frac{1}{3} \\times \\frac{22}{7} \\times 49 \\times 10 = \\frac{1540}{3}$.',
                    tip: 'Notice that volume requires the strictly vertical height ($h$), NOT the slant height ($l$).'
                }
            ],
        },
    },
    {
        id: 'spheres',
        nodeId: 'sav-9-1002-0000',
        title: 'Spheres & Hemispheres',
        subtitle: 'Skill 2 · Areas & Volumes',
        icon: '🌍',
        color: '#1a237e',
        desc: 'Work with fully round solid shapes and their exact halves.',
        learn: {
            rules: [
                {
                    title: 'Sphere Area & Volume',
                    f: '$\\text{SA} = 4\\pi r^2 \\;\\text{ and }\\; \\text{Vol} = \\frac{4}{3}\\pi r^3$',
                    chart: SphereAnatomyChart,
                    d: 'A sphere has no separate "Curved" distinct from "Total" surface area since the entire shape is one continuous curve.',
                    ex: 'For a sphere with radius $7$:\nSA = $4 \\times \\frac{22}{7} \\times 49 = 616$.\nVol = $\\frac{4}{3} \\times \\frac{22}{7} \\times 343 \\approx 1437.3$.',
                    tip: 'A sphere\'s surface area is exactly equal to 4 flat circles of the same radius placed side-by-side.'
                },
                {
                    title: 'Hemisphere Areas',
                    f: '$\\text{CSA} = 2\\pi r^2 \\;\\text{ and }\\; \\text{TSA} = 3\\pi r^2$',
                    chart: HemisphereChart,
                    d: 'A hemisphere has a curved bowl part ($2\\pi r^2$) and a flat lid part ($\\pi r^2$).',
                    ex: 'A hemispherical bowl without a lid has area $2\\pi r^2$.\nIf you place a lid on it, the whole surface totals $3\\pi r^2$.',
                    tip: 'Always read carefully to see if the hemisphere is "solid" (needs TSA) or "open" at the top (needs CSA).'
                },
                {
                    title: 'Hemisphere Volume',
                    f: '$\\text{Volume} = \\frac{2}{3}\\pi r^3$',
                    chart: HemisphereVolumeChart,
                    d: 'Since it is exactly half of a sphere, its volume is halved.',
                    ex: 'For a bowl with radius $21$:\nVolume = $\\frac{2}{3} \\times \\frac{22}{7} \\times 21^3 = 19404$.',
                    tip: 'Capacity is often measured in Liters. Remember that $1000 \\text{ cm}^3 = 1 \\text{ Liter}$.'
                }
            ],
        },
    },
    {
        id: 'applications',
        nodeId: 'sav-9-1003-0000',
        title: 'Real World Costs & Applications',
        subtitle: 'Skill 3 · Applied Mathematics',
        icon: '💰',
        color: '#b71c1c',
        desc: 'Solve word problems involving painting costs, canvas requirements, and volumes in liters.',
        learn: {
            rules: [
                {
                    title: 'Painting and Covering',
                    f: '$\\text{Total Cost} = \\text{Area} \\times \\text{Rate}$',
                    chart: ApplicationCostChart,
                    d: 'When a problem asks to paint a dome or make a tent, you must calculate the correct Surface Area first.',
                    ex: 'To paint the outside of a hemispherical dome of radius $14$m at $₹5$ per $m^2$:\nArea = $2\\pi (14)^2 = 1232$.\nCost = $1232 \\times 5 = ₹6160$.',
                    tip: 'Tents rarely have canvas on the floor! So use CSA. Painting a solid toy block? Use TSA.'
                },
                {
                    title: 'Capacity & Fluid Volume',
                    f: '$1 \\text{ m}^3 = 1000 \\text{ L} \\;\\text{ and }\\; 1000 \\text{ cm}^3 = 1 \\text{ L}$',
                    chart: ApplicationCapacityChart,
                    d: 'When filling tanks or bowls with liquid, volume is required, but it often needs converting to Liters (or kiloliters).',
                    ex: 'If a conical cup has a volume of $308 \\text{ cm}^3$, it holds $0.308$ Liters of water.',
                    tip: 'Always make sure all measurements (like radius and height) are in the same unit before doing any multiplication!'
                }
            ],
        },
    }
];

export default function SurfaceAreasAndVolumes9Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // list, learn, practice, assessment
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className={styles['page']} style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
                <nav className={styles['nav']} style={view === 'learn' ? { position: 'sticky', top: 0, zIndex: 100 } : {}}>
                    <button className={styles['nav-back']} onClick={goBack}>← Back to Skills</button>
                    <div className={styles['nav-links']}>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/intro')}>🌟 Intro</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/terminology')}>📖 Terminology</button>
                        <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className={styles['quiz-container']} style={{ maxWidth: 1060 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                                    {skill.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                    Learn: {skill.title}
                               </h1>
                            </div>

                            <div className={styles['learn-grid']}>
                                <aside className={styles['learn-sidebar']}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`${styles['sidebar-btn']} ${selectedLearnIdx === ri ? styles['active'] : ''}`}
                                            style={{ '--skill-color': skill.color }}>
                                            <div className={styles['sidebar-btn-num']}>{ri + 1}</div>
                                            <span className={styles['sidebar-btn-title']}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className={`${styles['details-window']} ${styles['details-window-anim']}`} key={selectedLearnIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 28 }}>{skill.icon}</div>
                                    </div>
                                    <div style={{ background: `${skill.color}08`, padding: '18px', borderRadius: 16, border: `2px solid ${skill.color}20`, marginBottom: 22, textAlign: 'center' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: skill.color, letterSpacing: 0.5 }}>
                                            <LatexText text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>

                                    {/* Animated chart illustration */}
                                    {skill.learn.rules[selectedLearnIdx].chart && (
                                        <div style={{ marginBottom: 22, padding: 16, background: '#f8fafc', borderRadius: 16, display: 'flex', justifyContent: 'center' }}>
                                            {React.createElement(skill.learn.rules[selectedLearnIdx].chart)}
                                        </div>
                                    )}
                                    
                                    <div className={styles['rule-split']}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <div style={{ fontSize: 15, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].d} />
                                            </div>
                                            <div style={{ marginTop: 16, background: 'rgba(20,184,166,0.05)', padding: '12px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                <div style={{ margin: 0, fontSize: 13.5, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Tip: </span>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: skill.color, marginBottom: 8 }}>Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <button className={styles['btn-primary']} onClick={() => setView('practice')} style={{ background: skill.color, border: 'none' }}>Mastered? Try Practice →</button>
                                        <button className={styles['nav-back']} onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <SurfaceAreasAndVolumesPracticeEngine
                                skillId={skill.id}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <SurfaceAreasAndVolumesAssessmentEngine
                                color={skill.color}
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles['page']} style={window.innerWidth > 900 ? { minHeight: 'auto', height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { display: 'flex', flexDirection: 'column' }}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Surface Areas & Volumes <span style={{ color: '#0f766e' }}>Skills</span>
                        </h1>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Learn rules · Practice with mixed questions · Take a timed assessment.</div>
                    </div>
                    <div className={styles['skills-list']}>
                        {SKILLS.map((sk, idx) => (
                            <div key={sk.id} className={styles['skill-card']}>
                                <div className={styles['skill-info']}>
                                    <div className={styles['skill-icon']} style={{ background: `${sk.color}15`, fontSize: 28 }}>{sk.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{sk.subtitle}</div>
                                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{sk.title}</h3>
                                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{sk.desc}</p>
                                    </div>
                                </div>
                                <div className={styles['skill-actions']}>
                                    <button
                                        style={{ padding: '8px 16px', background: '#fff', border: `2px solid ${sk.color}`, color: sk.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('learn'); }}>Learn</button>
                                    <button
                                        style={{ padding: '8px 16px', background: '#fff', border: `2px solid ${sk.color}`, color: sk.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('practice'); }}>Practice</button>
                                    <button
                                        style={{ padding: '8px 16px', background: sk.color, border: `2px solid ${sk.color}`, color: '#fff', borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('assessment'); }}>Assess</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
