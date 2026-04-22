import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, FlaskConical, Atom } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import LoginPromptModal from '../../../auth/LoginPromptModal';
import '../../../../pages/high/SeniorGradeSyllabus.css';

const chapters = [
    {
        key: 'structure-of-atom',
        title: 'Structure of Atom',
        desc: 'Discovery of fundamental particles, atomic models, quantum mechanics, electronic configuration, and spectral lines.',
        icon: '⚛️',
        questions: 75, // 5 skills * 15 questions
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        shadow: 'rgba(79,172,254,0.35)',
    },
    // Future chapters can be added here
];

const ChemistryChapters = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingChapter, setPendingChapter] = useState(null);

    const handleChapterClick = (chapter) => {
        if (!isAuthenticated) {
            setPendingChapter(chapter);
            setShowLoginModal(true);
        } else {
            navigate(`/senior/grade/11/chemistry/${chapter.key}`);
        }
    };

    const handleLoginSuccess = () => {
        if (pendingChapter) {
            navigate(`/senior/grade/11/chemistry/${pendingChapter.key}`);
            setPendingChapter(null);
        }
    };

    return (
        <div className="senior-syllabus-page">
            <header className="senior-header-container">
                <div className="header-inner">
                    <nav className="breadcrumb">
                        <Link to="/" className="home-link">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/senior/grade/11" className="home-link">Grade 11</Link>
                        <ChevronRight size={14} />
                        <span>Chemistry</span>
                    </nav>
                    <div className="page-title">
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0ea5e9', background: '#e0f2fe', padding: '4px 12px', borderRadius: '20px', marginBottom: '10px', display: 'inline-block', letterSpacing: '0.05em' }}>GRADE 11 • CHEMISTRY</span>
                        <h1>🧪 Chemistry Chapters</h1>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>Select a chapter to start practising.</p>
                </div>
            </header>

            <main className="senior-content-grid">
                <div className="g11-subject-grid" style={{ maxWidth: 1100 }}>
                    {chapters.map(ch => (
                        <div
                            key={ch.key}
                            className="g11-subject-card"
                            style={{ '--card-gradient': ch.gradient, '--card-shadow': ch.shadow }}
                            onClick={() => handleChapterClick(ch)}
                        >
                            <div className="g11-card-bg"></div>
                            <div className="g11-card-content">
                                <span className="g11-icon">{ch.icon}</span>
                                <h3>{ch.title}</h3>
                                <p>{ch.desc}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                    <span style={{ opacity: 0.85, fontSize: '0.8rem', fontWeight: 600 }}>{ch.questions} Questions</span>
                                    <span className="g11-explore">Start <ChevronRight size={16} /></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {showLoginModal && (
                <LoginPromptModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </div>
    );
};

export default ChemistryChapters;
