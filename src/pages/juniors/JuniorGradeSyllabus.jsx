import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, Star, ChevronRight, Sparkles } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Navbar from '../../components/Navbar';
import { LatexText } from '../../components/LatexText';
import { api } from '../../services/api';
import { capitalizeFirstLetter } from '../../lib/stringUtils';
import { TOPIC_CONFIGS } from '../../lib/topicConfig';
import './JuniorGradeSyllabus.css';

// Topic icons with pastel colors for children
const topicIcons = {
    'Numbers': { emoji: '🔢', color: '#FFE66D', gradient: 'linear-gradient(135deg, #FFE66D 0%, #FFF4A3 100%)' },
    'Addition': { emoji: '➕', color: '#98D8C8', gradient: 'linear-gradient(135deg, #98D8C8 0%, #B8E6D5 100%)' },
    'Subtraction': { emoji: '➖', color: '#FFB6B9', gradient: 'linear-gradient(135deg, #FFB6B9 0%, #FFC8CB 100%)' },
    'Multiplication': { emoji: '✖️', color: '#87CEEB', gradient: 'linear-gradient(135deg, #87CEEB 0%, #B8D8F5 100%)' },
    'Division': { emoji: '➗', color: '#C9A9E9', gradient: 'linear-gradient(135deg, #C9A9E9 0%, #E0CFFA 100%)' },
    'Shapes': { emoji: '🔷', color: '#FFDAB9', gradient: 'linear-gradient(135deg, #FFDAB9 0%, #FFE5CC 100%)' },
    'Patterns': { emoji: '🎨', color: '#FFB6B9', gradient: 'linear-gradient(135deg, #FFB6B9 0%, #FFC8CB 100%)' },
    'Counting': { emoji: '🔟', color: '#98D8C8', gradient: 'linear-gradient(135deg, #98D8C8 0%, #B8E6D5 100%)' },
    'Fractions': { emoji: '🍕', color: '#FFE66D', gradient: 'linear-gradient(135deg, #FFE66D 0%, #FFF4A3 100%)' },
    'Measurement': { emoji: '📏', color: '#87CEEB', gradient: 'linear-gradient(135deg, #87CEEB 0%, #B8D8F5 100%)' },
    'Time': { emoji: '⏰', color: '#C9A9E9', gradient: 'linear-gradient(135deg, #C9A9E9 0%, #E0CFFA 100%)' },
    'Money': { emoji: '💰', color: '#98D8C8', gradient: 'linear-gradient(135deg, #98D8C8 0%, #B8E6D5 100%)' },
    'Geometry': { emoji: '📐', color: '#FFDAB9', gradient: 'linear-gradient(135deg, #FFDAB9 0%, #FFE5CC 100%)' },
    'Data': { emoji: '📊', color: '#FFB6B9', gradient: 'linear-gradient(135deg, #FFB6B9 0%, #FFC8CB 100%)' },
    'default': { emoji: '⭐', color: '#FFE66D', gradient: 'linear-gradient(135deg, #FFE66D 0%, #FFF4A3 100%)' }
};

const getTopicStyle = (topicName) => {
    for (const [key, value] of Object.entries(topicIcons)) {
        if (topicName.toLowerCase().includes(key.toLowerCase())) {
            return value;
        }
    }
    return topicIcons.default;
};

const JuniorGradeSyllabus = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredTopic, setHoveredTopic] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoading(true);
                const gradeNumStr = String(grade).replace(/\D/g, ''); // Extract only digits
                const isGrade1 = gradeNumStr === '1';
                const isGrade3 = gradeNumStr === '3';
                const isGrade4 = gradeNumStr === '4';

                let skillsResponse = [];

                // Fetch skills if not a strictly manual grade
                if (!isGrade1 && !isGrade3) {
                    skillsResponse = await api.getSkills(gradeNumStr);
                }

                let filteredSkills = (skillsResponse || []).filter(skill => {
                    const topicName = (skill.topic || 'General').toLowerCase();

                    if (isGrade3) {
                        return topicName.includes("raksha") && topicName.includes("bandhan");
                    }
                    if (isGrade4) {
                        return topicName === "the cleanest village";
                    }
                    if (isGrade1) {
                        return false; // Strictly hide all API topics for Grade 1
                    }
                    return true;
                });

                // Manually inject Grade 1 and Grade 3 topics
                if (isGrade1 || isGrade3) {
                    const gradeConfigs = TOPIC_CONFIGS[gradeNumStr] || {};
                    Object.entries(gradeConfigs).forEach(([topicName, skills]) => {
                        skills.forEach(skill => {
                            // Only add if not already in the list to avoid duplicates
                            if (!filteredSkills.some(fs => fs.skill_id === skill.id)) {
                                filteredSkills.push({
                                    skill_id: skill.id,
                                    skill_name: skill.name,
                                    topic: topicName
                                });
                            }
                        });
                    });
                }

                const topicMap = {};
                filteredSkills.forEach(skill => {
                    const topicName = skill.topic || 'General';
                    if (!topicMap[topicName]) {
                        topicMap[topicName] = {
                            name: topicName,
                            skills: [],
                            skillCount: 0
                        };
                    }

                    if (skill.skill_name && !topicMap[topicName].skills.find(s => s.id === skill.skill_id)) {
                        topicMap[topicName].skills.push({
                            id: skill.skill_id,
                            name: skill.skill_name
                        });
                        topicMap[topicName].skillCount += 1;
                    }
                });

                setTopics(Object.values(topicMap));
            } catch (error) {
                console.error('Error fetching topics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, [grade]);

    const gradeLabels = {
        '1': 'Grade 1',
        '2': 'Grade 2',
        '3': 'Grade 3',
        '4': 'Grade 4'
    };

    return (
        <div className="junior-page">
            <SEO title={`${gradeLabels[grade]} - Math Adventures`} description={`Fun math topics for ${gradeLabels[grade]}`} />
            <Navbar />

            {/* Floating decorations */}
            <div className="junior-decorations">
                <div className="floating-cloud cloud-1"></div>
                <div className="floating-cloud cloud-2"></div>
                <div className="floating-cloud cloud-3"></div>
            </div>

            <div className="junior-container">
                {/* Back Button */}
                <button className="back-btn" onClick={() => navigate('/')}>
                    <Home className="back-icon" />
                    <span>Back Home</span>
                </button>

                {/* Header */}
                <div className="junior-header">
                    <h1>Choose Your Adventure! 🚀</h1>
                    <div className="grade-badge-large">
                        <Sparkles className="sparkle-icon" />
                        <span>{gradeLabels[grade]} Math</span>
                    </div>
                    <p>Pick a skill to start learning and having fun!</p>
                </div>

                {/* Topics Grid */}
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading fun skills...</p>
                    </div>
                ) : (
                    <div className="topics-grid">
                        {topics.map((topic, index) => {
                            const style = getTopicStyle(topic.name);
                            return (
                                <div
                                    key={topic.name}
                                    className={`topic-card-junior ${hoveredTopic === topic.name ? 'hovered' : ''}`}
                                    style={{
                                        '--card-color': style.color,
                                        '--card-gradient': style.gradient,
                                        '--animation-delay': `${index * 0.1}s`
                                    }}
                                    onMouseEnter={() => setHoveredTopic(topic.name)}
                                    onMouseLeave={() => setHoveredTopic(null)}
                                    onClick={() => navigate(`/junior/grade/${grade}/topic/${encodeURIComponent(topic.name)}`)}
                                >
                                    {/* Background glow */}
                                    <div className="card-glow"></div>

                                    {/* Icon */}
                                    <div className="topic-icon-bubble">
                                        <span className="topic-emoji">{style.emoji}</span>
                                    </div>

                                    {/* Topic Name */}
                                    <h2 className="topic-name">
                                        <LatexText text={capitalizeFirstLetter(topic.name)} />
                                    </h2>

                                    {/* Progress Bar */}


                                    {/* Star Rating */}


                                    {/* Skills count */}
                                    <div className="skills-count">
                                        {topic.skills.length} Skills
                                    </div>

                                    {/* Hover CTA */}
                                    {hoveredTopic === topic.name && (
                                        <div className="hover-cta" style={{ background: style.gradient }}>
                                            Let's Go! <ChevronRight className="cta-arrow" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JuniorGradeSyllabus;
