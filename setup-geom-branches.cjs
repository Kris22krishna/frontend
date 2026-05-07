const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'components', 'Math-Branches', 'Coordinate-Geometry');

const branches = [
    { dir: '2D-Geometry', prefix: 'TwoDGeometry', title: '2D Foundation', desc: 'Master the Cartesian plane, distance formula, and section formula in 2D space.' },
    { dir: '3D-Geometry', prefix: 'ThreeDGeometry', title: '3D Foundation', desc: 'Understand 3D coordinate axes, octants, direction cosines, and direction ratios.' },
    { dir: 'Lines-In-Space', prefix: 'LinesInSpace', title: 'Lines In Space', desc: 'Calculate vector equations, angles between lines, and the shortest distance between skew lines.' },
    { dir: 'Applications', prefix: 'Applications', title: 'Applications & Mastery', desc: 'Apply your knowledge to navigation systems, robotics, and solve master-level coordinate problems.' }
];

branches.forEach(b => {
    const branchDir = path.join(baseDir, b.dir);
    if (!fs.existsSync(branchDir)) fs.mkdirSync(branchDir);
    
    // Dashboard
    const dashboardPath = path.join(branchDir, `${b.prefix}Dashboard.jsx`);
    const dashboardCode = `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../coordinate-geometry.css';

const MODULES = [
    {
        id: 'skills',
        path: '/coordinate-geometry/${b.dir.toLowerCase()}/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice and Assess',
        desc: 'Practice problems and master the core skills.',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244,63,94,0.4)',
    },
];

const STATS = [
    { val: '1', label: 'Core Skills', color: '#f43f5e' },
];

export default function ${b.prefix}Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="geom-fullpage">
            <div className="geom-left">
                <div className="geom-deco geom-deco-a" />
                <div className="geom-deco geom-deco-b" />
                <div className="geom-deco geom-deco-c" />

                <div className="geom-left-content">
                    <button
                        onClick={() => navigate('/coordinate-geometry')}
                        style={{
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', borderRadius: '50px', padding: '8px 16px', fontSize: '13px',
                            fontWeight: '600', cursor: 'pointer', marginBottom: '24px', display: 'inline-flex',
                            alignItems: 'center', gap: '6px', backdropFilter: 'blur(10px)'
                        }}
                    >
                        ← Back to Coordinate Geometry
                    </button>

                    <h1 className="geom-main-title">
                        Master
                        <br />
                        <span className="geom-title-accent" style={{ background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>${b.title}</span>
                    </h1>

                    <p className="geom-main-sub">
                        ${b.desc}
                    </p>

                    <div className="geom-stats-grid">
                        {STATS.map((item) => (
                            <div className="geom-stat" key={item.label}>
                                <span className="geom-stat-num" style={{ color: item.color }}>
                                    {item.val}
                                </span>
                                <span className="geom-stat-lbl">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="geom-right">
                <p className="geom-right-eyebrow">Choose a topic to explore</p>

                <div className="geom-cards-col">
                    {MODULES.map((moduleItem) => (
                        <button
                            key={moduleItem.id}
                            className="geom-card-btn"
                            onClick={() => navigate(moduleItem.path)}
                        >
                            <div
                                className="geom-card-strip"
                                style={{ background: \`linear-gradient(180deg, \${moduleItem.gradFrom}, \${moduleItem.gradTo})\` }}
                            />

                            <div
                                className="geom-card-icon"
                                style={{
                                    background: \`linear-gradient(135deg, \${moduleItem.gradFrom}, \${moduleItem.gradTo})\`,
                                    boxShadow: \`0 6px 20px \${moduleItem.shadow}\`,
                                }}
                            >
                                {moduleItem.emoji}
                            </div>

                            <div className="geom-card-text">
                                <div className="geom-card-label" style={{ color: moduleItem.gradFrom }}>
                                    {moduleItem.label}
                                </div>
                                <div className="geom-card-tagline">{moduleItem.tagline}</div>
                                <div className="geom-card-desc">{moduleItem.desc}</div>
                            </div>

                            <div className="geom-card-chevron" style={{ color: moduleItem.gradFrom }}>
                                {'>'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
`;
    fs.writeFileSync(dashboardPath, dashboardCode.trim());

    // Skills Dir
    const topicsDir = path.join(branchDir, 'Topics');
    if (!fs.existsSync(topicsDir)) fs.mkdirSync(topicsDir);
    const skillsDir = path.join(topicsDir, 'Skills');
    if (!fs.existsSync(skillsDir)) fs.mkdirSync(skillsDir);

    // SkillsData
    const dataPath = path.join(skillsDir, `${b.prefix}SkillsData.js`);
    const dataCode = `
export const generateQuestions = (topicId) => {
    // Generate empty array for now
    return [];
};
`;
    fs.writeFileSync(dataPath, dataCode.trim());

    // Skills Component
    const skillsPath = path.join(skillsDir, `${b.prefix}Skills.jsx`);
    const skillsCode = `
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../coordinate-geometry.css';
import QuizEngine from '../../../../Engines/QuizEngine';
import AssessmentEngine from '../../../../Engines/AssessmentEngine';
import { generateQuestions } from './${b.prefix}SkillsData';

export default function ${b.prefix}Skills() {
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState(null);

    const topics = [
        { id: 'practice', label: 'Practice Problems', desc: 'Step-by-step practice.' },
        { id: 'assessment', label: 'Chapter Assessment', desc: 'Test your knowledge.' }
    ];

    if (selectedTopic === 'assessment') {
        return (
            <AssessmentEngine 
                questions={() => generateQuestions('assessment')}
                title="${b.title} Assessment"
                onBack={() => setSelectedTopic(null)}
                color="#0ea5e9"
            />
        );
    }

    if (selectedTopic) {
        return (
            <QuizEngine 
                questions={() => generateQuestions(selectedTopic)}
                title="${b.title} Practice"
                onBack={() => setSelectedTopic(null)}
                color="#f43f5e"
            />
        );
    }

    return (
        <div className="geom-page">
            <div className="geom-module-hero">
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
                    <button className="geom-back-btn" onClick={() => navigate('/coordinate-geometry/${b.dir.toLowerCase()}')}>
                        ← Back to ${b.title}
                    </button>
                    <h1 className="geom-section-title" style={{ marginTop: 24, fontSize: '2.5rem' }}>
                        <span>Skills</span> Practice
                    </h1>
                    <p className="geom-section-subtitle">
                        Select a topic below to begin your practice.
                    </p>
                </div>
            </div>
            
            <div className="geom-section" style={{ paddingTop: 32 }}>
                <div className="geom-skills-grid">
                    {topics.map(t => (
                        <div key={t.id} className="geom-skill-card">
                            <div className="geom-skill-icon" style={{ background: '#fdf2f8', color: '#f43f5e' }}>
                                🎯
                            </div>
                            <div className="geom-skill-content">
                                <h3 style={{ margin: 0, fontSize: 18 }}>{t.label}</h3>
                                <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>{t.desc}</p>
                            </div>
                            <button className="geom-skill-btn-filled" onClick={() => setSelectedTopic(t.id)}>
                                Start
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
`;
    fs.writeFileSync(skillsPath, skillsCode.trim());

});
console.log('Branches scaffolded.');
