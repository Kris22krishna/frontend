import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const LawsOfExponents = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 31; // Placeholder
    const SKILL_NAME = "Class 7 - Exponents - Laws";
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);

            for (let i = 0; i < 12; i++) {
                let q = {};
                // 6 Subtopics, 2 questions each
                // Difficulty ramps up naturally or logic can specify "Easy" for first few, "Medium" next, "Hard" last?
                // Subtopics 1-6 are all "Laws". Let's say 1-2 Easy, 3-4 Medium, 5-6 Medium/Hard.

                let difficulty = i < 4 ? "Easy" : i < 8 ? "Medium" : "Hard";

                if (i < 2) {
                    // Subtopic 1: Multiplying same base
                    // e.g. 2^2 * 2^3
                    const b = rand(2, 5);
                    const m = rand(2, 5);
                    const n = rand(2, 5);

                    if (i === 0) {
                        // Numeric base
                        q = {
                            type: "Multiplying Same Base",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Simplify: $${b}^${m} \\times ${b}^${n}$</p>
                                   </div>`,
                            correctAnswer: `$${b}^{${m + n}}$`,
                            solution: `$$a^m \\times a^n = a^{m+n}$$\n$$${b}^${m} \\times ${b}^${n} = ${b}^{${m}+${n}} = ${b}^${m + n}$$`,
                            options: shuffle([`$${b}^{${m + n}}$`, `$${b}^{${m * n}}$`, `$${b * 2}^{${m + n}}$`, `$${b}^{${m}}$`])
                        };
                    } else {
                        // Variable base
                        const v = ['a', 'x', 'y'][rand(0, 2)];
                        q = {
                            type: "Multiplying Same Base",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Simplify: $${v}^${m} \\times ${v}^${n}$</p>
                                   </div>`,
                            correctAnswer: `$${v}^{${m + n}}$`,
                            solution: `$$a^m \\times a^n = a^{m+n}$$\n$$${v}^${m} \\times ${v}^${n} = ${v}^{${m}+${n}} = ${v}^${m + n}$$`,
                            options: shuffle([`$${v}^{${m + n}}$`, `$${v}^{${m * n}}$`, `$${v}^{${m - n}}$`, `$${v}^{${n}}$`])
                        };
                    }
                } else if (i < 4) {
                    // Subtopic 2: Dividing same base
                    const b = rand(2, 10); // or var
                    const n = rand(2, 4);
                    const m = n + rand(1, 4); // ensure m > n for positive exp

                    if (i === 2) {
                        q = {
                            type: "Dividing Same Base",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Simplify: $${b}^${m} \\div ${b}^${n}$</p>
                                   </div>`,
                            correctAnswer: `$${b}^{${m - n}}$`,
                            solution: `$$a^m \\div a^n = a^{m-n}$$\n$$${b}^${m} \\div ${b}^${n} = ${b}^{${m}-${n}} = ${b}^${m - n}$$`,
                            options: shuffle([`$${b}^{${m - n}}$`, `$${b}^{${m + n}}$`, `$${b}^{${m / n}}$`, `$1$`])
                        };
                    } else {
                        const v = ['a', 'x', 'p'][rand(0, 2)];
                        q = {
                            type: "Dividing Same Base",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Simplify: $${v}^${m} \\div ${v}^${n}$</p>
                                   </div>`,
                            correctAnswer: `$${v}^{${m - n}}$`,
                            solution: `$$a^m \\div a^n = a^{m-n}$$\n$$${v}^${m} \\div ${v}^${n} = ${v}^{${m}-${n}} = ${v}^${m - n}$$`,
                            options: shuffle([`$${v}^{${m - n}}$`, `$${v}^{${m + n}}$`, `$${v}^{${n - m}}$`, `$${v}`])
                        };
                    }
                } else if (i < 6) {
                    // Subtopic 3: Power of power
                    const b = rand(2, 5);
                    const m = rand(2, 4);
                    const n = rand(2, 4);

                    if (i === 4) {
                        q = {
                            type: "Power of a Power",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Simplify: $(${b}^${m})^${n}$</p>
                                   </div>`,
                            correctAnswer: `$${b}^{${m * n}}$`,
                            solution: `$$(a^m)^n = a^{m \\times n}$$\n$$(${b}^${m})^${n} = ${b}^{${m} \\times ${n}} = ${b}^${m * n}$$`,
                            options: shuffle([`$${b}^{${m * n}}$`, `$${b}^{${m + n}}$`, `$${b}^{${m}}$`, `$${b * n}^{m}$`])
                        };
                    } else {
                        const v = ['y', 'z'][rand(0, 1)];
                        q = {
                            type: "Power of a Power",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Simplify: $(${v}^${n})^${m}$</p>
                                   </div>`,
                            correctAnswer: `$${v}^{${m * n}}$`,
                            solution: `$$(a^m)^n = a^{m \\times n}$$\n$$(${v}^${n})^${m} = ${v}^{${n} \\times ${m}} = ${v}^${m * n}$$`,
                            options: shuffle([`$${v}^{${m * n}}$`, `$${v}^{${m + n}}$`, `$${v}^{${n}}$`, `$${v}`])
                        };
                    }
                } else if (i < 8) {
                    // Subtopic 4: Same exponent multiplication
                    // 2^3 * 3^3 = (2*3)^3 = 6^3
                    const m = rand(2, 5);
                    const b1 = rand(2, 5);
                    const b2 = rand(2, 5);
                    // Ensure b1 != b2

                    if (i === 6) {
                        q = {
                            type: "Same Exponent Product",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Simplify: $${b1}^${m} \\times ${b2}^${m}$</p>
                                   </div>`,
                            correctAnswer: `$${b1 * b2}^{${m}}$`,
                            solution: `$$a^m \\times b^m = (a \\times b)^m$$\n$$${b1}^${m} \\times ${b2}^${m} = (${b1} \\times ${b2})^${m} = ${b1 * b2}^${m}$$`,
                            options: shuffle([`$${b1 * b2}^{${m}}$`, `$${b1 + b2}^{${m}}$`, `$${b1 * b2}^{${m + m}}$`, `$${b1}^{m}$`])
                        };
                    } else {
                        const v1 = 'a';
                        const v2 = 'b';
                        q = {
                            type: "Same Exponent Product",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Simplify: $${v1}^${m} \\times ${v2}^${m}$</p>
                                   </div>`,
                            correctAnswer: `$(${v1}${v2})^{${m}}$`,
                            solution: `$$a^m \\times b^m = (ab)^m$$\n$$${v1}^${m} \\times ${v2}^${m} = (${v1}${v2})^${m}$$`,
                            options: shuffle([`$(${v1}${v2})^{${m}}$`, `$${v1}${v2}^{${m + m}}$`, `$${v1}^{${m}}$`, `$${v1}+${v2}^${m}$`])
                        };
                    }
                } else if (i < 10) {
                    // Subtopic 5: Same exponent division
                    const m = rand(2, 5);
                    const num = rand(4, 12);
                    const den = rand(2, 6);
                    // allow fraction or simplify if divisible.
                    // Request says: a^3 \div b^3?
                    // Example: 4^4 \div 3^4

                    if (i === 8) {
                        const n1 = rand(2, 5);
                        const n2 = n1 + 1;
                        q = {
                            type: "Same Exponent Quotient",
                            difficulty_level: "Hard",
                            text: `<div class='question-container'>
                                      <p>Simplify: $${n1}^${m} \\div ${n2}^${m}$</p>
                                   </div>`,
                            correctAnswer: `$(${n1}/${n2})^{${m}}$`,
                            solution: `$$a^m \\div b^m = (\\frac{a}{b})^m$$\n$$${n1}^${m} \\div ${n2}^${m} = (\\frac{${n1}}{${n2}})^${m}$$`,
                            options: shuffle([`$(${n1}/${n2})^{${m}}$`, `$${n1 - n2}^{${m}}$`, `$(${n2}/${n1})^{${m}}$`, `$1$`])
                        };
                    } else {
                        const v1 = 'a';
                        const v2 = 'b';
                        q = {
                            type: "Same Exponent Quotient",
                            difficulty_level: "Hard",
                            text: `<div class='question-container'>
                                      <p>Simplify: $${v1}^${m} \\div ${v2}^${m}$</p>
                                   </div>`,
                            correctAnswer: `$(${v1}/${v2})^{${m}}$`,
                            solution: `$$a^m \\div b^m = (\\frac{a}{b})^m$$\n$$${v1}^${m} \\div ${v2}^${m} = (\\frac{${v1}}{${v2}})^${m}$$`,
                            options: shuffle([`$(${v1}/${v2})^{${m}}$`, `$${v1 - v2}^{${m}}$`, `$${v1}/${v2}$`, `$${v1}^{${m}}$`])
                        };
                    }
                } else {
                    // Subtopic 6: Zero Exponent
                    // 3^0, 7^0
                    const b = rand(10, 100);
                    if (i === 10) {
                        q = {
                            type: "Zero Exponent",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Find the value of $${b}^0$.</p>
                                   </div>`,
                            correctAnswer: `$1$`,
                            solution: `Any non-zero number raised to the power of 0 is 1.\n$$a^0 = 1$$`,
                            options: shuffle([`$1$`, `$0$`, `$${b}$`, `$10$`])
                        };
                    } else {
                        const baseExpr = "$7^0 + 5^0$"; // 1 + 1 = 2
                        q = {
                            type: "Zero Exponent Calc",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Evaluate: $7^0 + 5^0$</p>
                                   </div>`,
                            correctAnswer: `$2$`,
                            solution: `$$7^0 = 1$$\n$$5^0 = 1$$\n$$1 + 1 = 2$$`,
                            options: shuffle([`$2$`, `$1$`, `$0$`, `$12$`])
                        };
                    }
                }
                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

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
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [sessionId]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) {
            timeSpent += Date.now() - questionStartTime.current;
        }
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: question.difficulty_level || 'Medium',
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQuestion = questions[qIndex];

        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) {
                await api.finishSession(sessionId).catch(console.error);
            }

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;

                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / questions.length) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: questions.length,
                            correct_answers: totalCorrect,
                            timestamp: new Date().toISOString(),
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            navigate(-1);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (questions.length === 0) return <div>Loading...</div>;

    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"> </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                    <LatexContent html={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                    {isSubmitted && isCorrect && (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="feedback-mini correct"
                                            style={{ marginTop: '20px' }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" />
                                                <span>{feedbackMessage}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => { setShowExplanationModal(false); }}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            Exit Practice
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrevious} disabled={qIndex === 0}>
                                <ChevronLeft size={28} strokeWidth={3} /> Prev
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <X size={20} />
                        </button>
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={handlePrevious} disabled={qIndex === 0}>
                                <ChevronLeft size={20} />
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LawsOfExponents;
