import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import mascotImg from '../../../../assets/mascot.png';

const SKILL_ID = 3010;
const SKILL_NAME = 'Time Goes On - Chapter Test';

const generateQuestions = () => {
    return [
        { id: 1, text: 'How many days are there in a week?', options: ['5', '6', '7', '8'], correctAnswer: '7', solution: 'There are 7 days in a week: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.' },
        { id: 2, text: 'Which day comes after Friday?', options: ['Thursday', 'Saturday', 'Sunday', 'Monday'], correctAnswer: 'Saturday', solution: 'The days in order are: Mon, Tue, Wed, Thu, Fri, SAT, Sun. So Saturday comes after Friday.' },
        { id: 3, text: 'How many months are in a year?', options: ['10', '11', '12', '13'], correctAnswer: '12', solution: 'There are 12 months in a year: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec.' },
        { id: 4, text: 'Which month comes after March?', options: ['February', 'April', 'May', 'June'], correctAnswer: 'April', solution: 'The months in order: Jan, Feb, Mar, APRIL, May... So April comes after March.' },
        { id: 5, text: 'A week has 7 days. How many days are in 2 weeks?', options: ['10', '12', '14', '16'], correctAnswer: '14', solution: '2 weeks = 2 × 7 = 14 days.' },
        { id: 6, text: 'Riya\'s birthday is on the 15th. Today is the 10th. How many days until her birthday?', options: ['3', '4', '5', '6'], correctAnswer: '5', solution: '15 - 10 = 5 days until Riya\'s birthday.' },
        { id: 7, text: 'If today is Wednesday, what day will it be after 3 days?', options: ['Friday', 'Saturday', 'Sunday', 'Monday'], correctAnswer: 'Saturday', solution: 'Wed → Thu → Fri → Sat. After 3 days from Wednesday is Saturday.' },
        { id: 8, text: 'How many weeks are in a year?', options: ['48', '50', '52', '54'], correctAnswer: '52', solution: 'A year has 365 days. 365 ÷ 7 = 52 weeks (approximately).' },
        { id: 9, text: 'The clock shows 3:00. What does the minute hand point to?', options: ['3', '6', '9', '12'], correctAnswer: '12', solution: 'When the time is exactly 3:00, the minute hand points to 12.' },
        { id: 10, text: 'How many minutes are in 1 hour?', options: ['30', '45', '60', '90'], correctAnswer: '60', solution: 'There are 60 minutes in 1 hour.' },
        { id: 11, text: 'Aryan went to school at 8:00 AM and came back at 2:00 PM. How many hours was he at school?', options: ['4', '5', '6', '7'], correctAnswer: '6', solution: 'From 8:00 AM to 2:00 PM = 6 hours.' },
        { id: 12, text: 'February usually has how many days?', options: ['28', '29', '30', '31'], correctAnswer: '28', solution: 'February usually has 28 days (29 days in a leap year).' },
        { id: 13, text: 'Which of these months has 31 days?', options: ['April', 'June', 'September', 'December'], correctAnswer: 'December', solution: 'December has 31 days. April, June, and September have 30 days.' },
        { id: 14, text: 'If Meena was born in 2015, how old is she in 2023?', options: ['6', '7', '8', '9'], correctAnswer: '8', solution: '2023 - 2015 = 8. Meena is 8 years old in 2023.' },
        { id: 15, text: 'A movie starts at 4:30 PM and lasts 1 hour 30 minutes. At what time does it end?', options: ['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'], correctAnswer: '6:00 PM', solution: '4:30 PM + 1 hour 30 minutes = 6:00 PM.' },
    ];
};

const TimeGoesOnTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const questionStartTime = useRef(Date.now());
    const [sessionId, setSessionId] = useState(null);
    const [questions] = useState(generateQuestions());

    useEffect(() => {
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.createPracticeSession(uid, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
    }, []);

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
        const isSkipped = !selectedOption;
        const responseData = { selectedOption, isCorrect, timeTaken: (responses[qIndex]?.timeTaken || 0) + timeSpent, isSkipped };
        setResponses(prev => ({ ...prev, [qIndex]: responseData }));
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const attemptData = {
                user_id: uid, session_id: sessionId, skill_id: SKILL_ID,
                question_text: currentQ.text, correct_answer: currentQ.correctAnswer,
                student_answer: isSkipped ? 'SKIPPED' : selectedOption,
                is_correct: isSkipped ? false : isCorrect,
                solution_text: currentQ.solution, time_spent_seconds: timeSpent
            };
            api.recordAttempt(attemptData).catch(console.error);
        }
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const handleNext = () => {
        if (qIndex < questions.length - 1) { navigateToQuestion(qIndex + 1); }
        else { handleRecordResponse(); finalizeTest(); }
    };

    const handlePrev = () => { if (qIndex > 0) navigateToQuestion(qIndex - 1); };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({
                title: SKILL_NAME, type: 'practice',
                score: (correctCount / questions.length) * 100,
                parameters: { skill_id: SKILL_ID, total_questions: questions.length, correct_answers: correctCount, skipped_questions: skippedCount, time_taken_seconds: timeElapsed },
                user_id: uid
            }).catch(console.error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;
        return (
            <div className="junior-practice-page grey-selection-theme result-page-wrapper" style={{ background: '#FFF8F0', minHeight: '100vh', overflowY: 'auto' }}>
                <div className="exam-report-container">
                    <div className="results-hero-section flex flex-col items-center mb-8 mt-4">
                        <img src={mascotImg} alt="Happy Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-5xl font-black text-[#31326F] mb-2 tracking-tight text-center">Test Report</h1>
                        <p className="text-[#64748B] text-xl font-medium mb-8 text-center px-4">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>
                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-5xl">
                            <div className="stat-card bg-[#FFF3E0] p-6 rounded-3xl shadow-sm border-2 border-[#FFE0B2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#FF9800] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#E65100]">{Math.round((correct / questions.length) * 100)}%</span>
                            </div>
                            <div className="stat-card bg-[#F0FDF4] p-6 rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span>
                                <span className="text-4xl font-black text-[#14532D]">{correct}</span>
                            </div>
                            <div className="stat-card bg-[#FEF2F2] p-6 rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span>
                                <span className="text-4xl font-black text-[#7F1D1D]">{wrong}</span>
                            </div>
                            <div className="stat-card bg-[#F8FAFC] p-6 rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span>
                                <span className="text-4xl font-black text-[#334155]">{skipped}</span>
                            </div>
                            <div className="stat-card bg-[#FFF3E0] p-6 rounded-3xl shadow-sm border-2 border-[#FFE0B2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#FF9800] mb-1">Total Time</span>
                                <span className="text-4xl font-black text-[#E65100]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button onClick={() => navigate(-1)} className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors" style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            Back to Topics
                        </button>
                    </div>
                    <div style={{ marginBottom: '2rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '1.5rem' }}>Detailed Review & Solutions</h2>
                        {questions.map((q, idx) => {
                            const res = responses[idx] || { isSkipped: true, timeTaken: 0 };
                            return (
                                <details key={idx} className="solution-accordion group">
                                    <summary className="solution-header cursor-pointer hover:bg-slate-50 transition-colors" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                                            <span style={{ fontWeight: '800', minWidth: '32px', height: '32px', background: '#FF9800', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}><LatexText text={q.text} /></div>
                                            {res.isSkipped ? <span className="status-badge status-skipped shrink-0">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct shrink-0">Correct</span> : <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-orange-500 font-semibold text-sm whitespace-nowrap">Check Solution ↓</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {res.timeTaken}s</div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #FF9800', background: '#FFF8F0' }}><LatexText text={q.text} /></div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: opt === q.correctAnswer ? '#DCFCE7' : (opt === res.selectedOption ? '#FEE2E2' : 'white'), color: opt === q.correctAnswer ? '#166534' : (opt === res.selectedOption ? '#991B1B' : '#475569') }}>
                                                    <LatexText text={opt} />
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                                                {res.isSkipped ? <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span> : <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>{res.selectedOption ? <LatexText text={res.selectedOption} /> : 'Skipped'}</span>}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}><LatexText text={q.correctAnswer} /></span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#FFF3E0', padding: '1.5rem', borderRadius: '12px', border: '1px solid #FFE0B2' }}>
                                            <h4 style={{ color: '#E65100', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                                            <LatexText text={q.solution} />
                                        </div>
                                    </div>
                                </details>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem', background: 'linear-gradient(135deg, #FFF3E0, #FFCCBC)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E65100', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>⏰ {SKILL_NAME}</div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#FF9800]/30 text-[#E65100] font-black text-xl shadow-lg">{qIndex + 1} / {questions.length}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#FF9800]/30 text-[#E65100] font-bold text-lg shadow-md flex items-center gap-2">
                        <Clock size={20} /> {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>
            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 1rem 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0 }}>
                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="question-card-modern test-card-layout" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', borderTop: '4px solid #FF9800' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexText text={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: '800px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`} onClick={() => setSelectedOption(option)}>
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="question-palette-container" style={{ width: '300px', background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: '2px solid #FFE0B2', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#E65100', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>⏰ Question Palette</h3>
                        <div className="palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIndex === idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;
                                let btnBg = '#F8FAFC', btnColor = '#64748B', btnBorder = '1px solid #E2E8F0';
                                if (isCurrent) { btnBorder = '2px solid #FF9800'; btnBg = '#FFF3E0'; btnColor = '#E65100'; }
                                else if (hasResponded) { btnBg = '#DCFCE7'; btnColor = '#166534'; btnBorder = '1px solid #BBF7D0'; }
                                else if (isSkipped) { btnBg = '#FFF7ED'; btnColor = '#C2410C'; btnBorder = '1px solid #FFEDD5'; }
                                return (
                                    <button key={idx} onClick={() => navigateToQuestion(idx)} style={{ height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: btnBg, color: btnColor, border: btnBorder, padding: '0' }} className="hover:shadow-md hover:-translate-y-0.5">{idx + 1}</button>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#DCFCE7', border: '1px solid #BBF7D0' }}></div> Answered</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FFF7ED', border: '1px solid #FFEDD5' }}></div> Skipped</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}></div> Unvisited</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FFF3E0', border: '2px solid #FF9800' }}></div> Current</div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="junior-bottom-bar" style={{ background: 'linear-gradient(135deg, #FFF3E0, #FFCCBC)' }}>
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button></div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex === 0}><ChevronLeft size={20} /> Previous</button>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>{qIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight size={20} /></button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="nav-pill-next-btn nav-pastel-btn" style={{ padding: '0.5rem 1rem' }} onClick={handlePrev} disabled={qIndex === 0}><ChevronLeft size={24} /></button>
                    <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext} style={{ flex: 1 }}>{qIndex === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={24} /></button>
                </div>
            </footer>
        </div>
    );
};

export default TimeGoesOnTest;
