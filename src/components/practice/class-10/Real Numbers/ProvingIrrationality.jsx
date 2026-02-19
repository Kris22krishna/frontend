import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const ProvingIrrationality = () => {
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

    const SKILL_ID = 1117;
    const SKILL_NAME = "Proving the Irrationality of Numbers";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Definition of Rational
            createQuestion(1,
                `To prove $\\sqrt{2}$ is irrational, we start by assuming it is rational. This means it can be written as:`,
                [`$a/b$ where $b \\neq 0$ and a,b are co-prime`, `$a \\times b$`, `$a - b$`, `$a^b$`],
                `$a/b$ where $b \\neq 0$ and a,b are co-prime`,
                `1. Proof by Contradiction step 1:
   - Assume $\\sqrt{2}$ is rational.
   - Therefore, $\\sqrt{2} = \\frac{a}{b}$ where $a$ and $b$ are co-prime integers and $b \\neq 0$.

2. Conclusion:
   - $a/b$ form.`
            ),
            // 2. Theorem used in proof
            createQuestion(2,
                `If a prime number $p$ divides $a^2$, then $p$ divides ______ (where a is a positive integer).`,
                [`$a$`, `$a^3$`, `$2a$`, `None of these`],
                `$a$`,
                `1. Theorem:
   - Let $p$ be a prime number. If $p$ divides $a^2$, then $p$ divides $a$.

2. Conclusion:
   - $p$ divides $a$.`
            ),
            // 3. Contradiction Logic
            createQuestion(3,
                `In the proof for $\\sqrt{3}$, we eventually show that both $a$ and $b$ have a common factor ______, contradicting the assumption they are co-prime.`,
                [`3`, `2`, `5`, `7`],
                `3`,
                `1. Proof logic:
   - $\\sqrt{3} = a/b \\Rightarrow 3b^2 = a^2$. So $a$ is div by 3.
   - Let $a=3c$. Then $3b^2 = 9c^2 \\Rightarrow b^2 = 3c^2$. So $b$ is div by 3.
   - Common factor 3.

2. Conclusion:
   - Common factor 3.`
            ),
            // 4. Square of Root
            createQuestion(4,
                `If $\\sqrt{5} = \\frac{a}{b}$, squaring both sides gives:`,
                [`$5b^2 = a^2$`, `$5a^2 = b^2$`, `$25b^2 = a^2$`, `$b^2 = 5a^2$`],
                `$5b^2 = a^2$`,
                `1. Calculation:
   - $\\sqrt{5} = \\frac{a}{b}$
   - Square both sides: $5 = \\frac{a^2}{b^2}$.
   - Cross multiply: $5b^2 = a^2$.

2. Conclusion:
   - $5b^2 = a^2$.`
            ),
            // 5. Irrationality of Root p
            createQuestion(5,
                `$\\sqrt{p}$ is irrational if $p$ is:`,
                [`A prime number`, `A perfect square`, `An even number`, `An odd number`],
                `A prime number`,
                `1. Property:
   - Square root of any prime number ($2, 3, 5, 7, ...$) is irrational.

2. Conclusion:
   - A prime number.`
            ),
            // 6. Logic check
            createQuestion(6,
                `Which method is used to prove that $\\sqrt{2}$ is irrational?`,
                [`Proof by Contradiction`, `Proof by Induction`, `Direct Calculation`, `Geometry`],
                `Proof by Contradiction`,
                `1. Method name:
   - We assume the opposite (rational) and find a contradiction.
   - This suggests Proof by Contradiction.

2. Conclusion:
   - Proof by Contradiction.`
            ),
            // 7. Divisibility check
            createQuestion(7,
                `If $a^2$ is divisible by 5, then $a$ is divisible by:`,
                [`5`, `25`, `10`, `Not necessarily 5`],
                `5`,
                `1. Application of Theorem:
   - Since 5 is prime, if it divides $a^2$, it must divide $a$.

2. Conclusion:
   - 5.`
            ),
            // 8. Generalization
            createQuestion(8,
                `Can we prove $\\sqrt{n-1} + \\sqrt{n+1}$ is irrational using algebraic manipulation?`,
                [`Yes`, `No`, `Only for n=0`, `Depends on n`],
                `Yes`,
                `1. Logic:
   - Generally yes, assuming $\\sqrt{n-1} + \\sqrt{n+1} = r$ (rational) leads to contradictions or allows expressing simplified roots as rational, which is false if they aren't perfect squares.

2. Conclusion:
   - Yes.`
            ),
            // 9. Proof Logic
            createQuestion(9,
                `If $\\sqrt{3} = a/b$ (in simplest form), then $3$ divides $a$. This implies we can write $a$ as:`,
                [`$3c$ for some integer c`, `$3c + 1$`, `$c/3$`, `$c^3$`],
                `$3c$ for some integer c`,
                `1. Definition of Divisibility:
   - If a number $a$ is divisible by 3, it is a multiple of 3.
   - So $a = 3c$ where $c$ is an integer.

2. Conclusion:
   - $3c$.`
            ),
            // 10. Proof step
            createQuestion(10,
                `In proving $\\sqrt{2}$ irrational, finding common factor 2 contradicts the fact that:`,
                [`a and b are co-prime`, `a and b are integers`, `b is not zero`, `a is not zero`],
                `a and b are co-prime`,
                `1. Assumption:
   - We assume rational number is in simplest form ($a/b$), meaning $GCD(a,b)=1$ (co-prime).
   - Finding a common factor > 1 contradicts this.

2. Conclusion:
   - a and b are co-prime.`
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

export default ProvingIrrationality;
