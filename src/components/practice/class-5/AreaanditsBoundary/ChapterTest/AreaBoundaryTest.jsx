import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import { useSessionLogger } from '../../../../hooks/useSessionLogger';
import LatexContent from '../../../../LatexContent';
import mascotImg from '../../../../../assets/mascot.png';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const AreaBoundaryTest = () => {
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
    const SKILL_ID = 1169;
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false); // Assuming a new ID for the chapter test
    const SKILL_NAME = "Chapter Test: Area and its Boundary";

    const TOTAL_QUESTIONS = 15;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        startSession({ nodeId: 'a4051011-0011-0000-0000-000000000000', sessionType: 'practice' });
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
                    text: "What is the area of a rectangle with length 8 cm and width 5 cm?",
                    correctAnswer: "40 sq cm",
                    options: ["40 sq cm", "13 sq cm", "26 sq cm", "85 sq cm"],
                    solution: "Area of a rectangle = length \u00d7 width<br/>$8 \\times 5 = 40$. Standard unit is sq cm."
                },
                {
                    text: "Calculate the perimeter of a regular hexagon with each side measuring 6 m.",
                    correctAnswer: "36 m",
                    options: ["36 m", "12 m", "24 m", "42 m"],
                    solution: "A regular hexagon has 6 equal sides.<br/>Perimeter = $6 \\times \\text{side} = 6 \\times 6 = 36$ m."
                },
                {
                    text: "If the area of a square board is $64 \\text{ cm}^2$, what is the length of its side?",
                    correctAnswer: "8 cm",
                    options: ["8 cm", "16 cm", "32 cm", "4 cm"],
                    solution: "Area of a square = side \u00d7 side.<br/>Since $8 \\times 8 = 64$, the side is 8 cm long."
                },
                {
                    text: "A rectangular field is 120 m long and 80 m wide. How much fencing is required to enclose it?",
                    correctAnswer: "400 m",
                    options: ["400 m", "200 m", "9600 m", "100 m"],
                    solution: "Fencing goes around the boundary, so we need the perimeter.<br/>Perimeter = $2 \\times (length + width) = 2 \\times (120 + 80) = 2 \\times 200 = 400$ m."
                },
                {
                    text: "Two rectangles have the same perimeter of 20 cm. Rectangle A is 6 cm by 4 cm. Rectangle B is 8 cm by 2 cm. Which has a larger area?",
                    correctAnswer: "Rectangle A",
                    options: ["Rectangle A", "Rectangle B", "Both have same area", "Cannot be determined"],
                    solution: "Area of A = $6 \\times 4 = 24 \\text{ sq cm}$.<br/>Area of B = $8 \\times 2 = 16 \\text{ sq cm}$.<br/>Rectangle A has the larger area."
                },
                {
                    text: "Find the missing side of a triangle if its perimeter is 35 cm and two given sides are 12 cm and 14 cm.",
                    correctAnswer: "9 cm",
                    options: ["9 cm", "7 cm", "11 cm", "19 cm"],
                    solution: "Sum of known sides = $12 + 14 = 26$ cm.<br/>Missing side = Perimeter - Sum of known sides = $35 - 26 = 9$ cm."
                },
                {
                    text: "Which appropriate unit would you use to measure the area of a country like India?",
                    correctAnswer: "Square Kilometers (sq km)",
                    options: ["Square Meters (sq m)", "Square Kilometers (sq km)", "Square Centimeters (sq cm)", "Acres"],
                    solution: "A country is a very large landmass. The most appropriate standard metric unit for such large areas is square kilometers."
                },
                {
                    text: "The cost of fencing a square park at ₹15 per metre is ₹3000. Find the length of each side of the park.",
                    correctAnswer: "50 m",
                    options: ["50 m", "200 m", "100 m", "25 m"],
                    solution: "Total perimeter = Total Cost \u00f7 Rate = $3000 \\div 15 = 200$ m.<br/>Since it's a square (4 equal sides), Side = $200 \\div 4 = 50$ m."
                },
                {
                    text: "A floor tile measures 20 cm by 20 cm. How many tiles are needed to cover a floor of area $4 \\text{ m}^2$?",
                    correctAnswer: "100 tiles",
                    options: ["100 tiles", "10 tiles", "1000 tiles", "20 tiles"],
                    solution: "Area of one tile = $20 \\times 20 = 400 \\text{ cm}^2$.<br/>Floor area in sq cm = $4 \\times 10000 = 40000 \\text{ cm}^2$ (since $1 \\text{ m}^2 = 10000 \\text{ cm}^2$).<br/>Number of tiles = $40000 \\div 400 = 100$ tiles."
                },
                {
                    text: "What is the perimeter of a rectangle if its area is $50 \\text{ cm}^2$ and its length is 10 cm?",
                    correctAnswer: "30 cm",
                    options: ["30 cm", "15 cm", "60 cm", "20 cm"],
                    solution: "1. Find width: Area = length \u00d7 width \u2192 $50 = 10 \\times width$ \u2192 width = 5 cm.<br/>2. Find perimeter = $2 \\times (10 + 5) = 2 \\times 15 = 30$ cm."
                },
                {
                    text: "Which shape encloses more area: a square with a 10 cm side or a rectangle measuring 12 cm by 8 cm? (Both have a perimeter of 40 cm)",
                    correctAnswer: "The Square",
                    options: ["The Square", "The Rectangle", "Both enclose equal area", "Perimeters must be different"],
                    solution: "Square Area = $10 \\times 10 = 100 \\text{ cm}^2$.<br/>Rectangle Area = $12 \\times 8 = 96 \\text{ cm}^2$.<br/>For a given perimeter, a square encloses the maximum area for rectangles."
                },
                {
                    text: "A playground is 50 m long. A boy runs 3 rounds along its boundary and covers 450 m. Find the width of the playground.",
                    correctAnswer: "25 m",
                    options: ["25 m", "50 m", "15 m", "100 m"],
                    solution: "Distance of 3 rounds = 450 m \u2192 1 round (Perimeter) = $450 \\div 3 = 150$ m.<br/>Perimeter = $2 \\times (L + W) \\rightarrow 150 = 2 \\times (50 + W) \\rightarrow 75 = 50 + W \\rightarrow W = 25$ m."
                },
                {
                    text: "Find the area of a square whose perimeter is 48 cm.",
                    correctAnswer: "144 sq cm",
                    options: ["144 sq cm", "12 sq cm", "48 sq cm", "24 sq cm"],
                    solution: "Side of square = Perimeter \u00f7 4 = $48 \\div 4 = 12$ cm.<br/>Area = Side \u00d7 Side = $12 \\times 12 = 144$ sq cm."
                },
                {
                    text: "Ravi wants to plant trees along the boundary of his rectangular garden (30m \u00d7 20m) leaving a 2m gap for a gate. What length of boundary needs trees?",
                    correctAnswer: "98 m",
                    options: ["98 m", "100 m", "58 m", "60 m"],
                    solution: "Total perimeter = $2 \\times (30 + 20) = 100$ m.<br/>Length without the gap = $100 - 2 = 98$ m."
                },
                {
                    text: "If you double the length and double the width of a rectangle, what happens to its area?",
                    correctAnswer: "It becomes 4 times as large",
                    options: ["It becomes 4 times as large", "It doubles", "It remains same", "It becomes 8 times as large"],
                    solution: "Original Area = $L \\times W$.<br/>New Area = $(2L) \\times (2W) = 4 \\times (L \\times W) = 4 \\times$ Original Area."
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

export default AreaBoundaryTest;
