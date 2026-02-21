import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import './MatricesChapter.css';

const PAGES = [
    {
        id: 'who-uses',
        title: 'Who Uses Matrices?',
        desc: 'Discover how Netflix, engineers and economists rely on matrices every day.',
        icon: '🌍',
        path: '/senior/grade/12/matrices/who-uses',
        phase: 'B',
    },
    {
        id: 'what-is',
        title: 'What is a Matrix?',
        desc: 'Learn definitions, notation, types and build your first matrix.',
        icon: '📐',
        path: '/senior/grade/12/matrices/what-is',
        phase: 'A',
    },
    {
        id: 'when-need',
        title: 'When Do We Need Matrices?',
        desc: 'Convert data tables and equations into matrix form.',
        icon: '🔄',
        path: '/senior/grade/12/matrices/when-need',
        phase: 'B',
    },
    {
        id: 'how-operations',
        title: 'How Operations Work',
        desc: 'Master addition, multiplication, transpose with step-by-step guidance.',
        icon: '⚙️',
        path: '/senior/grade/12/matrices/how-operations',
        phase: 'A',
    },
    {
        id: 'why-rules',
        title: 'Why the Rules Work',
        desc: 'Understand the deep reasons behind matrix algebra rules.',
        icon: '💡',
        path: '/senior/grade/12/matrices/why-rules',
        phase: 'C',
    },
    {
        id: 'where-applied',
        title: 'Where Matrices Are Applied',
        desc: 'Explore real-world applications: graphics, economics, cryptography.',
        icon: '🚀',
        path: '/senior/grade/12/matrices/where-applied',
        phase: 'C',
    },
];

const MatricesChapter = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Check completed pages from localStorage
    const getCompletionStatus = (pageId) => {
        try {
            const data = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
            return data[pageId] || false;
        } catch {
            return false;
        }
    };

    const completedCount = PAGES.filter(p => getCompletionStatus(p.id)).length;
    const progressPct = (completedCount / PAGES.length) * 100;

    const isAvailable = (page) => {
        // Phase A, B, and C are implemented. D is not (if we had any)
        return ['A', 'B', 'C'].includes(page.phase);
    };

    return (
        <div className="matrices-chapter-page">
            {/* Header */}
            <header className="matrices-chapter-header">
                <button className="matrices-back-btn" onClick={() => navigate('/senior/grade/12')}>
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="badge">CLASS 12 • MATHEMATICS</div>
                <h1>Matrices</h1>
                <p>An interactive journey through the world of matrices — from fundamentals to real-world applications.</p>

                <div className="chapter-progress-bar">
                    <div className="chapter-progress-bar-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div style={{ marginTop: 8, fontSize: '0.8rem', opacity: 0.7 }}>
                    {completedCount} / {PAGES.length} sections completed
                </div>
            </header>

            {/* Topic cards */}
            <div className="matrices-cards-grid">
                {PAGES.map((page) => {
                    const completed = getCompletionStatus(page.id);
                    const available = isAvailable(page);

                    return (
                        <div
                            key={page.id}
                            className="matrix-topic-card"
                            onClick={() => available && navigate(page.path)}
                            style={{ opacity: available ? 1 : 0.5, cursor: available ? 'pointer' : 'default' }}
                        >
                            <div className="card-icon">{page.icon}</div>
                            <h3>{page.title}</h3>
                            <p className="card-desc">{page.desc}</p>
                            <div className="card-footer">
                                <span className={`card-badge ${completed ? 'complete' : !available ? 'locked' : ''}`}>
                                    {completed ? '✓ Complete' : !available ? '🔒 Coming Soon' : 'Start'}
                                </span>
                                <div className="card-arrow">
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MatricesChapter;
