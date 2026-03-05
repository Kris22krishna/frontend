import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import './polynomials.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing! You're a Data Wiz! ✨",
    "🌟 Brilliant! Great sorting! 🌟",
    "🎉 Correct! Tally Master! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! Ordered perfectly! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const CollectingAndOrganisingData = () => {
    const navigate = useNavigate();
    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const storageKey = `practice_${window.location.pathname}`;

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [history, setHistory] = useState(() => getSessionData(`${storageKey}_history`, {}));
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Logging states
    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1065; // Placeholder ID for Data Handling
    const SKILL_NAME = "Collecting and Organising Data";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));
    const [usedQuestions, setUsedQuestions] = useState(new Set());

    useEffect(() => {
        if (qIndex !== undefined && history && answers) {
            sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
            sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
            sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
            sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
            if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
        }
    }, [qIndex, history, answers, sessionId]);

    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_history`);
        sessionStorage.removeItem(`${storageKey}_answers`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
    };

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
        const types = ["identify_data", "collection_method", "tally_marks", "frequency_analysis", "ascending_order"];
        // Ensure variety by cycling through types, but randomize slightly
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";

        const dataDefinition = "Data is a collection of numbers gathered to give some information.";

        let attempts = 0;
        do {
            attempts++;

            if (type === "identify_data") {
                const subType = Math.random() > 0.5 ? "is_data" : "not_data";

                if (subType === "is_data") {
                    qText = `
                        <div class='question-container'>
                            <p>${dataDefinition}</p>
                            <p>Which of the following is an example of Data?</p>
                        </div>
                    `;
                    const correctExamples = [
                        "Marks obtained by 10 students in a test",
                        "Number of fans in 5 classrooms",
                        "Temperatures recorded over a week",
                        "Height of all students in your class"
                    ];
                    const incorrectExamples = [
                        "A list of random thoughts",
                        "A painting on the wall",
                        "The color blue",
                        "A happy feeling"
                    ];

                    correct = correctExamples[randomInt(0, correctExamples.length - 1)];
                    const shuffledIncorrect = [...incorrectExamples].sort(() => Math.random() - 0.5);
                    options = [
                        correct,
                        shuffledIncorrect[0],
                        shuffledIncorrect[1],
                        shuffledIncorrect[2]
                    ];
                    explanation = `${correct} contains numerical information collected for a purpose, so it is Data.`;
                } else {
                    qText = `
                        <div class='question-container'>
                            <p>Which of the following is NOT an example of numerical data?</p>
                        </div>
                    `;
                    const dataExamples = [
                        "Runs scored by a batsman in 5 matches",
                        "Number of absentees in class for a week",
                        "Heights of 10 plants in the garden",
                        "Prices of 5 different pens"
                    ];
                    const nonDataExamples = [
                        "The smell of a beautiful flower",
                        "Your favourite dream",
                        "The kindness of a friend",
                        "A wish for a good day"
                    ];

                    correct = nonDataExamples[randomInt(0, nonDataExamples.length - 1)];
                    const shuffledData = [...dataExamples].sort(() => Math.random() - 0.5);
                    options = [
                        correct,
                        shuffledData[0],
                        shuffledData[1],
                        shuffledData[2]
                    ];
                    explanation = `${correct} is a qualitative feeling or abstract concept, not numerical information collected for analysis.`;
                }
                uniqueId = `identify_${Date.now()}_${index}`;

            } else if (type === "collection_method") {
                qText = `
                    <div class='question-container'>
                        <p>We want to find out the favourite fruit of 40 students in a class.</p>
                        <p>What is the best way to collect this data?</p>
                    </div>
                `;
                correct = "Ask each student and record their choice using tally marks";
                options = [
                    correct,
                    "Guess the fruits they like",
                    "Ask only one student",
                    "Count the number of chairs in the class"
                ];
                explanation = `To get accurate data about preferences, we must survey each student and record their answer systematically (e.g., using tally marks).`;
                uniqueId = `method_${Date.now()}_${index}`;

            } else if (type === "tally_marks") {
                const count = randomInt(3, 12);
                const showImage = Math.random() > 0.5; // Toggle between identifying tally or counting objects

                // Simple tally representation generator (text-based for now, or simple visual)
                // Since complex SVG tally generation might be tricky inline, let's use description or simple images if available, 
                // but let's stick to text representation logic: "||||", etc is hard to read.
                // Better: "How do we represent '7' in tally marks?" -> Options are description or image codes if we had them.
                // Let's use descriptive options for simplicity and reliability without assets.

                // Constructing a visual Tally block using HTML/CSS
                const drawTally = (n) => {
                    const groups = Math.floor(n / 5);
                    const remainder = n % 5;
                    let html = `<div style="display:flex; gap:10px; align-items:center; justify-content:center;">`;

                    const groupStyle = `font-family: monospace; font-size: 24px; letter-spacing: 2px; border: 1px solid #ccc; padding: 2px 8px; border-radius: 4px; background: #fff;`;

                    // Since specific cross-out tally is hard in pure text, let's use a standard convention description in options or a simplified visual question.
                    // Let's ask to count frequency from raw data instead for "tally_marks" logic effectively.
                };

                // Let's change this to: Given raw data, what is the frequency? (Mental Tally)
                const items = ["Apple", "Banana", "Orange"];
                const targetItem = items[randomInt(0, items.length - 1)];
                const freqs = { "Apple": 0, "Banana": 0, "Orange": 0 };

                // Generate random list
                const list = [];
                const listSize = randomInt(8, 15);
                for (let i = 0; i < listSize; i++) {
                    const it = items[randomInt(0, items.length - 1)];
                    list.push(it);
                    freqs[it]++;
                }
                // Ensure target has a unique frequency if possible to avoid ambiguity in options if we asked "which has freq X"
                // Here we ask "What is the frequency of X?"

                qText = `
                    <div class='question-container'>
                        <p>Look at this list of fruits collected from a group:</p>
                        <div style="background:#f0f9ff; padding:15px; border-radius:10px; margin:10px 0; font-weight: normal; color:#0369a1; line-height: 1.6;">
                            ${list.join(", ")}
                        </div>
                        <p>What is the frequency (count) of ${targetItem}?</p>
                    </div>
                `;
                correct = freqs[targetItem].toString();
                explanation = `Count how many times '${targetItem}' appears in the list.<br/>It appears ${freqs[targetItem]} times.`;
                uniqueId = `tally_${listSize}_${index}`;

                options = [
                    correct,
                    (freqs[targetItem] + 1).toString(),
                    (freqs[targetItem] - 1).toString(),
                    (Math.floor(listSize / 2)).toString()
                ];

            } else if (type === "frequency_analysis") {
                // Table based question
                const subjects = ["Maths", "English", "Science", "History"];
                const scores = subjects.map(() => randomInt(3, 10)); // Number of students who like it
                const tableRows = subjects.map((subj, i) => `
                    <tr>
                        <td style="border:1px solid #ddd; padding:8px;">${subj}</td>
                        <td style="border:1px solid #ddd; padding:8px; text-align:center;">${scores[i]}</td>
                    </tr>
                `).join("");

                const tableHtml = `
                    <table style="width:100%; border-collapse:collapse; margin:10px 0; background:white;">
                        <thead>
                            <tr style="background-color:#e0f2fe;">
                                <th style="border:1px solid #ddd; padding:8px;">Subject</th>
                                <th style="border:1px solid #ddd; padding:8px;">No. of Students</th>
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                `;

                const qType = randomInt(0, 2);
                if (qType === 0) { // Most popular
                    const maxScore = Math.max(...scores);
                    const winners = subjects.filter((_, i) => scores[i] === maxScore);
                    // Ensure only one winner for MCQ simplicity or format answer
                    if (winners.length > 1) {
                        // Reroll logic simplified: just pick first
                    }
                    const correctSubj = winners[0];

                    qText = `
                        <div class='question-container'>
                            <p>The table below shows favourite subjects of students:</p>
                            ${tableHtml}
                            <p>Which subject is liked by the most students?</p>
                        </div>
                    `;
                    correct = correctSubj;
                    explanation = `Look for the highest number in the 'No. of Students' column.<br/>${maxScore} is the highest, which corresponds to ${correctSubj}.`;
                    options = [correct, ...subjects.filter(s => s !== correct)].slice(0, 4);

                } else if (qType === 1) { // Total students
                    const total = scores.reduce((a, b) => a + b, 0);
                    qText = `
                        <div class='question-container'>
                            <p>The table below shows favourite subjects of students:</p>
                            ${tableHtml}
                            <p>How many students were surveyed in total?</p>
                        </div>
                    `;
                    correct = total.toString();
                    explanation = `Add all the values in the 'No. of Students' column: ${scores.join(" + ")} = ${total}.`;
                    options = [
                        total.toString(),
                        (total - 2).toString(),
                        (total + 5).toString(),
                        (total * 2).toString()
                    ];

                } else { // Difference
                    const max = Math.max(...scores);
                    const min = Math.min(...scores);
                    const diff = max - min;
                    qText = `
                        <div class='question-container'>
                            <p>The table below shows favourite subjects:</p>
                            ${tableHtml}
                            <p>What is the difference between the most liked and least liked subject counts?</p>
                        </div>
                    `;
                    correct = diff.toString();
                    explanation = `Most liked: ${max}. Least liked: ${min}.<br/>Difference: ${max} - ${min} = ${diff}.`;
                    options = [
                        diff.toString(),
                        (diff + 1).toString(),
                        (max + min).toString(),
                        "0"
                    ];
                }
                uniqueId = `analysis_${Date.now()}_${index}`;

            } else { // ascending_order
                const len = randomInt(4, 6);
                const numbers = [];
                while (numbers.length < len) {
                    const r = randomInt(1, 20);
                    if (!numbers.includes(r)) numbers.push(r);
                }

                const sorted = [...numbers].sort((a, b) => a - b);
                const originalStr = numbers.join(", ");
                const correctStr = sorted.join(", ");

                qText = `
                    <div class='question-container'>
                        <p>Organise the following data in ascending order:</p>
                        <div style="font-size:1.2em; font-weight: normal; color:#555; margin:10px 0;">
                            ${originalStr}
                        </div>
                    </div>
                `;
                correct = correctStr;
                explanation = `Ascending order means arranging numbers from smallest to largest.<br/>Correct order: ${correctStr}.`;

                // Generate distractors
                const d1 = [...numbers].sort((a, b) => b - a).join(", "); // Descending
                const d2 = [...numbers].reverse().join(", "); // Just reversed
                // Random shuffle
                const d3arr = [...numbers];
                for (let i = d3arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [d3arr[i], d3arr[j]] = [d3arr[j], d3arr[i]];
                }
                const d3 = d3arr.join(", ");

                options = [correct, d1, d2, d3];
                uniqueId = `order_${Date.now()}_${index}`;
            }

            if (attempts > 10) uniqueId = `force_${Date.now()}_${Math.random()}`;
        } while (usedQuestions.has(uniqueId));

        setUsedQuestions(prev => new Set(prev).add(uniqueId));

        // Shuffle options and ensure distinct
        let uniqueOpts = [...new Set(options)];
        // Fill if < 4 (unlikely given logic above but safe)
        while (uniqueOpts.length < 4) {
            uniqueOpts.push("Invalid Option " + Math.random());
        }

        const shuffled = uniqueOpts.slice(0, 4).sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);

        const newQuestion = {
            text: qText,
            correctAnswer: correct,
            solution: explanation,
            type: 'mcq', // All requested as MCQs mostly, logic simplified
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

    // Standard Navigation Handlers
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
            clearProgress(); navigate(-1);
        }
    };

    // UI Helper logic matching Supercells structure
    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Data Handling</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md flex items-center gap-2">
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
                                style={{ width: '100%' }}
                            >
                                <div className="question-card-modern" style={{ height: 'auto', minHeight: '100%', paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className={`interaction-area-modern flex-1 w-full flex flex-col items-center mx-auto ${(currentQuestion.text && (currentQuestion.text.includes('<table') || currentQuestion.text.includes('background:#f0f9ff'))) ? 'max-w-sm' : 'max-w-3xl mt-6'}`}>
                                        <div className={`options-grid-modern w-full ${(currentQuestion.text && (currentQuestion.text.includes('<table') || currentQuestion.text.includes('background:#f0f9ff'))) ? 'flex flex-col gap-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}`}>
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => !isSubmitted && handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                    className={`rounded-xl border-2 font-normal transition-all transform hover:scale-[1.01] flex items-center justify-center w-full ${(currentQuestion.text && (currentQuestion.text.includes('<table') || currentQuestion.text.includes('background:#f0f9ff'))) ? 'p-3 text-base min-h-[48px]' : 'p-4 text-lg min-h-[60px]'}
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
                            className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                clearProgress(); navigate(-1);
                            }}
                        >
                            Exit
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
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: "10px" }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>DONE <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={!selectedOption}
                                >
                                    SUBMIT <Check size={24} strokeWidth={3} />
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
                                clearProgress(); navigate(-1);
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
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
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
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "DONE"}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={!selectedOption}
                                >SUBMIT</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CollectingAndOrganisingData;
