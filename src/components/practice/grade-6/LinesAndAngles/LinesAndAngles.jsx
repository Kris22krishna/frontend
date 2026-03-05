import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, BookOpen, PenTool, Trophy } from 'lucide-react';
import { api } from '../../../../../services/api';
import './LinesAndAngles.css';

const PAGES = [
    {
        id: 'intro',
        title: 'Fundamental Concept',
        desc: 'Explore the 5W1H of Lines and Angles—What they are, Why they matter, and How they shape geometry.',
        icon: '🌍',
        path: '/middle/grade/6/lines-and-angles/introduction',
        phase: 'A',
        skillId: 6101,
    },
    {
        id: 'terms',
        title: 'Core Terminology',
        desc: 'Master the vocabulary: Points, Rays, Segments, and the 5 Golden Rules of Angles.',
        icon: '📐',
        path: '/middle/grade/6/lines-and-angles/terminology',
        phase: 'A',
        skillId: 6102,
    },
    {
        id: 'skills',
        title: 'Applied Skills',
        desc: 'Challenge yourself with Transversals, Intersecting Lines, and measuring angles.',
        icon: '⚙️',
        path: '/middle/grade/6/lines-and-angles/skills',
        phase: 'B',
        skillId: 6103,
    }
];

const PRACTICE_TESTS = [
    { id: 'lines-easy', title: 'Easy Test', desc: 'Test your foundational knowledge of lines and angles.', icon: '📏', path: '/middle/grade/6/lines-and-angles/deep-dive/test/easy', skillId: 6201 },
    { id: 'lines-medium', title: 'Medium Test', desc: 'Identify alternate interior, corresponding, and adjacent angles.', icon: '🔢', path: '/middle/grade/6/lines-and-angles/deep-dive/test/medium', skillId: 6202 },
    { id: 'lines-hard', title: 'Hard Test', desc: 'Solve complex problems using the rules of intersecting and parallel lines.', icon: '⚖️', path: '/middle/grade/6/lines-and-angles/deep-dive/test/hard', skillId: 6203 },
];

const LinesAndAngles = () => {
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
        try { const data = JSON.parse(localStorage.getItem('lines_angles_progress') || '{}'); return data[pageId] || false; } catch { return false; }
    };

    const completedLearnCount = PAGES.filter(p => getCompletionStatus(p.id, p.skillId)).length;
    const allLearnComplete = true; // Temporary: Always true for preview
    const progressPct = (completedLearnCount / PAGES.length) * 100;

    const completedTestCount = PRACTICE_TESTS.filter(t => getCompletionStatus(t.id, t.skillId)).length;
    const allTestsComplete = true; // Temporary: Always true for preview

    return (
        <div className="matrices-chapter-page">
            <header className="matrices-chapter-header">
                <button className="matrices-back-btn" onClick={() => navigate('/middle/grade/6')}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div className="badge">CLASS 6 • MATHEMATICS</div>
                <h1>Lines and Angles</h1>
                <p>An interactive journey through the building blocks of geometry.</p>
                <p>From points and rays to transversals and linear pairs.</p>
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
                                    {completed ? '✓ ' : ''} Start
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
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Skills Assessment</h2>
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

        </div>
    );
};

export default LinesAndAngles;
