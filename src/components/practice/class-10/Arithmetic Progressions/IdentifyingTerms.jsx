import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const IdentifyingTerms = () => {
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

    const SKILL_ID = 1107; // Identifying Terms and Common Difference
    const SKILL_NAME = "Identifying Terms and Common Difference";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Finding the first term (Easy)
            createQuestion(1,
                `For the AP: 6, 9, 12, 15..., what is the first term $a$?`,
                [`6`, `9`, `3`, `15`],
                `6`,
                `1. Identify the sequence:
   - The given arithmetic progression is 6, 9, 12, 15...

2. Locate the first term:
   - The first term is the number at the first position.
   - Here, the first number is 6.

3. Conclusion:
   - Therefore, the first term $a = 6$.`
            ),
            // 2. Finding the common difference (Easy)
            createQuestion(2,
                `For the AP: 6, 9, 12, 15..., what is the common difference $d$?`,
                [`3`, `6`, `9`, `-3`],
                `3`,
                `1. Identify consecutive terms:
   - First term ($a_1$) = 6
   - Second term ($a_2$) = 9

2. Apply the formula for common difference:
   - $d = a_2 - a_1$
   - $d = 9 - 6 = 3$

3. Conclusion:
   - Therefore, the common difference $d$ is 3.`
            ),
            // 3. Finding both (Easy)
            createQuestion(3,
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
            // 4. Finding common difference (Medium - Fraction)
            createQuestion(4,
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
            // 5. Finding common difference (Medium - Decimal)
            createQuestion(5,
                `What is the common difference of the AP: 0.6, 1.7, 2.8, 3.9...?`,
                [`1.1`, `0.9`, `1.0`, `2.1`],
                `1.1`,
                `1. Identify terms:
   - $a_1 = 0.6$
   - $a_2 = 1.7$

2. Calculate difference:
   - $d = a_2 - a_1$
   - $d = 1.7 - 0.6$
   - $d = 1.1$

3. Conclusion:
   - Therefore, the common difference is 1.1.`
            ),
            // 6. Checking AP (Medium)
            createQuestion(6,
                `Check whether the list of numbers: 5, 11, 17, 23... forms an AP. If yes, find $d$.`,
                [`Yes, d=6`, `No`, `Yes, d=5`, `Yes, d=7`],
                `Yes, d=6`,
                `1. Calculate differences between consecutive terms:
   - $11 - 5 = 6$
   - $17 - 11 = 6$
   - $23 - 17 = 6$

2. Analyze the differences:
   - The difference is constant ($d=6$).

3. Conclusion:
   - Yes, it forms an AP with common difference $d=6$.`
            ),
            // 7. Checking AP (Medium)
            createQuestion(7,
                `Does the list: 1, 1, 2, 2, 3, 3... form an AP?`,
                [`No`, `Yes, d=0`, `Yes, d=1`, `Yes, d variable`],
                `No`,
                `1. Calculate differences:
   - $a_2 - a_1 = 1 - 1 = 0$
   - $a_3 - a_2 = 2 - 1 = 1$
   - $a_4 - a_3 = 2 - 2 = 0$

2. Analyze results:
   - The differences are not constant (0, 1, 0...).
   - An AP must have a fixed common difference.

3. Conclusion:
   - Therefore, No, it does not form an AP.`
            ),
            // 8. Finding terms (Hard - Variable)
            createQuestion(8,
                `In an AP, if $a = 3x+1$ and $d = -x$, what is the second term?`,
                [`2x+1`, `4x+1`, `2x-1`, `3x-1`],
                `2x+1`,
                `1. Recall formula for the second term:
   - $a_2 = a + d$

2. Substitute the given values:
   - $a_2 = (3x + 1) + (-x)$
   - $a_2 = 3x + 1 - x$

3. Simplify:
   - $a_2 = (3x - x) + 1$
   - $a_2 = 2x + 1$

4. Conclusion:
   - Therefore, the second term is $2x+1$.`
            ),
            // 9. Checking AP (Hard - Roots)
            createQuestion(9,
                `Check if $\\sqrt{2}, \\sqrt{8}, \\sqrt{18}, \\sqrt{32}...$ forms an AP.`,
                [`Yes, d=\\sqrt{2}`, `No`, `Yes, d=2`, `Yes, d=\\sqrt{6}`],
                `Yes, d=\\sqrt{2}`,
                `1. Simplify the terms:
   - $\\sqrt{2} = \\sqrt{2}$
   - $\\sqrt{8} = \\sqrt{4 \\times 2} = 2\\sqrt{2}$
   - $\\sqrt{18} = \\sqrt{9 \\times 2} = 3\\sqrt{2}$
   - $\\sqrt{32} = \\sqrt{16 \\times 2} = 4\\sqrt{2}$

2. Find the common difference:
   - $d = 2\\sqrt{2} - \\sqrt{2} = \\sqrt{2}$
   - $d = 3\\sqrt{2} - 2\\sqrt{2} = \\sqrt{2}$

3. Conclusion:
   - Since the difference is constant ($d=\\sqrt{2}$), yes, it forms an AP.`
            ),
            // 10. Checking AP (Hard)
            createQuestion(10,
                `Find the missing variable 'k' if $k-1, k+3, 3k-1$ are in AP.`,
                [`k=4`, `k=3`, `k=2`, `k=5`],
                `k=4`,
                `1. Use the property of AP:
   - If $a, b, c$ are in AP, then $2b = a + c$.

2. Substitute values:
   - $a = k-1$, $b = k+3$, $c = 3k-1$
   - $2(k+3) = (k-1) + (3k-1)$

3. Solve for k:
   - $2k + 6 = 4k - 2$
   - $6 + 2 = 4k - 2k$
   - $8 = 2k$
   - $k = 4$

4. Conclusion:
   - Therefore, the value of $k$ is 4.`
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

export default IdentifyingTerms;
