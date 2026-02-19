import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Trophy, Smile, Star, Apple, Book, Circle, Heart, Cloud, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Outstanding! Chart Champion! ✨",
    "🌟 Brilliant! You read that perfectly! 🌟",
    "🎉 Correct! Pictograph Pro! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You know your data! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const ICONS = [
    { component: Smile, name: "Smiley Face", color: "#FBBF24" },
    { component: Star, name: "Star", color: "#F59E0B" },
    { component: Apple, name: "Apple", color: "#EF4444" },
    { component: Book, name: "Book", color: "#3B82F6" },
    { component: Heart, name: "Heart", color: "#EC4899" },
    { component: Cloud, name: "Cloud", color: "#60A5FA" },
    { component: Sun, name: "Sun", color: "#F59E0B" }
];

const Pictographs = () => {
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
    const SKILL_ID = 1063; // Placeholder ID for Pictographs
    const SKILL_NAME = "Pictographs";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});
    const [usedQuestions, setUsedQuestions] = useState(new Set());

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
        const scaleOptions = [1, 2, 5, 10, 100];
        const scale = scaleOptions[randomInt(0, scaleOptions.length - 1)];
        const iconData = ICONS[randomInt(0, ICONS.length - 1)];
        const IconComponent = iconData.component;

        // Generate Data Set
        const categories = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const data = {};
        const minCount = 1;
        const maxCount = 8;

        // Ensure at least one distinct max/min for comparison questions
        categories.forEach(day => {
            data[day] = randomInt(minCount, maxCount);
        });

        // Question Types
        const types = ["read_value", "compare_most", "compare_least", "calculate_total", "reverse_logic"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";

        // Render Scale Key
        const keyHtml = `
            <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #fef3c7; border-radius: 8px; margin-bottom: 15px; width: fit-content;">
                <span style="font-weight: bold; color: #d97706;">Key:</span>
                <span style="display: flex; align-items: center;">
                    1 <span class="w-6 h-6 inline-block mx-1" style="color: ${iconData.color};">📍</span> = ${scale} items
                </span>
            </div>
        `;
        // Note: We can't render the React component directly in the HTML string for LatexContent.
        // We will render the table using HTML/CSS and simple shapes or emojis if possible, 
        // OR we can rely on the fact that we can overlay JSX.
        // However, given the current structure of `LatexContent` usually taking HTML strings,
        // we will generate a visual rep using simple repeated HTML characters/emojis that look like the icon.
        // Let's use a generic symbol in text or Unicode if possible, but Lucide icons are better.
        // Since we can't easily inject React components into the string passed to LatexContent,
        // We will construct the visual table OUTSIDE the LatexContent string if we were rewriting the renderer,
        // but here we must put it IN the string. 
        // Strategy: Use an emoji that closely matches or a generic shape for the HTML string representation.
        // For the Key above I used a placeholder. Let's make it better.

        // Actually, we can just use 1 icon = 1 star emoji etc.
        const emojiMap = {
            "Smiley Face": "😊",
            "Star": "⭐",
            "Apple": "🍎",
            "Book": "📘",
            "Heart": "❤️",
            "Cloud": "☁️",
            "Sun": "☀️"
        };
        const symbol = emojiMap[iconData.name] || "🟦";

        const displayKey = `
            <div style="border: 2px solid #e5e7eb; border-radius: 12px; padding: 12px; background: white; margin-bottom: 16px;">
                 <div style="font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px;">Key:</div>
                 <div style="display: flex; align-items: center; gap: 8px; font-size: 1.1em;">
                    ${symbol} = ${scale} ${iconData.name}s
                 </div>
            </div>
        `;

        const renderTableRows = () => {
            return categories.map(cat => {
                const count = data[cat];
                let iconsHtml = "";
                for (let i = 0; i < count; i++) {
                    iconsHtml += `<span style="font-size: 1.5em; margin-right: 2px;">${symbol}</span>`;
                }
                return `
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600; width: 30%;">${cat}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${iconsHtml}</td>
                    </tr>
                `;
            }).join("");
        };

        const chartHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f3f4f6;">
                        <th style="text-align: left; padding: 8px; border-radius: 8px 0 0 8px;">Day</th>
                        <th style="text-align: left; padding: 8px; border-radius: 0 8px 8px 0;">Number of ${iconData.name}s</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderTableRows()}
                </tbody>
            </table>
        `;

        const tableAndKey = displayKey + chartHtml;

        if (type === "read_value") {
            const targetDay = categories[randomInt(0, categories.length - 1)];
            const iconCount = data[targetDay];
            const actualValue = iconCount * scale;

            qText = `
                <div class='question-container'>
                    ${tableAndKey}
                    <p>How many ${iconData.name}s were collected on <strong>${targetDay}</strong>?</p>
                </div>
            `;
            correct = actualValue.toString();
            explanation = `On ${targetDay}, there are <strong>${iconCount}</strong> symbols.<br/>Each symbol = ${scale} units.<br/>Total = ${iconCount} × ${scale} = <strong>${actualValue}</strong>.`;

            options = [
                actualValue.toString(),
                (actualValue + scale).toString(),
                (actualValue - scale > 0 ? actualValue - scale : actualValue + (2 * scale)).toString(),
                (iconCount).toString() // Trap answer: just the count of symbols
            ];

        } else if (type === "compare_most") {
            const maxVal = Math.max(...Object.values(data));
            const winners = categories.filter(c => data[c] === maxVal);
            const winner = winners[0]; // Simplified for single correct

            qText = `
                <div class='question-container'>
                    ${tableAndKey}
                    <p>On which day were the <strong>most</strong> ${iconData.name}s collected?</p>
                </div>
            `;
            correct = winner;
            explanation = `Look for the row with the most symbols.<br/><strong>${winner}</strong> has the most (${maxVal} symbols = ${maxVal * scale}).`;
            options = [winner, ...categories.filter(c => c !== winner)].slice(0, 4);

        } else if (type === "compare_least") {
            const minVal = Math.min(...Object.values(data));
            const winners = categories.filter(c => data[c] === minVal);
            const winner = winners[0];

            qText = `
                <div class='question-container'>
                    ${tableAndKey}
                    <p>On which day were the <strong>least</strong> ${iconData.name}s collected?</p>
                </div>
            `;
            correct = winner;
            explanation = `Look for the row with the fewest symbols.<br/><strong>${winner}</strong> has the fewest (${minVal} symbols = ${minVal * scale}).`;
            options = [winner, ...categories.filter(c => c !== winner)].slice(0, 4);

        } else if (type === "calculate_total") {
            const totalSymbols = Object.values(data).reduce((a, b) => a + b, 0);
            const totalValue = totalSymbols * scale;

            qText = `
                <div class='question-container'>
                    ${tableAndKey}
                    <p>What is the <strong>total</strong> number of ${iconData.name}s collected over all 5 days?</p>
                </div>
            `;
            correct = totalValue.toString();
            explanation = `Count all the symbols in the chart: <strong>${totalSymbols}</strong>.<br/>Multiply by the key value (${scale}): ${totalSymbols} × ${scale} = <strong>${totalValue}</strong>.`;
            options = [
                totalValue.toString(),
                (totalValue + scale).toString(),
                (totalValue - scale).toString(),
                totalSymbols.toString() // Trap
            ];

        } else if (type === "reverse_logic") {
            // "If we had X items, how many symbols?"
            const testVal = randomInt(2, 6) * scale;
            const symbolsNeeded = testVal / scale;

            qText = `
                <div class='question-container'>
                    <div style="margin-bottom:15px; font-weight:bold;">${displayKey}</div>
                    <p>If a student collected <strong>${testVal}</strong> ${iconData.name}s, how many symbols would be drawn?</p>
                </div>
            `;
            correct = symbolsNeeded.toString();
            explanation = `Total items = ${testVal}. Key = ${scale}.<br/>Symbols needed = ${testVal} ÷ ${scale} = <strong>${symbolsNeeded}</strong>.`;
            options = [
                symbolsNeeded.toString(),
                (symbolsNeeded + 1).toString(),
                (symbolsNeeded * 2).toString(),
                testVal.toString()
            ];
        }

        uniqueId = `picto_${Date.now()}_${index}`;

        // Shuffle & Ensure Unique Options
        let uniqueOpts = [...new Set(options)];
        while (uniqueOpts.length < 4) {
            let r = randomInt(1, 100) * scale;
            if (!uniqueOpts.includes(r.toString())) uniqueOpts.push(r.toString());
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
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">Data Handling: Pictographs</span>
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

export default Pictographs;
