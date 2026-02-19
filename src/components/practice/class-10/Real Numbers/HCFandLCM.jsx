import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const HCFandLCM = () => {
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

    const SKILL_ID = 10205;
    const SKILL_NAME = "Finding HCF and LCM Using Prime Factors";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Definition HCF
            createQuestion(1,
                `To find HCF using prime factorisation, we take the product of the smallest power of each ______ prime factor.`,
                [`Common`, `All`, `Unique`, `Largest`],
                `Common`,
                `1. Definition:
   - HCF = Product of the smallest power of each common prime factor involved in the numbers.

2. Answer:
   - Common.`
            ),
            // 2. Definition LCM
            createQuestion(2,
                `To find LCM using prime factorisation, we take the product of the greatest power of ______ prime factor.`,
                [`Each`, `Common`, `Smallest`, `Only odd`],
                `Each`,
                `1. Definition:
   - LCM = Product of the greatest power of each prime factor involved in the numbers.

2. Answer:
   - Each.`
            ),
            // 3. Simple HCF LCM
            createQuestion(3,
                `Find HCF and LCM of 6 and 20.`,
                [`HCF=2, LCM=60`, `HCF=2, LCM=40`, `HCF=4, LCM=60`, `HCF=6, LCM=20`],
                `HCF=2, LCM=60`,
                `1. Factorise:
   - $6 = 2 \\times 3$
   - $20 = 2^2 \\times 5$

2. Find HCF:
   - Common factor with smallest power: $2^1 = 2$.

3. Find LCM:
   - All factors with greatest power: $2^2 \\times 3^1 \\times 5^1 = 4 \\times 3 \\times 5 = 60$.

4. Conclusion:
   - HCF=2, LCM=60.`
            ),
            // 4. Medium HCF LCM
            createQuestion(4,
                `Find the HCF of 96 and 404.`,
                [`4`, `2`, `8`, `12`],
                `4`,
                `1. Factorise:
   - $96 = 32 \\times 3 = 2^5 \\times 3$
   - $404 = 4 \\times 101 = 2^2 \\times 101$

2. Find HCF:
   - Smallest power of common factor 2 is $2^2 = 4$.

3. Conclusion:
   - Therefore, HCF is 4.`
            ),
            // 5. Calculate LCM from HCF
            createQuestion(5,
                `Given HCF(96, 404) = 4, find LCM(96, 404).`,
                [`9696`, `9600`, `9796`, `8686`],
                `9696`,
                `1. Use formula:
   - $LCM = \\frac{a \\times b}{HCF}$
   - $LCM = \\frac{96 \\times 404}{4}$

2. Calculate:
   - $96/4 = 24$
   - $24 \\times 404 = 9696$.

3. Conclusion:
   - Therefore, LCM is 9696.`
            ),
            // 6. 3 Numbers
            createQuestion(6,
                `Find the LCM of 6, 72, and 120.`,
                [`360`, `120`, `240`, `720`],
                `360`,
                `1. Factorise:
   - $6 = 2 \\times 3$
   - $72 = 8 \\times 9 = 2^3 \\times 3^2$
   - $120 = 8 \\times 15 = 2^3 \\times 3 \\times 5$

2. Find LCM:
   - Greatest powers: $2^3$, $3^2$, $5^1$.
   - $8 \\times 9 \\times 5 = 72 \\times 5 = 360$.

3. Conclusion:
   - LCM is 360.`
            ),
            // 7. 3 Numbers HCF
            createQuestion(7,
                `Find the HCF of 6, 72, and 120.`,
                [`6`, `12`, `3`, `2`],
                `6`,
                `1. Factorise:
   - $6 = 2^1 \\times 3^1$
   - $72 = 2^3 \\times 3^2$
   - $120 = 2^3 \\times 3^1 \\times 5^1$

2. Find HCF:
   - Common primes: 2 and 3.
   - Smallest powers: $2^1$ and $3^1$.
   - $2 \\times 3 = 6$.

3. Conclusion:
   - HCF is 6.`
            ),
            // 8. Properties
            createQuestion(8,
                `The product of two consecutive positive integers is always divisible by:`,
                [`2`, `3`, `5`, `7`],
                `2`,
                `1. Logic:
   - Converts rational logic. One of consecutive integers $(n, n+1)$ must be even.
   - So their product is always even, meaning divisible by 2.

2. Conclusion:
   - Therefore, 2.`
            ),
            // 9. Decimal Logic (Slightly tangential but good concept)
            createQuestion(9,
                `What is the HCF of the smallest prime number and the smallest composite number?`,
                [`2`, `4`, `1`, `3`],
                `2`,
                `1. Identify numbers:
   - Smallest prime = 2.
   - Smallest composite = 4.

2. Find HCF:
   - HCF(2, 4) = 2.

3. Conclusion:
   - Therefore, 2.`
            ),
            // 10. Large Number
            createQuestion(10,
                `Find the LCM of 12, 15, and 21.`,
                [`420`, `210`, `180`, `360`],
                `420`,
                `1. Factorise:
   - $12 = 2^2 \\times 3$
   - $15 = 3 \\times 5$
   - $21 = 3 \\times 7$

2. LCM:
   - $2^2 \\times 3 \\times 5 \\times 7$
   - $4 \\times 3 \\times 5 \\times 7 = 420$.

3. Conclusion:
   - Therefore, 420.`
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

export default HCFandLCM;
