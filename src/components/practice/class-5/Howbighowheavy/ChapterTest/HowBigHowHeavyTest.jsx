import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import mascotImg from '../../../../../assets/mascot.png';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const HowBigHowHeavyTest = () => {
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
    const SKILL_ID = 1224; // Assuming a new ID for the chapter test
    const SKILL_NAME = "Chapter Test: How Big? How Heavy?";

    const TOTAL_QUESTIONS = 15;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
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
                    text: "What is the standard unit of volume for measuring liquids like water or milk?",
                    correctAnswer: "Liters or Milliliters",
                    options: ["Liters or Milliliters", "Grams or Kilograms", "Meters or Centimeters", "Square Meters"],
                    solution: "Volume of liquids is measured in liters (L) or milliliters (mL)."
                },
                {
                    text: "A measuring cylinder contains $50 \\text{ ml}$ of water. A stone is dropped in, and the water level rises to $75 \\text{ ml}$. What is the volume of the stone?",
                    correctAnswer: "25 ml",
                    options: ["25 ml", "125 ml", "50 ml", "75 ml"],
                    solution: "Volume of stone = Final water level - Initial water level.<br/>$75 \\text{ ml} - 50 \\text{ ml} = 25 \\text{ ml}$."
                },
                {
                    text: "Which object takes up more space (has a greater volume)? An inflated balloon or a heavy iron ball of the same diameter?",
                    correctAnswer: "They have the same volume",
                    options: ["They have the same volume", "The iron ball", "The balloon", "Cannot be determined"],
                    solution: "Volume is the amount of 3D space an object occupies. Since they have the same diameter, they are the same size, so their volume is identical, regardless of their weight (mass)."
                },
                {
                    text: "How many 1 cm cubes are needed to build a larger cube with 3 cm sides?",
                    correctAnswer: "27 cubes",
                    options: ["27 cubes", "9 cubes", "6 cubes", "81 cubes"],
                    solution: "Volume of a cube = $side \\times side \\times side$.<br/>$3 \\times 3 \\times 3 = 27$ cubic centimeters."
                },
                {
                    text: "Convert 3.5 Kilograms (kg) to grams (g).",
                    correctAnswer: "3500 g",
                    options: ["3500 g", "350 g", "35000 g", "35 g"],
                    solution: "1 kg = 1000 g.<br/>$3.5 \\times 1000 = 3500 \\text{ g}$."
                },
                {
                    text: "A sack of onions weighs 12 kg. How many such sacks can be loaded into a mini-truck that can carry a maximum load of 600 kg?",
                    correctAnswer: "50 sacks",
                    options: ["50 sacks", "60 sacks", "40 sacks", "5 sacks"],
                    solution: "Total max load $\\div$ weight of one sack = $600 \\div 12$.<br/>Since $12 \\times 5 = 60$, $12 \\times 50 = 600$. The answer is 50 sacks."
                },
                {
                    text: "Which of the following describes Mass?",
                    correctAnswer: "The amount of matter in an object",
                    options: ["The amount of matter in an object", "The amount of space an object occupies", "The distance around the boundary", "The gravitational pull downwards"],
                    solution: "Mass is how 'heavy' something is or the amount of matter it contains. Volume is how much space it takes up."
                },
                {
                    text: "A matchbox has dimensions $5 \\text{ cm} \\times 3 \\text{ cm} \\times 2 \\text{ cm}$. What is its volume in unit cubes?",
                    correctAnswer: "30 unit cubes",
                    options: ["30 unit cubes", "10 unit cubes", "25 unit cubes", "15 unit cubes"],
                    solution: "Volume of a cuboid = Length $\\times$ Width $\\times$ Height.<br/>$5 \\times 3 \\times 2 = 30$ cubic centimeters (or unit cubes)."
                },
                {
                    text: "If 10 identical coins weigh 50 grams, what is the weight of one coin?",
                    correctAnswer: "5 grams",
                    options: ["5 grams", "10 grams", "25 grams", "500 grams"],
                    solution: "Total weight $\\div$ number of coins = $50 \\div 10 = 5$ grams."
                },
                {
                    text: "A rectangular carton can hold exactly 120 small unit cubes. If the base of the carton holds 20 cubes in one flat layer, how many layers high is the carton?",
                    correctAnswer: "6 layers",
                    options: ["6 layers", "5 layers", "20 layers", "10 layers"],
                    solution: "Total Volume = Base Area (number in one layer) $\\times$ Height (number of layers).<br/>$120 = 20 \\times \\text{Height}$. Height = $120 \\div 20 = 6$ layers."
                },
                {
                    text: "Which is heavier: 1 kilogram of iron nails or 1 kilogram of cotton?",
                    correctAnswer: "They weigh the same",
                    options: ["They weigh the same", "The iron nails", "The cotton", "It depends on the size"],
                    solution: "Both have a mass of 1 kilogram! The cotton will take up much more space (volume), but their weight is identical."
                },
                {
                    text: "A water tank holds $5 \\text{ Liters}$ of water. How many empty $250 \\text{ ml}$ cups can be fully filled from it?",
                    correctAnswer: "20 cups",
                    options: ["20 cups", "25 cups", "10 cups", "5 cups"],
                    solution: "First, convert to milliliters: $5 \\text{ L} = 5000 \\text{ ml}$.<br/>Number of cups = $5000 \\div 250$. Wait, $1000 \\div 250 = 4$. So $5000 \\div 250 = 5 \\times 4 = 20$."
                },
                {
                    text: "Estimate the volume of a standard shoebox.",
                    correctAnswer: "About 6000 cubic centimeters",
                    options: ["About 6000 cubic centimeters", "About 60 cubic centimeters", "About 600000 cubic centimeters", "About 6 cubic centimeters"],
                    solution: "A shoebox might be roughly $30 \\text{ cm}$ long, $20 \\text{ cm}$ wide, and $10 \\text{ cm}$ high.<br/>$30 \\times 20 \\times 10 = 6000$ cubic centimeters."
                },
                {
                    text: "Rahul has a block of modeling clay that has a volume of $100 \\text{ cm}^3$. He squashes it completely flat and makes a pancake shape. What is its new volume?",
                    correctAnswer: "100 cm³",
                    options: ["100 cm³", "More than 100 cm³", "Less than 100 cm³", "0 cm³"],
                    solution: "Changing the shape of an object does not change its volume (the amount of space the clay takes up) or its mass. It remains $100 \\text{ cm}^3$."
                },
                {
                    text: "A gold merchant has weights of 50g, 20g, 10g, 5g, 2g, and 1g. Which combination of weights should he use on one pan of the balance to weigh out exactly 37g of gold?",
                    correctAnswer: "20g, 10g, 5g, 2g",
                    options: ["20g, 10g, 5g, 2g", "20g, 10g, 7g", "50g, -10g, -3g", "30g, 5g, 2g"],
                    solution: "Sum the chosen set: $20 + 10 + 5 + 2 = 37\\text{g}$. This is the correct combination of standard weights."
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

export default HowBigHowHeavyTest;
