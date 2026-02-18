import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const UnderstandingAP = () => {
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

    const SKILL_ID = 1106; // Understanding Arithmetic Progressions
    const SKILL_NAME = "Understanding Arithmetic Progressions";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Definition of AP (Easy)
            createQuestion(1,
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
            // 2. Definition of AP (Easy)
            createQuestion(2,
                `State whether the sequence 3, 3, 3, 3... is an AP.`,
                [`Yes`, `No`, `Only if 3 is positive`, `Cannot determine`],
                `Yes`,
                `1. Find the difference between consecutive terms:
   - First term ($a_1$) = 3
   - Second term ($a_2$) = 3
   - Difference ($d$) = $3 - 3 = 0$

2. Verify for next terms:
   - $a_3 - a_2 = 3 - 3 = 0$
   - $a_4 - a_3 = 3 - 3 = 0$

3. Conclusion:
   - Since the difference is constant ($d=0$), the sequence is an Arithmetic Progression.`
            ),
            // 3. Definition of AP (Medium)
            createQuestion(3,
                `Is the sequence $a, a+d, a+2d, a+3d...$ an AP?`,
                [`Yes`, `No`, `Only if d > 0`, `Only if a > 0`],
                `Yes`,
                `1. Identify the terms:
   - $t_1 = a$
   - $t_2 = a + d$
   - $t_3 = a + 2d$

2. Find the common difference:
   - $t_2 - t_1 = (a + d) - a = d$
   - $t_3 - t_2 = (a + 2d) - (a + d) = d$

3. Conclusion:
   - The difference is always $d$ (constant).
   - Therefore, Yes, it is an Arithmetic Progression.`
            ),
            // 4. Meaning of term and sequence (Easy)
            createQuestion(4,
                `In the AP: 5, 10, 15, 20..., what is the "first term" (denoted by 'a')?`,
                [`5`, `10`, `15`, `0`],
                `5`,
                `1. Analyze the sequence:
   - The sequence starts with 5, 10, 15, 20...

2. Identify the first term:
   - The first term ($a$) is the first number in the list.
   - Here, $a = 5$.

3. Conclusion:
   - Therefore, the first term is 5.`
            ),
            // 5. Concept of common difference (Easy)
            createQuestion(5,
                `Find the common difference 'd' of the AP: 2, 4, 6, 8...`,
                [`2`, `4`, `-2`, `0`],
                `2`,
                `1. Identify consecutive terms:
   - First term ($a_1$) = 2
   - Second term ($a_2$) = 4

2. Calculate the difference:
   - $d = a_2 - a_1$
   - $d = 4 - 2 = 2$

3. Conclusion:
   - Therefore, the common difference $d$ is 2.`
            ),
            // 6. Concept of common difference (Medium - Negative)
            createQuestion(6,
                `Find the common difference of the AP: 10, 7, 4, 1...`,
                [`-3`, `3`, `10`, `-7`],
                `-3`,
                `1. Identify terms:
   - First term ($a_1$) = 10
   - Second term ($a_2$) = 7

2. Calculate difference:
   - $d = a_2 - a_1$
   - $d = 7 - 10 = -3$

3. Conclusion:
   - Therefore, the common difference is -3.`
            ),
            // 7. Concept of common difference (Medium - Decimal)
            createQuestion(7,
                `What is the common difference of the AP: 1.5, 2.0, 2.5, 3.0...`,
                [`0.5`, `1.5`, `0.2`, `5`],
                `0.5`,
                `1. Identify terms:
   - $a_1 = 1.5$
   - $a_2 = 2.0$

2. Calculate difference:
   - $d = 2.0 - 1.5$
   - $d = 0.5$

3. Conclusion:
   - Therefore, the common difference is 0.5.`
            ),
            // 8. Concept of common difference (Hard - Variable)
            createQuestion(8,
                `Identify the common difference in: $x, x-2, x-4, x-6...$`,
                [`-2`, `2`, `x`, `-4`],
                `-2`,
                `1. Identify consecutive terms:
   - First term = $x$
   - Second term = $x - 2$

2. Subtract first from second:
   - $d = (x - 2) - x$
   - $d = x - 2 - x$
   - $d = -2$

3. Conclusion:
   - Therefore, the common difference is -2.`
            ),
            // 9. Checking AP (Hard)
            createQuestion(9,
                `Which of the following is NOT an AP?`,
                [`1, 4, 9, 16...`, `2, 4, 6, 8...`, `10, 10, 10...`, `\\sqrt{3}, 2\\sqrt{3}, 3\\sqrt{3}...`],
                `1, 4, 9, 16...`,
                `1. Analyze Option (A): 1, 4, 9, 16...
   - $4 - 1 = 3$
   - $9 - 4 = 5$
   - The difference is NOT constant ($3 \\neq 5$).

2. Analyze other options:
   - (B) $4-2=2$ (Constant) -> AP
   - (C) $10-10=0$ (Constant) -> AP
   - (D) $2\\sqrt{3}-\\sqrt{3}=\\sqrt{3}$ (Constant) -> AP

3. Conclusion:
   - Since Option (A) does not have a constant difference, it is NOT an AP.`
            ),
            // 10. Checking AP (Hard)
            createQuestion(10,
                `Check if the sequence formed by $a_n = 2n + 1$ is an AP.`,
                [`Yes`, `No`, `Depends on n`, `None of these`],
                `Yes`,
                `1. Generate the first few terms:
   - For $n=1: a_1 = 2(1) + 1 = 3$
   - For $n=2: a_2 = 2(2) + 1 = 5$
   - For $n=3: a_3 = 2(3) + 1 = 7$

2. Find the common difference:
   - $a_2 - a_1 = 5 - 3 = 2$
   - $a_3 - a_2 = 7 - 5 = 2$

3. Conclusion:
   - Since the difference is constant ($d=2$), the sequence is an Arithmetic Progression.`
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

export default UnderstandingAP;
