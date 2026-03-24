import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { api } from '../../../services/api';
import SEO from '../../../components/common/SEO';
import LoginPromptModal from '../../../components/auth/LoginPromptModal';
import {
    Grid, Layers, Triangle, Zap, Calculator, PieChart,
    ArrowRight, Box, Compass, Cuboid, ChevronDown, ChevronUp
} from 'lucide-react';
import { LatexText } from '../../../components/LatexText';
import { capitalizeFirstLetter } from '../../../lib/stringUtils';
import './Class7Syllabus.css';

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

const getTopicIcon = (topicName) => {
    const lower = topicName.toLowerCase();
    if (lower.includes('geometry') || lower.includes('shape')) return <Triangle size={24} />;
    if (lower.includes('algebra') || lower.includes('equation')) return <Calculator size={24} />;
    if (lower.includes('data') || lower.includes('graph')) return <PieChart size={24} />;
    if (lower.includes('fraction') || lower.includes('decimal')) return <Grid size={24} />;
    if (lower.includes('measurement')) return <Compass size={24} />;
    if (lower.includes('volume') || lower.includes('3d')) return <Cuboid size={24} />;
    return <Layers size={24} />;
};

const getAccentColor = (index) => {
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];
    return colors[index % colors.length];
};

const Class7Syllabus = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingSkill, setPendingSkill] = useState(null);
    const [expandedSubTopics, setExpandedSubTopics] = useState({});

    const grade = '7';

    const toggleSubTopic = (topic, subTopic) => {
        setExpandedSubTopics(prev => ({
            ...prev,
            [`${topic}-${subTopic}`]: !prev[`${topic}-${subTopic}`]
        }));
    };

    const navigateToSkill = (skill) => {
        if (skill.isLocal) {
            navigate(skill.path);
        } else {
            const lowerSkillName = skill.skill_name.toLowerCase();
            const lowerTopic = (skill.topic || '').toLowerCase();

            if (lowerTopic.includes('perimeter') || lowerTopic.includes('area')) {
                if (lowerSkillName.includes('rectangle')) {
                    navigate(`/middle/grade/${grade}/perimeter-area/rectangle`);
                    return;
                }
                if (lowerSkillName.includes('square')) {
                    navigate(`/middle/grade/${grade}/perimeter-area/square`);
                    return;
                }
                if (lowerSkillName.includes('triangle')) {
                    navigate(`/middle/grade/${grade}/perimeter-area/triangle`);
                    return;
                }
                if (lowerSkillName.includes('polygon')) {
                    navigate(`/middle/grade/${grade}/perimeter-area/regular-polygon`);
                    return;
                }
                if (lowerSkillName.includes('mixed')) {
                    navigate(`/middle/grade/${grade}/perimeter-area/mixed-bag`);
                    return;
                }
            }

            if (lowerTopic.includes('pattern')) {
                if (lowerSkillName.includes('intro')) {
                    navigate(`/middle/grade/${grade}/patterns-math/intro`);
                    return;
                }
                if (lowerSkillName.includes('relations')) {
                    navigate(`/middle/grade/${grade}/patterns-math/relations`);
                    return;
                }
                if (lowerSkillName.includes('shapes')) {
                    navigate(`/middle/grade/${grade}/patterns-math/shapes`);
                    return;
                }
            }

            if (lowerTopic.includes('number play')) {
                if (lowerSkillName.includes('tell us things')) {
                    navigate(`/middle/grade/${grade}/number-play/numbers-things`);
                    return;
                }
                if (lowerSkillName.includes('supercells')) {
                    navigate(`/middle/grade/${grade}/number-play/supercells`);
                    return;
                }
                if (lowerSkillName.includes('growing')) {
                    navigate(`/middle/grade/${grade}/number-play/growing-patterns`);
                    return;
                }
                if (lowerSkillName.includes('playing with digits')) {
                    navigate(`/middle/grade/${grade}/number-play/playing-with-digits`);
                    return;
                }
            }

            if (lowerTopic.includes('data handling')) {
                if (lowerSkillName.includes('collecting')) {
                    navigate(`/middle/grade/${grade}/data-handling/collecting-organising`);
                    return;
                }
            }

            if (lowerTopic.includes('symmetry')) {
                if (lowerSkillName.includes('intro')) {
                    navigate(`/middle/grade/${grade}/symmetry/intro`);
                    return;
                }
                if (lowerSkillName.includes('reflection')) {
                    navigate(`/middle/grade/${grade}/symmetry/reflection`);
                    return;
                }
                if (lowerSkillName.includes('order')) {
                    navigate(`/middle/grade/${grade}/symmetry/order-rotational`);
                    return;
                }
                if (lowerSkillName.includes('rotational')) {
                    navigate(`/middle/grade/${grade}/symmetry/rotational`);
                    return;
                }
            }

            navigate(`/middle/practice/${skill.skill_id}`, { state: { grade: grade } });
        }
    };

    const handleSkillClick = (skill) => {
        if (!isAuthenticated) {
            setPendingSkill(skill);
            setShowLoginModal(true);
        } else {
            navigateToSkill(skill);
        }
    };

    const handleLoginSuccess = () => {
        if (pendingSkill) {
            navigateToSkill(pendingSkill);
            setPendingSkill(null);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.getSkills('7');
                let fetched = response || [];

                fetched = [
                    ...fetched,
                    { skill_id: 'local-percent', skill_name: 'Percentage', topic: 'Comparing Quantities', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/comparing-quantities/percentage' },
                    { skill_id: 'local-integers-chapter', skill_name: 'Integers: Interactive Chapter', topic: 'Integers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/integers' },
                    { skill_id: 'local-fractions-decimals-chapter', skill_name: 'Fractions and Decimals: Interactive Chapter', topic: 'Fractions and Decimals', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/fractions-and-decimals' },
                    { skill_id: 'local-use-percent', skill_name: 'Use of Percentages', topic: 'Comparing Quantities', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/comparing-quantities/use-of-percentages' },
                    { skill_id: 'local-profit-loss', skill_name: 'Profit and Loss', topic: 'Comparing Quantities', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/comparing-quantities/profit-and-loss' },
                    { skill_id: 'local-simple-interest', skill_name: 'Simple Interest', topic: 'Comparing Quantities', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/comparing-quantities/simple-interest' },
                    { skill_id: 'local-cq-test', skill_name: 'Chapter Test', topic: 'Comparing Quantities', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/comparing-quantities/chapter-test' },
                    { skill_id: 'local-exp-basics', skill_name: 'Exponents Basics', topic: 'Exponents and Powers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/exponents-and-powers/basics' },
                    { skill_id: 'local-exp-laws', skill_name: 'Laws of Exponents', topic: 'Exponents and Powers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/exponents-and-powers/laws' },
                    { skill_id: 'local-exp-decimal', skill_name: 'Decimal Number System', topic: 'Exponents and Powers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/exponents-and-powers/decimal-system' },
                    { skill_id: 'local-exp-standard', skill_name: 'Standard Form', topic: 'Exponents and Powers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/exponents-and-powers/standard-form' },
                    { skill_id: 'local-ep-test', skill_name: 'Chapter Test', topic: 'Exponents and Powers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/exponents-and-powers/chapter-test' },
                    { skill_id: 'local-rn-need', skill_name: 'Need For Rational Numbers', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/need' },
                    { skill_id: 'local-rn-what', skill_name: 'What Are Rational Numbers', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/what' },
                    { skill_id: 'local-rn-posneg', skill_name: 'Positive and Negative Rational Numbers', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/positive-negative' },
                    { skill_id: 'local-rn-line', skill_name: 'Rational Numbers on Number Line', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/number-line' },
                    { skill_id: 'local-rn-standard', skill_name: 'Rational Numbers Validity/Standard Form', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/standard-form' },
                    { skill_id: 'local-rn-compare', skill_name: 'Comparison of Rational Numbers', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/comparison' },
                    { skill_id: 'local-rn-between', skill_name: 'Rational Numbers Between Two Rational Numbers', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/between' },
                    { skill_id: 'local-rn-ops', skill_name: 'Operations on Rational Numbers', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/operations' },
                    { skill_id: 'local-rn-test', skill_name: 'Chapter Test', topic: 'Rational Numbers', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/rational-numbers/chapter-test' },
                    { skill_id: 'local-plane-solid', skill_name: 'Plane Figures and Solid Shapes', topic: 'Visualising Solid Shapes', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/visualising-solid-shapes/plane-figures-solid-shapes' },
                    { skill_id: 'local-fev', skill_name: 'Faces, Edges and Vertices', topic: 'Visualising Solid Shapes', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/visualising-solid-shapes/faces-edges-vertices' },
                    { skill_id: 'local-nets', skill_name: 'Nets for Building 3-D Shapes', topic: 'Visualising Solid Shapes', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/visualising-solid-shapes/nets' },
                    { skill_id: 'local-drawing', skill_name: 'Drawing Solids on a Flat Surface', topic: 'Visualising Solid Shapes', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/visualising-solid-shapes/drawing-solids' },
                    { skill_id: 'local-sections', skill_name: 'Viewing Different Sections of a Solid', topic: 'Visualising Solid Shapes', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/visualising-solid-shapes/viewing-sections' },
                    { skill_id: 'local-vss-test', skill_name: 'Chapter Test', topic: 'Visualising Solid Shapes', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/visualising-solid-shapes/chapter-test' },
                    { skill_id: 'local-pa-parallel', skill_name: 'Area of Parallelogram', topic: 'Perimeter and Area', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/perimeter-area/parallelogram' },
                    { skill_id: 'local-pa-triangle', skill_name: 'Area of Triangle', topic: 'Perimeter and Area', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/perimeter-area/triangle' },
                    { skill_id: 'local-pa-circles', skill_name: 'Circles', topic: 'Perimeter and Area', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/perimeter-area/circles' },
                    { skill_id: 'local-pa-test', skill_name: 'Chapter Test', topic: 'Perimeter and Area', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/perimeter-area/chapter-test' },
                    { skill_id: 'local-sym-line', skill_name: 'Line Symmetry', topic: 'Symmetry', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/symmetry/line-symmetry' },
                    { skill_id: 'local-sym-poly', skill_name: 'Regular Polygons', topic: 'Symmetry', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/symmetry/regular-polygons' },
                    { skill_id: 'local-sym-mirror', skill_name: 'Mirror Reflection', topic: 'Symmetry', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/symmetry/mirror-reflection' },
                    { skill_id: 'local-sym-rot', skill_name: 'Rotational Symmetry', topic: 'Symmetry', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/symmetry/rotational' },
                    { skill_id: 'local-sym-rel', skill_name: 'Line & Rotational Relationship', topic: 'Symmetry', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/symmetry/relationship' },
                    { skill_id: 'local-sym-test', skill_name: 'Chapter Test', topic: 'Symmetry', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/symmetry/chapter-test' },
                    { skill_id: '1094', skill_name: 'Formation of Algebraic Expressions', topic: 'Algebraic Expressions', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/algebraic-expressions/formation' },
                    { skill_id: '1095', skill_name: 'Terms and Factors', topic: 'Algebraic Expressions', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/algebraic-expressions/terms-factors' },
                    { skill_id: '1096', skill_name: 'Coefficients', topic: 'Algebraic Expressions', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/algebraic-expressions/coefficients' },
                    { skill_id: '1097', skill_name: 'Like and Unlike Terms', topic: 'Algebraic Expressions', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/algebraic-expressions/like-unlike' },
                    { skill_id: '1098', skill_name: 'Types of Expressions', topic: 'Algebraic Expressions', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/algebraic-expressions/polynomials' },
                    { skill_id: '1099', skill_name: 'Finding the Value of an Expression', topic: 'Algebraic Expressions', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/algebraic-expressions/finding-value' },
                    { skill_id: '1100', skill_name: 'Chapter Test', topic: 'Algebraic Expressions', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/algebraic-expressions/chapter-test' },
                    { skill_id: 'local-data-handling-chapter', skill_name: 'Data Handling: Interactive Chapter', topic: 'Data Handling', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/data-handling' },
                    { skill_id: 'local-triangles-chapter', skill_name: 'The Triangle and its Properties: Interactive Chapter', topic: 'The Triangle and its Properties', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/the-triangle-and-its-properties' },
                    { skill_id: 'local-simple-equations-chapter', skill_name: 'Simple Equations: Interactive Chapter', topic: 'Simple Equations', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/simple-equations' },
                    { skill_id: 'local-lines-angles-chapter', skill_name: 'Lines and Angles: Interactive Chapter', topic: 'Lines and Angles', sub_topic: 'Main', isLocal: true, path: '/middle/grade/7/lines-and-angles' }
                ];

                setSkills(fetched);
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const skillsByTopic = skills.reduce((acc, skill) => {
        const topicName = (skill.topic || 'General').toLowerCase();

        if (topicName !== "integers" && topicName !== "comparing quantities" && topicName !== "exponents and powers" && topicName !== "rational numbers" && topicName !== "visualising solid shapes" && topicName !== "symmetry" && topicName !== "algebraic expressions" && topicName !== "perimeter and area" && topicName !== "fractions and decimals" && topicName !== "data handling" && topicName !== "the triangle and its properties" && topicName !== "simple equations" && topicName !== "lines and angles") return acc;
        if ((topicName === "integers" || topicName === "exponents and powers" || topicName === "rational numbers" || topicName === "visualising solid shapes" || topicName === "symmetry" || topicName === "perimeter and area" || topicName === "algebraic expressions" || topicName === "fractions and decimals" || topicName === "data handling" || topicName === "the triangle and its properties" || topicName === "simple equations" || topicName === "lines and angles") && !skill.isLocal) return acc;

        const topic = skill.topic || 'General';
        const subTopic = skill.sub_topic || 'Main';

        if (!acc[topic]) acc[topic] = {};
        if (!acc[topic][subTopic]) acc[topic][subTopic] = [];
        acc[topic][subTopic].push(skill);
        return acc;
    }, {});

    if (loading) return <div className="middle-loading">Loading syllabus...</div>;

    if (!skills || skills.length === 0) return (
        <div className="middle-syllabus-page">
            <header className="middle-header">
                <h1>Class 7 Maths</h1>
                <p>No active content found for this grade.</p>
                <Link to="/" style={{ display: 'inline-block', marginTop: '30px', color: '#4F46E5', fontWeight: '600', textDecoration: 'none' }}>← Back Home</Link>
            </header>
        </div>
    );

    return (
        <div className="middle-syllabus-page">
            <SEO title="Class 7 Maths - skill100" description="Complete syllabus for Class 7" />

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
                        <div className="grade-badge">GRADE 7</div>
                        <h1>Mathematics</h1>
                        <p>Master advanced concepts with interactive problem solving.</p>
                    </div>
                </header>

                <div className="middle-masonry-grid">
                    {Object.entries(skillsByTopic).map(([topic, subTopics], index) => {
                        const accentColor = getAccentColor(index);
                        const subTopicOrder = ["Pattern Recognition", "Number properties", "Logical Reasoning", "Multiplication", "Division", "Decimals", "Area", "Perimeter", "Area-Perimeter Relationship", "Volume Measurement", "Mass Measurement", "Measurement Based Reasoning", "Skill Application Problems", "Chapter Test"];
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
                                        const isDirectButton = subTopic === 'Skill Application Problems' || subTopic === 'Area-Perimeter Relationship';

                                        return (
                                            <div key={subTopic} className={`subtopic-group ${isExpanded ? 'is-expanded' : ''} ${isMain ? 'is-main' : ''} ${isDirectButton ? 'is-direct' : ''}`}>
                                                {!isMain && (
                                                    <button
                                                        className="subtopic-toggle-btn"
                                                        onClick={() => {
                                                            if (isDirectButton) {
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

export default Class7Syllabus;
