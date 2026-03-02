import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../FunWithSymmetry.css';

const CORRECT_MESSAGES = [
    "✨ You counted all the lines perfectly! ✨",
    "🌟 Perfect! Those are all the lines of symmetry! 🌟",
    "🎉 Awesome polygon knowledge! 🎉",
    "✨ Fantastic counting! ✨",
    "🚀 Super! You're a symmetry expert! 🚀"
];

const LinesOfSymmetryInPolygons = () => {
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
    const SKILL_ID = 1205; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Lines in Polygons";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // ----------------------------------------------------------------------
    // SVGs for the Polygons with Symmetry Lines
    // ----------------------------------------------------------------------
    const renderPolygon = (id, color, showLines = false) => {
        const strokeColor = "#31326F";
        const strokeWidth = 8;

        let shapeSVG = null;
        let linesSVG = null;

        switch (id) {
            case 'square': // 4 lines
                shapeSVG = <rect x="40" y="40" width="120" height="120" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />;
                linesSVG = (
                    <>
                        <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="40" y1="40" x2="160" y2="160" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="40" y1="160" x2="160" y2="40" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                    </>
                );
                break;
            case 'rectangle': // 2 lines
                shapeSVG = <rect x="30" y="60" width="140" height="80" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />;
                linesSVG = (
                    <>
                        <line x1="100" y1="30" x2="100" y2="170" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="10" y1="100" x2="190" y2="100" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                    </>
                );
                break;
            case 'equilateral-triangle': // 3 lines
                shapeSVG = <polygon points="100,30 170,160 30,160" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                linesSVG = (
                    <>
                        <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="180" y1="170" x2="50" y2="90" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="20" y1="170" x2="150" y2="90" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                    </>
                );
                break;
            case 'isosceles-triangle': // 1 line
                shapeSVG = <polygon points="100,20 150,170 50,170" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                linesSVG = (
                    <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                );
                break;
            case 'scalene-triangle': // 0 lines
                shapeSVG = <polygon points="60,30 180,160 30,160" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                linesSVG = null;
                break;
            case 'regular-pentagon': // 5 lines (all points to opposite edges)
                shapeSVG = <polygon points="100,20 180,75 150,170 50,170 20,75" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                linesSVG = (
                    <>
                        <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="190" y1="70" x2="30" y2="135" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="10" y1="70" x2="170" y2="135" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="160" y1="190" x2="50" y2="40" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="40" y1="190" x2="150" y2="40" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                    </>
                );
                break;
            case 'regular-hexagon': // 6 lines (vertices AND edges)
                shapeSVG = <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                linesSVG = (
                    <>
                        <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="10" y1="100" x2="190" y2="100" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="180" y1="50" x2="20" y2="150" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="20" y1="50" x2="180" y2="150" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="150" y1="10" x2="50" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="50" y1="10" x2="150" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                    </>
                );
                break;
            case 'rhombus': // 2 lines
                shapeSVG = <polygon points="100,20 160,100 100,180 40,100" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                linesSVG = (
                    <>
                        <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                    </>
                );
                break;
            case 'kite': // 1 line
                shapeSVG = <polygon points="100,20 160,80 100,180 40,80" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                linesSVG = (
                    <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                );
                break;
            case 'regular-octagon': // 8 lines
                shapeSVG = <polygon points="70,20 130,20 180,70 180,130 130,180 70,180 20,130 20,70" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                linesSVG = (
                    <>
                        <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="10" y1="100" x2="190" y2="100" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="10" y1="10" x2="190" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="10" y1="190" x2="190" y2="10" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        {/* Edge-to-edge lines */}
                        <line x1="50" y1="10" x2="150" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="150" y1="10" x2="50" y2="190" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="10" y1="50" x2="190" y2="150" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                        <line x1="10" y1="150" x2="190" y2="50" stroke="white" strokeWidth="4" strokeDasharray="6,4" />
                    </>
                );
                break;
            default:
                shapeSVG = <circle cx="100" cy="100" r="80" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />;
                linesSVG = null;
        }

        return (
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md relative overflow-visible">
                {shapeSVG}
                {showLines && linesSVG}
            </svg>
        );
    };

    const generateQuestions = () => {
        const polygonData = [
            { shape: 'square', name: 'Square', correctVal: 4, solution: "A square has 4 equal sides. It has 4 lines of symmetry: vertical, horizontal, and two diagonal lines." },
            { shape: 'isosceles-triangle', name: 'Isosceles Triangle', correctVal: 1, solution: "An isosceles triangle has two equal sides. It only has 1 line of symmetry right down the middle from the top point." },
            { shape: 'rectangle', name: 'Rectangle', correctVal: 2, solution: "A rectangle has 2 lines of symmetry: one vertical and one horizontal. Diagonal lines don't work for a non-square rectangle!" },
            { shape: 'equilateral-triangle', name: 'Equilateral Triangle', correctVal: 3, solution: "An equilateral triangle has 3 equal sides, and it has 3 lines of symmetry: one down from each of its 3 points." },
            { shape: 'kite', name: 'Kite Shape', correctVal: 1, solution: "A kite only has 1 line of symmetry connecting its top and bottom points. The left and right sides match perfectly along this line." },
            { shape: 'rhombus', name: 'Rhombus (Diamond)', correctVal: 2, solution: "A rhombus has 2 lines of symmetry that go straight from corner to opposite corner. It does not have vertical/horizontal ones unless it's a square." },
            { shape: 'scalene-triangle', name: 'Scalene Triangle', correctVal: 0, solution: "A scalene triangle has no equal sides. This means you cannot fold it anywhere to make the sides match up perfectly. It has 0 lines of symmetry." },
            { shape: 'regular-pentagon', name: 'Regular Pentagon', correctVal: 5, solution: "A regular polygon with 5 sides (pentagon) has 5 lines of symmetry. One line from each point going straight to the middle of the opposite side." },
            { shape: 'regular-hexagon', name: 'Regular Hexagon', correctVal: 6, solution: "A regular hexagon has 6 equal sides, so it has 6 lines of symmetry! Three lines connect opposite corners, and three connect the middles of opposite sides." },
            { shape: 'regular-octagon', name: 'Regular Octagon', correctVal: 8, solution: "An octagon like a stop sign has 8 equal sides. Regular polygons have the same number of symmetry lines as they have sides, so it has 8!" }
        ];

        const colors = ['#F43F5E', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4', '#EF4444', '#14B8A6', '#6366F1', '#EC4899'];
        const possibleOptionsSets = [
            [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 6], [2, 4, 6, 8], [3, 4, 5, 6],
            [1, 3, 5, 10], [4, 6, 8, 16], [0, 1, 2, 4]
        ];

        const questions = [];

        // We want 10 questions. We can just pick randomly from the definitions for each question.
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const data = polygonData[Math.floor(Math.random() * polygonData.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Find an option set that contains the correct answer
            let validSets = possibleOptionsSets.filter(set => set.includes(data.correctVal));
            if (validSets.length === 0) validSets = [[0, 1, 2, 3, 4, 5, 6, 8, 10, 16]]; // fallback pool

            let optionsSet = [...validSets[Math.floor(Math.random() * validSets.length)]];

            // If the set doesn't contain exactly 4, build a custom one
            if (optionsSet.length !== 4) {
                optionsSet = [data.correctVal];
                const pool = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16];
                while (optionsSet.length < 4) {
                    const num = pool[Math.floor(Math.random() * pool.length)];
                    if (!optionsSet.includes(num)) optionsSet.push(num);
                }
                optionsSet.sort((a, b) => a - b);
            }

            questions.push({
                shape: data.shape,
                name: data.name,
                correctVal: data.correctVal,
                solution: data.solution,
                options: optionsSet,
                color: color
            });
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

        const isRight = selectedOption === currentQuestion.correctVal;
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
            question_text: `How many lines of symmetry does a ${currentQuestion.name} have?`,
            correct_answer: currentQuestion.correctVal.toString(),
            student_answer: selectedOption.toString(),
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
                    <div className="title-area"><h1 className="text-3xl font-bold text-[#31326F] pt-8">Polygons Result</h1></div>
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
                <div className="w-full max-w-5xl mx-auto my-4 md:my-8 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-8 items-center justify-start h-auto min-h-[400px]">

                    <div className="w-full flex flex-col items-center text-center pb-2">
                        <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                            How many <span className="text-[#0097A7]">lines of symmetry</span>?
                        </h2>
                        <span className="text-lg font-bold text-gray-500 mt-2 bg-gray-100 px-6 py-2 rounded-full inline-block">{currentQuestion.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center w-full gap-8 md:gap-16 justify-center h-full">

                        {/* Shape Area (Left Column) */}
                        <div className="w-full md:w-1/2 flex justify-center items-center">
                            <div className="w-40 h-40 md:w-56 md:h-56 bg-slate-50 border-[4px] md:border-[6px] border-slate-200 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-md shadow-gray-200 relative overflow-hidden flex items-center justify-center transition-all duration-500">
                                {renderPolygon(currentQuestion.shape, currentQuestion.color, isSubmitted)}
                            </div>
                        </div>

                        {/* Number Pad Options & Feedback (Right Column) */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6">
                            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                                {currentQuestion.options.map((optVal, i) => {
                                    const isOptSelected = selectedOption === optVal;
                                    const isCorrectOpt = currentQuestion.correctVal === optVal;

                                    let btnStyle = 'border-gray-200 text-[#31326F] hover:border-[#0097A7] hover:text-[#0097A7] hover:scale-105 hover:bg-[#E0F7FA]';
                                    if (!isSubmitted && isOptSelected) {
                                        btnStyle = 'border-[#0097A7] bg-[#E0F7FA] text-[#0097A7] scale-105 shadow-md shadow-[#0097A7]/20 border-[4px]';
                                    } else if (isSubmitted && isCorrectOpt) {
                                        btnStyle = 'border-green-500 bg-green-50 text-green-600 shadow-md shadow-green-500/20 scale-105 border-[4px]';
                                    } else if (isSubmitted && isOptSelected && !isCorrect) {
                                        btnStyle = 'border-red-500 bg-red-50 text-red-600 shadow-md shadow-red-500/20 border-[4px]';
                                    } else if (isSubmitted) {
                                        btnStyle = 'border-gray-100 opacity-50 bg-white text-gray-400';
                                    } else {
                                        btnStyle += ' border-[3px] bg-white';
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={isSubmitted}
                                            onClick={() => handleAnswer(optVal)}
                                            className={`rounded-[2rem] transition-all flex justify-center items-center aspect-video font-bold text-4xl shadow-sm ${btnStyle}`}
                                        >
                                            {optVal}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Feedback Area */}
                            <div className="min-h-[5rem] flex items-center justify-center w-full relative z-20">
                                {isSubmitted && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full">
                                        <div className={`text-xl font-bold px-8 py-4 rounded-full inline-block shadow-sm border-2 ${isCorrect ? 'text-green-700 bg-green-100 border-green-200' : 'text-red-700 bg-red-100 border-red-200'}`}>
                                            {isCorrect ? feedbackMessage : "Not quite! Look at the white dashed lines drawn on the shape now."}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={`${currentQuestion.correctVal} line${currentQuestion.correctVal !== 1 ? 's' : ''}`} explanation={currentQuestion.solution + " (We have drawn them on the shape for you to see!)"} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

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

export default LinesOfSymmetryInPolygons;
