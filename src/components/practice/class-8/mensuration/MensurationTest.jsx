import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Clock, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/Grade8ChapterTests.css';

const SKILL_ID = 1226;
const SKILL_NAME = "Chapter Test";
const CHAPTER_NAME = "Mensuration";
const TOTAL_QUESTIONS = 20;

const MensurationTest = () => {
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
                text: "The area of a trapezium with parallel sides $a$ and $b$ and height $h$ is",
                options: ["$\\frac{1}{2}(a+b)h$", "$ab h$", "$(a+b)h$", "$\\frac{1}{2}abh$"],
                correctAnswer: "$\\frac{1}{2}(a+b)h$",
                solution: "The standard formula for area of a trapezium is $\\frac{1}{2} \\times$ (sum of parallel sides) $\\times$ height."
            },
            {
                id: 2,
                text: "Area of a rhombus whose diagonals are $d_1$ and $d_2$ is",
                options: ["$\\frac{1}{2} d_1 d_2$", "$d_1 d_2$", "$2 d_1 d_2$", "$\\frac{1}{4} d_1 d_2$"],
                correctAnswer: "$\\frac{1}{2} d_1 d_2$",
                solution: "Area of a rhombus is half the product of its diagonals."
            },
            {
                id: 3,
                text: "The surface area of a cube of side $a$ is",
                options: ["$6a^2$", "$4a^2$", "$a^2$", "$a^3$"],
                correctAnswer: "$6a^2$",
                solution: "A cube has $6$ faces, each of area $a^2$. So total surface area is $6a^2$."
            },
            {
                id: 4,
                text: "The volume of a cylinder with radius $r$ and height $h$ is",
                options: ["$\\pi r^2 h$", "$2\\pi r h$", "$\\pi r h$", "$\\frac{1}{3} \\pi r^2 h$"],
                correctAnswer: "$\\pi r^2 h$",
                solution: "The volume of a cylinder is base area $\\times$ height = $\\pi r^2 \\times h$."
            },
            {
                id: 5,
                text: "The lateral surface area of a cuboid of length $l$, breadth $b$ and height $h$ is",
                options: ["$2h(l+b)$", "$2(lb+bh+hl)$", "$lbh$", "$l+b+h$"],
                correctAnswer: "$2h(l+b)$",
                solution: "Literal surface area means area of $4$ walls: $2(l \\times h) + 2(b \\times h) = 2h(l+b)$."
            },
            {
                id: 6,
                text: "Find the area of a rhombus whose diagonals are $10$ cm and $8.2$ cm.",
                options: ["$41 \\text{ cm}^2$", "$82 \\text{ cm}^2$", "$20 \\text{ cm}^2$", "$16.4 \\text{ cm}^2$"],
                correctAnswer: "$41 \\text{ cm}^2$",
                solution: "Area $= \\frac{1}{2} \\times 10 \\times 8.2 = 5 \\times 8.2 = 41 \\text{ cm}^2$."
            },
            {
                id: 7,
                text: "The volume of a cube is $64 \\text{ cm}^3$. Its side is",
                options: ["$4$ cm", "$8$ cm", "$16$ cm", "$6$ cm"],
                correctAnswer: "$4$ cm",
                solution: "Volume $= a^3 = 64 \\Rightarrow a = \\sqrt[3]{64} = 4$ cm."
            },
            {
                id: 8,
                text: "$1$ Litre is equal to",
                options: ["$1000 \\text{ cm}^3$", "$100 \\text{ cm}^3$", "$10000 \\text{ cm}^3$", "$10 \\text{ cm}^3$"],
                correctAnswer: "$1000 \\text{ cm}^3$",
                solution: "By definition of capacity, $1$ L $= 1000 \\text{ cm}^3$."
            },
            {
                id: 9,
                text: "The area of a parallelogram with base $b$ and height $h$ is",
                options: ["$bh$", "$\\frac{1}{2}bh$", "$2bh$", "$b+h$"],
                correctAnswer: "$bh$",
                solution: "Area of a parallelogram is base $\\times$ corresponding altitude (height)."
            },
            {
                id: 10,
                text: "Total surface area of a cylinder of radius $r$ and height $h$ is",
                options: ["$2\\pi r(r+h)$", "$2\\pi r h$", "$\\pi r^2 h$", "$\\pi r(r+h)$"],
                correctAnswer: "$2\\pi r(r+h)$",
                solution: "Total SA = Curved Area + $2 \\times$ Base Area = $2\\pi rh + 2\\pi r^2 = 2\\pi r(h+r)$."
            },
            {
                id: 11,
                text: "If the base of a triangle is $14$ cm and height is $7$ cm, its area is",
                options: ["$49 \\text{ cm}^2$", "$98 \\text{ cm}^2$", "$21 \\text{ cm}^2$", "$100 \\text{ cm}^2$"],
                correctAnswer: "$49 \\text{ cm}^2$",
                solution: "Area $= \\frac{1}{2} \\times b \\times h = \\frac{1}{2} \\times 14 \\times 7 = 7 \\times 7 = 49 \\text{ cm}^2$."
            },
            {
                id: 12,
                text: "The area of a circle with radius $r$ is",
                options: ["$\\pi r^2$", "$2\\pi r$", "$2\\pi r^2$", "$\\pi d$"],
                correctAnswer: "$\\pi r^2$",
                solution: "The formula for the area of a circle is $\\pi r^2$."
            },
            {
                id: 13,
                text: "How many faces does a cuboid have?",
                options: ["$6$", "$4$", "$8$", "$12$"],
                correctAnswer: "$6$",
                solution: "A cuboid has $6$ rectangular faces."
            },
            {
                id: 14,
                text: "The area of a square is $144 \\text{ cm}^2$. Its perimeter is",
                options: ["$48$ cm", "$12$ cm", "$24$ cm", "$36$ cm"],
                correctAnswer: "$48$ cm",
                solution: "Side $= \\sqrt{144} = 12$ cm. Perimeter $= 4 \\times 12 = 48$ cm."
            },
            {
                id: 15,
                text: "Find the volume of a cuboid of dimensions $5$ cm $\\times 3$ cm $\\times 2$ cm.",
                options: ["$30 \\text{ cm}^3$", "$60 \\text{ cm}^3$", "$10 \\text{ cm}^3$", "$15 \\text{ cm}^3$"],
                correctAnswer: "$30 \\text{ cm}^3$",
                solution: "Volume $= l \\times b \\times h = 5 \\times 3 \\times 2 = 30 \\text{ cm}^3$."
            },
            {
                id: 16,
                text: "The sum of the areas of all the faces of a 3D figure is called its",
                options: ["Total Surface Area", "Lateral Surface Area", "Volume", "Perimeter"],
                correctAnswer: "Total Surface Area",
                solution: "By definition, the total surface area is the sum of areas of all faces."
            },
            {
                id: 17,
                text: "A rectangular park is $60$ m long and $40$ m wide. The area of the park is",
                options: ["$2400 \\text{ m}^2$", "$100 \\text{ m}^2$", "$200 \\text{ m}^2$", "$240 \\text{ m}^2$"],
                correctAnswer: "$2400 \\text{ m}^2$",
                solution: "Area $= length \\times width = 60 \\times 40 = 2400 \\text{ m}^2$."
            },
            {
                id: 18,
                text: "The side of a rhombus is $5$ cm and its altitude is $4.8$ cm. Its area is",
                options: ["$24 \\text{ cm}^2$", "$20 \\text{ cm}^2$", "$10 \\text{ cm}^2$", "$48 \\text{ cm}^2$"],
                correctAnswer: "$24 \\text{ cm}^2$",
                solution: "Rhombus is a parallelogram. Area $= base \\times height = 5 \\times 4.8 = 24 \\text{ cm}^2$."
            },
            {
                id: 19,
                text: "A cylindrical tank has capacity $154 \\text{ m}^3$ and radius $7$ m. Find its height.",
                options: ["$1$ m", "$2$ m", "$7$ m", "$11$ m"],
                correctAnswer: "$1$ m",
                solution: "Volume $= \\pi r^2 h = \\frac{22}{7} \\times 7 \\times 7 \\times h = 154 \\Rightarrow 154h = 154 \\Rightarrow h = 1$ m."
            },
            {
                id: 20,
                text: "Diagonal of a square of side $a$ is",
                options: ["$\\sqrt{2}a$", "$2a$", "$a^2$", "$\\frac{a}{\\sqrt{2}}$"],
                correctAnswer: "$\\sqrt{2}a$",
                solution: "By Pythagoras theorem in a square: $d^2 = a^2 + a^2 = 2a^2 \\Rightarrow d = \\sqrt{2}a$."
            }
        ];

        return pool.map(q => {
            const hasAllOfAbove = q.options.includes("All of the above") || q.options.includes("All of these");
            const hasNoneOfAbove = q.options.includes("None of these") || q.options.includes("None of the above");

            let optionsToShuffle = [...q.options];

            if (hasAllOfAbove) {
                optionsToShuffle = optionsToShuffle.filter(o => !["All of the above", "All of these"].includes(o));
            }
            if (hasNoneOfAbove) {
                optionsToShuffle = optionsToShuffle.filter(o => !["None of these", "None of the above"].includes(o));
            }

            let shuffled = shuffleArray(optionsToShuffle);

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

export default MensurationTest;
