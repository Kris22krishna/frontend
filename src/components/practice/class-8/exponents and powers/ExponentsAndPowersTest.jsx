import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/Grade8ChapterTests.css';
import { useSessionLogger } from '../../../../hooks/useSessionLogger';
import { NODE_IDS } from '../../../../lib/curriculumIds';

const SKILL_ID = 1210;
const SKILL_NAME = "Chapter Test";
const CHAPTER_NAME = "Exponents and Powers";
const TOTAL_QUESTIONS = 20;

const ExponentsAndPowersTest = () => {
    const navigate = useNavigate();
    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const storageKey = `test_${window.location.pathname}`;

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [responses, setResponses] = useState(() => getSessionData(`${storageKey}_responses`, {}));
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [isTestOver, setIsTestOver] = useState(false);

    const questionStartTime = useRef(Date.now());
    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const [questions, setQuestions] = useState([]);
    const answersPayload = useRef([]); // v4 answers collection
    const { startSession, logAnswer, finishSession } = useSessionLogger();

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
        if (!isNaN(uid) && !sessionId) {
            const sid = startSession({
                nodeId: NODE_IDS.g8MathEPChapterTest,
                sessionType: 'assessment'
            });
            if (sid) setSessionId(sid);
        }
    }, []);

    useEffect(() => {
        if (responses && qIndex !== undefined) {
            sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
            sessionStorage.setItem(`${storageKey}_responses`, JSON.stringify(responses));
            sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
            if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
        }
    }, [qIndex, responses, timeElapsed, sessionId]);

    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_responses`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
    };

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    const handleRecordResponse = async () => {
        if (!questions[qIndex]) return;
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const timeSpentMs = Date.now() - questionStartTime.current;
        const isSkipped = !selectedOption;

        const responseData = {
            selectedOption,
            isCorrect,
            timeTaken: (responses[qIndex]?.timeTaken || 0) + Math.round(timeSpentMs / 1000),
            isSkipped
        };

        setResponses(prev => ({ ...prev, [qIndex]: responseData }));

        // v4 Logging
        await logAnswer({
            questionIndex: qIndex + 1,
            answerJson: { selected: selectedOption, isSkipped },
            isCorrect: isCorrect === true ? 1.0 : 0.0,
            timeTakenMs: timeSpentMs
        });

        // Add to payload
        const existingIdx = answersPayload.current.findIndex(a => a.question_index === qIndex + 1);
        const pld = {
            question_index: qIndex + 1,
            answer_json: { selected: selectedOption, isSkipped },
            is_correct: isCorrect === true,
            marks_awarded: isCorrect === true ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: timeSpentMs
        };
        if (existingIdx >= 0) {
            answersPayload.current[existingIdx] = pld;
        } else {
            answersPayload.current.push(pld);
        }

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const attemptData = {
                user_id: uid,
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: isSkipped ? "SKIPPED" : selectedOption,
                is_correct: isSkipped ? false : isCorrect,
                solution_text: currentQ.solution,
                time_spent_seconds: Math.round(timeSpentMs / 1000)
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


    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            await navigateToQuestion(qIndex + 1);
        } else {
            await handleRecordResponse();
            await finalizeTest();
        }
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            navigateToQuestion(qIndex - 1);
        }
    };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (sessionId) {
            // v4 compile
            await finishSession({
                totalQuestions: questions.length,
                questionsAnswered: answersPayload.current.length,
                answersPayload: answersPayload.current
            });

            // legacy finish
            await api.finishSession(sessionId).catch(console.error);
        }

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({
                title: `${CHAPTER_NAME} - ${SKILL_NAME}`,
                type: 'test',
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
        clearProgress();
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
            <div className="junior-practice-page grey-selection-theme result-page-wrapper" style={{ background: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <div className="exam-report-container">
                    <div className="w-full flex justify-start mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white text-[#31326F] border-2 border-[#31326F] px-6 py-2 rounded-xl font-bold uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors flex items-center gap-2"
                            style={{ fontSize: '0.9rem' }}
                        >
                            <ArrowLeft size={18} /> Back to Topics
                        </button>
                    </div>
                    <div className="results-hero-section flex flex-col items-center mb-8 mt-4 text-center">
                        <img src={mascotImg} alt="Happy Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-4xl md:text-5xl font-normal text-[#31326F] mb-8 tracking-tight text-center">{CHAPTER_NAME} Chapter Test Report</h1>

                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-5xl">
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#3B82F6] mb-1">Score</span>
                                <span className="text-4xl font-normal text-[#1E3A8A]">{Math.round((correct / questions.length) * 100)}%</span>
                            </div>
                            <div className="stat-card bg-[#F0FDF4] p-6 rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#22C55E] mb-1">Correct</span>
                                <span className="text-4xl font-normal text-[#14532D]">{correct}</span>
                            </div>
                            <div className="stat-card bg-[#FEF2F2] p-6 rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span>
                                <span className="text-4xl font-normal text-[#7F1D1D]">{wrong}</span>
                            </div>
                            <div className="stat-card bg-[#F8FAFC] p-6 rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#64748B] mb-1">Skipped</span>
                                <span className="text-4xl font-normal text-[#334155]">{skipped}</span>
                            </div>
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#3B82F6] mb-1">Total Time</span>
                                <span className="text-4xl font-normal text-[#1E3A8A]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
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
        <div className="junior-practice-page grey-selection-theme">
            <header className="junior-practice-header">
                <div className="skill-name-display">
                    {SKILL_NAME}
                </div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-normal text-xl shadow-lg">
                    {qIndex + 1} / {questions.length}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-normal text-lg shadow-md flex items-center gap-2">
                        <Clock size={20} /> {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 1rem 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0 }}>

                    {/* Left Column: Question Card */}
                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="question-card-modern test-card-layout" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <div className="question-header-modern" style={{ overflow: 'hidden' }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '400', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
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
                                            style={{ fontFamily: '"Open Sans", sans-serif' }}
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
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '400', color: '#1E293B', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>Question Palette</h3>
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
                                            borderRadius: '6px', fontWeight: '400', fontSize: '0.85rem',
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
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-normal" onClick={() => { clearProgress(); navigate(-1); }}>Exit Test</button>
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
