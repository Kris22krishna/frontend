import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const HCFLCMApplications = () => {
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

    const SKILL_ID = 1116;
    const SKILL_NAME = "Applying HCF and LCM to Real-Life Situations";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Circular Track (LCM)
            createQuestion(1,
                `Sonia takes 18 mins and Ravi takes 12 mins to drive one round of a field. If they start at the same point and time, after how many minutes will they meet again at the start?`,
                [`36 mins`, `30 mins`, `24 mins`, `18 mins`],
                `36 mins`,
                `1. Analyze problem:
   - They meet again when both complete a whole number of rounds.
   - We need the LCM of 18 and 12.

2. Calculate LCM:
   - $18 = 2 \\times 3^2$
   - $12 = 2^2 \\times 3$
   - $LCM = 2^2 \\times 3^2 = 4 \\times 9 = 36$.

3. Conclusion:
   - They meet after 36 minutes.`
            ),
            // 2. Traffic Lights (LCM)
            createQuestion(2,
                `Traffic lights at three intersections change after 48s, 72s, and 108s. If they change together at 7:00:00 AM, at what time will they change together again?`,
                [`7:07:12 AM`, `7:07:00 AM`, `7:08:12 AM`, `7:06:12 AM`],
                `7:07:12 AM`,
                `1. Find LCM of 48, 72, 108:
   - $48 = 2^4 \\times 3$
   - $72 = 2^3 \\times 3^2$
   - $108 = 2^2 \\times 3^3$
   - $LCM = 2^4 \\times 3^3 = 16 \\times 27 = 432$ seconds.

2. Convert to minutes:
   - $432$ sec = $7$ min $12$ sec.

3. Add to start time:
   - 7:00:00 + 7m 12s = 7:07:12 AM.`
            ),
            // 3. Stacking Books (HCF)
            createQuestion(3,
                `A bookseller has 420 English books and 130 Science books. He wants to stack them such that each stack has the same number of books and takes up least area. Number of books in each stack?`,
                [`10`, `20`, `15`, `5`],
                `10`,
                `1. Analyze problem:
   - We need to split books into equal stacks. Maximize stack size to minimize area.
   - We need HCF of 420 and 130.

2. Calculate HCF:
   - $420 = 42 \\times 10 = 2 \\times 3 \\times 7 \\times 2 \\times 5 = 2^2 \\times 3 \\times 5 \\times 7$
   - $130 = 13 \\times 10 = 2 \\times 5 \\times 13$
   - Common factors: 2 and 5.
   - $HCF = 2 \\times 5 = 10$.

3. Conclusion:
   - 10 books per stack.`
            ),
            // 4. Tiles (HCF)
            createQuestion(4,
                `A room is 12m 95cm long and 3m 85cm broad. Finding the largest square tiles to pave the floor logically requires finding:`,
                [`HCF of dimensions`, `LCM of dimensions`, `Product of dimensions`, `Sum of dimensions`],
                `HCF of dimensions`,
                `1. Logic:
   - To fit exact number of square tiles, the side of the tile must divide both length and breadth.
   - For largest tile, we need Greatest Common Divisor (HCF).

2. Conclusion:
   - HCF of dimensions.`
            ),
            // 5. Morning Walk (LCM)
            createQuestion(5,
                `Three people step off together. Their steps measure 40 cm, 42 cm, and 45 cm. What is the minimum distance each should walk so that each covers the same distance in complete steps?`,
                [`2520 cm`, `2500 cm`, `2600 cm`, `2400 cm`],
                `2520 cm`,
                `1. Find LCM of 40, 42, 45:
   - $40 = 2^3 \\times 5$
   - $42 = 2 \\times 3 \\times 7$
   - $45 = 3^2 \\times 5$

2. Calculate LCM:
   - $2^3 \\times 3^2 \\times 5 \\times 7$
   - $8 \\times 9 \\times 5 \\times 7 = 72 \\times 35 = 2520$.

3. Conclusion:
   - 2520 cm.`
            ),
            // 6. Milk Containers (HCF)
            createQuestion(6,
                `Two tankers contain 850 litres and 680 litres of milk. Find the max capacity of a container which can measure the milk of either tanker in exact number of times.`,
                [`170 litres`, `150 litres`, `17 litres`, `50 litres`],
                `170 litres`,
                `1. Find HCF of 850 and 680:
   - $850 = 17 \\times 50 = 2 \\times 5^2 \\times 17$
   - $680 = 17 \\times 40 = 2^3 \\times 5 \\times 17$

2. Calculate HCF:
   - Common factors: $2^1, 5^1, 17^1$.
   - $2 \\times 5 \\times 17 = 170$.

3. Conclusion:
   - 170 litres.`
            ),
            // 7. Divisibility Proof
            createQuestion(7,
                `Check whether $4^n$ can end with the digit 0 for any natural number n.`,
                [`No`, `Yes`, `Only for even n`, `Only for odd n`],
                `No`,
                `1. Analysis:
   - $4^n = (2^2)^n = 2^{2n}$.
   - Prime factorisation contains only 2.
   - To end in 0, it must contain both 2 and 5.

2. Conclusion:
   - Therefore, No.`
            ),
            // 8. Least number divisible
            createQuestion(8,
                `Find the least number which is divisible by all numbers from 1 to 5 (inclusive).`,
                [`60`, `30`, `20`, `120`],
                `60`,
                `1. Find LCM of 1, 2, 3, 4, 5:
   - $1=1, 2=2, 3=3, 4=2^2, 5=5$.
   - $LCM = 2^2 \\times 3 \\times 5 = 4 \\times 15 = 60$.

2. Conclusion:
   - 60.`
            ),
            // 9. Least number divisible 1-10
            createQuestion(9,
                `Find the least number divisible by all numbers from 1 to 10 (inclusive).`,
                [`2520`, `1260`, `5040`, `100`],
                `2520`,
                `1. Find LCM of numbers 1 to 10:
   - Factors involved: $2^3$ (from 8), $3^2$ (from 9), $5$ (from 5, 10), $7$ (from 7).
   - $LCM = 8 \\times 9 \\times 5 \\times 7$.
   - $72 \\times 35 = 2520$.

2. Conclusion:
   - 2520.`
            ),
            // 10. Alarm Clocks
            createQuestion(10,
                `Three alarms ring at intervals of 4, 12, and 20 minutes. If they ring together now, after how many minutes will they ring together again?`,
                [`60`, `30`, `40`, `50`],
                `60`,
                `1. Find LCM of 4, 12, 20:
   - $4 = 2^2$
   - $12 = 2^2 \\times 3$
   - $20 = 2^2 \\times 5$
   - $LCM = 2^2 \\times 3 \\times 5 = 4 \\times 15 = 60$.

2. Conclusion:
   - After 60 minutes.`
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

export default HCFLCMApplications;
