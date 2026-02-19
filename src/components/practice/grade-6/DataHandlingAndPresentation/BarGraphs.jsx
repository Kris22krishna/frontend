import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Outstanding! Chart Champion! ✨",
    "🌟 Brilliant! You read that perfectly! 🌟",
    "🎉 Correct! Graph Genius! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You know your data! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const BarGraphs = () => {
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
    const SKILL_ID = 1064; // Placeholder ID for Bar Graphs
    const SKILL_NAME = "Bar Graphs";

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
        // Difficulty Logic (Cycling through Easy, Medium, Hard)
        // 0-3: Easy, 4-6: Medium, 7-9: Hard
        let difficulty = 'easy';
        if (index >= 4 && index <= 6) difficulty = 'medium';
        if (index >= 7) difficulty = 'hard';

        // Choose Scale based on difficulty
        const easyScales = [1, 2, 5, 10];
        const mediumScales = [10, 20, 50, 100];
        const hardScales = [25, 50, 100, 200, 500];

        let scaleOptions = easyScales;
        if (difficulty === 'medium') scaleOptions = mediumScales;
        if (difficulty === 'hard') scaleOptions = hardScales;

        const scale = scaleOptions[randomInt(0, scaleOptions.length - 1)];

        // Generate Data Set
        const categories = ["Team A", "Team B", "Team C", "Team D", "Team E"];
        // Or create different category sets for variety
        const categorySets = [
            ["Mon", "Tue", "Wed", "Thu", "Fri"],
            ["Apple", "Banana", "Orange", "Grapes", "Mango"],
            ["Red", "Blue", "Green", "Yellow", "Purple"],
            ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
            ["Math", "Science", "English", "History", "Art"]
        ];
        const selectedCategories = categorySets[randomInt(0, categorySets.length - 1)];

        const data = {};
        const minVal = 1;
        const maxVal = difficulty === 'easy' ? 10 : (difficulty === 'medium' ? 15 : 20);

        // Ensure distinct max/min for clarity in those questions
        selectedCategories.forEach(cat => {
            data[cat] = randomInt(minVal, maxVal) * scale;
        });

        const maxValueInData = Math.max(...Object.values(data));

        // Question Types
        const types = ["read_value", "compare_most", "compare_least", "calculate_total", "difference", "scale_reading"];
        // Prioritize certain types for difficulties
        let applicableTypes = types;
        if (difficulty === 'easy') applicableTypes = ["read_value", "compare_most", "compare_least"];
        if (difficulty === 'medium') applicableTypes = ["calculate_total", "difference", "scale_reading"];
        if (difficulty === 'hard') applicableTypes = ["calculate_total", "difference", "scale_reading"]; // More complex numbers

        const type = applicableTypes[randomInt(0, applicableTypes.length - 1)];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];

        // Build HTML for Bar Graph
        // We utilize Flexbox/Grid to render bars.
        // Container height based on max value to normalize heights.
        // We'll use CSS percent height: (value / (maxValueInData + padding)) * 100
        const chartMax = Math.ceil(maxValueInData / scale) * scale + scale; // Add some headroom

        const barsHtml = selectedCategories.map(cat => {
            const val = data[cat];
            const heightPercent = (val / chartMax) * 100;
            const barColor = "#3B82F6"; // Blue bars

            return `
                <div style="display: flex; flex-direction: column; align-items: center; height: 100%; flex: 1; margin: 0 4px;">
                    <div style="width: 100%; height: 100%; display: flex; align-items: flex-end; justify-content: center; position: relative;">
                        <div style="width: 80%; height: ${heightPercent}%; background-color: ${barColor}; border-radius: 4px 4px 0 0; transition: height 0.5s ease; position: relative; min-height: 2px;">
                             ${difficulty === 'easy' ? `<span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.8em; font-weight: bold; color: #374151;">${val}</span>` : ''} 
                        </div>
                    </div>
                    <div style="margin-top: 8px; font-weight: 600; font-size: 0.9em; transform: rotate(-45deg); transform-origin: top left; white-space: nowrap; text-align: right; width: 100%; padding-right: 5px;">${cat}</div>
                </div>
            `;
        }).join("");

        // Y-Axis Markers (Grid lines)
        const gridLinesCount = 5;
        const gridStep = chartMax / gridLinesCount;
        let gridLinesHtml = "";
        for (let i = gridLinesCount; i >= 0; i--) {
            const val = Math.round(i * gridStep);
            // Avoid decimals if possible for clean look, though logic handles integers mostly
            gridLinesHtml += `
                <div style="position: absolute; left: 0; right: 0; bottom: ${(i / gridLinesCount) * 100}%; border-top: 1px dashed #e5e7eb; height: 1px; display: flex; align-items: center;">
                    <span style="position: absolute; left: -35px; font-size: 0.8em; color: #6b7280; width: 30px; text-align: right;">${val}</span>
                </div>
            `;
        }

        const chartHtml = `
            <div style="padding: 20px 40px 60px 50px; background: white; border-radius: 12px; border: 2px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin-bottom: 24px; max-width: 600px; width: 100%; align-self: center;">
                 <h4 style="text-align: center; margin-bottom: 10px; color: #374151;">Data Chart</h4>
                 <div style="position: relative; height: 250px; display: flex; margin-left: 10px;">
                    ${gridLinesHtml}
                    <div style="display: flex; width: 100%; height: 100%; align-items: flex-end; padding-left: 5px; z-index: 10;">
                        ${barsHtml}
                    </div>
                 </div>
                 <div style="text-align: center; margin-top: 20px; font-weight: bold;">Categories</div>
            </div>
        `;

        if (type === "read_value") {
            const targetCat = selectedCategories[randomInt(0, selectedCategories.length - 1)];
            const answerVal = data[targetCat];
            qText = `
                <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                   ${chartHtml}
                   <p style="text-align: center;">What is the value for <strong>${targetCat}</strong>?</p>
                </div>
            `;
            correct = answerVal.toString();
            explanation = `Look at the bar for <strong>${targetCat}</strong>. Its height reaches the line for <strong>${answerVal}</strong>.`;

            options = [
                answerVal.toString(),
                (answerVal + scale).toString(),
                (answerVal - scale > 0 ? answerVal - scale : answerVal + 2 * scale).toString(),
                (answerVal + Math.ceil(scale / 2)).toString() // Misread grid line
            ];

        } else if (type === "compare_most") {
            const maxVal = Math.max(...Object.values(data));
            const winners = selectedCategories.filter(c => data[c] === maxVal);
            const winner = winners[0];

            qText = `
                <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                    ${chartHtml}
                    <p style="text-align: center;">Which category has the <strong>highest</strong> value?</p>
                </div>
            `;
            correct = winner;
            explanation = `Look for the tallest bar. <strong>${winner}</strong> is the tallest with ${maxVal}.`;
            options = [winner, ...selectedCategories.filter(c => c !== winner)].slice(0, 4);

        } else if (type === "compare_least") {
            const min = Math.min(...Object.values(data));
            const winners = selectedCategories.filter(c => data[c] === min);
            const winner = winners[0];

            qText = `
                <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                    ${chartHtml}
                    <p style="text-align: center;">Which category has the <strong>lowest</strong> value?</p>
                </div>
            `;
            correct = winner;
            explanation = `Look for the shortest bar. <strong>${winner}</strong> is the shortest with ${min}.`;
            options = [winner, ...selectedCategories.filter(c => c !== winner)].slice(0, 4);

        } else if (type === "calculate_total") {
            // Pick 2-3 random categories or total all
            const mode = randomInt(0, 1) === 0 ? "subset" : "all";

            if (mode === "all") {
                const total = Object.values(data).reduce((a, b) => a + b, 0);
                qText = `
                    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                        ${chartHtml}
                        <p style="text-align: center;">What is the <strong>total</strong> value of all categories combined?</p>
                    </div>
                `;
                correct = total.toString();
                explanation = `Add the values of all bars: ${Object.values(data).join(" + ")} = <strong>${total}</strong>.`;
                options = [total.toString(), (total + scale).toString(), (total - scale).toString(), (total + 2 * scale).toString()];
            } else {
                const subset = selectedCategories.sort(() => 0.5 - Math.random()).slice(0, 2);
                const subTotal = data[subset[0]] + data[subset[1]];
                qText = `
                    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                        ${chartHtml}
                        <p style="text-align: center;">What is the total of <strong>${subset[0]}</strong> and <strong>${subset[1]}</strong>?</p>
                    </div>
                `;
                correct = subTotal.toString();
                explanation = `${subset[0]} = ${data[subset[0]]}, ${subset[1]} = ${data[subset[1]]}.<br/>Total = ${data[subset[0]]} + ${data[subset[1]]} = <strong>${subTotal}</strong>.`;
                options = [
                    subTotal.toString(),
                    (subTotal + scale).toString(),
                    Math.abs(data[subset[0]] - data[subset[1]]).toString(), // Difference Trap
                    (subTotal + 10).toString()
                ];
            }

        } else if (type === "difference") {
            // Compare two categories
            const subset = selectedCategories.sort(() => 0.5 - Math.random()).slice(0, 2);
            const val1 = data[subset[0]];
            const val2 = data[subset[1]];
            const diff = Math.abs(val1 - val2);

            qText = `
                <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                    ${chartHtml}
                    <p style="text-align: center;">How much <strong>more</strong> (or less) is <strong>${subset[0]}</strong> compared to <strong>${subset[1]}</strong>?</p>
                </div>
            `;
            correct = diff.toString();
            explanation = `${subset[0]} = ${val1}, ${subset[1]} = ${val2}.<br/>Difference = |${val1} - ${val2}| = <strong>${diff}</strong>.`;
            options = [
                diff.toString(),
                (val1 + val2).toString(), // Sum Trap
                (diff + scale).toString(),
                (diff === 0 ? scale : 0).toString()
            ];

        } else if (type === "scale_reading") {
            // Implicitly ask 1 unit = ?
            qText = `
                <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                    ${chartHtml}
                    <p style="text-align: center;">Based on the y-axis, <strong>1 major grid unit</strong> represents how much?</p>
                </div>
            `;
            // Calculate grid step from chart visualization logic
            // In our chart code: gridStep is roughly chartMax / 5.
            // But we rendered specific grid lines. Let's look at the labels.
            // Labels are 0, gridStep, 2*gridStep...
            // So 1 unit = gridStep (approx). 
            // Better: ask "What is the interval between two grid lines?"
            const interval = Math.round(gridStep);

            qText = `
                <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                    ${chartHtml}
                    <p style="text-align: center;">What is the interval (gap) between two consecutive grid lines on the vertical axis?</p>
                </div>
            `;
            correct = interval.toString();
            explanation = `Look at the axis labels: 0, ${Math.round(gridStep)}, ${Math.round(2 * gridStep)}...<br/>The difference is <strong>${interval}</strong>.`;

            options = [
                interval.toString(),
                (interval / 2).toString(),
                (interval * 2).toString(),
                (interval + 5).toString()
            ];
        }

        // Shuffle & Ensure Unique Options
        let uniqueOpts = [...new Set(options)];
        while (uniqueOpts.length < 4) {
            // Fill with plausible distractors
            const base = parseInt(correct) || randomInt(10, 100);
            const r = randomInt(Math.max(0, base - 50), base + 50);
            if (!uniqueOpts.includes(r.toString()) && r.toString() !== correct) uniqueOpts.push(r.toString());
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
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">Data Handling: Bar Graphs</span>
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

export default BarGraphs;
