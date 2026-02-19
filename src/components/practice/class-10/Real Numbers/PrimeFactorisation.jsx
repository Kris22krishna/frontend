import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const PrimeFactorisation = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 10203;
    const SKILL_NAME = "Breaking Numbers into Prime Factors";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Definition
            createQuestion(1,
                `Which of these is a prime number?`,
                [`29`, `27`, `21`, `9`],
                `29`,
                `1. Definition:
   - A prime number has exactly two factors: 1 and itself.

2. Analyze options:
   - $27 = 3 \\times 9$ (Composite)
   - $21 = 3 \\times 7$ (Composite)
   - $9 = 3 \\times 3$ (Composite)
   - 29 has only factors 1 and 29.

3. Conclusion:
   - Therefore, 29 is prime.`
            ),
            // 2. Simple Factorisation
            createQuestion(2,
                `Express 140 as a product of its prime factors.`,
                [`$2^2 \\times 5 \\times 7$`, `$2^2 \\times 3 \\times 5$`, `$2 \\times 5 \\times 7$`, `$2^3 \\times 5$`],
                `$2^2 \\times 5 \\times 7$`,
                `1. Factorise 140:
   - $140 = 2 \\times 70$
   - $70 = 2 \\times 35$
   - $35 = 5 \\times 7$

2. Combine:
   - $140 = 2 \\times 2 \\times 5 \\times 7 = 2^2 \\times 5 \\times 7$.

3. Conclusion:
   - Therefore, the correct form is $2^2 \\times 5 \\times 7$.`
            ),
            // 3. Medium Factorisation
            createQuestion(3,
                `Write the prime factorisation of 156.`,
                [`$2^2 \\times 3 \\times 13$`, `$2 \\times 3 \\times 13$`, `$2^3 \\times 13$`, `$2 \\times 3^2 \\times 13$`],
                `$2^2 \\times 3 \\times 13$`,
                `1. Factorise 156:
   - $156 = 2 \\times 78$
   - $78 = 2 \\times 39$
   - $39 = 3 \\times 13$

2. Combine:
   - $156 = 2^2 \\times 3 \\times 13$.

3. Conclusion:
   - Therefore, the prime factorisation is $2^2 \\times 3 \\times 13$.`
            ),
            // 4. Large Number
            createQuestion(4,
                `Find the prime factors of 3825.`,
                [`$3^2 \\times 5^2 \\times 17$`, `$3^3 \\times 5 \\times 17$`, `$3 \\times 5^2 \\times 19$`, `$3^2 \\times 5 \\times 13$`],
                `$3^2 \\times 5^2 \\times 17$`,
                `1. Factorise 3825:
   - Ends in 5, divisible by 5. $3825 = 5 \\times 765$.
   - $765 = 5 \\times 153$.
   - $153$ sum of digits = 9, so divisible by 9 (or $3^2$). $153 = 9 \\times 17 = 3^2 \\times 17$.

2. Combine:
   - $3825 = 5^2 \\times 3^2 \\times 17$.

3. Conclusion:
   - Therefore, $3^2 \\times 5^2 \\times 17$.`
            ),
            // 5. Composite Definition
            createQuestion(5,
                `A composite number must have at least ____ factors.`,
                [`3`, `2`, `1`, `4`],
                `3`,
                `1. Definition:
   - Primes have exactly 2 factors (1 and self).
   - Composite numbers must have at least one more factor.

2. Conclusion:
   - Therefore, at least 3 factors (1, self, and another).`
            ),
            // 6. Factor Tree
            createQuestion(6,
                `In a factor tree for 1001, if first splitting is $7 \\times x$, what is $x$?`,
                [`143`, `153`, `133`, `123`],
                `143`,
                `1. Division:
   - $1001 \\div 7 = ?$
   - $7 \\times 100 = 700$. Remainder 301.
   - $301 \\div 7 = 43$.
   - So $143$.

2. Conclusion:
   - Therefore, $x = 143$.`
            ),
            // 7. Conceptual
            createQuestion(7,
                `Every composite number can be expressed as a product of primes, and this factorisation is unique, apart from...`,
                [`The order of factors`, `The sign of factors`, `The size of factors`, `None of these`],
                `The order of factors`,
                `1. Fundamental Theorem of Arithmetic:
   - Factorisation is unique apart from the order in which the prime factors occur.

2. Conclusion:
   - Therefore, the order of factors.`
            ),
            // 8. Finding n
            createQuestion(8,
                `If $4^n$ ends with digit 0, then prime factorisation of 4 must contain:`,
                [`5`, `3`, `7`, `11`],
                `5`,
                `1. Logic:
   - For a number to end in 0, it must be divisible by 10 (i.e., $2 \\times 5$).
   - Prime factors of 4 are only 2s ($2^2$).

2. Missing factor:
   - It needs a 5 to end in 0.

3. Conclusion:
   - Therefore, it must contain 5.`
            ),
            // 9. Identifying Factor
            createQuestion(9,
                `What is the missing factor in $5005 = 5 \\times 7 \\times 11 \\times ?$`,
                [`13`, `17`, `19`, `23`],
                `13`,
                `1. Calculate:
   - $5 \\times 7 \\times 11 = 35 \\times 11 = 385$.
   - $5005 \\div 385 = 13$.

2. Conclusion:
   - Therefore, the missing factor is 13.`
            ),
            // 10. Large Factorisation
            createQuestion(10,
                `Express 7429 as a product of primes.`,
                [`$17 \\times 19 \\times 23$`, `$17 \\times 19 \\times 29$`, `$13 \\times 17 \\times 23$`, `$19 \\times 23 \\times 29$`],
                `$17 \\times 19 \\times 23$`,
                `1. Trial division:
   - Not divisible by 2, 3, 5.
   - Try 7: No.
   - Try 17: $7429 \\div 17 = 437$.
   - Try 19 with 437: $437 \\div 19 = 23$.
   - 23 is prime.

2. Combine:
   - $7429 = 17 \\times 19 \\times 23$.

3. Conclusion:
   - Therefore, the product is $17 \\times 19 \\times 23$.`
            )
        ];

        return qs;
    };

    useEffect(() => {
        setQuestions(generateQuestions());
    }, []);

    // Restore state when qIndex changes
    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    const CORRECT_MESSAGES = ["Good job!", "Excellent!", "Perfect!", "Well done!"];
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [SKILL_ID]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: selectedOption,
                isCorrect: isRight
            }
        }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            let t = accumulatedTime.current;
            if (isTabActive.current) t += Date.now() - questionStartTime.current;
            const sec = Math.max(0, Math.round(t / 1000));
            api.recordAttempt({
                user_id: parseInt(userId), session_id: sessionId, skill_id: SKILL_ID,
                question_text: currentQ.text, correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption, is_correct: isRight, solution_text: currentQ.solution,
                time_spent_seconds: sec
            }).catch(console.error);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / questions.length) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: questions.length,
                        correct_answers: totalCorrect,
                        timestamp: new Date().toISOString(),
                        time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>
                    {SKILL_NAME}
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
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
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => !isSubmitted && setSelectedOption(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                    {isSubmitted && isCorrect && (
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                            {feedbackMessage}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="nav-pill-next-btn bg-gray-200 text-gray-600"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} />
                                Prev
                            </button>
                            {isSubmitted ?
                                <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight /></button> :
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check /></button>
                            }
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="mobile-footer-right">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ minWidth: 'auto' }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                        {isSubmitted ?
                            <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight size={20} /></button> :
                            <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={20} /></button>
                        }
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PrimeFactorisation;
