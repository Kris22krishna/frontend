import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

// Utility for random integers
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const PatternsPractice = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);

    // Persistence State
    const [answers, setAnswers] = useState({});

    // Current Question State
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);

    const sessionId = useRef(null);
    const questionStartTime = useRef(Date.now());
    const TOTAL_QUESTIONS = 10;
    const SKILL_ID = 6100; // Assigning a temporary ID for Patterns

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Initialize Session
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) sessionId.current = sess.session_id;
            }).catch(err => console.error("Failed to start session", err));
        }
    }, []);

    // Generate Question based on Index (Deterministic Topic, Randomized Numbers)
    useEffect(() => {
        // If we already have an answer for this index, restore it
        if (answers[qIndex]) {
            const saved = answers[qIndex];
            setCurrentQuestion(saved.question);
            setSelectedOption(saved.selectedOption);
            setIsSubmitted(true);
            setIsCorrect(saved.isCorrect);
            setFeedbackMessage(saved.isCorrect ? "Encouraging message!" : "Detailed explanation available.");
            return;
        }

        // Otherwise generate new question
        const q = generateQuestionLogic(qIndex);
        setCurrentQuestion(q);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
        questionStartTime.current = Date.now();

        // Save generated question to history immediately
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                question: q,
                selectedOption: null,
                isCorrect: false
            }
        }));
    }, [qIndex]); // Removed answers from dependency to avoid loop/unnecessary re-runs, logical since we only want this on qIndex change

    // Modal Control - decoupled from answer state
    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    const generateQuestionLogic = (index) => {
        // Textbook Alignment: Intro -> Basic -> Application

        let qText = "";
        let correct = "";
        let options = [];
        let explanation = "";

        if (index === 0) {
            // Q1: Introduction - Simple Arithmetic Sequence (Addition)
            const start = randInt(1, 10);
            const diff = randInt(2, 5);
            const term1 = start;
            const term2 = start + diff;
            const term3 = start + 2 * diff;
            const nextTerm = start + 3 * diff;

            qText = `Find the next number in the pattern: $${term1}, ${term2}, ${term3}, \\dots$`;
            correct = `${nextTerm}`;
            options = [
                `${nextTerm}`,
                `${nextTerm + 1}`,
                `${nextTerm - 1}`,
                `${nextTerm + 2}`
            ].sort(() => Math.random() - 0.5);
            explanation = `The pattern adds $${diff}$ to each number. <br/> $${term3} + ${diff} = ${nextTerm}$.`;

        } else if (index === 1) {
            // Q2: Basic - Simple Arithmetic Sequence (Subtraction)
            const start = randInt(50, 100);
            const diff = randInt(2, 5);
            const term1 = start;
            const term2 = start - diff;
            const term3 = start - 2 * diff;
            const nextTerm = start - 3 * diff;

            qText = `Find the next number: $${term1}, ${term2}, ${term3}, \\dots$`;
            correct = `${nextTerm}`;
            options = [
                `${nextTerm}`,
                `${nextTerm - 2}`,
                `${nextTerm + 2}`,
                `${nextTerm + 5}`
            ].sort(() => Math.random() - 0.5);
            explanation = `The pattern subtracts $${diff}$ from each number. <br/> $${term3} - ${diff} = ${nextTerm}$.`;

        } else if (index === 2) {
            // Q3: Concept - Matchstick Pattern Rule (Introduction to 'n')
            // 3n + 1 pattern (e.g. squares or triangles)
            // Let's use squares: 4, 7, 10... (3n + 1)
            const step = 3;
            const start = 4;

            qText = `A pattern of squares is made with matchsticks. The number of matchsticks follows the sequence: $4, 7, 10, 13, \\dots$. What is the rule for the number of matchsticks using $n$?`;
            correct = `$3n + 1$`;
            options = [
                `$3n + 1$`,
                `$3n$`,
                `$4n$`,
                `$4n - 1$`
            ].sort(() => Math.random() - 0.5);
            explanation = `The difference between terms is $3$. So the rule starts with $3n$. <br/> For $n=1$, $3(1) = 3$, but we need $4$. So we add $1$. <br/> Rule: $3n + 1$.`;

        } else if (index === 3) {
            // Q4: Application - Finding nth term
            const diff = randInt(2, 6);
            const constant = randInt(1, 5);
            // Rule: diff * n + constant

            const n = randInt(10, 20); // Find the 10th or 20th term
            const ans = diff * n + constant;

            qText = `If the rule for a pattern is $${diff}n + ${constant}$, what is the $${n}^{\\text{th}}$ term?`;
            correct = `${ans}`;
            options = [
                `${ans}`,
                `${ans + diff}`,
                `${ans - 1}`,
                `${diff * (n - 1) + constant}`
            ].sort(() => Math.random() - 0.5);
            explanation = `Substitute $n = ${n}$ into the rule: <br/> $${diff}(${n}) + ${constant} = ${diff * n} + ${constant} = ${ans}$.`;

        } else if (index === 4) {
            // Q5: Visual - Triangular Numbers or Square Numbers
            const isSquare = Math.random() > 0.5;
            if (isSquare) {
                qText = `Identify the 5th square number in the sequence: $1, 4, 9, 16, \\dots$`;
                correct = "25";
                options = ["20", "25", "36", "30"].sort(() => Math.random() - 0.5);
                explanation = `Square numbers are $n \\times n$. <br/> For the 5th number: $5 \\times 5 = 25$.`;
            } else {
                qText = `Identify the 5th triangular number in the sequence: $1, 3, 6, 10, \\dots$`;
                correct = "15";
                options = ["15", "12", "18", "21"].sort(() => Math.random() - 0.5);
                explanation = `Triangular numbers add the next counting number: $+2, +3, +4$. <br/> $10 + 5 = 15$.`;
            }

        } else {
            // Q6-10: Progressive Difficulty - Mixed & Applied
            const diff = randInt(3, 8);
            const start = randInt(10, 50);
            const missingIndex = randInt(1, 3); // 1 (2nd term), 2 (3rd term), etc.

            const terms = [];
            for (let i = 0; i < 5; i++) {
                terms.push(start + i * diff);
            }

            const displayTerms = [...terms];
            displayTerms[missingIndex] = "?";

            qText = `Find the missing term: $${displayTerms.join(', ')}$`;
            correct = `${terms[missingIndex]}`;
            options = [
                `${terms[missingIndex]}`,
                `${terms[missingIndex] + diff}`,
                `${terms[missingIndex] - 1}`,
                `${terms[missingIndex] + 2}`
            ].sort(() => Math.random() - 0.5);
            explanation = `The pattern is adding $${diff}$. <br/> $${terms[missingIndex - 1]} + ${diff} = ${terms[missingIndex]}$.`;
        }

        return {
            text: qText,
            correctAnswer: correct,
            explanation: explanation,
            options: options,
            type: "mcq"
        };
    };

    const handleCheck = async () => {
        if (!selectedOption) return;

        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);

        // Persistence
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                question: currentQuestion, // Save question to keep random numbers consistent on revisit
                selectedOption,
                isCorrect: isRight
            }
        }));

        if (!isRight) {
            setShowExplanationModal(true);
        }

        if (sessionId.current) {
            const timeTaken = (Date.now() - questionStartTime.current) / 1000;
            await api.recordAttempt({
                user_id: parseInt(sessionStorage.getItem('userId'), 10),
                session_id: sessionId.current,
                skill_id: SKILL_ID,
                question_text: currentQuestion.text,
                correct_answer: currentQuestion.correctAnswer,
                student_answer: selectedOption,
                is_correct: isRight,
                time_spent_seconds: Math.round(timeTaken)
            });
        }
    };

    const handleNext = () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
        } else {
            if (sessionId.current) api.finishSession(sessionId.current);
            navigate(-1);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    if (!currentQuestion) return <div className="p-8 text-center text-[#31326F]">Loading Patterns...</div>;

    return (
        <div className="min-h-screen bg-[#E0F2FE] flex flex-col font-sans text-[#31326F]">
            {/* Header */}
            <header className="px-6 py-4 flex justify-between items-center w-full relative">
                <div className="absolute left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-sm text-[#31326F] font-bold border border-indigo-50 z-10">
                    Question {qIndex + 1} / {TOTAL_QUESTIONS}
                </div>
                <div className="ml-auto bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-[#31326F] min-w-[60px] text-center">
                    {formatTime(timeElapsed)}
                </div>
            </header>

            {/* Main Card */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 w-full">
                <div className="bg-white rounded-[32px] shadow-sm w-full max-w-4xl p-12 flex flex-col items-center gap-12 min-h-[500px]">

                    <div className="w-full text-center">
                        <div className="text-2xl font-medium text-[#31326F] leading-relaxed">
                            <LatexContent html={currentQuestion.text} />
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => !isSubmitted && setSelectedOption(option)}
                                disabled={isSubmitted}
                                className={`
                                    w-full py-4 px-6 rounded-full text-xl font-medium transition-all border-2
                                    ${selectedOption === option
                                        ? 'bg-white border-[#3B82F6] text-[#31326F] shadow-md ring-1 ring-[#3B82F6]'
                                        : 'bg-white border-gray-200 text-[#31326F] hover:border-gray-300'
                                    }
                                    ${isSubmitted && option === currentQuestion.correctAnswer ? 'bg-green-50 border-green-500 text-green-700' : ''}
                                    ${isSubmitted && selectedOption === option && !isCorrect ? 'bg-red-50 border-red-500 text-red-700' : ''}
                                `}
                            >
                                <LatexContent html={option} />
                            </button>
                        ))}
                    </div>

                    {/* Feedback Mini-Section within card if needed, or rely on Modal */}
                    <AnimatePresence>
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`w-full p-6 rounded-2xl text-center border-2 mt-6 ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}
                            >
                                <p className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                    {isCorrect ? "Correct! 🎉" : "Not quite right"}
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => setShowExplanationModal(true)}
                                        className={`px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${isCorrect ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                                    >
                                        <Check size={16} /> View Explanation
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 rounded-full bg-red-50 text-red-500 font-bold hover:bg-red-100 transition-colors text-sm"
                    >
                        Exit Practice
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${qIndex === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#3B82F6] text-white hover:bg-blue-600 shadow-md'}`}
                        >
                            <ChevronLeft size={20} /> PREV
                        </button>

                        {!isSubmitted ? (
                            <button
                                onClick={handleCheck}
                                disabled={!selectedOption}
                                className="px-8 py-3 rounded-full bg-gray-200 text-gray-500 font-bold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                            >
                                SUBMIT <Check size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 flex items-center gap-2 transition-all"
                            >
                                {qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "FINISH"} <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ExplanationModal
                isOpen={showExplanationModal}
                onClose={() => setShowExplanationModal(false)}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.explanation}
            />
        </div>
    );
};

export default PatternsPractice;
