import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '../../../../lib/curriculumIds';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/SquaresAndSquareRoots.css';

const SKILL_ID = 1255;
const SKILL_NAME = "Chapter Test";
const CHAPTER_NAME = "Squares and Square Roots";
const TOTAL_QUESTIONS = 25;

const generateQuestionData = () => {
    return [
        { text: "Which of the following numbers can be a perfect square?", options: ["1057", "23453", "7928", "1024"], correctAnswer: "1024", solution: "Perfect squares end in $1, 4, 5, 6, 9$, or even zeroes. $1024$ is $32^2$." },
        { text: "How many non-square numbers lie between $9^2$ and $10^2$?", options: ["17", "18", "19", "20"], correctAnswer: "18", solution: "There are $2n$ non-square numbers between $n^2$ and $(n+1)^2$. For $n=9$, $2 \\times 9 = 18$." },
        { text: "If you square an odd number, what kind of number do you get?", options: ["Always Odd", "Always Even", "Sometimes Even", "Depends"], correctAnswer: "Always Odd", solution: "The square of an odd number is always odd." },
        { text: "The sum of the first $11$ odd natural numbers is:", options: ["100", "121", "144", "110"], correctAnswer: "121", solution: "Sum of first $n$ odd natural numbers is $n^2$. $11^2 = 121$." },
        { text: "Evaluate $99^2$ using an identity.", options: ["9801", "9901", "9991", "9911"], correctAnswer: "9801", solution: "$(100 - 1)^2 = 100^2 - 2(100) + 1 = 9801$." },
        { text: "Find $15^2$ without actual multiplication.", options: ["125", "225", "325", "625"], correctAnswer: "225", solution: "Number ending in $5$: $(1\\times 2)\\text{ hundred} + 25 = 225$." },
        { text: "What is $1001^2$?", options: ["100201", "102001", "1002001", "10020001"], correctAnswer: "1002001", solution: "Using the pattern, two zeroes between $1$s give two zeroes between $1, 2, 1$." },
        { text: "Is $(6, 8, 10)$ a Pythagorean triplet?", options: ["Yes", "No", "Sometimes", "Only if multiplied"], correctAnswer: "Yes", solution: "$6^2 + 8^2 = 36 + 64 = 100$, and $10^2 = 100$." },
        { text: "Find a Pythagorean triplet whose one member is $14$.", options: ["(14, 48, 50)", "(14, 30, 32)", "(14, 25, 29)", "(14, 18, 22)"], correctAnswer: "(14, 48, 50)", solution: "Let $2m=14 \\Rightarrow m=7$. $m^2-1=48$, $m^2+1=50$." },
        { text: "If $n^2 = 81$, what is the positive square root $\\sqrt{81}$?", options: ["9", "-9", "± 9", "81"], correctAnswer: "9", solution: "$\\sqrt{}$ denotes the positive square root. $\\sqrt{81} = 9$." },
        { text: "Square root is the inverse operation of:", options: ["Squaring", "Addition", "Multiplication", "Division"], correctAnswer: "Squaring", solution: "Square root undoes the operation of squaring." },
        { text: "Find the square root of $144$.", options: ["12", "14", "16", "24"], correctAnswer: "12", solution: "$12 \\times 12 = 144$." },
        { text: "By what smallest whole number should $48$ be multiplied to make it a perfect square?", options: ["3", "2", "4", "6"], correctAnswer: "3", solution: "$48 = 2^4 \\times 3$. Multiply by $3$ to pair the prime factor." },
        { text: "Find the square root of $400$.", options: ["20", "30", "40", "10"], correctAnswer: "20", solution: "$\\sqrt{4 \\times 100} = 2 \\times 10 = 20$." },
        { text: "Find the least number to be subtracted from $250$ to make it a perfect square.", options: ["25", "15", "11", "20"], correctAnswer: "25", solution: "$15^2 = 225$. $250 - 225 = 25$." },
        { text: "Find the least number to be added to $1300$ to make it a perfect square.", options: ["69", "44", "25", "84"], correctAnswer: "69", solution: "$37^2 = 1369$. $1369 - 1300 = 69$." },
        { text: "How many decimal places will the square root of $17.64$ have?", options: ["1", "2", "0", "4"], correctAnswer: "1", solution: "The number has $2$ decimal places. Its root has $2/2 = 1$ decimal place." },
        { text: "Find the square root of $42.25$.", options: ["6.5", "6.25", "7.5", "5.5"], correctAnswer: "6.5", solution: "$\\sqrt{4225} = 65$, so $\\sqrt{42.25} = 6.5$." },
        { text: "The area of a square is $31.36\\text{ m}^2$. What is the side?", options: ["5.6 m", "5.4 m", "5.8 m", "4.6 m"], correctAnswer: "5.6 m", solution: "Side $= \\sqrt{31.36} = 5.6\\text{ m}$." },
        { text: "Calculate $\\sqrt{0.0004}$.", options: ["0.02", "0.2", "0.002", "0.04"], correctAnswer: "0.02", solution: "$\\sqrt{4} = 2$. $4$ decimal places in number means $2$ in root. $0.02$." },
        { text: "Estimate $\\sqrt{90}$ to the nearest whole number.", options: ["9", "10", "8", "11"], correctAnswer: "9", solution: "$90$ is closer to $81$ ($9^2$) than $100$ ($10^2$)." },
        { text: "What will be the unit digit of the square of $52698$?", options: ["4", "8", "6", "2"], correctAnswer: "4", solution: "$8^2 = 64$. The unit digit is $4$." },
        { text: "Evaluate $25^2 - 24^2$.", options: ["49", "40", "50", "51"], correctAnswer: "49", solution: "$(n+1)^2 - n^2 = (n+1) + n = 25 + 24 = 49$." },
        { text: "Find the smallest square number divisible by $4$, $9$, and $10$.", options: ["900", "180", "360", "1600"], correctAnswer: "900", solution: "LCM is $180$. Multiply by unpaired factor $5 \\rightarrow 900$." },
        { text: "Find the square root of $7056$.", options: ["84", "86", "74", "94"], correctAnswer: "84", solution: "$\\sqrt{7056} = 84$." }
    ];
};



const SquaresAndSquareRootsTest = () => {
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
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);

    useEffect(() => {
        setQuestions(generateQuestionData());
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        startSession({ nodeId: NODE_IDS.g8MathSSRChapterTest, sessionType: 'assessment' });
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

        const v4Entry = {
            question_index: qIndex,
            answer_json: { selected: selectedOption, isSkipped },
            is_correct: isSkipped ? false : (isCorrect === true),
            marks_awarded: isCorrect === true ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: timeSpent * 1000,
        };
        const existingIdx = answersPayload.current.findIndex(a => a && a.question_index === qIndex);
        if (existingIdx >= 0) { answersPayload.current[existingIdx] = v4Entry; } else { answersPayload.current.push(v4Entry); }
        logAnswer(v4Entry);

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
        if (!isFinishedRef.current) {
            isFinishedRef.current = true;
            await finishSession({ answers_payload: answersPayload.current.filter(Boolean) });
        }
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

export default SquaresAndSquareRootsTest;
