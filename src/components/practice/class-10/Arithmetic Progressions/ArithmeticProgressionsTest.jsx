import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const ArithmeticProgressionsTest = () => {
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

    const SKILL_ID = 1110; // Arithmetic Progressions Chapter Test
    const SKILL_NAME = "Arithmetic Progressions - Chapter Test";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // 2 Questions from each topic
        const pool = [
            // Topic 1
            createQuestion(1,
                `In a savings scheme, a student saves ₹50 in the first week, ₹60 in the second, ₹70 in the third, and so on. What is the amount saved in the 5th week?`,
                [`₹80`, `₹90`, `₹100`, `₹110`],
                `₹90`,
                `1. Identify the first term (a) and common difference (d):
   - Savings in 1st week ($a$) = ₹50
   - Savings in 2nd week = ₹60
   - Difference ($d$) = $60 - 50 = 10$
   - This forms an Arithmetic Progression: 50, 60, 70...

2. Find the savings for subsequent weeks by adding $d$:
   - 3rd week = $60 + 10$ = ₹70
   - 4th week = $70 + 10$ = ₹80
   - 5th week = $80 + 10$ = ₹90

3. Conclusion:
   - Therefore, the amount saved in the 5th week is ₹90.`
            ),
            createQuestion(2,
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
            // Topic 2
            createQuestion(3,
                `Which of the following sequences is an Arithmetic Progression (AP)?`,
                [`1, 2, 3, 4...`, `1, 2, 4, 8...`, `1, 3, 9, 27...`, `1, 1, 2, 3...`],
                `1, 2, 3, 4...`,
                `1. Check differences for each sequence:
   - Sequence 1: 1, 2, 3, 4...
     $2-1=1$, $3-2=1$, $4-3=1$ (Constant difference)
   - Sequence 2: 1, 2, 4, 8...
     $2-1=1$, $4-2=2$ (Difference changes)

2. Conclusion:
   - Since the first sequence has a constant common difference ($d=1$), it is an Arithmetic Progression.`
            ),
            createQuestion(4,
                `Find the common difference 'd' of the AP: 2, 4, 6, 8...`,
                [`2`, `4`, `-2`, `0`],
                `2`,
                `1. Identify consecutive terms:
   - $a_1 = 2$
   - $a_2 = 4$

2. Calculate the difference:
   - $d = a_2 - a_1$
   - $d = 4 - 2 = 2$

3. Conclusion:
   - Therefore, the common difference $d$ is 2.`
            ),
            // Topic 3
            createQuestion(5,
                `Find the first term $a$ and common difference $d$ for the AP: $-5, -1, 3, 7...$`,
                [`a = -5, d = 4`, `a = -5, d = -4`, `a = 5, d = 4`, `a = -1, d = 4`],
                `a = -5, d = 4`,
                `1. Find the first term ($a$):
   - The first number in the sequence is -5.
   - So, $a = -5$.

2. Find the common difference ($d$):
   - $d = a_2 - a_1$
   - $d = -1 - (-5)$
   - $d = -1 + 5 = 4$

3. Conclusion:
   - Therefore, $a = -5$ and $d = 4$.`
            ),
            createQuestion(6,
                `Find the common difference of the AP: $\\frac{1}{3}, \\frac{5}{3}, \\frac{9}{3}, \\frac{13}{3}...$`,
                [`\\frac{4}{3}`, `\\frac{1}{3}`, `\\frac{2}{3}`, `4`],
                `\\frac{4}{3}`,
                `1. Identify terms:
   - First term ($a_1$) = $\\frac{1}{3}$
   - Second term ($a_2$) = $\\frac{5}{3}$

2. Calculate difference:
   - $d = a_2 - a_1$
   - $d = \\frac{5}{3} - \\frac{1}{3}$
   - $d = \\frac{5-1}{3} = \\frac{4}{3}$

3. Conclusion:
   - Therefore, the common difference is $\\frac{4}{3}$.`
            ),
            // Topic 4
            createQuestion(7,
                `Find the 10th term of the AP: 2, 7, 12...`,
                [`47`, `52`, `45`, `50`],
                `47`,
                `1. Identify the parameters:
   - First term ($a$) = 2
   - Common difference ($d$) = $7 - 2 = 5$
   - Number of terms ($n$) = 10

2. Apply the formula:
   - $a_n = a + (n-1)d$
   - $a_{10} = 2 + (10 - 1)5$
   - $a_{10} = 2 + 9(5)$
   - $a_{10} = 2 + 45 = 47$

3. Conclusion:
   - Therefore, the 10th term is 47.`
            ),
            createQuestion(8,
                `Subba Rao started work at a salary of ₹5000 and received an increment of ₹200 each year. In which year did his salary reach ₹7000?`,
                [`11th year`, `10th year`, `12th year`, `20th year`],
                `11th year`,
                `1. Identify the Arithmetic Progression parameters:
   - Initial salary ($a$) = ₹5000
   - Annual increment ($d$) = ₹200
   - Final salary ($a_n$) = ₹7000

2. Use the formula $a_n = a + (n-1)d$:
   - $7000 = 5000 + (n-1)200$
   - $2000 = (n-1)200$
   - $10 = n - 1$
   - $n = 11$

3. Conclusion:
   - Therefore, in the 11th year, his salary reached ₹7000.`
            ),
            // Topic 5
            createQuestion(9,
                `Find the sum of the first 22 terms of the AP: 8, 3, -2...`,
                [`-979`, `-1000`, `-970`, `-989`],
                `-979`,
                `1. Identify parameters:
   - $a = 8$
   - $d = 3 - 8 = -5$
   - $n = 22$

2. Apply the sum formula:
   - $S_n = \\frac{n}{2}[2a + (n-1)d]$
   - $S_{22} = \\frac{22}{2}[2(8) + (22-1)(-5)]$
   - $S_{22} = 11[16 + 21(-5)]$
   - $S_{22} = 11[16 - 105]$
   - $S_{22} = 11(-89)$
   - $S_{22} = -979$

3. Conclusion:
   - Therefore, the sum is -979.`
            ),
            createQuestion(10,
                `How many terms of the AP: 24, 21, 18... must be taken so that their sum is 78?`,
                [`4 or 13`, `4 only`, `13 only`, `5 or 12`],
                `4 or 13`,
                `1. Identify parameters:
   - $a = 24$, $d = -3$, $S_n = 78$

2. Set up the equation:
   - $78 = \\frac{n}{2}[2(24) + (n-1)(-3)]$
   - $156 = n[48 - 3n + 3]$
   - $156 = n[51 - 3n]$
   - $156 = 51n - 3n^2$

3. Solve the quadratic equation:
   - $3n^2 - 51n + 156 = 0$
   - $n^2 - 17n + 52 = 0$ (Divide by 3)
   - $(n - 4)(n - 13) = 0$
   - $n = 4$ or $n = 13$

4. Conclusion:
   - Both values are positive integers, so both are valid answers.
   - Therefore, 4 or 13 terms.`
            )
        ];

        // Shuffle questions
        return pool.sort(() => Math.random() - 0.5);
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

export default ArithmeticProgressionsTest;
