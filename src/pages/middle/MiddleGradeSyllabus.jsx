import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { api } from '../../services/api';
import SEO from '../../components/common/SEO';
import LoginPromptModal from '../../components/auth/LoginPromptModal';
import {
    Grid, Layers, Triangle, Zap, Calculator, PieChart,
    ArrowRight, Box, Compass, Cuboid, ChevronDown, ChevronUp
} from 'lucide-react';
import { LatexText } from '../../components/LatexText';
import { capitalizeFirstLetter } from '../../lib/stringUtils';
import './MiddleGradeSyllabus.css';

const SkillItem = ({ skill, onClick }) => (
    <div onClick={() => onClick(skill)} className="middle-skill-item" style={{ cursor: 'pointer' }}>
        <ArrowRight size={16} className="skill-arrow" />
        <span className="skill-text">
            <LatexText text={capitalizeFirstLetter(skill.skill_name)} />
        </span>
    </div>
);

SkillItem.propTypes = {
    skill: PropTypes.object.isRequired
};

// Helper to get icon based on topic name
const getTopicIcon = (topicName) => {
    const lower = topicName.toLowerCase();
    if (lower.includes('geometry') || lower.includes('shape')) return <Triangle size={24} />;
    if (lower.includes('algebra') || lower.includes('equation')) return <Calculator size={24} />;
    if (lower.includes('data') || lower.includes('graph')) return <PieChart size={24} />;
    if (lower.includes('fraction') || lower.includes('decimal')) return <Grid size={24} />;
    if (lower.includes('measurement')) return <Compass size={24} />;
    if (lower.includes('volume') || lower.includes('3d')) return <Cuboid size={24} />;
    return <Layers size={24} />; // Default
};

// Helper to get color accent based on index
const getAccentColor = (index) => {
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];
    return colors[index % colors.length];
};

const MiddleGradeSyllabus = () => {
    const { grade } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingSkill, setPendingSkill] = useState(null);
    const [expandedSubTopics, setExpandedSubTopics] = useState({});

    const toggleSubTopic = (topic, subTopic) => {
        setExpandedSubTopics(prev => ({
            ...prev,
            [`${topic}-${subTopic}`]: !prev[`${topic}-${subTopic}`]
        }));
    };

    const handleSkillClick = (skill) => {
        if (!isAuthenticated) {
            setPendingSkill(skill);
            setShowLoginModal(true);
        } else if (skill.isLocal) {
            navigate(skill.path);
        } else {
            navigate(`/middle/practice/${skill.skill_id}`, { state: { grade: grade } });
        }
    };

    const handleLoginSuccess = () => {
        if (pendingSkill) {
            navigate(`/middle/practice/${pendingSkill.skill_id}`, { state: { grade: grade } });
            setPendingSkill(null);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            try {
                const gradeNum = grade.replace('grade', '');
                const response = await api.getSkills(gradeNum);
                let fetched = response || [];

                if (gradeNum === '7') {
                    fetched = [
                        ...fetched,
                        {
                            skill_id: 'local-percent',
                            skill_name: 'Percentage',
                            topic: 'Comparing Quantities',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/comparing-quantities/percentage'
                        },
                        {
                            skill_id: 'local-use-percent',
                            skill_name: 'Use of Percentages',
                            topic: 'Comparing Quantities',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/comparing-quantities/use-of-percentages'
                        },
                        {
                            skill_id: 'local-profit-loss',
                            skill_name: 'Profit and Loss',
                            topic: 'Comparing Quantities',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/comparing-quantities/profit-and-loss'
                        },
                        {
                            skill_id: 'local-simple-interest',
                            skill_name: 'Simple Interest',
                            topic: 'Comparing Quantities',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/comparing-quantities/simple-interest'
                        },
                        {
                            skill_id: 'local-cq-test',
                            skill_name: 'Chapter Test',
                            topic: 'Comparing Quantities',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/comparing-quantities/chapter-test'
                        },
                        {
                            skill_id: 'local-exp-basics',
                            skill_name: 'Exponents Basics',
                            topic: 'Exponents and Powers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/exponents-and-powers/basics'
                        },
                        {
                            skill_id: 'local-exp-laws',
                            skill_name: 'Laws of Exponents',
                            topic: 'Exponents and Powers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/exponents-and-powers/laws'
                        },
                        {
                            skill_id: 'local-exp-decimal',
                            skill_name: 'Decimal Number System',
                            topic: 'Exponents and Powers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/exponents-and-powers/decimal-system'
                        },
                        {
                            skill_id: 'local-exp-standard',
                            skill_name: 'Standard Form',
                            topic: 'Exponents and Powers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/exponents-and-powers/standard-form'
                        },
                        {
                            skill_id: 'local-ep-test',
                            skill_name: 'Chapter Test',
                            topic: 'Exponents and Powers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/exponents-and-powers/chapter-test'
                        }
                    ];
                }
                setSkills(fetched);
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [grade]);

    // Group skills by topic and sub-topic
    const skillsByTopic = skills.reduce((acc, skill) => {
        const topicName = (skill.topic || 'General').toLowerCase();
        const gradeNum = parseInt(grade.replace('grade', ''));

        // Filter by grade
        if (gradeNum === 5) return acc; // Hide all default skills for Grade 5
        if (gradeNum === 6 && !topicName.includes("fraction")) return acc;
        if (gradeNum === 7 && topicName !== "comparing quantities" && topicName !== "exponents and powers") return acc;
        if (gradeNum === 7 && topicName === "exponents and powers" && !skill.isLocal) return acc;

        const topic = skill.topic || 'General';
        const subTopic = skill.sub_topic || 'Main';

        if (!acc[topic]) acc[topic] = {};
        if (!acc[topic][subTopic]) acc[topic][subTopic] = [];
        acc[topic][subTopic].push(skill);
        return acc;
    }, {});

    // Inject custom skills for Grade 5
    if (parseInt(grade.replace('grade', '')) === 5) {
        skillsByTopic['Ways to Divide and Multiply'] = {
            'Multiplication': [
                { skill_id: 9003, skill_name: 'Multiply 2 digit numbers', topic: 'Ways to Divide and Multiply', sub_topic: 'Multiplication' },
                { skill_id: 9004, skill_name: 'Multiply 3 digit numbers', topic: 'Ways to Divide and Multiply', sub_topic: 'Multiplication' },
                { skill_id: 9005, skill_name: 'Multiply three and four numbers', topic: 'Ways to Divide and Multiply', sub_topic: 'Multiplication' },
                { skill_id: 9006, skill_name: 'Multiply number ending in zeroes', topic: 'Ways to Divide and Multiply', sub_topic: 'Multiplication' },
                { skill_id: 9007, skill_name: 'Skill Application Problems', topic: 'Ways to Divide and Multiply', sub_topic: 'Multiplication' }
            ],
            'Division': [
                { skill_id: 9008, skill_name: 'Divide by 1 digit number', topic: 'Ways to Divide and Multiply', sub_topic: 'Division' },
                { skill_id: 9009, skill_name: 'Divide by 2 digit number', topic: 'Ways to Divide and Multiply', sub_topic: 'Division' },
                { skill_id: 9010, skill_name: 'Divide numbers ending in zeroes', topic: 'Ways to Divide and Multiply', sub_topic: 'Division' },
                { skill_id: 9011, skill_name: 'Skill Application Problems', topic: 'Ways to Divide and Multiply', sub_topic: 'Division' }
            ],
            'Skill Application Problems': [
                { skill_id: 9012, skill_name: 'Skill Application Problems', topic: 'Ways to Divide and Multiply', sub_topic: 'Skill Application Problems' }
            ]
        };
    }

    if (loading) return <div className="middle-loading">Loading syllabus...</div>;

    if (!skills || skills.length === 0) return (
        <div className="middle-syllabus-page">
            <header className="middle-header">
                <h1>Class {grade.replace('grade', '')} Maths</h1>
                <p>No active content found for this grade.</p>
                <Link to="/" style={{ display: 'inline-block', marginTop: '30px', color: '#4F46E5', fontWeight: '600', textDecoration: 'none' }}>← Back Home</Link>
            </header>
        </div>
    );

    return (
        <div className="middle-syllabus-page">
            <SEO title={`Class ${grade.replace('grade', '')} Maths - skill100`} description={`Complete syllabus for Class ${grade.replace('grade', '')}`} />

            <div className="middle-container">
                <div className="middle-nav-controls">
                    <Link to="/" className="middle-back-btn">
                        ← Back Home
                    </Link>
                </div>

                <header className="middle-header-bold">
                    <div className="header-decoration">
                        <div className="geo-shape shape-1"></div>
                        <div className="geo-shape shape-2"></div>
                    </div>
                    <div className="header-content">
                        <div className="grade-badge">GRADE {grade.replace('grade', '')}</div>
                        <h1>Mathematics</h1>
                        <p>Master advanced concepts with interactive problem solving.</p>
                    </div>
                </header>

                <div className="middle-masonry-grid">
                    {Object.entries(skillsByTopic).map(([topic, subTopics], index) => {
                        const accentColor = getAccentColor(index);

                        // Define fixed order for sub-topics in "Ways to Multiply and Divide"
                        const subTopicOrder = ["Multiplication", "Division", "Skill Application Problems"];
                        const orderedSubTopics = Object.entries(subTopics).sort(([a], [b]) => {
                            const indexA = subTopicOrder.indexOf(a);
                            const indexB = subTopicOrder.indexOf(b);
                            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                            if (indexA !== -1) return -1;
                            if (indexB !== -1) return 1;
                            return a.localeCompare(b);
                        });

                        return (
                            <div key={topic} className="middle-topic-card" style={{ '--card-accent': accentColor }}>
                                <div className="topic-header">
                                    <div className="topic-icon-wrapper">
                                        {getTopicIcon(topic)}
                                    </div>
                                    <h3 className="category-header"><LatexText text={capitalizeFirstLetter(topic)} /></h3>
                                </div>
                                <div className="skills-container-nested">
                                    {orderedSubTopics.map(([subTopic, topicSkills]) => {
                                        const isExpanded = expandedSubTopics[`${topic}-${subTopic}`];
                                        const isMain = subTopic === 'Main';
                                        const isDirectButton = subTopic === 'Skill Application Problems';

                                        return (
                                            <div key={subTopic} className={`subtopic-group ${isExpanded ? 'is-expanded' : ''} ${isMain ? 'is-main' : ''} ${isDirectButton ? 'is-direct' : ''}`}>
                                                {!isMain && (
                                                    <button
                                                        className="subtopic-toggle-btn"
                                                        onClick={() => {
                                                            if (isDirectButton) {
                                                                // Navigate directly to the last skill in the group (usually the most comprehensive)
                                                                handleSkillClick(topicSkills[topicSkills.length - 1]);
                                                            } else {
                                                                toggleSubTopic(topic, subTopic);
                                                            }
                                                        }}
                                                    >
                                                        <span>{subTopic}</span>
                                                        {isDirectButton ? (
                                                            <ArrowRight size={18} />
                                                        ) : (
                                                            isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />
                                                        )}
                                                    </button>
                                                )}
                                                {!isDirectButton && (
                                                    <div className={`skills-list-wrapper ${isExpanded || isMain ? 'show' : 'hide'}`}>
                                                        <div className="skills-list">
                                                            {topicSkills.map(skill => (
                                                                <SkillItem key={skill.skill_id} skill={skill} onClick={handleSkillClick} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <LoginPromptModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
};

export default MiddleGradeSyllabus;
