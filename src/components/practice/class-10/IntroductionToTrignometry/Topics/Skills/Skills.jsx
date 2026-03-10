import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../trigonometry.css';
import MathRenderer from '../../../../../MathRenderer';
import { SKILLS } from './TrigonometrySkillsData';

function QuizEngine({ questions, title, onBack, color, mode = 'practice' }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [responses, setResponses] = useState({}); // { index: { selected: number, isCorrect: boolean } }
    const [finished, setFinished] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [visited, setVisited] = useState({ 0: true });

    const isAssessment = mode === 'assessment';
    const q = questions[current];

    // Timer logic
    useEffect(() => {
        if (!finished) {
            const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [finished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelect = (optIdx) => {
        if (finished) return;
        if (!isAssessment && selected !== null) return; // Lock in practice mode

        setSelected(optIdx);

        setResponses(prev => ({
            ...prev,
            [current]: {
                selected: optIdx,
                isCorrect: optIdx === q.correct
            }
        }));
    };

    const handleNext = () => {
        if (current + 1 < questions.length) {
            const nextIdx = current + 1;
            setCurrent(nextIdx);
            setSelected(responses[nextIdx]?.selected ?? null);
            setVisited(prev => ({ ...prev, [nextIdx]: true }));
        } else {
            setFinished(true);
        }
    };

    const handlePrev = () => {
        if (current > 0) {
            const prevIdx = current - 1;
            setCurrent(prevIdx);
            setSelected(responses[prevIdx]?.selected ?? null);
        }
    };

    const navigateTo = (idx) => {
        setCurrent(idx);
        setSelected(responses[idx]?.selected ?? null);
        setVisited(prev => ({ ...prev, [idx]: true }));
    };

    const resetQuiz = () => {
        setCurrent(0);
        setSelected(null);
        setResponses({});
        setFinished(false);
        setTimeElapsed(0);
        setVisited({ 0: true });
    };

    if (finished) {
        const totalCorrect = Object.values(responses).filter(r => r.isCorrect).length;
        const scorePct = Math.round((totalCorrect / questions.length) * 100);

        if (!isAssessment) {
            return (
                <div className="practice-report-card" style={{
                    maxWidth: '500px', margin: '20px auto', padding: '24px', textAlign: 'center',
                    background: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                    border: '1px solid #f1f5f9'
                }}>
                    {/* Circular Score */}
                    <div style={{
                        width: '120px', height: '120px', margin: '0 auto 16px', borderRadius: '50%',
                        background: `conic-gradient(${color} ${scorePct}%, #f1f5f9 ${scorePct}%)`,
                        padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: '100%', height: '100%', background: '#fff', borderRadius: '50%',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{totalCorrect}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>out of {questions.length}</div>
                        </div>
                    </div>

                    {/* Time Taken Badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px',
                        background: `${color}10`, color: color, borderRadius: '50px',
                        fontSize: '12px', fontWeight: 800, marginBottom: '16px'
                    }}>
                        ⏱️ Time: {formatTime(timeElapsed)}
                    </div>

                    <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
                        {scorePct === 100 ? '🚀 Perfect Score!' : scorePct >= 70 ? '💪 Great Job!' : '✨ Keep Learning!'}
                    </h2>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>
                        {scorePct === 100 ? "You've mastered this skill perfectly!" : "Review the concepts and try again for 100%."}
                    </p>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button className="alg-btn-primary"
                            style={{ background: color, padding: '10px 24px', borderRadius: '12px', fontSize: '14px' }}
                            onClick={resetQuiz}
                        >
                            Try Again
                        </button>
                        <button className="alg-btn-secondary"
                            style={{ padding: '10px 24px', borderRadius: '12px', fontSize: '14px', border: '2px solid #e2e8f0' }}
                            onClick={onBack}
                        >
                            Return to Skills
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="exam-report-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                <div className="report-hero" style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '5px' }}>🏆</div>
                    <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#31326F', margin: '0' }}>{scorePct >= 80 ? 'Mastery Achieved!' : 'Assessment Report'}</h1>
                    <p style={{ fontSize: '16px', color: '#64748B', fontWeight: 500 }}>{title.includes(': ') ? title.split(': ')[1] : title}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                    <div className="report-stat-card" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE', padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                        <span style={{ color: '#3B82F6', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>Score</span>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#1E3A8A' }}>{scorePct}%</div>
                    </div>
                    <div className="report-stat-card" style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                        <span style={{ color: '#22C55E', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>Correct</span>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#14532D' }}>{totalCorrect}</div>
                    </div>
                    <div className="report-stat-card" style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                        <span style={{ color: '#EF4444', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>Wrong</span>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#7F1D1D' }}>{questions.length - totalCorrect}</div>
                    </div>
                    <div className="report-stat-card" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                        <span style={{ color: '#64748B', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>Time</span>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#334155' }}>{formatTime(timeElapsed)}</div>
                    </div>
                </div>

                <div className="detailed-review">
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1E293B', marginBottom: '20px' }}>Detailed Review</h2>
                    {questions.map((question, idx) => {
                        const resp = responses[idx];
                        const isCorrect = resp?.isCorrect;
                        return (
                            <div key={idx} style={{
                                background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '20px',
                                border: `2px solid ${isCorrect ? '#DCFCE730' : '#FEE2E230'}`,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                            }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                                    <span style={{
                                        width: '28px', height: '28px', borderRadius: '50%', background: isCorrect ? '#22C55E' : '#EF4444',
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0
                                    }}>{idx + 1}</span>
                                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B' }}>
                                        <MathRenderer text={question.question} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', marginLeft: '40px' }}>
                                    <div style={{ padding: '15px', borderRadius: '12px', background: isCorrect ? '#F0FDF4' : '#FEF2F2' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: isCorrect ? '#22C55E' : '#EF4444', display: 'block', marginBottom: '4px' }}>Your Answer</span>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: isCorrect ? '#14532D' : '#7F1D1D' }}>
                                            {resp ? <MathRenderer text={question.options[resp.selected]} /> : 'Skipped'}
                                        </div>
                                    </div>
                                    <div style={{ padding: '15px', borderRadius: '12px', background: '#F0FDF4', border: '1px solid #DCFCE7' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#22C55E', display: 'block', marginBottom: '4px' }}>Correct Answer</span>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#14532D' }}>
                                            <MathRenderer text={question.options[question.correct]} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginLeft: '40px', padding: '20px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                    <h4 style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solution Strategy</h4>
                                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                                        <MathRenderer text={question.explanation} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button className="alg-btn-primary" onClick={onBack} style={{ padding: '15px 40px', background: color }}>
                        Return to Skills
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-engine-exam" style={{ maxWidth: isAssessment ? '1300px' : '900px', margin: '0 auto', padding: '10px 0' }}>
            {/* Assessment Header */}
            {isAssessment && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: color, textTransform: 'uppercase', letterSpacing: '1px' }}>Final Assessment</span>
                        <h2 style={{ margin: '0', fontSize: '18px', fontWeight: 900, color: '#1E293B' }}>{title.includes(': ') ? title.split(': ')[1] : title}</h2>
                    </div>
                    <div style={{
                        background: '#fff', padding: '6px 14px', borderRadius: '10px', border: '2px solid #E2E8F0',
                        display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                    }}>
                        <span style={{ fontSize: '16px' }}>⏱️</span>
                        <span style={{ fontSize: '16px', fontWeight: 900, fontFamily: 'Outfit, monospace', color: '#1E293B' }}>{formatTime(timeElapsed)}</span>
                    </div>
                </div>
            )}

            {/* Main Content Layout */}
            <div className="quiz-main-layout" style={{ display: 'flex', gap: '20px', flexDirection: isAssessment ? 'row' : 'column', alignItems: 'flex-start' }}>

                {/* Left Side: Question */}
                <div style={{ flex: 1, width: '100%' }}>
                    <div className="alg-quiz-card" style={{
                        background: '#fff', borderRadius: '20px', padding: 'clamp(16px, 4%, 30px)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)',
                        minHeight: 'auto', display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{
                            display: 'inline-block', padding: '3px 10px', borderRadius: '6px',
                            background: `${color}15`, color: color, fontSize: '10px', fontWeight: 800,
                            textTransform: 'uppercase', marginBottom: '10px', width: 'fit-content'
                        }}>
                            Question {current + 1} of {questions.length}
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', lineHeight: 1.4, marginBottom: '16px' }}>
                            <MathRenderer text={q.question} />
                        </h3>

                        <div className="quiz-options-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                            {q.options.map((opt, i) => {
                                const isCorrect = i === q.correct;
                                const isSelected = selected === i;
                                const showFeedback = !isAssessment && selected !== null;

                                let borderColor = '#f1f5f9';
                                let bgColor = '#fff';
                                let dotColor = '#CBD5E1';

                                if (showFeedback) {
                                    if (isCorrect) {
                                        borderColor = '#10b981';
                                        bgColor = '#f0fdf4';
                                        dotColor = '#10b981';
                                    } else if (isSelected) {
                                        borderColor = '#ef4444';
                                        bgColor = '#fef2f2';
                                        dotColor = '#ef4444';
                                    }
                                } else if (isSelected) {
                                    borderColor = color;
                                    bgColor = `${color}05`;
                                    dotColor = color;
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(i)}
                                        disabled={showFeedback}
                                        style={{
                                            padding: '10px 14px', borderRadius: '12px', border: '2px solid',
                                            borderColor, background: bgColor,
                                            textAlign: 'left', cursor: showFeedback ? 'default' : 'pointer', transition: 'all 0.2s',
                                            fontSize: '14px', fontWeight: isSelected ? 800 : 600,
                                            color: isSelected ? (showFeedback ? (isCorrect ? '#065f46' : '#991b1b') : color) : '#475569',
                                            display: 'flex', alignItems: 'center', gap: '8px'
                                        }}
                                    >
                                        <div style={{
                                            width: '14px', height: '14px', borderRadius: '50%', border: '2px solid',
                                            borderColor: (isSelected || (showFeedback && isCorrect)) ? dotColor : '#CBD5E1',
                                            background: (isSelected || (showFeedback && isCorrect)) ? dotColor : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                        }}>
                                            {(isSelected || (showFeedback && isCorrect)) && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }} />}
                                        </div>
                                        <MathRenderer text={opt} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Practice Mode Explanation Bubble */}
                        {!isAssessment && selected !== null && (
                            <div style={{
                                marginTop: '5px', marginBottom: '15px', padding: '15px 20px', borderRadius: '15px',
                                background: '#F8FAFC', borderLeft: `5px solid ${color}`,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                            }}>
                                <h4 style={{ margin: '0 0 5px', fontSize: '11px', fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>💡 Solution Strategy</h4>
                                <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                                    <MathRenderer text={q.explanation} />
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '2px dashed #f1f5f9' }}>
                            <button
                                onClick={handlePrev}
                                disabled={current === 0}
                                style={{
                                    padding: '8px 16px', borderRadius: '8px', border: '2px solid #E2E8F0',
                                    background: '#fff', color: '#64748B', fontWeight: 800, cursor: current === 0 ? 'not-allowed' : 'pointer',
                                    opacity: current === 0 ? 0.5 : 1, transition: 'all 0.2s', fontSize: '13px'
                                }}
                            >
                                ← Previous
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!isAssessment && selected === null}
                                style={{
                                    padding: '8px 24px', borderRadius: '8px', border: 'none',
                                    background: color, color: '#fff', fontWeight: 900,
                                    cursor: (!isAssessment && selected === null) ? 'not-allowed' : 'pointer',
                                    boxShadow: `0 6px 15px ${color}30`, fontSize: '14px', transition: 'all 0.2s',
                                    opacity: (!isAssessment && selected === null) ? 0.6 : 1
                                }}
                            >
                                {current === questions.length - 1
                                    ? (isAssessment ? 'Finish Assessment' : 'End Practice')
                                    : 'Next Question →'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Palette (Assessment Only) */}
                {isAssessment && (
                    <div style={{ width: '280px', flexShrink: 0 }}>
                        <div style={{
                            background: '#fff', borderRadius: '20px', padding: '20px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)',
                            position: 'sticky', top: '100px'
                        }}>
                            <h4 style={{ margin: '0 0 15px', fontSize: '16px', fontWeight: 800, color: '#1E293B', textAlign: 'center' }}>Question Palette</h4>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
                                {questions.map((_, idx) => {
                                    const isCurrent = current === idx;
                                    const isAnswered = responses[idx] !== undefined;
                                    const isSkipped = visited[idx] && !isAnswered && idx !== current;

                                    let bgColor = '#F8FAFC';
                                    let borderColor = '#E2E8F0';
                                    let textColor = '#64748B';

                                    if (isCurrent) {
                                        bgColor = '#EFF6FF';
                                        borderColor = color;
                                        textColor = color;
                                    } else if (isAnswered) {
                                        bgColor = '#F0FDF4';
                                        borderColor = '#22C55E';
                                        textColor = '#166534';
                                    } else if (isSkipped) {
                                        bgColor = '#FFF7ED';
                                        borderColor = '#F97316';
                                        textColor = '#9A3412';
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => navigateTo(idx)}
                                            style={{
                                                height: '36px', borderRadius: '8px', border: '2px solid',
                                                borderColor, background: bgColor, color: textColor,
                                                fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '13px'
                                            }}
                                        >
                                            {idx + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px', fontSize: '10px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#F0FDF4', border: '1px solid #22C55E' }} />
                                    <span style={{ color: '#475569', fontWeight: 700 }}>Answered</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#FFF7ED', border: '1px solid #F97316' }} />
                                    <span style={{ color: '#475569', fontWeight: 700 }}>Skipped</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#F8FAFC', border: '1px solid #E2E8F0' }} />
                                    <span style={{ color: '#475569', fontWeight: 700 }}>Not Visited</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#EFF6FF', border: `2px solid ${color}` }} />
                                    <span style={{ color: '#475569', fontWeight: 700 }}>Current</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setFinished(true)}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '12px', border: 'none',
                                    background: '#EF4444', color: '#fff', fontWeight: 900, cursor: 'pointer',
                                    boxShadow: '0 6px 15px rgba(239, 68, 68, 0.25)', textTransform: 'uppercase', fontSize: '13px',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Submit Assessment
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}





export default function Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkillIdx, setActiveSkillIdx] = useState(0);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    // Scroll to top when switching views (Learn, Practice, Assessment, List)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const skill = SKILLS[activeSkillIdx];

    if (view !== 'list') {
        const isExam = view === 'assessment';
        return (
            <div className="skills-page" style={{ paddingTop: '80px' }}>
                <nav className="intro-nav">
                    <button className="intro-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className="intro-nav-links">
                        <button className="intro-nav-link" onClick={() => navigate('/introduction-to-trigonometry/introduction')}>🌟 Intro</button>
                        <button className="intro-nav-link" onClick={() => navigate('/introduction-to-trigonometry/terminology')}>📖 Terminology</button>
                        <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>
                <div style={{ padding: '0 24px 60px' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: 'center' }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="alg-learn-grid">
                                <aside className="alg-learn-sidebar" style={{ background: '#fff', padding: 10, borderRadius: 20, border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10,
                                                border: '2px solid', borderColor: selectedLearnIdx === ri ? skill.color : 'transparent',
                                                background: selectedLearnIdx === ri ? skill.color + '10' : 'transparent',
                                                color: selectedLearnIdx === ri ? skill.color : '#64748b', transition: '0.2s', textAlign: 'left', fontWeight: 700, fontSize: 13
                                            }}>
                                            <div style={{ width: 18, height: 18, borderRadius: 6, background: selectedLearnIdx === ri ? skill.color : '#e2e8f0', color: selectedLearnIdx === ri ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{ri + 1}</div>
                                            {rule.title}
                                        </button>
                                    ))}
                                </aside>

                                <main className="alg-details-window" key={selectedLearnIdx} style={{ background: '#fff', borderRadius: 20, padding: '24px 32px', border: '1.5px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <h3 style={{ fontSize: 24, fontWeight: 900, color: skill.color, margin: 0 }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                        <div style={{ fontSize: 24 }}>{skill.icon}</div>
                                    </div>
                                    {skill.learn.concept && (
                                        <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '20px', fontWeight: 500, lineHeight: 1.5 }}>
                                            {skill.learn.concept}
                                        </p>
                                    )}

                                    <div style={{ background: '#f8fafc', padding: '16px 24px', borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 20, textAlign: 'center' }}>
                                        <div className="formula-text" style={{ fontSize: 28, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={skill.learn.rules[selectedLearnIdx].f.includes('$$') ? skill.learn.rules[selectedLearnIdx].f : `$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ fontSize: 11, textTransform: 'uppercase', color: '#64748b', letterSpacing: 1, marginBottom: 8 }}>Description</h4>
                                            <p style={{ fontSize: 14, lineHeight: 1.5, color: '#1e293b' }}>{skill.learn.rules[selectedLearnIdx].d}</p>
                                            <div style={{ marginTop: 16, padding: 14, background: skill.color + '08', borderRadius: 12, border: `1px solid ${skill.color}15`, fontSize: 13, color: '#475569' }}>
                                                <strong>💡 Pro Tip: </strong>{skill.learn.rules[selectedLearnIdx].tip}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: 11, textTransform: 'uppercase', color: skill.color, letterSpacing: 1, marginBottom: 8 }}>Example</h4>
                                            <div style={{ padding: 16, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                                        <button className="alg-btn-primary" style={{ background: skill.color, padding: '10px 24px', fontSize: 14 }} onClick={() => setView('practice')}>Start Practice →</button>
                                        <button className="alg-btn-secondary" style={{ padding: '10px 24px', fontSize: 14 }} onClick={() => setSelectedLearnIdx((selectedLearnIdx + 1) % skill.learn.rules.length)}>Next Rule</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : (
                        <QuizEngine
                            questions={view === 'practice' ? skill.practice : skill.assessment}
                            title={`${view === 'practice' ? 'Practice' : 'Assessment'}: ${skill.title}`}
                            onBack={() => setView('list')}
                            color={skill.color}
                            mode={view}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="skills-page">
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/introduction-to-trigonometry')}>← Back to Hub</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/introduction-to-trigonometry/introduction')}>🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/introduction-to-trigonometry/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '10px auto', padding: '0 16px' }}>
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: 4 }}>
                        Introduction to <span style={{ color: "var(--trig-primary)" }}>Trigonometry Skills</span>
                    </h1>
                </div>

                <div className="alg-skills-list">
                    {SKILLS.map((s, idx) => (
                        <div key={s.id} className="alg-skill-card">
                            <div className="alg-skill-info">
                                <div className="alg-skill-icon" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{s.subtitle}</div>
                                    <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: '#0f172a' }}>{s.title}</h3>
                                    <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>{s.desc}</p>
                                </div>
                            </div>
                            <div className="alg-skill-actions">
                                <button className="alg-btn-secondary" onClick={() => { setActiveSkillIdx(idx); setView('learn'); }}>Learn</button>
                                <button className="alg-btn-secondary" onClick={() => { setActiveSkillIdx(idx); setView('practice'); }}>Practice</button>
                                <button className="alg-btn-primary" style={{ background: s.color }} onClick={() => { setActiveSkillIdx(idx); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 12, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                        Completed all sessions? You're a <span style={{ color: 'var(--trig-primary)' }}>Trigonometry Master!</span> 🧗‍♂️
                    </p>
                </div>
            </div>
        </div>
    );
}

