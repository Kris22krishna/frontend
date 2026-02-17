import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';

import SEO from '../../components/common/SEO';
import { BookOpen, ChevronRight, Hash, Activity, X, Grid, Layout } from 'lucide-react';
import { LatexText } from '../../components/LatexText';
import { capitalizeFirstLetter } from '../../lib/stringUtils';
import './SeniorGradeSyllabus.css';

const SeniorGradeSyllabus = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    // Grid + Modal Logic
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [expandedSubtopic, setExpandedSubtopic] = useState(null);

    // Fetch Skills or Set Hardcoded for Grade 10
    useEffect(() => {
        const fetchSkills = async () => {
            setLoading(true);
            try {
                if (grade === '10') {
                    setSkills([
                        { skill_id: 10031, skill_name: 'Form a pair of linear equations from word problems', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Forming Linear Equations from Real-Life Situations' },

                        { skill_id: 10041, skill_name: 'Rewrite linear equations in the form ax + by + c = 0', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Rewriting Linear Equations in Standard Form' },

                        { skill_id: 10021, skill_name: 'Identify the Number of Solutions from Line Relationships', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Number of Solutions of a Pair of Linear Equations' },
                        { skill_id: 10022, skill_name: 'Identify the number of solutions using algebraic conditions', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Number of Solutions of a Pair of Linear Equations' },

                        { skill_id: 10011, skill_name: 'Solve a pair of linear equations by graphing', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Pair of Linear Equations – Graphical Representation' },

                        { skill_id: 10051, skill_name: 'Check whether a given ordered pair is a solution', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 10052, skill_name: 'Solve equations using substitution (no word problems)', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 10053, skill_name: 'Solve word problems using substitution', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 10054, skill_name: 'Solve equations using elimination (no word problems)', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 10055, skill_name: 'Solve word problems using elimination', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' }
                    ]);
                } else {
                    const response = await api.getSkills(grade);
                    setSkills(response || []);
                }
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

    // Group skills by topic (Chapter Level)
    const skillsByTopic = (skills || []).reduce((acc, skill) => {
        const topicName = (skill.topic || 'General').toLowerCase();
        const gradeNum = parseInt(grade.replace('grade', ''));
        if (gradeNum === 8 && topicName !== "exponents and power") return acc;

        const topic = skill.topic || 'General';
        if (!acc[topic]) acc[topic] = [];
        acc[topic].push(skill);
        return acc;
    }, {});

    // Add hardcoded "Application of Laws of Exponents" skill for Grade 8
    if (parseInt(grade.replace('grade', '')) === 8 && skillsByTopic['Exponents and Power']) {
        // Find the index of "Laws of Exponents" skill
        const lawsIndex = skillsByTopic['Exponents and Power'].findIndex(
            skill => skill.skill_id === 1869 || skill.skill_name.toLowerCase().includes('laws of exponent')
        );

        // Insert right after Laws of Exponents
        const insertIndex = lawsIndex !== -1 ? lawsIndex + 1 : skillsByTopic['Exponents and Power'].length;
        skillsByTopic['Exponents and Power'].splice(insertIndex, 0, {
            skill_id: 8005,
            skill_name: 'Application of Laws of Exponents',
            topic: 'Exponents and Power'
        });
    }

    const topics = Object.keys(skillsByTopic);

    // Handle Closing Modal on Escape Key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedTopic(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Helper to group skills by subtopic for the modal
    const getSubtopicsForSelected = () => {
        if (!selectedTopic) return {};
        return skillsByTopic[selectedTopic].reduce((acc, skill) => {
            const sub = skill.subtopic || 'General';
            if (!acc[sub]) acc[sub] = [];
            acc[sub].push(skill);
            return acc;
        }, {});
    };

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

    const subtopics = getSubtopicsForSelected();

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
                        <span><BookOpen size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> {topics.length} Chapters</span>
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
                            <h3><LatexText text={capitalizeFirstLetter(topic)} /></h3>
                            <div className="topic-meta">
                                {skillsByTopic[topic].length} {skillsByTopic[topic].length === 1 ? 'Skill' : 'Skills'}
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
                                <LatexText text={capitalizeFirstLetter(selectedTopic)} />
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
                            {/* Render Subtopics as Sections */}
                            <div className="subtopics-list">
                                {Object.keys(subtopics).map((subtopic) => (
                                    <div key={subtopic} className="subtopic-section" style={{ marginBottom: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                                        <div
                                            className="subtopic-header"
                                            style={{ padding: '1rem', background: '#f8fafc', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', gap: '1rem' }}
                                            onClick={() => setExpandedSubtopic(expandedSubtopic === subtopic ? null : subtopic)}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <LatexText text={subtopic} />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    color: '#4F46E5',
                                                    fontWeight: '700',
                                                    background: '#EEF2FF',
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {subtopics[subtopic].length} {subtopics[subtopic].length === 1 ? 'Skill' : 'Skills'}
                                                </span>
                                                <ChevronRight size={20} style={{ transform: expandedSubtopic === subtopic ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#64748b' }} />
                                            </div>
                                        </div>

                                        {expandedSubtopic === subtopic && (
                                            <div className="modal-skills-grid" style={{ padding: '1rem', background: '#fff' }}>
                                                {subtopics[subtopic].map(skill => (
                                                    <div
                                                        key={skill.skill_id}
                                                        className="skill-card-modal"
                                                        onClick={() => navigate(`/high/practice/${skill.skill_id}`, { state: { grade: grade } })}
                                                    >
                                                        <h4><LatexText text={capitalizeFirstLetter(skill.skill_name)} /></h4>
                                                        <div className="skill-card-footer">
                                                            <span className="skill-badge">ID: {skill.skill_id}</span>
                                                            <span className="start-btn">
                                                                Start <ChevronRight size={16} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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
