import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import { useSessionLogger } from '../../../../hooks/useSessionLogger';
import LatexContent from '../../../../LatexContent';
import mascotImg from '../../../../../assets/mascot.png';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const TenthsHundredthsTest = () => {
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
    const SKILL_ID = 1062;
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false); // Assuming a new ID for the chapter test
    const SKILL_NAME = "Chapter Test: Tenths and Hundredths";

    const TOTAL_QUESTIONS = 15;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        startSession({ nodeId: 'a4051010-0010-0000-0000-000000000000', sessionType: 'practice' });
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
                    text: "Which of the following represents 'seven hundredths' as a decimal?",
                    correctAnswer: "0.07",
                    options: ["0.07", "0.7", "7.00", "0.007"],
                    solution: "The first place after the decimal is tenths, the second is hundredths. So, seven hundredths is written as 0.07."
                },
                {
                    text: "Convert the fraction $\\frac{45}{100}$ into a decimal.",
                    correctAnswer: "0.45",
                    options: ["0.45", "4.5", "45.0", "0.045"],
                    solution: "When the denominator is 100, the numerator goes up to the hundredths place. So, $\\frac{45}{100} = 0.45$."
                },
                {
                    text: "What is the place value of the digit 8 in the number 16.28?",
                    correctAnswer: "Hundredths",
                    options: ["Hundredths", "Tenths", "Tens", "Ones"],
                    solution: "In 16.28, 2 is in the tenths place, and 8 is in the hundredths place."
                },
                {
                    text: "Compare these two decimals: 0.5 and 0.50. Which is true?",
                    correctAnswer: "0.5 = 0.50",
                    options: ["0.5 = 0.50", "0.5 > 0.50", "0.5 < 0.50", "Cannot be compared"],
                    solution: "Adding trailing zeros to the right of the decimal point does not change the value. Both represent five tenths."
                },
                {
                    text: "Add the decimals: $2.34 + 1.25$",
                    correctAnswer: "3.59",
                    options: ["3.59", "3.69", "2.59", "4.59"],
                    solution: "Align the decimal points: <br> $2.34$<br>+$1.25$<br>------<br> $3.59$"
                },
                {
                    text: "Subtract the decimals: $5.8 - 2.45$",
                    correctAnswer: "3.35",
                    options: ["3.35", "3.45", "3.25", "3.15"],
                    solution: "Align decimals and add a trailing zero if needed: <br> $5.80$<br>-$2.45$<br>------<br> $3.35$"
                },
                {
                    text: "John has ₹50.75 and his sister has ₹30.50. How much money do they have total?",
                    correctAnswer: "₹81.25",
                    options: ["₹81.25", "₹80.25", "₹81.75", "₹82.25"],
                    solution: "$50.75 + 30.50 = 81.25$. They have together ₹81.25."
                },
                {
                    text: "How do you write ₹4 and 5 paise in decimals?",
                    correctAnswer: "₹4.05",
                    options: ["₹4.05", "₹4.50", "₹4.5", "₹4.005"],
                    solution: "1 rupee = 100 paise. So, 5 paise is $\\frac{5}{100}$ of a rupee. This means it is written as ₹4.05."
                },
                {
                    text: "A piece of cloth is 2.5 meters long. How many centimeters is this?",
                    correctAnswer: "250 cm",
                    options: ["25 cm", "250 cm", "2500 cm", "205 cm"],
                    solution: "$1 \\text{ m} = 100 \\text{ cm}$.<br/>$2.5 \\text{ m} = 2.5 \\times 100 = 250 \\text{ cm}$."
                },
                {
                    text: "Multiply the decimal: $1.2 \\times 3$",
                    correctAnswer: "3.6",
                    options: ["3.6", "3.2", "0.36", "36.0"],
                    solution: "First, multiply ignoring the decimal: $12 \\times 3 = 36$.<br/>Since there is 1 decimal place in the original numbers, place the decimal to get 3.6."
                },
                {
                    text: "Arrange in ascending order: 0.12, 0.2, 0.02, 0.21",
                    correctAnswer: "0.02, 0.12, 0.2, 0.21",
                    options: ["0.02, 0.12, 0.2, 0.21", "0.2, 0.02, 0.12, 0.21", "0.02, 0.2, 0.12, 0.21", "0.21, 0.2, 0.12, 0.02"],
                    solution: "Aligning them with the same decimal places: $0.12, 0.20, 0.02, 0.21$.<br/>Ordering them from least to greatest: $0.02, 0.12, 0.20, 0.21$."
                },
                {
                    text: "Rani's weight is 35.5 kg. Her brother is 4.2 kg heavier. What is her brother's weight?",
                    correctAnswer: "39.7 kg",
                    options: ["39.7 kg", "31.3 kg", "40.7 kg", "39.5 kg"],
                    solution: "Add her brother's extra weight: $35.5 + 4.2 = 39.7$ kg."
                },
                {
                    text: "Write the expanded form of 23.45.",
                    correctAnswer: "$20 + 3 + 0.4 + 0.05$",
                    options: ["$20 + 3 + 0.4 + 0.05$", "$20 + 3 + 4 + 5$", "$2 + 3 + 4 + 5$", "$20 + 30 + 0.4 + 0.5$"],
                    solution: "2 is in tens (20), 3 is in ones (3), 4 is in tenths (0.4), and 5 is in hundredths (0.05)."
                },
                {
                    text: "What must be added to 3.45 to make it 5.00?",
                    correctAnswer: "1.55",
                    options: ["1.55", "1.45", "2.55", "2.45"],
                    solution: "Subtract the starting number from the target number: $5.00 - 3.45 = 1.55$."
                },
                {
                    text: "Convert 0.8 to a fraction in its simplest form.",
                    correctAnswer: "$\\frac{4}{5}$",
                    options: ["$\\frac{4}{5}$", "$\\frac{8}{10}$", "$\\frac{1}{8}$", "$\\frac{8}{100}$"],
                    solution: "$0.8 = \\frac{8}{10}$. By dividing the numerator and denominator by their greatest common factor (2), we get $\\frac{4}{5}$."
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

export default TenthsHundredthsTest;
