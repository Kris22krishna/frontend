import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GradeSection.css';

const grades = [
    { id: '1', label: 'Class I', color: '#EF4444' },    // Red
    { id: '2', label: 'Class II', color: '#F97316' },   // Orange
    { id: '3', label: 'Class III', color: '#06B6D4' },  // Cyan
    { id: '4', label: 'Class IV', color: '#8B5CF6' },   // Purple
    { id: '5', label: 'Class V', color: '#10B981' },    // Emerald
    { id: '6', label: 'Class VI', color: '#F59E0B' },   // Amber
    { id: '7', label: 'Class VII', color: '#3B82F6' },  // Blue
    { id: '8', label: 'Class VIII', color: '#EC4899' }, // Pink
    { id: '9', label: 'Class IX', color: '#6366F1' },   // Indigo
    { id: '10', label: 'Class X', color: '#DC2626' },   // Red-600
];

const GradeSection = () => {
    const navigate = useNavigate();

    return (
        <section className="grade-section container">
            <h2 className="section-title">Explore by Grade</h2>
            <div className="grade-grid">
                {grades.map((grade) => (
                    <div
                        key={grade.id}
                        className="grade-card"
                        style={{ '--grade-color': grade.color }}
                        onClick={() => navigate(`/math/grade/${grade.id}`)}
                    >
                        <div className="grade-icon-box">
                            <span className="grade-roman">{grade.label.split(' ')[1]}</span>
                        </div>
                        <h3 className="grade-label">{grade.label}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GradeSection;
