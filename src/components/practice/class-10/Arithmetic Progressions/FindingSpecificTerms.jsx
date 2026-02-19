import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const FindingSpecificTerms = () => {
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

    const SKILL_ID = 1108; // Finding Specific Terms of an AP
    const SKILL_NAME = "Finding Specific Terms of an AP";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Formula (Easy)
            createQuestion(1,
                `Identify the correct formula for the $n^{th}$ term ($a_n$) of an AP with first term 'a' and common difference 'd'.`,
                [`an = a + (n-1)d`, `an = a + nd`, `an = a + (n+1)d`, `an = 2a + (n-1)d`],
                `an = a + (n-1)d`,
                `1. Recall the general formula:
   - The formula for the $n^{th}$ term of an Arithmetic Progression is given by:
   - $a_n = a + (n-1)d$

2. Conclusion:
   - Therefore, the correct option is $a_n = a + (n-1)d$.`
            ),
            // 2. Finding nth term (Easy)
            createQuestion(2,
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
            // 3. Finding nth term (Easy - Decreasing)
            createQuestion(3,
                `Find the 8th term of the AP: 10, 7, 4...`,
                [`-11`, `-14`, `-8`, `-10`],
                `-11`,
                `1. Identify the parameters:
   - $a = 10$
   - $d = 7 - 10 = -3$
   - $n = 8$

2. Apply the formula:
   - $a_n = a + (n-1)d$
   - $a_8 = 10 + (8 - 1)(-3)$
   - $a_8 = 10 + 7(-3)$
   - $a_8 = 10 - 21 = -11$

3. Conclusion:
   - Therefore, the 8th term is -11.`
            ),
            // 4. Finding term (Medium - Decimal)
            createQuestion(4,
                `Find the 30th term of the AP: 10, 10.5, 11, 11.5...`,
                [`24.5`, `25`, `25.5`, `24`],
                `24.5`,
                `1. Identify the parameters:
   - $a = 10$
   - $d = 10.5 - 10 = 0.5$
   - $n = 30$

2. Apply the formula:
   - $a_{30} = 10 + (30 - 1)(0.5)$
   - $a_{30} = 10 + 29(0.5)$
   - $a_{30} = 10 + 14.5$
   - $a_{30} = 24.5$

3. Conclusion:
   - Therefore, the 30th term is 24.5.`
            ),
            // 5. Finding term (Medium - Roots)
            createQuestion(5,
                `The $18^{th}$ term of the AP: $\\sqrt{2}, 3\\sqrt{2}, 5\\sqrt{2}...$ is?`,
                [`35\\sqrt{2}`, `34\\sqrt{2}`, `36\\sqrt{2}`, `18\\sqrt{2}`],
                `35\\sqrt{2}`,
                `1. Identify the parameters:
   - First term ($a$) = $\\sqrt{2}$
   - Common difference ($d$) = $3\\sqrt{2} - \\sqrt{2} = 2\\sqrt{2}$
   - $n = 18$

2. Calculate the 18th term:
   - $a_{18} = \\sqrt{2} + (18 - 1)(2\\sqrt{2})$
   - $a_{18} = \\sqrt{2} + 17(2\\sqrt{2})$
   - $a_{18} = \\sqrt{2} + 34\\sqrt{2}$
   - $a_{18} = 35\\sqrt{2}$

3. Conclusion:
   - Therefore, the 18th term is $35\\sqrt{2}$.`
            ),
            // 6. Finding n (Medium)
            createQuestion(6,
                `Which term of the AP: 21, 18, 15... is -81?`,
                [`35th`, `34th`, `36th`, `33rd`],
                `35th`,
                `1. Identify the parameters:
   - $a = 21$
   - $d = 18 - 21 = -3$
   - $a_n = -81$

2. Use the formula to find n:
   - $a_n = a + (n-1)d$
   - $-81 = 21 + (n-1)(-3)$
   - $-81 - 21 = -3(n-1)$
   - $-102 = -3(n-1)$
   - $n-1 = \\frac{102}{3}$
   - $n-1 = 34$
   - $n = 35$

3. Conclusion:
   - Therefore, -81 is the 35th term.`
            ),
            // 7. Finding n (Medium)
            createQuestion(7,
                `How many terms are there in the AP: 7, 13, 19, ..., 205?`,
                [`34`, `33`, `35`, `32`],
                `34`,
                `1. Identify the parameters:
   - $a = 7$
   - $d = 13 - 7 = 6$
   - Last term ($a_n$) = 205

2. Solve for n:
   - $205 = 7 + (n-1)6$
   - $198 = 6(n-1)$
   - $n-1 = 33$
   - $n = 34$

3. Conclusion:
   - There are 34 terms in the AP.`
            ),
            // 8. Finding n (Variable - Hard)
            createQuestion(8,
                `If the nth term of an AP is $5n-2$, find the 12th term.`,
                [`58`, `60`, `56`, `62`],
                `58`,
                `1. Given equation:
   - $a_n = 5n - 2$

2. Substitute $n=12$:
   - $a_{12} = 5(12) - 2$
   - $a_{12} = 60 - 2$
   - $a_{12} = 58$

3. Conclusion:
   - Therefore, the 12th term is 58.`
            ),
            // 9. Real-life (Hard)
            createQuestion(9,
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
            // 10. Real-life Word Problem (Hard)
            createQuestion(10,
                `Find the 20th term from the *end* of the AP: 3, 8, 13, ..., 253.`,
                [`158`, `153`, `163`, `148`],
                `158`,
                `1. Reverse the AP:
   - To find the term from the end, we can reverse the AP.
   - New first term ($a'$) = 253
   - New common difference ($d'$) = $-d = -5$ (since original $d=5$)

2. Calculate the 20th term of the reversed AP:
   - $a_{20} = a' + (20-1)d'$
   - $a_{20} = 253 + 19(-5)$
   - $a_{20} = 253 - 95$
   - $a_{20} = 158$

3. Conclusion:
   - Therefore, the 20th term from the end is 158.`
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

export default FindingSpecificTerms;
