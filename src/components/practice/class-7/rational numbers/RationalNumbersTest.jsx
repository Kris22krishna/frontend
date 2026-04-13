import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { api } from '../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import LatexContent from '../../../LatexContent';
import '../../../../pages/middle/class-7/Class7PracticeLayout.css';
import mascotImg from '../../../../assets/mascot.png';

const BLUE_THEME_CSS = `
    .c7-option-btn.selected {
        border-color: #3B82F6 !important;
        background-color: #EFF6FF !important;
        color: #1E40AF !important;
        box-shadow: 0 4px 0 #2563EB !important;
    }
    .c7-option-btn {
        min-height: 65px;
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem !important;
        text-align: center;
        font-size: 0.95rem;
    }
    .exam-report-container {
        max-width: 900px;
        margin: 0 auto;
        background: white;
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }
    .solution-accordion {
        border: 2px solid #FEF08A;
        border-radius: 16px;
        margin-bottom: 1.5rem;
        overflow: hidden;
        background: white;
    }
    .solution-header {
        padding: 1rem;
        background: #F8FAFC;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    .solution-content {
        padding: 1.5rem;
        background: white;
        border-top: 1px solid #E2E8F0;
    }
    .status-badge { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; }
    .status-correct { background: #DCFCE7; color: #166534; }
    .status-wrong { background: #FEE2E2; color: #991B1B; }
    .status-skipped { background: #F1F5F9; color: #475569; }
    .nav-pastel-btn {
        background: linear-gradient(135deg, #3B82F6, #2563EB) !important;
        color: white !important; border: none !important;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
        transition: all 0.3s ease !important; font-weight: 800 !important;
    }
    .nav-pastel-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6) !important; }
    .nav-pastel-btn:disabled { background: #E2E8F0 !important; color: #94A3B8 !important; box-shadow: none !important; cursor: not-allowed !important; }
    @media (max-width: 1024px) {
        .practice-board-container { grid-template-columns: 1fr !important; justify-items: center !important; }
        .practice-left-col { width: 100% !important; max-width: 600px !important; margin: 0 auto !important; }
        .question-palette-container { width: 100% !important; max-width: 500px !important; margin: 2rem auto 0 auto !important; max-height: none !important; height: auto !important; }
        .c7-options-grid { grid-template-columns: 1fr !important; justify-items: center !important; }
        .practice-content-wrapper { padding-bottom: 80px !important; }
        .c7-option-btn { min-height: 55px; font-size: 0.9rem; min-width: unset !important; width: 100% !important; max-width: 350px !important; margin: 0 auto !important; }
    }
    @media (max-width: 640px) {
        .junior-practice-header { padding: 0 1rem !important; }
        .practice-content-wrapper { padding: 1rem 1rem 80px 1rem !important; }
        .c7-question-card { padding: 1.5rem !important; }
        .c7-question-text { font-size: 1.1rem !important; }
    }
`;



const SKILL_ID = 'local-rn-test';
const SKILL_NAME = "Class 7 - Rational Numbers - Chapter Test";

const RationalNumbersTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const questionStartTime = useRef(Date.now());
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => {
                const unique = [...new Set(array)];
                return unique.sort(() => Math.random() - 0.5);
            };
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

            // Generate 16 questions, 2 from each of the 8 topics

            const generators = [
                // Topic 1: Need for Rational Numbers
                // Q1: Concept
                () => ({
                    type: "Review Topic 1",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>Which set of numbers includes integers and fractions?</p></div>`,
                    correctAnswer: `Rational Numbers`,
                    solution: `Rational numbers include integers and fractions.`,
                    options: shuffle([`Rational Numbers`, `Whole Numbers`, `Natural Numbers`, `Irrational Numbers`])
                }),
                // Q2: Application
                () => {
                    const deposit = rand(500, 1000);
                    return {
                        type: "Review Topic 1b",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'><p>If depositing ₹${deposit} is represented by $+\\frac{${deposit}}{1}$, how is withdrawing ₹${Math.floor(deposit / 2)} represented?</p></div>`,
                        correctAnswer: `$-\\frac{${Math.floor(deposit / 2)}}{1}$`,
                        solution: `Withdrawal is the opposite of deposit, so it is negative.`,
                        options: shuffle([`$-\\frac{${Math.floor(deposit / 2)}}{1}$`, `$+\\frac{${Math.floor(deposit / 2)}}{1}$`, `$\\frac{1}{${Math.floor(deposit / 2)}}$`, `None`])
                    };
                },

                // Topic 2: What are Rational Numbers
                // Q3: Definition
                () => ({
                    type: "Review Topic 2",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>A number of the form p/q is rational if p and q are integers and:</p></div>`,
                    correctAnswer: `q ≠ 0`,
                    solution: `The denominator q must not be zero.`,
                    options: shuffle([`q ≠ 0`, `q = 0`, `p ≠ 0`, `p > q`])
                }),
                // Q4: Equivalent
                () => {
                    const n2 = rand(2, 5), d2 = rand(3, 7);
                    const m = rand(2, 4);
                    return {
                        type: "Review Topic 2b",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'><p>Which is equivalent to $\\frac{${n2}}{${d2}}$?</p></div>`,
                        correctAnswer: `$\\frac{${n2 * m}}{${d2 * m}}$`,
                        solution: `Multiplying num and den by ${m} gives $\\frac{${n2 * m}}{${d2 * m}}$.`,
                        options: shuffle([`$\\frac{${n2 * m}}{${d2 * m}}$`, `$\\frac{${n2 + m}}{${d2 + m}}$`, `$\\frac{${n2}}{${d2 + 1}}$`, `$\\frac{${d2}}{${n2}}$`])
                    };
                },

                // Topic 3: Positive and Negative
                // Q5: Positive check
                () => ({
                    type: "Review Topic 3",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>Which of the following is a positive rational number?</p></div>`,
                    correctAnswer: `$\\frac{-3}{-5}$`,
                    solution: `$\\frac{-3}{-5} = \\frac{3}{5}$, which is positive.`,
                    options: shuffle([`$\\frac{-3}{-5}$`, `$\\frac{-3}{5}$`, `$\\frac{3}{-5}$`, `-5`])
                }),
                // Q6: Negative
                () => ({
                    type: "Review Topic 3b",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>Is $\\frac{0}{-5}$ positive or negative?</p></div>`,
                    correctAnswer: `Neither positive nor negative`,
                    solution: `0 is neither positive nor negative.`,
                    options: shuffle([`Neither positive nor negative`, `Positive`, `Negative`, `Both`])
                }),

                // Topic 4: Number Line
                // Q7: Location
                () => ({
                    type: "Review Topic 4",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>On a number line, where does $\\frac{-1}{2}$ lie?</p></div>`,
                    correctAnswer: `To the left of 0`,
                    solution: `Negative numbers are to the left of 0.`,
                    options: shuffle([`To the left of 0`, `To the right of 0`, `At 0`, `Undefined`])
                }),
                // Q8: Between integers
                () => {
                    const num = rand(3, 5), den = 2; // e.g. 3/2 = 1.5
                    return {
                        type: "Review Topic 4b",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'><p>Between which two consecutive integers does $\\frac{${num}}{${den}}$ lie?</p></div>`,
                        correctAnswer: `${Math.floor(num / den)} and ${Math.ceil(num / den)}`,
                        solution: `$\\frac{${num}}{${den}} = ${num / den}$, which is between ${Math.floor(num / den)} and ${Math.ceil(num / den)}.`,
                        options: shuffle([`${Math.floor(num / den)} and ${Math.ceil(num / den)}`, `${Math.floor(num / den) - 1} and ${Math.floor(num / den)}`, `${Math.ceil(num / den)} and ${Math.ceil(num / den) + 1}`, `0 and 1`])
                    };
                },

                // Topic 5: Standard Form
                // Q9: Standard check
                () => ({
                    type: "Review Topic 5",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>Reduce $\\frac{-12}{30}$ to standard form.</p></div>`,
                    correctAnswer: `$\\frac{-2}{5}$`,
                    solution: `Divide by HCF(12,30)=6: $\\frac{-12 \\div 6}{30 \\div 6} = \\frac{-2}{5}$.`,
                    options: shuffle([`$\\frac{-2}{5}$`, `$\\frac{-4}{10}$`, `$\\frac{2}{-5}$`, `$\\frac{-6}{15}$`])
                }),
                // Q10: Condition
                () => ({
                    type: "Review Topic 5b",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>For standard form, the denominator must be:</p></div>`,
                    correctAnswer: `Positive`,
                    solution: `In standard form, the denominator is always positive.`,
                    options: shuffle([`Positive`, `Negative`, `Zero`, `Even`])
                }),

                // Topic 6: Comparison
                // Q11: Compare
                () => ({
                    type: "Review Topic 6",
                    difficulty_level: "Medium",
                    text: `<div class='question-container'><p>Which is greater: $\\frac{-2}{3}$ or $\\frac{-4}{5}$?</p></div>`,
                    correctAnswer: `$\\frac{-2}{3}$`,
                    solution: `$-0.66... > -0.8$. So $\\frac{-2}{3}$ is greater.`,
                    options: shuffle([`$\\frac{-2}{3}$`, `$\\frac{-4}{5}$`, `Equal`, `Undefined`])
                }),
                // Q12: Order
                () => ({
                    type: "Review Topic 6b",
                    difficulty_level: "Medium",
                    text: `<div class='question-container'><p>Ascending order of $\\frac{-1}{2}, \\frac{1}{2}, 0$ is:</p></div>`,
                    correctAnswer: `$\\frac{-1}{2}, 0, \\frac{1}{2}$`,
                    solution: `Negative < Zero < Positive.`,
                    options: shuffle([`$\\frac{-1}{2}, 0, \\frac{1}{2}$`, `$\\frac{1}{2}, 0, \\frac{-1}{2}$`, `$0, \\frac{-1}{2}, \\frac{1}{2}$`, `None`])
                }),

                // Topic 7: Rational numbers between
                // Q13: Count
                () => ({
                    type: "Review Topic 7",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>How many rational numbers are between 0 and 1?</p></div>`,
                    correctAnswer: `Infinite`,
                    solution: `There are infinitely many rational numbers between any two distinct rational numbers.`,
                    options: shuffle([`Infinite`, `Zero`, `One`, `Ten`])
                }),
                // Q14: Find one
                () => ({
                    type: "Review Topic 7b",
                    difficulty_level: "Medium",
                    text: `<div class='question-container'><p>Find a rational number between $\\frac{1}{3}$ and $\\frac{1}{2}$.</p></div>`,
                    correctAnswer: `$\\frac{5}{12}$`,
                    solution: `Average: $\\frac{1}{2}(\\frac{1}{3}+\\frac{1}{2}) = \\frac{1}{2}(\\frac{5}{6}) = \\frac{5}{12}$.`,
                    options: shuffle([`$\\frac{5}{12}$`, `$\\frac{2}{5}$`, `$\\frac{3}{5}$`, `$\\frac{1}{6}$`])
                }),

                // Topic 8: Operations
                // Q15: Add/Sub
                () => {
                    const o1 = rand(1, 5);
                    return {
                        type: "Review Topic 8",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'><p>Solve: $\\frac{2}{3} + (\\frac{-${o1}}{3})$</p></div>`,
                        correctAnswer: `$\\frac{${2 - o1}}{3}$`,
                        solution: `$\\frac{2 + (-${o1})}{3} = \\frac{${2 - o1}}{3}$.`,
                        options: shuffle([`$\\frac{${2 - o1}}{3}$`, `$\\frac{${2 + o1}}{3}$`, `$\\frac{${2 - o1}}{6}$`, `$\\frac{2}{${3 + o1}}$`])
                    };
                },
                // Q16: Mult/Div
                () => ({
                    type: "Review Topic 8b",
                    difficulty_level: "Medium",
                    text: `<div class='question-container'><p>Product of reciprocal of $\\frac{-2}{3}$ and $\\frac{4}{5}$.</p></div>`,
                    correctAnswer: `$\\frac{-6}{5}$`,
                    solution: `Reciprocal of $\\frac{-2}{3}$ is $\\frac{-3}{2}$. Multiply by $\\frac{4}{5}$: $\\frac{-3}{2} \\times \\frac{4}{5} = \\frac{-12}{10} = \\frac{-6}{5}$.`,
                    options: shuffle([`$\\frac{-6}{5}$`, `$\\frac{-8}{15}$`, `$\\frac{6}{5}$`, `$\\frac{-2}{15}$`])
                })
            ];

            // Pick 25 questions: all 16 generators + 9 more random picks
            generators.forEach(gen => newQuestions.push(gen()));
            const extraGenerators = shuffle(generators).slice(0, 9);
            extraGenerators.forEach(gen => newQuestions.push(gen()));

            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    useEffect(() => {
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.createPracticeSession(uid, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
            startSession({ nodeId: 'a4071009-0010-0000-0000-000000000000', sessionType: 'assessment' });
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
        setResponses(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect, timeTaken: (prev[qIndex]?.timeTaken || 0) + timeSpent, isSkipped } }));

        const _v4timeMs = Date.now() - questionStartTime.current;
        const _v4isCorrect = selectedOption ? selectedOption === questions[qIndex]?.correctAnswer : null;
        const _v4entry = {
            question_index: qIndex,
            answer_json: JSON.stringify({ selected: selectedOption }),
            is_correct: _v4isCorrect === true,
            marks_awarded: _v4isCorrect === true ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: _v4timeMs,
        };
        const _v4idx = answersPayload.current.findIndex(a => a && a.question_index === qIndex);
        if (_v4idx >= 0) { answersPayload.current[_v4idx] = _v4entry; } else { answersPayload.current.push(_v4entry); }
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.recordAttempt({ user_id: uid, session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: 'Medium',
                question_text: String(currentQ.text || ''), correct_answer: String(currentQ.correctAnswer || ''),
                student_answer: String(isSkipped ? "SKIPPED" : (selectedOption || '')), is_correct: isSkipped ? false : isCorrect,
                solution_text: String(currentQ.solution || ''), time_spent_seconds: timeSpent
            }).catch(console.error);
        }
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const handleNext = () => { if (qIndex < questions.length - 1) { navigateToQuestion(qIndex + 1); } else { handleRecordResponse(); finalizeTest(); } };
    const handlePrev = () => { if (qIndex > 0) { navigateToQuestion(qIndex - 1); } };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        await finishSession({
            total_questions: questions.length,
            questions_answered: Object.keys(responses).length,
            answers_payload: answersPayload.current.filter(Boolean)
        });
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({ title: SKILL_NAME, type: 'practice', score: (correctCount / questions.length) * 100,
                parameters: { skill_id: SKILL_ID, total_questions: questions.length, correct_answers: correctCount, skipped_questions: skippedCount, time_taken_seconds: timeElapsed },
                user_id: uid }).catch(console.error);
        }
    };

    const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;
        return (
            <div className="junior-practice-page grey-selection-theme p-4 md:p-8" style={{ background: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <style>{BLUE_THEME_CSS}</style>
                <div className="exam-report-container mx-auto p-4 md:p-8 my-4 md:my-8">
                    <div className="flex flex-col items-center mb-8 mt-4 text-center">
                        <img src={mascotImg} alt="Mascot" className="w-32 h-32 md:w-40 md:h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-3xl md:text-5xl font-black text-[#31326F] mb-2">Test Report</h1>
                        <p className="text-[#64748B] text-base md:text-xl font-medium mb-8">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 w-full max-w-5xl">
                            <div className="bg-[#EFF6FF] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DBEAFE] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span><span className="text-2xl md:text-4xl font-black text-[#1E3A8A]">{Math.round((correct/questions.length)*100)}%</span></div>
                            <div className="bg-[#F0FDF4] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DCFCE7] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span><span className="text-2xl md:text-4xl font-black text-[#14532D]">{correct}</span></div>
                            <div className="bg-[#FEF2F2] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#FEE2E2] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span><span className="text-2xl md:text-4xl font-black text-[#7F1D1D]">{wrong}</span></div>
                            <div className="bg-[#F8FAFC] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#E2E8F0] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span><span className="text-2xl md:text-4xl font-black text-[#334155]">{skipped}</span></div>
                            <div className="bg-[#EFF6FF] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DBEAFE] text-center col-span-2 md:col-span-1"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Time</span><span className="text-2xl md:text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span></div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-12"><button onClick={() => navigate(-1)} className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase hover:bg-[#31326F] hover:text-white transition-colors" style={{ fontSize: '1.1rem' }}>Back to Topics</button></div>
                    <div style={{ maxWidth: 1000, margin: '0 auto 2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>Detailed Review & Solutions</h2>
                        {questions.map((q, idx) => {
                            const res = responses[idx] || { isSkipped: true, timeTaken: 0 };
                            return (
                                <details key={idx} className="solution-accordion group">
                                    <summary className="solution-header cursor-pointer hover:bg-slate-50" style={{ listStyle: 'none', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                            <span style={{ fontWeight: 800, minWidth: 32, height: 32, background: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx+1}</span>
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: 350 }}><LatexContent html={q.text} /></div>
                                            {res.isSkipped ? <span className="status-badge status-skipped">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct">Correct</span> : <span className="status-badge status-wrong">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 text-blue-600 font-semibold text-sm">Check Solution ↓</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16}/> {res.timeTaken}s</div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #3B82F6', background: '#F8FAFC' }}><LatexContent html={q.text} /></div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (<div key={oIdx} style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #E2E8F0', background: opt===q.correctAnswer?'#DCFCE7':(opt===res.selectedOption?'#FEE2E2':'white'), color: opt===q.correctAnswer?'#166534':(opt===res.selectedOption?'#991B1B':'#475569') }}><LatexContent html={opt} /></div>))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your Answer</h5>
                                                {res.isSkipped ? <span style={{ color: '#F59E0B', fontWeight: 700 }}>Skipped</span> : <span style={{ color: res.isCorrect?'#166534':'#DC2626', fontWeight: 700 }}>{res.selectedOption ? <LatexContent html={res.selectedOption}/> : "Skipped"}</span>}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: 700 }}><LatexContent html={q.correctAnswer}/></span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: 12, border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Solution:</h4>
                                            <LatexContent html={q.solution} />
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
            <style>{BLUE_THEME_CSS}</style>
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME}</div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-black text-xl shadow-lg">{qIndex+1} / {questions.length}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-bold text-lg shadow-md flex items-center gap-2"><Clock size={20}/> {formatTime(timeElapsed)}</div>
                </div>
            </header>
            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 140px 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '2rem', maxWidth: 1200, margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: 60 }}>
                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="c7-question-card" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'visible', justifyContent: 'flex-start' }}>
                            <div className="c7-question-header" style={{ flexShrink: 0, marginBottom: '1rem' }}>
                                <h2 className="c7-question-text" style={{ fontSize: 'clamp(1rem,1.8vw,1.35rem)', maxHeight: 'none', fontWeight: 500, textAlign: 'left', color: '#2D3748', lineHeight: 1.5, marginBottom: '1rem' }}>
                                    <LatexContent html={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="c7-interaction-area" style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                                <div className="c7-options-grid" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: 800, gridTemplateColumns: 'repeat(2,1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button key={idx} className={`c7-option-btn ${selectedOption===option?'selected':''}`} onClick={() => setSelectedOption(option)}>
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="question-palette-container" style={{ width: 300, background: 'white', padding: '1.5rem', borderRadius: 24, boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', marginBottom: '1rem', textAlign: 'center' }}>Question Palette</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_,idx) => {
                                const isCurrent = qIndex===idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;
                                let bg='#F8FAFC',clr='#64748B',bdr='1px solid #E2E8F0';
                                if (isCurrent) { bdr='2px solid #3B82F6'; bg='#EFF6FF'; clr='#1D4ED8'; }
                                else if (hasResponded) { bg='#DCFCE7'; clr='#166534'; bdr='1px solid #BBF7D0'; }
                                else if (isSkipped) { bg='#FFF7ED'; clr='#C2410C'; bdr='1px solid #FFEDD5'; }
                                return (<button key={idx} onClick={() => navigateToQuestion(idx)} style={{ height: 36, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: bg, color: clr, border: bdr, padding: 0 }} className="hover:shadow-md hover:-translate-y-0.5">{idx+1}</button>);
                            })}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#DCFCE7', border: '1px solid #BBF7D0' }}></div> Answered</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#FFF7ED', border: '1px solid #FFEDD5' }}></div> Skipped</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#F8FAFC', border: '1px solid #E2E8F0' }}></div> Unvisited</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#EFF6FF', border: '2px solid #3B82F6' }}></div> Current</div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button></div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex===0}><ChevronLeft size={20}/> Previous</button>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>{qIndex===questions.length-1?"Finish Test":"Next Question"} <ChevronRight size={20}/></button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="nav-pill-next-btn nav-pastel-btn" style={{ padding: '0.5rem 1rem' }} onClick={handlePrev} disabled={qIndex===0}><ChevronLeft size={24}/></button>
                    <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext} style={{ flex: 1 }}>{qIndex===questions.length-1?"Finish":"Next"} <ChevronRight size={24}/></button>
                </div>
            </footer>
        </div>
    );
};

export default RationalNumbersTest;
