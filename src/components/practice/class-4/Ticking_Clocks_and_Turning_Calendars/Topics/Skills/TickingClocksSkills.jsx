import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { SKILLS, LEARN_CONTENT, PRACTICE_QS, ASSESS_QS } from './skillsData';
import ReadingClockTime from './InteractiveModules/ReadingClockTime';
import InteractiveCalendar from './InteractiveModules/InteractiveCalendar';
import AmPmInteractive from './InteractiveModules/AmPmInteractive';
import TimeDurationTimeline from './InteractiveModules/TimeDurationTimeline';
import LeapYearInteractive from './InteractiveModules/LeapYearInteractive';
import TimeWordProblemInteractive from './InteractiveModules/TimeWordProblemInteractive';
import PracticeReportModal from './InteractiveModules/PracticeReportModal';
import AssessReportModal from './InteractiveModules/AssessReportModal';
import '../../ticking-clocks.css';

function QuizEngine({ questions, title, color, onBack }) {
    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    // New states for tracking history and time
    const [history, setHistory] = useState([]);
    const [qStartTime, setQStartTime] = useState(Date.now());

    const cur = questions[idx];

    const pick = (i) => {
        const isCorrect = i === cur.ans;
        if (isCorrect) setScore(s => s + 1);

        // Calculate time taken
        const timeTakenMs = Date.now() - qStartTime;
        const timeTakenRoundedStr = (timeTakenMs / 1000).toFixed(1) + "s";

        setHistory(prev => [...prev, {
            q: cur.q,
            choice: cur.opts[i],
            correctOpt: cur.opts[cur.ans],
            isCorrect,
            expl: cur.expl || "No explanation provided.",
            timeTaken: timeTakenRoundedStr
        }]);

        if (idx + 1 < questions.length) {
            setIdx(currIdx => currIdx + 1);
            setQStartTime(Date.now());
        } else {
            setDone(true);
        }
    };

    const retry = () => { setIdx(0); setScore(0); setDone(false); setHistory([]); setQStartTime(Date.now()); };

    if (done) return (
        <div style={{ padding: 20 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ fontSize: 60 }}>{score >= 8 ? '🏆' : score >= 5 ? '🌟' : '💪'}</div>
                <h2 style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 900, color: '#0f172a' }}>{title} — Assessment Complete!</h2>
                <p style={{ color: '#64748b', fontSize: 18 }}>Score: <span style={{ color, fontWeight: 900 }}>{score}/{questions.length}</span></p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                    <button className="tc-btn-primary" onClick={retry}>Try Again</button>
                    <button className="tc-btn-secondary" onClick={onBack}>Back to Skills</button>
                </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 32 }}>
                <h3 style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 24, textAlign: 'center' }}>Detailed Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {history.map((h, i) => (
                        <div key={i} style={{ padding: 20, borderRadius: 16, border: '2px solid', borderColor: h.isCorrect ? '#10b981' : '#ef4444', background: h.isCorrect ? '#f0fdf4' : '#fef2f2' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' }}>
                                <p style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#0f172a' }}>{i + 1}. {h.q}</p>
                                <span style={{ background: '#fff', padding: '4px 10px', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#64748b', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>⏱️ {h.timeTaken}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>Your Answer:</span>
                                    <span style={{ fontSize: 16, fontWeight: 700, color: h.isCorrect ? '#059669' : '#dc2626' }}>{h.choice}</span>
                                    {h.isCorrect ? <span style={{ fontSize: 16 }}>✅</span> : <span style={{ fontSize: 16 }}>❌</span>}
                                </div>
                                {!h.isCorrect && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>Correct Answer:</span>
                                        <span style={{ fontSize: 16, fontWeight: 700, color: '#059669' }}>{h.correctOpt}</span>
                                    </div>
                                )}
                            </div>
                            <div style={{ background: '#fff', padding: 14, borderRadius: 12, fontSize: 14, color: '#475569', border: '1px solid #e2e8f0' }}>
                                <strong style={{ color: h.isCorrect ? '#059669' : '#dc2626' }}>Explanation: </strong>
                                {h.expl}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase' }}>Q {idx + 1}/{questions.length}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Score: {score}</div>
            </div>
            <div style={{ height: 6, background: '#f1f5f9', borderRadius: 50, marginBottom: 24, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((idx + 1) / questions.length) * 100}%`, background: color, borderRadius: 50, transition: 'width 0.3s' }} />
            </div>
            <p style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.5, marginBottom: 24 }}>{cur.q}</p>
            <div style={{ display: 'grid', gridTemplateColumns: cur.opts.length <= 2 ? '1fr 1fr' : '1fr 1fr', gap: 12, marginBottom: 24 }}>
                {cur.opts.map((o, i) => (
                    <button
                        key={i}
                        onClick={() => pick(i)}
                        style={{ padding: '14px 20px', borderRadius: 14, border: '2px solid #e2e8f0', background: '#fff', color: '#0f172a', fontWeight: 600, fontSize: 16, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}08`; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; }}
                    >
                        {o}
                    </button>
                ))}
            </div>
        </div>
    );
}

function LearnView({ skill, onBack }) {
    const content = LEARN_CONTENT[skill.id];
    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <button className="tc-btn-secondary" onClick={onBack} style={{ marginBottom: 20, padding: '8px 20px', fontSize: 13 }}>← Back to Skills</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{skill.icon}</div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: skill.color, letterSpacing: 1 }}>Learn</div>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: 26, fontWeight: 900, margin: 0, color: skill.color }}>{content.title}</h2>
                </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: `1px solid ${skill.color}15`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Key Points</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                    {content.points.map((p, i) => (
                        <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 15, lineHeight: 1.6, color: '#334155' }}>
                            <span style={{ width: 28, height: 28, borderRadius: 8, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: skill.color, flexShrink: 0 }}>{i + 1}</span>
                            {p}
                        </li>
                    ))}
                </ul>
                <div style={{ background: `${skill.color}08`, padding: 16, borderRadius: 14, borderLeft: `4px solid ${skill.color}` }}>
                    <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: skill.color, marginBottom: 6 }}>Example</div>
                    <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>{content.example}</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button className="tc-btn-primary" onClick={onBack}>Back to Skills</button>
            </div>
        </div>
    );
}

export default function TickingClocksSkills() {
    const navigate = useNavigate();
    const [mode, setMode] = useState('menu'); // 'menu', 'learn', 'practice', 'assess'
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [reportData, setReportData] = useState(null);

    const onBack = () => { setMode('menu'); setSelectedSkill(null); setReportData(null); };

    const handleReportComplete = (answers, timeElapsed, questions) => {
        let correctAnswers = 0;
        let totalQuestions = questions ? questions.length : 20;
        let reviewData = [];

        if (mode === 'assess' && questions && answers) {
            questions.forEach((q, i) => {
                const optsArray = q.options || q.opts || null;
                const correctIdx = q.correctIndex !== undefined ? q.correctIndex : q.ans;

                // Calculate isCorrect because Assessment mode defers grading
                let isCorrect = answers[i]?.isCorrect;
                if (isCorrect === undefined && answers[i]?.selected !== undefined && answers[i]?.selected !== null) {
                    isCorrect = answers[i].selected === correctIdx;
                }

                if (isCorrect) correctAnswers++;

                let selText = null;
                let corrText = null;

                if (optsArray) {
                    if (answers[i]?.selected !== undefined) selText = optsArray[answers[i].selected];
                    if (correctIdx !== undefined) corrText = optsArray[correctIdx];
                }

                reviewData.push({
                    questionText: q.text || q.q || null,
                    isCorrect: !!isCorrect,
                    selected: answers[i]?.selected,
                    selectedText: selText,
                    correctIndex: correctIdx,
                    correctText: corrText,
                    timeSpent: answers[i]?.timeSpent || 0,
                    explanation: q.explanation || q.expl || "No step-by-step logic specifically attached. Check the concept overview.",
                    options: optsArray,
                });
            });
        } else if (mode === 'practice' && answers) {
            // Usually passed directly as an array of history objects from QuizEngine
            if (Array.isArray(answers)) {
                correctAnswers = answers.filter(a => a.isCorrect).length;
                totalQuestions = answers.length;
            } else {
                correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
                totalQuestions = questions ? questions.length : Object.keys(answers).length;
            }
        }

        setReportData({
            timeTaken: timeElapsed,
            correctAnswers: correctAnswers,
            totalQuestions: totalQuestions,
            reviewData: reviewData
        });
    };

    const renderLearn = () => {
        const skillInfo = SKILLS.find(s => s.id === selectedSkill);
        const content = LEARN_CONTENT[selectedSkill];
        return (
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px' }}>
                <button className="tc-btn-secondary" onClick={onBack} style={{ marginBottom: 20, padding: '8px 20px', fontSize: 13 }}>← Back to Skills</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: `${skillInfo.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{skillInfo.icon}</div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: skillInfo.color, letterSpacing: 1 }}>Learn</div>
                        <h2 style={{ fontFamily: 'Outfit', fontSize: 26, fontWeight: 900, margin: 0, color: skillInfo.color }}>{content.title}</h2>
                    </div>
                </div>
                <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: `1px solid ${skillInfo.color}15`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Key Points</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                        {content.points.map((p, i) => (
                            <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 15, lineHeight: 1.6, color: '#334155' }}>
                                <span style={{ width: 28, height: 28, borderRadius: 8, background: `${skillInfo.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: skillInfo.color, flexShrink: 0 }}>{i + 1}</span>
                                {p}
                            </li>
                        ))}
                    </ul>
                    <div style={{ background: `${skillInfo.color}08`, padding: 16, borderRadius: 14, borderLeft: `4px solid ${skillInfo.color}` }}>
                        <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: skillInfo.color, marginBottom: 6 }}>Example</div>
                        <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6, marginBottom: 12 }}>{content.example}</p>

                        {/* Visual Injection based on skill.id */}
                        {skillInfo.id === 1 && (
                            <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ fontSize: 48 }}>🕒</div>
                            </div>
                        )}
                        {skillInfo.id === 2 && (
                            <div style={{ display: 'flex', gap: 10, background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', justifyContent: 'center' }}>
                                <div style={{ background: '#e0f2fe', padding: '10px 20px', borderRadius: '8px', color: '#0369a1', fontWeight: 'bold' }}>☀️ AM</div>
                                <div style={{ background: '#312e81', padding: '10px 20px', borderRadius: '8px', color: '#e0e7ff', fontWeight: 'bold' }}>🌙 PM</div>
                            </div>
                        )}
                        {(skillInfo.id === 5 || skillInfo.id === 6) && (
                            <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ fontSize: 48 }}>📅</div>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
                    <button className="tc-btn-primary" onClick={() => { setMode('practice'); }}>Go to Practice ✏️</button>
                    <button className="tc-btn-secondary" onClick={onBack}>Back to Menu</button>
                </div>
            </div>
        );
    };

    const renderSkillContent = () => {
        if (mode === 'learn') return renderLearn();

        // Interactive Modules Redirection
        if (selectedSkill === 1) { // Reading the Clock
            return <ReadingClockTime mode={mode} onBack={onBack} onComplete={handleReportComplete} />;
        }
        if (selectedSkill === 2) { // AM and PM
            return <AmPmInteractive mode={mode} onBack={onBack} onComplete={handleReportComplete} />;
        }
        if (selectedSkill === 3) { // Duration Calculation
            return <TimeDurationTimeline mode={mode} onBack={onBack} onComplete={handleReportComplete} />;
        }
        if (selectedSkill === 4 || selectedSkill === 6) { // Calendars & Date Math
            return <InteractiveCalendar mode={mode} skillId={selectedSkill} onBack={onBack} onComplete={handleReportComplete} />;
        }
        if (selectedSkill === 5) { // Leap Year
            return <LeapYearInteractive mode={mode} onBack={onBack} onComplete={handleReportComplete} />;
        }
        if (selectedSkill === 7) { // Time logic puzzles
            return <TimeWordProblemInteractive mode={mode} onBack={onBack} onComplete={handleReportComplete} />;
        }

        // Fallback for non-refactored components
        const qData = mode === 'assess' ? ASSESS_QS[selectedSkill] : PRACTICE_QS[selectedSkill];
        const skillInfo = SKILLS.find(s => s.id === selectedSkill);

        if (!qData) return <div>Data pending...</div>;

        return (
            <QuizEngine
                questions={qData}
                title={`${skillInfo.title} — ${mode === 'assess' ? 'Assessment' : 'Practice'}`}
                color={skillInfo.color}
                onBack={onBack}
            />
        );
    };

    return (
        <div className="tc-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Minimal Header */}
            <nav className="tc-nav sticky top-0 z-50 p-2 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200">
                <button className="tc-nav-btn tc-nav-back" onClick={() => mode !== 'menu' ? onBack() : navigate('/ticking-clocks')}>
                    <span className="tc-nav-link text-base text-slate-600 font-bold" style={{ color: 'var(--tc-amber)' }}>{mode !== 'menu' ? '← Back to Skills' : '← Back to Ticking Clocks'}</span>
                </button>
            </nav>

            <div style={{ maxWidth: 1000, margin: mode === 'menu' ? '20px auto 40px' : '0 auto', padding: mode === 'menu' ? '0 24px' : '0 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {mode === 'menu' && (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.6rem', fontWeight: 900, margin: '0 0 8px', color: '#0f172a' }}>
                                Master <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>7 Time Skills</span>
                            </h1>
                            <p style={{ color: '#64748b', fontSize: 16 }}>Learn the concept, practice with questions, then test yourself!</p>
                        </div>
                        <div className="tc-skills-list">
                            {SKILLS.map(s => (
                                <div key={s.id} className="tc-skill-card">
                                    <div className="tc-skill-info">
                                        <div className="tc-skill-icon" style={{ background: `${s.color}15` }}>
                                            <span>{s.icon}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{s.title}</div>
                                            <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{s.desc}</div>
                                        </div>
                                    </div>
                                    <div className="tc-skill-actions">
                                        <button className="tc-btn-secondary" onClick={() => { setSelectedSkill(s.id); setMode('learn'); }} style={{ padding: '8px 18px', fontSize: 13 }}>📘 Learn</button>
                                        <button className="tc-btn-primary" onClick={() => { setSelectedSkill(s.id); setMode('practice'); }} style={{ padding: '8px 18px', fontSize: 13 }}>✏️ Practice</button>
                                        <button className="tc-btn-primary" onClick={() => { setSelectedSkill(s.id); setMode('assess'); }} style={{ padding: '8px 18px', fontSize: 13, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>🎯 Assess</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {mode !== 'menu' && (
                    <div className="tc-card" style={{ maxWidth: mode === 'learn' ? 800 : '100%', margin: '0 auto', padding: '0px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        {renderSkillContent()}
                    </div>
                )}
            </div>

            <PracticeReportModal
                isOpen={!!reportData && mode === 'practice'}
                stats={reportData}
                onTryAgain={() => setReportData(null)}
                onReturn={onBack}
            />

            <AssessReportModal
                isOpen={!!reportData && mode === 'assess'}
                stats={reportData}
                reviewData={reportData?.reviewData}
                onReturn={onBack}
            />
        </div>
    );
}
