import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import '../FunWithSymmetry.css';

const CORRECT_MESSAGES = [
    "✨ You sorted them perfectly! ✨",
    "🌟 Amazing symmetry detective! 🌟",
    "🎉 Awesome classifying! 🎉",
    "✨ Fantastic eye for balance! ✨",
    "🚀 Super! You're a symmetry expert! 🚀"
];

// SVGs for Real Life Objects
const renderObject = (type, isSubmitted) => {
    let content = null;
    let symmetryLine = null; // Optional line to show when submitted

    switch (type) {
        // --- Symmetrical Objects ---
        case 'butterfly':
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <path d="M50 10 C45 30, 10 20, 15 45 C20 70, 45 60, 50 90 C55 60, 80 70, 85 45 C90 20, 55 30, 50 10 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                    <ellipse cx="50" cy="50" rx="3" ry="45" fill="#1E293B" />
                    <circle cx="30" cy="35" r="5" fill="#FDE047" />
                    <circle cx="70" cy="35" r="5" fill="#FDE047" />
                </svg>
            );
            symmetryLine = <line x1="50" y1="0" x2="50" y2="100" stroke="#FFF" strokeWidth="4" strokeDasharray="5,5" />;
            break;
        case 'leaf': // Generic symmetrical leaf
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <path d="M50 10 Q20 50 50 90 Q80 50 50 10 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
                    <line x1="50" y1="10" x2="50" y2="100" stroke="#047857" strokeWidth="3" />
                    <path d="M50 30 Q35 40 30 50 M50 50 Q35 60 30 70 M50 70 Q40 75 35 80" fill="none" stroke="#047857" strokeWidth="2" />
                    <path d="M50 30 Q65 40 70 50 M50 50 Q65 60 70 70 M50 70 Q60 75 65 80" fill="none" stroke="#047857" strokeWidth="2" />
                </svg>
            );
            symmetryLine = <line x1="50" y1="0" x2="50" y2="100" stroke="#FFF" strokeWidth="4" strokeDasharray="5,5" />;
            break;
        case 'snowflake':
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <circle cx="50" cy="50" r="45" fill="#E0F2FE" />
                    <g stroke="#0284C7" strokeWidth="4" strokeLinecap="round">
                        <line x1="50" y1="10" x2="50" y2="90" />
                        <line x1="10" y1="50" x2="90" y2="50" />
                        <line x1="22" y1="22" x2="78" y2="78" />
                        <line x1="22" y1="78" x2="78" y2="22" />
                    </g>
                </svg>
            );
            // Pick one line to show
            symmetryLine = <line x1="50" y1="0" x2="50" y2="100" stroke="#FFF" strokeWidth="4" strokeDasharray="5,5" />;
            break;
        case 'face': // Simple symmetrical smiley
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <circle cx="50" cy="50" r="45" fill="#FDE047" stroke="#CA8A04" strokeWidth="3" />
                    <circle cx="35" cy="40" r="6" fill="#1E293B" />
                    <circle cx="65" cy="40" r="6" fill="#1E293B" />
                    <path d="M 30 65 Q 50 85 70 65" fill="none" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                </svg>
            );
            symmetryLine = <line x1="50" y1="0" x2="50" y2="100" stroke="#FFF" strokeWidth="4" strokeDasharray="5,5" />;
            break;
        case 'shirt': // T-shirt
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <path d="M30 15 Q50 30 70 15 L95 35 L80 50 L80 90 L20 90 L20 50 L5 35 Z" fill="#6366F1" stroke="#4338CA" strokeWidth="2" />
                </svg>
            );
            symmetryLine = <line x1="50" y1="0" x2="50" y2="100" stroke="#FFF" strokeWidth="4" strokeDasharray="5,5" />;
            break;
        case 'car_front': // Front of a car
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <rect x="15" y="45" width="70" height="35" rx="5" fill="#EF4444" />
                    <path d="M25 45 L35 25 L65 25 L75 45 Z" fill="#93C5FD" />
                    <circle cx="25" cy="65" r="8" fill="#FCD34D" />
                    <circle cx="75" cy="65" r="8" fill="#FCD34D" />
                    <rect x="40" y="60" width="20" height="10" fill="#1F2937" />
                </svg>
            );
            symmetryLine = <line x1="50" y1="0" x2="50" y2="100" stroke="#FFF" strokeWidth="4" strokeDasharray="5,5" />;
            break;
        case 'scissors': // Open scissors roughly symmetrical along a diagonal
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" transform="rotate(45 50 50)">
                    {/* Handles */}
                    <path d="M40 70 A 15 15 0 1 1 40 100 A 15 15 0 1 1 40 70 Z" fill="none" stroke="#EC4899" strokeWidth="6" />
                    <path d="M60 70 A 15 15 0 1 0 60 100 A 15 15 0 1 0 60 70 Z" fill="none" stroke="#EC4899" strokeWidth="6" />
                    {/* Blades */}
                    <path d="M35 70 L 50 10 L 50 70 Z" fill="#94A3B8" />
                    <path d="M65 70 L 50 10 L 50 70 Z" fill="#CBD5E1" />
                    <circle cx="50" cy="65" r="3" fill="#1E293B" />
                </svg>
            );
            symmetryLine = <line x1="50" y1="0" x2="50" y2="100" stroke="#FFF" strokeWidth="4" strokeDasharray="5,5" transform="rotate(45 50 50)" />;
            break;

        // --- Asymmetrical Objects ---
        case 'tree': // Lopsided tree
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <rect x="45" y="60" width="10" height="35" fill="#78350F" />
                    <circle cx="40" cy="40" r="30" fill="#10B981" />
                    <circle cx="70" cy="50" r="20" fill="#10B981" />
                    <circle cx="60" cy="25" r="25" fill="#10B981" />
                </svg>
            );
            break;
        case 'teapot': // Asymmetrical because of spout and handle
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <circle cx="50" cy="60" r="30" fill="#38BDF8" />
                    <path d="M20 60 Q5 50 25 40" fill="none" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
                    <path d="M80 60 L95 40 L85 35 Z" fill="#38BDF8" />
                    <rect x="35" y="25" width="30" height="10" rx="5" fill="#0284C7" />
                </svg>
            );
            break;
        case 'key': // Old fashioned key
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <circle cx="25" cy="50" r="15" fill="none" stroke="#F59E0B" strokeWidth="6" />
                    <line x1="40" y1="50" x2="90" y2="50" stroke="#F59E0B" strokeWidth="6" />
                    <rect x="70" y="50" width="8" height="20" fill="#F59E0B" />
                    <rect x="85" y="50" width="8" height="15" fill="#F59E0B" />
                </svg>
            );
            break;
        case 'guitar': // Guitar silhouette (asymmetrical body)
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" transform="rotate(-45 50 50)">
                    <rect x="45" y="10" width="10" height="40" fill="#B45309" />
                    <circle cx="50" cy="65" r="25" fill="#D97706" />
                    <circle cx="50" cy="45" r="18" fill="#D97706" />
                    <circle cx="50" cy="55" r="8" fill="#451A03" />
                    <rect x="15" y="60" width="20" height="30" fill="#B45309" transform="rotate(20 15 60)" /> {/* Unbalancing element */}
                </svg>
            );
            break;
        case 'shoe': // Side view of a shoe
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <path d="M20 70 L80 70 C 90 70, 95 60, 85 50 L60 40 L40 20 L20 30 Z" fill="#8B5CF6" />
                    <rect x="20" y="70" width="65" height="10" rx="5" fill="#E2E8F0" />
                </svg>
            );
            break;
        case 'mitten': // Single mitten
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <path d="M40 20 C 40 5, 80 5, 80 30 L80 70 L30 70 L30 40 C 30 25, 10 30, 10 45 C 10 55, 30 60, 30 50 Z" fill="#F43F5E" />
                    <rect x="25" y="70" width="60" height="20" rx="4" fill="#FDA4AF" />
                </svg>
            );
            break;
        case 'flag':
            content = (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <line x1="20" y1="10" x2="20" y2="90" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
                    <path d="M23 15 L80 35 L23 55 Z" fill="#10B981" />
                </svg>
            );
            break;
        default:
            content = <circle cx="50" cy="50" r="40" fill="#ccc" />;
    }

    return (
        <div className="relative w-full h-full">
            {content}
            {isSubmitted && symmetryLine}
        </div>
    );
};

// Object Data store
const ALL_OBJECTS = {
    // Symmetrical
    'butterfly': { type: 'butterfly', name: 'Butterfly', isSymmetrical: true, reason: 'A butterfly can be split perfectly down the middle.' },
    'leaf': { type: 'leaf', name: 'Leaf', isSymmetrical: true, reason: 'This leaf is perfectly balanced on both sides.' },
    'snowflake': { type: 'snowflake', name: 'Snowflake', isSymmetrical: true, reason: 'Snowflakes have multiple lines of symmetry.' },
    'face': { type: 'face', name: 'Smiley Face', isSymmetrical: true, reason: 'A face can be split vertically into two matching halves.' },
    'shirt': { type: 'shirt', name: 'T-Shirt', isSymmetrical: true, reason: 'A basic T-shirt is the same on the left and right.' },
    'car_front': { type: 'car_front', name: 'Front of Car', isSymmetrical: true, reason: 'The front of a car is usually symmetrical.' },
    'scissors': { type: 'scissors', name: 'Open Scissors', isSymmetrical: true, reason: 'These scissors are perfectly balanced.' },

    // Asymmetrical
    'tree': { type: 'tree', name: 'Lopsided Tree', isSymmetrical: false, reason: 'This tree has more branches on one side.' },
    'teapot': { type: 'teapot', name: 'Teapot', isSymmetrical: false, reason: 'A teapot has a spout on one side and a handle on the other.' },
    'key': { type: 'key', name: 'Key', isSymmetrical: false, reason: 'The teeth on a key are usually not identical on both sides.' },
    'guitar': { type: 'guitar', name: 'Guitar', isSymmetrical: false, reason: 'This guitar has an asymmetrical shape.' },
    'shoe': { type: 'shoe', name: 'Shoe', isSymmetrical: false, reason: 'The left side of a shoe does not mirror the right side exactly.' },
    'mitten': { type: 'mitten', name: 'Single Mitten', isSymmetrical: false, reason: 'A single mitten is not symmetrical due to the thumb opening.' },
    'flag': { type: 'flag', name: 'Flag on a Pole', isSymmetrical: false, reason: 'A flag generally points only in one direction from its pole.' },
};

const ClassifySymmetricalObjects = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);

    const [userChoice, setUserChoice] = useState(null); // true for symmetrical, false for asymmetrical

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1209; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Real Life Objects";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // ----------------------------------------------------------------------
    // Setup Questions (10 questions, pulling random objects but ensured mix)
    // ----------------------------------------------------------------------
    useEffect(() => {
        // Generate 10 questions: 5 symmetrical, 5 asymmetrical, shuffled.
        const symKeys = Object.keys(ALL_OBJECTS).filter(k => ALL_OBJECTS[k].isSymmetrical);
        const asymKeys = Object.keys(ALL_OBJECTS).filter(k => !ALL_OBJECTS[k].isSymmetrical);

        // Randomize the arrays each time avoiding identical sequence
        const shuffledSym = [...symKeys].sort(() => 0.5 - Math.random());
        const shuffledAsym = [...asymKeys].sort(() => 0.5 - Math.random());

        // Pick 5 of each
        const selected = [...shuffledSym.slice(0, 5), ...shuffledAsym.slice(0, 5)];

        // Final shuffle for the session
        const finalQuestions = selected.sort(() => 0.5 - Math.random()).map(k => ALL_OBJECTS[k]);

        setSessionQuestions(finalQuestions);
    }, []);

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
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setUserChoice(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setUserChoice(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (val) => {
        if (isSubmitted) return;
        setUserChoice(val);
    };

    const handleSubmit = () => {
        if (userChoice === null || !currentQuestion) return;

        const isRight = userChoice === currentQuestion.isSymmetrical;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: userChoice } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
            question_text: `Is the ${currentQuestion.name} symmetrical?`,
            correct_answer: currentQuestion.isSymmetrical ? 'Symmetrical' : 'Asymmetrical',
            student_answer: userChoice ? 'Symmetrical' : 'Asymmetrical',
            is_correct: isRight,
            solution_text: currentQuestion.isSymmetrical ? `Yes, a ${currentQuestion.name} can be folded perfectly in half.` : `No, a ${currentQuestion.name} has parts that don't match on both sides.`,
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setUserChoice(null);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId');
            if (userId && sessionId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId, 10)
                });
                await api.finishSession(sessionId);
            }
            setShowResults(true);
        }
    };

    const handlePrevious = () => { if (qIndex > 0) setQIndex(prev => prev - 1); };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const total = TOTAL_QUESTIONS;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative flex justify-center items-center">
                    <button onClick={() => navigate(-1)} className="absolute top-8 right-8 px-6 py-3 bg-white/20 hover:bg-white/30 text-[#31326F] rounded-2xl font-bold text-lg transition-all flex items-center gap-2 z-50 border-2 border-[#31326F]/30 shadow-md backdrop-blur-sm"><X size={24} /> Back</button>
                    <div className="title-area"><h1 className="text-3xl font-bold text-[#31326F] pt-8">Real Life Result</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 pt-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-normal text-[#31326F] mb-2">Practice Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 gap-4 w-full max-w-lg mb-8">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0F7FA] text-center">
                                <span className="block text-xs font-bold uppercase tracking-widest text-[#0097A7] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0F7FA] text-center">
                                <span className="block text-xs font-bold uppercase tracking-widest text-[#0097A7] mb-1">Time</span>
                                <span className="text-4xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                        <button className="px-12 py-4 rounded-2xl bg-[#0097A7] text-white font-bold text-xl shadow-lg hover:bg-[#00838F] transition-all flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1" onClick={() => navigate(-1)}>Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <h1 className="text-xl font-bold text-[#31326F]">Fun with Symmetry</h1>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-[#0097A7]/30 text-[#31326F] font-bold text-lg shadow-sm whitespace-nowrap">Question {qIndex + 1} of {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#0097A7]/30 text-[#31326F] font-bold text-lg shadow-sm">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper flex flex-col min-h-[calc(100vh-140px)] py-2 px-4 md:p-4 relative overflow-y-auto overflow-x-hidden">
                <div className="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-6 lg:p-10 flex flex-col items-center justify-center min-h-[500px]">

                    <div className="w-full flex flex-col justify-center items-center text-center pb-8">
                        <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                            Is this <span className="text-[#0097A7]">{currentQuestion.name}</span> symmetrical?
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full h-full">

                        {/* Object Display (Left Column) */}
                        <div className="w-full md:w-1/2 flex justify-center items-center">
                            <div className="w-full max-w-[12rem] md:max-w-[16rem] aspect-square h-auto max-h-[30vh] bg-slate-50 border-[6px] border-slate-200 rounded-[3rem] shadow-inner p-4 md:p-6 flex items-center justify-center relative">
                                {renderObject(currentQuestion.type, isSubmitted && currentQuestion.isSymmetrical)}

                                {/* Incorrect "Asymmetrical" mark if they got it wrong and it was asymmetrical */}
                                {isSubmitted && !currentQuestion.isSymmetrical && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 z-20">
                                        <X size={150} color="#EF4444" strokeWidth={4} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Choice Buttons & Feedback (Right Column) */}
                        <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
                            <div className="flex flex-col gap-6 w-full max-w-xs">
                                {/* SYMMETRICAL BUTTON */}
                                <button
                                    onClick={() => handleAnswer(true)}
                                    disabled={isSubmitted}
                                    className={`w-full py-6 px-4 rounded-[2rem] font-black tracking-widest text-2xl uppercase transition-all flex items-center justify-center border-[4px] shadow-sm
                                        ${userChoice === true ? (isSubmitted ? (isCorrect ? 'bg-green-100 border-green-500 text-green-700 shadow-xl scale-105' : 'bg-red-100 border-red-500 text-red-700 shadow-xl scale-105') : 'bg-[#E0F7FA] border-[#0097A7] text-[#0097A7] scale-105 shadow-xl') : 'bg-white border-gray-200 text-[#31326F] hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-1'}
                                        ${isSubmitted && currentQuestion.isSymmetrical && userChoice !== true ? 'bg-green-50 border-green-400 text-green-600 animate-pulse' : ''}
                                        ${isSubmitted && userChoice !== true ? 'opacity-50 grayscale' : ''}
                                    `}
                                >
                                    Symmetrical
                                </button>

                                {/* ASYMMETRICAL BUTTON */}
                                <button
                                    onClick={() => handleAnswer(false)}
                                    disabled={isSubmitted}
                                    className={`w-full py-6 px-4 rounded-[2rem] font-black tracking-widest text-xl uppercase transition-all flex items-center justify-center border-[4px] shadow-sm
                                        ${userChoice === false ? (isSubmitted ? (isCorrect ? 'bg-green-100 border-green-500 text-green-700 shadow-xl scale-105' : 'bg-red-100 border-red-500 text-red-700 shadow-xl scale-105') : 'bg-[#E0F7FA] border-[#0097A7] text-[#0097A7] scale-105 shadow-xl') : 'bg-white border-gray-200 text-[#31326F] hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-1'}
                                        ${isSubmitted && !currentQuestion.isSymmetrical && userChoice !== false ? 'bg-green-50 border-green-400 text-green-600 animate-pulse' : ''}
                                        ${isSubmitted && userChoice !== false ? 'opacity-50 grayscale' : ''}
                                    `}
                                >
                                    Not Symmetrical
                                </button>
                            </div>

                            {/* Feedback Area */}
                            <div className="h-20 mt-4 flex items-center justify-center w-full relative z-20">
                                {isSubmitted && (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                        <div className={`text-xl font-bold px-8 py-4 rounded-full shadow-md border-2
                                            ${isCorrect ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}
                                        >
                                            {isCorrect
                                                ? feedbackMessage
                                                : `Not quite! A ${currentQuestion.name} is ${currentQuestion.isSymmetrical ? 'symmetrical (look at the mirror line)' : 'not symmetrical'}.`}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.isSymmetrical ? 'Symmetrical' : 'Asymmetrical'} explanation={currentQuestion.isSymmetrical ? `A ${currentQuestion.name} has a line of symmetry right through the middle, meaning both sides are mirrored.` : `A ${currentQuestion.name} is not the same on both sides. You cannot fold it perfectly in half.`} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={userChoice === null}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default ClassifySymmetricalObjects;
