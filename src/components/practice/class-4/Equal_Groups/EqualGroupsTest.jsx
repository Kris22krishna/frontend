import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import mascotImg from '../../../../assets/mascot.png';

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
        .junior-practice-header { padding: 0 1rem !important; }
        .practice-content-wrapper { padding: 1rem 1rem 80px 1rem !important; }
        .question-card-modern { padding: 1.5rem !important; }
        .question-text-modern { font-size: 1.1rem !important; }
    }
`;

const SKILL_ID = 1214;
const SKILL_NAME = "Equal Groups - Chapter Test";

const EqualGroupsTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const [questions, setQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());

    const POOL = [
        // 1. Multiples & Skip Counting (3 Qs)
        { id: 1, topic: 'Multiples & Skip Counting', text: "Skip count by 6 starting from 6. What is the 5th number?", options: ["24", "30", "36", "18"], correctAnswer: "30", solution: "Skip counting by 6: 6, 12, 18, 24, 30. The 5th number is 30." },
        { id: 2, topic: 'Multiples & Skip Counting', text: "Which number is a common multiple of both 4 and 6?", options: ["8", "12", "18", "16"], correctAnswer: "12", solution: "Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... The first common multiple is 12." },
        { id: 3, topic: 'Multiples & Skip Counting', text: "If you jump by 3s on a number line starting from 0, will you land on 20?", options: ["Yes", "No"], correctAnswer: "No", solution: "Jumps of 3: 0, 3, 6, 9, 12, 15, 18, 21... You skip right over 20! 20 is not a multiple of 3." },

        // 2. Equal Groups to Multiplication (3 Qs)
        { id: 4, topic: 'Equal Groups to Multiplication', text: "There are 4 bags with 7 oranges each. How many oranges in all?", options: ["24", "28", "32", "21"], correctAnswer: "28", solution: "4 groups of 7 = 4 × 7 = 28 oranges." },
        { id: 5, topic: 'Equal Groups to Multiplication', text: "An array has 3 rows and 8 columns. How many items total?", options: ["24", "11", "21", "32"], correctAnswer: "24", solution: "3 rows × 8 columns = 24 items in the array." },
        { id: 6, topic: 'Equal Groups to Multiplication', text: "Which multiplication sentence matches '5 groups of 9'?", options: ["5 + 9", "5 × 9", "9 − 5", "9 ÷ 5"], correctAnswer: "5 × 9", solution: "'5 groups of 9' means 5 × 9 = 45. Multiplication represents repeated equal groups." },

        // 3. Doubling & Number Patterns (3 Qs)
        { id: 7, topic: 'Doubling & Number Patterns', text: "What is double of 45?", options: ["80", "85", "90", "95"], correctAnswer: "90", solution: "Double of 45 = 45 × 2 = 90. You can also think: 40×2=80, 5×2=10, 80+10=90." },
        { id: 8, topic: 'Doubling & Number Patterns', text: "Look at the pattern of ones digits when doubling: 1, 2, 4, 8, 16, 32, 64... The ones digits are: 1, 2, 4, 8, 6, 2, 4... After how many numbers does the ones-digit pattern repeat?", options: ["4", "5", "6", "3"], correctAnswer: "4", solution: "Ones digits when doubling: 1, 2, 4, 8, 6, 2, 4, 8, 6... The pattern (2, 4, 8, 6) repeats every 4 numbers." },
        { id: 9, topic: 'Doubling & Number Patterns', text: "If you keep doubling starting from 3, which number comes 4th?", options: ["24", "48", "12", "36"], correctAnswer: "48", solution: "Doubling from 3: 3 → 6 → 12 → 24 → 48. The 4th doubled value is 48." },

        // 4. Multiplication Strategies (3 Qs)
        { id: 10, topic: 'Multiplication Strategies', text: "Use the break-apart strategy: 7 × 12 = ?", options: ["84", "74", "94", "72"], correctAnswer: "84", solution: "Break 12 into 10 + 2. So 7 × 12 = 7 × 10 + 7 × 2 = 70 + 14 = 84." },
        { id: 11, topic: 'Multiplication Strategies', text: "What is 6 × 30?", options: ["180", "160", "240", "120"], correctAnswer: "180", solution: "6 × 30 = 6 × 3 × 10 = 18 × 10 = 180." },
        { id: 12, topic: 'Multiplication Strategies', text: "What is 4 × 200?", options: ["800", "600", "400", "1,000"], correctAnswer: "800", solution: "4 × 200 = 4 × 2 × 100 = 8 × 100 = 800." },

        // 5. Multiplication Word Problems (2 Qs)
        { id: 13, topic: 'Multiplication Word Problems', text: "A school has 8 classrooms. Each classroom has 35 students. How many students in all?", options: ["280", "270", "290", "240"], correctAnswer: "280", solution: "8 × 35 = 8 × 30 + 8 × 5 = 240 + 40 = 280 students." },
        { id: 14, topic: 'Multiplication Word Problems', text: "A farmer plants 6 rows of mango trees with 12 trees in each row. How many trees altogether?", options: ["72", "62", "82", "68"], correctAnswer: "72", solution: "6 × 12 = 72 trees. You can verify: 6 × 10 = 60, 6 × 2 = 12, 60 + 12 = 72." },

        // 6. Division as Grouping (3 Qs)
        { id: 15, topic: 'Division as Grouping', text: "56 pencils are shared equally among 8 children. How many does each get?", options: ["7", "8", "6", "9"], correctAnswer: "7", solution: "56 ÷ 8 = 7. Each child gets 7 pencils." },
        { id: 16, topic: 'Division as Grouping', text: "What is 45 ÷ 9?", options: ["4", "5", "6", "7"], correctAnswer: "5", solution: "45 ÷ 9 = 5. Because 9 × 5 = 45." },
        { id: 17, topic: 'Division as Grouping', text: "29 cookies are put into bags of 4. How many full bags, and how many left over?", options: ["7 bags, 1 left over", "6 bags, 5 left over", "8 bags, 0 left over", "7 bags, 0 left over"], correctAnswer: "7 bags, 1 left over", solution: "29 ÷ 4 = 7 remainder 1. So 7 full bags with 1 cookie remaining." },

        // 7. Division Patterns & Sharing (3 Qs)
        { id: 18, topic: 'Division Patterns & Sharing', text: "What is 360 ÷ 6?", options: ["60", "50", "70", "40"], correctAnswer: "60", solution: "36 ÷ 6 = 6, so 360 ÷ 6 = 60. The pattern: when you divide a number ending in 0, the answer also follows the basic fact." },
        { id: 19, topic: 'Division Patterns & Sharing', text: "24 sweets are shared equally among 3 friends. How many does each friend get?", options: ["7", "8", "6", "9"], correctAnswer: "8", solution: "24 ÷ 3 = 8. Each friend gets 8 sweets." },
        { id: 20, topic: 'Division Patterns & Sharing', text: "Which division gives no remainder?", options: ["25 ÷ 4", "18 ÷ 5", "36 ÷ 6", "29 ÷ 3"], correctAnswer: "36 ÷ 6", solution: "36 ÷ 6 = 6 exactly, with no remainder. The others all leave remainders: 25÷4=6r1, 18÷5=3r3, 29÷3=9r2." },

        // 8. Mixed Word Problems (2 Qs)
        { id: 21, topic: 'Mixed Word Problems', text: "A baker makes 48 cupcakes. She puts 6 in each box. How many boxes does she need?", options: ["7", "8", "6", "9"], correctAnswer: "8", solution: "48 ÷ 6 = 8 boxes." },
        { id: 22, topic: 'Mixed Word Problems', text: "There are 5 teams with 9 players each. After the game, the players line up in rows of 3. How many rows?", options: ["15", "12", "18", "9"], correctAnswer: "15", solution: "Total players = 5 × 9 = 45. Rows of 3: 45 ÷ 3 = 15 rows." },

        // 9. Mathematical Reasoning (3 Qs)
        { id: 23, topic: 'Mathematical Reasoning', text: "'Multiplying a number by 1 always gives the same number.' This statement is:", options: ["Always true", "Sometimes true", "Never true", "Cannot say"], correctAnswer: "Always true", solution: "The identity property of multiplication: any number × 1 = that number. Always true!" },
        { id: 24, topic: 'Mathematical Reasoning', text: "Spot the error: 'There are 5 groups of 4 apples, so there are 25 apples in all.'", options: ["The groups should be 6", "5 × 4 = 20, not 25", "The answer should be 54", "There is no error"], correctAnswer: "5 × 4 = 20, not 25", solution: "5 groups of 4 = 5 × 4 = 20, not 25. The multiplication was done incorrectly." },
        { id: 25, topic: 'Mathematical Reasoning', text: "Create an equal group problem: 'I have 3 plates with ___ cookies on each. I have 21 cookies total.' What fills the blank?", options: ["6", "7", "8", "9"], correctAnswer: "7", solution: "3 × ? = 21. So ? = 21 ÷ 3 = 7 cookies on each plate." },
    ];

    const generateQuestions = () => POOL;

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
        const responseData = { selectedOption, isCorrect, timeTaken: (responses[qIndex]?.timeTaken || 0) + timeSpent, isSkipped };
        setResponses(prev => ({ ...prev, [qIndex]: responseData }));

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.recordAttempt({
                difficulty_level: 'Mixed', user_id: String(uid).includes("-") ? 1 : parseInt(uid, 10),
                session_id: sessionId, skill_id: SKILL_ID, question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer, student_answer: isSkipped ? "SKIPPED" : selectedOption,
                is_correct: isSkipped ? false : isCorrect, solution_text: currentQ.solution,
                time_spent_seconds: timeSpent
            }).catch(console.error);
        }
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const handleNext = () => { if (qIndex < questions.length - 1) navigateToQuestion(qIndex + 1); else { handleRecordResponse(); finalizeTest(); } };
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
            await api.createReport({ title: SKILL_NAME, type: 'practice', score: (correctCount / questions.length) * 100, parameters: { skill_id: SKILL_ID, total_questions: questions.length, correct_answers: correctCount, skipped_questions: skippedCount, time_taken_seconds: timeElapsed }, user_id: uid }).catch(console.error);
        }
    };

    const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };

    useEffect(() => { if (isTestOver) return; const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000); return () => clearInterval(timer); }, [isTestOver]);

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
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span><span className="text-4xl font-black text-[#1E3A8A]">{Math.round((correct / questions.length) * 100)}%</span></div>
                            <div className="stat-card bg-[#F0FDF4] p-6 rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span><span className="text-4xl font-black text-[#14532D]">{correct}</span></div>
                            <div className="stat-card bg-[#FEF2F2] p-6 rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span><span className="text-4xl font-black text-[#7F1D1D]">{wrong}</span></div>
                            <div className="stat-card bg-[#F8FAFC] p-6 rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span><span className="text-4xl font-black text-[#334155]">{skipped}</span></div>
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center"><span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Total Time</span><span className="text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button onClick={() => navigate(-1)} className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors" style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>Back to Topics</button>
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
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}><LatexContent html={q.text} /></div>
                                            {res.isSkipped ? <span className="status-badge status-skipped shrink-0">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct shrink-0">Correct</span> : <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-600 font-semibold text-sm whitespace-nowrap">Check Solution ↓</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {res.timeTaken}s</div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #3B82F6', background: '#F8FAFC' }}><LatexContent html={q.text} /></div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: opt === q.correctAnswer ? '#DCFCE7' : (opt === res.selectedOption ? '#FEE2E2' : 'white'), color: opt === q.correctAnswer ? '#166534' : (opt === res.selectedOption ? '#991B1B' : '#475569') }}><LatexContent html={opt} /></div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                                                {res.isSkipped ? <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span> : <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>{res.selectedOption ? <LatexContent html={res.selectedOption} /> : "Skipped"}</span>}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}><LatexContent html={q.correctAnswer} /></span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                                            {(() => { const steps = q.solution.split(/(?<=\.)\s+(?=[A-Z0-9\$])/); if (steps.length <= 1) return <LatexContent html={q.solution} />; return (<div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>{steps.map((s, i) => (<div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}><span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>Step {i + 1}:</span><span style={{ color: '#334155', lineHeight: '1.6' }}><LatexContent html={s.trim()} /></span></div>))}</div>); })()}
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
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME.length > 30 ? "Chapter Test" : SKILL_NAME}</div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-black text-xl shadow-lg">{qIndex + 1} / {questions.length}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-bold text-lg shadow-md flex items-center gap-2"><Clock size={20} /> {formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 140px 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: '60px' }}>
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}><LatexContent html={questions[qIndex].text} /></h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: '800px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (<button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`} onClick={() => setSelectedOption(option)}><LatexContent html={option} /></button>))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="question-palette-container" style={{ width: '300px', background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>Question Palette</h3>
                        <div className="palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIndex === idx; const hasResponded = responses[idx] && !responses[idx].isSkipped; const isSkipped = responses[idx] && responses[idx].isSkipped;
                                let btnBg = '#F8FAFC', btnColor = '#64748B', btnBorder = '1px solid #E2E8F0';
                                if (isCurrent) { btnBorder = '2px solid #3B82F6'; btnBg = '#EFF6FF'; btnColor = '#1D4ED8'; } else if (hasResponded) { btnBg = '#DCFCE7'; btnColor = '#166534'; btnBorder = '1px solid #BBF7D0'; } else if (isSkipped) { btnBg = '#FFF7ED'; btnColor = '#C2410C'; btnBorder = '1px solid #FFEDD5'; }
                                return (<button key={idx} onClick={() => navigateToQuestion(idx)} style={{ height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: btnBg, color: btnColor, border: btnBorder, padding: '0' }} className="hover:shadow-md hover:-translate-y-0.5">{idx + 1}</button>);
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
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button></div>
                    <div className="bottom-right"><div style={{ display: 'flex', gap: '1.5rem' }}>
                        <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex === 0}><ChevronLeft size={20} /> Previous</button>
                        <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish Test" : "Next Question"} <ChevronRight size={20} /></button>
                    </div></div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left"><button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrev} disabled={qIndex === 0} style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}><ChevronLeft size={16} strokeWidth={3} /> Prev</button>
                        <button className="nav-pill-next-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} strokeWidth={3} /></button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EqualGroupsTest;
