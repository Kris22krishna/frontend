import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../coordinate-geometry.css';
import QuizEngine from '../../../Engines/QuizEngine';
import AssessmentEngine from '../../../Engines/AssessmentEngine';
import { generateQuestions } from './ApplicationsSkillsData';

export default function ApplicationsSkills() {
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
                title="Applications & Mastery Assessment"
                onBack={() => setSelectedTopic(null)}
                color="#0ea5e9"
            />
        );
    }

    if (selectedTopic) {
        return (
            <QuizEngine 
                questions={() => generateQuestions(selectedTopic)}
                title="Applications & Mastery Practice"
                onBack={() => setSelectedTopic(null)}
                color="#f43f5e"
            />
        );
    }

    return (
        <div className="geom-page">
            <div className="geom-module-hero">
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
                    <button className="geom-back-btn" onClick={() => navigate('/coordinate-geometry/applications')}>
                        ← Back to Applications & Mastery
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