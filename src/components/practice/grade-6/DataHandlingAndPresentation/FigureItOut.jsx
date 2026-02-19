import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Trophy, Brain, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing! You figured it out! ✨",
    "🌟 Brilliant deduction! 🌟",
    "🎉 Correct! Sharp thinking! 🎉",
    "✨ Fantastic logic! ✨",
    "🚀 Super! Math Detective! 🚀",
    "🌈 Perfect! Well analyzed! 🌈",
    "🎊 Great job! Problem solved! 🎊",
    "💎 Spot on! Genius! 💎"
];

const FigureItOut = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [history, setHistory] = useState({});
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
    const SKILL_ID = 1066; // Placeholder ID
    const SKILL_NAME = "Figure It Out";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

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
        if (history[qIndex]) {
            const data = history[qIndex];
            setCurrentQuestion(data.question);
            setShuffledOptions(data.options);
            setSelectedOption(data.selectedOption);
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else if (!answers[qIndex]) {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        const types = ["missing_value", "logic_ratio", "tally_error", "scale_change"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];

        if (type === "missing_value") {
            // Table with one missing value, total given
            const items = ["Books", "Pens", "Pencils", "Erasers"];
            const data = items.map(() => randomInt(5, 20) * 5);
            const total = data.reduce((a, b) => a + b, 0);

            // Hide one
            const missingIdx = randomInt(0, 3);
            const missingVal = data[missingIdx];
            const visibleTotal = total - missingVal;

            let tableRows = items.map((item, i) => {
                const val = i === missingIdx ? "<strong style='color:#e11d48; font-size:1.2em;'>?</strong>" : data[i];
                return `
                    <tr style="background: ${i % 2 === 0 ? '#f9fafb' : 'white'};">
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight:bold;">${val}</td>
                    </tr>
                `;
            }).join("");

            qText = `
                <div style="width:100%; display:flex; flex-direction:column; align-items:center;">
                    <p>The <strong>Total</strong> number of items is <strong>${total}</strong>.</p>
                    <table style="width: 100%; max-width: 400px; border-collapse: collapse; margin-bottom: 15px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                        <thead>
                             <tr style="background: #e0f2fe;">
                                <th style="text-align: left; padding: 10px;">Item</th>
                                <th style="text-align: left; padding: 10px;">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                    <p>Find the missing value (<strong>?</strong>).</p>
                </div>
            `;
            correct = missingVal.toString();
            explanation = `Total = ${total}.<br/>Sum of known items = ${visibleTotal}.<br/>Missing value = Total - Sum = ${total} - ${visibleTotal} = <strong>${missingVal}</strong>.`;

            options = [
                missingVal.toString(),
                (visibleTotal).toString(),
                (total).toString(),
                (missingVal + 10).toString()
            ];

        } else if (type === "logic_ratio") {
            // "Red cars are double Blue cars. Total 30."
            const factor = randomInt(2, 4);
            const base = randomInt(5, 15);
            const larger = base * factor;
            const total = base + larger;
            const item1 = "Blue Cars";
            const item2 = "Red Cars";

            qText = `
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px; font-size: 3rem;">🚗</div>
                    <p>In a parking lot, the number of <strong>${item2}</strong> is <strong>${factor} times</strong> the number of <strong>${item1}</strong>.</p>
                    <p>The <strong>total</strong> number of cars is <strong>${total}</strong>.</p>
                    <p>How many <strong>${item2}</strong> are there?</p>
                </div>
            `;

            correct = larger.toString();
            explanation = `Let ${item1} = x.<br/>Then ${item2} = ${factor}x.<br/>Total = x + ${factor}x = ${(factor + 1)}x = ${total}.<br/>So, x = ${base}.<br/>${item2} = ${factor} × ${base} = <strong>${larger}</strong>.`;

            options = [
                larger.toString(),
                base.toString(),
                total.toString(),
                Math.abs(larger - base).toString()
            ];

        } else if (type === "tally_error") {
            // Show tally marks and a number. Ask if correct or identify true count.
            const trueCount = randomInt(6, 14);
            const shownCount = trueCount + randomInt(1, 4) * (Math.random() > 0.5 ? 1 : -1); // Wrong number

            let tallyHtml = "";
            let remaining = trueCount;
            while (remaining >= 5) {
                tallyHtml += `<span style="font-size:1.5em; margin-right:5px; letter-spacing: -2px;">||||<span style="text-decoration: line-through; margin-left: -12px; color: #ef4444;">&nbsp;&nbsp;</span></span>`;
                remaining -= 5;
            }
            if (remaining > 0) {
                tallyHtml += `<span style="font-size:1.5em; letter-spacing: 2px;">${'|'.repeat(remaining)}</span>`;
            }

            qText = `
                <div style="text-align: center;">
                    <p>A student counted votes and recorded them as tally marks:</p>
                    <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #e5e7eb; display: inline-block; margin: 10px 0;">
                        ${tallyHtml}
                    </div>
                    <p>The student wrote the frequency as <strong>${shownCount}</strong>.</p>
                    <p>Is this correct? If not, what is the correct frequency?</p>
                </div>
            `;
            correct = `No, it should be ${trueCount}`;
            explanation = `Count the tally marks carefully.<br/>Groups of 5 + Remaining.<br/>The correct count is <strong>${trueCount}</strong>, not ${shownCount}.`;

            options = [
                `No, it should be ${trueCount}`,
                `Yes, it is ${shownCount}`,
                `No, it should be ${trueCount + 5}`,
                `No, it should be ${Math.abs(trueCount - shownCount)}`
            ];

        } else if (type === "scale_change") {
            // Bars change height if scale changes
            const val = 100;
            const oldScale = 10;
            const newScale = 20;
            const oldHeight = val / oldScale;
            const newHeight = val / newScale;

            qText = `
                <div style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 10px;">📏</div>
                    <p>A bar representing the value <strong>${val}</strong> is <strong>${oldHeight} units</strong> tall when the scale is <strong>1 unit = ${oldScale}</strong>.</p>
                    <p>If we change the scale to <strong>1 unit = ${newScale}</strong>, what will be the new height of the bar?</p>
                </div>
            `;
            correct = `${newHeight} units`;
            explanation = `Value = ${val}. New Scale = ${newScale}.<br/>New Height = ${val} ÷ ${newScale} = <strong>${newHeight} units</strong>.<br/>(The bar gets shorter because each unit represents more).`;

            options = [
                `${newHeight} units`,
                `${oldHeight} units`,
                `${oldHeight * 2} units`,
                `${newHeight + 5} units`
            ];
        }

        // Shuffle & Ensure Unique Options
        let uniqueOpts = [...new Set(options)];
        while (uniqueOpts.length < 4) {
            uniqueOpts.push("Answer " + randomInt(1, 100)); // Fallback
        }

        // Ensure string logic doesn't duplicate
        if (type === 'tally_error') {
            // Options are strings, set works fine
        } else {
            // Re-filter just in case
            uniqueOpts = [...new Set(options)];
        }

        const shuffled = uniqueOpts.slice(0, 4).sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);

        const newQuestion = {
            text: qText,
            correctAnswer: correct,
            solution: explanation,
            type: 'mcq',
            options: shuffled
        };

        setCurrentQuestion(newQuestion);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
        questionStartTime.current = Date.now();

        setHistory(prev => ({
            ...prev,
            [index]: {
                question: newQuestion,
                options: shuffled,
                selectedOption: null,
                isSubmitted: false,
                isCorrect: false,
                feedbackMessage: ""
            }
        }));
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
                difficulty_level: 'Hard',
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
        if (!selectedOption) return;

        const isRight = selectedOption === currentQuestion.correctAnswer;

        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        const feedbackMsg = isRight ? CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)] : "";

        if (isRight) {
            setFeedbackMessage(feedbackMsg);
        } else {
            setShowExplanationModal(true);
        }

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                selectedOption: selectedOption,
                isSubmitted: true,
                isCorrect: isRight,
                feedbackMessage: feedbackMsg
            }
        }));

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
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
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">Data Handling: Figure It Out</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-x l shadow-lg whitespace-nowrap">
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
                                        <h2 className="question-text-modern" style={{ fontSize: '1.2rem', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', width: '100%', overflowX: 'auto', marginBottom: '1.5rem' }}>
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
                            <button
                                className="nav-pill-next-btn"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: '10px', backgroundColor: '#eef2ff', color: '#31326F' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} /> Prev
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={!selectedOption}
                                >
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
                            <button
                                className="nav-pill-next-btn"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{
                                    opacity: qIndex === 0 ? 0.5 : 1,
                                    padding: '8px 12px',
                                    marginRight: '8px',
                                    backgroundColor: '#eef2ff',
                                    color: '#31326F',
                                    minWidth: 'auto'
                                }}
                            >
                                <ChevronLeft size={20} strokeWidth={3} />
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={!selectedOption}
                                >
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

export default FigureItOut;
