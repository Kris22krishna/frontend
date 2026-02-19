import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const RecognisingPatterns = () => {
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

    const SKILL_ID = 1105; // Recognising and Describing Number Patterns
    const SKILL_NAME = "Recognising and Describing Number Patterns";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Patterns in real-life situations (Easy)
            createQuestion(1,
                `In a savings scheme, a student saves ₹50 in the first week, ₹60 in the second, ₹70 in the third, and so on. What is the amount saved in the 5th week?`,
                [`₹80`, `₹90`, `₹100`, `₹110`],
                `₹90`,
                `1. Identify the first term (a) and common difference (d):
   - Savings in 1st week ($a$) = ₹50
   - Savings in 2nd week = ₹60
   - Difference ($d$) = ₹60 - ₹50 = ₹10
   - This forms an Arithmetic Progression: 50, 60, 70...

2. Find the savings for subsequent weeks by adding $d$:
   - 3rd week = $60 + 10$ = ₹70
   - 4th week = $70 + 10$ = ₹80
   - 5th week = $80 + 10$ = ₹90

3. Conclusion:
   - Therefore, the amount saved in the 5th week is ₹90.`
            ),
            // 2. Patterns in real-life situations (Easy)
            createQuestion(2,
                `A taxi fare is ₹15 for the first km and increases by ₹8 for each additional km. What is the fare for 3 km?`,
                [`₹23`, `₹31`, `₹39`, `₹47`],
                `₹31`,
                `1. Identify the initial fare and increment:
   - Fare for 1st km ($a$) = ₹15
   - Additional fare per km ($d$) = ₹8

2. Calculate the fare step-by-step:
   - Fare for 1 km = ₹15
   - Fare for 2 km = ₹15 + ₹8 = ₹23
   - Fare for 3 km = ₹23 + ₹8 = ₹31

3. Conclusion:
   - Therefore, the fare for 3 km is ₹31.`
            ),
            // 3. Patterns in real-life situations (Medium)
            createQuestion(3,
                `A bacterial culture doubles every hour. If there are 100 bacteria initially, how many will there be after 4 hours?`,
                [`400`, `800`, `1600`, `3200`],
                `1600`,
                `1. Identify the initial amount and growth pattern:
   - Initial bacteria = 100
   - Pattern: Doubles every hour (Multiply by 2)

2. Calculate population hour by hour:
   - At start (0 hr) = 100
   - After 1 hour = $100 \\times 2$ = 200
   - After 2 hours = $200 \\times 2$ = 400
   - After 3 hours = $400 \\times 2$ = 800
   - After 4 hours = $800 \\times 2$ = 1600

3. Conclusion:
   - Therefore, there will be 1600 bacteria after 4 hours.
   - Note: This is not an Arithmetic Progression because we are multiplying, not adding.`
            ),
            // 4. Sequences formed by repeated addition (Easy)
            createQuestion(4,
                `Write the next term of the sequence formed by adding 4 to the previous term, starting with 3.`,
                [`7`, `4`, `12`, `15`],
                `7`,
                `1. Identify the starting number and the rule:
   - First term = 3
   - Rule = Add 4 to the previous term

2. Apply the rule:
   - Next term = $3 + 4$ = 7

3. Conclusion:
   - Therefore, the next term in the sequence is 7.`
            ),
            // 5. Sequences formed by repeated addition (Medium)
            createQuestion(5,
                `Identify the rule for the sequence: 100, 95, 90, 85...`,
                [`Subtract 5`, `Add 5`, `Subtract 10`, `Divide by 5`],
                `Subtract 5`,
                `1. Find the difference between consecutive terms:
   - $95 - 100 = -5$
   - $90 - 95 = -5$
   - $85 - 90 = -5$

2. Analyze the result:
   - The difference is constant: -5.
   - This means we subtract 5 to get the next term.

3. Conclusion:
   - Therefore, the rule for the sequence is "Subtract 5".`
            ),
            // 6. Sequences formed by repeated addition (Medium)
            createQuestion(6,
                `Find the missing term in the additive sequence: 2, __, 12, 17, 22.`,
                [`7`, `6`, `8`, `5`],
                `7`,
                `1. Find the common difference from known terms:
   - $17 - 12 = 5$
   - $22 - 17 = 5$
   - So, the common difference $d = 5$.

2. Find the missing term:
   - Missing term = First term + $d$
   - Missing term = $2 + 5$ = 7

3. Verify with the next term:
   - $7 + 5$ = 12 (Matches the third term).

4. Conclusion:
   - Therefore, the missing term is 7.`
            ),
            // 7. Distinguishing additive and non-additive patterns (Medium)
            createQuestion(7,
                `Which of the following describes an additive pattern (Arithmetic Progression)?`,
                [`2, 4, 8, 16...`, `3, 6, 9, 12...`, `1, 4, 9, 16...`, `1, 1, 2, 3...`],
                `3, 6, 9, 12...`,
                `1. Check differences for each option:
   - (A) $4-2=2$, $8-4=4$ (Differences not same)
   - (B) $6-3=3$, $9-6=3$, $12-9=3$ (Constant difference of 3)
   - (C) $4-1=3$, $9-4=5$ (Differences not same)
   - (D) $1-1=0$, $2-1=1$ (Differences not same)

2. Conclusion:
   - Option (B) has a constant difference.
   - Therefore, 3, 6, 9, 12... is an Arithmetic Progression.`
            ),
            // 8. Distinguishing additive and non-additive patterns (Medium)
            createQuestion(8,
                `Consider the pattern of squares of numbers: 1, 4, 9, 16, 25... Is this an Arithmetic Progression?`,
                [`Yes`, `No`, `Maybe`, `Cannot determine`],
                `No`,
                `1. List first few terms:
   - $1^2=1, 2^2=4, 3^2=9, 4^2=16, 5^2=25$

2. Calculate differences between consecutive terms:
   - $4 - 1 = 3$
   - $9 - 4 = 5$
   - $16 - 9 = 7$

3. Conclusion:
   - The differences (3, 5, 7...) are not constant.
   - Therefore, this is No, not an Arithmetic Progression.`
            ),
            // 9. Distinguishing additive and non-additive (Hard)
            createQuestion(9,
                `Which situation forms an Arithmetic Progression?`,
                [`Amount of air in a cylinder when 1/4th is removed repeatedly`, `Money in account with Compound Interest`, `Money in account with Simple Interest`, `Bacteria doubling every hour`],
                `Money in account with Simple Interest`,
                `1. Analyze each situation:
   - (A) Removing 1/4th leaves 3/4th. This is multiplying by 3/4 (Geometric).
   - (B) Compound Interest multiplies the principal by $(1+r/100)$ each year (Geometric).
   - (C) Simple Interest adds a fixed interest ($I = PRT/100$) every year (Arithmetic).
   - (D) Doubling means multiplying by 2 (Geometric).

2. Conclusion:
   - Only Simple Interest has a fixed amount added repeatedly.
   - Therefore, Money in account with Simple Interest forms an AP.`
            ),
            // 10. Complex Pattern (Hard)
            createQuestion(10,
                `A ladder has rungs 25 cm apart. The rungs decrease uniformly in length from 45 cm at the bottom to 25 cm at the top. Does the length of rungs form an AP?`,
                [`Yes`, `No`, `Only if 10 rungs`, `Data insufficient`],
                `Yes`,
                `1. Analyze the pattern:
   - "Decrease uniformly" means a fixed length is subtracted from each rung to get the size of the next rung.
   - A constant difference between consecutive terms is the definition of an AP.

2. Conclusion:
   - Since the difference is constant (uniform decrease), the lengths of the rungs form an Arithmetic Progression.
   - Therefore, Yes.`
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

export default RecognisingPatterns;
