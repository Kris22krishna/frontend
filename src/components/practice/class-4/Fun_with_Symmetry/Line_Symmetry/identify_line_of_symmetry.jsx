import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import FunWithSymmetryReportModal from '../FunWithSymmetryReportModal';
import '../FunWithSymmetry.css';

import { useSessionLogger } from '../../../../../hooks/useSessionLogger';

const NODE_ID = 'a4041006-0001-0000-0000-000000000000';
const CORRECT_MESSAGES = [
    "✨ Brilliant! You have an eye for symmetry! ✨",
    "🌟 Perfect! You found the mirror line! 🌟",
    "🎉 Awesome! That's exactly right! 🎉",
    "✨ Fantastic spotting! ✨",
    "🚀 Super! You're a symmetry expert! 🚀"
];

const IdentifyLineOfSymmetry = () => {
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
  const v4AnswersPayload = useRef([]);
  const v4IsFinishedRef = useRef(false);
  const { startSession, finishSession, abandonSession } = useSessionLogger();
  useEffect(() => {
    return () => { if (!v4IsFinishedRef.current) abandonSession(); };
  }, []);


    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1199; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Identify Line of Symmetry";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // Shapes Definitions
    const renderShape = (q) => {
        const strokeColor = "#31326F";
        const strokeWidth = 4;
        const fillColor = "#E0F7FA";

        let shapeSVG = null;

        switch (q.shapeType) {
            case 'rectangle':
                shapeSVG = <rect x="25" y="40" width="150" height="120" rx="8" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />;
                break;
            case 'square':
                shapeSVG = <rect x="50" y="50" width="100" height="100" rx="8" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />;
                break;
            case 'circle':
                shapeSVG = <circle cx="100" cy="100" r="60" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />;
                break;
            case 'triangle':
                shapeSVG = <polygon points="100,30 160,150 40,150" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'star':
                shapeSVG = <polygon points="100,20 120,75 180,80 135,115 150,175 100,145 50,175 65,115 20,80 80,75" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'heart':
                shapeSVG = <path d="M100,160 C100,160 30,110 30,60 C30,30 70,30 100,60 C130,30 170,30 170,60 C170,110 100,160 100,160 Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'hexagon':
                shapeSVG = <polygon points="100,30 160,65 160,135 100,170 40,135 40,65" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'letterA':
                shapeSVG = <path d="M100,30 L160,170 L135,170 L120,130 L80,130 L65,170 L40,170 Z M90,105 L110,105 L100,75 Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'letterM':
                shapeSVG = <path d="M40,170 L40,30 L100,100 L160,30 L160,170 L135,170 L135,80 L100,125 L65,80 L65,170 Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'parallelogram':
                shapeSVG = <polygon points="60,50 160,50 140,150 40,150" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            default:
                shapeSVG = <circle cx="100" cy="100" r="50" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />;
        }

        return (
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md relative overflow-visible">
                {shapeSVG}
                <line
                    x1={q.line.x1}
                    y1={q.line.y1}
                    x2={q.line.x2}
                    y2={q.line.y2}
                    stroke="#EF4444"
                    strokeWidth="4"
                    strokeDasharray="10,6"
                    className="drop-shadow-sm"
                />
            </svg>
        );
    };

    const generateQuestions = () => {
        const shapes = ['rectangle', 'square', 'circle', 'triangle', 'star', 'heart', 'hexagon', 'letterA', 'letterM', 'parallelogram'];

        // Define symmetry properties for each shape
        const symmetryData = {
            'square': [{ x1: 100, y1: 20, x2: 100, y2: 180 }, { x1: 20, y1: 100, x2: 180, y2: 100 }, { x1: 30, y1: 30, x2: 170, y2: 170 }],
            'circle': [{ x1: 20, y1: 100, x2: 180, y2: 100 }, { x1: 100, y1: 20, x2: 100, y2: 180 }, { x1: 40, y1: 40, x2: 160, y2: 160 }],
            'heart': [{ x1: 100, y1: 20, x2: 100, y2: 180 }], // Only vertical
            'rectangle': [{ x1: 100, y1: 20, x2: 100, y2: 180 }, { x1: 20, y1: 100, x2: 180, y2: 100 }],
            'triangle': [{ x1: 100, y1: 10, x2: 100, y2: 190 }], // Isosceles vertical
            'letterM': [{ x1: 100, y1: 10, x2: 100, y2: 190 }],
            'letterA': [{ x1: 100, y1: 10, x2: 100, y2: 190 }],
            'star': [{ x1: 100, y1: 10, x2: 100, y2: 190 }], // Top vertical
            'hexagon': [{ x1: 100, y1: 10, x2: 100, y2: 190 }, { x1: 20, y1: 100, x2: 180, y2: 100 }],
            'parallelogram': [] // None
        };

        // Helper to get a random wrong line
        const getWrongLine = () => {
            const wrongLines = [
                { x1: 20, y1: 20, x2: 180, y2: 80 },
                { x1: 40, y1: 180, x2: 160, y2: 20 },
                { x1: 25, y1: 40, x2: 175, y2: 160 }, // Diagonal
                { x1: 20, y1: 105, x2: 180, y2: 105 }, // Off-center horizontal
                { x1: 40, y1: 65, x2: 160, y2: 135 } // Off-center diagonal
            ];
            return wrongLines[Math.floor(Math.random() * wrongLines.length)];
        };

        const questions = [];

        // Ensure 10 questions with a mix of True and False
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            // Pick a random shape from the pool
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            const symLines = symmetryData[shapeType] || [];

            // 50/50 chance of being symmetric, unless the shape has no lines (parallelogram)
            const shouldBeSymmetric = symLines.length > 0 ? Math.random() > 0.5 : false;

            let line = null;
            let solution = "";

            if (shouldBeSymmetric) {
                line = symLines[Math.floor(Math.random() * symLines.length)];
                solution = `Yes, if you fold the ${shapeType} along this line, both halves match perfectly!`;
            } else {
                // Generate a line that is explicitly wrong for this shape
                // We pick from `getWrongLine()` or pick a horizontal line if the shape is only vertically symmetric (heart, M, A, triangle)

                if (['heart', 'letterM', 'letterA', 'triangle', 'star'].includes(shapeType) && Math.random() > 0.5) {
                    line = { x1: 20, y1: 100, x2: 180, y2: 100 }; // Horizontal cut
                    solution = `No, if you fold the ${shapeType} horizontally, the top does not match the bottom.`;
                } else if (shapeType === 'parallelogram') {
                    line = Math.random() > 0.5 ? { x1: 100, y1: 20, x2: 100, y2: 180 } : { x1: 20, y1: 100, x2: 180, y2: 100 };
                    solution = "No, a parallelogram does not have lines of symmetry. The slanted sides won't line up.";
                } else {
                    line = getWrongLine();
                    solution = "No, this is not a line of symmetry. Folding along this line will not create perfect matching halves.";
                }
            }

            questions.push({ shapeType, line, isSymmetric: shouldBeSymmetric, solution });
        }

        return questions;
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
            startSession({ nodeId: NODE_ID, sessionType: 'practice' });
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

        const isRight = selectedOption === currentQuestion.isSymmetric;
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
            question_text: `Is the line on this ${currentQuestion.shapeType} a line of symmetry?`,
            correct_answer: currentQuestion.isSymmetric ? "Yes" : "No",
            student_answer: selectedOption ? "Yes" : "No",
            is_correct: isRight,
            solution_text: currentQuestion.solution,
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
        v4AnswersPayload.current.push({
          node_id: NODE_ID,
          is_correct: isRight,
          time_spent_ms: Date.now() - questionStartTime.current,
        });
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
                    if (!v4IsFinishedRef.current) {
                      v4IsFinishedRef.current = true;
                      finishSession({ answers_payload: v4AnswersPayload.current });
                    }
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
                <div className="w-full max-w-4xl mx-auto my-4 md:my-8 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-8 items-center justify-start h-auto min-h-[400px]">

                    <div className="w-full flex justify-center text-center pb-2">
                        <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                            Is the red dashed line a <span className="text-[#0097A7]">line of symmetry</span>?
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 h-full">

                        {/* Left Column: Image */}
                        <div className="w-full md:w-1/2 flex justify-center items-center">

                            {/* Interactive Area */}
                            <div className="w-full max-w-[12rem] md:max-w-[15rem] aspect-square h-auto max-h-[30vh] bg-slate-50 border-4 border-slate-200 rounded-3xl flex justify-center items-center overflow-hidden">
                                {renderShape(currentQuestion)}
                            </div>
                        </div>

                        {/* Right Column: Options & Feedback */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6">

                            {/* Options */}
                            <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-sm mt-auto mb-auto">
                                <button
                                    disabled={isSubmitted}
                                    onClick={() => handleAnswer(true)}
                                    className={`text-2xl md:text-3xl font-bold p-4 md:p-6 rounded-[2rem] border-b-8 transition-all active:border-b-0 active:translate-y-2 flex justify-center items-center
                                    ${selectedOption === true && !isSubmitted ? 'bg-[#4DD0E1] text-white border-[#00BCD4] shadow-lg' :
                                            isSubmitted && selectedOption === true && isCorrect ? 'bg-[#66BB6A] text-white border-[#43A047]' :
                                                isSubmitted && selectedOption === true && !isCorrect ? 'bg-[#EF5350] text-white border-[#E53935]' :
                                                    isSubmitted && currentQuestion.isSymmetric === true ? 'bg-[#66BB6A] text-white border-[#43A047]' :
                                                        isSubmitted ? 'bg-gray-100 text-gray-400 border-gray-200' :
                                                            'bg-white text-[#31326F] border-gray-200 hover:bg-gray-50'}`}
                                >
                                    YES
                                </button>
                                <button
                                    disabled={isSubmitted}
                                    onClick={() => handleAnswer(false)}
                                    className={`text-2xl md:text-3xl font-bold p-4 md:p-6 rounded-[2rem] border-b-8 transition-all active:border-b-0 active:translate-y-2 flex justify-center items-center
                                    ${selectedOption === false && !isSubmitted ? 'bg-[#4DD0E1] text-white border-[#00BCD4] shadow-lg' :
                                            isSubmitted && selectedOption === false && isCorrect ? 'bg-[#66BB6A] text-white border-[#43A047]' :
                                                isSubmitted && selectedOption === false && !isCorrect ? 'bg-[#EF5350] text-white border-[#E53935]' :
                                                    isSubmitted && currentQuestion.isSymmetric === false ? 'bg-[#66BB6A] text-white border-[#43A047]' :
                                                        isSubmitted ? 'bg-gray-100 text-gray-400 border-gray-200' :
                                                            'bg-white text-[#31326F] border-gray-200 hover:bg-gray-50'}`}
                                >
                                    NO
                                </button>
                            </div>

                            {isSubmitted && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-4 mb-4 z-20 relative">
                                    <div className={`text-xl md:text-2xl font-bold px-6 py-3 md:px-8 md:py-4 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200' : 'text-red-700 bg-red-100 border-2 border-red-200'}`}>
                                        {isCorrect ? feedbackMessage : "Not quite! Check the explanation."}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.isSymmetric ? 'YES' : 'NO'} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

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

export default IdentifyLineOfSymmetry;
