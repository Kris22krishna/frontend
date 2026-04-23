import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import LoginPromptModal from '../../../auth/LoginPromptModal';
import '../../../../pages/high/SeniorGradeSyllabus.css';

const chapters = [
    {
        key: 'electric-charges-and-fields',
        title: 'Electric Charges and Fields',
        icon: '⚡',
        desc: "Coulomb's Law, Electric Field, Gauss's Law, Electric Dipole — the electrostatics foundation of Grade 12 Physics.",
        questions: 70,
        gradient: 'linear-gradient(135deg, #4a2c8a, #1a3a6e)',
        shadow: 'rgba(74,44,138,0.3)',
    },
];

const PhysicsChapters12 = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingChapter, setPendingChapter] = useState(null);

    const handleChapterClick = (chapter) => {
        if (!isAuthenticated) {
            setPendingChapter(chapter);
            setShowLoginModal(true);
        } else {
            navigate(`/senior/grade/12/physics/${chapter.key}`);
        }
    };

    const handleLoginSuccess = () => {
        if (pendingChapter) {
            navigate(`/senior/grade/12/physics/${pendingChapter.key}`);
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
                        <Link to="/senior/grade/12" className="home-link">Grade 12</Link>
                        <ChevronRight size={14} />
                        <span>Physics</span>
                    </nav>
                    <div className="page-title">
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1d4ed8', background: '#eff6ff', padding: '4px 12px', borderRadius: '20px', marginBottom: '10px', display: 'inline-block', letterSpacing: '0.05em' }}>GRADE 12 • PHYSICS</span>
                        <h1>🌌 Physics Chapters</h1>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>Chapters coming soon.</p>
                </div>
            </header>

            <main className="senior-content-grid">
                <div className="g11-subject-grid" style={{ maxWidth: 1100 }}>
                    {chapters.length === 0 && (
                        <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '1rem', border: '1px dashed #cbd5e1' }}>
                            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>More chapters are being added soon. Check back later!</p>
                        </div>
                    )}
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

export default PhysicsChapters12;
