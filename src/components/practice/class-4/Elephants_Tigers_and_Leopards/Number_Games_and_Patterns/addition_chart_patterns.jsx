import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Grid as GridIcon, ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const AdditionChartPatterns = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1189;
    const SKILL_NAME = "Elephants, Tigers, and Leopards - Number Grid Patterns";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // Grid State
    const [highlightedCells, setHighlightedCells] = useState([]);

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

        const generatedQuestions = [];
        const difficulties = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard', 'hard'];

        difficulties.forEach((diff, idx) => {
            generatedQuestions.push(generateQuestion(diff, idx));
        });
        setSessionQuestions(generatedQuestions);

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
            setHighlightedCells((qData.patternCells || []));
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

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateQuestion = (difficulty, index) => {
        // Grid 1-100 logic
        // Easy: Vertical (+10), Horizontal (+1)
        // Medium: Diagonal (+11, +9)
        // Hard: Knight jumps or complex steps, L-shapes

        let questionText = "";
        let correctAnswer = 0;
        let explanation = "";
        let patternCells = [];
        let startNum = randomInt(1, 80);

        if (difficulty === 'easy') {
            // +10 pattern
            if (Math.random() > 0.5) {
                // Vertical down
                startNum = randomInt(1, 70);
                const nextNum = startNum + 10;
                patternCells = [startNum]; // Highlight start
                questionText = `Look at the number grid. If you move **one step down** from **${startNum}**, which number do you land on?`;
                correctAnswer = nextNum;
                explanation = `Moving one step down adds **10**.<br/>${startNum} + 10 = ${correctAnswer}.`;
            } else {
                // Horizontal right
                if (startNum % 10 > 8 || startNum % 10 === 0) startNum -= 2; // Avoid edge
                const nextNum = startNum + 1;
                patternCells = [startNum];
                questionText = `What is the number immediately to the **right** of **${startNum}**?`;
                correctAnswer = nextNum;
                explanation = `Moving right adds **1**.<br/>${startNum} + 1 = ${correctAnswer}.`;
            }
        } else if (difficulty === 'medium') {
            // +11 (Diagonal Down-Right) or +9 (Diagonal Down-Left)
            if (Math.random() > 0.5) {
                // Diagonal Down-Right (+11)
                startNum = randomInt(1, 75);
                if (startNum % 10 === 0) startNum--; // Boundary check
                const target = startNum + 11;
                patternCells = [startNum];
                questionText = `If you move diagonally **down-right** ↘ from **${startNum}**, what number comes next?`;
                correctAnswer = target;
                explanation = `Diagonal down-right is like moving down (+10) and then right (+1).<br/>${startNum} + 10 + 1 = ${startNum} + 11 = ${correctAnswer}.`;
            } else {
                // Pattern Completion
                startNum = randomInt(10, 80);
                patternCells = [startNum, startNum + 10, startNum + 20];
                const missing = startNum + 30;
                if (missing > 100) {
                    // Go backwards
                    patternCells = [startNum, startNum - 10, startNum - 20];
                    correctAnswer = startNum - 30;
                    explanation = `The pattern is moving **up** (subtracting 10).<br/>${startNum - 20} - 10 = ${correctAnswer}.`;
                } else {
                    correctAnswer = missing;
                    explanation = `The pattern is moving **down** (adding 10).<br/>${startNum + 20} + 10 = ${correctAnswer}.`;
                }
                questionText = `Identify the pattern shown in blue. What number comes next?`;
            }
        } else { // Hard 
            // Logic Jumps. "Start at 5, go down 2 steps, go right 3 steps".
            const r = randomInt(1, 50);
            const verticalSteps = randomInt(1, 3);
            const horizontalSteps = randomInt(1, 3);

            const target = r + (verticalSteps * 10) + horizontalSteps;

            // Visualization: Highlight path? No, highlight Start only.
            patternCells = [r];
            questionText = `Start at **${r}**. Jump **${verticalSteps} steps down** and **${horizontalSteps} steps right**. Where do you land?`;
            correctAnswer = target;

            explanation = `Start: ${r}<br/>${verticalSteps} steps down = +${verticalSteps * 10} (${r + verticalSteps * 10})<br/>${horizontalSteps} steps right = +${horizontalSteps}<br/>Total: ${r} + ${verticalSteps * 10} + ${horizontalSteps} = ${target}`;
        }

        // Generate Options
        const correctVal = parseInt(correctAnswer);
        const distractors = new Set([correctVal]);

        while (distractors.size < 4) {
            let d = correctVal + randomInt(-15, 15);
            if (d > 0 && d <= 100 && d !== correctVal) distractors.add(d);
        }

        return {
            id: index,
            text: questionText,
            correctAnswer: correctVal.toString(),
            solution: explanation,
            patternCells: patternCells,
            shuffledOptions: Array.from(distractors).sort(() => Math.random() - 0.5).map(String)
        };
    };

    const handleAnswer = (val) => {
        if (isSubmitted) return;
        setSelectedOption(val);
    };

    const handleSubmit = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage("Spot on! 🐯");
        } else {
            setShowExplanationModal(true);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        // ... logging code ...
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;

        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: 'Medium',
            question_text: String(currentQuestion.text),
            correct_answer: String(currentQuestion.correctAnswer),
            student_answer: String(selectedOption),
            is_correct: isRight,
            solution_text: String(currentQuestion.solution),
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

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page results-view overflow-y-auto">
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back</button>
                    <div className="title-area"><h1 className="results-title">Pattern Master!</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <h2 className="text-4xl font-black text-[#31326F] mb-6">Score: {score}/{TOTAL_QUESTIONS}</h2>
                    <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl" onClick={() => window.location.reload()}>Practice Again</button>
                </main>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    // Grid Rendering
    const Grid100 = () => {
        return (
            <div className="grid grid-cols-10 gap-1 md:gap-2 p-4 bg-white rounded-3xl border-4 border-blue-100 shadow-inner mx-auto max-w-md md:max-w-lg aspect-square">
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => {
                    const isHighlighted = highlightedCells.includes(num);
                    const isAnswer = isSubmitted && num === parseInt(currentQuestion.correctAnswer);

                    let bgClass = "bg-gray-50 text-gray-400"; // default faded

                    // Logic to show "relevant" area or full grid?
                    // Let's show full grid but dim everything except relevant 10x10 block?
                    // Simpler: Show full grid clearly.
                    bgClass = "bg-white text-[#31326F] border border-gray-100";

                    if (isHighlighted) bgClass = "bg-blue-500 text-white font-black scale-110 shadow-lg z-10";
                    if (isAnswer) bgClass = isCorrect ? "bg-green-500 text-white font-black animate-pulse" : "bg-red-400 text-white font-black";

                    return (
                        <div key={num} className={`
                            flex items-center justify-center rounded-lg text-xs md:text-sm lg:text-base transition-all
                            ${bgClass}
                        `}>
                            {num}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif', background: '#F0F4F8' }}>
            <header className="junior-practice-header">
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">
                    Q {qIndex + 1} / {TOTAL_QUESTIONS}
                </div>
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">
                    {formatTime(timeElapsed)}
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ height: 'calc(100vh - 180px)', overflow: 'hidden' }}>
                <div className="flex flex-col md:flex-row h-full max-w-7xl mx-auto gap-4 p-4">
                    {/* Left: Grid */}
                    <div className="flex-1 flex items-center justify-center overflow-auto">
                        <Grid100 />
                    </div>

                    {/* Right: Question & Input */}
                    <div className="flex-1 flex flex-col justify-center bg-white rounded-[2rem] p-8 shadow-xl overflow-y-auto">
                        <h2 className="text-2xl font-black text-[#31326F] mb-6">
                            <LatexContent html={currentQuestion.text} />
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {shuffledOptions.map((opt, i) => (
                                <button
                                    key={i}
                                    disabled={isSubmitted}
                                    onClick={() => handleAnswer(opt)}
                                    className={`
                                         p-6 rounded-2xl text-2xl font-bold transition-all border-4
                                         ${selectedOption === opt
                                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                                            : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200'}
                                         ${isSubmitted && opt === currentQuestion.correctAnswer ? '!border-green-500 !bg-green-100 !text-green-700' : ''}
                                         ${isSubmitted && selectedOption === opt && !isCorrect ? '!border-red-500 !bg-red-100 !text-red-700' : ''}
                                     `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {isSubmitted && (
                            <div className={`text-center font-bold text-xl mb-4 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                {isCorrect ? feedbackMessage : "Needs more practice!"}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="text-gray-500 font-bold hover:text-red-500" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-right">
                        <div className="flex gap-2">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft /> Prev</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight /></button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={!selectedOption}>Submit <Check /></button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Mobile footer reuse existing patterns */}
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}>Prev</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>Next</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={!selectedOption}>Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdditionChartPatterns;
