import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
            min-height: calc(100vh - 120px);
        }
        .question-card-modern {
            padding: 1.5rem !important;
        }
        .question-text-modern {
            font-size: 1.1rem !important;
        }
    }
`;

const SKILL_ID = 1206;
const SKILL_NAME = "Real Numbers - Chapter Test";

const RealNumbersTest = () => {
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
                text: "Which of the following is an irrational number?",
                options: ["$\\frac{22}{7}$", "$3.1415$", "$\\pi$", "$\\sqrt{4}$"],
                correctAnswer: "$\\pi$",
                solution: "$\\pi$ is a non-terminating, non-recurring decimal, and hence irrational."
            },
            {
                id: 2,
                text: "The HCF of 135 and 225 is:",
                options: ["$15$", "$45$", "$75$", "$25$"],
                correctAnswer: "$45$",
                solution: "$225 = 135 \\times 1 + 90 \\Rightarrow 135 = 90 \\times 1 + 45 \\Rightarrow 90 = 45 \\times 2 + 0. HCF = 45$."
            },
            {
                id: 3,
                text: "The exponent of 2 in the prime factorisation of 144 is:",
                options: ["$4$", "$5$", "$6$", "$3$"],
                correctAnswer: "$4$",
                solution: "$144 = 16 \\times 9 = 2^4 \\times 3^2$. Exponent of 2 is 4."
            },
            {
                id: 4,
                text: "If $HCF(a, b) = 1$, then $a$ and $b$ are called:",
                options: ["Composite numbers", "Co-prime numbers", "Twin primes", "Perfect numbers"],
                correctAnswer: "Co-prime numbers",
                solution: "By definition, numbers whose HCF is 1 are co-prime."
            },
            {
                id: 5,
                text: "The decimal expansion of $\\frac{23}{2^3 \\times 5^2}$ will terminate after how many places?",
                options: ["2", "3", "4", "5"],
                correctAnswer: "3",
                solution: "The power of 2 and 5 determines this. $max(3, 2) = 3$."
            },
            {
                id: 6,
                text: "If $p$ is a prime number and $p$ divides $a^2$, then $p$ divides:",
                options: ["$2a$", "$a$", "$\\sqrt{a}$", "$a^3$"],
                correctAnswer: "$a$",
                solution: "Fundamental theorem of arithmetic property."
            },
            {
                id: 7,
                text: "Which of the following numbers ending decimal expansion is non-terminating recurring?",
                options: ["$\\frac{13}{3125}$", "$\\frac{17}{8}$", "$\\frac{64}{455}$", "$\\frac{15}{1600}$"],
                correctAnswer: "$\\frac{64}{455}$",
                solution: "$455 = 5 \\times 7 \\times 13$. Since it has factors other than 2 and 5, it is non-terminating recurring."
            },
            {
                id: 8,
                text: "The sum of a rational and an irrational number is always:",
                options: ["Rational", "Irrational", "Zero", "Natural number"],
                correctAnswer: "Irrational",
                solution: "Example: $3 + \\sqrt{2}$ is irrational."
            },
            {
                id: 9,
                text: "Prime factorisation of 156 is:",
                options: ["$2^2 \\times 3 \\times 13$", "$2 \\times 3 \\times 13$", "$2^2 \\times 3^2 \\times 13$", "$2 \\times 3^2 \\times 13$"],
                correctAnswer: "$2^2 \\times 3 \\times 13$",
                solution: "$156 = 2 \\times 78 = 2 \\times 2 \\times 39 = 2^2 \\times 3 \\times 13$."
            },
            {
                id: 10,
                text: "For some integer $m$, every even integer is of the form:",
                options: ["$m$", "$m+1$", "$2m$", "$2m+1$"],
                correctAnswer: "$2m$",
                solution: "Even numbers are multiples of 2."
            },
            {
                id: 11,
                text: "For some integer $n$, every odd integer is of the form:",
                options: ["$n$", "$n+1$", "$2n$", "$2n+1$"],
                correctAnswer: "$2n+1$",
                solution: "Odd numbers leave remainder 1 when divided by 2."
            },
            {
                id: 12,
                text: "($n^2 - 1$) is divisible by 8, if $n$ is:",
                options: ["an integer", "a natural number", "an odd integer", "an even integer"],
                correctAnswer: "an odd integer",
                solution: "If $n$ is odd, $n=2k+1, (2k+1)^2-1 = 4k^2+4k = 4k(k+1)$, always divisible by 8 since $k(k+1)$ is even."
            },
            {
                id: 13,
                text: "The decimal expansion of the rational number $\\frac{14587}{1250}$ will terminate after:",
                options: ["one decimal place", "two decimal places", "three decimal places", "four decimal places"],
                correctAnswer: "four decimal places",
                solution: "$1250 = 2 \\times 5^4$. Max exponent is 4."
            },
            {
                id: 14,
                text: "The HCF and LCM of 12, 15, 21 are:",
                options: ["3, 420", "3, 210", "1, 420", "12, 105"],
                correctAnswer: "3, 420",
                solution: "$HCF(12, 15, 21) = 3$. $LCM(12, 15, 21) = 420$."
            },
            {
                id: 15,
                text: "The product of $(3+\\sqrt{3})(3-\\sqrt{3})$ is:",
                options: ["Rational", "Irrational", "Zero", "Prime"],
                correctAnswer: "Rational",
                solution: "$3^2 - (\\sqrt{3})^2 = 9 - 3 = 6$. Rational."
            },
            {
                id: 16,
                text: "Is $6^n$ able to end with the digit 0 for any natural number $n$?",
                options: ["Yes", "No"],
                correctAnswer: "No",
                solution: "$6^n = (2 \\times 3)^n$. To end in 0, it must have 5 as a prime factor."
            },
            {
                id: 17,
                text: "If $LCM(91, 26) = 182$, then $HCF(91, 26)$ is:",
                options: ["$13$", "$26$", "$7$", "$9$"],
                correctAnswer: "$13$",
                solution: "$HCF \\times LCM = a \\times b \\Rightarrow HCF = \\frac{91 \\times 26}{182} = 13$."
            },
            {
                id: 18,
                text: "The largest number which divides 70 and 125, leaving remainders 5 and 8, respectively, is:",
                options: ["$13$", "$65$", "$875$", "$1750$"],
                correctAnswer: "$13$",
                solution: "$HCF(70-5, 125-8) = HCF(65, 117) = 13$."
            },
            {
                id: 19,
                text: "If two positive integers $a$ and $b$ are written as $a = x^3 y^2$ and $b = xy^3$; $x, y$ are prime numbers, then $HCF(a, b)$ is:",
                options: ["$xy$", "$xy^2$", "$x^3 y^3$", "$x^2 y^2$"],
                correctAnswer: "$xy^2$",
                solution: "HCF takes lowest powers: $x^1, y^2 = xy^2$."
            },
            {
                id: 20,
                text: "If two positive integers $p$ and $q$ can be expressed as $p = ab^2$ and $q = a^3b$; $a, b$ being prime numbers, then $LCM(p, q)$ is:",
                options: ["$ab$", "$a^2b^2$", "$a^3b^2$", "$a^3b^3$"],
                correctAnswer: "$a^3b^2$",
                solution: "LCM takes highest powers: $a^3, b^2 = a^3b^2$."
            },
            {
                id: 21,
                text: "The product of a non-zero rational and an irrational number is:",
                options: ["always irrational", "always rational", "rational or irrational", "one"],
                correctAnswer: "always irrational",
                solution: "Example: $2 \\times \\sqrt{3} = 2\\sqrt{3}$ is irrational."
            },
            {
                id: 22,
                text: "The least number that is divisible by all the numbers from 1 to 10 (both inclusive) is:",
                options: ["$10$", "$100$", "$504$", "$2520$"],
                correctAnswer: "$2520$",
                solution: "$LCM(1, 2, ..., 10) = 2520$."
            },
            {
                id: 23,
                text: "The decimal expansion of the rational number $\\frac{33}{2^2 \\cdot 5}$ will terminate after:",
                options: ["one decimal place", "two decimal places", "three decimal places", "more than three decimal places"],
                correctAnswer: "two decimal places",
                solution: "Max exponent of 2 and 5 is 2."
            },
            {
                id: 24,
                text: "Prime factorisation of 3825 is:",
                options: ["$3^2 \\times 5^2 \\times 17$", "$3 \\times 5^2 \\times 17$", "$3^2 \\times 5^2 \\times 19$", "$3 \\times 5 \\times 17$"],
                correctAnswer: "$3^2 \\times 5^2 \\times 17$",
                solution: "$3825 = 5 \\times 765 = 5 \\times 5 \\times 153 = 5^2 \\times 3 \\times 51 = 5^2 \\times 3^2 \\times 17$."
            },
            {
                id: 25,
                text: "Fundamental Theorem of Arithmetic states that every composite number can be expressed as a product of:",
                options: ["Primes", "Composites", "Integers", "Natural numbers"],
                correctAnswer: "Primes",
                solution: "Every composite number can be uniquely factorised into primes."
            }
        ];
        return pool.sort(() => Math.random() - 0.5);
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

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    const handleRecordResponse = (skipped = false) => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption === currentQ.correctAnswer;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);

        const responseData = {
            selectedOption,
            isCorrect: skipped ? null : isCorrect,
            timeTaken: timeSpent,
            isSkipped: skipped
        };

        setResponses(prev => ({ ...prev, [qIndex]: responseData }));

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const attemptData = {
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                user_id: String(uid).includes("-") ? 1 : parseInt(uid, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: skipped ? "SKIPPED" : selectedOption,
                is_correct: skipped ? false : isCorrect,
                solution_text: currentQ.solution,
                time_spent_seconds: timeSpent
            };

            console.log('🔍 recordAttempt called with:', attemptData);
            api.recordAttempt(attemptData).then(res => {
                console.log('✅ recordAttempt response:', res);
            }).catch(console.error);
        }
    };

    const handleNext = () => {
        handleRecordResponse(!selectedOption);
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            const nextResp = responses[qIndex + 1];
            setSelectedOption(nextResp ? nextResp.selectedOption : null);
            questionStartTime.current = Date.now();
        } else {
            finalizeTest();
        }
    };

    const handlePrev = () => {
        handleRecordResponse(!selectedOption);
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            const prevResp = responses[qIndex - 1];
            setSelectedOption(prevResp ? prevResp.selectedOption : null);
            questionStartTime.current = Date.now();
        }
    };

    const navigateToQuestion = (index) => {
        handleRecordResponse(!selectedOption);
        setQIndex(index);
        const nextResp = responses[index];
        setSelectedOption(nextResp ? nextResp.selectedOption : null);
        questionStartTime.current = Date.now();
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
                                                const steps = q.solution.split(/(?<=\.)\s+(?=[A-Z0-9\$])/);
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
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexText text={questions[qIndex].text} />
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
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>
                            Exit
                        </button>
                    </div>
                    <div className="mobile-footer-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        {isSubmitted && <button className="view-explanation-btn" style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }} onClick={() => setShowExplanationModal(true)}><Eye size={14} /> VIEW EXPLANATION</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Prev
                        </button>
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleNext}>Next <ChevronRight size={16} strokeWidth={3} /></button>
                        ) : (
                            <button className="nav-pill-submit-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={16} strokeWidth={3} /></button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RealNumbersTest;
