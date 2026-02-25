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

const SKILL_ID = 1225;
const SKILL_NAME = "Rational Numbers - Chapter Test";

const RationalNumbersTest = () => {
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
                text: "The rational number that does not have a reciprocal is",
                options: ["$0$", "$1$", "$-1$", "$\\frac{1}{2}$"],
                correctAnswer: "$0$",
                solution: "Division by $0$ is not defined, hence $0$ has no reciprocal."
            },
            {
                id: 2,
                text: "Rational numbers are closed under",
                options: ["Addition", "Subtraction", "Multiplication", "All of these"],
                correctAnswer: "All of these",
                solution: "The sum, difference and product of two rational numbers is always a rational number."
            },
            {
                id: 3,
                text: "The additive identity for rational numbers is",
                options: ["$1$", "$0$", "$-1$", "Does not exist"],
                correctAnswer: "$0$",
                solution: "When we add $0$ to any rational number $a$, the sum is $a$. So, $a + 0 = a$."
            },
            {
                id: 4,
                text: "The multiplicative inverse of $\\frac{-13}{19}$ is",
                options: ["$\\frac{19}{13}$", "$\\frac{-19}{13}$", "$\\frac{13}{19}$", "$-13$"],
                correctAnswer: "$\\frac{-19}{13}$",
                solution: "The multiplicative inverse of $a/b$ is $b/a$. Thus, forming $\\frac{19}{-13} = \\frac{-19}{13}$."
            },
            {
                id: 5,
                text: "Between any two given rational numbers, there are",
                options: ["Exactly two rational numbers", "Limited number of rational numbers", "Countless rational numbers", "Only one rational number"],
                correctAnswer: "Countless rational numbers",
                solution: "We can always find rational numbers between any two points on a number line infinitely."
            },
            {
                id: 6,
                text: "Find the sum of $\\frac{5}{4}$ and $\\frac{-11}{4}$.",
                options: ["$\\frac{-6}{4}$", "$\\frac{6}{4}$", "$\\frac{-16}{4}$", "$\\frac{16}{4}$"],
                correctAnswer: "$\\frac{-6}{4}$",
                solution: "$\\frac{5 - 11}{4} = \\frac{-6}{4}$."
            },
            {
                id: 7,
                text: "Using appropriate properties find: $-\\frac{2}{3} \\times \\frac{3}{5} + \\frac{5}{2} - \\frac{3}{5} \\times \\frac{1}{6}$",
                options: ["$2$", "$\\frac{5}{2}$", "$\\frac{1}{2}$", "$1$"],
                correctAnswer: "$2$",
                solution: "$-\\frac{3}{5} [\\frac{2}{3} + \\frac{1}{6}] + \\frac{5}{2} = -\\frac{3}{5} [\\frac{5}{6}] + \\frac{5}{2} = -\\frac{1}{2} + \\frac{5}{2} = \\frac{4}{2} = 2$."
            },
            {
                id: 8,
                text: "The multiplicative identity for rational numbers is",
                options: ["$0$", "$-1$", "$1$", "None of the above"],
                correctAnswer: "$1$",
                solution: "When we multiply any rational number with $1$, we get the same rational number back. So $1$ is the multiplicative identity."
            },
            {
                id: 9,
                text: "Multiply $\\frac{6}{13}$ by the reciprocal of $\\frac{-7}{16}$.",
                options: ["$\\frac{96}{91}$", "$\\frac{-96}{91}$", "$\\frac{96}{-91}$", "Both B and C"],
                correctAnswer: "Both B and C",
                solution: "Reciprocal of $\\frac{-7}{16} = \\frac{-16}{7}$. Then $\\frac{6}{13} \\times (\\frac{-16}{7}) = \\frac{-96}{91}$, which can also be written as $\\frac{96}{-91}$."
            },
            {
                id: 10,
                text: "Is subtraction associative for rational numbers?",
                options: ["Yes", "No", "Only for positive rational numbers", "Only for negative rational numbers"],
                correctAnswer: "No",
                solution: "Subtraction is not associative. For example, $(5-3)-2 \\neq 5-(3-2)$."
            },
            {
                id: 11,
                text: "Which of the following numbers are their own reciprocals?",
                options: ["$1$ and $-1$", "$0$", "Only $1$", "Only $-1$"],
                correctAnswer: "$1$ and $-1$",
                solution: "The reciprocal of $1$ is $1$, and the reciprocal of $-1$ is $-1$."
            },
            {
                id: 12,
                text: "The product of a non-zero rational number and its reciprocal is",
                options: ["$0$", "$1$", "$-1$", "Not defined"],
                correctAnswer: "$1$",
                solution: "For any non-zero rational number $a/b$, $(a/b) \\times (b/a) = 1$."
            },
            {
                id: 13,
                text: "What should be added to $\\frac{-5}{4}$ to get $-1$?",
                options: ["$\\frac{1}{4}$", "$\\frac{-1}{4}$", "$\\frac{3}{4}$", "$\\frac{-3}{4}$"],
                correctAnswer: "$\\frac{1}{4}$",
                solution: "Let $x$ be the number. Then $\\frac{-5}{4} + x = -1 \\Rightarrow x = -1 - (\\frac{-5}{4}) = -1 + \\frac{5}{4} = \\frac{1}{4}$."
            },
            {
                id: 14,
                text: "What should be subtracted from $\\frac{-5}{3}$ to get $\\frac{5}{6}$?",
                options: ["$\\frac{-15}{6}$", "$\\frac{-5}{6}$", "$\\frac{5}{6}$", "$\\frac{15}{6}$"],
                correctAnswer: "$\\frac{-15}{6}$",
                solution: "Let $x$ be subtracted. $\\frac{-5}{3} - x = \\frac{5}{6} \\Rightarrow x = \\frac{-5}{3} - \\frac{5}{6} = \\frac{-10}{6} - \\frac{5}{6} = \\frac{-15}{6}$."
            },
            {
                id: 15,
                text: "The rational number equivalent to $\\frac{-24}{36}$ is",
                options: ["$\\frac{-2}{3}$", "$\\frac{-4}{6}$", "$\\frac{-6}{9}$", "All of the above"],
                correctAnswer: "All of the above",
                solution: "$\\frac{-24}{36}$ simplified is $\\frac{-2}{3}$. Multiplying by $2/2$ gives $\\frac{-4}{6}$, by $3/3$ gives $\\frac{-6}{9}$. So all are equivalent."
            },
            {
                id: 16,
                text: "The rational number $\\frac{-3}{-5}$ lies on which side of zero on the number line?",
                options: ["Right", "Left", "Neither", "Depends on value"],
                correctAnswer: "Right",
                solution: "$\\frac{-3}{-5} = \\frac{3}{5}$, which is positive, so it lies on the right side of zero."
            },
            {
                id: 17,
                text: "Find the value of $\\frac{3}{7} \\times \\frac{-2}{5} \\times \\frac{15}{16} \\times \\frac{14}{9}$.",
                options: ["$\\frac{-1}{4}$", "$\\frac{1}{4}$", "$\\frac{-1}{2}$", "$\\frac{1}{2}$"],
                correctAnswer: "$\\frac{-1}{4}$",
                solution: "$(\\frac{3}{7} \\times \\frac{14}{9}) \\times (\\frac{-2}{5} \\times \\frac{15}{16}) = (\\frac{2}{3}) \\times (\\frac{-3}{8}) = \\frac{-1}{4}$."
            },
            {
                id: 18,
                text: "Which of the following is the standard form of $\\frac{-45}{30}$?",
                options: ["$\\frac{-3}{2}$", "$\\frac{-9}{6}$", "$\\frac{-15}{10}$", "$\\frac{3}{-2}$"],
                correctAnswer: "$\\frac{-3}{2}$",
                solution: "Dividing numerator and denominator by their HCF $15$: $\\frac{-45 \\div 15}{30 \\div 15} = \\frac{-3}{2}$."
            },
            {
                id: 19,
                text: "A rational number between $\\frac{1}{4}$ and $\\frac{1}{2}$ is",
                options: ["$\\frac{3}{8}$", "$\\frac{5}{16}$", "$\\frac{7}{16}$", "All of the above"],
                correctAnswer: "All of the above",
                solution: "Average of $1/4$ and $1/2$ is $3/8$. $5/16$ ($0.3125$) and $7/16$ ($0.4375$) also lie between $0.25$ and $0.5$."
            },
            {
                id: 20,
                text: "The sum of a rational number and its additive inverse is",
                options: ["$0$", "$1$", "$-1$", "Depends on the number"],
                correctAnswer: "$0$",
                solution: "For any rational number $x$, its additive inverse is $-x$. Their sum is $x + (-x) = 0$."
            }
        ];
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

export default RationalNumbersTest;
