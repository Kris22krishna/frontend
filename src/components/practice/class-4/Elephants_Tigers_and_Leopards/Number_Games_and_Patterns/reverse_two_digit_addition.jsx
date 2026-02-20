import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Repeat, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const MagicMirrorAddition = () => {
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
    const SKILL_ID = 1190;
    const SKILL_NAME = "Elephants, Tigers, and Leopards - Magic Mirror Numbers";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

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
    const reverseNumber = (n) => parseInt(n.toString().split('').reverse().join(''));

    const generateQuestion = (difficulty, index) => {
        // Concept: N + Reverse(N)
        // Easy: Direct calculation. "23 + 32 = ?"
        // Medium: "45 + ? = 99" or "The sum is 66, start was 15."
        // Hard: Properties. "Sum is 121. What are the addends?"

        let num, rev, sum;
        let questionText = "";
        let correctAnswer = "";
        let explanation = "";
        let type = 'direct'; // direct, missing_addend, property

        // Ensure no carry for Easy if possible? Or allow carry?
        // NCERT usually explores "Special numbers" (palindromes) or divisibility by 11.

        if (difficulty === 'easy') {
            num = randomInt(12, 85);
            // Avoid multiples of 10 if it makes reverse single digit logically? 
            // e.g. 50 -> 05 (5). 50 + 5 = 55. That works.
            rev = reverseNumber(num);
            sum = num + rev;

            questionText = `What do you get if you add **${num}** to its **reverse**?`;
            correctAnswer = sum.toString();
            explanation = `Number: ${num}<br/>Reverse: ${rev}<br/>Sum: ${num} + ${rev} = ${correctAnswer}.`;
        } else if (difficulty === 'medium') {
            // Missing Reverse
            num = randomInt(12, 89);
            rev = reverseNumber(num);
            sum = num + rev;

            questionText = `**${num}** + <span style="color:#4FB7B3">?</span> = **${sum}**`;
            correctAnswer = rev.toString();
            explanation = `The second number is the **reverse** of ${num}.<br/>Reverse of ${num} is ${rev}.`;

            // Or "Find the special number" logic (Keep adding reverse until palindrome)
            if (Math.random() > 0.5) {
                type = 'palindrome_step';
                // Simple step 1
                num = randomInt(10, 80);
                rev = reverseNumber(num);
                sum = num + rev;
                // Ensure sum is palindrome?
                // e.g. 12 + 21 = 33 (Palindrome).
                // e.g. 19 + 91 = 110 (Not palindrome yet).
                // Let's stick to 1-step palindromes for Medium.
                // Limit num such that sum digits < 10.
                // a+b < 10.
                let a = randomInt(1, 4);
                let b = randomInt(1, 4);
                num = a * 10 + b;
                rev = reverseNumber(num);
                sum = num + rev;

                questionText = `Take **${num}**. Add its reverse **${rev}**. Is the answer a **special number** (reads same forwards and backwards)?`;
                correctAnswer = "Yes, it is " + sum; // Options will be "Yes, it is 66", "No", etc.
                explanation = `${num} + ${rev} = ${sum}.<br/>${sum} reads the same backwards. It is a palindrome!`;
            }
        } else { // Hard
            // Sums with Carry leading to 3 digits (e.g. 68 + 86 = 154).
            // Or finding the property.

            if (Math.random() > 0.5) {
                // Multi-step to palindrome
                // e.g. 68 + 86 = 154. 154 + 451 = 605. 605 + 506 = 1111.
                // Too hard.
                // Let's do: "The sum of a number and its reverse is 143. One number is 58? Wait 58+85=143."
                sum = 143;
                let a = randomInt(4, 9);
                let b = randomInt(4, 9);
                if ((a + b) !== 13) { a = 4; b = 9; } // Force 49/94 or 58/85, 67/76.
                num = a * 10 + b;
                rev = b * 10 + a;
                // Double check
                if (num + rev !== 143) {
                    // Fallback
                    num = 67; rev = 76; sum = 143;
                }

                questionText = `A number plus its reverse equals **${sum}**. If the number ends with **${num % 10}**, what is the number?`;
                correctAnswer = num.toString();
                explanation = `If sum is ${sum} and number ends in ${num % 10}, then it must start with ${rev % 10} (since ${num % 10}+${rev % 10} ends in 3).<br/>The number is ${num}. (${num} + ${rev} = ${sum})`;
            } else {
                // Divisibility Property
                // "When you add a 2-digit number to its reverse, the sum is ALWAYS divisible by..."
                questionText = `Complete the pattern: 12+21=33, 23+32=55, 45+54=99. All these sums can be divided by which number?`;
                correctAnswer = "11";
                explanation = `(10a + b) + (10b + a) = 11a + 11b = **11** × (a + b).<br/>So the sum is always divisible by 11.`;
            }
        }

        // Generate Options
        const correctVal = correctAnswer;
        const distractors = new Set([correctVal]);

        while (distractors.size < 4) {
            let d;
            if (parseInt(correctVal)) {
                d = (parseInt(correctVal) + randomInt(-10, 10)).toString();
                if (d === correctVal || d.length !== correctVal.length) continue;
            } else {
                // String options (for the "Yes..." case)
                if (correctVal.startsWith("Yes")) {
                    d = "No, it is " + (parseInt(sum) - 10);
                    distractors.add("No, it is not");
                    distractors.add("Yes, it is " + (parseInt(sum) + 11));
                    break;
                }
                d = randomInt(1, 20).toString();
            }
            if (d !== correctVal) distractors.add(d);
        }

        return {
            id: index,
            text: questionText,
            correctAnswer: correctVal,
            solution: explanation,
            num: num,
            rev: rev,
            shuffledOptions: Array.from(distractors).sort(() => Math.random() - 0.5)
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
            setFeedbackMessage("Magical! ✨");
        } else {
            setShowExplanationModal(true);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

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
                    <div className="title-area"><h1 className="results-title">Mirror Master!</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <h2 className="text-4xl font-black text-[#31326F] mb-6">Score: {score}/{TOTAL_QUESTIONS}</h2>
                    <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl" onClick={() => window.location.reload()}>Review Spells</button>
                </main>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif', background: 'radial-gradient(circle at center, #fdfbf7 0%, #eef2f3 100%)' }}>
            <header className="junior-practice-header">
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">
                    Q {qIndex + 1} / {TOTAL_QUESTIONS}
                </div>
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">
                    {formatTime(timeElapsed)}
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto p-4">

                    {/* Magic Mirror Visual */}
                    <div className="flex items-center gap-8 mb-12">
                        <div className="relative group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestion.num}
                                    initial={{ rotateY: 90 }}
                                    animate={{ rotateY: 0 }}
                                    className="w-32 h-40 bg-white border-4 border-[#31326F] rounded-2xl flex items-center justify-center shadow-xl mb-2"
                                >
                                    <span className="text-6xl font-black text-[#31326F]">{currentQuestion.num}</span>
                                </motion.div>
                            </AnimatePresence>
                            <div className="text-center font-bold text-gray-400">Number</div>
                        </div>

                        <div className="flex flex-col items-center">
                            <Sparkles size={40} className="text-yellow-400 animate-pulse mb-2" />
                            <Repeat size={40} className="text-[#4FB7B3]" />
                        </div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestion.rev}
                                    initial={{ rotateY: -90 }}
                                    animate={{ rotateY: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-32 h-40 bg-white border-4 border-[#4FB7B3] rounded-2xl flex items-center justify-center shadow-xl mb-2"
                                >
                                    <span className="text-6xl font-black text-[#4FB7B3]">{currentQuestion.rev}</span>
                                </motion.div>
                            </AnimatePresence>
                            <div className="text-center font-bold text-gray-400">Reverse</div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 shadow-lg w-full text-center">
                        <h2 className="text-3xl font-black text-[#31326F] mb-8 leading-relaxed">
                            <LatexContent html={currentQuestion.text} />
                        </h2>

                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {shuffledOptions.map((opt, i) => (
                                <button
                                    key={i}
                                    disabled={isSubmitted}
                                    onClick={() => handleAnswer(opt)}
                                    className={`
                                         p-6 rounded-2xl text-2xl font-bold transition-all border-4 relative overflow-hidden
                                         ${selectedOption === opt
                                            ? 'border-[#31326F] bg-blue-50 text-[#31326F]'
                                            : 'border-white bg-white shadow-md text-gray-600 hover:scale-105'}
                                         ${isSubmitted && opt === currentQuestion.correctAnswer ? '!border-green-500 !bg-green-100 !text-green-700' : ''}
                                         ${isSubmitted && selectedOption === opt && !isCorrect ? '!border-red-500 !bg-red-100 !text-red-700' : ''}
                                     `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    {isSubmitted && (
                        <div className={`mt-8 text-center font-bold text-xl ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                            {isCorrect ? feedbackMessage : "See the reflection..."}
                        </div>
                    )}
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

            {/* Standard Footer */}
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

export default MagicMirrorAddition;
