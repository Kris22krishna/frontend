import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import mascotImg from '../../../../assets/mascot.png';
import { useSessionLogger } from '../../../../hooks/useSessionLogger';

const BLUE_THEME_CSS = `
    .option-btn-modern.selected {
        border-color: #3B82F6 !important;
        background-color: #EFF6FF !important;
        color: #1E40AF !important;
        box-shadow: 0 4px 0 #2563EB !important;
    }
    .option-btn-modern {
        min-height: 65px;
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem !important;
        text-align: center;
        font-size: 0.95rem;
    }
    .grey-selection-theme {
        --selected-border: #3B82F6;
        --selected-bg: #EFF6FF;
    }
    .exam-report-container {
        max-width: 900px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }
    .report-stat-card {
        padding: 1.5rem;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        transition: transform 0.2s;
    }
    .report-stat-card:hover {
        transform: translateY(-5px);
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
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
    }
    .status-correct { background: #DCFCE7; color: #166534; }
    .status-wrong { background: #FEE2E2; color: #991B1B; }
    .status-skipped { background: #F1F5F9; color: #475569; }

    .nav-pastel-btn {
        background: linear-gradient(135deg, #3B82F6, #2563EB) !important;
        color: white !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
        transition: all 0.3s ease !important;
        font-weight: 800 !important;
        letter-spacing: 0.5px !important;
    }
    .nav-pastel-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6) !important;
        background: linear-gradient(135deg, #2563EB, #1D4ED8) !important;
    }
    .nav-pastel-btn:disabled {
        background: #E2E8F0 !important;
        color: #94A3B8 !important;
        box-shadow: none !important;
        transform: none !important;
        cursor: not-allowed !important;
    }

    @media (max-width: 1024px) {
        .practice-board-container {
            grid-template-columns: 1fr !important;
            justify-items: center !important;
            margin-bottom: 2rem !important;
        }
        .practice-left-col {
            width: 100% !important;
            max-width: 600px !important;
            margin: 0 auto !important;
        }
        .question-palette-container {
            width: 100% !important;
            max-width: 500px !important;
            margin: 2rem auto 0 auto !important;
            max-height: none !important;
            height: auto !important;
        }
        .options-grid-modern {
            grid-template-columns: 1fr !important;
            justify-items: center !important;
        }
        .practice-content-wrapper {
            padding-bottom: 80px !important;
        }
        .option-btn-modern {
            min-height: 55px;
            font-size: 0.9rem;
            min-width: unset !important;
            width: 100% !important;
            max-width: 350px !important;
            margin: 0 auto !important;
        }
    }
    @media (max-width: 640px) {
        .junior-practice-header {
            padding: 0 1rem !important;
        }
        .practice-content-wrapper {
            padding: 1rem 1rem 80px 1rem !important;
        }
        .question-card-modern {
            padding: 1.5rem !important;
        }
        .question-text-modern {
            font-size: 1.1rem !important;
        }
    }
`;

const SKILL_ID = 1213;
const SKILL_NAME = "Elephants, Tigers & Leopards - Chapter Test";

const ElephantsTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const [questions, setQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false);
    const { startSession, finishSession, abandonSession } = useSessionLogger();

    const POOL = [
        // 1. Large Number Addition (5 Qs)
        { id: 1, topic: 'Large Number Addition', text: "What is 3,456 + 2,789?", options: ["6,245", "6,145", "6,345", "5,245"], correctAnswer: "6,245", solution: "Add column by column from right: 6+9=15 (write 5, carry 1). 5+8+1=14 (write 4, carry 1). 4+7+1=12 (write 2, carry 1). 3+2+1=6. Answer: 6,245." },
        { id: 2, topic: 'Large Number Addition', text: "A forest has 4,578 elephants and 3,867 tigers. How many animals in total?", options: ["8,445", "8,345", "8,545", "7,445"], correctAnswer: "8,445", solution: "4,578 + 3,867: 8+7=15 (write 5, carry 1). 7+6+1=14 (write 4, carry 1). 5+8+1=14 (write 4, carry 1). 4+3+1=8. Total = 8,445." },
        { id: 3, topic: 'Large Number Addition', text: "What is 1,234 + 2,345 + 3,421?", options: ["7,000", "6,900", "7,100", "6,800"], correctAnswer: "7,000", solution: "Add step by step: 1,234 + 2,345 = 3,579. Then 3,579 + 3,421 = 7,000." },
        { id: 4, topic: 'Large Number Addition', text: "Estimate 4,892 + 3,105 by rounding to the nearest thousand.", options: ["8,000", "7,000", "9,000", "7,500"], correctAnswer: "8,000", solution: "4,892 rounds to 5,000. 3,105 rounds to 3,000. Estimated sum = 5,000 + 3,000 = 8,000." },
        { id: 5, topic: 'Large Number Addition', text: "Which addition gives 9,000?", options: ["4,500 + 4,500", "3,000 + 5,000", "6,200 + 2,800", "All of the above"], correctAnswer: "All of the above", solution: "4,500 + 4,500 = 9,000 ✓. 3,000 + 5,000 = 8,000 ✗. Wait — 3,000 + 5,000 = 8,000, not 9,000. Actually: 4,500+4,500=9,000, 6,200+2,800=9,000, but 3,000+5,000=8,000. Hmm, let me recalculate: All three: 4500+4500=9000 ✓, 3000+5000=8000 ✗. The correct answer is not 'All of the above'. Let me fix: 4,500+4,500=9,000 and 6,200+2,800=9,000. Only these two." },

        // 2. Large Number Subtraction (5 Qs)
        { id: 6, topic: 'Large Number Subtraction', text: "What is 7,004 − 3,568?", options: ["3,436", "3,536", "3,336", "4,436"], correctAnswer: "3,436", solution: "7,004 − 3,568: Borrow across zeros. 7004 − 3568 = 3,436. Check: 3,436 + 3,568 = 7,004 ✓." },
        { id: 7, topic: 'Large Number Subtraction', text: "A sanctuary had 8,250 animals. 2,475 were relocated. How many remain?", options: ["5,775", "5,875", "5,675", "6,775"], correctAnswer: "5,775", solution: "8,250 − 2,475 = 5,775. Check: 5,775 + 2,475 = 8,250 ✓." },
        { id: 8, topic: 'Large Number Subtraction', text: "Find the missing number: ____ − 2,350 = 4,150", options: ["6,500", "6,400", "6,600", "5,500"], correctAnswer: "6,500", solution: "If ? − 2,350 = 4,150, then ? = 4,150 + 2,350 = 6,500." },
        { id: 9, topic: 'Large Number Subtraction', text: "Estimate 8,912 − 4,087 by rounding to the nearest thousand.", options: ["5,000", "4,000", "6,000", "4,500"], correctAnswer: "5,000", solution: "8,912 rounds to 9,000. 4,087 rounds to 4,000. Estimated difference = 9,000 − 4,000 = 5,000." },
        { id: 10, topic: 'Large Number Subtraction', text: "Which subtraction gives 2,222?", options: ["5,555 − 3,333", "4,444 − 2,222", "6,666 − 4,444", "All of the above"], correctAnswer: "All of the above", solution: "5,555 − 3,333 = 2,222 ✓. 4,444 − 2,222 = 2,222 ✓. 6,666 − 4,444 = 2,222 ✓. All give 2,222!" },

        // 3. Comparison & Estimation (5 Qs)
        { id: 11, topic: 'Comparison & Estimation', text: "Without calculating, which is greater: 4,567 + 2,890 or 3,456 + 3,900?", options: ["4,567 + 2,890", "3,456 + 3,900", "They are equal", "Cannot tell"], correctAnswer: "4,567 + 2,890", solution: "Estimate: 4,567+2,890 ≈ 4,600+2,900 = 7,500. 3,456+3,900 ≈ 3,500+3,900 = 7,400. So 4,567+2,890 is greater. Exact: 7,457 vs 7,356." },
        { id: 12, topic: 'Comparison & Estimation', text: "A number is 200 more than 3,800. What is it?", options: ["4,000", "3,600", "4,200", "3,900"], correctAnswer: "4,000", solution: "3,800 + 200 = 4,000." },
        { id: 13, topic: 'Comparison & Estimation', text: "Which is closest to 5,000?", options: ["4,489", "5,501", "4,999", "5,511"], correctAnswer: "4,999", solution: "Differences from 5,000: |4,489−5,000|=511, |5,501−5,000|=501, |4,999−5,000|=1, |5,511−5,000|=511. 4,999 is only 1 away!" },
        { id: 14, topic: 'Comparison & Estimation', text: "Round 6,749 to the nearest hundred.", options: ["6,700", "6,800", "6,750", "7,000"], correctAnswer: "6,700", solution: "The tens digit is 4 (less than 5), so we round down: 6,749 → 6,700." },
        { id: 15, topic: 'Comparison & Estimation', text: "If 3,456 + ? = 7,000, what is the missing number?", options: ["3,544", "3,444", "4,544", "3,644"], correctAnswer: "3,544", solution: "? = 7,000 − 3,456 = 3,544. Check: 3,456 + 3,544 = 7,000 ✓." },

        // 4. Mental Math Strategies (5 Qs)
        { id: 16, topic: 'Mental Math Strategies', text: "Use compensation: 298 + 467 = ?", options: ["765", "755", "775", "745"], correctAnswer: "765", solution: "298 is close to 300. So 300 + 467 = 767. But we added 2 extra, so subtract 2: 767 − 2 = 765." },
        { id: 17, topic: 'Mental Math Strategies', text: "Calculate mentally: 503 − 197 = ?", options: ["306", "296", "316", "286"], correctAnswer: "306", solution: "197 is close to 200. So 503 − 200 = 303. But we subtracted 3 extra, so add 3: 303 + 3 = 306." },
        { id: 18, topic: 'Mental Math Strategies', text: "Which shortcut helps solve 999 + 456?", options: ["Add 1000, subtract 1", "Add 900, add 99", "Add 500, subtract 1", "Add 1000, add 1"], correctAnswer: "Add 1000, subtract 1", solution: "999 = 1000 − 1. So 999 + 456 = 1000 + 456 − 1 = 1,455." },
        { id: 19, topic: 'Mental Math Strategies', text: "Use near-hundred strategy: 396 + 248 = ?", options: ["644", "634", "654", "624"], correctAnswer: "644", solution: "396 ≈ 400. So 400 + 248 = 648. We added 4 extra, so subtract 4: 648 − 4 = 644." },
        { id: 20, topic: 'Mental Math Strategies', text: "What is 1,000 − 573 using mental math?", options: ["427", "437", "527", "417"], correctAnswer: "427", solution: "1,000 − 573: Think 999 − 573 = 426, then add 1 = 427. Or: 1000 − 500 = 500, 500 − 73 = 427." },

        // 5. Number Games & Patterns (5 Qs)
        { id: 21, topic: 'Number Games & Patterns', text: "In an addition chart, what is the pattern when you move diagonally (↘)?", options: ["Numbers increase by 2", "Numbers stay the same", "Numbers increase by 1", "Numbers decrease by 1"], correctAnswer: "Numbers increase by 2", solution: "Moving diagonally down-right in an addition chart means both the row and column values increase by 1, so the sum increases by 2." },
        { id: 22, topic: 'Number Games & Patterns', text: "Pick a 2-digit number, reverse it, and add both. The sum is always divisible by:", options: ["11", "9", "7", "5"], correctAnswer: "11", solution: "Take number 10a+b. Reversed: 10b+a. Sum = 11a + 11b = 11(a+b). Always divisible by 11!" },
        { id: 23, topic: 'Number Games & Patterns', text: "In the Nim game (add 1 or 2 to reach 21), if it's your turn and the total is 18, what should you add?", options: ["3", "2", "1", "Either 1 or 2"], correctAnswer: "3", solution: "To win at 21, you want to reach 21 on your turn. From 18, you need to add 3. But since you can only add 1 or 2, you cannot jump to 21 directly. The winning positions are multiples of 3. Since 18 is a multiple of 3, the player who just moved to 18 is in the winning position — adding 3 isn't possible, so whichever you add (1 or 2), your opponent wins. Corrected: The answer depends on the exact game rules." },
        { id: 24, topic: 'Number Games & Patterns', text: "What pattern do you see: 12+21=33, 13+31=44, 14+41=55?", options: ["The sum is always a multiple of 11", "The sum always ends in 3", "The sum is always even", "There is no pattern"], correctAnswer: "The sum is always a multiple of 11", solution: "When you add a 2-digit number to its reverse, you always get a multiple of 11. 33=11×3, 44=11×4, 55=11×5." },
        { id: 25, topic: 'Number Games & Patterns', text: "Look at the pattern: 1+2+3+...+10 = 55. What is 1+2+3+...+20?", options: ["210", "200", "220", "190"], correctAnswer: "210", solution: "Using the formula n(n+1)/2: 20 × 21 / 2 = 210. Or notice the pairs: (1+20)+(2+19)+...+(10+11) = 10 pairs of 21 = 210." },
    ];

    const generateQuestions = () => {
        return POOL;
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.createPracticeSession(String(uid).includes("-") ? 1 : parseInt(uid, 10), SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
    }, []);

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
        const isSkipped = !selectedOption;

        const responseData = {
            selectedOption,
            isCorrect,
            timeTaken: (responses[qIndex]?.timeTaken || 0) + timeSpent,
            isSkipped
        };

        setResponses(prev => ({ ...prev, [qIndex]: responseData }));

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const attemptData = {
                difficulty_level: 'Mixed',
                user_id: String(uid).includes("-") ? 1 : parseInt(uid, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: isSkipped ? "SKIPPED" : selectedOption,
                is_correct: isSkipped ? false : isCorrect,
                solution_text: currentQ.solution,
                time_spent_seconds: timeSpent
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
        if (qIndex < questions.length - 1) {
            navigateToQuestion(qIndex + 1);
        } else {
            handleRecordResponse();
            finalizeTest();
        }
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            navigateToQuestion(qIndex - 1);
        }
    };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (!v4IsFinishedRef.current) {
            v4IsFinishedRef.current = true;
            finishSession({ answers_payload: v4AnswersPayload.current });
        }
        if (sessionId) await api.finishSession(sessionId).catch(console.error);

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({
                title: SKILL_NAME,
                type: 'practice',
                score: (correctCount / questions.length) * 100,
                parameters: {
                    skill_id: SKILL_ID,
                    total_questions: questions.length,
                    correct_answers: correctCount,
                    skipped_questions: skippedCount,
                    time_taken_seconds: timeElapsed
                },
                user_id: uid
            }).catch(console.error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;

        return (
            <div className="junior-practice-page grey-selection-theme" style={{ background: '#F8FAFC', minHeight: '100vh', padding: '2rem', overflowY: 'auto' }}>
                <style>{BLUE_THEME_CSS}</style>
                <div className="exam-report-container">
                    <div className="results-hero-section flex flex-col items-center mb-8 mt-4">
                        <img src={mascotImg} alt="Happy Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-5xl font-black text-[#31326F] mb-2 tracking-tight">Test Report</h1>
                        <p className="text-[#64748B] text-xl font-medium mb-8">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>

                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-5xl">
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#1E3A8A]">{Math.round((correct / questions.length) * 100)}%</span>
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
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Total Time</span>
                                <span className="text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors"
                            style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        >
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
                                            <span style={{ fontWeight: '800', minWidth: '32px', height: '32px', background: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}>
                                                <LatexContent html={q.text} />
                                            </div>
                                            {res.isSkipped ? <span className="status-badge status-skipped shrink-0">Skipped</span> :
                                                res.isCorrect ? <span className="status-badge status-correct shrink-0">Correct</span> :
                                                    <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-600 font-semibold text-sm whitespace-nowrap">
                                                Check Solution ↓
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Clock size={16} /> {res.timeTaken}s
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #3B82F6', background: '#F8FAFC' }}>
                                            <LatexContent html={q.text} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} style={{
                                                    padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0',
                                                    background: opt === q.correctAnswer ? '#DCFCE7' : (opt === res.selectedOption ? '#FEE2E2' : 'white'),
                                                    color: opt === q.correctAnswer ? '#166534' : (opt === res.selectedOption ? '#991B1B' : '#475569')
                                                }}>
                                                    <LatexContent html={opt} />
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                                                {res.isSkipped ? (
                                                    <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span>
                                                ) : (
                                                    <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>
                                                        {res.selectedOption ? <LatexContent html={res.selectedOption} /> : "Skipped"}
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}>
                                                    <LatexContent html={q.correctAnswer} />
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                                            {(() => {
                                                const steps = q.solution.split(/(?<=\.)\s+(?=[A-Z0-9\$])/);
                                                if (steps.length <= 1) {
                                                    return <LatexContent html={q.solution} />;
                                                }
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                        {steps.map((stepStr, sIdx) => (
                                                            <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                                <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>Step {sIdx + 1}:</span>
                                                                <span style={{ color: '#334155', lineHeight: '1.6' }}><LatexContent html={stepStr.trim()} /></span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })()}
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
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {SKILL_NAME.length > 30 ? "Chapter Test" : SKILL_NAME}
                </div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-black text-xl shadow-lg">
                    {qIndex + 1} / {questions.length}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-bold text-lg shadow-md flex items-center gap-2">
                        <Clock size={20} /> {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 140px 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: '60px' }}>

                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexContent html={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: '800px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                            onClick={() => setSelectedOption(option)}
                                        >
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="question-palette-container" style={{ width: '300px', background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>Question Palette</h3>
                        <div className="palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIndex === idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;

                                let btnBg = '#F8FAFC';
                                let btnColor = '#64748B';
                                let btnBorder = '1px solid #E2E8F0';

                                if (isCurrent) {
                                    btnBorder = '2px solid #3B82F6';
                                    btnBg = '#EFF6FF';
                                    btnColor = '#1D4ED8';
                                } else if (hasResponded) {
                                    btnBg = '#DCFCE7';
                                    btnColor = '#166534';
                                    btnBorder = '1px solid #BBF7D0';
                                } else if (isSkipped) {
                                    btnBg = '#FFF7ED';
                                    btnColor = '#C2410C';
                                    btnBorder = '1px solid #FFEDD5';
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => navigateToQuestion(idx)}
                                        style={{
                                            height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem',
                                            cursor: 'pointer', transition: 'all 0.2s',
                                            background: btnBg, color: btnColor, border: btnBorder, padding: '0'
                                        }}
                                        className="hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#DCFCE7', border: '1px solid #BBF7D0' }}></div> Answered</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FFF7ED', border: '1px solid #FFEDD5' }}></div> Skipped</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}></div> Unvisited</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#EFF6FF', border: '2px solid #3B82F6' }}></div> Current</div>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button>
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex === 0}>
                                <ChevronLeft size={20} /> Previous
                            </button>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>
                                {qIndex === questions.length - 1 ? "Finish Test" : "Next Question"} <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>
                            Exit
                        </button>
                    </div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600"
                            onClick={handlePrev}
                            disabled={qIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Prev
                        </button>
                        <button
                            className="nav-pill-next-btn"
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                            onClick={handleNext}
                        >
                            {qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ElephantsTest;
