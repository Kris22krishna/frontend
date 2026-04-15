import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import LatexContent from '../../../../LatexContent';
import mascotImg from '../../../../../assets/mascot.png';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const MultiplyDivideTest = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 9013;
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false); // Assuming a new ID for the chapter test
    const SKILL_NAME = "Chapter Test: Ways to Multiply and Divide";

    const TOTAL_QUESTIONS = 15;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        startSession({ nodeId: 'a4051013-0011-0000-0000-000000000000', sessionType: 'practice' });
        v4AnswersPayload.current = [];
        v4IsFinishedRef.current = false;
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const generateQuestions = () => {
            const qs = [
                {
                    text: "Multiply 45 by 23.",
                    correctAnswer: "1035",
                    options: ["1035", "1045", "935", "1135"],
                    solution: "$45 \\times 20 = 900$.<br/>$45 \\times 3 = 135$.<br/>$900 + 135 = 1035$."
                },
                {
                    text: "Find the product: $342 \\times 15$",
                    correctAnswer: "5130",
                    options: ["5130", "5110", "4130", "6130"],
                    solution: "$342 \\times 10 = 3420$.<br/>$342 \\times 5 = 1710$.<br/>$3420 + 1710 = 5130$."
                },
                {
                    text: "A factory produces 250 toys every day. How many toys will it produce in 30 days?",
                    correctAnswer: "7500",
                    options: ["7500", "750", "7000", "8500"],
                    solution: "$250 \\times 30 = 25 \\times 3 \\times 100 = 75 \\times 100 = 7500$."
                },
                {
                    text: "What is $1200 \\times 40$?",
                    correctAnswer: "48000",
                    options: ["4800", "48000", "480000", "480"],
                    solution: "Multiply the non-zero digits: $12 \\times 4 = 48$. Then attach the three zeros: 48000."
                },
                {
                    text: "Divide 456 by 4.",
                    correctAnswer: "114",
                    options: ["114", "104", "124", "116"],
                    solution: "$400 \\div 4 = 100$.<br/>$56 \\div 4 = 14$.<br/>$100 + 14 = 114$."
                },
                {
                    text: "Find the quotient when 875 is divided by 25.",
                    correctAnswer: "35",
                    options: ["35", "25", "45", "30"],
                    solution: "There are four 25s in 100. So in 800, there are $8 \\times 4 = 32$.<br/>In 75, there are 3.<br/>Total = $32 + 3 = 35$."
                },
                {
                    text: "If 12 pens cost ₹144, what is the cost of 1 pen?",
                    correctAnswer: "₹12",
                    options: ["₹12", "₹14", "₹10", "₹16"],
                    solution: "Cost of 1 pen = $144 \\div 12$. Since $12 \\times 12 = 144$, the answer is ₹12."
                },
                {
                    text: "A farmer packed 3600 apples equally into 60 boxes. How many apples are in each box?",
                    correctAnswer: "60",
                    options: ["60", "600", "36", "360"],
                    solution: "$3600 \\div 60$<br/>Cancel one zero: $360 \\div 6 = 60$."
                },
                {
                    text: "Solve: $24 \\times 15 \\times 2$",
                    correctAnswer: "720",
                    options: ["720", "360", "480", "120"],
                    solution: "Use the associative property to make it easier: $15 \\times 2 = 30$.<br/>Then $24 \\times 30 = 720$."
                },
                {
                    text: "What is $9500 \\div 50$?",
                    correctAnswer: "190",
                    options: ["190", "19", "180", "1900"],
                    solution: "$9500 \\div 50 = 950 \\div 5$<br/>$950 \\div 5 = (1000 - 50) \\div 5 = 200 - 10 = 190$."
                },
                {
                    text: "A book has 315 pages. If you read 15 pages a day, how many days will you take to finish it?",
                    correctAnswer: "21",
                    options: ["21", "25", "15", "30"],
                    solution: "$315 \\div 15 = (300 + 15) \\div 15 = 20 + 1 = 21$ days."
                },
                {
                    text: "Find the product: $500 \\times 600$",
                    correctAnswer: "300,000",
                    options: ["300,000", "30,000", "3,000,000", "3,000"],
                    solution: "Multiply $5 \\times 6 = 30$. Add the 4 zeros: 300,000."
                },
                {
                    text: "Which of the following numbers leaves a remainder of 3 when divided by 5?",
                    correctAnswer: "48",
                    options: ["48", "45", "50", "42"],
                    solution: "Multiples of 5 end in 0 or 5. Adding 3 to a multiple of 5 gives a number ending in 3 or 8. 48 ends in 8."
                },
                {
                    text: "A stadium has 45 rows of seats with 120 seats in each row. What is the total seating capacity?",
                    correctAnswer: "5400",
                    options: ["5400", "4500", "4800", "6000"],
                    solution: "$120 \\times 45 = 120 \\times (50 - 5)$<br/>$120 \\times 50 = 6000$<br/>$120 \\times 5 = 600$<br/>$6000 - 600 = 5400$."
                },
                {
                    text: "If $123 \\times 45 = 5535$, what is $12.3 \\times 45$?",
                    correctAnswer: "553.5",
                    options: ["553.5", "55.35", "5.535", "5535"],
                    solution: "Since one factor was divided by 10 (123 to 12.3), the total product is also divided by 10."
                }
            ];
            return qs.map(q => ({
                ...q,
                shuffledOptions: [...q.options].sort(() => Math.random() - 0.5)
            }));
        };

        setSessionQuestions(generateQuestions());

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions(qData.shuffledOptions);
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
            } else {
                setSelectedOption(null);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect, isSkipped = false) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: 'Mixed',
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: isSkipped ? "Skipped" : String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        const _v4t = Date.now() - questionStartTime.current;
        v4AnswersPayload.current.push({
            question_index: typeof qIndex !== 'undefined' ? qIndex : 0,
            answer_json: JSON.stringify({ answer: typeof selectedOption !== 'undefined' ? selectedOption : selected }),
            is_correct: typeof isRight !== 'undefined' ? isRight : isCorrect,
            marks_awarded: (typeof isRight !== 'undefined' ? isRight : isCorrect) ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: _v4t > 0 ? _v4t : 0,
        });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleNext = async () => {
        if (!selectedOption) return;

        const isRight = selectedOption === currentQuestion.correctAnswer;
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption, isSkipped: false } }));
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);

        proceedToNext();
    };

    const handleSkip = async () => {
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: false, selected: "Skipped", isSkipped: true } }));
        recordQuestionAttempt(currentQuestion, "Skipped", false, true);
        proceedToNext();
    };

    const proceedToNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            finalizeAssessment();
        }
    };

    const finalizeAssessment = async () => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!v4IsFinishedRef.current) {
                v4IsFinishedRef.current = true;
                finishSession({ answers_payload: v4AnswersPayload.current });
            }
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        setShowResults(true);

        const userIdInt = parseInt(userId, 10);
        if (userIdInt) {
            const results = Object.values(answers);
            const totalCorrect = results.filter(r => r.isCorrect).length;
            api.createReport({
                title: SKILL_NAME,
                type: 'practice',
                score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                parameters: {
                    skill_id: SKILL_ID,
                    skill_name: SKILL_NAME,
                    total_questions: TOTAL_QUESTIONS,
                    correct_answers: totalCorrect,
                    time_taken_seconds: timeElapsed
                },
                user_id: userIdInt
            }).catch(err => console.error("Failed to create report", err));
        }
    }

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    if (!currentQuestion && !showResults) return <div className="flex justify-center items-center h-screen text-[#31326F] font-bold tracking-widest text-2xl uppercase italic animate-pulse">Initializing Assessment...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(val => val.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Syllabus</button>
                    <div className="sun-timer-container">
                        <div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div>
                    </div>
                    <div className="title-area"><h1 className="results-title">Chapter Mastery Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-1">Assessment Complete! ✨</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span>
                                <span className="text-3xl font-black text-[#31326F]">{percentage}%</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Score</span>
                                <span className="text-3xl font-black text-[#31326F]">{score * 10} pts</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Detailed Answer Key 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <div key={idx} className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'} relative`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>{idx + 1}</div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-4">
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '1rem', width: '100%' }}>
                                                        <span style={{ color: '#4FB7B3', fontWeight: 'bold', fontSize: '1.25rem', flexShrink: 0 }}>Q{idx + 1}.</span>
                                                        <div style={{ textAlign: 'left', margin: 0 }}>
                                                            <LatexContent html={q.text} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Selection</span>
                                                        <span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}><LatexContent html={ans.selected} /></span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20">
                                                            <span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span>
                                                            <span className="text-lg font-black text-[#31326F]"><LatexContent html={q.correctAnswer} /></span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Detailed Solution 💡</span>
                                                    <div className="text-sm font-medium text-gray-600 leading-relaxed"><LatexContent html={q.solution} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retry Test</button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-black text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate(-1)}>Back to Syllabus</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Chapter Test | Q{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '1rem', width: '100%' }}>
                                            <span style={{ color: '#4FB7B3', fontWeight: 'bold', fontSize: '1.75rem', flexShrink: 0 }}>{qIndex + 1}.</span>
                                            <h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '1.75rem', fontWeight: '400', textAlign: 'left', margin: 0 }}>
                                                <LatexContent html={currentQuestion.text} />
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`} onClick={() => setSelectedOption(option)} style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: '400', fontSize: '1.75rem' }}><LatexContent html={option} /></button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="bottom-center"></div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>}
                            {!selectedOption && qIndex < TOTAL_QUESTIONS - 1 && (
                                <button className="bg-gray-50 text-gray-400 px-8 py-4 rounded-full border-2 border-gray-200 font-black flex items-center gap-2 hover:bg-gray-100 transition-all" onClick={handleSkip}>Skip <FastForward size={20} /></button>
                            )}
                            <button className="nav-pill-submit-btn" onClick={handleNext} disabled={!selectedOption}>{qIndex < TOTAL_QUESTIONS - 1 ? <>Next Question <ChevronRight size={28} strokeWidth={3} /></> : <>Finish Assessment <Check size={28} strokeWidth={3} /></>}</button>
                        </div>
                    </div>
                </div>
            </footer >
        </div>
    );
};

export default MultiplyDivideTest;
