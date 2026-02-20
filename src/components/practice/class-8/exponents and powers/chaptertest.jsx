import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, X, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleAndUnique = (correct, distractors) => {
    // Ensure the correct answer is always present
    const uniqueDistractors = [...new Set(distractors.filter(d => d !== correct))];
    const finalOptions = [correct, ...uniqueDistractors.slice(0, 3)];
    return finalOptions.sort(() => Math.random() - 0.5);
};

const ChapterTest = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({});
    const [isTestSubmitted, setIsTestSubmitted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [questions, setQuestions] = useState([]);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const timerRef = useRef(null);

    const TEST_NAME = "Exponents and Powers - Chapter Test";
    const SKILL_ID = 1210;
    const SKILL_NAME = "Exponents and Powers - Chapter Test";

    // --- Generator Functions ---

    const generateNegativeExponents = () => {
        const type = randomInt(1, 3);
        let text, correctAnswer, solution, options;

        if (type === 1) {
            // Basic evaluation: a^-n
            const base = randomInt(2, 5);
            const exp = randomInt(1, 3);
            const val = Math.pow(base, exp);
            text = `Evaluate the value of $${base}^{-${exp}}$.`;
            correctAnswer = `$\\frac{1}{${val}}$`;
            solution = `$${base}^{-${exp}} = \\frac{1}{${base}^{${exp}}} = \\frac{1}{${val}}$`;
            options = shuffleAndUnique(correctAnswer, [`$\\frac{1}{${base * exp}}$`, `$-${val}$`, `$${val}$`, `$\\frac{1}{${base + exp}}$`]);
        } else if (type === 2) {
            // Basic Multiplicative inverse
            const base = [2, 3, 5, 10][randomInt(0, 3)];
            const exp = randomInt(2, 5);
            text = `What is the multiplicative inverse of $${base}^{-${exp}}$?`;
            correctAnswer = `$${base}^{${exp}}$`;
            solution = `Multiplicative inverse of $a^{-n}$ is $a^n$. So, for $${base}^{-${exp}}$, it is $${base}^{${exp}}$.`;
            options = shuffleAndUnique(correctAnswer, [`$${base}^{-${exp}}$`, `$\\frac{1}{${base}^{${exp}}}$`, `$1$`, `$0$`]);
        } else {
            // Simple difference: (1/a)^-1 - (1/b)^-1
            const a = randomInt(2, 4);
            const b = randomInt(a + 1, 6);
            text = `Evaluate: $(\\frac{1}{${a}})^{-1} - (\\frac{1}{${b}})^{-1}$`;
            correctAnswer = `$${a - b}$`;
            solution = `$(\\frac{1}{${a}})^{-1} = ${a}$ and $(\\frac{1}{${b}})^{-1} = ${b}$. So, $${a} - ${b} = ${a - b}$.`;
            options = shuffleAndUnique(correctAnswer, [`$${b - a}$`, `$${a + b}$`, `$0$`, `$${a * b}$`]);
        }
        return { text, options, correctAnswer, solution };
    };

    const generateLawsOfExponents = () => {
        const type = randomInt(1, 3);
        let text, correctAnswer, solution, options;

        if (type === 1) {
            // Finding x in a^x = b
            const base = [2, 3, 5][randomInt(0, 2)];
            const exp = randomInt(2, 4);
            const val = Math.pow(base, exp);
            text = `Find the value of $x$ if $${base}^x = ${val}$.`;
            correctAnswer = `$${exp}$`;
            solution = `$${val} = ${base}^{${exp}}$. Therefore $x = ${exp}$.`;
            options = shuffleAndUnique(correctAnswer, [`$${exp - 1}$`, `$${exp + 1}$`, `$${exp + 2}$`, `$0$`]);
        } else if (type === 2) {
            // Product law: a^m * a^n
            const base = randomInt(2, 4);
            const m = randomInt(2, 3);
            const n = randomInt(1, 4);
            text = `Simplify: $${base}^{${m}} \\times ${base}^{${n}}$`;
            correctAnswer = `$${base}^{${m + n}}$`;
            solution = `Using $a^m \\times a^n = a^{m+n}$, we get $${base}^{${m}+${n}} = ${base}^{${m + n}}$.`;
            options = shuffleAndUnique(`$${base}^{${m + n}}$`, [`$${base}^{${m * n}}$`, `$${base}^{${m - n}}$`, `$${base + base}^{${m + n}}$`, `$${base}^{${n}}$`]);
        } else {
            // Power of a power: (a^m)^n
            const base = randomInt(2, 3);
            const m = randomInt(2, 3);
            const n = randomInt(2, 4);
            text = `Evaluate: $(${base}^{${m}})^{${n}}$`;
            correctAnswer = `$${base}^{${m * n}}$`;
            solution = `Using $(a^m)^n = a^{mn}$, we get $${base}^{${m} \\times ${n}} = ${base}^{${m * n}}$.`;
            options = shuffleAndUnique(`$${base}^{${m * n}}$`, [`$${base}^{${m + n}}$`, `$${base}^{${m - n}}$`, `$${base}^{${m}^{${n}}}$`, `$${base}^{${m}}$`]);
        }
        return { text, options, correctAnswer, solution };
    };

    const generateScientificNotation = () => {
        const type = randomInt(1, 2);
        let text, correctAnswer, solution, options;

        if (type === 1) {
            // Standard form of small numbers
            const num = randomInt(1, 9);
            const zeros = randomInt(3, 5);
            const valStr = "0." + "0".repeat(zeros) + num;
            text = `Standard form of $${valStr}$ is:`;
            correctAnswer = `$${num} \\times 10^{-${zeros + 1}}$`;
            solution = `Moving the decimal ${zeros + 1} places to the right gives $${num} \\times 10^{-${zeros + 1}}$.`;
            options = shuffleAndUnique(correctAnswer, [`$${num} \\times 10^{-${zeros}}$`, `$${num} \\times 10^{${zeros + 1}}$`, `$${num} \\times 10^{${zeros}}$`, `$${num} \\times 10^{-1}$`]);
        } else {
            // Usual form
            const num = randomInt(2, 8);
            const exp = randomInt(3, 5);
            text = `Usual form of $${num} \\times 10^{-${exp}}$ is:`;
            const val = num * Math.pow(10, -exp);
            correctAnswer = `$${val.toFixed(exp)}$`;
            solution = `Move decimal ${exp} places to the left.`;
            options = shuffleAndUnique(correctAnswer, [`$${(num * Math.pow(10, -exp - 1)).toFixed(exp + 1)}$`, `$${(num * Math.pow(10, -exp + 1)).toFixed(exp - 1)}$`, `$0.0${num}$`, `$0.${num}$`]);
        }
        return { text, options, correctAnswer, solution };
    };

    const generateComparingQuantities = () => {
        const type = randomInt(1, 2);
        let text, correctAnswer, solution, options;

        if (type === 1) {
            // Compare powers of 10
            const c1 = (randomInt(10, 95) / 10).toFixed(1);
            const c2 = (randomInt(10, 95) / 10).toFixed(1);
            const e1 = randomInt(6, 9);
            const e2 = randomInt(3, 5);
            text = `Compare: $${c1} \\times 10^{${e1}}$ ___ $${c2} \\times 10^{${e2}}$`;
            correctAnswer = "$>$";
            solution = `Comparing powers of 10, $10^{${e1}}$ is much larger than $10^{${e2}}$.`;
            options = ["$>$", "$<$", "$=$", "$\\text{Cannot compare}$"];
        } else {
            // Compare small powers
            const a = randomInt(2, 5);
            const b = randomInt(2, 5);
            const expA = randomInt(2, 3);
            const expB = randomInt(2, 3);
            const valA = Math.pow(a, expA);
            const valB = Math.pow(b, expB);

            text = `Which is greater: $${a}^{${expA}}$ or $${b}^{${expB}}$?`;
            if (valA > valB) {
                correctAnswer = `$${a}^{${expA}}$`;
            } else if (valB > valA) {
                correctAnswer = `$${b}^{${expB}}$`;
            } else {
                correctAnswer = "$\\text{Equal}$";
            }
            solution = `$${a}^{${expA}} = ${valA}$ and $${b}^{${expB}} = ${valB}$. ${valA === valB ? 'They are equal.' : `Since ${Math.max(valA, valB)} > ${Math.min(valA, valB)}, $${valA > valB ? a : b}^{${valA > valB ? expA : expB}}$ is greater.`}`;
            options = shuffleAndUnique(correctAnswer, [`$${a}^{${expA}}$`, `$${b}^{${expB}}$`, "$\\text{Equal}$", "$\\text{None}$", "$10^2$"]);
        }
        return { text, options, correctAnswer, solution };
    };

    const generateQuestionBank = () => {
        const qBank = [];
        const seenTexts = new Set();

        const addUnique = (generator, count) => {
            let added = 0;
            let attempts = 0;
            while (added < count && attempts < 100) {
                const q = generator();
                if (!seenTexts.has(q.text)) {
                    qBank.push(q);
                    seenTexts.add(q.text);
                    added++;
                }
                attempts++;
            }
        };

        addUnique(generateNegativeExponents, 5);
        addUnique(generateLawsOfExponents, 5);
        addUnique(generateScientificNotation, 5);
        addUnique(generateComparingQuantities, 5);

        // Add IDs
        return qBank.map((q, idx) => ({ ...q, id: idx + 1 }));
    };

    useEffect(() => {
        setQuestions(generateQuestionBank());

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        timerRef.current = setInterval(() => {
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
            clearInterval(timerRef.current);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (isTestSubmitted) {
            clearInterval(timerRef.current);
            if (sessionId) {
                api.finishSession(sessionId).catch(console.error);
            }
            submitReport();
        }
    }, [isTestSubmitted]);

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

    const submitReport = async () => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        const score = getScore();
        try {
            await api.createReport({
                title: SKILL_NAME,
                type: 'test',
                score: (score / questions.length) * 100,
                parameters: {
                    skill_id: SKILL_ID,
                    skill_name: SKILL_NAME,
                    total_questions: questions.length,
                    correct_answers: score,
                    time_taken_seconds: timeElapsed,
                    timestamp: new Date().toISOString()
                },
                user_id: parseInt(userId, 10)
            });
        } catch (err) {
            console.error("Failed to create report", err);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (option) => {
        if (isQuestionSubmitted) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (!selectedOption) return;
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        setAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedOption }));
        recordQuestionAttempt(currentQuestion, selectedOption, isCorrect);
        setIsQuestionSubmitted(true);
    };

    const handleSkip = () => {
        // Record skipped attempt
        recordQuestionAttempt(currentQuestion, "Skipped", false);

        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);

            // Re-check if the next question was already submitted
            setIsQuestionSubmitted(!!answers[nextIndex]);
            setSelectedOption(answers[nextIndex] || null);

            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            setIsTestSubmitted(true);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);

            // Check if we've already submitted this next question
            setIsQuestionSubmitted(!!answers[nextIndex]);
            setSelectedOption(answers[nextIndex] || null);

            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            setIsTestSubmitted(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(prevIndex);

            // Restore submission state for the previous question
            setIsQuestionSubmitted(!!answers[prevIndex]);
            setSelectedOption(answers[prevIndex] || null);

            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const getScore = () => {
        let score = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    if (questions.length === 0) return <div>Loading Test...</div>;

    const currentQuestion = questions[currentQuestionIndex];

    if (isTestSubmitted) {
        const score = getScore();
        const percentage = (score / questions.length) * 100;

        return (
            <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflowY: 'auto' }}>
                <div className="max-w-4xl mx-auto p-4 md:p-8 pb-32">
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 border border-[#4FB7B3]/30">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black text-[#31326F] mb-2">Test Report Card</h1>
                            <p className="text-gray-600 font-medium">Excellent effort!</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-blue-100">
                                <Award size={40} className="text-blue-500 mb-2" />
                                <div className="text-4xl font-black text-blue-600">{score}/{questions.length}</div>
                                <div className="text-sm font-bold text-blue-400 uppercase tracking-wide">Total Score</div>
                            </div>
                            <div className="bg-purple-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-purple-100">
                                <div className="text-4xl font-black text-purple-600">{percentage.toFixed(0)}%</div>
                                <div className="text-sm font-bold text-purple-400 uppercase tracking-wide">Accuracy</div>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-orange-100">
                                <Clock size={40} className="text-orange-500 mb-2" />
                                <div className="text-4xl font-black text-orange-600">{formatTime(timeElapsed)}</div>
                                <div className="text-sm font-bold text-orange-400 uppercase tracking-wide">Time Taken</div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-[#31326F] mb-6 border-b-2 border-gray-100 pb-2">Question Wise Analysis</h2>

                        <div className="space-y-6">
                            {questions.map((q, idx) => {
                                const userAnswer = answers[idx];
                                const isCorrect = userAnswer === q.correctAnswer;

                                return (
                                    <div key={idx} className={`rounded-xl border-2 p-4 ${isCorrect ? 'border-green-100 bg-green-50/30' : 'border-red-100 bg-red-50/30'}`}>
                                        <div className="flex gap-4">
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                                                {idx + 1}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="font-medium text-lg text-gray-800 mb-3">
                                                    <LatexContent html={q.text} />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-bold text-gray-400 block text-xs uppercase mb-1">Your Answer</span>
                                                        <div className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                                            {userAnswer ? <LatexContent html={userAnswer} /> : <span className="text-gray-400 italic">Not Answered</span>}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-bold text-gray-400 block text-xs uppercase mb-1">Correct Answer</span>
                                                        <div className="font-semibold text-green-600">
                                                            <LatexContent html={q.correctAnswer} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-lg p-3 text-sm text-gray-600 border border-gray-200">
                                                    <span className="font-bold text-[#4FB7B3] mr-2">Solution:</span>
                                                    <LatexContent html={q.solution} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-[#31326F] text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-[#25265e] transition-colors"
                            >
                                Back to Topics
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <div className="text-[#31326F] font-bold text-lg tracking-wide hidden sm:block">
                        {TEST_NAME}
                    </div>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {currentQuestionIndex + 1} / {questions.length}
                    </div>
                </div>

                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ paddingTop: '40px' }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
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
                                            {currentQuestion.options.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                                    style={{
                                                        fontWeight: '500',
                                                        borderColor: selectedOption === option ? '#4FB7B3' : '',
                                                        opacity: isQuestionSubmitted && selectedOption !== option ? 0.7 : 1
                                                    }}
                                                    onClick={() => handleOptionSelect(option)}
                                                    disabled={isQuestionSubmitted}
                                                >
                                                    <div className="w-full flex items-center justify-between">
                                                        <LatexContent html={option} />
                                                        {selectedOption === option && <div className="w-3 h-3 rounded-full bg-[#4FB7B3]" />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                        >
                            <X size={20} />
                            Exit Test
                        </button>
                    </div>
                    <div className="bottom-center">
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {currentQuestionIndex > 0 && (
                                <button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous">
                                    <ChevronLeft size={28} strokeWidth={3} /> Previous
                                </button>
                            )}

                            <button
                                className="px-6 py-2 rounded-full font-bold border-2 border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors flex items-center gap-2 shadow-sm"
                                onClick={handleSkip}
                            >
                                Skip
                            </button>

                            {isQuestionSubmitted ? (
                                <button
                                    className="nav-pill-next-btn"
                                    onClick={handleNext}
                                >
                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Finish <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className={`nav-pill-next-btn transition-all ${selectedOption
                                        ? 'opacity-100 shadow-lg'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                                        }`}
                                    onClick={handleSubmit}
                                    disabled={!selectedOption}
                                >
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <button
                        className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                        onClick={async () => {
                            if (sessionId) await api.finishSession(sessionId).catch(console.error);
                            navigate(-1);
                        }}
                    >
                        <X size={20} />
                    </button>

                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {currentQuestionIndex > 0 && (
                                <button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous">
                                    <ChevronLeft size={28} strokeWidth={3} /> Prev
                                </button>
                            )}

                            <button
                                className="bg-orange-50 text-orange-500 px-4 py-2 rounded-lg font-bold text-sm border border-orange-100"
                                onClick={handleSkip}
                            >
                                Skip
                            </button>

                            {isQuestionSubmitted ? (
                                <button
                                    className="nav-pill-next-btn"
                                    onClick={handleNext}
                                >
                                    {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
                                </button>
                            ) : (
                                <button
                                    className={`nav-pill-next-btn px-4 py-2 text-sm transition-all ${selectedOption
                                        ? 'opacity-100'
                                        : 'bg-gray-200 text-gray-400 opacity-50'
                                        }`}
                                    onClick={handleSubmit}
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

export default ChapterTest;
