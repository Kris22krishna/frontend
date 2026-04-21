import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../SurfaceAreasAndVolumes/surface-volumes.css';
import '../../../SurfaceAreasAndVolumes/hide-footer.css';
import MathRenderer from '../../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import {
    generateGroupedDataQuestions,
    generateDirectMeanQuestions,
    generateAssumedMeanQuestions,
    generateStepDeviationQuestions,
    generateModeQuestions,
    generateMedianQuestions,
    generateOgiveQuestions
} from './questionGenerators';

// ─── Shared Quiz Engine ────────────────────────────────────────────────────
function QuizEngine({ questions, title, onBack, color, mode = 'practice', nodeId }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [responses, setResponses] = useState({});
    const [finished, setFinished] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [visited, setVisited] = useState({ 0: true });

    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);

    const isAssessment = mode === 'assessment';
    const q = questions[current];

    useEffect(() => {
        if (!nodeId) return;
        startSession({ nodeId, sessionType: mode === 'assessment' ? 'assessment' : 'practice' });
        answersPayload.current = isAssessment ? new Array(questions.length).fill(null) : [];
        isFinishedRef.current = false;
        return () => {
            if (!isAssessment && !isFinishedRef.current && answersPayload.current.length > 0)
                abandonSession({ answersPayload: answersPayload.current.filter(Boolean), totalQuestions: questions.length });
        };
    }, [nodeId, mode]);

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

    const handleSelect = async (optIdx) => {
        if (finished) return;
        if (!isAssessment && selected !== null) return;
        const isCorrect = optIdx === q.correct;
        setSelected(optIdx);
        setResponses(prev => ({ ...prev, [current]: { selected: optIdx, isCorrect } }));
        const answerData = { question_index: current + 1, answer_json: { selected: optIdx }, is_correct: isCorrect ? 1.0 : 0.0, marks_awarded: isCorrect ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
        answersPayload.current[current] = answerData;
        await logAnswer({ questionIndex: answerData.question_index, answerJson: answerData.answer_json, isCorrect: answerData.is_correct });
    };

    const handleFinishAssess = async () => {
        isFinishedRef.current = true;
        setFinished(true);
        const payload = answersPayload.current.filter(Boolean);
        if (nodeId) await finishSession({ totalQuestions: questions.length, questionsAnswered: payload.length, answersPayload: payload });
    };

    const handleNext = async () => {
        if (current + 1 < questions.length) {
            const nextIdx = current + 1;
            setCurrent(nextIdx);
            setSelected(responses[nextIdx]?.selected ?? null);
            setVisited(prev => ({ ...prev, [nextIdx]: true }));
        } else {
            await handleFinishAssess();
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
        setCurrent(0); setSelected(null); setResponses({}); setFinished(false); setTimeElapsed(0); setVisited({ 0: true });
        if (nodeId) {
            startSession({ nodeId, sessionType: mode === 'assessment' ? 'assessment' : 'practice' });
            answersPayload.current = isAssessment ? new Array(questions.length).fill(null) : [];
            isFinishedRef.current = false;
        }
    };

    if (finished) {
        const totalCorrect = Object.values(responses).filter(r => r.isCorrect).length;
        const scorePct = Math.round((totalCorrect / questions.length) * 100);

        if (!isAssessment) {
            return (
                <div className="practice-report-card" style={{ maxWidth: '600px', margin: 'clamp(20px,5vh,60px) auto', padding: 'clamp(20px,5%,40px)', textAlign: 'center', background: '#fff', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                    <div style={{ width: '180px', height: '180px', margin: '0 auto 30px', borderRadius: '50%', background: `conic-gradient(${color} ${scorePct}%, #f1f5f9 ${scorePct}%)`, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: '42px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{totalCorrect}</div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', marginTop: '4px' }}>out of {questions.length}</div>
                        </div>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: `${color}10`, color, borderRadius: '50px', fontSize: '14px', fontWeight: 800, marginBottom: '24px' }}>⏱️ Time: {formatTime(timeElapsed)}</div>
                    <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>{scorePct === 100 ? '🚀 Perfect!' : scorePct >= 70 ? '💪 Great Job!' : '✨ Keep Going!'}</h2>
                    <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '40px', fontWeight: 500 }}>{scorePct === 100 ? "You've mastered this skill!" : "Review and try again for 100%."}</p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <button className="alg-btn-primary" style={{ background: color, padding: '14px 32px', borderRadius: '16px', fontSize: '16px' }} onClick={resetQuiz}>Try Again</button>
                        <button className="alg-btn-secondary" style={{ padding: '14px 32px', borderRadius: '16px', fontSize: '16px', border: '2px solid #e2e8f0' }} onClick={onBack}>Return to Skills</button>
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
                    {[['Score', `${scorePct}%`, '#3B82F6', '#EFF6FF', '#DBEAFE'], ['Correct', totalCorrect, '#22C55E', '#F0FDF4', '#DCFCE7'], ['Wrong', questions.length - totalCorrect, '#EF4444', '#FEF2F2', '#FEE2E2'], ['Time', formatTime(timeElapsed), '#64748B', '#F8FAFC', '#E2E8F0']].map(([label, val, c, bg, border]) => (
                        <div key={label} style={{ background: bg, border: `1px solid ${border}`, padding: '15px', borderRadius: '16px', textAlign: 'center' }}>
                            <span style={{ color: c, fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>{label}</span>
                            <div style={{ fontSize: '24px', fontWeight: 900, color: c }}>{val}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1E293B', marginBottom: '20px' }}>Detailed Review</h2>
                    {questions.map((question, idx) => {
                        const resp = responses[idx];
                        const isCorrect = resp?.isCorrect;
                        return (
                            <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: `2px solid ${isCorrect ? '#DCFCE730' : '#FEE2E230'}`, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: isCorrect ? '#22C55E' : '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>{idx + 1}</span>
                                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B' }}><MathRenderer text={question.question} /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', marginLeft: '40px' }}>
                                    <div style={{ padding: '15px', borderRadius: '12px', background: isCorrect ? '#F0FDF4' : '#FEF2F2' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: isCorrect ? '#22C55E' : '#EF4444', display: 'block', marginBottom: '4px' }}>Your Answer</span>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: isCorrect ? '#14532D' : '#7F1D1D' }}>{resp ? <MathRenderer text={question.options[resp.selected]} /> : 'Skipped'}</div>
                                    </div>
                                    <div style={{ padding: '15px', borderRadius: '12px', background: '#F0FDF4', border: '1px solid #DCFCE7' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#22C55E', display: 'block', marginBottom: '4px' }}>Correct Answer</span>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#14532D' }}><MathRenderer text={question.options[question.correct]} /></div>
                                    </div>
                                </div>
                                <div style={{ marginLeft: '40px', padding: '20px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                    <h4 style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solution Strategy</h4>
                                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}><MathRenderer text={question.explanation} /></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button className="alg-btn-primary" onClick={onBack} style={{ padding: '15px 40px', background: color }}>Return to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-engine-exam" style={{ maxWidth: isAssessment ? '1300px' : '900px', margin: '0 auto', padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div>
                    <span style={{ fontSize: '11px', fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                        {isAssessment ? 'Final Assessment' : 'Practice Mode'}
                    </span>
                    <h2 style={{ margin: '0', fontSize: '22px', fontWeight: 900, color: '#1E293B' }}>
                        {title.includes(': ') ? title.split(': ')[1] : title}
                    </h2>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button 
                        onClick={onBack} 
                        style={{ padding: '8px 16px', borderRadius: '12px', border: '2px solid #E2E8F0', background: '#fff', color: '#64748B', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', fontSize: '14px' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#475569'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#64748B'; }}
                    >
                        Exit
                    </button>
                    {isAssessment && (
                        <div style={{ background: '#fff', padding: '8px 20px', borderRadius: '12px', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                            <span style={{ fontSize: '20px' }}>⏱️</span>
                            <span style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'Outfit, monospace', color: '#1E293B' }}>{formatTime(timeElapsed)}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="quiz-main-layout" style={{ display: 'flex', gap: '20px', flexDirection: isAssessment ? 'row' : 'column', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, width: '100%' }}>
                    <div className="alg-quiz-card" style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(16px,4%,30px)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)', minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '8px', background: `${color}15`, color, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', width: 'fit-content' }}>
                                Question {current + 1} of {questions.length}
                            </div>
                            {q.difficulty && (
                                <div style={{ padding: '3px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5,
                                    background: q.difficulty === 'easy' ? '#f0fdf4' : q.difficulty === 'medium' ? '#fefce8' : '#fef2f2',
                                    color: q.difficulty === 'easy' ? '#16a34a' : q.difficulty === 'medium' ? '#ca8a04' : '#dc2626'
                                }}>{q.difficulty === 'easy' ? '⭐ Easy' : q.difficulty === 'medium' ? '⭐⭐ Medium' : '⭐⭐⭐ Hard'}</div>
                            )}
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', lineHeight: 1.4, marginBottom: '12px' }}>
                            <MathRenderer text={q.question} />
                        </h3>
                        {q.diagram && (
                            <div style={{ marginBottom: '16px', background: `${color}06`, borderRadius: '14px', padding: '16px 12px', border: `1px solid ${color}20` }}>
                                {q.diagram(color)}
                            </div>
                        )}
                        <div className="quiz-options-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                            {q.options.map((opt, i) => {
                                const isCorrect = i === q.correct;
                                const isSelected = selected === i;
                                const showFeedback = !isAssessment && selected !== null;
                                let borderColor = '#f1f5f9', bgColor = '#fff', dotColor = '#CBD5E1';
                                if (showFeedback) {
                                    if (isCorrect) { borderColor = '#10b981'; bgColor = '#f0fdf4'; dotColor = '#10b981'; }
                                    else if (isSelected) { borderColor = '#ef4444'; bgColor = '#fef2f2'; dotColor = '#ef4444'; }
                                } else if (isSelected) { borderColor = color; bgColor = `${color}05`; dotColor = color; }
                                return (
                                    <button key={i} onClick={() => handleSelect(i)} disabled={showFeedback}
                                        style={{ padding: '14px 18px', borderRadius: '14px', border: '2px solid', borderColor, background: bgColor, textAlign: 'left', cursor: showFeedback ? 'default' : 'pointer', transition: 'all 0.2s', fontSize: '15px', fontWeight: isSelected ? 800 : 600, color: isSelected ? (showFeedback ? (isCorrect ? '#065f46' : '#991b1b') : color) : '#475569', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid', borderColor: (isSelected || (showFeedback && isCorrect)) ? dotColor : '#CBD5E1', background: (isSelected || (showFeedback && isCorrect)) ? dotColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {(isSelected || (showFeedback && isCorrect)) && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                                        </div>
                                        <MathRenderer text={opt} />
                                    </button>
                                );
                            })}
                        </div>
                        {!isAssessment && selected !== null && (
                            <div style={{ marginTop: '5px', marginBottom: '15px', padding: '15px 20px', borderRadius: '15px', background: '#F8FAFC', borderLeft: `5px solid ${color}`, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                <h4 style={{ margin: '0 0 5px', fontSize: '11px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>💡 Solution Strategy</h4>
                                <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}><MathRenderer text={q.explanation} /></div>
                            </div>
                        )}
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '2px dashed #f1f5f9' }}>
                            <button onClick={handlePrev} disabled={current === 0} style={{ padding: '10px 20px', borderRadius: '10px', border: '2px solid #E2E8F0', background: '#fff', color: '#64748B', fontWeight: 800, cursor: current === 0 ? 'not-allowed' : 'pointer', opacity: current === 0 ? 0.5 : 1, transition: 'all 0.2s', fontSize: '14px' }}>← Previous</button>
                            <button onClick={handleNext} disabled={!isAssessment && selected === null} style={{ padding: '10px 32px', borderRadius: '10px', border: 'none', background: color, color: '#fff', fontWeight: 900, cursor: (!isAssessment && selected === null) ? 'not-allowed' : 'pointer', boxShadow: `0 6px 15px ${color}30`, fontSize: '15px', transition: 'all 0.2s', opacity: (!isAssessment && selected === null) ? 0.6 : 1 }}>
                                {current === questions.length - 1 ? (isAssessment ? 'Finish Assessment' : 'End Practice') : 'Next Question →'}
                            </button>
                        </div>
                    </div>
                </div>
                {isAssessment && (
                    <div style={{ width: '280px', flexShrink: 0 }}>
                        <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
                            <h4 style={{ margin: '0 0 15px', fontSize: '16px', fontWeight: 800, color: '#1E293B', textAlign: 'center' }}>Question Palette</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
                                {questions.map((_, idx) => {
                                    const isCurrent = current === idx;
                                    const isAnswered = responses[idx] !== undefined;
                                    const isSkipped = visited[idx] && !isAnswered && idx !== current;
                                    let bgColor = '#F8FAFC', borderColor = '#E2E8F0', textColor = '#64748B';
                                    if (isCurrent) { bgColor = '#EFF6FF'; borderColor = color; textColor = color; }
                                    else if (isAnswered) { bgColor = '#F0FDF4'; borderColor = '#22C55E'; textColor = '#166534'; }
                                    else if (isSkipped) { bgColor = '#FFF7ED'; borderColor = '#F97316'; textColor = '#9A3412'; }
                                    return <button key={idx} onClick={() => navigateTo(idx)} style={{ height: '36px', borderRadius: '8px', border: '2px solid', borderColor, background: bgColor, color: textColor, fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>{idx + 1}</button>;
                                })}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px', fontSize: '10px', padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
                                {[['#F0FDF4', '#22C55E', 'Answered'], ['#FFF7ED', '#F97316', 'Skipped'], ['#F8FAFC', '#E2E8F0', 'Not Visited'], ['#EFF6FF', color, 'Current']].map(([bg, border, label]) => (
                                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: bg, border: `1px solid ${border}` }} />
                                        <span style={{ color: '#475569', fontWeight: 700 }}>{label}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleFinishAssess} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: '#EF4444', color: '#fff', fontWeight: 900, cursor: 'pointer', boxShadow: '0 6px 15px rgba(239,68,68,0.25)', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '0.5px' }}>Submit Assessment</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Skills Data ───────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'grouped-data-setup',
        nodeId: 'a4101016-0001-0000-0000-000000000000',
        title: 'Grouped Data Setup',
        subtitle: 'Skill 1 · Foundation',
        icon: '📊',
        color: '#0891b2',
        desc: 'Understand frequency tables, class intervals, class marks, and cumulative frequency.',
        generator: generateGroupedDataQuestions,
        learn: {
            concept: 'Before performing any calculations, you must set up your grouped data correctly. Finding the class marks (xi) is often the mandatory first step.',
            rules: [
                { title: 'Class Mark / Midpoint', f: 'x_i = \\frac{\\text{Lower} + \\text{Upper}}{2}', d: 'The class mark represents the entire class interval. All calculations assume that the frequency of this class is concentrated at xi.', ex: 'Class 20-30: x_i = (20+30)/2 = 25', tip: 'If class width (h) is constant, you can just find the first xi and keep adding h!' },
                { title: 'Cumulative Frequency', f: 'cf_k = \\Sigma_{i=1}^k f_i', d: 'The running total of frequencies. Required for median and ogives.', ex: 'Frequencies: 3, 5, 2 → CF: 3, 8, 10', tip: 'The last value in the CF column is ALWAYS equal to the total frequency (N or Σf_i).' }
            ]
        }
    },
    {
        id: 'mean-direct',
        nodeId: 'a4101016-0002-0000-0000-000000000000',
        title: 'Mean — Direct Method',
        subtitle: 'Skill 2 · Averages',
        icon: '✖️',
        color: '#059669',
        desc: 'Calculate the average using the direct formula Σfixi / Σfi.',
        generator: generateDirectMeanQuestions,
        learn: {
            concept: 'The direct method is the most straightforward way to calculate mean, best used when the values of fi and xi are small.',
            rules: [
                { title: 'Direct Rule', f: '\\bar{x} = \\frac{\\Sigma f_i x_i}{\\Sigma f_i}', d: 'Multiply each frequency by its class mark, add them all up, and divide by the total number of observations.', ex: 'Σfixi = 150, Σfi = 10 → Mean = 15', tip: 'Watch out for basic multiplication errors. Drawing a neat table with clear columns is half the battle.' }
            ]
        }
    },
    {
        id: 'mean-assumed',
        nodeId: 'a4101016-0003-0000-0000-000000000000',
        title: 'Mean — Assumed Mean',
        subtitle: 'Skill 3 · Averages',
        icon: '🎯',
        color: '#7c3aed',
        desc: 'Simplify large datasets by shifting numbers with an assumed mean.',
        generator: generateAssumedMeanQuestions,
        learn: {
            concept: 'When class marks (xi) are large numbers, multiplying them by fi is tedious. We simplify by subtracting an assumed mean from each.',
            rules: [
                { title: 'Deviation Shift', f: 'd_i = x_i - a', d: 'Choose some central xi to be the assumed mean "a". Subtract "a" from every xi to get much smaller deviation values.', ex: 'a=50. xi=30, 40, 50, 60 → di= -20, -10, 0, 10', tip: 'Pick the middle value of xi as "a". It will make half your di negative and half positive, cancelling them out nicely.' },
                { title: 'Assumed Rule', f: '\\bar{x} = a + \\frac{\\Sigma f_i d_i}{\\Sigma f_i}', d: 'Calculate the average of the deviations, then add your assumed mean "a" back to the result.', ex: 'a=50, Σfidi= -20, Σfi=10 → Mean = 50 + (-2) = 48', tip: 'Remember to ADD "a" back at the end! It is easy to forget and submit the mean deviation instead of the actual mean.' }
            ]
        }
    },
    {
        id: 'mean-step-deviation',
        nodeId: 'a4101016-0004-0000-0000-000000000000',
        title: 'Mean — Step-Deviation',
        subtitle: 'Skill 4 · Averages',
        icon: '📏',
        color: '#0369a1',
        desc: 'The easiest calculation method when class intervals have uniform width.',
        generator: generateStepDeviationQuestions,
        learn: {
            concept: 'If all your intervals are the same width (h), you can divide the deviations by h to shrink the numbers down to simple integers.',
            rules: [
                { title: 'Step Shrink', f: 'u_i = \\frac{x_i - a}{h}', d: 'After subtracting the assumed mean, divide by the class width. Your ui values will usually become basic integers.', ex: 'di= -20, -10, 0... h=10 → ui= -2, -1, 0, 1, 2', tip: 'If you set "a" correctly, your ui column will literally just be ...-2, -1, 0, 1, 2...' },
                { title: 'Step-Deviation Rule', f: '\\bar{x} = a + h \\left( \\frac{\\Sigma f_i u_i}{\\Sigma f_i} \\right)', d: 'Average the tiny ui values, multiply by h (un-shrink), then add "a" (un-shift).', ex: 'a=50, h=10, avg(ui)=-0.2 → Mean= 50 + 10(-0.2) = 48', tip: 'Order of operations is critical. Compute the fraction, then multiply by h, then add to a.' }
            ]
        }
    },
    {
        id: 'mode',
        nodeId: 'a4101016-0005-0000-0000-000000000000',
        title: 'Mode Formula',
        subtitle: 'Skill 5 · Most Frequent',
        icon: '🏔️',
        color: '#d97706',
        desc: 'Identify the modal class and apply the mode formula.',
        generator: generateModeQuestions,
        learn: {
            concept: 'Mode is the most common value. In grouped data, we find the busiest class and pin-point the mode inside it based on the neighboring classes.',
            rules: [
                { title: 'Modal Class', f: 'f_1 = \\text{highest frequency}', d: 'The class with the highest frequency is your Modal Class. This gives you your lower limit (l) and class width (h).', ex: 'Frequencies 5, 12, 7. Modal class is the one with 12.', tip: 'Before writing the formula, clearly list out: l, h, f0, f1, f2.' },
                { title: 'Mode Rule', f: '\\text{Mode} = l + \\left( \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\right) \\times h', d: 'f1 is modal frequency. f0 is previous. f2 is next. The fractional part shifts the mode away from the center toward the bigger neighbor.', ex: 'f1=12, f0=5, f2=7', tip: 'If f1 is the very first class, then f0 = 0. Similarly, if f1 is the last class, f2 = 0.' }
            ]
        }
    },
    {
        id: 'median',
        nodeId: 'a4101016-0006-0000-0000-000000000000',
        title: 'Median Formula',
        subtitle: 'Skill 6 · Central Value',
        icon: '⚖️',
        color: '#dc2626',
        desc: 'Find the middle point of the data using cumulative frequency.',
        generator: generateMedianQuestions,
        learn: {
            concept: 'Median splits the data exactly in half. You need to line up all observations (using cumulative frequency) to find where the middle value sits.',
            rules: [
                { title: 'Median Class Focus', f: '\\frac{n}{2}', d: 'Find Total Frequency (n) and halve it. Then, look down your CF column. The FIRST class where CF is ≥ n/2 is your Median Class.', ex: 'n=50 → n/2=25. CFs are 10, 22, 35. Median class is the one hitting 35.', tip: 'DO NOT USE (n+1)/2. For grouped data formulas, strictly use n/2.' },
                { title: 'Median Rule', f: '\\text{Median} = l + \\left( \\frac{\\frac{n}{2} - cf}{f} \\right) \\times h', d: 'Here, f is the frequency OF the median class, but cf is the cumulative frequency of the class BEFORE it.', ex: 'cf matches the 22 in our example, f is 35-22=13', tip: 'The fraction inside the bracket tells you what percentage "into" the median class you need to step.' }
            ]
        }
    },
    {
        id: 'ogive',
        nodeId: 'a4101016-0007-0000-0000-000000000000',
        title: 'Ogives & Graphical Median',
        subtitle: 'Skill 7 · Visualisation',
        icon: '📈',
        color: '#6d28d9',
        desc: 'Read and interpret less-than/more-than ogives to find the median visually.',
        generator: generateOgiveQuestions,
        learn: {
            concept: 'Ogives are smooth curves plotting cumulative frequency. They are a powerful visual tool for instantly estimating the median and quartiles.',
            rules: [
                { title: 'Less-than vs More-than', f: 'x = \\text{boundary}, y = cf', d: 'A Less-than Ogive plots UPPER limits vs "less-than" CF (starts at 0, ends at n). A More-than Ogive plots LOWER limits vs "more-than" CF (starts at n, ends at 0).', ex: 'Less-than: (10, 5), (20, 15). More-than: (0, 50), (10, 45).', tip: 'Less-than slopes UPWARDS. More-than slopes DOWNWARDS.' },
                { title: 'Visual Median', f: '\\text{Intersection} \\Rightarrow \\text{Median}', d: 'If you draw both ogives on the same graph, they behave like an X. Drop a perpendicular from their intersection point to the x-axis — that value is exactly the Median.', ex: 'Intersection at (24.5, 25). Median = 24.5', tip: 'Alternatively, with just one ogive, locate n/2 on the y-axis, draw horizontal to curve, then drop down to x-axis.' }
            ]
        }
    }
];

export default function Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkillIdx, setActiveSkillIdx] = useState(0);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);
    const [sessionKey, setSessionKey] = useState(0); // bump to regenerate questions

    useEffect(() => { window.scrollTo(0, 0); }, [view]);

    React.useEffect(() => {
        document.body.classList.add('hide-main-footer');
        return () => document.body.classList.remove('hide-main-footer');
    }, []);

    const skill = SKILLS[activeSkillIdx];

    // Generate fresh dynamic questions once per session (or when sessionKey changes)
    const generatedPractice = useMemo(() => {
        if (skill.generator) return skill.generator('practice');
        return skill.practice;
    }, [activeSkillIdx, sessionKey]);

    const generatedAssessment = useMemo(() => {
        if (skill.generator) return skill.generator('assessment');
        return skill.assessment;
    }, [activeSkillIdx, sessionKey]);

    if (view !== 'list') {
        return (
            <div className="skills-page" style={{ paddingTop: '80px' }}>
                <nav className="intro-nav">
                    <button className="intro-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className="intro-nav-links">
                        <button className="intro-nav-link" onClick={() => navigate('/statistics/introduction')}>🌟 Intro</button>
                        <button className="intro-nav-link" onClick={() => navigate('/statistics/terminology')}>📖 Terminology</button>
                        <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>
                <div style={{ padding: '0 24px 60px' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, justifyContent: 'center' }}>
                                <div style={{ width: 50, height: 50, borderRadius: 14, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>
                            <div className="alg-learn-grid">
                                <aside className="alg-learn-sidebar" style={{ background: '#fff', padding: 12, borderRadius: 24, border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, border: '2px solid', borderColor: selectedLearnIdx === ri ? skill.color : 'transparent', background: selectedLearnIdx === ri ? skill.color + '10' : 'transparent', color: selectedLearnIdx === ri ? skill.color : '#64748b', transition: '0.2s', textAlign: 'left', fontWeight: 700 }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 6, background: selectedLearnIdx === ri ? skill.color : '#e2e8f0', color: selectedLearnIdx === ri ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{ri + 1}</div>
                                            <MathRenderer text={rule.title} />
                                        </button>
                                    ))}
                                </aside>
                                <main className="alg-details-window" key={selectedLearnIdx} style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1.5px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                                        <h3 style={{ fontSize: 32, fontWeight: 900, color: skill.color, margin: 0 }}><MathRenderer text={skill.learn.rules[selectedLearnIdx].title} /></h3>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: 32, borderRadius: 20, border: '1px solid #e2e8f0', marginBottom: 32, textAlign: 'center' }}>
                                        <div className="formula-text" style={{ fontSize: 36, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                                        <div>
                                            <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: '#64748b', letterSpacing: 1, marginBottom: 12 }}>Description</h4>
                                            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#1e293b' }}><MathRenderer text={skill.learn.rules[selectedLearnIdx].d} /></p>
                                            <div style={{ marginTop: 24, padding: 20, background: skill.color + '08', borderRadius: 16, border: `1px solid ${skill.color}15`, fontSize: 14, color: '#475569' }}>
                                                <strong>💡 Pro Tip: </strong><MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: skill.color, letterSpacing: 1, marginBottom: 12 }}>Example</h4>
                                            <div style={{ padding: 24, background: '#f8fafc', borderRadius: 20, border: '1px solid #e2e8f0' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className="alg-btn-primary" style={{ background: skill.color }} onClick={() => setView('practice')}>Start Practice →</button>
                                        <button className="alg-btn-secondary" onClick={() => setSelectedLearnIdx((selectedLearnIdx + 1) % skill.learn.rules.length)}>Next Rule</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : (
                        <QuizEngine
                            questions={view === 'practice' ? generatedPractice : generatedAssessment}
                            title={`${view === 'practice' ? 'Practice' : 'Assessment'}: ${skill.title}`}
                            onBack={() => { setView('list'); setSessionKey(k => k + 1); }}
                            color={skill.color}
                            mode={view}
                            nodeId={skill.nodeId}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="skills-page">
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/statistics')}>← Back to Hub</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/statistics/introduction')}>🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/statistics/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>
                        Statistics <span style={{ color: 'var(--sv-primary)' }}>Skills</span>
                    </h1>
                    <p style={{ color: '#64748b', fontSize: 18, fontWeight: 500 }}>Master the art of summarizing data — compute the Mean, Mode, Median and draw Ogives.</p>
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

                <div style={{ marginTop: 60, textAlign: 'center' }}>
                    <p style={{ fontSize: 15, color: '#64748b', fontWeight: 600 }}>
                        Completed all sessions? You're a <span style={{ color: 'var(--sv-primary)' }}>Data Master!</span> 📊
                    </p>
                </div>
            </div>
        </div>
    );
}
