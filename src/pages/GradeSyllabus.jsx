import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { api } from '../services/api'; // Use real API
import SEO from '../components/common/SEO';
import '../styles/GradeSyllabus.css';

const SkillItem = ({ skill }) => (
    <Link to={`/practice/${skill.skill_id}`} className="skill-item">
        <span className="skill-code">&bull;</span>
        <span className="skill-title">{skill.skill_name}</span>
    </Link>
);

SkillItem.propTypes = {
    skill: PropTypes.object.isRequired
};

const GradeSyllabus = () => {
    const { grade } = useParams();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Parse grade number from param (e.g., "1" from "grade1" or just "1")
                const gradeNum = grade.replace('grade', '');
                const response = await api.getSkills(gradeNum);
                setSkills(response || []);
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [grade]);

    // Group skills by topic for better display
    const skillsByTopic = skills.reduce((acc, skill) => {
        const topic = skill.topic || 'General';
        if (!acc[topic]) acc[topic] = [];
        acc[topic].push(skill);
        return acc;
    }, {});

    if (loading) return <div className="loading-container">Loading syllabus...</div>;

    // Display if no skills found
    if (!skills || skills.length === 0) return (
        <div className="grade-syllabus-container">
            <header className="syllabus-header">
                <h1>Class {grade.replace('grade', '')} Maths</h1>
                <p>No active content found for this grade.</p>
            </header>
        </div>
    );

    return (
        <div className="grade-syllabus-container">
            <SEO title={`Class ${grade.replace('grade', '')} Maths - Skill100`} description={`Complete syllabus for Class ${grade.replace('grade', '')}`} />

            <header className="syllabus-header">
                <h1>Class {grade.replace('grade', '')} Maths</h1>
                <p>Here is a list of all of the maths skills students learn in Class {grade.replace('grade', '')}!</p>
            </header>

            <div className="syllabus-grid">
                {Object.entries(skillsByTopic).map(([topic, topicSkills]) => (
                    <div key={topic} className="category-block">
                        <h3 className="category-title">{topic}</h3>
                        <div className="category-content">
                            {topicSkills.map(skill => (
                                <SkillItem key={skill.skill_id} skill={skill} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GradeSyllabus;
