import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing! You're a Supercell Master! ✨",
    "🌟 Brilliant! You see the pattern! 🌟",
    "🎉 Correct! Square power! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const Supercells = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [history, setHistory] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [userInput, setUserInput] = useState("");
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
    const SKILL_ID = 6302; // ID for Number Play - Supercells
    const SKILL_NAME = "Number Play - Supercells";

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
            setUserInput(data.userInput || "");
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else if (!answers[qIndex]) {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        // 8 MCQs, 2 User Inputs
        // Force User Input on specific indices for variety (e.g., 4 and 8)
        const isInputParams = (index === 4 || index === 8);
        const types = ["visual_grid", "calc_cells", "calc_side", "pattern_next", "diff_squares"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";
        let inputType = isInputParams ? "input" : "mcq";

        const logicDescription = "<strong>Supercells</strong> are perfect squares made of small unit cells. A Supercell of side <em>n</em> has <em>n × n</em> small cells.";

        let attempts = 0;
        do {
            attempts++;

            if (type === "visual_grid") {
                const n = randomInt(2, 5);
                const total = n * n;

                // Construct visual grid using HTML/CSS
                const gridStyle = `
                    display: grid; 
                    grid-template-columns: repeat(${n}, 30px); 
                    grid-template-rows: repeat(${n}, 30px); 
                    gap: 2px; 
                    margin: 10px auto; 
                    width: fit-content;
                `;
                const cellStyle = `
                    width: 30px; 
                    height: 30px; 
                    background-color: #4FB7B3; 
                    border-radius: 4px;
                `;
                const cellsHtml = Array(total).fill(`<div style="${cellStyle}"></div>`).join("");

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>Look at this Supercell:</p>
                        <div style="${gridStyle}">${cellsHtml}</div>
                        <p>How many small cells are in this ${n} × ${n} Supercell?</p>
                    </div>
                `;
                correct = total.toString();
                explanation = `This is a square grid with side length <strong>${n}</strong>.<br/>Total cells = ${n} × ${n} = <strong>${total}</strong>.`;
                uniqueId = `visual_${n}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        total.toString(),
                        (total - 1).toString(),
                        (total + n).toString(),
                        (n * 2).toString()
                    ];
                }

            } else if (type === "calc_cells") {
                const n = randomInt(3, 12);
                const total = n * n;

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>If a Supercell has a side length of <strong>${n}</strong>,</p>
                        <p>how many small unit cells does it contain?</p>
                    </div>
                `;
                correct = total.toString();
                explanation = `For a side length of ${n}, the total number of cells is ${n} × ${n} = <strong>${total}</strong>.`;
                uniqueId = `calc_cells_${n}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        total.toString(),
                        (n * 2).toString(),
                        (total + n).toString(),
                        (n + 2).toString()
                    ];
                }

            } else if (type === "calc_side") {
                const n = randomInt(3, 10);
                const total = n * n;

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>A Supercell is made of <strong>${total}</strong> small cells.</p>
                        <p>What is the side length of this Supercell?</p>
                    </div>
                `;
                correct = n.toString();
                explanation = `We need to find a number that multiplied by itself gives ${total}.<br/>Since ${n} × ${n} = ${total}, the side length is <strong>${n}</strong>.`;
                uniqueId = `calc_side_${total}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        n.toString(),
                        (n - 1).toString(),
                        (n + 1).toString(),
                        Math.floor(total / 2).toString()
                    ];
                }

            } else if (type === "pattern_next") {
                const start = randomInt(1, 3);
                const seqLen = 4;
                const sequence = [];
                for (let i = 0; i < seqLen; i++) sequence.push((start + i) * (start + i));

                const nextVal = (start + seqLen) * (start + seqLen);

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>Look at the pattern of cells in growing Supercells:</p>
                        <p><strong style="font-size:1.4em; letter-spacing:2px;">${sequence.join(", ")}, ...</strong></p>
                        <p>What is the next number in this pattern?</p>
                    </div>
                `;
                correct = nextVal.toString();
                explanation = `The pattern is the sequence of square numbers: ${start}², ${start + 1}², ${start + 2}², ${start + 3}²...<br/>The last number shown was ${start + seqLen - 1}² (${sequence[sequence.length - 1]}).<br/>The next one is ${start + seqLen}² = ${start + seqLen} × ${start + seqLen} = <strong>${nextVal}</strong>.`;
                uniqueId = `pattern_${start}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        nextVal.toString(),
                        (sequence[sequence.length - 1] + 2).toString(),
                        (sequence[sequence.length - 1] * 2).toString(),
                        (nextVal - 1).toString()
                    ];
                }

            } else { // diff_squares
                const n1 = randomInt(2, 6);
                const n2 = n1 + 1;
                const sq1 = n1 * n1;
                const sq2 = n2 * n2;
                const diff = sq2 - sq1;

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>How many <strong>more</strong> cells does a ${n2}×${n2} Supercell have compared to a ${n1}×${n1} Supercell?</p>
                    </div>
                `;
                correct = diff.toString();
                explanation = `
                    Cells in ${n2}×${n2} = ${sq2}.<br/>
                    Cells in ${n1}×${n1} = ${sq1}.<br/>
                    Difference = ${sq2} - ${sq1} = <strong>${diff}</strong>.
                `;
                uniqueId = `diff_${n1}_${n2}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        diff.toString(),
                        (n1 + n2).toString(),
                        (diff + 1).toString(),
                        "1"
                    ];
                }
            }

            if (attempts > 10) uniqueId = `force_${Date.now()}_${Math.random()}`;

        } while (usedQuestions.has(uniqueId));

        setUsedQuestions(prev => new Set(prev).add(uniqueId));

        // Shuffle options if MCQ
        let uniqueOpts = [];
        if (inputType === "mcq") {
            uniqueOpts = [...new Set(options)];
            // Ensure 4 distinct numerical options
            if (options.every(o => !isNaN(parseInt(o)))) {
                while (uniqueOpts.length < 4) {
                    const rnd = randomInt(1, 100).toString();
                    if (!uniqueOpts.includes(rnd)) uniqueOpts.push(rnd);
                    uniqueOpts = [...new Set(uniqueOpts)];
                }
                uniqueOpts.sort((a, b) => parseInt(a) - parseInt(b));
            }
            setShuffledOptions([...uniqueOpts].sort(() => Math.random() - 0.5));
        }

        const newQuestion = {
            text: qText,
            correctAnswer: correct,
            solution: explanation,
            type: inputType,
            options: uniqueOpts
        };

        setCurrentQuestion(newQuestion);
        setSelectedOption(null);
        setUserInput("");
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
        questionStartTime.current = Date.now();

        setHistory(prev => ({
            ...prev,
            [index]: {
                question: newQuestion,
                options: uniqueOpts,
                selectedOption: null,
                userInput: "",
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
        if (currentQuestion.type === "mcq" && !selectedOption) return;
        if (currentQuestion.type === "input" && !userInput.trim()) return;

        let isRight = false;

        if (currentQuestion.type === "mcq") {
            isRight = selectedOption === currentQuestion.correctAnswer;
        } else {
            const userClean = userInput.replace(/\s+/g, '').toLowerCase();
            const correctClean = currentQuestion.correctAnswer.replace(/\s+/g, '').toLowerCase();
            isRight = userClean === correctClean;
        }

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
                userInput: userInput,
                isSubmitted: true,
                isCorrect: isRight,
                feedbackMessage: feedbackMsg
            }
        }));

        recordQuestionAttempt(currentQuestion, currentQuestion.type === "mcq" ? selectedOption : userInput, isRight);
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
            setUserInput("");
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
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">Supercells</span>
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
                                        {currentQuestion.type === 'mcq' ? (
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
                                        ) : (
                                            <div className="w-full flex flex-col items-center gap-4">
                                                <input
                                                    type="text"
                                                    value={userInput}
                                                    onChange={(e) => setUserInput(e.target.value)}
                                                    placeholder="Type your numerical answer"
                                                    disabled={isSubmitted}
                                                    className={`w-full max-w-md p-4 text-xl text-center font-bold rounded-xl border-2 outline-none transition-all
                                                        ${isSubmitted
                                                            ? isCorrect
                                                                ? 'bg-green-50 border-green-500 text-green-700'
                                                                : 'bg-red-50 border-red-500 text-red-700'
                                                            : 'bg-white border-gray-300 focus:border-[#4FB7B3] focus:shadow-md text-[#31326F]'
                                                        }
                                                    `}
                                                />
                                                {isSubmitted && !isCorrect && (
                                                    <div className="text-gray-500">
                                                        Correct Answer: <strong>{currentQuestion.correctAnswer}</strong>
                                                    </div>
                                                )}
                                            </div>
                                        )}

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
                                    disabled={currentQuestion.type === 'mcq' ? !selectedOption : !userInput.trim()}
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
                                    disabled={currentQuestion.type === 'mcq' ? !selectedOption : !userInput.trim()}
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

export default Supercells;
