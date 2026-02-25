import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
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
        margin: 0 auto;
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

    /* Mobile Responsiveness for Practice Session Layout */
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

const SKILL_ID = 1210;
const SKILL_NAME = "Exponents and Powers - Chapter Test";

const ExponentsAndPowersTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});

    const questionStartTime = useRef(Date.now());
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);

    const generateQuestions = () => {
        const pool = [
            {
                id: 1,
                text: "The value of $2^{-3}$ is",
                options: ["$-6$", "$\\frac{1}{8}$", "$\\frac{1}{6}$", "$\\frac{-1}{8}$"],
                correctAnswer: "$\\frac{1}{8}$",
                solution: "$2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$"
            },
            {
                id: 2,
                text: "The value of $(-2)^{-3}$ is",
                options: ["$\\frac{1}{8}$", "$\\frac{-1}{8}$", "$8$", "$-8$"],
                correctAnswer: "$\\frac{-1}{8}$",
                solution: "$(-2)^{-3} = \\frac{1}{(-2)^3} = \\frac{1}{-8} = \\frac{-1}{8}$"
            },
            {
                id: 3,
                text: "The multiplicative inverse of $10^{-100}$ is",
                options: ["$10$", "$100$", "$10^{100}$", "$10^{-100}$"],
                correctAnswer: "$10^{100}$",
                solution: "The multiplicative inverse of $a^{-m}$ is $a^m$. So inverse of $10^{-100}$ is $10^{100}$."
            },
            {
                id: 4,
                text: "The value of $(3^0 + 4^0) \\times 5^0$ is",
                options: ["$1$", "$2$", "$0$", "$7$"],
                correctAnswer: "$2$",
                solution: "Since $a^0 = 1$ for any non-zero $a$, $(1 + 1) \\times 1 = 2 \\times 1 = 2$."
            },
            {
                id: 5,
                text: "Find the value of $m$ for which $5^m \\div 5^{-3} = 5^5$.",
                options: ["$2$", "$-2$", "$3$", "$5$"],
                correctAnswer: "$2$",
                solution: "$5^m \\div 5^{-3} = 5^5 \\Rightarrow 5^{m - (-3)} = 5^5 \\Rightarrow m + 3 = 5 \\Rightarrow m = 2$."
            },
            {
                id: 6,
                text: "Express $0.00000000837$ in standard form.",
                options: ["$8.37 \\times 10^{-9}$", "$8.37 \\times 10^{-8}$", "$83.7 \\times 10^{-8}$", "$8.37 \\times 10^9$"],
                correctAnswer: "$8.37 \\times 10^{-9}$",
                solution: "Moving decimal $9$ places to the right gives $8.37 \\times 10^{-9}$."
            },
            {
                id: 7,
                text: "Express $3.02 \\times 10^{-6}$ in usual form.",
                options: ["$0.000302$", "$0.00000302$", "$0.0000302$", "$3020000$"],
                correctAnswer: "$0.00000302$",
                solution: "Moving decimal $6$ places left gives $0.00000302$."
            },
            {
                id: 8,
                text: "Evaluate: $(\\frac{1}{3})^{-2} - (\\frac{1}{2})^{-3} \\div (\\frac{1}{4})^{-2}$",
                options: ["$1$", "$0$", "$-1$", "$2$"],
                correctAnswer: "$.$",
                solution: "$(\\frac{1}{3})^{-2} = 3^2 = 9$. $(\\frac{1}{2})^{-3} = 2^3 = 8$. $(\\frac{1}{4})^{-2} = 4^2 = 16$. So, $9 - (8 \\div 16) = 9 - 0.5 = 8.5$. Oops! Let's reconsider. Correct question: Evaluate \\{(\\frac{1}{3})^{-2} - (\\frac{1}{2})^{-3}\\} \\div (\\frac{1}{4})^{-2}. Thus $(9 - 8) \\div 16 = 1/16$. But let's replace this question with simpler one..."
                // Fixing this question in options
            }
        ];

        // Let's replace question 8 with a good one:
        pool[7] = {
            id: 8,
            text: "The value of $(1/2)^{-2} + (1/3)^{-2} + (1/4)^{-2}$ is:",
            options: ["$9$", "$14$", "$29$", "$24$"],
            correctAnswer: "$29$",
            solution: "$(1/2)^{-2} = 4, (1/3)^{-2} = 9, (1/4)^{-2} = 16. Total = 4 + 9 + 16 = 29.$"
        };

        pool.push({
            id: 9,
            text: "Simplify: $(2^{-1} \\times 4^{-1}) \\div 2^{-2}$",
            options: ["$\\frac{1}{2}$", "$\\frac{1}{4}$", "$2$", "$4$"],
            correctAnswer: "$\\frac{1}{2}$",
            solution: "$(\\frac{1}{2} \\times \\frac{1}{4}) \\div (\\frac{1}{4}) = \\frac{1}{8} \\times 4 = \\frac{1}{2}$"
        });

        pool.push({
            id: 10,
            text: "What is $10^3 \\times 10^4$?",
            options: ["$10^{12}$", "$10^7$", "$10^{-1}$", "$100^7$"],
            correctAnswer: "$10^7$",
            solution: "$10^{3+4} = 10^7$"
        });

        pool.push({
            id: 11,
            text: "The value of $3^{-2}$ is",
            options: ["$-6$", "$\\frac{1}{9}$", "$\\frac{-1}{9}$", "$9$"],
            correctAnswer: "$\\frac{1}{9}$",
            solution: "$3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}$."
        });

        pool.push({
            id: 12,
            text: "Multiplicative inverse of $5^{-4}$ is",
            options: ["$5^4$", "$4^5$", "$\\frac{1}{5^4}$", "$-5$"],
            correctAnswer: "$5^4$",
            solution: "The multiplicative inverse of $a^{-m}$ is $a^m$. So inverse of $5^{-4}$ is $5^4$."
        });

        pool.push({
            id: 13,
            text: "Value of $(2^0 + 3^0) \\times 4^0$ is",
            options: ["$1$", "$2$", "$5$", "$0$"],
            correctAnswer: "$2$",
            solution: "$(1 + 1) \\times 1 = 2 \\times 1 = 2$."
        });

        pool.push({
            id: 14,
            text: "$a^m \\times a^n$ is equal to",
            options: ["$a^{m-n}$", "$a^{m+n}$", "$a^{mn}$", "$a^{m/n}$"],
            correctAnswer: "$a^{m+n}$",
            solution: "By laws of exponents, base remaining same, powers are added in multiplication: $a^{m+n}$."
        });

        pool.push({
            id: 15,
            text: "If $2^x = 32$, find $x$.",
            options: ["$4$", "$3$", "$5$", "$6$"],
            correctAnswer: "$5$",
            solution: "$32 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 2^5$. So $2^x = 2^5 \\Rightarrow x = 5$."
        });

        pool.push({
            id: 16,
            text: "The value of $(\\frac{1}{3})^{-1} - (\\frac{1}{4})^{-1}$ is",
            options: ["$-1$", "$1$", "$7$", "$-7$"],
            correctAnswer: "$-1$",
            solution: "$(\\frac{1}{3})^{-1} = 3$, and $(\\frac{1}{4})^{-1} = 4$. So $3 - 4 = -1$."
        });

        pool.push({
            id: 17,
            text: "Write $1.25 \\times 10^{-5}$ in usual form.",
            options: ["$0.000125$", "$0.0000125$", "$0.00125$", "$125000$"],
            correctAnswer: "$0.0000125$",
            solution: "Moving decimal $5$ places left gives $0.0000125$."
        });

        pool.push({
            id: 18,
            text: "Any non-zero number raised to the power $0$ is equal to",
            options: ["$0$", "$1$", "itself", "$-1$"],
            correctAnswer: "$1$",
            solution: "By definition, $a^0 = 1$ for any $a \\neq 0$."
        });

        pool.push({
            id: 19,
            text: "$a^m \\div a^n$ is equal to",
            options: ["$a^{m+n}$", "$a^{m-n}$", "$a^{m/n}$", "$a^{mn}$"],
            correctAnswer: "$a^{m-n}$",
            solution: "By laws of exponents, bases being same, powers are subtracted in division: $a^{m-n}$."
        });

        pool.push({
            id: 20,
            text: "The standard form of $450000$ is",
            options: ["$4.5 \\times 10^5$", "$45 \\times 10^4$", "$4.5 \\times 10^4$", "$4.5 \\times 10^6$"],
            correctAnswer: "$4.5 \\times 10^5$",
            solution: "To get a number between $1$ and $10$, we move the decimal $5$ places to the left: $4.5 \\times 10^5$."
        });

        return pool.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        setQuestions(generateQuestions());
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
                user_id: uid,
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: 'Medium',
                question_text: String(currentQ.text || ''),
                correct_answer: String(currentQ.correctAnswer || ''),
                student_answer: String(isSkipped ? "SKIPPED" : (selectedOption || '')),
                is_correct: isSkipped ? false : isCorrect,
                solution_text: String(currentQ.solution || ''),
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

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;

        return (
            <div className="junior-practice-page grey-selection-theme p-4 md:p-8" style={{ background: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <style>{BLUE_THEME_CSS}</style>
                <div className="exam-report-container mx-auto p-4 md:p-8 my-4 md:my-8">
                    <div className="results-hero-section flex flex-col items-center mb-6 md:mb-8 mt-4 text-center">
                        <img src={mascotImg} alt="Happy Mascot" className="w-32 h-32 md:w-40 md:h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-3xl md:text-5xl font-black text-[#31326F] mb-2 tracking-tight">Test Report</h1>
                        <p className="text-[#64748B] text-base md:text-xl font-medium mb-6 md:mb-8 px-2">How you performed in <span className="font-bold block md:inline">{SKILL_NAME}</span></p>

                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 w-full max-w-5xl">
                            <div className="stat-card bg-[#EFF6FF] p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span>
                                <span className="text-2xl md:text-4xl font-black text-[#1E3A8A]">{Math.round((correct / questions.length) * 100)}%</span>
                            </div>
                            <div className="stat-card bg-[#F0FDF4] p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center">
                                <span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span>
                                <span className="text-2xl md:text-4xl font-black text-[#14532D]">{correct}</span>
                            </div>
                            <div className="stat-card bg-[#FEF2F2] p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center col-span-1">
                                <span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span>
                                <span className="text-2xl md:text-4xl font-black text-[#7F1D1D]">{wrong}</span>
                            </div>
                            <div className="stat-card bg-[#F8FAFC] p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center col-span-1">
                                <span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span>
                                <span className="text-2xl md:text-4xl font-black text-[#334155]">{skipped}</span>
                            </div>
                            <div className="stat-card bg-[#EFF6FF] p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center col-span-2 md:col-span-1">
                                <span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Total Time</span>
                                <span className="text-2xl md:text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span>
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
                                                <LatexText text={q.text} />
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
                                            <LatexText text={q.text} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} style={{
                                                    padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0',
                                                    background: opt === q.correctAnswer ? '#DCFCE7' : (opt === res.selectedOption ? '#FEE2E2' : 'white'),
                                                    color: opt === q.correctAnswer ? '#166534' : (opt === res.selectedOption ? '#991B1B' : '#475569')
                                                }}>
                                                    <LatexText text={opt} />
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
                                                        {res.selectedOption ? <LatexText text={res.selectedOption} /> : "Skipped"}
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}>
                                                    <LatexText text={q.correctAnswer} />
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                                            {(() => {
                                                const steps = q.solution.split(/(?<=\\.)\\s+(?=[A-Z0-9$])/);
                                                if (steps.length <= 1) {
                                                    return <LatexText text={q.solution} />;
                                                }
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                        {steps.map((stepStr, sIdx) => (
                                                            <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                                <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>Step {sIdx + 1}:</span>
                                                                <span style={{ color: '#334155', lineHeight: '1.6' }}><LatexText text={stepStr.trim()} /></span>
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
                    {SKILL_NAME}
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

                    {/* Left Column: Question Card */}
                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="question-card-modern" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexText text={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: '800px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                            onClick={() => setSelectedOption(option)}
                                        >
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Question Palette */}
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
                <div className="mobile-footer-controls">
                    <button className="nav-pill-next-btn nav-pastel-btn" style={{ padding: '0.5rem 1rem' }} onClick={handlePrev} disabled={qIndex === 0}>
                        <ChevronLeft size={24} />
                    </button>
                    <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext} style={{ flex: 1 }}>
                        {qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={24} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ExponentsAndPowersTest;
