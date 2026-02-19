import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const FundamentalTheoremArithmetic = () => {
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

    const SKILL_ID = 10204;
    const SKILL_NAME = "Uniqueness of Prime Factorisation (Fundamental Theorem)";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Theorem Statement
            createQuestion(1,
                `The Fundamental Theorem of Arithmetic states that every composite number can be expressed as a product of primes in a ______ way.`,
                [`Unique`, `Random`, `Different`, `Complex`],
                `Unique`,
                `1. Statement:
   - Every composite number can be uniquely expressed as a product of primes, apart from the order of factors.

2. Answer:
   - Unique.`
            ),
            // 2. Canonical Form
            createQuestion(2,
                `If we ignore the order, the prime factorisation of any composite number is:`,
                [`Unique`, `Not unique`, `Dependent on method`, `Infinite`],
                `Unique`,
                `1. Concept:
   - Whether you use a factor tree or division method, the set of prime factors is always the same for a given number.

2. Conclusion:
   - It is unique.`
            ),
            // 3. Reasoning (Ending in 0)
            createQuestion(3,
                `Check whether $12^n$ can end with the digit 0 for any natural number n.`,
                [`No`, `Yes`, `Only for even n`, `Only for odd n`],
                `No`,
                `1. Analysis:
   - $12^n = (2^2 \\times 3)^n = 2^{2n} \\times 3^n$.
   - Prime factors is 2 and 3.
   - To end in 0, it must contain prime factor 5.
   - Uniqueness of Fundamental Theorem guarantees no other primes.

2. Conclusion:
   - No, it cannot end with 0.`
            ),
            // 4. Power of 2
            createQuestion(4,
                `In the prime factorisation of 144, what is the exponent of 2?`,
                [`4`, `3`, `5`, `2`],
                `4`,
                `1. Factorise 144:
   - $144 = 12 \\times 12$
   - $12 = 2^2 \\times 3$
   - $144 = (2^2 \\times 3)^2 = 2^4 \\times 3^2$

2. Identify exponent:
   - The exponent of 2 is 4.

3. Conclusion:
   - Therefore, 4.`
            ),
            // 5. Sum of Exponents
            createQuestion(5,
                `The sum of exponents of prime factors in the prime factorisation of 196 is:`,
                [`4`, `3`, `5`, `2`],
                `4`,
                `1. Factorise 196:
   - $196 = 14^2 = (2 \\times 7)^2 = 2^2 \\times 7^2$.

2. Sum exponents:
   - Exponents are 2 and 2.
   - Sum = $2 + 2 = 4$.

3. Conclusion:
   - Therefore, 4.`
            ),
            // 6. Ending Digit
            createQuestion(6,
                `Can the number $6^n$, where n is a natural number, end with the digit 5?`,
                [`No`, `Yes`, `For odd n`, `For even n`],
                `No`,
                `1. Analysis:
   - $6^n = (2 \\times 3)^n = 2^n \\times 3^n$.
   - For a number to end in 5, its prime factorisation must contain 5.

2. Check factors:
   - Key factors are 2 and 3. No 5.

3. Conclusion:
   - Therefore, No.`
            ),
            // 7. Check Composite
            createQuestion(7,
                `Explain why $7 \\times 11 \\times 13 + 13$ is a composite number.`,
                [`It has a factor 13`, `It is prime`, `It is odd`, `It ends in 1`],
                `It has a factor 13`,
                `1. Simplify expression:
   - $13 \\times (7 \\times 11 + 1)$
   - $13 \\times (77 + 1)$
   - $13 \\times 78$

2. Reason:
   - Since it can be written as a product of two numbers greater than 1 ($13 \\times 78$), it has factors other than 1 and itself.

3. Conclusion:
   - Therefore, it is composite because it has a factor 13 (and others).`
            ),
            // 8. HCF Relation
            createQuestion(8,
                `HCF(a, b) $\\times$ LCM(a, b) is equal to:`,
                [`$a \\times b$`, `$a + b$`, `$a / b$`, `$a - b$`],
                `$a \\times b$`,
                `1. Theorem:
   - For any two positive integers a and b, HCF(a, b) $\\times$ LCM(a, b) = $a \\times b$.

2. Conclusion:
   - Product of the numbers.`
            ),
            // 9. LCM Calculation
            createQuestion(9,
                `If HCF(306, 657) = 9, find LCM(306, 657).`,
                [`22338`, `22388`, `23338`, `32238`],
                `22338`,
                `1. Use formula:
   - $LCM = \\frac{a \\times b}{HCF}$
   - $LCM = \\frac{306 \\times 657}{9}$

2. Calculate:
   - $306/9 = 34$
   - $34 \\times 657 = 22338$.

3. Conclusion:
   - LCM is 22338.`
            ),
            // 10. Factor of LCM
            createQuestion(10,
                `If HCF of two numbers is 145, their LCM can be:`,
                [`435`, `256`, `312`, `100`],
                `435`,
                `1. Property:
   - HCF must always be a factor of LCM.

2. Check divisibility by 145:
   - $435 \\div 145 = 3$ (Integer).
   - Others are not divisible.

3. Conclusion:
   - Therefore, 435.`
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

export default FundamentalTheoremArithmetic;
