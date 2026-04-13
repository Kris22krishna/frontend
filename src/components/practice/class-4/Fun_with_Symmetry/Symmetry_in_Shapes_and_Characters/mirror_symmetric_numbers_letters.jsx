import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import FunWithSymmetryReportModal from '../FunWithSymmetryReportModal';
import '../FunWithSymmetry.css';

import { useSessionLogger } from '../../../../../hooks/useSessionLogger';

const NODE_ID = 'a4041006-0008-0000-0000-000000000000';
const CORRECT_MESSAGES = [
    "✨ You spotted the reflection perfectly! ✨",
    "🌟 Such a great eye for symmetry! 🌟",
    "🎉 Awesome! You identified the mirror line! 🎉",
    "✨ Fantastic letter and number matching! ✨",
    "🚀 Super! You're a reflection expert! 🚀"
];

const MirrorSymmetricNumbersLetters = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]); // Array of selected option indices (for multi-select)
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
    const SKILL_ID = 1206; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Letters & Numbers";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // ----------------------------------------------------------------------
    // SVGs for showing the mirror lines on letters/numbers
    // ----------------------------------------------------------------------
    const renderCharacter = (char, color, showLines = false) => {
        return (
            <div className="relative w-full h-full flex items-center justify-center font-bold font-sans text-white drop-shadow-md pb-4 pt-4" style={{ backgroundColor: color, borderRadius: '20%' }}>
                <span className="text-8xl md:text-9xl leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>{char}</span>
                {showLines && (
                    <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        {/* Define symmetry lines based on character */}
                        {['A', 'M', 'T', 'U', 'V', 'W', 'Y', '8', '0'].includes(char) && (
                            <line x1="50" y1="5" x2="50" y2="95" stroke="#FFF" strokeWidth="4" strokeDasharray="6,4" />
                        )}
                        {['B', 'C', 'D', 'E', 'K', '3', '8', '0'].includes(char) && (
                            <line x1="5" y1="50" x2="95" y2="50" stroke="#FFF" strokeWidth="4" strokeDasharray="6,4" />
                        )}
                        {['H', 'I', 'O', 'X'].includes(char) && (
                            <>
                                <line x1="50" y1="5" x2="50" y2="95" stroke="#FFF" strokeWidth="4" strokeDasharray="6,4" />
                                <line x1="5" y1="50" x2="95" y2="50" stroke="#FFF" strokeWidth="4" strokeDasharray="6,4" />
                            </>
                        )}
                    </svg>
                )}
            </div>
        );
    };

    const QUESTIONS = [
        // 3 Easy (Find one symmetrical letter/number)
        {
            type: 'single',
            question: "Which letter has a VERTICAL line of symmetry?",
            options: ['F', 'A', 'L', 'P'],
            correctIndices: [1],
            solution: "The letter A can be folded perfectly in half downwards right through its point."
        },
        {
            type: 'single',
            question: "Which number has a HORIZONTAL line of symmetry?",
            options: ['7', '4', '3', '9'],
            correctIndices: [2],
            solution: "The number 3 (in most fonts) can be folded horizontally and the top loop matches the bottom loop."
        },
        {
            type: 'single',
            question: "Which letter has BOTH vertical and horizontal symmetry?",
            options: ['H', 'T', 'E', 'C'],
            correctIndices: [0],
            solution: "The letter H can be folded top-to-bottom AND left-to-right!"
        },

        // 3 Medium (Select multiple)
        {
            type: 'multi',
            question: "Select ALL the letters that have a VERTICAL line of symmetry.",
            options: [
                { char: 'M', color: '#F43F5E' },
                { char: 'S', color: '#10B981' },
                { char: 'W', color: '#3B82F6' },
                { char: 'N', color: '#F59E0B' }
            ],
            correctIndices: [0, 2],
            solution: "M and W can be folded left-to-right perfectly. S and N curve in ways that don't reflect."
        },
        {
            type: 'multi',
            question: "Select ALL the numbers that have SOME symmetry (vertical or horizontal).",
            options: [
                { char: '8', color: '#8B5CF6' },
                { char: '2', color: '#EC4899' },
                { char: '0', color: '#14B8A6' },
                { char: '5', color: '#F97316' }
            ],
            correctIndices: [0, 2],
            solution: "0 and 8 are highly symmetrical (they have both!). 2 and 5 have no lines of symmetry."
        },
        {
            type: 'multi',
            question: "Which letters have a HORIZONTAL line of symmetry?",
            options: [
                { char: 'E', color: '#4F46E5' },
                { char: 'B', color: '#06B6D4' },
                { char: 'A', color: '#EAB308' },
                { char: 'R', color: '#EF4444' }
            ],
            correctIndices: [0, 1],
            solution: "E and B have a top half that perfectly reflects the bottom half. A is vertical only, R has none."
        },

        // 4 Hard (Words / Combinations)
        {
            type: 'multi',
            question: "Which of these words look exactly the same in a mirror? (Hint: They need a vertical line of symmetry down the whole word!)",
            options: [
                { text: 'WOW', color: '#6366F1' },
                { text: 'MOM', color: '#F43F5E' },
                { text: 'DAD', color: '#10B981' },
                { text: 'BOB', color: '#F59E0B' }
            ],
            correctIndices: [0, 1],
            solution: "WOW and MOM are perfectly symmetrical because W, O, and M all have a vertical line, and in that sequence, they reflect perfectly!"
        },
        {
            type: 'multi',
            question: "Which of these words have a HORIZONTAL line of symmetry through the whole word?",
            options: [
                { text: 'HIDE', color: '#8B5CF6' },
                { text: 'DECIDE', color: '#14B8A6' },
                { text: 'CHECK', color: '#EC4899' },
                { text: 'TOOT', color: '#3B82F6' }
            ],
            correctIndices: [0, 1, 2],
            solution: "Look closely at H, I, D, E, C, K ... they ALL have horizontal symmetry! So words like HIDE, DECIDE, and CHECK have a horizontal line running right through the middle."
        },
        {
            type: 'multi',
            question: "Select ALL characters (letters or numbers) with NO lines of symmetry.",
            options: [
                { char: 'Z', color: '#F97316' },
                { char: 'O', color: '#3B82F6' },
                { char: '7', color: '#EF4444' },
                { char: 'X', color: '#10B981' }
            ],
            correctIndices: [0, 2],
            solution: "Z and 7 have no lines of symmetry. (Z has rotational symmetry, but no reflection lines!) O and X have both vertical and horizontal."
        },
        {
            type: 'single', // Word puzzle
            question: "If I write the word 'CHOICE' and hold a mirror horizontally along the BOTTOM of the letters, what word do I see in the mirror?",
            options: ['CHOICE', 'ECIOHC', 'Nothing', 'Different'],
            correctIndices: [0],
            solution: "Try it! Because C, H, O, I, and E all have horizontal lines of symmetry, their reflection on the bottom looks exactly like the word itself: CHOICE!"
        }
    ];

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
        setSessionQuestions(QUESTIONS);

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
                setSelectedOptions(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOptions([]);
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

    const handleAnswerMulti = (idx) => {
        if (isSubmitted) return;
        setSelectedOptions(prev => {
            if (prev.includes(idx)) {
                return prev.filter(i => i !== idx);
            } else {
                return [...prev, idx];
            }
        });
    };

    const handleAnswerSingle = (idx) => {
        if (isSubmitted) return;
        setSelectedOptions([idx]);
    }

    const handleSubmit = () => {
        if (selectedOptions.length === 0 || !currentQuestion) return;

        // Exact match check for arrays
        const correctSet = new Set(currentQuestion.correctIndices);
        const userSet = new Set(selectedOptions);

        const isRight = correctSet.size === userSet.size && [...correctSet].every(x => userSet.has(x));

        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOptions } }));

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
            question_text: currentQuestion.question,
            correct_answer: currentQuestion.correctIndices.join(','),
            student_answer: selectedOptions.join(','),
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
            setSelectedOptions([]);
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

        return (
            <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif', minHeight: '100vh' }}>
                <FunWithSymmetryReportModal
                    isOpen={showResults}
                    stats={{
                        timeTaken: formatTime(timeElapsed),
                        correctAnswers: score,
                        totalQuestions: TOTAL_QUESTIONS
                    }}
                    onContinue={() => navigate(-1)}
                />
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    const isMulti = currentQuestion.type === 'multi';

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

                    <div className="w-full flex flex-col items-center text-center pb-4 max-w-3xl">
                        <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] leading-tight px-4">
                            {currentQuestion.question}
                        </h2>
                        {isMulti && !isSubmitted && (
                            <div className="text-sm font-bold text-white uppercase tracking-widest mt-4 bg-[#F59E0B] px-4 py-2 rounded-full shadow-md animate-bounce">Select all that apply!</div>
                        )}
                    </div>

                    <div className="w-full flex flex-col w-full gap-8 justify-center items-center">

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl px-4">
                            {currentQuestion.options.map((opt, i) => {
                                const isOptSelected = selectedOptions.includes(i);
                                const isCorrectOpt = currentQuestion.correctIndices.includes(i);

                                // Determine styling based on type and state
                                let btnStyle = 'border-gray-200 hover:border-[#0097A7] hover:scale-105 hover:shadow-lg transition-all duration-300';

                                if (!isSubmitted && isOptSelected) {
                                    btnStyle = 'border-[#0097A7] bg-[#E0F7FA] scale-105 shadow-xl shadow-[#0097A7]/20 border-[4px] ring-4 ring-[#E0F7FA]';
                                } else if (isSubmitted) {
                                    if (isCorrectOpt) {
                                        // Highlight correct answers in green, pulse if they missed it
                                        btnStyle = `border-green-500 bg-green-50 shadow-md shadow-green-500/20 scale-105 border-[4px] ${!isOptSelected ? 'ring-4 ring-green-200' : ''}`;
                                    } else if (isOptSelected && !isCorrectOpt) {
                                        // Highlight incorrect choices in red
                                        btnStyle = 'border-red-500 bg-red-50 shadow-md shadow-red-500/20 border-[4px] scale-95 opacity-80';
                                    } else {
                                        // Dim unselected correct options
                                        btnStyle = 'border-gray-100 opacity-40 bg-white grayscale';
                                    }
                                } else {
                                    btnStyle += ' border-[3px] bg-white text-[#31326F]';
                                }

                                const handleOptClick = () => {
                                    if (isMulti) handleAnswerMulti(i);
                                    else handleAnswerSingle(i);
                                };

                                return (
                                    <button
                                        key={i}
                                        disabled={isSubmitted}
                                        onClick={handleOptClick}
                                        className={`rounded-[2.5rem] relative flex justify-center items-center aspect-square md:aspect-auto md:h-56 p-4 w-full ${btnStyle}`}
                                    >
                                        {/* Show checkmarks/Xs if submitted */}
                                        {isSubmitted && isCorrectOpt && (
                                            <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full shadow-md z-10"><Check size={24} strokeWidth={4} /></div>
                                        )}
                                        {isSubmitted && isOptSelected && !isCorrectOpt && (
                                            <div className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full shadow-md z-10"><X size={24} strokeWidth={4} /></div>
                                        )}

                                        {/* Render Option Content */}
                                        <div className="w-full h-full">
                                            {typeof opt === 'string' ? (
                                                <div className="w-full h-full flex justify-center items-center text-8xl font-black bg-gray-100 rounded-3xl" style={{ color: '#31326F' }}>{opt}</div>
                                            ) : opt.char ? (
                                                renderCharacter(opt.char, isSubmitted && isCorrectOpt ? '#10B981' : (isSubmitted && isOptSelected && !isCorrectOpt ? '#EF4444' : opt.color), isSubmitted)
                                            ) : opt.text ? (
                                                <div className="w-full h-full flex justify-center items-center text-4xl md:text-5xl font-black text-white p-4 rounded-3xl" style={{ backgroundColor: isSubmitted && isCorrectOpt ? '#10B981' : (isSubmitted && isOptSelected && !isCorrectOpt ? '#EF4444' : opt.color) }}>{opt.text}</div>
                                            ) : null}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                    {isSubmitted && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-4">
                            <div className={`text-xl font-bold px-8 py-4 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200 shadow-sm' : 'text-red-700 bg-red-100 border-2 border-red-200 shadow-sm'}`}>
                                {isCorrect ? feedbackMessage : "Not quite! Check the explanation for the answer."}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"See explanation"} explanation={currentQuestion.solution + (currentQuestion.options[0].char ? " (Dashed white lines have been drawn on the symmetrical choices to show the mirror line!)" : "")} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={selectedOptions.length === 0}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default MirrorSymmetricNumbersLetters;
