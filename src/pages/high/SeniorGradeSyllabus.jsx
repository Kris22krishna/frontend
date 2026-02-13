import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';

import SEO from '../../components/common/SEO';
import { BookOpen, ChevronRight, Hash, Activity, X, Grid, Layout } from 'lucide-react';
import { LatexText } from '../../components/LatexText';
import './SeniorGradeSyllabus.css';

const SeniorGradeSyllabus = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    // Grid + Modal Logic
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Fetch Skills
    useEffect(() => {
        const fetchSkills = async () => {
            setLoading(true);
            try {
                const response = await api.getSkills(grade);
                setSkills(response || []);
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };

        if (grade) {
            fetchSkills();
        }
    }, [grade]);

    // Group skills by topic
    const skillsByTopic = (skills || []).reduce((acc, skill) => {
        const topicName = (skill.topic || 'General').toLowerCase();
        const gradeNum = parseInt(grade.replace('grade', ''));

        // Filter by grade
        if (gradeNum === 8 && topicName !== "exponents and power") return acc;

        const topic = skill.topic || 'General';
        if (!acc[topic]) acc[topic] = [];
        acc[topic].push(skill);
        return acc;
    }, {});

    const topics = Object.keys(skillsByTopic);

    // Handle Closing Modal on Escape Key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedTopic(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    if (loading) {
        return (
            <div className="senior-loading">
                <div className="animate-pulse">Loading curriculum...</div>
            </div>
        );
    }

    if (!skills || skills.length === 0 || topics.length === 0) {
        return (
            <div className="senior-syllabus-page">
                <SEO title={`Grade ${grade} Mathematics`} description="Grade syllabus" />
                <div style={{ padding: '100px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📚</div>
                    <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>No Content Available</h2>
                    <p style={{ color: '#64748b' }}>We are currently updating the curriculum for Grade {grade}. Please check back later!</p>
                    <Link to="/" style={{ display: 'inline-block', marginTop: '30px', color: '#4F46E5', fontWeight: '600' }}>← Back Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="senior-syllabus-page">
            <SEO title={`Grade ${grade} Mathematics - Advanced Curriculum`} description={`Master Grade ${grade} math skills.`} />


            {/* Header / Breadcrumbs */}
            <header className="senior-header-container">
                <div className="header-inner">
                    <nav className="breadcrumb">
                        <Link to="/" className="home-link">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/" className="home-link">Math</Link>
                        <ChevronRight size={14} />
                        <span>Grade {grade}</span>
                    </nav>

                    <div className="page-title">
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: '#4F46E5',
                            background: '#EEF2FF',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            marginBottom: '10px',
                            display: 'inline-block',
                            letterSpacing: '0.05em'
                        }}>HIGH SCHOOL MATHEMATICS</span>
                        <h1>Grade {grade} Curriculum</h1>
                    </div>

                    <div className="page-subtitle">
                        <span><BookOpen size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> {topics.length} Units</span>
                        <span><Activity size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> {skills.length} Skills</span>
                    </div>
                </div>
            </header>

            {/* Main Content - Grid Layout */}
            <main className="senior-content-grid">
                <div className="topics-grid-container">
                    {topics.map(topic => (
                        <div
                            key={topic}
                            className="topic-card"
                            onClick={() => setSelectedTopic(topic)}
                        >
                            <div className="topic-card-icon">
                                <Layout size={32} />
                            </div>
                            <h3><LatexText text={topic} /></h3>
                            <div className="topic-meta">
                                {skillsByTopic[topic].length} Skills
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal Overlay */}
            {selectedTopic && (
                <div className="modal-overlay" onClick={() => setSelectedTopic(null)}>
                    <div className="skills-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>
                                <Grid size={24} color="#4F46E5" />
                                <LatexText text={selectedTopic} />
                            </h2>
                            <button
                                className="modal-close-btn-text"
                                onClick={() => setSelectedTopic(null)}
                                title="Close"
                            >
                                Close
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-skills-grid">
                                {skillsByTopic[selectedTopic].map(skill => (
                                    <div
                                        key={skill.skill_id}
                                        className="skill-card-modal"
                                        onClick={() => navigate(`/high/practice/${skill.skill_id}`, { state: { grade: grade } })}
                                    >
                                        <h4><LatexText text={skill.skill_name} /></h4>
                                        <div className="skill-card-footer">
                                            <span className="skill-badge">ID: {skill.skill_id}</span>
                                            <span className="start-btn">
                                                Start <ChevronRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeniorGradeSyllabus;
