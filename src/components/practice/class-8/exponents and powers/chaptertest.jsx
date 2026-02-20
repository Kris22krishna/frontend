import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, X, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const ChapterTest = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({});
    const [isTestSubmitted, setIsTestSubmitted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [questions, setQuestions] = useState([]);

    const timerRef = useRef(null);

    const TEST_NAME = "Exponents and Powers - Chapter Test";
    const SKILL_ID = 8005;
    const SKILL_NAME = "Exponents and Powers - Chapter Test";

    // --- Generator Functions ---

    const generateNegativeExponents = () => {
        const type = randomInt(1, 4);
        let text, correctAnswer, solution, options;

        if (type === 1) {
            const base = randomInt(2, 6);
            const exp = randomInt(2, 4);
            const val = Math.pow(base, exp);
            text = `Evaluate the value of $${base}^{-${exp}}$.`;
            correctAnswer = `$\\frac{1}{${val}}$`;
            solution = `$${base}^{-${exp}} = \\frac{1}{${base}^{${exp}}} = \\frac{1}{${val}}$`;
            options = [correctAnswer, `$\\frac{1}{${val - 1}}$`, `$-${val}$`, `$${val}$`].sort(() => Math.random() - 0.5);
        } else if (type === 2) {
            const base = [10, 2, 3, 5][randomInt(0, 3)];
            const exp = randomInt(5, 100);
            text = `What is the multiplicative inverse of $${base}^{-${exp}}$?`;
            correctAnswer = `$${base}^{${exp}}$`;
            solution = `Multiplicative inverse of $a^{-n}$ is $a^n$. So, for $${base}^{-${exp}}$, it is $${base}^{${exp}}$.`;
            options = [correctAnswer, `$${base}^{-${exp}}$`, `$-${base}^{${exp}}$`, `$1$`].sort(() => Math.random() - 0.5);
        } else if (type === 3) {
            const a = randomInt(2, 4);
            const b = randomInt(a + 1, 6);
            text = `Evaluate: $(\\frac{1}{${a}})^{-1} - (\\frac{1}{${b}})^{-1}$`;
            correctAnswer = `${a - b}`;
            solution = `$(\\frac{1}{${a}})^{-1} = ${a}$ and $(\\frac{1}{${b}})^{-1} = ${b}$. So, $${a} - ${b} = ${a - b}$.`;
            options = [`${a - b}`, `${b - a}`, `${a + b}`, `$0$`].sort(() => Math.random() - 0.5);
        } else {
            const exp1 = randomInt(100, 999);
            const exp2 = exp1 + 1;
            text = `Find the value of $(-1)^{${exp1}} \\times (-1)^{${exp2}}$.`;
            correctAnswer = `-1`;
            solution = `One exponent is odd, one is even. $(-1)^{odd} = -1$, $(-1)^{even} = 1$. So $(-1) \\times (1) = -1$.`;
            options = ["-1", "1", "0", `${exp1 + exp2}`].sort(() => Math.random() - 0.5);
        }
        return { text, options, correctAnswer, solution };
    };

    const generateLawsOfExponents = () => {
        const type = randomInt(1, 4);
        let text, correctAnswer, solution, options;

        if (type === 1) {
            const base = [2, 3, 5][randomInt(0, 2)];
            const exp = randomInt(3, 5);
            const val = Math.pow(base, exp);
            text = `Find the value of $x$ if $${base}^x = ${val}$.`;
            correctAnswer = `${exp}`;
            solution = `$${val} = ${base}^{${exp}}$. Therefore $x = ${exp}$.`;
            options = [`${exp}`, `${exp - 1}`, `${exp + 1}`, `${exp - 2}`].sort(() => Math.random() - 0.5);
        } else if (type === 2) {
            const base = randomInt(2, 5);
            const m = randomInt(2, 5);
            const n = randomInt(2, 5);
            const k = m + n + randomInt(1, 3);
            text = `Find $x$: $${base}^{m+1} \\times ${base}^{${n}} = ${base}^{x}$`;
            correctAnswer = `${m + 1 + n}`;
            solution = `Using $a^m \\times a^n = a^{m+n}$, the exponent on LHS is $(m+1) + ${n} = ${m + 1 + n}$.`;
            options = [`${m + 1 + n}`, `${m + n}`, `${m + n - 1}`, `${m + n + 2}`].sort(() => Math.random() - 0.5);
        } else if (type === 3) {
            const a = randomInt(2, 4);
            const b = randomInt(2, 4);
            const exp = randomInt(2, 4);
            text = `Simplify: $\\frac{(${a}\\times${b})^{${exp}}}{${a}^{${exp}}}$`;
            correctAnswer = `$${b}^{${exp}}$`;
            solution = `$(a \\times b)^n = a^n \\times b^n$. So $\\frac{${a}^{${exp}} \\times ${b}^{${exp}}}{${a}^{${exp}}} = ${b}^{${exp}}$.`;
            options = [`$${b}^{${exp}}$`, `$${a}^{${exp}}$`, `$${a}$`, `$${b}$`].sort(() => Math.random() - 0.5);
        } else {
            text = "Evaluate: $(\\frac{a^m}{a^n})^{m+n} \\times (\\frac{a^n}{a^l})^{n+l} \\times (\\frac{a^l}{a^m})^{l+m}$";
            correctAnswer = "1";
            solution = "LHS simplifies to $a^{(m-n)(m+n)} \\times a^{(n-l)(n+l)} \\times a^{(l-m)(l+m)} = a^{m^2-n^2 + n^2-l^2 + l^2-m^2} = a^0 = 1$.";
            options = ["1", "0", "a", "$a^{m+n+l}$"].sort(() => Math.random() - 0.5);
        }
        return { text, options, correctAnswer, solution };
    };

    const generateScientificNotation = () => {
        const type = randomInt(1, 3);
        let text, correctAnswer, solution, options;

        if (type === 1) {
            const num = randomInt(1, 9);
            const zeros = randomInt(5, 10);
            const valStr = "0." + "0".repeat(zeros) + num;
            text = `Standard form of $${valStr}$ is:`;
            correctAnswer = `$${num} \\times 10^{-${zeros + 1}}$`;
            solution = `Moving the decimal ${zeros + 1} places to the right gives $${num} \\times 10^{-${zeros + 1}}$.`;
            options = [correctAnswer, `$${num} \\times 10^{-${zeros}}$`, `$${num} \\times 10^{${zeros + 1}}$`, `$${num}0 \\times 10^{-${zeros + 2}}$`].sort(() => Math.random() - 0.5);
        } else if (type === 2) {
            const num = randomInt(10, 99) / 10;
            const exp = randomInt(2, 5);
            text = `Usual form of $${num} \\times 10^{-${exp}}$ is:`;
            const val = num * Math.pow(10, -exp);
            correctAnswer = `${val.toFixed(exp + 1).replace(/\.?0+$/, '')}`;
            solution = `Move decimal ${exp} places to the left.`;
            options = [correctAnswer, `${(num * Math.pow(10, -exp - 1)).toFixed(exp + 2)}`, `${(num * Math.pow(10, -exp + 1)).toFixed(exp)}`, `${num}${"0".repeat(exp)}`].sort(() => Math.random() - 0.5);
        } else {
            const num = randomInt(100, 999);
            const zeros = randomInt(6, 9);
            const valStr = num + "0".repeat(zeros);
            const lead = num / 100;
            const totalExp = zeros + 2;
            text = `Standard form of $${valStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$ is:`;
            correctAnswer = `$${lead} \\times 10^{${totalExp}}$`;
            solution = `Decimal moves ${totalExp} places to the left. So $${lead} \\times 10^{${totalExp}}$.`;
            options = [correctAnswer, `$${lead} \\times 10^{${totalExp - 1}}$`, `$${lead * 10} \\times 10^{${totalExp}}$`, `$${lead} \\times 10^{-${totalExp}}$`].sort(() => Math.random() - 0.5);
        }
        return { text, options, correctAnswer, solution };
    };

    const generateComparingQuantities = () => {
        const type = randomInt(1, 3);
        let text, correctAnswer, solution, options;

        if (type === 1) {
            const e1 = randomInt(10, 15);
            const e2 = randomInt(5, 9);
            text = `Compare: $2.7 \\times 10^{${e1}}$ ___ $1.5 \\times 10^{${e2}}$`;
            correctAnswer = "$>$";
            solution = `Since $10^{${e1}} > 10^{${e2}}$, the first number is much larger.`;
            options = [">", "<", "=", "Cannot compare"];
        } else if (type === 2) {
            const b1 = 5, p1 = 3; // 125
            const b2 = 3, p2 = 5; // 243
            text = `Which is greater: $${b1}^{${p1}}$ or $${b2}^{${p2}}$?`;
            correctAnswer = `$${b2}^{${p2}}$`;
            solution = `$${b1}^{${p1}} = ${Math.pow(b1, p1)}$, $${b2}^{${p2}} = ${Math.pow(b2, p2)}$. So $${b2}^{${p2}}$ is greater.`;
            options = [`$${b1}^{${p1}}$`, `$${b2}^{${p2}}$`, "Equal", "None"].sort(() => Math.random() - 0.5);
        } else {
            const exp = randomInt(5, 8);
            text = `Which is smaller?`;
            correctAnswer = `$10^{-${exp + 1}}$`;
            solution = `A larger negative exponent means a smaller value. $10^{-${exp + 1}}$ is smaller than $10^{-${exp}}$.`;
            options = [`$10^{-${exp + 1}}$`, `$10^{-${exp}}$`, `$10^{-${exp - 1}}$`, `$0.1$`].sort(() => Math.random() - 0.5);
        }
        return { text, options, correctAnswer, solution };
    };

    const generateQuestionBank = () => {
        const qBank = [];
        // 5 Questions from each skill
        for (let i = 0; i < 5; i++) qBank.push(generateNegativeExponents());
        for (let i = 0; i < 5; i++) qBank.push(generateLawsOfExponents());
        for (let i = 0; i < 5; i++) qBank.push(generateScientificNotation());
        for (let i = 0; i < 5; i++) qBank.push(generateComparingQuantities());

        // Add IDs
        return qBank.map((q, idx) => ({ ...q, id: idx + 1 }));
    };

    useEffect(() => {
        setQuestions(generateQuestionBank());
        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        if (isTestSubmitted) {
            clearInterval(timerRef.current);
            submitReport();
        }
    }, [isTestSubmitted]);

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
        if (isTestSubmitted) return;
        setSelectedOption(option);
    };

    const handleNext = () => {
        if (selectedOption !== null) {
            setAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedOption }));
        }

        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setSelectedOption(answers[nextIndex] || null);
        } else {
            setIsTestSubmitted(true);
        }
    };

    const handlePrevious = () => {
        if (selectedOption !== null) {
            setAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedOption }));
        }

        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(prevIndex);
            setSelectedOption(answers[prevIndex] || null);
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
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

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

            <div className="w-full h-1.5 bg-gray-200 fixed top-[72px] z-10">
                <div
                    className="h-full bg-[#4FB7B3] transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

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
                                                    style={{ fontWeight: '500', borderColor: selectedOption === option ? '#4FB7B3' : '' }}
                                                    onClick={() => handleOptionSelect(option)}
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
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={() => navigate(-1)}
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
                                className="nav-pill-next-btn"
                                onClick={handleNext}
                            >
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                ) : (
                                    <>Finish <Check size={28} strokeWidth={3} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <button
                        className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                        onClick={() => navigate(-1)}
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
                                className="nav-pill-next-btn"
                                onClick={handleNext}
                            >
                                {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChapterTest;
