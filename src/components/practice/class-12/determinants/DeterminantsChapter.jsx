import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers, Triangle, Calculator, Grid, Compass, Cuboid } from 'lucide-react';
import { LatexText } from '../../../LatexText';
import '../../../../pages/middle/MiddleGradeSyllabus.css';

const TOPICS = [
    {
        id: 'determinant',
        title: 'Determinant',
        icon: <Calculator size={24} />,
        accent: '#3b82f6',
        subtopics: [
            { id: 'determinant-order', title: 'Determinant of Order 1, 2, 3', path: '/senior/grade/12/determinants/determinant-order/practice' },
            { id: 'expansion-row-column', title: 'Expansion along Row / Column', path: '/senior/grade/12/determinants/expansion-row-column/practice' },
        ],
    },
    {
        id: 'properties',
        title: 'Properties of Determinants',
        icon: <Layers size={24} />,
        accent: '#8b5cf6',
        subtopics: [
            { id: 'basic-properties', title: 'Basic Properties (Row / Column Ops)', path: '/senior/grade/12/determinants/basic-properties/practice' },
            { id: 'factorisation-simplification', title: 'Factorisation & Simplification', path: '/senior/grade/12/determinants/factorisation-simplification/practice' },
        ],
    },
    {
        id: 'area-triangle',
        title: 'Area of a Triangle',
        icon: <Triangle size={24} />,
        accent: '#10b981',
        subtopics: [
            { id: 'area-determinant', title: 'Area using Determinants', path: '/senior/grade/12/determinants/area-determinant/practice' },
            { id: 'collinearity', title: 'Collinearity of Points', path: '/senior/grade/12/determinants/collinearity/practice' },
            { id: 'equation-of-line', title: 'Equation of Line using Determinant', path: '/senior/grade/12/determinants/equation-of-line/practice' },
        ],
    },
    {
        id: 'minors-cofactors',
        title: 'Minors and Cofactors',
        icon: <Grid size={24} />,
        accent: '#f59e0b',
        subtopics: [
            { id: 'minors', title: 'Minors', path: '/senior/grade/12/determinants/minors/practice' },
            { id: 'cofactors', title: 'Cofactors', path: '/senior/grade/12/determinants/cofactors/practice' },
        ],
    },
    {
        id: 'adjoint-inverse',
        title: 'Adjoint and Inverse of Matrix',
        icon: <Cuboid size={24} />,
        accent: '#ec4899',
        subtopics: [
            { id: 'adjoint', title: 'Adjoint of a Matrix', path: '/senior/grade/12/determinants/adjoint/practice' },
            { id: 'inverse-adjoint', title: 'Inverse using Adjoint', path: '/senior/grade/12/determinants/inverse-adjoint/practice' },
            { id: 'matrix-identities', title: 'Verification of Matrix Identities', path: '/senior/grade/12/determinants/matrix-identities/practice' },
        ],
    },
    {
        id: 'applications',
        title: 'Applications of Determinants & Matrices',
        icon: <Compass size={24} />,
        accent: '#06b6d4',
        subtopics: [
            { id: 'solving-system', title: 'Solving Systems (Inverse Matrix Method)', path: '/senior/grade/12/determinants/solving-system/practice' },
            { id: 'consistency', title: 'Consistency of a System', path: '/senior/grade/12/determinants/consistency/practice' },
        ],
    },
    {
        id: 'chapter-test',
        title: 'Determinants Chapter Test',
        icon: <Layers size={24} />,
        accent: '#f43f5e',
        subtopics: [
            { id: 'final-test', title: 'Comprehensive Chapter Test', path: '/senior/grade/12/determinants/chapter-test' },
        ],
    }
];

const SkillItem = ({ skill, onClick }) => (
    <div onClick={() => onClick(skill.path)} className="middle-skill-item" style={{ cursor: 'pointer' }}>
        <ArrowRight size={16} className="skill-arrow" />
        <span className="skill-text">
            <LatexText text={skill.title} />
        </span>
    </div>
);

const DeterminantsChapter = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBack = () => {
        navigate('/senior/grade/12');
    };

    return (
        <div className="middle-syllabus-page">
            <div className="middle-container">
                <div className="middle-nav-controls">
                    <button onClick={handleBack} className="middle-back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        ← Back to Grade 12
                    </button>
                </div>

                <header className="middle-header-bold">
                    <div className="header-decoration">
                        <div className="geo-shape shape-1"></div>
                        <div className="geo-shape shape-2"></div>
                    </div>
                    <div className="header-content">
                        <div className="grade-badge">CLASS 12 • MATHEMATICS</div>
                        <h1>Determinants</h1>
                        <p>Master determinants — from evaluation to real-world applications.</p>
                    </div>
                </header>

                <div className="middle-masonry-grid">
                    {TOPICS.map((topic) => (
                        <div key={topic.id} className="middle-topic-card" style={{ '--card-accent': topic.accent }}>
                            <div className="topic-header">
                                <div className="topic-icon-wrapper">
                                    {topic.icon}
                                </div>
                                <h3 className="category-header"><LatexText text={topic.title} /></h3>
                            </div>
                            <div className="skills-container-nested">
                                <div className="subtopic-group is-main">
                                    <div className="skills-list-wrapper show">
                                        <div className="skills-list">
                                            {topic.subtopics.map((sub) => (
                                                <SkillItem key={sub.id} skill={sub} onClick={navigate} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DeterminantsChapter;
