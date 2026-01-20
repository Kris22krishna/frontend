import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { api } from '../services/api'; // Use real API
import SEO from '../components/common/SEO';
import '../styles/GradeSyllabus.css';

const SkillItem = ({ skill }) => (
    <Link to={`/practice/${skill.id}`} className="skill-item">
        <span className="skill-code">{skill.code}</span>
        <span className="skill-title">{skill.title}</span>
    </Link>
);

SkillItem.propTypes = {
    skill: PropTypes.object.isRequired
};

const getSortKey = (item) => {
    if (item.code) return item.code;
    if (item.skills && item.skills.length > 0) return item.skills[0].code;
    if (item.children && item.children.length > 0) return getSortKey(item.children[0]);
    return '';
};

const CategoryNode = ({ category }) => {
    const mixedContent = [
        ...(category.children || []).map(c => ({ ...c, type: 'category' })),
        ...(category.skills || []).map(s => ({ ...s, type: 'skill' }))
    ];

    mixedContent.sort((a, b) => {
        const keyA = getSortKey(a);
        const keyB = getSortKey(b);
        return keyA.localeCompare(keyB, undefined, { numeric: true, sensitivity: 'base' });
    });

    return (
        <div className="category-block">
            <h3 className="category-title">{category.name}</h3>
            <div className="category-content">
                {mixedContent.map(item => {
                    if (item.type === 'category') {
                        return <CategoryNode key={item.id} category={item} />;
                    } else {
                        return <SkillItem key={item.id} skill={item} />;
                    }
                })}
            </div>
        </div>
    );
};

CategoryNode.propTypes = {
    category: PropTypes.object.isRequired
};

const GradeSyllabus = () => {
    const { grade } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch hierarchical syllabus from backend
                const response = await api.getGradeSyllabus(grade);
                setData(response);
            } catch (error) {
                console.error("Failed to fetch syllabus", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [grade]);

    if (loading) return <div className="loading-container">Loading syllabus...</div>;
    if (!data || data.categories.length === 0) return (
        <div className="grade-syllabus-container">
            <header className="syllabus-header">
                <h1>Class {grade.replace('grade', '')} Maths</h1>
                <p>No active content found for this grade.</p>
            </header>
        </div>
    );

    return (
        <div className="grade-syllabus-container">
            <SEO title={`${data.gradeName} Maths - Skill100`} description={`Complete syllabus for ${data.gradeName}`} />

            <header className="syllabus-header">
                <h1>{data.gradeName} Maths</h1>
                <p>Here is a list of all of the maths skills students learn in {data.gradeName}! Click any skill to start practising.</p>
            </header>

            <div className="syllabus-grid">
                {data.categories.map(category => (
                    <CategoryNode key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default GradeSyllabus;
