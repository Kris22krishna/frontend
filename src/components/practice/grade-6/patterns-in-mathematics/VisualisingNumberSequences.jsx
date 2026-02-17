import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing job! You found the pattern! ✨",
    "🌟 Brilliant! You're visualizing it perfectly! 🌟",
    "🎉 Correct! You're a sequence star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const VisualisingNumberSequences = () => {
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

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 6201;
    const SKILL_NAME = "Pattern in Mathematics - Visualising Sequences";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});
    const [usedQuestions, setUsedQuestions] = useState(new Set()); // To ensure distinct questions

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
    }, []);

    useEffect(() => {
        if (!answers[qIndex]) {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        const types = ["triangular_dots", "identify_square", "identify_cube", "next_in_visual", "match_pattern"];
        // Ensure rotation but variability
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";

        // Loop to ensure uniqueness
        let attempts = 0;
        do {
            attempts++;
            if (type === "triangular_dots") {
                const n = randomInt(3, 6);
                const count = (n * (n + 1)) / 2;
                correct = count.toString();

                let dotGrid = "";
                for (let r = 1; r <= n; r++) {
                    dotGrid += "• ".repeat(r) + "<br/>";
                }

                qText = `
                    <div class='question-container'>
                        <p>Look at this triangular pattern of dots:</p>
                        <div style="font-size: 24px; line-height: 1.2; color: #3b82f6; margin: 10px 0;">
                            ${dotGrid}
                        </div>
                        <p><strong>How many dots are in this figure?</strong></p>
                    </div>
                `;
                explanation = `This is a triangular number with base ${n}.<br/>Sum = $1 + 2 + ... + ${n} = ${count}$.`;
                options = [count.toString(), (count + 2).toString(), (count - 1).toString(), (count + n).toString()];
                uniqueId = `tri_${n}`;

            } else if (type === "identify_square") {
                qText = `
                    <div class='question-container'>
                        <p>Which of the following numbers is a <strong>Square Number</strong>? (Can be arranged as a perfect square of dots)</p>
                    </div>
                `;
                const roots = [3, 4, 5, 6, 7, 8, 9];
                const root = roots[Math.floor(Math.random() * roots.length)];
                correct = (root * root).toString();

                // Distractors: non-square numbers
                const d1 = (root * root) + randomInt(1, 3);
                const d2 = (root * root) - randomInt(1, 3);
                const d3 = (root * root) + 5;

                options = [correct, d1.toString(), d2.toString(), d3.toString()];
                explanation = `$${correct}$ is a square number because $${root} \\times ${root} = ${correct}$.`;
                uniqueId = `sq_${correct}`;

            } else if (type === "identify_cube") {
                qText = `
                    <div class='question-container'>
                        <p>Which of these numbers is a <strong>Cube Number</strong>? (Can be stacked as a cube blocks)</p>
                    </div>
                `;
                const roots = [2, 3, 4, 5];
                const root = roots[Math.floor(Math.random() * roots.length)];
                correct = (root * root * root).toString();

                // Distractors
                const d1 = (root * root * root) + randomInt(2, 5);
                const d2 = (root * root); // square but not cube mostly
                const d3 = (root * root * root) - randomInt(1, 3);

                options = [correct, d1.toString(), d2.toString(), d3.toString()];
                explanation = `$${correct}$ is a cube number because $${root} \\times ${root} \\times ${root} = ${correct}$.`;
                uniqueId = `cube_${correct}`;

            } else if (type === "next_in_visual") {
                // simple visual pattern: 1 dot, 3 dots, 5 dots...
                const start = randomInt(1, 3);
                const step = randomInt(1, 3); // 1, 2, 3
                const t1 = start;
                const t2 = start + step;
                const t3 = start + 2 * step;
                const next = start + 3 * step;

                correct = next.toString();
                qText = `
                    <div class='question-container'>
                        <p>Observe the number of dots in the sequence:</p>
                        <p>Figure 1: $${t1}$ dots</p>
                        <p>Figure 2: $${t2}$ dots</p>
                        <p>Figure 3: $${t3}$ dots</p>
                        <p><strong>How many dots will be in Figure 4?</strong></p>
                    </div>
                `;
                explanation = `The pattern adds $${step}$ dots each time.<br/>$${t3} + ${step} = ${next}$.`;
                options = [next.toString(), (next + 1).toString(), (next - 1).toString(), (next + 2).toString()];
                uniqueId = `next_vis_${start}_${step}`;

            } else {
                // match pattern
                // "1, 3, 6, 10..." -> Triangular
                const pType = Math.random() > 0.5 ? "triangular" : "square";
                if (pType === "triangular") {
                    qText = `
                        <div class='question-container'>
                            <p>Identify the name of this sequence:</p>
                            <p>$$1, 3, 6, 10, 15, \\dots$$</p>
                        </div>
                    `;
                    correct = "Triangular Numbers";
                    options = ["Triangular Numbers", "Square Numbers", "Odd Numbers", "Even Numbers"];
                    explanation = "These numbers can form triangles. $1, 1+2=3, 1+2+3=6$, etc.";
                    uniqueId = "match_tri";
                } else {
                    qText = `
                        <div class='question-container'>
                            <p>Identify the name of this sequence:</p>
                            <p>$$1, 4, 9, 16, 25, \\dots$$</p>
                        </div>
                    `;
                    correct = "Square Numbers";
                    options = ["Square Numbers", "Triangular Numbers", "Cube Numbers", "Prime Numbers"];
                    explanation = "These numbers are squares: $1^2, 2^2, 3^2, 4^2, 5^2$.";
                    uniqueId = "match_sq";
                }
            }

            // Fallback for infinite loop prevention
            if (attempts > 10) uniqueId = `force_${Date.now()}`;

        } while (usedQuestions.has(uniqueId));

        setUsedQuestions(prev => new Set(prev).add(uniqueId));

        // Shuffle options
        let uniqueOpts = [...new Set(options)];
        while (uniqueOpts.length < 4) {
            uniqueOpts.push((Math.floor(Math.random() * 100)).toString());
            uniqueOpts = [...new Set(uniqueOpts)];
        }

        setShuffledOptions([...uniqueOpts].sort(() => Math.random() - 0.5));
        setCurrentQuestion({
            text: qText,
            correctAnswer: correct,
            solution: explanation
        });
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
        questionStartTime.current = Date.now();
    };

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
                difficulty_level: 'Medium',
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

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) {
                await api.finishSession(sessionId).catch(console.error);
            }

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: TOTAL_QUESTIONS,
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

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">{SKILL_NAME.split(' - ')[1]}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
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
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => !isSubmitted && handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                    className={`p-4 rounded-xl border-2 text-lg font-bold transition-all transform hover:scale-102
                                                        ${isSubmitted
                                                            ? option === currentQuestion.correctAnswer
                                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                                : selectedOption === option
                                                                    ? 'bg-red-100 border-red-500 text-red-700'
                                                                    : 'bg-gray-50 border-gray-200 text-gray-400'
                                                            : selectedOption === option
                                                                ? 'bg-indigo-50 border-[#4FB7B3] text-[#31326F] shadow-md'
                                                                : 'bg-white border-gray-200 text-gray-600 hover:border-[#4FB7B3] hover:shadow-sm'
                                                        }
                                                    `}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="feedback-mini correct"
                                                style={{ marginTop: '20px' }}
                                            >
                                                {feedbackMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
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
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
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
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
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

export default VisualisingNumberSequences;
