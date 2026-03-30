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
    const [activeSubject, setActiveSubject] = useState('mathematics');

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
                if (skill.skill_name === "Pictographs") {
                    navigate(`/middle/grade/6/data-handling/pictographs`);
                    return;
                } else if (skill.skill_name === "Bar Graphs") {
                    navigate(`/middle/grade/6/data-handling/bar-graphs`);
                    return;
                } else if (skill.skill_name === "Drawing a Bar Graph") {
                    navigate(`/middle/grade/6/data-handling/drawing-a-bar-graph`);
                    return;
                } else if (skill.skill_name === "Figure It Out") {
                    navigate(`/middle/grade/6/data-handling/figure-it-out`);
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
                const gradeNum = grade.replace('grade', '');
                let fetched = [];

                if (activeSubject === 'science') {
                    if (gradeNum === '7') {
                        fetched = [
                            {
                                skill_id: 'local-wws-chapter',
                                skill_name: 'The Ever-Evolving World of Science',
                                topic: 'The Ever-Evolving World of Science',
                                sub_topic: 'Main',
                                isLocal: true,
                                path: '/middle/grade/7/science/wonderful-world-science'
                            }
                        ];
                    } else if (gradeNum === '6') {
                        fetched = [
                            {
                                skill_id: 'wws-chapter-local',
                                skill_name: 'The Wonderful World of Science',
                                topic: 'Science',
                                sub_topic: 'Main',
                                isLocal: true,
                                path: '/middle/grade/6/science/wonderful-world-of-science'
                            }
                        ];
                    } else if (gradeNum === '5') {
                        fetched = [
                            {
                                skill_id: 'wel-chapter-local',
                                skill_name: 'Water — The Essence of Life',
                                topic: 'Science',
                                sub_topic: 'Main',
                                isLocal: true,
                                path: '/middle/grade/5/science/water-essence-of-life'
                            }
                        ];
                    }
                } else {
                    const response = await api.getSkills(gradeNum);
                    fetched = response || [];

                if (gradeNum === '6') {
                    fetched = [
                        {
                            skill_id: 'local-patterns-in-mathematics',
                            skill_name: 'Patterns in Mathematics: Interactive Chapter',
                            topic: 'Patterns',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/6/patterns-in-mathematics'
                        },
                        {
                            skill_id: 'local-lines-and-angles',
                            skill_name: 'Lines and Angles: Interactive Chapter',
                            topic: 'Lines and Angles',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/6/lines-and-angles'
                        },
                        {
                            skill_id: 'local-number-play-chapter',
                            skill_name: 'Number Play: Interactive Chapter',
                            topic: 'Number Play',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/6/number-play-chapter'
                        },
                        {
                            skill_id: 'local-data-handling-6-chapter',
                            skill_name: 'Data Handling and Presentation: Interactive Chapter',
                            topic: 'Data Handling',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/6/data-handling-6'
                        }
                    ];
                }

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
                            skill_id: 'local-integers-chapter',
                            skill_name: 'Integers: Interactive Chapter',
                            topic: 'Integers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/integers'
                        },
                        {
                            skill_id: 'local-fractions-decimals-chapter',
                            skill_name: 'Fractions and Decimals: Interactive Chapter',
                            topic: 'Fractions and Decimals',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/fractions-and-decimals'
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
                        },
                        {
                            skill_id: 'local-rn-need',
                            skill_name: 'Need For Rational Numbers',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/need'
                        },
                        {
                            skill_id: 'local-rn-what',
                            skill_name: 'What Are Rational Numbers',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/what'
                        },
                        {
                            skill_id: 'local-rn-posneg',
                            skill_name: 'Positive and Negative Rational Numbers',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/positive-negative'
                        },
                        {
                            skill_id: 'local-rn-line',
                            skill_name: 'Rational Numbers on Number Line',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/number-line'
                        },
                        {
                            skill_id: 'local-rn-standard',
                            skill_name: 'Rational Numbers Validity/Standard Form',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/standard-form'
                        },
                        {
                            skill_id: 'local-rn-compare',
                            skill_name: 'Comparison of Rational Numbers',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/comparison'
                        },
                        {
                            skill_id: 'local-rn-between',
                            skill_name: 'Rational Numbers Between Two Rational Numbers',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/between'
                        },
                        {
                            skill_id: 'local-rn-ops',
                            skill_name: 'Operations on Rational Numbers',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/operations'
                        },
                        {
                            skill_id: 'local-rn-test',
                            skill_name: 'Chapter Test',
                            topic: 'Rational Numbers',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/rational-numbers/chapter-test'
                        },
                        {
                            skill_id: 'local-plane-solid',
                            skill_name: 'Plane Figures and Solid Shapes',
                            topic: 'Visualising Solid Shapes',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/visualising-solid-shapes/plane-figures-solid-shapes'
                        },
                        {
                            skill_id: 'local-fev',
                            skill_name: 'Faces, Edges and Vertices',
                            topic: 'Visualising Solid Shapes',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/visualising-solid-shapes/faces-edges-vertices'
                        },
                        {
                            skill_id: 'local-nets',
                            skill_name: 'Nets for Building 3-D Shapes',
                            topic: 'Visualising Solid Shapes',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/visualising-solid-shapes/nets'
                        },
                        {
                            skill_id: 'local-drawing',
                            skill_name: 'Drawing Solids on a Flat Surface',
                            topic: 'Visualising Solid Shapes',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/visualising-solid-shapes/drawing-solids'
                        },
                        {
                            skill_id: 'local-sections',
                            skill_name: 'Viewing Different Sections of a Solid',
                            topic: 'Visualising Solid Shapes',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/visualising-solid-shapes/viewing-sections'
                        },
                        {
                            skill_id: 'local-vss-test',
                            skill_name: 'Chapter Test',
                            topic: 'Visualising Solid Shapes',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/visualising-solid-shapes/chapter-test'
                        },
                        {
                            skill_id: 'local-pa-parallel',
                            skill_name: 'Area of Parallelogram',
                            topic: 'Perimeter and Area',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/perimeter-area/parallelogram'
                        },
                        {
                            skill_id: 'local-pa-triangle',
                            skill_name: 'Area of Triangle',
                            topic: 'Perimeter and Area',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/perimeter-area/triangle'
                        },
                        {
                            skill_id: 'local-pa-circles',
                            skill_name: 'Circles',
                            topic: 'Perimeter and Area',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/perimeter-area/circles'
                        },
                        {
                            skill_id: 'local-pa-test',
                            skill_name: 'Chapter Test',
                            topic: 'Perimeter and Area',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/perimeter-area/chapter-test'
                        },
                        {
                            skill_id: 'local-sym-line',
                            skill_name: 'Line Symmetry',
                            topic: 'Symmetry',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/symmetry/line-symmetry'
                        },
                        {
                            skill_id: 'local-sym-poly',
                            skill_name: 'Regular Polygons',
                            topic: 'Symmetry',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/symmetry/regular-polygons'
                        },
                        {
                            skill_id: 'local-sym-mirror',
                            skill_name: 'Mirror Reflection',
                            topic: 'Symmetry',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/symmetry/mirror-reflection'
                        },
                        {
                            skill_id: 'local-sym-rot',
                            skill_name: 'Rotational Symmetry',
                            topic: 'Symmetry',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/symmetry/rotational'
                        },
                        {
                            skill_id: 'local-sym-rel',
                            skill_name: 'Line & Rotational Relationship',
                            topic: 'Symmetry',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/symmetry/relationship'
                        },
                        {
                            skill_id: 'local-sym-test',
                            skill_name: 'Chapter Test',
                            topic: 'Symmetry',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/symmetry/chapter-test'
                        },
                        {
                            skill_id: '1094',
                            skill_name: 'Formation of Algebraic Expressions',
                            topic: 'Algebraic Expressions',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/algebraic-expressions/formation'
                        },
                        {
                            skill_id: '1095',
                            skill_name: 'Terms and Factors',
                            topic: 'Algebraic Expressions',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/algebraic-expressions/terms-factors'
                        },
                        {
                            skill_id: '1096',
                            skill_name: 'Coefficients',
                            topic: 'Algebraic Expressions',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/algebraic-expressions/coefficients'
                        },
                        {
                            skill_id: '1097',
                            skill_name: 'Like and Unlike Terms',
                            topic: 'Algebraic Expressions',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/algebraic-expressions/like-unlike'
                        },
                        {
                            skill_id: '1098',
                            skill_name: 'Types of Expressions',
                            topic: 'Algebraic Expressions',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/algebraic-expressions/polynomials'
                        },
                        {
                            skill_id: '1099',
                            skill_name: 'Finding the Value of an Expression',
                            topic: 'Algebraic Expressions',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/algebraic-expressions/finding-value'
                        },
                        {
                            skill_id: '1100',
                            skill_name: 'Chapter Test',
                            topic: 'Algebraic Expressions',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/algebraic-expressions/chapter-test'
                        },
                        {
                            skill_id: 'local-data-handling-chapter',
                            skill_name: 'Data Handling: Interactive Chapter',
                            topic: 'Data Handling',
                            sub_topic: 'Main',
                            isLocal: true,
                            path: '/middle/grade/7/data-handling'
                        }
                    ];
                }
                }
                setSkills(fetched);
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [grade, activeSubject]);

    // Group skills by topic and sub-topic
    const skillsByTopic = skills.reduce((acc, skill) => {
        const topicName = (skill.topic || 'General').toLowerCase();
        const gradeNum = parseInt(grade.replace('grade', ''));

        // Filter by grade
        if (activeSubject === 'science') return acc; // Handle science separately

        if (gradeNum === 5) return acc; // Hide all default skills for Grade 5 (handled by overrides)
        if (activeSubject === 'mathematics') {
            if (gradeNum === 6 && !["perimeter and area", "pattern", "number play", "data handling", "symmetry", "lines and angles"].some(t => topicName.includes(t.toLowerCase()))) return acc;
            if (gradeNum === 7 && topicName !== "integers" && topicName !== "comparing quantities" && topicName !== "exponents and powers" && topicName !== "rational numbers" && topicName !== "visualising solid shapes" && topicName !== "symmetry" && topicName !== "algebraic expressions" && topicName !== "perimeter and area" && topicName !== "fractions and decimals" && topicName !== "data handling") return acc;
            if (gradeNum === 7 && (topicName === "integers" || topicName === "exponents and powers" || topicName === "rational numbers" || topicName === "visualising solid shapes" || topicName === "symmetry" || topicName === "perimeter and area" || topicName === "algebraic expressions" || topicName === "fractions and decimals" || topicName === "data handling") && !skill.isLocal) return acc;
        }



        const topic = skill.topic || 'General';
        const subTopic = skill.sub_topic || 'Main';

        if (!acc[topic]) acc[topic] = {};
        if (!acc[topic][subTopic]) acc[topic][subTopic] = [];
        acc[topic][subTopic].push(skill);
        return acc;
    }, {});

    const gradeInt = parseInt(grade.replace('grade', ''));


    // Manual Override for Grade 5 Tenths and Hundredths
    if (gradeInt === 5) {
        skillsByTopic['The Fish Tale'] = {
            'Learn': [
                { skill_id: 'FT-5W1H', skill_name: '5W1H Introduction', topic: 'The Fish Tale', sub_topic: 'Learn', isLocal: true, path: '/the-fish-tale/introduction' },
                { skill_id: 'FT-TERM', skill_name: 'Terminology', topic: 'The Fish Tale', sub_topic: 'Learn', isLocal: true, path: '/the-fish-tale/terminology' },
                { skill_id: 'FT-SKILLS', skill_name: 'Skills Practice & Assessment', topic: 'The Fish Tale', sub_topic: 'Learn', isLocal: true, path: '/the-fish-tale/skills' }
            ],
            'Chapter Test': [
                { skill_id: 'FT-TEST', skill_name: 'Chapter Test', topic: 'The Fish Tale', sub_topic: 'Chapter Test', isLocal: true, path: '/middle/grade/5/the-fish-tale/chapter-test' }
            ]
        };

        skillsByTopic['Area and its Boundary'] = {
            'Area': [
                { skill_id: '1159', skill_name: 'Finding Area', topic: 'Area and its Boundary', sub_topic: 'Area', isLocal: true, path: '/middle/grade/5/area-boundary/area/finding-area' },
                { skill_id: '1160', skill_name: 'Compare and Create Shapes with the Same Area', topic: 'Area and its Boundary', sub_topic: 'Area', isLocal: true, path: '/middle/grade/5/area-boundary/area/compare-shapes' },
                { skill_id: '1161', skill_name: 'Area in Real-Life Situations', topic: 'Area and its Boundary', sub_topic: 'Area', isLocal: true, path: '/middle/grade/5/area-boundary/area/real-life' },
                { skill_id: '1162', skill_name: 'Choose and Interpret Appropriate Area Units', topic: 'Area and its Boundary', sub_topic: 'Area', isLocal: true, path: '/middle/grade/5/area-boundary/area/units' }
            ],
            'Perimeter': [
                { skill_id: '1163', skill_name: 'Finding Perimeter', topic: 'Area and its Boundary', sub_topic: 'Perimeter', isLocal: true, path: '/middle/grade/5/area-boundary/perimeter/finding-perimeter' },
                { skill_id: '1164', skill_name: 'Understand Perimeter as Boundary Length', topic: 'Area and its Boundary', sub_topic: 'Perimeter', isLocal: true, path: '/middle/grade/5/area-boundary/perimeter/boundary-length' },
                { skill_id: '1165', skill_name: 'Same Perimeter with Different Shapes', topic: 'Area and its Boundary', sub_topic: 'Perimeter', isLocal: true, path: '/middle/grade/5/area-boundary/perimeter/different-shapes' },
                { skill_id: '1166', skill_name: 'Perimeter in Real-Life Contexts', topic: 'Area and its Boundary', sub_topic: 'Perimeter', isLocal: true, path: '/middle/grade/5/area-boundary/perimeter/real-life' }
            ],
            'Area-Perimeter Relationship': [
                { skill_id: '1167', skill_name: 'Area-Perimeter Relationship', topic: 'Area and its Boundary', sub_topic: 'Area-Perimeter Relationship', isLocal: true, path: '/middle/grade/5/area-boundary/relationship' }
            ],
            'Skill Application Problems': [
                { skill_id: '1168', skill_name: 'Skill Application Problems', topic: 'Area and its Boundary', sub_topic: 'Skill Application Problems', isLocal: true, path: '/middle/grade/5/area-boundary/skill-application' }
            ],
            'Chapter Test': [
                { skill_id: '1169', skill_name: 'Chapter Test', topic: 'Area and its Boundary', sub_topic: 'Chapter Test', isLocal: true, path: '/middle/grade/5/area-boundary/chapter-test' }
            ]
        };

        skillsByTopic['Shapes and Angles'] = {
            'Learn': [
                { skill_id: 'SA-5W1H', skill_name: '5W1H Introduction', topic: 'Shapes and Angles', sub_topic: 'Learn', isLocal: true, path: '/shapes-and-angles/introduction' },
                { skill_id: 'SA-TERM', skill_name: 'Terminology', topic: 'Shapes and Angles', sub_topic: 'Learn', isLocal: true, path: '/shapes-and-angles/terminology' },
                { skill_id: 'SA-SKILLS', skill_name: 'Skills Practice & Assessment', topic: 'Shapes and Angles', sub_topic: 'Learn', isLocal: true, path: '/shapes-and-angles/skills' }
            ],
            'Chapter Test': [
                { skill_id: 'SA-TEST', skill_name: 'Chapter Test', topic: 'Shapes and Angles', sub_topic: 'Chapter Test', isLocal: true, path: '/middle/grade/5/shapes-angles/chapter-test' }
            ]
        };

        skillsByTopic['Parts and Wholes'] = {
            'Learn': [
                { skill_id: 'PW-5W1H', skill_name: '5W1H Introduction', topic: 'Parts and Wholes', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/parts-and-wholes/introduction' },
                { skill_id: 'PW-TERM', skill_name: 'Terminology', topic: 'Parts and Wholes', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/parts-and-wholes/terminology' },
                { skill_id: 'PW-SKILLS', skill_name: 'Skills Practice & Assessment', topic: 'Parts and Wholes', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/parts-and-wholes/skills' }
            ],
            'Chapter Test': [
                { skill_id: 'PW-TEST', skill_name: 'Chapter Test', topic: 'Parts and Wholes', sub_topic: 'Chapter Test', isLocal: true, path: '/middle/grade/5/parts-and-wholes/chapter-test' }
            ]
        };

        skillsByTopic['How Many Squares?'] = {
            'Learn': [
                { skill_id: 'HMS-5W1H', skill_name: '5W1H Introduction', topic: 'How Many Squares?', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/how-many-squares/introduction' },
                { skill_id: 'HMS-TERM', skill_name: 'Terminology', topic: 'How Many Squares?', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/how-many-squares/terminology' },
                { skill_id: 'HMS-SKILLS', skill_name: 'Skills Practice & Assessment', topic: 'How Many Squares?', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/how-many-squares/skills' }
            ],
            'Chapter Test': [
                { skill_id: 'HMS-TEST', skill_name: 'Chapter Test', topic: 'How Many Squares?', sub_topic: 'Chapter Test', isLocal: true, path: '/middle/grade/5/how-many-squares/chapter-test' }
            ]
        };

        skillsByTopic['Does it Look the Same?'] = {
            'Learn': [
                { skill_id: 'DILS-5W1H', skill_name: '5W1H Introduction', topic: 'Does it Look the Same?', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/does-it-look-same/introduction' },
                { skill_id: 'DILS-TERM', skill_name: 'Terminology', topic: 'Does it Look the Same?', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/does-it-look-same/terminology' },
                { skill_id: 'DILS-SKILLS', skill_name: 'Skills Practice & Assessment', topic: 'Does it Look the Same?', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/does-it-look-same/skills' }
            ],
            'Chapter Test': [
                { skill_id: 'DILS-TEST', skill_name: 'Chapter Test', topic: 'Does it Look the Same?', sub_topic: 'Chapter Test', isLocal: true, path: '/middle/grade/5/does-it-look-same/chapter-test' }
            ]
        };

        skillsByTopic['Be My Multiple, I’ll be Your Factor'] = {
            'Learn': [
                { skill_id: 'BMF-5W1H', skill_name: '5W1H Introduction', topic: 'Be My Multiple, I’ll be Your Factor', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/be-my-multiple/introduction' },
                { skill_id: 'BMF-TERM', skill_name: 'Terminology', topic: 'Be My Multiple, I’ll be Your Factor', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/be-my-multiple/terminology' },
                { skill_id: 'BMF-SKILLS', skill_name: 'Skills Practice & Assessment', topic: 'Be My Multiple, I’ll be Your Factor', sub_topic: 'Learn', isLocal: true, path: '/middle/grade/5/be-my-multiple/skills' }
            ],
            'Chapter Test': [
                { skill_id: 'BMF-TEST', skill_name: 'Chapter Test', topic: 'Be My Multiple, I’ll be Your Factor', sub_topic: 'Chapter Test', isLocal: true, path: '/middle/grade/5/be-my-multiple/test' }
            ]
        };

        skillsByTopic['Tenths and Hundredths'] = {
            'Decimals': [
                {
                    skill_id: '1054',
                    skill_name: 'Place Values of Decimals',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Decimals',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/place-values'
                },
                {
                    skill_id: '1055',
                    skill_name: 'Fraction to Decimal Conversion',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Decimals',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/fraction-to-decimal'
                },
                {
                    skill_id: '1056',
                    skill_name: 'Decimal Visual Representation',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Decimals',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/visual-representation'
                },
                {
                    skill_id: '1057',
                    skill_name: 'Decimal in Measurement',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Decimals',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/measurement'
                },
                {
                    skill_id: '1058',
                    skill_name: 'Decimal in Money',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Decimals',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/money'
                },
                {
                    skill_id: '1059',
                    skill_name: 'Comparing Decimals',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Decimals',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/comparing'
                },
                {
                    skill_id: '1060',
                    skill_name: 'Decimal Operations',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Decimals',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/operations'
                },
                {
                    skill_id: '1061',
                    skill_name: 'Conversion Between Forms',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Decimals',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/conversion'
                }
            ],
            'Skill Application Problems': [
                {
                    skill_id: '1142',
                    skill_name: 'Decimal Word Problems',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Skill Application Problems',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/word-problems'
                }
            ],
            'Chapter Test': [
                {
                    skill_id: '1062',
                    skill_name: 'Chapter Test',
                    topic: 'Tenths and Hundredths',
                    sub_topic: 'Chapter Test',
                    isLocal: true,
                    path: '/middle/grade/5/tenths-hundredths/chapter-test'
                }
            ]
        };

        skillsByTopic['Ways to Multiply and Divide'] = {
            'Multiplication': [
                {
                    skill_id: '9003',
                    skill_name: 'Multiplication of 2-digit numbers',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Multiplication',
                    isLocal: true,
                    path: '/middle/practice/9003'
                },
                {
                    skill_id: '9004',
                    skill_name: 'Multiplication of 3-digit numbers',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Multiplication',
                    isLocal: true,
                    path: '/middle/practice/9004'
                },
                {
                    skill_id: '9005',
                    skill_name: 'Multiplication of multiple numbers',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Multiplication',
                    isLocal: true,
                    path: '/middle/practice/9005'
                },
                {
                    skill_id: '9006',
                    skill_name: 'Multiplication of numbers ending in zeros',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Multiplication',
                    isLocal: true,
                    path: '/middle/practice/9006'
                },
                {
                    skill_id: '9007',
                    skill_name: 'Word Problems',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Multiplication',
                    isLocal: true,
                    path: '/middle/practice/9007'
                }
            ],
            'Division': [
                {
                    skill_id: '9008',
                    skill_name: 'Divide by 1-digit number',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Division',
                    isLocal: true,
                    path: '/middle/practice/9008'
                },
                {
                    skill_id: '9009',
                    skill_name: 'Divide by 2-digit number',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Division',
                    isLocal: true,
                    path: '/middle/practice/9009'
                },
                {
                    skill_id: '9010',
                    skill_name: 'Division of numbers ending in zeros',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Division',
                    isLocal: true,
                    path: '/middle/practice/9010'
                },
                {
                    skill_id: '9011',
                    skill_name: 'Word Problems',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Division',
                    isLocal: true,
                    path: '/middle/practice/9011'
                }
            ],
            'Skill Application Problems': [
                {
                    skill_id: '9012',
                    skill_name: 'Mixed Problems',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Skill Application Problems',
                    isLocal: true,
                    path: '/middle/practice/9012'
                }
            ],
            'Chapter Test': [
                {
                    skill_id: '9013',
                    skill_name: 'Chapter Test',
                    topic: 'Ways to Multiply and Divide',
                    sub_topic: 'Chapter Test',
                    isLocal: true,
                    path: '/middle/grade/5/multiply-divide/chapter-test'
                }
            ]
        };

        skillsByTopic['How Big? How Heavy?'] = {
            'Volume Measurement': [
                {
                    skill_id: '1212',
                    skill_name: 'Volume by Displacement',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Volume Measurement',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/volume-by-displacement'
                },
                {
                    skill_id: '1213',
                    skill_name: 'Units of Volume',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Volume Measurement',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/units-of-volume'
                },
                {
                    skill_id: '1214',
                    skill_name: 'Volume Estimation',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Volume Measurement',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/volume-estimation'
                },
                {
                    skill_id: '1215',
                    skill_name: 'Volume using unit cubes',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Volume Measurement',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/volume-unit-cubes'
                }
            ],
            'Mass Measurement': [
                {
                    skill_id: '1216',
                    skill_name: 'Units of Mass',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Mass Measurement',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/units-of-mass'
                },
                {
                    skill_id: '1217',
                    skill_name: 'Mass Conversion',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Mass Measurement',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/mass-conversion'
                },
                {
                    skill_id: '1218',
                    skill_name: 'Mass Calculation',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Mass Measurement',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/mass-calculation'
                },
                {
                    skill_id: '1219',
                    skill_name: 'Weight Estimation and Comparison',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Mass Measurement',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/weight-estimation'
                }
            ],
            'Measurement Based Reasoning': [
                {
                    skill_id: '1220',
                    skill_name: '3D shape Construction',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Measurement Based Reasoning',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/3d-construction'
                },
                {
                    skill_id: '1221',
                    skill_name: 'Packaging and Layering',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Measurement Based Reasoning',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/packaging-layering'
                },
                {
                    skill_id: '1222',
                    skill_name: 'Measurement in Real life',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Measurement Based Reasoning',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/measurement-real-life'
                }
            ],
            'Skill Application Problems': [
                {
                    skill_id: '1223',
                    skill_name: 'Skill Application Problem',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Skill Application Problems',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/skill-application'
                }
            ],
            'Chapter Test': [
                {
                    skill_id: '1224',
                    skill_name: 'Chapter Test',
                    topic: 'How Big? How Heavy?',
                    sub_topic: 'Chapter Test',
                    isLocal: true,
                    path: '/middle/grade/5/how-big-how-heavy/chapter-test'
                }
            ]
        };

        skillsByTopic['Can you see the Pattern ?'] = {
            'Pattern Recognition': [
                {
                    skill_id: '2001',
                    skill_name: 'Pattern Identification',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Pattern Recognition',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/pattern-identification'
                },
                {
                    skill_id: '2002',
                    skill_name: 'Rule-based Pattern Creation',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Pattern Recognition',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/rule-pattern-creation'
                },
                {
                    skill_id: '2003',
                    skill_name: 'Understanding Rotations',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Pattern Recognition',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/rotations'
                },
                {
                    skill_id: '2004',
                    skill_name: 'Grid Pattern Recognition',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Pattern Recognition',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/grid-patterns'
                }
            ],
            'Number properties': [
                {
                    skill_id: '2005',
                    skill_name: 'Properties of Operation',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Number properties',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/properties-of-operation'
                },
                {
                    skill_id: '2006',
                    skill_name: 'Digit Relationships',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Number properties',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/digit-relationships'
                },
                {
                    skill_id: '2007',
                    skill_name: 'Palindrome Recognition',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Number properties',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/palindromes'
                },
                {
                    skill_id: '2008',
                    skill_name: 'Structured Number Patterns',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Number properties',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/structured-patterns'
                }
            ],
            'Logical Reasoning': [
                {
                    skill_id: '2009',
                    skill_name: 'Rule Applications',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Logical Reasoning',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/rule-applications'
                },
                {
                    skill_id: '2010',
                    skill_name: 'Multi-step Operations',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Logical Reasoning',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/multi-step-operations'
                },
                {
                    skill_id: '2011',
                    skill_name: 'Missing Number Reasoning',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Logical Reasoning',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/missing-numbers'
                },
                {
                    skill_id: '2012',
                    skill_name: 'Mental Calculation Reasoning',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Logical Reasoning',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/mental-calculation'
                }
            ],
            'Skill Application Problems': [
                {
                    skill_id: '2013',
                    skill_name: 'Skill Application Problems',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Skill Application Problems',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/skill-application'
                }
            ],
            'Chapter Test': [
                {
                    skill_id: '2000',
                    skill_name: 'Chapter Test',
                    topic: 'Can you see the Pattern ?',
                    sub_topic: 'Chapter Test',
                    isLocal: true,
                    path: '/middle/grade/5/can-you-see-the-pattern/chapter-test'
                }
            ]
        };
    }



    // Manual Override for Grade 6 Science
    if (gradeInt === 6 && activeSubject === 'science') {
        skillsByTopic['Wonderful World of Science'] = {
            'Interactive Chapter': [
                {
                    skill_id: 'wws-chapter-local',
                    skill_name: 'The Wonderful World of Science',
                    topic: 'Science',
                    sub_topic: 'Interactive Chapter',
                    isLocal: true,
                    path: '/middle/grade/6/science/wonderful-world-of-science'
                }
            ]
        };
    }

    // Manual Override for Grade 5 Science
    if (gradeInt === 5 && activeSubject === 'science') {
        skillsByTopic['Water — The Essence of Life'] = {
            'Interactive Chapter': [
                {
                    skill_id: 'wel-chapter-local',
                    skill_name: 'Water — The Essence of Life',
                    topic: 'Science',
                    sub_topic: 'Interactive Chapter',
                    isLocal: true,
                    path: '/middle/grade/5/science/water-essence-of-life'
                }
            ]
        };
    }

    if (loading) return <div className="middle-loading">Loading syllabus...</div>;

    // Science grades use hardcoded chapter cards — never show empty-state for them
    const isScienceGrade = activeSubject === 'science' && (gradeInt === 5 || gradeInt === 6 || gradeInt === 7);

    if (!isScienceGrade && (!skills || skills.length === 0)) return (
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

                <header className={`middle-header-bold ${(gradeInt === 5 || gradeInt === 6 || gradeInt === 7) ? 'middle-header-with-toggle' : ''}`}>
                    <div className="header-decoration">
                        <div className="geo-shape shape-1"></div>
                        <div className="geo-shape shape-2"></div>
                        <div className="geo-shape shape-3"></div>
                    </div>

                    <div className="header-content">
                        <div className="grade-badge">GRADE {grade.replace('grade', '')}</div>
                        <h1>{activeSubject === 'mathematics' ? 'Mathematics' : 'Science'}</h1>
                        <p>{activeSubject === 'mathematics' ? 'Master advanced concepts with interactive problem solving.' : 'Explore the wonders of the natural world with interactive labs and experiments.'}</p>
                    </div>

                    {(gradeInt === 5 || gradeInt === 6 || gradeInt === 7) && (
                        <div className="middle-header-actions">
                            <div className="middle-subject-toggle-wrapper">
                                <button
                                    onClick={() => setActiveSubject('mathematics')}
                                    className={`middle-subject-toggle-btn ${activeSubject === 'mathematics' ? 'active' : 'inactive'}`}
                                >
                                    Mathematics
                                </button>
                                <button
                                    onClick={() => setActiveSubject('science')}
                                    className={`middle-subject-toggle-btn ${activeSubject === 'science' ? 'active' : 'inactive'}`}
                                >
                                    Science
                                </button>
                            </div>
                        </div>
                    )}
                </header>

                {(gradeInt === 6 || gradeInt === 5 || gradeInt === 7) && activeSubject === 'science' ? (
                    <div className="middle-masonry-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                        {gradeInt === 7 && (
                            <div
                                className="science-chapter-card-middle"
                                onClick={() => handleSkillClick({ isLocal: true, path: '/middle/grade/7/science/wonderful-world-science' })}
                            >
                                <div className="chapter-num">Chapter 1</div>
                                <div className="chapter-icon">🔬</div>
                                <h3>The Ever-Evolving World of Science</h3>
                                <p>Explore scientific thinking, materials & properties, reversible changes, and hands-on experiments.</p>
                                <div className="enter-link">Explore Chapter →</div>
                            </div>
                        )}
                        {gradeInt === 6 && (
                            <div
                                className="science-chapter-card-middle"
                                onClick={() => handleSkillClick({ isLocal: true, path: '/middle/grade/6/science/wonderful-world-of-science' })}
                            >
                                <div className="chapter-num">Chapter 1</div>
                                <div className="chapter-icon">🧪</div>
                                <h3>The Wonderful World of Science</h3>
                                <p>Explore what science is, the 5W1H of scientific thinking, and perform experiments in our virtual lab.</p>
                                <div className="enter-link">Explore Chapter →</div>
                            </div>
                        )}
                        {gradeInt === 5 && (
                            <div
                                className="science-chapter-card-middle"
                                onClick={() => handleSkillClick({ isLocal: true, path: '/middle/grade/5/science/water-essence-of-life' })}
                            >
                                <div className="chapter-num">Chapter 1</div>
                                <div className="chapter-icon">💧</div>
                                <h3>Water — The Essence of Life</h3>
                                <p>Discover where water comes from, the water cycle, aquatic ecosystems, and why conservation matters.</p>
                                <div className="enter-link">Explore Chapter →</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="middle-masonry-grid">
                        {Object.entries(skillsByTopic).map(([topic, subTopics], index) => {
                        const accentColor = getAccentColor(index);

                        // Define fixed order for sub-topics
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
                )}
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
