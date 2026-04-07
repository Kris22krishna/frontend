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

const SKILL_ID = 1227;
const SKILL_NAME = "Chapter Test";
const CHAPTER_NAME = "Factorisation";
const TOTAL_QUESTIONS = 20;

const FactorisationTest = () => {
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
                text: "The common factor of $12y$ and $30$ is",
                options: ["$6$", "$12$", "$30$", "$6y$"],
                correctAnswer: "$6$",
                solution: "$12y = 2 \\times 2 \\times 3 \\times y$. $30 = 2 \\times 3 \\times 5$. Common factors are $2 \\times 3 = 6$."
            },
            {
                id: 2,
                text: "Factorise: $5x^2y - 15xy^2$",
                options: ["$5xy(x - 3y)$", "$5xy(x + 3y)$", "$5x(xy - 3y)$", "$5y(x^2 - 3xy)$"],
                correctAnswer: "$5xy(x - 3y)$",
                solution: "Taking out the common factor $5xy$, we get $5xy(x - 3y)$."
            },
            {
                id: 3,
                text: "Factorise: $a^2 + bc + ab + ac$",
                options: ["$(a+b)(a+c)$", "$(a+b)(b+c)$", "$(b+c)(c+a)$", "$(a+b)(a+b)$"],
                correctAnswer: "$(a+b)(a+c)$",
                solution: "Regroup terms: $(a^2 + ac) + (ab + bc) = a(a+c) + b(a+c) = (a+b)(a+c)$."
            },
            {
                id: 4,
                text: "Factorise using identity: $p^2 - 10p + 25$",
                options: ["$(p - 5)^2$", "$(p + 5)^2$", "$(p - 25)^2$", "$(p + 25)^2$"],
                correctAnswer: "$(p - 5)^2$",
                solution: "Using $(a-b)^2 = a^2 - 2ab + b^2$ where $a=p$ and $b=5$. We get $(p-5)^2$."
            },
            {
                id: 5,
                text: "Factorise: $49p^2 - 36$",
                options: ["$(7p - 6)(7p + 6)$", "$(7p - 6)^2$", "$(7p + 6)^2$", "$(49p - 36)(49p + 36)$"],
                correctAnswer: "$(7p - 6)(7p + 6)$",
                solution: "Using $a^2 - b^2 = (a-b)(a+b)$. $49p^2 - 36 = (7p)^2 - (6)^2 = (7p-6)(7p+6)$."
            },
            {
                id: 6,
                text: "Factorise: $x^2 + 5x + 6$",
                options: ["$(x+2)(x+3)$", "$(x-2)(x-3)$", "$(x+1)(x+6)$", "$(x-1)(x-6)$"],
                correctAnswer: "$(x+2)(x+3)$",
                solution: "We need two numbers whose sum is $5$ and product is $6$. The numbers are $2$ and $3$. Thus, $(x+2)(x+3)$."
            },
            {
                id: 7,
                text: "Divide $28x^4$ by $56x$.",
                options: ["$\\frac{x^3}{2}$", "$2x^3$", "$\\frac{1}{2x^3}$", "$-2x^3$"],
                correctAnswer: "$\\frac{x^3}{2}$",
                solution: "$\\frac{28x^4}{56x} = \\frac{28}{56} \\times \\frac{x^4}{x} = \\frac{1}{2} x^3 = \\frac{x^3}{2}$."
            },
            {
                id: 8,
                text: "Divide $(5x^2 - 6x)$ by $3x$.",
                options: ["$\\frac{5}{3}x - 2$", "$\\frac{5}{3}x + 2$", "$\\frac{5}{3}x^2 - 2x$", "$\\frac{5}{3} - 2x$"],
                correctAnswer: "$\\frac{5}{3}x - 2$",
                solution: "$\\frac{5x^2 - 6x}{3x} = \\frac{5x^2}{3x} - \\frac{6x}{3x} = \\frac{5}{3}x - 2$."
            },
            {
                id: 9,
                text: "Divide: $z(5z^2 - 80) \\div 5z(z + 4)$",
                options: ["$z - 4$", "$z + 4$", "$5(z - 4)$", "$z(z - 4)$"],
                correctAnswer: "$z - 4$",
                solution: "$z \\times 5(z^2 - 16) \\div [5z(z+4)] = \\frac{5z(z-4)(z+4)}{5z(z+4)} = z-4$."
            },
            {
                id: 10,
                text: "Factorise: $y^2 - 7y + 12$",
                options: ["$(y-3)(y-4)$", "$(y+3)(y+4)$", "$(y-2)(y-6)$", "$(y-1)(y-12)$"],
                correctAnswer: "$(y-3)(y-4)$",
                solution: "We need two numbers whose sum is $-7$ and product is $12$. The numbers are $-3$ and $-4$. Thus, $(y-3)(y-4)$."
            },
            {
                id: 11,
                text: "The common factor of $14a^2b$ and $35ab^2$ is",
                options: ["$7ab$", "$7a^2b^2$", "$14ab$", "$35ab$"],
                correctAnswer: "$7ab$",
                solution: "$14a^2b = 2 \\times 7 \\times a \\times a \\times b$. $35ab^2 = 5 \\times 7 \\times a \\times b \\times b$. Common is $7ab$."
            },
            {
                id: 12,
                text: "Factorise: $x^2 - 16$",
                options: ["$(x-4)(x+4)$", "$(x-4)^2$", "$(x+4)^2$", "$(x-16)(x+16)$"],
                correctAnswer: "$(x-4)(x+4)$",
                solution: "Using $a^2 - b^2 = (a-b)(a+b)$. So $x^2 - 16 = x^2 - 4^2 = (x-4)(x+4)$."
            },
            {
                id: 13,
                text: "Factorise: $x^2 + 8x + 16$",
                options: ["$(x+4)^2$", "$(x-4)^2$", "$(x+8)^2$", "$(x-8)^2$"],
                correctAnswer: "$(x+4)^2$",
                solution: "This is matching $(a+b)^2 = a^2 + 2ab + b^2$. So $x^2 + 2(x)(4) + 4^2 = (x+4)^2$."
            },
            {
                id: 14,
                text: "The factors of $m^2 - 256$ are",
                options: ["$(m-16)(m+16)$", "$(m-16)^2$", "$(m+16)^2$", "$(m-14)(m+14)$"],
                correctAnswer: "$(m-16)(m+16)$",
                solution: "Since $256 = 16^2$, difference of squares gives $(m-16)(m+16)$."
            },
            {
                id: 15,
                text: "Factorise: $3x^2 + 6x$",
                options: ["$3x(x+2)$", "$3(x^2+2x)$", "$x(3x+6)$", "All of the above"],
                correctAnswer: "All of the above",
                solution: "Although $3x(x+2)$ is completely factorised, the other two expressions are also factors of it mathematically. So all options are valid representations."
            },
            {
                id: 16,
                text: "The value of $99^2$ using identity is",
                options: ["$9801$", "$9999$", "$9800$", "$10000$"],
                correctAnswer: "$9801$",
                solution: "$(100 - 1)^2 = 100^2 - 2(100)(1) + 1^2 = 10000 - 200 + 1 = 9801$."
            },
            {
                id: 17,
                text: "Divide $44(x^4 - 5x^3 - 24x^2)$ by $11x(x - 8)$.",
                options: ["$4x(x+3)$", "$4(x+3)$", "$x(x+3)$", "$4x(x-3)$"],
                correctAnswer: "$4x(x+3)$",
                solution: "$44x^2(x^2 - 5x - 24) = 44x^2(x-8)(x+3)$. Dividing by $11x(x-8)$, we get $4x(x+3)$."
            },
            {
                id: 18,
                text: "Factorise: $x^2 - x - 42$",
                options: ["$(x-7)(x+6)$", "$(x+7)(x-6)$", "$(x-7)(x-6)$", "$(x+7)(x+6)$"],
                correctAnswer: "$(x-7)(x+6)$",
                solution: "Sum is $-1$, product is $-42$. Numbers are $-7, 6$. So $(x-7)(x+6)$."
            },
            {
                id: 19,
                text: "Factorise: $a^4 - b^4$",
                options: ["$(a^2+b^2)(a-b)(a+b)$", "$(a^2-b^2)^2$", "$(a-b)^4$", "$(a+b)^4$"],
                correctAnswer: "$(a^2+b^2)(a-b)(a+b)$",
                solution: "$(a^2)^2 - (b^2)^2 = (a^2-b^2)(a^2+b^2) = (a-b)(a+b)(a^2+b^2)$."
            },
            {
                id: 20,
                text: "Factorise by regrouping: $p^2 q - p r^2 - p q + r^2$",
                options: ["$(pq - r^2)(p - 1)$", "$(pq + r^2)(p - 1)$", "$(pq - r^2)(p + 1)$", "$(pq + r^2)(p + 1)$"],
                correctAnswer: "$(pq - r^2)(p - 1)$",
                solution: "$p(pq - r^2) - 1(pq - r^2) = (pq - r^2)(p - 1)$."
            }
        ];

        return pool.map(q => {
            const hasAllOfAbove = q.options.includes("All of the above");
            const hasNoneOfAbove = q.options.includes("None of these") || q.options.includes("None of the above");

            let fixedOptions = [];
            let optionsToShuffle = [...q.options];

            if (hasAllOfAbove) {
                optionsToShuffle = optionsToShuffle.filter(o => o !== "All of the above");
            }
            if (hasNoneOfAbove) {
                optionsToShuffle = optionsToShuffle.filter(o => !["None of these", "None of the above"].includes(o));
            }

            let shuffled = shuffleArray(optionsToShuffle);

            if (hasAllOfAbove) shuffled.push("All of the above");
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

export default FactorisationTest;
