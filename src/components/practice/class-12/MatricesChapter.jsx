import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, BookOpen, PenTool, Trophy } from 'lucide-react';
import { api } from '../../../services/api';
import './MatricesChapter.css';

const PAGES = [
    {
        id: 'who-uses',
        title: 'Who Uses Matrices?',
        desc: 'Discover how Netflix, engineers and economists rely on matrices every day.',
        icon: '🌍',
        path: '/senior/grade/12/matrices/who-uses',
        phase: 'B',
        skillId: null,
    },
    {
        id: 'what-is',
        title: 'What is a Matrix?',
        desc: 'Learn definitions, notation, types and build your first matrix.',
        icon: '📐',
        path: '/senior/grade/12/matrices/what-is',
        phase: 'A',
        skillId: 12101,
    },
    {
        id: 'when-need',
        title: 'When Do We Need Matrices?',
        desc: 'Convert data tables and equations into matrix form.',
        icon: '🔄',
        path: '/senior/grade/12/matrices/when-need',
        phase: 'B',
        skillId: 12102,
    },
    {
        id: 'how-operations',
        title: 'How Operations Work',
        desc: 'Master addition, multiplication, transpose with step-by-step guidance.',
        icon: '⚙️',
        path: '/senior/grade/12/matrices/how-operations',
        phase: 'A',
        skillId: 12103,
    },
    {
        id: 'why-rules',
        title: 'Why the Rules Work',
        desc: 'Understand the deep reasons behind matrix algebra rules.',
        icon: '💡',
        path: '/senior/grade/12/matrices/why-rules',
        phase: 'C',
        skillId: 12104,
    },
    {
        id: 'where-applied',
        title: 'Where Matrices Are Applied',
        desc: 'Explore real-world applications: graphics, economics, cryptography.',
        icon: '🚀',
        path: '/senior/grade/12/matrices/where-applied',
        phase: 'C',
        skillId: 12105,
    },
    {
        id: 'invertible',
        title: 'Invertible Matrices',
        desc: 'Learn inverse, adjoint, and solving equations using matrices.',
        icon: '🔑',
        path: '/senior/grade/12/matrices/invertible',
        phase: 'C',
        skillId: 12106,
    },
];

const PRACTICE_TESTS = [
    { id: 'matrix-order', title: 'Matrix & Order', desc: 'Test your knowledge of matrix dimensions and elements.', icon: '📏', path: '/senior/grade/12/matrices/test/matrix-order', skillId: 12201 },
    { id: 'matrix-types', title: 'Types of Matrices', desc: 'Identify row, column, diagonal, scalar, identity, and zero matrices.', icon: '🔢', path: '/senior/grade/12/matrices/test/matrix-types', skillId: 12203 },
    { id: 'matrix-equality', title: 'Equality of Matrices', desc: 'Solve for unknowns using matrix equality conditions.', icon: '⚖️', path: '/senior/grade/12/matrices/test/matrix-equality', skillId: 12206 },
    { id: 'matrix-operations', title: 'Operations', desc: 'Practice addition, scalar multiplication, and matrix multiplication.', icon: '➕', path: '/senior/grade/12/matrices/test/matrix-operations', skillId: 12207 },
    { id: 'matrix-transpose', title: 'Transpose', desc: 'Master transpose properties and symmetric/skew-symmetric matrices.', icon: '🔄', path: '/senior/grade/12/matrices/test/matrix-transpose', skillId: 12214 },
    { id: 'invertible-matrices', title: 'Invertible Matrices', desc: 'Test inverses, determinants, adjoint, and solving linear systems.', icon: '🔓', path: '/senior/grade/12/matrices/test/invertible-matrices', skillId: 12217 },
];

const MatricesChapter = () => {
    const navigate = useNavigate();
    const [backendProgress, setBackendProgress] = React.useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.getUserProgress(userId).then(res => {
                if (Array.isArray(res)) setBackendProgress(res);
            }).catch(e => console.error(e));
        }
    }, []);

    const getCompletionStatus = (pageId, skillId) => {
        if (skillId && backendProgress) {
            const prog = backendProgress.find(p => p.skill_id === skillId);
            if (prog && (prog.total_correct >= 2 || prog.total_questions_attempted >= 4)) return true;
        }
        try { const data = JSON.parse(localStorage.getItem('matrices_progress') || '{}'); return data[pageId] || false; } catch { return false; }
    };

    const completedLearnCount = PAGES.filter(p => getCompletionStatus(p.id, p.skillId)).length;
    const allLearnComplete = true; // Temporary: Always true for preview
    const progressPct = (completedLearnCount / PAGES.length) * 100;

    const completedTestCount = PRACTICE_TESTS.filter(t => getCompletionStatus(t.id, t.skillId)).length;
    const allTestsComplete = true; // Temporary: Always true for preview

    return (
        <div className="matrices-chapter-page">
            {/* Header */}
            <header className="matrices-chapter-header">
                <button className="matrices-back-btn" onClick={() => navigate('/senior/grade/12')}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div className="badge">CLASS 12 • MATHEMATICS</div>
                <h1>Matrices</h1>
                <p>An interactive journey through the world of matrices.</p>
                <p>From fundamentals to real-world applications.</p>
                <div className="chapter-progress-bar">
                    <div className="chapter-progress-bar-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div style={{ marginTop: 8, fontSize: '0.8rem', opacity: 0.7 }}>
                    {completedLearnCount} / {PAGES.length} sections completed
                </div>
            </header>

            {/* LEARN Section */}
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '32px 0 20px', padding: '12px 20px', background: '#EEF2FF', borderRadius: 14, border: '2px solid #C7D2FE' }}>
                    <BookOpen size={24} color="#4F46E5" />
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Learn</h2>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', marginLeft: 'auto', fontWeight: 600 }}>{completedLearnCount}/{PAGES.length} done</span>
                </div>
            </div>

            {/* Topic cards */}
            <div className="matrices-cards-grid">
                {PAGES.map((page) => {
                    const completed = getCompletionStatus(page.id, page.skillId);
                    return (
                        <div key={page.id} className="matrix-topic-card" onClick={() => navigate(page.path)} style={{ cursor: 'pointer' }}>
                            <div className="card-icon">{page.icon}</div>
                            <h3>{page.title}</h3>
                            <p className="card-desc">{page.desc}</p>
                            <div className="card-footer">
                                <span className={`card-badge ${completed ? 'complete' : ''}`}>
                                    {completed ? '✓ Complete' : 'Start'}
                                </span>
                                <div className="card-arrow"><ChevronRight size={18} /></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* PRACTICE TESTS Section */}
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '40px 0 20px', padding: '12px 20px', background: allLearnComplete ? '#ECFDF5' : '#F1F5F9', borderRadius: 14, border: `2px solid ${allLearnComplete ? '#A7F3D0' : '#E2E8F0'}` }}>
                    <PenTool size={24} color={allLearnComplete ? '#059669' : '#94A3B8'} />
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Skills</h2>
                    {!allLearnComplete && <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginLeft: 'auto', fontWeight: 600, background: '#F8FAFC', padding: '4px 12px', borderRadius: 20 }}>🔒 Complete all learn sections to unlock</span>}
                    {allLearnComplete && <span style={{ fontSize: '0.8rem', color: '#059669', marginLeft: 'auto', fontWeight: 600 }}>{completedTestCount}/{PRACTICE_TESTS.length} done</span>}
                </div>
            </div>

            <div className="matrices-cards-grid" style={{ opacity: allLearnComplete ? 1 : 0.45, pointerEvents: allLearnComplete ? 'auto' : 'none' }}>
                {PRACTICE_TESTS.map((test) => {
                    const completed = getCompletionStatus(test.id, test.skillId);
                    return (
                        <div key={test.id} className="matrix-topic-card" onClick={() => navigate(test.path)} style={{ cursor: 'pointer', borderColor: completed ? '#A7F3D0' : undefined }}>
                            <div className="card-icon">{test.icon}</div>
                            <h3>{test.title}</h3>
                            <p className="card-desc">{test.desc}</p>
                            <div className="card-footer">
                                <span className={`card-badge ${completed ? 'complete' : ''}`} style={{ background: !completed ? '#EEF2FF' : undefined, color: !completed ? '#4F46E5' : undefined }}>
                                    {completed ? '✓ Passed' : '10 Questions'}
                                </span>
                                <div className="card-arrow"><ChevronRight size={18} /></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CHAPTER TEST */}
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '40px 0 20px', padding: '12px 20px', background: allTestsComplete ? '#FEF3C7' : '#F1F5F9', borderRadius: 14, border: `2px solid ${allTestsComplete ? '#FCD34D' : '#E2E8F0'}` }}>
                    <Trophy size={24} color={allTestsComplete ? '#D97706' : '#94A3B8'} />
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Chapter Assessment</h2>
                    {!allTestsComplete && <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginLeft: 'auto', fontWeight: 600, background: '#F8FAFC', padding: '4px 12px', borderRadius: 20 }}>🔒 Complete all practice tests to unlock</span>}
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px' }}>
                <div
                    className="matrix-topic-card"
                    onClick={() => allTestsComplete && navigate('/senior/grade/12/matrices/test')}
                    style={{ cursor: allTestsComplete ? 'pointer' : 'default', opacity: allTestsComplete ? 1 : 0.45, border: '2px solid #FCD34D', background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', maxWidth: 500, margin: '0 auto' }}
                >
                    <div className="card-icon" style={{ fontSize: '2.5rem' }}>🏆</div>
                    <h3 style={{ fontSize: '1.3rem' }}>Full Chapter Test</h3>
                    <p className="card-desc">30 questions across all topics. No hints. Strict assessment with detailed report.</p>
                    <div className="card-footer">
                        <span className="card-badge" style={{ background: '#FEF3C7', color: '#92400E', fontWeight: 800 }}>
                            {allTestsComplete ? 'Start Assessment' : '🔒 Locked'}
                        </span>
                        <div className="card-arrow"><ChevronRight size={18} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatricesChapter;
