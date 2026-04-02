import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import FunWithSymmetryReportModal from '../FunWithSymmetryReportModal';
import '../FunWithSymmetry.css';

const CORRECT_MESSAGES = [
    "✨ You nailed the reflection! ✨",
    "🌟 Perfect! That's exactly how a mirror works! 🌟",
    "🎉 Awesome matching! 🎉",
    "✨ Fantastic mirror vision! ✨",
    "🚀 Super! You're a reflection expert! 🚀"
];

const MirrorImageShapes = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
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
    const SKILL_ID = 1202; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Mirror Image Shapes";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // ----------------------------------------------------------------------
    // SVGs for the Shapes
    // ----------------------------------------------------------------------
    const renderShape = (id, color, rotateClass = "") => {
        const strokeColor = "#31326F";
        const strokeWidth = 8;

        let shapeSVG = null;
        switch (id) {
            case 'L':
                shapeSVG = <path d="M50,20 L50,180 L140,180 L140,140 L90,140 L90,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'L-mirror':
                shapeSVG = <path d="M150,20 L150,180 L60,180 L60,140 L110,140 L110,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'arrow-right':
                shapeSVG = <polygon points="40,70 110,70 110,30 180,100 110,170 110,130 40,130" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'arrow-left':
                shapeSVG = <polygon points="160,70 90,70 90,30 20,100 90,170 90,130 160,130" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'flag-right':
                shapeSVG = <path d="M60,180 L60,20 L160,60 L60,100 L60,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'flag-left':
                shapeSVG = <path d="M140,180 L140,20 L40,60 L140,100 L140,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'P':
                shapeSVG = <path d="M60,20 L130,20 C160,20 160,100 130,100 L100,100 L100,180 L60,180 Z M100,60 L120,60 C130,60 130,80 120,80 L100,80 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'P-mirror': // "q"
                shapeSVG = <path d="M140,20 L70,20 C40,20 40,100 70,100 L100,100 L100,180 L140,180 Z M100,60 L80,60 C70,60 70,80 80,80 L100,80 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'C':
                shapeSVG = <path d="M150,40 C90,0 50,60 50,100 C50,140 90,200 150,160 C120,160 90,140 90,100 C90,60 120,40 150,40 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'C-mirror':
                shapeSVG = <path d="M50,40 C110,0 150,60 150,100 C150,140 110,200 50,160 C80,160 110,140 110,100 C110,60 80,40 50,40 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'music':
                shapeSVG = <path d="M80,20 L160,40 L160,130 C160,145 145,160 125,160 C105,160 90,145 90,130 C90,115 105,100 125,100 L130,100 L130,70 L80,60 L80,150 C80,165 65,180 45,180 C25,180 10,165 10,150 C10,135 25,120 45,120 L50,120 L50,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'music-mirror':
                shapeSVG = <path d="M120,20 L40,40 L40,130 C40,145 55,160 75,160 C95,160 110,145 110,130 C110,115 95,100 75,100 L70,100 L70,70 L120,60 L120,150 C120,165 135,180 155,180 C175,180 190,165 190,150 C190,135 175,120 155,120 L150,120 L150,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            default:
                shapeSVG = <circle cx="100" cy="100" r="60" fill={color} />;
        }

        return (
            <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-md relative overflow-visible ${rotateClass}`}>
                {shapeSVG}
            </svg>
        );
    };

    const generateQuestions = () => {
        const shapes = ['L', 'arrow-right', 'C', 'flag-left', 'P', 'music', 'flag-right', 'arrow-left', 'C-mirror', 'P-mirror', 'L-mirror'];
        const colors = ['#F43F5E', '#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#06B6D4', '#EF4444'];

        // Define mirrored pairs map
        const mirrors = {
            'L': 'L-mirror', 'L-mirror': 'L',
            'arrow-right': 'arrow-left', 'arrow-left': 'arrow-right',
            'C': 'C-mirror', 'C-mirror': 'C',
            'flag-left': 'flag-right', 'flag-right': 'flag-left',
            'P': 'P-mirror', 'P-mirror': 'P',
            'music': 'music-mirror', 'music-mirror': 'music'
        };

        const questions = [];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            // Pick a random shape from the pool
            const original = shapes[Math.floor(Math.random() * shapes.length)];
            const correctMirror = mirrors[original];

            // Pick random distinct colors
            const availableColors = [...colors].sort(() => 0.5 - Math.random());
            const originalColor = availableColors[0];
            const mirrorColor = availableColors[1];

            // Generate 4 options: 1 correct, 3 wrong (random from pool, avoiding the correct mirror)
            const wrongOptions = shapes.filter(s => s !== correctMirror && s !== original).sort(() => 0.5 - Math.random()).slice(0, 3);
            const options = [...wrongOptions, correctMirror].sort(() => 0.5 - Math.random());
            const correctIndex = options.indexOf(correctMirror);

            // Construct feedback message based on the shape
            let solution = "";
            if (original.includes('arrow')) solution = `An arrow pointing one way will point the opposite way in a mirror.`;
            else if (original.includes('flag')) solution = `If the flag blows one direction from the pole, the mirror image blows the other direction.`;
            else if (original.includes('C')) solution = `The opening of the curve flips horizontally in the mirror.`;
            else if (original.includes('L')) solution = `The horizontal leg of the 'L' points the opposite direction in the mirror.`;
            else if (original.includes('P')) solution = `The loop on the stick flips to the opposite side in the mirror.`;
            else if (original.includes('music')) solution = `The higher note shifts to the opposite side when viewed in a mirror.`;

            questions.push({ original, originalColor, mirrorColor, options, correctIndex, solution });
        }

        return questions;
    };

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
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOption(null);
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
        setSelectedOption(val);
    };

    const handleSubmit = () => {
        if (selectedOption === null || !currentQuestion) return;

        const isRight = selectedOption === currentQuestion.correctIndex;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
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
            question_text: `Choose the correct mirror image.`,
            correct_answer: "Option " + (currentQuestion.correctIndex + 1),
            student_answer: "Option " + (selectedOption + 1),
            is_correct: isRight,
            solution_text: currentQuestion.solution,
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedOption(null);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            try {
                const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
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
            } catch (error) {
                console.error("Error finalizing practice session:", error);
            }
            setShowResults(true);
        }
    };

    const handlePrevious = () => { if (qIndex > 0) setQIndex(prev => prev - 1); };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const total = TOTAL_QUESTIONS;

        return (
            <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif', minHeight: '100vh' }}>
                <FunWithSymmetryReportModal
                    isOpen={showResults}
                    stats={{
                        timeTaken: formatTime(timeElapsed),
                        correctAnswers: score,
                        totalQuestions: total
                    }}
                    onContinue={() => navigate(-1)}
                />
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
                <div className="w-full max-w-5xl mx-auto my-4 md:my-8 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-8 items-center justify-start h-auto min-h-[400px]">

                    <div className="w-full flex justify-center text-center pb-2">
                        <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                            Which is the <span className="text-[#0097A7]">mirror image</span>?
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-full">

                        {/* Interactive Area (Left Column) */}
                        <div className="w-full md:w-1/2 flex justify-center items-center">
                            <div className="flex flex-row items-center gap-2 md:gap-4 w-full justify-center transform scale-90 md:scale-100">

                                {/* Original */}
                                <div className="flex flex-col items-center gap-1">
                                    <h3 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Original</h3>
                                    <div className="w-20 h-20 md:w-32 md:h-32 bg-slate-50 border-[4px] md:border-[6px] border-slate-200 rounded-xl md:rounded-2xl p-2 shadow-sm shadow-gray-200">
                                        {renderShape(currentQuestion.original, currentQuestion.originalColor)}
                                    </div>
                                </div>

                                {/* MIRROR LINE */}
                                <div className="h-24 md:h-36 w-2 bg-gradient-to-b from-blue-300 via-blue-100 to-blue-300 rounded-full border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)] flex justify-center items-center relative">
                                    <div className="absolute top-1/2 -translate-y-1/2 bg-blue-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full -rotate-90 whitespace-nowrap tracking-widest leading-none">MIRROR</div>
                                </div>

                                {/* Unknown Question Mark Area */}
                                <div className="flex flex-col items-center gap-1">
                                    <h3 className="text-[10px] md:text-xs font-bold text-[#0097A7] uppercase tracking-widest hidden md:block opacity-0">Select</h3>
                                    <div className={`w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-2xl p-2 transition-all duration-300 flex items-center justify-center border-[4px] md:border-[6px] border-dashed
                                        ${selectedOption !== null ? 'bg-slate-50 border-slate-200 shadow-sm shadow-gray-200 border-solid' : 'bg-[#E0F7FA]/50 border-[#0097A7]/30'}`}
                                    >
                                        {selectedOption !== null ? (
                                            renderShape(currentQuestion.options[selectedOption], currentQuestion.mirrorColor)
                                        ) : (
                                            <div className="text-4xl md:text-5xl text-[#0097A7]/30 font-bold">?</div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Options & Feedback (Right Column) */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6">
                            <div className="flex flex-col items-center gap-4 w-full">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-4 py-1 rounded-full shadow-sm">Options</h3>
                                <div className="grid grid-cols-2 gap-4 md:gap-6 justify-center items-center w-full max-w-[16rem] md:max-w-[20rem]">
                                    {currentQuestion.options.map((opt, i) => {
                                        const isOptSelected = selectedOption === i;
                                        const isCorrectOpt = currentQuestion.correctIndex === i;

                                        let btnStyle = 'border-gray-200 hover:border-[#0097A7] hover:scale-105';
                                        if (!isSubmitted && isOptSelected) {
                                            btnStyle = 'border-[#0097A7] bg-[#E0F7FA] scale-105 shadow-md shadow-[#0097A7]/20';
                                        } else if (isSubmitted && isCorrectOpt) {
                                            btnStyle = 'border-green-500 bg-green-50 shadow-md shadow-green-500/20 scale-105';
                                        } else if (isSubmitted && isOptSelected && !isCorrect) {
                                            btnStyle = 'border-red-500 bg-red-50 shadow-md shadow-red-500/20';
                                        } else if (isSubmitted) {
                                            btnStyle = 'border-gray-100 opacity-50';
                                        }

                                        return (
                                            <button
                                                key={i}
                                                disabled={isSubmitted}
                                                onClick={() => handleAnswer(i)}
                                                className={`w-full aspect-square p-2 md:p-4 rounded-2xl md:rounded-[2rem] border-4 bg-white transition-all flex justify-center items-center shrink-0 ${btnStyle}`}
                                            >
                                                {renderShape(opt, currentQuestion.mirrorColor)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {isSubmitted && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-2 mb-4 z-20 relative">
                                    <div className={`text-xl font-bold px-6 py-3 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200 shadow-sm' : 'text-red-700 bg-red-100 border-2 border-red-200 shadow-sm'}`}>
                                        {isCorrect ? feedbackMessage : "Not quite! Look at how the shape should flip in the mirror."}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"The perfect reflection (flipped left-to-right)"} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={selectedOption === null}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default MirrorImageShapes;
