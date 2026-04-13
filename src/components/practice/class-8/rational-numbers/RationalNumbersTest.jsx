import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Clock, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '../../../../lib/curriculumIds';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/Grade8ChapterTests.css';

const SKILL_ID = 1225;
const SKILL_NAME = "Chapter Test";
const CHAPTER_NAME = "Rational Numbers";
const TOTAL_QUESTIONS = 20;

const RationalNumbersTest = () => {
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

    // v4 session logging
    const { startSession, logAnswer, finishSession: finishSessionV4 } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

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

        return pool.map(q => {
            const hasAllOfAbove = q.options.includes("All of the above") || q.options.includes("All of these");
            const hasNoneOfAbove = q.options.includes("None of these") || q.options.includes("None of the above");
            const hasBothBC = q.options.includes("Both B and C");

            let optionsToShuffle = [...q.options];

            if (hasAllOfAbove) {
                optionsToShuffle = optionsToShuffle.filter(o => !["All of the above", "All of these"].includes(o));
            }
            if (hasNoneOfAbove) {
                optionsToShuffle = optionsToShuffle.filter(o => !["None of these", "None of the above"].includes(o));
            }
            if (hasBothBC) {
                optionsToShuffle = optionsToShuffle.filter(o => o !== "Both B and C");
            }

            let shuffled = shuffleArray(optionsToShuffle);

            if (hasBothBC) shuffled.push("Both B and C");
            if (hasAllOfAbove) shuffled.push(q.options.find(o => ["All of the above", "All of these"].includes(o)));
            if (hasNoneOfAbove) shuffled.push(q.options.find(o => ["None of these", "None of the above"].includes(o)));

            return { ...q, options: shuffled };
        }).sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid) && !sessionId) {
            api.createPracticeSession(uid, SKILL_ID, 'test').then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        startSession({ nodeId: NODE_IDS.g8MathRNChapterTest, sessionType: 'practice' });
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

    const handleRecordResponse = () => {
        if (!questions[qIndex]) return;
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
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: isSkipped ? "SKIPPED" : selectedOption,
                is_correct: isSkipped ? false : isCorrect,
                solution_text: currentQ.solution,
                time_spent_seconds: timeSpent
            };
            api.recordAttempt(attemptData).catch(console.error);
        }

        const v4Entry = {
            question_index: qIndex,
            answer_json: { selected: selectedOption, isSkipped },
            is_correct: isSkipped ? false : (isCorrect === true),
            marks_awarded: isCorrect === true ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: timeSpent * 1000 || 0,
        };
        const existingIdx = answersPayload.current.findIndex(a => a && a.question_index === qIndex);
        if (existingIdx >= 0) { answersPayload.current[existingIdx] = v4Entry; } else { answersPayload.current.push(v4Entry); }
        logAnswer(v4Entry);
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
        if (!isFinishedRef.current) {
            isFinishedRef.current = true;
            await finishSessionV4({ answers_payload: answersPayload.current.filter(Boolean) });
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
                        <h1 className="text-4xl md:text-5xl font-normal text-[#31326F] mb-8 tracking-tight">{CHAPTER_NAME} Chapter Test Report</h1>

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
        <div className="junior-practice-page grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
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

                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                            >
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
                                                    style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: '400' }}
                                                >
                                                    <LatexText text={option} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

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

export default RationalNumbersTest;
