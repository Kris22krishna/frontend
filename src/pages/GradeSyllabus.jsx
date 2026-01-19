import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getGradeSyllabus } from '../services/mockData';
import SEO from '../components/common/SEO';
import '../styles/GradeSyllabus.css'; // We'll create this

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
    // If it's a skill, it has a code directly
    if (item.code) return item.code;

    // If it's a category, it might have a code, or we look at its first child/skill
    if (item.skills && item.skills.length > 0) return item.skills[0].code;
    if (item.children && item.children.length > 0) return getSortKey(item.children[0]);

    return ''; // Fallback
};

const CategoryNode = ({ category }) => {
    // Merge children (subcategories) and skills into one list
    const mixedContent = [
        ...(category.children || []).map(c => ({ ...c, type: 'category' })),
        ...(category.skills || []).map(s => ({ ...s, type: 'skill' }))
    ];

    // Sort by code (alphanumeric sort)
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
                // Extract number from "grade3", "grade10" etc. or just pass string if API handles it
                // Assuming path is like /math/grade3
                // Simple regex to extract just the number if needed, or pass the full string
                const gradeId = grade.replace('grade', '');
                const result = await getGradeSyllabus(gradeId);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch syllabus", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [grade]);

    if (loading) {
        return <div className="loading-container">Loading syllabus...</div>;
    }

    if (!data) {
        return <div className="error-container">Failed to load data.</div>;
    }

    return (
        <div className="grade-syllabus-container">
            <SEO title={`${data.gradeName} Maths - Skill100`} description={`Complete syllabus for ${data.gradeName}`} />

            <header className="syllabus-header">
                <h1>{data.gradeName} Maths</h1>
                <p>Here is a list of all of the maths skills students learn in {data.gradeName}! These skills are organised into categories, and you can move your mouse over any skill name to preview the skill. To start practising, just click on any link.</p>
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
